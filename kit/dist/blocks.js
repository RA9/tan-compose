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
  if (options.stylesheet !== void 0) {
    const ok = typeof options.stylesheet === "string" || Array.isArray(options.stylesheet) && options.stylesheet.every((s) => typeof s === "string");
    if (!ok) {
      throw new TypeError(
        "describe(): `stylesheet` must be a string or array of strings"
      );
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

// ../html.ts
var SAFE = Symbol.for("tan-compose.SafeHtml");
var SafeHtml = class {
  value;
  // Branded so isSafeHtml works across module/realm boundaries via Symbol.for.
  [SAFE] = true;
  constructor(value) {
    this.value = value;
  }
  toString() {
    return this.value;
  }
};
function isSafeHtml(v) {
  return typeof v === "object" && v !== null && v[SAFE] === true;
}
function escapeHtml(value) {
  return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function unsafe(value) {
  return new SafeHtml(String(value ?? ""));
}
function resolve(value) {
  if (value == null || value === false || value === true) {
    return value === true ? "true" : "";
  }
  if (isSafeHtml(value))
    return value.value;
  if (Array.isArray(value))
    return value.map(resolve).join("");
  return escapeHtml(value);
}
function html(strings, ...values) {
  let out = strings[0];
  for (let i = 0; i < values.length; i++) {
    out += resolve(values[i]) + strings[i + 1];
  }
  return new SafeHtml(out);
}
function map(items, fn) {
  let out = "";
  let i = 0;
  for (const item of items)
    out += resolve(fn(item, i++));
  return new SafeHtml(out);
}

// ../build.ts
var componentRegistry = /* @__PURE__ */ new Map();
var TAG_NAME_PATTERN = /^[a-z][a-z0-9]*(-[a-z0-9]+)+$/;
var EVENT_KEY_PATTERN = /^(\S+)(?:\s+(.+))?$/;
var NON_BUBBLING_EVENTS = /* @__PURE__ */ new Set([
  "focus",
  "blur",
  "mouseenter",
  "mouseleave",
  "pointerenter",
  "pointerleave",
  "load",
  "error",
  "scroll"
]);
var RENDER_LOOP_LIMIT = 50;
function kebabCase(s) {
  return s.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
}
function templateToHtml(value) {
  return isSafeHtml(value) ? value.value : value;
}
function cssAttrEscape(s) {
  return s.replace(/(["\\])/g, "\\$1");
}
function build(tagName6, descriptionInput) {
  const description = descriptionInput;
  if (typeof tagName6 !== "string" || !TAG_NAME_PATTERN.test(tagName6)) {
    throw new TypeError(
      `build(): "${tagName6}" is not a valid custom element name (must be lowercase and contain a hyphen).`
    );
  }
  if (componentRegistry.has(tagName6)) {
    console.warn(
      `Component "${tagName6}" is already registered. Skipping re-registration.`
    );
    return tagName6;
  }
  if (typeof HTMLElement === "undefined" || typeof customElements === "undefined") {
    console.warn(
      "HTMLElement or customElements not available; skipping component registration."
    );
    return tagName6;
  }
  const propDefs = description.props ?? {};
  const attrToProp = /* @__PURE__ */ new Map();
  const reflectAttrName = /* @__PURE__ */ new Map();
  const observedSet = new Set(description.observedAttributes ?? []);
  for (const name of Object.keys(propDefs)) {
    const kebab = kebabCase(name);
    attrToProp.set(kebab, name);
    attrToProp.set(name.toLowerCase(), name);
    observedSet.add(kebab);
    observedSet.add(name.toLowerCase());
    reflectAttrName.set(name, kebab);
  }
  const observed = Array.from(observedSet);
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
    // Every slot ever created, so disconnect can flush cleanups for nested /
    // dynamically-rendered lists that aren't in the static description tree.
    allSlots = /* @__PURE__ */ new Set();
    currentRefs = {};
    container;
    ctx;
    rendering = false;
    renderQueued = false;
    renderTick = 0;
    renderTickScheduled = false;
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
        const attrValue = this.getAttribute(reflectAttrName.get(name) ?? name) ?? this.getAttribute(name);
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
            if (def.reflect) {
              reflectAttribute(
                this,
                reflectAttrName.get(name) ?? name,
                coerced,
                def.type
              );
            }
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
        console.error(`[tan-compose] beforeMount threw for <${tagName6}>:`, err);
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
        console.error(`[tan-compose] afterMount threw for <${tagName6}>:`, err);
      }
    }
    disconnectedCallback() {
      try {
        description.unmount?.call(this);
      } catch (err) {
        console.error(`[tan-compose] unmount threw for <${tagName6}>:`, err);
      }
      runCleanups(this.mountCleanups);
      runCleanups(this.renderCleanups);
      this.flushListSlots();
      this.isMounted = false;
    }
    flushListSlots() {
      for (const slot of this.allSlots) {
        for (const item of slot.cache.values())
          runCleanups(item.cleanups);
        slot.cache.clear();
      }
      this.allSlots.clear();
    }
    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue === newValue)
        return;
      const propName = attrToProp.get(name);
      if (propName) {
        const def = propDefs[propName];
        const coerced = newValue !== null ? coerceProp(newValue, def.type) : def.default;
        const prev = this.propValues.get(propName);
        if (!Object.is(prev, coerced)) {
          this.propValues.set(propName, coerced);
          this.maybeSyncFormValue(propName, coerced);
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
        this.allSlots.add(slot);
      }
      return slot;
    }
    renderInternal() {
      if (++this.renderTick > RENDER_LOOP_LIMIT) {
        console.error(
          `[tan-compose] <${tagName6}> exceeded ${RENDER_LOOP_LIMIT} renders in one turn \u2014 aborting to break a render loop (check afterRender / setState).`
        );
        this.renderTick = 0;
        this.renderQueued = false;
        return;
      }
      if (!this.renderTickScheduled) {
        this.renderTickScheduled = true;
        const reset = () => {
          this.renderTick = 0;
          this.renderTickScheduled = false;
        };
        if (typeof queueMicrotask === "function")
          queueMicrotask(reset);
        else
          Promise.resolve().then(reset);
      }
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
          const raw = typeof description.template === "function" ? description.template(this.ctx) : description.template;
          const htmlStr = templateToHtml(raw);
          if (htmlStr)
            this.container.innerHTML = htmlStr;
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
        console.error(`[tan-compose] afterRender threw for <${tagName6}>:`, err);
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
      return {
        id: active.id || null,
        name: active.getAttribute("name"),
        path,
        selectionStart,
        selectionEnd
      };
    }
    restoreFocusInShadow(snap) {
      const root = this.shadowRoot;
      if (!root)
        return;
      let el = null;
      if (snap.id) {
        el = root.getElementById?.(snap.id) ?? root.querySelector(`[id="${cssAttrEscape(snap.id)}"]`);
      }
      if (!el && snap.name) {
        el = root.querySelector(
          `[name="${cssAttrEscape(snap.name)}"]`
        );
      }
      if (!el) {
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
        el = cursor;
      }
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
          `[tan-compose] formAssociatedCallback threw for <${tagName6}>:`,
          err
        );
      }
    }
    formDisabledCallback(disabled) {
      try {
        description.formDisabledCallback?.call(this, disabled);
      } catch (err) {
        console.error(
          `[tan-compose] formDisabledCallback threw for <${tagName6}>:`,
          err
        );
      }
    }
    formResetCallback() {
      try {
        description.formResetCallback?.call(this);
      } catch (err) {
        console.error(
          `[tan-compose] formResetCallback threw for <${tagName6}>:`,
          err
        );
      }
    }
    formStateRestoreCallback(state, mode) {
      try {
        description.formStateRestoreCallback?.call(this, state, mode);
      } catch (err) {
        console.error(
          `[tan-compose] formStateRestoreCallback threw for <${tagName6}>:`,
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
        const capture = NON_BUBBLING_EVENTS.has(type);
        this.shadowRoot.addEventListener(type, listener, capture);
        this.mountCleanups.push(
          () => this.shadowRoot?.removeEventListener(type, listener, capture)
        );
      }
    }
  }
  componentRegistry.set(tagName6, CustomComponent);
  customElements.define(tagName6, CustomComponent);
  return tagName6;
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
    const raw = typeof description.template === "function" ? description.template(scope.ctx) : description.template;
    const htmlStr = templateToHtml(raw);
    if (htmlStr)
      element.innerHTML = htmlStr;
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
  const cssList = [];
  if (description.theme)
    cssList.push(buildThemeCss(description.theme));
  if (description.stylesheet) {
    const sheets = Array.isArray(description.stylesheet) ? description.stylesheet : [description.stylesheet];
    for (const css of sheets)
      if (css)
        cssList.push(css);
  }
  if (description.styles)
    cssList.push(buildContainerCss(description.styles));
  if (cssList.length === 0)
    return { kind: "adopted", sheets: [] };
  const supportsConstructable = typeof CSSStyleSheet !== "undefined" && typeof CSSStyleSheet.prototype.replaceSync === "function";
  if (supportsConstructable) {
    const sheets = [];
    for (const css of cssList) {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(css);
      sheets.push(sheet);
    }
    return { kind: "adopted", sheets };
  }
  return { kind: "fallback", cssList };
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
  for (const css of shared.cssList) {
    const el = document.createElement("style");
    el.textContent = css;
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

// components/input.ts
var TAG = "tc-input";
var STYLE = `
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
`;
build(
  TAG,
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
    stylesheet: STYLE,
    refs: {
      input: "input"
    },
    template: ({ props }) => {
      const showError = Boolean(props.error);
      return html`
        ${unsafe(
        props.label ? `<label class="label">${esc(props.label)}${props.required ? ' <span class="req" aria-hidden="true">*</span>' : ""}</label>` : ""
      )}
        <input
          class="input ${showError ? "invalid" : ""}"
          part="input"
          type="${props.type}"
          value="${props.value}"
          name="${props.name}"
          placeholder="${props.placeholder}"
          ${unsafe(props.disabled ? "disabled" : "")}
          ${unsafe(props.required ? "required" : "")}
          aria-invalid="${showError ? "true" : "false"}"
        />
        ${unsafe(
        props.error || props.helper ? `<div class="${showError ? "error" : "helper"}">${esc(props.error || props.helper)}</div>` : ""
      )}
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
function esc(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// components/button.ts
var TAG2 = "tc-button";
var STYLE2 = `
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

        .s-sm {
          font-size: 0.82rem;
          padding: var(--tc-btn-padding-y, 6px) var(--tc-btn-padding-x, 12px);
        }
        .s-md {
          font-size: 0.92rem;
          padding: var(--tc-btn-padding-y, 9px) var(--tc-btn-padding-x, 16px);
        }
        .s-lg {
          font-size: 1.0rem;
          padding: var(--tc-btn-padding-y, 12px) var(--tc-btn-padding-x, 22px);
        }

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
`;
build(
  TAG2,
  describe({
    props: {
      variant: { type: "string", default: "primary" },
      size: { type: "string", default: "md" },
      disabled: { type: "boolean", default: false, reflect: true },
      loading: { type: "boolean", default: false },
      block: { type: "boolean", default: false },
      href: { type: "string", default: "" },
      target: { type: "string", default: "" },
      rel: { type: "string", default: "" },
      type: { type: "string", default: "button" }
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
      "tc-btn-font": "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
      "tc-btn-padding-x": "initial",
      "tc-btn-padding-y": "initial"
    },
    styles: {
      display: "inline-block",
      "vertical-align": "middle"
    },
    stylesheet: STYLE2,
    template: ({ props }) => {
      const cls = `root v-${esc2(props.variant)} s-${esc2(props.size)}${props.block ? " block" : ""}`;
      const inner = `${props.loading ? '<span class="spinner" aria-hidden="true"></span>' : ""}
        <span class="content"><slot></slot></span>`;
      const href = String(props.href ?? "");
      const isAnchor = href.length > 0;
      const isDisabled = !!(props.disabled || props.loading);
      if (isAnchor) {
        const targetAttr = props.target ? ` target="${esc2(props.target)}"` : "";
        const relValue = props.rel ? String(props.rel) : String(props.target) === "_blank" ? "noopener" : "";
        const relAttr = relValue ? ` rel="${esc2(relValue)}"` : "";
        const hrefAttr = isDisabled ? "" : ` href="${esc2(href)}"`;
        const ariaDisabled = isDisabled ? ` aria-disabled="true"` : "";
        const tabIndex = isDisabled ? ` tabindex="-1"` : "";
        return html`
          <a
            part="button"
            class="${unsafe(cls)}"
            ${unsafe(hrefAttr)}${unsafe(targetAttr)}${unsafe(relAttr)}${unsafe(
          ariaDisabled
        )}${unsafe(tabIndex)}
            role="button"
          >
            ${unsafe(inner)}
          </a>
        `;
      }
      const rawType = String(props.type ?? "button");
      const btnType = rawType === "submit" || rawType === "reset" ? rawType : "button";
      return html`
        <button
          part="button"
          class="${unsafe(cls)}"
          ${unsafe(isDisabled ? "disabled" : "")}
          type="${btnType}"
        >
          ${unsafe(inner)}
        </button>
      `;
    },
    events: {
      "click .root": (_event, ctx) => {
        const host = ctx.host;
        if (host.disabled || host.loading)
          return;
        if (String(host.href ?? ""))
          return;
        const type = String(host.type ?? "button");
        if (type !== "submit" && type !== "reset")
          return;
        const form = host.closest("form");
        if (!form)
          return;
        const eventName = type === "submit" ? "tc-submit" : "tc-reset";
        const ev = new CustomEvent(eventName, {
          detail: { form },
          bubbles: true,
          composed: true,
          cancelable: true
        });
        host.dispatchEvent(ev);
        if (ev.defaultPrevented)
          return;
        if (type === "submit") {
          form.requestSubmit();
        } else {
          form.reset();
        }
      }
    }
  })
);
function esc2(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// components/checkbox.ts
var TAG3 = "tc-checkbox";
var STYLE3 = `
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
`;
build(
  TAG3,
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
    stylesheet: STYLE3,
    template: ({ props }) => {
      const showError = Boolean(props.error);
      return html`
        <label class="row ${props.disabled ? "is-disabled" : ""} ${showError ? "is-invalid" : ""}">
          <input
            class="cb"
            type="checkbox"
            name="${props.name}"
            value="${props.value}"
            ${unsafe(props.checked ? "checked" : "")}
            ${unsafe(props.disabled ? "disabled" : "")}
            ${unsafe(props.required ? "required" : "")}
            aria-invalid="${showError ? "true" : "false"}"
          />
          ${unsafe(
        props.label ? `<span class="label">${esc3(props.label)}${props.required ? ' <span class="req" aria-hidden="true">*</span>' : ""}</span>` : "<span></span>"
      )}
        </label>
        ${unsafe(
        props.error || props.helper ? `<div class="${showError ? "error" : "helper"}">${esc3(props.error || props.helper)}</div>` : ""
      )}
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
function esc3(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// blocks/login.ts
var TAG4 = "tc-block-login";
var tagName = TAG4;
var STYLE4 = `
  :host { display: block; font-family: var(--tc-block-font); }
  .shell {
    display: grid;
    grid-template-columns: minmax(320px, 5fr) minmax(360px, 7fr);
    min-height: 100vh;
    background: var(--tc-color-bg, #faf8f3);
    color: var(--tc-color-ink, #14171f);
  }

  /* ---- Left brand panel ---- */
  .side {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 24px;
    padding: 40px;
    background:
      radial-gradient(1200px 600px at -10% -10%, rgba(161, 105, 57, 0.22), transparent 60%),
      var(--tc-block-side-bg);
    color: var(--tc-block-side-fg);
  }
  .brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 1.05rem;
    font-weight: 700;
    letter-spacing: -0.01em;
  }
  .brand-mark {
    width: 24px;
    height: 24px;
    border-radius: 7px;
    background: var(--tc-color-accent, #a16939);
  }
  .side h2 {
    font-size: 1.9rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.15;
    margin: 0;
    max-width: 24ch;
  }
  .features {
    list-style: none;
    margin: 28px 0 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .features li {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 0.95rem;
    color: var(--tc-block-side-soft);
  }
  .features .check {
    flex: 0 0 auto;
    width: 20px;
    height: 20px;
    margin-top: 1px;
    border-radius: 999px;
    display: inline-grid;
    place-items: center;
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--tc-color-accent, #a16939);
    background: var(--tc-color-accent-soft, #efe2cf);
  }
  .side-foot {
    font-size: 0.8rem;
    color: var(--tc-block-side-soft);
    opacity: 0.8;
  }

  /* ---- Right form panel ---- */
  .form-panel {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 24px;
  }
  .form {
    width: 100%;
    max-width: 380px;
  }
  .form h1 {
    font-size: 1.7rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin: 0 0 6px;
  }
  .form .subtitle {
    margin: 0 0 28px;
    color: var(--tc-color-ink-soft, #4a5061);
    font-size: 0.95rem;
  }
  .field {
    margin-bottom: 16px;
  }
  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 20px;
  }
  .forgot {
    font-size: 0.85rem;
    color: var(--tc-color-accent, #a16939);
    text-decoration: none;
    font-weight: 500;
  }
  .forgot:hover { text-decoration: underline; }
  .footer {
    margin-top: 18px;
    text-align: center;
    font-size: 0.9rem;
    color: var(--tc-color-ink-soft, #4a5061);
  }

  @media (max-width: 860px) {
    .shell { grid-template-columns: 1fr; min-height: 0; }
    .side {
      padding: 28px 24px;
      background:
        radial-gradient(800px 400px at 20% -20%, rgba(161, 105, 57, 0.18), transparent 60%),
        var(--tc-block-side-bg);
    }
    .side h2 { font-size: 1.5rem; }
    .features { margin-top: 18px; }
    .form-panel { padding: 28px 20px 48px; }
  }
`;
build(
  TAG4,
  describe({
    props: {
      brand: { type: "string", default: "Acme" },
      headline: {
        type: "string",
        default: "Everything your team needs, in one place."
      },
      features: {
        type: "json",
        default: [
          "Realtime collaboration across every project",
          "Role-based access and audit logs built in",
          "Deploys to your cloud in minutes, not weeks"
        ]
      },
      title: { type: "string", default: "Welcome back" },
      subtitle: {
        type: "string",
        default: "Sign in to your account to continue."
      },
      emailLabel: { type: "string", default: "Email" },
      passwordLabel: { type: "string", default: "Password" },
      rememberLabel: { type: "string", default: "Remember me" },
      submitLabel: { type: "string", default: "Sign in" },
      forgotLabel: { type: "string", default: "Forgot password?" },
      forgotHref: { type: "string", default: "#" }
    },
    theme: {
      "tc-block-side-bg": "var(--tc-color-surface, #ffffff)",
      "tc-block-side-fg": "var(--tc-color-ink, #14171f)",
      "tc-block-side-soft": "var(--tc-color-ink-soft, #4a5061)",
      "tc-block-surface": "var(--tc-color-surface, #ffffff)",
      "tc-block-rule": "var(--tc-color-rule, #ece5d3)",
      "tc-block-radius": "var(--tc-radius-lg, 12px)",
      "tc-block-shadow": "var(--tc-shadow-md, 0 8px 24px rgba(20, 23, 31, 0.06))",
      "tc-block-font": "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"
    },
    styles: {
      display: "block"
    },
    stylesheet: STYLE4,
    refs: {
      email: '[name="email"]',
      password: '[name="password"]',
      remember: '[name="remember"]'
    },
    template: ({ props }) => {
      const features = props.features ?? [];
      return html`
        <div class="shell">
          <aside class="side">
            <slot name="side">
              <span class="brand">
                <span class="brand-mark" aria-hidden="true"></span>
                ${props.brand}
              </span>
              <div>
                <h2>${props.headline}</h2>
                ${features.length > 0 ? html`
                    <ul class="features">
                      ${map(features, (f) => html`
                          <li>
                            <span class="check" aria-hidden="true">✓</span>
                            <span>${f}</span>
                          </li>
                        `)}
                    </ul>
                  ` : ""}
              </div>
              <div class="side-foot">
                &copy; ${(/* @__PURE__ */ new Date()).getFullYear()} ${props.brand}. All rights reserved.
              </div>
            </slot>
          </aside>

          <main class="form-panel">
            <form class="form" novalidate>
              <h1>${props.title}</h1>
              <p class="subtitle">${props.subtitle}</p>

              <div class="field">
                <tc-input
                  name="email"
                  type="email"
                  label="${props.emailLabel}"
                  placeholder="you@example.com"
                  autocomplete="email"
                ></tc-input>
              </div>
              <div class="field">
                <tc-input
                  name="password"
                  type="password"
                  label="${props.passwordLabel}"
                  placeholder="••••••••"
                  autocomplete="current-password"
                ></tc-input>
              </div>

              <div class="row">
                <tc-checkbox
                  name="remember"
                  label="${props.rememberLabel}"
                ></tc-checkbox>
                <a class="forgot" href="${props.forgotHref}">${props.forgotLabel}</a>
              </div>

              <tc-button
                type="submit"
                variant="primary"
                block
                part="submit"
              >${props.submitLabel}</tc-button>

              <div class="footer"><slot name="footer"></slot></div>
            </form>
          </main>
        </div>
      `;
    },
    events: {
      "submit form": (event, ctx) => {
        event.preventDefault();
        const email = readValue(ctx.refs.email);
        const password = readValue(ctx.refs.password);
        const remember = readChecked(ctx.refs.remember);
        ctx.emit("tc-block-login-submit", {
          values: { email, password, remember }
        });
      }
    }
  })
);
function readValue(el) {
  return String(el?.value ?? "");
}
function readChecked(el) {
  return Boolean(el?.checked ?? false);
}

// blocks/signup.ts
var TAG5 = "tc-block-signup";
var tagName2 = TAG5;
var STYLE5 = `
  :host { display: block; font-family: var(--tc-block-font); }
  .shell {
    display: grid;
    grid-template-columns: minmax(320px, 5fr) minmax(360px, 7fr);
    min-height: 100vh;
    background: var(--tc-color-bg, #faf8f3);
    color: var(--tc-color-ink, #14171f);
  }

  .side {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 24px;
    padding: 40px;
    background:
      radial-gradient(1200px 600px at -10% -10%, rgba(161, 105, 57, 0.22), transparent 60%),
      var(--tc-block-side-bg);
    color: var(--tc-block-side-fg);
  }
  .brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 1.05rem;
    font-weight: 700;
    letter-spacing: -0.01em;
  }
  .brand-mark {
    width: 24px;
    height: 24px;
    border-radius: 7px;
    background: var(--tc-color-accent, #a16939);
  }
  .side h2 {
    font-size: 1.9rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.15;
    margin: 0;
    max-width: 24ch;
  }
  .features {
    list-style: none;
    margin: 28px 0 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .features li {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 0.95rem;
    color: var(--tc-block-side-soft);
  }
  .features .check {
    flex: 0 0 auto;
    width: 20px;
    height: 20px;
    margin-top: 1px;
    border-radius: 999px;
    display: inline-grid;
    place-items: center;
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--tc-color-accent, #a16939);
    background: var(--tc-color-accent-soft, #efe2cf);
  }
  .side-foot {
    font-size: 0.8rem;
    color: var(--tc-block-side-soft);
    opacity: 0.8;
  }

  .form-panel {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 24px;
  }
  .form {
    width: 100%;
    max-width: 380px;
  }
  .form h1 {
    font-size: 1.7rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin: 0 0 6px;
  }
  .form .subtitle {
    margin: 0 0 28px;
    color: var(--tc-color-ink-soft, #4a5061);
    font-size: 0.95rem;
  }
  .field {
    margin-bottom: 16px;
  }
  .terms {
    margin-bottom: 20px;
  }
  .footer {
    margin-top: 18px;
    text-align: center;
    font-size: 0.9rem;
    color: var(--tc-color-ink-soft, #4a5061);
  }
  .footer a {
    color: var(--tc-color-accent, #a16939);
    font-weight: 500;
    text-decoration: none;
  }
  .footer a:hover { text-decoration: underline; }

  @media (max-width: 860px) {
    .shell { grid-template-columns: 1fr; min-height: 0; }
    .side {
      padding: 28px 24px;
      background:
        radial-gradient(800px 400px at 20% -20%, rgba(161, 105, 57, 0.18), transparent 60%),
        var(--tc-block-side-bg);
    }
    .side h2 { font-size: 1.5rem; }
    .features { margin-top: 18px; }
    .form-panel { padding: 28px 20px 48px; }
  }
`;
build(
  TAG5,
  describe({
    props: {
      brand: { type: "string", default: "Acme" },
      headline: {
        type: "string",
        default: "Everything your team needs, in one place."
      },
      features: {
        type: "json",
        default: [
          "Realtime collaboration across every project",
          "Role-based access and audit logs built in",
          "Deploys to your cloud in minutes, not weeks"
        ]
      },
      title: { type: "string", default: "Create your account" },
      subtitle: {
        type: "string",
        default: "Start your free trial \u2014 no credit card required."
      },
      nameLabel: { type: "string", default: "Full name" },
      emailLabel: { type: "string", default: "Email" },
      passwordLabel: { type: "string", default: "Password" },
      termsLabel: {
        type: "string",
        default: "I agree to the Terms of Service and Privacy Policy."
      },
      submitLabel: { type: "string", default: "Create account" },
      loginLabel: { type: "string", default: "Already have an account?" },
      loginHref: { type: "string", default: "#" }
    },
    theme: {
      "tc-block-side-bg": "var(--tc-color-surface, #ffffff)",
      "tc-block-side-fg": "var(--tc-color-ink, #14171f)",
      "tc-block-side-soft": "var(--tc-color-ink-soft, #4a5061)",
      "tc-block-surface": "var(--tc-color-surface, #ffffff)",
      "tc-block-rule": "var(--tc-color-rule, #ece5d3)",
      "tc-block-radius": "var(--tc-radius-lg, 12px)",
      "tc-block-shadow": "var(--tc-shadow-md, 0 8px 24px rgba(20, 23, 31, 0.06))",
      "tc-block-font": "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"
    },
    styles: {
      display: "block"
    },
    stylesheet: STYLE5,
    refs: {
      name: '[name="name"]',
      email: '[name="email"]',
      password: '[name="password"]',
      terms: '[name="terms"]'
    },
    template: ({ props }) => {
      const features = props.features ?? [];
      return html`
        <div class="shell">
          <aside class="side">
            <slot name="side">
              <span class="brand">
                <span class="brand-mark" aria-hidden="true"></span>
                ${props.brand}
              </span>
              <div>
                <h2>${props.headline}</h2>
                ${features.length > 0 ? html`
                    <ul class="features">
                      ${map(features, (f) => html`
                          <li>
                            <span class="check" aria-hidden="true">✓</span>
                            <span>${f}</span>
                          </li>
                        `)}
                    </ul>
                  ` : ""}
              </div>
              <div class="side-foot">
                &copy; ${(/* @__PURE__ */ new Date()).getFullYear()} ${props.brand}. All rights reserved.
              </div>
            </slot>
          </aside>

          <main class="form-panel">
            <form class="form" novalidate>
              <h1>${props.title}</h1>
              <p class="subtitle">${props.subtitle}</p>

              <div class="field">
                <tc-input
                  name="name"
                  type="text"
                  label="${props.nameLabel}"
                  placeholder="Ada Lovelace"
                  autocomplete="name"
                ></tc-input>
              </div>
              <div class="field">
                <tc-input
                  name="email"
                  type="email"
                  label="${props.emailLabel}"
                  placeholder="you@example.com"
                  autocomplete="email"
                ></tc-input>
              </div>
              <div class="field">
                <tc-input
                  name="password"
                  type="password"
                  label="${props.passwordLabel}"
                  placeholder="••••••••"
                  autocomplete="new-password"
                ></tc-input>
              </div>

              <div class="terms">
                <tc-checkbox
                  name="terms"
                  label="${props.termsLabel}"
                ></tc-checkbox>
              </div>

              <tc-button
                type="submit"
                variant="primary"
                block
                part="submit"
              >${props.submitLabel}</tc-button>

              <div class="footer">
                <slot name="footer">
                  ${props.loginLabel}
                  <a href="${props.loginHref}">Sign in</a>
                </slot>
              </div>
            </form>
          </main>
        </div>
      `;
    },
    events: {
      "submit form": (event, ctx) => {
        event.preventDefault();
        const values = {
          name: readValue2(ctx.refs.name),
          email: readValue2(ctx.refs.email),
          password: readValue2(ctx.refs.password),
          terms: readChecked2(ctx.refs.terms)
        };
        ctx.emit("tc-block-signup-submit", { values });
      }
    }
  })
);
function readValue2(el) {
  return String(el?.value ?? "");
}
function readChecked2(el) {
  return Boolean(el?.checked ?? false);
}

// components/avatar.ts
var TAG6 = "tc-avatar";
var STYLE6 = `
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
`;
function esc4(s) {
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
  TAG6,
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
    stylesheet: STYLE6,
    template: ({ props }) => {
      const name = String(props.name ?? "");
      const src = String(props.src ?? "");
      const alt = String(props.alt ?? "") || name || "avatar";
      const size = String(props.size ?? "md");
      const shape = String(props.shape ?? "circle");
      const status = String(props.status ?? "");
      const ring = !!props.ring;
      const [bg, fg] = tintFor(name);
      return html`
        <span
          class="root size-${size} shape-${shape} ${ring ? "ringed" : ""}"
          style="--tc-avatar-tint-bg: ${bg}; --tc-avatar-tint-fg: ${fg};"
        >
          ${src ? unsafe(
        `<img src="${esc4(src)}" alt="${esc4(alt)}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'fallback',textContent:'${esc4(initials(name))}'}))">`
      ) : unsafe(
        `<span class="fallback" aria-label="${esc4(alt)}">${esc4(initials(name))}</span>`
      )} ${status ? unsafe(
        `<span class="status status-${esc4(status)}" aria-label="${esc4(status)}"></span>`
      ) : ""}
        </span>
      `;
    }
  })
);

// blocks/dashboard.ts
var TAG7 = "tc-block-dashboard";
var tagName3 = TAG7;
var STYLE7 = `
  :host { display: block; font-family: var(--tc-block-font); }
  .shell {
    display: grid;
    grid-template-columns: 260px 1fr;
    min-height: 100vh;
    background: var(--tc-color-bg, #faf8f3);
    color: var(--tc-color-ink, #14171f);
  }

  /* ---- Sidebar ---- */
  .sidebar {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 22px 14px;
    background: var(--tc-block-side-bg);
    border-right: 1px solid var(--tc-block-rule);
  }
  .brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 1.02rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    padding: 2px 10px 16px;
  }
  .brand-mark {
    width: 22px;
    height: 22px;
    border-radius: 6px;
    background: var(--tc-color-accent, #a16939);
  }
  .nav {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
  }
  .nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 9px 12px;
    border: none;
    border-radius: var(--tc-radius-md, 8px);
    background: transparent;
    font: inherit;
    font-size: 0.92rem;
    font-weight: 500;
    color: var(--tc-block-side-soft);
    text-align: left;
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease;
  }
  .nav-item:hover { background: var(--tc-block-side-active-bg); color: var(--tc-block-side-fg); }
  .nav-item.active {
    background: var(--tc-block-side-active-bg);
    color: var(--tc-color-accent, #a16939);
    font-weight: 600;
  }
  .nav-item:focus-visible {
    outline: 2px solid var(--tc-color-accent, #a16939);
    outline-offset: 2px;
  }
  .nav-item .icon {
    width: 20px;
    text-align: center;
    flex: 0 0 auto;
  }
  .user {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    border-top: 1px solid var(--tc-block-rule);
  }
  .user .who {
    display: flex;
    flex-direction: column;
    min-width: 0;
    line-height: 1.25;
  }
  .user .name {
    font-size: 0.9rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .user .role {
    font-size: 0.78rem;
    color: var(--tc-block-side-soft);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* ---- Main ---- */
  .main {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  .topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 18px 28px;
    background: var(--tc-block-surface);
    border-bottom: 1px solid var(--tc-block-rule);
  }
  .topbar h1 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: -0.015em;
  }
  .actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .content {
    padding: 28px;
    flex: 1;
  }

  @media (max-width: 760px) {
    .shell { grid-template-columns: 1fr; }
    .sidebar {
      flex-direction: row;
      align-items: center;
      overflow-x: auto;
      padding: 10px 12px;
      border-right: none;
      border-bottom: 1px solid var(--tc-block-rule);
    }
    .brand { padding: 0 8px 0 0; }
    .nav { flex-direction: row; }
    .nav-item { white-space: nowrap; }
    .user { display: none; }
    .content { padding: 18px; }
    .topbar { padding: 14px 18px; }
  }
`;
build(
  TAG7,
  describe({
    props: {
      brand: { type: "string", default: "Acme" },
      title: { type: "string", default: "Dashboard" },
      nav: {
        type: "json",
        default: [
          { id: "overview", label: "Overview", icon: "\u25C9" },
          { id: "customers", label: "Customers", icon: "\u25C8" },
          { id: "billing", label: "Billing", icon: "\u25EB" },
          { id: "settings", label: "Settings", icon: "\u2699" }
        ]
      },
      active: { type: "string", default: "", reflect: true },
      userName: { type: "string", default: "Alex Rivera" },
      userRole: { type: "string", default: "Administrator" }
    },
    theme: {
      "tc-block-side-bg": "var(--tc-color-surface, #ffffff)",
      "tc-block-side-fg": "var(--tc-color-ink, #14171f)",
      "tc-block-side-soft": "var(--tc-color-ink-soft, #4a5061)",
      "tc-block-side-active-bg": "var(--tc-color-accent-soft, #efe2cf)",
      "tc-block-surface": "var(--tc-color-surface, #ffffff)",
      "tc-block-rule": "var(--tc-color-rule, #ece5d3)",
      "tc-block-font": "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"
    },
    styles: {
      display: "block"
    },
    stylesheet: STYLE7,
    beforeMount() {
      const host = this;
      const nav = host.nav ?? [];
      if (!host.active && nav.length > 0)
        host.active = nav[0].id;
    },
    template: ({ props }) => {
      const nav = props.nav ?? [];
      const active = String(props.active ?? "") || nav[0]?.id || "";
      return html`
        <div class="shell">
          <aside class="sidebar">
            <span class="brand">
              <span class="brand-mark" aria-hidden="true"></span>
              ${props.brand}
            </span>
            <nav class="nav" aria-label="Primary">
              ${map(nav, (item) => html`
                  <button
                    type="button"
                    class="nav-item ${item.id === active ? "active" : ""}"
                    data-nav="${item.id}"
                    aria-current="${item.id === active ? "page" : "false"}"
                  >
                    ${item.icon ? html`
                        <span class="icon" aria-hidden="true">${item.icon}</span>
                      ` : ""}
                    <span>${item.label}</span>
                  </button>
                `)}
            </nav>
            <div class="user">
              <slot name="sidebar-bottom">
                <tc-avatar name="${props.userName}" size="sm"></tc-avatar>
                <span class="who">
                  <span class="name">${props.userName}</span>
                  <span class="role">${props.userRole}</span>
                </span>
              </slot>
            </div>
          </aside>

          <div class="main">
            <header class="topbar">
              <h1>${props.title}</h1>
              <div class="actions"><slot name="topbar"></slot></div>
            </header>
            <main class="content"><slot></slot></main>
          </div>
        </div>
      `;
    },
    events: {
      "click .nav-item": (event, ctx) => {
        const btn = event.target.closest(
          ".nav-item"
        );
        if (!btn)
          return;
        const id = btn.dataset.nav;
        if (!id)
          return;
        const nav = ctx.props.nav ?? [];
        const item = nav.find((n) => n.id === id);
        const host = ctx.host;
        const previous = host.active;
        if (previous !== id)
          host.active = id;
        ctx.emit("tc-block-dashboard-nav", {
          id,
          item: item ?? null,
          previous
        });
      }
    }
  })
);

// blocks/settings.ts
var TAG8 = "tc-block-settings";
var tagName4 = TAG8;
var STYLE8 = `
  :host { display: block; font-family: var(--tc-block-font); }
  .shell {
    max-width: 960px;
    margin: 0 auto;
    padding: 40px 24px 64px;
    color: var(--tc-color-ink, #14171f);
  }
  .head h1 {
    margin: 0 0 6px;
    font-size: 1.7rem;
    font-weight: 700;
    letter-spacing: -0.02em;
  }
  .head .desc {
    margin: 0 0 28px;
    color: var(--tc-color-ink-soft, #4a5061);
    font-size: 0.95rem;
  }

  .body {
    display: grid;
    grid-template-columns: 240px 1fr;
    gap: 28px;
    align-items: start;
  }

  .sections {
    display: flex;
    flex-direction: column;
    gap: 2px;
    position: sticky;
    top: 24px;
  }
  .section-btn {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1px;
    padding: 10px 12px;
    border: none;
    border-left: 2px solid transparent;
    border-radius: 0 var(--tc-radius-md, 8px) var(--tc-radius-md, 8px) 0;
    background: transparent;
    font: inherit;
    font-size: 0.92rem;
    font-weight: 500;
    color: var(--tc-block-side-soft);
    text-align: left;
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
  }
  .section-btn:hover { background: var(--tc-block-side-active-bg); color: var(--tc-block-side-fg); }
  .section-btn.active {
    border-left-color: var(--tc-color-accent, #a16939);
    color: var(--tc-color-accent, #a16939);
    font-weight: 600;
  }
  .section-btn:focus-visible {
    outline: 2px solid var(--tc-color-accent, #a16939);
    outline-offset: 2px;
  }
  .section-btn .hint {
    font-size: 0.78rem;
    font-weight: 400;
    color: var(--tc-block-side-soft);
  }
  .section-btn.active .hint { color: inherit; opacity: 0.75; }

  .content {
    background: var(--tc-block-surface);
    border: 1px solid var(--tc-block-rule);
    border-radius: var(--tc-block-radius);
    padding: 24px 26px;
    min-width: 0;
  }
  .panel { line-height: 1.6; }
  .panel[hidden] { display: none; }

  @media (max-width: 700px) {
    .shell { padding: 28px 16px 48px; }
    .body { grid-template-columns: 1fr; gap: 16px; }
    .sections {
      position: static;
      flex-direction: row;
      overflow-x: auto;
      padding-bottom: 4px;
    }
    .section-btn {
      border-left: none;
      border-bottom: 2px solid transparent;
      border-radius: 0;
      white-space: nowrap;
      flex: 0 0 auto;
    }
    .section-btn.active { border-bottom-color: var(--tc-color-accent, #a16939); }
    .section-btn .hint { display: none; }
    .content { padding: 18px; }
  }
`;
build(
  TAG8,
  describe({
    props: {
      title: { type: "string", default: "Settings" },
      description: {
        type: "string",
        default: "Manage your account and workspace preferences."
      },
      sections: {
        type: "json",
        default: [
          { id: "profile", label: "Profile", hint: "Name and avatar" },
          { id: "account", label: "Account", hint: "Email and password" },
          {
            id: "notifications",
            label: "Notifications",
            hint: "What you hear about"
          },
          { id: "billing", label: "Billing", hint: "Plan and invoices" }
        ]
      },
      active: { type: "string", default: "", reflect: true }
    },
    theme: {
      "tc-block-side-bg": "var(--tc-color-surface, #ffffff)",
      "tc-block-side-fg": "var(--tc-color-ink, #14171f)",
      "tc-block-side-soft": "var(--tc-color-ink-soft, #4a5061)",
      "tc-block-side-active-bg": "var(--tc-color-accent-soft, #efe2cf)",
      "tc-block-surface": "var(--tc-color-surface, #ffffff)",
      "tc-block-rule": "var(--tc-color-rule, #ece5d3)",
      "tc-block-radius": "var(--tc-radius-lg, 12px)",
      "tc-block-font": "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"
    },
    styles: {
      display: "block"
    },
    stylesheet: STYLE8,
    beforeMount() {
      const host = this;
      const sections = host.sections ?? [];
      if (!host.active && sections.length > 0)
        host.active = sections[0].id;
    },
    template: ({ props }) => {
      const sections = props.sections ?? [];
      const active = String(props.active ?? "") || sections[0]?.id || "";
      return html`
        <div class="shell">
          <header class="head">
            <h1>${props.title}</h1>
            <p class="desc">${props.description}</p>
          </header>

          <div class="body">
            <nav class="sections" aria-label="Settings sections">
              ${map(sections, (s) => html`
                  <button
                    type="button"
                    class="section-btn ${s.id === active ? "active" : ""}"
                    data-section="${s.id}"
                    aria-current="${s.id === active ? "true" : "false"}"
                  >
                    <span>${s.label}</span>
                    ${s.hint ? html`
                        <span class="hint">${s.hint}</span>
                      ` : ""}
                  </button>
                `)}
            </nav>

            <div class="content">
              ${map(sections, (s) => html`
                  <section
                    class="panel"
                    aria-labelledby=""
                    ${s.id === active ? "" : "hidden"}
                  >
                    <slot name="${s.id}"></slot>
                  </section>
                `)}
            </div>
          </div>
        </div>
      `;
    },
    events: {
      "click .section-btn": (event, ctx) => {
        const btn = event.target.closest(
          ".section-btn"
        );
        if (!btn)
          return;
        const id = btn.dataset.section;
        if (!id)
          return;
        const host = ctx.host;
        const previous = host.active;
        if (previous === id)
          return;
        host.active = id;
        ctx.emit("tc-block-settings-change", { active: id, previous });
      }
    }
  })
);

// blocks/pricing.ts
var TAG9 = "tc-block-pricing";
var tagName5 = TAG9;
var STYLE9 = `
  :host { display: block; font-family: var(--tc-block-font); }
  .shell {
    max-width: 1080px;
    margin: 0 auto;
    padding: 56px 24px 72px;
    color: var(--tc-color-ink, #14171f);
  }
  .head {
    text-align: center;
    max-width: 560px;
    margin: 0 auto 44px;
  }
  .head h1 {
    margin: 0 0 8px;
    font-size: 2.1rem;
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.1;
  }
  .head .subtitle {
    margin: 0;
    color: var(--tc-color-ink-soft, #4a5061);
    font-size: 1.02rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 20px;
    align-items: stretch;
  }
  .tier {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 26px 24px;
    background: var(--tc-block-surface);
    border: 1px solid var(--tc-block-rule);
    border-radius: var(--tc-block-radius);
    box-shadow: var(--tc-block-shadow);
  }
  .tier.featured {
    border-color: var(--tc-block-featured-border);
    border-width: 2px;
    padding-top: 40px;
  }
  .badge {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    padding: 4px 12px;
    border-radius: 999px;
    color: var(--tc-color-accent, #a16939);
    background: var(--tc-color-accent-soft, #efe2cf);
  }
  .tier .name {
    font-size: 0.95rem;
    font-weight: 700;
  }
  .price-row {
    display: flex;
    align-items: baseline;
    gap: 6px;
  }
  .price {
    font-size: 2.4rem;
    font-weight: 800;
    letter-spacing: -0.03em;
    font-variant-numeric: tabular-nums;
  }
  .period {
    color: var(--tc-color-ink-muted, #6b7280);
    font-size: 0.9rem;
  }
  .description {
    color: var(--tc-color-ink-soft, #4a5061);
    font-size: 0.9rem;
    line-height: 1.5;
  }
  .features {
    list-style: none;
    margin: 0;
    padding: 16px 0 4px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
    border-top: 1px solid var(--tc-block-rule);
  }
  .features li {
    display: flex;
    align-items: flex-start;
    gap: 9px;
    font-size: 0.9rem;
  }
  .features .check {
    flex: 0 0 auto;
    color: var(--tc-color-success, #207a5b);
    font-weight: 700;
    line-height: 1.4;
  }
  .cta {
    margin-top: 4px;
    font: inherit;
    font-size: 0.92rem;
    font-weight: 600;
    padding: 11px 18px;
    border-radius: var(--tc-radius-md, 8px);
    border: 1px solid transparent;
    cursor: pointer;
    background: var(--tc-color-ink, #14171f);
    color: var(--tc-color-surface, #ffffff);
    transition: filter 0.15s ease, background 0.15s ease;
  }
  .cta:hover { filter: brightness(1.08); }
  .cta:focus-visible {
    outline: 2px solid var(--tc-color-accent, #a16939);
    outline-offset: 2px;
  }
  .cta.secondary {
    background: var(--tc-color-surface, #ffffff);
    color: var(--tc-color-ink, #14171f);
    border-color: var(--tc-color-rule-strong, #d9cfb8);
  }
  .cta.secondary:hover { background: rgba(20, 23, 31, 0.04); }
`;
build(
  TAG9,
  describe({
    props: {
      title: { type: "string", default: "Simple, transparent pricing" },
      subtitle: {
        type: "string",
        default: "Start free and scale as you grow. Cancel anytime."
      },
      currency: { type: "string", default: "$" },
      tiers: {
        type: "json",
        default: [
          {
            name: "Starter",
            price: "0",
            period: "/month",
            description: "For individuals getting started.",
            cta: "Start for free",
            features: [
              "Up to 3 projects",
              "1 GB storage",
              "Community support"
            ]
          },
          {
            name: "Pro",
            price: "29",
            period: "/month",
            description: "For growing teams that need more power.",
            cta: "Start 14-day trial",
            featured: true,
            badge: "Most popular",
            features: [
              "Unlimited projects",
              "100 GB storage",
              "Advanced analytics",
              "Priority support"
            ]
          },
          {
            name: "Enterprise",
            price: "Custom",
            period: "",
            description: "For organizations with advanced needs.",
            cta: "Contact sales",
            features: [
              "SSO & SCIM",
              "Audit logs",
              "Dedicated success manager"
            ]
          }
        ]
      }
    },
    theme: {
      "tc-block-surface": "var(--tc-color-surface, #ffffff)",
      "tc-block-rule": "var(--tc-color-rule, #ece5d3)",
      "tc-block-radius": "var(--tc-radius-lg, 12px)",
      "tc-block-shadow": "var(--tc-shadow-md, 0 8px 24px rgba(20, 23, 31, 0.06))",
      "tc-block-featured-border": "var(--tc-color-accent, #a16939)",
      "tc-block-font": "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"
    },
    styles: {
      display: "block"
    },
    stylesheet: STYLE9,
    template: ({ props }) => {
      const tiers = props.tiers ?? [];
      return html`
        <div class="shell">
          <header class="head">
            <h1>${props.title}</h1>
            <p class="subtitle">${props.subtitle}</p>
          </header>

          <div class="grid">
            ${map(tiers, (tier, index) => html`
                <div class="tier ${tier.featured ? "featured" : ""}">
                  ${tier.badge ? html`
                      <span class="badge">${tier.badge}</span>
                    ` : ""}
                  <div class="name">${tier.name}</div>
                  <div class="price-row">
                    <span class="price">${isNumericPrice(tier.price) ? props.currency : ""}${tier.price}</span>
                    ${tier.period ? html`
                        <span class="period">${tier.period}</span>
                      ` : ""}
                  </div>
                  <div class="description">${tier.description}</div>
                  <ul class="features">
                    ${map(tier.features ?? [], (f) => html`
                        <li>
                          <span class="check" aria-hidden="true">✓</span>
                          <span>${f}</span>
                        </li>
                      `)}
                  </ul>
                  <button
                    type="button"
                    class="cta ${tier.featured ? "" : "secondary"}"
                    data-tier="${index}"
                    part="cta"
                  >
                    ${tier.cta}
                  </button>
                </div>
              `)}
          </div>
        </div>
      `;
    },
    events: {
      "click .cta": (event, ctx) => {
        const btn = event.target.closest(
          ".cta"
        );
        if (!btn)
          return;
        const raw = btn.dataset.tier;
        if (raw == null)
          return;
        const tiers = ctx.props.tiers ?? [];
        const tier = tiers[Number(raw)];
        if (!tier)
          return;
        ctx.emit("tc-block-pricing-select", { tier });
      }
    }
  })
);
function isNumericPrice(price) {
  return /^[\d.,]+$/.test(String(price ?? ""));
}

// blocks/mod.ts
var tags = {
  login: tagName,
  signup: tagName2,
  dashboard: tagName3,
  settings: tagName4,
  pricing: tagName5
};
export {
  tags
};
//# sourceMappingURL=blocks.js.map
