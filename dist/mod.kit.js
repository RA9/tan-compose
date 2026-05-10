var he=["beforeMount","afterMount","unmount","action","formAssociatedCallback","formDisabledCallback","formResetCallback","formStateRestoreCallback"],ye=new Set(["string","number","boolean","json"]);function u(e){if(e===null||typeof e!="object")throw new TypeError("describe(): options must be an object");if(e.tag!==void 0&&typeof e.tag!="string")throw new TypeError("describe(): `tag` must be a string");if(e.className!==void 0&&typeof e.className!="string")throw new TypeError("describe(): `className` must be a string");if(e.template!==void 0&&typeof e.template!="string"&&typeof e.template!="function")throw new TypeError("describe(): `template` must be a string or function");if(e.children!==void 0&&!Array.isArray(e.children))throw new TypeError("describe(): `children` must be an array");if(e.emit!==void 0&&!Array.isArray(e.emit))throw new TypeError("describe(): `emit` must be an array");if(e.observedAttributes!==void 0&&(!Array.isArray(e.observedAttributes)||e.observedAttributes.some(t=>typeof t!="string")))throw new TypeError("describe(): `observedAttributes` must be an array of strings");for(let t of["theme","styles","attributes","events","refs"]){let r=e[t];if(r!==void 0&&(r===null||typeof r!="object"||Array.isArray(r)))throw new TypeError(`describe(): \`${t}\` must be a record`)}if(e.refs!==void 0){for(let[t,r]of Object.entries(e.refs))if(typeof r!="string")throw new TypeError(`describe(): refs.${t} must be a CSS selector string`)}if(e.formAssociated!==void 0&&typeof e.formAssociated!="boolean")throw new TypeError("describe(): `formAssociated` must be a boolean");for(let t of he){let r=e[t];if(r!==void 0&&typeof r!="function")throw new TypeError(`describe(): \`${t}\` must be a function`)}if(e.if!==void 0&&typeof e.if!="function")throw new TypeError("describe(): `if` must be a function");if(e.for!==void 0){let t=e.for;if(t===null||typeof t!="object"||Array.isArray(t))throw new TypeError("describe(): `for` must be a record");if(typeof t.items!="function")throw new TypeError("describe(): `for.items` must be a function");if(typeof t.key!="function")throw new TypeError("describe(): `for.key` must be a function");if(typeof t.render!="function")throw new TypeError("describe(): `for.render` must be a function");if(e.children!==void 0)throw new TypeError("describe(): cannot set both `children` and `for` on the same node")}if(e.props!==void 0){let t=e.props;if(t===null||typeof t!="object"||Array.isArray(t))throw new TypeError("describe(): `props` must be a record");for(let[r,n]of Object.entries(t)){if(n===null||typeof n!="object"||Array.isArray(n))throw new TypeError(`describe(): props.${r} must be a record`);if(!ye.has(n.type))throw new TypeError(`describe(): props.${r}.type must be one of "string", "number", "boolean", "json"`)}}return{...e}}var C=new Map,ve=/^[a-z][a-z0-9]*(-[a-z0-9]+)+$/,ke=/^(\S+)(?:\s+(.+))?$/;function f(e,t){if(typeof e!="string"||!ve.test(e))throw new TypeError(`build(): "${e}" is not a valid custom element name (must be lowercase and contain a hyphen).`);if(C.has(e))return console.warn(`Component "${e}" is already registered. Skipping re-registration.`),e;if(typeof HTMLElement>"u"||typeof customElements>"u")return console.warn("HTMLElement or customElements not available; skipping component registration."),e;let r=Array.from(new Set([...t.observedAttributes??[],...Object.keys(t.props??{})])),n=t.props??{},s=t.refs??{},i=Se(t);class d extends HTMLElement{static get observedAttributes(){return r}static get formAssociated(){return t.formAssociated===!0}isMounted=!1;mountCleanups=[];renderCleanups=[];state=new Map;propValues=new Map;listSlots=new WeakMap;currentRefs={};container;ctx;rendering=!1;renderQueued=!1;internals;constructor(){super();let a=this.attachShadow({mode:"open"});t.formAssociated&&typeof this.attachInternals=="function"&&(this.internals=this.attachInternals()),$e(a,i),this.container=document.createElement("div"),this.container.className=t.className?`container ${t.className}`:"container",a.appendChild(this.container),t.attributes&&z(this,t.attributes),this.ctx=we(this,this.propValues,this.state,()=>this.currentRefs),this.initProps()}get refs(){return this.currentRefs}initProps(){for(let[a,o]of Object.entries(n)){let l=this.getAttribute(a),c=l!==null?L(l,o.type):o.default;this.propValues.set(a,c),this.maybeSyncFormValue(a,c),Object.defineProperty(this,a,{configurable:!0,enumerable:!0,get:()=>this.propValues.get(a),set:p=>{let g=Me(p,o.type),m=this.propValues.get(a);Object.is(m,g)||(this.propValues.set(a,g),o.reflect&&Ce(this,a,g,o.type),this.maybeSyncFormValue(a,g),this.isMounted&&this.scheduleRender())}})}}maybeSyncFormValue(a,o){if(!this.internals||a!=="value")return;let l=o==null?null:String(o);this.internals.setFormValue(l)}connectedCallback(){if(!this.isMounted){try{t.beforeMount?.call(this)}catch(a){console.error(`[tan-compose] beforeMount threw for <${e}>:`,a)}if(this.renderInternal(),t.action){let a=t.action;this.addEventListener("click",a),this.mountCleanups.push(()=>this.removeEventListener("click",a))}if(t.emit)for(let a of t.emit)this.addEventListener(a.name,a.handler),this.mountCleanups.push(()=>this.removeEventListener(a.name,a.handler));t.events&&this.attachDelegatedEvents(t.events),this.isMounted=!0;try{t.afterMount?.call(this)}catch(a){console.error(`[tan-compose] afterMount threw for <${e}>:`,a)}}}disconnectedCallback(){try{t.unmount?.call(this)}catch(a){console.error(`[tan-compose] unmount threw for <${e}>:`,a)}h(this.mountCleanups),h(this.renderCleanups),this.flushListSlots(),this.isMounted=!1}flushListSlots(){D(t,a=>{let o=this.listSlots.get(a);if(o){for(let l of o.cache.values())h(l.cleanups);o.cache.clear()}})}attributeChangedCallback(a,o,l){if(o!==l){if(Object.prototype.hasOwnProperty.call(n,a)){let c=n[a],p=l!==null?L(l,c.type):c.default,g=this.propValues.get(a);Object.is(g,p)||(this.propValues.set(a,p),this.isMounted&&this.scheduleRender());return}this.state.set(a,l),this.isMounted&&this.scheduleRender()}}setState(a,o){let l=this.state.get(a);Object.is(l,o)||(this.state.set(a,o),this.isMounted&&this.scheduleRender())}getState(a){return this.state.get(a)}render(){this.renderInternal()}emitEvent(a,o){this.dispatchEvent(new CustomEvent(a,{detail:o,bubbles:!0,composed:!0}))}scheduleRender(){if(this.rendering){this.renderQueued=!0;return}this.renderInternal()}getOrCreateSlot(a){let o=this.listSlots.get(a);return o||(o={cache:new Map},this.listSlots.set(a,o)),o}renderInternal(){this.rendering=!0;try{h(this.renderCleanups),this.container.replaceChildren();let a={host:this,cleanups:this.renderCleanups,ctx:this.ctx};if(t.template!==void 0){let o=typeof t.template=="function"?t.template(this.ctx):t.template;o&&(this.container.innerHTML=o)}if(t.children)for(let o of t.children){let l=A(o,a,c=>this.getOrCreateSlot(c));l&&this.container.appendChild(l)}this.container.appendChild(document.createElement("slot")),this.refreshRefs()}finally{this.rendering=!1}this.renderQueued&&(this.renderQueued=!1,this.renderInternal())}refreshRefs(){let a={},o=this.shadowRoot;for(let[l,c]of Object.entries(s))a[l]=o?o.querySelector(c):null;this.currentRefs=a}formAssociatedCallback(a){try{t.formAssociatedCallback?.call(this,a)}catch(o){console.error(`[tan-compose] formAssociatedCallback threw for <${e}>:`,o)}}formDisabledCallback(a){try{t.formDisabledCallback?.call(this,a)}catch(o){console.error(`[tan-compose] formDisabledCallback threw for <${e}>:`,o)}}formResetCallback(){try{t.formResetCallback?.call(this)}catch(a){console.error(`[tan-compose] formResetCallback threw for <${e}>:`,a)}}formStateRestoreCallback(a,o){try{t.formStateRestoreCallback?.call(this,a,o)}catch(l){console.error(`[tan-compose] formStateRestoreCallback threw for <${e}>:`,l)}}attachDelegatedEvents(a){let o=new Map;for(let[l,c]of Object.entries(a)){let p=ke.exec(l.trim());if(!p)continue;let[,g,m]=p;o.has(g)||o.set(g,[]),o.get(g).push({selector:m??null,handler:c})}for(let[l,c]of o){let p=g=>{for(let{selector:m,handler:E}of c){if(!m){E(g,this.ctx);continue}let me=g.composedPath();for(let x of me){if(x===this.shadowRoot||x===this)break;if(x instanceof Element&&this.shadowRoot?.contains(x)&&x.matches(m)){E(g,this.ctx);break}}}};this.shadowRoot.addEventListener(l,p),this.mountCleanups.push(()=>this.shadowRoot?.removeEventListener(l,p))}}}return C.set(e,d),customElements.define(e,d),e}function A(e,t,r){return e.if&&!e.if(t.ctx)?null:e.for?xe(e,t,r):R(e,t,r)}function R(e,t,r){let n=document.createElement(e.tag||"div");if(e.styles&&(n.style.cssText=Object.entries(e.styles).map(([s,i])=>`${s}: ${i}`).join("; ")),e.className&&(n.className=e.className),e.attributes&&z(n,e.attributes),e.template!==void 0){let s=typeof e.template=="function"?e.template(t.ctx):e.template;s&&(n.innerHTML=s)}if(e.children)for(let s of e.children){let i=A(s,t,r);i&&n.appendChild(i)}if(e.action){let s=e.action;n.addEventListener("click",s),t.cleanups.push(()=>n.removeEventListener("click",s))}if(e.emit)for(let s of e.emit)n.addEventListener(s.name,s.handler),t.cleanups.push(()=>n.removeEventListener(s.name,s.handler));return n}function xe(e,t,r){let n=e.for,s=r(e),i=n.items(t.ctx),d=new Map,b=document.createDocumentFragment();for(let a=0;a<i.length;a++){let o=i[a],l=n.key(o,a),c,p=s.cache.get(l);if(p&&Object.is(p.lastItem,o))c=p;else{let g=[],m=n.render(o,a,t.ctx),E=R(m,{...t,cleanups:g},r);p&&h(p.cleanups),c={element:E,lastItem:o,cleanups:g}}d.set(l,c),b.appendChild(c.element)}for(let[a,o]of s.cache)d.has(a)||h(o.cleanups);return s.cache=d,b}function D(e,t){if(e.for&&t(e),e.children)for(let r of e.children)D(r,t)}function we(e,t,r,n){return{host:e,get props(){let s={};for(let[i,d]of t)s[i]=d;return s},get state(){let s={};for(let[i,d]of r)s[i]=d;return s},get refs(){return n()},setState:(s,i)=>e.setState(s,i),getState:s=>e.getState(s),emit:(s,i)=>e.emitEvent(s,i)}}function Se(e){let t=e.theme?Ee(e.theme):void 0,r=e.styles?Te(e.styles):void 0;if(!t&&!r)return{kind:"adopted",sheets:[]};if(typeof CSSStyleSheet<"u"&&typeof CSSStyleSheet.prototype.replaceSync=="function"){let s=[];if(t){let i=new CSSStyleSheet;i.replaceSync(t),s.push(i)}if(r){let i=new CSSStyleSheet;i.replaceSync(r),s.push(i)}return{kind:"adopted",sheets:s}}return{kind:"fallback",theme:t,styles:r}}function $e(e,t){if(t.kind==="adopted"){if(t.sheets.length>0)try{e.adoptedStyleSheets=t.sheets}catch{}return}if(t.theme){let r=document.createElement("style");r.textContent=t.theme,e.appendChild(r)}if(t.styles){let r=document.createElement("style");r.textContent=t.styles,e.appendChild(r)}}function z(e,t){for(let[r,n]of Object.entries(t))e.setAttribute(r,n)}function Ee(e){return`:host { ${Object.entries(e).map(([r,n])=>`--${r}: ${n};`).join(" ")} }`}function Te(e){return`.container { ${Object.entries(e).map(([r,n])=>`${r}: ${n};`).join(" ")} }`}function h(e){for(;e.length>0;){let t=e.pop();try{t?.()}catch(r){console.error("[tan-compose] cleanup threw:",r)}}}function L(e,t){switch(t){case"string":return e;case"number":{let r=Number(e);return Number.isNaN(r)?void 0:r}case"boolean":return e!=="false"&&e!=="0";case"json":try{return JSON.parse(e)}catch{return}}}function Me(e,t){switch(t){case"string":return e==null?e:String(e);case"number":return e==null?e:Number(e);case"boolean":return!!e;case"json":return e}}function Ce(e,t,r,n){if(n!=="json"){if(n==="boolean"){r?e.setAttribute(t,""):e.removeAttribute(t);return}if(r==null){e.removeAttribute(t);return}e.setAttribute(t,String(r))}}var H="tc-button",j=H;f(H,u({props:{variant:{type:"string",default:"primary"},size:{type:"string",default:"md"},disabled:{type:"boolean",default:!1,reflect:!0},loading:{type:"boolean",default:!1},block:{type:"boolean",default:!1}},theme:{"tc-btn-primary-bg":"#14171f","tc-btn-primary-fg":"#ffffff","tc-btn-secondary-bg":"#ffffff","tc-btn-secondary-fg":"#14171f","tc-btn-secondary-border":"#d9cfb8","tc-btn-ghost-fg":"#14171f","tc-btn-ghost-border":"transparent","tc-btn-danger-bg":"#b3261e","tc-btn-danger-fg":"#ffffff","tc-btn-radius":"8px","tc-btn-font":"'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"},styles:{display:"inline-block","vertical-align":"middle"},template:({props:e})=>`
      <button
        part="button"
        class="root v-${I(e.variant)} s-${I(e.size)}${e.block?" block":""}"
        ${e.disabled||e.loading?"disabled":""}
        type="button"
      >
        ${e.loading?'<span class="spinner" aria-hidden="true"></span>':""}
        <span class="content"><slot></slot></span>
      </button>
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
        }
        .root.block { width: 100%; display: flex; }
        .root:disabled { opacity: 0.55; cursor: not-allowed; }
        .root:not(:disabled):active { transform: translateY(1px); }

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

        .v-primary:not(:disabled):hover,
        .v-danger:not(:disabled):hover { filter: brightness(1.08); }
        .v-secondary:not(:disabled):hover,
        .v-ghost:not(:disabled):hover { background: rgba(20, 23, 31, 0.04); }

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
    `}));function I(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var O="tc-input",q=O;f(O,u({formAssociated:!0,props:{value:{type:"string",default:""},name:{type:"string",default:""},type:{type:"string",default:"text"},placeholder:{type:"string",default:""},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0}},theme:{"tc-input-bg":"#ffffff","tc-input-fg":"#14171f","tc-input-border":"#d9cfb8","tc-input-border-focus":"#a16939","tc-input-error":"#b3261e","tc-input-helper":"#6b7280","tc-input-radius":"8px","tc-input-font":"'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"},styles:{display:"block"},refs:{input:"input"},template:({props:e})=>{let t=!!e.error;return`
        ${e.label?`<label class="label">${y(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</label>`:""}
        <input
          class="input ${t?"invalid":""}"
          part="input"
          type="${y(e.type)}"
          value="${y(e.value)}"
          name="${y(e.name)}"
          placeholder="${y(e.placeholder)}"
          ${e.disabled?"disabled":""}
          ${e.required?"required":""}
          aria-invalid="${t?"true":"false"}"
        />
        ${e.error||e.helper?`<div class="${t?"error":"helper"}">${y(e.error||e.helper)}</div>`:""}
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
            box-shadow: 0 0 0 3px rgba(161, 105, 57, 0.18);
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
      `},events:{"input input":(e,t)=>{let r=e.target.value,n=t.host;n.internals?.setFormValue(r),n.value=r,t.emit("tc-input",{value:r})}},formResetCallback(){this.value=""}}));function y(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var N="tc-select",F=N;f(N,u({formAssociated:!0,props:{value:{type:"string",default:""},name:{type:"string",default:""},options:{type:"json",default:[]},placeholder:{type:"string",default:""},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0}},theme:{"tc-input-bg":"#ffffff","tc-input-fg":"#14171f","tc-input-border":"#d9cfb8","tc-input-border-focus":"#a16939","tc-input-error":"#b3261e","tc-input-helper":"#6b7280","tc-input-radius":"8px","tc-input-font":"'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"},styles:{display:"block"},template:({props:e})=>{let t=e.options??[],r=!!e.error;return`
        ${e.label?`<label class="label">${v(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</label>`:""}
        <div class="wrap">
          <select
            class="select ${r?"invalid":""}"
            part="select"
            name="${v(e.name)}"
            ${e.disabled?"disabled":""}
            ${e.required?"required":""}
            aria-invalid="${r?"true":"false"}"
          >
            ${e.placeholder?`<option value="" disabled ${e.value===""?"selected":""}>${v(e.placeholder)}</option>`:""}
            ${t.map(n=>`<option value="${v(n.value)}"${n.disabled?" disabled":""}${n.value===e.value?" selected":""}>${v(n.label)}</option>`).join("")}
          </select>
          <span class="caret" aria-hidden="true">\u25BE</span>
        </div>
        ${e.error||e.helper?`<div class="${r?"error":"helper"}">${v(e.error||e.helper)}</div>`:""}
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
            box-shadow: 0 0 0 3px rgba(161, 105, 57, 0.18);
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
      `},events:{"change select":(e,t)=>{let r=e.target.value,n=t.host;n.internals?.setFormValue(r),n.value=r,t.emit("tc-change",{value:r})}},formResetCallback(){this.value=""}}));function v(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var P="tc-checkbox",V=P;f(P,u({formAssociated:!0,props:{checked:{type:"boolean",default:!1,reflect:!0},name:{type:"string",default:""},value:{type:"string",default:"on"},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0},indeterminate:{type:"boolean",default:!1}},theme:{"tc-input-fg":"#14171f","tc-input-border":"#d9cfb8","tc-input-border-focus":"#a16939","tc-input-error":"#b3261e","tc-input-helper":"#6b7280","tc-input-radius":"4px","tc-input-font":"'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif","tc-checkbox-accent":"#a16939"},styles:{display:"block"},template:({props:e})=>{let t=!!e.error;return`
        <label class="row ${e.disabled?"is-disabled":""} ${t?"is-invalid":""}">
          <input
            class="cb"
            type="checkbox"
            name="${T(e.name)}"
            value="${T(e.value)}"
            ${e.checked?"checked":""}
            ${e.disabled?"disabled":""}
            ${e.required?"required":""}
            aria-invalid="${t?"true":"false"}"
          />
          ${e.label?`<span class="label">${T(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</span>`:"<span></span>"}
        </label>
        ${e.error||e.helper?`<div class="${t?"error":"helper"}">${T(e.error||e.helper)}</div>`:""}
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
      `},refs:{input:".cb"},events:{"change .cb":(e,t)=>{let r=e.target.checked,n=t.host;n.checked=r,n.internals?.setFormValue(r?n.value:null),t.emit("tc-change",{checked:r})}},afterMount(){let e=this,r=e.shadowRoot?.querySelector(".cb");r&&(r.indeterminate=e.indeterminate),e.internals?.setFormValue(e.checked?e.value:null)},formResetCallback(){this.checked=!1}}));function T(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var K="tc-switch",G=K;f(K,u({formAssociated:!0,props:{checked:{type:"boolean",default:!1,reflect:!0},name:{type:"string",default:""},value:{type:"string",default:"on"},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},disabled:{type:"boolean",default:!1,reflect:!0}},theme:{"tc-switch-track-off":"#d9cfb8","tc-switch-track-on":"#a16939","tc-switch-thumb":"#ffffff","tc-switch-fg":"#14171f","tc-switch-helper":"#6b7280","tc-switch-error":"#b3261e","tc-switch-font":"'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"},styles:{display:"block"},template:({props:e})=>{let t=!!e.error;return`
        <label class="row ${e.disabled?"is-disabled":""}">
          <button
            class="track ${e.checked?"on":""}"
            type="button"
            role="switch"
            aria-checked="${e.checked?"true":"false"}"
            ${e.disabled?"disabled":""}
            aria-invalid="${t?"true":"false"}"
          >
            <span class="thumb"></span>
          </button>
          ${e.label?`<span class="label">${B(e.label)}</span>`:""}
        </label>
        ${e.error||e.helper?`<div class="${t?"error":"helper"}">${B(e.error||e.helper)}</div>`:""}
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
      `},events:{"click .track":(e,t)=>{let r=t.host;r.disabled||(r.checked=!r.checked,r.internals?.setFormValue(r.checked?r.value:null),t.emit("tc-change",{checked:r.checked}))},"keydown .track":(e,t)=>{let r=e;if(r.key!==" "&&r.key!=="Enter")return;r.preventDefault();let n=t.host;n.disabled||(n.checked=!n.checked,n.internals?.setFormValue(n.checked?n.value:null),t.emit("tc-change",{checked:n.checked}))}},afterMount(){let e=this;e.internals?.setFormValue(e.checked?e.value:null)},formResetCallback(){this.checked=!1}}));function B(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var _="tc-table",U=_;f(_,u({props:{rows:{type:"json",default:[]},columns:{type:"json",default:[]},pageSize:{type:"number",default:10},filterable:{type:"boolean",default:!0},emptyText:{type:"string",default:"No results."},rowKey:{type:"string",default:"id"}},theme:{"tc-table-surface":"#ffffff","tc-table-ink":"#14171f","tc-table-soft":"#5a6072","tc-table-rule":"#ece5d3","tc-table-head-bg":"#faf8f3","tc-table-row-hover":"rgba(161, 105, 57, 0.05)","tc-table-accent":"#a16939","tc-table-radius":"10px","tc-table-font":"'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"},styles:{display:"block"},template:({props:e,state:t})=>{let r=e.columns??[],n=t,s=M(e,n),i=Math.max(1,Math.ceil(s.length/(e.pageSize??10))),d=Math.min(n.page??0,i-1),b=e.pageSize??10,a=s.slice(d*b,d*b+b),o=(e.rows??[]).length;return`
        ${e.filterable?`<input class="filter" placeholder="Search..." value="${w(n.q??"")}" />`:""}
        <div class="wrap">
          <table>
            <thead>
              <tr>
                ${r.map(l=>{let c=n.sortKey===l.key,p=l.sortable!==!1,g=c?n.sortDir==="asc"?"\u25B2":"\u25BC":"",m=c?n.sortDir==="asc"?"ascending":"descending":"none";return`<th
                    data-col="${w(l.key)}"
                    class="${p?"sortable":""}"
                    aria-sort="${m}"
                  >${w(l.label)}<span class="sort">${g}</span></th>`}).join("")}
              </tr>
            </thead>
            <tbody>
              ${a.length===0?`<tr class="empty"><td colspan="${r.length||1}">${w(e.emptyText)}</td></tr>`:a.map((l,c)=>`<tr data-row="${d*b+c}">${r.map(p=>`<td>${w(l[p.key]??"")}</td>`).join("")}</tr>`).join("")}
            </tbody>
          </table>
        </div>
        <footer class="pager">
          <span class="count">${s.length} of ${o} rows</span>
          <span class="spacer"></span>
          <button class="prev" type="button" ${d<=0?"disabled":""}>\u2039 prev</button>
          <span class="page">page ${d+1} of ${i}</span>
          <button class="next" type="button" ${d>=i-1?"disabled":""}>next \u203A</button>
        </footer>
        <style>
          :host { font-family: var(--tc-table-font); color: var(--tc-table-ink); }
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
            box-shadow: 0 0 0 3px rgba(161, 105, 57, 0.18);
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
        </style>
      `},events:{"input .filter":(e,t)=>{t.setState("q",e.target.value),t.setState("page",0)},"click .prev":(e,t)=>{let r=(t.state.page??0)-1;t.setState("page",Math.max(0,r))},"click .next":(e,t)=>{let r=t.state,n=M(t.props,r).length,s=t.props.pageSize??10,i=Math.max(0,Math.ceil(n/s)-1),d=(r.page??0)+1;t.setState("page",Math.min(i,d))},"click th.sortable":(e,t)=>{let r=e.target.closest("th");if(!r)return;let n=r.dataset.col;if(!n)return;let s=t.state,i;s.sortKey!==n?i="asc":i=s.sortDir==="asc"?"desc":s.sortDir==="desc"?null:"asc",t.setState("sortKey",i?n:null),t.setState("sortDir",i),t.emit("tc-sort-change",{key:i?n:null,direction:i})},"click tr[data-row]":(e,t)=>{let r=e.target.closest("tr[data-row]");if(!r)return;let n=Number(r.dataset.row??"-1");if(Number.isNaN(n)||n<0)return;let i=M(t.props,t.state)[n];i&&t.emit("tc-row-click",{row:i})}}}));function M(e,t){let r=e.rows??[],n=e.columns??[],s=(t.q??"").trim().toLowerCase(),i=s.length===0?r.slice():r.filter(d=>n.some(b=>String(d[b.key]??"").toLowerCase().includes(s)));if(t.sortKey&&t.sortDir){let d=t.sortKey,b=t.sortDir==="asc"?1:-1;i=i.slice().sort((a,o)=>{let l=a[d],c=o[d];return l===c?0:l==null?1:c==null?-1:typeof l=="number"&&typeof c=="number"?(l-c)*b:String(l).localeCompare(String(c))*b})}return i}function w(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Y="tc-tabs",Q=Y;f(Y,u({props:{tabs:{type:"json",default:[]},active:{type:"string",default:"",reflect:!0}},theme:{"tc-tabs-fg":"#14171f","tc-tabs-fg-muted":"#6b7280","tc-tabs-rule":"#ece5d3","tc-tabs-accent":"#a16939","tc-tabs-font":"'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"},styles:{display:"block","font-family":"var(--tc-tabs-font)"},template:({props:e})=>{let t=e.tabs??[],r=e.active||t[0]?.id||"";return`
        <div role="tablist" class="strip">
          ${t.map(n=>`<button
              role="tab"
              type="button"
              class="tab ${n.id===r?"active":""}"
              data-tab="${S(n.id)}"
              aria-selected="${n.id===r?"true":"false"}"
              aria-controls="panel-${S(n.id)}"
              tabindex="${n.id===r?"0":"-1"}"
            >${S(n.label)}</button>`).join("")}
        </div>
        <div class="panels">
          ${t.map(n=>`<section
              role="tabpanel"
              id="panel-${S(n.id)}"
              class="panel"
              aria-labelledby=""
              ${n.id===r?"":"hidden"}
            ><slot name="${S(n.id)}"></slot></section>`).join("")}
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
      `},events:{"click .tab":(e,t)=>{let r=e.target.closest(".tab");if(!r)return;let n=r.dataset.tab;if(!n)return;let s=t.host,i=s.active;i!==n&&(s.active=n,t.emit("tc-tab-change",{active:n,previous:i}))},"keydown .tab":(e,t)=>{let r=e,n=t.props.tabs??[];if(n.length===0)return;let s=t.host,i=s.active||n[0].id,d=n.findIndex(o=>o.id===i),b=d;if(r.key==="ArrowRight")b=(d+1)%n.length;else if(r.key==="ArrowLeft")b=(d-1+n.length)%n.length;else if(r.key==="Home")b=0;else if(r.key==="End")b=n.length-1;else return;r.preventDefault();let a=n[b].id;s.active=a,t.emit("tc-tab-change",{active:a,previous:i}),queueMicrotask(()=>{t.host.shadowRoot?.querySelector(`.tab[data-tab="${a}"]`)?.focus()})}}}));function S(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Z="tc-modal",ee=Z;f(Z,u({props:{open:{type:"boolean",default:!1,reflect:!0},title:{type:"string",default:""},dismissible:{type:"boolean",default:!0},width:{type:"string",default:"min(560px, 92vw)"}},theme:{"tc-modal-surface":"#ffffff","tc-modal-ink":"#14171f","tc-modal-rule":"#ece5d3","tc-modal-soft":"#5a6072","tc-modal-radius":"12px","tc-modal-backdrop":"rgba(20, 23, 31, 0.5)","tc-modal-shadow":"0 24px 60px rgba(20, 23, 31, 0.25)","tc-modal-font":"'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"},styles:{display:"contents"},template:({props:e})=>`
      <dialog class="dlg" aria-labelledby="${e.title?"title":""}">
        ${e.title||e.dismissible?`<header class="head">
              ${e.title?`<h2 id="title" class="title">${J(e.title)}</h2>`:"<span></span>"}
              ${e.dismissible?'<button class="x" type="button" aria-label="Close">\xD7</button>':""}
            </header>`:""}
        <div class="body"><slot></slot></div>
        <footer class="foot"><slot name="footer"></slot></footer>
      </dialog>
      <style>
        .dlg {
          width: ${J(e.width)};
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
    `,refs:{dialog:".dlg"},events:{"click .x":(e,t)=>{W(t.host,"button")},"click .dlg":(e,t)=>{let r=t.host;if(!r.dismissible)return;let n=t.refs.dialog;n&&e.target===n&&W(r,"backdrop")}},afterMount(){Le(this)}}));function Le(e){let t=e.shadowRoot;if(!t)return;let r=t.querySelector(".dlg");if(!r)return;let n=e.open;if(n&&!r.open){if(typeof r.showModal=="function")try{r.showModal()}catch{r.setAttribute("open","")}else r.setAttribute("open","");if(!X.has(e)){let s=()=>{let i=e;i.open&&(i.open=!1,e.dispatchEvent(new CustomEvent("tc-close",{detail:{reason:"escape"},bubbles:!0,composed:!0})))};r.addEventListener("close",s),X.set(e,s)}}else if(!n&&r.open)try{r.close()}catch{r.removeAttribute("open")}}function W(e,t){e.open&&(e.open=!1,e.dispatchEvent(new CustomEvent("tc-close",{detail:{reason:t},bubbles:!0,composed:!0})))}var X=new WeakMap;function J(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var re="tc-toast",ne=re,$=new WeakMap;f(re,u({props:{open:{type:"boolean",default:!1,reflect:!0},variant:{type:"string",default:"info"},message:{type:"string",default:""},duration:{type:"number",default:4e3},dismissible:{type:"boolean",default:!0}},theme:{"tc-toast-info":"#3a5b8c","tc-toast-success":"#207a5b","tc-toast-warning":"#a87326","tc-toast-error":"#b3261e","tc-toast-fg":"#ffffff","tc-toast-radius":"10px","tc-toast-shadow":"0 12px 30px rgba(20, 23, 31, 0.18)","tc-toast-font":"'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"},styles:{display:"block"},template:({props:e})=>{let t=String(e.variant??"info"),r=t==="success"?"\u2713":t==="warning"?"!":t==="error"?"\u2715":"i";return`
        <div class="toast v-${te(t)} ${e.open?"open":"closed"}" role="status" aria-live="polite">
          <span class="icon" aria-hidden="true">${r}</span>
          <span class="msg">${e.message?te(e.message):"<slot></slot>"}</span>
          ${e.dismissible?'<button type="button" class="x" aria-label="Close">\xD7</button>':""}
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
      `},events:{"click .x":(e,t)=>ae(t.host,"button")},afterMount(){Ae(this)},unmount(){let e=$.get(this);e!==void 0&&(clearTimeout(e),$.delete(this))}}));function Ae(e){let t=e,r=$.get(e);if(r!==void 0&&clearTimeout(r),$.delete(e),!t.open||!t.duration||t.duration<=0)return;let n=setTimeout(()=>{t.open&&ae(e,"timeout")},t.duration);$.set(e,n)}function ae(e,t){let r=e;r.open&&(r.open=!1,e.dispatchEvent(new CustomEvent("tc-toast-close",{detail:{reason:t},bubbles:!0,composed:!0})))}function te(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var se="tc-stat",oe=se;f(se,u({props:{label:{type:"string",default:""},value:{type:"string",default:""},delta:{type:"string",default:""},trend:{type:"string",default:"neutral"},prefix:{type:"string",default:""},suffix:{type:"string",default:""}},theme:{"tc-stat-surface":"#ffffff","tc-stat-rule":"#ece5d3","tc-stat-label":"#6b7280","tc-stat-value":"#14171f","tc-stat-up":"#207a5b","tc-stat-down":"#b3261e","tc-stat-neutral":"#6b7280","tc-stat-radius":"12px","tc-stat-font":"'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"},styles:{display:"block"},template:({props:e})=>{let t=String(e.trend??"neutral"),r=t==="up"?"\u25B2":t==="down"?"\u25BC":"\u2022";return`
        <div class="card">
          ${e.label?`<div class="label">${k(e.label)}</div>`:""}
          <div class="value">
            ${e.prefix?`<span class="prefix">${k(e.prefix)}</span>`:""}
            <span class="num">${k(e.value)}</span>
            ${e.suffix?`<span class="suffix">${k(e.suffix)}</span>`:""}
          </div>
          ${e.delta?`<div class="delta t-${k(t)}">
                  <span class="arrow" aria-hidden="true">${r}</span>
                  <span>${k(e.delta)}</span>
                </div>`:""}
        </div>
        <style>
          .card {
            background: var(--tc-stat-surface);
            border: 1px solid var(--tc-stat-rule);
            border-radius: var(--tc-stat-radius);
            padding: 18px 20px;
            font-family: var(--tc-stat-font);
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
      `}}));function k(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var le="tc-card",ce=le;f(le,u({props:{title:{type:"string",default:""},subtitle:{type:"string",default:""},padded:{type:"boolean",default:!0},bordered:{type:"boolean",default:!0},elevated:{type:"boolean",default:!1}},theme:{"tc-card-surface":"#ffffff","tc-card-ink":"#14171f","tc-card-soft":"#5a6072","tc-card-rule":"#ece5d3","tc-card-radius":"12px","tc-card-shadow":"0 8px 24px rgba(20, 23, 31, 0.06)","tc-card-font":"'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"},styles:{display:"block"},template:({props:e})=>`
      <div class="card ${e.bordered?"bordered":""} ${e.elevated?"elevated":""} ${e.padded?"padded":""}">
        <div class="media"><slot name="media"></slot></div>
        <div class="head">
          <slot name="header">
            ${e.title?`<div class="title">${ie(e.title)}</div>`:""}
            ${e.subtitle?`<div class="subtitle">${ie(e.subtitle)}</div>`:""}
          </slot>
        </div>
        <div class="body"><slot></slot></div>
        <div class="foot"><slot name="footer"></slot></div>
      </div>
      <style>
        .card {
          background: var(--tc-card-surface);
          color: var(--tc-card-ink);
          font-family: var(--tc-card-font);
          border-radius: var(--tc-card-radius);
          overflow: hidden;
        }
        .card.bordered { border: 1px solid var(--tc-card-rule); }
        .card.elevated { box-shadow: var(--tc-card-shadow); }
        .media { display: contents; }
        .media::slotted(*) {
          display: block; width: 100%;
        }
        .card.padded .head:has(::slotted(*)),
        .card.padded .head:has(.title),
        .card.padded .head:has(.subtitle) {
          padding: 18px 20px 8px;
        }
        .head:not(:has(*)) { display: none; }
        .title {
          font-weight: 700; font-size: 1.05rem;
          letter-spacing: -0.01em;
        }
        .subtitle {
          margin-top: 4px; font-size: 0.88rem;
          color: var(--tc-card-soft);
        }
        .card.padded .body { padding: 18px 20px; }
        .card.padded .head ~ .body { padding-top: 8px; }
        .foot:has(::slotted(*)) {
          padding: 12px 20px 16px;
          border-top: 1px solid var(--tc-card-rule);
          display: flex; gap: 8px; justify-content: flex-end;
        }
        .foot:not(:has(*)) { display: none; }
      </style>
    `}));function ie(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var ue="tc-badge",fe=ue;f(ue,u({props:{variant:{type:"string",default:"neutral"},size:{type:"string",default:"md"},pill:{type:"boolean",default:!1}},theme:{"tc-badge-radius":"6px","tc-badge-font":"'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif","tc-badge-neutral-bg":"#ece5d3","tc-badge-neutral-fg":"#14171f","tc-badge-info-bg":"#dde6f4","tc-badge-info-fg":"#1f3a66","tc-badge-success-bg":"#dbece2","tc-badge-success-fg":"#155b40","tc-badge-warning-bg":"#f5e7cf","tc-badge-warning-fg":"#7a4f0a","tc-badge-danger-bg":"#f4dad7","tc-badge-danger-fg":"#7a1a14"},styles:{display:"inline-block"},template:({props:e})=>`
      <span class="badge v-${de(e.variant)} s-${de(e.size)} ${e.pill?"pill":""}">
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
    `}));function de(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var be="tc-skeleton",ge=be;f(be,u({props:{width:{type:"string",default:"100%"},height:{type:"string",default:"1em"},rounded:{type:"boolean",default:!1},pulse:{type:"boolean",default:!0}},theme:{"tc-skeleton-base":"#ece5d3","tc-skeleton-shine":"rgba(255, 255, 255, 0.6)","tc-skeleton-radius":"6px"},styles:{display:"inline-block","vertical-align":"middle"},template:({props:e})=>`
      <span
        class="bone ${e.pulse?"pulse":""} ${e.rounded?"round":""}"
        aria-hidden="true"
        style="width: ${pe(e.width)}; height: ${pe(e.height)};"
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
    `}));function pe(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var St={button:j,input:q,select:F,checkbox:V,switch:G,table:U,tabs:Q,modal:ee,toast:ne,stat:oe,card:ce,badge:fe,skeleton:ge};export{St as tags};
//# sourceMappingURL=mod.kit.js.map
