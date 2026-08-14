/**
 * `<tc-block-login>` — a ready-made login page template. Split layout:
 * a tinted brand panel on the left, a centered sign-in form on the right.
 * Drop it into a page, wire the submit event to your auth call, and skin
 * it with the global `--tc-color-*` tokens.
 *
 * Props:
 *   brand         string  (default "Acme") — brand wordmark in the side panel
 *   headline      string  (default "Everything your team needs, in one place.")
 *   features      json    Array<string> — bullet list shown in the side panel
 *   title         string  (default "Welcome back")
 *   subtitle      string  (default "Sign in to your account to continue.")
 *   emailLabel    string  (default "Email")
 *   passwordLabel string  (default "Password")
 *   rememberLabel string  (default "Remember me")
 *   submitLabel   string  (default "Sign in")
 *   forgotLabel   string  (default "Forgot password?")
 *   forgotHref    string  (default "#")
 *
 * Slots:
 *   side    — replaces the entire left brand panel
 *   footer  — content below the submit button (e.g. a sign-up link)
 *
 * Events (composed, bubble out of the shadow root):
 *   tc-block-login-submit  cancelable. Fires when the form is submitted
 *                          (click or Enter). `detail.values` is
 *                          `{ email, password, remember }`.
 *
 * Theme variables on :host:
 *   --tc-block-side-bg, --tc-block-side-fg, --tc-block-side-soft,
 *   --tc-block-surface, --tc-block-rule, --tc-block-radius,
 *   --tc-block-shadow, --tc-block-font
 */

import { build, describe, html, map } from "@ra9/tan-compose";

// Side-effect imports register the primitives this block composes.
import "../components/input.ts";
import "../components/button.ts";
import "../components/checkbox.ts";

const TAG = "tc-block-login";

export const tagName = TAG;

const STYLE = `
  :host { display: block; font-family: var(--tc-block-font); }
  .shell {
    display: grid;
    grid-template-columns: minmax(320px, 5fr) minmax(360px, 7fr);
    min-height: 100vh;
    background: var(--tc-color-bg, #faf8f3);
    color: var(--tc-color-ink, #14171f);
  }

  /* ---- Left brand panel ---- */
  .side {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 24px;
    padding: 40px;
    background:
      radial-gradient(1200px 600px at -10% -10%, rgba(161, 105, 57, 0.22), transparent 60%),
      var(--tc-block-side-bg);
    color: var(--tc-block-side-fg);
  }
  .brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 1.05rem;
    font-weight: 700;
    letter-spacing: -0.01em;
  }
  .brand-mark {
    width: 24px;
    height: 24px;
    border-radius: 7px;
    background: var(--tc-color-accent, #a16939);
  }
  .side h2 {
    font-size: 1.9rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.15;
    margin: 0;
    max-width: 24ch;
  }
  .features {
    list-style: none;
    margin: 28px 0 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .features li {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 0.95rem;
    color: var(--tc-block-side-soft);
  }
  .features .check {
    flex: 0 0 auto;
    width: 20px;
    height: 20px;
    margin-top: 1px;
    border-radius: 999px;
    display: inline-grid;
    place-items: center;
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--tc-color-accent, #a16939);
    background: var(--tc-color-accent-soft, #efe2cf);
  }
  .side-foot {
    font-size: 0.8rem;
    color: var(--tc-block-side-soft);
    opacity: 0.8;
  }

  /* ---- Right form panel ---- */
  .form-panel {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 24px;
  }
  .form {
    width: 100%;
    max-width: 380px;
  }
  .form h1 {
    font-size: 1.7rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin: 0 0 6px;
  }
  .form .subtitle {
    margin: 0 0 28px;
    color: var(--tc-color-ink-soft, #4a5061);
    font-size: 0.95rem;
  }
  .field {
    margin-bottom: 16px;
  }
  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 20px;
  }
  .forgot {
    font-size: 0.85rem;
    color: var(--tc-color-accent, #a16939);
    text-decoration: none;
    font-weight: 500;
  }
  .forgot:hover { text-decoration: underline; }
  .footer {
    margin-top: 18px;
    text-align: center;
    font-size: 0.9rem;
    color: var(--tc-color-ink-soft, #4a5061);
  }

  @media (max-width: 860px) {
    .shell { grid-template-columns: 1fr; min-height: 0; }
    .side {
      padding: 28px 24px;
      background:
        radial-gradient(800px 400px at 20% -20%, rgba(161, 105, 57, 0.18), transparent 60%),
        var(--tc-block-side-bg);
    }
    .side h2 { font-size: 1.5rem; }
    .features { margin-top: 18px; }
    .form-panel { padding: 28px 20px 48px; }
  }
`;

build(
  TAG,
  describe({
    props: {
      brand: { type: "string", default: "Acme" },
      headline: {
        type: "string",
        default: "Everything your team needs, in one place.",
      },
      features: {
        type: "json",
        default: [
          "Realtime collaboration across every project",
          "Role-based access and audit logs built in",
          "Deploys to your cloud in minutes, not weeks",
        ],
      },
      title: { type: "string", default: "Welcome back" },
      subtitle: {
        type: "string",
        default: "Sign in to your account to continue.",
      },
      emailLabel: { type: "string", default: "Email" },
      passwordLabel: { type: "string", default: "Password" },
      rememberLabel: { type: "string", default: "Remember me" },
      submitLabel: { type: "string", default: "Sign in" },
      forgotLabel: { type: "string", default: "Forgot password?" },
      forgotHref: { type: "string", default: "#" },
    },
    theme: {
      "tc-block-side-bg": "var(--tc-color-surface, #ffffff)",
      "tc-block-side-fg": "var(--tc-color-ink, #14171f)",
      "tc-block-side-soft": "var(--tc-color-ink-soft, #4a5061)",
      "tc-block-surface": "var(--tc-color-surface, #ffffff)",
      "tc-block-rule": "var(--tc-color-rule, #ece5d3)",
      "tc-block-radius": "var(--tc-radius-lg, 12px)",
      "tc-block-shadow":
        "var(--tc-shadow-md, 0 8px 24px rgba(20, 23, 31, 0.06))",
      "tc-block-font":
        "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
    },
    styles: {
      display: "block",
    },
    stylesheet: STYLE,
    refs: {
      email: '[name="email"]',
      password: '[name="password"]',
      remember: '[name="remember"]',
    },
    template: ({ props }) => {
      const features = (props.features as string[] | undefined) ?? [];
      return html`
        <div class="shell">
          <aside class="side">
            <slot name="side">
              <span class="brand">
                <span class="brand-mark" aria-hidden="true"></span>
                ${props.brand}
              </span>
              <div>
                <h2>${props.headline}</h2>
                ${features.length > 0
                  ? html`
                    <ul class="features">
                      ${map(features, (f) =>
                        html`
                          <li>
                            <span class="check" aria-hidden="true">✓</span>
                            <span>${f}</span>
                          </li>
                        `)}
                    </ul>
                  `
                  : ""}
              </div>
              <div class="side-foot">
                &copy; ${new Date().getFullYear()} ${props
                  .brand}. All rights reserved.
              </div>
            </slot>
          </aside>

          <main class="form-panel">
            <form class="form" novalidate>
              <h1>${props.title}</h1>
              <p class="subtitle">${props.subtitle}</p>

              <div class="field">
                <tc-input
                  name="email"
                  type="email"
                  label="${props.emailLabel}"
                  placeholder="you@example.com"
                  autocomplete="email"
                ></tc-input>
              </div>
              <div class="field">
                <tc-input
                  name="password"
                  type="password"
                  label="${props.passwordLabel}"
                  placeholder="••••••••"
                  autocomplete="current-password"
                ></tc-input>
              </div>

              <div class="row">
                <tc-checkbox
                  name="remember"
                  label="${props.rememberLabel}"
                ></tc-checkbox>
                <a class="forgot" href="${props.forgotHref}">${props
                  .forgotLabel}</a>
              </div>

              <tc-button
                type="submit"
                variant="primary"
                block
                part="submit"
              >${props.submitLabel}</tc-button>

              <div class="footer"><slot name="footer"></slot></div>
            </form>
          </main>
        </div>
      `;
    },
    events: {
      "submit form": (event, ctx) => {
        event.preventDefault();
        const email = readValue(ctx.refs.email);
        const password = readValue(ctx.refs.password);
        const remember = readChecked(ctx.refs.remember);
        ctx.emit("tc-block-login-submit", {
          values: { email, password, remember },
        });
      },
    },
  }),
);

function readValue(el: Element | null): string {
  return String((el as { value?: unknown } | null)?.value ?? "");
}

function readChecked(el: Element | null): boolean {
  return Boolean((el as { checked?: unknown } | null)?.checked ?? false);
}
