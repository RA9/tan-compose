/**
 * `<tc-slider>` — themed range input.
 *
 * Built on top of the native `<input type="range">` so keyboard and
 * touch behavior are correct without re-implementing them. The chrome
 * around the track is styled to match the rest of the kit.
 *
 * Props:
 *   value      number  (default 0, reflects)
 *   min        number  (default 0)
 *   max        number  (default 100)
 *   step       number  (default 1)
 *   disabled   boolean (default false, reflects)
 *   showValue  boolean (default false) — show the current value as a label
 *   showTicks  boolean (default false) — draw a tick per step
 *   label      string  (default "") — visible label above the slider
 *   suffix     string  (default "") — appended to the value label (e.g. "%")
 *
 * Events:
 *   "tc-input"   detail: { value }   — fires while dragging
 *   "tc-change"  detail: { value, previous } — fires when committed
 *
 * Theme variables:
 *   --tc-slider-track, --tc-slider-fill, --tc-slider-thumb,
 *   --tc-slider-thumb-ring, --tc-slider-radius, --tc-slider-thumb-size,
 *   --tc-slider-track-size, --tc-slider-font, --tc-slider-fg,
 *   --tc-slider-fg-muted
 */

import { build, describe, html, unsafe } from "@ra9/tan-compose";

const TAG = "tc-slider";

export const tagName = TAG;

const STYLE = `
          :host { display: block; font-family: var(--tc-slider-font); color: var(--tc-slider-fg); }
          .head {
            display: flex;
            align-items: baseline;
            justify-content: space-between;
            gap: 12px;
            margin-bottom: 8px;
          }
          .lbl {
            font-size: 0.86rem;
            font-weight: 500;
            color: var(--tc-slider-fg);
          }
          .val {
            font-family: var(--tc-font-mono, 'JetBrains Mono', monospace);
            font-size: 0.84rem;
            color: var(--tc-slider-fg-muted);
            font-variant-numeric: tabular-nums;
          }
          .rail {
            position: relative;
            height: var(--tc-slider-thumb-size);
            display: flex;
            align-items: center;
          }
          .track-bg {
            position: absolute;
            left: 0; right: 0;
            top: 50%;
            height: var(--tc-slider-track-size);
            border-radius: var(--tc-slider-radius);
            background: var(--tc-slider-track);
            transform: translateY(-50%);
          }
          .track-fill {
            position: absolute;
            left: 0;
            top: 50%;
            height: var(--tc-slider-track-size);
            width: var(--tc-slider-pct, 0%);
            border-radius: var(--tc-slider-radius);
            background: var(--tc-slider-fill);
            transform: translateY(-50%);
            transition: width 0.06s linear;
          }
          .tick {
            position: absolute;
            top: 50%;
            width: 2px;
            height: 8px;
            background: var(--tc-slider-fg-muted);
            opacity: 0.4;
            border-radius: 1px;
            transform: translate(-50%, -50%);
            pointer-events: none;
          }
          .range {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            margin: 0;
            background: transparent;
            -webkit-appearance: none;
            appearance: none;
            outline: none;
            cursor: pointer;
          }
          .range:disabled { cursor: not-allowed; opacity: 0.55; }
          .range::-webkit-slider-runnable-track { background: transparent; height: 100%; }
          .range::-moz-range-track { background: transparent; height: 100%; }
          .range::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: var(--tc-slider-thumb-size);
            height: var(--tc-slider-thumb-size);
            border-radius: 999px;
            background: var(--tc-slider-thumb);
            border: 2px solid var(--tc-slider-thumb-ring);
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
            cursor: inherit;
            margin-top: 0;
            transition: transform 0.1s ease;
          }
          .range::-moz-range-thumb {
            width: var(--tc-slider-thumb-size);
            height: var(--tc-slider-thumb-size);
            border-radius: 999px;
            background: var(--tc-slider-thumb);
            border: 2px solid var(--tc-slider-thumb-ring);
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
            cursor: inherit;
            transition: transform 0.1s ease;
          }
          .range:not(:disabled):active::-webkit-slider-thumb { transform: scale(1.1); }
          .range:not(:disabled):active::-moz-range-thumb { transform: scale(1.1); }
          .range:focus-visible::-webkit-slider-thumb {
            box-shadow: 0 0 0 4px color-mix(in srgb, var(--tc-slider-thumb-ring) 25%, transparent);
          }
          .range:focus-visible::-moz-range-thumb {
            box-shadow: 0 0 0 4px color-mix(in srgb, var(--tc-slider-thumb-ring) 25%, transparent);
          }
`;

interface HostExtras {
  value: number;
  min: number;
  max: number;
  step: number;
  disabled: boolean;
  showValue: boolean;
  showTicks: boolean;
  label: string;
  suffix: string;
}

function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

build(
  TAG,
  describe({
    props: {
      value: { type: "number", default: 0, reflect: true },
      min: { type: "number", default: 0 },
      max: { type: "number", default: 100 },
      step: { type: "number", default: 1 },
      disabled: { type: "boolean", default: false, reflect: true },
      showValue: { type: "boolean", default: false },
      showTicks: { type: "boolean", default: false },
      label: { type: "string", default: "" },
      suffix: { type: "string", default: "" },
    },
    theme: {
      "tc-slider-track": "var(--tc-color-rule, #ece5d3)",
      "tc-slider-fill": "var(--tc-color-accent, #a16939)",
      "tc-slider-thumb": "var(--tc-color-surface, #ffffff)",
      "tc-slider-thumb-ring": "var(--tc-color-accent, #a16939)",
      "tc-slider-radius": "999px",
      "tc-slider-thumb-size": "20px",
      "tc-slider-track-size": "6px",
      "tc-slider-font":
        "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
      "tc-slider-fg": "var(--tc-color-ink, #14171f)",
      "tc-slider-fg-muted": "var(--tc-color-ink-muted, #6b7280)",
    },
    styles: {
      display: "block",
    },
    stylesheet: STYLE,
    template: ({ props }) => {
      const value = Number(props.value ?? 0);
      const min = Number(props.min ?? 0);
      const max = Number(props.max ?? 100);
      const step = Number(props.step ?? 1);
      const disabled = !!props.disabled;
      const pct = max > min ? ((value - min) / (max - min)) * 100 : 0;
      const label = String(props.label ?? "");
      const suffix = String(props.suffix ?? "");
      const showValue = !!props.showValue;
      const showTicks = !!props.showTicks;

      let ticks = "";
      if (showTicks && step > 0) {
        const n = Math.floor((max - min) / step) + 1;
        // Cap ticks to avoid runaway DOM on tiny step.
        if (n <= 50) {
          const parts: string[] = [];
          for (let i = 0; i < n; i++) {
            const v = min + i * step;
            const p = ((v - min) / (max - min)) * 100;
            parts.push(
              `<span class="tick" style="left:${p.toFixed(2)}%"></span>`,
            );
          }
          ticks = parts.join("");
        }
      }

      return html`
        ${unsafe(
          label || showValue
            ? `<div class="head">
              ${
              label
                ? `<label for="r" class="lbl">${esc(label)}</label>`
                : "<span></span>"
            }
              ${
              showValue
                ? `<span class="val">${esc(String(value))}${esc(suffix)}</span>`
                : ""
            }
            </div>`
            : "",
        )}
        <div class="rail" style="--tc-slider-pct: ${pct.toFixed(2)}%;">
          <div class="track-bg"></div>
          <div class="track-fill"></div>
          ${unsafe(ticks)}
          <input
            id="r"
            class="range"
            type="range"
            min="${min}"
            max="${max}"
            step="${step}"
            value="${value}"
            ${unsafe(disabled ? "disabled" : "")}
            aria-valuetext="${String(value) + suffix}"
          />
        </div>
      `;
    },
    refs: {
      range: ".range",
    },
    events: {
      "input .range": (e, ctx) => {
        const input = e.target as HTMLInputElement;
        const host = ctx.host as HTMLElement & HostExtras;
        const v = Number(input.value);
        if (host.value === v) return;
        host.value = v;
        ctx.emit("tc-input", { value: v });
      },
      "change .range": (e, ctx) => {
        const input = e.target as HTMLInputElement;
        const host = ctx.host as HTMLElement & HostExtras;
        const v = Number(input.value);
        ctx.emit("tc-change", { value: v, previous: host.value });
      },
    },
  }),
);
