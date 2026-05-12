---
tag: tc-input
slug: input
category: form fields
summary: Form-associated text input with label, helper text, error state, and the full validity API.
description: tc-input documentation — types, labels, helper and error states, theming, and accessibility.
importPath: "@ra9/tan-compose-kit/input"

props:
  - name: value
    type: string
    default: '""'
    description: Current value. Two-way synced with the underlying input as the user types.
  - name: name
    type: string
    default: '""'
    description: Field name used when submitted as part of a `<form>`.
  - name: type
    type: '"text" | "email" | "password" | "number" | "search" | "tel" | "url"'
    default: '"text"'
    description: Native input type forwarded to the underlying `<input>`.
  - name: placeholder
    type: string
    default: '""'
    description: Placeholder text shown when the input is empty.
  - name: label
    type: string
    default: '""'
    description: Label rendered above the input. Pair with `required` to show a red star.
  - name: helper
    type: string
    default: '""'
    description: Small helper text below the input. Hidden when `error` is set.
  - name: error
    type: string
    default: '""'
    description: Error message; when non-empty paints the input invalid and replaces the helper.
  - name: disabled
    type: boolean
    default: "false"
    description: Disables the input; reflects to the host attribute.
  - name: required
    type: boolean
    default: "false"
    description: Marks the field required for form validation; reflects to the host attribute.

events:
  - name: tc-input
    detail: "{ value: string }"
    description: Fires on every keystroke with the latest value.

slots: []

cssVars:
  - name: "--tc-input-bg"
    default: "var(--tc-color-surface, #ffffff)"
    description: Background color of the input.
  - name: "--tc-input-fg"
    default: "var(--tc-color-ink, #14171f)"
    description: Foreground (text) color.
  - name: "--tc-input-border"
    default: "var(--tc-color-rule-strong, #d9cfb8)"
    description: Resting border color.
  - name: "--tc-input-border-focus"
    default: "var(--tc-color-accent, #a16939)"
    description: Border color when focused.
  - name: "--tc-input-error"
    default: "var(--tc-color-danger, #b3261e)"
    description: Border + text color in the error state.
  - name: "--tc-input-helper"
    default: "var(--tc-color-ink-muted, #6b7280)"
    description: Color of the helper text.
  - name: "--tc-input-radius"
    default: "var(--tc-radius-md, 8px)"
    description: Corner radius.
  - name: "--tc-input-font"
    default: "var(--tc-font-sans, …)"
    description: Font family.

related:
  - textarea
  - select
  - checkbox
---

### Basic usage

A labelled input with helper text. The label, helper, and error are all props — no extra markup.

<div class="stage col">
  <tc-input label="Full name" placeholder="Carlos Nah" helper="As it appears on your ID."></tc-input>
</div>

```html
<tc-input
  label="Full name"
  placeholder="Carlos Nah"
  helper="As it appears on your ID."
></tc-input>
```

### Types

The `type` prop forwards to the native input so you get the right keyboard on mobile and the right validity rules in a form.

<div class="stage col">
  <tc-input type="email" label="Email" placeholder="you@example.com"></tc-input>
  <tc-input type="password" label="Password" placeholder="••••••••"></tc-input>
  <tc-input type="number" label="Quantity" value="1"></tc-input>
</div>

```html
<tc-input type="email" label="Email" required></tc-input>
<tc-input type="password" label="Password" required></tc-input>
```

### Error state

Set `error` to a message and the input paints invalid. The helper is hidden while the error is set.

<div class="stage col">
  <tc-input label="Email" value="not-an-email" error="That doesn't look like an email."></tc-input>
</div>

```html
<tc-input
  label="Email"
  value="not-an-email"
  error="That doesn't look like an email."
></tc-input>
```

### In a form

`tc-input` is form-associated. It submits under its `name` and participates in reset.

```html
<form>
  <tc-input name="email" type="email" label="Email" required></tc-input>
  <tc-button type="submit">Save</tc-button>
</form>
```

### Theming

Every variable above can be overridden on a parent or on the host. The `--tc-input-*` tokens are shared with `tc-textarea`, `tc-select`, `tc-checkbox`, `tc-radio-group`, and `tc-file` so re-skinning one re-skins them all.

```html
<tc-input
  style="--tc-input-border-focus: #2b6cb0; --tc-input-radius: 4px;"
  label="Custom focus ring"
></tc-input>
```

### Accessibility

- Renders a real `<input>` with `aria-invalid` reflecting the error state.
- The label is associated visually but uses `<label>` markup; click-to-focus works without extra wiring.
- `required` is forwarded to the native input so the browser's built-in validation messages apply.
- The red asterisk next to the label is `aria-hidden`; screen readers announce required state from the input itself.
