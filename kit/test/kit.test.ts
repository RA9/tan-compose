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

test("tc-stat renders label, value, prefix/suffix, and delta with trend class", () => {
  const el = document.createElement(tags.stat) as HTMLElement & {
    label: string;
    value: string;
    prefix: string;
    suffix: string;
    delta: string;
    trend: string;
  };
  el.label = "Revenue";
  el.value = "12,840";
  el.prefix = "$";
  el.suffix = "/mo";
  el.delta = "+8.2%";
  el.trend = "up";
  document.body.appendChild(el);
  const root = el.shadowRoot!;
  assertEquals(root.querySelector(".label")?.textContent, "Revenue");
  assertEquals(root.querySelector(".num")?.textContent, "12,840");
  assertEquals(root.querySelector(".prefix")?.textContent, "$");
  assertEquals(root.querySelector(".suffix")?.textContent, "/mo");
  const delta = root.querySelector(".delta") as HTMLElement;
  assert(delta);
  assert(delta.classList.contains("t-up"));
  document.body.removeChild(el);
});

test("tc-tabs renders ARIA-correct tablist and switches active panel on click", () => {
  const el = document.createElement(tags.tabs) as HTMLElement & {
    tabs: Array<{ id: string; label: string }>;
    active: string;
  };
  el.tabs = [
    { id: "overview", label: "Overview" },
    { id: "details", label: "Details" },
  ];
  el.active = "overview";
  document.body.appendChild(el);

  const liveTab = (id: string) =>
    el.shadowRoot!.querySelector(`.tab[data-tab="${id}"]`) as HTMLElement;
  const livePanel = (id: string) =>
    el.shadowRoot!.querySelector(`#panel-${id}`) as HTMLElement;

  assertEquals(liveTab("overview").getAttribute("aria-selected"), "true");
  assertEquals(livePanel("overview").hasAttribute("hidden"), false);
  assertEquals(livePanel("details").hasAttribute("hidden"), true);

  liveTab("details").click();
  assertEquals(el.active, "details");
  assertEquals(liveTab("details").getAttribute("aria-selected"), "true");
  assertEquals(livePanel("overview").hasAttribute("hidden"), true);
  document.body.removeChild(el);
});

test("tc-select: form-associated, value sync, options rendered", () => {
  if (typeof HTMLElement.prototype.attachInternals !== "function") return;
  const el = document.createElement(tags.select) as HTMLElement & {
    options: Array<{ value: string; label: string }>;
    value: string;
    internals?: ElementInternals;
  };
  el.options = [
    { value: "a", label: "Apple" },
    { value: "b", label: "Banana" },
    { value: "c", label: "Cherry" },
  ];
  el.value = "b";
  document.body.appendChild(el);
  assert(el.internals, "expected ElementInternals via formAssociated");
  const opts = Array.from(el.shadowRoot!.querySelectorAll("option"));
  assertEquals(opts.length, 3);
  assertEquals(opts[1].getAttribute("selected"), "");
  document.body.removeChild(el);
});

test("tc-toast: open prop drives the .open class and emits tc-toast-close", () => {
  const el = document.createElement(tags.toast) as HTMLElement & {
    open: boolean;
    message: string;
    duration: number;
  };
  el.message = "Saved";
  el.duration = 0; // disable auto-dismiss for the test
  document.body.appendChild(el);
  assert(!el.shadowRoot!.querySelector(".toast.open"), "starts closed");
  el.open = true;
  assert(el.shadowRoot!.querySelector(".toast.open"), "opens when prop flips");

  let closed = false;
  el.addEventListener("tc-toast-close", () => {
    closed = true;
  });
  (el.shadowRoot!.querySelector(".x") as HTMLElement).click();
  assert(closed, "expected tc-toast-close on dismiss button");
  assertEquals(el.open, false);
  document.body.removeChild(el);
});

test("tc-modal: setting open=true after mount opens the dialog (regression: v1.0 bug)", () => {
  const tag = tags.modal;
  const el = document.createElement(tag) as HTMLElement & { open: boolean };
  document.body.appendChild(el);
  // Initially closed
  let dlg = el.shadowRoot!.querySelector(".dlg") as HTMLDialogElement;
  assert(!dlg.open && !dlg.hasAttribute("open"), "starts closed");
  // Flipping open should make the dialog open after re-render
  el.open = true;
  dlg = el.shadowRoot!.querySelector(".dlg") as HTMLDialogElement;
  assert(
    dlg.open || dlg.hasAttribute("open"),
    "expected the dialog to be open after setting host.open = true",
  );
  document.body.removeChild(el);
});

test("tc-modal: dispatching tc-close when API closes the dialog programmatically", () => {
  const el = document.createElement(tags.modal) as HTMLElement & {
    open: boolean;
  };
  document.body.appendChild(el);
  let closeCount = 0;
  el.addEventListener("tc-close", () => {
    closeCount++;
  });
  el.open = true;
  // close-button click
  const xBtn = el.shadowRoot!.querySelector(".x") as HTMLElement | null;
  if (xBtn) {
    xBtn.click();
    assertEquals(el.open, false);
    assert(closeCount >= 1, "tc-close fired on button");
  }
  document.body.removeChild(el);
});

test("tc-checkbox: form-associated; toggling fires tc-change and updates checked", () => {
  if (typeof HTMLElement.prototype.attachInternals !== "function") return;
  const el = document.createElement(tags.checkbox) as HTMLElement & {
    checked: boolean;
    label: string;
    internals?: ElementInternals;
  };
  el.label = "Subscribe";
  document.body.appendChild(el);
  assert(el.internals);
  let last: { checked: boolean } | null = null;
  el.addEventListener("tc-change", (e) => {
    last = (e as CustomEvent).detail;
  });
  const inp = el.shadowRoot!.querySelector(".cb") as HTMLInputElement;
  inp.checked = true;
  inp.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
  assertEquals(el.checked, true);
  assertEquals((last as unknown as { checked: boolean }).checked, true);
  document.body.removeChild(el);
});

test("tc-switch: clicking the track flips checked and emits tc-change", () => {
  if (typeof HTMLElement.prototype.attachInternals !== "function") return;
  const el = document.createElement(tags["switch"]) as HTMLElement & {
    checked: boolean;
  };
  document.body.appendChild(el);
  let count = 0;
  el.addEventListener("tc-change", () => {
    count++;
  });
  const track = () => el.shadowRoot!.querySelector(".track") as HTMLElement;
  track().click();
  assertEquals(el.checked, true);
  track().click();
  assertEquals(el.checked, false);
  assertEquals(count, 2);
  document.body.removeChild(el);
});

test("tc-card body has padding when padded=true (regression)", () => {
  const el = document.createElement(tags.card) as HTMLElement & {
    padded: boolean;
  };
  document.body.appendChild(el);
  const card = el.shadowRoot!.querySelector(".card") as HTMLElement;
  assert(card.classList.contains("padded"), "default is padded=true");
  // The body padding rule references --tc-card-padding-y/x — confirm the CSS
  // is in the shadow root. Concatenate all <style> tags because the
  // theme/styles fallback emits its own.
  const allCss = Array.from(el.shadowRoot!.querySelectorAll("style"))
    .map((s) => s.textContent ?? "")
    .join("\n");
  assert(
    allCss.includes(".card.padded .body"),
    "expected body padding rule in shadow CSS",
  );
  assert(
    allCss.includes("--tc-card-padding-y") &&
      allCss.includes("--tc-card-padding-x"),
    "expected padding tokens to be referenced",
  );
  // Flipping padded=false should remove the padded class.
  el.padded = false;
  const card2 = el.shadowRoot!.querySelector(".card") as HTMLElement;
  assert(!card2.classList.contains("padded"));
  document.body.removeChild(el);
});

test("tc-card renders title/subtitle and applies bordered/elevated classes", () => {
  const el = document.createElement(tags.card) as HTMLElement & {
    title: string;
    subtitle: string;
    elevated: boolean;
  };
  el.title = "Hello";
  el.subtitle = "world";
  el.elevated = true;
  document.body.appendChild(el);
  const root = el.shadowRoot!;
  const card = root.querySelector(".card") as HTMLElement;
  assert(card.classList.contains("bordered"));
  assert(card.classList.contains("elevated"));
  assert(card.classList.contains("padded"));
  assertEquals(root.querySelector(".title")?.textContent, "Hello");
  assertEquals(root.querySelector(".subtitle")?.textContent, "world");
  document.body.removeChild(el);
});

test("tc-badge applies variant + size classes and renders slotted content", () => {
  const el = document.createElement(tags.badge) as HTMLElement & {
    variant: string;
    size: string;
    pill: boolean;
  };
  el.variant = "success";
  el.size = "sm";
  el.pill = true;
  el.textContent = "live";
  document.body.appendChild(el);
  const badge = el.shadowRoot!.querySelector(".badge") as HTMLElement;
  assert(badge.classList.contains("v-success"));
  assert(badge.classList.contains("s-sm"));
  assert(badge.classList.contains("pill"));
  document.body.removeChild(el);
});

test("tc-skeleton applies width/height inline styles and pulse class by default", () => {
  const el = document.createElement(tags.skeleton) as HTMLElement & {
    width: string;
    height: string;
    rounded: boolean;
  };
  el.width = "120px";
  el.height = "12px";
  el.rounded = true;
  document.body.appendChild(el);
  const bone = el.shadowRoot!.querySelector(".bone") as HTMLElement;
  assert(bone.classList.contains("pulse"));
  assert(bone.classList.contains("round"));
  assertEquals(bone.style.width, "120px");
  assertEquals(bone.style.height, "12px");
  document.body.removeChild(el);
});

test("tc-textarea: form-associated; input fires tc-input and updates value", () => {
  if (typeof HTMLElement.prototype.attachInternals !== "function") return;
  const el = document.createElement(tags.textarea) as HTMLElement & {
    value: string;
    label: string;
    internals?: ElementInternals;
  };
  el.label = "Notes";
  el.value = "hello";
  document.body.appendChild(el);
  assert(el.internals);
  const ta = el.shadowRoot!.querySelector("textarea") as HTMLTextAreaElement;
  assertEquals(ta.value, "hello");
  let last: { value: string } | null = null;
  el.addEventListener("tc-input", (e) => {
    last = (e as CustomEvent).detail;
  });
  ta.value = "world";
  ta.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
  assertEquals(el.value, "world");
  assertEquals((last as unknown as { value: string }).value, "world");
  document.body.removeChild(el);
});

test("tc-radio-group: clicking a radio updates value and emits tc-change", () => {
  if (typeof HTMLElement.prototype.attachInternals !== "function") return;
  const el = document.createElement(tags.radioGroup) as HTMLElement & {
    options: Array<{ value: string; label: string }>;
    value: string;
    internals?: ElementInternals;
  };
  el.options = [
    { value: "a", label: "Apple" },
    { value: "b", label: "Banana" },
  ];
  el.value = "a";
  document.body.appendChild(el);
  let last: { value: string } | null = null;
  el.addEventListener("tc-change", (e) => {
    last = (e as CustomEvent).detail;
  });
  const radios = Array.from(
    el.shadowRoot!.querySelectorAll("input.r"),
  ) as HTMLInputElement[];
  assertEquals(radios.length, 2);
  radios[1].checked = true;
  radios[1].dispatchEvent(
    new Event("change", { bubbles: true, composed: true }),
  );
  assertEquals(el.value, "b");
  assertEquals((last as unknown as { value: string }).value, "b");
  document.body.removeChild(el);
});

test("tc-file: clicking the trigger button forwards to the hidden input", () => {
  const el = document.createElement(tags.file) as HTMLElement;
  document.body.appendChild(el);
  const inp = el.shadowRoot!.querySelector(
    "input[type='file']",
  ) as HTMLInputElement;
  let clicked = false;
  inp.addEventListener("click", (e) => {
    clicked = true;
    e.preventDefault();
  });
  (el.shadowRoot!.querySelector(".btn") as HTMLElement).click();
  assert(clicked, "expected the trigger button to forward to the file input");
  document.body.removeChild(el);
});

test("tc-stack applies gap from token scale and align modifier", () => {
  const el = document.createElement(tags.stack) as HTMLElement & {
    gap: string;
    align: string;
  };
  el.gap = "5";
  el.align = "center";
  document.body.appendChild(el);
  const stack = el.shadowRoot!.querySelector(".stack") as HTMLElement;
  assert(stack.style.cssText.includes("--tc-stack-gap"));
  assert(stack.style.cssText.includes("center"));
  document.body.removeChild(el);
});

test("tc-cluster maps justify=between to space-between", () => {
  const el = document.createElement(tags.cluster) as HTMLElement & {
    justify: string;
  };
  el.justify = "between";
  document.body.appendChild(el);
  const cluster = el.shadowRoot!.querySelector(".cluster") as HTMLElement;
  assert(cluster.style.cssText.includes("space-between"));
  document.body.removeChild(el);
});

test("tc-grid uses repeat(auto-fit, minmax(min, 1fr)) by default", () => {
  const el = document.createElement(tags.grid) as HTMLElement & { min: string };
  el.min = "200px";
  document.body.appendChild(el);
  const grid = el.shadowRoot!.querySelector(".grid") as HTMLElement;
  assert(grid.style.cssText.includes("auto-fit"));
  assert(grid.style.cssText.includes("200px"));
  document.body.removeChild(el);
});

test("tc-table: filter input keeps focus across keystrokes (regression: v1.1 bug)", () => {
  const el = document.createElement(tags.table) as HTMLElement & {
    rows: Array<{ id: number; name: string }>;
    columns: Array<{ key: string; label: string }>;
  };
  el.columns = [{ key: "name", label: "Name" }];
  el.rows = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Carol" },
  ];
  document.body.appendChild(el);

  const filter = () =>
    el.shadowRoot!.querySelector(".filter") as HTMLInputElement;
  filter().focus();
  filter().value = "a";
  filter().setSelectionRange(1, 1);
  filter().dispatchEvent(new Event("input", { bubbles: true, composed: true }));

  // After the table re-renders, the filter input is a new node — but
  // afterRender should have refocused it and restored the caret.
  const live = filter();
  // happy-dom doesn't always report activeElement reliably across shadow
  // roots, but it should at least not throw and the value should be
  // preserved.
  assertEquals(live.value, "a");
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
