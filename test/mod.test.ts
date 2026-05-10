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

// ---------------------------------------------------------------------------
// v0.3: properties, function templates, event delegation, for, if
// ---------------------------------------------------------------------------

test("props: initial value comes from attribute when present", () => {
  const tag = uniqueTag();
  build(
    tag,
    describe({
      props: {
        count: { type: "number", default: 0 },
        label: { type: "string", default: "default" },
      },
    }),
  );
  const el = document.createElement(tag) as HTMLElement & {
    count: number;
    label: string;
  };
  el.setAttribute("count", "42");
  el.setAttribute("label", "hello");
  document.body.appendChild(el);
  assertEquals(el.count, 42);
  assertEquals(el.label, "hello");
  document.body.removeChild(el);
});

test("props: default applies when attribute is absent", () => {
  const tag = uniqueTag();
  build(
    tag,
    describe({
      props: { ratio: { type: "number", default: 1.5 } },
    }),
  );
  const el = document.createElement(tag) as HTMLElement & { ratio: number };
  document.body.appendChild(el);
  assertEquals(el.ratio, 1.5);
  document.body.removeChild(el);
});

test("props: setter triggers re-render and updates DOM", () => {
  const tag = uniqueTag();
  build(
    tag,
    describe({
      props: { name: { type: "string", default: "world" } },
      template: ({ props }) => `<h1>hello ${props.name}</h1>`,
    }),
  );
  const el = document.createElement(tag) as HTMLElement & { name: string };
  document.body.appendChild(el);
  assertEquals(el.shadowRoot?.querySelector("h1")?.textContent, "hello world");
  el.name = "carlos";
  assertEquals(el.shadowRoot?.querySelector("h1")?.textContent, "hello carlos");
  document.body.removeChild(el);
});

test("props: json type parses arrays/objects from attributes", () => {
  const tag = uniqueTag();
  build(
    tag,
    describe({
      props: { items: { type: "json", default: [] } },
    }),
  );
  const el = document.createElement(tag) as HTMLElement & { items: number[] };
  el.setAttribute("items", "[1,2,3]");
  document.body.appendChild(el);
  assertEquals(el.items, [1, 2, 3]);
  el.items = [4, 5];
  assertEquals(el.items, [4, 5]);
  document.body.removeChild(el);
});

test("props: boolean coerces from string and reflects when configured", () => {
  const tag = uniqueTag();
  build(
    tag,
    describe({
      props: { open: { type: "boolean", default: false, reflect: true } },
    }),
  );
  const el = document.createElement(tag) as HTMLElement & { open: boolean };
  document.body.appendChild(el);
  assertEquals(el.open, false);
  el.open = true;
  assertEquals(el.getAttribute("open"), "");
  el.open = false;
  assertEquals(el.hasAttribute("open"), false);
  document.body.removeChild(el);
});

test("template fn: receives ctx with props, state, setState", () => {
  const tag = uniqueTag();
  build(
    tag,
    describe({
      props: { greeting: { type: "string", default: "hi" } },
      template: ({ props, state }) =>
        `<p>${props.greeting} #${state.tick ?? 0}</p>`,
    }),
  );
  const el = document.createElement(tag) as HTMLElement & {
    setState(k: string, v: unknown): void;
  };
  document.body.appendChild(el);
  assertEquals(el.shadowRoot?.querySelector("p")?.textContent, "hi #0");
  el.setState("tick", 7);
  assertEquals(el.shadowRoot?.querySelector("p")?.textContent, "hi #7");
  document.body.removeChild(el);
});

test("events: delegated click matches selector and fires handler", () => {
  const tag = uniqueTag();
  let received: string | null = null;
  build(
    tag,
    describe({
      template: `
        <button class="primary">P</button>
        <button class="danger">D</button>
      `,
      events: {
        "click .primary": () => {
          received = "primary";
        },
        "click .danger": () => {
          received = "danger";
        },
      },
    }),
  );
  const el = document.createElement(tag) as HTMLElement;
  document.body.appendChild(el);
  (el.shadowRoot?.querySelector(".primary") as HTMLElement).click();
  assertEquals(received, "primary");
  (el.shadowRoot?.querySelector(".danger") as HTMLElement).click();
  assertEquals(received, "danger");
  document.body.removeChild(el);
});

test("events: cleaned up on disconnect", () => {
  const tag = uniqueTag();
  let clicks = 0;
  build(
    tag,
    describe({
      template: `<button class="b">B</button>`,
      events: {
        "click .b": () => {
          clicks += 1;
        },
      },
    }),
  );
  const el = document.createElement(tag) as HTMLElement;
  document.body.appendChild(el);
  const btn = el.shadowRoot?.querySelector(".b") as HTMLElement;
  btn.click();
  assertEquals(clicks, 1);
  document.body.removeChild(el);
  // After disconnect, the listener on shadowRoot is gone. Click on the
  // detached button does nothing.
  btn.click();
  assertEquals(clicks, 1);
});

test("for: renders a keyed list and reuses DOM nodes across renders", () => {
  const tag = uniqueTag();
  const itemDescription = (item: { id: number; label: string }) =>
    describe({
      tag: "li",
      attributes: { "data-id": String(item.id) },
      template: item.label,
    });

  build(
    tag,
    describe({
      props: {
        rows: {
          type: "json",
          default: [] as Array<{ id: number; label: string }>,
        },
      },
      children: [
        describe({
          tag: "ul",
          for: {
            items: (
              { props },
            ) => (props.rows as Array<{ id: number; label: string }>),
            key: (item) => (item as { id: number }).id,
            render: (item) =>
              itemDescription(item as { id: number; label: string }),
          },
        }),
      ],
    }),
  );

  const el = document.createElement(tag) as HTMLElement & {
    rows: Array<{ id: number; label: string }>;
  };
  const a = { id: 1, label: "a" };
  const b = { id: 2, label: "b" };
  const c = { id: 3, label: "c" };
  el.rows = [a, b, c];
  document.body.appendChild(el);

  const liOf = (id: number) =>
    el.shadowRoot?.querySelector(`li[data-id="${id}"]`) as HTMLElement;
  const li1 = liOf(1);
  const li2 = liOf(2);
  assert(li1 && li2, "expected initial rows");

  // Reorder: same items, new array. li1 and li2 must be reused.
  el.rows = [c, a, b];
  assertEquals(liOf(1), li1, "li with id=1 must be the same DOM node");
  assertEquals(liOf(2), li2, "li with id=2 must be the same DOM node");

  // Replace one item: identity changes for id=2 → new node, others reused.
  const b2 = { id: 2, label: "b prime" };
  el.rows = [a, b2, c];
  assertEquals(liOf(1), li1);
  assert(liOf(2) !== li2, "li with changed item must be a new node");

  // Remove an item: stale node should be gone.
  el.rows = [a];
  assertEquals(liOf(2), null);
  assertEquals(liOf(3), null);

  document.body.removeChild(el);
});

test("for: order of DOM children matches the items array", () => {
  const tag = uniqueTag();
  build(
    tag,
    describe({
      props: { items: { type: "json", default: [] as string[] } },
      children: [
        describe({
          tag: "ol",
          for: {
            items: ({ props }) => props.items as string[],
            key: (s) => s as string,
            render: (s) => describe({ tag: "li", template: s as string }),
          },
        }),
      ],
    }),
  );
  const el = document.createElement(tag) as HTMLElement & { items: string[] };
  el.items = ["x", "y", "z"];
  document.body.appendChild(el);
  const labels = Array.from(el.shadowRoot?.querySelectorAll("li") ?? []).map(
    (li) => li.textContent,
  );
  assertEquals(labels, ["x", "y", "z"]);
  el.items = ["z", "x"];
  const labels2 = Array.from(el.shadowRoot?.querySelectorAll("li") ?? []).map(
    (li) => li.textContent,
  );
  assertEquals(labels2, ["z", "x"]);
  document.body.removeChild(el);
});

test("if: false omits the child subtree", () => {
  const tag = uniqueTag();
  build(
    tag,
    describe({
      props: { show: { type: "boolean", default: false } },
      children: [
        describe({
          tag: "div",
          className: "panel",
          template: "panel content",
          if: ({ props }) => !!props.show,
        }),
      ],
    }),
  );
  const el = document.createElement(tag) as HTMLElement & { show: boolean };
  document.body.appendChild(el);
  assertEquals(el.shadowRoot?.querySelector(".panel"), null);
  el.show = true;
  assert(
    el.shadowRoot?.querySelector(".panel"),
    "expected panel after show flips true",
  );
  el.show = false;
  assertEquals(el.shadowRoot?.querySelector(".panel"), null);
  document.body.removeChild(el);
});
