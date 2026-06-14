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
function build(tagName39, descriptionInput) {
  const description = descriptionInput;
  if (typeof tagName39 !== "string" || !TAG_NAME_PATTERN.test(tagName39)) {
    throw new TypeError(
      `build(): "${tagName39}" is not a valid custom element name (must be lowercase and contain a hyphen).`
    );
  }
  if (componentRegistry.has(tagName39)) {
    console.warn(
      `Component "${tagName39}" is already registered. Skipping re-registration.`
    );
    return tagName39;
  }
  if (typeof HTMLElement === "undefined" || typeof customElements === "undefined") {
    console.warn(
      "HTMLElement or customElements not available; skipping component registration."
    );
    return tagName39;
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
        console.error(`[tan-compose] beforeMount threw for <${tagName39}>:`, err);
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
        console.error(`[tan-compose] afterMount threw for <${tagName39}>:`, err);
      }
    }
    disconnectedCallback() {
      try {
        description.unmount?.call(this);
      } catch (err) {
        console.error(`[tan-compose] unmount threw for <${tagName39}>:`, err);
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
          `[tan-compose] <${tagName39}> exceeded ${RENDER_LOOP_LIMIT} renders in one turn \u2014 aborting to break a render loop (check afterRender / setState).`
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
        console.error(`[tan-compose] afterRender threw for <${tagName39}>:`, err);
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
          `[tan-compose] formAssociatedCallback threw for <${tagName39}>:`,
          err
        );
      }
    }
    formDisabledCallback(disabled) {
      try {
        description.formDisabledCallback?.call(this, disabled);
      } catch (err) {
        console.error(
          `[tan-compose] formDisabledCallback threw for <${tagName39}>:`,
          err
        );
      }
    }
    formResetCallback() {
      try {
        description.formResetCallback?.call(this);
      } catch (err) {
        console.error(
          `[tan-compose] formResetCallback threw for <${tagName39}>:`,
          err
        );
      }
    }
    formStateRestoreCallback(state, mode) {
      try {
        description.formStateRestoreCallback?.call(this, state, mode);
      } catch (err) {
        console.error(
          `[tan-compose] formStateRestoreCallback threw for <${tagName39}>:`,
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
  componentRegistry.set(tagName39, CustomComponent);
  customElements.define(tagName39, CustomComponent);
  return tagName39;
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

// components/button.ts
var TAG = "tc-button";
var tagName = TAG;
var STYLE = `
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
    stylesheet: STYLE,
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
function esc(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// components/input.ts
var TAG2 = "tc-input";
var tagName2 = TAG2;
var STYLE2 = `
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
    stylesheet: STYLE2,
    refs: {
      input: "input"
    },
    template: ({ props }) => {
      const showError = Boolean(props.error);
      return html`
        ${unsafe(
        props.label ? `<label class="label">${esc2(props.label)}${props.required ? ' <span class="req" aria-hidden="true">*</span>' : ""}</label>` : ""
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
        props.error || props.helper ? `<div class="${showError ? "error" : "helper"}">${esc2(props.error || props.helper)}</div>` : ""
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
function esc2(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// components/textarea.ts
var TAG3 = "tc-textarea";
var tagName3 = TAG3;
var STYLE3 = `
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
`;
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
    stylesheet: STYLE3,
    refs: {
      input: "textarea"
    },
    template: ({ props }) => {
      const showError = Boolean(props.error);
      return html`
        ${unsafe(
        props.label ? `<label class="label">${esc3(props.label)}${props.required ? ' <span class="req" aria-hidden="true">*</span>' : ""}</label>` : ""
      )}
        <textarea
          class="input ${showError ? "invalid" : ""}"
          part="textarea"
          name="${props.name}"
          placeholder="${props.placeholder}"
          rows="${props.rows}"
          ${unsafe(props.disabled ? "disabled" : "")}
          ${unsafe(props.required ? "required" : "")}
          aria-invalid="${showError ? "true" : "false"}"
          style="resize: ${props.resize};"
        >${props.value}</textarea>
        ${unsafe(
        props.error || props.helper ? `<div class="${showError ? "error" : "helper"}">${esc3(props.error || props.helper)}</div>` : ""
      )}
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
var STYLE4 = `
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
`;
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
    stylesheet: STYLE4,
    template: ({ props }) => {
      const opts = props.options ?? [];
      const showError = Boolean(props.error);
      return html`
        ${unsafe(
        props.label ? `<label class="label">${esc4(props.label)}${props.required ? ' <span class="req" aria-hidden="true">*</span>' : ""}</label>` : ""
      )}
        <div class="wrap">
          <select
            class="select ${showError ? "invalid" : ""}"
            part="select"
            name="${props.name}"
            ${unsafe(props.disabled ? "disabled" : "")}
            ${unsafe(props.required ? "required" : "")}
            aria-invalid="${showError ? "true" : "false"}"
          >
            ${unsafe(
        props.placeholder ? `<option value="" disabled ${props.value === "" ? "selected" : ""}>${esc4(props.placeholder)}</option>` : ""
      )} ${unsafe(
        opts.map(
          (o) => `<option value="${esc4(o.value)}"${o.disabled ? " disabled" : ""}${o.value === props.value ? " selected" : ""}>${esc4(o.label)}</option>`
        ).join("")
      )}
          </select>
          <span class="caret" aria-hidden="true">▾</span>
        </div>
        ${unsafe(
        props.error || props.helper ? `<div class="${showError ? "error" : "helper"}">${esc4(props.error || props.helper)}</div>` : ""
      )}
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
var STYLE5 = `
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
    stylesheet: STYLE5,
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
        props.label ? `<span class="label">${esc5(props.label)}${props.required ? ' <span class="req" aria-hidden="true">*</span>' : ""}</span>` : "<span></span>"
      )}
        </label>
        ${unsafe(
        props.error || props.helper ? `<div class="${showError ? "error" : "helper"}">${esc5(props.error || props.helper)}</div>` : ""
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
function esc5(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// components/switch.ts
var TAG6 = "tc-switch";
var tagName6 = TAG6;
var STYLE6 = `
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
`;
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
    stylesheet: STYLE6,
    template: ({ props }) => {
      const showError = Boolean(props.error);
      return html`
        <label class="row ${props.disabled ? "is-disabled" : ""}">
          <button
            class="track ${props.checked ? "on" : ""}"
            type="button"
            role="switch"
            aria-checked="${props.checked ? "true" : "false"}"
            ${unsafe(props.disabled ? "disabled" : "")}
            aria-invalid="${showError ? "true" : "false"}"
          >
            <span class="thumb"></span>
          </button>
          ${unsafe(
        props.label ? `<span class="label">${esc6(props.label)}</span>` : ""
      )}
        </label>
        ${unsafe(
        props.error || props.helper ? `<div class="${showError ? "error" : "helper"}">${esc6(props.error || props.helper)}</div>` : ""
      )}
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
var STYLE7 = `
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
`;
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
    stylesheet: STYLE7,
    refs: {
      input: "input[type='file']"
    },
    template: ({ props, state }) => {
      const showError = Boolean(props.error);
      const filesState = state.files ?? [];
      const filesText = filesState.length === 0 ? "No file selected" : filesState.length === 1 ? esc7(filesState[0].name) : `${filesState.length} files selected`;
      return html`
        ${unsafe(
        props.label ? `<label class="label">${esc7(props.label)}${props.required ? ' <span class="req" aria-hidden="true">*</span>' : ""}</label>` : ""
      )}
        <div class="zone ${props.disabled ? "is-disabled" : ""} ${showError ? "is-invalid" : ""}">
          <button class="btn" type="button" ${unsafe(
        props.disabled ? "disabled" : ""
      )}>
            ${props.buttonText}
          </button>
          <span class="files">${unsafe(filesText)}</span>
          <input
            class="native"
            type="file"
            name="${props.name}"
            accept="${props.accept}"
            ${unsafe(props.multiple ? "multiple" : "")}
            ${unsafe(props.disabled ? "disabled" : "")}
            ${unsafe(props.required ? "required" : "")}
            tabindex="-1"
            aria-hidden="true"
          />
        </div>
        ${unsafe(
        props.error || props.helper ? `<div class="${showError ? "error" : "helper"}">${esc7(props.error || props.helper)}</div>` : ""
      )}
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
var STYLE8 = `
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
`;
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
    stylesheet: STYLE8,
    template: ({ props }) => {
      const opts = props.options ?? [];
      const showError = Boolean(props.error);
      const layout = String(props.layout ?? "vertical");
      return html`
        <fieldset class="group" ${unsafe(props.disabled ? "disabled" : "")}>
          ${unsafe(
        props.label ? `<legend class="legend">${esc8(props.label)}${props.required ? ' <span class="req" aria-hidden="true">*</span>' : ""}</legend>` : ""
      )}
          <div class="opts l-${layout}" role="radiogroup" aria-invalid="${showError ? "true" : "false"}">
            ${unsafe(
        opts.map(
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
        ).join("")
      )}
          </div>
        </fieldset>
        ${unsafe(
        props.error || props.helper ? `<div class="${showError ? "error" : "helper"}">${esc8(props.error || props.helper)}</div>` : ""
      )}
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
                  const cells = cols.map((c) => {
                    const isSorted = ts.sortKey === c.key;
                    const sortable = c.sortable !== false;
                    const indicator = isSorted ? ts.sortDir === "asc" ? "\u25B2" : "\u25BC" : "";
                    const ariaSort = isSorted ? ts.sortDir === "asc" ? "ascending" : "descending" : "none";
                    return `<th
                        data-col="${esc9(c.key)}"
                        class="${sortable ? "sortable" : ""}"
                        aria-sort="${ariaSort}"
                      >${esc9(c.label)}<span class="sort">${indicator}</span></th>`;
                  }).join("");
                  return html`
                    <tr>${unsafe(cells)}</tr>
                  `;
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
                      const span = cols.length || 1;
                      return html`
                        <td colspan="${span}">${props.emptyText}</td>
                      `;
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
                      template: cols.map((c) => {
                        const cell = typeof c.render === "function" ? unsafe(c.render(r)) : r[c.key] ?? "";
                        return html`
                          <td>${cell}</td>
                        `.value;
                      }).join("")
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
          return html`
            <span class="count">${visible.length} of ${total} rows</span>
            <span class="spacer"></span>
            <button class="prev" type="button" ${unsafe(
            page <= 0 ? "disabled" : ""
          )}>‹ prev</button>
            <span class="page">page ${page + 1} of ${totalPages}</span>
            <button class="next" type="button" ${unsafe(
            page >= totalPages - 1 ? "disabled" : ""
          )}>next ›</button>
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
var STYLE9 = `
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
`;
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
    stylesheet: STYLE9,
    template: ({ props }) => {
      const tabs = props.tabs ?? [];
      const active = props.active || tabs[0]?.id || "";
      return html`
        <div role="tablist" class="strip">
          ${unsafe(
        tabs.map(
          (t) => `<button
              role="tab"
              type="button"
              class="tab ${t.id === active ? "active" : ""}"
              data-tab="${esc10(t.id)}"
              aria-selected="${t.id === active ? "true" : "false"}"
              aria-controls="panel-${esc10(t.id)}"
              tabindex="${t.id === active ? "0" : "-1"}"
            >${esc10(t.label)}</button>`
        ).join("")
      )}
        </div>
        <div class="panels">
          ${unsafe(
        tabs.map(
          (t) => `<section
              role="tabpanel"
              id="panel-${esc10(t.id)}"
              class="panel"
              aria-labelledby=""
              ${t.id === active ? "" : "hidden"}
            ><slot name="${esc10(t.id)}"></slot></section>`
        ).join("")
      )}
        </div>
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
    template: ({ props }) => html`
        <dialog class="dlg" aria-labelledby="${props.title ? "title" : ""}">
          ${unsafe(
      props.title || props.dismissible ? `<header class="head">
              ${props.title ? `<h2 id="title" class="title">${esc11(props.title)}</h2>` : "<span></span>"}
              ${props.dismissible ? `<button class="x" type="button" aria-label="Close">\xD7</button>` : ""}
            </header>` : ""
    )}
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
var STYLE10 = `
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
`;
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
    stylesheet: STYLE10,
    template: ({ props }) => {
      const variant = String(props.variant ?? "info");
      const icon = variant === "success" ? "\u2713" : variant === "warning" ? "!" : variant === "error" ? "\u2715" : "i";
      return html`
        <div class="toast v-${variant} ${props.open ? "open" : "closed"}" role="status" aria-live="polite">
          <span class="icon" aria-hidden="true">${unsafe(icon)}</span>
          <span class="msg">${unsafe(
        props.message ? esc12(props.message) : "<slot></slot>"
      )}</span>
          ${unsafe(
        props.dismissible ? `<button type="button" class="x" aria-label="Close">\xD7</button>` : ""
      )}
        </div>
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
var STYLE11 = `
          :host { display: block; height: 100%; }
          .card {
            background: var(--tc-stat-surface);
            border: 1px solid var(--tc-stat-rule);
            border-radius: var(--tc-stat-radius);
            padding: 18px 20px;
            font-family: var(--tc-stat-font);
            box-sizing: border-box;
            height: 100%;
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
`;
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
      // share a baseline height. `display: block` (not flex) so the
      // host's box fills the grid cell uniformly — flex on the host
      // makes the inner container size to its content and the cards
      // end up unevenly wide.
      display: "block",
      height: "100%"
    },
    stylesheet: STYLE11,
    template: ({ props }) => {
      const trend = String(props.trend ?? "neutral");
      const arrow = trend === "up" ? "\u25B2" : trend === "down" ? "\u25BC" : "\u2022";
      return html`
        <div class="card">
          ${props.label ? unsafe(`<div class="label">${esc13(props.label)}</div>`) : ""}
          <div class="value">
            ${props.prefix ? unsafe(`<span class="prefix">${esc13(props.prefix)}</span>`) : ""}
            <span class="num">${props.value}</span>
            ${props.suffix ? unsafe(`<span class="suffix">${esc13(props.suffix)}</span>`) : ""}
          </div>
          ${props.delta ? unsafe(`<div class="delta t-${esc13(trend)}">
                  <span class="arrow" aria-hidden="true">${arrow}</span>
                  <span>${esc13(props.delta)}</span>
                </div>`) : ""}
        </div>
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
var STYLE12 = `
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

  /* Slot occupancy drives head/foot/media visibility. It's
     detected in afterMount via slotchange and reflected as
     has-header-slot / has-footer / has-media classes on .card.
     We can't do this in pure CSS: :has(::slotted(*)) is invalid
     (::slotted is a pseudo-element, which :has() rejects) and was
     silently dropping the footer + media styling entirely. */

  /* Head padding when title/subtitle props are set OR something
     is slotted into name="header". */
  .card.has-header .head,
  .card.has-header-slot .head {
    padding:
      var(--tc-card-padding-y)
      var(--tc-card-padding-x)
      var(--tc-card-gap);
  }
  .card.has-header .head + .body,
  .card.has-header-slot .head + .body { padding-top: 0; }

  /* Hide an empty head \u2014 neither props nor slotted content. */
  .card:not(.has-header):not(.has-header-slot) .head { display: none; }

  /* Foot only renders when there's slotted footer content. */
  .card.has-footer .foot {
    padding:
      var(--tc-card-gap)
      var(--tc-card-padding-x)
      var(--tc-card-padding-y);
    border-top: 1px solid var(--tc-card-rule);
    display: flex;
    gap: var(--tc-space-2, 8px);
    justify-content: flex-end;
    align-items: center;
  }
  .card:not(.has-footer) .foot { display: none; }

  /* Media is full-bleed (no horizontal padding). The slotted child
     stretches to fill the card width and sits flush to the top
     edge; the body's top padding is unchanged so content below
     keeps breathing room. ::slotted lives on the slot element. */
  .card:not(.has-media) .media { display: none; }
  slot[name="media"]::slotted(*) {
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

  /* Per-instance size \u2014 overrides the padding tokens so all
     three padding zones (head, body, foot) and the
     internal gap scale together. md matches the pre-size-
     prop default (=var(--tc-space-5, 24 px)) so existing
     cards don't visibly shrink when adopting v1.9. */
  .card.size-sm {
    --tc-card-padding-x: 14px;
    --tc-card-padding-y: 14px;
    --tc-card-gap: 8px;
    font-size: 0.93rem;
  }
  .card.size-md {
    --tc-card-padding-x: 24px;
    --tc-card-padding-y: 22px;
    --tc-card-gap: 14px;
  }
  .card.size-lg {
    --tc-card-padding-x: 32px;
    --tc-card-padding-y: 28px;
    --tc-card-gap: 18px;
  }
  .card.size-sm .title { font-size: 0.96rem; }
  .card.size-lg .title { font-size: 1.22rem; letter-spacing: -0.015em; }
  .card.size-lg .subtitle { font-size: 0.96rem; margin-top: 6px; }

  /* Responsive: shrink padding on narrow viewports so cards
     don't burn ~50 px of horizontal real estate on a 360 px
     phone. Hits every size variant proportionally. */
  @media (max-width: 480px) {
    .card.size-sm {
      --tc-card-padding-x: 12px;
      --tc-card-padding-y: 12px;
    }
    .card.size-md {
      --tc-card-padding-x: 16px;
      --tc-card-padding-y: 16px;
      --tc-card-gap: 12px;
    }
    .card.size-lg {
      --tc-card-padding-x: 20px;
      --tc-card-padding-y: 20px;
      --tc-card-gap: 14px;
    }
  }
`;
build(
  TAG14,
  describe({
    props: {
      title: { type: "string", default: "" },
      subtitle: { type: "string", default: "" },
      padded: { type: "boolean", default: true },
      bordered: { type: "boolean", default: true },
      elevated: { type: "boolean", default: false },
      size: { type: "string", default: "md" }
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
    stylesheet: STYLE12,
    template: ({ props }) => {
      const hasHeaderProps = Boolean(props.title) || Boolean(props.subtitle);
      const rawSize = String(props.size ?? "md").toLowerCase();
      const size = ["sm", "md", "lg"].includes(rawSize) ? rawSize : "md";
      const classes = [
        "card",
        `size-${size}`,
        props.bordered ? "bordered" : "",
        props.elevated ? "elevated" : "",
        // Padding is the default; only stamp `nopad` when the user
        // explicitly opted out. Defending against an undefined prop
        // means the body still has padding out of the box.
        props.padded === false ? "nopad" : "",
        hasHeaderProps ? "has-header" : ""
      ].filter(Boolean).join(" ");
      return html`
        <div class="${classes}">
          <div class="media"><slot name="media"></slot></div>
          <div class="head">
            <slot name="header">
              ${props.title ? html`
                  <div class="title">${props.title}</div>
                ` : ""} ${props.subtitle ? html`
                  <div class="subtitle">${props.subtitle}</div>
                ` : ""}
            </slot>
          </div>
          <div class="body"><slot></slot></div>
          <div class="foot"><slot name="footer"></slot></div>
        </div>
      `;
    },
    afterMount() {
      const host = this;
      const root = host.shadowRoot;
      if (!root)
        return;
      const card = root.querySelector(".card");
      if (!card)
        return;
      const occupied = (name) => {
        const sel = `slot[name="${name}"]`;
        const slot = root.querySelector(sel);
        if (!slot)
          return false;
        return slot.assignedNodes().some(
          (n) => n.nodeType === Node.ELEMENT_NODE || n.nodeType === Node.TEXT_NODE && (n.textContent ?? "").trim() !== ""
        );
      };
      const sync = () => {
        card.classList.toggle("has-header-slot", occupied("header"));
        card.classList.toggle("has-footer", occupied("footer"));
        card.classList.toggle("has-media", occupied("media"));
      };
      sync();
      const slots = Array.from(root.querySelectorAll("slot"));
      for (const s of slots)
        s.addEventListener("slotchange", sync);
      host._cardCleanup = () => {
        for (const s of slots)
          s.removeEventListener("slotchange", sync);
      };
    },
    unmount() {
      const host = this;
      host._cardCleanup?.();
    }
  })
);

// components/badge.ts
var TAG15 = "tc-badge";
var tagName15 = TAG15;
var STYLE13 = `
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
`;
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
    stylesheet: STYLE13,
    template: ({ props }) => html`
        <span class="badge v-${props.variant} s-${props.size} ${props.pill ? "pill" : ""}">
          <slot></slot>
        </span>
      `
  })
);

// components/skeleton.ts
var TAG16 = "tc-skeleton";
var tagName16 = TAG16;
var STYLE14 = `
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
`;
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
    stylesheet: STYLE14,
    template: ({ props }) => html`
        <span
          class="bone ${props.pulse ? "pulse" : ""} ${props.rounded ? "round" : ""}"
          aria-hidden="true"
          style="width: ${props.width}; height: ${props.height};"
        ></span>
      `
  })
);

// components/stack.ts
var TAG17 = "tc-stack";
var tagName17 = TAG17;
var STYLE15 = `
  .stack {
    display: flex;
    flex-direction: column;
    gap: var(--tc-stack-gap);
    align-items: var(--tc-stack-align);
  }
`;
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
    stylesheet: STYLE15,
    template: ({ props }) => html`
        <div
          class="stack"
          style="--tc-stack-gap: ${gapValue(
      props.gap
    )}; --tc-stack-align: ${props.align};"
        >
          <slot></slot>
        </div>
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
  const map2 = {
    "1": "4px",
    "2": "8px",
    "3": "12px",
    "4": "16px",
    "5": "24px",
    "6": "32px",
    "7": "48px",
    "8": "64px"
  };
  return map2[n] ?? "16px";
}

// components/cluster.ts
var TAG18 = "tc-cluster";
var tagName18 = TAG18;
var STYLE16 = `
  .cluster {
    display: flex;
    flex-direction: row;
    gap: var(--tc-cluster-gap);
    justify-content: var(--tc-cluster-justify);
    align-items: var(--tc-cluster-align);
    flex-wrap: var(--tc-cluster-wrap);
  }
`;
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
    stylesheet: STYLE16,
    template: ({ props }) => html`
        <div
          class="cluster"
          style="--tc-cluster-gap: ${gapValue2(props.gap)};
            --tc-cluster-justify: ${justifyValue(props.justify)};
            --tc-cluster-align: ${props.align};
            --tc-cluster-wrap: ${props.wrap ? "wrap" : "nowrap"};"
          >
            <slot></slot>
          </div>
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
  const map2 = {
    "1": "4px",
    "2": "8px",
    "3": "12px",
    "4": "16px",
    "5": "24px",
    "6": "32px",
    "7": "48px",
    "8": "64px"
  };
  return map2[n] ?? "12px";
}

// components/grid.ts
var TAG19 = "tc-grid";
var tagName19 = TAG19;
var STYLE17 = `
  .grid {
    display: grid;
    grid-template-columns: var(--tc-grid-template);
    gap: var(--tc-grid-gap);
  }
`;
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
    stylesheet: STYLE17,
    template: ({ props }) => {
      const cols = String(props.columns ?? "").trim();
      const template = cols ? `repeat(${escapeHtml(cols)}, minmax(0, 1fr))` : `repeat(auto-fit, minmax(${escapeHtml(props.min)}, 1fr))`;
      return html`
        <div
          class="grid"
          style="--tc-grid-template: ${unsafe(template)};
            --tc-grid-gap: ${gapValue3(props.gap)};"
          >
            <slot></slot>
          </div>
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
  const map2 = {
    "1": "4px",
    "2": "8px",
    "3": "12px",
    "4": "16px",
    "5": "24px",
    "6": "32px",
    "7": "48px",
    "8": "64px"
  };
  return map2[n] ?? "16px";
}

// components/code.ts
var TAG20 = "tc-code";
var tagName20 = TAG20;
var COPY_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
var CHECK_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
var STYLE18 = `
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
`;
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
    stylesheet: STYLE18,
    template: ({ props, state }) => {
      const label = props.filename || props.language || "";
      const copied = state.copied === true;
      return html`
        <div class="block">
          ${label || props.copy ? unsafe(`
            <header class="bar">
              <span class="label">${esc14(label)}</span>
              ${props.copy ? `<button type="button" class="copy" aria-label="Copy code">
                    <span class="copy-icon" aria-hidden="true">${copied ? CHECK_SVG : COPY_SVG}</span>
                    <span class="copy-text">${copied ? "Copied" : "Copy"}</span>
                  </button>` : ""}
            </header>
          `) : ""}
          <pre><code class="code lang-${String(
        props.language || "txt"
      )}"><slot></slot></code></pre>
        </div>
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
function esc14(s) {
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
var STYLE19 = `
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
`;
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
    stylesheet: STYLE19,
    template: ({ props }) => {
      const variant = String(props.variant ?? "note");
      const symbol = ICONS[variant] ?? ICONS.note;
      return html`
        <aside
          class="callout v-${variant} ${props.compact ? "compact" : ""}"
          role="${variant === "danger" ? "alert" : "note"}"
        >
          <span class="icon" aria-hidden="true">${unsafe(symbol)}</span>
          <div class="body">
            ${props.title ? html`
                <div class="title">${props.title}</div>
              ` : ""}
            <div class="content"><slot></slot></div>
          </div>
        </aside>
      `;
    }
  })
);

// components/toc.ts
var TAG22 = "tc-toc";
var tagName22 = TAG22;
var STATE = /* @__PURE__ */ new WeakMap();
var STYLE20 = `
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
`;
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
    stylesheet: STYLE20,
    template: ({ props, state }) => {
      const items = state.items ?? [];
      const active = state.activeId ?? "";
      return html`
        <nav
          class="toc${props.sticky ? " sticky" : ""}"
          aria-label="Table of contents"
        >
          ${props.label ? html`
              <div class="label">${props.label}</div>
            ` : ""} ${items.length === 0 ? unsafe(`<p class="empty">No sections yet.</p>`) : unsafe(
        `<ol class="list">${items.map(
          (it) => `<li class="lvl-${it.level}${it.id === active ? " active" : ""}"><a href="#${esc15(it.id)}">${esc15(it.text)}</a></li>`
        ).join("")}</ol>`
      )}
        </nav>
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
function esc15(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// components/pagination.ts
var TAG23 = "tc-pagination";
var tagName23 = TAG23;
var STYLE21 = `
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
`;
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
    stylesheet: STYLE21,
    template: ({ props }) => {
      const total = Math.max(1, Number(props.total) | 0);
      const current = clamp(Number(props.current) | 0, 1, total);
      const siblings = Math.max(0, Number(props.siblings) | 0);
      const boundaries = Math.max(0, Number(props.boundaries) | 0);
      if (total <= 1)
        return "";
      const items = buildPageList(current, total, siblings, boundaries);
      const size = esc16(String(props.size ?? "sm"));
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
      return html`
        <nav aria-label="${String(props.label ?? "Pagination")}">
          <tc-button
            class="prev"
            size="${unsafe(size)}"
            variant="ghost"
            data-page="${current - 1}"
            ${unsafe(prevDisabled)}
          >← ${String(props["prev-label"] ?? "Prev")}</tc-button>
          <span class="pages">${unsafe(pages)}</span>
          <tc-button
            class="next"
            size="${unsafe(size)}"
            variant="ghost"
            data-page="${current + 1}"
            ${unsafe(nextDisabled)}
          >${String(props["next-label"] ?? "Next")} →</tc-button>
        </nav>
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
function esc16(s) {
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
var STYLE22 = `
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
    stylesheet: STYLE22,
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
        (o) => `<span class="chip" data-value="${esc17(o.value)}">
              ${o.icon ? `<span class="chip-icon">${esc17(o.icon)}</span>` : ""}
              <span class="chip-label">${esc17(o.label)}</span>
              <button
                type="button"
                class="chip-remove"
                data-remove="${esc17(o.value)}"
                aria-label="Remove ${esc17(o.label)}"
                ${disabled ? "disabled" : ""}
              >&times;</button>
            </span>`
      ).join("") : "";
      const singleLabelHtml = showSingleLabel && selectedOpts[0] ? `<span class="single">
            ${selectedOpts[0].icon ? `<span class="single-icon">${esc17(selectedOpts[0].icon)}</span>` : ""}
            <span class="single-label">${esc17(selectedOpts[0].label)}</span>
          </span>` : "";
      const placeholderHtml = showPlaceholder ? `<span class="placeholder">${esc17(props.placeholder ?? "")}</span>` : "";
      const searchHtml = showSearch ? `<input
            type="text"
            class="search"
            part="search"
            value="${esc17(query)}"
            placeholder="${esc17(selected.length === 0 ? props.placeholder ?? "" : "")}"
            ${disabled ? "disabled" : ""}
            autocomplete="off"
            aria-autocomplete="list"
            aria-expanded="${isOpen ? "true" : "false"}"
            role="combobox"
          />` : "";
      const optionsHtml = filtered.length === 0 ? `<div class="empty">${esc17(props["empty-text"] ?? "No results")}</div>` : filtered.map((o, i) => {
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
              data-value="${esc17(o.value)}"
              data-index="${i}"
              aria-selected="${checked ? "true" : "false"}"
              ${o.disabled ? 'aria-disabled="true"' : ""}
            >
              ${multiple ? `<span class="check" aria-hidden="true">${checked ? "\u2713" : ""}</span>` : ""}
              ${o.icon ? `<span class="opt-icon">${esc17(o.icon)}</span>` : ""}
              <span class="opt-label">${esc17(o.label)}</span>
            </div>`;
      }).join("");
      const labelHtml = props.label ? `<label class="label">${esc17(props.label)}${props.required ? ' <span class="req" aria-hidden="true">*</span>' : ""}</label>` : "";
      const helperHtml = showError ? `<div class="helper error">${esc17(props.error)}</div>` : props.helper ? `<div class="helper">${esc17(props.helper)}</div>` : "";
      return html`
        ${unsafe(labelHtml)}
        <div
          class="control ${showError ? "invalid" : ""} ${isOpen ? "open" : ""} ${disabled ? "disabled" : ""}"
          part="control"
          tabindex="${disabled ? "-1" : "0"}"
          role="${searchable ? "presentation" : "combobox"}"
        >
          <div class="display">
            ${unsafe(chipsHtml)}${unsafe(singleLabelHtml)}${unsafe(
        placeholderHtml
      )}${unsafe(searchHtml)}
          </div>
          <span class="caret" aria-hidden="true">▾</span>
        </div>
        <div
          class="popup"
          part="popup"
          role="listbox"
          ${unsafe(multiple ? 'aria-multiselectable="true"' : "")}
          ${isOpen ? "" : "hidden"}
        >
          ${unsafe(optionsHtml)}
        </div>
        ${unsafe(helperHtml)}
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
function esc17(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// components/carousel.ts
var TAG25 = "tc-carousel";
var tagName25 = TAG25;
var STYLE23 = `
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
`;
function esc18(s) {
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
    stylesheet: STYLE23,
    template: ({ props }) => {
      const value = Number(props.value ?? 0);
      const vertical = String(props.orientation) === "vertical";
      const fade = String(props.transition) === "fade";
      const height = String(props.height ?? "");
      const showControls = !!props.controls;
      const showIndicators = !!props.indicators;
      const ariaLabel = esc18(props.ariaLabel ?? "Carousel");
      return html`
        <div
          class="root ${vertical ? "v" : "h"} ${fade ? "fade" : "slide"}"
          role="region"
          aria-roledescription="carousel"
          aria-label="${unsafe(ariaLabel)}"
          style="${unsafe(
        height ? `--tc-carousel-height: ${esc18(height)};` : ""
      )}--tc-carousel-index: ${value};"
        >
          <div class="viewport" part="viewport">
            <slot class="track" part="track"></slot>
          </div>
          ${unsafe(
        showControls ? `
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
          ` : ""
      )} ${unsafe(
        showIndicators ? `<div class="indicators" role="tablist" part="indicators"></div>` : ""
      )}
          <div class="sr-status" aria-live="polite" aria-atomic="true"></div>
        </div>
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
    let dots = "";
    for (let i = 0; i < total; i++) {
      dots += `<button type="button" class="dot" role="tab" data-index="${i}"
        aria-current="${i === current ? "true" : "false"}"
        aria-label="Go to slide ${i + 1}"></button>`;
    }
    indicators.innerHTML = dots;
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
var STYLE24 = `
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
        /* Only the top-level slotted node (\`details\`) is reachable from the
           shadow tree \u2014 \`::slotted()\` takes a compound selector, not a
           combinator. Everything that targets \`summary\` (a descendant of the
           slotted node) lives in the injected light-DOM sheet below; the
           --tc-accordion-* vars inherit into the light DOM from :host. */
        ::slotted(details) {
          background: transparent;
        }
`;
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
    stylesheet: STYLE24,
    template: ({ props }) => html`
        <div class="root ${props.bordered ? "bordered" : ""}">
          <slot></slot>
        </div>
      `,
    afterMount() {
      const host = this;
      injectLightStyles();
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
var LIGHT_STYLE_ID = "tc-accordion-light-styles";
function injectLightStyles() {
  if (typeof document === "undefined")
    return;
  if (document.getElementById(LIGHT_STYLE_ID))
    return;
  const style = document.createElement("style");
  style.id = LIGHT_STYLE_ID;
  style.textContent = `
    ${TAG26} details { background: transparent; }
    ${TAG26} details + details {
      border-top: 1px solid var(--tc-accordion-rule, #ece5d3);
    }
    ${TAG26} details > summary {
      cursor: pointer;
      list-style: none;
      padding: 14px 18px;
      font-weight: 600;
      font-size: 0.96rem;
      color: var(--tc-accordion-ink, #14171f);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      transition: background 0.15s ease;
    }
    ${TAG26} details > summary::-webkit-details-marker { display: none; }
    ${TAG26} details > summary::marker { content: ""; }
    ${TAG26} details > summary:hover { background: rgba(20, 23, 31, 0.03); }
    ${TAG26} details > summary:focus-visible {
      outline: 2px solid var(--tc-accordion-accent, #a16939);
      outline-offset: -2px;
    }
  `;
  (document.head || document.documentElement).appendChild(style);
}
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
var STYLE25 = `
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
`;
function esc19(s) {
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
    stylesheet: STYLE25,
    template: ({ props }) => html`
        <span class="trigger" tabindex="-1"><slot></slot></span>
        <div
          class="tip"
          popover="manual"
          role="tooltip"
          part="tip"
        >
          ${unsafe(
      props.text ? `<span class="tip-text">${esc19(props.text)}</span>` : ""
    )}
          <slot name="content"></slot>
        </div>
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
var STYLE26 = `
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
`;
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
    stylesheet: STYLE26,
    template: () => html`
        <span class="trigger-wrap"><slot name="trigger"></slot></span>
        <div
          class="panel"
          popover="manual"
          role="dialog"
          part="panel"
        >
          <slot></slot>
        </div>
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
var STYLE27 = `
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
`;
var DIALOG_LISTENERS2 = /* @__PURE__ */ new WeakMap();
function esc20(s) {
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
    stylesheet: STYLE27,
    template: ({ props }) => {
      const side = String(props.side ?? "right");
      const size = esc20(props.size ?? "min(420px, 92vw)");
      return html`
        <dialog
          class="dlg side-${side}"
          aria-labelledby="${props.title ? "title" : ""}"
          style="--tc-drawer-size: ${unsafe(size)};"
        >
          ${unsafe(
        props.title || props.dismissible ? `<header class="head">
                ${props.title ? `<h2 id="title" class="title">${esc20(props.title)}</h2>` : "<span></span>"}
                ${props.dismissible ? `<button class="x" type="button" aria-label="Close">\xD7</button>` : ""}
              </header>` : ""
      )}
          <div class="body"><slot></slot></div>
          <footer class="foot"><slot name="footer"></slot></footer>
        </dialog>
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
function esc21(s) {
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
        const ariaProps2 = indeterminate ? `role="progressbar" aria-valuetext="${esc21(labelText)}"` : `role="progressbar" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="${max}"`;
        return html`
          <div class="circ size-${size} ${indeterminate ? "indet" : ""}" ${unsafe(ariaProps2)}>
            <svg
              viewBox="0 0 ${dim} ${dim}"
              width="${dim}"
              height="${dim}"
              aria-hidden="true"
            >
              <circle
                class="track"
                cx="${dim / 2}"
                cy="${dim / 2}"
                r="${radius}"
                stroke-width="${stroke}"
                fill="none"
              />
              <circle
                class="fill"
                cx="${dim / 2}"
                cy="${dim / 2}"
                r="${radius}"
                stroke-width="${stroke}"
                fill="none"
                stroke-dasharray="${dash.toFixed(3)} ${(circ - dash).toFixed(
          3
        )}"
                stroke-dashoffset="${(circ / 4).toFixed(3)}"
                stroke-linecap="round"
              />
            </svg>
            ${unsafe(
          props.showLabel ? `<span class="label" aria-hidden="true">${esc21(labelText)}</span>` : ""
        )}
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
      const ariaProps = indeterminate ? `role="progressbar" aria-valuetext="${esc21(labelText)}"` : `role="progressbar" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="${max}"`;
      return html`
        <div class="bar size-${size} ${indeterminate ? "indet" : ""}" ${unsafe(
        ariaProps
      )}>
          <div class="track">
            <div class="fill" style="width: ${pct.toFixed(2)}%"></div>
          </div>
          ${unsafe(
        props.showLabel ? `<span class="label" aria-hidden="true">${esc21(labelText)}</span>` : ""
      )}
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
function esc22(s) {
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
                <span class="title">${esc22(s.title)}</span>
                ${s.description ? `<span class="desc">${esc22(s.description)}</span>` : ""}
              </span>
            </${clickable ? "button" : "div"}>
            ${i < steps.length - 1 ? `<span class="line ${i < active ? "done" : ""}" aria-hidden="true"></span>` : ""}
          </li>
        `;
      }).join("");
      return html`
        <ol class="root ${vertical ? "v" : "h"} ${clickable ? "clickable" : ""}" aria-label="Progress">
          ${unsafe(items)}
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
var STYLE28 = `
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
function esc23(s) {
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
    stylesheet: STYLE28,
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
        `<img src="${esc23(src)}" alt="${esc23(alt)}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'fallback',textContent:'${esc23(initials(name))}'}))">`
      ) : unsafe(
        `<span class="fallback" aria-label="${esc23(alt)}">${esc23(initials(name))}</span>`
      )} ${status ? unsafe(
        `<span class="status status-${esc23(status)}" aria-label="${esc23(status)}"></span>`
      ) : ""}
        </span>
      `;
    }
  })
);

// components/avatar-group.ts
var TAG33 = "tc-avatar-group";
var tagName33 = TAG33;
var STYLE29 = `
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
`;
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
    stylesheet: STYLE29,
    template: () => html`
        <span class="row"><slot></slot><span class="overflow" hidden></span></span>
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
      const ariaLabel = String(props.ariaLabel ?? "Rating");
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
      return html`
        <div
          class="root size-${size} ${readonly ? "readonly" : ""}"
          role="${readonly ? "img" : "slider"}"
          tabindex="${readonly ? "-1" : "0"}"
          aria-label="${ariaLabel}"
          aria-valuenow="${value}"
          aria-valuemin="0"
          aria-valuemax="${max}"
          aria-valuetext="${value} of ${max}"
        >
          ${unsafe(stars.join(""))}
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
var STYLE30 = `
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
`;
function esc24(s) {
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
    stylesheet: STYLE30,
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
      return html`
        ${unsafe(
        label || showValue ? `<div class="head">
              ${label ? `<label for="r" class="lbl">${esc24(label)}</label>` : "<span></span>"}
              ${showValue ? `<span class="val">${esc24(String(value))}${esc24(suffix)}</span>` : ""}
            </div>` : ""
      )}
        <div class="rail" style="--tc-slider-pct: ${pct.toFixed(2)}%;">
          <div class="track-bg"></div>
          <div class="track-fill"></div>
          ${unsafe(ticks)}
          <input
            id="r"
            class="range"
            type="range"
            min="${min}"
            max="${max}"
            step="${step}"
            value="${value}"
            ${unsafe(disabled ? "disabled" : "")}
            aria-valuetext="${String(value) + suffix}"
          />
        </div>
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
function esc25(s) {
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
          `<text class="axis-label y" x="${padLeft - 8}" y="${y}" text-anchor="end" dominant-baseline="middle">${esc25(fmt(t))}</text>`
        );
      }
      if (showLabels && labels.length > 0) {
        const stride = Math.max(1, Math.ceil(labels.length / 8));
        labels.forEach((lab, i) => {
          if (i % stride !== 0 && i !== labels.length - 1)
            return;
          chrome.push(
            `<text class="axis-label x" x="${xAt(i)}" y="${ctx.H - padBottom + 16}" text-anchor="middle">${esc25(lab)}</text>`
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
        const title = `${esc25(s.name)}${labels[i] ? ` \xB7 ${esc25(labels[i])}` : ""}: ${esc25(fmt(v))}`;
        const barDelay = (i * 0.04).toFixed(3);
        layers.push(
          `<g class="${cls}"><rect class="hit" x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="${color}" data-tip="${title}" data-color="${color}" style="animation-delay: ${barDelay}s"><title>${title}</title></rect>` + (showValues ? `<text class="value-label" x="${x + w / 2}" y="${y - 4}" text-anchor="middle">${esc25(fmt(v))}</text>` : "") + `</g>`
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
        const stackedDelay = (si * 0.15).toFixed(3);
        layers.push(
          `<path class="series-fill series-${si}" d="${fillPath}" fill="${color}" fill-opacity="0.25" pointer-events="none" style="animation-delay: ${stackedDelay}s"/>`
        );
        layers.push(
          `<path class="series-line series-${si}" d="${linePath(topPts, smooth)}" stroke="${color}" fill="none" pointer-events="none" style="animation-delay: ${stackedDelay}s"/>`
        );
        topPts.forEach((p, i) => {
          const v = s.values?.[i] ?? 0;
          const title = `${esc25(s.name)}${labels[i] ? ` \xB7 ${esc25(labels[i])}` : ""}: ${esc25(fmt(v))}`;
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
        const seriesDelay = (si * 0.15).toFixed(3);
        if (type === "area") {
          const baseY = yAt(yLo < 0 && yHi > 0 ? 0 : yLo);
          const fillPath = d + ` L ${pts[pts.length - 1].x} ${baseY} L ${pts[0].x} ${baseY} Z`;
          layers.push(
            `<path class="series-fill series-${si}" d="${fillPath}" fill="${color}" fill-opacity="0.25" style="animation-delay: ${seriesDelay}s"/>`
          );
        }
        layers.push(
          `<path class="series-line series-${si}" d="${d}" stroke="${color}" fill="none" style="animation-delay: ${seriesDelay}s"/>`
        );
        if (!sparkline) {
          pts.forEach((p, i) => {
            const v = s.values?.[i];
            const title = `${esc25(s.name)}${labels[i] ? ` \xB7 ${esc25(labels[i])}` : ""}: ${esc25(fmt(v ?? 0))}`;
            const pointDelay = (si * 0.15 + i * 0.025 + 0.55).toFixed(3);
            layers.push(
              `<circle class="series-point series-${si}" cx="${p.x}" cy="${p.y}" r="3.5" fill="${color}" pointer-events="none" style="animation-delay: ${pointDelay}s"/>`
            );
            layers.push(
              `<circle class="hit series-${si}" cx="${p.x}" cy="${p.y}" r="12" fill="transparent" data-tip="${title}" data-color="${color}"><title>${title}</title></circle>`
            );
            if (showValues) {
              layers.push(
                `<text class="value-label" x="${p.x}" y="${p.y - 8}" text-anchor="middle" pointer-events="none">${esc25(fmt(v ?? 0))}</text>`
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
    const title = `${esc25(s.name)}: ${esc25(fmt(value))} (${pct}%)`;
    const segDelay = (i * 0.08).toFixed(3);
    out.push(
      `<path class="series-segment hit series-${i}" d="${path}" fill="${color}" data-tip="${title}" data-color="${color}" style="animation-delay: ${segDelay}s"><title>${title}</title></path>`
    );
    if (ctx.showValues) {
      const mid = (start + end) / 2;
      const labelR = (r + inner) / 2;
      const p = polar(cx, cy, labelR, mid);
      out.push(
        `<text class="value-label donut" x="${p.x}" y="${p.y}" text-anchor="middle" dominant-baseline="middle">${esc25(pct)}%</text>`
      );
    }
    angle = end;
  });
  return out.join("");
}
function renderLegend(series, palette, hidden) {
  if (series.length === 0)
    return "";
  return `<div class="legend" part="legend">` + series.map((s, i) => {
    const color = colorFor(i, palette);
    const isHidden = hidden.includes(s.name);
    const cls = isHidden ? "legend-item is-hidden" : "legend-item";
    return `<button class="${cls}" type="button" data-series="${esc25(s.name)}" aria-pressed="${isHidden ? "true" : "false"}" title="${isHidden ? "Show" : "Hide"} series '${esc25(s.name)}'"><span class="swatch" style="background:${color}"></span>${esc25(s.name)}</button>`;
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
      gap: 6px 4px;
      margin-top: 14px;
      font-family: var(--tc-chart-font);
      font-size: 0.82rem;
      font-weight: 500;
      letter-spacing: -0.005em;
      color: var(--tc-chart-fg, var(--tc-color-ink, #14171f));
    }
    .legend-item {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 4px 9px;
      border-radius: 6px;
      cursor: pointer;
      user-select: none;
      transition: background 0.15s ease, opacity 0.15s ease;
      line-height: 1.3;
    }
    .legend-item:hover {
      background: color-mix(in srgb, var(--tc-chart-fg, currentColor) 7%, transparent);
    }
    .legend-item:focus-visible {
      outline: 2px solid var(--tc-color-accent, #a16939);
      outline-offset: 2px;
    }
    .legend-item.is-hidden {
      opacity: 0.45;
    }
    .legend-item.is-hidden .swatch {
      background: var(--tc-chart-grid, #ece5d3) !important;
    }
    .swatch {
      width: 10px;
      height: 10px;
      border-radius: 3px;
      flex: 0 0 auto;
      transition: background 0.15s ease;
    }

    /* Draw-in animations applied on every render where a data layer
       lands. animation-fill-mode forwards keeps the final state; hit
       elements remain at opacity 1 / scale 1 once finished. */
    .series-line,
    .series-fill {
      animation: tc-chart-draw 0.9s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      stroke-dasharray: 3000;
      stroke-dashoffset: 3000;
    }
    .series-fill {
      animation-name: tc-chart-fade-in;
      animation-duration: 0.7s;
      stroke-dasharray: none;
      stroke-dashoffset: 0;
      opacity: 0;
    }
    .series-point {
      animation: tc-chart-pop 0.45s cubic-bezier(0.4, 0, 0.2, 1) backwards;
      opacity: 0;
    }
    rect.hit {
      transform-origin: center bottom;
      transform-box: fill-box;
      animation: tc-chart-bar-grow 0.55s cubic-bezier(0.4, 0, 0.2, 1) backwards;
    }
    .series-segment.hit {
      animation: tc-chart-segment-in 0.55s cubic-bezier(0.4, 0, 0.2, 1) backwards;
      transform-origin: center;
      transform-box: view-box;
    }
    @keyframes tc-chart-draw {
      to { stroke-dashoffset: 0; }
    }
    @keyframes tc-chart-fade-in {
      to { opacity: 1; }
    }
    @keyframes tc-chart-pop {
      0%   { opacity: 0; transform: scale(0.4); transform-origin: center; transform-box: fill-box; }
      70%  { opacity: 1; transform: scale(1.15); transform-origin: center; transform-box: fill-box; }
      100% { opacity: 1; transform: scale(1); transform-origin: center; transform-box: fill-box; }
    }
    @keyframes tc-chart-bar-grow {
      from { transform: scaleY(0); }
      to   { transform: scaleY(1); }
    }
    @keyframes tc-chart-segment-in {
      from { opacity: 0; transform: scale(0.85); }
      to   { opacity: 1; transform: scale(1); }
    }

    @media (prefers-reduced-motion: reduce) {
      .series-point, .series-segment { transition: none; }
      .series-line, .series-fill, .series-point, rect.hit, .series-segment.hit {
        animation: none;
        stroke-dashoffset: 0 !important;
        opacity: 1 !important;
        transform: none !important;
      }
    }
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
    stylesheet: CHART_STYLE,
    template: ({ props, state }) => {
      const rawType = String(props.type ?? "line").toLowerCase();
      const type = ["line", "area", "bar", "sparkline", "donut"].includes(rawType) ? rawType : "line";
      const explicitData = props.data;
      const fetchedData = state.fetched;
      const hasExplicit = !!explicitData && Array.isArray(explicitData.series) && explicitData.series.length > 0;
      const fullData = hasExplicit ? explicitData : fetchedData ?? { series: [] };
      const hidden = Array.isArray(state.hiddenSeries) ? state.hiddenSeries : [];
      const data = {
        labels: fullData.labels,
        series: (fullData.series ?? []).filter((s) => !hidden.includes(s.name))
      };
      const src = String(props.src ?? "");
      const loading = !!state.loading && !hasExplicit && !fetchedData;
      const error = src && state.error ? String(state.error) : "";
      const stateOverlay = loading ? `<div class="overlay loading">${esc25(String(props.loadingText ?? "Loading chart\u2026"))}</div>` : error ? `<div class="overlay error" role="alert">${esc25(String(props.errorText ?? "Couldn't load chart data"))}<small>${esc25(error)}</small></div>` : "";
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
      const height = esc25(String(props.height ?? "240px"));
      return html`
        <div class="root" role="img" aria-label="${props.ariaLabel ?? "Chart"}">
          <div class="canvas" style="height:${unsafe(height)};">
            <svg
              viewBox="0 0 ${W} ${H}"
              preserveAspectRatio="${isDonut ? "xMidYMid meet" : "none"}"
              aria-hidden="true"
            >
              ${unsafe(body)}
            </svg>
            <div class="tip" role="tooltip">
              <span class="tip-swatch"></span><span class="tip-text"></span>
            </div>
            ${unsafe(stateOverlay)}
          </div>
          ${props.showLegend && !isSparkline && fullData.series && fullData.series.length > 0 ? unsafe(renderLegend(fullData.series, palette, hidden)) : ""}
          <span
            class="visually-hidden"
            style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;"
          >${desc}</span>
        </div>
      `;
    },
    events: {
      "click .legend-item": (e, ctx) => {
        const target = e.target?.closest(".legend-item");
        if (!target)
          return;
        const name = target.dataset.series;
        if (!name)
          return;
        const cur = ctx.getState("hiddenSeries") ?? [];
        const next = cur.includes(name) ? cur.filter((n) => n !== name) : [...cur, name];
        ctx.setState("hiddenSeries", next);
      },
      "keydown .legend-item": (e, ctx) => {
        const ev = e;
        if (ev.key !== "Enter" && ev.key !== " ")
          return;
        ev.preventDefault();
        const target = ev.target.closest(".legend-item");
        const name = target?.dataset.series;
        if (!name)
          return;
        const cur = ctx.getState("hiddenSeries") ?? [];
        const next = cur.includes(name) ? cur.filter((n) => n !== name) : [...cur, name];
        ctx.setState("hiddenSeries", next);
      }
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

// components/editor.ts
var TAG37 = "tc-editor";
var tagName37 = TAG37;
function esc26(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
var ICON = {
  bold: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h7a4 4 0 0 1 0 8H6z"/><path d="M6 12h8a4 4 0 0 1 0 8H6z"/></svg>`,
  italic: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg>`,
  underline: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3v8a6 6 0 0 0 12 0V3"/><line x1="4" y1="21" x2="20" y2="21"/></svg>`,
  strike: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4H9a3 3 0 0 0-2.83 4"/><path d="M14 12a4 4 0 0 1 0 8H6"/><line x1="4" y1="12" x2="20" y2="12"/></svg>`,
  h1: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6v12"/><path d="M12 6v12"/><path d="M4 12h8"/><path d="M17 18v-7l-2 2"/></svg>`,
  h2: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6v12"/><path d="M12 6v12"/><path d="M4 12h8"/><path d="M16 18h5"/><path d="M16 15c0-2 2.5-2 2.5-2s2.5 0 2.5 2-3 4-5 5"/></svg>`,
  h3: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6v12"/><path d="M12 6v12"/><path d="M4 12h8"/><path d="M16 11h5l-3 3a2.5 2.5 0 1 1-2 4"/></svg>`,
  paragraph: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 4v16"/><path d="M19 4v16"/><path d="M19 4h-6a5 5 0 0 0 0 10h0"/></svg>`,
  bullet: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1.2" fill="currentColor"/><circle cx="4" cy="12" r="1.2" fill="currentColor"/><circle cx="4" cy="18" r="1.2" fill="currentColor"/></svg>`,
  ordered: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><path d="M4 8V4l-1 1"/><path d="M3 14h2l-2 3h2"/><path d="M3 20l1-1h1l1 1"/></svg>`,
  quote: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21c0-7 7-12 14-12"/><path d="M7 7h3v6H4v-3a3 3 0 0 1 3-3z"/><path d="M16 7h3v6h-6v-3a3 3 0 0 1 3-3z"/></svg>`,
  code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
  unlink: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18.84 12.25l1.72-1.71a5 5 0 0 0-7.07-7.07L11.5 5"/><path d="M5.16 11.75l-1.72 1.71a5 5 0 0 0 7.07 7.07L12.5 19"/><line x1="2" y1="2" x2="22" y2="22"/></svg>`,
  undo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 7 3 13 9 13"/><path d="M21 17a8 8 0 0 0-15-3"/></svg>`,
  redo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="21 7 21 13 15 13"/><path d="M3 17a8 8 0 0 1 15-3"/></svg>`,
  math: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h6l4 14h6"/><path d="M4 19l4-7-3-4"/></svg>`,
  codeblock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><polyline points="9 9 7 12 9 15"/><polyline points="15 9 17 12 15 15"/></svg>`
};
var DEFAULT_TOOLBAR = "bold,italic,underline,strike,|,h1,h2,h3,paragraph,|,bullet,ordered,quote,code,codeblock,|,link,unlink,math,|,undo,redo";
var TOOLBAR_REGISTRY = {
  bold: {
    key: "bold",
    label: "Bold",
    icon: ICON.bold,
    command: "bold",
    shortcut: "\u2318B"
  },
  italic: {
    key: "italic",
    label: "Italic",
    icon: ICON.italic,
    command: "italic",
    shortcut: "\u2318I"
  },
  underline: {
    key: "underline",
    label: "Underline",
    icon: ICON.underline,
    command: "underline",
    shortcut: "\u2318U"
  },
  strike: {
    key: "strike",
    label: "Strikethrough",
    icon: ICON.strike,
    command: "strikeThrough"
  },
  h1: {
    key: "h1",
    label: "Heading 1",
    icon: ICON.h1,
    command: "formatBlock",
    value: "h1"
  },
  h2: {
    key: "h2",
    label: "Heading 2",
    icon: ICON.h2,
    command: "formatBlock",
    value: "h2"
  },
  h3: {
    key: "h3",
    label: "Heading 3",
    icon: ICON.h3,
    command: "formatBlock",
    value: "h3"
  },
  paragraph: {
    key: "paragraph",
    label: "Paragraph",
    icon: ICON.paragraph,
    command: "formatBlock",
    value: "p"
  },
  bullet: {
    key: "bullet",
    label: "Bulleted list",
    icon: ICON.bullet,
    command: "insertUnorderedList"
  },
  ordered: {
    key: "ordered",
    label: "Ordered list",
    icon: ICON.ordered,
    command: "insertOrderedList"
  },
  quote: {
    key: "quote",
    label: "Blockquote",
    icon: ICON.quote,
    command: "formatBlock",
    value: "blockquote"
  },
  code: {
    key: "code",
    label: "Inline code",
    icon: ICON.code,
    command: "code"
  },
  link: {
    key: "link",
    label: "Insert link",
    icon: ICON.link,
    command: "link",
    shortcut: "\u2318K"
  },
  unlink: {
    key: "unlink",
    label: "Remove link",
    icon: ICON.unlink,
    command: "unlink"
  },
  undo: {
    key: "undo",
    label: "Undo",
    icon: ICON.undo,
    command: "undo",
    shortcut: "\u2318Z"
  },
  redo: {
    key: "redo",
    label: "Redo",
    icon: ICON.redo,
    command: "redo",
    shortcut: "\u2318\u21E7Z"
  },
  math: {
    key: "math",
    label: "Insert math (LaTeX)",
    icon: ICON.math,
    command: "math"
  },
  codeblock: {
    key: "codeblock",
    label: "Code block",
    icon: ICON.codeblock,
    command: "codeblock"
  }
};
var STYLE31 = `
    :host {
      display: block;
      font-family: var(--tc-editor-font, var(--tc-font-sans, "Inter", system-ui, sans-serif));
      color: var(--tc-editor-fg, var(--tc-color-ink, #14171f));
    }
    .root {
      border: 1px solid var(--tc-editor-rule, var(--tc-color-rule, #ece5d3));
      border-radius: var(--tc-editor-radius, var(--tc-radius-md, 8px));
      background: var(--tc-editor-bg, var(--tc-color-surface, #ffffff));
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 2px;
      padding: 6px;
      background: var(--tc-editor-toolbar-bg, var(--tc-color-bg, #faf8f3));
      border-bottom: 1px solid var(--tc-editor-toolbar-rule, var(--tc-color-rule, #ece5d3));
      align-items: center;
    }
    .toolbar.readonly { opacity: 0.55; pointer-events: none; }
    .toolbar.empty { display: none; }
    .tb-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      padding: 0;
      border: none;
      background: transparent;
      color: var(--tc-editor-toolbar-fg, var(--tc-color-ink-soft, #4a5061));
      border-radius: 5px;
      cursor: pointer;
      transition: background 0.12s ease, color 0.12s ease;
    }
    .tb-btn svg { width: 16px; height: 16px; display: block; }
    .tb-btn:hover {
      background: var(--tc-editor-toolbar-hover-bg, rgba(20, 23, 31, 0.06));
      color: var(--tc-color-ink, #14171f);
    }
    .tb-btn:focus-visible {
      outline: 2px solid var(--tc-color-accent, #a16939);
      outline-offset: 1px;
    }
    .tb-btn.is-active {
      background: var(--tc-editor-toolbar-active-bg, var(--tc-color-accent-soft, #efe2cf));
      color: var(--tc-color-accent-hover, #8a572d);
    }
    .tb-sep {
      width: 1px;
      align-self: stretch;
      margin: 4px 4px;
      background: var(--tc-editor-toolbar-rule, var(--tc-color-rule, #ece5d3));
    }
    .surface {
      padding: 14px 18px;
      min-height: var(--tc-editor-min-height, 180px);
      max-height: var(--tc-editor-max-height, none);
      overflow-y: auto;
      outline: none;
      line-height: var(--tc-editor-line-height, 1.6);
      cursor: text;
    }
    .surface[data-empty="true"]::before {
      content: attr(data-placeholder);
      color: var(--tc-editor-placeholder, var(--tc-color-ink-muted, #6b7280));
      pointer-events: none;
      display: block;
    }
    .surface > * { margin-top: 0; }
    .surface > * + * { margin-top: 0.6em; }
    .surface h1 { font-size: 1.6rem; font-weight: 700; letter-spacing: -0.02em; line-height: 1.25; }
    .surface h2 { font-size: 1.3rem; font-weight: 700; letter-spacing: -0.015em; line-height: 1.3; }
    .surface h3 { font-size: 1.1rem; font-weight: 600; line-height: 1.35; }
    .surface blockquote {
      margin: 0;
      padding-left: 14px;
      border-left: 3px solid var(--tc-color-accent, #a16939);
      color: var(--tc-color-ink-soft, #4a5061);
    }
    .surface code, .surface .tc-code-inline {
      font-family: var(--tc-editor-mono-font, var(--tc-font-mono, "JetBrains Mono", monospace));
      background: var(--tc-color-accent-soft, #efe2cf);
      color: var(--tc-color-accent-hover, #8a572d);
      padding: 1px 6px;
      border-radius: 4px;
      font-size: 0.92em;
    }
    .surface pre {
      background: #14171f;
      color: #f5f5f5;
      padding: 12px 14px;
      border-radius: 6px;
      overflow-x: auto;
      font-family: var(--tc-editor-mono-font, var(--tc-font-mono, monospace));
      font-size: 0.86rem;
      line-height: 1.5;
    }
    .surface a { color: var(--tc-color-accent, #a16939); text-decoration: underline; }
    .surface ul, .surface ol { padding-left: 1.4em; margin: 0; }
    .surface li + li { margin-top: 0.3em; }

    /* Math nodes are atomic \u2014 contenteditable="false" so the caret
       steps over them; the visual style differentiates rendered vs
       fallback (missing renderer) so the integration gap is obvious. */
    .surface .tc-math {
      display: inline-block;
      padding: 0 2px;
    }
    .surface .tc-math.display {
      display: block;
      margin: 8px 0;
      text-align: center;
    }
    .surface .tc-math:hover {
      outline: 1px dashed var(--tc-color-accent, #a16939);
      outline-offset: 2px;
      border-radius: 2px;
    }
    .surface .tc-math .tc-math-src {
      background: var(--tc-color-accent-soft, #efe2cf);
      color: var(--tc-color-accent-hover, #8a572d);
      padding: 1px 6px;
      border-radius: 4px;
      font-family: var(--tc-editor-mono-font);
      font-size: 0.92em;
    }
    .surface .tc-math.display .tc-math-src {
      display: block;
      padding: 6px 10px;
    }

    ::slotted([slot="toolbar-extra"]) { display: contents; }
`;
build(
  TAG37,
  describe({
    props: {
      value: { type: "string", default: "" },
      placeholder: { type: "string", default: "Start writing\u2026" },
      toolbar: { type: "string", default: DEFAULT_TOOLBAR },
      readonly: { type: "boolean", default: false, reflect: true },
      minHeight: { type: "string", default: "180px" },
      maxHeight: { type: "string", default: "" },
      pasteAs: { type: "string", default: "text" }
    },
    theme: {
      "tc-editor-bg": "var(--tc-color-surface, #ffffff)",
      "tc-editor-fg": "var(--tc-color-ink, #14171f)",
      "tc-editor-rule": "var(--tc-color-rule, #ece5d3)",
      "tc-editor-toolbar-bg": "var(--tc-color-bg, #faf8f3)",
      "tc-editor-toolbar-rule": "var(--tc-color-rule, #ece5d3)",
      "tc-editor-toolbar-fg": "var(--tc-color-ink-soft, #4a5061)",
      "tc-editor-toolbar-active-bg": "var(--tc-color-accent-soft, #efe2cf)",
      "tc-editor-toolbar-hover-bg": "rgba(20, 23, 31, 0.06)",
      "tc-editor-placeholder": "var(--tc-color-ink-muted, #6b7280)",
      "tc-editor-radius": "var(--tc-radius-md, 8px)",
      "tc-editor-font": "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
      "tc-editor-mono-font": "var(--tc-font-mono, 'JetBrains Mono', ui-monospace, 'SF Mono', monospace)",
      "tc-editor-line-height": "1.6"
    },
    styles: { display: "block" },
    stylesheet: STYLE31,
    template: ({ props }) => {
      const toolbar = String(props.toolbar ?? DEFAULT_TOOLBAR);
      const readonly = !!props.readonly;
      const minHeight = esc26(String(props.minHeight ?? "180px"));
      const maxHeight = String(props.maxHeight ?? "").trim();
      const items = toolbar.split(",").map((k) => k.trim()).filter(Boolean);
      const buttons = items.map((key) => {
        if (key === "|") {
          return `<span class="tb-sep" aria-hidden="true"></span>`;
        }
        const t = TOOLBAR_REGISTRY[key];
        if (!t)
          return "";
        const sc = t.shortcut ? ` (${esc26(t.shortcut)})` : "";
        return `<button type="button" class="tb-btn" data-cmd="${esc26(t.command)}"${t.value ? ` data-val="${esc26(t.value)}"` : ""} data-key="${esc26(t.key)}" title="${esc26(t.label)}${sc}" aria-label="${esc26(t.label)}">${t.icon}</button>`;
      }).join("");
      const toolbarCls = items.length === 0 ? "toolbar empty" : readonly ? "toolbar readonly" : "toolbar";
      const styleVars = `--tc-editor-min-height: ${minHeight};${maxHeight ? `--tc-editor-max-height: ${esc26(maxHeight)};` : ""}`;
      return html`
        <div class="root" style="${unsafe(styleVars)}">
          <div class="${toolbarCls}" role="toolbar" aria-label="Formatting">
            ${unsafe(buttons)}
            <slot name="toolbar-extra"></slot>
          </div>
          <div
            class="surface"
            contenteditable="${readonly ? "false" : "true"}"
            data-placeholder="${props.placeholder ?? ""}"
            role="textbox"
            aria-multiline="true"
            spellcheck="true"
          >
          </div>
        </div>
      `;
    },
    afterMount() {
      installEditor(this);
      renderMathInSurface(this);
    },
    afterRender() {
      const host = this;
      const root = host.shadowRoot;
      const surface = root?.querySelector(".surface");
      if (surface) {
        const current = surface.innerHTML;
        const incoming = String(host.value ?? "");
        if (incoming && current !== incoming && document.activeElement !== host) {
          surface.innerHTML = incoming;
        }
        updateEmptyState(surface);
      }
      installEditor(host);
      renderMathInSurface(host);
    },
    unmount() {
      const host = this;
      host._editorCleanup?.();
    }
  })
);
function updateEmptyState(surface) {
  const isEmpty = surface.textContent?.trim() === "" && surface.querySelector("img, hr, br") === null;
  surface.dataset.empty = isEmpty ? "true" : "false";
}
function installEditor(rawHost) {
  const host = rawHost;
  host._editorCleanup?.();
  const root = host.shadowRoot;
  if (!root)
    return;
  const surface = root.querySelector(".surface");
  if (!surface)
    return;
  if (!surface.dataset.bootstrapped) {
    if (host.value)
      surface.innerHTML = String(host.value);
    surface.dataset.bootstrapped = "1";
  }
  updateEmptyState(surface);
  const runCommand = (cmd, value) => {
    if (host.readonly)
      return;
    surface.focus();
    if (cmd === "code") {
      const shadowRoot = root;
      const sel = shadowRoot.getSelection?.() ?? globalThis.getSelection();
      if (!sel || sel.rangeCount === 0)
        return;
      const range = sel.getRangeAt(0);
      const content = range.extractContents();
      const codeEl = document.createElement("code");
      codeEl.className = "tc-code-inline";
      codeEl.appendChild(content);
      range.insertNode(codeEl);
      range.selectNodeContents(codeEl);
      sel.removeAllRanges();
      sel.addRange(range);
    } else if (cmd === "link") {
      const url = globalThis.prompt("URL")?.trim();
      if (!url)
        return;
      document.execCommand("createLink", false, url);
    } else if (cmd === "math") {
      const latex = globalThis.prompt(
        "LaTeX (e.g. E = mc^2). Wrap with $$ for display."
      )?.trim();
      if (!latex)
        return;
      const isDisplay = latex.startsWith("$$") && latex.endsWith("$$");
      const clean = isDisplay ? latex.replace(/^\$\$|\$\$$/g, "").trim() : latex;
      insertMath(host, clean, isDisplay);
    } else if (cmd === "codeblock") {
      const sel = root.getSelection?.() ?? globalThis.getSelection();
      if (!sel || sel.rangeCount === 0)
        return;
      const range = sel.getRangeAt(0);
      const text = range.toString() || "// code";
      const pre = document.createElement("pre");
      const code = document.createElement("code");
      code.textContent = text;
      pre.appendChild(code);
      range.deleteContents();
      range.insertNode(pre);
      const newRange = document.createRange();
      newRange.selectNodeContents(code);
      newRange.collapse(false);
      sel.removeAllRanges();
      sel.addRange(newRange);
    } else if (cmd === "formatBlock") {
      document.execCommand("formatBlock", false, `<${value ?? "p"}>`);
    } else {
      document.execCommand(cmd, false, value);
    }
    emitInput(host, surface);
    updateActive(root, surface);
  };
  const onToolbarClick = (e) => {
    const target = e.target?.closest?.(".tb-btn");
    if (!target)
      return;
    e.preventDefault();
    const cmd = target.dataset.cmd;
    if (!cmd)
      return;
    runCommand(cmd, target.dataset.val);
  };
  const onInput = () => {
    updateEmptyState(surface);
    emitInput(host, surface);
  };
  const onBlur = () => {
    const html2 = surface.innerHTML;
    if (host._lastEmitted !== html2) {
      host._lastEmitted = html2;
      host.dispatchEvent(
        new CustomEvent("tc-change", {
          detail: { html: html2 },
          bubbles: true,
          composed: true
        })
      );
    }
  };
  const onPaste = (e) => {
    if (host.readonly)
      return;
    if (host.pasteAs !== "text")
      return;
    e.preventDefault();
    const text = e.clipboardData?.getData("text/plain") ?? "";
    document.execCommand("insertText", false, text);
  };
  const onKeyDown = (e) => {
    if (host.readonly)
      return;
    if (!(e.metaKey || e.ctrlKey))
      return;
    const k = e.key.toLowerCase();
    if (k === "b") {
      e.preventDefault();
      runCommand("bold");
    } else if (k === "i") {
      e.preventDefault();
      runCommand("italic");
    } else if (k === "u") {
      e.preventDefault();
      runCommand("underline");
    } else if (k === "k") {
      e.preventDefault();
      runCommand("link");
    }
  };
  const onSelectionChange = () => {
    const sel = globalThis.getSelection();
    if (!sel || !sel.anchorNode)
      return;
    if (!surface.contains(sel.anchorNode))
      return;
    updateActive(root, surface);
  };
  const toolbar = root.querySelector(".toolbar");
  toolbar?.addEventListener("click", onToolbarClick);
  surface.addEventListener("input", onInput);
  surface.addEventListener("blur", onBlur);
  surface.addEventListener("paste", onPaste);
  surface.addEventListener("keydown", onKeyDown);
  document.addEventListener("selectionchange", onSelectionChange);
  host._editorCleanup = () => {
    toolbar?.removeEventListener("click", onToolbarClick);
    surface.removeEventListener("input", onInput);
    surface.removeEventListener("blur", onBlur);
    surface.removeEventListener("paste", onPaste);
    surface.removeEventListener("keydown", onKeyDown);
    document.removeEventListener("selectionchange", onSelectionChange);
  };
}
function emitInput(host, surface) {
  const html2 = surface.innerHTML;
  host.value = html2;
  host.dispatchEvent(
    new CustomEvent("tc-input", {
      detail: { html: html2 },
      bubbles: true,
      composed: true
    })
  );
}
function insertMath(host, latex, display) {
  const root = host.shadowRoot;
  if (!root)
    return;
  const surface = root.querySelector(".surface");
  if (!surface)
    return;
  const sel = root.getSelection?.() ?? globalThis.getSelection();
  if (!sel || sel.rangeCount === 0)
    return;
  const range = sel.getRangeAt(0);
  const wrap = document.createElement(display ? "div" : "span");
  wrap.className = display ? "tc-math display" : "tc-math inline";
  wrap.setAttribute("contenteditable", "false");
  wrap.dataset.latex = latex;
  wrap.innerHTML = renderMathHtml(host, latex, display);
  range.deleteContents();
  range.insertNode(wrap);
  const spacer = document.createTextNode("\u200B");
  wrap.parentNode?.insertBefore(spacer, wrap.nextSibling);
  const after = document.createRange();
  after.setStartAfter(spacer);
  after.collapse(true);
  sel.removeAllRanges();
  sel.addRange(after);
  host.dispatchEvent(
    new CustomEvent("tc-input", {
      detail: { html: surface.innerHTML },
      bubbles: true,
      composed: true
    })
  );
}
function renderMathHtml(host, latex, display) {
  if (host.mathRenderer) {
    try {
      return host.mathRenderer(latex, display);
    } catch {
    }
  }
  return `<code class="tc-math-src">${latex.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code>`;
}
function renderMathInSurface(host) {
  const root = host.shadowRoot;
  if (!root)
    return;
  const surface = root.querySelector(".surface");
  if (!surface)
    return;
  const nodes = surface.querySelectorAll(".tc-math");
  nodes.forEach((n) => {
    const el = n;
    const latex = el.dataset.latex ?? "";
    const display = el.classList.contains("display");
    const stamp = `${display ? "d" : "i"}:${latex}`;
    if (el.dataset.stamp === stamp)
      return;
    el.innerHTML = renderMathHtml(host, latex, display);
    el.dataset.stamp = stamp;
  });
}
function updateActive(root, _surface) {
  const buttons = root.querySelectorAll(".tb-btn");
  buttons.forEach((btn) => {
    const el = btn;
    const cmd = el.dataset.cmd ?? "";
    const val = el.dataset.val;
    let active = false;
    try {
      if (cmd === "formatBlock" && val) {
        const block = document.queryCommandValue("formatBlock") || "";
        active = block.toLowerCase().replace(/^[<]|[>]$/g, "") === val;
      } else if (cmd === "bold" || cmd === "italic" || cmd === "underline" || cmd === "strikeThrough" || cmd === "insertOrderedList" || cmd === "insertUnorderedList") {
        active = document.queryCommandState(cmd);
      }
    } catch {
      active = false;
    }
    el.classList.toggle("is-active", active);
  });
}

// components/markdown.ts
var TAG38 = "tc-markdown";
var tagName38 = TAG38;
function escHtml(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
var MATH_MARK = "\0M\0";
function inline(src, mathRenderer) {
  const math = [];
  const stash = (latex, display) => {
    const idx = math.length;
    math.push({ latex, display });
    return `${MATH_MARK}${idx}${MATH_MARK}`;
  };
  let work = src;
  work = work.replace(/\$\$([\s\S]+?)\$\$/g, (_m, l) => stash(l.trim(), true));
  work = work.replace(
    /(^|[\s(])\$([^\$\n][^\$\n]*?)\$(?=[\s.,;:!?)\]]|$)/g,
    (_m, before, l) => `${before}${stash(l.trim(), false)}`
  );
  let out = escHtml(work);
  out = out.replace(/`([^`]+)`/g, "<code>$1</code>");
  out = out.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/(?<!\*)\*([^*\n]+?)\*(?!\*)/g, "<em>$1</em>");
  out = out.replace(/\b_(.+?)_\b/g, "<em>$1</em>");
  out = out.replace(/~~(.+?)~~/g, "<del>$1</del>");
  out = out.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    (_m, alt, url) => `<img src="${escHtml(url)}" alt="${escHtml(alt)}" loading="lazy"/>`
  );
  out = out.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_m, label, url) => `<a href="${escHtml(url)}" target="_blank" rel="noopener">${label}</a>`
  );
  out = out.replace(
    new RegExp(`${MATH_MARK}(\\d+)${MATH_MARK}`, "g"),
    (_m, idx) => {
      const m = math[Number(idx)];
      if (!m)
        return "";
      const latex = m.latex;
      if (mathRenderer) {
        try {
          const rendered = mathRenderer(latex, m.display);
          return m.display ? `<div class="tc-md-math display" data-latex="${escHtml(latex)}">${rendered}</div>` : `<span class="tc-md-math inline" data-latex="${escHtml(latex)}">${rendered}</span>`;
        } catch (err) {
          return m.display ? `<div class="tc-md-math error" title="${escHtml(String(err))}">${escHtml(latex)}</div>` : `<span class="tc-md-math error" title="${escHtml(String(err))}">${escHtml(latex)}</span>`;
        }
      }
      return m.display ? `<div class="tc-md-math fallback display" data-latex="${escHtml(latex)}"><code>${escHtml(latex)}</code></div>` : `<span class="tc-md-math fallback inline" data-latex="${escHtml(latex)}"><code>${escHtml(latex)}</code></span>`;
    }
  );
  return out;
}
function renderTaskItem(content) {
  const m = content.match(/^\[([ xX])\]\s+(.*)$/);
  if (!m)
    return "";
  const checked = m[1].toLowerCase() === "x";
  return `<li class="tc-md-task"><input type="checkbox" disabled${checked ? " checked" : ""}/><span>${m[2]}</span></li>`;
}
function renderTable(rows, align) {
  const cell = (raw, tag, a) => {
    const styled = a && a !== "left" ? ` style="text-align:${a}"` : "";
    return `<${tag}${styled}>${raw}</${tag}>`;
  };
  const head = rows[0]?.map((c, i) => cell(c, "th", align[i])).join("") ?? "";
  const body = rows.slice(1).map(
    (r) => `<tr>${r.map((c, i) => cell(c, "td", align[i])).join("")}</tr>`
  ).join("");
  return `<table class="tc-md-table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}
function renderMarkdown(src, options) {
  const mathRenderer = options?.mathRenderer;
  const highlight = options?.highlight;
  const lines = src.replace(/\r\n?/g, "\n").split("\n");
  const out = [];
  let i = 0;
  const inlineWith = (s) => inline(s, mathRenderer);
  while (i < lines.length) {
    const line = lines[i];
    const callout = line.match(
      /^:::\s*([a-zA-Z][\w-]*)(?:\s+(.+))?\s*$/
    );
    if (callout) {
      const variant = callout[1].toLowerCase();
      const title = (callout[2] ?? "").trim();
      const buf2 = [];
      i++;
      while (i < lines.length && !/^:::\s*$/.test(lines[i])) {
        buf2.push(lines[i]);
        i++;
      }
      if (i < lines.length)
        i++;
      const inner = renderMarkdown(buf2.join("\n"), options);
      out.push(
        `<div class="tc-md-callout v-${escHtml(variant)}" role="${variant === "danger" ? "alert" : "note"}">${title ? `<div class="callout-title">${inlineWith(title)}</div>` : ""}<div class="callout-body">${inner}</div></div>`
      );
      continue;
    }
    const fence = line.match(/^```(\S*)\s*$/);
    if (fence) {
      const lang = fence[1] ?? "";
      const buf2 = [];
      i++;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) {
        buf2.push(lines[i]);
        i++;
      }
      if (i < lines.length)
        i++;
      const code = buf2.join("\n");
      const highlighted = highlight && lang ? (() => {
        try {
          return highlight(code, lang);
        } catch {
          return escHtml(code);
        }
      })() : escHtml(code);
      const cls = lang ? ` class="lang-${escHtml(lang)}"` : "";
      out.push(`<pre><code${cls}>${highlighted}</code></pre>`);
      continue;
    }
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      const n = h[1].length;
      out.push(`<h${n}>${inlineWith(h[2])}</h${n}>`);
      i++;
      continue;
    }
    if (/^(?:-\s*){3,}$|^(?:\*\s*){3,}$|^(?:_\s*){3,}$/.test(line.trim())) {
      out.push("<hr/>");
      i++;
      continue;
    }
    if (/^\s*\|.+\|\s*$/.test(line) && i + 1 < lines.length && /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(lines[i + 1])) {
      const headerCells = line.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
      const aligns = lines[i + 1].trim().replace(/^\||\|$/g, "").split("|").map((s) => {
        const t = s.trim();
        const left = t.startsWith(":");
        const right = t.endsWith(":");
        if (left && right)
          return "center";
        if (right)
          return "right";
        if (left)
          return "left";
        return "";
      });
      const bodyRows = [];
      i += 2;
      while (i < lines.length && /^\s*\|.+\|\s*$/.test(lines[i])) {
        bodyRows.push(
          lines[i].trim().replace(/^\||\|$/g, "").split("|").map(
            (c) => inlineWith(c.trim())
          )
        );
        i++;
      }
      const allRows = [headerCells.map((c) => inlineWith(c)), ...bodyRows];
      out.push(renderTable(allRows, aligns));
      continue;
    }
    if (/^>\s?/.test(line)) {
      const buf2 = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        buf2.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      out.push(`<blockquote>${inlineWith(buf2.join(" "))}</blockquote>`);
      continue;
    }
    const liMatch = line.match(/^(\s*)(?:([-*+])|(\d+)\.)\s+(.*)$/);
    if (liMatch) {
      const ordered = !!liMatch[3];
      const tag = ordered ? "ol" : "ul";
      const items = [];
      let hasTaskItems = false;
      while (i < lines.length) {
        const m = lines[i].match(/^(\s*)(?:([-*+])|(\d+)\.)\s+(.*)$/);
        if (!m)
          break;
        const isOrdered = !!m[3];
        if (isOrdered !== ordered)
          break;
        const content = m[4];
        const task = renderTaskItem(content);
        if (task) {
          hasTaskItems = true;
          items.push(task);
        } else {
          items.push(`<li>${inlineWith(content)}</li>`);
        }
        i++;
      }
      const cls = hasTaskItems ? ' class="tc-md-tasks"' : "";
      out.push(`<${tag}${cls}>${items.join("")}</${tag}>`);
      continue;
    }
    if (line.trim() === "") {
      i++;
      continue;
    }
    const buf = [line];
    i++;
    while (i < lines.length) {
      const peek = lines[i];
      if (peek.trim() === "" || /^#{1,6}\s+/.test(peek) || /^```/.test(peek) || /^>\s?/.test(peek) || /^:::/.test(peek) || /^(\s*)(?:[-*+]|\d+\.)\s+/.test(peek) || /^\s*\|.+\|\s*$/.test(peek) || /^(?:-\s*){3,}$|^(?:\*\s*){3,}$|^(?:_\s*){3,}$/.test(peek.trim())) {
        break;
      }
      buf.push(peek);
      i++;
    }
    out.push(`<p>${inlineWith(buf.join(" "))}</p>`);
  }
  return out.join("\n");
}
var TB_ICONS = {
  bold: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h7a4 4 0 0 1 0 8H6z"/><path d="M6 12h8a4 4 0 0 1 0 8H6z"/></svg>`,
  italic: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg>`,
  heading: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6v12"/><path d="M12 6v12"/><path d="M4 12h8"/><path d="M16 18l4-12"/></svg>`,
  code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
  bullet: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1.2" fill="currentColor"/><circle cx="4" cy="12" r="1.2" fill="currentColor"/><circle cx="4" cy="18" r="1.2" fill="currentColor"/></svg>`,
  ordered: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><path d="M4 8V4l-1 1"/><path d="M3 14h2l-2 3h2"/></svg>`,
  quote: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h3v6H4v-3a3 3 0 0 1 3-3z"/><path d="M16 7h3v6h-6v-3a3 3 0 0 1 3-3z"/></svg>`,
  preview: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`
};
function wrapSelection(text, s, e, before, after, placeholder = "text") {
  const sel = text.slice(s, e) || placeholder;
  const next = text.slice(0, s) + before + sel + after + text.slice(e);
  return {
    text: next,
    selStart: s + before.length,
    selEnd: s + before.length + sel.length
  };
}
function prefixLines(text, s, e, prefix) {
  const lineStart = text.lastIndexOf("\n", s - 1) + 1;
  const lineEnd = (() => {
    const i = text.indexOf("\n", e);
    return i === -1 ? text.length : i;
  })();
  const slice = text.slice(lineStart, lineEnd);
  const next = slice.split("\n").map((l) => prefix + l).join("\n");
  return {
    text: text.slice(0, lineStart) + next + text.slice(lineEnd),
    selStart: lineStart,
    selEnd: lineStart + next.length
  };
}
var MD_TOOLBAR = {
  bold: {
    key: "bold",
    label: "Bold",
    shortcut: "\u2318B",
    apply: (t, s, e) => wrapSelection(t, s, e, "**", "**", "bold text")
  },
  italic: {
    key: "italic",
    label: "Italic",
    shortcut: "\u2318I",
    apply: (t, s, e) => wrapSelection(t, s, e, "*", "*", "italic text")
  },
  heading: {
    key: "heading",
    label: "Heading",
    apply: (t, s, e) => prefixLines(t, s, e, "## ")
  },
  code: {
    key: "code",
    label: "Code",
    apply: (t, s, e) => wrapSelection(t, s, e, "`", "`", "code")
  },
  link: {
    key: "link",
    label: "Link",
    shortcut: "\u2318K",
    apply: (t, s, e) => {
      const url = globalThis.prompt?.("URL")?.trim();
      if (!url)
        return { text: t, selStart: s, selEnd: e };
      const label = t.slice(s, e) || "link text";
      const next = t.slice(0, s) + `[${label}](${url})` + t.slice(e);
      return {
        text: next,
        selStart: s + 1,
        selEnd: s + 1 + label.length
      };
    }
  },
  bullet: {
    key: "bullet",
    label: "Bulleted list",
    apply: (t, s, e) => prefixLines(t, s, e, "- ")
  },
  ordered: {
    key: "ordered",
    label: "Numbered list",
    apply: (t, s, e) => prefixLines(t, s, e, "1. ")
  },
  quote: {
    key: "quote",
    label: "Quote",
    apply: (t, s, e) => prefixLines(t, s, e, "> ")
  }
};
var DEFAULT_TOOLBAR2 = "bold,italic,heading,|,bullet,ordered,quote,|,link,code";
var MD_STYLE = `
    :host {
      display: block;
      font-family: var(--tc-md-font, var(--tc-font-sans, "Inter", system-ui, sans-serif));
      color: var(--tc-md-fg, var(--tc-color-ink, #14171f));
    }
    .root {
      border: 1px solid var(--tc-md-rule, var(--tc-color-rule, #ece5d3));
      border-radius: var(--tc-md-radius, var(--tc-radius-md, 8px));
      overflow: hidden;
      background: var(--tc-md-bg, var(--tc-color-surface, #ffffff));
      display: flex;
      flex-direction: column;
    }
    .toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 2px;
      padding: 6px;
      background: var(--tc-md-toolbar-bg, var(--tc-color-bg, #faf8f3));
      border-bottom: 1px solid var(--tc-md-rule);
      align-items: center;
    }
    .toolbar.empty { display: none; }
    .tb-btn {
      width: 30px; height: 30px;
      display: inline-flex; align-items: center; justify-content: center;
      border: none; background: transparent;
      color: var(--tc-color-ink-soft, #4a5061);
      border-radius: 5px; cursor: pointer;
      transition: background 0.12s ease, color 0.12s ease;
      padding: 0;
    }
    .tb-btn svg { width: 16px; height: 16px; display: block; }
    .tb-btn:hover {
      background: rgba(20, 23, 31, 0.06);
      color: var(--tc-color-ink, #14171f);
    }
    .tb-btn:focus-visible {
      outline: 2px solid var(--tc-color-accent, #a16939);
      outline-offset: 1px;
    }
    .tb-btn.is-active {
      background: var(--tc-color-accent-soft, #efe2cf);
      color: var(--tc-color-accent-hover, #8a572d);
    }
    .tb-sep {
      width: 1px;
      align-self: stretch;
      margin: 4px 4px;
      background: var(--tc-md-rule);
    }
    .tb-mode {
      margin-left: auto;
      display: inline-flex;
      gap: 2px;
      padding: 2px;
      background: var(--tc-color-rule, #ece5d3);
      border-radius: 6px;
    }
    .tb-mode button {
      font: inherit;
      font-size: 0.75rem;
      font-weight: 500;
      padding: 3px 10px;
      border: none;
      background: transparent;
      color: var(--tc-color-ink-soft, #4a5061);
      border-radius: 4px;
      cursor: pointer;
    }
    .tb-mode button.is-active {
      background: var(--tc-md-bg, var(--tc-color-surface, #ffffff));
      color: var(--tc-color-ink, #14171f);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
    }

    .panes {
      display: grid;
      grid-template-columns: 1fr 1fr;
      min-height: var(--tc-md-min-height, 240px);
    }
    .panes.source-only { grid-template-columns: 1fr; }
    .panes.preview-only { grid-template-columns: 1fr; }
    .source, .preview {
      min-height: var(--tc-md-min-height, 240px);
      max-height: 600px;
      overflow-y: auto;
    }
    .source {
      border-right: 1px solid var(--tc-md-rule);
    }
    .panes.source-only .preview { display: none; }
    .panes.preview-only .source { display: none; }
    .panes.preview-only .preview,
    .panes.source-only .source { border-right: none; }

    textarea {
      width: 100%;
      box-sizing: border-box;
      min-height: var(--tc-md-min-height, 240px);
      padding: 14px 16px;
      border: none;
      outline: none;
      background: transparent;
      font-family: var(--tc-md-mono-font, var(--tc-font-mono, monospace));
      font-size: 0.92rem;
      line-height: 1.55;
      color: var(--tc-md-fg);
      resize: vertical;
    }
    textarea::placeholder {
      color: var(--tc-color-ink-muted, #6b7280);
    }
    .preview {
      padding: 14px 18px;
      line-height: 1.65;
      background: var(--tc-md-preview-bg, var(--tc-color-bg, #faf8f3));
    }
    .preview > * { margin-top: 0; }
    .preview > * + * { margin-top: 0.7em; }
    .preview h1 { font-size: 1.6rem; font-weight: 700; letter-spacing: -0.02em; }
    .preview h2 { font-size: 1.3rem; font-weight: 700; letter-spacing: -0.015em; }
    .preview h3 { font-size: 1.1rem; font-weight: 600; }
    .preview blockquote {
      margin: 0;
      padding-left: 14px;
      border-left: 3px solid var(--tc-color-accent, #a16939);
      color: var(--tc-color-ink-soft, #4a5061);
    }
    .preview code {
      font-family: var(--tc-md-mono-font);
      background: var(--tc-color-accent-soft, #efe2cf);
      color: var(--tc-color-accent-hover, #8a572d);
      padding: 1px 6px; border-radius: 4px;
      font-size: 0.92em;
    }
    .preview pre {
      background: #14171f; color: #f5f5f5;
      padding: 12px 14px; border-radius: 6px; overflow-x: auto;
      font-family: var(--tc-md-mono-font); font-size: 0.86rem;
      line-height: 1.5;
    }
    .preview pre code { background: none; color: inherit; padding: 0; }
    .preview a { color: var(--tc-color-accent, #a16939); }
    .preview ul, .preview ol { padding-left: 1.4em; margin: 0; }
    .preview img { max-width: 100%; height: auto; border-radius: 4px; }

    /* Tables */
    .preview .tc-md-table {
      border-collapse: collapse;
      width: 100%;
      font-size: 0.92rem;
    }
    .preview .tc-md-table th,
    .preview .tc-md-table td {
      text-align: left;
      padding: 7px 10px;
      border-bottom: 1px solid var(--tc-md-rule);
    }
    .preview .tc-md-table th {
      background: var(--tc-color-bg, #faf8f3);
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: var(--tc-color-ink-muted, #6b7280);
    }
    .preview .tc-md-table tr:last-child td { border-bottom: none; }

    /* Task lists */
    .preview .tc-md-tasks { list-style: none; padding-left: 0; }
    .preview .tc-md-task {
      display: flex;
      align-items: baseline;
      gap: 8px;
      padding: 2px 0;
    }
    .preview .tc-md-task input[type="checkbox"] {
      transform: translateY(1px);
      accent-color: var(--tc-color-accent, #a16939);
    }

    /* Callouts (:::variant) */
    .preview .tc-md-callout {
      border-left: 3px solid currentColor;
      padding: 10px 14px;
      border-radius: 4px;
      color: var(--tc-color-ink-soft, #4a5061);
      background: var(--tc-color-bg, #faf8f3);
    }
    .preview .tc-md-callout.v-info { color: var(--tc-color-info, #1f3a66); background: var(--tc-color-info-bg, #dde6f4); }
    .preview .tc-md-callout.v-success { color: var(--tc-color-success, #155b40); background: var(--tc-color-success-bg, #dbece2); }
    .preview .tc-md-callout.v-warning { color: var(--tc-color-warning, #7a4f0a); background: var(--tc-color-warning-bg, #f5e7cf); }
    .preview .tc-md-callout.v-danger { color: var(--tc-color-danger, #7a1a14); background: var(--tc-color-danger-bg, #f4dad7); }
    .preview .callout-title {
      font-weight: 700;
      margin-bottom: 4px;
      color: inherit;
    }
    .preview .callout-body > :first-child { margin-top: 0; }
    .preview .callout-body > :last-child { margin-bottom: 0; }

    /* Math */
    .preview .tc-md-math {
      font-family: var(--tc-md-mono-font);
    }
    .preview .tc-md-math.display {
      display: block;
      text-align: center;
      padding: 8px 0;
      overflow-x: auto;
    }
    .preview .tc-md-math.fallback code {
      background: var(--tc-color-rule, #ece5d3);
      color: var(--tc-color-ink, #14171f);
    }
    .preview .tc-md-math.fallback.display {
      background: var(--tc-color-rule, #ece5d3);
      border-radius: 6px;
    }
    .preview .tc-md-math.fallback.display code {
      background: none;
      padding: 0;
    }
    .preview .tc-md-math.error {
      color: var(--tc-color-danger, #b3261e);
      font-style: italic;
    }

    @media (max-width: 640px) {
      .panes { grid-template-columns: 1fr; }
      .source { border-right: none; border-bottom: 1px solid var(--tc-md-rule); }
    }
`;
build(
  TAG38,
  describe({
    props: {
      value: { type: "string", default: "" },
      placeholder: { type: "string", default: "Write some markdown\u2026" },
      mode: { type: "string", default: "split" },
      readonly: { type: "boolean", default: false },
      minHeight: { type: "string", default: "240px" },
      toolbar: { type: "string", default: DEFAULT_TOOLBAR2 }
    },
    theme: {
      "tc-md-bg": "var(--tc-color-surface, #ffffff)",
      "tc-md-fg": "var(--tc-color-ink, #14171f)",
      "tc-md-rule": "var(--tc-color-rule, #ece5d3)",
      "tc-md-toolbar-bg": "var(--tc-color-bg, #faf8f3)",
      "tc-md-preview-bg": "var(--tc-color-bg, #faf8f3)",
      "tc-md-radius": "var(--tc-radius-md, 8px)",
      "tc-md-font": "var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
      "tc-md-mono-font": "var(--tc-font-mono, 'JetBrains Mono', ui-monospace, monospace)"
    },
    styles: { display: "block" },
    stylesheet: MD_STYLE,
    refs: {
      source: "textarea",
      preview: ".preview"
    },
    template: ({ props, state }) => {
      const mode = String(state.mode ?? props.mode ?? "split");
      const value = String(props.value ?? "");
      const items = String(props.toolbar ?? DEFAULT_TOOLBAR2).split(",").map((k) => k.trim()).filter(Boolean);
      const buttons = items.map((key) => {
        if (key === "|") {
          return `<span class="tb-sep" aria-hidden="true"></span>`;
        }
        const t = MD_TOOLBAR[key];
        if (!t || !TB_ICONS[t.key])
          return "";
        const sc = t.shortcut ? ` (${escHtml(t.shortcut)})` : "";
        return `<button type="button" class="tb-btn" data-op="${escHtml(t.key)}" title="${escHtml(t.label)}${sc}" aria-label="${escHtml(t.label)}">${TB_ICONS[t.key]}</button>`;
      }).join("");
      const modeButton = (m, label) => `<button type="button" data-mode="${m}" class="${mode === m ? "is-active" : ""}" aria-pressed="${mode === m ? "true" : "false"}">${label}</button>`;
      const hostExt = props;
      const renderer = hostExt.render ?? ((md) => renderMarkdown(md, {
        mathRenderer: hostExt.mathRenderer,
        highlight: hostExt.highlight
      }));
      const rendered = renderer(value);
      const panesCls = mode === "source" ? "panes source-only" : mode === "preview" ? "panes preview-only" : "panes";
      const styleVar = `--tc-md-min-height: ${props.minHeight ?? "240px"};`;
      return html`
        <div class="root" style="${styleVar}">
          <div class="${items.length === 0 ? "toolbar empty" : "toolbar"}" role="toolbar" aria-label="Markdown formatting">
            ${unsafe(buttons)}
            <span class="tb-mode" role="tablist" aria-label="View mode">
              ${unsafe(modeButton("source", "Source"))} ${unsafe(
        modeButton("split", "Split")
      )} ${unsafe(modeButton("preview", "Preview"))}
            </span>
          </div>
          <div class="${panesCls}">
            <div class="source">
              <textarea
                placeholder="${props.placeholder ?? ""}"
                ${unsafe(props.readonly ? "readonly" : "")}
                spellcheck="true"
              >${value}</textarea>
            </div>
            <div class="preview">${unsafe(rendered)}</div>
          </div>
        </div>
      `;
    },
    afterMount() {
      installMarkdown(this);
    },
    afterRender() {
      const host = this;
      const ta = host.shadowRoot?.querySelector("textarea");
      if (ta && document.activeElement !== host && ta.value !== String(host.value ?? "")) {
        ta.value = String(host.value ?? "");
      }
      installMarkdown(host);
    },
    unmount() {
      this._mdCleanup?.();
    }
  })
);
function installMarkdown(rawHost) {
  const host = rawHost;
  host._mdCleanup?.();
  const root = host.shadowRoot;
  if (!root)
    return;
  const ta = root.querySelector("textarea");
  const preview = root.querySelector(".preview");
  const toolbar = root.querySelector(".toolbar");
  const modeStrip = root.querySelector(".tb-mode");
  if (!ta || !preview)
    return;
  const renderFn = host.render && typeof host.render === "function" ? host.render : (md) => renderMarkdown(md, {
    mathRenderer: host.mathRenderer,
    highlight: host.highlight
  });
  const sync = () => {
    const md = ta.value;
    host.value = md;
    const html2 = renderFn(md);
    preview.innerHTML = html2;
    host.dispatchEvent(
      new CustomEvent("tc-input", {
        detail: { markdown: md, html: html2 },
        bubbles: true,
        composed: true
      })
    );
  };
  const onInput = () => sync();
  const onBlur = () => {
    host.dispatchEvent(
      new CustomEvent("tc-change", {
        detail: { markdown: ta.value, html: renderFn(ta.value) },
        bubbles: true,
        composed: true
      })
    );
  };
  const onToolbarClick = (e) => {
    const target = e.target?.closest?.(".tb-btn");
    if (!target)
      return;
    e.preventDefault();
    const op = target.dataset.op;
    if (!op)
      return;
    runOp(ta, op);
    sync();
  };
  const onModeClick = (e) => {
    const target = e.target?.closest?.(
      "[data-mode]"
    );
    if (!target)
      return;
    const m = target.dataset.mode;
    if (!m)
      return;
    host.setState?.("mode", m);
  };
  const onKey = (e) => {
    if (!(e.metaKey || e.ctrlKey))
      return;
    const k = e.key.toLowerCase();
    if (k === "b") {
      e.preventDefault();
      runOp(ta, "bold");
      sync();
    } else if (k === "i") {
      e.preventDefault();
      runOp(ta, "italic");
      sync();
    } else if (k === "k") {
      e.preventDefault();
      runOp(ta, "link");
      sync();
    }
  };
  ta.addEventListener("input", onInput);
  ta.addEventListener("blur", onBlur);
  ta.addEventListener("keydown", onKey);
  toolbar?.addEventListener("click", onToolbarClick);
  modeStrip?.addEventListener("click", onModeClick);
  host._mdCleanup = () => {
    ta.removeEventListener("input", onInput);
    ta.removeEventListener("blur", onBlur);
    ta.removeEventListener("keydown", onKey);
    toolbar?.removeEventListener("click", onToolbarClick);
    modeStrip?.removeEventListener("click", onModeClick);
  };
}
function runOp(ta, key) {
  const op = MD_TOOLBAR[key];
  if (!op)
    return;
  const start = ta.selectionStart ?? ta.value.length;
  const end = ta.selectionEnd ?? ta.value.length;
  const r = op.apply(ta.value, start, end);
  ta.value = r.text;
  ta.focus();
  ta.setSelectionRange(r.selStart, r.selEnd);
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
  // editors
  editor: tagName37,
  markdown: tagName38,
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
