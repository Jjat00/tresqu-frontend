import { DEFAULT_LOCALE, type Locale } from "./types";

export const ORIGIN = "https://tresqu.com";

/**
 * Tabla central de rutas públicas ES↔EN. Es la única fuente de verdad:
 * de aquí salen las <Route> de App.tsx, los links internos, el selector
 * de idioma y los canonical/hreflang.
 *
 * Las rutas sin entrada aquí (legales, dashboard) existen solo en español.
 */
export const localizedRoutes = {
  home: { es: "/", en: "/en" },
  features: { es: "/funciones", en: "/en/features" },
  login: { es: "/login", en: "/en/login" },
} as const;

export type RouteKey = keyof typeof localizedRoutes;

export const routeKeys = Object.keys(localizedRoutes) as RouteKey[];

export const pathFor = (key: RouteKey, locale: Locale): string =>
  localizedRoutes[key][locale];

export const localeFromPath = (pathname: string): Locale =>
  pathname === "/en" || pathname.startsWith("/en/") ? "en" : DEFAULT_LOCALE;

const normalize = (pathname: string): string =>
  pathname.length > 1 && pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;

/** RouteKey de un pathname, o null si la ruta no está en la tabla. */
export const routeKeyFromPath = (pathname: string): RouteKey | null => {
  const path = normalize(pathname);
  for (const key of routeKeys) {
    if (localizedRoutes[key].es === path || localizedRoutes[key].en === path) {
      return key;
    }
  }
  return null;
};

export const hasLocalizedEquivalent = (pathname: string): boolean =>
  routeKeyFromPath(pathname) !== null;

/**
 * Ruta equivalente en el otro idioma. Para rutas sin mapeo (legales,
 * dashboard) devuelve el home del idioma destino.
 */
export const altPathFor = (pathname: string): string => {
  const targetLocale: Locale =
    localeFromPath(pathname) === "es" ? "en" : DEFAULT_LOCALE;
  const key = routeKeyFromPath(pathname);
  return pathFor(key ?? "home", targetLocale);
};

/**
 * URL absoluta para canonical/hreflang/sitemap. El home EN siempre con
 * slash final (Cloudflare normaliza /en → /en/ al existir en/index.html).
 */
export const canonicalUrlFor = (key: RouteKey, locale: Locale): string => {
  const path = localizedRoutes[key][locale];
  if (path === "/") return `${ORIGIN}/`;
  if (path === "/en") return `${ORIGIN}/en/`;
  return `${ORIGIN}${path}`;
};
