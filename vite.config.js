import react from "@vitejs/plugin-react";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

// Obtener el equivalente a __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === "production" ? "/Axon.app/" : "/",

  // Configuración del servidor de desarrollo
  server: {
    open: true,
    port: 3000,
    host: true, // Necesario para acceso por red
    strictPort: false, // Permite usar puerto alternativo si está ocupado
  },

  // Optimizaciones de build
  build: {
    outDir: "dist",
    minify: "terser",
    sourcemap: mode !== "production",
    terserOptions: {
      compress: {
        drop_console: mode === "production",
        drop_debugger: mode === "production"
      }
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          if (id.includes('@fontsource')) {
            return 'fonts';
          }
          if (id.includes('node_modules/canvas') || id.includes('node_modules/to-ico')) {
            return 'utils';
          }
        },
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name.split('.').pop();
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return 'assets/img/[name]-[hash][extname]';
          }
          if (/woff|woff2|ttf|otf/i.test(extType)) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js'
      }
    },
    // Límites y warnings
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    target: "esnext",
    modulePreload: true,
  },

  // Optimizaciones generales
  optimizeDeps: {
    include: ["react", "react-dom"],
    exclude: ["@fontsource/orbitron", "@fontsource/rajdhani"]
  },

  // Alias para importaciones
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src') },
      { find: '@components', replacement: resolve(__dirname, 'src/components') },
      { find: '@assets', replacement: resolve(__dirname, 'src/assets') }
    ]
  },
}));
