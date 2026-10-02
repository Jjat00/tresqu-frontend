# Diccionarios de copy (ES/EN)

Un archivo por componente/página. Cada uno exporta `Dict<XCopy>` — si falta
una clave en un idioma, TypeScript no compila. Usar `.tsx` cuando el copy
incluye ReactNode (títulos con `<span>` de énfasis).

## Reglas de traducción al inglés

- **Nunca** la palabra "bot": usar "Tresqu", "agent" o "agent team".
- **Nunca** mencionar proveedores de tecnología (GPT, Whisper, LangChain).
  "AI" y "embeddings" están permitidos si son verdad.
- Adaptar ejemplos LATAM, no calcarlos: "Gasté 20k en almuerzo" →
  "Spent $12 on lunch" (montos en USD, sin jerga local).
- Nombres de marca intactos: Wallbit, Chests, WhatsApp, Telegram, Gmail.
- URL de Wallbit por idioma: `https://www.wallbit.io/es` (ES) vs
  `https://www.wallbit.io` (EN).
- Los anchors de secciones (`#por-que`, `#ejemplos`, `#faq`; ver `HOME_ANCHORS` en `home.ts`) son los mismos en
  ambos idiomas — solo se traduce el label visible.

## Espejos que mantener en sync al tocar copy

- Fallback estático `#root` de `/index.html` (ES) y `/en.html` (EN).
- FAQPage del JSON-LD en ambos shells ↔ `faq.items` de `home.ts` (texto idéntico:
  Google exige que las preguntas marcadas estén visibles en la página).
- Meta description de la home en `seo.ts` ↔ `<meta name="description">` de los shells.
- `/public/llms.txt` (sección ES y sección English).
