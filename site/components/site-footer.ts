/**
 * `<site-footer>` — bottom-of-page footer for the tan-compose docs site.
 *
 * NOT published to JSR; site-specific.
 *
 * Props:
 *   base    string — relative path prefix for internal links (default "")
 *   year    string — copyright year (default "2026")
 */

import { build, describe } from "@ra9/tan-compose";

const TAG = "site-footer";

export const tagName: string = TAG;

build(
  TAG,
  describe({
    props: {
      base: { type: "string", default: "" },
      year: { type: "string", default: "2026" },
    },
    styles: {
      display: "block",
    },
    template: ({ props }) => {
      const base = String(props.base ?? "");
      return `
        <footer class="foot">
          <div class="inner">
            <p>&copy; ${esc(props.year)} Tan Compose · MIT License</p>
            <div class="links">
              <a href="${esc(base)}docs.html">Docs</a>
              <a href="${esc(base)}components.html">Components</a>
              <a href="${esc(base)}themes.html">Themes</a>
              <a href="${esc(base)}playground.html">Playground</a>
              <a href="${esc(base)}blog/">Blog</a>
              <a href="https://jsr.io/@ra9/tan-compose-kit" target="_blank" rel="noopener">JSR</a>
              <a href="https://github.com/ra9/tan-compose" target="_blank" rel="noopener">GitHub</a>
            </div>
          </div>
        </footer>
        <style>
          :host { display: block; }
          .foot {
            border-top: 1px solid var(--tc-color-rule, #ece5d3);
            padding: 36px 0 56px;
            margin-top: 32px;
          }
          .inner {
            max-width: 1100px;
            margin: 0 auto;
            padding: 0 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            flex-wrap: wrap;
          }
          p {
            color: var(--tc-color-ink-muted, #6b7280);
            font-size: 0.9rem;
            margin: 0;
          }
          .links {
            display: flex;
            gap: 22px;
            flex-wrap: wrap;
          }
          .links a {
            color: var(--tc-color-ink-soft, #4a5061);
            text-decoration: none;
            font-size: 0.9rem;
            transition: color 0.15s ease;
          }
          .links a:hover {
            color: var(--tc-color-accent, #a16939);
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
