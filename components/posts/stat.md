---
tag: tc-stat
slug: stat
category: chrome
summary: KPI card — label, value, optional prefix/suffix, and a colored delta with trend arrow.
description: tc-stat documentation — value, delta, trend, prefix/suffix, theming, and accessibility.
importPath: "@ra9/tan-compose-kit/stat"

props:
  - name: label
    type: string
    default: '""'
    description: Small uppercase label above the value.
  - name: value
    type: "string | number"
    default: '""'
    description: The main number. Rendered as-is, so format thousands separators yourself.
  - name: delta
    type: "string | number"
    default: '""'
    description: Secondary change indicator, e.g. "+12%". Hidden if empty.
  - name: trend
    type: '"up" | "down" | "neutral"'
    default: '"neutral"'
    description: Colors the delta and picks the arrow glyph. `up` is green, `down` is red.
  - name: prefix
    type: string
    default: '""'
    description: Rendered before the value, e.g. "$".
  - name: suffix
    type: string
    default: '""'
    description: Rendered after the value, e.g. "%".

events: []
slots: []

cssVars:
  - name: "--tc-stat-surface"
    default: "var(--tc-color-surface, #ffffff)"
    description: Card background.
  - name: "--tc-stat-rule"
    default: "var(--tc-color-rule, #ece5d3)"
    description: Card border.
  - name: "--tc-stat-label"
    default: "var(--tc-color-ink-muted, #6b7280)"
    description: Label + prefix/suffix color.
  - name: "--tc-stat-value"
    default: "var(--tc-color-ink, #14171f)"
    description: Main value color.
  - name: "--tc-stat-up"
    default: "var(--tc-color-success, #207a5b)"
    description: Color of an "up" trend delta.
  - name: "--tc-stat-down"
    default: "var(--tc-color-danger, #b3261e)"
    description: Color of a "down" trend delta.
  - name: "--tc-stat-neutral"
    default: "var(--tc-color-ink-muted, #6b7280)"
    description: Color of a "neutral" trend delta.
  - name: "--tc-stat-radius"
    default: "var(--tc-radius-lg, 12px)"
    description: Corner radius.
  - name: "--tc-stat-font"
    default: "var(--tc-font-sans, …)"
    description: Font family.

related:
  - card
  - badge
  - grid
---

### Basic usage

<div class="stage">
  <tc-stat label="Revenue" prefix="$" value="48,210" delta="+12% vs last month" trend="up"></tc-stat>
</div>

```html
<tc-stat
  label="Revenue"
  prefix="$"
  value="48,210"
  delta="+12% vs last month"
  trend="up"
></tc-stat>
```

### Trends

<div class="stage">
  <tc-stat label="Sign-ups" value="1,204" delta="+8.4%" trend="up"></tc-stat>
  <tc-stat label="Churn" value="2.1" suffix="%" delta="−0.3%" trend="down"></tc-stat>
  <tc-stat label="Active users" value="38,950" delta="No change" trend="neutral"></tc-stat>
</div>

```html
<tc-stat label="Sign-ups" value="1,204" delta="+8.4%" trend="up"></tc-stat>
<tc-stat label="Churn" value="2.1" suffix="%" delta="−0.3%" trend="down"></tc-stat>
<tc-stat label="Active users" value="38,950" delta="No change" trend="neutral"></tc-stat>
```

Note: `trend="down"` on a *churn* metric is actually a *good* thing — the component just colors it red. Pick `trend` based on the visual you want, not the literal direction of change.

### Without a delta

Drop the `delta` prop and the secondary row is hidden.

<div class="stage">
  <tc-stat label="MRR" prefix="$" value="120,000"></tc-stat>
</div>

```html
<tc-stat label="MRR" prefix="$" value="120,000"></tc-stat>
```

### Grid of KPIs

Combine with `tc-grid` for a responsive KPI strip.

```html
<tc-grid min="220px" gap="3">
  <tc-stat label="Revenue" prefix="$" value="48,210" delta="+12%" trend="up"></tc-stat>
  <tc-stat label="New users" value="1,204" delta="+8.4%" trend="up"></tc-stat>
  <tc-stat label="Churn" value="2.1" suffix="%" delta="−0.3%" trend="down"></tc-stat>
</tc-grid>
```

### Theming

```html
<tc-stat
  style="--tc-stat-up: #2b6cb0; --tc-stat-radius: 4px;"
  label="Custom blue trend"
  value="42"
  delta="+3"
  trend="up"
></tc-stat>
```

### Accessibility

- The arrow glyph is `aria-hidden`; the delta text carries the meaning.
- Numbers use `font-variant-numeric: tabular-nums` so they align nicely in a row of stats.
- No interactive controls — if you need a clickable stat, wrap the component in your own link/button.
- Be mindful of contrast when overriding the trend colors; the defaults pass AA on the standard surface.
