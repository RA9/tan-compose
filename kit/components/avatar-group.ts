/**
 * `<tc-avatar-group>` — overlapping cluster of `<tc-avatar>` elements
 * with an overflow count.
 *
 * Props:
 *   max      number  (default 4) — visible before the +N pill
 *   spacing  "tight" | "normal" | "loose" (default "normal")
 *   size     "xs" | "sm" | "md" | "lg" | "xl" (default "md") —
 *            applied to children that don't set their own
 *
 * Slots:
 *   default — `<tc-avatar>` elements (or anything; the group just
 *             overlaps and counts them).
 *
 * Theme variables:
 *   --tc-avatar-group-ring, --tc-avatar-group-overflow-bg,
 *   --tc-avatar-group-overflow-fg
 */

import { build, describe } from "@ra9/tan-compose";

const TAG = "tc-avatar-group";

export const tagName = TAG;

interface HostExtras {
  max: number;
  spacing: string;
  size: string;
  _agroupCleanup?: () => void;
}

build(
  TAG,
  describe({
    props: {
      max: { type: "number", default: 4 },
      spacing: { type: "string", default: "normal" },
      size: { type: "string", default: "md" },
    },
    theme: {
      "tc-avatar-group-ring": "var(--tc-color-surface, #ffffff)",
      "tc-avatar-group-overflow-bg": "var(--tc-color-rule, #ece5d3)",
      "tc-avatar-group-overflow-fg": "var(--tc-color-ink, #14171f)",
    },
    styles: {
      display: "inline-flex",
    },
    template: () => `
      <span class="row"><slot></slot><span class="overflow" hidden></span></span>
      <style>
        :host {
          display: inline-flex;
          vertical-align: middle;
        }
        .row {
          display: inline-flex;
          align-items: center;
        }
        ::slotted(tc-avatar) {
          box-shadow: 0 0 0 2px var(--tc-avatar-group-ring);
          border-radius: 999px;
          transition: transform 0.15s ease;
        }
        :host([spacing="tight"]) ::slotted(tc-avatar) { margin-left: -10px; }
        :host([spacing="normal"]) ::slotted(tc-avatar),
        :host(:not([spacing])) ::slotted(tc-avatar) { margin-left: -8px; }
        :host([spacing="loose"]) ::slotted(tc-avatar) { margin-left: -4px; }
        ::slotted(tc-avatar:first-child) { margin-left: 0 !important; }
        ::slotted(tc-avatar:hover) { transform: translateY(-2px); z-index: 1; }
        .overflow {
          display: inline-grid;
          place-items: center;
          background: var(--tc-avatar-group-overflow-bg);
          color: var(--tc-avatar-group-overflow-fg);
          font-weight: 600;
          font-family: var(--tc-font-sans, system-ui, sans-serif);
          border-radius: 999px;
          box-shadow: 0 0 0 2px var(--tc-avatar-group-ring);
          line-height: 1;
          user-select: none;
        }
        :host([size="xs"]) .overflow { width: 20px; height: 20px; font-size: 0.55rem; margin-left: -10px; }
        :host([size="sm"]) .overflow { width: 28px; height: 28px; font-size: 0.68rem; margin-left: -8px; }
        :host(:not([size])) .overflow,
        :host([size="md"]) .overflow { width: 36px; height: 36px; font-size: 0.78rem; margin-left: -8px; }
        :host([size="lg"]) .overflow { width: 48px; height: 48px; font-size: 0.88rem; margin-left: -6px; }
        :host([size="xl"]) .overflow { width: 64px; height: 64px; font-size: 1rem; margin-left: -4px; }
      </style>
    `,
    afterMount() {
      const host = this as unknown as HTMLElement & HostExtras;
      const apply = () => applyGroup(host);
      apply();
      const mo = new MutationObserver(apply);
      mo.observe(host, { childList: true });
      host._agroupCleanup = () => mo.disconnect();
    },
    afterRender() {
      applyGroup(this as unknown as HTMLElement & HostExtras);
    },
    unmount() {
      const host = this as unknown as HTMLElement & HostExtras;
      host._agroupCleanup?.();
    },
  }),
);

function applyGroup(host: HTMLElement & HostExtras): void {
  const max = Math.max(0, Number(host.max ?? 4));
  const size = String(host.size ?? "md");
  const all = Array.from(host.children).filter((c): c is HTMLElement =>
    c instanceof HTMLElement
  );
  let visible = 0;
  for (const el of all) {
    if (el.tagName.toLowerCase() === "tc-avatar") {
      // Inherit size unless the child set its own.
      if (!el.getAttribute("size")) el.setAttribute("size", size);
      if (visible < max || max === 0) {
        el.hidden = false;
        visible++;
      } else {
        el.hidden = true;
      }
    }
  }
  const total = all.filter((e) => e.tagName.toLowerCase() === "tc-avatar")
    .length;
  const hidden = Math.max(0, total - visible);
  const overflow = host.shadowRoot?.querySelector(".overflow") as
    | HTMLElement
    | null;
  if (overflow) {
    if (hidden > 0) {
      overflow.hidden = false;
      overflow.textContent = `+${hidden}`;
    } else {
      overflow.hidden = true;
    }
  }
}
