/**
 * `<tc-file>` — form-associated file input with label, helper/error,
 * and optional drag-and-drop.
 *
 * Props:
 *   name         string  (default "")
 *   accept       string  (default "")  — same as native `<input accept>`
 *   multiple     boolean (default false, reflects)
 *   label        string  (default "")
 *   helper       string  (default "")
 *   error        string  (default "")
 *   buttonText   string  (default "Choose file") — call-to-action on the picker
 *   disabled     boolean (default false, reflects)
 *   required     boolean (default false, reflects)
 *
 * Events:
 *   "tc-files"   detail: { files: File[] }
 *
 * Theme variables — shared with `<tc-input>` plus a button surface.
 */

import { build, describe, html, unsafe } from "@ra9/tan-compose";

const TAG = "tc-file";

export const tagName = TAG;

const STYLE = `
          :host { font-family: var(--tc-input-font); color: var(--tc-input-fg); }
          .label {
            display: block; font-size: 0.82rem; font-weight: 600;
            color: var(--tc-input-fg); margin-bottom: 6px;
          }
          .req { color: var(--tc-input-error); margin-left: 2px; }
          .zone {
            display: inline-flex; align-items: center; gap: 12px;
            padding: 6px;
            background: var(--tc-file-zone-bg);
            border: 1px dashed var(--tc-input-border);
            border-radius: var(--tc-input-radius);
          }
          .zone.is-invalid { border-color: var(--tc-input-error); }
          .zone.is-disabled { opacity: 0.6; }
          .btn {
            font: inherit; font-size: 0.88rem; font-weight: 500;
            padding: 7px 13px;
            background: var(--tc-color-ink, #14171f);
            color: var(--tc-color-surface, #ffffff);
            border: none; border-radius: var(--tc-input-radius);
            cursor: pointer;
          }
          .btn:disabled { cursor: not-allowed; }
          .files {
            color: var(--tc-file-zone-fg);
            font-size: 0.88rem;
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
            max-width: 240px;
          }
          .native {
            position: absolute;
            width: 1px; height: 1px;
            padding: 0; margin: -1px; overflow: hidden;
            clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
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
      name: { type: "string", default: "" },
      accept: { type: "string", default: "" },
      multiple: { type: "boolean", default: false, reflect: true },
      label: { type: "string", default: "" },
      helper: { type: "string", default: "" },
      error: { type: "string", default: "" },
      buttonText: { type: "string", default: "Choose file" },
      disabled: { type: "boolean", default: false, reflect: true },
      required: { type: "boolean", default: false, reflect: true },
    },
    theme: {
      "tc-input-fg": "var(--tc-color-ink, #14171f)",
      "tc-input-border": "var(--tc-color-rule-strong, #d9cfb8)",
      "tc-input-border-focus": "var(--tc-color-accent, #a16939)",
      "tc-input-error": "var(--tc-color-danger, #b3261e)",
      "tc-input-helper": "var(--tc-color-ink-muted, #6b7280)",
      "tc-input-radius": "var(--tc-radius-md, 8px)",
      "tc-input-font":
        "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
      "tc-file-zone-bg": "var(--tc-color-surface-alt, #faf8f3)",
      "tc-file-zone-fg": "var(--tc-color-ink-soft, #4a5061)",
    },
    styles: {
      display: "block",
    },
    stylesheet: STYLE,
    refs: {
      input: "input[type='file']",
    },
    template: ({ props, state }) => {
      const showError = Boolean(props.error);
      const filesState = (state.files as File[] | undefined) ?? [];
      const filesText = filesState.length === 0
        ? "No file selected"
        : filesState.length === 1
        ? esc(filesState[0].name)
        : `${filesState.length} files selected`;
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
        <div class="zone ${props.disabled ? "is-disabled" : ""} ${showError
          ? "is-invalid"
          : ""}">
          <button class="btn" type="button" ${unsafe(
            props.disabled ? "disabled" : "",
          )}>
            ${props.buttonText}
          </button>
          <span class="files">${unsafe(filesText)}</span>
          <input
            class="native"
            type="file"
            name="${props.name}"
            accept="${props.accept}"
            ${unsafe(props.multiple ? "multiple" : "")}
            ${unsafe(props.disabled ? "disabled" : "")}
            ${unsafe(props.required ? "required" : "")}
            tabindex="-1"
            aria-hidden="true"
          />
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
      "click .btn": (_e, ctx) => {
        const inp = ctx.refs.input as HTMLInputElement | null;
        inp?.click();
      },
      "change input[type='file']": (event, ctx) => {
        const inp = event.target as HTMLInputElement;
        const files = Array.from(inp.files ?? []);
        ctx.setState("files", files);
        const host = ctx.host as HTMLElement & {
          internals?: ElementInternals;
        };
        if (host.internals) {
          if (files.length === 0) {
            host.internals.setFormValue(null);
          } else if (files.length === 1) {
            host.internals.setFormValue(files[0]);
          } else {
            // multiple: use FormData so the native multiple-file submission shape works
            const fd = new FormData();
            const fieldName = (host as unknown as { name: string }).name;
            for (const f of files) fd.append(fieldName, f);
            host.internals.setFormValue(fd);
          }
        }
        ctx.emit("tc-files", { files });
      },
    },
    formResetCallback() {
      const root = this.shadowRoot;
      const inp = root?.querySelector(".native") as HTMLInputElement | null;
      if (inp) inp.value = "";
      (this as unknown as { setState(k: string, v: unknown): void }).setState(
        "files",
        [],
      );
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
