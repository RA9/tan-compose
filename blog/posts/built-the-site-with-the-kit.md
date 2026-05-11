---
title: I rebuilt the docs site with the library it documents.
slug: built-the-site-with-the-kit
date: 2026-05-10
tag: meta · rewrite
version: v1.1.0
description: The tan-compose docs site is now built with @ra9/tan-compose-kit — 2,470 fewer lines of HTML and CSS, three new shared primitives, and five small papercuts found by dogfooding the library.
excerpt: Twelve pages, 2,470 fewer lines of HTML, three new shared primitives, and five small papercuts that I'd never have noticed without trying to live inside the library. The wins, the cost, the things I'd change next.
---

`@ra9/tan-compose-kit` was supposed to make production UI fast. The docs site that demos it had been hand-rolled HTML and CSS for nine months. So last week I tore most of it down and rebuilt it with itself. The result: **2,470 fewer lines of HTML**, three new shared primitives, and five small papercuts that I'd never have noticed without trying to live inside the library.

## The numbers

Twelve user-facing pages were rewritten across two sprints — the landing page, the docs page, the themes / components / examples / playground pages, the blog index, and the five blog posts. Each one shed its hand-rolled topbar, footer, root-token block, and code-block styling. The chrome lives in `<site-nav>` and `<site-footer>` now. Every code block goes through `<tc-code>`.

<table class="compact">
  <thead>
    <tr>
      <th>page</th>
      <th class="num">before</th>
      <th class="num">after</th>
      <th class="delta">delta</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>index.html</td><td class="num">838</td><td class="num">553</td><td class="delta">−285</td></tr>
    <tr><td>docs.html</td><td class="num">1,199</td><td class="num">639</td><td class="delta">−560</td></tr>
    <tr><td>themes.html</td><td class="num">496</td><td class="num">402</td><td class="delta">−94</td></tr>
    <tr><td>components.html</td><td class="num">1,143</td><td class="num">930</td><td class="delta">−213</td></tr>
    <tr><td>examples.html</td><td class="num">822</td><td class="num">576</td><td class="delta">−246</td></tr>
    <tr><td>playground.html</td><td class="num">879</td><td class="num">772</td><td class="delta">−107</td></tr>
    <tr><td>blog/index.html</td><td class="num">415</td><td class="num">389</td><td class="delta">−26</td></tr>
    <tr><td>blog/anatomy-of-a-dashboard.html</td><td class="num">679</td><td class="num">506</td><td class="delta">−173</td></tr>
    <tr><td>blog/build-a-tasks-app.html</td><td class="num">684</td><td class="num">509</td><td class="delta">−175</td></tr>
    <tr><td>blog/feels-native.html</td><td class="num">535</td><td class="num">345</td><td class="delta">−190</td></tr>
    <tr><td>blog/keyed-reconciliation…</td><td class="num">567</td><td class="num">381</td><td class="delta">−186</td></tr>
    <tr><td>blog/why-i-built-tan-compose.html</td><td class="num">781</td><td class="num">566</td><td class="delta">−215</td></tr>
  </tbody>
  <tfoot>
    <tr><td>total</td><td class="num">9,038</td><td class="num">6,568</td><td class="delta">−2,470</td></tr>
  </tfoot>
</table>

The biggest individual win was `docs.html` at −560 lines, mostly because docs.html was the page with the most duplicated chrome — three columns of layout CSS, a sticky table of contents, prose styles, and a code-block surface that existed in every other page too. All of that is now centralised.

## What the kit ate

Two of the new components are site-specific and don't ship to JSR — they live next to the site source in `site/components/`:

- `<site-nav active="blog" version="v1.1.0" base="../">` — the brand mark, version pill, and primary nav. Highlights the current page via `active`; takes a `base` so the blog posts (which sit one directory deep) get the right hrefs.
- `<site-footer base="../">` — the row of links and the copyright line. Same `base` trick.

Three of the new components *do* ship — they went out in `@ra9/tan-compose-kit` v1.3 specifically to support this rewrite, but they're general enough that any docs site can use them:

- `<tc-code language="ts" filename="…" copy>` — dark code surface with an optional copy button and a language / filename label. There are **80 instances** of it across the site now.
- `<tc-callout variant="warning" title="…">` — the admonition box. Five variants (note, info, success, warning, danger) and `danger` sets `role="alert"`.
- `<tc-toc target="#content" levels="h2,h3">` — auto-builds a sticky table of contents by scanning headings and tracks the active one with `IntersectionObserver`.

## Bundle cost

The numbers I cared about:

- `dist/mod.js` (the core library only) — **11.5 KB** raw, **3.7 KB gzipped**.
- `dist/mod.kit.js` (kit + all components, no theme, no site shell) — **85.4 KB** raw, **18.0 KB gzipped**.
- `dist/site.js` (kit + base theme tokens + `site-nav` + `site-footer`) — **93.3 KB** raw, **19.6 KB gzipped**.

So the entire shared chrome layer — the brand, the nav, the footer, the theme tokens — costs about **1.5 KB gzipped** on top of the kit. Less than the average `onclick` handler I've ever seen serialised into HTML.

## Five things I learned by dogfooding

### 1. `tc-button` is a button, not an anchor

The hero CTAs on the landing page want to be links — "Read the docs →" goes to `./docs.html`. My first instinct was to use `<tc-button href="…">` for stylistic consistency. But `tc-button` renders a real `<button>` element inside its shadow root, and buttons don't navigate. I went back to styled anchors with `.btn-primary` / `.btn-secondary` classes, kept the kit's tokens for colours, and moved on. A future `<tc-link>` variant or an `as="a"` prop on `tc-button` would close this gap.

### 2. Naming collisions are real

The hero on the landing page has a "composed card" demo built inline as `<tc-card>` — but the kit also exports `<tc-card>` as its layout primitive. Loading `site.js` registered the kit's version first, so the demo silently used the kit's chrome instead of the handwritten one. The fix: rename the inline demos to `<demo-card>`, `<demo-counter>`, `<demo-buttons>`. Lesson: *any* tag name is a global, and `tc-*` is now squatted.

### 3. `base` is a real prop, not a smell

The blog posts live in `blog/`, one level below the site root. So when `site-nav` renders `<a href="docs.html">` on a blog post, the browser resolves it to `blog/docs.html` — broken link. Fix: `<site-nav>` accepts a `base` prop and prepends it to every internal `href`. The blog pages pass `base="../"`, everything else leaves it default. Tiny prop, big payoff.

### 4. Pre-tokenised code is a feature

`tc-code` doesn't ship a syntax highlighter. It renders the slotted content verbatim and provides four CSS classes — `.tc-kw`, `.tc-str`, `.tc-com`, `.tc-tag` — that pick up the kit's code-block colours. So a snippet looks like this in source:

```html
<tc-code language="ts"><span class="tc-kw">const</span> x = <span class="tc-str">"hi"</span>;</tc-code>
```

Verbose? A little. But: **no highlighter ships** (the kit stays small), **output looks identical to input** (no surprise tokenisation), and **any language works** (no grammar to install or keep current). For a docs site where the author already knows which spans should be keywords, that trade is worth it.

### 5. Theme tokens proved themselves

The themes page has a live switcher with four presets — light, dark, Bootstrap, Tailwind. Each preset is a set of `:root` custom-property overrides applied to the page. With the kit components in every section now, flipping a preset re-skins every button, input, badge, stat card, and callout on the page *at once* — because they all read the same `--tc-color-*` tokens. Before the rewrite, the switcher demo on the themes page worked, but the docs site chrome around it stayed warm-tan no matter which preset was picked. That gap is closed.

:::callout variant=success title="The point of dogfooding"
None of these five things were visible until I tried to live inside the API for a week. Issue trackers don't surface "your CTA buttons should be anchors sometimes" — only writing a real CTA does.
:::

## What I'd change in the kit because of this

Three follow-ups I'm leaving open after Sprint 4:

- **An `as` prop on `tc-button`** — let it render as an anchor when an `href` is passed. Keeps styling consistent across navigation and actions.
- **A theme token for code-block colours** — the `.tc-kw` / `.tc-str` / `.tc-com` classes are still hard-coded amber. Should be `--tc-code-keyword` etc., so the dark preset can adjust contrast.
- **A `tc-pagination` primitive** — the blog index now has a hand-rolled prev/next built from `tc-button`s. That should be one component if the site is going to grow past five posts.

---

The rewrite shipped across five commits between Sprint 2 and Sprint 4 of this branch. The full diff is **+1,642 / −4,112** across twelve HTML files. Most of the deletions were chrome — the kind of code that's embarrassing to *have* duplicated and embarrassing to *admit* you had duplicated. The way I think about it now: every `:root` token I deleted is a small bet that the abstraction underneath it will hold. So far, it has.

*If you want to see the chrome layer up close, the source for `<site-nav>` is [on GitHub](https://github.com/ra9/tan-compose/blob/main/site/components/site-nav.ts); it's 200 lines including the styles. The whole site is open source.*
