import { useNavigate } from "react-router-dom";
import {
  MessageCircle,
  Send,
  ArrowRight,
  Check,
  CheckCheck,
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
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left order-1">
            {/* Main Title */}
            <div className="space-y-2 md:space-y-4">
              <h1 className="trii-title text-[2rem] sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl text-white leading-[1.1]">
                CONTROLA TUS
                <br />
                FINANZAS NUNCA
                <br />
                FUE TAN{" "}
                <span className="text-[#00FF7F] italic relative inline-block">
                  FÁCIL
                  <span className="absolute bottom-0 md:bottom-1 left-0 right-0 h-1 md:h-2 bg-[#00FF7F]/30 -skew-x-12" />
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="trii-subtitle text-sm sm:text-base md:text-lg lg:text-xl max-w-xl mx-auto lg:mx-0">
              Un bot para registrar tus gastos e ingresos en Colombia y el
              mundo, fácil, rápido, seguro y desde tu celular.
            </p>

            {/* CTA Buttons - Store Style */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
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

          {/* Right Column - WhatsApp Phone Mockup */}
          <div className="relative flex justify-center order-2">
            <div className="relative">
              {/* Main Phone - WhatsApp Chat */}
              <div className="relative z-20 animate-float">
                <div className="relative mx-auto w-[240px] xs:w-[260px] sm:w-[280px] md:w-[300px] lg:w-[300px] xl:w-[320px]">
                  {/* Phone Frame */}
                  <div className="relative bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-[2.5rem] sm:rounded-[3rem] p-2 sm:p-3 shadow-2xl shadow-black/50">
                    {/* Screen */}
                    <div className="bg-[#0b141a] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden">
                      {/* Status Bar */}
                      <div className="flex justify-between items-center px-4 sm:px-6 py-1.5 sm:py-2 text-[9px] sm:text-[10px] text-white/60 bg-[#1f2c34]">
                        <span className="font-medium">9:41</span>
                        <div className="flex items-center gap-1 sm:gap-1.5">
                          {/* Signal Bars */}
                          <div className="flex items-end gap-[1px] sm:gap-[2px]">
                            <div className="w-[2px] sm:w-[3px] h-[3px] sm:h-[4px] bg-white rounded-[1px]" />
                            <div className="w-[2px] sm:w-[3px] h-[4px] sm:h-[6px] bg-white rounded-[1px]" />
                            <div className="w-[2px] sm:w-[3px] h-[6px] sm:h-[8px] bg-white rounded-[1px]" />
                            <div className="w-[2px] sm:w-[3px] h-[8px] sm:h-[10px] bg-white rounded-[1px]" />
                          </div>
                          {/* WiFi */}
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 18c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-4.9-2.3l1.4 1.4C9.4 16.4 10.6 16 12 16s2.6.4 3.5 1.1l1.4-1.4C15.6 14.6 13.9 14 12 14s-3.6.6-4.9 1.7zm-2.8-2.8l1.4 1.4C7.3 13 9.5 12 12 12s4.7 1 6.3 2.3l1.4-1.4C17.7 11.1 15 10 12 10s-5.7 1.1-7.7 2.9z" />
                          </svg>
                          {/* Battery */}
                          <div className="flex items-center gap-0.5">
                            <div className="w-5 sm:w-6 h-[8px] sm:h-[10px] border border-white/60 rounded-[2px] p-[1px]">
                              <div className="w-[70%] h-full bg-[#30D158] rounded-[1px]" />
                            </div>
                            <div className="w-[1px] sm:w-[2px] h-[3px] sm:h-[4px] bg-white/60 rounded-r-[1px]" />
                          </div>
                        </div>
                      </div>

                      {/* WhatsApp Header */}
                      <div className="bg-[#1f2c34] px-2 sm:px-3 py-1.5 sm:py-2 flex items-center gap-2 sm:gap-3">
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 text-white/80"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#25D366] flex items-center justify-center">
                          <span className="text-white font-bold text-xs sm:text-sm">
                            T
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="text-white font-semibold text-xs sm:text-sm">
                            Tresqu Bot
                          </div>
                          <div className="text-[8px] sm:text-[10px] text-[#25D366]">
                            en línea
                          </div>
                        </div>
                        <div className="flex gap-3 sm:gap-4 text-white/80">
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5 hidden sm:block"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Chat Background */}
                      <div
                        className="h-[280px] xs:h-[300px] sm:h-[340px] md:h-[380px] lg:h-[380px] xl:h-[400px] px-2 sm:px-3 py-2 overflow-hidden relative"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                          backgroundColor: "#0b141a",
                        }}
                      >
                        <div className="space-y-1.5 sm:space-y-2">
                          {/* Date Badge */}
                          <div className="flex justify-center mb-2 sm:mb-3">
                            <span className="bg-[#1d2b33] text-[8px] sm:text-[10px] text-white/60 px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg">
                              HOY
                            </span>
                          </div>

                          {/* Bot Message */}
                          <div className="flex justify-start">
                            <div className="bg-[#1f2c34] rounded-xl sm:rounded-2xl rounded-tl-sm px-2 sm:px-3 py-1.5 sm:py-2 max-w-[88%] shadow-sm">
                              <p className="text-[11px] sm:text-[13px] text-white/90 leading-relaxed">
                                👋 ¡Hola! Soy{" "}
                                <span className="font-semibold text-[#25D366]">
                                  Tresqu
                                </span>
                                , tu asistente financiero.
                              </p>
                              <p className="text-[11px] sm:text-[13px] text-white/90 leading-relaxed mt-0.5 sm:mt-1">
                                Escríbeme tus gastos o ingresos 📊
                              </p>
                              <div className="flex justify-end mt-0.5 sm:mt-1">
                                <span className="text-[8px] sm:text-[10px] text-white/40">
                                  10:30
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* User Message */}
                          <div className="flex justify-end">
                            <div className="bg-[#005c4b] rounded-xl sm:rounded-2xl rounded-tr-sm px-2 sm:px-3 py-1.5 sm:py-2 max-w-[75%] shadow-sm">
                              <p className="text-[11px] sm:text-[13px] text-white leading-relaxed">
                                Gasté 45 mil en almuerzo
                              </p>
                              <div className="flex justify-end items-center gap-0.5 sm:gap-1 mt-0.5 sm:mt-1">
                                <span className="text-[8px] sm:text-[10px] text-white/60">
                                  10:31
                                </span>
                                <CheckCheck className="w-3 h-3 sm:w-4 sm:h-4 text-[#53bdeb]" />
                              </div>
                            </div>
                          </div>

                          {/* Bot Response */}
                          <div className="flex justify-start">
                            <div className="bg-[#1f2c34] rounded-xl sm:rounded-2xl rounded-tl-sm px-2 sm:px-3 py-1.5 sm:py-2 max-w-[88%] shadow-sm">
                              <p className="text-[11px] sm:text-[13px] text-white/90 leading-relaxed">
                                ✅{" "}
                                <span className="font-semibold">
                                  ¡Gasto registrado!
                                </span>
                              </p>
                              <div className="mt-1.5 sm:mt-2 bg-[#0b141a]/50 rounded-lg p-1.5 sm:p-2 border-l-2 border-[#25D366]">
                                <div className="flex justify-between text-[10px] sm:text-[12px]">
                                  <span className="text-white/60">Monto:</span>
                                  <span className="text-white font-medium">
                                    $45.000
                                  </span>
                                </div>
                                <div className="flex justify-between text-[10px] sm:text-[12px] mt-0.5 sm:mt-1">
                                  <span className="text-white/60">
                                    Categoría:
                                  </span>
                                  <span className="text-[#25D366] font-medium">
                                    🍽️ Alimentación
                                  </span>
                                </div>
                              </div>
                              <div className="flex justify-end mt-0.5 sm:mt-1">
                                <span className="text-[8px] sm:text-[10px] text-white/40">
                                  10:31
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* User Message 2 */}
                          <div className="flex justify-end">
                            <div className="bg-[#005c4b] rounded-xl sm:rounded-2xl rounded-tr-sm px-2 sm:px-3 py-1.5 sm:py-2 max-w-[75%] shadow-sm">
                              <p className="text-[11px] sm:text-[13px] text-white leading-relaxed">
                                ¿Cuánto llevo gastado hoy?
                              </p>
                              <div className="flex justify-end items-center gap-0.5 sm:gap-1 mt-0.5 sm:mt-1">
                                <span className="text-[8px] sm:text-[10px] text-white/60">
                                  10:32
                                </span>
                                <CheckCheck className="w-3 h-3 sm:w-4 sm:h-4 text-[#53bdeb]" />
                              </div>
                            </div>
                          </div>

                          {/* Bot Stats Response */}
                          <div className="flex justify-start">
                            <div className="bg-[#1f2c34] rounded-xl sm:rounded-2xl rounded-tl-sm px-2 sm:px-3 py-1.5 sm:py-2 max-w-[88%] shadow-sm">
                              <p className="text-[11px] sm:text-[13px] text-white/90 leading-relaxed">
                                📊{" "}
                                <span className="font-semibold">
                                  Resumen de hoy:
                                </span>
                              </p>
                              <div className="mt-1 sm:mt-2 space-y-0.5 sm:space-y-1">
                                <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[12px]">
                                  <span className="text-red-400">↓</span>
                                  <span className="text-white/80">
                                    Gastos:{" "}
                                    <span className="text-white font-medium">
                                      $125.000
                                    </span>
                                  </span>
                                </div>
                                <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[12px]">
                                  <span className="text-[#25D366]">↑</span>
                                  <span className="text-white/80">
                                    Ingresos:{" "}
                                    <span className="text-white font-medium">
                                      $0
                                    </span>
                                  </span>
                                </div>
                              </div>
                              <div className="flex justify-end mt-0.5 sm:mt-1">
                                <span className="text-[8px] sm:text-[10px] text-white/40">
                                  10:32
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Input Bar */}
                      <div className="bg-[#1f2c34] px-1.5 sm:px-2 py-1.5 sm:py-2 flex items-center gap-1.5 sm:gap-2">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-white/60">
                          <svg
                            className="w-5 h-5 sm:w-6 sm:h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div className="flex-1 bg-[#2a3942] rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
                          <span className="text-white/40 text-xs sm:text-sm">
                            Mensaje...
                          </span>
                        </div>
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#25D366] rounded-full flex items-center justify-center">
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Island */}
                  <div className="absolute top-2 sm:top-3 left-1/2 -translate-x-1/2 w-16 xs:w-20 sm:w-24 h-5 xs:h-6 sm:h-7 bg-black rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-zinc-900 border border-zinc-800" />
                  </div>
                </div>
              </div>

              {/* Secondary Phone - Only visible on xl screens */}
              <div className="absolute -left-16 top-28 z-10 opacity-60 scale-[0.75] hidden xl:block">
                <div className="w-[240px] bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-[2.5rem] p-2 shadow-xl">
                  <div className="bg-[#0b141a] rounded-[2rem] overflow-hidden">
                    <div className="bg-[#1f2c34] px-3 py-2 flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#25D366] flex items-center justify-center">
                        <span className="text-white font-bold text-[10px]">
                          T
                        </span>
                      </div>
                      <div>
                        <div className="text-white font-semibold text-[10px]">
                          Tresqu Bot
                        </div>
                        <div className="text-[7px] text-[#25D366]">
                          en línea
                        </div>
                      </div>
                    </div>
                    <div
                      className="h-[340px] px-2 py-2 space-y-1.5"
                      style={{ backgroundColor: "#0b141a" }}
                    >
                      <div className="flex justify-end">
                        <div className="bg-[#005c4b] rounded-xl rounded-tr-sm px-2 py-1 max-w-[80%]">
                          <p className="text-[10px] text-white">
                            Recibí mi salario 3.500.000
                          </p>
                          <div className="flex justify-end items-center gap-0.5">
                            <span className="text-[7px] text-white/60">
                              9:15
                            </span>
                            <CheckCheck className="w-2.5 h-2.5 text-[#53bdeb]" />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-[#1f2c34] rounded-xl rounded-tl-sm px-2 py-1 max-w-[85%]">
                          <p className="text-[10px] text-white/90">
                            🎉{" "}
                            <span className="font-semibold">
                              ¡Ingreso registrado!
                            </span>
                          </p>
                          <div className="mt-1 bg-[#0b141a]/50 rounded p-1 border-l-2 border-[#25D366]">
                            <div className="text-[9px] text-[#25D366] font-medium">
                              +$3.500.000
                            </div>
                            <div className="text-[8px] text-white/60">
                              💰 Salario
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="bg-[#005c4b] rounded-xl rounded-tr-sm px-2 py-1 max-w-[80%]">
                          <p className="text-[10px] text-white">Uber 15.000</p>
                          <div className="flex justify-end items-center gap-0.5">
                            <span className="text-[7px] text-white/60">
                              10:45
                            </span>
                            <CheckCheck className="w-2.5 h-2.5 text-[#53bdeb]" />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-[#1f2c34] rounded-xl rounded-tl-sm px-2 py-1 max-w-[85%]">
                          <p className="text-[10px] text-white/90">
                            ✅ Registrado
                          </p>
                          <div className="mt-1 bg-[#0b141a]/50 rounded p-1 border-l-2 border-orange-400">
                            <div className="text-[9px] text-orange-400 font-medium">
                              -$15.000
                            </div>
                            <div className="text-[8px] text-white/60">
                              🚗 Transporte
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="bg-[#005c4b] rounded-xl rounded-tr-sm px-2 py-1 max-w-[80%]">
                          <p className="text-[10px] text-white">
                            ¿Mi balance del mes?
                          </p>
                          <div className="flex justify-end items-center gap-0.5">
                            <span className="text-[7px] text-white/60">
                              11:00
                            </span>
                            <Check className="w-2.5 h-2.5 text-white/60" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Quick Access */}
        <div className="mt-10 sm:mt-14 lg:mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
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
                  <p className="text-zinc-500 text-xs sm:text-sm truncate">
                    Inicia en WhatsApp
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-600 group-hover:text-[#25D366] transition-colors flex-shrink-0" />
              </div>
            </button>

            <button
              onClick={() =>
                document
                  .getElementById("como-funciona")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group trii-card p-4 sm:p-6 text-left hover:border-zinc-700 transition-all duration-300 sm:col-span-2 lg:col-span-1"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-zinc-800 flex items-center justify-center group-hover:bg-zinc-700 transition-colors flex-shrink-0">
                  <span className="text-xl sm:text-2xl">📖</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-sm sm:text-base">
                    Cómo Funciona
                  </h3>
                  <p className="text-zinc-500 text-xs sm:text-sm truncate">
                    Aprende en 3 pasos
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-600 group-hover:text-white transition-colors flex-shrink-0" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
