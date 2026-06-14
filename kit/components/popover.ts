/**
 * `<tc-popover>` — click-triggered floating panel anchored to a slot trigger.
 *
 * Renders in the top-layer (popover API), so it's never clipped by an
 * ancestor's stacking context, overflow, or transform. Outside-click
 * and `Esc` close by default.
 *
 * Props:
 *   open         boolean (default false, reflects)
 *   placement    "top" | "bottom" | "left" | "right" (default "bottom")
 *   offset       number  (default 8)
 *   dismissible  boolean (default true) — outside click / Esc close
 *
 * Slots:
 *   trigger — the element that opens the popover on click
 *   default — popover content
 *
 * Events:
 *   "tc-open"
 *   "tc-close"  detail: { reason: "outside" | "escape" | "trigger" | "api" }
 *
 * Theme variables:
 *   --tc-popover-bg, --tc-popover-fg, --tc-popover-rule,
 *   --tc-popover-radius, --tc-popover-shadow, --tc-popover-padding,
 *   --tc-popover-min-width, --tc-popover-max-width, --tc-popover-font
 */

import { build, describe, html } from "@ra9/tan-compose";

const TAG = "tc-popover";

export const tagName = TAG;

// Declared BEFORE build() — esbuild minify hoists const→var, so STYLE
// after build() would be undefined when define() synchronously upgrades
// any pre-existing <tc-popover> and runs the first render.
const STYLE = `
        :host { display: inline-block; }
        .trigger-wrap { display: inline-block; }
        .panel {
          position: fixed;
          margin: 0;
          padding: var(--tc-popover-padding);
          background: var(--tc-popover-bg);
          color: var(--tc-popover-fg);
          border: 1px solid var(--tc-popover-rule);
          border-radius: var(--tc-popover-radius);
          box-shadow: var(--tc-popover-shadow);
          font-family: var(--tc-popover-font);
          font-size: 0.92rem;
          min-width: var(--tc-popover-min-width);
          max-width: var(--tc-popover-max-width);
          opacity: 0;
          transform: translateY(-4px);
          transition: opacity 0.14s ease, transform 0.14s ease;
        }
        .panel:popover-open {
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .panel { transition: none; transform: none; }
        }
`;

interface HostExtras {
  open: boolean;
  placement: string;
  offset: number;
  dismissible: boolean;
  _popoverCleanup?: () => void;
}

build(
  TAG,
  describe({
    props: {
      open: { type: "boolean", default: false, reflect: true },
      placement: { type: "string", default: "bottom" },
      offset: { type: "number", default: 8 },
      dismissible: { type: "boolean", default: true },
    },
    theme: {
      "tc-popover-bg": "var(--tc-color-surface, #ffffff)",
      "tc-popover-fg": "var(--tc-color-ink, #14171f)",
      "tc-popover-rule": "var(--tc-color-rule, #ece5d3)",
      "tc-popover-radius": "var(--tc-radius-md, 8px)",
      "tc-popover-shadow":
        "var(--tc-shadow-lg, 0 24px 60px rgba(20, 23, 31, 0.18))",
      "tc-popover-padding": "12px 14px",
      "tc-popover-min-width": "200px",
      "tc-popover-max-width": "340px",
      "tc-popover-font":
        "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
    },
    styles: {
      display: "inline-block",
      position: "relative",
    },
    stylesheet: STYLE,
    template: () =>
      html`
        <span class="trigger-wrap"><slot name="trigger"></slot></span>
        <div
          class="panel"
          popover="manual"
          role="dialog"
          part="panel"
        >
          <slot></slot>
        </div>
      `,
    events: {
      "click .trigger-wrap": (_e, ctx) => {
        const host = ctx.host as HTMLElement & HostExtras;
        host.open = !host.open;
      },
    },
    afterRender() {
      const host = this as unknown as HTMLElement & HostExtras;
      syncPopover(host);
    },
    afterMount() {
      const host = this as unknown as HTMLElement & HostExtras;
      const onDocClick = (e: MouseEvent) => {
        if (!host.open || !host.dismissible) return;
        const path = e.composedPath();
        if (path.includes(host)) return;
        host.open = false;
        host.dispatchEvent(
          new CustomEvent("tc-close", {
            detail: { reason: "outside" },
            bubbles: true,
            composed: true,
          }),
        );
      };
      const onKey = (e: KeyboardEvent) => {
        if (!host.open || !host.dismissible) return;
        if (e.key === "Escape") {
          host.open = false;
          host.dispatchEvent(
            new CustomEvent("tc-close", {
              detail: { reason: "escape" },
              bubbles: true,
              composed: true,
            }),
          );
        }
      };
      const onResize = () => {
        const panel = host.shadowRoot?.querySelector(".panel") as
          | HTMLElement
          | null;
        if (panel?.matches(":popover-open")) position(host, panel);
      };
      document.addEventListener("click", onDocClick, true);
      document.addEventListener("keydown", onKey);
      globalThis.addEventListener("scroll", onResize, true);
      globalThis.addEventListener("resize", onResize);

      host._popoverCleanup = () => {
        document.removeEventListener("click", onDocClick, true);
        document.removeEventListener("keydown", onKey);
        globalThis.removeEventListener("scroll", onResize, true);
        globalThis.removeEventListener("resize", onResize);
      };
      syncPopover(host);
    },
    unmount() {
      const host = this as unknown as HTMLElement & HostExtras;
      host._popoverCleanup?.();
    },
  }),
);

function syncPopover(host: HTMLElement & HostExtras): void {
  const root = host.shadowRoot;
  if (!root) return;
  const panel = root.querySelector(".panel") as HTMLElement | null;
  if (!panel) return;
  const isOpen = host.open;
  const supportsPopover =
    typeof (panel as unknown as { showPopover?: () => void }).showPopover ===
      "function";

  if (isOpen && !panel.matches(":popover-open")) {
    if (supportsPopover) {
      try {
        (panel as unknown as { showPopover: () => void }).showPopover();
      } catch {
        panel.style.display = "block";
      }
    } else {
      panel.style.display = "block";
    }
    position(host, panel);
    host.dispatchEvent(
      new CustomEvent("tc-open", { bubbles: true, composed: true }),
    );
  } else if (!isOpen && panel.matches(":popover-open")) {
    if (supportsPopover) {
      try {
        (panel as unknown as { hidePopover: () => void }).hidePopover();
      } catch {
        panel.style.display = "none";
      }
    } else {
      panel.style.display = "none";
    }
  }
}

function position(
  host: HTMLElement & HostExtras,
  panel: HTMLElement,
): void {
  const anchor = host.getBoundingClientRect();
  panel.style.top = "0px";
  panel.style.left = "0px";
  const rect = panel.getBoundingClientRect();
  const vw = globalThis.innerWidth;
  const vh = globalThis.innerHeight;
  const gap = host.offset;
  let placement = host.placement || "bottom";

  const fits = (p: string): boolean => {
    if (p === "top") return anchor.top - rect.height - gap >= 4;
    if (p === "bottom") return anchor.bottom + rect.height + gap <= vh - 4;
    if (p === "left") return anchor.left - rect.width - gap >= 4;
    if (p === "right") return anchor.right + rect.width + gap <= vw - 4;
    return true;
  };
  if (!fits(placement)) {
    const flip: Record<string, string> = {
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left",
    };
    if (fits(flip[placement] ?? "bottom")) placement = flip[placement];
  }

  let top = 0;
  let left = 0;
  if (placement === "top") {
    top = anchor.top - rect.height - gap;
    left = anchor.left + anchor.width / 2 - rect.width / 2;
  } else if (placement === "bottom") {
    top = anchor.bottom + gap;
    left = anchor.left + anchor.width / 2 - rect.width / 2;
  } else if (placement === "left") {
    top = anchor.top + anchor.height / 2 - rect.height / 2;
    left = anchor.left - rect.width - gap;
  } else if (placement === "right") {
    top = anchor.top + anchor.height / 2 - rect.height / 2;
    left = anchor.right + gap;
  }
  top = Math.max(4, Math.min(vh - rect.height - 4, top));
  left = Math.max(4, Math.min(vw - rect.width - 4, left));
  panel.style.top = `${top}px`;
  panel.style.left = `${left}px`;
}
