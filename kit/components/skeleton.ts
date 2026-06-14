/**
 * `<tc-skeleton>` — shimmering placeholder shown while content is loading.
 *
 * Props:
 *   width    string (default "100%") — CSS length
 *   height   string (default "1em")  — CSS length
 *   rounded  boolean (default false) — circle (good for avatars)
 *   pulse    boolean (default true)  — animate the shimmer
 *
 * Theme variables on :host:
 *   --tc-skeleton-base, --tc-skeleton-shine, --tc-skeleton-radius
 */

import { build, describe, html } from "@ra9/tan-compose";

const TAG = "tc-skeleton";

export const tagName = TAG;

const STYLE = `
  .bone {
    display: inline-block;
    background: var(--tc-skeleton-base);
    border-radius: var(--tc-skeleton-radius);
    position: relative; overflow: hidden;
  }
  .bone.round { border-radius: 50%; }
  .bone.pulse::after {
    content: "";
    position: absolute; inset: 0;
    background: linear-gradient(
      90deg,
      transparent,
      var(--tc-skeleton-shine),
      transparent
    );
    transform: translateX(-100%);
    animation: tc-shimmer 1.4s infinite;
  }
  @keyframes tc-shimmer {
    to { transform: translateX(100%); }
  }
  @media (prefers-reduced-motion: reduce) {
    .bone.pulse::after { animation: none; opacity: 0.4; }
  }
`;

build(
  TAG,
  describe({
    props: {
      width: { type: "string", default: "100%" },
      height: { type: "string", default: "1em" },
      rounded: { type: "boolean", default: false },
      pulse: { type: "boolean", default: true },
    },
    theme: {
      "tc-skeleton-base": "var(--tc-color-rule, #ece5d3)",
      "tc-skeleton-shine": "rgba(255, 255, 255, 0.6)",
      "tc-skeleton-radius": "var(--tc-radius-md, 6px)",
    },
    styles: {
      display: "inline-block",
      "vertical-align": "middle",
    },
    stylesheet: STYLE,
    template: ({ props }) =>
      html`
        <span
          class="bone ${props.pulse ? "pulse" : ""} ${props.rounded
            ? "round"
            : ""}"
          aria-hidden="true"
          style="width: ${props.width}; height: ${props.height};"
        ></span>
      `,
  }),
);
