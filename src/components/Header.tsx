
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'py-3 bg-background/80 backdrop-blur-lg shadow-md' : 'py-5'
    }`}>
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold font-display text-success">Gastos<span className="text-white">Bot</span></span>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#como-funciona" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ¿Cómo funciona?
          </a>
          <a href="#beneficios" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Beneficios
          </a>
          <a href="#futuro" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ¿Qué sigue?
          </a>
        </nav>
        <Button variant="default" size="sm" className="bg-success hover:bg-success/80">
          Lista de espera
        </Button>
      </div>
    </header>
  );
};

export default Header;
