import { createContext, useContext, useEffect, type ReactNode } from "react";
import { DEFAULT_LOCALE, type Locale } from "./types";

const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

export const useLocale = (): Locale => useContext(LocaleContext);

export const LocaleProvider = ({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) => {
  // El shell HTML trae su propio lang; esto lo corrige al navegar
  // entre idiomas dentro de la SPA (sin recarga).
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
};
