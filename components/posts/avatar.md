---
tag: tc-avatar
slug: avatar
category: chrome
summary: User avatar with image, deterministic initials fallback, status dot, and optional ring. Five sizes, circle or square.
description: tc-avatar documentation — image, initials, status, ring, sizes, shape, theming.
importPath: "@ra9/tan-compose-kit/avatar"

props:
  - name: src
    type: string
    default: '""'
    description: Image URL. Falls back to initials if loading fails or empty.
  - name: alt
    type: string
    default: '""'
    description: Alt text. Defaults to `name` when omitted.
  - name: name
    type: string
    default: '""'
    description: Display name. Used to derive initials and a deterministic tint when there is no image.
  - name: size
    type: '"xs" | "sm" | "md" | "lg" | "xl"'
    default: '"md"'
    description: 20 / 28 / 36 / 48 / 64 px.
  - name: shape
    type: '"circle" | "square"'
    default: '"circle"'
    description: Avatar outline.
  - name: status
    type: '"" | "online" | "away" | "busy" | "offline"'
    default: '""'
    description: Status dot in the bottom-right corner.
  - name: ring
    type: boolean
    default: "false"
    description: Render a 2px ring around the avatar (matches the surface for cluster contrast).

events: []

slots: []

cssVars:
  - name: "--tc-avatar-bg"
    default: "var(--tc-color-rule, #ece5d3)"
    description: Initials background fallback.
  - name: "--tc-avatar-fg"
    default: "var(--tc-color-ink, #14171f)"
    description: Initials text color.
  - name: "--tc-avatar-ring"
    default: "var(--tc-color-surface, #ffffff)"
    description: Ring and status-dot border.
  - name: "--tc-avatar-status-online"
    default: "#2f7a52"
    description: Online dot color.
  - name: "--tc-avatar-status-away"
    default: "#d7a52f"
    description: Away dot color.
  - name: "--tc-avatar-status-busy"
    default: "#b3261e"
    description: Busy dot color.
  - name: "--tc-avatar-status-offline"
    default: "#9aa0a6"
    description: Offline dot color.

related:
  - avatar-group
  - badge
  - stat
---

### Image avatars

<div class="stage" style="display:flex;gap:12px;align-items:center;">
  <tc-avatar src="https://i.pravatar.cc/120?img=12" name="Mia"></tc-avatar>
  <tc-avatar src="https://i.pravatar.cc/120?img=32" name="Jamal" size="lg"></tc-avatar>
  <tc-avatar src="https://i.pravatar.cc/120?img=47" name="Aiko" size="xl"></tc-avatar>
</div>

```html
<tc-avatar src="/avatars/mia.jpg" name="Mia Carter"></tc-avatar>
<tc-avatar src="/avatars/jamal.jpg" name="Jamal Reed" size="lg"></tc-avatar>
```

### Initials fallback

When there's no `src`, the avatar shows initials derived from `name`. The background tint is deterministic — Mia is always blue, Jamal is always brown.

<div class="stage" style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
  <tc-avatar name="Mia Carter"></tc-avatar>
  <tc-avatar name="Jamal Reed"></tc-avatar>
  <tc-avatar name="Aiko Tanaka"></tc-avatar>
  <tc-avatar name="Sven Olsson"></tc-avatar>
  <tc-avatar name="Lila Park"></tc-avatar>
  <tc-avatar name="Ravi Kumar"></tc-avatar>
</div>

```html
<tc-avatar name="Mia Carter"></tc-avatar>
<tc-avatar name="Jamal Reed"></tc-avatar>
```

### Sizes

<div class="stage" style="display:flex;gap:10px;align-items:flex-end;">
  <tc-avatar name="Mia" size="xs"></tc-avatar>
  <tc-avatar name="Mia" size="sm"></tc-avatar>
  <tc-avatar name="Mia" size="md"></tc-avatar>
  <tc-avatar name="Mia" size="lg"></tc-avatar>
  <tc-avatar name="Mia" size="xl"></tc-avatar>
</div>

```html
<tc-avatar size="xs"></tc-avatar>
<tc-avatar size="sm"></tc-avatar>
<tc-avatar size="md"></tc-avatar>
<tc-avatar size="lg"></tc-avatar>
<tc-avatar size="xl"></tc-avatar>
```

### Shape

<div class="stage" style="display:flex;gap:12px;">
  <tc-avatar name="Mia Carter" shape="circle" size="lg"></tc-avatar>
  <tc-avatar name="Acme Co" shape="square" size="lg"></tc-avatar>
</div>

```html
<tc-avatar name="Mia Carter" shape="circle"></tc-avatar>
<tc-avatar name="Acme Co" shape="square"></tc-avatar>
```

### Status

<div class="stage" style="display:flex;gap:14px;align-items:center;">
  <tc-avatar name="Mia" status="online" size="lg"></tc-avatar>
  <tc-avatar name="Jamal" status="away" size="lg"></tc-avatar>
  <tc-avatar name="Aiko" status="busy" size="lg"></tc-avatar>
  <tc-avatar name="Sven" status="offline" size="lg"></tc-avatar>
</div>

```html
<tc-avatar name="Mia" status="online"></tc-avatar>
<tc-avatar name="Jamal" status="away"></tc-avatar>
<tc-avatar name="Aiko" status="busy"></tc-avatar>
<tc-avatar name="Sven" status="offline"></tc-avatar>
```

### Ring

The ring is meant for stacking — see `tc-avatar-group`. Standalone, it's a subtle highlight.

<div class="stage">
  <tc-avatar name="Mia" ring size="xl"></tc-avatar>
</div>

```html
<tc-avatar name="Mia" ring size="xl"></tc-avatar>
```

### Accessibility

- When `src` is set, the `<img>` carries `alt` (falls back to `name`, then to "avatar").
- Initials are exposed as text inside the fallback element with `aria-label` so screen readers announce the name, not just the letters.
- The status dot has `aria-label` describing the state. Pair with surrounding text for richer context.

### Theming

```html
<tc-avatar
  name="VIP"
  ring
  style="
    --tc-avatar-bg: #14171f;
    --tc-avatar-fg: #ffc857;
    --tc-avatar-ring: #ffc857;
  "
></tc-avatar>
```
