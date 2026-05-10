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
 *   import "@ra9/tan-compose-kit/select";
 *   import "@ra9/tan-compose-kit/table";
 *   import "@ra9/tan-compose-kit/tabs";
 *   import "@ra9/tan-compose-kit/modal";
 *   import "@ra9/tan-compose-kit/toast";
 *   import "@ra9/tan-compose-kit/stat";
 */

import { tagName as buttonTag } from "./components/button.ts";
import { tagName as inputTag } from "./components/input.ts";
import { tagName as selectTag } from "./components/select.ts";
import { tagName as tableTag } from "./components/table.ts";
import { tagName as tabsTag } from "./components/tabs.ts";
import { tagName as modalTag } from "./components/modal.ts";
import { tagName as toastTag } from "./components/toast.ts";
import { tagName as statTag } from "./components/stat.ts";

/** Tag names of every component this module registers. */
export const tags = {
  button: buttonTag,
  input: inputTag,
  select: selectTag,
  table: tableTag,
  tabs: tabsTag,
  modal: modalTag,
  toast: toastTag,
  stat: statTag,
} as const;
