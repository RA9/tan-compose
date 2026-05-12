---
tag: tc-select
slug: select
category: form fields
summary: Dropdown built on the native `<select>` — pass options as a JSON array, get form submission and validity for free.
description: tc-select documentation — options array, placeholder, error state, theming, and accessibility.
importPath: "@ra9/tan-compose-kit/select"

props:
  - name: value
    type: string
    default: '""'
    description: Currently-selected option value.
  - name: name
    type: string
    default: '""'
    description: Field name for form submission.
  - name: options
    type: "Array<{ value: string; label: string; disabled?: boolean }>"
    default: "[]"
    description: Options to render. Pass as a JSON attribute or as a JS property.
  - name: placeholder
    type: string
    default: '""'
    description: When set, prepends a disabled empty option that acts as a prompt.
  - name: label
    type: string
    default: '""'
    description: Label rendered above the select.
  - name: helper
    type: string
    default: '""'
    description: Small helper text below the select.
  - name: error
    type: string
    default: '""'
    description: Error message; paints invalid when set.
  - name: disabled
    type: boolean
    default: "false"
    description: Disables the select; reflects to the host.
  - name: required
    type: boolean
    default: "false"
    description: Required for form validation; reflects to the host.

events:
  - name: tc-change
    detail: "{ value: string }"
    description: Fires when the user picks a new option.

slots: []

cssVars:
  - name: "--tc-input-bg"
    default: "var(--tc-color-surface, #ffffff)"
    description: Background.
  - name: "--tc-input-fg"
    default: "var(--tc-color-ink, #14171f)"
    description: Foreground color.
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
  - radio-group
  - checkbox
---

### Basic usage

Pass `options` as a JSON array of `{ value, label }`.

<div class="stage col">
  <tc-select
    label="Country"
    placeholder="Select one…"
    options='[{"value":"lr","label":"Liberia"},{"value":"gh","label":"Ghana"},{"value":"ng","label":"Nigeria"}]'
  ></tc-select>
</div>

```html
<tc-select
  label="Country"
  placeholder="Select one…"
  options='[
    {"value":"lr","label":"Liberia"},
    {"value":"gh","label":"Ghana"},
    {"value":"ng","label":"Nigeria"}
  ]'
></tc-select>
```

### Setting options from JS

For dynamic option lists, set `options` as a property:

```html
<tc-select id="country" label="Country" placeholder="Pick one…"></tc-select>

<script type="module">
  const el = document.getElementById("country");
  el.options = await fetchCountries(); // returns [{ value, label }, …]
</script>
```

### Preselected value

Match `value` to one of the option values to preselect.

<div class="stage col">
  <tc-select
    label="Plan"
    value="pro"
    options='[{"value":"free","label":"Free"},{"value":"pro","label":"Pro"},{"value":"team","label":"Team"}]'
  ></tc-select>
</div>

```html
<tc-select label="Plan" value="pro" options='[…]'></tc-select>
```

### Disabled options

Mark individual options unselectable with `disabled: true`.

```html
<tc-select
  label="Region"
  options='[
    {"value":"na","label":"North America"},
    {"value":"eu","label":"Europe"},
    {"value":"ap","label":"Asia Pacific","disabled":true}
  ]'
></tc-select>
```

### Error state

<div class="stage col">
  <tc-select
    label="Country"
    options='[{"value":"lr","label":"Liberia"}]'
    error="Required."
  ></tc-select>
</div>

### Theming

Shares the `--tc-input-*` family with the other form fields. The dropdown caret is positioned by the component; only the border/background tokens are themable.

### Accessibility

- Renders a real `<select>` — full native keyboard navigation (arrows, type-ahead) works.
- `aria-invalid` reflects the error state; `required` is forwarded.
- The label is associated via real `<label>` markup.
- The caret indicator is `aria-hidden` — the native select already announces "combobox" or "listbox" to screen readers.
