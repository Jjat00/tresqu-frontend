import { useNavigate } from "react-router-dom";
import {
  MessageCircle,
  Send,
  ArrowRight,
} from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0a]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Gradient Orbs - hidden on small screens for performance */}
      <div className="hidden sm:block absolute top-20 left-10 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#00FF7F]/10 rounded-full blur-[100px] md:blur-[150px] pointer-events-none" />
      <div className="hidden sm:block absolute bottom-20 right-10 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-[#00FF7F]/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 sm:py-24 lg:py-28">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Text Content */}
          <div className="space-y-6 md:space-y-8 w-full">
            {/* Main Title */}
            <div className="space-y-2 md:space-y-4">
              <h1 className="trii-title text-[2.25rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] text-white leading-[1.05]">
                CONTROLAR TUS FINANZAS
                <br />
                NUNCA FUE TAN{" "}
                <span className="text-[#00FF7F] italic relative inline-block">
                  FÁCIL
                  <span className="absolute bottom-0 md:bottom-1 left-0 right-0 h-1 md:h-2 bg-[#00FF7F]/30 -skew-x-12" />
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="trii-subtitle text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto">
              Tu agente de inteligencia artificial para registrar tus gastos e ingresos en Colombia y el mundo, fácil, rápido, seguro y desde tu celular.
            </p>

            {/* CTA Buttons - Store Style */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center pt-2">
              <button
                onClick={() =>
                  window.open(
                    "https://wa.me/573116534337?text=Hola%20Tresqu",
                    "_blank"
                  )
                }
                className="store-badge group hover:border-[#25D366]/50 w-full sm:w-auto justify-center sm:justify-start"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 sm:w-7 sm:h-7 text-[#25D366]"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-wider">
                    Disponible en
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-white">
                    WhatsApp
                  </div>
                </div>
              </button>

              <button
                onClick={() => window.open("https://t.me/tresqu_bot", "_blank")}
                className="store-badge group hover:border-[#0088cc]/50 w-full sm:w-auto justify-center sm:justify-start"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 sm:w-7 sm:h-7 text-[#0088cc]"
                    fill="currentColor"
                  >
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-wider">
                    Disponible en
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-white">
                    Telegram
                  </div>
                </div>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Section - Quick Access */}
        <div className="mt-10 sm:mt-14 lg:mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-3xl mx-auto">
            <button
              onClick={navigateToLogin}
              className="group trii-card p-4 sm:p-6 text-left hover:border-[#00FF7F]/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#00FF7F]/10 flex items-center justify-center group-hover:bg-[#00FF7F]/20 transition-colors flex-shrink-0">
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#00FF7F]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-sm sm:text-base">
                    Ver Dashboard
                  </h3>
                  <p className="text-zinc-500 text-xs sm:text-sm truncate">
                    Accede a tus estadísticas
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-600 group-hover:text-[#00FF7F] transition-colors flex-shrink-0" />
              </div>
            </button>

            <button
              onClick={() =>
                window.open(
                  "https://wa.me/573116534337?text=Hola%20Tresqu",
                  "_blank"
                )
              }
              className="group trii-card p-4 sm:p-6 text-left hover:border-[#25D366]/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors flex-shrink-0">
                  <Send className="w-5 h-5 sm:w-6 sm:h-6 text-[#25D366]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-sm sm:text-base">
                    Comenzar Ahora
                  </h3>
                  <p className="text-zinc-500 text-xs sm:text-sm truncate flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]"></span>
                    </span>
                    Respuesta en &lt;10 seg
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-600 group-hover:text-[#25D366] transition-colors flex-shrink-0" />
              </div>
            </button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
