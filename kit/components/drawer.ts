/**
 * `<tc-drawer>` — side sheet that slides in from an edge, backed by `<dialog>`.
 *
 * Uses the native dialog's top-layer, so it sits above stacking contexts
 * and overflow ancestors. Backdrop click and Esc dismiss by default.
 *
 * Props:
 *   open         boolean (default false, reflects)
 *   side         "left" | "right" | "top" | "bottom" (default "right")
 *   size         string  (default "min(420px, 92vw)") — width for left/right,
 *                                                       height for top/bottom
 *   dismissible  boolean (default true) — backdrop click and Esc close
 *   title        string  (default "")
 *
 * Slots:
 *   default — body content
 *   footer  — optional footer
 *
 * Events:
 *   "tc-close"  detail: { reason: "backdrop" | "escape" | "button" | "api" }
 *
 * Theme variables:
 *   --tc-drawer-bg, --tc-drawer-ink, --tc-drawer-rule, --tc-drawer-soft,
 *   --tc-drawer-shadow, --tc-drawer-backdrop, --tc-drawer-font,
 *   --tc-drawer-duration
 */

import { build, describe } from "@ra9/tan-compose";

const TAG = "tc-drawer";

export const tagName = TAG;

interface HostExtras {
  open: boolean;
  side: string;
  size: string;
  dismissible: boolean;
  title: string;
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
      open: { type: "boolean", default: false, reflect: true },
      side: { type: "string", default: "right" },
      size: { type: "string", default: "min(420px, 92vw)" },
      dismissible: { type: "boolean", default: true },
      title: { type: "string", default: "" },
    },
    theme: {
      "tc-drawer-bg": "var(--tc-color-surface, #ffffff)",
      "tc-drawer-ink": "var(--tc-color-ink, #14171f)",
      "tc-drawer-rule": "var(--tc-color-rule, #ece5d3)",
      "tc-drawer-soft": "var(--tc-color-ink-soft, #5a6072)",
      "tc-drawer-shadow":
        "var(--tc-shadow-lg, 0 24px 60px rgba(20, 23, 31, 0.25))",
      "tc-drawer-backdrop": "rgba(20, 23, 31, 0.5)",
      "tc-drawer-font":
        "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
      "tc-drawer-duration": "260ms",
    },
    styles: {
      display: "contents",
    },
    template: ({ props }) => {
      const side = String(props.side ?? "right");
      const size = esc(props.size ?? "min(420px, 92vw)");
      const horizontal = side === "left" || side === "right";
      return `
        <dialog
          class="dlg side-${esc(side)}"
          aria-labelledby="${props.title ? "title" : ""}"
          style="
            ${horizontal ? `width: ${size}; height: 100%;` : `width: 100%; height: ${size};`}
            ${
        side === "left"
          ? "top: 0; left: 0; right: auto; bottom: 0;"
          : side === "right"
          ? "top: 0; right: 0; left: auto; bottom: 0;"
          : side === "top"
          ? "top: 0; left: 0; right: 0; bottom: auto;"
          : "bottom: 0; left: 0; right: 0; top: auto;"
      }
            margin: 0; max-width: 100vw; max-height: 100vh;
          "
        >
          ${
        props.title || props.dismissible
          ? `<header class="head">
                ${
            props.title
              ? `<h2 id="title" class="title">${esc(props.title)}</h2>`
              : "<span></span>"
          }
                ${
            props.dismissible
              ? `<button class="x" type="button" aria-label="Close">×</button>`
              : ""
          }
              </header>`
          : ""
      }
          <div class="body"><slot></slot></div>
          <footer class="foot"><slot name="footer"></slot></footer>
        </dialog>
        <style>
          .dlg {
            padding: 0;
            border: none;
            background: var(--tc-drawer-bg);
            color: var(--tc-drawer-ink);
            font-family: var(--tc-drawer-font);
            box-shadow: var(--tc-drawer-shadow);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            transition: transform var(--tc-drawer-duration) cubic-bezier(0.4, 0, 0.2, 1);
          }
          .dlg::backdrop {
            background: var(--tc-drawer-backdrop);
            backdrop-filter: blur(2px);
            opacity: 0;
            transition: opacity var(--tc-drawer-duration) ease;
          }
          .dlg[open]::backdrop { opacity: 1; }

          /* Starting transform per side, then translate to 0 when open. */
          .dlg.side-left:not([open])  { transform: translateX(-100%); }
          .dlg.side-right:not([open]) { transform: translateX(100%); }
          .dlg.side-top:not([open])   { transform: translateY(-100%); }
          .dlg.side-bottom:not([open]){ transform: translateY(100%); }
          .dlg[open] { transform: translate(0, 0); }

          @media (prefers-reduced-motion: reduce) {
            .dlg, .dlg::backdrop { transition: none; }
          }

          .head {
            display: flex; align-items: center; justify-content: space-between;
            gap: 12px; padding: 16px 20px;
            border-bottom: 1px solid var(--tc-drawer-rule);
            flex: 0 0 auto;
          }
          .title {
            margin: 0; font-size: 1.05rem; font-weight: 700;
            letter-spacing: -0.01em;
          }
          .x {
            font: inherit; font-size: 1.4rem; line-height: 1;
            background: transparent; border: none; cursor: pointer;
            color: var(--tc-drawer-soft);
            width: 32px; height: 32px; border-radius: 8px;
            display: inline-flex; align-items: center; justify-content: center;
          }
          .x:hover { background: var(--tc-drawer-rule); color: var(--tc-drawer-ink); }
          .body {
            padding: 20px; line-height: 1.6;
            overflow-y: auto;
            flex: 1 1 auto;
          }
          .foot {
            padding: 0;
            flex: 0 0 auto;
          }
          :host([open]) .foot:has(::slotted(*)) {
            padding: 12px 20px 16px;
            border-top: 1px solid var(--tc-drawer-rule);
            display: flex; gap: 8px; justify-content: flex-end;
          }
        </style>
      `;
    },
    refs: {
      dialog: ".dlg",
    },
    events: {
      "click .x": (_e, ctx) => {
        closeDrawer(ctx.host as HTMLElement & HostExtras, "button");
      },
      "click .dlg": (e, ctx) => {
        const host = ctx.host as HTMLElement & HostExtras;
        if (!host.dismissible) return;
        const dlg = ctx.refs.dialog as HTMLDialogElement | null;
        if (!dlg) return;
        if (e.target === dlg) closeDrawer(host, "backdrop");
      },
    },
    afterRender() {
      syncDialogOpen(this);
    },
    unmount() {
      const prior = DIALOG_LISTENERS.get(this);
      if (prior) {
        prior.cleanup();
        DIALOG_LISTENERS.delete(this);
      }
    },
  }),
);

const DIALOG_LISTENERS = new WeakMap<
  HTMLElement,
  { dialog: HTMLDialogElement; cleanup: () => void }
>();

function syncDialogOpen(host: HTMLElement) {
  const root = host.shadowRoot;
  if (!root) return;
  const dlg = root.querySelector(".dlg") as HTMLDialogElement | null;
  if (!dlg) return;
  const isOpen = (host as HTMLElement & { open: boolean }).open;

  const prior = DIALOG_LISTENERS.get(host);
  if (prior && prior.dialog !== dlg) {
    prior.cleanup();
    DIALOG_LISTENERS.delete(host);
  }

  if (isOpen && !dlg.open) {
    if (typeof dlg.showModal === "function") {
      try {
        dlg.showModal();
      } catch {
        dlg.setAttribute("open", "");
      }
    } else {
      dlg.setAttribute("open", "");
    }
    if (!DIALOG_LISTENERS.has(host)) {
      const onClose = () => {
        const h = host as HTMLElement & { open: boolean };
        if (h.open) {
          h.open = false;
          host.dispatchEvent(
            new CustomEvent("tc-close", {
              detail: { reason: "escape" },
              bubbles: true,
              composed: true,
            }),
          );
        }
      };
      dlg.addEventListener("close", onClose);
      DIALOG_LISTENERS.set(host, {
        dialog: dlg,
        cleanup: () => dlg.removeEventListener("close", onClose),
      });
    }
  } else if (!isOpen && dlg.open) {
    try {
      dlg.close();
    } catch {
      dlg.removeAttribute("open");
    }
  }
}

function closeDrawer(
  host: HTMLElement & HostExtras,
  reason: string,
) {
  if (!host.open) return;
  host.open = false;
  host.dispatchEvent(
    new CustomEvent("tc-close", {
      detail: { reason },
      bubbles: true,
      composed: true,
    }),
  );
}
