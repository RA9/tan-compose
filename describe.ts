import type { DescribeOptions, PropDef } from "./types.ts";

const HOOK_FIELDS = [
  "beforeMount",
  "afterMount",
  "unmount",
  "action",
  "formAssociatedCallback",
  "formDisabledCallback",
  "formResetCallback",
  "formStateRestoreCallback",
] as const;
const VALID_PROP_TYPES = new Set(["string", "number", "boolean", "json"]);

/**
 * Validates and returns a component description.
 *
 * Throws TypeError on invalid options:
 *  - non-object input
 *  - non-string `tag`, `className`
 *  - `template` not a string or function
 *  - non-array `children`, `emit`, `observedAttributes`
 *  - non-function lifecycle hooks
 *  - non-record `theme` / `styles` / `attributes` / `events` / `props`
 *  - prop defs with invalid `type`
 *  - both `children` and `for` set on the same node
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
  if (
    options.template !== undefined &&
    typeof options.template !== "string" &&
    typeof options.template !== "function"
  ) {
    throw new TypeError("describe(): `template` must be a string or function");
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

  for (
    const field of [
      "theme",
      "styles",
      "attributes",
      "events",
      "refs",
    ] as const
  ) {
    const value = options[field];
    if (
      value !== undefined &&
      (value === null || typeof value !== "object" || Array.isArray(value))
    ) {
      throw new TypeError(`describe(): \`${field}\` must be a record`);
    }
  }

  if (options.refs !== undefined) {
    for (const [name, selector] of Object.entries(options.refs)) {
      if (typeof selector !== "string") {
        throw new TypeError(
          `describe(): refs.${name} must be a CSS selector string`,
        );
      }
    }
  }

  if (
    options.formAssociated !== undefined &&
    typeof options.formAssociated !== "boolean"
  ) {
    throw new TypeError("describe(): `formAssociated` must be a boolean");
  }

  for (const field of HOOK_FIELDS) {
    const value = options[field];
    if (value !== undefined && typeof value !== "function") {
      throw new TypeError(`describe(): \`${field}\` must be a function`);
    }
  }

  if (options.if !== undefined && typeof options.if !== "function") {
    throw new TypeError("describe(): `if` must be a function");
  }

  if (options.for !== undefined) {
    const list = options.for;
    if (list === null || typeof list !== "object" || Array.isArray(list)) {
      throw new TypeError("describe(): `for` must be a record");
    }
    if (typeof list.items !== "function") {
      throw new TypeError("describe(): `for.items` must be a function");
    }
    if (typeof list.key !== "function") {
      throw new TypeError("describe(): `for.key` must be a function");
    }
    if (typeof list.render !== "function") {
      throw new TypeError("describe(): `for.render` must be a function");
    }
    if (options.children !== undefined) {
      throw new TypeError(
        "describe(): cannot set both `children` and `for` on the same node",
      );
    }
  }

  if (options.props !== undefined) {
    const props = options.props;
    if (props === null || typeof props !== "object" || Array.isArray(props)) {
      throw new TypeError("describe(): `props` must be a record");
    }
    for (
      const [name, def] of Object.entries(props as Record<string, PropDef>)
    ) {
      if (def === null || typeof def !== "object" || Array.isArray(def)) {
        throw new TypeError(
          `describe(): props.${name} must be a record`,
        );
      }
      if (!VALID_PROP_TYPES.has(def.type)) {
        throw new TypeError(
          `describe(): props.${name}.type must be one of "string", "number", "boolean", "json"`,
        );
      }
    }
  }

  return { ...options };
}
