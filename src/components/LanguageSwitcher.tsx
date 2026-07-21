import { Link, useLocation } from "react-router-dom";
import { altPathFor, storeLocale, useLocale, type Locale } from "@/i18n";

/**
 * Píldora ES/EN. Navega a la ruta equivalente en el otro idioma (SPA, sin
 * recarga) y persiste la elección para que la detección no la pise.
 * Desde rutas sin mapeo (legales, dashboard) lleva al home del otro idioma.
 */
const LanguageSwitcher = ({ className = "" }: { className?: string }) => {
  const locale = useLocale();
  const { pathname, hash } = useLocation();
  const other: Locale = locale === "es" ? "en" : "es";
  const target = altPathFor(pathname) + hash;

  return (
    <Link
      to={target}
      onClick={() => storeLocale(other)}
      aria-label={locale === "es" ? "Switch to English" : "Cambiar a español"}
      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs font-semibold tracking-wide text-zinc-400 hover:text-white hover:border-white/25 transition-colors duration-200 ${className}`}
    >
      <span className={locale === "es" ? "text-white" : ""}>ES</span>
      <span className="text-zinc-600">/</span>
      <span className={locale === "en" ? "text-white" : ""}>EN</span>
    </Link>
  );
};

export default LanguageSwitcher;
