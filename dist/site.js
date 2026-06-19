var er=`:root {
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
`,_e=!1;function tr(){if(typeof document>"u"||_e)return;if(document.querySelector("style[data-tc-tokens]")){_e=!0;return}let e=document.createElement("style");e.setAttribute("data-tc-tokens",""),e.textContent=er,document.head.insertBefore(e,document.head.firstChild),_e=!0}tr();var rr=["beforeMount","afterMount","afterRender","unmount","action","formAssociatedCallback","formDisabledCallback","formResetCallback","formStateRestoreCallback"],nr=new Set(["string","number","boolean","json"]);function b(e){if(e===null||typeof e!="object")throw new TypeError("describe(): options must be an object");if(e.tag!==void 0&&typeof e.tag!="string")throw new TypeError("describe(): `tag` must be a string");if(e.className!==void 0&&typeof e.className!="string")throw new TypeError("describe(): `className` must be a string");if(e.template!==void 0&&typeof e.template!="string"&&typeof e.template!="function")throw new TypeError("describe(): `template` must be a string or function");if(e.children!==void 0&&!Array.isArray(e.children))throw new TypeError("describe(): `children` must be an array");if(e.emit!==void 0&&!Array.isArray(e.emit))throw new TypeError("describe(): `emit` must be an array");if(e.observedAttributes!==void 0&&(!Array.isArray(e.observedAttributes)||e.observedAttributes.some(t=>typeof t!="string")))throw new TypeError("describe(): `observedAttributes` must be an array of strings");for(let t of["theme","styles","attributes","events","refs"]){let r=e[t];if(r!==void 0&&(r===null||typeof r!="object"||Array.isArray(r)))throw new TypeError(`describe(): \`${t}\` must be a record`)}if(e.refs!==void 0){for(let[t,r]of Object.entries(e.refs))if(typeof r!="string")throw new TypeError(`describe(): refs.${t} must be a CSS selector string`)}if(e.stylesheet!==void 0&&!(typeof e.stylesheet=="string"||Array.isArray(e.stylesheet)&&e.stylesheet.every(r=>typeof r=="string")))throw new TypeError("describe(): `stylesheet` must be a string or array of strings");if(e.formAssociated!==void 0&&typeof e.formAssociated!="boolean")throw new TypeError("describe(): `formAssociated` must be a boolean");for(let t of rr){let r=e[t];if(r!==void 0&&typeof r!="function")throw new TypeError(`describe(): \`${t}\` must be a function`)}if(e.if!==void 0&&typeof e.if!="function")throw new TypeError("describe(): `if` must be a function");if(e.for!==void 0){let t=e.for;if(t===null||typeof t!="object"||Array.isArray(t))throw new TypeError("describe(): `for` must be a record");if(typeof t.items!="function")throw new TypeError("describe(): `for.items` must be a function");if(typeof t.key!="function")throw new TypeError("describe(): `for.key` must be a function");if(typeof t.render!="function")throw new TypeError("describe(): `for.render` must be a function")}if(e.props!==void 0){let t=e.props;if(t===null||typeof t!="object"||Array.isArray(t))throw new TypeError("describe(): `props` must be a record");for(let[r,n]of Object.entries(t)){if(n===null||typeof n!="object"||Array.isArray(n))throw new TypeError(`describe(): props.${r} must be a record`);if(!nr.has(n.type))throw new TypeError(`describe(): props.${r}.type must be one of "string", "number", "boolean", "json"`)}}return{...e}}var Qe=Symbol.for("tan-compose.SafeHtml"),me=class{value;[Qe]=!0;constructor(t){this.value=t}toString(){return this.value}};function Le(e){return typeof e=="object"&&e!==null&&e[Qe]===!0}function he(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function f(e){return new me(String(e??""))}function et(e){return e==null||e===!1||e===!0?e===!0?"true":"":Le(e)?e.value:Array.isArray(e)?e.map(et).join(""):he(e)}function v(e,...t){let r=e[0];for(let n=0;n<t.length;n++)r+=et(t[n])+e[n+1];return new me(r)}var tt=new Map,or=/^[a-z][a-z0-9]*(-[a-z0-9]+)+$/,ar=/^(\S+)(?:\s+(.+))?$/,sr=new Set(["focus","blur","mouseenter","mouseleave","pointerenter","pointerleave","load","error","scroll"]),rt=50;function ir(e){return e.replace(/[A-Z]/g,t=>"-"+t.toLowerCase())}function at(e){return Le(e)?e.value:e}function nt(e){return e.replace(/(["\\])/g,"\\$1")}function y(e,t){let r=t;if(typeof e!="string"||!or.test(e))throw new TypeError(`build(): "${e}" is not a valid custom element name (must be lowercase and contain a hyphen).`);if(tt.has(e))return console.warn(`Component "${e}" is already registered. Skipping re-registration.`),e;if(typeof HTMLElement>"u"||typeof customElements>"u")return console.warn("HTMLElement or customElements not available; skipping component registration."),e;let n=r.props??{},o=new Map,a=new Map,s=new Set(r.observedAttributes??[]);for(let m of Object.keys(n)){let c=ir(m);o.set(c,m),o.set(m.toLowerCase(),m),s.add(c),s.add(m.toLowerCase()),a.set(m,c)}let i=Array.from(s),l=r.refs??{},d=dr(r);class g extends HTMLElement{static get observedAttributes(){return i}static get formAssociated(){return r.formAssociated===!0}isMounted=!1;mountCleanups=[];renderCleanups=[];state=new Map;propValues=new Map;listSlots=new WeakMap;allSlots=new Set;currentRefs={};container;ctx;rendering=!1;renderQueued=!1;renderTick=0;renderTickScheduled=!1;internals;constructor(){super();let c=this.attachShadow({mode:"open"});r.formAssociated&&typeof this.attachInternals=="function"&&(this.internals=this.attachInternals()),ur(c,d),this.container=document.createElement("div"),this.container.className=r.className?`container ${r.className}`:"container",c.appendChild(this.container),r.attributes&&lt(this,r.attributes),this.ctx=cr(this,this.propValues,this.state,()=>this.currentRefs),this.initProps()}get refs(){return this.currentRefs}initProps(){for(let[c,u]of Object.entries(n)){let p=this.getAttribute(a.get(c)??c)??this.getAttribute(c),h=p!==null?ot(p,u.type):u.default;this.propValues.set(c,h),this.maybeSyncFormValue(c,h),Object.defineProperty(this,c,{configurable:!0,enumerable:!0,get:()=>this.propValues.get(c),set:x=>{let E=gr(x,u.type),$=this.propValues.get(c);Object.is($,E)||(this.propValues.set(c,E),u.reflect&&mr(this,a.get(c)??c,E,u.type),this.maybeSyncFormValue(c,E),this.isMounted&&this.scheduleRender())}})}}maybeSyncFormValue(c,u){if(!this.internals||c!=="value")return;let p=u==null?null:String(u);this.internals.setFormValue(p)}connectedCallback(){if(!this.isMounted){try{r.beforeMount?.call(this)}catch(c){console.error(`[tan-compose] beforeMount threw for <${e}>:`,c)}if(this.renderInternal(),r.action){let c=r.action;this.addEventListener("click",c),this.mountCleanups.push(()=>this.removeEventListener("click",c))}if(r.emit)for(let c of r.emit)this.addEventListener(c.name,c.handler),this.mountCleanups.push(()=>this.removeEventListener(c.name,c.handler));r.events&&this.attachDelegatedEvents(r.events),this.isMounted=!0;try{r.afterMount?.call(this)}catch(c){console.error(`[tan-compose] afterMount threw for <${e}>:`,c)}}}disconnectedCallback(){try{r.unmount?.call(this)}catch(c){console.error(`[tan-compose] unmount threw for <${e}>:`,c)}le(this.mountCleanups),le(this.renderCleanups),this.flushListSlots(),this.isMounted=!1}flushListSlots(){for(let c of this.allSlots){for(let u of c.cache.values())le(u.cleanups);c.cache.clear()}this.allSlots.clear()}attributeChangedCallback(c,u,p){if(u===p)return;let h=o.get(c);if(h){let x=n[h],E=p!==null?ot(p,x.type):x.default,$=this.propValues.get(h);Object.is($,E)||(this.propValues.set(h,E),this.maybeSyncFormValue(h,E),this.isMounted&&this.scheduleRender());return}this.state.set(c,p),this.isMounted&&this.scheduleRender()}setState(c,u){let p=this.state.get(c);Object.is(p,u)||(this.state.set(c,u),this.isMounted&&this.scheduleRender())}getState(c){return this.state.get(c)}render(){this.renderInternal()}emitEvent(c,u){this.dispatchEvent(new CustomEvent(c,{detail:u,bubbles:!0,composed:!0}))}scheduleRender(){if(this.rendering){this.renderQueued=!0;return}this.renderInternal()}getOrCreateSlot(c){let u=this.listSlots.get(c);return u||(u={cache:new Map},this.listSlots.set(c,u),this.allSlots.add(u)),u}renderInternal(){if(++this.renderTick>rt){console.error(`[tan-compose] <${e}> exceeded ${rt} renders in one turn \u2014 aborting to break a render loop (check afterRender / setState).`),this.renderTick=0,this.renderQueued=!1;return}if(!this.renderTickScheduled){this.renderTickScheduled=!0;let u=()=>{this.renderTick=0,this.renderTickScheduled=!1};typeof queueMicrotask=="function"?queueMicrotask(u):Promise.resolve().then(u)}this.rendering=!0;let c=this.captureFocusInShadow();try{le(this.renderCleanups),this.container.replaceChildren();let u={host:this,cleanups:this.renderCleanups,ctx:this.ctx};if(r.template!==void 0){let p=typeof r.template=="function"?r.template(this.ctx):r.template,h=at(p);h&&(this.container.innerHTML=h)}if(r.children)for(let p of r.children){let h=st(p,u,x=>this.getOrCreateSlot(x));h&&this.container.appendChild(h)}this.container.appendChild(document.createElement("slot")),this.refreshRefs()}finally{this.rendering=!1}if(c&&this.restoreFocusInShadow(c),this.renderQueued){this.renderQueued=!1,this.renderInternal();return}try{r.afterRender?.call(this)}catch(u){console.error(`[tan-compose] afterRender threw for <${e}>:`,u)}}captureFocusInShadow(){let c=this.shadowRoot;if(!c)return null;let u=c.activeElement;if(!u)return null;let p=[],h=u;for(;h&&h!==c;){let $=h.parentNode;if(!$)break;let S=h.tagName,z=Array.from($.children).filter(C=>C.tagName===S).indexOf(h);if(p.unshift({tag:S,idx:z}),h=$ instanceof Element?$:null,!h&&$===c)break}let x=null,E=null;if(u instanceof HTMLInputElement||u instanceof HTMLTextAreaElement)try{x=u.selectionStart,E=u.selectionEnd}catch{}return{id:u.id||null,name:u.getAttribute("name"),path:p,selectionStart:x,selectionEnd:E}}restoreFocusInShadow(c){let u=this.shadowRoot;if(!u)return;let p=null;if(c.id&&(p=u.getElementById?.(c.id)??u.querySelector(`[id="${nt(c.id)}"]`)),!p&&c.name&&(p=u.querySelector(`[name="${nt(c.name)}"]`)),!p){let h=u;for(let x of c.path){let E=Array.from(h.children??[]),H=(E.length>0?E:Array.from(h.children??[])).filter(z=>z.tagName===x.tag)[x.idx];if(!H)return;h=H}p=h}if(!(!p||typeof p.focus!="function")&&u.activeElement!==p&&(p.focus(),c.selectionStart!=null&&(p instanceof HTMLInputElement||p instanceof HTMLTextAreaElement)))try{p.setSelectionRange(c.selectionStart,c.selectionEnd??c.selectionStart)}catch{}}refreshRefs(){let c={},u=this.shadowRoot;for(let[p,h]of Object.entries(l))c[p]=u?u.querySelector(h):null;this.currentRefs=c}formAssociatedCallback(c){try{r.formAssociatedCallback?.call(this,c)}catch(u){console.error(`[tan-compose] formAssociatedCallback threw for <${e}>:`,u)}}formDisabledCallback(c){try{r.formDisabledCallback?.call(this,c)}catch(u){console.error(`[tan-compose] formDisabledCallback threw for <${e}>:`,u)}}formResetCallback(){try{r.formResetCallback?.call(this)}catch(c){console.error(`[tan-compose] formResetCallback threw for <${e}>:`,c)}}formStateRestoreCallback(c,u){try{r.formStateRestoreCallback?.call(this,c,u)}catch(p){console.error(`[tan-compose] formStateRestoreCallback threw for <${e}>:`,p)}}attachDelegatedEvents(c){let u=new Map;for(let[p,h]of Object.entries(c)){let x=ar.exec(p.trim());if(!x)continue;let[,E,$]=x;u.has(E)||u.set(E,[]),u.get(E).push({selector:$??null,handler:h})}for(let[p,h]of u){let x=$=>{for(let{selector:S,handler:H}of h){if(!S){H($,this.ctx);continue}let z=$.composedPath();for(let C of z){if(C===this.shadowRoot||C===this)break;if(C instanceof Element&&this.shadowRoot?.contains(C)&&C.matches(S)){H($,this.ctx);break}}}},E=sr.has(p);this.shadowRoot.addEventListener(p,x,E),this.mountCleanups.push(()=>this.shadowRoot?.removeEventListener(p,x,E))}}}return tt.set(e,g),customElements.define(e,g),e}function st(e,t,r){return e.if&&!e.if(t.ctx)?null:it(e,t,r)}function it(e,t,r){let n=document.createElement(e.tag||"div");if(e.styles&&(n.style.cssText=Object.entries(e.styles).map(([o,a])=>`${o}: ${a}`).join("; ")),e.className&&(n.className=e.className),e.attributes&&lt(n,e.attributes),e.template!==void 0){let o=typeof e.template=="function"?e.template(t.ctx):e.template,a=at(o);a&&(n.innerHTML=a)}if(e.children)for(let o of e.children){let a=st(o,t,r);a&&n.appendChild(a)}if(e.for&&lr(n,e,t,r),e.action){let o=e.action;n.addEventListener("click",o),t.cleanups.push(()=>n.removeEventListener("click",o))}if(e.emit)for(let o of e.emit)n.addEventListener(o.name,o.handler),t.cleanups.push(()=>n.removeEventListener(o.name,o.handler));return n}function lr(e,t,r,n){let o=t.for,a=n(t),s=o.items(r.ctx),i=new Map;for(let l=0;l<s.length;l++){let d=s[l],g=o.key(d,l),m,c=a.cache.get(g);if(c&&Object.is(c.lastItem,d))m=c;else{let u=[],p=o.render(d,l,r.ctx),h=it(p,{...r,cleanups:u},n);c&&le(c.cleanups),m={element:h,lastItem:d,cleanups:u}}i.set(g,m),e.appendChild(m.element)}for(let[l,d]of a.cache)i.has(l)||le(d.cleanups);a.cache=i}function cr(e,t,r,n){return{host:e,get props(){let o={};for(let[a,s]of t)o[a]=s;return o},get state(){let o={};for(let[a,s]of r)o[a]=s;return o},get refs(){return n()},setState:(o,a)=>e.setState(o,a),getState:o=>e.getState(o),emit:(o,a)=>e.emitEvent(o,a)}}function dr(e){let t=[];if(e.theme&&t.push(pr(e.theme)),e.stylesheet){let n=Array.isArray(e.stylesheet)?e.stylesheet:[e.stylesheet];for(let o of n)o&&t.push(o)}if(e.styles&&t.push(fr(e.styles)),t.length===0)return{kind:"adopted",sheets:[]};if(typeof CSSStyleSheet<"u"&&typeof CSSStyleSheet.prototype.replaceSync=="function"){let n=[];for(let o of t){let a=new CSSStyleSheet;a.replaceSync(o),n.push(a)}return{kind:"adopted",sheets:n}}return{kind:"fallback",cssList:t}}function ur(e,t){if(t.kind==="adopted"){if(t.sheets.length>0)try{e.adoptedStyleSheets=t.sheets}catch{}return}for(let r of t.cssList){let n=document.createElement("style");n.textContent=r,e.appendChild(n)}}function lt(e,t){for(let[r,n]of Object.entries(t))e.setAttribute(r,n)}function pr(e){return`:host { ${Object.entries(e).map(([r,n])=>`--${r}: ${n};`).join(" ")} }`}function fr(e){return`.container { ${Object.entries(e).map(([r,n])=>`${r}: ${n};`).join(" ")} }`}function le(e){for(;e.length>0;){let t=e.pop();try{t?.()}catch(r){console.error("[tan-compose] cleanup threw:",r)}}}function ot(e,t){switch(t){case"string":return e;case"number":{let r=Number(e);return Number.isNaN(r)?void 0:r}case"boolean":return e!=="false"&&e!=="0";case"json":try{return JSON.parse(e)}catch{return}}}function gr(e,t){switch(t){case"string":return e==null?e:String(e);case"number":return e==null?e:Number(e);case"boolean":return!!e;case"json":return e}}function mr(e,t,r,n){if(n!=="json"){if(n==="boolean"){r?e.setAttribute(t,""):e.removeAttribute(t);return}if(r==null){e.removeAttribute(t);return}e.setAttribute(t,String(r))}}var hr="tc-button";var br=`
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
`;y(hr,b({props:{variant:{type:"string",default:"primary"},size:{type:"string",default:"md"},disabled:{type:"boolean",default:!1,reflect:!0},loading:{type:"boolean",default:!1},block:{type:"boolean",default:!1},href:{type:"string",default:""},target:{type:"string",default:""},rel:{type:"string",default:""},type:{type:"string",default:"button"}},theme:{"tc-btn-primary-bg":"var(--tc-color-ink, #14171f)","tc-btn-primary-fg":"var(--tc-color-surface, #ffffff)","tc-btn-secondary-bg":"var(--tc-color-surface, #ffffff)","tc-btn-secondary-fg":"var(--tc-color-ink, #14171f)","tc-btn-secondary-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-btn-ghost-fg":"var(--tc-color-ink, #14171f)","tc-btn-ghost-border":"transparent","tc-btn-danger-bg":"var(--tc-color-danger, #b3261e)","tc-btn-danger-fg":"var(--tc-color-surface, #ffffff)","tc-btn-radius":"var(--tc-radius-md, 8px)","tc-btn-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-btn-padding-x":"initial","tc-btn-padding-y":"initial"},styles:{display:"inline-block","vertical-align":"middle"},stylesheet:br,template:({props:e})=>{let t=`root v-${be(e.variant)} s-${be(e.size)}${e.block?" block":""}`,r=`${e.loading?'<span class="spinner" aria-hidden="true"></span>':""}
        <span class="content"><slot></slot></span>`,n=String(e.href??""),o=n.length>0,a=!!(e.disabled||e.loading);if(o){let l=e.target?` target="${be(e.target)}"`:"",d=e.rel?String(e.rel):String(e.target)==="_blank"?"noopener":"",g=d?` rel="${be(d)}"`:"",m=a?"":` href="${be(n)}"`,c=a?' aria-disabled="true"':"",u=a?' tabindex="-1"':"";return v`
          <a
            part="button"
            class="${f(t)}"
            ${f(m)}${f(l)}${f(g)}${f(c)}${f(u)}
            role="button"
          >
            ${f(r)}
          </a>
        `}let s=String(e.type??"button"),i=s==="submit"||s==="reset"?s:"button";return v`
        <button
          part="button"
          class="${f(t)}"
          ${f(a?"disabled":"")}
          type="${i}"
        >
          ${f(r)}
        </button>
      `},events:{"click .root":(e,t)=>{let r=t.host;if(r.disabled||r.loading||String(r.href??""))return;let n=String(r.type??"button");if(n!=="submit"&&n!=="reset")return;let o=r.closest("form");if(!o)return;let a=n==="submit"?"tc-submit":"tc-reset",s=new CustomEvent(a,{detail:{form:o},bubbles:!0,composed:!0,cancelable:!0});r.dispatchEvent(s),!s.defaultPrevented&&(n==="submit"?o.requestSubmit():o.reset())}}}));function be(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var vr="tc-input";var yr=`
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
`;y(vr,b({formAssociated:!0,props:{value:{type:"string",default:""},name:{type:"string",default:""},type:{type:"string",default:"text"},placeholder:{type:"string",default:""},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0}},theme:{"tc-input-bg":"var(--tc-color-surface, #ffffff)","tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-border-focus":"var(--tc-color-accent, #a16939)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-radius":"var(--tc-radius-md, 8px)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},stylesheet:yr,refs:{input:"input"},template:({props:e})=>{let t=!!e.error;return v`
        ${f(e.label?`<label class="label">${ct(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</label>`:"")}
        <input
          class="input ${t?"invalid":""}"
          part="input"
          type="${e.type}"
          value="${e.value}"
          name="${e.name}"
          placeholder="${e.placeholder}"
          ${f(e.disabled?"disabled":"")}
          ${f(e.required?"required":"")}
          aria-invalid="${t?"true":"false"}"
        />
        ${f(e.error||e.helper?`<div class="${t?"error":"helper"}">${ct(e.error||e.helper)}</div>`:"")}
      `},events:{"input input":(e,t)=>{let r=e.target.value,n=t.host;n.internals?.setFormValue(r),n.value=r,t.emit("tc-input",{value:r})}},formResetCallback(){this.value=""}}));function ct(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var xr="tc-textarea";var kr=`
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
`;y(xr,b({formAssociated:!0,props:{value:{type:"string",default:""},name:{type:"string",default:""},placeholder:{type:"string",default:""},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},rows:{type:"number",default:4},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0},resize:{type:"string",default:"vertical"}},theme:{"tc-input-bg":"var(--tc-color-surface, #ffffff)","tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-border-focus":"var(--tc-color-accent, #a16939)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-radius":"var(--tc-radius-md, 8px)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},stylesheet:kr,refs:{input:"textarea"},template:({props:e})=>{let t=!!e.error;return v`
        ${f(e.label?`<label class="label">${dt(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</label>`:"")}
        <textarea
          class="input ${t?"invalid":""}"
          part="textarea"
          name="${e.name}"
          placeholder="${e.placeholder}"
          rows="${e.rows}"
          ${f(e.disabled?"disabled":"")}
          ${f(e.required?"required":"")}
          aria-invalid="${t?"true":"false"}"
          style="resize: ${e.resize};"
        >${e.value}</textarea>
        ${f(e.error||e.helper?`<div class="${t?"error":"helper"}">${dt(e.error||e.helper)}</div>`:"")}
      `},events:{"input textarea":(e,t)=>{let r=e.target.value,n=t.host;n.internals?.setFormValue(r),n.value=r,t.emit("tc-input",{value:r})}},formResetCallback(){this.value=""}}));function dt(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var wr="tc-select";var $r=`
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
`;y(wr,b({formAssociated:!0,props:{value:{type:"string",default:""},name:{type:"string",default:""},options:{type:"json",default:[]},placeholder:{type:"string",default:""},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0}},theme:{"tc-input-bg":"var(--tc-color-surface, #ffffff)","tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-border-focus":"var(--tc-color-accent, #a16939)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-radius":"var(--tc-radius-md, 8px)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},stylesheet:$r,template:({props:e})=>{let t=e.options??[],r=!!e.error;return v`
        ${f(e.label?`<label class="label">${ve(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</label>`:"")}
        <div class="wrap">
          <select
            class="select ${r?"invalid":""}"
            part="select"
            name="${e.name}"
            ${f(e.disabled?"disabled":"")}
            ${f(e.required?"required":"")}
            aria-invalid="${r?"true":"false"}"
          >
            ${f(e.placeholder?`<option value="" disabled ${e.value===""?"selected":""}>${ve(e.placeholder)}</option>`:"")} ${f(t.map(n=>`<option value="${ve(n.value)}"${n.disabled?" disabled":""}${n.value===e.value?" selected":""}>${ve(n.label)}</option>`).join(""))}
          </select>
          <span class="caret" aria-hidden="true">▾</span>
        </div>
        ${f(e.error||e.helper?`<div class="${r?"error":"helper"}">${ve(e.error||e.helper)}</div>`:"")}
      `},events:{"change select":(e,t)=>{let r=e.target.value,n=t.host;n.internals?.setFormValue(r),n.value=r,t.emit("tc-change",{value:r})}},formResetCallback(){this.value=""}}));function ve(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Er="tc-checkbox";var Mr=`
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
`;y(Er,b({formAssociated:!0,props:{checked:{type:"boolean",default:!1,reflect:!0},name:{type:"string",default:""},value:{type:"string",default:"on"},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0},indeterminate:{type:"boolean",default:!1}},theme:{"tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-border-focus":"var(--tc-color-accent, #a16939)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-radius":"var(--tc-radius-sm, 4px)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-checkbox-accent":"var(--tc-color-accent, #a16939)"},styles:{display:"block"},stylesheet:Mr,template:({props:e})=>{let t=!!e.error;return v`
        <label class="row ${e.disabled?"is-disabled":""} ${t?"is-invalid":""}">
          <input
            class="cb"
            type="checkbox"
            name="${e.name}"
            value="${e.value}"
            ${f(e.checked?"checked":"")}
            ${f(e.disabled?"disabled":"")}
            ${f(e.required?"required":"")}
            aria-invalid="${t?"true":"false"}"
          />
          ${f(e.label?`<span class="label">${ut(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</span>`:"<span></span>")}
        </label>
        ${f(e.error||e.helper?`<div class="${t?"error":"helper"}">${ut(e.error||e.helper)}</div>`:"")}
      `},refs:{input:".cb"},events:{"change .cb":(e,t)=>{let r=e.target.checked,n=t.host;n.checked=r,n.internals?.setFormValue(r?n.value:null),t.emit("tc-change",{checked:r})}},afterMount(){let e=this,r=e.shadowRoot?.querySelector(".cb");r&&(r.indeterminate=e.indeterminate),e.internals?.setFormValue(e.checked?e.value:null)},formResetCallback(){this.checked=!1}}));function ut(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Sr="tc-switch";var Lr=`
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
`;y(Sr,b({formAssociated:!0,props:{checked:{type:"boolean",default:!1,reflect:!0},name:{type:"string",default:""},value:{type:"string",default:"on"},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},disabled:{type:"boolean",default:!1,reflect:!0}},theme:{"tc-switch-track-off":"var(--tc-color-rule-strong, #d9cfb8)","tc-switch-track-on":"var(--tc-color-accent, #a16939)","tc-switch-thumb":"var(--tc-color-surface, #ffffff)","tc-switch-fg":"var(--tc-color-ink, #14171f)","tc-switch-helper":"var(--tc-color-ink-muted, #6b7280)","tc-switch-error":"var(--tc-color-danger, #b3261e)","tc-switch-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},stylesheet:Lr,template:({props:e})=>{let t=!!e.error;return v`
        <label class="row ${e.disabled?"is-disabled":""}">
          <button
            class="track ${e.checked?"on":""}"
            type="button"
            role="switch"
            aria-checked="${e.checked?"true":"false"}"
            ${f(e.disabled?"disabled":"")}
            aria-invalid="${t?"true":"false"}"
          >
            <span class="thumb"></span>
          </button>
          ${f(e.label?`<span class="label">${pt(e.label)}</span>`:"")}
        </label>
        ${f(e.error||e.helper?`<div class="${t?"error":"helper"}">${pt(e.error||e.helper)}</div>`:"")}
      `},events:{"click .track":(e,t)=>{let r=t.host;r.disabled||(r.checked=!r.checked,r.internals?.setFormValue(r.checked?r.value:null),t.emit("tc-change",{checked:r.checked}))},"keydown .track":(e,t)=>{let r=e;if(r.key!==" "&&r.key!=="Enter")return;r.preventDefault();let n=t.host;n.disabled||(n.checked=!n.checked,n.internals?.setFormValue(n.checked?n.value:null),t.emit("tc-change",{checked:n.checked}))}},afterMount(){let e=this;e.internals?.setFormValue(e.checked?e.value:null)},formResetCallback(){this.checked=!1}}));function pt(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Tr="tc-file";var Hr=`
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
`;y(Tr,b({formAssociated:!0,props:{name:{type:"string",default:""},accept:{type:"string",default:""},multiple:{type:"boolean",default:!1,reflect:!0},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},buttonText:{type:"string",default:"Choose file"},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0}},theme:{"tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-border-focus":"var(--tc-color-accent, #a16939)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-radius":"var(--tc-radius-md, 8px)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-file-zone-bg":"var(--tc-color-surface-alt, #faf8f3)","tc-file-zone-fg":"var(--tc-color-ink-soft, #4a5061)"},styles:{display:"block"},stylesheet:Hr,refs:{input:"input[type='file']"},template:({props:e,state:t})=>{let r=!!e.error,n=t.files??[],o=n.length===0?"No file selected":n.length===1?Oe(n[0].name):`${n.length} files selected`;return v`
        ${f(e.label?`<label class="label">${Oe(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</label>`:"")}
        <div class="zone ${e.disabled?"is-disabled":""} ${r?"is-invalid":""}">
          <button class="btn" type="button" ${f(e.disabled?"disabled":"")}>
            ${e.buttonText}
          </button>
          <span class="files">${f(o)}</span>
          <input
            class="native"
            type="file"
            name="${e.name}"
            accept="${e.accept}"
            ${f(e.multiple?"multiple":"")}
            ${f(e.disabled?"disabled":"")}
            ${f(e.required?"required":"")}
            tabindex="-1"
            aria-hidden="true"
          />
        </div>
        ${f(e.error||e.helper?`<div class="${r?"error":"helper"}">${Oe(e.error||e.helper)}</div>`:"")}
      `},events:{"click .btn":(e,t)=>{t.refs.input?.click()},"change input[type='file']":(e,t)=>{let r=e.target,n=Array.from(r.files??[]);t.setState("files",n);let o=t.host;if(o.internals)if(n.length===0)o.internals.setFormValue(null);else if(n.length===1)o.internals.setFormValue(n[0]);else{let a=new FormData,s=o.name;for(let i of n)a.append(s,i);o.internals.setFormValue(a)}t.emit("tc-files",{files:n})}},formResetCallback(){let t=this.shadowRoot?.querySelector(".native");t&&(t.value=""),this.setState("files",[])}}));function Oe(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Cr="tc-radio-group";var zr=`
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
`;y(Cr,b({formAssociated:!0,props:{value:{type:"string",default:""},name:{type:"string",default:""},options:{type:"json",default:[]},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},layout:{type:"string",default:"vertical"},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0}},theme:{"tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-radio-accent":"var(--tc-color-accent, #a16939)"},styles:{display:"block"},stylesheet:zr,template:({props:e})=>{let t=e.options??[],r=!!e.error,n=String(e.layout??"vertical");return v`
        <fieldset class="group" ${f(e.disabled?"disabled":"")}>
          ${f(e.label?`<legend class="legend">${ye(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</legend>`:"")}
          <div class="opts l-${n}" role="radiogroup" aria-invalid="${r?"true":"false"}">
            ${f(t.map((o,a)=>`<label class="opt ${o.disabled?"is-disabled":""}">
                  <input
                    type="radio"
                    class="r"
                    name="${ye(e.name)||`__rg_${a}__`}"
                    value="${ye(o.value)}"
                    ${o.value===e.value?"checked":""}
                    ${o.disabled||e.disabled?"disabled":""}
                  />
                  <span>${ye(o.label)}</span>
                </label>`).join(""))}
          </div>
        </fieldset>
        ${f(e.error||e.helper?`<div class="${r?"error":"helper"}">${ye(e.error||e.helper)}</div>`:"")}
      `},events:{"change input.r":(e,t)=>{let r=e.target.value,n=t.host;n.value=r,n.internals?.setFormValue(r),t.emit("tc-change",{value:r})}},afterMount(){let e=this;e.value&&e.internals?.setFormValue(e.value)},formResetCallback(){this.value=""}}));function ye(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Ar="tc-table";var Rr=`
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
`,Pe=new WeakMap;y(Ar,b({props:{rows:{type:"json",default:[]},columns:{type:"json",default:[]},pageSize:{type:"number",default:10},filterable:{type:"boolean",default:!0},emptyText:{type:"string",default:"No results."},rowKey:{type:"string",default:"id"}},theme:{"tc-table-surface":"var(--tc-color-surface, #ffffff)","tc-table-ink":"var(--tc-color-ink, #14171f)","tc-table-soft":"var(--tc-color-ink-soft, #5a6072)","tc-table-rule":"var(--tc-color-rule, #ece5d3)","tc-table-head-bg":"var(--tc-color-surface-alt, #faf8f3)","tc-table-row-hover":"rgba(161, 105, 57, 0.05)","tc-table-accent":"var(--tc-color-accent, #a16939)","tc-table-radius":"var(--tc-radius-lg, 10px)","tc-table-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},children:[b({tag:"style",template:Rr}),b({if:({props:e})=>!!e.filterable,tag:"input",className:"filter",attributes:{placeholder:"Search...",type:"text"}}),b({tag:"div",className:"wrap",children:[b({tag:"table",children:[b({tag:"thead",template:({props:e,state:t})=>{let r=e.columns??[],n=t,o=r.map(a=>{let s=n.sortKey===a.key,i=a.sortable!==!1,l=s?n.sortDir==="asc"?"\u25B2":"\u25BC":"",d=s?n.sortDir==="asc"?"ascending":"descending":"none";return`<th
                        data-col="${gt(a.key)}"
                        class="${i?"sortable":""}"
                        aria-sort="${d}"
                      >${gt(a.label)}<span class="sort">${l}</span></th>`}).join("");return v`
                    <tr>${f(o)}</tr>
                  `}}),b({tag:"tbody",children:[b({tag:"tr",className:"empty",if:({props:e,state:t})=>ft(e,t).length===0,template:({props:e})=>{let r=(e.columns??[]).length||1;return v`
                        <td colspan="${r}">${e.emptyText}</td>
                      `}})],for:{items:({props:e,state:t})=>ft(e,t),key:(e,t)=>e["id"]??t,render:(e,t,r)=>{let o=r.props.columns??[],a=e;return b({tag:"tr",attributes:{"data-row-id":String(a.id??t)},template:o.map(s=>{let i=typeof s.render=="function"?f(s.render(a)):a[s.key]??"";return v`
                          <td>${i}</td>
                        `.value}).join("")})}}})]})]}),b({tag:"footer",className:"pager",template:({props:e,state:t})=>{let r=t,n=Te(e,r),o=e.pageSize??10,a=Math.max(1,Math.ceil(n.length/o)),s=Math.min(r.page??0,a-1),i=(e.rows??[]).length;return v`
            <span class="count">${n.length} of ${i} rows</span>
            <span class="spacer"></span>
            <button class="prev" type="button" ${f(s<=0?"disabled":"")}>‹ prev</button>
            <span class="page">page ${s+1} of ${a}</span>
            <button class="next" type="button" ${f(s>=a-1?"disabled":"")}>next ›</button>
          `}})],refs:{filter:".filter"},afterRender(){let e=this,t=e.refs.filter;if(!t)return;let r=e.getState("q")??"";t.value!==r&&(t.value=r);let n=Pe.get(e);if(n){Pe.delete(e),t.focus();let o=Math.min(n.caret,t.value.length);try{t.setSelectionRange(o,o)}catch{}}},events:{"input .filter":(e,t)=>{let r=e.target;Pe.set(t.host,{caret:r.selectionStart??r.value.length}),t.setState("q",r.value),t.setState("page",0)},"click .prev":(e,t)=>{let r=(t.state.page??0)-1;t.setState("page",Math.max(0,r))},"click .next":(e,t)=>{let r=t.state,n=Te(t.props,r).length,o=t.props.pageSize??10,a=Math.max(0,Math.ceil(n/o)-1),s=(r.page??0)+1;t.setState("page",Math.min(a,s))},"click th.sortable":(e,t)=>{let r=e.target.closest("th");if(!r)return;let n=r.dataset.col;if(!n)return;let o=t.state,a;o.sortKey!==n?a="asc":a=o.sortDir==="asc"?"desc":o.sortDir==="desc"?null:"asc",t.setState("sortKey",a?n:null),t.setState("sortDir",a),t.emit("tc-sort-change",{key:a?n:null,direction:a})},"click tr[data-row-id]":(e,t)=>{let r=e.target.closest("tr[data-row-id]");if(!r)return;let n=r.dataset.rowId;if(n===void 0)return;let o=Te(t.props,t.state),a=o.find(s=>String(s.id)===n)??o[Number(n)];a&&t.emit("tc-row-click",{row:a})}}}));function Te(e,t){let r=e.rows??[],n=e.columns??[],o=(t.q??"").trim().toLowerCase(),a=o.length===0?r.slice():r.filter(s=>n.some(i=>String(s[i.key]??"").toLowerCase().includes(o)));if(t.sortKey&&t.sortDir){let s=t.sortKey,i=t.sortDir==="asc"?1:-1;a=a.slice().sort((l,d)=>{let g=l[s],m=d[s];return g===m?0:g==null?1:m==null?-1:typeof g=="number"&&typeof m=="number"?(g-m)*i:String(g).localeCompare(String(m))*i})}return a}function ft(e,t){let r=e.pageSize??10,n=Te(e,t),o=Math.max(1,Math.ceil(n.length/r)),a=Math.min(t.page??0,o-1);return n.slice(a*r,a*r+r)}function gt(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Nr="tc-tabs";var Ir=`
          .strip {
            display: flex; gap: 4px;
            border-bottom: 1px solid var(--tc-tabs-rule);
            margin-bottom: 16px;
            /* Scroll the strip on narrow screens instead of clipping the
               last tab. Scrollbar hidden \u2014 it stays swipe/trackpad-scrollable. */
            overflow-x: auto;
            scrollbar-width: none;
          }
          .strip::-webkit-scrollbar { display: none; }
          .tab {
            font: inherit; font-size: 0.92rem; font-weight: 500;
            background: transparent; border: none; cursor: pointer;
            padding: 10px 16px; margin-bottom: -1px;
            color: var(--tc-tabs-fg-muted);
            border-bottom: 2px solid transparent;
            transition: color 0.15s ease, border-color 0.15s ease;
            /* Keep each tab its natural width so the strip scrolls rather
               than squeezing tabs until the last one clips. */
            flex: 0 0 auto;
            white-space: nowrap;
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
`;y(Nr,b({props:{tabs:{type:"json",default:[]},active:{type:"string",default:"",reflect:!0}},theme:{"tc-tabs-fg":"var(--tc-color-ink, #14171f)","tc-tabs-fg-muted":"var(--tc-color-ink-muted, #6b7280)","tc-tabs-rule":"var(--tc-color-rule, #ece5d3)","tc-tabs-accent":"var(--tc-color-accent, #a16939)","tc-tabs-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block","font-family":"var(--tc-tabs-font)"},stylesheet:Ir,template:({props:e})=>{let t=e.tabs??[],r=e.active||t[0]?.id||"";return v`
        <div role="tablist" class="strip">
          ${f(t.map(n=>`<button
              role="tab"
              type="button"
              class="tab ${n.id===r?"active":""}"
              data-tab="${xe(n.id)}"
              aria-selected="${n.id===r?"true":"false"}"
              aria-controls="panel-${xe(n.id)}"
              tabindex="${n.id===r?"0":"-1"}"
            >${xe(n.label)}</button>`).join(""))}
        </div>
        <div class="panels">
          ${f(t.map(n=>`<section
              role="tabpanel"
              id="panel-${xe(n.id)}"
              class="panel"
              aria-labelledby=""
              ${n.id===r?"":"hidden"}
            ><slot name="${xe(n.id)}"></slot></section>`).join(""))}
        </div>
      `},events:{"click .tab":(e,t)=>{let r=e.target.closest(".tab");if(!r)return;let n=r.dataset.tab;if(!n)return;let o=t.host,a=o.active;a!==n&&(o.active=n,t.emit("tc-tab-change",{active:n,previous:a}))},"keydown .tab":(e,t)=>{let r=e,n=t.props.tabs??[];if(n.length===0)return;let o=t.host,a=o.active||n[0].id,s=n.findIndex(d=>d.id===a),i=s;if(r.key==="ArrowRight")i=(s+1)%n.length;else if(r.key==="ArrowLeft")i=(s-1+n.length)%n.length;else if(r.key==="Home")i=0;else if(r.key==="End")i=n.length-1;else return;r.preventDefault();let l=n[i].id;o.active=l,t.emit("tc-tab-change",{active:l,previous:a}),queueMicrotask(()=>{t.host.shadowRoot?.querySelector(`.tab[data-tab="${l}"]`)?.focus()})}}}));function xe(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Dr="tc-modal";var ce=new WeakMap;y(Dr,b({props:{open:{type:"boolean",default:!1,reflect:!0},title:{type:"string",default:""},dismissible:{type:"boolean",default:!0},width:{type:"string",default:"min(560px, 92vw)"}},theme:{"tc-modal-surface":"var(--tc-color-surface, #ffffff)","tc-modal-ink":"var(--tc-color-ink, #14171f)","tc-modal-rule":"var(--tc-color-rule, #ece5d3)","tc-modal-soft":"var(--tc-color-ink-soft, #5a6072)","tc-modal-radius":"var(--tc-radius-lg, 12px)","tc-modal-backdrop":"rgba(20, 23, 31, 0.5)","tc-modal-shadow":"var(--tc-shadow-lg, 0 24px 60px rgba(20, 23, 31, 0.25))","tc-modal-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"contents"},template:({props:e})=>v`
        <dialog class="dlg" aria-labelledby="${e.title?"title":""}">
          ${f(e.title||e.dismissible?`<header class="head">
              ${e.title?`<h2 id="title" class="title">${ht(e.title)}</h2>`:"<span></span>"}
              ${e.dismissible?'<button class="x" type="button" aria-label="Close">\xD7</button>':""}
            </header>`:"")}
          <div class="body"><slot></slot></div>
          <footer class="foot"><slot name="footer"></slot></footer>
        </dialog>
        <style>
        .dlg {
          width: ${ht(e.width)};
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
      `,refs:{dialog:".dlg"},events:{"click .x":(e,t)=>{mt(t.host,"button")},"click .dlg":(e,t)=>{let r=t.host;if(!r.dismissible)return;let n=t.refs.dialog;n&&e.target===n&&mt(r,"backdrop")}},afterRender(){jr(this)},unmount(){let e=ce.get(this);e&&(e.cleanup(),ce.delete(this))}}));function jr(e){let t=e.shadowRoot;if(!t)return;let r=t.querySelector(".dlg");if(!r)return;let n=e.open,o=ce.get(e);if(o&&o.dialog!==r&&(o.cleanup(),ce.delete(e)),n&&!r.open){if(typeof r.showModal=="function")try{r.showModal()}catch{r.setAttribute("open","")}else r.setAttribute("open","");if(!ce.has(e)){let a=()=>{let s=e;s.open&&(s.open=!1,e.dispatchEvent(new CustomEvent("tc-close",{detail:{reason:"escape"},bubbles:!0,composed:!0})))};r.addEventListener("close",a),ce.set(e,{dialog:r,cleanup:()=>r.removeEventListener("close",a)})}}else if(!n&&r.open)try{r.close()}catch{r.removeAttribute("open")}}function mt(e,t){e.open&&(e.open=!1,e.dispatchEvent(new CustomEvent("tc-close",{detail:{reason:t},bubbles:!0,composed:!0})))}function ht(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var qr="tc-toast";var ke=new WeakMap,Br=`
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
`;y(qr,b({props:{open:{type:"boolean",default:!1,reflect:!0},variant:{type:"string",default:"info"},message:{type:"string",default:""},duration:{type:"number",default:4e3},dismissible:{type:"boolean",default:!0}},theme:{"tc-toast-info":"var(--tc-color-info, #3a5b8c)","tc-toast-success":"var(--tc-color-success, #207a5b)","tc-toast-warning":"var(--tc-color-warning, #a87326)","tc-toast-error":"var(--tc-color-danger, #b3261e)","tc-toast-fg":"var(--tc-color-surface, #ffffff)","tc-toast-radius":"var(--tc-radius-lg, 10px)","tc-toast-shadow":"var(--tc-shadow-lg, 0 12px 30px rgba(20, 23, 31, 0.18))","tc-toast-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},stylesheet:Br,template:({props:e})=>{let t=String(e.variant??"info"),r=t==="success"?"\u2713":t==="warning"?"!":t==="error"?"\u2715":"i";return v`
        <div class="toast v-${t} ${e.open?"open":"closed"}" role="status" aria-live="polite">
          <span class="icon" aria-hidden="true">${f(r)}</span>
          <span class="msg">${f(e.message?_r(e.message):"<slot></slot>")}</span>
          ${f(e.dismissible?'<button type="button" class="x" aria-label="Close">\xD7</button>':"")}
        </div>
      `},events:{"click .x":(e,t)=>bt(t.host,"button")},afterMount(){Fr(this)},unmount(){let e=ke.get(this);e!==void 0&&(clearTimeout(e),ke.delete(this))}}));function Fr(e){let t=e,r=ke.get(e);if(r!==void 0&&clearTimeout(r),ke.delete(e),!t.open||!t.duration||t.duration<=0)return;let n=setTimeout(()=>{t.open&&bt(e,"timeout")},t.duration);ke.set(e,n)}function bt(e,t){let r=e;r.open&&(r.open=!1,e.dispatchEvent(new CustomEvent("tc-toast-close",{detail:{reason:t},bubbles:!0,composed:!0})))}function _r(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Or="tc-stat";var Pr=`
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
`;y(Or,b({props:{label:{type:"string",default:""},value:{type:"string",default:""},delta:{type:"string",default:""},trend:{type:"string",default:"neutral"},prefix:{type:"string",default:""},suffix:{type:"string",default:""}},theme:{"tc-stat-surface":"var(--tc-color-surface, #ffffff)","tc-stat-rule":"var(--tc-color-rule, #ece5d3)","tc-stat-label":"var(--tc-color-ink-muted, #6b7280)","tc-stat-value":"var(--tc-color-ink, #14171f)","tc-stat-up":"var(--tc-color-success, #207a5b)","tc-stat-down":"var(--tc-color-danger, #b3261e)","tc-stat-neutral":"var(--tc-color-ink-muted, #6b7280)","tc-stat-radius":"var(--tc-radius-lg, 12px)","tc-stat-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block",height:"100%"},stylesheet:Pr,template:({props:e})=>{let t=String(e.trend??"neutral"),r=t==="up"?"\u25B2":t==="down"?"\u25BC":"\u2022";return v`
        <div class="card">
          ${e.label?f(`<div class="label">${we(e.label)}</div>`):""}
          <div class="value">
            ${e.prefix?f(`<span class="prefix">${we(e.prefix)}</span>`):""}
            <span class="num">${e.value}</span>
            ${e.suffix?f(`<span class="suffix">${we(e.suffix)}</span>`):""}
          </div>
          ${e.delta?f(`<div class="delta t-${we(t)}">
                  <span class="arrow" aria-hidden="true">${r}</span>
                  <span>${we(e.delta)}</span>
                </div>`):""}
        </div>
      `}}));function we(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Vr="tc-card";var Yr=`
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
`;y(Vr,b({props:{title:{type:"string",default:""},subtitle:{type:"string",default:""},padded:{type:"boolean",default:!0},bordered:{type:"boolean",default:!0},elevated:{type:"boolean",default:!1},size:{type:"string",default:"md"}},theme:{"tc-card-surface":"var(--tc-color-surface, #ffffff)","tc-card-ink":"var(--tc-color-ink, #14171f)","tc-card-soft":"var(--tc-color-ink-soft, #5a6072)","tc-card-rule":"var(--tc-color-rule, #ece5d3)","tc-card-radius":"var(--tc-radius-lg, 12px)","tc-card-shadow":"var(--tc-shadow-md, 0 8px 24px rgba(20, 23, 31, 0.06))","tc-card-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-card-padding-x":"var(--tc-space-5, 20px)","tc-card-padding-y":"var(--tc-space-5, 20px)","tc-card-gap":"var(--tc-space-3, 12px)"},styles:{display:"block"},stylesheet:Yr,template:({props:e})=>{let t=!!e.title||!!e.subtitle,r=String(e.size??"md").toLowerCase(),o=["card",`size-${["sm","md","lg"].includes(r)?r:"md"}`,e.bordered?"bordered":"",e.elevated?"elevated":"",e.padded===!1?"nopad":"",t?"has-header":""].filter(Boolean).join(" ");return v`
        <div class="${o}">
          <div class="media"><slot name="media"></slot></div>
          <div class="head">
            <slot name="header">
              ${e.title?v`
                  <div class="title">${e.title}</div>
                `:""} ${e.subtitle?v`
                  <div class="subtitle">${e.subtitle}</div>
                `:""}
            </slot>
          </div>
          <div class="body"><slot></slot></div>
          <div class="foot"><slot name="footer"></slot></div>
        </div>
      `},afterMount(){let e=this,t=e.shadowRoot;if(!t)return;let r=t.querySelector(".card");if(!r)return;let n=s=>{let i=`slot[name="${s}"]`,l=t.querySelector(i);return l?l.assignedNodes().some(d=>d.nodeType===Node.ELEMENT_NODE||d.nodeType===Node.TEXT_NODE&&(d.textContent??"").trim()!==""):!1},o=()=>{r.classList.toggle("has-header-slot",n("header")),r.classList.toggle("has-footer",n("footer")),r.classList.toggle("has-media",n("media"))};o();let a=Array.from(t.querySelectorAll("slot"));for(let s of a)s.addEventListener("slotchange",o);e._cardCleanup=()=>{for(let s of a)s.removeEventListener("slotchange",o)}},unmount(){this._cardCleanup?.()}}));var Gr="tc-badge";var Kr=`
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
`;y(Gr,b({props:{variant:{type:"string",default:"neutral"},size:{type:"string",default:"md"},pill:{type:"boolean",default:!1}},theme:{"tc-badge-radius":"var(--tc-radius-sm, 6px)","tc-badge-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-badge-neutral-bg":"var(--tc-color-rule, #ece5d3)","tc-badge-neutral-fg":"var(--tc-color-ink, #14171f)","tc-badge-info-bg":"var(--tc-color-info-bg, #dde6f4)","tc-badge-info-fg":"var(--tc-color-info-fg, #1f3a66)","tc-badge-success-bg":"var(--tc-color-success-bg, #dbece2)","tc-badge-success-fg":"var(--tc-color-success-fg, #155b40)","tc-badge-warning-bg":"var(--tc-color-warning-bg, #f5e7cf)","tc-badge-warning-fg":"var(--tc-color-warning-fg, #7a4f0a)","tc-badge-danger-bg":"var(--tc-color-danger-bg, #f4dad7)","tc-badge-danger-fg":"var(--tc-color-danger-fg, #7a1a14)"},styles:{display:"inline-block"},stylesheet:Kr,template:({props:e})=>v`
        <span class="badge v-${e.variant} s-${e.size} ${e.pill?"pill":""}">
          <slot></slot>
        </span>
      `}));var Ur="tc-skeleton";var Wr=`
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
`;y(Ur,b({props:{width:{type:"string",default:"100%"},height:{type:"string",default:"1em"},rounded:{type:"boolean",default:!1},pulse:{type:"boolean",default:!0}},theme:{"tc-skeleton-base":"var(--tc-color-rule, #ece5d3)","tc-skeleton-shine":"rgba(255, 255, 255, 0.6)","tc-skeleton-radius":"var(--tc-radius-md, 6px)"},styles:{display:"inline-block","vertical-align":"middle"},stylesheet:Wr,template:({props:e})=>v`
        <span
          class="bone ${e.pulse?"pulse":""} ${e.rounded?"round":""}"
          aria-hidden="true"
          style="width: ${e.width}; height: ${e.height};"
        ></span>
      `}));var Xr="tc-stack";var Zr=`
  .stack {
    display: flex;
    flex-direction: column;
    gap: var(--tc-stack-gap);
    align-items: var(--tc-stack-align);
  }
`;y(Xr,b({props:{gap:{type:"string",default:"4"},align:{type:"string",default:"stretch"}},styles:{display:"block"},stylesheet:Zr,template:({props:e})=>v`
        <div
          class="stack"
          style="--tc-stack-gap: ${Jr(e.gap)}; --tc-stack-align: ${e.align};"
        >
          <slot></slot>
        </div>
      `}));function Jr(e){let t=String(e??"4").trim();return/^[1-8]$/.test(t)?`var(--tc-space-${t}, ${Qr(t)})`:t}function Qr(e){return{1:"4px",2:"8px",3:"12px",4:"16px",5:"24px",6:"32px",7:"48px",8:"64px"}[e]??"16px"}var en="tc-cluster";var tn=`
  .cluster {
    display: flex;
    flex-direction: row;
    gap: var(--tc-cluster-gap);
    justify-content: var(--tc-cluster-justify);
    align-items: var(--tc-cluster-align);
    flex-wrap: var(--tc-cluster-wrap);
  }
`;y(en,b({props:{gap:{type:"string",default:"3"},justify:{type:"string",default:"start"},align:{type:"string",default:"center"},wrap:{type:"boolean",default:!0}},styles:{display:"block"},stylesheet:tn,template:({props:e})=>v`
        <div
          class="cluster"
          style="--tc-cluster-gap: ${nn(e.gap)};
            --tc-cluster-justify: ${rn(e.justify)};
            --tc-cluster-align: ${e.align};
            --tc-cluster-wrap: ${e.wrap?"wrap":"nowrap"};"
          >
            <slot></slot>
          </div>
        `}));function rn(e){let t=String(e??"start").trim();switch(t){case"between":return"space-between";case"around":return"space-around";case"evenly":return"space-evenly";default:return t}}function nn(e){let t=String(e??"3").trim();return/^[1-8]$/.test(t)?`var(--tc-space-${t}, ${on(t)})`:t}function on(e){return{1:"4px",2:"8px",3:"12px",4:"16px",5:"24px",6:"32px",7:"48px",8:"64px"}[e]??"12px"}var an="tc-grid";var sn=`
  .grid {
    display: grid;
    grid-template-columns: var(--tc-grid-template);
    gap: var(--tc-grid-gap);
  }
`;y(an,b({props:{min:{type:"string",default:"260px"},gap:{type:"string",default:"4"},columns:{type:"string",default:""}},styles:{display:"block"},stylesheet:sn,template:({props:e})=>{let t=String(e.columns??"").trim(),r=t?`repeat(${he(t)}, minmax(0, 1fr))`:`repeat(auto-fit, minmax(${he(e.min)}, 1fr))`;return v`
        <div
          class="grid"
          style="--tc-grid-template: ${f(r)};
            --tc-grid-gap: ${ln(e.gap)};"
          >
            <slot></slot>
          </div>
        `}}));function ln(e){let t=String(e??"4").trim();return/^[1-8]$/.test(t)?`var(--tc-space-${t}, ${cn(t)})`:t}function cn(e){return{1:"4px",2:"8px",3:"12px",4:"16px",5:"24px",6:"32px",7:"48px",8:"64px"}[e]??"16px"}var dn="tc-code";var un='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',pn='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',fn=`
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
`;y(dn,b({props:{language:{type:"string",default:""},copy:{type:"boolean",default:!1},filename:{type:"string",default:""}},theme:{"tc-code-bg":"var(--tc-code-bg-base, #14171f)","tc-code-ink":"var(--tc-code-ink-base, #efe6d4)","tc-code-rule":"var(--tc-code-rule-base, rgba(255,255,255,0.08))","tc-code-label":"var(--tc-code-label-base, #8a8678)","tc-code-radius":"var(--tc-radius-md, 10px)","tc-code-font":"var(--tc-font-mono, 'JetBrains Mono', ui-monospace, monospace)","tc-code-padding":"var(--tc-space-5, 20px) var(--tc-space-5, 20px)","tc-code-kw":"var(--tc-code-kw-base, #f0a878)","tc-code-str":"var(--tc-code-str-base, #d9b380)","tc-code-com":"var(--tc-code-com-base, #8a8678)","tc-code-num":"var(--tc-code-num-base, #c4d3b8)","tc-code-tag":"var(--tc-code-tag-base, #d49a68)"},styles:{display:"block"},stylesheet:fn,template:({props:e,state:t})=>{let r=e.filename||e.language||"",n=t.copied===!0;return v`
        <div class="block">
          ${r||e.copy?f(`
            <header class="bar">
              <span class="label">${gn(r)}</span>
              ${e.copy?`<button type="button" class="copy" aria-label="Copy code">
                    <span class="copy-icon" aria-hidden="true">${n?pn:un}</span>
                    <span class="copy-text">${n?"Copied":"Copy"}</span>
                  </button>`:""}
            </header>
          `):""}
          <pre><code class="code lang-${String(e.language||"txt")}"><slot></slot></code></pre>
        </div>
      `},events:{"click .copy":(e,t)=>{let r=t.host,n=r.shadowRoot?.querySelector("slot"),a=(n?n.assignedNodes({flatten:!0}):Array.from(r.childNodes)).map(i=>i.textContent??"").join(""),s=()=>{t.setState("copied",!0),t.emit("tc-copy",{text:a}),setTimeout(()=>t.setState("copied",!1),1600)};navigator.clipboard?.writeText?navigator.clipboard.writeText(a).then(s,s):s()}}}));function gn(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var mn="tc-callout";var vt={note:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',info:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',success:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',warning:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',danger:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>'},hn=`
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
`;y(mn,b({props:{variant:{type:"string",default:"note"},title:{type:"string",default:""},compact:{type:"boolean",default:!1}},theme:{"tc-callout-radius":"var(--tc-radius-md, 8px)","tc-callout-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif)","tc-callout-note-bg":"var(--tc-color-surface-alt, #faf8f3)","tc-callout-note-fg":"var(--tc-color-ink-soft, #4a5061)","tc-callout-note-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-callout-info-bg":"var(--tc-color-info-bg, #dde6f4)","tc-callout-info-fg":"var(--tc-color-info-fg, #1f3a66)","tc-callout-info-border":"var(--tc-color-info, #3a5b8c)","tc-callout-success-bg":"var(--tc-color-success-bg, #dbece2)","tc-callout-success-fg":"var(--tc-color-success-fg, #155b40)","tc-callout-success-border":"var(--tc-color-success, #207a5b)","tc-callout-warning-bg":"var(--tc-color-warning-bg, #f5e7cf)","tc-callout-warning-fg":"var(--tc-color-warning-fg, #7a4f0a)","tc-callout-warning-border":"var(--tc-color-warning, #a87326)","tc-callout-danger-bg":"var(--tc-color-danger-bg, #f4dad7)","tc-callout-danger-fg":"var(--tc-color-danger-fg, #7a1a14)","tc-callout-danger-border":"var(--tc-color-danger, #b3261e)"},styles:{display:"block"},stylesheet:hn,template:({props:e})=>{let t=String(e.variant??"note"),r=vt[t]??vt.note;return v`
        <aside
          class="callout v-${t} ${e.compact?"compact":""}"
          role="${t==="danger"?"alert":"note"}"
        >
          <span class="icon" aria-hidden="true">${f(r)}</span>
          <div class="body">
            ${e.title?v`
                <div class="title">${e.title}</div>
              `:""}
            <div class="content"><slot></slot></div>
          </div>
        </aside>
      `}}));var bn="tc-toc";var He=new WeakMap,vn=`
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
`;y(bn,b({props:{target:{type:"string",default:"main"},levels:{type:"string",default:"h2,h3"},sticky:{type:"boolean",default:!0},label:{type:"string",default:"On this page"}},theme:{"tc-toc-fg":"var(--tc-color-ink, #14171f)","tc-toc-fg-muted":"var(--tc-color-ink-muted, #6b7280)","tc-toc-active":"var(--tc-color-accent, #a16939)","tc-toc-rule":"var(--tc-color-rule, #ece5d3)","tc-toc-label":"var(--tc-color-ink-soft, #4a5061)","tc-toc-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif)","tc-toc-top":"80px"},styles:{display:"block"},stylesheet:vn,template:({props:e,state:t})=>{let r=t.items??[],n=t.activeId??"";return v`
        <nav
          class="toc${e.sticky?" sticky":""}"
          aria-label="Table of contents"
        >
          ${e.label?v`
              <div class="label">${e.label}</div>
            `:""} ${r.length===0?f('<p class="empty">No sections yet.</p>'):f(`<ol class="list">${r.map(o=>`<li class="lvl-${o.level}${o.id===n?" active":""}"><a href="#${yt(o.id)}">${yt(o.text)}</a></li>`).join("")}</ol>`)}
        </nav>
      `},afterMount(){yn(this)},unmount(){He.get(this)?.observer?.disconnect(),He.delete(this)}}));function yn(e){He.get(e)?.observer?.disconnect();let r=e,n=r.target||"main",o=(r.levels||"h2,h3").split(",").map(d=>d.trim().toLowerCase()).filter(Boolean),a=document.querySelector(n);if(!a)return;let s=Array.from(a.querySelectorAll(o.join(","))).filter(d=>d instanceof HTMLElement),i=s.map(d=>(d.id||(d.id=xn(d.textContent??"")),{id:d.id,level:parseInt(d.tagName.slice(1),10),text:(d.textContent??"").trim()}));if(e.setState("items",i),typeof IntersectionObserver>"u")return;let l=new IntersectionObserver(d=>{let m=d.filter(u=>u.isIntersecting).sort((u,p)=>u.boundingClientRect.top-p.boundingClientRect.top)[0];if(!m)return;let c=m.target.id;c&&e.setState("activeId",c)},{rootMargin:"0px 0px -70% 0px",threshold:0});for(let d of s)l.observe(d);He.set(e,{observer:l,activeId:""})}function xn(e){return e.toLowerCase().trim().replace(/[^\w\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-")||"section"}function yt(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var kn="tc-pagination";var wn=`
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
`;y(kn,b({props:{current:{type:"number",default:1},total:{type:"number",default:1},siblings:{type:"number",default:1},boundaries:{type:"number",default:1},size:{type:"string",default:"sm"},"prev-label":{type:"string",default:"Prev"},"next-label":{type:"string",default:"Next"},label:{type:"string",default:"Pagination"}},styles:{display:"block"},stylesheet:wn,template:({props:e})=>{let t=Math.max(1,Number(e.total)|0),r=$n(Number(e.current)|0,1,t),n=Math.max(0,Number(e.siblings)|0),o=Math.max(0,Number(e.boundaries)|0);if(t<=1)return"";let a=En(r,t,n,o),s=Mn(String(e.size??"sm")),i=r<=1?" disabled":"",l=r>=t?" disabled":"",d=a.map(g=>{if(g==="\u2026")return'<span class="ellipsis" aria-hidden="true">\u2026</span>';let m=g===r;return`<tc-button
            class="num"
            size="${s}"
            variant="${m?"primary":"ghost"}"
            data-page="${g}"${m?' aria-current="page"':""}
          >${g}</tc-button>`}).join("");return v`
        <nav aria-label="${String(e.label??"Pagination")}">
          <tc-button
            class="prev"
            size="${f(s)}"
            variant="ghost"
            data-page="${r-1}"
            ${f(i)}
          >← ${String(e["prev-label"]??"Prev")}</tc-button>
          <span class="pages">${f(d)}</span>
          <tc-button
            class="next"
            size="${f(s)}"
            variant="ghost"
            data-page="${r+1}"
            ${f(l)}
          >${String(e["next-label"]??"Next")} →</tc-button>
        </nav>
      `},events:{"click tc-button":(e,t)=>{let r=e.target.closest("tc-button");if(!r||r.hasAttribute("disabled"))return;let n=r.getAttribute("data-page");if(n==null)return;let o=Number(n),a=t.host,s=Math.max(1,Number(a.total)|0),i=Number(a.current)|0;!Number.isFinite(o)||o<1||o>s||o!==i&&t.emit("tc-page-change",{page:o})}}}));function $n(e,t,r){return Math.min(r,Math.max(t,e))}function En(e,t,r,n){let o=new Set;for(let i=1;i<=Math.min(n,t);i++)o.add(i);for(let i=Math.max(1,t-n+1);i<=t;i++)o.add(i);for(let i=Math.max(1,e-r);i<=Math.min(t,e+r);i++)o.add(i);let a=[...o].sort((i,l)=>i-l),s=[];for(let i=0;i<a.length;i++)i>0&&a[i]-a[i-1]>1&&s.push("\u2026"),s.push(a[i]);return s}function Mn(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Sn="tc-combobox";function $e(e){if(Array.isArray(e))return e.map(r=>String(r)).filter(Boolean);let t=String(e??"").trim();return t?t.split(",").map(r=>r.trim()).filter(Boolean):[]}function Ee(e){return e.join(",")}function Ln(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}var Tn=`
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
`;y(Sn,b({formAssociated:!0,props:{value:{type:"string",default:""},name:{type:"string",default:""},options:{type:"json",default:[]},multiple:{type:"boolean",default:!1},searchable:{type:"boolean",default:!0},placeholder:{type:"string",default:""},"empty-text":{type:"string",default:"No results"},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0},max:{type:"number",default:0}},theme:{"tc-input-bg":"var(--tc-color-surface, #ffffff)","tc-input-fg":"var(--tc-color-ink, #14171f)","tc-input-border":"var(--tc-color-rule-strong, #d9cfb8)","tc-input-border-focus":"var(--tc-color-accent, #a16939)","tc-input-error":"var(--tc-color-danger, #b3261e)","tc-input-helper":"var(--tc-color-ink-muted, #6b7280)","tc-input-radius":"var(--tc-radius-md, 8px)","tc-input-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-combobox-chip-bg":"var(--tc-color-accent-soft, #efe2cf)","tc-combobox-chip-fg":"var(--tc-color-accent-hover, #8a572d)","tc-combobox-popup-bg":"var(--tc-color-surface, #ffffff)","tc-combobox-popup-hover":"var(--tc-color-accent-soft, #efe2cf)","tc-combobox-popup-active":"var(--tc-color-accent-soft, #efe2cf)"},styles:{display:"block"},stylesheet:Tn,refs:{search:".search",popup:".popup"},template:({props:e,state:t})=>{let r=e.options??[],n=!!e.multiple,o=e.searchable!==!1,a=!!e.disabled,s=!!e.error,i=$e(e.value),l=String(t.query??""),d=!!t.open&&!a,g=Number(t.focusedIndex??-1),m=xt(r,l),c=new Set(i),u=i.map(T=>r.find(D=>D.value===T)).filter(T=>!!T),p=o&&(d||n&&i.length===0),h=!n&&i.length===1&&(!d||!o),x=i.length===0&&!p&&!h,E=n?u.map(T=>`<span class="chip" data-value="${Y(T.value)}">
              ${T.icon?`<span class="chip-icon">${Y(T.icon)}</span>`:""}
              <span class="chip-label">${Y(T.label)}</span>
              <button
                type="button"
                class="chip-remove"
                data-remove="${Y(T.value)}"
                aria-label="Remove ${Y(T.label)}"
                ${a?"disabled":""}
              >&times;</button>
            </span>`).join(""):"",$=h&&u[0]?`<span class="single">
            ${u[0].icon?`<span class="single-icon">${Y(u[0].icon)}</span>`:""}
            <span class="single-label">${Y(u[0].label)}</span>
          </span>`:"",S=x?`<span class="placeholder">${Y(e.placeholder??"")}</span>`:"",H=p?`<input
            type="text"
            class="search"
            part="search"
            value="${Y(l)}"
            placeholder="${Y(i.length===0?e.placeholder??"":"")}"
            ${a?"disabled":""}
            autocomplete="off"
            aria-autocomplete="list"
            aria-expanded="${d?"true":"false"}"
            role="combobox"
          />`:"",z=m.length===0?`<div class="empty">${Y(e["empty-text"]??"No results")}</div>`:m.map((T,D)=>{let N=c.has(T.value);return`<div
              class="${["option",N?"selected":"",D===g?"focused":"",T.disabled?"disabled":""].filter(Boolean).join(" ")}"
              role="option"
              data-value="${Y(T.value)}"
              data-index="${D}"
              aria-selected="${N?"true":"false"}"
              ${T.disabled?'aria-disabled="true"':""}
            >
              ${n?`<span class="check" aria-hidden="true">${N?"\u2713":""}</span>`:""}
              ${T.icon?`<span class="opt-icon">${Y(T.icon)}</span>`:""}
              <span class="opt-label">${Y(T.label)}</span>
            </div>`}).join(""),C=e.label?`<label class="label">${Y(e.label)}${e.required?' <span class="req" aria-hidden="true">*</span>':""}</label>`:"",W=s?`<div class="helper error">${Y(e.error)}</div>`:e.helper?`<div class="helper">${Y(e.helper)}</div>`:"";return v`
        ${f(C)}
        <div
          class="control ${s?"invalid":""} ${d?"open":""} ${a?"disabled":""}"
          part="control"
          tabindex="${a?"-1":"0"}"
          role="${o?"presentation":"combobox"}"
        >
          <div class="display">
            ${f(E)}${f($)}${f(S)}${f(H)}
          </div>
          <span class="caret" aria-hidden="true">▾</span>
        </div>
        <div
          class="popup"
          part="popup"
          role="listbox"
          ${f(n?'aria-multiselectable="true"':"")}
          ${d?"":"hidden"}
        >
          ${f(z)}
        </div>
        ${f(W)}
      `},events:{"click .control":(e,t)=>{if(e.target.closest(".chip-remove")||t.host.disabled)return;let o=!!t.getState("open");t.setState("open",!0),o||t.emit("tc-open"),t.refs.search?.focus()},"keydown .control":(e,t)=>{let r=e;if(r.key==="Enter"||r.key===" "){if(r.preventDefault(),t.host.disabled)return;t.setState("open",!0),t.emit("tc-open"),t.refs.search?.focus()}},"input .search":(e,t)=>{let r=e.target.value;t.setState("query",r),t.setState("open",!0),t.setState("focusedIndex",0),t.emit("tc-search",{query:r})},"keydown .search":(e,t)=>{let r=e,n=e.target,o=t.host,a=!!o.multiple,s=o.options??[],i=xt(s,String(t.getState("query")??""));if(r.key==="Backspace"&&n.value===""&&a){let l=$e(o.value);l.length>0&&(l.pop(),o.value=Ee(l),Ce(t,l,o),t.emit("tc-change",{value:l.slice()}),r.preventDefault());return}if(r.key==="ArrowDown"){r.preventDefault(),t.setState("open",!0);let l=Number(t.getState("focusedIndex")??-1),d=Math.min(i.length-1,l+1);t.setState("focusedIndex",d);return}if(r.key==="ArrowUp"){r.preventDefault();let l=Number(t.getState("focusedIndex")??0),d=Math.max(0,l-1);t.setState("focusedIndex",d);return}if(r.key==="Enter"){r.preventDefault();let l=Number(t.getState("focusedIndex")??-1);l>=0&&l<i.length&&kt(t,i[l],o);return}if(r.key==="Escape"){r.preventDefault(),t.setState("open",!1),t.setState("query",""),t.emit("tc-close");return}},"mousedown .option":(e,t)=>{e.preventDefault();let r=e.target.closest(".option");if(!r||r.classList.contains("disabled"))return;let n=r.dataset.value;if(n==null)return;let o=t.host,s=(o.options??[]).find(i=>i.value===n);s&&kt(t,s,o)},"click .chip-remove":(e,t)=>{e.stopPropagation();let n=e.target.dataset.remove;if(n==null)return;let o=t.host,a=$e(o.value).filter(s=>s!==n);o.value=Ee(a),Ce(t,a,o),t.emit("tc-change",{value:a.slice()})},"focusout .control":(e,t)=>{queueMicrotask(()=>{t.host.matches(":focus-within")||(t.setState("open",!1),t.setState("query",""),t.emit("tc-close"))})}},afterMount(){let e=this;if(!e.multiple||!e.internals)return;let t=$e(e.value),r=String(e.name??"");if(!r){e.internals.setFormValue(Ee(t));return}let n=new FormData;for(let o of t)n.append(r,o);e.internals.setFormValue(n)},afterRender(){let e=this;if(!(e.getState?!!e.getState("open"):!1))return;let r=e.refs?.search??null;if(!r||e.shadowRoot?.activeElement===r)return;r.focus();let o=r.value.length;try{r.setSelectionRange(o,o)}catch{}}}));function xt(e,t){if(!t)return e;let r=new RegExp(Ln(t),"i");return e.filter(n=>r.test(n.label)||r.test(n.value))}function kt(e,t,r){let n=!!r.multiple,o=Number(r.max??0),a=$e(r.value);if(n){let s;if(a.includes(t.value))s=a.filter(i=>i!==t.value);else{if(o>0&&a.length>=o)return;s=a.concat(t.value)}r.value=Ee(s),Ce(e,s,r),e.setState("query",""),e.emit("tc-change",{value:s.slice()}),queueMicrotask(()=>{e.refs.search?.focus()})}else r.value=t.value,Ce(e,[t.value],r),e.setState("query",""),e.setState("open",!1),e.emit("tc-change",{value:t.value}),e.emit("tc-close")}function Ce(e,t,r){let n=r.internals;if(!n)return;let o=String(r.name??"");if(!r.multiple){n.setFormValue(t[0]??"");return}if(!o){n.setFormValue(Ee(t));return}let a=new FormData;for(let s of t)a.append(o,s);n.setFormValue(a)}function Y(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Hn="tc-carousel";var Cn=`
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
`;function wt(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ze(e){let t=0;for(let r of Array.from(e.children))r instanceof Element&&!r.hasAttribute("slot")&&t++;return t}function Mt(e,t,r){return t<=0?0:r?(e%t+t)%t:Math.max(0,Math.min(t-1,e))}function ee(e,t){let r=ze(e);if(r===0)return;let n=e.value,o=Mt(t,r,e.loop);o!==n&&(e.value=o,e.dispatchEvent(new CustomEvent("tc-change",{detail:{index:o,previous:n},bubbles:!0,composed:!0})))}function $t(e){Ve(e),!(e.autoplay<=0)&&(ze(e)<=1||(e._carouselTimer=globalThis.setInterval(()=>{ee(e,e.value+1)},e.autoplay)))}function Ve(e){e._carouselTimer!==void 0&&(globalThis.clearInterval(e._carouselTimer),e._carouselTimer=void 0)}y(Hn,b({props:{value:{type:"number",default:0,reflect:!0},autoplay:{type:"number",default:0},loop:{type:"boolean",default:!0},orientation:{type:"string",default:"horizontal"},transition:{type:"string",default:"slide"},indicators:{type:"boolean",default:!0},controls:{type:"boolean",default:!0},swipe:{type:"boolean",default:!0},pauseOnHover:{type:"boolean",default:!0},ariaLabel:{type:"string",default:"Carousel"},height:{type:"string",default:""}},theme:{"tc-carousel-radius":"var(--tc-radius-lg, 12px)","tc-carousel-bg":"var(--tc-color-bg, #faf8f3)","tc-carousel-control-bg":"rgba(255, 255, 255, 0.85)","tc-carousel-control-bg-hover":"rgba(255, 255, 255, 1)","tc-carousel-control-fg":"var(--tc-color-ink, #14171f)","tc-carousel-control-size":"36px","tc-carousel-indicator":"rgba(20, 23, 31, 0.25)","tc-carousel-indicator-active":"var(--tc-color-accent, #a16939)","tc-carousel-duration":"320ms"},styles:{display:"block",position:"relative"},stylesheet:Cn,template:({props:e})=>{let t=Number(e.value??0),r=String(e.orientation)==="vertical",n=String(e.transition)==="fade",o=String(e.height??""),a=!!e.controls,s=!!e.indicators,i=wt(e.ariaLabel??"Carousel");return v`
        <div
          class="root ${r?"v":"h"} ${n?"fade":"slide"}"
          role="region"
          aria-roledescription="carousel"
          aria-label="${f(i)}"
          style="${f(o?`--tc-carousel-height: ${wt(o)};`:"")}--tc-carousel-index: ${t};"
        >
          <div class="viewport" part="viewport">
            <slot class="track" part="track"></slot>
          </div>
          ${f(a?`
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
          `:"")} ${f(s?'<div class="indicators" role="tablist" part="indicators"></div>':"")}
          <div class="sr-status" aria-live="polite" aria-atomic="true"></div>
        </div>
      `},events:{"click .prev":(e,t)=>{let r=t.host;ee(r,r.value-1)},"click .next":(e,t)=>{let r=t.host;ee(r,r.value+1)},"click .dot":(e,t)=>{let r=e.target.closest(".dot");if(!r)return;let n=Number(r.dataset.index);if(!Number.isFinite(n))return;let o=t.host;ee(o,n)},"keydown .root":(e,t)=>{let r=e,n=t.host,o=n.orientation==="vertical",a=ze(n),s=o?"ArrowUp":"ArrowLeft",i=o?"ArrowDown":"ArrowRight";r.key===s?(r.preventDefault(),ee(n,n.value-1)):r.key===i?(r.preventDefault(),ee(n,n.value+1)):r.key==="Home"?(r.preventDefault(),ee(n,0)):r.key==="End"&&(r.preventDefault(),ee(n,a-1))}},afterMount(){let e=this,t=()=>Et(e),r=new MutationObserver(t);r.observe(e,{childList:!0});let n=e.shadowRoot,o=n?.querySelector("slot"),a=()=>t();o?.addEventListener("slotchange",a),e._carouselSlotObs=()=>{r.disconnect(),o?.removeEventListener("slotchange",a)};let s=()=>Ve(e),i=()=>{e.pauseOnHover&&$t(e)};e.addEventListener("pointerenter",s),e.addEventListener("pointerleave",i),e.addEventListener("focusin",s),e.addEventListener("focusout",i),e._carouselHover=()=>{e.removeEventListener("pointerenter",s),e.removeEventListener("pointerleave",i),e.removeEventListener("focusin",s),e.removeEventListener("focusout",i)},zn(e),n?.querySelector(".root")?.setAttribute("tabindex","0"),t(),e.autoplay>0&&$t(e)},afterRender(){Et(this)},unmount(){let e=this;Ve(e),e._carouselSlotObs?.(),e._carouselHover?.(),e._carouselDrag?.()}}));function Et(e){let t=ze(e),r=e.shadowRoot;if(!r)return;let n=r.querySelector(".root");if(n&&t>0){let i=Mt(e.value,t,e.loop);i!==e.value&&(e.value=i),n.style.setProperty("--tc-carousel-index",String(i))}let o=r.querySelector(".indicators");if(o){let i=e.value,l="";for(let d=0;d<t;d++)l+=`<button type="button" class="dot" role="tab" data-index="${d}"
        aria-current="${d===i?"true":"false"}"
        aria-label="Go to slide ${d+1}"></button>`;o.innerHTML=l}if(Array.from(e.children).filter(i=>i instanceof HTMLElement&&!i.hasAttribute("slot")).forEach((i,l)=>{i.setAttribute("role","group"),i.setAttribute("aria-roledescription","slide"),i.setAttribute("aria-label",`${l+1} of ${t}`),e.transition==="fade"?i.classList.toggle("is-active",l===e.value):i.classList.remove("is-active")}),!e.loop){let i=r.querySelector(".ctrl.prev"),l=r.querySelector(".ctrl.next");i&&(i.disabled=e.value<=0),l&&(l.disabled=e.value>=t-1)}let s=r.querySelector(".sr-status");s&&t>0&&(s.textContent=`Slide ${e.value+1} of ${t}`)}function zn(e){let t=0,r=0,n=!1,o=40,a=l=>{e.swipe&&(l.button!==0&&l.pointerType==="mouse"||(t=l.clientX,r=l.clientY,n=!0))},s=l=>{if(!n)return;n=!1;let d=l.clientX-t,g=l.clientY-r,c=e.orientation==="vertical"?g:d;Math.abs(c)<o||ee(e,e.value+(c<0?1:-1))},i=()=>{n=!1};e.addEventListener("pointerdown",a),e.addEventListener("pointerup",s),e.addEventListener("pointercancel",i),e._carouselDrag=()=>{e.removeEventListener("pointerdown",a),e.removeEventListener("pointerup",s),e.removeEventListener("pointercancel",i)}}var te="tc-accordion";var An=`
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
`;y(te,b({props:{mode:{type:"string",default:"single"},bordered:{type:"boolean",default:!0}},theme:{"tc-accordion-bg":"var(--tc-color-surface, #ffffff)","tc-accordion-ink":"var(--tc-color-ink, #14171f)","tc-accordion-ink-soft":"var(--tc-color-ink-soft, #4a5061)","tc-accordion-rule":"var(--tc-color-rule, #ece5d3)","tc-accordion-radius":"var(--tc-radius-md, 8px)","tc-accordion-accent":"var(--tc-color-accent, #a16939)","tc-accordion-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},stylesheet:An,template:({props:e})=>v`
        <div class="root ${e.bordered?"bordered":""}">
          <slot></slot>
        </div>
      `,afterMount(){let e=this;Rn();let t=a=>{let s=a.target;if(!(!s||s.tagName!=="DETAILS")){if(e.mode==="single"&&s.open)for(let i of Ae(e))i!==s&&i.open&&(i.open=!1);Nn(e)}},r=a=>{let s=a.target;if(!s||s.tagName!=="SUMMARY")return;let i=Ae(e).map(g=>g.querySelector("summary")).filter(g=>!!g),l=i.indexOf(s);if(l===-1)return;let d=-1;a.key==="ArrowDown"?d=(l+1)%i.length:a.key==="ArrowUp"?d=(l-1+i.length)%i.length:a.key==="Home"?d=0:a.key==="End"&&(d=i.length-1),d!==-1&&(a.preventDefault(),i[d]?.focus())};e.addEventListener("toggle",t,!0),e.addEventListener("keydown",r);let n=()=>{for(let a of Ae(e)){let s=a.querySelector(":scope > summary");if(s&&!s.querySelector(".tc-accordion-caret")){let i=document.createElement("span");i.className="tc-accordion-caret",i.setAttribute("aria-hidden","true"),i.style.cssText="display:inline-block;flex:0 0 auto;transition:transform .2s ease;color:var(--tc-color-ink-muted,#6b7280);font-size:0.8rem;",i.textContent="\u25B8",s.appendChild(i);let l=()=>{i.style.transform=a.open?"rotate(90deg)":"rotate(0)"};l(),a.addEventListener("toggle",l)}}};n();let o=new MutationObserver(n);o.observe(e,{childList:!0,subtree:!1}),e._accordionCleanup=()=>{e.removeEventListener("toggle",t,!0),e.removeEventListener("keydown",r),o.disconnect()}},unmount(){this._accordionCleanup?.()}}));var St="tc-accordion-light-styles";function Rn(){if(typeof document>"u"||document.getElementById(St))return;let e=document.createElement("style");e.id=St,e.textContent=`
    ${te} details { background: transparent; }
    ${te} details + details {
      border-top: 1px solid var(--tc-accordion-rule, #ece5d3);
    }
    ${te} details > summary {
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
    ${te} details > summary::-webkit-details-marker { display: none; }
    ${te} details > summary::marker { content: ""; }
    ${te} details > summary:hover { background: rgba(20, 23, 31, 0.03); }
    ${te} details > summary:focus-visible {
      outline: 2px solid var(--tc-accordion-accent, #a16939);
      outline-offset: -2px;
    }
  `,(document.head||document.documentElement).appendChild(e)}function Ae(e){let t=[];for(let r of Array.from(e.children))r instanceof HTMLDetailsElement&&t.push(r);return t}function Nn(e){let t=[];for(let r of Ae(e))if(r.open){let n=r.id||r.querySelector("summary")?.textContent?.trim()||"";t.push(n)}e.dispatchEvent(new CustomEvent("tc-change",{detail:{open:t},bubbles:!0,composed:!0}))}var In="tc-tooltip";var Dn=`
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
`;function jn(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}y(In,b({props:{text:{type:"string",default:""},placement:{type:"string",default:"top"},delay:{type:"number",default:200},offset:{type:"number",default:8},disabled:{type:"boolean",default:!1}},theme:{"tc-tooltip-bg":"var(--tc-color-ink, #14171f)","tc-tooltip-fg":"var(--tc-color-surface, #ffffff)","tc-tooltip-radius":"var(--tc-radius-sm, 6px)","tc-tooltip-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-tooltip-shadow":"0 10px 30px rgba(0, 0, 0, 0.25)","tc-tooltip-padding":"6px 10px","tc-tooltip-max-width":"240px"},styles:{display:"inline-block",position:"relative"},stylesheet:Dn,template:({props:e})=>v`
        <span class="trigger" tabindex="-1"><slot></slot></span>
        <div
          class="tip"
          popover="manual"
          role="tooltip"
          part="tip"
        >
          ${f(e.text?`<span class="tip-text">${jn(e.text)}</span>`:"")}
          <slot name="content"></slot>
        </div>
      `,afterMount(){let e=this,t=e.shadowRoot;if(!t)return;let r=t.querySelector(".tip");if(!r)return;let n=()=>{e.disabled||(clearTimeout(e._tooltipTimer),e._tooltipTimer=globalThis.setTimeout(()=>{if(typeof r.showPopover=="function")try{r.showPopover()}catch{r.style.visibility="visible",r.style.opacity="1"}else r.style.visibility="visible",r.style.opacity="1";Lt(e,r)},Math.max(0,e.delay)))},o=()=>{clearTimeout(e._tooltipTimer);try{typeof r.hidePopover=="function"&&r.hidePopover()}catch{}r.style.opacity="",r.style.visibility=""},a=i=>{i.key==="Escape"&&o()};e.addEventListener("pointerenter",n),e.addEventListener("pointerleave",o),e.addEventListener("focusin",n),e.addEventListener("focusout",o),e.addEventListener("keydown",a);let s=()=>{r.matches(":popover-open")&&Lt(e,r)};globalThis.addEventListener("scroll",s,!0),globalThis.addEventListener("resize",s),e._tooltipCleanup=()=>{clearTimeout(e._tooltipTimer),e.removeEventListener("pointerenter",n),e.removeEventListener("pointerleave",o),e.removeEventListener("focusin",n),e.removeEventListener("focusout",o),e.removeEventListener("keydown",a),globalThis.removeEventListener("scroll",s,!0),globalThis.removeEventListener("resize",s),o()}},unmount(){this._tooltipCleanup?.()}}));function Lt(e,t){let r=e.getBoundingClientRect();t.style.top="0px",t.style.left="0px";let n=t.getBoundingClientRect(),o=globalThis.innerWidth,a=globalThis.innerHeight,s=e.offset,i=e.placement||"top",l=m=>m==="top"?r.top-n.height-s>=4:m==="bottom"?r.bottom+n.height+s<=a-4:m==="left"?r.left-n.width-s>=4:m==="right"?r.right+n.width+s<=o-4:!0;if(!l(i)){let m={top:"bottom",bottom:"top",left:"right",right:"left"};l(m[i]??"top")&&(i=m[i])}let d=0,g=0;i==="top"?(d=r.top-n.height-s,g=r.left+r.width/2-n.width/2):i==="bottom"?(d=r.bottom+s,g=r.left+r.width/2-n.width/2):i==="left"?(d=r.top+r.height/2-n.height/2,g=r.left-n.width-s):i==="right"&&(d=r.top+r.height/2-n.height/2,g=r.right+s),d=Math.max(4,Math.min(a-n.height-4,d)),g=Math.max(4,Math.min(o-n.width-4,g)),t.style.top=`${d}px`,t.style.left=`${g}px`,t.dataset.placement=i}var qn="tc-popover";var Bn=`
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
`;y(qn,b({props:{open:{type:"boolean",default:!1,reflect:!0},placement:{type:"string",default:"bottom"},offset:{type:"number",default:8},dismissible:{type:"boolean",default:!0}},theme:{"tc-popover-bg":"var(--tc-color-surface, #ffffff)","tc-popover-fg":"var(--tc-color-ink, #14171f)","tc-popover-rule":"var(--tc-color-rule, #ece5d3)","tc-popover-radius":"var(--tc-radius-md, 8px)","tc-popover-shadow":"var(--tc-shadow-lg, 0 24px 60px rgba(20, 23, 31, 0.18))","tc-popover-padding":"12px 14px","tc-popover-min-width":"200px","tc-popover-max-width":"340px","tc-popover-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"inline-block",position:"relative"},stylesheet:Bn,template:()=>v`
        <span class="trigger-wrap"><slot name="trigger"></slot></span>
        <div
          class="panel"
          popover="manual"
          role="dialog"
          part="panel"
        >
          <slot></slot>
        </div>
      `,events:{"click .trigger-wrap":(e,t)=>{let r=t.host;r.open=!r.open}},afterRender(){Tt(this)},afterMount(){let e=this,t=o=>{!e.open||!e.dismissible||o.composedPath().includes(e)||(e.open=!1,e.dispatchEvent(new CustomEvent("tc-close",{detail:{reason:"outside"},bubbles:!0,composed:!0})))},r=o=>{!e.open||!e.dismissible||o.key==="Escape"&&(e.open=!1,e.dispatchEvent(new CustomEvent("tc-close",{detail:{reason:"escape"},bubbles:!0,composed:!0})))},n=()=>{let o=e.shadowRoot?.querySelector(".panel");o?.matches(":popover-open")&&Ht(e,o)};document.addEventListener("click",t,!0),document.addEventListener("keydown",r),globalThis.addEventListener("scroll",n,!0),globalThis.addEventListener("resize",n),e._popoverCleanup=()=>{document.removeEventListener("click",t,!0),document.removeEventListener("keydown",r),globalThis.removeEventListener("scroll",n,!0),globalThis.removeEventListener("resize",n)},Tt(e)},unmount(){this._popoverCleanup?.()}}));function Tt(e){let t=e.shadowRoot;if(!t)return;let r=t.querySelector(".panel");if(!r)return;let n=e.open,o=typeof r.showPopover=="function";if(n&&!r.matches(":popover-open")){if(o)try{r.showPopover()}catch{r.style.display="block"}else r.style.display="block";Ht(e,r),e.dispatchEvent(new CustomEvent("tc-open",{bubbles:!0,composed:!0}))}else if(!n&&r.matches(":popover-open"))if(o)try{r.hidePopover()}catch{r.style.display="none"}else r.style.display="none"}function Ht(e,t){let r=e.getBoundingClientRect();t.style.top="0px",t.style.left="0px";let n=t.getBoundingClientRect(),o=globalThis.innerWidth,a=globalThis.innerHeight,s=e.offset,i=e.placement||"bottom",l=m=>m==="top"?r.top-n.height-s>=4:m==="bottom"?r.bottom+n.height+s<=a-4:m==="left"?r.left-n.width-s>=4:m==="right"?r.right+n.width+s<=o-4:!0;if(!l(i)){let m={top:"bottom",bottom:"top",left:"right",right:"left"};l(m[i]??"bottom")&&(i=m[i])}let d=0,g=0;i==="top"?(d=r.top-n.height-s,g=r.left+r.width/2-n.width/2):i==="bottom"?(d=r.bottom+s,g=r.left+r.width/2-n.width/2):i==="left"?(d=r.top+r.height/2-n.height/2,g=r.left-n.width-s):i==="right"&&(d=r.top+r.height/2-n.height/2,g=r.right+s),d=Math.max(4,Math.min(a-n.height-4,d)),g=Math.max(4,Math.min(o-n.width-4,g)),t.style.top=`${d}px`,t.style.left=`${g}px`}var Fn="tc-drawer";var _n=`
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
`,de=new WeakMap;function Ct(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}y(Fn,b({props:{open:{type:"boolean",default:!1,reflect:!0},side:{type:"string",default:"right"},size:{type:"string",default:"min(420px, 92vw)"},dismissible:{type:"boolean",default:!0},title:{type:"string",default:""}},theme:{"tc-drawer-bg":"var(--tc-color-surface, #ffffff)","tc-drawer-ink":"var(--tc-color-ink, #14171f)","tc-drawer-rule":"var(--tc-color-rule, #ece5d3)","tc-drawer-soft":"var(--tc-color-ink-soft, #5a6072)","tc-drawer-shadow":"var(--tc-shadow-lg, 0 24px 60px rgba(20, 23, 31, 0.25))","tc-drawer-backdrop":"rgba(20, 23, 31, 0.5)","tc-drawer-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-drawer-duration":"260ms"},styles:{display:"contents"},stylesheet:_n,template:({props:e})=>{let t=String(e.side??"right"),r=Ct(e.size??"min(420px, 92vw)");return v`
        <dialog
          class="dlg side-${t}"
          aria-labelledby="${e.title?"title":""}"
          style="--tc-drawer-size: ${f(r)};"
        >
          ${f(e.title||e.dismissible?`<header class="head">
                ${e.title?`<h2 id="title" class="title">${Ct(e.title)}</h2>`:"<span></span>"}
                ${e.dismissible?'<button class="x" type="button" aria-label="Close">\xD7</button>':""}
              </header>`:"")}
          <div class="body"><slot></slot></div>
          <footer class="foot"><slot name="footer"></slot></footer>
        </dialog>
      `},refs:{dialog:".dlg"},events:{"click .x":(e,t)=>{zt(t.host,"button")},"click .dlg":(e,t)=>{let r=t.host;if(!r.dismissible)return;let n=t.refs.dialog;n&&e.target===n&&zt(r,"backdrop")}},afterRender(){On(this)},unmount(){let e=de.get(this);e&&(e.cleanup(),de.delete(this))}}));function On(e){let t=e.shadowRoot;if(!t)return;let r=t.querySelector(".dlg");if(!r)return;let n=e.open,o=de.get(e);if(o&&o.dialog!==r&&(o.cleanup(),de.delete(e)),n&&!r.open){if(typeof r.showModal=="function")try{r.showModal()}catch{r.setAttribute("open","")}else r.setAttribute("open","");if(!de.has(e)){let a=()=>{let s=e;s.open&&(s.open=!1,e.dispatchEvent(new CustomEvent("tc-close",{detail:{reason:"escape"},bubbles:!0,composed:!0})))};r.addEventListener("close",a),de.set(e,{dialog:r,cleanup:()=>r.removeEventListener("close",a)})}}else if(!n&&r.open)try{r.close()}catch{r.removeAttribute("open")}}function zt(e,t){e.open&&(e.open=!1,e.dispatchEvent(new CustomEvent("tc-close",{detail:{reason:t},bubbles:!0,composed:!0})))}var Pn="tc-progress";function Re(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Vn(e,t){return!Number.isFinite(e)||!Number.isFinite(t)||t<=0?0:Math.max(0,Math.min(100,e/t*100))}y(Pn,b({props:{value:{type:"number",default:0},max:{type:"number",default:100},variant:{type:"string",default:"linear"},size:{type:"string",default:"md"},indeterminate:{type:"boolean",default:!1},showLabel:{type:"boolean",default:!1},label:{type:"string",default:""}},theme:{"tc-progress-track":"var(--tc-color-rule, #ece5d3)","tc-progress-fill":"var(--tc-color-accent, #a16939)","tc-progress-radius":"999px","tc-progress-fg":"var(--tc-color-ink, #14171f)","tc-progress-font":"var(--tc-font-mono, 'JetBrains Mono', monospace)"},styles:{display:"inline-block"},template:({props:e})=>{let t=String(e.variant??"linear"),r=String(e.size??"md"),n=!!e.indeterminate,o=Number(e.value??0),a=Number(e.max??100),s=Vn(o,a),i=e.label||(n?"Loading\u2026":`${Math.round(s)}%`);if(t==="circular"){let g=r==="sm"?28:r==="lg"?72:48,m=r==="sm"?3:r==="lg"?6:4,c=(g-m)/2,u=2*Math.PI*c,p=n?u*.25:s/100*u,h=n?`role="progressbar" aria-valuetext="${Re(i)}"`:`role="progressbar" aria-valuenow="${o}" aria-valuemin="0" aria-valuemax="${a}"`;return v`
          <div class="circ size-${r} ${n?"indet":""}" ${f(h)}>
            <svg
              viewBox="0 0 ${g} ${g}"
              width="${g}"
              height="${g}"
              aria-hidden="true"
            >
              <circle
                class="track"
                cx="${g/2}"
                cy="${g/2}"
                r="${c}"
                stroke-width="${m}"
                fill="none"
              />
              <circle
                class="fill"
                cx="${g/2}"
                cy="${g/2}"
                r="${c}"
                stroke-width="${m}"
                fill="none"
                stroke-dasharray="${p.toFixed(3)} ${(u-p).toFixed(3)}"
                stroke-dashoffset="${(u/4).toFixed(3)}"
                stroke-linecap="round"
              />
            </svg>
            ${f(e.showLabel?`<span class="label" aria-hidden="true">${Re(i)}</span>`:"")}
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
        `}let l=r==="sm"?4:r==="lg"?12:8,d=n?`role="progressbar" aria-valuetext="${Re(i)}"`:`role="progressbar" aria-valuenow="${o}" aria-valuemin="0" aria-valuemax="${a}"`;return v`
        <div class="bar size-${r} ${n?"indet":""}" ${f(d)}>
          <div class="track">
            <div class="fill" style="width: ${s.toFixed(2)}%"></div>
          </div>
          ${f(e.showLabel?`<span class="label" aria-hidden="true">${Re(i)}</span>`:"")}
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
      `}}));var Yn="tc-stepper";function At(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}y(Yn,b({props:{steps:{type:"json",default:[]},active:{type:"number",default:0,reflect:!0},orientation:{type:"string",default:"horizontal"},clickable:{type:"boolean",default:!1}},theme:{"tc-stepper-bg":"transparent","tc-stepper-ink":"var(--tc-color-ink, #14171f)","tc-stepper-soft":"var(--tc-color-ink-soft, #4a5061)","tc-stepper-rule":"var(--tc-color-rule, #ece5d3)","tc-stepper-accent":"var(--tc-color-accent, #a16939)","tc-stepper-done":"var(--tc-color-success, #2f7a52)","tc-stepper-radius":"999px","tc-stepper-marker-size":"28px","tc-stepper-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},template:({props:e})=>{let t=e.steps??[],r=Number(e.active??0),n=String(e.orientation)==="vertical",o=!!e.clickable,a=t.map((s,i)=>{let l=i<r?"done":i===r?"current":"upcoming",d=l==="done"?'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>':`${i+1}`;return`
          <li class="step state-${l}" data-index="${i}">
            <${o?"button":"div"} class="row" ${o?`type="button" aria-current="${l==="current"?"step":"false"}"`:`aria-current="${l==="current"?"step":"false"}"`}>
              <span class="marker" aria-hidden="true">${d}</span>
              <span class="text">
                <span class="title">${At(s.title)}</span>
                ${s.description?`<span class="desc">${At(s.description)}</span>`:""}
              </span>
            </${o?"button":"div"}>
            ${i<t.length-1?`<span class="line ${i<r?"done":""}" aria-hidden="true"></span>`:""}
          </li>
        `}).join("");return v`
        <ol class="root ${n?"v":"h"} ${o?"clickable":""}" aria-label="Progress">
          ${f(a)}
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
      `},events:{"click .row":(e,t)=>{let r=t.host;if(!r.clickable)return;let n=e.target.closest(".step");if(!n)return;let o=Number(n.dataset.index);if(!Number.isFinite(o)||o===r.active)return;let a=r.active;r.active=o,t.emit("tc-step-change",{active:o,previous:a})}}}));var Gn="tc-avatar";var Kn=`
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
`;function se(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Rt(e){let t=e.trim().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].slice(0,2).toUpperCase():(t[0][0]+t[t.length-1][0]).toUpperCase()}var Ye=[["#dde6f4","#1f3a66"],["#dbece2","#155b40"],["#efe2cf","#8a572d"],["#f4dad7","#7a1a14"],["#e3dcf1","#3d2a73"],["#d5e8e5","#0d4f49"],["#fbe3c5","#7a4f0a"]];function Un(e){if(!e)return Ye[0];let t=0;for(let n=0;n<e.length;n++)t=t*31+e.charCodeAt(n)|0;let r=Math.abs(t)%Ye.length;return Ye[r]}y(Gn,b({props:{src:{type:"string",default:""},alt:{type:"string",default:""},name:{type:"string",default:""},size:{type:"string",default:"md"},shape:{type:"string",default:"circle"},status:{type:"string",default:""},ring:{type:"boolean",default:!1}},theme:{"tc-avatar-bg":"var(--tc-color-rule, #ece5d3)","tc-avatar-fg":"var(--tc-color-ink, #14171f)","tc-avatar-ring":"var(--tc-color-surface, #ffffff)","tc-avatar-status-online":"#2f7a52","tc-avatar-status-away":"#d7a52f","tc-avatar-status-busy":"#b3261e","tc-avatar-status-offline":"#9aa0a6","tc-avatar-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"inline-block",position:"relative","vertical-align":"middle"},stylesheet:Kn,template:({props:e})=>{let t=String(e.name??""),r=String(e.src??""),n=String(e.alt??"")||t||"avatar",o=String(e.size??"md"),a=String(e.shape??"circle"),s=String(e.status??""),i=!!e.ring,[l,d]=Un(t);return v`
        <span
          class="root size-${o} shape-${a} ${i?"ringed":""}"
          style="--tc-avatar-tint-bg: ${l}; --tc-avatar-tint-fg: ${d};"
        >
          ${r?f(`<img src="${se(r)}" alt="${se(n)}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'fallback',textContent:'${se(Rt(t))}'}))">`):f(`<span class="fallback" aria-label="${se(n)}">${se(Rt(t))}</span>`)} ${s?f(`<span class="status status-${se(s)}" aria-label="${se(s)}"></span>`):""}
        </span>
      `}}));var Wn="tc-avatar-group";var Xn=`
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
`;y(Wn,b({props:{max:{type:"number",default:4},spacing:{type:"string",default:"normal"},size:{type:"string",default:"md"}},theme:{"tc-avatar-group-ring":"var(--tc-color-surface, #ffffff)","tc-avatar-group-overflow-bg":"var(--tc-color-rule, #ece5d3)","tc-avatar-group-overflow-fg":"var(--tc-color-ink, #14171f)"},styles:{display:"inline-flex"},stylesheet:Xn,template:()=>v`
        <span class="row"><slot></slot><span class="overflow" hidden></span></span>
      `,afterMount(){let e=this,t=()=>Nt(e);t();let r=new MutationObserver(t);r.observe(e,{childList:!0}),e._agroupCleanup=()=>r.disconnect()},afterRender(){Nt(this)},unmount(){this._agroupCleanup?.()}}));function Nt(e){let t=Math.max(0,Number(e.max??4)),r=String(e.size??"md"),n=Array.from(e.children).filter(l=>l instanceof HTMLElement),o=0;for(let l of n)l.tagName.toLowerCase()==="tc-avatar"&&(l.getAttribute("size")||l.setAttribute("size",r),o<t||t===0?(l.hidden=!1,o++):l.hidden=!0);let a=n.filter(l=>l.tagName.toLowerCase()==="tc-avatar").length,s=Math.max(0,a-o),i=e.shadowRoot?.querySelector(".overflow");i&&(s>0?(i.hidden=!1,i.textContent=`+${s}`):i.hidden=!0)}var Zn="tc-rating";var It="M12 17.27 18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z";y(Zn,b({props:{value:{type:"number",default:0,reflect:!0},max:{type:"number",default:5},readonly:{type:"boolean",default:!1,reflect:!0},allowHalf:{type:"boolean",default:!1},size:{type:"string",default:"md"},ariaLabel:{type:"string",default:"Rating"}},theme:{"tc-rating-fill":"var(--tc-color-warning, #d7a52f)","tc-rating-track":"var(--tc-color-rule, #ece5d3)"},styles:{display:"inline-block"},template:({props:e,state:t})=>{let r=Math.max(1,Number(e.max??5)),n=Number(e.value??0),o=Number(t.hover??-1),a=o>=0?o:n,s=String(e.size??"md"),i=!!e.readonly,l=!!e.allowHalf,d=String(e.ariaLabel??"Rating"),g=s==="sm"?18:s==="lg"?32:24,m=[];for(let c=1;c<=r;c++){let u=a-(c-1),p=u>=1?100:u>=.5&&l?50:u>0&&!l?100:0,h=p===50;m.push(`
          <span class="star ${h?"half":p===100?"full":"empty"}" data-index="${c}">
            <svg viewBox="0 0 24 24" width="${g}" height="${g}" aria-hidden="true">
              <path class="track" d="${It}" fill="var(--tc-rating-track)" />
              ${p>0?`<path class="fill" d="${It}" fill="var(--tc-rating-fill)" clip-path="${h?"inset(0 50% 0 0)":"none"}" />`:""}
            </svg>
            ${l&&!i?`<span class="hit-left" data-index="${c}" data-half="1"></span>
                 <span class="hit-right" data-index="${c}" data-half="0"></span>`:""}
          </span>
        `)}return v`
        <div
          class="root size-${s} ${i?"readonly":""}"
          role="${i?"img":"slider"}"
          tabindex="${i?"-1":"0"}"
          aria-label="${d}"
          aria-valuenow="${n}"
          aria-valuemin="0"
          aria-valuemax="${r}"
          aria-valuetext="${n} of ${r}"
        >
          ${f(m.join(""))}
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
      `},events:{"click .star":(e,t)=>{let r=t.host;if(r.readonly)return;let n=e.target,o=n.closest(".hit-left, .hit-right"),a=n.closest(".star");if(!a)return;let s=Number(a.dataset.index);if(!Number.isFinite(s))return;let i=s;o?.dataset.half==="1"&&r.allowHalf&&(i=s-.5),i===r.value&&(i=0);let l=r.value;r.value=i,t.emit("tc-change",{value:i,previous:l})},"mouseover .star":(e,t)=>{let r=t.host;if(r.readonly)return;let n=e.target,o=n.closest(".hit-left, .hit-right"),a=n.closest(".star");if(!a)return;let s=Number(a.dataset.index);if(!Number.isFinite(s))return;let i=s;o?.dataset.half==="1"&&r.allowHalf&&(i=s-.5),t.setState("hover",i)},"mouseleave .root":(e,t)=>{t.setState("hover",-1)},"keydown .root":(e,t)=>{let r=e,n=t.host;if(n.readonly)return;let o=n.allowHalf?.5:1,a=n.value,s=a;if(r.key==="ArrowRight"||r.key==="ArrowUp")s=Math.min(n.max,a+o);else if(r.key==="ArrowLeft"||r.key==="ArrowDown")s=Math.max(0,a-o);else if(r.key==="Home")s=0;else if(r.key==="End")s=n.max;else return;r.preventDefault(),s!==a&&(n.value=s,t.emit("tc-change",{value:s,previous:a}))}}}));var Jn="tc-slider";var Qn=`
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
`;function Ge(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}y(Jn,b({props:{value:{type:"number",default:0,reflect:!0},min:{type:"number",default:0},max:{type:"number",default:100},step:{type:"number",default:1},disabled:{type:"boolean",default:!1,reflect:!0},showValue:{type:"boolean",default:!1},showTicks:{type:"boolean",default:!1},label:{type:"string",default:""},suffix:{type:"string",default:""}},theme:{"tc-slider-track":"var(--tc-color-rule, #ece5d3)","tc-slider-fill":"var(--tc-color-accent, #a16939)","tc-slider-thumb":"var(--tc-color-surface, #ffffff)","tc-slider-thumb-ring":"var(--tc-color-accent, #a16939)","tc-slider-radius":"999px","tc-slider-thumb-size":"20px","tc-slider-track-size":"6px","tc-slider-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-slider-fg":"var(--tc-color-ink, #14171f)","tc-slider-fg-muted":"var(--tc-color-ink-muted, #6b7280)"},styles:{display:"block"},stylesheet:Qn,template:({props:e})=>{let t=Number(e.value??0),r=Number(e.min??0),n=Number(e.max??100),o=Number(e.step??1),a=!!e.disabled,s=n>r?(t-r)/(n-r)*100:0,i=String(e.label??""),l=String(e.suffix??""),d=!!e.showValue,g=!!e.showTicks,m="";if(g&&o>0){let c=Math.floor((n-r)/o)+1;if(c<=50){let u=[];for(let p=0;p<c;p++){let x=(r+p*o-r)/(n-r)*100;u.push(`<span class="tick" style="left:${x.toFixed(2)}%"></span>`)}m=u.join("")}}return v`
        ${f(i||d?`<div class="head">
              ${i?`<label for="r" class="lbl">${Ge(i)}</label>`:"<span></span>"}
              ${d?`<span class="val">${Ge(String(t))}${Ge(l)}</span>`:""}
            </div>`:"")}
        <div class="rail" style="--tc-slider-pct: ${s.toFixed(2)}%;">
          <div class="track-bg"></div>
          <div class="track-fill"></div>
          ${f(m)}
          <input
            id="r"
            class="range"
            type="range"
            min="${r}"
            max="${n}"
            step="${o}"
            value="${t}"
            ${f(a?"disabled":"")}
            aria-valuetext="${String(t)+l}"
          />
        </div>
      `},refs:{range:".range"},events:{"input .range":(e,t)=>{let r=e.target,n=t.host,o=Number(r.value);n.value!==o&&(n.value=o,t.emit("tc-input",{value:o}))},"change .range":(e,t)=>{let r=e.target,n=t.host,o=Number(r.value);t.emit("tc-change",{value:o,previous:n.value})}}}));var eo="tc-chart";function Dt(e,t){if(e<=0)return 1;let r=Math.floor(Math.log10(e)),n=e/Math.pow(10,r),o;return t?n<1.5?o=1:n<3?o=2:n<7?o=5:o=10:n<=1?o=1:n<=2?o=2:n<=5?o=5:o=10,o*Math.pow(10,r)}function Ft(e,t,r=5){if(e===t){let l=Math.abs(e)||1;return{min:e-l,max:t+l,ticks:[e-l,e,e+l]}}let n=Dt(t-e,!1),o=Dt(n/(r-1),!0),a=Math.floor(e/o)*o,s=Math.ceil(t/o)*o,i=[];for(let l=a;l<=s+o*.5;l+=o)i.push(Number(l.toFixed(10)));return{min:a,max:s,ticks:i}}function Ne(e,t){if(e.length===0)return"";if(e.length===1||!t)return"M "+e.map(n=>`${n.x} ${n.y}`).join(" L ");let r=`M ${e[0].x} ${e[0].y}`;for(let n=0;n<e.length-1;n++){let o=e[n-1]??e[n],a=e[n],s=e[n+1],i=e[n+2]??s,l=a.x+(s.x-o.x)/6,d=a.y+(s.y-o.y)/6,g=s.x-(i.x-a.x)/6,m=s.y-(i.y-a.y)/6;r+=` C ${l},${d} ${g},${m} ${s.x},${s.y}`}return r}function Me(e,t,r,n){return{x:e+r*Math.sin(n),y:t-r*Math.cos(n)}}function to(e,t,r,n,o,a){let s=a-o>Math.PI?1:0,i=Me(e,t,r,o),l=Me(e,t,r,a);if(n<=0)return`M ${e} ${t} L ${i.x} ${i.y} A ${r} ${r} 0 ${s} 1 ${l.x} ${l.y} Z`;let d=Me(e,t,n,a),g=Me(e,t,n,o);return`M ${i.x} ${i.y} A ${r} ${r} 0 ${s} 1 ${l.x} ${l.y} L ${d.x} ${d.y} A ${n} ${n} 0 ${s} 0 ${g.x} ${g.y} Z`}function M(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ie(e){if(!Number.isFinite(e))return"";let t=Math.abs(e);return t>=1e6?(e/1e6).toFixed(1).replace(/\.0$/,"")+"M":t>=1e3?(e/1e3).toFixed(1).replace(/\.0$/,"")+"K":t>0&&t<1?e.toFixed(2):String(Math.round(e*100)/100)}function ue(e,t){return t[e%t.length]}function jt(e){switch(e){case"compact":return Ie;case"none":return t=>Number.isFinite(t)?String(t):"";case"integer":return t=>Number.isFinite(t)?Math.round(t).toLocaleString():"";case"percent":return t=>Number.isFinite(t)?`${Ie(t)}%`:"";case"currency":return t=>Number.isFinite(t)?`$${Ie(t)}`:"";default:return t=>Number.isFinite(t)?`${Ie(t)}${e}`:""}}function ro(e,t){let{data:r,smooth:n,stacked:o,showAxes:a,showGrid:s,showLabels:i,showValues:l}=e,d=r.labels??[],g=r.series??[],m=t==="sparkline",c=m?4:16,u=m?4:a&&i?28:8,p=m?4:a?44:8,h=m?4:12,x=e.W-p-h,E=e.H-c-u,$=1/0,S=-1/0;if(o&&g.length>0){let k=d.length>0?d.map((w,L)=>g.reduce((j,P)=>j+(P.values?.[L]??0),0)):[];for(let w of k)w<$&&($=w),w>S&&(S=w);$>0&&($=0)}else for(let k of g)for(let w of k.values??[])w==null||!Number.isFinite(w)||(w<$&&($=w),w>S&&(S=w));(!Number.isFinite($)||!Number.isFinite(S))&&($=0,S=1),$===S&&($-=1,S+=1);let H=Ft(e.yMin??$,e.yMax??S,5),z=e.yMin??H.min,C=e.yMax??H.max,W=C-z||1,T=d.length||g[0]?.values?.length||0,D=k=>T===1?p+x/2:t==="bar"?p+(k+.5)*(x/T):p+k/(T-1)*x,N=k=>c+E-(k-z)/W*E,J=[];if(!m){if(s)for(let k of H.ticks){let w=N(k);J.push(`<line class="grid" x1="${p}" x2="${e.W-h}" y1="${w}" y2="${w}"/>`)}if(a){for(let w of H.ticks){let L=N(w);J.push(`<text class="axis-label y" x="${p-8}" y="${L}" text-anchor="end" dominant-baseline="middle">${M(e.fmtTick(w))}</text>`)}if(i&&d.length>0){let w=e.labelStride>0?e.labelStride:e.maxLabels>0?Math.max(1,Math.ceil(d.length/e.maxLabels)):Math.max(1,Math.ceil(d.length/8)),L=e.labelAngle,j=L===0?"middle":L<0?"end":"start";d.forEach((P,q)=>{if(q%w!==0&&q!==d.length-1)return;let G=D(q),X=e.H-u+16,A=L!==0?` transform="rotate(${L} ${G} ${X})"`:"";J.push(`<text class="axis-label x" x="${G}" y="${X}" text-anchor="${j}"${A}>${M(P)}</text>`)})}let k=z<=0&&C>=0?N(0):N(z);J.push(`<line class="axis" x1="${p}" x2="${e.W-h}" y1="${k}" y2="${k}"/>`)}}let F=[];if(t==="bar"){let k=x/T,w=k*.18,L=k-w*2;g.forEach((j,P)=>{let q=`series series-${P}`,G=j.color||ue(P,e.palette),X=j.opacity!=null?` fill-opacity="${j.opacity}"`:"",A=0;j.values?.forEach((R,I)=>{if(R==null||!Number.isFinite(R))return;let _=D(I),O,K,U,Z;if(o){O=_-L/2,K=L;let fe=N(A+R),ge=N(A);U=Math.min(fe,ge),Z=Math.abs(fe-ge),A+=R}else{let fe=L/g.length;O=_-L/2+P*fe,K=fe*.86;let ge=N(R),Je=N(z<0&&C>0?0:z);U=Math.min(ge,Je),Z=Math.abs(ge-Je)}let Q=`${M(j.name)}${d[I]?` \xB7 ${M(d[I])}`:""}: ${M(e.fmtV(R))}`,ie=`data-tip="${Q}" data-color="${G}" data-series="${M(j.name)}" data-index="${I}" data-value="${R}" data-label="${M(d[I]??"")}"`,Qt=(I*.04).toFixed(3);F.push(`<g class="${q}"><rect class="hit" x="${O}" y="${U}" width="${K}" height="${Z}" rx="2" fill="${G}"${X} ${ie} style="animation-delay: ${Qt}s"><title>${Q}</title></rect>`+(l?`<text class="value-label" x="${O+K/2}" y="${U-4}" text-anchor="middle">${M(e.fmtV(R))}</text>`:"")+"</g>")})})}else if(o&&t==="area"){let k=new Array(T).fill(0);g.forEach((w,L)=>{let j=w.color||ue(L,e.palette),P=[],q=[];for(let A=0;A<T;A++){let R=w.values?.[A]??0,I=k[A]+R;P.push({x:D(A),y:N(I)}),q.push({x:D(A),y:N(k[A])}),k[A]=I}let G=Ne(P,n)+" L "+q.slice().reverse().map(A=>`${A.x} ${A.y}`).join(" L ")+" Z",X=(L*.15).toFixed(3);F.push(`<path class="series-fill series-${L}" d="${G}" fill="${j}" fill-opacity="0.25" pointer-events="none" style="animation-delay: ${X}s"/>`),F.push(`<path class="series-line series-${L}" d="${Ne(P,n)}" stroke="${j}" fill="none" pointer-events="none" style="animation-delay: ${X}s"/>`),P.forEach((A,R)=>{let I=w.values?.[R]??0,_=`${M(w.name)}${d[R]?` \xB7 ${M(d[R])}`:""}: ${M(e.fmtV(I))}`;F.push(`<circle class="hit series-${L}" cx="${A.x}" cy="${A.y}" r="12" fill="transparent" data-tip="${_}" data-color="${j}" data-series="${M(w.name)}" data-index="${R}" data-value="${I}" data-label="${M(d[R]??"")}"><title>${_}</title></circle>`)})})}else g.forEach((k,w)=>{let L=k.color||ue(w,e.palette),j=k.values??[],P=(w*.15).toFixed(3),q=[`animation-delay: ${P}s`];k.width!=null&&q.push(`--tc-sw: ${k.width}`),k.opacity!=null&&q.push(`--tc-so: ${k.opacity}`),k.dash&&q.push(`--tc-dash: ${M(k.dash)}`);let G=q.join("; "),X=`series-line series-${w}${k.dash?" custom-dash":""}`,A=k.opacity!=null?Number(k.opacity)*.25:.25,R=[],I=[];if(j.forEach((_,O)=>{if(_==null||!Number.isFinite(_)){I.length&&R.push(I),I=[];return}I.push({x:D(O),y:N(_)})}),I.length&&R.push(I),t==="area"){let _=N(z<0&&C>0?0:z);for(let O of R){let K=Ne(O,n)+` L ${O[O.length-1].x} ${_} L ${O[0].x} ${_} Z`;F.push(`<path class="series-fill series-${w}" d="${K}" fill="${L}" fill-opacity="${A}" pointer-events="none" style="animation-delay: ${P}s"/>`)}}for(let _ of R)F.push(`<path class="${X}" d="${Ne(_,n)}" stroke="${L}" fill="none" style="${G}"/>`);if(!m){let _=k.showPoints!==!1;j.forEach((O,K)=>{if(O==null||!Number.isFinite(O))return;let U={x:D(K),y:N(O)},Z=`${M(k.name)}${d[K]?` \xB7 ${M(d[K])}`:""}: ${M(e.fmtV(O))}`,Q=`data-tip="${Z}" data-color="${L}" data-series="${M(k.name)}" data-index="${K}" data-value="${O}" data-label="${M(d[K]??"")}"`,ie=(w*.15+K*.025+.55).toFixed(3);_&&F.push(`<circle class="series-point series-${w}" cx="${U.x}" cy="${U.y}" r="3.5" fill="${L}" pointer-events="none" style="animation-delay: ${ie}s"/>`),F.push(`<circle class="hit series-${w}" cx="${U.x}" cy="${U.y}" r="12" fill="transparent" ${Q}><title>${Z}</title></circle>`),l&&F.push(`<text class="value-label" x="${U.x}" y="${U.y-8}" text-anchor="middle" pointer-events="none">${M(e.fmtV(O))}</text>`)})}});return F.push(no(e,D,N,T)),J.join("")+F.join("")}function no(e,t,r,n){if(!Array.isArray(e.refLines)||e.refLines.length===0)return"";let o=44,a=12,s=[];for(let i of e.refLines){if(!i||!Number.isFinite(i.value))continue;let l=i.axis==="x"?"x":"y",d=i.color||"var(--tc-chart-axis, var(--tc-color-ink-muted, #6b7280))",g=i.dash??"5 4";if(l==="y"){let m=r(i.value);s.push(`<line class="ref-line" x1="${o}" x2="${e.W-a}" y1="${m}" y2="${m}" stroke="${d}" stroke-dasharray="${M(g)}"/>`),i.label&&s.push(`<text class="ref-label" x="${e.W-a}" y="${m-4}" text-anchor="end">${M(i.label)}</text>`)}else{let m=t(i.value);s.push(`<line class="ref-line" x1="${m}" x2="${m}" y1="16" y2="${e.H-(e.showAxes&&e.showLabels?28:8)}" stroke="${d}" stroke-dasharray="${M(g)}"/>`),i.label&&s.push(`<text class="ref-label" x="${m+4}" y="22" text-anchor="start">${M(i.label)}</text>`)}}return s.join("")}function oo(e){let{data:t,stacked:r,showAxes:n,showGrid:o,showLabels:a,showValues:s}=e,i=t.labels??[],l=t.series??[],d=i.length||l[0]?.values?.length||0;if(d===0)return"";let g=16,m=n?28:12,c=a?130:12,p=e.W-c-16,h=e.H-g-m,x=1/0,E=-1/0;if(r&&l.length>0)for(let k=0;k<d;k++){let w=l.reduce((L,j)=>L+(j.values?.[k]??0),0);w<x&&(x=w),w>E&&(E=w)}else for(let k of l)for(let w of k.values??[])w==null||!Number.isFinite(w)||(w<x&&(x=w),w>E&&(E=w));(!Number.isFinite(x)||!Number.isFinite(E))&&(x=0,E=1),x===E&&(x-=1,E+=1),x>0&&(x=0);let $=Ft(e.yMin??x,e.yMax??E,5),S=e.yMin??$.min,H=e.yMax??$.max,z=H-S||1,C=k=>c+(k-S)/z*p,W=h/d,T=k=>g+(k+.5)*W,D=[];if(o)for(let k of $.ticks){let w=C(k);D.push(`<line class="grid" x1="${w}" x2="${w}" y1="${g}" y2="${g+h}"/>`)}if(n){for(let w of $.ticks){let L=C(w);D.push(`<text class="axis-label x" x="${L}" y="${e.H-m+16}" text-anchor="middle">${M(e.fmtTick(w))}</text>`)}a&&i.forEach((w,L)=>{D.push(`<text class="bar-cat-label" x="${c-8}" y="${T(L)}" text-anchor="end" dominant-baseline="middle">${M(w)}</text>`)});let k=S<=0&&H>=0?C(0):C(S);D.push(`<line class="axis" x1="${k}" x2="${k}" y1="${g}" y2="${g+h}"/>`)}let N=[],J=W*.18,F=W-J*2;if(l.forEach((k,w)=>{let L=k.color||ue(w,e.palette),j=k.opacity!=null?` fill-opacity="${k.opacity}"`:"",P=0;k.values?.forEach((q,G)=>{if(q==null||!Number.isFinite(q))return;let X=T(G),A,R,I,_;if(r){R=X-F/2,_=F;let Z=C(P),Q=C(P+q);A=Math.min(Z,Q),I=Math.abs(Q-Z),P+=q}else{let Z=F/l.length;R=X-F/2+w*Z,_=Z*.86;let Q=C(S<0&&H>0?0:S),ie=C(q);A=Math.min(ie,Q),I=Math.abs(ie-Q)}let O=`${M(k.name)}${i[G]?` \xB7 ${M(i[G])}`:""}: ${M(e.fmtV(q))}`,K=`data-tip="${O}" data-color="${L}" data-series="${M(k.name)}" data-index="${G}" data-value="${q}" data-label="${M(i[G]??"")}"`,U=(G*.03).toFixed(3);N.push(`<g class="series series-${w}"><rect class="hit hbar" x="${A}" y="${R}" width="${I}" height="${_}" rx="2" fill="${L}"${j} ${K} style="animation-delay: ${U}s"><title>${O}</title></rect>`+(s?`<text class="value-label" x="${A+I+4}" y="${R+_/2}" text-anchor="start" dominant-baseline="middle">${M(e.fmtV(q))}</text>`:"")+"</g>")})}),Array.isArray(e.refLines))for(let k of e.refLines){if(!k||!Number.isFinite(k.value))continue;let w=C(k.value),L=k.color||"var(--tc-chart-axis, var(--tc-color-ink-muted, #6b7280))";N.push(`<line class="ref-line" x1="${w}" x2="${w}" y1="${g}" y2="${g+h}" stroke="${L}" stroke-dasharray="${M(k.dash??"5 4")}"/>`),k.label&&N.push(`<text class="ref-label" x="${w+4}" y="${g+10}" text-anchor="start">${M(k.label)}</text>`)}return D.join("")+N.join("")}function ao(e,t){let r=e.data.series??[],n=r.reduce((c,u)=>c+(u.value??0),0);if(n<=0)return"";let o=e.W/2,a=e.H/2,s=Math.min(e.W,e.H)/2-4,i=Math.max(0,Math.min(.9,e.innerRadius))*s,l=0,d=[];r.forEach((c,u)=>{let p=c.value??0;if(p<=0)return;let h=p/n*Math.PI*2,x=l,E=l+h,$=to(o,a,s,i,x,E-.01),S=c.color||ue(u,e.palette),H=(p/n*100).toFixed(1).replace(/\.0$/,""),z=`${M(c.name)}: ${M(e.fmtV(p))} (${H}%)`,C=(u*.08).toFixed(3);if(d.push(`<path class="series-segment hit series-${u}" d="${$}" fill="${S}" data-tip="${z}" data-color="${S}" data-series="${M(c.name)}" data-index="${u}" data-value="${p}" data-label="${M(c.name)}" style="animation-delay: ${C}s"><title>${z}</title></path>`),e.showValues){let W=(x+E)/2,T=(s+i)/2,D=Me(o,a,T,W);d.push(`<text class="value-label donut" x="${D.x}" y="${D.y}" text-anchor="middle" dominant-baseline="middle">${M(H)}%</text>`)}l=E});let g=String(t.centerValue??""),m=String(t.centerLabel??"");return i>0&&(g||m)&&(g&&d.push(`<text class="donut-center-value" x="${o}" y="${a-(m?6:0)}" text-anchor="middle" dominant-baseline="middle">${M(g)}</text>`),m&&d.push(`<text class="donut-center-label" x="${o}" y="${a+(g?16:0)}" text-anchor="middle" dominant-baseline="middle">${M(m)}</text>`)),d.join("")}function so(e,t,r){return e.length===0?"":'<div class="legend" part="legend">'+e.map((n,o)=>{let a=ue(o,t),s=r.includes(n.name);return`<button class="${s?"legend-item is-hidden":"legend-item"}" type="button" data-series="${M(n.name)}" aria-pressed="${s?"true":"false"}" title="${s?"Show":"Hide"} series '${M(n.name)}'"><span class="swatch" style="background:${a}"></span>${M(n.name)}</button>`}).join("")+"</div>"}function io(e,t){if(e==="donut"){let o=(t.series??[]).reduce((s,i)=>s+(i.value??0),0);return`Donut chart: ${(t.series??[]).filter(s=>(s.value??0)>0).map(s=>{let i=o>0?(s.value??0)/o*100:0;return`${s.name} ${i.toFixed(1).replace(/\.0$/,"")}%`}).join(", ")}.`}let r=(t.series??[]).map(o=>o.name).join(", "),n=t.labels?.length??t.series[0]?.values?.length??0;return`${e.charAt(0).toUpperCase()}${e.slice(1)} chart with ${(t.series??[]).length} series (${r}) and ${n} data point${n===1?"":"s"}.`}var lo=["var(--tc-chart-color-1, var(--tc-color-accent, #a16939))","var(--tc-chart-color-2, var(--tc-color-info, #3a5b8c))","var(--tc-chart-color-3, var(--tc-color-success, #2f7a52))","var(--tc-chart-color-4, var(--tc-color-warning, #d7a52f))","var(--tc-chart-color-5, var(--tc-color-danger, #b3261e))","var(--tc-chart-color-6, #6f4e7c)","var(--tc-chart-color-7, #0b6e6e)","var(--tc-chart-color-8, #b0566c)"],co=`
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
    /* Donut + horizontal bars size to their own aspect (no stretch). */
    .root.intrinsic .canvas { height: auto; }
    .root.intrinsic svg { height: auto; }
    /* Legend placement. */
    .root.legend-top .legend { margin-top: 0; margin-bottom: 14px; }
    .root.legend-right {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: center;
      gap: 12px;
    }
    .root.legend-right .legend {
      flex-direction: column;
      flex-wrap: nowrap;
      align-items: flex-start;
      margin-top: 0;
    }
    .hit { cursor: var(--tc-chart-hit-cursor, default); }
    .series-segment.clickable, rect.hit.clickable, .hit.clickable { cursor: pointer; }
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
    .donut-center-value {
      font-size: 26px; font-weight: 700;
      fill: var(--tc-chart-fg, var(--tc-color-ink, #14171f));
    }
    .donut-center-label {
      font-size: 12px;
      fill: var(--tc-chart-label, var(--tc-color-ink-muted, #6b7280));
    }
    .ref-line { stroke-width: 1.5; fill: none; }
    .ref-label {
      font-size: 10px; font-weight: 600;
      fill: var(--tc-chart-label, var(--tc-color-ink-muted, #6b7280));
    }
    .bar-cat-label {
      font-size: 11px;
      fill: var(--tc-chart-label, var(--tc-color-ink-muted, #6b7280));
    }
    .series-line {
      stroke-width: var(--tc-sw, 2);
      stroke-opacity: var(--tc-so, 1);
      fill: none;
      stroke-linejoin: round;
      stroke-linecap: round;
    }
    /* Per-series dash: opt out of the draw-in animation (which hijacks
       stroke-dasharray) and use the requested pattern instead. */
    .series-line.custom-dash {
      animation: none !important;
      stroke-dasharray: var(--tc-dash, 0);
      stroke-dashoffset: 0;
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
    /* Horizontal bars grow rightward from the value baseline. */
    rect.hit.hbar {
      transform-origin: left center;
      animation-name: tc-chart-hbar-grow;
    }
    @keyframes tc-chart-hbar-grow {
      from { transform: scaleX(0); }
      to   { transform: scaleX(1); }
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
      .series-line, .series-fill, .series-point, rect.hit, rect.hit.hbar, .series-segment.hit {
        animation: none !important;
        stroke-dashoffset: 0 !important;
        opacity: 1 !important;
        transform: none !important;
      }
    }
`;y(eo,b({props:{type:{type:"string",default:"line"},data:{type:"json",default:{series:[]}},height:{type:"string",default:"240px"},smooth:{type:"boolean",default:!0},stacked:{type:"boolean",default:!1},showLegend:{type:"boolean",default:!0},showAxes:{type:"boolean",default:!0},showGrid:{type:"boolean",default:!0},showLabels:{type:"boolean",default:!0},showValues:{type:"boolean",default:!1},innerRadius:{type:"number",default:.6},yMin:{type:"json",default:null},yMax:{type:"json",default:null},ariaLabel:{type:"string",default:"Chart"},colors:{type:"json",default:null},orientation:{type:"string",default:"vertical"},labelStride:{type:"number",default:0},maxLabels:{type:"number",default:0},labelAngle:{type:"number",default:0},valueFormat:{type:"string",default:"compact"},tickFormat:{type:"string",default:""},refLines:{type:"json",default:[]},legendPosition:{type:"string",default:"bottom"},centerLabel:{type:"string",default:""},centerValue:{type:"string",default:""},src:{type:"string",default:""},srcKey:{type:"string",default:""},loadingText:{type:"string",default:"Loading chart\u2026"},errorText:{type:"string",default:"Couldn't load chart data"}},theme:{"tc-chart-bg":"transparent","tc-chart-fg":"var(--tc-color-ink, #14171f)","tc-chart-axis":"var(--tc-color-rule-strong, #d9cfb8)","tc-chart-grid":"var(--tc-color-rule, #ece5d3)","tc-chart-label":"var(--tc-color-ink-muted, #6b7280)","tc-chart-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)"},styles:{display:"block"},stylesheet:co,template:({props:e,state:t})=>{let r=String(e.type??"line").toLowerCase(),n=["line","area","bar","sparkline","donut"].includes(r)?r:"line",o=e.data,a=t.fetched,s=!!o&&Array.isArray(o.series)&&o.series.length>0,i=s?o:a??{series:[]},l=Array.isArray(t.hiddenSeries)?t.hiddenSeries:[],d={labels:i.labels,series:(i.series??[]).filter(j=>!l.includes(j.name))},g=String(e.src??""),m=!!t.loading&&!s&&!a,c=g&&t.error?String(t.error):"",u=m?`<div class="overlay loading">${M(String(e.loadingText??"Loading chart\u2026"))}</div>`:c?`<div class="overlay error" role="alert">${M(String(e.errorText??"Couldn't load chart data"))}<small>${M(c)}</small></div>`:"",p=n==="sparkline",h=n==="donut",x=e.colors,E=Array.isArray(x)&&x.length>0?x:lo,$=String(e.valueFormat??"compact"),S=String(e.tickFormat??"")||$,H=n==="bar"&&String(e.orientation??"vertical").toLowerCase()==="horizontal",z=h?320:800,C=d.labels?.length??d.series[0]?.values?.length??0,W=h?320:H?Math.max(220,36+C*34):400,T={data:d,smooth:!!e.smooth,stacked:!!e.stacked,showAxes:!!e.showAxes,showGrid:!!e.showGrid,showLabels:!!e.showLabels,showValues:!!e.showValues,innerRadius:Number(e.innerRadius??.6),yMin:e.yMin==null?null:Number(e.yMin),yMax:e.yMax==null?null:Number(e.yMax),palette:E,W:z,H:W,orientation:H?"horizontal":"vertical",labelStride:Math.max(0,Number(e.labelStride??0)||0),maxLabels:Math.max(0,Number(e.maxLabels??0)||0),labelAngle:Number(e.labelAngle??0)||0,refLines:Array.isArray(e.refLines)?e.refLines:[],fmtV:jt($),fmtTick:jt(S)},D=h?ao(T,e):H?oo(T):ro(T,n),N=io(n,d),J=M(String(e.height??"240px")),F=h||H,k=["top","right","bottom"].includes(String(e.legendPosition??"bottom"))?String(e.legendPosition):"bottom",w=`root legend-${k}${F?" intrinsic":""}`,L=e.showLegend&&!p&&i.series&&i.series.length>0?so(i.series,E,l):"";return v`
        <div class="${w}" role="img" aria-label="${e.ariaLabel??"Chart"}">
          ${k==="top"?f(L):""}
          <div class="canvas" style="${F?"":`height:${f(J)};`}">
            <svg
              viewBox="0 0 ${z} ${W}"
              preserveAspectRatio="${F?"xMidYMid meet":"none"}"
              aria-hidden="true"
            >
              ${f(D)}
            </svg>
            <div class="tip" role="tooltip">
              <span class="tip-swatch"></span><span class="tip-text"></span>
            </div>
            ${f(u)}
          </div>
          ${k!=="top"?f(L):""}
          <span
            class="visually-hidden"
            style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;"
          >${N}</span>
        </div>
      `},events:{"click .hit":(e,t)=>{let r=e.target?.closest(".hit");if(!r||r.dataset.index==null)return;let n={series:r.dataset.series??"",index:Number(r.dataset.index),label:r.dataset.label??"",value:r.dataset.value!=null?Number(r.dataset.value):null};t.emit(r.classList.contains("series-segment")?"tc-segment-click":"tc-point-click",n)},"click .legend-item":(e,t)=>{let r=e.target?.closest(".legend-item");if(!r)return;let n=r.dataset.series;if(!n)return;let o=t.getState("hiddenSeries")??[],a=o.includes(n)?o.filter(s=>s!==n):[...o,n];t.setState("hiddenSeries",a)},"keydown .legend-item":(e,t)=>{let r=e;if(r.key!=="Enter"&&r.key!==" ")return;r.preventDefault();let o=r.target.closest(".legend-item")?.dataset.series;if(!o)return;let a=t.getState("hiddenSeries")??[],s=a.includes(o)?a.filter(i=>i!==o):[...a,o];t.setState("hiddenSeries",s)}},afterMount(){qt(this),Bt(this)},afterRender(){qt(this),Bt(this)},unmount(){let e=this;e._chartHoverCleanup?.(),e._chartFetchAborter?.abort()}}));function qt(e){let t=e;t._chartHoverCleanup?.();let r=t.shadowRoot;if(!r)return;let n=r.querySelector(".canvas"),o=r.querySelector(".tip"),a=o?.querySelector(".tip-text"),s=o?.querySelector(".tip-swatch");if(!n||!o||!a||!s)return;let i=()=>{o.removeAttribute("data-open"),o.style.transform="translate(-9999px, -9999px)"},l=g=>{let m=g.target?.closest?.("[data-tip]");if(!m){i();return}let c=m.getAttribute("data-tip")||"",u=m.getAttribute("data-color")||"currentColor";a.textContent=c,s.style.background=u;let p=n.getBoundingClientRect(),h=o.offsetWidth||100,x=o.offsetHeight||24,E=g.clientX-p.left,$=g.clientY-p.top,S=E+12,H=$-x-8;S+h>p.width-4&&(S=E-h-12),H<4&&(H=$+16),o.style.transform=`translate(${S}px, ${H}px)`,o.setAttribute("data-open","1")},d=()=>i();n.addEventListener("pointermove",l),n.addEventListener("pointerleave",d),t._chartHoverCleanup=()=>{n.removeEventListener("pointermove",l),n.removeEventListener("pointerleave",d),i()}}function Bt(e){let t=e,r=String(t.src??"").trim();if(!r||!t.getState||!t.setState||t.getState("fetchedFrom")===r)return;t._chartFetchAborter?.abort();let o=new AbortController;t._chartFetchAborter=o,t.setState("fetchedFrom",r),t.setState("fetched",null),t.setState("error",null),t.setState("loading",!0);let a=String(t.srcKey??"").trim();fetch(r,{signal:o.signal}).then(s=>{if(!s.ok)throw new Error(`${s.status} ${s.statusText}`);return s.json()}).then(s=>{let i=a?uo(s,a):s;if(!i||typeof i!="object"||!Array.isArray(i.series))throw new Error(a?`Payload at "${a}" doesn't look like ChartData`:"Payload doesn't look like ChartData");o.signal.aborted||(t.setState("fetched",i),t.setState("loading",!1))}).catch(s=>{o.signal.aborted||(t.setState("loading",!1),t.setState("error",s instanceof Error?s.message:String(s)))})}function uo(e,t){return t.split(".").reduce((r,n)=>r&&typeof r=="object"?r[n]:void 0,e)}var po="tc-editor";function re(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var V={bold:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h7a4 4 0 0 1 0 8H6z"/><path d="M6 12h8a4 4 0 0 1 0 8H6z"/></svg>',italic:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg>',underline:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3v8a6 6 0 0 0 12 0V3"/><line x1="4" y1="21" x2="20" y2="21"/></svg>',strike:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4H9a3 3 0 0 0-2.83 4"/><path d="M14 12a4 4 0 0 1 0 8H6"/><line x1="4" y1="12" x2="20" y2="12"/></svg>',h1:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6v12"/><path d="M12 6v12"/><path d="M4 12h8"/><path d="M17 18v-7l-2 2"/></svg>',h2:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6v12"/><path d="M12 6v12"/><path d="M4 12h8"/><path d="M16 18h5"/><path d="M16 15c0-2 2.5-2 2.5-2s2.5 0 2.5 2-3 4-5 5"/></svg>',h3:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6v12"/><path d="M12 6v12"/><path d="M4 12h8"/><path d="M16 11h5l-3 3a2.5 2.5 0 1 1-2 4"/></svg>',paragraph:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 4v16"/><path d="M19 4v16"/><path d="M19 4h-6a5 5 0 0 0 0 10h0"/></svg>',bullet:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1.2" fill="currentColor"/><circle cx="4" cy="12" r="1.2" fill="currentColor"/><circle cx="4" cy="18" r="1.2" fill="currentColor"/></svg>',ordered:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><path d="M4 8V4l-1 1"/><path d="M3 14h2l-2 3h2"/><path d="M3 20l1-1h1l1 1"/></svg>',quote:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21c0-7 7-12 14-12"/><path d="M7 7h3v6H4v-3a3 3 0 0 1 3-3z"/><path d="M16 7h3v6h-6v-3a3 3 0 0 1 3-3z"/></svg>',code:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',link:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',unlink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18.84 12.25l1.72-1.71a5 5 0 0 0-7.07-7.07L11.5 5"/><path d="M5.16 11.75l-1.72 1.71a5 5 0 0 0 7.07 7.07L12.5 19"/><line x1="2" y1="2" x2="22" y2="22"/></svg>',undo:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 7 3 13 9 13"/><path d="M21 17a8 8 0 0 0-15-3"/></svg>',redo:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="21 7 21 13 15 13"/><path d="M3 17a8 8 0 0 1 15-3"/></svg>',math:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h6l4 14h6"/><path d="M4 19l4-7-3-4"/></svg>',codeblock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><polyline points="9 9 7 12 9 15"/><polyline points="15 9 17 12 15 15"/></svg>'},_t="bold,italic,underline,strike,|,h1,h2,h3,paragraph,|,bullet,ordered,quote,code,codeblock,|,link,unlink,math,|,undo,redo",fo={bold:{key:"bold",label:"Bold",icon:V.bold,command:"bold",shortcut:"\u2318B"},italic:{key:"italic",label:"Italic",icon:V.italic,command:"italic",shortcut:"\u2318I"},underline:{key:"underline",label:"Underline",icon:V.underline,command:"underline",shortcut:"\u2318U"},strike:{key:"strike",label:"Strikethrough",icon:V.strike,command:"strikeThrough"},h1:{key:"h1",label:"Heading 1",icon:V.h1,command:"formatBlock",value:"h1"},h2:{key:"h2",label:"Heading 2",icon:V.h2,command:"formatBlock",value:"h2"},h3:{key:"h3",label:"Heading 3",icon:V.h3,command:"formatBlock",value:"h3"},paragraph:{key:"paragraph",label:"Paragraph",icon:V.paragraph,command:"formatBlock",value:"p"},bullet:{key:"bullet",label:"Bulleted list",icon:V.bullet,command:"insertUnorderedList"},ordered:{key:"ordered",label:"Ordered list",icon:V.ordered,command:"insertOrderedList"},quote:{key:"quote",label:"Blockquote",icon:V.quote,command:"formatBlock",value:"blockquote"},code:{key:"code",label:"Inline code",icon:V.code,command:"code"},link:{key:"link",label:"Insert link",icon:V.link,command:"link",shortcut:"\u2318K"},unlink:{key:"unlink",label:"Remove link",icon:V.unlink,command:"unlink"},undo:{key:"undo",label:"Undo",icon:V.undo,command:"undo",shortcut:"\u2318Z"},redo:{key:"redo",label:"Redo",icon:V.redo,command:"redo",shortcut:"\u2318\u21E7Z"},math:{key:"math",label:"Insert math (LaTeX)",icon:V.math,command:"math"},codeblock:{key:"codeblock",label:"Code block",icon:V.codeblock,command:"codeblock"}},go=`
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
`;y(po,b({props:{value:{type:"string",default:""},placeholder:{type:"string",default:"Start writing\u2026"},toolbar:{type:"string",default:_t},readonly:{type:"boolean",default:!1,reflect:!0},minHeight:{type:"string",default:"180px"},maxHeight:{type:"string",default:""},pasteAs:{type:"string",default:"text"}},theme:{"tc-editor-bg":"var(--tc-color-surface, #ffffff)","tc-editor-fg":"var(--tc-color-ink, #14171f)","tc-editor-rule":"var(--tc-color-rule, #ece5d3)","tc-editor-toolbar-bg":"var(--tc-color-bg, #faf8f3)","tc-editor-toolbar-rule":"var(--tc-color-rule, #ece5d3)","tc-editor-toolbar-fg":"var(--tc-color-ink-soft, #4a5061)","tc-editor-toolbar-active-bg":"var(--tc-color-accent-soft, #efe2cf)","tc-editor-toolbar-hover-bg":"rgba(20, 23, 31, 0.06)","tc-editor-placeholder":"var(--tc-color-ink-muted, #6b7280)","tc-editor-radius":"var(--tc-radius-md, 8px)","tc-editor-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-editor-mono-font":"var(--tc-font-mono, 'JetBrains Mono', ui-monospace, 'SF Mono', monospace)","tc-editor-line-height":"1.6"},styles:{display:"block"},stylesheet:go,template:({props:e})=>{let t=String(e.toolbar??_t),r=!!e.readonly,n=re(String(e.minHeight??"180px")),o=String(e.maxHeight??"").trim(),a=t.split(",").map(d=>d.trim()).filter(Boolean),s=a.map(d=>{if(d==="|")return'<span class="tb-sep" aria-hidden="true"></span>';let g=fo[d];if(!g)return"";let m=g.shortcut?` (${re(g.shortcut)})`:"";return`<button type="button" class="tb-btn" data-cmd="${re(g.command)}"${g.value?` data-val="${re(g.value)}"`:""} data-key="${re(g.key)}" title="${re(g.label)}${m}" aria-label="${re(g.label)}">${g.icon}</button>`}).join(""),i=a.length===0?"toolbar empty":r?"toolbar readonly":"toolbar",l=`--tc-editor-min-height: ${n};${o?`--tc-editor-max-height: ${re(o)};`:""}`;return v`
        <div class="root" style="${f(l)}">
          <div class="${i}" role="toolbar" aria-label="Formatting">
            ${f(s)}
            <slot name="toolbar-extra"></slot>
          </div>
          <div
            class="surface"
            contenteditable="${r?"false":"true"}"
            data-placeholder="${e.placeholder??""}"
            role="textbox"
            aria-multiline="true"
            spellcheck="true"
          >
          </div>
        </div>
      `},afterMount(){Ot(this),Vt(this)},afterRender(){let e=this,r=e.shadowRoot?.querySelector(".surface");if(r){let n=r.innerHTML,o=String(e.value??"");o&&n!==o&&document.activeElement!==e&&(r.innerHTML=o),Ke(r)}Ot(e),Vt(e)},unmount(){this._editorCleanup?.()}}));function Ke(e){let t=e.textContent?.trim()===""&&e.querySelector("img, hr, br")===null;e.dataset.empty=t?"true":"false"}function Ot(e){let t=e;t._editorCleanup?.();let r=t.shadowRoot;if(!r)return;let n=r.querySelector(".surface");if(!n)return;n.dataset.bootstrapped||(t.value&&(n.innerHTML=String(t.value)),n.dataset.bootstrapped="1"),Ke(n);let o=(c,u)=>{if(!t.readonly){if(n.focus(),c==="code"){let h=r.getSelection?.()??globalThis.getSelection();if(!h||h.rangeCount===0)return;let x=h.getRangeAt(0),E=x.extractContents(),$=document.createElement("code");$.className="tc-code-inline",$.appendChild(E),x.insertNode($),x.selectNodeContents($),h.removeAllRanges(),h.addRange(x)}else if(c==="link"){let p=globalThis.prompt("URL")?.trim();if(!p)return;document.execCommand("createLink",!1,p)}else if(c==="math"){let p=globalThis.prompt("LaTeX (e.g. E = mc^2). Wrap with $$ for display.")?.trim();if(!p)return;let h=p.startsWith("$$")&&p.endsWith("$$"),x=h?p.replace(/^\$\$|\$\$$/g,"").trim():p;mo(t,x,h)}else if(c==="codeblock"){let p=r.getSelection?.()??globalThis.getSelection();if(!p||p.rangeCount===0)return;let h=p.getRangeAt(0),x=h.toString()||"// code",E=document.createElement("pre"),$=document.createElement("code");$.textContent=x,E.appendChild($),h.deleteContents(),h.insertNode(E);let S=document.createRange();S.selectNodeContents($),S.collapse(!1),p.removeAllRanges(),p.addRange(S)}else c==="formatBlock"?document.execCommand("formatBlock",!1,`<${u??"p"}>`):document.execCommand(c,!1,u);Pt(t,n),Yt(r,n)}},a=c=>{let u=c.target?.closest?.(".tb-btn");if(!u)return;c.preventDefault();let p=u.dataset.cmd;p&&o(p,u.dataset.val)},s=()=>{Ke(n),Pt(t,n)},i=()=>{let c=n.innerHTML;t._lastEmitted!==c&&(t._lastEmitted=c,t.dispatchEvent(new CustomEvent("tc-change",{detail:{html:c},bubbles:!0,composed:!0})))},l=c=>{if(t.readonly||t.pasteAs!=="text")return;c.preventDefault();let u=c.clipboardData?.getData("text/plain")??"";document.execCommand("insertText",!1,u)},d=c=>{if(t.readonly||!(c.metaKey||c.ctrlKey))return;let u=c.key.toLowerCase();u==="b"?(c.preventDefault(),o("bold")):u==="i"?(c.preventDefault(),o("italic")):u==="u"?(c.preventDefault(),o("underline")):u==="k"&&(c.preventDefault(),o("link"))},g=()=>{let c=globalThis.getSelection();!c||!c.anchorNode||n.contains(c.anchorNode)&&Yt(r,n)},m=r.querySelector(".toolbar");m?.addEventListener("click",a),n.addEventListener("input",s),n.addEventListener("blur",i),n.addEventListener("paste",l),n.addEventListener("keydown",d),document.addEventListener("selectionchange",g),t._editorCleanup=()=>{m?.removeEventListener("click",a),n.removeEventListener("input",s),n.removeEventListener("blur",i),n.removeEventListener("paste",l),n.removeEventListener("keydown",d),document.removeEventListener("selectionchange",g)}}function Pt(e,t){let r=t.innerHTML;e.value=r,e.dispatchEvent(new CustomEvent("tc-input",{detail:{html:r},bubbles:!0,composed:!0}))}function mo(e,t,r){let n=e.shadowRoot;if(!n)return;let o=n.querySelector(".surface");if(!o)return;let a=n.getSelection?.()??globalThis.getSelection();if(!a||a.rangeCount===0)return;let s=a.getRangeAt(0),i=document.createElement(r?"div":"span");i.className=r?"tc-math display":"tc-math inline",i.setAttribute("contenteditable","false"),i.dataset.latex=t,i.innerHTML=Gt(e,t,r),s.deleteContents(),s.insertNode(i);let l=document.createTextNode("\u200B");i.parentNode?.insertBefore(l,i.nextSibling);let d=document.createRange();d.setStartAfter(l),d.collapse(!0),a.removeAllRanges(),a.addRange(d),e.dispatchEvent(new CustomEvent("tc-input",{detail:{html:o.innerHTML},bubbles:!0,composed:!0}))}function Gt(e,t,r){if(e.mathRenderer)try{return e.mathRenderer(t,r)}catch{}return`<code class="tc-math-src">${t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code>`}function Vt(e){let t=e.shadowRoot;if(!t)return;let r=t.querySelector(".surface");if(!r)return;r.querySelectorAll(".tc-math").forEach(o=>{let a=o,s=a.dataset.latex??"",i=a.classList.contains("display"),l=`${i?"d":"i"}:${s}`;a.dataset.stamp!==l&&(a.innerHTML=Gt(e,s,i),a.dataset.stamp=l)})}function Yt(e,t){e.querySelectorAll(".tb-btn").forEach(n=>{let o=n,a=o.dataset.cmd??"",s=o.dataset.val,i=!1;try{a==="formatBlock"&&s?i=(document.queryCommandValue("formatBlock")||"").toLowerCase().replace(/^[<]|[>]$/g,"")===s:(a==="bold"||a==="italic"||a==="underline"||a==="strikeThrough"||a==="insertOrderedList"||a==="insertUnorderedList")&&(i=document.queryCommandState(a))}catch{i=!1}o.classList.toggle("is-active",i)})}var ho="tc-markdown";function B(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var De="\0M\0";function bo(e,t){let r=[],n=(s,i)=>{let l=r.length;return r.push({latex:s,display:i}),`${De}${l}${De}`},o=e;o=o.replace(/\$\$([\s\S]+?)\$\$/g,(s,i)=>n(i.trim(),!0)),o=o.replace(/(^|[\s(])\$([^\$\n][^\$\n]*?)\$(?=[\s.,;:!?)\]]|$)/g,(s,i,l)=>`${i}${n(l.trim(),!1)}`);let a=B(o);return a=a.replace(/`([^`]+)`/g,"<code>$1</code>"),a=a.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>"),a=a.replace(/(?<!\*)\*([^*\n]+?)\*(?!\*)/g,"<em>$1</em>"),a=a.replace(/\b_(.+?)_\b/g,"<em>$1</em>"),a=a.replace(/~~(.+?)~~/g,"<del>$1</del>"),a=a.replace(/!\[([^\]]*)\]\(([^)]+)\)/g,(s,i,l)=>`<img src="${B(l)}" alt="${B(i)}" loading="lazy"/>`),a=a.replace(/\[([^\]]+)\]\(([^)]+)\)/g,(s,i,l)=>`<a href="${B(l)}" target="_blank" rel="noopener">${i}</a>`),a=a.replace(new RegExp(`${De}(\\d+)${De}`,"g"),(s,i)=>{let l=r[Number(i)];if(!l)return"";let d=l.latex;if(t)try{let g=t(d,l.display);return l.display?`<div class="tc-md-math display" data-latex="${B(d)}">${g}</div>`:`<span class="tc-md-math inline" data-latex="${B(d)}">${g}</span>`}catch(g){return l.display?`<div class="tc-md-math error" title="${B(String(g))}">${B(d)}</div>`:`<span class="tc-md-math error" title="${B(String(g))}">${B(d)}</span>`}return l.display?`<div class="tc-md-math fallback display" data-latex="${B(d)}"><code>${B(d)}</code></div>`:`<span class="tc-md-math fallback inline" data-latex="${B(d)}"><code>${B(d)}</code></span>`}),a}function vo(e){let t=e.match(/^\[([ xX])\]\s+(.*)$/);return t?`<li class="tc-md-task"><input type="checkbox" disabled${t[1].toLowerCase()==="x"?" checked":""}/><span>${t[2]}</span></li>`:""}function yo(e,t){let r=(a,s,i)=>{let l=i&&i!=="left"?` style="text-align:${i}"`:"";return`<${s}${l}>${a}</${s}>`},n=e[0]?.map((a,s)=>r(a,"th",t[s])).join("")??"",o=e.slice(1).map(a=>`<tr>${a.map((s,i)=>r(s,"td",t[i])).join("")}</tr>`).join("");return`<table class="tc-md-table"><thead><tr>${n}</tr></thead><tbody>${o}</tbody></table>`}function We(e,t){let r=t?.mathRenderer,n=t?.highlight,o=e.replace(/\r\n?/g,`
`).split(`
`),a=[],s=0,i=l=>bo(l,r);for(;s<o.length;){let l=o[s],d=l.match(/^:::\s*([a-zA-Z][\w-]*)(?:\s+(.+))?\s*$/);if(d){let p=d[1].toLowerCase(),h=(d[2]??"").trim(),x=[];for(s++;s<o.length&&!/^:::\s*$/.test(o[s]);)x.push(o[s]),s++;s<o.length&&s++;let E=We(x.join(`
`),t);a.push(`<div class="tc-md-callout v-${B(p)}" role="${p==="danger"?"alert":"note"}">${h?`<div class="callout-title">${i(h)}</div>`:""}<div class="callout-body">${E}</div></div>`);continue}let g=l.match(/^```(\S*)\s*$/);if(g){let p=g[1]??"",h=[];for(s++;s<o.length&&!/^```\s*$/.test(o[s]);)h.push(o[s]),s++;s<o.length&&s++;let x=h.join(`
`),E=n&&p?(()=>{try{return n(x,p)}catch{return B(x)}})():B(x),$=p?` class="lang-${B(p)}"`:"";a.push(`<pre><code${$}>${E}</code></pre>`);continue}let m=l.match(/^(#{1,6})\s+(.*)$/);if(m){let p=m[1].length;a.push(`<h${p}>${i(m[2])}</h${p}>`),s++;continue}if(/^(?:-\s*){3,}$|^(?:\*\s*){3,}$|^(?:_\s*){3,}$/.test(l.trim())){a.push("<hr/>"),s++;continue}if(/^\s*\|.+\|\s*$/.test(l)&&s+1<o.length&&/^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(o[s+1])){let p=l.trim().replace(/^\||\|$/g,"").split("|").map($=>$.trim()),h=o[s+1].trim().replace(/^\||\|$/g,"").split("|").map($=>{let S=$.trim(),H=S.startsWith(":"),z=S.endsWith(":");return H&&z?"center":z?"right":H?"left":""}),x=[];for(s+=2;s<o.length&&/^\s*\|.+\|\s*$/.test(o[s]);)x.push(o[s].trim().replace(/^\||\|$/g,"").split("|").map($=>i($.trim()))),s++;let E=[p.map($=>i($)),...x];a.push(yo(E,h));continue}if(/^>\s?/.test(l)){let p=[];for(;s<o.length&&/^>\s?/.test(o[s]);)p.push(o[s].replace(/^>\s?/,"")),s++;a.push(`<blockquote>${i(p.join(" "))}</blockquote>`);continue}let c=l.match(/^(\s*)(?:([-*+])|(\d+)\.)\s+(.*)$/);if(c){let p=!!c[3],h=p?"ol":"ul",x=[],E=!1;for(;s<o.length;){let S=o[s].match(/^(\s*)(?:([-*+])|(\d+)\.)\s+(.*)$/);if(!S||!!S[3]!==p)break;let z=S[4],C=vo(z);C?(E=!0,x.push(C)):x.push(`<li>${i(z)}</li>`),s++}let $=E?' class="tc-md-tasks"':"";a.push(`<${h}${$}>${x.join("")}</${h}>`);continue}if(l.trim()===""){s++;continue}let u=[l];for(s++;s<o.length;){let p=o[s];if(p.trim()===""||/^#{1,6}\s+/.test(p)||/^```/.test(p)||/^>\s?/.test(p)||/^:::/.test(p)||/^(\s*)(?:[-*+]|\d+\.)\s+/.test(p)||/^\s*\|.+\|\s*$/.test(p)||/^(?:-\s*){3,}$|^(?:\*\s*){3,}$|^(?:_\s*){3,}$/.test(p.trim()))break;u.push(p),s++}a.push(`<p>${i(u.join(" "))}</p>`)}return a.join(`
`)}var Kt={bold:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h7a4 4 0 0 1 0 8H6z"/><path d="M6 12h8a4 4 0 0 1 0 8H6z"/></svg>',italic:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg>',heading:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6v12"/><path d="M12 6v12"/><path d="M4 12h8"/><path d="M16 18l4-12"/></svg>',code:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',link:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',bullet:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1.2" fill="currentColor"/><circle cx="4" cy="12" r="1.2" fill="currentColor"/><circle cx="4" cy="18" r="1.2" fill="currentColor"/></svg>',ordered:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><path d="M4 8V4l-1 1"/><path d="M3 14h2l-2 3h2"/></svg>',quote:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h3v6H4v-3a3 3 0 0 1 3-3z"/><path d="M16 7h3v6h-6v-3a3 3 0 0 1 3-3z"/></svg>',preview:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>'};function Ue(e,t,r,n,o,a="text"){let s=e.slice(t,r)||a;return{text:e.slice(0,t)+n+s+o+e.slice(r),selStart:t+n.length,selEnd:t+n.length+s.length}}function je(e,t,r,n){let o=e.lastIndexOf(`
`,t-1)+1,a=(()=>{let l=e.indexOf(`
`,r);return l===-1?e.length:l})(),i=e.slice(o,a).split(`
`).map(l=>n+l).join(`
`);return{text:e.slice(0,o)+i+e.slice(a),selStart:o,selEnd:o+i.length}}var Xt={bold:{key:"bold",label:"Bold",shortcut:"\u2318B",apply:(e,t,r)=>Ue(e,t,r,"**","**","bold text")},italic:{key:"italic",label:"Italic",shortcut:"\u2318I",apply:(e,t,r)=>Ue(e,t,r,"*","*","italic text")},heading:{key:"heading",label:"Heading",apply:(e,t,r)=>je(e,t,r,"## ")},code:{key:"code",label:"Code",apply:(e,t,r)=>Ue(e,t,r,"`","`","code")},link:{key:"link",label:"Link",shortcut:"\u2318K",apply:(e,t,r)=>{let n=globalThis.prompt?.("URL")?.trim();if(!n)return{text:e,selStart:t,selEnd:r};let o=e.slice(t,r)||"link text";return{text:e.slice(0,t)+`[${o}](${n})`+e.slice(r),selStart:t+1,selEnd:t+1+o.length}}},bullet:{key:"bullet",label:"Bulleted list",apply:(e,t,r)=>je(e,t,r,"- ")},ordered:{key:"ordered",label:"Numbered list",apply:(e,t,r)=>je(e,t,r,"1. ")},quote:{key:"quote",label:"Quote",apply:(e,t,r)=>je(e,t,r,"> ")}},Ut="bold,italic,heading,|,bullet,ordered,quote,|,link,code",xo=`
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
`;y(ho,b({props:{value:{type:"string",default:""},placeholder:{type:"string",default:"Write some markdown\u2026"},mode:{type:"string",default:"split"},readonly:{type:"boolean",default:!1},minHeight:{type:"string",default:"240px"},toolbar:{type:"string",default:Ut}},theme:{"tc-md-bg":"var(--tc-color-surface, #ffffff)","tc-md-fg":"var(--tc-color-ink, #14171f)","tc-md-rule":"var(--tc-color-rule, #ece5d3)","tc-md-toolbar-bg":"var(--tc-color-bg, #faf8f3)","tc-md-preview-bg":"var(--tc-color-bg, #faf8f3)","tc-md-radius":"var(--tc-radius-md, 8px)","tc-md-font":"var(--tc-font-sans, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)","tc-md-mono-font":"var(--tc-font-mono, 'JetBrains Mono', ui-monospace, monospace)"},styles:{display:"block"},stylesheet:xo,refs:{source:"textarea",preview:".preview"},template:({props:e,state:t})=>{let r=String(t.mode??e.mode??"split"),n=String(e.value??""),o=String(e.toolbar??Ut).split(",").map(c=>c.trim()).filter(Boolean),a=o.map(c=>{if(c==="|")return'<span class="tb-sep" aria-hidden="true"></span>';let u=Xt[c];if(!u||!Kt[u.key])return"";let p=u.shortcut?` (${B(u.shortcut)})`:"";return`<button type="button" class="tb-btn" data-op="${B(u.key)}" title="${B(u.label)}${p}" aria-label="${B(u.label)}">${Kt[u.key]}</button>`}).join(""),s=(c,u)=>`<button type="button" data-mode="${c}" class="${r===c?"is-active":""}" aria-pressed="${r===c?"true":"false"}">${u}</button>`,i=e,d=(i.render??(c=>We(c,{mathRenderer:i.mathRenderer,highlight:i.highlight})))(n),g=r==="source"?"panes source-only":r==="preview"?"panes preview-only":"panes",m=`--tc-md-min-height: ${e.minHeight??"240px"};`;return v`
        <div class="root" style="${m}">
          <div class="${o.length===0?"toolbar empty":"toolbar"}" role="toolbar" aria-label="Markdown formatting">
            ${f(a)}
            <span class="tb-mode" role="tablist" aria-label="View mode">
              ${f(s("source","Source"))} ${f(s("split","Split"))} ${f(s("preview","Preview"))}
            </span>
          </div>
          <div class="${g}">
            <div class="source">
              <textarea
                placeholder="${e.placeholder??""}"
                ${f(e.readonly?"readonly":"")}
                spellcheck="true"
              >${n}</textarea>
            </div>
            <div class="preview">${f(d)}</div>
          </div>
        </div>
      `},afterMount(){Wt(this)},afterRender(){let e=this,t=e.shadowRoot?.querySelector("textarea");t&&document.activeElement!==e&&t.value!==String(e.value??"")&&(t.value=String(e.value??"")),Wt(e)},unmount(){this._mdCleanup?.()}}));function Wt(e){let t=e;t._mdCleanup?.();let r=t.shadowRoot;if(!r)return;let n=r.querySelector("textarea"),o=r.querySelector(".preview"),a=r.querySelector(".toolbar"),s=r.querySelector(".tb-mode");if(!n||!o)return;let i=t.render&&typeof t.render=="function"?t.render:p=>We(p,{mathRenderer:t.mathRenderer,highlight:t.highlight}),l=()=>{let p=n.value;t.value=p;let h=i(p);o.innerHTML=h,t.dispatchEvent(new CustomEvent("tc-input",{detail:{markdown:p,html:h},bubbles:!0,composed:!0}))},d=()=>l(),g=()=>{t.dispatchEvent(new CustomEvent("tc-change",{detail:{markdown:n.value,html:i(n.value)},bubbles:!0,composed:!0}))},m=p=>{let h=p.target?.closest?.(".tb-btn");if(!h)return;p.preventDefault();let x=h.dataset.op;x&&(qe(n,x),l())},c=p=>{let h=p.target?.closest?.("[data-mode]");if(!h)return;let x=h.dataset.mode;x&&t.setState?.("mode",x)},u=p=>{if(!(p.metaKey||p.ctrlKey))return;let h=p.key.toLowerCase();h==="b"?(p.preventDefault(),qe(n,"bold"),l()):h==="i"?(p.preventDefault(),qe(n,"italic"),l()):h==="k"&&(p.preventDefault(),qe(n,"link"),l())};n.addEventListener("input",d),n.addEventListener("blur",g),n.addEventListener("keydown",u),a?.addEventListener("click",m),s?.addEventListener("click",c),t._mdCleanup=()=>{n.removeEventListener("input",d),n.removeEventListener("blur",g),n.removeEventListener("keydown",u),a?.removeEventListener("click",m),s?.removeEventListener("click",c)}}function qe(e,t){let r=Xt[t];if(!r)return;let n=e.selectionStart??e.value.length,o=e.selectionEnd??e.value.length,a=r.apply(e.value,n,o);e.value=a.text,e.focus(),e.setSelectionRange(a.selStart,a.selEnd)}var Xe={"alert-circle":'<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',"alert-triangle":'<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',info:'<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',check:'<polyline points="20 6 9 17 4 12"/>',"check-circle":'<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',x:'<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',"x-circle":'<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>',"arrow-right":'<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',"arrow-left":'<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',"arrow-up":'<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>',"arrow-down":'<line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>',"chevron-right":'<polyline points="9 18 15 12 9 6"/>',"chevron-left":'<polyline points="15 18 9 12 15 6"/>',"chevron-up":'<polyline points="18 15 12 9 6 15"/>',"chevron-down":'<polyline points="6 9 12 15 18 9"/>',"external-link":'<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',plus:'<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',minus:'<line x1="5" y1="12" x2="19" y2="12"/>',search:'<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',filter:'<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',"more-horizontal":'<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',"more-vertical":'<circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>',settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>',edit:'<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="m18.5 2.5 a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z"/>',trash:'<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',copy:'<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',save:'<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>',download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',user:'<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',users:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',mail:'<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/>',calendar:'<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',clock:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',home:'<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',menu:'<line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>',"log-out":'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',"log-in":'<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>',moon:'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',sun:'<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',eye:'<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',"eye-off":'<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>',loader:'<line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>',refresh:'<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>',banknote:'<rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>',calculator:'<rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/>',coins:'<path d="M13.744 17.736a6 6 0 1 1-7.48-7.48"/><path d="M15 6h1v4"/><path d="m6.134 14.768.866-.5 2 3.464"/><circle cx="16" cy="8" r="6"/>',"credit-card":'<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>',"dollar-sign":'<line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',landmark:'<path d="M10 18v-7"/><path d="M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="M3 22h18"/><path d="M6 18v-7"/>',percent:'<line x1="19" x2="5" y1="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',"piggy-bank":'<path d="M11 17h3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a3.16 3.16 0 0 0 2-2h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a5 5 0 0 0-2-4V3a4 4 0 0 0-3.2 1.6l-.3.4H11a6 6 0 0 0-6 6v1a5 5 0 0 0 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z"/><path d="M16 10h.01"/><path d="M2 8v1a2 2 0 0 0 2 2h1"/>',receipt:'<path d="M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z"/><path d="M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8"/><path d="M12 17V7"/>',wallet:'<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',"bar-chart":'<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M7 16h8"/><path d="M7 11h12"/><path d="M7 6h3"/>',"pie-chart":'<path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"/><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>',"trending-down":'<path d="M16 17h6v-6"/><path d="m22 17-8.5-8.5-5 5L2 7"/>',"trending-up":'<path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/>',gift:'<path d="M12 7v14"/><path d="M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/><path d="M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5"/><rect x="3" y="7" width="18" height="4" rx="1"/>',package:'<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><polyline points="3.29 7 12 12 20.71 7"/><path d="m7.5 4.27 9 5.15"/>',"shopping-bag":'<path d="M16 10a4 4 0 0 1-8 0"/><path d="M3.103 6.034h17.794"/><path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"/>',"shopping-cart":'<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',tag:'<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>',truck:'<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',bell:'<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>',"message-square":'<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/>',phone:'<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>',send:'<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',clipboard:'<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>',"file-text":'<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',folder:'<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',image:'<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',paperclip:'<path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551"/>',printer:'<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/><rect x="6" y="14" width="12" height="8" rx="1"/>',key:'<path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"/><path d="m21 2-9.6 9.6"/><circle cx="7.5" cy="15.5" r="5.5"/>',lock:'<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',shield:'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',unlock:'<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',link:'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',"map-pin":'<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',bookmark:'<path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"/>',heart:'<path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>',star:'<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>',grid:'<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',list:'<path d="M3 5h.01"/><path d="M3 12h.01"/><path d="M3 19h.01"/><path d="M8 5h13"/><path d="M8 12h13"/><path d="M8 19h13"/>',"user-check":'<path d="m16 11 2 2 4-4"/><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>',"user-plus":'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/>',ai:'<path d="M10 4 L11 8 L15 9 L11 10 L10 14 L9 10 L5 9 L9 8 Z"/><path d="M18 14 L18.6 16.4 L21 17 L18.6 17.6 L18 20 L17.4 17.6 L15 17 L17.4 16.4 Z"/><path d="M18 3 L18.4 4.6 L20 5 L18.4 5.4 L18 7 L17.6 5.4 L16 5 L17.6 4.6 Z"/>',confetti:'<circle cx="5" cy="5" r="1" fill="currentColor"/><circle cx="19" cy="6" r="1.5"/><circle cx="4" cy="14" r="1" fill="currentColor"/><circle cx="20" cy="16" r="1.2"/><path d="M9 20l1 2"/><path d="M15 20l-1 2"/><path d="M12 3l1 2"/><rect x="10" y="9" width="2.5" height="6" rx="1" transform="rotate(20 11.25 12)" fill="currentColor"/>',forecast:'<path d="M3 17l5-5 4 4 4-6"/><path d="M16 10l4-3" stroke-dasharray="3 3"/><circle cx="16" cy="10" r="1.5" fill="currentColor"/>',pulse:'<circle cx="12" cy="12" r="2" fill="currentColor"/><path d="M16.5 7.5a7 7 0 0 1 0 9"/><path d="M7.5 7.5a7 7 0 0 0 0 9"/><path d="M19.5 4.5a11 11 0 0 1 0 15"/><path d="M4.5 4.5a11 11 0 0 0 0 15"/>',"receipt-scan":'<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M8 9h8"/><path d="M8 13h8"/><path d="M8 17h5"/>',recurring:'<path d="M21 12a9 9 0 0 1-15 6.7"/><path d="M3 12a9 9 0 0 1 15-6.7"/><polyline points="21 4 21 9 16 9"/><polyline points="3 20 3 15 8 15"/><circle cx="12" cy="12" r="2" fill="currentColor"/>',spark:'<path d="M12 4 L13.6 10.4 L20 12 L13.6 13.6 L12 20 L10.4 13.6 L4 12 L10.4 10.4 Z"/><circle cx="19" cy="5" r="1" fill="currentColor"/>',subscription:'<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/><path d="M9 16.5a3 3 0 0 1 5.5-1.6"/><polyline points="15 13 15 15 13 15"/>',token:'<path d="M12 2l8 5v10l-8 5-8-5V7z"/><path d="M12 8v8"/><path d="M14 10h-3a1.5 1.5 0 0 0 0 3h2a1.5 1.5 0 0 1 0 3H10"/>',verified:'<path d="M12 2 L20 7 V17 L12 22 L4 17 V7 Z"/><polyline points="8 12 11 15 16 9"/>'},ko=Object.freeze(Object.keys(Xe));var wo="tc-icon";y(wo,b({props:{name:{type:"string",default:""},size:{type:"string",default:"1em"},stroke:{type:"string",default:"currentColor"},fill:{type:"string",default:"none"},title:{type:"string",default:""}},styles:{display:"inline-flex","align-items":"center","justify-content":"center","vertical-align":"middle","line-height":"1"},template:({props:e})=>{let t=String(e.name??""),r=Xe[t],n=String(e.size??"1em"),o=String(e.stroke??"currentColor"),a=String(e.fill??"none"),s=String(e.title??"");if(!r)return`
          <svg width="${ne(n)}" height="${ne(n)}" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="1.5"
               stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <text x="12" y="14.5" text-anchor="middle" font-size="6" font-family="monospace" stroke="none" fill="currentColor">?</text>
          </svg>
        `;let i=s?`role="img" aria-label="${ne(s)}"`:'aria-hidden="true"';return`
        <svg
          width="${ne(n)}"
          height="${ne(n)}"
          viewBox="0 0 24 24"
          fill="${ne(a)}"
          stroke="${ne(o)}"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          ${i}
        >${s?`<title>${ne(s)}</title>`:""}${r}</svg>
      `}}));function ne(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var $o="site-nav";var Eo='<svg class="nav-caret" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>';y($o,b({props:{active:{type:"string",default:""},version:{type:"string",default:"v1.1.0"},base:{type:"string",default:""}},styles:{display:"block"},template:({props:e})=>{let t=String(e.base??""),r=String(e.active??""),n=[{id:"docs",label:"Docs",href:`${t}docs.html`},{id:"components",label:"Components",href:`${t}components.html`}],o=[{id:"icons",label:"Icons",href:`${t}icons.html`},{id:"themes",label:"Themes",href:`${t}themes.html`},{id:"examples",label:"Examples",href:`${t}examples.html`},{id:"playground",label:"Playground",href:`${t}playground.html`}],a=[{id:"blog",label:"Blog",href:`${t}blog/`},{id:"github",label:"GitHub",href:"https://github.com/ra9/tan-compose",external:!0}],s=(l,d="")=>{let g=l.id===r,m=[d,g?"active":""].filter(Boolean).join(" "),c=g?' aria-current="page"':"",u=l.external?' target="_blank" rel="noopener"':"";return`<a href="${Se(l.href)}"${c}${u}${m?` class="${m}"`:""}>${Se(l.label)}</a>`},i=o.some(l=>l.id===r);return`
        <header class="topbar">
          <div class="inner">
            <a class="brand" href="${Se(t)}index.html">
              <svg class="brand-mark" viewBox="0 0 64 64" fill="none" aria-hidden="true"><rect x="8" y="8" width="32" height="32" rx="6" fill="#14171f" opacity="0.55"/><rect x="16" y="16" width="32" height="32" rx="6" fill="#14171f" opacity="0.75"/><rect x="24" y="24" width="32" height="32" rx="6" fill="#a16939"/></svg>
              tan-compose
              <span class="version-pill">${Se(e.version)}</span>
            </a>

            <site-search base="${Se(t)}" class="nav-search"></site-search>

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
                  Resources ${Eo}
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
      `},afterMount(){let e=this,t=e.shadowRoot;if(!t)return;let r=t.querySelector(".nav-toggle"),n=t.querySelector(".nav-menu"),o=Array.from(t.querySelectorAll(".nav-group")),a=(c,u)=>{c.classList.toggle("open",u),c.querySelector(".nav-group-trigger")?.setAttribute("aria-expanded",u?"true":"false")},s=c=>{for(let u of o)u!==c&&a(u,!1)},i=()=>{n?.classList.remove("open"),r?.setAttribute("aria-expanded","false"),r?.setAttribute("aria-label","Open menu")},l=c=>{c.preventDefault();let u=!n?.classList.contains("open");n?.classList.toggle("open",u),r?.setAttribute("aria-expanded",u?"true":"false"),r?.setAttribute("aria-label",u?"Close menu":"Open menu")};r?.addEventListener("click",l);let d=[];for(let c of o){let u=c.querySelector(".nav-group-trigger");if(!u)continue;let p=h=>{h.preventDefault();let x=!c.classList.contains("open");s(c),a(c,x)};u.addEventListener("click",p),d.push([u,p])}let g=c=>{let u=c.composedPath();for(let p of o)u.includes(p)||a(p,!1);n&&!u.includes(n)&&!(r&&u.includes(r))&&i()},m=c=>{c.key==="Escape"&&(s(),n?.classList.contains("open")&&(i(),r?.focus()))};document.addEventListener("click",g),document.addEventListener("keydown",m),e._navCleanup=()=>{r?.removeEventListener("click",l);for(let[c,u]of d)c.removeEventListener("click",u);document.removeEventListener("click",g),document.removeEventListener("keydown",m)}},unmount(){this._navCleanup?.()}}));function Se(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Mo="site-footer";y(Mo,b({props:{base:{type:"string",default:""},year:{type:"string",default:"2026"}},styles:{display:"block"},template:({props:e})=>{let t=String(e.base??"");return`
        <footer class="foot">
          <div class="inner">
            <p>&copy; ${pe(e.year)} Tan Compose \xB7 MIT License</p>
            <div class="links">
              <a href="${pe(t)}docs.html">Docs</a>
              <a href="${pe(t)}components.html">Components</a>
              <a href="${pe(t)}themes.html">Themes</a>
              <a href="${pe(t)}playground.html">Playground</a>
              <a href="${pe(t)}blog/">Blog</a>
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
      `}}));function pe(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var So="site-search";var oe=null,Be=null;function Fe(e){if(oe)return Promise.resolve(oe);if(Be)return Be;let t=`${e}search.json`;return Be=fetch(t).then(r=>r.json()).then(r=>(oe=r.docs??[],oe)).catch(r=>(console.warn("[site-search] failed to load index:",r),oe=[],oe)),Be}function Jt(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Zt(e,t){let r=e.trim().toLowerCase();if(!r)return[];let n=r.split(/\s+/).filter(Boolean).map(a=>({raw:a,re:new RegExp(Jt(a),"i")})),o=[];for(let a of t){let s=a.title.toLowerCase(),i=(a.description??"").toLowerCase(),l=(a.text??"").toLowerCase(),d=0;for(let m of n){let c=m.raw;s===c&&(d+=50),s.startsWith(c)&&(d+=20),s.includes(c)&&(d+=10),i.includes(c)&&(d+=5),l.includes(c)&&(d+=1)}n.every(m=>m.re.test(a.title)||m.re.test(i)||m.re.test(l))&&d!==0&&(a.category==="blog"&&a.date&&(Date.now()-new Date(a.date).getTime())/864e5<30&&(d+=3),o.push({doc:a,score:d}))}return o.sort((a,s)=>s.score-a.score),o.slice(0,12)}function Lo(e,t,r=140){let n=e.trim().toLowerCase().split(/\s+/)[0];if(!n)return t.slice(0,r);let a=t.toLowerCase().indexOf(n);if(a===-1)return t.slice(0,r);let s=Math.max(0,a-40),i=Math.min(t.length,s+r),l=s>0?"\u2026 ":"",d=i<t.length?" \u2026":"";return l+t.slice(s,i)+d}function ae(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ze(e,t){let r=t.trim();if(!r)return ae(e);let n=r.split(/\s+/).filter(Boolean),o=ae(e);for(let a of n){let s=new RegExp(`(${Jt(ae(a))})`,"gi");o=o.replace(s,"<mark>$1</mark>")}return o}function To(e){e.setState("open",!1),e.setState("query",""),e.setState("results",[]),e.setState("focusIdx",0)}var Ho=`
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
`;y(So,b({props:{base:{type:"string",default:""}},styles:{display:"inline-block"},refs:{input:".search-input",results:".results",dialog:"dialog.modal"},template:({props:e,state:t})=>{let r=String(e.base??""),n=String(t.query??""),o=Number(t.focusIdx??0),a=t.results??[],s=`
        <button type="button" class="trigger" aria-label="Search the site (\u2318K)">
          <svg class="trigger-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <span class="trigger-label">Search</span>
          <kbd class="trigger-kbd" aria-hidden="true">\u2318K</kbd>
        </button>
      `,i=n.trim()===""?'<div class="empty">Start typing to search the site \u2014 docs, components, blog posts, examples.</div>':a.length===0?`<div class="empty">No results for "${ae(n)}". Try a shorter query.</div>`:a.map((d,g)=>{let m=g===o?"row focused":"row",c=r+d.doc.url.replace(/^\//,""),u=Lo(n,d.doc.text);return`
              <a class="${m}" data-index="${g}" href="${ae(c)}">
                <span class="row-cat ${ae(d.doc.category)}">${ae(d.doc.category)}</span>
                <div class="row-main">
                  <div class="row-title">${Ze(d.doc.title,n)}</div>
                  <div class="row-desc">${Ze(d.doc.description,n)}</div>
                  <div class="row-snippet">${Ze(u,n)}</div>
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
              value="${ae(n)}"
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
      `;return s+l+Ho},events:{"click .trigger":(e,t)=>{let r=t.host,n=String(r.base??"");t.setState("open",!0),t.setState("query",""),t.setState("focusIdx",0),t.setState("results",[]),Fe(n)},"click .close":(e,t)=>To(t),"input .search-input":(e,t)=>{let r=e.target.value,n=t.host,o=String(n.base??"");t.setState("query",r),t.setState("focusIdx",0),oe?t.setState("results",Zt(r,oe)):Fe(o).then(a=>{t.setState("results",Zt(r,a))})},"keydown .search-input":(e,t)=>{let r=e,n=t.getState("results")??[],o=Number(t.getState("focusIdx")??0);if(r.key==="ArrowDown"){if(r.preventDefault(),n.length===0)return;t.setState("focusIdx",Math.min(n.length-1,o+1));return}if(r.key==="ArrowUp"){if(r.preventDefault(),n.length===0)return;t.setState("focusIdx",Math.max(0,o-1));return}if(r.key==="Enter"){if(n.length===0)return;r.preventDefault();let a=n[o];if(a){let s=t.host,l=String(s.base??"")+a.doc.url.replace(/^\//,"");globalThis.location.href=l}return}},"mouseover .row":(e,t)=>{let r=e.target.closest(".row");if(!r)return;let n=Number(r.dataset.index);Number.isNaN(n)||t.setState("focusIdx",n)}},afterMount(){let e=this,t=r=>{if(r.key.toLowerCase()==="k"&&(r.metaKey||r.ctrlKey)&&!r.altKey){if(r.preventDefault(),!e.setState)return;e.setState("open",!0),e.setState("query",""),e.setState("focusIdx",0),e.setState("results",[]),Fe(String(e.base??""));return}if(r.key==="/"&&!r.metaKey&&!r.ctrlKey&&!r.altKey){let n=document.activeElement,o=n?.tagName.toLowerCase();if(o==="input"||o==="textarea"||n?.isContentEditable===!0||(r.preventDefault(),!e.setState))return;e.setState("open",!0),e.setState("query",""),e.setState("focusIdx",0),e.setState("results",[]),Fe(String(e.base??""))}};document.addEventListener("keydown",t),e._searchKeyHandler=t},unmount(){let e=this;e._searchKeyHandler&&document.removeEventListener("keydown",e._searchKeyHandler)},afterRender(){let e=this,t=e.refs?.dialog??null;if(!t)return;let r=e.getState?!!e.getState("open"):!1;if(r&&!t.open){t.showModal(),(e.refs?.input??null)?.focus(),t.addEventListener("close",()=>{e.getState?.("open")&&(e.setState?.("open",!1),e.setState?.("query",""),e.setState?.("results",[]),e.setState?.("focusIdx",0))}),t.addEventListener("click",o=>{o.target===t&&t.close()});return}if(!r&&t.open){t.close();return}if(r){let n=e.refs?.input??null;n&&e.shadowRoot?.activeElement!==n&&n.focus()}}}));
//# sourceMappingURL=site.js.map
