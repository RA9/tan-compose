---
tag: tc-block-login
slug: block-login
category: page templates
summary: A ready-made split-screen login page — brand panel on the left, sign-in form on the right — that emits your credentials on submit.
description: tc-block-login documentation — a full-page login template from @ra9/tan-compose-kit/blocks, with props, the submit event, slots, and theming.
importPath: "@ra9/tan-compose-kit/blocks/login"

props:
  - name: brand
    type: string
    default: '"Acme"'
    description: Brand wordmark shown in the side panel.
  - name: headline
    type: string
    default: '"Everything your team needs, in one place."'
    description: Marketing headline in the side panel.
  - name: features
    type: 'string[] (json)'
    default: '[…3 defaults]'
    description: Bullet list rendered in the side panel.
  - name: title
    type: string
    default: '"Welcome back"'
    description: Form heading.
  - name: subtitle
    type: string
    default: '"Sign in to your account to continue."'
    description: Text under the form heading.
  - name: emailLabel
    type: string
    default: '"Email"'
    description: Label for the email field.
  - name: passwordLabel
    type: string
    default: '"Password"'
    description: Label for the password field.
  - name: rememberLabel
    type: string
    default: '"Remember me"'
    description: Label for the remember-me checkbox.
  - name: submitLabel
    type: string
    default: '"Sign in"'
    description: Submit button text.
  - name: forgotLabel
    type: string
    default: '"Forgot password?"'
    description: Text of the forgot-password link.
  - name: forgotHref
    type: string
    default: '"#"'
    description: Href of the forgot-password link.

events:
  - name: tc-block-login-submit
    detail: '{ values: { email, password, remember } }'
    description: Fires when the form is submitted (button click or Enter). preventDefault() cancels nothing — it is informational only.

slots:
  - name: side
    description: Replaces the entire left brand panel.
  - name: footer
    description: Content below the submit button, e.g. a sign-up link.

cssVars:
  - name: "--tc-block-side-bg"
    default: "var(--tc-color-surface, #ffffff)"
    description: Side panel background.
  - name: "--tc-block-side-fg"
    default: "var(--tc-color-ink, #14171f)"
    description: Side panel text color.
  - name: "--tc-block-side-soft"
    default: "var(--tc-color-ink-soft, #4a5061)"
    description: Side panel secondary text (features, footer).
  - name: "--tc-block-surface"
    default: "var(--tc-color-surface, #ffffff)"
    description: Form panel background.
  - name: "--tc-block-rule"
    default: "var(--tc-color-rule, #ece5d3)"
    description: Border color.
  - name: "--tc-block-radius"
    default: "var(--tc-radius-lg, 12px)"
    description: Corner radius for form controls.
  - name: "--tc-block-shadow"
    default: "var(--tc-shadow-md, …)"
    description: Card shadow.
  - name: "--tc-block-font"
    default: "var(--tc-font-sans, …)"
    description: Font family.

related:
  - block-signup
  - input
  - button
  - checkbox
---

`<tc-block-login>` is a complete login page in one element. It composes
`tc-input`, `tc-checkbox`, and `tc-button` into a responsive split layout
that stacks on narrow screens. The form is `novalidate` and never navigates —
it hands the collected values to your code through a single event.

### Basic usage

```html
<tc-block-login brand="Acme"></tc-block-login>
```

```js
import "@ra9/tan-compose-kit/blocks/login";
import "@ra9/tan-compose-kit/themes/tokens";

document.querySelector("tc-block-login").addEventListener(
  "tc-block-login-submit",
  (e) => {
    const { email, password, remember } = e.detail.values;
    // authenticate(email, password)
  },
);
```

### Custom copy

Every visible string is a prop, so you can rebrand the whole page without
touching the shadow DOM:

```html
<tc-block-login
  brand="Northwind"
  headline="One inbox for every team."
  submit-label="Log in"
  forgot-href="/reset"
></tc-block-login>
```

```js
const el = document.querySelector("tc-block-login");
el.features = ["Unlimited projects", "SSO & SCIM", "24/7 support"];
```

### Slots

Replace the brand panel or append to the form footer:

```html
<tc-block-login>
  <div slot="side">
    <!-- your own marketing panel -->
  </div>
  <p slot="footer">
    New here? <a href="/signup">Create an account</a>
  </p>
</tc-block-login>
```

:::callout variant=info title="See it live"
The [blocks demo](../demo/blocks/) previews all five page templates with a
switcher, including this one.
:::
