---
title: Why I built tan-compose
slug: why-i-built-tan-compose
date: 2026-05-10
tag: essay
version: v1.1.0
subtitle: Reusable web components without the framework tax.
description: Why I built tan-compose — a release note for v0.3.0 of the @ra9/tan-compose library.
excerpt: On the framework tax for small UI, what the platform actually gives you, and the v0.3 building blocks for putting together real components — datatables, forms, anything bigger than a styled button — without reaching for React.
---

Most frontend engineers I know — myself included, until recently — reach for React the moment a piece of UI gets the slightest bit interactive. A stats card with a hover state. A button that triggers a modal. A small filter widget on an otherwise static marketing page. We pull in the framework, set up a build, ship a hundred kilobytes of runtime, and call it a component.

This is not an anti-React post. React is great at what it's great at: large applications with deeply nested, mutually dependent state. But the honest truth is that most of the components I write in a given week are not that. They're widgets. They're embeds. They're things the platform can already render natively, if I were willing to talk to it directly. tan-compose is the result of me getting tired of paying a framework tax on UI that didn't need it.

## The platform was always there

Web Components have been a stable, shipping feature in every modern browser for the better part of a decade. `customElements.define` registers a tag. `attachShadow` gives you encapsulation. `<slot>` handles content projection. `connectedCallback`, `disconnectedCallback`, and `attributeChangedCallback` cover the lifecycle. None of this is new, and none of it requires a framework.

The reason most engineers don't reach for it isn't capability — it's ergonomics. Writing a custom element by hand is a slog. You extend `HTMLElement`, you remember to call `super()`, you hand-roll an `observedAttributes` getter, you parse strings into numbers and back again, you manually attach and detach event listeners, and you write the same boilerplate every single time. Once you've done it twice you understand why the React ecosystem won. The platform's API assumes you'll wrap it. tan-compose is that wrapper, kept as thin as I could make it.

## The pitch in three lines

```ts
import { describe, build } from "@ra9/tan-compose";
build("hello-world", describe({ template: "<p>hi</p>" }));
// <hello-world></hello-world> works everywhere
```

No build step. No JSX. No compiler. No runtime besides the browser. About 5 KB on the wire after gzip. The output is a real custom element, which means it works in any HTML page, inside a React tree, inside a Vue template, inside an Astro island, inside a Markdown file rendered through MDX, inside an email preview tool — anywhere the platform's `customElements` registry exists. Which, again, is everywhere.

## What was missing in 0.2

I want to be honest about where the library was before this release. v0.2 had Shadow DOM, theming via CSS custom properties, lifecycle hooks, listener cleanup, and attribute reactivity. That was enough to build the things on the front page of this site: buttons, counters, a card. It was not enough to build anything real.

I tried, on a side project, to build a datatable with v0.2. I wanted rows, sorting, filtering, pagination. By the second evening I had a list of things the library did not have:

- typed props, so I didn't have to coerce attribute strings into numbers and arrays by hand
- templates that re-evaluate when state changes, instead of one-shot HTML strings
- keyed list rendering, so a thousand rows didn't get torn down and rebuilt on every keystroke
- event delegation, so I didn't attach a hundred click handlers to a hundred row buttons
- conditional rendering, so the empty state and the loading state weren't a tangle of `display: none`

Without those, v0.2 was fine for static-ish widgets and not much more. v0.3 is the release where I sat down and added each of them, in the smallest shape I could justify.

## v0.3 — the building blocks

### Typed props

Custom-element attributes are strings. Always. If you want a number, you parse. If you want an array, you `JSON.parse`. v0.3 lets you declare the shape once and stop thinking about it:

```ts
props: {
  count: { type: "number", default: 0 },
  items: { type: "json",   default: [] },
  open:  { type: "boolean", reflect: true },
}
```

The initial value comes from the matching attribute on the host element (string-coerced into the declared type), or the `default` if the attribute is absent. After that, setting `el.count = 5` on the element instance triggers a re-render — but only if the new value differs from the old by `Object.is`. Setting `el.count = 5` twice in a row is a no-op. `reflect: true` writes the value back to the host attribute, which is occasionally what you want for CSS selectors like `:host([open])`.

### Function templates

v0.2's `template` was a string. v0.3's `template` can also be a function: `({ props, state }) => string`. It's re-evaluated on every render, which makes it the natural place to interpolate current values. The `ctx` object passed to templates and event handlers exposes `props`, `state`, `setState`, `getState`, `emit` for dispatching custom events, and `host` for the underlying element.

### Event delegation

```ts
events: {
  "click .row-delete": (event, ctx) => ctx.emit("delete", { id: event.target.dataset.id }),
  "input .search":    (event, ctx) => ctx.setState({ q: event.target.value }),
}
```

One listener is attached per event type at the shadow-container level. When an event fires, the library walks the composed path and matches selectors. This means a list with a thousand rows costs you exactly one `click` listener, not a thousand. It also means handlers survive re-renders without any attach-and-detach dance.

### Keyed list rendering

On a child `describe` you can specify `for: { items, key, render }`. The renderer keeps a `Map<key, element>` per for-block. When `items` changes, items whose identity is unchanged (compared with `===` on the key) reuse their existing DOM node. New items get rendered fresh. Removed items get torn down and their listeners cleaned up. This is the only piece of v0.3 that is not "just the platform" — but it's the piece that makes lists of more than a few dozen items feel right.

### Conditional rendering

Also on a child `describe`: `if: (ctx) => boolean`. If the function returns false, the entire subtree is omitted from the output — no DOM is created at all. This matters because hidden DOM still costs layout, attached listeners, and accessibility tree weight. Conditional rendering means the empty state and the populated state are genuinely separate trees.

## Building a real datatable in ~80 lines

With those five pieces in place, here's what changes. The datatable I couldn't write in v0.2 fits comfortably in v0.3. Take rows and columns as JSON props, expose a search input, paginate at ten per page, and highlight the column being sorted. The shape:

```ts
import { describe, build } from "@ra9/tan-compose";

const table = describe({
  props: {
    rows:    { type: "json", default: [] },
    columns: { type: "json", default: [] },
  },
  state: { q: "", page: 0, sort: null, dir: "asc" },
  // ...events, children below
});
```

The header is a single child describe that maps over `props.columns` with a function template. Each `<th>` writes `data-col` with its column id and gets an `aria-sort` attribute when it matches the current sort. No per-cell click handlers — one delegated listener does the whole header:

```ts
events: {
  "click th": (e, ctx) => {
    const col = e.target.closest("th").dataset.col;
    const { sort, dir } = ctx.getState();
    ctx.setState({
      sort: col,
      dir: sort === col && dir === "asc" ? "desc" : "asc",
    });
  },
  "input .search": (e, ctx) => ctx.setState({ q: e.target.value, page: 0 }),
}
```

The body is the place keyed rendering earns its keep. A `for:` block iterates the filtered + sorted + paginated slice of `rows`, keyed by `row.id`. Because the key function is stable, the same physical `<tr>` elements are reused as the user types. Only the cells whose textContent changed get touched:

```ts
{
  for: {
    items: (ctx) => visibleRows(ctx),
    key:   (row)  => row.id,
    render: (row, ctx) => describe({
      tag: "tr",
      template: ({ props }) => props.columns
        .map((c) => `<td>${row[c.id]}</td>`).join(""),
    }),
  },
}
```

The empty state is a sibling describe with an `if: (ctx) => visibleRows(ctx).length === 0`. The row of pagination controls is another describe with a delegated handler on `.page-prev` and `.page-next`. That's all of it. Register with `build("my-table", table)` and use it from any HTML page:

```html
<my-table
  rows='[{"id":1,"name":"Ada","role":"eng"}, ...]'
  columns='[{"id":"name","label":"Name"}, {"id":"role","label":"Role"}]'
></my-table>
```

That's it. No JSX. No bundler. The whole table re-renders on every keystroke and reuses the existing 10 row nodes — keystrokes feel instant.

## Using tan-compose in your existing project

The honest sell on Web Components is that they show up where other component models can't. A few quick paths in:

### Plain HTML

```html
<script type="module">
  import { describe, build } from "https://esm.sh/jsr/@ra9/tan-compose";
  // register your components here
</script>
<my-table rows="[...]" columns="[...]"></my-table>
```

### React / Next

Import the module for its side effect (the `customElements.define` calls), then use the tag in JSX like any other element. One caveat for React below 19: it stringifies props it doesn't recognize. For complex props, set them imperatively:

```ts
import "@ra9/tan-compose-components";

function Page({ rows }) {
  const ref = useRef(null);
  useEffect(() => { if (ref.current) ref.current.rows = rows; }, [rows]);
  return <my-table ref={ref} />;
}
```

### Vue

Vue treats unknown elements as custom elements out of the box and passes properties correctly with the `:rows="..."` binding. No imperative escape hatch needed.

### Astro, Eleventy, plain Markdown

Drop the `<my-table>` tag into the template and include the module script in the head. The component upgrades on first paint. This is the case I personally care about most: small, embeddable, framework-agnostic widgets that survive being copy-pasted into someone else's site.

## What's not in v0.3

A few things I considered for this release and deliberately held back, so the shape stayed small:

- **Refs.** A first-class way to grab child element instances inside lifecycle hooks. Planned for 0.4.
- **Computed values.** Memoized derivations from props and state. The current pattern (a plain function in the template) is fine for now.
- **SSR / declarative shadow DOM.** The library is render-on-mount today. Streaming the shadow tree at request time is a real piece of work and will land separately.
- **Devtools extension.** A panel that shows props, state, and the keyed list maps. On the wishlist, not promised.
- **A "kit" package.** A separate `@ra9/tan-compose-kit` with primitives like `<tc-input>`, `<tc-modal>`, `<tc-tabs>`. The core library will keep refusing to ship UI of its own.

The library stays small on purpose. If something belongs in userland, I'd rather it live there.

---

Try the [Playground](../playground.html). Read the [Docs](../docs.html). Or fork it on [GitHub](https://github.com/ra9/tan-compose).

The library is what it is — feedback welcome.
