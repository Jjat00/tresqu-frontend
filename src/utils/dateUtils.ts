/**
 * Utilidades para manejar fechas en zona horaria local
 */

// Obtener la fecha actual en la zona horaria local
export const getLocalToday = (): Date => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

// Obtener la fecha de ayer en la zona horaria local
export const getLocalYesterday = (): Date => {
  const today = getLocalToday();
  today.setDate(today.getDate() - 1);
  return today;
};

// Verificar si una fecha es hoy en la zona horaria local
export const isLocalToday = (date: Date): boolean => {
  const today = getLocalToday();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
};

// Verificar si una fecha es ayer en la zona horaria local
export const isLocalYesterday = (date: Date): boolean => {
  const yesterday = getLocalYesterday();
  return (
    date.getFullYear() === yesterday.getFullYear() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getDate() === yesterday.getDate()
  );
};

// Convertir fecha a formato ISO local (sin UTC)
export const toLocalISODate = (date: Date): string => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
};

// Obtener la zona horaria del usuario
export const getUserTimezone = (): string => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (error) {
    console.warn("No se pudo determinar la zona horaria del usuario:", error);
    return "America/Bogota"; // Valor por defecto para la aplicación
  }
};
