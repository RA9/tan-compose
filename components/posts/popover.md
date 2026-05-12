---
tag: tc-popover
slug: popover
category: chrome
summary: Click-triggered floating panel anchored to a slotted trigger. Outside-click and Esc close, auto-flips on overflow. Top-layer rendering.
description: tc-popover documentation — placement, dismissible, controlled, theming.
importPath: "@ra9/tan-compose-kit/popover"

props:
  - name: open
    type: boolean
    default: "false"
    description: Whether the popover is showing. Reflects to the `open` attribute.
  - name: placement
    type: '"top" | "bottom" | "left" | "right"'
    default: '"bottom"'
    description: Preferred side. Auto-flips when there isn't room.
  - name: offset
    type: number
    default: "8"
    description: Gap between trigger and panel, in pixels.
  - name: dismissible
    type: boolean
    default: "true"
    description: Close on outside click and Esc.

events:
  - name: tc-open
    detail: "—"
    description: Fires when the popover opens.
  - name: tc-close
    detail: '{ reason: "outside" | "escape" | "trigger" | "api" }'
    description: Fires when the popover closes. `reason` reports what dismissed it.

slots:
  - name: trigger
    description: The element that toggles the popover when clicked.
  - name: (default)
    description: Popover content.

cssVars:
  - name: "--tc-popover-bg"
    default: "var(--tc-color-surface, #ffffff)"
    description: Panel background.
  - name: "--tc-popover-fg"
    default: "var(--tc-color-ink, #14171f)"
    description: Panel text color.
  - name: "--tc-popover-rule"
    default: "var(--tc-color-rule, #ece5d3)"
    description: Border color.
  - name: "--tc-popover-radius"
    default: "var(--tc-radius-md, 8px)"
    description: Corner radius.
  - name: "--tc-popover-shadow"
    default: "var(--tc-shadow-lg, …)"
    description: Drop shadow.
  - name: "--tc-popover-padding"
    default: "12px 14px"
    description: Inner padding.
  - name: "--tc-popover-min-width"
    default: "200px"
    description: Minimum width.
  - name: "--tc-popover-max-width"
    default: "340px"
    description: Maximum width.

related:
  - tooltip
  - modal
  - combobox
---

### Basic

<div class="stage">
  <tc-popover>
    <tc-button slot="trigger" variant="secondary">Profile ▾</tc-button>
    <div style="display:grid;gap:8px;">
      <strong>Mia Carter</strong>
      <span style="color:var(--tc-color-ink-soft);font-size:0.84rem;">mia@example.com</span>
      <hr style="border:none;border-top:1px solid var(--tc-color-rule);margin:4px 0;">
      <a href="#" style="color:inherit;text-decoration:none;font-size:0.9rem;">Account settings</a>
      <a href="#" style="color:inherit;text-decoration:none;font-size:0.9rem;">Sign out</a>
    </div>
  </tc-popover>
</div>

```html
<tc-popover>
  <tc-button slot="trigger">Profile ▾</tc-button>
  <strong>Mia Carter</strong>
  <span>mia@example.com</span>
  <hr>
  <a href="#">Account settings</a>
  <a href="#">Sign out</a>
</tc-popover>
```

### Placement

<div class="stage" style="display:flex;gap:16px;flex-wrap:wrap;">
  <tc-popover placement="top">
    <tc-button slot="trigger" variant="secondary">Top</tc-button>
    <span>Above</span>
  </tc-popover>
  <tc-popover placement="bottom">
    <tc-button slot="trigger" variant="secondary">Bottom</tc-button>
    <span>Below</span>
  </tc-popover>
  <tc-popover placement="left">
    <tc-button slot="trigger" variant="secondary">Left</tc-button>
    <span>Left of</span>
  </tc-popover>
  <tc-popover placement="right">
    <tc-button slot="trigger" variant="secondary">Right</tc-button>
    <span>Right of</span>
  </tc-popover>
</div>

### Filter form

Popovers shine for compact forms anchored to a trigger — date pickers, filter pills, formatting toolbars.

<div class="stage">
  <tc-popover>
    <tc-button slot="trigger">Filter</tc-button>
    <div style="display:grid;gap:10px;min-width:240px;">
      <strong style="font-size:0.84rem;letter-spacing:0.04em;text-transform:uppercase;color:var(--tc-color-ink-muted);">Status</strong>
      <label style="display:flex;align-items:center;gap:8px;"><input type="checkbox" checked> Active</label>
      <label style="display:flex;align-items:center;gap:8px;"><input type="checkbox"> Pending</label>
      <label style="display:flex;align-items:center;gap:8px;"><input type="checkbox"> Archived</label>
      <hr style="border:none;border-top:1px solid var(--tc-color-rule);margin:4px 0;">
      <div style="display:flex;gap:8px;justify-content:flex-end;">
        <tc-button variant="ghost" size="sm">Reset</tc-button>
        <tc-button size="sm">Apply</tc-button>
      </div>
    </div>
  </tc-popover>
</div>

### Non-dismissible

Use `dismissible="false"` for confirmation flows where you want the user to make a choice rather than dismiss by clicking away.

```html
<tc-popover dismissible="false" id="confirmDelete">
  <tc-button slot="trigger" variant="danger">Delete row…</tc-button>
  <div style="display:grid;gap:10px;">
    <p>This can't be undone.</p>
    <div style="display:flex;gap:8px;justify-content:flex-end;">
      <tc-button variant="ghost" size="sm" onclick="this.closest('tc-popover').open=false">Cancel</tc-button>
      <tc-button variant="danger" size="sm">Delete</tc-button>
    </div>
  </div>
</tc-popover>
```

### Controlled

```html
<tc-popover id="menu">
  <tc-button slot="trigger">Open</tc-button>
  <div>…</div>
</tc-popover>

<script>
  const p = document.getElementById("menu");
  document.querySelector("#external").addEventListener("click", () => {
    p.open = !p.open;
  });
  p.addEventListener("tc-close", (e) => console.log("closed because:", e.detail.reason));
</script>
```

### Accessibility

- The panel has `role="dialog"`. Use it for short interactive surfaces. For long-form modal flows, prefer `<tc-modal>`.
- `Esc` and outside click both close (unless `dismissible="false"`).
- Trigger uses any element you slot in. Make sure it's a real `<button>` or has `role="button"` and `tabindex="0"` for keyboard activation.
- The popover renders in the browser top-layer, so it sits above `transform`, `backdrop-filter`, and `overflow: hidden` ancestors.

### Theming

```html
<tc-popover
  style="
    --tc-popover-bg: #14171f;
    --tc-popover-fg: #f5f5f5;
    --tc-popover-rule: #2a2f3a;
    --tc-popover-radius: 12px;
    --tc-popover-padding: 16px;
  "
>
  <tc-button slot="trigger">Dark popover</tc-button>
  <div>Inverted surface.</div>
</tc-popover>
```
