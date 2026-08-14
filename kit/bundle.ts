/**
 * Pre-build the kit + each theme into CDN-ready ESM bundles under
 * `kit/dist/`. The artifacts are committed and tagged with each
 * release, so jsDelivr (which serves files from git refs) can deliver
 * them byte-for-byte:
 *
 *   https://cdn.jsdelivr.net/gh/RA9/tan-compose@kit-vX.Y.Z/kit/dist/kit.min.js
 *
 * This route bypasses esm.sh's transformer entirely — what we ship
 * here is what consumers run.
 *
 * Targets produced:
 *   - dist/kit.min.js              minified, sourcemap, all 35 components
 *   - dist/kit.js                  non-minified twin for debugging
 *   - dist/themes/<name>.min.js    one per theme preset (tokens, dark, …)
 *
 * Run with:
 *   cd kit && deno task bundle
 */

import * as esbuild from "esbuild";
import { denoPlugins } from "@luca/esbuild-deno-loader";

const THEMES = [
  "tokens",
  "dark",
  "bootstrap",
  "tailwind",
  "material",
  "shadcn",
];

/**
 * At publish time, kit/deno.json maps `@ra9/tan-compose` to the JSR URL so
 * the published manifest declares a real cross-package dependency. At
 * bundle time we want the OPPOSITE — resolve to the workspace-local
 * `../mod.ts` so we ship one fat file with the core inlined and consumers
 * don't have to fetch a second module. This plugin intercepts the bare
 * specifier before the deno-loader gets to it.
 */
const inlineCorePlugin: esbuild.Plugin = {
  name: "inline-tan-compose-core",
  setup(build) {
    const corePath = new URL("../mod.ts", import.meta.url).pathname;
    build.onResolve({ filter: /^@ra9\/tan-compose$/ }, () => ({
      path: corePath,
    }));
  },
};

const sharedConfig = {
  plugins: [
    inlineCorePlugin,
    ...denoPlugins({ configPath: `${Deno.cwd()}/deno.json` }),
  ],
  bundle: true,
  platform: "browser" as const,
  format: "esm" as const,
  target: "esnext",
  treeShaking: true,
};

// Main kit bundle — minified for prod, plain for debugging.
await esbuild.build({
  ...sharedConfig,
  entryPoints: [{ in: "./mod.ts", out: "kit.min" }],
  outdir: "./dist/",
  minify: true,
  sourcemap: true,
});

await esbuild.build({
  ...sharedConfig,
  entryPoints: [{ in: "./mod.ts", out: "kit" }],
  outdir: "./dist/",
  minify: false,
  sourcemap: true,
});

// Blocks bundle — page templates + the primitives they compose, so a
// single <script src="…/blocks.min.js"> registers everything a template
// needs. Self-contained (core inlined); superset of kit.min.js.
await esbuild.build({
  ...sharedConfig,
  entryPoints: [{ in: "./blocks/mod.ts", out: "blocks.min" }],
  outdir: "./dist/",
  minify: true,
  sourcemap: true,
});

await esbuild.build({
  ...sharedConfig,
  entryPoints: [{ in: "./blocks/mod.ts", out: "blocks" }],
  outdir: "./dist/",
  minify: false,
  sourcemap: true,
});

// Themes — one bundle each, minified only.
for (const theme of THEMES) {
  await esbuild.build({
    ...sharedConfig,
    entryPoints: [{ in: `./themes/${theme}.ts`, out: theme }],
    outdir: "./dist/themes/",
    minify: true,
    sourcemap: false,
  });
}

await esbuild.stop();

// Friendly summary so CI logs and local runs both surface the sizes.
console.log("kit bundle output:");
const rows: Array<readonly [string, number]> = [
  ["dist/kit.min.js", (await Deno.stat("./dist/kit.min.js")).size],
  ["dist/kit.js", (await Deno.stat("./dist/kit.js")).size],
  ["dist/blocks.min.js", (await Deno.stat("./dist/blocks.min.js")).size],
  ["dist/blocks.js", (await Deno.stat("./dist/blocks.js")).size],
];
for (const t of THEMES) {
  rows.push([
    `dist/themes/${t}.js`,
    (await Deno.stat(`./dist/themes/${t}.js`)).size,
  ]);
}
for (const [path, size] of rows) {
  const kb = (size / 1024).toFixed(1);
  console.log(`  ${path.padEnd(28)} ${kb.padStart(7)} KB`);
}
