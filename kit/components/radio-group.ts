/**
 * `<tc-radio-group>` — form-associated single-choice control. Renders
 * radio options from a JSON array; manages selection internally.
 *
 * Props:
 *   value      string (default "")
 *   name       string (default "")
 *   options    JSON Array<{ value: string; label: string; disabled?: boolean }>
 *   label      string (default "")
 *   helper     string (default "")
 *   error      string (default "")
 *   layout     "vertical" | "horizontal" (default "vertical")
 *   disabled   boolean (default false, reflects)
 *   required   boolean (default false, reflects)
 *
 * Events:
 *   "tc-change"  detail: { value: string }
 *
 * Theme variables share the input's --tc-input-* tokens plus the accent.
 */

import { build, describe, html, unsafe } from "@ra9/tan-compose";

const TAG = "tc-radio-group";

export const tagName = TAG;

interface OptionDef {
  value: string;
  label: string;
  disabled?: boolean;
}

const STYLE = `
          :host { font-family: var(--tc-input-font); color: var(--tc-input-fg); }
          .group {
            border: none; padding: 0; margin: 0;
          }
          .legend {
            font-size: 0.82rem; font-weight: 600;
            color: var(--tc-input-fg); margin-bottom: 8px;
            padding: 0;
          }
          .req { color: var(--tc-input-error); margin-left: 2px; }
          .opts.l-vertical { display: flex; flex-direction: column; gap: 8px; }
          .opts.l-horizontal { display: flex; flex-direction: row; gap: 16px; flex-wrap: wrap; }
          .opt {
            display: inline-flex; align-items: center; gap: 8px;
            cursor: pointer; user-select: none;
            font-size: 0.95rem;
          }
          .opt.is-disabled { cursor: not-allowed; opacity: 0.6; }
          .r {
            width: 16px; height: 16px;
            margin: 0;
            accent-color: var(--tc-radio-accent);
            cursor: inherit;
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
      label: { type: "string", default: "" },
      helper: { type: "string", default: "" },
      error: { type: "string", default: "" },
      layout: { type: "string", default: "vertical" },
      disabled: { type: "boolean", default: false, reflect: true },
      required: { type: "boolean", default: false, reflect: true },
    },
    theme: {
      "tc-input-fg": "var(--tc-color-ink, #14171f)",
      "tc-input-border": "var(--tc-color-rule-strong, #d9cfb8)",
      "tc-input-error": "var(--tc-color-danger, #b3261e)",
      "tc-input-helper": "var(--tc-color-ink-muted, #6b7280)",
      "tc-input-font":
        "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
      "tc-radio-accent": "var(--tc-color-accent, #a16939)",
    },
    styles: {
      display: "block",
    },
    stylesheet: STYLE,
    template: ({ props }) => {
      const opts = (props.options as OptionDef[] | undefined) ?? [];
      const showError = Boolean(props.error);
      const layout = String(props.layout ?? "vertical");
      return html`
        <fieldset class="group" ${unsafe(props.disabled ? "disabled" : "")}>
          ${unsafe(
            props.label
              ? `<legend class="legend">${esc(props.label)}${
                props.required
                  ? ' <span class="req" aria-hidden="true">*</span>'
                  : ""
              }</legend>`
              : "",
          )}
          <div class="opts l-${layout}" role="radiogroup" aria-invalid="${showError
            ? "true"
            : "false"}">
            ${unsafe(
              opts.map((o, i) =>
                `<label class="opt ${o.disabled ? "is-disabled" : ""}">
                  <input
                    type="radio"
                    class="r"
                    name="${esc(props.name) || `__rg_${i}__`}"
                    value="${esc(o.value)}"
                    ${o.value === props.value ? "checked" : ""}
                    ${o.disabled || props.disabled ? "disabled" : ""}
                  />
                  <span>${esc(o.label)}</span>
                </label>`
              ).join(""),
            )}
          </div>
        </fieldset>
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
      "change input.r": (event, ctx) => {
        const next = (event.target as HTMLInputElement).value;
        const host = ctx.host as HTMLElement & {
          value: string;
          internals?: ElementInternals;
        };
        host.value = next;
        host.internals?.setFormValue(next);
        ctx.emit("tc-change", { value: next });
      },
    },
    afterMount() {
      const h = this as HTMLElement & {
        value: string;
        internals?: ElementInternals;
      };
      if (h.value) h.internals?.setFormValue(h.value);
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
