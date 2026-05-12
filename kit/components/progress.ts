/**
 * `<tc-progress>` — linear or circular progress indicator.
 *
 * Determinate (with `value`) or indeterminate. Renders ARIA progressbar
 * semantics with `aria-valuenow / aria-valuemin / aria-valuemax`.
 *
 * Props:
 *   value          number  (default 0) — 0..max
 *   max            number  (default 100)
 *   variant        "linear" | "circular" (default "linear")
 *   size           "sm" | "md" | "lg" (default "md")
 *   indeterminate  boolean (default false)
 *   showLabel      boolean (default false) — render the percent text
 *   label          string  (default "") — override the auto label
 *
 * Theme variables:
 *   --tc-progress-track, --tc-progress-fill, --tc-progress-radius,
 *   --tc-progress-fg, --tc-progress-font
 */

import { build, describe } from "@ra9/tan-compose";

const TAG = "tc-progress";

export const tagName = TAG;

function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function pctOf(value: number, max: number): number {
  if (!Number.isFinite(value) || !Number.isFinite(max) || max <= 0) return 0;
  return Math.max(0, Math.min(100, (value / max) * 100));
}

build(
  TAG,
  describe({
    props: {
      value: { type: "number", default: 0 },
      max: { type: "number", default: 100 },
      variant: { type: "string", default: "linear" },
      size: { type: "string", default: "md" },
      indeterminate: { type: "boolean", default: false },
      showLabel: { type: "boolean", default: false },
      label: { type: "string", default: "" },
    },
    theme: {
      "tc-progress-track": "var(--tc-color-rule, #ece5d3)",
      "tc-progress-fill": "var(--tc-color-accent, #a16939)",
      "tc-progress-radius": "999px",
      "tc-progress-fg": "var(--tc-color-ink, #14171f)",
      "tc-progress-font": "var(--tc-font-mono, 'JetBrains Mono', monospace)",
    },
    styles: {
      display: "inline-block",
    },
    template: ({ props }) => {
      const variant = String(props.variant ?? "linear");
      const size = String(props.size ?? "md");
      const indeterminate = !!props.indeterminate;
      const value = Number(props.value ?? 0);
      const max = Number(props.max ?? 100);
      const pct = pctOf(value, max);
      const labelText = props.label ||
        (indeterminate ? "Loading…" : `${Math.round(pct)}%`);

      if (variant === "circular") {
        const dim = size === "sm" ? 28 : size === "lg" ? 72 : 48;
        const stroke = size === "sm" ? 3 : size === "lg" ? 6 : 4;
        const radius = (dim - stroke) / 2;
        const circ = 2 * Math.PI * radius;
        const dash = indeterminate ? circ * 0.25 : (pct / 100) * circ;
        const ariaProps = indeterminate
          ? `role="progressbar" aria-valuetext="${esc(labelText)}"`
          : `role="progressbar" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="${max}"`;
        return `
          <div class="circ size-${esc(size)} ${
          indeterminate ? "indet" : ""
        }" ${ariaProps}>
            <svg viewBox="0 0 ${dim} ${dim}" width="${dim}" height="${dim}" aria-hidden="true">
              <circle class="track" cx="${dim / 2}" cy="${
          dim / 2
        }" r="${radius}" stroke-width="${stroke}" fill="none" />
              <circle
                class="fill"
                cx="${dim / 2}" cy="${dim / 2}" r="${radius}"
                stroke-width="${stroke}" fill="none"
                stroke-dasharray="${dash.toFixed(3)} ${
          (circ - dash).toFixed(3)
        }"
                stroke-dashoffset="${(circ / 4).toFixed(3)}"
                stroke-linecap="round"
              />
            </svg>
            ${
          props.showLabel
            ? `<span class="label" aria-hidden="true">${esc(labelText)}</span>`
            : ""
        }
          </div>
          <style>
            :host { display: inline-block; vertical-align: middle; }
            .circ { position: relative; display: inline-grid; place-items: center; }
            .label {
              position: absolute;
              font-family: var(--tc-progress-font);
              font-size: ${
          size === "sm" ? "0.55rem" : size === "lg" ? "0.92rem" : "0.74rem"
        };
              font-weight: 600;
              color: var(--tc-progress-fg);
              line-height: 1;
            }
            svg { display: block; transform: rotate(-90deg); }
            .track { stroke: var(--tc-progress-track); }
            .fill {
              stroke: var(--tc-progress-fill);
              transition: stroke-dasharray 320ms cubic-bezier(0.4, 0, 0.2, 1);
            }
            .indet svg { animation: tc-prog-spin 1.1s linear infinite; }
            .indet .fill { transition: none; }
            @keyframes tc-prog-spin {
              from { transform: rotate(-90deg); }
              to { transform: rotate(270deg); }
            }
            @media (prefers-reduced-motion: reduce) {
              .indet svg { animation-duration: 3s; }
              .fill { transition: none; }
            }
          </style>
        `;
      }

      // Linear variant.
      const h = size === "sm" ? 4 : size === "lg" ? 12 : 8;
      const ariaProps = indeterminate
        ? `role="progressbar" aria-valuetext="${esc(labelText)}"`
        : `role="progressbar" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="${max}"`;
      return `
        <div class="bar size-${esc(size)} ${
        indeterminate ? "indet" : ""
      }" ${ariaProps}>
          <div class="track">
            <div class="fill" style="width: ${pct.toFixed(2)}%"></div>
          </div>
          ${
        props.showLabel
          ? `<span class="label" aria-hidden="true">${esc(labelText)}</span>`
          : ""
      }
        </div>
        <style>
          :host { display: block; }
          .bar {
            display: grid;
            grid-template-columns: 1fr auto;
            align-items: center;
            gap: 10px;
          }
          .track {
            position: relative;
            height: ${h}px;
            background: var(--tc-progress-track);
            border-radius: var(--tc-progress-radius);
            overflow: hidden;
          }
          .fill {
            height: 100%;
            background: var(--tc-progress-fill);
            border-radius: inherit;
            transition: width 320ms cubic-bezier(0.4, 0, 0.2, 1);
          }
          .label {
            font-family: var(--tc-progress-font);
            font-size: ${
        size === "sm" ? "0.68rem" : size === "lg" ? "0.92rem" : "0.78rem"
      };
            font-weight: 500;
            color: var(--tc-progress-fg);
            min-width: 3ch;
            text-align: right;
          }
          .indet .fill {
            width: 35% !important;
            animation: tc-prog-slide 1.4s ease-in-out infinite;
          }
          @keyframes tc-prog-slide {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(285%); }
          }
          @media (prefers-reduced-motion: reduce) {
            .fill { transition: none; }
            .indet .fill { animation-duration: 4s; }
          }
        </style>
      `;
    },
  }),
);
