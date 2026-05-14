// ../describe.ts
var HOOK_FIELDS = [
  "beforeMount",
  "afterMount",
  "afterRender",
  "unmount",
  "action",
  "formAssociatedCallback",
  "formDisabledCallback",
  "formResetCallback",
  "formStateRestoreCallback"
];
var VALID_PROP_TYPES = /* @__PURE__ */ new Set(["string", "number", "boolean", "json"]);
function describe(options) {
  if (options === null || typeof options !== "object") {
    throw new TypeError("describe(): options must be an object");
  }
  if (options.tag !== void 0 && typeof options.tag !== "string") {
    throw new TypeError("describe(): `tag` must be a string");
  }
  if (options.className !== void 0 && typeof options.className !== "string") {
    throw new TypeError("describe(): `className` must be a string");
  }
  if (options.template !== void 0 && typeof options.template !== "string" && typeof options.template !== "function") {
    throw new TypeError("describe(): `template` must be a string or function");
  }
  if (options.children !== void 0 && !Array.isArray(options.children)) {
    throw new TypeError("describe(): `children` must be an array");
  }
  if (options.emit !== void 0 && !Array.isArray(options.emit)) {
    throw new TypeError("describe(): `emit` must be an array");
  }
  if (options.observedAttributes !== void 0 && (!Array.isArray(options.observedAttributes) || options.observedAttributes.some((a) => typeof a !== "string"))) {
    throw new TypeError(
      "describe(): `observedAttributes` must be an array of strings"
    );
  }
  for (const field of [
    "theme",
    "styles",
    "attributes",
    "events",
    "refs"
  ]) {
    const value = options[field];
    if (value !== void 0 && (value === null || typeof value !== "object" || Array.isArray(value))) {
      throw new TypeError(`describe(): \`${field}\` must be a record`);
    }
  }
  if (options.refs !== void 0) {
    for (const [name, selector] of Object.entries(options.refs)) {
      if (typeof selector !== "string") {
        throw new TypeError(
          `describe(): refs.${name} must be a CSS selector string`
        );
      }
    }
  }
  if (options.formAssociated !== void 0 && typeof options.formAssociated !== "boolean") {
    throw new TypeError("describe(): `formAssociated` must be a boolean");
  }
  for (const field of HOOK_FIELDS) {
    const value = options[field];
    if (value !== void 0 && typeof value !== "function") {
      throw new TypeError(`describe(): \`${field}\` must be a function`);
    }
  }
  if (options.if !== void 0 && typeof options.if !== "function") {
    throw new TypeError("describe(): `if` must be a function");
  }
  if (options.for !== void 0) {
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
  }
  if (options.props !== void 0) {
    const props = options.props;
    if (props === null || typeof props !== "object" || Array.isArray(props)) {
      throw new TypeError("describe(): `props` must be a record");
    }
    for (const [name, def] of Object.entries(props)) {
      if (def === null || typeof def !== "object" || Array.isArray(def)) {
        throw new TypeError(
          `describe(): props.${name} must be a record`
        );
      }
      if (!VALID_PROP_TYPES.has(def.type)) {
        throw new TypeError(
          `describe(): props.${name}.type must be one of "string", "number", "boolean", "json"`
        );
      }
    }
  }
  return { ...options };
}

// ../build.ts
var componentRegistry = /* @__PURE__ */ new Map();
var TAG_NAME_PATTERN = /^[a-z][a-z0-9]*(-[a-z0-9]+)+$/;
var EVENT_KEY_PATTERN = /^(\S+)(?:\s+(.+))?$/;
function build(tagName37, description) {
  if (typeof tagName37 !== "string" || !TAG_NAME_PATTERN.test(tagName37)) {
    throw new TypeError(
      `build(): "${tagName37}" is not a valid custom element name (must be lowercase and contain a hyphen).`
    );
  }
  if (componentRegistry.has(tagName37)) {
    console.warn(
      `Component "${tagName37}" is already registered. Skipping re-registration.`
    );
    return tagName37;
  }
  if (typeof HTMLElement === "undefined" || typeof customElements === "undefined") {
    console.warn(
      "HTMLElement or customElements not available; skipping component registration."
    );
    return tagName37;
  }
  const observed = Array.from(
    /* @__PURE__ */ new Set([
      ...description.observedAttributes ?? [],
      ...Object.keys(description.props ?? {})
    ])
  );
  const propDefs = description.props ?? {};
  const refsConfig = description.refs ?? {};
  const sharedSheets = buildSharedSheets(description);
  class CustomComponent extends HTMLElement {
    static get observedAttributes() {
      return observed;
    }
    static get formAssociated() {
      return description.formAssociated === true;
    }
    isMounted = false;
    mountCleanups = [];
    renderCleanups = [];
    state = /* @__PURE__ */ new Map();
    propValues = /* @__PURE__ */ new Map();
    listSlots = /* @__PURE__ */ new WeakMap();
    currentRefs = {};
    container;
    ctx;
    rendering = false;
    renderQueued = false;
    internals;
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: "open" });
      if (description.formAssociated && typeof this.attachInternals === "function") {
        this.internals = this.attachInternals();
      }
      applySharedSheets(shadow, sharedSheets);
      this.container = document.createElement("div");
      this.container.className = description.className ? `container ${description.className}` : "container";
      shadow.appendChild(this.container);
      if (description.attributes) {
        applyAttributes(this, description.attributes);
      }
      this.ctx = createCtx(
        this,
        this.propValues,
        this.state,
        () => this.currentRefs
      );
      this.initProps();
    }
    get refs() {
      return this.currentRefs;
    }
    initProps() {
      for (const [name, def] of Object.entries(propDefs)) {
        const attrValue = this.getAttribute(name);
        const initial = attrValue !== null ? coerceProp(attrValue, def.type) : def.default;
        this.propValues.set(name, initial);
        this.maybeSyncFormValue(name, initial);
        Object.defineProperty(this, name, {
          configurable: true,
          enumerable: true,
          get: () => this.propValues.get(name),
          set: (value) => {
            const coerced = coerceForSet(value, def.type);
            const prev = this.propValues.get(name);
            if (Object.is(prev, coerced))
              return;
            this.propValues.set(name, coerced);
            if (def.reflect)
              reflectAttribute(this, name, coerced, def.type);
            this.maybeSyncFormValue(name, coerced);
            if (this.isMounted)
              this.scheduleRender();
          }
        });
      }
    }
    maybeSyncFormValue(name, value) {
      if (!this.internals)
        return;
      if (name !== "value")
        return;
      const formValue = value == null ? null : String(value);
      this.internals.setFormValue(formValue);
    }
    connectedCallback() {
      if (this.isMounted)
        return;
      try {
        description.beforeMount?.call(this);
      } catch (err) {
        console.error(`[tan-compose] beforeMount threw for <${tagName37}>:`, err);
      }
      this.renderInternal();
      if (description.action) {
        const handler = description.action;
        this.addEventListener("click", handler);
        this.mountCleanups.push(
          () => this.removeEventListener("click", handler)
        );
      }
      if (description.emit) {
        for (const evt of description.emit) {
          this.addEventListener(evt.name, evt.handler);
          this.mountCleanups.push(
            () => this.removeEventListener(evt.name, evt.handler)
          );
        }
      }
      if (description.events) {
        this.attachDelegatedEvents(description.events);
      }
      this.isMounted = true;
      try {
        description.afterMount?.call(this);
      } catch (err) {
        console.error(`[tan-compose] afterMount threw for <${tagName37}>:`, err);
      }
    }
    disconnectedCallback() {
      try {
        description.unmount?.call(this);
      } catch (err) {
        console.error(`[tan-compose] unmount threw for <${tagName37}>:`, err);
      }
      runCleanups(this.mountCleanups);
      runCleanups(this.renderCleanups);
      this.flushListSlots();
      this.isMounted = false;
    }
    flushListSlots() {
      walkListNodes(description, (desc) => {
        const slot = this.listSlots.get(desc);
        if (!slot)
          return;
        for (const item of slot.cache.values())
          runCleanups(item.cleanups);
        slot.cache.clear();
      });
    }
    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue === newValue)
        return;
      if (Object.prototype.hasOwnProperty.call(propDefs, name)) {
        const def = propDefs[name];
        const coerced = newValue !== null ? coerceProp(newValue, def.type) : def.default;
        const prev = this.propValues.get(name);
        if (!Object.is(prev, coerced)) {
          this.propValues.set(name, coerced);
          if (this.isMounted)
            this.scheduleRender();
        }
        return;
      }
      this.state.set(name, newValue);
      if (this.isMounted)
        this.scheduleRender();
    }
    setState(key, value) {
      const prev = this.state.get(key);
      if (Object.is(prev, value))
        return;
      this.state.set(key, value);
      if (this.isMounted)
        this.scheduleRender();
    }
    getState(key) {
      return this.state.get(key);
    }
    render() {
      this.renderInternal();
    }
    emitEvent(eventName, data) {
      this.dispatchEvent(
        new CustomEvent(eventName, {
          detail: data,
          bubbles: true,
          composed: true
        })
      );
    }
    scheduleRender() {
      if (this.rendering) {
        this.renderQueued = true;
        return;
      }
      this.renderInternal();
    }
    getOrCreateSlot(desc) {
      let slot = this.listSlots.get(desc);
      if (!slot) {
        slot = { cache: /* @__PURE__ */ new Map() };
        this.listSlots.set(desc, slot);
      }
      return slot;
    }
    renderInternal() {
      this.rendering = true;
      const focusSnapshot = this.captureFocusInShadow();
      try {
        runCleanups(this.renderCleanups);
        this.container.replaceChildren();
        const scope = {
          host: this,
          cleanups: this.renderCleanups,
          ctx: this.ctx
        };
        if (description.template !== void 0) {
          const html = typeof description.template === "function" ? description.template(this.ctx) : description.template;
          if (html)
            this.container.innerHTML = html;
        }
        if (description.children) {
          for (const childDesc of description.children) {
            const node = buildChild(
              childDesc,
              scope,
              (d) => this.getOrCreateSlot(d)
            );
            if (node)
              this.container.appendChild(node);
          }
        }
        this.container.appendChild(document.createElement("slot"));
        this.refreshRefs();
      } finally {
        this.rendering = false;
      }
      if (focusSnapshot)
        this.restoreFocusInShadow(focusSnapshot);
      if (this.renderQueued) {
        this.renderQueued = false;
        this.renderInternal();
        return;
      }
      try {
        description.afterRender?.call(this);
      } catch (err) {
        console.error(`[tan-compose] afterRender threw for <${tagName37}>:`, err);
      }
    }
    captureFocusInShadow() {
      const root = this.shadowRoot;
      if (!root)
        return null;
      const active = root.activeElement;
      if (!active)
        return null;
      const path = [];
      let node = active;
      while (node && node !== root) {
        const parent = node.parentNode;
        if (!parent)
          break;
        const tag = node.tagName;
        const siblings = Array.from(parent.children).filter(
          (c) => c.tagName === tag
        );
        const idx = siblings.indexOf(node);
        path.unshift({ tag, idx });
        node = parent instanceof Element ? parent : null;
        if (!node && parent === root) {
          break;
        }
      }
      let selectionStart = null;
      let selectionEnd = null;
      if (active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement) {
        try {
          selectionStart = active.selectionStart;
          selectionEnd = active.selectionEnd;
        } catch {
        }
      }
      return { path, selectionStart, selectionEnd };
    }
    restoreFocusInShadow(snap) {
      const root = this.shadowRoot;
      if (!root)
        return;
      let cursor = root;
      for (const step of snap.path) {
        const children = Array.from(cursor.children ?? []);
        const all = children.length > 0 ? children : Array.from(cursor.children ?? []);
        const candidates = all.filter((c) => c.tagName === step.tag);
        const target = candidates[step.idx];
        if (!target)
          return;
        cursor = target;
      }
      const el = cursor;
      if (!el || typeof el.focus !== "function")
        return;
      if (root.activeElement === el)
        return;
      el.focus();
      if (snap.selectionStart != null && (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement)) {
        try {
          el.setSelectionRange(
            snap.selectionStart,
            snap.selectionEnd ?? snap.selectionStart
          );
        } catch {
        }
      }
    }
    refreshRefs() {
      const next = {};
      const root = this.shadowRoot;
      for (const [name, selector] of Object.entries(refsConfig)) {
        next[name] = root ? root.querySelector(selector) : null;
      }
      this.currentRefs = next;
    }
    formAssociatedCallback(form) {
      try {
        description.formAssociatedCallback?.call(this, form);
      } catch (err) {
        console.error(
          `[tan-compose] formAssociatedCallback threw for <${tagName37}>:`,
          err
        );
      }
    }
    formDisabledCallback(disabled) {
      try {
        description.formDisabledCallback?.call(this, disabled);
      } catch (err) {
        console.error(
          `[tan-compose] formDisabledCallback threw for <${tagName37}>:`,
          err
        );
      }
    }
    formResetCallback() {
      try {
        description.formResetCallback?.call(this);
      } catch (err) {
        console.error(
          `[tan-compose] formResetCallback threw for <${tagName37}>:`,
          err
        );
      }
    }
    formStateRestoreCallback(state, mode) {
      try {
        description.formStateRestoreCallback?.call(this, state, mode);
      } catch (err) {
        console.error(
          `[tan-compose] formStateRestoreCallback threw for <${tagName37}>:`,
          err
        );
      }
    }
    attachDelegatedEvents(events) {
      const grouped = /* @__PURE__ */ new Map();
      for (const [key, handler] of Object.entries(events)) {
        const match = EVENT_KEY_PATTERN.exec(key.trim());
        if (!match)
          continue;
        const [, type, selector] = match;
        if (!grouped.has(type))
          grouped.set(type, []);
        grouped.get(type).push({ selector: selector ?? null, handler });
      }
      for (const [type, entries] of grouped) {
        const listener = (event) => {
          for (const { selector, handler } of entries) {
            if (!selector) {
              handler(event, this.ctx);
              continue;
            }
            const path = event.composedPath();
            for (const node of path) {
              if (node === this.shadowRoot || node === this)
                break;
              if (node instanceof Element && this.shadowRoot?.contains(node) && node.matches(selector)) {
                handler(event, this.ctx);
                break;
              }
            }
          }
        };
        this.shadowRoot.addEventListener(type, listener);
        this.mountCleanups.push(
          () => this.shadowRoot?.removeEventListener(type, listener)
        );
      }
    }
  }
  componentRegistry.set(tagName37, CustomComponent);
  customElements.define(tagName37, CustomComponent);
  return tagName37;
}
function buildChild(description, scope, getSlot) {
  if (description.if && !description.if(scope.ctx))
    return null;
  return buildElement(description, scope, getSlot);
}
function buildElement(description, scope, getSlot) {
  const element = document.createElement(description.tag || "div");
  if (description.styles) {
    element.style.cssText = Object.entries(description.styles).map(([k, v]) => `${k}: ${v}`).join("; ");
  }
  if (description.className) {
    element.className = description.className;
  }
  if (description.attributes) {
    applyAttributes(element, description.attributes);
  }
  if (description.template !== void 0) {
    const html = typeof description.template === "function" ? description.template(scope.ctx) : description.template;
    if (html)
      element.innerHTML = html;
  }
  if (description.children) {
    for (const childDesc of description.children) {
      const childNode = buildChild(childDesc, scope, getSlot);
      if (childNode)
        element.appendChild(childNode);
    }
  }
  if (description.for) {
    appendKeyedList(element, description, scope, getSlot);
  }
  if (description.action) {
    const handler = description.action;
    element.addEventListener("click", handler);
    scope.cleanups.push(() => element.removeEventListener("click", handler));
  }
  if (description.emit) {
    for (const evt of description.emit) {
      element.addEventListener(evt.name, evt.handler);
      scope.cleanups.push(
        () => element.removeEventListener(evt.name, evt.handler)
      );
    }
  }
  return element;
}
function appendKeyedList(parent, description, scope, getSlot) {
  const list = description.for;
  const slot = getSlot(description);
  const items = list.items(scope.ctx);
  const newCache = /* @__PURE__ */ new Map();
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const key = list.key(item, i);
    let entry;
    const cached = slot.cache.get(key);
    if (cached && Object.is(cached.lastItem, item)) {
      entry = cached;
    } else {
      const itemCleanups = [];
      const childDesc = list.render(item, i, scope.ctx);
      const element = buildElement(
        childDesc,
        { ...scope, cleanups: itemCleanups },
        getSlot
      );
      if (cached)
        runCleanups(cached.cleanups);
      entry = { element, lastItem: item, cleanups: itemCleanups };
    }
    newCache.set(key, entry);
    parent.appendChild(entry.element);
  }
  for (const [key, entry] of slot.cache) {
    if (!newCache.has(key))
      runCleanups(entry.cleanups);
  }
  slot.cache = newCache;
}
function walkListNodes(desc, visit) {
  if (desc.for)
    visit(desc);
  if (desc.children) {
    for (const child of desc.children)
      walkListNodes(child, visit);
  }
}
function createCtx(host, propValues, state, refsRef) {
  return {
    host,
    get props() {
      const out = {};
      for (const [k, v] of propValues)
        out[k] = v;
      return out;
    },
    get state() {
      const out = {};
      for (const [k, v] of state)
        out[k] = v;
      return out;
    },
    get refs() {
      return refsRef();
    },
    setState: (key, value) => host.setState(key, value),
    getState: (key) => host.getState(key),
    emit: (name, detail) => host.emitEvent(name, detail)
  };
}
function buildSharedSheets(description) {
  const themeCss = description.theme ? buildThemeCss(description.theme) : void 0;
  const stylesCss = description.styles ? buildContainerCss(description.styles) : void 0;
  if (!themeCss && !stylesCss) {
    return { kind: "adopted", sheets: [] };
  }
  const supportsConstructable = typeof CSSStyleSheet !== "undefined" && typeof CSSStyleSheet.prototype.replaceSync === "function";
  if (supportsConstructable) {
    const sheets = [];
    if (themeCss) {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(themeCss);
      sheets.push(sheet);
    }
    if (stylesCss) {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(stylesCss);
      sheets.push(sheet);
    }
    return { kind: "adopted", sheets };
  }
  return { kind: "fallback", theme: themeCss, styles: stylesCss };
}
function applySharedSheets(shadow, shared) {
  if (shared.kind === "adopted") {
    if (shared.sheets.length > 0) {
      try {
        shadow.adoptedStyleSheets = shared.sheets;
      } catch {
      }
    }
    return;
  }
  if (shared.theme) {
    const el = document.createElement("style");
    el.textContent = shared.theme;
    shadow.appendChild(el);
  }
  if (shared.styles) {
    const el = document.createElement("style");
    el.textContent = shared.styles;
    shadow.appendChild(el);
  }
}
function applyAttributes(element, attributes) {
  for (const [attr, value] of Object.entries(attributes)) {
    element.setAttribute(attr, value);
  }
}
function buildThemeCss(theme) {
  const vars = Object.entries(theme).map(([key, value]) => `--${key}: ${value};`).join(" ");
  return `:host { ${vars} }`;
}
function buildContainerCss(styles) {
  const rules = Object.entries(styles).map(([key, value]) => `${key}: ${value};`).join(" ");
  return `.container { ${rules} }`;
}
function runCleanups(list) {
  while (list.length > 0) {
    const fn = list.pop();
    try {
      fn?.();
    } catch (err) {
      console.error("[tan-compose] cleanup threw:", err);
    }
  }
}
function coerceProp(raw, type) {
  switch (type) {
    case "string":
      return raw;
    case "number": {
      const n = Number(raw);
      return Number.isNaN(n) ? void 0 : n;
    }
    case "boolean":
      return raw !== "false" && raw !== "0";
    case "json":
      try {
        return JSON.parse(raw);
      } catch {
        return void 0;
      }
  }
}
function coerceForSet(value, type) {
  switch (type) {
    case "string":
      return value == null ? value : String(value);
    case "number":
      return value == null ? value : Number(value);
    case "boolean":
      return Boolean(value);
    case "json":
      return value;
  }
}
function reflectAttribute(element, name, value, type) {
  if (type === "json")
    return;
  if (type === "boolean") {
    if (value)
      element.setAttribute(name, "");
    else
      element.removeAttribute(name);
    return;
  }
  if (value == null) {
    element.removeAttribute(name);
    return;
  }
  element.setAttribute(name, String(value));
}

// components/button.ts
var TAG = "tc-button";
var tagName = TAG;
var BUTTON_STYLE = `
      <style>
        .root {
          font-family: var(--tc-btn-font);
          font-weight: 500;
          border-radius: var(--tc-btn-radius);
          cursor: pointer;
          border: 1px solid transparent;
          transition: opacity 0.15s ease, transform 0.05s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          line-height: 1;
          white-space: nowrap;
          text-decoration: none;
          color: inherit;
        }
        .root.block { width: 100%; display: flex; }
        .root:disabled,
        .root[aria-disabled="true"] { opacity: 0.55; cursor: not-allowed; }
        .root:not(:disabled):not([aria-disabled="true"]):active {
          transform: translateY(1px);
        }
        a.root:focus-visible {
          outline: 2px solid currentColor;
          outline-offset: 2px;
        }

        .s-sm { font-size: 0.82rem; padding: 6px 12px; }
        .s-md { font-size: 0.92rem; padding: 9px 16px; }
        .s-lg { font-size: 1.0rem;  padding: 12px 22px; }

        .v-primary {
          background: var(--tc-btn-primary-bg);
          color: var(--tc-btn-primary-fg);
        }
        .v-secondary {
          background: var(--tc-btn-secondary-bg);
          color: var(--tc-btn-secondary-fg);
          border-color: var(--tc-btn-secondary-border);
        }
        .v-ghost {
          background: transparent;
          color: var(--tc-btn-ghost-fg);
          border-color: var(--tc-btn-ghost-border);
        }
        .v-danger {
          background: var(--tc-btn-danger-bg);
          color: var(--tc-btn-danger-fg);
        }

        .v-primary:not(:disabled):not([aria-disabled="true"]):hover,
        .v-danger:not(:disabled):not([aria-disabled="true"]):hover {
          filter: brightness(1.08);
        }
        .v-secondary:not(:disabled):not([aria-disabled="true"]):hover,
        .v-ghost:not(:disabled):not([aria-disabled="true"]):hover {
          background: rgba(20, 23, 31, 0.04);
        }

        .spinner {
          width: 12px; height: 12px; border-radius: 50%;
          border: 2px solid currentColor;
          border-right-color: transparent;
          animation: tc-btn-spin 0.7s linear infinite;
        }

        @keyframes tc-btn-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      </style>
`;
build(
  TAG,
  describe({
    props: {
      variant: { type: "string", default: "primary" },
      size: { type: "string", default: "md" },
      disabled: { type: "boolean", default: false, reflect: true },
      loading: { type: "boolean", default: false },
      block: { type: "boolean", default: false },
      href: { type: "string", default: "" },
      target: { type: "string", default: "" },
      rel: { type: "string", default: "" }
    },
    theme: {
      "tc-btn-primary-bg": "var(--tc-color-ink, #14171f)",
      "tc-btn-primary-fg": "var(--tc-color-surface, #ffffff)",
      "tc-btn-secondary-bg": "var(--tc-color-surface, #ffffff)",
      "tc-btn-secondary-fg": "var(--tc-color-ink, #14171f)",
      "tc-btn-secondary-border": "var(--tc-color-rule-strong, #d9cfb8)",
      "tc-btn-ghost-fg": "var(--tc-color-ink, #14171f)",
      "tc-btn-ghost-border": "transparent",
      "tc-btn-danger-bg": "var(--tc-color-danger, #b3261e)",
      "tc-btn-danger-fg": "var(--tc-color-surface, #ffffff)",
      "tc-btn-radius": "var(--tc-radius-md, 8px)",
      "tc-btn-font": "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"
    },
    styles: {
      display: "inline-block",
      "vertical-align": "middle"
    },
    template: ({ props }) => {
      const cls = `root v-${esc(props.variant)} s-${esc(props.size)}${props.block ? " block" : ""}`;
      const inner = `${props.loading ? '<span class="spinner" aria-hidden="true"></span>' : ""}
        <span class="content"><slot></slot></span>`;
      const href = String(props.href ?? "");
      const isAnchor = href.length > 0;
      const isDisabled = !!(props.disabled || props.loading);
      if (isAnchor) {
        const targetAttr = props.target ? ` target="${esc(props.target)}"` : "";
        const relValue = props.rel ? String(props.rel) : String(props.target) === "_blank" ? "noopener" : "";
        const relAttr = relValue ? ` rel="${esc(relValue)}"` : "";
        const hrefAttr = isDisabled ? "" : ` href="${esc(href)}"`;
        const ariaDisabled = isDisabled ? ` aria-disabled="true"` : "";
        const tabIndex = isDisabled ? ` tabindex="-1"` : "";
        return `
      <a
        part="button"
        class="${cls}"${hrefAttr}${targetAttr}${relAttr}${ariaDisabled}${tabIndex}
        role="button"
      >
        ${inner}
      </a>${BUTTON_STYLE}`;
      }
      return `
      <button
        part="button"
        class="${cls}"
        ${isDisabled ? "disabled" : ""}
        type="button"
      >
        ${inner}
      </button>${BUTTON_STYLE}`;
    }
  })
);
function esc(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// components/input.ts
var TAG2 = "tc-input";
var tagName2 = TAG2;
build(
  TAG2,
  describe({
    formAssociated: true,
    props: {
      value: { type: "string", default: "" },
      name: { type: "string", default: "" },
      type: { type: "string", default: "text" },
      placeholder: { type: "string", default: "" },
      label: { type: "string", default: "" },
      helper: { type: "string", default: "" },
      error: { type: "string", default: "" },
      disabled: { type: "boolean", default: false, reflect: true },
      required: { type: "boolean", default: false, reflect: true }
    },
    theme: {
      "tc-input-bg": "var(--tc-color-surface, #ffffff)",
      "tc-input-fg": "var(--tc-color-ink, #14171f)",
      "tc-input-border": "var(--tc-color-rule-strong, #d9cfb8)",
      "tc-input-border-focus": "var(--tc-color-accent, #a16939)",
      "tc-input-error": "var(--tc-color-danger, #b3261e)",
      "tc-input-helper": "var(--tc-color-ink-muted, #6b7280)",
      "tc-input-radius": "var(--tc-radius-md, 8px)",
      "tc-input-font": "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"
    },
    styles: {
      display: "block"
    },
    refs: {
      input: "input"
    },
    template: ({ props }) => {
      const showError = Boolean(props.error);
      return `
        ${props.label ? `<label class="label">${esc2(props.label)}${props.required ? ' <span class="req" aria-hidden="true">*</span>' : ""}</label>` : ""}
        <input
          class="input ${showError ? "invalid" : ""}"
          part="input"
          type="${esc2(props.type)}"
          value="${esc2(props.value)}"
          name="${esc2(props.name)}"
          placeholder="${esc2(props.placeholder)}"
          ${props.disabled ? "disabled" : ""}
          ${props.required ? "required" : ""}
          aria-invalid="${showError ? "true" : "false"}"
        />
        ${props.error || props.helper ? `<div class="${showError ? "error" : "helper"}">${esc2(props.error || props.helper)}</div>` : ""}
        <style>
          :host { font-family: var(--tc-input-font); }
          .label {
            display: block; font-size: 0.82rem; font-weight: 600;
            color: var(--tc-input-fg); margin-bottom: 6px;
          }
          .req { color: var(--tc-input-error); margin-left: 2px; }
          .input {
            width: 100%; box-sizing: border-box;
            font: inherit; font-size: 0.95rem;
            padding: 9px 12px;
            background: var(--tc-input-bg);
            color: var(--tc-input-fg);
            border: 1px solid var(--tc-input-border);
            border-radius: var(--tc-input-radius);
            outline: none;
            transition: border-color 0.15s ease, box-shadow 0.15s ease;
          }
          .input:focus {
            border-color: var(--tc-input-border-focus);
            box-shadow: var(--tc-focus-ring, 0 0 0 3px rgba(161, 105, 57, 0.18));
          }
          .input.invalid {
            border-color: var(--tc-input-error);
          }
          .input.invalid:focus {
            box-shadow: 0 0 0 3px rgba(179, 38, 30, 0.18);
          }
          .input:disabled {
            opacity: 0.6; cursor: not-allowed;
          }
          .helper {
            margin-top: 6px; font-size: 0.78rem;
            color: var(--tc-input-helper);
          }
          .error {
            margin-top: 6px; font-size: 0.78rem;
            color: var(--tc-input-error);
          }
        </style>
      `;
    },
    events: {
      "input input": (event, ctx) => {
        const next = event.target.value;
        const host = ctx.host;
        host.internals?.setFormValue(next);
        host.value = next;
        ctx.emit("tc-input", { value: next });
      }
    },
    formResetCallback() {
      this.value = "";
    }
  })
);
function esc2(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// components/textarea.ts
var TAG3 = "tc-textarea";
var tagName3 = TAG3;
build(
  TAG3,
  describe({
    formAssociated: true,
    props: {
      value: { type: "string", default: "" },
      name: { type: "string", default: "" },
      placeholder: { type: "string", default: "" },
      label: { type: "string", default: "" },
      helper: { type: "string", default: "" },
      error: { type: "string", default: "" },
      rows: { type: "number", default: 4 },
      disabled: { type: "boolean", default: false, reflect: true },
      required: { type: "boolean", default: false, reflect: true },
      resize: { type: "string", default: "vertical" }
    },
    theme: {
      "tc-input-bg": "var(--tc-color-surface, #ffffff)",
      "tc-input-fg": "var(--tc-color-ink, #14171f)",
      "tc-input-border": "var(--tc-color-rule-strong, #d9cfb8)",
      "tc-input-border-focus": "var(--tc-color-accent, #a16939)",
      "tc-input-error": "var(--tc-color-danger, #b3261e)",
      "tc-input-helper": "var(--tc-color-ink-muted, #6b7280)",
      "tc-input-radius": "var(--tc-radius-md, 8px)",
      "tc-input-font": "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"
    },
    styles: {
      display: "block"
    },
    refs: {
      input: "textarea"
    },
    template: ({ props }) => {
      const showError = Boolean(props.error);
      return `
        ${props.label ? `<label class="label">${esc3(props.label)}${props.required ? ' <span class="req" aria-hidden="true">*</span>' : ""}</label>` : ""}
        <textarea
          class="input ${showError ? "invalid" : ""}"
          part="textarea"
          name="${esc3(props.name)}"
          placeholder="${esc3(props.placeholder)}"
          rows="${esc3(props.rows)}"
          ${props.disabled ? "disabled" : ""}
          ${props.required ? "required" : ""}
          aria-invalid="${showError ? "true" : "false"}"
          style="resize: ${esc3(props.resize)};"
        >${esc3(props.value)}</textarea>
        ${props.error || props.helper ? `<div class="${showError ? "error" : "helper"}">${esc3(props.error || props.helper)}</div>` : ""}
        <style>
          :host { font-family: var(--tc-input-font); }
          .label {
            display: block; font-size: 0.82rem; font-weight: 600;
            color: var(--tc-input-fg); margin-bottom: 6px;
          }
          .req { color: var(--tc-input-error); margin-left: 2px; }
          .input {
            width: 100%; box-sizing: border-box;
            font: inherit; font-size: 0.95rem; line-height: 1.5;
            padding: 9px 12px;
            background: var(--tc-input-bg);
            color: var(--tc-input-fg);
            border: 1px solid var(--tc-input-border);
            border-radius: var(--tc-input-radius);
            outline: none;
            transition: border-color 0.15s ease, box-shadow 0.15s ease;
          }
          .input:focus {
            border-color: var(--tc-input-border-focus);
            box-shadow: var(--tc-focus-ring, 0 0 0 3px rgba(161, 105, 57, 0.18));
          }
          .input.invalid { border-color: var(--tc-input-error); }
          .input:disabled { opacity: 0.6; cursor: not-allowed; }
          .helper {
            margin-top: 6px; font-size: 0.78rem;
            color: var(--tc-input-helper);
          }
          .error {
            margin-top: 6px; font-size: 0.78rem;
            color: var(--tc-input-error);
          }
        </style>
      `;
    },
    events: {
      "input textarea": (event, ctx) => {
        const next = event.target.value;
        const host = ctx.host;
        host.internals?.setFormValue(next);
        host.value = next;
        ctx.emit("tc-input", { value: next });
      }
    },
    formResetCallback() {
      this.value = "";
    }
  })
);
function esc3(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// components/select.ts
var TAG4 = "tc-select";
var tagName4 = TAG4;
build(
  TAG4,
  describe({
    formAssociated: true,
    props: {
      value: { type: "string", default: "" },
      name: { type: "string", default: "" },
      options: { type: "json", default: [] },
      placeholder: { type: "string", default: "" },
      label: { type: "string", default: "" },
      helper: { type: "string", default: "" },
      error: { type: "string", default: "" },
      disabled: { type: "boolean", default: false, reflect: true },
      required: { type: "boolean", default: false, reflect: true }
    },
    theme: {
      "tc-input-bg": "var(--tc-color-surface, #ffffff)",
      "tc-input-fg": "var(--tc-color-ink, #14171f)",
      "tc-input-border": "var(--tc-color-rule-strong, #d9cfb8)",
      "tc-input-border-focus": "var(--tc-color-accent, #a16939)",
      "tc-input-error": "var(--tc-color-danger, #b3261e)",
      "tc-input-helper": "var(--tc-color-ink-muted, #6b7280)",
      "tc-input-radius": "var(--tc-radius-md, 8px)",
      "tc-input-font": "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"
    },
    styles: {
      display: "block"
    },
    template: ({ props }) => {
      const opts = props.options ?? [];
      const showError = Boolean(props.error);
      return `
        ${props.label ? `<label class="label">${esc4(props.label)}${props.required ? ' <span class="req" aria-hidden="true">*</span>' : ""}</label>` : ""}
        <div class="wrap">
          <select
            class="select ${showError ? "invalid" : ""}"
            part="select"
            name="${esc4(props.name)}"
            ${props.disabled ? "disabled" : ""}
            ${props.required ? "required" : ""}
            aria-invalid="${showError ? "true" : "false"}"
          >
            ${props.placeholder ? `<option value="" disabled ${props.value === "" ? "selected" : ""}>${esc4(props.placeholder)}</option>` : ""}
            ${opts.map(
        (o) => `<option value="${esc4(o.value)}"${o.disabled ? " disabled" : ""}${o.value === props.value ? " selected" : ""}>${esc4(o.label)}</option>`
      ).join("")}
          </select>
          <span class="caret" aria-hidden="true">\u25BE</span>
        </div>
        ${props.error || props.helper ? `<div class="${showError ? "error" : "helper"}">${esc4(props.error || props.helper)}</div>` : ""}
        <style>
          :host { font-family: var(--tc-input-font); }
          .label {
            display: block; font-size: 0.82rem; font-weight: 600;
            color: var(--tc-input-fg); margin-bottom: 6px;
          }
          .req { color: var(--tc-input-error); margin-left: 2px; }
          .wrap { position: relative; }
          .select {
            width: 100%; box-sizing: border-box;
            font: inherit; font-size: 0.95rem;
            padding: 9px 36px 9px 12px;
            background: var(--tc-input-bg);
            color: var(--tc-input-fg);
            border: 1px solid var(--tc-input-border);
            border-radius: var(--tc-input-radius);
            outline: none;
            appearance: none; -webkit-appearance: none; -moz-appearance: none;
            cursor: pointer;
          }
          .select:focus {
            border-color: var(--tc-input-border-focus);
            box-shadow: var(--tc-focus-ring, 0 0 0 3px rgba(161, 105, 57, 0.18));
          }
          .select.invalid { border-color: var(--tc-input-error); }
          .select:disabled { opacity: 0.6; cursor: not-allowed; }
          .caret {
            position: absolute; right: 12px; top: 50%;
            transform: translateY(-50%);
            color: var(--tc-input-helper);
            pointer-events: none;
            font-size: 0.85rem;
          }
          .helper {
            margin-top: 6px; font-size: 0.78rem;
            color: var(--tc-input-helper);
          }
          .error {
            margin-top: 6px; font-size: 0.78rem;
            color: var(--tc-input-error);
          }
        </style>
      `;
    },
    events: {
      "change select": (event, ctx) => {
        const next = event.target.value;
        const host = ctx.host;
        host.internals?.setFormValue(next);
        host.value = next;
        ctx.emit("tc-change", { value: next });
      }
    },
    formResetCallback() {
      this.value = "";
    }
  })
);
function esc4(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// components/checkbox.ts
var TAG5 = "tc-checkbox";
var tagName5 = TAG5;
build(
  TAG5,
  describe({
    formAssociated: true,
    props: {
      checked: { type: "boolean", default: false, reflect: true },
      name: { type: "string", default: "" },
      value: { type: "string", default: "on" },
      label: { type: "string", default: "" },
      helper: { type: "string", default: "" },
      error: { type: "string", default: "" },
      disabled: { type: "boolean", default: false, reflect: true },
      required: { type: "boolean", default: false, reflect: true },
      indeterminate: { type: "boolean", default: false }
    },
    theme: {
      "tc-input-fg": "var(--tc-color-ink, #14171f)",
      "tc-input-border": "var(--tc-color-rule-strong, #d9cfb8)",
      "tc-input-border-focus": "var(--tc-color-accent, #a16939)",
      "tc-input-error": "var(--tc-color-danger, #b3261e)",
      "tc-input-helper": "var(--tc-color-ink-muted, #6b7280)",
      "tc-input-radius": "var(--tc-radius-sm, 4px)",
      "tc-input-font": "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
      "tc-checkbox-accent": "var(--tc-color-accent, #a16939)"
    },
    styles: {
      display: "block"
    },
    template: ({ props }) => {
      const showError = Boolean(props.error);
      return `
        <label class="row ${props.disabled ? "is-disabled" : ""} ${showError ? "is-invalid" : ""}">
          <input
            class="cb"
            type="checkbox"
            name="${esc5(props.name)}"
            value="${esc5(props.value)}"
            ${props.checked ? "checked" : ""}
            ${props.disabled ? "disabled" : ""}
            ${props.required ? "required" : ""}
            aria-invalid="${showError ? "true" : "false"}"
          />
          ${props.label ? `<span class="label">${esc5(props.label)}${props.required ? ' <span class="req" aria-hidden="true">*</span>' : ""}</span>` : "<span></span>"}
        </label>
        ${props.error || props.helper ? `<div class="${showError ? "error" : "helper"}">${esc5(props.error || props.helper)}</div>` : ""}
        <style>
          :host { font-family: var(--tc-input-font); color: var(--tc-input-fg); }
          .row {
            display: inline-flex; align-items: center; gap: 10px;
            cursor: pointer; user-select: none;
            font-size: 0.95rem;
          }
          .row.is-disabled { cursor: not-allowed; opacity: 0.6; }
          .cb {
            width: 18px; height: 18px;
            margin: 0;
            accent-color: var(--tc-checkbox-accent);
            cursor: inherit;
          }
          .row.is-invalid .cb { outline: 2px solid var(--tc-input-error); border-radius: 3px; }
          .label { line-height: 1.3; }
          .req { color: var(--tc-input-error); margin-left: 2px; }
          .helper {
            margin-top: 6px; margin-left: 28px;
            font-size: 0.78rem; color: var(--tc-input-helper);
          }
          .error {
            margin-top: 6px; margin-left: 28px;
            font-size: 0.78rem; color: var(--tc-input-error);
          }
        </style>
      `;
    },
    refs: {
      input: ".cb"
    },
    events: {
      "change .cb": (event, ctx) => {
        const next = event.target.checked;
        const host = ctx.host;
        host.checked = next;
        host.internals?.setFormValue(next ? host.value : null);
        ctx.emit("tc-change", { checked: next });
      }
    },
    afterMount() {
      const h = this;
      const root = h.shadowRoot;
      const input = root?.querySelector(".cb");
      if (input)
        input.indeterminate = h.indeterminate;
      h.internals?.setFormValue(h.checked ? h.value : null);
    },
    formResetCallback() {
      this.checked = false;
    }
  })
);
function esc5(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// components/switch.ts
var TAG6 = "tc-switch";
var tagName6 = TAG6;
build(
  TAG6,
  describe({
    formAssociated: true,
    props: {
      checked: { type: "boolean", default: false, reflect: true },
      name: { type: "string", default: "" },
      value: { type: "string", default: "on" },
      label: { type: "string", default: "" },
      helper: { type: "string", default: "" },
      error: { type: "string", default: "" },
      disabled: { type: "boolean", default: false, reflect: true }
    },
    theme: {
      "tc-switch-track-off": "var(--tc-color-rule-strong, #d9cfb8)",
      "tc-switch-track-on": "var(--tc-color-accent, #a16939)",
      "tc-switch-thumb": "var(--tc-color-surface, #ffffff)",
      "tc-switch-fg": "var(--tc-color-ink, #14171f)",
      "tc-switch-helper": "var(--tc-color-ink-muted, #6b7280)",
      "tc-switch-error": "var(--tc-color-danger, #b3261e)",
      "tc-switch-font": "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"
    },
    styles: {
      display: "block"
    },
    template: ({ props }) => {
      const showError = Boolean(props.error);
      return `
        <label class="row ${props.disabled ? "is-disabled" : ""}">
          <button
            class="track ${props.checked ? "on" : ""}"
            type="button"
            role="switch"
            aria-checked="${props.checked ? "true" : "false"}"
            ${props.disabled ? "disabled" : ""}
            aria-invalid="${showError ? "true" : "false"}"
          >
            <span class="thumb"></span>
          </button>
          ${props.label ? `<span class="label">${esc6(props.label)}</span>` : ""}
        </label>
        ${props.error || props.helper ? `<div class="${showError ? "error" : "helper"}">${esc6(props.error || props.helper)}</div>` : ""}
        <style>
          :host { font-family: var(--tc-switch-font); color: var(--tc-switch-fg); }
          .row {
            display: inline-flex; align-items: center; gap: 10px;
            cursor: pointer; user-select: none;
            font-size: 0.95rem;
          }
          .row.is-disabled { cursor: not-allowed; opacity: 0.6; }
          .track {
            position: relative;
            width: 36px; height: 22px;
            background: var(--tc-switch-track-off);
            border-radius: 999px;
            border: none; padding: 0; margin: 0;
            cursor: inherit;
            transition: background 0.18s ease;
          }
          .track.on { background: var(--tc-switch-track-on); }
          .track:focus-visible {
            outline: 2px solid var(--tc-switch-track-on);
            outline-offset: 2px;
          }
          .thumb {
            position: absolute; top: 2px; left: 2px;
            width: 18px; height: 18px;
            background: var(--tc-switch-thumb);
            border-radius: 50%;
            transition: transform 0.18s ease;
            box-shadow: 0 1px 2px rgba(0,0,0,0.18);
          }
          .track.on .thumb { transform: translateX(14px); }
          .label { line-height: 1.3; }
          .helper {
            margin-top: 6px; font-size: 0.78rem;
            color: var(--tc-switch-helper);
          }
          .error {
            margin-top: 6px; font-size: 0.78rem;
            color: var(--tc-switch-error);
          }
        </style>
      `;
    },
    events: {
      "click .track": (_e, ctx) => {
        const host = ctx.host;
        if (host.disabled)
          return;
        host.checked = !host.checked;
        host.internals?.setFormValue(host.checked ? host.value : null);
        ctx.emit("tc-change", { checked: host.checked });
      },
      "keydown .track": (e, ctx) => {
        const ev = e;
        if (ev.key !== " " && ev.key !== "Enter")
          return;
        ev.preventDefault();
        const host = ctx.host;
        if (host.disabled)
          return;
        host.checked = !host.checked;
        host.internals?.setFormValue(host.checked ? host.value : null);
        ctx.emit("tc-change", { checked: host.checked });
      }
    },
    afterMount() {
      const h = this;
      h.internals?.setFormValue(h.checked ? h.value : null);
    },
    formResetCallback() {
      this.checked = false;
    }
  })
);
function esc6(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// components/file.ts
var TAG7 = "tc-file";
var tagName7 = TAG7;
build(
  TAG7,
  describe({
    formAssociated: true,
    props: {
      name: { type: "string", default: "" },
      accept: { type: "string", default: "" },
      multiple: { type: "boolean", default: false, reflect: true },
      label: { type: "string", default: "" },
      helper: { type: "string", default: "" },
      error: { type: "string", default: "" },
      buttonText: { type: "string", default: "Choose file" },
      disabled: { type: "boolean", default: false, reflect: true },
      required: { type: "boolean", default: false, reflect: true }
    },
    theme: {
      "tc-input-fg": "var(--tc-color-ink, #14171f)",
      "tc-input-border": "var(--tc-color-rule-strong, #d9cfb8)",
      "tc-input-border-focus": "var(--tc-color-accent, #a16939)",
      "tc-input-error": "var(--tc-color-danger, #b3261e)",
      "tc-input-helper": "var(--tc-color-ink-muted, #6b7280)",
      "tc-input-radius": "var(--tc-radius-md, 8px)",
      "tc-input-font": "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
      "tc-file-zone-bg": "var(--tc-color-surface-alt, #faf8f3)",
      "tc-file-zone-fg": "var(--tc-color-ink-soft, #4a5061)"
    },
    styles: {
      display: "block"
    },
    refs: {
      input: "input[type='file']"
    },
    template: ({ props, state }) => {
      const showError = Boolean(props.error);
      const filesState = state.files ?? [];
      const filesText = filesState.length === 0 ? "No file selected" : filesState.length === 1 ? esc7(filesState[0].name) : `${filesState.length} files selected`;
      return `
        ${props.label ? `<label class="label">${esc7(props.label)}${props.required ? ' <span class="req" aria-hidden="true">*</span>' : ""}</label>` : ""}
        <div class="zone ${props.disabled ? "is-disabled" : ""} ${showError ? "is-invalid" : ""}">
          <button class="btn" type="button" ${props.disabled ? "disabled" : ""}>
            ${esc7(props.buttonText)}
          </button>
          <span class="files">${filesText}</span>
          <input
            class="native"
            type="file"
            name="${esc7(props.name)}"
            accept="${esc7(props.accept)}"
            ${props.multiple ? "multiple" : ""}
            ${props.disabled ? "disabled" : ""}
            ${props.required ? "required" : ""}
            tabindex="-1"
            aria-hidden="true"
          />
        </div>
        ${props.error || props.helper ? `<div class="${showError ? "error" : "helper"}">${esc7(props.error || props.helper)}</div>` : ""}
        <style>
          :host { font-family: var(--tc-input-font); color: var(--tc-input-fg); }
          .label {
            display: block; font-size: 0.82rem; font-weight: 600;
            color: var(--tc-input-fg); margin-bottom: 6px;
          }
          .req { color: var(--tc-input-error); margin-left: 2px; }
          .zone {
            display: inline-flex; align-items: center; gap: 12px;
            padding: 6px;
            background: var(--tc-file-zone-bg);
            border: 1px dashed var(--tc-input-border);
            border-radius: var(--tc-input-radius);
          }
          .zone.is-invalid { border-color: var(--tc-input-error); }
          .zone.is-disabled { opacity: 0.6; }
          .btn {
            font: inherit; font-size: 0.88rem; font-weight: 500;
            padding: 7px 13px;
            background: var(--tc-color-ink, #14171f);
            color: var(--tc-color-surface, #ffffff);
            border: none; border-radius: var(--tc-input-radius);
            cursor: pointer;
          }
          .btn:disabled { cursor: not-allowed; }
          .files {
            color: var(--tc-file-zone-fg);
            font-size: 0.88rem;
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
            max-width: 240px;
          }
          .native {
            position: absolute;
            width: 1px; height: 1px;
            padding: 0; margin: -1px; overflow: hidden;
            clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
          }
          .helper {
            margin-top: 6px; font-size: 0.78rem;
            color: var(--tc-input-helper);
          }
          .error {
            margin-top: 6px; font-size: 0.78rem;
            color: var(--tc-input-error);
          }
        </style>
      `;
    },
    events: {
      "click .btn": (_e, ctx) => {
        const inp = ctx.refs.input;
        inp?.click();
      },
      "change input[type='file']": (event, ctx) => {
        const inp = event.target;
        const files = Array.from(inp.files ?? []);
        ctx.setState("files", files);
        const host = ctx.host;
        if (host.internals) {
          if (files.length === 0) {
            host.internals.setFormValue(null);
          } else if (files.length === 1) {
            host.internals.setFormValue(files[0]);
          } else {
            const fd = new FormData();
            const fieldName = host.name;
            for (const f of files)
              fd.append(fieldName, f);
            host.internals.setFormValue(fd);
          }
        }
        ctx.emit("tc-files", { files });
      }
    },
    formResetCallback() {
      const root = this.shadowRoot;
      const inp = root?.querySelector(".native");
      if (inp)
        inp.value = "";
      this.setState(
        "files",
        []
      );
    }
  })
);
function esc7(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// components/radio-group.ts
var TAG8 = "tc-radio-group";
var tagName8 = TAG8;
build(
  TAG8,
  describe({
    formAssociated: true,
    props: {
      value: { type: "string", default: "" },
      name: { type: "string", default: "" },
      options: { type: "json", default: [] },
      label: { type: "string", default: "" },
      helper: { type: "string", default: "" },
      error: { type: "string", default: "" },
      layout: { type: "string", default: "vertical" },
      disabled: { type: "boolean", default: false, reflect: true },
      required: { type: "boolean", default: false, reflect: true }
    },
    theme: {
      "tc-input-fg": "var(--tc-color-ink, #14171f)",
      "tc-input-border": "var(--tc-color-rule-strong, #d9cfb8)",
      "tc-input-error": "var(--tc-color-danger, #b3261e)",
      "tc-input-helper": "var(--tc-color-ink-muted, #6b7280)",
      "tc-input-font": "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
      "tc-radio-accent": "var(--tc-color-accent, #a16939)"
    },
    styles: {
      display: "block"
    },
    template: ({ props }) => {
      const opts = props.options ?? [];
      const showError = Boolean(props.error);
      const layout = String(props.layout ?? "vertical");
      return `
        <fieldset class="group" ${props.disabled ? "disabled" : ""}>
          ${props.label ? `<legend class="legend">${esc8(props.label)}${props.required ? ' <span class="req" aria-hidden="true">*</span>' : ""}</legend>` : ""}
          <div class="opts l-${esc8(layout)}" role="radiogroup" aria-invalid="${showError ? "true" : "false"}">
            ${opts.map(
        (o, i) => `<label class="opt ${o.disabled ? "is-disabled" : ""}">
                  <input
                    type="radio"
                    class="r"
                    name="${esc8(props.name) || `__rg_${i}__`}"
                    value="${esc8(o.value)}"
                    ${o.value === props.value ? "checked" : ""}
                    ${o.disabled || props.disabled ? "disabled" : ""}
                  />
                  <span>${esc8(o.label)}</span>
                </label>`
      ).join("")}
          </div>
        </fieldset>
        ${props.error || props.helper ? `<div class="${showError ? "error" : "helper"}">${esc8(props.error || props.helper)}</div>` : ""}
        <style>
          :host { font-family: var(--tc-input-font); color: var(--tc-input-fg); }
          .group {
            border: none; padding: 0; margin: 0;
          }
          .legend {
            font-size: 0.82rem; font-weight: 600;
            color: var(--tc-input-fg); margin-bottom: 8px;
            padding: 0;
          }
          .req { color: var(--tc-input-error); margin-left: 2px; }
          .opts.l-vertical { display: flex; flex-direction: column; gap: 8px; }
          .opts.l-horizontal { display: flex; flex-direction: row; gap: 16px; flex-wrap: wrap; }
          .opt {
            display: inline-flex; align-items: center; gap: 8px;
            cursor: pointer; user-select: none;
            font-size: 0.95rem;
          }
          .opt.is-disabled { cursor: not-allowed; opacity: 0.6; }
          .r {
            width: 16px; height: 16px;
            margin: 0;
            accent-color: var(--tc-radio-accent);
            cursor: inherit;
          }
          .helper {
            margin-top: 6px; font-size: 0.78rem;
            color: var(--tc-input-helper);
          }
          .error {
            margin-top: 6px; font-size: 0.78rem;
            color: var(--tc-input-error);
          }
        </style>
      `;
    },
    events: {
      "change input.r": (event, ctx) => {
        const next = event.target.value;
        const host = ctx.host;
        host.value = next;
        host.internals?.setFormValue(next);
        ctx.emit("tc-change", { value: next });
      }
    },
    afterMount() {
      const h = this;
      if (h.value)
        h.internals?.setFormValue(h.value);
    },
    formResetCallback() {
      this.value = "";
    }
  })
);
function esc8(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// components/table.ts
var TAG9 = "tc-table";
var tagName9 = TAG9;
var TABLE_CSS = `
:host { font-family: var(--tc-table-font); color: var(--tc-table-ink); display: block; }
.filter {
  width: 100%; box-sizing: border-box;
  font: inherit; font-size: 0.92rem;
  padding: 9px 12px; margin-bottom: 12px;
  background: var(--tc-table-surface);
  color: var(--tc-table-ink);
  border: 1px solid var(--tc-table-rule);
  border-radius: 8px; outline: none;
}
.filter:focus {
  border-color: var(--tc-table-accent);
  box-shadow: var(--tc-focus-ring, 0 0 0 3px rgba(161, 105, 57, 0.18));
}
.wrap {
  border: 1px solid var(--tc-table-rule);
  border-radius: var(--tc-table-radius);
  background: var(--tc-table-surface);
  overflow: hidden;
}
table {
  width: 100%; border-collapse: collapse; font-size: 0.92rem;
}
thead { background: var(--tc-table-head-bg); }
th {
  text-align: left; padding: 11px 14px;
  font-weight: 600; font-size: 0.78rem;
  text-transform: uppercase; letter-spacing: 0.04em;
  color: var(--tc-table-soft);
  border-bottom: 1px solid var(--tc-table-rule);
  user-select: none;
}
th.sortable { cursor: pointer; }
th.sortable:hover { color: var(--tc-table-accent); }
th .sort { margin-left: 6px; font-size: 0.7rem; }
tbody tr:not(.empty) { cursor: pointer; }
tbody tr:not(.empty):hover { background: var(--tc-table-row-hover); }
td {
  padding: 11px 14px; border-bottom: 1px solid var(--tc-table-rule);
  color: var(--tc-table-ink);
}
tbody tr:last-child td { border-bottom: none; }
tr.empty td {
  text-align: center; color: var(--tc-table-soft); padding: 32px 14px;
}
.pager {
  display: flex; align-items: center; gap: 12px;
  margin-top: 12px; font-size: 0.85rem;
  color: var(--tc-table-soft);
}
.pager .count { font-variant-numeric: tabular-nums; }
.pager .spacer { flex: 1 1 auto; }
.pager .page { font-variant-numeric: tabular-nums; }
.pager button {
  font: inherit; font-size: 0.85rem;
  padding: 5px 10px;
  background: var(--tc-table-surface);
  color: var(--tc-table-ink);
  border: 1px solid var(--tc-table-rule);
  border-radius: 6px; cursor: pointer;
}
.pager button:hover:not(:disabled) {
  border-color: var(--tc-table-accent);
  color: var(--tc-table-accent);
}
.pager button:disabled { opacity: 0.45; cursor: not-allowed; }
`;
var FOCUS_INTENT = /* @__PURE__ */ new WeakMap();
build(
  TAG9,
  describe({
    props: {
      rows: { type: "json", default: [] },
      columns: { type: "json", default: [] },
      pageSize: { type: "number", default: 10 },
      filterable: { type: "boolean", default: true },
      emptyText: { type: "string", default: "No results." },
      rowKey: { type: "string", default: "id" }
    },
    theme: {
      "tc-table-surface": "var(--tc-color-surface, #ffffff)",
      "tc-table-ink": "var(--tc-color-ink, #14171f)",
      "tc-table-soft": "var(--tc-color-ink-soft, #5a6072)",
      "tc-table-rule": "var(--tc-color-rule, #ece5d3)",
      "tc-table-head-bg": "var(--tc-color-surface-alt, #faf8f3)",
      "tc-table-row-hover": "rgba(161, 105, 57, 0.05)",
      "tc-table-accent": "var(--tc-color-accent, #a16939)",
      "tc-table-radius": "var(--tc-radius-lg, 10px)",
      "tc-table-font": "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"
    },
    styles: {
      display: "block"
    },
    children: [
      // Inline stylesheet — present on every render, not interpolated.
      describe({ tag: "style", template: TABLE_CSS }),
      // Search input. Only rendered when filterable. Keyed in `for:`-style:
      // we rebuild it whenever the parent re-renders, which means typing in
      // the input causes a re-render and a new input. Same trade-off as
      // <tc-input>: the host `value` prop and DOM input value stay in sync,
      // and modern browsers preserve caret across innerHTML replacement.
      describe({
        if: ({ props }) => Boolean(props.filterable),
        tag: "input",
        className: "filter",
        attributes: { placeholder: "Search...", type: "text" }
        // The `value` is set imperatively in afterRender below so the input
        // node itself can persist (no template = no innerHTML replacement
        // per render).
      }),
      // Table chrome.
      describe({
        tag: "div",
        className: "wrap",
        children: [
          describe({
            tag: "table",
            children: [
              describe({
                tag: "thead",
                template: ({ props, state }) => {
                  const cols = props.columns ?? [];
                  const ts = state;
                  return `<tr>${cols.map((c) => {
                    const isSorted = ts.sortKey === c.key;
                    const sortable = c.sortable !== false;
                    const indicator = isSorted ? ts.sortDir === "asc" ? "\u25B2" : "\u25BC" : "";
                    const ariaSort = isSorted ? ts.sortDir === "asc" ? "ascending" : "descending" : "none";
                    return `<th
                        data-col="${esc9(c.key)}"
                        class="${sortable ? "sortable" : ""}"
                        aria-sort="${ariaSort}"
                      >${esc9(c.label)}<span class="sort">${indicator}</span></th>`;
                  }).join("")}</tr>`;
                }
              }),
              describe({
                tag: "tbody",
                // Empty-state row when there are no visible items.
                children: [
                  describe({
                    tag: "tr",
                    className: "empty",
                    if: ({ props, state }) => paginated(props, state).length === 0,
                    template: ({ props }) => {
                      const cols = props.columns ?? [];
                      return `<td colspan="${cols.length || 1}">${esc9(props.emptyText)}</td>`;
                    }
                  })
                ],
                // Real keyed rows. DOM nodes reuse across renders when the
                // row object's identity is unchanged.
                for: {
                  items: ({ props, state }) => paginated(props, state),
                  key: (row, i) => {
                    const r = row;
                    const rowKeyName = "id";
                    const k = r[rowKeyName];
                    return k ?? i;
                  },
                  render: (row, i, ctx) => {
                    const props = ctx.props;
                    const cols = props.columns ?? [];
                    const r = row;
                    return describe({
                      tag: "tr",
                      attributes: { "data-row-id": String(r["id"] ?? i) },
                      template: cols.map(
                        (c) => `<td>${typeof c.render === "function" ? c.render(r) : esc9(r[c.key] ?? "")}</td>`
                      ).join("")
                    });
                  }
                }
              })
            ]
          })
        ]
      }),
      // Pager footer.
      describe({
        tag: "footer",
        className: "pager",
        template: ({ props, state }) => {
          const ts = state;
          const visible = visibleRows(props, ts);
          const size = props.pageSize ?? 10;
          const totalPages = Math.max(1, Math.ceil(visible.length / size));
          const page = Math.min(ts.page ?? 0, totalPages - 1);
          const total = (props.rows ?? []).length;
          return `
            <span class="count">${visible.length} of ${total} rows</span>
            <span class="spacer"></span>
            <button class="prev" type="button" ${page <= 0 ? "disabled" : ""}>\u2039 prev</button>
            <span class="page">page ${page + 1} of ${totalPages}</span>
            <button class="next" type="button" ${page >= totalPages - 1 ? "disabled" : ""}>next \u203A</button>
          `;
        }
      })
    ],
    refs: {
      filter: ".filter"
    },
    afterRender() {
      const host = this;
      const inp = host.refs.filter;
      if (!inp)
        return;
      const q = host.getState("q") ?? "";
      if (inp.value !== q)
        inp.value = q;
      const intent = FOCUS_INTENT.get(host);
      if (intent) {
        FOCUS_INTENT.delete(host);
        inp.focus();
        const pos = Math.min(intent.caret, inp.value.length);
        try {
          inp.setSelectionRange(pos, pos);
        } catch {
        }
      }
    },
    events: {
      "input .filter": (e, ctx) => {
        const target = e.target;
        FOCUS_INTENT.set(ctx.host, {
          caret: target.selectionStart ?? target.value.length
        });
        ctx.setState("q", target.value);
        ctx.setState("page", 0);
      },
      "click .prev": (_e, ctx) => {
        const p = (ctx.state.page ?? 0) - 1;
        ctx.setState("page", Math.max(0, p));
      },
      "click .next": (_e, ctx) => {
        const ts = ctx.state;
        const total = visibleRows(ctx.props, ts).length;
        const size = ctx.props.pageSize ?? 10;
        const max = Math.max(0, Math.ceil(total / size) - 1);
        const p = (ts.page ?? 0) + 1;
        ctx.setState("page", Math.min(max, p));
      },
      "click th.sortable": (e, ctx) => {
        const target = e.target.closest("th");
        if (!target)
          return;
        const key = target.dataset.col;
        if (!key)
          return;
        const cur = ctx.state;
        let dir;
        if (cur.sortKey !== key) {
          dir = "asc";
        } else {
          dir = cur.sortDir === "asc" ? "desc" : cur.sortDir === "desc" ? null : "asc";
        }
        ctx.setState("sortKey", dir ? key : null);
        ctx.setState("sortDir", dir);
        ctx.emit("tc-sort-change", { key: dir ? key : null, direction: dir });
      },
      "click tr[data-row-id]": (e, ctx) => {
        const tr = e.target.closest(
          "tr[data-row-id]"
        );
        if (!tr)
          return;
        const id = tr.dataset.rowId;
        if (id === void 0)
          return;
        const visible = visibleRows(ctx.props, ctx.state);
        const row = visible.find((r) => String(r["id"]) === id) ?? visible[Number(id)];
        if (row)
          ctx.emit("tc-row-click", { row });
      }
    }
  })
);
function visibleRows(props, state) {
  const all = props.rows ?? [];
  const cols = props.columns ?? [];
  const q = (state.q ?? "").trim().toLowerCase();
  let out = q.length === 0 ? all.slice() : all.filter(
    (row) => cols.some((c) => String(row[c.key] ?? "").toLowerCase().includes(q))
  );
  if (state.sortKey && state.sortDir) {
    const key = state.sortKey;
    const dir = state.sortDir === "asc" ? 1 : -1;
    out = out.slice().sort((a, b) => {
      const av = a[key];
      const bv = b[key];
      if (av === bv)
        return 0;
      if (av === void 0 || av === null)
        return 1;
      if (bv === void 0 || bv === null)
        return -1;
      if (typeof av === "number" && typeof bv === "number") {
        return (av - bv) * dir;
      }
      return String(av).localeCompare(String(bv)) * dir;
    });
  }
  return out;
}
function paginated(props, state) {
  const size = props.pageSize ?? 10;
  const visible = visibleRows(props, state);
  const totalPages = Math.max(1, Math.ceil(visible.length / size));
  const page = Math.min(state.page ?? 0, totalPages - 1);
  return visible.slice(page * size, page * size + size);
}
function esc9(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// components/tabs.ts
var TAG10 = "tc-tabs";
var tagName10 = TAG10;
build(
  TAG10,
  describe({
    props: {
      tabs: { type: "json", default: [] },
      active: { type: "string", default: "", reflect: true }
    },
    theme: {
      "tc-tabs-fg": "var(--tc-color-ink, #14171f)",
      "tc-tabs-fg-muted": "var(--tc-color-ink-muted, #6b7280)",
      "tc-tabs-rule": "var(--tc-color-rule, #ece5d3)",
      "tc-tabs-accent": "var(--tc-color-accent, #a16939)",
      "tc-tabs-font": "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"
    },
    styles: {
      display: "block",
      "font-family": "var(--tc-tabs-font)"
    },
    template: ({ props }) => {
      const tabs = props.tabs ?? [];
      const active = props.active || tabs[0]?.id || "";
      return `
        <div role="tablist" class="strip">
          ${tabs.map(
        (t) => `<button
              role="tab"
              type="button"
              class="tab ${t.id === active ? "active" : ""}"
              data-tab="${esc10(t.id)}"
              aria-selected="${t.id === active ? "true" : "false"}"
              aria-controls="panel-${esc10(t.id)}"
              tabindex="${t.id === active ? "0" : "-1"}"
            >${esc10(t.label)}</button>`
      ).join("")}
        </div>
        <div class="panels">
          ${tabs.map(
        (t) => `<section
              role="tabpanel"
              id="panel-${esc10(t.id)}"
              class="panel"
              aria-labelledby=""
              ${t.id === active ? "" : "hidden"}
            ><slot name="${esc10(t.id)}"></slot></section>`
      ).join("")}
        </div>
        <style>
          .strip {
            display: flex; gap: 4px;
            border-bottom: 1px solid var(--tc-tabs-rule);
            margin-bottom: 16px;
          }
          .tab {
            font: inherit; font-size: 0.92rem; font-weight: 500;
            background: transparent; border: none; cursor: pointer;
            padding: 10px 16px; margin-bottom: -1px;
            color: var(--tc-tabs-fg-muted);
            border-bottom: 2px solid transparent;
            transition: color 0.15s ease, border-color 0.15s ease;
          }
          .tab:hover { color: var(--tc-tabs-fg); }
          .tab.active {
            color: var(--tc-tabs-accent);
            border-bottom-color: var(--tc-tabs-accent);
          }
          .tab:focus-visible {
            outline: 2px solid var(--tc-tabs-accent);
            outline-offset: 2px;
            border-radius: 4px;
          }
          .panel { color: var(--tc-tabs-fg); line-height: 1.6; }
        </style>
      `;
    },
    events: {
      "click .tab": (e, ctx) => {
        const target = e.target.closest(".tab");
        if (!target)
          return;
        const id = target.dataset.tab;
        if (!id)
          return;
        const host = ctx.host;
        const previous = host.active;
        if (previous === id)
          return;
        host.active = id;
        ctx.emit("tc-tab-change", { active: id, previous });
      },
      "keydown .tab": (e, ctx) => {
        const ev = e;
        const tabs = ctx.props.tabs ?? [];
        if (tabs.length === 0)
          return;
        const host = ctx.host;
        const current = host.active || tabs[0].id;
        const idx = tabs.findIndex((t) => t.id === current);
        let next = idx;
        if (ev.key === "ArrowRight")
          next = (idx + 1) % tabs.length;
        else if (ev.key === "ArrowLeft") {
          next = (idx - 1 + tabs.length) % tabs.length;
        } else if (ev.key === "Home")
          next = 0;
        else if (ev.key === "End")
          next = tabs.length - 1;
        else
          return;
        ev.preventDefault();
        const id = tabs[next].id;
        host.active = id;
        ctx.emit("tc-tab-change", { active: id, previous: current });
        queueMicrotask(() => {
          const btn = ctx.host.shadowRoot?.querySelector(
            `.tab[data-tab="${id}"]`
          );
          btn?.focus();
        });
      }
    }
  })
);
function esc10(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// components/modal.ts
var TAG11 = "tc-modal";
var tagName11 = TAG11;
var DIALOG_LISTENERS = /* @__PURE__ */ new WeakMap();
build(
  TAG11,
  describe({
    props: {
      open: { type: "boolean", default: false, reflect: true },
      title: { type: "string", default: "" },
      dismissible: { type: "boolean", default: true },
      width: { type: "string", default: "min(560px, 92vw)" }
    },
    theme: {
      "tc-modal-surface": "var(--tc-color-surface, #ffffff)",
      "tc-modal-ink": "var(--tc-color-ink, #14171f)",
      "tc-modal-rule": "var(--tc-color-rule, #ece5d3)",
      "tc-modal-soft": "var(--tc-color-ink-soft, #5a6072)",
      "tc-modal-radius": "var(--tc-radius-lg, 12px)",
      "tc-modal-backdrop": "rgba(20, 23, 31, 0.5)",
      "tc-modal-shadow": "var(--tc-shadow-lg, 0 24px 60px rgba(20, 23, 31, 0.25))",
      "tc-modal-font": "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"
    },
    styles: {
      display: "contents"
    },
    template: ({ props }) => `
      <dialog class="dlg" aria-labelledby="${props.title ? "title" : ""}">
        ${props.title || props.dismissible ? `<header class="head">
              ${props.title ? `<h2 id="title" class="title">${esc11(props.title)}</h2>` : "<span></span>"}
              ${props.dismissible ? `<button class="x" type="button" aria-label="Close">\xD7</button>` : ""}
            </header>` : ""}
        <div class="body"><slot></slot></div>
        <footer class="foot"><slot name="footer"></slot></footer>
      </dialog>
      <style>
        .dlg {
          width: ${esc11(props.width)};
          max-width: 92vw;
          padding: 0;
          border: none;
          border-radius: var(--tc-modal-radius);
          background: var(--tc-modal-surface);
          color: var(--tc-modal-ink);
          font-family: var(--tc-modal-font);
          box-shadow: var(--tc-modal-shadow);
          overflow: hidden;
        }
        .dlg::backdrop {
          background: var(--tc-modal-backdrop);
          backdrop-filter: blur(2px);
        }
        .head {
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; padding: 16px 20px;
          border-bottom: 1px solid var(--tc-modal-rule);
        }
        .title {
          margin: 0; font-size: 1.05rem; font-weight: 700;
          letter-spacing: -0.01em;
        }
        .x {
          font: inherit; font-size: 1.4rem; line-height: 1;
          background: transparent; border: none; cursor: pointer;
          color: var(--tc-modal-soft);
          width: 32px; height: 32px; border-radius: 8px;
          display: inline-flex; align-items: center; justify-content: center;
        }
        .x:hover { background: var(--tc-modal-rule); color: var(--tc-modal-ink); }
        .body { padding: 20px; line-height: 1.6; color: var(--tc-modal-ink); }
        .foot {
          padding: 0;
        }
        .foot::slotted(*) {
          display: flex !important;
        }
        :host([open]) .foot:has(::slotted(*)) {
          padding: 12px 20px 16px;
          border-top: 1px solid var(--tc-modal-rule);
          display: flex; gap: 8px; justify-content: flex-end;
        }
      </style>
    `,
    refs: {
      dialog: ".dlg"
    },
    events: {
      "click .x": (_e, ctx) => {
        closeModal(ctx.host, "button");
      },
      "click .dlg": (e, ctx) => {
        const host = ctx.host;
        if (!host.dismissible)
          return;
        const dlg = ctx.refs.dialog;
        if (!dlg)
          return;
        if (e.target === dlg) {
          closeModal(host, "backdrop");
        }
      }
    },
    afterRender() {
      syncDialogOpen(this);
    },
    unmount() {
      const prior = DIALOG_LISTENERS.get(this);
      if (prior) {
        prior.cleanup();
        DIALOG_LISTENERS.delete(this);
      }
    }
  })
);
function syncDialogOpen(host) {
  const root = host.shadowRoot;
  if (!root)
    return;
  const dlg = root.querySelector(".dlg");
  if (!dlg)
    return;
  const isOpen = host.open;
  const prior = DIALOG_LISTENERS.get(host);
  if (prior && prior.dialog !== dlg) {
    prior.cleanup();
    DIALOG_LISTENERS.delete(host);
  }
  if (isOpen && !dlg.open) {
    if (typeof dlg.showModal === "function") {
      try {
        dlg.showModal();
      } catch {
        dlg.setAttribute("open", "");
      }
    } else {
      dlg.setAttribute("open", "");
    }
    if (!DIALOG_LISTENERS.has(host)) {
      const onClose = () => {
        const h = host;
        if (h.open) {
          h.open = false;
          host.dispatchEvent(
            new CustomEvent("tc-close", {
              detail: { reason: "escape" },
              bubbles: true,
              composed: true
            })
          );
        }
      };
      dlg.addEventListener("close", onClose);
      DIALOG_LISTENERS.set(host, {
        dialog: dlg,
        cleanup: () => dlg.removeEventListener("close", onClose)
      });
    }
  } else if (!isOpen && dlg.open) {
    try {
      dlg.close();
    } catch {
      dlg.removeAttribute("open");
    }
  }
}
function closeModal(host, reason) {
  if (!host.open)
    return;
  host.open = false;
  host.dispatchEvent(
    new CustomEvent("tc-close", {
      detail: { reason },
      bubbles: true,
      composed: true
    })
  );
}
function esc11(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// components/toast.ts
var TAG12 = "tc-toast";
var tagName12 = TAG12;
var TIMERS = /* @__PURE__ */ new WeakMap();
build(
  TAG12,
  describe({
    props: {
      open: { type: "boolean", default: false, reflect: true },
      variant: { type: "string", default: "info" },
      message: { type: "string", default: "" },
      duration: { type: "number", default: 4e3 },
      dismissible: { type: "boolean", default: true }
    },
    theme: {
      "tc-toast-info": "var(--tc-color-info, #3a5b8c)",
      "tc-toast-success": "var(--tc-color-success, #207a5b)",
      "tc-toast-warning": "var(--tc-color-warning, #a87326)",
      "tc-toast-error": "var(--tc-color-danger, #b3261e)",
      "tc-toast-fg": "var(--tc-color-surface, #ffffff)",
      "tc-toast-radius": "var(--tc-radius-lg, 10px)",
      "tc-toast-shadow": "var(--tc-shadow-lg, 0 12px 30px rgba(20, 23, 31, 0.18))",
      "tc-toast-font": "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"
    },
    styles: {
      display: "block"
    },
    template: ({ props }) => {
      const variant = String(props.variant ?? "info");
      const icon = variant === "success" ? "\u2713" : variant === "warning" ? "!" : variant === "error" ? "\u2715" : "i";
      return `
        <div class="toast v-${esc12(variant)} ${props.open ? "open" : "closed"}" role="status" aria-live="polite">
          <span class="icon" aria-hidden="true">${icon}</span>
          <span class="msg">${props.message ? esc12(props.message) : "<slot></slot>"}</span>
          ${props.dismissible ? `<button type="button" class="x" aria-label="Close">\xD7</button>` : ""}
        </div>
        <style>
          :host { display: block; }
          .toast {
            display: inline-flex; align-items: center; gap: 12px;
            padding: 11px 14px;
            font-family: var(--tc-toast-font);
            font-size: 0.92rem;
            color: var(--tc-toast-fg);
            border-radius: var(--tc-toast-radius);
            box-shadow: var(--tc-toast-shadow);
            transform: translateY(-6px);
            opacity: 0;
            transition: opacity 0.18s ease, transform 0.18s ease;
            pointer-events: none;
          }
          .toast.open {
            transform: translateY(0);
            opacity: 1;
            pointer-events: auto;
          }
          .v-info    { background: var(--tc-toast-info); }
          .v-success { background: var(--tc-toast-success); }
          .v-warning { background: var(--tc-toast-warning); }
          .v-error   { background: var(--tc-toast-error); }
          .icon {
            display: inline-flex; align-items: center; justify-content: center;
            width: 20px; height: 20px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.18);
            font-size: 0.78rem; font-weight: 700;
          }
          .msg { flex: 1 1 auto; line-height: 1.4; }
          .x {
            font: inherit; font-size: 1.1rem; line-height: 1;
            background: transparent; border: none;
            color: var(--tc-toast-fg); opacity: 0.8;
            cursor: pointer;
            width: 22px; height: 22px; border-radius: 6px;
            display: inline-flex; align-items: center; justify-content: center;
          }
          .x:hover { background: rgba(255, 255, 255, 0.18); opacity: 1; }
        </style>
      `;
    },
    events: {
      "click .x": (_e, ctx) => closeToast(ctx.host, "button")
    },
    afterMount() {
      scheduleAutoDismiss(this);
    },
    unmount() {
      const t = TIMERS.get(this);
      if (t !== void 0) {
        clearTimeout(t);
        TIMERS.delete(this);
      }
    }
  })
);
function scheduleAutoDismiss(host) {
  const h = host;
  const prev = TIMERS.get(host);
  if (prev !== void 0)
    clearTimeout(prev);
  TIMERS.delete(host);
  if (!h.open || !h.duration || h.duration <= 0)
    return;
  const id = setTimeout(() => {
    if (h.open)
      closeToast(host, "timeout");
  }, h.duration);
  TIMERS.set(host, id);
}
function closeToast(host, reason) {
  const h = host;
  if (!h.open)
    return;
  h.open = false;
  host.dispatchEvent(
    new CustomEvent("tc-toast-close", {
      detail: { reason },
      bubbles: true,
      composed: true
    })
  );
}
function esc12(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// components/stat.ts
var TAG13 = "tc-stat";
var tagName13 = TAG13;
build(
  TAG13,
  describe({
    props: {
      label: { type: "string", default: "" },
      value: { type: "string", default: "" },
      delta: { type: "string", default: "" },
      trend: { type: "string", default: "neutral" },
      prefix: { type: "string", default: "" },
      suffix: { type: "string", default: "" }
    },
    theme: {
      "tc-stat-surface": "var(--tc-color-surface, #ffffff)",
      "tc-stat-rule": "var(--tc-color-rule, #ece5d3)",
      "tc-stat-label": "var(--tc-color-ink-muted, #6b7280)",
      "tc-stat-value": "var(--tc-color-ink, #14171f)",
      "tc-stat-up": "var(--tc-color-success, #207a5b)",
      "tc-stat-down": "var(--tc-color-danger, #b3261e)",
      "tc-stat-neutral": "var(--tc-color-ink-muted, #6b7280)",
      "tc-stat-radius": "var(--tc-radius-lg, 12px)",
      "tc-stat-font": "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"
    },
    styles: {
      // Stretch in flex / grid containers so multiple stats in a row
      // share a baseline height. Otherwise the card with a `delta`
      // line ends up taller than its siblings.
      display: "flex",
      height: "100%"
    },
    template: ({ props }) => {
      const trend = String(props.trend ?? "neutral");
      const arrow = trend === "up" ? "\u25B2" : trend === "down" ? "\u25BC" : "\u2022";
      return `
        <div class="card">
          ${props.label ? `<div class="label">${esc13(props.label)}</div>` : ""}
          <div class="value">
            ${props.prefix ? `<span class="prefix">${esc13(props.prefix)}</span>` : ""}
            <span class="num">${esc13(props.value)}</span>
            ${props.suffix ? `<span class="suffix">${esc13(props.suffix)}</span>` : ""}
          </div>
          ${props.delta ? `<div class="delta t-${esc13(trend)}">
                  <span class="arrow" aria-hidden="true">${arrow}</span>
                  <span>${esc13(props.delta)}</span>
                </div>` : ""}
        </div>
        <style>
          :host { display: flex; height: 100%; }
          .card {
            background: var(--tc-stat-surface);
            border: 1px solid var(--tc-stat-rule);
            border-radius: var(--tc-stat-radius);
            padding: 18px 20px;
            font-family: var(--tc-stat-font);
            flex: 1 1 auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .label {
            font-size: 0.78rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            color: var(--tc-stat-label);
            margin-bottom: 8px;
          }
          .value {
            display: flex;
            align-items: baseline;
            gap: 4px;
            color: var(--tc-stat-value);
            font-size: 1.8rem;
            font-weight: 700;
            letter-spacing: -0.02em;
            line-height: 1.1;
            font-variant-numeric: tabular-nums;
          }
          .prefix, .suffix {
            font-size: 1.05rem;
            font-weight: 500;
            color: var(--tc-stat-label);
          }
          .delta {
            display: inline-flex; align-items: center; gap: 4px;
            margin-top: 10px;
            font-size: 0.85rem; font-weight: 500;
            font-variant-numeric: tabular-nums;
          }
          .delta.t-up      { color: var(--tc-stat-up); }
          .delta.t-down    { color: var(--tc-stat-down); }
          .delta.t-neutral { color: var(--tc-stat-neutral); }
          .arrow { font-size: 0.7rem; }
        </style>
      `;
    }
  })
);
function esc13(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// components/card.ts
var TAG14 = "tc-card";
var tagName14 = TAG14;
build(
  TAG14,
  describe({
    props: {
      title: { type: "string", default: "" },
      subtitle: { type: "string", default: "" },
      padded: { type: "boolean", default: true },
      bordered: { type: "boolean", default: true },
      elevated: { type: "boolean", default: false }
    },
    theme: {
      "tc-card-surface": "var(--tc-color-surface, #ffffff)",
      "tc-card-ink": "var(--tc-color-ink, #14171f)",
      "tc-card-soft": "var(--tc-color-ink-soft, #5a6072)",
      "tc-card-rule": "var(--tc-color-rule, #ece5d3)",
      "tc-card-radius": "var(--tc-radius-lg, 12px)",
      "tc-card-shadow": "var(--tc-shadow-md, 0 8px 24px rgba(20, 23, 31, 0.06))",
      "tc-card-font": "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
      // Spacing tokens — override per-instance for tighter/looser cards.
      "tc-card-padding-x": "var(--tc-space-5, 20px)",
      "tc-card-padding-y": "var(--tc-space-5, 20px)",
      "tc-card-gap": "var(--tc-space-3, 12px)"
    },
    styles: {
      display: "block"
    },
    template: ({ props }) => {
      const hasHeaderProps = Boolean(props.title) || Boolean(props.subtitle);
      const classes = [
        "card",
        props.bordered ? "bordered" : "",
        props.elevated ? "elevated" : "",
        // Padding is the default; only stamp `nopad` when the user
        // explicitly opted out. Defending against an undefined prop
        // means the body still has padding out of the box.
        props.padded === false ? "nopad" : "",
        hasHeaderProps ? "has-header" : ""
      ].filter(Boolean).join(" ");
      return `
        <div class="${classes}">
          <div class="media"><slot name="media"></slot></div>
          <div class="head">
            <slot name="header">
              ${props.title ? `<div class="title">${esc14(props.title)}</div>` : ""}
              ${props.subtitle ? `<div class="subtitle">${esc14(props.subtitle)}</div>` : ""}
            </slot>
          </div>
          <div class="body"><slot></slot></div>
          <div class="foot"><slot name="footer"></slot></div>
        </div>
        <style>
          :host { display: block; }
          .card {
            background: var(--tc-card-surface);
            color: var(--tc-card-ink);
            font-family: var(--tc-card-font);
            border-radius: var(--tc-card-radius);
            overflow: hidden;
          }
          .card.bordered { border: 1px solid var(--tc-card-rule); }
          .card.elevated { box-shadow: var(--tc-card-shadow); }

          /* Body padding is the deterministic default. The head and foot
             pad themselves separately. Padding kicks in even if the
             padded class somehow is not applied to the host, so consumers
             get a sensibly-padded card out of the box without needing to
             remember a flag. Override only when padded=false. */
          .body {
            padding: var(--tc-card-padding-y) var(--tc-card-padding-x);
          }

          /* Head padding when title/subtitle props are set OR something
             is slotted into name="header". The body then trims its top
             padding so the two sections meet at --tc-card-gap. */
          .card.has-header .head,
          .card .head:has(::slotted(*)) {
            padding:
              var(--tc-card-padding-y)
              var(--tc-card-padding-x)
              var(--tc-card-gap);
          }
          .card.has-header .head + .body,
          .card .head:has(::slotted(*)) + .body {
            padding-top: 0;
          }

          /* Hide an empty head \u2014 neither props nor slotted content. */
          .card:not(.has-header) .head:not(:has(::slotted(*))) {
            display: none;
          }

          /* Foot only renders when there's slotted footer content. */
          .card .foot:has(::slotted(*)) {
            padding:
              var(--tc-card-gap)
              var(--tc-card-padding-x)
              var(--tc-card-padding-y);
            border-top: 1px solid var(--tc-card-rule);
            display: flex;
            gap: var(--tc-space-2, 8px);
            justify-content: flex-end;
          }
          .card .foot:not(:has(::slotted(*))) { display: none; }

          /* Media is full-bleed (no horizontal padding) but we still
             trim the body's top padding when media is shown so the
             image sits flush against the border. */
          .media:not(:has(::slotted(*))) { display: none; }
          .media::slotted(*) {
            display: block;
            width: 100%;
            height: auto;
          }

          /* Title / subtitle defaults (used inside the slot fallback). */
          .title {
            font-weight: 700;
            font-size: 1.05rem;
            letter-spacing: -0.01em;
            line-height: 1.3;
          }
          .subtitle {
            margin-top: 4px;
            font-size: 0.88rem;
            line-height: 1.45;
            color: var(--tc-card-soft);
          }

          /* padded=false opt-out \u2014 the template applies "nopad" to the
             host inner .card when the prop is false. */
          .card.nopad .body,
          .card.nopad .head,
          .card.nopad .foot { padding: 0; }
        </style>
      `;
    }
  })
);
function esc14(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// components/badge.ts
var TAG15 = "tc-badge";
var tagName15 = TAG15;
build(
  TAG15,
  describe({
    props: {
      variant: { type: "string", default: "neutral" },
      size: { type: "string", default: "md" },
      pill: { type: "boolean", default: false }
    },
    theme: {
      "tc-badge-radius": "var(--tc-radius-sm, 6px)",
      "tc-badge-font": "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
      "tc-badge-neutral-bg": "var(--tc-color-rule, #ece5d3)",
      "tc-badge-neutral-fg": "var(--tc-color-ink, #14171f)",
      "tc-badge-info-bg": "var(--tc-color-info-bg, #dde6f4)",
      "tc-badge-info-fg": "var(--tc-color-info-fg, #1f3a66)",
      "tc-badge-success-bg": "var(--tc-color-success-bg, #dbece2)",
      "tc-badge-success-fg": "var(--tc-color-success-fg, #155b40)",
      "tc-badge-warning-bg": "var(--tc-color-warning-bg, #f5e7cf)",
      "tc-badge-warning-fg": "var(--tc-color-warning-fg, #7a4f0a)",
      "tc-badge-danger-bg": "var(--tc-color-danger-bg, #f4dad7)",
      "tc-badge-danger-fg": "var(--tc-color-danger-fg, #7a1a14)"
    },
    styles: {
      display: "inline-block"
    },
    template: ({ props }) => `
      <span class="badge v-${esc15(props.variant)} s-${esc15(props.size)} ${props.pill ? "pill" : ""}">
        <slot></slot>
      </span>
      <style>
        .badge {
          display: inline-flex; align-items: center;
          font-family: var(--tc-badge-font); font-weight: 600;
          line-height: 1; white-space: nowrap;
          border-radius: var(--tc-badge-radius);
        }
        .badge.pill { border-radius: 999px; }
        .s-sm { font-size: 0.7rem; padding: 3px 7px; }
        .s-md { font-size: 0.78rem; padding: 4px 9px; }
        .v-neutral { background: var(--tc-badge-neutral-bg); color: var(--tc-badge-neutral-fg); }
        .v-info    { background: var(--tc-badge-info-bg);    color: var(--tc-badge-info-fg); }
        .v-success { background: var(--tc-badge-success-bg); color: var(--tc-badge-success-fg); }
        .v-warning { background: var(--tc-badge-warning-bg); color: var(--tc-badge-warning-fg); }
        .v-danger  { background: var(--tc-badge-danger-bg);  color: var(--tc-badge-danger-fg); }
      </style>
    `
  })
);
function esc15(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// components/skeleton.ts
var TAG16 = "tc-skeleton";
var tagName16 = TAG16;
build(
  TAG16,
  describe({
    props: {
      width: { type: "string", default: "100%" },
      height: { type: "string", default: "1em" },
      rounded: { type: "boolean", default: false },
      pulse: { type: "boolean", default: true }
    },
    theme: {
      "tc-skeleton-base": "var(--tc-color-rule, #ece5d3)",
      "tc-skeleton-shine": "rgba(255, 255, 255, 0.6)",
      "tc-skeleton-radius": "var(--tc-radius-md, 6px)"
    },
    styles: {
      display: "inline-block",
      "vertical-align": "middle"
    },
    template: ({ props }) => `
      <span
        class="bone ${props.pulse ? "pulse" : ""} ${props.rounded ? "round" : ""}"
        aria-hidden="true"
        style="width: ${esc16(props.width)}; height: ${esc16(props.height)};"
      ></span>
      <style>
        .bone {
          display: inline-block;
          background: var(--tc-skeleton-base);
          border-radius: var(--tc-skeleton-radius);
          position: relative; overflow: hidden;
        }
        .bone.round { border-radius: 50%; }
        .bone.pulse::after {
          content: "";
          position: absolute; inset: 0;
          background: linear-gradient(
            90deg,
            transparent,
            var(--tc-skeleton-shine),
            transparent
          );
          transform: translateX(-100%);
          animation: tc-shimmer 1.4s infinite;
        }
        @keyframes tc-shimmer {
          to { transform: translateX(100%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .bone.pulse::after { animation: none; opacity: 0.4; }
        }
      </style>
    `
  })
);
function esc16(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// components/stack.ts
var TAG17 = "tc-stack";
var tagName17 = TAG17;
build(
  TAG17,
  describe({
    props: {
      gap: { type: "string", default: "4" },
      align: { type: "string", default: "stretch" }
    },
    styles: {
      display: "block"
    },
    template: ({ props }) => `
      <div class="stack" style="--tc-stack-gap: ${gapValue(props.gap)}; --tc-stack-align: ${esc17(props.align)};">
        <slot></slot>
      </div>
      <style>
        .stack {
          display: flex;
          flex-direction: column;
          gap: var(--tc-stack-gap);
          align-items: var(--tc-stack-align);
        }
      </style>
    `
  })
);
function gapValue(g) {
  const s = String(g ?? "4").trim();
  if (/^[1-8]$/.test(s))
    return `var(--tc-space-${s}, ${defaultSpace(s)})`;
  return s;
}
function defaultSpace(n) {
  const map = {
    "1": "4px",
    "2": "8px",
    "3": "12px",
    "4": "16px",
    "5": "24px",
    "6": "32px",
    "7": "48px",
    "8": "64px"
  };
  return map[n] ?? "16px";
}
function esc17(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// components/cluster.ts
var TAG18 = "tc-cluster";
var tagName18 = TAG18;
build(
  TAG18,
  describe({
    props: {
      gap: { type: "string", default: "3" },
      justify: { type: "string", default: "start" },
      align: { type: "string", default: "center" },
      wrap: { type: "boolean", default: true }
    },
    styles: {
      display: "block"
    },
    template: ({ props }) => `
      <div class="cluster" style="
        --tc-cluster-gap: ${gapValue2(props.gap)};
        --tc-cluster-justify: ${justifyValue(props.justify)};
        --tc-cluster-align: ${esc18(props.align)};
        --tc-cluster-wrap: ${props.wrap ? "wrap" : "nowrap"};
      ">
        <slot></slot>
      </div>
      <style>
        .cluster {
          display: flex;
          flex-direction: row;
          gap: var(--tc-cluster-gap);
          justify-content: var(--tc-cluster-justify);
          align-items: var(--tc-cluster-align);
          flex-wrap: var(--tc-cluster-wrap);
        }
      </style>
    `
  })
);
function justifyValue(j) {
  const s = String(j ?? "start").trim();
  switch (s) {
    case "between":
      return "space-between";
    case "around":
      return "space-around";
    case "evenly":
      return "space-evenly";
    default:
      return s;
  }
}
function gapValue2(g) {
  const s = String(g ?? "3").trim();
  if (/^[1-8]$/.test(s))
    return `var(--tc-space-${s}, ${defaultSpace2(s)})`;
  return s;
}
function defaultSpace2(n) {
  const map = {
    "1": "4px",
    "2": "8px",
    "3": "12px",
    "4": "16px",
    "5": "24px",
    "6": "32px",
    "7": "48px",
    "8": "64px"
  };
  return map[n] ?? "12px";
}
function esc18(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// components/grid.ts
var TAG19 = "tc-grid";
var tagName19 = TAG19;
build(
  TAG19,
  describe({
    props: {
      min: { type: "string", default: "260px" },
      gap: { type: "string", default: "4" },
      columns: { type: "string", default: "" }
    },
    styles: {
      display: "block"
    },
    template: ({ props }) => {
      const cols = String(props.columns ?? "").trim();
      const template = cols ? `repeat(${esc19(cols)}, minmax(0, 1fr))` : `repeat(auto-fit, minmax(${esc19(props.min)}, 1fr))`;
      return `
        <div class="grid" style="
          --tc-grid-template: ${template};
          --tc-grid-gap: ${gapValue3(props.gap)};
        ">
          <slot></slot>
        </div>
        <style>
          .grid {
            display: grid;
            grid-template-columns: var(--tc-grid-template);
            gap: var(--tc-grid-gap);
          }
        </style>
      `;
    }
  })
);
function gapValue3(g) {
  const s = String(g ?? "4").trim();
  if (/^[1-8]$/.test(s))
    return `var(--tc-space-${s}, ${defaultSpace3(s)})`;
  return s;
}
function defaultSpace3(n) {
  const map = {
    "1": "4px",
    "2": "8px",
    "3": "12px",
    "4": "16px",
    "5": "24px",
    "6": "32px",
    "7": "48px",
    "8": "64px"
  };
  return map[n] ?? "16px";
}
function esc19(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// components/code.ts
var TAG20 = "tc-code";
var tagName20 = TAG20;
var COPY_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
var CHECK_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
build(
  TAG20,
  describe({
    props: {
      language: { type: "string", default: "" },
      copy: { type: "boolean", default: false },
      filename: { type: "string", default: "" }
    },
    theme: {
      "tc-code-bg": "var(--tc-code-bg-base, #14171f)",
      "tc-code-ink": "var(--tc-code-ink-base, #efe6d4)",
      "tc-code-rule": "var(--tc-code-rule-base, rgba(255,255,255,0.08))",
      "tc-code-label": "var(--tc-code-label-base, #8a8678)",
      "tc-code-radius": "var(--tc-radius-md, 10px)",
      "tc-code-font": "var(--tc-font-mono, 'JetBrains Mono', ui-monospace, monospace)",
      "tc-code-padding": "var(--tc-space-5, 20px) var(--tc-space-5, 20px)",
      "tc-code-kw": "var(--tc-code-kw-base, #f0a878)",
      "tc-code-str": "var(--tc-code-str-base, #d9b380)",
      "tc-code-com": "var(--tc-code-com-base, #8a8678)",
      "tc-code-num": "var(--tc-code-num-base, #c4d3b8)",
      "tc-code-tag": "var(--tc-code-tag-base, #d49a68)"
    },
    styles: {
      display: "block"
    },
    template: ({ props, state }) => {
      const label = props.filename || props.language || "";
      const copied = state.copied === true;
      return `
        <div class="block">
          ${label || props.copy ? `
            <header class="bar">
              <span class="label">${esc20(label)}</span>
              ${props.copy ? `<button type="button" class="copy" aria-label="Copy code">
                    <span class="copy-icon" aria-hidden="true">${copied ? CHECK_SVG : COPY_SVG}</span>
                    <span class="copy-text">${copied ? "Copied" : "Copy"}</span>
                  </button>` : ""}
            </header>
          ` : ""}
          <pre><code class="code lang-${esc20(String(props.language || "txt"))}"><slot></slot></code></pre>
        </div>
        <style>
          :host { display: block; }
          .block {
            background: var(--tc-code-bg);
            color: var(--tc-code-ink);
            border-radius: var(--tc-code-radius);
            font-family: var(--tc-code-font);
            font-size: 0.84rem;
            line-height: 1.7;
            overflow: hidden;
          }
          .bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 14px;
            border-bottom: 1px solid var(--tc-code-rule);
            font-size: 0.74rem;
          }
          .label {
            color: var(--tc-code-label);
            font-family: var(--tc-code-font);
            text-transform: lowercase;
            letter-spacing: 0.04em;
          }
          .copy {
            font: inherit; font-size: 0.78rem;
            display: inline-flex; align-items: center; gap: 6px;
            background: transparent;
            color: var(--tc-code-label);
            border: 1px solid transparent;
            border-radius: 6px;
            padding: 4px 8px;
            cursor: pointer;
            transition: color 0.15s ease, background 0.15s ease, border-color 0.15s ease;
          }
          .copy:hover {
            color: var(--tc-code-ink);
            background: rgba(255, 255, 255, 0.04);
            border-color: var(--tc-code-rule);
          }
          .copy-icon { display: inline-flex; }
          .copy-icon svg { width: 13px; height: 13px; }
          pre {
            margin: 0;
            padding: var(--tc-code-padding);
            overflow-x: auto;
            font-family: inherit;
          }
          code { font-family: inherit; }
          /* Syntax-highlight classes for pre-tokenized code. The slot
             projects the user's nodes; they keep their light-DOM classes
             but inherit our colors via the parts protocol below. */
          ::slotted(.tc-kw)  { color: var(--tc-code-kw); }
          ::slotted(.tc-str) { color: var(--tc-code-str); }
          ::slotted(.tc-com) { color: var(--tc-code-com); font-style: italic; }
          ::slotted(.tc-num) { color: var(--tc-code-num); }
          ::slotted(.tc-tag) { color: var(--tc-code-tag); }
        </style>
      `;
    },
    events: {
      "click .copy": (_e, ctx) => {
        const host = ctx.host;
        const slot = host.shadowRoot?.querySelector("slot");
        const nodes = slot ? slot.assignedNodes({ flatten: true }) : Array.from(host.childNodes);
        const text = nodes.map((n) => n.textContent ?? "").join("");
        const finalize = () => {
          ctx.setState("copied", true);
          ctx.emit("tc-copy", { text });
          setTimeout(() => ctx.setState("copied", false), 1600);
        };
        if (navigator.clipboard?.writeText) {
          navigator.clipboard.writeText(text).then(finalize, finalize);
        } else {
          finalize();
        }
      }
    }
  })
);
function esc20(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// components/callout.ts
var TAG21 = "tc-callout";
var tagName21 = TAG21;
var ICONS = {
  note: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
  info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
  success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  danger: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`
};
build(
  TAG21,
  describe({
    props: {
      variant: { type: "string", default: "note" },
      title: { type: "string", default: "" },
      compact: { type: "boolean", default: false }
    },
    theme: {
      "tc-callout-radius": "var(--tc-radius-md, 8px)",
      "tc-callout-font": "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif)",
      // Per-variant tokens. Each one resolves through the global semantic
      // tokens so a theme switch re-skins all callouts.
      "tc-callout-note-bg": "var(--tc-color-surface-alt, #faf8f3)",
      "tc-callout-note-fg": "var(--tc-color-ink-soft, #4a5061)",
      "tc-callout-note-border": "var(--tc-color-rule-strong, #d9cfb8)",
      "tc-callout-info-bg": "var(--tc-color-info-bg, #dde6f4)",
      "tc-callout-info-fg": "var(--tc-color-info-fg, #1f3a66)",
      "tc-callout-info-border": "var(--tc-color-info, #3a5b8c)",
      "tc-callout-success-bg": "var(--tc-color-success-bg, #dbece2)",
      "tc-callout-success-fg": "var(--tc-color-success-fg, #155b40)",
      "tc-callout-success-border": "var(--tc-color-success, #207a5b)",
      "tc-callout-warning-bg": "var(--tc-color-warning-bg, #f5e7cf)",
      "tc-callout-warning-fg": "var(--tc-color-warning-fg, #7a4f0a)",
      "tc-callout-warning-border": "var(--tc-color-warning, #a87326)",
      "tc-callout-danger-bg": "var(--tc-color-danger-bg, #f4dad7)",
      "tc-callout-danger-fg": "var(--tc-color-danger-fg, #7a1a14)",
      "tc-callout-danger-border": "var(--tc-color-danger, #b3261e)"
    },
    styles: {
      display: "block"
    },
    template: ({ props }) => {
      const variant = String(props.variant ?? "note");
      const symbol = ICONS[variant] ?? ICONS.note;
      return `
        <aside
          class="callout v-${esc21(variant)} ${props.compact ? "compact" : ""}"
          role="${variant === "danger" ? "alert" : "note"}"
        >
          <span class="icon" aria-hidden="true">${symbol}</span>
          <div class="body">
            ${props.title ? `<div class="title">${esc21(props.title)}</div>` : ""}
            <div class="content"><slot></slot></div>
          </div>
        </aside>
        <style>
          :host { display: block; }
          .callout {
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 12px;
            padding: 14px 18px;
            border-radius: var(--tc-callout-radius);
            border-left: 3px solid var(--callout-border);
            background: var(--callout-bg);
            color: var(--callout-fg);
            font-family: var(--tc-callout-font);
            font-size: 0.95rem;
            line-height: 1.6;
          }
          .callout.compact { padding: 10px 14px; font-size: 0.9rem; }

          .v-note    { --callout-bg: var(--tc-callout-note-bg);    --callout-fg: var(--tc-callout-note-fg);    --callout-border: var(--tc-callout-note-border); }
          .v-info    { --callout-bg: var(--tc-callout-info-bg);    --callout-fg: var(--tc-callout-info-fg);    --callout-border: var(--tc-callout-info-border); }
          .v-success { --callout-bg: var(--tc-callout-success-bg); --callout-fg: var(--tc-callout-success-fg); --callout-border: var(--tc-callout-success-border); }
          .v-warning { --callout-bg: var(--tc-callout-warning-bg); --callout-fg: var(--tc-callout-warning-fg); --callout-border: var(--tc-callout-warning-border); }
          .v-danger  { --callout-bg: var(--tc-callout-danger-bg);  --callout-fg: var(--tc-callout-danger-fg);  --callout-border: var(--tc-callout-danger-border); }

          .icon {
            display: inline-flex;
            width: 20px; height: 20px;
            margin-top: 2px;
            color: var(--callout-border);
          }
          .icon svg { width: 100%; height: 100%; }

          .title {
            font-weight: 600;
            margin-bottom: 4px;
            color: var(--callout-fg);
          }

          .content ::slotted(p:first-child) { margin-top: 0; }
          .content ::slotted(p:last-child)  { margin-bottom: 0; }
        </style>
      `;
    }
  })
);
function esc21(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// components/toc.ts
var TAG22 = "tc-toc";
var tagName22 = TAG22;
var STATE = /* @__PURE__ */ new WeakMap();
build(
  TAG22,
  describe({
    props: {
      target: { type: "string", default: "main" },
      levels: { type: "string", default: "h2,h3" },
      sticky: { type: "boolean", default: true },
      label: { type: "string", default: "On this page" }
    },
    theme: {
      "tc-toc-fg": "var(--tc-color-ink, #14171f)",
      "tc-toc-fg-muted": "var(--tc-color-ink-muted, #6b7280)",
      "tc-toc-active": "var(--tc-color-accent, #a16939)",
      "tc-toc-rule": "var(--tc-color-rule, #ece5d3)",
      "tc-toc-label": "var(--tc-color-ink-soft, #4a5061)",
      "tc-toc-font": "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif)",
      "tc-toc-top": "80px"
    },
    styles: {
      display: "block"
    },
    template: ({ props, state }) => {
      const items = state.items ?? [];
      const active = state.activeId ?? "";
      return `
        <nav
          class="toc${props.sticky ? " sticky" : ""}"
          aria-label="Table of contents"
        >
          ${props.label ? `<div class="label">${esc22(props.label)}</div>` : ""}
          ${items.length === 0 ? `<p class="empty">No sections yet.</p>` : `<ol class="list">${items.map(
        (it) => `<li class="lvl-${it.level}${it.id === active ? " active" : ""}"><a href="#${esc22(it.id)}">${esc22(it.text)}</a></li>`
      ).join("")}</ol>`}
        </nav>
        <style>
          :host { display: block; font-family: var(--tc-toc-font); }
          .toc {
            font-size: 0.9rem;
            color: var(--tc-toc-fg-muted);
            padding-left: 14px;
            border-left: 1px solid var(--tc-toc-rule);
          }
          .toc.sticky { position: sticky; top: var(--tc-toc-top); }
          .label {
            font-size: 0.74rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: var(--tc-toc-label);
            margin-bottom: 10px;
          }
          .list {
            list-style: none; padding: 0; margin: 0;
            display: flex; flex-direction: column; gap: 4px;
          }
          .list a {
            display: block;
            padding: 4px 0;
            color: var(--tc-toc-fg-muted);
            text-decoration: none;
            line-height: 1.4;
            transition: color 0.15s ease;
          }
          .list a:hover { color: var(--tc-toc-fg); }
          .list .active > a {
            color: var(--tc-toc-active);
            font-weight: 600;
          }
          .lvl-3 a { padding-left: 12px; font-size: 0.86rem; }
          .lvl-4 a { padding-left: 24px; font-size: 0.84rem; }
          .lvl-5 a, .lvl-6 a { padding-left: 36px; font-size: 0.82rem; }
          .empty { color: var(--tc-toc-fg-muted); font-size: 0.86rem; margin: 0; }
        </style>
      `;
    },
    afterMount() {
      scanAndObserve(this);
    },
    unmount() {
      const s = STATE.get(this);
      s?.observer?.disconnect();
      STATE.delete(this);
    }
  })
);
function scanAndObserve(host) {
  const prev = STATE.get(host);
  prev?.observer?.disconnect();
  const props = host;
  const targetSelector = props.target || "main";
  const levels = (props.levels || "h2,h3").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
  const target = document.querySelector(targetSelector);
  if (!target)
    return;
  const headings = Array.from(target.querySelectorAll(levels.join(","))).filter((h) => h instanceof HTMLElement);
  const items = headings.map((h) => {
    if (!h.id)
      h.id = slugify(h.textContent ?? "");
    return {
      id: h.id,
      level: parseInt(h.tagName.slice(1), 10),
      text: (h.textContent ?? "").trim()
    };
  });
  host.setState(
    "items",
    items
  );
  if (typeof IntersectionObserver === "undefined")
    return;
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      const top = visible[0];
      if (!top)
        return;
      const id = top.target.id;
      if (!id)
        return;
      host.setState(
        "activeId",
        id
      );
    },
    { rootMargin: "0px 0px -70% 0px", threshold: 0 }
  );
  for (const h of headings)
    observer.observe(h);
  STATE.set(host, { observer, activeId: "" });
}
function slugify(text) {
  return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-") || "section";
}
function esc22(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// components/pagination.ts
var TAG23 = "tc-pagination";
var tagName23 = TAG23;
build(
  TAG23,
  describe({
    props: {
      current: { type: "number", default: 1 },
      total: { type: "number", default: 1 },
      siblings: { type: "number", default: 1 },
      boundaries: { type: "number", default: 1 },
      size: { type: "string", default: "sm" },
      "prev-label": { type: "string", default: "Prev" },
      "next-label": { type: "string", default: "Next" },
      label: { type: "string", default: "Pagination" }
    },
    styles: {
      display: "block"
    },
    template: ({ props }) => {
      const total = Math.max(1, Number(props.total) | 0);
      const current = clamp(Number(props.current) | 0, 1, total);
      const siblings = Math.max(0, Number(props.siblings) | 0);
      const boundaries = Math.max(0, Number(props.boundaries) | 0);
      if (total <= 1)
        return "";
      const items = buildPageList(current, total, siblings, boundaries);
      const size = esc23(String(props.size ?? "sm"));
      const prevDisabled = current <= 1 ? " disabled" : "";
      const nextDisabled = current >= total ? " disabled" : "";
      const pages = items.map((it) => {
        if (it === "\u2026") {
          return `<span class="ellipsis" aria-hidden="true">\u2026</span>`;
        }
        const isActive = it === current;
        const variant = isActive ? "primary" : "ghost";
        const ariaCurrent = isActive ? ' aria-current="page"' : "";
        return `<tc-button
            class="num"
            size="${size}"
            variant="${variant}"
            data-page="${it}"${ariaCurrent}
          >${it}</tc-button>`;
      }).join("");
      return `
        <nav aria-label="${esc23(String(props.label ?? "Pagination"))}">
          <tc-button
            class="prev"
            size="${size}"
            variant="ghost"
            data-page="${current - 1}"${prevDisabled}
          >\u2190 ${esc23(String(props["prev-label"] ?? "Prev"))}</tc-button>
          <span class="pages">${pages}</span>
          <tc-button
            class="next"
            size="${size}"
            variant="ghost"
            data-page="${current + 1}"${nextDisabled}
          >${esc23(String(props["next-label"] ?? "Next"))} \u2192</tc-button>
        </nav>
        <style>
          :host { display: block; }
          nav {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            flex-wrap: wrap;
          }
          .pages {
            display: inline-flex;
            align-items: center;
            gap: 4px;
          }
          .ellipsis {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 28px;
            color: var(--tc-color-ink-muted, #6b7280);
            font-family: var(--tc-font-mono, "JetBrains Mono", monospace);
          }
          tc-button[aria-current="page"] {
            pointer-events: none;
          }
        </style>
      `;
    },
    events: {
      "click tc-button": (e, ctx) => {
        const btn = e.target.closest("tc-button");
        if (!btn)
          return;
        if (btn.hasAttribute("disabled"))
          return;
        const pageRaw = btn.getAttribute("data-page");
        if (pageRaw == null)
          return;
        const page = Number(pageRaw);
        const host = ctx.host;
        const total = Math.max(1, Number(host.total) | 0);
        const current = Number(host.current) | 0;
        if (!Number.isFinite(page) || page < 1 || page > total)
          return;
        if (page === current)
          return;
        ctx.emit("tc-page-change", { page });
      }
    }
  })
);
function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}
function buildPageList(current, total, siblings, boundaries) {
  const set = /* @__PURE__ */ new Set();
  for (let i = 1; i <= Math.min(boundaries, total); i++)
    set.add(i);
  for (let i = Math.max(1, total - boundaries + 1); i <= total; i++) {
    set.add(i);
  }
  for (let i = Math.max(1, current - siblings); i <= Math.min(total, current + siblings); i++) {
    set.add(i);
  }
  const sorted = [...set].sort((a, b) => a - b);
  const out = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1)
      out.push("\u2026");
    out.push(sorted[i]);
  }
  return out;
}
function esc23(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// components/combobox.ts
var TAG24 = "tc-combobox";
var tagName24 = TAG24;
function valuesFromProp(value) {
  if (Array.isArray(value))
    return value.map((v) => String(v)).filter(Boolean);
  const s = String(value ?? "").trim();
  if (!s)
    return [];
  return s.split(",").map((v) => v.trim()).filter(Boolean);
}
function joinValues(values) {
  return values.join(",");
}
function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
var COMBOBOX_STYLE = `
        <style>
          :host {
            display: block;
            position: relative;
          }
          .label {
            display: block;
            font-family: var(--tc-input-font);
            font-size: 0.84rem;
            font-weight: 500;
            color: var(--tc-input-fg);
            margin-bottom: 6px;
          }
          .req { color: var(--tc-input-error); }

          .control {
            position: relative;
            display: flex;
            align-items: center;
            gap: 6px;
            min-height: 40px;
            padding: 4px 8px 4px 10px;
            border: 1px solid var(--tc-input-border);
            border-radius: var(--tc-input-radius);
            background: var(--tc-input-bg);
            color: var(--tc-input-fg);
            font-family: var(--tc-input-font);
            cursor: text;
            transition: border-color 0.15s ease, box-shadow 0.15s ease;
          }
          .control:hover { border-color: var(--tc-input-border-focus); }
          .control.open,
          .control:focus-within {
            border-color: var(--tc-input-border-focus);
            box-shadow: 0 0 0 3px color-mix(in srgb, var(--tc-input-border-focus) 18%, transparent);
            outline: none;
          }
          .control.invalid { border-color: var(--tc-input-error); }
          .control.disabled {
            opacity: 0.6;
            cursor: not-allowed;
            background: var(--tc-color-bg, #f5f1e6);
          }

          .display {
            flex: 1 1 auto;
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
            align-items: center;
            min-width: 0;
          }
          .placeholder {
            color: var(--tc-input-helper);
            font-size: 0.92rem;
          }
          .single {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 0.92rem;
          }
          .single-icon { line-height: 1; }
          .search {
            border: none;
            outline: none;
            background: transparent;
            color: inherit;
            font: inherit;
            font-size: 0.92rem;
            padding: 4px 0;
            flex: 1 1 60px;
            min-width: 60px;
          }

          .chip {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 2px 4px 2px 8px;
            background: var(--tc-combobox-chip-bg);
            color: var(--tc-combobox-chip-fg);
            border-radius: var(--tc-radius-pill, 999px);
            font-size: 0.82rem;
            line-height: 1.2;
            max-width: 100%;
          }
          .chip-icon { line-height: 1; }
          .chip-label {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 200px;
          }
          .chip-remove {
            background: transparent;
            border: none;
            cursor: pointer;
            color: inherit;
            padding: 2px 6px;
            font-size: 0.95rem;
            border-radius: 50%;
            line-height: 1;
            font-family: inherit;
          }
          .chip-remove:hover { background: rgba(0, 0, 0, 0.08); }
          .chip-remove:disabled { cursor: not-allowed; }

          .caret {
            color: var(--tc-input-helper);
            margin-left: 4px;
            font-size: 0.85rem;
            line-height: 1;
            pointer-events: none;
            transition: transform 0.15s ease;
          }
          .control.open .caret { transform: rotate(180deg); }

          .popup {
            position: absolute;
            left: 0;
            right: 0;
            margin-top: 4px;
            background: var(--tc-combobox-popup-bg);
            border: 1px solid var(--tc-input-border);
            border-radius: var(--tc-input-radius);
            box-shadow: var(--tc-shadow-md, 0 8px 24px rgba(0, 0, 0, 0.08));
            max-height: 280px;
            overflow-y: auto;
            z-index: 50;
            padding: 4px;
            box-sizing: border-box;
          }
          .option {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 7px 10px;
            border-radius: var(--tc-radius-sm, 6px);
            font-size: 0.92rem;
            cursor: pointer;
            user-select: none;
            line-height: 1.3;
          }
          .option .check {
            width: 16px;
            display: inline-flex;
            justify-content: center;
            font-size: 0.85rem;
            color: var(--tc-color-accent, #a16939);
          }
          .option .opt-icon { line-height: 1; flex: 0 0 auto; }
          .option .opt-label {
            flex: 1 1 auto;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .option:hover,
          .option.focused {
            background: var(--tc-combobox-popup-hover);
          }
          .option.selected {
            background: var(--tc-combobox-popup-active);
            color: var(--tc-color-accent-hover, #8a572d);
            font-weight: 500;
          }
          .option.disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
          .empty {
            padding: 12px;
            text-align: center;
            color: var(--tc-input-helper);
            font-size: 0.92rem;
          }

          .helper {
            margin-top: 6px;
            font-size: 0.82rem;
            color: var(--tc-input-helper);
            font-family: var(--tc-input-font);
          }
          .helper.error { color: var(--tc-input-error); }
        </style>
`;
build(
  TAG24,
  describe({
    formAssociated: true,
    props: {
      value: { type: "string", default: "" },
      name: { type: "string", default: "" },
      options: { type: "json", default: [] },
      multiple: { type: "boolean", default: false },
      searchable: { type: "boolean", default: true },
      placeholder: { type: "string", default: "" },
      "empty-text": { type: "string", default: "No results" },
      label: { type: "string", default: "" },
      helper: { type: "string", default: "" },
      error: { type: "string", default: "" },
      disabled: { type: "boolean", default: false, reflect: true },
      required: { type: "boolean", default: false, reflect: true },
      max: { type: "number", default: 0 }
    },
    theme: {
      "tc-input-bg": "var(--tc-color-surface, #ffffff)",
      "tc-input-fg": "var(--tc-color-ink, #14171f)",
      "tc-input-border": "var(--tc-color-rule-strong, #d9cfb8)",
      "tc-input-border-focus": "var(--tc-color-accent, #a16939)",
      "tc-input-error": "var(--tc-color-danger, #b3261e)",
      "tc-input-helper": "var(--tc-color-ink-muted, #6b7280)",
      "tc-input-radius": "var(--tc-radius-md, 8px)",
      "tc-input-font": "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
      "tc-combobox-chip-bg": "var(--tc-color-accent-soft, #efe2cf)",
      "tc-combobox-chip-fg": "var(--tc-color-accent-hover, #8a572d)",
      "tc-combobox-popup-bg": "var(--tc-color-surface, #ffffff)",
      "tc-combobox-popup-hover": "var(--tc-color-accent-soft, #efe2cf)",
      "tc-combobox-popup-active": "var(--tc-color-accent-soft, #efe2cf)"
    },
    styles: {
      display: "block"
    },
    refs: {
      search: ".search",
      popup: ".popup"
    },
    template: ({ props, state }) => {
      const opts = props.options ?? [];
      const multiple = !!props.multiple;
      const searchable = props.searchable !== false;
      const disabled = !!props.disabled;
      const showError = Boolean(props.error);
      const selected = valuesFromProp(props.value);
      const query = String(state.query ?? "");
      const isOpen = !!state.open && !disabled;
      const focusedIndex = Number(state.focusedIndex ?? -1);
      const filtered = filterOptions(opts, query);
      const selectedSet = new Set(selected);
      const selectedOpts = selected.map((v) => opts.find((o) => o.value === v)).filter((o) => Boolean(o));
      const showSearch = searchable && (isOpen || multiple && selected.length === 0);
      const showSingleLabel = !multiple && selected.length === 1 && (!isOpen || !searchable);
      const showPlaceholder = selected.length === 0 && !showSearch && !showSingleLabel;
      const chipsHtml = multiple ? selectedOpts.map(
        (o) => `<span class="chip" data-value="${esc24(o.value)}">
              ${o.icon ? `<span class="chip-icon">${esc24(o.icon)}</span>` : ""}
              <span class="chip-label">${esc24(o.label)}</span>
              <button
                type="button"
                class="chip-remove"
                data-remove="${esc24(o.value)}"
                aria-label="Remove ${esc24(o.label)}"
                ${disabled ? "disabled" : ""}
              >&times;</button>
            </span>`
      ).join("") : "";
      const singleLabelHtml = showSingleLabel && selectedOpts[0] ? `<span class="single">
            ${selectedOpts[0].icon ? `<span class="single-icon">${esc24(selectedOpts[0].icon)}</span>` : ""}
            <span class="single-label">${esc24(selectedOpts[0].label)}</span>
          </span>` : "";
      const placeholderHtml = showPlaceholder ? `<span class="placeholder">${esc24(props.placeholder ?? "")}</span>` : "";
      const searchHtml = showSearch ? `<input
            type="text"
            class="search"
            part="search"
            value="${esc24(query)}"
            placeholder="${esc24(selected.length === 0 ? props.placeholder ?? "" : "")}"
            ${disabled ? "disabled" : ""}
            autocomplete="off"
            aria-autocomplete="list"
            aria-expanded="${isOpen ? "true" : "false"}"
            role="combobox"
          />` : "";
      const optionsHtml = filtered.length === 0 ? `<div class="empty">${esc24(props["empty-text"] ?? "No results")}</div>` : filtered.map((o, i) => {
        const checked = selectedSet.has(o.value);
        const isFocused = i === focusedIndex;
        const cls = [
          "option",
          checked ? "selected" : "",
          isFocused ? "focused" : "",
          o.disabled ? "disabled" : ""
        ].filter(Boolean).join(" ");
        return `<div
              class="${cls}"
              role="option"
              data-value="${esc24(o.value)}"
              data-index="${i}"
              aria-selected="${checked ? "true" : "false"}"
              ${o.disabled ? 'aria-disabled="true"' : ""}
            >
              ${multiple ? `<span class="check" aria-hidden="true">${checked ? "\u2713" : ""}</span>` : ""}
              ${o.icon ? `<span class="opt-icon">${esc24(o.icon)}</span>` : ""}
              <span class="opt-label">${esc24(o.label)}</span>
            </div>`;
      }).join("");
      const labelHtml = props.label ? `<label class="label">${esc24(props.label)}${props.required ? ' <span class="req" aria-hidden="true">*</span>' : ""}</label>` : "";
      const helperHtml = showError ? `<div class="helper error">${esc24(props.error)}</div>` : props.helper ? `<div class="helper">${esc24(props.helper)}</div>` : "";
      return `
        ${labelHtml}
        <div
          class="control ${showError ? "invalid" : ""} ${isOpen ? "open" : ""} ${disabled ? "disabled" : ""}"
          part="control"
          tabindex="${disabled ? "-1" : "0"}"
          role="${searchable ? "presentation" : "combobox"}"
        >
          <div class="display">
            ${chipsHtml}${singleLabelHtml}${placeholderHtml}${searchHtml}
          </div>
          <span class="caret" aria-hidden="true">\u25BE</span>
        </div>
        <div
          class="popup"
          part="popup"
          role="listbox"
          ${multiple ? 'aria-multiselectable="true"' : ""}
          ${isOpen ? "" : "hidden"}
        >${optionsHtml}</div>
        ${helperHtml}
        ${COMBOBOX_STYLE}
      `;
    },
    events: {
      // Open on control click (unless click came from a chip-remove).
      // setState triggers a synchronous re-render that destroys the
      // .control element, which fires a focusout on the way out. That
      // schedules a "close if not focus-within" microtask. To beat it
      // we focus the freshly-rendered search SYNCHRONOUSLY after the
      // setState so the host is :focus-within by the time the
      // microtask runs.
      "click .control": (e, ctx) => {
        const target = e.target;
        if (target.closest(".chip-remove"))
          return;
        const host = ctx.host;
        if (host.disabled)
          return;
        const wasOpen = !!ctx.getState("open");
        ctx.setState("open", true);
        if (!wasOpen)
          ctx.emit("tc-open");
        const search = ctx.refs.search;
        search?.focus();
      },
      // Open on caret keyboard activation (Enter/Space on the control).
      "keydown .control": (e, ctx) => {
        const ev = e;
        if (ev.key === "Enter" || ev.key === " ") {
          ev.preventDefault();
          const host = ctx.host;
          if (host.disabled)
            return;
          ctx.setState("open", true);
          ctx.emit("tc-open");
          const search = ctx.refs.search;
          search?.focus();
        }
      },
      // Search input typing → filter + update query state.
      "input .search": (e, ctx) => {
        const value = e.target.value;
        ctx.setState("query", value);
        ctx.setState("open", true);
        ctx.setState("focusedIndex", 0);
        ctx.emit("tc-search", { query: value });
      },
      // Backspace on empty search removes last chip (multiple only).
      "keydown .search": (e, ctx) => {
        const ev = e;
        const search = e.target;
        const host = ctx.host;
        const multiple = !!host.multiple;
        const opts = host.options ?? [];
        const filtered = filterOptions(
          opts,
          String(ctx.getState("query") ?? "")
        );
        if (ev.key === "Backspace" && search.value === "" && multiple) {
          const selected = valuesFromProp(host.value);
          if (selected.length > 0) {
            selected.pop();
            host.value = joinValues(selected);
            syncFormValue(ctx, selected, host);
            ctx.emit("tc-change", { value: selected.slice() });
            ev.preventDefault();
          }
          return;
        }
        if (ev.key === "ArrowDown") {
          ev.preventDefault();
          ctx.setState("open", true);
          const cur = Number(ctx.getState("focusedIndex") ?? -1);
          const next = Math.min(filtered.length - 1, cur + 1);
          ctx.setState("focusedIndex", next);
          return;
        }
        if (ev.key === "ArrowUp") {
          ev.preventDefault();
          const cur = Number(ctx.getState("focusedIndex") ?? 0);
          const next = Math.max(0, cur - 1);
          ctx.setState("focusedIndex", next);
          return;
        }
        if (ev.key === "Enter") {
          ev.preventDefault();
          const idx = Number(ctx.getState("focusedIndex") ?? -1);
          if (idx >= 0 && idx < filtered.length) {
            selectOption(ctx, filtered[idx], host);
          }
          return;
        }
        if (ev.key === "Escape") {
          ev.preventDefault();
          ctx.setState("open", false);
          ctx.setState("query", "");
          ctx.emit("tc-close");
          return;
        }
      },
      // Option click → select.
      "mousedown .option": (e, ctx) => {
        e.preventDefault();
        const target = e.target.closest(
          ".option"
        );
        if (!target || target.classList.contains("disabled"))
          return;
        const value = target.dataset.value;
        if (value == null)
          return;
        const host = ctx.host;
        const opts = host.options ?? [];
        const opt = opts.find((o) => o.value === value);
        if (!opt)
          return;
        selectOption(ctx, opt, host);
      },
      // Chip remove button.
      "click .chip-remove": (e, ctx) => {
        e.stopPropagation();
        const btn = e.target;
        const value = btn.dataset.remove;
        if (value == null)
          return;
        const host = ctx.host;
        const selected = valuesFromProp(host.value).filter((v) => v !== value);
        host.value = joinValues(selected);
        syncFormValue(ctx, selected, host);
        ctx.emit("tc-change", { value: selected.slice() });
      },
      // Click outside the host closes the popup. We listen at the host
      // level for blur/focusout.
      "focusout .control": (_e, ctx) => {
        queueMicrotask(() => {
          const host = ctx.host;
          if (!host.matches(":focus-within")) {
            ctx.setState("open", false);
            ctx.setState("query", "");
            ctx.emit("tc-close");
          }
        });
      }
    },
    afterMount() {
      const host = this;
      if (!host.multiple || !host.internals)
        return;
      const selected = valuesFromProp(host.value);
      const name = String(host.name ?? "");
      if (!name) {
        host.internals.setFormValue(joinValues(selected));
        return;
      }
      const fd = new FormData();
      for (const v of selected)
        fd.append(name, v);
      host.internals.setFormValue(fd);
    },
    afterRender() {
      const host = this;
      const open = host.getState ? !!host.getState("open") : false;
      if (!open)
        return;
      const search = host.refs?.search ?? null;
      if (!search)
        return;
      const active = host.shadowRoot?.activeElement;
      if (active === search)
        return;
      search.focus();
      const len = search.value.length;
      try {
        search.setSelectionRange(len, len);
      } catch {
      }
    }
  })
);
function filterOptions(opts, query) {
  if (!query)
    return opts;
  const re = new RegExp(escapeRegex(query), "i");
  return opts.filter((o) => re.test(o.label) || re.test(o.value));
}
function selectOption(ctx, opt, host) {
  const multiple = !!host.multiple;
  const max = Number(host.max ?? 0);
  const current = valuesFromProp(host.value);
  if (multiple) {
    let next;
    if (current.includes(opt.value)) {
      next = current.filter((v) => v !== opt.value);
    } else {
      if (max > 0 && current.length >= max)
        return;
      next = current.concat(opt.value);
    }
    host.value = joinValues(next);
    syncFormValue(ctx, next, host);
    ctx.setState("query", "");
    ctx.emit("tc-change", { value: next.slice() });
    queueMicrotask(() => {
      const search = ctx.refs.search;
      search?.focus();
    });
  } else {
    host.value = opt.value;
    syncFormValue(ctx, [opt.value], host);
    ctx.setState("query", "");
    ctx.setState("open", false);
    ctx.emit("tc-change", { value: opt.value });
    ctx.emit("tc-close");
  }
}
function syncFormValue(_ctx, values, host) {
  const internals = host.internals;
  if (!internals)
    return;
  const name = String(host.name ?? "");
  if (!host.multiple) {
    internals.setFormValue(values[0] ?? "");
    return;
  }
  if (!name) {
    internals.setFormValue(joinValues(values));
    return;
  }
  const fd = new FormData();
  for (const v of values)
    fd.append(name, v);
  internals.setFormValue(fd);
}
function esc24(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// components/carousel.ts
var TAG25 = "tc-carousel";
var tagName25 = TAG25;
function esc25(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function countSlides(host) {
  let n = 0;
  for (const child of Array.from(host.children)) {
    if (child instanceof Element && !child.hasAttribute("slot"))
      n++;
  }
  return n;
}
function clampIndex(value, total, loop) {
  if (total <= 0)
    return 0;
  if (loop)
    return (value % total + total) % total;
  return Math.max(0, Math.min(total - 1, value));
}
function go(host, next) {
  const total = countSlides(host);
  if (total === 0)
    return;
  const previous = host.value;
  const idx = clampIndex(next, total, host.loop);
  if (idx === previous)
    return;
  host.value = idx;
  host.dispatchEvent(
    new CustomEvent("tc-change", {
      detail: { index: idx, previous },
      bubbles: true,
      composed: true
    })
  );
}
function startAutoplay(host) {
  stopAutoplay(host);
  if (host.autoplay <= 0)
    return;
  if (countSlides(host) <= 1)
    return;
  host._carouselTimer = globalThis.setInterval(() => {
    go(host, host.value + 1);
  }, host.autoplay);
}
function stopAutoplay(host) {
  if (host._carouselTimer !== void 0) {
    globalThis.clearInterval(host._carouselTimer);
    host._carouselTimer = void 0;
  }
}
build(
  TAG25,
  describe({
    props: {
      value: { type: "number", default: 0, reflect: true },
      autoplay: { type: "number", default: 0 },
      loop: { type: "boolean", default: true },
      orientation: { type: "string", default: "horizontal" },
      transition: { type: "string", default: "slide" },
      indicators: { type: "boolean", default: true },
      controls: { type: "boolean", default: true },
      swipe: { type: "boolean", default: true },
      pauseOnHover: { type: "boolean", default: true },
      ariaLabel: { type: "string", default: "Carousel" },
      height: { type: "string", default: "" }
    },
    theme: {
      "tc-carousel-radius": "var(--tc-radius-lg, 12px)",
      "tc-carousel-bg": "var(--tc-color-bg, #faf8f3)",
      "tc-carousel-control-bg": "rgba(255, 255, 255, 0.85)",
      "tc-carousel-control-bg-hover": "rgba(255, 255, 255, 1)",
      "tc-carousel-control-fg": "var(--tc-color-ink, #14171f)",
      "tc-carousel-control-size": "36px",
      "tc-carousel-indicator": "rgba(20, 23, 31, 0.25)",
      "tc-carousel-indicator-active": "var(--tc-color-accent, #a16939)",
      "tc-carousel-duration": "320ms"
    },
    styles: {
      display: "block",
      position: "relative"
    },
    template: ({ props }) => {
      const value = Number(props.value ?? 0);
      const vertical = String(props.orientation) === "vertical";
      const fade = String(props.transition) === "fade";
      const height = String(props.height ?? "");
      const showControls = !!props.controls;
      const showIndicators = !!props.indicators;
      const ariaLabel = esc25(props.ariaLabel ?? "Carousel");
      return `
        <div
          class="root ${vertical ? "v" : "h"} ${fade ? "fade" : "slide"}"
          role="region"
          aria-roledescription="carousel"
          aria-label="${ariaLabel}"
          style="${height ? `--tc-carousel-height: ${esc25(height)};` : ""}--tc-carousel-index: ${value};"
        >
          <div class="viewport" part="viewport">
            <slot class="track" part="track"></slot>
          </div>
          ${showControls ? `
            <button type="button" class="ctrl prev" aria-label="Previous slide" part="control">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                ${vertical ? `<polyline points="18 15 12 9 6 15"/>` : `<polyline points="15 18 9 12 15 6"/>`}
              </svg>
            </button>
            <button type="button" class="ctrl next" aria-label="Next slide" part="control">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                ${vertical ? `<polyline points="6 9 12 15 18 9"/>` : `<polyline points="9 18 15 12 9 6"/>`}
              </svg>
            </button>
          ` : ""}
          ${showIndicators ? `<div class="indicators" role="tablist" part="indicators"></div>` : ""}
          <div class="sr-status" aria-live="polite" aria-atomic="true"></div>
        </div>
        <style>
          /* :host width: 100% so the carousel fills its container even
             inside flex parents. Combined with a user-set max-width on
             the host, it becomes min(container, max-width) \u2014 the
             intuitive responsive behaviour. */
          :host {
            display: block;
            position: relative;
            outline: none;
            width: 100%;
          }
          .root {
            position: relative;
            border-radius: var(--tc-carousel-radius);
            background: var(--tc-carousel-bg);
            overflow: hidden;
            width: 100%;
          }
          .viewport {
            position: relative;
            overflow: hidden;
            height: var(--tc-carousel-height, auto);
          }
          /* The slot itself is the flex track. Slotted children become
             direct flex items of the slot \u2014 this is the pattern that
             works across browsers, where slot+display:contents plus a
             wrapper has inconsistent ::slotted() projection. */
          slot.track {
            display: flex;
            transition: transform var(--tc-carousel-duration) cubic-bezier(0.4, 0, 0.2, 1);
            transform: translateX(calc(var(--tc-carousel-index, 0) * -100%));
            min-height: 100%;
            width: 100%;
          }
          .root.v slot.track {
            flex-direction: column;
            transform: translateY(calc(var(--tc-carousel-index, 0) * -100%));
            height: 100%;
          }
          ::slotted(*) {
            flex: 0 0 100%;
            min-width: 0;
            min-height: 0;
            box-sizing: border-box;
          }
          .root.v ::slotted(*) {
            min-height: var(--tc-carousel-height, 100%);
          }

          /* Fade transition stacks slides on top of each other. */
          .root.fade slot.track {
            display: block;
            transform: none;
            transition: none;
            position: relative;
            height: var(--tc-carousel-height, auto);
            min-height: var(--tc-carousel-height, auto);
            width: 100%;
          }
          .root.fade ::slotted(*) {
            position: absolute;
            inset: 0;
            opacity: 0;
            pointer-events: none;
            transition: opacity var(--tc-carousel-duration) ease;
          }
          .root.fade ::slotted(.is-active) {
            opacity: 1;
            pointer-events: auto;
          }

          .ctrl {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: var(--tc-carousel-control-size);
            height: var(--tc-carousel-control-size);
            border-radius: 999px;
            background: var(--tc-carousel-control-bg);
            color: var(--tc-carousel-control-fg);
            border: 1px solid rgba(20, 23, 31, 0.08);
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(20, 23, 31, 0.15);
            transition: background 0.15s ease, transform 0.15s ease;
            z-index: 2;
          }
          .ctrl:hover { background: var(--tc-carousel-control-bg-hover); }
          .ctrl:active { transform: translateY(-50%) scale(0.96); }
          .ctrl:focus-visible {
            outline: 2px solid var(--tc-color-accent, #a16939);
            outline-offset: 2px;
          }
          .ctrl.prev { left: 12px; }
          .ctrl.next { right: 12px; }
          .root.v .ctrl {
            top: auto;
            left: 50%;
            transform: translateX(-50%);
          }
          .root.v .ctrl.prev { top: 12px; left: 50%; right: auto; }
          .root.v .ctrl.next { bottom: 12px; left: 50%; right: auto; top: auto; }
          .root.v .ctrl:active { transform: translateX(-50%) scale(0.96); }
          .ctrl[disabled] {
            opacity: 0.4;
            cursor: not-allowed;
            pointer-events: none;
          }

          .indicators {
            position: absolute;
            bottom: 12px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 6px;
            padding: 4px 8px;
            border-radius: 999px;
            background: rgba(20, 23, 31, 0.25);
            backdrop-filter: blur(6px);
            z-index: 2;
          }
          .root.v .indicators {
            bottom: 50%;
            left: auto;
            right: 12px;
            transform: translateY(50%);
            flex-direction: column;
          }
          .dot {
            width: 8px;
            height: 8px;
            border-radius: 999px;
            border: none;
            background: rgba(255, 255, 255, 0.55);
            padding: 0;
            cursor: pointer;
            transition: width 0.2s ease, background 0.2s ease;
          }
          .dot[aria-current="true"] {
            width: 22px;
            background: #fff;
          }
          .root.v .dot[aria-current="true"] {
            width: 8px;
            height: 22px;
          }
          .dot:focus-visible {
            outline: 2px solid #fff;
            outline-offset: 2px;
          }

          .sr-status {
            position: absolute;
            width: 1px;
            height: 1px;
            overflow: hidden;
            clip: rect(0 0 0 0);
            white-space: nowrap;
          }

          @media (prefers-reduced-motion: reduce) {
            .track, .root.fade ::slotted(*) {
              transition: none;
            }
          }
        </style>
      `;
    },
    events: {
      "click .prev": (_e, ctx) => {
        const host = ctx.host;
        go(host, host.value - 1);
      },
      "click .next": (_e, ctx) => {
        const host = ctx.host;
        go(host, host.value + 1);
      },
      "click .dot": (e, ctx) => {
        const t = e.target.closest(".dot");
        if (!t)
          return;
        const i = Number(t.dataset.index);
        if (!Number.isFinite(i))
          return;
        const host = ctx.host;
        go(host, i);
      },
      "keydown .root": (e, ctx) => {
        const ev = e;
        const host = ctx.host;
        const vertical = host.orientation === "vertical";
        const total = countSlides(host);
        const prev = vertical ? "ArrowUp" : "ArrowLeft";
        const next = vertical ? "ArrowDown" : "ArrowRight";
        if (ev.key === prev) {
          ev.preventDefault();
          go(host, host.value - 1);
        } else if (ev.key === next) {
          ev.preventDefault();
          go(host, host.value + 1);
        } else if (ev.key === "Home") {
          ev.preventDefault();
          go(host, 0);
        } else if (ev.key === "End") {
          ev.preventDefault();
          go(host, total - 1);
        }
      }
    },
    afterMount() {
      const host = this;
      const sync = () => syncSlides(host);
      const mo = new MutationObserver(sync);
      mo.observe(host, { childList: true });
      const root = host.shadowRoot;
      const slot = root?.querySelector("slot");
      const onSlotChange = () => sync();
      slot?.addEventListener("slotchange", onSlotChange);
      host._carouselSlotObs = () => {
        mo.disconnect();
        slot?.removeEventListener("slotchange", onSlotChange);
      };
      const onEnter = () => stopAutoplay(host);
      const onLeave = () => {
        if (host.pauseOnHover)
          startAutoplay(host);
      };
      host.addEventListener("pointerenter", onEnter);
      host.addEventListener("pointerleave", onLeave);
      host.addEventListener("focusin", onEnter);
      host.addEventListener("focusout", onLeave);
      host._carouselHover = () => {
        host.removeEventListener("pointerenter", onEnter);
        host.removeEventListener("pointerleave", onLeave);
        host.removeEventListener("focusin", onEnter);
        host.removeEventListener("focusout", onLeave);
      };
      installSwipe(host);
      const rootEl = root?.querySelector(".root");
      rootEl?.setAttribute("tabindex", "0");
      sync();
      if (host.autoplay > 0)
        startAutoplay(host);
    },
    afterRender() {
      const host = this;
      syncSlides(host);
    },
    unmount() {
      const host = this;
      stopAutoplay(host);
      host._carouselSlotObs?.();
      host._carouselHover?.();
      host._carouselDrag?.();
    }
  })
);
function syncSlides(host) {
  const total = countSlides(host);
  const root = host.shadowRoot;
  if (!root)
    return;
  const rootEl = root.querySelector(".root");
  if (rootEl && total > 0) {
    const safe = clampIndex(host.value, total, host.loop);
    if (safe !== host.value)
      host.value = safe;
    rootEl.style.setProperty("--tc-carousel-index", String(safe));
  }
  const indicators = root.querySelector(".indicators");
  if (indicators) {
    const current = host.value;
    let html = "";
    for (let i = 0; i < total; i++) {
      html += `<button type="button" class="dot" role="tab" data-index="${i}"
        aria-current="${i === current ? "true" : "false"}"
        aria-label="Go to slide ${i + 1}"></button>`;
    }
    indicators.innerHTML = html;
  }
  const slides = Array.from(host.children).filter(
    (el) => el instanceof HTMLElement && !el.hasAttribute("slot")
  );
  slides.forEach((el, i) => {
    el.setAttribute("role", "group");
    el.setAttribute("aria-roledescription", "slide");
    el.setAttribute("aria-label", `${i + 1} of ${total}`);
    if (host.transition === "fade") {
      el.classList.toggle("is-active", i === host.value);
    } else {
      el.classList.remove("is-active");
    }
  });
  if (!host.loop) {
    const prev = root.querySelector(".ctrl.prev");
    const next = root.querySelector(".ctrl.next");
    if (prev)
      prev.disabled = host.value <= 0;
    if (next)
      next.disabled = host.value >= total - 1;
  }
  const status = root.querySelector(".sr-status");
  if (status && total > 0) {
    status.textContent = `Slide ${host.value + 1} of ${total}`;
  }
}
function installSwipe(host) {
  let startX = 0;
  let startY = 0;
  let dragging = false;
  const THRESHOLD = 40;
  const onDown = (e) => {
    if (!host.swipe)
      return;
    if (e.button !== 0 && e.pointerType === "mouse")
      return;
    startX = e.clientX;
    startY = e.clientY;
    dragging = true;
  };
  const onUp = (e) => {
    if (!dragging)
      return;
    dragging = false;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    const vertical = host.orientation === "vertical";
    const delta = vertical ? dy : dx;
    if (Math.abs(delta) < THRESHOLD)
      return;
    go(host, host.value + (delta < 0 ? 1 : -1));
  };
  const onCancel = () => {
    dragging = false;
  };
  host.addEventListener("pointerdown", onDown);
  host.addEventListener("pointerup", onUp);
  host.addEventListener("pointercancel", onCancel);
  host._carouselDrag = () => {
    host.removeEventListener("pointerdown", onDown);
    host.removeEventListener("pointerup", onUp);
    host.removeEventListener("pointercancel", onCancel);
  };
}

// components/accordion.ts
var TAG26 = "tc-accordion";
var tagName26 = TAG26;
build(
  TAG26,
  describe({
    props: {
      mode: { type: "string", default: "single" },
      bordered: { type: "boolean", default: true }
    },
    theme: {
      "tc-accordion-bg": "var(--tc-color-surface, #ffffff)",
      "tc-accordion-ink": "var(--tc-color-ink, #14171f)",
      "tc-accordion-ink-soft": "var(--tc-color-ink-soft, #4a5061)",
      "tc-accordion-rule": "var(--tc-color-rule, #ece5d3)",
      "tc-accordion-radius": "var(--tc-radius-md, 8px)",
      "tc-accordion-accent": "var(--tc-color-accent, #a16939)",
      "tc-accordion-font": "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"
    },
    styles: {
      display: "block"
    },
    template: ({ props }) => `
      <div class="root ${props.bordered ? "bordered" : ""}">
        <slot></slot>
      </div>
      <style>
        :host { display: block; font-family: var(--tc-accordion-font); }
        .root {
          background: var(--tc-accordion-bg);
          color: var(--tc-accordion-ink);
          border-radius: var(--tc-accordion-radius);
          overflow: hidden;
        }
        .root.bordered {
          border: 1px solid var(--tc-accordion-rule);
        }
        ::slotted(details) {
          background: transparent;
        }
        ::slotted(details + details) {
          border-top: 1px solid var(--tc-accordion-rule);
        }
        ::slotted(details > summary) {
          cursor: pointer;
          list-style: none;
          padding: 14px 18px;
          font-weight: 600;
          font-size: 0.96rem;
          color: var(--tc-accordion-ink);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          transition: background 0.15s ease;
        }
        ::slotted(details > summary::-webkit-details-marker) {
          display: none;
        }
        ::slotted(details > summary:hover) {
          background: rgba(20, 23, 31, 0.03);
        }
        ::slotted(details > summary:focus-visible) {
          outline: 2px solid var(--tc-accordion-accent);
          outline-offset: -2px;
        }
        /* Caret pseudo via background-image isn't reachable for ::slotted
           inner. Authors can override using their own summary content. */
      </style>
    `,
    afterMount() {
      const host = this;
      const onToggle = (e) => {
        const t = e.target;
        if (!t || t.tagName !== "DETAILS")
          return;
        if (host.mode === "single" && t.open) {
          for (const child of getDetails(host)) {
            if (child !== t && child.open)
              child.open = false;
          }
        }
        dispatchChange(host);
      };
      const onKeydown = (e) => {
        const target = e.target;
        if (!target)
          return;
        if (target.tagName !== "SUMMARY")
          return;
        const summaries = getDetails(host).map(
          (d) => d.querySelector("summary")
        ).filter((s) => !!s);
        const idx = summaries.indexOf(target);
        if (idx === -1)
          return;
        let next = -1;
        if (e.key === "ArrowDown")
          next = (idx + 1) % summaries.length;
        else if (e.key === "ArrowUp") {
          next = (idx - 1 + summaries.length) % summaries.length;
        } else if (e.key === "Home")
          next = 0;
        else if (e.key === "End")
          next = summaries.length - 1;
        if (next === -1)
          return;
        e.preventDefault();
        summaries[next]?.focus();
      };
      host.addEventListener("toggle", onToggle, true);
      host.addEventListener("keydown", onKeydown);
      const inject = () => {
        for (const d of getDetails(host)) {
          const summary = d.querySelector(":scope > summary");
          if (!summary)
            continue;
          if (!summary.querySelector(".tc-accordion-caret")) {
            const caret = document.createElement("span");
            caret.className = "tc-accordion-caret";
            caret.setAttribute("aria-hidden", "true");
            caret.style.cssText = "display:inline-block;flex:0 0 auto;transition:transform .2s ease;color:var(--tc-color-ink-muted,#6b7280);font-size:0.8rem;";
            caret.textContent = "\u25B8";
            summary.appendChild(caret);
            const sync = () => {
              caret.style.transform = d.open ? "rotate(90deg)" : "rotate(0)";
            };
            sync();
            d.addEventListener("toggle", sync);
          }
        }
      };
      inject();
      const mo = new MutationObserver(inject);
      mo.observe(host, { childList: true, subtree: false });
      host._accordionCleanup = () => {
        host.removeEventListener("toggle", onToggle, true);
        host.removeEventListener("keydown", onKeydown);
        mo.disconnect();
      };
    },
    unmount() {
      const host = this;
      host._accordionCleanup?.();
    }
  })
);
function getDetails(host) {
  const out = [];
  for (const c of Array.from(host.children)) {
    if (c instanceof HTMLDetailsElement)
      out.push(c);
  }
  return out;
}
function dispatchChange(host) {
  const open = [];
  for (const d of getDetails(host)) {
    if (d.open) {
      const id = d.id || d.querySelector("summary")?.textContent?.trim() || "";
      open.push(id);
    }
  }
  host.dispatchEvent(
    new CustomEvent("tc-change", {
      detail: { open },
      bubbles: true,
      composed: true
    })
  );
}

// components/tooltip.ts
var TAG27 = "tc-tooltip";
var tagName27 = TAG27;
function esc26(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
build(
  TAG27,
  describe({
    props: {
      text: { type: "string", default: "" },
      placement: { type: "string", default: "top" },
      delay: { type: "number", default: 200 },
      offset: { type: "number", default: 8 },
      disabled: { type: "boolean", default: false }
    },
    theme: {
      "tc-tooltip-bg": "var(--tc-color-ink, #14171f)",
      "tc-tooltip-fg": "var(--tc-color-surface, #ffffff)",
      "tc-tooltip-radius": "var(--tc-radius-sm, 6px)",
      "tc-tooltip-font": "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
      "tc-tooltip-shadow": "0 10px 30px rgba(0, 0, 0, 0.25)",
      "tc-tooltip-padding": "6px 10px",
      "tc-tooltip-max-width": "240px"
    },
    styles: {
      display: "inline-block",
      position: "relative"
    },
    template: ({ props }) => `
      <span class="trigger" tabindex="-1"><slot></slot></span>
      <div
        class="tip"
        popover="manual"
        role="tooltip"
        part="tip"
      >
        ${props.text ? `<span class="tip-text">${esc26(props.text)}</span>` : ""}
        <slot name="content"></slot>
      </div>
      <style>
        :host { display: inline-block; }
        .trigger { display: inline-block; }
        .tip {
          position: fixed;
          margin: 0;
          padding: var(--tc-tooltip-padding);
          background: var(--tc-tooltip-bg);
          color: var(--tc-tooltip-fg);
          border: none;
          border-radius: var(--tc-tooltip-radius);
          box-shadow: var(--tc-tooltip-shadow);
          font-family: var(--tc-tooltip-font);
          font-size: 0.78rem;
          line-height: 1.4;
          max-width: var(--tc-tooltip-max-width);
          overflow: visible;
          pointer-events: none;
          opacity: 0;
          transform: translateY(2px);
          transition: opacity 0.12s ease, transform 0.12s ease;
        }
        .tip:popover-open {
          opacity: 1;
          transform: translateY(0);
        }
        .tip[data-placement="bottom"]:popover-open { transform: translateY(0); }
        @media (prefers-reduced-motion: reduce) {
          .tip { transition: none; transform: none; }
        }
      </style>
    `,
    afterMount() {
      const host = this;
      const root = host.shadowRoot;
      if (!root)
        return;
      const tip = root.querySelector(".tip");
      if (!tip)
        return;
      const open = () => {
        if (host.disabled)
          return;
        clearTimeout(host._tooltipTimer);
        host._tooltipTimer = globalThis.setTimeout(() => {
          if (typeof tip.showPopover === "function") {
            try {
              tip.showPopover();
            } catch {
              tip.style.visibility = "visible";
              tip.style.opacity = "1";
            }
          } else {
            tip.style.visibility = "visible";
            tip.style.opacity = "1";
          }
          position(host, tip);
        }, Math.max(0, host.delay));
      };
      const close = () => {
        clearTimeout(host._tooltipTimer);
        try {
          if (typeof tip.hidePopover === "function") {
            tip.hidePopover();
          }
        } catch {
        }
        tip.style.opacity = "";
        tip.style.visibility = "";
      };
      const onKey = (e) => {
        if (e.key === "Escape")
          close();
      };
      host.addEventListener("pointerenter", open);
      host.addEventListener("pointerleave", close);
      host.addEventListener("focusin", open);
      host.addEventListener("focusout", close);
      host.addEventListener("keydown", onKey);
      const reposition = () => {
        if (tip.matches(
          ":popover-open"
        )) {
          position(host, tip);
        }
      };
      globalThis.addEventListener("scroll", reposition, true);
      globalThis.addEventListener("resize", reposition);
      host._tooltipCleanup = () => {
        clearTimeout(host._tooltipTimer);
        host.removeEventListener("pointerenter", open);
        host.removeEventListener("pointerleave", close);
        host.removeEventListener("focusin", open);
        host.removeEventListener("focusout", close);
        host.removeEventListener("keydown", onKey);
        globalThis.removeEventListener("scroll", reposition, true);
        globalThis.removeEventListener("resize", reposition);
        close();
      };
    },
    unmount() {
      const host = this;
      host._tooltipCleanup?.();
    }
  })
);
function position(host, tip) {
  const anchor = host.getBoundingClientRect();
  tip.style.top = "0px";
  tip.style.left = "0px";
  const tipRect = tip.getBoundingClientRect();
  const vw = globalThis.innerWidth;
  const vh = globalThis.innerHeight;
  const gap = host.offset;
  let placement = host.placement || "top";
  const fits = (p) => {
    if (p === "top")
      return anchor.top - tipRect.height - gap >= 4;
    if (p === "bottom")
      return anchor.bottom + tipRect.height + gap <= vh - 4;
    if (p === "left")
      return anchor.left - tipRect.width - gap >= 4;
    if (p === "right")
      return anchor.right + tipRect.width + gap <= vw - 4;
    return true;
  };
  if (!fits(placement)) {
    const fallback = {
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left"
    };
    if (fits(fallback[placement] ?? "top"))
      placement = fallback[placement];
  }
  let top = 0;
  let left = 0;
  if (placement === "top") {
    top = anchor.top - tipRect.height - gap;
    left = anchor.left + anchor.width / 2 - tipRect.width / 2;
  } else if (placement === "bottom") {
    top = anchor.bottom + gap;
    left = anchor.left + anchor.width / 2 - tipRect.width / 2;
  } else if (placement === "left") {
    top = anchor.top + anchor.height / 2 - tipRect.height / 2;
    left = anchor.left - tipRect.width - gap;
  } else if (placement === "right") {
    top = anchor.top + anchor.height / 2 - tipRect.height / 2;
    left = anchor.right + gap;
  }
  top = Math.max(4, Math.min(vh - tipRect.height - 4, top));
  left = Math.max(4, Math.min(vw - tipRect.width - 4, left));
  tip.style.top = `${top}px`;
  tip.style.left = `${left}px`;
  tip.dataset.placement = placement;
}

// components/popover.ts
var TAG28 = "tc-popover";
var tagName28 = TAG28;
build(
  TAG28,
  describe({
    props: {
      open: { type: "boolean", default: false, reflect: true },
      placement: { type: "string", default: "bottom" },
      offset: { type: "number", default: 8 },
      dismissible: { type: "boolean", default: true }
    },
    theme: {
      "tc-popover-bg": "var(--tc-color-surface, #ffffff)",
      "tc-popover-fg": "var(--tc-color-ink, #14171f)",
      "tc-popover-rule": "var(--tc-color-rule, #ece5d3)",
      "tc-popover-radius": "var(--tc-radius-md, 8px)",
      "tc-popover-shadow": "var(--tc-shadow-lg, 0 24px 60px rgba(20, 23, 31, 0.18))",
      "tc-popover-padding": "12px 14px",
      "tc-popover-min-width": "200px",
      "tc-popover-max-width": "340px",
      "tc-popover-font": "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"
    },
    styles: {
      display: "inline-block",
      position: "relative"
    },
    template: () => `
      <span class="trigger-wrap"><slot name="trigger"></slot></span>
      <div
        class="panel"
        popover="manual"
        role="dialog"
        part="panel"
      >
        <slot></slot>
      </div>
      <style>
        :host { display: inline-block; }
        .trigger-wrap { display: inline-block; }
        .panel {
          position: fixed;
          margin: 0;
          padding: var(--tc-popover-padding);
          background: var(--tc-popover-bg);
          color: var(--tc-popover-fg);
          border: 1px solid var(--tc-popover-rule);
          border-radius: var(--tc-popover-radius);
          box-shadow: var(--tc-popover-shadow);
          font-family: var(--tc-popover-font);
          font-size: 0.92rem;
          min-width: var(--tc-popover-min-width);
          max-width: var(--tc-popover-max-width);
          opacity: 0;
          transform: translateY(-4px);
          transition: opacity 0.14s ease, transform 0.14s ease;
        }
        .panel:popover-open {
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .panel { transition: none; transform: none; }
        }
      </style>
    `,
    events: {
      "click .trigger-wrap": (_e, ctx) => {
        const host = ctx.host;
        host.open = !host.open;
      }
    },
    afterRender() {
      const host = this;
      syncPopover(host);
    },
    afterMount() {
      const host = this;
      const onDocClick = (e) => {
        if (!host.open || !host.dismissible)
          return;
        const path = e.composedPath();
        if (path.includes(host))
          return;
        host.open = false;
        host.dispatchEvent(
          new CustomEvent("tc-close", {
            detail: { reason: "outside" },
            bubbles: true,
            composed: true
          })
        );
      };
      const onKey = (e) => {
        if (!host.open || !host.dismissible)
          return;
        if (e.key === "Escape") {
          host.open = false;
          host.dispatchEvent(
            new CustomEvent("tc-close", {
              detail: { reason: "escape" },
              bubbles: true,
              composed: true
            })
          );
        }
      };
      const onResize = () => {
        const panel = host.shadowRoot?.querySelector(".panel");
        if (panel?.matches(":popover-open"))
          position2(host, panel);
      };
      document.addEventListener("click", onDocClick, true);
      document.addEventListener("keydown", onKey);
      globalThis.addEventListener("scroll", onResize, true);
      globalThis.addEventListener("resize", onResize);
      host._popoverCleanup = () => {
        document.removeEventListener("click", onDocClick, true);
        document.removeEventListener("keydown", onKey);
        globalThis.removeEventListener("scroll", onResize, true);
        globalThis.removeEventListener("resize", onResize);
      };
      syncPopover(host);
    },
    unmount() {
      const host = this;
      host._popoverCleanup?.();
    }
  })
);
function syncPopover(host) {
  const root = host.shadowRoot;
  if (!root)
    return;
  const panel = root.querySelector(".panel");
  if (!panel)
    return;
  const isOpen = host.open;
  const supportsPopover = typeof panel.showPopover === "function";
  if (isOpen && !panel.matches(":popover-open")) {
    if (supportsPopover) {
      try {
        panel.showPopover();
      } catch {
        panel.style.display = "block";
      }
    } else {
      panel.style.display = "block";
    }
    position2(host, panel);
    host.dispatchEvent(
      new CustomEvent("tc-open", { bubbles: true, composed: true })
    );
  } else if (!isOpen && panel.matches(":popover-open")) {
    if (supportsPopover) {
      try {
        panel.hidePopover();
      } catch {
        panel.style.display = "none";
      }
    } else {
      panel.style.display = "none";
    }
  }
}
function position2(host, panel) {
  const anchor = host.getBoundingClientRect();
  panel.style.top = "0px";
  panel.style.left = "0px";
  const rect = panel.getBoundingClientRect();
  const vw = globalThis.innerWidth;
  const vh = globalThis.innerHeight;
  const gap = host.offset;
  let placement = host.placement || "bottom";
  const fits = (p) => {
    if (p === "top")
      return anchor.top - rect.height - gap >= 4;
    if (p === "bottom")
      return anchor.bottom + rect.height + gap <= vh - 4;
    if (p === "left")
      return anchor.left - rect.width - gap >= 4;
    if (p === "right")
      return anchor.right + rect.width + gap <= vw - 4;
    return true;
  };
  if (!fits(placement)) {
    const flip = {
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left"
    };
    if (fits(flip[placement] ?? "bottom"))
      placement = flip[placement];
  }
  let top = 0;
  let left = 0;
  if (placement === "top") {
    top = anchor.top - rect.height - gap;
    left = anchor.left + anchor.width / 2 - rect.width / 2;
  } else if (placement === "bottom") {
    top = anchor.bottom + gap;
    left = anchor.left + anchor.width / 2 - rect.width / 2;
  } else if (placement === "left") {
    top = anchor.top + anchor.height / 2 - rect.height / 2;
    left = anchor.left - rect.width - gap;
  } else if (placement === "right") {
    top = anchor.top + anchor.height / 2 - rect.height / 2;
    left = anchor.right + gap;
  }
  top = Math.max(4, Math.min(vh - rect.height - 4, top));
  left = Math.max(4, Math.min(vw - rect.width - 4, left));
  panel.style.top = `${top}px`;
  panel.style.left = `${left}px`;
}

// components/drawer.ts
var TAG29 = "tc-drawer";
var tagName29 = TAG29;
var DIALOG_LISTENERS2 = /* @__PURE__ */ new WeakMap();
function esc27(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
build(
  TAG29,
  describe({
    props: {
      open: { type: "boolean", default: false, reflect: true },
      side: { type: "string", default: "right" },
      size: { type: "string", default: "min(420px, 92vw)" },
      dismissible: { type: "boolean", default: true },
      title: { type: "string", default: "" }
    },
    theme: {
      "tc-drawer-bg": "var(--tc-color-surface, #ffffff)",
      "tc-drawer-ink": "var(--tc-color-ink, #14171f)",
      "tc-drawer-rule": "var(--tc-color-rule, #ece5d3)",
      "tc-drawer-soft": "var(--tc-color-ink-soft, #5a6072)",
      "tc-drawer-shadow": "var(--tc-shadow-lg, 0 24px 60px rgba(20, 23, 31, 0.25))",
      "tc-drawer-backdrop": "rgba(20, 23, 31, 0.5)",
      "tc-drawer-font": "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
      "tc-drawer-duration": "260ms"
    },
    styles: {
      display: "contents"
    },
    template: ({ props }) => {
      const side = String(props.side ?? "right");
      const size = esc27(props.size ?? "min(420px, 92vw)");
      return `
        <dialog
          class="dlg side-${esc27(side)}"
          aria-labelledby="${props.title ? "title" : ""}"
          style="--tc-drawer-size: ${size};"
        >
          ${props.title || props.dismissible ? `<header class="head">
                ${props.title ? `<h2 id="title" class="title">${esc27(props.title)}</h2>` : "<span></span>"}
                ${props.dismissible ? `<button class="x" type="button" aria-label="Close">\xD7</button>` : ""}
              </header>` : ""}
          <div class="body"><slot></slot></div>
          <footer class="foot"><slot name="footer"></slot></footer>
        </dialog>
        <style>
          /* Reset the modal-dialog UA centering, then re-position per side.
             Use !important to defeat browser UA inset-inline-start: 0 etc.
             that compete with our explicit positioning.

             IMPORTANT: only apply display:flex when [open] is set. An
             unconditional .dlg{display:flex} fights the UA's
             dialog:not([open]){display:none} on cascade order in some
             browsers and leaves the dialog visible as a block in the
             page flow on initial load. */
          .dlg:not([open]) { display: none !important; }
          .dlg[open] {
            display: flex;
            flex-direction: column;
          }
          .dlg {
            padding: 0;
            border: none;
            margin: 0 !important;
            max-width: 100vw !important;
            max-height: 100vh !important;
            background: var(--tc-drawer-bg);
            color: var(--tc-drawer-ink);
            font-family: var(--tc-drawer-font);
            box-shadow: var(--tc-drawer-shadow);
            overflow: hidden;
          }
          .dlg.side-left {
            top: 0 !important;
            left: 0 !important;
            right: auto !important;
            bottom: 0 !important;
            width: var(--tc-drawer-size);
            height: 100vh;
            animation: tc-drawer-slide-left var(--tc-drawer-duration) cubic-bezier(0.4, 0, 0.2, 1);
          }
          .dlg.side-right {
            top: 0 !important;
            right: 0 !important;
            left: auto !important;
            bottom: 0 !important;
            width: var(--tc-drawer-size);
            height: 100vh;
            animation: tc-drawer-slide-right var(--tc-drawer-duration) cubic-bezier(0.4, 0, 0.2, 1);
          }
          .dlg.side-top {
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: auto !important;
            width: 100vw;
            height: var(--tc-drawer-size);
            animation: tc-drawer-slide-top var(--tc-drawer-duration) cubic-bezier(0.4, 0, 0.2, 1);
          }
          .dlg.side-bottom {
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            top: auto !important;
            width: 100vw;
            height: var(--tc-drawer-size);
            animation: tc-drawer-slide-bottom var(--tc-drawer-duration) cubic-bezier(0.4, 0, 0.2, 1);
          }

          @keyframes tc-drawer-slide-left {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
          }
          @keyframes tc-drawer-slide-right {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
          @keyframes tc-drawer-slide-top {
            from { transform: translateY(-100%); }
            to { transform: translateY(0); }
          }
          @keyframes tc-drawer-slide-bottom {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }

          .dlg::backdrop {
            background: var(--tc-drawer-backdrop);
            backdrop-filter: blur(2px);
            animation: tc-drawer-fade var(--tc-drawer-duration) ease;
          }
          @keyframes tc-drawer-fade {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @media (prefers-reduced-motion: reduce) {
            .dlg, .dlg::backdrop { animation: none; }
          }

          .head {
            display: flex; align-items: center; justify-content: space-between;
            gap: 12px; padding: 16px 20px;
            border-bottom: 1px solid var(--tc-drawer-rule);
            flex: 0 0 auto;
          }
          .title {
            margin: 0; font-size: 1.05rem; font-weight: 700;
            letter-spacing: -0.01em;
          }
          .x {
            font: inherit; font-size: 1.4rem; line-height: 1;
            background: transparent; border: none; cursor: pointer;
            color: var(--tc-drawer-soft);
            width: 32px; height: 32px; border-radius: 8px;
            display: inline-flex; align-items: center; justify-content: center;
          }
          .x:hover { background: var(--tc-drawer-rule); color: var(--tc-drawer-ink); }
          .body {
            padding: 20px; line-height: 1.6;
            overflow-y: auto;
            flex: 1 1 auto;
          }
          .foot {
            padding: 0;
            flex: 0 0 auto;
          }
          :host([open]) .foot:has(::slotted(*)) {
            padding: 12px 20px 16px;
            border-top: 1px solid var(--tc-drawer-rule);
            display: flex; gap: 8px; justify-content: flex-end;
          }
        </style>
      `;
    },
    refs: {
      dialog: ".dlg"
    },
    events: {
      "click .x": (_e, ctx) => {
        closeDrawer(ctx.host, "button");
      },
      "click .dlg": (e, ctx) => {
        const host = ctx.host;
        if (!host.dismissible)
          return;
        const dlg = ctx.refs.dialog;
        if (!dlg)
          return;
        if (e.target === dlg)
          closeDrawer(host, "backdrop");
      }
    },
    afterRender() {
      syncDialogOpen2(this);
    },
    unmount() {
      const prior = DIALOG_LISTENERS2.get(this);
      if (prior) {
        prior.cleanup();
        DIALOG_LISTENERS2.delete(this);
      }
    }
  })
);
function syncDialogOpen2(host) {
  const root = host.shadowRoot;
  if (!root)
    return;
  const dlg = root.querySelector(".dlg");
  if (!dlg)
    return;
  const isOpen = host.open;
  const prior = DIALOG_LISTENERS2.get(host);
  if (prior && prior.dialog !== dlg) {
    prior.cleanup();
    DIALOG_LISTENERS2.delete(host);
  }
  if (isOpen && !dlg.open) {
    if (typeof dlg.showModal === "function") {
      try {
        dlg.showModal();
      } catch {
        dlg.setAttribute("open", "");
      }
    } else {
      dlg.setAttribute("open", "");
    }
    if (!DIALOG_LISTENERS2.has(host)) {
      const onClose = () => {
        const h = host;
        if (h.open) {
          h.open = false;
          host.dispatchEvent(
            new CustomEvent("tc-close", {
              detail: { reason: "escape" },
              bubbles: true,
              composed: true
            })
          );
        }
      };
      dlg.addEventListener("close", onClose);
      DIALOG_LISTENERS2.set(host, {
        dialog: dlg,
        cleanup: () => dlg.removeEventListener("close", onClose)
      });
    }
  } else if (!isOpen && dlg.open) {
    try {
      dlg.close();
    } catch {
      dlg.removeAttribute("open");
    }
  }
}
function closeDrawer(host, reason) {
  if (!host.open)
    return;
  host.open = false;
  host.dispatchEvent(
    new CustomEvent("tc-close", {
      detail: { reason },
      bubbles: true,
      composed: true
    })
  );
}

// components/progress.ts
var TAG30 = "tc-progress";
var tagName30 = TAG30;
function esc28(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function pctOf(value, max) {
  if (!Number.isFinite(value) || !Number.isFinite(max) || max <= 0)
    return 0;
  return Math.max(0, Math.min(100, value / max * 100));
}
build(
  TAG30,
  describe({
    props: {
      value: { type: "number", default: 0 },
      max: { type: "number", default: 100 },
      variant: { type: "string", default: "linear" },
      size: { type: "string", default: "md" },
      indeterminate: { type: "boolean", default: false },
      showLabel: { type: "boolean", default: false },
      label: { type: "string", default: "" }
    },
    theme: {
      "tc-progress-track": "var(--tc-color-rule, #ece5d3)",
      "tc-progress-fill": "var(--tc-color-accent, #a16939)",
      "tc-progress-radius": "999px",
      "tc-progress-fg": "var(--tc-color-ink, #14171f)",
      "tc-progress-font": "var(--tc-font-mono, 'JetBrains Mono', monospace)"
    },
    styles: {
      display: "inline-block"
    },
    template: ({ props }) => {
      const variant = String(props.variant ?? "linear");
      const size = String(props.size ?? "md");
      const indeterminate = !!props.indeterminate;
      const value = Number(props.value ?? 0);
      const max = Number(props.max ?? 100);
      const pct = pctOf(value, max);
      const labelText = props.label || (indeterminate ? "Loading\u2026" : `${Math.round(pct)}%`);
      if (variant === "circular") {
        const dim = size === "sm" ? 28 : size === "lg" ? 72 : 48;
        const stroke = size === "sm" ? 3 : size === "lg" ? 6 : 4;
        const radius = (dim - stroke) / 2;
        const circ = 2 * Math.PI * radius;
        const dash = indeterminate ? circ * 0.25 : pct / 100 * circ;
        const ariaProps2 = indeterminate ? `role="progressbar" aria-valuetext="${esc28(labelText)}"` : `role="progressbar" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="${max}"`;
        return `
          <div class="circ size-${esc28(size)} ${indeterminate ? "indet" : ""}" ${ariaProps2}>
            <svg viewBox="0 0 ${dim} ${dim}" width="${dim}" height="${dim}" aria-hidden="true">
              <circle class="track" cx="${dim / 2}" cy="${dim / 2}" r="${radius}" stroke-width="${stroke}" fill="none" />
              <circle
                class="fill"
                cx="${dim / 2}" cy="${dim / 2}" r="${radius}"
                stroke-width="${stroke}" fill="none"
                stroke-dasharray="${dash.toFixed(3)} ${(circ - dash).toFixed(3)}"
                stroke-dashoffset="${(circ / 4).toFixed(3)}"
                stroke-linecap="round"
              />
            </svg>
            ${props.showLabel ? `<span class="label" aria-hidden="true">${esc28(labelText)}</span>` : ""}
          </div>
          <style>
            :host { display: inline-block; vertical-align: middle; }
            .circ { position: relative; display: inline-grid; place-items: center; }
            .label {
              position: absolute;
              font-family: var(--tc-progress-font);
              font-size: ${size === "sm" ? "0.55rem" : size === "lg" ? "0.92rem" : "0.74rem"};
              font-weight: 600;
              color: var(--tc-progress-fg);
              line-height: 1;
            }
            svg { display: block; transform: rotate(-90deg); }
            .track { stroke: var(--tc-progress-track); }
            .fill {
              stroke: var(--tc-progress-fill);
              transition: stroke-dasharray 320ms cubic-bezier(0.4, 0, 0.2, 1);
            }
            .indet svg { animation: tc-prog-spin 1.1s linear infinite; }
            .indet .fill { transition: none; }
            @keyframes tc-prog-spin {
              from { transform: rotate(-90deg); }
              to { transform: rotate(270deg); }
            }
            @media (prefers-reduced-motion: reduce) {
              .indet svg { animation-duration: 3s; }
              .fill { transition: none; }
            }
          </style>
        `;
      }
      const h = size === "sm" ? 4 : size === "lg" ? 12 : 8;
      const ariaProps = indeterminate ? `role="progressbar" aria-valuetext="${esc28(labelText)}"` : `role="progressbar" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="${max}"`;
      return `
        <div class="bar size-${esc28(size)} ${indeterminate ? "indet" : ""}" ${ariaProps}>
          <div class="track">
            <div class="fill" style="width: ${pct.toFixed(2)}%"></div>
          </div>
          ${props.showLabel ? `<span class="label" aria-hidden="true">${esc28(labelText)}</span>` : ""}
        </div>
        <style>
          :host { display: block; }
          .bar {
            display: grid;
            grid-template-columns: 1fr auto;
            align-items: center;
            gap: 10px;
          }
          .track {
            position: relative;
            height: ${h}px;
            background: var(--tc-progress-track);
            border-radius: var(--tc-progress-radius);
            overflow: hidden;
          }
          .fill {
            height: 100%;
            background: var(--tc-progress-fill);
            border-radius: inherit;
            transition: width 320ms cubic-bezier(0.4, 0, 0.2, 1);
          }
          .label {
            font-family: var(--tc-progress-font);
            font-size: ${size === "sm" ? "0.68rem" : size === "lg" ? "0.92rem" : "0.78rem"};
            font-weight: 500;
            color: var(--tc-progress-fg);
            min-width: 3ch;
            text-align: right;
          }
          .indet .fill {
            width: 35% !important;
            animation: tc-prog-slide 1.4s ease-in-out infinite;
          }
          @keyframes tc-prog-slide {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(285%); }
          }
          @media (prefers-reduced-motion: reduce) {
            .fill { transition: none; }
            .indet .fill { animation-duration: 4s; }
          }
        </style>
      `;
    }
  })
);

// components/stepper.ts
var TAG31 = "tc-stepper";
var tagName31 = TAG31;
function esc29(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
build(
  TAG31,
  describe({
    props: {
      steps: { type: "json", default: [] },
      active: { type: "number", default: 0, reflect: true },
      orientation: { type: "string", default: "horizontal" },
      clickable: { type: "boolean", default: false }
    },
    theme: {
      "tc-stepper-bg": "transparent",
      "tc-stepper-ink": "var(--tc-color-ink, #14171f)",
      "tc-stepper-soft": "var(--tc-color-ink-soft, #4a5061)",
      "tc-stepper-rule": "var(--tc-color-rule, #ece5d3)",
      "tc-stepper-accent": "var(--tc-color-accent, #a16939)",
      "tc-stepper-done": "var(--tc-color-success, #2f7a52)",
      "tc-stepper-radius": "999px",
      "tc-stepper-marker-size": "28px",
      "tc-stepper-font": "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"
    },
    styles: {
      display: "block"
    },
    template: ({ props }) => {
      const steps = props.steps ?? [];
      const active = Number(props.active ?? 0);
      const vertical = String(props.orientation) === "vertical";
      const clickable = !!props.clickable;
      const items = steps.map((s, i) => {
        const state = i < active ? "done" : i === active ? "current" : "upcoming";
        const marker = state === "done" ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>` : `${i + 1}`;
        return `
          <li class="step state-${state}" data-index="${i}">
            <${clickable ? "button" : "div"} class="row" ${clickable ? `type="button" aria-current="${state === "current" ? "step" : "false"}"` : `aria-current="${state === "current" ? "step" : "false"}"`}>
              <span class="marker" aria-hidden="true">${marker}</span>
              <span class="text">
                <span class="title">${esc29(s.title)}</span>
                ${s.description ? `<span class="desc">${esc29(s.description)}</span>` : ""}
              </span>
            </${clickable ? "button" : "div"}>
            ${i < steps.length - 1 ? `<span class="line ${i < active ? "done" : ""}" aria-hidden="true"></span>` : ""}
          </li>
        `;
      }).join("");
      return `
        <ol class="root ${vertical ? "v" : "h"} ${clickable ? "clickable" : ""}" aria-label="Progress">
          ${items}
        </ol>
        <style>
          :host { display: block; font-family: var(--tc-stepper-font); color: var(--tc-stepper-ink); }
          .root {
            margin: 0; padding: 0; list-style: none;
            background: var(--tc-stepper-bg);
            display: flex;
          }
          .root.h { flex-direction: row; align-items: flex-start; gap: 0; }
          .root.v { flex-direction: column; gap: 0; }

          .step {
            display: flex;
            position: relative;
            flex: 1 1 0;
          }
          .root.v .step { flex: 0 0 auto; flex-direction: column; }
          .root.h .step { flex-direction: column; align-items: center; min-width: 0; }

          .row {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: transparent;
            border: none;
            font: inherit;
            color: inherit;
            text-align: left;
            padding: 0;
            cursor: ${clickable ? "pointer" : "default"};
          }
          .root.h .row { flex-direction: column; align-items: center; text-align: center; padding: 0 12px; }
          .root.v .row { padding: 4px 0; }

          .marker {
            width: var(--tc-stepper-marker-size);
            height: var(--tc-stepper-marker-size);
            border-radius: var(--tc-stepper-radius);
            display: inline-grid;
            place-items: center;
            font-weight: 700;
            font-size: 0.86rem;
            font-variant-numeric: tabular-nums;
            border: 2px solid var(--tc-stepper-rule);
            color: var(--tc-stepper-soft);
            background: var(--tc-color-surface, #ffffff);
            transition: background 0.18s ease, color 0.18s ease, border-color 0.18s ease;
            flex: 0 0 auto;
          }
          .state-current .marker {
            border-color: var(--tc-stepper-accent);
            color: var(--tc-stepper-accent);
          }
          .state-done .marker {
            background: var(--tc-stepper-done);
            border-color: var(--tc-stepper-done);
            color: #fff;
          }

          .text { display: grid; gap: 1px; min-width: 0; }
          .title {
            font-size: 0.92rem;
            font-weight: 600;
            color: var(--tc-stepper-ink);
            line-height: 1.3;
          }
          .state-upcoming .title { color: var(--tc-stepper-soft); }
          .desc {
            font-size: 0.78rem;
            color: var(--tc-stepper-soft);
            line-height: 1.4;
          }
          .root.h .desc {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 16ch;
          }

          .line {
            background: var(--tc-stepper-rule);
            display: block;
            position: absolute;
            transition: background 0.2s ease;
          }
          .line.done { background: var(--tc-stepper-done); }
          .root.h .line {
            top: calc(var(--tc-stepper-marker-size) / 2 - 1px);
            left: calc(50% + var(--tc-stepper-marker-size) / 2 + 8px);
            right: calc(-50% + var(--tc-stepper-marker-size) / 2 + 8px);
            height: 2px;
          }
          .root.v .line {
            left: calc(var(--tc-stepper-marker-size) / 2 - 1px);
            top: calc(var(--tc-stepper-marker-size) + 4px);
            bottom: -8px;
            width: 2px;
            height: auto;
          }
          .root.v .step { padding-bottom: 16px; }
          .root.v .step:last-child { padding-bottom: 0; }

          .row:focus-visible {
            outline: 2px solid var(--tc-stepper-accent);
            outline-offset: 4px;
            border-radius: 6px;
          }
        </style>
      `;
    },
    events: {
      "click .row": (e, ctx) => {
        const host = ctx.host;
        if (!host.clickable)
          return;
        const li = e.target.closest(".step");
        if (!li)
          return;
        const idx = Number(li.dataset.index);
        if (!Number.isFinite(idx) || idx === host.active)
          return;
        const previous = host.active;
        host.active = idx;
        ctx.emit("tc-step-change", { active: idx, previous });
      }
    }
  })
);

// components/avatar.ts
var TAG32 = "tc-avatar";
var tagName32 = TAG32;
function esc30(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function initials(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0)
    return "";
  if (parts.length === 1)
    return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
var PALETTE = [
  ["#dde6f4", "#1f3a66"],
  ["#dbece2", "#155b40"],
  ["#efe2cf", "#8a572d"],
  ["#f4dad7", "#7a1a14"],
  ["#e3dcf1", "#3d2a73"],
  ["#d5e8e5", "#0d4f49"],
  ["#fbe3c5", "#7a4f0a"]
];
function tintFor(name) {
  if (!name)
    return PALETTE[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = hash * 31 + name.charCodeAt(i) | 0;
  }
  const idx = Math.abs(hash) % PALETTE.length;
  return PALETTE[idx];
}
build(
  TAG32,
  describe({
    props: {
      src: { type: "string", default: "" },
      alt: { type: "string", default: "" },
      name: { type: "string", default: "" },
      size: { type: "string", default: "md" },
      shape: { type: "string", default: "circle" },
      status: { type: "string", default: "" },
      ring: { type: "boolean", default: false }
    },
    theme: {
      "tc-avatar-bg": "var(--tc-color-rule, #ece5d3)",
      "tc-avatar-fg": "var(--tc-color-ink, #14171f)",
      "tc-avatar-ring": "var(--tc-color-surface, #ffffff)",
      "tc-avatar-status-online": "#2f7a52",
      "tc-avatar-status-away": "#d7a52f",
      "tc-avatar-status-busy": "#b3261e",
      "tc-avatar-status-offline": "#9aa0a6",
      "tc-avatar-font": "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"
    },
    styles: {
      display: "inline-block",
      position: "relative",
      "vertical-align": "middle"
    },
    template: ({ props }) => {
      const name = String(props.name ?? "");
      const src = String(props.src ?? "");
      const alt = String(props.alt ?? "") || name || "avatar";
      const size = String(props.size ?? "md");
      const shape = String(props.shape ?? "circle");
      const status = String(props.status ?? "");
      const ring = !!props.ring;
      const [bg, fg] = tintFor(name);
      return `
        <span class="root size-${esc30(size)} shape-${esc30(shape)} ${ring ? "ringed" : ""}"
              style="--tc-avatar-tint-bg: ${bg}; --tc-avatar-tint-fg: ${fg};">
          ${src ? `<img src="${esc30(src)}" alt="${esc30(alt)}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'fallback',textContent:'${esc30(initials(name))}'}))">` : `<span class="fallback" aria-label="${esc30(alt)}">${esc30(initials(name))}</span>`}
          ${status ? `<span class="status status-${esc30(status)}" aria-label="${esc30(status)}"></span>` : ""}
        </span>
        <style>
          :host { display: inline-block; vertical-align: middle; position: relative; }
          .root {
            position: relative;
            display: inline-grid;
            place-items: center;
            overflow: visible;
            font-family: var(--tc-avatar-font);
            font-weight: 600;
            color: var(--tc-avatar-tint-fg, var(--tc-avatar-fg));
            background: var(--tc-avatar-tint-bg, var(--tc-avatar-bg));
            user-select: none;
            line-height: 1;
          }
          .root img, .root .fallback {
            width: 100%; height: 100%;
            border-radius: inherit;
            object-fit: cover;
          }
          .root img { display: block; }
          .root .fallback {
            display: inline-grid;
            place-items: center;
            background: transparent;
            color: inherit;
          }
          .shape-circle { border-radius: 999px; }
          .shape-square { border-radius: var(--tc-radius-sm, 6px); }

          .size-xs { width: 20px; height: 20px; font-size: 0.62rem; }
          .size-sm { width: 28px; height: 28px; font-size: 0.74rem; }
          .size-md { width: 36px; height: 36px; font-size: 0.86rem; }
          .size-lg { width: 48px; height: 48px; font-size: 1rem; }
          .size-xl { width: 64px; height: 64px; font-size: 1.2rem; }

          .ringed {
            box-shadow: 0 0 0 2px var(--tc-avatar-ring);
          }

          .status {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 28%;
            height: 28%;
            min-width: 8px;
            min-height: 8px;
            border-radius: 999px;
            border: 2px solid var(--tc-avatar-ring);
            box-sizing: content-box;
          }
          .status-online { background: var(--tc-avatar-status-online); }
          .status-away { background: var(--tc-avatar-status-away); }
          .status-busy { background: var(--tc-avatar-status-busy); }
          .status-offline { background: var(--tc-avatar-status-offline); }
        </style>
      `;
    }
  })
);

// components/avatar-group.ts
var TAG33 = "tc-avatar-group";
var tagName33 = TAG33;
build(
  TAG33,
  describe({
    props: {
      max: { type: "number", default: 4 },
      spacing: { type: "string", default: "normal" },
      size: { type: "string", default: "md" }
    },
    theme: {
      "tc-avatar-group-ring": "var(--tc-color-surface, #ffffff)",
      "tc-avatar-group-overflow-bg": "var(--tc-color-rule, #ece5d3)",
      "tc-avatar-group-overflow-fg": "var(--tc-color-ink, #14171f)"
    },
    styles: {
      display: "inline-flex"
    },
    template: () => `
      <span class="row"><slot></slot><span class="overflow" hidden></span></span>
      <style>
        :host {
          display: inline-flex;
          vertical-align: middle;
        }
        .row {
          display: inline-flex;
          align-items: center;
        }
        ::slotted(tc-avatar) {
          box-shadow: 0 0 0 2px var(--tc-avatar-group-ring);
          border-radius: 999px;
          transition: transform 0.15s ease;
        }
        :host([spacing="tight"]) ::slotted(tc-avatar) { margin-left: -10px; }
        :host([spacing="normal"]) ::slotted(tc-avatar),
        :host(:not([spacing])) ::slotted(tc-avatar) { margin-left: -8px; }
        :host([spacing="loose"]) ::slotted(tc-avatar) { margin-left: -4px; }
        ::slotted(tc-avatar:first-child) { margin-left: 0 !important; }
        ::slotted(tc-avatar:hover) { transform: translateY(-2px); z-index: 1; }
        .overflow {
          display: inline-grid;
          place-items: center;
          background: var(--tc-avatar-group-overflow-bg);
          color: var(--tc-avatar-group-overflow-fg);
          font-weight: 600;
          font-family: var(--tc-font-sans, system-ui, sans-serif);
          border-radius: 999px;
          box-shadow: 0 0 0 2px var(--tc-avatar-group-ring);
          line-height: 1;
          user-select: none;
        }
        :host([size="xs"]) .overflow { width: 20px; height: 20px; font-size: 0.55rem; margin-left: -10px; }
        :host([size="sm"]) .overflow { width: 28px; height: 28px; font-size: 0.68rem; margin-left: -8px; }
        :host(:not([size])) .overflow,
        :host([size="md"]) .overflow { width: 36px; height: 36px; font-size: 0.78rem; margin-left: -8px; }
        :host([size="lg"]) .overflow { width: 48px; height: 48px; font-size: 0.88rem; margin-left: -6px; }
        :host([size="xl"]) .overflow { width: 64px; height: 64px; font-size: 1rem; margin-left: -4px; }
      </style>
    `,
    afterMount() {
      const host = this;
      const apply = () => applyGroup(host);
      apply();
      const mo = new MutationObserver(apply);
      mo.observe(host, { childList: true });
      host._agroupCleanup = () => mo.disconnect();
    },
    afterRender() {
      applyGroup(this);
    },
    unmount() {
      const host = this;
      host._agroupCleanup?.();
    }
  })
);
function applyGroup(host) {
  const max = Math.max(0, Number(host.max ?? 4));
  const size = String(host.size ?? "md");
  const all = Array.from(host.children).filter(
    (c) => c instanceof HTMLElement
  );
  let visible = 0;
  for (const el of all) {
    if (el.tagName.toLowerCase() === "tc-avatar") {
      if (!el.getAttribute("size"))
        el.setAttribute("size", size);
      if (visible < max || max === 0) {
        el.hidden = false;
        visible++;
      } else {
        el.hidden = true;
      }
    }
  }
  const total = all.filter((e) => e.tagName.toLowerCase() === "tc-avatar").length;
  const hidden = Math.max(0, total - visible);
  const overflow = host.shadowRoot?.querySelector(".overflow");
  if (overflow) {
    if (hidden > 0) {
      overflow.hidden = false;
      overflow.textContent = `+${hidden}`;
    } else {
      overflow.hidden = true;
    }
  }
}

// components/rating.ts
var TAG34 = "tc-rating";
var tagName34 = TAG34;
function esc31(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
var STAR_PATH = "M12 17.27 18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z";
build(
  TAG34,
  describe({
    props: {
      value: { type: "number", default: 0, reflect: true },
      max: { type: "number", default: 5 },
      readonly: { type: "boolean", default: false, reflect: true },
      allowHalf: { type: "boolean", default: false },
      size: { type: "string", default: "md" },
      ariaLabel: { type: "string", default: "Rating" }
    },
    theme: {
      "tc-rating-fill": "var(--tc-color-warning, #d7a52f)",
      "tc-rating-track": "var(--tc-color-rule, #ece5d3)"
    },
    styles: {
      display: "inline-block"
    },
    template: ({ props, state }) => {
      const max = Math.max(1, Number(props.max ?? 5));
      const value = Number(props.value ?? 0);
      const hover = Number(state.hover ?? -1);
      const display = hover >= 0 ? hover : value;
      const size = String(props.size ?? "md");
      const readonly = !!props.readonly;
      const allowHalf = !!props.allowHalf;
      const ariaLabel = esc31(props.ariaLabel ?? "Rating");
      const pxSize = size === "sm" ? 18 : size === "lg" ? 32 : 24;
      const stars = [];
      for (let i = 1; i <= max; i++) {
        const diff = display - (i - 1);
        const pct = diff >= 1 ? 100 : diff >= 0.5 && allowHalf ? 50 : diff > 0 && !allowHalf ? 100 : 0;
        const isHalf = pct === 50;
        stars.push(`
          <span class="star ${isHalf ? "half" : pct === 100 ? "full" : "empty"}" data-index="${i}">
            <svg viewBox="0 0 24 24" width="${pxSize}" height="${pxSize}" aria-hidden="true">
              <path class="track" d="${STAR_PATH}" fill="var(--tc-rating-track)" />
              ${pct > 0 ? `<path class="fill" d="${STAR_PATH}" fill="var(--tc-rating-fill)" clip-path="${isHalf ? "inset(0 50% 0 0)" : "none"}" />` : ""}
            </svg>
            ${allowHalf && !readonly ? `<span class="hit-left" data-index="${i}" data-half="1"></span>
                 <span class="hit-right" data-index="${i}" data-half="0"></span>` : ""}
          </span>
        `);
      }
      return `
        <div
          class="root size-${esc31(size)} ${readonly ? "readonly" : ""}"
          role="${readonly ? "img" : "slider"}"
          tabindex="${readonly ? "-1" : "0"}"
          aria-label="${ariaLabel}"
          aria-valuenow="${value}"
          aria-valuemin="0"
          aria-valuemax="${max}"
          aria-valuetext="${value} of ${max}"
        >
          ${stars.join("")}
        </div>
        <style>
          :host { display: inline-block; }
          .root {
            display: inline-flex;
            gap: 2px;
            align-items: center;
            cursor: ${readonly ? "default" : "pointer"};
            outline: none;
          }
          .root:focus-visible {
            outline: 2px solid var(--tc-color-accent, #a16939);
            outline-offset: 4px;
            border-radius: 4px;
          }
          .star {
            position: relative;
            display: inline-block;
            line-height: 0;
          }
          .star svg { display: block; }
          .star:hover .fill { filter: brightness(1.05); }
          .root.readonly .star { cursor: default; }
          .hit-left, .hit-right {
            position: absolute;
            top: 0;
            width: 50%;
            height: 100%;
          }
          .hit-left { left: 0; }
          .hit-right { left: 50%; }
        </style>
      `;
    },
    events: {
      "click .star": (e, ctx) => {
        const host = ctx.host;
        if (host.readonly)
          return;
        const target = e.target;
        const halfHit = target.closest(".hit-left, .hit-right");
        const star = target.closest(".star");
        if (!star)
          return;
        const idx = Number(star.dataset.index);
        if (!Number.isFinite(idx))
          return;
        let next = idx;
        if (halfHit?.dataset.half === "1" && host.allowHalf)
          next = idx - 0.5;
        if (next === host.value) {
          next = 0;
        }
        const previous = host.value;
        host.value = next;
        ctx.emit("tc-change", { value: next, previous });
      },
      "mouseover .star": (e, ctx) => {
        const host = ctx.host;
        if (host.readonly)
          return;
        const target = e.target;
        const halfHit = target.closest(".hit-left, .hit-right");
        const star = target.closest(".star");
        if (!star)
          return;
        const idx = Number(star.dataset.index);
        if (!Number.isFinite(idx))
          return;
        let h = idx;
        if (halfHit?.dataset.half === "1" && host.allowHalf)
          h = idx - 0.5;
        ctx.setState("hover", h);
      },
      "mouseleave .root": (_e, ctx) => {
        ctx.setState("hover", -1);
      },
      "keydown .root": (e, ctx) => {
        const ev = e;
        const host = ctx.host;
        if (host.readonly)
          return;
        const step = host.allowHalf ? 0.5 : 1;
        const previous = host.value;
        let next = previous;
        if (ev.key === "ArrowRight" || ev.key === "ArrowUp") {
          next = Math.min(host.max, previous + step);
        } else if (ev.key === "ArrowLeft" || ev.key === "ArrowDown") {
          next = Math.max(0, previous - step);
        } else if (ev.key === "Home")
          next = 0;
        else if (ev.key === "End")
          next = host.max;
        else
          return;
        ev.preventDefault();
        if (next === previous)
          return;
        host.value = next;
        ctx.emit("tc-change", { value: next, previous });
      }
    }
  })
);

// components/slider.ts
var TAG35 = "tc-slider";
var tagName35 = TAG35;
function esc32(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
build(
  TAG35,
  describe({
    props: {
      value: { type: "number", default: 0, reflect: true },
      min: { type: "number", default: 0 },
      max: { type: "number", default: 100 },
      step: { type: "number", default: 1 },
      disabled: { type: "boolean", default: false, reflect: true },
      showValue: { type: "boolean", default: false },
      showTicks: { type: "boolean", default: false },
      label: { type: "string", default: "" },
      suffix: { type: "string", default: "" }
    },
    theme: {
      "tc-slider-track": "var(--tc-color-rule, #ece5d3)",
      "tc-slider-fill": "var(--tc-color-accent, #a16939)",
      "tc-slider-thumb": "var(--tc-color-surface, #ffffff)",
      "tc-slider-thumb-ring": "var(--tc-color-accent, #a16939)",
      "tc-slider-radius": "999px",
      "tc-slider-thumb-size": "20px",
      "tc-slider-track-size": "6px",
      "tc-slider-font": "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
      "tc-slider-fg": "var(--tc-color-ink, #14171f)",
      "tc-slider-fg-muted": "var(--tc-color-ink-muted, #6b7280)"
    },
    styles: {
      display: "block"
    },
    template: ({ props }) => {
      const value = Number(props.value ?? 0);
      const min = Number(props.min ?? 0);
      const max = Number(props.max ?? 100);
      const step = Number(props.step ?? 1);
      const disabled = !!props.disabled;
      const pct = max > min ? (value - min) / (max - min) * 100 : 0;
      const label = String(props.label ?? "");
      const suffix = String(props.suffix ?? "");
      const showValue = !!props.showValue;
      const showTicks = !!props.showTicks;
      let ticks = "";
      if (showTicks && step > 0) {
        const n = Math.floor((max - min) / step) + 1;
        if (n <= 50) {
          const parts = [];
          for (let i = 0; i < n; i++) {
            const v = min + i * step;
            const p = (v - min) / (max - min) * 100;
            parts.push(
              `<span class="tick" style="left:${p.toFixed(2)}%"></span>`
            );
          }
          ticks = parts.join("");
        }
      }
      return `
        ${label || showValue ? `<div class="head">
              ${label ? `<label for="r" class="lbl">${esc32(label)}</label>` : "<span></span>"}
              ${showValue ? `<span class="val">${esc32(String(value))}${esc32(suffix)}</span>` : ""}
            </div>` : ""}
        <div class="rail" style="--tc-slider-pct: ${pct.toFixed(2)}%;">
          <div class="track-bg"></div>
          <div class="track-fill"></div>
          ${ticks}
          <input
            id="r"
            class="range"
            type="range"
            min="${min}"
            max="${max}"
            step="${step}"
            value="${value}"
            ${disabled ? "disabled" : ""}
            aria-valuetext="${esc32(String(value) + suffix)}"
          />
        </div>
        <style>
          :host { display: block; font-family: var(--tc-slider-font); color: var(--tc-slider-fg); }
          .head {
            display: flex;
            align-items: baseline;
            justify-content: space-between;
            gap: 12px;
            margin-bottom: 8px;
          }
          .lbl {
            font-size: 0.86rem;
            font-weight: 500;
            color: var(--tc-slider-fg);
          }
          .val {
            font-family: var(--tc-font-mono, 'JetBrains Mono', monospace);
            font-size: 0.84rem;
            color: var(--tc-slider-fg-muted);
            font-variant-numeric: tabular-nums;
          }
          .rail {
            position: relative;
            height: var(--tc-slider-thumb-size);
            display: flex;
            align-items: center;
          }
          .track-bg {
            position: absolute;
            left: 0; right: 0;
            top: 50%;
            height: var(--tc-slider-track-size);
            border-radius: var(--tc-slider-radius);
            background: var(--tc-slider-track);
            transform: translateY(-50%);
          }
          .track-fill {
            position: absolute;
            left: 0;
            top: 50%;
            height: var(--tc-slider-track-size);
            width: var(--tc-slider-pct, 0%);
            border-radius: var(--tc-slider-radius);
            background: var(--tc-slider-fill);
            transform: translateY(-50%);
            transition: width 0.06s linear;
          }
          .tick {
            position: absolute;
            top: 50%;
            width: 2px;
            height: 8px;
            background: var(--tc-slider-fg-muted);
            opacity: 0.4;
            border-radius: 1px;
            transform: translate(-50%, -50%);
            pointer-events: none;
          }
          .range {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            margin: 0;
            background: transparent;
            -webkit-appearance: none;
            appearance: none;
            outline: none;
            cursor: pointer;
          }
          .range:disabled { cursor: not-allowed; opacity: 0.55; }
          .range::-webkit-slider-runnable-track { background: transparent; height: 100%; }
          .range::-moz-range-track { background: transparent; height: 100%; }
          .range::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: var(--tc-slider-thumb-size);
            height: var(--tc-slider-thumb-size);
            border-radius: 999px;
            background: var(--tc-slider-thumb);
            border: 2px solid var(--tc-slider-thumb-ring);
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
            cursor: inherit;
            margin-top: 0;
            transition: transform 0.1s ease;
          }
          .range::-moz-range-thumb {
            width: var(--tc-slider-thumb-size);
            height: var(--tc-slider-thumb-size);
            border-radius: 999px;
            background: var(--tc-slider-thumb);
            border: 2px solid var(--tc-slider-thumb-ring);
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
            cursor: inherit;
            transition: transform 0.1s ease;
          }
          .range:not(:disabled):active::-webkit-slider-thumb { transform: scale(1.1); }
          .range:not(:disabled):active::-moz-range-thumb { transform: scale(1.1); }
          .range:focus-visible::-webkit-slider-thumb {
            box-shadow: 0 0 0 4px color-mix(in srgb, var(--tc-slider-thumb-ring) 25%, transparent);
          }
          .range:focus-visible::-moz-range-thumb {
            box-shadow: 0 0 0 4px color-mix(in srgb, var(--tc-slider-thumb-ring) 25%, transparent);
          }
        </style>
      `;
    },
    refs: {
      range: ".range"
    },
    events: {
      "input .range": (e, ctx) => {
        const input = e.target;
        const host = ctx.host;
        const v = Number(input.value);
        if (host.value === v)
          return;
        host.value = v;
        ctx.emit("tc-input", { value: v });
      },
      "change .range": (e, ctx) => {
        const input = e.target;
        const host = ctx.host;
        const v = Number(input.value);
        ctx.emit("tc-change", { value: v, previous: host.value });
      }
    }
  })
);

// components/chart.ts
var TAG36 = "tc-chart";
var tagName36 = TAG36;
function niceNumber(range, round) {
  if (range <= 0)
    return 1;
  const exponent = Math.floor(Math.log10(range));
  const fraction = range / Math.pow(10, exponent);
  let niceFraction;
  if (round) {
    if (fraction < 1.5)
      niceFraction = 1;
    else if (fraction < 3)
      niceFraction = 2;
    else if (fraction < 7)
      niceFraction = 5;
    else
      niceFraction = 10;
  } else {
    if (fraction <= 1)
      niceFraction = 1;
    else if (fraction <= 2)
      niceFraction = 2;
    else if (fraction <= 5)
      niceFraction = 5;
    else
      niceFraction = 10;
  }
  return niceFraction * Math.pow(10, exponent);
}
function niceTicks(min, max, target = 5) {
  if (min === max) {
    const pad = Math.abs(min) || 1;
    return {
      min: min - pad,
      max: max + pad,
      ticks: [min - pad, min, min + pad]
    };
  }
  const range = niceNumber(max - min, false);
  const spacing = niceNumber(range / (target - 1), true);
  const niceMin = Math.floor(min / spacing) * spacing;
  const niceMax = Math.ceil(max / spacing) * spacing;
  const ticks = [];
  for (let v = niceMin; v <= niceMax + spacing * 0.5; v += spacing) {
    ticks.push(Number(v.toFixed(10)));
  }
  return { min: niceMin, max: niceMax, ticks };
}
function linePath(points, smooth) {
  if (points.length === 0)
    return "";
  if (points.length === 1 || !smooth) {
    return "M " + points.map((p) => `${p.x} ${p.y}`).join(" L ");
  }
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
  }
  return d;
}
function polar(cx, cy, r, angle) {
  return {
    x: cx + r * Math.sin(angle),
    y: cy - r * Math.cos(angle)
  };
}
function arcPath(cx, cy, rOuter, rInner, startAngle, endAngle) {
  const large = endAngle - startAngle > Math.PI ? 1 : 0;
  const outerStart = polar(cx, cy, rOuter, startAngle);
  const outerEnd = polar(cx, cy, rOuter, endAngle);
  if (rInner <= 0) {
    return `M ${cx} ${cy} L ${outerStart.x} ${outerStart.y} A ${rOuter} ${rOuter} 0 ${large} 1 ${outerEnd.x} ${outerEnd.y} Z`;
  }
  const innerEnd = polar(cx, cy, rInner, endAngle);
  const innerStart = polar(cx, cy, rInner, startAngle);
  return `M ${outerStart.x} ${outerStart.y} A ${rOuter} ${rOuter} 0 ${large} 1 ${outerEnd.x} ${outerEnd.y} L ${innerEnd.x} ${innerEnd.y} A ${rInner} ${rInner} 0 ${large} 0 ${innerStart.x} ${innerStart.y} Z`;
}
function esc33(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function fmt(n) {
  if (!Number.isFinite(n))
    return "";
  const abs = Math.abs(n);
  if (abs >= 1e6) {
    return (n / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (abs >= 1e3)
    return (n / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
  if (abs > 0 && abs < 1)
    return n.toFixed(2);
  return String(Math.round(n * 100) / 100);
}
function colorFor(i, palette) {
  return palette[i % palette.length];
}
function renderCartesian(ctx, type) {
  const { data, smooth, stacked, showAxes, showGrid, showLabels, showValues } = ctx;
  const labels = data.labels ?? [];
  const series = data.series ?? [];
  const sparkline = type === "sparkline";
  const padTop = sparkline ? 4 : 16;
  const padBottom = sparkline ? 4 : showAxes && showLabels ? 28 : 8;
  const padLeft = sparkline ? 4 : showAxes ? 44 : 8;
  const padRight = sparkline ? 4 : 12;
  const plotW = ctx.W - padLeft - padRight;
  const plotH = ctx.H - padTop - padBottom;
  let minY = Infinity;
  let maxY = -Infinity;
  if (stacked && series.length > 0) {
    const stackTotals = labels.length > 0 ? labels.map(
      (_, i) => series.reduce((sum, s) => sum + (s.values?.[i] ?? 0), 0)
    ) : [];
    for (const v of stackTotals) {
      if (v < minY)
        minY = v;
      if (v > maxY)
        maxY = v;
    }
    if (minY > 0)
      minY = 0;
  } else {
    for (const s of series) {
      for (const v of s.values ?? []) {
        if (v < minY)
          minY = v;
        if (v > maxY)
          maxY = v;
      }
    }
  }
  if (!Number.isFinite(minY) || !Number.isFinite(maxY)) {
    minY = 0;
    maxY = 1;
  }
  if (minY === maxY) {
    minY -= 1;
    maxY += 1;
  }
  const ticksInfo = niceTicks(
    ctx.yMin ?? minY,
    ctx.yMax ?? maxY,
    5
  );
  const yLo = ctx.yMin ?? ticksInfo.min;
  const yHi = ctx.yMax ?? ticksInfo.max;
  const yRange = yHi - yLo || 1;
  const xCount = labels.length || series[0]?.values?.length || 0;
  const xAt = (i) => {
    if (xCount === 1)
      return padLeft + plotW / 2;
    if (type === "bar")
      return padLeft + (i + 0.5) * (plotW / xCount);
    return padLeft + i / (xCount - 1) * plotW;
  };
  const yAt = (v) => padTop + plotH - (v - yLo) / yRange * plotH;
  const chrome = [];
  if (!sparkline) {
    if (showGrid) {
      for (const t of ticksInfo.ticks) {
        const y = yAt(t);
        chrome.push(
          `<line class="grid" x1="${padLeft}" x2="${ctx.W - padRight}" y1="${y}" y2="${y}"/>`
        );
      }
    }
    if (showAxes) {
      for (const t of ticksInfo.ticks) {
        const y = yAt(t);
        chrome.push(
          `<text class="axis-label y" x="${padLeft - 8}" y="${y}" text-anchor="end" dominant-baseline="middle">${esc33(fmt(t))}</text>`
        );
      }
      if (showLabels && labels.length > 0) {
        const stride = Math.max(1, Math.ceil(labels.length / 8));
        labels.forEach((lab, i) => {
          if (i % stride !== 0 && i !== labels.length - 1)
            return;
          chrome.push(
            `<text class="axis-label x" x="${xAt(i)}" y="${ctx.H - padBottom + 16}" text-anchor="middle">${esc33(lab)}</text>`
          );
        });
      }
      const baselineY = yLo <= 0 && yHi >= 0 ? yAt(0) : yAt(yLo);
      chrome.push(
        `<line class="axis" x1="${padLeft}" x2="${ctx.W - padRight}" y1="${baselineY}" y2="${baselineY}"/>`
      );
    }
  }
  const layers = [];
  if (type === "bar") {
    const groupW = plotW / xCount;
    const innerPad = groupW * 0.18;
    const usableW = groupW - innerPad * 2;
    series.forEach((s, si) => {
      const cls = `series series-${si}`;
      const color = colorFor(si, ctx.palette);
      let stackSoFar = 0;
      s.values?.forEach((v, i) => {
        if (!Number.isFinite(v))
          return;
        const xCenter = xAt(i);
        let x;
        let w;
        let y;
        let h;
        if (stacked) {
          x = xCenter - usableW / 2;
          w = usableW;
          const yTop = yAt(stackSoFar + v);
          const yBase = yAt(stackSoFar);
          y = Math.min(yTop, yBase);
          h = Math.abs(yTop - yBase);
          stackSoFar += v;
        } else {
          const slot = usableW / series.length;
          x = xCenter - usableW / 2 + si * slot;
          w = slot * 0.86;
          const yV = yAt(v);
          const yBase = yAt(yLo < 0 && yHi > 0 ? 0 : yLo);
          y = Math.min(yV, yBase);
          h = Math.abs(yV - yBase);
        }
        const title = `${esc33(s.name)}${labels[i] ? ` \xB7 ${esc33(labels[i])}` : ""}: ${esc33(fmt(v))}`;
        layers.push(
          `<g class="${cls}"><rect class="hit" x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="${color}" data-tip="${title}" data-color="${color}"><title>${title}</title></rect>` + (showValues ? `<text class="value-label" x="${x + w / 2}" y="${y - 4}" text-anchor="middle">${esc33(fmt(v))}</text>` : "") + `</g>`
        );
      });
    });
  } else {
    if (stacked && type === "area") {
      const runningTotals = new Array(xCount).fill(0);
      series.forEach((s, si) => {
        const color = colorFor(si, ctx.palette);
        const topPts = [];
        const bottomPts = [];
        for (let i = 0; i < xCount; i++) {
          const v = s.values?.[i] ?? 0;
          const top = runningTotals[i] + v;
          topPts.push({ x: xAt(i), y: yAt(top) });
          bottomPts.push({ x: xAt(i), y: yAt(runningTotals[i]) });
          runningTotals[i] = top;
        }
        const fillPath = linePath(topPts, smooth) + " L " + bottomPts.slice().reverse().map((p) => `${p.x} ${p.y}`).join(" L ") + " Z";
        layers.push(
          `<path class="series-fill series-${si}" d="${fillPath}" fill="${color}" fill-opacity="0.25" pointer-events="none"/>`
        );
        layers.push(
          `<path class="series-line series-${si}" d="${linePath(topPts, smooth)}" stroke="${color}" fill="none" pointer-events="none"/>`
        );
        topPts.forEach((p, i) => {
          const v = s.values?.[i] ?? 0;
          const title = `${esc33(s.name)}${labels[i] ? ` \xB7 ${esc33(labels[i])}` : ""}: ${esc33(fmt(v))}`;
          layers.push(
            `<circle class="hit series-${si}" cx="${p.x}" cy="${p.y}" r="12" fill="transparent" data-tip="${title}" data-color="${color}"><title>${title}</title></circle>`
          );
        });
      });
    } else {
      series.forEach((s, si) => {
        const color = colorFor(si, ctx.palette);
        const pts = (s.values ?? []).map((v, i) => ({
          x: xAt(i),
          y: yAt(v)
        }));
        const d = linePath(pts, smooth);
        if (type === "area") {
          const baseY = yAt(yLo < 0 && yHi > 0 ? 0 : yLo);
          const fillPath = d + ` L ${pts[pts.length - 1].x} ${baseY} L ${pts[0].x} ${baseY} Z`;
          layers.push(
            `<path class="series-fill series-${si}" d="${fillPath}" fill="${color}" fill-opacity="0.25"/>`
          );
        }
        layers.push(
          `<path class="series-line series-${si}" d="${d}" stroke="${color}" fill="none"/>`
        );
        if (!sparkline) {
          pts.forEach((p, i) => {
            const v = s.values?.[i];
            const title = `${esc33(s.name)}${labels[i] ? ` \xB7 ${esc33(labels[i])}` : ""}: ${esc33(fmt(v ?? 0))}`;
            layers.push(
              `<circle class="series-point series-${si}" cx="${p.x}" cy="${p.y}" r="3.5" fill="${color}" pointer-events="none"/>`
            );
            layers.push(
              `<circle class="hit series-${si}" cx="${p.x}" cy="${p.y}" r="12" fill="transparent" data-tip="${title}" data-color="${color}"><title>${title}</title></circle>`
            );
            if (showValues) {
              layers.push(
                `<text class="value-label" x="${p.x}" y="${p.y - 8}" text-anchor="middle" pointer-events="none">${esc33(fmt(v ?? 0))}</text>`
              );
            }
          });
        }
      });
    }
  }
  return chrome.join("") + layers.join("");
}
function renderDonut(ctx) {
  const series = ctx.data.series ?? [];
  const total = series.reduce((s, x) => s + (x.value ?? 0), 0);
  if (total <= 0)
    return "";
  const cx = ctx.W / 2;
  const cy = ctx.H / 2;
  const r = Math.min(ctx.W, ctx.H) / 2 - 4;
  const inner = Math.max(0, Math.min(0.9, ctx.innerRadius)) * r;
  let angle = 0;
  const out = [];
  series.forEach((s, i) => {
    const value = s.value ?? 0;
    if (value <= 0)
      return;
    const sweep = value / total * Math.PI * 2;
    const start = angle;
    const end = angle + sweep;
    const path = arcPath(cx, cy, r, inner, start, end - 0.01);
    const color = colorFor(i, ctx.palette);
    const pct = (value / total * 100).toFixed(1).replace(/\.0$/, "");
    const title = `${esc33(s.name)}: ${esc33(fmt(value))} (${pct}%)`;
    out.push(
      `<path class="series-segment hit series-${i}" d="${path}" fill="${color}" data-tip="${title}" data-color="${color}"><title>${title}</title></path>`
    );
    if (ctx.showValues) {
      const mid = (start + end) / 2;
      const labelR = (r + inner) / 2;
      const p = polar(cx, cy, labelR, mid);
      out.push(
        `<text class="value-label donut" x="${p.x}" y="${p.y}" text-anchor="middle" dominant-baseline="middle">${esc33(pct)}%</text>`
      );
    }
    angle = end;
  });
  return out.join("");
}
function renderLegend(series, palette) {
  if (series.length === 0)
    return "";
  return `<div class="legend" part="legend">` + series.map((s, i) => {
    const color = colorFor(i, palette);
    return `<span class="legend-item"><span class="swatch" style="background:${color}"></span>${esc33(s.name)}</span>`;
  }).join("") + `</div>`;
}
function ariaDescription(type, data) {
  if (type === "donut") {
    const total = (data.series ?? []).reduce((s, x) => s + (x.value ?? 0), 0);
    const parts = (data.series ?? []).filter((s) => (s.value ?? 0) > 0).map((s) => {
      const pct = total > 0 ? (s.value ?? 0) / total * 100 : 0;
      return `${s.name} ${pct.toFixed(1).replace(/\.0$/, "")}%`;
    });
    return `Donut chart: ${parts.join(", ")}.`;
  }
  const seriesNames = (data.series ?? []).map((s) => s.name).join(", ");
  const ptCount = data.labels?.length ?? data.series[0]?.values?.length ?? 0;
  return `${type.charAt(0).toUpperCase()}${type.slice(1)} chart with ${(data.series ?? []).length} series (${seriesNames}) and ${ptCount} data point${ptCount === 1 ? "" : "s"}.`;
}
var DEFAULT_PALETTE = [
  "var(--tc-chart-color-1, var(--tc-color-accent, #a16939))",
  "var(--tc-chart-color-2, var(--tc-color-info, #3a5b8c))",
  "var(--tc-chart-color-3, var(--tc-color-success, #2f7a52))",
  "var(--tc-chart-color-4, var(--tc-color-warning, #d7a52f))",
  "var(--tc-chart-color-5, var(--tc-color-danger, #b3261e))",
  "var(--tc-chart-color-6, #6f4e7c)",
  "var(--tc-chart-color-7, #0b6e6e)",
  "var(--tc-chart-color-8, #b0566c)"
];
var CHART_STYLE = `
  <style>
    :host { display: block; width: 100%; }
    .root {
      width: 100%;
      font-family: var(--tc-chart-font, var(--tc-font-sans, "Inter", system-ui, sans-serif));
      color: var(--tc-chart-fg, var(--tc-color-ink, #14171f));
      background: var(--tc-chart-bg, transparent);
    }
    .canvas {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
    }
    .tip {
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: none;
      background: var(--tc-chart-tooltip-bg, var(--tc-color-ink, #14171f));
      color: var(--tc-chart-tooltip-fg, #ffffff);
      font-size: 0.78rem;
      line-height: 1.35;
      padding: 6px 10px;
      border-radius: 6px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
      white-space: nowrap;
      opacity: 0;
      transform: translate(-9999px, -9999px);
      transition: opacity 0.1s ease;
      z-index: 5;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      font-family: var(--tc-chart-font);
    }
    .tip[data-open="1"] { opacity: 1; }
    .tip-swatch {
      width: 8px;
      height: 8px;
      border-radius: 2px;
      flex: 0 0 auto;
      background: currentColor;
    }
    /* hit targets \u2014 invisible enlarged grab zones */
    .hit { cursor: default; }

    /* Loading / error overlay used while a src= fetch is in flight. */
    .overlay {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      gap: 6px;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 0.86rem;
      color: var(--tc-chart-label, var(--tc-color-ink-muted, #6b7280));
      background: color-mix(in srgb, var(--tc-chart-bg, var(--tc-color-surface, #ffffff)) 88%, transparent);
      border-radius: inherit;
      pointer-events: none;
    }
    .overlay.loading::before {
      content: "";
      width: 22px;
      height: 22px;
      border-radius: 999px;
      border: 2px solid var(--tc-chart-grid, #ece5d3);
      border-top-color: var(--tc-color-accent, #a16939);
      animation: tc-chart-spin 0.8s linear infinite;
    }
    .overlay.error {
      color: var(--tc-color-danger-fg, #7a1a14);
    }
    .overlay.error small {
      font-family: var(--tc-font-mono, "JetBrains Mono", monospace);
      font-size: 0.74rem;
      opacity: 0.8;
    }
    @keyframes tc-chart-spin {
      to { transform: rotate(360deg); }
    }
    @media (prefers-reduced-motion: reduce) {
      .overlay.loading::before { animation-duration: 3s; }
    }
    svg { display: block; width: 100%; height: 100%; overflow: visible; }
    .grid {
      stroke: var(--tc-chart-grid, var(--tc-color-rule, #ece5d3));
      stroke-width: 1;
      stroke-dasharray: 2 4;
      fill: none;
    }
    .axis {
      stroke: var(--tc-chart-axis, var(--tc-color-rule-strong, #d9cfb8));
      stroke-width: 1;
      fill: none;
    }
    .axis-label {
      font-size: 11px;
      fill: var(--tc-chart-label, var(--tc-color-ink-muted, #6b7280));
      font-variant-numeric: tabular-nums;
    }
    .value-label {
      font-size: 10px;
      font-weight: 600;
      fill: var(--tc-chart-label, var(--tc-color-ink-muted, #6b7280));
    }
    .value-label.donut { fill: #fff; }
    .series-line {
      stroke-width: 2;
      fill: none;
      stroke-linejoin: round;
      stroke-linecap: round;
    }
    .series-point {
      stroke: var(--tc-chart-bg, var(--tc-color-surface, #ffffff));
      stroke-width: 2;
      transition: r 0.12s ease;
      cursor: default;
    }
    .series-point:hover { r: 5; }
    .series-segment {
      stroke: var(--tc-chart-bg, var(--tc-color-surface, #ffffff));
      stroke-width: 2;
      transition: transform 0.15s ease;
      transform-origin: center;
      transform-box: fill-box;
    }
    .series-segment:hover { transform: scale(1.03); }
    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: 12px 18px;
      margin-top: 12px;
      font-size: 0.86rem;
      color: var(--tc-chart-fg, var(--tc-color-ink, #14171f));
    }
    .legend-item {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .swatch {
      width: 10px;
      height: 10px;
      border-radius: 2px;
      flex: 0 0 auto;
    }
    @media (prefers-reduced-motion: reduce) {
      .series-point, .series-segment { transition: none; }
    }
  </style>
`;
build(
  TAG36,
  describe({
    props: {
      type: { type: "string", default: "line" },
      data: { type: "json", default: { series: [] } },
      height: { type: "string", default: "240px" },
      smooth: { type: "boolean", default: true },
      stacked: { type: "boolean", default: false },
      showLegend: { type: "boolean", default: true },
      showAxes: { type: "boolean", default: true },
      showGrid: { type: "boolean", default: true },
      showLabels: { type: "boolean", default: true },
      showValues: { type: "boolean", default: false },
      innerRadius: { type: "number", default: 0.6 },
      yMin: { type: "json", default: null },
      yMax: { type: "json", default: null },
      ariaLabel: { type: "string", default: "Chart" },
      colors: { type: "json", default: null },
      // Server-side data: fetch JSON from `src` and use it as `data`.
      // If `data` is set explicitly it always wins. `srcKey` lets the
      // chart drill into the response (e.g. "results.population" maps to
      // `json.results.population`). `loadingText` and `errorText` are
      // shown inside the chart while the fetch is pending / failed.
      src: { type: "string", default: "" },
      srcKey: { type: "string", default: "" },
      loadingText: { type: "string", default: "Loading chart\u2026" },
      errorText: { type: "string", default: "Couldn't load chart data" }
    },
    theme: {
      "tc-chart-bg": "transparent",
      "tc-chart-fg": "var(--tc-color-ink, #14171f)",
      "tc-chart-axis": "var(--tc-color-rule-strong, #d9cfb8)",
      "tc-chart-grid": "var(--tc-color-rule, #ece5d3)",
      "tc-chart-label": "var(--tc-color-ink-muted, #6b7280)",
      "tc-chart-font": "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"
    },
    styles: { display: "block" },
    template: ({ props, state }) => {
      const rawType = String(props.type ?? "line").toLowerCase();
      const type = ["line", "area", "bar", "sparkline", "donut"].includes(rawType) ? rawType : "line";
      const explicitData = props.data;
      const fetchedData = state.fetched;
      const hasExplicit = !!explicitData && Array.isArray(explicitData.series) && explicitData.series.length > 0;
      const data = hasExplicit ? explicitData : fetchedData ?? { series: [] };
      const src = String(props.src ?? "");
      const loading = !!state.loading && !hasExplicit && !fetchedData;
      const error = src && state.error ? String(state.error) : "";
      const stateOverlay = loading ? `<div class="overlay loading">${esc33(String(props.loadingText ?? "Loading chart\u2026"))}</div>` : error ? `<div class="overlay error" role="alert">${esc33(String(props.errorText ?? "Couldn't load chart data"))}<small>${esc33(error)}</small></div>` : "";
      const isSparkline = type === "sparkline";
      const isDonut = type === "donut";
      const customColors = props.colors;
      const palette = Array.isArray(customColors) && customColors.length > 0 ? customColors : DEFAULT_PALETTE;
      const W = isDonut ? 320 : 800;
      const H = isDonut ? 320 : 400;
      const ctx = {
        data,
        smooth: !!props.smooth,
        stacked: !!props.stacked,
        showAxes: !!props.showAxes,
        showGrid: !!props.showGrid,
        showLabels: !!props.showLabels,
        showValues: !!props.showValues,
        innerRadius: Number(props.innerRadius ?? 0.6),
        yMin: props.yMin == null ? null : Number(props.yMin),
        yMax: props.yMax == null ? null : Number(props.yMax),
        palette,
        W,
        H
      };
      const body = isDonut ? renderDonut(ctx) : renderCartesian(ctx, type);
      const desc = ariaDescription(type, data);
      const height = esc33(String(props.height ?? "240px"));
      return `
        <div class="root" role="img" aria-label="${esc33(props.ariaLabel ?? "Chart")}">
          <div class="canvas" style="height:${height};">
            <svg
              viewBox="0 0 ${W} ${H}"
              preserveAspectRatio="${isDonut ? "xMidYMid meet" : "none"}"
              aria-hidden="true"
            >${body}</svg>
            <div class="tip" role="tooltip">
              <span class="tip-swatch"></span><span class="tip-text"></span>
            </div>
            ${stateOverlay}
          </div>
          ${props.showLegend && !isSparkline && data.series && data.series.length > 0 ? renderLegend(data.series, palette) : ""}
          <span class="visually-hidden" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;">${esc33(desc)}</span>
        </div>
        ${CHART_STYLE}
      `;
    },
    afterMount() {
      installChartHover(this);
      maybeFetch(this);
    },
    afterRender() {
      installChartHover(this);
      maybeFetch(this);
    },
    unmount() {
      const host = this;
      host._chartHoverCleanup?.();
      host._chartFetchAborter?.abort();
    }
  })
);
function installChartHover(host) {
  const h = host;
  h._chartHoverCleanup?.();
  const root = h.shadowRoot;
  if (!root)
    return;
  const canvas = root.querySelector(".canvas");
  const tip = root.querySelector(".tip");
  const tipText = tip?.querySelector(".tip-text");
  const tipSwatch = tip?.querySelector(".tip-swatch");
  if (!canvas || !tip || !tipText || !tipSwatch)
    return;
  const hide = () => {
    tip.removeAttribute("data-open");
    tip.style.transform = "translate(-9999px, -9999px)";
  };
  const onMove = (e) => {
    const target = e.target?.closest?.(
      "[data-tip]"
    );
    if (!target) {
      hide();
      return;
    }
    const text = target.getAttribute("data-tip") || "";
    const color = target.getAttribute("data-color") || "currentColor";
    tipText.textContent = text;
    tipSwatch.style.background = color;
    const rect = canvas.getBoundingClientRect();
    const tw = tip.offsetWidth || 100;
    const th = tip.offsetHeight || 24;
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    let x = px + 12;
    let y = py - th - 8;
    if (x + tw > rect.width - 4)
      x = px - tw - 12;
    if (y < 4)
      y = py + 16;
    tip.style.transform = `translate(${x}px, ${y}px)`;
    tip.setAttribute("data-open", "1");
  };
  const onLeave = () => hide();
  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("pointerleave", onLeave);
  h._chartHoverCleanup = () => {
    canvas.removeEventListener("pointermove", onMove);
    canvas.removeEventListener("pointerleave", onLeave);
    hide();
  };
}
function maybeFetch(rawHost) {
  const host = rawHost;
  const src = String(host.src ?? "").trim();
  if (!src)
    return;
  if (!host.getState || !host.setState)
    return;
  const last = host.getState("fetchedFrom");
  if (last === src)
    return;
  host._chartFetchAborter?.abort();
  const aborter = new AbortController();
  host._chartFetchAborter = aborter;
  host.setState("fetchedFrom", src);
  host.setState("fetched", null);
  host.setState("error", null);
  host.setState("loading", true);
  const key = String(host.srcKey ?? "").trim();
  fetch(src, { signal: aborter.signal }).then((r) => {
    if (!r.ok)
      throw new Error(`${r.status} ${r.statusText}`);
    return r.json();
  }).then((json) => {
    const resolved = key ? getByPath(json, key) : json;
    if (!resolved || typeof resolved !== "object" || !Array.isArray(resolved.series)) {
      throw new Error(
        key ? `Payload at "${key}" doesn't look like ChartData` : `Payload doesn't look like ChartData`
      );
    }
    if (aborter.signal.aborted)
      return;
    host.setState("fetched", resolved);
    host.setState("loading", false);
  }).catch((err) => {
    if (aborter.signal.aborted)
      return;
    host.setState("loading", false);
    host.setState(
      "error",
      err instanceof Error ? err.message : String(err)
    );
  });
}
function getByPath(obj, path) {
  return path.split(".").reduce(
    (o, k) => o && typeof o === "object" ? o[k] : void 0,
    obj
  );
}

// mod.ts
var tags = {
  // form fields
  button: tagName,
  input: tagName2,
  textarea: tagName3,
  select: tagName4,
  checkbox: tagName5,
  switch: tagName6,
  file: tagName7,
  radioGroup: tagName8,
  slider: tagName35,
  rating: tagName34,
  // data
  table: tagName9,
  chart: tagName36,
  // layout / chrome
  tabs: tagName10,
  modal: tagName11,
  drawer: tagName29,
  toast: tagName12,
  stat: tagName13,
  card: tagName14,
  badge: tagName15,
  skeleton: tagName16,
  carousel: tagName25,
  accordion: tagName26,
  tooltip: tagName27,
  popover: tagName28,
  progress: tagName30,
  stepper: tagName31,
  avatar: tagName32,
  avatarGroup: tagName33,
  // primitives
  stack: tagName17,
  cluster: tagName18,
  grid: tagName19,
  // docs / content
  code: tagName20,
  callout: tagName21,
  toc: tagName22,
  pagination: tagName23,
  // additional form fields
  combobox: tagName24
};
export {
  tags
};
//# sourceMappingURL=kit.js.map
