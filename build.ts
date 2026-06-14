import type {
  ComponentCtx,
  DescribeOptions,
  EventDelegateMap,
  ListConfig,
  PropDef,
} from "./types.ts";
import { isSafeHtml } from "./html.ts";

const componentRegistry = new Map<string, CustomElementConstructor>();

const TAG_NAME_PATTERN = /^[a-z][a-z0-9]*(-[a-z0-9]+)+$/;
const EVENT_KEY_PATTERN = /^(\S+)(?:\s+(.+))?$/;

/** Events that don't bubble — delegated in the capture phase so they still fire. */
const NON_BUBBLING_EVENTS = new Set([
  "focus",
  "blur",
  "mouseenter",
  "mouseleave",
  "pointerenter",
  "pointerleave",
  "load",
  "error",
  "scroll",
]);

/** Re-render budget per synchronous turn — guards against afterRender→setState loops. */
const RENDER_LOOP_LIMIT = 50;

/** camelCase → kebab-case for attribute names (`pageSize` → `page-size`). */
function kebabCase(s: string): string {
  return s.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
}

/** Resolve a string-or-SafeHtml template value to a raw HTML string. */
function templateToHtml(value: string | { value: string }): string {
  return isSafeHtml(value) ? value.value : (value as string);
}

/** Escape a value for safe embedding inside a `[attr="…"]` selector. */
function cssAttrEscape(s: string): string {
  return s.replace(/(["\\])/g, "\\$1");
}

type KeyedItem = {
  element: HTMLElement;
  lastItem: unknown;
  cleanups: Array<() => void>;
};

type ListSlot = {
  cache: Map<string | number, KeyedItem>;
};

interface FocusSnapshot {
  id: string | null;
  name: string | null;
  path: { tag: string; idx: number }[];
  selectionStart: number | null;
  selectionEnd: number | null;
}

interface RenderScope {
  host: HostElement;
  cleanups: Array<() => void>;
  ctx: ComponentCtx;
}

interface HostElement extends HTMLElement {
  setState(key: string, value: unknown): void;
  getState<T = unknown>(key: string): T | undefined;
  emitEvent(eventName: string, data?: unknown): void;
  refs: Readonly<Record<string, Element | null>>;
  internals?: ElementInternals;
}

/**
 * Registers a custom element with the given tag name and description.
 *
 * Lifecycle:
 *   constructor (shadow root + theme/style sheets)
 *     → connectedCallback → beforeMount → render → afterMount
 *   prop set / setState / observed attribute change → render
 *   disconnectedCallback → unmount → cleanup
 */
export function build<
  P = Record<string, unknown>,
  S = Record<string, unknown>,
>(tagName: string, descriptionInput: DescribeOptions<P, S>): string {
  // Internally we work with the default (untyped) shape — the generics exist
  // purely to type the author-facing template/event/hook contexts.
  const description = descriptionInput as unknown as DescribeOptions;
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

  const propDefs: Record<string, PropDef> = description.props ?? {};

  // Map every observable attribute name (lowercased, as the browser reports
  // it) back to its prop. A camelCase prop like `pageSize` is reachable via
  // both `page-size` (kebab) and `pagesize` (lowercased) — so dynamic
  // `setAttribute` reacts, not just the initial read.
  const attrToProp = new Map<string, string>();
  const reflectAttrName = new Map<string, string>();
  const observedSet = new Set<string>(description.observedAttributes ?? []);
  for (const name of Object.keys(propDefs)) {
    const kebab = kebabCase(name);
    attrToProp.set(kebab, name);
    attrToProp.set(name.toLowerCase(), name);
    observedSet.add(kebab);
    observedSet.add(name.toLowerCase());
    reflectAttrName.set(name, kebab);
  }
  const observed = Array.from(observedSet);

  const refsConfig: Record<string, string> = description.refs ?? {};
  const sharedSheets = buildSharedSheets(description);

  class CustomComponent extends HTMLElement implements HostElement {
    static get observedAttributes(): string[] {
      return observed;
    }

    static get formAssociated(): boolean {
      return description.formAssociated === true;
    }

    private isMounted = false;
    private mountCleanups: Array<() => void> = [];
    private renderCleanups: Array<() => void> = [];
    private state = new Map<string, unknown>();
    private propValues = new Map<string, unknown>();
    private listSlots = new WeakMap<DescribeOptions, ListSlot>();
    // Every slot ever created, so disconnect can flush cleanups for nested /
    // dynamically-rendered lists that aren't in the static description tree.
    private allSlots = new Set<ListSlot>();
    private currentRefs: Record<string, Element | null> = {};
    private container: HTMLElement;
    private ctx!: ComponentCtx;
    private rendering = false;
    private renderQueued = false;
    private renderTick = 0;
    private renderTickScheduled = false;
    public internals?: ElementInternals;

    constructor() {
      super();
      const shadow = this.attachShadow({ mode: "open" });

      if (
        description.formAssociated && typeof this.attachInternals === "function"
      ) {
        this.internals = this.attachInternals();
      }

      applySharedSheets(shadow, sharedSheets);

      this.container = document.createElement("div");
      this.container.className = description.className
        ? `container ${description.className}`
        : "container";
      shadow.appendChild(this.container);

      if (description.attributes) {
        applyAttributes(this, description.attributes);
      }

      this.ctx = createCtx(
        this,
        this.propValues,
        this.state,
        () => this.currentRefs,
      );
      this.initProps();
    }

    get refs(): Readonly<Record<string, Element | null>> {
      return this.currentRefs;
    }

    private initProps(): void {
      for (const [name, def] of Object.entries(propDefs)) {
        // Prefer the kebab attribute (`page-size`); `getAttribute` is
        // case-insensitive so passing the prop name also covers the
        // all-lowercase form (`pagesize`).
        const attrValue =
          this.getAttribute(reflectAttrName.get(name) ?? name) ??
            this.getAttribute(name);
        const initial = attrValue !== null
          ? coerceProp(attrValue, def.type)
          : def.default;
        this.propValues.set(name, initial);
        this.maybeSyncFormValue(name, initial);

        Object.defineProperty(this, name, {
          configurable: true,
          enumerable: true,
          get: () => this.propValues.get(name),
          set: (value) => {
            const coerced = coerceForSet(value, def.type);
            const prev = this.propValues.get(name);
            if (Object.is(prev, coerced)) return;
            this.propValues.set(name, coerced);
            if (def.reflect) {
              reflectAttribute(
                this,
                reflectAttrName.get(name) ?? name,
                coerced,
                def.type,
              );
            }
            this.maybeSyncFormValue(name, coerced);
            if (this.isMounted) this.scheduleRender();
          },
        });
      }
    }

    private maybeSyncFormValue(name: string, value: unknown): void {
      if (!this.internals) return;
      if (name !== "value") return;
      const formValue = value == null ? null : String(value);
      this.internals.setFormValue(formValue);
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

      if (description.events) {
        this.attachDelegatedEvents(description.events);
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
      runCleanups(this.mountCleanups);
      runCleanups(this.renderCleanups);
      this.flushListSlots();
      this.isMounted = false;
    }

    private flushListSlots(): void {
      // Flush every slot we ever created — including nested lists produced by
      // a parent list's render(), which aren't reachable from the static
      // description tree. Walking `allSlots` catches them all.
      for (const slot of this.allSlots) {
        for (const item of slot.cache.values()) runCleanups(item.cleanups);
        slot.cache.clear();
      }
      this.allSlots.clear();
    }

    attributeChangedCallback(
      name: string,
      oldValue: string | null,
      newValue: string | null,
    ): void {
      if (oldValue === newValue) return;
      // `name` arrives lowercased from the browser; map it back to its prop.
      const propName = attrToProp.get(name);
      if (propName) {
        const def = propDefs[propName];
        const coerced = newValue !== null
          ? coerceProp(newValue, def.type)
          : def.default;
        const prev = this.propValues.get(propName);
        if (!Object.is(prev, coerced)) {
          this.propValues.set(propName, coerced);
          this.maybeSyncFormValue(propName, coerced);
          if (this.isMounted) this.scheduleRender();
        }
        return;
      }
      this.state.set(name, newValue);
      if (this.isMounted) this.scheduleRender();
    }

    setState(key: string, value: unknown): void {
      const prev = this.state.get(key);
      if (Object.is(prev, value)) return;
      this.state.set(key, value);
      if (this.isMounted) this.scheduleRender();
    }

    getState<T = unknown>(key: string): T | undefined {
      return this.state.get(key) as T | undefined;
    }

    render(): void {
      this.renderInternal();
    }

    emitEvent(eventName: string, data?: unknown): void {
      this.dispatchEvent(
        new CustomEvent(eventName, {
          detail: data,
          bubbles: true,
          composed: true,
        }),
      );
    }

    private scheduleRender(): void {
      if (this.rendering) {
        this.renderQueued = true;
        return;
      }
      this.renderInternal();
    }

    private getOrCreateSlot(desc: DescribeOptions): ListSlot {
      let slot = this.listSlots.get(desc);
      if (!slot) {
        slot = { cache: new Map() };
        this.listSlots.set(desc, slot);
        this.allSlots.add(slot);
      }
      return slot;
    }

    private renderInternal(): void {
      // Loop guard: if renders cascade past the budget within a single
      // synchronous turn (e.g. afterRender repeatedly calling setState),
      // abort rather than hang the page. The counter resets each microtask,
      // so legitimate renders across separate turns are never penalised.
      if (++this.renderTick > RENDER_LOOP_LIMIT) {
        console.error(
          `[tan-compose] <${tagName}> exceeded ${RENDER_LOOP_LIMIT} renders in one turn — aborting to break a render loop (check afterRender / setState).`,
        );
        this.renderTick = 0;
        this.renderQueued = false;
        return;
      }
      if (!this.renderTickScheduled) {
        this.renderTickScheduled = true;
        const reset = () => {
          this.renderTick = 0;
          this.renderTickScheduled = false;
        };
        if (typeof queueMicrotask === "function") queueMicrotask(reset);
        else Promise.resolve().then(reset);
      }

      this.rendering = true;
      // Snapshot the focused element before we tear the shadow content
      // down. After the new content is in place we walk the same path
      // and restore focus + caret position so typing into a reactive
      // input doesn't lose focus on every keystroke.
      const focusSnapshot = this.captureFocusInShadow();
      try {
        runCleanups(this.renderCleanups);
        this.container.replaceChildren();

        const scope: RenderScope = {
          host: this,
          cleanups: this.renderCleanups,
          ctx: this.ctx,
        };

        // Top-level template (string or SafeHtml or function) → .container.
        if (description.template !== undefined) {
          const raw = typeof description.template === "function"
            ? description.template(this.ctx)
            : description.template;
          const htmlStr = templateToHtml(raw);
          if (htmlStr) this.container.innerHTML = htmlStr;
        }

        if (description.children) {
          for (const childDesc of description.children) {
            const node = buildChild(
              childDesc,
              scope,
              (d) => this.getOrCreateSlot(d),
            );
            if (node) this.container.appendChild(node);
          }
        }

        this.container.appendChild(document.createElement("slot"));
        this.refreshRefs();
      } finally {
        this.rendering = false;
      }

      // Restore focus before afterRender so user hooks observe the
      // post-restored state.
      if (focusSnapshot) this.restoreFocusInShadow(focusSnapshot);

      if (this.renderQueued) {
        this.renderQueued = false;
        this.renderInternal();
        return;
      }

      try {
        description.afterRender?.call(this);
      } catch (err) {
        console.error(`[tan-compose] afterRender threw for <${tagName}>:`, err);
      }
    }

    private captureFocusInShadow(): FocusSnapshot | null {
      const root = this.shadowRoot;
      if (!root) return null;
      const active = root.activeElement as HTMLElement | null;
      if (!active) return null;
      // Walk from the active element up to the shadow root, recording
      // each step as (tag, index-among-same-tag-siblings). The shadow
      // root is the stop signal.
      const path: { tag: string; idx: number }[] = [];
      let node: Element | null = active;
      while (node && (node as Node) !== (root as unknown as Node)) {
        const parent = node.parentNode as ParentNode | null;
        if (!parent) break;
        const tag = node.tagName;
        const siblings = Array.from(parent.children).filter(
          (c) => c.tagName === tag,
        );
        const idx = siblings.indexOf(node as Element);
        path.unshift({ tag, idx });
        node = parent instanceof Element ? parent : null;
        if (
          !node && (parent as unknown as Node) === (root as unknown as Node)
        ) {
          break;
        }
      }
      let selectionStart: number | null = null;
      let selectionEnd: number | null = null;
      if (
        active instanceof HTMLInputElement ||
        active instanceof HTMLTextAreaElement
      ) {
        try {
          selectionStart = active.selectionStart;
          selectionEnd = active.selectionEnd;
        } catch {
          // some input types (e.g. email, number) disallow selection.
        }
      }
      return {
        id: active.id || null,
        name: active.getAttribute("name"),
        path,
        selectionStart,
        selectionEnd,
      };
    }

    private restoreFocusInShadow(snap: FocusSnapshot): void {
      const root = this.shadowRoot;
      if (!root) return;

      // Prefer stable identity (id, then name) — survives structural changes
      // that would throw off a positional walk. Fall back to the path.
      let el: HTMLElement | null = null;
      if (snap.id) {
        el = (root.getElementById?.(snap.id) ??
          root.querySelector(`[id="${cssAttrEscape(snap.id)}"]`)) as
            | HTMLElement
            | null;
      }
      if (!el && snap.name) {
        el = root.querySelector(
          `[name="${cssAttrEscape(snap.name)}"]`,
        ) as HTMLElement | null;
      }
      if (!el) {
        let cursor: ParentNode = root;
        for (const step of snap.path) {
          const children = Array.from((cursor as Element).children ?? []);
          // For the shadow root itself, fall back to all children via
          // root.children which ShadowRoot exposes.
          const all = children.length > 0
            ? children
            : Array.from((cursor as unknown as ShadowRoot).children ?? []);
          const candidates = all.filter((c) => c.tagName === step.tag);
          const target = candidates[step.idx];
          if (!target) return;
          cursor = target;
        }
        el = cursor as unknown as HTMLElement;
      }
      if (!el || typeof el.focus !== "function") return;
      // Don't steal focus if it's already on the right element (rare,
      // but possible if something refocused between replaceChildren and
      // innerHTML assignment).
      if (root.activeElement === el) return;
      el.focus();
      if (
        snap.selectionStart != null &&
        (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement)
      ) {
        try {
          el.setSelectionRange(
            snap.selectionStart,
            snap.selectionEnd ?? snap.selectionStart,
          );
        } catch {
          // ignored — some input types disallow selection access.
        }
      }
    }

    private refreshRefs(): void {
      const next: Record<string, Element | null> = {};
      const root = this.shadowRoot;
      for (const [name, selector] of Object.entries(refsConfig)) {
        next[name] = root ? root.querySelector(selector) : null;
      }
      this.currentRefs = next;
    }

    formAssociatedCallback(form: HTMLFormElement | null): void {
      try {
        description.formAssociatedCallback?.call(this, form);
      } catch (err) {
        console.error(
          `[tan-compose] formAssociatedCallback threw for <${tagName}>:`,
          err,
        );
      }
    }

    formDisabledCallback(disabled: boolean): void {
      try {
        description.formDisabledCallback?.call(this, disabled);
      } catch (err) {
        console.error(
          `[tan-compose] formDisabledCallback threw for <${tagName}>:`,
          err,
        );
      }
    }

    formResetCallback(): void {
      try {
        description.formResetCallback?.call(this);
      } catch (err) {
        console.error(
          `[tan-compose] formResetCallback threw for <${tagName}>:`,
          err,
        );
      }
    }

    formStateRestoreCallback(
      state: unknown,
      mode: "restore" | "autocomplete",
    ): void {
      try {
        description.formStateRestoreCallback?.call(this, state, mode);
      } catch (err) {
        console.error(
          `[tan-compose] formStateRestoreCallback threw for <${tagName}>:`,
          err,
        );
      }
    }

    private attachDelegatedEvents(events: EventDelegateMap): void {
      const grouped = new Map<
        string,
        Array<
          {
            selector: string | null;
            handler: (e: Event, ctx: ComponentCtx) => void;
          }
        >
      >();

      for (const [key, handler] of Object.entries(events)) {
        const match = EVENT_KEY_PATTERN.exec(key.trim());
        if (!match) continue;
        const [, type, selector] = match;
        if (!grouped.has(type)) grouped.set(type, []);
        grouped.get(type)!.push({ selector: selector ?? null, handler });
      }

      for (const [type, entries] of grouped) {
        const listener = (event: Event) => {
          for (const { selector, handler } of entries) {
            if (!selector) {
              handler(event, this.ctx);
              continue;
            }
            const path = event.composedPath();
            for (const node of path) {
              if (node === this.shadowRoot || node === this) break;
              if (
                node instanceof Element &&
                this.shadowRoot?.contains(node) &&
                node.matches(selector)
              ) {
                handler(event, this.ctx);
                break;
              }
            }
          }
        };
        // Non-bubbling events (focus/blur/mouseenter/…) only reach a
        // delegated listener in the capture phase.
        const capture = NON_BUBBLING_EVENTS.has(type);
        this.shadowRoot!.addEventListener(type, listener, capture);
        this.mountCleanups.push(() =>
          this.shadowRoot?.removeEventListener(type, listener, capture)
        );
      }
    }
  }

  componentRegistry.set(tagName, CustomComponent);
  customElements.define(tagName, CustomComponent);
  return tagName;
}

// ---------------------------------------------------------------------------
// Render helpers
// ---------------------------------------------------------------------------

function buildChild(
  description: DescribeOptions,
  scope: RenderScope,
  getSlot: (desc: DescribeOptions) => ListSlot,
): Node | null {
  if (description.if && !description.if(scope.ctx)) return null;
  return buildElement(description, scope, getSlot);
}

function buildElement(
  description: DescribeOptions,
  scope: RenderScope,
  getSlot: (desc: DescribeOptions) => ListSlot,
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

  if (description.template !== undefined) {
    const raw = typeof description.template === "function"
      ? description.template(scope.ctx)
      : description.template;
    const htmlStr = templateToHtml(raw);
    if (htmlStr) element.innerHTML = htmlStr;
  }

  if (description.children) {
    for (const childDesc of description.children) {
      const childNode = buildChild(childDesc, scope, getSlot);
      if (childNode) element.appendChild(childNode);
    }
  }

  if (description.for) {
    appendKeyedList(element, description, scope, getSlot);
  }

  if (description.action) {
    const handler = description.action;
    element.addEventListener("click", handler);
    scope.cleanups.push(() => element.removeEventListener("click", handler));
  }

  if (description.emit) {
    for (const evt of description.emit) {
      element.addEventListener(evt.name, evt.handler);
      scope.cleanups.push(() =>
        element.removeEventListener(evt.name, evt.handler)
      );
    }
  }

  return element;
}

function appendKeyedList(
  parent: HTMLElement,
  description: DescribeOptions,
  scope: RenderScope,
  getSlot: (desc: DescribeOptions) => ListSlot,
): void {
  const list = description.for as ListConfig;
  const slot = getSlot(description);
  const items = list.items(scope.ctx);
  const newCache = new Map<string | number, KeyedItem>();

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const key = list.key(item, i);

    let entry: KeyedItem;
    const cached = slot.cache.get(key);
    if (cached && Object.is(cached.lastItem, item)) {
      entry = cached;
    } else {
      const itemCleanups: Array<() => void> = [];
      const childDesc = list.render(item, i, scope.ctx);
      const element = buildElement(
        childDesc,
        { ...scope, cleanups: itemCleanups },
        getSlot,
      );
      if (cached) runCleanups(cached.cleanups);
      entry = { element, lastItem: item, cleanups: itemCleanups };
    }

    newCache.set(key, entry);
    parent.appendChild(entry.element);
  }

  // Run cleanups for items that were removed from the list.
  for (const [key, entry] of slot.cache) {
    if (!newCache.has(key)) runCleanups(entry.cleanups);
  }

  slot.cache = newCache;
}

function createCtx(
  host: HostElement,
  propValues: Map<string, unknown>,
  state: Map<string, unknown>,
  refsRef: () => Readonly<Record<string, Element | null>>,
): ComponentCtx {
  return {
    host,
    get props() {
      const out: Record<string, unknown> = {};
      for (const [k, v] of propValues) out[k] = v;
      return out;
    },
    get state() {
      const out: Record<string, unknown> = {};
      for (const [k, v] of state) out[k] = v;
      return out;
    },
    get refs() {
      return refsRef();
    },
    setState: (key, value) => host.setState(key, value),
    getState: (key) => host.getState(key),
    emit: (name, detail) => host.emitEvent(name, detail),
  };
}

/**
 * Pre-builds the shared CSSStyleSheet objects for theme + container styles.
 * Shared across all instances of a registered tag, so 100 instances share
 * 1-2 sheets instead of 100 inline `<style>` tags.
 *
 * Falls back to per-instance `<style>` elements when constructable
 * stylesheets aren't available (older browsers / some test runtimes).
 */
type SharedSheets =
  | { kind: "adopted"; sheets: CSSStyleSheet[] }
  | { kind: "fallback"; cssList: string[] };

function buildSharedSheets(description: DescribeOptions): SharedSheets {
  // Ordered so theme vars come first, then the component stylesheet(s),
  // then the `.container` rules from `styles` (which may fine-tune layout).
  const cssList: string[] = [];
  if (description.theme) cssList.push(buildThemeCss(description.theme));
  if (description.stylesheet) {
    const sheets = Array.isArray(description.stylesheet)
      ? description.stylesheet
      : [description.stylesheet];
    for (const css of sheets) if (css) cssList.push(css);
  }
  if (description.styles) cssList.push(buildContainerCss(description.styles));

  if (cssList.length === 0) return { kind: "adopted", sheets: [] };

  const supportsConstructable = typeof CSSStyleSheet !== "undefined" &&
    typeof (CSSStyleSheet.prototype as unknown as {
        replaceSync?: unknown;
      }).replaceSync === "function";

  if (supportsConstructable) {
    const sheets: CSSStyleSheet[] = [];
    for (const css of cssList) {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(css);
      sheets.push(sheet);
    }
    return { kind: "adopted", sheets };
  }

  return { kind: "fallback", cssList };
}

function applySharedSheets(shadow: ShadowRoot, shared: SharedSheets): void {
  if (shared.kind === "adopted") {
    if (shared.sheets.length > 0) {
      // Some hosts don't expose `adoptedStyleSheets` on shadow roots; tolerate.
      try {
        (shadow as unknown as { adoptedStyleSheets: CSSStyleSheet[] })
          .adoptedStyleSheets = shared.sheets;
      } catch {
        // Fall through to no-op; styles will be missing in this rare case.
      }
    }
    return;
  }
  for (const css of shared.cssList) {
    const el = document.createElement("style");
    el.textContent = css;
    shadow.appendChild(el);
  }
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

function runCleanups(list: Array<() => void>): void {
  while (list.length > 0) {
    const fn = list.pop();
    try {
      fn?.();
    } catch (err) {
      console.error("[tan-compose] cleanup threw:", err);
    }
  }
}

function coerceProp(raw: string, type: PropDef["type"]): unknown {
  switch (type) {
    case "string":
      return raw;
    case "number": {
      const n = Number(raw);
      return Number.isNaN(n) ? undefined : n;
    }
    case "boolean":
      return raw !== "false" && raw !== "0";
    case "json":
      try {
        return JSON.parse(raw);
      } catch {
        return undefined;
      }
  }
}

function coerceForSet(value: unknown, type: PropDef["type"]): unknown {
  switch (type) {
    case "string":
      return value == null ? value : String(value);
    case "number":
      return value == null ? value : Number(value);
    case "boolean":
      return Boolean(value);
    case "json":
      return value;
  }
}

function reflectAttribute(
  element: HTMLElement,
  name: string,
  value: unknown,
  type: PropDef["type"],
): void {
  if (type === "json") return;
  if (type === "boolean") {
    if (value) element.setAttribute(name, "");
    else element.removeAttribute(name);
    return;
  }
  if (value == null) {
    element.removeAttribute(name);
    return;
  }
  element.setAttribute(name, String(value));
}

/** Returns true if a component with the given tag name has been registered. */
export function isComponentRegistered(tagName: string): boolean {
  return componentRegistry.has(tagName);
}

/** Returns the list of all registered tag names. */
export function getRegisteredComponents(): string[] {
  return Array.from(componentRegistry.keys());
}
