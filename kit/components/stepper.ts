/**
 * `<tc-stepper>` — multi-step indicator for onboarding, checkout, wizards.
 *
 * Props:
 *   steps         JSON Array<{ id?: string; title: string; description?: string }>
 *   active        number (default 0, reflects) — current step index
 *   orientation   "horizontal" | "vertical" (default "horizontal")
 *   clickable     boolean (default false) — let users click any step
 *
 * Events:
 *   "tc-step-change"  detail: { active, previous }
 *
 * Theme variables:
 *   --tc-stepper-bg, --tc-stepper-ink, --tc-stepper-soft, --tc-stepper-rule,
 *   --tc-stepper-accent, --tc-stepper-done, --tc-stepper-radius,
 *   --tc-stepper-marker-size, --tc-stepper-font
 */

import { build, describe, html, unsafe } from "@ra9/tan-compose";

const TAG = "tc-stepper";

export const tagName = TAG;

interface Step {
  id?: string;
  title: string;
  description?: string;
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
      steps: { type: "json", default: [] },
      active: { type: "number", default: 0, reflect: true },
      orientation: { type: "string", default: "horizontal" },
      clickable: { type: "boolean", default: false },
    },
    theme: {
      "tc-stepper-bg": "transparent",
      "tc-stepper-ink": "var(--tc-color-ink, #14171f)",
      "tc-stepper-soft": "var(--tc-color-ink-soft, #4a5061)",
      "tc-stepper-rule": "var(--tc-color-rule, #ece5d3)",
      "tc-stepper-accent": "var(--tc-color-accent, #a16939)",
      "tc-stepper-done": "var(--tc-color-success, #2f7a52)",
      "tc-stepper-radius": "999px",
      "tc-stepper-marker-size": "28px",
      "tc-stepper-font":
        "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
    },
    styles: {
      display: "block",
    },
    template: ({ props }) => {
      const steps = (props.steps as Step[] | undefined) ?? [];
      const active = Number(props.active ?? 0);
      const vertical = String(props.orientation) === "vertical";
      const clickable = !!props.clickable;

      const items = steps.map((s, i) => {
        const state = i < active
          ? "done"
          : i === active
          ? "current"
          : "upcoming";
        const marker = state === "done"
          ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`
          : `${i + 1}`;
        return `
          <li class="step state-${state}" data-index="${i}">
            <${clickable ? "button" : "div"} class="row" ${
          clickable
            ? `type="button" aria-current="${
              state === "current" ? "step" : "false"
            }"`
            : `aria-current="${state === "current" ? "step" : "false"}"`
        }>
              <span class="marker" aria-hidden="true">${marker}</span>
              <span class="text">
                <span class="title">${esc(s.title)}</span>
                ${
          s.description ? `<span class="desc">${esc(s.description)}</span>` : ""
        }
              </span>
            </${clickable ? "button" : "div"}>
            ${
          i < steps.length - 1
            ? `<span class="line ${
              i < active ? "done" : ""
            }" aria-hidden="true"></span>`
            : ""
        }
          </li>
        `;
      }).join("");

      return html`
        <ol class="root ${vertical ? "v" : "h"} ${clickable
          ? "clickable"
          : ""}" aria-label="Progress">
          ${unsafe(items)}
        </ol>
        <style>
        :host { display: block; font-family: var(--tc-stepper-font); color: var(--tc-stepper-ink); }
        .root {
          margin: 0; padding: 0; list-style: none;
          background: var(--tc-stepper-bg);
          display: flex;
        }
        .root.h { flex-direction: row; align-items: flex-start; gap: 0; }
        .root.v { flex-direction: column; gap: 0; }

        .step {
          display: flex;
          position: relative;
          flex: 1 1 0;
        }
        .root.v .step { flex: 0 0 auto; flex-direction: column; }
        .root.h .step { flex-direction: column; align-items: center; min-width: 0; }

        .row {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          border: none;
          font: inherit;
          color: inherit;
          text-align: left;
          padding: 0;
          cursor: ${clickable ? "pointer" : "default"};
        }
        .root.h .row { flex-direction: column; align-items: center; text-align: center; padding: 0 12px; }
        .root.v .row { padding: 4px 0; }

        .marker {
          width: var(--tc-stepper-marker-size);
          height: var(--tc-stepper-marker-size);
          border-radius: var(--tc-stepper-radius);
          display: inline-grid;
          place-items: center;
          font-weight: 700;
          font-size: 0.86rem;
          font-variant-numeric: tabular-nums;
          border: 2px solid var(--tc-stepper-rule);
          color: var(--tc-stepper-soft);
          background: var(--tc-color-surface, #ffffff);
          transition: background 0.18s ease, color 0.18s ease, border-color 0.18s ease;
          flex: 0 0 auto;
        }
        .state-current .marker {
          border-color: var(--tc-stepper-accent);
          color: var(--tc-stepper-accent);
        }
        .state-done .marker {
          background: var(--tc-stepper-done);
          border-color: var(--tc-stepper-done);
          color: #fff;
        }

        .text { display: grid; gap: 1px; min-width: 0; }
        .title {
          font-size: 0.92rem;
          font-weight: 600;
          color: var(--tc-stepper-ink);
          line-height: 1.3;
        }
        .state-upcoming .title { color: var(--tc-stepper-soft); }
        .desc {
          font-size: 0.78rem;
          color: var(--tc-stepper-soft);
          line-height: 1.4;
        }
        .root.h .desc {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 16ch;
        }

        .line {
          background: var(--tc-stepper-rule);
          display: block;
          position: absolute;
          transition: background 0.2s ease;
        }
        .line.done { background: var(--tc-stepper-done); }
        .root.h .line {
          top: calc(var(--tc-stepper-marker-size) / 2 - 1px);
          left: calc(50% + var(--tc-stepper-marker-size) / 2 + 8px);
          right: calc(-50% + var(--tc-stepper-marker-size) / 2 + 8px);
          height: 2px;
        }
        .root.v .line {
          left: calc(var(--tc-stepper-marker-size) / 2 - 1px);
          top: calc(var(--tc-stepper-marker-size) + 4px);
          bottom: -8px;
          width: 2px;
          height: auto;
        }
        .root.v .step { padding-bottom: 16px; }
        .root.v .step:last-child { padding-bottom: 0; }

        .row:focus-visible {
          outline: 2px solid var(--tc-stepper-accent);
          outline-offset: 4px;
          border-radius: 6px;
        }
        </style>
      `;
    },
    events: {
      "click .row": (e, ctx) => {
        const host = ctx.host as HTMLElement & {
          active: number;
          clickable: boolean;
        };
        if (!host.clickable) return;
        const li = (e.target as HTMLElement).closest(".step") as
          | HTMLElement
          | null;
        if (!li) return;
        const idx = Number(li.dataset.index);
        if (!Number.isFinite(idx) || idx === host.active) return;
        const previous = host.active;
        host.active = idx;
        ctx.emit("tc-step-change", { active: idx, previous });
      },
    },
  }),
);
