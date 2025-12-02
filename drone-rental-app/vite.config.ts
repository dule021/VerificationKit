import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["user-verify-sdk"], // Skip pre-bundling for live reload
  },
  server: {
    fs: {
      allow: [".."], // Serve from parent directories
    },
  },
});
