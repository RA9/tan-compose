/**
 * @ra9/tan-compose-kit — battle-tested primitives built on @ra9/tan-compose.
 *
 * Each component is registered with a `tc-` prefix. Importing a component
 * module has the side-effect of registering it with `customElements`.
 * Theme tokens are NOT injected by importing the kit alone — load them
 * explicitly so you stay in control of the global cascade:
 *
 *   import "@ra9/tan-compose-kit/themes/tokens";   // default light theme
 *   // or
 *   import "@ra9/tan-compose-kit/themes/dark";     // dark mode preset
 *   import "@ra9/tan-compose-kit/themes/bootstrap"; // Bootstrap palette
 *   import "@ra9/tan-compose-kit/themes/tailwind";  // Tailwind palette
 *
 * Components fall back to hardcoded defaults if no tokens are loaded.
 */

import { tagName as buttonTag } from "./components/button.ts";
import { tagName as inputTag } from "./components/input.ts";
import { tagName as textareaTag } from "./components/textarea.ts";
import { tagName as selectTag } from "./components/select.ts";
import { tagName as checkboxTag } from "./components/checkbox.ts";
import { tagName as switchTag } from "./components/switch.ts";
import { tagName as fileTag } from "./components/file.ts";
import { tagName as radioGroupTag } from "./components/radio-group.ts";
import { tagName as tableTag } from "./components/table.ts";
import { tagName as tabsTag } from "./components/tabs.ts";
import { tagName as modalTag } from "./components/modal.ts";
import { tagName as toastTag } from "./components/toast.ts";
import { tagName as statTag } from "./components/stat.ts";
import { tagName as cardTag } from "./components/card.ts";
import { tagName as badgeTag } from "./components/badge.ts";
import { tagName as skeletonTag } from "./components/skeleton.ts";
import { tagName as stackTag } from "./components/stack.ts";
import { tagName as clusterTag } from "./components/cluster.ts";
import { tagName as gridTag } from "./components/grid.ts";
import { tagName as codeTag } from "./components/code.ts";
import { tagName as calloutTag } from "./components/callout.ts";
import { tagName as tocTag } from "./components/toc.ts";
import { tagName as paginationTag } from "./components/pagination.ts";
import { tagName as comboboxTag } from "./components/combobox.ts";

/** Tag names of every component this module registers. */
export const tags = {
  // form fields
  button: buttonTag,
  input: inputTag,
  textarea: textareaTag,
  select: selectTag,
  checkbox: checkboxTag,
  switch: switchTag,
  file: fileTag,
  radioGroup: radioGroupTag,
  // data
  table: tableTag,
  // layout / chrome
  tabs: tabsTag,
  modal: modalTag,
  toast: toastTag,
  stat: statTag,
  card: cardTag,
  badge: badgeTag,
  skeleton: skeletonTag,
  // primitives
  stack: stackTag,
  cluster: clusterTag,
  grid: gridTag,
  // docs / content
  code: codeTag,
  callout: calloutTag,
  toc: tocTag,
  pagination: paginationTag,
  // additional form fields
  combobox: comboboxTag,
} as const;
