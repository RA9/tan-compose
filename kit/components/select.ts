/**
 * `<tc-select>` — form-associated select wrapping a native `<select>`.
 * Submits with `<form>`, supports the validity API, and styles to match
 * `<tc-input>`.
 *
 * Props:
 *   value        string (default "")
 *   name         string (default "")
 *   options      JSON Array<{ value: string; label: string; disabled?: boolean }>
 *   placeholder  string (default "") — when set, prepends a disabled empty option
 *   label        string (default "")
 *   helper       string (default "")
 *   error        string (default "")
 *   disabled     boolean (default false, reflects)
 *   required     boolean (default false, reflects)
 *
 * Events:
 *   "tc-change"  detail: { value: string }
 *
 * Theme variables share the input's --tc-input-* tokens for consistency.
 */

import { build, describe, html, unsafe } from "@ra9/tan-compose";

const TAG = "tc-select";

export const tagName = TAG;

interface OptionDef {
  value: string;
  label: string;
  disabled?: boolean;
}

const STYLE = `
          :host { font-family: var(--tc-input-font); }
          .label {
            display: block; font-size: 0.82rem; font-weight: 600;
            color: var(--tc-input-fg); margin-bottom: 6px;
          }
          .req { color: var(--tc-input-error); margin-left: 2px; }
          .wrap { position: relative; }
          .select {
            width: 100%; box-sizing: border-box;
            font: inherit; font-size: 0.95rem;
            padding: 9px 36px 9px 12px;
            background: var(--tc-input-bg);
            color: var(--tc-input-fg);
            border: 1px solid var(--tc-input-border);
            border-radius: var(--tc-input-radius);
            outline: none;
            appearance: none; -webkit-appearance: none; -moz-appearance: none;
            cursor: pointer;
          }
          .select:focus {
            border-color: var(--tc-input-border-focus);
            box-shadow: var(--tc-focus-ring, 0 0 0 3px rgba(161, 105, 57, 0.18));
          }
          .select.invalid { border-color: var(--tc-input-error); }
          .select:disabled { opacity: 0.6; cursor: not-allowed; }
          .caret {
            position: absolute; right: 12px; top: 50%;
            transform: translateY(-50%);
            color: var(--tc-input-helper);
            pointer-events: none;
            font-size: 0.85rem;
          }
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
      options: { type: "json", default: [] },
      placeholder: { type: "string", default: "" },
      label: { type: "string", default: "" },
      helper: { type: "string", default: "" },
      error: { type: "string", default: "" },
      disabled: { type: "boolean", default: false, reflect: true },
      required: { type: "boolean", default: false, reflect: true },
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
    template: ({ props }) => {
      const opts = (props.options as OptionDef[] | undefined) ?? [];
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
        <div class="wrap">
          <select
            class="select ${showError ? "invalid" : ""}"
            part="select"
            name="${props.name}"
            ${unsafe(props.disabled ? "disabled" : "")}
            ${unsafe(props.required ? "required" : "")}
            aria-invalid="${showError ? "true" : "false"}"
          >
            ${unsafe(
              props.placeholder
                ? `<option value="" disabled ${
                  props.value === "" ? "selected" : ""
                }>${esc(props.placeholder)}</option>`
                : "",
            )} ${unsafe(
              opts.map((o) =>
                `<option value="${esc(o.value)}"${
                  o.disabled ? " disabled" : ""
                }${o.value === props.value ? " selected" : ""}>${
                  esc(o.label)
                }</option>`
              ).join(""),
            )}
          </select>
          <span class="caret" aria-hidden="true">▾</span>
        </div>
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
      "change select": (event, ctx) => {
        const next = (event.target as HTMLSelectElement).value;
        const host = ctx.host as HTMLElement & {
          value: string;
          internals?: ElementInternals;
        };
        host.internals?.setFormValue(next);
        host.value = next;
        ctx.emit("tc-change", { value: next });
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
