---
tag: tc-slider
slug: slider
category: form fields
summary: Themed range input. Built on the native `<input type="range">` for free keyboard and touch behavior. Optional ticks, value label, suffix.
description: tc-slider documentation — value, min/max, step, ticks, label, theming.
importPath: "@ra9/tan-compose-kit/slider"

props:
  - name: value
    type: number
    default: "0"
    description: Current value. Reflects to the `value` attribute.
  - name: min
    type: number
    default: "0"
    description: Minimum value.
  - name: max
    type: number
    default: "100"
    description: Maximum value.
  - name: step
    type: number
    default: "1"
    description: Step increment.
  - name: disabled
    type: boolean
    default: "false"
    description: Greyed out and non-interactive.
  - name: showValue
    type: boolean
    default: "false"
    description: Show the current value as a label.
  - name: showTicks
    type: boolean
    default: "false"
    description: Draw a tick mark per step (skipped when step density exceeds 50 ticks).
  - name: label
    type: string
    default: '""'
    description: Visible label above the slider.
  - name: suffix
    type: string
    default: '""'
    description: Appended to the value label (e.g. `%`, `px`, ` items`).

events:
  - name: tc-input
    detail: '{ value: number }'
    description: Fires while the user is dragging or holding an arrow key.
  - name: tc-change
    detail: '{ value: number, previous: number }'
    description: Fires once the user releases / commits the value.

slots: []

cssVars:
  - name: "--tc-slider-track"
    default: "var(--tc-color-rule, #ece5d3)"
    description: Empty track color.
  - name: "--tc-slider-fill"
    default: "var(--tc-color-accent, #a16939)"
    description: Filled track color.
  - name: "--tc-slider-thumb"
    default: "var(--tc-color-surface, #ffffff)"
    description: Thumb fill.
  - name: "--tc-slider-thumb-ring"
    default: "var(--tc-color-accent, #a16939)"
    description: Thumb border.
  - name: "--tc-slider-track-size"
    default: "6px"
    description: Track height.
  - name: "--tc-slider-thumb-size"
    default: "20px"
    description: Thumb diameter.

related:
  - rating
  - input
  - progress
---

### Basic

<div class="stage" style="max-width:360px;">
  <tc-slider value="40"></tc-slider>
</div>

```html
<tc-slider value="40"></tc-slider>
```

### With label and value

<div class="stage" style="max-width:360px;">
  <tc-slider label="Volume" value="60" suffix="%" showValue></tc-slider>
</div>

```html
<tc-slider label="Volume" value="60" suffix="%" showValue></tc-slider>
```

### Ticks

<div class="stage" style="max-width:360px;">
  <tc-slider label="Rating" value="3" min="1" max="5" step="1" showTicks showValue></tc-slider>
</div>

```html
<tc-slider label="Rating" value="3" min="1" max="5" step="1" showTicks showValue></tc-slider>
```

### Custom range and step

<div class="stage" style="display:grid;gap:18px;max-width:360px;">
  <tc-slider label="Font size" value="16" min="12" max="24" step="1" suffix="px" showValue></tc-slider>
  <tc-slider label="Temperature" value="0.7" min="0" max="2" step="0.1" showValue></tc-slider>
</div>

```html
<tc-slider label="Font size" value="16" min="12" max="24" step="1" suffix="px" showValue></tc-slider>
<tc-slider label="Temperature" value="0.7" min="0" max="2" step="0.1" showValue></tc-slider>
```

### Disabled

<div class="stage" style="max-width:360px;">
  <tc-slider label="Disabled" value="50" disabled showValue></tc-slider>
</div>

```html
<tc-slider disabled value="50"></tc-slider>
```

### Listening for change

```html
<tc-slider id="vol" label="Volume" suffix="%" value="40" showValue></tc-slider>

<script>
  const s = document.getElementById("vol");
  s.addEventListener("tc-input", (e) => { /* live preview */ });
  s.addEventListener("tc-change", (e) => {
    console.log("committed:", e.detail.value);
  });
</script>
```

### Accessibility

- The underlying `<input type="range">` provides full keyboard support out of the box: `←` / `→` step, `Page Up` / `Page Down` larger jumps, `Home` / `End` for ends.
- `aria-valuetext` carries the value with its suffix so screen readers announce "60 percent" rather than just "60".
- The focus ring is built into the thumb with a `color-mix` halo — works on light and dark themes.

### Theming

```html
<tc-slider
  value="70" showValue suffix="%"
  style="
    --tc-slider-track: #2a2f3a;
    --tc-slider-fill: #ffc857;
    --tc-slider-thumb: #14171f;
    --tc-slider-thumb-ring: #ffc857;
  "
></tc-slider>
```
