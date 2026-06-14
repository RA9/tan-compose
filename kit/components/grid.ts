/**
 * `<tc-grid>` — auto-fit grid layout primitive.
 *
 * Props:
 *   min      minimum column width (CSS length, default "260px")
 *   gap      "1"–"8" or any CSS length (default "4")
 *   columns  fixed column count override; ignores `min` when set (default "")
 *
 * Slot:
 *   default — children
 */

import { build, describe, escapeHtml, html, unsafe } from "@ra9/tan-compose";

const TAG = "tc-grid";

export const tagName = TAG;

const STYLE = `
  .grid {
    display: grid;
    grid-template-columns: var(--tc-grid-template);
    gap: var(--tc-grid-gap);
  }
`;

build(
  TAG,
  describe({
    props: {
      min: { type: "string", default: "260px" },
      gap: { type: "string", default: "4" },
      columns: { type: "string", default: "" },
    },
    styles: {
      display: "block",
    },
    stylesheet: STYLE,
    template: ({ props }) => {
      const cols = String(props.columns ?? "").trim();
      const template = cols
        ? `repeat(${escapeHtml(cols)}, minmax(0, 1fr))`
        : `repeat(auto-fit, minmax(${escapeHtml(props.min)}, 1fr))`;
      return html`
        <div
          class="grid"
          style="--tc-grid-template: ${unsafe(template)};
            --tc-grid-gap: ${gapValue(props.gap)};"
          >
            <slot></slot>
          </div>
        `;
      },
    }),
  );

  function gapValue(g: unknown): string {
    const s = String(g ?? "4").trim();
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
    return map[n] ?? "16px";
  }
