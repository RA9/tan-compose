---
tag: tc-grid
slug: grid
category: layout primitive
summary: Auto-fit responsive grid. Children fill columns sized by a minimum width, or a fixed column count.
description: tc-grid documentation — min, columns, gap, and accessibility.
importPath: "@ra9/tan-compose-kit/grid"

props:
  - name: min
    type: string
    default: '"260px"'
    description: Minimum column width as a CSS length. The grid auto-fits as many columns as can fit at that width or larger.
  - name: gap
    type: '"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | CSS length'
    default: '"4"'
    description: Spacing between cells. Numeric tokens map to `--tc-space-N`.
  - name: columns
    type: "string (number)"
    default: '""'
    description: Fixed column count. When set, overrides `min` and produces exactly N equal columns.

events: []

slots:
  - name: (default)
    description: Cells — any markup; each direct child becomes one grid cell.

cssVars: []

related:
  - stack
  - cluster
  - card
---

### Basic usage

Auto-fit — the grid figures out how many columns fit at the minimum width and reflows on resize.

<div class="stage col">
  <tc-grid min="160px" gap="2">
    <tc-card>One</tc-card>
    <tc-card>Two</tc-card>
    <tc-card>Three</tc-card>
    <tc-card>Four</tc-card>
    <tc-card>Five</tc-card>
  </tc-grid>
</div>

```html
<tc-grid min="160px" gap="2">
  <tc-card>One</tc-card>
  <tc-card>Two</tc-card>
  <tc-card>Three</tc-card>
  <tc-card>Four</tc-card>
</tc-grid>
```

### Fixed columns

Pass `columns="3"` and the grid produces exactly three equal columns, ignoring `min`.

```html
<tc-grid columns="3" gap="3">
  <tc-stat label="Revenue" value="$48k"></tc-stat>
  <tc-stat label="Users" value="1,204"></tc-stat>
  <tc-stat label="Churn" value="2.1%"></tc-stat>
</tc-grid>
```

### KPI strip

Combine with `tc-stat` for a responsive metrics row.

```html
<tc-grid min="220px" gap="3">
  <tc-stat label="Revenue" prefix="$" value="48,210" delta="+12%" trend="up"></tc-stat>
  <tc-stat label="New users" value="1,204" delta="+8.4%" trend="up"></tc-stat>
  <tc-stat label="Churn" value="2.1" suffix="%" delta="−0.3%" trend="down"></tc-stat>
  <tc-stat label="MRR" prefix="$" value="120,000"></tc-stat>
</tc-grid>
```

### Card gallery

```html
<tc-grid min="280px" gap="4">
  <tc-card title="Hyperion">Active project.</tc-card>
  <tc-card title="Atlas">In planning.</tc-card>
  <tc-card title="Orion">Archived.</tc-card>
</tc-grid>
```

### Theming

No theme variables. Use the `min`, `columns`, and `gap` props.

### Accessibility

- Renders a plain `<div>` with `display: grid` — transparent to assistive tech.
- Children retain their own semantics; the grid doesn't intercept focus or interactions.
- For ordered content where the visual order matters (e.g. a tabular layout), reach for `tc-table` instead — the grid does not announce row/column structure.
