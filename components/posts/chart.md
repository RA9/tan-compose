---
tag: tc-chart
slug: chart
category: data
summary: Pure-SVG, themeable, responsive charts in five flavors — line, area, bar, sparkline, donut. ~11 KB minified; every element is a real DOM node screen readers can reach.
description: tc-chart documentation — line, area, bar, sparkline, donut examples, theming, responsive behavior, accessibility.
importPath: "@ra9/tan-compose-kit/chart"

props:
  - name: type
    type: '"line" | "area" | "bar" | "sparkline" | "donut"'
    default: '"line"'
    description: Chart type. Unknown values fall back to `line`.
  - name: data
    type: 'ChartData'
    default: '{ series: [] }'
    description: Data to plot. For line/area/bar/sparkline pass `{ labels, series:[{name, values}] }`; for donut pass `{ series:[{name, value}] }`.
  - name: height
    type: string
    default: '"240px"'
    description: Any CSS length. The chart fills the host width and uses this for its viewport height.
  - name: smooth
    type: boolean
    default: "true"
    description: Catmull-Rom curves for line and area. Set to `false` for jagged polylines.
  - name: stacked
    type: boolean
    default: "false"
    description: Stack series vertically. Applies to `area` and `bar`.
  - name: showLegend
    type: boolean
    default: "true"
    description: Series legend below the chart.
  - name: showAxes
    type: boolean
    default: "true"
    description: Render axis chrome (Y labels, baseline). Ignored for sparkline / donut.
  - name: showGrid
    type: boolean
    default: "true"
    description: Horizontal grid lines at Y-axis ticks.
  - name: showLabels
    type: boolean
    default: "true"
    description: Show X-axis tick labels. Auto-strides when there are too many.
  - name: showValues
    type: boolean
    default: "false"
    description: Render the value next to each data point / bar / segment.
  - name: innerRadius
    type: number
    default: "0.6"
    description: Donut only. `0` = pie. `0.9` = thin ring.
  - name: yMin
    type: number?
    default: "null"
    description: Force the y-axis minimum. Auto when null.
  - name: yMax
    type: number?
    default: "null"
    description: Force the y-axis maximum. Auto when null.
  - name: ariaLabel
    type: string
    default: '"Chart"'
    description: Accessible name for the chart.
  - name: colors
    type: 'string[] | null'
    default: "null"
    description: Override the default series palette. Pass any valid CSS color (hex, `rgb`, `var(--token)`, etc.).

events: []

slots: []

cssVars:
  - name: "--tc-chart-bg"
    default: "transparent"
    description: Chart background.
  - name: "--tc-chart-fg"
    default: "var(--tc-color-ink)"
    description: Foreground text color.
  - name: "--tc-chart-axis"
    default: "var(--tc-color-rule-strong)"
    description: Baseline / axis stroke.
  - name: "--tc-chart-grid"
    default: "var(--tc-color-rule)"
    description: Gridline stroke.
  - name: "--tc-chart-label"
    default: "var(--tc-color-ink-muted)"
    description: Axis and value-label fill.
  - name: "--tc-chart-color-1"
    default: "var(--tc-color-accent)"
    description: First series color.
  - name: "--tc-chart-color-2"
    default: "var(--tc-color-info)"
    description: Second series color.
  - name: "--tc-chart-color-3..8"
    default: "—"
    description: Up to 8 series colors, falling back to semantic tokens. Override per host to brand.

related:
  - stat
  - table
  - progress
---

### Why a custom chart component

Chart.js, Recharts, Apex, and ECharts all render to `<canvas>`, which means:

- Series colors live in JS config, not CSS tokens — you can't theme them by importing your dark preset.
- Canvas elements expose nothing to assistive tech beyond an alt-text guess. A screen reader gets `"chart"`.
- Each library is 100–400 KB before plugins.

`tc-chart` renders pure SVG, themes via CSS custom properties, exposes every point as a real DOM element with a `<title>` and structured aria description, and weighs ~11 KB minified.

### Line — multi-series

<div class="stage">
  <tc-chart
    type="line"
    height="260px"
    style="width:100%;"
    data='{
      "labels": ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug"],
      "series": [
        {"name":"Sessions","values":[420,460,510,530,640,720,790,830]},
        {"name":"Signups","values":[80,95,110,130,140,180,210,240]}
      ]
    }'
  ></tc-chart>
</div>

```html
<tc-chart
  type="line"
  data='{
    "labels": ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug"],
    "series": [
      {"name":"Sessions","values":[420,460,510,530,640,720,790,830]},
      {"name":"Signups","values":[80,95,110,130,140,180,210,240]}
    ]
  }'
></tc-chart>
```

### Area — stacked

<div class="stage">
  <tc-chart
    type="area"
    stacked
    height="240px"
    style="width:100%;"
    data='{
      "labels": ["Q1","Q2","Q3","Q4"],
      "series": [
        {"name":"NA","values":[40,55,70,90]},
        {"name":"EU","values":[30,40,50,60]},
        {"name":"APAC","values":[20,25,40,55]}
      ]
    }'
  ></tc-chart>
</div>

```html
<tc-chart type="area" stacked data='{ … }'></tc-chart>
```

### Bar — grouped

<div class="stage">
  <tc-chart
    type="bar"
    height="240px"
    style="width:100%;"
    data='{
      "labels": ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
      "series": [
        {"name":"Reads","values":[120,150,180,170,190,80,60]},
        {"name":"Writes","values":[40,55,70,60,75,20,15]}
      ]
    }'
  ></tc-chart>
</div>

```html
<tc-chart
  type="bar"
  data='{
    "labels": ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
    "series": [
      {"name":"Reads","values":[120,150,180,170,190,80,60]},
      {"name":"Writes","values":[40,55,70,60,75,20,15]}
    ]
  }'
></tc-chart>
```

### Sparkline — inline mini-trend

Sparklines drop the axes, grid, and legend so they sit inline with text.

<div class="stage" style="gap: 8px; align-items: center;">
  Revenue this quarter
  <tc-chart
    type="sparkline"
    height="32px"
    showLegend="false"
    style="width: 140px;"
    data='{ "series": [{"name":"r","values":[12,18,15,22,28,24,32,38]}] }'
  ></tc-chart>
  <strong>+216%</strong>
</div>

```html
<tc-chart
  type="sparkline"
  height="32px"
  showLegend="false"
  style="width: 140px;"
  data='{ "series": [{"name":"r","values":[12,18,15,22,28,24,32,38]}] }'
></tc-chart>
```

### Donut — composition

<div class="stage">
  <tc-chart
    type="donut"
    height="280px"
    showValues
    style="width:100%; max-width: 360px;"
    data='{
      "series": [
        {"name":"Mobile","value":52},
        {"name":"Desktop","value":31},
        {"name":"Tablet","value":12},
        {"name":"Other","value":5}
      ]
    }'
  ></tc-chart>
</div>

```html
<tc-chart
  type="donut"
  showValues
  data='{
    "series": [
      {"name":"Mobile","value":52},
      {"name":"Desktop","value":31},
      {"name":"Tablet","value":12},
      {"name":"Other","value":5}
    ]
  }'
></tc-chart>
```

### Pie (innerRadius=0)

<div class="stage">
  <tc-chart
    type="donut"
    innerRadius="0"
    height="260px"
    style="width:100%; max-width: 320px;"
    data='{
      "series": [
        {"name":"Free","value":1820},
        {"name":"Pro","value":380},
        {"name":"Enterprise","value":42}
      ]
    }'
  ></tc-chart>
</div>

```html
<tc-chart type="donut" innerRadius="0" data='{ … }'></tc-chart>
```

### Driven from JavaScript

The `data` prop is just JSON — set the property directly for live updates.

```html
<tc-chart id="live" type="line" height="240px"></tc-chart>

<script>
  const chart = document.getElementById("live");
  chart.data = {
    labels: ["10:00","10:05","10:10","10:15","10:20"],
    series: [{ name: "Requests/s", values: [320, 410, 380, 520, 470] }],
  };

  // Hot-swap a series later:
  setInterval(() => {
    const next = Array.from({ length: 5 }, () => Math.round(300 + Math.random() * 300));
    chart.data = { labels: chart.data.labels, series: [{ name: "Requests/s", values: next }] };
  }, 2000);
</script>
```

### Brand colors

Three layers to bring the chart in line with brand:

1. **Override series colors per chart** via the `colors` prop.
2. **Override the series palette tokens** (`--tc-chart-color-1` … `8`) on the host so every chart that doesn't pass `colors` picks them up.
3. **Restyle the chart chrome** with `--tc-chart-axis`, `--tc-chart-grid`, `--tc-chart-label`.

<div class="stage">
  <tc-chart
    type="bar"
    height="220px"
    style="width:100%; --tc-chart-color-1: #5b6cf0; --tc-chart-color-2: #f25c5c; --tc-chart-grid: rgba(91, 108, 240, 0.12); --tc-chart-axis: #5b6cf0;"
    data='{
      "labels": ["A","B","C","D","E"],
      "series": [
        {"name":"This week","values":[24,32,18,40,28]},
        {"name":"Last week","values":[18,22,16,30,24]}
      ]
    }'
  ></tc-chart>
</div>

```html
<tc-chart
  type="bar"
  style="
    --tc-chart-color-1: #5b6cf0;
    --tc-chart-color-2: #f25c5c;
    --tc-chart-grid: rgba(91, 108, 240, 0.12);
    --tc-chart-axis: #5b6cf0;
  "
  data='{ … }'
></tc-chart>
```

…or pass a specific palette inline:

```html
<tc-chart
  type="donut"
  colors='["#0ea5e9","#22c55e","#eab308","#ef4444"]'
  data='{ "series": [
    {"name":"Up","value":92},
    {"name":"Warn","value":5},
    {"name":"Down","value":2},
    {"name":"Maint","value":1}
  ] }'
></tc-chart>
```

### Manual y-axis bounds

Force the y-axis to a known range with `yMin` and `yMax` — useful for KPI dashboards where the relative magnitude matters more than the auto-fit.

```html
<tc-chart
  type="line"
  yMin="0" yMax="100"
  data='{
    "labels": ["Mon","Tue","Wed","Thu","Fri"],
    "series": [{"name":"Uptime %","values":[99.2, 99.7, 99.9, 99.4, 99.6]}]
  }'
></tc-chart>
```

### Accessibility

- The chart container has `role="img"` and the `ariaLabel` prop becomes its accessible name. Pass something meaningful like `"Weekly request volume by region"`.
- A visually-hidden description below the chart enumerates the series and point count for screen readers (`"Line chart with 2 series (Sessions, Signups) and 8 data points."`).
- Every data point, bar, and donut segment is a real SVG element with a `<title>` child — desktop screen readers and tooltips both pick this up.
- `prefers-reduced-motion: reduce` disables the hover scale on segments and points.

### Responsiveness

The host is `display: block; width: 100%` by default, so the chart fills its container. The SVG uses a fixed internal `viewBox` (`0 0 800 400` for cartesian, `0 0 320 320` for donut) and scales to the host. Set the visual height with the `height` prop or a wrapper.

For a chart inside a grid card:

```html
<tc-card title="Active users">
  <tc-chart type="line" height="200px" data='{ … }'></tc-chart>
</tc-card>
```

### Theming

The default palette resolves through semantic tokens, so loading a theme preset (light, dark, bootstrap, tailwind, material, shadcn) re-skins every chart automatically. To bake a chart-specific palette into your design system, set the chart tokens at `:root`:

```css
:root {
  --tc-chart-color-1: #0ea5e9;
  --tc-chart-color-2: #22c55e;
  --tc-chart-color-3: #eab308;
  --tc-chart-color-4: #ef4444;
  --tc-chart-grid: rgba(11, 11, 12, 0.06);
  --tc-chart-axis: rgba(11, 11, 12, 0.18);
}
```

### Limits, by design

- One chart type per element. Multi-axis / combined line+bar isn't supported; compose two charts side-by-side instead.
- No hover crosshair / shared tooltip yet — the per-element `<title>` covers most use cases.
- No animations on data swap (yet). A `data` change re-renders immediately; users get an instant update rather than a transition.
- Donut data shape is single-series. For nested donuts, stack two `<tc-chart>` instances.
