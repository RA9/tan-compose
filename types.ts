// Type definitions for Tan Compose component descriptions.

export type Theme = Record<string, string>;
export type Styles = Record<string, string>;

export interface EventEmitter {
  name: string;
  handler: (e: Event) => void;
}

export interface DescribeOptions {
  /** HTML tag for child elements. Ignored for the host element (use `build(tagName, …)`). Default: 'div'. */
  tag?: string;
  /** CSS variables exposed on the host (`:host` for the registered component, inline for children). */
  theme?: Theme;
  /** Inline styles. Applied to a `.container` rule on the host, inline on children. */
  styles?: Styles;
  /** className applied to the rendered element. */
  className?: string;
  /** HTML attributes set on construction. */
  attributes?: Record<string, string>;
  /** Inner HTML rendered into the element. WARNING: not sanitized — never pass untrusted input. */
  template?: string;
  /** Nested children. */
  children?: DescribeOptions[];
  /** Click handler attached on connect. */
  action?: (event: Event) => void;
  /** Custom-event listeners attached on connect, removed on disconnect. */
  emit?: EventEmitter[];
  /** Hook fired before the element is rendered/connected to the DOM. */
  beforeMount?: (this: HTMLElement) => void;
  /** Hook fired after the element is connected to the DOM. */
  afterMount?: (this: HTMLElement) => void;
  /** Hook fired when the element is disconnected from the DOM. */
  unmount?: (this: HTMLElement) => void;
  /**
   * Attribute names to observe for reactivity. When any listed attribute changes,
   * `setState(attr, value)` is called and the element re-renders.
   * Note: this is opt-in and independent of the `attributes` field, which only sets initial values.
   */
  observedAttributes?: string[];
}
