---
tag: tc-editor
slug: editor
category: form fields
summary: Rich-text WYSIWYG editor on contenteditable. Configurable toolbar, active-state buttons, keyboard shortcuts, sanitised paste, slot for custom buttons.
description: tc-editor documentation — toolbar config, paste mode, custom buttons via slot, theming.
importPath: "@ra9/tan-compose-kit/editor"

props:
  - name: value
    type: string
    default: '""'
    description: Initial HTML content. Read back via the same property, or via the `tc-change` event detail.
  - name: placeholder
    type: string
    default: '"Start writing…"'
    description: Shown when the editor is empty.
  - name: toolbar
    type: string
    default: '"bold,italic,…,undo,redo"'
    description: Comma-separated button keys. Pipe (`|`) inserts a separator. Pass an empty string to hide the toolbar entirely.
  - name: readonly
    type: boolean
    default: "false"
    description: Disables editing and dims the toolbar. Reflects.
  - name: minHeight
    type: string
    default: '"180px"'
    description: Minimum editor surface height.
  - name: maxHeight
    type: string
    default: '""'
    description: When set, the surface scrolls vertically past this height.
  - name: pasteAs
    type: '"text" | "html"'
    default: '"text"'
    description: '`text` strips formatting on paste (the safe default). `html` keeps whatever the browser hands you.'

events:
  - name: tc-input
    detail: '{ html: string }'
    description: Fires on every keystroke / formatting change.
  - name: tc-change
    detail: '{ html: string }'
    description: Fires on blur when the content has changed since the last fire.

slots:
  - name: toolbar-extra
    description: Append your own buttons to the toolbar. Use the same class names (`tb-btn`) for visual consistency and wire `click` handlers yourself.

cssVars:
  - name: "--tc-editor-bg"
    default: "var(--tc-color-surface)"
    description: Surface background.
  - name: "--tc-editor-fg"
    default: "var(--tc-color-ink)"
    description: Text color.
  - name: "--tc-editor-rule"
    default: "var(--tc-color-rule)"
    description: Outer border + toolbar separator color.
  - name: "--tc-editor-toolbar-bg"
    default: "var(--tc-color-bg)"
    description: Toolbar background.
  - name: "--tc-editor-toolbar-active-bg"
    default: "var(--tc-color-accent-soft)"
    description: Pill background for active formatting buttons.
  - name: "--tc-editor-toolbar-hover-bg"
    default: "rgba(20, 23, 31, 0.06)"
    description: Toolbar button hover.

related:
  - markdown
  - textarea
  - input
---

### Default

<div class="stage" style="flex-direction: column; align-items: stretch;">
  <tc-editor placeholder="Write something…"></tc-editor>
</div>

```html
<tc-editor placeholder="Write something…"></tc-editor>
```

The editor renders a toolbar above a `contenteditable` surface. Selection state is reflected in the toolbar's "active" pill — try bolding a word, then moving the cursor inside and outside it.

### Pre-filled content

<div class="stage" style="flex-direction: column; align-items: stretch;">
  <tc-editor>
  </tc-editor>
  <script>
    document.currentScript.previousElementSibling.value =
      '<h2>Daily note</h2><p>Met with <strong>Mia</strong> about the launch checklist. Open items:</p><ul><li>Set up <em>read replicas</em></li><li>Audit <code>auth_users</code> table</li><li>Ship the rollout doc</li></ul>';
  </script>
</div>

```html
<tc-editor id="note"></tc-editor>

<script>
  document.getElementById("note").value =
    "<h2>Daily note</h2><p>Met with <strong>Mia</strong>…</p>";
</script>
```

### Trimmed toolbar

Pass a `toolbar` string of just the buttons you want. `|` inserts a separator.

<div class="stage" style="flex-direction: column; align-items: stretch;">
  <tc-editor
    toolbar="bold,italic,|,link"
    placeholder="Minimal: bold, italic, link only"
  ></tc-editor>
</div>

```html
<tc-editor toolbar="bold,italic,|,link"></tc-editor>
```

Available button keys: `bold`, `italic`, `underline`, `strike`, `h1`, `h2`, `h3`, `paragraph`, `bullet`, `ordered`, `quote`, `code`, `link`, `unlink`, `undo`, `redo`.

### Custom toolbar buttons

Slot extra buttons next to the defaults — give them the `tb-btn` class to match the chrome, wire their `click` yourself.

```html
<tc-editor id="ed">
  <button slot="toolbar-extra" class="tb-btn" title="Save"
    onclick="save(document.getElementById('ed').value)">
    💾
  </button>
</tc-editor>
```

### Read-only

<div class="stage" style="flex-direction: column; align-items: stretch;">
  <tc-editor readonly></tc-editor>
  <script>
    document.currentScript.previousElementSibling.value =
      '<p>This editor is locked. Toolbar is dimmed; the surface ignores edits.</p>';
  </script>
</div>

```html
<tc-editor readonly value="<p>Locked content.</p>"></tc-editor>
```

### Listening for change

```html
<tc-editor id="post"></tc-editor>

<script>
  const ed = document.getElementById("post");
  ed.addEventListener("tc-input", (e) => { /* every keystroke */ });
  ed.addEventListener("tc-change", (e) => {
    // saved on blur once content actually changed
    fetch("/api/draft", { method: "POST", body: e.detail.html });
  });
</script>
```

### Accessibility

- Surface is `role="textbox"` `aria-multiline="true"` `spellcheck="true"`.
- Toolbar buttons carry full text labels and shortcut hints in `title`/`aria-label`.
- Keyboard shortcuts: `⌘B` / `Ctrl+B` for bold, `⌘I` / `Ctrl+I` for italic, `⌘U` / `Ctrl+U` for underline, `⌘K` / `Ctrl+K` for link.
- The undo / redo buttons feed `document.execCommand("undo"|"redo")`, which is the platform undo stack — same as native textareas. `⌘Z` / `⌘⇧Z` works out of the box.

### Limits, by design

- Paste defaults to plain text (`pasteAs="text"`). Set `pasteAs="html"` if you trust the source.
- The editor outputs vanilla HTML — `<strong>`, `<em>`, `<h2>`, `<ul>`, `<a>`, `<code>` etc. There's no custom document model. If you need ProseMirror-grade plugin support (tables, footnotes, collaborative cursors), reach for a real framework; tc-editor isn't trying to be that.
- No image upload UX yet — embed via HTML directly or via a custom toolbar button.

### Theming

```html
<tc-editor
  style="
    --tc-editor-bg: #0b0c10;
    --tc-editor-fg: #f3f3f3;
    --tc-editor-rule: #1c1f26;
    --tc-editor-toolbar-bg: #14171f;
    --tc-editor-toolbar-fg: #b8b8b8;
    --tc-editor-toolbar-active-bg: #2a2f3a;
    --tc-editor-placeholder: #5a6072;
  "
  placeholder="Dark editor…"
></tc-editor>
```
