---
tag: tc-cluster
slug: cluster
category: layout primitive
summary: Horizontal layout primitive. Children flow left-to-right and wrap when they run out of room.
description: tc-cluster documentation — gap, justify, align, wrap, and accessibility.
importPath: "@ra9/tan-compose-kit/cluster"

props:
  - name: gap
    type: '"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | CSS length'
    default: '"3"'
    description: Spacing between children. Numeric tokens map to `--tc-space-N`. Any raw CSS length also works.
  - name: justify
    type: '"start" | "center" | "end" | "between" | "around"'
    default: '"start"'
    description: Main-axis distribution. `between` / `around` map to `space-between` / `space-around`.
  - name: align
    type: '"stretch" | "start" | "center" | "end" | "baseline"'
    default: '"center"'
    description: Cross-axis alignment of children within the row.
  - name: wrap
    type: boolean
    default: "true"
    description: Allow children to wrap to a second row when the parent is too narrow.

events: []

slots:
  - name: (default)
    description: Children — any markup; the cluster just lays them out.

cssVars: []

related:
  - stack
  - grid
  - button
---

### Basic usage

<div class="stage col">
  <tc-cluster gap="2">
    <tc-button>Save</tc-button>
    <tc-button variant="ghost">Cancel</tc-button>
  </tc-cluster>
</div>

```html
<tc-cluster gap="2">
  <tc-button>Save</tc-button>
  <tc-button variant="ghost">Cancel</tc-button>
</tc-cluster>
```

### Common patterns

Cluster is the right primitive for any horizontal group: button bars, tag chips, breadcrumbs, social icons.

```html
<tc-cluster gap="2">
  <tc-badge variant="info">design</tc-badge>
  <tc-badge variant="info">accessibility</tc-badge>
  <tc-badge variant="info">type</tc-badge>
</tc-cluster>
```

### Pushed apart with `justify="between"`

Useful for headers — title on the left, actions on the right.

```html
<tc-cluster justify="between" align="center">
  <h2 style="margin:0;">My posts</h2>
  <tc-button>New post</tc-button>
</tc-cluster>
```

### Wrapping vs nowrap

By default, a cluster wraps when items overflow. Disable it for fixed-width toolbars:

```html
<tc-cluster wrap="false" gap="2">
  <tc-button>Bold</tc-button>
  <tc-button>Italic</tc-button>
  <tc-button>Underline</tc-button>
</tc-cluster>
```

### Baseline alignment

Useful when mixing different font sizes:

```html
<tc-cluster align="baseline" gap="2">
  <span style="font-size:1.8rem;">$48</span>
  <span style="color:#6b7280;">per month</span>
</tc-cluster>
```

### Theming

No theme variables — `tc-cluster` is a layout primitive. Use the props directly.

### Accessibility

- Renders a plain `<div>` — transparent to assistive tech.
- Children retain their own semantics. If the cluster is a toolbar, wrap it in `role="toolbar"` yourself for the strongest signal.
