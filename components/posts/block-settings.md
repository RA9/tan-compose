---
tag: tc-block-settings
slug: block-settings
category: page templates
summary: A settings page with a section list on the left driving named content slots on the right.
description: tc-block-settings documentation — a full-page settings template from @ra9/tan-compose-kit/blocks, with section props, slots, the change event, and theming.
importPath: "@ra9/tan-compose-kit/blocks/settings"

props:
  - name: title
    type: string
    default: '"Settings"'
    description: Page heading.
  - name: description
    type: string
    default: '"Manage your account and workspace preferences."'
    description: Text under the heading.
  - name: sections
    type: 'Array<{ id, label, hint? }> (json)'
    default: '[4 defaults]'
    description: Left-hand navigation entries.
  - name: active
    type: string
    default: 'first section id'
    description: Id of the visible section. Reflects to the host attribute.

events:
  - name: tc-block-settings-change
    detail: '{ active, previous }'
    description: Fires when a section is activated.

slots:
  - name: (per section id)
    description: One named slot per section id; `<div slot="profile">…</div>` shows when `active === "profile"`.

cssVars:
  - name: "--tc-block-side-bg"
    default: "var(--tc-color-surface, #ffffff)"
    description: Section list background.
  - name: "--tc-block-side-fg"
    default: "var(--tc-color-ink, #14171f)"
    description: Section label color.
  - name: "--tc-block-side-soft"
    default: "var(--tc-color-ink-soft, #4a5061)"
    description: Inactive section / hint color.
  - name: "--tc-block-side-active-bg"
    default: "var(--tc-color-accent-soft, #efe2cf)"
    description: Active section background.
  - name: "--tc-block-surface"
    default: "var(--tc-color-surface, #ffffff)"
    description: Content panel background.
  - name: "--tc-block-rule"
    default: "var(--tc-color-rule, #ece5d3)"
    description: Border color.
  - name: "--tc-block-radius"
    default: "var(--tc-radius-lg, 12px)"
    description: Content panel corner radius.
  - name: "--tc-block-font"
    default: "var(--tc-font-sans, …)"
    description: Font family.

related:
  - block-dashboard
  - tabs
  - input
  - switch
---

`<tc-block-settings>` is a vertical-tabs layout for preferences pages. Each
section's content is a named slot, so the block stays presentation-only and
your form controls live in the light DOM.

### Basic usage

```html
<tc-block-settings
  title="Settings"
  description="Manage your workspace."
></tc-block-settings>
```

```js
import "@ra9/tan-compose-kit/blocks/settings";

const settings = document.querySelector("tc-block-settings");
settings.sections = [
  { id: "profile", label: "Profile", hint: "Name and avatar" },
  { id: "billing", label: "Billing", hint: "Plan and invoices" },
];
```

### Slotting sections

```html
<tc-block-settings>
  <div slot="profile">
    <tc-input label="Full name" name="name"></tc-input>
  </div>
  <div slot="billing">
    <tc-select label="Plan" name="plan"></tc-select>
  </div>
</tc-block-settings>
```

:::callout variant=info title="See it live"
The [blocks demo](../demo/blocks/) previews all five page templates with a
switcher, including this one — with form controls slotted into each
section.
:::
