---
tag: tc-textarea
slug: textarea
category: form fields
summary: Multi-line form-associated text area with label, helper, error state, and configurable rows and resize behavior.
description: tc-textarea documentation — rows, resize, error state, theming, and accessibility.
importPath: "@ra9/tan-compose-kit/textarea"

props:
  - name: value
    type: string
    default: '""'
    description: Current value. Two-way synced with the underlying textarea.
  - name: name
    type: string
    default: '""'
    description: Field name used when submitted as part of a `<form>`.
  - name: placeholder
    type: string
    default: '""'
    description: Placeholder text shown when the textarea is empty.
  - name: label
    type: string
    default: '""'
    description: Label rendered above the textarea.
  - name: helper
    type: string
    default: '""'
    description: Small helper text below the textarea.
  - name: error
    type: string
    default: '""'
    description: Error message; when non-empty paints the textarea invalid.
  - name: rows
    type: number
    default: "4"
    description: Initial visible row count.
  - name: disabled
    type: boolean
    default: "false"
    description: Disables the textarea; reflects to the host.
  - name: required
    type: boolean
    default: "false"
    description: Required for form validation; reflects to the host.
  - name: resize
    type: '"none" | "vertical" | "horizontal" | "both"'
    default: '"vertical"'
    description: CSS resize behavior passed to the underlying textarea.

events:
  - name: tc-input
    detail: "{ value: string }"
    description: Fires on every keystroke with the latest value.

slots: []

cssVars:
  - name: "--tc-input-bg"
    default: "var(--tc-color-surface, #ffffff)"
    description: Background color.
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
  - input
  - select
  - checkbox
---

### Basic usage

<div class="stage col">
  <tc-textarea label="Notes" placeholder="What did you find?" rows="4"></tc-textarea>
</div>

```html
<tc-textarea
  label="Notes"
  placeholder="What did you find?"
  rows="4"
></tc-textarea>
```

### Rows + resize

`rows` sets the initial height. `resize` controls whether the user can drag the bottom corner — set to `"none"` to lock the height entirely.

<div class="stage col">
  <tc-textarea label="Short" rows="2" resize="none" placeholder="Locked at 2 rows."></tc-textarea>
  <tc-textarea label="Tall" rows="6" placeholder="6 rows; users can resize vertically."></tc-textarea>
</div>

```html
<tc-textarea label="Short" rows="2" resize="none"></tc-textarea>
<tc-textarea label="Tall" rows="6" resize="vertical"></tc-textarea>
```

### Error state

<div class="stage col">
  <tc-textarea label="Bio" value="x" error="Tell us more — at least 30 characters."></tc-textarea>
</div>

```html
<tc-textarea
  label="Bio"
  error="Tell us more — at least 30 characters."
></tc-textarea>
```

### In a form

Submits under `name` like a native textarea.

```html
<form>
  <tc-textarea name="feedback" label="Feedback" required></tc-textarea>
  <tc-button type="submit">Send</tc-button>
</form>
```

### Theming

`tc-textarea` shares the `--tc-input-*` token family with the other form fields. Override on a wrapper to re-skin every field at once.

```html
<div style="--tc-input-radius: 2px; --tc-input-border-focus: #333;">
  <tc-textarea label="Feedback" rows="5"></tc-textarea>
</div>
```

### Accessibility

- Renders a real `<textarea>` so all native keyboard behavior (Enter for newline, Tab to next field) works.
- `aria-invalid` reflects the error state.
- The label is a real `<label>` so click-to-focus works without extra wiring.
- `required` is forwarded for native browser validation.
