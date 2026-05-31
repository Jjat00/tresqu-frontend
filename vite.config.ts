import { defineConfig, type UserConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// Solo prerenderizamos las páginas públicas. El dashboard y el login quedan
// fuera (auth + dinámicas) y siguen siendo SPA pura en cliente.
// vite-react-ssg entrega los paths hijos sin barra inicial ("privacy-policy"),
// así que comparamos normalizados (sin "/" y "" == raíz).
const PUBLIC_ROUTES = new Set([
  "",
  "privacy-policy",
  "legal-notice",
  "facebook-privacy-policy",
  "tresqu-cent",
]);

// `ssgOptions` lo añade vite-react-ssg sobre el config de Vite.
type SSGConfig = UserConfig & {
  ssgOptions?: {
    script?: "sync" | "async" | "defer" | "async defer";
    formatting?: "minify" | "prettify" | "none";
    includedRoutes?: (paths: string[]) => string[] | Promise<string[]>;
  };
};

// https://vitejs.dev/config/
export default defineConfig((): SSGConfig => ({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {},
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {},
      },
    },
    assetsDir: "assets",
  },
  base: "/",
  ssgOptions: {
    script: "async",
    formatting: "minify",
    includedRoutes: (paths) =>
      paths.filter((p) => PUBLIC_ROUTES.has(p.replace(/^\//, ""))),
  },
}));
