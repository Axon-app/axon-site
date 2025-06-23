import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === "production" ? "/Axon.app/" : "/",
  server: {
    open: true,
    port: 5173,
  },  build: {
    outDir: "dist",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: mode === "production", // Remover console.log solo en producción
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
          // Separar fuentes en su propio chunk
          if (id.includes("@fontsource")) {
            return "fonts";
          }
        },
      },
    },
    // Optimizar assets
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
}));
