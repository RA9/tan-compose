/**
 * `<tc-icon>` — inline SVG icon component for the tan-compose ecosystem.
 *
 * Built on `@ra9/tan-compose`. Ships ~40 commonly-needed icons drawn from
 * the Lucide icon set (lucide.dev, ISC licensed) at a 24x24 viewBox with a
 * 2px stroke. The icon takes its color from `currentColor`, so it inherits
 * from the surrounding text:
 *
 *   <span style="color: tomato;">
 *     <tc-icon name="check"></tc-icon>
 *   </span>
 *
 * Props:
 *   name    string  required — one of the IconName values, e.g. "check"
 *   size    string  default "1em" — any CSS length
 *   stroke  string  default "currentColor"
 *   fill    string  default "none"
 *   title   string  default ""  — accessible name; sets role="img"
 *
 * Example:
 *   import "@ra9/tan-compose-icons";
 *   <tc-icon name="search" size="20" title="Search"></tc-icon>
 */

import { build, describe } from "@ra9/tan-compose";
import { iconNames, ICONS } from "./icons.ts";

const TAG = "tc-icon";

export const tagName: string = TAG;

build(
  TAG,
  describe({
    props: {
      name: { type: "string", default: "" },
      size: { type: "string", default: "1em" },
      stroke: { type: "string", default: "currentColor" },
      fill: { type: "string", default: "none" },
      title: { type: "string", default: "" },
    },
    styles: {
      display: "inline-flex",
      "align-items": "center",
      "justify-content": "center",
      "vertical-align": "middle",
      "line-height": "1",
    },
    template: ({ props }) => {
      const name = String(props.name ?? "");
      const path = ICONS[name];
      const size = String(props.size ?? "1em");
      const stroke = String(props.stroke ?? "currentColor");
      const fill = String(props.fill ?? "none");
      const title = String(props.title ?? "");

      if (!path) {
        return `
          <svg width="${esc(size)}" height="${esc(size)}" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="1.5"
               stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <text x="12" y="14.5" text-anchor="middle" font-size="6" font-family="monospace" stroke="none" fill="currentColor">?</text>
          </svg>
        `;
      }

      const ariaProps = title
        ? `role="img" aria-label="${esc(title)}"`
        : `aria-hidden="true"`;

      return `
        <svg
          width="${esc(size)}"
          height="${esc(size)}"
          viewBox="0 0 24 24"
          fill="${esc(fill)}"
          stroke="${esc(stroke)}"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          ${ariaProps}
        >${title ? `<title>${esc(title)}</title>` : ""}${path}</svg>
      `;
    },
  }),
);

export { iconNames, ICONS };
export type { IconName } from "./icons.ts";

function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
