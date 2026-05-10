# @ra9/tan-compose-icons

`<tc-icon>` — a tiny inline-SVG icon component for the
[tan-compose](https://jsr.io/@ra9/tan-compose) ecosystem. Ships ~40 common icons
drawn from the [Lucide](https://lucide.dev) set, all 24×24 at 2px stroke, color
via `currentColor`.

```bash
deno add jsr:@ra9/tan-compose-icons
# or
npx jsr add @ra9/tan-compose-icons
```

```html
<script type="module">
  import "@ra9/tan-compose-icons";
</script>

<tc-icon name="check"></tc-icon>
<tc-icon name="search" size="20" stroke="tomato"></tc-icon>
<tc-icon name="settings" size="32" title="Open settings"></tc-icon>
```

## Why a custom element

Icons are markup, not assets. Treating them as components means:

- **Color inheritance.** `<tc-icon>` uses `currentColor`, so it picks up
  whatever text color is in scope.
- **Trivial sizing.** `size="1em"` (the default) inherits the parent's
  font-size; pass any CSS length to override.
- **Accessible by default.** Pass `title` for a labeled icon (sets
  `role="img"`); omit it and the icon is `aria-hidden="true"`.
- **No build step.** Drop in a script tag, use as HTML.

## Props

| Prop     | Type   | Default          | Description                                        |
| -------- | ------ | ---------------- | -------------------------------------------------- |
| `name`   | string | `""`             | The icon to render. See [iconNames](#icon-names).  |
| `size`   | string | `"1em"`          | CSS length applied to width/height.                |
| `stroke` | string | `"currentColor"` | SVG stroke color.                                  |
| `fill`   | string | `"none"`         | SVG fill color.                                    |
| `title`  | string | `""`             | Accessible name. Sets `role="img"` when non-empty. |

Unknown names render a placeholder `?` glyph so missing icons are visually
obvious in development.

## Icon names

The built-in set covers the 80% case for app UI:

```text
alert-circle alert-triangle arrow-down arrow-left arrow-right arrow-up
calendar check check-circle chevron-down chevron-left chevron-right
chevron-up clock copy download edit external-link eye eye-off filter
home info loader log-in log-out mail menu minus moon more-horizontal
more-vertical plus refresh save search settings sun trash upload user
users x x-circle
```

Get the full list at runtime:

```js
import { iconNames } from "@ra9/tan-compose-icons";
console.log(iconNames); // string[]
```

Or check programmatically:

```js
import { ICONS } from "@ra9/tan-compose-icons";
ICONS["check"]; // SVG inner content as string
```

## Pairing with the kit

The kit's components are color-aware via `currentColor`, so icons drop straight
in:

```html
<tc-button variant="primary">
  <tc-icon name="save" size="16"></tc-icon>
  Save changes
</tc-button>

<tc-input label="Search">
  <tc-icon name="search" slot="prefix"></tc-icon>
</tc-input>
```

## Adding more icons

The bundled set is intentionally minimal. If you need more:

1. **Inline custom SVG** — just write `<svg>` directly. `<tc-icon>` is for the
   common case, not every case.
2. **Extend the set** — `import { ICONS }` and add entries. Then
   `<tc-icon name="my-custom-icon">` works.
3. **Use Lucide directly** — the
   [Lucide Web Components](https://lucide.dev/guide/packages/lucide-static)
   package ships the full ~1000-icon catalogue.

## Tree-shaking

The icon SVG paths live in their own module:

```js
// Just the registry, no `<tc-icon>` component:
import { iconNames, ICONS } from "@ra9/tan-compose-icons/icons";
```

Useful when you want the icons but are rendering them via a different mechanism
(e.g. server-side string templating).

## Per-bundle size

The full bundle (component + 40 icons) is about 8 KB minified. Each icon path is
a few hundred bytes; the component shell is ~2 KB.

## License

MIT for the `<tc-icon>` component code. Icon paths are sourced from
[Lucide](https://lucide.dev), licensed under
[ISC](https://github.com/lucide-icons/lucide/blob/main/LICENSE).

See the repo root for the project license.
