/**
 * `<tc-block-dashboard>` — a ready-made app shell: sidebar navigation on
 * the left, a top bar with the page title + action slot, and a content
 * region fed by the default slot. Compose it with `<tc-stat>`,
 * `<tc-table>`, `<tc-card>`, etc. to build an admin screen in minutes.
 *
 * Props:
 *   brand     string  (default "Acme") — brand wordmark at the top of the sidebar
 *   title     string  (default "Dashboard") — page title in the top bar
 *   nav       json    Array<{ id, label, icon? }> — sidebar entries. `icon`
 *                     is optional and rendered as a small glyph/emoji.
 *   active    string  (reflects) — id of the active nav entry
 *   userName  string  (default "Alex Rivera") — shown in the sidebar footer
 *   userRole  string  (default "Administrator")
 *
 * Slots:
 *   default         — main content region
 *   topbar          — right-hand actions in the top bar (buttons, search, …)
 *   sidebar-bottom  — replaces the user footer in the sidebar
 *
 * Events (composed, bubble out of the shadow root):
 *   tc-block-dashboard-nav  detail: { id, item } — fires when a nav entry
 *                           is activated (click or keyboard).
 *
 * Theme variables on :host:
 *   --tc-block-side-bg, --tc-block-side-fg, --tc-block-side-soft,
 *   --tc-block-side-active-bg, --tc-block-surface, --tc-block-rule,
 *   --tc-block-font
 */

import { build, describe, html, map } from "@ra9/tan-compose";

import "../components/avatar.ts";

const TAG = "tc-block-dashboard";

export const tagName = TAG;

interface NavItem {
  id: string;
  label: string;
  icon?: string;
}

const STYLE = `
  :host { display: block; font-family: var(--tc-block-font); }
  .shell {
    display: grid;
    grid-template-columns: 260px 1fr;
    min-height: 100vh;
    background: var(--tc-color-bg, #faf8f3);
    color: var(--tc-color-ink, #14171f);
  }

  /* ---- Sidebar ---- */
  .sidebar {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 22px 14px;
    background: var(--tc-block-side-bg);
    border-right: 1px solid var(--tc-block-rule);
  }
  .brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 1.02rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    padding: 2px 10px 16px;
  }
  .brand-mark {
    width: 22px;
    height: 22px;
    border-radius: 6px;
    background: var(--tc-color-accent, #a16939);
  }
  .nav {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
  }
  .nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 9px 12px;
    border: none;
    border-radius: var(--tc-radius-md, 8px);
    background: transparent;
    font: inherit;
    font-size: 0.92rem;
    font-weight: 500;
    color: var(--tc-block-side-soft);
    text-align: left;
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease;
  }
  .nav-item:hover { background: var(--tc-block-side-active-bg); color: var(--tc-block-side-fg); }
  .nav-item.active {
    background: var(--tc-block-side-active-bg);
    color: var(--tc-color-accent, #a16939);
    font-weight: 600;
  }
  .nav-item:focus-visible {
    outline: 2px solid var(--tc-color-accent, #a16939);
    outline-offset: 2px;
  }
  .nav-item .icon {
    width: 20px;
    text-align: center;
    flex: 0 0 auto;
  }
  .user {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    border-top: 1px solid var(--tc-block-rule);
  }
  .user .who {
    display: flex;
    flex-direction: column;
    min-width: 0;
    line-height: 1.25;
  }
  .user .name {
    font-size: 0.9rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .user .role {
    font-size: 0.78rem;
    color: var(--tc-block-side-soft);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* ---- Main ---- */
  .main {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  .topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 18px 28px;
    background: var(--tc-block-surface);
    border-bottom: 1px solid var(--tc-block-rule);
  }
  .topbar h1 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: -0.015em;
  }
  .actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .content {
    padding: 28px;
    flex: 1;
  }

  @media (max-width: 760px) {
    .shell { grid-template-columns: 1fr; }
    .sidebar {
      flex-direction: row;
      align-items: center;
      overflow-x: auto;
      padding: 10px 12px;
      border-right: none;
      border-bottom: 1px solid var(--tc-block-rule);
    }
    .brand { padding: 0 8px 0 0; }
    .nav { flex-direction: row; }
    .nav-item { white-space: nowrap; }
    .user { display: none; }
    .content { padding: 18px; }
    .topbar { padding: 14px 18px; }
  }
`;

build(
  TAG,
  describe({
    props: {
      brand: { type: "string", default: "Acme" },
      title: { type: "string", default: "Dashboard" },
      nav: {
        type: "json",
        default: [
          { id: "overview", label: "Overview", icon: "◉" },
          { id: "customers", label: "Customers", icon: "◈" },
          { id: "billing", label: "Billing", icon: "◫" },
          { id: "settings", label: "Settings", icon: "⚙" },
        ],
      },
      active: { type: "string", default: "", reflect: true },
      userName: { type: "string", default: "Alex Rivera" },
      userRole: { type: "string", default: "Administrator" },
    },
    theme: {
      "tc-block-side-bg": "var(--tc-color-surface, #ffffff)",
      "tc-block-side-fg": "var(--tc-color-ink, #14171f)",
      "tc-block-side-soft": "var(--tc-color-ink-soft, #4a5061)",
      "tc-block-side-active-bg": "var(--tc-color-accent-soft, #efe2cf)",
      "tc-block-surface": "var(--tc-color-surface, #ffffff)",
      "tc-block-rule": "var(--tc-color-rule, #ece5d3)",
      "tc-block-font":
        "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
    },
    styles: {
      display: "block",
    },
    stylesheet: STYLE,
    beforeMount() {
      const host = this as unknown as { active: string; nav: NavItem[] };
      const nav = host.nav ?? [];
      if (!host.active && nav.length > 0) host.active = nav[0].id;
    },
    template: ({ props }) => {
      const nav = (props.nav as NavItem[] | undefined) ?? [];
      const active = String(props.active ?? "") || nav[0]?.id || "";
      return html`
        <div class="shell">
          <aside class="sidebar">
            <span class="brand">
              <span class="brand-mark" aria-hidden="true"></span>
              ${props.brand}
            </span>
            <nav class="nav" aria-label="Primary">
              ${map(nav, (item) =>
                html`
                  <button
                    type="button"
                    class="nav-item ${item.id === active ? "active" : ""}"
                    data-nav="${item.id}"
                    aria-current="${item.id === active ? "page" : "false"}"
                  >
                    ${item.icon
                      ? html`
                        <span class="icon" aria-hidden="true">${item
                          .icon}</span>
                      `
                      : ""}
                    <span>${item.label}</span>
                  </button>
                `)}
            </nav>
            <div class="user">
              <slot name="sidebar-bottom">
                <tc-avatar name="${props.userName}" size="sm"></tc-avatar>
                <span class="who">
                  <span class="name">${props.userName}</span>
                  <span class="role">${props.userRole}</span>
                </span>
              </slot>
            </div>
          </aside>

          <div class="main">
            <header class="topbar">
              <h1>${props.title}</h1>
              <div class="actions"><slot name="topbar"></slot></div>
            </header>
            <main class="content"><slot></slot></main>
          </div>
        </div>
      `;
    },
    events: {
      "click .nav-item": (event, ctx) => {
        const btn = (event.target as HTMLElement).closest(
          ".nav-item",
        ) as HTMLElement | null;
        if (!btn) return;
        const id = btn.dataset.nav;
        if (!id) return;
        const nav = (ctx.props.nav as NavItem[] | undefined) ?? [];
        const item = nav.find((n) => n.id === id);
        const host = ctx.host as HTMLElement & { active: string };
        const previous = host.active;
        if (previous !== id) host.active = id;
        ctx.emit("tc-block-dashboard-nav", {
          id,
          item: item ?? null,
          previous,
        });
      },
    },
  }),
);
