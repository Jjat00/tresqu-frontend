export const LOCALES = ["es", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "es";

/**
 * Diccionario de copy: una entrada por idioma con la misma forma.
 * Si falta una clave en un idioma, TypeScript no compila.
 */
export type Dict<T> = Record<Locale, T>;
