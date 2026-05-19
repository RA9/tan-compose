/// <reference lib="deno.ns" />
import { test } from "./setup.ts";
import { assert, assertEquals } from "@std/assert";
import { iconNames, tagName } from "../mod.ts";

test("registers <tc-icon>", () => {
  assertEquals(tagName, "tc-icon");
  assert(customElements.get(tagName), "tc-icon must be registered");
});

test("renders the requested icon's svg path", () => {
  const el = document.createElement(tagName) as HTMLElement & {
    name: string;
    size: string;
  };
  el.name = "check";
  document.body.appendChild(el);
  const svg = el.shadowRoot!.querySelector("svg");
  assert(svg, "expected svg in shadow root");
  // Lucide "check" is a polyline.
  assert(
    svg!.querySelector("polyline"),
    "expected polyline child for check icon",
  );
  document.body.removeChild(el);
});

test("size and stroke pass through to the svg", () => {
  const el = document.createElement(tagName) as HTMLElement & {
    name: string;
    size: string;
    stroke: string;
  };
  el.name = "search";
  el.size = "32";
  el.stroke = "tomato";
  document.body.appendChild(el);
  const svg = el.shadowRoot!.querySelector("svg")!;
  assertEquals(svg.getAttribute("width"), "32");
  assertEquals(svg.getAttribute("height"), "32");
  assertEquals(svg.getAttribute("stroke"), "tomato");
  document.body.removeChild(el);
});

test("title prop sets role=img and renders <title>", () => {
  const el = document.createElement(tagName) as HTMLElement & {
    name: string;
    title: string;
  };
  el.name = "settings";
  el.title = "Settings";
  document.body.appendChild(el);
  const svg = el.shadowRoot!.querySelector("svg")!;
  assertEquals(svg.getAttribute("role"), "img");
  assertEquals(svg.getAttribute("aria-label"), "Settings");
  const title = svg.querySelector("title");
  assertEquals(title?.textContent, "Settings");
  document.body.removeChild(el);
});

test("unknown icon falls back to a placeholder", () => {
  const el = document.createElement(tagName) as HTMLElement & { name: string };
  el.name = "this-icon-does-not-exist";
  document.body.appendChild(el);
  const svg = el.shadowRoot!.querySelector("svg")!;
  assert(svg.querySelector("rect"), "fallback uses a rect");
  document.body.removeChild(el);
});

test("iconNames includes the bundled set", () => {
  assert(iconNames.length >= 98, "expected at least 98 icons after v0.3.0");
  assert(iconNames.includes("check"));
  assert(iconNames.includes("search"));
  assert(iconNames.includes("user"));
});

test("iconNames includes the v0.3.0 original (non-Lucide) icons", () => {
  for (
    const name of [
      "ai",
      "confetti",
      "forecast",
      "pulse",
      "receipt-scan",
      "recurring",
      "spark",
      "subscription",
      "token",
      "verified",
    ]
  ) {
    assert(iconNames.includes(name), `expected "${name}" in iconNames`);
  }
});

test("renders the verified icon with a hex badge + check polyline", () => {
  const el = document.createElement(tagName) as HTMLElement & { name: string };
  el.name = "verified";
  document.body.appendChild(el);
  const svg = el.shadowRoot!.querySelector("svg")!;
  // Hex badge body is a single closed <path>; check stroke is a polyline.
  assert(svg.querySelector("path"), "verified has a hex badge path");
  assert(svg.querySelector("polyline"), "verified has a check polyline");
  document.body.removeChild(el);
});

test("iconNames includes the v0.2.0 finance + commerce additions", () => {
  // Spot-check one per new category to catch accidental regressions
  // from copy-paste edits to icons.ts.
  for (
    const name of [
      "banknote",
      "credit-card",
      "wallet",
      "dollar-sign",
      "receipt",
      "trending-up",
      "shopping-cart",
      "bell",
      "file-text",
      "lock",
      "map-pin",
      "star",
      "grid",
      "user-plus",
    ]
  ) {
    assert(iconNames.includes(name), `expected "${name}" in iconNames`);
  }
});

test("renders the banknote icon (v0.2.0 sanity)", () => {
  const el = document.createElement(tagName) as HTMLElement & { name: string };
  el.name = "banknote";
  document.body.appendChild(el);
  const svg = el.shadowRoot!.querySelector("svg");
  assert(svg, "expected svg in shadow root");
  // banknote = a rect bill outline + a circle for the portrait.
  assert(svg!.querySelector("rect"), "banknote has a rect bill outline");
  assert(svg!.querySelector("circle"), "banknote has a portrait circle");
  document.body.removeChild(el);
});
