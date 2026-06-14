---
title: v1.3 — a safer template, and a kit that stops re-parsing CSS
slug: v1-3-html-and-adopted-styles
date: 2026-06-14
tag: v1.3.0 · release
version: v1.3.0
subtitle: An auto-escaping html template, adopted stylesheets, and a behavior-preserving rewrite of all 38 kit components onto them.
description: tan-compose v1.3 adds an auto-escaping `html` tagged template and a `stylesheet` adopted-sheet field, then rewrites every kit component onto them — same pixels, less work per render.
excerpt: v1.3 of the core closes the two biggest gaps in the string-template model — manual escaping and per-render CSS reparsing — with an `html` tagged template and adopted stylesheets. Then the kit's 38 components were rewritten onto both, with byte-identical output.
---

A while back I wrote an [honest comparison of tan-compose and lit-html](./compare-to-lit-html.html) that ended with a list titled "things that could be added, but aren't yet." v1.3 builds the top of that list. The core gets an auto-escaping `html` template and real adopted stylesheets; then every component in the kit was rewritten onto them. Nothing you render changes — the wins are in safety and in how much work each render does.

## The two problems

The whole library rests on one decision: a template is a function that returns a **string**, and that string is assigned to the shadow root's `innerHTML`. It's a small, readable model. It also had two sharp edges.

**Escaping was manual.** Because the parser can't tell your static markup from interpolated data — it's all one string — every interpolation of untrusted data had to be escaped by hand:

```ts
// safe, but a forgotten esc() is a vulnerability, not a visual bug
template: ({ props }) => `<p>${esc(props.body)}</p>`;
```

**CSS was re-parsed on every render.** The only adopted-stylesheet path covered theme variables and a few container rules, so every component stuffed its real CSS into a `<style>` block inside the template string. That block was re-assigned to `innerHTML` — and re-parsed by the browser — on every single render.

## `html`: escaping by default

The new `html` tagged template escapes every interpolation and returns a `SafeHtml` value the renderer trusts verbatim. The unsafe path is gone from the common case:

```ts
import { html } from "@ra9/tan-compose";

// escaped automatically — `<script>` lands as text, not markup
template: ({ props }) => html`<p>${props.body}</p>`;
```

Nested `html` results pass through without being re-escaped, and `null` / `undefined` / `false` render nothing — so the `cond && html\`…\`` idiom works. When you genuinely have trusted markup (a pre-tokenized code block, an SVG you built), `unsafe()` is the explicit, conspicuous opt-out:

```ts
import { html, unsafe } from "@ra9/tan-compose";

template: ({ state }) => html`<div class="code">${unsafe(state.highlighted)}</div>`;
```

Four small helpers round it out — `when`, `map`, `classMap`, and `styleMap` — covering the conditionals and lists you reach for most:

```ts
import { html, map, when, classMap } from "@ra9/tan-compose";

template: ({ props }) => html`
  <ul class="${classMap({ list: true, empty: props.items.length === 0 })}">
    ${when(
  props.items.length === 0,
  () => html`<li class="muted">Nothing here yet.</li>`,
  () => map(props.items, (it) => html`<li>${it.label}</li>`),
)}
  </ul>
`;
```

## `stylesheet`: parsed once, shared across instances

The new `stylesheet` field takes a full CSS string (or several) and installs it as a **constructable adopted stylesheet** on the shadow root — parsed a single time and shared by every instance of the tag, instead of being re-parsed inside the template on each render. It falls back to a `<style>` element where constructable sheets aren't available.

```ts
import { build, describe, html } from "@ra9/tan-compose";

const STYLE = `
  :host { display: block; }
  .card { border: 1px solid var(--tc-card-rule, #ece5d3); border-radius: 12px; }
`;

build(
  "tc-card",
  describe({
    stylesheet: STYLE,
    template: ({ props }) => html`<div class="card">${props.title}</div>`,
  }),
);
```

The `STYLE` constant lives at module scope, above `build()`, so the CSS exists once per module — not once per render, and not once per instance.

## The quieter fixes

v1.3 also clears a handful of long-standing rough edges in the core:

- **camelCase props now react to their kebab-case attribute.** A prop like `pageSize` is reachable via `page-size` and re-renders on a dynamic `setAttribute`, not only on the first read.
- **Non-bubbling events can be delegated.** `focus`, `blur`, `mouseenter`, and friends are attached in the capture phase, so `events: { "blur .field": … }` actually fires.
- **A render-loop guard.** An `afterRender` that calls `setState` every render now aborts with a clear error instead of hanging the page.
- **Focus survives structural changes.** After a re-render, focus is restored by `id`, then `name`, then position — so a caret in a reactive input no longer jumps when the template's shape shifts.
- **Typed props and state.** `describe<MyProps, MyState>(…)` narrows `ctx.props` and `ctx.state`, with defaults that leave every existing untyped call working unchanged.

## The kit rewrite

With the new APIs in the core, the kit's 38 components were rewritten onto them. The rule for the rewrite was strict: **rendered output must be byte-identical.** This was a refactor, not a redesign.

- Every component now builds its template with `html`. Data interpolations dropped their hand-rolled `esc()` (the core's escaping covers the same characters), and the genuinely-raw markup — row builders, option lists, icon SVGs — is passed through with `unsafe()`.
- 32 components moved their static CSS into `stylesheet`, so it's parsed once instead of on every render. A few keep an inline `<style>` on purpose — `tc-modal`, `tc-progress`, `tc-rating`, and `tc-stepper` interpolate per-instance values (a width, a size, a cursor) that can't live in a shared static sheet.

Because "looks identical" is exactly the kind of claim that's easy to get wrong, the rewrite leaned hard on verification: the suite that asserts rendered DOM for the components (including the table's raw-HTML-vs-escaped-cell guard) stayed green at 98 passing tests, and every section of the components gallery was checked in a real browser for escaping leaks and console errors. None surfaced.

## Upgrading

For consumers, nothing breaks. The new `html` / `unsafe` / `stylesheet` / typed-generics APIs are all additive and opt-in; plain-string templates still work exactly as before (and are still un-sanitized — escape your own input, or adopt `html`). The kit now requires core `@ra9/tan-compose@^1.3.0` for the new primitives, and its bundle is unchanged in behavior.

---

The point of the [lit-html comparison](./compare-to-lit-html.html) was to be precise about what the string-template bet gives up. v1.3 takes back the two pieces that cost the most — safe-by-default escaping and parse-once CSS — without abandoning the model that makes a component readable in one sitting. See the [docs](../docs.html) for the new APIs, or the full [changelog](https://github.com/ra9/tan-compose/blob/main/CHANGELOG.md) for everything in the release.
