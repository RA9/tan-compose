---
tag: tc-progress
slug: progress
category: chrome
summary: Linear or circular progress indicator. Determinate or indeterminate, three sizes, optional inline label.
description: tc-progress documentation — linear, circular, indeterminate, sizes, label.
importPath: "@ra9/tan-compose-kit/progress"

props:
  - name: value
    type: number
    default: "0"
    description: Current progress, between 0 and `max`. Ignored when `indeterminate` is true.
  - name: max
    type: number
    default: "100"
    description: Maximum value.
  - name: variant
    type: '"linear" | "circular"'
    default: '"linear"'
    description: Shape.
  - name: size
    type: '"sm" | "md" | "lg"'
    default: '"md"'
    description: Linear height or circular diameter.
  - name: indeterminate
    type: boolean
    default: "false"
    description: Cycle indefinitely. Use while waiting for a value to land.
  - name: showLabel
    type: boolean
    default: "false"
    description: Show the percent (or `label`) inline.
  - name: label
    type: string
    default: '""'
    description: Override the auto-generated label.

events: []

slots: []

cssVars:
  - name: "--tc-progress-track"
    default: "var(--tc-color-rule, #ece5d3)"
    description: Track color.
  - name: "--tc-progress-fill"
    default: "var(--tc-color-accent, #a16939)"
    description: Fill color.
  - name: "--tc-progress-radius"
    default: "999px"
    description: Corner radius.
  - name: "--tc-progress-fg"
    default: "var(--tc-color-ink, #14171f)"
    description: Label color.
  - name: "--tc-progress-font"
    default: "var(--tc-font-mono, …)"
    description: Label font.

related:
  - stat
  - skeleton
  - stepper
---

### Linear

<div class="stage" style="display:grid;gap:14px;max-width:400px;">
  <tc-progress value="30"></tc-progress>
  <tc-progress value="68" showLabel></tc-progress>
  <tc-progress value="92" size="lg" showLabel></tc-progress>
  <tc-progress value="50" size="sm"></tc-progress>
</div>

```html
<tc-progress value="30"></tc-progress>
<tc-progress value="68" showLabel></tc-progress>
<tc-progress value="92" size="lg" showLabel></tc-progress>
<tc-progress value="50" size="sm"></tc-progress>
```

### Indeterminate

Useful while the page is waiting for a value to arrive — uploads, deploys, dependent fetches.

<div class="stage" style="display:grid;gap:14px;max-width:400px;">
  <tc-progress indeterminate></tc-progress>
  <tc-progress indeterminate size="sm"></tc-progress>
  <tc-progress indeterminate size="lg" showLabel label="Deploying…"></tc-progress>
</div>

```html
<tc-progress indeterminate></tc-progress>
<tc-progress indeterminate size="lg" showLabel label="Deploying…"></tc-progress>
```

### Circular

<div class="stage" style="display:flex;gap:24px;align-items:center;flex-wrap:wrap;">
  <tc-progress variant="circular" value="25" size="sm"></tc-progress>
  <tc-progress variant="circular" value="55" showLabel></tc-progress>
  <tc-progress variant="circular" value="80" size="lg" showLabel></tc-progress>
  <tc-progress variant="circular" indeterminate></tc-progress>
  <tc-progress variant="circular" indeterminate size="lg"></tc-progress>
</div>

```html
<tc-progress variant="circular" value="55" showLabel></tc-progress>
<tc-progress variant="circular" value="80" size="lg" showLabel></tc-progress>
<tc-progress variant="circular" indeterminate></tc-progress>
```

### Custom max

```html
<tc-progress value="4" max="10" showLabel label="4 of 10 steps"></tc-progress>
```

<div class="stage">
  <tc-progress value="4" max="10" showLabel label="4 of 10 steps" style="max-width:400px;"></tc-progress>
</div>

### Driving from JS

```html
<tc-progress id="upload" value="0" showLabel></tc-progress>

<script>
  const p = document.getElementById("upload");
  let v = 0;
  const t = setInterval(() => {
    v += 5;
    p.value = Math.min(100, v);
    if (v >= 100) clearInterval(t);
  }, 200);
</script>
```

### Accessibility

- `role="progressbar"` with `aria-valuenow / valuemin / valuemax` (determinate) or `aria-valuetext` (indeterminate) is wired up for you.
- For longer operations, pair with a live region announcement of milestones (e.g., "Uploaded 50%") so screen-reader users get progress feedback without watching the bar.
- `prefers-reduced-motion: reduce` slows indeterminate animation rather than disabling it.

### Theming

```html
<tc-progress
  value="64" showLabel
  style="
    --tc-progress-track: #1c1f26;
    --tc-progress-fill: #ffc857;
    --tc-progress-fg: #f5f5f5;
  "
></tc-progress>
```
