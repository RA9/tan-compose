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
function build(tagName2, descriptionInput) {
  const description = descriptionInput;
  if (typeof tagName2 !== "string" || !TAG_NAME_PATTERN.test(tagName2)) {
    throw new TypeError(
      `build(): "${tagName2}" is not a valid custom element name (must be lowercase and contain a hyphen).`
    );
  }
  if (componentRegistry.has(tagName2)) {
    console.warn(
      `Component "${tagName2}" is already registered. Skipping re-registration.`
    );
    return tagName2;
  }
  if (typeof HTMLElement === "undefined" || typeof customElements === "undefined") {
    console.warn(
      "HTMLElement or customElements not available; skipping component registration."
    );
    return tagName2;
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
        console.error(`[tan-compose] beforeMount threw for <${tagName2}>:`, err);
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
        console.error(`[tan-compose] afterMount threw for <${tagName2}>:`, err);
      }
    }
    disconnectedCallback() {
      try {
        description.unmount?.call(this);
      } catch (err) {
        console.error(`[tan-compose] unmount threw for <${tagName2}>:`, err);
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
          `[tan-compose] <${tagName2}> exceeded ${RENDER_LOOP_LIMIT} renders in one turn \u2014 aborting to break a render loop (check afterRender / setState).`
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
        console.error(`[tan-compose] afterRender threw for <${tagName2}>:`, err);
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
          `[tan-compose] formAssociatedCallback threw for <${tagName2}>:`,
          err
        );
      }
    }
    formDisabledCallback(disabled) {
      try {
        description.formDisabledCallback?.call(this, disabled);
      } catch (err) {
        console.error(
          `[tan-compose] formDisabledCallback threw for <${tagName2}>:`,
          err
        );
      }
    }
    formResetCallback() {
      try {
        description.formResetCallback?.call(this);
      } catch (err) {
        console.error(
          `[tan-compose] formResetCallback threw for <${tagName2}>:`,
          err
        );
      }
    }
    formStateRestoreCallback(state, mode) {
      try {
        description.formStateRestoreCallback?.call(this, state, mode);
      } catch (err) {
        console.error(
          `[tan-compose] formStateRestoreCallback threw for <${tagName2}>:`,
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
  componentRegistry.set(tagName2, CustomComponent);
  customElements.define(tagName2, CustomComponent);
  return tagName2;
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

// icons.ts
var ICONS = {
  // alerts / status
  "alert-circle": `<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>`,
  "alert-triangle": `<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>`,
  "info": `<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>`,
  "check": `<polyline points="20 6 9 17 4 12"/>`,
  "check-circle": `<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>`,
  "x": `<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>`,
  "x-circle": `<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>`,
  // navigation
  "arrow-right": `<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>`,
  "arrow-left": `<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>`,
  "arrow-up": `<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>`,
  "arrow-down": `<line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>`,
  "chevron-right": `<polyline points="9 18 15 12 9 6"/>`,
  "chevron-left": `<polyline points="15 18 9 12 15 6"/>`,
  "chevron-up": `<polyline points="18 15 12 9 6 15"/>`,
  "chevron-down": `<polyline points="6 9 12 15 18 9"/>`,
  "external-link": `<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>`,
  // common actions
  "plus": `<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>`,
  "minus": `<line x1="5" y1="12" x2="19" y2="12"/>`,
  "search": `<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>`,
  "filter": `<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>`,
  "more-horizontal": `<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>`,
  "more-vertical": `<circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>`,
  "settings": `<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>`,
  "edit": `<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="m18.5 2.5 a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z"/>`,
  "trash": `<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>`,
  "copy": `<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>`,
  "save": `<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>`,
  "download": `<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>`,
  "upload": `<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>`,
  // domain
  "user": `<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>`,
  "users": `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`,
  "mail": `<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/>`,
  "calendar": `<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>`,
  "clock": `<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`,
  "home": `<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>`,
  // controls
  "menu": `<line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>`,
  "log-out": `<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>`,
  "log-in": `<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>`,
  "moon": `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`,
  "sun": `<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>`,
  "eye": `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`,
  "eye-off": `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>`,
  "loader": `<line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>`,
  "refresh": `<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>`,
  // money & payments
  "banknote": `<rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>`,
  "calculator": `<rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/>`,
  "coins": `<path d="M13.744 17.736a6 6 0 1 1-7.48-7.48"/><path d="M15 6h1v4"/><path d="m6.134 14.768.866-.5 2 3.464"/><circle cx="16" cy="8" r="6"/>`,
  "credit-card": `<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>`,
  "dollar-sign": `<line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>`,
  "landmark": `<path d="M10 18v-7"/><path d="M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="M3 22h18"/><path d="M6 18v-7"/>`,
  "percent": `<line x1="19" x2="5" y1="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>`,
  "piggy-bank": `<path d="M11 17h3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a3.16 3.16 0 0 0 2-2h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a5 5 0 0 0-2-4V3a4 4 0 0 0-3.2 1.6l-.3.4H11a6 6 0 0 0-6 6v1a5 5 0 0 0 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z"/><path d="M16 10h.01"/><path d="M2 8v1a2 2 0 0 0 2 2h1"/>`,
  "receipt": `<path d="M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z"/><path d="M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8"/><path d="M12 17V7"/>`,
  "wallet": `<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>`,
  // trends & charts
  "bar-chart": `<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M7 16h8"/><path d="M7 11h12"/><path d="M7 6h3"/>`,
  "pie-chart": `<path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"/><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>`,
  "trending-down": `<path d="M16 17h6v-6"/><path d="m22 17-8.5-8.5-5 5L2 7"/>`,
  "trending-up": `<path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/>`,
  // commerce
  "gift": `<path d="M12 7v14"/><path d="M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/><path d="M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5"/><rect x="3" y="7" width="18" height="4" rx="1"/>`,
  "package": `<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><polyline points="3.29 7 12 12 20.71 7"/><path d="m7.5 4.27 9 5.15"/>`,
  "shopping-bag": `<path d="M16 10a4 4 0 0 1-8 0"/><path d="M3.103 6.034h17.794"/><path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"/>`,
  "shopping-cart": `<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>`,
  "tag": `<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>`,
  "truck": `<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>`,
  // communication
  "bell": `<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>`,
  "message-square": `<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/>`,
  "phone": `<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>`,
  "send": `<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>`,
  // files & documents
  "clipboard": `<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>`,
  "file-text": `<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>`,
  "folder": `<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>`,
  "image": `<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>`,
  "paperclip": `<path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551"/>`,
  "printer": `<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/><rect x="6" y="14" width="12" height="8" rx="1"/>`,
  // security
  "key": `<path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"/><path d="m21 2-9.6 9.6"/><circle cx="7.5" cy="15.5" r="5.5"/>`,
  "lock": `<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>`,
  "shield": `<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>`,
  "unlock": `<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>`,
  // maps & links
  "globe": `<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>`,
  "link": `<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>`,
  "map-pin": `<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>`,
  // social & feedback
  "bookmark": `<path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"/>`,
  "heart": `<path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>`,
  "star": `<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>`,
  // layout / lists
  "grid": `<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>`,
  "list": `<path d="M3 5h.01"/><path d="M3 12h.01"/><path d="M3 19h.01"/><path d="M8 5h13"/><path d="M8 12h13"/><path d="M8 19h13"/>`,
  // people
  "user-check": `<path d="m16 11 2 2 4-4"/><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>`,
  "user-plus": `<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/>`,
  // originals — designed for this set, not from Lucide. Same 24x24 /
  // stroke-2 visual spec; some entries use `fill="currentColor"` on
  // accent shapes (dots, badge bodies) to add weight that pure-stroke
  // icons can't reach.
  "ai": `<path d="M10 4 L11 8 L15 9 L11 10 L10 14 L9 10 L5 9 L9 8 Z"/><path d="M18 14 L18.6 16.4 L21 17 L18.6 17.6 L18 20 L17.4 17.6 L15 17 L17.4 16.4 Z"/><path d="M18 3 L18.4 4.6 L20 5 L18.4 5.4 L18 7 L17.6 5.4 L16 5 L17.6 4.6 Z"/>`,
  "confetti": `<circle cx="5" cy="5" r="1" fill="currentColor"/><circle cx="19" cy="6" r="1.5"/><circle cx="4" cy="14" r="1" fill="currentColor"/><circle cx="20" cy="16" r="1.2"/><path d="M9 20l1 2"/><path d="M15 20l-1 2"/><path d="M12 3l1 2"/><rect x="10" y="9" width="2.5" height="6" rx="1" transform="rotate(20 11.25 12)" fill="currentColor"/>`,
  "forecast": `<path d="M3 17l5-5 4 4 4-6"/><path d="M16 10l4-3" stroke-dasharray="3 3"/><circle cx="16" cy="10" r="1.5" fill="currentColor"/>`,
  "pulse": `<circle cx="12" cy="12" r="2" fill="currentColor"/><path d="M16.5 7.5a7 7 0 0 1 0 9"/><path d="M7.5 7.5a7 7 0 0 0 0 9"/><path d="M19.5 4.5a11 11 0 0 1 0 15"/><path d="M4.5 4.5a11 11 0 0 0 0 15"/>`,
  "receipt-scan": `<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M8 9h8"/><path d="M8 13h8"/><path d="M8 17h5"/>`,
  "recurring": `<path d="M21 12a9 9 0 0 1-15 6.7"/><path d="M3 12a9 9 0 0 1 15-6.7"/><polyline points="21 4 21 9 16 9"/><polyline points="3 20 3 15 8 15"/><circle cx="12" cy="12" r="2" fill="currentColor"/>`,
  "spark": `<path d="M12 4 L13.6 10.4 L20 12 L13.6 13.6 L12 20 L10.4 13.6 L4 12 L10.4 10.4 Z"/><circle cx="19" cy="5" r="1" fill="currentColor"/>`,
  "subscription": `<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/><path d="M9 16.5a3 3 0 0 1 5.5-1.6"/><polyline points="15 13 15 15 13 15"/>`,
  "token": `<path d="M12 2l8 5v10l-8 5-8-5V7z"/><path d="M12 8v8"/><path d="M14 10h-3a1.5 1.5 0 0 0 0 3h2a1.5 1.5 0 0 1 0 3H10"/>`,
  "verified": `<path d="M12 2 L20 7 V17 L12 22 L4 17 V7 Z"/><polyline points="8 12 11 15 16 9"/>`
};
var iconNames = Object.freeze(Object.keys(ICONS));

// mod.ts
var TAG = "tc-icon";
var tagName = TAG;
build(
  TAG,
  describe({
    props: {
      name: { type: "string", default: "" },
      size: { type: "string", default: "1em" },
      stroke: { type: "string", default: "currentColor" },
      fill: { type: "string", default: "none" },
      title: { type: "string", default: "" }
    },
    styles: {
      display: "inline-flex",
      "align-items": "center",
      "justify-content": "center",
      "vertical-align": "middle",
      "line-height": "1"
    },
    template: ({ props }) => {
      const name = String(props.name ?? "");
      const path = ICONS[name];
      const size = String(props.size ?? "1em");
      const stroke = String(props.stroke ?? "currentColor");
      const fill = String(props.fill ?? "none");
      const title = String(props.title ?? "");
      if (!path) {
        return `
          <svg width="${esc(size)}" height="${esc(size)}" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="1.5"
               stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <text x="12" y="14.5" text-anchor="middle" font-size="6" font-family="monospace" stroke="none" fill="currentColor">?</text>
          </svg>
        `;
      }
      const ariaProps = title ? `role="img" aria-label="${esc(title)}"` : `aria-hidden="true"`;
      return `
        <svg
          width="${esc(size)}"
          height="${esc(size)}"
          viewBox="0 0 24 24"
          fill="${esc(fill)}"
          stroke="${esc(stroke)}"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          ${ariaProps}
        >${title ? `<title>${esc(title)}</title>` : ""}${path}</svg>
      `;
    }
  })
);
function esc(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
export {
  ICONS,
  iconNames,
  tagName
};
//# sourceMappingURL=icons.js.map
