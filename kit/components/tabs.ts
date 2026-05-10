/**
 * `<tc-tabs>` — accessible tablist with named slots for each panel.
 *
 * Props:
 *   tabs    JSON Array<{ id: string; label: string }>
 *   active  string (default — first tab's id, reflects)
 *
 * Slots:
 *   one named slot per tab id; e.g. `<div slot="overview">…</div>` is shown
 *   when `active === "overview"`.
 *
 * Events:
 *   "tc-tab-change"  detail: { active, previous }
 *
 * Theme variables on :host:
 *   --tc-tabs-fg, --tc-tabs-fg-muted, --tc-tabs-rule, --tc-tabs-accent,
 *   --tc-tabs-font
 */

import { build, describe } from "@ra9/tan-compose";

const TAG = "tc-tabs";

export const tagName = TAG;

interface TabDef {
  id: string;
  label: string;
}

build(
  TAG,
  describe({
    props: {
      tabs: { type: "json", default: [] },
      active: { type: "string", default: "", reflect: true },
    },
    theme: {
      "tc-tabs-fg": "var(--tc-color-ink, #14171f)",
      "tc-tabs-fg-muted": "var(--tc-color-ink-muted, #6b7280)",
      "tc-tabs-rule": "var(--tc-color-rule, #ece5d3)",
      "tc-tabs-accent": "var(--tc-color-accent, #a16939)",
      "tc-tabs-font":
        "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
    },
    styles: {
      display: "block",
      "font-family": "var(--tc-tabs-font)",
    },
    template: ({ props }) => {
      const tabs = (props.tabs as TabDef[] | undefined) ?? [];
      const active = (props.active as string) || tabs[0]?.id || "";
      return `
        <div role="tablist" class="strip">
          ${
        tabs.map((t) =>
          `<button
              role="tab"
              type="button"
              class="tab ${t.id === active ? "active" : ""}"
              data-tab="${esc(t.id)}"
              aria-selected="${t.id === active ? "true" : "false"}"
              aria-controls="panel-${esc(t.id)}"
              tabindex="${t.id === active ? "0" : "-1"}"
            >${esc(t.label)}</button>`
        ).join("")
      }
        </div>
        <div class="panels">
          ${
        tabs.map((t) =>
          `<section
              role="tabpanel"
              id="panel-${esc(t.id)}"
              class="panel"
              aria-labelledby=""
              ${t.id === active ? "" : "hidden"}
            ><slot name="${esc(t.id)}"></slot></section>`
        ).join("")
      }
        </div>
        <style>
          .strip {
            display: flex; gap: 4px;
            border-bottom: 1px solid var(--tc-tabs-rule);
            margin-bottom: 16px;
          }
          .tab {
            font: inherit; font-size: 0.92rem; font-weight: 500;
            background: transparent; border: none; cursor: pointer;
            padding: 10px 16px; margin-bottom: -1px;
            color: var(--tc-tabs-fg-muted);
            border-bottom: 2px solid transparent;
            transition: color 0.15s ease, border-color 0.15s ease;
          }
          .tab:hover { color: var(--tc-tabs-fg); }
          .tab.active {
            color: var(--tc-tabs-accent);
            border-bottom-color: var(--tc-tabs-accent);
          }
          .tab:focus-visible {
            outline: 2px solid var(--tc-tabs-accent);
            outline-offset: 2px;
            border-radius: 4px;
          }
          .panel { color: var(--tc-tabs-fg); line-height: 1.6; }
        </style>
      `;
    },
    events: {
      "click .tab": (e, ctx) => {
        const target = (e.target as HTMLElement).closest(".tab") as
          | HTMLElement
          | null;
        if (!target) return;
        const id = target.dataset.tab;
        if (!id) return;
        const host = ctx.host as HTMLElement & { active: string };
        const previous = host.active;
        if (previous === id) return;
        host.active = id;
        ctx.emit("tc-tab-change", { active: id, previous });
      },
      "keydown .tab": (e, ctx) => {
        const ev = e as KeyboardEvent;
        const tabs = (ctx.props.tabs as TabDef[] | undefined) ?? [];
        if (tabs.length === 0) return;
        const host = ctx.host as HTMLElement & { active: string };
        const current = host.active || tabs[0].id;
        const idx = tabs.findIndex((t) => t.id === current);
        let next = idx;
        if (ev.key === "ArrowRight") next = (idx + 1) % tabs.length;
        else if (ev.key === "ArrowLeft") {
          next = (idx - 1 + tabs.length) % tabs.length;
        } else if (ev.key === "Home") next = 0;
        else if (ev.key === "End") next = tabs.length - 1;
        else return;
        ev.preventDefault();
        const id = tabs[next].id;
        host.active = id;
        ctx.emit("tc-tab-change", { active: id, previous: current });
        // Move focus to the new tab button on the next render.
        queueMicrotask(() => {
          const btn = ctx.host.shadowRoot?.querySelector(
            `.tab[data-tab="${id}"]`,
          ) as HTMLElement | null;
          btn?.focus();
        });
      },
    },
  }),
);

function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
