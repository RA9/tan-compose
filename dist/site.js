var Se=`:root {
  /* color \u2014 surface */
  --tc-color-bg:           #faf8f3;
  --tc-color-surface:      #ffffff;
  --tc-color-surface-alt:  #faf8f3;

  /* color \u2014 ink */
  --tc-color-ink:          #14171f;
  --tc-color-ink-soft:     #4a5061;
  --tc-color-ink-muted:    #6b7280;

  /* color \u2014 rule */
  --tc-color-rule:         #ece5d3;
  --tc-color-rule-strong:  #d9cfb8;

  /* color \u2014 accent */
  --tc-color-accent:       #a16939;
  --tc-color-accent-hover: #8a572d;
  --tc-color-accent-soft:  #efe2cf;

  /* color \u2014 semantic */
  --tc-color-info-bg:      #dde6f4;
  --tc-color-info-fg:      #1f3a66;
  --tc-color-info:         #3a5b8c;
  --tc-color-success-bg:   #dbece2;
  --tc-color-success-fg:   #155b40;
  --tc-color-success:      #207a5b;
  --tc-color-warning-bg:   #f5e7cf;
  --tc-color-warning-fg:   #7a4f0a;
  --tc-color-warning:      #a87326;
  --tc-color-danger-bg:    #f4dad7;
  --tc-color-danger-fg:    #7a1a14;
  --tc-color-danger:       #b3261e;

  /* radius */
  --tc-radius-sm:  4px;
  --tc-radius-md:  8px;
  --tc-radius-lg:  12px;
  --tc-radius-pill: 999px;

  /* shadow */
  --tc-shadow-sm: 0 1px 2px rgba(20, 23, 31, 0.04);
  --tc-shadow-md: 0 8px 24px rgba(20, 23, 31, 0.06);
  --tc-shadow-lg: 0 24px 60px rgba(20, 23, 31, 0.18);

  /* typography */
  --tc-font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --tc-font-mono: "JetBrains Mono", ui-monospace, "Cascadia Code", "Source Code Pro", monospace;

  /* spacing scale (used by layout primitives) */
  --tc-space-1: 4px;
  --tc-space-2: 8px;
  --tc-space-3: 12px;
  --tc-space-4: 16px;
  --tc-space-5: 24px;
  --tc-space-6: 32px;
  --tc-space-7: 48px;
  --tc-space-8: 64px;

  /* focus ring */
  --tc-focus-ring: 0 0 0 3px rgba(161, 105, 57, 0.18);
}
`,K=!1;function Te(){if(typeof document>"u"||K)return;if(document.querySelector("style[data-tc-tokens]")){K=!0;return}let e=document.createElement("style");e.setAttribute("data-tc-tokens",""),e.textContent=Se,document.head.insertBefore(e,document.head.firstChild),K=!0}Te();var Me=["beforeMount","afterMount","afterRender","unmount","action","formAssociatedCallback","formDisabledCallback","formResetCallback","formStateRestoreCallback"],Ee=new Set(["string","number","boolean","json"]);function d(e){if(e===null||typeof e!="object")throw new TypeError("describe(): options must be an object");if(e.tag!==void 0&&typeof e.tag!="string")throw new TypeError("describe(): `tag` must be a string");if(e.className!==void 0&&typeof e.className!="string")throw new TypeError("describe(): `className` must be a string");if(e.template!==void 0&&typeof e.template!="string"&&typeof e.template!="function")throw new TypeError("describe(): `template` must be a string or function");if(e.children!==void 0&&!Array.isArray(e.children))throw new TypeError("describe(): `children` must be an array");if(e.emit!==void 0&&!Array.isArray(e.emit))throw new TypeError("describe(): `emit` must be an array");if(e.observedAttributes!==void 0&&(!Array.isArray(e.observedAttributes)||e.observedAttributes.some(t=>typeof t!="string")))throw new TypeError("describe(): `observedAttributes` must be an array of strings");for(let t of["theme","styles","attributes","events","refs"]){let r=e[t];if(r!==void 0&&(r===null||typeof r!="object"||Array.isArray(r)))throw new TypeError(`describe(): \`${t}\` must be a record`)}if(e.refs!==void 0){for(let[t,r]of Object.entries(e.refs))if(typeof r!="string")throw new TypeError(`describe(): refs.${t} must be a CSS selector string`)}if(e.formAssociated!==void 0&&typeof e.formAssociated!="boolean")throw new TypeError("describe(): `formAssociated` must be a boolean");for(let t of Me){let r=e[t];if(r!==void 0&&typeof r!="function")throw new TypeError(`describe(): \`${t}\` must be a function`)}if(e.if!==void 0&&typeof e.if!="function")throw new TypeError("describe(): `if` must be a function");if(e.for!==void 0){let t=e.for;if(t===null||typeof t!="object"||Array.isArray(t))throw new TypeError("describe(): `for` must be a record");if(typeof t.items!="function")throw new TypeError("describe(): `for.items` must be a function");if(typeof t.key!="function")throw new TypeError("describe(): `for.key` must be a function");if(typeof t.render!="function")throw new TypeError("describe(): `for.render` must be a function")}if(e.props!==void 0){let t=e.props;if(t===null||typeof t!="object"||Array.isArray(t))throw new TypeError("describe(): `props` must be a record");for(let[r,a]of Object.entries(t)){if(a===null||typeof a!="object"||Array.isArray(a))throw new TypeError(`describe(): props.${r} must be a record`);if(!Ee.has(a.type))throw new TypeError(`describe(): props.${r}.type must be one of "string", "number", "boolean", "json"`)}}return{...e}}var W=new Map,Ce=/^[a-z][a-z0-9]*(-[a-z0-9]+)+$/,ze=/^(\S+)(?:\s+(.+))?$/;function u(e,t){if(typeof e!="string"||!Ce.test(e))throw new TypeError(`build(): "${e}" is not a valid custom element name (must be lowercase and contain a hyphen).`);if(W.has(e))return console.warn(`Component "${e}" is already registered. Skipping re-registration.`),e;if(typeof HTMLElement>"u"||typeof customElements>"u")return console.warn("HTMLElement or customElements not available; skipping component registration."),e;let r=Array.from(new Set([...t.observedAttributes??[],...Object.keys(t.props??{})])),a=t.props??{},n=t.refs??{},o=Ae(t);class i extends HTMLElement{static get observedAttributes(){return r}static get formAssociated(){return t.formAssociated===!0}isMounted=!1;mountCleanups=[];renderCleanups=[];state=new Map;propValues=new Map;listSlots=new WeakMap;currentRefs={};container;ctx;rendering=!1;renderQueued=!1;internals;constructor(){super();let s=this.attachShadow({mode:"open"});t.formAssociated&&typeof this.attachInternals=="function"&&(this.internals=this.attachInternals()),Ie(s,o),this.container=document.createElement("div"),this.container.className=t.className?`container ${t.className}`:"container",s.appendChild(this.container),t.attributes&&te(this,t.attributes),this.ctx=He(this,this.propValues,this.state,()=>this.currentRefs),this.initProps()}get refs(){return this.currentRefs}initProps(){for(let[s,l]of Object.entries(a)){let p=this.getAttribute(s),f=p!==null?Q(p,l.type):l.default;this.propValues.set(s,f),this.maybeSyncFormValue(s,f),Object.defineProperty(this,s,{configurable:!0,enumerable:!0,get:()=>this.propValues.get(s),set:b=>{let g=qe(b,l.type),v=this.propValues.get(s);Object.is(v,g)||(this.propValues.set(s,g),l.reflect&&De(this,s,g,l.type),this.maybeSyncFormValue(s,g),this.isMounted&&this.scheduleRender())}})}}maybeSyncFormValue(s,l){if(!this.internals||s!=="value")return;let p=l==null?null:String(l);this.internals.setFormValue(p)}connectedCallback(){if(!this.isMounted){try{t.beforeMount?.call(this)}catch(s){console.error(`[tan-compose] beforeMount threw for <${e}>:`,s)}if(this.renderInternal(),t.action){let s=t.action;this.addEventListener("click",s),this.mountCleanups.push(()=>this.removeEventListener("click",s))}if(t.emit)for(let s of t.emit)this.addEventListener(s.name,s.handler),this.mountCleanups.push(()=>this.removeEventListener(s.name,s.handler));t.events&&this.attachDelegatedEvents(t.events),this.isMounted=!0;try{t.afterMount?.call(this)}catch(s){console.error(`[tan-compose] afterMount threw for <${e}>:`,s)}}}disconnectedCallback(){try{t.unmount?.call(this)}catch(s){console.error(`[tan-compose] unmount threw for <${e}>:`,s)}$(this.mountCleanups),$(this.renderCleanups),this.flushListSlots(),this.isMounted=!1}flushListSlots(){ee(t,s=>{let l=this.listSlots.get(s);if(l){for(let p of l.cache.values())$(p.cleanups);l.cache.clear()}})}attributeChangedCallback(s,l,p){if(l!==p){if(Object.prototype.hasOwnProperty.call(a,s)){let f=a[s],b=p!==null?Q(p,f.type):f.default,g=this.propValues.get(s);Object.is(g,b)||(this.propValues.set(s,b),this.isMounted&&this.scheduleRender());return}this.state.set(s,p),this.isMounted&&this.scheduleRender()}}setState(s,l){let p=this.state.get(s);Object.is(p,l)||(this.state.set(s,l),this.isMounted&&this.scheduleRender())}getState(s){return this.state.get(s)}render(){this.renderInternal()}emitEvent(s,l){this.dispatchEvent(new CustomEvent(s,{detail:l,bubbles:!0,composed:!0}))}scheduleRender(){if(this.rendering){this.renderQueued=!0;return}this.renderInternal()}getOrCreateSlot(s){let l=this.listSlots.get(s);return l||(l={cache:new Map},this.listSlots.set(s,l)),l}renderInternal(){this.rendering=!0;try{$(this.renderCleanups),this.container.replaceChildren();let s={host:this,cleanups:this.renderCleanups,ctx:this.ctx};if(t.template!==void 0){let l=typeof t.template=="function"?t.template(this.ctx):t.template;l&&(this.container.innerHTML=l)}if(t.children)for(let l of t.children){let p=X(l,s,f=>this.getOrCreateSlot(f));p&&this.container.appendChild(p)}this.container.appendChild(document.createElement("slot")),this.refreshRefs()}finally{this.rendering=!1}if(this.renderQueued){this.renderQueued=!1,this.renderInternal();return}try{t.afterRender?.call(this)}catch(s){console.error(`[tan-compose] afterRender threw for <${e}>:`,s)}}refreshRefs(){let s={},l=this.shadowRoot;for(let[p,f]of Object.entries(n))s[p]=l?l.querySelector(f):null;this.currentRefs=s}formAssociatedCallback(s){try{t.formAssociatedCallback?.call(this,s)}catch(l){console.error(`[tan-compose] formAssociatedCallback threw for <${e}>:`,l)}}formDisabledCallback(s){try{t.formDisabledCallback?.call(this,s)}catch(l){console.error(`[tan-compose] formDisabledCallback threw for <${e}>:`,l)}}formResetCallback(){try{t.formResetCallback?.call(this)}catch(s){console.error(`[tan-compose] formResetCallback threw for <${e}>:`,s)}}formStateRestoreCallback(s,l){try{t.formStateRestoreCallback?.call(this,s,l)}catch(p){console.error(`[tan-compose] formStateRestoreCallback threw for <${e}>:`,p)}}attachDelegatedEvents(s){let l=new Map;for(let[p,f]of Object.entries(s)){let b=ze.exec(p.trim());if(!b)continue;let[,g,v]=b;l.has(g)||l.set(g,[]),l.get(g).push({selector:v??null,handler:f})}for(let[p,f]of l){let b=g=>{for(let{selector:v,handler:x}of f){if(!v){x(g,this.ctx);continue}let G=g.composedPath();for(let k of G){if(k===this.shadowRoot||k===this)break;if(k instanceof Element&&this.shadowRoot?.contains(k)&&k.matches(v)){x(g,this.ctx);break}}}};this.shadowRoot.addEventListener(p,b),this.mountCleanups.push(()=>this.shadowRoot?.removeEventListener(p,b))}}}return W.set(e,i),customElements.define(e,i),e}function X(e,t,r){return e.if&&!e.if(t.ctx)?null:Z(e,t,r)}function Z(e,t,r){let a=document.createElement(e.tag||"div");if(e.styles&&(a.style.cssText=Object.entries(e.styles).map(([n,o])=>`${n}: ${o}`).join("; ")),e.className&&(a.className=e.className),e.attributes&&te(a,e.attributes),e.template!==void 0){let n=typeof e.template=="function"?e.template(t.ctx):e.template;n&&(a.innerHTML=n)}if(e.children)for(let n of e.children){let o=X(n,t,r);o&&a.appendChild(o)}if(e.for&&Le(a,e,t,r),e.action){let n=e.action;a.addEventListener("click",n),t.cleanups.push(()=>a.removeEventListener("click",n))}if(e.emit)for(let n of e.emit)a.addEventListener(n.name,n.handler),t.cleanups.push(()=>a.removeEventListener(n.name,n.handler));return a}function Le(e,t,r,a){let n=t.for,o=a(t),i=n.items(r.ctx),c=new Map;for(let s=0;s<i.length;s++){let l=i[s],p=n.key(l,s),f,b=o.cache.get(p);if(b&&Object.is(b.lastItem,l))f=b;else{let g=[],v=n.render(l,s,r.ctx),x=Z(v,{...r,cleanups:g},a);b&&$(b.cleanups),f={element:x,lastItem:l,cleanups:g}}c.set(p,f),e.appendChild(f.element)}for(let[s,l]of o.cache)c.has(s)||$(l.cleanups);o.cache=c}function ee(e,t){if(e.for&&t(e),e.children)for(let r of e.children)ee(r,t)}function He(e,t,r,a){return{host:e,get props(){let n={};for(let[o,i]of t)n[o]=i;return n},get state(){let n={};for(let[o,i]of r)n[o]=i;return n},get refs(){return a()},setState:(n,o)=>e.setState(n,o),getState:n=>e.getState(n),emit:(n,o)=>e.emitEvent(n,o)}}function Ae(e){let t=e.theme?Re(e.theme):void 0,r=e.styles?Ne(e.styles):void 0;if(!t&&!r)return{kind:"adopted",sheets:[]};if(typeof CSSStyleSheet<"u"&&typeof CSSStyleSheet.prototype.replaceSync=="function"){let n=[];if(t){let o=new CSSStyleSheet;o.replaceSync(t),n.push(o)}if(r){let o=new CSSStyleSheet;o.replaceSync(r),n.push(o)}return{kind:"adopted",sheets:n}}return{kind:"fallback",theme:t,styles:r}}function Ie(e,t){if(t.kind==="adopted"){if(t.sheets.length>0)try{e.adoptedStyleSheets=t.sheets}catch{}return}if(t.theme){let r=document.createElement("style");r.textContent=t.theme,e.appendChild(r)}if(t.styles){let r=document.createElement("style");r.textContent=t.styles,e.appendChild(r)}}function te(e,t){for(let[r,a]of Object.entries(t))e.setAttribute(r,a)}function Re(e){return`:host { ${Object.entries(e).map(([r,a])=>`--${r}: ${a};`).join(" ")} }`}function Ne(e){return`.container { ${Object.entries(e).map(([r,a])=>`${r}: ${a};`).join(" ")} }`}function $(e){for(;e.length>0;){let t=e.pop();try{t?.()}catch(r){console.error("[tan-compose] cleanup threw:",r)}}}function Q(e,t){switch(t){case"string":return e;case"number":{let r=Number(e);return Number.isNaN(r)?void 0:r}case"boolean":return e!=="false"&&e!=="0";case"json":try{return JSON.parse(e)}catch{return}}}function qe(e,t){switch(t){case"string":return e==null?e:String(e);case"number":return e==null?e:Number(e);case"boolean":return!!e;case"json":return e}}function De(e,t,r,a){if(a!=="json"){if(a==="boolean"){r?e.setAttribute(t,""):e.removeAttribute(t);return}if(r==null){e.removeAttribute(t);return}e.setAttribute(t,String(r))}}var Oe="tc-button";var re=`
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
`;u(Oe,d({props:{variant:{type:"string",default:"primary"},size:{type:"string",default:"md"},disabled:{type:"boolean",default:!1,reflect:!0},loading:{type:"boolean",default:!1},block:{type:"boolean",default:!1},href:{type:"string",default:""},target:{type:"string",default:""},rel:{type:"string",default:""}},theme:{"tc-btn-primary-bg":"var(--tc-color-ink, #14171f)","tc-btn-primary-fg":"var(--tc-color-surface, #ffffff)","tc-btn-secondary-bg":"var(--tc-color-surface, #ffffff)","tc-btn-secondary-fg":"var(--tc-color-ink, #14171f)","tc-btn-secondary-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-btn-ghost-fg":"var(--tc-color-ink, #14171f)","tc-btn-ghost-border":"transparent","tc-btn-danger-bg":"var(--tc-color-danger, #b3261e)","tc-btn-danger-fg":"var(--tc-color-surface, #ffffff)","tc-btn-radius":"var(--tc-radius-md, 8px)","tc-btn-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"inline-block","vertical-align":"middle"},template:({props:e})=>{let t=`root v-${H(e.variant)} s-${H(e.size)}${e.block?" block":""}`,r=`${e.loading?'<span class="spinner" aria-hidden="true"></span>':""}
        <span class="content"><slot></slot></span>`,a=String(e.href??""),n=a.length>0,o=!!(e.disabled||e.loading);if(n){let i=e.target?` target="${H(e.target)}"`:"",c=e.rel?String(e.rel):String(e.target)==="_blank"?"noopener":"",s=c?` rel="${H(c)}"`:"",l=o?"":` href="${H(a)}"`;return`
      <a
        part="button"
        class="${t}"${l}${i}${s}${o?' aria-disabled="true"':""}${o?' tabindex="-1"':""}
        role="button"
      >
        ${r}
      </a>${re}`}return`
      <button
        part="button"
        class="${t}"
        ${o?"disabled":""}
        type="button"
      >
        ${r}
      </button>${re}`}}));function H(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var je="tc-input";u(je,d({formAssociated:!0,props:{value:{type:"string",default:""},name:{type:"string",default:""},type:{type:"string",default:"text"},placeholder:{type:"string",default:""},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0}},theme:{"tc-input-bg":"var(--tc-color-surface, #ffffff)","tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-border-focus":"var(--tc-color-accent, #a16939)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-radius":"var(--tc-radius-md, 8px)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},refs:{input:"input"},template:({props:e})=>{let t=!!e.error;return`
        ${e.label?`<label class="label">${S(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</label>`:""}
        <input
          class="input ${t?"invalid":""}"
          part="input"
          type="${S(e.type)}"
          value="${S(e.value)}"
          name="${S(e.name)}"
          placeholder="${S(e.placeholder)}"
          ${e.disabled?"disabled":""}
          ${e.required?"required":""}
          aria-invalid="${t?"true":"false"}"
        />
        ${e.error||e.helper?`<div class="${t?"error":"helper"}">${S(e.error||e.helper)}</div>`:""}
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
      `},events:{"input input":(e,t)=>{let r=e.target.value,a=t.host;a.internals?.setFormValue(r),a.value=r,t.emit("tc-input",{value:r})}},formResetCallback(){this.value=""}}));function S(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Be="tc-textarea";u(Be,d({formAssociated:!0,props:{value:{type:"string",default:""},name:{type:"string",default:""},placeholder:{type:"string",default:""},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},rows:{type:"number",default:4},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0},resize:{type:"string",default:"vertical"}},theme:{"tc-input-bg":"var(--tc-color-surface, #ffffff)","tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-border-focus":"var(--tc-color-accent, #a16939)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-radius":"var(--tc-radius-md, 8px)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},refs:{input:"textarea"},template:({props:e})=>{let t=!!e.error;return`
        ${e.label?`<label class="label">${w(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</label>`:""}
        <textarea
          class="input ${t?"invalid":""}"
          part="textarea"
          name="${w(e.name)}"
          placeholder="${w(e.placeholder)}"
          rows="${w(e.rows)}"
          ${e.disabled?"disabled":""}
          ${e.required?"required":""}
          aria-invalid="${t?"true":"false"}"
          style="resize: ${w(e.resize)};"
        >${w(e.value)}</textarea>
        ${e.error||e.helper?`<div class="${t?"error":"helper"}">${w(e.error||e.helper)}</div>`:""}
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
      `},events:{"input textarea":(e,t)=>{let r=e.target.value,a=t.host;a.internals?.setFormValue(r),a.value=r,t.emit("tc-input",{value:r})}},formResetCallback(){this.value=""}}));function w(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Fe="tc-select";u(Fe,d({formAssociated:!0,props:{value:{type:"string",default:""},name:{type:"string",default:""},options:{type:"json",default:[]},placeholder:{type:"string",default:""},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0}},theme:{"tc-input-bg":"var(--tc-color-surface, #ffffff)","tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-border-focus":"var(--tc-color-accent, #a16939)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-radius":"var(--tc-radius-md, 8px)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},template:({props:e})=>{let t=e.options??[],r=!!e.error;return`
        ${e.label?`<label class="label">${T(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</label>`:""}
        <div class="wrap">
          <select
            class="select ${r?"invalid":""}"
            part="select"
            name="${T(e.name)}"
            ${e.disabled?"disabled":""}
            ${e.required?"required":""}
            aria-invalid="${r?"true":"false"}"
          >
            ${e.placeholder?`<option value="" disabled ${e.value===""?"selected":""}>${T(e.placeholder)}</option>`:""}
            ${t.map(a=>`<option value="${T(a.value)}"${a.disabled?" disabled":""}${a.value===e.value?" selected":""}>${T(a.label)}</option>`).join("")}
          </select>
          <span class="caret" aria-hidden="true">\u25BE</span>
        </div>
        ${e.error||e.helper?`<div class="${r?"error":"helper"}">${T(e.error||e.helper)}</div>`:""}
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
      `},events:{"change select":(e,t)=>{let r=e.target.value,a=t.host;a.internals?.setFormValue(r),a.value=r,t.emit("tc-change",{value:r})}},formResetCallback(){this.value=""}}));function T(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Ve="tc-checkbox";u(Ve,d({formAssociated:!0,props:{checked:{type:"boolean",default:!1,reflect:!0},name:{type:"string",default:""},value:{type:"string",default:"on"},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0},indeterminate:{type:"boolean",default:!1}},theme:{"tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-border-focus":"var(--tc-color-accent, #a16939)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-radius":"var(--tc-radius-sm, 4px)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-checkbox-accent":"var(--tc-color-accent, #a16939)"},styles:{display:"block"},template:({props:e})=>{let t=!!e.error;return`
        <label class="row ${e.disabled?"is-disabled":""} ${t?"is-invalid":""}">
          <input
            class="cb"
            type="checkbox"
            name="${D(e.name)}"
            value="${D(e.value)}"
            ${e.checked?"checked":""}
            ${e.disabled?"disabled":""}
            ${e.required?"required":""}
            aria-invalid="${t?"true":"false"}"
          />
          ${e.label?`<span class="label">${D(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</span>`:"<span></span>"}
        </label>
        ${e.error||e.helper?`<div class="${t?"error":"helper"}">${D(e.error||e.helper)}</div>`:""}
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
      `},refs:{input:".cb"},events:{"change .cb":(e,t)=>{let r=e.target.checked,a=t.host;a.checked=r,a.internals?.setFormValue(r?a.value:null),t.emit("tc-change",{checked:r})}},afterMount(){let e=this,r=e.shadowRoot?.querySelector(".cb");r&&(r.indeterminate=e.indeterminate),e.internals?.setFormValue(e.checked?e.value:null)},formResetCallback(){this.checked=!1}}));function D(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Pe="tc-switch";u(Pe,d({formAssociated:!0,props:{checked:{type:"boolean",default:!1,reflect:!0},name:{type:"string",default:""},value:{type:"string",default:"on"},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},disabled:{type:"boolean",default:!1,reflect:!0}},theme:{"tc-switch-track-off":"var(--tc-color-rule-strong, #d9cfb8)","tc-switch-track-on":"var(--tc-color-accent, #a16939)","tc-switch-thumb":"var(--tc-color-surface, #ffffff)","tc-switch-fg":"var(--tc-color-ink, #14171f)","tc-switch-helper":"var(--tc-color-ink-muted, #6b7280)","tc-switch-error":"var(--tc-color-danger, #b3261e)","tc-switch-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},template:({props:e})=>{let t=!!e.error;return`
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
          ${e.label?`<span class="label">${ae(e.label)}</span>`:""}
        </label>
        ${e.error||e.helper?`<div class="${t?"error":"helper"}">${ae(e.error||e.helper)}</div>`:""}
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
      `},events:{"click .track":(e,t)=>{let r=t.host;r.disabled||(r.checked=!r.checked,r.internals?.setFormValue(r.checked?r.value:null),t.emit("tc-change",{checked:r.checked}))},"keydown .track":(e,t)=>{let r=e;if(r.key!==" "&&r.key!=="Enter")return;r.preventDefault();let a=t.host;a.disabled||(a.checked=!a.checked,a.internals?.setFormValue(a.checked?a.value:null),t.emit("tc-change",{checked:a.checked}))}},afterMount(){let e=this;e.internals?.setFormValue(e.checked?e.value:null)},formResetCallback(){this.checked=!1}}));function ae(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Ge="tc-file";u(Ge,d({formAssociated:!0,props:{name:{type:"string",default:""},accept:{type:"string",default:""},multiple:{type:"boolean",default:!1,reflect:!0},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},buttonText:{type:"string",default:"Choose file"},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0}},theme:{"tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-border-focus":"var(--tc-color-accent, #a16939)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-radius":"var(--tc-radius-md, 8px)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-file-zone-bg":"var(--tc-color-surface-alt, #faf8f3)","tc-file-zone-fg":"var(--tc-color-ink-soft, #4a5061)"},styles:{display:"block"},refs:{input:"input[type='file']"},template:({props:e,state:t})=>{let r=!!e.error,a=t.files??[],n=a.length===0?"No file selected":a.length===1?M(a[0].name):`${a.length} files selected`;return`
        ${e.label?`<label class="label">${M(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</label>`:""}
        <div class="zone ${e.disabled?"is-disabled":""} ${r?"is-invalid":""}">
          <button class="btn" type="button" ${e.disabled?"disabled":""}>
            ${M(e.buttonText)}
          </button>
          <span class="files">${n}</span>
          <input
            class="native"
            type="file"
            name="${M(e.name)}"
            accept="${M(e.accept)}"
            ${e.multiple?"multiple":""}
            ${e.disabled?"disabled":""}
            ${e.required?"required":""}
            tabindex="-1"
            aria-hidden="true"
          />
        </div>
        ${e.error||e.helper?`<div class="${r?"error":"helper"}">${M(e.error||e.helper)}</div>`:""}
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
      `},events:{"click .btn":(e,t)=>{t.refs.input?.click()},"change input[type='file']":(e,t)=>{let r=e.target,a=Array.from(r.files??[]);t.setState("files",a);let n=t.host;if(n.internals)if(a.length===0)n.internals.setFormValue(null);else if(a.length===1)n.internals.setFormValue(a[0]);else{let o=new FormData,i=n.name;for(let c of a)o.append(i,c);n.internals.setFormValue(o)}t.emit("tc-files",{files:a})}},formResetCallback(){let t=this.shadowRoot?.querySelector(".native");t&&(t.value=""),this.setState("files",[])}}));function M(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var _e="tc-radio-group";u(_e,d({formAssociated:!0,props:{value:{type:"string",default:""},name:{type:"string",default:""},options:{type:"json",default:[]},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},layout:{type:"string",default:"vertical"},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0}},theme:{"tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-radio-accent":"var(--tc-color-accent, #a16939)"},styles:{display:"block"},template:({props:e})=>{let t=e.options??[],r=!!e.error,a=String(e.layout??"vertical");return`
        <fieldset class="group" ${e.disabled?"disabled":""}>
          ${e.label?`<legend class="legend">${E(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</legend>`:""}
          <div class="opts l-${E(a)}" role="radiogroup" aria-invalid="${r?"true":"false"}">
            ${t.map((n,o)=>`<label class="opt ${n.disabled?"is-disabled":""}">
                  <input
                    type="radio"
                    class="r"
                    name="${E(e.name)||`__rg_${o}__`}"
                    value="${E(n.value)}"
                    ${n.value===e.value?"checked":""}
                    ${n.disabled||e.disabled?"disabled":""}
                  />
                  <span>${E(n.label)}</span>
                </label>`).join("")}
          </div>
        </fieldset>
        ${e.error||e.helper?`<div class="${r?"error":"helper"}">${E(e.error||e.helper)}</div>`:""}
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
      `},events:{"change input.r":(e,t)=>{let r=e.target.value,a=t.host;a.value=r,a.internals?.setFormValue(r),t.emit("tc-change",{value:r})}},afterMount(){let e=this;e.value&&e.internals?.setFormValue(e.value)},formResetCallback(){this.value=""}}));function E(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Ke="tc-table";var Ue=`
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
`;u(Ke,d({props:{rows:{type:"json",default:[]},columns:{type:"json",default:[]},pageSize:{type:"number",default:10},filterable:{type:"boolean",default:!0},emptyText:{type:"string",default:"No results."},rowKey:{type:"string",default:"id"}},theme:{"tc-table-surface":"var(--tc-color-surface, #ffffff)","tc-table-ink":"var(--tc-color-ink, #14171f)","tc-table-soft":"var(--tc-color-ink-soft, #5a6072)","tc-table-rule":"var(--tc-color-rule, #ece5d3)","tc-table-head-bg":"var(--tc-color-surface-alt, #faf8f3)","tc-table-row-hover":"rgba(161, 105, 57, 0.05)","tc-table-accent":"var(--tc-color-accent, #a16939)","tc-table-radius":"var(--tc-radius-lg, 10px)","tc-table-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},children:[d({tag:"style",template:Ue}),d({if:({props:e})=>!!e.filterable,tag:"input",className:"filter",attributes:{placeholder:"Search...",type:"text"}}),d({tag:"div",className:"wrap",children:[d({tag:"table",children:[d({tag:"thead",template:({props:e,state:t})=>{let r=e.columns??[],a=t;return`<tr>${r.map(n=>{let o=a.sortKey===n.key,i=n.sortable!==!1,c=o?a.sortDir==="asc"?"\u25B2":"\u25BC":"",s=o?a.sortDir==="asc"?"ascending":"descending":"none";return`<th
                        data-col="${O(n.key)}"
                        class="${i?"sortable":""}"
                        aria-sort="${s}"
                      >${O(n.label)}<span class="sort">${c}</span></th>`}).join("")}</tr>`}}),d({tag:"tbody",children:[d({tag:"tr",className:"empty",if:({props:e,state:t})=>ne(e,t).length===0,template:({props:e})=>`<td colspan="${(e.columns??[]).length||1}">${O(e.emptyText)}</td>`})],for:{items:({props:e,state:t})=>ne(e,t),key:(e,t)=>e["id"]??t,render:(e,t,r)=>{let n=r.props.columns??[],o=e;return d({tag:"tr",attributes:{"data-row-id":String(o.id??t)},template:n.map(i=>`<td>${typeof i.render=="function"?i.render(o):O(o[i.key]??"")}</td>`).join("")})}}})]})]}),d({tag:"footer",className:"pager",template:({props:e,state:t})=>{let r=t,a=j(e,r),n=e.pageSize??10,o=Math.max(1,Math.ceil(a.length/n)),i=Math.min(r.page??0,o-1),c=(e.rows??[]).length;return`
            <span class="count">${a.length} of ${c} rows</span>
            <span class="spacer"></span>
            <button class="prev" type="button" ${i<=0?"disabled":""}>\u2039 prev</button>
            <span class="page">page ${i+1} of ${o}</span>
            <button class="next" type="button" ${i>=o-1?"disabled":""}>next \u203A</button>
          `}})],refs:{filter:".filter"},afterRender(){let e=this,t=e.refs.filter;if(!t)return;let r=e.getState("q")??"";t.value!==r&&(t.value=r);let a=U.get(e);if(a){U.delete(e),t.focus();let n=Math.min(a.caret,t.value.length);try{t.setSelectionRange(n,n)}catch{}}},events:{"input .filter":(e,t)=>{let r=e.target;U.set(t.host,{caret:r.selectionStart??r.value.length}),t.setState("q",r.value),t.setState("page",0)},"click .prev":(e,t)=>{let r=(t.state.page??0)-1;t.setState("page",Math.max(0,r))},"click .next":(e,t)=>{let r=t.state,a=j(t.props,r).length,n=t.props.pageSize??10,o=Math.max(0,Math.ceil(a/n)-1),i=(r.page??0)+1;t.setState("page",Math.min(o,i))},"click th.sortable":(e,t)=>{let r=e.target.closest("th");if(!r)return;let a=r.dataset.col;if(!a)return;let n=t.state,o;n.sortKey!==a?o="asc":o=n.sortDir==="asc"?"desc":n.sortDir==="desc"?null:"asc",t.setState("sortKey",o?a:null),t.setState("sortDir",o),t.emit("tc-sort-change",{key:o?a:null,direction:o})},"click tr[data-row-id]":(e,t)=>{let r=e.target.closest("tr[data-row-id]");if(!r)return;let a=r.dataset.rowId;if(a===void 0)return;let n=j(t.props,t.state),o=n.find(i=>String(i.id)===a)??n[Number(a)];o&&t.emit("tc-row-click",{row:o})}}}));var U=new WeakMap;function j(e,t){let r=e.rows??[],a=e.columns??[],n=(t.q??"").trim().toLowerCase(),o=n.length===0?r.slice():r.filter(i=>a.some(c=>String(i[c.key]??"").toLowerCase().includes(n)));if(t.sortKey&&t.sortDir){let i=t.sortKey,c=t.sortDir==="asc"?1:-1;o=o.slice().sort((s,l)=>{let p=s[i],f=l[i];return p===f?0:p==null?1:f==null?-1:typeof p=="number"&&typeof f=="number"?(p-f)*c:String(p).localeCompare(String(f))*c})}return o}function ne(e,t){let r=e.pageSize??10,a=j(e,t),n=Math.max(1,Math.ceil(a.length/r)),o=Math.min(t.page??0,n-1);return a.slice(o*r,o*r+r)}function O(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Ye="tc-tabs";u(Ye,d({props:{tabs:{type:"json",default:[]},active:{type:"string",default:"",reflect:!0}},theme:{"tc-tabs-fg":"var(--tc-color-ink, #14171f)","tc-tabs-fg-muted":"var(--tc-color-ink-muted, #6b7280)","tc-tabs-rule":"var(--tc-color-rule, #ece5d3)","tc-tabs-accent":"var(--tc-color-accent, #a16939)","tc-tabs-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block","font-family":"var(--tc-tabs-font)"},template:({props:e})=>{let t=e.tabs??[],r=e.active||t[0]?.id||"";return`
        <div role="tablist" class="strip">
          ${t.map(a=>`<button
              role="tab"
              type="button"
              class="tab ${a.id===r?"active":""}"
              data-tab="${A(a.id)}"
              aria-selected="${a.id===r?"true":"false"}"
              aria-controls="panel-${A(a.id)}"
              tabindex="${a.id===r?"0":"-1"}"
            >${A(a.label)}</button>`).join("")}
        </div>
        <div class="panels">
          ${t.map(a=>`<section
              role="tabpanel"
              id="panel-${A(a.id)}"
              class="panel"
              aria-labelledby=""
              ${a.id===r?"":"hidden"}
            ><slot name="${A(a.id)}"></slot></section>`).join("")}
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
      `},events:{"click .tab":(e,t)=>{let r=e.target.closest(".tab");if(!r)return;let a=r.dataset.tab;if(!a)return;let n=t.host,o=n.active;o!==a&&(n.active=a,t.emit("tc-tab-change",{active:a,previous:o}))},"keydown .tab":(e,t)=>{let r=e,a=t.props.tabs??[];if(a.length===0)return;let n=t.host,o=n.active||a[0].id,i=a.findIndex(l=>l.id===o),c=i;if(r.key==="ArrowRight")c=(i+1)%a.length;else if(r.key==="ArrowLeft")c=(i-1+a.length)%a.length;else if(r.key==="Home")c=0;else if(r.key==="End")c=a.length-1;else return;r.preventDefault();let s=a[c].id;n.active=s,t.emit("tc-tab-change",{active:s,previous:o}),queueMicrotask(()=>{t.host.shadowRoot?.querySelector(`.tab[data-tab="${s}"]`)?.focus()})}}}));function A(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Je="tc-modal";u(Je,d({props:{open:{type:"boolean",default:!1,reflect:!0},title:{type:"string",default:""},dismissible:{type:"boolean",default:!0},width:{type:"string",default:"min(560px, 92vw)"}},theme:{"tc-modal-surface":"var(--tc-color-surface, #ffffff)","tc-modal-ink":"var(--tc-color-ink, #14171f)","tc-modal-rule":"var(--tc-color-rule, #ece5d3)","tc-modal-soft":"var(--tc-color-ink-soft, #5a6072)","tc-modal-radius":"var(--tc-radius-lg, 12px)","tc-modal-backdrop":"rgba(20, 23, 31, 0.5)","tc-modal-shadow":"var(--tc-shadow-lg, 0 24px 60px rgba(20, 23, 31, 0.25))","tc-modal-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"contents"},template:({props:e})=>`
      <dialog class="dlg" aria-labelledby="${e.title?"title":""}">
        ${e.title||e.dismissible?`<header class="head">
              ${e.title?`<h2 id="title" class="title">${se(e.title)}</h2>`:"<span></span>"}
              ${e.dismissible?'<button class="x" type="button" aria-label="Close">\xD7</button>':""}
            </header>`:""}
        <div class="body"><slot></slot></div>
        <footer class="foot"><slot name="footer"></slot></footer>
      </dialog>
      <style>
        .dlg {
          width: ${se(e.width)};
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
    `,refs:{dialog:".dlg"},events:{"click .x":(e,t)=>{oe(t.host,"button")},"click .dlg":(e,t)=>{let r=t.host;if(!r.dismissible)return;let a=t.refs.dialog;a&&e.target===a&&oe(r,"backdrop")}},afterRender(){We(this)},unmount(){let e=C.get(this);e&&(e.cleanup(),C.delete(this))}}));var C=new WeakMap;function We(e){let t=e.shadowRoot;if(!t)return;let r=t.querySelector(".dlg");if(!r)return;let a=e.open,n=C.get(e);if(n&&n.dialog!==r&&(n.cleanup(),C.delete(e)),a&&!r.open){if(typeof r.showModal=="function")try{r.showModal()}catch{r.setAttribute("open","")}else r.setAttribute("open","");if(!C.has(e)){let o=()=>{let i=e;i.open&&(i.open=!1,e.dispatchEvent(new CustomEvent("tc-close",{detail:{reason:"escape"},bubbles:!0,composed:!0})))};r.addEventListener("close",o),C.set(e,{dialog:r,cleanup:()=>r.removeEventListener("close",o)})}}else if(!a&&r.open)try{r.close()}catch{r.removeAttribute("open")}}function oe(e,t){e.open&&(e.open=!1,e.dispatchEvent(new CustomEvent("tc-close",{detail:{reason:t},bubbles:!0,composed:!0})))}function se(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Qe="tc-toast";var I=new WeakMap;u(Qe,d({props:{open:{type:"boolean",default:!1,reflect:!0},variant:{type:"string",default:"info"},message:{type:"string",default:""},duration:{type:"number",default:4e3},dismissible:{type:"boolean",default:!0}},theme:{"tc-toast-info":"var(--tc-color-info, #3a5b8c)","tc-toast-success":"var(--tc-color-success, #207a5b)","tc-toast-warning":"var(--tc-color-warning, #a87326)","tc-toast-error":"var(--tc-color-danger, #b3261e)","tc-toast-fg":"var(--tc-color-surface, #ffffff)","tc-toast-radius":"var(--tc-radius-lg, 10px)","tc-toast-shadow":"var(--tc-shadow-lg, 0 12px 30px rgba(20, 23, 31, 0.18))","tc-toast-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},template:({props:e})=>{let t=String(e.variant??"info"),r=t==="success"?"\u2713":t==="warning"?"!":t==="error"?"\u2715":"i";return`
        <div class="toast v-${le(t)} ${e.open?"open":"closed"}" role="status" aria-live="polite">
          <span class="icon" aria-hidden="true">${r}</span>
          <span class="msg">${e.message?le(e.message):"<slot></slot>"}</span>
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
      `},events:{"click .x":(e,t)=>ie(t.host,"button")},afterMount(){Xe(this)},unmount(){let e=I.get(this);e!==void 0&&(clearTimeout(e),I.delete(this))}}));function Xe(e){let t=e,r=I.get(e);if(r!==void 0&&clearTimeout(r),I.delete(e),!t.open||!t.duration||t.duration<=0)return;let a=setTimeout(()=>{t.open&&ie(e,"timeout")},t.duration);I.set(e,a)}function ie(e,t){let r=e;r.open&&(r.open=!1,e.dispatchEvent(new CustomEvent("tc-toast-close",{detail:{reason:t},bubbles:!0,composed:!0})))}function le(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Ze="tc-stat";u(Ze,d({props:{label:{type:"string",default:""},value:{type:"string",default:""},delta:{type:"string",default:""},trend:{type:"string",default:"neutral"},prefix:{type:"string",default:""},suffix:{type:"string",default:""}},theme:{"tc-stat-surface":"var(--tc-color-surface, #ffffff)","tc-stat-rule":"var(--tc-color-rule, #ece5d3)","tc-stat-label":"var(--tc-color-ink-muted, #6b7280)","tc-stat-value":"var(--tc-color-ink, #14171f)","tc-stat-up":"var(--tc-color-success, #207a5b)","tc-stat-down":"var(--tc-color-danger, #b3261e)","tc-stat-neutral":"var(--tc-color-ink-muted, #6b7280)","tc-stat-radius":"var(--tc-radius-lg, 12px)","tc-stat-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},template:({props:e})=>{let t=String(e.trend??"neutral"),r=t==="up"?"\u25B2":t==="down"?"\u25BC":"\u2022";return`
        <div class="card">
          ${e.label?`<div class="label">${z(e.label)}</div>`:""}
          <div class="value">
            ${e.prefix?`<span class="prefix">${z(e.prefix)}</span>`:""}
            <span class="num">${z(e.value)}</span>
            ${e.suffix?`<span class="suffix">${z(e.suffix)}</span>`:""}
          </div>
          ${e.delta?`<div class="delta t-${z(t)}">
                  <span class="arrow" aria-hidden="true">${r}</span>
                  <span>${z(e.delta)}</span>
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
      `}}));function z(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var et="tc-card";u(et,d({props:{title:{type:"string",default:""},subtitle:{type:"string",default:""},padded:{type:"boolean",default:!0},bordered:{type:"boolean",default:!0},elevated:{type:"boolean",default:!1}},theme:{"tc-card-surface":"var(--tc-color-surface, #ffffff)","tc-card-ink":"var(--tc-color-ink, #14171f)","tc-card-soft":"var(--tc-color-ink-soft, #5a6072)","tc-card-rule":"var(--tc-color-rule, #ece5d3)","tc-card-radius":"var(--tc-radius-lg, 12px)","tc-card-shadow":"var(--tc-shadow-md, 0 8px 24px rgba(20, 23, 31, 0.06))","tc-card-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-card-padding-x":"var(--tc-space-5, 20px)","tc-card-padding-y":"var(--tc-space-5, 20px)","tc-card-gap":"var(--tc-space-3, 12px)"},styles:{display:"block"},template:({props:e})=>{let t=!!e.title||!!e.subtitle;return`
        <div class="${["card",e.bordered?"bordered":"",e.elevated?"elevated":"",e.padded===!1?"nopad":"",t?"has-header":""].filter(Boolean).join(" ")}">
          <div class="media"><slot name="media"></slot></div>
          <div class="head">
            <slot name="header">
              ${e.title?`<div class="title">${ce(e.title)}</div>`:""}
              ${e.subtitle?`<div class="subtitle">${ce(e.subtitle)}</div>`:""}
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
      `}}));function ce(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var tt="tc-badge";u(tt,d({props:{variant:{type:"string",default:"neutral"},size:{type:"string",default:"md"},pill:{type:"boolean",default:!1}},theme:{"tc-badge-radius":"var(--tc-radius-sm, 6px)","tc-badge-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-badge-neutral-bg":"var(--tc-color-rule, #ece5d3)","tc-badge-neutral-fg":"var(--tc-color-ink, #14171f)","tc-badge-info-bg":"var(--tc-color-info-bg, #dde6f4)","tc-badge-info-fg":"var(--tc-color-info-fg, #1f3a66)","tc-badge-success-bg":"var(--tc-color-success-bg, #dbece2)","tc-badge-success-fg":"var(--tc-color-success-fg, #155b40)","tc-badge-warning-bg":"var(--tc-color-warning-bg, #f5e7cf)","tc-badge-warning-fg":"var(--tc-color-warning-fg, #7a4f0a)","tc-badge-danger-bg":"var(--tc-color-danger-bg, #f4dad7)","tc-badge-danger-fg":"var(--tc-color-danger-fg, #7a1a14)"},styles:{display:"inline-block"},template:({props:e})=>`
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
    `}));function de(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var rt="tc-skeleton";u(rt,d({props:{width:{type:"string",default:"100%"},height:{type:"string",default:"1em"},rounded:{type:"boolean",default:!1},pulse:{type:"boolean",default:!0}},theme:{"tc-skeleton-base":"var(--tc-color-rule, #ece5d3)","tc-skeleton-shine":"rgba(255, 255, 255, 0.6)","tc-skeleton-radius":"var(--tc-radius-md, 6px)"},styles:{display:"inline-block","vertical-align":"middle"},template:({props:e})=>`
      <span
        class="bone ${e.pulse?"pulse":""} ${e.rounded?"round":""}"
        aria-hidden="true"
        style="width: ${ue(e.width)}; height: ${ue(e.height)};"
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
    `}));function ue(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var at="tc-stack";u(at,d({props:{gap:{type:"string",default:"4"},align:{type:"string",default:"stretch"}},styles:{display:"block"},template:({props:e})=>`
      <div class="stack" style="--tc-stack-gap: ${nt(e.gap)}; --tc-stack-align: ${st(e.align)};">
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
    `}));function nt(e){let t=String(e??"4").trim();return/^[1-8]$/.test(t)?`var(--tc-space-${t}, ${ot(t)})`:t}function ot(e){return{1:"4px",2:"8px",3:"12px",4:"16px",5:"24px",6:"32px",7:"48px",8:"64px"}[e]??"16px"}function st(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var lt="tc-cluster";u(lt,d({props:{gap:{type:"string",default:"3"},justify:{type:"string",default:"start"},align:{type:"string",default:"center"},wrap:{type:"boolean",default:!0}},styles:{display:"block"},template:({props:e})=>`
      <div class="cluster" style="
        --tc-cluster-gap: ${ct(e.gap)};
        --tc-cluster-justify: ${it(e.justify)};
        --tc-cluster-align: ${ut(e.align)};
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
    `}));function it(e){let t=String(e??"start").trim();switch(t){case"between":return"space-between";case"around":return"space-around";case"evenly":return"space-evenly";default:return t}}function ct(e){let t=String(e??"3").trim();return/^[1-8]$/.test(t)?`var(--tc-space-${t}, ${dt(t)})`:t}function dt(e){return{1:"4px",2:"8px",3:"12px",4:"16px",5:"24px",6:"32px",7:"48px",8:"64px"}[e]??"12px"}function ut(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var pt="tc-grid";u(pt,d({props:{min:{type:"string",default:"260px"},gap:{type:"string",default:"4"},columns:{type:"string",default:""}},styles:{display:"block"},template:({props:e})=>{let t=String(e.columns??"").trim();return`
        <div class="grid" style="
          --tc-grid-template: ${t?`repeat(${pe(t)}, minmax(0, 1fr))`:`repeat(auto-fit, minmax(${pe(e.min)}, 1fr))`};
          --tc-grid-gap: ${ft(e.gap)};
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
      `}}));function ft(e){let t=String(e??"4").trim();return/^[1-8]$/.test(t)?`var(--tc-space-${t}, ${gt(t)})`:t}function gt(e){return{1:"4px",2:"8px",3:"12px",4:"16px",5:"24px",6:"32px",7:"48px",8:"64px"}[e]??"16px"}function pe(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var bt="tc-code";u(bt,d({props:{language:{type:"string",default:""},copy:{type:"boolean",default:!1},filename:{type:"string",default:""}},theme:{"tc-code-bg":"var(--tc-code-bg-base, #14171f)","tc-code-ink":"var(--tc-code-ink-base, #efe6d4)","tc-code-rule":"var(--tc-code-rule-base, rgba(255,255,255,0.08))","tc-code-label":"var(--tc-code-label-base, #8a8678)","tc-code-radius":"var(--tc-radius-md, 10px)","tc-code-font":"var(--tc-font-mono, 'JetBrains Mono', ui-monospace, monospace)","tc-code-padding":"var(--tc-space-5, 20px) var(--tc-space-5, 20px)","tc-code-kw":"var(--tc-code-kw-base, #f0a878)","tc-code-str":"var(--tc-code-str-base, #d9b380)","tc-code-com":"var(--tc-code-com-base, #8a8678)","tc-code-num":"var(--tc-code-num-base, #c4d3b8)","tc-code-tag":"var(--tc-code-tag-base, #d49a68)"},styles:{display:"block"},template:({props:e,state:t})=>{let r=e.filename||e.language||"",a=t.copied===!0;return`
        <div class="block">
          ${r||e.copy?`
            <header class="bar">
              <span class="label">${fe(r)}</span>
              ${e.copy?`<button type="button" class="copy" aria-label="Copy code">
                    <span class="copy-icon" aria-hidden="true">${a?ht:mt}</span>
                    <span class="copy-text">${a?"Copied":"Copy"}</span>
                  </button>`:""}
            </header>
          `:""}
          <pre><code class="code lang-${fe(String(e.language||"txt"))}"><slot></slot></code></pre>
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
      `},events:{"click .copy":(e,t)=>{let r=t.host,a=r.shadowRoot?.querySelector("slot"),o=(a?a.assignedNodes({flatten:!0}):Array.from(r.childNodes)).map(c=>c.textContent??"").join(""),i=()=>{t.setState("copied",!0),t.emit("tc-copy",{text:o}),setTimeout(()=>t.setState("copied",!1),1600)};navigator.clipboard?.writeText?navigator.clipboard.writeText(o).then(i,i):i()}}}));var mt='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',ht='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';function fe(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var vt="tc-callout";u(vt,d({props:{variant:{type:"string",default:"note"},title:{type:"string",default:""},compact:{type:"boolean",default:!1}},theme:{"tc-callout-radius":"var(--tc-radius-md, 8px)","tc-callout-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif)","tc-callout-note-bg":"var(--tc-color-surface-alt, #faf8f3)","tc-callout-note-fg":"var(--tc-color-ink-soft, #4a5061)","tc-callout-note-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-callout-info-bg":"var(--tc-color-info-bg, #dde6f4)","tc-callout-info-fg":"var(--tc-color-info-fg, #1f3a66)","tc-callout-info-border":"var(--tc-color-info, #3a5b8c)","tc-callout-success-bg":"var(--tc-color-success-bg, #dbece2)","tc-callout-success-fg":"var(--tc-color-success-fg, #155b40)","tc-callout-success-border":"var(--tc-color-success, #207a5b)","tc-callout-warning-bg":"var(--tc-color-warning-bg, #f5e7cf)","tc-callout-warning-fg":"var(--tc-color-warning-fg, #7a4f0a)","tc-callout-warning-border":"var(--tc-color-warning, #a87326)","tc-callout-danger-bg":"var(--tc-color-danger-bg, #f4dad7)","tc-callout-danger-fg":"var(--tc-color-danger-fg, #7a1a14)","tc-callout-danger-border":"var(--tc-color-danger, #b3261e)"},styles:{display:"block"},template:({props:e})=>{let t=String(e.variant??"note"),r=ge[t]??ge.note;return`
        <aside
          class="callout v-${be(t)} ${e.compact?"compact":""}"
          role="${t==="danger"?"alert":"note"}"
        >
          <span class="icon" aria-hidden="true">${r}</span>
          <div class="body">
            ${e.title?`<div class="title">${be(e.title)}</div>`:""}
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
      `}}));var ge={note:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',info:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',success:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',warning:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',danger:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>'};function be(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var yt="tc-toc";var B=new WeakMap;u(yt,d({props:{target:{type:"string",default:"main"},levels:{type:"string",default:"h2,h3"},sticky:{type:"boolean",default:!0},label:{type:"string",default:"On this page"}},theme:{"tc-toc-fg":"var(--tc-color-ink, #14171f)","tc-toc-fg-muted":"var(--tc-color-ink-muted, #6b7280)","tc-toc-active":"var(--tc-color-accent, #a16939)","tc-toc-rule":"var(--tc-color-rule, #ece5d3)","tc-toc-label":"var(--tc-color-ink-soft, #4a5061)","tc-toc-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif)","tc-toc-top":"80px"},styles:{display:"block"},template:({props:e,state:t})=>{let r=t.items??[],a=t.activeId??"";return`
        <nav
          class="toc${e.sticky?" sticky":""}"
          aria-label="Table of contents"
        >
          ${e.label?`<div class="label">${Y(e.label)}</div>`:""}
          ${r.length===0?'<p class="empty">No sections yet.</p>':`<ol class="list">${r.map(n=>`<li class="lvl-${n.level}${n.id===a?" active":""}"><a href="#${Y(n.id)}">${Y(n.text)}</a></li>`).join("")}</ol>`}
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
      `},afterMount(){xt(this)},unmount(){B.get(this)?.observer?.disconnect(),B.delete(this)}}));function xt(e){B.get(e)?.observer?.disconnect();let r=e,a=r.target||"main",n=(r.levels||"h2,h3").split(",").map(l=>l.trim().toLowerCase()).filter(Boolean),o=document.querySelector(a);if(!o)return;let i=Array.from(o.querySelectorAll(n.join(","))).filter(l=>l instanceof HTMLElement),c=i.map(l=>(l.id||(l.id=kt(l.textContent??"")),{id:l.id,level:parseInt(l.tagName.slice(1),10),text:(l.textContent??"").trim()}));if(e.setState("items",c),typeof IntersectionObserver>"u")return;let s=new IntersectionObserver(l=>{let f=l.filter(g=>g.isIntersecting).sort((g,v)=>g.boundingClientRect.top-v.boundingClientRect.top)[0];if(!f)return;let b=f.target.id;b&&e.setState("activeId",b)},{rootMargin:"0px 0px -70% 0px",threshold:0});for(let l of i)s.observe(l);B.set(e,{observer:s,activeId:""})}function kt(e){return e.toLowerCase().trim().replace(/[^\w\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-")||"section"}function Y(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var wt="tc-pagination";u(wt,d({props:{current:{type:"number",default:1},total:{type:"number",default:1},siblings:{type:"number",default:1},boundaries:{type:"number",default:1},size:{type:"string",default:"sm"},"prev-label":{type:"string",default:"Prev"},"next-label":{type:"string",default:"Next"},label:{type:"string",default:"Pagination"}},styles:{display:"block"},template:({props:e})=>{let t=Math.max(1,Number(e.total)|0),r=$t(Number(e.current)|0,1,t),a=Math.max(0,Number(e.siblings)|0),n=Math.max(0,Number(e.boundaries)|0);if(t<=1)return"";let o=St(r,t,a,n),i=F(String(e.size??"sm")),c=r<=1?" disabled":"",s=r>=t?" disabled":"",l=o.map(p=>{if(p==="\u2026")return'<span class="ellipsis" aria-hidden="true">\u2026</span>';let f=p===r;return`<tc-button
            class="num"
            size="${i}"
            variant="${f?"primary":"ghost"}"
            data-page="${p}"${f?' aria-current="page"':""}
          >${p}</tc-button>`}).join("");return`
        <nav aria-label="${F(String(e.label??"Pagination"))}">
          <tc-button
            class="prev"
            size="${i}"
            variant="ghost"
            data-page="${r-1}"${c}
          >\u2190 ${F(String(e["prev-label"]??"Prev"))}</tc-button>
          <span class="pages">${l}</span>
          <tc-button
            class="next"
            size="${i}"
            variant="ghost"
            data-page="${r+1}"${s}
          >${F(String(e["next-label"]??"Next"))} \u2192</tc-button>
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
      `},events:{"click tc-button":(e,t)=>{let r=e.target.closest("tc-button");if(!r||r.hasAttribute("disabled"))return;let a=r.getAttribute("data-page");if(a==null)return;let n=Number(a),o=t.host,i=Math.max(1,Number(o.total)|0),c=Number(o.current)|0;!Number.isFinite(n)||n<1||n>i||n!==c&&t.emit("tc-page-change",{page:n})}}}));function $t(e,t,r){return Math.min(r,Math.max(t,e))}function St(e,t,r,a){let n=new Set;for(let c=1;c<=Math.min(a,t);c++)n.add(c);for(let c=Math.max(1,t-a+1);c<=t;c++)n.add(c);for(let c=Math.max(1,e-r);c<=Math.min(t,e+r);c++)n.add(c);let o=[...n].sort((c,s)=>c-s),i=[];for(let c=0;c<o.length;c++)c>0&&o[c]-o[c-1]>1&&i.push("\u2026"),i.push(o[c]);return i}function F(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Tt="tc-combobox";function R(e){if(Array.isArray(e))return e.map(r=>String(r)).filter(Boolean);let t=String(e??"").trim();return t?t.split(",").map(r=>r.trim()).filter(Boolean):[]}function N(e){return e.join(",")}function Mt(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}u(Tt,d({formAssociated:!0,props:{value:{type:"string",default:""},name:{type:"string",default:""},options:{type:"json",default:[]},multiple:{type:"boolean",default:!1},searchable:{type:"boolean",default:!0},placeholder:{type:"string",default:""},"empty-text":{type:"string",default:"No results"},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0},max:{type:"number",default:0}},theme:{"tc-input-bg":"var(--tc-color-surface, #ffffff)","tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-border-focus":"var(--tc-color-accent, #a16939)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-radius":"var(--tc-radius-md, 8px)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-combobox-chip-bg":"var(--tc-color-accent-soft, #efe2cf)","tc-combobox-chip-fg":"var(--tc-color-accent-hover, #8a572d)","tc-combobox-popup-bg":"var(--tc-color-surface, #ffffff)","tc-combobox-popup-hover":"var(--tc-color-accent-soft, #efe2cf)","tc-combobox-popup-active":"var(--tc-color-accent-soft, #efe2cf)"},styles:{display:"block"},refs:{search:".search",popup:".popup"},template:({props:e,state:t})=>{let r=e.options??[],a=!!e.multiple,n=e.searchable!==!1,o=!!e.disabled,i=!!e.error,c=R(e.value),s=String(t.query??""),l=!!t.open&&!o,p=Number(t.focusedIndex??-1),f=me(r,s),b=new Set(c),g=c.map(m=>r.find(q=>q.value===m)).filter(m=>!!m),v=n&&(l||a&&c.length===0),x=!a&&c.length===1&&(!l||!n),G=c.length===0&&!v&&!x,k=a?g.map(m=>`<span class="chip" data-value="${h(m.value)}">
              ${m.icon?`<span class="chip-icon">${h(m.icon)}</span>`:""}
              <span class="chip-label">${h(m.label)}</span>
              <button
                type="button"
                class="chip-remove"
                data-remove="${h(m.value)}"
                aria-label="Remove ${h(m.label)}"
                ${o?"disabled":""}
              >&times;</button>
            </span>`).join(""):"",ve=x&&g[0]?`<span class="single">
            ${g[0].icon?`<span class="single-icon">${h(g[0].icon)}</span>`:""}
            <span class="single-label">${h(g[0].label)}</span>
          </span>`:"",ye=G?`<span class="placeholder">${h(e.placeholder??"")}</span>`:"",xe=v?`<input
            type="text"
            class="search"
            part="search"
            value="${h(s)}"
            placeholder="${h(c.length===0?e.placeholder??"":"")}"
            ${o?"disabled":""}
            autocomplete="off"
            aria-autocomplete="list"
            aria-expanded="${l?"true":"false"}"
            role="combobox"
          />`:`<input
            type="text"
            class="search hidden-search"
            tabindex="-1"
            aria-hidden="true"
            value=""
            ${o?"disabled":""}
          />`,ke=f.length===0?`<div class="empty">${h(e["empty-text"]??"No results")}</div>`:f.map((m,q)=>{let _=b.has(m.value);return`<div
              class="${["option",_?"selected":"",q===p?"focused":"",m.disabled?"disabled":""].filter(Boolean).join(" ")}"
              role="option"
              data-value="${h(m.value)}"
              data-index="${q}"
              aria-selected="${_?"true":"false"}"
              ${m.disabled?'aria-disabled="true"':""}
            >
              ${a?`<span class="check" aria-hidden="true">${_?"\u2713":""}</span>`:""}
              ${m.icon?`<span class="opt-icon">${h(m.icon)}</span>`:""}
              <span class="opt-label">${h(m.label)}</span>
            </div>`}).join(""),we=e.label?`<label class="label">${h(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</label>`:"",$e=i?`<div class="helper error">${h(e.error)}</div>`:e.helper?`<div class="helper">${h(e.helper)}</div>`:"";return`
        ${we}
        <div
          class="control ${i?"invalid":""} ${l?"open":""} ${o?"disabled":""}"
          part="control"
          tabindex="${o?"-1":"0"}"
          role="${n?"presentation":"combobox"}"
        >
          <div class="display">
            ${k}${ve}${ye}${xe}
          </div>
          <span class="caret" aria-hidden="true">\u25BE</span>
        </div>
        <div
          class="popup"
          part="popup"
          role="listbox"
          ${a?'aria-multiselectable="true"':""}
          ${l?"":"hidden"}
        >${ke}</div>
        ${$e}
        ${Et}
      `},events:{"click .control":(e,t)=>{if(e.target.closest(".chip-remove")||t.host.disabled)return;let n=!!t.getState("open");t.setState("open",!0),n||t.emit("tc-open"),queueMicrotask(()=>{t.refs.search?.focus()})},"keydown .control":(e,t)=>{let r=e;if(r.key==="Enter"||r.key===" "){if(r.preventDefault(),t.host.disabled)return;t.setState("open",!0),t.emit("tc-open"),queueMicrotask(()=>{t.refs.search?.focus()})}},"input .search":(e,t)=>{let r=e.target.value;t.setState("query",r),t.setState("open",!0),t.setState("focusedIndex",0),t.emit("tc-search",{query:r})},"keydown .search":(e,t)=>{let r=e,a=e.target,n=t.host,o=!!n.multiple,i=n.options??[],c=me(i,String(t.getState("query")??""));if(r.key==="Backspace"&&a.value===""&&o){let s=R(n.value);s.length>0&&(s.pop(),n.value=N(s),V(t,s,n),t.emit("tc-change",{value:s.slice()}),r.preventDefault());return}if(r.key==="ArrowDown"){r.preventDefault(),t.setState("open",!0);let s=Number(t.getState("focusedIndex")??-1),l=Math.min(c.length-1,s+1);t.setState("focusedIndex",l);return}if(r.key==="ArrowUp"){r.preventDefault();let s=Number(t.getState("focusedIndex")??0),l=Math.max(0,s-1);t.setState("focusedIndex",l);return}if(r.key==="Enter"){r.preventDefault();let s=Number(t.getState("focusedIndex")??-1);s>=0&&s<c.length&&he(t,c[s],n);return}if(r.key==="Escape"){r.preventDefault(),t.setState("open",!1),t.setState("query",""),t.emit("tc-close");return}},"mousedown .option":(e,t)=>{e.preventDefault();let r=e.target.closest(".option");if(!r||r.classList.contains("disabled"))return;let a=r.dataset.value;if(a==null)return;let n=t.host,i=(n.options??[]).find(c=>c.value===a);i&&he(t,i,n)},"click .chip-remove":(e,t)=>{e.stopPropagation();let a=e.target.dataset.remove;if(a==null)return;let n=t.host,o=R(n.value).filter(i=>i!==a);n.value=N(o),V(t,o,n),t.emit("tc-change",{value:o.slice()})},"focusout .control":(e,t)=>{queueMicrotask(()=>{t.host.matches(":focus-within")||(t.setState("open",!1),t.setState("query",""),t.emit("tc-close"))})}},afterMount(){let e=this;if(!e.multiple||!e.internals)return;let t=R(e.value),r=String(e.name??"");if(!r){e.internals.setFormValue(N(t));return}let a=new FormData;for(let n of t)a.append(r,n);e.internals.setFormValue(a)}}));function me(e,t){if(!t)return e;let r=new RegExp(Mt(t),"i");return e.filter(a=>r.test(a.label)||r.test(a.value))}function he(e,t,r){let a=!!r.multiple,n=Number(r.max??0),o=R(r.value);if(a){let i;if(o.includes(t.value))i=o.filter(c=>c!==t.value);else{if(n>0&&o.length>=n)return;i=o.concat(t.value)}r.value=N(i),V(e,i,r),e.setState("query",""),e.emit("tc-change",{value:i.slice()}),queueMicrotask(()=>{e.refs.search?.focus()})}else r.value=t.value,V(e,[t.value],r),e.setState("query",""),e.setState("open",!1),e.emit("tc-change",{value:t.value}),e.emit("tc-close")}function V(e,t,r){let a=r.internals;if(!a)return;let n=String(r.name??"");if(!r.multiple){a.setFormValue(t[0]??"");return}if(!n){a.setFormValue(N(t));return}let o=new FormData;for(let i of t)o.append(n,i);a.setFormValue(o)}function h(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Et=`
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
          .search.hidden-search {
            width: 0;
            min-width: 0;
            opacity: 0;
            pointer-events: none;
            flex: 0;
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
`;var J={"alert-circle":'<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',"alert-triangle":'<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',info:'<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',check:'<polyline points="20 6 9 17 4 12"/>',"check-circle":'<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',x:'<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',"x-circle":'<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>',"arrow-right":'<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',"arrow-left":'<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',"arrow-up":'<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>',"arrow-down":'<line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>',"chevron-right":'<polyline points="9 18 15 12 9 6"/>',"chevron-left":'<polyline points="15 18 9 12 15 6"/>',"chevron-up":'<polyline points="18 15 12 9 6 15"/>',"chevron-down":'<polyline points="6 9 12 15 18 9"/>',"external-link":'<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',plus:'<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',minus:'<line x1="5" y1="12" x2="19" y2="12"/>',search:'<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',filter:'<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',"more-horizontal":'<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',"more-vertical":'<circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>',settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>',edit:'<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="m18.5 2.5 a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z"/>',trash:'<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',copy:'<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',save:'<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>',download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',user:'<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',users:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',mail:'<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/>',calendar:'<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',clock:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',home:'<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',menu:'<line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>',"log-out":'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',"log-in":'<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>',moon:'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',sun:'<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',eye:'<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',"eye-off":'<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>',loader:'<line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>',refresh:'<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>'},Ct=Object.freeze(Object.keys(J));var zt="tc-icon";u(zt,d({props:{name:{type:"string",default:""},size:{type:"string",default:"1em"},stroke:{type:"string",default:"currentColor"},fill:{type:"string",default:"none"},title:{type:"string",default:""}},styles:{display:"inline-flex","align-items":"center","justify-content":"center","vertical-align":"middle","line-height":"1"},template:({props:e})=>{let t=String(e.name??""),r=J[t],a=String(e.size??"1em"),n=String(e.stroke??"currentColor"),o=String(e.fill??"none"),i=String(e.title??"");if(!r)return`
          <svg width="${y(a)}" height="${y(a)}" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="1.5"
               stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <text x="12" y="14.5" text-anchor="middle" font-size="6" font-family="monospace" stroke="none" fill="currentColor">?</text>
          </svg>
        `;let c=i?`role="img" aria-label="${y(i)}"`:'aria-hidden="true"';return`
        <svg
          width="${y(a)}"
          height="${y(a)}"
          viewBox="0 0 24 24"
          fill="${y(o)}"
          stroke="${y(n)}"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          ${c}
        >${i?`<title>${y(i)}</title>`:""}${r}</svg>
      `}}));function y(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Lt="site-nav";u(Lt,d({props:{active:{type:"string",default:""},version:{type:"string",default:"v1.1.0"},base:{type:"string",default:""}},styles:{display:"block"},template:({props:e})=>{let t=String(e.base??""),r=[{id:"docs",label:"Docs",href:`${t}docs.html`,hideOnSmall:!0},{id:"components",label:"Components",href:`${t}components.html`},{id:"icons",label:"Icons",href:`${t}icons.html`,hideOnSmall:!0},{id:"themes",label:"Themes",href:`${t}themes.html`,hideOnSmall:!0},{id:"examples",label:"Examples",href:`${t}examples.html`,hideOnSmall:!0},{id:"playground",label:"Playground",href:`${t}playground.html`,hideOnSmall:!0},{id:"blog",label:"Blog",href:`${t}blog/`,hideOnSmall:!0},{id:"github",label:"GitHub",href:"https://github.com/ra9/tan-compose",external:!0}],a=String(e.active??"");return`
        <header class="topbar">
          <div class="inner">
            <a class="brand" href="${P(t)}index.html">
              <span class="brand-mark" aria-hidden="true"></span>
              tan-compose
              <span class="version-pill">${P(e.version)}</span>
            </a>
            <nav aria-label="Primary">
              ${r.map(n=>{let o=n.id===a,i=[n.hideOnSmall?"nav-hide-sm":"",o?"active":""].filter(Boolean).join(" "),c=o?' aria-current="page"':"",s=n.external?' target="_blank" rel="noopener"':"";return`<a href="${P(n.href)}"${c}${s}${i?` class="${i}"`:""}>${P(n.label)}</a>`}).join(`
              `)}
            </nav>
          </div>
        </header>
        <style>
          :host { display: block; }
          .topbar {
            border-bottom: 1px solid var(--tc-color-rule, #ece5d3);
            background: var(--tc-color-bg, #faf8f3);
            position: sticky;
            top: 0;
            z-index: 50;
            backdrop-filter: saturate(180%) blur(8px);
            -webkit-backdrop-filter: saturate(180%) blur(8px);
          }
          .inner {
            max-width: 1100px;
            margin: 0 auto;
            padding: 0 24px;
            height: 56px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
          }
          .brand {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            font-family: var(--tc-font-mono, "JetBrains Mono", monospace);
            font-weight: 600;
            font-size: 0.95rem;
            color: var(--tc-color-ink, #14171f);
            text-decoration: none;
          }
          .brand-mark {
            width: 22px;
            height: 22px;
            border-radius: 6px;
            background: var(--tc-color-accent, #a16939);
            display: inline-block;
          }
          .version-pill {
            font-family: var(--tc-font-mono, "JetBrains Mono", monospace);
            font-size: 0.72rem;
            font-weight: 500;
            padding: 2px 8px;
            border-radius: var(--tc-radius-pill, 999px);
            background: var(--tc-color-accent-soft, #efe2cf);
            color: var(--tc-color-accent-hover, #8a572d);
            border: 1px solid var(--tc-color-rule-strong, #d9cfb8);
          }
          nav {
            display: flex;
            gap: 22px;
            align-items: center;
          }
          nav a {
            color: var(--tc-color-ink-soft, #4a5061);
            text-decoration: none;
            font-size: 0.92rem;
            font-weight: 500;
            transition: color 0.15s ease;
          }
          nav a:hover,
          nav a:focus-visible,
          nav a.active,
          nav a[aria-current="page"] {
            color: var(--tc-color-accent, #a16939);
          }
          nav a:focus-visible {
            outline: 2px solid var(--tc-color-accent, #a16939);
            outline-offset: 4px;
            border-radius: 4px;
          }
          @media (max-width: 720px) {
            .inner { padding: 0 16px; gap: 8px; }
            nav { gap: 14px; }
            nav a.nav-hide-sm { display: none; }
          }
        </style>
      `}}));function P(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Ht="site-footer";u(Ht,d({props:{base:{type:"string",default:""},year:{type:"string",default:"2026"}},styles:{display:"block"},template:({props:e})=>{let t=String(e.base??"");return`
        <footer class="foot">
          <div class="inner">
            <p>&copy; ${L(e.year)} Tan Compose \xB7 MIT License</p>
            <div class="links">
              <a href="${L(t)}docs.html">Docs</a>
              <a href="${L(t)}components.html">Components</a>
              <a href="${L(t)}themes.html">Themes</a>
              <a href="${L(t)}playground.html">Playground</a>
              <a href="${L(t)}blog/">Blog</a>
              <a href="https://jsr.io/@ra9/tan-compose-kit" target="_blank" rel="noopener">JSR</a>
              <a href="https://github.com/ra9/tan-compose" target="_blank" rel="noopener">GitHub</a>
            </div>
          </div>
        </footer>
        <style>
          :host { display: block; }
          .foot {
            border-top: 1px solid var(--tc-color-rule, #ece5d3);
            padding: 36px 0 56px;
            margin-top: 32px;
          }
          .inner {
            max-width: 1100px;
            margin: 0 auto;
            padding: 0 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            flex-wrap: wrap;
          }
          p {
            color: var(--tc-color-ink-muted, #6b7280);
            font-size: 0.9rem;
            margin: 0;
          }
          .links {
            display: flex;
            gap: 22px;
            flex-wrap: wrap;
          }
          .links a {
            color: var(--tc-color-ink-soft, #4a5061);
            text-decoration: none;
            font-size: 0.9rem;
            transition: color 0.15s ease;
          }
          .links a:hover {
            color: var(--tc-color-accent, #a16939);
          }
        </style>
      `}}));function L(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}
//# sourceMappingURL=site.js.map
