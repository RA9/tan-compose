/**
 * `<tc-carousel>` — slide / fade carousel built around a default slot.
 *
 * Each direct child becomes a slide. The carousel auto-detects the
 * count via `slotchange` and a MutationObserver, so slides can be
 * added/removed dynamically. Keyboard, swipe, autoplay, indicators,
 * and prev/next controls are all opt-in via props.
 *
 * Props:
 *   value         number  (default 0, reflects) — current slide index
 *   autoplay      number  (default 0) — interval in ms; 0 disables
 *   loop          boolean (default true) — wrap at the ends
 *   orientation   "horizontal" | "vertical" (default "horizontal")
 *   transition    "slide" | "fade" (default "slide")
 *   indicators    boolean (default true) — render dot indicators
 *   controls      boolean (default true) — render prev/next buttons
 *   swipe         boolean (default true) — touch / mouse drag
 *   pauseOnHover  boolean (default true) — pause autoplay on hover/focus
 *   ariaLabel     string  (default "Carousel") — region label
 *   height        string  (default "") — explicit viewport height (any CSS length)
 *
 * Slots:
 *   default — one element per slide.
 *
 * Events:
 *   "tc-change"  detail: { index: number, previous: number }
 *
 * Theme variables:
 *   --tc-carousel-radius, --tc-carousel-bg,
 *   --tc-carousel-control-bg, --tc-carousel-control-bg-hover,
 *   --tc-carousel-control-fg, --tc-carousel-control-size,
 *   --tc-carousel-indicator, --tc-carousel-indicator-active,
 *   --tc-carousel-duration
 */

import { build, describe } from "@ra9/tan-compose";

const TAG = "tc-carousel";

export const tagName = TAG;

interface HostExtras {
  value: number;
  autoplay: number;
  loop: boolean;
  orientation: string;
  transition: string;
  indicators: boolean;
  controls: boolean;
  swipe: boolean;
  pauseOnHover: boolean;
  height: string;
  _carouselTimer?: number;
  _carouselSlotObs?: () => void;
  _carouselDrag?: () => void;
  _carouselHover?: () => void;
}

function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function countSlides(host: HTMLElement): number {
  let n = 0;
  for (const child of Array.from(host.children)) {
    if (child instanceof Element && !child.hasAttribute("slot")) n++;
  }
  return n;
}

function clampIndex(value: number, total: number, loop: boolean): number {
  if (total <= 0) return 0;
  if (loop) return ((value % total) + total) % total;
  return Math.max(0, Math.min(total - 1, value));
}

function go(host: HTMLElement & HostExtras, next: number): void {
  const total = countSlides(host);
  if (total === 0) return;
  const previous = host.value;
  const idx = clampIndex(next, total, host.loop);
  if (idx === previous) return;
  host.value = idx;
  host.dispatchEvent(
    new CustomEvent("tc-change", {
      detail: { index: idx, previous },
      bubbles: true,
      composed: true,
    }),
  );
}

function startAutoplay(host: HTMLElement & HostExtras): void {
  stopAutoplay(host);
  if (host.autoplay <= 0) return;
  if (countSlides(host) <= 1) return;
  host._carouselTimer = globalThis.setInterval(() => {
    go(host, host.value + 1);
  }, host.autoplay) as unknown as number;
}

function stopAutoplay(host: HostExtras): void {
  if (host._carouselTimer !== undefined) {
    globalThis.clearInterval(host._carouselTimer);
    host._carouselTimer = undefined;
  }
}

build(
  TAG,
  describe({
    props: {
      value: { type: "number", default: 0, reflect: true },
      autoplay: { type: "number", default: 0 },
      loop: { type: "boolean", default: true },
      orientation: { type: "string", default: "horizontal" },
      transition: { type: "string", default: "slide" },
      indicators: { type: "boolean", default: true },
      controls: { type: "boolean", default: true },
      swipe: { type: "boolean", default: true },
      pauseOnHover: { type: "boolean", default: true },
      ariaLabel: { type: "string", default: "Carousel" },
      height: { type: "string", default: "" },
    },
    theme: {
      "tc-carousel-radius": "var(--tc-radius-lg, 12px)",
      "tc-carousel-bg": "var(--tc-color-bg, #faf8f3)",
      "tc-carousel-control-bg": "rgba(255, 255, 255, 0.85)",
      "tc-carousel-control-bg-hover": "rgba(255, 255, 255, 1)",
      "tc-carousel-control-fg": "var(--tc-color-ink, #14171f)",
      "tc-carousel-control-size": "36px",
      "tc-carousel-indicator": "rgba(20, 23, 31, 0.25)",
      "tc-carousel-indicator-active": "var(--tc-color-accent, #a16939)",
      "tc-carousel-duration": "320ms",
    },
    styles: {
      display: "block",
      position: "relative",
    },
    template: ({ props }) => {
      const value = Number(props.value ?? 0);
      const vertical = String(props.orientation) === "vertical";
      const fade = String(props.transition) === "fade";
      const height = String(props.height ?? "");
      const showControls = !!props.controls;
      const showIndicators = !!props.indicators;
      const ariaLabel = esc(props.ariaLabel ?? "Carousel");

      // The track uses translate when transition is "slide". For fade we
      // overlay slides absolutely and toggle .is-active for opacity.
      // CSS variables make per-render computation cheap.
      return `
        <div
          class="root ${vertical ? "v" : "h"} ${fade ? "fade" : "slide"}"
          role="region"
          aria-roledescription="carousel"
          aria-label="${ariaLabel}"
          style="${height ? `--tc-carousel-height: ${esc(height)};` : ""}--tc-carousel-index: ${value};"
        >
          <div class="viewport" part="viewport">
            <div class="track" part="track">
              <slot></slot>
            </div>
          </div>
          ${
        showControls
          ? `
            <button type="button" class="ctrl prev" aria-label="Previous slide" part="control">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                ${
            vertical
              ? `<polyline points="18 15 12 9 6 15"/>`
              : `<polyline points="15 18 9 12 15 6"/>`
          }
              </svg>
            </button>
            <button type="button" class="ctrl next" aria-label="Next slide" part="control">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                ${
            vertical
              ? `<polyline points="6 9 12 15 18 9"/>`
              : `<polyline points="9 18 15 12 9 6"/>`
          }
              </svg>
            </button>
          `
          : ""
      }
          ${
        showIndicators
          ? `<div class="indicators" role="tablist" part="indicators"></div>`
          : ""
      }
          <div class="sr-status" aria-live="polite" aria-atomic="true"></div>
        </div>
        <style>
          :host { display: block; position: relative; outline: none; }
          .root {
            position: relative;
            border-radius: var(--tc-carousel-radius);
            background: var(--tc-carousel-bg);
            overflow: hidden;
          }
          .viewport {
            position: relative;
            overflow: hidden;
            height: var(--tc-carousel-height, auto);
          }
          .track {
            display: flex;
            transition: transform var(--tc-carousel-duration) cubic-bezier(0.4, 0, 0.2, 1);
            transform: translateX(calc(var(--tc-carousel-index, 0) * -100%));
            min-height: 100%;
          }
          .root.v .track {
            flex-direction: column;
            transform: translateY(calc(var(--tc-carousel-index, 0) * -100%));
          }
          slot { display: contents; }
          ::slotted(*) {
            flex: 0 0 100%;
            min-width: 0;
            min-height: 0;
            box-sizing: border-box;
          }
          .root.v ::slotted(*) {
            min-height: var(--tc-carousel-height, 100%);
          }

          /* Fade transition stacks slides on top of each other. */
          .root.fade .track {
            display: block;
            transform: none;
            transition: none;
            position: relative;
            height: var(--tc-carousel-height, auto);
            min-height: var(--tc-carousel-height, auto);
          }
          .root.fade ::slotted(*) {
            position: absolute;
            inset: 0;
            opacity: 0;
            pointer-events: none;
            transition: opacity var(--tc-carousel-duration) ease;
          }
          .root.fade ::slotted(.is-active) {
            opacity: 1;
            pointer-events: auto;
          }

          .ctrl {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: var(--tc-carousel-control-size);
            height: var(--tc-carousel-control-size);
            border-radius: 999px;
            background: var(--tc-carousel-control-bg);
            color: var(--tc-carousel-control-fg);
            border: 1px solid rgba(20, 23, 31, 0.08);
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(20, 23, 31, 0.15);
            transition: background 0.15s ease, transform 0.15s ease;
            z-index: 2;
          }
          .ctrl:hover { background: var(--tc-carousel-control-bg-hover); }
          .ctrl:active { transform: translateY(-50%) scale(0.96); }
          .ctrl:focus-visible {
            outline: 2px solid var(--tc-color-accent, #a16939);
            outline-offset: 2px;
          }
          .ctrl.prev { left: 12px; }
          .ctrl.next { right: 12px; }
          .root.v .ctrl {
            top: auto;
            left: 50%;
            transform: translateX(-50%);
          }
          .root.v .ctrl.prev { top: 12px; left: 50%; right: auto; }
          .root.v .ctrl.next { bottom: 12px; left: 50%; right: auto; top: auto; }
          .root.v .ctrl:active { transform: translateX(-50%) scale(0.96); }
          .ctrl[disabled] {
            opacity: 0.4;
            cursor: not-allowed;
            pointer-events: none;
          }

          .indicators {
            position: absolute;
            bottom: 12px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 6px;
            padding: 4px 8px;
            border-radius: 999px;
            background: rgba(20, 23, 31, 0.25);
            backdrop-filter: blur(6px);
            z-index: 2;
          }
          .root.v .indicators {
            bottom: 50%;
            left: auto;
            right: 12px;
            transform: translateY(50%);
            flex-direction: column;
          }
          .dot {
            width: 8px;
            height: 8px;
            border-radius: 999px;
            border: none;
            background: rgba(255, 255, 255, 0.55);
            padding: 0;
            cursor: pointer;
            transition: width 0.2s ease, background 0.2s ease;
          }
          .dot[aria-current="true"] {
            width: 22px;
            background: #fff;
          }
          .root.v .dot[aria-current="true"] {
            width: 8px;
            height: 22px;
          }
          .dot:focus-visible {
            outline: 2px solid #fff;
            outline-offset: 2px;
          }

          .sr-status {
            position: absolute;
            width: 1px;
            height: 1px;
            overflow: hidden;
            clip: rect(0 0 0 0);
            white-space: nowrap;
          }

          @media (prefers-reduced-motion: reduce) {
            .track, .root.fade ::slotted(*) {
              transition: none;
            }
          }
        </style>
      `;
    },
    events: {
      "click .prev": (_e, ctx) => {
        const host = ctx.host as HTMLElement & HostExtras;
        go(host, host.value - 1);
      },
      "click .next": (_e, ctx) => {
        const host = ctx.host as HTMLElement & HostExtras;
        go(host, host.value + 1);
      },
      "click .dot": (e, ctx) => {
        const t = (e.target as HTMLElement).closest(".dot") as
          | HTMLElement
          | null;
        if (!t) return;
        const i = Number(t.dataset.index);
        if (!Number.isFinite(i)) return;
        const host = ctx.host as HTMLElement & HostExtras;
        go(host, i);
      },
      "keydown .root": (e, ctx) => {
        const ev = e as KeyboardEvent;
        const host = ctx.host as HTMLElement & HostExtras;
        const vertical = host.orientation === "vertical";
        const total = countSlides(host);
        const prev = vertical ? "ArrowUp" : "ArrowLeft";
        const next = vertical ? "ArrowDown" : "ArrowRight";
        if (ev.key === prev) {
          ev.preventDefault();
          go(host, host.value - 1);
        } else if (ev.key === next) {
          ev.preventDefault();
          go(host, host.value + 1);
        } else if (ev.key === "Home") {
          ev.preventDefault();
          go(host, 0);
        } else if (ev.key === "End") {
          ev.preventDefault();
          go(host, total - 1);
        }
      },
    },
    afterMount() {
      const host = this as unknown as HTMLElement & HostExtras;

      // Recount slides when light DOM children mutate.
      const sync = () => syncSlides(host);
      const mo = new MutationObserver(sync);
      mo.observe(host, { childList: true });
      const root = host.shadowRoot;
      const slot = root?.querySelector("slot") as HTMLSlotElement | null;
      const onSlotChange = () => sync();
      slot?.addEventListener("slotchange", onSlotChange);
      host._carouselSlotObs = () => {
        mo.disconnect();
        slot?.removeEventListener("slotchange", onSlotChange);
      };

      // Hover pause for autoplay.
      const onEnter = () => stopAutoplay(host);
      const onLeave = () => {
        if (host.pauseOnHover) startAutoplay(host);
      };
      host.addEventListener("pointerenter", onEnter);
      host.addEventListener("pointerleave", onLeave);
      host.addEventListener("focusin", onEnter);
      host.addEventListener("focusout", onLeave);
      host._carouselHover = () => {
        host.removeEventListener("pointerenter", onEnter);
        host.removeEventListener("pointerleave", onLeave);
        host.removeEventListener("focusin", onEnter);
        host.removeEventListener("focusout", onLeave);
      };

      // Pointer drag → swipe.
      installSwipe(host);

      // Make the root focusable for keyboard navigation. The root is in
      // shadow DOM, so we set tabindex via attribute selector once.
      const rootEl = root?.querySelector(".root") as HTMLElement | null;
      rootEl?.setAttribute("tabindex", "0");

      sync();
      if (host.autoplay > 0) startAutoplay(host);
    },
    afterRender() {
      const host = this as unknown as HTMLElement & HostExtras;
      syncSlides(host);
      // The autoplay interval references this.value via closure, so when
      // value changes externally the timer doesn't need a reset.
    },
    unmount() {
      const host = this as unknown as HTMLElement & HostExtras;
      stopAutoplay(host);
      host._carouselSlotObs?.();
      host._carouselHover?.();
      host._carouselDrag?.();
    },
  }),
);

function syncSlides(host: HTMLElement & HostExtras): void {
  const total = countSlides(host);
  const root = host.shadowRoot;
  if (!root) return;
  const rootEl = root.querySelector(".root") as HTMLElement | null;
  if (rootEl && total > 0) {
    // Clamp value if it's outside the new range.
    const safe = clampIndex(host.value, total, host.loop);
    if (safe !== host.value) host.value = safe;
    rootEl.style.setProperty("--tc-carousel-index", String(safe));
  }

  // Indicators: paint dots inline so we don't need a re-render.
  const indicators = root.querySelector(".indicators") as HTMLElement | null;
  if (indicators) {
    const current = host.value;
    let html = "";
    for (let i = 0; i < total; i++) {
      html += `<button type="button" class="dot" role="tab" data-index="${i}"
        aria-current="${i === current ? "true" : "false"}"
        aria-label="Go to slide ${i + 1}"></button>`;
    }
    indicators.innerHTML = html;
  }

  // Slide ARIA + active class for fade.
  const slides = Array.from(host.children).filter(
    (el): el is HTMLElement =>
      el instanceof HTMLElement && !el.hasAttribute("slot"),
  );
  slides.forEach((el, i) => {
    el.setAttribute("role", "group");
    el.setAttribute("aria-roledescription", "slide");
    el.setAttribute("aria-label", `${i + 1} of ${total}`);
    if (host.transition === "fade") {
      el.classList.toggle("is-active", i === host.value);
    } else {
      el.classList.remove("is-active");
    }
  });

  // Disable controls if at edges and not looping.
  if (!host.loop) {
    const prev = root.querySelector(".ctrl.prev") as HTMLButtonElement | null;
    const next = root.querySelector(".ctrl.next") as HTMLButtonElement | null;
    if (prev) prev.disabled = host.value <= 0;
    if (next) next.disabled = host.value >= total - 1;
  }

  // Live region announcement.
  const status = root.querySelector(".sr-status") as HTMLElement | null;
  if (status && total > 0) {
    status.textContent = `Slide ${host.value + 1} of ${total}`;
  }
}

function installSwipe(host: HTMLElement & HostExtras): void {
  let startX = 0;
  let startY = 0;
  let dragging = false;
  const THRESHOLD = 40;

  const onDown = (e: PointerEvent) => {
    if (!host.swipe) return;
    // Only primary button / first touch.
    if (e.button !== 0 && e.pointerType === "mouse") return;
    startX = e.clientX;
    startY = e.clientY;
    dragging = true;
  };
  const onUp = (e: PointerEvent) => {
    if (!dragging) return;
    dragging = false;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    const vertical = host.orientation === "vertical";
    const delta = vertical ? dy : dx;
    if (Math.abs(delta) < THRESHOLD) return;
    go(host, host.value + (delta < 0 ? 1 : -1));
  };
  const onCancel = () => {
    dragging = false;
  };
  host.addEventListener("pointerdown", onDown);
  host.addEventListener("pointerup", onUp);
  host.addEventListener("pointercancel", onCancel);
  host._carouselDrag = () => {
    host.removeEventListener("pointerdown", onDown);
    host.removeEventListener("pointerup", onUp);
    host.removeEventListener("pointercancel", onCancel);
  };
}
