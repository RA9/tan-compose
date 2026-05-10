/**
 * @ra9/tan-compose-kit — battle-tested primitives built on @ra9/tan-compose.
 *
 * Each component is registered with a `tc-` prefix and is fully styleable via
 * CSS custom properties exposed on `:host`. Importing a component module has
 * the side-effect of registering it with `customElements`.
 *
 * Usage:
 *   import "@ra9/tan-compose-kit";  // registers all components
 *   // or import individually:
 *   import "@ra9/tan-compose-kit/button";
 *   import "@ra9/tan-compose-kit/input";
 *   import "@ra9/tan-compose-kit/table";
 */

import { tagName as buttonTag } from "./components/button.ts";
import { tagName as inputTag } from "./components/input.ts";
import { tagName as tableTag } from "./components/table.ts";

/** Tag names of every component this module registers. */
export const tags = {
  button: buttonTag,
  input: inputTag,
  table: tableTag,
} as const;
