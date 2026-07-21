import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { isAuthenticated } from "@/services/authService";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { pathFor, routeKeyFromPath, useCopy, useLocale } from "@/i18n";
import { headerCopy, type NavLink as NavLinkCopy } from "@/i18n/copy/header";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const locale = useLocale();
  const copy = useCopy(headerCopy);
  const isHomePage = routeKeyFromPath(location.pathname) === "home";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    // eslint-disable-next-line react-hooks/set-state-in-effect -- estado de sesión leído al montar y al navegar
    setIsLoggedIn(isAuthenticated());

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const navLinks: NavLinkCopy[] = copy.navLinks;

  const floating = scrolled || mobileMenuOpen;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 pt-3">
      <div
        className={`mx-auto max-w-7xl rounded-2xl border transition-all duration-300 ${
          floating
            ? "bg-[#0a0a0a]/70 backdrop-blur-xl border-white/[0.08] shadow-[0_8px_40px_-8px_rgba(0,0,0,0.6)] px-4 md:px-6 py-3"
            : "bg-transparent border-transparent px-4 md:px-6 py-4"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to={pathFor("home", locale)}
            className="group flex items-center hover:scale-105 transition-transform duration-500"
          >
            <Logo size="md" />
          </Link>

          {isHomePage ? (
            <>
              {/* Navegación Desktop */}
              <nav className="hidden lg:flex items-center gap-1">
                {navLinks.map((link) =>
                  link.route ? (
                    <Link
                      key={link.route}
                      to={pathFor(link.route, locale)}
                      className="px-4 py-2 text-[13px] font-medium text-zinc-400 hover:text-[#00FF7F] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={link.anchor}
                      href={link.anchor}
                      className="px-4 py-2 text-[13px] font-medium text-zinc-400 hover:text-[#00FF7F] transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  )
                )}
              </nav>

              {/* Botón CTA */}
              <div className="hidden lg:block">
                <Link
                  to={isLoggedIn ? "/dashboard" : pathFor("login", locale)}
                  className="inline-flex items-center gap-2 px-5 py-2 bg-white/[0.03] border border-white/10 text-white font-semibold text-sm rounded-full hover:border-[#00FF7F]/50 hover:bg-white/[0.06] hover:shadow-[0_0_20px_-4px_rgba(0,255,127,0.4)] transition-all duration-200"
                >
                  {isLoggedIn ? copy.ctaDashboard : copy.ctaLogin}
                </Link>
              </div>

              {/* Menu Mobile Toggle */}
              <button
                className="lg:hidden p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                aria-label={mobileMenuOpen ? copy.closeMenu : copy.openMenu}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </>
          ) : (
            <Link
              to={pathFor("home", locale)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 text-zinc-300 font-medium text-sm rounded-full border border-zinc-800 hover:border-zinc-700 hover:text-white transition-colors duration-200"
            >
              {copy.backHome}
            </Link>
          )}
        </div>

        {/* Mobile Menu — expande la píldora */}
        {isHomePage && mobileMenuOpen && (
          <nav className="lg:hidden pt-4 mt-3 border-t border-white/[0.06] flex flex-col gap-1">
            {navLinks.map((link) =>
              link.route ? (
                <Link
                  key={link.route}
                  to={pathFor(link.route, locale)}
                  className="text-base font-medium text-zinc-400 hover:text-[#00FF7F] transition-colors py-2.5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.anchor}
                  href={link.anchor}
                  className="text-base font-medium text-zinc-400 hover:text-[#00FF7F] transition-colors py-2.5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              )
            )}
            <div className="pt-4 mt-2 border-t border-white/[0.06]">
              <Link
                to={isLoggedIn ? "/dashboard" : pathFor("login", locale)}
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-white/[0.03] border border-white/10 text-white font-semibold text-sm rounded-full hover:border-[#00FF7F]/50 hover:bg-white/[0.06] transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {isLoggedIn ? copy.ctaDashboard : copy.ctaLogin}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
