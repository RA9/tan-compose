# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] - 2026-05-10

> The "feels native" release. Adds refs, Form-Associated Custom Elements, and
> shared adopted stylesheets — the primitives that make tan-compose components
> compose with forms, integrate with non-tan-compose code, and stay performant
> when you have many instances of the same tag.

### Added

- **`refs`.** New field on `DescribeOptions`: `refs: { input: ".search" }`.
  After every render the matching shadow-root elements are exposed as
  `host.refs.input` and `ctx.refs.input` for use in `afterMount`, `events`, and
  external code. Selectors that match nothing yield `null`. Refs are re-queried
  on every render.
- **Form-Associated Custom Elements.** Set `formAssociated: true` and the host
  calls `attachInternals()` automatically. If a `value` prop is declared, its
  setter syncs to `internals.setFormValue` so the host participates in form
  submissions and the validity API. New lifecycle hooks:
  `formAssociatedCallback`, `formDisabledCallback`, `formResetCallback`,
  `formStateRestoreCallback`. The internals are exposed at `host.internals`.
- **Adopted stylesheets.** Theme and container CSS are now compiled to
  `CSSStyleSheet` objects once per registered tag and applied via
  `shadowRoot.adoptedStyleSheets`. 100 instances of the same tag now share 1–2
  sheets instead of 100 inline `<style>` elements. Falls back to per-instance
  `<style>` when constructable stylesheets aren't available.

### Changed

- `ComponentCtx` gains a `refs` getter that always reflects the current render's
  refs.
- README opening rewritten — drops the awkward "DDL (Declarative Definition
  Language)" framing in favour of a plain description.
- `publish.yml` and `version-bump.yml` workflows bumped to
  `denoland/setup-deno@v2` (matches `ci.yml`).

### Migration from 0.3.x

Additive — existing code keeps working. To opt in:

- Replace `afterMount` calls of `this.shadowRoot.querySelector(...)` with a
  `refs` map so you don't have to re-query manually.
- Add `formAssociated: true` plus a `value` prop to any component that
  represents a form field — it'll start submitting with `<form>`.
- No code change required for the stylesheet sharing — it activates
  automatically wherever `CSSStyleSheet.replaceSync` is supported.

## [0.3.0] - 2026-05-10

> The "build big components" release. Adds typed properties, function templates,
> event delegation, conditional rendering, and keyed list reconciliation — the
> primitives needed to build datatables, forms, and other large reusable
> components without reaching for a framework.

### Added

- **Typed properties (`props`).** Components can declare typed properties with
  `string` / `number` / `boolean` / `json` coercion, default values, and
  optional attribute reflection. Setting a property on the instance
  (`el.rows = [...]`) triggers a re-render when the value changes.
- **Function templates.** `template` may now be a function `(ctx) => string`.
  The context exposes `props`, `state`, `setState`, `getState`, `emit`, and
  `host`. Re-evaluated on every render so text interpolation is automatic.
- **Event delegation (`events`).** New field of the form
  `{ "click .selector": handler }`. One listener per event type is attached at
  the shadow-container level; matches are resolved against the composed path.
  Cleaned up automatically on disconnect.
- **Keyed list rendering (`for`).** A child describe can replace `children` with
  `for: { items, key, render }`. The renderer maintains a per-list cache keyed
  by `key(item)` and reuses DOM nodes across renders when the item identity is
  unchanged. Stale items have their cleanups run.
- **Conditional rendering (`if`).** A child describe can take
  `if: (ctx) => boolean`. When false, the subtree is omitted entirely.
- **`ComponentCtx`** is the new render-time argument shape, exported from
  `mod.ts` along with `PropDef`, `PropType`, `TemplateFn`, `ListConfig`, and
  `EventDelegateMap`.
- New `unmount` lifecycle hook (already in 0.2.0, now formally part of the
  ctx-aware API).

### Changed

- `props` keys are automatically merged into the underlying `observedAttributes`
  list, so attribute changes propagate as property updates.
- `setState` now batches re-renders within the same render cycle (a render
  triggered while another render is running is queued and runs after).
- `template` semantics: when a function template is used at the host level
  (top-level `describe()` passed to `build()`), it is invoked on every render
  the same way it is for child describes.

### Migration from 0.2.x

For most users, **0.2.x code keeps working unchanged** — every new field is
opt-in. To start using the new features:

1. **Pass complex data via properties, not attributes.**
   ```js
   build("data-table", describe({
     props: { rows: { type: "json", default: [] } },
     template: ({ props }) => `<p>${props.rows.length} rows</p>`,
   }));

   document.querySelector("data-table").rows = [...];
   ```
2. **Replace manual `afterMount` DOM wiring with `events`.** Before:
   ```js
   afterMount() { this.shadowRoot.querySelector("button").addEventListener(...) }
   ```
   After:
   ```js
   events: { "click button": (e, ctx) => ctx.setState("clicked", true) }
   ```
3. **Replace static row arrays with `for`.**
   ```js
   children: [
     describe({
       tag: "tbody",
       for: {
         items: ({ props }) => props.rows,
         key: (row) => row.id,
         render: (row) => describe({ tag: "tr", template: row.name }),
       },
     }),
   ];
   ```

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
