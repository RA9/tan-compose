---
tag: tc-stepper
slug: stepper
category: chrome
summary: Multi-step indicator for wizards, onboarding, and checkout. Horizontal or vertical, optional click-to-jump.
description: tc-stepper documentation — horizontal, vertical, clickable, theming.
importPath: "@ra9/tan-compose-kit/stepper"

props:
  - name: steps
    type: 'Array<{ id?: string; title: string; description?: string }>'
    default: "[]"
    description: Steps to render. Pass as a JSON-encoded attribute or set the property directly.
  - name: active
    type: number
    default: "0"
    description: Zero-based index of the current step. Reflects to `active` attribute.
  - name: orientation
    type: '"horizontal" | "vertical"'
    default: '"horizontal"'
    description: Layout axis.
  - name: clickable
    type: boolean
    default: "false"
    description: Render steps as buttons users can click to jump to.

events:
  - name: tc-step-change
    detail: '{ active: number, previous: number }'
    description: Fires when a clickable step is selected.

slots: []

cssVars:
  - name: "--tc-stepper-ink"
    default: "var(--tc-color-ink, #14171f)"
    description: Title color.
  - name: "--tc-stepper-soft"
    default: "var(--tc-color-ink-soft, #4a5061)"
    description: Description / upcoming-step color.
  - name: "--tc-stepper-accent"
    default: "var(--tc-color-accent, #a16939)"
    description: Current step marker color.
  - name: "--tc-stepper-done"
    default: "var(--tc-color-success, #2f7a52)"
    description: Completed step marker fill.
  - name: "--tc-stepper-rule"
    default: "var(--tc-color-rule, #ece5d3)"
    description: Connector / upcoming marker border.
  - name: "--tc-stepper-marker-size"
    default: "28px"
    description: Diameter of the step marker.

related:
  - tabs
  - progress
  - toc
---

### Horizontal

<div class="stage">
  <tc-stepper
    active="1"
    steps='[
      {"title":"Account","description":"Email & password"},
      {"title":"Profile","description":"Name & avatar"},
      {"title":"Workspace","description":"Invite team"},
      {"title":"Done"}
    ]'
  ></tc-stepper>
</div>

```html
<tc-stepper
  active="1"
  steps='[
    {"title":"Account","description":"Email & password"},
    {"title":"Profile","description":"Name & avatar"},
    {"title":"Workspace","description":"Invite team"},
    {"title":"Done"}
  ]'
></tc-stepper>
```

### Vertical

<div class="stage" style="max-width:300px;">
  <tc-stepper
    orientation="vertical"
    active="2"
    steps='[
      {"title":"Order placed","description":"Mar 4"},
      {"title":"Picked","description":"Mar 5"},
      {"title":"Out for delivery","description":"Today"},
      {"title":"Delivered"}
    ]'
  ></tc-stepper>
</div>

```html
<tc-stepper
  orientation="vertical"
  active="2"
  steps='[
    {"title":"Order placed","description":"Mar 4"},
    {"title":"Picked","description":"Mar 5"},
    {"title":"Out for delivery","description":"Today"},
    {"title":"Delivered"}
  ]'
></tc-stepper>
```

### Clickable

`clickable` turns each step into a `<button>` and emits `tc-step-change`. Use it when the user can freely navigate (e.g., a settings wizard with reviewable steps).

<div class="stage">
  <tc-stepper
    id="wiz"
    clickable
    active="0"
    steps='[
      {"title":"Choose plan"},
      {"title":"Billing details"},
      {"title":"Review"},
      {"title":"Confirm"}
    ]'
  ></tc-stepper>
</div>

```html
<tc-stepper id="wiz" clickable active="0" steps='[…]'></tc-stepper>

<script>
  document.getElementById("wiz").addEventListener("tc-step-change", (e) => {
    console.log("user jumped to:", e.detail.active);
  });
</script>
```

### Driving from JS

```js
const stepper = document.querySelector("tc-stepper");
function next() {
  if (stepper.active < stepper.steps.length - 1) stepper.active++;
}
function back() {
  if (stepper.active > 0) stepper.active--;
}
```

### Accessibility

- Rendered as an ordered list (`<ol>`) with each step as a list item. The list carries `aria-label="Progress"`.
- The current step's row has `aria-current="step"`.
- For non-clickable steppers, steps are static text (no fake-button confusion). When `clickable` is true, steps are real buttons and keyboard reachable.
- For long-form wizards, pair with a live region that announces "Step 2 of 4: Profile" when the active step changes — the stepper itself is decorative.

### Theming

```html
<tc-stepper
  steps='[…]'
  active="1"
  style="
    --tc-stepper-accent: #5b6cf0;
    --tc-stepper-done: #0e9f6e;
    --tc-stepper-marker-size: 32px;
    --tc-stepper-rule: #d0d5f0;
  "
></tc-stepper>
```
