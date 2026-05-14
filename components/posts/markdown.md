---
tag: tc-markdown
slug: markdown
category: form fields
summary: Markdown source editor with live preview pane. Source / split / preview modes, syntax-inserting toolbar, pluggable parser via the `render` property.
description: tc-markdown documentation — modes, toolbar, custom parser, theming.
importPath: "@ra9/tan-compose-kit/markdown"

props:
  - name: value
    type: string
    default: '""'
    description: Initial markdown content.
  - name: placeholder
    type: string
    default: '"Write some markdown…"'
    description: Shown when the source pane is empty.
  - name: mode
    type: '"source" | "split" | "preview"'
    default: '"split"'
    description: Which panes are visible. The toolbar exposes this as a three-button strip.
  - name: readonly
    type: boolean
    default: "false"
    description: Disables editing.
  - name: minHeight
    type: string
    default: '"240px"'
    description: Minimum height of the editor body.
  - name: toolbar
    type: string
    default: '"bold,italic,heading,|,bullet,ordered,quote,|,link,code"'
    description: Comma-separated toolbar keys. `|` inserts a separator. Empty string hides the toolbar.

events:
  - name: tc-input
    detail: '{ markdown: string, html: string }'
    description: Fires on every keystroke.
  - name: tc-change
    detail: '{ markdown: string, html: string }'
    description: Fires on blur once content has changed.

slots: []

cssVars:
  - name: "--tc-md-bg"
    default: "var(--tc-color-surface)"
    description: Editor surface.
  - name: "--tc-md-preview-bg"
    default: "var(--tc-color-bg)"
    description: Preview pane background.
  - name: "--tc-md-rule"
    default: "var(--tc-color-rule)"
    description: Outer border + pane divider.
  - name: "--tc-md-toolbar-bg"
    default: "var(--tc-color-bg)"
    description: Toolbar background.
  - name: "--tc-md-mono-font"
    default: "var(--tc-font-mono)"
    description: Source-pane font.

related:
  - editor
  - code
  - textarea
---

### Default — split view

<div class="stage" style="flex-direction: column; align-items: stretch;">
  <tc-markdown id="md-default"></tc-markdown>
  <script>
    document.getElementById("md-default").value = [
      "# Hello",
      "",
      "A **tc-markdown** editor with a live preview. Try the toolbar.",
      "",
      "- Bulleted",
      "- *Italic*, `code`, [a link](https://ra9.github.io/tan-compose/)",
      "",
      "> Blockquotes for context.",
      "",
      "```ts",
      "import \"@ra9/tan-compose-kit/markdown\";",
      "```"
    ].join("\n");
  </script>
</div>

```html
<tc-markdown></tc-markdown>
```

### Source only / preview only

The toolbar strip on the right toggles between modes. You can also drive it programmatically.

<div class="stage" style="flex-direction: column; align-items: stretch;">
  <tc-markdown id="md-modes" mode="preview"></tc-markdown>
  <script>
    document.getElementById("md-modes").value =
      "Use `mode=\"preview\"` for read-only render. The toolbar still lets you flip back to source.\n\n* * *\n\nUseful for **comments**, blog drafts, and any spot where the *output* matters more than the editor itself.";
  </script>
</div>

```html
<tc-markdown mode="preview"></tc-markdown>
<tc-markdown mode="source"></tc-markdown>
<tc-markdown mode="split"></tc-markdown>  <!-- default -->
```

### Listening for change

```html
<tc-markdown id="post"></tc-markdown>

<script>
  document.getElementById("post").addEventListener("tc-input", (e) => {
    // Live as the user types.
    document.getElementById("counter").textContent =
      `${e.detail.markdown.length} chars`;
  });
  document.getElementById("post").addEventListener("tc-change", (e) => {
    // Once they blur, persist.
    save(e.detail.markdown);
  });
</script>
```

### Bring your own parser

Set the `render` property to a function that turns markdown into HTML. Useful when you need footnotes, tables, math, syntax highlighting, or plugins from a library like `marked` / `markdown-it`.

```html
<tc-markdown id="rich"></tc-markdown>

<script type="module">
  import { marked } from "https://esm.sh/marked@12";
  document.getElementById("rich").render = (md) => marked.parse(md, {
    gfm: true,
    breaks: true,
  });
</script>
```

The built-in parser handles:

- ATX headings (`# … ######`)
- Paragraphs
- Bullet, numbered, and nested-ish lists (one-level depth)
- Blockquotes
- Fenced code blocks (\`\`\`lang\`\`\`)
- Horizontal rules (`---`, `***`, `___`)
- Inline `**bold**`, `*italic*`, `_italic_`, `` `code` ``, `~~strike~~`
- `[links](url)` and `![images](url)`

For everything else — footnotes, definition lists, tables, math, custom containers — pass `render`.

### Keyboard shortcuts

- `⌘B` / `Ctrl+B` — wrap selection in `**…**`
- `⌘I` / `Ctrl+I` — wrap selection in `*…*`
- `⌘K` / `Ctrl+K` — prompt for URL and produce `[…](url)`

### Read-only

```html
<tc-markdown readonly mode="preview" value="### Snapshot view"></tc-markdown>
```

### Theming

```html
<tc-markdown
  style="
    --tc-md-bg: #0b0c10;
    --tc-md-preview-bg: #0f1117;
    --tc-md-fg: #f3f3f3;
    --tc-md-rule: #1c1f26;
    --tc-md-toolbar-bg: #14171f;
  "
></tc-markdown>
```

### Accessibility

- The source pane is a real `<textarea>` — keyboard, IME, screen readers, and browser spell-check all work.
- The preview pane is rendered HTML; structural tags (`<h2>`, `<ul>`, `<blockquote>`) preserve semantics.
- Toolbar buttons carry full text labels + shortcut hints. The view-mode strip uses `role="tablist"` and `aria-pressed` toggles.
- At viewport widths ≤ 640 px the split layout collapses to stacked panes automatically.
