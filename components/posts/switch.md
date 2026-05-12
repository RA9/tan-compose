---
tag: tc-switch
slug: switch
category: form fields
summary: Toggle switch — a styled, form-associated boolean control with keyboard and ARIA support.
description: tc-switch documentation — checked, disabled, error, theming, and accessibility.
importPath: "@ra9/tan-compose-kit/switch"

props:
  - name: checked
    type: boolean
    default: "false"
    description: Whether the switch is on. Reflects to the host.
  - name: name
    type: string
    default: '""'
    description: Field name for form submission.
  - name: value
    type: string
    default: '"on"'
    description: Value submitted under `name` when the switch is on.
  - name: label
    type: string
    default: '""'
    description: Text rendered next to the switch.
  - name: helper
    type: string
    default: '""'
    description: Small helper text below the row.
  - name: error
    type: string
    default: '""'
    description: Error message; the switch's `aria-invalid` flips to true.
  - name: disabled
    type: boolean
    default: "false"
    description: Disables the control; reflects to the host.

events:
  - name: tc-change
    detail: "{ checked: boolean }"
    description: Fires when the user toggles the switch (click, Space, or Enter).

slots: []

cssVars:
  - name: "--tc-switch-track-off"
    default: "var(--tc-color-rule-strong, #d9cfb8)"
    description: Track color when off.
  - name: "--tc-switch-track-on"
    default: "var(--tc-color-accent, #a16939)"
    description: Track color when on.
  - name: "--tc-switch-thumb"
    default: "var(--tc-color-surface, #ffffff)"
    description: Color of the thumb.
  - name: "--tc-switch-fg"
    default: "var(--tc-color-ink, #14171f)"
    description: Label color.
  - name: "--tc-switch-helper"
    default: "var(--tc-color-ink-muted, #6b7280)"
    description: Helper text color.
  - name: "--tc-switch-error"
    default: "var(--tc-color-danger, #b3261e)"
    description: Error message color.
  - name: "--tc-switch-font"
    default: "var(--tc-font-sans, …)"
    description: Font family.

related:
  - checkbox
  - radio-group
  - input
---

### Basic usage

<div class="stage col">
  <tc-switch label="Email notifications"></tc-switch>
  <tc-switch label="Beta features" checked></tc-switch>
</div>

```html
<tc-switch label="Email notifications"></tc-switch>
<tc-switch label="Beta features" checked></tc-switch>
```

### States

<div class="stage col">
  <tc-switch label="Off"></tc-switch>
  <tc-switch label="On" checked></tc-switch>
  <tc-switch label="Disabled" disabled></tc-switch>
  <tc-switch label="Disabled + on" disabled checked></tc-switch>
</div>

### With helper

<div class="stage col">
  <tc-switch
    label="Two-factor auth"
    helper="Requires an authenticator app installed on your phone."
  ></tc-switch>
</div>

```html
<tc-switch
  label="Two-factor auth"
  helper="Requires an authenticator app installed on your phone."
></tc-switch>
```

### Keyboard

Space and Enter both toggle the switch when it has focus. Click also works. The internal control is a `<button role="switch">` so it's reachable via Tab order.

### In a form

The switch is form-associated. It submits `value` under `name` only when on, matching native checkbox conventions.

```html
<form>
  <tc-switch name="notify" value="yes" label="Email me when this changes"></tc-switch>
  <tc-button type="submit">Save</tc-button>
</form>
```

### Theming

```html
<tc-switch
  style="--tc-switch-track-on: #207a5b;"
  label="Custom on color"
  checked
></tc-switch>
```

### Accessibility

- Built on a `<button role="switch">` with `aria-checked` reflecting state.
- Keyboard activation via Space and Enter; the `:focus-visible` ring is visible on keyboard focus.
- `aria-invalid` flips when `error` is set.
- The label is associated with the switch via a wrapping `<label>` — clicking the text also toggles.
