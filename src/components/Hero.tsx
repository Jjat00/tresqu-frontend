
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
              Tresqu utiliza inteligencia artificial para ofrecer análisis financieros claros, automáticos y sin complicaciones, a través de las aplicaciones que ya usas: WhatsApp y Telegram. 
            </p>
          </div>

          <div
            className="flex flex-col gap-8 w-full max-w-md animate-fade-in"
            style={{
              animationDelay: "200ms",
            }}
          >
            {/* Telegram Bot Registration Section */}
            <div className="border border-border rounded-lg p-6 bg-background/50 backdrop-blur-sm shadow-sm">
              <p className="mb-4 text-base text-muted-foreground">
                ¿Aún no tienes cuenta? Regístrate fácilmente usando el bot de Telegram.
              </p>
              <Button
                variant="outline"
                className="text-base w-full px-4 md:px-8 py-5 md:py-6 bg-[#0088cc] hover:bg-[#0088cc]/90 text-white border-[#0088cc]"
                size="lg"
                onClick={() => {
                  window.open("https://t.me/my_money_cash_bot", "_blank");
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

            {/* Login Section */}
            <div className="border border-border rounded-lg p-6 bg-background/50 backdrop-blur-sm shadow-sm">
              <p className="mb-4 text-base text-muted-foreground">
                ¿Ya tienes una cuenta? Pulsa en 'Iniciar ahora' para acceder.
              </p>
              <Button
                className="bg-success hover:bg-success/90 text-base w-full px-4 md:px-8 py-5 md:py-6"
                asChild
                size="lg"
              >
                <Link to="/login">
                  <MessageSquare className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Iniciar ahora
                </Link>
              </Button>
            </div>
          </div>

          {/* Simulación de chat de WhatsApp */}
          <div
            className="w-full max-w-sm mx-auto mt-4 md:mt-8 animate-fade-in"
            style={{
              animationDelay: "300ms",
            }}
          >
            <div className="bg-[#ECE5DD] rounded-lg p-3 max-w-[100%] shadow-md border border-gray-200">
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
                  <p className="text-sm font-semibold text-gray-800">✅ ¡Gasto registrado exitosamente!</p>
                  <p className="text-sm text-gray-800">Categoría: Transporte </p> 
                  <p className="text-sm text-gray-800"> Monto: 20,000 COP  </p>
                  <p className="text-sm text-gray-800">Fecha: 2025-05-06  </p>
                  <p className="text-sm text-gray-800">Nota: Gasto en transporte</p>
                  <p className="text-sm text-gray-800">¿Te gustaría registrar otro gasto o consultar tu historial?</p>
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
