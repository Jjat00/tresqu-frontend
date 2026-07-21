import { altPathFor, hasLocalizedEquivalent, localeFromPath } from "./routes";
import type { Locale } from "./types";

const LOCALE_KEY = "tresqu:locale";

// Googlebot renderiza con headless Chrome en en-US: sin esta exclusión,
// vería "/" convertirse en "/en" y la indexación del sitio ES se rompería.
const CRAWLER_RE =
  /bot|crawler|spider|crawling|slurp|bingpreview|headless|lighthouse|gptbot|claudebot|anthropic|perplexity|facebookexternalhit|whatsapp|telegrambot|linkedinbot|twitterbot|applebot|duckduck|yandex|baidu/i;

export const isCrawlerUA = (): boolean =>
  CRAWLER_RE.test(navigator.userAgent) || navigator.webdriver === true;

export const getStoredLocale = (): Locale | null => {
  try {
    const value = localStorage.getItem(LOCALE_KEY);
    return value === "es" || value === "en" ? value : null;
  } catch {
    return null;
  }
};

export const storeLocale = (locale: Locale): void => {
  try {
    localStorage.setItem(LOCALE_KEY, locale);
  } catch {
    // localStorage bloqueado (modo privado): la preferencia no persiste.
  }
};

/**
 * Detección de idioma en la primera visita. Debe llamarse ANTES de
 * root.render(): usa history.replaceState para que BrowserRouter monte
 * ya en la URL correcta — sin flash de idioma equivocado, sin entrada
 * extra en el historial y sin depender de efectos (StrictMode-safe).
 */
export function applyLocaleRedirect(): void {
  try {
    const path = window.location.pathname;

    // Llegó a /en por URL explícita: se respeta, y si no había
    // preferencia previa se adopta como tal.
    if (localeFromPath(path) === "en") {
      if (!getStoredLocale()) storeLocale("en");
      return;
    }

    if (getStoredLocale()) return;
    if (isCrawlerUA()) return;
    if (!hasLocalizedEquivalent(path)) return;

    const lang = (
      navigator.languages?.[0] ??
      navigator.language ??
      "es"
    ).toLowerCase();
    const preferred: Locale = lang.startsWith("es") ? "es" : "en";

    // La decisión se persiste aunque sea "es": la detección corre una
    // sola vez en la vida del navegador; después manda la URL/selector.
    storeLocale(preferred);
    if (preferred === "en") {
      window.history.replaceState(
        null,
        "",
        altPathFor(path) + window.location.hash,
      );
    }
  } catch {
    // Ante cualquier fallo (localStorage, UA raro) se queda en español.
  }
}
