
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { isAuthenticated } from "@/services/authService";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    // Verificar estado de autenticación
    setIsLoggedIn(isAuthenticated());

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'py-3 bg-background/80 backdrop-blur-lg shadow-md' : 'py-5'
    }`}>
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-xl font-bold font-display">
            <span className="text-success">Cash<span className="text-foreground">Bot</span></span>
          </Link>
        </div>
        {isHomePage ? (
          <>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#como-funciona" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                ¿Cómo funciona?
              </a>
              <a href="#beneficios" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Beneficios
              </a>
              <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Precios
              </a>
              <a href="#futuro" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                ¿Qué sigue?
              </a>
            </nav>
            <Link to={isLoggedIn ? "/dashboard" : "/login"}>
              <Button variant="default" size="sm" className="bg-success hover:bg-success/80">
                {isLoggedIn ? "Mi Dashboard" : "Comenzar ahora"}
              </Button>
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button variant="outline" size="sm">
                Regresar al inicio
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
