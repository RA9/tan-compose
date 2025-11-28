import { DescribeOptions } from "./types.ts";

// Component registry to prevent duplicate registrations
const componentRegistry = new Map<string, typeof HTMLElement>();

/**
 * Builds a custom component with the given tag name and description options
 * Handles component registration, lifecycle, reactivity, and proper cleanup
 */
export function build(tagName: string, description: DescribeOptions): void {
  // Check if component already registered
  if (componentRegistry.has(tagName)) {
    console.warn(
      `Component "${tagName}" is already registered. Skipping re-registration.`,
    );
    return;
  }

  class CustomComponent extends HTMLElement {
    private isInitialized = false;
    private cleanupFunctions: Array<() => void> = [];
    private state: Map<string, any> = new Map();
    private container: HTMLElement | null = null;

    // Define observed attributes for reactivity
    static get observedAttributes() {
      return description.attributes ? Object.keys(description.attributes) : [];
    }

    constructor() {
      super();

      // Initialize Shadow DOM for component encapsulation
      const shadow = this.attachShadow({ mode: "open" });

      // Apply theme using CSS Variables in a style tag
      if (description.theme) {
        const themeStyle = document.createElement("style");
        let cssVariables = ":host {";
        Object.entries(description.theme).forEach(([key, value]) => {
          cssVariables += `--${key}: ${value}; `;
        });
        cssVariables += "}";
        themeStyle.textContent = cssVariables;
        shadow.appendChild(themeStyle);
      }

      // Apply component styles via style tag for better encapsulation
      if (description.styles) {
        const componentStyle = document.createElement("style");
        const styleRules = Object.entries(description.styles)
          .map(([key, value]) => `${key}: ${value}`)
          .join("; ");
        componentStyle.textContent = `.container { ${styleRules} }`;
        shadow.appendChild(componentStyle);
      }

      // Create container for content
      this.container = document.createElement("div");
      this.container.className = description.className
        ? `container ${description.className}`
        : "container";

      // Set attributes on host element if any
      if (description.attributes) {
        setAttributes(this, description.attributes);
      }

      // Render template if provided
      if (description.template) {
        this.container.innerHTML = description.template;
      }

      // Create child elements recursively
      if (description.children && description.children.length > 0) {
        description.children.forEach((childDesc) => {
          const childElement = buildElement(childDesc, this.cleanupFunctions);
          this.container!.appendChild(childElement);
        });
      }

      // Append slot for projected content
      const slotContent = document.createElement("slot");
      this.container.appendChild(slotContent);

      shadow.appendChild(this.container);

      // Setup event emission with cleanup tracking
      if (description.emit) {
        description.emit.forEach((event) => {
          this.addEventListener(event.name, event.handler);
          this.cleanupFunctions.push(() => {
            this.removeEventListener(event.name, event.handler);
          });
        });
      }
    }

    connectedCallback() {
      if (!this.isInitialized) {
        this.isInitialized = true;

        // Execute beforeMount hook
        if (description.beforeMount) {
          description.beforeMount();
        }

        // Execute afterMount hook
        if (description.afterMount) {
          description.afterMount();
        }

        // Handle click or other event action if provided
        if (description.action) {
          this.addEventListener("click", description.action);
          this.cleanupFunctions.push(() => {
            this.removeEventListener("click", description.action!);
          });
        }
      }
    }

    disconnectedCallback() {
      // Execute all cleanup functions
      this.cleanupFunctions.forEach((cleanup) => cleanup());
      this.cleanupFunctions = [];
      this.isInitialized = false;
    }

    // Attribute change observer for reactivity
    attributeChangedCallback(
      name: string,
      oldValue: string | null,
      newValue: string | null,
    ) {
      if (oldValue !== newValue) {
        this.setState(name, newValue);
        this.render();
      }
    }

    // State management
    setState(key: string, value: any) {
      this.state.set(key, value);
    }

    getState(key: string): any {
      return this.state.get(key);
    }

    // Re-render component with current state
    render() {
      if (!this.container) return;

      // Clear current content (except slot)
      const slot = this.container.querySelector("slot");
      this.container.innerHTML = "";

      // Re-render template
      if (description.template) {
        this.container.innerHTML = description.template;
      }

      // Re-append slot
      if (slot) {
        this.container.appendChild(slot);
      }

      // Re-render children
      if (description.children && description.children.length > 0) {
        description.children.forEach((childDesc) => {
          const childElement = buildElement(childDesc, this.cleanupFunctions);
          this.container!.insertBefore(childElement, slot);
        });
      }
    }

    // Custom event emitter method
    emitEvent(eventName: string, data: any) {
      const event = new CustomEvent(eventName, {
        detail: data,
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);
    }
  }

  // Register component in registry and define custom element
  componentRegistry.set(tagName, CustomComponent);
  customElements.define(tagName, CustomComponent);
}

/**
 * Helper function to build a child element from description options
 * Properly tracks cleanup functions to prevent memory leaks
 */
function buildElement(
  description: DescribeOptions,
  cleanupFunctions: Array<() => void>,
): HTMLElement {
  const element = document.createElement(description.tag || "div");

  // Apply inline styles
  if (description.styles) {
    const styleString = Object.entries(description.styles)
      .map(([key, value]) => `${key}: ${value}`)
      .join("; ");
    element.style.cssText = styleString;
  }

  // Set class if available
  if (description.className) {
    element.className = description.className;
  }

  // Set attributes if any
  if (description.attributes) {
    setAttributes(element, description.attributes);
  }

  // Render template if provided
  if (description.template) {
    element.innerHTML = description.template;
  }

  // Create child elements recursively
  if (description.children && description.children.length > 0) {
    description.children.forEach((childDesc) => {
      const childElement = buildElement(childDesc, cleanupFunctions);
      element.appendChild(childElement);
    });
  }

  // Handle click or other event action with cleanup tracking
  if (description.action) {
    element.addEventListener("click", description.action);
    cleanupFunctions.push(() => {
      element.removeEventListener("click", description.action!);
    });
  }

  // Setup event emission with cleanup tracking
  if (description.emit) {
    description.emit.forEach((event) => {
      element.addEventListener(event.name, event.handler);
      cleanupFunctions.push(() => {
        element.removeEventListener(event.name, event.handler);
      });
    });
  }

  return element;
}

/**
 * Helper function to set attributes on elements
 */
function setAttributes(
  element: HTMLElement,
  attributes: Record<string, string>,
): void {
  Object.entries(attributes).forEach(([attr, value]) => {
    element.setAttribute(attr, value);
  });
}

/**
 * Check if a component is already registered
 */
export function isComponentRegistered(tagName: string): boolean {
  return componentRegistry.has(tagName);
}

/**
 * Get all registered component names
 */
export function getRegisteredComponents(): string[] {
  return Array.from(componentRegistry.keys());
}
