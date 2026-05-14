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
`,t=!1;function r(){if(typeof document>"u"||t)return;if(document.querySelector("style[data-tc-tokens]")){t=!0;return}let c=document.createElement("style");c.setAttribute("data-tc-tokens",""),c.textContent=e,document.head.insertBefore(c,document.head.firstChild),t=!0}r();var s=`:root {
  /* color \u2014 accent: shadcn's primary (zinc-900 on light) */
  --tc-color-accent:       hsl(240, 5.9%, 10%);
  --tc-color-accent-hover: hsl(240, 5.2%, 33.9%);
  --tc-color-accent-soft:  hsl(240, 4.8%, 95.9%);

  /* color \u2014 semantic */
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

  /* surface \u2014 shadcn neutrals */
  --tc-color-bg:           hsl(0, 0%, 100%);
  --tc-color-surface:      hsl(0, 0%, 100%);
  --tc-color-surface-alt:  hsl(240, 4.8%, 95.9%);
  --tc-color-ink:          hsl(240, 10%, 3.9%);
  --tc-color-ink-soft:     hsl(240, 3.8%, 46.1%);
  --tc-color-ink-muted:    hsl(240, 4.4%, 56%);
  --tc-color-rule:         hsl(240, 5.9%, 90%);
  --tc-color-rule-strong:  hsl(240, 5.9%, 80%);

  /* radius \u2014 shadcn defaults to 0.5rem */
  --tc-radius-sm:  0.25rem;
  --tc-radius-md:  0.5rem;
  --tc-radius-lg:  0.75rem;

  /* shadow \u2014 flat, slightly soft */
  --tc-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --tc-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --tc-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);

  /* font \u2014 Inter / system */
  --tc-font-sans:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";

  /* focus ring \u2014 black ring */
  --tc-focus-ring: 0 0 0 2px hsl(0, 0%, 100%), 0 0 0 4px hsl(240, 10%, 3.9%);
}
`,o=!1;function a(){if(typeof document>"u"||o)return;if(document.querySelector("style[data-tc-theme='shadcn']")){o=!0;return}let c=document.createElement("style");c.setAttribute("data-tc-theme","shadcn"),c.textContent=s,document.head.appendChild(c),o=!0}a();export{a as injectShadcn,s as shadcnCss};
