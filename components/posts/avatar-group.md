---
tag: tc-avatar-group
slug: avatar-group
category: chrome
summary: Overlapping cluster of avatars with an overflow "+N" pill. Pairs with `tc-avatar` for team / collaborator UIs.
description: tc-avatar-group documentation — max, spacing, size inheritance.
importPath: "@ra9/tan-compose-kit/avatar-group"

props:
  - name: max
    type: number
    default: "4"
    description: Maximum visible avatars before the overflow pill. Set to `0` to show all.
  - name: spacing
    type: '"tight" | "normal" | "loose"'
    default: '"normal"'
    description: Overlap density.
  - name: size
    type: '"xs" | "sm" | "md" | "lg" | "xl"'
    default: '"md"'
    description: Applied to children that don't carry their own `size` attribute.

events: []

slots:
  - name: (default)
    description: '`tc-avatar` elements. Anything else is rendered but not counted toward `max`.'

cssVars:
  - name: "--tc-avatar-group-ring"
    default: "var(--tc-color-surface, #ffffff)"
    description: Ring around each avatar — matches the page surface to separate stacked avatars.
  - name: "--tc-avatar-group-overflow-bg"
    default: "var(--tc-color-rule, #ece5d3)"
    description: Overflow pill background.
  - name: "--tc-avatar-group-overflow-fg"
    default: "var(--tc-color-ink, #14171f)"
    description: Overflow pill text color.

related:
  - avatar
  - badge
---

### Basic

<div class="stage">
  <tc-avatar-group max="4">
    <tc-avatar name="Mia"></tc-avatar>
    <tc-avatar name="Jamal"></tc-avatar>
    <tc-avatar name="Aiko"></tc-avatar>
    <tc-avatar name="Sven"></tc-avatar>
    <tc-avatar name="Lila"></tc-avatar>
    <tc-avatar name="Ravi"></tc-avatar>
  </tc-avatar-group>
</div>

```html
<tc-avatar-group max="4">
  <tc-avatar name="Mia"></tc-avatar>
  <tc-avatar name="Jamal"></tc-avatar>
  <tc-avatar name="Aiko"></tc-avatar>
  <tc-avatar name="Sven"></tc-avatar>
  <tc-avatar name="Lila"></tc-avatar>
  <tc-avatar name="Ravi"></tc-avatar>
</tc-avatar-group>
```

### Sizes

<div class="stage" style="display:grid;gap:14px;">
  <tc-avatar-group size="sm" max="4">
    <tc-avatar name="Mia"></tc-avatar>
    <tc-avatar name="Jamal"></tc-avatar>
    <tc-avatar name="Aiko"></tc-avatar>
    <tc-avatar name="Sven"></tc-avatar>
    <tc-avatar name="Lila"></tc-avatar>
  </tc-avatar-group>
  <tc-avatar-group size="lg" max="3">
    <tc-avatar name="Mia"></tc-avatar>
    <tc-avatar name="Jamal"></tc-avatar>
    <tc-avatar name="Aiko"></tc-avatar>
    <tc-avatar name="Sven"></tc-avatar>
    <tc-avatar name="Lila"></tc-avatar>
  </tc-avatar-group>
  <tc-avatar-group size="xl" max="3">
    <tc-avatar src="https://i.pravatar.cc/120?img=12" name="Mia"></tc-avatar>
    <tc-avatar src="https://i.pravatar.cc/120?img=32" name="Jamal"></tc-avatar>
    <tc-avatar src="https://i.pravatar.cc/120?img=47" name="Aiko"></tc-avatar>
    <tc-avatar src="https://i.pravatar.cc/120?img=18" name="Sven"></tc-avatar>
  </tc-avatar-group>
</div>

```html
<tc-avatar-group size="sm" max="4">…</tc-avatar-group>
<tc-avatar-group size="lg" max="3">…</tc-avatar-group>
<tc-avatar-group size="xl" max="3">…</tc-avatar-group>
```

### Spacing

<div class="stage" style="display:grid;gap:14px;">
  <tc-avatar-group spacing="tight" max="5">
    <tc-avatar name="Mia"></tc-avatar>
    <tc-avatar name="Jamal"></tc-avatar>
    <tc-avatar name="Aiko"></tc-avatar>
    <tc-avatar name="Sven"></tc-avatar>
    <tc-avatar name="Lila"></tc-avatar>
  </tc-avatar-group>
  <tc-avatar-group spacing="normal" max="5">
    <tc-avatar name="Mia"></tc-avatar>
    <tc-avatar name="Jamal"></tc-avatar>
    <tc-avatar name="Aiko"></tc-avatar>
    <tc-avatar name="Sven"></tc-avatar>
    <tc-avatar name="Lila"></tc-avatar>
  </tc-avatar-group>
  <tc-avatar-group spacing="loose" max="5">
    <tc-avatar name="Mia"></tc-avatar>
    <tc-avatar name="Jamal"></tc-avatar>
    <tc-avatar name="Aiko"></tc-avatar>
    <tc-avatar name="Sven"></tc-avatar>
    <tc-avatar name="Lila"></tc-avatar>
  </tc-avatar-group>
</div>

### Show all (no overflow)

<div class="stage">
  <tc-avatar-group max="0">
    <tc-avatar name="Mia"></tc-avatar>
    <tc-avatar name="Jamal"></tc-avatar>
    <tc-avatar name="Aiko"></tc-avatar>
    <tc-avatar name="Sven"></tc-avatar>
    <tc-avatar name="Lila"></tc-avatar>
  </tc-avatar-group>
</div>

```html
<tc-avatar-group max="0">…</tc-avatar-group>
```

### Accessibility

- Hidden avatars are removed from the accessibility tree (via `hidden`), so screen-reader users only hear the visible ones plus the overflow count.
- The overflow pill is plain text. If you need it to be interactive (e.g., open a popover with the rest of the names), wrap the group and the popover in a parent and click-handle it there.

### Theming

```html
<tc-avatar-group
  style="
    --tc-avatar-group-ring: #0b0c10;
    --tc-avatar-group-overflow-bg: #1c1f26;
    --tc-avatar-group-overflow-fg: #f3f3f3;
  "
>
  <tc-avatar name="Mia" style="--tc-avatar-ring: #0b0c10;"></tc-avatar>
  <tc-avatar name="Jamal" style="--tc-avatar-ring: #0b0c10;"></tc-avatar>
  <tc-avatar name="Aiko" style="--tc-avatar-ring: #0b0c10;"></tc-avatar>
</tc-avatar-group>
```
