import { build, emptyDir } from "@deno/dnt";

await emptyDir("./npm");

await build({
  entryPoints: ["./src/index.ts"],
  outDir: "./npm",
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  test: false,
  testPattern: "**/*.test.ts",
  packageManager: "npm",
  typeCheck: "single",
  package: {
    // package.json properties
    name: "@dsdadynamic/mailerlite",
    version: Deno.args[0],
    description: "MailerLite SDK supporting multiple runtimes",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/dsda-dynamic/mailerlite-deno.git",
    },
    bugs: {
      url: "https://github.com/dsda-dynamic/mailerlite-deno/issues",
    },
    // devDependencies: {
    //   "talkback": "^4.2.0",
    //   "@types/node": "^18.0.0",
    //   "expect-type": "^1.2.2"
    // },
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});
