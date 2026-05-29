import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { isAuthenticated } from "@/services/authService";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    // eslint-disable-next-line react-hooks/set-state-in-effect -- estado de sesión leído al montar y al navegar
    setIsLoggedIn(isAuthenticated());

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const navLinks = [
    { href: "#agente", label: "El Agente" },
    { href: "#wallbit", label: "Inversiones" },
    { href: "#captura", label: "Captura automática" },
    { href: "#beneficios", label: "Beneficios" },
    // Oculto hasta tener los pagos configurados (reactivar junto con la sección Pricing)
    // { href: "#pricing", label: "Precios" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "py-3 bg-[#0a0a0a]/85 backdrop-blur-md border-b border-white/[0.06]"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between max-w-7xl mx-auto px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="group flex items-center hover:scale-105 transition-transform duration-500">
          <Logo size="md" />
        </Link>

        {isHomePage ? (
          <>
            {/* Navegación Desktop */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-[13px] font-medium text-zinc-400 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Botón CTA */}
            <div className="hidden lg:block">
              <Link
                to={isLoggedIn ? "/dashboard" : "/login"}
                className="inline-flex items-center gap-2 px-5 py-2 bg-[#00FF7F] text-black font-semibold text-sm rounded-md hover:bg-white transition-colors duration-200"
              >
                {isLoggedIn ? "Mi Dashboard" : "Ingresar"}
              </Link>
            </div>

            {/* Menu Mobile Toggle */}
            <button
              className="lg:hidden p-2 text-zinc-400 hover:text-white transition-colors"
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
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 text-zinc-300 font-medium text-sm rounded-md border border-zinc-800 hover:border-zinc-700 hover:text-white transition-colors duration-200"
          >
            Regresar al inicio
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      {isHomePage && mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#0a0a0a] border-b border-white/5">
          <nav className="container max-w-7xl mx-auto px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-base font-medium text-zinc-400 hover:text-white transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-zinc-800">
              <Link
                to={isLoggedIn ? "/dashboard" : "/login"}
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#00FF7F] text-black font-semibold text-sm rounded-md hover:bg-white transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {isLoggedIn ? "Mi Dashboard" : "Ingresar"}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
