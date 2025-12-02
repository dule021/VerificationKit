import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

export default defineConfig({
  plugins: [preact()],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "UserVerifySdk",
      formats: ["es", "umd"],
      fileName: (format) => `user-verify-sdk.${format}.js`,
    },
    rollupOptions: {
      external: ["preact", "preact-custom-element"],
      output: {
        globals: {
          preact: "preact",
          "preact-custom-element": "preactCustomElement",
        },
      },
    },
    target: "es2020",
    minify: "esbuild",
    cssCodeSplit: false,
    emptyOutDir: true,
  },
});
