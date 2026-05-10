/**
 * `<tc-switch>` — accessible toggle styled as a switch. Form-associated.
 *
 * Props:
 *   checked   boolean (default false, reflects)
 *   name      string  (default "")
 *   value     string  (default "on")
 *   label     string  (default "")
 *   helper    string  (default "")
 *   error     string  (default "")
 *   disabled  boolean (default false, reflects)
 *
 * Events:
 *   "tc-change"  detail: { checked: boolean }
 *
 * Theme variables on :host:
 *   --tc-switch-track-off, --tc-switch-track-on, --tc-switch-thumb,
 *   --tc-switch-fg, --tc-switch-helper, --tc-switch-error, --tc-switch-font
 */

import { build, describe } from "@ra9/tan-compose";

const TAG = "tc-switch";

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
    },
    theme: {
      "tc-switch-track-off": "var(--tc-color-rule-strong, #d9cfb8)",
      "tc-switch-track-on": "var(--tc-color-accent, #a16939)",
      "tc-switch-thumb": "var(--tc-color-surface, #ffffff)",
      "tc-switch-fg": "var(--tc-color-ink, #14171f)",
      "tc-switch-helper": "var(--tc-color-ink-muted, #6b7280)",
      "tc-switch-error": "var(--tc-color-danger, #b3261e)",
      "tc-switch-font":
        "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
    },
    styles: {
      display: "block",
    },
    template: ({ props }) => {
      const showError = Boolean(props.error);
      return `
        <label class="row ${props.disabled ? "is-disabled" : ""}">
          <button
            class="track ${props.checked ? "on" : ""}"
            type="button"
            role="switch"
            aria-checked="${props.checked ? "true" : "false"}"
            ${props.disabled ? "disabled" : ""}
            aria-invalid="${showError ? "true" : "false"}"
          >
            <span class="thumb"></span>
          </button>
          ${props.label ? `<span class="label">${esc(props.label)}</span>` : ""}
        </label>
        ${
        props.error || props.helper
          ? `<div class="${showError ? "error" : "helper"}">${
            esc(props.error || props.helper)
          }</div>`
          : ""
      }
        <style>
          :host { font-family: var(--tc-switch-font); color: var(--tc-switch-fg); }
          .row {
            display: inline-flex; align-items: center; gap: 10px;
            cursor: pointer; user-select: none;
            font-size: 0.95rem;
          }
          .row.is-disabled { cursor: not-allowed; opacity: 0.6; }
          .track {
            position: relative;
            width: 36px; height: 22px;
            background: var(--tc-switch-track-off);
            border-radius: 999px;
            border: none; padding: 0; margin: 0;
            cursor: inherit;
            transition: background 0.18s ease;
          }
          .track.on { background: var(--tc-switch-track-on); }
          .track:focus-visible {
            outline: 2px solid var(--tc-switch-track-on);
            outline-offset: 2px;
          }
          .thumb {
            position: absolute; top: 2px; left: 2px;
            width: 18px; height: 18px;
            background: var(--tc-switch-thumb);
            border-radius: 50%;
            transition: transform 0.18s ease;
            box-shadow: 0 1px 2px rgba(0,0,0,0.18);
          }
          .track.on .thumb { transform: translateX(14px); }
          .label { line-height: 1.3; }
          .helper {
            margin-top: 6px; font-size: 0.78rem;
            color: var(--tc-switch-helper);
          }
          .error {
            margin-top: 6px; font-size: 0.78rem;
            color: var(--tc-switch-error);
          }
        </style>
      `;
    },
    events: {
      "click .track": (_e, ctx) => {
        const host = ctx.host as HTMLElement & {
          checked: boolean;
          disabled: boolean;
          internals?: ElementInternals;
          value: string;
        };
        if (host.disabled) return;
        host.checked = !host.checked;
        host.internals?.setFormValue(host.checked ? host.value : null);
        ctx.emit("tc-change", { checked: host.checked });
      },
      "keydown .track": (e, ctx) => {
        const ev = e as KeyboardEvent;
        if (ev.key !== " " && ev.key !== "Enter") return;
        ev.preventDefault();
        const host = ctx.host as HTMLElement & {
          checked: boolean;
          disabled: boolean;
          internals?: ElementInternals;
          value: string;
        };
        if (host.disabled) return;
        host.checked = !host.checked;
        host.internals?.setFormValue(host.checked ? host.value : null);
        ctx.emit("tc-change", { checked: host.checked });
      },
    },
    afterMount() {
      const h = this as HTMLElement & {
        checked: boolean;
        internals?: ElementInternals;
        value: string;
      };
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
