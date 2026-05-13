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
  /* color \u2014 accent: Material Indigo 500 / 700 / 50 */
  --tc-color-accent:       #3f51b5;
  --tc-color-accent-hover: #303f9f;
  --tc-color-accent-soft:  #e8eaf6;

  /* color \u2014 semantic: Material Design palette */
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

  /* surface \u2014 Material's default neutral */
  --tc-color-bg:           #ffffff;
  --tc-color-surface:      #ffffff;
  --tc-color-surface-alt:  #f5f5f5;
  --tc-color-ink:          rgba(0, 0, 0, 0.87);
  --tc-color-ink-soft:     rgba(0, 0, 0, 0.60);
  --tc-color-ink-muted:    rgba(0, 0, 0, 0.42);
  --tc-color-rule:         #e0e0e0;
  --tc-color-rule-strong:  #bdbdbd;

  /* radius \u2014 Material 3 prefers larger pill rounding */
  --tc-radius-sm:  4px;
  --tc-radius-md:  8px;
  --tc-radius-lg:  16px;

  /* shadow \u2014 Material elevation 1, 2, 4 */
  --tc-shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  --tc-shadow-md: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  --tc-shadow-lg: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

  /* font \u2014 Material's default Roboto */
  --tc-font-sans: Roboto, system-ui, -apple-system, "Segoe UI", "Helvetica Neue", sans-serif;

  /* focus ring \u2014 Material accent at low alpha */
  --tc-focus-ring: 0 0 0 3px rgba(63, 81, 181, 0.24);
}
`,o=!1;function s(){if(typeof document>"u"||o)return;if(document.querySelector("style[data-tc-theme='material']")){o=!0;return}let c=document.createElement("style");c.setAttribute("data-tc-theme","material"),c.textContent=a,document.head.appendChild(c),o=!0}s();export{s as injectMaterial,a as materialCss};
