---
tag: tc-drawer
slug: drawer
category: chrome
summary: Side sheet that slides in from any edge, backed by `<dialog>`. Backdrop, Esc, focus management — same primitives as the modal.
description: tc-drawer documentation — sides, sizing, headers, footers, theming.
importPath: "@ra9/tan-compose-kit/drawer"

props:
  - name: open
    type: boolean
    default: "false"
    description: Whether the drawer is showing. Reflects to the `open` attribute.
  - name: side
    type: '"left" | "right" | "top" | "bottom"'
    default: '"right"'
    description: Which edge the drawer slides in from.
  - name: size
    type: string
    default: '"min(420px, 92vw)"'
    description: Drawer width for left / right; height for top / bottom. Any CSS length.
  - name: dismissible
    type: boolean
    default: "true"
    description: Backdrop click and Esc dismiss.
  - name: title
    type: string
    default: '""'
    description: Optional header title.

events:
  - name: tc-close
    detail: '{ reason: "backdrop" | "escape" | "button" | "api" }'
    description: Fires when the drawer closes. `reason` reports what dismissed it.

slots:
  - name: (default)
    description: Drawer body content.
  - name: footer
    description: Optional action footer (buttons, etc.).

cssVars:
  - name: "--tc-drawer-bg"
    default: "var(--tc-color-surface, #ffffff)"
    description: Drawer background.
  - name: "--tc-drawer-ink"
    default: "var(--tc-color-ink, #14171f)"
    description: Body text color.
  - name: "--tc-drawer-rule"
    default: "var(--tc-color-rule, #ece5d3)"
    description: Divider color.
  - name: "--tc-drawer-shadow"
    default: "var(--tc-shadow-lg, …)"
    description: Outer shadow.
  - name: "--tc-drawer-backdrop"
    default: "rgba(20, 23, 31, 0.5)"
    description: Backdrop dim color.
  - name: "--tc-drawer-duration"
    default: "260ms"
    description: Slide-in / out duration.

related:
  - modal
  - popover
  - toast
---

### Right (default)

<div class="stage">
  <tc-button id="d-right">Open drawer →</tc-button>
  <tc-drawer id="drawer-right" title="Filters">
    <div style="display:grid;gap:12px;">
      <label>Search<br><tc-input placeholder="Keyword…"></tc-input></label>
      <label>Status<br><tc-select options='[{"value":"active","label":"Active"},{"value":"archived","label":"Archived"}]'></tc-select></label>
      <label><input type="checkbox"> Include children</label>
    </div>
    <div slot="footer">
      <tc-button variant="ghost" onclick="document.getElementById('drawer-right').open=false">Cancel</tc-button>
      <tc-button onclick="document.getElementById('drawer-right').open=false">Apply</tc-button>
    </div>
  </tc-drawer>
</div>

<script>
  document.getElementById("d-right")?.addEventListener("click", () => {
    document.getElementById("drawer-right").open = true;
  });
</script>

```html
<tc-button id="trigger">Filters</tc-button>
<tc-drawer id="drawer" title="Filters">
  <div>…body…</div>
  <div slot="footer">
    <tc-button variant="ghost">Cancel</tc-button>
    <tc-button>Apply</tc-button>
  </div>
</tc-drawer>

<script>
  document.getElementById("trigger").onclick = () =>
    document.getElementById("drawer").open = true;
</script>
```

### Left

<div class="stage">
  <tc-button id="d-left">Open from left</tc-button>
  <tc-drawer id="drawer-left" side="left" title="Navigation">
    <nav style="display:grid;gap:6px;">
      <a href="#" style="color:inherit;text-decoration:none;padding:8px 4px;">Dashboard</a>
      <a href="#" style="color:inherit;text-decoration:none;padding:8px 4px;">Projects</a>
      <a href="#" style="color:inherit;text-decoration:none;padding:8px 4px;">Team</a>
      <a href="#" style="color:inherit;text-decoration:none;padding:8px 4px;">Settings</a>
    </nav>
  </tc-drawer>
</div>

<script>
  document.getElementById("d-left")?.addEventListener("click", () => {
    document.getElementById("drawer-left").open = true;
  });
</script>

```html
<tc-drawer side="left" title="Navigation">
  <nav>…</nav>
</tc-drawer>
```

### Bottom

<div class="stage">
  <tc-button id="d-bottom">Open from bottom</tc-button>
  <tc-drawer id="drawer-bottom" side="bottom" size="min(360px, 60vh)" title="Quick add">
    <p>This pattern works well on mobile for action sheets and quick forms.</p>
  </tc-drawer>
</div>

<script>
  document.getElementById("d-bottom")?.addEventListener("click", () => {
    document.getElementById("drawer-bottom").open = true;
  });
</script>

```html
<tc-drawer side="bottom" size="min(360px, 60vh)">
  <p>…</p>
</tc-drawer>
```

### Programmatic

```js
const d = document.querySelector("tc-drawer");
d.open = true;
d.addEventListener("tc-close", (e) => {
  console.log("drawer closed because:", e.detail.reason);
});
```

### Accessibility

- Built on the native `<dialog>` element with `showModal()` — focus is trapped and Esc dismisses for free.
- Backdrop click closes when `dismissible` is true. Disable for confirmation flows.
- The body region scrolls independently; the header and footer stay pinned.
- Drawers respect `prefers-reduced-motion: reduce` and skip the slide transition.

### Theming

```html
<tc-drawer
  style="
    --tc-drawer-bg: #0b0c10;
    --tc-drawer-ink: #f3f3f3;
    --tc-drawer-rule: #1c1f26;
    --tc-drawer-backdrop: rgba(0, 0, 0, 0.7);
  "
>
  <p>Dark drawer</p>
</tc-drawer>
```
