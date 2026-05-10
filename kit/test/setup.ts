/// <reference lib="deno.ns" />
import { Window } from "happy-dom";

const window = new Window({ url: "https://tan-compose-kit.test" });

const target = globalThis as unknown as Record<string, unknown>;
const props: Array<keyof Window> = [
  "window",
  "document",
  "HTMLElement",
  "HTMLDivElement",
  "Element",
  "Node",
  "customElements",
  "CustomEvent",
  "Event",
  "ShadowRoot",
  "MutationObserver",
];

for (const prop of props) {
  // @ts-expect-error: happy-dom typings don't perfectly match lib.dom
  target[prop] = window[prop];
}

export { window };

type TestFn = (t: Deno.TestContext) => void | Promise<void>;
export function test(name: string, fn: TestFn): void {
  Deno.test({ name, fn, sanitizeOps: false, sanitizeResources: false });
}
