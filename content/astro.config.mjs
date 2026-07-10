import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Capa de contenido estático (blog/guías/comparativas), independiente del SPA.
// Compila a content/dist y el script de build raíz la fusiona dentro de dist/:
// Cloudflare Pages sirve archivos reales antes del fallback /* -> /index.html,
// así que estas páginas nunca pasan por React (sin riesgo de hydration).
export default defineConfig({
  site: 'https://tresqu.com',
  integrations: [sitemap()],
});
