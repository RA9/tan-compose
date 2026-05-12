/**
 * Site content build pipeline.
 *
 * Reads markdown sources from blog/posts/*.md and components/posts/*.md,
 * renders each through its template, and writes html into blog/<slug>.html
 * and components/<slug>.html. Also regenerates blog/index.html, the RSS
 * feed, and sitemap.xml.
 *
 * Run with:
 *   deno task blog
 *
 * Authoring conventions (blog posts):
 *   - Frontmatter is YAML (---) with title, date, tag, excerpt, slug?
 *   - First paragraph is auto-tagged as `class="lede"`
 *   - A trailing `---` (horizontal rule) followed by paragraphs
 *     auto-tags those paragraphs as `class="closing"`
 *   - Fenced code blocks with language ts | js | html get tokenized
 *     into <tc-code> with .tc-kw / .tc-str / .tc-com / .tc-tag spans
 *   - Callouts: `:::callout variant=info title="..."` / `:::`
 *
 * Authoring conventions (component pages):
 *   - Frontmatter carries the structured surface area:
 *       tag, slug, summary, import, props[], events[], slots[], cssVars[],
 *       related[]
 *   - Body markdown is the "Examples" section: prose + live demos +
 *     tc-code blocks.
 *   - The build renders the props/events/slots/CSS-vars tables before
 *     the body so the prose flows naturally below the reference tables.
 */

import { parse as parseYaml } from "@std/yaml";
import { marked } from "marked";

const ROOT = new URL("../", import.meta.url).pathname;
const POSTS_DIR = `${ROOT}blog/posts`;
const BLOG_DIR = `${ROOT}blog`;
const COMPONENTS_POSTS_DIR = `${ROOT}components/posts`;
const COMPONENTS_DIR = `${ROOT}components`;

const SITE_URL = "https://ra9.github.io/tan-compose";
const SITE_NAME = "Tan Compose";
const SITE_DESCRIPTION =
  "A tiny library for declaratively defining reusable Web Components, plus a 23-component kit and a curated icon set.";

/** Pages outside the blog that should appear in sitemap.xml. */
const TOP_PAGES: { path: string; changefreq: string; priority: string }[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/docs.html", changefreq: "weekly", priority: "0.9" },
  { path: "/components.html", changefreq: "weekly", priority: "0.9" },
  { path: "/icons.html", changefreq: "monthly", priority: "0.7" },
  { path: "/themes.html", changefreq: "monthly", priority: "0.7" },
  { path: "/examples.html", changefreq: "monthly", priority: "0.7" },
  { path: "/playground.html", changefreq: "monthly", priority: "0.6" },
  { path: "/blog/", changefreq: "weekly", priority: "0.8" },
];

interface Frontmatter {
  title: string;
  date: string;
  tag: string;
  excerpt: string;
  slug?: string;
  description?: string;
  version?: string;
  subtitle?: string;
  draft?: boolean;
}

interface Post extends Frontmatter {
  slug: string;
  body: string;
  html: string;
}

// ────────────────────────────────────────────────────────────────────
// frontmatter
// ────────────────────────────────────────────────────────────────────

function splitFrontmatter(src: string): { meta: Frontmatter; body: string } {
  const match = src.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    throw new Error("missing frontmatter");
  }
  const meta = parseYaml(match[1]) as Frontmatter;
  return { meta, body: match[2] };
}

// ────────────────────────────────────────────────────────────────────
// syntax tokenizer
// ────────────────────────────────────────────────────────────────────

const TS_KEYWORDS = new Set([
  "const",
  "let",
  "var",
  "function",
  "return",
  "if",
  "else",
  "for",
  "while",
  "do",
  "switch",
  "case",
  "break",
  "continue",
  "throw",
  "try",
  "catch",
  "finally",
  "new",
  "this",
  "true",
  "false",
  "null",
  "undefined",
  "async",
  "await",
  "import",
  "export",
  "from",
  "default",
  "type",
  "interface",
  "class",
  "extends",
  "implements",
  "public",
  "private",
  "protected",
  "static",
  "readonly",
  "as",
  "in",
  "of",
  "instanceof",
  "typeof",
  "void",
  "unknown",
  "any",
  "never",
  "yield",
  "delete",
]);

function escapeHtml(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isoDate(d: unknown): string {
  if (d instanceof Date) return d.toISOString().slice(0, 10);
  return String(d ?? "");
}

/**
 * Tokenize TypeScript/JavaScript source. Walks the text and emits HTML
 * with .tc-kw (keywords), .tc-str (string literals), .tc-com (comments).
 * Everything else is plain text (HTML-escaped). Conservative — we don't
 * try to recognize numbers, regex, identifiers etc.
 */
function tokenizeTs(src: string): string {
  let out = "";
  let i = 0;
  const n = src.length;

  while (i < n) {
    const c = src[i];
    const c2 = src.slice(i, i + 2);

    // line comment
    if (c2 === "//") {
      let j = i;
      while (j < n && src[j] !== "\n") j++;
      out += `<span class="tc-com">${escapeHtml(src.slice(i, j))}</span>`;
      i = j;
      continue;
    }

    // block comment
    if (c2 === "/*") {
      let j = i + 2;
      while (j < n && src.slice(j, j + 2) !== "*/") j++;
      j = Math.min(n, j + 2);
      out += `<span class="tc-com">${escapeHtml(src.slice(i, j))}</span>`;
      i = j;
      continue;
    }

    // strings: " ' `
    if (c === '"' || c === "'" || c === "`") {
      const quote = c;
      let j = i + 1;
      while (j < n) {
        if (src[j] === "\\") {
          j += 2;
          continue;
        }
        if (src[j] === quote) {
          j++;
          break;
        }
        if (quote !== "`" && src[j] === "\n") break;
        j++;
      }
      out += `<span class="tc-str">${escapeHtml(src.slice(i, j))}</span>`;
      i = j;
      continue;
    }

    // identifier / keyword
    if (/[A-Za-z_$]/.test(c)) {
      let j = i + 1;
      while (j < n && /[A-Za-z0-9_$]/.test(src[j])) j++;
      const word = src.slice(i, j);
      if (TS_KEYWORDS.has(word)) {
        out += `<span class="tc-kw">${word}</span>`;
      } else {
        out += escapeHtml(word);
      }
      i = j;
      continue;
    }

    out += escapeHtml(c);
    i++;
  }

  return out;
}

/**
 * Tokenize HTML source. Wraps tag names in .tc-tag, attribute values
 * (double-quoted strings) in .tc-str, comments in .tc-com.
 */
function tokenizeHtml(src: string): string {
  let out = "";
  let i = 0;
  const n = src.length;

  while (i < n) {
    // comment
    if (src.startsWith("<!--", i)) {
      const end = src.indexOf("-->", i);
      const j = end === -1 ? n : end + 3;
      out += `<span class="tc-com">${escapeHtml(src.slice(i, j))}</span>`;
      i = j;
      continue;
    }

    // doctype + element open/close
    if (src[i] === "<") {
      const close = src.indexOf(">", i);
      if (close === -1) {
        out += escapeHtml(src.slice(i));
        break;
      }
      const tagRaw = src.slice(i, close + 1);
      out += highlightTag(tagRaw);
      i = close + 1;
      continue;
    }

    // plain text up to next <
    const next = src.indexOf("<", i);
    const j = next === -1 ? n : next;
    out += escapeHtml(src.slice(i, j));
    i = j;
  }

  return out;
}

function highlightTag(tag: string): string {
  // tag is the raw "<...>" slice. Tokenize: < tagname [attrs] >
  // tagname → tc-tag, attribute values in "..." → tc-str
  const inner = tag.slice(1, -1);
  let out = "&lt;";
  let i = 0;
  const n = inner.length;

  // optional leading "/" or "!"
  while (i < n && (inner[i] === "/" || inner[i] === "!")) {
    out += escapeHtml(inner[i]);
    i++;
  }
  // tag name
  const nameStart = i;
  while (i < n && /[A-Za-z0-9-]/.test(inner[i])) i++;
  const name = inner.slice(nameStart, i);
  if (name) out += `<span class="tc-tag">${escapeHtml(name)}</span>`;

  // attributes
  while (i < n) {
    const ch = inner[i];
    if (ch === '"' || ch === "'") {
      const quote = ch;
      let j = i + 1;
      while (j < n && inner[j] !== quote) j++;
      j = Math.min(n, j + 1);
      out += `<span class="tc-str">${escapeHtml(inner.slice(i, j))}</span>`;
      i = j;
      continue;
    }
    out += escapeHtml(ch);
    i++;
  }
  out += "&gt;";
  return out;
}

function tokenize(lang: string, src: string): string {
  if (lang === "ts" || lang === "tsx" || lang === "js" || lang === "jsx") {
    return tokenizeTs(src);
  }
  if (lang === "html" || lang === "xml") {
    return tokenizeHtml(src);
  }
  return escapeHtml(src);
}

// ────────────────────────────────────────────────────────────────────
// markdown rendering
// ────────────────────────────────────────────────────────────────────

/**
 * Pre-process the markdown body to convert `:::callout {...}` blocks
 * into raw HTML before marked sees it. Marked allows raw HTML to pass
 * through unchanged.
 */
function preprocessDirectives(md: string): string {
  // :::callout [variant=...] [title="..."]\n ... \n:::
  return md.replace(
    /^:::callout([^\n]*)\n([\s\S]*?)\n:::[ \t]*$/gm,
    (_match, args, body) => {
      const variant = /variant=(\w+)/.exec(args)?.[1] ?? "info";
      const titleMatch = /title="([^"]+)"/.exec(args);
      const title = titleMatch ? ` title="${escapeHtml(titleMatch[1])}"` : "";
      // Run nested markdown on the body so callouts can contain prose.
      // Trim innerHtml — a blank line inside the HTML block would terminate
      // it early, and the next `##` heading would get swallowed by a new
      // HTML block starting at the closing tag.
      const innerHtml = (marked.parse(body.trim(), {
        async: false,
        breaks: false,
        gfm: true,
      }) as string).trim();
      return `<tc-callout variant="${
        escapeHtml(variant)
      }"${title}>\n${innerHtml}\n</tc-callout>`;
    },
  );
}

function configureMarked(): void {
  const renderer = new marked.Renderer();
  // marked v12 calls renderer.code with positional args: (code, infostring, escaped).
  // The infostring is the fenced block's language hint, e.g. "ts" or "html title=…".
  // deno-lint-ignore no-explicit-any
  (renderer as any).code = (code: string, infostring?: string) => {
    const language = (infostring ?? "").split(/\s+/)[0].toLowerCase();
    const tokenized = tokenize(language, code);
    const langAttr = language ? ` language="${escapeHtml(language)}"` : "";
    return `<tc-code${langAttr}>${tokenized}</tc-code>\n`;
  };
  marked.use({ renderer, gfm: true, breaks: false });
}

interface RenderOptions {
  /** Tag the first <p> as class="lede" and post-<hr> paragraphs as
   *  class="closing". Blog posts want this; component pages do not. */
  ledeAndClosing?: boolean;
}

function renderMarkdown(md: string, opts: RenderOptions = {}): string {
  const pre = preprocessDirectives(md);
  let html = marked.parse(pre, { async: false }) as string;
  if (opts.ledeAndClosing) {
    html = tagLedeAndClosing(html);
  } else {
    // Still upgrade plain <hr> to <hr class="rule" /> for visual consistency.
    html = html.replace(/<hr>/g, `<hr class="rule" />`);
  }
  return html;
}

/**
 * Add class="lede" to the first <p>, and class="closing" to every <p>
 * that follows an <hr> (rendered as <hr class="rule">).
 */
function tagLedeAndClosing(html: string): string {
  let firstParaTagged = false;
  html = html.replace(/<p>/, () => {
    if (firstParaTagged) return "<p>";
    firstParaTagged = true;
    return `<p class="lede">`;
  });
  html = html.replace(/<hr>/g, `<hr class="rule" />`);
  const hrIdx = html.indexOf(`<hr class="rule" />`);
  if (hrIdx !== -1) {
    const head = html.slice(0, hrIdx);
    const tail = html.slice(hrIdx).replace(/<p>/g, `<p class="closing">`);
    html = head + tail;
  }
  return html;
}

// ────────────────────────────────────────────────────────────────────
// post + index templates
// ────────────────────────────────────────────────────────────────────

const SHARED_STYLE = `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      html { scroll-behavior: smooth; }
      body {
        font-family: var(--tc-font-sans, "Inter", system-ui, sans-serif);
        font-size: 16px;
        line-height: 1.6;
        color: var(--tc-color-ink, #14171f);
        background: var(--tc-color-bg, #faf8f3);
        -webkit-font-smoothing: antialiased;
      }
      code { font-family: var(--tc-font-mono, "JetBrains Mono", monospace); font-size: 0.92em; }
      .wrap { max-width: 880px; margin: 0 auto; padding: 0 24px; }
      .wrap-narrow { max-width: 760px; margin: 0 auto; padding: 0 24px; }

      header.post-head { padding: 56px 0 12px; }
      .post-eyebrow {
        font-family: var(--tc-font-mono, "JetBrains Mono", monospace);
        font-size: 0.78rem; font-weight: 600;
        text-transform: uppercase; letter-spacing: 0.08em;
        color: var(--tc-color-accent, #a16939);
        margin-bottom: 12px;
      }
      h1 {
        font-size: clamp(1.9rem, 4vw, 2.5rem);
        font-weight: 800; letter-spacing: -0.02em;
        line-height: 1.15; margin-bottom: 14px;
      }
      .article-subtitle {
        font-size: 1.18rem;
        line-height: 1.5;
        color: var(--tc-color-ink-soft, #4a5061);
        margin: 4px 0 12px;
        max-width: 620px;
      }
      .article-meta {
        font-family: var(--tc-font-mono, "JetBrains Mono", monospace);
        font-size: 0.82rem;
        color: var(--tc-color-ink-muted, #6b7280);
      }

      article { padding: 24px 0 56px; }
      article p {
        color: var(--tc-color-ink, #14171f);
        font-size: 1.02rem; line-height: 1.72;
        margin: 0 0 18px;
      }
      article p.lede {
        font-size: 1.12rem;
        color: var(--tc-color-ink-soft, #4a5061);
        margin-bottom: 24px;
      }
      article h2 {
        font-size: 1.45rem; font-weight: 700;
        letter-spacing: -0.01em;
        margin: 36px 0 14px;
      }
      article h3 {
        font-size: 1.05rem; font-weight: 600;
        margin: 24px 0 8px;
      }
      article a {
        color: var(--tc-color-accent, #a16939);
        text-decoration: underline;
        text-decoration-color: var(--tc-color-rule-strong, #d9cfb8);
      }
      article a:hover { text-decoration-color: var(--tc-color-accent, #a16939); }
      article p code, article li code {
        background: var(--tc-color-accent-soft, #efe2cf);
        color: var(--tc-color-accent-hover, #8a572d);
        padding: 1px 6px; border-radius: 4px;
      }
      article ul, article ol { margin: 0 0 18px 22px; }
      article li { line-height: 1.7; margin-bottom: 6px; }
      article blockquote {
        border-left: 3px solid var(--tc-color-accent, #a16939);
        padding: 4px 0 4px 18px;
        margin: 24px 0;
        color: var(--tc-color-ink-soft, #4a5061);
        font-size: 0.98rem;
      }
      article blockquote p { margin-bottom: 8px; color: inherit; font-size: inherit; }
      article blockquote p:last-child { margin-bottom: 0; }

      hr.rule {
        border: none; height: 1px;
        background: var(--tc-color-rule, #ece5d3);
        margin: 36px 0 24px;
      }
      .closing { color: var(--tc-color-ink-soft, #4a5061); }

      table.compact {
        border-collapse: collapse;
        width: 100%;
        margin: 8px 0 22px;
        font-size: 0.94rem;
      }
      table.compact th, table.compact td {
        text-align: left;
        padding: 7px 10px;
        border-bottom: 1px solid var(--tc-color-rule, #ece5d3);
      }
      table.compact th {
        background: var(--tc-color-bg, #faf8f3);
        font-size: 0.76rem;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--tc-color-ink-soft, #4a5061);
      }
      table.compact th.num, table.compact th.delta,
      table.compact td.num, table.compact td.delta {
        text-align: right;
      }
      table.compact td.num, table.compact td.delta {
        font-family: var(--tc-font-mono, "JetBrains Mono", monospace);
        font-variant-numeric: tabular-nums;
      }
      table.compact td.delta { color: var(--tc-color-accent-hover, #8a572d); }
      table.compact tfoot td {
        border-top: 2px solid var(--tc-color-rule-strong, #d9cfb8);
        border-bottom: none;
        font-weight: 700;
      }

      @media (max-width: 720px) {
        header.post-head { padding: 36px 0 8px; }
        article { padding: 12px 0 36px; }
      }
`;

function renderPost(post: Post): string {
  const desc = post.description ?? post.excerpt;
  const version = post.version ?? "v1.1.0";
  const url = `${SITE_URL}/blog/${post.slug}.html`;
  const pubDate = isoDate(post.date);
  const pageTitle = `${post.title} — Tan Compose blog`;
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${escapeHtml(desc)}" />
    <title>${escapeHtml(pageTitle)}</title>
    <link rel="canonical" href="${escapeHtml(url)}" />
    <link rel="alternate" type="application/rss+xml" title="Tan Compose blog" href="${SITE_URL}/blog/feed.xml" />

    <meta property="og:type" content="article" />
    <meta property="og:title" content="${escapeHtml(post.title)}" />
    <meta property="og:description" content="${escapeHtml(desc)}" />
    <meta property="og:url" content="${escapeHtml(url)}" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="article:published_time" content="${escapeHtml(pubDate)}" />
    <meta property="article:section" content="${escapeHtml(post.tag)}" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${escapeHtml(post.title)}" />
    <meta name="twitter:description" content="${escapeHtml(desc)}" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
    <script type="module" src="../dist/site.js"></script>
    <style>${SHARED_STYLE}</style>
  </head>
  <body>
    <site-nav active="blog" version="${
    escapeHtml(version)
  }" base="../"></site-nav>

    <main>
      <header class="post-head">
        <div class="wrap-narrow">
          <div class="post-eyebrow">${escapeHtml(post.tag)}</div>
          <h1>${escapeHtml(post.title)}</h1>
${
    post.subtitle
      ? `          <p class="article-subtitle">${
        escapeHtml(post.subtitle)
      }</p>\n`
      : ""
  }          <div class="article-meta">Posted ${
    escapeHtml(isoDate(post.date))
  }</div>
        </div>
      </header>

      <article>
        <div class="wrap-narrow">
${post.html}
        </div>
      </article>
    </main>

    <site-footer base="../"></site-footer>
  </body>
</html>
`;
}

// ────────────────────────────────────────────────────────────────────
// index (regenerates blog/index.html with the POSTS array filled in)
// ────────────────────────────────────────────────────────────────────

function renderIndex(posts: Post[]): string {
  const items = posts
    .map((p) => {
      const date = isoDate(p.date);
      const title = String(p.title).replace(/"/g, '\\"');
      const tag = String(p.tag).replace(/"/g, '\\"');
      const excerpt = String(p.excerpt).replace(/"/g, '\\"');
      return `        {
          href: "./${p.slug}.html",
          title: "${title}",
          date: "${date}",
          tag: "${tag}",
          excerpt:
            "${excerpt}",
        }`;
    })
    .join(",\n");

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Tan Compose blog — release notes, tutorials, and posts about composing custom-element-based design systems." />
    <title>Blog — Tan Compose</title>
    <link rel="canonical" href="${SITE_URL}/blog/" />
    <link rel="alternate" type="application/rss+xml" title="Tan Compose blog" href="${SITE_URL}/blog/feed.xml" />

    <meta property="og:type" content="website" />
    <meta property="og:title" content="Blog — ${SITE_NAME}" />
    <meta property="og:description" content="Release notes, design decisions, and tutorials for tan-compose and the kit." />
    <meta property="og:url" content="${SITE_URL}/blog/" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="Blog — ${SITE_NAME}" />
    <meta name="twitter:description" content="Release notes, design decisions, and tutorials for tan-compose and the kit." />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
    <script type="module" src="../dist/site.js"></script>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body {
        font-family: var(--tc-font-sans, "Inter", system-ui, sans-serif);
        line-height: 1.6;
        color: var(--tc-color-ink, #14171f);
        background: var(--tc-color-bg, #faf8f3);
        -webkit-font-smoothing: antialiased;
      }
      .wrap { max-width: 760px; margin: 0 auto; padding: 0 24px; }

      header.page { padding: 64px 0 24px; }
      .eyebrow {
        font-family: var(--tc-font-mono, "JetBrains Mono", monospace);
        font-size: 0.78rem; font-weight: 600;
        text-transform: uppercase; letter-spacing: 0.08em;
        color: var(--tc-color-accent, #a16939);
        margin-bottom: 12px;
      }
      h1 {
        font-size: clamp(2rem, 4vw, 2.6rem);
        font-weight: 800; letter-spacing: -0.02em;
        line-height: 1.1; margin-bottom: 14px;
      }
      .lede {
        color: var(--tc-color-ink-soft, #4a5061);
        font-size: 1.05rem; max-width: 620px;
      }

      .search-row { margin: 28px 0 8px; }
      .search-row tc-input { display: block; }

      section.posts { padding: 0 0 64px; }
      .post {
        display: block;
        text-decoration: none;
        color: inherit;
        padding: 24px 20px;
        margin: 0 -20px;
        border-top: 1px solid var(--tc-color-rule, #ece5d3);
        border-radius: var(--tc-radius-md, 10px);
        transition: background 0.15s ease;
      }
      .post:hover { background: var(--tc-color-accent-soft, #efe2cf); }
      .post-meta {
        font-family: var(--tc-font-mono, "JetBrains Mono", monospace);
        font-size: 0.78rem;
        color: var(--tc-color-ink-muted, #6b7280);
        margin-bottom: 6px;
      }
      .post-meta .tag {
        color: var(--tc-color-accent, #a16939);
        margin-left: 6px;
      }
      .post h2 {
        font-size: 1.3rem; font-weight: 700;
        letter-spacing: -0.01em;
        margin-bottom: 6px;
      }
      .post p {
        color: var(--tc-color-ink-soft, #4a5061);
        font-size: 0.98rem;
      }

      .pager {
        display: flex; align-items: center; justify-content: space-between;
        margin: 24px 0 0;
        font-family: var(--tc-font-mono, "JetBrains Mono", monospace);
        font-size: 0.85rem;
        color: var(--tc-color-ink-muted, #6b7280);
      }
      .empty {
        padding: 28px;
        text-align: center;
        color: var(--tc-color-ink-muted, #6b7280);
        font-size: 0.92rem;
        border: 1px dashed var(--tc-color-rule, #ece5d3);
        border-radius: var(--tc-radius-md, 10px);
        margin-top: 16px;
      }

      @media (max-width: 720px) {
        header.page { padding: 40px 0 16px; }
      }
    </style>
  </head>
  <body>
    <site-nav active="blog" version="v1.1.0" base="../"></site-nav>

    <main>
      <header class="page">
        <div class="wrap">
          <div class="eyebrow">blog</div>
          <h1>Notes from building tan-compose.</h1>
          <p class="lede">
            Release notes, design decisions, and tutorials for
            <code>@ra9/tan-compose</code> and the kit. Posts that survive
            the moment they were written and explain the why, not just the
            what.
          </p>
          <div class="search-row">
            <tc-input id="post-search" placeholder="Search posts…" aria-label="Search posts"></tc-input>
          </div>
        </div>
      </header>

      <section class="posts">
        <div class="wrap">
          <div id="post-results"></div>
          <div class="pager" id="post-pager"></div>
        </div>
      </section>
    </main>

    <site-footer base="../"></site-footer>

    <script type="module">
      const POSTS = [
${items},
      ];

      const PAGE_SIZE = 5;
      let query = "";
      let page = 1;

      const search = document.getElementById("post-search");
      const results = document.getElementById("post-results");
      const pager = document.getElementById("post-pager");

      function filtered() {
        const q = query.trim().toLowerCase();
        if (!q) return POSTS;
        return POSTS.filter((p) =>
          (p.title + " " + p.tag + " " + p.excerpt).toLowerCase().includes(q)
        );
      }

      function escapeHtml(s) {
        return s
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }

      function render() {
        const all = filtered();
        const totalPages = Math.max(1, Math.ceil(all.length / PAGE_SIZE));
        if (page > totalPages) page = totalPages;
        const start = (page - 1) * PAGE_SIZE;
        const slice = all.slice(start, start + PAGE_SIZE);

        if (slice.length === 0) {
          results.innerHTML =
            \`<div class="empty">No posts match "\${escapeHtml(query)}".</div>\`;
        } else {
          results.innerHTML = slice
            .map((p) => \`
              <a class="post" href="\${p.href}">
                <div class="post-meta">\${p.date}<span class="tag">\${escapeHtml(p.tag)}</span></div>
                <h2>\${escapeHtml(p.title)}</h2>
                <p>\${escapeHtml(p.excerpt)}</p>
              </a>
            \`)
            .join("");
        }

        if (totalPages <= 1) {
          pager.innerHTML = "";
        } else {
          pager.innerHTML = \`
            <span>\${all.length} post\${all.length === 1 ? "" : "s"}</span>
            <tc-pagination
              id="pager-controls"
              current="\${page}"
              total="\${totalPages}"
              size="sm"
              label="Blog post pagination"
            ></tc-pagination>
          \`;
          document
            .getElementById("pager-controls")
            ?.addEventListener("tc-page-change", (e) => {
              page = e.detail.page;
              render();
              window.scrollTo({ top: 0, behavior: "smooth" });
            });
        }
      }

      function onSearch(value) {
        query = String(value ?? "");
        page = 1;
        render();
      }

      search.addEventListener("tc-input", (e) => onSearch(e.detail?.value));
      search.addEventListener("input", (e) => onSearch(e.target?.value));

      render();
    </script>
  </body>
</html>
`;
}

// ────────────────────────────────────────────────────────────────────
// feed + sitemap
// ────────────────────────────────────────────────────────────────────

/** Escape XML special chars for use inside element text or attribute values. */
function escapeXml(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** RFC 822 / RFC 1123 date format required by RSS 2.0. */
function rfc822(d: unknown): string {
  const date = d instanceof Date ? d : new Date(isoDate(d));
  return date.toUTCString();
}

function renderFeed(posts: Post[]): string {
  const lastBuild = rfc822(new Date());
  const items = posts
    .map((p) => {
      const url = `${SITE_URL}/blog/${p.slug}.html`;
      const pubDate = rfc822(p.date);
      return `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(p.tag)}</category>
      <description>${escapeXml(p.excerpt)}</description>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)} blog</title>
    <link>${SITE_URL}/blog/</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
}

function renderSitemap(posts: Post[], components: ComponentPage[]): string {
  const today = new Date().toISOString().slice(0, 10);
  const top = TOP_PAGES.map((p) =>
    `  <url>
    <loc>${SITE_URL}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  ).join("\n");

  const posted = posts
    .map((p) =>
      `  <url>
    <loc>${SITE_URL}/blog/${p.slug}.html</loc>
    <lastmod>${escapeXml(isoDate(p.date))}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>`
    )
    .join("\n");

  const componentUrls = components
    .map((c) =>
      `  <url>
    <loc>${SITE_URL}/components/${c.slug}.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${top}
${posted}
${componentUrls}
</urlset>
`;
}

// ────────────────────────────────────────────────────────────────────
// search index
// ────────────────────────────────────────────────────────────────────

interface SearchDoc {
  /** URL path relative to the site root, with no leading SITE_URL. */
  url: string;
  /** Human-readable title shown in the result row. */
  title: string;
  /** One-line description shown under the title. */
  description: string;
  /** "page" | "blog" | "component" — drives the row badge. */
  category: string;
  /** Optional tag (e.g. blog post eyebrow, component category). */
  tag?: string;
  /** ISO date for blog posts; helps rank recent ones higher. */
  date?: string;
  /** Concatenated body text for full-text matching. */
  text: string;
}

/** Strip HTML tags and collapse whitespace for the searchable text body. */
function stripHtml(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;|&#\d+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Truncate to a reasonable cap so search.json doesn't blow up. */
function truncateText(text: string, max = 2000): string {
  if (text.length <= max) return text;
  return text.slice(0, max);
}

interface TopPageDoc {
  url: string;
  title: string;
  description: string;
  textPath?: string;
}

const TOP_PAGE_DOCS: TopPageDoc[] = [
  {
    url: "/",
    title: "Tan Compose — Declarative Web Components",
    description:
      "A tiny declarative library for building Web Components. No JSX, no compiler, no framework runtime.",
    textPath: "index.html",
  },
  {
    url: "/docs.html",
    title: "Documentation",
    description:
      "API reference, lifecycle, reactivity, and migration guide for @ra9/tan-compose.",
    textPath: "docs.html",
  },
  {
    url: "/components.html",
    title: "Components",
    description:
      "Battle-tested primitives from @ra9/tan-compose-kit, ready to drop into any HTML page or framework.",
    textPath: "components.html",
  },
  {
    url: "/icons.html",
    title: "Icons",
    description: "44 inline SVG icons from the Lucide set, packaged as <tc-icon>.",
    textPath: "icons.html",
  },
  {
    url: "/themes.html",
    title: "Themes",
    description:
      "Semantic tokens and drop-in presets — light, dark, Bootstrap, Tailwind, Material, shadcn.",
    textPath: "themes.html",
  },
  {
    url: "/examples.html",
    title: "Examples",
    description: "Interactive examples of components built with Tan Compose.",
    textPath: "examples.html",
  },
  {
    url: "/playground.html",
    title: "Playground",
    description:
      "Write describe() and build() calls and see the result instantly.",
    textPath: "playground.html",
  },
  {
    url: "/blog/",
    title: "Blog",
    description:
      "Release notes, design decisions, and tutorials for tan-compose and the kit.",
  },
];

async function readPageText(filename: string): Promise<string> {
  try {
    const raw = await Deno.readTextFile(`${ROOT}${filename}`);
    return truncateText(stripHtml(raw));
  } catch {
    return "";
  }
}

async function buildSearchDocs(
  posts: Post[],
  components: ComponentPage[],
): Promise<SearchDoc[]> {
  const docs: SearchDoc[] = [];

  for (const tp of TOP_PAGE_DOCS) {
    const text = tp.textPath ? await readPageText(tp.textPath) : "";
    docs.push({
      url: tp.url,
      title: tp.title,
      description: tp.description,
      category: "page",
      text,
    });
  }

  for (const p of posts) {
    docs.push({
      url: `/blog/${p.slug}.html`,
      title: p.title,
      description: p.excerpt,
      category: "blog",
      tag: p.tag,
      date: isoDate(p.date),
      text: truncateText(stripHtml(p.html)),
    });
  }

  for (const c of components) {
    docs.push({
      url: `/components/${c.slug}.html`,
      title: `<${c.tag}>`,
      description: c.summary,
      category: "component",
      tag: c.category ?? "component",
      text: truncateText(stripHtml(c.html)),
    });
  }

  return docs;
}

function renderSearchIndex(docs: SearchDoc[]): string {
  // Pretty-print for diff-ability; the gzip on the wire makes the size
  // difference vs. minified JSON marginal.
  return JSON.stringify({ docs, generatedAt: new Date().toISOString() }, null, 2);
}

// ────────────────────────────────────────────────────────────────────
// component pages
// ────────────────────────────────────────────────────────────────────

interface PropSpec {
  name: string;
  type: string;
  default?: string;
  description: string;
  reflects?: boolean;
  [k: string]: unknown;
}
interface EventSpec {
  name: string;
  detail?: string;
  description: string;
  [k: string]: unknown;
}
interface SlotSpec {
  name: string;
  description: string;
  [k: string]: unknown;
}
interface CssVarSpec {
  name: string;
  default?: string;
  description: string;
  [k: string]: unknown;
}

interface ComponentFrontmatter {
  tag: string;
  slug?: string;
  summary: string;
  description?: string;
  category?: string;
  importPath?: string;
  props?: PropSpec[];
  events?: EventSpec[];
  slots?: SlotSpec[];
  cssVars?: CssVarSpec[];
  related?: string[];
  draft?: boolean;
}

interface ComponentPage extends ComponentFrontmatter {
  slug: string;
  body: string;
  html: string;
}

function renderComponentTable(
  rows: ReadonlyArray<{ [k: string]: unknown }>,
  cols: { key: string; label: string }[],
): string {
  const head = cols.map((c) => `<th>${escapeHtml(c.label)}</th>`).join("");
  const body = rows
    .map((r) => {
      const tds = cols
        .map((c) => {
          const v = r[c.key];
          if (v == null || v === "") return `<td>—</td>`;
          const isCode = c.key === "name" || c.key === "type" ||
            c.key === "default" || c.key === "detail";
          return isCode
            ? `<td><code>${escapeHtml(v)}</code></td>`
            : `<td>${escapeHtml(v)}</td>`;
        })
        .join("");
      return `<tr>${tds}</tr>`;
    })
    .join("");
  return `<table class="api">
  <thead><tr>${head}</tr></thead>
  <tbody>${body}</tbody>
</table>`;
}

function renderComponentPage(c: ComponentPage): string {
  const url = `${SITE_URL}/components/${c.slug}.html`;
  const description = c.description ?? c.summary;
  const importPath = c.importPath ??
    `@ra9/tan-compose-kit/${c.slug.replace(/^tc-/, "")}`;

  const propsSection = c.props && c.props.length > 0
    ? `
      <section class="api-section" id="props">
        <h2>Props</h2>
        ${
      renderComponentTable(c.props, [
        { key: "name", label: "Name" },
        { key: "type", label: "Type" },
        { key: "default", label: "Default" },
        { key: "description", label: "Description" },
      ])
    }
      </section>`
    : "";

  const eventsSection = c.events && c.events.length > 0
    ? `
      <section class="api-section" id="events">
        <h2>Events</h2>
        ${
      renderComponentTable(c.events, [
        { key: "name", label: "Event" },
        { key: "detail", label: "Detail" },
        { key: "description", label: "When" },
      ])
    }
      </section>`
    : "";

  const slotsSection = c.slots && c.slots.length > 0
    ? `
      <section class="api-section" id="slots">
        <h2>Slots</h2>
        ${
      renderComponentTable(c.slots, [
        { key: "name", label: "Slot" },
        { key: "description", label: "Description" },
      ])
    }
      </section>`
    : "";

  const cssVarsSection = c.cssVars && c.cssVars.length > 0
    ? `
      <section class="api-section" id="css-vars">
        <h2>CSS variables</h2>
        ${
      renderComponentTable(c.cssVars, [
        { key: "name", label: "Variable" },
        { key: "default", label: "Default" },
        { key: "description", label: "Description" },
      ])
    }
      </section>`
    : "";

  const relatedSection = c.related && c.related.length > 0
    ? `
      <section class="api-section" id="related">
        <h2>See also</h2>
        <ul class="related">
          ${
      c.related
        .map((slug) =>
          `<li><a href="./${escapeHtml(slug)}.html"><code>&lt;tc-${
            escapeHtml(slug)
          }&gt;</code></a></li>`
        )
        .join("")
    }
        </ul>
      </section>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${escapeHtml(description)}" />
    <title>&lt;${escapeHtml(c.tag)}&gt; — Tan Compose</title>
    <link rel="canonical" href="${escapeHtml(url)}" />

    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escapeHtml(c.tag)} — Tan Compose" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${escapeHtml(url)}" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${escapeHtml(c.tag)} — Tan Compose" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
    <script type="module" src="../dist/site.js"></script>
    <style>${COMPONENT_STYLE}</style>
  </head>
  <body>
    <site-nav active="components" version="v1.1.0" base="../"></site-nav>

    <main>
      <header class="page">
        <div class="wrap">
          <div class="eyebrow">${escapeHtml(c.category ?? "component")}</div>
          <h1 class="tag-h1">&lt;${escapeHtml(c.tag)}&gt;</h1>
          <p class="lede">${escapeHtml(c.summary)}</p>
          <div class="install-line">
            <span class="prompt">import</span>
            <span class="cmd">"${escapeHtml(importPath)}"</span>
          </div>
        </div>
      </header>

      <div class="wrap content">
${propsSection}${eventsSection}${slotsSection}${cssVarsSection}
        <section class="api-section examples-section">
          <h2>Examples</h2>
          ${c.html}
        </section>
${relatedSection}
        <p class="back-link">
          ← <a href="../components.html">All components</a>
        </p>
      </div>
    </main>

    <site-footer base="../"></site-footer>
  </body>
</html>
`;
}

const COMPONENT_STYLE = `
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body {
        font-family: var(--tc-font-sans, "Inter", system-ui, sans-serif);
        line-height: 1.6;
        color: var(--tc-color-ink, #14171f);
        background: var(--tc-color-bg, #faf8f3);
        -webkit-font-smoothing: antialiased;
      }
      code { font-family: var(--tc-font-mono, "JetBrains Mono", monospace); font-size: 0.92em; }
      .wrap { max-width: 880px; margin: 0 auto; padding: 0 24px; }

      header.page { padding: 56px 0 24px; }
      .eyebrow {
        font-family: var(--tc-font-mono, "JetBrains Mono", monospace);
        font-size: 0.78rem; font-weight: 600;
        text-transform: uppercase; letter-spacing: 0.08em;
        color: var(--tc-color-accent, #a16939);
        margin-bottom: 12px;
      }
      .tag-h1 {
        font-family: var(--tc-font-mono, "JetBrains Mono", monospace);
        font-size: clamp(1.6rem, 3vw, 2rem);
        font-weight: 600; letter-spacing: -0.01em;
        margin-bottom: 12px;
      }
      .lede {
        color: var(--tc-color-ink-soft, #4a5061);
        font-size: 1.05rem; max-width: 620px;
        margin-bottom: 18px;
      }
      .install-line {
        font-family: var(--tc-font-mono, monospace);
        font-size: 0.92rem;
        background: var(--tc-color-surface, #ffffff);
        border: 1px solid var(--tc-color-rule, #ece5d3);
        border-radius: var(--tc-radius-md, 10px);
        padding: 14px 18px;
        max-width: 520px;
        display: inline-flex;
        gap: 10px;
        align-items: center;
      }
      .install-line .prompt { color: var(--tc-color-accent, #a16939); }

      .content { padding: 32px 24px 56px; }
      .api-section { padding: 28px 0; border-top: 1px solid var(--tc-color-rule, #ece5d3); }
      .api-section h2 {
        font-size: 1.3rem; font-weight: 700;
        letter-spacing: -0.01em; margin-bottom: 14px;
      }
      .api-section h3 {
        font-size: 1.05rem; font-weight: 600;
        margin: 28px 0 10px;
      }
      .api-section p {
        color: var(--tc-color-ink, #14171f);
        font-size: 1.0rem; line-height: 1.7;
        margin: 0 0 14px;
      }
      .api-section ul, .api-section ol { margin: 0 0 14px 22px; }
      .api-section li { line-height: 1.7; margin-bottom: 4px; }
      .api-section a {
        color: var(--tc-color-accent, #a16939);
        text-decoration: underline;
        text-decoration-color: var(--tc-color-rule-strong, #d9cfb8);
      }
      .api-section a:hover { text-decoration-color: var(--tc-color-accent, #a16939); }
      .api-section p code, .api-section li code, .api-section td code {
        background: var(--tc-color-accent-soft, #efe2cf);
        color: var(--tc-color-accent-hover, #8a572d);
        padding: 1px 6px; border-radius: 4px;
        font-family: var(--tc-font-mono, "JetBrains Mono", monospace);
        font-size: 0.9em;
      }

      table.api {
        width: 100%;
        border-collapse: collapse;
        background: var(--tc-color-surface, #ffffff);
        border: 1px solid var(--tc-color-rule, #ece5d3);
        border-radius: var(--tc-radius-md, 10px);
        overflow: hidden;
        font-size: 0.92rem;
      }
      table.api th, table.api td {
        text-align: left;
        padding: 10px 14px;
        border-bottom: 1px solid var(--tc-color-rule, #ece5d3);
        vertical-align: top;
      }
      table.api tr:last-child td { border-bottom: none; }
      table.api th {
        background: var(--tc-color-bg, #faf8f3);
        font-weight: 600;
        font-size: 0.78rem;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: var(--tc-color-ink-muted, #6b7280);
      }
      table.api td code {
        background: var(--tc-color-bg, #faf8f3);
        padding: 1px 6px;
        border-radius: 4px;
        color: var(--tc-color-ink, #14171f);
      }

      .examples-section .stage {
        background: var(--tc-color-surface, #ffffff);
        border: 1px solid var(--tc-color-rule, #ece5d3);
        border-radius: var(--tc-radius-lg, 12px);
        padding: 24px;
        margin: 12px 0;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        align-items: center;
      }
      .examples-section .stage.col {
        flex-direction: column;
        align-items: stretch;
      }

      ul.related { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 10px; }
      ul.related li { margin: 0; }
      ul.related a {
        display: inline-block;
        padding: 6px 12px;
        background: var(--tc-color-surface, #ffffff);
        border: 1px solid var(--tc-color-rule, #ece5d3);
        border-radius: var(--tc-radius-md, 10px);
        font-size: 0.92rem;
        text-decoration: none;
      }
      ul.related a:hover { border-color: var(--tc-color-accent, #a16939); }

      .back-link {
        margin-top: 32px;
        color: var(--tc-color-ink-muted, #6b7280);
        font-size: 0.92rem;
      }
      .back-link a { color: var(--tc-color-accent, #a16939); text-decoration: none; }
      .back-link a:hover { text-decoration: underline; }

      @media (max-width: 720px) {
        header.page { padding: 32px 0 16px; }
        .api-section { padding: 20px 0; }
      }
`;

async function loadComponentPages(): Promise<ComponentPage[]> {
  const pages: ComponentPage[] = [];
  try {
    await Deno.stat(COMPONENTS_POSTS_DIR);
  } catch {
    return pages;
  }
  for await (const entry of Deno.readDir(COMPONENTS_POSTS_DIR)) {
    if (!entry.isFile || !entry.name.endsWith(".md")) continue;
    const path = `${COMPONENTS_POSTS_DIR}/${entry.name}`;
    const raw = await Deno.readTextFile(path);
    const { meta, body } = splitFrontmatterComponent(raw);
    if (meta.draft) continue;
    const slug = meta.slug ?? entry.name.replace(/\.md$/, "");
    const html = renderMarkdown(body);
    pages.push({ ...meta, slug, body, html });
  }
  pages.sort((a, b) => a.slug.localeCompare(b.slug));
  return pages;
}

function splitFrontmatterComponent(
  src: string,
): { meta: ComponentFrontmatter; body: string } {
  const match = src.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) throw new Error("missing frontmatter");
  const meta = parseYaml(match[1]) as ComponentFrontmatter;
  return { meta, body: match[2] };
}

// ────────────────────────────────────────────────────────────────────
// main
// ────────────────────────────────────────────────────────────────────

async function loadPosts(): Promise<Post[]> {
  const posts: Post[] = [];
  for await (const entry of Deno.readDir(POSTS_DIR)) {
    if (!entry.isFile || !entry.name.endsWith(".md")) continue;
    const path = `${POSTS_DIR}/${entry.name}`;
    const raw = await Deno.readTextFile(path);
    const { meta, body } = splitFrontmatter(raw);
    if (meta.draft) continue;
    const slug = meta.slug ?? entry.name.replace(/\.md$/, "");
    const html = renderMarkdown(body, { ledeAndClosing: true });
    posts.push({ ...meta, slug, body, html });
  }
  // Sort newest first. ISO date strings sort lexically; Date objects via getTime.
  posts.sort((a, b) => {
    const at = isoDate(a.date);
    const bt = isoDate(b.date);
    return at < bt ? 1 : at > bt ? -1 : 0;
  });
  return posts;
}

async function main() {
  configureMarked();
  const posts = await loadPosts();
  if (posts.length === 0) {
    console.error("no posts found in blog/posts/");
    Deno.exit(1);
  }
  let wrote = 0;
  for (const post of posts) {
    const html = renderPost(post);
    await Deno.writeTextFile(`${BLOG_DIR}/${post.slug}.html`, html);
    wrote++;
  }
  const indexHtml = renderIndex(posts);
  await Deno.writeTextFile(`${BLOG_DIR}/index.html`, indexHtml);
  wrote++;

  const components = await loadComponentPages();
  for (const c of components) {
    const html = renderComponentPage(c);
    await Deno.writeTextFile(`${COMPONENTS_DIR}/${c.slug}.html`, html);
    wrote++;
  }

  await Deno.writeTextFile(`${BLOG_DIR}/feed.xml`, renderFeed(posts));
  wrote++;
  await Deno.writeTextFile(
    `${ROOT}sitemap.xml`,
    renderSitemap(posts, components),
  );
  wrote++;

  const searchDocs = await buildSearchDocs(posts, components);
  await Deno.writeTextFile(`${ROOT}search.json`, renderSearchIndex(searchDocs));
  wrote++;

  console.log(
    `site: wrote ${wrote} files — ${posts.length} blog posts, ${components.length} component pages, feed.xml, sitemap.xml, search.json (${searchDocs.length} docs)`,
  );
}

if (import.meta.main) {
  await main();
}
