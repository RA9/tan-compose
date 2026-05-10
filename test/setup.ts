/// <reference lib="deno.ns" />
import { Window } from "happy-dom";

// Install a Window into globalThis once per test process so that
// HTMLElement, customElements, document, etc. are available to build.ts.
const window = new Window({ url: "https://tan-compose.test" });

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
];

for (const prop of props) {
  // @ts-expect-error: happy-dom typings don't perfectly match lib.dom
  target[prop] = window[prop];
}

export { window };

/**
 * Wrapper around Deno.test that disables resource/op sanitizers.
 * happy-dom keeps internal idle timers alive across tests, which Deno's
 * default leak detector flags as test-boundary leaks. Disabling per-test
 * sanitizers is the standard pattern for DOM emulation libraries.
 */
type TestFn = (t: Deno.TestContext) => void | Promise<void>;
export function test(name: string, fn: TestFn): void {
  Deno.test({ name, fn, sanitizeOps: false, sanitizeResources: false });
}
