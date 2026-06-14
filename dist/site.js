var rr=`:root {
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
`,Be=!1;function nr(){if(typeof document>"u"||Be)return;if(document.querySelector("style[data-tc-tokens]")){Be=!0;return}let e=document.createElement("style");e.setAttribute("data-tc-tokens",""),e.textContent=rr,document.head.insertBefore(e,document.head.firstChild),Be=!0}nr();var or=["beforeMount","afterMount","afterRender","unmount","action","formAssociatedCallback","formDisabledCallback","formResetCallback","formStateRestoreCallback"],ar=new Set(["string","number","boolean","json"]);function h(e){if(e===null||typeof e!="object")throw new TypeError("describe(): options must be an object");if(e.tag!==void 0&&typeof e.tag!="string")throw new TypeError("describe(): `tag` must be a string");if(e.className!==void 0&&typeof e.className!="string")throw new TypeError("describe(): `className` must be a string");if(e.template!==void 0&&typeof e.template!="string"&&typeof e.template!="function")throw new TypeError("describe(): `template` must be a string or function");if(e.children!==void 0&&!Array.isArray(e.children))throw new TypeError("describe(): `children` must be an array");if(e.emit!==void 0&&!Array.isArray(e.emit))throw new TypeError("describe(): `emit` must be an array");if(e.observedAttributes!==void 0&&(!Array.isArray(e.observedAttributes)||e.observedAttributes.some(t=>typeof t!="string")))throw new TypeError("describe(): `observedAttributes` must be an array of strings");for(let t of["theme","styles","attributes","events","refs"]){let r=e[t];if(r!==void 0&&(r===null||typeof r!="object"||Array.isArray(r)))throw new TypeError(`describe(): \`${t}\` must be a record`)}if(e.refs!==void 0){for(let[t,r]of Object.entries(e.refs))if(typeof r!="string")throw new TypeError(`describe(): refs.${t} must be a CSS selector string`)}if(e.stylesheet!==void 0&&!(typeof e.stylesheet=="string"||Array.isArray(e.stylesheet)&&e.stylesheet.every(r=>typeof r=="string")))throw new TypeError("describe(): `stylesheet` must be a string or array of strings");if(e.formAssociated!==void 0&&typeof e.formAssociated!="boolean")throw new TypeError("describe(): `formAssociated` must be a boolean");for(let t of or){let r=e[t];if(r!==void 0&&typeof r!="function")throw new TypeError(`describe(): \`${t}\` must be a function`)}if(e.if!==void 0&&typeof e.if!="function")throw new TypeError("describe(): `if` must be a function");if(e.for!==void 0){let t=e.for;if(t===null||typeof t!="object"||Array.isArray(t))throw new TypeError("describe(): `for` must be a record");if(typeof t.items!="function")throw new TypeError("describe(): `for.items` must be a function");if(typeof t.key!="function")throw new TypeError("describe(): `for.key` must be a function");if(typeof t.render!="function")throw new TypeError("describe(): `for.render` must be a function")}if(e.props!==void 0){let t=e.props;if(t===null||typeof t!="object"||Array.isArray(t))throw new TypeError("describe(): `props` must be a record");for(let[r,n]of Object.entries(t)){if(n===null||typeof n!="object"||Array.isArray(n))throw new TypeError(`describe(): props.${r} must be a record`);if(!ar.has(n.type))throw new TypeError(`describe(): props.${r}.type must be one of "string", "number", "boolean", "json"`)}}return{...e}}var tt=Symbol.for("tan-compose.SafeHtml"),_e=class{value;[tt]=!0;constructor(t){this.value=t}toString(){return this.value}};function Oe(e){return typeof e=="object"&&e!==null&&e[tt]===!0}var rt=new Map,sr=/^[a-z][a-z0-9]*(-[a-z0-9]+)+$/,ir=/^(\S+)(?:\s+(.+))?$/,lr=new Set(["focus","blur","mouseenter","mouseleave","pointerenter","pointerleave","load","error","scroll"]),nt=50;function cr(e){return e.replace(/[A-Z]/g,t=>"-"+t.toLowerCase())}function st(e){return Oe(e)?e.value:e}function ot(e){return e.replace(/(["\\])/g,"\\$1")}function b(e,t){let r=t;if(typeof e!="string"||!sr.test(e))throw new TypeError(`build(): "${e}" is not a valid custom element name (must be lowercase and contain a hyphen).`);if(rt.has(e))return console.warn(`Component "${e}" is already registered. Skipping re-registration.`),e;if(typeof HTMLElement>"u"||typeof customElements>"u")return console.warn("HTMLElement or customElements not available; skipping component registration."),e;let n=r.props??{},o=new Map,a=new Map,s=new Set(r.observedAttributes??[]);for(let g of Object.keys(n)){let c=cr(g);o.set(c,g),o.set(g.toLowerCase(),g),s.add(c),s.add(g.toLowerCase()),a.set(g,c)}let i=Array.from(s),l=r.refs??{},d=pr(r);class f extends HTMLElement{static get observedAttributes(){return i}static get formAssociated(){return r.formAssociated===!0}isMounted=!1;mountCleanups=[];renderCleanups=[];state=new Map;propValues=new Map;listSlots=new WeakMap;allSlots=new Set;currentRefs={};container;ctx;rendering=!1;renderQueued=!1;renderTick=0;renderTickScheduled=!1;internals;constructor(){super();let c=this.attachShadow({mode:"open"});r.formAssociated&&typeof this.attachInternals=="function"&&(this.internals=this.attachInternals()),fr(c,d),this.container=document.createElement("div"),this.container.className=r.className?`container ${r.className}`:"container",c.appendChild(this.container),r.attributes&&ct(this,r.attributes),this.ctx=ur(this,this.propValues,this.state,()=>this.currentRefs),this.initProps()}get refs(){return this.currentRefs}initProps(){for(let[c,u]of Object.entries(n)){let p=this.getAttribute(a.get(c)??c)??this.getAttribute(c),m=p!==null?at(p,u.type):u.default;this.propValues.set(c,m),this.maybeSyncFormValue(c,m),Object.defineProperty(this,c,{configurable:!0,enumerable:!0,get:()=>this.propValues.get(c),set:v=>{let x=hr(v,u.type),y=this.propValues.get(c);Object.is(y,x)||(this.propValues.set(c,x),u.reflect&&br(this,a.get(c)??c,x,u.type),this.maybeSyncFormValue(c,x),this.isMounted&&this.scheduleRender())}})}}maybeSyncFormValue(c,u){if(!this.internals||c!=="value")return;let p=u==null?null:String(u);this.internals.setFormValue(p)}connectedCallback(){if(!this.isMounted){try{r.beforeMount?.call(this)}catch(c){console.error(`[tan-compose] beforeMount threw for <${e}>:`,c)}if(this.renderInternal(),r.action){let c=r.action;this.addEventListener("click",c),this.mountCleanups.push(()=>this.removeEventListener("click",c))}if(r.emit)for(let c of r.emit)this.addEventListener(c.name,c.handler),this.mountCleanups.push(()=>this.removeEventListener(c.name,c.handler));r.events&&this.attachDelegatedEvents(r.events),this.isMounted=!0;try{r.afterMount?.call(this)}catch(c){console.error(`[tan-compose] afterMount threw for <${e}>:`,c)}}}disconnectedCallback(){try{r.unmount?.call(this)}catch(c){console.error(`[tan-compose] unmount threw for <${e}>:`,c)}te(this.mountCleanups),te(this.renderCleanups),this.flushListSlots(),this.isMounted=!1}flushListSlots(){for(let c of this.allSlots){for(let u of c.cache.values())te(u.cleanups);c.cache.clear()}this.allSlots.clear()}attributeChangedCallback(c,u,p){if(u===p)return;let m=o.get(c);if(m){let v=n[m],x=p!==null?at(p,v.type):v.default,y=this.propValues.get(m);Object.is(y,x)||(this.propValues.set(m,x),this.maybeSyncFormValue(m,x),this.isMounted&&this.scheduleRender());return}this.state.set(c,p),this.isMounted&&this.scheduleRender()}setState(c,u){let p=this.state.get(c);Object.is(p,u)||(this.state.set(c,u),this.isMounted&&this.scheduleRender())}getState(c){return this.state.get(c)}render(){this.renderInternal()}emitEvent(c,u){this.dispatchEvent(new CustomEvent(c,{detail:u,bubbles:!0,composed:!0}))}scheduleRender(){if(this.rendering){this.renderQueued=!0;return}this.renderInternal()}getOrCreateSlot(c){let u=this.listSlots.get(c);return u||(u={cache:new Map},this.listSlots.set(c,u),this.allSlots.add(u)),u}renderInternal(){if(++this.renderTick>nt){console.error(`[tan-compose] <${e}> exceeded ${nt} renders in one turn \u2014 aborting to break a render loop (check afterRender / setState).`),this.renderTick=0,this.renderQueued=!1;return}if(!this.renderTickScheduled){this.renderTickScheduled=!0;let u=()=>{this.renderTick=0,this.renderTickScheduled=!1};typeof queueMicrotask=="function"?queueMicrotask(u):Promise.resolve().then(u)}this.rendering=!0;let c=this.captureFocusInShadow();try{te(this.renderCleanups),this.container.replaceChildren();let u={host:this,cleanups:this.renderCleanups,ctx:this.ctx};if(r.template!==void 0){let p=typeof r.template=="function"?r.template(this.ctx):r.template,m=st(p);m&&(this.container.innerHTML=m)}if(r.children)for(let p of r.children){let m=it(p,u,v=>this.getOrCreateSlot(v));m&&this.container.appendChild(m)}this.container.appendChild(document.createElement("slot")),this.refreshRefs()}finally{this.rendering=!1}if(c&&this.restoreFocusInShadow(c),this.renderQueued){this.renderQueued=!1,this.renderInternal();return}try{r.afterRender?.call(this)}catch(u){console.error(`[tan-compose] afterRender threw for <${e}>:`,u)}}captureFocusInShadow(){let c=this.shadowRoot;if(!c)return null;let u=c.activeElement;if(!u)return null;let p=[],m=u;for(;m&&m!==c;){let y=m.parentNode;if(!y)break;let k=m.tagName,E=Array.from(y.children).filter(C=>C.tagName===k).indexOf(m);if(p.unshift({tag:k,idx:E}),m=y instanceof Element?y:null,!m&&y===c)break}let v=null,x=null;if(u instanceof HTMLInputElement||u instanceof HTMLTextAreaElement)try{v=u.selectionStart,x=u.selectionEnd}catch{}return{id:u.id||null,name:u.getAttribute("name"),path:p,selectionStart:v,selectionEnd:x}}restoreFocusInShadow(c){let u=this.shadowRoot;if(!u)return;let p=null;if(c.id&&(p=u.getElementById?.(c.id)??u.querySelector(`[id="${ot(c.id)}"]`)),!p&&c.name&&(p=u.querySelector(`[name="${ot(c.name)}"]`)),!p){let m=u;for(let v of c.path){let x=Array.from(m.children??[]),M=(x.length>0?x:Array.from(m.children??[])).filter(E=>E.tagName===v.tag)[v.idx];if(!M)return;m=M}p=m}if(!(!p||typeof p.focus!="function")&&u.activeElement!==p&&(p.focus(),c.selectionStart!=null&&(p instanceof HTMLInputElement||p instanceof HTMLTextAreaElement)))try{p.setSelectionRange(c.selectionStart,c.selectionEnd??c.selectionStart)}catch{}}refreshRefs(){let c={},u=this.shadowRoot;for(let[p,m]of Object.entries(l))c[p]=u?u.querySelector(m):null;this.currentRefs=c}formAssociatedCallback(c){try{r.formAssociatedCallback?.call(this,c)}catch(u){console.error(`[tan-compose] formAssociatedCallback threw for <${e}>:`,u)}}formDisabledCallback(c){try{r.formDisabledCallback?.call(this,c)}catch(u){console.error(`[tan-compose] formDisabledCallback threw for <${e}>:`,u)}}formResetCallback(){try{r.formResetCallback?.call(this)}catch(c){console.error(`[tan-compose] formResetCallback threw for <${e}>:`,c)}}formStateRestoreCallback(c,u){try{r.formStateRestoreCallback?.call(this,c,u)}catch(p){console.error(`[tan-compose] formStateRestoreCallback threw for <${e}>:`,p)}}attachDelegatedEvents(c){let u=new Map;for(let[p,m]of Object.entries(c)){let v=ir.exec(p.trim());if(!v)continue;let[,x,y]=v;u.has(x)||u.set(x,[]),u.get(x).push({selector:y??null,handler:m})}for(let[p,m]of u){let v=y=>{for(let{selector:k,handler:M}of m){if(!k){M(y,this.ctx);continue}let E=y.composedPath();for(let C of E){if(C===this.shadowRoot||C===this)break;if(C instanceof Element&&this.shadowRoot?.contains(C)&&C.matches(k)){M(y,this.ctx);break}}}},x=lr.has(p);this.shadowRoot.addEventListener(p,v,x),this.mountCleanups.push(()=>this.shadowRoot?.removeEventListener(p,v,x))}}}return rt.set(e,f),customElements.define(e,f),e}function it(e,t,r){return e.if&&!e.if(t.ctx)?null:lt(e,t,r)}function lt(e,t,r){let n=document.createElement(e.tag||"div");if(e.styles&&(n.style.cssText=Object.entries(e.styles).map(([o,a])=>`${o}: ${a}`).join("; ")),e.className&&(n.className=e.className),e.attributes&&ct(n,e.attributes),e.template!==void 0){let o=typeof e.template=="function"?e.template(t.ctx):e.template,a=st(o);a&&(n.innerHTML=a)}if(e.children)for(let o of e.children){let a=it(o,t,r);a&&n.appendChild(a)}if(e.for&&dr(n,e,t,r),e.action){let o=e.action;n.addEventListener("click",o),t.cleanups.push(()=>n.removeEventListener("click",o))}if(e.emit)for(let o of e.emit)n.addEventListener(o.name,o.handler),t.cleanups.push(()=>n.removeEventListener(o.name,o.handler));return n}function dr(e,t,r,n){let o=t.for,a=n(t),s=o.items(r.ctx),i=new Map;for(let l=0;l<s.length;l++){let d=s[l],f=o.key(d,l),g,c=a.cache.get(f);if(c&&Object.is(c.lastItem,d))g=c;else{let u=[],p=o.render(d,l,r.ctx),m=lt(p,{...r,cleanups:u},n);c&&te(c.cleanups),g={element:m,lastItem:d,cleanups:u}}i.set(f,g),e.appendChild(g.element)}for(let[l,d]of a.cache)i.has(l)||te(d.cleanups);a.cache=i}function ur(e,t,r,n){return{host:e,get props(){let o={};for(let[a,s]of t)o[a]=s;return o},get state(){let o={};for(let[a,s]of r)o[a]=s;return o},get refs(){return n()},setState:(o,a)=>e.setState(o,a),getState:o=>e.getState(o),emit:(o,a)=>e.emitEvent(o,a)}}function pr(e){let t=[];if(e.theme&&t.push(gr(e.theme)),e.stylesheet){let n=Array.isArray(e.stylesheet)?e.stylesheet:[e.stylesheet];for(let o of n)o&&t.push(o)}if(e.styles&&t.push(mr(e.styles)),t.length===0)return{kind:"adopted",sheets:[]};if(typeof CSSStyleSheet<"u"&&typeof CSSStyleSheet.prototype.replaceSync=="function"){let n=[];for(let o of t){let a=new CSSStyleSheet;a.replaceSync(o),n.push(a)}return{kind:"adopted",sheets:n}}return{kind:"fallback",cssList:t}}function fr(e,t){if(t.kind==="adopted"){if(t.sheets.length>0)try{e.adoptedStyleSheets=t.sheets}catch{}return}for(let r of t.cssList){let n=document.createElement("style");n.textContent=r,e.appendChild(n)}}function ct(e,t){for(let[r,n]of Object.entries(t))e.setAttribute(r,n)}function gr(e){return`:host { ${Object.entries(e).map(([r,n])=>`--${r}: ${n};`).join(" ")} }`}function mr(e){return`.container { ${Object.entries(e).map(([r,n])=>`${r}: ${n};`).join(" ")} }`}function te(e){for(;e.length>0;){let t=e.pop();try{t?.()}catch(r){console.error("[tan-compose] cleanup threw:",r)}}}function at(e,t){switch(t){case"string":return e;case"number":{let r=Number(e);return Number.isNaN(r)?void 0:r}case"boolean":return e!=="false"&&e!=="0";case"json":try{return JSON.parse(e)}catch{return}}}function hr(e,t){switch(t){case"string":return e==null?e:String(e);case"number":return e==null?e:Number(e);case"boolean":return!!e;case"json":return e}}function br(e,t,r,n){if(n!=="json"){if(n==="boolean"){r?e.setAttribute(t,""):e.removeAttribute(t);return}if(r==null){e.removeAttribute(t);return}e.setAttribute(t,String(r))}}var vr="tc-button";var dt=`
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
`;b(vr,h({props:{variant:{type:"string",default:"primary"},size:{type:"string",default:"md"},disabled:{type:"boolean",default:!1,reflect:!0},loading:{type:"boolean",default:!1},block:{type:"boolean",default:!1},href:{type:"string",default:""},target:{type:"string",default:""},rel:{type:"string",default:""},type:{type:"string",default:"button"}},theme:{"tc-btn-primary-bg":"var(--tc-color-ink, #14171f)","tc-btn-primary-fg":"var(--tc-color-surface, #ffffff)","tc-btn-secondary-bg":"var(--tc-color-surface, #ffffff)","tc-btn-secondary-fg":"var(--tc-color-ink, #14171f)","tc-btn-secondary-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-btn-ghost-fg":"var(--tc-color-ink, #14171f)","tc-btn-ghost-border":"transparent","tc-btn-danger-bg":"var(--tc-color-danger, #b3261e)","tc-btn-danger-fg":"var(--tc-color-surface, #ffffff)","tc-btn-radius":"var(--tc-radius-md, 8px)","tc-btn-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-btn-padding-x":"initial","tc-btn-padding-y":"initial"},styles:{display:"inline-block","vertical-align":"middle"},template:({props:e})=>{let t=`root v-${ge(e.variant)} s-${ge(e.size)}${e.block?" block":""}`,r=`${e.loading?'<span class="spinner" aria-hidden="true"></span>':""}
        <span class="content"><slot></slot></span>`,n=String(e.href??""),o=n.length>0,a=!!(e.disabled||e.loading);if(o){let l=e.target?` target="${ge(e.target)}"`:"",d=e.rel?String(e.rel):String(e.target)==="_blank"?"noopener":"",f=d?` rel="${ge(d)}"`:"",g=a?"":` href="${ge(n)}"`;return`
      <a
        part="button"
        class="${t}"${g}${l}${f}${a?' aria-disabled="true"':""}${a?' tabindex="-1"':""}
        role="button"
      >
        ${r}
      </a>${dt}`}let s=String(e.type??"button");return`
      <button
        part="button"
        class="${t}"
        ${a?"disabled":""}
        type="${s==="submit"||s==="reset"?s:"button"}"
      >
        ${r}
      </button>${dt}`},events:{"click .root":(e,t)=>{let r=t.host;if(r.disabled||r.loading||String(r.href??""))return;let n=String(r.type??"button");if(n!=="submit"&&n!=="reset")return;let o=r.closest("form");if(!o)return;let a=n==="submit"?"tc-submit":"tc-reset",s=new CustomEvent(a,{detail:{form:o},bubbles:!0,composed:!0,cancelable:!0});r.dispatchEvent(s),!s.defaultPrevented&&(n==="submit"?o.requestSubmit():o.reset())}}}));function ge(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var yr="tc-input";b(yr,h({formAssociated:!0,props:{value:{type:"string",default:""},name:{type:"string",default:""},type:{type:"string",default:"text"},placeholder:{type:"string",default:""},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0}},theme:{"tc-input-bg":"var(--tc-color-surface, #ffffff)","tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-border-focus":"var(--tc-color-accent, #a16939)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-radius":"var(--tc-radius-md, 8px)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},refs:{input:"input"},template:({props:e})=>{let t=!!e.error;return`
        ${e.label?`<label class="label">${re(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</label>`:""}
        <input
          class="input ${t?"invalid":""}"
          part="input"
          type="${re(e.type)}"
          value="${re(e.value)}"
          name="${re(e.name)}"
          placeholder="${re(e.placeholder)}"
          ${e.disabled?"disabled":""}
          ${e.required?"required":""}
          aria-invalid="${t?"true":"false"}"
        />
        ${e.error||e.helper?`<div class="${t?"error":"helper"}">${re(e.error||e.helper)}</div>`:""}
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
      `},events:{"input input":(e,t)=>{let r=e.target.value,n=t.host;n.internals?.setFormValue(r),n.value=r,t.emit("tc-input",{value:r})}},formResetCallback(){this.value=""}}));function re(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var xr="tc-textarea";b(xr,h({formAssociated:!0,props:{value:{type:"string",default:""},name:{type:"string",default:""},placeholder:{type:"string",default:""},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},rows:{type:"number",default:4},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0},resize:{type:"string",default:"vertical"}},theme:{"tc-input-bg":"var(--tc-color-surface, #ffffff)","tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-border-focus":"var(--tc-color-accent, #a16939)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-radius":"var(--tc-radius-md, 8px)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},refs:{input:"textarea"},template:({props:e})=>{let t=!!e.error;return`
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
      `},events:{"input textarea":(e,t)=>{let r=e.target.value,n=t.host;n.internals?.setFormValue(r),n.value=r,t.emit("tc-input",{value:r})}},formResetCallback(){this.value=""}}));function J(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var kr="tc-select";b(kr,h({formAssociated:!0,props:{value:{type:"string",default:""},name:{type:"string",default:""},options:{type:"json",default:[]},placeholder:{type:"string",default:""},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0}},theme:{"tc-input-bg":"var(--tc-color-surface, #ffffff)","tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-border-focus":"var(--tc-color-accent, #a16939)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-radius":"var(--tc-radius-md, 8px)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},template:({props:e})=>{let t=e.options??[],r=!!e.error;return`
        ${e.label?`<label class="label">${ne(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</label>`:""}
        <div class="wrap">
          <select
            class="select ${r?"invalid":""}"
            part="select"
            name="${ne(e.name)}"
            ${e.disabled?"disabled":""}
            ${e.required?"required":""}
            aria-invalid="${r?"true":"false"}"
          >
            ${e.placeholder?`<option value="" disabled ${e.value===""?"selected":""}>${ne(e.placeholder)}</option>`:""}
            ${t.map(n=>`<option value="${ne(n.value)}"${n.disabled?" disabled":""}${n.value===e.value?" selected":""}>${ne(n.label)}</option>`).join("")}
          </select>
          <span class="caret" aria-hidden="true">\u25BE</span>
        </div>
        ${e.error||e.helper?`<div class="${r?"error":"helper"}">${ne(e.error||e.helper)}</div>`:""}
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
      `},events:{"change select":(e,t)=>{let r=e.target.value,n=t.host;n.internals?.setFormValue(r),n.value=r,t.emit("tc-change",{value:r})}},formResetCallback(){this.value=""}}));function ne(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var wr="tc-checkbox";b(wr,h({formAssociated:!0,props:{checked:{type:"boolean",default:!1,reflect:!0},name:{type:"string",default:""},value:{type:"string",default:"on"},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0},indeterminate:{type:"boolean",default:!1}},theme:{"tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-border-focus":"var(--tc-color-accent, #a16939)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-radius":"var(--tc-radius-sm, 4px)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-checkbox-accent":"var(--tc-color-accent, #a16939)"},styles:{display:"block"},template:({props:e})=>{let t=!!e.error;return`
        <label class="row ${e.disabled?"is-disabled":""} ${t?"is-invalid":""}">
          <input
            class="cb"
            type="checkbox"
            name="${Me(e.name)}"
            value="${Me(e.value)}"
            ${e.checked?"checked":""}
            ${e.disabled?"disabled":""}
            ${e.required?"required":""}
            aria-invalid="${t?"true":"false"}"
          />
          ${e.label?`<span class="label">${Me(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</span>`:"<span></span>"}
        </label>
        ${e.error||e.helper?`<div class="${t?"error":"helper"}">${Me(e.error||e.helper)}</div>`:""}
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
      `},refs:{input:".cb"},events:{"change .cb":(e,t)=>{let r=e.target.checked,n=t.host;n.checked=r,n.internals?.setFormValue(r?n.value:null),t.emit("tc-change",{checked:r})}},afterMount(){let e=this,r=e.shadowRoot?.querySelector(".cb");r&&(r.indeterminate=e.indeterminate),e.internals?.setFormValue(e.checked?e.value:null)},formResetCallback(){this.checked=!1}}));function Me(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var $r="tc-switch";b($r,h({formAssociated:!0,props:{checked:{type:"boolean",default:!1,reflect:!0},name:{type:"string",default:""},value:{type:"string",default:"on"},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},disabled:{type:"boolean",default:!1,reflect:!0}},theme:{"tc-switch-track-off":"var(--tc-color-rule-strong, #d9cfb8)","tc-switch-track-on":"var(--tc-color-accent, #a16939)","tc-switch-thumb":"var(--tc-color-surface, #ffffff)","tc-switch-fg":"var(--tc-color-ink, #14171f)","tc-switch-helper":"var(--tc-color-ink-muted, #6b7280)","tc-switch-error":"var(--tc-color-danger, #b3261e)","tc-switch-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},template:({props:e})=>{let t=!!e.error;return`
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
          ${e.label?`<span class="label">${ut(e.label)}</span>`:""}
        </label>
        ${e.error||e.helper?`<div class="${t?"error":"helper"}">${ut(e.error||e.helper)}</div>`:""}
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
      `},events:{"click .track":(e,t)=>{let r=t.host;r.disabled||(r.checked=!r.checked,r.internals?.setFormValue(r.checked?r.value:null),t.emit("tc-change",{checked:r.checked}))},"keydown .track":(e,t)=>{let r=e;if(r.key!==" "&&r.key!=="Enter")return;r.preventDefault();let n=t.host;n.disabled||(n.checked=!n.checked,n.internals?.setFormValue(n.checked?n.value:null),t.emit("tc-change",{checked:n.checked}))}},afterMount(){let e=this;e.internals?.setFormValue(e.checked?e.value:null)},formResetCallback(){this.checked=!1}}));function ut(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Mr="tc-file";b(Mr,h({formAssociated:!0,props:{name:{type:"string",default:""},accept:{type:"string",default:""},multiple:{type:"boolean",default:!1,reflect:!0},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},buttonText:{type:"string",default:"Choose file"},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0}},theme:{"tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-border-focus":"var(--tc-color-accent, #a16939)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-radius":"var(--tc-radius-md, 8px)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-file-zone-bg":"var(--tc-color-surface-alt, #faf8f3)","tc-file-zone-fg":"var(--tc-color-ink-soft, #4a5061)"},styles:{display:"block"},refs:{input:"input[type='file']"},template:({props:e,state:t})=>{let r=!!e.error,n=t.files??[],o=n.length===0?"No file selected":n.length===1?oe(n[0].name):`${n.length} files selected`;return`
        ${e.label?`<label class="label">${oe(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</label>`:""}
        <div class="zone ${e.disabled?"is-disabled":""} ${r?"is-invalid":""}">
          <button class="btn" type="button" ${e.disabled?"disabled":""}>
            ${oe(e.buttonText)}
          </button>
          <span class="files">${o}</span>
          <input
            class="native"
            type="file"
            name="${oe(e.name)}"
            accept="${oe(e.accept)}"
            ${e.multiple?"multiple":""}
            ${e.disabled?"disabled":""}
            ${e.required?"required":""}
            tabindex="-1"
            aria-hidden="true"
          />
        </div>
        ${e.error||e.helper?`<div class="${r?"error":"helper"}">${oe(e.error||e.helper)}</div>`:""}
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
      `},events:{"click .btn":(e,t)=>{t.refs.input?.click()},"change input[type='file']":(e,t)=>{let r=e.target,n=Array.from(r.files??[]);t.setState("files",n);let o=t.host;if(o.internals)if(n.length===0)o.internals.setFormValue(null);else if(n.length===1)o.internals.setFormValue(n[0]);else{let a=new FormData,s=o.name;for(let i of n)a.append(s,i);o.internals.setFormValue(a)}t.emit("tc-files",{files:n})}},formResetCallback(){let t=this.shadowRoot?.querySelector(".native");t&&(t.value=""),this.setState("files",[])}}));function oe(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Er="tc-radio-group";b(Er,h({formAssociated:!0,props:{value:{type:"string",default:""},name:{type:"string",default:""},options:{type:"json",default:[]},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},layout:{type:"string",default:"vertical"},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0}},theme:{"tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-radio-accent":"var(--tc-color-accent, #a16939)"},styles:{display:"block"},template:({props:e})=>{let t=e.options??[],r=!!e.error,n=String(e.layout??"vertical");return`
        <fieldset class="group" ${e.disabled?"disabled":""}>
          ${e.label?`<legend class="legend">${ae(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</legend>`:""}
          <div class="opts l-${ae(n)}" role="radiogroup" aria-invalid="${r?"true":"false"}">
            ${t.map((o,a)=>`<label class="opt ${o.disabled?"is-disabled":""}">
                  <input
                    type="radio"
                    class="r"
                    name="${ae(e.name)||`__rg_${a}__`}"
                    value="${ae(o.value)}"
                    ${o.value===e.value?"checked":""}
                    ${o.disabled||e.disabled?"disabled":""}
                  />
                  <span>${ae(o.label)}</span>
                </label>`).join("")}
          </div>
        </fieldset>
        ${e.error||e.helper?`<div class="${r?"error":"helper"}">${ae(e.error||e.helper)}</div>`:""}
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
      `},events:{"change input.r":(e,t)=>{let r=e.target.value,n=t.host;n.value=r,n.internals?.setFormValue(r),t.emit("tc-change",{value:r})}},afterMount(){let e=this;e.value&&e.internals?.setFormValue(e.value)},formResetCallback(){this.value=""}}));function ae(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Sr="tc-table";var Tr=`
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
`,Fe=new WeakMap;b(Sr,h({props:{rows:{type:"json",default:[]},columns:{type:"json",default:[]},pageSize:{type:"number",default:10},filterable:{type:"boolean",default:!0},emptyText:{type:"string",default:"No results."},rowKey:{type:"string",default:"id"}},theme:{"tc-table-surface":"var(--tc-color-surface, #ffffff)","tc-table-ink":"var(--tc-color-ink, #14171f)","tc-table-soft":"var(--tc-color-ink-soft, #5a6072)","tc-table-rule":"var(--tc-color-rule, #ece5d3)","tc-table-head-bg":"var(--tc-color-surface-alt, #faf8f3)","tc-table-row-hover":"rgba(161, 105, 57, 0.05)","tc-table-accent":"var(--tc-color-accent, #a16939)","tc-table-radius":"var(--tc-radius-lg, 10px)","tc-table-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},children:[h({tag:"style",template:Tr}),h({if:({props:e})=>!!e.filterable,tag:"input",className:"filter",attributes:{placeholder:"Search...",type:"text"}}),h({tag:"div",className:"wrap",children:[h({tag:"table",children:[h({tag:"thead",template:({props:e,state:t})=>{let r=e.columns??[],n=t;return`<tr>${r.map(o=>{let a=n.sortKey===o.key,s=o.sortable!==!1,i=a?n.sortDir==="asc"?"\u25B2":"\u25BC":"",l=a?n.sortDir==="asc"?"ascending":"descending":"none";return`<th
                        data-col="${Ee(o.key)}"
                        class="${s?"sortable":""}"
                        aria-sort="${l}"
                      >${Ee(o.label)}<span class="sort">${i}</span></th>`}).join("")}</tr>`}}),h({tag:"tbody",children:[h({tag:"tr",className:"empty",if:({props:e,state:t})=>pt(e,t).length===0,template:({props:e})=>`<td colspan="${(e.columns??[]).length||1}">${Ee(e.emptyText)}</td>`})],for:{items:({props:e,state:t})=>pt(e,t),key:(e,t)=>e["id"]??t,render:(e,t,r)=>{let o=r.props.columns??[],a=e;return h({tag:"tr",attributes:{"data-row-id":String(a.id??t)},template:o.map(s=>`<td>${typeof s.render=="function"?s.render(a):Ee(a[s.key]??"")}</td>`).join("")})}}})]})]}),h({tag:"footer",className:"pager",template:({props:e,state:t})=>{let r=t,n=Se(e,r),o=e.pageSize??10,a=Math.max(1,Math.ceil(n.length/o)),s=Math.min(r.page??0,a-1),i=(e.rows??[]).length;return`
            <span class="count">${n.length} of ${i} rows</span>
            <span class="spacer"></span>
            <button class="prev" type="button" ${s<=0?"disabled":""}>\u2039 prev</button>
            <span class="page">page ${s+1} of ${a}</span>
            <button class="next" type="button" ${s>=a-1?"disabled":""}>next \u203A</button>
          `}})],refs:{filter:".filter"},afterRender(){let e=this,t=e.refs.filter;if(!t)return;let r=e.getState("q")??"";t.value!==r&&(t.value=r);let n=Fe.get(e);if(n){Fe.delete(e),t.focus();let o=Math.min(n.caret,t.value.length);try{t.setSelectionRange(o,o)}catch{}}},events:{"input .filter":(e,t)=>{let r=e.target;Fe.set(t.host,{caret:r.selectionStart??r.value.length}),t.setState("q",r.value),t.setState("page",0)},"click .prev":(e,t)=>{let r=(t.state.page??0)-1;t.setState("page",Math.max(0,r))},"click .next":(e,t)=>{let r=t.state,n=Se(t.props,r).length,o=t.props.pageSize??10,a=Math.max(0,Math.ceil(n/o)-1),s=(r.page??0)+1;t.setState("page",Math.min(a,s))},"click th.sortable":(e,t)=>{let r=e.target.closest("th");if(!r)return;let n=r.dataset.col;if(!n)return;let o=t.state,a;o.sortKey!==n?a="asc":a=o.sortDir==="asc"?"desc":o.sortDir==="desc"?null:"asc",t.setState("sortKey",a?n:null),t.setState("sortDir",a),t.emit("tc-sort-change",{key:a?n:null,direction:a})},"click tr[data-row-id]":(e,t)=>{let r=e.target.closest("tr[data-row-id]");if(!r)return;let n=r.dataset.rowId;if(n===void 0)return;let o=Se(t.props,t.state),a=o.find(s=>String(s.id)===n)??o[Number(n)];a&&t.emit("tc-row-click",{row:a})}}}));function Se(e,t){let r=e.rows??[],n=e.columns??[],o=(t.q??"").trim().toLowerCase(),a=o.length===0?r.slice():r.filter(s=>n.some(i=>String(s[i.key]??"").toLowerCase().includes(o)));if(t.sortKey&&t.sortDir){let s=t.sortKey,i=t.sortDir==="asc"?1:-1;a=a.slice().sort((l,d)=>{let f=l[s],g=d[s];return f===g?0:f==null?1:g==null?-1:typeof f=="number"&&typeof g=="number"?(f-g)*i:String(f).localeCompare(String(g))*i})}return a}function pt(e,t){let r=e.pageSize??10,n=Se(e,t),o=Math.max(1,Math.ceil(n.length/r)),a=Math.min(t.page??0,o-1);return n.slice(a*r,a*r+r)}function Ee(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Lr="tc-tabs";b(Lr,h({props:{tabs:{type:"json",default:[]},active:{type:"string",default:"",reflect:!0}},theme:{"tc-tabs-fg":"var(--tc-color-ink, #14171f)","tc-tabs-fg-muted":"var(--tc-color-ink-muted, #6b7280)","tc-tabs-rule":"var(--tc-color-rule, #ece5d3)","tc-tabs-accent":"var(--tc-color-accent, #a16939)","tc-tabs-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block","font-family":"var(--tc-tabs-font)"},template:({props:e})=>{let t=e.tabs??[],r=e.active||t[0]?.id||"";return`
        <div role="tablist" class="strip">
          ${t.map(n=>`<button
              role="tab"
              type="button"
              class="tab ${n.id===r?"active":""}"
              data-tab="${me(n.id)}"
              aria-selected="${n.id===r?"true":"false"}"
              aria-controls="panel-${me(n.id)}"
              tabindex="${n.id===r?"0":"-1"}"
            >${me(n.label)}</button>`).join("")}
        </div>
        <div class="panels">
          ${t.map(n=>`<section
              role="tabpanel"
              id="panel-${me(n.id)}"
              class="panel"
              aria-labelledby=""
              ${n.id===r?"":"hidden"}
            ><slot name="${me(n.id)}"></slot></section>`).join("")}
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
      `},events:{"click .tab":(e,t)=>{let r=e.target.closest(".tab");if(!r)return;let n=r.dataset.tab;if(!n)return;let o=t.host,a=o.active;a!==n&&(o.active=n,t.emit("tc-tab-change",{active:n,previous:a}))},"keydown .tab":(e,t)=>{let r=e,n=t.props.tabs??[];if(n.length===0)return;let o=t.host,a=o.active||n[0].id,s=n.findIndex(d=>d.id===a),i=s;if(r.key==="ArrowRight")i=(s+1)%n.length;else if(r.key==="ArrowLeft")i=(s-1+n.length)%n.length;else if(r.key==="Home")i=0;else if(r.key==="End")i=n.length-1;else return;r.preventDefault();let l=n[i].id;o.active=l,t.emit("tc-tab-change",{active:l,previous:a}),queueMicrotask(()=>{t.host.shadowRoot?.querySelector(`.tab[data-tab="${l}"]`)?.focus()})}}}));function me(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Hr="tc-modal";var se=new WeakMap;b(Hr,h({props:{open:{type:"boolean",default:!1,reflect:!0},title:{type:"string",default:""},dismissible:{type:"boolean",default:!0},width:{type:"string",default:"min(560px, 92vw)"}},theme:{"tc-modal-surface":"var(--tc-color-surface, #ffffff)","tc-modal-ink":"var(--tc-color-ink, #14171f)","tc-modal-rule":"var(--tc-color-rule, #ece5d3)","tc-modal-soft":"var(--tc-color-ink-soft, #5a6072)","tc-modal-radius":"var(--tc-radius-lg, 12px)","tc-modal-backdrop":"rgba(20, 23, 31, 0.5)","tc-modal-shadow":"var(--tc-shadow-lg, 0 24px 60px rgba(20, 23, 31, 0.25))","tc-modal-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"contents"},template:({props:e})=>`
      <dialog class="dlg" aria-labelledby="${e.title?"title":""}">
        ${e.title||e.dismissible?`<header class="head">
              ${e.title?`<h2 id="title" class="title">${gt(e.title)}</h2>`:"<span></span>"}
              ${e.dismissible?'<button class="x" type="button" aria-label="Close">\xD7</button>':""}
            </header>`:""}
        <div class="body"><slot></slot></div>
        <footer class="foot"><slot name="footer"></slot></footer>
      </dialog>
      <style>
        .dlg {
          width: ${gt(e.width)};
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
    `,refs:{dialog:".dlg"},events:{"click .x":(e,t)=>{ft(t.host,"button")},"click .dlg":(e,t)=>{let r=t.host;if(!r.dismissible)return;let n=t.refs.dialog;n&&e.target===n&&ft(r,"backdrop")}},afterRender(){Cr(this)},unmount(){let e=se.get(this);e&&(e.cleanup(),se.delete(this))}}));function Cr(e){let t=e.shadowRoot;if(!t)return;let r=t.querySelector(".dlg");if(!r)return;let n=e.open,o=se.get(e);if(o&&o.dialog!==r&&(o.cleanup(),se.delete(e)),n&&!r.open){if(typeof r.showModal=="function")try{r.showModal()}catch{r.setAttribute("open","")}else r.setAttribute("open","");if(!se.has(e)){let a=()=>{let s=e;s.open&&(s.open=!1,e.dispatchEvent(new CustomEvent("tc-close",{detail:{reason:"escape"},bubbles:!0,composed:!0})))};r.addEventListener("close",a),se.set(e,{dialog:r,cleanup:()=>r.removeEventListener("close",a)})}}else if(!n&&r.open)try{r.close()}catch{r.removeAttribute("open")}}function ft(e,t){e.open&&(e.open=!1,e.dispatchEvent(new CustomEvent("tc-close",{detail:{reason:t},bubbles:!0,composed:!0})))}function gt(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var zr="tc-toast";var he=new WeakMap;b(zr,h({props:{open:{type:"boolean",default:!1,reflect:!0},variant:{type:"string",default:"info"},message:{type:"string",default:""},duration:{type:"number",default:4e3},dismissible:{type:"boolean",default:!0}},theme:{"tc-toast-info":"var(--tc-color-info, #3a5b8c)","tc-toast-success":"var(--tc-color-success, #207a5b)","tc-toast-warning":"var(--tc-color-warning, #a87326)","tc-toast-error":"var(--tc-color-danger, #b3261e)","tc-toast-fg":"var(--tc-color-surface, #ffffff)","tc-toast-radius":"var(--tc-radius-lg, 10px)","tc-toast-shadow":"var(--tc-shadow-lg, 0 12px 30px rgba(20, 23, 31, 0.18))","tc-toast-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},template:({props:e})=>{let t=String(e.variant??"info"),r=t==="success"?"\u2713":t==="warning"?"!":t==="error"?"\u2715":"i";return`
        <div class="toast v-${mt(t)} ${e.open?"open":"closed"}" role="status" aria-live="polite">
          <span class="icon" aria-hidden="true">${r}</span>
          <span class="msg">${e.message?mt(e.message):"<slot></slot>"}</span>
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
      `},events:{"click .x":(e,t)=>ht(t.host,"button")},afterMount(){Ar(this)},unmount(){let e=he.get(this);e!==void 0&&(clearTimeout(e),he.delete(this))}}));function Ar(e){let t=e,r=he.get(e);if(r!==void 0&&clearTimeout(r),he.delete(e),!t.open||!t.duration||t.duration<=0)return;let n=setTimeout(()=>{t.open&&ht(e,"timeout")},t.duration);he.set(e,n)}function ht(e,t){let r=e;r.open&&(r.open=!1,e.dispatchEvent(new CustomEvent("tc-toast-close",{detail:{reason:t},bubbles:!0,composed:!0})))}function mt(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Rr="tc-stat";b(Rr,h({props:{label:{type:"string",default:""},value:{type:"string",default:""},delta:{type:"string",default:""},trend:{type:"string",default:"neutral"},prefix:{type:"string",default:""},suffix:{type:"string",default:""}},theme:{"tc-stat-surface":"var(--tc-color-surface, #ffffff)","tc-stat-rule":"var(--tc-color-rule, #ece5d3)","tc-stat-label":"var(--tc-color-ink-muted, #6b7280)","tc-stat-value":"var(--tc-color-ink, #14171f)","tc-stat-up":"var(--tc-color-success, #207a5b)","tc-stat-down":"var(--tc-color-danger, #b3261e)","tc-stat-neutral":"var(--tc-color-ink-muted, #6b7280)","tc-stat-radius":"var(--tc-radius-lg, 12px)","tc-stat-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block",height:"100%"},template:({props:e})=>{let t=String(e.trend??"neutral"),r=t==="up"?"\u25B2":t==="down"?"\u25BC":"\u2022";return`
        <div class="card">
          ${e.label?`<div class="label">${ie(e.label)}</div>`:""}
          <div class="value">
            ${e.prefix?`<span class="prefix">${ie(e.prefix)}</span>`:""}
            <span class="num">${ie(e.value)}</span>
            ${e.suffix?`<span class="suffix">${ie(e.suffix)}</span>`:""}
          </div>
          ${e.delta?`<div class="delta t-${ie(t)}">
                  <span class="arrow" aria-hidden="true">${r}</span>
                  <span>${ie(e.delta)}</span>
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
      `}}));function ie(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Nr="tc-card";b(Nr,h({props:{title:{type:"string",default:""},subtitle:{type:"string",default:""},padded:{type:"boolean",default:!0},bordered:{type:"boolean",default:!0},elevated:{type:"boolean",default:!1},size:{type:"string",default:"md"}},theme:{"tc-card-surface":"var(--tc-color-surface, #ffffff)","tc-card-ink":"var(--tc-color-ink, #14171f)","tc-card-soft":"var(--tc-color-ink-soft, #5a6072)","tc-card-rule":"var(--tc-color-rule, #ece5d3)","tc-card-radius":"var(--tc-radius-lg, 12px)","tc-card-shadow":"var(--tc-shadow-md, 0 8px 24px rgba(20, 23, 31, 0.06))","tc-card-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-card-padding-x":"var(--tc-space-5, 20px)","tc-card-padding-y":"var(--tc-space-5, 20px)","tc-card-gap":"var(--tc-space-3, 12px)"},styles:{display:"block"},template:({props:e})=>{let t=!!e.title||!!e.subtitle,r=String(e.size??"md").toLowerCase();return`
        <div class="${["card",`size-${["sm","md","lg"].includes(r)?r:"md"}`,e.bordered?"bordered":"",e.elevated?"elevated":"",e.padded===!1?"nopad":"",t?"has-header":""].filter(Boolean).join(" ")}">
          <div class="media"><slot name="media"></slot></div>
          <div class="head">
            <slot name="header">
              ${e.title?`<div class="title">${bt(e.title)}</div>`:""}
              ${e.subtitle?`<div class="subtitle">${bt(e.subtitle)}</div>`:""}
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
        </style>
      `},afterMount(){let e=this,t=e.shadowRoot;if(!t)return;let r=t.querySelector(".card");if(!r)return;let n=s=>{let i=`slot[name="${s}"]`,l=t.querySelector(i);return l?l.assignedNodes().some(d=>d.nodeType===Node.ELEMENT_NODE||d.nodeType===Node.TEXT_NODE&&(d.textContent??"").trim()!==""):!1},o=()=>{r.classList.toggle("has-header-slot",n("header")),r.classList.toggle("has-footer",n("footer")),r.classList.toggle("has-media",n("media"))};o();let a=Array.from(t.querySelectorAll("slot"));for(let s of a)s.addEventListener("slotchange",o);e._cardCleanup=()=>{for(let s of a)s.removeEventListener("slotchange",o)}},unmount(){this._cardCleanup?.()}}));function bt(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Ir="tc-badge";b(Ir,h({props:{variant:{type:"string",default:"neutral"},size:{type:"string",default:"md"},pill:{type:"boolean",default:!1}},theme:{"tc-badge-radius":"var(--tc-radius-sm, 6px)","tc-badge-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-badge-neutral-bg":"var(--tc-color-rule, #ece5d3)","tc-badge-neutral-fg":"var(--tc-color-ink, #14171f)","tc-badge-info-bg":"var(--tc-color-info-bg, #dde6f4)","tc-badge-info-fg":"var(--tc-color-info-fg, #1f3a66)","tc-badge-success-bg":"var(--tc-color-success-bg, #dbece2)","tc-badge-success-fg":"var(--tc-color-success-fg, #155b40)","tc-badge-warning-bg":"var(--tc-color-warning-bg, #f5e7cf)","tc-badge-warning-fg":"var(--tc-color-warning-fg, #7a4f0a)","tc-badge-danger-bg":"var(--tc-color-danger-bg, #f4dad7)","tc-badge-danger-fg":"var(--tc-color-danger-fg, #7a1a14)"},styles:{display:"inline-block"},template:({props:e})=>`
      <span class="badge v-${vt(e.variant)} s-${vt(e.size)} ${e.pill?"pill":""}">
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
    `}));function vt(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Dr="tc-skeleton";b(Dr,h({props:{width:{type:"string",default:"100%"},height:{type:"string",default:"1em"},rounded:{type:"boolean",default:!1},pulse:{type:"boolean",default:!0}},theme:{"tc-skeleton-base":"var(--tc-color-rule, #ece5d3)","tc-skeleton-shine":"rgba(255, 255, 255, 0.6)","tc-skeleton-radius":"var(--tc-radius-md, 6px)"},styles:{display:"inline-block","vertical-align":"middle"},template:({props:e})=>`
      <span
        class="bone ${e.pulse?"pulse":""} ${e.rounded?"round":""}"
        aria-hidden="true"
        style="width: ${yt(e.width)}; height: ${yt(e.height)};"
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
    `}));function yt(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var jr="tc-stack";b(jr,h({props:{gap:{type:"string",default:"4"},align:{type:"string",default:"stretch"}},styles:{display:"block"},template:({props:e})=>`
      <div class="stack" style="--tc-stack-gap: ${qr(e.gap)}; --tc-stack-align: ${_r(e.align)};">
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
    `}));function qr(e){let t=String(e??"4").trim();return/^[1-8]$/.test(t)?`var(--tc-space-${t}, ${Br(t)})`:t}function Br(e){return{1:"4px",2:"8px",3:"12px",4:"16px",5:"24px",6:"32px",7:"48px",8:"64px"}[e]??"16px"}function _r(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Or="tc-cluster";b(Or,h({props:{gap:{type:"string",default:"3"},justify:{type:"string",default:"start"},align:{type:"string",default:"center"},wrap:{type:"boolean",default:!0}},styles:{display:"block"},template:({props:e})=>`
      <div class="cluster" style="
        --tc-cluster-gap: ${Pr(e.gap)};
        --tc-cluster-justify: ${Fr(e.justify)};
        --tc-cluster-align: ${Gr(e.align)};
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
    `}));function Fr(e){let t=String(e??"start").trim();switch(t){case"between":return"space-between";case"around":return"space-around";case"evenly":return"space-evenly";default:return t}}function Pr(e){let t=String(e??"3").trim();return/^[1-8]$/.test(t)?`var(--tc-space-${t}, ${Vr(t)})`:t}function Vr(e){return{1:"4px",2:"8px",3:"12px",4:"16px",5:"24px",6:"32px",7:"48px",8:"64px"}[e]??"12px"}function Gr(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Kr="tc-grid";b(Kr,h({props:{min:{type:"string",default:"260px"},gap:{type:"string",default:"4"},columns:{type:"string",default:""}},styles:{display:"block"},template:({props:e})=>{let t=String(e.columns??"").trim();return`
        <div class="grid" style="
          --tc-grid-template: ${t?`repeat(${xt(t)}, minmax(0, 1fr))`:`repeat(auto-fit, minmax(${xt(e.min)}, 1fr))`};
          --tc-grid-gap: ${Ur(e.gap)};
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
      `}}));function Ur(e){let t=String(e??"4").trim();return/^[1-8]$/.test(t)?`var(--tc-space-${t}, ${Yr(t)})`:t}function Yr(e){return{1:"4px",2:"8px",3:"12px",4:"16px",5:"24px",6:"32px",7:"48px",8:"64px"}[e]??"16px"}function xt(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Wr="tc-code";var Xr='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',Zr='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';b(Wr,h({props:{language:{type:"string",default:""},copy:{type:"boolean",default:!1},filename:{type:"string",default:""}},theme:{"tc-code-bg":"var(--tc-code-bg-base, #14171f)","tc-code-ink":"var(--tc-code-ink-base, #efe6d4)","tc-code-rule":"var(--tc-code-rule-base, rgba(255,255,255,0.08))","tc-code-label":"var(--tc-code-label-base, #8a8678)","tc-code-radius":"var(--tc-radius-md, 10px)","tc-code-font":"var(--tc-font-mono, 'JetBrains Mono', ui-monospace, monospace)","tc-code-padding":"var(--tc-space-5, 20px) var(--tc-space-5, 20px)","tc-code-kw":"var(--tc-code-kw-base, #f0a878)","tc-code-str":"var(--tc-code-str-base, #d9b380)","tc-code-com":"var(--tc-code-com-base, #8a8678)","tc-code-num":"var(--tc-code-num-base, #c4d3b8)","tc-code-tag":"var(--tc-code-tag-base, #d49a68)"},styles:{display:"block"},template:({props:e,state:t})=>{let r=e.filename||e.language||"",n=t.copied===!0;return`
        <div class="block">
          ${r||e.copy?`
            <header class="bar">
              <span class="label">${kt(r)}</span>
              ${e.copy?`<button type="button" class="copy" aria-label="Copy code">
                    <span class="copy-icon" aria-hidden="true">${n?Zr:Xr}</span>
                    <span class="copy-text">${n?"Copied":"Copy"}</span>
                  </button>`:""}
            </header>
          `:""}
          <pre><code class="code lang-${kt(String(e.language||"txt"))}"><slot></slot></code></pre>
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
      `},events:{"click .copy":(e,t)=>{let r=t.host,n=r.shadowRoot?.querySelector("slot"),a=(n?n.assignedNodes({flatten:!0}):Array.from(r.childNodes)).map(i=>i.textContent??"").join(""),s=()=>{t.setState("copied",!0),t.emit("tc-copy",{text:a}),setTimeout(()=>t.setState("copied",!1),1600)};navigator.clipboard?.writeText?navigator.clipboard.writeText(a).then(s,s):s()}}}));function kt(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Jr="tc-callout";var wt={note:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',info:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',success:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',warning:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',danger:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>'};b(Jr,h({props:{variant:{type:"string",default:"note"},title:{type:"string",default:""},compact:{type:"boolean",default:!1}},theme:{"tc-callout-radius":"var(--tc-radius-md, 8px)","tc-callout-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif)","tc-callout-note-bg":"var(--tc-color-surface-alt, #faf8f3)","tc-callout-note-fg":"var(--tc-color-ink-soft, #4a5061)","tc-callout-note-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-callout-info-bg":"var(--tc-color-info-bg, #dde6f4)","tc-callout-info-fg":"var(--tc-color-info-fg, #1f3a66)","tc-callout-info-border":"var(--tc-color-info, #3a5b8c)","tc-callout-success-bg":"var(--tc-color-success-bg, #dbece2)","tc-callout-success-fg":"var(--tc-color-success-fg, #155b40)","tc-callout-success-border":"var(--tc-color-success, #207a5b)","tc-callout-warning-bg":"var(--tc-color-warning-bg, #f5e7cf)","tc-callout-warning-fg":"var(--tc-color-warning-fg, #7a4f0a)","tc-callout-warning-border":"var(--tc-color-warning, #a87326)","tc-callout-danger-bg":"var(--tc-color-danger-bg, #f4dad7)","tc-callout-danger-fg":"var(--tc-color-danger-fg, #7a1a14)","tc-callout-danger-border":"var(--tc-color-danger, #b3261e)"},styles:{display:"block"},template:({props:e})=>{let t=String(e.variant??"note"),r=wt[t]??wt.note;return`
        <aside
          class="callout v-${$t(t)} ${e.compact?"compact":""}"
          role="${t==="danger"?"alert":"note"}"
        >
          <span class="icon" aria-hidden="true">${r}</span>
          <div class="body">
            ${e.title?`<div class="title">${$t(e.title)}</div>`:""}
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
      `}}));function $t(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Qr="tc-toc";var Te=new WeakMap;b(Qr,h({props:{target:{type:"string",default:"main"},levels:{type:"string",default:"h2,h3"},sticky:{type:"boolean",default:!0},label:{type:"string",default:"On this page"}},theme:{"tc-toc-fg":"var(--tc-color-ink, #14171f)","tc-toc-fg-muted":"var(--tc-color-ink-muted, #6b7280)","tc-toc-active":"var(--tc-color-accent, #a16939)","tc-toc-rule":"var(--tc-color-rule, #ece5d3)","tc-toc-label":"var(--tc-color-ink-soft, #4a5061)","tc-toc-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif)","tc-toc-top":"80px"},styles:{display:"block"},template:({props:e,state:t})=>{let r=t.items??[],n=t.activeId??"";return`
        <nav
          class="toc${e.sticky?" sticky":""}"
          aria-label="Table of contents"
        >
          ${e.label?`<div class="label">${Pe(e.label)}</div>`:""}
          ${r.length===0?'<p class="empty">No sections yet.</p>':`<ol class="list">${r.map(o=>`<li class="lvl-${o.level}${o.id===n?" active":""}"><a href="#${Pe(o.id)}">${Pe(o.text)}</a></li>`).join("")}</ol>`}
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
      `},afterMount(){en(this)},unmount(){Te.get(this)?.observer?.disconnect(),Te.delete(this)}}));function en(e){Te.get(e)?.observer?.disconnect();let r=e,n=r.target||"main",o=(r.levels||"h2,h3").split(",").map(d=>d.trim().toLowerCase()).filter(Boolean),a=document.querySelector(n);if(!a)return;let s=Array.from(a.querySelectorAll(o.join(","))).filter(d=>d instanceof HTMLElement),i=s.map(d=>(d.id||(d.id=tn(d.textContent??"")),{id:d.id,level:parseInt(d.tagName.slice(1),10),text:(d.textContent??"").trim()}));if(e.setState("items",i),typeof IntersectionObserver>"u")return;let l=new IntersectionObserver(d=>{let g=d.filter(u=>u.isIntersecting).sort((u,p)=>u.boundingClientRect.top-p.boundingClientRect.top)[0];if(!g)return;let c=g.target.id;c&&e.setState("activeId",c)},{rootMargin:"0px 0px -70% 0px",threshold:0});for(let d of s)l.observe(d);Te.set(e,{observer:l,activeId:""})}function tn(e){return e.toLowerCase().trim().replace(/[^\w\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-")||"section"}function Pe(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var rn="tc-pagination";b(rn,h({props:{current:{type:"number",default:1},total:{type:"number",default:1},siblings:{type:"number",default:1},boundaries:{type:"number",default:1},size:{type:"string",default:"sm"},"prev-label":{type:"string",default:"Prev"},"next-label":{type:"string",default:"Next"},label:{type:"string",default:"Pagination"}},styles:{display:"block"},template:({props:e})=>{let t=Math.max(1,Number(e.total)|0),r=nn(Number(e.current)|0,1,t),n=Math.max(0,Number(e.siblings)|0),o=Math.max(0,Number(e.boundaries)|0);if(t<=1)return"";let a=on(r,t,n,o),s=Le(String(e.size??"sm")),i=r<=1?" disabled":"",l=r>=t?" disabled":"",d=a.map(f=>{if(f==="\u2026")return'<span class="ellipsis" aria-hidden="true">\u2026</span>';let g=f===r;return`<tc-button
            class="num"
            size="${s}"
            variant="${g?"primary":"ghost"}"
            data-page="${f}"${g?' aria-current="page"':""}
          >${f}</tc-button>`}).join("");return`
        <nav aria-label="${Le(String(e.label??"Pagination"))}">
          <tc-button
            class="prev"
            size="${s}"
            variant="ghost"
            data-page="${r-1}"${i}
          >\u2190 ${Le(String(e["prev-label"]??"Prev"))}</tc-button>
          <span class="pages">${d}</span>
          <tc-button
            class="next"
            size="${s}"
            variant="ghost"
            data-page="${r+1}"${l}
          >${Le(String(e["next-label"]??"Next"))} \u2192</tc-button>
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
      `},events:{"click tc-button":(e,t)=>{let r=e.target.closest("tc-button");if(!r||r.hasAttribute("disabled"))return;let n=r.getAttribute("data-page");if(n==null)return;let o=Number(n),a=t.host,s=Math.max(1,Number(a.total)|0),i=Number(a.current)|0;!Number.isFinite(o)||o<1||o>s||o!==i&&t.emit("tc-page-change",{page:o})}}}));function nn(e,t,r){return Math.min(r,Math.max(t,e))}function on(e,t,r,n){let o=new Set;for(let i=1;i<=Math.min(n,t);i++)o.add(i);for(let i=Math.max(1,t-n+1);i<=t;i++)o.add(i);for(let i=Math.max(1,e-r);i<=Math.min(t,e+r);i++)o.add(i);let a=[...o].sort((i,l)=>i-l),s=[];for(let i=0;i<a.length;i++)i>0&&a[i]-a[i-1]>1&&s.push("\u2026"),s.push(a[i]);return s}function Le(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var an="tc-combobox";function be(e){if(Array.isArray(e))return e.map(r=>String(r)).filter(Boolean);let t=String(e??"").trim();return t?t.split(",").map(r=>r.trim()).filter(Boolean):[]}function ve(e){return e.join(",")}function sn(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}var ln=`
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
`;b(an,h({formAssociated:!0,props:{value:{type:"string",default:""},name:{type:"string",default:""},options:{type:"json",default:[]},multiple:{type:"boolean",default:!1},searchable:{type:"boolean",default:!0},placeholder:{type:"string",default:""},"empty-text":{type:"string",default:"No results"},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0},max:{type:"number",default:0}},theme:{"tc-input-bg":"var(--tc-color-surface, #ffffff)","tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-border-focus":"var(--tc-color-accent, #a16939)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-radius":"var(--tc-radius-md, 8px)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-combobox-chip-bg":"var(--tc-color-accent-soft, #efe2cf)","tc-combobox-chip-fg":"var(--tc-color-accent-hover, #8a572d)","tc-combobox-popup-bg":"var(--tc-color-surface, #ffffff)","tc-combobox-popup-hover":"var(--tc-color-accent-soft, #efe2cf)","tc-combobox-popup-active":"var(--tc-color-accent-soft, #efe2cf)"},styles:{display:"block"},refs:{search:".search",popup:".popup"},template:({props:e,state:t})=>{let r=e.options??[],n=!!e.multiple,o=e.searchable!==!1,a=!!e.disabled,s=!!e.error,i=be(e.value),l=String(t.query??""),d=!!t.open&&!a,f=Number(t.focusedIndex??-1),g=Mt(r,l),c=new Set(i),u=i.map($=>r.find(O=>O.value===$)).filter($=>!!$),p=o&&(d||n&&i.length===0),m=!n&&i.length===1&&(!d||!o),v=i.length===0&&!p&&!m,x=n?u.map($=>`<span class="chip" data-value="${N($.value)}">
              ${$.icon?`<span class="chip-icon">${N($.icon)}</span>`:""}
              <span class="chip-label">${N($.label)}</span>
              <button
                type="button"
                class="chip-remove"
                data-remove="${N($.value)}"
                aria-label="Remove ${N($.label)}"
                ${a?"disabled":""}
              >&times;</button>
            </span>`).join(""):"",y=m&&u[0]?`<span class="single">
            ${u[0].icon?`<span class="single-icon">${N(u[0].icon)}</span>`:""}
            <span class="single-label">${N(u[0].label)}</span>
          </span>`:"",k=v?`<span class="placeholder">${N(e.placeholder??"")}</span>`:"",M=p?`<input
            type="text"
            class="search"
            part="search"
            value="${N(l)}"
            placeholder="${N(i.length===0?e.placeholder??"":"")}"
            ${a?"disabled":""}
            autocomplete="off"
            aria-autocomplete="list"
            aria-expanded="${d?"true":"false"}"
            role="combobox"
          />`:"",E=g.length===0?`<div class="empty">${N(e["empty-text"]??"No results")}</div>`:g.map(($,O)=>{let I=c.has($.value);return`<div
              class="${["option",I?"selected":"",O===f?"focused":"",$.disabled?"disabled":""].filter(Boolean).join(" ")}"
              role="option"
              data-value="${N($.value)}"
              data-index="${O}"
              aria-selected="${I?"true":"false"}"
              ${$.disabled?'aria-disabled="true"':""}
            >
              ${n?`<span class="check" aria-hidden="true">${I?"\u2713":""}</span>`:""}
              ${$.icon?`<span class="opt-icon">${N($.icon)}</span>`:""}
              <span class="opt-label">${N($.label)}</span>
            </div>`}).join(""),C=e.label?`<label class="label">${N(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</label>`:"",ue=s?`<div class="helper error">${N(e.error)}</div>`:e.helper?`<div class="helper">${N(e.helper)}</div>`:"";return`
        ${C}
        <div
          class="control ${s?"invalid":""} ${d?"open":""} ${a?"disabled":""}"
          part="control"
          tabindex="${a?"-1":"0"}"
          role="${o?"presentation":"combobox"}"
        >
          <div class="display">
            ${x}${y}${k}${M}
          </div>
          <span class="caret" aria-hidden="true">\u25BE</span>
        </div>
        <div
          class="popup"
          part="popup"
          role="listbox"
          ${n?'aria-multiselectable="true"':""}
          ${d?"":"hidden"}
        >${E}</div>
        ${ue}
        ${ln}
      `},events:{"click .control":(e,t)=>{if(e.target.closest(".chip-remove")||t.host.disabled)return;let o=!!t.getState("open");t.setState("open",!0),o||t.emit("tc-open"),t.refs.search?.focus()},"keydown .control":(e,t)=>{let r=e;if(r.key==="Enter"||r.key===" "){if(r.preventDefault(),t.host.disabled)return;t.setState("open",!0),t.emit("tc-open"),t.refs.search?.focus()}},"input .search":(e,t)=>{let r=e.target.value;t.setState("query",r),t.setState("open",!0),t.setState("focusedIndex",0),t.emit("tc-search",{query:r})},"keydown .search":(e,t)=>{let r=e,n=e.target,o=t.host,a=!!o.multiple,s=o.options??[],i=Mt(s,String(t.getState("query")??""));if(r.key==="Backspace"&&n.value===""&&a){let l=be(o.value);l.length>0&&(l.pop(),o.value=ve(l),He(t,l,o),t.emit("tc-change",{value:l.slice()}),r.preventDefault());return}if(r.key==="ArrowDown"){r.preventDefault(),t.setState("open",!0);let l=Number(t.getState("focusedIndex")??-1),d=Math.min(i.length-1,l+1);t.setState("focusedIndex",d);return}if(r.key==="ArrowUp"){r.preventDefault();let l=Number(t.getState("focusedIndex")??0),d=Math.max(0,l-1);t.setState("focusedIndex",d);return}if(r.key==="Enter"){r.preventDefault();let l=Number(t.getState("focusedIndex")??-1);l>=0&&l<i.length&&Et(t,i[l],o);return}if(r.key==="Escape"){r.preventDefault(),t.setState("open",!1),t.setState("query",""),t.emit("tc-close");return}},"mousedown .option":(e,t)=>{e.preventDefault();let r=e.target.closest(".option");if(!r||r.classList.contains("disabled"))return;let n=r.dataset.value;if(n==null)return;let o=t.host,s=(o.options??[]).find(i=>i.value===n);s&&Et(t,s,o)},"click .chip-remove":(e,t)=>{e.stopPropagation();let n=e.target.dataset.remove;if(n==null)return;let o=t.host,a=be(o.value).filter(s=>s!==n);o.value=ve(a),He(t,a,o),t.emit("tc-change",{value:a.slice()})},"focusout .control":(e,t)=>{queueMicrotask(()=>{t.host.matches(":focus-within")||(t.setState("open",!1),t.setState("query",""),t.emit("tc-close"))})}},afterMount(){let e=this;if(!e.multiple||!e.internals)return;let t=be(e.value),r=String(e.name??"");if(!r){e.internals.setFormValue(ve(t));return}let n=new FormData;for(let o of t)n.append(r,o);e.internals.setFormValue(n)},afterRender(){let e=this;if(!(e.getState?!!e.getState("open"):!1))return;let r=e.refs?.search??null;if(!r||e.shadowRoot?.activeElement===r)return;r.focus();let o=r.value.length;try{r.setSelectionRange(o,o)}catch{}}}));function Mt(e,t){if(!t)return e;let r=new RegExp(sn(t),"i");return e.filter(n=>r.test(n.label)||r.test(n.value))}function Et(e,t,r){let n=!!r.multiple,o=Number(r.max??0),a=be(r.value);if(n){let s;if(a.includes(t.value))s=a.filter(i=>i!==t.value);else{if(o>0&&a.length>=o)return;s=a.concat(t.value)}r.value=ve(s),He(e,s,r),e.setState("query",""),e.emit("tc-change",{value:s.slice()}),queueMicrotask(()=>{e.refs.search?.focus()})}else r.value=t.value,He(e,[t.value],r),e.setState("query",""),e.setState("open",!1),e.emit("tc-change",{value:t.value}),e.emit("tc-close")}function He(e,t,r){let n=r.internals;if(!n)return;let o=String(r.name??"");if(!r.multiple){n.setFormValue(t[0]??"");return}if(!o){n.setFormValue(ve(t));return}let a=new FormData;for(let s of t)a.append(o,s);n.setFormValue(a)}function N(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var cn="tc-carousel";function St(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ce(e){let t=0;for(let r of Array.from(e.children))r instanceof Element&&!r.hasAttribute("slot")&&t++;return t}function Ht(e,t,r){return t<=0?0:r?(e%t+t)%t:Math.max(0,Math.min(t-1,e))}function P(e,t){let r=Ce(e);if(r===0)return;let n=e.value,o=Ht(t,r,e.loop);o!==n&&(e.value=o,e.dispatchEvent(new CustomEvent("tc-change",{detail:{index:o,previous:n},bubbles:!0,composed:!0})))}function Tt(e){Ve(e),!(e.autoplay<=0)&&(Ce(e)<=1||(e._carouselTimer=globalThis.setInterval(()=>{P(e,e.value+1)},e.autoplay)))}function Ve(e){e._carouselTimer!==void 0&&(globalThis.clearInterval(e._carouselTimer),e._carouselTimer=void 0)}b(cn,h({props:{value:{type:"number",default:0,reflect:!0},autoplay:{type:"number",default:0},loop:{type:"boolean",default:!0},orientation:{type:"string",default:"horizontal"},transition:{type:"string",default:"slide"},indicators:{type:"boolean",default:!0},controls:{type:"boolean",default:!0},swipe:{type:"boolean",default:!0},pauseOnHover:{type:"boolean",default:!0},ariaLabel:{type:"string",default:"Carousel"},height:{type:"string",default:""}},theme:{"tc-carousel-radius":"var(--tc-radius-lg, 12px)","tc-carousel-bg":"var(--tc-color-bg, #faf8f3)","tc-carousel-control-bg":"rgba(255, 255, 255, 0.85)","tc-carousel-control-bg-hover":"rgba(255, 255, 255, 1)","tc-carousel-control-fg":"var(--tc-color-ink, #14171f)","tc-carousel-control-size":"36px","tc-carousel-indicator":"rgba(20, 23, 31, 0.25)","tc-carousel-indicator-active":"var(--tc-color-accent, #a16939)","tc-carousel-duration":"320ms"},styles:{display:"block",position:"relative"},template:({props:e})=>{let t=Number(e.value??0),r=String(e.orientation)==="vertical",n=String(e.transition)==="fade",o=String(e.height??""),a=!!e.controls,s=!!e.indicators,i=St(e.ariaLabel??"Carousel");return`
        <div
          class="root ${r?"v":"h"} ${n?"fade":"slide"}"
          role="region"
          aria-roledescription="carousel"
          aria-label="${i}"
          style="${o?`--tc-carousel-height: ${St(o)};`:""}--tc-carousel-index: ${t};"
        >
          <div class="viewport" part="viewport">
            <slot class="track" part="track"></slot>
          </div>
          ${a?`
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
      `},events:{"click .prev":(e,t)=>{let r=t.host;P(r,r.value-1)},"click .next":(e,t)=>{let r=t.host;P(r,r.value+1)},"click .dot":(e,t)=>{let r=e.target.closest(".dot");if(!r)return;let n=Number(r.dataset.index);if(!Number.isFinite(n))return;let o=t.host;P(o,n)},"keydown .root":(e,t)=>{let r=e,n=t.host,o=n.orientation==="vertical",a=Ce(n),s=o?"ArrowUp":"ArrowLeft",i=o?"ArrowDown":"ArrowRight";r.key===s?(r.preventDefault(),P(n,n.value-1)):r.key===i?(r.preventDefault(),P(n,n.value+1)):r.key==="Home"?(r.preventDefault(),P(n,0)):r.key==="End"&&(r.preventDefault(),P(n,a-1))}},afterMount(){let e=this,t=()=>Lt(e),r=new MutationObserver(t);r.observe(e,{childList:!0});let n=e.shadowRoot,o=n?.querySelector("slot"),a=()=>t();o?.addEventListener("slotchange",a),e._carouselSlotObs=()=>{r.disconnect(),o?.removeEventListener("slotchange",a)};let s=()=>Ve(e),i=()=>{e.pauseOnHover&&Tt(e)};e.addEventListener("pointerenter",s),e.addEventListener("pointerleave",i),e.addEventListener("focusin",s),e.addEventListener("focusout",i),e._carouselHover=()=>{e.removeEventListener("pointerenter",s),e.removeEventListener("pointerleave",i),e.removeEventListener("focusin",s),e.removeEventListener("focusout",i)},dn(e),n?.querySelector(".root")?.setAttribute("tabindex","0"),t(),e.autoplay>0&&Tt(e)},afterRender(){Lt(this)},unmount(){let e=this;Ve(e),e._carouselSlotObs?.(),e._carouselHover?.(),e._carouselDrag?.()}}));function Lt(e){let t=Ce(e),r=e.shadowRoot;if(!r)return;let n=r.querySelector(".root");if(n&&t>0){let i=Ht(e.value,t,e.loop);i!==e.value&&(e.value=i),n.style.setProperty("--tc-carousel-index",String(i))}let o=r.querySelector(".indicators");if(o){let i=e.value,l="";for(let d=0;d<t;d++)l+=`<button type="button" class="dot" role="tab" data-index="${d}"
        aria-current="${d===i?"true":"false"}"
        aria-label="Go to slide ${d+1}"></button>`;o.innerHTML=l}if(Array.from(e.children).filter(i=>i instanceof HTMLElement&&!i.hasAttribute("slot")).forEach((i,l)=>{i.setAttribute("role","group"),i.setAttribute("aria-roledescription","slide"),i.setAttribute("aria-label",`${l+1} of ${t}`),e.transition==="fade"?i.classList.toggle("is-active",l===e.value):i.classList.remove("is-active")}),!e.loop){let i=r.querySelector(".ctrl.prev"),l=r.querySelector(".ctrl.next");i&&(i.disabled=e.value<=0),l&&(l.disabled=e.value>=t-1)}let s=r.querySelector(".sr-status");s&&t>0&&(s.textContent=`Slide ${e.value+1} of ${t}`)}function dn(e){let t=0,r=0,n=!1,o=40,a=l=>{e.swipe&&(l.button!==0&&l.pointerType==="mouse"||(t=l.clientX,r=l.clientY,n=!0))},s=l=>{if(!n)return;n=!1;let d=l.clientX-t,f=l.clientY-r,c=e.orientation==="vertical"?f:d;Math.abs(c)<o||P(e,e.value+(c<0?1:-1))},i=()=>{n=!1};e.addEventListener("pointerdown",a),e.addEventListener("pointerup",s),e.addEventListener("pointercancel",i),e._carouselDrag=()=>{e.removeEventListener("pointerdown",a),e.removeEventListener("pointerup",s),e.removeEventListener("pointercancel",i)}}var K="tc-accordion";b(K,h({props:{mode:{type:"string",default:"single"},bordered:{type:"boolean",default:!0}},theme:{"tc-accordion-bg":"var(--tc-color-surface, #ffffff)","tc-accordion-ink":"var(--tc-color-ink, #14171f)","tc-accordion-ink-soft":"var(--tc-color-ink-soft, #4a5061)","tc-accordion-rule":"var(--tc-color-rule, #ece5d3)","tc-accordion-radius":"var(--tc-radius-md, 8px)","tc-accordion-accent":"var(--tc-color-accent, #a16939)","tc-accordion-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},template:({props:e})=>`
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
        /* Only the top-level slotted node (\`details\`) is reachable from the
           shadow tree \u2014 \`::slotted()\` takes a compound selector, not a
           combinator. Everything that targets \`summary\` (a descendant of the
           slotted node) lives in the injected light-DOM sheet below; the
           --tc-accordion-* vars inherit into the light DOM from :host. */
        ::slotted(details) {
          background: transparent;
        }
      </style>
    `,afterMount(){let e=this;un();let t=a=>{let s=a.target;if(!(!s||s.tagName!=="DETAILS")){if(e.mode==="single"&&s.open)for(let i of ze(e))i!==s&&i.open&&(i.open=!1);pn(e)}},r=a=>{let s=a.target;if(!s||s.tagName!=="SUMMARY")return;let i=ze(e).map(f=>f.querySelector("summary")).filter(f=>!!f),l=i.indexOf(s);if(l===-1)return;let d=-1;a.key==="ArrowDown"?d=(l+1)%i.length:a.key==="ArrowUp"?d=(l-1+i.length)%i.length:a.key==="Home"?d=0:a.key==="End"&&(d=i.length-1),d!==-1&&(a.preventDefault(),i[d]?.focus())};e.addEventListener("toggle",t,!0),e.addEventListener("keydown",r);let n=()=>{for(let a of ze(e)){let s=a.querySelector(":scope > summary");if(s&&!s.querySelector(".tc-accordion-caret")){let i=document.createElement("span");i.className="tc-accordion-caret",i.setAttribute("aria-hidden","true"),i.style.cssText="display:inline-block;flex:0 0 auto;transition:transform .2s ease;color:var(--tc-color-ink-muted,#6b7280);font-size:0.8rem;",i.textContent="\u25B8",s.appendChild(i);let l=()=>{i.style.transform=a.open?"rotate(90deg)":"rotate(0)"};l(),a.addEventListener("toggle",l)}}};n();let o=new MutationObserver(n);o.observe(e,{childList:!0,subtree:!1}),e._accordionCleanup=()=>{e.removeEventListener("toggle",t,!0),e.removeEventListener("keydown",r),o.disconnect()}},unmount(){this._accordionCleanup?.()}}));var Ct="tc-accordion-light-styles";function un(){if(typeof document>"u"||document.getElementById(Ct))return;let e=document.createElement("style");e.id=Ct,e.textContent=`
    ${K} details { background: transparent; }
    ${K} details + details {
      border-top: 1px solid var(--tc-accordion-rule, #ece5d3);
    }
    ${K} details > summary {
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
    ${K} details > summary::-webkit-details-marker { display: none; }
    ${K} details > summary::marker { content: ""; }
    ${K} details > summary:hover { background: rgba(20, 23, 31, 0.03); }
    ${K} details > summary:focus-visible {
      outline: 2px solid var(--tc-accordion-accent, #a16939);
      outline-offset: -2px;
    }
  `,(document.head||document.documentElement).appendChild(e)}function ze(e){let t=[];for(let r of Array.from(e.children))r instanceof HTMLDetailsElement&&t.push(r);return t}function pn(e){let t=[];for(let r of ze(e))if(r.open){let n=r.id||r.querySelector("summary")?.textContent?.trim()||"";t.push(n)}e.dispatchEvent(new CustomEvent("tc-change",{detail:{open:t},bubbles:!0,composed:!0}))}var fn="tc-tooltip";function gn(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}b(fn,h({props:{text:{type:"string",default:""},placement:{type:"string",default:"top"},delay:{type:"number",default:200},offset:{type:"number",default:8},disabled:{type:"boolean",default:!1}},theme:{"tc-tooltip-bg":"var(--tc-color-ink, #14171f)","tc-tooltip-fg":"var(--tc-color-surface, #ffffff)","tc-tooltip-radius":"var(--tc-radius-sm, 6px)","tc-tooltip-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-tooltip-shadow":"0 10px 30px rgba(0, 0, 0, 0.25)","tc-tooltip-padding":"6px 10px","tc-tooltip-max-width":"240px"},styles:{display:"inline-block",position:"relative"},template:({props:e})=>`
      <span class="trigger" tabindex="-1"><slot></slot></span>
      <div
        class="tip"
        popover="manual"
        role="tooltip"
        part="tip"
      >
        ${e.text?`<span class="tip-text">${gn(e.text)}</span>`:""}
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
    `,afterMount(){let e=this,t=e.shadowRoot;if(!t)return;let r=t.querySelector(".tip");if(!r)return;let n=()=>{e.disabled||(clearTimeout(e._tooltipTimer),e._tooltipTimer=globalThis.setTimeout(()=>{if(typeof r.showPopover=="function")try{r.showPopover()}catch{r.style.visibility="visible",r.style.opacity="1"}else r.style.visibility="visible",r.style.opacity="1";zt(e,r)},Math.max(0,e.delay)))},o=()=>{clearTimeout(e._tooltipTimer);try{typeof r.hidePopover=="function"&&r.hidePopover()}catch{}r.style.opacity="",r.style.visibility=""},a=i=>{i.key==="Escape"&&o()};e.addEventListener("pointerenter",n),e.addEventListener("pointerleave",o),e.addEventListener("focusin",n),e.addEventListener("focusout",o),e.addEventListener("keydown",a);let s=()=>{r.matches(":popover-open")&&zt(e,r)};globalThis.addEventListener("scroll",s,!0),globalThis.addEventListener("resize",s),e._tooltipCleanup=()=>{clearTimeout(e._tooltipTimer),e.removeEventListener("pointerenter",n),e.removeEventListener("pointerleave",o),e.removeEventListener("focusin",n),e.removeEventListener("focusout",o),e.removeEventListener("keydown",a),globalThis.removeEventListener("scroll",s,!0),globalThis.removeEventListener("resize",s),o()}},unmount(){this._tooltipCleanup?.()}}));function zt(e,t){let r=e.getBoundingClientRect();t.style.top="0px",t.style.left="0px";let n=t.getBoundingClientRect(),o=globalThis.innerWidth,a=globalThis.innerHeight,s=e.offset,i=e.placement||"top",l=g=>g==="top"?r.top-n.height-s>=4:g==="bottom"?r.bottom+n.height+s<=a-4:g==="left"?r.left-n.width-s>=4:g==="right"?r.right+n.width+s<=o-4:!0;if(!l(i)){let g={top:"bottom",bottom:"top",left:"right",right:"left"};l(g[i]??"top")&&(i=g[i])}let d=0,f=0;i==="top"?(d=r.top-n.height-s,f=r.left+r.width/2-n.width/2):i==="bottom"?(d=r.bottom+s,f=r.left+r.width/2-n.width/2):i==="left"?(d=r.top+r.height/2-n.height/2,f=r.left-n.width-s):i==="right"&&(d=r.top+r.height/2-n.height/2,f=r.right+s),d=Math.max(4,Math.min(a-n.height-4,d)),f=Math.max(4,Math.min(o-n.width-4,f)),t.style.top=`${d}px`,t.style.left=`${f}px`,t.dataset.placement=i}var mn="tc-popover";b(mn,h({props:{open:{type:"boolean",default:!1,reflect:!0},placement:{type:"string",default:"bottom"},offset:{type:"number",default:8},dismissible:{type:"boolean",default:!0}},theme:{"tc-popover-bg":"var(--tc-color-surface, #ffffff)","tc-popover-fg":"var(--tc-color-ink, #14171f)","tc-popover-rule":"var(--tc-color-rule, #ece5d3)","tc-popover-radius":"var(--tc-radius-md, 8px)","tc-popover-shadow":"var(--tc-shadow-lg, 0 24px 60px rgba(20, 23, 31, 0.18))","tc-popover-padding":"12px 14px","tc-popover-min-width":"200px","tc-popover-max-width":"340px","tc-popover-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"inline-block",position:"relative"},template:()=>`
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
    `,events:{"click .trigger-wrap":(e,t)=>{let r=t.host;r.open=!r.open}},afterRender(){At(this)},afterMount(){let e=this,t=o=>{!e.open||!e.dismissible||o.composedPath().includes(e)||(e.open=!1,e.dispatchEvent(new CustomEvent("tc-close",{detail:{reason:"outside"},bubbles:!0,composed:!0})))},r=o=>{!e.open||!e.dismissible||o.key==="Escape"&&(e.open=!1,e.dispatchEvent(new CustomEvent("tc-close",{detail:{reason:"escape"},bubbles:!0,composed:!0})))},n=()=>{let o=e.shadowRoot?.querySelector(".panel");o?.matches(":popover-open")&&Rt(e,o)};document.addEventListener("click",t,!0),document.addEventListener("keydown",r),globalThis.addEventListener("scroll",n,!0),globalThis.addEventListener("resize",n),e._popoverCleanup=()=>{document.removeEventListener("click",t,!0),document.removeEventListener("keydown",r),globalThis.removeEventListener("scroll",n,!0),globalThis.removeEventListener("resize",n)},At(e)},unmount(){this._popoverCleanup?.()}}));function At(e){let t=e.shadowRoot;if(!t)return;let r=t.querySelector(".panel");if(!r)return;let n=e.open,o=typeof r.showPopover=="function";if(n&&!r.matches(":popover-open")){if(o)try{r.showPopover()}catch{r.style.display="block"}else r.style.display="block";Rt(e,r),e.dispatchEvent(new CustomEvent("tc-open",{bubbles:!0,composed:!0}))}else if(!n&&r.matches(":popover-open"))if(o)try{r.hidePopover()}catch{r.style.display="none"}else r.style.display="none"}function Rt(e,t){let r=e.getBoundingClientRect();t.style.top="0px",t.style.left="0px";let n=t.getBoundingClientRect(),o=globalThis.innerWidth,a=globalThis.innerHeight,s=e.offset,i=e.placement||"bottom",l=g=>g==="top"?r.top-n.height-s>=4:g==="bottom"?r.bottom+n.height+s<=a-4:g==="left"?r.left-n.width-s>=4:g==="right"?r.right+n.width+s<=o-4:!0;if(!l(i)){let g={top:"bottom",bottom:"top",left:"right",right:"left"};l(g[i]??"bottom")&&(i=g[i])}let d=0,f=0;i==="top"?(d=r.top-n.height-s,f=r.left+r.width/2-n.width/2):i==="bottom"?(d=r.bottom+s,f=r.left+r.width/2-n.width/2):i==="left"?(d=r.top+r.height/2-n.height/2,f=r.left-n.width-s):i==="right"&&(d=r.top+r.height/2-n.height/2,f=r.right+s),d=Math.max(4,Math.min(a-n.height-4,d)),f=Math.max(4,Math.min(o-n.width-4,f)),t.style.top=`${d}px`,t.style.left=`${f}px`}var hn="tc-drawer";var le=new WeakMap;function Ge(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}b(hn,h({props:{open:{type:"boolean",default:!1,reflect:!0},side:{type:"string",default:"right"},size:{type:"string",default:"min(420px, 92vw)"},dismissible:{type:"boolean",default:!0},title:{type:"string",default:""}},theme:{"tc-drawer-bg":"var(--tc-color-surface, #ffffff)","tc-drawer-ink":"var(--tc-color-ink, #14171f)","tc-drawer-rule":"var(--tc-color-rule, #ece5d3)","tc-drawer-soft":"var(--tc-color-ink-soft, #5a6072)","tc-drawer-shadow":"var(--tc-shadow-lg, 0 24px 60px rgba(20, 23, 31, 0.25))","tc-drawer-backdrop":"rgba(20, 23, 31, 0.5)","tc-drawer-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-drawer-duration":"260ms"},styles:{display:"contents"},template:({props:e})=>{let t=String(e.side??"right"),r=Ge(e.size??"min(420px, 92vw)");return`
        <dialog
          class="dlg side-${Ge(t)}"
          aria-labelledby="${e.title?"title":""}"
          style="--tc-drawer-size: ${r};"
        >
          ${e.title||e.dismissible?`<header class="head">
                ${e.title?`<h2 id="title" class="title">${Ge(e.title)}</h2>`:"<span></span>"}
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
      `},refs:{dialog:".dlg"},events:{"click .x":(e,t)=>{Nt(t.host,"button")},"click .dlg":(e,t)=>{let r=t.host;if(!r.dismissible)return;let n=t.refs.dialog;n&&e.target===n&&Nt(r,"backdrop")}},afterRender(){bn(this)},unmount(){let e=le.get(this);e&&(e.cleanup(),le.delete(this))}}));function bn(e){let t=e.shadowRoot;if(!t)return;let r=t.querySelector(".dlg");if(!r)return;let n=e.open,o=le.get(e);if(o&&o.dialog!==r&&(o.cleanup(),le.delete(e)),n&&!r.open){if(typeof r.showModal=="function")try{r.showModal()}catch{r.setAttribute("open","")}else r.setAttribute("open","");if(!le.has(e)){let a=()=>{let s=e;s.open&&(s.open=!1,e.dispatchEvent(new CustomEvent("tc-close",{detail:{reason:"escape"},bubbles:!0,composed:!0})))};r.addEventListener("close",a),le.set(e,{dialog:r,cleanup:()=>r.removeEventListener("close",a)})}}else if(!n&&r.open)try{r.close()}catch{r.removeAttribute("open")}}function Nt(e,t){e.open&&(e.open=!1,e.dispatchEvent(new CustomEvent("tc-close",{detail:{reason:t},bubbles:!0,composed:!0})))}var vn="tc-progress";function ce(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function yn(e,t){return!Number.isFinite(e)||!Number.isFinite(t)||t<=0?0:Math.max(0,Math.min(100,e/t*100))}b(vn,h({props:{value:{type:"number",default:0},max:{type:"number",default:100},variant:{type:"string",default:"linear"},size:{type:"string",default:"md"},indeterminate:{type:"boolean",default:!1},showLabel:{type:"boolean",default:!1},label:{type:"string",default:""}},theme:{"tc-progress-track":"var(--tc-color-rule, #ece5d3)","tc-progress-fill":"var(--tc-color-accent, #a16939)","tc-progress-radius":"999px","tc-progress-fg":"var(--tc-color-ink, #14171f)","tc-progress-font":"var(--tc-font-mono, 'JetBrains Mono', monospace)"},styles:{display:"inline-block"},template:({props:e})=>{let t=String(e.variant??"linear"),r=String(e.size??"md"),n=!!e.indeterminate,o=Number(e.value??0),a=Number(e.max??100),s=yn(o,a),i=e.label||(n?"Loading\u2026":`${Math.round(s)}%`);if(t==="circular"){let f=r==="sm"?28:r==="lg"?72:48,g=r==="sm"?3:r==="lg"?6:4,c=(f-g)/2,u=2*Math.PI*c,p=n?u*.25:s/100*u,m=n?`role="progressbar" aria-valuetext="${ce(i)}"`:`role="progressbar" aria-valuenow="${o}" aria-valuemin="0" aria-valuemax="${a}"`;return`
          <div class="circ size-${ce(r)} ${n?"indet":""}" ${m}>
            <svg viewBox="0 0 ${f} ${f}" width="${f}" height="${f}" aria-hidden="true">
              <circle class="track" cx="${f/2}" cy="${f/2}" r="${c}" stroke-width="${g}" fill="none" />
              <circle
                class="fill"
                cx="${f/2}" cy="${f/2}" r="${c}"
                stroke-width="${g}" fill="none"
                stroke-dasharray="${p.toFixed(3)} ${(u-p).toFixed(3)}"
                stroke-dashoffset="${(u/4).toFixed(3)}"
                stroke-linecap="round"
              />
            </svg>
            ${e.showLabel?`<span class="label" aria-hidden="true">${ce(i)}</span>`:""}
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
        `}let l=r==="sm"?4:r==="lg"?12:8,d=n?`role="progressbar" aria-valuetext="${ce(i)}"`:`role="progressbar" aria-valuenow="${o}" aria-valuemin="0" aria-valuemax="${a}"`;return`
        <div class="bar size-${ce(r)} ${n?"indet":""}" ${d}>
          <div class="track">
            <div class="fill" style="width: ${s.toFixed(2)}%"></div>
          </div>
          ${e.showLabel?`<span class="label" aria-hidden="true">${ce(i)}</span>`:""}
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
      `}}));var xn="tc-stepper";function It(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}b(xn,h({props:{steps:{type:"json",default:[]},active:{type:"number",default:0,reflect:!0},orientation:{type:"string",default:"horizontal"},clickable:{type:"boolean",default:!1}},theme:{"tc-stepper-bg":"transparent","tc-stepper-ink":"var(--tc-color-ink, #14171f)","tc-stepper-soft":"var(--tc-color-ink-soft, #4a5061)","tc-stepper-rule":"var(--tc-color-rule, #ece5d3)","tc-stepper-accent":"var(--tc-color-accent, #a16939)","tc-stepper-done":"var(--tc-color-success, #2f7a52)","tc-stepper-radius":"999px","tc-stepper-marker-size":"28px","tc-stepper-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},template:({props:e})=>{let t=e.steps??[],r=Number(e.active??0),n=String(e.orientation)==="vertical",o=!!e.clickable,a=t.map((s,i)=>{let l=i<r?"done":i===r?"current":"upcoming",d=l==="done"?'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>':`${i+1}`;return`
          <li class="step state-${l}" data-index="${i}">
            <${o?"button":"div"} class="row" ${o?`type="button" aria-current="${l==="current"?"step":"false"}"`:`aria-current="${l==="current"?"step":"false"}"`}>
              <span class="marker" aria-hidden="true">${d}</span>
              <span class="text">
                <span class="title">${It(s.title)}</span>
                ${s.description?`<span class="desc">${It(s.description)}</span>`:""}
              </span>
            </${o?"button":"div"}>
            ${i<t.length-1?`<span class="line ${i<r?"done":""}" aria-hidden="true"></span>`:""}
          </li>
        `}).join("");return`
        <ol class="root ${n?"v":"h"} ${o?"clickable":""}" aria-label="Progress">
          ${a}
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
            cursor: ${o?"pointer":"default"};
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
      `},events:{"click .row":(e,t)=>{let r=t.host;if(!r.clickable)return;let n=e.target.closest(".step");if(!n)return;let o=Number(n.dataset.index);if(!Number.isFinite(o)||o===r.active)return;let a=r.active;r.active=o,t.emit("tc-step-change",{active:o,previous:a})}}}));var kn="tc-avatar";function V(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Dt(e){let t=e.trim().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].slice(0,2).toUpperCase():(t[0][0]+t[t.length-1][0]).toUpperCase()}var Ke=[["#dde6f4","#1f3a66"],["#dbece2","#155b40"],["#efe2cf","#8a572d"],["#f4dad7","#7a1a14"],["#e3dcf1","#3d2a73"],["#d5e8e5","#0d4f49"],["#fbe3c5","#7a4f0a"]];function wn(e){if(!e)return Ke[0];let t=0;for(let n=0;n<e.length;n++)t=t*31+e.charCodeAt(n)|0;let r=Math.abs(t)%Ke.length;return Ke[r]}b(kn,h({props:{src:{type:"string",default:""},alt:{type:"string",default:""},name:{type:"string",default:""},size:{type:"string",default:"md"},shape:{type:"string",default:"circle"},status:{type:"string",default:""},ring:{type:"boolean",default:!1}},theme:{"tc-avatar-bg":"var(--tc-color-rule, #ece5d3)","tc-avatar-fg":"var(--tc-color-ink, #14171f)","tc-avatar-ring":"var(--tc-color-surface, #ffffff)","tc-avatar-status-online":"#2f7a52","tc-avatar-status-away":"#d7a52f","tc-avatar-status-busy":"#b3261e","tc-avatar-status-offline":"#9aa0a6","tc-avatar-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"inline-block",position:"relative","vertical-align":"middle"},template:({props:e})=>{let t=String(e.name??""),r=String(e.src??""),n=String(e.alt??"")||t||"avatar",o=String(e.size??"md"),a=String(e.shape??"circle"),s=String(e.status??""),i=!!e.ring,[l,d]=wn(t);return`
        <span class="root size-${V(o)} shape-${V(a)} ${i?"ringed":""}"
              style="--tc-avatar-tint-bg: ${l}; --tc-avatar-tint-fg: ${d};">
          ${r?`<img src="${V(r)}" alt="${V(n)}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'fallback',textContent:'${V(Dt(t))}'}))">`:`<span class="fallback" aria-label="${V(n)}">${V(Dt(t))}</span>`}
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
      `}}));var $n="tc-avatar-group";b($n,h({props:{max:{type:"number",default:4},spacing:{type:"string",default:"normal"},size:{type:"string",default:"md"}},theme:{"tc-avatar-group-ring":"var(--tc-color-surface, #ffffff)","tc-avatar-group-overflow-bg":"var(--tc-color-rule, #ece5d3)","tc-avatar-group-overflow-fg":"var(--tc-color-ink, #14171f)"},styles:{display:"inline-flex"},template:()=>`
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
    `,afterMount(){let e=this,t=()=>jt(e);t();let r=new MutationObserver(t);r.observe(e,{childList:!0}),e._agroupCleanup=()=>r.disconnect()},afterRender(){jt(this)},unmount(){this._agroupCleanup?.()}}));function jt(e){let t=Math.max(0,Number(e.max??4)),r=String(e.size??"md"),n=Array.from(e.children).filter(l=>l instanceof HTMLElement),o=0;for(let l of n)l.tagName.toLowerCase()==="tc-avatar"&&(l.getAttribute("size")||l.setAttribute("size",r),o<t||t===0?(l.hidden=!1,o++):l.hidden=!0);let a=n.filter(l=>l.tagName.toLowerCase()==="tc-avatar").length,s=Math.max(0,a-o),i=e.shadowRoot?.querySelector(".overflow");i&&(s>0?(i.hidden=!1,i.textContent=`+${s}`):i.hidden=!0)}var Mn="tc-rating";function qt(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Bt="M12 17.27 18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z";b(Mn,h({props:{value:{type:"number",default:0,reflect:!0},max:{type:"number",default:5},readonly:{type:"boolean",default:!1,reflect:!0},allowHalf:{type:"boolean",default:!1},size:{type:"string",default:"md"},ariaLabel:{type:"string",default:"Rating"}},theme:{"tc-rating-fill":"var(--tc-color-warning, #d7a52f)","tc-rating-track":"var(--tc-color-rule, #ece5d3)"},styles:{display:"inline-block"},template:({props:e,state:t})=>{let r=Math.max(1,Number(e.max??5)),n=Number(e.value??0),o=Number(t.hover??-1),a=o>=0?o:n,s=String(e.size??"md"),i=!!e.readonly,l=!!e.allowHalf,d=qt(e.ariaLabel??"Rating"),f=s==="sm"?18:s==="lg"?32:24,g=[];for(let c=1;c<=r;c++){let u=a-(c-1),p=u>=1?100:u>=.5&&l?50:u>0&&!l?100:0,m=p===50;g.push(`
          <span class="star ${m?"half":p===100?"full":"empty"}" data-index="${c}">
            <svg viewBox="0 0 24 24" width="${f}" height="${f}" aria-hidden="true">
              <path class="track" d="${Bt}" fill="var(--tc-rating-track)" />
              ${p>0?`<path class="fill" d="${Bt}" fill="var(--tc-rating-fill)" clip-path="${m?"inset(0 50% 0 0)":"none"}" />`:""}
            </svg>
            ${l&&!i?`<span class="hit-left" data-index="${c}" data-half="1"></span>
                 <span class="hit-right" data-index="${c}" data-half="0"></span>`:""}
          </span>
        `)}return`
        <div
          class="root size-${qt(s)} ${i?"readonly":""}"
          role="${i?"img":"slider"}"
          tabindex="${i?"-1":"0"}"
          aria-label="${d}"
          aria-valuenow="${n}"
          aria-valuemin="0"
          aria-valuemax="${r}"
          aria-valuetext="${n} of ${r}"
        >
          ${g.join("")}
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
      `},events:{"click .star":(e,t)=>{let r=t.host;if(r.readonly)return;let n=e.target,o=n.closest(".hit-left, .hit-right"),a=n.closest(".star");if(!a)return;let s=Number(a.dataset.index);if(!Number.isFinite(s))return;let i=s;o?.dataset.half==="1"&&r.allowHalf&&(i=s-.5),i===r.value&&(i=0);let l=r.value;r.value=i,t.emit("tc-change",{value:i,previous:l})},"mouseover .star":(e,t)=>{let r=t.host;if(r.readonly)return;let n=e.target,o=n.closest(".hit-left, .hit-right"),a=n.closest(".star");if(!a)return;let s=Number(a.dataset.index);if(!Number.isFinite(s))return;let i=s;o?.dataset.half==="1"&&r.allowHalf&&(i=s-.5),t.setState("hover",i)},"mouseleave .root":(e,t)=>{t.setState("hover",-1)},"keydown .root":(e,t)=>{let r=e,n=t.host;if(n.readonly)return;let o=n.allowHalf?.5:1,a=n.value,s=a;if(r.key==="ArrowRight"||r.key==="ArrowUp")s=Math.min(n.max,a+o);else if(r.key==="ArrowLeft"||r.key==="ArrowDown")s=Math.max(0,a-o);else if(r.key==="Home")s=0;else if(r.key==="End")s=n.max;else return;r.preventDefault(),s!==a&&(n.value=s,t.emit("tc-change",{value:s,previous:a}))}}}));var En="tc-slider";function Ae(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}b(En,h({props:{value:{type:"number",default:0,reflect:!0},min:{type:"number",default:0},max:{type:"number",default:100},step:{type:"number",default:1},disabled:{type:"boolean",default:!1,reflect:!0},showValue:{type:"boolean",default:!1},showTicks:{type:"boolean",default:!1},label:{type:"string",default:""},suffix:{type:"string",default:""}},theme:{"tc-slider-track":"var(--tc-color-rule, #ece5d3)","tc-slider-fill":"var(--tc-color-accent, #a16939)","tc-slider-thumb":"var(--tc-color-surface, #ffffff)","tc-slider-thumb-ring":"var(--tc-color-accent, #a16939)","tc-slider-radius":"999px","tc-slider-thumb-size":"20px","tc-slider-track-size":"6px","tc-slider-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-slider-fg":"var(--tc-color-ink, #14171f)","tc-slider-fg-muted":"var(--tc-color-ink-muted, #6b7280)"},styles:{display:"block"},template:({props:e})=>{let t=Number(e.value??0),r=Number(e.min??0),n=Number(e.max??100),o=Number(e.step??1),a=!!e.disabled,s=n>r?(t-r)/(n-r)*100:0,i=String(e.label??""),l=String(e.suffix??""),d=!!e.showValue,f=!!e.showTicks,g="";if(f&&o>0){let c=Math.floor((n-r)/o)+1;if(c<=50){let u=[];for(let p=0;p<c;p++){let v=(r+p*o-r)/(n-r)*100;u.push(`<span class="tick" style="left:${v.toFixed(2)}%"></span>`)}g=u.join("")}}return`
        ${i||d?`<div class="head">
              ${i?`<label for="r" class="lbl">${Ae(i)}</label>`:"<span></span>"}
              ${d?`<span class="val">${Ae(String(t))}${Ae(l)}</span>`:""}
            </div>`:""}
        <div class="rail" style="--tc-slider-pct: ${s.toFixed(2)}%;">
          <div class="track-bg"></div>
          <div class="track-fill"></div>
          ${g}
          <input
            id="r"
            class="range"
            type="range"
            min="${r}"
            max="${n}"
            step="${o}"
            value="${t}"
            ${a?"disabled":""}
            aria-valuetext="${Ae(String(t)+l)}"
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
      `},refs:{range:".range"},events:{"input .range":(e,t)=>{let r=e.target,n=t.host,o=Number(r.value);n.value!==o&&(n.value=o,t.emit("tc-input",{value:o}))},"change .range":(e,t)=>{let r=e.target,n=t.host,o=Number(r.value);t.emit("tc-change",{value:o,previous:n.value})}}}));var Sn="tc-chart";function _t(e,t){if(e<=0)return 1;let r=Math.floor(Math.log10(e)),n=e/Math.pow(10,r),o;return t?n<1.5?o=1:n<3?o=2:n<7?o=5:o=10:n<=1?o=1:n<=2?o=2:n<=5?o=5:o=10,o*Math.pow(10,r)}function Tn(e,t,r=5){if(e===t){let l=Math.abs(e)||1;return{min:e-l,max:t+l,ticks:[e-l,e,e+l]}}let n=_t(t-e,!1),o=_t(n/(r-1),!0),a=Math.floor(e/o)*o,s=Math.ceil(t/o)*o,i=[];for(let l=a;l<=s+o*.5;l+=o)i.push(Number(l.toFixed(10)));return{min:a,max:s,ticks:i}}function Ue(e,t){if(e.length===0)return"";if(e.length===1||!t)return"M "+e.map(n=>`${n.x} ${n.y}`).join(" L ");let r=`M ${e[0].x} ${e[0].y}`;for(let n=0;n<e.length-1;n++){let o=e[n-1]??e[n],a=e[n],s=e[n+1],i=e[n+2]??s,l=a.x+(s.x-o.x)/6,d=a.y+(s.y-o.y)/6,f=s.x-(i.x-a.x)/6,g=s.y-(i.y-a.y)/6;r+=` C ${l},${d} ${f},${g} ${s.x},${s.y}`}return r}function ye(e,t,r,n){return{x:e+r*Math.sin(n),y:t-r*Math.cos(n)}}function Ln(e,t,r,n,o,a){let s=a-o>Math.PI?1:0,i=ye(e,t,r,o),l=ye(e,t,r,a);if(n<=0)return`M ${e} ${t} L ${i.x} ${i.y} A ${r} ${r} 0 ${s} 1 ${l.x} ${l.y} Z`;let d=ye(e,t,n,a),f=ye(e,t,n,o);return`M ${i.x} ${i.y} A ${r} ${r} 0 ${s} 1 ${l.x} ${l.y} L ${d.x} ${d.y} A ${n} ${n} 0 ${s} 0 ${f.x} ${f.y} Z`}function S(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Q(e){if(!Number.isFinite(e))return"";let t=Math.abs(e);return t>=1e6?(e/1e6).toFixed(1).replace(/\.0$/,"")+"M":t>=1e3?(e/1e3).toFixed(1).replace(/\.0$/,"")+"K":t>0&&t<1?e.toFixed(2):String(Math.round(e*100)/100)}function xe(e,t){return t[e%t.length]}function Hn(e,t){let{data:r,smooth:n,stacked:o,showAxes:a,showGrid:s,showLabels:i,showValues:l}=e,d=r.labels??[],f=r.series??[],g=t==="sparkline",c=g?4:16,u=g?4:a&&i?28:8,p=g?4:a?44:8,m=g?4:12,v=e.W-p-m,x=e.H-c-u,y=1/0,k=-1/0;if(o&&f.length>0){let L=d.length>0?d.map((w,z)=>f.reduce((A,q)=>A+(q.values?.[z]??0),0)):[];for(let w of L)w<y&&(y=w),w>k&&(k=w);y>0&&(y=0)}else for(let L of f)for(let w of L.values??[])w<y&&(y=w),w>k&&(k=w);(!Number.isFinite(y)||!Number.isFinite(k))&&(y=0,k=1),y===k&&(y-=1,k+=1);let M=Tn(e.yMin??y,e.yMax??k,5),E=e.yMin??M.min,C=e.yMax??M.max,ue=C-E||1,$=d.length||f[0]?.values?.length||0,O=L=>$===1?p+v/2:t==="bar"?p+(L+.5)*(v/$):p+L/($-1)*v,I=L=>c+x-(L-E)/ue*x,ee=[];if(!g){if(s)for(let L of M.ticks){let w=I(L);ee.push(`<line class="grid" x1="${p}" x2="${e.W-m}" y1="${w}" y2="${w}"/>`)}if(a){for(let w of M.ticks){let z=I(w);ee.push(`<text class="axis-label y" x="${p-8}" y="${z}" text-anchor="end" dominant-baseline="middle">${S(Q(w))}</text>`)}if(i&&d.length>0){let w=Math.max(1,Math.ceil(d.length/8));d.forEach((z,A)=>{A%w!==0&&A!==d.length-1||ee.push(`<text class="axis-label x" x="${O(A)}" y="${e.H-u+16}" text-anchor="middle">${S(z)}</text>`)})}let L=E<=0&&C>=0?I(0):I(E);ee.push(`<line class="axis" x1="${p}" x2="${e.W-m}" y1="${L}" y2="${L}"/>`)}}let _=[];if(t==="bar"){let L=v/$,w=L*.18,z=L-w*2;f.forEach((A,q)=>{let X=`series series-${q}`,D=xe(q,e.palette),j=0;A.values?.forEach((H,B)=>{if(!Number.isFinite(H))return;let F=O(B),Z,we,$e,qe;if(o){Z=F-z/2,we=z;let pe=I(j+H),fe=I(j);$e=Math.min(pe,fe),qe=Math.abs(pe-fe),j+=H}else{let pe=z/f.length;Z=F-z/2+q*pe,we=pe*.86;let fe=I(H),et=I(E<0&&C>0?0:E);$e=Math.min(fe,et),qe=Math.abs(fe-et)}let Qe=`${S(A.name)}${d[B]?` \xB7 ${S(d[B])}`:""}: ${S(Q(H))}`,tr=(B*.04).toFixed(3);_.push(`<g class="${X}"><rect class="hit" x="${Z}" y="${$e}" width="${we}" height="${qe}" rx="2" fill="${D}" data-tip="${Qe}" data-color="${D}" style="animation-delay: ${tr}s"><title>${Qe}</title></rect>`+(l?`<text class="value-label" x="${Z+we/2}" y="${$e-4}" text-anchor="middle">${S(Q(H))}</text>`:"")+"</g>")})})}else if(o&&t==="area"){let L=new Array($).fill(0);f.forEach((w,z)=>{let A=xe(z,e.palette),q=[],X=[];for(let H=0;H<$;H++){let B=w.values?.[H]??0,F=L[H]+B;q.push({x:O(H),y:I(F)}),X.push({x:O(H),y:I(L[H])}),L[H]=F}let D=Ue(q,n)+" L "+X.slice().reverse().map(H=>`${H.x} ${H.y}`).join(" L ")+" Z",j=(z*.15).toFixed(3);_.push(`<path class="series-fill series-${z}" d="${D}" fill="${A}" fill-opacity="0.25" pointer-events="none" style="animation-delay: ${j}s"/>`),_.push(`<path class="series-line series-${z}" d="${Ue(q,n)}" stroke="${A}" fill="none" pointer-events="none" style="animation-delay: ${j}s"/>`),q.forEach((H,B)=>{let F=w.values?.[B]??0,Z=`${S(w.name)}${d[B]?` \xB7 ${S(d[B])}`:""}: ${S(Q(F))}`;_.push(`<circle class="hit series-${z}" cx="${H.x}" cy="${H.y}" r="12" fill="transparent" data-tip="${Z}" data-color="${A}"><title>${Z}</title></circle>`)})})}else f.forEach((L,w)=>{let z=xe(w,e.palette),A=(L.values??[]).map((D,j)=>({x:O(j),y:I(D)})),q=Ue(A,n),X=(w*.15).toFixed(3);if(t==="area"){let D=I(E<0&&C>0?0:E),j=q+` L ${A[A.length-1].x} ${D} L ${A[0].x} ${D} Z`;_.push(`<path class="series-fill series-${w}" d="${j}" fill="${z}" fill-opacity="0.25" style="animation-delay: ${X}s"/>`)}_.push(`<path class="series-line series-${w}" d="${q}" stroke="${z}" fill="none" style="animation-delay: ${X}s"/>`),g||A.forEach((D,j)=>{let H=L.values?.[j],B=`${S(L.name)}${d[j]?` \xB7 ${S(d[j])}`:""}: ${S(Q(H??0))}`,F=(w*.15+j*.025+.55).toFixed(3);_.push(`<circle class="series-point series-${w}" cx="${D.x}" cy="${D.y}" r="3.5" fill="${z}" pointer-events="none" style="animation-delay: ${F}s"/>`),_.push(`<circle class="hit series-${w}" cx="${D.x}" cy="${D.y}" r="12" fill="transparent" data-tip="${B}" data-color="${z}"><title>${B}</title></circle>`),l&&_.push(`<text class="value-label" x="${D.x}" y="${D.y-8}" text-anchor="middle" pointer-events="none">${S(Q(H??0))}</text>`)})});return ee.join("")+_.join("")}function Cn(e){let t=e.data.series??[],r=t.reduce((d,f)=>d+(f.value??0),0);if(r<=0)return"";let n=e.W/2,o=e.H/2,a=Math.min(e.W,e.H)/2-4,s=Math.max(0,Math.min(.9,e.innerRadius))*a,i=0,l=[];return t.forEach((d,f)=>{let g=d.value??0;if(g<=0)return;let c=g/r*Math.PI*2,u=i,p=i+c,m=Ln(n,o,a,s,u,p-.01),v=xe(f,e.palette),x=(g/r*100).toFixed(1).replace(/\.0$/,""),y=`${S(d.name)}: ${S(Q(g))} (${x}%)`,k=(f*.08).toFixed(3);if(l.push(`<path class="series-segment hit series-${f}" d="${m}" fill="${v}" data-tip="${y}" data-color="${v}" style="animation-delay: ${k}s"><title>${y}</title></path>`),e.showValues){let M=(u+p)/2,E=(a+s)/2,C=ye(n,o,E,M);l.push(`<text class="value-label donut" x="${C.x}" y="${C.y}" text-anchor="middle" dominant-baseline="middle">${S(x)}%</text>`)}i=p}),l.join("")}function zn(e,t,r){return e.length===0?"":'<div class="legend" part="legend">'+e.map((n,o)=>{let a=xe(o,t),s=r.includes(n.name);return`<button class="${s?"legend-item is-hidden":"legend-item"}" type="button" data-series="${S(n.name)}" aria-pressed="${s?"true":"false"}" title="${s?"Show":"Hide"} series '${S(n.name)}'"><span class="swatch" style="background:${a}"></span>${S(n.name)}</button>`}).join("")+"</div>"}function An(e,t){if(e==="donut"){let o=(t.series??[]).reduce((s,i)=>s+(i.value??0),0);return`Donut chart: ${(t.series??[]).filter(s=>(s.value??0)>0).map(s=>{let i=o>0?(s.value??0)/o*100:0;return`${s.name} ${i.toFixed(1).replace(/\.0$/,"")}%`}).join(", ")}.`}let r=(t.series??[]).map(o=>o.name).join(", "),n=t.labels?.length??t.series[0]?.values?.length??0;return`${e.charAt(0).toUpperCase()}${e.slice(1)} chart with ${(t.series??[]).length} series (${r}) and ${n} data point${n===1?"":"s"}.`}var Rn=["var(--tc-chart-color-1, var(--tc-color-accent, #a16939))","var(--tc-chart-color-2, var(--tc-color-info, #3a5b8c))","var(--tc-chart-color-3, var(--tc-color-success, #2f7a52))","var(--tc-chart-color-4, var(--tc-color-warning, #d7a52f))","var(--tc-chart-color-5, var(--tc-color-danger, #b3261e))","var(--tc-chart-color-6, #6f4e7c)","var(--tc-chart-color-7, #0b6e6e)","var(--tc-chart-color-8, #b0566c)"],Nn=`
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
`;b(Sn,h({props:{type:{type:"string",default:"line"},data:{type:"json",default:{series:[]}},height:{type:"string",default:"240px"},smooth:{type:"boolean",default:!0},stacked:{type:"boolean",default:!1},showLegend:{type:"boolean",default:!0},showAxes:{type:"boolean",default:!0},showGrid:{type:"boolean",default:!0},showLabels:{type:"boolean",default:!0},showValues:{type:"boolean",default:!1},innerRadius:{type:"number",default:.6},yMin:{type:"json",default:null},yMax:{type:"json",default:null},ariaLabel:{type:"string",default:"Chart"},colors:{type:"json",default:null},src:{type:"string",default:""},srcKey:{type:"string",default:""},loadingText:{type:"string",default:"Loading chart\u2026"},errorText:{type:"string",default:"Couldn't load chart data"}},theme:{"tc-chart-bg":"transparent","tc-chart-fg":"var(--tc-color-ink, #14171f)","tc-chart-axis":"var(--tc-color-rule-strong, #d9cfb8)","tc-chart-grid":"var(--tc-color-rule, #ece5d3)","tc-chart-label":"var(--tc-color-ink-muted, #6b7280)","tc-chart-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},template:({props:e,state:t})=>{let r=String(e.type??"line").toLowerCase(),n=["line","area","bar","sparkline","donut"].includes(r)?r:"line",o=e.data,a=t.fetched,s=!!o&&Array.isArray(o.series)&&o.series.length>0,i=s?o:a??{series:[]},l=Array.isArray(t.hiddenSeries)?t.hiddenSeries:[],d={labels:i.labels,series:(i.series??[]).filter($=>!l.includes($.name))},f=String(e.src??""),g=!!t.loading&&!s&&!a,c=f&&t.error?String(t.error):"",u=g?`<div class="overlay loading">${S(String(e.loadingText??"Loading chart\u2026"))}</div>`:c?`<div class="overlay error" role="alert">${S(String(e.errorText??"Couldn't load chart data"))}<small>${S(c)}</small></div>`:"",p=n==="sparkline",m=n==="donut",v=e.colors,x=Array.isArray(v)&&v.length>0?v:Rn,y=m?320:800,k=m?320:400,M={data:d,smooth:!!e.smooth,stacked:!!e.stacked,showAxes:!!e.showAxes,showGrid:!!e.showGrid,showLabels:!!e.showLabels,showValues:!!e.showValues,innerRadius:Number(e.innerRadius??.6),yMin:e.yMin==null?null:Number(e.yMin),yMax:e.yMax==null?null:Number(e.yMax),palette:x,W:y,H:k},E=m?Cn(M):Hn(M,n),C=An(n,d),ue=S(String(e.height??"240px"));return`
        <div class="root" role="img" aria-label="${S(e.ariaLabel??"Chart")}">
          <div class="canvas" style="height:${ue};">
            <svg
              viewBox="0 0 ${y} ${k}"
              preserveAspectRatio="${m?"xMidYMid meet":"none"}"
              aria-hidden="true"
            >${E}</svg>
            <div class="tip" role="tooltip">
              <span class="tip-swatch"></span><span class="tip-text"></span>
            </div>
            ${u}
          </div>
          ${e.showLegend&&!p&&i.series&&i.series.length>0?zn(i.series,x,l):""}
          <span class="visually-hidden" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;">${S(C)}</span>
        </div>
        ${Nn}
      `},events:{"click .legend-item":(e,t)=>{let r=e.target?.closest(".legend-item");if(!r)return;let n=r.dataset.series;if(!n)return;let o=t.getState("hiddenSeries")??[],a=o.includes(n)?o.filter(s=>s!==n):[...o,n];t.setState("hiddenSeries",a)},"keydown .legend-item":(e,t)=>{let r=e;if(r.key!=="Enter"&&r.key!==" ")return;r.preventDefault();let o=r.target.closest(".legend-item")?.dataset.series;if(!o)return;let a=t.getState("hiddenSeries")??[],s=a.includes(o)?a.filter(i=>i!==o):[...a,o];t.setState("hiddenSeries",s)}},afterMount(){Ot(this),Ft(this)},afterRender(){Ot(this),Ft(this)},unmount(){let e=this;e._chartHoverCleanup?.(),e._chartFetchAborter?.abort()}}));function Ot(e){let t=e;t._chartHoverCleanup?.();let r=t.shadowRoot;if(!r)return;let n=r.querySelector(".canvas"),o=r.querySelector(".tip"),a=o?.querySelector(".tip-text"),s=o?.querySelector(".tip-swatch");if(!n||!o||!a||!s)return;let i=()=>{o.removeAttribute("data-open"),o.style.transform="translate(-9999px, -9999px)"},l=f=>{let g=f.target?.closest?.("[data-tip]");if(!g){i();return}let c=g.getAttribute("data-tip")||"",u=g.getAttribute("data-color")||"currentColor";a.textContent=c,s.style.background=u;let p=n.getBoundingClientRect(),m=o.offsetWidth||100,v=o.offsetHeight||24,x=f.clientX-p.left,y=f.clientY-p.top,k=x+12,M=y-v-8;k+m>p.width-4&&(k=x-m-12),M<4&&(M=y+16),o.style.transform=`translate(${k}px, ${M}px)`,o.setAttribute("data-open","1")},d=()=>i();n.addEventListener("pointermove",l),n.addEventListener("pointerleave",d),t._chartHoverCleanup=()=>{n.removeEventListener("pointermove",l),n.removeEventListener("pointerleave",d),i()}}function Ft(e){let t=e,r=String(t.src??"").trim();if(!r||!t.getState||!t.setState||t.getState("fetchedFrom")===r)return;t._chartFetchAborter?.abort();let o=new AbortController;t._chartFetchAborter=o,t.setState("fetchedFrom",r),t.setState("fetched",null),t.setState("error",null),t.setState("loading",!0);let a=String(t.srcKey??"").trim();fetch(r,{signal:o.signal}).then(s=>{if(!s.ok)throw new Error(`${s.status} ${s.statusText}`);return s.json()}).then(s=>{let i=a?In(s,a):s;if(!i||typeof i!="object"||!Array.isArray(i.series))throw new Error(a?`Payload at "${a}" doesn't look like ChartData`:"Payload doesn't look like ChartData");o.signal.aborted||(t.setState("fetched",i),t.setState("loading",!1))}).catch(s=>{o.signal.aborted||(t.setState("loading",!1),t.setState("error",s instanceof Error?s.message:String(s)))})}function In(e,t){return t.split(".").reduce((r,n)=>r&&typeof r=="object"?r[n]:void 0,e)}var Dn="tc-editor";function G(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var R={bold:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h7a4 4 0 0 1 0 8H6z"/><path d="M6 12h8a4 4 0 0 1 0 8H6z"/></svg>',italic:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg>',underline:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3v8a6 6 0 0 0 12 0V3"/><line x1="4" y1="21" x2="20" y2="21"/></svg>',strike:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4H9a3 3 0 0 0-2.83 4"/><path d="M14 12a4 4 0 0 1 0 8H6"/><line x1="4" y1="12" x2="20" y2="12"/></svg>',h1:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6v12"/><path d="M12 6v12"/><path d="M4 12h8"/><path d="M17 18v-7l-2 2"/></svg>',h2:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6v12"/><path d="M12 6v12"/><path d="M4 12h8"/><path d="M16 18h5"/><path d="M16 15c0-2 2.5-2 2.5-2s2.5 0 2.5 2-3 4-5 5"/></svg>',h3:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6v12"/><path d="M12 6v12"/><path d="M4 12h8"/><path d="M16 11h5l-3 3a2.5 2.5 0 1 1-2 4"/></svg>',paragraph:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 4v16"/><path d="M19 4v16"/><path d="M19 4h-6a5 5 0 0 0 0 10h0"/></svg>',bullet:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1.2" fill="currentColor"/><circle cx="4" cy="12" r="1.2" fill="currentColor"/><circle cx="4" cy="18" r="1.2" fill="currentColor"/></svg>',ordered:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><path d="M4 8V4l-1 1"/><path d="M3 14h2l-2 3h2"/><path d="M3 20l1-1h1l1 1"/></svg>',quote:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21c0-7 7-12 14-12"/><path d="M7 7h3v6H4v-3a3 3 0 0 1 3-3z"/><path d="M16 7h3v6h-6v-3a3 3 0 0 1 3-3z"/></svg>',code:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',link:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',unlink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18.84 12.25l1.72-1.71a5 5 0 0 0-7.07-7.07L11.5 5"/><path d="M5.16 11.75l-1.72 1.71a5 5 0 0 0 7.07 7.07L12.5 19"/><line x1="2" y1="2" x2="22" y2="22"/></svg>',undo:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 7 3 13 9 13"/><path d="M21 17a8 8 0 0 0-15-3"/></svg>',redo:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="21 7 21 13 15 13"/><path d="M3 17a8 8 0 0 1 15-3"/></svg>',math:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h6l4 14h6"/><path d="M4 19l4-7-3-4"/></svg>',codeblock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><polyline points="9 9 7 12 9 15"/><polyline points="15 9 17 12 15 15"/></svg>'},Pt="bold,italic,underline,strike,|,h1,h2,h3,paragraph,|,bullet,ordered,quote,code,codeblock,|,link,unlink,math,|,undo,redo",jn={bold:{key:"bold",label:"Bold",icon:R.bold,command:"bold",shortcut:"\u2318B"},italic:{key:"italic",label:"Italic",icon:R.italic,command:"italic",shortcut:"\u2318I"},underline:{key:"underline",label:"Underline",icon:R.underline,command:"underline",shortcut:"\u2318U"},strike:{key:"strike",label:"Strikethrough",icon:R.strike,command:"strikeThrough"},h1:{key:"h1",label:"Heading 1",icon:R.h1,command:"formatBlock",value:"h1"},h2:{key:"h2",label:"Heading 2",icon:R.h2,command:"formatBlock",value:"h2"},h3:{key:"h3",label:"Heading 3",icon:R.h3,command:"formatBlock",value:"h3"},paragraph:{key:"paragraph",label:"Paragraph",icon:R.paragraph,command:"formatBlock",value:"p"},bullet:{key:"bullet",label:"Bulleted list",icon:R.bullet,command:"insertUnorderedList"},ordered:{key:"ordered",label:"Ordered list",icon:R.ordered,command:"insertOrderedList"},quote:{key:"quote",label:"Blockquote",icon:R.quote,command:"formatBlock",value:"blockquote"},code:{key:"code",label:"Inline code",icon:R.code,command:"code"},link:{key:"link",label:"Insert link",icon:R.link,command:"link",shortcut:"\u2318K"},unlink:{key:"unlink",label:"Remove link",icon:R.unlink,command:"unlink"},undo:{key:"undo",label:"Undo",icon:R.undo,command:"undo",shortcut:"\u2318Z"},redo:{key:"redo",label:"Redo",icon:R.redo,command:"redo",shortcut:"\u2318\u21E7Z"},math:{key:"math",label:"Insert math (LaTeX)",icon:R.math,command:"math"},codeblock:{key:"codeblock",label:"Code block",icon:R.codeblock,command:"codeblock"}},qn=`
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
`;b(Dn,h({props:{value:{type:"string",default:""},placeholder:{type:"string",default:"Start writing\u2026"},toolbar:{type:"string",default:Pt},readonly:{type:"boolean",default:!1,reflect:!0},minHeight:{type:"string",default:"180px"},maxHeight:{type:"string",default:""},pasteAs:{type:"string",default:"text"}},theme:{"tc-editor-bg":"var(--tc-color-surface, #ffffff)","tc-editor-fg":"var(--tc-color-ink, #14171f)","tc-editor-rule":"var(--tc-color-rule, #ece5d3)","tc-editor-toolbar-bg":"var(--tc-color-bg, #faf8f3)","tc-editor-toolbar-rule":"var(--tc-color-rule, #ece5d3)","tc-editor-toolbar-fg":"var(--tc-color-ink-soft, #4a5061)","tc-editor-toolbar-active-bg":"var(--tc-color-accent-soft, #efe2cf)","tc-editor-toolbar-hover-bg":"rgba(20, 23, 31, 0.06)","tc-editor-placeholder":"var(--tc-color-ink-muted, #6b7280)","tc-editor-radius":"var(--tc-radius-md, 8px)","tc-editor-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-editor-mono-font":"var(--tc-font-mono, 'JetBrains Mono', ui-monospace, 'SF Mono', monospace)","tc-editor-line-height":"1.6"},styles:{display:"block"},template:({props:e})=>{let t=String(e.toolbar??Pt),r=!!e.readonly,n=G(String(e.minHeight??"180px")),o=String(e.maxHeight??"").trim(),a=t.split(",").map(d=>d.trim()).filter(Boolean),s=a.map(d=>{if(d==="|")return'<span class="tb-sep" aria-hidden="true"></span>';let f=jn[d];if(!f)return"";let g=f.shortcut?` (${G(f.shortcut)})`:"";return`<button type="button" class="tb-btn" data-cmd="${G(f.command)}"${f.value?` data-val="${G(f.value)}"`:""} data-key="${G(f.key)}" title="${G(f.label)}${g}" aria-label="${G(f.label)}">${f.icon}</button>`}).join(""),i=a.length===0?"toolbar empty":r?"toolbar readonly":"toolbar";return`
        <div class="root" style="${`--tc-editor-min-height: ${n};${o?`--tc-editor-max-height: ${G(o)};`:""}`}">
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
        ${qn}
      `},afterMount(){Vt(this),Kt(this)},afterRender(){let e=this,r=e.shadowRoot?.querySelector(".surface");if(r){let n=r.innerHTML,o=String(e.value??"");o&&n!==o&&document.activeElement!==e&&(r.innerHTML=o),Ye(r)}Vt(e),Kt(e)},unmount(){this._editorCleanup?.()}}));function Ye(e){let t=e.textContent?.trim()===""&&e.querySelector("img, hr, br")===null;e.dataset.empty=t?"true":"false"}function Vt(e){let t=e;t._editorCleanup?.();let r=t.shadowRoot;if(!r)return;let n=r.querySelector(".surface");if(!n)return;n.dataset.bootstrapped||(t.value&&(n.innerHTML=String(t.value)),n.dataset.bootstrapped="1"),Ye(n);let o=(c,u)=>{if(!t.readonly){if(n.focus(),c==="code"){let m=r.getSelection?.()??globalThis.getSelection();if(!m||m.rangeCount===0)return;let v=m.getRangeAt(0),x=v.extractContents(),y=document.createElement("code");y.className="tc-code-inline",y.appendChild(x),v.insertNode(y),v.selectNodeContents(y),m.removeAllRanges(),m.addRange(v)}else if(c==="link"){let p=globalThis.prompt("URL")?.trim();if(!p)return;document.execCommand("createLink",!1,p)}else if(c==="math"){let p=globalThis.prompt("LaTeX (e.g. E = mc^2). Wrap with $$ for display.")?.trim();if(!p)return;let m=p.startsWith("$$")&&p.endsWith("$$"),v=m?p.replace(/^\$\$|\$\$$/g,"").trim():p;Bn(t,v,m)}else if(c==="codeblock"){let p=r.getSelection?.()??globalThis.getSelection();if(!p||p.rangeCount===0)return;let m=p.getRangeAt(0),v=m.toString()||"// code",x=document.createElement("pre"),y=document.createElement("code");y.textContent=v,x.appendChild(y),m.deleteContents(),m.insertNode(x);let k=document.createRange();k.selectNodeContents(y),k.collapse(!1),p.removeAllRanges(),p.addRange(k)}else c==="formatBlock"?document.execCommand("formatBlock",!1,`<${u??"p"}>`):document.execCommand(c,!1,u);Gt(t,n),Ut(r,n)}},a=c=>{let u=c.target?.closest?.(".tb-btn");if(!u)return;c.preventDefault();let p=u.dataset.cmd;p&&o(p,u.dataset.val)},s=()=>{Ye(n),Gt(t,n)},i=()=>{let c=n.innerHTML;t._lastEmitted!==c&&(t._lastEmitted=c,t.dispatchEvent(new CustomEvent("tc-change",{detail:{html:c},bubbles:!0,composed:!0})))},l=c=>{if(t.readonly||t.pasteAs!=="text")return;c.preventDefault();let u=c.clipboardData?.getData("text/plain")??"";document.execCommand("insertText",!1,u)},d=c=>{if(t.readonly||!(c.metaKey||c.ctrlKey))return;let u=c.key.toLowerCase();u==="b"?(c.preventDefault(),o("bold")):u==="i"?(c.preventDefault(),o("italic")):u==="u"?(c.preventDefault(),o("underline")):u==="k"&&(c.preventDefault(),o("link"))},f=()=>{let c=globalThis.getSelection();!c||!c.anchorNode||n.contains(c.anchorNode)&&Ut(r,n)},g=r.querySelector(".toolbar");g?.addEventListener("click",a),n.addEventListener("input",s),n.addEventListener("blur",i),n.addEventListener("paste",l),n.addEventListener("keydown",d),document.addEventListener("selectionchange",f),t._editorCleanup=()=>{g?.removeEventListener("click",a),n.removeEventListener("input",s),n.removeEventListener("blur",i),n.removeEventListener("paste",l),n.removeEventListener("keydown",d),document.removeEventListener("selectionchange",f)}}function Gt(e,t){let r=t.innerHTML;e.value=r,e.dispatchEvent(new CustomEvent("tc-input",{detail:{html:r},bubbles:!0,composed:!0}))}function Bn(e,t,r){let n=e.shadowRoot;if(!n)return;let o=n.querySelector(".surface");if(!o)return;let a=n.getSelection?.()??globalThis.getSelection();if(!a||a.rangeCount===0)return;let s=a.getRangeAt(0),i=document.createElement(r?"div":"span");i.className=r?"tc-math display":"tc-math inline",i.setAttribute("contenteditable","false"),i.dataset.latex=t,i.innerHTML=Yt(e,t,r),s.deleteContents(),s.insertNode(i);let l=document.createTextNode("\u200B");i.parentNode?.insertBefore(l,i.nextSibling);let d=document.createRange();d.setStartAfter(l),d.collapse(!0),a.removeAllRanges(),a.addRange(d),e.dispatchEvent(new CustomEvent("tc-input",{detail:{html:o.innerHTML},bubbles:!0,composed:!0}))}function Yt(e,t,r){if(e.mathRenderer)try{return e.mathRenderer(t,r)}catch{}return`<code class="tc-math-src">${t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code>`}function Kt(e){let t=e.shadowRoot;if(!t)return;let r=t.querySelector(".surface");if(!r)return;r.querySelectorAll(".tc-math").forEach(o=>{let a=o,s=a.dataset.latex??"",i=a.classList.contains("display"),l=`${i?"d":"i"}:${s}`;a.dataset.stamp!==l&&(a.innerHTML=Yt(e,s,i),a.dataset.stamp=l)})}function Ut(e,t){e.querySelectorAll(".tb-btn").forEach(n=>{let o=n,a=o.dataset.cmd??"",s=o.dataset.val,i=!1;try{a==="formatBlock"&&s?i=(document.queryCommandValue("formatBlock")||"").toLowerCase().replace(/^[<]|[>]$/g,"")===s:(a==="bold"||a==="italic"||a==="underline"||a==="strikeThrough"||a==="insertOrderedList"||a==="insertUnorderedList")&&(i=document.queryCommandState(a))}catch{i=!1}o.classList.toggle("is-active",i)})}var _n="tc-markdown";function T(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Re="\0M\0";function On(e,t){let r=[],n=(s,i)=>{let l=r.length;return r.push({latex:s,display:i}),`${Re}${l}${Re}`},o=e;o=o.replace(/\$\$([\s\S]+?)\$\$/g,(s,i)=>n(i.trim(),!0)),o=o.replace(/(^|[\s(])\$([^\$\n][^\$\n]*?)\$(?=[\s.,;:!?)\]]|$)/g,(s,i,l)=>`${i}${n(l.trim(),!1)}`);let a=T(o);return a=a.replace(/`([^`]+)`/g,"<code>$1</code>"),a=a.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>"),a=a.replace(/(?<!\*)\*([^*\n]+?)\*(?!\*)/g,"<em>$1</em>"),a=a.replace(/\b_(.+?)_\b/g,"<em>$1</em>"),a=a.replace(/~~(.+?)~~/g,"<del>$1</del>"),a=a.replace(/!\[([^\]]*)\]\(([^)]+)\)/g,(s,i,l)=>`<img src="${T(l)}" alt="${T(i)}" loading="lazy"/>`),a=a.replace(/\[([^\]]+)\]\(([^)]+)\)/g,(s,i,l)=>`<a href="${T(l)}" target="_blank" rel="noopener">${i}</a>`),a=a.replace(new RegExp(`${Re}(\\d+)${Re}`,"g"),(s,i)=>{let l=r[Number(i)];if(!l)return"";let d=l.latex;if(t)try{let f=t(d,l.display);return l.display?`<div class="tc-md-math display" data-latex="${T(d)}">${f}</div>`:`<span class="tc-md-math inline" data-latex="${T(d)}">${f}</span>`}catch(f){return l.display?`<div class="tc-md-math error" title="${T(String(f))}">${T(d)}</div>`:`<span class="tc-md-math error" title="${T(String(f))}">${T(d)}</span>`}return l.display?`<div class="tc-md-math fallback display" data-latex="${T(d)}"><code>${T(d)}</code></div>`:`<span class="tc-md-math fallback inline" data-latex="${T(d)}"><code>${T(d)}</code></span>`}),a}function Fn(e){let t=e.match(/^\[([ xX])\]\s+(.*)$/);return t?`<li class="tc-md-task"><input type="checkbox" disabled${t[1].toLowerCase()==="x"?" checked":""}/><span>${t[2]}</span></li>`:""}function Pn(e,t){let r=(a,s,i)=>{let l=i&&i!=="left"?` style="text-align:${i}"`:"";return`<${s}${l}>${a}</${s}>`},n=e[0]?.map((a,s)=>r(a,"th",t[s])).join("")??"",o=e.slice(1).map(a=>`<tr>${a.map((s,i)=>r(s,"td",t[i])).join("")}</tr>`).join("");return`<table class="tc-md-table"><thead><tr>${n}</tr></thead><tbody>${o}</tbody></table>`}function Xe(e,t){let r=t?.mathRenderer,n=t?.highlight,o=e.replace(/\r\n?/g,`
`).split(`
`),a=[],s=0,i=l=>On(l,r);for(;s<o.length;){let l=o[s],d=l.match(/^:::\s*([a-zA-Z][\w-]*)(?:\s+(.+))?\s*$/);if(d){let p=d[1].toLowerCase(),m=(d[2]??"").trim(),v=[];for(s++;s<o.length&&!/^:::\s*$/.test(o[s]);)v.push(o[s]),s++;s<o.length&&s++;let x=Xe(v.join(`
`),t);a.push(`<div class="tc-md-callout v-${T(p)}" role="${p==="danger"?"alert":"note"}">${m?`<div class="callout-title">${i(m)}</div>`:""}<div class="callout-body">${x}</div></div>`);continue}let f=l.match(/^```(\S*)\s*$/);if(f){let p=f[1]??"",m=[];for(s++;s<o.length&&!/^```\s*$/.test(o[s]);)m.push(o[s]),s++;s<o.length&&s++;let v=m.join(`
`),x=n&&p?(()=>{try{return n(v,p)}catch{return T(v)}})():T(v),y=p?` class="lang-${T(p)}"`:"";a.push(`<pre><code${y}>${x}</code></pre>`);continue}let g=l.match(/^(#{1,6})\s+(.*)$/);if(g){let p=g[1].length;a.push(`<h${p}>${i(g[2])}</h${p}>`),s++;continue}if(/^(?:-\s*){3,}$|^(?:\*\s*){3,}$|^(?:_\s*){3,}$/.test(l.trim())){a.push("<hr/>"),s++;continue}if(/^\s*\|.+\|\s*$/.test(l)&&s+1<o.length&&/^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(o[s+1])){let p=l.trim().replace(/^\||\|$/g,"").split("|").map(y=>y.trim()),m=o[s+1].trim().replace(/^\||\|$/g,"").split("|").map(y=>{let k=y.trim(),M=k.startsWith(":"),E=k.endsWith(":");return M&&E?"center":E?"right":M?"left":""}),v=[];for(s+=2;s<o.length&&/^\s*\|.+\|\s*$/.test(o[s]);)v.push(o[s].trim().replace(/^\||\|$/g,"").split("|").map(y=>i(y.trim()))),s++;let x=[p.map(y=>i(y)),...v];a.push(Pn(x,m));continue}if(/^>\s?/.test(l)){let p=[];for(;s<o.length&&/^>\s?/.test(o[s]);)p.push(o[s].replace(/^>\s?/,"")),s++;a.push(`<blockquote>${i(p.join(" "))}</blockquote>`);continue}let c=l.match(/^(\s*)(?:([-*+])|(\d+)\.)\s+(.*)$/);if(c){let p=!!c[3],m=p?"ol":"ul",v=[],x=!1;for(;s<o.length;){let k=o[s].match(/^(\s*)(?:([-*+])|(\d+)\.)\s+(.*)$/);if(!k||!!k[3]!==p)break;let E=k[4],C=Fn(E);C?(x=!0,v.push(C)):v.push(`<li>${i(E)}</li>`),s++}let y=x?' class="tc-md-tasks"':"";a.push(`<${m}${y}>${v.join("")}</${m}>`);continue}if(l.trim()===""){s++;continue}let u=[l];for(s++;s<o.length;){let p=o[s];if(p.trim()===""||/^#{1,6}\s+/.test(p)||/^```/.test(p)||/^>\s?/.test(p)||/^:::/.test(p)||/^(\s*)(?:[-*+]|\d+\.)\s+/.test(p)||/^\s*\|.+\|\s*$/.test(p)||/^(?:-\s*){3,}$|^(?:\*\s*){3,}$|^(?:_\s*){3,}$/.test(p.trim()))break;u.push(p),s++}a.push(`<p>${i(u.join(" "))}</p>`)}return a.join(`
`)}var Wt={bold:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h7a4 4 0 0 1 0 8H6z"/><path d="M6 12h8a4 4 0 0 1 0 8H6z"/></svg>',italic:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg>',heading:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6v12"/><path d="M12 6v12"/><path d="M4 12h8"/><path d="M16 18l4-12"/></svg>',code:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',link:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',bullet:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1.2" fill="currentColor"/><circle cx="4" cy="12" r="1.2" fill="currentColor"/><circle cx="4" cy="18" r="1.2" fill="currentColor"/></svg>',ordered:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><path d="M4 8V4l-1 1"/><path d="M3 14h2l-2 3h2"/></svg>',quote:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h3v6H4v-3a3 3 0 0 1 3-3z"/><path d="M16 7h3v6h-6v-3a3 3 0 0 1 3-3z"/></svg>',preview:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>'};function We(e,t,r,n,o,a="text"){let s=e.slice(t,r)||a;return{text:e.slice(0,t)+n+s+o+e.slice(r),selStart:t+n.length,selEnd:t+n.length+s.length}}function Ne(e,t,r,n){let o=e.lastIndexOf(`
`,t-1)+1,a=(()=>{let l=e.indexOf(`
`,r);return l===-1?e.length:l})(),i=e.slice(o,a).split(`
`).map(l=>n+l).join(`
`);return{text:e.slice(0,o)+i+e.slice(a),selStart:o,selEnd:o+i.length}}var Jt={bold:{key:"bold",label:"Bold",shortcut:"\u2318B",apply:(e,t,r)=>We(e,t,r,"**","**","bold text")},italic:{key:"italic",label:"Italic",shortcut:"\u2318I",apply:(e,t,r)=>We(e,t,r,"*","*","italic text")},heading:{key:"heading",label:"Heading",apply:(e,t,r)=>Ne(e,t,r,"## ")},code:{key:"code",label:"Code",apply:(e,t,r)=>We(e,t,r,"`","`","code")},link:{key:"link",label:"Link",shortcut:"\u2318K",apply:(e,t,r)=>{let n=globalThis.prompt?.("URL")?.trim();if(!n)return{text:e,selStart:t,selEnd:r};let o=e.slice(t,r)||"link text";return{text:e.slice(0,t)+`[${o}](${n})`+e.slice(r),selStart:t+1,selEnd:t+1+o.length}}},bullet:{key:"bullet",label:"Bulleted list",apply:(e,t,r)=>Ne(e,t,r,"- ")},ordered:{key:"ordered",label:"Numbered list",apply:(e,t,r)=>Ne(e,t,r,"1. ")},quote:{key:"quote",label:"Quote",apply:(e,t,r)=>Ne(e,t,r,"> ")}},Xt="bold,italic,heading,|,bullet,ordered,quote,|,link,code",Vn=`
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
`;b(_n,h({props:{value:{type:"string",default:""},placeholder:{type:"string",default:"Write some markdown\u2026"},mode:{type:"string",default:"split"},readonly:{type:"boolean",default:!1},minHeight:{type:"string",default:"240px"},toolbar:{type:"string",default:Xt}},theme:{"tc-md-bg":"var(--tc-color-surface, #ffffff)","tc-md-fg":"var(--tc-color-ink, #14171f)","tc-md-rule":"var(--tc-color-rule, #ece5d3)","tc-md-toolbar-bg":"var(--tc-color-bg, #faf8f3)","tc-md-preview-bg":"var(--tc-color-bg, #faf8f3)","tc-md-radius":"var(--tc-radius-md, 8px)","tc-md-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-md-mono-font":"var(--tc-font-mono, 'JetBrains Mono', ui-monospace, monospace)"},styles:{display:"block"},refs:{source:"textarea",preview:".preview"},template:({props:e,state:t})=>{let r=String(t.mode??e.mode??"split"),n=String(e.value??""),o=String(e.toolbar??Xt).split(",").map(c=>c.trim()).filter(Boolean),a=o.map(c=>{if(c==="|")return'<span class="tb-sep" aria-hidden="true"></span>';let u=Jt[c];if(!u||!Wt[u.key])return"";let p=u.shortcut?` (${T(u.shortcut)})`:"";return`<button type="button" class="tb-btn" data-op="${T(u.key)}" title="${T(u.label)}${p}" aria-label="${T(u.label)}">${Wt[u.key]}</button>`}).join(""),s=(c,u)=>`<button type="button" data-mode="${c}" class="${r===c?"is-active":""}" aria-pressed="${r===c?"true":"false"}">${u}</button>`,i=e,d=(i.render??(c=>Xe(c,{mathRenderer:i.mathRenderer,highlight:i.highlight})))(n),f=r==="source"?"panes source-only":r==="preview"?"panes preview-only":"panes";return`
        <div class="root" style="${`--tc-md-min-height: ${T(e.minHeight??"240px")};`}">
          <div class="${o.length===0?"toolbar empty":"toolbar"}" role="toolbar" aria-label="Markdown formatting">
            ${a}
            <span class="tb-mode" role="tablist" aria-label="View mode">
              ${s("source","Source")}
              ${s("split","Split")}
              ${s("preview","Preview")}
            </span>
          </div>
          <div class="${f}">
            <div class="source">
              <textarea
                placeholder="${T(e.placeholder??"")}"
                ${e.readonly?"readonly":""}
                spellcheck="true"
              >${T(n)}</textarea>
            </div>
            <div class="preview">${d}</div>
          </div>
        </div>
        ${Vn}
      `},afterMount(){Zt(this)},afterRender(){let e=this,t=e.shadowRoot?.querySelector("textarea");t&&document.activeElement!==e&&t.value!==String(e.value??"")&&(t.value=String(e.value??"")),Zt(e)},unmount(){this._mdCleanup?.()}}));function Zt(e){let t=e;t._mdCleanup?.();let r=t.shadowRoot;if(!r)return;let n=r.querySelector("textarea"),o=r.querySelector(".preview"),a=r.querySelector(".toolbar"),s=r.querySelector(".tb-mode");if(!n||!o)return;let i=t.render&&typeof t.render=="function"?t.render:p=>Xe(p,{mathRenderer:t.mathRenderer,highlight:t.highlight}),l=()=>{let p=n.value;t.value=p;let m=i(p);o.innerHTML=m,t.dispatchEvent(new CustomEvent("tc-input",{detail:{markdown:p,html:m},bubbles:!0,composed:!0}))},d=()=>l(),f=()=>{t.dispatchEvent(new CustomEvent("tc-change",{detail:{markdown:n.value,html:i(n.value)},bubbles:!0,composed:!0}))},g=p=>{let m=p.target?.closest?.(".tb-btn");if(!m)return;p.preventDefault();let v=m.dataset.op;v&&(Ie(n,v),l())},c=p=>{let m=p.target?.closest?.("[data-mode]");if(!m)return;let v=m.dataset.mode;v&&t.setState?.("mode",v)},u=p=>{if(!(p.metaKey||p.ctrlKey))return;let m=p.key.toLowerCase();m==="b"?(p.preventDefault(),Ie(n,"bold"),l()):m==="i"?(p.preventDefault(),Ie(n,"italic"),l()):m==="k"&&(p.preventDefault(),Ie(n,"link"),l())};n.addEventListener("input",d),n.addEventListener("blur",f),n.addEventListener("keydown",u),a?.addEventListener("click",g),s?.addEventListener("click",c),t._mdCleanup=()=>{n.removeEventListener("input",d),n.removeEventListener("blur",f),n.removeEventListener("keydown",u),a?.removeEventListener("click",g),s?.removeEventListener("click",c)}}function Ie(e,t){let r=Jt[t];if(!r)return;let n=e.selectionStart??e.value.length,o=e.selectionEnd??e.value.length,a=r.apply(e.value,n,o);e.value=a.text,e.focus(),e.setSelectionRange(a.selStart,a.selEnd)}var Ze={"alert-circle":'<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',"alert-triangle":'<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',info:'<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',check:'<polyline points="20 6 9 17 4 12"/>',"check-circle":'<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',x:'<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',"x-circle":'<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>',"arrow-right":'<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',"arrow-left":'<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',"arrow-up":'<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>',"arrow-down":'<line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>',"chevron-right":'<polyline points="9 18 15 12 9 6"/>',"chevron-left":'<polyline points="15 18 9 12 15 6"/>',"chevron-up":'<polyline points="18 15 12 9 6 15"/>',"chevron-down":'<polyline points="6 9 12 15 18 9"/>',"external-link":'<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',plus:'<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',minus:'<line x1="5" y1="12" x2="19" y2="12"/>',search:'<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',filter:'<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',"more-horizontal":'<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',"more-vertical":'<circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>',settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>',edit:'<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="m18.5 2.5 a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z"/>',trash:'<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',copy:'<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',save:'<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>',download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',user:'<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',users:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',mail:'<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/>',calendar:'<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',clock:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',home:'<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',menu:'<line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>',"log-out":'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',"log-in":'<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>',moon:'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',sun:'<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',eye:'<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',"eye-off":'<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>',loader:'<line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>',refresh:'<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>',banknote:'<rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>',calculator:'<rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/>',coins:'<path d="M13.744 17.736a6 6 0 1 1-7.48-7.48"/><path d="M15 6h1v4"/><path d="m6.134 14.768.866-.5 2 3.464"/><circle cx="16" cy="8" r="6"/>',"credit-card":'<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>',"dollar-sign":'<line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',landmark:'<path d="M10 18v-7"/><path d="M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="M3 22h18"/><path d="M6 18v-7"/>',percent:'<line x1="19" x2="5" y1="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',"piggy-bank":'<path d="M11 17h3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a3.16 3.16 0 0 0 2-2h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a5 5 0 0 0-2-4V3a4 4 0 0 0-3.2 1.6l-.3.4H11a6 6 0 0 0-6 6v1a5 5 0 0 0 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z"/><path d="M16 10h.01"/><path d="M2 8v1a2 2 0 0 0 2 2h1"/>',receipt:'<path d="M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z"/><path d="M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8"/><path d="M12 17V7"/>',wallet:'<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',"bar-chart":'<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M7 16h8"/><path d="M7 11h12"/><path d="M7 6h3"/>',"pie-chart":'<path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"/><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>',"trending-down":'<path d="M16 17h6v-6"/><path d="m22 17-8.5-8.5-5 5L2 7"/>',"trending-up":'<path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/>',gift:'<path d="M12 7v14"/><path d="M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/><path d="M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5"/><rect x="3" y="7" width="18" height="4" rx="1"/>',package:'<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><polyline points="3.29 7 12 12 20.71 7"/><path d="m7.5 4.27 9 5.15"/>',"shopping-bag":'<path d="M16 10a4 4 0 0 1-8 0"/><path d="M3.103 6.034h17.794"/><path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"/>',"shopping-cart":'<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',tag:'<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>',truck:'<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',bell:'<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>',"message-square":'<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/>',phone:'<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>',send:'<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',clipboard:'<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>',"file-text":'<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',folder:'<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',image:'<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',paperclip:'<path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551"/>',printer:'<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/><rect x="6" y="14" width="12" height="8" rx="1"/>',key:'<path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"/><path d="m21 2-9.6 9.6"/><circle cx="7.5" cy="15.5" r="5.5"/>',lock:'<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',shield:'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',unlock:'<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',link:'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',"map-pin":'<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',bookmark:'<path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"/>',heart:'<path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>',star:'<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>',grid:'<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',list:'<path d="M3 5h.01"/><path d="M3 12h.01"/><path d="M3 19h.01"/><path d="M8 5h13"/><path d="M8 12h13"/><path d="M8 19h13"/>',"user-check":'<path d="m16 11 2 2 4-4"/><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>',"user-plus":'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/>',ai:'<path d="M10 4 L11 8 L15 9 L11 10 L10 14 L9 10 L5 9 L9 8 Z"/><path d="M18 14 L18.6 16.4 L21 17 L18.6 17.6 L18 20 L17.4 17.6 L15 17 L17.4 16.4 Z"/><path d="M18 3 L18.4 4.6 L20 5 L18.4 5.4 L18 7 L17.6 5.4 L16 5 L17.6 4.6 Z"/>',confetti:'<circle cx="5" cy="5" r="1" fill="currentColor"/><circle cx="19" cy="6" r="1.5"/><circle cx="4" cy="14" r="1" fill="currentColor"/><circle cx="20" cy="16" r="1.2"/><path d="M9 20l1 2"/><path d="M15 20l-1 2"/><path d="M12 3l1 2"/><rect x="10" y="9" width="2.5" height="6" rx="1" transform="rotate(20 11.25 12)" fill="currentColor"/>',forecast:'<path d="M3 17l5-5 4 4 4-6"/><path d="M16 10l4-3" stroke-dasharray="3 3"/><circle cx="16" cy="10" r="1.5" fill="currentColor"/>',pulse:'<circle cx="12" cy="12" r="2" fill="currentColor"/><path d="M16.5 7.5a7 7 0 0 1 0 9"/><path d="M7.5 7.5a7 7 0 0 0 0 9"/><path d="M19.5 4.5a11 11 0 0 1 0 15"/><path d="M4.5 4.5a11 11 0 0 0 0 15"/>',"receipt-scan":'<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M8 9h8"/><path d="M8 13h8"/><path d="M8 17h5"/>',recurring:'<path d="M21 12a9 9 0 0 1-15 6.7"/><path d="M3 12a9 9 0 0 1 15-6.7"/><polyline points="21 4 21 9 16 9"/><polyline points="3 20 3 15 8 15"/><circle cx="12" cy="12" r="2" fill="currentColor"/>',spark:'<path d="M12 4 L13.6 10.4 L20 12 L13.6 13.6 L12 20 L10.4 13.6 L4 12 L10.4 10.4 Z"/><circle cx="19" cy="5" r="1" fill="currentColor"/>',subscription:'<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/><path d="M9 16.5a3 3 0 0 1 5.5-1.6"/><polyline points="15 13 15 15 13 15"/>',token:'<path d="M12 2l8 5v10l-8 5-8-5V7z"/><path d="M12 8v8"/><path d="M14 10h-3a1.5 1.5 0 0 0 0 3h2a1.5 1.5 0 0 1 0 3H10"/>',verified:'<path d="M12 2 L20 7 V17 L12 22 L4 17 V7 Z"/><polyline points="8 12 11 15 16 9"/>'},Gn=Object.freeze(Object.keys(Ze));var Kn="tc-icon";b(Kn,h({props:{name:{type:"string",default:""},size:{type:"string",default:"1em"},stroke:{type:"string",default:"currentColor"},fill:{type:"string",default:"none"},title:{type:"string",default:""}},styles:{display:"inline-flex","align-items":"center","justify-content":"center","vertical-align":"middle","line-height":"1"},template:({props:e})=>{let t=String(e.name??""),r=Ze[t],n=String(e.size??"1em"),o=String(e.stroke??"currentColor"),a=String(e.fill??"none"),s=String(e.title??"");if(!r)return`
          <svg width="${U(n)}" height="${U(n)}" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="1.5"
               stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <text x="12" y="14.5" text-anchor="middle" font-size="6" font-family="monospace" stroke="none" fill="currentColor">?</text>
          </svg>
        `;let i=s?`role="img" aria-label="${U(s)}"`:'aria-hidden="true"';return`
        <svg
          width="${U(n)}"
          height="${U(n)}"
          viewBox="0 0 24 24"
          fill="${U(a)}"
          stroke="${U(o)}"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          ${i}
        >${s?`<title>${U(s)}</title>`:""}${r}</svg>
      `}}));function U(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Un="site-nav";var Yn='<svg class="nav-caret" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>';b(Un,h({props:{active:{type:"string",default:""},version:{type:"string",default:"v1.1.0"},base:{type:"string",default:""}},styles:{display:"block"},template:({props:e})=>{let t=String(e.base??""),r=String(e.active??""),n=[{id:"docs",label:"Docs",href:`${t}docs.html`},{id:"components",label:"Components",href:`${t}components.html`}],o=[{id:"icons",label:"Icons",href:`${t}icons.html`},{id:"themes",label:"Themes",href:`${t}themes.html`},{id:"examples",label:"Examples",href:`${t}examples.html`},{id:"playground",label:"Playground",href:`${t}playground.html`}],a=[{id:"blog",label:"Blog",href:`${t}blog/`},{id:"github",label:"GitHub",href:"https://github.com/ra9/tan-compose",external:!0}],s=(l,d="")=>{let f=l.id===r,g=[d,f?"active":""].filter(Boolean).join(" "),c=f?' aria-current="page"':"",u=l.external?' target="_blank" rel="noopener"':"";return`<a href="${ke(l.href)}"${c}${u}${g?` class="${g}"`:""}>${ke(l.label)}</a>`},i=o.some(l=>l.id===r);return`
        <header class="topbar">
          <div class="inner">
            <a class="brand" href="${ke(t)}index.html">
              <svg class="brand-mark" viewBox="0 0 64 64" fill="none" aria-hidden="true"><rect x="8" y="8" width="32" height="32" rx="6" fill="#14171f" opacity="0.55"/><rect x="16" y="16" width="32" height="32" rx="6" fill="#14171f" opacity="0.75"/><rect x="24" y="24" width="32" height="32" rx="6" fill="#a16939"/></svg>
              tan-compose
              <span class="version-pill">${ke(e.version)}</span>
            </a>

            <site-search base="${ke(t)}" class="nav-search"></site-search>

            <button
              type="button"
              class="nav-toggle"
              aria-label="Open menu"
              aria-expanded="false"
              aria-controls="primary-nav"
            >
              <svg class="icon-open" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              <svg class="icon-close" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></svg>
            </button>

            <nav id="primary-nav" class="nav-menu" aria-label="Primary">
              ${n.map(l=>s(l)).join(`
              `)}

              <div class="nav-group${i?" group-active":""}">
                <button
                  type="button"
                  class="nav-group-trigger${i?" active":""}"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Resources ${Yn}
                </button>
                <div class="nav-dropdown" role="menu">
                  <span class="nav-dropdown-label">Resources</span>
                  ${o.map(l=>s(l,"nav-dropdown-link")).join(`
                  `)}
                </div>
              </div>

              ${a.map(l=>s(l)).join(`
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
            position: relative;
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
            flex: 0 0 auto;
            font-family: var(--tc-font-mono, "JetBrains Mono", monospace);
            font-weight: 600;
            font-size: 0.95rem;
            color: var(--tc-color-ink, #14171f);
            text-decoration: none;
          }
          .brand-mark {
            width: 22px;
            height: 22px;
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

          .nav-search { flex: 0 1 auto; }

          /* Hamburger \u2014 hidden on desktop, shown under the mobile breakpoint. */
          .nav-toggle {
            display: none;
            align-items: center;
            justify-content: center;
            width: 38px;
            height: 38px;
            flex: 0 0 auto;
            padding: 0;
            border: 1px solid var(--tc-color-rule, #ece5d3);
            border-radius: var(--tc-radius-md, 8px);
            background: var(--tc-color-surface, #ffffff);
            color: var(--tc-color-ink, #14171f);
            cursor: pointer;
            transition: border-color 0.15s ease;
          }
          .nav-toggle:hover { border-color: var(--tc-color-accent, #a16939); }
          .nav-toggle:focus-visible {
            outline: 2px solid var(--tc-color-accent, #a16939);
            outline-offset: 2px;
          }
          .nav-toggle .icon-close { display: none; }
          .nav-toggle[aria-expanded="true"] .icon-open { display: none; }
          .nav-toggle[aria-expanded="true"] .icon-close { display: inline; }

          nav.nav-menu {
            display: flex;
            gap: 22px;
            align-items: center;
          }
          nav.nav-menu > a,
          .nav-group-trigger {
            color: var(--tc-color-ink-soft, #4a5061);
            text-decoration: none;
            font-family: inherit;
            font-size: 0.92rem;
            font-weight: 500;
            transition: color 0.15s ease;
          }
          nav.nav-menu > a:hover,
          nav.nav-menu > a:focus-visible,
          nav.nav-menu > a.active,
          nav.nav-menu > a[aria-current="page"],
          .nav-group-trigger:hover,
          .nav-group-trigger:focus-visible,
          .nav-group-trigger.active {
            color: var(--tc-color-accent, #a16939);
          }
          nav.nav-menu > a:focus-visible,
          .nav-group-trigger:focus-visible {
            outline: 2px solid var(--tc-color-accent, #a16939);
            outline-offset: 4px;
            border-radius: 4px;
          }

          /* Dropdown group ----------------------------------------------- */
          .nav-group { position: relative; }
          .nav-group-trigger {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            padding: 0;
            background: none;
            border: none;
            cursor: pointer;
          }
          .nav-caret { transition: transform 0.18s ease; }
          .nav-group:hover .nav-caret,
          .nav-group.open .nav-caret {
            transform: rotate(180deg);
          }
          .nav-dropdown-label { display: none; }
          .nav-dropdown {
            position: absolute;
            top: calc(100% + 10px);
            right: 0;
            min-width: 180px;
            display: none;
            flex-direction: column;
            padding: 6px;
            background: var(--tc-color-surface, #ffffff);
            border: 1px solid var(--tc-color-rule, #ece5d3);
            border-radius: var(--tc-radius-md, 10px);
            box-shadow: 0 14px 32px -12px rgba(20, 23, 31, 0.28);
          }
          /* A hover bridge keeps the menu open while the pointer travels
             from the trigger down into the panel across the 10px gap. */
          .nav-dropdown::before {
            content: "";
            position: absolute;
            top: -10px;
            left: 0;
            right: 0;
            height: 10px;
          }
          /* Mouse opens on hover; keyboard/touch open via the .open class
             the trigger toggles. Deliberately not :focus-within \u2014 that would
             pin the panel open while the button is focused and break
             Enter-to-close. */
          .nav-group:hover .nav-dropdown,
          .nav-group.open .nav-dropdown {
            display: flex;
          }
          .nav-dropdown-link {
            display: block;
            padding: 8px 12px;
            border-radius: var(--tc-radius-sm, 6px);
            color: var(--tc-color-ink-soft, #4a5061);
            text-decoration: none;
            font-size: 0.9rem;
            font-weight: 500;
            white-space: nowrap;
            transition: background 0.12s ease, color 0.12s ease;
          }
          .nav-dropdown-link:hover,
          .nav-dropdown-link:focus-visible {
            background: var(--tc-color-accent-soft, #efe2cf);
            color: var(--tc-color-accent-hover, #8a572d);
            outline: none;
          }
          .nav-dropdown-link.active {
            color: var(--tc-color-accent, #a16939);
          }

          /* Mobile ------------------------------------------------------- */
          @media (max-width: 820px) {
            .inner { padding: 0 16px; gap: 10px; }
            .nav-toggle { display: inline-flex; }

            nav.nav-menu {
              position: absolute;
              top: calc(100% + 1px);
              left: 0;
              right: 0;
              display: none;
              flex-direction: column;
              align-items: stretch;
              gap: 0;
              padding: 8px;
              background: var(--tc-color-bg, #faf8f3);
              border-bottom: 1px solid var(--tc-color-rule, #ece5d3);
              box-shadow: 0 16px 32px -18px rgba(20, 23, 31, 0.35);
            }
            nav.nav-menu.open { display: flex; }

            nav.nav-menu > a,
            .nav-group-trigger {
              padding: 11px 12px;
              border-radius: var(--tc-radius-md, 8px);
              font-size: 0.98rem;
            }

            /* Inside the panel the group is a static, always-expanded
               section; the trigger becomes a non-interactive label. */
            .nav-group { position: static; }
            .nav-group-trigger {
              width: 100%;
              justify-content: flex-start;
              pointer-events: none;
              color: var(--tc-color-ink-muted, #6b7280);
              font-size: 0.72rem;
              text-transform: uppercase;
              letter-spacing: 0.07em;
              padding: 14px 12px 4px;
            }
            .nav-group-trigger .nav-caret { display: none; }
            .nav-dropdown,
            .nav-group.open .nav-dropdown {
              position: static;
              display: flex;
              min-width: 0;
              padding: 0;
              background: none;
              border: none;
              box-shadow: none;
            }
            .nav-dropdown::before { display: none; }
            .nav-dropdown-link { padding: 11px 20px; font-size: 0.98rem; }
          }

          @media (max-width: 460px) {
            .version-pill { display: none; }
          }
        </style>
      `},afterMount(){let e=this,t=e.shadowRoot;if(!t)return;let r=t.querySelector(".nav-toggle"),n=t.querySelector(".nav-menu"),o=Array.from(t.querySelectorAll(".nav-group")),a=(c,u)=>{c.classList.toggle("open",u),c.querySelector(".nav-group-trigger")?.setAttribute("aria-expanded",u?"true":"false")},s=c=>{for(let u of o)u!==c&&a(u,!1)},i=()=>{n?.classList.remove("open"),r?.setAttribute("aria-expanded","false"),r?.setAttribute("aria-label","Open menu")},l=c=>{c.preventDefault();let u=!n?.classList.contains("open");n?.classList.toggle("open",u),r?.setAttribute("aria-expanded",u?"true":"false"),r?.setAttribute("aria-label",u?"Close menu":"Open menu")};r?.addEventListener("click",l);let d=[];for(let c of o){let u=c.querySelector(".nav-group-trigger");if(!u)continue;let p=m=>{m.preventDefault();let v=!c.classList.contains("open");s(c),a(c,v)};u.addEventListener("click",p),d.push([u,p])}let f=c=>{let u=c.composedPath();for(let p of o)u.includes(p)||a(p,!1);n&&!u.includes(n)&&!(r&&u.includes(r))&&i()},g=c=>{c.key==="Escape"&&(s(),n?.classList.contains("open")&&(i(),r?.focus()))};document.addEventListener("click",f),document.addEventListener("keydown",g),e._navCleanup=()=>{r?.removeEventListener("click",l);for(let[c,u]of d)c.removeEventListener("click",u);document.removeEventListener("click",f),document.removeEventListener("keydown",g)}},unmount(){this._navCleanup?.()}}));function ke(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Wn="site-footer";b(Wn,h({props:{base:{type:"string",default:""},year:{type:"string",default:"2026"}},styles:{display:"block"},template:({props:e})=>{let t=String(e.base??"");return`
        <footer class="foot">
          <div class="inner">
            <p>&copy; ${de(e.year)} Tan Compose \xB7 MIT License</p>
            <div class="links">
              <a href="${de(t)}docs.html">Docs</a>
              <a href="${de(t)}components.html">Components</a>
              <a href="${de(t)}themes.html">Themes</a>
              <a href="${de(t)}playground.html">Playground</a>
              <a href="${de(t)}blog/">Blog</a>
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
      `}}));function de(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Xn="site-search";var Y=null,De=null;function je(e){if(Y)return Promise.resolve(Y);if(De)return De;let t=`${e}search.json`;return De=fetch(t).then(r=>r.json()).then(r=>(Y=r.docs??[],Y)).catch(r=>(console.warn("[site-search] failed to load index:",r),Y=[],Y)),De}function er(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Qt(e,t){let r=e.trim().toLowerCase();if(!r)return[];let n=r.split(/\s+/).filter(Boolean).map(a=>({raw:a,re:new RegExp(er(a),"i")})),o=[];for(let a of t){let s=a.title.toLowerCase(),i=(a.description??"").toLowerCase(),l=(a.text??"").toLowerCase(),d=0;for(let g of n){let c=g.raw;s===c&&(d+=50),s.startsWith(c)&&(d+=20),s.includes(c)&&(d+=10),i.includes(c)&&(d+=5),l.includes(c)&&(d+=1)}n.every(g=>g.re.test(a.title)||g.re.test(i)||g.re.test(l))&&d!==0&&(a.category==="blog"&&a.date&&(Date.now()-new Date(a.date).getTime())/864e5<30&&(d+=3),o.push({doc:a,score:d}))}return o.sort((a,s)=>s.score-a.score),o.slice(0,12)}function Zn(e,t,r=140){let n=e.trim().toLowerCase().split(/\s+/)[0];if(!n)return t.slice(0,r);let a=t.toLowerCase().indexOf(n);if(a===-1)return t.slice(0,r);let s=Math.max(0,a-40),i=Math.min(t.length,s+r),l=s>0?"\u2026 ":"",d=i<t.length?" \u2026":"";return l+t.slice(s,i)+d}function W(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Je(e,t){let r=t.trim();if(!r)return W(e);let n=r.split(/\s+/).filter(Boolean),o=W(e);for(let a of n){let s=new RegExp(`(${er(W(a))})`,"gi");o=o.replace(s,"<mark>$1</mark>")}return o}function Jn(e){e.setState("open",!1),e.setState("query",""),e.setState("results",[]),e.setState("focusIdx",0)}var Qn=`
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
`;b(Xn,h({props:{base:{type:"string",default:""}},styles:{display:"inline-block"},refs:{input:".search-input",results:".results",dialog:"dialog.modal"},template:({props:e,state:t})=>{let r=String(e.base??""),n=String(t.query??""),o=Number(t.focusIdx??0),a=t.results??[],s=`
        <button type="button" class="trigger" aria-label="Search the site (\u2318K)">
          <svg class="trigger-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <span class="trigger-label">Search</span>
          <kbd class="trigger-kbd" aria-hidden="true">\u2318K</kbd>
        </button>
      `,i=n.trim()===""?'<div class="empty">Start typing to search the site \u2014 docs, components, blog posts, examples.</div>':a.length===0?`<div class="empty">No results for "${W(n)}". Try a shorter query.</div>`:a.map((d,f)=>{let g=f===o?"row focused":"row",c=r+d.doc.url.replace(/^\//,""),u=Zn(n,d.doc.text);return`
              <a class="${g}" data-index="${f}" href="${W(c)}">
                <span class="row-cat ${W(d.doc.category)}">${W(d.doc.category)}</span>
                <div class="row-main">
                  <div class="row-title">${Je(d.doc.title,n)}</div>
                  <div class="row-desc">${Je(d.doc.description,n)}</div>
                  <div class="row-snippet">${Je(u,n)}</div>
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
              value="${W(n)}"
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
            <span class="count">${a.length>0?`${a.length} result${a.length===1?"":"s"}`:""}</span>
          </div>
        </dialog>
      `;return s+l+Qn},events:{"click .trigger":(e,t)=>{let r=t.host,n=String(r.base??"");t.setState("open",!0),t.setState("query",""),t.setState("focusIdx",0),t.setState("results",[]),je(n)},"click .close":(e,t)=>Jn(t),"input .search-input":(e,t)=>{let r=e.target.value,n=t.host,o=String(n.base??"");t.setState("query",r),t.setState("focusIdx",0),Y?t.setState("results",Qt(r,Y)):je(o).then(a=>{t.setState("results",Qt(r,a))})},"keydown .search-input":(e,t)=>{let r=e,n=t.getState("results")??[],o=Number(t.getState("focusIdx")??0);if(r.key==="ArrowDown"){if(r.preventDefault(),n.length===0)return;t.setState("focusIdx",Math.min(n.length-1,o+1));return}if(r.key==="ArrowUp"){if(r.preventDefault(),n.length===0)return;t.setState("focusIdx",Math.max(0,o-1));return}if(r.key==="Enter"){if(n.length===0)return;r.preventDefault();let a=n[o];if(a){let s=t.host,l=String(s.base??"")+a.doc.url.replace(/^\//,"");globalThis.location.href=l}return}},"mouseover .row":(e,t)=>{let r=e.target.closest(".row");if(!r)return;let n=Number(r.dataset.index);Number.isNaN(n)||t.setState("focusIdx",n)}},afterMount(){let e=this,t=r=>{if(r.key.toLowerCase()==="k"&&(r.metaKey||r.ctrlKey)&&!r.altKey){if(r.preventDefault(),!e.setState)return;e.setState("open",!0),e.setState("query",""),e.setState("focusIdx",0),e.setState("results",[]),je(String(e.base??""));return}if(r.key==="/"&&!r.metaKey&&!r.ctrlKey&&!r.altKey){let n=document.activeElement,o=n?.tagName.toLowerCase();if(o==="input"||o==="textarea"||n?.isContentEditable===!0||(r.preventDefault(),!e.setState))return;e.setState("open",!0),e.setState("query",""),e.setState("focusIdx",0),e.setState("results",[]),je(String(e.base??""))}};document.addEventListener("keydown",t),e._searchKeyHandler=t},unmount(){let e=this;e._searchKeyHandler&&document.removeEventListener("keydown",e._searchKeyHandler)},afterRender(){let e=this,t=e.refs?.dialog??null;if(!t)return;let r=e.getState?!!e.getState("open"):!1;if(r&&!t.open){t.showModal(),(e.refs?.input??null)?.focus(),t.addEventListener("close",()=>{e.getState?.("open")&&(e.setState?.("open",!1),e.setState?.("query",""),e.setState?.("results",[]),e.setState?.("focusIdx",0))}),t.addEventListener("click",o=>{o.target===t&&t.close()});return}if(!r&&t.open){t.close();return}if(r){let n=e.refs?.input??null;n&&e.shadowRoot?.activeElement!==n&&n.focus()}}}));
//# sourceMappingURL=site.js.map
