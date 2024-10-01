import { build, emptyDir } from "https://deno.land/x/dnt@0.37.0/mod.ts";

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    deno: true,
  },
  package: {
    name: "tan-compose",
    version: Deno.args[0],
    description:
      "A tiny utility to compose web component and make them extensible.",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/RA9/tan-compose.git",
    },
    bugs: {
      url: "https://github.com/RA9/tan-compose/issues",
    },
  },
  postBuild() {
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});