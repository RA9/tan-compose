/**
 * `<site-nav>` — top-of-page navigation for the tan-compose docs site.
 *
 * NOT published to JSR. Lives in this repo because the brand mark,
 * version pill, and link list are site-specific.
 *
 * Props:
 *   active   string — id of the current page; highlights the matching link.
 *            One of: "home" | "docs" | "components" | "icons" | "themes" |
 *                    "examples" | "playground" | "blog"
 *   version  string — text shown in the version pill (default "v1.1.0")
 */

import { build, describe } from "@ra9/tan-compose";

const TAG = "site-nav";

export const tagName: string = TAG;

interface NavLink {
  id: string;
  label: string;
  href: string;
  external?: boolean;
  hideOnSmall?: boolean;
}

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
      const links: NavLink[] = [
        {
          id: "docs",
          label: "Docs",
          href: `${base}docs.html`,
          hideOnSmall: true,
        },
        {
          id: "components",
          label: "Components",
          href: `${base}components.html`,
        },
        {
          id: "icons",
          label: "Icons",
          href: `${base}icons.html`,
          hideOnSmall: true,
        },
        {
          id: "themes",
          label: "Themes",
          href: `${base}themes.html`,
          hideOnSmall: true,
        },
        {
          id: "examples",
          label: "Examples",
          href: `${base}examples.html`,
          hideOnSmall: true,
        },
        {
          id: "playground",
          label: "Playground",
          href: `${base}playground.html`,
          hideOnSmall: true,
        },
        {
          id: "blog",
          label: "Blog",
          href: `${base}blog/`,
          hideOnSmall: true,
        },
        {
          id: "github",
          label: "GitHub",
          href: "https://github.com/ra9/tan-compose",
          external: true,
        },
      ];

      const active = String(props.active ?? "");

      return `
        <header class="topbar">
          <div class="inner">
            <a class="brand" href="${esc(base)}index.html">
              <span class="brand-mark" aria-hidden="true"></span>
              tan-compose
              <span class="version-pill">${esc(props.version)}</span>
            </a>
            <nav aria-label="Primary">
              ${
        links.map((l) => {
          const isActive = l.id === active;
          const cls = [
            l.hideOnSmall ? "nav-hide-sm" : "",
            isActive ? "active" : "",
          ].filter(Boolean).join(" ");
          const ariaCurrent = isActive ? ' aria-current="page"' : "";
          const externalAttrs = l.external
            ? ' target="_blank" rel="noopener"'
            : "";
          return `<a href="${esc(l.href)}"${ariaCurrent}${externalAttrs}${
            cls ? ` class="${cls}"` : ""
          }>${esc(l.label)}</a>`;
        }).join("\n              ")
      }
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
            font-family: var(--tc-font-mono, "JetBrains Mono", monospace);
            font-weight: 600;
            font-size: 0.95rem;
            color: var(--tc-color-ink, #14171f);
            text-decoration: none;
          }
          .brand-mark {
            width: 22px;
            height: 22px;
            border-radius: 6px;
            background: var(--tc-color-accent, #a16939);
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
          nav {
            display: flex;
            gap: 22px;
            align-items: center;
          }
          nav a {
            color: var(--tc-color-ink-soft, #4a5061);
            text-decoration: none;
            font-size: 0.92rem;
            font-weight: 500;
            transition: color 0.15s ease;
          }
          nav a:hover,
          nav a:focus-visible,
          nav a.active,
          nav a[aria-current="page"] {
            color: var(--tc-color-accent, #a16939);
          }
          nav a:focus-visible {
            outline: 2px solid var(--tc-color-accent, #a16939);
            outline-offset: 4px;
            border-radius: 4px;
          }
          @media (max-width: 720px) {
            .inner { padding: 0 16px; gap: 8px; }
            nav { gap: 14px; }
            nav a.nav-hide-sm { display: none; }
          }
        </style>
      `;
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
