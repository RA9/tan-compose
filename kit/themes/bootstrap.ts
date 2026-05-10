/**
 * Bootstrap-flavored theme preset for `@ra9/tan-compose-kit`.
 *
 * Re-skins the kit using Bootstrap 5's primary palette and radius. Drop
 * this in alongside Bootstrap and the kit's components will look like
 * they belong to your Bootstrap pages.
 *
 *   import "bootstrap/dist/css/bootstrap.min.css";
 *   import "@ra9/tan-compose-kit/themes/bootstrap";
 *
 * The kit components live in Shadow DOM so they don't fight Bootstrap's
 * global styles — this preset just changes their accent/radius/font to
 * match.
 */

import "./tokens.ts";

export const bootstrapCss: string = `:root {
  /* color — accent: Bootstrap primary */
  --tc-color-accent:       #0d6efd;
  --tc-color-accent-hover: #0b5ed7;
  --tc-color-accent-soft:  #cfe2ff;

  /* color — semantics: Bootstrap palette */
  --tc-color-info:         #0dcaf0;
  --tc-color-info-bg:      #cff4fc;
  --tc-color-info-fg:      #055160;
  --tc-color-success:      #198754;
  --tc-color-success-bg:   #d1e7dd;
  --tc-color-success-fg:   #0a3622;
  --tc-color-warning:      #ffc107;
  --tc-color-warning-bg:   #fff3cd;
  --tc-color-warning-fg:   #664d03;
  --tc-color-danger:       #dc3545;
  --tc-color-danger-bg:    #f8d7da;
  --tc-color-danger-fg:    #58151c;

  /* surface stays light by default; ink is Bootstrap's body color */
  --tc-color-bg:           #ffffff;
  --tc-color-surface:      #ffffff;
  --tc-color-surface-alt:  #f8f9fa;
  --tc-color-ink:          #212529;
  --tc-color-ink-soft:     #495057;
  --tc-color-ink-muted:    #6c757d;
  --tc-color-rule:         #dee2e6;
  --tc-color-rule-strong:  #ced4da;

  /* radius — Bootstrap defaults */
  --tc-radius-sm:  0.25rem;
  --tc-radius-md:  0.375rem;
  --tc-radius-lg:  0.5rem;

  /* font — Bootstrap's system stack */
  --tc-font-sans:
    system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue",
    "Noto Sans", "Liberation Sans", Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";

  /* focus ring — Bootstrap blue at 25% */
  --tc-focus-ring: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}
`;

let injected = false;

export function injectBootstrap(): void {
  if (typeof document === "undefined") return;
  if (injected) return;
  if (document.querySelector("style[data-tc-theme='bootstrap']")) {
    injected = true;
    return;
  }
  const style = document.createElement("style");
  style.setAttribute("data-tc-theme", "bootstrap");
  style.textContent = bootstrapCss;
  document.head.appendChild(style);
  injected = true;
}

injectBootstrap();
