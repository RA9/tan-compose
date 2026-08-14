/// <reference lib="deno.ns" />
import { test } from "./setup.ts";
import { assertEquals } from "@std/assert";

// Importing the side-effect modules registers the blocks + their primitives.
import { tags } from "../blocks/mod.ts";

function clickSubmit(root: ShadowRoot): void {
  const host = root.querySelector('tc-button[type="submit"]') as
    | HTMLElement
    | null;
  const btn = host?.shadowRoot?.querySelector("button.root") as
    | HTMLButtonElement
    | null;
  btn?.click();
}

test("tc-block-login renders the split shell and emits values on submit", () => {
  const el = document.createElement(tags.login);
  document.body.appendChild(el);
  const root = el.shadowRoot!;
  const email = root.querySelector('[name="email"]') as HTMLElement & {
    value: string;
  };
  const password = root.querySelector('[name="password"]') as HTMLElement & {
    value: string;
  };
  email.value = "a@b.co";
  password.value = "s3cret";

  const emitted: {
    detail?: { values: { email: string; password: string; remember: boolean } };
  } = {};
  el.addEventListener("tc-block-login-submit", (e) => {
    emitted.detail = (e as CustomEvent).detail;
  });

  clickSubmit(root);

  assertEquals(emitted.detail?.values.email, "a@b.co");
  assertEquals(emitted.detail?.values.password, "s3cret");
  assertEquals(emitted.detail?.values.remember, false);
  document.body.removeChild(el);
});

test("tc-block-signup emits name/email/password/terms on submit", () => {
  const el = document.createElement(tags.signup);
  document.body.appendChild(el);
  const root = el.shadowRoot!;
  (root.querySelector('[name="name"]') as HTMLElement & { value: string })
    .value = "Ada";
  (root.querySelector('[name="email"]') as HTMLElement & { value: string })
    .value = "ada@example.com";
  (root.querySelector('[name="password"]') as HTMLElement & { value: string })
    .value = "pw";

  const emitted: { detail?: { values: Record<string, unknown> } } = {};
  el.addEventListener("tc-block-signup-submit", (e) => {
    emitted.detail = (e as CustomEvent).detail;
  });

  clickSubmit(root);

  assertEquals(emitted.detail?.values.name, "Ada");
  assertEquals(emitted.detail?.values.email, "ada@example.com");
  assertEquals(emitted.detail?.values.password, "pw");
  assertEquals(emitted.detail?.values.terms, false);
  document.body.removeChild(el);
});

test("tc-block-dashboard renders nav items and emits tc-block-dashboard-nav", () => {
  const el = document.createElement(tags.dashboard) as HTMLElement & {
    nav: Array<{ id: string; label: string }>;
    active: string;
  };
  el.nav = [
    { id: "overview", label: "Overview" },
    { id: "billing", label: "Billing" },
  ];
  document.body.appendChild(el);

  const buttons = Array.from(
    el.shadowRoot!.querySelectorAll(".nav-item"),
  ) as HTMLElement[];
  assertEquals(buttons.length, 2);
  assertEquals(el.active, "overview");

  const emitted: { detail?: { id: string } } = {};
  el.addEventListener("tc-block-dashboard-nav", (e) => {
    emitted.detail = (e as CustomEvent).detail;
  });

  buttons[1].click();
  assertEquals(el.active, "billing");
  assertEquals(emitted.detail?.id, "billing");
  document.body.removeChild(el);
});

test("tc-block-settings switches the active panel and emits change", () => {
  const el = document.createElement(tags.settings) as HTMLElement & {
    sections: Array<{ id: string; label: string }>;
    active: string;
  };
  el.sections = [
    { id: "profile", label: "Profile" },
    { id: "billing", label: "Billing" },
  ];
  document.body.appendChild(el);
  const root = el.shadowRoot!;

  const panelsBefore = Array.from(
    root.querySelectorAll(".panel"),
  ) as HTMLElement[];
  assertEquals(panelsBefore[0].hasAttribute("hidden"), false);
  assertEquals(panelsBefore[1].hasAttribute("hidden"), true);

  const emitted: { detail?: { active: string; previous: string } } = {};
  el.addEventListener("tc-block-settings-change", (e) => {
    emitted.detail = (e as CustomEvent).detail;
  });

  (root.querySelectorAll(".section-btn")[1] as HTMLElement).click();
  assertEquals(el.active, "billing");
  assertEquals(emitted.detail?.active, "billing");
  assertEquals(emitted.detail?.previous, "profile");

  // Re-query — the panels are rebuilt on re-render.
  const panelsAfter = Array.from(
    root.querySelectorAll(".panel"),
  ) as HTMLElement[];
  assertEquals(panelsAfter[0].hasAttribute("hidden"), true);
  assertEquals(panelsAfter[1].hasAttribute("hidden"), false);
  document.body.removeChild(el);
});

test("tc-block-pricing renders a card per tier and emits the selected tier", () => {
  const el = document.createElement(tags.pricing) as HTMLElement & {
    tiers: Array<
      { name: string; price: string; cta: string; features: string[] }
    >;
  };
  el.tiers = [
    { name: "Free", price: "0", cta: "Start", features: ["A", "B"] },
    { name: "Pro", price: "29", cta: "Upgrade", features: ["A", "B", "C"] },
  ];
  document.body.appendChild(el);
  const root = el.shadowRoot!;
  assertEquals(root.querySelectorAll(".tier").length, 2);

  const emitted: { detail?: { tier: { name: string } } } = {};
  el.addEventListener("tc-block-pricing-select", (e) => {
    emitted.detail = (e as CustomEvent).detail;
  });

  (root.querySelectorAll(".cta")[1] as HTMLButtonElement).click();
  assertEquals(emitted.detail?.tier.name, "Pro");
  document.body.removeChild(el);
});
