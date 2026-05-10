/**
 * `<tc-card>` — layout primitive: an optionally-titled, optionally-bordered
 * box with named slots for media / header / footer.
 *
 * Props:
 *   title      string  (default "") — header title text
 *   subtitle   string  (default "") — header subtitle text
 *   padded     boolean (default true) — content padding
 *   bordered   boolean (default true) — outline border
 *   elevated   boolean (default false) — soft shadow
 *
 * Slots:
 *   media   — image or visual at the top (full-bleed)
 *   header  — replaces title/subtitle if provided
 *   default — body content
 *   footer  — bottom bar (action buttons etc.)
 *
 * Theme variables on :host:
 *   --tc-card-surface, --tc-card-ink, --tc-card-soft, --tc-card-rule,
 *   --tc-card-radius, --tc-card-shadow, --tc-card-font
 */

import { build, describe } from "@ra9/tan-compose";

const TAG = "tc-card";

export const tagName = TAG;

build(
  TAG,
  describe({
    props: {
      title: { type: "string", default: "" },
      subtitle: { type: "string", default: "" },
      padded: { type: "boolean", default: true },
      bordered: { type: "boolean", default: true },
      elevated: { type: "boolean", default: false },
    },
    theme: {
      "tc-card-surface": "#ffffff",
      "tc-card-ink": "#14171f",
      "tc-card-soft": "#5a6072",
      "tc-card-rule": "#ece5d3",
      "tc-card-radius": "12px",
      "tc-card-shadow": "0 8px 24px rgba(20, 23, 31, 0.06)",
      "tc-card-font":
        "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    },
    styles: {
      display: "block",
    },
    template: ({ props }) => `
      <div class="card ${props.bordered ? "bordered" : ""} ${
      props.elevated ? "elevated" : ""
    } ${props.padded ? "padded" : ""}">
        <div class="media"><slot name="media"></slot></div>
        <div class="head">
          <slot name="header">
            ${props.title ? `<div class="title">${esc(props.title)}</div>` : ""}
            ${
      props.subtitle ? `<div class="subtitle">${esc(props.subtitle)}</div>` : ""
    }
          </slot>
        </div>
        <div class="body"><slot></slot></div>
        <div class="foot"><slot name="footer"></slot></div>
      </div>
      <style>
        .card {
          background: var(--tc-card-surface);
          color: var(--tc-card-ink);
          font-family: var(--tc-card-font);
          border-radius: var(--tc-card-radius);
          overflow: hidden;
        }
        .card.bordered { border: 1px solid var(--tc-card-rule); }
        .card.elevated { box-shadow: var(--tc-card-shadow); }
        .media { display: contents; }
        .media::slotted(*) {
          display: block; width: 100%;
        }
        .card.padded .head:has(::slotted(*)),
        .card.padded .head:has(.title),
        .card.padded .head:has(.subtitle) {
          padding: 18px 20px 8px;
        }
        .head:not(:has(*)) { display: none; }
        .title {
          font-weight: 700; font-size: 1.05rem;
          letter-spacing: -0.01em;
        }
        .subtitle {
          margin-top: 4px; font-size: 0.88rem;
          color: var(--tc-card-soft);
        }
        .card.padded .body { padding: 18px 20px; }
        .card.padded .head ~ .body { padding-top: 8px; }
        .foot:has(::slotted(*)) {
          padding: 12px 20px 16px;
          border-top: 1px solid var(--tc-card-rule);
          display: flex; gap: 8px; justify-content: flex-end;
        }
        .foot:not(:has(*)) { display: none; }
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
