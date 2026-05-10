/**
 * `<tc-input>` — a form-associated text input with label, helper text,
 * and validation hooks. Submits with `<form>`, supports the validity API,
 * and resets cleanly.
 *
 * Props:
 *   value        string (default "")
 *   name         string (default "") — submitted under this name
 *   type         "text" | "email" | "password" | "number" | "search" | "tel" | "url"
 *   placeholder  string (default "")
 *   label        string (default "")
 *   helper       string (default "") — small text below the input
 *   error        string (default "") — overrides helper, paints invalid
 *   disabled     boolean (default false, reflects)
 *   required     boolean (default false, reflects)
 *
 * Events:
 *   "tc-input"   detail: { value: string }
 *
 * Theme variables on :host:
 *   --tc-input-bg, --tc-input-fg, --tc-input-border, --tc-input-border-focus,
 *   --tc-input-error, --tc-input-helper, --tc-input-radius, --tc-input-font
 */

import { build, describe } from "@ra9/tan-compose";

const TAG = "tc-input";

export const tagName = TAG;

build(
  TAG,
  describe({
    formAssociated: true,
    props: {
      value: { type: "string", default: "" },
      name: { type: "string", default: "" },
      type: { type: "string", default: "text" },
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
    refs: {
      input: "input",
    },
    template: ({ props }) => {
      const showError = Boolean(props.error);
      return `
        ${
        props.label
          ? `<label class="label">${esc(props.label)}${
            props.required
              ? ' <span class="req" aria-hidden="true">*</span>'
              : ""
          }</label>`
          : ""
      }
        <input
          class="input ${showError ? "invalid" : ""}"
          part="input"
          type="${esc(props.type)}"
          value="${esc(props.value)}"
          name="${esc(props.name)}"
          placeholder="${esc(props.placeholder)}"
          ${props.disabled ? "disabled" : ""}
          ${props.required ? "required" : ""}
          aria-invalid="${showError ? "true" : "false"}"
        />
        ${
        props.error || props.helper
          ? `<div class="${showError ? "error" : "helper"}">${
            esc(props.error || props.helper)
          }</div>`
          : ""
      }
        <style>
          :host { font-family: var(--tc-input-font); }
          .label {
            display: block; font-size: 0.82rem; font-weight: 600;
            color: var(--tc-input-fg); margin-bottom: 6px;
          }
          .req { color: var(--tc-input-error); margin-left: 2px; }
          .input {
            width: 100%; box-sizing: border-box;
            font: inherit; font-size: 0.95rem;
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
          .input.invalid {
            border-color: var(--tc-input-error);
          }
          .input.invalid:focus {
            box-shadow: 0 0 0 3px rgba(179, 38, 30, 0.18);
          }
          .input:disabled {
            opacity: 0.6; cursor: not-allowed;
          }
          .helper {
            margin-top: 6px; font-size: 0.78rem;
            color: var(--tc-input-helper);
          }
          .error {
            margin-top: 6px; font-size: 0.78rem;
            color: var(--tc-input-error);
          }
        </style>
      `;
    },
    events: {
      "input input": (event, ctx) => {
        const next = (event.target as HTMLInputElement).value;
        // Update without re-rendering the input itself (would lose caret).
        // The `value` prop setter triggers a re-render which replaces the
        // input node; users typing won't see this since the new node has
        // the same value. Browsers preserve caret across innerHTML
        // replacement in some engines but not all — use the host's
        // setFormValue path directly to avoid the round-trip.
        const host = ctx.host as HTMLElement & {
          value: string;
          internals?: ElementInternals;
        };
        // Set internals first so the form has the latest value even before
        // the re-render completes.
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
