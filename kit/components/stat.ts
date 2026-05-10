/**
 * `<tc-stat>` — a single metric card. Pure presentation; no behavior.
 *
 * Props:
 *   label   string
 *   value   string|number
 *   delta   string|number (optional, displayed below the value)
 *   trend   "up" | "down" | "neutral" (default "neutral") — colors the delta
 *   prefix  string (e.g. "$")
 *   suffix  string (e.g. "%")
 *
 * Theme variables on :host:
 *   --tc-stat-surface, --tc-stat-rule, --tc-stat-label, --tc-stat-value,
 *   --tc-stat-up, --tc-stat-down, --tc-stat-neutral, --tc-stat-radius,
 *   --tc-stat-font
 */

import { build, describe } from "@ra9/tan-compose";

const TAG = "tc-stat";

export const tagName = TAG;

build(
  TAG,
  describe({
    props: {
      label: { type: "string", default: "" },
      value: { type: "string", default: "" },
      delta: { type: "string", default: "" },
      trend: { type: "string", default: "neutral" },
      prefix: { type: "string", default: "" },
      suffix: { type: "string", default: "" },
    },
    theme: {
      "tc-stat-surface": "#ffffff",
      "tc-stat-rule": "#ece5d3",
      "tc-stat-label": "#6b7280",
      "tc-stat-value": "#14171f",
      "tc-stat-up": "#207a5b",
      "tc-stat-down": "#b3261e",
      "tc-stat-neutral": "#6b7280",
      "tc-stat-radius": "12px",
      "tc-stat-font":
        "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    },
    styles: {
      display: "block",
    },
    template: ({ props }) => {
      const trend = String(props.trend ?? "neutral");
      const arrow = trend === "up" ? "▲" : trend === "down" ? "▼" : "•";
      return `
        <div class="card">
          ${props.label ? `<div class="label">${esc(props.label)}</div>` : ""}
          <div class="value">
            ${
        props.prefix ? `<span class="prefix">${esc(props.prefix)}</span>` : ""
      }
            <span class="num">${esc(props.value)}</span>
            ${
        props.suffix ? `<span class="suffix">${esc(props.suffix)}</span>` : ""
      }
          </div>
          ${
        props.delta
          ? `<div class="delta t-${esc(trend)}">
                  <span class="arrow" aria-hidden="true">${arrow}</span>
                  <span>${esc(props.delta)}</span>
                </div>`
          : ""
      }
        </div>
        <style>
          .card {
            background: var(--tc-stat-surface);
            border: 1px solid var(--tc-stat-rule);
            border-radius: var(--tc-stat-radius);
            padding: 18px 20px;
            font-family: var(--tc-stat-font);
          }
          .label {
            font-size: 0.78rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            color: var(--tc-stat-label);
            margin-bottom: 8px;
          }
          .value {
            display: flex;
            align-items: baseline;
            gap: 4px;
            color: var(--tc-stat-value);
            font-size: 1.8rem;
            font-weight: 700;
            letter-spacing: -0.02em;
            line-height: 1.1;
            font-variant-numeric: tabular-nums;
          }
          .prefix, .suffix {
            font-size: 1.05rem;
            font-weight: 500;
            color: var(--tc-stat-label);
          }
          .delta {
            display: inline-flex; align-items: center; gap: 4px;
            margin-top: 10px;
            font-size: 0.85rem; font-weight: 500;
            font-variant-numeric: tabular-nums;
          }
          .delta.t-up      { color: var(--tc-stat-up); }
          .delta.t-down    { color: var(--tc-stat-down); }
          .delta.t-neutral { color: var(--tc-stat-neutral); }
          .arrow { font-size: 0.7rem; }
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
