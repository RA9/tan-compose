/**
 * `<tc-combobox>` — searchable, optionally multi-select dropdown with
 * support for icon prefixes and tag chips. Form-associated. Pairs the
 * usability of a search field with the structure of a select.
 *
 * Typical uses: country picker with flags, tag picker, assignee dropdown,
 * any "select N from many" widget where the native <select multiple>
 * would be clumsy.
 *
 * Props:
 *   value           string  default ""   — comma-separated values
 *                   (single value is just the value itself; multiple
 *                   values are joined with commas). Also accepts a JSON
 *                   array when set programmatically.
 *   name            string  default ""   — form field name
 *   options         json    default []   — Array<OptionDef>
 *   multiple        boolean default false
 *   searchable      boolean default true
 *   placeholder     string  default ""   — empty-control hint
 *   empty-text      string  default "No results"
 *   label           string  default ""
 *   helper          string  default ""
 *   error           string  default ""
 *   disabled        boolean default false (reflects)
 *   required        boolean default false (reflects)
 *   max             number  default 0    — max selections when multiple
 *                                          (0 = unlimited)
 *
 * Each OptionDef: { value, label, icon?, disabled?, group? }
 *   icon may be any short string — emoji flag, single character, etc.
 *   For richer per-row visuals, slot custom content per option in a
 *   future revision; v1 keeps it text-only.
 *
 * Events:
 *   "tc-change"   detail: { value: string | string[] }
 *                 Fires when the selection changes. value is the array
 *                 of selected values when multiple, the string when not.
 *   "tc-search"   detail: { query: string }
 *                 Fires on every keystroke in the search field. Useful
 *                 for async option fetch.
 *   "tc-open"     fires when the popup opens.
 *   "tc-close"    fires when the popup closes.
 *
 * Keyboard:
 *   ↓ / ↑          move focus between options
 *   Enter          select the focused option
 *   Esc            close the popup
 *   Backspace      (multiple) remove the last selected chip when the
 *                  search field is empty
 *
 * Theme variables share the input's tokens so combobox looks like a
 * peer of <tc-input> and <tc-select>.
 */

import { build, describe, html, unsafe } from "@ra9/tan-compose";

const TAG = "tc-combobox";

export const tagName: string = TAG;

interface OptionDef {
  value: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  group?: string;
}

function valuesFromProp(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((v) => String(v)).filter(Boolean);
  const s = String(value ?? "").trim();
  if (!s) return [];
  return s.split(",").map((v) => v.trim()).filter(Boolean);
}

function joinValues(values: string[]): string {
  return values.join(",");
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Declared BEFORE build() — see kit/components/button.ts:33-38 for why.
// (esbuild minify converts `const` to `var`; a STYLE declared after
// build() is hoisted-but-undefined when the synchronous define()
// upgrade runs the template.)
const STYLE = `
          :host {
            display: block;
            position: relative;
          }
          .label {
            display: block;
            font-family: var(--tc-input-font);
            font-size: 0.84rem;
            font-weight: 500;
            color: var(--tc-input-fg);
            margin-bottom: 6px;
          }
          .req { color: var(--tc-input-error); }

          .control {
            position: relative;
            display: flex;
            align-items: center;
            gap: 6px;
            min-height: 40px;
            padding: 4px 8px 4px 10px;
            border: 1px solid var(--tc-input-border);
            border-radius: var(--tc-input-radius);
            background: var(--tc-input-bg);
            color: var(--tc-input-fg);
            font-family: var(--tc-input-font);
            cursor: text;
            transition: border-color 0.15s ease, box-shadow 0.15s ease;
          }
          .control:hover { border-color: var(--tc-input-border-focus); }
          .control.open,
          .control:focus-within {
            border-color: var(--tc-input-border-focus);
            box-shadow: 0 0 0 3px color-mix(in srgb, var(--tc-input-border-focus) 18%, transparent);
            outline: none;
          }
          .control.invalid { border-color: var(--tc-input-error); }
          .control.disabled {
            opacity: 0.6;
            cursor: not-allowed;
            background: var(--tc-color-bg, #f5f1e6);
          }

          .display {
            flex: 1 1 auto;
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
            align-items: center;
            min-width: 0;
          }
          .placeholder {
            color: var(--tc-input-helper);
            font-size: 0.92rem;
          }
          .single {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 0.92rem;
          }
          .single-icon { line-height: 1; }
          .search {
            border: none;
            outline: none;
            background: transparent;
            color: inherit;
            font: inherit;
            font-size: 0.92rem;
            padding: 4px 0;
            flex: 1 1 60px;
            min-width: 60px;
          }

          .chip {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 2px 4px 2px 8px;
            background: var(--tc-combobox-chip-bg);
            color: var(--tc-combobox-chip-fg);
            border-radius: var(--tc-radius-pill, 999px);
            font-size: 0.82rem;
            line-height: 1.2;
            max-width: 100%;
          }
          .chip-icon { line-height: 1; }
          .chip-label {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 200px;
          }
          .chip-remove {
            background: transparent;
            border: none;
            cursor: pointer;
            color: inherit;
            padding: 2px 6px;
            font-size: 0.95rem;
            border-radius: 50%;
            line-height: 1;
            font-family: inherit;
          }
          .chip-remove:hover { background: rgba(0, 0, 0, 0.08); }
          .chip-remove:disabled { cursor: not-allowed; }

          .caret {
            color: var(--tc-input-helper);
            margin-left: 4px;
            font-size: 0.85rem;
            line-height: 1;
            pointer-events: none;
            transition: transform 0.15s ease;
          }
          .control.open .caret { transform: rotate(180deg); }

          .popup {
            position: absolute;
            left: 0;
            right: 0;
            margin-top: 4px;
            background: var(--tc-combobox-popup-bg);
            border: 1px solid var(--tc-input-border);
            border-radius: var(--tc-input-radius);
            box-shadow: var(--tc-shadow-md, 0 8px 24px rgba(0, 0, 0, 0.08));
            max-height: 280px;
            overflow-y: auto;
            z-index: 50;
            padding: 4px;
            box-sizing: border-box;
          }
          .option {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 7px 10px;
            border-radius: var(--tc-radius-sm, 6px);
            font-size: 0.92rem;
            cursor: pointer;
            user-select: none;
            line-height: 1.3;
          }
          .option .check {
            width: 16px;
            display: inline-flex;
            justify-content: center;
            font-size: 0.85rem;
            color: var(--tc-color-accent, #a16939);
          }
          .option .opt-icon { line-height: 1; flex: 0 0 auto; }
          .option .opt-label {
            flex: 1 1 auto;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .option:hover,
          .option.focused {
            background: var(--tc-combobox-popup-hover);
          }
          .option.selected {
            background: var(--tc-combobox-popup-active);
            color: var(--tc-color-accent-hover, #8a572d);
            font-weight: 500;
          }
          .option.disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
          .empty {
            padding: 12px;
            text-align: center;
            color: var(--tc-input-helper);
            font-size: 0.92rem;
          }

          .helper {
            margin-top: 6px;
            font-size: 0.82rem;
            color: var(--tc-input-helper);
            font-family: var(--tc-input-font);
          }
          .helper.error { color: var(--tc-input-error); }
`;

build(
  TAG,
  describe({
    formAssociated: true,
    props: {
      value: { type: "string", default: "" },
      name: { type: "string", default: "" },
      options: { type: "json", default: [] },
      multiple: { type: "boolean", default: false },
      searchable: { type: "boolean", default: true },
      placeholder: { type: "string", default: "" },
      "empty-text": { type: "string", default: "No results" },
      label: { type: "string", default: "" },
      helper: { type: "string", default: "" },
      error: { type: "string", default: "" },
      disabled: { type: "boolean", default: false, reflect: true },
      required: { type: "boolean", default: false, reflect: true },
      max: { type: "number", default: 0 },
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
      "tc-combobox-chip-bg": "var(--tc-color-accent-soft, #efe2cf)",
      "tc-combobox-chip-fg": "var(--tc-color-accent-hover, #8a572d)",
      "tc-combobox-popup-bg": "var(--tc-color-surface, #ffffff)",
      "tc-combobox-popup-hover": "var(--tc-color-accent-soft, #efe2cf)",
      "tc-combobox-popup-active": "var(--tc-color-accent-soft, #efe2cf)",
    },
    styles: {
      display: "block",
    },
    stylesheet: STYLE,
    refs: {
      search: ".search",
      popup: ".popup",
    },
    template: ({ props, state }) => {
      const opts = (props.options as OptionDef[] | undefined) ?? [];
      const multiple = !!props.multiple;
      const searchable = props.searchable !== false;
      const disabled = !!props.disabled;
      const showError = Boolean(props.error);
      const selected = valuesFromProp(props.value);
      const query = String(state.query ?? "");
      const isOpen = !!state.open && !disabled;
      const focusedIndex = Number(state.focusedIndex ?? -1);

      const filtered = filterOptions(opts, query);
      const selectedSet = new Set(selected);

      const selectedOpts = selected
        .map((v) => opts.find((o) => o.value === v))
        .filter((o): o is OptionDef => Boolean(o));

      const showSearch = searchable &&
        (isOpen || (multiple && selected.length === 0));
      const showSingleLabel = !multiple && selected.length === 1 &&
        (!isOpen || !searchable);
      const showPlaceholder = selected.length === 0 && !showSearch &&
        !showSingleLabel;

      const chipsHtml = multiple
        ? selectedOpts
          .map((o) =>
            `<span class="chip" data-value="${esc(o.value)}">
              ${o.icon ? `<span class="chip-icon">${esc(o.icon)}</span>` : ""}
              <span class="chip-label">${esc(o.label)}</span>
              <button
                type="button"
                class="chip-remove"
                data-remove="${esc(o.value)}"
                aria-label="Remove ${esc(o.label)}"
                ${disabled ? "disabled" : ""}
              >&times;</button>
            </span>`
          )
          .join("")
        : "";

      const singleLabelHtml = showSingleLabel && selectedOpts[0]
        ? `<span class="single">
            ${
          selectedOpts[0].icon
            ? `<span class="single-icon">${esc(selectedOpts[0].icon)}</span>`
            : ""
        }
            <span class="single-label">${esc(selectedOpts[0].label)}</span>
          </span>`
        : "";

      const placeholderHtml = showPlaceholder
        ? `<span class="placeholder">${esc(props.placeholder ?? "")}</span>`
        : "";

      const searchHtml = showSearch
        ? `<input
            type="text"
            class="search"
            part="search"
            value="${esc(query)}"
            placeholder="${
          esc(selected.length === 0 ? (props.placeholder ?? "") : "")
        }"
            ${disabled ? "disabled" : ""}
            autocomplete="off"
            aria-autocomplete="list"
            aria-expanded="${isOpen ? "true" : "false"}"
            role="combobox"
          />`
        : "";

      const optionsHtml = filtered.length === 0
        ? `<div class="empty">${esc(props["empty-text"] ?? "No results")}</div>`
        : filtered
          .map((o, i) => {
            const checked = selectedSet.has(o.value);
            const isFocused = i === focusedIndex;
            const cls = [
              "option",
              checked ? "selected" : "",
              isFocused ? "focused" : "",
              o.disabled ? "disabled" : "",
            ].filter(Boolean).join(" ");
            return `<div
              class="${cls}"
              role="option"
              data-value="${esc(o.value)}"
              data-index="${i}"
              aria-selected="${checked ? "true" : "false"}"
              ${o.disabled ? 'aria-disabled="true"' : ""}
            >
              ${
              multiple
                ? `<span class="check" aria-hidden="true">${
                  checked ? "✓" : ""
                }</span>`
                : ""
            }
              ${o.icon ? `<span class="opt-icon">${esc(o.icon)}</span>` : ""}
              <span class="opt-label">${esc(o.label)}</span>
            </div>`;
          })
          .join("");

      // Hidden values for form submission. internals.setFormValue gets a
      // FormData with one entry per selected value when multiple.
      const labelHtml = props.label
        ? `<label class="label">${esc(props.label)}${
          props.required ? ' <span class="req" aria-hidden="true">*</span>' : ""
        }</label>`
        : "";

      const helperHtml = showError
        ? `<div class="helper error">${esc(props.error)}</div>`
        : props.helper
        ? `<div class="helper">${esc(props.helper)}</div>`
        : "";

      return html`
        ${unsafe(labelHtml)}
        <div
          class="control ${showError ? "invalid" : ""} ${isOpen
            ? "open"
            : ""} ${disabled ? "disabled" : ""}"
          part="control"
          tabindex="${disabled ? "-1" : "0"}"
          role="${searchable ? "presentation" : "combobox"}"
        >
          <div class="display">
            ${unsafe(chipsHtml)}${unsafe(singleLabelHtml)}${unsafe(
              placeholderHtml,
            )}${unsafe(searchHtml)}
          </div>
          <span class="caret" aria-hidden="true">▾</span>
        </div>
        <div
          class="popup"
          part="popup"
          role="listbox"
          ${unsafe(multiple ? 'aria-multiselectable="true"' : "")}
          ${isOpen ? "" : "hidden"}
        >
          ${unsafe(optionsHtml)}
        </div>
        ${unsafe(helperHtml)}
      `;
    },
    events: {
      // Open on control click (unless click came from a chip-remove).
      // setState triggers a synchronous re-render that destroys the
      // .control element, which fires a focusout on the way out. That
      // schedules a "close if not focus-within" microtask. To beat it
      // we focus the freshly-rendered search SYNCHRONOUSLY after the
      // setState so the host is :focus-within by the time the
      // microtask runs.
      "click .control": (e, ctx) => {
        const target = e.target as HTMLElement;
        if (target.closest(".chip-remove")) return;
        const host = ctx.host as HTMLElement & { disabled?: boolean };
        if (host.disabled) return;
        const wasOpen = !!ctx.getState("open");
        ctx.setState("open", true);
        if (!wasOpen) ctx.emit("tc-open");
        const search = ctx.refs.search as HTMLInputElement | null;
        search?.focus();
      },
      // Open on caret keyboard activation (Enter/Space on the control).
      "keydown .control": (e, ctx) => {
        const ev = e as KeyboardEvent;
        if (ev.key === "Enter" || ev.key === " ") {
          ev.preventDefault();
          const host = ctx.host as HTMLElement & { disabled?: boolean };
          if (host.disabled) return;
          ctx.setState("open", true);
          ctx.emit("tc-open");
          const search = ctx.refs.search as HTMLInputElement | null;
          search?.focus();
        }
      },
      // Search input typing → filter + update query state.
      "input .search": (e, ctx) => {
        const value = (e.target as HTMLInputElement).value;
        ctx.setState("query", value);
        ctx.setState("open", true);
        ctx.setState("focusedIndex", 0);
        ctx.emit("tc-search", { query: value });
      },
      // Backspace on empty search removes last chip (multiple only).
      "keydown .search": (e, ctx) => {
        const ev = e as KeyboardEvent;
        const search = e.target as HTMLInputElement;
        const host = ctx.host as HTMLElement & {
          value: unknown;
          multiple?: boolean;
          options?: OptionDef[];
        };
        const multiple = !!host.multiple;
        const opts = (host.options ?? []) as OptionDef[];
        const filtered = filterOptions(
          opts,
          String(ctx.getState("query") ?? ""),
        );

        if (ev.key === "Backspace" && search.value === "" && multiple) {
          const selected = valuesFromProp(host.value);
          if (selected.length > 0) {
            selected.pop();
            host.value = joinValues(selected);
            syncFormValue(ctx, selected, host);
            ctx.emit("tc-change", { value: selected.slice() });
            ev.preventDefault();
          }
          return;
        }
        if (ev.key === "ArrowDown") {
          ev.preventDefault();
          ctx.setState("open", true);
          const cur = Number(ctx.getState("focusedIndex") ?? -1);
          const next = Math.min(filtered.length - 1, cur + 1);
          ctx.setState("focusedIndex", next);
          return;
        }
        if (ev.key === "ArrowUp") {
          ev.preventDefault();
          const cur = Number(ctx.getState("focusedIndex") ?? 0);
          const next = Math.max(0, cur - 1);
          ctx.setState("focusedIndex", next);
          return;
        }
        if (ev.key === "Enter") {
          ev.preventDefault();
          const idx = Number(ctx.getState("focusedIndex") ?? -1);
          if (idx >= 0 && idx < filtered.length) {
            selectOption(ctx, filtered[idx], host);
          }
          return;
        }
        if (ev.key === "Escape") {
          ev.preventDefault();
          ctx.setState("open", false);
          ctx.setState("query", "");
          ctx.emit("tc-close");
          return;
        }
      },
      // Option click → select.
      "mousedown .option": (e, ctx) => {
        // mousedown rather than click so the search input doesn't lose
        // focus and re-render before the selection lands.
        e.preventDefault();
        const target = (e.target as HTMLElement).closest(
          ".option",
        ) as HTMLElement | null;
        if (!target || target.classList.contains("disabled")) return;
        const value = target.dataset.value;
        if (value == null) return;
        const host = ctx.host as HTMLElement & {
          value: unknown;
          options?: OptionDef[];
        };
        const opts = (host.options ?? []) as OptionDef[];
        const opt = opts.find((o) => o.value === value);
        if (!opt) return;
        selectOption(ctx, opt, host);
      },
      // Chip remove button.
      "click .chip-remove": (e, ctx) => {
        e.stopPropagation();
        const btn = e.target as HTMLElement;
        const value = btn.dataset.remove;
        if (value == null) return;
        const host = ctx.host as HTMLElement & {
          value: unknown;
        };
        const selected = valuesFromProp(host.value).filter((v) => v !== value);
        host.value = joinValues(selected);
        syncFormValue(ctx, selected, host);
        ctx.emit("tc-change", { value: selected.slice() });
      },
      // Click outside the host closes the popup. We listen at the host
      // level for blur/focusout.
      "focusout .control": (_e, ctx) => {
        // Defer the close so that clicking inside the popup doesn't
        // immediately collapse it before mousedown fires.
        queueMicrotask(() => {
          const host = ctx.host as HTMLElement;
          if (!host.matches(":focus-within")) {
            ctx.setState("open", false);
            ctx.setState("query", "");
            ctx.emit("tc-close");
          }
        });
      },
    },
    afterMount() {
      // Initial form sync. The core syncs `value` as a single string,
      // but for multiple selects we want a FormData with one entry per
      // selected value so the form serializes correctly.
      const host = this as unknown as HTMLElement & {
        value: unknown;
        multiple?: boolean;
        name?: string;
        internals?: ElementInternals;
      };
      if (!host.multiple || !host.internals) return;
      const selected = valuesFromProp(host.value);
      const name = String(host.name ?? "");
      if (!name) {
        host.internals.setFormValue(joinValues(selected));
        return;
      }
      const fd = new FormData();
      for (const v of selected) fd.append(name, v);
      host.internals.setFormValue(fd);
    },
    afterRender() {
      // The framework rebuilds shadow content via innerHTML on every
      // state change, which destroys the focused search input. If the
      // popup is open we restore focus to the freshly-rendered search
      // element so typing actually lands somewhere visible. Caret goes
      // to the end of the typed text so subsequent keys append.
      const host = this as unknown as HTMLElement & {
        shadowRoot?: ShadowRoot | null;
        // The kit's host exposes refs and a state getter for use here.
        refs?: { search?: HTMLInputElement | null };
        getState?: (k: string) => unknown;
      };
      const open = host.getState ? !!host.getState("open") : false;
      if (!open) return;
      const search = host.refs?.search ?? null;
      if (!search) return;
      const active = host.shadowRoot?.activeElement;
      if (active === search) return;
      search.focus();
      const len = search.value.length;
      try {
        search.setSelectionRange(len, len);
      } catch {
        // some input types (e.g. type="email") don't support selection.
      }
    },
  }),
);

function filterOptions(opts: OptionDef[], query: string): OptionDef[] {
  if (!query) return opts;
  const re = new RegExp(escapeRegex(query), "i");
  return opts.filter((o) => re.test(o.label) || re.test(o.value));
}

interface SelectCtx {
  host: HTMLElement;
  getState: (k: string) => unknown;
  setState: (k: string, v: unknown) => void;
  emit: (name: string, detail?: unknown) => void;
  refs: Readonly<Record<string, Element | null>>;
}

function selectOption(
  ctx: SelectCtx,
  opt: OptionDef,
  host: HTMLElement & {
    value: unknown;
    multiple?: boolean;
    max?: number;
  },
): void {
  const multiple = !!host.multiple;
  const max = Number(host.max ?? 0);
  const current = valuesFromProp(host.value);

  if (multiple) {
    let next: string[];
    if (current.includes(opt.value)) {
      next = current.filter((v) => v !== opt.value);
    } else {
      if (max > 0 && current.length >= max) return;
      next = current.concat(opt.value);
    }
    host.value = joinValues(next);
    syncFormValue(ctx, next, host);
    ctx.setState("query", "");
    ctx.emit("tc-change", { value: next.slice() });
    // Keep popup open + refocus search so the user can pick more.
    queueMicrotask(() => {
      const search = ctx.refs.search as HTMLInputElement | null;
      search?.focus();
    });
  } else {
    host.value = opt.value;
    syncFormValue(ctx, [opt.value], host);
    ctx.setState("query", "");
    ctx.setState("open", false);
    ctx.emit("tc-change", { value: opt.value });
    ctx.emit("tc-close");
  }
}

function syncFormValue(
  _ctx: SelectCtx,
  values: string[],
  host: HTMLElement & { multiple?: boolean; name?: string },
): void {
  const internals = (host as unknown as { internals?: ElementInternals })
    .internals;
  if (!internals) return;
  const name = String(host.name ?? "");
  if (!host.multiple) {
    internals.setFormValue(values[0] ?? "");
    return;
  }
  if (!name) {
    internals.setFormValue(joinValues(values));
    return;
  }
  const fd = new FormData();
  for (const v of values) fd.append(name, v);
  internals.setFormValue(fd);
}

function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
