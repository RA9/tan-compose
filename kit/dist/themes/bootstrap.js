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
`,t=!1;function r(){if(typeof document>"u"||t)return;if(document.querySelector("style[data-tc-tokens]")){t=!0;return}let o=document.createElement("style");o.setAttribute("data-tc-tokens",""),o.textContent=e,document.head.insertBefore(o,document.head.firstChild),t=!0}r();var a=`:root {
  /* color \u2014 accent: Bootstrap primary */
  --tc-color-accent:       #0d6efd;
  --tc-color-accent-hover: #0b5ed7;
  --tc-color-accent-soft:  #cfe2ff;

  /* color \u2014 semantics: Bootstrap palette */
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

  /* radius \u2014 Bootstrap defaults */
  --tc-radius-sm:  0.25rem;
  --tc-radius-md:  0.375rem;
  --tc-radius-lg:  0.5rem;

  /* font \u2014 Bootstrap's system stack */
  --tc-font-sans:
    system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue",
    "Noto Sans", "Liberation Sans", Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";

  /* focus ring \u2014 Bootstrap blue at 25% */
  --tc-focus-ring: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}
`,c=!1;function s(){if(typeof document>"u"||c)return;if(document.querySelector("style[data-tc-theme='bootstrap']")){c=!0;return}let o=document.createElement("style");o.setAttribute("data-tc-theme","bootstrap"),o.textContent=a,document.head.appendChild(o),c=!0}s();export{a as bootstrapCss,s as injectBootstrap};
