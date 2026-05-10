/**
 * `<tc-table>` — a paginated, filterable, sortable datatable built on
 * @ra9/tan-compose primitives.
 *
 * Props:
 *   rows         Array<Record<string, unknown>>   — row objects
 *   columns      Array<{ key: string; label: string; sortable?: boolean }>
 *   pageSize     number (default 10)
 *   filterable   boolean (default true) — show search input
 *   emptyText    string (default "No results.")
 *   rowKey       string (default "id") — property name for stable keys
 *
 * Events:
 *   "tc-row-click"   detail: { row }
 *   "tc-sort-change" detail: { key, direction: "asc" | "desc" | null }
 *
 * Theme variables on :host (override at the page level):
 *   --tc-table-surface, --tc-table-ink, --tc-table-soft, --tc-table-rule,
 *   --tc-table-head-bg, --tc-table-row-hover, --tc-table-accent,
 *   --tc-table-radius, --tc-table-font
 *
 * Note on rendering: rows are interpolated directly into the template string.
 * For very large tables (1000+ rows), windowing or a future core update that
 * allows `for:` inside an element will give better keystroke-filter latency.
 */

import { build, describe } from "@ra9/tan-compose";

const TAG = "tc-table";

export const tagName = TAG;

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
}

interface Row {
  [key: string]: unknown;
}

interface TableState {
  q?: string;
  page?: number;
  sortKey?: string | null;
  sortDir?: "asc" | "desc" | null;
}

build(
  TAG,
  describe({
    props: {
      rows: { type: "json", default: [] },
      columns: { type: "json", default: [] },
      pageSize: { type: "number", default: 10 },
      filterable: { type: "boolean", default: true },
      emptyText: { type: "string", default: "No results." },
      rowKey: { type: "string", default: "id" },
    },
    theme: {
      "tc-table-surface": "var(--tc-color-surface, #ffffff)",
      "tc-table-ink": "var(--tc-color-ink, #14171f)",
      "tc-table-soft": "var(--tc-color-ink-soft, #5a6072)",
      "tc-table-rule": "var(--tc-color-rule, #ece5d3)",
      "tc-table-head-bg": "var(--tc-color-bg, #faf8f3)",
      "tc-table-row-hover": "rgba(161, 105, 57, 0.05)",
      "tc-table-accent": "var(--tc-color-accent, #a16939)",
      "tc-table-radius": "var(--tc-radius-lg, 10px)",
      "tc-table-font":
        "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
    },
    styles: {
      display: "block",
    },
    template: ({ props, state }) => {
      const cols = (props.columns as Column[] | undefined) ?? [];
      const ts = state as TableState;
      const visible = visibleRows(props, ts);
      const totalPages = Math.max(
        1,
        Math.ceil(visible.length / ((props.pageSize as number) ?? 10)),
      );
      const page = Math.min(ts.page ?? 0, totalPages - 1);
      const size = (props.pageSize as number) ?? 10;
      const slice = visible.slice(page * size, page * size + size);
      const total = ((props.rows as Row[] | undefined) ?? []).length;

      return `
        ${
        props.filterable
          ? `<input class="filter" placeholder="Search..." value="${
            esc(ts.q ?? "")
          }" />`
          : ""
      }
        <div class="wrap">
          <table>
            <thead>
              <tr>
                ${
        cols.map((c) => {
          const isSorted = ts.sortKey === c.key;
          const sortable = c.sortable !== false;
          const indicator = isSorted ? ts.sortDir === "asc" ? "▲" : "▼" : "";
          const ariaSort = isSorted
            ? ts.sortDir === "asc" ? "ascending" : "descending"
            : "none";
          return `<th
                    data-col="${esc(c.key)}"
                    class="${sortable ? "sortable" : ""}"
                    aria-sort="${ariaSort}"
                  >${esc(c.label)}<span class="sort">${indicator}</span></th>`;
        }).join("")
      }
              </tr>
            </thead>
            <tbody>
              ${
        slice.length === 0
          ? `<tr class="empty"><td colspan="${cols.length || 1}">${
            esc(props.emptyText)
          }</td></tr>`
          : slice.map((row, i) =>
            `<tr data-row="${page * size + i}">${
              cols.map((c) => `<td>${esc(row[c.key] ?? "")}</td>`).join("")
            }</tr>`
          ).join("")
      }
            </tbody>
          </table>
        </div>
        <footer class="pager">
          <span class="count">${visible.length} of ${total} rows</span>
          <span class="spacer"></span>
          <button class="prev" type="button" ${
        page <= 0 ? "disabled" : ""
      }>‹ prev</button>
          <span class="page">page ${page + 1} of ${totalPages}</span>
          <button class="next" type="button" ${
        page >= totalPages - 1 ? "disabled" : ""
      }>next ›</button>
        </footer>
        <style>
          :host { font-family: var(--tc-table-font); color: var(--tc-table-ink); }
          .filter {
            width: 100%; box-sizing: border-box;
            font: inherit; font-size: 0.92rem;
            padding: 9px 12px; margin-bottom: 12px;
            background: var(--tc-table-surface);
            color: var(--tc-table-ink);
            border: 1px solid var(--tc-table-rule);
            border-radius: 8px; outline: none;
          }
          .filter:focus {
            border-color: var(--tc-table-accent);
            box-shadow: var(--tc-focus-ring, 0 0 0 3px rgba(161, 105, 57, 0.18));
          }
          .wrap {
            border: 1px solid var(--tc-table-rule);
            border-radius: var(--tc-table-radius);
            background: var(--tc-table-surface);
            overflow: hidden;
          }
          table {
            width: 100%; border-collapse: collapse; font-size: 0.92rem;
          }
          thead { background: var(--tc-table-head-bg); }
          th {
            text-align: left; padding: 11px 14px;
            font-weight: 600; font-size: 0.78rem;
            text-transform: uppercase; letter-spacing: 0.04em;
            color: var(--tc-table-soft);
            border-bottom: 1px solid var(--tc-table-rule);
            user-select: none;
          }
          th.sortable { cursor: pointer; }
          th.sortable:hover { color: var(--tc-table-accent); }
          th .sort { margin-left: 6px; font-size: 0.7rem; }
          tbody tr:not(.empty) { cursor: pointer; }
          tbody tr:not(.empty):hover { background: var(--tc-table-row-hover); }
          td {
            padding: 11px 14px; border-bottom: 1px solid var(--tc-table-rule);
            color: var(--tc-table-ink);
          }
          tbody tr:last-child td { border-bottom: none; }
          tr.empty td {
            text-align: center; color: var(--tc-table-soft); padding: 32px 14px;
          }
          .pager {
            display: flex; align-items: center; gap: 12px;
            margin-top: 12px; font-size: 0.85rem;
            color: var(--tc-table-soft);
          }
          .pager .count { font-variant-numeric: tabular-nums; }
          .pager .spacer { flex: 1 1 auto; }
          .pager .page { font-variant-numeric: tabular-nums; }
          .pager button {
            font: inherit; font-size: 0.85rem;
            padding: 5px 10px;
            background: var(--tc-table-surface);
            color: var(--tc-table-ink);
            border: 1px solid var(--tc-table-rule);
            border-radius: 6px; cursor: pointer;
          }
          .pager button:hover:not(:disabled) {
            border-color: var(--tc-table-accent);
            color: var(--tc-table-accent);
          }
          .pager button:disabled { opacity: 0.45; cursor: not-allowed; }
        </style>
      `;
    },
    events: {
      "input .filter": (e, ctx) => {
        ctx.setState("q", (e.target as HTMLInputElement).value);
        ctx.setState("page", 0);
      },
      "click .prev": (_e, ctx) => {
        const p = ((ctx.state as TableState).page ?? 0) - 1;
        ctx.setState("page", Math.max(0, p));
      },
      "click .next": (_e, ctx) => {
        const ts = ctx.state as TableState;
        const total = visibleRows(ctx.props, ts).length;
        const size = (ctx.props.pageSize as number) ?? 10;
        const max = Math.max(0, Math.ceil(total / size) - 1);
        const p = (ts.page ?? 0) + 1;
        ctx.setState("page", Math.min(max, p));
      },
      "click th.sortable": (e, ctx) => {
        const target = (e.target as HTMLElement).closest("th") as HTMLElement;
        if (!target) return;
        const key = target.dataset.col;
        if (!key) return;
        const cur = ctx.state as TableState;
        let dir: "asc" | "desc" | null;
        if (cur.sortKey !== key) {
          dir = "asc";
        } else {
          dir = cur.sortDir === "asc"
            ? "desc"
            : cur.sortDir === "desc"
            ? null
            : "asc";
        }
        ctx.setState("sortKey", dir ? key : null);
        ctx.setState("sortDir", dir);
        ctx.emit("tc-sort-change", { key: dir ? key : null, direction: dir });
      },
      "click tr[data-row]": (e, ctx) => {
        const tr = (e.target as HTMLElement).closest(
          "tr[data-row]",
        ) as HTMLElement | null;
        if (!tr) return;
        const idx = Number(tr.dataset.row ?? "-1");
        if (Number.isNaN(idx) || idx < 0) return;
        const visible = visibleRows(ctx.props, ctx.state as TableState);
        const row = visible[idx];
        if (row) ctx.emit("tc-row-click", { row });
      },
    },
  }),
);

function visibleRows(
  props: Readonly<Record<string, unknown>>,
  state: TableState,
): Row[] {
  const all = (props.rows as Row[] | undefined) ?? [];
  const cols = (props.columns as Column[] | undefined) ?? [];
  const q = (state.q ?? "").trim().toLowerCase();
  let out: Row[] = q.length === 0
    ? all.slice()
    : all.filter((row) =>
      cols.some((c) => String(row[c.key] ?? "").toLowerCase().includes(q))
    );

  if (state.sortKey && state.sortDir) {
    const key = state.sortKey;
    const dir = state.sortDir === "asc" ? 1 : -1;
    out = out.slice().sort((a, b) => {
      const av = a[key];
      const bv = b[key];
      if (av === bv) return 0;
      if (av === undefined || av === null) return 1;
      if (bv === undefined || bv === null) return -1;
      if (typeof av === "number" && typeof bv === "number") {
        return (av - bv) * dir;
      }
      return String(av).localeCompare(String(bv)) * dir;
    });
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
