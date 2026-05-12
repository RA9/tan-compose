---
tag: tc-radio-group
slug: radio-group
category: form fields
summary: Mutually exclusive choices rendered from an options array. Form-associated and keyboard-navigable.
description: tc-radio-group documentation — options, layout, error state, theming, and accessibility.
importPath: "@ra9/tan-compose-kit/radio-group"

props:
  - name: value
    type: string
    default: '""'
    description: Currently-selected option value.
  - name: name
    type: string
    default: '""'
    description: Field name for form submission. Shared across the radio set.
  - name: options
    type: "Array<{ value: string; label: string; disabled?: boolean }>"
    default: "[]"
    description: Options to render. JSON attribute or JS property.
  - name: label
    type: string
    default: '""'
    description: Group label rendered as a `<legend>`.
  - name: helper
    type: string
    default: '""'
    description: Small helper text below the group.
  - name: error
    type: string
    default: '""'
    description: Error message; the radiogroup gets `aria-invalid="true"`.
  - name: layout
    type: '"vertical" | "horizontal"'
    default: '"vertical"'
    description: Stack the options vertically or wrap them horizontally.
  - name: disabled
    type: boolean
    default: "false"
    description: Disables every radio at once. Reflects to the host.
  - name: required
    type: boolean
    default: "false"
    description: Required for form validation. Reflects to the host.

events:
  - name: tc-change
    detail: "{ value: string }"
    description: Fires when the user selects a new option.

slots: []

cssVars:
  - name: "--tc-input-fg"
    default: "var(--tc-color-ink, #14171f)"
    description: Legend + label color.
  - name: "--tc-input-border"
    default: "var(--tc-color-rule-strong, #d9cfb8)"
    description: Radio circle border (via native `accent-color`).
  - name: "--tc-input-error"
    default: "var(--tc-color-danger, #b3261e)"
    description: Error message color.
  - name: "--tc-input-helper"
    default: "var(--tc-color-ink-muted, #6b7280)"
    description: Helper text color.
  - name: "--tc-input-font"
    default: "var(--tc-font-sans, …)"
    description: Font family.
  - name: "--tc-radio-accent"
    default: "var(--tc-color-accent, #a16939)"
    description: "`accent-color` of the selected radio."

related:
  - select
  - checkbox
  - switch
---

### Basic usage

<div class="stage col">
  <tc-radio-group
    label="Shipping speed"
    name="speed"
    value="standard"
    options='[{"value":"standard","label":"Standard (5–7 days)"},{"value":"express","label":"Express (2 days)"},{"value":"overnight","label":"Overnight"}]'
  ></tc-radio-group>
</div>

```html
<tc-radio-group
  label="Shipping speed"
  name="speed"
  value="standard"
  options='[
    {"value":"standard","label":"Standard (5–7 days)"},
    {"value":"express","label":"Express (2 days)"},
    {"value":"overnight","label":"Overnight"}
  ]'
></tc-radio-group>
```

### Horizontal layout

<div class="stage col">
  <tc-radio-group
    label="Theme"
    layout="horizontal"
    value="light"
    options='[{"value":"light","label":"Light"},{"value":"dark","label":"Dark"},{"value":"auto","label":"Auto"}]'
  ></tc-radio-group>
</div>

```html
<tc-radio-group
  label="Theme"
  layout="horizontal"
  options='[…]'
></tc-radio-group>
```

### Disabled options

<div class="stage col">
  <tc-radio-group
    label="Plan"
    value="pro"
    options='[{"value":"free","label":"Free"},{"value":"pro","label":"Pro"},{"value":"team","label":"Team (contact sales)","disabled":true}]'
  ></tc-radio-group>
</div>

### Error state

<div class="stage col">
  <tc-radio-group
    label="Pick one"
    required
    error="Please select an option."
    options='[{"value":"a","label":"Option A"},{"value":"b","label":"Option B"}]'
  ></tc-radio-group>
</div>

### In a form

```html
<form>
  <tc-radio-group name="plan" label="Plan" required options='[…]'></tc-radio-group>
  <tc-button type="submit">Continue</tc-button>
</form>
```

### Theming

```html
<tc-radio-group
  style="--tc-radio-accent: #3a5b8c;"
  label="Blue radios"
  options='[…]'
></tc-radio-group>
```

### Accessibility

- Renders a real `<fieldset>` + `<legend>` so the group label is announced before each option.
- The container has `role="radiogroup"` and `aria-invalid` reflects the error state.
- Each option is a real `<input type="radio">` — full native keyboard support (arrows move between options, Tab moves out of the group).
- Disabled options can't be focused or selected.
