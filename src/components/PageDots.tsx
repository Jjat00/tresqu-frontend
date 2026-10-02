/**
 * Retícula de puntos «Noche de puntos» en CSS puro (sin canvas ni JS), para
 * las páginas públicas que no son la landing. Mismo dibujo que el blog Astro.
 * Requiere src/styles/noche.css y un contenedor con position: relative.
 */
const PageDots = () => (
  <div className="tq-dotfield" aria-hidden="true">
    <span className="dim" />
    <span className="bright" />
  </div>
);

export default PageDots;
