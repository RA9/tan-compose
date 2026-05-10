/**
 * shadcn-flavored theme preset for `@ra9/tan-compose-kit`.
 *
 * Re-skins the kit using shadcn/ui's neutral palette and tighter radii.
 * Drop in alongside a shadcn-styled page (or just to get the look) and
 * the kit's components will look like they belong.
 *
 *   import "@ra9/tan-compose-kit/themes/shadcn";
 */

import "./tokens.ts";

export const shadcnCss: string = `:root {
  /* color — accent: shadcn's primary (zinc-900 on light) */
  --tc-color-accent:       hsl(240, 5.9%, 10%);
  --tc-color-accent-hover: hsl(240, 5.2%, 33.9%);
  --tc-color-accent-soft:  hsl(240, 4.8%, 95.9%);

  /* color — semantic */
  --tc-color-info:         hsl(221.2, 83.2%, 53.3%);
  --tc-color-info-bg:      hsl(214, 100%, 96.5%);
  --tc-color-info-fg:      hsl(224, 71.4%, 4.1%);
  --tc-color-success:      hsl(142.1, 76.2%, 36.3%);
  --tc-color-success-bg:   hsl(138, 76%, 96.7%);
  --tc-color-success-fg:   hsl(140.4, 84.2%, 14.5%);
  --tc-color-warning:      hsl(32.1, 94.6%, 43.7%);
  --tc-color-warning-bg:   hsl(48, 96.5%, 88.8%);
  --tc-color-warning-fg:   hsl(15.5, 86.3%, 30.4%);
  --tc-color-danger:       hsl(0, 84.2%, 60.2%);
  --tc-color-danger-bg:    hsl(0, 93%, 94.1%);
  --tc-color-danger-fg:    hsl(0, 70%, 35.3%);

  /* surface — shadcn neutrals */
  --tc-color-bg:           hsl(0, 0%, 100%);
  --tc-color-surface:      hsl(0, 0%, 100%);
  --tc-color-surface-alt:  hsl(240, 4.8%, 95.9%);
  --tc-color-ink:          hsl(240, 10%, 3.9%);
  --tc-color-ink-soft:     hsl(240, 3.8%, 46.1%);
  --tc-color-ink-muted:    hsl(240, 4.4%, 56%);
  --tc-color-rule:         hsl(240, 5.9%, 90%);
  --tc-color-rule-strong:  hsl(240, 5.9%, 80%);

  /* radius — shadcn defaults to 0.5rem */
  --tc-radius-sm:  0.25rem;
  --tc-radius-md:  0.5rem;
  --tc-radius-lg:  0.75rem;

  /* shadow — flat, slightly soft */
  --tc-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --tc-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --tc-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);

  /* font — Inter / system */
  --tc-font-sans:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";

  /* focus ring — black ring */
  --tc-focus-ring: 0 0 0 2px hsl(0, 0%, 100%), 0 0 0 4px hsl(240, 10%, 3.9%);
}
`;

let injected = false;

export function injectShadcn(): void {
  if (typeof document === "undefined") return;
  if (injected) return;
  if (document.querySelector("style[data-tc-theme='shadcn']")) {
    injected = true;
    return;
  }
  const style = document.createElement("style");
  style.setAttribute("data-tc-theme", "shadcn");
  style.textContent = shadcnCss;
  document.head.appendChild(style);
  injected = true;
}

injectShadcn();
