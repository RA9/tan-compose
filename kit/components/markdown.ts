/**
 * `<tc-markdown>` — markdown source editor with a live preview pane.
 *
 * Three modes:
 *   "source"  textarea only
 *   "preview" rendered HTML only
 *   "split"   side-by-side source + preview (default)
 *
 * A small toolbar inserts markdown syntax around the current selection
 * — Bold wraps with `**…**`, Heading prepends `## `, Link prompts for
 * a URL and wraps with `[selection](url)`. Keyboard shortcuts mirror
 * `<tc-editor>` (⌘B / ⌘I / ⌘K).
 *
 * The preview is rendered by a tiny built-in parser that handles
 * headings, paragraphs, **bold** / *italic* / `code`, [links](url),
 * lists, blockquotes, fenced ``` code blocks, and horizontal rules.
 * For richer parsing (footnotes, tables, plugins) bind your own
 * renderer via the `render` property — it receives the source and
 * returns HTML.
 *
 * Props:
 *   value         string   initial markdown
 *   placeholder   string
 *   mode          "source" | "preview" | "split" (default "split")
 *   readonly      boolean
 *   minHeight     string   default "240px"
 *   toolbar       string   default-toolbar buttons list
 *
 * Events:
 *   tc-input    detail: { markdown: string, html: string }
 *   tc-change   detail: { markdown: string, html: string }
 *
 * Theme variables:
 *   --tc-md-bg, --tc-md-fg, --tc-md-rule, --tc-md-toolbar-bg,
 *   --tc-md-preview-bg, --tc-md-mono-font, --tc-md-font, ...
 */

import { build, describe } from "@ra9/tan-compose";

const TAG = "tc-markdown";
export const tagName = TAG;

interface HostExtras {
  value: string;
  placeholder: string;
  mode: string;
  readonly: boolean;
  minHeight: string;
  toolbar: string;
  render?: (md: string) => string;
  setState?: (k: string, v: unknown) => void;
  _mdCleanup?: () => void;
}

function escHtml(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ──────────────────────────────────────────────────────────────
// Tiny markdown parser. Covers what real-world comments and notes
// need; for footnotes / tables / plugins pass `render` instead.
// ──────────────────────────────────────────────────────────────

function inline(src: string): string {
  let out = escHtml(src);
  // Code first so its content isn't reprocessed for **/*.
  out = out.replace(/`([^`]+)`/g, "<code>$1</code>");
  out = out.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/(?<!\*)\*([^*\n]+?)\*(?!\*)/g, "<em>$1</em>");
  out = out.replace(/\b_(.+?)_\b/g, "<em>$1</em>");
  out = out.replace(/~~(.+?)~~/g, "<del>$1</del>");
  // Images then links.
  out = out.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    (_m, alt, url) =>
      `<img src="${escHtml(url)}" alt="${escHtml(alt)}" loading="lazy"/>`,
  );
  out = out.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_m, label, url) =>
      `<a href="${escHtml(url)}" target="_blank" rel="noopener">${label}</a>`,
  );
  return out;
}

function renderMarkdown(src: string): string {
  const lines = src.replace(/\r\n?/g, "\n").split("\n");
  const out: string[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block.
    const fence = line.match(/^```(\S*)\s*$/);
    if (fence) {
      const lang = fence[1] ?? "";
      const buf: string[] = [];
      i++;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) {
        buf.push(lines[i]);
        i++;
      }
      if (i < lines.length) i++; // skip closing fence
      const cls = lang ? ` class="lang-${escHtml(lang)}"` : "";
      out.push(`<pre><code${cls}>${escHtml(buf.join("\n"))}</code></pre>`);
      continue;
    }

    // ATX heading.
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      const n = h[1].length;
      out.push(`<h${n}>${inline(h[2])}</h${n}>`);
      i++;
      continue;
    }

    // Horizontal rule.
    if (/^(?:-\s*){3,}$|^(?:\*\s*){3,}$|^(?:_\s*){3,}$/.test(line.trim())) {
      out.push("<hr/>");
      i++;
      continue;
    }

    // Blockquote (single or multi-line, including blank lines stop).
    if (/^>\s?/.test(line)) {
      const buf: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        buf.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      out.push(`<blockquote>${inline(buf.join(" "))}</blockquote>`);
      continue;
    }

    // List (un/ordered). Sequential lines starting with -, *, or N.
    const liMatch = line.match(/^(\s*)(?:([-*+])|(\d+)\.)\s+(.*)$/);
    if (liMatch) {
      const ordered = !!liMatch[3];
      const tag = ordered ? "ol" : "ul";
      const items: string[] = [];
      while (i < lines.length) {
        const m = lines[i].match(/^(\s*)(?:([-*+])|(\d+)\.)\s+(.*)$/);
        if (!m) break;
        const isOrdered = !!m[3];
        if (isOrdered !== ordered) break;
        items.push(`<li>${inline(m[4])}</li>`);
        i++;
      }
      out.push(`<${tag}>${items.join("")}</${tag}>`);
      continue;
    }

    // Blank line.
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Paragraph — accumulate until blank line / block element.
    const buf: string[] = [line];
    i++;
    while (i < lines.length) {
      const peek = lines[i];
      if (
        peek.trim() === "" || /^#{1,6}\s+/.test(peek) ||
        /^```/.test(peek) || /^>\s?/.test(peek) ||
        /^(\s*)(?:[-*+]|\d+\.)\s+/.test(peek) ||
        /^(?:-\s*){3,}$|^(?:\*\s*){3,}$|^(?:_\s*){3,}$/.test(peek.trim())
      ) {
        break;
      }
      buf.push(peek);
      i++;
    }
    out.push(`<p>${inline(buf.join(" "))}</p>`);
  }
  return out.join("\n");
}

// ──────────────────────────────────────────────────────────────
// Toolbar
// ──────────────────────────────────────────────────────────────

const TB_ICONS: Record<string, string> = {
  bold:
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h7a4 4 0 0 1 0 8H6z"/><path d="M6 12h8a4 4 0 0 1 0 8H6z"/></svg>`,
  italic:
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg>`,
  heading:
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6v12"/><path d="M12 6v12"/><path d="M4 12h8"/><path d="M16 18l4-12"/></svg>`,
  code:
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  link:
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
  bullet:
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1.2" fill="currentColor"/><circle cx="4" cy="12" r="1.2" fill="currentColor"/><circle cx="4" cy="18" r="1.2" fill="currentColor"/></svg>`,
  ordered:
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><path d="M4 8V4l-1 1"/><path d="M3 14h2l-2 3h2"/></svg>`,
  quote:
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h3v6H4v-3a3 3 0 0 1 3-3z"/><path d="M16 7h3v6h-6v-3a3 3 0 0 1 3-3z"/></svg>`,
  preview:
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
};

interface MdToolbarOp {
  key: string;
  label: string;
  shortcut?: string;
  apply: (
    text: string,
    selStart: number,
    selEnd: number,
  ) => { text: string; selStart: number; selEnd: number };
}

function wrapSelection(
  text: string,
  s: number,
  e: number,
  before: string,
  after: string,
  placeholder = "text",
): { text: string; selStart: number; selEnd: number } {
  const sel = text.slice(s, e) || placeholder;
  const next = text.slice(0, s) + before + sel + after + text.slice(e);
  return {
    text: next,
    selStart: s + before.length,
    selEnd: s + before.length + sel.length,
  };
}

function prefixLines(
  text: string,
  s: number,
  e: number,
  prefix: string,
): { text: string; selStart: number; selEnd: number } {
  // Expand selection to full lines.
  const lineStart = text.lastIndexOf("\n", s - 1) + 1;
  const lineEnd = (() => {
    const i = text.indexOf("\n", e);
    return i === -1 ? text.length : i;
  })();
  const slice = text.slice(lineStart, lineEnd);
  const next = slice.split("\n").map((l) => prefix + l).join("\n");
  return {
    text: text.slice(0, lineStart) + next + text.slice(lineEnd),
    selStart: lineStart,
    selEnd: lineStart + next.length,
  };
}

// Declared BEFORE build() — see kit/components/button.ts:33-38.
const MD_TOOLBAR: Record<string, MdToolbarOp> = {
  bold: {
    key: "bold",
    label: "Bold",
    shortcut: "⌘B",
    apply: (t, s, e) => wrapSelection(t, s, e, "**", "**", "bold text"),
  },
  italic: {
    key: "italic",
    label: "Italic",
    shortcut: "⌘I",
    apply: (t, s, e) => wrapSelection(t, s, e, "*", "*", "italic text"),
  },
  heading: {
    key: "heading",
    label: "Heading",
    apply: (t, s, e) => prefixLines(t, s, e, "## "),
  },
  code: {
    key: "code",
    label: "Code",
    apply: (t, s, e) => wrapSelection(t, s, e, "`", "`", "code"),
  },
  link: {
    key: "link",
    label: "Link",
    shortcut: "⌘K",
    apply: (t, s, e) => {
      const url = globalThis.prompt?.("URL")?.trim();
      if (!url) return { text: t, selStart: s, selEnd: e };
      const label = t.slice(s, e) || "link text";
      const next = t.slice(0, s) + `[${label}](${url})` + t.slice(e);
      return {
        text: next,
        selStart: s + 1,
        selEnd: s + 1 + label.length,
      };
    },
  },
  bullet: {
    key: "bullet",
    label: "Bulleted list",
    apply: (t, s, e) => prefixLines(t, s, e, "- "),
  },
  ordered: {
    key: "ordered",
    label: "Numbered list",
    apply: (t, s, e) => prefixLines(t, s, e, "1. "),
  },
  quote: {
    key: "quote",
    label: "Quote",
    apply: (t, s, e) => prefixLines(t, s, e, "> "),
  },
};

const DEFAULT_TOOLBAR =
  "bold,italic,heading,|,bullet,ordered,quote,|,link,code";

const MD_STYLE = `
  <style>
    :host {
      display: block;
      font-family: var(--tc-md-font, var(--tc-font-sans, "Inter", system-ui, sans-serif));
      color: var(--tc-md-fg, var(--tc-color-ink, #14171f));
    }
    .root {
      border: 1px solid var(--tc-md-rule, var(--tc-color-rule, #ece5d3));
      border-radius: var(--tc-md-radius, var(--tc-radius-md, 8px));
      overflow: hidden;
      background: var(--tc-md-bg, var(--tc-color-surface, #ffffff));
      display: flex;
      flex-direction: column;
    }
    .toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 2px;
      padding: 6px;
      background: var(--tc-md-toolbar-bg, var(--tc-color-bg, #faf8f3));
      border-bottom: 1px solid var(--tc-md-rule);
      align-items: center;
    }
    .toolbar.empty { display: none; }
    .tb-btn {
      width: 30px; height: 30px;
      display: inline-flex; align-items: center; justify-content: center;
      border: none; background: transparent;
      color: var(--tc-color-ink-soft, #4a5061);
      border-radius: 5px; cursor: pointer;
      transition: background 0.12s ease, color 0.12s ease;
      padding: 0;
    }
    .tb-btn svg { width: 16px; height: 16px; display: block; }
    .tb-btn:hover {
      background: rgba(20, 23, 31, 0.06);
      color: var(--tc-color-ink, #14171f);
    }
    .tb-btn:focus-visible {
      outline: 2px solid var(--tc-color-accent, #a16939);
      outline-offset: 1px;
    }
    .tb-btn.is-active {
      background: var(--tc-color-accent-soft, #efe2cf);
      color: var(--tc-color-accent-hover, #8a572d);
    }
    .tb-sep {
      width: 1px;
      align-self: stretch;
      margin: 4px 4px;
      background: var(--tc-md-rule);
    }
    .tb-mode {
      margin-left: auto;
      display: inline-flex;
      gap: 2px;
      padding: 2px;
      background: var(--tc-color-rule, #ece5d3);
      border-radius: 6px;
    }
    .tb-mode button {
      font: inherit;
      font-size: 0.75rem;
      font-weight: 500;
      padding: 3px 10px;
      border: none;
      background: transparent;
      color: var(--tc-color-ink-soft, #4a5061);
      border-radius: 4px;
      cursor: pointer;
    }
    .tb-mode button.is-active {
      background: var(--tc-md-bg, var(--tc-color-surface, #ffffff));
      color: var(--tc-color-ink, #14171f);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
    }

    .panes {
      display: grid;
      grid-template-columns: 1fr 1fr;
      min-height: var(--tc-md-min-height, 240px);
    }
    .panes.source-only { grid-template-columns: 1fr; }
    .panes.preview-only { grid-template-columns: 1fr; }
    .source, .preview {
      min-height: var(--tc-md-min-height, 240px);
      max-height: 600px;
      overflow-y: auto;
    }
    .source {
      border-right: 1px solid var(--tc-md-rule);
    }
    .panes.source-only .preview { display: none; }
    .panes.preview-only .source { display: none; }
    .panes.preview-only .preview,
    .panes.source-only .source { border-right: none; }

    textarea {
      width: 100%;
      box-sizing: border-box;
      min-height: var(--tc-md-min-height, 240px);
      padding: 14px 16px;
      border: none;
      outline: none;
      background: transparent;
      font-family: var(--tc-md-mono-font, var(--tc-font-mono, monospace));
      font-size: 0.92rem;
      line-height: 1.55;
      color: var(--tc-md-fg);
      resize: vertical;
    }
    textarea::placeholder {
      color: var(--tc-color-ink-muted, #6b7280);
    }
    .preview {
      padding: 14px 18px;
      line-height: 1.65;
      background: var(--tc-md-preview-bg, var(--tc-color-bg, #faf8f3));
    }
    .preview > * { margin-top: 0; }
    .preview > * + * { margin-top: 0.7em; }
    .preview h1 { font-size: 1.6rem; font-weight: 700; letter-spacing: -0.02em; }
    .preview h2 { font-size: 1.3rem; font-weight: 700; letter-spacing: -0.015em; }
    .preview h3 { font-size: 1.1rem; font-weight: 600; }
    .preview blockquote {
      margin: 0;
      padding-left: 14px;
      border-left: 3px solid var(--tc-color-accent, #a16939);
      color: var(--tc-color-ink-soft, #4a5061);
    }
    .preview code {
      font-family: var(--tc-md-mono-font);
      background: var(--tc-color-accent-soft, #efe2cf);
      color: var(--tc-color-accent-hover, #8a572d);
      padding: 1px 6px; border-radius: 4px;
      font-size: 0.92em;
    }
    .preview pre {
      background: #14171f; color: #f5f5f5;
      padding: 12px 14px; border-radius: 6px; overflow-x: auto;
      font-family: var(--tc-md-mono-font); font-size: 0.86rem;
      line-height: 1.5;
    }
    .preview pre code { background: none; color: inherit; padding: 0; }
    .preview a { color: var(--tc-color-accent, #a16939); }
    .preview ul, .preview ol { padding-left: 1.4em; margin: 0; }
    .preview img { max-width: 100%; height: auto; border-radius: 4px; }

    @media (max-width: 640px) {
      .panes { grid-template-columns: 1fr; }
      .source { border-right: none; border-bottom: 1px solid var(--tc-md-rule); }
    }
  </style>
`;

build(
  TAG,
  describe({
    props: {
      value: { type: "string", default: "" },
      placeholder: { type: "string", default: "Write some markdown…" },
      mode: { type: "string", default: "split" },
      readonly: { type: "boolean", default: false },
      minHeight: { type: "string", default: "240px" },
      toolbar: { type: "string", default: DEFAULT_TOOLBAR },
    },
    theme: {
      "tc-md-bg": "var(--tc-color-surface, #ffffff)",
      "tc-md-fg": "var(--tc-color-ink, #14171f)",
      "tc-md-rule": "var(--tc-color-rule, #ece5d3)",
      "tc-md-toolbar-bg": "var(--tc-color-bg, #faf8f3)",
      "tc-md-preview-bg": "var(--tc-color-bg, #faf8f3)",
      "tc-md-radius": "var(--tc-radius-md, 8px)",
      "tc-md-font":
        "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
      "tc-md-mono-font":
        "var(--tc-font-mono, 'JetBrains Mono', ui-monospace, monospace)",
    },
    styles: { display: "block" },
    refs: {
      source: "textarea",
      preview: ".preview",
    },
    template: ({ props, state }) => {
      const mode = String(state.mode ?? props.mode ?? "split");
      const value = String(props.value ?? "");
      const items = String(props.toolbar ?? DEFAULT_TOOLBAR).split(",").map((
        k,
      ) => k.trim()).filter(Boolean);

      const buttons = items.map((key) => {
        if (key === "|") {
          return `<span class="tb-sep" aria-hidden="true"></span>`;
        }
        const t = MD_TOOLBAR[key];
        if (!t || !TB_ICONS[t.key]) return "";
        const sc = t.shortcut ? ` (${escHtml(t.shortcut)})` : "";
        return `<button type="button" class="tb-btn" data-op="${
          escHtml(t.key)
        }" title="${escHtml(t.label)}${sc}" aria-label="${escHtml(t.label)}">${
          TB_ICONS[t.key]
        }</button>`;
      }).join("");

      const modeButton = (m: string, label: string) =>
        `<button type="button" data-mode="${m}" class="${
          mode === m ? "is-active" : ""
        }" aria-pressed="${mode === m ? "true" : "false"}">${label}</button>`;

      const html = renderMarkdown(value);
      const panesCls = mode === "source"
        ? "panes source-only"
        : mode === "preview"
        ? "panes preview-only"
        : "panes";
      const styleVar = `--tc-md-min-height: ${
        escHtml(props.minHeight ?? "240px")
      };`;

      return `
        <div class="root" style="${styleVar}">
          <div class="${
        items.length === 0 ? "toolbar empty" : "toolbar"
      }" role="toolbar" aria-label="Markdown formatting">
            ${buttons}
            <span class="tb-mode" role="tablist" aria-label="View mode">
              ${modeButton("source", "Source")}
              ${modeButton("split", "Split")}
              ${modeButton("preview", "Preview")}
            </span>
          </div>
          <div class="${panesCls}">
            <div class="source">
              <textarea
                placeholder="${escHtml(props.placeholder ?? "")}"
                ${props.readonly ? "readonly" : ""}
                spellcheck="true"
              >${escHtml(value)}</textarea>
            </div>
            <div class="preview">${html}</div>
          </div>
        </div>
        ${MD_STYLE}
      `;
    },
    afterMount() {
      installMarkdown(this as HTMLElement);
    },
    afterRender() {
      // Keep textarea value synced with the prop without disrupting
      // the cursor while the user types.
      const host = this as HTMLElement & HostExtras;
      const ta = host.shadowRoot?.querySelector("textarea") as
        | HTMLTextAreaElement
        | null;
      if (
        ta && document.activeElement !== host &&
        ta.value !== String(host.value ?? "")
      ) {
        ta.value = String(host.value ?? "");
      }
      installMarkdown(host);
    },
    unmount() {
      (this as HTMLElement & HostExtras)._mdCleanup?.();
    },
  }),
);

function installMarkdown(rawHost: HTMLElement): void {
  const host = rawHost as HTMLElement & HostExtras;
  host._mdCleanup?.();
  const root = host.shadowRoot;
  if (!root) return;
  const ta = root.querySelector("textarea") as HTMLTextAreaElement | null;
  const preview = root.querySelector(".preview") as HTMLElement | null;
  const toolbar = root.querySelector(".toolbar");
  const modeStrip = root.querySelector(".tb-mode");
  if (!ta || !preview) return;

  const renderFn = (host.render && typeof host.render === "function")
    ? host.render
    : renderMarkdown;

  const sync = () => {
    const md = ta.value;
    host.value = md;
    const html = renderFn(md);
    preview.innerHTML = html;
    host.dispatchEvent(
      new CustomEvent("tc-input", {
        detail: { markdown: md, html },
        bubbles: true,
        composed: true,
      }),
    );
  };

  const onInput = () => sync();
  const onBlur = () => {
    host.dispatchEvent(
      new CustomEvent("tc-change", {
        detail: { markdown: ta.value, html: renderFn(ta.value) },
        bubbles: true,
        composed: true,
      }),
    );
  };
  const onToolbarClick = (e: Event) => {
    const target = (e.target as Element | null)?.closest?.(".tb-btn") as
      | HTMLElement
      | null;
    if (!target) return;
    e.preventDefault();
    const op = target.dataset.op;
    if (!op) return;
    runOp(ta, op);
    sync();
  };
  const onModeClick = (e: Event) => {
    const target = (e.target as Element | null)?.closest?.(
      "[data-mode]",
    ) as HTMLElement | null;
    if (!target) return;
    const m = target.dataset.mode;
    if (!m) return;
    host.setState?.("mode", m);
  };
  const onKey = (e: KeyboardEvent) => {
    if (!(e.metaKey || e.ctrlKey)) return;
    const k = e.key.toLowerCase();
    if (k === "b") {
      e.preventDefault();
      runOp(ta, "bold");
      sync();
    } else if (k === "i") {
      e.preventDefault();
      runOp(ta, "italic");
      sync();
    } else if (k === "k") {
      e.preventDefault();
      runOp(ta, "link");
      sync();
    }
  };

  ta.addEventListener("input", onInput);
  ta.addEventListener("blur", onBlur);
  ta.addEventListener("keydown", onKey);
  toolbar?.addEventListener("click", onToolbarClick);
  modeStrip?.addEventListener("click", onModeClick);

  host._mdCleanup = () => {
    ta.removeEventListener("input", onInput);
    ta.removeEventListener("blur", onBlur);
    ta.removeEventListener("keydown", onKey);
    toolbar?.removeEventListener("click", onToolbarClick);
    modeStrip?.removeEventListener("click", onModeClick);
  };
}

function runOp(ta: HTMLTextAreaElement, key: string): void {
  const op = MD_TOOLBAR[key];
  if (!op) return;
  const start = ta.selectionStart ?? ta.value.length;
  const end = ta.selectionEnd ?? ta.value.length;
  const r = op.apply(ta.value, start, end);
  ta.value = r.text;
  ta.focus();
  ta.setSelectionRange(r.selStart, r.selEnd);
}

interface HostState {
  setState?: (k: string, v: unknown) => void;
}

// (HostState references silenced via `host.setState?.` chain — TS knows
// shape from the cast above.)
const _hostState: HostState | null = null;
void _hostState;
