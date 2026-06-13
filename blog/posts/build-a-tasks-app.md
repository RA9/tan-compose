---
title: Build a tasks app in ~80 lines
slug: build-a-tasks-app
date: 2026-05-10
tag: tutorial · kit
version: v1.1.0
description: "A tutorial: build a small CRUD app — list, add, edit, delete tasks — using @ra9/tan-compose-kit and ~80 lines of glue."
excerpt: A small CRUD app — list, add, mark done, delete, with live stats and toasts — wired entirely from @ra9/tan-compose-kit. No framework, no build step. The whole thing is one HTML file and about eighty lines of JavaScript.
---

A small CRUD app — list, add, edit, delete tasks, with stats at the top — built end-to-end with `@ra9/tan-compose-kit`. No framework, no build step, no JSX. The whole thing fits in one HTML file plus about eighty lines of JavaScript.

## What we're building

A page that shows a list of tasks. At the top: four stat cards (Total, Done, Open, Overdue). Below that: a form to add a task. Below that: a sortable, filterable, paginated table. Clicking a task opens a modal where you can mark it done or delete it. Deletes prompt for confirmation. Every mutation flashes a toast.

That's a real internal tool. Most teams reach for React, install Tailwind, set up a build step, and write a hundred files for it. We're going to do it with eight HTML elements and a script tag.

## Try it

Here's the finished app, running on this page. Add a task with the form, click any row to open its modal, then mark it done or delete it — every change updates the stats and flashes a toast. The rest of this post walks through the exact code wiring it.

<div class="stage col" style="gap: 0; align-items: stretch;">
  <section style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 12px; margin-bottom: 18px;">
    <tc-stat id="ta-total" label="Total" value="0"></tc-stat>
    <tc-stat id="ta-done" label="Done" value="0"></tc-stat>
    <tc-stat id="ta-open" label="Open" value="0"></tc-stat>
    <tc-stat id="ta-overdue" label="Overdue" value="0"></tc-stat>
  </section>
  <form id="ta-form" style="display: flex; gap: 8px; align-items: end; margin-bottom: 18px; flex-wrap: wrap;">
    <tc-input id="ta-title" name="title" label="New task" required style="flex: 2 1 180px;"></tc-input>
    <tc-select id="ta-priority" name="priority" label="Priority" style="flex: 1 1 120px;"></tc-select>
    <tc-input id="ta-due" name="due" type="date" label="Due" style="flex: 1 1 120px;"></tc-input>
    <tc-button variant="primary">Add</tc-button>
  </form>
  <tc-table id="ta-tbl" page-size="5"></tc-table>
  <tc-modal id="ta-modal"></tc-modal>
  <div id="ta-toasts" style="position: fixed; bottom: 20px; right: 20px; display: flex; flex-direction: column; gap: 8px; z-index: 1000;"></div>
</div>

<script>
(function () {
  var NEED = ["tc-stat", "tc-input", "tc-select", "tc-button", "tc-table", "tc-modal", "tc-toast", "tc-badge"];
  Promise.all(NEED.map(function (t) { return customElements.whenDefined(t); })).then(init);
  function init() {
    var $ = function (id) { return document.getElementById(id); };
    var today = new Date();
    var iso = function (offset) { return new Date(today.getTime() + offset * 86400000).toISOString().slice(0, 10); };
    var tasks = [
      { id: 1, title: "Audit auth flow", priority: "high", due: iso(-2), done: false },
      { id: 2, title: "Update onboarding copy", priority: "medium", due: iso(5), done: false },
      { id: 3, title: "Renew TLS certs", priority: "low", due: iso(-6), done: true },
      { id: 4, title: "Ship the tasks tutorial", priority: "high", due: iso(3), done: false }
    ];
    var nextId = 5;
    var selected = null;
    var tbl = $("ta-tbl"), modal = $("ta-modal"), toastsHost = $("ta-toasts"), sel = $("ta-priority");
    tbl.columns = [
      { key: "title", label: "Title", sortable: true },
      { key: "priority", label: "Priority", sortable: true },
      { key: "due", label: "Due", sortable: true },
      { key: "status", label: "Status" }
    ];
    sel.options = [
      { value: "low", label: "Low" },
      { value: "medium", label: "Medium" },
      { value: "high", label: "High" }
    ];
    sel.value = "medium";
    var isOverdue = function (t) { return t.due && new Date(t.due) < new Date(); };
    var variantFor = function (p) { return p === "high" ? "danger" : p === "medium" ? "warning" : "info"; };
    function render() {
      tbl.rows = tasks.map(function (t) {
        return Object.assign({}, t, { status: t.done ? "✓ done" : isOverdue(t) ? "⚠ overdue" : "open" });
      });
      var total = tasks.length;
      var done = tasks.filter(function (t) { return t.done; }).length;
      var overdue = tasks.filter(function (t) { return !t.done && isOverdue(t); }).length;
      $("ta-total").value = String(total);
      $("ta-done").value = String(done);
      $("ta-open").value = String(total - done);
      var o = $("ta-overdue");
      o.value = String(overdue);
      o.trend = overdue > 0 ? "down" : "neutral";
      o.delta = overdue > 0 ? "needs attention" : "";
    }
    function toast(variant, message) {
      var t = document.createElement("tc-toast");
      t.variant = variant;
      t.message = message;
      t.duration = 3000;
      toastsHost.appendChild(t);
      requestAnimationFrame(function () { t.open = true; });
      t.addEventListener("tc-toast-close", function () { setTimeout(function () { t.remove(); }, 200); });
    }
    $("ta-form").addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(e.target);
      var title = data.get("title");
      if (!title) return;
      tasks = tasks.concat([{ id: nextId++, title: title, priority: data.get("priority") || "medium", due: data.get("due") || "", done: false }]);
      e.target.reset();
      sel.value = "medium";
      render();
      toast("success", "Task added");
    });
    tbl.addEventListener("tc-row-click", function (e) {
      selected = e.detail.row;
      modal.title = selected.title;
      modal.innerHTML =
        '<p>Priority: <tc-badge variant="' + variantFor(selected.priority) + '">' + selected.priority + "</tc-badge></p>" +
        "<p>Due: " + (selected.due || "—") + "</p>" +
        "<p>Status: " + (selected.done ? "Done" : "Open") + "</p>" +
        '<div slot="footer">' +
        '<tc-button variant="ghost" id="ta-m-close">Close</tc-button>' +
        '<tc-button variant="primary" id="ta-m-toggle">' + (selected.done ? "Mark as open" : "Mark as done") + "</tc-button>" +
        '<tc-button variant="danger" id="ta-m-delete">Delete</tc-button>' +
        "</div>";
      modal.open = true;
    });
    modal.addEventListener("click", function (e) {
      var id = e.target.id;
      if (!id || !selected) return;
      if (id === "ta-m-close") {
        modal.open = false;
      } else if (id === "ta-m-toggle") {
        var wasDone = selected.done;
        tasks = tasks.map(function (t) { return t.id === selected.id ? Object.assign({}, t, { done: !t.done }) : t; });
        modal.open = false;
        render();
        toast("info", wasDone ? "Re-opened." : "Marked done.");
      } else if (id === "ta-m-delete") {
        if (!confirm('Delete "' + selected.title + '"?')) return;
        tasks = tasks.filter(function (t) { return t.id !== selected.id; });
        modal.open = false;
        render();
        toast("warning", "Task deleted");
      }
    });
    render();
  }
})();
</script>

## Step 0: the page shell

Start with one HTML file. Pull in the kit bundle and lay out the chrome:

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Tasks</title>
  <script type="module" src="https://esm.sh/jsr/@ra9/tan-compose-kit@0.3"></script>
</head>
<body style="font-family: system-ui; padding: 32px; max-width: 960px; margin: auto;">
  <h1>Tasks</h1>

  <section id="stats" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 16px 0 24px;">
    <tc-stat id="s-total"   label="Total"   value="0"></tc-stat>
    <tc-stat id="s-done"    label="Done"    value="0"></tc-stat>
    <tc-stat id="s-open"    label="Open"    value="0"></tc-stat>
    <tc-stat id="s-overdue" label="Overdue" value="0"></tc-stat>
  </section>

  <form id="new-task" style="display: flex; gap: 8px; align-items: end; margin-bottom: 24px;">
    <tc-input  id="f-title"    name="title"    label="New task"   required style="flex: 2"></tc-input>
    <tc-select id="f-priority" name="priority" label="Priority"          style="flex: 1"></tc-select>
    <tc-input  id="f-due"      name="due"      type="date" label="Due"   style="flex: 1"></tc-input>
    <tc-button variant="primary">Add</tc-button>
  </form>

  <tc-table id="tbl" page-size="8"></tc-table>

  <tc-modal id="m"></tc-modal>
  <div id="toasts" style="position: fixed; bottom: 20px; right: 20px; display: flex; flex-direction: column; gap: 8px;"></div>
</body>
</html>
```

That's the entire visible structure. Stats grid, form, table, modal, toast host. Every `tc-*` element is a real custom element registered the moment the script loads.

## Step 1: the data

Keep it simple — an array of objects. In a real app you'd replace this with a fetch. The shape:

```ts
let tasks = [
  { id: 1, title: "Audit auth flow",        priority: "high",   due: "2026-05-12", done: false },
  { id: 2, title: "Update onboarding copy", priority: "medium", due: "2026-05-15", done: false },
  { id: 3, title: "Renew certs",            priority: "low",    due: "2026-05-08", done: true  },
];
let nextId = 4;
```

One `tasks` array. One `nextId` counter. That's the whole "store."

## Step 2: rendering — one function

The rule: every mutation runs through one `render()` function that pushes the latest data into the components. Components handle their own re-renders internally; we just update their props.

```ts
const tbl = document.getElementById("tbl");
tbl.columns = [
  { key: "title",    label: "Title",    sortable: true },
  { key: "priority", label: "Priority", sortable: true },
  { key: "due",      label: "Due",      sortable: true },
  { key: "status",   label: "Status" },
];

const sel = document.getElementById("f-priority");
sel.options = [
  { value: "low",    label: "Low"    },
  { value: "medium", label: "Medium" },
  { value: "high",   label: "High"   },
];
sel.value = "medium";

function render() {
  // table rows = derived view of tasks
  tbl.rows = tasks.map(t => ({
    ...t,
    status: t.done ? "✓ done" : isOverdue(t) ? "⚠ overdue" : "open",
  }));

  // stats
  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;
  const open = total - done;
  const overdue = tasks.filter(t => !t.done && isOverdue(t)).length;

  document.getElementById("s-total").value   = String(total);
  document.getElementById("s-done").value    = String(done);
  document.getElementById("s-open").value    = String(open);
  const overdueEl = document.getElementById("s-overdue");
  overdueEl.value = String(overdue);
  overdueEl.trend = overdue > 0 ? "down" : "neutral";
  overdueEl.delta = overdue > 0 ? "needs attention" : "";
}

function isOverdue(t) {
  return t.due && new Date(t.due) < new Date();
}

render();
```

Notice what we're *not* doing: there's no `tableRoot.replaceChild`, no `tableInstance.update()`, no diff library. We assign `tbl.rows = [...]`. The component sees the prop change, re-renders its template, and reuses the rows that haven't changed. Same for `sel.options` and the stat cards' values.

## Step 3: adding a task

Listen for the form's submit, push to the array, re-render, toast.

```ts
document.getElementById("new-task").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const title = data.get("title");
  if (!title) return;
  tasks = [
    ...tasks,
    {
      id: nextId++,
      title,
      priority: data.get("priority") || "medium",
      due: data.get("due") || "",
      done: false,
    },
  ];
  e.target.reset();
  render();
  toast("success", "Task added");
});
```

`FormData` works because every form field — `<tc-input>`, `<tc-select>` — is form-associated. The form gets `title`, `priority`, and `due` for free. Reset works the same way: `e.target.reset()` walks every form-associated child and calls its `formResetCallback`.

> **Why this works:** in v0.4 of `@ra9/tan-compose`, declaring `formAssociated: true` wires `internals.setFormValue` automatically when a `value` prop changes. The kit's input/select/checkbox/switch all opt in. They behave exactly like native form controls.

## Step 4: clicking a row → modal

`<tc-table>` emits `tc-row-click` with the row in `event.detail`. We use that to open the modal:

```ts
const modal = document.getElementById("m");
let selected = null;

tbl.addEventListener("tc-row-click", (e) => {
  selected = e.detail.row;
  modal.title = selected.title;
  modal.innerHTML = `
    <p>Priority: <tc-badge variant="${variantFor(selected.priority)}">${selected.priority}</tc-badge></p>
    <p>Due: ${selected.due || "—"}</p>
    <p>Status: ${selected.done ? "Done" : "Open"}</p>
    <div slot="footer">
      <tc-button variant="ghost"   id="m-close">Close</tc-button>
      <tc-button variant="primary" id="m-toggle">${selected.done ? "Mark as open" : "Mark as done"}</tc-button>
      <tc-button variant="danger"  id="m-delete">Delete</tc-button>
    </div>
  `;
  modal.open = true;
});

function variantFor(p) {
  return p === "high" ? "danger" : p === "medium" ? "warning" : "info";
}
```

We rebuild the modal's inner HTML each time so the buttons reflect the current task's state. Then we listen at the modal level and route by id — one listener handles all three buttons:

```ts
modal.addEventListener("click", (e) => {
  const id = e.target.id;
  if (!id || !selected) return;
  if (id === "m-close") {
    modal.open = false;
  } else if (id === "m-toggle") {
    tasks = tasks.map(t => t.id === selected.id ? { ...t, done: !t.done } : t);
    modal.open = false;
    render();
    toast("info", selected.done ? "Re-opened." : "Marked done.");
  } else if (id === "m-delete") {
    if (!confirm(`Delete "${selected.title}"?`)) return;
    tasks = tasks.filter(t => t.id !== selected.id);
    modal.open = false;
    render();
    toast("warning", "Task deleted");
  }
});
```

Setting `modal.open = false` closes the dialog. Pressing Escape would do the same — it's the native `<dialog>` behavior surfaced as a `tc-close` event we could also listen for.

## Step 5: toasts

One helper that creates a toast, opens it, and removes it on close.

```ts
const toastsHost = document.getElementById("toasts");

function toast(variant, message) {
  const t = document.createElement("tc-toast");
  t.variant = variant;
  t.message = message;
  t.duration = 3000;
  toastsHost.appendChild(t);
  requestAnimationFrame(() => { t.open = true; });
  t.addEventListener("tc-toast-close", () => {
    // let the slide-out animation finish before removing the node
    setTimeout(() => t.remove(), 200);
  });
}
```

That's the whole feature. Auto-dismiss is built in via the `duration` prop. The slide animation is handled by the component's own CSS.

## What we didn't write

For a comparable React app, we'd have written:

- A build configuration (Vite, esbuild, Next).
- Component files for the table, the input, the select, the modal, the toast — easily 800+ lines of TSX before any business logic.
- A state library (or a custom `useReducer`) and 5–10 effects to keep stats in sync with tasks.
- An accessibility pass, because the default React modal isn't focus-trapped, the table doesn't roving-focus, and the toast doesn't have `role="status"`.

Total runtime cost: probably 150 KB of framework-and-deps before the app's own code. The kit's bundle is about 53 KB minified and includes everything we used here.

## The complete script

All the JS for the app — wired into the page above — comes out to roughly 80 lines including the rendering function and the helpers. No imports beyond the single CDN tag.

## Where it goes from here

This is the "hello world" size of an internal tool, but the same shape scales. Backend integration: swap the in-memory `tasks` for fetch calls, debounce saves, drop a `<tc-skeleton>` while loading. Per-row actions: replace the modal with a `<tc-tabs>` showing details / activity / history. Filtering: there's already a search box on the table for free.

None of that requires more JavaScript than you'd write anyway. The kit is the chrome; you write the logic.

---

See the [Components](../components.html) gallery for live demos of every primitive used here, or open the [Playground](../playground.html) to try the snippets.
