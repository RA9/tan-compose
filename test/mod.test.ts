/// <reference lib="deno.ns" />
import { test } from "./setup.ts";
import { assert, assertEquals, assertThrows } from "@std/assert";
import {
  build,
  describe,
  getRegisteredComponents,
  isComponentRegistered,
} from "../mod.ts";

// Each test gets a unique tag because customElements.define is global.
let counter = 0;
const uniqueTag = (prefix = "tc") =>
  `${prefix}-${++counter}-${Date.now().toString(36)}`;

test("describe() returns a copy of options", () => {
  const input = { tag: "button", className: "x" };
  const result = describe(input);
  assertEquals(result.tag, "button");
  assertEquals(result.className, "x");
  assert(result !== input, "describe should return a fresh object");
});

test("describe() throws on non-object input", () => {
  // @ts-expect-error testing invalid runtime input
  assertThrows(() => describe(null), TypeError);
  // @ts-expect-error testing invalid runtime input
  assertThrows(() => describe("oops"), TypeError);
});

test("describe() rejects bad field types", () => {
  // @ts-expect-error: invalid tag type at runtime
  assertThrows(() => describe({ tag: 42 }), TypeError);
  // @ts-expect-error: invalid children type at runtime
  assertThrows(() => describe({ children: "no" }), TypeError);
  // @ts-expect-error: invalid hook type at runtime
  assertThrows(() => describe({ beforeMount: "not a fn" }), TypeError);
  // @ts-expect-error: invalid observedAttributes element type at runtime
  assertThrows(() => describe({ observedAttributes: ["ok", 1] }), TypeError);
});

test("build() rejects invalid tag names", () => {
  assertThrows(() => build("nohyphen", describe({})), TypeError);
  assertThrows(() => build("UPPER-CASE", describe({})), TypeError);
  assertThrows(() => build("-leading", describe({})), TypeError);
});

test("build() registers a component and reports it as registered", () => {
  const tag = uniqueTag();
  build(tag, describe({ template: "<p>hi</p>" }));
  assert(isComponentRegistered(tag));
  assert(getRegisteredComponents().includes(tag));
});

test("build() warns on duplicate registration but does not throw", () => {
  const tag = uniqueTag();
  const original = console.warn;
  let warned = false;
  console.warn = () => {
    warned = true;
  };
  try {
    build(tag, describe({}));
    build(tag, describe({}));
    assert(warned, "expected a warning on duplicate registration");
  } finally {
    console.warn = original;
  }
});

test("lifecycle hooks fire in order: beforeMount → afterMount → unmount", () => {
  const tag = uniqueTag();
  const calls: string[] = [];
  build(
    tag,
    describe({
      beforeMount() {
        calls.push("beforeMount");
      },
      afterMount() {
        calls.push("afterMount");
      },
      unmount() {
        calls.push("unmount");
      },
    }),
  );
  const el = document.createElement(tag);
  document.body.appendChild(el);
  document.body.removeChild(el);
  assertEquals(calls, ["beforeMount", "afterMount", "unmount"]);
});

test("template is rendered into shadow container", () => {
  const tag = uniqueTag();
  build(tag, describe({ template: "<span class='x'>hi</span>" }));
  const el = document.createElement(tag) as HTMLElement;
  document.body.appendChild(el);
  const span = el.shadowRoot?.querySelector(".x");
  assert(span, "expected template content in shadow root");
  assertEquals(span?.textContent, "hi");
  document.body.removeChild(el);
});

test("children are appended in order", () => {
  const tag = uniqueTag();
  build(
    tag,
    describe({
      children: [
        describe({ tag: "span", template: "a" }),
        describe({ tag: "span", template: "b" }),
        describe({ tag: "span", template: "c" }),
      ],
    }),
  );
  const el = document.createElement(tag) as HTMLElement;
  document.body.appendChild(el);
  const spans = el.shadowRoot?.querySelectorAll("span") ?? [];
  assertEquals(spans.length, 3);
  assertEquals(spans[0].textContent, "a");
  assertEquals(spans[2].textContent, "c");
  document.body.removeChild(el);
});

test("setState triggers re-render", () => {
  const tag = uniqueTag();
  let renders = 0;
  build(
    tag,
    describe({
      template: "<p>x</p>",
      afterMount() {
        renders++;
      },
    }),
  );
  const el = document.createElement(tag) as HTMLElement & {
    setState(k: string, v: unknown): void;
    getState<T>(k: string): T | undefined;
  };
  document.body.appendChild(el);
  const before = el.shadowRoot?.querySelector("p");
  el.setState("count", 1);
  assertEquals(el.getState<number>("count"), 1);
  const after = el.shadowRoot?.querySelector("p");
  // re-render replaces children, so the <p> reference must differ
  assert(before !== after, "expected re-render to replace template node");
  document.body.removeChild(el);
});

test("setState skips re-render when value is identical", () => {
  const tag = uniqueTag();
  build(tag, describe({ template: "<p>x</p>" }));
  const el = document.createElement(tag) as HTMLElement & {
    setState(k: string, v: unknown): void;
  };
  document.body.appendChild(el);
  const first = el.shadowRoot?.querySelector("p");
  el.setState("k", 5);
  const second = el.shadowRoot?.querySelector("p");
  el.setState("k", 5); // same value
  const third = el.shadowRoot?.querySelector("p");
  assert(first !== second, "first setState should re-render");
  assertEquals(second, third, "identical setState should NOT re-render");
  document.body.removeChild(el);
});

test("observedAttributes triggers re-render on attribute change", () => {
  const tag = uniqueTag();
  build(
    tag,
    describe({
      template: "<p>x</p>",
      observedAttributes: ["data-text"],
    }),
  );
  const el = document.createElement(tag) as HTMLElement;
  document.body.appendChild(el);
  const before = el.shadowRoot?.querySelector("p");
  el.setAttribute("data-text", "hello");
  const after = el.shadowRoot?.querySelector("p");
  assert(before !== after, "expected attribute change to re-render");
  document.body.removeChild(el);
});

test("emitEvent dispatches a CustomEvent and matching emit handler fires", () => {
  const tag = uniqueTag();
  let received: unknown = undefined;
  build(
    tag,
    describe({
      template: "<p>x</p>",
      emit: [
        {
          name: "ping",
          handler: (e) => {
            received = (e as CustomEvent).detail;
          },
        },
      ],
    }),
  );
  const el = document.createElement(tag) as HTMLElement & {
    emitEvent(name: string, data: unknown): void;
  };
  document.body.appendChild(el);
  el.emitEvent("ping", { hi: 1 });
  assertEquals(received, { hi: 1 });
  document.body.removeChild(el);
});

test("action handler is removed on unmount (no leak)", () => {
  const tag = uniqueTag();
  let clicks = 0;
  build(
    tag,
    describe({
      template: "<p>x</p>",
      action: () => {
        clicks++;
      },
    }),
  );
  const el = document.createElement(tag) as HTMLElement;
  document.body.appendChild(el);
  el.click();
  assertEquals(clicks, 1);
  document.body.removeChild(el);
  el.click(); // listener should be gone
  assertEquals(clicks, 1, "expected click handler to be removed on disconnect");
});

test("re-render cleans up previous child action listeners", () => {
  const tag = uniqueTag();
  let clicks = 0;
  build(
    tag,
    describe({
      observedAttributes: ["data-x"],
      children: [
        describe({
          tag: "button",
          template: "click",
          action: () => {
            clicks++;
          },
        }),
      ],
    }),
  );
  const el = document.createElement(tag) as HTMLElement;
  document.body.appendChild(el);
  const oldButton = el.shadowRoot?.querySelector("button") as HTMLElement;
  // Force re-render by changing observed attribute
  el.setAttribute("data-x", "1");
  const newButton = el.shadowRoot?.querySelector("button") as HTMLElement;
  assert(oldButton !== newButton, "expected re-render to replace button");
  oldButton.click(); // stale node — should NOT fire (and definitely not leak)
  newButton.click();
  assertEquals(clicks, 1, "only the live button should respond to clicks");
  document.body.removeChild(el);
});

test("theme variables are exposed as CSS custom properties on :host", () => {
  const tag = uniqueTag();
  build(
    tag,
    describe({
      theme: { brand: "tomato" },
      template: "<p>x</p>",
    }),
  );
  const el = document.createElement(tag) as HTMLElement;
  document.body.appendChild(el);
  const styleTags = el.shadowRoot?.querySelectorAll("style") ?? [];
  const allCss = Array.from(styleTags).map((s) => s.textContent).join("\n");
  assert(
    allCss.includes("--brand: tomato"),
    "expected CSS variable in :host block",
  );
  document.body.removeChild(el);
});
