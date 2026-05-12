var Qe=["beforeMount","afterMount","afterRender","unmount","action","formAssociatedCallback","formDisabledCallback","formResetCallback","formStateRestoreCallback"],Je=new Set(["string","number","boolean","json"]);function c(e){if(e===null||typeof e!="object")throw new TypeError("describe(): options must be an object");if(e.tag!==void 0&&typeof e.tag!="string")throw new TypeError("describe(): `tag` must be a string");if(e.className!==void 0&&typeof e.className!="string")throw new TypeError("describe(): `className` must be a string");if(e.template!==void 0&&typeof e.template!="string"&&typeof e.template!="function")throw new TypeError("describe(): `template` must be a string or function");if(e.children!==void 0&&!Array.isArray(e.children))throw new TypeError("describe(): `children` must be an array");if(e.emit!==void 0&&!Array.isArray(e.emit))throw new TypeError("describe(): `emit` must be an array");if(e.observedAttributes!==void 0&&(!Array.isArray(e.observedAttributes)||e.observedAttributes.some(t=>typeof t!="string")))throw new TypeError("describe(): `observedAttributes` must be an array of strings");for(let t of["theme","styles","attributes","events","refs"]){let r=e[t];if(r!==void 0&&(r===null||typeof r!="object"||Array.isArray(r)))throw new TypeError(`describe(): \`${t}\` must be a record`)}if(e.refs!==void 0){for(let[t,r]of Object.entries(e.refs))if(typeof r!="string")throw new TypeError(`describe(): refs.${t} must be a CSS selector string`)}if(e.formAssociated!==void 0&&typeof e.formAssociated!="boolean")throw new TypeError("describe(): `formAssociated` must be a boolean");for(let t of Qe){let r=e[t];if(r!==void 0&&typeof r!="function")throw new TypeError(`describe(): \`${t}\` must be a function`)}if(e.if!==void 0&&typeof e.if!="function")throw new TypeError("describe(): `if` must be a function");if(e.for!==void 0){let t=e.for;if(t===null||typeof t!="object"||Array.isArray(t))throw new TypeError("describe(): `for` must be a record");if(typeof t.items!="function")throw new TypeError("describe(): `for.items` must be a function");if(typeof t.key!="function")throw new TypeError("describe(): `for.key` must be a function");if(typeof t.render!="function")throw new TypeError("describe(): `for.render` must be a function")}if(e.props!==void 0){let t=e.props;if(t===null||typeof t!="object"||Array.isArray(t))throw new TypeError("describe(): `props` must be a record");for(let[r,a]of Object.entries(t)){if(a===null||typeof a!="object"||Array.isArray(a))throw new TypeError(`describe(): props.${r} must be a record`);if(!Je.has(a.type))throw new TypeError(`describe(): props.${r}.type must be one of "string", "number", "boolean", "json"`)}}return{...e}}var D=new Map,Xe=/^[a-z][a-z0-9]*(-[a-z0-9]+)+$/,Ze=/^(\S+)(?:\s+(.+))?$/;function u(e,t){if(typeof e!="string"||!Xe.test(e))throw new TypeError(`build(): "${e}" is not a valid custom element name (must be lowercase and contain a hyphen).`);if(D.has(e))return console.warn(`Component "${e}" is already registered. Skipping re-registration.`),e;if(typeof HTMLElement>"u"||typeof customElements>"u")return console.warn("HTMLElement or customElements not available; skipping component registration."),e;let r=Array.from(new Set([...t.observedAttributes??[],...Object.keys(t.props??{})])),a=t.props??{},n=t.refs??{},o=rt(t);class i extends HTMLElement{static get observedAttributes(){return r}static get formAssociated(){return t.formAssociated===!0}isMounted=!1;mountCleanups=[];renderCleanups=[];state=new Map;propValues=new Map;listSlots=new WeakMap;currentRefs={};container;ctx;rendering=!1;renderQueued=!1;internals;constructor(){super();let s=this.attachShadow({mode:"open"});t.formAssociated&&typeof this.attachInternals=="function"&&(this.internals=this.attachInternals()),at(s,o),this.container=document.createElement("div"),this.container.className=t.className?`container ${t.className}`:"container",s.appendChild(this.container),t.attributes&&V(this,t.attributes),this.ctx=tt(this,this.propValues,this.state,()=>this.currentRefs),this.initProps()}get refs(){return this.currentRefs}initProps(){for(let[s,l]of Object.entries(a)){let p=this.getAttribute(s),f=p!==null?j(p,l.type):l.default;this.propValues.set(s,f),this.maybeSyncFormValue(s,f),Object.defineProperty(this,s,{configurable:!0,enumerable:!0,get:()=>this.propValues.get(s),set:b=>{let g=st(b,l.type),m=this.propValues.get(s);Object.is(m,g)||(this.propValues.set(s,g),l.reflect&&lt(this,s,g,l.type),this.maybeSyncFormValue(s,g),this.isMounted&&this.scheduleRender())}})}}maybeSyncFormValue(s,l){if(!this.internals||s!=="value")return;let p=l==null?null:String(l);this.internals.setFormValue(p)}connectedCallback(){if(!this.isMounted){try{t.beforeMount?.call(this)}catch(s){console.error(`[tan-compose] beforeMount threw for <${e}>:`,s)}if(this.renderInternal(),t.action){let s=t.action;this.addEventListener("click",s),this.mountCleanups.push(()=>this.removeEventListener("click",s))}if(t.emit)for(let s of t.emit)this.addEventListener(s.name,s.handler),this.mountCleanups.push(()=>this.removeEventListener(s.name,s.handler));t.events&&this.attachDelegatedEvents(t.events),this.isMounted=!0;try{t.afterMount?.call(this)}catch(s){console.error(`[tan-compose] afterMount threw for <${e}>:`,s)}}}disconnectedCallback(){try{t.unmount?.call(this)}catch(s){console.error(`[tan-compose] unmount threw for <${e}>:`,s)}h(this.mountCleanups),h(this.renderCleanups),this.flushListSlots(),this.isMounted=!1}flushListSlots(){B(t,s=>{let l=this.listSlots.get(s);if(l){for(let p of l.cache.values())h(p.cleanups);l.cache.clear()}})}attributeChangedCallback(s,l,p){if(l!==p){if(Object.prototype.hasOwnProperty.call(a,s)){let f=a[s],b=p!==null?j(p,f.type):f.default,g=this.propValues.get(s);Object.is(g,b)||(this.propValues.set(s,b),this.isMounted&&this.scheduleRender());return}this.state.set(s,p),this.isMounted&&this.scheduleRender()}}setState(s,l){let p=this.state.get(s);Object.is(p,l)||(this.state.set(s,l),this.isMounted&&this.scheduleRender())}getState(s){return this.state.get(s)}render(){this.renderInternal()}emitEvent(s,l){this.dispatchEvent(new CustomEvent(s,{detail:l,bubbles:!0,composed:!0}))}scheduleRender(){if(this.rendering){this.renderQueued=!0;return}this.renderInternal()}getOrCreateSlot(s){let l=this.listSlots.get(s);return l||(l={cache:new Map},this.listSlots.set(s,l)),l}renderInternal(){this.rendering=!0;try{h(this.renderCleanups),this.container.replaceChildren();let s={host:this,cleanups:this.renderCleanups,ctx:this.ctx};if(t.template!==void 0){let l=typeof t.template=="function"?t.template(this.ctx):t.template;l&&(this.container.innerHTML=l)}if(t.children)for(let l of t.children){let p=O(l,s,f=>this.getOrCreateSlot(f));p&&this.container.appendChild(p)}this.container.appendChild(document.createElement("slot")),this.refreshRefs()}finally{this.rendering=!1}if(this.renderQueued){this.renderQueued=!1,this.renderInternal();return}try{t.afterRender?.call(this)}catch(s){console.error(`[tan-compose] afterRender threw for <${e}>:`,s)}}refreshRefs(){let s={},l=this.shadowRoot;for(let[p,f]of Object.entries(n))s[p]=l?l.querySelector(f):null;this.currentRefs=s}formAssociatedCallback(s){try{t.formAssociatedCallback?.call(this,s)}catch(l){console.error(`[tan-compose] formAssociatedCallback threw for <${e}>:`,l)}}formDisabledCallback(s){try{t.formDisabledCallback?.call(this,s)}catch(l){console.error(`[tan-compose] formDisabledCallback threw for <${e}>:`,l)}}formResetCallback(){try{t.formResetCallback?.call(this)}catch(s){console.error(`[tan-compose] formResetCallback threw for <${e}>:`,s)}}formStateRestoreCallback(s,l){try{t.formStateRestoreCallback?.call(this,s,l)}catch(p){console.error(`[tan-compose] formStateRestoreCallback threw for <${e}>:`,p)}}attachDelegatedEvents(s){let l=new Map;for(let[p,f]of Object.entries(s)){let b=Ze.exec(p.trim());if(!b)continue;let[,g,m]=b;l.has(g)||l.set(g,[]),l.get(g).push({selector:m??null,handler:f})}for(let[p,f]of l){let b=g=>{for(let{selector:m,handler:L}of f){if(!m){L(g,this.ctx);continue}let We=g.composedPath();for(let T of We){if(T===this.shadowRoot||T===this)break;if(T instanceof Element&&this.shadowRoot?.contains(T)&&T.matches(m)){L(g,this.ctx);break}}}};this.shadowRoot.addEventListener(p,b),this.mountCleanups.push(()=>this.shadowRoot?.removeEventListener(p,b))}}}return D.set(e,i),customElements.define(e,i),e}function O(e,t,r){return e.if&&!e.if(t.ctx)?null:F(e,t,r)}function F(e,t,r){let a=document.createElement(e.tag||"div");if(e.styles&&(a.style.cssText=Object.entries(e.styles).map(([n,o])=>`${n}: ${o}`).join("; ")),e.className&&(a.className=e.className),e.attributes&&V(a,e.attributes),e.template!==void 0){let n=typeof e.template=="function"?e.template(t.ctx):e.template;n&&(a.innerHTML=n)}if(e.children)for(let n of e.children){let o=O(n,t,r);o&&a.appendChild(o)}if(e.for&&et(a,e,t,r),e.action){let n=e.action;a.addEventListener("click",n),t.cleanups.push(()=>a.removeEventListener("click",n))}if(e.emit)for(let n of e.emit)a.addEventListener(n.name,n.handler),t.cleanups.push(()=>a.removeEventListener(n.name,n.handler));return a}function et(e,t,r,a){let n=t.for,o=a(t),i=n.items(r.ctx),d=new Map;for(let s=0;s<i.length;s++){let l=i[s],p=n.key(l,s),f,b=o.cache.get(p);if(b&&Object.is(b.lastItem,l))f=b;else{let g=[],m=n.render(l,s,r.ctx),L=F(m,{...r,cleanups:g},a);b&&h(b.cleanups),f={element:L,lastItem:l,cleanups:g}}d.set(p,f),e.appendChild(f.element)}for(let[s,l]of o.cache)d.has(s)||h(l.cleanups);o.cache=d}function B(e,t){if(e.for&&t(e),e.children)for(let r of e.children)B(r,t)}function tt(e,t,r,a){return{host:e,get props(){let n={};for(let[o,i]of t)n[o]=i;return n},get state(){let n={};for(let[o,i]of r)n[o]=i;return n},get refs(){return a()},setState:(n,o)=>e.setState(n,o),getState:n=>e.getState(n),emit:(n,o)=>e.emitEvent(n,o)}}function rt(e){let t=e.theme?nt(e.theme):void 0,r=e.styles?ot(e.styles):void 0;if(!t&&!r)return{kind:"adopted",sheets:[]};if(typeof CSSStyleSheet<"u"&&typeof CSSStyleSheet.prototype.replaceSync=="function"){let n=[];if(t){let o=new CSSStyleSheet;o.replaceSync(t),n.push(o)}if(r){let o=new CSSStyleSheet;o.replaceSync(r),n.push(o)}return{kind:"adopted",sheets:n}}return{kind:"fallback",theme:t,styles:r}}function at(e,t){if(t.kind==="adopted"){if(t.sheets.length>0)try{e.adoptedStyleSheets=t.sheets}catch{}return}if(t.theme){let r=document.createElement("style");r.textContent=t.theme,e.appendChild(r)}if(t.styles){let r=document.createElement("style");r.textContent=t.styles,e.appendChild(r)}}function V(e,t){for(let[r,a]of Object.entries(t))e.setAttribute(r,a)}function nt(e){return`:host { ${Object.entries(e).map(([r,a])=>`--${r}: ${a};`).join(" ")} }`}function ot(e){return`.container { ${Object.entries(e).map(([r,a])=>`${r}: ${a};`).join(" ")} }`}function h(e){for(;e.length>0;){let t=e.pop();try{t?.()}catch(r){console.error("[tan-compose] cleanup threw:",r)}}}function j(e,t){switch(t){case"string":return e;case"number":{let r=Number(e);return Number.isNaN(r)?void 0:r}case"boolean":return e!=="false"&&e!=="0";case"json":try{return JSON.parse(e)}catch{return}}}function st(e,t){switch(t){case"string":return e==null?e:String(e);case"number":return e==null?e:Number(e);case"boolean":return!!e;case"json":return e}}function lt(e,t,r,a){if(a!=="json"){if(a==="boolean"){r?e.setAttribute(t,""):e.removeAttribute(t);return}if(r==null){e.removeAttribute(t);return}e.setAttribute(t,String(r))}}var P="tc-button",_=P;u(P,c({props:{variant:{type:"string",default:"primary"},size:{type:"string",default:"md"},disabled:{type:"boolean",default:!1,reflect:!0},loading:{type:"boolean",default:!1},block:{type:"boolean",default:!1},href:{type:"string",default:""},target:{type:"string",default:""},rel:{type:"string",default:""}},theme:{"tc-btn-primary-bg":"var(--tc-color-ink, #14171f)","tc-btn-primary-fg":"var(--tc-color-surface, #ffffff)","tc-btn-secondary-bg":"var(--tc-color-surface, #ffffff)","tc-btn-secondary-fg":"var(--tc-color-ink, #14171f)","tc-btn-secondary-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-btn-ghost-fg":"var(--tc-color-ink, #14171f)","tc-btn-ghost-border":"transparent","tc-btn-danger-bg":"var(--tc-color-danger, #b3261e)","tc-btn-danger-fg":"var(--tc-color-surface, #ffffff)","tc-btn-radius":"var(--tc-radius-md, 8px)","tc-btn-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"inline-block","vertical-align":"middle"},template:({props:e})=>{let t=`root v-${E(e.variant)} s-${E(e.size)}${e.block?" block":""}`,r=`${e.loading?'<span class="spinner" aria-hidden="true"></span>':""}
        <span class="content"><slot></slot></span>`,a=String(e.href??""),n=a.length>0,o=!!(e.disabled||e.loading);if(n){let i=e.target?` target="${E(e.target)}"`:"",d=e.rel?String(e.rel):String(e.target)==="_blank"?"noopener":"",s=d?` rel="${E(d)}"`:"",l=o?"":` href="${E(a)}"`;return`
      <a
        part="button"
        class="${t}"${l}${i}${s}${o?' aria-disabled="true"':""}${o?' tabindex="-1"':""}
        role="button"
      >
        ${r}
      </a>${G}`}return`
      <button
        part="button"
        class="${t}"
        ${o?"disabled":""}
        type="button"
      >
        ${r}
      </button>${G}`}}));var G=`
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
`;function E(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var K="tc-input",U=K;u(K,c({formAssociated:!0,props:{value:{type:"string",default:""},name:{type:"string",default:""},type:{type:"string",default:"text"},placeholder:{type:"string",default:""},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0}},theme:{"tc-input-bg":"var(--tc-color-surface, #ffffff)","tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-border-focus":"var(--tc-color-accent, #a16939)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-radius":"var(--tc-radius-md, 8px)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},refs:{input:"input"},template:({props:e})=>{let t=!!e.error;return`
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
      `},events:{"input input":(e,t)=>{let r=e.target.value,a=t.host;a.internals?.setFormValue(r),a.value=r,t.emit("tc-input",{value:r})}},formResetCallback(){this.value=""}}));function y(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Y="tc-textarea",W=Y;u(Y,c({formAssociated:!0,props:{value:{type:"string",default:""},name:{type:"string",default:""},placeholder:{type:"string",default:""},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},rows:{type:"number",default:4},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0},resize:{type:"string",default:"vertical"}},theme:{"tc-input-bg":"var(--tc-color-surface, #ffffff)","tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-border-focus":"var(--tc-color-accent, #a16939)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-radius":"var(--tc-radius-md, 8px)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},refs:{input:"textarea"},template:({props:e})=>{let t=!!e.error;return`
        ${e.label?`<label class="label">${v(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</label>`:""}
        <textarea
          class="input ${t?"invalid":""}"
          part="textarea"
          name="${v(e.name)}"
          placeholder="${v(e.placeholder)}"
          rows="${v(e.rows)}"
          ${e.disabled?"disabled":""}
          ${e.required?"required":""}
          aria-invalid="${t?"true":"false"}"
          style="resize: ${v(e.resize)};"
        >${v(e.value)}</textarea>
        ${e.error||e.helper?`<div class="${t?"error":"helper"}">${v(e.error||e.helper)}</div>`:""}
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
      `},events:{"input textarea":(e,t)=>{let r=e.target.value,a=t.host;a.internals?.setFormValue(r),a.value=r,t.emit("tc-input",{value:r})}},formResetCallback(){this.value=""}}));function v(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Q="tc-select",J=Q;u(Q,c({formAssociated:!0,props:{value:{type:"string",default:""},name:{type:"string",default:""},options:{type:"json",default:[]},placeholder:{type:"string",default:""},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0}},theme:{"tc-input-bg":"var(--tc-color-surface, #ffffff)","tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-border-focus":"var(--tc-color-accent, #a16939)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-radius":"var(--tc-radius-md, 8px)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},template:({props:e})=>{let t=e.options??[],r=!!e.error;return`
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
      `},events:{"change select":(e,t)=>{let r=e.target.value,a=t.host;a.internals?.setFormValue(r),a.value=r,t.emit("tc-change",{value:r})}},formResetCallback(){this.value=""}}));function x(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var X="tc-checkbox",Z=X;u(X,c({formAssociated:!0,props:{checked:{type:"boolean",default:!1,reflect:!0},name:{type:"string",default:""},value:{type:"string",default:"on"},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0},indeterminate:{type:"boolean",default:!1}},theme:{"tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-border-focus":"var(--tc-color-accent, #a16939)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-radius":"var(--tc-radius-sm, 4px)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-checkbox-accent":"var(--tc-color-accent, #a16939)"},styles:{display:"block"},template:({props:e})=>{let t=!!e.error;return`
        <label class="row ${e.disabled?"is-disabled":""} ${t?"is-invalid":""}">
          <input
            class="cb"
            type="checkbox"
            name="${z(e.name)}"
            value="${z(e.value)}"
            ${e.checked?"checked":""}
            ${e.disabled?"disabled":""}
            ${e.required?"required":""}
            aria-invalid="${t?"true":"false"}"
          />
          ${e.label?`<span class="label">${z(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</span>`:"<span></span>"}
        </label>
        ${e.error||e.helper?`<div class="${t?"error":"helper"}">${z(e.error||e.helper)}</div>`:""}
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
      `},refs:{input:".cb"},events:{"change .cb":(e,t)=>{let r=e.target.checked,a=t.host;a.checked=r,a.internals?.setFormValue(r?a.value:null),t.emit("tc-change",{checked:r})}},afterMount(){let e=this,r=e.shadowRoot?.querySelector(".cb");r&&(r.indeterminate=e.indeterminate),e.internals?.setFormValue(e.checked?e.value:null)},formResetCallback(){this.checked=!1}}));function z(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var te="tc-switch",re=te;u(te,c({formAssociated:!0,props:{checked:{type:"boolean",default:!1,reflect:!0},name:{type:"string",default:""},value:{type:"string",default:"on"},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},disabled:{type:"boolean",default:!1,reflect:!0}},theme:{"tc-switch-track-off":"var(--tc-color-rule-strong, #d9cfb8)","tc-switch-track-on":"var(--tc-color-accent, #a16939)","tc-switch-thumb":"var(--tc-color-surface, #ffffff)","tc-switch-fg":"var(--tc-color-ink, #14171f)","tc-switch-helper":"var(--tc-color-ink-muted, #6b7280)","tc-switch-error":"var(--tc-color-danger, #b3261e)","tc-switch-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},template:({props:e})=>{let t=!!e.error;return`
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
          ${e.label?`<span class="label">${ee(e.label)}</span>`:""}
        </label>
        ${e.error||e.helper?`<div class="${t?"error":"helper"}">${ee(e.error||e.helper)}</div>`:""}
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
      `},events:{"click .track":(e,t)=>{let r=t.host;r.disabled||(r.checked=!r.checked,r.internals?.setFormValue(r.checked?r.value:null),t.emit("tc-change",{checked:r.checked}))},"keydown .track":(e,t)=>{let r=e;if(r.key!==" "&&r.key!=="Enter")return;r.preventDefault();let a=t.host;a.disabled||(a.checked=!a.checked,a.internals?.setFormValue(a.checked?a.value:null),t.emit("tc-change",{checked:a.checked}))}},afterMount(){let e=this;e.internals?.setFormValue(e.checked?e.value:null)},formResetCallback(){this.checked=!1}}));function ee(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var ae="tc-file",ne=ae;u(ae,c({formAssociated:!0,props:{name:{type:"string",default:""},accept:{type:"string",default:""},multiple:{type:"boolean",default:!1,reflect:!0},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},buttonText:{type:"string",default:"Choose file"},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0}},theme:{"tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-border-focus":"var(--tc-color-accent, #a16939)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-radius":"var(--tc-radius-md, 8px)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-file-zone-bg":"var(--tc-color-surface-alt, #faf8f3)","tc-file-zone-fg":"var(--tc-color-ink-soft, #4a5061)"},styles:{display:"block"},refs:{input:"input[type='file']"},template:({props:e,state:t})=>{let r=!!e.error,a=t.files??[],n=a.length===0?"No file selected":a.length===1?k(a[0].name):`${a.length} files selected`;return`
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
      `},events:{"click .btn":(e,t)=>{t.refs.input?.click()},"change input[type='file']":(e,t)=>{let r=e.target,a=Array.from(r.files??[]);t.setState("files",a);let n=t.host;if(n.internals)if(a.length===0)n.internals.setFormValue(null);else if(a.length===1)n.internals.setFormValue(a[0]);else{let o=new FormData,i=n.name;for(let d of a)o.append(i,d);n.internals.setFormValue(o)}t.emit("tc-files",{files:a})}},formResetCallback(){let t=this.shadowRoot?.querySelector(".native");t&&(t.value=""),this.setState("files",[])}}));function k(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var oe="tc-radio-group",se=oe;u(oe,c({formAssociated:!0,props:{value:{type:"string",default:""},name:{type:"string",default:""},options:{type:"json",default:[]},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},layout:{type:"string",default:"vertical"},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0}},theme:{"tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-radio-accent":"var(--tc-color-accent, #a16939)"},styles:{display:"block"},template:({props:e})=>{let t=e.options??[],r=!!e.error,a=String(e.layout??"vertical");return`
        <fieldset class="group" ${e.disabled?"disabled":""}>
          ${e.label?`<legend class="legend">${w(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</legend>`:""}
          <div class="opts l-${w(a)}" role="radiogroup" aria-invalid="${r?"true":"false"}">
            ${t.map((n,o)=>`<label class="opt ${n.disabled?"is-disabled":""}">
                  <input
                    type="radio"
                    class="r"
                    name="${w(e.name)||`__rg_${o}__`}"
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
      `},events:{"change input.r":(e,t)=>{let r=e.target.value,a=t.host;a.value=r,a.internals?.setFormValue(r),t.emit("tc-change",{value:r})}},afterMount(){let e=this;e.value&&e.internals?.setFormValue(e.value)},formResetCallback(){this.value=""}}));function w(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var ie="tc-table",ce=ie,it=`
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
`;u(ie,c({props:{rows:{type:"json",default:[]},columns:{type:"json",default:[]},pageSize:{type:"number",default:10},filterable:{type:"boolean",default:!0},emptyText:{type:"string",default:"No results."},rowKey:{type:"string",default:"id"}},theme:{"tc-table-surface":"var(--tc-color-surface, #ffffff)","tc-table-ink":"var(--tc-color-ink, #14171f)","tc-table-soft":"var(--tc-color-ink-soft, #5a6072)","tc-table-rule":"var(--tc-color-rule, #ece5d3)","tc-table-head-bg":"var(--tc-color-surface-alt, #faf8f3)","tc-table-row-hover":"rgba(161, 105, 57, 0.05)","tc-table-accent":"var(--tc-color-accent, #a16939)","tc-table-radius":"var(--tc-radius-lg, 10px)","tc-table-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},children:[c({tag:"style",template:it}),c({if:({props:e})=>!!e.filterable,tag:"input",className:"filter",attributes:{placeholder:"Search...",type:"text"}}),c({tag:"div",className:"wrap",children:[c({tag:"table",children:[c({tag:"thead",template:({props:e,state:t})=>{let r=e.columns??[],a=t;return`<tr>${r.map(n=>{let o=a.sortKey===n.key,i=n.sortable!==!1,d=o?a.sortDir==="asc"?"\u25B2":"\u25BC":"",s=o?a.sortDir==="asc"?"ascending":"descending":"none";return`<th
                        data-col="${A(n.key)}"
                        class="${i?"sortable":""}"
                        aria-sort="${s}"
                      >${A(n.label)}<span class="sort">${d}</span></th>`}).join("")}</tr>`}}),c({tag:"tbody",children:[c({tag:"tr",className:"empty",if:({props:e,state:t})=>le(e,t).length===0,template:({props:e})=>`<td colspan="${(e.columns??[]).length||1}">${A(e.emptyText)}</td>`})],for:{items:({props:e,state:t})=>le(e,t),key:(e,t)=>e["id"]??t,render:(e,t,r)=>{let n=r.props.columns??[],o=e;return c({tag:"tr",attributes:{"data-row-id":String(o.id??t)},template:n.map(i=>`<td>${typeof i.render=="function"?i.render(o):A(o[i.key]??"")}</td>`).join("")})}}})]})]}),c({tag:"footer",className:"pager",template:({props:e,state:t})=>{let r=t,a=R(e,r),n=e.pageSize??10,o=Math.max(1,Math.ceil(a.length/n)),i=Math.min(r.page??0,o-1),d=(e.rows??[]).length;return`
            <span class="count">${a.length} of ${d} rows</span>
            <span class="spacer"></span>
            <button class="prev" type="button" ${i<=0?"disabled":""}>\u2039 prev</button>
            <span class="page">page ${i+1} of ${o}</span>
            <button class="next" type="button" ${i>=o-1?"disabled":""}>next \u203A</button>
          `}})],refs:{filter:".filter"},afterRender(){let e=this,t=e.refs.filter;if(!t)return;let r=e.getState("q")??"";t.value!==r&&(t.value=r);let a=H.get(e);if(a){H.delete(e),t.focus();let n=Math.min(a.caret,t.value.length);try{t.setSelectionRange(n,n)}catch{}}},events:{"input .filter":(e,t)=>{let r=e.target;H.set(t.host,{caret:r.selectionStart??r.value.length}),t.setState("q",r.value),t.setState("page",0)},"click .prev":(e,t)=>{let r=(t.state.page??0)-1;t.setState("page",Math.max(0,r))},"click .next":(e,t)=>{let r=t.state,a=R(t.props,r).length,n=t.props.pageSize??10,o=Math.max(0,Math.ceil(a/n)-1),i=(r.page??0)+1;t.setState("page",Math.min(o,i))},"click th.sortable":(e,t)=>{let r=e.target.closest("th");if(!r)return;let a=r.dataset.col;if(!a)return;let n=t.state,o;n.sortKey!==a?o="asc":o=n.sortDir==="asc"?"desc":n.sortDir==="desc"?null:"asc",t.setState("sortKey",o?a:null),t.setState("sortDir",o),t.emit("tc-sort-change",{key:o?a:null,direction:o})},"click tr[data-row-id]":(e,t)=>{let r=e.target.closest("tr[data-row-id]");if(!r)return;let a=r.dataset.rowId;if(a===void 0)return;let n=R(t.props,t.state),o=n.find(i=>String(i.id)===a)??n[Number(a)];o&&t.emit("tc-row-click",{row:o})}}}));var H=new WeakMap;function R(e,t){let r=e.rows??[],a=e.columns??[],n=(t.q??"").trim().toLowerCase(),o=n.length===0?r.slice():r.filter(i=>a.some(d=>String(i[d.key]??"").toLowerCase().includes(n)));if(t.sortKey&&t.sortDir){let i=t.sortKey,d=t.sortDir==="asc"?1:-1;o=o.slice().sort((s,l)=>{let p=s[i],f=l[i];return p===f?0:p==null?1:f==null?-1:typeof p=="number"&&typeof f=="number"?(p-f)*d:String(p).localeCompare(String(f))*d})}return o}function le(e,t){let r=e.pageSize??10,a=R(e,t),n=Math.max(1,Math.ceil(a.length/r)),o=Math.min(t.page??0,n-1);return a.slice(o*r,o*r+r)}function A(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var de="tc-tabs",ue=de;u(de,c({props:{tabs:{type:"json",default:[]},active:{type:"string",default:"",reflect:!0}},theme:{"tc-tabs-fg":"var(--tc-color-ink, #14171f)","tc-tabs-fg-muted":"var(--tc-color-ink-muted, #6b7280)","tc-tabs-rule":"var(--tc-color-rule, #ece5d3)","tc-tabs-accent":"var(--tc-color-accent, #a16939)","tc-tabs-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block","font-family":"var(--tc-tabs-font)"},template:({props:e})=>{let t=e.tabs??[],r=e.active||t[0]?.id||"";return`
        <div role="tablist" class="strip">
          ${t.map(a=>`<button
              role="tab"
              type="button"
              class="tab ${a.id===r?"active":""}"
              data-tab="${M(a.id)}"
              aria-selected="${a.id===r?"true":"false"}"
              aria-controls="panel-${M(a.id)}"
              tabindex="${a.id===r?"0":"-1"}"
            >${M(a.label)}</button>`).join("")}
        </div>
        <div class="panels">
          ${t.map(a=>`<section
              role="tabpanel"
              id="panel-${M(a.id)}"
              class="panel"
              aria-labelledby=""
              ${a.id===r?"":"hidden"}
            ><slot name="${M(a.id)}"></slot></section>`).join("")}
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
      `},events:{"click .tab":(e,t)=>{let r=e.target.closest(".tab");if(!r)return;let a=r.dataset.tab;if(!a)return;let n=t.host,o=n.active;o!==a&&(n.active=a,t.emit("tc-tab-change",{active:a,previous:o}))},"keydown .tab":(e,t)=>{let r=e,a=t.props.tabs??[];if(a.length===0)return;let n=t.host,o=n.active||a[0].id,i=a.findIndex(l=>l.id===o),d=i;if(r.key==="ArrowRight")d=(i+1)%a.length;else if(r.key==="ArrowLeft")d=(i-1+a.length)%a.length;else if(r.key==="Home")d=0;else if(r.key==="End")d=a.length-1;else return;r.preventDefault();let s=a[d].id;n.active=s,t.emit("tc-tab-change",{active:s,previous:o}),queueMicrotask(()=>{t.host.shadowRoot?.querySelector(`.tab[data-tab="${s}"]`)?.focus()})}}}));function M(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var ge="tc-modal",be=ge;u(ge,c({props:{open:{type:"boolean",default:!1,reflect:!0},title:{type:"string",default:""},dismissible:{type:"boolean",default:!0},width:{type:"string",default:"min(560px, 92vw)"}},theme:{"tc-modal-surface":"var(--tc-color-surface, #ffffff)","tc-modal-ink":"var(--tc-color-ink, #14171f)","tc-modal-rule":"var(--tc-color-rule, #ece5d3)","tc-modal-soft":"var(--tc-color-ink-soft, #5a6072)","tc-modal-radius":"var(--tc-radius-lg, 12px)","tc-modal-backdrop":"rgba(20, 23, 31, 0.5)","tc-modal-shadow":"var(--tc-shadow-lg, 0 24px 60px rgba(20, 23, 31, 0.25))","tc-modal-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"contents"},template:({props:e})=>`
      <dialog class="dlg" aria-labelledby="${e.title?"title":""}">
        ${e.title||e.dismissible?`<header class="head">
              ${e.title?`<h2 id="title" class="title">${fe(e.title)}</h2>`:"<span></span>"}
              ${e.dismissible?'<button class="x" type="button" aria-label="Close">\xD7</button>':""}
            </header>`:""}
        <div class="body"><slot></slot></div>
        <footer class="foot"><slot name="footer"></slot></footer>
      </dialog>
      <style>
        .dlg {
          width: ${fe(e.width)};
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
    `,refs:{dialog:".dlg"},events:{"click .x":(e,t)=>{pe(t.host,"button")},"click .dlg":(e,t)=>{let r=t.host;if(!r.dismissible)return;let a=t.refs.dialog;a&&e.target===a&&pe(r,"backdrop")}},afterRender(){ct(this)},unmount(){let e=$.get(this);e&&(e.cleanup(),$.delete(this))}}));var $=new WeakMap;function ct(e){let t=e.shadowRoot;if(!t)return;let r=t.querySelector(".dlg");if(!r)return;let a=e.open,n=$.get(e);if(n&&n.dialog!==r&&(n.cleanup(),$.delete(e)),a&&!r.open){if(typeof r.showModal=="function")try{r.showModal()}catch{r.setAttribute("open","")}else r.setAttribute("open","");if(!$.has(e)){let o=()=>{let i=e;i.open&&(i.open=!1,e.dispatchEvent(new CustomEvent("tc-close",{detail:{reason:"escape"},bubbles:!0,composed:!0})))};r.addEventListener("close",o),$.set(e,{dialog:r,cleanup:()=>r.removeEventListener("close",o)})}}else if(!a&&r.open)try{r.close()}catch{r.removeAttribute("open")}}function pe(e,t){e.open&&(e.open=!1,e.dispatchEvent(new CustomEvent("tc-close",{detail:{reason:t},bubbles:!0,composed:!0})))}function fe(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var ve="tc-toast",he=ve,C=new WeakMap;u(ve,c({props:{open:{type:"boolean",default:!1,reflect:!0},variant:{type:"string",default:"info"},message:{type:"string",default:""},duration:{type:"number",default:4e3},dismissible:{type:"boolean",default:!0}},theme:{"tc-toast-info":"var(--tc-color-info, #3a5b8c)","tc-toast-success":"var(--tc-color-success, #207a5b)","tc-toast-warning":"var(--tc-color-warning, #a87326)","tc-toast-error":"var(--tc-color-danger, #b3261e)","tc-toast-fg":"var(--tc-color-surface, #ffffff)","tc-toast-radius":"var(--tc-radius-lg, 10px)","tc-toast-shadow":"var(--tc-shadow-lg, 0 12px 30px rgba(20, 23, 31, 0.18))","tc-toast-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},template:({props:e})=>{let t=String(e.variant??"info"),r=t==="success"?"\u2713":t==="warning"?"!":t==="error"?"\u2715":"i";return`
        <div class="toast v-${me(t)} ${e.open?"open":"closed"}" role="status" aria-live="polite">
          <span class="icon" aria-hidden="true">${r}</span>
          <span class="msg">${e.message?me(e.message):"<slot></slot>"}</span>
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
      `},events:{"click .x":(e,t)=>ye(t.host,"button")},afterMount(){dt(this)},unmount(){let e=C.get(this);e!==void 0&&(clearTimeout(e),C.delete(this))}}));function dt(e){let t=e,r=C.get(e);if(r!==void 0&&clearTimeout(r),C.delete(e),!t.open||!t.duration||t.duration<=0)return;let a=setTimeout(()=>{t.open&&ye(e,"timeout")},t.duration);C.set(e,a)}function ye(e,t){let r=e;r.open&&(r.open=!1,e.dispatchEvent(new CustomEvent("tc-toast-close",{detail:{reason:t},bubbles:!0,composed:!0})))}function me(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var xe="tc-stat",ke=xe;u(xe,c({props:{label:{type:"string",default:""},value:{type:"string",default:""},delta:{type:"string",default:""},trend:{type:"string",default:"neutral"},prefix:{type:"string",default:""},suffix:{type:"string",default:""}},theme:{"tc-stat-surface":"var(--tc-color-surface, #ffffff)","tc-stat-rule":"var(--tc-color-rule, #ece5d3)","tc-stat-label":"var(--tc-color-ink-muted, #6b7280)","tc-stat-value":"var(--tc-color-ink, #14171f)","tc-stat-up":"var(--tc-color-success, #207a5b)","tc-stat-down":"var(--tc-color-danger, #b3261e)","tc-stat-neutral":"var(--tc-color-ink-muted, #6b7280)","tc-stat-radius":"var(--tc-radius-lg, 12px)","tc-stat-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},template:({props:e})=>{let t=String(e.trend??"neutral"),r=t==="up"?"\u25B2":t==="down"?"\u25BC":"\u2022";return`
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
      `}}));function S(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var $e="tc-card",Se=$e;u($e,c({props:{title:{type:"string",default:""},subtitle:{type:"string",default:""},padded:{type:"boolean",default:!0},bordered:{type:"boolean",default:!0},elevated:{type:"boolean",default:!1}},theme:{"tc-card-surface":"var(--tc-color-surface, #ffffff)","tc-card-ink":"var(--tc-color-ink, #14171f)","tc-card-soft":"var(--tc-color-ink-soft, #5a6072)","tc-card-rule":"var(--tc-color-rule, #ece5d3)","tc-card-radius":"var(--tc-radius-lg, 12px)","tc-card-shadow":"var(--tc-shadow-md, 0 8px 24px rgba(20, 23, 31, 0.06))","tc-card-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-card-padding-x":"var(--tc-space-5, 20px)","tc-card-padding-y":"var(--tc-space-5, 20px)","tc-card-gap":"var(--tc-space-3, 12px)"},styles:{display:"block"},template:({props:e})=>{let t=!!e.title||!!e.subtitle;return`
        <div class="${["card",e.bordered?"bordered":"",e.elevated?"elevated":"",e.padded?"padded":"",t?"has-header":""].filter(Boolean).join(" ")}">
          <div class="media"><slot name="media"></slot></div>
          <div class="head">
            <slot name="header">
              ${e.title?`<div class="title">${we(e.title)}</div>`:""}
              ${e.subtitle?`<div class="subtitle">${we(e.subtitle)}</div>`:""}
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
      `}}));function we(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Ee="tc-badge",Me=Ee;u(Ee,c({props:{variant:{type:"string",default:"neutral"},size:{type:"string",default:"md"},pill:{type:"boolean",default:!1}},theme:{"tc-badge-radius":"var(--tc-radius-sm, 6px)","tc-badge-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-badge-neutral-bg":"var(--tc-color-rule, #ece5d3)","tc-badge-neutral-fg":"var(--tc-color-ink, #14171f)","tc-badge-info-bg":"var(--tc-color-info-bg, #dde6f4)","tc-badge-info-fg":"var(--tc-color-info-fg, #1f3a66)","tc-badge-success-bg":"var(--tc-color-success-bg, #dbece2)","tc-badge-success-fg":"var(--tc-color-success-fg, #155b40)","tc-badge-warning-bg":"var(--tc-color-warning-bg, #f5e7cf)","tc-badge-warning-fg":"var(--tc-color-warning-fg, #7a4f0a)","tc-badge-danger-bg":"var(--tc-color-danger-bg, #f4dad7)","tc-badge-danger-fg":"var(--tc-color-danger-fg, #7a1a14)"},styles:{display:"inline-block"},template:({props:e})=>`
      <span class="badge v-${Te(e.variant)} s-${Te(e.size)} ${e.pill?"pill":""}">
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
    `}));function Te(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Le="tc-skeleton",ze=Le;u(Le,c({props:{width:{type:"string",default:"100%"},height:{type:"string",default:"1em"},rounded:{type:"boolean",default:!1},pulse:{type:"boolean",default:!0}},theme:{"tc-skeleton-base":"var(--tc-color-rule, #ece5d3)","tc-skeleton-shine":"rgba(255, 255, 255, 0.6)","tc-skeleton-radius":"var(--tc-radius-md, 6px)"},styles:{display:"inline-block","vertical-align":"middle"},template:({props:e})=>`
      <span
        class="bone ${e.pulse?"pulse":""} ${e.rounded?"round":""}"
        aria-hidden="true"
        style="width: ${Ce(e.width)}; height: ${Ce(e.height)};"
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
    `}));function Ce(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Ae="tc-stack",Re=Ae;u(Ae,c({props:{gap:{type:"string",default:"4"},align:{type:"string",default:"stretch"}},styles:{display:"block"},template:({props:e})=>`
      <div class="stack" style="--tc-stack-gap: ${ut(e.gap)}; --tc-stack-align: ${ft(e.align)};">
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
    `}));function ut(e){let t=String(e??"4").trim();return/^[1-8]$/.test(t)?`var(--tc-space-${t}, ${pt(t)})`:t}function pt(e){return{1:"4px",2:"8px",3:"12px",4:"16px",5:"24px",6:"32px",7:"48px",8:"64px"}[e]??"16px"}function ft(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Ie="tc-cluster",Ne=Ie;u(Ie,c({props:{gap:{type:"string",default:"3"},justify:{type:"string",default:"start"},align:{type:"string",default:"center"},wrap:{type:"boolean",default:!0}},styles:{display:"block"},template:({props:e})=>`
      <div class="cluster" style="
        --tc-cluster-gap: ${bt(e.gap)};
        --tc-cluster-justify: ${gt(e.justify)};
        --tc-cluster-align: ${vt(e.align)};
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
    `}));function gt(e){let t=String(e??"start").trim();switch(t){case"between":return"space-between";case"around":return"space-around";case"evenly":return"space-evenly";default:return t}}function bt(e){let t=String(e??"3").trim();return/^[1-8]$/.test(t)?`var(--tc-space-${t}, ${mt(t)})`:t}function mt(e){return{1:"4px",2:"8px",3:"12px",4:"16px",5:"24px",6:"32px",7:"48px",8:"64px"}[e]??"12px"}function vt(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var qe="tc-grid",De=qe;u(qe,c({props:{min:{type:"string",default:"260px"},gap:{type:"string",default:"4"},columns:{type:"string",default:""}},styles:{display:"block"},template:({props:e})=>{let t=String(e.columns??"").trim();return`
        <div class="grid" style="
          --tc-grid-template: ${t?`repeat(${He(t)}, minmax(0, 1fr))`:`repeat(auto-fit, minmax(${He(e.min)}, 1fr))`};
          --tc-grid-gap: ${ht(e.gap)};
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
      `}}));function ht(e){let t=String(e??"4").trim();return/^[1-8]$/.test(t)?`var(--tc-space-${t}, ${yt(t)})`:t}function yt(e){return{1:"4px",2:"8px",3:"12px",4:"16px",5:"24px",6:"32px",7:"48px",8:"64px"}[e]??"16px"}function He(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Oe="tc-code",Fe=Oe;u(Oe,c({props:{language:{type:"string",default:""},copy:{type:"boolean",default:!1},filename:{type:"string",default:""}},theme:{"tc-code-bg":"var(--tc-code-bg-base, #14171f)","tc-code-ink":"var(--tc-code-ink-base, #efe6d4)","tc-code-rule":"var(--tc-code-rule-base, rgba(255,255,255,0.08))","tc-code-label":"var(--tc-code-label-base, #8a8678)","tc-code-radius":"var(--tc-radius-md, 10px)","tc-code-font":"var(--tc-font-mono, 'JetBrains Mono', ui-monospace, monospace)","tc-code-padding":"var(--tc-space-5, 20px) var(--tc-space-5, 20px)","tc-code-kw":"var(--tc-code-kw-base, #f0a878)","tc-code-str":"var(--tc-code-str-base, #d9b380)","tc-code-com":"var(--tc-code-com-base, #8a8678)","tc-code-num":"var(--tc-code-num-base, #c4d3b8)","tc-code-tag":"var(--tc-code-tag-base, #d49a68)"},styles:{display:"block"},template:({props:e,state:t})=>{let r=e.filename||e.language||"",a=t.copied===!0;return`
        <div class="block">
          ${r||e.copy?`
            <header class="bar">
              <span class="label">${je(r)}</span>
              ${e.copy?`<button type="button" class="copy" aria-label="Copy code">
                    <span class="copy-icon" aria-hidden="true">${a?kt:xt}</span>
                    <span class="copy-text">${a?"Copied":"Copy"}</span>
                  </button>`:""}
            </header>
          `:""}
          <pre><code class="code lang-${je(String(e.language||"txt"))}"><slot></slot></code></pre>
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
      `},events:{"click .copy":(e,t)=>{let r=t.host,a=r.shadowRoot?.querySelector("slot"),o=(a?a.assignedNodes({flatten:!0}):Array.from(r.childNodes)).map(d=>d.textContent??"").join(""),i=()=>{t.setState("copied",!0),t.emit("tc-copy",{text:o}),setTimeout(()=>t.setState("copied",!1),1600)};navigator.clipboard?.writeText?navigator.clipboard.writeText(o).then(i,i):i()}}}));var xt='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',kt='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';function je(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Ge="tc-callout",Pe=Ge;u(Ge,c({props:{variant:{type:"string",default:"note"},title:{type:"string",default:""},compact:{type:"boolean",default:!1}},theme:{"tc-callout-radius":"var(--tc-radius-md, 8px)","tc-callout-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif)","tc-callout-note-bg":"var(--tc-color-surface-alt, #faf8f3)","tc-callout-note-fg":"var(--tc-color-ink-soft, #4a5061)","tc-callout-note-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-callout-info-bg":"var(--tc-color-info-bg, #dde6f4)","tc-callout-info-fg":"var(--tc-color-info-fg, #1f3a66)","tc-callout-info-border":"var(--tc-color-info, #3a5b8c)","tc-callout-success-bg":"var(--tc-color-success-bg, #dbece2)","tc-callout-success-fg":"var(--tc-color-success-fg, #155b40)","tc-callout-success-border":"var(--tc-color-success, #207a5b)","tc-callout-warning-bg":"var(--tc-color-warning-bg, #f5e7cf)","tc-callout-warning-fg":"var(--tc-color-warning-fg, #7a4f0a)","tc-callout-warning-border":"var(--tc-color-warning, #a87326)","tc-callout-danger-bg":"var(--tc-color-danger-bg, #f4dad7)","tc-callout-danger-fg":"var(--tc-color-danger-fg, #7a1a14)","tc-callout-danger-border":"var(--tc-color-danger, #b3261e)"},styles:{display:"block"},template:({props:e})=>{let t=String(e.variant??"note"),r=Be[t]??Be.note;return`
        <aside
          class="callout v-${Ve(t)} ${e.compact?"compact":""}"
          role="${t==="danger"?"alert":"note"}"
        >
          <span class="icon" aria-hidden="true">${r}</span>
          <div class="body">
            ${e.title?`<div class="title">${Ve(e.title)}</div>`:""}
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
      `}}));var Be={note:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',info:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',success:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',warning:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',danger:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>'};function Ve(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var _e="tc-toc",Ke=_e,I=new WeakMap;u(_e,c({props:{target:{type:"string",default:"main"},levels:{type:"string",default:"h2,h3"},sticky:{type:"boolean",default:!0},label:{type:"string",default:"On this page"}},theme:{"tc-toc-fg":"var(--tc-color-ink, #14171f)","tc-toc-fg-muted":"var(--tc-color-ink-muted, #6b7280)","tc-toc-active":"var(--tc-color-accent, #a16939)","tc-toc-rule":"var(--tc-color-rule, #ece5d3)","tc-toc-label":"var(--tc-color-ink-soft, #4a5061)","tc-toc-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif)","tc-toc-top":"80px"},styles:{display:"block"},template:({props:e,state:t})=>{let r=t.items??[],a=t.activeId??"";return`
        <nav
          class="toc${e.sticky?" sticky":""}"
          aria-label="Table of contents"
        >
          ${e.label?`<div class="label">${q(e.label)}</div>`:""}
          ${r.length===0?'<p class="empty">No sections yet.</p>':`<ol class="list">${r.map(n=>`<li class="lvl-${n.level}${n.id===a?" active":""}"><a href="#${q(n.id)}">${q(n.text)}</a></li>`).join("")}</ol>`}
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
      `},afterMount(){wt(this)},unmount(){I.get(this)?.observer?.disconnect(),I.delete(this)}}));function wt(e){I.get(e)?.observer?.disconnect();let r=e,a=r.target||"main",n=(r.levels||"h2,h3").split(",").map(l=>l.trim().toLowerCase()).filter(Boolean),o=document.querySelector(a);if(!o)return;let i=Array.from(o.querySelectorAll(n.join(","))).filter(l=>l instanceof HTMLElement),d=i.map(l=>(l.id||(l.id=$t(l.textContent??"")),{id:l.id,level:parseInt(l.tagName.slice(1),10),text:(l.textContent??"").trim()}));if(e.setState("items",d),typeof IntersectionObserver>"u")return;let s=new IntersectionObserver(l=>{let f=l.filter(g=>g.isIntersecting).sort((g,m)=>g.boundingClientRect.top-m.boundingClientRect.top)[0];if(!f)return;let b=f.target.id;b&&e.setState("activeId",b)},{rootMargin:"0px 0px -70% 0px",threshold:0});for(let l of i)s.observe(l);I.set(e,{observer:s,activeId:""})}function $t(e){return e.toLowerCase().trim().replace(/[^\w\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-")||"section"}function q(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Ue="tc-pagination",Ye=Ue;u(Ue,c({props:{current:{type:"number",default:1},total:{type:"number",default:1},siblings:{type:"number",default:1},boundaries:{type:"number",default:1},size:{type:"string",default:"sm"},"prev-label":{type:"string",default:"Prev"},"next-label":{type:"string",default:"Next"},label:{type:"string",default:"Pagination"}},styles:{display:"block"},template:({props:e})=>{let t=Math.max(1,Number(e.total)|0),r=St(Number(e.current)|0,1,t),a=Math.max(0,Number(e.siblings)|0),n=Math.max(0,Number(e.boundaries)|0);if(t<=1)return"";let o=Tt(r,t,a,n),i=N(String(e.size??"sm")),d=r<=1?" disabled":"",s=r>=t?" disabled":"",l=o.map(p=>{if(p==="\u2026")return'<span class="ellipsis" aria-hidden="true">\u2026</span>';let f=p===r;return`<tc-button
            class="num"
            size="${i}"
            variant="${f?"primary":"ghost"}"
            data-page="${p}"${f?' aria-current="page"':""}
          >${p}</tc-button>`}).join("");return`
        <nav aria-label="${N(String(e.label??"Pagination"))}">
          <tc-button
            class="prev"
            size="${i}"
            variant="ghost"
            data-page="${r-1}"${d}
          >\u2190 ${N(String(e["prev-label"]??"Prev"))}</tc-button>
          <span class="pages">${l}</span>
          <tc-button
            class="next"
            size="${i}"
            variant="ghost"
            data-page="${r+1}"${s}
          >${N(String(e["next-label"]??"Next"))} \u2192</tc-button>
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
      `},events:{"click tc-button":(e,t)=>{let r=e.target.closest("tc-button");if(!r||r.hasAttribute("disabled"))return;let a=r.getAttribute("data-page");if(a==null)return;let n=Number(a),o=t.host,i=Math.max(1,Number(o.total)|0),d=Number(o.current)|0;!Number.isFinite(n)||n<1||n>i||n!==d&&t.emit("tc-page-change",{page:n})}}}));function St(e,t,r){return Math.min(r,Math.max(t,e))}function Tt(e,t,r,a){let n=new Set;for(let d=1;d<=Math.min(a,t);d++)n.add(d);for(let d=Math.max(1,t-a+1);d<=t;d++)n.add(d);for(let d=Math.max(1,e-r);d<=Math.min(t,e+r);d++)n.add(d);let o=[...n].sort((d,s)=>d-s),i=[];for(let d=0;d<o.length;d++)d>0&&o[d]-o[d-1]>1&&i.push("\u2026"),i.push(o[d]);return i}function N(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Wr={button:_,input:U,textarea:W,select:J,checkbox:Z,switch:re,file:ne,radioGroup:se,table:ce,tabs:ue,modal:be,toast:he,stat:ke,card:Se,badge:Me,skeleton:ze,stack:Re,cluster:Ne,grid:De,code:Fe,callout:Pe,toc:Ke,pagination:Ye};export{Wr as tags};
//# sourceMappingURL=mod.kit.js.map
