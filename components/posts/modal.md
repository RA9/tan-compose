---
tag: tc-modal
slug: modal
category: chrome
summary: Modal dialog backed by the native `<dialog>` element. Built-in focus trap, Escape to close, and backdrop dismiss.
description: tc-modal documentation — open/close, dismissible, slots, theming, and accessibility.
importPath: "@ra9/tan-compose-kit/modal"

props:
  - name: open
    type: boolean
    default: "false"
    description: Whether the dialog is open. Reflects to the host. Set to `true` to show, `false` to close.
  - name: title
    type: string
    default: '""'
    description: Optional header title. When empty, the header bar is omitted unless `dismissible` is true.
  - name: dismissible
    type: boolean
    default: "true"
    description: Allow Escape and backdrop click to close. Disable for confirmation flows that require an explicit choice.
  - name: width
    type: string
    default: '"min(560px, 92vw)"'
    description: Dialog width. Any CSS length.

events:
  - name: tc-close
    detail: '{ reason: "backdrop" | "escape" | "button" | "api" }'
    description: Fires when the dialog is closed, with the trigger that caused it.

slots:
  - name: (default)
    description: Main body content.
  - name: footer
    description: Action row (e.g. Cancel / Confirm buttons). Rendered with a divider above when present.

cssVars:
  - name: "--tc-modal-surface"
    default: "var(--tc-color-surface, #ffffff)"
    description: Dialog background.
  - name: "--tc-modal-ink"
    default: "var(--tc-color-ink, #14171f)"
    description: Body text color.
  - name: "--tc-modal-rule"
    default: "var(--tc-color-rule, #ece5d3)"
    description: Header + footer divider.
  - name: "--tc-modal-soft"
    default: "var(--tc-color-ink-soft, #5a6072)"
    description: Close-button color.
  - name: "--tc-modal-radius"
    default: "var(--tc-radius-lg, 12px)"
    description: Corner radius.
  - name: "--tc-modal-backdrop"
    default: "rgba(20, 23, 31, 0.5)"
    description: Backdrop tint.
  - name: "--tc-modal-shadow"
    default: "var(--tc-shadow-lg, …)"
    description: Dialog drop shadow.
  - name: "--tc-modal-font"
    default: "var(--tc-font-sans, …)"
    description: Font family.

related:
  - toast
  - button
  - card
---

### Basic usage

Toggle `open` to show or hide. The dialog renders into the top layer, above everything else.

```html
<tc-button id="open-confirm">Delete</tc-button>

<tc-modal id="confirm" title="Delete this post?">
  <p>This action is permanent. The post will be removed from your blog and feed.</p>
  <div slot="footer">
    <tc-button variant="ghost" id="cancel">Cancel</tc-button>
    <tc-button variant="danger" id="confirm-btn">Delete</tc-button>
  </div>
</tc-modal>

<script type="module">
  const dlg = document.getElementById("confirm");
  document.getElementById("open-confirm").addEventListener("click", () => {
    dlg.open = true;
  });
  document.getElementById("cancel").addEventListener("click", () => {
    dlg.open = false;
  });
</script>
```

### Without a title

Omit `title` for plain prompts. The close button still appears when `dismissible` is true.

```html
<tc-modal open>
  <p>Saved.</p>
</tc-modal>
```

### Non-dismissible

For destructive confirmations or required terms-of-service prompts, disable Escape and backdrop closing:

```html
<tc-modal open title="Confirm" dismissible="false">
  <p>You must accept the new terms to continue.</p>
  <div slot="footer">
    <tc-button variant="primary" id="accept">Accept</tc-button>
  </div>
</tc-modal>
```

### Custom width

```html
<tc-modal open title="Wide modal" width="min(880px, 95vw)">
  <p>For data tables, embedded code, etc.</p>
</tc-modal>
```

### Listening for the close reason

```html
<tc-modal id="m" title="…">…</tc-modal>

<script type="module">
  document.getElementById("m").addEventListener("tc-close", (e) => {
    console.log("closed by", e.detail.reason);
  });
</script>
```

### Theming

```html
<tc-modal
  style="--tc-modal-radius: 4px; --tc-modal-backdrop: rgba(0,0,0,0.7);"
  open
  title="Sharper edges"
>…</tc-modal>
```

### Accessibility

- Built on the native `<dialog>` element with `showModal()`, so the browser provides focus trapping inside the dialog and inert-ifies the rest of the page.
- Escape dismisses the dialog when `dismissible` is true. The close button has an `aria-label="Close"`.
- The dialog has `aria-labelledby` pointing at the title when present.
- Focus returns to the previously-focused element when the dialog closes — handled by the native dialog API.
