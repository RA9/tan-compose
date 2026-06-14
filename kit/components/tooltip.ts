/**
 * `<tc-tooltip>` — small text balloon anchored to its slotted trigger.
 *
 * The trigger is whatever you slot in. On hover or keyboard focus the
 * tooltip pops above the trigger (auto-flipping if it would overflow
 * the viewport). Rendered via the browser popover API so it lives in
 * the top-layer and never gets clipped by an ancestor's stacking
 * context, transform, or overflow.
 *
 * Props:
 *   text       string  (default "") — tooltip text. For rich content
 *                                     use the named `content` slot.
 *   placement  "top" | "bottom" | "left" | "right" (default "top")
 *   delay      number  (default 200) — open delay in ms
 *   offset     number  (default 8) — gap between trigger and tip
 *   disabled   boolean (default false)
 *
 * Slots:
 *   default — the trigger
 *   content — optional rich tooltip body (overrides `text`)
 *
 * Theme variables:
 *   --tc-tooltip-bg, --tc-tooltip-fg, --tc-tooltip-radius,
 *   --tc-tooltip-font, --tc-tooltip-shadow, --tc-tooltip-padding,
 *   --tc-tooltip-max-width
 */

import { build, describe, html, unsafe } from "@ra9/tan-compose";

const TAG = "tc-tooltip";

export const tagName = TAG;

// Declared BEFORE build() — esbuild minify hoists const→var, so STYLE
// after build() would be undefined when define() synchronously upgrades
// any pre-existing <tc-tooltip> and runs the first render.
const STYLE = `
        :host { display: inline-block; }
        .trigger { display: inline-block; }
        .tip {
          position: fixed;
          margin: 0;
          padding: var(--tc-tooltip-padding);
          background: var(--tc-tooltip-bg);
          color: var(--tc-tooltip-fg);
          border: none;
          border-radius: var(--tc-tooltip-radius);
          box-shadow: var(--tc-tooltip-shadow);
          font-family: var(--tc-tooltip-font);
          font-size: 0.78rem;
          line-height: 1.4;
          max-width: var(--tc-tooltip-max-width);
          overflow: visible;
          pointer-events: none;
          opacity: 0;
          transform: translateY(2px);
          transition: opacity 0.12s ease, transform 0.12s ease;
        }
        .tip:popover-open {
          opacity: 1;
          transform: translateY(0);
        }
        .tip[data-placement="bottom"]:popover-open { transform: translateY(0); }
        @media (prefers-reduced-motion: reduce) {
          .tip { transition: none; transform: none; }
        }
`;

interface HostExtras {
  text: string;
  placement: string;
  delay: number;
  offset: number;
  disabled: boolean;
  _tooltipCleanup?: () => void;
  _tooltipTimer?: number;
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
      text: { type: "string", default: "" },
      placement: { type: "string", default: "top" },
      delay: { type: "number", default: 200 },
      offset: { type: "number", default: 8 },
      disabled: { type: "boolean", default: false },
    },
    theme: {
      "tc-tooltip-bg": "var(--tc-color-ink, #14171f)",
      "tc-tooltip-fg": "var(--tc-color-surface, #ffffff)",
      "tc-tooltip-radius": "var(--tc-radius-sm, 6px)",
      "tc-tooltip-font":
        "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
      "tc-tooltip-shadow": "0 10px 30px rgba(0, 0, 0, 0.25)",
      "tc-tooltip-padding": "6px 10px",
      "tc-tooltip-max-width": "240px",
    },
    styles: {
      display: "inline-block",
      position: "relative",
    },
    stylesheet: STYLE,
    template: ({ props }) =>
      html`
        <span class="trigger" tabindex="-1"><slot></slot></span>
        <div
          class="tip"
          popover="manual"
          role="tooltip"
          part="tip"
        >
          ${unsafe(
            props.text
              ? `<span class="tip-text">${esc(props.text)}</span>`
              : "",
          )}
          <slot name="content"></slot>
        </div>
      `,
    afterMount() {
      const host = this as unknown as HTMLElement & HostExtras;
      const root = host.shadowRoot;
      if (!root) return;
      const tip = root.querySelector(".tip") as HTMLElement | null;
      if (!tip) return;

      const open = () => {
        if (host.disabled) return;
        clearTimeout(host._tooltipTimer);
        host._tooltipTimer = globalThis.setTimeout(() => {
          if (
            typeof (tip as unknown as { showPopover?: () => void })
              .showPopover === "function"
          ) {
            try {
              (tip as unknown as { showPopover: () => void }).showPopover();
            } catch {
              // Re-entrant or unsupported → fall back to visibility.
              tip.style.visibility = "visible";
              tip.style.opacity = "1";
            }
          } else {
            tip.style.visibility = "visible";
            tip.style.opacity = "1";
          }
          position(host, tip);
        }, Math.max(0, host.delay)) as unknown as number;
      };
      const close = () => {
        clearTimeout(host._tooltipTimer);
        try {
          if (
            typeof (tip as unknown as { hidePopover?: () => void })
              .hidePopover === "function"
          ) {
            (tip as unknown as { hidePopover: () => void }).hidePopover();
          }
        } catch { /* ignore */ }
        tip.style.opacity = "";
        tip.style.visibility = "";
      };
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") close();
      };

      host.addEventListener("pointerenter", open);
      host.addEventListener("pointerleave", close);
      host.addEventListener("focusin", open);
      host.addEventListener("focusout", close);
      host.addEventListener("keydown", onKey);
      // Reposition on scroll / resize while visible.
      const reposition = () => {
        if (
          (tip as HTMLElement & { matches: (s: string) => boolean }).matches(
            ":popover-open",
          )
        ) {
          position(host, tip);
        }
      };
      globalThis.addEventListener("scroll", reposition, true);
      globalThis.addEventListener("resize", reposition);

      host._tooltipCleanup = () => {
        clearTimeout(host._tooltipTimer);
        host.removeEventListener("pointerenter", open);
        host.removeEventListener("pointerleave", close);
        host.removeEventListener("focusin", open);
        host.removeEventListener("focusout", close);
        host.removeEventListener("keydown", onKey);
        globalThis.removeEventListener("scroll", reposition, true);
        globalThis.removeEventListener("resize", reposition);
        close();
      };
    },
    unmount() {
      const host = this as unknown as HTMLElement & HostExtras;
      host._tooltipCleanup?.();
    },
  }),
);

function position(
  host: HTMLElement & HostExtras,
  tip: HTMLElement,
): void {
  const anchor = host.getBoundingClientRect();
  // Force a layout so we have measurements.
  tip.style.top = "0px";
  tip.style.left = "0px";
  const tipRect = tip.getBoundingClientRect();
  const vw = globalThis.innerWidth;
  const vh = globalThis.innerHeight;
  const gap = host.offset;
  let placement = host.placement || "top";

  // Auto-flip if requested side doesn't fit.
  const fits = (p: string): boolean => {
    if (p === "top") return anchor.top - tipRect.height - gap >= 4;
    if (p === "bottom") return anchor.bottom + tipRect.height + gap <= vh - 4;
    if (p === "left") return anchor.left - tipRect.width - gap >= 4;
    if (p === "right") return anchor.right + tipRect.width + gap <= vw - 4;
    return true;
  };
  if (!fits(placement)) {
    const fallback: Record<string, string> = {
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left",
    };
    if (fits(fallback[placement] ?? "top")) placement = fallback[placement];
  }

  let top = 0;
  let left = 0;
  if (placement === "top") {
    top = anchor.top - tipRect.height - gap;
    left = anchor.left + anchor.width / 2 - tipRect.width / 2;
  } else if (placement === "bottom") {
    top = anchor.bottom + gap;
    left = anchor.left + anchor.width / 2 - tipRect.width / 2;
  } else if (placement === "left") {
    top = anchor.top + anchor.height / 2 - tipRect.height / 2;
    left = anchor.left - tipRect.width - gap;
  } else if (placement === "right") {
    top = anchor.top + anchor.height / 2 - tipRect.height / 2;
    left = anchor.right + gap;
  }

  // Clamp into viewport.
  top = Math.max(4, Math.min(vh - tipRect.height - 4, top));
  left = Math.max(4, Math.min(vw - tipRect.width - 4, left));

  tip.style.top = `${top}px`;
  tip.style.left = `${left}px`;
  tip.dataset.placement = placement;
}
