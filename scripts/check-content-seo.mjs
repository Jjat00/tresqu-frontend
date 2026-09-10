import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';

// Comprueba los archivos finales que recibirá Cloudflare, sin ejecutar la app
// ni depender de su fallback SPA (que puede ocultar rutas estáticas ausentes).
const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');
const links = JSON.parse(await read('src/lib/solutionLinks.json'));
const routePaths = links.map(({ path }) => path);
const contentPaths = [...routePaths, '/sobre-tresqu/', '/blog/', '/blog/registrar-gastos-por-whatsapp/'];
const site = 'https://tresqu.com';
const index = await read('dist/sitemap-index.xml');
let sitemap = '';
for (const [, url] of index.matchAll(/<loc>(.*?)<\/loc>/g)) {
  assert.equal(new URL(url).origin, site);
  sitemap += await read(`dist${new URL(url).pathname}`);
}
const spaSitemap = await read('dist/sitemap.xml');
const spaPaths = new Set([...spaSitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, url]) => new URL(url).pathname));
spaPaths.add('/login');
const home = await read('dist/index.html');
const englishHome = await read('dist/en.html');
const llms = await read('dist/llms.txt');
const titles = new Set();
const descriptions = new Set();
const plain = (html) => html.replace(/<[^>]+>/g, ' ').replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'").replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();

for (const path of contentPaths) {
  const html = await read(`dist${path}index.html`);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `${path}: H1 único`);
  assert.ok(html.includes(`<link rel="canonical" href="${site}${path}"`), `${path}: canonical propio`);
  assert.ok(sitemap.includes(`<loc>${site}${path}</loc>`), `${path}: incluido en sitemap`);
  assert.ok(!/noindex/i.test(html), `${path}: indexable`);
  assert.ok(!/<script[^>]+src=/i.test(html), `${path}: contenido sin JS de aplicación`);
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  assert.ok(title && !titles.has(title), `${path}: título único`);
  assert.ok(description && !descriptions.has(description), `${path}: descripción única`);
  titles.add(title);
  descriptions.add(description);

  const blocks = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].map(([, json]) => JSON.parse(json));
  const faq = blocks.find((block) => block['@type'] === 'FAQPage');
  assert.ok(blocks.some((block) => block['@id'] === `${site}/#organization`), `${path}: identidad de Tresqu`);
  if (path !== '/blog/' && path !== '/sobre-tresqu/') {
    assert.ok(blocks.some((block) => block['@type'] === 'BreadcrumbList'), `${path}: breadcrumbs`);
    assert.ok(faq?.mainEntity.length, `${path}: FAQs`);
    const visible = plain(html.replace(/<script\b[^>]*>.*?<\/script>/gs, ''));
    for (const question of faq.mainEntity) {
      assert.ok(visible.includes(question.name), `${path}: pregunta visible`);
      assert.ok(visible.includes(question.acceptedAnswer.text), `${path}: respuesta visible`);
    }
  }
  for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
    const url = new URL(href, site);
    if (url.origin !== site) continue;
    if (spaPaths.has(url.pathname)) continue;
    if (contentPaths.includes(url.pathname)) continue;
    await access(new URL(`dist${url.pathname}`, root));
  }
  for (const linked of routePaths) {
    assert.ok(html.includes(`href="${linked}"`), `${path}: enlace a ${linked}`);
  }
}
for (const path of routePaths) {
  assert.ok(home.includes(`href="${path}"`), `${path}: home sin JS`);
  assert.ok(englishHome.includes(`href="${path}"`), `${path}: home inglesa sin JS`);
  assert.ok(llms.includes(`${site}${path}`), `${path}: llms.txt`);
}
console.log(`SEO verificado: ${contentPaths.length} páginas estáticas, HTML, canonical, metadatos, FAQ visible, enlaces y sitemap.`);
