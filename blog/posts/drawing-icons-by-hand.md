---
title: Drawing icons by hand
slug: drawing-icons-by-hand
date: 2026-05-20
tag: icons v0.3.0 · craft
version: v1.1.0
description: An SVG field guide for the icons package — the viewBox convention, the path-data alphabet, the composition tricks that make icons feel premium, and how to add your own to <tc-icon> in a single line.
excerpt: Most icon libraries are a curated tax — you install two thousand SVGs to use forty. The one you actually need is never in the set. Custom icons are accessible once you internalize that an icon is a sixty-character string and the alphabet to write one is small enough to learn in an afternoon.
---

Most "icon libraries" are a curated tax. You install two thousand SVGs to use forty of them, and the one you actually need — your one — is never in the set. The fix isn't a bigger library. It's internalizing that an icon is a sixty-character string, and that the alphabet to write one is small enough to learn in an afternoon.

The icons package shipped ten new originals this week. None of them are from Lucide. They were drawn by hand in a text editor — no Figma, no Illustrator, no tracing. This post is the field guide that produced them. By the end you'll be able to draw your own, paste it into `ICONS["..."]`, and use it like any other.

<tc-callout variant="info" title="The 10 originals shipped in v0.3.0">
<div style="display:flex;gap:18px;align-items:center;flex-wrap:wrap;font-size:0.9rem;">
<span style="display:flex;flex-direction:column;align-items:center;gap:4px;"><tc-icon name="ai" size="28"></tc-icon><code>ai</code></span>
<span style="display:flex;flex-direction:column;align-items:center;gap:4px;"><tc-icon name="spark" size="28"></tc-icon><code>spark</code></span>
<span style="display:flex;flex-direction:column;align-items:center;gap:4px;"><tc-icon name="pulse" size="28"></tc-icon><code>pulse</code></span>
<span style="display:flex;flex-direction:column;align-items:center;gap:4px;"><tc-icon name="verified" size="28"></tc-icon><code>verified</code></span>
<span style="display:flex;flex-direction:column;align-items:center;gap:4px;"><tc-icon name="receipt-scan" size="28"></tc-icon><code>receipt-scan</code></span>
<span style="display:flex;flex-direction:column;align-items:center;gap:4px;"><tc-icon name="recurring" size="28"></tc-icon><code>recurring</code></span>
<span style="display:flex;flex-direction:column;align-items:center;gap:4px;"><tc-icon name="subscription" size="28"></tc-icon><code>subscription</code></span>
<span style="display:flex;flex-direction:column;align-items:center;gap:4px;"><tc-icon name="token" size="28"></tc-icon><code>token</code></span>
<span style="display:flex;flex-direction:column;align-items:center;gap:4px;"><tc-icon name="forecast" size="28"></tc-icon><code>forecast</code></span>
<span style="display:flex;flex-direction:column;align-items:center;gap:4px;"><tc-icon name="confetti" size="28"></tc-icon><code>confetti</code></span>
</div>
</tc-callout>

## 1. The viewBox is the canvas

Every icon in the kit is a 24×24 viewBox at stroke-width 2. That's a convention — not a law — but it's the one Lucide, Heroicons, Tabler, and most modern sets agreed on, so adopting it means your custom icon sits next to the rest without a visual hiccup.

```html
<svg width="24" height="24" viewBox="0 0 24 24"
     fill="none" stroke="currentColor" stroke-width="2"
     stroke-linecap="round" stroke-linejoin="round">
  <!-- your shapes here -->
</svg>
```

Four things to internalize:

- `viewBox="0 0 24 24"` — coordinates run 0–24 left-to-right and top-to-bottom. Center is `(12, 12)`.
- `stroke="currentColor"` — the icon inherits the surrounding text color. This is what lets `<tc-icon>` change color when the parent's `color:` changes; no JS required.
- `stroke-width="2"` — strokes are 2 units wide. On a 24-unit canvas that's about 1/12 of the width, which reads as a confident outline.
- `stroke-linecap="round"` and `stroke-linejoin="round"` — line ends and corners are rounded instead of squared off. This single pair of attributes is responsible for ~80% of why an icon "feels designed" vs "feels like Microsoft Paint."

When you write an entry in `icons/icons.ts`, you only write the inner content — `<tc-icon>` wraps it for you:

```ts
"my-icon": `<line x1="3" y1="12" x2="21" y2="12"/>`,
```

That's a horizontal line across the middle. It's already a working icon.

## 2. The element vocabulary is small

You only need six SVG element types to draw essentially any UI icon:

```html
<line x1="3" y1="12" x2="21" y2="12"/>           straight line
<polyline points="3 6 12 13 21 6"/>              open multi-segment line
<polygon points="12 2 22 22 2 22"/>              closed shape from points
<rect x="3" y="3" width="18" height="18" rx="2"/>   rect, optional rounding
<circle cx="12" cy="12" r="9"/>                  circle
<path d="..."/>                                  anything else
```

That's the whole alphabet. Lucide draws every icon with these six. So does this package. The first five are self-explanatory. The sixth — `<path>` — is the one worth a closer look.

## 3. Path data: M, L, Z

A `<path>`'s `d` attribute is a sequence of one-letter commands:

```
M  move (lift the pen and drop it somewhere new)
L  line to (draw straight from current point to a new one)
H  horizontal line (just x)
V  vertical line (just y)
Z  close (line back to the start of the current sub-path)
```

The hexagonal badge from `verified`:

```html
<path d="M12 2 L20 7 V17 L12 22 L4 17 V7 Z"/>
```

Read that left to right: move to `(12, 2)`, line to `(20, 7)`, vertical line to `y=17` (so to `(20, 17)`), line to `(12, 22)`, line to `(4, 17)`, vertical to `y=7`, close. Six vertices, six commands, one badge.

Lowercase variants (`l`, `h`, `v`, `m`) take **relative** coordinates instead of absolute. Useful when the shape's position doesn't matter to the math:

```html
<path d="M3 12 h18"/>      same as <line x1="3" y1="12" x2="21" y2="12"/>
```

## 4. Curves when you actually need them

For the 90% case — UI icons — you can draw most things with M, L, and Z. The other 10% needs arcs (`A` / `a`) and Bézier curves (`C` / `c`, `Q` / `q`). They're worth knowing but not worth memorizing — copy a working example, change the numbers, eyeball the result.

The `pulse` icon's broadcast arcs:

```html
<path d="M16.5 7.5a7 7 0 0 1 0 9"/>
<path d="M7.5 7.5a7 7 0 0 0 0 9"/>
```

That's two arc commands. The syntax is:

```
a rx ry x-axis-rotation large-arc-flag sweep-flag dx dy
  └──┬──┘ └──────┬──────┘ └────────────────────┘ └─┬─┘
   radius      rotation      which of the 4         end point
                            possible arcs?        (relative)
```

Don't memorize the flags. Trial them. There are only four combinations of `(large-arc, sweep)`. Flip them until the arc bulges the right direction.

## 5. The composition tricks that make an icon feel designed

This is where icons stop feeling generic and start feeling premium.

**Filled accent dots.** Pure-outline icons are clean but flat. Adding one filled circle for emphasis adds weight without clutter. The `spark` icon is a 4-point sparkle outline plus one tiny solid dot:

```html
<path d="M12 4 L13.6 10.4 L20 12 L13.6 13.6
         L12 20 L10.4 13.6 L4 12 L10.4 10.4 Z"/>
<circle cx="19" cy="5" r="1" fill="currentColor"/>
```

The `fill="currentColor"` on the dot overrides the root `fill="none"`. The dot picks up the same color as the stroke, so theming Just Works — change the parent's `color:` and both shift together.

**Mixed-weight shapes.** Two outline circles plus two filled circles in the same icon (see `confetti`) reads as variety, not noise. The eye picks up the rhythm.

**Hex outlines for "official."** The `verified` icon could have been a circle with a check inside — but `check-circle` already exists for the generic "succeeded" case. Swapping the circle for a hexagon immediately reads as "badge / approved / certified" because hexagons aren't a natural shape, so they signal *deliberateness*.

**Dashed projections.** The `forecast` icon is a solid trending line ending in a filled dot, then a dashed segment. The transition from solid to dashed is the entire meaning — "here's what's measured, here's what's predicted":

```html
<path d="M3 17l5-5 4 4 4-6"/>
<path d="M16 10l4-3" stroke-dasharray="3 3"/>
<circle cx="16" cy="10" r="1.5" fill="currentColor"/>
```

`stroke-dasharray="3 3"` means "draw 3 units, skip 3 units, repeat." `"6 2"` would be longer dashes with tighter gaps. Trial values are cheap.

**Corner crop brackets.** Four L-shapes at the corners turn any inner content into "this thing is being captured / scanned." That's all `receipt-scan` is — a receipt inside corner brackets:

```html
<path d="M3 7V5a2 2 0 0 1 2-2h2"/>     <!-- top-left bracket -->
<path d="M17 3h2a2 2 0 0 1 2 2v2"/>    <!-- top-right -->
<path d="M21 17v2a2 2 0 0 1-2 2h-2"/>  <!-- bottom-right -->
<path d="M7 21H5a2 2 0 0 1-2-2v-2"/>   <!-- bottom-left -->
<path d="M8 9h8"/>                      <!-- receipt lines -->
<path d="M8 13h8"/>
<path d="M8 17h5"/>
```

Each bracket is a single path with one arc at the corner. The `a 2 2 0 0 1 2 -2` is "arc with radius 2 from here to 2 right and 2 up" — the rounded inner elbow of an L.

## 6. The 2-unit grid

The single most important habit when drawing icons by hand: **snap coordinates to even integers wherever possible**. A 2-unit grid means everything aligns at half-stroke increments, so strokes never land on half-pixels at common rendering sizes.

```html
<line x1="4" y1="12" x2="20" y2="12"/>      ✓  snaps cleanly at 16/24/32/48px
<line x1="3.7" y1="12" x2="20.3" y2="12"/>  ✗  blurs at small sizes
```

For curves and arcs, half-integers (`.5`) are usually fine and sometimes necessary (centers of small shapes), but quarter or finer increments rarely improve anything.

## 7. Adding your icon to the kit

Once you've got the SVG inner content, the wiring is one line:

```ts
import { ICONS } from "@ra9/tan-compose-icons";

ICONS["my-rocket"] = `<path d="M5 19l8-14 8 14H5z"/>
                      <circle cx="13" cy="11" r="2" fill="currentColor"/>`;
```

Now `<tc-icon name="my-rocket" size="32"></tc-icon>` works everywhere. No registration step, no rebuild — the component reads from `ICONS` on every render, so adding entries at runtime is fine.

If you're forking the package or sending a PR, the canonical home is `icons/icons.ts`. Entries are alphabetical within their section. Pick the section that fits, or open a new one with a `// ── label ──` comment if your icon doesn't fit anywhere existing.

## 8. The QA pass

Before shipping an icon, look at it at four sizes: 16, 20, 24, 32. UI icons live in buttons (16px), inline with text (1em ≈ 16px), in headers (24px), and as decorative anchors (32px+). If a detail vanishes at 16 or muddies at 32, fix the source — don't ship "looks good only at the default size."

A dev-only stress test in any HTML file:

```html
<tc-icon name="my-rocket" size="16"></tc-icon>
<tc-icon name="my-rocket" size="20"></tc-icon>
<tc-icon name="my-rocket" size="24"></tc-icon>
<tc-icon name="my-rocket" size="32"></tc-icon>
<tc-icon name="my-rocket" size="48"></tc-icon>
```

If it holds up at all five, ship it.

## 9. Your icon could be next

The originals shipped in v0.3 — `ai`, `spark`, `pulse`, `verified`, `receipt-scan`, `recurring`, `subscription`, `token`, `forecast`, `confetti` — exist because they were missing from Lucide and the gap was sharp enough to bother filling. That gap exists for everyone.

If your project needs a `signature`, a `kyc-photo`, a `chargeback`, a `mileage-claim`, an `ach-transfer` — Lucide isn't going to add it for you. Whoever needs the icon is the right person to draw it. The kit is small enough that one icon makes a visible difference, precise enough that a well-drawn one lands cleanly next to the rest.

The path data is a string. The vocabulary is six elements and ten path commands. The QA is "does it hold at four sizes." That's it. You can do this.

Open a PR. Your icon could be next in the set.

---

Browse the [icons reference](../icons.html). Inspect [`icons/icons.ts`](https://github.com/ra9/tan-compose/blob/main/icons/icons.ts) — the originals are at the bottom under `// originals — designed for this set`. Fork it on [GitHub](https://github.com/ra9/tan-compose) and send the next ten.
