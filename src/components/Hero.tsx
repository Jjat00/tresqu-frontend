
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-48">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in">
            Tu asistente financiero, <span className="gradient-text">siempre en el chat.</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 md:mb-10 animate-fade-up">
            Registra tus gastos escribiendo como lo harías con un amigo. Así de simple.
          </p>
          <Button size="lg" className="bg-success hover:bg-success/90 animate-fade-up" style={{ animationDelay: "200ms" }}>
            Comenzar ahora <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          
          <div className="mt-16 relative">
            <div className="glass p-6 md:p-8 animate-fade-up" style={{ animationDelay: "400ms" }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-success flex items-center justify-center shrink-0">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="bg-secondary p-3 rounded-lg rounded-tl-none mb-4 inline-block">
                    <p className="text-sm md:text-base">Gasté 15 mil en almuerzo</p>
                  </div>
                  <div className="bg-success/20 p-3 rounded-lg mb-4 inline-block">
                    <p className="text-sm md:text-base">✅ Gasto registrado: <span className="font-semibold">$15,000</span></p>
                    <p className="text-xs text-muted-foreground mt-1">Categoría: Alimentación | 02 May 2025</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
              <div className="px-4 py-2 bg-success rounded-full text-xs font-medium">
                Así de fácil
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
