---
title: kit v1.6 — from 24 to 35 components
slug: kit-1-6-from-24-to-35
date: 2026-05-12
tag: kit v1.6.0 · v1.7.0 · release
version: v1.1.0
description: Eleven new components land in @ra9/tan-compose-kit — carousel, drawer, tooltip, popover, progress, stepper, accordion, avatar (+ group), rating, slider. Top-layer rendering, native dialog, popover API, and a deterministic-tint initials fallback.
excerpt: Eleven new components grow the kit from 24 to 35. The interesting bits aren't on the surface — they're the platform features each piece leans on. Native dialog for the drawer, popover API for the tooltip, MutationObserver for the carousel's slot, and a clip-path that keeps half-stars exact at any zoom.
---

`@ra9/tan-compose-kit` 1.6 lands eleven new components. The headline is the count — the kit goes from 24 to 35 — but the interesting bits aren't on the surface. They're the platform features each piece leans on:

- The drawer is a native `<dialog>` with `showModal()`, so focus is trapped and `Esc` dismisses without any custom JS.
- The tooltip and popover both render in the browser **top-layer** via the popover API. They can't be clipped by an ancestor's `transform`, `backdrop-filter`, or `overflow: hidden` — the same trap that bit `<site-search>` last week.
- The carousel observes its slot with a `MutationObserver` + `slotchange` listener, so adding or removing slides at runtime just works.
- The rating's half-star uses a `clip-path: inset(0 50% 0 0)` — pixel-exact at any zoom level, where a width-based fill would round off.

The pattern across all eleven is the same one the rest of the kit follows: build on the platform, theme via CSS custom properties, expose state as reactive props.

Each component below comes with a tag in the kit, an inline demo, and a code snippet you can paste into any HTML file after a kit import.

## Drawer — the side sheet that pairs with modal

`<tc-modal>` lives in the center; `<tc-drawer>` slides in from any edge. Built on the same `<dialog>`-with-`showModal()` machinery so they share focus management, backdrop click, and `Esc`-to-dismiss.

<tc-callout variant="info">Open the **right** drawer with the button below; it'll trap focus until you dismiss.</tc-callout>

<div class="stage">
  <tc-button id="post-drawer-open">Open drawer →</tc-button>
  <tc-drawer id="post-drawer" title="Filters">
    <div style="display:grid;gap:12px;">
      <label>Search<br><tc-input placeholder="Keyword…"></tc-input></label>
      <label><input type="checkbox" checked> Active only</label>
      <label><input type="checkbox"> Include archived</label>
    </div>
    <div slot="footer">
      <tc-button variant="ghost" id="post-drawer-cancel">Cancel</tc-button>
      <tc-button id="post-drawer-apply">Apply</tc-button>
    </div>
  </tc-drawer>
</div>

<script>
  document.getElementById("post-drawer-open")?.addEventListener("click", () => {
    document.getElementById("post-drawer").open = true;
  });
  document.getElementById("post-drawer-cancel")?.addEventListener("click", () => {
    document.getElementById("post-drawer").open = false;
  });
  document.getElementById("post-drawer-apply")?.addEventListener("click", () => {
    document.getElementById("post-drawer").open = false;
  });
</script>

```html
<tc-drawer id="filters" side="right" title="Filters">
  <div>…body…</div>
  <div slot="footer">
    <tc-button variant="ghost" onclick="filters.open=false">Cancel</tc-button>
    <tc-button onclick="filters.open=false">Apply</tc-button>
  </div>
</tc-drawer>

<tc-button onclick="filters.open=true">Open drawer →</tc-button>
```

`side` accepts `left` / `right` / `top` / `bottom`; `size` sets the width for horizontal edges and the height for vertical ones. The slide transition respects `prefers-reduced-motion: reduce`.

## Tooltip + popover — top-layer at last

These two are the reason most of the rest of the kit feels more solid this week. Both render via the popover API into the browser's **top-layer** — above every stacking context, immune to `overflow: hidden`, `backdrop-filter`, or `transform` on any ancestor. The trap that bit `<site-search>` is the kind of trap every floating-UI library has to solve. Letting the platform handle it cuts hundreds of lines of code.

<div class="stage" style="gap: 12px;">
  <tc-tooltip text="Copy to clipboard">
    <tc-button variant="ghost">Copy</tc-button>
  </tc-tooltip>
  <tc-tooltip placement="bottom">
    <tc-button variant="secondary">With shortcut</tc-button>
    <span slot="content" style="display:inline-flex;align-items:center;gap:6px;">Save <kbd style="background:rgba(255,255,255,0.12);padding:1px 5px;border-radius:3px;font-family:var(--tc-font-mono,monospace);font-size:0.7rem;">⌘S</kbd></span>
  </tc-tooltip>
  <tc-popover>
    <tc-button slot="trigger">Profile ▾</tc-button>
    <div style="display:grid;gap:8px;">
      <strong>Mia Carter</strong>
      <span style="color:var(--tc-color-ink-soft);font-size:0.84rem;">mia@example.com</span>
      <hr style="border:none;border-top:1px solid var(--tc-color-rule);margin:4px 0;">
      <a href="#" style="color:inherit;text-decoration:none;font-size:0.9rem;">Settings</a>
      <a href="#" style="color:inherit;text-decoration:none;font-size:0.9rem;">Sign out</a>
    </div>
  </tc-popover>
</div>

```html
<tc-tooltip text="Copy to clipboard">
  <tc-button variant="ghost">Copy</tc-button>
</tc-tooltip>

<tc-popover>
  <tc-button slot="trigger">Profile ▾</tc-button>
  <strong>Mia Carter</strong>
  <a href="/settings">Settings</a>
  <a href="/logout">Sign out</a>
</tc-popover>
```

Both auto-flip placement when the preferred side would push them off-screen, and both clamp to a 4px viewport margin so a tooltip on a screen-edge button still renders fully visible.

## Stepper + progress — multi-step flows

`<tc-stepper>` is the indicator at the top of a wizard; `<tc-progress>` is the spinner / bar underneath. Together they cover most multi-step UIs without leaving the kit.

<div class="stage col">
  <tc-stepper
    active="1"
    steps='[
      {"title":"Account","description":"Email & password"},
      {"title":"Profile","description":"Name & avatar"},
      {"title":"Workspace","description":"Invite team"},
      {"title":"Done"}
    ]'
  ></tc-stepper>
  <div style="display:grid;gap:14px;max-width:400px;">
    <tc-progress value="35" showLabel></tc-progress>
    <tc-progress indeterminate size="sm"></tc-progress>
  </div>
</div>

```html
<tc-stepper
  active="1"
  steps='[
    {"title":"Account","description":"Email & password"},
    {"title":"Profile","description":"Name & avatar"},
    {"title":"Workspace","description":"Invite team"},
    {"title":"Done"}
  ]'
></tc-stepper>

<tc-progress value="35" showLabel></tc-progress>
<tc-progress indeterminate></tc-progress>
```

The stepper has done / current / upcoming visual states automatically wired from `active`. Switch to `clickable` and each step becomes a real `<button>` that emits `tc-step-change` — useful when a wizard lets users go back to review.

The progress is determinate by default; pass `indeterminate` for the cycling state while you're waiting for the value to land. Variants `linear` and `circular` share the same ARIA contract (`role="progressbar"` with `valuenow / valuemin / valuemax`, or `valuetext` when indeterminate).

## People — avatar + avatar group

`<tc-avatar>` does image-with-fallback. When there's no `src`, the initials are derived from `name` and tinted against a deterministic 7-stop palette — **the same name always gets the same color across pages**. Mia is always blue. Jamal is always brown. It's a small touch that makes a list of unfamiliar names feel like a recognizable set instead of seven grey blobs.

<div class="stage col">
  <div style="display:flex;gap:12px;">
    <tc-avatar name="Mia Carter" status="online" size="lg"></tc-avatar>
    <tc-avatar name="Jamal Reed" status="away" size="lg"></tc-avatar>
    <tc-avatar name="Aiko Tanaka" status="busy" size="lg"></tc-avatar>
    <tc-avatar name="Sven Olsson" status="offline" size="lg"></tc-avatar>
  </div>
  <tc-avatar-group max="4">
    <tc-avatar name="Mia"></tc-avatar>
    <tc-avatar name="Jamal"></tc-avatar>
    <tc-avatar name="Aiko"></tc-avatar>
    <tc-avatar name="Sven"></tc-avatar>
    <tc-avatar name="Lila"></tc-avatar>
    <tc-avatar name="Ravi"></tc-avatar>
    <tc-avatar name="Olu"></tc-avatar>
  </tc-avatar-group>
</div>

```html
<tc-avatar name="Mia Carter" status="online"></tc-avatar>

<tc-avatar-group max="4">
  <tc-avatar name="Mia"></tc-avatar>
  <tc-avatar name="Jamal"></tc-avatar>
  <tc-avatar name="Aiko"></tc-avatar>
  <tc-avatar name="Sven"></tc-avatar>
  <tc-avatar name="Lila"></tc-avatar>
  <tc-avatar name="Ravi"></tc-avatar>
</tc-avatar-group>
```

`<tc-avatar-group>` auto-inherits its `size` to children that don't set their own, overlaps them with one of three densities (`tight` / `normal` / `loose`), and renders a `+N` pill when more avatars are slotted than `max` allows. Hidden avatars are pulled from the accessibility tree, so screen-reader users only hear the visible names plus the count.

## Inputs that feel polished — slider + rating

`<tc-slider>` is a themed `<input type="range">`. Keyboard, touch, and screen-reader behavior come from the platform; the kit just paints the chrome around the native track and thumb. The chrome supports an optional label, current-value display with custom `suffix`, and a tick per step.

`<tc-rating>` is the canonical star input — interactive by default, `readonly` for display, optional `allowHalf` for 0.5 precision. The half-fill is a `clip-path: inset(0 50% 0 0)`; at any zoom, the half is exactly 50%.

<div class="stage col">
  <div style="display:grid;gap:18px;max-width:400px;">
    <tc-slider label="Volume" value="60" suffix="%" showValue></tc-slider>
    <tc-slider label="Font size" min="12" max="24" step="1" value="16" suffix="px" showValue showTicks></tc-slider>
  </div>
  <div style="display:flex;align-items:center;gap:12px;margin-top:8px;">
    <tc-rating value="4.5" allowHalf size="lg"></tc-rating>
    <span style="color:var(--tc-color-ink-soft);font-size:0.92rem;">4.5 (281 reviews)</span>
  </div>
</div>

```html
<tc-slider label="Volume" value="60" suffix="%" showValue></tc-slider>
<tc-slider min="12" max="24" step="1" value="16" showTicks></tc-slider>

<tc-rating value="4.5" allowHalf size="lg"></tc-rating>
<tc-rating value="4.5" readonly allowHalf></tc-rating>
```

Both emit two events: `tc-input` while the user is dragging or holding an arrow key, and `tc-change` once they commit the new value. Use the live one to drive a preview, use the committed one to send to the server.

## Content & rhythm — accordion + carousel

These are the two pieces of chrome that compose pages rather than fields.

`<tc-accordion>` is a disclosure group built on native `<details>` — single-open by default, or `mode="multi"` for the FAQ-style "open as many as you want." Authors slot in real `<details>` / `<summary>` so the markup degrades to plain HTML if the script ever fails to load. The kit just coordinates which one stays open and animates a caret.

<div class="stage col">
  <tc-accordion style="max-width: 560px;">
    <details open>
      <summary>Why a kit if the library is already declarative?</summary>
      <div style="padding: 4px 18px 16px; color: var(--tc-color-ink-soft);">Because composing the same patterns by hand on every page is how you get inconsistent UIs. The kit is a set of pre-composed defaults you can override token-by-token.</div>
    </details>
    <details>
      <summary>Does it work with React or Vue?</summary>
      <div style="padding: 4px 18px 16px; color: var(--tc-color-ink-soft);">Yes — these are Web Components. Pass props as attributes, listen to <code>tc-*</code> events.</div>
    </details>
    <details>
      <summary>How big is the bundle?</summary>
      <div style="padding: 4px 18px 16px; color: var(--tc-color-ink-soft);">Each component module is tree-shakable. Import only the ones you use — the kit's <code>mod.ts</code> is the all-in-one entry, but every component is also a JSR subpath.</div>
    </details>
  </tc-accordion>
</div>

```html
<tc-accordion>
  <details open>
    <summary>Why a kit?</summary>
    <p>…</p>
  </details>
  <details>
    <summary>Framework support?</summary>
    <p>…</p>
  </details>
</tc-accordion>
```

`<tc-carousel>` is the bigger swing. Slides are direct children of the host — no JSON config, no per-slide attributes. The component watches the slot via `MutationObserver` + `slotchange` and recomputes the count when children change. Supports slide and fade transitions, autoplay with pause-on-hover, indicators, prev / next controls, vertical orientation, pointer swipe, and `prefers-reduced-motion` aware transitions.

<div class="stage">
  <tc-carousel autoplay="3500" ariaLabel="Release tour" style="max-width: 560px; --tc-carousel-height: 200px;">
    <div style="display:grid;place-items:center;height:200px;background:linear-gradient(135deg,#a16939,#d9b78a);color:#fff;font-weight:600;font-size:1.4rem;text-align:center;padding:24px;">Eleven new components</div>
    <div style="display:grid;place-items:center;height:200px;background:linear-gradient(135deg,#3a5a40,#a3b18a);color:#fff;font-weight:600;font-size:1.4rem;text-align:center;padding:24px;">Top-layer overlays</div>
    <div style="display:grid;place-items:center;height:200px;background:linear-gradient(135deg,#1f3a66,#7eaad9);color:#fff;font-weight:600;font-size:1.4rem;text-align:center;padding:24px;">Deterministic tints</div>
    <div style="display:grid;place-items:center;height:200px;background:linear-gradient(135deg,#7a1a14,#d99a8a);color:#fff;font-weight:600;font-size:1.4rem;text-align:center;padding:24px;">Native dialog primitives</div>
  </tc-carousel>
</div>

```html
<tc-carousel autoplay="3500">
  <div>Slide one</div>
  <div>Slide two</div>
  <div>Slide three</div>
</tc-carousel>
```

## tc-chart — added in v1.7

A week after the v1.6 release, one more component landed: `<tc-chart>`. Five chart types in a single element — line, area, bar, sparkline, donut — rendered as pure SVG (~11 KB minified), themeable through the same CSS tokens as the rest of the kit, and accessible by default. The motivation: Chart.js, Recharts, Apex, and ECharts all paint to `<canvas>`, which means series colors live in JS config rather than CSS tokens, and screen readers see exactly nothing in the chart area. tc-chart inverts both of those.

<div class="stage">
  <tc-chart
    type="line"
    height="240px"
    ariaLabel="Sessions and signups, eight months"
    style="width:100%;"
    data='{
      "labels": ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug"],
      "series": [
        {"name":"Sessions","values":[420,460,510,530,640,720,790,830]},
        {"name":"Signups","values":[80,95,110,130,140,180,210,240]}
      ]
    }'
  ></tc-chart>
</div>

```html
<tc-chart
  type="line"
  ariaLabel="Sessions and signups, eight months"
  data='{
    "labels": ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug"],
    "series": [
      {"name":"Sessions","values":[420,460,510,530,640,720,790,830]},
      {"name":"Signups","values":[80,95,110,130,140,180,210,240]}
    ]
  }'
></tc-chart>
```

Stacked area for region-by-region breakdown — same `type="area"` plus `stacked`:

<div class="stage">
  <tc-chart
    type="area"
    stacked
    height="220px"
    style="width:100%;"
    data='{
      "labels": ["Q1","Q2","Q3","Q4"],
      "series": [
        {"name":"NA","values":[40,55,70,90]},
        {"name":"EU","values":[30,40,50,60]},
        {"name":"APAC","values":[20,25,40,55]}
      ]
    }'
  ></tc-chart>
</div>

Composition donut for traffic mix — pass single-value entries and a `showValues` to label each segment in-place:

<div class="stage">
  <tc-chart
    type="donut"
    height="260px"
    showValues
    ariaLabel="Traffic by device"
    style="width:100%; max-width: 320px;"
    data='{
      "series": [
        {"name":"Mobile","value":52},
        {"name":"Desktop","value":31},
        {"name":"Tablet","value":12},
        {"name":"Other","value":5}
      ]
    }'
  ></tc-chart>
</div>

```html
<tc-chart
  type="donut"
  showValues
  ariaLabel="Traffic by device"
  data='{
    "series": [
      {"name":"Mobile","value":52},
      {"name":"Desktop","value":31},
      {"name":"Tablet","value":12},
      {"name":"Other","value":5}
    ]
  }'
></tc-chart>
```

Brand it by setting `--tc-chart-color-1` through `--tc-chart-color-8` (or pass an explicit `colors='["#…", …]'` array). Theme switches reskin every chart on the page without re-instantiating anything — the `light → dark` toggle is a CSS variable flip, not a chart-library re-mount.

For sparklines inline with text, drop the axes and legend:

<div class="stage" style="gap: 8px; align-items: center;">
  Revenue this quarter
  <tc-chart
    type="sparkline"
    height="32px"
    showLegend="false"
    style="width: 140px;"
    data='{ "series": [{"name":"r","values":[12,18,15,22,28,24,32,38]}] }'
  ></tc-chart>
  <strong>+216%</strong>
</div>

```html
<tc-chart
  type="sparkline"
  height="32px"
  showLegend="false"
  style="width: 140px;"
  data='{ "series": [{"name":"r","values":[12,18,15,22,28,24,32,38]}] }'
></tc-chart>
```

Full prop list and a brand-theming example on the [tc-chart docs page](/components/chart.html).

## Composing a real flow

The most interesting thing about a release like this isn't any single component — it's the patterns that fall out when you put them together. A "first-run" experience for a workspace app is `<tc-stepper>` at the top, `<tc-drawer>` for help docs, `<tc-progress>` while creating resources, `<tc-avatar-group>` on the team-invite step, `<tc-tooltip>` on the trickier fields, `<tc-rating>` at the end to ask how it went. That's seven of the eleven new components, plus existing form fields, all themed against the same tokens, all addressable by attribute, all framework-neutral.

The full list:

- [`<tc-carousel>`](/components/carousel.html) — slide + fade, autoplay, swipe, keyboard, vertical mode
- [`<tc-accordion>`](/components/accordion.html) — native `<details>`, single / multi-open
- [`<tc-tooltip>`](/components/tooltip.html) — top-layer, auto-flip placement
- [`<tc-popover>`](/components/popover.html) — top-layer, outside-click + `Esc` dismiss
- [`<tc-drawer>`](/components/drawer.html) — `<dialog>` side sheet from any edge
- [`<tc-progress>`](/components/progress.html) — linear + circular, determinate or indeterminate
- [`<tc-stepper>`](/components/stepper.html) — horizontal + vertical, clickable
- [`<tc-avatar>`](/components/avatar.html) — deterministic-tint initials fallback, status dot
- [`<tc-avatar-group>`](/components/avatar-group.html) — overlap with overflow pill
- [`<tc-rating>`](/components/rating.html) — half-stars via clip-path, read-only mode
- [`<tc-slider>`](/components/slider.html) — themed native range, ticks, suffix
- [`<tc-chart>`](/components/chart.html) — line / area / bar / sparkline / donut, all SVG, all themeable (v1.7)

Install:

```ts
import "@ra9/tan-compose-kit/themes/tokens";  // base palette
import "@ra9/tan-compose-kit/carousel";        // tree-shakable per component
import "@ra9/tan-compose-kit/drawer";
// …or the whole kit at once
import "@ra9/tan-compose-kit";
```

Or browse the full set on the [components page](/components.html).
