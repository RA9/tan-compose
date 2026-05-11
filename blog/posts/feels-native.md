---
title: Making custom elements feel native
slug: feels-native
date: 2026-05-10
tag: v0.4.0 · release
version: v1.1.0
description: v0.4 of tan-compose adds refs, Form-Associated Custom Elements, and adopted stylesheets — the platform integrations that make custom elements feel native.
excerpt: v0.3 gave us building blocks. v0.4 is about the seams — refs, form-association, and adopted stylesheets that let a tan-compose element behave like a real platform primitive.
---

v0.3 gave us the building blocks for big components — props, reactive templates, keyed lists, event delegation. v0.4 is about the seams. Three small additions that make a tan-compose element behave like a real platform primitive when it's sitting next to `<form>`, when external code grabs it, and when you instantiate it a hundred times.

## 1. Refs

Before 0.4, "I need to focus the input after mount" looked like this:

```ts
afterMount() {
  this.shadowRoot.querySelector(".search").focus();
}
```

Two problems. The selector is a string buried in a closure, so renaming the class breaks it silently. And after a re-render the node is different — your reference points at a detached element. Now:

```ts
build("search-box", describe({
  refs: { input: ".search" },
  template: `<input class="search" />`,
  afterMount() {
    (this.refs.input as HTMLInputElement)?.focus();
  },
}));
```

`refs` is a name → selector map declared once. After every render, `host.refs.<name>` and `ctx.refs.<name>` are populated by querying the shadow root. Selectors that match nothing return `null`. The refs object is fresh on every render, so you never accidentally hold onto a stale node.

## 2. Form-Associated Custom Elements

This one is the headline. Until 0.4, a tan-compose `<tc-input>` looked like an input but didn't *act* like one — drop it inside a `<form>` and submission would skip right over it. The Form-Associated Custom Elements API has been around since Chromium 77 and Safari 16.4; tan-compose just needed to opt in.

The fix is two lines of config:

```ts
build("tc-input", describe({
  formAssociated: true,
  props: { value: { type: "string", default: "" } },
  refs: { input: ".q" },
  template: ({ props }) =>
    `<input class="q" value="${props.value}" />`,
  events: {
    "input .q": (e, ctx) => {
      ctx.host.value = (e.target as HTMLInputElement).value;
    },
  },
  formResetCallback() {
    (this as unknown as { value: string }).value = "";
  },
}));
```

What that does for you, automatically:

- `this.attachInternals()` is called once in the constructor; `host.internals` is the result.
- Whenever `value` is set (via setter, attribute, or initial render), `internals.setFormValue` is called so submission picks up the new value.
- `formAssociatedCallback`, `formDisabledCallback`, `formResetCallback`, and `formStateRestoreCallback` are wired up if you provide them.

That's enough for `<form>.submit()`, `FormData`, browser autofill, the validity API, and form reset to all just work. Without this you were wiring fake hidden inputs in `afterMount`. Don't do that anymore.

## 3. Adopted stylesheets

Every tan-compose component used to inject a `<style>` tag into its shadow root for the theme variables and a second one for the container styles. That's fine for a button. With a hundred-row table where each row is a `<tc-row>`, you're inlining two hundred copies of the same CSS into the document.

Constructable stylesheets fix this. We compile the CSS once per registered tag and apply via `shadowRoot.adoptedStyleSheets`:

```ts
// Once per build():
const sheet = new CSSStyleSheet();
sheet.replaceSync(":host { --brand: tomato; }");

// Per instance:
shadow.adoptedStyleSheets = [sheet];
```

Same CSS, same theming. One `CSSStyleSheet` object shared across all instances of that tag, instead of a fresh `<style>` per element. Old browsers that don't support `replaceSync` fall back to inline tags transparently — no config needed, no breaking change.

## What's missing

v0.4 is the last "library primitives" release I'm planning for a while. The next thing tan-compose needs isn't more features — it's *proof*. A separate `@ra9/tan-compose-kit` package with battle-tested primitives: `<tc-table>` with sort/filter/pagination, `<tc-input>`, `<tc-modal>`, `<tc-tabs>`. The library is capable enough now; the next thing is shipping a real component built on top of it that people can drop into a project and ship a feature with.

That's where 0.5 is headed.

---

Try the [Playground](../playground.html). Read the [Docs](../docs.html). Or fork it on [GitHub](https://github.com/ra9/tan-compose).
