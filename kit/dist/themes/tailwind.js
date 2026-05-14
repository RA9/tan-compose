var e=`:root {
  /* color \u2014 surface */
  --tc-color-bg:           #faf8f3;
  --tc-color-surface:      #ffffff;
  --tc-color-surface-alt:  #faf8f3;

  /* color \u2014 ink */
  --tc-color-ink:          #14171f;
  --tc-color-ink-soft:     #4a5061;
  --tc-color-ink-muted:    #6b7280;

  /* color \u2014 rule */
  --tc-color-rule:         #ece5d3;
  --tc-color-rule-strong:  #d9cfb8;

  /* color \u2014 accent */
  --tc-color-accent:       #a16939;
  --tc-color-accent-hover: #8a572d;
  --tc-color-accent-soft:  #efe2cf;

  /* color \u2014 semantic */
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

  /* shadow \u2014 two-layer for depth. tuned so md is clearly elevated
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
`,c=!1;function r(){if(typeof document>"u"||c)return;if(document.querySelector("style[data-tc-tokens]")){c=!0;return}let t=document.createElement("style");t.setAttribute("data-tc-tokens",""),t.textContent=e,document.head.insertBefore(t,document.head.firstChild),c=!0}r();var a=`:root {
  /* color \u2014 accent: indigo-500 / 600 / 100 */
  --tc-color-accent:       rgb(99 102 241);
  --tc-color-accent-hover: rgb(79 70 229);
  --tc-color-accent-soft:  rgb(224 231 255);

  /* color \u2014 semantics: Tailwind palette */
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

  /* surface \u2014 Tailwind slate */
  --tc-color-bg:           rgb(248 250 252); /* slate-50 */
  --tc-color-surface:      rgb(255 255 255);
  --tc-color-surface-alt:  rgb(241 245 249); /* slate-100 */
  --tc-color-ink:          rgb(15 23 42);    /* slate-900 */
  --tc-color-ink-soft:     rgb(51 65 85);    /* slate-700 */
  --tc-color-ink-muted:    rgb(100 116 139); /* slate-500 */
  --tc-color-rule:         rgb(226 232 240); /* slate-200 */
  --tc-color-rule-strong:  rgb(203 213 225); /* slate-300 */

  /* radius \u2014 Tailwind defaults */
  --tc-radius-sm:  0.25rem;
  --tc-radius-md:  0.375rem;
  --tc-radius-lg:  0.5rem;

  /* font \u2014 Tailwind's font-sans default */
  --tc-font-sans:
    ui-sans-serif, system-ui, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";

  /* focus ring \u2014 indigo-500 at 25% */
  --tc-focus-ring: 0 0 0 3px rgba(99, 102, 241, 0.4);
}
`,o=!1;function n(){if(typeof document>"u"||o)return;if(document.querySelector("style[data-tc-theme='tailwind']")){o=!0;return}let t=document.createElement("style");t.setAttribute("data-tc-theme","tailwind"),t.textContent=a,document.head.appendChild(t),o=!0}n();export{n as injectTailwind,a as tailwindCss};
