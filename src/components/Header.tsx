import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { isAuthenticated } from "@/services/authService";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { pathFor, routeKeyFromPath, useCopy, useLocale } from "@/i18n";
import { headerCopy, type NavLink as NavLinkCopy } from "@/i18n/copy/header";

const linkClass =
  "inline-flex items-center px-3 py-2 rounded-full text-[13px] font-medium text-[#b8bdd0] hover:text-white transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[#00FF7F] focus-visible:outline-offset-2";

const ctaClass =
  "tq-grad-border inline-flex items-center justify-center px-[18px] py-2 rounded-full bg-[#0b0c14] text-sm font-medium text-white hover:bg-[#12141f] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[#00FF7F] focus-visible:outline-offset-2";

/**
 * Nav en píldora centrada (diseño «Noche de puntos»), compartido por todas
 * las páginas públicas. En la landing: anclas de sección, Funciones, idioma y
 * Entrar (en móvil, detrás de un menú). En el resto: idioma y volver al inicio.
 */
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const locale = useLocale();
  const copy = useCopy(headerCopy);
  const isHomePage = routeKeyFromPath(location.pathname) === "home";

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- estado de sesión leído al montar y al navegar
    setIsLoggedIn(isAuthenticated());
  }, [location]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  const navLinks: NavLinkCopy[] = copy.navLinks;
  const ctaTo = isLoggedIn ? "/dashboard" : pathFor("login", locale);
  const ctaLabel = isLoggedIn ? copy.ctaDashboard : copy.ctaLogin;
  const close = () => setMobileMenuOpen(false);

  const renderLink = (link: NavLinkCopy, className: string) =>
    link.route ? (
      <Link
        key={link.route}
        to={pathFor(link.route, locale)}
        className={className}
        onClick={close}
      >
        {link.label}
      </Link>
    ) : (
      <a key={link.anchor} href={link.anchor} className={className} onClick={close}>
        {link.label}
      </a>
    );

  return (
    <header className="fixed inset-x-0 top-[18px] z-50 flex justify-center px-3 pointer-events-none font-jakarta">
      <div className="relative pointer-events-auto max-w-full">
        <nav
          aria-label={copy.navLabel}
          className="flex items-center gap-1 rounded-full border border-white/[0.09] bg-[rgba(8,9,16,0.72)] backdrop-blur-[14px] py-1.5 pr-1.5 pl-3.5"
        >
          <Link
            to={pathFor("home", locale)}
            aria-label={copy.homeLabel}
            className="mr-2.5 inline-flex items-center gap-2 rounded-full font-semibold tracking-[-0.01em] text-white focus-visible:outline-2 focus-visible:outline-[#00FF7F] focus-visible:outline-offset-2"
          >
            <img src="/3q.png" alt="" width={24} height={24} className="h-6 w-6 rounded-md" />
            <span>Tresqu</span>
          </Link>

          {isHomePage ? (
            <>
              <div className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => renderLink(link, linkClass))}
                <LanguageSwitcher variant="plain" />
              </div>
              <Link to={ctaTo} className={`${ctaClass} ml-1.5`}>
                {ctaLabel}
              </Link>
              <button
                type="button"
                className="md:hidden ml-0.5 grid h-9 w-9 place-items-center rounded-full text-[#b8bdd0] hover:text-white transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#00FF7F]"
                aria-label={mobileMenuOpen ? copy.closeMenu : copy.openMenu}
                aria-expanded={mobileMenuOpen}
                aria-controls="tq-mobile-menu"
                onClick={() => setMobileMenuOpen((open) => !open)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </>
          ) : (
            <>
              <LanguageSwitcher variant="plain" />
              <Link to={pathFor("home", locale)} className={`${ctaClass} ml-1`}>
                {copy.backHome}
              </Link>
            </>
          )}
        </nav>

        {/* Menú móvil: panel bajo la píldora */}
        {isHomePage && mobileMenuOpen && (
          <div
            id="tq-mobile-menu"
            className="md:hidden absolute left-1/2 top-full mt-2 w-[min(320px,calc(100vw-24px))] -translate-x-1/2 rounded-3xl border border-white/[0.09] bg-[rgba(8,9,16,0.94)] backdrop-blur-[14px] p-3 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]"
          >
            <div className="flex flex-col">
              {navLinks.map((link) =>
                renderLink(
                  link,
                  "rounded-2xl px-3 py-3 text-base font-medium text-[#c9cee0] hover:bg-white/[0.04] hover:text-white transition-colors",
                ),
              )}
            </div>
            <div className="mt-2 flex justify-center border-t border-white/[0.06] pt-3">
              <LanguageSwitcher variant="pill" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
