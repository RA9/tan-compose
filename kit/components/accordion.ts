/**
 * `<tc-accordion>` — disclosure group built on native `<details>` elements.
 *
 * Slot in any number of `<details>` children with their own `<summary>`
 * and body content. The accordion styles them, coordinates single-open
 * behavior, and adds keyboard navigation between summaries.
 *
 * Props:
 *   mode      "single" | "multi" (default "single") — single closes
 *             other items when one opens
 *   bordered  boolean (default true) — outer border + dividers
 *
 * Slots:
 *   default — one or more `<details>` elements.
 *
 * Events:
 *   "tc-change"  detail: { open: string[] }  — ids (or summary text)
 *                of currently-open items, in source order.
 *
 * Theme variables:
 *   --tc-accordion-bg, --tc-accordion-ink, --tc-accordion-ink-soft,
 *   --tc-accordion-rule, --tc-accordion-radius, --tc-accordion-accent,
 *   --tc-accordion-font
 */

import { build, describe } from "@ra9/tan-compose";

const TAG = "tc-accordion";

export const tagName = TAG;

interface HostExtras {
  mode: string;
  bordered: boolean;
  _accordionCleanup?: () => void;
}

build(
  TAG,
  describe({
    props: {
      mode: { type: "string", default: "single" },
      bordered: { type: "boolean", default: true },
    },
    theme: {
      "tc-accordion-bg": "var(--tc-color-surface, #ffffff)",
      "tc-accordion-ink": "var(--tc-color-ink, #14171f)",
      "tc-accordion-ink-soft": "var(--tc-color-ink-soft, #4a5061)",
      "tc-accordion-rule": "var(--tc-color-rule, #ece5d3)",
      "tc-accordion-radius": "var(--tc-radius-md, 8px)",
      "tc-accordion-accent": "var(--tc-color-accent, #a16939)",
      "tc-accordion-font":
        "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
    },
    styles: {
      display: "block",
    },
    template: ({ props }) => `
      <div class="root ${props.bordered ? "bordered" : ""}">
        <slot></slot>
      </div>
      <style>
        :host { display: block; font-family: var(--tc-accordion-font); }
        .root {
          background: var(--tc-accordion-bg);
          color: var(--tc-accordion-ink);
          border-radius: var(--tc-accordion-radius);
          overflow: hidden;
        }
        .root.bordered {
          border: 1px solid var(--tc-accordion-rule);
        }
        /* Only the top-level slotted node (\`details\`) is reachable from the
           shadow tree — \`::slotted()\` takes a compound selector, not a
           combinator. Everything that targets \`summary\` (a descendant of the
           slotted node) lives in the injected light-DOM sheet below; the
           --tc-accordion-* vars inherit into the light DOM from :host. */
        ::slotted(details) {
          background: transparent;
        }
      </style>
    `,
    afterMount() {
      const host = this as unknown as HTMLElement & HostExtras;

      injectLightStyles();

      const onToggle = (e: Event) => {
        const t = e.target as HTMLDetailsElement;
        if (!t || t.tagName !== "DETAILS") return;
        if (host.mode === "single" && t.open) {
          for (const child of getDetails(host)) {
            if (child !== t && child.open) child.open = false;
          }
        }
        dispatchChange(host);
      };

      const onKeydown = (e: KeyboardEvent) => {
        const target = e.target as HTMLElement | null;
        if (!target) return;
        if (target.tagName !== "SUMMARY") return;
        const summaries = getDetails(host).map((d) =>
          d.querySelector("summary")
        )
          .filter((s): s is HTMLElement => !!s);
        const idx = summaries.indexOf(target);
        if (idx === -1) return;
        let next = -1;
        if (e.key === "ArrowDown") next = (idx + 1) % summaries.length;
        else if (e.key === "ArrowUp") {
          next = (idx - 1 + summaries.length) % summaries.length;
        } else if (e.key === "Home") next = 0;
        else if (e.key === "End") next = summaries.length - 1;
        if (next === -1) return;
        e.preventDefault();
        summaries[next]?.focus();
      };

      host.addEventListener("toggle", onToggle, true);
      host.addEventListener("keydown", onKeydown);

      // Inject a caret affordance directly into each summary (light DOM)
      // so it's stylable and survives slot projection.
      const inject = () => {
        for (const d of getDetails(host)) {
          const summary = d.querySelector(":scope > summary");
          if (!summary) continue;
          if (!summary.querySelector(".tc-accordion-caret")) {
            const caret = document.createElement("span");
            caret.className = "tc-accordion-caret";
            caret.setAttribute("aria-hidden", "true");
            caret.style.cssText =
              "display:inline-block;flex:0 0 auto;transition:transform .2s ease;color:var(--tc-color-ink-muted,#6b7280);font-size:0.8rem;";
            caret.textContent = "▸";
            summary.appendChild(caret);
            const sync = () => {
              caret.style.transform = d.open ? "rotate(90deg)" : "rotate(0)";
            };
            sync();
            d.addEventListener("toggle", sync);
          }
        }
      };
      inject();

      const mo = new MutationObserver(inject);
      mo.observe(host, { childList: true, subtree: false });

      host._accordionCleanup = () => {
        host.removeEventListener("toggle", onToggle, true);
        host.removeEventListener("keydown", onKeydown);
        mo.disconnect();
      };
    },
    unmount() {
      const host = this as unknown as HTMLElement & HostExtras;
      host._accordionCleanup?.();
    },
  }),
);

const LIGHT_STYLE_ID = "tc-accordion-light-styles";

/**
 * Styles for the slotted `<summary>` (and other `<details>` descendants) must
 * live in the light DOM: `::slotted()` can only target the top-level projected
 * node, so a descendant combinator inside it makes the rule invalid. The
 * --tc-accordion-* custom properties inherit into the light DOM from the host's
 * `:host` block, so they resolve correctly here. Injected once per document.
 */
function injectLightStyles(): void {
  if (typeof document === "undefined") return;
  if (document.getElementById(LIGHT_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = LIGHT_STYLE_ID;
  style.textContent = `
    ${TAG} details { background: transparent; }
    ${TAG} details + details {
      border-top: 1px solid var(--tc-accordion-rule, #ece5d3);
    }
    ${TAG} details > summary {
      cursor: pointer;
      list-style: none;
      padding: 14px 18px;
      font-weight: 600;
      font-size: 0.96rem;
      color: var(--tc-accordion-ink, #14171f);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      transition: background 0.15s ease;
    }
    ${TAG} details > summary::-webkit-details-marker { display: none; }
    ${TAG} details > summary::marker { content: ""; }
    ${TAG} details > summary:hover { background: rgba(20, 23, 31, 0.03); }
    ${TAG} details > summary:focus-visible {
      outline: 2px solid var(--tc-accordion-accent, #a16939);
      outline-offset: -2px;
    }
  `;
  (document.head || document.documentElement).appendChild(style);
}

function getDetails(host: HTMLElement): HTMLDetailsElement[] {
  const out: HTMLDetailsElement[] = [];
  for (const c of Array.from(host.children)) {
    if (c instanceof HTMLDetailsElement) out.push(c);
  }
  return out;
}

function dispatchChange(host: HTMLElement): void {
  const open: string[] = [];
  for (const d of getDetails(host)) {
    if (d.open) {
      const id = d.id || d.querySelector("summary")?.textContent?.trim() || "";
      open.push(id);
    }
  }
  host.dispatchEvent(
    new CustomEvent("tc-change", {
      detail: { open },
      bubbles: true,
      composed: true,
    }),
  );
}
