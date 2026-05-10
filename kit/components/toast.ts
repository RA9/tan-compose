/**
 * `<tc-toast>` — non-modal notification with variant, optional auto-dismiss,
 * and a close button. Used inline; positioning is the page's responsibility.
 *
 * Props:
 *   open         boolean (default false, reflects)
 *   variant      "info" | "success" | "warning" | "error" (default "info")
 *   message      string (default "")
 *   duration     number ms (default 4000; 0 = no auto-dismiss)
 *   dismissible  boolean (default true)
 *
 * Slots:
 *   default — overrides the message prop if both are provided
 *
 * Events:
 *   "tc-toast-close"  detail: { reason: "timeout" | "button" | "api" }
 *
 * Theme variables on :host:
 *   --tc-toast-info, --tc-toast-success, --tc-toast-warning, --tc-toast-error,
 *   --tc-toast-fg, --tc-toast-radius, --tc-toast-shadow, --tc-toast-font
 */

import { build, describe } from "@ra9/tan-compose";

const TAG = "tc-toast";

export const tagName = TAG;

const TIMERS = new WeakMap<HTMLElement, number>();

build(
  TAG,
  describe({
    props: {
      open: { type: "boolean", default: false, reflect: true },
      variant: { type: "string", default: "info" },
      message: { type: "string", default: "" },
      duration: { type: "number", default: 4000 },
      dismissible: { type: "boolean", default: true },
    },
    theme: {
      "tc-toast-info": "#3a5b8c",
      "tc-toast-success": "#207a5b",
      "tc-toast-warning": "#a87326",
      "tc-toast-error": "#b3261e",
      "tc-toast-fg": "#ffffff",
      "tc-toast-radius": "10px",
      "tc-toast-shadow": "0 12px 30px rgba(20, 23, 31, 0.18)",
      "tc-toast-font":
        "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    },
    styles: {
      display: "block",
    },
    template: ({ props }) => {
      const variant = String(props.variant ?? "info");
      const icon = variant === "success"
        ? "✓"
        : variant === "warning"
        ? "!"
        : variant === "error"
        ? "✕"
        : "i";
      return `
        <div class="toast v-${esc(variant)} ${
        props.open ? "open" : "closed"
      }" role="status" aria-live="polite">
          <span class="icon" aria-hidden="true">${icon}</span>
          <span class="msg">${
        props.message ? esc(props.message) : "<slot></slot>"
      }</span>
          ${
        props.dismissible
          ? `<button type="button" class="x" aria-label="Close">×</button>`
          : ""
      }
        </div>
        <style>
          :host { display: block; }
          .toast {
            display: inline-flex; align-items: center; gap: 12px;
            padding: 11px 14px;
            font-family: var(--tc-toast-font);
            font-size: 0.92rem;
            color: var(--tc-toast-fg);
            border-radius: var(--tc-toast-radius);
            box-shadow: var(--tc-toast-shadow);
            transform: translateY(-6px);
            opacity: 0;
            transition: opacity 0.18s ease, transform 0.18s ease;
            pointer-events: none;
          }
          .toast.open {
            transform: translateY(0);
            opacity: 1;
            pointer-events: auto;
          }
          .v-info    { background: var(--tc-toast-info); }
          .v-success { background: var(--tc-toast-success); }
          .v-warning { background: var(--tc-toast-warning); }
          .v-error   { background: var(--tc-toast-error); }
          .icon {
            display: inline-flex; align-items: center; justify-content: center;
            width: 20px; height: 20px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.18);
            font-size: 0.78rem; font-weight: 700;
          }
          .msg { flex: 1 1 auto; line-height: 1.4; }
          .x {
            font: inherit; font-size: 1.1rem; line-height: 1;
            background: transparent; border: none;
            color: var(--tc-toast-fg); opacity: 0.8;
            cursor: pointer;
            width: 22px; height: 22px; border-radius: 6px;
            display: inline-flex; align-items: center; justify-content: center;
          }
          .x:hover { background: rgba(255, 255, 255, 0.18); opacity: 1; }
        </style>
      `;
    },
    events: {
      "click .x": (_e, ctx) => closeToast(ctx.host as HTMLElement, "button"),
    },
    afterMount() {
      scheduleAutoDismiss(this);
    },
    unmount() {
      const t = TIMERS.get(this);
      if (t !== undefined) {
        clearTimeout(t);
        TIMERS.delete(this);
      }
    },
  }),
);

function scheduleAutoDismiss(host: HTMLElement) {
  const h = host as HTMLElement & { open: boolean; duration: number };
  // Clear any pending timer.
  const prev = TIMERS.get(host);
  if (prev !== undefined) clearTimeout(prev);
  TIMERS.delete(host);
  if (!h.open || !h.duration || h.duration <= 0) return;
  const id = setTimeout(() => {
    if (h.open) closeToast(host, "timeout");
  }, h.duration);
  TIMERS.set(host, id as unknown as number);
}

function closeToast(host: HTMLElement, reason: string) {
  const h = host as HTMLElement & { open: boolean };
  if (!h.open) return;
  h.open = false;
  host.dispatchEvent(
    new CustomEvent("tc-toast-close", {
      detail: { reason },
      bubbles: true,
      composed: true,
    }),
  );
}

function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
