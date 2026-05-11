---
tag: tc-button
slug: button
category: form fields
summary: A styled button with variants, sizes, disabled and loading states — and renders as an anchor when given an href.
description: tc-button documentation — variants, sizes, anchor mode, theming, and accessibility.
importPath: "@ra9/tan-compose-kit/button"

props:
  - name: variant
    type: '"primary" | "secondary" | "ghost" | "danger"'
    default: '"primary"'
    description: Visual style preset.
  - name: size
    type: '"sm" | "md" | "lg"'
    default: '"md"'
    description: Padding and font scale.
  - name: disabled
    type: boolean
    default: "false"
    description: Disables the control; reflects to the host attribute.
  - name: loading
    type: boolean
    default: "false"
    description: Shows a spinner and disables interaction.
  - name: block
    type: boolean
    default: "false"
    description: Full-width modifier.
  - name: href
    type: string
    default: '""'
    description: When non-empty, renders an <a> with this href instead of a <button>.
  - name: target
    type: string
    default: '""'
    description: Anchor target. target="_blank" auto-adds rel="noopener".
  - name: rel
    type: string
    default: '""'
    description: Anchor rel attribute. Only applies when href is set.

events:
  - name: click
    detail: native MouseEvent
    description: Fires on user click. Disabled buttons and disabled anchors do not fire it.

slots:
  - name: (default)
    description: Button label content. Pass text, icons, or both.

cssVars:
  - name: "--tc-btn-primary-bg"
    default: "var(--tc-color-ink, #14171f)"
    description: Primary background.
  - name: "--tc-btn-primary-fg"
    default: "var(--tc-color-surface, #ffffff)"
    description: Primary foreground.
  - name: "--tc-btn-secondary-bg"
    default: "var(--tc-color-surface, #ffffff)"
    description: Secondary background.
  - name: "--tc-btn-secondary-fg"
    default: "var(--tc-color-ink, #14171f)"
    description: Secondary foreground.
  - name: "--tc-btn-secondary-border"
    default: "var(--tc-color-rule-strong, #d9cfb8)"
    description: Secondary border color.
  - name: "--tc-btn-ghost-fg"
    default: "var(--tc-color-ink, #14171f)"
    description: Ghost text color.
  - name: "--tc-btn-ghost-border"
    default: "transparent"
    description: Ghost border (transparent by default; set to draw an outline).
  - name: "--tc-btn-danger-bg"
    default: "var(--tc-color-danger, #b3261e)"
    description: Danger background.
  - name: "--tc-btn-danger-fg"
    default: "var(--tc-color-surface, #ffffff)"
    description: Danger foreground.
  - name: "--tc-btn-radius"
    default: "var(--tc-radius-md, 8px)"
    description: Corner radius.
  - name: "--tc-btn-font"
    default: "var(--tc-font-sans, …)"
    description: Font family.

related:
  - input
  - pagination
  - toast
---

### Variants

Four built-in styles. Pick the one that matches the action's emphasis.

<div class="stage">
  <tc-button variant="primary">Primary</tc-button>
  <tc-button variant="secondary">Secondary</tc-button>
  <tc-button variant="ghost">Ghost</tc-button>
  <tc-button variant="danger">Danger</tc-button>
</div>

```html
<tc-button variant="primary">Save</tc-button>
<tc-button variant="secondary">Cancel</tc-button>
<tc-button variant="ghost">Skip</tc-button>
<tc-button variant="danger">Delete</tc-button>
```

### Sizes

Three sizes; combine with any variant.

<div class="stage">
  <tc-button size="sm">Small</tc-button>
  <tc-button size="md">Medium</tc-button>
  <tc-button size="lg">Large</tc-button>
</div>

```html
<tc-button size="sm">Small</tc-button>
<tc-button size="lg">Large</tc-button>
```

### States

`disabled` blocks clicks and dims the button. `loading` shows a spinner and also blocks interaction.

<div class="stage">
  <tc-button>Idle</tc-button>
  <tc-button loading>Loading</tc-button>
  <tc-button disabled>Disabled</tc-button>
  <tc-button variant="danger" loading>Deleting…</tc-button>
</div>

```html
<tc-button loading>Saving…</tc-button>
<tc-button disabled>Submit</tc-button>
```

### Block (full-width)

`block` stretches the button to fill its container — useful for mobile forms.

<div class="stage col">
  <tc-button block variant="primary">Continue</tc-button>
</div>

```html
<tc-button block variant="primary">Continue</tc-button>
```

### Anchor mode (`href`)

Pass `href` and the button renders as a real `<a>` instead of a `<button>` — same styling, link semantics. `target="_blank"` auto-adds `rel="noopener"` so you don't have to remember.

<div class="stage">
  <tc-button variant="primary" href="../docs.html">Read the docs →</tc-button>
  <tc-button variant="secondary" href="../examples.html">Examples</tc-button>
  <tc-button variant="ghost" href="https://github.com/ra9/tan-compose" target="_blank">GitHub ↗</tc-button>
  <tc-button variant="primary" href="../docs.html" disabled>Disabled link</tc-button>
</div>

```html
<tc-button variant="primary" href="/docs">Read the docs</tc-button>
<tc-button href="https://github.com/ra9/tan-compose" target="_blank">
  GitHub
</tc-button>
```

Disabled anchors drop their `href` and set `aria-disabled="true"` + `tabindex="-1"` so the click does nothing and keyboard focus skips the button.

### Theming

Every CSS variable above can be overridden on a parent or on the host element directly. The kit ships five named theme presets (light, dark, bootstrap, tailwind, material, shadcn) that re-skin the button without any per-component tweaking.

```html
<!-- one-off accent -->
<tc-button
  style="--tc-btn-primary-bg: #a16939; --tc-btn-primary-fg: #fff;"
  variant="primary"
>
  Save changes
</tc-button>
```

### Accessibility

- Buttons render as native `<button type="button">` and inherit all the default keyboard / focus behavior.
- Anchors get `role="button"` plus the same visual `:focus-visible` ring. Disabled anchors are not focusable.
- Pass an icon-only button an `aria-label` so screen readers have something to announce. The default slot is opaque to assistive tech.
