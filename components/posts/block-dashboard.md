---
tag: tc-block-dashboard
slug: block-dashboard
category: page templates
summary: An app shell with sidebar navigation, a top bar, and a content region fed by slots — drop in tc-stat, tc-table, and tc-card to build an admin screen.
description: tc-block-dashboard documentation — a full-page dashboard shell from @ra9/tan-compose-kit/blocks, with nav props, slots, the nav event, and theming.
importPath: "@ra9/tan-compose-kit/blocks/dashboard"

props:
  - name: brand
    type: string
    default: '"Acme"'
    description: Brand wordmark at the top of the sidebar.
  - name: title
    type: string
    default: '"Dashboard"'
    description: Page title in the top bar.
  - name: nav
    type: 'Array<{ id, label, icon? }> (json)'
    default: '[4 defaults]'
    description: Sidebar entries. `icon` is optional and rendered as a glyph/emoji.
  - name: active
    type: string
    default: 'first nav id'
    description: Id of the active nav entry. Reflects to the host attribute.
  - name: userName
    type: string
    default: '"Alex Rivera"'
    description: Name shown in the sidebar footer.
  - name: userRole
    type: string
    default: '"Administrator"'
    description: Role shown under the name.

events:
  - name: tc-block-dashboard-nav
    detail: '{ id, item, previous }'
    description: Fires when a nav entry is activated (click or keyboard).

slots:
  - name: (default)
    description: Main content region — drop any kit component or HTML here.
  - name: topbar
    description: Right-hand actions in the top bar (buttons, search, …).
  - name: sidebar-bottom
    description: Replaces the user footer in the sidebar.

cssVars:
  - name: "--tc-block-side-bg"
    default: "var(--tc-color-surface, #ffffff)"
    description: Sidebar background.
  - name: "--tc-block-side-fg"
    default: "var(--tc-color-ink, #14171f)"
    description: Sidebar text color.
  - name: "--tc-block-side-soft"
    default: "var(--tc-color-ink-soft, #4a5061)"
    description: Inactive nav / secondary text color.
  - name: "--tc-block-side-active-bg"
    default: "var(--tc-color-accent-soft, #efe2cf)"
    description: Active nav background.
  - name: "--tc-block-surface"
    default: "var(--tc-color-surface, #ffffff)"
    description: Top bar background.
  - name: "--tc-block-rule"
    default: "var(--tc-color-rule, #ece5d3)"
    description: Border color.
  - name: "--tc-block-font"
    default: "var(--tc-font-sans, …)"
    description: Font family.

related:
  - block-settings
  - stat
  - table
  - card
---

`<tc-block-dashboard>` provides the chrome — sidebar, top bar, content
region — while your content stays in the light DOM. It renders the user's
avatar with `tc-avatar` and switches nav through its `active` prop.

### Basic usage

```html
<tc-block-dashboard title="Customers"></tc-block-dashboard>
```

```js
import "@ra9/tan-compose-kit/blocks/dashboard";

const shell = document.querySelector("tc-block-dashboard");
shell.nav = [
  { id: "overview", label: "Overview", icon: "◉" },
  { id: "customers", label: "Customers", icon: "◈" },
  { id: "billing", label: "Billing", icon: "◫" },
];

shell.addEventListener("tc-block-dashboard-nav", (e) => {
  // swap the slotted content for e.detail.id
});
```

### Slotting content

```html
<tc-block-dashboard title="Overview" user-name="Ada" user-role="Owner">
  <tc-grid min="220px" gap="3">
    <tc-stat label="Revenue" prefix="$" value="48,210" trend="up"></tc-stat>
    <tc-stat label="Users" value="12,884" trend="up"></tc-stat>
  </tc-grid>

  <tc-button slot="topbar" variant="primary">New</tc-button>
</tc-block-dashboard>
```

:::callout variant=info title="See it live"
The [blocks demo](../demo/blocks/) previews all five page templates with a
switcher, including this one — with stats and a card slotted into the
content region.
:::
