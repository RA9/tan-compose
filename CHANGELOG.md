# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-05-10

### Breaking Changes

- **Lifecycle ordering fixed.** `beforeMount` now fires before the first render;
  `afterMount` fires after `connectedCallback` finishes wiring listeners. Code
  that relied on `beforeMount` running after construction may need to move that
  work into the constructor or `afterMount`.
- **`setState` now triggers a re-render.** Previously it silently mutated an
  internal map. If your code called `setState` for non-render bookkeeping, those
  calls now also re-render the component.
- **`observedAttributes` is now an explicit `string[]` field on
  `DescribeOptions`.** Reactivity no longer auto-derives from the keys of
  `attributes` — you must opt in:
  `describe({ observedAttributes: ["data-x"] })`.
- **`describe()` now validates input** and throws `TypeError` on invalid options
  (non-string `tag`, non-array `children`, non-function hooks, etc.).
- **`build()` now validates the tag name.** It must be lowercase and contain a
  hyphen — invalid names throw `TypeError` instead of being silently passed
  through to `customElements.define`.

### Added

- New `unmount` lifecycle hook fired on `disconnectedCallback`.
- `getRegisteredComponents()` and `isComponentRegistered()` are now exported
  from `mod.ts` (previously only on `build.ts`).
- TypeScript types `DescribeOptions`, `EventEmitter`, `Theme`, `Styles` are now
  exported from `mod.ts`.
- `deno task` shortcuts: `test`, `test:cov`, `check`, `fmt`, `fmt:check`,
  `lint`, `bundle`, `ci`.
- 16-test DOM suite using `happy-dom` covering registration, lifecycle,
  reactivity, event emission, theming, and listener-leak prevention.
- `.gitignore` populated with `coverage/`, `node_modules/`, `.env*`,
  `.DS_Store`.

### Fixed

- **Listener leak on re-render.** Children attached via `template`/`children`
  now have their click handlers and emit listeners cleaned up before the subtree
  is rebuilt. Previously, every re-render added new listeners without removing
  the old ones.
- `attributeChangedCallback` no longer triggers a render before the component is
  mounted (avoids "render before connect" race).
- Errors thrown inside lifecycle hooks are now caught and logged with the
  component tag name, instead of breaking the surrounding browser code path.
- `setState` is a no-op when the new value is `Object.is`-equal to the old value
  (prevents unnecessary re-renders).
- `getState<T>(key)` is now generic and returns `T | undefined`.

### Changed

- `mod.ts` now re-exports the full public API surface in one place.
- Public-facing JSDoc on every exported symbol.
- CI workflow updated to use `denoland/setup-deno@v2` and run `deno task ci`.
- Re-rendered DOM uses `replaceChildren()` for cleaner cycle semantics.

### Documentation

- Rewrote `docs.html` (the previous file was malformed with stray closing tags
  throughout) into a complete API reference covering every option, instance
  method, lifecycle ordering, reactivity model, and a 0.1.x → 0.2.0 migration
  section.
- Fixed `index.html` hero — text was previously `color: white` on a light
  background and invisible. Header now has a purple gradient with proper
  contrast, a `v0.2.0` version pill, and corrected GitHub/JSR install links.

## [0.1.3] - 2024-11-28

### Added

- Component registry to prevent duplicate registrations
- Memory leak prevention with automatic cleanup of event listeners
- Reactive attribute observation system with `attributeChangedCallback`
- State management with `setState` and `getState` methods
- Template support via `template` property in DescribeOptions
- `beforeMount` lifecycle hook execution
- Proper Shadow DOM encapsulation with CSS-in-JS styling
- `render()` method for manual component re-rendering
- Helper functions: `isComponentRegistered()` and `getRegisteredComponents()`
- Comprehensive documentation with examples
- Landing page with live demos
- 5 interactive example files
- GitHub Actions for CI/CD, version bumping, and JSR publishing

### Fixed

- Memory leaks from uncleaned event listeners in child elements
- Component re-registration crashes
- Closure over description object causing memory bloat
- Missing `beforeMount` hook invocation
- Duplicate slot creation on component reconnection
- Incorrect style application (now uses Shadow DOM properly)
- Broken recursive child building

### Changed

- Refactored `build()` function for production readiness
- Improved `buildElement()` with cleanup function tracking
- Better lifecycle management with `isInitialized` flag
- CSS styles now applied via `<style>` tags instead of inline
- Enhanced component encapsulation and isolation

## [0.1.2] - 2024-XX-XX

### Added

- Initial GitHub Actions workflow for publishing

## [0.1.1] - 2024-XX-XX

### Added

- Basic component building functionality
- Shadow DOM support
- Theme system with CSS variables
- Event emission system

## [0.1.0] - 2024-XX-XX

### Added

- Initial release
- Basic `build()` and `describe()` functions
- Support for nested components
- Styling and theming capabilities
