# Changelog — @ra9/tan-compose-kit

All notable changes to this kit are documented here. The kit is versioned
independently of the core `@ra9/tan-compose` library.

## [1.12.1] - 2026-06-15

### Fixed — `<tc-tabs>` strip scrolls instead of clipping

On very narrow screens the tab strip used to squeeze tabs until the last
one clipped. The strip now scrolls horizontally (`overflow-x: auto`, with
a hidden scrollbar) and each tab keeps its natural width, so every tab
stays reachable on phones.

## [1.12.0] - 2026-06-14

### Changed — adopt the v1.2 core templating APIs (internal)

Every component now builds its template with the core's `html` tagged
template (auto-escaping) and moves its static CSS into the new
`stylesheet` describe field, which installs the CSS once as a shared
**adopted stylesheet** instead of re-parsing a `<style>` block on every
render. This is an internal change — **rendered output and the public
API are unchanged** — but it removes the per-render CSS reparse for 32
components and replaces hand-rolled `esc()` interpolation with
structural escaping (raw markup is passed through with `unsafe()`).

Four components keep an inline `<style>` because their CSS interpolates
per-instance props that can't live in a shared static sheet: `tc-modal`
(width), `tc-progress` (size/height), `tc-rating` and `tc-stepper`
(cursor). `tc-table` continues to carry its CSS in a child element.

This requires core `@ra9/tan-compose@^1.3.0` (for `html`, `unsafe`, and
`stylesheet`); the dependency range was tightened accordingly.

### Added — `<tc-button>` form submission

`<tc-button>` can now act as a real form submit / reset button. New
`type` prop accepts `"button" | "submit" | "reset"` (default
`"button"`, preserving previous behavior).

```html
<form>
  <tc-input name="email" required></tc-input>
  <tc-button type="submit" variant="primary">Save</tc-button>
  <tc-button type="reset" variant="ghost">Clear</tc-button>
</form>
```

Why this needs explicit wiring: a `<button type="submit">` rendered
inside a shadow root does NOT submit an outer light-DOM form on its
own — submit-button-ness does not cross the shadow boundary. The
component handles this by listening for clicks on the host, walking
the light DOM with `closest("form")`, and calling
`form.requestSubmit()` (or `.reset()`) directly.

Two new cancelable, composed CustomEvents fire on the host:

- `tc-submit` — `detail.form` is the resolved `<form>`. Calling
  `e.preventDefault()` suppresses `form.requestSubmit()`.
- `tc-reset` — same shape, controls `form.reset()`.

`requestSubmit()` (not `submit()`) is used so native validation still
runs and a real `submit` event still fires on the form. `type` is
ignored when `href` is set — the anchor variant always navigates.

## [1.11.1] - 2026-05-18

### Fixed — `<tc-button>` padding override

`<tc-button>` hardcoded its padding inside `.s-sm` / `.s-md` / `.s-lg`,
leaving no way to tighten or loosen it without forking the component.
Now exposes two override tokens that match the `tc-card` pattern:

- `--tc-btn-padding-x`
- `--tc-btn-padding-y`

When unset (the default), each size keeps its previous padding
(`6px 12px` / `9px 16px` / `12px 22px`). When set, both axes
override every size:

```css
tc-button { --tc-btn-padding-x: 24px; --tc-btn-padding-y: 14px; }
```

Implemented via `initial` as the `:host` default so external rules on
`tc-button` win over the in-shadow `:host` declaration without needing
`!important`.

## [1.11.0] - 2026-05-14

### Added — `<tc-markdown>` extensions

The built-in markdown parser now handles four widely-asked-for
extensions on top of the v1.10 baseline:

- **Math** — `$inline$` and `$$display$$` syntax. Recognised by the
  parser, rendered via a `mathRenderer` hook on the host:
  ```js
  document.querySelector("tc-markdown").mathRenderer = (latex, isDisplay) =>
    katex.renderToString(latex, { displayMode: isDisplay });
  ```
  Without a hook the math falls back to a clearly-labelled
  `<code>` block showing the LaTeX source — so the missing-renderer
  state is obvious, not silent.
- **Tables** — standard GFM pipe tables with `:--`, `--:`, `:--:`
  alignment markers. Render as `<table class="tc-md-table">`.
- **Task lists** — `- [ ]` / `- [x]` produce real disabled
  checkboxes. Rendered list gets the `tc-md-tasks` class.
- **Callouts** — `:::variant Optional title` … `:::` blocks. Five
  variants follow the kit's semantic palette: note, info, success,
  warning, danger.
- **Code highlighting hook** — set `highlight = (code, lang) => html`
  on the host to plug in Prism / Shiki / Highlight.js for fenced
  blocks. Falls back to plain HTML-escaped code if not set.

### Added — `<tc-editor>` math + code blocks

- **Math toolbar button** — prompts for LaTeX (wrap with `$$…$$`
  for display) and inserts an atomic
  `<span class="tc-math" contenteditable="false" data-latex="…">`
  wrapper. The caret steps over the wrapper as a single unit
  (backspace removes the whole thing) so editing stays predictable.
- **Code-block toolbar button** — wraps the selection (or inserts a
  stub) in `<pre><code>` for multi-line code.
- **`mathRenderer` hook** mirrors tc-markdown: set the function on
  the host and the editor re-renders existing math nodes via
  afterRender, stamping `data-stamp` to avoid redundant work.
- Default toolbar now includes `codeblock` and `math` keys; pass a
  custom `toolbar=` string to override the layout.

### Theme

- New CSS hooks for the markdown extensions: `.tc-md-table`,
  `.tc-md-tasks`, `.tc-md-callout.v-*`, `.tc-md-math` —
  semantically named so end-app stylesheets can override per
  variant without touching the component.

## [1.10.0] - 2026-05-14

> Editor primitives. Two complementary components for capturing rich
> text without pulling in a 200 KB framework.

### Added

- **`<tc-editor>`** — rich-text WYSIWYG editor built on
  `contenteditable`. Configurable toolbar (`toolbar="bold,italic,|,h1,…"`),
  active-state buttons that reflect selection formatting, ⌘B / ⌘I /
  ⌘U / ⌘K keyboard shortcuts, sanitised paste (defaults to plain
  text), `<slot name="toolbar-extra">` for custom buttons, and theme
  tokens for every chrome surface. Output is HTML via the `value`
  property and the `tc-change` event.

- **`<tc-markdown>`** — markdown source editor with live preview pane.
  Three view modes (source / split / preview) toggled in the toolbar.
  A tiny built-in parser handles GFM-style headings, paragraphs,
  lists, blockquotes, fenced code blocks, **bold**, *italic*,
  `code`, [links](url), images, and rules — for richer parsing
  (footnotes, tables, plugins) pass a `render` function via property
  and the component will route through it instead. Toolbar inserts
  markdown syntax around the selection with the usual keyboard
  shortcuts.

  Kit count: 36 → 38.

## [1.9.1] - 2026-05-14

### Fixed

- **`<tc-card>` head padding silently disappeared in some browsers.**
  The combined selector
  `.card.has-header .head, .card .head:has(::slotted(*))` meant any
  browser that couldn't parse `:has(::slotted(*))` dropped *the entire
  comma-list* (legacy CSS parsing rule), taking the simpler
  `.has-header` selector down with it. Title text rendered at the
  card's edge with no top/left padding, so it didn't line up with
  the body content below. Split the rule into two independent
  selectors so the `.has-header` path is always honored.
- **`<tc-card>` size="md" was a regression on padding.** v1.9.0
  introduced `size="md"` with a 20 px padding token, but the pre-
  size-prop default resolved to `var(--tc-space-5, 20px)` which is
  **24 px** when `themes/tokens` is loaded. So adopting v1.9.0
  visibly shrunk every existing card by 4 px on each side. Rebumped
  to `md = 24 px x / 22 px y / 14 px gap` so v1.9 matches v1.8 by
  default.

### Changed

- **Shadow tokens have more presence.** Previous values
  (`rgba(20, 23, 31, 0.06)` for `--tc-shadow-md`) were so faint that
  an "elevated" card was visually indistinguishable from a plain
  one. New values are layered, two-tone shadows that read clearly
  against the default page background without looking heavy.
  Affects `<tc-card elevated>`, `<tc-modal>`, `<tc-drawer>`,
  `<tc-popover>`.

## [1.9.0] - 2026-05-14

### Added — `<tc-chart>`

- **Draw-in animations on every data layer.** Lines stroke-draw left to
  right (Catmull-Rom-aware path animation via `stroke-dashoffset`);
  area fills cross-fade; bars grow from the baseline with a staggered
  left-to-right cascade; donut segments fade + scale in clockwise;
  points pop after their line finishes drawing. Each respects
  `prefers-reduced-motion: reduce` and skips entirely.
- **Interactive legend.** Each legend item is now a real `<button>`
  with `aria-pressed` semantics. Click (or `Enter` / `Space`) toggles
  the corresponding series' visibility — the renderer filters hidden
  series out and re-renders, the legend entry dims, the swatch goes
  grey. Click again to bring it back.
- **Legend typography.** Explicit font-family / font-weight / spacing
  so the legend doesn't look like un-styled inline text — it matches
  the chart's font tokens and gets a hover background pill.

### Added — `<tc-card>`

- **`size` prop** with values `"sm" | "md" | "lg"` (default `"md"`).
  Each size scales padding, internal gap, title, and subtitle
  together so cards stay visually balanced. `sm` for dense card
  grids, `md` for the default content card, `lg` for hero-style
  presentation cards.
- **Responsive padding.** At viewports ≤ 480 px the card padding
  shrinks automatically so a default `md` card doesn't burn ~40 px
  of horizontal real estate on a 360 px phone. Hits every size
  variant proportionally.

## [1.8.2] - 2026-05-14

### Fixed

- **`<tc-stat>` widths uneven in grid / flex parent rows.** The 1.8.1
  fix used `display: flex` on the host to stretch the card height,
  but flex on the host meant the inner container sized to content
  (default `flex: 0 1 auto`), so cards with longer labels (e.g.
  "EXTREME POVERTY RATE") were visually wider than cards with short
  ones ("SINCE 1960"). Switched the host to `display: block` and
  pushed the height-fill responsibility down to `.card { height: 100% }`
  — block-level boxes fill their grid cell uniformly, and the card
  stretches vertically inside.

## [1.8.1] - 2026-05-14

### Fixed

- **`<tc-stat>` cards no longer collapse to content height in grid /
  flex rows.** The inner `.card` had no `height: 100%`, so when a row
  contained one stat with a `delta` line and others without, the
  others stayed shorter and the row looked uneven. Now the host
  stretches and the card fills it with `flex: 1 1 auto`.

## [1.8.0] - 2026-05-14

### Added

- **`<tc-chart>` server-side data fetching.** New `src` prop loads
  JSON from a URL and uses it as the chart's data, no `<script>` glue
  required. Supports an optional `srcKey` to drill into a nested
  payload (e.g. `srcKey="result.population"` pulls
  `json.result.population` out of the response). Built-in:
  - Loading overlay with an inline spinner — text customisable via
    `loadingText="…"`.
  - Error overlay that surfaces the fetch failure — text customisable
    via `errorText="…"`.
  - Automatic abort when the host unmounts or `src` changes, so a
    page navigation mid-fetch doesn't leak a pending request.
  - `data` still wins over `src` when both are present (explicit
    beats fetched).

  Theme tokens added for the overlays:
  `--tc-chart-tooltip-bg` / `--tc-chart-tooltip-fg` (already present)
  cover the tooltip; the overlay uses `--tc-chart-bg` and
  `--tc-chart-label` so it inherits the chart's surface palette.

  Companion blog post ships at `/blog/liberia-by-the-numbers.html`
  — six charts hydrated from `/data/liberia/*.json` files, all themed
  through the same CSS tokens.

## [1.7.1] - 2026-05-14

### Added

- **`<tc-chart>` interactive hover tooltip.** Cursor-following pill
  with a series color swatch and `name · label: value` text, shown
  instantly on hover instead of waiting for the browser's native
  `<title>` delay. Targets every line/area point, bar, and donut
  segment.
  - **Forgiving hit targets.** Line and area charts now layer a
    transparent 12 px-radius hit circle on top of each visible point
    so users don't have to land within the 3.5 px visual dot.
  - **Edge-aware positioning.** Tip flips to the left or below the
    cursor when it would overflow the chart bounds.
  - **`<title>` fallback preserved.** Screen readers and the browser's
    default behavior still work — the new tooltip is additive.

### Theme

- `--tc-chart-tooltip-bg`, `--tc-chart-tooltip-fg` for the tooltip
  surface. Defaults to the ink/surface tokens so the dark and
  bootstrap presets reskin it automatically.

## [1.7.0] - 2026-05-14

> Adds `<tc-chart>` — five chart types in one component, pure SVG,
> themeable via CSS tokens, accessible by default, ~6 KB minified.

### Added

- **`<tc-chart>`** — SVG-based charts. Five types in one element:
  - `line` (single or multi-series, optional smoothing)
  - `area` (with optional `stacked`)
  - `bar` (grouped or `stacked`)
  - `sparkline` (axes / legend stripped for inline mini-trends)
  - `donut` (or pie with `innerRadius="0"`)

  Designed to replace Chart.js / Recharts / Apex for the common case
  where the chart needs to:
  - Respect the kit's CSS tokens (light → dark → branded → custom
    presets all work without re-wiring)
  - Expose data to screen readers (every point, bar, and segment is a
    real DOM element with a `<title>` and structured aria description)
  - Stay small (~6 KB instead of 100–400 KB)
  - Render responsively without per-instance JS resize handlers
    (SVG `viewBox`, host `width: 100%`)

  Props: `type`, `data`, `height`, `smooth`, `stacked`, `showLegend`,
  `showAxes`, `showGrid`, `showLabels`, `showValues`, `innerRadius`,
  `yMin`, `yMax`, `ariaLabel`, `colors`. Theme tokens:
  `--tc-chart-color-1` … `--tc-chart-color-8`, `--tc-chart-axis`,
  `--tc-chart-grid`, `--tc-chart-label`, plus `--tc-chart-bg`,
  `--tc-chart-fg`, `--tc-chart-font`.

  Kit count: 35 → 36.

## [1.6.4] - 2026-05-13

> Patch release. Fixes the `var`-hoisting bug in five more components.
> If any of these tags were already in the static HTML when the kit
> script loaded, the first render threw `Cannot read properties of
> undefined`.

### Fixed

- **`<tc-callout>`** — `ICONS` declared after `build()` (reported bug:
  `TypeError: Cannot read properties of undefined (reading 'info')` at
  `callout.ts:65`).
- **`<tc-code>`** — `COPY_SVG` and `CHECK_SVG` declared after `build()`.
- **`<tc-combobox>`** — `COMBOBOX_STYLE` declared after `build()`.
- **`<tc-modal>`** — `DIALOG_LISTENERS` `WeakMap` referenced inside
  `afterRender` before its declaration ran.
- **`<tc-drawer>`** — same `DIALOG_LISTENERS` issue.
- **`<tc-table>`** — `FOCUS_INTENT` `WeakMap` same issue.

Same root cause as kit v1.6.2's site-search fix and the original
`<tc-button>` fix back in v1.2: esbuild's `minify: true` rewrites
top-level `const` as `var`, which hoists the binding to `undefined`.
When `customElements.define()` synchronously upgrades an already-in-DOM
element, the template (or `afterRender`) runs while those module-level
values are still in their hoisted-but-unassigned state.

Audit covers every top-level declaration in `kit/components/*.ts`. The
remaining `const X = …` lines after `build()` are all referenced from
event handlers (which run only after the user interacts), so they were
safe — but to keep the rule "declare before `build()`" easy to follow,
the bundle pattern is now standardised across all components.

### Build

- `kit/deno.json` now excludes `dist/` from `fmt` and `lint` so the
  minified bundles don't trip CI.

## [1.6.3] - 2026-05-13

> Adds pre-built CDN bundles (`kit/dist/`) so consumers can skip the
> esm.sh / JSR-npm-shim transformer and load the kit byte-for-byte from
> jsDelivr.

### Added

- **`kit/dist/kit.min.js`** (and `kit.js`, sourcemaps) — esbuild-bundled,
  ~160 KB minified, includes all 35 components with the core inlined.
  No second network fetch needed at runtime.
- **`kit/dist/themes/<name>.min.js`** for each preset
  (`tokens`, `dark`, `bootstrap`, `tailwind`, `material`, `shadcn`).
- `kit/bundle.ts` + `deno task bundle` to regenerate dist locally; the
  publish workflow runs it before `deno publish` so each tagged release
  ships fresh artifacts.

### Changed

- Cross-package import constraint relaxed from `jsr:@ra9/tan-compose@^1.1.1`
  to `^1.1.0` (the core's actually-published version on JSR). Local
  workspace resolution still picks up the in-tree v1.1.1 source for
  development.

### Usage

```html
<script type="module"
  src="https://cdn.jsdelivr.net/gh/RA9/tan-compose@kit-v1.6.3/kit/dist/themes/tokens.min.js"></script>
<script type="module"
  src="https://cdn.jsdelivr.net/gh/RA9/tan-compose@kit-v1.6.3/kit/dist/kit.min.js"></script>
```

## [1.6.2] - 2026-05-13

> Patch release. Fixes a publish-time import-map bug that broke the npm
> shim and any consumer that resolved `@ra9/tan-compose` against the
> published package instead of the monorepo.

### Fixed

- **`@ra9/tan-compose` import resolved to the kit itself in published
  builds.** `kit/deno.json` mapped the core to `../mod.ts` — a local
  monorepo path. JSR's publish + npm-compat shim couldn't follow that
  path outside the package, so it fell back to resolving the bare
  specifier against the kit's own files. Consumers got an error like
  `The requested module './ra9__tan-compose-kit.mjs' does not provide
  an export named 'build'`. Now the entry is
  `jsr:@ra9/tan-compose@^1.1.1`, which workspace resolution still
  satisfies locally (Deno prefers the workspace member with that name)
  but publishes as a real cross-package dependency.

## [1.6.1] - 2026-05-13

> Patch release. README + a couple of layout fixes shaken out by real-use
> testing of the 1.6.0 components.

### Fixed

- **`<tc-drawer>` auto-opening on initial load.** The unconditional
  `.dlg { display: flex }` rule was overriding the UA's
  `dialog:not([open]) { display: none }` in some browsers, leaving the
  drawer's content rendered inline in the page flow before any
  interaction. Scoped `display: flex` to `.dlg[open]` and added
  `.dlg:not([open]) { display: none !important }` for safety.
- **`<tc-drawer>` slide-in animation never firing.** `transition` can't
  animate `display: none → display: flex` (which is what `showModal()`
  triggers), so the drawer just popped in. Replaced with per-side
  `@keyframes` animations that re-run on each appearance.
- **`<tc-carousel>` slides stacking vertically.** `slot { display: contents }`
  + `.track { display: flex }` doesn't reliably project slotted children
  as flex items across browsers — they ended up as a single inline-block
  flex item with their content stacking vertically. Made the `<slot>`
  itself the flex track instead.
- **`<tc-carousel>` not shrinking below `max-width` in flex parents.**
  Inside a `display: flex` container, a carousel with a user
  `max-width` and default `flex-basis: auto` asserted its full max-width
  and overflowed narrow viewports. Set `:host { width: 100% }` so the
  carousel always fills its container, capped by any user-supplied
  `max-width`.

### Docs

- **README catches up to v1.6.** Was stuck at the v1.3 snapshot — now
  lists all 35 components across six categories, including the new
  overlays (modal, drawer, tooltip, popover, toast) and docs/content
  (code, callout, toc) sections.
- **Blog post component-demo blocks now have proper spacing.** The post
  template's `SHARED_STYLE` had no `.stage` or `tc-code` margin rules,
  so live demos sat directly against the code block beneath them with no
  breathing room.

## [1.6.0] - 2026-05-12

> The "premium primitives" release. Eleven new components, kit grows from
> 24 → 35.

### Added

- **`<tc-carousel>`** — slide / fade transitions, autoplay with
  pause-on-hover, keyboard nav (`←` / `→`, `↑` / `↓`, `Home` / `End`),
  pointer swipe, dot indicators, prev / next controls, vertical mode,
  `prefers-reduced-motion` aware. Slides go in the default slot — the
  component observes children via `MutationObserver` and a
  `slotchange` listener, so dynamic add / remove just works. Props:
  `value`, `autoplay`, `loop`, `orientation`, `transition`,
  `indicators`, `controls`, `swipe`, `pauseOnHover`, `ariaLabel`,
  `height`. Event: `tc-change`.

- **`<tc-accordion>`** — disclosure group built on native
  `<details>` elements. Children are slotted directly; the component
  styles them and coordinates single-open behavior (one open at a
  time) or `mode="multi"` (any number open). Arrow / `Home` / `End`
  navigate between summaries; an animated caret is injected into the
  light DOM so it survives slot projection. Event: `tc-change` with
  the list of currently-open item ids.

- **`<tc-tooltip>`** — hover / focus tooltip anchored to a slotted
  trigger. Renders via the browser popover API, so it lives in the
  top-layer and is never clipped by an ancestor's `transform`,
  `backdrop-filter`, or `overflow: hidden`. Auto-flips to the
  opposite side when its preferred placement would push it off-screen.
  Props: `text`, `placement`, `delay`, `offset`, `disabled`.
  Optional `content` slot for rich tooltip bodies (kbd shortcuts,
  icons, etc.).

- **`<tc-popover>`** — click-triggered floating panel for menus,
  filter forms, and quick actions. Same top-layer treatment as the
  tooltip; closes on outside click and `Esc` by default. Two slots:
  `trigger` for the anchor, default for the panel body. Props:
  `open` (reflects), `placement`, `offset`, `dismissible`. Events:
  `tc-open`, `tc-close` (with `reason: "outside" | "escape" | "trigger" | "api"`).

- **`<tc-drawer>`** — side sheet that slides in from any edge,
  backed by `<dialog>` + `showModal()`. Focus is trapped, scroll is
  preserved, and `Esc` dismisses for free. Props: `open`, `side`
  (`left` / `right` / `top` / `bottom`), `size`, `dismissible`,
  `title`. Slots: default + `footer`. Event: `tc-close` with the
  dismiss reason.

- **`<tc-progress>`** — linear or circular, determinate or
  indeterminate, three sizes. Proper ARIA progressbar semantics
  (`aria-valuenow / valuemin / valuemax` for determinate,
  `aria-valuetext` for indeterminate). Indeterminate animations
  slow down rather than stop when `prefers-reduced-motion: reduce`.
  Optional inline value label.

- **`<tc-stepper>`** — multi-step indicator for wizards, onboarding,
  and checkout. Horizontal or vertical, optional `clickable` mode
  that turns each step into a real `<button>` and emits
  `tc-step-change`. Three states per step (done / current /
  upcoming) with distinct marker styling and connector colors.

- **`<tc-avatar>`** — image avatar with deterministic-tint initials
  fallback (the same name always gets the same color across pages,
  derived from a 7-stop palette). Status dot (`online` / `away` /
  `busy` / `offline`), optional ring, five sizes (20 / 28 / 36 /
  48 / 64 px), circle or square.

- **`<tc-avatar-group>`** — overlapping cluster of avatars with an
  overflow "+N" pill. Auto-inherits `size` to children, three
  spacing densities (`tight` / `normal` / `loose`), hidden avatars
  are pulled from the accessibility tree.

- **`<tc-rating>`** — star rating input with optional half-star
  precision (clip-path keeps half-fill exact at any zoom).
  `role="slider"` when interactive, `role="img"` when read-only,
  keyboard nav (`←` / `→` / `↑` / `↓` / `Home` / `End`), hover
  preview, click-to-clear if you tap the current value.

- **`<tc-slider>`** — themed range input built on
  `<input type="range">`, so keyboard, touch, and screen-reader
  behavior come from the platform. Adds optional ticks, label,
  current-value display with custom suffix (`%`, `px`, etc.).
  Events: `tc-input` (live, while dragging) and `tc-change` (on
  commit).

### Notes

- Site bundle, component HTML pages, and `search.json` are
  regenerated. The site components index page (`components.html`)
  now showcases all 35 components in the kit.

## [1.5.0] - 2026-05-12

> The "combobox + sturdier defaults" release.

### Added

- **`<tc-combobox>`** — searchable, optionally multi-select dropdown with
  per-option icon prefixes (emoji or single glyph), tag chips for the
  multi-select case, keyboard navigation (↑/↓/Enter/Esc/Backspace), and
  form-association. Built for "select N from many" widgets like country
  pickers with flags, tag editors, or assignee dropdowns — the cases
  where the native `<select multiple>` is too clumsy. Multi-select
  submits one FormData entry per chosen value when a `name` is set.
  Props: `value`, `name`, `options`, `multiple`, `searchable`,
  `placeholder`, `empty-text`, `label`, `helper`, `error`, `disabled`,
  `required`, `max`. Events: `tc-change`, `tc-search`, `tc-open`,
  `tc-close`. Shares the input's `--tc-input-*` theme tokens.

### Changed

- **`<tc-card>` padding is now sticky.** Previously the body padding
  depended on the `padded` class being applied. If the class somehow
  didn't render (e.g. a host with default-undefined prop), the body
  ended up with zero padding. Padding is now the deterministic default
  in CSS; the opt-out goes through an explicit `nopad` class that only
  applies when `padded` is exactly `false`. Cards without a `padded`
  attribute now reliably have padding out of the box.

## [1.4.0] - 2026-05-11

> The "papercuts from dogfooding" release. Three small wins discovered while
> rebuilding the docs site with the kit itself.

### Added

- **`<tc-pagination>`** — prev/next plus a windowed list of page numbers with
  ellipses for skipped ranges. Configurable `current`, `total`, `siblings`,
  and `boundaries`. Emits `tc-page-change` with `{ page }` so the parent can
  guard, clamp, or kick off an async load before accepting the change.
- **`href` / `target` / `rel` on `<tc-button>`** — when `href` is set, the
  button renders as an `<a>` instead of a `<button>`, with the same styling
  and variants. `target="_blank"` auto-adds `rel="noopener"`. Disabled
  anchors drop `href` and set `aria-disabled="true"`.

### Changed

- `<tc-code>`'s syntax-token colors now flow through `--tc-code-kw`,
  `--tc-code-str`, `--tc-code-com`, `--tc-code-num`, and `--tc-code-tag`
  (which default to `--tc-code-*-base` for themes to override). Previously
  the demo site hard-coded these as page-level `.tc-kw { color: … }` rules
  that shadowed the slotted theming. Removed those rules from every page
  and from the blog build template so dark / Bootstrap / Tailwind / Material
  / Shadcn themes can adjust code-block contrast.

## [1.3.0] - 2026-05-10

> The "docs primitives" release. Three new components needed before we can
> rewrite the tan-compose docs site using the kit itself.

### Added

- **`<tc-code>`** — styled code block with optional copy button. Provides the
  dark monospace surface, language/filename label, and scroll. Doesn't ship a
  syntax highlighter — projects pre-tokenized spans (`.tc-kw`, `.tc-str`,
  `.tc-com`, `.tc-num`, `.tc-tag`) through the slot with the kit's colors. Emits
  `tc-copy` after a successful copy.
- **`<tc-callout>`** — admonition box. Five variants (note, info, success,
  warning, danger), optional `title`, optional `compact`. Each variant gets its
  own colored left border and icon. `danger` uses `role="alert"`; others use
  `role="note"`.
- **`<tc-toc>`** — auto-generated table of contents. Scans a target selector for
  h2/h3 (configurable), assigns ids to unlabeled headings, renders a nav, tracks
  the currently-visible heading via `IntersectionObserver`. Sticky by default.

5 new tests (34 kit tests total). Bundle is 85 KB minified for all 22
components + 6 themes + inlined core (was 70 KB at 1.2).

### Changed

- Showcase page (`components.html`) gains live demos for each new component.

## [1.2.0] - 2026-05-10

### Added

- **`<tc-table>` per-column `render` callback.** Columns now accept an optional
  `render: (row) => string` that returns raw HTML for that cell, opting out of
  the default escape-on-display behavior. Use it to embed kit components inside
  table cells:
  ```js
  table.columns = [
    { key: "name", label: "Name" },
    {
      key: "status",
      label: "Status",
      render: (row) =>
        `<tc-badge variant="${
          variantFor(row.status)
        }">${row.status}</tc-badge>`,
    },
  ];
  ```
  Cells without a `render` keep escaping (XSS safe). Two regression tests added
  — one for the new path, one asserting the default still escapes
  `<img onerror>` payloads to text.

### Changed

- The admin demo (`/demo/admin/`) now uses `render` callbacks instead of
  pre-computed `*Display` fields. The previous approach silently escaped the
  badge HTML to text and rendered it as literal markup — visible regression
  introduced in 1.1's `for:` migration. The "Anatomy of an admin dashboard" blog
  post is updated to match the correct API.

## [1.1.3] - 2026-05-10

### Fixed

- **`<tc-card>` had inconsistent padding.** The `:has()`-based show/hide logic
  for the head/foot wrappers was fragile (CSS `:has()` doesn't see `<slot>`
  fallback content reliably across implementations), so the body padding
  sometimes failed to apply. Refactored the CSS so the body always pads when
  `padded=true`, the head pads only when there's title/subtitle props OR slotted
  content (detected via a `has-header` class set in the template plus
  `:has(::slotted(*))`), and the foot pads only when slotted content exists.
  Added new theme tokens `--tc-card-padding-x`, `--tc-card-padding-y`,
  `--tc-card-gap` for per-instance density tuning.

## [1.1.2] - 2026-05-10

### Documentation

- Added a proper `kit/README.md` with install, component list grouped by
  category, theming overview, framework-interop notes, and worked examples. Now
  visible on the JSR package page.

## [1.1.1] - 2026-05-10

### Fixed

- **`<tc-table>` filter input lost focus on every keystroke.** The keyed `for:`
  migration in 1.1.0 introduced a regression where typing in the search box
  re-rendered the table, replaced the input element, and the user's caret ended
  up on `document.body`. Fix: `afterRender` now refocuses the rebuilt input and
  restores the caret position when the user was the source of the re-render.
  Regression test added.

## [1.1.0] - 2026-05-10

### Fixed

- **`<tc-modal>` open bug.** Setting `host.open = true` after the initial render
  didn't actually open the dialog — the prop setter triggered a re-render that
  produced a fresh, closed `<dialog>` element, and the `showModal()` call only
  ran on the original. Migrated the imperative sync from `afterMount` (one-shot)
  to the new core `afterRender` hook (every render) and added a regression test.

### Added

- **`<tc-table>` keyed-row reconciliation.** The table now uses the core's
  `for:` for body rows, so DOM nodes survive across renders. Typing into the
  search filter no longer rebuilds every row — only the slice that changed. Big
  perf win for tables of a few hundred rows or more.
- **Two more theme presets:** `@ra9/tan-compose-kit/themes/material` and
  `@ra9/tan-compose-kit/themes/shadcn`. Six total now.

## [1.0.0] - 2026-05-10

> First stable release. The kit ships 19 components and 4 theme presets, all
> built on `@ra9/tan-compose@^1.0`.

### Added

- **6 new components** for a total of 19:
  - `<tc-textarea>` — multi-line form-associated input with the same chrome
    (label / helper / error) as `<tc-input>`.
  - `<tc-file>` — form-associated file picker with a styled trigger button.
    Supports `multiple` and `accept`.
  - `<tc-radio-group>` — single-choice form-associated control. Renders radios
    from a JSON `options` prop.
  - `<tc-stack>` — vertical layout primitive with token-scale `gap`.
  - `<tc-cluster>` — horizontal flex layout with wrap, alignment, and
    `justify="between"` shorthand.
  - `<tc-grid>` — auto-fit grid layout with configurable `min` column width or
    fixed `columns`.

- **Theming layer** — global semantic CSS custom properties on `:root`
  (`--tc-color-*`, `--tc-radius-*`, `--tc-shadow-*`, `--tc-font-*`,
  `--tc-space-*`, `--tc-focus-ring`). Every component now references these
  tokens with a hardcoded fallback, so re-skinning the entire kit is a CSS
  one-liner:
  ```css
  :root {
    --tc-color-accent: #0d6efd;
  }
  ```

- **Four theme presets** — drop-in modules that override the global tokens:
  - `@ra9/tan-compose-kit/themes/tokens` — the base light theme (auto-injected;
    idempotent).
  - `@ra9/tan-compose-kit/themes/dark` — dark surface + ink, accent brightened
    for dark mode.
  - `@ra9/tan-compose-kit/themes/bootstrap` — Bootstrap 5 primary palette and
    radius. Drop in alongside Bootstrap so kit components match.
  - `@ra9/tan-compose-kit/themes/tailwind` — Tailwind slate/indigo palette.

- **Per-component sub-path exports** for tree-shaking. Import only what you use:
  ```js
  import "@ra9/tan-compose-kit/button";
  import "@ra9/tan-compose-kit/table";
  ```

### Changed

- All 13 existing components had their `theme` blocks refactored to reference
  the new global tokens. **No source-level breaking change** — per-component
  override hooks (e.g. `--tc-btn-primary-bg`) still work. The default values now
  resolve through the global token cascade.
- Kit version is now independent of core. The kit pins `@ra9/tan-compose` at
  `^1.0.0`.

### Known limitations

- `<tc-table>` still interpolates rows in a template string rather than using
  the core's `for:` keyed reconciliation. This is fine for tables up to a few
  hundred rows; for 10k+ rows pair with windowing or migrate to a custom
  describe-tree. (Tracked for v1.1.)

## [0.3.0] - 2026-05-10

### Added

- 5 components: `<tc-checkbox>`, `<tc-switch>`, `<tc-card>`, `<tc-badge>`,
  `<tc-skeleton>`.

## [0.2.0] - 2026-05-10

### Added

- 5 components: `<tc-modal>`, `<tc-tabs>`, `<tc-select>`, `<tc-stat>`,
  `<tc-toast>`.

## [0.1.0] - 2026-05-10

### Added

- Initial release with `<tc-button>`, `<tc-input>`, `<tc-table>`. Built on
  `@ra9/tan-compose@^0.4`.
