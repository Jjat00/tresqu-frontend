/**
 * Parte un titular en dos tramos para pintar el segundo en verde, como la landing.
 * Corta tras el primer «:» (o «,» si no hay) sin alterar el texto: a + b === heading.
 * Si no hay un corte razonable devuelve el titular entero en `a`.
 */
export function splitHeading(heading: string): { a: string; b: string } {
  for (const mark of [':', ',']) {
    const i = heading.indexOf(mark);
    if (i > 8 && i < heading.length - 8) return { a: heading.slice(0, i + 1), b: heading.slice(i + 1) };
  }
  return { a: heading, b: '' };
}
