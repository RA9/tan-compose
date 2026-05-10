/**
 * `<tc-cluster>` — horizontal layout primitive. Children flow left-to-right
 * with consistent spacing and wrap when they run out of room.
 *
 * Props:
 *   gap      "1"–"8" or any CSS length (default "3")
 *   justify  "start" | "center" | "end" | "between" | "around" (default "start")
 *   align    "stretch" | "start" | "center" | "end" | "baseline" (default "center")
 *   wrap     boolean (default true)
 *
 * Slot:
 *   default — children
 */

import { build, describe } from "@ra9/tan-compose";

const TAG = "tc-cluster";

export const tagName = TAG;

build(
  TAG,
  describe({
    props: {
      gap: { type: "string", default: "3" },
      justify: { type: "string", default: "start" },
      align: { type: "string", default: "center" },
      wrap: { type: "boolean", default: true },
    },
    styles: {
      display: "block",
    },
    template: ({ props }) => `
      <div class="cluster" style="
        --tc-cluster-gap: ${gapValue(props.gap)};
        --tc-cluster-justify: ${justifyValue(props.justify)};
        --tc-cluster-align: ${esc(props.align)};
        --tc-cluster-wrap: ${props.wrap ? "wrap" : "nowrap"};
      ">
        <slot></slot>
      </div>
      <style>
        .cluster {
          display: flex;
          flex-direction: row;
          gap: var(--tc-cluster-gap);
          justify-content: var(--tc-cluster-justify);
          align-items: var(--tc-cluster-align);
          flex-wrap: var(--tc-cluster-wrap);
        }
      </style>
    `,
  }),
);

function justifyValue(j: unknown): string {
  const s = String(j ?? "start").trim();
  switch (s) {
    case "between":
      return "space-between";
    case "around":
      return "space-around";
    case "evenly":
      return "space-evenly";
    default:
      return s;
  }
}

function gapValue(g: unknown): string {
  const s = String(g ?? "3").trim();
  if (/^[1-8]$/.test(s)) return `var(--tc-space-${s}, ${defaultSpace(s)})`;
  return s;
}

function defaultSpace(n: string): string {
  const map: Record<string, string> = {
    "1": "4px",
    "2": "8px",
    "3": "12px",
    "4": "16px",
    "5": "24px",
    "6": "32px",
    "7": "48px",
    "8": "64px",
  };
  return map[n] ?? "12px";
}

function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
