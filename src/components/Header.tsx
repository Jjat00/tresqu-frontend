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

    setIsLoggedIn(isAuthenticated());

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const navLinks = [
    { href: "#como-funciona", label: "Inicio" },
    { href: "#beneficios", label: "Sobre Tresqu" },
    { href: "#pricing", label: "Productos" },
    { href: "#futuro", label: "FAQ" },
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/5"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between max-w-7xl mx-auto px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="group">
          <Logo size="md" />
        </Link>

        {isHomePage ? (
          <>
            {/* Navegación Desktop */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Botón CTA */}
            <div className="hidden lg:block">
              <Link
                to={isLoggedIn ? "/dashboard" : "/login"}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#00FF7F] text-black font-semibold text-sm rounded-full hover:bg-[#00CC66] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,127,0.3)]"
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
            className="inline-flex items-center gap-2 px-5 py-2 bg-zinc-900 text-zinc-300 font-medium text-sm rounded-full border border-zinc-800 hover:border-zinc-700 hover:text-white transition-all duration-300"
          >
            Regresar al inicio
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      {isHomePage && mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#0a0a0a]/98 backdrop-blur-xl border-b border-white/5 animate-fade-in">
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
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#00FF7F] text-black font-semibold text-sm rounded-full hover:bg-[#00CC66] transition-all duration-300"
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
