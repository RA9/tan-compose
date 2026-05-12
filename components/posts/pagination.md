---
tag: tc-pagination
slug: pagination
category: docs / content
summary: Prev/next + windowed page numbers with ellipses. Emits a change event — the parent decides when to update.
description: tc-pagination documentation — windowing, sizes, custom labels, theming, and accessibility.
importPath: "@ra9/tan-compose-kit/pagination"

props:
  - name: current
    type: number
    default: "1"
    description: The active page (1-based).
  - name: total
    type: number
    default: "1"
    description: Total number of pages. When `total <= 1` the component renders nothing.
  - name: siblings
    type: number
    default: "1"
    description: How many page numbers to show on each side of the current page.
  - name: boundaries
    type: number
    default: "1"
    description: How many pages to always keep visible at the very start and end of the range.
  - name: size
    type: '"sm" | "md" | "lg"'
    default: '"sm"'
    description: Forwarded to the underlying `tc-button` controls.
  - name: prev-label
    type: string
    default: '"Prev"'
    description: Text on the "previous" button. Useful for i18n.
  - name: next-label
    type: string
    default: '"Next"'
    description: Text on the "next" button.
  - name: label
    type: string
    default: '"Pagination"'
    description: Accessible label on the wrapping `<nav>`.

events:
  - name: tc-page-change
    detail: "{ page: number }"
    description: Fires when the user picks a different page. The component does NOT update `current` itself — the parent must.

slots: []

cssVars: []

related:
  - table
  - button
  - toc
---

### Basic usage

The component is controlled — it tells you when the user clicks a page, and you decide what to do.

```html
<tc-pagination id="pager" current="3" total="12"></tc-pagination>

<script type="module">
  const pager = document.getElementById("pager");
  pager.addEventListener("tc-page-change", (e) => {
    pager.current = e.detail.page;
    loadPage(e.detail.page);
  });
</script>
```

### Windowing

`siblings` controls how many numbers appear on each side of the current page; `boundaries` keeps a fixed number of pages pinned to the ends. With `current=5, total=10, siblings=1, boundaries=1` you get: `1 … 4 5 6 … 10`.

```html
<tc-pagination current="5" total="10" siblings="1" boundaries="1"></tc-pagination>
```

Wider window:

```html
<tc-pagination current="5" total="20" siblings="2" boundaries="2"></tc-pagination>
```

### Sizes

`size` is forwarded to the underlying `tc-button`s.

<div class="stage col">
  <tc-pagination size="sm" current="3" total="10"></tc-pagination>
  <tc-pagination size="md" current="3" total="10"></tc-pagination>
  <tc-pagination size="lg" current="3" total="10"></tc-pagination>
</div>

### Custom labels

Useful for translated UIs:

```html
<tc-pagination
  current="2"
  total="8"
  prev-label="Précédent"
  next-label="Suivant"
  label="Pagination"
></tc-pagination>
```

### Small datasets

When `total <= 1`, the component renders nothing — safe to drop into a page that may or may not need paginating.

```html
<tc-pagination current="1" total="1"></tc-pagination>
<!-- renders no DOM -->
```

### With `tc-table`

`tc-table` has its own built-in pagination, but for client-side filtering with custom page UI, render the table without its pager and use `tc-pagination` separately:

```html
<tc-table id="t" page-size="999" filterable="false" rows='[…]' columns='[…]'></tc-table>
<tc-pagination id="p" current="1" total="12"></tc-pagination>
```

### Theming

The component delegates all styling to `tc-button` and the global accent + ink tokens. To re-skin, theme `tc-button`.

### Accessibility

- The container is a `<nav>` with an `aria-label` (default: "Pagination").
- The current page button has `aria-current="page"` and is non-interactive via `pointer-events: none`.
- Prev / next buttons are disabled at the edges; disabled buttons drop their `data-page` so clicks do nothing.
- The ellipsis is `aria-hidden` — screen readers skip the visual separator and announce only the page numbers.
