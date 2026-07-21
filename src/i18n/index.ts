export { LOCALES, DEFAULT_LOCALE, type Locale, type Dict } from "./types";
export {
  ORIGIN,
  localizedRoutes,
  routeKeys,
  type RouteKey,
  pathFor,
  localeFromPath,
  routeKeyFromPath,
  hasLocalizedEquivalent,
  altPathFor,
  canonicalUrlFor,
} from "./routes";
export { LocaleProvider, useLocale } from "./LocaleContext";
export { useCopy } from "./useCopy";
export {
  isCrawlerUA,
  getStoredLocale,
  storeLocale,
  applyLocaleRedirect,
} from "./boot";
