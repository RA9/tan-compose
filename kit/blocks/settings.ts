/**
 * `<tc-block-settings>` — a ready-made settings page template. A section
 * list on the left drives a content panel on the right; each section's
 * content is a named slot.
 *
 * Props:
 *   title        string  (default "Settings")
 *   description  string  (default "Manage your account and workspace preferences.")
 *   sections     json    Array<{ id, label, hint? }> — left-hand navigation
 *   active       string  (reflects) — id of the visible section
 *
 * Slots:
 *   one named slot per section id — e.g. `<div slot="profile">…</div>` is
 *   shown when `active === "profile"`.
 *
 * Events (composed, bubble out of the shadow root):
 *   tc-block-settings-change  detail: { active, previous }
 *
 * Theme variables on :host:
 *   --tc-block-side-bg, --tc-block-side-fg, --tc-block-side-soft,
 *   --tc-block-side-active-bg, --tc-block-surface, --tc-block-rule,
 *   --tc-block-radius, --tc-block-font
 */

import { build, describe, html, map } from "@ra9/tan-compose";

const TAG = "tc-block-settings";

export const tagName = TAG;

interface Section {
  id: string;
  label: string;
  hint?: string;
}

const STYLE = `
  :host { display: block; font-family: var(--tc-block-font); }
  .shell {
    max-width: 960px;
    margin: 0 auto;
    padding: 40px 24px 64px;
    color: var(--tc-color-ink, #14171f);
  }
  .head h1 {
    margin: 0 0 6px;
    font-size: 1.7rem;
    font-weight: 700;
    letter-spacing: -0.02em;
  }
  .head .desc {
    margin: 0 0 28px;
    color: var(--tc-color-ink-soft, #4a5061);
    font-size: 0.95rem;
  }

  .body {
    display: grid;
    grid-template-columns: 240px 1fr;
    gap: 28px;
    align-items: start;
  }

  .sections {
    display: flex;
    flex-direction: column;
    gap: 2px;
    position: sticky;
    top: 24px;
  }
  .section-btn {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1px;
    padding: 10px 12px;
    border: none;
    border-left: 2px solid transparent;
    border-radius: 0 var(--tc-radius-md, 8px) var(--tc-radius-md, 8px) 0;
    background: transparent;
    font: inherit;
    font-size: 0.92rem;
    font-weight: 500;
    color: var(--tc-block-side-soft);
    text-align: left;
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
  }
  .section-btn:hover { background: var(--tc-block-side-active-bg); color: var(--tc-block-side-fg); }
  .section-btn.active {
    border-left-color: var(--tc-color-accent, #a16939);
    color: var(--tc-color-accent, #a16939);
    font-weight: 600;
  }
  .section-btn:focus-visible {
    outline: 2px solid var(--tc-color-accent, #a16939);
    outline-offset: 2px;
  }
  .section-btn .hint {
    font-size: 0.78rem;
    font-weight: 400;
    color: var(--tc-block-side-soft);
  }
  .section-btn.active .hint { color: inherit; opacity: 0.75; }

  .content {
    background: var(--tc-block-surface);
    border: 1px solid var(--tc-block-rule);
    border-radius: var(--tc-block-radius);
    padding: 24px 26px;
    min-width: 0;
  }
  .panel { line-height: 1.6; }
  .panel[hidden] { display: none; }

  @media (max-width: 700px) {
    .shell { padding: 28px 16px 48px; }
    .body { grid-template-columns: 1fr; gap: 16px; }
    .sections {
      position: static;
      flex-direction: row;
      overflow-x: auto;
      padding-bottom: 4px;
    }
    .section-btn {
      border-left: none;
      border-bottom: 2px solid transparent;
      border-radius: 0;
      white-space: nowrap;
      flex: 0 0 auto;
    }
    .section-btn.active { border-bottom-color: var(--tc-color-accent, #a16939); }
    .section-btn .hint { display: none; }
    .content { padding: 18px; }
  }
`;

build(
  TAG,
  describe({
    props: {
      title: { type: "string", default: "Settings" },
      description: {
        type: "string",
        default: "Manage your account and workspace preferences.",
      },
      sections: {
        type: "json",
        default: [
          { id: "profile", label: "Profile", hint: "Name and avatar" },
          { id: "account", label: "Account", hint: "Email and password" },
          {
            id: "notifications",
            label: "Notifications",
            hint: "What you hear about",
          },
          { id: "billing", label: "Billing", hint: "Plan and invoices" },
        ],
      },
      active: { type: "string", default: "", reflect: true },
    },
    theme: {
      "tc-block-side-bg": "var(--tc-color-surface, #ffffff)",
      "tc-block-side-fg": "var(--tc-color-ink, #14171f)",
      "tc-block-side-soft": "var(--tc-color-ink-soft, #4a5061)",
      "tc-block-side-active-bg": "var(--tc-color-accent-soft, #efe2cf)",
      "tc-block-surface": "var(--tc-color-surface, #ffffff)",
      "tc-block-rule": "var(--tc-color-rule, #ece5d3)",
      "tc-block-radius": "var(--tc-radius-lg, 12px)",
      "tc-block-font":
        "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
    },
    styles: {
      display: "block",
    },
    stylesheet: STYLE,
    beforeMount() {
      const host = this as unknown as { active: string; sections: Section[] };
      const sections = host.sections ?? [];
      if (!host.active && sections.length > 0) host.active = sections[0].id;
    },
    template: ({ props }) => {
      const sections = (props.sections as Section[] | undefined) ?? [];
      const active = String(props.active ?? "") || sections[0]?.id || "";
      return html`
        <div class="shell">
          <header class="head">
            <h1>${props.title}</h1>
            <p class="desc">${props.description}</p>
          </header>

          <div class="body">
            <nav class="sections" aria-label="Settings sections">
              ${map(sections, (s) =>
                html`
                  <button
                    type="button"
                    class="section-btn ${s.id === active ? "active" : ""}"
                    data-section="${s.id}"
                    aria-current="${s.id === active ? "true" : "false"}"
                  >
                    <span>${s.label}</span>
                    ${s.hint
                      ? html`
                        <span class="hint">${s.hint}</span>
                      `
                      : ""}
                  </button>
                `)}
            </nav>

            <div class="content">
              ${map(sections, (s) =>
                html`
                  <section
                    class="panel"
                    aria-labelledby=""
                    ${s.id === active ? "" : "hidden"}
                  >
                    <slot name="${s.id}"></slot>
                  </section>
                `)}
            </div>
          </div>
        </div>
      `;
    },
    events: {
      "click .section-btn": (event, ctx) => {
        const btn = (event.target as HTMLElement).closest(
          ".section-btn",
        ) as HTMLElement | null;
        if (!btn) return;
        const id = btn.dataset.section;
        if (!id) return;
        const host = ctx.host as HTMLElement & { active: string };
        const previous = host.active;
        if (previous === id) return;
        host.active = id;
        ctx.emit("tc-block-settings-change", { active: id, previous });
      },
    },
  }),
);
