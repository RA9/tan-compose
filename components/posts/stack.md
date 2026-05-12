---
tag: tc-stack
slug: stack
category: layout primitive
summary: Vertical layout primitive. Children flow top-to-bottom with consistent spacing.
description: tc-stack documentation — gap, alignment, composition, and accessibility.
importPath: "@ra9/tan-compose-kit/stack"

props:
  - name: gap
    type: '"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | CSS length'
    default: '"4"'
    description: Spacing between children. Numeric tokens map to `--tc-space-N` (1=4px, 2=8px, 3=12px, 4=16px, 5=24px, 6=32px, 7=48px, 8=64px). Any raw CSS length also works.
  - name: align
    type: '"stretch" | "start" | "center" | "end"'
    default: '"stretch"'
    description: Cross-axis alignment. Maps to `align-items` on the underlying flexbox.

events: []

slots:
  - name: (default)
    description: Children — any markup; the stack just spaces them out.

cssVars: []

related:
  - cluster
  - grid
  - card
---

### Basic usage

<div class="stage col">
  <tc-stack gap="3">
    <tc-card title="One">First card.</tc-card>
    <tc-card title="Two">Second card.</tc-card>
    <tc-card title="Three">Third card.</tc-card>
  </tc-stack>
</div>

```html
<tc-stack gap="3">
  <tc-card title="One">First card.</tc-card>
  <tc-card title="Two">Second card.</tc-card>
  <tc-card title="Three">Third card.</tc-card>
</tc-stack>
```

### Gap scale

Numeric `gap` values map to the design system's spacing scale.

| Token | Pixels |
|---|---|
| `1` | 4px |
| `2` | 8px |
| `3` | 12px |
| `4` | 16px (default) |
| `5` | 24px |
| `6` | 32px |
| `7` | 48px |
| `8` | 64px |

You can also pass a raw CSS length:

```html
<tc-stack gap="2.5rem">…</tc-stack>
<tc-stack gap="clamp(12px, 2vw, 24px)">…</tc-stack>
```

### Alignment

`align` controls how children are sized across the stack's width.

```html
<tc-stack align="stretch">
  <tc-button block>Each button fills the width.</tc-button>
  <tc-button block variant="ghost">Same.</tc-button>
</tc-stack>

<tc-stack align="center">
  <tc-button>Centered</tc-button>
  <tc-button variant="ghost">In the middle</tc-button>
</tc-stack>
```

### Form layout

The stack is the workhorse for stacking labelled form fields:

```html
<tc-stack gap="3">
  <tc-input label="Name"></tc-input>
  <tc-input label="Email" type="email"></tc-input>
  <tc-textarea label="Message" rows="4"></tc-textarea>
  <tc-button>Send</tc-button>
</tc-stack>
```

### Theming

No theme variables — `tc-stack` is a layout primitive. Override the `gap` and `align` props directly.

### Accessibility

- The stack renders a plain `<div>` with `flex-direction: column` — no semantic role. It's transparent to assistive tech, which is correct: spacing isn't content.
- Children keep their own semantics; the stack doesn't intercept focus or anything else.
