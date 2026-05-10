// Type definitions for Tan Compose component descriptions.

export type Theme = Record<string, string>;
export type Styles = Record<string, string>;

export interface EventEmitter {
  name: string;
  handler: (e: Event) => void;
}

/** Type tag for a typed component property. */
export type PropType = "string" | "number" | "boolean" | "json";

export interface PropDef<T = unknown> {
  /** How to coerce attribute string values into the property's runtime type. */
  type: PropType;
  /** Default value used when neither attribute nor explicit set provides one. */
  default?: T;
  /** When true, setting the property mirrors the value back to an attribute (string/number/boolean only). */
  reflect?: boolean;
}

/** The render context passed to template functions, event handlers, and list/condition predicates. */
export interface ComponentCtx {
  /** Current property values. Reading is fine; mutating won't trigger a render — use the setter on `host` instead. */
  props: Readonly<Record<string, unknown>>;
  /** Internal state map. */
  state: Readonly<Record<string, unknown>>;
  /** The host element. Use `host.<propName> = ...` or `host.setState(k, v)` to trigger updates. */
  host: HTMLElement;
  /** Refs populated from the `refs` map after every render. Selectors that match nothing return `null`. */
  refs: Readonly<Record<string, Element | null>>;
  /** Sets an internal state value and re-renders if the value changed. */
  setState: (key: string, value: unknown) => void;
  /** Reads an internal state value. */
  getState: <T = unknown>(key: string) => T | undefined;
  /** Dispatches a bubbling, composed CustomEvent from the host. */
  emit: (eventName: string, detail?: unknown) => void;
}

/** Function form of `template`. Re-invoked on every render. Must return safe HTML. */
export type TemplateFn = (ctx: ComponentCtx) => string;

/** Configuration for keyed list rendering on a child describe. */
export interface ListConfig<T = unknown> {
  /** Returns the items to render. Recomputed on every parent render. */
  items: (ctx: ComponentCtx) => readonly T[];
  /** Returns a stable key for an item (used for DOM reuse across renders). */
  key: (item: T, index: number) => string | number;
  /** Returns a child description for a given item. */
  render: (item: T, index: number, ctx: ComponentCtx) => DescribeOptions;
}

/**
 * Map of delegated event handlers.
 * Keys are `"<event-type> <css-selector>"` strings — e.g. `"click .row-delete"`.
 * The selector matches against the event target relative to the shadow container.
 */
export type EventDelegateMap = Record<
  string,
  (event: Event, ctx: ComponentCtx) => void
>;

export interface DescribeOptions {
  /** HTML tag for child elements. Ignored for the host element (use `build(tagName, …)`). Default: 'div'. */
  tag?: string;
  /** CSS variables exposed on the host (`:host` for the registered component, inline for children). */
  theme?: Theme;
  /** Inline styles. Applied to a `.container` rule on the host, inline on children. */
  styles?: Styles;
  /** className applied to the rendered element. */
  className?: string;
  /** HTML attributes set on construction (children) or initial host attrs. */
  attributes?: Record<string, string>;
  /**
   * Inner HTML rendered into the element. May be a string (static) or a function that receives the
   * render context and returns an HTML string (re-evaluated on every render).
   * WARNING: not sanitized — never interpolate untrusted user input.
   */
  template?: string | TemplateFn;
  /** Static nested children. Cannot be combined with `for`. */
  children?: DescribeOptions[];
  /** Click handler attached on connect. */
  action?: (event: Event) => void;
  /**
   * Map of delegated event handlers attached at the shadow-container level.
   * Keys are `"<event-type> <css-selector>"`. Selector-less keys (e.g. `"click"`) match the host.
   */
  events?: EventDelegateMap;
  /** Custom-event listeners attached on connect, removed on disconnect. */
  emit?: EventEmitter[];
  /** Hook fired before the element is rendered for the first time. */
  beforeMount?: (this: HTMLElement) => void;
  /** Hook fired after the element is connected and rendered. */
  afterMount?: (this: HTMLElement) => void;
  /**
   * Hook fired after every render, including the initial one. Use this for
   * imperative DOM work that needs to run on every render — e.g. calling
   * `dialog.showModal()` on a freshly-rendered `<dialog>`. Fires after refs
   * have been (re-)populated.
   */
  afterRender?: (this: HTMLElement) => void;
  /** Hook fired when the element is disconnected from the DOM. */
  unmount?: (this: HTMLElement) => void;
  /**
   * Map of name → CSS selector. After every render, the matching shadow-root
   * elements are exposed as `host.refs.<name>` and `ctx.refs.<name>`. A
   * selector that matches nothing yields `null`. Refs are re-queried each
   * render, so they always point at the current DOM.
   */
  refs?: Record<string, string>;
  /**
   * Opt in to the Form-Associated Custom Elements API. When true, the host
   * sets `static formAssociated = true`, calls `attachInternals()` in the
   * constructor, and (if a `value` prop is declared) auto-syncs the value to
   * `internals.setFormValue` on every prop change. The internals are exposed
   * on `host.internals` and on `ctx.host.internals`.
   */
  formAssociated?: boolean;
  /** Called when the host is associated with a form. */
  formAssociatedCallback?: (
    this: HTMLElement,
    form: HTMLFormElement | null,
  ) => void;
  /** Called when the host's disabled state changes (e.g. via a parent fieldset). */
  formDisabledCallback?: (this: HTMLElement, disabled: boolean) => void;
  /** Called when the host's owning form is reset. */
  formResetCallback?: (this: HTMLElement) => void;
  /** Called to restore state on history navigation or autofill. */
  formStateRestoreCallback?: (
    this: HTMLElement,
    state: unknown,
    mode: "restore" | "autocomplete",
  ) => void;
  /**
   * Attribute names to observe for reactivity. When any listed attribute changes,
   * `setState(attr, value)` is called and the element re-renders.
   * Note: this is opt-in and independent of the `attributes` field, which only sets initial values.
   */
  observedAttributes?: string[];
  /**
   * Typed properties exposed on the host element. Setting one triggers a re-render
   * if the new value isn't `Object.is`-equal to the previous value.
   * Initial values come from the matching attribute (string-coerced) when present, else `default`.
   */
  props?: Record<string, PropDef>;
  /**
   * Conditional rendering on a child describe. When the predicate returns false the
   * subtree is omitted from output. (Only valid on children, not on the host.)
   */
  if?: (ctx: ComponentCtx) => boolean;
  /**
   * Keyed list rendering on a child describe. Replaces `children` for that node.
   * Reuses DOM nodes across renders by `key` and reorders in place.
   */
  for?: ListConfig;
}
