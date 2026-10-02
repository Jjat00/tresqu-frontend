import { Link, useLocation } from "react-router-dom";
import { altPathFor, storeLocale, useLocale, type Locale } from "@/i18n";

interface LanguageSwitcherProps {
  className?: string;
  /** "pill": píldora con borde; "plain": enlace con globo, para el nav en píldora. */
  variant?: "pill" | "plain";
}

const VARIANT_CLASSES: Record<NonNullable<LanguageSwitcherProps["variant"]>, string> = {
  pill: "px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs font-semibold tracking-wide hover:border-white/25",
  plain: "px-3 py-2 rounded-full text-[13px] font-medium",
};

/**
 * Selector ES/EN. Navega a la ruta equivalente en el otro idioma (SPA, sin
 * recarga) y persiste la elección para que la detección no la pise.
 * Desde rutas sin mapeo (legales, dashboard) lleva al home del otro idioma.
 */
const LanguageSwitcher = ({
  className = "",
  variant = "pill",
}: LanguageSwitcherProps) => {
  const locale = useLocale();
  const { pathname, hash } = useLocation();
  const other: Locale = locale === "es" ? "en" : "es";
  const target = altPathFor(pathname) + hash;

  return (
    <Link
      to={target}
      onClick={() => storeLocale(other)}
      aria-label={locale === "es" ? "Switch to English" : "Cambiar a español"}
      className={`inline-flex items-center gap-1 text-[#b8bdd0] hover:text-white transition-colors duration-200 ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {variant === "plain" && (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="mr-0.5 h-3.5 w-3.5 fill-none stroke-current stroke-[1.6]"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
        </svg>
      )}
      <span className={locale === "es" ? "text-white" : ""}>ES</span>
      <span className="text-[#4a4f62]">/</span>
      <span className={locale === "en" ? "text-white" : ""}>EN</span>
    </Link>
  );
};

export default LanguageSwitcher;
