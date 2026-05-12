/**
 * `<tc-rating>` — star rating input.
 *
 * Props:
 *   value      number  (default 0, reflects) — current rating
 *   max        number  (default 5) — total number of stars
 *   readonly   boolean (default false)
 *   allowHalf  boolean (default false) — half-star precision
 *   size       "sm" | "md" | "lg" (default "md")
 *   ariaLabel  string  (default "Rating")
 *
 * Events:
 *   "tc-change"  detail: { value: number, previous: number }
 *
 * Theme variables:
 *   --tc-rating-fill, --tc-rating-track, --tc-rating-size
 */

import { build, describe } from "@ra9/tan-compose";

const TAG = "tc-rating";

export const tagName = TAG;

interface HostExtras {
  value: number;
  max: number;
  readonly: boolean;
  allowHalf: boolean;
  size: string;
  _ratingHover: number;
}

function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const STAR_PATH =
  "M12 17.27 18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z";

build(
  TAG,
  describe({
    props: {
      value: { type: "number", default: 0, reflect: true },
      max: { type: "number", default: 5 },
      readonly: { type: "boolean", default: false, reflect: true },
      allowHalf: { type: "boolean", default: false },
      size: { type: "string", default: "md" },
      ariaLabel: { type: "string", default: "Rating" },
    },
    theme: {
      "tc-rating-fill": "var(--tc-color-warning, #d7a52f)",
      "tc-rating-track": "var(--tc-color-rule, #ece5d3)",
    },
    styles: {
      display: "inline-block",
    },
    template: ({ props, state }) => {
      const max = Math.max(1, Number(props.max ?? 5));
      const value = Number(props.value ?? 0);
      const hover = Number((state.hover as number | undefined) ?? -1);
      const display = hover >= 0 ? hover : value;
      const size = String(props.size ?? "md");
      const readonly = !!props.readonly;
      const allowHalf = !!props.allowHalf;
      const ariaLabel = esc(props.ariaLabel ?? "Rating");

      const pxSize = size === "sm" ? 18 : size === "lg" ? 32 : 24;

      const stars = [];
      for (let i = 1; i <= max; i++) {
        // pct: 0 (empty), 50 (half), 100 (full)
        const diff = display - (i - 1);
        const pct = diff >= 1 ? 100 : diff >= 0.5 && allowHalf ? 50 : diff > 0 && !allowHalf ? 100 : 0;
        const isHalf = pct === 50;
        stars.push(`
          <span class="star ${isHalf ? "half" : pct === 100 ? "full" : "empty"}" data-index="${i}">
            <svg viewBox="0 0 24 24" width="${pxSize}" height="${pxSize}" aria-hidden="true">
              <path class="track" d="${STAR_PATH}" fill="var(--tc-rating-track)" />
              ${
            pct > 0
              ? `<path class="fill" d="${STAR_PATH}" fill="var(--tc-rating-fill)" clip-path="${
                isHalf ? "inset(0 50% 0 0)" : "none"
              }" />`
              : ""
          }
            </svg>
            ${
            allowHalf && !readonly
              ? `<span class="hit-left" data-index="${i}" data-half="1"></span>
                 <span class="hit-right" data-index="${i}" data-half="0"></span>`
              : ""
          }
          </span>
        `);
      }

      return `
        <div
          class="root size-${esc(size)} ${readonly ? "readonly" : ""}"
          role="${readonly ? "img" : "slider"}"
          tabindex="${readonly ? "-1" : "0"}"
          aria-label="${ariaLabel}"
          aria-valuenow="${value}"
          aria-valuemin="0"
          aria-valuemax="${max}"
          aria-valuetext="${value} of ${max}"
        >
          ${stars.join("")}
        </div>
        <style>
          :host { display: inline-block; }
          .root {
            display: inline-flex;
            gap: 2px;
            align-items: center;
            cursor: ${readonly ? "default" : "pointer"};
            outline: none;
          }
          .root:focus-visible {
            outline: 2px solid var(--tc-color-accent, #a16939);
            outline-offset: 4px;
            border-radius: 4px;
          }
          .star {
            position: relative;
            display: inline-block;
            line-height: 0;
          }
          .star svg { display: block; }
          .star:hover .fill { filter: brightness(1.05); }
          .root.readonly .star { cursor: default; }
          .hit-left, .hit-right {
            position: absolute;
            top: 0;
            width: 50%;
            height: 100%;
          }
          .hit-left { left: 0; }
          .hit-right { left: 50%; }
        </style>
      `;
    },
    events: {
      "click .star": (e, ctx) => {
        const host = ctx.host as HTMLElement & HostExtras;
        if (host.readonly) return;
        const target = e.target as HTMLElement;
        // Half hit area takes precedence.
        const halfHit = target.closest(".hit-left, .hit-right") as
          | HTMLElement
          | null;
        const star = target.closest(".star") as HTMLElement | null;
        if (!star) return;
        const idx = Number(star.dataset.index);
        if (!Number.isFinite(idx)) return;
        let next = idx;
        if (halfHit?.dataset.half === "1" && host.allowHalf) next = idx - 0.5;
        if (next === host.value) {
          // Click on the same value clears it (UX nicety).
          next = 0;
        }
        const previous = host.value;
        host.value = next;
        ctx.emit("tc-change", { value: next, previous });
      },
      "mouseover .star": (e, ctx) => {
        const host = ctx.host as HTMLElement & HostExtras;
        if (host.readonly) return;
        const target = e.target as HTMLElement;
        const halfHit = target.closest(".hit-left, .hit-right") as
          | HTMLElement
          | null;
        const star = target.closest(".star") as HTMLElement | null;
        if (!star) return;
        const idx = Number(star.dataset.index);
        if (!Number.isFinite(idx)) return;
        let h = idx;
        if (halfHit?.dataset.half === "1" && host.allowHalf) h = idx - 0.5;
        ctx.setState("hover", h);
      },
      "mouseleave .root": (_e, ctx) => {
        ctx.setState("hover", -1);
      },
      "keydown .root": (e, ctx) => {
        const ev = e as KeyboardEvent;
        const host = ctx.host as HTMLElement & HostExtras;
        if (host.readonly) return;
        const step = host.allowHalf ? 0.5 : 1;
        const previous = host.value;
        let next = previous;
        if (ev.key === "ArrowRight" || ev.key === "ArrowUp") next = Math.min(host.max, previous + step);
        else if (ev.key === "ArrowLeft" || ev.key === "ArrowDown") {
          next = Math.max(0, previous - step);
        } else if (ev.key === "Home") next = 0;
        else if (ev.key === "End") next = host.max;
        else return;
        ev.preventDefault();
        if (next === previous) return;
        host.value = next;
        ctx.emit("tc-change", { value: next, previous });
      },
    },
  }),
);
