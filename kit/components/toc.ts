/**
 * `<tc-toc>` — auto-built table of contents.
 *
 * Scans a target element for headings (default h2 + h3), renders them as
 * a nested nav, and tracks the currently-visible heading via
 * IntersectionObserver. Headings without `id` get one assigned based on
 * their text content so anchor links work.
 *
 * Props:
 *   target   string  CSS selector for the content container (default "main")
 *   levels   string  comma-separated heading tags (default "h2,h3")
 *   sticky   boolean default true — sticky positioning at top
 *   label    string  default "On this page" — label above the list
 *
 * Theme variables on :host:
 *   --tc-toc-fg, --tc-toc-fg-muted, --tc-toc-active, --tc-toc-rule,
 *   --tc-toc-label, --tc-toc-font, --tc-toc-top
 */

import { build, describe } from "@ra9/tan-compose";

const TAG = "tc-toc";

export const tagName = TAG;

interface Item {
  id: string;
  level: number;
  text: string;
}

const STATE = new WeakMap<
  HTMLElement,
  { observer?: IntersectionObserver; activeId: string }
>();

build(
  TAG,
  describe({
    props: {
      target: { type: "string", default: "main" },
      levels: { type: "string", default: "h2,h3" },
      sticky: { type: "boolean", default: true },
      label: { type: "string", default: "On this page" },
    },
    theme: {
      "tc-toc-fg": "var(--tc-color-ink, #14171f)",
      "tc-toc-fg-muted": "var(--tc-color-ink-muted, #6b7280)",
      "tc-toc-active": "var(--tc-color-accent, #a16939)",
      "tc-toc-rule": "var(--tc-color-rule, #ece5d3)",
      "tc-toc-label": "var(--tc-color-ink-soft, #4a5061)",
      "tc-toc-font":
        "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif)",
      "tc-toc-top": "80px",
    },
    styles: {
      display: "block",
    },
    template: ({ props, state }) => {
      const items = (state.items as Item[] | undefined) ?? [];
      const active = (state.activeId as string | undefined) ?? "";
      return `
        <nav
          class="toc${props.sticky ? " sticky" : ""}"
          aria-label="Table of contents"
        >
          ${props.label ? `<div class="label">${esc(props.label)}</div>` : ""}
          ${
        items.length === 0
          ? `<p class="empty">No sections yet.</p>`
          : `<ol class="list">${
            items.map((it) =>
              `<li class="lvl-${it.level}${
                it.id === active ? " active" : ""
              }"><a href="#${esc(it.id)}">${esc(it.text)}</a></li>`
            ).join("")
          }</ol>`
      }
        </nav>
        <style>
          :host { display: block; font-family: var(--tc-toc-font); }
          .toc {
            font-size: 0.9rem;
            color: var(--tc-toc-fg-muted);
            padding-left: 14px;
            border-left: 1px solid var(--tc-toc-rule);
          }
          .toc.sticky { position: sticky; top: var(--tc-toc-top); }
          .label {
            font-size: 0.74rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: var(--tc-toc-label);
            margin-bottom: 10px;
          }
          .list {
            list-style: none; padding: 0; margin: 0;
            display: flex; flex-direction: column; gap: 4px;
          }
          .list a {
            display: block;
            padding: 4px 0;
            color: var(--tc-toc-fg-muted);
            text-decoration: none;
            line-height: 1.4;
            transition: color 0.15s ease;
          }
          .list a:hover { color: var(--tc-toc-fg); }
          .list .active > a {
            color: var(--tc-toc-active);
            font-weight: 600;
          }
          .lvl-3 a { padding-left: 12px; font-size: 0.86rem; }
          .lvl-4 a { padding-left: 24px; font-size: 0.84rem; }
          .lvl-5 a, .lvl-6 a { padding-left: 36px; font-size: 0.82rem; }
          .empty { color: var(--tc-toc-fg-muted); font-size: 0.86rem; margin: 0; }
        </style>
      `;
    },
    afterMount() {
      scanAndObserve(this);
    },
    unmount() {
      const s = STATE.get(this);
      s?.observer?.disconnect();
      STATE.delete(this);
    },
  }),
);

function scanAndObserve(host: HTMLElement) {
  // Tear down a previous run if the host is being re-attached.
  const prev = STATE.get(host);
  prev?.observer?.disconnect();

  const props = host as unknown as {
    target: string;
    levels: string;
  };
  const targetSelector = props.target || "main";
  const levels = (props.levels || "h2,h3")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  const target = document.querySelector(targetSelector);
  if (!target) return;

  const headings = Array.from(target.querySelectorAll(levels.join(",")))
    .filter((h): h is HTMLElement => h instanceof HTMLElement);

  const items: Item[] = headings.map((h) => {
    if (!h.id) h.id = slugify(h.textContent ?? "");
    return {
      id: h.id,
      level: parseInt(h.tagName.slice(1), 10),
      text: (h.textContent ?? "").trim(),
    };
  });

  (host as unknown as { setState(k: string, v: unknown): void }).setState(
    "items",
    items,
  );

  if (typeof IntersectionObserver === "undefined") return;
  const observer = new IntersectionObserver(
    (entries) => {
      // Pick the topmost entry that's currently intersecting.
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      const top = visible[0];
      if (!top) return;
      const id = (top.target as HTMLElement).id;
      if (!id) return;
      (host as unknown as { setState(k: string, v: unknown): void }).setState(
        "activeId",
        id,
      );
    },
    { rootMargin: "0px 0px -70% 0px", threshold: 0 },
  );
  for (const h of headings) observer.observe(h);
  STATE.set(host, { observer, activeId: "" });
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-") || "section";
}

function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
