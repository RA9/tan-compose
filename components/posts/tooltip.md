---
tag: tc-tooltip
slug: tooltip
category: chrome
summary: Hover or focus tooltip anchored to a slotted trigger. Auto-flips when it would overflow. Renders in the top-layer via the popover API.
description: tc-tooltip documentation — placement, delay, rich content, keyboard, theming.
importPath: "@ra9/tan-compose-kit/tooltip"

props:
  - name: text
    type: string
    default: '""'
    description: Short tooltip text. For rich content, use the `content` slot instead.
  - name: placement
    type: '"top" | "bottom" | "left" | "right"'
    default: '"top"'
    description: Preferred side. The tooltip auto-flips to the opposite side if it doesn't fit.
  - name: delay
    type: number
    default: "200"
    description: Open delay in milliseconds. Prevents flicker on quick pointer crossings.
  - name: offset
    type: number
    default: "8"
    description: Gap between the trigger and the tooltip, in pixels.
  - name: disabled
    type: boolean
    default: "false"
    description: Suppress the tooltip without removing it from the DOM.

events: []

slots:
  - name: (default)
    description: The trigger element. Tooltips fire on `pointerenter` and `focusin` of the host.
  - name: content
    description: Rich tooltip body. Overrides the `text` prop.

cssVars:
  - name: "--tc-tooltip-bg"
    default: "var(--tc-color-ink, #14171f)"
    description: Tooltip background.
  - name: "--tc-tooltip-fg"
    default: "var(--tc-color-surface, #ffffff)"
    description: Tooltip text color.
  - name: "--tc-tooltip-radius"
    default: "var(--tc-radius-sm, 6px)"
    description: Corner radius.
  - name: "--tc-tooltip-padding"
    default: "6px 10px"
    description: Padding inside the tooltip.
  - name: "--tc-tooltip-max-width"
    default: "240px"
    description: Wrap text after this width.
  - name: "--tc-tooltip-shadow"
    default: "0 10px 30px rgba(0, 0, 0, 0.25)"
    description: Drop shadow.
  - name: "--tc-tooltip-font"
    default: "var(--tc-font-sans, …)"
    description: Font family.

related:
  - popover
  - modal
  - badge
---

### Basic

<div class="stage">
  <tc-tooltip text="Copy to clipboard">
    <tc-button variant="ghost">Copy</tc-button>
  </tc-tooltip>
  &nbsp;
  <tc-tooltip text="Delete this row. This can't be undone.">
    <tc-button variant="danger">Delete</tc-button>
  </tc-tooltip>
</div>

```html
<tc-tooltip text="Copy to clipboard">
  <tc-button variant="ghost">Copy</tc-button>
</tc-tooltip>
```

### Placement

<div class="stage" style="display:flex;gap:16px;flex-wrap:wrap;">
  <tc-tooltip text="Top tooltip" placement="top"><tc-button variant="secondary">Top</tc-button></tc-tooltip>
  <tc-tooltip text="Bottom tooltip" placement="bottom"><tc-button variant="secondary">Bottom</tc-button></tc-tooltip>
  <tc-tooltip text="Left tooltip" placement="left"><tc-button variant="secondary">Left</tc-button></tc-tooltip>
  <tc-tooltip text="Right tooltip" placement="right"><tc-button variant="secondary">Right</tc-button></tc-tooltip>
</div>

```html
<tc-tooltip text="…" placement="bottom">…</tc-tooltip>
```

### Rich content

Use the `content` slot for tooltips with formatting, multiple lines, or icons. Keep them short — tooltips are for hints, not paragraphs.

<div class="stage">
  <tc-tooltip placement="bottom">
    <tc-button variant="secondary">Hover for shortcut</tc-button>
    <div slot="content" style="display:flex;align-items:center;gap:8px;">
      <span>Save</span>
      <kbd style="font-family:var(--tc-font-mono,monospace);font-size:0.7rem;background:rgba(255,255,255,0.15);padding:1px 6px;border-radius:3px;">⌘S</kbd>
    </div>
  </tc-tooltip>
</div>

```html
<tc-tooltip placement="bottom">
  <button>Save</button>
  <div slot="content">
    <span>Save</span>
    <kbd>⌘S</kbd>
  </div>
</tc-tooltip>
```

### Delay

Set `delay="0"` for instant tooltips on data-dense UIs, or raise it for less aggressive hints.

<div class="stage">
  <tc-tooltip text="Instant" delay="0"><tc-button>0ms</tc-button></tc-tooltip>
  &nbsp;
  <tc-tooltip text="Default" delay="200"><tc-button>200ms</tc-button></tc-tooltip>
  &nbsp;
  <tc-tooltip text="Patient" delay="600"><tc-button>600ms</tc-button></tc-tooltip>
</div>

### Accessibility

- Trigger on pointer hover and on keyboard focus, so keyboard users get parity with mouse users.
- `Esc` dismisses while the tooltip is open and the trigger has focus.
- The tooltip carries `role="tooltip"`. For announceable tooltips, give the trigger an `aria-describedby` pointing to a labelled live region if you need stronger semantics — the popover model defers to the browser for now.
- The tooltip auto-flips when its preferred side would push it past the viewport edge.

### Theming

```html
<tc-tooltip
  text="Custom palette"
  style="
    --tc-tooltip-bg: #ffe7b0;
    --tc-tooltip-fg: #2b1d00;
    --tc-tooltip-radius: 10px;
    --tc-tooltip-padding: 8px 12px;
  "
>
  <tc-button variant="ghost">Hover</tc-button>
</tc-tooltip>
```
