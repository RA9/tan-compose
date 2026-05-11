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
 *   href      string  optional — render as an anchor pointing here
 *   target    string  optional — only applied when href is set
 *   rel       string  optional — only applied when href is set
 *
 * Theme variables exposed on :host (override at the page level):
 *   --tc-btn-primary-bg, --tc-btn-primary-fg
 *   --tc-btn-secondary-bg, --tc-btn-secondary-fg, --tc-btn-secondary-border
 *   --tc-btn-ghost-fg, --tc-btn-ghost-border
 *   --tc-btn-danger-bg, --tc-btn-danger-fg
 *   --tc-btn-radius, --tc-btn-font
 */

import { build, describe } from "@ra9/tan-compose";

const TAG = "tc-button";

export const tagName = TAG;

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
    },
    styles: {
      display: "inline-block",
      "vertical-align": "middle",
    },
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
        return `
      <a
        part="button"
        class="${cls}"${hrefAttr}${targetAttr}${relAttr}${ariaDisabled}${tabIndex}
        role="button"
      >
        ${inner}
      </a>${BUTTON_STYLE}`;
      }

      return `
      <button
        part="button"
        class="${cls}"
        ${isDisabled ? "disabled" : ""}
        type="button"
      >
        ${inner}
      </button>${BUTTON_STYLE}`;
    },
  }),
);

const BUTTON_STYLE = `
      <style>
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

        .s-sm { font-size: 0.82rem; padding: 6px 12px; }
        .s-md { font-size: 0.92rem; padding: 9px 16px; }
        .s-lg { font-size: 1.0rem;  padding: 12px 22px; }

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
      </style>
`;

function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
