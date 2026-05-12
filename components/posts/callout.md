---
tag: tc-callout
slug: callout
category: docs / content
summary: Admonition box with five variants — note, info, success, warning, danger. Built-in icon and optional title.
description: tc-callout documentation — variants, title, compact, theming, and accessibility.
importPath: "@ra9/tan-compose-kit/callout"

props:
  - name: variant
    type: '"note" | "info" | "warning" | "danger" | "success"'
    default: '"note"'
    description: Visual style and icon. `danger` also gets `role="alert"`.
  - name: title
    type: string
    default: '""'
    description: Optional bolded heading line above the body.
  - name: compact
    type: boolean
    default: "false"
    description: Tighter padding for inline / dense use.

events: []

slots:
  - name: (default)
    description: Body content. Paragraphs, links, lists — anything inline-block.

cssVars:
  - name: "--tc-callout-radius"
    default: "var(--tc-radius-md, 8px)"
    description: Corner radius.
  - name: "--tc-callout-font"
    default: "var(--tc-font-sans, …)"
    description: Font family.
  - name: "--tc-callout-note-bg"
    default: "var(--tc-color-surface-alt, #faf8f3)"
    description: Note background.
  - name: "--tc-callout-note-fg"
    default: "var(--tc-color-ink-soft, #4a5061)"
    description: Note foreground.
  - name: "--tc-callout-note-border"
    default: "var(--tc-color-rule-strong, #d9cfb8)"
    description: Note left border + icon color.
  - name: "--tc-callout-info-bg"
    default: "var(--tc-color-info-bg, #dde6f4)"
    description: Info background.
  - name: "--tc-callout-info-fg"
    default: "var(--tc-color-info-fg, #1f3a66)"
    description: Info foreground.
  - name: "--tc-callout-success-bg"
    default: "var(--tc-color-success-bg, #dbece2)"
    description: Success background.
  - name: "--tc-callout-success-fg"
    default: "var(--tc-color-success-fg, #155b40)"
    description: Success foreground.
  - name: "--tc-callout-warning-bg"
    default: "var(--tc-color-warning-bg, #f5e7cf)"
    description: Warning background.
  - name: "--tc-callout-warning-fg"
    default: "var(--tc-color-warning-fg, #7a4f0a)"
    description: Warning foreground.
  - name: "--tc-callout-danger-bg"
    default: "var(--tc-color-danger-bg, #f4dad7)"
    description: Danger background.
  - name: "--tc-callout-danger-fg"
    default: "var(--tc-color-danger-fg, #7a1a14)"
    description: Danger foreground.

related:
  - code
  - toast
  - badge
---

### Variants

<div class="stage col">
  <tc-callout variant="note" title="Heads up">
    The default variant — small reminders or asides.
  </tc-callout>
  <tc-callout variant="info" title="Did you know">
    A friendly piece of context.
  </tc-callout>
  <tc-callout variant="success" title="Saved">
    Use sparingly — only for true positive outcomes.
  </tc-callout>
  <tc-callout variant="warning" title="Be careful">
    Something the user should be aware of before continuing.
  </tc-callout>
  <tc-callout variant="danger" title="Heads up">
    Destructive or breaking. Use `role="alert"` semantics.
  </tc-callout>
</div>

```html
<tc-callout variant="note" title="Heads up">
  The default variant — small reminders or asides.
</tc-callout>

<tc-callout variant="warning" title="Migration note">
  This API will be removed in v2. Switch to <code>build()</code> by next release.
</tc-callout>
```

### Without a title

Drop the `title` for short single-paragraph notes.

<div class="stage col">
  <tc-callout variant="info">
    Components are tree-shakable — only the tags you import ship to the browser.
  </tc-callout>
</div>

### Compact

Smaller padding and font for inline use.

<div class="stage col">
  <tc-callout variant="warning" compact>
    Beta feature — interface may change before the v1 release.
  </tc-callout>
</div>

```html
<tc-callout variant="warning" compact>
  Beta feature — interface may change before the v1 release.
</tc-callout>
```

### Rich content

Paragraphs, lists, and links all work inside the callout body.

```html
<tc-callout variant="info" title="Three things to know">
  <ul>
    <li>It ships zero runtime to consumers.</li>
    <li>It works without a build step.</li>
    <li>It's published to JSR — no npm dependency.</li>
  </ul>
</tc-callout>
```

### Theming

Each variant has its own bg / fg / border tokens. Override one or all of them.

```html
<tc-callout
  variant="info"
  style="--tc-callout-info-bg: #e0f2fe; --tc-callout-info-border: #0284c7;"
  title="Custom blue"
>…</tc-callout>
```

### Accessibility

- Renders an `<aside>` element with `role="note"` for non-danger variants and `role="alert"` for danger.
- The icon is `aria-hidden` — the surrounding text carries the meaning.
- For real-time error announcements (like form errors that appear after submission), prefer `role="alert"` via `variant="danger"` so screen readers interrupt to announce.
