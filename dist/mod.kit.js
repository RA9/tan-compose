var H=["beforeMount","afterMount","unmount","action","formAssociatedCallback","formDisabledCallback","formResetCallback","formStateRestoreCallback"],P=new Set(["string","number","boolean","json"]);function m(e){if(e===null||typeof e!="object")throw new TypeError("describe(): options must be an object");if(e.tag!==void 0&&typeof e.tag!="string")throw new TypeError("describe(): `tag` must be a string");if(e.className!==void 0&&typeof e.className!="string")throw new TypeError("describe(): `className` must be a string");if(e.template!==void 0&&typeof e.template!="string"&&typeof e.template!="function")throw new TypeError("describe(): `template` must be a string or function");if(e.children!==void 0&&!Array.isArray(e.children))throw new TypeError("describe(): `children` must be an array");if(e.emit!==void 0&&!Array.isArray(e.emit))throw new TypeError("describe(): `emit` must be an array");if(e.observedAttributes!==void 0&&(!Array.isArray(e.observedAttributes)||e.observedAttributes.some(t=>typeof t!="string")))throw new TypeError("describe(): `observedAttributes` must be an array of strings");for(let t of["theme","styles","attributes","events","refs"]){let r=e[t];if(r!==void 0&&(r===null||typeof r!="object"||Array.isArray(r)))throw new TypeError(`describe(): \`${t}\` must be a record`)}if(e.refs!==void 0){for(let[t,r]of Object.entries(e.refs))if(typeof r!="string")throw new TypeError(`describe(): refs.${t} must be a CSS selector string`)}if(e.formAssociated!==void 0&&typeof e.formAssociated!="boolean")throw new TypeError("describe(): `formAssociated` must be a boolean");for(let t of H){let r=e[t];if(r!==void 0&&typeof r!="function")throw new TypeError(`describe(): \`${t}\` must be a function`)}if(e.if!==void 0&&typeof e.if!="function")throw new TypeError("describe(): `if` must be a function");if(e.for!==void 0){let t=e.for;if(t===null||typeof t!="object"||Array.isArray(t))throw new TypeError("describe(): `for` must be a record");if(typeof t.items!="function")throw new TypeError("describe(): `for.items` must be a function");if(typeof t.key!="function")throw new TypeError("describe(): `for.key` must be a function");if(typeof t.render!="function")throw new TypeError("describe(): `for.render` must be a function");if(e.children!==void 0)throw new TypeError("describe(): cannot set both `children` and `for` on the same node")}if(e.props!==void 0){let t=e.props;if(t===null||typeof t!="object"||Array.isArray(t))throw new TypeError("describe(): `props` must be a record");for(let[r,s]of Object.entries(t)){if(s===null||typeof s!="object"||Array.isArray(s))throw new TypeError(`describe(): props.${r} must be a record`);if(!P.has(s.type))throw new TypeError(`describe(): props.${r}.type must be one of "string", "number", "boolean", "json"`)}}return{...e}}var x=new Map,N=/^[a-z][a-z0-9]*(-[a-z0-9]+)+$/,q=/^(\S+)(?:\s+(.+))?$/;function h(e,t){if(typeof e!="string"||!N.test(e))throw new TypeError(`build(): "${e}" is not a valid custom element name (must be lowercase and contain a hyphen).`);if(x.has(e))return console.warn(`Component "${e}" is already registered. Skipping re-registration.`),e;if(typeof HTMLElement>"u"||typeof customElements>"u")return console.warn("HTMLElement or customElements not available; skipping component registration."),e;let r=Array.from(new Set([...t.observedAttributes??[],...Object.keys(t.props??{})])),s=t.props??{},a=t.refs??{},i=V(t);class u extends HTMLElement{static get observedAttributes(){return r}static get formAssociated(){return t.formAssociated===!0}isMounted=!1;mountCleanups=[];renderCleanups=[];state=new Map;propValues=new Map;listSlots=new WeakMap;currentRefs={};container;ctx;rendering=!1;renderQueued=!1;internals;constructor(){super();let n=this.attachShadow({mode:"open"});t.formAssociated&&typeof this.attachInternals=="function"&&(this.internals=this.attachInternals()),_(n,i),this.container=document.createElement("div"),this.container.className=t.className?`container ${t.className}`:"container",n.appendChild(this.container),t.attributes&&R(this,t.attributes),this.ctx=K(this,this.propValues,this.state,()=>this.currentRefs),this.initProps()}get refs(){return this.currentRefs}initProps(){for(let[n,o]of Object.entries(s)){let l=this.getAttribute(n),c=l!==null?C(l,o.type):o.default;this.propValues.set(n,c),this.maybeSyncFormValue(n,c),Object.defineProperty(this,n,{configurable:!0,enumerable:!0,get:()=>this.propValues.get(n),set:d=>{let f=Q(d,o.type),b=this.propValues.get(n);Object.is(b,f)||(this.propValues.set(n,f),o.reflect&&U(this,n,f,o.type),this.maybeSyncFormValue(n,f),this.isMounted&&this.scheduleRender())}})}}maybeSyncFormValue(n,o){if(!this.internals||n!=="value")return;let l=o==null?null:String(o);this.internals.setFormValue(l)}connectedCallback(){if(!this.isMounted){try{t.beforeMount?.call(this)}catch(n){console.error(`[tan-compose] beforeMount threw for <${e}>:`,n)}if(this.renderInternal(),t.action){let n=t.action;this.addEventListener("click",n),this.mountCleanups.push(()=>this.removeEventListener("click",n))}if(t.emit)for(let n of t.emit)this.addEventListener(n.name,n.handler),this.mountCleanups.push(()=>this.removeEventListener(n.name,n.handler));t.events&&this.attachDelegatedEvents(t.events),this.isMounted=!0;try{t.afterMount?.call(this)}catch(n){console.error(`[tan-compose] afterMount threw for <${e}>:`,n)}}}disconnectedCallback(){try{t.unmount?.call(this)}catch(n){console.error(`[tan-compose] unmount threw for <${e}>:`,n)}g(this.mountCleanups),g(this.renderCleanups),this.flushListSlots(),this.isMounted=!1}flushListSlots(){$(t,n=>{let o=this.listSlots.get(n);if(o){for(let l of o.cache.values())g(l.cleanups);o.cache.clear()}})}attributeChangedCallback(n,o,l){if(o!==l){if(Object.prototype.hasOwnProperty.call(s,n)){let c=s[n],d=l!==null?C(l,c.type):c.default,f=this.propValues.get(n);Object.is(f,d)||(this.propValues.set(n,d),this.isMounted&&this.scheduleRender());return}this.state.set(n,l),this.isMounted&&this.scheduleRender()}}setState(n,o){let l=this.state.get(n);Object.is(l,o)||(this.state.set(n,o),this.isMounted&&this.scheduleRender())}getState(n){return this.state.get(n)}render(){this.renderInternal()}emitEvent(n,o){this.dispatchEvent(new CustomEvent(n,{detail:o,bubbles:!0,composed:!0}))}scheduleRender(){if(this.rendering){this.renderQueued=!0;return}this.renderInternal()}getOrCreateSlot(n){let o=this.listSlots.get(n);return o||(o={cache:new Map},this.listSlots.set(n,o)),o}renderInternal(){this.rendering=!0;try{g(this.renderCleanups),this.container.replaceChildren();let n={host:this,cleanups:this.renderCleanups,ctx:this.ctx};if(t.template!==void 0){let o=typeof t.template=="function"?t.template(this.ctx):t.template;o&&(this.container.innerHTML=o)}if(t.children)for(let o of t.children){let l=E(o,n,c=>this.getOrCreateSlot(c));l&&this.container.appendChild(l)}this.container.appendChild(document.createElement("slot")),this.refreshRefs()}finally{this.rendering=!1}this.renderQueued&&(this.renderQueued=!1,this.renderInternal())}refreshRefs(){let n={},o=this.shadowRoot;for(let[l,c]of Object.entries(a))n[l]=o?o.querySelector(c):null;this.currentRefs=n}formAssociatedCallback(n){try{t.formAssociatedCallback?.call(this,n)}catch(o){console.error(`[tan-compose] formAssociatedCallback threw for <${e}>:`,o)}}formDisabledCallback(n){try{t.formDisabledCallback?.call(this,n)}catch(o){console.error(`[tan-compose] formDisabledCallback threw for <${e}>:`,o)}}formResetCallback(){try{t.formResetCallback?.call(this)}catch(n){console.error(`[tan-compose] formResetCallback threw for <${e}>:`,n)}}formStateRestoreCallback(n,o){try{t.formStateRestoreCallback?.call(this,n,o)}catch(l){console.error(`[tan-compose] formStateRestoreCallback threw for <${e}>:`,l)}}attachDelegatedEvents(n){let o=new Map;for(let[l,c]of Object.entries(n)){let d=q.exec(l.trim());if(!d)continue;let[,f,b]=d;o.has(f)||o.set(f,[]),o.get(f).push({selector:b??null,handler:c})}for(let[l,c]of o){let d=f=>{for(let{selector:b,handler:S}of c){if(!b){S(f,this.ctx);continue}let z=f.composedPath();for(let v of z){if(v===this.shadowRoot||v===this)break;if(v instanceof Element&&this.shadowRoot?.contains(v)&&v.matches(b)){S(f,this.ctx);break}}}};this.shadowRoot.addEventListener(l,d),this.mountCleanups.push(()=>this.shadowRoot?.removeEventListener(l,d))}}}return x.set(e,u),customElements.define(e,u),e}function E(e,t,r){return e.if&&!e.if(t.ctx)?null:e.for?F(e,t,r):T(e,t,r)}function T(e,t,r){let s=document.createElement(e.tag||"div");if(e.styles&&(s.style.cssText=Object.entries(e.styles).map(([a,i])=>`${a}: ${i}`).join("; ")),e.className&&(s.className=e.className),e.attributes&&R(s,e.attributes),e.template!==void 0){let a=typeof e.template=="function"?e.template(t.ctx):e.template;a&&(s.innerHTML=a)}if(e.children)for(let a of e.children){let i=E(a,t,r);i&&s.appendChild(i)}if(e.action){let a=e.action;s.addEventListener("click",a),t.cleanups.push(()=>s.removeEventListener("click",a))}if(e.emit)for(let a of e.emit)s.addEventListener(a.name,a.handler),t.cleanups.push(()=>s.removeEventListener(a.name,a.handler));return s}function F(e,t,r){let s=e.for,a=r(e),i=s.items(t.ctx),u=new Map,p=document.createDocumentFragment();for(let n=0;n<i.length;n++){let o=i[n],l=s.key(o,n),c,d=a.cache.get(l);if(d&&Object.is(d.lastItem,o))c=d;else{let f=[],b=s.render(o,n,t.ctx),S=T(b,{...t,cleanups:f},r);d&&g(d.cleanups),c={element:S,lastItem:o,cleanups:f}}u.set(l,c),p.appendChild(c.element)}for(let[n,o]of a.cache)u.has(n)||g(o.cleanups);return a.cache=u,p}function $(e,t){if(e.for&&t(e),e.children)for(let r of e.children)$(r,t)}function K(e,t,r,s){return{host:e,get props(){let a={};for(let[i,u]of t)a[i]=u;return a},get state(){let a={};for(let[i,u]of r)a[i]=u;return a},get refs(){return s()},setState:(a,i)=>e.setState(a,i),getState:a=>e.getState(a),emit:(a,i)=>e.emitEvent(a,i)}}function V(e){let t=e.theme?B(e.theme):void 0,r=e.styles?G(e.styles):void 0;if(!t&&!r)return{kind:"adopted",sheets:[]};if(typeof CSSStyleSheet<"u"&&typeof CSSStyleSheet.prototype.replaceSync=="function"){let a=[];if(t){let i=new CSSStyleSheet;i.replaceSync(t),a.push(i)}if(r){let i=new CSSStyleSheet;i.replaceSync(r),a.push(i)}return{kind:"adopted",sheets:a}}return{kind:"fallback",theme:t,styles:r}}function _(e,t){if(t.kind==="adopted"){if(t.sheets.length>0)try{e.adoptedStyleSheets=t.sheets}catch{}return}if(t.theme){let r=document.createElement("style");r.textContent=t.theme,e.appendChild(r)}if(t.styles){let r=document.createElement("style");r.textContent=t.styles,e.appendChild(r)}}function R(e,t){for(let[r,s]of Object.entries(t))e.setAttribute(r,s)}function B(e){return`:host { ${Object.entries(e).map(([r,s])=>`--${r}: ${s};`).join(" ")} }`}function G(e){return`.container { ${Object.entries(e).map(([r,s])=>`${r}: ${s};`).join(" ")} }`}function g(e){for(;e.length>0;){let t=e.pop();try{t?.()}catch(r){console.error("[tan-compose] cleanup threw:",r)}}}function C(e,t){switch(t){case"string":return e;case"number":{let r=Number(e);return Number.isNaN(r)?void 0:r}case"boolean":return e!=="false"&&e!=="0";case"json":try{return JSON.parse(e)}catch{return}}}function Q(e,t){switch(t){case"string":return e==null?e:String(e);case"number":return e==null?e:Number(e);case"boolean":return!!e;case"json":return e}}function U(e,t,r,s){if(s!=="json"){if(s==="boolean"){r?e.setAttribute(t,""):e.removeAttribute(t);return}if(r==null){e.removeAttribute(t);return}e.setAttribute(t,String(r))}}var A="tc-button",D=A;h(A,m({props:{variant:{type:"string",default:"primary"},size:{type:"string",default:"md"},disabled:{type:"boolean",default:!1,reflect:!0},loading:{type:"boolean",default:!1},block:{type:"boolean",default:!1}},theme:{"tc-btn-primary-bg":"#14171f","tc-btn-primary-fg":"#ffffff","tc-btn-secondary-bg":"#ffffff","tc-btn-secondary-fg":"#14171f","tc-btn-secondary-border":"#d9cfb8","tc-btn-ghost-fg":"#14171f","tc-btn-ghost-border":"transparent","tc-btn-danger-bg":"#b3261e","tc-btn-danger-fg":"#ffffff","tc-btn-radius":"8px","tc-btn-font":"'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"},styles:{display:"inline-block","vertical-align":"middle"},template:({props:e})=>`
      <button
        part="button"
        class="root v-${M(e.variant)} s-${M(e.size)}${e.block?" block":""}"
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
    `}));function M(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var L="tc-input",O=L;h(L,m({formAssociated:!0,props:{value:{type:"string",default:""},name:{type:"string",default:""},type:{type:"string",default:"text"},placeholder:{type:"string",default:""},label:{type:"string",default:""},helper:{type:"string",default:""},error:{type:"string",default:""},disabled:{type:"boolean",default:!1,reflect:!0},required:{type:"boolean",default:!1,reflect:!0}},theme:{"tc-input-bg":"#ffffff","tc-input-fg":"#14171f","tc-input-border":"#d9cfb8","tc-input-border-focus":"#a16939","tc-input-error":"#b3261e","tc-input-helper":"#6b7280","tc-input-radius":"8px","tc-input-font":"'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"},styles:{display:"block"},refs:{input:"input"},template:({props:e})=>{let t=!!e.error;return`
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
      `},events:{"input input":(e,t)=>{let r=e.target.value,s=t.host;s.internals?.setFormValue(r),s.value=r,t.emit("tc-input",{value:r})}},formResetCallback(){this.value=""}}));function y(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var j="tc-table",I=j;h(j,m({props:{rows:{type:"json",default:[]},columns:{type:"json",default:[]},pageSize:{type:"number",default:10},filterable:{type:"boolean",default:!0},emptyText:{type:"string",default:"No results."},rowKey:{type:"string",default:"id"}},theme:{"tc-table-surface":"#ffffff","tc-table-ink":"#14171f","tc-table-soft":"#5a6072","tc-table-rule":"#ece5d3","tc-table-head-bg":"#faf8f3","tc-table-row-hover":"rgba(161, 105, 57, 0.05)","tc-table-accent":"#a16939","tc-table-radius":"10px","tc-table-font":"'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"},styles:{display:"block"},template:({props:e,state:t})=>{let r=e.columns??[],s=t,a=k(e,s),i=Math.max(1,Math.ceil(a.length/(e.pageSize??10))),u=Math.min(s.page??0,i-1),p=e.pageSize??10,n=a.slice(u*p,u*p+p),o=(e.rows??[]).length;return`
        ${e.filterable?`<input class="filter" placeholder="Search..." value="${w(s.q??"")}" />`:""}
        <div class="wrap">
          <table>
            <thead>
              <tr>
                ${r.map(l=>{let c=s.sortKey===l.key,d=l.sortable!==!1,f=c?s.sortDir==="asc"?"\u25B2":"\u25BC":"",b=c?s.sortDir==="asc"?"ascending":"descending":"none";return`<th
                    data-col="${w(l.key)}"
                    class="${d?"sortable":""}"
                    aria-sort="${b}"
                  >${w(l.label)}<span class="sort">${f}</span></th>`}).join("")}
              </tr>
            </thead>
            <tbody>
              ${n.length===0?`<tr class="empty"><td colspan="${r.length||1}">${w(e.emptyText)}</td></tr>`:n.map((l,c)=>`<tr data-row="${u*p+c}">${r.map(d=>`<td>${w(l[d.key]??"")}</td>`).join("")}</tr>`).join("")}
            </tbody>
          </table>
        </div>
        <footer class="pager">
          <span class="count">${a.length} of ${o} rows</span>
          <span class="spacer"></span>
          <button class="prev" type="button" ${u<=0?"disabled":""}>\u2039 prev</button>
          <span class="page">page ${u+1} of ${i}</span>
          <button class="next" type="button" ${u>=i-1?"disabled":""}>next \u203A</button>
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
      `},events:{"input .filter":(e,t)=>{t.setState("q",e.target.value),t.setState("page",0)},"click .prev":(e,t)=>{let r=(t.state.page??0)-1;t.setState("page",Math.max(0,r))},"click .next":(e,t)=>{let r=t.state,s=k(t.props,r).length,a=t.props.pageSize??10,i=Math.max(0,Math.ceil(s/a)-1),u=(r.page??0)+1;t.setState("page",Math.min(i,u))},"click th.sortable":(e,t)=>{let r=e.target.closest("th");if(!r)return;let s=r.dataset.col;if(!s)return;let a=t.state,i;a.sortKey!==s?i="asc":i=a.sortDir==="asc"?"desc":a.sortDir==="desc"?null:"asc",t.setState("sortKey",i?s:null),t.setState("sortDir",i),t.emit("tc-sort-change",{key:i?s:null,direction:i})},"click tr[data-row]":(e,t)=>{let r=e.target.closest("tr[data-row]");if(!r)return;let s=Number(r.dataset.row??"-1");if(Number.isNaN(s)||s<0)return;let i=k(t.props,t.state)[s];i&&t.emit("tc-row-click",{row:i})}}}));function k(e,t){let r=e.rows??[],s=e.columns??[],a=(t.q??"").trim().toLowerCase(),i=a.length===0?r.slice():r.filter(u=>s.some(p=>String(u[p.key]??"").toLowerCase().includes(a)));if(t.sortKey&&t.sortDir){let u=t.sortKey,p=t.sortDir==="asc"?1:-1;i=i.slice().sort((n,o)=>{let l=n[u],c=o[u];return l===c?0:l==null?1:c==null?-1:typeof l=="number"&&typeof c=="number"?(l-c)*p:String(l).localeCompare(String(c))*p})}return i}function w(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var de={button:D,input:O,table:I};export{de as tags};
//# sourceMappingURL=mod.kit.js.map
