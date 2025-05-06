
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 md:space-y-10 text-center">
          <div className="space-y-4 md:space-y-6 max-w-4xl">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-success to-highlight animate-fade-in my-[71px]">
              La manera más fácil de controlar tus finanzas, Potenciado por IA
            </h1>

            <p
              className="text-base md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto animate-fade-in"
              style={{
                animationDelay: "100ms",
              }}
            >
              CashBot utiliza Inteligencia Artificial  para hacer analisis financieros claros y automáticos, cercano y sin complicaciones
            </p>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-4 w-full max-w-md animate-fade-in"
            style={{
              animationDelay: "200ms",
            }}
          >
            <Button
              className="bg-success hover:bg-success/90 text-base md:text-lg w-full px-4 md:px-8 py-5 md:py-6"
              asChild
              size="lg"
            >
              <Link to="/dashboard">
                <MessageSquare className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                Iniciar ahora
              </Link>
            </Button>

            <Button
              variant="outline"
              className="text-base md:text-lg w-full px-4 md:px-8 py-5 md:py-6 bg-[#0088cc] hover:bg-[#0088cc]/90 text-white border-[#0088cc]"
              size="lg"
              onClick={() => {
                window.location.href = "https://t.me/my_money_cash_bot";
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
              Bot de Telegram
            </Button>
          </div>

          {/* Agregamos la simulación de chat de WhatsApp */}
          <div
            className="w-full max-w-sm mx-auto mt-4 md:mt-8 animate-fade-in"
            style={{
              animationDelay: "300ms",
            }}
          >
            <div className="bg-[#ECE5DD] rounded-lg p-3 max-w-[100%] shadow-md">
              <div className="flex flex-col">
                <div className="bg-white rounded-lg p-3 mb-2 ml-auto max-w-[80%] shadow-md">
                  <p className="text-sm font-medium text-gray-800 text-left">
                    Gasté 20.000 en transporte
                  </p>
                  <p className="text-[10px] text-gray-500 text-right">
                    10:42 AM
                  </p>
                </div>
                <div className="bg-[#DCF8C6] rounded-lg p-3 mb-2 max-w-[80%] shadow-md text-left">
                  <p className="text-sm text-gray-800">✅ Gasto registrado:</p>
                  <p className="text-sm font-semibold text-gray-800">
                    $20.000 - Transporte
                  </p>
                  <p className="text-[10px] text-gray-600 text-right">
                    10:42 AM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background gradient effects */}
      <div className="absolute -top-40 -left-40 w-60 md:w-80 h-60 md:h-80 bg-success/20 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute -bottom-40 -right-40 w-60 md:w-80 h-60 md:h-80 bg-highlight/20 rounded-full blur-3xl opacity-20"></div>
    </section>
  );
};

export default Hero;
