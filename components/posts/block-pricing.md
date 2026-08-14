---
tag: tc-block-pricing
slug: block-pricing
category: page templates
summary: A pricing page driven by a single JSON tiers prop — cards, features, a featured plan, and a select event.
description: tc-block-pricing documentation — a full-page pricing template from @ra9/tan-compose-kit/blocks, with the tiers prop, select event, and theming.
importPath: "@ra9/tan-compose-kit/blocks/pricing"

props:
  - name: title
    type: string
    default: '"Simple, transparent pricing"'
    description: Page heading.
  - name: subtitle
    type: string
    default: '"Start free and scale as you grow. Cancel anytime."'
    description: Text under the heading.
  - name: currency
    type: string
    default: '"$"'
    description: Prefixed before numeric prices. Omitted for non-numeric prices like "Custom".
  - name: tiers
    type: 'Array<Tier> (json)'
    default: '[Starter, Pro, Enterprise]'
    description: 'Tier = { name, price, period, description, badge?, featured?, cta, features: string[] }.'

events:
  - name: tc-block-pricing-select
    detail: '{ tier }'
    description: Fires when a plan's CTA button is activated.

slots: []

cssVars:
  - name: "--tc-block-surface"
    default: "var(--tc-color-surface, #ffffff)"
    description: Card background.
  - name: "--tc-block-rule"
    default: "var(--tc-color-rule, #ece5d3)"
    description: Card border.
  - name: "--tc-block-radius"
    default: "var(--tc-radius-lg, 12px)"
    description: Card corner radius.
  - name: "--tc-block-shadow"
    default: "var(--tc-shadow-md, …)"
    description: Card shadow.
  - name: "--tc-block-featured-border"
    default: "var(--tc-color-accent, #a16939)"
    description: Border color of the featured tier.
  - name: "--tc-block-font"
    default: "var(--tc-font-sans, …)"
    description: Font family.

related:
  - button
  - grid
  - badge
---

`<tc-block-pricing>` renders the whole pricing page from one JSON prop, so
your plan data can come straight from a CMS or an API response. Set
`featured: true` to highlight the plan you want to push, and read the
selection from a single event.

### Basic usage

```html
<tc-block-pricing></tc-block-pricing>
```

```js
import "@ra9/tan-compose-kit/blocks/pricing";

const pricing = document.querySelector("tc-block-pricing");
pricing.tiers = [
  {
    name: "Starter",
    price: "0",
    period: "/month",
    description: "For individuals getting started.",
    cta: "Start for free",
    features: ["Up to 3 projects", "Community support"],
  },
  {
    name: "Pro",
    price: "29",
    period: "/month",
    description: "For growing teams.",
    cta: "Start 14-day trial",
    featured: true,
    badge: "Most popular",
    features: ["Unlimited projects", "Advanced analytics", "Priority support"],
  },
];

pricing.addEventListener("tc-block-pricing-select", (e) => {
  checkout(e.detail.tier);
});
```

### Non-numeric prices

A price like `"Custom"` skips the currency prefix automatically:

```html
<tc-block-pricing currency="€"></tc-block-pricing>
```

```js
pricing.tiers = [
  { name: "Enterprise", price: "Custom", period: "", cta: "Contact sales", features: ["SSO & SCIM"] },
];
```

:::callout variant=info title="See it live"
The [blocks demo](../demo/blocks/) previews all five page templates with a
switcher, including this one.
:::
