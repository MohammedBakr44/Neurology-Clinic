import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 3000,
    hmr: {
      port: 3001,
    },
    watch: {
      usePolling: true,
      interval: 100,
    },
    fs: {
      allow: ["../.."],
    },
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
      "@neurology/db": path.resolve(__dirname, "../../packages/db/src"),
      "@neurology/ui": path.resolve(__dirname, "../../packages/ui/src"),
      "@ui": path.resolve(__dirname, "../../packages/ui/src"),
    },
  },
  plugins: [tailwindcss(), tanstackStart(), react()],
});
