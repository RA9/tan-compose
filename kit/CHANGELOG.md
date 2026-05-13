# Changelog — @ra9/tan-compose-kit

All notable changes to this kit are documented here. The kit is versioned
independently of the core `@ra9/tan-compose` library.

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
