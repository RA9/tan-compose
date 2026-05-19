var Wt=`:root {
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

  /* shadow \u2014 two-layer for depth. tuned so md is clearly elevated
     against the page bg without looking dramatic. */
  --tc-shadow-sm: 0 1px 2px rgba(20, 23, 31, 0.05), 0 1px 1px rgba(20, 23, 31, 0.03);
  --tc-shadow-md: 0 4px 12px rgba(20, 23, 31, 0.10), 0 2px 4px rgba(20, 23, 31, 0.06);
  --tc-shadow-lg: 0 18px 44px rgba(20, 23, 31, 0.16), 0 6px 14px rgba(20, 23, 31, 0.08);

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
`,qe=!1;function Xt(){if(typeof document>"u"||qe)return;if(document.querySelector("style[data-tc-tokens]")){qe=!0;return}let e=document.createElement("style");e.setAttribute("data-tc-tokens",""),e.textContent=Wt,document.head.insertBefore(e,document.head.firstChild),qe=!0}Xt();var Jt=["beforeMount","afterMount","afterRender","unmount","action","formAssociatedCallback","formDisabledCallback","formResetCallback","formStateRestoreCallback"],Zt=new Set(["string","number","boolean","json"]);function g(e){if(e===null||typeof e!="object")throw new TypeError("describe(): options must be an object");if(e.tag!==void 0&&typeof e.tag!="string")throw new TypeError("describe(): `tag` must be a string");if(e.className!==void 0&&typeof e.className!="string")throw new TypeError("describe(): `className` must be a string");if(e.template!==void 0&&typeof e.template!="string"&&typeof e.template!="function")throw new TypeError("describe(): `template` must be a string or function");if(e.children!==void 0&&!Array.isArray(e.children))throw new TypeError("describe(): `children` must be an array");if(e.emit!==void 0&&!Array.isArray(e.emit))throw new TypeError("describe(): `emit` must be an array");if(e.observedAttributes!==void 0&&(!Array.isArray(e.observedAttributes)||e.observedAttributes.some(t=>typeof t!="string")))throw new TypeError("describe(): `observedAttributes` must be an array of strings");for(let t of["theme","styles","attributes","events","refs"]){let r=e[t];if(r!==void 0&&(r===null||typeof r!="object"||Array.isArray(r)))throw new TypeError(`describe(): \`${t}\` must be a record`)}if(e.refs!==void 0){for(let[t,r]of Object.entries(e.refs))if(typeof r!="string")throw new TypeError(`describe(): refs.${t} must be a CSS selector string`)}if(e.formAssociated!==void 0&&typeof e.formAssociated!="boolean")throw new TypeError("describe(): `formAssociated` must be a boolean");for(let t of Jt){let r=e[t];if(r!==void 0&&typeof r!="function")throw new TypeError(`describe(): \`${t}\` must be a function`)}if(e.if!==void 0&&typeof e.if!="function")throw new TypeError("describe(): `if` must be a function");if(e.for!==void 0){let t=e.for;if(t===null||typeof t!="object"||Array.isArray(t))throw new TypeError("describe(): `for` must be a record");if(typeof t.items!="function")throw new TypeError("describe(): `for.items` must be a function");if(typeof t.key!="function")throw new TypeError("describe(): `for.key` must be a function");if(typeof t.render!="function")throw new TypeError("describe(): `for.render` must be a function")}if(e.props!==void 0){let t=e.props;if(t===null||typeof t!="object"||Array.isArray(t))throw new TypeError("describe(): `props` must be a record");for(let[r,a]of Object.entries(t)){if(a===null||typeof a!="object"||Array.isArray(a))throw new TypeError(`describe(): props.${r} must be a record`);if(!Zt.has(a.type))throw new TypeError(`describe(): props.${r}.type must be one of "string", "number", "boolean", "json"`)}}return{...e}}var Ze=new Map,Qt=/^[a-z][a-z0-9]*(-[a-z0-9]+)+$/,er=/^(\S+)(?:\s+(.+))?$/;function h(e,t){if(typeof e!="string"||!Qt.test(e))throw new TypeError(`build(): "${e}" is not a valid custom element name (must be lowercase and contain a hyphen).`);if(Ze.has(e))return console.warn(`Component "${e}" is already registered. Skipping re-registration.`),e;if(typeof HTMLElement>"u"||typeof customElements>"u")return console.warn("HTMLElement or customElements not available; skipping component registration."),e;let r=Array.from(new Set([...t.observedAttributes??[],...Object.keys(t.props??{})])),a=t.props??{},n=t.refs??{},o=ar(t);class s extends HTMLElement{static get observedAttributes(){return r}static get formAssociated(){return t.formAssociated===!0}isMounted=!1;mountCleanups=[];renderCleanups=[];state=new Map;propValues=new Map;listSlots=new WeakMap;currentRefs={};container;ctx;rendering=!1;renderQueued=!1;internals;constructor(){super();let l=this.attachShadow({mode:"open"});t.formAssociated&&typeof this.attachInternals=="function"&&(this.internals=this.attachInternals()),nr(l,o),this.container=document.createElement("div"),this.container.className=t.className?`container ${t.className}`:"container",l.appendChild(this.container),t.attributes&&at(this,t.attributes),this.ctx=rr(this,this.propValues,this.state,()=>this.currentRefs),this.initProps()}get refs(){return this.currentRefs}initProps(){for(let[l,c]of Object.entries(a)){let d=this.getAttribute(l),u=d!==null?Qe(d,c.type):c.default;this.propValues.set(l,u),this.maybeSyncFormValue(l,u),Object.defineProperty(this,l,{configurable:!0,enumerable:!0,get:()=>this.propValues.get(l),set:f=>{let m=ir(f,c.type),p=this.propValues.get(l);Object.is(p,m)||(this.propValues.set(l,m),c.reflect&&lr(this,l,m,c.type),this.maybeSyncFormValue(l,m),this.isMounted&&this.scheduleRender())}})}}maybeSyncFormValue(l,c){if(!this.internals||l!=="value")return;let d=c==null?null:String(c);this.internals.setFormValue(d)}connectedCallback(){if(!this.isMounted){try{t.beforeMount?.call(this)}catch(l){console.error(`[tan-compose] beforeMount threw for <${e}>:`,l)}if(this.renderInternal(),t.action){let l=t.action;this.addEventListener("click",l),this.mountCleanups.push(()=>this.removeEventListener("click",l))}if(t.emit)for(let l of t.emit)this.addEventListener(l.name,l.handler),this.mountCleanups.push(()=>this.removeEventListener(l.name,l.handler));t.events&&this.attachDelegatedEvents(t.events),this.isMounted=!0;try{t.afterMount?.call(this)}catch(l){console.error(`[tan-compose] afterMount threw for <${e}>:`,l)}}}disconnectedCallback(){try{t.unmount?.call(this)}catch(l){console.error(`[tan-compose] unmount threw for <${e}>:`,l)}ee(this.mountCleanups),ee(this.renderCleanups),this.flushListSlots(),this.isMounted=!1}flushListSlots(){rt(t,l=>{let c=this.listSlots.get(l);if(c){for(let d of c.cache.values())ee(d.cleanups);c.cache.clear()}})}attributeChangedCallback(l,c,d){if(c!==d){if(Object.prototype.hasOwnProperty.call(a,l)){let u=a[l],f=d!==null?Qe(d,u.type):u.default,m=this.propValues.get(l);Object.is(m,f)||(this.propValues.set(l,f),this.isMounted&&this.scheduleRender());return}this.state.set(l,d),this.isMounted&&this.scheduleRender()}}setState(l,c){let d=this.state.get(l);Object.is(d,c)||(this.state.set(l,c),this.isMounted&&this.scheduleRender())}getState(l){return this.state.get(l)}render(){this.renderInternal()}emitEvent(l,c){this.dispatchEvent(new CustomEvent(l,{detail:c,bubbles:!0,composed:!0}))}scheduleRender(){if(this.rendering){this.renderQueued=!0;return}this.renderInternal()}getOrCreateSlot(l){let c=this.listSlots.get(l);return c||(c={cache:new Map},this.listSlots.set(l,c)),c}renderInternal(){this.rendering=!0;let l=this.captureFocusInShadow();try{ee(this.renderCleanups),this.container.replaceChildren();let c={host:this,cleanups:this.renderCleanups,ctx:this.ctx};if(t.template!==void 0){let d=typeof t.template=="function"?t.template(this.ctx):t.template;d&&(this.container.innerHTML=d)}if(t.children)for(let d of t.children){let u=et(d,c,f=>this.getOrCreateSlot(f));u&&this.container.appendChild(u)}this.container.appendChild(document.createElement("slot")),this.refreshRefs()}finally{this.rendering=!1}if(l&&this.restoreFocusInShadow(l),this.renderQueued){this.renderQueued=!1,this.renderInternal();return}try{t.afterRender?.call(this)}catch(c){console.error(`[tan-compose] afterRender threw for <${e}>:`,c)}}captureFocusInShadow(){let l=this.shadowRoot;if(!l)return null;let c=l.activeElement;if(!c)return null;let d=[],u=c;for(;u&&u!==l;){let p=u.parentNode;if(!p)break;let b=u.tagName,x=Array.from(p.children).filter(y=>y.tagName===b).indexOf(u);if(d.unshift({tag:b,idx:x}),u=p instanceof Element?p:null,!u&&p===l)break}let f=null,m=null;if(c instanceof HTMLInputElement||c instanceof HTMLTextAreaElement)try{f=c.selectionStart,m=c.selectionEnd}catch{}return{path:d,selectionStart:f,selectionEnd:m}}restoreFocusInShadow(l){let c=this.shadowRoot;if(!c)return;let d=c;for(let f of l.path){let m=Array.from(d.children??[]),v=(m.length>0?m:Array.from(d.children??[])).filter(x=>x.tagName===f.tag)[f.idx];if(!v)return;d=v}let u=d;if(!(!u||typeof u.focus!="function")&&c.activeElement!==u&&(u.focus(),l.selectionStart!=null&&(u instanceof HTMLInputElement||u instanceof HTMLTextAreaElement)))try{u.setSelectionRange(l.selectionStart,l.selectionEnd??l.selectionStart)}catch{}}refreshRefs(){let l={},c=this.shadowRoot;for(let[d,u]of Object.entries(n))l[d]=c?c.querySelector(u):null;this.currentRefs=l}formAssociatedCallback(l){try{t.formAssociatedCallback?.call(this,l)}catch(c){console.error(`[tan-compose] formAssociatedCallback threw for <${e}>:`,c)}}formDisabledCallback(l){try{t.formDisabledCallback?.call(this,l)}catch(c){console.error(`[tan-compose] formDisabledCallback threw for <${e}>:`,c)}}formResetCallback(){try{t.formResetCallback?.call(this)}catch(l){console.error(`[tan-compose] formResetCallback threw for <${e}>:`,l)}}formStateRestoreCallback(l,c){try{t.formStateRestoreCallback?.call(this,l,c)}catch(d){console.error(`[tan-compose] formStateRestoreCallback threw for <${e}>:`,d)}}attachDelegatedEvents(l){let c=new Map;for(let[d,u]of Object.entries(l)){let f=er.exec(d.trim());if(!f)continue;let[,m,p]=f;c.has(m)||c.set(m,[]),c.get(m).push({selector:p??null,handler:u})}for(let[d,u]of c){let f=m=>{for(let{selector:p,handler:b}of u){if(!p){b(m,this.ctx);continue}let v=m.composedPath();for(let x of v){if(x===this.shadowRoot||x===this)break;if(x instanceof Element&&this.shadowRoot?.contains(x)&&x.matches(p)){b(m,this.ctx);break}}}};this.shadowRoot.addEventListener(d,f),this.mountCleanups.push(()=>this.shadowRoot?.removeEventListener(d,f))}}}return Ze.set(e,s),customElements.define(e,s),e}function et(e,t,r){return e.if&&!e.if(t.ctx)?null:tt(e,t,r)}function tt(e,t,r){let a=document.createElement(e.tag||"div");if(e.styles&&(a.style.cssText=Object.entries(e.styles).map(([n,o])=>`${n}: ${o}`).join("; ")),e.className&&(a.className=e.className),e.attributes&&at(a,e.attributes),e.template!==void 0){let n=typeof e.template=="function"?e.template(t.ctx):e.template;n&&(a.innerHTML=n)}if(e.children)for(let n of e.children){let o=et(n,t,r);o&&a.appendChild(o)}if(e.for&&tr(a,e,t,r),e.action){let n=e.action;a.addEventListener("click",n),t.cleanups.push(()=>a.removeEventListener("click",n))}if(e.emit)for(let n of e.emit)a.addEventListener(n.name,n.handler),t.cleanups.push(()=>a.removeEventListener(n.name,n.handler));return a}function tr(e,t,r,a){let n=t.for,o=a(t),s=n.items(r.ctx),i=new Map;for(let l=0;l<s.length;l++){let c=s[l],d=n.key(c,l),u,f=o.cache.get(d);if(f&&Object.is(f.lastItem,c))u=f;else{let m=[],p=n.render(c,l,r.ctx),b=tt(p,{...r,cleanups:m},a);f&&ee(f.cleanups),u={element:b,lastItem:c,cleanups:m}}i.set(d,u),e.appendChild(u.element)}for(let[l,c]of o.cache)i.has(l)||ee(c.cleanups);o.cache=i}function rt(e,t){if(e.for&&t(e),e.children)for(let r of e.children)rt(r,t)}function rr(e,t,r,a){return{host:e,get props(){let n={};for(let[o,s]of t)n[o]=s;return n},get state(){let n={};for(let[o,s]of r)n[o]=s;return n},get refs(){return a()},setState:(n,o)=>e.setState(n,o),getState:n=>e.getState(n),emit:(n,o)=>e.emitEvent(n,o)}}function ar(e){let t=e.theme?or(e.theme):void 0,r=e.styles?sr(e.styles):void 0;if(!t&&!r)return{kind:"adopted",sheets:[]};if(typeof CSSStyleSheet<"u"&&typeof CSSStyleSheet.prototype.replaceSync=="function"){let n=[];if(t){let o=new CSSStyleSheet;o.replaceSync(t),n.push(o)}if(r){let o=new CSSStyleSheet;o.replaceSync(r),n.push(o)}return{kind:"adopted",sheets:n}}return{kind:"fallback",theme:t,styles:r}}function nr(e,t){if(t.kind==="adopted"){if(t.sheets.length>0)try{e.adoptedStyleSheets=t.sheets}catch{}return}if(t.theme){let r=document.createElement("style");r.textContent=t.theme,e.appendChild(r)}if(t.styles){let r=document.createElement("style");r.textContent=t.styles,e.appendChild(r)}}function at(e,t){for(let[r,a]of Object.entries(t))e.setAttribute(r,a)}function or(e){return`:host { ${Object.entries(e).map(([r,a])=>`--${r}: ${a};`).join(" ")} }`}function sr(e){return`.container { ${Object.entries(e).map(([r,a])=>`${r}: ${a};`).join(" ")} }`}function ee(e){for(;e.length>0;){let t=e.pop();try{t?.()}catch(r){console.error("[tan-compose] cleanup threw:",r)}}}function Qe(e,t){switch(t){case"string":return e;case"number":{let r=Number(e);return Number.isNaN(r)?void 0:r}case"boolean":return e!=="false"&&e!=="0";case"json":try{return JSON.parse(e)}catch{return}}}function ir(e,t){switch(t){case"string":return e==null?e:String(e);case"number":return e==null?e:Number(e);case"boolean":return!!e;case"json":return e}}function lr(e,t,r,a){if(a!=="json"){if(a==="boolean"){r?e.setAttribute(t,""):e.removeAttribute(t);return}if(r==null){e.removeAttribute(t);return}e.setAttribute(t,String(r))}}var cr="tc-button";var nt=`
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
      </style>
`;h(cr,g({props:{variant:{type:"string",default:"primary"},size:{type:"string",default:"md"},disabled:{type:"boolean",default:!1,reflect:!0},loading:{type:"boolean",default:!1},block:{type:"boolean",default:!1},href:{type:"string",default:""},target:{type:"string",default:""},rel:{type:"string",default:""},type:{type:"string",default:"button"}},theme:{"tc-btn-primary-bg":"var(--tc-color-ink, #14171f)","tc-btn-primary-fg":"var(--tc-color-surface, #ffffff)","tc-btn-secondary-bg":"var(--tc-color-surface, #ffffff)","tc-btn-secondary-fg":"var(--tc-color-ink, #14171f)","tc-btn-secondary-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-btn-ghost-fg":"var(--tc-color-ink, #14171f)","tc-btn-ghost-border":"transparent","tc-btn-danger-bg":"var(--tc-color-danger, #b3261e)","tc-btn-danger-fg":"var(--tc-color-surface, #ffffff)","tc-btn-radius":"var(--tc-radius-md, 8px)","tc-btn-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-btn-padding-x":"initial","tc-btn-padding-y":"initial"},styles:{display:"inline-block","vertical-align":"middle"},template:({props:e})=>{let t=`root v-${fe(e.variant)} s-${fe(e.size)}${e.block?" block":""}`,r=`${e.loading?'<span class="spinner" aria-hidden="true"></span>':""}
        <span class="content"><slot></slot></span>`,a=String(e.href??""),n=a.length>0,o=!!(e.disabled||e.loading);if(n){let l=e.target?` target="${fe(e.target)}"`:"",c=e.rel?String(e.rel):String(e.target)==="_blank"?"noopener":"",d=c?` rel="${fe(c)}"`:"",u=o?"":` href="${fe(a)}"`;return`
      <a
        part="button"
        class="${t}"${u}${l}${d}${o?' aria-disabled="true"':""}${o?' tabindex="-1"':""}
        role="button"
      >
        ${r}
      </a>${nt}`}let s=String(e.type??"button");return`
      <button
        part="button"
        class="${t}"
        ${o?"disabled":""}
        type="${s==="submit"||s==="reset"?s:"button"}"
      >
        ${r}
      </button>${nt}`},events:{"click .root":(e,t)=>{let r=t.host;if(r.disabled||r.loading||String(r.href??""))return;let a=String(r.type??"button");if(a!=="submit"&&a!=="reset")return;let n=r.closest("form");if(!n)return;let o=a==="submit"?"tc-submit":"tc-reset",s=new CustomEvent(o,{detail:{form:n},bubbles:!0,composed:!0,cancelable:!0});r.dispatchEvent(s),!s.defaultPrevented&&(a==="submit"?n.requestSubmit():n.reset())}}}));function fe(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var dr="tc-input";h(dr,g({formAssociated:!0,props:{value:{type:"string",default:""},name:{type:"string",default:""},type:{type:"string",default:"text"},placeholder:{type:"string",default:""},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0}},theme:{"tc-input-bg":"var(--tc-color-surface, #ffffff)","tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-border-focus":"var(--tc-color-accent, #a16939)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-radius":"var(--tc-radius-md, 8px)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},refs:{input:"input"},template:({props:e})=>{let t=!!e.error;return`
        ${e.label?`<label class="label">${te(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</label>`:""}
        <input
          class="input ${t?"invalid":""}"
          part="input"
          type="${te(e.type)}"
          value="${te(e.value)}"
          name="${te(e.name)}"
          placeholder="${te(e.placeholder)}"
          ${e.disabled?"disabled":""}
          ${e.required?"required":""}
          aria-invalid="${t?"true":"false"}"
        />
        ${e.error||e.helper?`<div class="${t?"error":"helper"}">${te(e.error||e.helper)}</div>`:""}
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
      `},events:{"input input":(e,t)=>{let r=e.target.value,a=t.host;a.internals?.setFormValue(r),a.value=r,t.emit("tc-input",{value:r})}},formResetCallback(){this.value=""}}));function te(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var ur="tc-textarea";h(ur,g({formAssociated:!0,props:{value:{type:"string",default:""},name:{type:"string",default:""},placeholder:{type:"string",default:""},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},rows:{type:"number",default:4},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0},resize:{type:"string",default:"vertical"}},theme:{"tc-input-bg":"var(--tc-color-surface, #ffffff)","tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-border-focus":"var(--tc-color-accent, #a16939)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-radius":"var(--tc-radius-md, 8px)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},refs:{input:"textarea"},template:({props:e})=>{let t=!!e.error;return`
        ${e.label?`<label class="label">${J(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</label>`:""}
        <textarea
          class="input ${t?"invalid":""}"
          part="textarea"
          name="${J(e.name)}"
          placeholder="${J(e.placeholder)}"
          rows="${J(e.rows)}"
          ${e.disabled?"disabled":""}
          ${e.required?"required":""}
          aria-invalid="${t?"true":"false"}"
          style="resize: ${J(e.resize)};"
        >${J(e.value)}</textarea>
        ${e.error||e.helper?`<div class="${t?"error":"helper"}">${J(e.error||e.helper)}</div>`:""}
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
      `},events:{"input textarea":(e,t)=>{let r=e.target.value,a=t.host;a.internals?.setFormValue(r),a.value=r,t.emit("tc-input",{value:r})}},formResetCallback(){this.value=""}}));function J(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var pr="tc-select";h(pr,g({formAssociated:!0,props:{value:{type:"string",default:""},name:{type:"string",default:""},options:{type:"json",default:[]},placeholder:{type:"string",default:""},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0}},theme:{"tc-input-bg":"var(--tc-color-surface, #ffffff)","tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-border-focus":"var(--tc-color-accent, #a16939)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-radius":"var(--tc-radius-md, 8px)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},template:({props:e})=>{let t=e.options??[],r=!!e.error;return`
        ${e.label?`<label class="label">${re(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</label>`:""}
        <div class="wrap">
          <select
            class="select ${r?"invalid":""}"
            part="select"
            name="${re(e.name)}"
            ${e.disabled?"disabled":""}
            ${e.required?"required":""}
            aria-invalid="${r?"true":"false"}"
          >
            ${e.placeholder?`<option value="" disabled ${e.value===""?"selected":""}>${re(e.placeholder)}</option>`:""}
            ${t.map(a=>`<option value="${re(a.value)}"${a.disabled?" disabled":""}${a.value===e.value?" selected":""}>${re(a.label)}</option>`).join("")}
          </select>
          <span class="caret" aria-hidden="true">\u25BE</span>
        </div>
        ${e.error||e.helper?`<div class="${r?"error":"helper"}">${re(e.error||e.helper)}</div>`:""}
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
      `},events:{"change select":(e,t)=>{let r=e.target.value,a=t.host;a.internals?.setFormValue(r),a.value=r,t.emit("tc-change",{value:r})}},formResetCallback(){this.value=""}}));function re(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var fr="tc-checkbox";h(fr,g({formAssociated:!0,props:{checked:{type:"boolean",default:!1,reflect:!0},name:{type:"string",default:""},value:{type:"string",default:"on"},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0},indeterminate:{type:"boolean",default:!1}},theme:{"tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-border-focus":"var(--tc-color-accent, #a16939)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-radius":"var(--tc-radius-sm, 4px)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-checkbox-accent":"var(--tc-color-accent, #a16939)"},styles:{display:"block"},template:({props:e})=>{let t=!!e.error;return`
        <label class="row ${e.disabled?"is-disabled":""} ${t?"is-invalid":""}">
          <input
            class="cb"
            type="checkbox"
            name="${$e(e.name)}"
            value="${$e(e.value)}"
            ${e.checked?"checked":""}
            ${e.disabled?"disabled":""}
            ${e.required?"required":""}
            aria-invalid="${t?"true":"false"}"
          />
          ${e.label?`<span class="label">${$e(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</span>`:"<span></span>"}
        </label>
        ${e.error||e.helper?`<div class="${t?"error":"helper"}">${$e(e.error||e.helper)}</div>`:""}
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
      `},refs:{input:".cb"},events:{"change .cb":(e,t)=>{let r=e.target.checked,a=t.host;a.checked=r,a.internals?.setFormValue(r?a.value:null),t.emit("tc-change",{checked:r})}},afterMount(){let e=this,r=e.shadowRoot?.querySelector(".cb");r&&(r.indeterminate=e.indeterminate),e.internals?.setFormValue(e.checked?e.value:null)},formResetCallback(){this.checked=!1}}));function $e(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var gr="tc-switch";h(gr,g({formAssociated:!0,props:{checked:{type:"boolean",default:!1,reflect:!0},name:{type:"string",default:""},value:{type:"string",default:"on"},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},disabled:{type:"boolean",default:!1,reflect:!0}},theme:{"tc-switch-track-off":"var(--tc-color-rule-strong, #d9cfb8)","tc-switch-track-on":"var(--tc-color-accent, #a16939)","tc-switch-thumb":"var(--tc-color-surface, #ffffff)","tc-switch-fg":"var(--tc-color-ink, #14171f)","tc-switch-helper":"var(--tc-color-ink-muted, #6b7280)","tc-switch-error":"var(--tc-color-danger, #b3261e)","tc-switch-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},template:({props:e})=>{let t=!!e.error;return`
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
          ${e.label?`<span class="label">${ot(e.label)}</span>`:""}
        </label>
        ${e.error||e.helper?`<div class="${t?"error":"helper"}">${ot(e.error||e.helper)}</div>`:""}
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
      `},events:{"click .track":(e,t)=>{let r=t.host;r.disabled||(r.checked=!r.checked,r.internals?.setFormValue(r.checked?r.value:null),t.emit("tc-change",{checked:r.checked}))},"keydown .track":(e,t)=>{let r=e;if(r.key!==" "&&r.key!=="Enter")return;r.preventDefault();let a=t.host;a.disabled||(a.checked=!a.checked,a.internals?.setFormValue(a.checked?a.value:null),t.emit("tc-change",{checked:a.checked}))}},afterMount(){let e=this;e.internals?.setFormValue(e.checked?e.value:null)},formResetCallback(){this.checked=!1}}));function ot(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var mr="tc-file";h(mr,g({formAssociated:!0,props:{name:{type:"string",default:""},accept:{type:"string",default:""},multiple:{type:"boolean",default:!1,reflect:!0},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},buttonText:{type:"string",default:"Choose file"},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0}},theme:{"tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-border-focus":"var(--tc-color-accent, #a16939)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-radius":"var(--tc-radius-md, 8px)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-file-zone-bg":"var(--tc-color-surface-alt, #faf8f3)","tc-file-zone-fg":"var(--tc-color-ink-soft, #4a5061)"},styles:{display:"block"},refs:{input:"input[type='file']"},template:({props:e,state:t})=>{let r=!!e.error,a=t.files??[],n=a.length===0?"No file selected":a.length===1?ae(a[0].name):`${a.length} files selected`;return`
        ${e.label?`<label class="label">${ae(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</label>`:""}
        <div class="zone ${e.disabled?"is-disabled":""} ${r?"is-invalid":""}">
          <button class="btn" type="button" ${e.disabled?"disabled":""}>
            ${ae(e.buttonText)}
          </button>
          <span class="files">${n}</span>
          <input
            class="native"
            type="file"
            name="${ae(e.name)}"
            accept="${ae(e.accept)}"
            ${e.multiple?"multiple":""}
            ${e.disabled?"disabled":""}
            ${e.required?"required":""}
            tabindex="-1"
            aria-hidden="true"
          />
        </div>
        ${e.error||e.helper?`<div class="${r?"error":"helper"}">${ae(e.error||e.helper)}</div>`:""}
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
      `},events:{"click .btn":(e,t)=>{t.refs.input?.click()},"change input[type='file']":(e,t)=>{let r=e.target,a=Array.from(r.files??[]);t.setState("files",a);let n=t.host;if(n.internals)if(a.length===0)n.internals.setFormValue(null);else if(a.length===1)n.internals.setFormValue(a[0]);else{let o=new FormData,s=n.name;for(let i of a)o.append(s,i);n.internals.setFormValue(o)}t.emit("tc-files",{files:a})}},formResetCallback(){let t=this.shadowRoot?.querySelector(".native");t&&(t.value=""),this.setState("files",[])}}));function ae(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var hr="tc-radio-group";h(hr,g({formAssociated:!0,props:{value:{type:"string",default:""},name:{type:"string",default:""},options:{type:"json",default:[]},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},layout:{type:"string",default:"vertical"},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0}},theme:{"tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-radio-accent":"var(--tc-color-accent, #a16939)"},styles:{display:"block"},template:({props:e})=>{let t=e.options??[],r=!!e.error,a=String(e.layout??"vertical");return`
        <fieldset class="group" ${e.disabled?"disabled":""}>
          ${e.label?`<legend class="legend">${ne(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</legend>`:""}
          <div class="opts l-${ne(a)}" role="radiogroup" aria-invalid="${r?"true":"false"}">
            ${t.map((n,o)=>`<label class="opt ${n.disabled?"is-disabled":""}">
                  <input
                    type="radio"
                    class="r"
                    name="${ne(e.name)||`__rg_${o}__`}"
                    value="${ne(n.value)}"
                    ${n.value===e.value?"checked":""}
                    ${n.disabled||e.disabled?"disabled":""}
                  />
                  <span>${ne(n.label)}</span>
                </label>`).join("")}
          </div>
        </fieldset>
        ${e.error||e.helper?`<div class="${r?"error":"helper"}">${ne(e.error||e.helper)}</div>`:""}
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
      `},events:{"change input.r":(e,t)=>{let r=e.target.value,a=t.host;a.value=r,a.internals?.setFormValue(r),t.emit("tc-change",{value:r})}},afterMount(){let e=this;e.value&&e.internals?.setFormValue(e.value)},formResetCallback(){this.value=""}}));function ne(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var br="tc-table";var vr=`
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
`,Be=new WeakMap;h(br,g({props:{rows:{type:"json",default:[]},columns:{type:"json",default:[]},pageSize:{type:"number",default:10},filterable:{type:"boolean",default:!0},emptyText:{type:"string",default:"No results."},rowKey:{type:"string",default:"id"}},theme:{"tc-table-surface":"var(--tc-color-surface, #ffffff)","tc-table-ink":"var(--tc-color-ink, #14171f)","tc-table-soft":"var(--tc-color-ink-soft, #5a6072)","tc-table-rule":"var(--tc-color-rule, #ece5d3)","tc-table-head-bg":"var(--tc-color-surface-alt, #faf8f3)","tc-table-row-hover":"rgba(161, 105, 57, 0.05)","tc-table-accent":"var(--tc-color-accent, #a16939)","tc-table-radius":"var(--tc-radius-lg, 10px)","tc-table-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},children:[g({tag:"style",template:vr}),g({if:({props:e})=>!!e.filterable,tag:"input",className:"filter",attributes:{placeholder:"Search...",type:"text"}}),g({tag:"div",className:"wrap",children:[g({tag:"table",children:[g({tag:"thead",template:({props:e,state:t})=>{let r=e.columns??[],a=t;return`<tr>${r.map(n=>{let o=a.sortKey===n.key,s=n.sortable!==!1,i=o?a.sortDir==="asc"?"\u25B2":"\u25BC":"",l=o?a.sortDir==="asc"?"ascending":"descending":"none";return`<th
                        data-col="${Me(n.key)}"
                        class="${s?"sortable":""}"
                        aria-sort="${l}"
                      >${Me(n.label)}<span class="sort">${i}</span></th>`}).join("")}</tr>`}}),g({tag:"tbody",children:[g({tag:"tr",className:"empty",if:({props:e,state:t})=>st(e,t).length===0,template:({props:e})=>`<td colspan="${(e.columns??[]).length||1}">${Me(e.emptyText)}</td>`})],for:{items:({props:e,state:t})=>st(e,t),key:(e,t)=>e["id"]??t,render:(e,t,r)=>{let n=r.props.columns??[],o=e;return g({tag:"tr",attributes:{"data-row-id":String(o.id??t)},template:n.map(s=>`<td>${typeof s.render=="function"?s.render(o):Me(o[s.key]??"")}</td>`).join("")})}}})]})]}),g({tag:"footer",className:"pager",template:({props:e,state:t})=>{let r=t,a=Ee(e,r),n=e.pageSize??10,o=Math.max(1,Math.ceil(a.length/n)),s=Math.min(r.page??0,o-1),i=(e.rows??[]).length;return`
            <span class="count">${a.length} of ${i} rows</span>
            <span class="spacer"></span>
            <button class="prev" type="button" ${s<=0?"disabled":""}>\u2039 prev</button>
            <span class="page">page ${s+1} of ${o}</span>
            <button class="next" type="button" ${s>=o-1?"disabled":""}>next \u203A</button>
          `}})],refs:{filter:".filter"},afterRender(){let e=this,t=e.refs.filter;if(!t)return;let r=e.getState("q")??"";t.value!==r&&(t.value=r);let a=Be.get(e);if(a){Be.delete(e),t.focus();let n=Math.min(a.caret,t.value.length);try{t.setSelectionRange(n,n)}catch{}}},events:{"input .filter":(e,t)=>{let r=e.target;Be.set(t.host,{caret:r.selectionStart??r.value.length}),t.setState("q",r.value),t.setState("page",0)},"click .prev":(e,t)=>{let r=(t.state.page??0)-1;t.setState("page",Math.max(0,r))},"click .next":(e,t)=>{let r=t.state,a=Ee(t.props,r).length,n=t.props.pageSize??10,o=Math.max(0,Math.ceil(a/n)-1),s=(r.page??0)+1;t.setState("page",Math.min(o,s))},"click th.sortable":(e,t)=>{let r=e.target.closest("th");if(!r)return;let a=r.dataset.col;if(!a)return;let n=t.state,o;n.sortKey!==a?o="asc":o=n.sortDir==="asc"?"desc":n.sortDir==="desc"?null:"asc",t.setState("sortKey",o?a:null),t.setState("sortDir",o),t.emit("tc-sort-change",{key:o?a:null,direction:o})},"click tr[data-row-id]":(e,t)=>{let r=e.target.closest("tr[data-row-id]");if(!r)return;let a=r.dataset.rowId;if(a===void 0)return;let n=Ee(t.props,t.state),o=n.find(s=>String(s.id)===a)??n[Number(a)];o&&t.emit("tc-row-click",{row:o})}}}));function Ee(e,t){let r=e.rows??[],a=e.columns??[],n=(t.q??"").trim().toLowerCase(),o=n.length===0?r.slice():r.filter(s=>a.some(i=>String(s[i.key]??"").toLowerCase().includes(n)));if(t.sortKey&&t.sortDir){let s=t.sortKey,i=t.sortDir==="asc"?1:-1;o=o.slice().sort((l,c)=>{let d=l[s],u=c[s];return d===u?0:d==null?1:u==null?-1:typeof d=="number"&&typeof u=="number"?(d-u)*i:String(d).localeCompare(String(u))*i})}return o}function st(e,t){let r=e.pageSize??10,a=Ee(e,t),n=Math.max(1,Math.ceil(a.length/r)),o=Math.min(t.page??0,n-1);return a.slice(o*r,o*r+r)}function Me(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var yr="tc-tabs";h(yr,g({props:{tabs:{type:"json",default:[]},active:{type:"string",default:"",reflect:!0}},theme:{"tc-tabs-fg":"var(--tc-color-ink, #14171f)","tc-tabs-fg-muted":"var(--tc-color-ink-muted, #6b7280)","tc-tabs-rule":"var(--tc-color-rule, #ece5d3)","tc-tabs-accent":"var(--tc-color-accent, #a16939)","tc-tabs-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block","font-family":"var(--tc-tabs-font)"},template:({props:e})=>{let t=e.tabs??[],r=e.active||t[0]?.id||"";return`
        <div role="tablist" class="strip">
          ${t.map(a=>`<button
              role="tab"
              type="button"
              class="tab ${a.id===r?"active":""}"
              data-tab="${ge(a.id)}"
              aria-selected="${a.id===r?"true":"false"}"
              aria-controls="panel-${ge(a.id)}"
              tabindex="${a.id===r?"0":"-1"}"
            >${ge(a.label)}</button>`).join("")}
        </div>
        <div class="panels">
          ${t.map(a=>`<section
              role="tabpanel"
              id="panel-${ge(a.id)}"
              class="panel"
              aria-labelledby=""
              ${a.id===r?"":"hidden"}
            ><slot name="${ge(a.id)}"></slot></section>`).join("")}
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
      `},events:{"click .tab":(e,t)=>{let r=e.target.closest(".tab");if(!r)return;let a=r.dataset.tab;if(!a)return;let n=t.host,o=n.active;o!==a&&(n.active=a,t.emit("tc-tab-change",{active:a,previous:o}))},"keydown .tab":(e,t)=>{let r=e,a=t.props.tabs??[];if(a.length===0)return;let n=t.host,o=n.active||a[0].id,s=a.findIndex(c=>c.id===o),i=s;if(r.key==="ArrowRight")i=(s+1)%a.length;else if(r.key==="ArrowLeft")i=(s-1+a.length)%a.length;else if(r.key==="Home")i=0;else if(r.key==="End")i=a.length-1;else return;r.preventDefault();let l=a[i].id;n.active=l,t.emit("tc-tab-change",{active:l,previous:o}),queueMicrotask(()=>{t.host.shadowRoot?.querySelector(`.tab[data-tab="${l}"]`)?.focus()})}}}));function ge(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var xr="tc-modal";var oe=new WeakMap;h(xr,g({props:{open:{type:"boolean",default:!1,reflect:!0},title:{type:"string",default:""},dismissible:{type:"boolean",default:!0},width:{type:"string",default:"min(560px, 92vw)"}},theme:{"tc-modal-surface":"var(--tc-color-surface, #ffffff)","tc-modal-ink":"var(--tc-color-ink, #14171f)","tc-modal-rule":"var(--tc-color-rule, #ece5d3)","tc-modal-soft":"var(--tc-color-ink-soft, #5a6072)","tc-modal-radius":"var(--tc-radius-lg, 12px)","tc-modal-backdrop":"rgba(20, 23, 31, 0.5)","tc-modal-shadow":"var(--tc-shadow-lg, 0 24px 60px rgba(20, 23, 31, 0.25))","tc-modal-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"contents"},template:({props:e})=>`
      <dialog class="dlg" aria-labelledby="${e.title?"title":""}">
        ${e.title||e.dismissible?`<header class="head">
              ${e.title?`<h2 id="title" class="title">${lt(e.title)}</h2>`:"<span></span>"}
              ${e.dismissible?'<button class="x" type="button" aria-label="Close">\xD7</button>':""}
            </header>`:""}
        <div class="body"><slot></slot></div>
        <footer class="foot"><slot name="footer"></slot></footer>
      </dialog>
      <style>
        .dlg {
          width: ${lt(e.width)};
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
    `,refs:{dialog:".dlg"},events:{"click .x":(e,t)=>{it(t.host,"button")},"click .dlg":(e,t)=>{let r=t.host;if(!r.dismissible)return;let a=t.refs.dialog;a&&e.target===a&&it(r,"backdrop")}},afterRender(){kr(this)},unmount(){let e=oe.get(this);e&&(e.cleanup(),oe.delete(this))}}));function kr(e){let t=e.shadowRoot;if(!t)return;let r=t.querySelector(".dlg");if(!r)return;let a=e.open,n=oe.get(e);if(n&&n.dialog!==r&&(n.cleanup(),oe.delete(e)),a&&!r.open){if(typeof r.showModal=="function")try{r.showModal()}catch{r.setAttribute("open","")}else r.setAttribute("open","");if(!oe.has(e)){let o=()=>{let s=e;s.open&&(s.open=!1,e.dispatchEvent(new CustomEvent("tc-close",{detail:{reason:"escape"},bubbles:!0,composed:!0})))};r.addEventListener("close",o),oe.set(e,{dialog:r,cleanup:()=>r.removeEventListener("close",o)})}}else if(!a&&r.open)try{r.close()}catch{r.removeAttribute("open")}}function it(e,t){e.open&&(e.open=!1,e.dispatchEvent(new CustomEvent("tc-close",{detail:{reason:t},bubbles:!0,composed:!0})))}function lt(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var wr="tc-toast";var me=new WeakMap;h(wr,g({props:{open:{type:"boolean",default:!1,reflect:!0},variant:{type:"string",default:"info"},message:{type:"string",default:""},duration:{type:"number",default:4e3},dismissible:{type:"boolean",default:!0}},theme:{"tc-toast-info":"var(--tc-color-info, #3a5b8c)","tc-toast-success":"var(--tc-color-success, #207a5b)","tc-toast-warning":"var(--tc-color-warning, #a87326)","tc-toast-error":"var(--tc-color-danger, #b3261e)","tc-toast-fg":"var(--tc-color-surface, #ffffff)","tc-toast-radius":"var(--tc-radius-lg, 10px)","tc-toast-shadow":"var(--tc-shadow-lg, 0 12px 30px rgba(20, 23, 31, 0.18))","tc-toast-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},template:({props:e})=>{let t=String(e.variant??"info"),r=t==="success"?"\u2713":t==="warning"?"!":t==="error"?"\u2715":"i";return`
        <div class="toast v-${ct(t)} ${e.open?"open":"closed"}" role="status" aria-live="polite">
          <span class="icon" aria-hidden="true">${r}</span>
          <span class="msg">${e.message?ct(e.message):"<slot></slot>"}</span>
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
      `},events:{"click .x":(e,t)=>dt(t.host,"button")},afterMount(){$r(this)},unmount(){let e=me.get(this);e!==void 0&&(clearTimeout(e),me.delete(this))}}));function $r(e){let t=e,r=me.get(e);if(r!==void 0&&clearTimeout(r),me.delete(e),!t.open||!t.duration||t.duration<=0)return;let a=setTimeout(()=>{t.open&&dt(e,"timeout")},t.duration);me.set(e,a)}function dt(e,t){let r=e;r.open&&(r.open=!1,e.dispatchEvent(new CustomEvent("tc-toast-close",{detail:{reason:t},bubbles:!0,composed:!0})))}function ct(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Mr="tc-stat";h(Mr,g({props:{label:{type:"string",default:""},value:{type:"string",default:""},delta:{type:"string",default:""},trend:{type:"string",default:"neutral"},prefix:{type:"string",default:""},suffix:{type:"string",default:""}},theme:{"tc-stat-surface":"var(--tc-color-surface, #ffffff)","tc-stat-rule":"var(--tc-color-rule, #ece5d3)","tc-stat-label":"var(--tc-color-ink-muted, #6b7280)","tc-stat-value":"var(--tc-color-ink, #14171f)","tc-stat-up":"var(--tc-color-success, #207a5b)","tc-stat-down":"var(--tc-color-danger, #b3261e)","tc-stat-neutral":"var(--tc-color-ink-muted, #6b7280)","tc-stat-radius":"var(--tc-radius-lg, 12px)","tc-stat-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block",height:"100%"},template:({props:e})=>{let t=String(e.trend??"neutral"),r=t==="up"?"\u25B2":t==="down"?"\u25BC":"\u2022";return`
        <div class="card">
          ${e.label?`<div class="label">${se(e.label)}</div>`:""}
          <div class="value">
            ${e.prefix?`<span class="prefix">${se(e.prefix)}</span>`:""}
            <span class="num">${se(e.value)}</span>
            ${e.suffix?`<span class="suffix">${se(e.suffix)}</span>`:""}
          </div>
          ${e.delta?`<div class="delta t-${se(t)}">
                  <span class="arrow" aria-hidden="true">${r}</span>
                  <span>${se(e.delta)}</span>
                </div>`:""}
        </div>
        <style>
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
        </style>
      `}}));function se(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Er="tc-card";h(Er,g({props:{title:{type:"string",default:""},subtitle:{type:"string",default:""},padded:{type:"boolean",default:!0},bordered:{type:"boolean",default:!0},elevated:{type:"boolean",default:!1},size:{type:"string",default:"md"}},theme:{"tc-card-surface":"var(--tc-color-surface, #ffffff)","tc-card-ink":"var(--tc-color-ink, #14171f)","tc-card-soft":"var(--tc-color-ink-soft, #5a6072)","tc-card-rule":"var(--tc-color-rule, #ece5d3)","tc-card-radius":"var(--tc-radius-lg, 12px)","tc-card-shadow":"var(--tc-shadow-md, 0 8px 24px rgba(20, 23, 31, 0.06))","tc-card-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-card-padding-x":"var(--tc-space-5, 20px)","tc-card-padding-y":"var(--tc-space-5, 20px)","tc-card-gap":"var(--tc-space-3, 12px)"},styles:{display:"block"},template:({props:e})=>{let t=!!e.title||!!e.subtitle,r=String(e.size??"md").toLowerCase();return`
        <div class="${["card",`size-${["sm","md","lg"].includes(r)?r:"md"}`,e.bordered?"bordered":"",e.elevated?"elevated":"",e.padded===!1?"nopad":"",t?"has-header":""].filter(Boolean).join(" ")}">
          <div class="media"><slot name="media"></slot></div>
          <div class="head">
            <slot name="header">
              ${e.title?`<div class="title">${ut(e.title)}</div>`:""}
              ${e.subtitle?`<div class="subtitle">${ut(e.subtitle)}</div>`:""}
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
             is slotted into name="header". Rules split to dodge the
             "one invalid selector drops the whole comma-list" trap \u2014
             some browsers parse :has(::slotted(*)) inconsistently, and
             a combined list would lose the simpler .has-header
             selector along with it. */
          .card.has-header .head {
            padding:
              var(--tc-card-padding-y)
              var(--tc-card-padding-x)
              var(--tc-card-gap);
          }
          .card .head:has(::slotted(*)) {
            padding:
              var(--tc-card-padding-y)
              var(--tc-card-padding-x)
              var(--tc-card-gap);
          }
          .card.has-header .head + .body { padding-top: 0; }
          .card .head:has(::slotted(*)) + .body { padding-top: 0; }

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
        </style>
      `}}));function ut(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Sr="tc-badge";h(Sr,g({props:{variant:{type:"string",default:"neutral"},size:{type:"string",default:"md"},pill:{type:"boolean",default:!1}},theme:{"tc-badge-radius":"var(--tc-radius-sm, 6px)","tc-badge-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-badge-neutral-bg":"var(--tc-color-rule, #ece5d3)","tc-badge-neutral-fg":"var(--tc-color-ink, #14171f)","tc-badge-info-bg":"var(--tc-color-info-bg, #dde6f4)","tc-badge-info-fg":"var(--tc-color-info-fg, #1f3a66)","tc-badge-success-bg":"var(--tc-color-success-bg, #dbece2)","tc-badge-success-fg":"var(--tc-color-success-fg, #155b40)","tc-badge-warning-bg":"var(--tc-color-warning-bg, #f5e7cf)","tc-badge-warning-fg":"var(--tc-color-warning-fg, #7a4f0a)","tc-badge-danger-bg":"var(--tc-color-danger-bg, #f4dad7)","tc-badge-danger-fg":"var(--tc-color-danger-fg, #7a1a14)"},styles:{display:"inline-block"},template:({props:e})=>`
      <span class="badge v-${pt(e.variant)} s-${pt(e.size)} ${e.pill?"pill":""}">
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
    `}));function pt(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Tr="tc-skeleton";h(Tr,g({props:{width:{type:"string",default:"100%"},height:{type:"string",default:"1em"},rounded:{type:"boolean",default:!1},pulse:{type:"boolean",default:!0}},theme:{"tc-skeleton-base":"var(--tc-color-rule, #ece5d3)","tc-skeleton-shine":"rgba(255, 255, 255, 0.6)","tc-skeleton-radius":"var(--tc-radius-md, 6px)"},styles:{display:"inline-block","vertical-align":"middle"},template:({props:e})=>`
      <span
        class="bone ${e.pulse?"pulse":""} ${e.rounded?"round":""}"
        aria-hidden="true"
        style="width: ${ft(e.width)}; height: ${ft(e.height)};"
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
    `}));function ft(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Lr="tc-stack";h(Lr,g({props:{gap:{type:"string",default:"4"},align:{type:"string",default:"stretch"}},styles:{display:"block"},template:({props:e})=>`
      <div class="stack" style="--tc-stack-gap: ${Hr(e.gap)}; --tc-stack-align: ${zr(e.align)};">
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
    `}));function Hr(e){let t=String(e??"4").trim();return/^[1-8]$/.test(t)?`var(--tc-space-${t}, ${Cr(t)})`:t}function Cr(e){return{1:"4px",2:"8px",3:"12px",4:"16px",5:"24px",6:"32px",7:"48px",8:"64px"}[e]??"16px"}function zr(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Ar="tc-cluster";h(Ar,g({props:{gap:{type:"string",default:"3"},justify:{type:"string",default:"start"},align:{type:"string",default:"center"},wrap:{type:"boolean",default:!0}},styles:{display:"block"},template:({props:e})=>`
      <div class="cluster" style="
        --tc-cluster-gap: ${Nr(e.gap)};
        --tc-cluster-justify: ${Rr(e.justify)};
        --tc-cluster-align: ${Dr(e.align)};
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
    `}));function Rr(e){let t=String(e??"start").trim();switch(t){case"between":return"space-between";case"around":return"space-around";case"evenly":return"space-evenly";default:return t}}function Nr(e){let t=String(e??"3").trim();return/^[1-8]$/.test(t)?`var(--tc-space-${t}, ${Ir(t)})`:t}function Ir(e){return{1:"4px",2:"8px",3:"12px",4:"16px",5:"24px",6:"32px",7:"48px",8:"64px"}[e]??"12px"}function Dr(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var jr="tc-grid";h(jr,g({props:{min:{type:"string",default:"260px"},gap:{type:"string",default:"4"},columns:{type:"string",default:""}},styles:{display:"block"},template:({props:e})=>{let t=String(e.columns??"").trim();return`
        <div class="grid" style="
          --tc-grid-template: ${t?`repeat(${gt(t)}, minmax(0, 1fr))`:`repeat(auto-fit, minmax(${gt(e.min)}, 1fr))`};
          --tc-grid-gap: ${qr(e.gap)};
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
      `}}));function qr(e){let t=String(e??"4").trim();return/^[1-8]$/.test(t)?`var(--tc-space-${t}, ${Br(t)})`:t}function Br(e){return{1:"4px",2:"8px",3:"12px",4:"16px",5:"24px",6:"32px",7:"48px",8:"64px"}[e]??"16px"}function gt(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var _r="tc-code";var Or='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',Fr='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';h(_r,g({props:{language:{type:"string",default:""},copy:{type:"boolean",default:!1},filename:{type:"string",default:""}},theme:{"tc-code-bg":"var(--tc-code-bg-base, #14171f)","tc-code-ink":"var(--tc-code-ink-base, #efe6d4)","tc-code-rule":"var(--tc-code-rule-base, rgba(255,255,255,0.08))","tc-code-label":"var(--tc-code-label-base, #8a8678)","tc-code-radius":"var(--tc-radius-md, 10px)","tc-code-font":"var(--tc-font-mono, 'JetBrains Mono', ui-monospace, monospace)","tc-code-padding":"var(--tc-space-5, 20px) var(--tc-space-5, 20px)","tc-code-kw":"var(--tc-code-kw-base, #f0a878)","tc-code-str":"var(--tc-code-str-base, #d9b380)","tc-code-com":"var(--tc-code-com-base, #8a8678)","tc-code-num":"var(--tc-code-num-base, #c4d3b8)","tc-code-tag":"var(--tc-code-tag-base, #d49a68)"},styles:{display:"block"},template:({props:e,state:t})=>{let r=e.filename||e.language||"",a=t.copied===!0;return`
        <div class="block">
          ${r||e.copy?`
            <header class="bar">
              <span class="label">${mt(r)}</span>
              ${e.copy?`<button type="button" class="copy" aria-label="Copy code">
                    <span class="copy-icon" aria-hidden="true">${a?Fr:Or}</span>
                    <span class="copy-text">${a?"Copied":"Copy"}</span>
                  </button>`:""}
            </header>
          `:""}
          <pre><code class="code lang-${mt(String(e.language||"txt"))}"><slot></slot></code></pre>
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
      `},events:{"click .copy":(e,t)=>{let r=t.host,a=r.shadowRoot?.querySelector("slot"),o=(a?a.assignedNodes({flatten:!0}):Array.from(r.childNodes)).map(i=>i.textContent??"").join(""),s=()=>{t.setState("copied",!0),t.emit("tc-copy",{text:o}),setTimeout(()=>t.setState("copied",!1),1600)};navigator.clipboard?.writeText?navigator.clipboard.writeText(o).then(s,s):s()}}}));function mt(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Pr="tc-callout";var ht={note:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',info:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',success:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',warning:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',danger:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>'};h(Pr,g({props:{variant:{type:"string",default:"note"},title:{type:"string",default:""},compact:{type:"boolean",default:!1}},theme:{"tc-callout-radius":"var(--tc-radius-md, 8px)","tc-callout-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif)","tc-callout-note-bg":"var(--tc-color-surface-alt, #faf8f3)","tc-callout-note-fg":"var(--tc-color-ink-soft, #4a5061)","tc-callout-note-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-callout-info-bg":"var(--tc-color-info-bg, #dde6f4)","tc-callout-info-fg":"var(--tc-color-info-fg, #1f3a66)","tc-callout-info-border":"var(--tc-color-info, #3a5b8c)","tc-callout-success-bg":"var(--tc-color-success-bg, #dbece2)","tc-callout-success-fg":"var(--tc-color-success-fg, #155b40)","tc-callout-success-border":"var(--tc-color-success, #207a5b)","tc-callout-warning-bg":"var(--tc-color-warning-bg, #f5e7cf)","tc-callout-warning-fg":"var(--tc-color-warning-fg, #7a4f0a)","tc-callout-warning-border":"var(--tc-color-warning, #a87326)","tc-callout-danger-bg":"var(--tc-color-danger-bg, #f4dad7)","tc-callout-danger-fg":"var(--tc-color-danger-fg, #7a1a14)","tc-callout-danger-border":"var(--tc-color-danger, #b3261e)"},styles:{display:"block"},template:({props:e})=>{let t=String(e.variant??"note"),r=ht[t]??ht.note;return`
        <aside
          class="callout v-${bt(t)} ${e.compact?"compact":""}"
          role="${t==="danger"?"alert":"note"}"
        >
          <span class="icon" aria-hidden="true">${r}</span>
          <div class="body">
            ${e.title?`<div class="title">${bt(e.title)}</div>`:""}
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
      `}}));function bt(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Vr="tc-toc";var Se=new WeakMap;h(Vr,g({props:{target:{type:"string",default:"main"},levels:{type:"string",default:"h2,h3"},sticky:{type:"boolean",default:!0},label:{type:"string",default:"On this page"}},theme:{"tc-toc-fg":"var(--tc-color-ink, #14171f)","tc-toc-fg-muted":"var(--tc-color-ink-muted, #6b7280)","tc-toc-active":"var(--tc-color-accent, #a16939)","tc-toc-rule":"var(--tc-color-rule, #ece5d3)","tc-toc-label":"var(--tc-color-ink-soft, #4a5061)","tc-toc-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif)","tc-toc-top":"80px"},styles:{display:"block"},template:({props:e,state:t})=>{let r=t.items??[],a=t.activeId??"";return`
        <nav
          class="toc${e.sticky?" sticky":""}"
          aria-label="Table of contents"
        >
          ${e.label?`<div class="label">${_e(e.label)}</div>`:""}
          ${r.length===0?'<p class="empty">No sections yet.</p>':`<ol class="list">${r.map(n=>`<li class="lvl-${n.level}${n.id===a?" active":""}"><a href="#${_e(n.id)}">${_e(n.text)}</a></li>`).join("")}</ol>`}
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
      `},afterMount(){Gr(this)},unmount(){Se.get(this)?.observer?.disconnect(),Se.delete(this)}}));function Gr(e){Se.get(e)?.observer?.disconnect();let r=e,a=r.target||"main",n=(r.levels||"h2,h3").split(",").map(c=>c.trim().toLowerCase()).filter(Boolean),o=document.querySelector(a);if(!o)return;let s=Array.from(o.querySelectorAll(n.join(","))).filter(c=>c instanceof HTMLElement),i=s.map(c=>(c.id||(c.id=Kr(c.textContent??"")),{id:c.id,level:parseInt(c.tagName.slice(1),10),text:(c.textContent??"").trim()}));if(e.setState("items",i),typeof IntersectionObserver>"u")return;let l=new IntersectionObserver(c=>{let u=c.filter(m=>m.isIntersecting).sort((m,p)=>m.boundingClientRect.top-p.boundingClientRect.top)[0];if(!u)return;let f=u.target.id;f&&e.setState("activeId",f)},{rootMargin:"0px 0px -70% 0px",threshold:0});for(let c of s)l.observe(c);Se.set(e,{observer:l,activeId:""})}function Kr(e){return e.toLowerCase().trim().replace(/[^\w\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-")||"section"}function _e(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Ur="tc-pagination";h(Ur,g({props:{current:{type:"number",default:1},total:{type:"number",default:1},siblings:{type:"number",default:1},boundaries:{type:"number",default:1},size:{type:"string",default:"sm"},"prev-label":{type:"string",default:"Prev"},"next-label":{type:"string",default:"Next"},label:{type:"string",default:"Pagination"}},styles:{display:"block"},template:({props:e})=>{let t=Math.max(1,Number(e.total)|0),r=Yr(Number(e.current)|0,1,t),a=Math.max(0,Number(e.siblings)|0),n=Math.max(0,Number(e.boundaries)|0);if(t<=1)return"";let o=Wr(r,t,a,n),s=Te(String(e.size??"sm")),i=r<=1?" disabled":"",l=r>=t?" disabled":"",c=o.map(d=>{if(d==="\u2026")return'<span class="ellipsis" aria-hidden="true">\u2026</span>';let u=d===r;return`<tc-button
            class="num"
            size="${s}"
            variant="${u?"primary":"ghost"}"
            data-page="${d}"${u?' aria-current="page"':""}
          >${d}</tc-button>`}).join("");return`
        <nav aria-label="${Te(String(e.label??"Pagination"))}">
          <tc-button
            class="prev"
            size="${s}"
            variant="ghost"
            data-page="${r-1}"${i}
          >\u2190 ${Te(String(e["prev-label"]??"Prev"))}</tc-button>
          <span class="pages">${c}</span>
          <tc-button
            class="next"
            size="${s}"
            variant="ghost"
            data-page="${r+1}"${l}
          >${Te(String(e["next-label"]??"Next"))} \u2192</tc-button>
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
      `},events:{"click tc-button":(e,t)=>{let r=e.target.closest("tc-button");if(!r||r.hasAttribute("disabled"))return;let a=r.getAttribute("data-page");if(a==null)return;let n=Number(a),o=t.host,s=Math.max(1,Number(o.total)|0),i=Number(o.current)|0;!Number.isFinite(n)||n<1||n>s||n!==i&&t.emit("tc-page-change",{page:n})}}}));function Yr(e,t,r){return Math.min(r,Math.max(t,e))}function Wr(e,t,r,a){let n=new Set;for(let i=1;i<=Math.min(a,t);i++)n.add(i);for(let i=Math.max(1,t-a+1);i<=t;i++)n.add(i);for(let i=Math.max(1,e-r);i<=Math.min(t,e+r);i++)n.add(i);let o=[...n].sort((i,l)=>i-l),s=[];for(let i=0;i<o.length;i++)i>0&&o[i]-o[i-1]>1&&s.push("\u2026"),s.push(o[i]);return s}function Te(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Xr="tc-combobox";function he(e){if(Array.isArray(e))return e.map(r=>String(r)).filter(Boolean);let t=String(e??"").trim();return t?t.split(",").map(r=>r.trim()).filter(Boolean):[]}function be(e){return e.join(",")}function Jr(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}var Zr=`
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
`;h(Xr,g({formAssociated:!0,props:{value:{type:"string",default:""},name:{type:"string",default:""},options:{type:"json",default:[]},multiple:{type:"boolean",default:!1},searchable:{type:"boolean",default:!0},placeholder:{type:"string",default:""},"empty-text":{type:"string",default:"No results"},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0},max:{type:"number",default:0}},theme:{"tc-input-bg":"var(--tc-color-surface, #ffffff)","tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-border-focus":"var(--tc-color-accent, #a16939)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-radius":"var(--tc-radius-md, 8px)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-combobox-chip-bg":"var(--tc-color-accent-soft, #efe2cf)","tc-combobox-chip-fg":"var(--tc-color-accent-hover, #8a572d)","tc-combobox-popup-bg":"var(--tc-color-surface, #ffffff)","tc-combobox-popup-hover":"var(--tc-color-accent-soft, #efe2cf)","tc-combobox-popup-active":"var(--tc-color-accent-soft, #efe2cf)"},styles:{display:"block"},refs:{search:".search",popup:".popup"},template:({props:e,state:t})=>{let r=e.options??[],a=!!e.multiple,n=e.searchable!==!1,o=!!e.disabled,s=!!e.error,i=he(e.value),l=String(t.query??""),c=!!t.open&&!o,d=Number(t.focusedIndex??-1),u=vt(r,l),f=new Set(i),m=i.map($=>r.find(O=>O.value===$)).filter($=>!!$),p=n&&(c||a&&i.length===0),b=!a&&i.length===1&&(!c||!n),v=i.length===0&&!p&&!b,x=a?m.map($=>`<span class="chip" data-value="${R($.value)}">
              ${$.icon?`<span class="chip-icon">${R($.icon)}</span>`:""}
              <span class="chip-label">${R($.label)}</span>
              <button
                type="button"
                class="chip-remove"
                data-remove="${R($.value)}"
                aria-label="Remove ${R($.label)}"
                ${o?"disabled":""}
              >&times;</button>
            </span>`).join(""):"",y=b&&m[0]?`<span class="single">
            ${m[0].icon?`<span class="single-icon">${R(m[0].icon)}</span>`:""}
            <span class="single-label">${R(m[0].label)}</span>
          </span>`:"",w=v?`<span class="placeholder">${R(e.placeholder??"")}</span>`:"",C=p?`<input
            type="text"
            class="search"
            part="search"
            value="${R(l)}"
            placeholder="${R(i.length===0?e.placeholder??"":"")}"
            ${o?"disabled":""}
            autocomplete="off"
            aria-autocomplete="list"
            aria-expanded="${c?"true":"false"}"
            role="combobox"
          />`:"",H=u.length===0?`<div class="empty">${R(e["empty-text"]??"No results")}</div>`:u.map(($,O)=>{let N=f.has($.value);return`<div
              class="${["option",N?"selected":"",O===d?"focused":"",$.disabled?"disabled":""].filter(Boolean).join(" ")}"
              role="option"
              data-value="${R($.value)}"
              data-index="${O}"
              aria-selected="${N?"true":"false"}"
              ${$.disabled?'aria-disabled="true"':""}
            >
              ${a?`<span class="check" aria-hidden="true">${N?"\u2713":""}</span>`:""}
              ${$.icon?`<span class="opt-icon">${R($.icon)}</span>`:""}
              <span class="opt-label">${R($.label)}</span>
            </div>`}).join(""),j=e.label?`<label class="label">${R(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</label>`:"",de=s?`<div class="helper error">${R(e.error)}</div>`:e.helper?`<div class="helper">${R(e.helper)}</div>`:"";return`
        ${j}
        <div
          class="control ${s?"invalid":""} ${c?"open":""} ${o?"disabled":""}"
          part="control"
          tabindex="${o?"-1":"0"}"
          role="${n?"presentation":"combobox"}"
        >
          <div class="display">
            ${x}${y}${w}${C}
          </div>
          <span class="caret" aria-hidden="true">\u25BE</span>
        </div>
        <div
          class="popup"
          part="popup"
          role="listbox"
          ${a?'aria-multiselectable="true"':""}
          ${c?"":"hidden"}
        >${H}</div>
        ${de}
        ${Zr}
      `},events:{"click .control":(e,t)=>{if(e.target.closest(".chip-remove")||t.host.disabled)return;let n=!!t.getState("open");t.setState("open",!0),n||t.emit("tc-open"),t.refs.search?.focus()},"keydown .control":(e,t)=>{let r=e;if(r.key==="Enter"||r.key===" "){if(r.preventDefault(),t.host.disabled)return;t.setState("open",!0),t.emit("tc-open"),t.refs.search?.focus()}},"input .search":(e,t)=>{let r=e.target.value;t.setState("query",r),t.setState("open",!0),t.setState("focusedIndex",0),t.emit("tc-search",{query:r})},"keydown .search":(e,t)=>{let r=e,a=e.target,n=t.host,o=!!n.multiple,s=n.options??[],i=vt(s,String(t.getState("query")??""));if(r.key==="Backspace"&&a.value===""&&o){let l=he(n.value);l.length>0&&(l.pop(),n.value=be(l),Le(t,l,n),t.emit("tc-change",{value:l.slice()}),r.preventDefault());return}if(r.key==="ArrowDown"){r.preventDefault(),t.setState("open",!0);let l=Number(t.getState("focusedIndex")??-1),c=Math.min(i.length-1,l+1);t.setState("focusedIndex",c);return}if(r.key==="ArrowUp"){r.preventDefault();let l=Number(t.getState("focusedIndex")??0),c=Math.max(0,l-1);t.setState("focusedIndex",c);return}if(r.key==="Enter"){r.preventDefault();let l=Number(t.getState("focusedIndex")??-1);l>=0&&l<i.length&&yt(t,i[l],n);return}if(r.key==="Escape"){r.preventDefault(),t.setState("open",!1),t.setState("query",""),t.emit("tc-close");return}},"mousedown .option":(e,t)=>{e.preventDefault();let r=e.target.closest(".option");if(!r||r.classList.contains("disabled"))return;let a=r.dataset.value;if(a==null)return;let n=t.host,s=(n.options??[]).find(i=>i.value===a);s&&yt(t,s,n)},"click .chip-remove":(e,t)=>{e.stopPropagation();let a=e.target.dataset.remove;if(a==null)return;let n=t.host,o=he(n.value).filter(s=>s!==a);n.value=be(o),Le(t,o,n),t.emit("tc-change",{value:o.slice()})},"focusout .control":(e,t)=>{queueMicrotask(()=>{t.host.matches(":focus-within")||(t.setState("open",!1),t.setState("query",""),t.emit("tc-close"))})}},afterMount(){let e=this;if(!e.multiple||!e.internals)return;let t=he(e.value),r=String(e.name??"");if(!r){e.internals.setFormValue(be(t));return}let a=new FormData;for(let n of t)a.append(r,n);e.internals.setFormValue(a)},afterRender(){let e=this;if(!(e.getState?!!e.getState("open"):!1))return;let r=e.refs?.search??null;if(!r||e.shadowRoot?.activeElement===r)return;r.focus();let n=r.value.length;try{r.setSelectionRange(n,n)}catch{}}}));function vt(e,t){if(!t)return e;let r=new RegExp(Jr(t),"i");return e.filter(a=>r.test(a.label)||r.test(a.value))}function yt(e,t,r){let a=!!r.multiple,n=Number(r.max??0),o=he(r.value);if(a){let s;if(o.includes(t.value))s=o.filter(i=>i!==t.value);else{if(n>0&&o.length>=n)return;s=o.concat(t.value)}r.value=be(s),Le(e,s,r),e.setState("query",""),e.emit("tc-change",{value:s.slice()}),queueMicrotask(()=>{e.refs.search?.focus()})}else r.value=t.value,Le(e,[t.value],r),e.setState("query",""),e.setState("open",!1),e.emit("tc-change",{value:t.value}),e.emit("tc-close")}function Le(e,t,r){let a=r.internals;if(!a)return;let n=String(r.name??"");if(!r.multiple){a.setFormValue(t[0]??"");return}if(!n){a.setFormValue(be(t));return}let o=new FormData;for(let s of t)o.append(n,s);a.setFormValue(o)}function R(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Qr="tc-carousel";function xt(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function He(e){let t=0;for(let r of Array.from(e.children))r instanceof Element&&!r.hasAttribute("slot")&&t++;return t}function $t(e,t,r){return t<=0?0:r?(e%t+t)%t:Math.max(0,Math.min(t-1,e))}function P(e,t){let r=He(e);if(r===0)return;let a=e.value,n=$t(t,r,e.loop);n!==a&&(e.value=n,e.dispatchEvent(new CustomEvent("tc-change",{detail:{index:n,previous:a},bubbles:!0,composed:!0})))}function kt(e){Oe(e),!(e.autoplay<=0)&&(He(e)<=1||(e._carouselTimer=globalThis.setInterval(()=>{P(e,e.value+1)},e.autoplay)))}function Oe(e){e._carouselTimer!==void 0&&(globalThis.clearInterval(e._carouselTimer),e._carouselTimer=void 0)}h(Qr,g({props:{value:{type:"number",default:0,reflect:!0},autoplay:{type:"number",default:0},loop:{type:"boolean",default:!0},orientation:{type:"string",default:"horizontal"},transition:{type:"string",default:"slide"},indicators:{type:"boolean",default:!0},controls:{type:"boolean",default:!0},swipe:{type:"boolean",default:!0},pauseOnHover:{type:"boolean",default:!0},ariaLabel:{type:"string",default:"Carousel"},height:{type:"string",default:""}},theme:{"tc-carousel-radius":"var(--tc-radius-lg, 12px)","tc-carousel-bg":"var(--tc-color-bg, #faf8f3)","tc-carousel-control-bg":"rgba(255, 255, 255, 0.85)","tc-carousel-control-bg-hover":"rgba(255, 255, 255, 1)","tc-carousel-control-fg":"var(--tc-color-ink, #14171f)","tc-carousel-control-size":"36px","tc-carousel-indicator":"rgba(20, 23, 31, 0.25)","tc-carousel-indicator-active":"var(--tc-color-accent, #a16939)","tc-carousel-duration":"320ms"},styles:{display:"block",position:"relative"},template:({props:e})=>{let t=Number(e.value??0),r=String(e.orientation)==="vertical",a=String(e.transition)==="fade",n=String(e.height??""),o=!!e.controls,s=!!e.indicators,i=xt(e.ariaLabel??"Carousel");return`
        <div
          class="root ${r?"v":"h"} ${a?"fade":"slide"}"
          role="region"
          aria-roledescription="carousel"
          aria-label="${i}"
          style="${n?`--tc-carousel-height: ${xt(n)};`:""}--tc-carousel-index: ${t};"
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
      `},events:{"click .prev":(e,t)=>{let r=t.host;P(r,r.value-1)},"click .next":(e,t)=>{let r=t.host;P(r,r.value+1)},"click .dot":(e,t)=>{let r=e.target.closest(".dot");if(!r)return;let a=Number(r.dataset.index);if(!Number.isFinite(a))return;let n=t.host;P(n,a)},"keydown .root":(e,t)=>{let r=e,a=t.host,n=a.orientation==="vertical",o=He(a),s=n?"ArrowUp":"ArrowLeft",i=n?"ArrowDown":"ArrowRight";r.key===s?(r.preventDefault(),P(a,a.value-1)):r.key===i?(r.preventDefault(),P(a,a.value+1)):r.key==="Home"?(r.preventDefault(),P(a,0)):r.key==="End"&&(r.preventDefault(),P(a,o-1))}},afterMount(){let e=this,t=()=>wt(e),r=new MutationObserver(t);r.observe(e,{childList:!0});let a=e.shadowRoot,n=a?.querySelector("slot"),o=()=>t();n?.addEventListener("slotchange",o),e._carouselSlotObs=()=>{r.disconnect(),n?.removeEventListener("slotchange",o)};let s=()=>Oe(e),i=()=>{e.pauseOnHover&&kt(e)};e.addEventListener("pointerenter",s),e.addEventListener("pointerleave",i),e.addEventListener("focusin",s),e.addEventListener("focusout",i),e._carouselHover=()=>{e.removeEventListener("pointerenter",s),e.removeEventListener("pointerleave",i),e.removeEventListener("focusin",s),e.removeEventListener("focusout",i)},ea(e),a?.querySelector(".root")?.setAttribute("tabindex","0"),t(),e.autoplay>0&&kt(e)},afterRender(){wt(this)},unmount(){let e=this;Oe(e),e._carouselSlotObs?.(),e._carouselHover?.(),e._carouselDrag?.()}}));function wt(e){let t=He(e),r=e.shadowRoot;if(!r)return;let a=r.querySelector(".root");if(a&&t>0){let i=$t(e.value,t,e.loop);i!==e.value&&(e.value=i),a.style.setProperty("--tc-carousel-index",String(i))}let n=r.querySelector(".indicators");if(n){let i=e.value,l="";for(let c=0;c<t;c++)l+=`<button type="button" class="dot" role="tab" data-index="${c}"
        aria-current="${c===i?"true":"false"}"
        aria-label="Go to slide ${c+1}"></button>`;n.innerHTML=l}if(Array.from(e.children).filter(i=>i instanceof HTMLElement&&!i.hasAttribute("slot")).forEach((i,l)=>{i.setAttribute("role","group"),i.setAttribute("aria-roledescription","slide"),i.setAttribute("aria-label",`${l+1} of ${t}`),e.transition==="fade"?i.classList.toggle("is-active",l===e.value):i.classList.remove("is-active")}),!e.loop){let i=r.querySelector(".ctrl.prev"),l=r.querySelector(".ctrl.next");i&&(i.disabled=e.value<=0),l&&(l.disabled=e.value>=t-1)}let s=r.querySelector(".sr-status");s&&t>0&&(s.textContent=`Slide ${e.value+1} of ${t}`)}function ea(e){let t=0,r=0,a=!1,n=40,o=l=>{e.swipe&&(l.button!==0&&l.pointerType==="mouse"||(t=l.clientX,r=l.clientY,a=!0))},s=l=>{if(!a)return;a=!1;let c=l.clientX-t,d=l.clientY-r,f=e.orientation==="vertical"?d:c;Math.abs(f)<n||P(e,e.value+(f<0?1:-1))},i=()=>{a=!1};e.addEventListener("pointerdown",o),e.addEventListener("pointerup",s),e.addEventListener("pointercancel",i),e._carouselDrag=()=>{e.removeEventListener("pointerdown",o),e.removeEventListener("pointerup",s),e.removeEventListener("pointercancel",i)}}var ta="tc-accordion";h(ta,g({props:{mode:{type:"string",default:"single"},bordered:{type:"boolean",default:!0}},theme:{"tc-accordion-bg":"var(--tc-color-surface, #ffffff)","tc-accordion-ink":"var(--tc-color-ink, #14171f)","tc-accordion-ink-soft":"var(--tc-color-ink-soft, #4a5061)","tc-accordion-rule":"var(--tc-color-rule, #ece5d3)","tc-accordion-radius":"var(--tc-radius-md, 8px)","tc-accordion-accent":"var(--tc-color-accent, #a16939)","tc-accordion-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},template:({props:e})=>`
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
    `,afterMount(){let e=this,t=o=>{let s=o.target;if(!(!s||s.tagName!=="DETAILS")){if(e.mode==="single"&&s.open)for(let i of Ce(e))i!==s&&i.open&&(i.open=!1);ra(e)}},r=o=>{let s=o.target;if(!s||s.tagName!=="SUMMARY")return;let i=Ce(e).map(d=>d.querySelector("summary")).filter(d=>!!d),l=i.indexOf(s);if(l===-1)return;let c=-1;o.key==="ArrowDown"?c=(l+1)%i.length:o.key==="ArrowUp"?c=(l-1+i.length)%i.length:o.key==="Home"?c=0:o.key==="End"&&(c=i.length-1),c!==-1&&(o.preventDefault(),i[c]?.focus())};e.addEventListener("toggle",t,!0),e.addEventListener("keydown",r);let a=()=>{for(let o of Ce(e)){let s=o.querySelector(":scope > summary");if(s&&!s.querySelector(".tc-accordion-caret")){let i=document.createElement("span");i.className="tc-accordion-caret",i.setAttribute("aria-hidden","true"),i.style.cssText="display:inline-block;flex:0 0 auto;transition:transform .2s ease;color:var(--tc-color-ink-muted,#6b7280);font-size:0.8rem;",i.textContent="\u25B8",s.appendChild(i);let l=()=>{i.style.transform=o.open?"rotate(90deg)":"rotate(0)"};l(),o.addEventListener("toggle",l)}}};a();let n=new MutationObserver(a);n.observe(e,{childList:!0,subtree:!1}),e._accordionCleanup=()=>{e.removeEventListener("toggle",t,!0),e.removeEventListener("keydown",r),n.disconnect()}},unmount(){this._accordionCleanup?.()}}));function Ce(e){let t=[];for(let r of Array.from(e.children))r instanceof HTMLDetailsElement&&t.push(r);return t}function ra(e){let t=[];for(let r of Ce(e))if(r.open){let a=r.id||r.querySelector("summary")?.textContent?.trim()||"";t.push(a)}e.dispatchEvent(new CustomEvent("tc-change",{detail:{open:t},bubbles:!0,composed:!0}))}var aa="tc-tooltip";function na(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}h(aa,g({props:{text:{type:"string",default:""},placement:{type:"string",default:"top"},delay:{type:"number",default:200},offset:{type:"number",default:8},disabled:{type:"boolean",default:!1}},theme:{"tc-tooltip-bg":"var(--tc-color-ink, #14171f)","tc-tooltip-fg":"var(--tc-color-surface, #ffffff)","tc-tooltip-radius":"var(--tc-radius-sm, 6px)","tc-tooltip-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-tooltip-shadow":"0 10px 30px rgba(0, 0, 0, 0.25)","tc-tooltip-padding":"6px 10px","tc-tooltip-max-width":"240px"},styles:{display:"inline-block",position:"relative"},template:({props:e})=>`
      <span class="trigger" tabindex="-1"><slot></slot></span>
      <div
        class="tip"
        popover="manual"
        role="tooltip"
        part="tip"
      >
        ${e.text?`<span class="tip-text">${na(e.text)}</span>`:""}
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
    `,afterMount(){let e=this,t=e.shadowRoot;if(!t)return;let r=t.querySelector(".tip");if(!r)return;let a=()=>{e.disabled||(clearTimeout(e._tooltipTimer),e._tooltipTimer=globalThis.setTimeout(()=>{if(typeof r.showPopover=="function")try{r.showPopover()}catch{r.style.visibility="visible",r.style.opacity="1"}else r.style.visibility="visible",r.style.opacity="1";Mt(e,r)},Math.max(0,e.delay)))},n=()=>{clearTimeout(e._tooltipTimer);try{typeof r.hidePopover=="function"&&r.hidePopover()}catch{}r.style.opacity="",r.style.visibility=""},o=i=>{i.key==="Escape"&&n()};e.addEventListener("pointerenter",a),e.addEventListener("pointerleave",n),e.addEventListener("focusin",a),e.addEventListener("focusout",n),e.addEventListener("keydown",o);let s=()=>{r.matches(":popover-open")&&Mt(e,r)};globalThis.addEventListener("scroll",s,!0),globalThis.addEventListener("resize",s),e._tooltipCleanup=()=>{clearTimeout(e._tooltipTimer),e.removeEventListener("pointerenter",a),e.removeEventListener("pointerleave",n),e.removeEventListener("focusin",a),e.removeEventListener("focusout",n),e.removeEventListener("keydown",o),globalThis.removeEventListener("scroll",s,!0),globalThis.removeEventListener("resize",s),n()}},unmount(){this._tooltipCleanup?.()}}));function Mt(e,t){let r=e.getBoundingClientRect();t.style.top="0px",t.style.left="0px";let a=t.getBoundingClientRect(),n=globalThis.innerWidth,o=globalThis.innerHeight,s=e.offset,i=e.placement||"top",l=u=>u==="top"?r.top-a.height-s>=4:u==="bottom"?r.bottom+a.height+s<=o-4:u==="left"?r.left-a.width-s>=4:u==="right"?r.right+a.width+s<=n-4:!0;if(!l(i)){let u={top:"bottom",bottom:"top",left:"right",right:"left"};l(u[i]??"top")&&(i=u[i])}let c=0,d=0;i==="top"?(c=r.top-a.height-s,d=r.left+r.width/2-a.width/2):i==="bottom"?(c=r.bottom+s,d=r.left+r.width/2-a.width/2):i==="left"?(c=r.top+r.height/2-a.height/2,d=r.left-a.width-s):i==="right"&&(c=r.top+r.height/2-a.height/2,d=r.right+s),c=Math.max(4,Math.min(o-a.height-4,c)),d=Math.max(4,Math.min(n-a.width-4,d)),t.style.top=`${c}px`,t.style.left=`${d}px`,t.dataset.placement=i}var oa="tc-popover";h(oa,g({props:{open:{type:"boolean",default:!1,reflect:!0},placement:{type:"string",default:"bottom"},offset:{type:"number",default:8},dismissible:{type:"boolean",default:!0}},theme:{"tc-popover-bg":"var(--tc-color-surface, #ffffff)","tc-popover-fg":"var(--tc-color-ink, #14171f)","tc-popover-rule":"var(--tc-color-rule, #ece5d3)","tc-popover-radius":"var(--tc-radius-md, 8px)","tc-popover-shadow":"var(--tc-shadow-lg, 0 24px 60px rgba(20, 23, 31, 0.18))","tc-popover-padding":"12px 14px","tc-popover-min-width":"200px","tc-popover-max-width":"340px","tc-popover-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"inline-block",position:"relative"},template:()=>`
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
    `,events:{"click .trigger-wrap":(e,t)=>{let r=t.host;r.open=!r.open}},afterRender(){Et(this)},afterMount(){let e=this,t=n=>{!e.open||!e.dismissible||n.composedPath().includes(e)||(e.open=!1,e.dispatchEvent(new CustomEvent("tc-close",{detail:{reason:"outside"},bubbles:!0,composed:!0})))},r=n=>{!e.open||!e.dismissible||n.key==="Escape"&&(e.open=!1,e.dispatchEvent(new CustomEvent("tc-close",{detail:{reason:"escape"},bubbles:!0,composed:!0})))},a=()=>{let n=e.shadowRoot?.querySelector(".panel");n?.matches(":popover-open")&&St(e,n)};document.addEventListener("click",t,!0),document.addEventListener("keydown",r),globalThis.addEventListener("scroll",a,!0),globalThis.addEventListener("resize",a),e._popoverCleanup=()=>{document.removeEventListener("click",t,!0),document.removeEventListener("keydown",r),globalThis.removeEventListener("scroll",a,!0),globalThis.removeEventListener("resize",a)},Et(e)},unmount(){this._popoverCleanup?.()}}));function Et(e){let t=e.shadowRoot;if(!t)return;let r=t.querySelector(".panel");if(!r)return;let a=e.open,n=typeof r.showPopover=="function";if(a&&!r.matches(":popover-open")){if(n)try{r.showPopover()}catch{r.style.display="block"}else r.style.display="block";St(e,r),e.dispatchEvent(new CustomEvent("tc-open",{bubbles:!0,composed:!0}))}else if(!a&&r.matches(":popover-open"))if(n)try{r.hidePopover()}catch{r.style.display="none"}else r.style.display="none"}function St(e,t){let r=e.getBoundingClientRect();t.style.top="0px",t.style.left="0px";let a=t.getBoundingClientRect(),n=globalThis.innerWidth,o=globalThis.innerHeight,s=e.offset,i=e.placement||"bottom",l=u=>u==="top"?r.top-a.height-s>=4:u==="bottom"?r.bottom+a.height+s<=o-4:u==="left"?r.left-a.width-s>=4:u==="right"?r.right+a.width+s<=n-4:!0;if(!l(i)){let u={top:"bottom",bottom:"top",left:"right",right:"left"};l(u[i]??"bottom")&&(i=u[i])}let c=0,d=0;i==="top"?(c=r.top-a.height-s,d=r.left+r.width/2-a.width/2):i==="bottom"?(c=r.bottom+s,d=r.left+r.width/2-a.width/2):i==="left"?(c=r.top+r.height/2-a.height/2,d=r.left-a.width-s):i==="right"&&(c=r.top+r.height/2-a.height/2,d=r.right+s),c=Math.max(4,Math.min(o-a.height-4,c)),d=Math.max(4,Math.min(n-a.width-4,d)),t.style.top=`${c}px`,t.style.left=`${d}px`}var sa="tc-drawer";var ie=new WeakMap;function Fe(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}h(sa,g({props:{open:{type:"boolean",default:!1,reflect:!0},side:{type:"string",default:"right"},size:{type:"string",default:"min(420px, 92vw)"},dismissible:{type:"boolean",default:!0},title:{type:"string",default:""}},theme:{"tc-drawer-bg":"var(--tc-color-surface, #ffffff)","tc-drawer-ink":"var(--tc-color-ink, #14171f)","tc-drawer-rule":"var(--tc-color-rule, #ece5d3)","tc-drawer-soft":"var(--tc-color-ink-soft, #5a6072)","tc-drawer-shadow":"var(--tc-shadow-lg, 0 24px 60px rgba(20, 23, 31, 0.25))","tc-drawer-backdrop":"rgba(20, 23, 31, 0.5)","tc-drawer-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-drawer-duration":"260ms"},styles:{display:"contents"},template:({props:e})=>{let t=String(e.side??"right"),r=Fe(e.size??"min(420px, 92vw)");return`
        <dialog
          class="dlg side-${Fe(t)}"
          aria-labelledby="${e.title?"title":""}"
          style="--tc-drawer-size: ${r};"
        >
          ${e.title||e.dismissible?`<header class="head">
                ${e.title?`<h2 id="title" class="title">${Fe(e.title)}</h2>`:"<span></span>"}
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
      `},refs:{dialog:".dlg"},events:{"click .x":(e,t)=>{Tt(t.host,"button")},"click .dlg":(e,t)=>{let r=t.host;if(!r.dismissible)return;let a=t.refs.dialog;a&&e.target===a&&Tt(r,"backdrop")}},afterRender(){ia(this)},unmount(){let e=ie.get(this);e&&(e.cleanup(),ie.delete(this))}}));function ia(e){let t=e.shadowRoot;if(!t)return;let r=t.querySelector(".dlg");if(!r)return;let a=e.open,n=ie.get(e);if(n&&n.dialog!==r&&(n.cleanup(),ie.delete(e)),a&&!r.open){if(typeof r.showModal=="function")try{r.showModal()}catch{r.setAttribute("open","")}else r.setAttribute("open","");if(!ie.has(e)){let o=()=>{let s=e;s.open&&(s.open=!1,e.dispatchEvent(new CustomEvent("tc-close",{detail:{reason:"escape"},bubbles:!0,composed:!0})))};r.addEventListener("close",o),ie.set(e,{dialog:r,cleanup:()=>r.removeEventListener("close",o)})}}else if(!a&&r.open)try{r.close()}catch{r.removeAttribute("open")}}function Tt(e,t){e.open&&(e.open=!1,e.dispatchEvent(new CustomEvent("tc-close",{detail:{reason:t},bubbles:!0,composed:!0})))}var la="tc-progress";function le(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ca(e,t){return!Number.isFinite(e)||!Number.isFinite(t)||t<=0?0:Math.max(0,Math.min(100,e/t*100))}h(la,g({props:{value:{type:"number",default:0},max:{type:"number",default:100},variant:{type:"string",default:"linear"},size:{type:"string",default:"md"},indeterminate:{type:"boolean",default:!1},showLabel:{type:"boolean",default:!1},label:{type:"string",default:""}},theme:{"tc-progress-track":"var(--tc-color-rule, #ece5d3)","tc-progress-fill":"var(--tc-color-accent, #a16939)","tc-progress-radius":"999px","tc-progress-fg":"var(--tc-color-ink, #14171f)","tc-progress-font":"var(--tc-font-mono, 'JetBrains Mono', monospace)"},styles:{display:"inline-block"},template:({props:e})=>{let t=String(e.variant??"linear"),r=String(e.size??"md"),a=!!e.indeterminate,n=Number(e.value??0),o=Number(e.max??100),s=ca(n,o),i=e.label||(a?"Loading\u2026":`${Math.round(s)}%`);if(t==="circular"){let d=r==="sm"?28:r==="lg"?72:48,u=r==="sm"?3:r==="lg"?6:4,f=(d-u)/2,m=2*Math.PI*f,p=a?m*.25:s/100*m,b=a?`role="progressbar" aria-valuetext="${le(i)}"`:`role="progressbar" aria-valuenow="${n}" aria-valuemin="0" aria-valuemax="${o}"`;return`
          <div class="circ size-${le(r)} ${a?"indet":""}" ${b}>
            <svg viewBox="0 0 ${d} ${d}" width="${d}" height="${d}" aria-hidden="true">
              <circle class="track" cx="${d/2}" cy="${d/2}" r="${f}" stroke-width="${u}" fill="none" />
              <circle
                class="fill"
                cx="${d/2}" cy="${d/2}" r="${f}"
                stroke-width="${u}" fill="none"
                stroke-dasharray="${p.toFixed(3)} ${(m-p).toFixed(3)}"
                stroke-dashoffset="${(m/4).toFixed(3)}"
                stroke-linecap="round"
              />
            </svg>
            ${e.showLabel?`<span class="label" aria-hidden="true">${le(i)}</span>`:""}
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
        `}let l=r==="sm"?4:r==="lg"?12:8,c=a?`role="progressbar" aria-valuetext="${le(i)}"`:`role="progressbar" aria-valuenow="${n}" aria-valuemin="0" aria-valuemax="${o}"`;return`
        <div class="bar size-${le(r)} ${a?"indet":""}" ${c}>
          <div class="track">
            <div class="fill" style="width: ${s.toFixed(2)}%"></div>
          </div>
          ${e.showLabel?`<span class="label" aria-hidden="true">${le(i)}</span>`:""}
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
      `}}));var da="tc-stepper";function Lt(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}h(da,g({props:{steps:{type:"json",default:[]},active:{type:"number",default:0,reflect:!0},orientation:{type:"string",default:"horizontal"},clickable:{type:"boolean",default:!1}},theme:{"tc-stepper-bg":"transparent","tc-stepper-ink":"var(--tc-color-ink, #14171f)","tc-stepper-soft":"var(--tc-color-ink-soft, #4a5061)","tc-stepper-rule":"var(--tc-color-rule, #ece5d3)","tc-stepper-accent":"var(--tc-color-accent, #a16939)","tc-stepper-done":"var(--tc-color-success, #2f7a52)","tc-stepper-radius":"999px","tc-stepper-marker-size":"28px","tc-stepper-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},template:({props:e})=>{let t=e.steps??[],r=Number(e.active??0),a=String(e.orientation)==="vertical",n=!!e.clickable,o=t.map((s,i)=>{let l=i<r?"done":i===r?"current":"upcoming",c=l==="done"?'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>':`${i+1}`;return`
          <li class="step state-${l}" data-index="${i}">
            <${n?"button":"div"} class="row" ${n?`type="button" aria-current="${l==="current"?"step":"false"}"`:`aria-current="${l==="current"?"step":"false"}"`}>
              <span class="marker" aria-hidden="true">${c}</span>
              <span class="text">
                <span class="title">${Lt(s.title)}</span>
                ${s.description?`<span class="desc">${Lt(s.description)}</span>`:""}
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
      `},events:{"click .row":(e,t)=>{let r=t.host;if(!r.clickable)return;let a=e.target.closest(".step");if(!a)return;let n=Number(a.dataset.index);if(!Number.isFinite(n)||n===r.active)return;let o=r.active;r.active=n,t.emit("tc-step-change",{active:n,previous:o})}}}));var ua="tc-avatar";function V(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ht(e){let t=e.trim().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].slice(0,2).toUpperCase():(t[0][0]+t[t.length-1][0]).toUpperCase()}var Pe=[["#dde6f4","#1f3a66"],["#dbece2","#155b40"],["#efe2cf","#8a572d"],["#f4dad7","#7a1a14"],["#e3dcf1","#3d2a73"],["#d5e8e5","#0d4f49"],["#fbe3c5","#7a4f0a"]];function pa(e){if(!e)return Pe[0];let t=0;for(let a=0;a<e.length;a++)t=t*31+e.charCodeAt(a)|0;let r=Math.abs(t)%Pe.length;return Pe[r]}h(ua,g({props:{src:{type:"string",default:""},alt:{type:"string",default:""},name:{type:"string",default:""},size:{type:"string",default:"md"},shape:{type:"string",default:"circle"},status:{type:"string",default:""},ring:{type:"boolean",default:!1}},theme:{"tc-avatar-bg":"var(--tc-color-rule, #ece5d3)","tc-avatar-fg":"var(--tc-color-ink, #14171f)","tc-avatar-ring":"var(--tc-color-surface, #ffffff)","tc-avatar-status-online":"#2f7a52","tc-avatar-status-away":"#d7a52f","tc-avatar-status-busy":"#b3261e","tc-avatar-status-offline":"#9aa0a6","tc-avatar-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"inline-block",position:"relative","vertical-align":"middle"},template:({props:e})=>{let t=String(e.name??""),r=String(e.src??""),a=String(e.alt??"")||t||"avatar",n=String(e.size??"md"),o=String(e.shape??"circle"),s=String(e.status??""),i=!!e.ring,[l,c]=pa(t);return`
        <span class="root size-${V(n)} shape-${V(o)} ${i?"ringed":""}"
              style="--tc-avatar-tint-bg: ${l}; --tc-avatar-tint-fg: ${c};">
          ${r?`<img src="${V(r)}" alt="${V(a)}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'fallback',textContent:'${V(Ht(t))}'}))">`:`<span class="fallback" aria-label="${V(a)}">${V(Ht(t))}</span>`}
          ${s?`<span class="status status-${V(s)}" aria-label="${V(s)}"></span>`:""}
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
      `}}));var fa="tc-avatar-group";h(fa,g({props:{max:{type:"number",default:4},spacing:{type:"string",default:"normal"},size:{type:"string",default:"md"}},theme:{"tc-avatar-group-ring":"var(--tc-color-surface, #ffffff)","tc-avatar-group-overflow-bg":"var(--tc-color-rule, #ece5d3)","tc-avatar-group-overflow-fg":"var(--tc-color-ink, #14171f)"},styles:{display:"inline-flex"},template:()=>`
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
    `,afterMount(){let e=this,t=()=>Ct(e);t();let r=new MutationObserver(t);r.observe(e,{childList:!0}),e._agroupCleanup=()=>r.disconnect()},afterRender(){Ct(this)},unmount(){this._agroupCleanup?.()}}));function Ct(e){let t=Math.max(0,Number(e.max??4)),r=String(e.size??"md"),a=Array.from(e.children).filter(l=>l instanceof HTMLElement),n=0;for(let l of a)l.tagName.toLowerCase()==="tc-avatar"&&(l.getAttribute("size")||l.setAttribute("size",r),n<t||t===0?(l.hidden=!1,n++):l.hidden=!0);let o=a.filter(l=>l.tagName.toLowerCase()==="tc-avatar").length,s=Math.max(0,o-n),i=e.shadowRoot?.querySelector(".overflow");i&&(s>0?(i.hidden=!1,i.textContent=`+${s}`):i.hidden=!0)}var ga="tc-rating";function zt(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var At="M12 17.27 18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z";h(ga,g({props:{value:{type:"number",default:0,reflect:!0},max:{type:"number",default:5},readonly:{type:"boolean",default:!1,reflect:!0},allowHalf:{type:"boolean",default:!1},size:{type:"string",default:"md"},ariaLabel:{type:"string",default:"Rating"}},theme:{"tc-rating-fill":"var(--tc-color-warning, #d7a52f)","tc-rating-track":"var(--tc-color-rule, #ece5d3)"},styles:{display:"inline-block"},template:({props:e,state:t})=>{let r=Math.max(1,Number(e.max??5)),a=Number(e.value??0),n=Number(t.hover??-1),o=n>=0?n:a,s=String(e.size??"md"),i=!!e.readonly,l=!!e.allowHalf,c=zt(e.ariaLabel??"Rating"),d=s==="sm"?18:s==="lg"?32:24,u=[];for(let f=1;f<=r;f++){let m=o-(f-1),p=m>=1?100:m>=.5&&l?50:m>0&&!l?100:0,b=p===50;u.push(`
          <span class="star ${b?"half":p===100?"full":"empty"}" data-index="${f}">
            <svg viewBox="0 0 24 24" width="${d}" height="${d}" aria-hidden="true">
              <path class="track" d="${At}" fill="var(--tc-rating-track)" />
              ${p>0?`<path class="fill" d="${At}" fill="var(--tc-rating-fill)" clip-path="${b?"inset(0 50% 0 0)":"none"}" />`:""}
            </svg>
            ${l&&!i?`<span class="hit-left" data-index="${f}" data-half="1"></span>
                 <span class="hit-right" data-index="${f}" data-half="0"></span>`:""}
          </span>
        `)}return`
        <div
          class="root size-${zt(s)} ${i?"readonly":""}"
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
      `},events:{"click .star":(e,t)=>{let r=t.host;if(r.readonly)return;let a=e.target,n=a.closest(".hit-left, .hit-right"),o=a.closest(".star");if(!o)return;let s=Number(o.dataset.index);if(!Number.isFinite(s))return;let i=s;n?.dataset.half==="1"&&r.allowHalf&&(i=s-.5),i===r.value&&(i=0);let l=r.value;r.value=i,t.emit("tc-change",{value:i,previous:l})},"mouseover .star":(e,t)=>{let r=t.host;if(r.readonly)return;let a=e.target,n=a.closest(".hit-left, .hit-right"),o=a.closest(".star");if(!o)return;let s=Number(o.dataset.index);if(!Number.isFinite(s))return;let i=s;n?.dataset.half==="1"&&r.allowHalf&&(i=s-.5),t.setState("hover",i)},"mouseleave .root":(e,t)=>{t.setState("hover",-1)},"keydown .root":(e,t)=>{let r=e,a=t.host;if(a.readonly)return;let n=a.allowHalf?.5:1,o=a.value,s=o;if(r.key==="ArrowRight"||r.key==="ArrowUp")s=Math.min(a.max,o+n);else if(r.key==="ArrowLeft"||r.key==="ArrowDown")s=Math.max(0,o-n);else if(r.key==="Home")s=0;else if(r.key==="End")s=a.max;else return;r.preventDefault(),s!==o&&(a.value=s,t.emit("tc-change",{value:s,previous:o}))}}}));var ma="tc-slider";function ze(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}h(ma,g({props:{value:{type:"number",default:0,reflect:!0},min:{type:"number",default:0},max:{type:"number",default:100},step:{type:"number",default:1},disabled:{type:"boolean",default:!1,reflect:!0},showValue:{type:"boolean",default:!1},showTicks:{type:"boolean",default:!1},label:{type:"string",default:""},suffix:{type:"string",default:""}},theme:{"tc-slider-track":"var(--tc-color-rule, #ece5d3)","tc-slider-fill":"var(--tc-color-accent, #a16939)","tc-slider-thumb":"var(--tc-color-surface, #ffffff)","tc-slider-thumb-ring":"var(--tc-color-accent, #a16939)","tc-slider-radius":"999px","tc-slider-thumb-size":"20px","tc-slider-track-size":"6px","tc-slider-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-slider-fg":"var(--tc-color-ink, #14171f)","tc-slider-fg-muted":"var(--tc-color-ink-muted, #6b7280)"},styles:{display:"block"},template:({props:e})=>{let t=Number(e.value??0),r=Number(e.min??0),a=Number(e.max??100),n=Number(e.step??1),o=!!e.disabled,s=a>r?(t-r)/(a-r)*100:0,i=String(e.label??""),l=String(e.suffix??""),c=!!e.showValue,d=!!e.showTicks,u="";if(d&&n>0){let f=Math.floor((a-r)/n)+1;if(f<=50){let m=[];for(let p=0;p<f;p++){let v=(r+p*n-r)/(a-r)*100;m.push(`<span class="tick" style="left:${v.toFixed(2)}%"></span>`)}u=m.join("")}}return`
        ${i||c?`<div class="head">
              ${i?`<label for="r" class="lbl">${ze(i)}</label>`:"<span></span>"}
              ${c?`<span class="val">${ze(String(t))}${ze(l)}</span>`:""}
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
            aria-valuetext="${ze(String(t)+l)}"
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
      `},refs:{range:".range"},events:{"input .range":(e,t)=>{let r=e.target,a=t.host,n=Number(r.value);a.value!==n&&(a.value=n,t.emit("tc-input",{value:n}))},"change .range":(e,t)=>{let r=e.target,a=t.host,n=Number(r.value);t.emit("tc-change",{value:n,previous:a.value})}}}));var ha="tc-chart";function Rt(e,t){if(e<=0)return 1;let r=Math.floor(Math.log10(e)),a=e/Math.pow(10,r),n;return t?a<1.5?n=1:a<3?n=2:a<7?n=5:n=10:a<=1?n=1:a<=2?n=2:a<=5?n=5:n=10,n*Math.pow(10,r)}function ba(e,t,r=5){if(e===t){let l=Math.abs(e)||1;return{min:e-l,max:t+l,ticks:[e-l,e,e+l]}}let a=Rt(t-e,!1),n=Rt(a/(r-1),!0),o=Math.floor(e/n)*n,s=Math.ceil(t/n)*n,i=[];for(let l=o;l<=s+n*.5;l+=n)i.push(Number(l.toFixed(10)));return{min:o,max:s,ticks:i}}function Ve(e,t){if(e.length===0)return"";if(e.length===1||!t)return"M "+e.map(a=>`${a.x} ${a.y}`).join(" L ");let r=`M ${e[0].x} ${e[0].y}`;for(let a=0;a<e.length-1;a++){let n=e[a-1]??e[a],o=e[a],s=e[a+1],i=e[a+2]??s,l=o.x+(s.x-n.x)/6,c=o.y+(s.y-n.y)/6,d=s.x-(i.x-o.x)/6,u=s.y-(i.y-o.y)/6;r+=` C ${l},${c} ${d},${u} ${s.x},${s.y}`}return r}function ve(e,t,r,a){return{x:e+r*Math.sin(a),y:t-r*Math.cos(a)}}function va(e,t,r,a,n,o){let s=o-n>Math.PI?1:0,i=ve(e,t,r,n),l=ve(e,t,r,o);if(a<=0)return`M ${e} ${t} L ${i.x} ${i.y} A ${r} ${r} 0 ${s} 1 ${l.x} ${l.y} Z`;let c=ve(e,t,a,o),d=ve(e,t,a,n);return`M ${i.x} ${i.y} A ${r} ${r} 0 ${s} 1 ${l.x} ${l.y} L ${c.x} ${c.y} A ${a} ${a} 0 ${s} 0 ${d.x} ${d.y} Z`}function M(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Z(e){if(!Number.isFinite(e))return"";let t=Math.abs(e);return t>=1e6?(e/1e6).toFixed(1).replace(/\.0$/,"")+"M":t>=1e3?(e/1e3).toFixed(1).replace(/\.0$/,"")+"K":t>0&&t<1?e.toFixed(2):String(Math.round(e*100)/100)}function ye(e,t){return t[e%t.length]}function ya(e,t){let{data:r,smooth:a,stacked:n,showAxes:o,showGrid:s,showLabels:i,showValues:l}=e,c=r.labels??[],d=r.series??[],u=t==="sparkline",f=u?4:16,m=u?4:o&&i?28:8,p=u?4:o?44:8,b=u?4:12,v=e.W-p-b,x=e.H-f-m,y=1/0,w=-1/0;if(n&&d.length>0){let S=c.length>0?c.map((k,L)=>d.reduce((z,q)=>z+(q.values?.[L]??0),0)):[];for(let k of S)k<y&&(y=k),k>w&&(w=k);y>0&&(y=0)}else for(let S of d)for(let k of S.values??[])k<y&&(y=k),k>w&&(w=k);(!Number.isFinite(y)||!Number.isFinite(w))&&(y=0,w=1),y===w&&(y-=1,w+=1);let C=ba(e.yMin??y,e.yMax??w,5),H=e.yMin??C.min,j=e.yMax??C.max,de=j-H||1,$=c.length||d[0]?.values?.length||0,O=S=>$===1?p+v/2:t==="bar"?p+(S+.5)*(v/$):p+S/($-1)*v,N=S=>f+x-(S-H)/de*x,Q=[];if(!u){if(s)for(let S of C.ticks){let k=N(S);Q.push(`<line class="grid" x1="${p}" x2="${e.W-b}" y1="${k}" y2="${k}"/>`)}if(o){for(let k of C.ticks){let L=N(k);Q.push(`<text class="axis-label y" x="${p-8}" y="${L}" text-anchor="end" dominant-baseline="middle">${M(Z(k))}</text>`)}if(i&&c.length>0){let k=Math.max(1,Math.ceil(c.length/8));c.forEach((L,z)=>{z%k!==0&&z!==c.length-1||Q.push(`<text class="axis-label x" x="${O(z)}" y="${e.H-m+16}" text-anchor="middle">${M(L)}</text>`)})}let S=H<=0&&j>=0?N(0):N(H);Q.push(`<line class="axis" x1="${p}" x2="${e.W-b}" y1="${S}" y2="${S}"/>`)}}let _=[];if(t==="bar"){let S=v/$,k=S*.18,L=S-k*2;d.forEach((z,q)=>{let W=`series series-${q}`,I=ye(q,e.palette),D=0;z.values?.forEach((T,B)=>{if(!Number.isFinite(T))return;let F=O(B),X,ke,we,je;if(n){X=F-L/2,ke=L;let ue=N(D+T),pe=N(D);we=Math.min(ue,pe),je=Math.abs(ue-pe),D+=T}else{let ue=L/d.length;X=F-L/2+q*ue,ke=ue*.86;let pe=N(T),Je=N(H<0&&j>0?0:H);we=Math.min(pe,Je),je=Math.abs(pe-Je)}let Xe=`${M(z.name)}${c[B]?` \xB7 ${M(c[B])}`:""}: ${M(Z(T))}`,Yt=(B*.04).toFixed(3);_.push(`<g class="${W}"><rect class="hit" x="${X}" y="${we}" width="${ke}" height="${je}" rx="2" fill="${I}" data-tip="${Xe}" data-color="${I}" style="animation-delay: ${Yt}s"><title>${Xe}</title></rect>`+(l?`<text class="value-label" x="${X+ke/2}" y="${we-4}" text-anchor="middle">${M(Z(T))}</text>`:"")+"</g>")})})}else if(n&&t==="area"){let S=new Array($).fill(0);d.forEach((k,L)=>{let z=ye(L,e.palette),q=[],W=[];for(let T=0;T<$;T++){let B=k.values?.[T]??0,F=S[T]+B;q.push({x:O(T),y:N(F)}),W.push({x:O(T),y:N(S[T])}),S[T]=F}let I=Ve(q,a)+" L "+W.slice().reverse().map(T=>`${T.x} ${T.y}`).join(" L ")+" Z",D=(L*.15).toFixed(3);_.push(`<path class="series-fill series-${L}" d="${I}" fill="${z}" fill-opacity="0.25" pointer-events="none" style="animation-delay: ${D}s"/>`),_.push(`<path class="series-line series-${L}" d="${Ve(q,a)}" stroke="${z}" fill="none" pointer-events="none" style="animation-delay: ${D}s"/>`),q.forEach((T,B)=>{let F=k.values?.[B]??0,X=`${M(k.name)}${c[B]?` \xB7 ${M(c[B])}`:""}: ${M(Z(F))}`;_.push(`<circle class="hit series-${L}" cx="${T.x}" cy="${T.y}" r="12" fill="transparent" data-tip="${X}" data-color="${z}"><title>${X}</title></circle>`)})})}else d.forEach((S,k)=>{let L=ye(k,e.palette),z=(S.values??[]).map((I,D)=>({x:O(D),y:N(I)})),q=Ve(z,a),W=(k*.15).toFixed(3);if(t==="area"){let I=N(H<0&&j>0?0:H),D=q+` L ${z[z.length-1].x} ${I} L ${z[0].x} ${I} Z`;_.push(`<path class="series-fill series-${k}" d="${D}" fill="${L}" fill-opacity="0.25" style="animation-delay: ${W}s"/>`)}_.push(`<path class="series-line series-${k}" d="${q}" stroke="${L}" fill="none" style="animation-delay: ${W}s"/>`),u||z.forEach((I,D)=>{let T=S.values?.[D],B=`${M(S.name)}${c[D]?` \xB7 ${M(c[D])}`:""}: ${M(Z(T??0))}`,F=(k*.15+D*.025+.55).toFixed(3);_.push(`<circle class="series-point series-${k}" cx="${I.x}" cy="${I.y}" r="3.5" fill="${L}" pointer-events="none" style="animation-delay: ${F}s"/>`),_.push(`<circle class="hit series-${k}" cx="${I.x}" cy="${I.y}" r="12" fill="transparent" data-tip="${B}" data-color="${L}"><title>${B}</title></circle>`),l&&_.push(`<text class="value-label" x="${I.x}" y="${I.y-8}" text-anchor="middle" pointer-events="none">${M(Z(T??0))}</text>`)})});return Q.join("")+_.join("")}function xa(e){let t=e.data.series??[],r=t.reduce((c,d)=>c+(d.value??0),0);if(r<=0)return"";let a=e.W/2,n=e.H/2,o=Math.min(e.W,e.H)/2-4,s=Math.max(0,Math.min(.9,e.innerRadius))*o,i=0,l=[];return t.forEach((c,d)=>{let u=c.value??0;if(u<=0)return;let f=u/r*Math.PI*2,m=i,p=i+f,b=va(a,n,o,s,m,p-.01),v=ye(d,e.palette),x=(u/r*100).toFixed(1).replace(/\.0$/,""),y=`${M(c.name)}: ${M(Z(u))} (${x}%)`,w=(d*.08).toFixed(3);if(l.push(`<path class="series-segment hit series-${d}" d="${b}" fill="${v}" data-tip="${y}" data-color="${v}" style="animation-delay: ${w}s"><title>${y}</title></path>`),e.showValues){let C=(m+p)/2,H=(o+s)/2,j=ve(a,n,H,C);l.push(`<text class="value-label donut" x="${j.x}" y="${j.y}" text-anchor="middle" dominant-baseline="middle">${M(x)}%</text>`)}i=p}),l.join("")}function ka(e,t,r){return e.length===0?"":'<div class="legend" part="legend">'+e.map((a,n)=>{let o=ye(n,t),s=r.includes(a.name);return`<button class="${s?"legend-item is-hidden":"legend-item"}" type="button" data-series="${M(a.name)}" aria-pressed="${s?"true":"false"}" title="${s?"Show":"Hide"} series '${M(a.name)}'"><span class="swatch" style="background:${o}"></span>${M(a.name)}</button>`}).join("")+"</div>"}function wa(e,t){if(e==="donut"){let n=(t.series??[]).reduce((s,i)=>s+(i.value??0),0);return`Donut chart: ${(t.series??[]).filter(s=>(s.value??0)>0).map(s=>{let i=n>0?(s.value??0)/n*100:0;return`${s.name} ${i.toFixed(1).replace(/\.0$/,"")}%`}).join(", ")}.`}let r=(t.series??[]).map(n=>n.name).join(", "),a=t.labels?.length??t.series[0]?.values?.length??0;return`${e.charAt(0).toUpperCase()}${e.slice(1)} chart with ${(t.series??[]).length} series (${r}) and ${a} data point${a===1?"":"s"}.`}var $a=["var(--tc-chart-color-1, var(--tc-color-accent, #a16939))","var(--tc-chart-color-2, var(--tc-color-info, #3a5b8c))","var(--tc-chart-color-3, var(--tc-color-success, #2f7a52))","var(--tc-chart-color-4, var(--tc-color-warning, #d7a52f))","var(--tc-chart-color-5, var(--tc-color-danger, #b3261e))","var(--tc-chart-color-6, #6f4e7c)","var(--tc-chart-color-7, #0b6e6e)","var(--tc-chart-color-8, #b0566c)"],Ma=`
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
  </style>
`;h(ha,g({props:{type:{type:"string",default:"line"},data:{type:"json",default:{series:[]}},height:{type:"string",default:"240px"},smooth:{type:"boolean",default:!0},stacked:{type:"boolean",default:!1},showLegend:{type:"boolean",default:!0},showAxes:{type:"boolean",default:!0},showGrid:{type:"boolean",default:!0},showLabels:{type:"boolean",default:!0},showValues:{type:"boolean",default:!1},innerRadius:{type:"number",default:.6},yMin:{type:"json",default:null},yMax:{type:"json",default:null},ariaLabel:{type:"string",default:"Chart"},colors:{type:"json",default:null},src:{type:"string",default:""},srcKey:{type:"string",default:""},loadingText:{type:"string",default:"Loading chart\u2026"},errorText:{type:"string",default:"Couldn't load chart data"}},theme:{"tc-chart-bg":"transparent","tc-chart-fg":"var(--tc-color-ink, #14171f)","tc-chart-axis":"var(--tc-color-rule-strong, #d9cfb8)","tc-chart-grid":"var(--tc-color-rule, #ece5d3)","tc-chart-label":"var(--tc-color-ink-muted, #6b7280)","tc-chart-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},template:({props:e,state:t})=>{let r=String(e.type??"line").toLowerCase(),a=["line","area","bar","sparkline","donut"].includes(r)?r:"line",n=e.data,o=t.fetched,s=!!n&&Array.isArray(n.series)&&n.series.length>0,i=s?n:o??{series:[]},l=Array.isArray(t.hiddenSeries)?t.hiddenSeries:[],c={labels:i.labels,series:(i.series??[]).filter($=>!l.includes($.name))},d=String(e.src??""),u=!!t.loading&&!s&&!o,f=d&&t.error?String(t.error):"",m=u?`<div class="overlay loading">${M(String(e.loadingText??"Loading chart\u2026"))}</div>`:f?`<div class="overlay error" role="alert">${M(String(e.errorText??"Couldn't load chart data"))}<small>${M(f)}</small></div>`:"",p=a==="sparkline",b=a==="donut",v=e.colors,x=Array.isArray(v)&&v.length>0?v:$a,y=b?320:800,w=b?320:400,C={data:c,smooth:!!e.smooth,stacked:!!e.stacked,showAxes:!!e.showAxes,showGrid:!!e.showGrid,showLabels:!!e.showLabels,showValues:!!e.showValues,innerRadius:Number(e.innerRadius??.6),yMin:e.yMin==null?null:Number(e.yMin),yMax:e.yMax==null?null:Number(e.yMax),palette:x,W:y,H:w},H=b?xa(C):ya(C,a),j=wa(a,c),de=M(String(e.height??"240px"));return`
        <div class="root" role="img" aria-label="${M(e.ariaLabel??"Chart")}">
          <div class="canvas" style="height:${de};">
            <svg
              viewBox="0 0 ${y} ${w}"
              preserveAspectRatio="${b?"xMidYMid meet":"none"}"
              aria-hidden="true"
            >${H}</svg>
            <div class="tip" role="tooltip">
              <span class="tip-swatch"></span><span class="tip-text"></span>
            </div>
            ${m}
          </div>
          ${e.showLegend&&!p&&i.series&&i.series.length>0?ka(i.series,x,l):""}
          <span class="visually-hidden" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;">${M(j)}</span>
        </div>
        ${Ma}
      `},events:{"click .legend-item":(e,t)=>{let r=e.target?.closest(".legend-item");if(!r)return;let a=r.dataset.series;if(!a)return;let n=t.getState("hiddenSeries")??[],o=n.includes(a)?n.filter(s=>s!==a):[...n,a];t.setState("hiddenSeries",o)},"keydown .legend-item":(e,t)=>{let r=e;if(r.key!=="Enter"&&r.key!==" ")return;r.preventDefault();let n=r.target.closest(".legend-item")?.dataset.series;if(!n)return;let o=t.getState("hiddenSeries")??[],s=o.includes(n)?o.filter(i=>i!==n):[...o,n];t.setState("hiddenSeries",s)}},afterMount(){Nt(this),It(this)},afterRender(){Nt(this),It(this)},unmount(){let e=this;e._chartHoverCleanup?.(),e._chartFetchAborter?.abort()}}));function Nt(e){let t=e;t._chartHoverCleanup?.();let r=t.shadowRoot;if(!r)return;let a=r.querySelector(".canvas"),n=r.querySelector(".tip"),o=n?.querySelector(".tip-text"),s=n?.querySelector(".tip-swatch");if(!a||!n||!o||!s)return;let i=()=>{n.removeAttribute("data-open"),n.style.transform="translate(-9999px, -9999px)"},l=d=>{let u=d.target?.closest?.("[data-tip]");if(!u){i();return}let f=u.getAttribute("data-tip")||"",m=u.getAttribute("data-color")||"currentColor";o.textContent=f,s.style.background=m;let p=a.getBoundingClientRect(),b=n.offsetWidth||100,v=n.offsetHeight||24,x=d.clientX-p.left,y=d.clientY-p.top,w=x+12,C=y-v-8;w+b>p.width-4&&(w=x-b-12),C<4&&(C=y+16),n.style.transform=`translate(${w}px, ${C}px)`,n.setAttribute("data-open","1")},c=()=>i();a.addEventListener("pointermove",l),a.addEventListener("pointerleave",c),t._chartHoverCleanup=()=>{a.removeEventListener("pointermove",l),a.removeEventListener("pointerleave",c),i()}}function It(e){let t=e,r=String(t.src??"").trim();if(!r||!t.getState||!t.setState||t.getState("fetchedFrom")===r)return;t._chartFetchAborter?.abort();let n=new AbortController;t._chartFetchAborter=n,t.setState("fetchedFrom",r),t.setState("fetched",null),t.setState("error",null),t.setState("loading",!0);let o=String(t.srcKey??"").trim();fetch(r,{signal:n.signal}).then(s=>{if(!s.ok)throw new Error(`${s.status} ${s.statusText}`);return s.json()}).then(s=>{let i=o?Ea(s,o):s;if(!i||typeof i!="object"||!Array.isArray(i.series))throw new Error(o?`Payload at "${o}" doesn't look like ChartData`:"Payload doesn't look like ChartData");n.signal.aborted||(t.setState("fetched",i),t.setState("loading",!1))}).catch(s=>{n.signal.aborted||(t.setState("loading",!1),t.setState("error",s instanceof Error?s.message:String(s)))})}function Ea(e,t){return t.split(".").reduce((r,a)=>r&&typeof r=="object"?r[a]:void 0,e)}var Sa="tc-editor";function G(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var A={bold:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h7a4 4 0 0 1 0 8H6z"/><path d="M6 12h8a4 4 0 0 1 0 8H6z"/></svg>',italic:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg>',underline:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3v8a6 6 0 0 0 12 0V3"/><line x1="4" y1="21" x2="20" y2="21"/></svg>',strike:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4H9a3 3 0 0 0-2.83 4"/><path d="M14 12a4 4 0 0 1 0 8H6"/><line x1="4" y1="12" x2="20" y2="12"/></svg>',h1:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6v12"/><path d="M12 6v12"/><path d="M4 12h8"/><path d="M17 18v-7l-2 2"/></svg>',h2:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6v12"/><path d="M12 6v12"/><path d="M4 12h8"/><path d="M16 18h5"/><path d="M16 15c0-2 2.5-2 2.5-2s2.5 0 2.5 2-3 4-5 5"/></svg>',h3:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6v12"/><path d="M12 6v12"/><path d="M4 12h8"/><path d="M16 11h5l-3 3a2.5 2.5 0 1 1-2 4"/></svg>',paragraph:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 4v16"/><path d="M19 4v16"/><path d="M19 4h-6a5 5 0 0 0 0 10h0"/></svg>',bullet:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1.2" fill="currentColor"/><circle cx="4" cy="12" r="1.2" fill="currentColor"/><circle cx="4" cy="18" r="1.2" fill="currentColor"/></svg>',ordered:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><path d="M4 8V4l-1 1"/><path d="M3 14h2l-2 3h2"/><path d="M3 20l1-1h1l1 1"/></svg>',quote:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21c0-7 7-12 14-12"/><path d="M7 7h3v6H4v-3a3 3 0 0 1 3-3z"/><path d="M16 7h3v6h-6v-3a3 3 0 0 1 3-3z"/></svg>',code:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',link:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',unlink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18.84 12.25l1.72-1.71a5 5 0 0 0-7.07-7.07L11.5 5"/><path d="M5.16 11.75l-1.72 1.71a5 5 0 0 0 7.07 7.07L12.5 19"/><line x1="2" y1="2" x2="22" y2="22"/></svg>',undo:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 7 3 13 9 13"/><path d="M21 17a8 8 0 0 0-15-3"/></svg>',redo:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="21 7 21 13 15 13"/><path d="M3 17a8 8 0 0 1 15-3"/></svg>',math:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h6l4 14h6"/><path d="M4 19l4-7-3-4"/></svg>',codeblock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><polyline points="9 9 7 12 9 15"/><polyline points="15 9 17 12 15 15"/></svg>'},Dt="bold,italic,underline,strike,|,h1,h2,h3,paragraph,|,bullet,ordered,quote,code,codeblock,|,link,unlink,math,|,undo,redo",Ta={bold:{key:"bold",label:"Bold",icon:A.bold,command:"bold",shortcut:"\u2318B"},italic:{key:"italic",label:"Italic",icon:A.italic,command:"italic",shortcut:"\u2318I"},underline:{key:"underline",label:"Underline",icon:A.underline,command:"underline",shortcut:"\u2318U"},strike:{key:"strike",label:"Strikethrough",icon:A.strike,command:"strikeThrough"},h1:{key:"h1",label:"Heading 1",icon:A.h1,command:"formatBlock",value:"h1"},h2:{key:"h2",label:"Heading 2",icon:A.h2,command:"formatBlock",value:"h2"},h3:{key:"h3",label:"Heading 3",icon:A.h3,command:"formatBlock",value:"h3"},paragraph:{key:"paragraph",label:"Paragraph",icon:A.paragraph,command:"formatBlock",value:"p"},bullet:{key:"bullet",label:"Bulleted list",icon:A.bullet,command:"insertUnorderedList"},ordered:{key:"ordered",label:"Ordered list",icon:A.ordered,command:"insertOrderedList"},quote:{key:"quote",label:"Blockquote",icon:A.quote,command:"formatBlock",value:"blockquote"},code:{key:"code",label:"Inline code",icon:A.code,command:"code"},link:{key:"link",label:"Insert link",icon:A.link,command:"link",shortcut:"\u2318K"},unlink:{key:"unlink",label:"Remove link",icon:A.unlink,command:"unlink"},undo:{key:"undo",label:"Undo",icon:A.undo,command:"undo",shortcut:"\u2318Z"},redo:{key:"redo",label:"Redo",icon:A.redo,command:"redo",shortcut:"\u2318\u21E7Z"},math:{key:"math",label:"Insert math (LaTeX)",icon:A.math,command:"math"},codeblock:{key:"codeblock",label:"Code block",icon:A.codeblock,command:"codeblock"}},La=`
  <style>
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
  </style>
`;h(Sa,g({props:{value:{type:"string",default:""},placeholder:{type:"string",default:"Start writing\u2026"},toolbar:{type:"string",default:Dt},readonly:{type:"boolean",default:!1,reflect:!0},minHeight:{type:"string",default:"180px"},maxHeight:{type:"string",default:""},pasteAs:{type:"string",default:"text"}},theme:{"tc-editor-bg":"var(--tc-color-surface, #ffffff)","tc-editor-fg":"var(--tc-color-ink, #14171f)","tc-editor-rule":"var(--tc-color-rule, #ece5d3)","tc-editor-toolbar-bg":"var(--tc-color-bg, #faf8f3)","tc-editor-toolbar-rule":"var(--tc-color-rule, #ece5d3)","tc-editor-toolbar-fg":"var(--tc-color-ink-soft, #4a5061)","tc-editor-toolbar-active-bg":"var(--tc-color-accent-soft, #efe2cf)","tc-editor-toolbar-hover-bg":"rgba(20, 23, 31, 0.06)","tc-editor-placeholder":"var(--tc-color-ink-muted, #6b7280)","tc-editor-radius":"var(--tc-radius-md, 8px)","tc-editor-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-editor-mono-font":"var(--tc-font-mono, 'JetBrains Mono', ui-monospace, 'SF Mono', monospace)","tc-editor-line-height":"1.6"},styles:{display:"block"},template:({props:e})=>{let t=String(e.toolbar??Dt),r=!!e.readonly,a=G(String(e.minHeight??"180px")),n=String(e.maxHeight??"").trim(),o=t.split(",").map(c=>c.trim()).filter(Boolean),s=o.map(c=>{if(c==="|")return'<span class="tb-sep" aria-hidden="true"></span>';let d=Ta[c];if(!d)return"";let u=d.shortcut?` (${G(d.shortcut)})`:"";return`<button type="button" class="tb-btn" data-cmd="${G(d.command)}"${d.value?` data-val="${G(d.value)}"`:""} data-key="${G(d.key)}" title="${G(d.label)}${u}" aria-label="${G(d.label)}">${d.icon}</button>`}).join(""),i=o.length===0?"toolbar empty":r?"toolbar readonly":"toolbar";return`
        <div class="root" style="${`--tc-editor-min-height: ${a};${n?`--tc-editor-max-height: ${G(n)};`:""}`}">
          <div class="${i}" role="toolbar" aria-label="Formatting">
            ${s}
            <slot name="toolbar-extra"></slot>
          </div>
          <div
            class="surface"
            contenteditable="${r?"false":"true"}"
            data-placeholder="${G(e.placeholder??"")}"
            role="textbox"
            aria-multiline="true"
            spellcheck="true"
          ></div>
        </div>
        ${La}
      `},afterMount(){jt(this),Bt(this)},afterRender(){let e=this,r=e.shadowRoot?.querySelector(".surface");if(r){let a=r.innerHTML,n=String(e.value??"");n&&a!==n&&document.activeElement!==e&&(r.innerHTML=n),Ge(r)}jt(e),Bt(e)},unmount(){this._editorCleanup?.()}}));function Ge(e){let t=e.textContent?.trim()===""&&e.querySelector("img, hr, br")===null;e.dataset.empty=t?"true":"false"}function jt(e){let t=e;t._editorCleanup?.();let r=t.shadowRoot;if(!r)return;let a=r.querySelector(".surface");if(!a)return;a.dataset.bootstrapped||(t.value&&(a.innerHTML=String(t.value)),a.dataset.bootstrapped="1"),Ge(a);let n=(f,m)=>{if(!t.readonly){if(a.focus(),f==="code"){let b=r.getSelection?.()??globalThis.getSelection();if(!b||b.rangeCount===0)return;let v=b.getRangeAt(0),x=v.extractContents(),y=document.createElement("code");y.className="tc-code-inline",y.appendChild(x),v.insertNode(y),v.selectNodeContents(y),b.removeAllRanges(),b.addRange(v)}else if(f==="link"){let p=globalThis.prompt("URL")?.trim();if(!p)return;document.execCommand("createLink",!1,p)}else if(f==="math"){let p=globalThis.prompt("LaTeX (e.g. E = mc^2). Wrap with $$ for display.")?.trim();if(!p)return;let b=p.startsWith("$$")&&p.endsWith("$$"),v=b?p.replace(/^\$\$|\$\$$/g,"").trim():p;Ha(t,v,b)}else if(f==="codeblock"){let p=r.getSelection?.()??globalThis.getSelection();if(!p||p.rangeCount===0)return;let b=p.getRangeAt(0),v=b.toString()||"// code",x=document.createElement("pre"),y=document.createElement("code");y.textContent=v,x.appendChild(y),b.deleteContents(),b.insertNode(x);let w=document.createRange();w.selectNodeContents(y),w.collapse(!1),p.removeAllRanges(),p.addRange(w)}else f==="formatBlock"?document.execCommand("formatBlock",!1,`<${m??"p"}>`):document.execCommand(f,!1,m);qt(t,a),_t(r,a)}},o=f=>{let m=f.target?.closest?.(".tb-btn");if(!m)return;f.preventDefault();let p=m.dataset.cmd;p&&n(p,m.dataset.val)},s=()=>{Ge(a),qt(t,a)},i=()=>{let f=a.innerHTML;t._lastEmitted!==f&&(t._lastEmitted=f,t.dispatchEvent(new CustomEvent("tc-change",{detail:{html:f},bubbles:!0,composed:!0})))},l=f=>{if(t.readonly||t.pasteAs!=="text")return;f.preventDefault();let m=f.clipboardData?.getData("text/plain")??"";document.execCommand("insertText",!1,m)},c=f=>{if(t.readonly||!(f.metaKey||f.ctrlKey))return;let m=f.key.toLowerCase();m==="b"?(f.preventDefault(),n("bold")):m==="i"?(f.preventDefault(),n("italic")):m==="u"?(f.preventDefault(),n("underline")):m==="k"&&(f.preventDefault(),n("link"))},d=()=>{let f=globalThis.getSelection();!f||!f.anchorNode||a.contains(f.anchorNode)&&_t(r,a)},u=r.querySelector(".toolbar");u?.addEventListener("click",o),a.addEventListener("input",s),a.addEventListener("blur",i),a.addEventListener("paste",l),a.addEventListener("keydown",c),document.addEventListener("selectionchange",d),t._editorCleanup=()=>{u?.removeEventListener("click",o),a.removeEventListener("input",s),a.removeEventListener("blur",i),a.removeEventListener("paste",l),a.removeEventListener("keydown",c),document.removeEventListener("selectionchange",d)}}function qt(e,t){let r=t.innerHTML;e.value=r,e.dispatchEvent(new CustomEvent("tc-input",{detail:{html:r},bubbles:!0,composed:!0}))}function Ha(e,t,r){let a=e.shadowRoot;if(!a)return;let n=a.querySelector(".surface");if(!n)return;let o=a.getSelection?.()??globalThis.getSelection();if(!o||o.rangeCount===0)return;let s=o.getRangeAt(0),i=document.createElement(r?"div":"span");i.className=r?"tc-math display":"tc-math inline",i.setAttribute("contenteditable","false"),i.dataset.latex=t,i.innerHTML=Ot(e,t,r),s.deleteContents(),s.insertNode(i);let l=document.createTextNode("\u200B");i.parentNode?.insertBefore(l,i.nextSibling);let c=document.createRange();c.setStartAfter(l),c.collapse(!0),o.removeAllRanges(),o.addRange(c),e.dispatchEvent(new CustomEvent("tc-input",{detail:{html:n.innerHTML},bubbles:!0,composed:!0}))}function Ot(e,t,r){if(e.mathRenderer)try{return e.mathRenderer(t,r)}catch{}return`<code class="tc-math-src">${t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code>`}function Bt(e){let t=e.shadowRoot;if(!t)return;let r=t.querySelector(".surface");if(!r)return;r.querySelectorAll(".tc-math").forEach(n=>{let o=n,s=o.dataset.latex??"",i=o.classList.contains("display"),l=`${i?"d":"i"}:${s}`;o.dataset.stamp!==l&&(o.innerHTML=Ot(e,s,i),o.dataset.stamp=l)})}function _t(e,t){e.querySelectorAll(".tb-btn").forEach(a=>{let n=a,o=n.dataset.cmd??"",s=n.dataset.val,i=!1;try{o==="formatBlock"&&s?i=(document.queryCommandValue("formatBlock")||"").toLowerCase().replace(/^[<]|[>]$/g,"")===s:(o==="bold"||o==="italic"||o==="underline"||o==="strikeThrough"||o==="insertOrderedList"||o==="insertUnorderedList")&&(i=document.queryCommandState(o))}catch{i=!1}n.classList.toggle("is-active",i)})}var Ca="tc-markdown";function E(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Ae="\0M\0";function za(e,t){let r=[],a=(s,i)=>{let l=r.length;return r.push({latex:s,display:i}),`${Ae}${l}${Ae}`},n=e;n=n.replace(/\$\$([\s\S]+?)\$\$/g,(s,i)=>a(i.trim(),!0)),n=n.replace(/(^|[\s(])\$([^\$\n][^\$\n]*?)\$(?=[\s.,;:!?)\]]|$)/g,(s,i,l)=>`${i}${a(l.trim(),!1)}`);let o=E(n);return o=o.replace(/`([^`]+)`/g,"<code>$1</code>"),o=o.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>"),o=o.replace(/(?<!\*)\*([^*\n]+?)\*(?!\*)/g,"<em>$1</em>"),o=o.replace(/\b_(.+?)_\b/g,"<em>$1</em>"),o=o.replace(/~~(.+?)~~/g,"<del>$1</del>"),o=o.replace(/!\[([^\]]*)\]\(([^)]+)\)/g,(s,i,l)=>`<img src="${E(l)}" alt="${E(i)}" loading="lazy"/>`),o=o.replace(/\[([^\]]+)\]\(([^)]+)\)/g,(s,i,l)=>`<a href="${E(l)}" target="_blank" rel="noopener">${i}</a>`),o=o.replace(new RegExp(`${Ae}(\\d+)${Ae}`,"g"),(s,i)=>{let l=r[Number(i)];if(!l)return"";let c=l.latex;if(t)try{let d=t(c,l.display);return l.display?`<div class="tc-md-math display" data-latex="${E(c)}">${d}</div>`:`<span class="tc-md-math inline" data-latex="${E(c)}">${d}</span>`}catch(d){return l.display?`<div class="tc-md-math error" title="${E(String(d))}">${E(c)}</div>`:`<span class="tc-md-math error" title="${E(String(d))}">${E(c)}</span>`}return l.display?`<div class="tc-md-math fallback display" data-latex="${E(c)}"><code>${E(c)}</code></div>`:`<span class="tc-md-math fallback inline" data-latex="${E(c)}"><code>${E(c)}</code></span>`}),o}function Aa(e){let t=e.match(/^\[([ xX])\]\s+(.*)$/);return t?`<li class="tc-md-task"><input type="checkbox" disabled${t[1].toLowerCase()==="x"?" checked":""}/><span>${t[2]}</span></li>`:""}function Ra(e,t){let r=(o,s,i)=>{let l=i&&i!=="left"?` style="text-align:${i}"`:"";return`<${s}${l}>${o}</${s}>`},a=e[0]?.map((o,s)=>r(o,"th",t[s])).join("")??"",n=e.slice(1).map(o=>`<tr>${o.map((s,i)=>r(s,"td",t[i])).join("")}</tr>`).join("");return`<table class="tc-md-table"><thead><tr>${a}</tr></thead><tbody>${n}</tbody></table>`}function Ue(e,t){let r=t?.mathRenderer,a=t?.highlight,n=e.replace(/\r\n?/g,`
`).split(`
`),o=[],s=0,i=l=>za(l,r);for(;s<n.length;){let l=n[s],c=l.match(/^:::\s*([a-zA-Z][\w-]*)(?:\s+(.+))?\s*$/);if(c){let p=c[1].toLowerCase(),b=(c[2]??"").trim(),v=[];for(s++;s<n.length&&!/^:::\s*$/.test(n[s]);)v.push(n[s]),s++;s<n.length&&s++;let x=Ue(v.join(`
`),t);o.push(`<div class="tc-md-callout v-${E(p)}" role="${p==="danger"?"alert":"note"}">${b?`<div class="callout-title">${i(b)}</div>`:""}<div class="callout-body">${x}</div></div>`);continue}let d=l.match(/^```(\S*)\s*$/);if(d){let p=d[1]??"",b=[];for(s++;s<n.length&&!/^```\s*$/.test(n[s]);)b.push(n[s]),s++;s<n.length&&s++;let v=b.join(`
`),x=a&&p?(()=>{try{return a(v,p)}catch{return E(v)}})():E(v),y=p?` class="lang-${E(p)}"`:"";o.push(`<pre><code${y}>${x}</code></pre>`);continue}let u=l.match(/^(#{1,6})\s+(.*)$/);if(u){let p=u[1].length;o.push(`<h${p}>${i(u[2])}</h${p}>`),s++;continue}if(/^(?:-\s*){3,}$|^(?:\*\s*){3,}$|^(?:_\s*){3,}$/.test(l.trim())){o.push("<hr/>"),s++;continue}if(/^\s*\|.+\|\s*$/.test(l)&&s+1<n.length&&/^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(n[s+1])){let p=l.trim().replace(/^\||\|$/g,"").split("|").map(y=>y.trim()),b=n[s+1].trim().replace(/^\||\|$/g,"").split("|").map(y=>{let w=y.trim(),C=w.startsWith(":"),H=w.endsWith(":");return C&&H?"center":H?"right":C?"left":""}),v=[];for(s+=2;s<n.length&&/^\s*\|.+\|\s*$/.test(n[s]);)v.push(n[s].trim().replace(/^\||\|$/g,"").split("|").map(y=>i(y.trim()))),s++;let x=[p.map(y=>i(y)),...v];o.push(Ra(x,b));continue}if(/^>\s?/.test(l)){let p=[];for(;s<n.length&&/^>\s?/.test(n[s]);)p.push(n[s].replace(/^>\s?/,"")),s++;o.push(`<blockquote>${i(p.join(" "))}</blockquote>`);continue}let f=l.match(/^(\s*)(?:([-*+])|(\d+)\.)\s+(.*)$/);if(f){let p=!!f[3],b=p?"ol":"ul",v=[],x=!1;for(;s<n.length;){let w=n[s].match(/^(\s*)(?:([-*+])|(\d+)\.)\s+(.*)$/);if(!w||!!w[3]!==p)break;let H=w[4],j=Aa(H);j?(x=!0,v.push(j)):v.push(`<li>${i(H)}</li>`),s++}let y=x?' class="tc-md-tasks"':"";o.push(`<${b}${y}>${v.join("")}</${b}>`);continue}if(l.trim()===""){s++;continue}let m=[l];for(s++;s<n.length;){let p=n[s];if(p.trim()===""||/^#{1,6}\s+/.test(p)||/^```/.test(p)||/^>\s?/.test(p)||/^:::/.test(p)||/^(\s*)(?:[-*+]|\d+\.)\s+/.test(p)||/^\s*\|.+\|\s*$/.test(p)||/^(?:-\s*){3,}$|^(?:\*\s*){3,}$|^(?:_\s*){3,}$/.test(p.trim()))break;m.push(p),s++}o.push(`<p>${i(m.join(" "))}</p>`)}return o.join(`
`)}var Ft={bold:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h7a4 4 0 0 1 0 8H6z"/><path d="M6 12h8a4 4 0 0 1 0 8H6z"/></svg>',italic:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg>',heading:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6v12"/><path d="M12 6v12"/><path d="M4 12h8"/><path d="M16 18l4-12"/></svg>',code:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',link:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',bullet:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1.2" fill="currentColor"/><circle cx="4" cy="12" r="1.2" fill="currentColor"/><circle cx="4" cy="18" r="1.2" fill="currentColor"/></svg>',ordered:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><path d="M4 8V4l-1 1"/><path d="M3 14h2l-2 3h2"/></svg>',quote:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h3v6H4v-3a3 3 0 0 1 3-3z"/><path d="M16 7h3v6h-6v-3a3 3 0 0 1 3-3z"/></svg>',preview:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>'};function Ke(e,t,r,a,n,o="text"){let s=e.slice(t,r)||o;return{text:e.slice(0,t)+a+s+n+e.slice(r),selStart:t+a.length,selEnd:t+a.length+s.length}}function Re(e,t,r,a){let n=e.lastIndexOf(`
`,t-1)+1,o=(()=>{let l=e.indexOf(`
`,r);return l===-1?e.length:l})(),i=e.slice(n,o).split(`
`).map(l=>a+l).join(`
`);return{text:e.slice(0,n)+i+e.slice(o),selStart:n,selEnd:n+i.length}}var Gt={bold:{key:"bold",label:"Bold",shortcut:"\u2318B",apply:(e,t,r)=>Ke(e,t,r,"**","**","bold text")},italic:{key:"italic",label:"Italic",shortcut:"\u2318I",apply:(e,t,r)=>Ke(e,t,r,"*","*","italic text")},heading:{key:"heading",label:"Heading",apply:(e,t,r)=>Re(e,t,r,"## ")},code:{key:"code",label:"Code",apply:(e,t,r)=>Ke(e,t,r,"`","`","code")},link:{key:"link",label:"Link",shortcut:"\u2318K",apply:(e,t,r)=>{let a=globalThis.prompt?.("URL")?.trim();if(!a)return{text:e,selStart:t,selEnd:r};let n=e.slice(t,r)||"link text";return{text:e.slice(0,t)+`[${n}](${a})`+e.slice(r),selStart:t+1,selEnd:t+1+n.length}}},bullet:{key:"bullet",label:"Bulleted list",apply:(e,t,r)=>Re(e,t,r,"- ")},ordered:{key:"ordered",label:"Numbered list",apply:(e,t,r)=>Re(e,t,r,"1. ")},quote:{key:"quote",label:"Quote",apply:(e,t,r)=>Re(e,t,r,"> ")}},Pt="bold,italic,heading,|,bullet,ordered,quote,|,link,code",Na=`
  <style>
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
  </style>
`;h(Ca,g({props:{value:{type:"string",default:""},placeholder:{type:"string",default:"Write some markdown\u2026"},mode:{type:"string",default:"split"},readonly:{type:"boolean",default:!1},minHeight:{type:"string",default:"240px"},toolbar:{type:"string",default:Pt}},theme:{"tc-md-bg":"var(--tc-color-surface, #ffffff)","tc-md-fg":"var(--tc-color-ink, #14171f)","tc-md-rule":"var(--tc-color-rule, #ece5d3)","tc-md-toolbar-bg":"var(--tc-color-bg, #faf8f3)","tc-md-preview-bg":"var(--tc-color-bg, #faf8f3)","tc-md-radius":"var(--tc-radius-md, 8px)","tc-md-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-md-mono-font":"var(--tc-font-mono, 'JetBrains Mono', ui-monospace, monospace)"},styles:{display:"block"},refs:{source:"textarea",preview:".preview"},template:({props:e,state:t})=>{let r=String(t.mode??e.mode??"split"),a=String(e.value??""),n=String(e.toolbar??Pt).split(",").map(f=>f.trim()).filter(Boolean),o=n.map(f=>{if(f==="|")return'<span class="tb-sep" aria-hidden="true"></span>';let m=Gt[f];if(!m||!Ft[m.key])return"";let p=m.shortcut?` (${E(m.shortcut)})`:"";return`<button type="button" class="tb-btn" data-op="${E(m.key)}" title="${E(m.label)}${p}" aria-label="${E(m.label)}">${Ft[m.key]}</button>`}).join(""),s=(f,m)=>`<button type="button" data-mode="${f}" class="${r===f?"is-active":""}" aria-pressed="${r===f?"true":"false"}">${m}</button>`,i=e,c=(i.render??(f=>Ue(f,{mathRenderer:i.mathRenderer,highlight:i.highlight})))(a),d=r==="source"?"panes source-only":r==="preview"?"panes preview-only":"panes";return`
        <div class="root" style="${`--tc-md-min-height: ${E(e.minHeight??"240px")};`}">
          <div class="${n.length===0?"toolbar empty":"toolbar"}" role="toolbar" aria-label="Markdown formatting">
            ${o}
            <span class="tb-mode" role="tablist" aria-label="View mode">
              ${s("source","Source")}
              ${s("split","Split")}
              ${s("preview","Preview")}
            </span>
          </div>
          <div class="${d}">
            <div class="source">
              <textarea
                placeholder="${E(e.placeholder??"")}"
                ${e.readonly?"readonly":""}
                spellcheck="true"
              >${E(a)}</textarea>
            </div>
            <div class="preview">${c}</div>
          </div>
        </div>
        ${Na}
      `},afterMount(){Vt(this)},afterRender(){let e=this,t=e.shadowRoot?.querySelector("textarea");t&&document.activeElement!==e&&t.value!==String(e.value??"")&&(t.value=String(e.value??"")),Vt(e)},unmount(){this._mdCleanup?.()}}));function Vt(e){let t=e;t._mdCleanup?.();let r=t.shadowRoot;if(!r)return;let a=r.querySelector("textarea"),n=r.querySelector(".preview"),o=r.querySelector(".toolbar"),s=r.querySelector(".tb-mode");if(!a||!n)return;let i=t.render&&typeof t.render=="function"?t.render:p=>Ue(p,{mathRenderer:t.mathRenderer,highlight:t.highlight}),l=()=>{let p=a.value;t.value=p;let b=i(p);n.innerHTML=b,t.dispatchEvent(new CustomEvent("tc-input",{detail:{markdown:p,html:b},bubbles:!0,composed:!0}))},c=()=>l(),d=()=>{t.dispatchEvent(new CustomEvent("tc-change",{detail:{markdown:a.value,html:i(a.value)},bubbles:!0,composed:!0}))},u=p=>{let b=p.target?.closest?.(".tb-btn");if(!b)return;p.preventDefault();let v=b.dataset.op;v&&(Ne(a,v),l())},f=p=>{let b=p.target?.closest?.("[data-mode]");if(!b)return;let v=b.dataset.mode;v&&t.setState?.("mode",v)},m=p=>{if(!(p.metaKey||p.ctrlKey))return;let b=p.key.toLowerCase();b==="b"?(p.preventDefault(),Ne(a,"bold"),l()):b==="i"?(p.preventDefault(),Ne(a,"italic"),l()):b==="k"&&(p.preventDefault(),Ne(a,"link"),l())};a.addEventListener("input",c),a.addEventListener("blur",d),a.addEventListener("keydown",m),o?.addEventListener("click",u),s?.addEventListener("click",f),t._mdCleanup=()=>{a.removeEventListener("input",c),a.removeEventListener("blur",d),a.removeEventListener("keydown",m),o?.removeEventListener("click",u),s?.removeEventListener("click",f)}}function Ne(e,t){let r=Gt[t];if(!r)return;let a=e.selectionStart??e.value.length,n=e.selectionEnd??e.value.length,o=r.apply(e.value,a,n);e.value=o.text,e.focus(),e.setSelectionRange(o.selStart,o.selEnd)}var Ye={"alert-circle":'<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',"alert-triangle":'<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',info:'<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',check:'<polyline points="20 6 9 17 4 12"/>',"check-circle":'<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',x:'<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',"x-circle":'<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>',"arrow-right":'<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',"arrow-left":'<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',"arrow-up":'<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>',"arrow-down":'<line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>',"chevron-right":'<polyline points="9 18 15 12 9 6"/>',"chevron-left":'<polyline points="15 18 9 12 15 6"/>',"chevron-up":'<polyline points="18 15 12 9 6 15"/>',"chevron-down":'<polyline points="6 9 12 15 18 9"/>',"external-link":'<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',plus:'<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',minus:'<line x1="5" y1="12" x2="19" y2="12"/>',search:'<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',filter:'<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',"more-horizontal":'<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',"more-vertical":'<circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>',settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>',edit:'<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="m18.5 2.5 a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z"/>',trash:'<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',copy:'<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',save:'<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>',download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',user:'<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',users:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',mail:'<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/>',calendar:'<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',clock:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',home:'<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',menu:'<line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>',"log-out":'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',"log-in":'<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>',moon:'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',sun:'<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',eye:'<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',"eye-off":'<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>',loader:'<line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>',refresh:'<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>',banknote:'<rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>',calculator:'<rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/>',coins:'<path d="M13.744 17.736a6 6 0 1 1-7.48-7.48"/><path d="M15 6h1v4"/><path d="m6.134 14.768.866-.5 2 3.464"/><circle cx="16" cy="8" r="6"/>',"credit-card":'<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>',"dollar-sign":'<line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',landmark:'<path d="M10 18v-7"/><path d="M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="M3 22h18"/><path d="M6 18v-7"/>',percent:'<line x1="19" x2="5" y1="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',"piggy-bank":'<path d="M11 17h3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a3.16 3.16 0 0 0 2-2h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a5 5 0 0 0-2-4V3a4 4 0 0 0-3.2 1.6l-.3.4H11a6 6 0 0 0-6 6v1a5 5 0 0 0 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z"/><path d="M16 10h.01"/><path d="M2 8v1a2 2 0 0 0 2 2h1"/>',receipt:'<path d="M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z"/><path d="M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8"/><path d="M12 17V7"/>',wallet:'<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',"bar-chart":'<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M7 16h8"/><path d="M7 11h12"/><path d="M7 6h3"/>',"pie-chart":'<path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"/><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>',"trending-down":'<path d="M16 17h6v-6"/><path d="m22 17-8.5-8.5-5 5L2 7"/>',"trending-up":'<path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/>',gift:'<path d="M12 7v14"/><path d="M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/><path d="M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5"/><rect x="3" y="7" width="18" height="4" rx="1"/>',package:'<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><polyline points="3.29 7 12 12 20.71 7"/><path d="m7.5 4.27 9 5.15"/>',"shopping-bag":'<path d="M16 10a4 4 0 0 1-8 0"/><path d="M3.103 6.034h17.794"/><path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"/>',"shopping-cart":'<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',tag:'<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>',truck:'<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',bell:'<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>',"message-square":'<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/>',phone:'<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>',send:'<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',clipboard:'<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>',"file-text":'<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',folder:'<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',image:'<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',paperclip:'<path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551"/>',printer:'<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/><rect x="6" y="14" width="12" height="8" rx="1"/>',key:'<path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"/><path d="m21 2-9.6 9.6"/><circle cx="7.5" cy="15.5" r="5.5"/>',lock:'<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',shield:'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',unlock:'<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',link:'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',"map-pin":'<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',bookmark:'<path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"/>',heart:'<path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>',star:'<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>',grid:'<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',list:'<path d="M3 5h.01"/><path d="M3 12h.01"/><path d="M3 19h.01"/><path d="M8 5h13"/><path d="M8 12h13"/><path d="M8 19h13"/>',"user-check":'<path d="m16 11 2 2 4-4"/><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>',"user-plus":'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/>'},Ia=Object.freeze(Object.keys(Ye));var Da="tc-icon";h(Da,g({props:{name:{type:"string",default:""},size:{type:"string",default:"1em"},stroke:{type:"string",default:"currentColor"},fill:{type:"string",default:"none"},title:{type:"string",default:""}},styles:{display:"inline-flex","align-items":"center","justify-content":"center","vertical-align":"middle","line-height":"1"},template:({props:e})=>{let t=String(e.name??""),r=Ye[t],a=String(e.size??"1em"),n=String(e.stroke??"currentColor"),o=String(e.fill??"none"),s=String(e.title??"");if(!r)return`
          <svg width="${K(a)}" height="${K(a)}" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="1.5"
               stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <text x="12" y="14.5" text-anchor="middle" font-size="6" font-family="monospace" stroke="none" fill="currentColor">?</text>
          </svg>
        `;let i=s?`role="img" aria-label="${K(s)}"`:'aria-hidden="true"';return`
        <svg
          width="${K(a)}"
          height="${K(a)}"
          viewBox="0 0 24 24"
          fill="${K(o)}"
          stroke="${K(n)}"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          ${i}
        >${s?`<title>${K(s)}</title>`:""}${r}</svg>
      `}}));function K(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var ja="site-nav";h(ja,g({props:{active:{type:"string",default:""},version:{type:"string",default:"v1.1.0"},base:{type:"string",default:""}},styles:{display:"block"},template:({props:e})=>{let t=String(e.base??""),r=[{id:"docs",label:"Docs",href:`${t}docs.html`,hideOnSmall:!0},{id:"components",label:"Components",href:`${t}components.html`},{id:"icons",label:"Icons",href:`${t}icons.html`,hideOnSmall:!0},{id:"themes",label:"Themes",href:`${t}themes.html`,hideOnSmall:!0},{id:"examples",label:"Examples",href:`${t}examples.html`,hideOnSmall:!0},{id:"playground",label:"Playground",href:`${t}playground.html`,hideOnSmall:!0},{id:"blog",label:"Blog",href:`${t}blog/`,hideOnSmall:!0},{id:"github",label:"GitHub",href:"https://github.com/ra9/tan-compose",external:!0}],a=String(e.active??"");return`
        <header class="topbar">
          <div class="inner">
            <a class="brand" href="${xe(t)}index.html">
              <span class="brand-mark" aria-hidden="true"></span>
              tan-compose
              <span class="version-pill">${xe(e.version)}</span>
            </a>
            <site-search base="${xe(t)}" class="nav-search"></site-search>
            <nav aria-label="Primary">
              ${r.map(n=>{let o=n.id===a,s=[n.hideOnSmall?"nav-hide-sm":"",o?"active":""].filter(Boolean).join(" "),i=o?' aria-current="page"':"",l=n.external?' target="_blank" rel="noopener"':"";return`<a href="${xe(n.href)}"${i}${l}${s?` class="${s}"`:""}>${xe(n.label)}</a>`}).join(`
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
      `}}));function xe(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var qa="site-footer";h(qa,g({props:{base:{type:"string",default:""},year:{type:"string",default:"2026"}},styles:{display:"block"},template:({props:e})=>{let t=String(e.base??"");return`
        <footer class="foot">
          <div class="inner">
            <p>&copy; ${ce(e.year)} Tan Compose \xB7 MIT License</p>
            <div class="links">
              <a href="${ce(t)}docs.html">Docs</a>
              <a href="${ce(t)}components.html">Components</a>
              <a href="${ce(t)}themes.html">Themes</a>
              <a href="${ce(t)}playground.html">Playground</a>
              <a href="${ce(t)}blog/">Blog</a>
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
      `}}));function ce(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Ba="site-search";var U=null,Ie=null;function De(e){if(U)return Promise.resolve(U);if(Ie)return Ie;let t=`${e}search.json`;return Ie=fetch(t).then(r=>r.json()).then(r=>(U=r.docs??[],U)).catch(r=>(console.warn("[site-search] failed to load index:",r),U=[],U)),Ie}function Ut(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Kt(e,t){let r=e.trim().toLowerCase();if(!r)return[];let a=r.split(/\s+/).filter(Boolean).map(o=>({raw:o,re:new RegExp(Ut(o),"i")})),n=[];for(let o of t){let s=o.title.toLowerCase(),i=(o.description??"").toLowerCase(),l=(o.text??"").toLowerCase(),c=0;for(let u of a){let f=u.raw;s===f&&(c+=50),s.startsWith(f)&&(c+=20),s.includes(f)&&(c+=10),i.includes(f)&&(c+=5),l.includes(f)&&(c+=1)}a.every(u=>u.re.test(o.title)||u.re.test(i)||u.re.test(l))&&c!==0&&(o.category==="blog"&&o.date&&(Date.now()-new Date(o.date).getTime())/864e5<30&&(c+=3),n.push({doc:o,score:c}))}return n.sort((o,s)=>s.score-o.score),n.slice(0,12)}function _a(e,t,r=140){let a=e.trim().toLowerCase().split(/\s+/)[0];if(!a)return t.slice(0,r);let o=t.toLowerCase().indexOf(a);if(o===-1)return t.slice(0,r);let s=Math.max(0,o-40),i=Math.min(t.length,s+r),l=s>0?"\u2026 ":"",c=i<t.length?" \u2026":"";return l+t.slice(s,i)+c}function Y(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function We(e,t){let r=t.trim();if(!r)return Y(e);let a=r.split(/\s+/).filter(Boolean),n=Y(e);for(let o of a){let s=new RegExp(`(${Ut(Y(o))})`,"gi");n=n.replace(s,"<mark>$1</mark>")}return n}function Oa(e){e.setState("open",!1),e.setState("query",""),e.setState("results",[]),e.setState("focusIdx",0)}var Fa=`
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
`;h(Ba,g({props:{base:{type:"string",default:""}},styles:{display:"inline-block"},refs:{input:".search-input",results:".results",dialog:"dialog.modal"},template:({props:e,state:t})=>{let r=String(e.base??""),a=String(t.query??""),n=Number(t.focusIdx??0),o=t.results??[],s=`
        <button type="button" class="trigger" aria-label="Search the site (\u2318K)">
          <svg class="trigger-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <span class="trigger-label">Search</span>
          <kbd class="trigger-kbd" aria-hidden="true">\u2318K</kbd>
        </button>
      `,i=a.trim()===""?'<div class="empty">Start typing to search the site \u2014 docs, components, blog posts, examples.</div>':o.length===0?`<div class="empty">No results for "${Y(a)}". Try a shorter query.</div>`:o.map((c,d)=>{let u=d===n?"row focused":"row",f=r+c.doc.url.replace(/^\//,""),m=_a(a,c.doc.text);return`
              <a class="${u}" data-index="${d}" href="${Y(f)}">
                <span class="row-cat ${Y(c.doc.category)}">${Y(c.doc.category)}</span>
                <div class="row-main">
                  <div class="row-title">${We(c.doc.title,a)}</div>
                  <div class="row-desc">${We(c.doc.description,a)}</div>
                  <div class="row-snippet">${We(m,a)}</div>
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
              value="${Y(a)}"
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
      `;return s+l+Fa},events:{"click .trigger":(e,t)=>{let r=t.host,a=String(r.base??"");t.setState("open",!0),t.setState("query",""),t.setState("focusIdx",0),t.setState("results",[]),De(a)},"click .close":(e,t)=>Oa(t),"input .search-input":(e,t)=>{let r=e.target.value,a=t.host,n=String(a.base??"");t.setState("query",r),t.setState("focusIdx",0),U?t.setState("results",Kt(r,U)):De(n).then(o=>{t.setState("results",Kt(r,o))})},"keydown .search-input":(e,t)=>{let r=e,a=t.getState("results")??[],n=Number(t.getState("focusIdx")??0);if(r.key==="ArrowDown"){if(r.preventDefault(),a.length===0)return;t.setState("focusIdx",Math.min(a.length-1,n+1));return}if(r.key==="ArrowUp"){if(r.preventDefault(),a.length===0)return;t.setState("focusIdx",Math.max(0,n-1));return}if(r.key==="Enter"){if(a.length===0)return;r.preventDefault();let o=a[n];if(o){let s=t.host,l=String(s.base??"")+o.doc.url.replace(/^\//,"");globalThis.location.href=l}return}},"mouseover .row":(e,t)=>{let r=e.target.closest(".row");if(!r)return;let a=Number(r.dataset.index);Number.isNaN(a)||t.setState("focusIdx",a)}},afterMount(){let e=this,t=r=>{if(r.key.toLowerCase()==="k"&&(r.metaKey||r.ctrlKey)&&!r.altKey){if(r.preventDefault(),!e.setState)return;e.setState("open",!0),e.setState("query",""),e.setState("focusIdx",0),e.setState("results",[]),De(String(e.base??""));return}if(r.key==="/"&&!r.metaKey&&!r.ctrlKey&&!r.altKey){let a=document.activeElement,n=a?.tagName.toLowerCase();if(n==="input"||n==="textarea"||a?.isContentEditable===!0||(r.preventDefault(),!e.setState))return;e.setState("open",!0),e.setState("query",""),e.setState("focusIdx",0),e.setState("results",[]),De(String(e.base??""))}};document.addEventListener("keydown",t),e._searchKeyHandler=t},unmount(){let e=this;e._searchKeyHandler&&document.removeEventListener("keydown",e._searchKeyHandler)},afterRender(){let e=this,t=e.refs?.dialog??null;if(!t)return;let r=e.getState?!!e.getState("open"):!1;if(r&&!t.open){t.showModal(),(e.refs?.input??null)?.focus(),t.addEventListener("close",()=>{e.getState?.("open")&&(e.setState?.("open",!1),e.setState?.("query",""),e.setState?.("results",[]),e.setState?.("focusIdx",0))}),t.addEventListener("click",n=>{n.target===t&&t.close()});return}if(!r&&t.open){t.close();return}if(r){let a=e.refs?.input??null;a&&e.shadowRoot?.activeElement!==a&&a.focus()}}}));
//# sourceMappingURL=site.js.map
