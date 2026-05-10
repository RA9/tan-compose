import type { DescribeOptions } from "./types.ts";

const HOOK_FIELDS = ["beforeMount", "afterMount", "unmount", "action"] as const;

/**
 * Validates and returns a component description.
 *
 * Throws TypeError on invalid options:
 *  - non-object input
 *  - non-string `tag`, `className`, or `template`
 *  - non-array `children` or `emit` or `observedAttributes`
 *  - non-function lifecycle hooks
 *  - non-record `theme` / `styles` / `attributes`
 */
export function describe(options: DescribeOptions): DescribeOptions {
  if (options === null || typeof options !== "object") {
    throw new TypeError("describe(): options must be an object");
  }

  if (options.tag !== undefined && typeof options.tag !== "string") {
    throw new TypeError("describe(): `tag` must be a string");
  }
  if (
    options.className !== undefined && typeof options.className !== "string"
  ) {
    throw new TypeError("describe(): `className` must be a string");
  }
  if (options.template !== undefined && typeof options.template !== "string") {
    throw new TypeError("describe(): `template` must be a string");
  }

  if (options.children !== undefined && !Array.isArray(options.children)) {
    throw new TypeError("describe(): `children` must be an array");
  }
  if (options.emit !== undefined && !Array.isArray(options.emit)) {
    throw new TypeError("describe(): `emit` must be an array");
  }
  if (
    options.observedAttributes !== undefined &&
    (!Array.isArray(options.observedAttributes) ||
      options.observedAttributes.some((a) => typeof a !== "string"))
  ) {
    throw new TypeError(
      "describe(): `observedAttributes` must be an array of strings",
    );
  }

  for (const field of ["theme", "styles", "attributes"] as const) {
    const value = options[field];
    if (
      value !== undefined &&
      (value === null || typeof value !== "object" || Array.isArray(value))
    ) {
      throw new TypeError(`describe(): \`${field}\` must be a record`);
    }
  }

  for (const field of HOOK_FIELDS) {
    const value = options[field];
    if (value !== undefined && typeof value !== "function") {
      throw new TypeError(`describe(): \`${field}\` must be a function`);
    }
  }

  return { ...options };
}
