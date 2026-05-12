---
tag: tc-toc
slug: toc
category: docs / content
summary: Auto-built table of contents. Scans a target for headings and tracks the active section via IntersectionObserver.
description: tc-toc documentation — target, levels, sticky, theming, and accessibility.
importPath: "@ra9/tan-compose-kit/toc"

props:
  - name: target
    type: string
    default: '"main"'
    description: CSS selector for the content container to scan.
  - name: levels
    type: string
    default: '"h2,h3"'
    description: Comma-separated heading tags to include.
  - name: sticky
    type: boolean
    default: "true"
    description: "Apply `position: sticky` so the TOC pins to the top while scrolling."
  - name: label
    type: string
    default: '"On this page"'
    description: Heading rendered above the list.

events: []
slots: []

cssVars:
  - name: "--tc-toc-fg"
    default: "var(--tc-color-ink, #14171f)"
    description: Hover color of TOC links.
  - name: "--tc-toc-fg-muted"
    default: "var(--tc-color-ink-muted, #6b7280)"
    description: Resting link color.
  - name: "--tc-toc-active"
    default: "var(--tc-color-accent, #a16939)"
    description: Active link color.
  - name: "--tc-toc-rule"
    default: "var(--tc-color-rule, #ece5d3)"
    description: Left rule next to the list.
  - name: "--tc-toc-label"
    default: "var(--tc-color-ink-soft, #4a5061)"
    description: Color of the "On this page" label.
  - name: "--tc-toc-font"
    default: "var(--tc-font-sans, …)"
    description: Font family.
  - name: "--tc-toc-top"
    default: '"80px"'
    description: Top offset when `sticky` is true. Set to your header height.

related:
  - tabs
  - code
  - pagination
---

### Basic usage

Drop the component into your layout and point it at the article container.

```html
<aside>
  <tc-toc target="article" levels="h2,h3"></tc-toc>
</aside>

<article>
  <h2>Getting started</h2>
  <p>…</p>
  <h3>Install</h3>
  <p>…</p>
  <h2>API reference</h2>
  <p>…</p>
</article>
```

The TOC will list every matching heading. Headings without an `id` get one assigned based on their text (the same slugify rule most docs sites use), so anchor links work without extra setup.

### Heading levels

By default `tc-toc` matches `h2` and `h3`. Add `h4` if your articles run deep:

```html
<tc-toc target="article" levels="h2,h3,h4"></tc-toc>
```

Only `h2`–`h6` levels are styled with indent; deeper levels share `h6` indent.

### Custom label

```html
<tc-toc label="In this guide"></tc-toc>
```

### Custom sticky offset

If you have a tall fixed header, set `--tc-toc-top` to match.

```html
<tc-toc style="--tc-toc-top: 120px;"></tc-toc>
```

### Non-sticky

Some layouts work better without sticky positioning — for example, when the TOC sits in the article's own flow.

```html
<tc-toc sticky="false"></tc-toc>
```

### Active section tracking

The component sets up an `IntersectionObserver` with `rootMargin: "0px 0px -70% 0px"` so a heading becomes "active" once it scrolls into roughly the top third of the viewport. There's no prop to tweak the trigger zone in this version — fork the source if you need custom logic.

### Theming

```html
<tc-toc
  style="--tc-toc-active: #2b6cb0; --tc-toc-rule: #d1d5db;"
></tc-toc>
```

### Accessibility

- Rendered as a `<nav aria-label="Table of contents">` — assistive tech announces it as navigation.
- Links are real `<a href="#…">` anchors, so keyboard users can Tab through them.
- The IntersectionObserver runs only after mount, so server-rendered or static HTML works without flashing an empty TOC.
- The component never traps focus — clicking a link scrolls and focuses the heading per the browser's normal anchor behavior.
