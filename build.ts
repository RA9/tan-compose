/// <reference lib="dom" />
import type { DescribeOptions } from "./types.ts";

// Registry maps tag name to constructor; prevents duplicate registration.
const componentRegistry = new Map<string, CustomElementConstructor>();

const TAG_NAME_PATTERN = /^[a-z][a-z0-9]*(-[a-z0-9]+)+$/;

/**
 * Registers a custom element with the given tag name and description.
 *
 * Lifecycle ordering:
 *   constructor (shadow root + theme/style sheets attached)
 *     → connectedCallback → beforeMount → render → afterMount
 *   attribute change / setState → render
 *   disconnectedCallback → unmount → cleanup
 *
 * Returns the registered tag name.
 */
export function build(tagName: string, description: DescribeOptions): string {
  if (typeof tagName !== "string" || !TAG_NAME_PATTERN.test(tagName)) {
    throw new TypeError(
      `build(): "${tagName}" is not a valid custom element name (must be lowercase and contain a hyphen).`,
    );
  }

  if (componentRegistry.has(tagName)) {
    console.warn(
      `Component "${tagName}" is already registered. Skipping re-registration.`,
    );
    return tagName;
  }

  if (
    typeof HTMLElement === "undefined" || typeof customElements === "undefined"
  ) {
    console.warn(
      "HTMLElement or customElements not available; skipping component registration.",
    );
    return tagName;
  }

  const observed = description.observedAttributes ?? [];

  class CustomComponent extends HTMLElement {
    private isMounted = false;
    private mountCleanups: Array<() => void> = [];
    private renderCleanups: Array<() => void> = [];
    private state: Map<string, unknown> = new Map();
    private container: HTMLElement;
    private hostStyleEl: HTMLStyleElement | null = null;
    private hostThemeEl: HTMLStyleElement | null = null;

    static get observedAttributes(): string[] {
      return observed;
    }

    constructor() {
      super();
      const shadow = this.attachShadow({ mode: "open" });

      if (description.theme) {
        this.hostThemeEl = document.createElement("style");
        this.hostThemeEl.textContent = buildThemeCss(description.theme);
        shadow.appendChild(this.hostThemeEl);
      }

      if (description.styles) {
        this.hostStyleEl = document.createElement("style");
        this.hostStyleEl.textContent = buildContainerCss(description.styles);
        shadow.appendChild(this.hostStyleEl);
      }

      this.container = document.createElement("div");
      this.container.className = description.className
        ? `container ${description.className}`
        : "container";
      shadow.appendChild(this.container);

      if (description.attributes) {
        applyAttributes(this, description.attributes);
      }
    }

    connectedCallback(): void {
      if (this.isMounted) return;

      try {
        description.beforeMount?.call(this);
      } catch (err) {
        console.error(`[tan-compose] beforeMount threw for <${tagName}>:`, err);
      }

      this.renderInternal();

      if (description.action) {
        const handler = description.action;
        this.addEventListener("click", handler);
        this.mountCleanups.push(() =>
          this.removeEventListener("click", handler)
        );
      }

      if (description.emit) {
        for (const evt of description.emit) {
          this.addEventListener(evt.name, evt.handler);
          this.mountCleanups.push(() =>
            this.removeEventListener(evt.name, evt.handler)
          );
        }
      }

      this.isMounted = true;

      try {
        description.afterMount?.call(this);
      } catch (err) {
        console.error(`[tan-compose] afterMount threw for <${tagName}>:`, err);
      }
    }

    disconnectedCallback(): void {
      try {
        description.unmount?.call(this);
      } catch (err) {
        console.error(`[tan-compose] unmount threw for <${tagName}>:`, err);
      }
      this.runCleanups(this.mountCleanups);
      this.runCleanups(this.renderCleanups);
      this.isMounted = false;
    }

    attributeChangedCallback(
      name: string,
      oldValue: string | null,
      newValue: string | null,
    ): void {
      if (oldValue === newValue) return;
      this.state.set(name, newValue);
      if (this.isMounted) this.renderInternal();
    }

    setState(key: string, value: unknown): void {
      const prev = this.state.get(key);
      if (Object.is(prev, value)) return;
      this.state.set(key, value);
      if (this.isMounted) this.renderInternal();
    }

    getState<T = unknown>(key: string): T | undefined {
      return this.state.get(key) as T | undefined;
    }

    render(): void {
      this.renderInternal();
    }

    emitEvent(eventName: string, data: unknown): void {
      this.dispatchEvent(
        new CustomEvent(eventName, {
          detail: data,
          bubbles: true,
          composed: true,
        }),
      );
    }

    private renderInternal(): void {
      this.runCleanups(this.renderCleanups);

      this.container.replaceChildren();

      if (description.template) {
        this.container.innerHTML = description.template;
      }

      if (description.children) {
        for (const childDesc of description.children) {
          const childEl = buildElement(childDesc, this.renderCleanups);
          this.container.appendChild(childEl);
        }
      }

      this.container.appendChild(document.createElement("slot"));
    }

    private runCleanups(list: Array<() => void>): void {
      while (list.length > 0) {
        const fn = list.pop();
        try {
          fn?.();
        } catch (err) {
          console.error(`[tan-compose] cleanup threw for <${tagName}>:`, err);
        }
      }
    }
  }

  componentRegistry.set(tagName, CustomComponent);
  customElements.define(tagName, CustomComponent);
  return tagName;
}

function buildElement(
  description: DescribeOptions,
  cleanups: Array<() => void>,
): HTMLElement {
  const element = document.createElement(description.tag || "div");

  if (description.styles) {
    element.style.cssText = Object.entries(description.styles)
      .map(([k, v]) => `${k}: ${v}`)
      .join("; ");
  }

  if (description.className) {
    element.className = description.className;
  }

  if (description.attributes) {
    applyAttributes(element, description.attributes);
  }

  if (description.template) {
    element.innerHTML = description.template;
  }

  if (description.children) {
    for (const childDesc of description.children) {
      element.appendChild(buildElement(childDesc, cleanups));
    }
  }

  if (description.action) {
    const handler = description.action;
    element.addEventListener("click", handler);
    cleanups.push(() => element.removeEventListener("click", handler));
  }

  if (description.emit) {
    for (const evt of description.emit) {
      element.addEventListener(evt.name, evt.handler);
      cleanups.push(() => element.removeEventListener(evt.name, evt.handler));
    }
  }

  return element;
}

function applyAttributes(
  element: HTMLElement,
  attributes: Record<string, string>,
): void {
  for (const [attr, value] of Object.entries(attributes)) {
    element.setAttribute(attr, value);
  }
}

function buildThemeCss(theme: Record<string, string>): string {
  const vars = Object.entries(theme)
    .map(([key, value]) => `--${key}: ${value};`)
    .join(" ");
  return `:host { ${vars} }`;
}

function buildContainerCss(styles: Record<string, string>): string {
  const rules = Object.entries(styles)
    .map(([key, value]) => `${key}: ${value};`)
    .join(" ");
  return `.container { ${rules} }`;
}

/** Returns true if a component with the given tag name has been registered. */
export function isComponentRegistered(tagName: string): boolean {
  return componentRegistry.has(tagName);
}

/** Returns the list of all registered tag names. */
export function getRegisteredComponents(): string[] {
  return Array.from(componentRegistry.keys());
}
