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
 *   media   — image or visual at the top (full-bleed, no padding)
 *   header  — replaces title/subtitle if provided
 *   default — body content (this is the unnamed slot)
 *   footer  — bottom bar (action buttons etc.)
 *
 * Theme variables on :host:
 *   --tc-card-surface, --tc-card-ink, --tc-card-soft, --tc-card-rule,
 *   --tc-card-radius, --tc-card-shadow, --tc-card-font,
 *   --tc-card-padding-x, --tc-card-padding-y, --tc-card-gap
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
      "tc-card-surface": "var(--tc-color-surface, #ffffff)",
      "tc-card-ink": "var(--tc-color-ink, #14171f)",
      "tc-card-soft": "var(--tc-color-ink-soft, #5a6072)",
      "tc-card-rule": "var(--tc-color-rule, #ece5d3)",
      "tc-card-radius": "var(--tc-radius-lg, 12px)",
      "tc-card-shadow":
        "var(--tc-shadow-md, 0 8px 24px rgba(20, 23, 31, 0.06))",
      "tc-card-font":
        "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
      // Spacing tokens — override per-instance for tighter/looser cards.
      "tc-card-padding-x": "var(--tc-space-5, 20px)",
      "tc-card-padding-y": "var(--tc-space-5, 20px)",
      "tc-card-gap": "var(--tc-space-3, 12px)",
    },
    styles: {
      display: "block",
    },
    template: ({ props }) => {
      const hasHeaderProps = Boolean(props.title) || Boolean(props.subtitle);
      const classes = [
        "card",
        props.bordered ? "bordered" : "",
        props.elevated ? "elevated" : "",
        // Padding is the default; only stamp `nopad` when the user
        // explicitly opted out. Defending against an undefined prop
        // means the body still has padding out of the box.
        props.padded === false ? "nopad" : "",
        hasHeaderProps ? "has-header" : "",
      ].filter(Boolean).join(" ");

      return `
        <div class="${classes}">
          <div class="media"><slot name="media"></slot></div>
          <div class="head">
            <slot name="header">
              ${
        props.title ? `<div class="title">${esc(props.title)}</div>` : ""
      }
              ${
        props.subtitle
          ? `<div class="subtitle">${esc(props.subtitle)}</div>`
          : ""
      }
            </slot>
          </div>
          <div class="body"><slot></slot></div>
          <div class="foot"><slot name="footer"></slot></div>
        </div>
        <style>
          :host { display: block; }
          .card {
            background: var(--tc-card-surface);
            color: var(--tc-card-ink);
            font-family: var(--tc-card-font);
            border-radius: var(--tc-card-radius);
            overflow: hidden;
          }
          .card.bordered { border: 1px solid var(--tc-card-rule); }
          .card.elevated { box-shadow: var(--tc-card-shadow); }

          /* Body padding is the deterministic default. The head and foot
             pad themselves separately. Padding kicks in even if the
             padded class somehow is not applied to the host, so consumers
             get a sensibly-padded card out of the box without needing to
             remember a flag. Override only when padded=false. */
          .body {
            padding: var(--tc-card-padding-y) var(--tc-card-padding-x);
          }

          /* Head padding when title/subtitle props are set OR something
             is slotted into name="header". The body then trims its top
             padding so the two sections meet at --tc-card-gap. */
          .card.has-header .head,
          .card .head:has(::slotted(*)) {
            padding:
              var(--tc-card-padding-y)
              var(--tc-card-padding-x)
              var(--tc-card-gap);
          }
          .card.has-header .head + .body,
          .card .head:has(::slotted(*)) + .body {
            padding-top: 0;
          }

          /* Hide an empty head — neither props nor slotted content. */
          .card:not(.has-header) .head:not(:has(::slotted(*))) {
            display: none;
          }

          /* Foot only renders when there's slotted footer content. */
          .card .foot:has(::slotted(*)) {
            padding:
              var(--tc-card-gap)
              var(--tc-card-padding-x)
              var(--tc-card-padding-y);
            border-top: 1px solid var(--tc-card-rule);
            display: flex;
            gap: var(--tc-space-2, 8px);
            justify-content: flex-end;
          }
          .card .foot:not(:has(::slotted(*))) { display: none; }

          /* Media is full-bleed (no horizontal padding) but we still
             trim the body's top padding when media is shown so the
             image sits flush against the border. */
          .media:not(:has(::slotted(*))) { display: none; }
          .media::slotted(*) {
            display: block;
            width: 100%;
            height: auto;
          }

          /* Title / subtitle defaults (used inside the slot fallback). */
          .title {
            font-weight: 700;
            font-size: 1.05rem;
            letter-spacing: -0.01em;
            line-height: 1.3;
          }
          .subtitle {
            margin-top: 4px;
            font-size: 0.88rem;
            line-height: 1.45;
            color: var(--tc-card-soft);
          }

          /* padded=false opt-out — the template applies "nopad" to the
             host inner .card when the prop is false. */
          .card.nopad .body,
          .card.nopad .head,
          .card.nopad .foot { padding: 0; }
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
