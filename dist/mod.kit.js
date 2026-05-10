var qe=["beforeMount","afterMount","afterRender","unmount","action","formAssociatedCallback","formDisabledCallback","formResetCallback","formStateRestoreCallback"],De=new Set(["string","number","boolean","json"]);function i(e){if(e===null||typeof e!="object")throw new TypeError("describe(): options must be an object");if(e.tag!==void 0&&typeof e.tag!="string")throw new TypeError("describe(): `tag` must be a string");if(e.className!==void 0&&typeof e.className!="string")throw new TypeError("describe(): `className` must be a string");if(e.template!==void 0&&typeof e.template!="string"&&typeof e.template!="function")throw new TypeError("describe(): `template` must be a string or function");if(e.children!==void 0&&!Array.isArray(e.children))throw new TypeError("describe(): `children` must be an array");if(e.emit!==void 0&&!Array.isArray(e.emit))throw new TypeError("describe(): `emit` must be an array");if(e.observedAttributes!==void 0&&(!Array.isArray(e.observedAttributes)||e.observedAttributes.some(t=>typeof t!="string")))throw new TypeError("describe(): `observedAttributes` must be an array of strings");for(let t of["theme","styles","attributes","events","refs"]){let r=e[t];if(r!==void 0&&(r===null||typeof r!="object"||Array.isArray(r)))throw new TypeError(`describe(): \`${t}\` must be a record`)}if(e.refs!==void 0){for(let[t,r]of Object.entries(e.refs))if(typeof r!="string")throw new TypeError(`describe(): refs.${t} must be a CSS selector string`)}if(e.formAssociated!==void 0&&typeof e.formAssociated!="boolean")throw new TypeError("describe(): `formAssociated` must be a boolean");for(let t of qe){let r=e[t];if(r!==void 0&&typeof r!="function")throw new TypeError(`describe(): \`${t}\` must be a function`)}if(e.if!==void 0&&typeof e.if!="function")throw new TypeError("describe(): `if` must be a function");if(e.for!==void 0){let t=e.for;if(t===null||typeof t!="object"||Array.isArray(t))throw new TypeError("describe(): `for` must be a record");if(typeof t.items!="function")throw new TypeError("describe(): `for.items` must be a function");if(typeof t.key!="function")throw new TypeError("describe(): `for.key` must be a function");if(typeof t.render!="function")throw new TypeError("describe(): `for.render` must be a function")}if(e.props!==void 0){let t=e.props;if(t===null||typeof t!="object"||Array.isArray(t))throw new TypeError("describe(): `props` must be a record");for(let[r,a]of Object.entries(t)){if(a===null||typeof a!="object"||Array.isArray(a))throw new TypeError(`describe(): props.${r} must be a record`);if(!De.has(a.type))throw new TypeError(`describe(): props.${r}.type must be one of "string", "number", "boolean", "json"`)}}return{...e}}var I=new Map,Ne=/^[a-z][a-z0-9]*(-[a-z0-9]+)+$/,je=/^(\S+)(?:\s+(.+))?$/;function c(e,t){if(typeof e!="string"||!Ne.test(e))throw new TypeError(`build(): "${e}" is not a valid custom element name (must be lowercase and contain a hyphen).`);if(I.has(e))return console.warn(`Component "${e}" is already registered. Skipping re-registration.`),e;if(typeof HTMLElement>"u"||typeof customElements>"u")return console.warn("HTMLElement or customElements not available; skipping component registration."),e;let r=Array.from(new Set([...t.observedAttributes??[],...Object.keys(t.props??{})])),a=t.props??{},n=t.refs??{},s=Ve(t);class d extends HTMLElement{static get observedAttributes(){return r}static get formAssociated(){return t.formAssociated===!0}isMounted=!1;mountCleanups=[];renderCleanups=[];state=new Map;propValues=new Map;listSlots=new WeakMap;currentRefs={};container;ctx;rendering=!1;renderQueued=!1;internals;constructor(){super();let o=this.attachShadow({mode:"open"});t.formAssociated&&typeof this.attachInternals=="function"&&(this.internals=this.attachInternals()),Be(o,s),this.container=document.createElement("div"),this.container.className=t.className?`container ${t.className}`:"container",o.appendChild(this.container),t.attributes&&j(this,t.attributes),this.ctx=Fe(this,this.propValues,this.state,()=>this.currentRefs),this.initProps()}get refs(){return this.currentRefs}initProps(){for(let[o,l]of Object.entries(a)){let u=this.getAttribute(o),p=u!==null?H(u,l.type):l.default;this.propValues.set(o,p),this.maybeSyncFormValue(o,p),Object.defineProperty(this,o,{configurable:!0,enumerable:!0,get:()=>this.propValues.get(o),set:b=>{let g=_e(b,l.type),m=this.propValues.get(o);Object.is(m,g)||(this.propValues.set(o,g),l.reflect&&Ke(this,o,g,l.type),this.maybeSyncFormValue(o,g),this.isMounted&&this.scheduleRender())}})}}maybeSyncFormValue(o,l){if(!this.internals||o!=="value")return;let u=l==null?null:String(l);this.internals.setFormValue(u)}connectedCallback(){if(!this.isMounted){try{t.beforeMount?.call(this)}catch(o){console.error(`[tan-compose] beforeMount threw for <${e}>:`,o)}if(this.renderInternal(),t.action){let o=t.action;this.addEventListener("click",o),this.mountCleanups.push(()=>this.removeEventListener("click",o))}if(t.emit)for(let o of t.emit)this.addEventListener(o.name,o.handler),this.mountCleanups.push(()=>this.removeEventListener(o.name,o.handler));t.events&&this.attachDelegatedEvents(t.events),this.isMounted=!0;try{t.afterMount?.call(this)}catch(o){console.error(`[tan-compose] afterMount threw for <${e}>:`,o)}}}disconnectedCallback(){try{t.unmount?.call(this)}catch(o){console.error(`[tan-compose] unmount threw for <${e}>:`,o)}v(this.mountCleanups),v(this.renderCleanups),this.flushListSlots(),this.isMounted=!1}flushListSlots(){N(t,o=>{let l=this.listSlots.get(o);if(l){for(let u of l.cache.values())v(u.cleanups);l.cache.clear()}})}attributeChangedCallback(o,l,u){if(l!==u){if(Object.prototype.hasOwnProperty.call(a,o)){let p=a[o],b=u!==null?H(u,p.type):p.default,g=this.propValues.get(o);Object.is(g,b)||(this.propValues.set(o,b),this.isMounted&&this.scheduleRender());return}this.state.set(o,u),this.isMounted&&this.scheduleRender()}}setState(o,l){let u=this.state.get(o);Object.is(u,l)||(this.state.set(o,l),this.isMounted&&this.scheduleRender())}getState(o){return this.state.get(o)}render(){this.renderInternal()}emitEvent(o,l){this.dispatchEvent(new CustomEvent(o,{detail:l,bubbles:!0,composed:!0}))}scheduleRender(){if(this.rendering){this.renderQueued=!0;return}this.renderInternal()}getOrCreateSlot(o){let l=this.listSlots.get(o);return l||(l={cache:new Map},this.listSlots.set(o,l)),l}renderInternal(){this.rendering=!0;try{v(this.renderCleanups),this.container.replaceChildren();let o={host:this,cleanups:this.renderCleanups,ctx:this.ctx};if(t.template!==void 0){let l=typeof t.template=="function"?t.template(this.ctx):t.template;l&&(this.container.innerHTML=l)}if(t.children)for(let l of t.children){let u=q(l,o,p=>this.getOrCreateSlot(p));u&&this.container.appendChild(u)}this.container.appendChild(document.createElement("slot")),this.refreshRefs()}finally{this.rendering=!1}if(this.renderQueued){this.renderQueued=!1,this.renderInternal();return}try{t.afterRender?.call(this)}catch(o){console.error(`[tan-compose] afterRender threw for <${e}>:`,o)}}refreshRefs(){let o={},l=this.shadowRoot;for(let[u,p]of Object.entries(n))o[u]=l?l.querySelector(p):null;this.currentRefs=o}formAssociatedCallback(o){try{t.formAssociatedCallback?.call(this,o)}catch(l){console.error(`[tan-compose] formAssociatedCallback threw for <${e}>:`,l)}}formDisabledCallback(o){try{t.formDisabledCallback?.call(this,o)}catch(l){console.error(`[tan-compose] formDisabledCallback threw for <${e}>:`,l)}}formResetCallback(){try{t.formResetCallback?.call(this)}catch(o){console.error(`[tan-compose] formResetCallback threw for <${e}>:`,o)}}formStateRestoreCallback(o,l){try{t.formStateRestoreCallback?.call(this,o,l)}catch(u){console.error(`[tan-compose] formStateRestoreCallback threw for <${e}>:`,u)}}attachDelegatedEvents(o){let l=new Map;for(let[u,p]of Object.entries(o)){let b=je.exec(u.trim());if(!b)continue;let[,g,m]=b;l.has(g)||l.set(g,[]),l.get(g).push({selector:m??null,handler:p})}for(let[u,p]of l){let b=g=>{for(let{selector:m,handler:C}of p){if(!m){C(g,this.ctx);continue}let He=g.composedPath();for(let T of He){if(T===this.shadowRoot||T===this)break;if(T instanceof Element&&this.shadowRoot?.contains(T)&&T.matches(m)){C(g,this.ctx);break}}}};this.shadowRoot.addEventListener(u,b),this.mountCleanups.push(()=>this.shadowRoot?.removeEventListener(u,b))}}}return I.set(e,d),customElements.define(e,d),e}function q(e,t,r){return e.if&&!e.if(t.ctx)?null:D(e,t,r)}function D(e,t,r){let a=document.createElement(e.tag||"div");if(e.styles&&(a.style.cssText=Object.entries(e.styles).map(([n,s])=>`${n}: ${s}`).join("; ")),e.className&&(a.className=e.className),e.attributes&&j(a,e.attributes),e.template!==void 0){let n=typeof e.template=="function"?e.template(t.ctx):e.template;n&&(a.innerHTML=n)}if(e.children)for(let n of e.children){let s=q(n,t,r);s&&a.appendChild(s)}if(e.for&&Oe(a,e,t,r),e.action){let n=e.action;a.addEventListener("click",n),t.cleanups.push(()=>a.removeEventListener("click",n))}if(e.emit)for(let n of e.emit)a.addEventListener(n.name,n.handler),t.cleanups.push(()=>a.removeEventListener(n.name,n.handler));return a}function Oe(e,t,r,a){let n=t.for,s=a(t),d=n.items(r.ctx),f=new Map;for(let o=0;o<d.length;o++){let l=d[o],u=n.key(l,o),p,b=s.cache.get(u);if(b&&Object.is(b.lastItem,l))p=b;else{let g=[],m=n.render(l,o,r.ctx),C=D(m,{...r,cleanups:g},a);b&&v(b.cleanups),p={element:C,lastItem:l,cleanups:g}}f.set(u,p),e.appendChild(p.element)}for(let[o,l]of s.cache)f.has(o)||v(l.cleanups);s.cache=f}function N(e,t){if(e.for&&t(e),e.children)for(let r of e.children)N(r,t)}function Fe(e,t,r,a){return{host:e,get props(){let n={};for(let[s,d]of t)n[s]=d;return n},get state(){let n={};for(let[s,d]of r)n[s]=d;return n},get refs(){return a()},setState:(n,s)=>e.setState(n,s),getState:n=>e.getState(n),emit:(n,s)=>e.emitEvent(n,s)}}function Ve(e){let t=e.theme?Ge(e.theme):void 0,r=e.styles?Pe(e.styles):void 0;if(!t&&!r)return{kind:"adopted",sheets:[]};if(typeof CSSStyleSheet<"u"&&typeof CSSStyleSheet.prototype.replaceSync=="function"){let n=[];if(t){let s=new CSSStyleSheet;s.replaceSync(t),n.push(s)}if(r){let s=new CSSStyleSheet;s.replaceSync(r),n.push(s)}return{kind:"adopted",sheets:n}}return{kind:"fallback",theme:t,styles:r}}function Be(e,t){if(t.kind==="adopted"){if(t.sheets.length>0)try{e.adoptedStyleSheets=t.sheets}catch{}return}if(t.theme){let r=document.createElement("style");r.textContent=t.theme,e.appendChild(r)}if(t.styles){let r=document.createElement("style");r.textContent=t.styles,e.appendChild(r)}}function j(e,t){for(let[r,a]of Object.entries(t))e.setAttribute(r,a)}function Ge(e){return`:host { ${Object.entries(e).map(([r,a])=>`--${r}: ${a};`).join(" ")} }`}function Pe(e){return`.container { ${Object.entries(e).map(([r,a])=>`${r}: ${a};`).join(" ")} }`}function v(e){for(;e.length>0;){let t=e.pop();try{t?.()}catch(r){console.error("[tan-compose] cleanup threw:",r)}}}function H(e,t){switch(t){case"string":return e;case"number":{let r=Number(e);return Number.isNaN(r)?void 0:r}case"boolean":return e!=="false"&&e!=="0";case"json":try{return JSON.parse(e)}catch{return}}}function _e(e,t){switch(t){case"string":return e==null?e:String(e);case"number":return e==null?e:Number(e);case"boolean":return!!e;case"json":return e}}function Ke(e,t,r,a){if(a!=="json"){if(a==="boolean"){r?e.setAttribute(t,""):e.removeAttribute(t);return}if(r==null){e.removeAttribute(t);return}e.setAttribute(t,String(r))}}var F="tc-button",V=F;c(F,i({props:{variant:{type:"string",default:"primary"},size:{type:"string",default:"md"},disabled:{type:"boolean",default:!1,reflect:!0},loading:{type:"boolean",default:!1},block:{type:"boolean",default:!1}},theme:{"tc-btn-primary-bg":"var(--tc-color-ink, #14171f)","tc-btn-primary-fg":"var(--tc-color-surface, #ffffff)","tc-btn-secondary-bg":"var(--tc-color-surface, #ffffff)","tc-btn-secondary-fg":"var(--tc-color-ink, #14171f)","tc-btn-secondary-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-btn-ghost-fg":"var(--tc-color-ink, #14171f)","tc-btn-ghost-border":"transparent","tc-btn-danger-bg":"var(--tc-color-danger, #b3261e)","tc-btn-danger-fg":"var(--tc-color-surface, #ffffff)","tc-btn-radius":"var(--tc-radius-md, 8px)","tc-btn-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"inline-block","vertical-align":"middle"},template:({props:e})=>`
      <button
        part="button"
        class="root v-${O(e.variant)} s-${O(e.size)}${e.block?" block":""}"
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
    `}));function O(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var B="tc-input",G=B;c(B,i({formAssociated:!0,props:{value:{type:"string",default:""},name:{type:"string",default:""},type:{type:"string",default:"text"},placeholder:{type:"string",default:""},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0}},theme:{"tc-input-bg":"var(--tc-color-surface, #ffffff)","tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-border-focus":"var(--tc-color-accent, #a16939)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-radius":"var(--tc-radius-md, 8px)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},refs:{input:"input"},template:({props:e})=>{let t=!!e.error;return`
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
      `},events:{"input input":(e,t)=>{let r=e.target.value,a=t.host;a.internals?.setFormValue(r),a.value=r,t.emit("tc-input",{value:r})}},formResetCallback(){this.value=""}}));function y(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var P="tc-textarea",_=P;c(P,i({formAssociated:!0,props:{value:{type:"string",default:""},name:{type:"string",default:""},placeholder:{type:"string",default:""},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},rows:{type:"number",default:4},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0},resize:{type:"string",default:"vertical"}},theme:{"tc-input-bg":"var(--tc-color-surface, #ffffff)","tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-border-focus":"var(--tc-color-accent, #a16939)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-radius":"var(--tc-radius-md, 8px)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},refs:{input:"textarea"},template:({props:e})=>{let t=!!e.error;return`
        ${e.label?`<label class="label">${h(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</label>`:""}
        <textarea
          class="input ${t?"invalid":""}"
          part="textarea"
          name="${h(e.name)}"
          placeholder="${h(e.placeholder)}"
          rows="${h(e.rows)}"
          ${e.disabled?"disabled":""}
          ${e.required?"required":""}
          aria-invalid="${t?"true":"false"}"
          style="resize: ${h(e.resize)};"
        >${h(e.value)}</textarea>
        ${e.error||e.helper?`<div class="${t?"error":"helper"}">${h(e.error||e.helper)}</div>`:""}
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
      `},events:{"input textarea":(e,t)=>{let r=e.target.value,a=t.host;a.internals?.setFormValue(r),a.value=r,t.emit("tc-input",{value:r})}},formResetCallback(){this.value=""}}));function h(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var K="tc-select",U=K;c(K,i({formAssociated:!0,props:{value:{type:"string",default:""},name:{type:"string",default:""},options:{type:"json",default:[]},placeholder:{type:"string",default:""},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0}},theme:{"tc-input-bg":"var(--tc-color-surface, #ffffff)","tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-border-focus":"var(--tc-color-accent, #a16939)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-radius":"var(--tc-radius-md, 8px)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},template:({props:e})=>{let t=e.options??[],r=!!e.error;return`
        ${e.label?`<label class="label">${x(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</label>`:""}
        <div class="wrap">
          <select
            class="select ${r?"invalid":""}"
            part="select"
            name="${x(e.name)}"
            ${e.disabled?"disabled":""}
            ${e.required?"required":""}
            aria-invalid="${r?"true":"false"}"
          >
            ${e.placeholder?`<option value="" disabled ${e.value===""?"selected":""}>${x(e.placeholder)}</option>`:""}
            ${t.map(a=>`<option value="${x(a.value)}"${a.disabled?" disabled":""}${a.value===e.value?" selected":""}>${x(a.label)}</option>`).join("")}
          </select>
          <span class="caret" aria-hidden="true">\u25BE</span>
        </div>
        ${e.error||e.helper?`<div class="${r?"error":"helper"}">${x(e.error||e.helper)}</div>`:""}
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
      `},events:{"change select":(e,t)=>{let r=e.target.value,a=t.host;a.internals?.setFormValue(r),a.value=r,t.emit("tc-change",{value:r})}},formResetCallback(){this.value=""}}));function x(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Y="tc-checkbox",W=Y;c(Y,i({formAssociated:!0,props:{checked:{type:"boolean",default:!1,reflect:!0},name:{type:"string",default:""},value:{type:"string",default:"on"},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0},indeterminate:{type:"boolean",default:!1}},theme:{"tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-border-focus":"var(--tc-color-accent, #a16939)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-radius":"var(--tc-radius-sm, 4px)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-checkbox-accent":"var(--tc-color-accent, #a16939)"},styles:{display:"block"},template:({props:e})=>{let t=!!e.error;return`
        <label class="row ${e.disabled?"is-disabled":""} ${t?"is-invalid":""}">
          <input
            class="cb"
            type="checkbox"
            name="${L(e.name)}"
            value="${L(e.value)}"
            ${e.checked?"checked":""}
            ${e.disabled?"disabled":""}
            ${e.required?"required":""}
            aria-invalid="${t?"true":"false"}"
          />
          ${e.label?`<span class="label">${L(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</span>`:"<span></span>"}
        </label>
        ${e.error||e.helper?`<div class="${t?"error":"helper"}">${L(e.error||e.helper)}</div>`:""}
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
      `},refs:{input:".cb"},events:{"change .cb":(e,t)=>{let r=e.target.checked,a=t.host;a.checked=r,a.internals?.setFormValue(r?a.value:null),t.emit("tc-change",{checked:r})}},afterMount(){let e=this,r=e.shadowRoot?.querySelector(".cb");r&&(r.indeterminate=e.indeterminate),e.internals?.setFormValue(e.checked?e.value:null)},formResetCallback(){this.checked=!1}}));function L(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var X="tc-switch",J=X;c(X,i({formAssociated:!0,props:{checked:{type:"boolean",default:!1,reflect:!0},name:{type:"string",default:""},value:{type:"string",default:"on"},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},disabled:{type:"boolean",default:!1,reflect:!0}},theme:{"tc-switch-track-off":"var(--tc-color-rule-strong, #d9cfb8)","tc-switch-track-on":"var(--tc-color-accent, #a16939)","tc-switch-thumb":"var(--tc-color-surface, #ffffff)","tc-switch-fg":"var(--tc-color-ink, #14171f)","tc-switch-helper":"var(--tc-color-ink-muted, #6b7280)","tc-switch-error":"var(--tc-color-danger, #b3261e)","tc-switch-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},template:({props:e})=>{let t=!!e.error;return`
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
          ${e.label?`<span class="label">${Q(e.label)}</span>`:""}
        </label>
        ${e.error||e.helper?`<div class="${t?"error":"helper"}">${Q(e.error||e.helper)}</div>`:""}
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
      `},events:{"click .track":(e,t)=>{let r=t.host;r.disabled||(r.checked=!r.checked,r.internals?.setFormValue(r.checked?r.value:null),t.emit("tc-change",{checked:r.checked}))},"keydown .track":(e,t)=>{let r=e;if(r.key!==" "&&r.key!=="Enter")return;r.preventDefault();let a=t.host;a.disabled||(a.checked=!a.checked,a.internals?.setFormValue(a.checked?a.value:null),t.emit("tc-change",{checked:a.checked}))}},afterMount(){let e=this;e.internals?.setFormValue(e.checked?e.value:null)},formResetCallback(){this.checked=!1}}));function Q(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Z="tc-file",ee=Z;c(Z,i({formAssociated:!0,props:{name:{type:"string",default:""},accept:{type:"string",default:""},multiple:{type:"boolean",default:!1,reflect:!0},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},buttonText:{type:"string",default:"Choose file"},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0}},theme:{"tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-border-focus":"var(--tc-color-accent, #a16939)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-radius":"var(--tc-radius-md, 8px)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-file-zone-bg":"var(--tc-color-surface-alt, #faf8f3)","tc-file-zone-fg":"var(--tc-color-ink-soft, #4a5061)"},styles:{display:"block"},refs:{input:"input[type='file']"},template:({props:e,state:t})=>{let r=!!e.error,a=t.files??[],n=a.length===0?"No file selected":a.length===1?k(a[0].name):`${a.length} files selected`;return`
        ${e.label?`<label class="label">${k(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</label>`:""}
        <div class="zone ${e.disabled?"is-disabled":""} ${r?"is-invalid":""}">
          <button class="btn" type="button" ${e.disabled?"disabled":""}>
            ${k(e.buttonText)}
          </button>
          <span class="files">${n}</span>
          <input
            class="native"
            type="file"
            name="${k(e.name)}"
            accept="${k(e.accept)}"
            ${e.multiple?"multiple":""}
            ${e.disabled?"disabled":""}
            ${e.required?"required":""}
            tabindex="-1"
            aria-hidden="true"
          />
        </div>
        ${e.error||e.helper?`<div class="${r?"error":"helper"}">${k(e.error||e.helper)}</div>`:""}
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
      `},events:{"click .btn":(e,t)=>{t.refs.input?.click()},"change input[type='file']":(e,t)=>{let r=e.target,a=Array.from(r.files??[]);t.setState("files",a);let n=t.host;if(n.internals)if(a.length===0)n.internals.setFormValue(null);else if(a.length===1)n.internals.setFormValue(a[0]);else{let s=new FormData,d=n.name;for(let f of a)s.append(d,f);n.internals.setFormValue(s)}t.emit("tc-files",{files:a})}},formResetCallback(){let t=this.shadowRoot?.querySelector(".native");t&&(t.value=""),this.setState("files",[])}}));function k(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var te="tc-radio-group",re=te;c(te,i({formAssociated:!0,props:{value:{type:"string",default:""},name:{type:"string",default:""},options:{type:"json",default:[]},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},layout:{type:"string",default:"vertical"},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0}},theme:{"tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-radio-accent":"var(--tc-color-accent, #a16939)"},styles:{display:"block"},template:({props:e})=>{let t=e.options??[],r=!!e.error,a=String(e.layout??"vertical");return`
        <fieldset class="group" ${e.disabled?"disabled":""}>
          ${e.label?`<legend class="legend">${w(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</legend>`:""}
          <div class="opts l-${w(a)}" role="radiogroup" aria-invalid="${r?"true":"false"}">
            ${t.map((n,s)=>`<label class="opt ${n.disabled?"is-disabled":""}">
                  <input
                    type="radio"
                    class="r"
                    name="${w(e.name)||`__rg_${s}__`}"
                    value="${w(n.value)}"
                    ${n.value===e.value?"checked":""}
                    ${n.disabled||e.disabled?"disabled":""}
                  />
                  <span>${w(n.label)}</span>
                </label>`).join("")}
          </div>
        </fieldset>
        ${e.error||e.helper?`<div class="${r?"error":"helper"}">${w(e.error||e.helper)}</div>`:""}
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
      `},events:{"change input.r":(e,t)=>{let r=e.target.value,a=t.host;a.value=r,a.internals?.setFormValue(r),t.emit("tc-change",{value:r})}},afterMount(){let e=this;e.value&&e.internals?.setFormValue(e.value)},formResetCallback(){this.value=""}}));function w(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var ne="tc-table",oe=ne,Ue=`
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
`;c(ne,i({props:{rows:{type:"json",default:[]},columns:{type:"json",default:[]},pageSize:{type:"number",default:10},filterable:{type:"boolean",default:!0},emptyText:{type:"string",default:"No results."},rowKey:{type:"string",default:"id"}},theme:{"tc-table-surface":"var(--tc-color-surface, #ffffff)","tc-table-ink":"var(--tc-color-ink, #14171f)","tc-table-soft":"var(--tc-color-ink-soft, #5a6072)","tc-table-rule":"var(--tc-color-rule, #ece5d3)","tc-table-head-bg":"var(--tc-color-surface-alt, #faf8f3)","tc-table-row-hover":"rgba(161, 105, 57, 0.05)","tc-table-accent":"var(--tc-color-accent, #a16939)","tc-table-radius":"var(--tc-radius-lg, 10px)","tc-table-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},children:[i({tag:"style",template:Ue}),i({if:({props:e})=>!!e.filterable,tag:"input",className:"filter",attributes:{placeholder:"Search...",type:"text"}}),i({tag:"div",className:"wrap",children:[i({tag:"table",children:[i({tag:"thead",template:({props:e,state:t})=>{let r=e.columns??[],a=t;return`<tr>${r.map(n=>{let s=a.sortKey===n.key,d=n.sortable!==!1,f=s?a.sortDir==="asc"?"\u25B2":"\u25BC":"",o=s?a.sortDir==="asc"?"ascending":"descending":"none";return`<th
                        data-col="${R(n.key)}"
                        class="${d?"sortable":""}"
                        aria-sort="${o}"
                      >${R(n.label)}<span class="sort">${f}</span></th>`}).join("")}</tr>`}}),i({tag:"tbody",children:[i({tag:"tr",className:"empty",if:({props:e,state:t})=>ae(e,t).length===0,template:({props:e})=>`<td colspan="${(e.columns??[]).length||1}">${R(e.emptyText)}</td>`})],for:{items:({props:e,state:t})=>ae(e,t),key:(e,t)=>e["id"]??t,render:(e,t,r)=>{let n=r.props.columns??[],s=e;return i({tag:"tr",attributes:{"data-row-id":String(s.id??t)},template:n.map(d=>`<td>${R(s[d.key]??"")}</td>`).join("")})}}})]})]}),i({tag:"footer",className:"pager",template:({props:e,state:t})=>{let r=t,a=A(e,r),n=e.pageSize??10,s=Math.max(1,Math.ceil(a.length/n)),d=Math.min(r.page??0,s-1),f=(e.rows??[]).length;return`
            <span class="count">${a.length} of ${f} rows</span>
            <span class="spacer"></span>
            <button class="prev" type="button" ${d<=0?"disabled":""}>\u2039 prev</button>
            <span class="page">page ${d+1} of ${s}</span>
            <button class="next" type="button" ${d>=s-1?"disabled":""}>next \u203A</button>
          `}})],refs:{filter:".filter"},afterRender(){let e=this,t=e.refs.filter;if(!t)return;let r=e.getState("q")??"";t.value!==r&&(t.value=r);let a=z.get(e);if(a){z.delete(e),t.focus();let n=Math.min(a.caret,t.value.length);try{t.setSelectionRange(n,n)}catch{}}},events:{"input .filter":(e,t)=>{let r=e.target;z.set(t.host,{caret:r.selectionStart??r.value.length}),t.setState("q",r.value),t.setState("page",0)},"click .prev":(e,t)=>{let r=(t.state.page??0)-1;t.setState("page",Math.max(0,r))},"click .next":(e,t)=>{let r=t.state,a=A(t.props,r).length,n=t.props.pageSize??10,s=Math.max(0,Math.ceil(a/n)-1),d=(r.page??0)+1;t.setState("page",Math.min(s,d))},"click th.sortable":(e,t)=>{let r=e.target.closest("th");if(!r)return;let a=r.dataset.col;if(!a)return;let n=t.state,s;n.sortKey!==a?s="asc":s=n.sortDir==="asc"?"desc":n.sortDir==="desc"?null:"asc",t.setState("sortKey",s?a:null),t.setState("sortDir",s),t.emit("tc-sort-change",{key:s?a:null,direction:s})},"click tr[data-row-id]":(e,t)=>{let r=e.target.closest("tr[data-row-id]");if(!r)return;let a=r.dataset.rowId;if(a===void 0)return;let n=A(t.props,t.state),s=n.find(d=>String(d.id)===a)??n[Number(a)];s&&t.emit("tc-row-click",{row:s})}}}));var z=new WeakMap;function A(e,t){let r=e.rows??[],a=e.columns??[],n=(t.q??"").trim().toLowerCase(),s=n.length===0?r.slice():r.filter(d=>a.some(f=>String(d[f.key]??"").toLowerCase().includes(n)));if(t.sortKey&&t.sortDir){let d=t.sortKey,f=t.sortDir==="asc"?1:-1;s=s.slice().sort((o,l)=>{let u=o[d],p=l[d];return u===p?0:u==null?1:p==null?-1:typeof u=="number"&&typeof p=="number"?(u-p)*f:String(u).localeCompare(String(p))*f})}return s}function ae(e,t){let r=e.pageSize??10,a=A(e,t),n=Math.max(1,Math.ceil(a.length/r)),s=Math.min(t.page??0,n-1);return a.slice(s*r,s*r+r)}function R(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var se="tc-tabs",le=se;c(se,i({props:{tabs:{type:"json",default:[]},active:{type:"string",default:"",reflect:!0}},theme:{"tc-tabs-fg":"var(--tc-color-ink, #14171f)","tc-tabs-fg-muted":"var(--tc-color-ink-muted, #6b7280)","tc-tabs-rule":"var(--tc-color-rule, #ece5d3)","tc-tabs-accent":"var(--tc-color-accent, #a16939)","tc-tabs-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block","font-family":"var(--tc-tabs-font)"},template:({props:e})=>{let t=e.tabs??[],r=e.active||t[0]?.id||"";return`
        <div role="tablist" class="strip">
          ${t.map(a=>`<button
              role="tab"
              type="button"
              class="tab ${a.id===r?"active":""}"
              data-tab="${E(a.id)}"
              aria-selected="${a.id===r?"true":"false"}"
              aria-controls="panel-${E(a.id)}"
              tabindex="${a.id===r?"0":"-1"}"
            >${E(a.label)}</button>`).join("")}
        </div>
        <div class="panels">
          ${t.map(a=>`<section
              role="tabpanel"
              id="panel-${E(a.id)}"
              class="panel"
              aria-labelledby=""
              ${a.id===r?"":"hidden"}
            ><slot name="${E(a.id)}"></slot></section>`).join("")}
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
      `},events:{"click .tab":(e,t)=>{let r=e.target.closest(".tab");if(!r)return;let a=r.dataset.tab;if(!a)return;let n=t.host,s=n.active;s!==a&&(n.active=a,t.emit("tc-tab-change",{active:a,previous:s}))},"keydown .tab":(e,t)=>{let r=e,a=t.props.tabs??[];if(a.length===0)return;let n=t.host,s=n.active||a[0].id,d=a.findIndex(l=>l.id===s),f=d;if(r.key==="ArrowRight")f=(d+1)%a.length;else if(r.key==="ArrowLeft")f=(d-1+a.length)%a.length;else if(r.key==="Home")f=0;else if(r.key==="End")f=a.length-1;else return;r.preventDefault();let o=a[f].id;n.active=o,t.emit("tc-tab-change",{active:o,previous:s}),queueMicrotask(()=>{t.host.shadowRoot?.querySelector(`.tab[data-tab="${o}"]`)?.focus()})}}}));function E(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var de="tc-modal",ue=de;c(de,i({props:{open:{type:"boolean",default:!1,reflect:!0},title:{type:"string",default:""},dismissible:{type:"boolean",default:!0},width:{type:"string",default:"min(560px, 92vw)"}},theme:{"tc-modal-surface":"var(--tc-color-surface, #ffffff)","tc-modal-ink":"var(--tc-color-ink, #14171f)","tc-modal-rule":"var(--tc-color-rule, #ece5d3)","tc-modal-soft":"var(--tc-color-ink-soft, #5a6072)","tc-modal-radius":"var(--tc-radius-lg, 12px)","tc-modal-backdrop":"rgba(20, 23, 31, 0.5)","tc-modal-shadow":"var(--tc-shadow-lg, 0 24px 60px rgba(20, 23, 31, 0.25))","tc-modal-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"contents"},template:({props:e})=>`
      <dialog class="dlg" aria-labelledby="${e.title?"title":""}">
        ${e.title||e.dismissible?`<header class="head">
              ${e.title?`<h2 id="title" class="title">${ce(e.title)}</h2>`:"<span></span>"}
              ${e.dismissible?'<button class="x" type="button" aria-label="Close">\xD7</button>':""}
            </header>`:""}
        <div class="body"><slot></slot></div>
        <footer class="foot"><slot name="footer"></slot></footer>
      </dialog>
      <style>
        .dlg {
          width: ${ce(e.width)};
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
    `,refs:{dialog:".dlg"},events:{"click .x":(e,t)=>{ie(t.host,"button")},"click .dlg":(e,t)=>{let r=t.host;if(!r.dismissible)return;let a=t.refs.dialog;a&&e.target===a&&ie(r,"backdrop")}},afterRender(){Ye(this)},unmount(){let e=$.get(this);e&&(e.cleanup(),$.delete(this))}}));var $=new WeakMap;function Ye(e){let t=e.shadowRoot;if(!t)return;let r=t.querySelector(".dlg");if(!r)return;let a=e.open,n=$.get(e);if(n&&n.dialog!==r&&(n.cleanup(),$.delete(e)),a&&!r.open){if(typeof r.showModal=="function")try{r.showModal()}catch{r.setAttribute("open","")}else r.setAttribute("open","");if(!$.has(e)){let s=()=>{let d=e;d.open&&(d.open=!1,e.dispatchEvent(new CustomEvent("tc-close",{detail:{reason:"escape"},bubbles:!0,composed:!0})))};r.addEventListener("close",s),$.set(e,{dialog:r,cleanup:()=>r.removeEventListener("close",s)})}}else if(!a&&r.open)try{r.close()}catch{r.removeAttribute("open")}}function ie(e,t){e.open&&(e.open=!1,e.dispatchEvent(new CustomEvent("tc-close",{detail:{reason:t},bubbles:!0,composed:!0})))}function ce(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var fe="tc-toast",ge=fe,M=new WeakMap;c(fe,i({props:{open:{type:"boolean",default:!1,reflect:!0},variant:{type:"string",default:"info"},message:{type:"string",default:""},duration:{type:"number",default:4e3},dismissible:{type:"boolean",default:!0}},theme:{"tc-toast-info":"var(--tc-color-info, #3a5b8c)","tc-toast-success":"var(--tc-color-success, #207a5b)","tc-toast-warning":"var(--tc-color-warning, #a87326)","tc-toast-error":"var(--tc-color-danger, #b3261e)","tc-toast-fg":"var(--tc-color-surface, #ffffff)","tc-toast-radius":"var(--tc-radius-lg, 10px)","tc-toast-shadow":"var(--tc-shadow-lg, 0 12px 30px rgba(20, 23, 31, 0.18))","tc-toast-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},template:({props:e})=>{let t=String(e.variant??"info"),r=t==="success"?"\u2713":t==="warning"?"!":t==="error"?"\u2715":"i";return`
        <div class="toast v-${pe(t)} ${e.open?"open":"closed"}" role="status" aria-live="polite">
          <span class="icon" aria-hidden="true">${r}</span>
          <span class="msg">${e.message?pe(e.message):"<slot></slot>"}</span>
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
      `},events:{"click .x":(e,t)=>be(t.host,"button")},afterMount(){We(this)},unmount(){let e=M.get(this);e!==void 0&&(clearTimeout(e),M.delete(this))}}));function We(e){let t=e,r=M.get(e);if(r!==void 0&&clearTimeout(r),M.delete(e),!t.open||!t.duration||t.duration<=0)return;let a=setTimeout(()=>{t.open&&be(e,"timeout")},t.duration);M.set(e,a)}function be(e,t){let r=e;r.open&&(r.open=!1,e.dispatchEvent(new CustomEvent("tc-toast-close",{detail:{reason:t},bubbles:!0,composed:!0})))}function pe(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var me="tc-stat",he=me;c(me,i({props:{label:{type:"string",default:""},value:{type:"string",default:""},delta:{type:"string",default:""},trend:{type:"string",default:"neutral"},prefix:{type:"string",default:""},suffix:{type:"string",default:""}},theme:{"tc-stat-surface":"var(--tc-color-surface, #ffffff)","tc-stat-rule":"var(--tc-color-rule, #ece5d3)","tc-stat-label":"var(--tc-color-ink-muted, #6b7280)","tc-stat-value":"var(--tc-color-ink, #14171f)","tc-stat-up":"var(--tc-color-success, #207a5b)","tc-stat-down":"var(--tc-color-danger, #b3261e)","tc-stat-neutral":"var(--tc-color-ink-muted, #6b7280)","tc-stat-radius":"var(--tc-radius-lg, 12px)","tc-stat-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},template:({props:e})=>{let t=String(e.trend??"neutral"),r=t==="up"?"\u25B2":t==="down"?"\u25BC":"\u2022";return`
        <div class="card">
          ${e.label?`<div class="label">${S(e.label)}</div>`:""}
          <div class="value">
            ${e.prefix?`<span class="prefix">${S(e.prefix)}</span>`:""}
            <span class="num">${S(e.value)}</span>
            ${e.suffix?`<span class="suffix">${S(e.suffix)}</span>`:""}
          </div>
          ${e.delta?`<div class="delta t-${S(t)}">
                  <span class="arrow" aria-hidden="true">${r}</span>
                  <span>${S(e.delta)}</span>
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
      `}}));function S(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var ye="tc-card",xe=ye;c(ye,i({props:{title:{type:"string",default:""},subtitle:{type:"string",default:""},padded:{type:"boolean",default:!0},bordered:{type:"boolean",default:!0},elevated:{type:"boolean",default:!1}},theme:{"tc-card-surface":"var(--tc-color-surface, #ffffff)","tc-card-ink":"var(--tc-color-ink, #14171f)","tc-card-soft":"var(--tc-color-ink-soft, #5a6072)","tc-card-rule":"var(--tc-color-rule, #ece5d3)","tc-card-radius":"var(--tc-radius-lg, 12px)","tc-card-shadow":"var(--tc-shadow-md, 0 8px 24px rgba(20, 23, 31, 0.06))","tc-card-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-card-padding-x":"var(--tc-space-5, 20px)","tc-card-padding-y":"var(--tc-space-5, 20px)","tc-card-gap":"var(--tc-space-3, 12px)"},styles:{display:"block"},template:({props:e})=>{let t=!!e.title||!!e.subtitle;return`
        <div class="${["card",e.bordered?"bordered":"",e.elevated?"elevated":"",e.padded?"padded":"",t?"has-header":""].filter(Boolean).join(" ")}">
          <div class="media"><slot name="media"></slot></div>
          <div class="head">
            <slot name="header">
              ${e.title?`<div class="title">${ve(e.title)}</div>`:""}
              ${e.subtitle?`<div class="subtitle">${ve(e.subtitle)}</div>`:""}
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

          /* Body: always has its own padding when the card is padded.
             This is the deterministic main padding \u2014 the head and foot
             pad themselves separately. */
          .card.padded .body {
            padding: var(--tc-card-padding-y) var(--tc-card-padding-x);
          }

          /* Head padding when title/subtitle props are set OR something
             is slotted into name="header". The body then trims its top
             padding so the two sections meet at --tc-card-gap. */
          .card.padded.has-header .head,
          .card.padded .head:has(::slotted(*)) {
            padding:
              var(--tc-card-padding-y)
              var(--tc-card-padding-x)
              var(--tc-card-gap);
          }
          .card.padded.has-header .head + .body,
          .card.padded .head:has(::slotted(*)) + .body {
            padding-top: 0;
          }

          /* Hide an empty head \u2014 neither props nor slotted content. */
          .card:not(.has-header) .head:not(:has(::slotted(*))) {
            display: none;
          }

          /* Foot only renders when there's slotted footer content. */
          .card.padded .foot:has(::slotted(*)) {
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

          /* When padded=false, no padding anywhere. The user takes
             over completely. */
          .card:not(.padded) .body,
          .card:not(.padded) .head,
          .card:not(.padded) .foot { padding: 0; }
        </style>
      `}}));function ve(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var we="tc-badge",$e=we;c(we,i({props:{variant:{type:"string",default:"neutral"},size:{type:"string",default:"md"},pill:{type:"boolean",default:!1}},theme:{"tc-badge-radius":"var(--tc-radius-sm, 6px)","tc-badge-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-badge-neutral-bg":"var(--tc-color-rule, #ece5d3)","tc-badge-neutral-fg":"var(--tc-color-ink, #14171f)","tc-badge-info-bg":"var(--tc-color-info-bg, #dde6f4)","tc-badge-info-fg":"var(--tc-color-info-fg, #1f3a66)","tc-badge-success-bg":"var(--tc-color-success-bg, #dbece2)","tc-badge-success-fg":"var(--tc-color-success-fg, #155b40)","tc-badge-warning-bg":"var(--tc-color-warning-bg, #f5e7cf)","tc-badge-warning-fg":"var(--tc-color-warning-fg, #7a4f0a)","tc-badge-danger-bg":"var(--tc-color-danger-bg, #f4dad7)","tc-badge-danger-fg":"var(--tc-color-danger-fg, #7a1a14)"},styles:{display:"inline-block"},template:({props:e})=>`
      <span class="badge v-${ke(e.variant)} s-${ke(e.size)} ${e.pill?"pill":""}">
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
    `}));function ke(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Te="tc-skeleton",Ee=Te;c(Te,i({props:{width:{type:"string",default:"100%"},height:{type:"string",default:"1em"},rounded:{type:"boolean",default:!1},pulse:{type:"boolean",default:!0}},theme:{"tc-skeleton-base":"var(--tc-color-rule, #ece5d3)","tc-skeleton-shine":"rgba(255, 255, 255, 0.6)","tc-skeleton-radius":"var(--tc-radius-md, 6px)"},styles:{display:"inline-block","vertical-align":"middle"},template:({props:e})=>`
      <span
        class="bone ${e.pulse?"pulse":""} ${e.rounded?"round":""}"
        aria-hidden="true"
        style="width: ${Se(e.width)}; height: ${Se(e.height)};"
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
    `}));function Se(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Me="tc-stack",Ce=Me;c(Me,i({props:{gap:{type:"string",default:"4"},align:{type:"string",default:"stretch"}},styles:{display:"block"},template:({props:e})=>`
      <div class="stack" style="--tc-stack-gap: ${Qe(e.gap)}; --tc-stack-align: ${Je(e.align)};">
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
    `}));function Qe(e){let t=String(e??"4").trim();return/^[1-8]$/.test(t)?`var(--tc-space-${t}, ${Xe(t)})`:t}function Xe(e){return{1:"4px",2:"8px",3:"12px",4:"16px",5:"24px",6:"32px",7:"48px",8:"64px"}[e]??"16px"}function Je(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Le="tc-cluster",Re=Le;c(Le,i({props:{gap:{type:"string",default:"3"},justify:{type:"string",default:"start"},align:{type:"string",default:"center"},wrap:{type:"boolean",default:!0}},styles:{display:"block"},template:({props:e})=>`
      <div class="cluster" style="
        --tc-cluster-gap: ${et(e.gap)};
        --tc-cluster-justify: ${Ze(e.justify)};
        --tc-cluster-align: ${rt(e.align)};
        --tc-cluster-wrap: ${e.wrap?"wrap":"nowrap"};
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
    `}));function Ze(e){let t=String(e??"start").trim();switch(t){case"between":return"space-between";case"around":return"space-around";case"evenly":return"space-evenly";default:return t}}function et(e){let t=String(e??"3").trim();return/^[1-8]$/.test(t)?`var(--tc-space-${t}, ${tt(t)})`:t}function tt(e){return{1:"4px",2:"8px",3:"12px",4:"16px",5:"24px",6:"32px",7:"48px",8:"64px"}[e]??"12px"}function rt(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var ze="tc-grid",Ie=ze;c(ze,i({props:{min:{type:"string",default:"260px"},gap:{type:"string",default:"4"},columns:{type:"string",default:""}},styles:{display:"block"},template:({props:e})=>{let t=String(e.columns??"").trim();return`
        <div class="grid" style="
          --tc-grid-template: ${t?`repeat(${Ae(t)}, minmax(0, 1fr))`:`repeat(auto-fit, minmax(${Ae(e.min)}, 1fr))`};
          --tc-grid-gap: ${at(e.gap)};
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
      `}}));function at(e){let t=String(e??"4").trim();return/^[1-8]$/.test(t)?`var(--tc-space-${t}, ${nt(t)})`:t}function nt(e){return{1:"4px",2:"8px",3:"12px",4:"16px",5:"24px",6:"32px",7:"48px",8:"64px"}[e]??"16px"}function Ae(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var br={button:V,input:G,textarea:_,select:U,checkbox:W,switch:J,file:ee,radioGroup:re,table:oe,tabs:le,modal:ue,toast:ge,stat:he,card:xe,badge:$e,skeleton:Ee,stack:Ce,cluster:Re,grid:Ie};export{br as tags};
//# sourceMappingURL=mod.kit.js.map
