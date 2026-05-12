---
tag: tc-tabs
slug: tabs
category: chrome
summary: Accessible tablist with one named slot per panel. Supports controlled and uncontrolled modes.
description: tc-tabs documentation — tab list, panel slots, controlled mode, keyboard, theming, and accessibility.
importPath: "@ra9/tan-compose-kit/tabs"

props:
  - name: tabs
    type: "Array<{ id: string; label: string }>"
    default: "[]"
    description: The tab definitions. Each `id` corresponds to a named slot.
  - name: active
    type: string
    default: "(first tab's id)"
    description: The currently-active tab id. Reflects to the host. Read or set to control externally.

events:
  - name: tc-tab-change
    detail: "{ active: string, previous: string }"
    description: Fires when the user changes tabs (click or keyboard).

slots:
  - name: "(per tab id)"
    description: "One named slot per tab. For a tab with `id: \"overview\"`, place content in `<div slot=\"overview\">…</div>`."

cssVars:
  - name: "--tc-tabs-fg"
    default: "var(--tc-color-ink, #14171f)"
    description: Active tab + panel text color.
  - name: "--tc-tabs-fg-muted"
    default: "var(--tc-color-ink-muted, #6b7280)"
    description: Inactive tab color.
  - name: "--tc-tabs-rule"
    default: "var(--tc-color-rule, #ece5d3)"
    description: Bottom rule of the tab strip.
  - name: "--tc-tabs-accent"
    default: "var(--tc-color-accent, #a16939)"
    description: Active tab color + underline.
  - name: "--tc-tabs-font"
    default: "var(--tc-font-sans, …)"
    description: Font family.

related:
  - card
  - modal
  - toc
---

### Basic usage

Define your tabs with `tabs`, then slot panel content by id.

<div class="stage col">
  <tc-tabs tabs='[{"id":"overview","label":"Overview"},{"id":"props","label":"Props"},{"id":"events","label":"Events"}]'>
    <div slot="overview">A summary of what this thing does.</div>
    <div slot="props">A list of props.</div>
    <div slot="events">A list of events.</div>
  </tc-tabs>
</div>

```html
<tc-tabs tabs='[
  {"id":"overview","label":"Overview"},
  {"id":"props","label":"Props"},
  {"id":"events","label":"Events"}
]'>
  <div slot="overview">A summary of what this thing does.</div>
  <div slot="props">A list of props.</div>
  <div slot="events">A list of events.</div>
</tc-tabs>
```

### Controlled mode

`active` reflects to an attribute, so you can drive the component from the outside.

```html
<tc-tabs id="t" tabs='[…]' active="props">…</tc-tabs>

<script type="module">
  const el = document.getElementById("t");
  el.addEventListener("tc-tab-change", (e) => {
    console.log("switched", e.detail.previous, "→", e.detail.active);
  });

  // Switch programmatically:
  el.active = "events";
</script>
```

### Default tab

Omit `active` and the first tab in the array is shown.

```html
<tc-tabs tabs='[{"id":"a","label":"A"},{"id":"b","label":"B"}]'>
  <div slot="a">Shown by default.</div>
  <div slot="b">Click to see this.</div>
</tc-tabs>
```

### Theming

```html
<tc-tabs
  style="--tc-tabs-accent: #2b6cb0;"
  tabs='[…]'
>…</tc-tabs>
```

### Accessibility

- Real `role="tablist"` + `role="tab"` + `role="tabpanel"` structure; `aria-selected` and `aria-controls` are wired up correctly.
- Roving focus is implemented via `tabindex` — only the active tab is in the tab order; arrow keys move focus and selection between tabs.
- Home / End jump to the first / last tab. Left / Right wrap at the ends.
- Inactive panels use the `hidden` attribute so screen readers skip them.
