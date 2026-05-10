/**
 * `<tc-badge>` — small label, often for status. Pure presentation.
 *
 * Props:
 *   variant  "neutral" | "info" | "success" | "warning" | "danger" (default "neutral")
 *   size     "sm" | "md" (default "md")
 *   pill     boolean (default false) — rounded full
 *
 * Slot:
 *   default — content
 *
 * Theme variables on :host:
 *   --tc-badge-radius, --tc-badge-font,
 *   --tc-badge-neutral-bg, --tc-badge-neutral-fg,
 *   --tc-badge-info-bg,    --tc-badge-info-fg,
 *   --tc-badge-success-bg, --tc-badge-success-fg,
 *   --tc-badge-warning-bg, --tc-badge-warning-fg,
 *   --tc-badge-danger-bg,  --tc-badge-danger-fg
 */

import { build, describe } from "@ra9/tan-compose";

const TAG = "tc-badge";

export const tagName = TAG;

build(
  TAG,
  describe({
    props: {
      variant: { type: "string", default: "neutral" },
      size: { type: "string", default: "md" },
      pill: { type: "boolean", default: false },
    },
    theme: {
      "tc-badge-radius": "var(--tc-radius-sm, 6px)",
      "tc-badge-font":
        "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
      "tc-badge-neutral-bg": "var(--tc-color-rule, #ece5d3)",
      "tc-badge-neutral-fg": "var(--tc-color-ink, #14171f)",
      "tc-badge-info-bg": "var(--tc-color-info-bg, #dde6f4)",
      "tc-badge-info-fg": "var(--tc-color-info-fg, #1f3a66)",
      "tc-badge-success-bg": "var(--tc-color-success-bg, #dbece2)",
      "tc-badge-success-fg": "var(--tc-color-success-fg, #155b40)",
      "tc-badge-warning-bg": "var(--tc-color-warning-bg, #f5e7cf)",
      "tc-badge-warning-fg": "var(--tc-color-warning-fg, #7a4f0a)",
      "tc-badge-danger-bg": "var(--tc-color-danger-bg, #f4dad7)",
      "tc-badge-danger-fg": "var(--tc-color-danger-fg, #7a1a14)",
    },
    styles: {
      display: "inline-block",
    },
    template: ({ props }) => `
      <span class="badge v-${esc(props.variant)} s-${esc(props.size)} ${
      props.pill ? "pill" : ""
    }">
        <slot></slot>
      </span>
      <style>
        .badge {
          display: inline-flex; align-items: center;
          font-family: var(--tc-badge-font); font-weight: 600;
          line-height: 1; white-space: nowrap;
          border-radius: var(--tc-badge-radius);
        }
        .badge.pill { border-radius: 999px; }
        .s-sm { font-size: 0.7rem; padding: 3px 7px; }
        .s-md { font-size: 0.78rem; padding: 4px 9px; }
        .v-neutral { background: var(--tc-badge-neutral-bg); color: var(--tc-badge-neutral-fg); }
        .v-info    { background: var(--tc-badge-info-bg);    color: var(--tc-badge-info-fg); }
        .v-success { background: var(--tc-badge-success-bg); color: var(--tc-badge-success-fg); }
        .v-warning { background: var(--tc-badge-warning-bg); color: var(--tc-badge-warning-fg); }
        .v-danger  { background: var(--tc-badge-danger-bg);  color: var(--tc-badge-danger-fg); }
      </style>
    `,
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
