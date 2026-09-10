# Crecimiento de Tresqu en Latinoamérica

Fecha de revisión: 10 de septiembre de 2026. Jaime autorizó commit y push a main con la home anterior y las mejoras SEO/GEO/AEO. Resultados de indexación y posicionamiento pendientes de medición.

## Posicionamiento

Tresqu es un asistente financiero con IA que conecta gastos, ingresos y una cuenta de inversión de Wallbit mediante conversación. WhatsApp es una puerta de entrada; el valor que se debe demostrar es registrar, consultar y revisar el portafolio desde el mismo flujo.

Primera audiencia a validar: personas en Colombia que gestionan gastos en COP y quieren consultar también inversiones en USD. Ampliar a otros países con evidencia de uso, demanda y disponibilidad de integraciones. No crear páginas por país cambiando solo el nombre.

## Páginas y búsquedas

| Ruta | Intención principal | Búsquedas secundarias | Acción que debe facilitar |
| --- | --- | --- | --- |
| `/asistente-financiero-ia/` | Evaluar el producto | asistente financiero WhatsApp, agente de IA para finanzas personales | Comenzar la conversación |
| `/finanzas-personales-ia/` | Aprender un método de organización | IA para finanzas personales, registrar gastos con IA | Registrar y consultar movimientos |
| `/control-gastos-whatsapp/` | Elegir una solución de gastos | control de gastos por WhatsApp | Probar el flujo de registro y consulta |
| `/app-finanzas-personales-colombia/` | Evaluar una app local | app para controlar gastos Colombia, mejor app de finanzas personales Colombia | Comprobar uso en COP e integraciones |
| `/inversiones-con-inteligencia-artificial/` | Entender la integración | controlar gastos e inversiones con IA | Conocer requisitos y conectar Wallbit si corresponde |
| `/blog/registrar-gastos-por-whatsapp/` | Aprender a usar el registro | registrar gastos por WhatsApp, gastos por voz o foto | Completar el primer movimiento |

No se dispone de volúmenes ni dificultad de keywords verificados. Las prioridades se basan en intención y producto; validar con impresiones y consultas de Search Console. La guía y la página comercial de WhatsApp deben responder necesidades distintas. Si Google alterna ambas para la misma consulta y ninguna progresa, revisar intención y contenido antes de fusionar o redirigir.

## Evidencia revisada

- [Marranito](https://marranito.app/) se presenta como asistente por WhatsApp y anuncia gastos e ingresos ilimitados en Free, con otros límites. No implica que todas sus funciones sean ilimitadas.
- [Sumak](https://sumak.io/) se presenta como finanzas con IA para Latinoamérica y anuncia texto, voz y recibos por WhatsApp.
- [Wallbit](https://www.wallbit.io/) anuncia inversiones en acciones y ETFs de Estados Unidos. Disponibilidad y tarifas se consultan con el proveedor.
- [Google Search Central](https://developers.google.com/search/docs/appearance/ai-features) mantiene el SEO como base de sus funciones de IA. No hay un archivo especial que garantice aparecer en AI Overviews.
- Las funciones descritas de Tresqu se contrastaron con el copy y las herramientas existentes del repositorio: registro, analista de mercado e integración con confirmación. No se probaron operaciones de dinero real.

No se afirma que Tresqu sea el único producto con este enfoque ni que ya sea líder. Las páginas no incluyen rankings, cifras de ahorro, rentabilidades ni reseñas sin respaldo.

## Publicación y verificación

Jaime descartó la propuesta de home conversacional el 10-09-2026 y pidió conservar la home anterior: «Sabe cómo vives. Invierte como eres». Se restauraron su diseño, secciones, navegación y metadatos ES/EN; solo se añadieron los enlaces al contenido SEO/GEO/AEO en el footer y en el HTML inicial. Se retiró el generador de la propuesta rechazada para que el build no la vuelva a introducir. `main` despliega automáticamente en Cloudflare Pages. Jaime autorizó publicar este conjunto el mismo día.

1. `npm run build` genera Vite, las ocho páginas Astro y los sitemaps.
2. `npm run check:seo` comprueba el HTML final, metadatos únicos, canonical, FAQ visible, identidad de Tresqu y enlaces. Las páginas Astro no cargan el bundle React.
3. Jaime revisa las cinco páginas en la salida de producción local (`npm run preview`), home ES/EN y acceso por CTA. El servidor `npm run dev` de Vite no sirve las páginas Astro; `npm run dev:content` permite editar solo contenido.
4. Tras desplegar, comprobar que cada ruta responde con su propio HTML y canonical, también sin barra final, conservando `/en/*`.
5. En Search Console, enviar `https://tresqu.com/sitemap-index.xml` para contenido y conservar `https://tresqu.com/sitemap.xml` para el SPA. Solicitar inspección de las cinco rutas. Repetir alta de sitemaps en Bing Webmaster Tools si no está hecha.

Estos controles no demuestran indexación ni posicionamiento. No se han conectado Search Console, Bing ni una herramienta de analítica en esta entrega.

## Plan de 90 días

### GEO y AEO como parte del mismo sistema

- **Respuestas:** introducciones autocontenidas, preguntas reales y tablas que explican capacidades, requisitos y límites. FAQ visible y JSON-LD se generan desde los mismos datos. No se promete un resultado enriquecido de FAQ en Google, cuya elegibilidad es limitada.
- **Identidad:** `/sobre-tresqu/` explica producto, integraciones, equipo editorial, fuentes y contacto. `Organization` y `SoftwareApplication` comparten identificadores con la home. Las firmas enlazan al equipo. No se inventan credenciales profesionales.
- **Acceso:** HTML estático completo, sin JS de aplicación, enlaces rastreables, sitemap y canonical propio. `robots.txt` permite los rastreadores actuales; no fue necesario ampliar permisos. OAI-SearchBot y PerplexityBot son relevantes para búsqueda; GPTBot y Google-Extended tienen finalidades diferentes y no se deben confundir con requisitos de indexación de Google. `llms.txt` es un índice complementario, sin efecto de posicionamiento demostrado para Tresqu.
- **Confianza:** fuentes oficiales cuando hay afirmaciones sobre terceros; condiciones y ejemplos identificados. La fecha visible indica revisión, no antigüedad ficticia ni experiencia profesional.
- **Presencia externa:** demos comprobables, reseñas independientes y menciones reales. El borrador editorial al final de este documento queda listo para adaptar; no se enviaron mensajes.
- **Medición:** `docs/visibilidad-ia.csv` contiene las consultas prioritarias, sin resultados inventados. Registrar plataforma/modelo, fecha, país/idioma, consulta exacta, mención y URL citada. Repetir mensualmente con el mismo protocolo; conservar la fuente de cada observación. Una respuesta aislada no demuestra cuota de visibilidad.

Protocolo para la matriz: ejecutar cada consulta en una conversación nueva con búsqueda cuando esté disponible, en español y con país de referencia Colombia. En Google registrar presencia de AI Overview y la fuente visible; en ChatGPT, Perplexity y Gemini separar «menciona Tresqu» de «cita una URL de Tresqu». Si no hay respuesta generativa, registrar «no disponible», no «ausente». Capturar la versión del modelo que muestre el producto y no equiparar una búsqueda web genérica con un resultado obtenido en esas plataformas.

Indicadores: menciones / respuestas observadas, citas de dominio / respuestas observadas, páginas citadas y competidores mencionados, separados por plataforma. Estado inicial: pendiente de medición. Search Console no ofrece una dimensión exclusiva de GEO; los referidos tampoco capturan las respuestas sin clic.

No se crearon páginas duplicadas «solo para IA» ni se publicaron estadísticas de visibilidad de terceros como si fueran resultados de Tresqu.

### Secuencia

| Periodo | Trabajo | Evidencia para continuar |
| --- | --- | --- |
| Días 1 a 14 | Publicar páginas, verificar indexabilidad y obtener línea base de búsquedas y activación | URLs accesibles; estado de indexación documentado; medición disponible |
| Días 15 a 30 | Revisar consultas reales; grabar tres demos: registro y corrección, consulta mensual, portafolio con confirmación | Demos que muestran funciones reales y preguntas de usuarios |
| Días 31 a 60 | Presentar Tresqu a medios y directorios adecuados; publicar una comparativa si hay pruebas de ambos productos | Menciones verificables, referidos y feedback, sin reseñas compradas |
| Días 61 a 90 | Mejorar páginas con impresiones relevantes y revisar cohortes; decidir siguiente país por evidencia | Conversión y retención, además de tráfico; disponibilidad del producto en ese país |

La ejecución de envíos a terceros requiere autorización explícita de Jaime. No se enviaron correos, mensajes ni formularios. Preparar materiales no compromete presupuesto de anuncios ni servicios pagados.

## Medición y reglas de decisión

Medida principal propuesta: usuarios que registran un movimiento y vuelven a consultar sus finanzas en los siguientes siete días. Registrar una cuenta o hacer clic en WhatsApp no equivale a usar el producto.

| Métrica | Fuente necesaria | Frecuencia |
| --- | --- | --- |
| Impresiones, clics, CTR y consultas por página y país | Search Console | Semanal, con ventanas comparables de 28 días |
| Sesiones orgánicas y clics hacia WhatsApp/web | Analítica de sitio por configurar | Semanal |
| Primer movimiento y primera consulta completados | Eventos de producto, agregados | Semanal por cohorte |
| Retorno a 7 y 30 días | Eventos de producto, agregados | Semanal y mensual |
| Conexión de Wallbit y consulta del portafolio | Eventos de producto, agregados | Semanal |
| Referidos desde buscadores y asistentes | Analítica y revisión de fuentes | Mensual |

Instrumentación pendiente: elegir la herramienta de medición ya autorizada o configurar una; acordar eventos y atribución entre web y WhatsApp. No enviar mensajes, montos, recibos, correos ni identificadores financieros a analítica. No inferir activación por clics o parámetros UTM: hace falta enlazar el origen con eventos de producto mediante un mecanismo apropiado.

- Si las URLs no se indexan: inspeccionar canonical, acceso, renderizado y señales de calidad antes de añadir páginas.
- Si hay impresiones relevantes y pocos clics: revisar intención, títulos y descripción con ventanas comparables.
- Si hay visitas pero pocos primeros movimientos: revisar el recorrido de alta y el primer registro.
- Si hay activación pero poco retorno: trabajar utilidad de las consultas, precisión y experiencia del producto.
- Si existen adopción y retención: aumentar distribución y experimentar con una nueva audiencia.

No se fijan metas numéricas inventadas. Obtener una línea base actual durante los primeros 14 días y acordar después objetivos de mejora. No trasladar el dato histórico de julio como si midiera septiembre.

## Borrador para una reseña o demostración editorial

Asunto: Tresqu: gastos, ingresos e inversiones en una conversación

Hola, soy Jaime, creador de Tresqu. Estamos construyendo un asistente financiero con IA para registrar gastos e ingresos por WhatsApp, consultar movimientos y conectar una cuenta de Wallbit para revisar inversiones y preparar operaciones que el usuario confirma.

Si están preparando contenido sobre apps de finanzas personales en Colombia, puedo compartir una demo y el acceso público para que evalúen el producto con sus propios criterios. Me interesa conocer tanto lo que funciona como lo que falta.

Información del producto: https://tresqu.com/asistente-financiero-ia/

Este borrador se utiliza después de publicar las páginas. Adaptar al medio y no enviarlo masivamente. Los testimonios deben provenir de usuarios reales y contar con permiso para publicarse.
