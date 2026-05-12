---
tag: tc-badge
slug: badge
category: chrome
summary: Compact label with five variant colors and an optional pill shape. Pure presentation.
description: tc-badge documentation — variants, size, pill, theming, and accessibility.
importPath: "@ra9/tan-compose-kit/badge"

props:
  - name: variant
    type: '"neutral" | "info" | "success" | "warning" | "danger"'
    default: '"neutral"'
    description: Visual color preset.
  - name: size
    type: '"sm" | "md"'
    default: '"md"'
    description: Padding + font scale.
  - name: pill
    type: boolean
    default: "false"
    description: Render with fully-rounded ends.

events: []

slots:
  - name: (default)
    description: Badge content. Usually a short word or count.

cssVars:
  - name: "--tc-badge-radius"
    default: "var(--tc-radius-sm, 6px)"
    description: Corner radius (ignored when `pill` is true).
  - name: "--tc-badge-font"
    default: "var(--tc-font-sans, …)"
    description: Font family.
  - name: "--tc-badge-neutral-bg"
    default: "var(--tc-color-rule, #ece5d3)"
    description: Neutral background.
  - name: "--tc-badge-neutral-fg"
    default: "var(--tc-color-ink, #14171f)"
    description: Neutral foreground.
  - name: "--tc-badge-info-bg"
    default: "var(--tc-color-info-bg, #dde6f4)"
    description: Info background.
  - name: "--tc-badge-info-fg"
    default: "var(--tc-color-info-fg, #1f3a66)"
    description: Info foreground.
  - name: "--tc-badge-success-bg"
    default: "var(--tc-color-success-bg, #dbece2)"
    description: Success background.
  - name: "--tc-badge-success-fg"
    default: "var(--tc-color-success-fg, #155b40)"
    description: Success foreground.
  - name: "--tc-badge-warning-bg"
    default: "var(--tc-color-warning-bg, #f5e7cf)"
    description: Warning background.
  - name: "--tc-badge-warning-fg"
    default: "var(--tc-color-warning-fg, #7a4f0a)"
    description: Warning foreground.
  - name: "--tc-badge-danger-bg"
    default: "var(--tc-color-danger-bg, #f4dad7)"
    description: Danger background.
  - name: "--tc-badge-danger-fg"
    default: "var(--tc-color-danger-fg, #7a1a14)"
    description: Danger foreground.

related:
  - toast
  - callout
  - stat
---

### Variants

<div class="stage">
  <tc-badge>Neutral</tc-badge>
  <tc-badge variant="info">Info</tc-badge>
  <tc-badge variant="success">Success</tc-badge>
  <tc-badge variant="warning">Warning</tc-badge>
  <tc-badge variant="danger">Danger</tc-badge>
</div>

```html
<tc-badge>Neutral</tc-badge>
<tc-badge variant="success">Live</tc-badge>
<tc-badge variant="warning">Beta</tc-badge>
<tc-badge variant="danger">Deprecated</tc-badge>
```

### Sizes

<div class="stage">
  <tc-badge size="sm">Small</tc-badge>
  <tc-badge size="md">Medium</tc-badge>
</div>

```html
<tc-badge size="sm" variant="info">12</tc-badge>
```

### Pill

<div class="stage">
  <tc-badge pill variant="success">Active</tc-badge>
  <tc-badge pill variant="warning">Pending</tc-badge>
  <tc-badge pill variant="danger" size="sm">3</tc-badge>
</div>

```html
<tc-badge pill variant="success">Active</tc-badge>
<tc-badge pill variant="danger" size="sm">3</tc-badge>
```

### Inside other components

Badges combine well with cards, table cells, and nav items.

```html
<tc-card title="Notifications">
  You have <tc-badge pill variant="danger" size="sm">3</tc-badge> unread messages.
</tc-card>
```

### Theming

```html
<tc-badge
  style="--tc-badge-info-bg: #e3f2fd; --tc-badge-info-fg: #0d47a1;"
  variant="info"
>Custom blue</tc-badge>
```

### Accessibility

- The badge is purely visual — it doesn't carry semantic meaning by itself. If the badge is the only signal of a state (e.g. "unread"), add an `aria-label` or surrounding text so screen readers get the message.
- Contrast is tuned to pass AA on the default surface for every variant. When overriding the tokens, re-check contrast.
