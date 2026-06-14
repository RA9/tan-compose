/**
 * `<tc-button>` — a styled button with variants, sizes, disabled and loading
 * states. Accepts content via the default slot.
 *
 * Renders as a real `<button>` by default. If `href` is set, renders as an
 * `<a>` instead — same styling, semantics of a link. Useful for CTAs and
 * navigation that should look like buttons.
 *
 * Props:
 *   variant   "primary" | "secondary" | "ghost" | "danger" (default "primary")
 *   size      "sm" | "md" | "lg" (default "md")
 *   disabled  boolean (default false, reflects)
 *   loading   boolean (default false)
 *   block     boolean (default false) — full-width
 *   type      "button" | "submit" | "reset" (default "button") — ignored
 *             when `href` is set
 *   href      string  optional — render as an anchor pointing here
 *   target    string  optional — only applied when href is set
 *   rel       string  optional — only applied when href is set
 *
 * Events (composed, bubble out of the shadow root):
 *   tc-submit  cancelable. Fires when a `type="submit"` button is
 *              activated and a `<form>` ancestor is found. `detail.form`
 *              is the form element. preventDefault() suppresses the
 *              implicit `form.requestSubmit()`.
 *   tc-reset   cancelable. Fires when a `type="reset"` button is
 *              activated and a `<form>` ancestor is found. `detail.form`
 *              is the form element. preventDefault() suppresses the
 *              implicit `form.reset()`.
 *
 * Note on shadow DOM + forms: a `<button type="submit">` rendered
 * inside this component's shadow root would NOT submit an outer form on
 * its own — submit-button-ness does not pierce the shadow boundary.
 * `tc-button` works around this by listening for clicks on the host and
 * walking the light DOM with `closest("form")` to find the form, then
 * calling `form.requestSubmit()` (or `.reset()`) itself.
 *
 * Theme variables exposed on :host (override at the page level):
 *   --tc-btn-primary-bg, --tc-btn-primary-fg
 *   --tc-btn-secondary-bg, --tc-btn-secondary-fg, --tc-btn-secondary-border
 *   --tc-btn-ghost-fg, --tc-btn-ghost-border
 *   --tc-btn-danger-bg, --tc-btn-danger-fg
 *   --tc-btn-radius, --tc-btn-font
 *   --tc-btn-padding-x, --tc-btn-padding-y — when set, override the
 *     per-size padding defaults across all sizes. Unset (default
 *     `initial`) preserves the sm/md/lg defaults.
 */

import { build, describe, html, unsafe } from "@ra9/tan-compose";

const TAG = "tc-button";

export const tagName = TAG;

// Declared BEFORE build() because customElements.define() will
// synchronously upgrade any <tc-button> elements already in the DOM
// — that triggers the template, which reads this constant. If declared
// after build(), the first render fires while STYLE is still in
// the TDZ (var) / undefined (const-after-define), producing buttons
// with no styles at all.
const STYLE = `
        .root {
          font-family: var(--tc-btn-font);
          font-weight: 500;
          border-radius: var(--tc-btn-radius);
          cursor: pointer;
          border: 1px solid transparent;
          transition: opacity 0.15s ease, transform 0.05s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          line-height: 1;
          white-space: nowrap;
          text-decoration: none;
          color: inherit;
        }
        .root.block { width: 100%; display: flex; }
        .root:disabled,
        .root[aria-disabled="true"] { opacity: 0.55; cursor: not-allowed; }
        .root:not(:disabled):not([aria-disabled="true"]):active {
          transform: translateY(1px);
        }
        a.root:focus-visible {
          outline: 2px solid currentColor;
          outline-offset: 2px;
        }

        .s-sm {
          font-size: 0.82rem;
          padding: var(--tc-btn-padding-y, 6px) var(--tc-btn-padding-x, 12px);
        }
        .s-md {
          font-size: 0.92rem;
          padding: var(--tc-btn-padding-y, 9px) var(--tc-btn-padding-x, 16px);
        }
        .s-lg {
          font-size: 1.0rem;
          padding: var(--tc-btn-padding-y, 12px) var(--tc-btn-padding-x, 22px);
        }

        .v-primary {
          background: var(--tc-btn-primary-bg);
          color: var(--tc-btn-primary-fg);
        }
        .v-secondary {
          background: var(--tc-btn-secondary-bg);
          color: var(--tc-btn-secondary-fg);
          border-color: var(--tc-btn-secondary-border);
        }
        .v-ghost {
          background: transparent;
          color: var(--tc-btn-ghost-fg);
          border-color: var(--tc-btn-ghost-border);
        }
        .v-danger {
          background: var(--tc-btn-danger-bg);
          color: var(--tc-btn-danger-fg);
        }

        .v-primary:not(:disabled):not([aria-disabled="true"]):hover,
        .v-danger:not(:disabled):not([aria-disabled="true"]):hover {
          filter: brightness(1.08);
        }
        .v-secondary:not(:disabled):not([aria-disabled="true"]):hover,
        .v-ghost:not(:disabled):not([aria-disabled="true"]):hover {
          background: rgba(20, 23, 31, 0.04);
        }

        .spinner {
          width: 12px; height: 12px; border-radius: 50%;
          border: 2px solid currentColor;
          border-right-color: transparent;
          animation: tc-btn-spin 0.7s linear infinite;
        }

        @keyframes tc-btn-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
`;

build(
  TAG,
  describe({
    props: {
      variant: { type: "string", default: "primary" },
      size: { type: "string", default: "md" },
      disabled: { type: "boolean", default: false, reflect: true },
      loading: { type: "boolean", default: false },
      block: { type: "boolean", default: false },
      href: { type: "string", default: "" },
      target: { type: "string", default: "" },
      rel: { type: "string", default: "" },
      type: { type: "string", default: "button" },
    },
    theme: {
      "tc-btn-primary-bg": "var(--tc-color-ink, #14171f)",
      "tc-btn-primary-fg": "var(--tc-color-surface, #ffffff)",
      "tc-btn-secondary-bg": "var(--tc-color-surface, #ffffff)",
      "tc-btn-secondary-fg": "var(--tc-color-ink, #14171f)",
      "tc-btn-secondary-border": "var(--tc-color-rule-strong, #d9cfb8)",
      "tc-btn-ghost-fg": "var(--tc-color-ink, #14171f)",
      "tc-btn-ghost-border": "transparent",
      "tc-btn-danger-bg": "var(--tc-color-danger, #b3261e)",
      "tc-btn-danger-fg": "var(--tc-color-surface, #ffffff)",
      "tc-btn-radius": "var(--tc-radius-md, 8px)",
      "tc-btn-font":
        "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
      "tc-btn-padding-x": "initial",
      "tc-btn-padding-y": "initial",
    },
    styles: {
      display: "inline-block",
      "vertical-align": "middle",
    },
    stylesheet: STYLE,
    template: ({ props }) => {
      const cls = `root v-${esc(props.variant)} s-${esc(props.size)}${
        props.block ? " block" : ""
      }`;
      const inner = `${
        props.loading ? '<span class="spinner" aria-hidden="true"></span>' : ""
      }
        <span class="content"><slot></slot></span>`;
      const href = String(props.href ?? "");
      const isAnchor = href.length > 0;
      const isDisabled = !!(props.disabled || props.loading);

      if (isAnchor) {
        const targetAttr = props.target ? ` target="${esc(props.target)}"` : "";
        // When target=_blank and no explicit rel was provided, default to a
        // safe rel for new-window links.
        const relValue = props.rel
          ? String(props.rel)
          : String(props.target) === "_blank"
          ? "noopener"
          : "";
        const relAttr = relValue ? ` rel="${esc(relValue)}"` : "";
        // Disabled anchors: omit href (so click does nothing) and mark
        // aria-disabled. The .root:disabled CSS still applies via the
        // aria-disabled rule below.
        const hrefAttr = isDisabled ? "" : ` href="${esc(href)}"`;
        const ariaDisabled = isDisabled ? ` aria-disabled="true"` : "";
        const tabIndex = isDisabled ? ` tabindex="-1"` : "";
        return html`
          <a
            part="button"
            class="${unsafe(cls)}"
            ${unsafe(hrefAttr)}${unsafe(targetAttr)}${unsafe(relAttr)}${unsafe(
              ariaDisabled,
            )}${unsafe(tabIndex)}
            role="button"
          >
            ${unsafe(inner)}
          </a>
        `;
      }

      const rawType = String(props.type ?? "button");
      const btnType = rawType === "submit" || rawType === "reset"
        ? rawType
        : "button";

      return html`
        <button
          part="button"
          class="${unsafe(cls)}"
          ${unsafe(isDisabled ? "disabled" : "")}
          type="${btnType}"
        >
          ${unsafe(inner)}
        </button>
      `;
    },
    events: {
      "click .root": (_event, ctx) => {
        const host = ctx.host as HTMLElement & {
          type: string;
          href: string;
          disabled: boolean;
          loading: boolean;
        };
        if (host.disabled || host.loading) return;
        // Anchor variant handles its own navigation; don't intercept.
        if (String(host.href ?? "")) return;

        const type = String(host.type ?? "button");
        if (type !== "submit" && type !== "reset") return;

        const form = host.closest("form");
        if (!form) return;

        // Dispatch a cancelable event so consumers can intercept and
        // run validation / async work before the form submits.
        const eventName = type === "submit" ? "tc-submit" : "tc-reset";
        const ev = new CustomEvent(eventName, {
          detail: { form },
          bubbles: true,
          composed: true,
          cancelable: true,
        });
        host.dispatchEvent(ev);
        if (ev.defaultPrevented) return;

        if (type === "submit") {
          // requestSubmit() runs validation and dispatches a real
          // `submit` event — submit() skips both, which is rarely
          // what you want.
          form.requestSubmit();
        } else {
          form.reset();
        }
      },
    },
  }),
);

function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
