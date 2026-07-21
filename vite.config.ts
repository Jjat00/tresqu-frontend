import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// El fallback SPA de Vite reescribe toda ruta sin extensión a /index.html
// (shell español). En producción Cloudflare Pages sirve en/index.html vía
// public/_redirects; este plugin replica eso en dev y preview.
function enHtmlFallback(): Plugin {
  const rewrite = (req: { url?: string }) => {
    const url = (req.url ?? "").split("?")[0];
    if ((url === "/en" || url.startsWith("/en/")) && !url.includes(".")) {
      req.url = "/en/index.html";
    }
  };
  return {
    name: "en-html-fallback",
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        rewrite(req);
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        rewrite(req);
        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [react(), tailwindcss(), enHtmlFallback()],
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
      input: {
        main: path.resolve(__dirname, "index.html"),
        // Shell inglés para crawlers sin JS; se emite como dist/en/index.html
        en: path.resolve(__dirname, "en/index.html"),
      },
      output: {
        manualChunks: {},
      },
    },
    assetsDir: "assets",
  },
  base: "/",
}));
