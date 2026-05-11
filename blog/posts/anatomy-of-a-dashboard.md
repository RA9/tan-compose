---
title: Anatomy of an admin dashboard
slug: anatomy-of-a-dashboard
date: 2026-05-10
tag: kit · case study
version: v1.1.0
description: A walk-through of the admin dashboard demo — how an in-memory store, a filter bar, two modals, and a theme switcher compose into a real internal tool with @ra9/tan-compose-kit.
excerpt: How the /demo/admin/ page composes — an in-memory store, a filter bar reading from three controls, a keyed datatable that embeds badges in cells, two modals with different state owners, a theme switcher in three constants, and the production gaps that would slot into the same shape.
---

The [admin dashboard demo](../demo/admin/) is a real internal-tool shape — stat cards, a filter bar, a paginated customer table, click-to-detail and invite modals, toasts on every mutation, a theme switcher in the top bar — built end-to-end with `@ra9/tan-compose-kit`. One HTML file, no framework, no bundler. This post walks through how it's composed and what each pattern is doing.

## The architecture in one breath

One file. One in-memory array of customers. One `refresh()` function that recomputes the visible slice and hands it to `<tc-table>`. Every mutation goes through the same path:

```ts
// ── data ───────────────────────────────────────────
let customers = RAW_CUSTOMERS.map((r, i) => ({ ...r, id: i }));
let q = "";          // search query
let plan = "";       // plan filter
let onlyActive = false;

// ── derived view ───────────────────────────────────
function refresh() {
  const filtered = customers.filter(matchesFilters);
  table.rows = filtered.map(renderRow);
  resultCount.textContent = `${filtered.length} matching of ${customers.length}`;
}
```

That's the whole "store." When the user types into the search box, `q` updates and `refresh()` fires. When they pick a plan from the filter dropdown, `plan` updates and `refresh()` fires. When they delete a customer, `customers` mutates and `refresh()` fires. The kit components handle the actual DOM work.

For a 30-row table this is overkill. For a 30,000-row table it's still fine because `<tc-table>` uses keyed reconciliation under the hood — only the rows that actually changed get rebuilt.

## The filter bar reads from three controls

Three form-associated kit components sit above the table — a `<tc-input>` for free-text search, a `<tc-select>` for plan tier, and a `<tc-switch>` for "active only." Each one is its own little state cell:

```ts
search.addEventListener("input", (e) => {
  q = (e.target.value || "").trim();
  refresh();
});

planFilter.addEventListener("tc-change", (e) => {
  plan = e.detail.value || "";
  refresh();
});

activeOnly.addEventListener("tc-change", (e) => {
  onlyActive = e.detail.checked;
  refresh();
});
```

Note the two event names. Plain `input` events fire on the underlying native input inside `<tc-input>`, but kit components also dispatch their own semantic events (`tc-change`, `tc-input`) so you can listen to whatever shape fits. Pick one and stay consistent — I went with the kit's events for the select and switch because they carry typed `detail`, but used the native `input` event for the text field because the native shape is already what I want.

## Embedding kit components inside table cells

`<tc-table>` escapes raw cell values by default — an XSS guard that's especially important when cells display user-controlled strings like emails or names. To embed kit components, use a column-level `render` callback that returns raw HTML. The caller takes responsibility for escaping anything untrusted.

```ts
function planVariant(p) {
  return p === "Team" ? "info" : p === "Pro" ? "success" : "neutral";
}

table.columns = [
  { key: "name",   label: "Name",  sortable: true },
  { key: "email",  label: "Email" },
  {
    key: "plan", label: "Plan",
    render: (row) =>
      `<tc-badge variant="${planVariant(row.plan)}">${row.plan}</tc-badge>`,
  },
  {
    key: "mrr", label: "MRR", sortable: true,
    render: (row) => fmtMRR(row.mrr),
  },
  {
    key: "status", label: "Status",
    render: (row) =>
      `<tc-badge variant="${statusVariant(row.status)}" pill>${row.status}</tc-badge>`,
  },
  { key: "joined", label: "Joined", sortable: true },
];
```

The original row fields stay untouched — that's important for sorting, where `{ key: "mrr" }` still sees the underlying number even though the cell renders `fmtMRR`'s display string. The `render` callback only affects what shows in the cell.

> **Why this works:** custom elements parse and register the moment HTML containing them is added to the DOM, regardless of *how* it got there — innerHTML assignment is fine. There's no "must be in JSX" or "must be in a template" constraint. If the tag is registered, the browser upgrades it.

`render` is a function reference, so it only works when you set columns via the JS property (`table.columns = […]`) — not via a JSON attribute. For the dashboard case this is the natural path; for HTML-only setups, fall back to pre-computing display fields and accept that they'll render as text.

## Two modals, two state owners

The dashboard has an Invite modal and a Detail modal. Both are `<tc-modal>` instances, but they own their state differently because they do different things.

### Invite — the modal owns the form

The Invite modal contains a form. The form has its own state (the email being typed, the plan being selected, the optional personal message). That state lives entirely inside the modal until the user clicks "Send invite," at which point we read it via `FormData`, push a new customer onto the array, close the modal, and toast.

```ts
const inviteForm = document.getElementById("invite-form");

inviteSubmit.addEventListener("click", () => {
  const data = Object.fromEntries(new FormData(inviteForm));
  customers = [
    { id: nextId++, name: data.email.split("@")[0], email: data.email,
      plan: data.plan || "Free", mrr: 0, status: "trial",
      joined: today() },
    ...customers,
  ];
  inviteModal.open = false;
  inviteForm.reset();
  refresh();
  toast("success", `Invite sent to ${data.email}`);
});
```

`FormData` works because every kit form field is form-associated. `form.reset()` works for the same reason — the kit's reset callbacks blank each field's value. There's nothing custom here; it's just HTML forms.

### Detail — the modal reads from a captured row

The Detail modal opens when a table row is clicked. It reads the customer record once, populates its fields, and shows itself. While it's open, the modal's "state" is just `activeCustomer` — the captured row.

```ts
let activeCustomer = null;

table.addEventListener("tc-row-click", (e) => {
  const row = e.detail.row;
  activeCustomer = customers.find((c) => c.id === row.id);
  detailName.textContent = activeCustomer.name;
  detailEmail.textContent = activeCustomer.email;
  // … fill the rest …
  detailModal.open = true;
});

cancelSub.addEventListener("click", () => {
  if (!activeCustomer) return;
  activeCustomer.status = "cancelled";
  activeCustomer.mrr = 0;
  detailModal.open = false;
  refresh();
  toast("warning", `${activeCustomer.name}'s subscription cancelled`);
});
```

Splitting the modals this way is deliberate. Invite owns its data because it's a self-contained creation flow. Detail just looks at and mutates an existing record, so the modal is a window onto the store, not its own state cell.

## The theme switcher is three constants and a style tag

One of the things that surprised me building this is how cheap a working theme switcher is. The kit's tokens live on `:root` and cascade through Shadow DOM, so to re-skin the entire UI you just rewrite a few CSS variables. The switcher is a `<tc-select>` with four options and ~30 lines of glue:

```ts
function applyTheme(name) {
  document.querySelectorAll("style[data-tc-theme]").forEach((s) => s.remove());
  if (name === "dark") inject("dark", DARK_CSS);
  else if (name === "bootstrap") inject("bootstrap", BOOTSTRAP_CSS);
  else if (name === "tailwind") inject("tailwind", TAILWIND_CSS);
  // "light" leaves the base tokens.css in place; nothing to do.
}

themeSelect.addEventListener("tc-change", (e) => {
  applyTheme(e.detail.value || "light");
});
```

`DARK_CSS`, `BOOTSTRAP_CSS`, and `TAILWIND_CSS` are string constants — the same CSS the bundled theme presets ship as ES modules. The demo inlines them so it doesn't have to fetch anything at switch-time. Production code would just `import "@ra9/tan-compose-kit/themes/dark"` and be done.

The switcher also re-skins the page chrome (not just kit components) by setting matching `--bg` / `--surface` values on `:root`. Without that, the kit goes dark but the page stays cream — visually jarring.

## What this dashboard *doesn't* do

For honesty's sake, the demo skips a few things any real internal tool would need. Each one has a natural shape in the kit:

- **Auth.** No login. A real app would gate the dashboard behind a session check. The kit doesn't opine here — wire whatever auth you'd use anyway and redirect on 401.
- **Real persistence.** Customers live in a JS array. Replace `customers = customers.filter(...)` with a `fetch("/api/customers/123", { method: "DELETE" })` and call `refresh()` in the success callback. Drop in a `<tc-skeleton>` while loading.
- **Optimistic updates.** The cancel-sub flow mutates locally, then fires a toast. A real app would optimistically update, kick off the request, and roll back on failure (with an error toast). Same shape, two extra branches.
- **Server-side pagination.** `<tc-table>` paginates client-side. For 30k+ rows you'd hand it just the current page and total count, then listen for `tc-page-change` (which I should probably add) to re-fetch.
- **Bulk actions.** Multi-select would mean adding a checkbox column and tracking selected IDs. The kit's `<tc-checkbox>` handles the input; the rest is application logic.

None of these change the architecture. They slot into the same `refresh()` path the demo already has.

## The point

The demo is 1004 lines, of which maybe 500 are JavaScript and the rest is the dashboard markup, sample data, and the inline theme CSS. There is no build step. There is no framework runtime. Reading the source top to bottom takes ten minutes — every behavior is in plain sight, in the order it executes.

That's the bet of this whole project: the platform plus a small, predictable component layer is enough for the kind of UI most teams actually ship. Not every component needs a framework. Some of them just need `customElements.define` and a few hundred lines of glue.

---

Run the demo at [/demo/admin/](../demo/admin/). Read the source at [demo/admin/index.html on GitHub](https://github.com/ra9/tan-compose/blob/main/demo/admin/index.html). Or browse the [Components](../components.html) gallery to see each piece in isolation.
