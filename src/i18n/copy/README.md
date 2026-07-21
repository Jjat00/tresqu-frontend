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
- Los anchors de secciones (`#equipo`, `#wallbit`, …) son los mismos en
  ambos idiomas — solo se traduce el label visible.

## Espejos que mantener en sync al tocar copy

- Fallback estático `#root` de `/index.html` (ES) y `/en/index.html` (EN).
- FAQPage del JSON-LD en ambos shells ↔ FAQs de `wallbit.tsx`.
- `/public/llms.txt` (sección ES y sección English).
