---
title: Keyed list reconciliation in ~60 lines
slug: keyed-reconciliation-in-60-lines
date: 2026-05-10
tag: internals
version: v1.1.0
description: How tan-compose's keyed list reconciliation works — annotated walkthrough of buildKeyedList in build.ts.
excerpt: "How for: { items, key, render } actually works. The cache, the identity check, what gets torn down, and why no virtual DOM is involved. Annotated walk-through of the implementation in build.ts."
---

The `for: { items, key, render }` field in v0.3 lets you render a list of N items and have the same DOM nodes survive across re-renders. This post walks through how it actually works — there's no virtual DOM, no diff library, just a `Map`, an identity check, and the live DOM.

## The problem

Imagine a datatable with 1,000 rows and a search box. Every keystroke filters `props.rows` down to the matching subset and re-renders. The simple implementation — tear down all row nodes, build new ones — works for ten rows. With a thousand, each keystroke costs a relayout of the table, every focused input loses focus, scroll position resets, and any per-row state (a half-typed inline edit, an open menu) is gone.

Frameworks solve this with virtual-DOM diffing. tan-compose doesn't ship a virtual DOM. It ships ~60 lines of careful bookkeeping instead.

## The shape of the cache

Every `for` block on a host element gets its own slot. The slot is a `Map<key, KeyedItem>`:

```ts
type KeyedItem = {
  element: HTMLElement;
  lastItem: unknown;
  cleanups: Array<() => void>;
};

type ListSlot = {
  cache: Map<string | number, KeyedItem>;
};
```

`element` is the live DOM node for that key. `lastItem` is the data object we rendered with — used for the identity check below. `cleanups` holds any teardown functions we registered while rendering this row, so we can undo them cleanly when the row goes away.

The host stores all its slots in a `WeakMap` keyed by the `DescribeOptions` object that defined the for block. Because `describe()` objects are stable across renders (you build them once, the renderer reuses them), two renders of the same component find the same slot.

## The reconciliation pass

On every parent re-render, the for block runs this loop:

```ts
function buildKeyedList(description, scope, getSlot) {
  const list = description.for;
  const slot = getSlot(description);
  const items = list.items(scope.ctx);
  const newCache = new Map();
  const frag = document.createDocumentFragment();

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const key = list.key(item, i);
    const cached = slot.cache.get(key);

    let entry;
    if (cached && Object.is(cached.lastItem, item)) {
      entry = cached;                     // reuse verbatim
    } else {
      const itemCleanups = [];
      const childDesc = list.render(item, i, scope.ctx);
      const element = buildElement(childDesc, { ...scope, cleanups: itemCleanups }, getSlot);
      if (cached) runCleanups(cached.cleanups);  // item changed → tear down old
      entry = { element, lastItem: item, cleanups: itemCleanups };
    }

    newCache.set(key, entry);
    frag.appendChild(entry.element);      // re-appending moves, doesn't clone
  }

  for (const [key, entry] of slot.cache) {
    if (!newCache.has(key)) runCleanups(entry.cleanups);  // removed
  }

  slot.cache = newCache;
  return frag;
}
```

That's the whole thing. Three observations.

### 1. Re-appending an existing node moves it

When we call `frag.appendChild(entry.element)` on a node that's currently attached to the document tree, the DOM doesn't clone it — it removes it from its old parent and inserts it at the new position. Reordering is implicit. We don't have to compute a longest-common-subsequence diff or track move operations. The DOM does it for us, in order.

### 2. The identity check is `Object.is`

`cached.lastItem === item` via `Object.is` decides whether to reuse the row's DOM verbatim or re-render it. This is a deliberate contract with the user: if you mutate an array entry in place, the renderer can't tell anything changed and your row will look stale. Always replace the object reference when its contents change.

This is the same contract React, Solid, and most modern frameworks make. The cost of supporting deep equality would be walking every property of every row on every render — unacceptable for a table that exists specifically because deep equality is expensive.

### 3. Cleanups are per-row

When `list.render()` produces a row that registers event listeners (a `delete` button, a hover handler), those cleanup functions get pushed into the row's own `cleanups` array — not the parent's. When the row gets removed from the list, we run just that row's cleanups. When the host disconnects, we walk every slot and flush them all.

## What we deliberately don't do

- **No virtual DOM.** The cache holds real `HTMLElement` references. There's no shadow tree, no fiber, no patch list. Just the document and a `Map`.
- **No partial row updates.** When a row's data changes (its identity flips) we re-render the whole row. For the simple shape `render: (row) => describe(...)` that means rebuilding a few elements, not the whole list. Granular text-node updates would require parsing the template — a much larger project.
- **No move-cost optimization.** If your list reverses, every node moves. The DOM handles this cheaply enough at typical list sizes. If you're rendering 100k rows, you want windowing, not better diffing.
- **No reorder-only signal.** We don't tell renderers "this row only moved." If you need that, listen for the row's `connectedMoveCallback` in a future browser version, or attach an `IntersectionObserver` in `afterMount`.

## The complexity budget

The whole feature is two types, one map per slot, and one ~30-line function. It runs once per render of the parent. Memory is O(N) in the row count. Time is O(N) in the new array plus O(M) in the old cache for the removal pass — so O(N+M).

That's enough to make a 1,000-row datatable feel instant on a keystroke filter. It's not enough to build Notion. But Notion wasn't the goal.

---

See [docs.html#for](../docs.html#for) for the API reference, or open [build.ts on GitHub](https://github.com/ra9/tan-compose/blob/main/build.ts) for the actual implementation.
