var Ht=`:root {
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
`,Ae=!1;function zt(){if(typeof document>"u"||Ae)return;if(document.querySelector("style[data-tc-tokens]")){Ae=!0;return}let e=document.createElement("style");e.setAttribute("data-tc-tokens",""),e.textContent=Ht,document.head.insertBefore(e,document.head.firstChild),Ae=!0}zt();var Ct=["beforeMount","afterMount","afterRender","unmount","action","formAssociatedCallback","formDisabledCallback","formResetCallback","formStateRestoreCallback"],At=new Set(["string","number","boolean","json"]);function p(e){if(e===null||typeof e!="object")throw new TypeError("describe(): options must be an object");if(e.tag!==void 0&&typeof e.tag!="string")throw new TypeError("describe(): `tag` must be a string");if(e.className!==void 0&&typeof e.className!="string")throw new TypeError("describe(): `className` must be a string");if(e.template!==void 0&&typeof e.template!="string"&&typeof e.template!="function")throw new TypeError("describe(): `template` must be a string or function");if(e.children!==void 0&&!Array.isArray(e.children))throw new TypeError("describe(): `children` must be an array");if(e.emit!==void 0&&!Array.isArray(e.emit))throw new TypeError("describe(): `emit` must be an array");if(e.observedAttributes!==void 0&&(!Array.isArray(e.observedAttributes)||e.observedAttributes.some(t=>typeof t!="string")))throw new TypeError("describe(): `observedAttributes` must be an array of strings");for(let t of["theme","styles","attributes","events","refs"]){let r=e[t];if(r!==void 0&&(r===null||typeof r!="object"||Array.isArray(r)))throw new TypeError(`describe(): \`${t}\` must be a record`)}if(e.refs!==void 0){for(let[t,r]of Object.entries(e.refs))if(typeof r!="string")throw new TypeError(`describe(): refs.${t} must be a CSS selector string`)}if(e.formAssociated!==void 0&&typeof e.formAssociated!="boolean")throw new TypeError("describe(): `formAssociated` must be a boolean");for(let t of Ct){let r=e[t];if(r!==void 0&&typeof r!="function")throw new TypeError(`describe(): \`${t}\` must be a function`)}if(e.if!==void 0&&typeof e.if!="function")throw new TypeError("describe(): `if` must be a function");if(e.for!==void 0){let t=e.for;if(t===null||typeof t!="object"||Array.isArray(t))throw new TypeError("describe(): `for` must be a record");if(typeof t.items!="function")throw new TypeError("describe(): `for.items` must be a function");if(typeof t.key!="function")throw new TypeError("describe(): `for.key` must be a function");if(typeof t.render!="function")throw new TypeError("describe(): `for.render` must be a function")}if(e.props!==void 0){let t=e.props;if(t===null||typeof t!="object"||Array.isArray(t))throw new TypeError("describe(): `props` must be a record");for(let[r,a]of Object.entries(t)){if(a===null||typeof a!="object"||Array.isArray(a))throw new TypeError(`describe(): props.${r} must be a record`);if(!At.has(a.type))throw new TypeError(`describe(): props.${r}.type must be one of "string", "number", "boolean", "json"`)}}return{...e}}var Pe=new Map,Nt=/^[a-z][a-z0-9]*(-[a-z0-9]+)+$/,Rt=/^(\S+)(?:\s+(.+))?$/;function f(e,t){if(typeof e!="string"||!Nt.test(e))throw new TypeError(`build(): "${e}" is not a valid custom element name (must be lowercase and contain a hyphen).`);if(Pe.has(e))return console.warn(`Component "${e}" is already registered. Skipping re-registration.`),e;if(typeof HTMLElement>"u"||typeof customElements>"u")return console.warn("HTMLElement or customElements not available; skipping component registration."),e;let r=Array.from(new Set([...t.observedAttributes??[],...Object.keys(t.props??{})])),a=t.props??{},n=t.refs??{},o=qt(t);class s extends HTMLElement{static get observedAttributes(){return r}static get formAssociated(){return t.formAssociated===!0}isMounted=!1;mountCleanups=[];renderCleanups=[];state=new Map;propValues=new Map;listSlots=new WeakMap;currentRefs={};container;ctx;rendering=!1;renderQueued=!1;internals;constructor(){super();let l=this.attachShadow({mode:"open"});t.formAssociated&&typeof this.attachInternals=="function"&&(this.internals=this.attachInternals()),jt(l,o),this.container=document.createElement("div"),this.container.className=t.className?`container ${t.className}`:"container",l.appendChild(this.container),t.attributes&&Ye(this,t.attributes),this.ctx=Dt(this,this.propValues,this.state,()=>this.currentRefs),this.initProps()}get refs(){return this.currentRefs}initProps(){for(let[l,c]of Object.entries(a)){let d=this.getAttribute(l),u=d!==null?Ve(d,c.type):c.default;this.propValues.set(l,u),this.maybeSyncFormValue(l,u),Object.defineProperty(this,l,{configurable:!0,enumerable:!0,get:()=>this.propValues.get(l),set:g=>{let m=_t(g,c.type),b=this.propValues.get(l);Object.is(b,m)||(this.propValues.set(l,m),c.reflect&&Bt(this,l,m,c.type),this.maybeSyncFormValue(l,m),this.isMounted&&this.scheduleRender())}})}}maybeSyncFormValue(l,c){if(!this.internals||l!=="value")return;let d=c==null?null:String(c);this.internals.setFormValue(d)}connectedCallback(){if(!this.isMounted){try{t.beforeMount?.call(this)}catch(l){console.error(`[tan-compose] beforeMount threw for <${e}>:`,l)}if(this.renderInternal(),t.action){let l=t.action;this.addEventListener("click",l),this.mountCleanups.push(()=>this.removeEventListener("click",l))}if(t.emit)for(let l of t.emit)this.addEventListener(l.name,l.handler),this.mountCleanups.push(()=>this.removeEventListener(l.name,l.handler));t.events&&this.attachDelegatedEvents(t.events),this.isMounted=!0;try{t.afterMount?.call(this)}catch(l){console.error(`[tan-compose] afterMount threw for <${e}>:`,l)}}}disconnectedCallback(){try{t.unmount?.call(this)}catch(l){console.error(`[tan-compose] unmount threw for <${e}>:`,l)}W(this.mountCleanups),W(this.renderCleanups),this.flushListSlots(),this.isMounted=!1}flushListSlots(){Ue(t,l=>{let c=this.listSlots.get(l);if(c){for(let d of c.cache.values())W(d.cleanups);c.cache.clear()}})}attributeChangedCallback(l,c,d){if(c!==d){if(Object.prototype.hasOwnProperty.call(a,l)){let u=a[l],g=d!==null?Ve(d,u.type):u.default,m=this.propValues.get(l);Object.is(m,g)||(this.propValues.set(l,g),this.isMounted&&this.scheduleRender());return}this.state.set(l,d),this.isMounted&&this.scheduleRender()}}setState(l,c){let d=this.state.get(l);Object.is(d,c)||(this.state.set(l,c),this.isMounted&&this.scheduleRender())}getState(l){return this.state.get(l)}render(){this.renderInternal()}emitEvent(l,c){this.dispatchEvent(new CustomEvent(l,{detail:c,bubbles:!0,composed:!0}))}scheduleRender(){if(this.rendering){this.renderQueued=!0;return}this.renderInternal()}getOrCreateSlot(l){let c=this.listSlots.get(l);return c||(c={cache:new Map},this.listSlots.set(l,c)),c}renderInternal(){this.rendering=!0;let l=this.captureFocusInShadow();try{W(this.renderCleanups),this.container.replaceChildren();let c={host:this,cleanups:this.renderCleanups,ctx:this.ctx};if(t.template!==void 0){let d=typeof t.template=="function"?t.template(this.ctx):t.template;d&&(this.container.innerHTML=d)}if(t.children)for(let d of t.children){let u=Ge(d,c,g=>this.getOrCreateSlot(g));u&&this.container.appendChild(u)}this.container.appendChild(document.createElement("slot")),this.refreshRefs()}finally{this.rendering=!1}if(l&&this.restoreFocusInShadow(l),this.renderQueued){this.renderQueued=!1,this.renderInternal();return}try{t.afterRender?.call(this)}catch(c){console.error(`[tan-compose] afterRender threw for <${e}>:`,c)}}captureFocusInShadow(){let l=this.shadowRoot;if(!l)return null;let c=l.activeElement;if(!c)return null;let d=[],u=c;for(;u&&u!==l;){let b=u.parentNode;if(!b)break;let v=u.tagName,k=Array.from(b.children).filter(x=>x.tagName===v).indexOf(u);if(d.unshift({tag:v,idx:k}),u=b instanceof Element?b:null,!u&&b===l)break}let g=null,m=null;if(c instanceof HTMLInputElement||c instanceof HTMLTextAreaElement)try{g=c.selectionStart,m=c.selectionEnd}catch{}return{path:d,selectionStart:g,selectionEnd:m}}restoreFocusInShadow(l){let c=this.shadowRoot;if(!c)return;let d=c;for(let g of l.path){let m=Array.from(d.children??[]),S=(m.length>0?m:Array.from(d.children??[])).filter(k=>k.tagName===g.tag)[g.idx];if(!S)return;d=S}let u=d;if(!(!u||typeof u.focus!="function")&&c.activeElement!==u&&(u.focus(),l.selectionStart!=null&&(u instanceof HTMLInputElement||u instanceof HTMLTextAreaElement)))try{u.setSelectionRange(l.selectionStart,l.selectionEnd??l.selectionStart)}catch{}}refreshRefs(){let l={},c=this.shadowRoot;for(let[d,u]of Object.entries(n))l[d]=c?c.querySelector(u):null;this.currentRefs=l}formAssociatedCallback(l){try{t.formAssociatedCallback?.call(this,l)}catch(c){console.error(`[tan-compose] formAssociatedCallback threw for <${e}>:`,c)}}formDisabledCallback(l){try{t.formDisabledCallback?.call(this,l)}catch(c){console.error(`[tan-compose] formDisabledCallback threw for <${e}>:`,c)}}formResetCallback(){try{t.formResetCallback?.call(this)}catch(l){console.error(`[tan-compose] formResetCallback threw for <${e}>:`,l)}}formStateRestoreCallback(l,c){try{t.formStateRestoreCallback?.call(this,l,c)}catch(d){console.error(`[tan-compose] formStateRestoreCallback threw for <${e}>:`,d)}}attachDelegatedEvents(l){let c=new Map;for(let[d,u]of Object.entries(l)){let g=Rt.exec(d.trim());if(!g)continue;let[,m,b]=g;c.has(m)||c.set(m,[]),c.get(m).push({selector:b??null,handler:u})}for(let[d,u]of c){let g=m=>{for(let{selector:b,handler:v}of u){if(!b){v(m,this.ctx);continue}let S=m.composedPath();for(let k of S){if(k===this.shadowRoot||k===this)break;if(k instanceof Element&&this.shadowRoot?.contains(k)&&k.matches(b)){v(m,this.ctx);break}}}};this.shadowRoot.addEventListener(d,g),this.mountCleanups.push(()=>this.shadowRoot?.removeEventListener(d,g))}}}return Pe.set(e,s),customElements.define(e,s),e}function Ge(e,t,r){return e.if&&!e.if(t.ctx)?null:Ke(e,t,r)}function Ke(e,t,r){let a=document.createElement(e.tag||"div");if(e.styles&&(a.style.cssText=Object.entries(e.styles).map(([n,o])=>`${n}: ${o}`).join("; ")),e.className&&(a.className=e.className),e.attributes&&Ye(a,e.attributes),e.template!==void 0){let n=typeof e.template=="function"?e.template(t.ctx):e.template;n&&(a.innerHTML=n)}if(e.children)for(let n of e.children){let o=Ge(n,t,r);o&&a.appendChild(o)}if(e.for&&It(a,e,t,r),e.action){let n=e.action;a.addEventListener("click",n),t.cleanups.push(()=>a.removeEventListener("click",n))}if(e.emit)for(let n of e.emit)a.addEventListener(n.name,n.handler),t.cleanups.push(()=>a.removeEventListener(n.name,n.handler));return a}function It(e,t,r,a){let n=t.for,o=a(t),s=n.items(r.ctx),i=new Map;for(let l=0;l<s.length;l++){let c=s[l],d=n.key(c,l),u,g=o.cache.get(d);if(g&&Object.is(g.lastItem,c))u=g;else{let m=[],b=n.render(c,l,r.ctx),v=Ke(b,{...r,cleanups:m},a);g&&W(g.cleanups),u={element:v,lastItem:c,cleanups:m}}i.set(d,u),e.appendChild(u.element)}for(let[l,c]of o.cache)i.has(l)||W(c.cleanups);o.cache=i}function Ue(e,t){if(e.for&&t(e),e.children)for(let r of e.children)Ue(r,t)}function Dt(e,t,r,a){return{host:e,get props(){let n={};for(let[o,s]of t)n[o]=s;return n},get state(){let n={};for(let[o,s]of r)n[o]=s;return n},get refs(){return a()},setState:(n,o)=>e.setState(n,o),getState:n=>e.getState(n),emit:(n,o)=>e.emitEvent(n,o)}}function qt(e){let t=e.theme?Ft(e.theme):void 0,r=e.styles?Ot(e.styles):void 0;if(!t&&!r)return{kind:"adopted",sheets:[]};if(typeof CSSStyleSheet<"u"&&typeof CSSStyleSheet.prototype.replaceSync=="function"){let n=[];if(t){let o=new CSSStyleSheet;o.replaceSync(t),n.push(o)}if(r){let o=new CSSStyleSheet;o.replaceSync(r),n.push(o)}return{kind:"adopted",sheets:n}}return{kind:"fallback",theme:t,styles:r}}function jt(e,t){if(t.kind==="adopted"){if(t.sheets.length>0)try{e.adoptedStyleSheets=t.sheets}catch{}return}if(t.theme){let r=document.createElement("style");r.textContent=t.theme,e.appendChild(r)}if(t.styles){let r=document.createElement("style");r.textContent=t.styles,e.appendChild(r)}}function Ye(e,t){for(let[r,a]of Object.entries(t))e.setAttribute(r,a)}function Ft(e){return`:host { ${Object.entries(e).map(([r,a])=>`--${r}: ${a};`).join(" ")} }`}function Ot(e){return`.container { ${Object.entries(e).map(([r,a])=>`${r}: ${a};`).join(" ")} }`}function W(e){for(;e.length>0;){let t=e.pop();try{t?.()}catch(r){console.error("[tan-compose] cleanup threw:",r)}}}function Ve(e,t){switch(t){case"string":return e;case"number":{let r=Number(e);return Number.isNaN(r)?void 0:r}case"boolean":return e!=="false"&&e!=="0";case"json":try{return JSON.parse(e)}catch{return}}}function _t(e,t){switch(t){case"string":return e==null?e:String(e);case"number":return e==null?e:Number(e);case"boolean":return!!e;case"json":return e}}function Bt(e,t,r,a){if(a!=="json"){if(a==="boolean"){r?e.setAttribute(t,""):e.removeAttribute(t);return}if(r==null){e.removeAttribute(t);return}e.setAttribute(t,String(r))}}var Pt="tc-button";var We=`
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
`;f(Pt,p({props:{variant:{type:"string",default:"primary"},size:{type:"string",default:"md"},disabled:{type:"boolean",default:!1,reflect:!0},loading:{type:"boolean",default:!1},block:{type:"boolean",default:!1},href:{type:"string",default:""},target:{type:"string",default:""},rel:{type:"string",default:""}},theme:{"tc-btn-primary-bg":"var(--tc-color-ink, #14171f)","tc-btn-primary-fg":"var(--tc-color-surface, #ffffff)","tc-btn-secondary-bg":"var(--tc-color-surface, #ffffff)","tc-btn-secondary-fg":"var(--tc-color-ink, #14171f)","tc-btn-secondary-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-btn-ghost-fg":"var(--tc-color-ink, #14171f)","tc-btn-ghost-border":"transparent","tc-btn-danger-bg":"var(--tc-color-danger, #b3261e)","tc-btn-danger-fg":"var(--tc-color-surface, #ffffff)","tc-btn-radius":"var(--tc-radius-md, 8px)","tc-btn-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"inline-block","vertical-align":"middle"},template:({props:e})=>{let t=`root v-${le(e.variant)} s-${le(e.size)}${e.block?" block":""}`,r=`${e.loading?'<span class="spinner" aria-hidden="true"></span>':""}
        <span class="content"><slot></slot></span>`,a=String(e.href??""),n=a.length>0,o=!!(e.disabled||e.loading);if(n){let s=e.target?` target="${le(e.target)}"`:"",i=e.rel?String(e.rel):String(e.target)==="_blank"?"noopener":"",l=i?` rel="${le(i)}"`:"",c=o?"":` href="${le(a)}"`;return`
      <a
        part="button"
        class="${t}"${c}${s}${l}${o?' aria-disabled="true"':""}${o?' tabindex="-1"':""}
        role="button"
      >
        ${r}
      </a>${We}`}return`
      <button
        part="button"
        class="${t}"
        ${o?"disabled":""}
        type="button"
      >
        ${r}
      </button>${We}`}}));function le(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Vt="tc-input";f(Vt,p({formAssociated:!0,props:{value:{type:"string",default:""},name:{type:"string",default:""},type:{type:"string",default:"text"},placeholder:{type:"string",default:""},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0}},theme:{"tc-input-bg":"var(--tc-color-surface, #ffffff)","tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-border-focus":"var(--tc-color-accent, #a16939)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-radius":"var(--tc-radius-md, 8px)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},refs:{input:"input"},template:({props:e})=>{let t=!!e.error;return`
        ${e.label?`<label class="label">${X(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</label>`:""}
        <input
          class="input ${t?"invalid":""}"
          part="input"
          type="${X(e.type)}"
          value="${X(e.value)}"
          name="${X(e.name)}"
          placeholder="${X(e.placeholder)}"
          ${e.disabled?"disabled":""}
          ${e.required?"required":""}
          aria-invalid="${t?"true":"false"}"
        />
        ${e.error||e.helper?`<div class="${t?"error":"helper"}">${X(e.error||e.helper)}</div>`:""}
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
      `},events:{"input input":(e,t)=>{let r=e.target.value,a=t.host;a.internals?.setFormValue(r),a.value=r,t.emit("tc-input",{value:r})}},formResetCallback(){this.value=""}}));function X(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Gt="tc-textarea";f(Gt,p({formAssociated:!0,props:{value:{type:"string",default:""},name:{type:"string",default:""},placeholder:{type:"string",default:""},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},rows:{type:"number",default:4},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0},resize:{type:"string",default:"vertical"}},theme:{"tc-input-bg":"var(--tc-color-surface, #ffffff)","tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-border-focus":"var(--tc-color-accent, #a16939)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-radius":"var(--tc-radius-md, 8px)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},refs:{input:"textarea"},template:({props:e})=>{let t=!!e.error;return`
        ${e.label?`<label class="label">${G(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</label>`:""}
        <textarea
          class="input ${t?"invalid":""}"
          part="textarea"
          name="${G(e.name)}"
          placeholder="${G(e.placeholder)}"
          rows="${G(e.rows)}"
          ${e.disabled?"disabled":""}
          ${e.required?"required":""}
          aria-invalid="${t?"true":"false"}"
          style="resize: ${G(e.resize)};"
        >${G(e.value)}</textarea>
        ${e.error||e.helper?`<div class="${t?"error":"helper"}">${G(e.error||e.helper)}</div>`:""}
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
      `},events:{"input textarea":(e,t)=>{let r=e.target.value,a=t.host;a.internals?.setFormValue(r),a.value=r,t.emit("tc-input",{value:r})}},formResetCallback(){this.value=""}}));function G(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Kt="tc-select";f(Kt,p({formAssociated:!0,props:{value:{type:"string",default:""},name:{type:"string",default:""},options:{type:"json",default:[]},placeholder:{type:"string",default:""},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0}},theme:{"tc-input-bg":"var(--tc-color-surface, #ffffff)","tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-border-focus":"var(--tc-color-accent, #a16939)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-radius":"var(--tc-radius-md, 8px)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},template:({props:e})=>{let t=e.options??[],r=!!e.error;return`
        ${e.label?`<label class="label">${J(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</label>`:""}
        <div class="wrap">
          <select
            class="select ${r?"invalid":""}"
            part="select"
            name="${J(e.name)}"
            ${e.disabled?"disabled":""}
            ${e.required?"required":""}
            aria-invalid="${r?"true":"false"}"
          >
            ${e.placeholder?`<option value="" disabled ${e.value===""?"selected":""}>${J(e.placeholder)}</option>`:""}
            ${t.map(a=>`<option value="${J(a.value)}"${a.disabled?" disabled":""}${a.value===e.value?" selected":""}>${J(a.label)}</option>`).join("")}
          </select>
          <span class="caret" aria-hidden="true">\u25BE</span>
        </div>
        ${e.error||e.helper?`<div class="${r?"error":"helper"}">${J(e.error||e.helper)}</div>`:""}
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
      `},events:{"change select":(e,t)=>{let r=e.target.value,a=t.host;a.internals?.setFormValue(r),a.value=r,t.emit("tc-change",{value:r})}},formResetCallback(){this.value=""}}));function J(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Ut="tc-checkbox";f(Ut,p({formAssociated:!0,props:{checked:{type:"boolean",default:!1,reflect:!0},name:{type:"string",default:""},value:{type:"string",default:"on"},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0},indeterminate:{type:"boolean",default:!1}},theme:{"tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-border-focus":"var(--tc-color-accent, #a16939)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-radius":"var(--tc-radius-sm, 4px)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-checkbox-accent":"var(--tc-color-accent, #a16939)"},styles:{display:"block"},template:({props:e})=>{let t=!!e.error;return`
        <label class="row ${e.disabled?"is-disabled":""} ${t?"is-invalid":""}">
          <input
            class="cb"
            type="checkbox"
            name="${ye(e.name)}"
            value="${ye(e.value)}"
            ${e.checked?"checked":""}
            ${e.disabled?"disabled":""}
            ${e.required?"required":""}
            aria-invalid="${t?"true":"false"}"
          />
          ${e.label?`<span class="label">${ye(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</span>`:"<span></span>"}
        </label>
        ${e.error||e.helper?`<div class="${t?"error":"helper"}">${ye(e.error||e.helper)}</div>`:""}
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
      `},refs:{input:".cb"},events:{"change .cb":(e,t)=>{let r=e.target.checked,a=t.host;a.checked=r,a.internals?.setFormValue(r?a.value:null),t.emit("tc-change",{checked:r})}},afterMount(){let e=this,r=e.shadowRoot?.querySelector(".cb");r&&(r.indeterminate=e.indeterminate),e.internals?.setFormValue(e.checked?e.value:null)},formResetCallback(){this.checked=!1}}));function ye(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Yt="tc-switch";f(Yt,p({formAssociated:!0,props:{checked:{type:"boolean",default:!1,reflect:!0},name:{type:"string",default:""},value:{type:"string",default:"on"},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},disabled:{type:"boolean",default:!1,reflect:!0}},theme:{"tc-switch-track-off":"var(--tc-color-rule-strong, #d9cfb8)","tc-switch-track-on":"var(--tc-color-accent, #a16939)","tc-switch-thumb":"var(--tc-color-surface, #ffffff)","tc-switch-fg":"var(--tc-color-ink, #14171f)","tc-switch-helper":"var(--tc-color-ink-muted, #6b7280)","tc-switch-error":"var(--tc-color-danger, #b3261e)","tc-switch-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},template:({props:e})=>{let t=!!e.error;return`
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
          ${e.label?`<span class="label">${Xe(e.label)}</span>`:""}
        </label>
        ${e.error||e.helper?`<div class="${t?"error":"helper"}">${Xe(e.error||e.helper)}</div>`:""}
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
      `},events:{"click .track":(e,t)=>{let r=t.host;r.disabled||(r.checked=!r.checked,r.internals?.setFormValue(r.checked?r.value:null),t.emit("tc-change",{checked:r.checked}))},"keydown .track":(e,t)=>{let r=e;if(r.key!==" "&&r.key!=="Enter")return;r.preventDefault();let a=t.host;a.disabled||(a.checked=!a.checked,a.internals?.setFormValue(a.checked?a.value:null),t.emit("tc-change",{checked:a.checked}))}},afterMount(){let e=this;e.internals?.setFormValue(e.checked?e.value:null)},formResetCallback(){this.checked=!1}}));function Xe(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Wt="tc-file";f(Wt,p({formAssociated:!0,props:{name:{type:"string",default:""},accept:{type:"string",default:""},multiple:{type:"boolean",default:!1,reflect:!0},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},buttonText:{type:"string",default:"Choose file"},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0}},theme:{"tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-border-focus":"var(--tc-color-accent, #a16939)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-radius":"var(--tc-radius-md, 8px)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-file-zone-bg":"var(--tc-color-surface-alt, #faf8f3)","tc-file-zone-fg":"var(--tc-color-ink-soft, #4a5061)"},styles:{display:"block"},refs:{input:"input[type='file']"},template:({props:e,state:t})=>{let r=!!e.error,a=t.files??[],n=a.length===0?"No file selected":a.length===1?Z(a[0].name):`${a.length} files selected`;return`
        ${e.label?`<label class="label">${Z(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</label>`:""}
        <div class="zone ${e.disabled?"is-disabled":""} ${r?"is-invalid":""}">
          <button class="btn" type="button" ${e.disabled?"disabled":""}>
            ${Z(e.buttonText)}
          </button>
          <span class="files">${n}</span>
          <input
            class="native"
            type="file"
            name="${Z(e.name)}"
            accept="${Z(e.accept)}"
            ${e.multiple?"multiple":""}
            ${e.disabled?"disabled":""}
            ${e.required?"required":""}
            tabindex="-1"
            aria-hidden="true"
          />
        </div>
        ${e.error||e.helper?`<div class="${r?"error":"helper"}">${Z(e.error||e.helper)}</div>`:""}
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
      `},events:{"click .btn":(e,t)=>{t.refs.input?.click()},"change input[type='file']":(e,t)=>{let r=e.target,a=Array.from(r.files??[]);t.setState("files",a);let n=t.host;if(n.internals)if(a.length===0)n.internals.setFormValue(null);else if(a.length===1)n.internals.setFormValue(a[0]);else{let o=new FormData,s=n.name;for(let i of a)o.append(s,i);n.internals.setFormValue(o)}t.emit("tc-files",{files:a})}},formResetCallback(){let t=this.shadowRoot?.querySelector(".native");t&&(t.value=""),this.setState("files",[])}}));function Z(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Xt="tc-radio-group";f(Xt,p({formAssociated:!0,props:{value:{type:"string",default:""},name:{type:"string",default:""},options:{type:"json",default:[]},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},layout:{type:"string",default:"vertical"},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0}},theme:{"tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-radio-accent":"var(--tc-color-accent, #a16939)"},styles:{display:"block"},template:({props:e})=>{let t=e.options??[],r=!!e.error,a=String(e.layout??"vertical");return`
        <fieldset class="group" ${e.disabled?"disabled":""}>
          ${e.label?`<legend class="legend">${Q(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</legend>`:""}
          <div class="opts l-${Q(a)}" role="radiogroup" aria-invalid="${r?"true":"false"}">
            ${t.map((n,o)=>`<label class="opt ${n.disabled?"is-disabled":""}">
                  <input
                    type="radio"
                    class="r"
                    name="${Q(e.name)||`__rg_${o}__`}"
                    value="${Q(n.value)}"
                    ${n.value===e.value?"checked":""}
                    ${n.disabled||e.disabled?"disabled":""}
                  />
                  <span>${Q(n.label)}</span>
                </label>`).join("")}
          </div>
        </fieldset>
        ${e.error||e.helper?`<div class="${r?"error":"helper"}">${Q(e.error||e.helper)}</div>`:""}
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
      `},events:{"change input.r":(e,t)=>{let r=e.target.value,a=t.host;a.value=r,a.internals?.setFormValue(r),t.emit("tc-change",{value:r})}},afterMount(){let e=this;e.value&&e.internals?.setFormValue(e.value)},formResetCallback(){this.value=""}}));function Q(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Jt="tc-table";var Zt=`
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
`,Ne=new WeakMap;f(Jt,p({props:{rows:{type:"json",default:[]},columns:{type:"json",default:[]},pageSize:{type:"number",default:10},filterable:{type:"boolean",default:!0},emptyText:{type:"string",default:"No results."},rowKey:{type:"string",default:"id"}},theme:{"tc-table-surface":"var(--tc-color-surface, #ffffff)","tc-table-ink":"var(--tc-color-ink, #14171f)","tc-table-soft":"var(--tc-color-ink-soft, #5a6072)","tc-table-rule":"var(--tc-color-rule, #ece5d3)","tc-table-head-bg":"var(--tc-color-surface-alt, #faf8f3)","tc-table-row-hover":"rgba(161, 105, 57, 0.05)","tc-table-accent":"var(--tc-color-accent, #a16939)","tc-table-radius":"var(--tc-radius-lg, 10px)","tc-table-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},children:[p({tag:"style",template:Zt}),p({if:({props:e})=>!!e.filterable,tag:"input",className:"filter",attributes:{placeholder:"Search...",type:"text"}}),p({tag:"div",className:"wrap",children:[p({tag:"table",children:[p({tag:"thead",template:({props:e,state:t})=>{let r=e.columns??[],a=t;return`<tr>${r.map(n=>{let o=a.sortKey===n.key,s=n.sortable!==!1,i=o?a.sortDir==="asc"?"\u25B2":"\u25BC":"",l=o?a.sortDir==="asc"?"ascending":"descending":"none";return`<th
                        data-col="${xe(n.key)}"
                        class="${s?"sortable":""}"
                        aria-sort="${l}"
                      >${xe(n.label)}<span class="sort">${i}</span></th>`}).join("")}</tr>`}}),p({tag:"tbody",children:[p({tag:"tr",className:"empty",if:({props:e,state:t})=>Je(e,t).length===0,template:({props:e})=>`<td colspan="${(e.columns??[]).length||1}">${xe(e.emptyText)}</td>`})],for:{items:({props:e,state:t})=>Je(e,t),key:(e,t)=>e["id"]??t,render:(e,t,r)=>{let n=r.props.columns??[],o=e;return p({tag:"tr",attributes:{"data-row-id":String(o.id??t)},template:n.map(s=>`<td>${typeof s.render=="function"?s.render(o):xe(o[s.key]??"")}</td>`).join("")})}}})]})]}),p({tag:"footer",className:"pager",template:({props:e,state:t})=>{let r=t,a=we(e,r),n=e.pageSize??10,o=Math.max(1,Math.ceil(a.length/n)),s=Math.min(r.page??0,o-1),i=(e.rows??[]).length;return`
            <span class="count">${a.length} of ${i} rows</span>
            <span class="spacer"></span>
            <button class="prev" type="button" ${s<=0?"disabled":""}>\u2039 prev</button>
            <span class="page">page ${s+1} of ${o}</span>
            <button class="next" type="button" ${s>=o-1?"disabled":""}>next \u203A</button>
          `}})],refs:{filter:".filter"},afterRender(){let e=this,t=e.refs.filter;if(!t)return;let r=e.getState("q")??"";t.value!==r&&(t.value=r);let a=Ne.get(e);if(a){Ne.delete(e),t.focus();let n=Math.min(a.caret,t.value.length);try{t.setSelectionRange(n,n)}catch{}}},events:{"input .filter":(e,t)=>{let r=e.target;Ne.set(t.host,{caret:r.selectionStart??r.value.length}),t.setState("q",r.value),t.setState("page",0)},"click .prev":(e,t)=>{let r=(t.state.page??0)-1;t.setState("page",Math.max(0,r))},"click .next":(e,t)=>{let r=t.state,a=we(t.props,r).length,n=t.props.pageSize??10,o=Math.max(0,Math.ceil(a/n)-1),s=(r.page??0)+1;t.setState("page",Math.min(o,s))},"click th.sortable":(e,t)=>{let r=e.target.closest("th");if(!r)return;let a=r.dataset.col;if(!a)return;let n=t.state,o;n.sortKey!==a?o="asc":o=n.sortDir==="asc"?"desc":n.sortDir==="desc"?null:"asc",t.setState("sortKey",o?a:null),t.setState("sortDir",o),t.emit("tc-sort-change",{key:o?a:null,direction:o})},"click tr[data-row-id]":(e,t)=>{let r=e.target.closest("tr[data-row-id]");if(!r)return;let a=r.dataset.rowId;if(a===void 0)return;let n=we(t.props,t.state),o=n.find(s=>String(s.id)===a)??n[Number(a)];o&&t.emit("tc-row-click",{row:o})}}}));function we(e,t){let r=e.rows??[],a=e.columns??[],n=(t.q??"").trim().toLowerCase(),o=n.length===0?r.slice():r.filter(s=>a.some(i=>String(s[i.key]??"").toLowerCase().includes(n)));if(t.sortKey&&t.sortDir){let s=t.sortKey,i=t.sortDir==="asc"?1:-1;o=o.slice().sort((l,c)=>{let d=l[s],u=c[s];return d===u?0:d==null?1:u==null?-1:typeof d=="number"&&typeof u=="number"?(d-u)*i:String(d).localeCompare(String(u))*i})}return o}function Je(e,t){let r=e.pageSize??10,a=we(e,t),n=Math.max(1,Math.ceil(a.length/r)),o=Math.min(t.page??0,n-1);return a.slice(o*r,o*r+r)}function xe(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Qt="tc-tabs";f(Qt,p({props:{tabs:{type:"json",default:[]},active:{type:"string",default:"",reflect:!0}},theme:{"tc-tabs-fg":"var(--tc-color-ink, #14171f)","tc-tabs-fg-muted":"var(--tc-color-ink-muted, #6b7280)","tc-tabs-rule":"var(--tc-color-rule, #ece5d3)","tc-tabs-accent":"var(--tc-color-accent, #a16939)","tc-tabs-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block","font-family":"var(--tc-tabs-font)"},template:({props:e})=>{let t=e.tabs??[],r=e.active||t[0]?.id||"";return`
        <div role="tablist" class="strip">
          ${t.map(a=>`<button
              role="tab"
              type="button"
              class="tab ${a.id===r?"active":""}"
              data-tab="${ce(a.id)}"
              aria-selected="${a.id===r?"true":"false"}"
              aria-controls="panel-${ce(a.id)}"
              tabindex="${a.id===r?"0":"-1"}"
            >${ce(a.label)}</button>`).join("")}
        </div>
        <div class="panels">
          ${t.map(a=>`<section
              role="tabpanel"
              id="panel-${ce(a.id)}"
              class="panel"
              aria-labelledby=""
              ${a.id===r?"":"hidden"}
            ><slot name="${ce(a.id)}"></slot></section>`).join("")}
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
      `},events:{"click .tab":(e,t)=>{let r=e.target.closest(".tab");if(!r)return;let a=r.dataset.tab;if(!a)return;let n=t.host,o=n.active;o!==a&&(n.active=a,t.emit("tc-tab-change",{active:a,previous:o}))},"keydown .tab":(e,t)=>{let r=e,a=t.props.tabs??[];if(a.length===0)return;let n=t.host,o=n.active||a[0].id,s=a.findIndex(c=>c.id===o),i=s;if(r.key==="ArrowRight")i=(s+1)%a.length;else if(r.key==="ArrowLeft")i=(s-1+a.length)%a.length;else if(r.key==="Home")i=0;else if(r.key==="End")i=a.length-1;else return;r.preventDefault();let l=a[i].id;n.active=l,t.emit("tc-tab-change",{active:l,previous:o}),queueMicrotask(()=>{t.host.shadowRoot?.querySelector(`.tab[data-tab="${l}"]`)?.focus()})}}}));function ce(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var er="tc-modal";var ee=new WeakMap;f(er,p({props:{open:{type:"boolean",default:!1,reflect:!0},title:{type:"string",default:""},dismissible:{type:"boolean",default:!0},width:{type:"string",default:"min(560px, 92vw)"}},theme:{"tc-modal-surface":"var(--tc-color-surface, #ffffff)","tc-modal-ink":"var(--tc-color-ink, #14171f)","tc-modal-rule":"var(--tc-color-rule, #ece5d3)","tc-modal-soft":"var(--tc-color-ink-soft, #5a6072)","tc-modal-radius":"var(--tc-radius-lg, 12px)","tc-modal-backdrop":"rgba(20, 23, 31, 0.5)","tc-modal-shadow":"var(--tc-shadow-lg, 0 24px 60px rgba(20, 23, 31, 0.25))","tc-modal-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"contents"},template:({props:e})=>`
      <dialog class="dlg" aria-labelledby="${e.title?"title":""}">
        ${e.title||e.dismissible?`<header class="head">
              ${e.title?`<h2 id="title" class="title">${Qe(e.title)}</h2>`:"<span></span>"}
              ${e.dismissible?'<button class="x" type="button" aria-label="Close">\xD7</button>':""}
            </header>`:""}
        <div class="body"><slot></slot></div>
        <footer class="foot"><slot name="footer"></slot></footer>
      </dialog>
      <style>
        .dlg {
          width: ${Qe(e.width)};
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
    `,refs:{dialog:".dlg"},events:{"click .x":(e,t)=>{Ze(t.host,"button")},"click .dlg":(e,t)=>{let r=t.host;if(!r.dismissible)return;let a=t.refs.dialog;a&&e.target===a&&Ze(r,"backdrop")}},afterRender(){tr(this)},unmount(){let e=ee.get(this);e&&(e.cleanup(),ee.delete(this))}}));function tr(e){let t=e.shadowRoot;if(!t)return;let r=t.querySelector(".dlg");if(!r)return;let a=e.open,n=ee.get(e);if(n&&n.dialog!==r&&(n.cleanup(),ee.delete(e)),a&&!r.open){if(typeof r.showModal=="function")try{r.showModal()}catch{r.setAttribute("open","")}else r.setAttribute("open","");if(!ee.has(e)){let o=()=>{let s=e;s.open&&(s.open=!1,e.dispatchEvent(new CustomEvent("tc-close",{detail:{reason:"escape"},bubbles:!0,composed:!0})))};r.addEventListener("close",o),ee.set(e,{dialog:r,cleanup:()=>r.removeEventListener("close",o)})}}else if(!a&&r.open)try{r.close()}catch{r.removeAttribute("open")}}function Ze(e,t){e.open&&(e.open=!1,e.dispatchEvent(new CustomEvent("tc-close",{detail:{reason:t},bubbles:!0,composed:!0})))}function Qe(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var rr="tc-toast";var de=new WeakMap;f(rr,p({props:{open:{type:"boolean",default:!1,reflect:!0},variant:{type:"string",default:"info"},message:{type:"string",default:""},duration:{type:"number",default:4e3},dismissible:{type:"boolean",default:!0}},theme:{"tc-toast-info":"var(--tc-color-info, #3a5b8c)","tc-toast-success":"var(--tc-color-success, #207a5b)","tc-toast-warning":"var(--tc-color-warning, #a87326)","tc-toast-error":"var(--tc-color-danger, #b3261e)","tc-toast-fg":"var(--tc-color-surface, #ffffff)","tc-toast-radius":"var(--tc-radius-lg, 10px)","tc-toast-shadow":"var(--tc-shadow-lg, 0 12px 30px rgba(20, 23, 31, 0.18))","tc-toast-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},template:({props:e})=>{let t=String(e.variant??"info"),r=t==="success"?"\u2713":t==="warning"?"!":t==="error"?"\u2715":"i";return`
        <div class="toast v-${et(t)} ${e.open?"open":"closed"}" role="status" aria-live="polite">
          <span class="icon" aria-hidden="true">${r}</span>
          <span class="msg">${e.message?et(e.message):"<slot></slot>"}</span>
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
      `},events:{"click .x":(e,t)=>tt(t.host,"button")},afterMount(){ar(this)},unmount(){let e=de.get(this);e!==void 0&&(clearTimeout(e),de.delete(this))}}));function ar(e){let t=e,r=de.get(e);if(r!==void 0&&clearTimeout(r),de.delete(e),!t.open||!t.duration||t.duration<=0)return;let a=setTimeout(()=>{t.open&&tt(e,"timeout")},t.duration);de.set(e,a)}function tt(e,t){let r=e;r.open&&(r.open=!1,e.dispatchEvent(new CustomEvent("tc-toast-close",{detail:{reason:t},bubbles:!0,composed:!0})))}function et(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var nr="tc-stat";f(nr,p({props:{label:{type:"string",default:""},value:{type:"string",default:""},delta:{type:"string",default:""},trend:{type:"string",default:"neutral"},prefix:{type:"string",default:""},suffix:{type:"string",default:""}},theme:{"tc-stat-surface":"var(--tc-color-surface, #ffffff)","tc-stat-rule":"var(--tc-color-rule, #ece5d3)","tc-stat-label":"var(--tc-color-ink-muted, #6b7280)","tc-stat-value":"var(--tc-color-ink, #14171f)","tc-stat-up":"var(--tc-color-success, #207a5b)","tc-stat-down":"var(--tc-color-danger, #b3261e)","tc-stat-neutral":"var(--tc-color-ink-muted, #6b7280)","tc-stat-radius":"var(--tc-radius-lg, 12px)","tc-stat-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},template:({props:e})=>{let t=String(e.trend??"neutral"),r=t==="up"?"\u25B2":t==="down"?"\u25BC":"\u2022";return`
        <div class="card">
          ${e.label?`<div class="label">${te(e.label)}</div>`:""}
          <div class="value">
            ${e.prefix?`<span class="prefix">${te(e.prefix)}</span>`:""}
            <span class="num">${te(e.value)}</span>
            ${e.suffix?`<span class="suffix">${te(e.suffix)}</span>`:""}
          </div>
          ${e.delta?`<div class="delta t-${te(t)}">
                  <span class="arrow" aria-hidden="true">${r}</span>
                  <span>${te(e.delta)}</span>
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
      `}}));function te(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var or="tc-card";f(or,p({props:{title:{type:"string",default:""},subtitle:{type:"string",default:""},padded:{type:"boolean",default:!0},bordered:{type:"boolean",default:!0},elevated:{type:"boolean",default:!1}},theme:{"tc-card-surface":"var(--tc-color-surface, #ffffff)","tc-card-ink":"var(--tc-color-ink, #14171f)","tc-card-soft":"var(--tc-color-ink-soft, #5a6072)","tc-card-rule":"var(--tc-color-rule, #ece5d3)","tc-card-radius":"var(--tc-radius-lg, 12px)","tc-card-shadow":"var(--tc-shadow-md, 0 8px 24px rgba(20, 23, 31, 0.06))","tc-card-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-card-padding-x":"var(--tc-space-5, 20px)","tc-card-padding-y":"var(--tc-space-5, 20px)","tc-card-gap":"var(--tc-space-3, 12px)"},styles:{display:"block"},template:({props:e})=>{let t=!!e.title||!!e.subtitle;return`
        <div class="${["card",e.bordered?"bordered":"",e.elevated?"elevated":"",e.padded===!1?"nopad":"",t?"has-header":""].filter(Boolean).join(" ")}">
          <div class="media"><slot name="media"></slot></div>
          <div class="head">
            <slot name="header">
              ${e.title?`<div class="title">${rt(e.title)}</div>`:""}
              ${e.subtitle?`<div class="subtitle">${rt(e.subtitle)}</div>`:""}
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
      `}}));function rt(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var sr="tc-badge";f(sr,p({props:{variant:{type:"string",default:"neutral"},size:{type:"string",default:"md"},pill:{type:"boolean",default:!1}},theme:{"tc-badge-radius":"var(--tc-radius-sm, 6px)","tc-badge-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-badge-neutral-bg":"var(--tc-color-rule, #ece5d3)","tc-badge-neutral-fg":"var(--tc-color-ink, #14171f)","tc-badge-info-bg":"var(--tc-color-info-bg, #dde6f4)","tc-badge-info-fg":"var(--tc-color-info-fg, #1f3a66)","tc-badge-success-bg":"var(--tc-color-success-bg, #dbece2)","tc-badge-success-fg":"var(--tc-color-success-fg, #155b40)","tc-badge-warning-bg":"var(--tc-color-warning-bg, #f5e7cf)","tc-badge-warning-fg":"var(--tc-color-warning-fg, #7a4f0a)","tc-badge-danger-bg":"var(--tc-color-danger-bg, #f4dad7)","tc-badge-danger-fg":"var(--tc-color-danger-fg, #7a1a14)"},styles:{display:"inline-block"},template:({props:e})=>`
      <span class="badge v-${at(e.variant)} s-${at(e.size)} ${e.pill?"pill":""}">
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
    `}));function at(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var ir="tc-skeleton";f(ir,p({props:{width:{type:"string",default:"100%"},height:{type:"string",default:"1em"},rounded:{type:"boolean",default:!1},pulse:{type:"boolean",default:!0}},theme:{"tc-skeleton-base":"var(--tc-color-rule, #ece5d3)","tc-skeleton-shine":"rgba(255, 255, 255, 0.6)","tc-skeleton-radius":"var(--tc-radius-md, 6px)"},styles:{display:"inline-block","vertical-align":"middle"},template:({props:e})=>`
      <span
        class="bone ${e.pulse?"pulse":""} ${e.rounded?"round":""}"
        aria-hidden="true"
        style="width: ${nt(e.width)}; height: ${nt(e.height)};"
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
    `}));function nt(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var lr="tc-stack";f(lr,p({props:{gap:{type:"string",default:"4"},align:{type:"string",default:"stretch"}},styles:{display:"block"},template:({props:e})=>`
      <div class="stack" style="--tc-stack-gap: ${cr(e.gap)}; --tc-stack-align: ${ur(e.align)};">
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
    `}));function cr(e){let t=String(e??"4").trim();return/^[1-8]$/.test(t)?`var(--tc-space-${t}, ${dr(t)})`:t}function dr(e){return{1:"4px",2:"8px",3:"12px",4:"16px",5:"24px",6:"32px",7:"48px",8:"64px"}[e]??"16px"}function ur(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var pr="tc-cluster";f(pr,p({props:{gap:{type:"string",default:"3"},justify:{type:"string",default:"start"},align:{type:"string",default:"center"},wrap:{type:"boolean",default:!0}},styles:{display:"block"},template:({props:e})=>`
      <div class="cluster" style="
        --tc-cluster-gap: ${gr(e.gap)};
        --tc-cluster-justify: ${fr(e.justify)};
        --tc-cluster-align: ${br(e.align)};
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
    `}));function fr(e){let t=String(e??"start").trim();switch(t){case"between":return"space-between";case"around":return"space-around";case"evenly":return"space-evenly";default:return t}}function gr(e){let t=String(e??"3").trim();return/^[1-8]$/.test(t)?`var(--tc-space-${t}, ${mr(t)})`:t}function mr(e){return{1:"4px",2:"8px",3:"12px",4:"16px",5:"24px",6:"32px",7:"48px",8:"64px"}[e]??"12px"}function br(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var hr="tc-grid";f(hr,p({props:{min:{type:"string",default:"260px"},gap:{type:"string",default:"4"},columns:{type:"string",default:""}},styles:{display:"block"},template:({props:e})=>{let t=String(e.columns??"").trim();return`
        <div class="grid" style="
          --tc-grid-template: ${t?`repeat(${ot(t)}, minmax(0, 1fr))`:`repeat(auto-fit, minmax(${ot(e.min)}, 1fr))`};
          --tc-grid-gap: ${vr(e.gap)};
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
      `}}));function vr(e){let t=String(e??"4").trim();return/^[1-8]$/.test(t)?`var(--tc-space-${t}, ${yr(t)})`:t}function yr(e){return{1:"4px",2:"8px",3:"12px",4:"16px",5:"24px",6:"32px",7:"48px",8:"64px"}[e]??"16px"}function ot(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var xr="tc-code";var wr='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',kr='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';f(xr,p({props:{language:{type:"string",default:""},copy:{type:"boolean",default:!1},filename:{type:"string",default:""}},theme:{"tc-code-bg":"var(--tc-code-bg-base, #14171f)","tc-code-ink":"var(--tc-code-ink-base, #efe6d4)","tc-code-rule":"var(--tc-code-rule-base, rgba(255,255,255,0.08))","tc-code-label":"var(--tc-code-label-base, #8a8678)","tc-code-radius":"var(--tc-radius-md, 10px)","tc-code-font":"var(--tc-font-mono, 'JetBrains Mono', ui-monospace, monospace)","tc-code-padding":"var(--tc-space-5, 20px) var(--tc-space-5, 20px)","tc-code-kw":"var(--tc-code-kw-base, #f0a878)","tc-code-str":"var(--tc-code-str-base, #d9b380)","tc-code-com":"var(--tc-code-com-base, #8a8678)","tc-code-num":"var(--tc-code-num-base, #c4d3b8)","tc-code-tag":"var(--tc-code-tag-base, #d49a68)"},styles:{display:"block"},template:({props:e,state:t})=>{let r=e.filename||e.language||"",a=t.copied===!0;return`
        <div class="block">
          ${r||e.copy?`
            <header class="bar">
              <span class="label">${st(r)}</span>
              ${e.copy?`<button type="button" class="copy" aria-label="Copy code">
                    <span class="copy-icon" aria-hidden="true">${a?kr:wr}</span>
                    <span class="copy-text">${a?"Copied":"Copy"}</span>
                  </button>`:""}
            </header>
          `:""}
          <pre><code class="code lang-${st(String(e.language||"txt"))}"><slot></slot></code></pre>
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
      `},events:{"click .copy":(e,t)=>{let r=t.host,a=r.shadowRoot?.querySelector("slot"),o=(a?a.assignedNodes({flatten:!0}):Array.from(r.childNodes)).map(i=>i.textContent??"").join(""),s=()=>{t.setState("copied",!0),t.emit("tc-copy",{text:o}),setTimeout(()=>t.setState("copied",!1),1600)};navigator.clipboard?.writeText?navigator.clipboard.writeText(o).then(s,s):s()}}}));function st(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var $r="tc-callout";var it={note:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',info:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',success:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',warning:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',danger:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>'};f($r,p({props:{variant:{type:"string",default:"note"},title:{type:"string",default:""},compact:{type:"boolean",default:!1}},theme:{"tc-callout-radius":"var(--tc-radius-md, 8px)","tc-callout-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif)","tc-callout-note-bg":"var(--tc-color-surface-alt, #faf8f3)","tc-callout-note-fg":"var(--tc-color-ink-soft, #4a5061)","tc-callout-note-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-callout-info-bg":"var(--tc-color-info-bg, #dde6f4)","tc-callout-info-fg":"var(--tc-color-info-fg, #1f3a66)","tc-callout-info-border":"var(--tc-color-info, #3a5b8c)","tc-callout-success-bg":"var(--tc-color-success-bg, #dbece2)","tc-callout-success-fg":"var(--tc-color-success-fg, #155b40)","tc-callout-success-border":"var(--tc-color-success, #207a5b)","tc-callout-warning-bg":"var(--tc-color-warning-bg, #f5e7cf)","tc-callout-warning-fg":"var(--tc-color-warning-fg, #7a4f0a)","tc-callout-warning-border":"var(--tc-color-warning, #a87326)","tc-callout-danger-bg":"var(--tc-color-danger-bg, #f4dad7)","tc-callout-danger-fg":"var(--tc-color-danger-fg, #7a1a14)","tc-callout-danger-border":"var(--tc-color-danger, #b3261e)"},styles:{display:"block"},template:({props:e})=>{let t=String(e.variant??"note"),r=it[t]??it.note;return`
        <aside
          class="callout v-${lt(t)} ${e.compact?"compact":""}"
          role="${t==="danger"?"alert":"note"}"
        >
          <span class="icon" aria-hidden="true">${r}</span>
          <div class="body">
            ${e.title?`<div class="title">${lt(e.title)}</div>`:""}
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
      `}}));function lt(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Sr="tc-toc";var ke=new WeakMap;f(Sr,p({props:{target:{type:"string",default:"main"},levels:{type:"string",default:"h2,h3"},sticky:{type:"boolean",default:!0},label:{type:"string",default:"On this page"}},theme:{"tc-toc-fg":"var(--tc-color-ink, #14171f)","tc-toc-fg-muted":"var(--tc-color-ink-muted, #6b7280)","tc-toc-active":"var(--tc-color-accent, #a16939)","tc-toc-rule":"var(--tc-color-rule, #ece5d3)","tc-toc-label":"var(--tc-color-ink-soft, #4a5061)","tc-toc-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif)","tc-toc-top":"80px"},styles:{display:"block"},template:({props:e,state:t})=>{let r=t.items??[],a=t.activeId??"";return`
        <nav
          class="toc${e.sticky?" sticky":""}"
          aria-label="Table of contents"
        >
          ${e.label?`<div class="label">${Re(e.label)}</div>`:""}
          ${r.length===0?'<p class="empty">No sections yet.</p>':`<ol class="list">${r.map(n=>`<li class="lvl-${n.level}${n.id===a?" active":""}"><a href="#${Re(n.id)}">${Re(n.text)}</a></li>`).join("")}</ol>`}
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
      `},afterMount(){Er(this)},unmount(){ke.get(this)?.observer?.disconnect(),ke.delete(this)}}));function Er(e){ke.get(e)?.observer?.disconnect();let r=e,a=r.target||"main",n=(r.levels||"h2,h3").split(",").map(c=>c.trim().toLowerCase()).filter(Boolean),o=document.querySelector(a);if(!o)return;let s=Array.from(o.querySelectorAll(n.join(","))).filter(c=>c instanceof HTMLElement),i=s.map(c=>(c.id||(c.id=Tr(c.textContent??"")),{id:c.id,level:parseInt(c.tagName.slice(1),10),text:(c.textContent??"").trim()}));if(e.setState("items",i),typeof IntersectionObserver>"u")return;let l=new IntersectionObserver(c=>{let u=c.filter(m=>m.isIntersecting).sort((m,b)=>m.boundingClientRect.top-b.boundingClientRect.top)[0];if(!u)return;let g=u.target.id;g&&e.setState("activeId",g)},{rootMargin:"0px 0px -70% 0px",threshold:0});for(let c of s)l.observe(c);ke.set(e,{observer:l,activeId:""})}function Tr(e){return e.toLowerCase().trim().replace(/[^\w\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-")||"section"}function Re(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Mr="tc-pagination";f(Mr,p({props:{current:{type:"number",default:1},total:{type:"number",default:1},siblings:{type:"number",default:1},boundaries:{type:"number",default:1},size:{type:"string",default:"sm"},"prev-label":{type:"string",default:"Prev"},"next-label":{type:"string",default:"Next"},label:{type:"string",default:"Pagination"}},styles:{display:"block"},template:({props:e})=>{let t=Math.max(1,Number(e.total)|0),r=Lr(Number(e.current)|0,1,t),a=Math.max(0,Number(e.siblings)|0),n=Math.max(0,Number(e.boundaries)|0);if(t<=1)return"";let o=Hr(r,t,a,n),s=$e(String(e.size??"sm")),i=r<=1?" disabled":"",l=r>=t?" disabled":"",c=o.map(d=>{if(d==="\u2026")return'<span class="ellipsis" aria-hidden="true">\u2026</span>';let u=d===r;return`<tc-button
            class="num"
            size="${s}"
            variant="${u?"primary":"ghost"}"
            data-page="${d}"${u?' aria-current="page"':""}
          >${d}</tc-button>`}).join("");return`
        <nav aria-label="${$e(String(e.label??"Pagination"))}">
          <tc-button
            class="prev"
            size="${s}"
            variant="ghost"
            data-page="${r-1}"${i}
          >\u2190 ${$e(String(e["prev-label"]??"Prev"))}</tc-button>
          <span class="pages">${c}</span>
          <tc-button
            class="next"
            size="${s}"
            variant="ghost"
            data-page="${r+1}"${l}
          >${$e(String(e["next-label"]??"Next"))} \u2192</tc-button>
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
      `},events:{"click tc-button":(e,t)=>{let r=e.target.closest("tc-button");if(!r||r.hasAttribute("disabled"))return;let a=r.getAttribute("data-page");if(a==null)return;let n=Number(a),o=t.host,s=Math.max(1,Number(o.total)|0),i=Number(o.current)|0;!Number.isFinite(n)||n<1||n>s||n!==i&&t.emit("tc-page-change",{page:n})}}}));function Lr(e,t,r){return Math.min(r,Math.max(t,e))}function Hr(e,t,r,a){let n=new Set;for(let i=1;i<=Math.min(a,t);i++)n.add(i);for(let i=Math.max(1,t-a+1);i<=t;i++)n.add(i);for(let i=Math.max(1,e-r);i<=Math.min(t,e+r);i++)n.add(i);let o=[...n].sort((i,l)=>i-l),s=[];for(let i=0;i<o.length;i++)i>0&&o[i]-o[i-1]>1&&s.push("\u2026"),s.push(o[i]);return s}function $e(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var zr="tc-combobox";function ue(e){if(Array.isArray(e))return e.map(r=>String(r)).filter(Boolean);let t=String(e??"").trim();return t?t.split(",").map(r=>r.trim()).filter(Boolean):[]}function pe(e){return e.join(",")}function Cr(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}var Ar=`
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
`;f(zr,p({formAssociated:!0,props:{value:{type:"string",default:""},name:{type:"string",default:""},options:{type:"json",default:[]},multiple:{type:"boolean",default:!1},searchable:{type:"boolean",default:!0},placeholder:{type:"string",default:""},"empty-text":{type:"string",default:"No results"},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0},max:{type:"number",default:0}},theme:{"tc-input-bg":"var(--tc-color-surface, #ffffff)","tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-border-focus":"var(--tc-color-accent, #a16939)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-radius":"var(--tc-radius-md, 8px)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-combobox-chip-bg":"var(--tc-color-accent-soft, #efe2cf)","tc-combobox-chip-fg":"var(--tc-color-accent-hover, #8a572d)","tc-combobox-popup-bg":"var(--tc-color-surface, #ffffff)","tc-combobox-popup-hover":"var(--tc-color-accent-soft, #efe2cf)","tc-combobox-popup-active":"var(--tc-color-accent-soft, #efe2cf)"},styles:{display:"block"},refs:{search:".search",popup:".popup"},template:({props:e,state:t})=>{let r=e.options??[],a=!!e.multiple,n=e.searchable!==!1,o=!!e.disabled,s=!!e.error,i=ue(e.value),l=String(t.query??""),c=!!t.open&&!o,d=Number(t.focusedIndex??-1),u=ct(r,l),g=new Set(i),m=i.map(y=>r.find(j=>j.value===y)).filter(y=>!!y),b=n&&(c||a&&i.length===0),v=!a&&i.length===1&&(!c||!n),S=i.length===0&&!b&&!v,k=a?m.map(y=>`<span class="chip" data-value="${H(y.value)}">
              ${y.icon?`<span class="chip-icon">${H(y.icon)}</span>`:""}
              <span class="chip-label">${H(y.label)}</span>
              <button
                type="button"
                class="chip-remove"
                data-remove="${H(y.value)}"
                aria-label="Remove ${H(y.label)}"
                ${o?"disabled":""}
              >&times;</button>
            </span>`).join(""):"",x=v&&m[0]?`<span class="single">
            ${m[0].icon?`<span class="single-icon">${H(m[0].icon)}</span>`:""}
            <span class="single-label">${H(m[0].label)}</span>
          </span>`:"",M=S?`<span class="placeholder">${H(e.placeholder??"")}</span>`:"",R=b?`<input
            type="text"
            class="search"
            part="search"
            value="${H(l)}"
            placeholder="${H(i.length===0?e.placeholder??"":"")}"
            ${o?"disabled":""}
            autocomplete="off"
            aria-autocomplete="list"
            aria-expanded="${c?"true":"false"}"
            role="combobox"
          />`:"",A=u.length===0?`<div class="empty">${H(e["empty-text"]??"No results")}</div>`:u.map((y,j)=>{let z=g.has(y.value);return`<div
              class="${["option",z?"selected":"",j===d?"focused":"",y.disabled?"disabled":""].filter(Boolean).join(" ")}"
              role="option"
              data-value="${H(y.value)}"
              data-index="${j}"
              aria-selected="${z?"true":"false"}"
              ${y.disabled?'aria-disabled="true"':""}
            >
              ${a?`<span class="check" aria-hidden="true">${z?"\u2713":""}</span>`:""}
              ${y.icon?`<span class="opt-icon">${H(y.icon)}</span>`:""}
              <span class="opt-label">${H(y.label)}</span>
            </div>`}).join(""),U=e.label?`<label class="label">${H(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</label>`:"",ze=s?`<div class="helper error">${H(e.error)}</div>`:e.helper?`<div class="helper">${H(e.helper)}</div>`:"";return`
        ${U}
        <div
          class="control ${s?"invalid":""} ${c?"open":""} ${o?"disabled":""}"
          part="control"
          tabindex="${o?"-1":"0"}"
          role="${n?"presentation":"combobox"}"
        >
          <div class="display">
            ${k}${x}${M}${R}
          </div>
          <span class="caret" aria-hidden="true">\u25BE</span>
        </div>
        <div
          class="popup"
          part="popup"
          role="listbox"
          ${a?'aria-multiselectable="true"':""}
          ${c?"":"hidden"}
        >${A}</div>
        ${ze}
        ${Ar}
      `},events:{"click .control":(e,t)=>{if(e.target.closest(".chip-remove")||t.host.disabled)return;let n=!!t.getState("open");t.setState("open",!0),n||t.emit("tc-open"),t.refs.search?.focus()},"keydown .control":(e,t)=>{let r=e;if(r.key==="Enter"||r.key===" "){if(r.preventDefault(),t.host.disabled)return;t.setState("open",!0),t.emit("tc-open"),t.refs.search?.focus()}},"input .search":(e,t)=>{let r=e.target.value;t.setState("query",r),t.setState("open",!0),t.setState("focusedIndex",0),t.emit("tc-search",{query:r})},"keydown .search":(e,t)=>{let r=e,a=e.target,n=t.host,o=!!n.multiple,s=n.options??[],i=ct(s,String(t.getState("query")??""));if(r.key==="Backspace"&&a.value===""&&o){let l=ue(n.value);l.length>0&&(l.pop(),n.value=pe(l),Se(t,l,n),t.emit("tc-change",{value:l.slice()}),r.preventDefault());return}if(r.key==="ArrowDown"){r.preventDefault(),t.setState("open",!0);let l=Number(t.getState("focusedIndex")??-1),c=Math.min(i.length-1,l+1);t.setState("focusedIndex",c);return}if(r.key==="ArrowUp"){r.preventDefault();let l=Number(t.getState("focusedIndex")??0),c=Math.max(0,l-1);t.setState("focusedIndex",c);return}if(r.key==="Enter"){r.preventDefault();let l=Number(t.getState("focusedIndex")??-1);l>=0&&l<i.length&&dt(t,i[l],n);return}if(r.key==="Escape"){r.preventDefault(),t.setState("open",!1),t.setState("query",""),t.emit("tc-close");return}},"mousedown .option":(e,t)=>{e.preventDefault();let r=e.target.closest(".option");if(!r||r.classList.contains("disabled"))return;let a=r.dataset.value;if(a==null)return;let n=t.host,s=(n.options??[]).find(i=>i.value===a);s&&dt(t,s,n)},"click .chip-remove":(e,t)=>{e.stopPropagation();let a=e.target.dataset.remove;if(a==null)return;let n=t.host,o=ue(n.value).filter(s=>s!==a);n.value=pe(o),Se(t,o,n),t.emit("tc-change",{value:o.slice()})},"focusout .control":(e,t)=>{queueMicrotask(()=>{t.host.matches(":focus-within")||(t.setState("open",!1),t.setState("query",""),t.emit("tc-close"))})}},afterMount(){let e=this;if(!e.multiple||!e.internals)return;let t=ue(e.value),r=String(e.name??"");if(!r){e.internals.setFormValue(pe(t));return}let a=new FormData;for(let n of t)a.append(r,n);e.internals.setFormValue(a)},afterRender(){let e=this;if(!(e.getState?!!e.getState("open"):!1))return;let r=e.refs?.search??null;if(!r||e.shadowRoot?.activeElement===r)return;r.focus();let n=r.value.length;try{r.setSelectionRange(n,n)}catch{}}}));function ct(e,t){if(!t)return e;let r=new RegExp(Cr(t),"i");return e.filter(a=>r.test(a.label)||r.test(a.value))}function dt(e,t,r){let a=!!r.multiple,n=Number(r.max??0),o=ue(r.value);if(a){let s;if(o.includes(t.value))s=o.filter(i=>i!==t.value);else{if(n>0&&o.length>=n)return;s=o.concat(t.value)}r.value=pe(s),Se(e,s,r),e.setState("query",""),e.emit("tc-change",{value:s.slice()}),queueMicrotask(()=>{e.refs.search?.focus()})}else r.value=t.value,Se(e,[t.value],r),e.setState("query",""),e.setState("open",!1),e.emit("tc-change",{value:t.value}),e.emit("tc-close")}function Se(e,t,r){let a=r.internals;if(!a)return;let n=String(r.name??"");if(!r.multiple){a.setFormValue(t[0]??"");return}if(!n){a.setFormValue(pe(t));return}let o=new FormData;for(let s of t)o.append(n,s);a.setFormValue(o)}function H(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Nr="tc-carousel";function ut(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ee(e){let t=0;for(let r of Array.from(e.children))r instanceof Element&&!r.hasAttribute("slot")&&t++;return t}function gt(e,t,r){return t<=0?0:r?(e%t+t)%t:Math.max(0,Math.min(t-1,e))}function F(e,t){let r=Ee(e);if(r===0)return;let a=e.value,n=gt(t,r,e.loop);n!==a&&(e.value=n,e.dispatchEvent(new CustomEvent("tc-change",{detail:{index:n,previous:a},bubbles:!0,composed:!0})))}function pt(e){Ie(e),!(e.autoplay<=0)&&(Ee(e)<=1||(e._carouselTimer=globalThis.setInterval(()=>{F(e,e.value+1)},e.autoplay)))}function Ie(e){e._carouselTimer!==void 0&&(globalThis.clearInterval(e._carouselTimer),e._carouselTimer=void 0)}f(Nr,p({props:{value:{type:"number",default:0,reflect:!0},autoplay:{type:"number",default:0},loop:{type:"boolean",default:!0},orientation:{type:"string",default:"horizontal"},transition:{type:"string",default:"slide"},indicators:{type:"boolean",default:!0},controls:{type:"boolean",default:!0},swipe:{type:"boolean",default:!0},pauseOnHover:{type:"boolean",default:!0},ariaLabel:{type:"string",default:"Carousel"},height:{type:"string",default:""}},theme:{"tc-carousel-radius":"var(--tc-radius-lg, 12px)","tc-carousel-bg":"var(--tc-color-bg, #faf8f3)","tc-carousel-control-bg":"rgba(255, 255, 255, 0.85)","tc-carousel-control-bg-hover":"rgba(255, 255, 255, 1)","tc-carousel-control-fg":"var(--tc-color-ink, #14171f)","tc-carousel-control-size":"36px","tc-carousel-indicator":"rgba(20, 23, 31, 0.25)","tc-carousel-indicator-active":"var(--tc-color-accent, #a16939)","tc-carousel-duration":"320ms"},styles:{display:"block",position:"relative"},template:({props:e})=>{let t=Number(e.value??0),r=String(e.orientation)==="vertical",a=String(e.transition)==="fade",n=String(e.height??""),o=!!e.controls,s=!!e.indicators,i=ut(e.ariaLabel??"Carousel");return`
        <div
          class="root ${r?"v":"h"} ${a?"fade":"slide"}"
          role="region"
          aria-roledescription="carousel"
          aria-label="${i}"
          style="${n?`--tc-carousel-height: ${ut(n)};`:""}--tc-carousel-index: ${t};"
        >
          <div class="viewport" part="viewport">
            <slot class="track" part="track"></slot>
          </div>
          ${o?`
            <button type="button" class="ctrl prev" aria-label="Previous slide" part="control">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                ${r?'<polyline points="18 15 12 9 6 15"/>':'<polyline points="15 18 9 12 15 6"/>'}
              </svg>
            </button>
            <button type="button" class="ctrl next" aria-label="Next slide" part="control">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                ${r?'<polyline points="6 9 12 15 18 9"/>':'<polyline points="9 18 15 12 9 6"/>'}
              </svg>
            </button>
          `:""}
          ${s?'<div class="indicators" role="tablist" part="indicators"></div>':""}
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
      `},events:{"click .prev":(e,t)=>{let r=t.host;F(r,r.value-1)},"click .next":(e,t)=>{let r=t.host;F(r,r.value+1)},"click .dot":(e,t)=>{let r=e.target.closest(".dot");if(!r)return;let a=Number(r.dataset.index);if(!Number.isFinite(a))return;let n=t.host;F(n,a)},"keydown .root":(e,t)=>{let r=e,a=t.host,n=a.orientation==="vertical",o=Ee(a),s=n?"ArrowUp":"ArrowLeft",i=n?"ArrowDown":"ArrowRight";r.key===s?(r.preventDefault(),F(a,a.value-1)):r.key===i?(r.preventDefault(),F(a,a.value+1)):r.key==="Home"?(r.preventDefault(),F(a,0)):r.key==="End"&&(r.preventDefault(),F(a,o-1))}},afterMount(){let e=this,t=()=>ft(e),r=new MutationObserver(t);r.observe(e,{childList:!0});let a=e.shadowRoot,n=a?.querySelector("slot"),o=()=>t();n?.addEventListener("slotchange",o),e._carouselSlotObs=()=>{r.disconnect(),n?.removeEventListener("slotchange",o)};let s=()=>Ie(e),i=()=>{e.pauseOnHover&&pt(e)};e.addEventListener("pointerenter",s),e.addEventListener("pointerleave",i),e.addEventListener("focusin",s),e.addEventListener("focusout",i),e._carouselHover=()=>{e.removeEventListener("pointerenter",s),e.removeEventListener("pointerleave",i),e.removeEventListener("focusin",s),e.removeEventListener("focusout",i)},Rr(e),a?.querySelector(".root")?.setAttribute("tabindex","0"),t(),e.autoplay>0&&pt(e)},afterRender(){ft(this)},unmount(){let e=this;Ie(e),e._carouselSlotObs?.(),e._carouselHover?.(),e._carouselDrag?.()}}));function ft(e){let t=Ee(e),r=e.shadowRoot;if(!r)return;let a=r.querySelector(".root");if(a&&t>0){let i=gt(e.value,t,e.loop);i!==e.value&&(e.value=i),a.style.setProperty("--tc-carousel-index",String(i))}let n=r.querySelector(".indicators");if(n){let i=e.value,l="";for(let c=0;c<t;c++)l+=`<button type="button" class="dot" role="tab" data-index="${c}"
        aria-current="${c===i?"true":"false"}"
        aria-label="Go to slide ${c+1}"></button>`;n.innerHTML=l}if(Array.from(e.children).filter(i=>i instanceof HTMLElement&&!i.hasAttribute("slot")).forEach((i,l)=>{i.setAttribute("role","group"),i.setAttribute("aria-roledescription","slide"),i.setAttribute("aria-label",`${l+1} of ${t}`),e.transition==="fade"?i.classList.toggle("is-active",l===e.value):i.classList.remove("is-active")}),!e.loop){let i=r.querySelector(".ctrl.prev"),l=r.querySelector(".ctrl.next");i&&(i.disabled=e.value<=0),l&&(l.disabled=e.value>=t-1)}let s=r.querySelector(".sr-status");s&&t>0&&(s.textContent=`Slide ${e.value+1} of ${t}`)}function Rr(e){let t=0,r=0,a=!1,n=40,o=l=>{e.swipe&&(l.button!==0&&l.pointerType==="mouse"||(t=l.clientX,r=l.clientY,a=!0))},s=l=>{if(!a)return;a=!1;let c=l.clientX-t,d=l.clientY-r,g=e.orientation==="vertical"?d:c;Math.abs(g)<n||F(e,e.value+(g<0?1:-1))},i=()=>{a=!1};e.addEventListener("pointerdown",o),e.addEventListener("pointerup",s),e.addEventListener("pointercancel",i),e._carouselDrag=()=>{e.removeEventListener("pointerdown",o),e.removeEventListener("pointerup",s),e.removeEventListener("pointercancel",i)}}var Ir="tc-accordion";f(Ir,p({props:{mode:{type:"string",default:"single"},bordered:{type:"boolean",default:!0}},theme:{"tc-accordion-bg":"var(--tc-color-surface, #ffffff)","tc-accordion-ink":"var(--tc-color-ink, #14171f)","tc-accordion-ink-soft":"var(--tc-color-ink-soft, #4a5061)","tc-accordion-rule":"var(--tc-color-rule, #ece5d3)","tc-accordion-radius":"var(--tc-radius-md, 8px)","tc-accordion-accent":"var(--tc-color-accent, #a16939)","tc-accordion-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},template:({props:e})=>`
      <div class="root ${e.bordered?"bordered":""}">
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
    `,afterMount(){let e=this,t=o=>{let s=o.target;if(!(!s||s.tagName!=="DETAILS")){if(e.mode==="single"&&s.open)for(let i of Te(e))i!==s&&i.open&&(i.open=!1);Dr(e)}},r=o=>{let s=o.target;if(!s||s.tagName!=="SUMMARY")return;let i=Te(e).map(d=>d.querySelector("summary")).filter(d=>!!d),l=i.indexOf(s);if(l===-1)return;let c=-1;o.key==="ArrowDown"?c=(l+1)%i.length:o.key==="ArrowUp"?c=(l-1+i.length)%i.length:o.key==="Home"?c=0:o.key==="End"&&(c=i.length-1),c!==-1&&(o.preventDefault(),i[c]?.focus())};e.addEventListener("toggle",t,!0),e.addEventListener("keydown",r);let a=()=>{for(let o of Te(e)){let s=o.querySelector(":scope > summary");if(s&&!s.querySelector(".tc-accordion-caret")){let i=document.createElement("span");i.className="tc-accordion-caret",i.setAttribute("aria-hidden","true"),i.style.cssText="display:inline-block;flex:0 0 auto;transition:transform .2s ease;color:var(--tc-color-ink-muted,#6b7280);font-size:0.8rem;",i.textContent="\u25B8",s.appendChild(i);let l=()=>{i.style.transform=o.open?"rotate(90deg)":"rotate(0)"};l(),o.addEventListener("toggle",l)}}};a();let n=new MutationObserver(a);n.observe(e,{childList:!0,subtree:!1}),e._accordionCleanup=()=>{e.removeEventListener("toggle",t,!0),e.removeEventListener("keydown",r),n.disconnect()}},unmount(){this._accordionCleanup?.()}}));function Te(e){let t=[];for(let r of Array.from(e.children))r instanceof HTMLDetailsElement&&t.push(r);return t}function Dr(e){let t=[];for(let r of Te(e))if(r.open){let a=r.id||r.querySelector("summary")?.textContent?.trim()||"";t.push(a)}e.dispatchEvent(new CustomEvent("tc-change",{detail:{open:t},bubbles:!0,composed:!0}))}var qr="tc-tooltip";function jr(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}f(qr,p({props:{text:{type:"string",default:""},placement:{type:"string",default:"top"},delay:{type:"number",default:200},offset:{type:"number",default:8},disabled:{type:"boolean",default:!1}},theme:{"tc-tooltip-bg":"var(--tc-color-ink, #14171f)","tc-tooltip-fg":"var(--tc-color-surface, #ffffff)","tc-tooltip-radius":"var(--tc-radius-sm, 6px)","tc-tooltip-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-tooltip-shadow":"0 10px 30px rgba(0, 0, 0, 0.25)","tc-tooltip-padding":"6px 10px","tc-tooltip-max-width":"240px"},styles:{display:"inline-block",position:"relative"},template:({props:e})=>`
      <span class="trigger" tabindex="-1"><slot></slot></span>
      <div
        class="tip"
        popover="manual"
        role="tooltip"
        part="tip"
      >
        ${e.text?`<span class="tip-text">${jr(e.text)}</span>`:""}
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
    `,afterMount(){let e=this,t=e.shadowRoot;if(!t)return;let r=t.querySelector(".tip");if(!r)return;let a=()=>{e.disabled||(clearTimeout(e._tooltipTimer),e._tooltipTimer=globalThis.setTimeout(()=>{if(typeof r.showPopover=="function")try{r.showPopover()}catch{r.style.visibility="visible",r.style.opacity="1"}else r.style.visibility="visible",r.style.opacity="1";mt(e,r)},Math.max(0,e.delay)))},n=()=>{clearTimeout(e._tooltipTimer);try{typeof r.hidePopover=="function"&&r.hidePopover()}catch{}r.style.opacity="",r.style.visibility=""},o=i=>{i.key==="Escape"&&n()};e.addEventListener("pointerenter",a),e.addEventListener("pointerleave",n),e.addEventListener("focusin",a),e.addEventListener("focusout",n),e.addEventListener("keydown",o);let s=()=>{r.matches(":popover-open")&&mt(e,r)};globalThis.addEventListener("scroll",s,!0),globalThis.addEventListener("resize",s),e._tooltipCleanup=()=>{clearTimeout(e._tooltipTimer),e.removeEventListener("pointerenter",a),e.removeEventListener("pointerleave",n),e.removeEventListener("focusin",a),e.removeEventListener("focusout",n),e.removeEventListener("keydown",o),globalThis.removeEventListener("scroll",s,!0),globalThis.removeEventListener("resize",s),n()}},unmount(){this._tooltipCleanup?.()}}));function mt(e,t){let r=e.getBoundingClientRect();t.style.top="0px",t.style.left="0px";let a=t.getBoundingClientRect(),n=globalThis.innerWidth,o=globalThis.innerHeight,s=e.offset,i=e.placement||"top",l=u=>u==="top"?r.top-a.height-s>=4:u==="bottom"?r.bottom+a.height+s<=o-4:u==="left"?r.left-a.width-s>=4:u==="right"?r.right+a.width+s<=n-4:!0;if(!l(i)){let u={top:"bottom",bottom:"top",left:"right",right:"left"};l(u[i]??"top")&&(i=u[i])}let c=0,d=0;i==="top"?(c=r.top-a.height-s,d=r.left+r.width/2-a.width/2):i==="bottom"?(c=r.bottom+s,d=r.left+r.width/2-a.width/2):i==="left"?(c=r.top+r.height/2-a.height/2,d=r.left-a.width-s):i==="right"&&(c=r.top+r.height/2-a.height/2,d=r.right+s),c=Math.max(4,Math.min(o-a.height-4,c)),d=Math.max(4,Math.min(n-a.width-4,d)),t.style.top=`${c}px`,t.style.left=`${d}px`,t.dataset.placement=i}var Fr="tc-popover";f(Fr,p({props:{open:{type:"boolean",default:!1,reflect:!0},placement:{type:"string",default:"bottom"},offset:{type:"number",default:8},dismissible:{type:"boolean",default:!0}},theme:{"tc-popover-bg":"var(--tc-color-surface, #ffffff)","tc-popover-fg":"var(--tc-color-ink, #14171f)","tc-popover-rule":"var(--tc-color-rule, #ece5d3)","tc-popover-radius":"var(--tc-radius-md, 8px)","tc-popover-shadow":"var(--tc-shadow-lg, 0 24px 60px rgba(20, 23, 31, 0.18))","tc-popover-padding":"12px 14px","tc-popover-min-width":"200px","tc-popover-max-width":"340px","tc-popover-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"inline-block",position:"relative"},template:()=>`
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
    `,events:{"click .trigger-wrap":(e,t)=>{let r=t.host;r.open=!r.open}},afterRender(){bt(this)},afterMount(){let e=this,t=n=>{!e.open||!e.dismissible||n.composedPath().includes(e)||(e.open=!1,e.dispatchEvent(new CustomEvent("tc-close",{detail:{reason:"outside"},bubbles:!0,composed:!0})))},r=n=>{!e.open||!e.dismissible||n.key==="Escape"&&(e.open=!1,e.dispatchEvent(new CustomEvent("tc-close",{detail:{reason:"escape"},bubbles:!0,composed:!0})))},a=()=>{let n=e.shadowRoot?.querySelector(".panel");n?.matches(":popover-open")&&ht(e,n)};document.addEventListener("click",t,!0),document.addEventListener("keydown",r),globalThis.addEventListener("scroll",a,!0),globalThis.addEventListener("resize",a),e._popoverCleanup=()=>{document.removeEventListener("click",t,!0),document.removeEventListener("keydown",r),globalThis.removeEventListener("scroll",a,!0),globalThis.removeEventListener("resize",a)},bt(e)},unmount(){this._popoverCleanup?.()}}));function bt(e){let t=e.shadowRoot;if(!t)return;let r=t.querySelector(".panel");if(!r)return;let a=e.open,n=typeof r.showPopover=="function";if(a&&!r.matches(":popover-open")){if(n)try{r.showPopover()}catch{r.style.display="block"}else r.style.display="block";ht(e,r),e.dispatchEvent(new CustomEvent("tc-open",{bubbles:!0,composed:!0}))}else if(!a&&r.matches(":popover-open"))if(n)try{r.hidePopover()}catch{r.style.display="none"}else r.style.display="none"}function ht(e,t){let r=e.getBoundingClientRect();t.style.top="0px",t.style.left="0px";let a=t.getBoundingClientRect(),n=globalThis.innerWidth,o=globalThis.innerHeight,s=e.offset,i=e.placement||"bottom",l=u=>u==="top"?r.top-a.height-s>=4:u==="bottom"?r.bottom+a.height+s<=o-4:u==="left"?r.left-a.width-s>=4:u==="right"?r.right+a.width+s<=n-4:!0;if(!l(i)){let u={top:"bottom",bottom:"top",left:"right",right:"left"};l(u[i]??"bottom")&&(i=u[i])}let c=0,d=0;i==="top"?(c=r.top-a.height-s,d=r.left+r.width/2-a.width/2):i==="bottom"?(c=r.bottom+s,d=r.left+r.width/2-a.width/2):i==="left"?(c=r.top+r.height/2-a.height/2,d=r.left-a.width-s):i==="right"&&(c=r.top+r.height/2-a.height/2,d=r.right+s),c=Math.max(4,Math.min(o-a.height-4,c)),d=Math.max(4,Math.min(n-a.width-4,d)),t.style.top=`${c}px`,t.style.left=`${d}px`}var Or="tc-drawer";var re=new WeakMap;function De(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}f(Or,p({props:{open:{type:"boolean",default:!1,reflect:!0},side:{type:"string",default:"right"},size:{type:"string",default:"min(420px, 92vw)"},dismissible:{type:"boolean",default:!0},title:{type:"string",default:""}},theme:{"tc-drawer-bg":"var(--tc-color-surface, #ffffff)","tc-drawer-ink":"var(--tc-color-ink, #14171f)","tc-drawer-rule":"var(--tc-color-rule, #ece5d3)","tc-drawer-soft":"var(--tc-color-ink-soft, #5a6072)","tc-drawer-shadow":"var(--tc-shadow-lg, 0 24px 60px rgba(20, 23, 31, 0.25))","tc-drawer-backdrop":"rgba(20, 23, 31, 0.5)","tc-drawer-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-drawer-duration":"260ms"},styles:{display:"contents"},template:({props:e})=>{let t=String(e.side??"right"),r=De(e.size??"min(420px, 92vw)");return`
        <dialog
          class="dlg side-${De(t)}"
          aria-labelledby="${e.title?"title":""}"
          style="--tc-drawer-size: ${r};"
        >
          ${e.title||e.dismissible?`<header class="head">
                ${e.title?`<h2 id="title" class="title">${De(e.title)}</h2>`:"<span></span>"}
                ${e.dismissible?'<button class="x" type="button" aria-label="Close">\xD7</button>':""}
              </header>`:""}
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
      `},refs:{dialog:".dlg"},events:{"click .x":(e,t)=>{vt(t.host,"button")},"click .dlg":(e,t)=>{let r=t.host;if(!r.dismissible)return;let a=t.refs.dialog;a&&e.target===a&&vt(r,"backdrop")}},afterRender(){_r(this)},unmount(){let e=re.get(this);e&&(e.cleanup(),re.delete(this))}}));function _r(e){let t=e.shadowRoot;if(!t)return;let r=t.querySelector(".dlg");if(!r)return;let a=e.open,n=re.get(e);if(n&&n.dialog!==r&&(n.cleanup(),re.delete(e)),a&&!r.open){if(typeof r.showModal=="function")try{r.showModal()}catch{r.setAttribute("open","")}else r.setAttribute("open","");if(!re.has(e)){let o=()=>{let s=e;s.open&&(s.open=!1,e.dispatchEvent(new CustomEvent("tc-close",{detail:{reason:"escape"},bubbles:!0,composed:!0})))};r.addEventListener("close",o),re.set(e,{dialog:r,cleanup:()=>r.removeEventListener("close",o)})}}else if(!a&&r.open)try{r.close()}catch{r.removeAttribute("open")}}function vt(e,t){e.open&&(e.open=!1,e.dispatchEvent(new CustomEvent("tc-close",{detail:{reason:t},bubbles:!0,composed:!0})))}var Br="tc-progress";function ae(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Pr(e,t){return!Number.isFinite(e)||!Number.isFinite(t)||t<=0?0:Math.max(0,Math.min(100,e/t*100))}f(Br,p({props:{value:{type:"number",default:0},max:{type:"number",default:100},variant:{type:"string",default:"linear"},size:{type:"string",default:"md"},indeterminate:{type:"boolean",default:!1},showLabel:{type:"boolean",default:!1},label:{type:"string",default:""}},theme:{"tc-progress-track":"var(--tc-color-rule, #ece5d3)","tc-progress-fill":"var(--tc-color-accent, #a16939)","tc-progress-radius":"999px","tc-progress-fg":"var(--tc-color-ink, #14171f)","tc-progress-font":"var(--tc-font-mono, 'JetBrains Mono', monospace)"},styles:{display:"inline-block"},template:({props:e})=>{let t=String(e.variant??"linear"),r=String(e.size??"md"),a=!!e.indeterminate,n=Number(e.value??0),o=Number(e.max??100),s=Pr(n,o),i=e.label||(a?"Loading\u2026":`${Math.round(s)}%`);if(t==="circular"){let d=r==="sm"?28:r==="lg"?72:48,u=r==="sm"?3:r==="lg"?6:4,g=(d-u)/2,m=2*Math.PI*g,b=a?m*.25:s/100*m,v=a?`role="progressbar" aria-valuetext="${ae(i)}"`:`role="progressbar" aria-valuenow="${n}" aria-valuemin="0" aria-valuemax="${o}"`;return`
          <div class="circ size-${ae(r)} ${a?"indet":""}" ${v}>
            <svg viewBox="0 0 ${d} ${d}" width="${d}" height="${d}" aria-hidden="true">
              <circle class="track" cx="${d/2}" cy="${d/2}" r="${g}" stroke-width="${u}" fill="none" />
              <circle
                class="fill"
                cx="${d/2}" cy="${d/2}" r="${g}"
                stroke-width="${u}" fill="none"
                stroke-dasharray="${b.toFixed(3)} ${(m-b).toFixed(3)}"
                stroke-dashoffset="${(m/4).toFixed(3)}"
                stroke-linecap="round"
              />
            </svg>
            ${e.showLabel?`<span class="label" aria-hidden="true">${ae(i)}</span>`:""}
          </div>
          <style>
            :host { display: inline-block; vertical-align: middle; }
            .circ { position: relative; display: inline-grid; place-items: center; }
            .label {
              position: absolute;
              font-family: var(--tc-progress-font);
              font-size: ${r==="sm"?"0.55rem":r==="lg"?"0.92rem":"0.74rem"};
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
        `}let l=r==="sm"?4:r==="lg"?12:8,c=a?`role="progressbar" aria-valuetext="${ae(i)}"`:`role="progressbar" aria-valuenow="${n}" aria-valuemin="0" aria-valuemax="${o}"`;return`
        <div class="bar size-${ae(r)} ${a?"indet":""}" ${c}>
          <div class="track">
            <div class="fill" style="width: ${s.toFixed(2)}%"></div>
          </div>
          ${e.showLabel?`<span class="label" aria-hidden="true">${ae(i)}</span>`:""}
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
            height: ${l}px;
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
            font-size: ${r==="sm"?"0.68rem":r==="lg"?"0.92rem":"0.78rem"};
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
      `}}));var Vr="tc-stepper";function yt(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}f(Vr,p({props:{steps:{type:"json",default:[]},active:{type:"number",default:0,reflect:!0},orientation:{type:"string",default:"horizontal"},clickable:{type:"boolean",default:!1}},theme:{"tc-stepper-bg":"transparent","tc-stepper-ink":"var(--tc-color-ink, #14171f)","tc-stepper-soft":"var(--tc-color-ink-soft, #4a5061)","tc-stepper-rule":"var(--tc-color-rule, #ece5d3)","tc-stepper-accent":"var(--tc-color-accent, #a16939)","tc-stepper-done":"var(--tc-color-success, #2f7a52)","tc-stepper-radius":"999px","tc-stepper-marker-size":"28px","tc-stepper-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},template:({props:e})=>{let t=e.steps??[],r=Number(e.active??0),a=String(e.orientation)==="vertical",n=!!e.clickable,o=t.map((s,i)=>{let l=i<r?"done":i===r?"current":"upcoming",c=l==="done"?'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>':`${i+1}`;return`
          <li class="step state-${l}" data-index="${i}">
            <${n?"button":"div"} class="row" ${n?`type="button" aria-current="${l==="current"?"step":"false"}"`:`aria-current="${l==="current"?"step":"false"}"`}>
              <span class="marker" aria-hidden="true">${c}</span>
              <span class="text">
                <span class="title">${yt(s.title)}</span>
                ${s.description?`<span class="desc">${yt(s.description)}</span>`:""}
              </span>
            </${n?"button":"div"}>
            ${i<t.length-1?`<span class="line ${i<r?"done":""}" aria-hidden="true"></span>`:""}
          </li>
        `}).join("");return`
        <ol class="root ${a?"v":"h"} ${n?"clickable":""}" aria-label="Progress">
          ${o}
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
            cursor: ${n?"pointer":"default"};
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
      `},events:{"click .row":(e,t)=>{let r=t.host;if(!r.clickable)return;let a=e.target.closest(".step");if(!a)return;let n=Number(a.dataset.index);if(!Number.isFinite(n)||n===r.active)return;let o=r.active;r.active=n,t.emit("tc-step-change",{active:n,previous:o})}}}));var Gr="tc-avatar";function O(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function xt(e){let t=e.trim().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].slice(0,2).toUpperCase():(t[0][0]+t[t.length-1][0]).toUpperCase()}var qe=[["#dde6f4","#1f3a66"],["#dbece2","#155b40"],["#efe2cf","#8a572d"],["#f4dad7","#7a1a14"],["#e3dcf1","#3d2a73"],["#d5e8e5","#0d4f49"],["#fbe3c5","#7a4f0a"]];function Kr(e){if(!e)return qe[0];let t=0;for(let a=0;a<e.length;a++)t=t*31+e.charCodeAt(a)|0;let r=Math.abs(t)%qe.length;return qe[r]}f(Gr,p({props:{src:{type:"string",default:""},alt:{type:"string",default:""},name:{type:"string",default:""},size:{type:"string",default:"md"},shape:{type:"string",default:"circle"},status:{type:"string",default:""},ring:{type:"boolean",default:!1}},theme:{"tc-avatar-bg":"var(--tc-color-rule, #ece5d3)","tc-avatar-fg":"var(--tc-color-ink, #14171f)","tc-avatar-ring":"var(--tc-color-surface, #ffffff)","tc-avatar-status-online":"#2f7a52","tc-avatar-status-away":"#d7a52f","tc-avatar-status-busy":"#b3261e","tc-avatar-status-offline":"#9aa0a6","tc-avatar-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"inline-block",position:"relative","vertical-align":"middle"},template:({props:e})=>{let t=String(e.name??""),r=String(e.src??""),a=String(e.alt??"")||t||"avatar",n=String(e.size??"md"),o=String(e.shape??"circle"),s=String(e.status??""),i=!!e.ring,[l,c]=Kr(t);return`
        <span class="root size-${O(n)} shape-${O(o)} ${i?"ringed":""}"
              style="--tc-avatar-tint-bg: ${l}; --tc-avatar-tint-fg: ${c};">
          ${r?`<img src="${O(r)}" alt="${O(a)}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'fallback',textContent:'${O(xt(t))}'}))">`:`<span class="fallback" aria-label="${O(a)}">${O(xt(t))}</span>`}
          ${s?`<span class="status status-${O(s)}" aria-label="${O(s)}"></span>`:""}
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
      `}}));var Ur="tc-avatar-group";f(Ur,p({props:{max:{type:"number",default:4},spacing:{type:"string",default:"normal"},size:{type:"string",default:"md"}},theme:{"tc-avatar-group-ring":"var(--tc-color-surface, #ffffff)","tc-avatar-group-overflow-bg":"var(--tc-color-rule, #ece5d3)","tc-avatar-group-overflow-fg":"var(--tc-color-ink, #14171f)"},styles:{display:"inline-flex"},template:()=>`
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
    `,afterMount(){let e=this,t=()=>wt(e);t();let r=new MutationObserver(t);r.observe(e,{childList:!0}),e._agroupCleanup=()=>r.disconnect()},afterRender(){wt(this)},unmount(){this._agroupCleanup?.()}}));function wt(e){let t=Math.max(0,Number(e.max??4)),r=String(e.size??"md"),a=Array.from(e.children).filter(l=>l instanceof HTMLElement),n=0;for(let l of a)l.tagName.toLowerCase()==="tc-avatar"&&(l.getAttribute("size")||l.setAttribute("size",r),n<t||t===0?(l.hidden=!1,n++):l.hidden=!0);let o=a.filter(l=>l.tagName.toLowerCase()==="tc-avatar").length,s=Math.max(0,o-n),i=e.shadowRoot?.querySelector(".overflow");i&&(s>0?(i.hidden=!1,i.textContent=`+${s}`):i.hidden=!0)}var Yr="tc-rating";function kt(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var $t="M12 17.27 18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z";f(Yr,p({props:{value:{type:"number",default:0,reflect:!0},max:{type:"number",default:5},readonly:{type:"boolean",default:!1,reflect:!0},allowHalf:{type:"boolean",default:!1},size:{type:"string",default:"md"},ariaLabel:{type:"string",default:"Rating"}},theme:{"tc-rating-fill":"var(--tc-color-warning, #d7a52f)","tc-rating-track":"var(--tc-color-rule, #ece5d3)"},styles:{display:"inline-block"},template:({props:e,state:t})=>{let r=Math.max(1,Number(e.max??5)),a=Number(e.value??0),n=Number(t.hover??-1),o=n>=0?n:a,s=String(e.size??"md"),i=!!e.readonly,l=!!e.allowHalf,c=kt(e.ariaLabel??"Rating"),d=s==="sm"?18:s==="lg"?32:24,u=[];for(let g=1;g<=r;g++){let m=o-(g-1),b=m>=1?100:m>=.5&&l?50:m>0&&!l?100:0,v=b===50;u.push(`
          <span class="star ${v?"half":b===100?"full":"empty"}" data-index="${g}">
            <svg viewBox="0 0 24 24" width="${d}" height="${d}" aria-hidden="true">
              <path class="track" d="${$t}" fill="var(--tc-rating-track)" />
              ${b>0?`<path class="fill" d="${$t}" fill="var(--tc-rating-fill)" clip-path="${v?"inset(0 50% 0 0)":"none"}" />`:""}
            </svg>
            ${l&&!i?`<span class="hit-left" data-index="${g}" data-half="1"></span>
                 <span class="hit-right" data-index="${g}" data-half="0"></span>`:""}
          </span>
        `)}return`
        <div
          class="root size-${kt(s)} ${i?"readonly":""}"
          role="${i?"img":"slider"}"
          tabindex="${i?"-1":"0"}"
          aria-label="${c}"
          aria-valuenow="${a}"
          aria-valuemin="0"
          aria-valuemax="${r}"
          aria-valuetext="${a} of ${r}"
        >
          ${u.join("")}
        </div>
        <style>
          :host { display: inline-block; }
          .root {
            display: inline-flex;
            gap: 2px;
            align-items: center;
            cursor: ${i?"default":"pointer"};
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
      `},events:{"click .star":(e,t)=>{let r=t.host;if(r.readonly)return;let a=e.target,n=a.closest(".hit-left, .hit-right"),o=a.closest(".star");if(!o)return;let s=Number(o.dataset.index);if(!Number.isFinite(s))return;let i=s;n?.dataset.half==="1"&&r.allowHalf&&(i=s-.5),i===r.value&&(i=0);let l=r.value;r.value=i,t.emit("tc-change",{value:i,previous:l})},"mouseover .star":(e,t)=>{let r=t.host;if(r.readonly)return;let a=e.target,n=a.closest(".hit-left, .hit-right"),o=a.closest(".star");if(!o)return;let s=Number(o.dataset.index);if(!Number.isFinite(s))return;let i=s;n?.dataset.half==="1"&&r.allowHalf&&(i=s-.5),t.setState("hover",i)},"mouseleave .root":(e,t)=>{t.setState("hover",-1)},"keydown .root":(e,t)=>{let r=e,a=t.host;if(a.readonly)return;let n=a.allowHalf?.5:1,o=a.value,s=o;if(r.key==="ArrowRight"||r.key==="ArrowUp")s=Math.min(a.max,o+n);else if(r.key==="ArrowLeft"||r.key==="ArrowDown")s=Math.max(0,o-n);else if(r.key==="Home")s=0;else if(r.key==="End")s=a.max;else return;r.preventDefault(),s!==o&&(a.value=s,t.emit("tc-change",{value:s,previous:o}))}}}));var Wr="tc-slider";function Me(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}f(Wr,p({props:{value:{type:"number",default:0,reflect:!0},min:{type:"number",default:0},max:{type:"number",default:100},step:{type:"number",default:1},disabled:{type:"boolean",default:!1,reflect:!0},showValue:{type:"boolean",default:!1},showTicks:{type:"boolean",default:!1},label:{type:"string",default:""},suffix:{type:"string",default:""}},theme:{"tc-slider-track":"var(--tc-color-rule, #ece5d3)","tc-slider-fill":"var(--tc-color-accent, #a16939)","tc-slider-thumb":"var(--tc-color-surface, #ffffff)","tc-slider-thumb-ring":"var(--tc-color-accent, #a16939)","tc-slider-radius":"999px","tc-slider-thumb-size":"20px","tc-slider-track-size":"6px","tc-slider-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-slider-fg":"var(--tc-color-ink, #14171f)","tc-slider-fg-muted":"var(--tc-color-ink-muted, #6b7280)"},styles:{display:"block"},template:({props:e})=>{let t=Number(e.value??0),r=Number(e.min??0),a=Number(e.max??100),n=Number(e.step??1),o=!!e.disabled,s=a>r?(t-r)/(a-r)*100:0,i=String(e.label??""),l=String(e.suffix??""),c=!!e.showValue,d=!!e.showTicks,u="";if(d&&n>0){let g=Math.floor((a-r)/n)+1;if(g<=50){let m=[];for(let b=0;b<g;b++){let S=(r+b*n-r)/(a-r)*100;m.push(`<span class="tick" style="left:${S.toFixed(2)}%"></span>`)}u=m.join("")}}return`
        ${i||c?`<div class="head">
              ${i?`<label for="r" class="lbl">${Me(i)}</label>`:"<span></span>"}
              ${c?`<span class="val">${Me(String(t))}${Me(l)}</span>`:""}
            </div>`:""}
        <div class="rail" style="--tc-slider-pct: ${s.toFixed(2)}%;">
          <div class="track-bg"></div>
          <div class="track-fill"></div>
          ${u}
          <input
            id="r"
            class="range"
            type="range"
            min="${r}"
            max="${a}"
            step="${n}"
            value="${t}"
            ${o?"disabled":""}
            aria-valuetext="${Me(String(t)+l)}"
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
      `},refs:{range:".range"},events:{"input .range":(e,t)=>{let r=e.target,a=t.host,n=Number(r.value);a.value!==n&&(a.value=n,t.emit("tc-input",{value:n}))},"change .range":(e,t)=>{let r=e.target,a=t.host,n=Number(r.value);t.emit("tc-change",{value:n,previous:a.value})}}}));var Xr="tc-chart";function St(e,t){if(e<=0)return 1;let r=Math.floor(Math.log10(e)),a=e/Math.pow(10,r),n;return t?a<1.5?n=1:a<3?n=2:a<7?n=5:n=10:a<=1?n=1:a<=2?n=2:a<=5?n=5:n=10,n*Math.pow(10,r)}function Jr(e,t,r=5){if(e===t){let l=Math.abs(e)||1;return{min:e-l,max:t+l,ticks:[e-l,e,e+l]}}let a=St(t-e,!1),n=St(a/(r-1),!0),o=Math.floor(e/n)*n,s=Math.ceil(t/n)*n,i=[];for(let l=o;l<=s+n*.5;l+=n)i.push(Number(l.toFixed(10)));return{min:o,max:s,ticks:i}}function je(e,t){if(e.length===0)return"";if(e.length===1||!t)return"M "+e.map(a=>`${a.x} ${a.y}`).join(" L ");let r=`M ${e[0].x} ${e[0].y}`;for(let a=0;a<e.length-1;a++){let n=e[a-1]??e[a],o=e[a],s=e[a+1],i=e[a+2]??s,l=o.x+(s.x-n.x)/6,c=o.y+(s.y-n.y)/6,d=s.x-(i.x-o.x)/6,u=s.y-(i.y-o.y)/6;r+=` C ${l},${c} ${d},${u} ${s.x},${s.y}`}return r}function fe(e,t,r,a){return{x:e+r*Math.sin(a),y:t-r*Math.cos(a)}}function Zr(e,t,r,a,n,o){let s=o-n>Math.PI?1:0,i=fe(e,t,r,n),l=fe(e,t,r,o);if(a<=0)return`M ${e} ${t} L ${i.x} ${i.y} A ${r} ${r} 0 ${s} 1 ${l.x} ${l.y} Z`;let c=fe(e,t,a,o),d=fe(e,t,a,n);return`M ${i.x} ${i.y} A ${r} ${r} 0 ${s} 1 ${l.x} ${l.y} L ${c.x} ${c.y} A ${a} ${a} 0 ${s} 0 ${d.x} ${d.y} Z`}function $(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function K(e){if(!Number.isFinite(e))return"";let t=Math.abs(e);return t>=1e6?(e/1e6).toFixed(1).replace(/\.0$/,"")+"M":t>=1e3?(e/1e3).toFixed(1).replace(/\.0$/,"")+"K":t>0&&t<1?e.toFixed(2):String(Math.round(e*100)/100)}function ge(e,t){return t[e%t.length]}function Qr(e,t){let{data:r,smooth:a,stacked:n,showAxes:o,showGrid:s,showLabels:i,showValues:l}=e,c=r.labels??[],d=r.series??[],u=t==="sparkline",g=u?4:16,m=u?4:o&&i?28:8,b=u?4:o?44:8,v=u?4:12,S=e.W-b-v,k=e.H-g-m,x=1/0,M=-1/0;if(n&&d.length>0){let w=c.length>0?c.map((h,T)=>d.reduce((L,I)=>L+(I.values?.[T]??0),0)):[];for(let h of w)h<x&&(x=h),h>M&&(M=h);x>0&&(x=0)}else for(let w of d)for(let h of w.values??[])h<x&&(x=h),h>M&&(M=h);(!Number.isFinite(x)||!Number.isFinite(M))&&(x=0,M=1),x===M&&(x-=1,M+=1);let R=Jr(e.yMin??x,e.yMax??M,5),A=e.yMin??R.min,U=e.yMax??R.max,ze=U-A||1,y=c.length||d[0]?.values?.length||0,j=w=>y===1?b+S/2:t==="bar"?b+(w+.5)*(S/y):b+w/(y-1)*S,z=w=>g+k-(w-A)/ze*k,Y=[];if(!u){if(s)for(let w of R.ticks){let h=z(w);Y.push(`<line class="grid" x1="${b}" x2="${e.W-v}" y1="${h}" y2="${h}"/>`)}if(o){for(let h of R.ticks){let T=z(h);Y.push(`<text class="axis-label y" x="${b-8}" y="${T}" text-anchor="end" dominant-baseline="middle">${$(K(h))}</text>`)}if(i&&c.length>0){let h=Math.max(1,Math.ceil(c.length/8));c.forEach((T,L)=>{L%h!==0&&L!==c.length-1||Y.push(`<text class="axis-label x" x="${j(L)}" y="${e.H-m+16}" text-anchor="middle">${$(T)}</text>`)})}let w=A<=0&&U>=0?z(0):z(A);Y.push(`<line class="axis" x1="${b}" x2="${e.W-v}" y1="${w}" y2="${w}"/>`)}}let q=[];if(t==="bar"){let w=S/y,h=w*.18,T=w-h*2;d.forEach((L,I)=>{let C=`series series-${I}`,D=ge(I,e.palette),E=0;L.values?.forEach((N,_)=>{if(!Number.isFinite(N))return;let oe=j(_),be,he,ve,Ce;if(n){be=oe-T/2,he=T;let se=z(E+N),ie=z(E);ve=Math.min(se,ie),Ce=Math.abs(se-ie),E+=N}else{let se=T/d.length;be=oe-T/2+I*se,he=se*.86;let ie=z(N),Be=z(A<0&&U>0?0:A);ve=Math.min(ie,Be),Ce=Math.abs(ie-Be)}let _e=`${$(L.name)}${c[_]?` \xB7 ${$(c[_])}`:""}: ${$(K(N))}`;q.push(`<g class="${C}"><rect class="hit" x="${be}" y="${ve}" width="${he}" height="${Ce}" rx="2" fill="${D}" data-tip="${_e}" data-color="${D}"><title>${_e}</title></rect>`+(l?`<text class="value-label" x="${be+he/2}" y="${ve-4}" text-anchor="middle">${$(K(N))}</text>`:"")+"</g>")})})}else if(n&&t==="area"){let w=new Array(y).fill(0);d.forEach((h,T)=>{let L=ge(T,e.palette),I=[],C=[];for(let E=0;E<y;E++){let N=h.values?.[E]??0,_=w[E]+N;I.push({x:j(E),y:z(_)}),C.push({x:j(E),y:z(w[E])}),w[E]=_}let D=je(I,a)+" L "+C.slice().reverse().map(E=>`${E.x} ${E.y}`).join(" L ")+" Z";q.push(`<path class="series-fill series-${T}" d="${D}" fill="${L}" fill-opacity="0.25" pointer-events="none"/>`),q.push(`<path class="series-line series-${T}" d="${je(I,a)}" stroke="${L}" fill="none" pointer-events="none"/>`),I.forEach((E,N)=>{let _=h.values?.[N]??0,oe=`${$(h.name)}${c[N]?` \xB7 ${$(c[N])}`:""}: ${$(K(_))}`;q.push(`<circle class="hit series-${T}" cx="${E.x}" cy="${E.y}" r="12" fill="transparent" data-tip="${oe}" data-color="${L}"><title>${oe}</title></circle>`)})})}else d.forEach((w,h)=>{let T=ge(h,e.palette),L=(w.values??[]).map((C,D)=>({x:j(D),y:z(C)})),I=je(L,a);if(t==="area"){let C=z(A<0&&U>0?0:A),D=I+` L ${L[L.length-1].x} ${C} L ${L[0].x} ${C} Z`;q.push(`<path class="series-fill series-${h}" d="${D}" fill="${T}" fill-opacity="0.25"/>`)}q.push(`<path class="series-line series-${h}" d="${I}" stroke="${T}" fill="none"/>`),u||L.forEach((C,D)=>{let E=w.values?.[D],N=`${$(w.name)}${c[D]?` \xB7 ${$(c[D])}`:""}: ${$(K(E??0))}`;q.push(`<circle class="series-point series-${h}" cx="${C.x}" cy="${C.y}" r="3.5" fill="${T}" pointer-events="none"/>`),q.push(`<circle class="hit series-${h}" cx="${C.x}" cy="${C.y}" r="12" fill="transparent" data-tip="${N}" data-color="${T}"><title>${N}</title></circle>`),l&&q.push(`<text class="value-label" x="${C.x}" y="${C.y-8}" text-anchor="middle" pointer-events="none">${$(K(E??0))}</text>`)})});return Y.join("")+q.join("")}function ea(e){let t=e.data.series??[],r=t.reduce((c,d)=>c+(d.value??0),0);if(r<=0)return"";let a=e.W/2,n=e.H/2,o=Math.min(e.W,e.H)/2-4,s=Math.max(0,Math.min(.9,e.innerRadius))*o,i=0,l=[];return t.forEach((c,d)=>{let u=c.value??0;if(u<=0)return;let g=u/r*Math.PI*2,m=i,b=i+g,v=Zr(a,n,o,s,m,b-.01),S=ge(d,e.palette),k=(u/r*100).toFixed(1).replace(/\.0$/,""),x=`${$(c.name)}: ${$(K(u))} (${k}%)`;if(l.push(`<path class="series-segment hit series-${d}" d="${v}" fill="${S}" data-tip="${x}" data-color="${S}"><title>${x}</title></path>`),e.showValues){let M=(m+b)/2,R=(o+s)/2,A=fe(a,n,R,M);l.push(`<text class="value-label donut" x="${A.x}" y="${A.y}" text-anchor="middle" dominant-baseline="middle">${$(k)}%</text>`)}i=b}),l.join("")}function ta(e,t){return e.length===0?"":'<div class="legend" part="legend">'+e.map((r,a)=>`<span class="legend-item"><span class="swatch" style="background:${ge(a,t)}"></span>${$(r.name)}</span>`).join("")+"</div>"}function ra(e,t){if(e==="donut"){let n=(t.series??[]).reduce((s,i)=>s+(i.value??0),0);return`Donut chart: ${(t.series??[]).filter(s=>(s.value??0)>0).map(s=>{let i=n>0?(s.value??0)/n*100:0;return`${s.name} ${i.toFixed(1).replace(/\.0$/,"")}%`}).join(", ")}.`}let r=(t.series??[]).map(n=>n.name).join(", "),a=t.labels?.length??t.series[0]?.values?.length??0;return`${e.charAt(0).toUpperCase()}${e.slice(1)} chart with ${(t.series??[]).length} series (${r}) and ${a} data point${a===1?"":"s"}.`}var aa=["var(--tc-chart-color-1, var(--tc-color-accent, #a16939))","var(--tc-chart-color-2, var(--tc-color-info, #3a5b8c))","var(--tc-chart-color-3, var(--tc-color-success, #2f7a52))","var(--tc-chart-color-4, var(--tc-color-warning, #d7a52f))","var(--tc-chart-color-5, var(--tc-color-danger, #b3261e))","var(--tc-chart-color-6, #6f4e7c)","var(--tc-chart-color-7, #0b6e6e)","var(--tc-chart-color-8, #b0566c)"],na=`
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
`;f(Xr,p({props:{type:{type:"string",default:"line"},data:{type:"json",default:{series:[]}},height:{type:"string",default:"240px"},smooth:{type:"boolean",default:!0},stacked:{type:"boolean",default:!1},showLegend:{type:"boolean",default:!0},showAxes:{type:"boolean",default:!0},showGrid:{type:"boolean",default:!0},showLabels:{type:"boolean",default:!0},showValues:{type:"boolean",default:!1},innerRadius:{type:"number",default:.6},yMin:{type:"json",default:null},yMax:{type:"json",default:null},ariaLabel:{type:"string",default:"Chart"},colors:{type:"json",default:null},src:{type:"string",default:""},srcKey:{type:"string",default:""},loadingText:{type:"string",default:"Loading chart\u2026"},errorText:{type:"string",default:"Couldn't load chart data"}},theme:{"tc-chart-bg":"transparent","tc-chart-fg":"var(--tc-color-ink, #14171f)","tc-chart-axis":"var(--tc-color-rule-strong, #d9cfb8)","tc-chart-grid":"var(--tc-color-rule, #ece5d3)","tc-chart-label":"var(--tc-color-ink-muted, #6b7280)","tc-chart-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},template:({props:e,state:t})=>{let r=String(e.type??"line").toLowerCase(),a=["line","area","bar","sparkline","donut"].includes(r)?r:"line",n=e.data,o=t.fetched,s=!!n&&Array.isArray(n.series)&&n.series.length>0,i=s?n:o??{series:[]},l=String(e.src??""),c=!!t.loading&&!s&&!o,d=l&&t.error?String(t.error):"",u=c?`<div class="overlay loading">${$(String(e.loadingText??"Loading chart\u2026"))}</div>`:d?`<div class="overlay error" role="alert">${$(String(e.errorText??"Couldn't load chart data"))}<small>${$(d)}</small></div>`:"",g=a==="sparkline",m=a==="donut",b=e.colors,v=Array.isArray(b)&&b.length>0?b:aa,S=m?320:800,k=m?320:400,x={data:i,smooth:!!e.smooth,stacked:!!e.stacked,showAxes:!!e.showAxes,showGrid:!!e.showGrid,showLabels:!!e.showLabels,showValues:!!e.showValues,innerRadius:Number(e.innerRadius??.6),yMin:e.yMin==null?null:Number(e.yMin),yMax:e.yMax==null?null:Number(e.yMax),palette:v,W:S,H:k},M=m?ea(x):Qr(x,a),R=ra(a,i),A=$(String(e.height??"240px"));return`
        <div class="root" role="img" aria-label="${$(e.ariaLabel??"Chart")}">
          <div class="canvas" style="height:${A};">
            <svg
              viewBox="0 0 ${S} ${k}"
              preserveAspectRatio="${m?"xMidYMid meet":"none"}"
              aria-hidden="true"
            >${M}</svg>
            <div class="tip" role="tooltip">
              <span class="tip-swatch"></span><span class="tip-text"></span>
            </div>
            ${u}
          </div>
          ${e.showLegend&&!g&&i.series&&i.series.length>0?ta(i.series,v):""}
          <span class="visually-hidden" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;">${$(R)}</span>
        </div>
        ${na}
      `},afterMount(){Et(this),Tt(this)},afterRender(){Et(this),Tt(this)},unmount(){let e=this;e._chartHoverCleanup?.(),e._chartFetchAborter?.abort()}}));function Et(e){let t=e;t._chartHoverCleanup?.();let r=t.shadowRoot;if(!r)return;let a=r.querySelector(".canvas"),n=r.querySelector(".tip"),o=n?.querySelector(".tip-text"),s=n?.querySelector(".tip-swatch");if(!a||!n||!o||!s)return;let i=()=>{n.removeAttribute("data-open"),n.style.transform="translate(-9999px, -9999px)"},l=d=>{let u=d.target?.closest?.("[data-tip]");if(!u){i();return}let g=u.getAttribute("data-tip")||"",m=u.getAttribute("data-color")||"currentColor";o.textContent=g,s.style.background=m;let b=a.getBoundingClientRect(),v=n.offsetWidth||100,S=n.offsetHeight||24,k=d.clientX-b.left,x=d.clientY-b.top,M=k+12,R=x-S-8;M+v>b.width-4&&(M=k-v-12),R<4&&(R=x+16),n.style.transform=`translate(${M}px, ${R}px)`,n.setAttribute("data-open","1")},c=()=>i();a.addEventListener("pointermove",l),a.addEventListener("pointerleave",c),t._chartHoverCleanup=()=>{a.removeEventListener("pointermove",l),a.removeEventListener("pointerleave",c),i()}}function Tt(e){let t=e,r=String(t.src??"").trim();if(!r||!t.getState||!t.setState||t.getState("fetchedFrom")===r)return;t._chartFetchAborter?.abort();let n=new AbortController;t._chartFetchAborter=n,t.setState("fetchedFrom",r),t.setState("fetched",null),t.setState("error",null),t.setState("loading",!0);let o=String(t.srcKey??"").trim();fetch(r,{signal:n.signal}).then(s=>{if(!s.ok)throw new Error(`${s.status} ${s.statusText}`);return s.json()}).then(s=>{let i=o?oa(s,o):s;if(!i||typeof i!="object"||!Array.isArray(i.series))throw new Error(o?`Payload at "${o}" doesn't look like ChartData`:"Payload doesn't look like ChartData");n.signal.aborted||(t.setState("fetched",i),t.setState("loading",!1))}).catch(s=>{n.signal.aborted||(t.setState("loading",!1),t.setState("error",s instanceof Error?s.message:String(s)))})}function oa(e,t){return t.split(".").reduce((r,a)=>r&&typeof r=="object"?r[a]:void 0,e)}var Fe={"alert-circle":'<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',"alert-triangle":'<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',info:'<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',check:'<polyline points="20 6 9 17 4 12"/>',"check-circle":'<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',x:'<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',"x-circle":'<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>',"arrow-right":'<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',"arrow-left":'<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',"arrow-up":'<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>',"arrow-down":'<line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>',"chevron-right":'<polyline points="9 18 15 12 9 6"/>',"chevron-left":'<polyline points="15 18 9 12 15 6"/>',"chevron-up":'<polyline points="18 15 12 9 6 15"/>',"chevron-down":'<polyline points="6 9 12 15 18 9"/>',"external-link":'<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',plus:'<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',minus:'<line x1="5" y1="12" x2="19" y2="12"/>',search:'<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',filter:'<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',"more-horizontal":'<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',"more-vertical":'<circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>',settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>',edit:'<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="m18.5 2.5 a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z"/>',trash:'<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',copy:'<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',save:'<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>',download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',user:'<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',users:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',mail:'<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/>',calendar:'<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',clock:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',home:'<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',menu:'<line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>',"log-out":'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',"log-in":'<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>',moon:'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',sun:'<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',eye:'<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',"eye-off":'<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>',loader:'<line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>',refresh:'<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>'},sa=Object.freeze(Object.keys(Fe));var ia="tc-icon";f(ia,p({props:{name:{type:"string",default:""},size:{type:"string",default:"1em"},stroke:{type:"string",default:"currentColor"},fill:{type:"string",default:"none"},title:{type:"string",default:""}},styles:{display:"inline-flex","align-items":"center","justify-content":"center","vertical-align":"middle","line-height":"1"},template:({props:e})=>{let t=String(e.name??""),r=Fe[t],a=String(e.size??"1em"),n=String(e.stroke??"currentColor"),o=String(e.fill??"none"),s=String(e.title??"");if(!r)return`
          <svg width="${B(a)}" height="${B(a)}" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="1.5"
               stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <text x="12" y="14.5" text-anchor="middle" font-size="6" font-family="monospace" stroke="none" fill="currentColor">?</text>
          </svg>
        `;let i=s?`role="img" aria-label="${B(s)}"`:'aria-hidden="true"';return`
        <svg
          width="${B(a)}"
          height="${B(a)}"
          viewBox="0 0 24 24"
          fill="${B(o)}"
          stroke="${B(n)}"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          ${i}
        >${s?`<title>${B(s)}</title>`:""}${r}</svg>
      `}}));function B(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var la="site-nav";f(la,p({props:{active:{type:"string",default:""},version:{type:"string",default:"v1.1.0"},base:{type:"string",default:""}},styles:{display:"block"},template:({props:e})=>{let t=String(e.base??""),r=[{id:"docs",label:"Docs",href:`${t}docs.html`,hideOnSmall:!0},{id:"components",label:"Components",href:`${t}components.html`},{id:"icons",label:"Icons",href:`${t}icons.html`,hideOnSmall:!0},{id:"themes",label:"Themes",href:`${t}themes.html`,hideOnSmall:!0},{id:"examples",label:"Examples",href:`${t}examples.html`,hideOnSmall:!0},{id:"playground",label:"Playground",href:`${t}playground.html`,hideOnSmall:!0},{id:"blog",label:"Blog",href:`${t}blog/`,hideOnSmall:!0},{id:"github",label:"GitHub",href:"https://github.com/ra9/tan-compose",external:!0}],a=String(e.active??"");return`
        <header class="topbar">
          <div class="inner">
            <a class="brand" href="${me(t)}index.html">
              <span class="brand-mark" aria-hidden="true"></span>
              tan-compose
              <span class="version-pill">${me(e.version)}</span>
            </a>
            <site-search base="${me(t)}" class="nav-search"></site-search>
            <nav aria-label="Primary">
              ${r.map(n=>{let o=n.id===a,s=[n.hideOnSmall?"nav-hide-sm":"",o?"active":""].filter(Boolean).join(" "),i=o?' aria-current="page"':"",l=n.external?' target="_blank" rel="noopener"':"";return`<a href="${me(n.href)}"${i}${l}${s?` class="${s}"`:""}>${me(n.label)}</a>`}).join(`
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
      `}}));function me(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var ca="site-footer";f(ca,p({props:{base:{type:"string",default:""},year:{type:"string",default:"2026"}},styles:{display:"block"},template:({props:e})=>{let t=String(e.base??"");return`
        <footer class="foot">
          <div class="inner">
            <p>&copy; ${ne(e.year)} Tan Compose \xB7 MIT License</p>
            <div class="links">
              <a href="${ne(t)}docs.html">Docs</a>
              <a href="${ne(t)}components.html">Components</a>
              <a href="${ne(t)}themes.html">Themes</a>
              <a href="${ne(t)}playground.html">Playground</a>
              <a href="${ne(t)}blog/">Blog</a>
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
      `}}));function ne(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var da="site-search";var P=null,Le=null;function He(e){if(P)return Promise.resolve(P);if(Le)return Le;let t=`${e}search.json`;return Le=fetch(t).then(r=>r.json()).then(r=>(P=r.docs??[],P)).catch(r=>(console.warn("[site-search] failed to load index:",r),P=[],P)),Le}function Lt(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Mt(e,t){let r=e.trim().toLowerCase();if(!r)return[];let a=r.split(/\s+/).filter(Boolean).map(o=>({raw:o,re:new RegExp(Lt(o),"i")})),n=[];for(let o of t){let s=o.title.toLowerCase(),i=(o.description??"").toLowerCase(),l=(o.text??"").toLowerCase(),c=0;for(let u of a){let g=u.raw;s===g&&(c+=50),s.startsWith(g)&&(c+=20),s.includes(g)&&(c+=10),i.includes(g)&&(c+=5),l.includes(g)&&(c+=1)}a.every(u=>u.re.test(o.title)||u.re.test(i)||u.re.test(l))&&c!==0&&(o.category==="blog"&&o.date&&(Date.now()-new Date(o.date).getTime())/864e5<30&&(c+=3),n.push({doc:o,score:c}))}return n.sort((o,s)=>s.score-o.score),n.slice(0,12)}function ua(e,t,r=140){let a=e.trim().toLowerCase().split(/\s+/)[0];if(!a)return t.slice(0,r);let o=t.toLowerCase().indexOf(a);if(o===-1)return t.slice(0,r);let s=Math.max(0,o-40),i=Math.min(t.length,s+r),l=s>0?"\u2026 ":"",c=i<t.length?" \u2026":"";return l+t.slice(s,i)+c}function V(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Oe(e,t){let r=t.trim();if(!r)return V(e);let a=r.split(/\s+/).filter(Boolean),n=V(e);for(let o of a){let s=new RegExp(`(${Lt(V(o))})`,"gi");n=n.replace(s,"<mark>$1</mark>")}return n}function pa(e){e.setState("open",!1),e.setState("query",""),e.setState("results",[]),e.setState("focusIdx",0)}var fa=`
        <style>
          :host { display: inline-block; }

          .trigger {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 6px 10px;
            font-family: var(--tc-font-sans, "Inter", system-ui, sans-serif);
            font-size: 0.86rem;
            color: var(--tc-color-ink-soft, #4a5061);
            background: var(--tc-color-surface, #ffffff);
            border: 1px solid var(--tc-color-rule, #ece5d3);
            border-radius: var(--tc-radius-md, 8px);
            cursor: pointer;
            min-width: 200px;
            transition: border-color 0.15s ease, color 0.15s ease;
          }
          .trigger:hover {
            border-color: var(--tc-color-accent, #a16939);
            color: var(--tc-color-ink, #14171f);
          }
          .trigger-icon { width: 14px; height: 14px; flex: 0 0 auto; }
          .trigger-label { flex: 1 1 auto; text-align: left; }
          .trigger-kbd {
            font-family: var(--tc-font-mono, "JetBrains Mono", monospace);
            font-size: 0.7rem;
            color: var(--tc-color-ink-muted, #6b7280);
            background: var(--tc-color-bg, #faf8f3);
            border: 1px solid var(--tc-color-rule, #ece5d3);
            border-radius: 4px;
            padding: 1px 5px;
            line-height: 1.4;
          }

          dialog.modal {
            background: var(--tc-color-surface, #ffffff);
            border: 1px solid var(--tc-color-rule, #ece5d3);
            border-radius: var(--tc-radius-lg, 12px);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            padding: 0;
            width: calc(100% - 32px);
            max-width: 640px;
            max-height: calc(100vh - 120px);
            inset: 96px auto auto 50%;
            transform: translateX(-50%);
            margin: 0;
            overflow: hidden;
            font-family: var(--tc-font-sans, "Inter", system-ui, sans-serif);
            color: var(--tc-color-ink, #14171f);
          }
          dialog.modal[open] {
            display: flex;
            flex-direction: column;
          }
          dialog.modal::backdrop {
            background: rgba(20, 23, 31, 0.45);
            backdrop-filter: blur(2px);
          }

          .modal-head {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 14px 16px;
            border-bottom: 1px solid var(--tc-color-rule, #ece5d3);
          }
          .search-icon {
            width: 18px;
            height: 18px;
            color: var(--tc-color-ink-muted, #6b7280);
            flex: 0 0 auto;
          }
          .search-input {
            flex: 1 1 auto;
            border: none;
            outline: none;
            font: inherit;
            font-size: 1rem;
            background: transparent;
            color: inherit;
            min-width: 0;
          }
          .close {
            font: inherit;
            font-size: 0.74rem;
            font-family: var(--tc-font-mono, monospace);
            background: var(--tc-color-bg, #faf8f3);
            border: 1px solid var(--tc-color-rule, #ece5d3);
            border-radius: 4px;
            color: var(--tc-color-ink-muted, #6b7280);
            padding: 3px 8px;
            cursor: pointer;
          }
          .close:hover { color: var(--tc-color-ink, #14171f); }

          .results {
            flex: 1 1 auto;
            overflow-y: auto;
            padding: 4px;
          }
          .empty {
            padding: 28px;
            text-align: center;
            color: var(--tc-color-ink-muted, #6b7280);
            font-size: 0.92rem;
          }

          .row {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            padding: 10px 12px;
            border-radius: var(--tc-radius-md, 8px);
            text-decoration: none;
            color: inherit;
            cursor: pointer;
          }
          .row.focused, .row:hover {
            background: var(--tc-color-accent-soft, #efe2cf);
          }
          .row-cat {
            flex: 0 0 auto;
            font-family: var(--tc-font-mono, monospace);
            font-size: 0.66rem;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            padding: 3px 7px;
            border-radius: 999px;
            background: var(--tc-color-bg, #faf8f3);
            color: var(--tc-color-ink-muted, #6b7280);
            border: 1px solid var(--tc-color-rule, #ece5d3);
            margin-top: 2px;
          }
          .row-cat.blog { color: var(--tc-color-accent, #a16939); border-color: var(--tc-color-accent-soft, #efe2cf); }
          .row-cat.component { color: #5b6cf0; border-color: #d0d5f0; }
          .row-cat.page { color: var(--tc-color-ink-soft, #4a5061); }
          .row-main { flex: 1 1 auto; min-width: 0; }
          .row-title {
            font-size: 0.96rem;
            font-weight: 600;
            margin-bottom: 2px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .row-desc {
            font-size: 0.84rem;
            color: var(--tc-color-ink-soft, #4a5061);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-bottom: 2px;
          }
          .row-snippet {
            font-size: 0.78rem;
            color: var(--tc-color-ink-muted, #6b7280);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          mark {
            background: var(--tc-color-accent-soft, #efe2cf);
            color: var(--tc-color-accent-hover, #8a572d);
            padding: 0 2px;
            border-radius: 2px;
          }

          .footer {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 10px 16px;
            border-top: 1px solid var(--tc-color-rule, #ece5d3);
            background: var(--tc-color-bg, #faf8f3);
            font-size: 0.78rem;
            color: var(--tc-color-ink-muted, #6b7280);
          }
          .hint {
            display: inline-flex;
            align-items: center;
            gap: 4px;
          }
          .hint kbd {
            font-family: var(--tc-font-mono, monospace);
            font-size: 0.7rem;
            background: var(--tc-color-surface, #ffffff);
            border: 1px solid var(--tc-color-rule, #ece5d3);
            border-radius: 3px;
            padding: 1px 5px;
            line-height: 1.4;
          }
          .count { margin-left: auto; }

          @media (max-width: 600px) {
            .trigger { min-width: 120px; }
            .trigger-label { display: none; }
            dialog.modal {
              inset: 40px 8px auto 8px;
              transform: none;
              width: auto;
              max-width: none;
            }
            .row-snippet { display: none; }
          }
        </style>
`;f(da,p({props:{base:{type:"string",default:""}},styles:{display:"inline-block"},refs:{input:".search-input",results:".results",dialog:"dialog.modal"},template:({props:e,state:t})=>{let r=String(e.base??""),a=String(t.query??""),n=Number(t.focusIdx??0),o=t.results??[],s=`
        <button type="button" class="trigger" aria-label="Search the site (\u2318K)">
          <svg class="trigger-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <span class="trigger-label">Search</span>
          <kbd class="trigger-kbd" aria-hidden="true">\u2318K</kbd>
        </button>
      `,i=a.trim()===""?'<div class="empty">Start typing to search the site \u2014 docs, components, blog posts, examples.</div>':o.length===0?`<div class="empty">No results for "${V(a)}". Try a shorter query.</div>`:o.map((c,d)=>{let u=d===n?"row focused":"row",g=r+c.doc.url.replace(/^\//,""),m=ua(a,c.doc.text);return`
              <a class="${u}" data-index="${d}" href="${V(g)}">
                <span class="row-cat ${V(c.doc.category)}">${V(c.doc.category)}</span>
                <div class="row-main">
                  <div class="row-title">${Oe(c.doc.title,a)}</div>
                  <div class="row-desc">${Oe(c.doc.description,a)}</div>
                  <div class="row-snippet">${Oe(m,a)}</div>
                </div>
              </a>
            `}).join(""),l=`
        <dialog class="modal" aria-label="Site search">
          <div class="modal-head">
            <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              class="search-input"
              placeholder="Search docs, components, blog\u2026"
              value="${V(a)}"
              aria-label="Search"
              aria-autocomplete="list"
              autocomplete="off"
              spellcheck="false"
            />
            <button type="button" class="close" aria-label="Close">Esc</button>
          </div>
          <div class="results" role="listbox">${i}</div>
          <div class="footer">
            <span class="hint"><kbd>\u2191</kbd><kbd>\u2193</kbd> navigate</span>
            <span class="hint"><kbd>\u21B5</kbd> open</span>
            <span class="hint"><kbd>esc</kbd> close</span>
            <span class="count">${o.length>0?`${o.length} result${o.length===1?"":"s"}`:""}</span>
          </div>
        </dialog>
      `;return s+l+fa},events:{"click .trigger":(e,t)=>{let r=t.host,a=String(r.base??"");t.setState("open",!0),t.setState("query",""),t.setState("focusIdx",0),t.setState("results",[]),He(a)},"click .close":(e,t)=>pa(t),"input .search-input":(e,t)=>{let r=e.target.value,a=t.host,n=String(a.base??"");t.setState("query",r),t.setState("focusIdx",0),P?t.setState("results",Mt(r,P)):He(n).then(o=>{t.setState("results",Mt(r,o))})},"keydown .search-input":(e,t)=>{let r=e,a=t.getState("results")??[],n=Number(t.getState("focusIdx")??0);if(r.key==="ArrowDown"){if(r.preventDefault(),a.length===0)return;t.setState("focusIdx",Math.min(a.length-1,n+1));return}if(r.key==="ArrowUp"){if(r.preventDefault(),a.length===0)return;t.setState("focusIdx",Math.max(0,n-1));return}if(r.key==="Enter"){if(a.length===0)return;r.preventDefault();let o=a[n];if(o){let s=t.host,l=String(s.base??"")+o.doc.url.replace(/^\//,"");globalThis.location.href=l}return}},"mouseover .row":(e,t)=>{let r=e.target.closest(".row");if(!r)return;let a=Number(r.dataset.index);Number.isNaN(a)||t.setState("focusIdx",a)}},afterMount(){let e=this,t=r=>{if(r.key.toLowerCase()==="k"&&(r.metaKey||r.ctrlKey)&&!r.altKey){if(r.preventDefault(),!e.setState)return;e.setState("open",!0),e.setState("query",""),e.setState("focusIdx",0),e.setState("results",[]),He(String(e.base??""));return}if(r.key==="/"&&!r.metaKey&&!r.ctrlKey&&!r.altKey){let a=document.activeElement,n=a?.tagName.toLowerCase();if(n==="input"||n==="textarea"||a?.isContentEditable===!0||(r.preventDefault(),!e.setState))return;e.setState("open",!0),e.setState("query",""),e.setState("focusIdx",0),e.setState("results",[]),He(String(e.base??""))}};document.addEventListener("keydown",t),e._searchKeyHandler=t},unmount(){let e=this;e._searchKeyHandler&&document.removeEventListener("keydown",e._searchKeyHandler)},afterRender(){let e=this,t=e.refs?.dialog??null;if(!t)return;let r=e.getState?!!e.getState("open"):!1;if(r&&!t.open){t.showModal(),(e.refs?.input??null)?.focus(),t.addEventListener("close",()=>{e.getState?.("open")&&(e.setState?.("open",!1),e.setState?.("query",""),e.setState?.("results",[]),e.setState?.("focusIdx",0))}),t.addEventListener("click",n=>{n.target===t&&t.close()});return}if(!r&&t.open){t.close();return}if(r){let a=e.refs?.input??null;a&&e.shadowRoot?.activeElement!==a&&a.focus()}}}));
//# sourceMappingURL=site.js.map
