---
tag: tc-code
slug: code
category: docs / content
summary: Styled code block with optional copy button. Doesn't ship a highlighter — bring your own pre-tokenized HTML.
description: tc-code documentation — language label, copy button, syntax classes, theming, and accessibility.
importPath: "@ra9/tan-compose-kit/code"

props:
  - name: language
    type: string
    default: '""'
    description: Shown as a small label in the corner. Also added as a `lang-*` class on the inner `<code>`.
  - name: copy
    type: boolean
    default: "false"
    description: Render a copy-to-clipboard button in the corner.
  - name: filename
    type: string
    default: '""'
    description: When set, shown in the corner instead of `language`. Useful for "this is config.yml" framing.

events:
  - name: tc-copy
    detail: "{ text: string }"
    description: Fires after a successful copy. Useful for analytics or "copied!" toasts.

slots:
  - name: (default)
    description: Code content. Either plain text or pre-tokenized HTML using the `tc-kw` / `tc-str` / `tc-com` / `tc-num` / `tc-tag` classes.

cssVars:
  - name: "--tc-code-bg"
    default: "var(--tc-code-bg-base, #14171f)"
    description: Block background.
  - name: "--tc-code-ink"
    default: "var(--tc-code-ink-base, #efe6d4)"
    description: Default text color.
  - name: "--tc-code-rule"
    default: "var(--tc-code-rule-base, rgba(255,255,255,0.08))"
    description: Header divider color.
  - name: "--tc-code-label"
    default: "var(--tc-code-label-base, #8a8678)"
    description: Color of the language/filename label.
  - name: "--tc-code-radius"
    default: "var(--tc-radius-md, 10px)"
    description: Corner radius.
  - name: "--tc-code-font"
    default: "var(--tc-font-mono, …)"
    description: Monospace font family.
  - name: "--tc-code-padding"
    default: "var(--tc-space-5, 20px) var(--tc-space-5, 20px)"
    description: Padding inside the `<pre>`.
  - name: "--tc-code-kw"
    default: "var(--tc-code-kw-base, #f0a878)"
    description: Color for `.tc-kw` (keywords).
  - name: "--tc-code-str"
    default: "var(--tc-code-str-base, #d9b380)"
    description: Color for `.tc-str` (strings).
  - name: "--tc-code-com"
    default: "var(--tc-code-com-base, #8a8678)"
    description: Color for `.tc-com` (comments).
  - name: "--tc-code-num"
    default: "var(--tc-code-num-base, #c4d3b8)"
    description: Color for `.tc-num` (numbers).
  - name: "--tc-code-tag"
    default: "var(--tc-code-tag-base, #d49a68)"
    description: Color for `.tc-tag` (HTML/JSX tags).

related:
  - callout
  - toc
  - pagination
---

### Basic usage

<div class="stage col">
  <tc-code language="bash">deno task blog</tc-code>
</div>

```html
<tc-code language="bash">deno task blog</tc-code>
```

### With a copy button

<div class="stage col">
  <tc-code language="ts" copy>import { build } from "@ra9/tan-compose";</tc-code>
</div>

```html
<tc-code language="ts" copy>
import { build } from "@ra9/tan-compose";
</tc-code>
```

### Showing a filename

`filename` replaces `language` in the corner label. Handy when the code is meant to be saved under a specific name.

```html
<tc-code filename="deno.json" copy>{
  "tasks": {
    "blog": "deno run -A scripts/build-blog.ts"
  }
}</tc-code>
```

### Syntax highlighting

The component doesn't ship a highlighter — wrap tokens in pre-defined classes and they pick up the kit's color tokens. The classes are scoped via `::slotted` so they only style code inside `tc-code`.

| Class | Used for |
|---|---|
| `tc-kw` | keywords |
| `tc-str` | strings |
| `tc-com` | comments |
| `tc-num` | numbers |
| `tc-tag` | HTML/JSX tag names |

```html
<tc-code language="ts" copy>
<span class="tc-kw">const</span> name = <span class="tc-str">"Carlos"</span>;
<span class="tc-com">// a comment</span>
</tc-code>
```

### Listening for copies

```html
<tc-code id="snippet" language="bash" copy>deno task blog</tc-code>

<script type="module">
  document.getElementById("snippet").addEventListener("tc-copy", (e) => {
    console.log("copied:", e.detail.text);
  });
</script>
```

### Theming

The default skin is dark even in light themes — code blocks intentionally break out of the surrounding surface. Override the base tokens to opt out.

```html
<tc-code
  style="--tc-code-bg: #f6f8fa; --tc-code-ink: #24292f; --tc-code-kw: #cf222e;"
  language="ts"
>const x = 1;</tc-code>
```

### Accessibility

- The block uses a real `<pre><code>` so screen readers treat it as code.
- The copy button has `aria-label="Copy code"` and shows a check icon + "Copied" text after a successful copy.
- The language/filename label is plain text — assistive tech reads it before the code itself.
- Clipboard writes use the async clipboard API and fall back gracefully if it's unavailable.
