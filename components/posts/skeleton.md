---
tag: tc-skeleton
slug: skeleton
category: chrome
summary: Shimmering placeholder shown while content is loading. Respects `prefers-reduced-motion`.
description: tc-skeleton documentation — width, height, rounded, pulse, theming, and accessibility.
importPath: "@ra9/tan-compose-kit/skeleton"

props:
  - name: width
    type: string
    default: '"100%"'
    description: Any CSS length, e.g. `"120px"` or `"60%"`.
  - name: height
    type: string
    default: '"1em"'
    description: Any CSS length. Defaults to one line of text.
  - name: rounded
    type: boolean
    default: "false"
    description: Render as a circle. Useful for avatar placeholders.
  - name: pulse
    type: boolean
    default: "true"
    description: Animate a shimmer across the bone. Disable for static placeholders.

events: []
slots: []

cssVars:
  - name: "--tc-skeleton-base"
    default: "var(--tc-color-rule, #ece5d3)"
    description: Base color of the placeholder.
  - name: "--tc-skeleton-shine"
    default: "rgba(255, 255, 255, 0.6)"
    description: Highlight color used in the shimmer animation.
  - name: "--tc-skeleton-radius"
    default: "var(--tc-radius-md, 6px)"
    description: Corner radius (ignored when `rounded` is true).

related:
  - stack
  - card
  - grid
---

### Basic usage

<div class="stage col">
  <tc-skeleton width="60%" height="1.4em"></tc-skeleton>
  <tc-skeleton width="80%" height="1em"></tc-skeleton>
  <tc-skeleton width="40%" height="1em"></tc-skeleton>
</div>

```html
<tc-skeleton width="60%" height="1.4em"></tc-skeleton>
<tc-skeleton width="80%" height="1em"></tc-skeleton>
<tc-skeleton width="40%" height="1em"></tc-skeleton>
```

### Avatar placeholder

<div class="stage">
  <tc-skeleton width="48px" height="48px" rounded></tc-skeleton>
  <tc-skeleton width="160px" height="48px"></tc-skeleton>
</div>

```html
<tc-skeleton width="48px" height="48px" rounded></tc-skeleton>
```

### Static (no shimmer)

Disable the animation when you have many skeletons on screen, or when you want a calmer feel.

<div class="stage col">
  <tc-skeleton width="100%" height="1em" pulse="false"></tc-skeleton>
</div>

```html
<tc-skeleton width="100%" height="1em" pulse="false"></tc-skeleton>
```

### Inside a card

Compose with `tc-card` and `tc-stack` for a full content-loading state.

```html
<tc-card>
  <tc-stack gap="2">
    <tc-skeleton width="40%" height="1.4em"></tc-skeleton>
    <tc-skeleton width="100%" height="1em"></tc-skeleton>
    <tc-skeleton width="92%" height="1em"></tc-skeleton>
    <tc-skeleton width="78%" height="1em"></tc-skeleton>
  </tc-stack>
</tc-card>
```

### Theming

```html
<tc-skeleton
  style="--tc-skeleton-base: #e2e8f0; --tc-skeleton-shine: rgba(255,255,255,0.8);"
  width="200px"
  height="20px"
></tc-skeleton>
```

### Accessibility

- The placeholder is `aria-hidden="true"` — screen readers skip it, which is correct: there's no content to announce.
- The shimmer animation is suppressed under `prefers-reduced-motion: reduce`; the bone falls back to a static muted block.
- For long loads, consider also announcing "Loading…" with a live region near the skeletons so non-sighted users know something is happening.
