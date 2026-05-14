/**
 * Default light-theme tokens for `@ra9/tan-compose-kit`.
 *
 * This module injects a `<style>` tag into `document.head` defining the
 * kit's global semantic tokens on `:root`. Components reference these
 * tokens via `var(--tc-color-*, …)` with hardcoded fallbacks, so they
 * still render reasonably without this stylesheet loaded.
 *
 * Override at the page level by re-declaring any token on `:root` (or
 * any ancestor of your kit components):
 *
 *   :root {
 *     --tc-color-accent: #0d6efd;
 *     --tc-radius-md: 4px;
 *   }
 *
 * Or load one of the bundled presets:
 *
 *   import "@ra9/tan-compose-kit/themes/dark";
 *   import "@ra9/tan-compose-kit/themes/bootstrap";
 *   import "@ra9/tan-compose-kit/themes/tailwind";
 *
 * Importing this module is idempotent.
 */

export const tokensCss: string = `:root {
  /* color — surface */
  --tc-color-bg:           #faf8f3;
  --tc-color-surface:      #ffffff;
  --tc-color-surface-alt:  #faf8f3;

  /* color — ink */
  --tc-color-ink:          #14171f;
  --tc-color-ink-soft:     #4a5061;
  --tc-color-ink-muted:    #6b7280;

  /* color — rule */
  --tc-color-rule:         #ece5d3;
  --tc-color-rule-strong:  #d9cfb8;

  /* color — accent */
  --tc-color-accent:       #a16939;
  --tc-color-accent-hover: #8a572d;
  --tc-color-accent-soft:  #efe2cf;

  /* color — semantic */
  --tc-color-info-bg:      #dde6f4;
  --tc-color-info-fg:      #1f3a66;
  --tc-color-info:         #3a5b8c;
  --tc-color-success-bg:   #dbece2;
  --tc-color-success-fg:   #155b40;
  --tc-color-success:      #207a5b;
  --tc-color-warning-bg:   #f5e7cf;
  --tc-color-warning-fg:   #7a4f0a;
  --tc-color-warning:      #a87326;
  --tc-color-danger-bg:    #f4dad7;
  --tc-color-danger-fg:    #7a1a14;
  --tc-color-danger:       #b3261e;

  /* radius */
  --tc-radius-sm:  4px;
  --tc-radius-md:  8px;
  --tc-radius-lg:  12px;
  --tc-radius-pill: 999px;

  /* shadow — two-layer for depth. tuned so md is clearly elevated
     against the page bg without looking dramatic. */
  --tc-shadow-sm: 0 1px 2px rgba(20, 23, 31, 0.05), 0 1px 1px rgba(20, 23, 31, 0.03);
  --tc-shadow-md: 0 4px 12px rgba(20, 23, 31, 0.10), 0 2px 4px rgba(20, 23, 31, 0.06);
  --tc-shadow-lg: 0 18px 44px rgba(20, 23, 31, 0.16), 0 6px 14px rgba(20, 23, 31, 0.08);

  /* typography */
  --tc-font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --tc-font-mono: "JetBrains Mono", ui-monospace, "Cascadia Code", "Source Code Pro", monospace;

  /* spacing scale (used by layout primitives) */
  --tc-space-1: 4px;
  --tc-space-2: 8px;
  --tc-space-3: 12px;
  --tc-space-4: 16px;
  --tc-space-5: 24px;
  --tc-space-6: 32px;
  --tc-space-7: 48px;
  --tc-space-8: 64px;

  /* focus ring */
  --tc-focus-ring: 0 0 0 3px rgba(161, 105, 57, 0.18);
}
`;

let injected = false;

export function injectTokens(): void {
  if (typeof document === "undefined") return;
  if (injected) return;
  if (document.querySelector("style[data-tc-tokens]")) {
    injected = true;
    return;
  }
  const style = document.createElement("style");
  style.setAttribute("data-tc-tokens", "");
  style.textContent = tokensCss;
  // Insert at the top so other stylesheets can override.
  document.head.insertBefore(style, document.head.firstChild);
  injected = true;
}

injectTokens();
