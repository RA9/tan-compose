/**
 * `<tc-textarea>` — multi-line form-associated text input.
 *
 * Props:
 *   value        string (default "")
 *   name         string (default "")
 *   placeholder  string (default "")
 *   label        string (default "")
 *   helper       string (default "")
 *   error        string (default "")
 *   rows         number (default 4)
 *   disabled     boolean (default false, reflects)
 *   required     boolean (default false, reflects)
 *   resize       "none" | "vertical" | "horizontal" | "both" (default "vertical")
 *
 * Events:
 *   "tc-input"  detail: { value: string }
 *
 * Theme variables — shared with `<tc-input>` via the --tc-input-* tokens.
 */

import { build, describe, html, unsafe } from "@ra9/tan-compose";

const TAG = "tc-textarea";

export const tagName = TAG;

const STYLE = `
          :host { font-family: var(--tc-input-font); }
          .label {
            display: block; font-size: 0.82rem; font-weight: 600;
            color: var(--tc-input-fg); margin-bottom: 6px;
          }
          .req { color: var(--tc-input-error); margin-left: 2px; }
          .input {
            width: 100%; box-sizing: border-box;
            font: inherit; font-size: 0.95rem; line-height: 1.5;
            padding: 9px 12px;
            background: var(--tc-input-bg);
            color: var(--tc-input-fg);
            border: 1px solid var(--tc-input-border);
            border-radius: var(--tc-input-radius);
            outline: none;
            transition: border-color 0.15s ease, box-shadow 0.15s ease;
          }
          .input:focus {
            border-color: var(--tc-input-border-focus);
            box-shadow: var(--tc-focus-ring, 0 0 0 3px rgba(161, 105, 57, 0.18));
          }
          .input.invalid { border-color: var(--tc-input-error); }
          .input:disabled { opacity: 0.6; cursor: not-allowed; }
          .helper {
            margin-top: 6px; font-size: 0.78rem;
            color: var(--tc-input-helper);
          }
          .error {
            margin-top: 6px; font-size: 0.78rem;
            color: var(--tc-input-error);
          }
`;

build(
  TAG,
  describe({
    formAssociated: true,
    props: {
      value: { type: "string", default: "" },
      name: { type: "string", default: "" },
      placeholder: { type: "string", default: "" },
      label: { type: "string", default: "" },
      helper: { type: "string", default: "" },
      error: { type: "string", default: "" },
      rows: { type: "number", default: 4 },
      disabled: { type: "boolean", default: false, reflect: true },
      required: { type: "boolean", default: false, reflect: true },
      resize: { type: "string", default: "vertical" },
    },
    theme: {
      "tc-input-bg": "var(--tc-color-surface, #ffffff)",
      "tc-input-fg": "var(--tc-color-ink, #14171f)",
      "tc-input-border": "var(--tc-color-rule-strong, #d9cfb8)",
      "tc-input-border-focus": "var(--tc-color-accent, #a16939)",
      "tc-input-error": "var(--tc-color-danger, #b3261e)",
      "tc-input-helper": "var(--tc-color-ink-muted, #6b7280)",
      "tc-input-radius": "var(--tc-radius-md, 8px)",
      "tc-input-font":
        "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
    },
    styles: {
      display: "block",
    },
    stylesheet: STYLE,
    refs: {
      input: "textarea",
    },
    template: ({ props }) => {
      const showError = Boolean(props.error);
      return html`
        ${unsafe(
          props.label
            ? `<label class="label">${esc(props.label)}${
              props.required
                ? ' <span class="req" aria-hidden="true">*</span>'
                : ""
            }</label>`
            : "",
        )}
        <textarea
          class="input ${showError ? "invalid" : ""}"
          part="textarea"
          name="${props.name}"
          placeholder="${props.placeholder}"
          rows="${props.rows}"
          ${unsafe(props.disabled ? "disabled" : "")}
          ${unsafe(props.required ? "required" : "")}
          aria-invalid="${showError ? "true" : "false"}"
          style="resize: ${props.resize};"
        >${props.value}</textarea>
        ${unsafe(
          props.error || props.helper
            ? `<div class="${showError ? "error" : "helper"}">${
              esc(props.error || props.helper)
            }</div>`
            : "",
        )}
      `;
    },
    events: {
      "input textarea": (event, ctx) => {
        const next = (event.target as HTMLTextAreaElement).value;
        const host = ctx.host as HTMLElement & {
          value: string;
          internals?: ElementInternals;
        };
        host.internals?.setFormValue(next);
        host.value = next;
        ctx.emit("tc-input", { value: next });
      },
    },
    formResetCallback() {
      (this as unknown as { value: string }).value = "";
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
