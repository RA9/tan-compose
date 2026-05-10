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
  assert(iconNames.length > 30, "expected ~40 icons");
  assert(iconNames.includes("check"));
  assert(iconNames.includes("search"));
  assert(iconNames.includes("user"));
});
