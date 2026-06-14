/**
 * Safe HTML templating for tan-compose.
 *
 * `html` is a tagged template that escapes every interpolation by default, so
 * untrusted data can't break out into markup. It returns a `SafeHtml` value
 * that the renderer assigns to the DOM without re-escaping. Nested `html`
 * results and the output of `when`/`map` are treated as already-safe; plain
 * strings, numbers, etc. are escaped. Use `unsafe()` to opt a trusted string
 * out of escaping.
 *
 *   import { html, when, map } from "@ra9/tan-compose";
 *
 *   template: ({ props }) => html`
 *     <h1>${props.title}</h1>
 *     ${when(props.items.length === 0,
 *       () => html`<p class="empty">Nothing here.</p>`,
 *       () => html`<ul>${map(props.items, (it) => html`<li>${it.name}</li>`)}</ul>`)}
 *   `;
 */

const SAFE = Symbol.for("tan-compose.SafeHtml");

/** A string of HTML that the renderer trusts verbatim (no escaping). */
export class SafeHtml {
  readonly value: string;
  // Branded so isSafeHtml works across module/realm boundaries via Symbol.for.
  readonly [SAFE] = true as const;
  constructor(value: string) {
    this.value = value;
  }
  toString(): string {
    return this.value;
  }
}

/** True when `v` is a SafeHtml produced by `html`/`unsafe`/`when`/`map`. */
export function isSafeHtml(v: unknown): v is SafeHtml {
  return typeof v === "object" && v !== null &&
    (v as Record<symbol, unknown>)[SAFE] === true;
}

/** HTML-escape a value for safe interpolation into markup. */
export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Mark a string as trusted HTML so `html` interpolates it verbatim.
 * Only ever pass content you fully control — this is the XSS escape hatch.
 */
export function unsafe(value: string): SafeHtml {
  return new SafeHtml(String(value ?? ""));
}

/** Resolve any interpolated value to a string of (safe) HTML. */
function resolve(value: unknown): string {
  if (value == null || value === false || value === true) {
    // null/undefined/false render nothing (enables `cond && html`...``);
    // a bare boolean `true` is almost never meant as literal text.
    return value === true ? "true" : "";
  }
  if (isSafeHtml(value)) return value.value;
  if (Array.isArray(value)) return value.map(resolve).join("");
  return escapeHtml(value);
}

/** Auto-escaping HTML tagged template. Returns a SafeHtml value. */
export function html(
  strings: TemplateStringsArray,
  ...values: unknown[]
): SafeHtml {
  let out = strings[0];
  for (let i = 0; i < values.length; i++) {
    out += resolve(values[i]) + strings[i + 1];
  }
  return new SafeHtml(out);
}

/**
 * Conditional fragment. Renders `thenFn()` when `cond` is truthy, else
 * `elseFn?.()` (or nothing). String branches are escaped; SafeHtml branches
 * pass through.
 */
export function when(
  cond: unknown,
  thenFn: () => unknown,
  elseFn?: () => unknown,
): SafeHtml {
  const v = cond ? thenFn() : (elseFn ? elseFn() : "");
  return isSafeHtml(v) ? v : new SafeHtml(resolve(v));
}

/** Map items to fragments and concatenate. String results are escaped. */
export function map<T>(
  items: Iterable<T>,
  fn: (item: T, index: number) => unknown,
): SafeHtml {
  let out = "";
  let i = 0;
  for (const item of items) out += resolve(fn(item, i++));
  return new SafeHtml(out);
}

/**
 * Build a `class` attribute value from a map of name → condition. Falsy
 * conditions drop the class.
 *   class="${classMap({ active: isActive, big: size === 'lg' })}"
 */
export function classMap(map: Record<string, unknown>): string {
  const out: string[] = [];
  for (const name in map) {
    if (Object.prototype.hasOwnProperty.call(map, name) && map[name]) {
      out.push(name);
    }
  }
  return out.join(" ");
}

/**
 * Build a `style` attribute value from a map of property → value. camelCase
 * keys are converted to kebab-case (`fontSize` → `font-size`); custom
 * properties (`--x`) are left as-is. null/undefined/"" entries are dropped.
 */
export function styleMap(
  map: Record<string, string | number | null | undefined>,
): string {
  const out: string[] = [];
  for (const key in map) {
    if (!Object.prototype.hasOwnProperty.call(map, key)) continue;
    const v = map[key];
    if (v == null || v === "") continue;
    const prop = key.startsWith("--")
      ? key
      : key.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
    out.push(`${prop}: ${v}`);
  }
  return out.join("; ");
}
