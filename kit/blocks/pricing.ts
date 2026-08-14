/**
 * `<tc-block-pricing>` — a ready-made pricing page template. Renders a
 * responsive grid of plan cards from a single JSON `tiers` prop; the
 * featured tier is highlighted.
 *
 * Props:
 *   title    string  (default "Simple, transparent pricing")
 *   subtitle string  (default "Start free and scale as you grow. Cancel anytime.")
 *   tiers    json    Array<{
 *                      name, price, period, description, badge?, featured?,
 *                      cta, features: string[]
 *                    }>
 *   currency string  (default "$") — rendered before `price`
 *
 * Events (composed, bubble out of the shadow root):
 *   tc-block-pricing-select  detail: { tier } — fires when a plan's CTA
 *                            button is activated.
 *
 * Theme variables on :host:
 *   --tc-block-surface, --tc-block-rule, --tc-block-radius,
 *   --tc-block-shadow, --tc-block-font, --tc-block-featured-border
 */

import { build, describe, html, map } from "@ra9/tan-compose";

const TAG = "tc-block-pricing";

export const tagName = TAG;

interface Tier {
  name: string;
  price: string;
  period: string;
  description: string;
  badge?: string;
  featured?: boolean;
  cta: string;
  features: string[];
}

const STYLE = `
  :host { display: block; font-family: var(--tc-block-font); }
  .shell {
    max-width: 1080px;
    margin: 0 auto;
    padding: 56px 24px 72px;
    color: var(--tc-color-ink, #14171f);
  }
  .head {
    text-align: center;
    max-width: 560px;
    margin: 0 auto 44px;
  }
  .head h1 {
    margin: 0 0 8px;
    font-size: 2.1rem;
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.1;
  }
  .head .subtitle {
    margin: 0;
    color: var(--tc-color-ink-soft, #4a5061);
    font-size: 1.02rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 20px;
    align-items: stretch;
  }
  .tier {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 26px 24px;
    background: var(--tc-block-surface);
    border: 1px solid var(--tc-block-rule);
    border-radius: var(--tc-block-radius);
    box-shadow: var(--tc-block-shadow);
  }
  .tier.featured {
    border-color: var(--tc-block-featured-border);
    border-width: 2px;
    padding-top: 40px;
  }
  .badge {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    padding: 4px 12px;
    border-radius: 999px;
    color: var(--tc-color-accent, #a16939);
    background: var(--tc-color-accent-soft, #efe2cf);
  }
  .tier .name {
    font-size: 0.95rem;
    font-weight: 700;
  }
  .price-row {
    display: flex;
    align-items: baseline;
    gap: 6px;
  }
  .price {
    font-size: 2.4rem;
    font-weight: 800;
    letter-spacing: -0.03em;
    font-variant-numeric: tabular-nums;
  }
  .period {
    color: var(--tc-color-ink-muted, #6b7280);
    font-size: 0.9rem;
  }
  .description {
    color: var(--tc-color-ink-soft, #4a5061);
    font-size: 0.9rem;
    line-height: 1.5;
  }
  .features {
    list-style: none;
    margin: 0;
    padding: 16px 0 4px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
    border-top: 1px solid var(--tc-block-rule);
  }
  .features li {
    display: flex;
    align-items: flex-start;
    gap: 9px;
    font-size: 0.9rem;
  }
  .features .check {
    flex: 0 0 auto;
    color: var(--tc-color-success, #207a5b);
    font-weight: 700;
    line-height: 1.4;
  }
  .cta {
    margin-top: 4px;
    font: inherit;
    font-size: 0.92rem;
    font-weight: 600;
    padding: 11px 18px;
    border-radius: var(--tc-radius-md, 8px);
    border: 1px solid transparent;
    cursor: pointer;
    background: var(--tc-color-ink, #14171f);
    color: var(--tc-color-surface, #ffffff);
    transition: filter 0.15s ease, background 0.15s ease;
  }
  .cta:hover { filter: brightness(1.08); }
  .cta:focus-visible {
    outline: 2px solid var(--tc-color-accent, #a16939);
    outline-offset: 2px;
  }
  .cta.secondary {
    background: var(--tc-color-surface, #ffffff);
    color: var(--tc-color-ink, #14171f);
    border-color: var(--tc-color-rule-strong, #d9cfb8);
  }
  .cta.secondary:hover { background: rgba(20, 23, 31, 0.04); }
`;

build(
  TAG,
  describe({
    props: {
      title: { type: "string", default: "Simple, transparent pricing" },
      subtitle: {
        type: "string",
        default: "Start free and scale as you grow. Cancel anytime.",
      },
      currency: { type: "string", default: "$" },
      tiers: {
        type: "json",
        default: [
          {
            name: "Starter",
            price: "0",
            period: "/month",
            description: "For individuals getting started.",
            cta: "Start for free",
            features: [
              "Up to 3 projects",
              "1 GB storage",
              "Community support",
            ],
          },
          {
            name: "Pro",
            price: "29",
            period: "/month",
            description: "For growing teams that need more power.",
            cta: "Start 14-day trial",
            featured: true,
            badge: "Most popular",
            features: [
              "Unlimited projects",
              "100 GB storage",
              "Advanced analytics",
              "Priority support",
            ],
          },
          {
            name: "Enterprise",
            price: "Custom",
            period: "",
            description: "For organizations with advanced needs.",
            cta: "Contact sales",
            features: [
              "SSO & SCIM",
              "Audit logs",
              "Dedicated success manager",
            ],
          },
        ],
      },
    },
    theme: {
      "tc-block-surface": "var(--tc-color-surface, #ffffff)",
      "tc-block-rule": "var(--tc-color-rule, #ece5d3)",
      "tc-block-radius": "var(--tc-radius-lg, 12px)",
      "tc-block-shadow":
        "var(--tc-shadow-md, 0 8px 24px rgba(20, 23, 31, 0.06))",
      "tc-block-featured-border": "var(--tc-color-accent, #a16939)",
      "tc-block-font":
        "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
    },
    styles: {
      display: "block",
    },
    stylesheet: STYLE,
    template: ({ props }) => {
      const tiers = (props.tiers as Tier[] | undefined) ?? [];
      return html`
        <div class="shell">
          <header class="head">
            <h1>${props.title}</h1>
            <p class="subtitle">${props.subtitle}</p>
          </header>

          <div class="grid">
            ${map(tiers, (tier, index) =>
              html`
                <div class="tier ${tier.featured ? "featured" : ""}">
                  ${tier.badge
                    ? html`
                      <span class="badge">${tier.badge}</span>
                    `
                    : ""}
                  <div class="name">${tier.name}</div>
                  <div class="price-row">
                    <span class="price">${isNumericPrice(tier.price)
                      ? props.currency
                      : ""}${tier.price}</span>
                    ${tier.period
                      ? html`
                        <span class="period">${tier.period}</span>
                      `
                      : ""}
                  </div>
                  <div class="description">${tier.description}</div>
                  <ul class="features">
                    ${map(tier.features ?? [], (f) =>
                      html`
                        <li>
                          <span class="check" aria-hidden="true">✓</span>
                          <span>${f}</span>
                        </li>
                      `)}
                  </ul>
                  <button
                    type="button"
                    class="cta ${tier.featured ? "" : "secondary"}"
                    data-tier="${index}"
                    part="cta"
                  >
                    ${tier.cta}
                  </button>
                </div>
              `)}
          </div>
        </div>
      `;
    },
    events: {
      "click .cta": (event, ctx) => {
        const btn = (event.target as HTMLElement).closest(
          ".cta",
        ) as HTMLElement | null;
        if (!btn) return;
        const raw = btn.dataset.tier;
        if (raw == null) return;
        const tiers = (ctx.props.tiers as Tier[] | undefined) ?? [];
        const tier = tiers[Number(raw)];
        if (!tier) return;
        ctx.emit("tc-block-pricing-select", { tier });
      },
    },
  }),
);

/** Currency is only prefixed for numeric prices ("29"), not "Custom". */
function isNumericPrice(price: string | undefined): boolean {
  return /^[\d.,]+$/.test(String(price ?? ""));
}
