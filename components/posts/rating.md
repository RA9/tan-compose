---
tag: tc-rating
slug: rating
category: form fields
summary: Star rating input with optional half-star precision, keyboard nav, hover preview, and a read-only display mode.
description: tc-rating documentation — interactive, half-stars, readonly, sizes, keyboard, theming.
importPath: "@ra9/tan-compose-kit/rating"

props:
  - name: value
    type: number
    default: "0"
    description: Current rating. Reflects to the `value` attribute.
  - name: max
    type: number
    default: "5"
    description: Total number of stars.
  - name: readonly
    type: boolean
    default: "false"
    description: Display-only mode. Renders as `role="img"`.
  - name: allowHalf
    type: boolean
    default: "false"
    description: Allow 0.5 increments. Click the left half of a star for a half rating.
  - name: size
    type: '"sm" | "md" | "lg"'
    default: '"md"'
    description: Star size — 18 / 24 / 32 px.
  - name: ariaLabel
    type: string
    default: '"Rating"'
    description: Accessible label.

events:
  - name: tc-change
    detail: '{ value: number, previous: number }'
    description: Fires when the user picks a new rating (click or keyboard).

slots: []

cssVars:
  - name: "--tc-rating-fill"
    default: "var(--tc-color-warning, #d7a52f)"
    description: Filled star color.
  - name: "--tc-rating-track"
    default: "var(--tc-color-rule, #ece5d3)"
    description: Empty star color.

related:
  - slider
  - badge
---

### Basic

<div class="stage" style="display:grid;gap:14px;">
  <tc-rating value="3"></tc-rating>
  <tc-rating value="4" size="lg"></tc-rating>
  <tc-rating value="2" size="sm"></tc-rating>
</div>

```html
<tc-rating value="3"></tc-rating>
<tc-rating value="4" size="lg"></tc-rating>
<tc-rating value="2" size="sm"></tc-rating>
```

### Half-stars

<div class="stage">
  <tc-rating value="3.5" allowHalf size="lg"></tc-rating>
</div>

```html
<tc-rating value="3.5" allowHalf size="lg"></tc-rating>
```

### Read-only display

Pair with a count for a typical product card.

<div class="stage" style="display:flex;align-items:center;gap:8px;">
  <tc-rating value="4.5" allowHalf readonly></tc-rating>
  <span style="color:var(--tc-color-ink-soft);font-size:0.92rem;">4.5 (281 reviews)</span>
</div>

```html
<tc-rating value="4.5" allowHalf readonly></tc-rating>
<span>4.5 (281 reviews)</span>
```

### Custom max

<div class="stage">
  <tc-rating value="7" max="10" size="sm"></tc-rating>
</div>

```html
<tc-rating value="7" max="10"></tc-rating>
```

### Listening for change

```html
<tc-rating id="ux" value="0"></tc-rating>

<script>
  document.getElementById("ux").addEventListener("tc-change", (e) => {
    console.log("now rated:", e.detail.value);
  });
</script>
```

### Accessibility

- Interactive ratings use `role="slider"` with `aria-valuenow / valuemin / valuemax / valuetext`. Keyboard support: `←` / `→` (or `↑` / `↓`) adjust by step, `Home` / `End` jump to 0 / max.
- Read-only ratings use `role="img"` with the value baked into `aria-label`.
- Clicking the current value clears the rating, in case users want to undo.
- Star fills use a clip-path for the half state — at any zoom level the half is exactly 50%.

### Theming

```html
<tc-rating
  value="4.5" allowHalf
  style="
    --tc-rating-fill: #ff6b6b;
    --tc-rating-track: #4a2a32;
  "
></tc-rating>
```
