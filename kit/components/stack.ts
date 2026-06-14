/**
 * `<tc-stack>` — vertical layout primitive. Children flow top-to-bottom
 * with consistent spacing.
 *
 * Props:
 *   gap     "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8"  (default "4")
 *           Maps to --tc-space-N. You can also pass a raw CSS length.
 *   align   "stretch" | "start" | "center" | "end" (default "stretch")
 *
 * Slot:
 *   default — children
 */

import { build, describe, html } from "@ra9/tan-compose";

const TAG = "tc-stack";

export const tagName = TAG;

const STYLE = `
  .stack {
    display: flex;
    flex-direction: column;
    gap: var(--tc-stack-gap);
    align-items: var(--tc-stack-align);
  }
`;

build(
  TAG,
  describe({
    props: {
      gap: { type: "string", default: "4" },
      align: { type: "string", default: "stretch" },
    },
    styles: {
      display: "block",
    },
    stylesheet: STYLE,
    template: ({ props }) =>
      html`
        <div
          class="stack"
          style="--tc-stack-gap: ${gapValue(
            props.gap,
          )}; --tc-stack-align: ${props.align};"
        >
          <slot></slot>
        </div>
      `,
  }),
);

function gapValue(g: unknown): string {
  const s = String(g ?? "4").trim();
  // numeric scale token → use --tc-space-N
  if (/^[1-8]$/.test(s)) return `var(--tc-space-${s}, ${defaultSpace(s)})`;
  // raw CSS length passed through
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
  return map[n] ?? "16px";
}
