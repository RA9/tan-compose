/**
 * `<tc-callout>` — admonition / note box. Variants for note, info,
 * warning, danger, success.
 *
 * Props:
 *   variant   "note" | "info" | "warning" | "danger" | "success" (default "note")
 *   title     string — optional bolded heading line
 *   compact   boolean (default false) — tighter padding for inline use
 *
 * Slot:
 *   default — body content
 *
 * Theme variables on :host:
 *   --tc-callout-bg, --tc-callout-fg, --tc-callout-border,
 *   --tc-callout-title, --tc-callout-radius, --tc-callout-font,
 *   plus per-variant overrides like --tc-callout-warning-bg etc.
 */

import { build, describe } from "@ra9/tan-compose";

const TAG = "tc-callout";

export const tagName = TAG;

// Declared BEFORE build() because customElements.define() synchronously
// upgrades any <tc-callout> already in the DOM — that triggers the
// template, which reads ICONS. esbuild's minifier converts `const` to
// `var` so a constant declared after build() is hoisted-but-undefined
// when the template first runs. See kit/components/button.ts for the
// same pattern.
const ICONS: Record<string, string> = {
  note:
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
  info:
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
  success:
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  warning:
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  danger:
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
};

build(
  TAG,
  describe({
    props: {
      variant: { type: "string", default: "note" },
      title: { type: "string", default: "" },
      compact: { type: "boolean", default: false },
    },
    theme: {
      "tc-callout-radius": "var(--tc-radius-md, 8px)",
      "tc-callout-font":
        "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif)",

      // Per-variant tokens. Each one resolves through the global semantic
      // tokens so a theme switch re-skins all callouts.
      "tc-callout-note-bg": "var(--tc-color-surface-alt, #faf8f3)",
      "tc-callout-note-fg": "var(--tc-color-ink-soft, #4a5061)",
      "tc-callout-note-border": "var(--tc-color-rule-strong, #d9cfb8)",

      "tc-callout-info-bg": "var(--tc-color-info-bg, #dde6f4)",
      "tc-callout-info-fg": "var(--tc-color-info-fg, #1f3a66)",
      "tc-callout-info-border": "var(--tc-color-info, #3a5b8c)",

      "tc-callout-success-bg": "var(--tc-color-success-bg, #dbece2)",
      "tc-callout-success-fg": "var(--tc-color-success-fg, #155b40)",
      "tc-callout-success-border": "var(--tc-color-success, #207a5b)",

      "tc-callout-warning-bg": "var(--tc-color-warning-bg, #f5e7cf)",
      "tc-callout-warning-fg": "var(--tc-color-warning-fg, #7a4f0a)",
      "tc-callout-warning-border": "var(--tc-color-warning, #a87326)",

      "tc-callout-danger-bg": "var(--tc-color-danger-bg, #f4dad7)",
      "tc-callout-danger-fg": "var(--tc-color-danger-fg, #7a1a14)",
      "tc-callout-danger-border": "var(--tc-color-danger, #b3261e)",
    },
    styles: {
      display: "block",
    },
    template: ({ props }) => {
      const variant = String(props.variant ?? "note");
      const symbol = ICONS[variant] ?? ICONS.note;
      return `
        <aside
          class="callout v-${esc(variant)} ${props.compact ? "compact" : ""}"
          role="${variant === "danger" ? "alert" : "note"}"
        >
          <span class="icon" aria-hidden="true">${symbol}</span>
          <div class="body">
            ${props.title ? `<div class="title">${esc(props.title)}</div>` : ""}
            <div class="content"><slot></slot></div>
          </div>
        </aside>
        <style>
          :host { display: block; }
          .callout {
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 12px;
            padding: 14px 18px;
            border-radius: var(--tc-callout-radius);
            border-left: 3px solid var(--callout-border);
            background: var(--callout-bg);
            color: var(--callout-fg);
            font-family: var(--tc-callout-font);
            font-size: 0.95rem;
            line-height: 1.6;
          }
          .callout.compact { padding: 10px 14px; font-size: 0.9rem; }

          .v-note    { --callout-bg: var(--tc-callout-note-bg);    --callout-fg: var(--tc-callout-note-fg);    --callout-border: var(--tc-callout-note-border); }
          .v-info    { --callout-bg: var(--tc-callout-info-bg);    --callout-fg: var(--tc-callout-info-fg);    --callout-border: var(--tc-callout-info-border); }
          .v-success { --callout-bg: var(--tc-callout-success-bg); --callout-fg: var(--tc-callout-success-fg); --callout-border: var(--tc-callout-success-border); }
          .v-warning { --callout-bg: var(--tc-callout-warning-bg); --callout-fg: var(--tc-callout-warning-fg); --callout-border: var(--tc-callout-warning-border); }
          .v-danger  { --callout-bg: var(--tc-callout-danger-bg);  --callout-fg: var(--tc-callout-danger-fg);  --callout-border: var(--tc-callout-danger-border); }

          .icon {
            display: inline-flex;
            width: 20px; height: 20px;
            margin-top: 2px;
            color: var(--callout-border);
          }
          .icon svg { width: 100%; height: 100%; }

          .title {
            font-weight: 600;
            margin-bottom: 4px;
            color: var(--callout-fg);
          }

          .content ::slotted(p:first-child) { margin-top: 0; }
          .content ::slotted(p:last-child)  { margin-bottom: 0; }
        </style>
      `;
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
