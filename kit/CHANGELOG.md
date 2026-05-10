# Changelog — @ra9/tan-compose-kit

All notable changes to this kit are documented here. The kit is versioned
independently of the core `@ra9/tan-compose` library.

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
