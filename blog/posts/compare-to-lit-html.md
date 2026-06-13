---
title: tan-compose vs lit-html — what you trade away
slug: compare-to-lit-html
date: 2026-06-13
tag: internals · essay
version: v1.1.0
subtitle: Same platform, two very different templating bets.
description: An honest comparison of tan-compose and lit-html — the rendering models, what tan-compose gives up by templating with strings, and the features that could close the gap but aren't built yet.
excerpt: tan-compose and lit-html both build real web components with no framework runtime. But lit-html parses templates into surgical parts and escapes by construction; tan-compose returns a string and swaps innerHTML. Here's exactly what that trade costs — and what could be added to claw it back.
---

tan-compose and [lit-html](https://lit.dev/docs/libraries/standalone-templates/) are aiming at the same target: real custom elements, Shadow DOM, scoped styles, and no framework runtime sitting between your code and the platform. If you've used one, the other will feel familiar. But under the hood they make opposite bets about how a template becomes DOM — and that one decision ripples into performance, safety, and the whole feature surface. This post is the honest accounting: where lit-html is simply ahead, and which of those gaps are fixable in tan-compose versus baked into its design.

## The same starting point

It's worth being clear about how much the two share, because the differences are sharper against that background. Both:

- Render into **Shadow DOM** and scope CSS to the component.
- Use **adopted stylesheets** so a component's styles are parsed once and shared across every instance.
- Ship as **plain ES modules** with no compiler required and no global runtime — a `<script type="module">` is the entire setup.
- Lean on the platform for the hard parts: custom element lifecycle, form association, slots, the top layer for dialogs.

Neither ships a virtual DOM. Both are small. The disagreement is one level down.

## The core difference: parts versus a string

lit-html uses a **tagged template literal**. You write:

```ts
html`<p>Hello, ${name}</p>`
```

The first time that runs, lit-html parses the static HTML *once* into a `<template>`, walks it to find the dynamic holes (the `${...}` positions), and remembers each one as a "part" — a node part, an attribute part, a property part. On every later render with the same template, it skips parsing entirely and writes **only** the parts whose values changed. Update `name` and exactly one text node mutates. Nothing else in the document is touched.

tan-compose takes the other road. A template is a function that returns a **string**:

```ts
template: ({ props }) => `<p>Hello, ${esc(props.name)}</p>`
```

On render, that string is assigned straight to the shadow root's `innerHTML`. The browser's HTML parser runs, builds the subtree, and replaces what was there. There are no parts and no part-level updates — every render reparses and rebuilds the whole template. (Two escape hatches soften this, covered below: keyed `for` lists reuse row nodes, and focus is snapshotted and restored across the swap.)

That's the fork in the road. Everything that follows is a consequence of *parts versus a string*.

## What you're losing

### 1. Surgical updates — and a performance ceiling

lit-html's part model means an update is O(number of dynamic values), not O(size of the template). A 200-node component that changes one label rewrites one text node. tan-compose reparses all 200 nodes. For most UI this is invisible — reparsing a small template is microseconds. It starts to matter when a large template updates on every keystroke or animation frame.

tan-compose's answer is to push the expensive case — long lists — through [keyed reconciliation](./keyed-reconciliation-in-60-lines.html), where row nodes survive across renders by identity. That covers the datatable. It does **not** cover a single big template that updates constantly; there, lit-html's granular parts are simply the better tool.

### 2. Safety: escaping is on you

This is the difference that matters most and gets talked about least.

In lit-html, an interpolated value goes into a **node or attribute position that's already parsed**. A string with `<script>` in it lands as text content, not markup. You cannot inject HTML through a normal binding — safety is the default, and rendering raw markup requires the explicit, conspicuous `unsafeHTML()` directive.

tan-compose builds a string and hands it to `innerHTML`. The parser can't tell your static template apart from interpolated user data — it's all one string. So **every interpolation of untrusted data must be escaped by hand**:

```ts
// Safe:
`<div>${esc(comment.body)}</div>`
// An XSS hole:
`<div>${comment.body}</div>`
```

The kit threads an `esc()` helper through every component for exactly this reason. It works, but it's a manual contract, and a forgotten call is a vulnerability rather than a visual bug. lit-html makes the safe path the default path; tan-compose makes you choose it every time.

### 3. The directive ecosystem

lit-html ships a library of composable **directives** that slot into a binding: `repeat` and `map` for lists, `when` and `choose` for conditionals, `classMap` and `styleMap` for dynamic classes and styles, `ifDefined`, `live`, `ref`, `guard`, `cache`, and `keyed`. They compose, and you can write your own.

tan-compose has `for` (keyed lists) and a delegated `events` map, and that's the toolkit. Conditionals are ternaries in a template string; dynamic classes are string concatenation. It's all perfectly doable, but it's hand-rolled each time instead of reaching for a named, tested helper.

### 4. Async and streaming rendering

lit-html's `until`, `asyncReplace`, and `asyncAppend` let a binding accept a promise or async iterator and render placeholders, then results, then stream updates — a Suspense-shaped story with no framework. tan-compose has no async rendering primitive. You manage loading states yourself: set a `loading` flag, `setState`, re-render. Fine for a spinner; nowhere near `asyncReplace` over a stream.

### 5. Server rendering and hydration

Lit has a real SSR story — `@lit-labs/ssr` renders components to **Declarative Shadow DOM** on the server, and the client hydrates that markup in place. tan-compose is client-only. This very site is statically generated, but the components don't server-render; they boot and render on load. For docs that's fine, and the markup degrades gracefully (a `<details>` accordion is still a `<details>` before the script runs). For an app that needs first-paint content inside shadow roots or SEO of component-rendered text, the absence is real.

### 6. Typed properties and tooling

Lit's `@property`/`@state` decorators give you typed reactive fields with editor support, plus a mature tool belt: `lit-analyzer` for template type-checking, `@lit/context` for dependency injection, `@lit/task` for async state, `@lit/localize` for i18n. tan-compose props are declared in a `describe()` object and coerced from attributes (`string` / `boolean` / `number` / `json`); types are looser and there's no template type-checker watching your interpolations. The mental model is smaller; the safety net is too.

### 7. Maturity

Lit is years of production use, a large component ecosystem, and a team maintaining it. tan-compose is one small library plus a kit. For a lot of work the small surface is the point — but "battle-tested by thousands of teams" is not a box it can tick.

## What the trade buys you

To be fair to the bet: the string model isn't only a tax. A `describe()` component is a **plain data object** — props, state, template, events, lifecycle — not a class hierarchy with decorators and a reactive update queue. It's easy to read end to end, easy to generate, and there's no compile step in the toolchain at all. The whole library is small enough to read in an afternoon, which is why [the kit](../components.html) can be batteries-included without feeling like a black box. For components up to the size of a datatable, you rarely feel the ceiling.

## Things that could be added, but aren't yet

Not every gap above is structural. Some are just unbuilt. Roughly in order of how much they'd close the distance:

- **An auto-escaping `html` tag.** The single highest-leverage change. A tagged-template helper that escapes interpolations by default — with an explicit opt-out for trusted markup — would flip safety from manual to default without abandoning the string model. This is the lit-html lesson worth importing wholesale.
- **Granular updates.** A compile or parse step that identifies the dynamic holes once and patches only those on re-render — lit-html's parts, in miniature. The keyed-list cache already proves the project is willing to do this bookkeeping where it pays; generalizing it to attributes and text is the big-ticket item.
- **More composable helpers.** `when`, `map`, `classMap`, `styleMap` as small functions that return template fragments would cover the 80% of directives people actually reach for, without a full directive protocol.
- **SSR via Declarative Shadow DOM.** Render a component's shadow tree to a string on the server and hydrate it on the client. The static template model is actually well-suited to this — it's already producing strings.
- **Async rendering.** A primitive that takes a promise and renders placeholder → value, the `until` shape.
- **Reactive controllers / context.** A composition pattern for cross-cutting reactive logic (a shared store, a media-query subscription) and a context channel for passing data down without prop-drilling.
- **Typed props inference.** Better TypeScript so `props.count` is `number` without a cast, and a way to type-check interpolations.
- **A reorder signal.** Surfacing the browser's `connectedMoveCallback` so a keyed row can tell "I only moved" from "I re-rendered" — useful for FLIP animations.

None of those require throwing out the model. The auto-escaping tag and granular updates are the two that would change the calculus most; the rest are conveniences.

---

The honest summary: if you're shipping a large app where every byte of update performance, server rendering, and a type-checked template matter, lit-html (and Lit on top of it) is the more complete tool, and it isn't close. tan-compose is a different bet — that for the long tail of components that are *bigger than a styled button but smaller than Notion*, a string template you can read at a glance, with a keyed list cache for the one case that needs it, is a better trade than parts-and-directives. Knowing exactly what you're giving up is the point of picking deliberately.

See the [docs](../docs.html) for the full API, or the [keyed reconciliation walk-through](./keyed-reconciliation-in-60-lines.html) for how tan-compose claws back the one performance case it cares most about.
