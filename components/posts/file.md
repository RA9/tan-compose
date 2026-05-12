---
tag: tc-file
slug: file
category: form fields
summary: File picker with a styled button + filename label. Form-associated, supports single or multiple files.
description: tc-file documentation — accept, multiple, button text, theming, and accessibility.
importPath: "@ra9/tan-compose-kit/file"

props:
  - name: name
    type: string
    default: '""'
    description: Field name used in form submission.
  - name: accept
    type: string
    default: '""'
    description: MIME type filter, same shape as the native `<input accept>` attribute.
  - name: multiple
    type: boolean
    default: "false"
    description: Allow selecting more than one file. Reflects to the host.
  - name: label
    type: string
    default: '""'
    description: Label rendered above the picker.
  - name: helper
    type: string
    default: '""'
    description: Small helper text below the picker.
  - name: error
    type: string
    default: '""'
    description: Error message; paints invalid when set.
  - name: buttonText
    type: string
    default: '"Choose file"'
    description: Text on the picker's call-to-action button.
  - name: disabled
    type: boolean
    default: "false"
    description: Disables the control; reflects to the host.
  - name: required
    type: boolean
    default: "false"
    description: Required for form validation; reflects to the host.

events:
  - name: tc-files
    detail: "{ files: File[] }"
    description: Fires after the user picks one or more files.

slots: []

cssVars:
  - name: "--tc-input-fg"
    default: "var(--tc-color-ink, #14171f)"
    description: Label color.
  - name: "--tc-input-border"
    default: "var(--tc-color-rule-strong, #d9cfb8)"
    description: Dashed zone border.
  - name: "--tc-input-error"
    default: "var(--tc-color-danger, #b3261e)"
    description: Border + error message color.
  - name: "--tc-input-helper"
    default: "var(--tc-color-ink-muted, #6b7280)"
    description: Helper text color.
  - name: "--tc-input-radius"
    default: "var(--tc-radius-md, 8px)"
    description: Corner radius.
  - name: "--tc-input-font"
    default: "var(--tc-font-sans, …)"
    description: Font family.
  - name: "--tc-file-zone-bg"
    default: "var(--tc-color-surface-alt, #faf8f3)"
    description: Background of the picker zone.
  - name: "--tc-file-zone-fg"
    default: "var(--tc-color-ink-soft, #4a5061)"
    description: Filename text color.

related:
  - input
  - button
  - textarea
---

### Basic usage

<div class="stage col">
  <tc-file label="Avatar" accept="image/*"></tc-file>
</div>

```html
<tc-file label="Avatar" accept="image/*"></tc-file>
```

### Multiple

<div class="stage col">
  <tc-file label="Photos" accept="image/*" multiple button-text="Choose photos"></tc-file>
</div>

```html
<tc-file
  label="Photos"
  accept="image/*"
  multiple
  button-text="Choose photos"
></tc-file>
```

### Custom button text

`button-text` lets you put the action verb on the control itself.

<div class="stage col">
  <tc-file label="Resume" accept=".pdf,.doc,.docx" button-text="Upload resume"></tc-file>
</div>

### Reading the picked files

```html
<tc-file id="resume" label="Resume" accept=".pdf"></tc-file>

<script type="module">
  document.getElementById("resume").addEventListener("tc-files", (e) => {
    const [file] = e.detail.files;
    console.log("picked", file.name, file.size);
  });
</script>
```

### In a form

Submits using the form-associated path — single files set `setFormValue(file)`, multiple files set a FormData with repeated entries under `name`.

```html
<form enctype="multipart/form-data">
  <tc-file name="attachment" label="Attachment"></tc-file>
  <tc-button type="submit">Send</tc-button>
</form>
```

### Theming

```html
<tc-file
  style="--tc-file-zone-bg: #f5f5dc; --tc-input-radius: 2px;"
  label="Subtle zone"
></tc-file>
```

### Accessibility

- The visible button is a real `<button>`; the native `<input type="file">` is visually hidden but kept in the DOM for form submission and assistive tech.
- The label is associated with the control via wrapping markup; clicking the label focuses the button.
- The filename text is plain text — screen readers read it after each pick.
- Note: the native file dialog is provided by the browser; styling cannot reach inside it.
