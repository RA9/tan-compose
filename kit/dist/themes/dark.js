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

  /* shadow */
  --tc-shadow-sm: 0 1px 2px rgba(20, 23, 31, 0.04);
  --tc-shadow-md: 0 8px 24px rgba(20, 23, 31, 0.06);
  --tc-shadow-lg: 0 24px 60px rgba(20, 23, 31, 0.18);

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
`,t=!1;function r(){if(typeof document>"u"||t)return;if(document.querySelector("style[data-tc-tokens]")){t=!0;return}let c=document.createElement("style");c.setAttribute("data-tc-tokens",""),c.textContent=e,document.head.insertBefore(c,document.head.firstChild),t=!0}r();var a=`:root {
  /* surface \u2014 invert into dark */
  --tc-color-bg:           #0f1218;
  --tc-color-surface:      #1a1d29;
  --tc-color-surface-alt:  #14171f;

  /* ink \u2014 invert */
  --tc-color-ink:          #f5f0e6;
  --tc-color-ink-soft:     #b9b1a1;
  --tc-color-ink-muted:    #8a8678;

  /* rule \u2014 keep low contrast in dark */
  --tc-color-rule:         #2a2f3d;
  --tc-color-rule-strong:  #3a4053;

  /* accent stays warm tan; brighten the soft variant */
  --tc-color-accent:       #d49a68;
  --tc-color-accent-hover: #e5b489;
  --tc-color-accent-soft:  #3d2c1e;

  /* semantics \u2014 slight darkening of surfaces, lift fg */
  --tc-color-info-bg:      #1f2c44;
  --tc-color-info-fg:      #a8c4f0;
  --tc-color-success-bg:   #1a3329;
  --tc-color-success-fg:   #84d4ad;
  --tc-color-warning-bg:   #3a2e16;
  --tc-color-warning-fg:   #f0c878;
  --tc-color-danger-bg:    #3a1f1c;
  --tc-color-danger-fg:    #f08a7e;

  /* shadow \u2014 sharper, since dark surfaces don't need depth */
  --tc-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
  --tc-shadow-md: 0 8px 24px rgba(0, 0, 0, 0.4);
  --tc-shadow-lg: 0 24px 60px rgba(0, 0, 0, 0.5);

  /* focus ring \u2014 match new accent */
  --tc-focus-ring: 0 0 0 3px rgba(212, 154, 104, 0.28);
}
`,o=!1;function n(){if(typeof document>"u"||o)return;if(document.querySelector("style[data-tc-theme='dark']")){o=!0;return}let c=document.createElement("style");c.setAttribute("data-tc-theme","dark"),c.textContent=a,document.head.appendChild(c),o=!0}n();export{a as darkCss,n as injectDark};
