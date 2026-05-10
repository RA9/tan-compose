/// <reference lib="deno.ns" />
import { test } from "./setup.ts";
import { assert, assertEquals } from "@std/assert";

// Importing the side-effect modules registers the components.
import { tags } from "../mod.ts";

test("tc-button registers and renders content from default slot", () => {
  const el = document.createElement(tags.button);
  el.textContent = "Click me";
  document.body.appendChild(el);
  const root = el.shadowRoot;
  assert(root, "expected shadow root");
  const btn = root!.querySelector("button.root");
  assert(btn, "expected internal button element");
  assert(btn!.classList.contains("v-primary"), "default variant is primary");
  assert(btn!.classList.contains("s-md"), "default size is md");
  document.body.removeChild(el);
});

test("tc-button: variant and size props change rendered classes", () => {
  const el = document.createElement(tags.button) as HTMLElement & {
    variant: string;
    size: string;
  };
  document.body.appendChild(el);
  el.variant = "danger";
  el.size = "lg";
  const btn = el.shadowRoot!.querySelector("button.root")!;
  assert(btn.classList.contains("v-danger"));
  assert(btn.classList.contains("s-lg"));
  document.body.removeChild(el);
});

test("tc-button: disabled prop reflects to attribute and disables the button", () => {
  const el = document.createElement(tags.button) as HTMLElement & {
    disabled: boolean;
  };
  document.body.appendChild(el);
  assertEquals(el.hasAttribute("disabled"), false);
  el.disabled = true;
  assertEquals(el.getAttribute("disabled"), "");
  const btn = el.shadowRoot!.querySelector("button.root") as HTMLButtonElement;
  assert(btn.disabled, "internal <button> must be disabled");
  document.body.removeChild(el);
});

test("tc-input renders label and value, and is form-associated", () => {
  if (typeof HTMLElement.prototype.attachInternals !== "function") return;
  const el = document.createElement(tags.input) as HTMLElement & {
    value: string;
    label: string;
    internals?: ElementInternals;
  };
  el.label = "Email";
  el.value = "a@b.co";
  document.body.appendChild(el);
  assert(el.internals, "expected ElementInternals via formAssociated");
  const labelEl = el.shadowRoot!.querySelector(".label");
  assertEquals(labelEl?.textContent?.trim(), "Email");
  const inp = el.shadowRoot!.querySelector("input") as HTMLInputElement;
  assertEquals(inp.value, "a@b.co");
  document.body.removeChild(el);
});

test("tc-input: error prop paints the input invalid and shows the message", () => {
  const el = document.createElement(tags.input) as HTMLElement & {
    error: string;
  };
  el.error = "Required";
  document.body.appendChild(el);
  const inp = el.shadowRoot!.querySelector("input")!;
  assert(inp.classList.contains("invalid"));
  assertEquals(inp.getAttribute("aria-invalid"), "true");
  const errEl = el.shadowRoot!.querySelector(".error");
  assertEquals(errEl?.textContent, "Required");
  document.body.removeChild(el);
});

test("tc-table: renders rows and reflects row count", () => {
  const el = document.createElement(tags.table) as HTMLElement & {
    rows: Array<{ id: number; name: string; email: string }>;
    columns: Array<{ key: string; label: string }>;
    pageSize: number;
  };
  el.columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
  ];
  el.rows = [
    { id: 1, name: "Ada", email: "ada@example.com" },
    { id: 2, name: "Linus", email: "linus@example.com" },
    { id: 3, name: "Grace", email: "grace@example.com" },
  ];
  el.pageSize = 10;
  document.body.appendChild(el);

  // Header
  const headers = Array.from(el.shadowRoot!.querySelectorAll("th")).map((h) =>
    (h.textContent ?? "").replace(/[▲▼]/g, "").trim()
  );
  assertEquals(headers, ["Name", "Email"]);

  // Pager count
  const count = el.shadowRoot!.querySelector(".pager .count")?.textContent;
  assertEquals(count, "3 of 3 rows");

  document.body.removeChild(el);
});

test("tc-table: filter narrows visible rows", () => {
  const el = document.createElement(tags.table) as HTMLElement & {
    rows: Array<Record<string, unknown>>;
    columns: Array<{ key: string; label: string }>;
  };
  el.columns = [{ key: "name", label: "Name" }];
  el.rows = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Alex" },
  ];
  document.body.appendChild(el);

  const inp = el.shadowRoot!.querySelector(".filter") as HTMLInputElement;
  inp.value = "al";
  inp.dispatchEvent(new Event("input", { bubbles: true, composed: true }));

  const count = el.shadowRoot!.querySelector(".pager .count")?.textContent;
  assertEquals(count, "2 of 3 rows", "filter should match Alice and Alex");

  document.body.removeChild(el);
});

test("tc-table: sort header click toggles asc → desc → none", () => {
  const el = document.createElement(tags.table) as HTMLElement & {
    rows: Array<Record<string, unknown>>;
    columns: Array<{ key: string; label: string; sortable?: boolean }>;
  };
  el.columns = [{ key: "name", label: "Name", sortable: true }];
  el.rows = [
    { id: 1, name: "Charlie" },
    { id: 2, name: "Alpha" },
    { id: 3, name: "Bravo" },
  ];
  document.body.appendChild(el);

  // Re-query after each click — the table re-renders and replaces the th node.
  const liveTh = () =>
    el.shadowRoot!.querySelector("th[data-col='name']") as HTMLElement;

  liveTh().click();
  assertEquals(liveTh().getAttribute("aria-sort"), "ascending");

  liveTh().click();
  assertEquals(liveTh().getAttribute("aria-sort"), "descending");

  liveTh().click();
  assertEquals(liveTh().getAttribute("aria-sort"), "none");

  document.body.removeChild(el);
});
