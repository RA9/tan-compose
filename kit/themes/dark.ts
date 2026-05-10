/**
 * Dark-mode theme preset for `@ra9/tan-compose-kit`.
 *
 * Imports the base tokens and then layers dark surface + ink overrides.
 * Pair with a media query if you only want it under
 * `prefers-color-scheme: dark`:
 *
 *   <link rel="stylesheet" media="(prefers-color-scheme: dark)" href="…/dark.css">
 *
 * Or use unconditionally:
 *
 *   import "@ra9/tan-compose-kit/themes/dark";
 */

import "./tokens.ts";

export const darkCss: string = `:root {
  /* surface — invert into dark */
  --tc-color-bg:           #0f1218;
  --tc-color-surface:      #1a1d29;
  --tc-color-surface-alt:  #14171f;

  /* ink — invert */
  --tc-color-ink:          #f5f0e6;
  --tc-color-ink-soft:     #b9b1a1;
  --tc-color-ink-muted:    #8a8678;

  /* rule — keep low contrast in dark */
  --tc-color-rule:         #2a2f3d;
  --tc-color-rule-strong:  #3a4053;

  /* accent stays warm tan; brighten the soft variant */
  --tc-color-accent:       #d49a68;
  --tc-color-accent-hover: #e5b489;
  --tc-color-accent-soft:  #3d2c1e;

  /* semantics — slight darkening of surfaces, lift fg */
  --tc-color-info-bg:      #1f2c44;
  --tc-color-info-fg:      #a8c4f0;
  --tc-color-success-bg:   #1a3329;
  --tc-color-success-fg:   #84d4ad;
  --tc-color-warning-bg:   #3a2e16;
  --tc-color-warning-fg:   #f0c878;
  --tc-color-danger-bg:    #3a1f1c;
  --tc-color-danger-fg:    #f08a7e;

  /* shadow — sharper, since dark surfaces don't need depth */
  --tc-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
  --tc-shadow-md: 0 8px 24px rgba(0, 0, 0, 0.4);
  --tc-shadow-lg: 0 24px 60px rgba(0, 0, 0, 0.5);

  /* focus ring — match new accent */
  --tc-focus-ring: 0 0 0 3px rgba(212, 154, 104, 0.28);
}
`;

let injected = false;

export function injectDark(): void {
  if (typeof document === "undefined") return;
  if (injected) return;
  if (document.querySelector("style[data-tc-theme='dark']")) {
    injected = true;
    return;
  }
  const style = document.createElement("style");
  style.setAttribute("data-tc-theme", "dark");
  style.textContent = darkCss;
  document.head.appendChild(style);
  injected = true;
}

injectDark();
