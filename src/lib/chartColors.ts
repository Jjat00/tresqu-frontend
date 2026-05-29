/**
 * Paleta neón Tresqu para todas las gráficas del dashboard.
 * Colores saturados y brillantes pensados para fondo oscuro.
 */

/** Acentos neón con nombre, para series semánticas. */
export const NEON = {
  green: "#00FF7F", // verde neón de marca
  cyan: "#22d3ee", // cyan eléctrico
  purple: "#b388ff", // púrpura neón
  pink: "#FF2D95", // magenta neón
  blue: "#3b82f6", // azul eléctrico
  amber: "#FFD60A", // amarillo neón
  orange: "#FF7A1A", // naranja neón
  lime: "#39FF14", // verde lima
  red: "#FF3B6B", // rojo/rosa neón
} as const;

/** Paleta cíclica para series sin color propio (donas, barras apiladas, etc.). */
export const NEON_PALETTE: string[] = [
  NEON.green,
  NEON.cyan,
  NEON.purple,
  NEON.pink,
  NEON.amber,
  NEON.blue,
  NEON.orange,
  NEON.lime,
];

/** Color neón por índice (cicla sobre la paleta). */
export const neonAt = (index: number): string =>
  NEON_PALETTE[index % NEON_PALETTE.length];

/** Gradiente verde→cyan de marca para líneas de tendencia. */
export const NEON_TREND: [string, string] = [NEON.green, NEON.cyan];

// --- Conversión de color para "neon-izar" colores existentes ---

const hexToRgb = (hex: string): [number, number, number] | null => {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  if (h.length !== 6 || /[^0-9a-fA-F]/.test(h)) return null;
  const num = parseInt(h, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
};

const rgbToHsl = (
  r: number,
  g: number,
  b: number,
): [number, number, number] => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  let h = 0;
  let s = 0;
  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }
    h /= 6;
  }
  return [h, s, l];
};

const hslToHex = (h: number, s: number, l: number): string => {
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h * 12) % 12;
    const c = l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return Math.round(255 * c)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));

/**
 * Convierte un color de categoría (ej. el que viene del backend) en una versión
 * neón: conserva el tono para mantener la identidad de la categoría, pero sube
 * saturación y ajusta la luminosidad para que brille sobre fondo oscuro.
 * Si el color no es parseable, cae a la paleta neón por índice.
 */
export const neonize = (
  color: string | null | undefined,
  fallbackIndex = 0,
): string => {
  // Sin color de categoría → usar la paleta neón por índice.
  if (!color) return neonAt(fallbackIndex);
  const rgb = hexToRgb(color);
  if (!rgb) return neonAt(fallbackIndex);
  const [h, s, l] = rgbToHsl(...rgb);
  const neonS = clamp(s * 1.35, 0.9, 1);
  const neonL = clamp(l, 0.52, 0.62);
  return hslToHex(h, neonS, neonL);
};
