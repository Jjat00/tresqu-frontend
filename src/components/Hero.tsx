import { lazy, Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { isAuthenticated } from "@/services/authService";

const HeroScene = lazy(() => import("./HeroScene"));

const Hero = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- estado de sesión leído al montar
    setIsLoggedIn(isAuthenticated());
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0a]">
      {/* Escena 3D holográfica (lazy — Three.js carga en su propio chunk) */}
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      {/* Viñeta de legibilidad + fade superior a negro */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 58% 48% at 50% 44%, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.4) 45%, transparent 75%), radial-gradient(ellipse 55% 32% at 50% 86%, rgba(10,10,10,0.75) 0%, transparent 70%), linear-gradient(to bottom, #0a0a0a 0%, transparent 22%)",
        }}
      />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 sm:py-24 lg:py-28">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Text Content */}
          <div className="space-y-6 md:space-y-8 w-full">
            {/* Main Title */}
            <h1
              className="trii-title text-[clamp(2.3rem,7vw,5.5rem)] text-white leading-[1.05] animate-fade-up"
              style={{ animationDelay: "0.15s" }}
            >
              SABE CÓMO <span className="holo-text italic">VIVES</span>.
              <br />
              INVIERTE COMO{" "}
              <span className="text-white relative inline-block">
                ERES
                <span
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, #00FF7F, #22d3ee, #0D99FF)",
                  }}
                />
              </span>
              .
            </h1>

            {/* Subtitle */}
            <p
              className="trii-subtitle text-base sm:text-lg md:text-xl max-w-2xl mx-auto animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              Tresqu es un equipo de agentes que registra tus gastos, entiende
              tus ingresos y usa todo ese contexto para invertir contigo en{" "}
              <a
                href="https://www.wallbit.io/es"
                target="_blank"
                rel="noopener noreferrer"
                className="text-wallbit font-medium hover:underline"
              >
                Wallbit
              </a>{" "}
              — por chat, desde las apps que ya usas.
            </p>

            {/* CTAs */}
            <div
              className="pt-2 space-y-4 animate-fade-up"
              style={{ animationDelay: "0.45s" }}
            >
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                {/* Primary — WhatsApp */}
                <button
                  onClick={() =>
                    window.open(
                      "https://wa.me/573116534337?text=Hola%20Tresqu",
                      "_blank"
                    )
                  }
                  className="cta-neon inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 bg-[#00FF7F] text-black font-semibold text-base sm:text-lg rounded-md hover:bg-white cursor-pointer"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 sm:w-7 sm:h-7"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Empezar en WhatsApp
                </button>

                {/* Secondary — Telegram */}
                <button
                  onClick={() =>
                    window.open("https://t.me/tresqu_bot", "_blank")
                  }
                  className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 bg-white/[0.03] backdrop-blur-sm border border-white/10 text-white font-semibold text-base sm:text-lg rounded-md hover:border-[#0088cc]/50 hover:bg-white/[0.06] transition-colors duration-200 cursor-pointer"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 sm:w-7 sm:h-7 text-[#0088cc]"
                    fill="currentColor"
                  >
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                  Abrir en Telegram
                </button>
              </div>

              {/* Micro-copy */}
              <p className="text-zinc-500 text-sm font-mono tracking-wide">
                Sin descargar apps. Empieza en menos de 30 segundos.
              </p>

              {/* Acceso web / dashboard — visible en mobile y desktop */}
              <p className="text-sm text-zinc-400">
                {isLoggedIn ? (
                  <Link
                    to="/dashboard/home"
                    className="inline-flex items-center gap-1 font-semibold text-[#00FF7F] hover:underline"
                  >
                    Entra a tu dashboard →
                  </Link>
                ) : (
                  <>
                    ¿Prefieres la web o ya tienes cuenta?{" "}
                    <Link
                      to="/login"
                      className="inline-flex items-center gap-1 font-semibold text-[#00FF7F] hover:underline"
                    >
                      Inicia sesión y entra a tu dashboard →
                    </Link>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <ChevronDown className="w-5 h-5 text-zinc-600 animate-scroll-hint" />
      </div>
    </section>
  );
};

export default Hero;
