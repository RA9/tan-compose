import * as esbuild from "esbuild";
import { denoPlugins } from "@luca/esbuild-deno-loader";

await esbuild.build({
  plugins: [...denoPlugins({ configPath: `${Deno.cwd()}/deno.json` })],
  entryPoints: ["./mod.ts"],
  outdir: "../dist/",
  outExtension: { ".js": ".kit.js" },
  bundle: true,
  platform: "browser",
  format: "esm",
  target: "esnext",
  minify: true,
  sourcemap: true,
  treeShaking: true,
});
await esbuild.stop();
