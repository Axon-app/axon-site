import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === "production" ? "/axon-site/" : "/",
  server: {
    open: true,
  },
  build: {
    sourcemap: mode !== "production", // Genera sourcemaps solo en desarrollo
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      input: {
        main: "./index.html",
      },
    },
    minify: "esbuild", // Usa esbuild para minificar, que es más rápido
  },
}));
