---
tag: tc-checkbox
slug: checkbox
category: form fields
summary: Form-associated checkbox with label, helper, error state, and indeterminate support.
description: tc-checkbox documentation — checked state, indeterminate, error, theming, and accessibility.
importPath: "@ra9/tan-compose-kit/checkbox"

props:
  - name: checked
    type: boolean
    default: "false"
    description: Whether the box is checked. Reflects to the host.
  - name: name
    type: string
    default: '""'
    description: Field name for form submission.
  - name: value
    type: string
    default: '"on"'
    description: Value submitted when the checkbox is checked. Standard native default.
  - name: label
    type: string
    default: '""'
    description: Text rendered next to the checkbox.
  - name: helper
    type: string
    default: '""'
    description: Small helper text below the row.
  - name: error
    type: string
    default: '""'
    description: Error message; paints invalid when set.
  - name: disabled
    type: boolean
    default: "false"
    description: Disables the control; reflects to the host.
  - name: required
    type: boolean
    default: "false"
    description: Required for form validation; reflects to the host.
  - name: indeterminate
    type: boolean
    default: "false"
    description: Tri-state visual for "some children selected". Applied imperatively to the native input.

events:
  - name: tc-change
    detail: "{ checked: boolean }"
    description: Fires when the user toggles the checkbox.

slots: []

cssVars:
  - name: "--tc-input-fg"
    default: "var(--tc-color-ink, #14171f)"
    description: Label color.
  - name: "--tc-input-border"
    default: "var(--tc-color-rule-strong, #d9cfb8)"
    description: Box border (used by the native `accent-color`).
  - name: "--tc-input-border-focus"
    default: "var(--tc-color-accent, #a16939)"
    description: Focus border color.
  - name: "--tc-input-error"
    default: "var(--tc-color-danger, #b3261e)"
    description: Error outline + text color.
  - name: "--tc-input-helper"
    default: "var(--tc-color-ink-muted, #6b7280)"
    description: Helper text color.
  - name: "--tc-input-radius"
    default: "var(--tc-radius-sm, 4px)"
    description: Corner radius of the box.
  - name: "--tc-input-font"
    default: "var(--tc-font-sans, …)"
    description: Font family.
  - name: "--tc-checkbox-accent"
    default: "var(--tc-color-accent, #a16939)"
    description: The `accent-color` of the native checkbox.

related:
  - switch
  - radio-group
  - input
---

### Basic usage

<div class="stage col">
  <tc-checkbox label="I agree to the terms."></tc-checkbox>
  <tc-checkbox label="Subscribe to the weekly digest." checked></tc-checkbox>
</div>

```html
<tc-checkbox label="I agree to the terms."></tc-checkbox>
<tc-checkbox label="Subscribe to the weekly digest." checked></tc-checkbox>
```

### States

<div class="stage col">
  <tc-checkbox label="Unchecked"></tc-checkbox>
  <tc-checkbox label="Checked" checked></tc-checkbox>
  <tc-checkbox label="Disabled" disabled></tc-checkbox>
  <tc-checkbox label="Disabled + checked" disabled checked></tc-checkbox>
</div>

### Indeterminate

`indeterminate` is set as a property (not an attribute) and shows the dash glyph the browser draws for "some children selected". Useful at the top of a tree.

```html
<tc-checkbox id="parent" label="Select all"></tc-checkbox>

<script type="module">
  document.getElementById("parent").indeterminate = true;
</script>
```

### Error + required

<div class="stage col">
  <tc-checkbox label="I agree to the terms." required error="You must accept to continue."></tc-checkbox>
</div>

```html
<tc-checkbox
  label="I agree to the terms."
  required
  error="You must accept to continue."
></tc-checkbox>
```

### In a form

Submits its `value` under `name` only when checked — matching the native input.

```html
<form>
  <tc-checkbox name="newsletter" value="yes" label="Send me updates"></tc-checkbox>
  <tc-button type="submit">Subscribe</tc-button>
</form>
```

### Theming

The box itself is drawn by the browser via `accent-color`; only `--tc-checkbox-accent` controls its color. Surrounding label / helper / error follow the shared `--tc-input-*` tokens.

```html
<tc-checkbox
  style="--tc-checkbox-accent: #207a5b;"
  label="Match my brand"
></tc-checkbox>
```

### Accessibility

- Renders a real `<input type="checkbox">` wrapped in a `<label>` — click and keyboard activation work natively.
- `aria-invalid` reflects the error state.
- `required` is forwarded to the native input so browser validation kicks in on submit.
- Indeterminate is purely visual; the form value still tracks `checked`.
