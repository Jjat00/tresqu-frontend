
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, Check } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-48">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in">
            Tu asistente financiero,{" "}
            <span className="gradient-text">siempre en el chat.</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 md:mb-10 animate-fade-up">
            Registra tus gastos escribiendo como lo harías con un amigo. Así de
            simple.
          </p>
          <Button
            size="lg"
            className="bg-success hover:bg-success/90 animate-fade-up"
            style={{ animationDelay: "200ms" }}
            as={Link}
            to="/dashboard"
          >
            Comenzar ahora <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <div className="mt-16 relative mx-auto max-w-md">
            <div
              className="glass p-4 animate-fade-up rounded-xl shadow-lg"
              style={{ animationDelay: "400ms", background: "#e5e5e5" }}
            >
              <div className="bg-success py-2 px-4 rounded-t-xl absolute top-0 left-0 right-0 flex items-center">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <MessageSquare className="h-4 w-4 text-white" />
                </div>
                <p className="text-white font-medium text-sm ml-3">CashBot</p>
              </div>

              <div className="flex flex-col pt-12 pb-2">
                <div className="self-end bg-[#d1f4c0] p-3 rounded-lg mb-3 max-w-[80%] shadow-sm">
                  <p className="text-sm font-medium text-gray-800">
                    Gasté 15 mil en almuerzo
                  </p>
                  <div className="flex justify-end items-center mt-1 space-x-1">
                    <p className="text-[10px] text-gray-500">14:23</p>
                    <Check className="h-3 w-3 text-gray-500" />
                    <Check className="h-3 w-3 text-gray-500 -ml-2" />
                  </div>
                </div>

                <div className="self-start bg-white p-3 rounded-lg mb-2 max-w-[80%] shadow-sm border border-gray-200">
                  <p className="text-sm font-medium text-gray-800">
                    ✅ Gasto registrado:{" "}
                    <span className="font-bold text-success">$15,000</span>
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Categoría: Alimentación | 02 May 2025
                  </p>
                  <div className="flex items-center mt-1">
                    <p className="text-[10px] text-gray-500">14:24</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center bg-white rounded-full px-3 py-2 mt-2 border border-gray-200">
                <input
                  type="text"
                  className="bg-transparent text-sm flex-1 outline-none text-gray-700"
                  placeholder="Escribe un mensaje..."
                  disabled
                />
                <div className="w-7 h-7 rounded-full bg-success flex items-center justify-center">
                  <MessageSquare className="h-3 w-3 text-white" />
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="px-4 py-2 bg-success rounded-full text-xs font-medium text-white shadow-md">
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
