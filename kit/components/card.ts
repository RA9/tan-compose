/**
 * `<tc-card>` — layout primitive: an optionally-titled, optionally-bordered
 * box with named slots for media / header / footer.
 *
 * Props:
 *   title      string  (default "") — header title text
 *   subtitle   string  (default "") — header subtitle text
 *   padded     boolean (default true) — content padding
 *   bordered   boolean (default true) — outline border
 *   elevated   boolean (default false) — soft shadow
 *
 * Slots:
 *   media   — image or visual at the top (full-bleed, no padding)
 *   header  — replaces title/subtitle if provided
 *   default — body content (this is the unnamed slot)
 *   footer  — bottom bar (action buttons etc.)
 *
 * Theme variables on :host:
 *   --tc-card-surface, --tc-card-ink, --tc-card-soft, --tc-card-rule,
 *   --tc-card-radius, --tc-card-shadow, --tc-card-font,
 *   --tc-card-padding-x, --tc-card-padding-y, --tc-card-gap
 */

import { build, describe, html } from "@ra9/tan-compose";

const TAG = "tc-card";

export const tagName = TAG;

const STYLE = `
  :host { display: block; }
  .card {
    background: var(--tc-card-surface);
    color: var(--tc-card-ink);
    font-family: var(--tc-card-font);
    border-radius: var(--tc-card-radius);
    overflow: hidden;
  }
  .card.bordered { border: 1px solid var(--tc-card-rule); }
  .card.elevated { box-shadow: var(--tc-card-shadow); }

  /* Body padding is the deterministic default. The head and foot
     pad themselves separately. Padding kicks in even if the
     padded class somehow is not applied to the host, so consumers
     get a sensibly-padded card out of the box without needing to
     remember a flag. Override only when padded=false. */
  .body {
    padding: var(--tc-card-padding-y) var(--tc-card-padding-x);
  }

  /* Slot occupancy drives head/foot/media visibility. It's
     detected in afterMount via slotchange and reflected as
     has-header-slot / has-footer / has-media classes on .card.
     We can't do this in pure CSS: :has(::slotted(*)) is invalid
     (::slotted is a pseudo-element, which :has() rejects) and was
     silently dropping the footer + media styling entirely. */

  /* Head padding when title/subtitle props are set OR something
     is slotted into name="header". */
  .card.has-header .head,
  .card.has-header-slot .head {
    padding:
      var(--tc-card-padding-y)
      var(--tc-card-padding-x)
      var(--tc-card-gap);
  }
  .card.has-header .head + .body,
  .card.has-header-slot .head + .body { padding-top: 0; }

  /* Hide an empty head — neither props nor slotted content. */
  .card:not(.has-header):not(.has-header-slot) .head { display: none; }

  /* Foot only renders when there's slotted footer content. */
  .card.has-footer .foot {
    padding:
      var(--tc-card-gap)
      var(--tc-card-padding-x)
      var(--tc-card-padding-y);
    border-top: 1px solid var(--tc-card-rule);
    display: flex;
    gap: var(--tc-space-2, 8px);
    justify-content: flex-end;
    align-items: center;
  }
  .card:not(.has-footer) .foot { display: none; }

  /* Media is full-bleed (no horizontal padding). The slotted child
     stretches to fill the card width and sits flush to the top
     edge; the body's top padding is unchanged so content below
     keeps breathing room. ::slotted lives on the slot element. */
  .card:not(.has-media) .media { display: none; }
  slot[name="media"]::slotted(*) {
    display: block;
    width: 100%;
    height: auto;
  }

  /* Title / subtitle defaults (used inside the slot fallback). */
  .title {
    font-weight: 700;
    font-size: 1.05rem;
    letter-spacing: -0.01em;
    line-height: 1.3;
  }
  .subtitle {
    margin-top: 4px;
    font-size: 0.88rem;
    line-height: 1.45;
    color: var(--tc-card-soft);
  }

  /* padded=false opt-out — the template applies "nopad" to the
     host inner .card when the prop is false. */
  .card.nopad .body,
  .card.nopad .head,
  .card.nopad .foot { padding: 0; }

  /* Per-instance size — overrides the padding tokens so all
     three padding zones (head, body, foot) and the
     internal gap scale together. md matches the pre-size-
     prop default (=var(--tc-space-5, 24 px)) so existing
     cards don't visibly shrink when adopting v1.9. */
  .card.size-sm {
    --tc-card-padding-x: 14px;
    --tc-card-padding-y: 14px;
    --tc-card-gap: 8px;
    font-size: 0.93rem;
  }
  .card.size-md {
    --tc-card-padding-x: 24px;
    --tc-card-padding-y: 22px;
    --tc-card-gap: 14px;
  }
  .card.size-lg {
    --tc-card-padding-x: 32px;
    --tc-card-padding-y: 28px;
    --tc-card-gap: 18px;
  }
  .card.size-sm .title { font-size: 0.96rem; }
  .card.size-lg .title { font-size: 1.22rem; letter-spacing: -0.015em; }
  .card.size-lg .subtitle { font-size: 0.96rem; margin-top: 6px; }

  /* Responsive: shrink padding on narrow viewports so cards
     don't burn ~50 px of horizontal real estate on a 360 px
     phone. Hits every size variant proportionally. */
  @media (max-width: 480px) {
    .card.size-sm {
      --tc-card-padding-x: 12px;
      --tc-card-padding-y: 12px;
    }
    .card.size-md {
      --tc-card-padding-x: 16px;
      --tc-card-padding-y: 16px;
      --tc-card-gap: 12px;
    }
    .card.size-lg {
      --tc-card-padding-x: 20px;
      --tc-card-padding-y: 20px;
      --tc-card-gap: 14px;
    }
  }
`;

build(
  TAG,
  describe({
    props: {
      title: { type: "string", default: "" },
      subtitle: { type: "string", default: "" },
      padded: { type: "boolean", default: true },
      bordered: { type: "boolean", default: true },
      elevated: { type: "boolean", default: false },
      size: { type: "string", default: "md" },
    },
    theme: {
      "tc-card-surface": "var(--tc-color-surface, #ffffff)",
      "tc-card-ink": "var(--tc-color-ink, #14171f)",
      "tc-card-soft": "var(--tc-color-ink-soft, #5a6072)",
      "tc-card-rule": "var(--tc-color-rule, #ece5d3)",
      "tc-card-radius": "var(--tc-radius-lg, 12px)",
      "tc-card-shadow":
        "var(--tc-shadow-md, 0 8px 24px rgba(20, 23, 31, 0.06))",
      "tc-card-font":
        "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
      // Spacing tokens — override per-instance for tighter/looser cards.
      "tc-card-padding-x": "var(--tc-space-5, 20px)",
      "tc-card-padding-y": "var(--tc-space-5, 20px)",
      "tc-card-gap": "var(--tc-space-3, 12px)",
    },
    styles: {
      display: "block",
    },
    stylesheet: STYLE,
    template: ({ props }) => {
      const hasHeaderProps = Boolean(props.title) || Boolean(props.subtitle);
      const rawSize = String(props.size ?? "md").toLowerCase();
      const size = ["sm", "md", "lg"].includes(rawSize) ? rawSize : "md";
      const classes = [
        "card",
        `size-${size}`,
        props.bordered ? "bordered" : "",
        props.elevated ? "elevated" : "",
        // Padding is the default; only stamp `nopad` when the user
        // explicitly opted out. Defending against an undefined prop
        // means the body still has padding out of the box.
        props.padded === false ? "nopad" : "",
        hasHeaderProps ? "has-header" : "",
      ].filter(Boolean).join(" ");

      return html`
        <div class="${classes}">
          <div class="media"><slot name="media"></slot></div>
          <div class="head">
            <slot name="header">
              ${props.title
                ? html`
                  <div class="title">${props.title}</div>
                `
                : ""} ${props.subtitle
                ? html`
                  <div class="subtitle">${props.subtitle}</div>
                `
                : ""}
            </slot>
          </div>
          <div class="body"><slot></slot></div>
          <div class="foot"><slot name="footer"></slot></div>
        </div>
      `;
    },
    afterMount() {
      const host = this as unknown as HTMLElement & {
        _cardCleanup?: () => void;
      };
      const root = host.shadowRoot;
      if (!root) return;
      const card = root.querySelector(".card");
      if (!card) return;

      const occupied = (name: string): boolean => {
        const sel = `slot[name="${name}"]`;
        const slot = root.querySelector<HTMLSlotElement>(sel);
        if (!slot) return false;
        // assignedNodes() (no flatten) ignores fallback content, so this is
        // true only when the author actually slotted something.
        return slot.assignedNodes().some((n) =>
          n.nodeType === Node.ELEMENT_NODE ||
          (n.nodeType === Node.TEXT_NODE && (n.textContent ?? "").trim() !== "")
        );
      };
      const sync = () => {
        card.classList.toggle("has-header-slot", occupied("header"));
        card.classList.toggle("has-footer", occupied("footer"));
        card.classList.toggle("has-media", occupied("media"));
      };
      sync();

      const slots = Array.from(root.querySelectorAll("slot"));
      for (const s of slots) s.addEventListener("slotchange", sync);
      host._cardCleanup = () => {
        for (const s of slots) s.removeEventListener("slotchange", sync);
      };
    },
    unmount() {
      const host = this as unknown as { _cardCleanup?: () => void };
      host._cardCleanup?.();
    },
  }),
);
