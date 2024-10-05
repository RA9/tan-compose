/// <reference lib="deno.ns" />
// test/mod.test.ts
import { describe, build } from '../mod.ts';

Deno.test("describe method should return a component object", () => {
    const result = describe({
      tag: 'button',
      className: 'test-button',
    });
    
    if (result.tag !== 'button') {
      throw new Error("Expected tag to be 'button'");
    }
  });


Deno.test("build method should return a string", () => {
    const result = build("tan-button", {
      tag: 'button',
      className: 'test-button',
    });
    
    if (typeof result !== 'string') {
      throw new Error("Expected result to be a string");
    }
  });