import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare, BarChart3, Phone } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <section className="relative overflow-hidden py-12 md:py-24 lg:py-32 gradient-bg">
      <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-6 md:space-y-10 text-center">
          <div className="space-y-4 md:space-y-6 max-w-4xl">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold font-display gradient-text animate-fade-in my-[71px]">
              Tu dinero, bajo control. Sin apps, sin excusas.
            </h1>

            <p
              className="text-base md:text-xl lg:text-2xl animate-fade-in max-w-3xl mx-auto text-shadow-sm"
              style={{
                animationDelay: "100ms",
                color: "var(--color-foreground)",
              }}
            >
              Tresqu es tu asistente financiero que vive en WhatsApp y Telegram.
              Registra tus gastos e ingresos con un mensaje y recibe análisis al
              instante. Empieza ahora, sin descargar nada.
            </p>
          </div>

          {/* Login Section */}
          <div className="gradient-border p-[1px] relative z-20 flex-1">
            <div className="glass-card p-8 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-xl bg-opacity-20 backdrop-blur-md border border-cyan-500/20">
              <h3 className="text-2xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">
                Comienza ahora
              </h3>
              <p
                className="mb-8 text-base font-medium text-center"
                style={{ color: "var(--color-foreground)" }}
              >
                Elige tu plataforma preferida para comenzar a gestionar tus
                finanzas
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Button
                  className="group relative overflow-hidden rounded-xl text-white font-medium hover:shadow-lg transition duration-300"
                  size="lg"
                  style={{
                    background: "linear-gradient(135deg, #25D366, #128C7E)",
                    border: "none",
                    height: "60px",
                  }}
                  onClick={() => {
                    window.open(
                      "https://wa.me/573116331308?text=Hola%20Tresqu",
                      "_blank"
                    );
                  }}
                >
                  <div className="absolute inset-0 bg-black/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-xl"></div>
                  <div className="flex items-center justify-center space-x-2 relative z-10">
                    <div className="flex items-center justify-center bg-white/20 rounded-full p-2">
                      <Phone className="h-5 w-5" />
                    </div>
                    <span className="font-semibold">Iniciar con WhatsApp</span>
                  </div>
                </Button>
                <Button
                  className="group relative overflow-hidden rounded-xl text-white font-medium hover:shadow-lg transition duration-300"
                  size="lg"
                  style={{
                    background: "linear-gradient(135deg, #0088cc, #00a2ff)",
                    border: "none",
                    height: "60px",
                  }}
                  onClick={() => {
                    window.open("https://t.me/tresqu_bot", "_blank");
                  }}
                >
                  <div className="absolute inset-0 bg-black/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-xl"></div>
                  <div className="flex items-center justify-center space-x-2 relative z-10">
                    <div className="flex items-center justify-center bg-white/20 rounded-full p-2">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <span className="font-semibold">Iniciar con Telegram</span>
                  </div>
                </Button>
              </div>
            </div>
          </div>

          {/* Dashboard Image Section */}
          <div
            className="w-full max-w-5xl mx-auto mt-6 md:mt-10 animate-fade-in"
            style={{
              animationDelay: "150ms",
            }}
          >
            <div className="glass-card p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-xl md:text-2xl font-bold mb-4 gradient-text">
                Dashboard Financiero
              </h2>
              <p
                className="text-base mb-4"
                style={{ color: "var(--color-foreground)" }}
              >
                Accede a tu dashboard personal para visualizar tus finanzas en
                tiempo real
              </p>
              <div className="relative rounded-lg overflow-hidden shadow-2xl border border-gray-800/20">
                <img
                  src="https://i.ibb.co/RpYwPZXV/dashboard3.png"
                  alt="Dashboard Financiero de Tresqu"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <Button
                    className="px-6 py-2 relative overflow-hidden group font-medium hover:cursor-pointer"
                    style={{
                      background:
                        "linear-gradient(45deg, var(--color-success-dark), var(--color-highlight))",
                      color: "white",
                    }}
                    onClick={navigateToLogin}
                  >
                    <span className="absolute inset-0 bg-black/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                    <BarChart3 className="mr-2 h-4 w-4 relative z-10" />
                    <span className="relative z-10 text-shadow-sm">
                      Ver mi dashboard
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div
            className="flex flex-col animate-fade-in relative z-20"
            style={{
              animationDelay: "200ms",
            }}
          >
            {/* Telegram Bot Registration Section */}
            <div className="glass-card p-8 shadow-lg hover:shadow-2xl transition-all duration-300 relative z-20 flex-1 rounded-xl bg-opacity-20 backdrop-blur-md border border-blue-500/20">
              <h3 className="text-2xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                Acceso a Dashboard
              </h3>
              <p
                className="mb-8 text-base font-medium text-center"
                style={{ color: "var(--color-foreground)" }}
              >
                Ya tienes una cuenta? Accede a tu dashboard para visualizar tus
                finanzas
              </p>

              <Button
                className="w-full rounded-xl group relative overflow-hidden text-white font-medium hover:shadow-lg transition duration-300"
                size="lg"
                style={{
                  background: "linear-gradient(135deg, #0088cc, #6b46c1)",
                  border: "none",
                  height: "60px",
                }}
                onClick={navigateToLogin}
              >
                <div className="absolute inset-0 bg-black/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-xl"></div>
                <div className="flex items-center justify-center space-x-2 relative z-10">
                  <div className="flex items-center justify-center bg-white/20 rounded-full p-2">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <span className="font-semibold">Ver mi dashboard</span>
                </div>
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
            <div className="bg-[#ECE5DD] rounded-lg p-3 max-w-[100%] shadow-lg backdrop-blur-sm border border-gray-200 hover:shadow-xl transition-all duration-300">
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
                  <p className="text-sm font-semibold text-gray-800">
                    ✅ ¡Gasto registrado exitosamente!
                  </p>
                  <p className="text-sm text-gray-800">
                    Categoría: Transporte{" "}
                  </p>
                  <p className="text-sm text-gray-800"> Monto: 20,000 COP </p>
                  <p className="text-sm text-gray-800">Fecha: 2025-05-06 </p>
                  <p className="text-sm text-gray-800">
                    Nota: Gasto en transporte
                  </p>
                  <p className="text-sm text-gray-800">
                    ¿Te gustaría registrar otro gasto o consultar tu historial?
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

      {/* Overlay para texto con gradiente */}
      <div className="absolute inset-0 pointer-events-none z-[-1] bg-gradient-to-b from-transparent via-transparent to-background/90 opacity-70"></div>

      {/* Background gradient effects */}
      <div
        className="absolute -top-40 -left-40 w-60 md:w-96 h-60 md:h-96 rounded-full blur-3xl opacity-20 animate-pulse-glow pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, var(--color-success), transparent 70%)",
        }}
      ></div>
      <div
        className="absolute -bottom-40 -right-40 w-60 md:w-96 h-60 md:h-96 rounded-full blur-3xl opacity-20 animate-pulse-glow pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, var(--color-highlight), transparent 70%)",
          animationDelay: "1s",
        }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl max-h-5xl rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, var(--color-purple), transparent 70%)",
        }}
      ></div>
    </section>
  );
};

export default Hero;
