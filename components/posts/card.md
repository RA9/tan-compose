---
tag: tc-card
slug: card
category: chrome
summary: Surface container with optional title/subtitle and named slots for media, header, and footer.
description: tc-card documentation — title, slots, padded, bordered, elevated, theming, and accessibility.
importPath: "@ra9/tan-compose-kit/card"

props:
  - name: title
    type: string
    default: '""'
    description: Header title text. Used by the default header slot when no `header` slot is provided.
  - name: subtitle
    type: string
    default: '""'
    description: Header subtitle text shown below the title.
  - name: padded
    type: boolean
    default: "true"
    description: Whether to apply internal padding. Set to false for full-bleed layouts.
  - name: bordered
    type: boolean
    default: "true"
    description: Outline border around the card.
  - name: elevated
    type: boolean
    default: "false"
    description: Apply a soft drop shadow.

events: []

slots:
  - name: media
    description: Image or visual at the top, rendered full-bleed (no padding).
  - name: header
    description: Custom header content; overrides the title/subtitle props when provided.
  - name: (default)
    description: Body content.
  - name: footer
    description: Bottom bar — typically action buttons. Renders a divider above when present.

cssVars:
  - name: "--tc-card-surface"
    default: "var(--tc-color-surface, #ffffff)"
    description: Card background.
  - name: "--tc-card-ink"
    default: "var(--tc-color-ink, #14171f)"
    description: Body text color.
  - name: "--tc-card-soft"
    default: "var(--tc-color-ink-soft, #5a6072)"
    description: Subtitle color.
  - name: "--tc-card-rule"
    default: "var(--tc-color-rule, #ece5d3)"
    description: Border + divider color.
  - name: "--tc-card-radius"
    default: "var(--tc-radius-lg, 12px)"
    description: Corner radius.
  - name: "--tc-card-shadow"
    default: "var(--tc-shadow-md, …)"
    description: Shadow when `elevated`.
  - name: "--tc-card-font"
    default: "var(--tc-font-sans, …)"
    description: Font family.
  - name: "--tc-card-padding-x"
    default: "var(--tc-space-5, 20px)"
    description: Horizontal padding.
  - name: "--tc-card-padding-y"
    default: "var(--tc-space-5, 20px)"
    description: Vertical padding.
  - name: "--tc-card-gap"
    default: "var(--tc-space-3, 12px)"
    description: Internal spacing between header / body / footer.

related:
  - stack
  - grid
  - stat
---

### Basic usage

<div class="stage col">
  <tc-card title="Project Hyperion" subtitle="Updated 2 hours ago">
    The migration is at 78%. Two services still need to be cut over before the
    end of the quarter.
  </tc-card>
</div>

```html
<tc-card title="Project Hyperion" subtitle="Updated 2 hours ago">
  The migration is at 78%. Two services still need to be cut over before the
  end of the quarter.
</tc-card>
```

### With actions

Use the `footer` slot for action buttons. The card automatically draws a divider above the footer when slotted content is present.

```html
<tc-card title="Delete this project?" subtitle="This action is permanent.">
  All data will be removed in 30 days.
  <div slot="footer">
    <tc-button variant="ghost">Cancel</tc-button>
    <tc-button variant="danger">Delete</tc-button>
  </div>
</tc-card>
```

### Custom header

Replace the default title/subtitle with your own layout using the `header` slot.

```html
<tc-card>
  <div slot="header" style="display:flex; gap:12px; align-items:center;">
    <img src="/avatars/carlos.jpg" width="36" height="36" style="border-radius:50%;" alt="" />
    <div>
      <div style="font-weight:600;">Carlos Nah</div>
      <div style="color:#6b7280; font-size:0.85rem;">2 hours ago</div>
    </div>
  </div>
  Working through the kit's accessibility audit today.
</tc-card>
```

### Media

The `media` slot is full-bleed — no horizontal padding.

```html
<tc-card title="The new dashboard">
  <img slot="media" src="/screenshots/dashboard.png" alt="Dashboard preview" />
  Coming next week.
</tc-card>
```

### Variants

<div class="stage col">
  <tc-card title="Default" bordered>Bordered, no shadow.</tc-card>
  <tc-card title="Elevated" elevated>Has a soft drop shadow.</tc-card>
  <tc-card title="Flat" bordered="false">Borderless and clean.</tc-card>
</div>

### Theming

```html
<tc-card
  style="--tc-card-radius: 4px; --tc-card-padding-x: 28px;"
  title="Tighter corners, wider padding"
>…</tc-card>
```

### Accessibility

- The card itself is a `<div>` — no inherent role. If your card is the only target for a click, wrap it in a real link or button.
- The title is plain text, not a heading. If your card needs to land in a document outline, drop a real `<h2>`/`<h3>` into the `header` slot instead.
- The media slot does not auto-add `alt` text — the caller is responsible for accessible images.
