/**
 * `<tc-checkbox>` — form-associated checkbox wrapping a native input.
 *
 * Props:
 *   checked        boolean (default false, reflects)
 *   name           string  (default "")
 *   value          string  (default "on") — submitted value when checked
 *   label          string  (default "") — text shown next to the checkbox
 *   helper         string  (default "")
 *   error          string  (default "")
 *   disabled       boolean (default false, reflects)
 *   required       boolean (default false, reflects)
 *   indeterminate  boolean (default false)
 *
 * Events:
 *   "tc-change"  detail: { checked: boolean }
 *
 * Theme variables on :host (shared with other form fields):
 *   --tc-input-fg, --tc-input-border, --tc-input-border-focus,
 *   --tc-input-error, --tc-input-helper, --tc-input-radius,
 *   --tc-input-font, --tc-checkbox-accent
 */

import { build, describe } from "@ra9/tan-compose";

const TAG = "tc-checkbox";

export const tagName = TAG;

build(
  TAG,
  describe({
    formAssociated: true,
    props: {
      checked: { type: "boolean", default: false, reflect: true },
      name: { type: "string", default: "" },
      value: { type: "string", default: "on" },
      label: { type: "string", default: "" },
      helper: { type: "string", default: "" },
      error: { type: "string", default: "" },
      disabled: { type: "boolean", default: false, reflect: true },
      required: { type: "boolean", default: false, reflect: true },
      indeterminate: { type: "boolean", default: false },
    },
    theme: {
      "tc-input-fg": "var(--tc-color-ink, #14171f)",
      "tc-input-border": "var(--tc-color-rule-strong, #d9cfb8)",
      "tc-input-border-focus": "var(--tc-color-accent, #a16939)",
      "tc-input-error": "var(--tc-color-danger, #b3261e)",
      "tc-input-helper": "var(--tc-color-ink-muted, #6b7280)",
      "tc-input-radius": "var(--tc-radius-sm, 4px)",
      "tc-input-font":
        "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
      "tc-checkbox-accent": "var(--tc-color-accent, #a16939)",
    },
    styles: {
      display: "block",
    },
    template: ({ props }) => {
      const showError = Boolean(props.error);
      return `
        <label class="row ${props.disabled ? "is-disabled" : ""} ${
        showError ? "is-invalid" : ""
      }">
          <input
            class="cb"
            type="checkbox"
            name="${esc(props.name)}"
            value="${esc(props.value)}"
            ${props.checked ? "checked" : ""}
            ${props.disabled ? "disabled" : ""}
            ${props.required ? "required" : ""}
            aria-invalid="${showError ? "true" : "false"}"
          />
          ${
        props.label
          ? `<span class="label">${esc(props.label)}${
            props.required
              ? ' <span class="req" aria-hidden="true">*</span>'
              : ""
          }</span>`
          : "<span></span>"
      }
        </label>
        ${
        props.error || props.helper
          ? `<div class="${showError ? "error" : "helper"}">${
            esc(props.error || props.helper)
          }</div>`
          : ""
      }
        <style>
          :host { font-family: var(--tc-input-font); color: var(--tc-input-fg); }
          .row {
            display: inline-flex; align-items: center; gap: 10px;
            cursor: pointer; user-select: none;
            font-size: 0.95rem;
          }
          .row.is-disabled { cursor: not-allowed; opacity: 0.6; }
          .cb {
            width: 18px; height: 18px;
            margin: 0;
            accent-color: var(--tc-checkbox-accent);
            cursor: inherit;
          }
          .row.is-invalid .cb { outline: 2px solid var(--tc-input-error); border-radius: 3px; }
          .label { line-height: 1.3; }
          .req { color: var(--tc-input-error); margin-left: 2px; }
          .helper {
            margin-top: 6px; margin-left: 28px;
            font-size: 0.78rem; color: var(--tc-input-helper);
          }
          .error {
            margin-top: 6px; margin-left: 28px;
            font-size: 0.78rem; color: var(--tc-input-error);
          }
        </style>
      `;
    },
    refs: {
      input: ".cb",
    },
    events: {
      "change .cb": (event, ctx) => {
        const next = (event.target as HTMLInputElement).checked;
        const host = ctx.host as HTMLElement & {
          checked: boolean;
          internals?: ElementInternals;
          value: string;
          name: string;
        };
        host.checked = next;
        host.internals?.setFormValue(next ? host.value : null);
        ctx.emit("tc-change", { checked: next });
      },
    },
    afterMount() {
      // Apply indeterminate state — not reachable via attribute.
      const h = this as HTMLElement & {
        indeterminate: boolean;
        checked: boolean;
        internals?: ElementInternals;
        value: string;
      };
      const root = h.shadowRoot;
      const input = root?.querySelector(".cb") as HTMLInputElement | null;
      if (input) input.indeterminate = h.indeterminate;
      // Sync the initial form value.
      h.internals?.setFormValue(h.checked ? h.value : null);
    },
    formResetCallback() {
      (this as unknown as { checked: boolean }).checked = false;
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
