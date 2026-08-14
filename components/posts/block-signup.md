---
tag: tc-block-signup
slug: block-signup
category: page templates
summary: A ready-made registration page — brand panel plus a name/email/password form that emits the submitted values.
description: tc-block-signup documentation — a full-page signup template from @ra9/tan-compose-kit/blocks, with props, the submit event, slots, and theming.
importPath: "@ra9/tan-compose-kit/blocks/signup"

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
    default: '"Create your account"'
    description: Form heading.
  - name: subtitle
    type: string
    default: '"Start your free trial — no credit card required."'
    description: Text under the form heading.
  - name: nameLabel
    type: string
    default: '"Full name"'
    description: Label for the name field.
  - name: emailLabel
    type: string
    default: '"Email"'
    description: Label for the email field.
  - name: passwordLabel
    type: string
    default: '"Password"'
    description: Label for the password field.
  - name: termsLabel
    type: string
    default: '"I agree to the Terms of Service and Privacy Policy."'
    description: Label for the terms checkbox.
  - name: submitLabel
    type: string
    default: '"Create account"'
    description: Submit button text.
  - name: loginLabel
    type: string
    default: '"Already have an account?"'
    description: Text before the sign-in link in the footer.
  - name: loginHref
    type: string
    default: '"#"'
    description: Href of the sign-in link.

events:
  - name: tc-block-signup-submit
    detail: '{ values: { name, email, password, terms } }'
    description: Fires when the form is submitted. Informational only.

slots:
  - name: side
    description: Replaces the entire left brand panel.
  - name: footer
    description: Content below the submit button, e.g. a sign-in link.

cssVars:
  - name: "--tc-block-side-bg"
    default: "var(--tc-color-surface, #ffffff)"
    description: Side panel background.
  - name: "--tc-block-side-fg"
    default: "var(--tc-color-ink, #14171f)"
    description: Side panel text color.
  - name: "--tc-block-side-soft"
    default: "var(--tc-color-ink-soft, #4a5061)"
    description: Side panel secondary text.
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
  - block-login
  - input
  - button
  - checkbox
---

`<tc-block-signup>` mirrors `<tc-block-login>`'s layout but collects name,
email, password, and a terms-consent flag. The fields are real
form-associated `tc-input` / `tc-checkbox` elements, but the block keeps
submission out of the DOM and routes it through one event.

### Basic usage

```html
<tc-block-signup brand="Acme"></tc-block-signup>
```

```js
import "@ra9/tan-compose-kit/blocks/signup";

document.querySelector("tc-block-signup").addEventListener(
  "tc-block-signup-submit",
  (e) => {
    const { name, email, password, terms } = e.detail.values;
    // createAccount({ name, email, password, terms })
  },
);
```

### Custom copy

```html
<tc-block-signup
  title="Join Northwind"
  submit-label="Start my trial"
  login-href="/login"
></tc-block-signup>
```

:::callout variant=info title="See it live"
The [blocks demo](../demo/blocks/) previews all five page templates with a
switcher, including this one.
:::
