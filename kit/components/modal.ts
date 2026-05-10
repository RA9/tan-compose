/**
 * `<tc-modal>` — modal dialog backed by the native `<dialog>` element.
 * Provides backdrop click-to-close, escape-key dismiss, focus trap, and a
 * named "footer" slot for action buttons.
 *
 * Props:
 *   open          boolean (default false, reflects)
 *   title         string  (optional header title)
 *   dismissible   boolean (default true) — backdrop click and Esc close
 *   width         string  (default "min(560px, 92vw)") — CSS length
 *
 * Slots:
 *   default — main content
 *   footer  — optional footer (action buttons etc.)
 *
 * Events:
 *   "tc-close"   detail: { reason: "backdrop" | "escape" | "button" | "api" }
 *
 * Theme variables on :host:
 *   --tc-modal-surface, --tc-modal-ink, --tc-modal-rule, --tc-modal-soft,
 *   --tc-modal-radius, --tc-modal-backdrop, --tc-modal-shadow, --tc-modal-font
 */

import { build, describe } from "@ra9/tan-compose";

const TAG = "tc-modal";

export const tagName = TAG;

build(
  TAG,
  describe({
    props: {
      open: { type: "boolean", default: false, reflect: true },
      title: { type: "string", default: "" },
      dismissible: { type: "boolean", default: true },
      width: { type: "string", default: "min(560px, 92vw)" },
    },
    theme: {
      "tc-modal-surface": "var(--tc-color-surface, #ffffff)",
      "tc-modal-ink": "var(--tc-color-ink, #14171f)",
      "tc-modal-rule": "var(--tc-color-rule, #ece5d3)",
      "tc-modal-soft": "var(--tc-color-ink-soft, #5a6072)",
      "tc-modal-radius": "var(--tc-radius-lg, 12px)",
      "tc-modal-backdrop": "rgba(20, 23, 31, 0.5)",
      "tc-modal-shadow":
        "var(--tc-shadow-lg, 0 24px 60px rgba(20, 23, 31, 0.25))",
      "tc-modal-font":
        "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
    },
    styles: {
      display: "contents",
    },
    template: ({ props }) => `
      <dialog class="dlg" aria-labelledby="${props.title ? "title" : ""}">
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
          width: ${esc(props.width)};
          max-width: 92vw;
          padding: 0;
          border: none;
          border-radius: var(--tc-modal-radius);
          background: var(--tc-modal-surface);
          color: var(--tc-modal-ink);
          font-family: var(--tc-modal-font);
          box-shadow: var(--tc-modal-shadow);
          overflow: hidden;
        }
        .dlg::backdrop {
          background: var(--tc-modal-backdrop);
          backdrop-filter: blur(2px);
        }
        .head {
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; padding: 16px 20px;
          border-bottom: 1px solid var(--tc-modal-rule);
        }
        .title {
          margin: 0; font-size: 1.05rem; font-weight: 700;
          letter-spacing: -0.01em;
        }
        .x {
          font: inherit; font-size: 1.4rem; line-height: 1;
          background: transparent; border: none; cursor: pointer;
          color: var(--tc-modal-soft);
          width: 32px; height: 32px; border-radius: 8px;
          display: inline-flex; align-items: center; justify-content: center;
        }
        .x:hover { background: var(--tc-modal-rule); color: var(--tc-modal-ink); }
        .body { padding: 20px; line-height: 1.6; color: var(--tc-modal-ink); }
        .foot {
          padding: 0;
        }
        .foot::slotted(*) {
          display: flex !important;
        }
        :host([open]) .foot:has(::slotted(*)) {
          padding: 12px 20px 16px;
          border-top: 1px solid var(--tc-modal-rule);
          display: flex; gap: 8px; justify-content: flex-end;
        }
      </style>
    `,
    refs: {
      dialog: ".dlg",
    },
    events: {
      "click .x": (_e, ctx) => {
        closeModal(ctx.host as HTMLElement & { open: boolean }, "button");
      },
      "click .dlg": (e, ctx) => {
        const host = ctx.host as HTMLElement & {
          open: boolean;
          dismissible: boolean;
        };
        if (!host.dismissible) return;
        const dlg = ctx.refs.dialog as HTMLDialogElement | null;
        if (!dlg) return;
        // A click on the backdrop fires on the dialog element itself with
        // a target equal to the dialog (not a child).
        if (e.target === dlg) {
          closeModal(host, "backdrop");
        }
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

// Per-host registry of (live dialog node, close-listener cleanup). Renders
// can replace the dialog node, so we keep track of which one we wired up.
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

  // Re-render produced a new dialog → tear down the stale wiring.
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

function closeModal(
  host: HTMLElement & { open: boolean },
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

function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
