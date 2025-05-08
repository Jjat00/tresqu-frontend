// Función para obtener un tono más oscuro de un color para texto
const getDarkerShade = (hexColor: string): string => {
  // Si no hay color, retornar negro
  if (!hexColor) return "#000000";

  // Convertir hex a RGB
  const r = parseInt(hexColor.substring(1, 3), 16);
  const g = parseInt(hexColor.substring(3, 5), 16);
  const b = parseInt(hexColor.substring(5, 7), 16);

  // Oscurecer en un 30%
  const darkerR = Math.max(0, Math.floor(r * 0.7));
  const darkerG = Math.max(0, Math.floor(g * 0.7));
  const darkerB = Math.max(0, Math.floor(b * 0.7));

  // Convertir de nuevo a hex
  return `#${darkerR.toString(16).padStart(2, "0")}${darkerG
    .toString(16)
    .padStart(2, "0")}${darkerB.toString(16).padStart(2, "0")}`;
};

export default getDarkerShade;
