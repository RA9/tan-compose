/**
 * `<tc-code>` — styled code block with optional copy button.
 *
 * The component itself does NOT highlight syntax — it provides the dark
 * monospace surface, scroll, optional language label, and an optional
 * copy-to-clipboard button. To highlight, pre-tokenize your code with
 * the kit's classes:
 *
 *   <tc-code language="ts" copy>
 *     <span class="tc-kw">const</span> x = <span class="tc-str">"hi"</span>;
 *     <span class="tc-com">// a comment</span>
 *   </tc-code>
 *
 * The tc-* class names match the rest of the site's blog/docs CSS so
 * existing markup migrates with a search-and-replace.
 *
 * Props:
 *   language    string  optional — shown as a small label in the corner
 *   copy        boolean default false — render a copy button
 *   filename    string  optional — shown in the corner instead of language
 *
 * Slot:
 *   default     code content (pre-tokenized HTML or plain text)
 *
 * Events:
 *   "tc-copy"   detail: { text: string }  — fired after a successful copy
 *
 * Theme variables:
 *   --tc-code-bg, --tc-code-ink, --tc-code-rule, --tc-code-label,
 *   --tc-code-radius, --tc-code-font, --tc-code-padding,
 *   --tc-code-kw, --tc-code-str, --tc-code-com, --tc-code-num, --tc-code-tag
 */

import { build, describe } from "@ra9/tan-compose";

const TAG = "tc-code";

export const tagName = TAG;

// Declared BEFORE build() — see kit/components/button.ts:33-38 for why.
// (esbuild minify converts these to `var`, hoisted but undefined when
// the synchronous customElements.define() upgrade runs the template.)
const COPY_SVG =
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
const CHECK_SVG =
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

build(
  TAG,
  describe({
    props: {
      language: { type: "string", default: "" },
      copy: { type: "boolean", default: false },
      filename: { type: "string", default: "" },
    },
    theme: {
      "tc-code-bg": "var(--tc-code-bg-base, #14171f)",
      "tc-code-ink": "var(--tc-code-ink-base, #efe6d4)",
      "tc-code-rule": "var(--tc-code-rule-base, rgba(255,255,255,0.08))",
      "tc-code-label": "var(--tc-code-label-base, #8a8678)",
      "tc-code-radius": "var(--tc-radius-md, 10px)",
      "tc-code-font":
        "var(--tc-font-mono, 'JetBrains Mono', ui-monospace, monospace)",
      "tc-code-padding": "var(--tc-space-5, 20px) var(--tc-space-5, 20px)",
      "tc-code-kw": "var(--tc-code-kw-base, #f0a878)",
      "tc-code-str": "var(--tc-code-str-base, #d9b380)",
      "tc-code-com": "var(--tc-code-com-base, #8a8678)",
      "tc-code-num": "var(--tc-code-num-base, #c4d3b8)",
      "tc-code-tag": "var(--tc-code-tag-base, #d49a68)",
    },
    styles: {
      display: "block",
    },
    template: ({ props, state }) => {
      const label = props.filename || props.language || "";
      const copied = state.copied === true;
      return `
        <div class="block">
          ${
        label || props.copy
          ? `
            <header class="bar">
              <span class="label">${esc(label)}</span>
              ${
            props.copy
              ? `<button type="button" class="copy" aria-label="Copy code">
                    <span class="copy-icon" aria-hidden="true">${
                copied ? CHECK_SVG : COPY_SVG
              }</span>
                    <span class="copy-text">${copied ? "Copied" : "Copy"}</span>
                  </button>`
              : ""
          }
            </header>
          `
          : ""
      }
          <pre><code class="code lang-${
        esc(String(props.language || "txt"))
      }"><slot></slot></code></pre>
        </div>
        <style>
          :host { display: block; }
          .block {
            background: var(--tc-code-bg);
            color: var(--tc-code-ink);
            border-radius: var(--tc-code-radius);
            font-family: var(--tc-code-font);
            font-size: 0.84rem;
            line-height: 1.7;
            overflow: hidden;
          }
          .bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 14px;
            border-bottom: 1px solid var(--tc-code-rule);
            font-size: 0.74rem;
          }
          .label {
            color: var(--tc-code-label);
            font-family: var(--tc-code-font);
            text-transform: lowercase;
            letter-spacing: 0.04em;
          }
          .copy {
            font: inherit; font-size: 0.78rem;
            display: inline-flex; align-items: center; gap: 6px;
            background: transparent;
            color: var(--tc-code-label);
            border: 1px solid transparent;
            border-radius: 6px;
            padding: 4px 8px;
            cursor: pointer;
            transition: color 0.15s ease, background 0.15s ease, border-color 0.15s ease;
          }
          .copy:hover {
            color: var(--tc-code-ink);
            background: rgba(255, 255, 255, 0.04);
            border-color: var(--tc-code-rule);
          }
          .copy-icon { display: inline-flex; }
          .copy-icon svg { width: 13px; height: 13px; }
          pre {
            margin: 0;
            padding: var(--tc-code-padding);
            overflow-x: auto;
            font-family: inherit;
          }
          code { font-family: inherit; }
          /* Syntax-highlight classes for pre-tokenized code. The slot
             projects the user's nodes; they keep their light-DOM classes
             but inherit our colors via the parts protocol below. */
          ::slotted(.tc-kw)  { color: var(--tc-code-kw); }
          ::slotted(.tc-str) { color: var(--tc-code-str); }
          ::slotted(.tc-com) { color: var(--tc-code-com); font-style: italic; }
          ::slotted(.tc-num) { color: var(--tc-code-num); }
          ::slotted(.tc-tag) { color: var(--tc-code-tag); }
        </style>
      `;
    },
    events: {
      "click .copy": (_e, ctx) => {
        const host = ctx.host;
        const slot = host.shadowRoot?.querySelector("slot");
        const nodes = slot
          ? slot.assignedNodes({ flatten: true })
          : Array.from(host.childNodes);
        const text = nodes.map((n) => n.textContent ?? "").join("");
        const finalize = () => {
          ctx.setState("copied", true);
          ctx.emit("tc-copy", { text });
          setTimeout(() => ctx.setState("copied", false), 1600);
        };
        if (navigator.clipboard?.writeText) {
          navigator.clipboard.writeText(text).then(finalize, finalize);
        } else {
          finalize();
        }
      },
    },
  }),
);

function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
