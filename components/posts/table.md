---
tag: tc-table
slug: table
category: data
summary: Sortable, filterable, paginated data table with keyed rows and custom cell renderers.
description: tc-table documentation — rows, columns, sorting, filtering, pagination, theming, and accessibility.
importPath: "@ra9/tan-compose-kit/table"

props:
  - name: rows
    type: "Array<Record<string, unknown>>"
    default: "[]"
    description: The data rows. Each row's `id` field is used as the stable key by default.
  - name: columns
    type: "Array<{ key: string; label: string; sortable?: boolean; render?: (row) => string }>"
    default: "[]"
    description: Column definitions. `render` returns raw HTML and is only available when columns are set as a JS property (functions don't survive JSON attributes).
  - name: pageSize
    type: number
    default: "10"
    description: How many rows to show per page.
  - name: filterable
    type: boolean
    default: "true"
    description: Show the search input above the table.
  - name: emptyText
    type: string
    default: '"No results."'
    description: Message shown when no rows match the filter.
  - name: rowKey
    type: string
    default: '"id"'
    description: Property name used as the stable row key. Identical IDs across renders reuse DOM nodes.

events:
  - name: tc-row-click
    detail: "{ row: object }"
    description: Fires when the user clicks a row.
  - name: tc-sort-change
    detail: '{ key: string | null, direction: "asc" | "desc" | null }'
    description: Fires when the user clicks a sortable header. Cycles asc → desc → unsorted.

slots: []

cssVars:
  - name: "--tc-table-surface"
    default: "var(--tc-color-surface, #ffffff)"
    description: Table background.
  - name: "--tc-table-ink"
    default: "var(--tc-color-ink, #14171f)"
    description: Cell text color.
  - name: "--tc-table-soft"
    default: "var(--tc-color-ink-soft, #5a6072)"
    description: Header + pager text color.
  - name: "--tc-table-rule"
    default: "var(--tc-color-rule, #ece5d3)"
    description: Border + row-divider color.
  - name: "--tc-table-head-bg"
    default: "var(--tc-color-surface-alt, #faf8f3)"
    description: Header row background.
  - name: "--tc-table-row-hover"
    default: "rgba(161, 105, 57, 0.05)"
    description: Row hover background.
  - name: "--tc-table-accent"
    default: "var(--tc-color-accent, #a16939)"
    description: Sortable hover + focus color.
  - name: "--tc-table-radius"
    default: "var(--tc-radius-lg, 10px)"
    description: Outer border-radius.
  - name: "--tc-table-font"
    default: "var(--tc-font-sans, …)"
    description: Font family.

related:
  - pagination
  - badge
  - card
---

### Basic usage

Pass `rows` and `columns` as JSON. Each column needs a `key` matching a row property, plus a human `label`.

<div class="stage col">
  <tc-table
    rows='[{"id":1,"name":"Carlos","role":"Engineer"},{"id":2,"name":"Naomi","role":"Designer"},{"id":3,"name":"Joseph","role":"PM"}]'
    columns='[{"key":"name","label":"Name"},{"key":"role","label":"Role"}]'
  ></tc-table>
</div>

```html
<tc-table
  rows='[
    {"id":1,"name":"Carlos","role":"Engineer"},
    {"id":2,"name":"Naomi","role":"Designer"}
  ]'
  columns='[
    {"key":"name","label":"Name"},
    {"key":"role","label":"Role"}
  ]'
></tc-table>
```

### Sorting

Click a column header to sort ascending, click again for descending, click a third time to clear. Disable per column with `sortable: false`.

```html
<tc-table
  rows='[…]'
  columns='[
    {"key":"name","label":"Name"},
    {"key":"updated","label":"Updated","sortable":false}
  ]'
></tc-table>
```

### Filtering + pagination

The search input is shown when `filterable` is true (the default). It matches against every column's stringified value. Use `pageSize` to set the page count.

```html
<tc-table page-size="25" rows='[…]' columns='[…]'></tc-table>
```

Hide the search input for small datasets:

```html
<tc-table filterable="false" rows='[…]' columns='[…]'></tc-table>
```

### Custom cell renderers

Set columns as a JS property to use the `render` function. It returns raw HTML — escape your own values.

```html
<tc-table id="orders"></tc-table>

<script type="module">
  const el = document.getElementById("orders");
  el.rows = await fetchOrders();
  el.columns = [
    { key: "id", label: "Order" },
    { key: "total", label: "Total", render: (r) => `$${r.total.toFixed(2)}` },
    {
      key: "status",
      label: "Status",
      render: (r) =>
        `<tc-badge variant="${r.status === "paid" ? "success" : "warning"}">${r.status}</tc-badge>`,
    },
  ];
</script>
```

### Listening for clicks

```html
<tc-table id="people"></tc-table>

<script type="module">
  const el = document.getElementById("people");
  el.addEventListener("tc-row-click", (e) => {
    console.log("opened", e.detail.row);
  });
</script>
```

### Theming

```html
<tc-table
  style="--tc-table-head-bg: #f0ead6; --tc-table-radius: 4px;"
  rows='[…]'
  columns='[…]'
></tc-table>
```

### Accessibility

- `aria-sort` on each sortable header announces the current state to screen readers.
- The search input has a `placeholder` but no visible label — consider wrapping in your own labelled region if you need stricter compliance.
- Row clicks emit `tc-row-click`; the row itself doesn't have a `role="button"`, so wire up your own keyboard handler if the row needs to be activatable from the keyboard.
- The pager buttons are real `<button>`s — Tab-reachable and Enter-activatable.
