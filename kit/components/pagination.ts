/**
 * `<tc-pagination>` — prev/next + page-number controls for paginated lists,
 * tables, search results, and blog indexes.
 *
 * Renders an accessible `<nav>` with prev / next buttons and a window of
 * page numbers around the current page, with ellipses for skipped ranges.
 * Pages outside the window are still reachable via `boundaries` slots at
 * the start and end.
 *
 * Props:
 *   current      number   default 1   — the active page (1-based)
 *   total        number   default 1   — total number of pages
 *   siblings     number   default 1   — page numbers shown on each side of current
 *   boundaries   number   default 1   — pages shown at the start and end
 *   size         "sm" | "md" | "lg"   default "sm"
 *   prev-label   string   default "Prev"
 *   next-label   string   default "Next"
 *   label        string   default "Pagination" — aria-label on the <nav>
 *
 * Events:
 *   tc-page-change   detail: { page: number }
 *     Fires when the user clicks a page number or prev/next. The component
 *     does NOT update `current` itself — the parent decides whether to
 *     accept the change and re-set the prop. This makes it easy to clamp,
 *     guard async loads, etc.
 *
 * Behavior:
 *   - When total <= 1 the component renders nothing (no controls needed).
 *   - Prev is disabled at page 1; Next is disabled at the last page.
 *   - Clicking the current page is a no-op (no event fired).
 */

import { build, describe, html, unsafe } from "@ra9/tan-compose";
import "./button.ts";

const TAG = "tc-pagination";

export const tagName = TAG;

const STYLE = `
          :host { display: block; }
          nav {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            flex-wrap: wrap;
          }
          .pages {
            display: inline-flex;
            align-items: center;
            gap: 4px;
          }
          .ellipsis {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 28px;
            color: var(--tc-color-ink-muted, #6b7280);
            font-family: var(--tc-font-mono, "JetBrains Mono", monospace);
          }
          tc-button[aria-current="page"] {
            pointer-events: none;
          }
`;

build(
  TAG,
  describe({
    props: {
      current: { type: "number", default: 1 },
      total: { type: "number", default: 1 },
      siblings: { type: "number", default: 1 },
      boundaries: { type: "number", default: 1 },
      size: { type: "string", default: "sm" },
      "prev-label": { type: "string", default: "Prev" },
      "next-label": { type: "string", default: "Next" },
      label: { type: "string", default: "Pagination" },
    },
    styles: {
      display: "block",
    },
    stylesheet: STYLE,
    template: ({ props }) => {
      const total = Math.max(1, Number(props.total) | 0);
      const current = clamp(Number(props.current) | 0, 1, total);
      const siblings = Math.max(0, Number(props.siblings) | 0);
      const boundaries = Math.max(0, Number(props.boundaries) | 0);

      if (total <= 1) return "";

      const items = buildPageList(current, total, siblings, boundaries);
      const size = esc(String(props.size ?? "sm"));
      const prevDisabled = current <= 1 ? " disabled" : "";
      const nextDisabled = current >= total ? " disabled" : "";

      const pages = items
        .map((it) => {
          if (it === "…") {
            return `<span class="ellipsis" aria-hidden="true">…</span>`;
          }
          const isActive = it === current;
          const variant = isActive ? "primary" : "ghost";
          const ariaCurrent = isActive ? ' aria-current="page"' : "";
          return `<tc-button
            class="num"
            size="${size}"
            variant="${variant}"
            data-page="${it}"${ariaCurrent}
          >${it}</tc-button>`;
        })
        .join("");

      return html`
        <nav aria-label="${String(props.label ?? "Pagination")}">
          <tc-button
            class="prev"
            size="${unsafe(size)}"
            variant="ghost"
            data-page="${current - 1}"
            ${unsafe(prevDisabled)}
          >← ${String(props["prev-label"] ?? "Prev")}</tc-button>
          <span class="pages">${unsafe(pages)}</span>
          <tc-button
            class="next"
            size="${unsafe(size)}"
            variant="ghost"
            data-page="${current + 1}"
            ${unsafe(nextDisabled)}
          >${String(props["next-label"] ?? "Next")} →</tc-button>
        </nav>
      `;
    },
    events: {
      "click tc-button": (e, ctx) => {
        const btn = (e.target as HTMLElement).closest("tc-button");
        if (!btn) return;
        // Disabled buttons don't dispatch the click via shadow boundaries
        // but guard anyway.
        if (btn.hasAttribute("disabled")) return;
        const pageRaw = btn.getAttribute("data-page");
        if (pageRaw == null) return;
        const page = Number(pageRaw);
        const host = ctx.host as HTMLElement & {
          total: number;
          current: number;
        };
        const total = Math.max(1, Number(host.total) | 0);
        const current = Number(host.current) | 0;
        if (!Number.isFinite(page) || page < 1 || page > total) return;
        if (page === current) return;
        ctx.emit("tc-page-change", { page });
      },
    },
  }),
);

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

/**
 * Build the visible list of page items. Returns numbers and "…" markers.
 * Example with current=5, total=10, siblings=1, boundaries=1:
 *   [1, "…", 4, 5, 6, "…", 10]
 */
function buildPageList(
  current: number,
  total: number,
  siblings: number,
  boundaries: number,
): (number | "…")[] {
  const set = new Set<number>();
  // boundaries at the start
  for (let i = 1; i <= Math.min(boundaries, total); i++) set.add(i);
  // boundaries at the end
  for (let i = Math.max(1, total - boundaries + 1); i <= total; i++) {
    set.add(i);
  }
  // siblings around current
  for (
    let i = Math.max(1, current - siblings);
    i <= Math.min(total, current + siblings);
    i++
  ) {
    set.add(i);
  }
  const sorted = [...set].sort((a, b) => a - b);
  const out: (number | "…")[] = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) out.push("…");
    out.push(sorted[i]);
  }
  return out;
}

function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
