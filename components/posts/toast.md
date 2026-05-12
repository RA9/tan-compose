---
tag: tc-toast
slug: toast
category: chrome
summary: Auto-dismissing notification with four variants. Inline rendering — positioning is the page's job.
description: tc-toast documentation — variants, duration, dismiss, theming, and accessibility.
importPath: "@ra9/tan-compose-kit/toast"

props:
  - name: open
    type: boolean
    default: "false"
    description: Whether the toast is visible. Reflects to the host. Set to `true` to show.
  - name: variant
    type: '"info" | "success" | "warning" | "error"'
    default: '"info"'
    description: Visual style and icon.
  - name: message
    type: string
    default: '""'
    description: The message text. Falls back to slotted content if empty.
  - name: duration
    type: number
    default: "4000"
    description: Auto-dismiss in milliseconds. Set to `0` to disable auto-dismiss.
  - name: dismissible
    type: boolean
    default: "true"
    description: Show a close button.

events:
  - name: tc-toast-close
    detail: '{ reason: "timeout" | "button" | "api" }'
    description: Fires when the toast closes.

slots:
  - name: (default)
    description: Rich content. Used when `message` is empty.

cssVars:
  - name: "--tc-toast-info"
    default: "var(--tc-color-info, #3a5b8c)"
    description: Info variant background.
  - name: "--tc-toast-success"
    default: "var(--tc-color-success, #207a5b)"
    description: Success variant background.
  - name: "--tc-toast-warning"
    default: "var(--tc-color-warning, #a87326)"
    description: Warning variant background.
  - name: "--tc-toast-error"
    default: "var(--tc-color-danger, #b3261e)"
    description: Error variant background.
  - name: "--tc-toast-fg"
    default: "var(--tc-color-surface, #ffffff)"
    description: Foreground (text + icon) color.
  - name: "--tc-toast-radius"
    default: "var(--tc-radius-lg, 10px)"
    description: Corner radius.
  - name: "--tc-toast-shadow"
    default: "var(--tc-shadow-lg, …)"
    description: Drop shadow.
  - name: "--tc-toast-font"
    default: "var(--tc-font-sans, …)"
    description: Font family.

related:
  - modal
  - callout
  - badge
---

### Variants

<div class="stage col">
  <tc-toast open variant="info" message="New version available."></tc-toast>
  <tc-toast open variant="success" message="Changes saved."></tc-toast>
  <tc-toast open variant="warning" message="Approaching your storage limit."></tc-toast>
  <tc-toast open variant="error" message="Couldn't reach the server."></tc-toast>
</div>

```html
<tc-toast open variant="success" message="Changes saved."></tc-toast>
<tc-toast open variant="error" message="Couldn't reach the server."></tc-toast>
```

### Auto-dismiss

The default `duration` is 4 seconds. Set it to `0` to keep the toast open until the user closes it (or your code does).

```html
<tc-toast open variant="info" duration="0" message="Sticky until dismissed."></tc-toast>
```

### Slot content

When `message` is empty, the default slot is used instead — useful for embedding links or formatting.

```html
<tc-toast open variant="success">
  Saved. <a href="/posts/123">View post</a>
</tc-toast>
```

### Programmatic show/hide

Toasts position themselves wherever you put them in the DOM. A common pattern is a fixed container in the corner that you append toasts to.

```html
<div id="toast-area" style="position:fixed; top:20px; right:20px; z-index:50;"></div>

<script type="module">
  function notify(variant, message) {
    const t = document.createElement("tc-toast");
    t.variant = variant;
    t.message = message;
    t.open = true;
    t.addEventListener("tc-toast-close", () => t.remove());
    document.getElementById("toast-area").appendChild(t);
  }

  notify("success", "Saved.");
</script>
```

### Theming

```html
<tc-toast
  open
  variant="success"
  style="--tc-toast-radius: 999px;"
  message="Pill toast"
></tc-toast>
```

### Accessibility

- The toast has `role="status"` and `aria-live="polite"` so screen readers announce new content without interrupting.
- The close button has an `aria-label="Close"`.
- Auto-dismiss can be a problem for users who need more time — set `duration="0"` for important messages, or extend it generously when the toast contains an action.
- The icon is `aria-hidden`; the message text carries the meaning.
