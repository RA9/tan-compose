# Changelog — @ra9/tan-compose-kit

All notable changes to this kit are documented here. The kit is versioned
independently of the core `@ra9/tan-compose` library.

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
