
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-10 text-center">
          <div className="space-y-6 max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-success to-highlight animate-fade-in">
              La manera más fácil de controlar tus finanzas
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "100ms" }}>
              CashBot entiende tus finanzas con una simple conversación. Registra gastos con texto o voz, obtén análisis inteligentes y alcanza tus metas financieras.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md animate-fade-in" style={{ animationDelay: "200ms" }}>
            <Button
              className="bg-success hover:bg-success/90 text-lg px-8 py-6"
              asChild
              size="lg"
            >
              <Link to="/dashboard">
                <MessageSquare className="mr-2 h-5 w-5" />
                Iniciar ahora
              </Link>
            </Button>
            
            <Button
              variant="outline"
              className="text-lg px-8 py-6"
              size="lg"
              asChild
            >
              <Link to="#login">
                Cómo funciona
              </Link>
            </Button>
          </div>
          
          <div className="flex gap-8 mt-10 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <p className="flex flex-col items-center">
              <span className="text-3xl font-bold text-success">+50k</span>
              <span className="text-sm text-muted-foreground">Usuarios activos</span>
            </p>
            <p className="flex flex-col items-center">
              <span className="text-3xl font-bold text-success">+1.2M</span>
              <span className="text-sm text-muted-foreground">Gastos registrados</span>
            </p>
            <p className="flex flex-col items-center">
              <span className="text-3xl font-bold text-success">87%</span>
              <span className="text-sm text-muted-foreground">Satisfacción</span>
            </p>
          </div>
        </div>
      </div>
      
      {/* Background gradient effects */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-success/20 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-highlight/20 rounded-full blur-3xl opacity-20"></div>
    </section>
  );
};

export default Hero;
