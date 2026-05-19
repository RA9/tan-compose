# Changelog — @ra9/tan-compose-icons

All notable changes to this icon set are documented here. The package is
versioned independently of `@ra9/tan-compose` and `@ra9/tan-compose-kit`.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and the project adheres to [Semantic Versioning](https://semver.org/).

## [0.2.0] - 2026-05-19

### Added — 44 new icons (88 total)

Doubles the bundled set with a focus on money, commerce, and the
other essentials apps reach for first. All icons are sourced from
Lucide (lucide.dev, ISC) at the standard 24x24 / stroke-width-2 spec
so they sit next to the existing set without visual drift.

**Money & payments** (10): `banknote`, `calculator`, `coins`,
`credit-card`, `dollar-sign`, `landmark`, `percent`, `piggy-bank`,
`receipt`, `wallet`.

**Trends & charts** (4): `bar-chart`, `pie-chart`, `trending-down`,
`trending-up`.

**Commerce** (6): `gift`, `package`, `shopping-bag`, `shopping-cart`,
`tag`, `truck`.

**Communication** (4): `bell`, `message-square`, `phone`, `send`.

**Files & documents** (6): `clipboard`, `file-text`, `folder`, `image`,
`paperclip`, `printer`.

**Security** (4): `key`, `lock`, `shield`, `unlock`.

**Maps & links** (3): `globe`, `link`, `map-pin`.

**Social & feedback** (3): `bookmark`, `heart`, `star`.

**Layout & lists** (2): `grid`, `list`.

**People** (2): `user-check`, `user-plus`.

Note on naming: Lucide upstream renamed `bar-chart` → `chart-bar`,
`pie-chart` → `chart-pie`, and `unlock` → `lock-open` in recent
releases. The kit keeps the legacy names because they read more
naturally in template code (`<tc-icon name="bar-chart">` over
`name="chart-bar"`). The underlying path data is the current Lucide
source either way.

## [0.1.2] - 2026-05-13

### Fixed

- **`@ra9/tan-compose` import resolved to the icons package itself in
  published builds.** `icons/deno.json` mapped the core to `../mod.ts` —
  a monorepo-local path JSR's publish + npm-compat shim couldn't follow,
  so the bare specifier fell back to the icons package's own file.
  Consumers got an error like `The requested module
  './ra9__tan-compose-icons.mjs' does not provide an export named
  'build'`. Now the entry is `jsr:@ra9/tan-compose@^1.1.1`. Workspace
  resolution still wins locally (Deno prefers the matching workspace
  member name), so dev loop is unchanged. Same fix as kit v1.6.2.

## [0.1.1] - 2026-05-10

### Added

- Top-level `README.md` documenting the 4-prop API (`name`, `size`, `stroke`,
  `fill`, `title`), the full list of bundled icon names, pairing patterns with
  `@ra9/tan-compose-kit`, and the path to extend the set or fall back to the
  full Lucide catalogue. README-only release so it lands on the JSR package
  page (which reads from the published manifest, not from `main`).

## [0.1.0] - 2026-05-10

> Initial release. Ships a single `<tc-icon>` custom element backed by 44
> commonly-needed icons drawn from [Lucide](https://lucide.dev) (ISC).

### Added

- **`<tc-icon>`** custom element built on `@ra9/tan-compose`. Props:
  - `name` — required, one of the 44 bundled icons. Unknown names render a
    visible placeholder square with a `?` so missing entries don't go
    silently missing.
  - `size` — any CSS length (default `1em`). Sizes width and height together.
  - `stroke` — color (default `currentColor`). Inherits from the surrounding
    text so icons drop cleanly into buttons, links, badges, headings.
  - `fill` — color (default `none`). Most Lucide icons are stroke-only
    outlines; override for filled variants.
  - `title` — accessible name. When set, the SVG gets `role="img"` and
    `aria-label`. When empty, it gets `aria-hidden="true"` (decorative).
- 44 icons in five categories:
  - **Alerts & status** — `alert-circle`, `alert-triangle`, `info`, `check`,
    `check-circle`, `x`, `x-circle`
  - **Navigation** — `arrow-up`, `arrow-right`, `arrow-down`, `arrow-left`,
    `chevron-up`, `chevron-right`, `chevron-down`, `chevron-left`,
    `external-link`
  - **Common actions** — `plus`, `minus`, `search`, `filter`,
    `more-horizontal`, `more-vertical`, `settings`, `edit`, `trash`, `copy`,
    `save`, `download`, `upload`
  - **Domain** — `user`, `users`, `mail`, `calendar`, `clock`, `home`
  - **Controls** — `menu`, `log-in`, `log-out`, `moon`, `sun`, `eye`,
    `eye-off`, `loader`, `refresh`
- Type-safe `IconName` union exported from `./icons.ts` for use in
  `tc-icon name`-typed wrappers.
- All paths are drawn for a 24×24 viewBox at stroke-width 2, matching
  Lucide's defaults. Extending the set is a matter of appending to the
  `ICONS` map alphabetically.
