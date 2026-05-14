/**
 * `<tc-editor>` — rich-text WYSIWYG editor built on `contenteditable`.
 *
 * The toolbar reflects the active selection's formatting and applies
 * common edits (bold, italic, headings, lists, links, code blocks,
 * undo / redo) via `document.execCommand`. Paste is sanitized to text
 * by default. Output is an HTML string accessible via the `value`
 * property and emitted on `tc-change`.
 *
 * Why contenteditable rather than ProseMirror / Lexical:
 *   - Zero extra dependency, ~10 KB minified.
 *   - The platform handles most of the heavy lifting (caret, selection,
 *     IME, undo stack).
 *   - When the document model needs to be richer than HTML allows,
 *     adopt a real framework — tc-editor isn't trying to be that.
 *
 * Props:
 *   value         string   initial HTML content
 *   placeholder   string   shown when content is empty
 *   toolbar       string   comma-separated button keys; defaults below.
 *                          Pipe (`|`) inserts a vertical separator.
 *                          Pass empty string to hide the toolbar.
 *   readonly      boolean  disables editing and dims the toolbar
 *   minHeight     string   default "180px"
 *   maxHeight     string   default "" (unbounded; surface scrolls when set)
 *   pasteAs       "text" | "html" (default "text") — sanitization mode
 *
 * Default toolbar:
 *   bold, italic, underline, strike, |, h1, h2, h3, paragraph,
 *   |, bullet, ordered, quote, code, |, link, unlink, |, undo, redo
 *
 * Slots:
 *   toolbar-extra — append your own buttons; they receive
 *                   the same chrome but you wire `click` handlers.
 *
 * Events:
 *   tc-input    detail: { html: string } — fires on every edit
 *   tc-change   detail: { html: string } — fires on blur after a change
 *
 * Theme variables:
 *   --tc-editor-bg, --tc-editor-fg, --tc-editor-rule,
 *   --tc-editor-toolbar-bg, --tc-editor-toolbar-rule,
 *   --tc-editor-toolbar-fg, --tc-editor-toolbar-active-bg,
 *   --tc-editor-toolbar-hover-bg, --tc-editor-placeholder,
 *   --tc-editor-radius, --tc-editor-font, --tc-editor-mono-font,
 *   --tc-editor-line-height
 */

import { build, describe } from "@ra9/tan-compose";

const TAG = "tc-editor";
export const tagName = TAG;

type MathRenderer = (latex: string, displayMode: boolean) => string;

interface HostExtras {
  value: string;
  placeholder: string;
  toolbar: string;
  readonly: boolean;
  minHeight: string;
  maxHeight: string;
  pasteAs: string;
  mathRenderer?: MathRenderer;
  _editorCleanup?: () => void;
  _lastEmitted?: string;
}

function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

interface ToolbarEntry {
  key: string;
  label: string;
  icon: string;
  command: string;
  value?: string;
  shortcut?: string;
  active?: () => boolean;
}

// Declared BEFORE build() — see kit/components/button.ts:33-38.
const ICON: Record<string, string> = {
  bold:
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h7a4 4 0 0 1 0 8H6z"/><path d="M6 12h8a4 4 0 0 1 0 8H6z"/></svg>`,
  italic:
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg>`,
  underline:
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3v8a6 6 0 0 0 12 0V3"/><line x1="4" y1="21" x2="20" y2="21"/></svg>`,
  strike:
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4H9a3 3 0 0 0-2.83 4"/><path d="M14 12a4 4 0 0 1 0 8H6"/><line x1="4" y1="12" x2="20" y2="12"/></svg>`,
  h1:
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6v12"/><path d="M12 6v12"/><path d="M4 12h8"/><path d="M17 18v-7l-2 2"/></svg>`,
  h2:
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6v12"/><path d="M12 6v12"/><path d="M4 12h8"/><path d="M16 18h5"/><path d="M16 15c0-2 2.5-2 2.5-2s2.5 0 2.5 2-3 4-5 5"/></svg>`,
  h3:
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6v12"/><path d="M12 6v12"/><path d="M4 12h8"/><path d="M16 11h5l-3 3a2.5 2.5 0 1 1-2 4"/></svg>`,
  paragraph:
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 4v16"/><path d="M19 4v16"/><path d="M19 4h-6a5 5 0 0 0 0 10h0"/></svg>`,
  bullet:
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1.2" fill="currentColor"/><circle cx="4" cy="12" r="1.2" fill="currentColor"/><circle cx="4" cy="18" r="1.2" fill="currentColor"/></svg>`,
  ordered:
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><path d="M4 8V4l-1 1"/><path d="M3 14h2l-2 3h2"/><path d="M3 20l1-1h1l1 1"/></svg>`,
  quote:
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21c0-7 7-12 14-12"/><path d="M7 7h3v6H4v-3a3 3 0 0 1 3-3z"/><path d="M16 7h3v6h-6v-3a3 3 0 0 1 3-3z"/></svg>`,
  code:
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  link:
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
  unlink:
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18.84 12.25l1.72-1.71a5 5 0 0 0-7.07-7.07L11.5 5"/><path d="M5.16 11.75l-1.72 1.71a5 5 0 0 0 7.07 7.07L12.5 19"/><line x1="2" y1="2" x2="22" y2="22"/></svg>`,
  undo:
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 7 3 13 9 13"/><path d="M21 17a8 8 0 0 0-15-3"/></svg>`,
  redo:
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="21 7 21 13 15 13"/><path d="M3 17a8 8 0 0 1 15-3"/></svg>`,
  math:
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h6l4 14h6"/><path d="M4 19l4-7-3-4"/></svg>`,
  codeblock:
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><polyline points="9 9 7 12 9 15"/><polyline points="15 9 17 12 15 15"/></svg>`,
};

const DEFAULT_TOOLBAR =
  "bold,italic,underline,strike,|,h1,h2,h3,paragraph,|,bullet,ordered,quote,code,codeblock,|,link,unlink,math,|,undo,redo";

const TOOLBAR_REGISTRY: Record<string, ToolbarEntry> = {
  bold: {
    key: "bold",
    label: "Bold",
    icon: ICON.bold,
    command: "bold",
    shortcut: "⌘B",
  },
  italic: {
    key: "italic",
    label: "Italic",
    icon: ICON.italic,
    command: "italic",
    shortcut: "⌘I",
  },
  underline: {
    key: "underline",
    label: "Underline",
    icon: ICON.underline,
    command: "underline",
    shortcut: "⌘U",
  },
  strike: {
    key: "strike",
    label: "Strikethrough",
    icon: ICON.strike,
    command: "strikeThrough",
  },
  h1: {
    key: "h1",
    label: "Heading 1",
    icon: ICON.h1,
    command: "formatBlock",
    value: "h1",
  },
  h2: {
    key: "h2",
    label: "Heading 2",
    icon: ICON.h2,
    command: "formatBlock",
    value: "h2",
  },
  h3: {
    key: "h3",
    label: "Heading 3",
    icon: ICON.h3,
    command: "formatBlock",
    value: "h3",
  },
  paragraph: {
    key: "paragraph",
    label: "Paragraph",
    icon: ICON.paragraph,
    command: "formatBlock",
    value: "p",
  },
  bullet: {
    key: "bullet",
    label: "Bulleted list",
    icon: ICON.bullet,
    command: "insertUnorderedList",
  },
  ordered: {
    key: "ordered",
    label: "Ordered list",
    icon: ICON.ordered,
    command: "insertOrderedList",
  },
  quote: {
    key: "quote",
    label: "Blockquote",
    icon: ICON.quote,
    command: "formatBlock",
    value: "blockquote",
  },
  code: {
    key: "code",
    label: "Inline code",
    icon: ICON.code,
    command: "code",
  },
  link: {
    key: "link",
    label: "Insert link",
    icon: ICON.link,
    command: "link",
    shortcut: "⌘K",
  },
  unlink: {
    key: "unlink",
    label: "Remove link",
    icon: ICON.unlink,
    command: "unlink",
  },
  undo: {
    key: "undo",
    label: "Undo",
    icon: ICON.undo,
    command: "undo",
    shortcut: "⌘Z",
  },
  redo: {
    key: "redo",
    label: "Redo",
    icon: ICON.redo,
    command: "redo",
    shortcut: "⌘⇧Z",
  },
  math: {
    key: "math",
    label: "Insert math (LaTeX)",
    icon: ICON.math,
    command: "math",
  },
  codeblock: {
    key: "codeblock",
    label: "Code block",
    icon: ICON.codeblock,
    command: "codeblock",
  },
};

const STYLE = `
  <style>
    :host {
      display: block;
      font-family: var(--tc-editor-font, var(--tc-font-sans, "Inter", system-ui, sans-serif));
      color: var(--tc-editor-fg, var(--tc-color-ink, #14171f));
    }
    .root {
      border: 1px solid var(--tc-editor-rule, var(--tc-color-rule, #ece5d3));
      border-radius: var(--tc-editor-radius, var(--tc-radius-md, 8px));
      background: var(--tc-editor-bg, var(--tc-color-surface, #ffffff));
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 2px;
      padding: 6px;
      background: var(--tc-editor-toolbar-bg, var(--tc-color-bg, #faf8f3));
      border-bottom: 1px solid var(--tc-editor-toolbar-rule, var(--tc-color-rule, #ece5d3));
      align-items: center;
    }
    .toolbar.readonly { opacity: 0.55; pointer-events: none; }
    .toolbar.empty { display: none; }
    .tb-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      padding: 0;
      border: none;
      background: transparent;
      color: var(--tc-editor-toolbar-fg, var(--tc-color-ink-soft, #4a5061));
      border-radius: 5px;
      cursor: pointer;
      transition: background 0.12s ease, color 0.12s ease;
    }
    .tb-btn svg { width: 16px; height: 16px; display: block; }
    .tb-btn:hover {
      background: var(--tc-editor-toolbar-hover-bg, rgba(20, 23, 31, 0.06));
      color: var(--tc-color-ink, #14171f);
    }
    .tb-btn:focus-visible {
      outline: 2px solid var(--tc-color-accent, #a16939);
      outline-offset: 1px;
    }
    .tb-btn.is-active {
      background: var(--tc-editor-toolbar-active-bg, var(--tc-color-accent-soft, #efe2cf));
      color: var(--tc-color-accent-hover, #8a572d);
    }
    .tb-sep {
      width: 1px;
      align-self: stretch;
      margin: 4px 4px;
      background: var(--tc-editor-toolbar-rule, var(--tc-color-rule, #ece5d3));
    }
    .surface {
      padding: 14px 18px;
      min-height: var(--tc-editor-min-height, 180px);
      max-height: var(--tc-editor-max-height, none);
      overflow-y: auto;
      outline: none;
      line-height: var(--tc-editor-line-height, 1.6);
      cursor: text;
    }
    .surface[data-empty="true"]::before {
      content: attr(data-placeholder);
      color: var(--tc-editor-placeholder, var(--tc-color-ink-muted, #6b7280));
      pointer-events: none;
      display: block;
    }
    .surface > * { margin-top: 0; }
    .surface > * + * { margin-top: 0.6em; }
    .surface h1 { font-size: 1.6rem; font-weight: 700; letter-spacing: -0.02em; line-height: 1.25; }
    .surface h2 { font-size: 1.3rem; font-weight: 700; letter-spacing: -0.015em; line-height: 1.3; }
    .surface h3 { font-size: 1.1rem; font-weight: 600; line-height: 1.35; }
    .surface blockquote {
      margin: 0;
      padding-left: 14px;
      border-left: 3px solid var(--tc-color-accent, #a16939);
      color: var(--tc-color-ink-soft, #4a5061);
    }
    .surface code, .surface .tc-code-inline {
      font-family: var(--tc-editor-mono-font, var(--tc-font-mono, "JetBrains Mono", monospace));
      background: var(--tc-color-accent-soft, #efe2cf);
      color: var(--tc-color-accent-hover, #8a572d);
      padding: 1px 6px;
      border-radius: 4px;
      font-size: 0.92em;
    }
    .surface pre {
      background: #14171f;
      color: #f5f5f5;
      padding: 12px 14px;
      border-radius: 6px;
      overflow-x: auto;
      font-family: var(--tc-editor-mono-font, var(--tc-font-mono, monospace));
      font-size: 0.86rem;
      line-height: 1.5;
    }
    .surface a { color: var(--tc-color-accent, #a16939); text-decoration: underline; }
    .surface ul, .surface ol { padding-left: 1.4em; margin: 0; }
    .surface li + li { margin-top: 0.3em; }

    /* Math nodes are atomic — contenteditable="false" so the caret
       steps over them; the visual style differentiates rendered vs
       fallback (missing renderer) so the integration gap is obvious. */
    .surface .tc-math {
      display: inline-block;
      padding: 0 2px;
    }
    .surface .tc-math.display {
      display: block;
      margin: 8px 0;
      text-align: center;
    }
    .surface .tc-math:hover {
      outline: 1px dashed var(--tc-color-accent, #a16939);
      outline-offset: 2px;
      border-radius: 2px;
    }
    .surface .tc-math .tc-math-src {
      background: var(--tc-color-accent-soft, #efe2cf);
      color: var(--tc-color-accent-hover, #8a572d);
      padding: 1px 6px;
      border-radius: 4px;
      font-family: var(--tc-editor-mono-font);
      font-size: 0.92em;
    }
    .surface .tc-math.display .tc-math-src {
      display: block;
      padding: 6px 10px;
    }

    ::slotted([slot="toolbar-extra"]) { display: contents; }
  </style>
`;

build(
  TAG,
  describe({
    props: {
      value: { type: "string", default: "" },
      placeholder: { type: "string", default: "Start writing…" },
      toolbar: { type: "string", default: DEFAULT_TOOLBAR },
      readonly: { type: "boolean", default: false, reflect: true },
      minHeight: { type: "string", default: "180px" },
      maxHeight: { type: "string", default: "" },
      pasteAs: { type: "string", default: "text" },
    },
    theme: {
      "tc-editor-bg": "var(--tc-color-surface, #ffffff)",
      "tc-editor-fg": "var(--tc-color-ink, #14171f)",
      "tc-editor-rule": "var(--tc-color-rule, #ece5d3)",
      "tc-editor-toolbar-bg": "var(--tc-color-bg, #faf8f3)",
      "tc-editor-toolbar-rule": "var(--tc-color-rule, #ece5d3)",
      "tc-editor-toolbar-fg": "var(--tc-color-ink-soft, #4a5061)",
      "tc-editor-toolbar-active-bg": "var(--tc-color-accent-soft, #efe2cf)",
      "tc-editor-toolbar-hover-bg": "rgba(20, 23, 31, 0.06)",
      "tc-editor-placeholder": "var(--tc-color-ink-muted, #6b7280)",
      "tc-editor-radius": "var(--tc-radius-md, 8px)",
      "tc-editor-font":
        "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
      "tc-editor-mono-font":
        "var(--tc-font-mono, 'JetBrains Mono', ui-monospace, 'SF Mono', monospace)",
      "tc-editor-line-height": "1.6",
    },
    styles: { display: "block" },
    template: ({ props }) => {
      const toolbar = String(props.toolbar ?? DEFAULT_TOOLBAR);
      const readonly = !!props.readonly;
      const minHeight = esc(String(props.minHeight ?? "180px"));
      const maxHeight = String(props.maxHeight ?? "").trim();
      const items = toolbar.split(",").map((k) => k.trim()).filter(Boolean);

      const buttons = items.map((key) => {
        if (key === "|") {
          return `<span class="tb-sep" aria-hidden="true"></span>`;
        }
        const t = TOOLBAR_REGISTRY[key];
        if (!t) return "";
        const sc = t.shortcut ? ` (${esc(t.shortcut)})` : "";
        return `<button type="button" class="tb-btn" data-cmd="${
          esc(t.command)
        }"${t.value ? ` data-val="${esc(t.value)}"` : ""} data-key="${
          esc(t.key)
        }" title="${esc(t.label)}${sc}" aria-label="${
          esc(t.label)
        }">${t.icon}</button>`;
      }).join("");

      const toolbarCls = items.length === 0
        ? "toolbar empty"
        : readonly
        ? "toolbar readonly"
        : "toolbar";
      const styleVars = `--tc-editor-min-height: ${minHeight};${
        maxHeight ? `--tc-editor-max-height: ${esc(maxHeight)};` : ""
      }`;

      return `
        <div class="root" style="${styleVars}">
          <div class="${toolbarCls}" role="toolbar" aria-label="Formatting">
            ${buttons}
            <slot name="toolbar-extra"></slot>
          </div>
          <div
            class="surface"
            contenteditable="${readonly ? "false" : "true"}"
            data-placeholder="${esc(props.placeholder ?? "")}"
            role="textbox"
            aria-multiline="true"
            spellcheck="true"
          ></div>
        </div>
        ${STYLE}
      `;
    },
    afterMount() {
      installEditor(this as HTMLElement);
      renderMathInSurface(this as HTMLElement & HostExtras);
    },
    afterRender() {
      const host = this as HTMLElement & HostExtras;
      // Keep the surface in sync with the value prop without nuking the
      // user's caret on every keystroke.
      const root = host.shadowRoot;
      const surface = root?.querySelector(".surface") as HTMLElement | null;
      if (surface) {
        const current = surface.innerHTML;
        const incoming = String(host.value ?? "");
        if (
          incoming && current !== incoming && document.activeElement !== host
        ) {
          surface.innerHTML = incoming;
        }
        updateEmptyState(surface);
      }
      installEditor(host);
      renderMathInSurface(host);
    },
    unmount() {
      const host = this as HTMLElement & HostExtras;
      host._editorCleanup?.();
    },
  }),
);

function updateEmptyState(surface: HTMLElement): void {
  const isEmpty = surface.textContent?.trim() === "" &&
    surface.querySelector("img, hr, br") === null;
  surface.dataset.empty = isEmpty ? "true" : "false";
}

function installEditor(rawHost: HTMLElement): void {
  const host = rawHost as HTMLElement & HostExtras;
  host._editorCleanup?.();

  const root = host.shadowRoot;
  if (!root) return;
  const surface = root.querySelector(".surface") as HTMLElement | null;
  if (!surface) return;

  // Initial content load (only once — afterRender handles drift after).
  if (!surface.dataset.bootstrapped) {
    if (host.value) surface.innerHTML = String(host.value);
    surface.dataset.bootstrapped = "1";
  }
  updateEmptyState(surface);

  const runCommand = (cmd: string, value?: string) => {
    if (host.readonly) return;
    surface.focus();
    if (cmd === "code") {
      // execCommand has no "code" — wrap selection in <code>.
      const shadowRoot = root as ShadowRoot & {
        getSelection?: () => Selection | null;
      };
      const sel = shadowRoot.getSelection?.() ?? globalThis.getSelection();
      if (!sel || sel.rangeCount === 0) return;
      const range = sel.getRangeAt(0);
      const content = range.extractContents();
      const codeEl = document.createElement("code");
      codeEl.className = "tc-code-inline";
      codeEl.appendChild(content);
      range.insertNode(codeEl);
      range.selectNodeContents(codeEl);
      sel.removeAllRanges();
      sel.addRange(range);
    } else if (cmd === "link") {
      const url = globalThis.prompt("URL")?.trim();
      if (!url) return;
      document.execCommand("createLink", false, url);
    } else if (cmd === "math") {
      const latex = globalThis.prompt(
        "LaTeX (e.g. E = mc^2). Wrap with $$ for display.",
      )?.trim();
      if (!latex) return;
      const isDisplay = latex.startsWith("$$") && latex.endsWith("$$");
      const clean = isDisplay
        ? latex.replace(/^\$\$|\$\$$/g, "").trim()
        : latex;
      insertMath(host, clean, isDisplay);
    } else if (cmd === "codeblock") {
      // Wrap selection (or insert a stub) in <pre><code>.
      const sel = (root as ShadowRoot & {
        getSelection?: () => Selection | null;
      }).getSelection?.() ?? globalThis.getSelection();
      if (!sel || sel.rangeCount === 0) return;
      const range = sel.getRangeAt(0);
      const text = range.toString() || "// code";
      const pre = document.createElement("pre");
      const code = document.createElement("code");
      code.textContent = text;
      pre.appendChild(code);
      range.deleteContents();
      range.insertNode(pre);
      // Move caret to end of code element.
      const newRange = document.createRange();
      newRange.selectNodeContents(code);
      newRange.collapse(false);
      sel.removeAllRanges();
      sel.addRange(newRange);
    } else if (cmd === "formatBlock") {
      // Some browsers require the angle-bracketed form.
      document.execCommand("formatBlock", false, `<${value ?? "p"}>`);
    } else {
      document.execCommand(cmd, false, value);
    }
    emitInput(host, surface);
    updateActive(root, surface);
  };

  const onToolbarClick = (e: Event) => {
    const target = (e.target as Element | null)?.closest?.(".tb-btn") as
      | HTMLElement
      | null;
    if (!target) return;
    e.preventDefault();
    const cmd = target.dataset.cmd;
    if (!cmd) return;
    runCommand(cmd, target.dataset.val);
  };
  const onInput = () => {
    updateEmptyState(surface);
    emitInput(host, surface);
  };
  const onBlur = () => {
    const html = surface.innerHTML;
    if (host._lastEmitted !== html) {
      host._lastEmitted = html;
      host.dispatchEvent(
        new CustomEvent("tc-change", {
          detail: { html },
          bubbles: true,
          composed: true,
        }),
      );
    }
  };
  const onPaste = (e: ClipboardEvent) => {
    if (host.readonly) return;
    if (host.pasteAs !== "text") return;
    e.preventDefault();
    const text = e.clipboardData?.getData("text/plain") ?? "";
    document.execCommand("insertText", false, text);
  };
  const onKeyDown = (e: KeyboardEvent) => {
    if (host.readonly) return;
    if (!(e.metaKey || e.ctrlKey)) return;
    const k = e.key.toLowerCase();
    if (k === "b") {
      e.preventDefault();
      runCommand("bold");
    } else if (k === "i") {
      e.preventDefault();
      runCommand("italic");
    } else if (k === "u") {
      e.preventDefault();
      runCommand("underline");
    } else if (k === "k") {
      e.preventDefault();
      runCommand("link");
    }
  };
  const onSelectionChange = () => {
    // Only react when the selection is inside our surface.
    const sel = globalThis.getSelection();
    if (!sel || !sel.anchorNode) return;
    if (!surface.contains(sel.anchorNode)) return;
    updateActive(root, surface);
  };

  const toolbar = root.querySelector(".toolbar");
  toolbar?.addEventListener("click", onToolbarClick);
  surface.addEventListener("input", onInput);
  surface.addEventListener("blur", onBlur);
  surface.addEventListener("paste", onPaste);
  surface.addEventListener("keydown", onKeyDown);
  document.addEventListener("selectionchange", onSelectionChange);

  host._editorCleanup = () => {
    toolbar?.removeEventListener("click", onToolbarClick);
    surface.removeEventListener("input", onInput);
    surface.removeEventListener("blur", onBlur);
    surface.removeEventListener("paste", onPaste);
    surface.removeEventListener("keydown", onKeyDown);
    document.removeEventListener("selectionchange", onSelectionChange);
  };
}

function emitInput(
  host: HTMLElement & HostExtras,
  surface: HTMLElement,
): void {
  const html = surface.innerHTML;
  host.value = html;
  host.dispatchEvent(
    new CustomEvent("tc-input", {
      detail: { html },
      bubbles: true,
      composed: true,
    }),
  );
}

/**
 * Insert an atomic math element into the editor. The wrapper is
 * `contenteditable="false"` so the cursor treats it as a single
 * unit — backspace removes the whole thing, arrow keys step over
 * it. The source LaTeX lives on `data-latex` for round-tripping.
 */
function insertMath(
  host: HTMLElement & HostExtras,
  latex: string,
  display: boolean,
): void {
  const root = host.shadowRoot;
  if (!root) return;
  const surface = root.querySelector(".surface") as HTMLElement | null;
  if (!surface) return;
  const sel = (root as ShadowRoot & {
    getSelection?: () => Selection | null;
  }).getSelection?.() ?? globalThis.getSelection();
  if (!sel || sel.rangeCount === 0) return;
  const range = sel.getRangeAt(0);
  const wrap = document.createElement(display ? "div" : "span");
  wrap.className = display ? "tc-math display" : "tc-math inline";
  wrap.setAttribute("contenteditable", "false");
  wrap.dataset.latex = latex;
  // Initial fallback rendering — replaced by renderMathInSurface
  // once the host's mathRenderer is consulted.
  wrap.innerHTML = renderMathHtml(host, latex, display);
  range.deleteContents();
  range.insertNode(wrap);
  // Drop a zero-width space after so caret lands outside the wrap.
  const spacer = document.createTextNode("​");
  wrap.parentNode?.insertBefore(spacer, wrap.nextSibling);
  const after = document.createRange();
  after.setStartAfter(spacer);
  after.collapse(true);
  sel.removeAllRanges();
  sel.addRange(after);
  host.dispatchEvent(
    new CustomEvent("tc-input", {
      detail: { html: surface.innerHTML },
      bubbles: true,
      composed: true,
    }),
  );
}

function renderMathHtml(
  host: HTMLElement & HostExtras,
  latex: string,
  display: boolean,
): string {
  if (host.mathRenderer) {
    try {
      return host.mathRenderer(latex, display);
    } catch {
      // fall through to source-text fallback
    }
  }
  // Fallback so the missing-renderer state is obvious.
  return `<code class="tc-math-src">${
    latex.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  }</code>`;
}

/**
 * Walk the surface for math elements and (re-)render any whose
 * `data-latex` doesn't match what's currently displayed. Called from
 * afterRender so toggling `host.mathRenderer` reflows existing math
 * without losing edits in the rest of the document.
 */
function renderMathInSurface(host: HTMLElement & HostExtras): void {
  const root = host.shadowRoot;
  if (!root) return;
  const surface = root.querySelector(".surface");
  if (!surface) return;
  const nodes = surface.querySelectorAll(".tc-math");
  nodes.forEach((n) => {
    const el = n as HTMLElement;
    const latex = el.dataset.latex ?? "";
    const display = el.classList.contains("display");
    const stamp = `${display ? "d" : "i"}:${latex}`;
    if (el.dataset.stamp === stamp) return;
    el.innerHTML = renderMathHtml(host, latex, display);
    el.dataset.stamp = stamp;
  });
}

function updateActive(root: ShadowRoot, _surface: HTMLElement): void {
  const buttons = root.querySelectorAll(".tb-btn");
  buttons.forEach((btn) => {
    const el = btn as HTMLElement;
    const cmd = el.dataset.cmd ?? "";
    const val = el.dataset.val;
    let active = false;
    try {
      if (cmd === "formatBlock" && val) {
        const block = document.queryCommandValue("formatBlock") || "";
        active = block.toLowerCase().replace(/^[<]|[>]$/g, "") === val;
      } else if (
        cmd === "bold" || cmd === "italic" || cmd === "underline" ||
        cmd === "strikeThrough" || cmd === "insertOrderedList" ||
        cmd === "insertUnorderedList"
      ) {
        active = document.queryCommandState(cmd);
      }
    } catch {
      active = false;
    }
    el.classList.toggle("is-active", active);
  });
}
