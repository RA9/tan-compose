/**
 * Pre-build the icons package into a CDN-ready ESM bundle under
 * `icons/dist/`. The artifacts are committed and tagged with each
 * release, so jsDelivr (which serves files from git refs) can deliver
 * them byte-for-byte:
 *
 *   https://cdn.jsdelivr.net/gh/RA9/tan-compose@icons-vX.Y.Z/icons/dist/icons.min.js
 *
 * This route bypasses esm.sh's transformer entirely — what we ship
 * here is what consumers run. The core (`@ra9/tan-compose`) is inlined,
 * so a single <script> tag registers <tc-icon> with no second fetch.
 *
 * Targets produced:
 *   - dist/icons.min.js   minified, sourcemap — registers <tc-icon>
 *   - dist/icons.js       non-minified twin for debugging
 *
 * Run with:
 *   cd icons && deno task bundle
 */

import * as esbuild from "esbuild";
import { denoPlugins } from "@luca/esbuild-deno-loader";

/**
 * At publish time, icons/deno.json maps `@ra9/tan-compose` to the JSR URL
 * so the published manifest declares a real cross-package dependency. At
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

// Minified for prod.
await esbuild.build({
  ...sharedConfig,
  entryPoints: [{ in: "./mod.ts", out: "icons.min" }],
  outdir: "./dist/",
  minify: true,
  sourcemap: true,
});

// Plain twin for debugging.
await esbuild.build({
  ...sharedConfig,
  entryPoints: [{ in: "./mod.ts", out: "icons" }],
  outdir: "./dist/",
  minify: false,
  sourcemap: true,
});

await esbuild.stop();

console.log("icons bundle output:");
const rows: Array<readonly [string, number]> = [
  ["dist/icons.min.js", (await Deno.stat("./dist/icons.min.js")).size],
  ["dist/icons.js", (await Deno.stat("./dist/icons.js")).size],
];
for (const [path, size] of rows) {
  const kb = (size / 1024).toFixed(1);
  console.log(`  ${path.padEnd(20)} ${kb.padStart(7)} KB`);
}
