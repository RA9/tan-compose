# @ra9/tan-compose-kit

Battle-tested Web Components built on top of
[`@ra9/tan-compose`](https://jsr.io/@ra9/tan-compose). 36 components, 6 theme
presets, ~205 KB minified (~45 KB gzipped) for the whole bundle. No JSX, no
compiler, no runtime framework — just custom elements you drop into HTML,
React, Vue, Astro, or anywhere else custom elements work.

```bash
deno add jsr:@ra9/tan-compose-kit
# or
npx jsr add @ra9/tan-compose-kit
```

```html
<script type="module">
  import "@ra9/tan-compose-kit";
  import "@ra9/tan-compose-kit/themes/tokens"; // default light theme
</script>

<tc-button variant="primary">Save</tc-button>
<tc-input label="Email" name="email" type="email" required></tc-input>
<tc-table id="t" page-size="10"></tc-table>
```

### From a CDN, no build step

Each release ships a pre-built `kit/dist/kit.min.js` (all 35 components,
core inlined) plus per-theme bundles. Load them straight from jsDelivr —
jsDelivr serves the file byte-for-byte at the matching tag, so what you
ship is what the browser runs (no esm.sh transformer in the loop):

```html
<script type="module"
  src="https://cdn.jsdelivr.net/gh/RA9/tan-compose@kit-v1.7.0/kit/dist/themes/tokens.min.js"></script>
<script type="module"
  src="https://cdn.jsdelivr.net/gh/RA9/tan-compose@kit-v1.7.0/kit/dist/kit.min.js"></script>

<tc-button variant="primary">Save</tc-button>
```

Swap the tag (`@kit-v1.7.0`) for whichever version you want to pin to.
Available theme bundles: `tokens`, `dark`, `bootstrap`, `tailwind`,
`material`, `shadcn`.

[**Live demo**](https://ra9.github.io/tan-compose/components.html) ·
[**Themes**](https://ra9.github.io/tan-compose/themes.html) ·
[**Admin dashboard**](https://ra9.github.io/tan-compose/demo/admin/) ·
[**Tutorial: build a tasks app in ~80 lines**](https://ra9.github.io/tan-compose/blog/build-a-tasks-app.html)

## Components

Each component is its own ES module, so you can import only the ones you use:

```js
import "@ra9/tan-compose-kit/button";
import "@ra9/tan-compose-kit/table";
```

Or import the whole kit at once with `import "@ra9/tan-compose-kit"`.

### Form fields

| Tag                | Description                                                       |
| ------------------ | ----------------------------------------------------------------- |
| `<tc-button>`      | Variants (primary/secondary/ghost/danger), 3 sizes, loading.      |
| `<tc-input>`       | Form-associated text input. label / helper / error chrome.        |
| `<tc-textarea>`    | Multi-line input with the same chrome as `<tc-input>`.            |
| `<tc-select>`      | Form-associated dropdown wrapping a native `<select>`.            |
| `<tc-combobox>`    | Searchable, optionally multi-select dropdown with icon prefixes.  |
| `<tc-checkbox>`    | Form-associated checkbox; supports indeterminate state.           |
| `<tc-switch>`      | Toggle with `role="switch"`. Form-associated.                     |
| `<tc-file>`        | Form-associated file picker with a styled trigger.                |
| `<tc-radio-group>` | Single-choice group rendered from a JSON `options` prop.          |
| `<tc-slider>`      | Themed `<input type="range">` with ticks, label, suffix.          |
| `<tc-rating>`      | Star rating with half-star precision, keyboard nav, readonly.     |

All form fields participate in `<form>` submission via `ElementInternals` —
`FormData`, `form.reset()`, the validity API, browser autofill all work as
expected.

### Data

| Tag               | Description                                                            |
| ----------------- | ---------------------------------------------------------------------- |
| `<tc-table>`      | Sortable, filterable, paginated. Real keyed `for:` row reconciliation. |
| `<tc-pagination>` | Prev/next + windowed page numbers with siblings/boundaries.            |
| `<tc-chart>`      | SVG line / area / bar / sparkline / donut. Themed via CSS tokens.      |

### Overlays

Top-layer rendering (popover API / native `<dialog>`) so nothing gets clipped
by an ancestor's stacking context, `overflow: hidden`, or `transform`.

| Tag            | Description                                                          |
| -------------- | -------------------------------------------------------------------- |
| `<tc-modal>`   | Native `<dialog>`-backed modal. Focus trap, footer slot.             |
| `<tc-drawer>`  | Side sheet from any edge. Same `<dialog>` machinery as modal.        |
| `<tc-tooltip>` | Hover/focus tooltip with auto-flip placement.                        |
| `<tc-popover>` | Click-triggered floating panel. Outside-click + `Esc` dismiss.       |
| `<tc-toast>`   | Inline notification with auto-dismiss + close button.                |

### Chrome / feedback

| Tag                 | Description                                                 |
| ------------------- | ----------------------------------------------------------- |
| `<tc-tabs>`         | ARIA tablist with arrow-key roving focus and named slots.   |
| `<tc-accordion>`    | Native `<details>` group. Single or multi-open.             |
| `<tc-carousel>`     | Slide / fade carousel with autoplay, swipe, indicators.     |
| `<tc-stepper>`      | Multi-step indicator. Horizontal/vertical, clickable mode.  |
| `<tc-progress>`     | Linear or circular. Determinate or indeterminate.           |
| `<tc-stat>`         | Metric card: label, value, prefix/suffix, delta + trend.    |
| `<tc-card>`         | Layout primitive. Title/subtitle, named slots for sections. |
| `<tc-badge>`        | Status label. 5 variants × 2 sizes, optional pill rounding. |
| `<tc-avatar>`       | Image with deterministic-tint initials fallback, status.    |
| `<tc-avatar-group>` | Overlapping avatar cluster with "+N" overflow pill.         |
| `<tc-skeleton>`     | Loading placeholder with shimmer (respects reduced motion). |

### Layout primitives

| Tag            | Description                                                    |
| -------------- | -------------------------------------------------------------- |
| `<tc-stack>`   | Vertical flow with token-scale `gap`.                          |
| `<tc-cluster>` | Horizontal flex with wrap + `justify="between"` shorthand.     |
| `<tc-grid>`    | Auto-fit grid; configure with `min` column width or `columns`. |

### Docs & content

| Tag            | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| `<tc-code>`    | Code block with syntax-highlight spans and copy button.      |
| `<tc-callout>` | Aside box (info/success/warning/danger) with optional title. |
| `<tc-toc>`     | Auto-generated table of contents from a target's headings.   |

## Theming

Three layers of override, all CSS:

1. **Global semantic tokens** on `:root`: `--tc-color-*`, `--tc-radius-*`,
   `--tc-shadow-*`, `--tc-font-*`, `--tc-space-*`, `--tc-focus-ring`.
2. **Per-component tokens** like `--tc-btn-primary-bg` — default to the global
   tokens, override granularly.
3. **Per-instance** via inline `style="--tc-btn-primary-bg: …"`.

Six drop-in presets ship with the kit:

```js
import "@ra9/tan-compose-kit/themes/tokens"; // light (default)
import "@ra9/tan-compose-kit/themes/dark"; // dark mode
import "@ra9/tan-compose-kit/themes/bootstrap"; // Bootstrap 5 palette
import "@ra9/tan-compose-kit/themes/tailwind"; // Tailwind slate/indigo
import "@ra9/tan-compose-kit/themes/material"; // Material Design 3
import "@ra9/tan-compose-kit/themes/shadcn"; // shadcn/ui zinc-900
```

Or write your own — set the tokens you want to change on `:root` and the rest
cascade from the base.

See [themes.html](https://ra9.github.io/tan-compose/themes.html) for the
complete token catalogue and a live theme switcher.

## Framework interop

The kit's components live in Shadow DOM, so they don't fight global Bootstrap or
Tailwind classes — your existing CSS framework's styles never reach inside, and
the kit's never reach outside. The Bootstrap and Tailwind presets just align the
kit's accent / radius / font with the framework's defaults so they look like one
system:

```html
<link rel="stylesheet" href="bootstrap.min.css" />
<script type="module">
  import "@ra9/tan-compose-kit";
  import "@ra9/tan-compose-kit/themes/bootstrap";
</script>

<div class="container">
  <tc-input label="Email"></tc-input>
  <tc-button variant="primary">Save</tc-button>
</div>
```

## Forms work natively

Every form field uses Form-Associated Custom Elements, so the standard form APIs
work:

```html
<form id="signup">
  <tc-input label="Email" name="email" type="email" required></tc-input>
  <tc-select label="Plan" name="plan"></tc-select>
  <tc-checkbox label="Subscribe to updates" name="subscribe"></tc-checkbox>
  <tc-button>Sign up</tc-button>
</form>

<script type="module">
  document.querySelector("tc-select").options = [
    { value: "free", label: "Free" },
    { value: "pro", label: "Pro" },
  ];

  document.getElementById("signup").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    console.log(data);
    // → { email: "...", plan: "pro", subscribe: "on" }
  });
</script>
```

## Building a feature

The 80-line tasks-app tutorial is the best worked example —
[Build a tasks app in ~80 lines](https://ra9.github.io/tan-compose/blog/build-a-tasks-app.html)
walks from empty page to complete CRUD using nine kit components.

## Documentation

- [Components gallery](https://ra9.github.io/tan-compose/components.html)
- [Themes & framework interop](https://ra9.github.io/tan-compose/themes.html)
- [Admin dashboard demo](https://ra9.github.io/tan-compose/demo/admin/)
- [Core API reference](https://ra9.github.io/tan-compose/docs.html)
- [CHANGELOG](./CHANGELOG.md)

## License

MIT — see the repo root for the license file.
