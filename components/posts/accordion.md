---
tag: tc-accordion
slug: accordion
category: chrome
summary: Disclosure group built on native `<details>`. Single or multi-open mode, keyboard nav between summaries, animated caret.
description: tc-accordion documentation — basic, multi-open, no border, keyboard navigation, and theming reference.
importPath: "@ra9/tan-compose-kit/accordion"

props:
  - name: mode
    type: '"single" | "multi"'
    default: '"single"'
    description: '`single` closes other items when one opens. `multi` allows any number open at once.'
  - name: bordered
    type: boolean
    default: "true"
    description: Render an outer border and dividers between items.

events:
  - name: tc-change
    detail: '{ open: string[] }'
    description: Fires when an item opens or closes. `open` lists the ids (or summary text fallback) of currently-open items, in source order.

slots:
  - name: (default)
    description: One or more native `<details>` elements, each with its own `<summary>` heading.

cssVars:
  - name: "--tc-accordion-bg"
    default: "var(--tc-color-surface, #ffffff)"
    description: Item background.
  - name: "--tc-accordion-ink"
    default: "var(--tc-color-ink, #14171f)"
    description: Heading color.
  - name: "--tc-accordion-ink-soft"
    default: "var(--tc-color-ink-soft, #4a5061)"
    description: Body text color.
  - name: "--tc-accordion-rule"
    default: "var(--tc-color-rule, #ece5d3)"
    description: Border and divider color.
  - name: "--tc-accordion-radius"
    default: "var(--tc-radius-md, 8px)"
    description: Outer corner radius.
  - name: "--tc-accordion-accent"
    default: "var(--tc-color-accent, #a16939)"
    description: Focus outline color.
  - name: "--tc-accordion-font"
    default: "var(--tc-font-sans, …)"
    description: Font family.

related:
  - tabs
  - toc
  - callout
---

### Basic (single-open)

By default, opening one item closes the others. Items are plain `<details>` so they degrade gracefully if the script ever fails to load.

<div class="stage">
  <tc-accordion style="max-width: 560px;">
    <details open>
      <summary>Why declarative components?</summary>
      <div style="padding: 4px 18px 16px; color: var(--tc-color-ink-soft);">
        You describe what the element looks like and behaves like, the library builds the wiring. No template compiler, no JSX, no global runtime.
      </div>
    </details>
    <details>
      <summary>Is there a build step?</summary>
      <div style="padding: 4px 18px 16px; color: var(--tc-color-ink-soft);">
        Only if you want one. The library publishes as ESM on JSR; you can import straight from a CDN or bundle with esbuild / Vite.
      </div>
    </details>
    <details>
      <summary>Does it work with React / Vue / Svelte?</summary>
      <div style="padding: 4px 18px 16px; color: var(--tc-color-ink-soft);">
        Yes — Web Components are framework-neutral. Pass props as attributes, listen to <code>tc-*</code> events.
      </div>
    </details>
  </tc-accordion>
</div>

```html
<tc-accordion>
  <details open>
    <summary>Why declarative components?</summary>
    <p>You describe what the element looks like and behaves like…</p>
  </details>
  <details>
    <summary>Is there a build step?</summary>
    <p>Only if you want one.</p>
  </details>
</tc-accordion>
```

### Multi-open

`mode="multi"` allows any number of items to be open at the same time.

<div class="stage">
  <tc-accordion mode="multi" style="max-width: 560px;">
    <details>
      <summary>Read access</summary>
      <div style="padding: 4px 18px 16px; color: var(--tc-color-ink-soft);">View dashboards, run reports, browse records.</div>
    </details>
    <details>
      <summary>Write access</summary>
      <div style="padding: 4px 18px 16px; color: var(--tc-color-ink-soft);">Create, edit, and delete records you own.</div>
    </details>
    <details>
      <summary>Admin access</summary>
      <div style="padding: 4px 18px 16px; color: var(--tc-color-ink-soft);">Manage users, billing, and workspace settings.</div>
    </details>
  </tc-accordion>
</div>

```html
<tc-accordion mode="multi">
  <details><summary>Read access</summary>…</details>
  <details><summary>Write access</summary>…</details>
  <details><summary>Admin access</summary>…</details>
</tc-accordion>
```

### Borderless

Drop the outer border for an inline / inlay treatment that blends into the parent surface.

<div class="stage">
  <tc-accordion bordered="false" style="max-width: 560px;">
    <details>
      <summary>What's included in the free tier?</summary>
      <div style="padding: 4px 18px 16px; color: var(--tc-color-ink-soft);">All components, all themes, no usage cap. The free tier is the only tier.</div>
    </details>
    <details>
      <summary>How do you ship updates?</summary>
      <div style="padding: 4px 18px 16px; color: var(--tc-color-ink-soft);">Semantic version bumps on JSR. Patch releases are always backwards compatible.</div>
    </details>
  </tc-accordion>
</div>

```html
<tc-accordion bordered="false">
  <details>…</details>
  <details>…</details>
</tc-accordion>
```

### Listening for change

`tc-change` fires after every open / close with the current set of open items.

```html
<tc-accordion id="faq">
  <details id="pricing"><summary>Pricing</summary>…</details>
  <details id="support"><summary>Support</summary>…</details>
</tc-accordion>

<script>
  document.getElementById("faq").addEventListener("tc-change", (e) => {
    console.log("open items:", e.detail.open);
    // → ["pricing"]   after opening the first
  });
</script>
```

### Accessibility

- Each item is a native `<details>` element. Screen readers announce expand / collapse without any extra wiring.
- Keyboard support: `↑` / `↓` move focus between summaries, `Home` / `End` jump to the first / last. `Space` and `Enter` toggle the focused item (native `<summary>` behavior).
- The caret is `aria-hidden` so it's not announced.
- Authors should keep `<summary>` content concise — it acts as the disclosure label.

### Theming

```html
<tc-accordion
  style="
    --tc-accordion-bg: #0b0c10;
    --tc-accordion-ink: #f3f3f3;
    --tc-accordion-ink-soft: #b8b8b8;
    --tc-accordion-rule: #1c1f26;
    --tc-accordion-accent: #ffc857;
  "
>
  <details><summary>Dark item</summary><p>…</p></details>
  <details><summary>Another</summary><p>…</p></details>
</tc-accordion>
```
