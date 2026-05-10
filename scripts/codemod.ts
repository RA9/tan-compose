/**
 * @ra9/tan-compose 0.4 → 1.0 codemod.
 *
 * Detects and reports patterns that broke between 0.4 and 1.0 of the core
 * library. Run from your project root:
 *
 *   deno run -A https://raw.githubusercontent.com/ra9/tan-compose/main/scripts/codemod.ts ./src
 *
 * Or, after `deno add jsr:@ra9/tan-compose@^1`, against a local checkout:
 *
 *   deno run -A scripts/codemod.ts <dir>
 *
 * Flags:
 *   --apply    Rewrite files in place (default: dry-run, prints diffs only).
 *   --quiet    Only print files that need changes.
 *   --ext=.ts,.tsx,.js,.mjs   Comma-separated list of extensions to scan
 *                             (default: .ts,.tsx,.js,.mjs).
 *
 * Patterns it looks for:
 *   1. Standalone `for:` (no `tag` / `template` / `children` etc.) that relied
 *      on producing an unwrapped fragment. In 1.0 this wraps the items in a
 *      <div> by default. We don't auto-fix this — the right fix depends on
 *      the parent shape, so we just flag the location.
 *   2. Old `try { … describe(…) } catch (e) { /* "cannot set both children
 *      and for" *\/ }` workarounds that can be deleted in 1.0 since the
 *      restriction was removed.
 *   3. `afterMount` callbacks that imperatively re-query the shadow root
 *      every time — candidates for migrating to `refs:` (1.0 nudge, not a
 *      hard break).
 *
 * The codemod is intentionally conservative — it never rewrites without a
 * pattern it understands. When in doubt it just prints a hint and moves on.
 */

const VERSION = "1.0.0-codemod-1";

interface Args {
  dir: string;
  apply: boolean;
  quiet: boolean;
  exts: string[];
}

function parseArgs(argv: string[]): Args {
  let dir = ".";
  let apply = false;
  let quiet = false;
  let exts = [".ts", ".tsx", ".js", ".mjs"];
  for (const a of argv) {
    if (a === "--apply") apply = true;
    else if (a === "--quiet") quiet = true;
    else if (a.startsWith("--ext=")) {
      exts = a.slice("--ext=".length).split(",").map((s) => s.trim());
    } else if (!a.startsWith("--")) {
      dir = a;
    }
  }
  return { dir, apply, quiet, exts };
}

interface Finding {
  file: string;
  line: number;
  rule: string;
  message: string;
  hint?: string;
}

const findings: Finding[] = [];

async function* walk(dir: string, exts: string[]): AsyncIterable<string> {
  for await (const entry of Deno.readDir(dir)) {
    if (entry.name.startsWith(".")) continue;
    if (entry.name === "node_modules") continue;
    if (entry.name === "dist" || entry.name === "coverage") continue;
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory) yield* walk(path, exts);
    else if (entry.isFile && exts.some((e) => entry.name.endsWith(e))) {
      yield path;
    }
  }
}

function lineOf(src: string, idx: number): number {
  return src.slice(0, idx).split("\n").length;
}

function rule_standalone_for(file: string, src: string) {
  // describe({ for: { … } }) with no other top-level fields.
  // Look for `describe({\s*for: { … } })` where the only key inside the
  // outer object is `for`. We approximate by scanning for `describe({` and
  // counting top-level keys via a small balanced-brace walk.
  const re = /describe\s*\(\s*{/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    const start = m.index + m[0].length;
    const obj = readBalancedObject(src, start);
    if (!obj) continue;
    const keys = topLevelKeys(obj);
    if (keys.length === 1 && keys[0] === "for") {
      findings.push({
        file,
        line: lineOf(src, m.index),
        rule: "standalone-for",
        message:
          "describe({ for: ... }) without a wrapping tag now renders inside a <div>.",
        hint:
          "If you relied on the items appearing un-wrapped in the parent, lift the for-block up: replace this describe with the parent describe's `for:` directly.",
      });
    }
  }
}

function rule_children_for_workaround(file: string, src: string) {
  const re =
    /catch\s*\([^)]*\)\s*{\s*\/\/\s*[^\n]*(?:children\s*\+\s*for|cannot\s*set\s*both\s*children)[^\n]*/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    findings.push({
      file,
      line: lineOf(src, m.index),
      rule: "children-for-workaround",
      message:
        "Found a try/catch around the old 'cannot set both children and for' restriction.",
      hint:
        "1.0 allows children and for on the same describe; you can drop this catch block.",
    });
  }
}

function rule_aftermount_query(file: string, src: string) {
  // afterMount() { ... this.shadowRoot.querySelector(...) ... }
  const re =
    /afterMount\s*\(\s*\)\s*\{[^}]*this\.shadowRoot[\s\S]*?querySelector\s*\(/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    findings.push({
      file,
      line: lineOf(src, m.index),
      rule: "aftermount-query",
      message:
        "afterMount calls this.shadowRoot.querySelector — could move to a `refs:` map.",
      hint:
        "Declare `refs: { input: '.search' }` on the describe and access it as `this.refs.input` (or `ctx.refs.input` from event handlers). Refs are re-queried after every render so they always point at the live node.",
    });
  }
}

/** Read a balanced `{ ... }` block starting at `start` (just after the opening `{`). */
function readBalancedObject(src: string, start: number): string | null {
  let depth = 1;
  let i = start;
  let inStr: string | null = null;
  let escaped = false;
  while (i < src.length && depth > 0) {
    const c = src[i];
    if (inStr) {
      if (escaped) escaped = false;
      else if (c === "\\") escaped = true;
      else if (c === inStr) inStr = null;
    } else if (c === '"' || c === "'" || c === "`") {
      inStr = c;
    } else if (c === "{") depth++;
    else if (c === "}") depth--;
    i++;
  }
  if (depth !== 0) return null;
  return src.slice(start, i - 1);
}

function topLevelKeys(objBody: string): string[] {
  const keys: string[] = [];
  let depth = 0;
  let inStr: string | null = null;
  let escaped = false;
  let lookingForKey = true;
  let keyBuf = "";
  for (let i = 0; i < objBody.length; i++) {
    const c = objBody[i];
    if (inStr) {
      if (escaped) escaped = false;
      else if (c === "\\") escaped = true;
      else if (c === inStr) inStr = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") {
      inStr = c;
      continue;
    }
    if (c === "{" || c === "[" || c === "(") depth++;
    else if (c === "}" || c === "]" || c === ")") depth--;
    if (depth !== 0) continue;
    if (c === "," && depth === 0) {
      lookingForKey = true;
      keyBuf = "";
      continue;
    }
    if (lookingForKey) {
      if (/\s/.test(c)) continue;
      if (c === ":") {
        if (keyBuf) keys.push(keyBuf.replace(/^["']|["']$/g, ""));
        keyBuf = "";
        lookingForKey = false;
        continue;
      }
      keyBuf += c;
    }
  }
  return keys;
}

async function main() {
  const args = parseArgs(Deno.args);
  console.log(`tan-compose codemod ${VERSION}`);
  console.log(`scanning: ${args.dir} (extensions: ${args.exts.join(", ")})`);
  if (args.apply) {
    console.log(
      "note: --apply is a placeholder for future autofix rules; this codemod currently only reports findings.",
    );
  }
  console.log();

  let scanned = 0;
  for await (const file of walk(args.dir, args.exts)) {
    scanned++;
    let src: string;
    try {
      src = await Deno.readTextFile(file);
    } catch {
      continue;
    }
    rule_standalone_for(file, src);
    rule_children_for_workaround(file, src);
    rule_aftermount_query(file, src);
  }

  if (findings.length === 0) {
    console.log(`✓ ${scanned} files scanned. No 0.4 → 1.0 patterns found.`);
    Deno.exit(0);
  }

  const byFile = new Map<string, Finding[]>();
  for (const f of findings) {
    if (!byFile.has(f.file)) byFile.set(f.file, []);
    byFile.get(f.file)!.push(f);
  }

  for (const [file, fs] of byFile) {
    if (args.quiet) {
      console.log(`${file}: ${fs.length} finding(s)`);
      continue;
    }
    console.log(`\n${file}`);
    for (const f of fs) {
      console.log(`  L${f.line}  [${f.rule}]  ${f.message}`);
      if (f.hint) console.log(`         ↳ ${f.hint}`);
    }
  }

  console.log(
    `\n${findings.length} finding(s) across ${byFile.size} file(s) of ${scanned} scanned.`,
  );
  Deno.exit(findings.length > 0 ? 1 : 0);
}

if (import.meta.main) await main();
