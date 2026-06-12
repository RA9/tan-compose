/**
 * `<site-nav>` — top-of-page navigation for the tan-compose docs site.
 *
 * NOT published to JSR. Lives in this repo because the brand mark,
 * version pill, and link list are site-specific.
 *
 * Layout:
 *   Desktop — brand · search · [Docs · Components · Resources▾ · Blog · GitHub]
 *             "Resources" is a hover/click dropdown grouping the secondary
 *             browse pages (Icons, Themes, Examples, Playground) so the bar
 *             stays to five top-level targets.
 *   Mobile  — brand · search · ☰. The hamburger toggles a full-width panel
 *             holding every link (Resources flattened into a labeled group),
 *             so nothing is hidden-and-unreachable the way it used to be.
 *
 * Interaction is wired in afterMount with plain DOM (class toggles, no
 * setState) so the template renders exactly once and the nested
 * <site-search> is never torn down and rebuilt.
 *
 * Props:
 *   active   string — id of the current page; highlights the matching link.
 *            One of: "home" | "docs" | "components" | "icons" | "themes" |
 *                    "examples" | "playground" | "blog"
 *   version  string — text shown in the version pill (default "v1.1.0")
 *   base     string — relative path prefix ("" top-level, "../" nested)
 */

import { build, describe } from "@ra9/tan-compose";

const TAG = "site-nav";

export const tagName: string = TAG;

interface NavLink {
  id: string;
  label: string;
  href: string;
  external?: boolean;
}

interface NavCleanupHost extends HTMLElement {
  _navCleanup?: () => void;
}

const CARET =
  `<svg class="nav-caret" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>`;

build(
  TAG,
  describe({
    props: {
      active: { type: "string", default: "" },
      version: { type: "string", default: "v1.1.0" },
      base: { type: "string", default: "" },
    },
    styles: {
      display: "block",
    },
    template: ({ props }) => {
      const base = String(props.base ?? "");
      const active = String(props.active ?? "");

      const primary: NavLink[] = [
        { id: "docs", label: "Docs", href: `${base}docs.html` },
        {
          id: "components",
          label: "Components",
          href: `${base}components.html`,
        },
      ];
      const resources: NavLink[] = [
        { id: "icons", label: "Icons", href: `${base}icons.html` },
        { id: "themes", label: "Themes", href: `${base}themes.html` },
        { id: "examples", label: "Examples", href: `${base}examples.html` },
        {
          id: "playground",
          label: "Playground",
          href: `${base}playground.html`,
        },
      ];
      const trailing: NavLink[] = [
        { id: "blog", label: "Blog", href: `${base}blog/` },
        {
          id: "github",
          label: "GitHub",
          href: "https://github.com/ra9/tan-compose",
          external: true,
        },
      ];

      const link = (l: NavLink, extraClass = ""): string => {
        const isActive = l.id === active;
        const cls = [extraClass, isActive ? "active" : ""]
          .filter(Boolean)
          .join(" ");
        const ariaCurrent = isActive ? ' aria-current="page"' : "";
        const ext = l.external ? ' target="_blank" rel="noopener"' : "";
        return `<a href="${esc(l.href)}"${ariaCurrent}${ext}${
          cls ? ` class="${cls}"` : ""
        }>${esc(l.label)}</a>`;
      };

      const groupActive = resources.some((r) => r.id === active);

      return `
        <header class="topbar">
          <div class="inner">
            <a class="brand" href="${esc(base)}index.html">
              <svg class="brand-mark" viewBox="0 0 64 64" fill="none" aria-hidden="true"><rect x="8" y="8" width="32" height="32" rx="6" fill="#14171f" opacity="0.55"/><rect x="16" y="16" width="32" height="32" rx="6" fill="#14171f" opacity="0.75"/><rect x="24" y="24" width="32" height="32" rx="6" fill="#a16939"/></svg>
              tan-compose
              <span class="version-pill">${esc(props.version)}</span>
            </a>

            <site-search base="${esc(base)}" class="nav-search"></site-search>

            <button
              type="button"
              class="nav-toggle"
              aria-label="Open menu"
              aria-expanded="false"
              aria-controls="primary-nav"
            >
              <svg class="icon-open" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              <svg class="icon-close" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></svg>
            </button>

            <nav id="primary-nav" class="nav-menu" aria-label="Primary">
              ${primary.map((l) => link(l)).join("\n              ")}

              <div class="nav-group${groupActive ? " group-active" : ""}">
                <button
                  type="button"
                  class="nav-group-trigger${groupActive ? " active" : ""}"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Resources ${CARET}
                </button>
                <div class="nav-dropdown" role="menu">
                  <span class="nav-dropdown-label">Resources</span>
                  ${
        resources
          .map((l) => link(l, "nav-dropdown-link"))
          .join("\n                  ")
      }
                </div>
              </div>

              ${trailing.map((l) => link(l)).join("\n              ")}
            </nav>
          </div>
        </header>
        <style>
          :host { display: block; }
          .topbar {
            border-bottom: 1px solid var(--tc-color-rule, #ece5d3);
            background: var(--tc-color-bg, #faf8f3);
            position: sticky;
            top: 0;
            z-index: 50;
            backdrop-filter: saturate(180%) blur(8px);
            -webkit-backdrop-filter: saturate(180%) blur(8px);
          }
          .inner {
            position: relative;
            max-width: 1100px;
            margin: 0 auto;
            padding: 0 24px;
            height: 56px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
          }
          .brand {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            flex: 0 0 auto;
            font-family: var(--tc-font-mono, "JetBrains Mono", monospace);
            font-weight: 600;
            font-size: 0.95rem;
            color: var(--tc-color-ink, #14171f);
            text-decoration: none;
          }
          .brand-mark {
            width: 22px;
            height: 22px;
            display: inline-block;
          }
          .version-pill {
            font-family: var(--tc-font-mono, "JetBrains Mono", monospace);
            font-size: 0.72rem;
            font-weight: 500;
            padding: 2px 8px;
            border-radius: var(--tc-radius-pill, 999px);
            background: var(--tc-color-accent-soft, #efe2cf);
            color: var(--tc-color-accent-hover, #8a572d);
            border: 1px solid var(--tc-color-rule-strong, #d9cfb8);
          }

          .nav-search { flex: 0 1 auto; }

          /* Hamburger — hidden on desktop, shown under the mobile breakpoint. */
          .nav-toggle {
            display: none;
            align-items: center;
            justify-content: center;
            width: 38px;
            height: 38px;
            flex: 0 0 auto;
            padding: 0;
            border: 1px solid var(--tc-color-rule, #ece5d3);
            border-radius: var(--tc-radius-md, 8px);
            background: var(--tc-color-surface, #ffffff);
            color: var(--tc-color-ink, #14171f);
            cursor: pointer;
            transition: border-color 0.15s ease;
          }
          .nav-toggle:hover { border-color: var(--tc-color-accent, #a16939); }
          .nav-toggle:focus-visible {
            outline: 2px solid var(--tc-color-accent, #a16939);
            outline-offset: 2px;
          }
          .nav-toggle .icon-close { display: none; }
          .nav-toggle[aria-expanded="true"] .icon-open { display: none; }
          .nav-toggle[aria-expanded="true"] .icon-close { display: inline; }

          nav.nav-menu {
            display: flex;
            gap: 22px;
            align-items: center;
          }
          nav.nav-menu > a,
          .nav-group-trigger {
            color: var(--tc-color-ink-soft, #4a5061);
            text-decoration: none;
            font-family: inherit;
            font-size: 0.92rem;
            font-weight: 500;
            transition: color 0.15s ease;
          }
          nav.nav-menu > a:hover,
          nav.nav-menu > a:focus-visible,
          nav.nav-menu > a.active,
          nav.nav-menu > a[aria-current="page"],
          .nav-group-trigger:hover,
          .nav-group-trigger:focus-visible,
          .nav-group-trigger.active {
            color: var(--tc-color-accent, #a16939);
          }
          nav.nav-menu > a:focus-visible,
          .nav-group-trigger:focus-visible {
            outline: 2px solid var(--tc-color-accent, #a16939);
            outline-offset: 4px;
            border-radius: 4px;
          }

          /* Dropdown group ----------------------------------------------- */
          .nav-group { position: relative; }
          .nav-group-trigger {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            padding: 0;
            background: none;
            border: none;
            cursor: pointer;
          }
          .nav-caret { transition: transform 0.18s ease; }
          .nav-group:hover .nav-caret,
          .nav-group.open .nav-caret {
            transform: rotate(180deg);
          }
          .nav-dropdown-label { display: none; }
          .nav-dropdown {
            position: absolute;
            top: calc(100% + 10px);
            right: 0;
            min-width: 180px;
            display: none;
            flex-direction: column;
            padding: 6px;
            background: var(--tc-color-surface, #ffffff);
            border: 1px solid var(--tc-color-rule, #ece5d3);
            border-radius: var(--tc-radius-md, 10px);
            box-shadow: 0 14px 32px -12px rgba(20, 23, 31, 0.28);
          }
          /* A hover bridge keeps the menu open while the pointer travels
             from the trigger down into the panel across the 10px gap. */
          .nav-dropdown::before {
            content: "";
            position: absolute;
            top: -10px;
            left: 0;
            right: 0;
            height: 10px;
          }
          /* Mouse opens on hover; keyboard/touch open via the .open class
             the trigger toggles. Deliberately not :focus-within — that would
             pin the panel open while the button is focused and break
             Enter-to-close. */
          .nav-group:hover .nav-dropdown,
          .nav-group.open .nav-dropdown {
            display: flex;
          }
          .nav-dropdown-link {
            display: block;
            padding: 8px 12px;
            border-radius: var(--tc-radius-sm, 6px);
            color: var(--tc-color-ink-soft, #4a5061);
            text-decoration: none;
            font-size: 0.9rem;
            font-weight: 500;
            white-space: nowrap;
            transition: background 0.12s ease, color 0.12s ease;
          }
          .nav-dropdown-link:hover,
          .nav-dropdown-link:focus-visible {
            background: var(--tc-color-accent-soft, #efe2cf);
            color: var(--tc-color-accent-hover, #8a572d);
            outline: none;
          }
          .nav-dropdown-link.active {
            color: var(--tc-color-accent, #a16939);
          }

          /* Mobile ------------------------------------------------------- */
          @media (max-width: 820px) {
            .inner { padding: 0 16px; gap: 10px; }
            .nav-toggle { display: inline-flex; }

            nav.nav-menu {
              position: absolute;
              top: calc(100% + 1px);
              left: 0;
              right: 0;
              display: none;
              flex-direction: column;
              align-items: stretch;
              gap: 0;
              padding: 8px;
              background: var(--tc-color-bg, #faf8f3);
              border-bottom: 1px solid var(--tc-color-rule, #ece5d3);
              box-shadow: 0 16px 32px -18px rgba(20, 23, 31, 0.35);
            }
            nav.nav-menu.open { display: flex; }

            nav.nav-menu > a,
            .nav-group-trigger {
              padding: 11px 12px;
              border-radius: var(--tc-radius-md, 8px);
              font-size: 0.98rem;
            }

            /* Inside the panel the group is a static, always-expanded
               section; the trigger becomes a non-interactive label. */
            .nav-group { position: static; }
            .nav-group-trigger {
              width: 100%;
              justify-content: flex-start;
              pointer-events: none;
              color: var(--tc-color-ink-muted, #6b7280);
              font-size: 0.72rem;
              text-transform: uppercase;
              letter-spacing: 0.07em;
              padding: 14px 12px 4px;
            }
            .nav-group-trigger .nav-caret { display: none; }
            .nav-dropdown,
            .nav-group.open .nav-dropdown {
              position: static;
              display: flex;
              min-width: 0;
              padding: 0;
              background: none;
              border: none;
              box-shadow: none;
            }
            .nav-dropdown::before { display: none; }
            .nav-dropdown-link { padding: 11px 20px; font-size: 0.98rem; }
          }

          @media (max-width: 460px) {
            .version-pill { display: none; }
          }
        </style>
      `;
    },
    afterMount() {
      const host = this as unknown as NavCleanupHost;
      const root = host.shadowRoot;
      if (!root) return;

      const toggle = root.querySelector<HTMLButtonElement>(".nav-toggle");
      const menu = root.querySelector<HTMLElement>(".nav-menu");
      const groups = Array.from(
        root.querySelectorAll<HTMLElement>(".nav-group"),
      );

      const setGroup = (g: HTMLElement, open: boolean) => {
        g.classList.toggle("open", open);
        g.querySelector(".nav-group-trigger")
          ?.setAttribute("aria-expanded", open ? "true" : "false");
      };
      const closeGroups = (except?: HTMLElement) => {
        for (const g of groups) if (g !== except) setGroup(g, false);
      };
      const closeMobile = () => {
        menu?.classList.remove("open");
        toggle?.setAttribute("aria-expanded", "false");
        toggle?.setAttribute("aria-label", "Open menu");
      };

      const onToggle = (e: Event) => {
        e.preventDefault();
        const open = !menu?.classList.contains("open");
        menu?.classList.toggle("open", open);
        toggle?.setAttribute("aria-expanded", open ? "true" : "false");
        toggle?.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      };
      toggle?.addEventListener("click", onToggle);

      const triggerHandlers: Array<[HTMLElement, (e: Event) => void]> = [];
      for (const g of groups) {
        const trigger = g.querySelector<HTMLButtonElement>(
          ".nav-group-trigger",
        );
        if (!trigger) continue;
        const onClick = (e: Event) => {
          e.preventDefault();
          const open = !g.classList.contains("open");
          closeGroups(g);
          setGroup(g, open);
        };
        trigger.addEventListener("click", onClick);
        triggerHandlers.push([trigger, onClick]);
      }

      // Outside click / Escape close everything. composedPath() crosses the
      // shadow boundary so in-shadow clicks register against our elements.
      const onDocPointer = (e: Event) => {
        const path = e.composedPath();
        for (const g of groups) if (!path.includes(g)) setGroup(g, false);
        if (
          menu && !path.includes(menu) && !(toggle && path.includes(toggle))
        ) {
          closeMobile();
        }
      };
      const onDocKey = (e: KeyboardEvent) => {
        if (e.key !== "Escape") return;
        closeGroups();
        if (menu?.classList.contains("open")) {
          closeMobile();
          toggle?.focus();
        }
      };
      document.addEventListener("click", onDocPointer);
      document.addEventListener("keydown", onDocKey);

      host._navCleanup = () => {
        toggle?.removeEventListener("click", onToggle);
        for (const [t, h] of triggerHandlers) t.removeEventListener("click", h);
        document.removeEventListener("click", onDocPointer);
        document.removeEventListener("keydown", onDocKey);
      };
    },
    unmount() {
      const host = this as unknown as NavCleanupHost;
      host._navCleanup?.();
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
