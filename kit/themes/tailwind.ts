/**
 * Tailwind-flavored theme preset for `@ra9/tan-compose-kit`.
 *
 * Re-skins the kit using Tailwind's slate/indigo palette. Drop this in
 * alongside Tailwind and the kit's components will fit alongside your
 * utility-class markup.
 *
 *   import "@ra9/tan-compose-kit/themes/tailwind";
 *
 * Like all kit themes, this just sets CSS custom properties — Tailwind's
 * utilities never touch the kit's Shadow DOM.
 */

import "./tokens.ts";

export const tailwindCss: string = `:root {
  /* color — accent: indigo-500 / 600 / 100 */
  --tc-color-accent:       rgb(99 102 241);
  --tc-color-accent-hover: rgb(79 70 229);
  --tc-color-accent-soft:  rgb(224 231 255);

  /* color — semantics: Tailwind palette */
  --tc-color-info:         rgb(59 130 246);  /* blue-500 */
  --tc-color-info-bg:      rgb(219 234 254); /* blue-100 */
  --tc-color-info-fg:      rgb(30 64 175);   /* blue-800 */
  --tc-color-success:      rgb(34 197 94);   /* green-500 */
  --tc-color-success-bg:   rgb(220 252 231); /* green-100 */
  --tc-color-success-fg:   rgb(22 101 52);   /* green-800 */
  --tc-color-warning:      rgb(245 158 11);  /* amber-500 */
  --tc-color-warning-bg:   rgb(254 243 199); /* amber-100 */
  --tc-color-warning-fg:   rgb(146 64 14);   /* amber-800 */
  --tc-color-danger:       rgb(239 68 68);   /* red-500 */
  --tc-color-danger-bg:    rgb(254 226 226); /* red-100 */
  --tc-color-danger-fg:    rgb(153 27 27);   /* red-800 */

  /* surface — Tailwind slate */
  --tc-color-bg:           rgb(248 250 252); /* slate-50 */
  --tc-color-surface:      rgb(255 255 255);
  --tc-color-surface-alt:  rgb(241 245 249); /* slate-100 */
  --tc-color-ink:          rgb(15 23 42);    /* slate-900 */
  --tc-color-ink-soft:     rgb(51 65 85);    /* slate-700 */
  --tc-color-ink-muted:    rgb(100 116 139); /* slate-500 */
  --tc-color-rule:         rgb(226 232 240); /* slate-200 */
  --tc-color-rule-strong:  rgb(203 213 225); /* slate-300 */

  /* radius — Tailwind defaults */
  --tc-radius-sm:  0.25rem;
  --tc-radius-md:  0.375rem;
  --tc-radius-lg:  0.5rem;

  /* font — Tailwind's font-sans default */
  --tc-font-sans:
    ui-sans-serif, system-ui, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";

  /* focus ring — indigo-500 at 25% */
  --tc-focus-ring: 0 0 0 3px rgba(99, 102, 241, 0.4);
}
`;

let injected = false;

export function injectTailwind(): void {
  if (typeof document === "undefined") return;
  if (injected) return;
  if (document.querySelector("style[data-tc-theme='tailwind']")) {
    injected = true;
    return;
  }
  const style = document.createElement("style");
  style.setAttribute("data-tc-theme", "tailwind");
  style.textContent = tailwindCss;
  document.head.appendChild(style);
  injected = true;
}

injectTailwind();
