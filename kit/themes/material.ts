/**
 * Material Design-flavored theme preset for `@ra9/tan-compose-kit`.
 *
 * Re-skins the kit using Material Design 3's Indigo/Tonal palette, with
 * the typical Material rounding and elevation. Drop in alongside any
 * Material-style host page and the kit will fit.
 *
 *   import "@ra9/tan-compose-kit/themes/material";
 */

import "./tokens.ts";

export const materialCss: string = `:root {
  /* color — accent: Material Indigo 500 / 700 / 50 */
  --tc-color-accent:       #3f51b5;
  --tc-color-accent-hover: #303f9f;
  --tc-color-accent-soft:  #e8eaf6;

  /* color — semantic: Material Design palette */
  --tc-color-info:         #1976d2;
  --tc-color-info-bg:      #e3f2fd;
  --tc-color-info-fg:      #0d47a1;
  --tc-color-success:      #2e7d32;
  --tc-color-success-bg:   #e8f5e9;
  --tc-color-success-fg:   #1b5e20;
  --tc-color-warning:      #f57c00;
  --tc-color-warning-bg:   #fff3e0;
  --tc-color-warning-fg:   #e65100;
  --tc-color-danger:       #d32f2f;
  --tc-color-danger-bg:    #ffebee;
  --tc-color-danger-fg:    #b71c1c;

  /* surface — Material's default neutral */
  --tc-color-bg:           #ffffff;
  --tc-color-surface:      #ffffff;
  --tc-color-surface-alt:  #f5f5f5;
  --tc-color-ink:          rgba(0, 0, 0, 0.87);
  --tc-color-ink-soft:     rgba(0, 0, 0, 0.60);
  --tc-color-ink-muted:    rgba(0, 0, 0, 0.42);
  --tc-color-rule:         #e0e0e0;
  --tc-color-rule-strong:  #bdbdbd;

  /* radius — Material 3 prefers larger pill rounding */
  --tc-radius-sm:  4px;
  --tc-radius-md:  8px;
  --tc-radius-lg:  16px;

  /* shadow — Material elevation 1, 2, 4 */
  --tc-shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  --tc-shadow-md: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  --tc-shadow-lg: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

  /* font — Material's default Roboto */
  --tc-font-sans: Roboto, system-ui, -apple-system, "Segoe UI", "Helvetica Neue", sans-serif;

  /* focus ring — Material accent at low alpha */
  --tc-focus-ring: 0 0 0 3px rgba(63, 81, 181, 0.24);
}
`;

let injected = false;

export function injectMaterial(): void {
  if (typeof document === "undefined") return;
  if (injected) return;
  if (document.querySelector("style[data-tc-theme='material']")) {
    injected = true;
    return;
  }
  const style = document.createElement("style");
  style.setAttribute("data-tc-theme", "material");
  style.textContent = materialCss;
  document.head.appendChild(style);
  injected = true;
}

injectMaterial();
