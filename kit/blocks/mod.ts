/**
 * @ra9/tan-compose-kit/blocks — ready-made page templates on top of the kit.
 *
 * Each block is a single custom element that composes several kit
 * primitives into a complete page section (login, signup, dashboard shell,
 * settings page, pricing page). Importing a block module registers it AND
 * the primitives it depends on, so a single import is enough:
 *
 *   import "@ra9/tan-compose-kit/blocks";
 *   import "@ra9/tan-compose-kit/themes/tokens"; // optional theming
 *
 * Or import individual blocks:
 *
 *   import "@ra9/tan-compose-kit/blocks/login";
 *   import "@ra9/tan-compose-kit/blocks/dashboard";
 *
 * Every block emits a composed custom event on interaction (e.g.
 * `tc-block-login-submit`, `tc-block-dashboard-nav`) so you can wire it to
 * your app without reaching into the shadow DOM.
 */

import { tagName as loginTag } from "./login.ts";
import { tagName as signupTag } from "./signup.ts";
import { tagName as dashboardTag } from "./dashboard.ts";
import { tagName as settingsTag } from "./settings.ts";
import { tagName as pricingTag } from "./pricing.ts";

/** Tag names of every block this module registers. */
export const tags = {
  login: loginTag,
  signup: signupTag,
  dashboard: dashboardTag,
  settings: settingsTag,
  pricing: pricingTag,
} as const;
