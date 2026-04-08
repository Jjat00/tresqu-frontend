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
                CONTROLAR TUS
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
              Tu agente de inteligencia artificial para registrar tus gastos e ingresos en Colombia y el mundo, fácil, rápido, seguro y desde tu celular.
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
          <div className="relative flex justify-center order-2" style={{ perspective: "2000px" }}>
            <div className="relative transition-transform duration-1000 ease-out hover:[transform:rotateY(-10deg)_rotateX(5deg)]">
              {/* Main Phone - WhatsApp Chat */}
              <div className="relative z-20 animate-float">
                {/* Layered Shadow System */}
                <div
                  className="absolute inset-0 rounded-[2.5rem] sm:rounded-[3rem]"
                  style={{
                    boxShadow: `
                      0 2px 8px rgba(0,0,0,0.6),
                      0 15px 35px rgba(0,0,0,0.5),
                      0 40px 70px rgba(0,0,0,0.4),
                      0 60px 90px rgba(0,0,0,0.2),
                      0 50px 80px rgba(0,255,127,0.04)
                    `,
                  }}
                />
                <div className="relative mx-auto w-[240px] xs:w-[260px] sm:w-[280px] md:w-[300px] lg:w-[300px] xl:w-[320px]">

                  {/* Hardware Buttons - Titanium Style */}
                  {/* Action Button (small, round-ish) */}
                  <div
                    className="absolute -left-[3px] sm:-left-[4px] top-[100px] w-[3px] sm:w-[4px] h-[26px] rounded-l-md"
                    style={{
                      background: "linear-gradient(to bottom, #a8a9ad, #78797d 30%, #b0b1b5 50%, #78797d 70%, #606166)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.3), -1px 0 3px rgba(0,0,0,0.4)",
                    }}
                  />
                  {/* Volume Up */}
                  <div
                    className="absolute -left-[3px] sm:-left-[4px] top-[140px] w-[3px] sm:w-[4px] h-[50px] rounded-l-md"
                    style={{
                      background: "linear-gradient(to bottom, #a8a9ad, #78797d 20%, #b0b1b5 50%, #78797d 80%, #606166)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.3), -1px 0 3px rgba(0,0,0,0.4)",
                    }}
                  />
                  {/* Volume Down */}
                  <div
                    className="absolute -left-[3px] sm:-left-[4px] top-[200px] w-[3px] sm:w-[4px] h-[50px] rounded-l-md"
                    style={{
                      background: "linear-gradient(to bottom, #a8a9ad, #78797d 20%, #b0b1b5 50%, #78797d 80%, #606166)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.3), -1px 0 3px rgba(0,0,0,0.4)",
                    }}
                  />
                  {/* Power Button */}
                  <div
                    className="absolute -right-[3px] sm:-right-[4px] top-[160px] w-[3px] sm:w-[4px] h-[70px] rounded-r-md"
                    style={{
                      background: "linear-gradient(to bottom, #a8a9ad, #78797d 20%, #b0b1b5 50%, #78797d 80%, #606166)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.3), 1px 0 3px rgba(0,0,0,0.4)",
                    }}
                  />

                  {/* 3D Depth/Outer Edge - Titanium */}
                  <div
                    className="absolute inset-0 rounded-[2.7rem] sm:rounded-[3.2rem] translate-y-1 sm:translate-y-2"
                    style={{
                      background: "linear-gradient(135deg, #2a2a2e, #1a1a1e 30%, #3a3a3e 50%, #1a1a1e 70%, #2a2a2e)",
                      boxShadow: "inset 0 -2px 4px rgba(255,255,255,0.08), 0 20px 40px rgba(0,0,0,0.8)",
                    }}
                  />

                  {/* Phone Frame (Bezel) - Titanium Multi-stop Gradient */}
                  <div
                    className="relative rounded-[2.5rem] sm:rounded-[3rem] p-[8px] sm:p-[12px] border border-zinc-500/30"
                    style={{
                      background: "linear-gradient(145deg, #8e8e93 0%, #636366 8%, #48484a 15%, #3a3a3c 25%, #58585a 40%, #48484a 55%, #3a3a3c 70%, #636366 85%, #8e8e93 92%, #48484a 100%)",
                      boxShadow: `
                        inset 0 1px 1px rgba(255,255,255,0.4),
                        inset 0 -1px 1px rgba(0,0,0,0.3),
                        inset 0 0 20px rgba(255,255,255,0.05),
                        0 0 0 1px rgba(255,255,255,0.08)
                      `,
                    }}
                  >
                    {/* Double ring bevel effect */}
                    <div className="absolute inset-[1px] rounded-[2.45rem] sm:rounded-[2.95rem] pointer-events-none"
                      style={{
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.2)",
                      }}
                    />

                    {/* Glass Glare / Shine Effect */}
                    <div className="absolute inset-0 z-50 rounded-[2.5rem] sm:rounded-[3rem] pointer-events-none overflow-hidden">
                      {/* Diagonal reflection */}
                      <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/[0.07] to-transparent transform -rotate-45 translate-x-1/2 -translate-y-1/2 blur-sm" />
                      {/* Top highlight - curved */}
                      <div className="absolute top-0 left-[10%] right-[10%] h-[20%] bg-gradient-to-b from-white/[0.06] to-transparent rounded-t-[2.5rem] sm:rounded-t-[3rem] blur-[1px]" />
                      {/* Specular corner highlight */}
                      <div className="absolute top-[5%] right-[8%] w-[15%] h-[8%] bg-gradient-to-bl from-white/[0.08] to-transparent rounded-full blur-[2px]" />
                      {/* Border highlight ring */}
                      <div className="absolute inset-0 rounded-[2.5rem] sm:rounded-[3rem] ring-1 ring-inset ring-white/[0.07]" />
                    </div>

                    {/* Screen */}
                    <div
                      className="bg-[#0b141a] rounded-[2rem] sm:rounded-[2.4rem] overflow-hidden relative"
                      style={{
                        boxShadow: "inset 0 0 15px rgba(0,0,0,0.9), inset 0 0 3px rgba(0,0,0,1), 0 0 0 1px rgba(0,0,0,0.8)",
                      }}
                    >
                      {/* Status Bar */}
                      <div className="flex justify-between items-center px-4 sm:px-6 py-1.5 sm:py-2 text-[9px] sm:text-[10px] text-white/70 bg-[#202c33]">
                        <span className="font-semibold text-white/80">9:41</span>
                        <div className="flex items-center gap-1 sm:gap-1.5">
                          {/* Signal Bars */}
                          <div className="flex items-end gap-[1px] sm:gap-[1.5px]">
                            <div className="w-[2px] sm:w-[3px] h-[3px] sm:h-[4px] bg-white/90 rounded-[0.5px]" />
                            <div className="w-[2px] sm:w-[3px] h-[5px] sm:h-[6px] bg-white/90 rounded-[0.5px]" />
                            <div className="w-[2px] sm:w-[3px] h-[7px] sm:h-[8px] bg-white/90 rounded-[0.5px]" />
                            <div className="w-[2px] sm:w-[3px] h-[9px] sm:h-[10px] bg-white/90 rounded-[0.5px]" />
                          </div>
                          {/* 5G Label */}
                          <span className="text-[7px] sm:text-[8px] font-bold text-white/70 tracking-tight">5G</span>
                          {/* WiFi — viewBox cropped to content (y:9–23) */}
                          <svg
                            className="w-[10px] sm:w-[11px] h-[8px] sm:h-[9px] text-white/90"
                            viewBox="0 9 24 14"
                            fill="currentColor"
                          >
                            <path d="M12 18c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-4.9-2.3l1.4 1.4C9.4 16.4 10.6 16 12 16s2.6.4 3.5 1.1l1.4-1.4C15.6 14.6 13.9 14 12 14s-3.6.6-4.9 1.7zm-2.8-2.8l1.4 1.4C7.3 13 9.5 12 12 12s4.7 1 6.3 2.3l1.4-1.4C17.7 11.1 15 10 12 10s-5.7 1.1-7.7 2.9z" />
                          </svg>
                          {/* Battery with percentage */}
                          <div className="flex items-center gap-[2px]">
                            <span className="text-[7px] sm:text-[8px] font-medium text-white/60">72</span>
                            <div className="w-5 sm:w-6 h-[8px] sm:h-[10px] border border-white/50 rounded-[2px] p-[1px] relative">
                              <div className="w-[70%] h-full bg-[#30D158] rounded-[1px]" />
                            </div>
                            <div className="w-[2px] sm:w-[2px] h-[3px] sm:h-[4px] bg-white/50 rounded-r-[1px]" />
                          </div>
                        </div>
                      </div>

                      {/* WhatsApp Header */}
                      <div className="bg-[#202c33] px-2 sm:px-3 py-2 flex items-center gap-2 sm:gap-3 z-10 relative shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
                        <div className="flex items-center gap-1 cursor-pointer">
                          <svg className="w-5 h-5 text-[#aebac1] -ml-1" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 4l1.4 1.4L7.8 11H20v2H7.8l5.6 5.6L12 20l-8-8 8-8z" />
                          </svg>
                          {/* Profile pic with border and shadow */}
                          <div className="relative">
                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#25D366] flex items-center justify-center overflow-hidden flex-shrink-0 shadow-[0_1px_3px_rgba(0,0,0,0.3)] ring-1 ring-white/10">
                              <span className="text-white font-bold text-sm">T</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 cursor-pointer">
                          <div className="text-[#e9edef] font-medium text-[13px] sm:text-[15px] leading-tight">
                            Tresqu IA
                          </div>
                          <div className="flex items-center gap-1 mt-0.5">
                            <div className="w-[5px] h-[5px] rounded-full bg-[#25D366] shadow-[0_0_3px_rgba(37,211,102,0.5)]" />
                            <span className="text-[10px] sm:text-[11px] text-[#25D366] leading-tight">en línea</span>
                          </div>
                        </div>
                        <div className="flex gap-4 sm:gap-5 text-[#aebac1]">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                          </svg>
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                          </svg>
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z" />
                          </svg>
                        </div>
                      </div>

                      {/* Chat Background */}
                      <div
                        className="h-[280px] xs:h-[300px] sm:h-[340px] md:h-[380px] lg:h-[380px] xl:h-[400px] px-2 sm:px-3 py-3 overflow-y-auto relative flex flex-col scrollbar-hide"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2v-2h2v2h2v-2h2v2h2v-2h2v2h2v-2h2v2h2v-2h2v2h2v-2h2v2h2v-2h2v2h2v-2h2v2h2v-2h2v2h-2v2h-2v-2h-2v2h-2v-2h-2v2h-2v-2h-2v2h-2v-2h-2v2h-2v-2h-2v2h-2v-2h-2v2h-2v-2h-2v2h-2v-2h-2v2h-2v-2h-2v2h-2v-2h-2v2H0v-2h20v.5z' fill='%23ffffff' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                          backgroundColor: "#0b141a",
                        }}
                      >
                        <div className="flex-1 space-y-2">
                          {/* Date Badge */}
                          <div className="flex justify-center mb-3 mt-1">
                            <span className="bg-[#182229] text-[11px] text-[#8696a0] px-3 py-1 rounded-lg shadow-sm">
                              HOY
                            </span>
                          </div>

                          {/* Bot: greeting */}
                          <div className="flex justify-start mb-2">
                            <div className="relative bg-[#202c33] rounded-[7.5px] rounded-tl-none px-[9px] pt-[6px] pb-[20px] max-w-[85%] sm:max-w-[80%] shadow-[0_1px_0.5px_rgba(0,0,0,0.15)]">
                              <div className="absolute top-0 -left-2 w-2 h-3 overflow-hidden">
                                <svg viewBox="0 0 8 13" width="8" height="13" className="text-[#202c33] fill-current">
                                  <path opacity=".13" d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z" />
                                  <path d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z" />
                                </svg>
                              </div>
                              <p className="text-[12.5px] sm:text-[14px] text-[#e9edef] leading-[1.4]">
                                👋 ¡Hola! Soy <span className="font-semibold">Tresqu</span>, tu agente financiero con IA.
                              </p>
                              <p className="text-[12.5px] sm:text-[14px] text-[#e9edef] leading-[1.4] mt-[3px]">
                                Escríbeme tus gastos o ingresos 📊
                                <span className="inline-block w-[44px]" aria-hidden="true" style={{lineHeight: 0, fontSize: 0}} />
                              </p>
                              <div className="absolute bottom-[5px] right-[7px]">
                                <span className="text-[11px] text-[#8696a0]">10:30</span>
                              </div>
                            </div>
                          </div>

                          {/* User: expense */}
                          <div className="flex justify-end mb-2">
                            <div className="relative bg-[#005c4b] rounded-[7.5px] rounded-tr-none px-[9px] pt-[6px] pb-[20px] max-w-[85%] sm:max-w-[80%] shadow-[0_1px_0.5px_rgba(0,0,0,0.15)]">
                              <div className="absolute top-0 -right-2 w-2 h-3 overflow-hidden">
                                <svg viewBox="0 0 8 13" width="8" height="13" className="text-[#005c4b] fill-current">
                                  <path opacity=".13" d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z" transform="scale(-1 1) translate(-8 0)" />
                                  <path d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z" transform="scale(-1 1) translate(-8 0)" />
                                </svg>
                              </div>
                              <p className="text-[12.5px] sm:text-[14px] text-[#e9edef] leading-[1.4]">
                                Gasté 45 mil en almuerzo
                                <span className="inline-block w-[52px]" aria-hidden="true" style={{lineHeight: 0, fontSize: 0}} />
                              </p>
                              <div className="absolute bottom-[5px] right-[7px] flex items-center gap-[3px]">
                                <span className="text-[11px] text-[#8696a0]">10:31</span>
                                <CheckCheck className="w-[14px] h-[14px] text-[#53bdeb]" />
                              </div>
                            </div>
                          </div>

                          {/* Bot: registered confirmation */}
                          <div className="flex justify-start mb-2">
                            <div className="relative bg-[#202c33] rounded-[7.5px] rounded-tl-none px-[9px] pt-[6px] pb-[20px] max-w-[85%] sm:max-w-[80%] shadow-[0_1px_0.5px_rgba(0,0,0,0.15)]">
                              <div className="absolute top-0 -left-2 w-2 h-3 overflow-hidden">
                                <svg viewBox="0 0 8 13" width="8" height="13" className="text-[#202c33] fill-current">
                                  <path opacity=".13" d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z" />
                                  <path d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z" />
                                </svg>
                              </div>
                              <div className="bg-[#1b252a] rounded-[5px] px-[9px] py-[7px] mb-[6px] border-l-[3px] border-[#25D366]">
                                <div className="text-[#25D366] text-[11px] sm:text-[12px] font-semibold leading-tight mb-[3px]">
                                  Gasto registrado ✅
                                </div>
                                <div className="text-[#e9edef] text-[13px] sm:text-[14px] font-bold leading-tight">
                                  $45.000
                                </div>
                                <div className="text-[#8696a0] text-[11px] sm:text-[12px] mt-[2px]">
                                  🍽️ Alimentación
                                </div>
                              </div>
                              <p className="text-[12.5px] sm:text-[14px] text-[#e9edef] leading-[1.4]">
                                ¡Listo! Lo he guardado.
                                <span className="inline-block w-[44px]" aria-hidden="true" style={{lineHeight: 0, fontSize: 0}} />
                              </p>
                              <div className="absolute bottom-[5px] right-[7px]">
                                <span className="text-[11px] text-[#8696a0]">10:31</span>
                              </div>
                            </div>
                          </div>

                          {/* User: summary request */}
                          <div className="flex justify-end mb-2">
                            <div className="relative bg-[#005c4b] rounded-[7.5px] rounded-tr-none px-[9px] pt-[6px] pb-[20px] max-w-[85%] sm:max-w-[80%] shadow-[0_1px_0.5px_rgba(0,0,0,0.15)]">
                              <div className="absolute top-0 -right-2 w-2 h-3 overflow-hidden">
                                <svg viewBox="0 0 8 13" width="8" height="13" className="text-[#005c4b] fill-current">
                                  <path opacity=".13" d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z" transform="scale(-1 1) translate(-8 0)" />
                                  <path d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z" transform="scale(-1 1) translate(-8 0)" />
                                </svg>
                              </div>
                              <p className="text-[12.5px] sm:text-[14px] text-[#e9edef] leading-[1.4]">
                                ¿Mi resumen?
                                <span className="inline-block w-[52px]" aria-hidden="true" style={{lineHeight: 0, fontSize: 0}} />
                              </p>
                              <div className="absolute bottom-[5px] right-[7px] flex items-center gap-[3px]">
                                <span className="text-[11px] text-[#8696a0]">10:32</span>
                                <CheckCheck className="w-[14px] h-[14px] text-[#53bdeb]" />
                              </div>
                            </div>
                          </div>

                          {/* Bot: daily stats */}
                          <div className="flex justify-start mb-2">
                            <div className="relative bg-[#202c33] rounded-[7.5px] rounded-tl-none px-[9px] pt-[6px] pb-[20px] max-w-[85%] sm:max-w-[80%] shadow-[0_1px_0.5px_rgba(0,0,0,0.15)]">
                              <div className="absolute top-0 -left-2 w-2 h-3 overflow-hidden">
                                <svg viewBox="0 0 8 13" width="8" height="13" className="text-[#202c33] fill-current">
                                  <path opacity=".13" d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z" />
                                  <path d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z" />
                                </svg>
                              </div>
                              <p className="text-[12.5px] sm:text-[14px] text-[#e9edef] leading-[1.4] font-semibold mb-[6px]">
                                📊 Resumen del día
                              </p>
                              <div className="space-y-[5px] mb-[4px]">
                                <div className="flex items-center justify-between text-[11px] sm:text-[12px] bg-[#1b252a] px-[8px] py-[5px] rounded-[5px]">
                                  <div className="flex items-center gap-[6px]">
                                    <div className="w-[18px] h-[18px] rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                                      <span className="text-red-400 text-[9px] leading-none">↓</span>
                                    </div>
                                    <span className="text-[#e9edef]">Gastos</span>
                                  </div>
                                  <span className="text-red-400 font-semibold">$45.000</span>
                                </div>
                                <div className="flex items-center justify-between text-[11px] sm:text-[12px] bg-[#1b252a] px-[8px] py-[5px] rounded-[5px]">
                                  <div className="flex items-center gap-[6px]">
                                    <div className="w-[18px] h-[18px] rounded-full bg-[#00FF7F]/10 flex items-center justify-center flex-shrink-0">
                                      <span className="text-[#00FF7F] text-[9px] leading-none">↑</span>
                                    </div>
                                    <span className="text-[#e9edef]">Ingresos</span>
                                  </div>
                                  <span className="text-[#00FF7F] font-semibold">$0</span>
                                </div>
                              </div>
                              <div className="absolute bottom-[5px] right-[7px]">
                                <span className="text-[11px] text-[#8696a0]">10:32</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Input Bar - More realistic */}
                      <div className="bg-[#202c33] px-1.5 sm:px-2 py-1.5 sm:py-2 flex items-center gap-1 sm:gap-1.5 z-10 relative">
                        {/* Emoji icon */}
                        <div className="flex pl-0.5 text-[#8696a0]">
                          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.298 1.011 0 6.31 0 12.813s5.298 11.803 11.804 11.803 11.804-5.298 11.804-11.803S18.31 1.011 11.804 1.011zM12 21.564c-5.246 0-9.5-4.253-9.5-9.5s4.254-9.5 9.5-9.5 9.5 4.254 9.5 9.5-4.254 9.5-9.5 9.5zm3.063-9.402c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z" />
                          </svg>
                        </div>
                        <div className="flex-1 bg-[#2a3942] rounded-3xl min-h-[36px] sm:min-h-[40px] px-3 sm:px-4 py-2 flex items-center shadow-sm">
                          <span className="text-[#8696a0] text-[13px] sm:text-[14px]">
                            Mensaje
                          </span>
                        </div>
                        <div className="flex items-center gap-1 pr-0.5 text-[#8696a0]">
                          {/* Camera icon */}
                          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M21.317 4.381H10.971L9.078 2.45c-.246-.251-.736-.457-1.089-.457H4.905c-.352 0-.837.211-1.078.468L2.515 4.381H2.683C1.198 4.381 0 5.58 0 7.065v12.27c0 1.485 1.199 2.684 2.683 2.684h18.634c1.485 0 2.683-1.199 2.683-2.684V7.065c0-1.485-1.198-2.684-2.683-2.684zM12 18.27c-3.088 0-5.592-2.504-5.592-5.592 0-3.088 2.504-5.592 5.592-5.592s5.592 2.504 5.592 5.592c0 3.088-2.504 5.592-5.592 5.592zm0-9.056c-1.91 0-3.464 1.553-3.464 3.464 0 1.91 1.553 3.464 3.464 3.464s3.464-1.554 3.464-3.464S13.91 9.214 12 9.214z"/>
                          </svg>
                          {/* Mic button */}
                          <div className="w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] rounded-full bg-[#00a884] flex items-center justify-center ml-0.5">
                            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.349 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2.002z"/>
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Home indicator bar */}
                      <div className="bg-[#0b141a] flex justify-center py-2">
                        <div className="w-[100px] sm:w-[120px] h-[4px] bg-white/20 rounded-full" />
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Island - Enhanced */}
                  <div
                    className="absolute top-[12px] sm:top-[16px] left-1/2 -translate-x-1/2 w-[75px] xs:w-[85px] sm:w-[95px] h-[22px] xs:h-[26px] sm:h-[28px] bg-black rounded-full flex items-center justify-between px-2 sm:px-3 z-50"
                    style={{
                      boxShadow: "0 0 10px rgba(0,0,0,0.9), inset 0 1px 1px rgba(255,255,255,0.04), inset 0 0 4px rgba(255,255,255,0.02)",
                      border: "0.5px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    {/* Face ID sensor - dot projector */}
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#080808] border border-white/[0.06] relative">
                      <div className="absolute inset-[1px] rounded-full bg-gradient-to-br from-[#1a1a2e]/50 to-transparent" />
                    </div>
                    {/* Camera lens with iris rings */}
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full relative">
                      {/* Outer ring */}
                      <div className="absolute inset-0 rounded-full bg-[#0c0c14] border border-[#1a1a2e]/60" />
                      {/* Middle iris ring */}
                      <div className="absolute inset-[1.5px] rounded-full bg-gradient-to-br from-[#0f1028] to-[#080812] border border-[#1e1e3a]/40" />
                      {/* Inner lens */}
                      <div className="absolute inset-[3px] rounded-full bg-[#06060e]" />
                      {/* Light reflection dot */}
                      <div className="absolute top-[2px] right-[2px] w-[2px] h-[2px] rounded-full bg-blue-400/40" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary Phone - Only visible on xl screens */}
              <div className="absolute -left-20 -top-4 z-0 opacity-60 scale-[0.65] hidden xl:block rotate-[-8deg] transition-transform duration-1000 ease-out hover:[transform:rotate(-8deg)_rotateY(-15deg)_rotateX(5deg)]" style={{ perspective: "1500px" }}>
                <div className="relative w-[240px]">
                  {/* Layered Shadows */}
                  <div
                    className="absolute inset-0 rounded-[2.5rem]"
                    style={{
                      boxShadow: `
                        0 2px 6px rgba(0,0,0,0.5),
                        0 10px 25px rgba(0,0,0,0.4),
                        0 30px 50px rgba(0,0,0,0.3)
                      `,
                    }}
                  />

                  {/* 3D Depth - Titanium */}
                  <div
                    className="absolute inset-0 rounded-[2.7rem] translate-y-1"
                    style={{
                      background: "linear-gradient(135deg, #2a2a2e, #1a1a1e 30%, #3a3a3e 50%, #1a1a1e 70%, #2a2a2e)",
                      boxShadow: "inset 0 -2px 4px rgba(255,255,255,0.08), 0 10px 20px rgba(0,0,0,0.8)",
                    }}
                  />

                  {/* Frame - Titanium */}
                  <div
                    className="relative rounded-[2.5rem] p-[8px] border border-zinc-500/30"
                    style={{
                      background: "linear-gradient(145deg, #8e8e93 0%, #636366 8%, #48484a 15%, #3a3a3c 25%, #58585a 40%, #48484a 55%, #3a3a3c 70%, #636366 85%, #8e8e93 92%, #48484a 100%)",
                      boxShadow: `
                        inset 0 1px 1px rgba(255,255,255,0.4),
                        inset 0 -1px 1px rgba(0,0,0,0.3),
                        inset 0 0 20px rgba(255,255,255,0.05),
                        0 0 0 1px rgba(255,255,255,0.08)
                      `,
                    }}
                  >
                    {/* Double ring bevel */}
                    <div className="absolute inset-[1px] rounded-[2.45rem] pointer-events-none"
                      style={{
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.2)",
                      }}
                    />

                    {/* Glass Glare */}
                    <div className="absolute inset-0 z-50 rounded-[2.5rem] pointer-events-none overflow-hidden">
                      <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/[0.07] to-transparent transform -rotate-45 translate-x-1/2 -translate-y-1/2 blur-sm" />
                      <div className="absolute top-0 left-[10%] right-[10%] h-[20%] bg-gradient-to-b from-white/[0.06] to-transparent rounded-t-[2.5rem] blur-[1px]" />
                      <div className="absolute inset-0 rounded-[2.5rem] ring-1 ring-inset ring-white/[0.07]" />
                    </div>

                    <div
                      className="bg-[#0b141a] rounded-[2rem] overflow-hidden relative"
                      style={{
                        boxShadow: "inset 0 0 15px rgba(0,0,0,0.9), inset 0 0 3px rgba(0,0,0,1), 0 0 0 1px rgba(0,0,0,0.8)",
                      }}
                    >
                    {/* Status Bar Secondary */}
                    <div className="flex justify-between items-center px-3 py-1.5 bg-[#202c33]">
                      <span className="text-[9px] font-semibold text-white/80">9:41</span>
                      <div className="flex items-center gap-1">
                        <div className="flex items-end gap-px">
                          <div className="w-[2px] h-[3px] bg-white/80 rounded-[0.5px]" />
                          <div className="w-[2px] h-[5px] bg-white/80 rounded-[0.5px]" />
                          <div className="w-[2px] h-[7px] bg-white/80 rounded-[0.5px]" />
                          <div className="w-[2px] h-[9px] bg-white/80 rounded-[0.5px]" />
                        </div>
                        <div className="w-[14px] h-[7px] border border-white/50 rounded-[1.5px] p-px relative">
                          <div className="w-[65%] h-full bg-[#30D158] rounded-[0.5px]" />
                          <div className="absolute -right-[2px] top-[2px] w-[1.5px] h-[3px] bg-white/50 rounded-r" />
                        </div>
                      </div>
                    </div>

                    {/* WhatsApp Header Secondary */}
                    <div className="bg-[#202c33] px-3 py-2 flex items-center gap-2 shadow-[0_1px_3px_rgba(0,0,0,0.4)] z-10 relative">
                      <svg className="w-4 h-4 text-[#aebac1] -ml-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 4l1.4 1.4L7.8 11H20v2H7.8l5.6 5.6L12 20l-8-8 8-8z" />
                      </svg>
                      <div className="w-7 h-7 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_1px_2px_rgba(0,0,0,0.3)] ring-1 ring-white/10">
                        <span className="text-white font-bold text-[11px]">T</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-[#e9edef] font-semibold text-[11px] leading-tight">
                          Tresqu IA
                        </div>
                        <div className="flex items-center gap-0.5 mt-0.5">
                          <div className="w-[4px] h-[4px] rounded-full bg-[#25D366]" />
                          <span className="text-[8px] text-[#25D366] leading-tight">en línea</span>
                        </div>
                      </div>
                      <svg className="w-4 h-4 text-[#aebac1]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z" />
                      </svg>
                    </div>

                    {/* Chat Background Secondary */}
                    <div
                      className="h-[310px] px-2 py-2 flex flex-col gap-2 scrollbar-hide overflow-y-auto"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2v-2h2v2h2v-2h2v2h2v-2h2v2h2v-2h2v2h2v-2h2v2h2v-2h2v2h2v-2h2v2h2v-2h2v2h2v-2h2v2h-2v2h-2v-2h-2v2h-2v-2h-2v2h-2v-2h-2v2h-2v-2h-2v2h-2v-2h-2v2h-2v-2h-2v2h-2v-2h-2v2h-2v-2h-2v2h-2v-2h-2v2h-2v-2h-2v2H0v-2h20v.5z' fill='%23ffffff' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                        backgroundColor: "#0b141a",
                      }}
                    >
                      {/* Date badge */}
                      <div className="flex justify-center mt-1 mb-0.5">
                        <span className="bg-[#182229] text-[9px] text-[#8696a0] px-2.5 py-0.5 rounded-md">HOY</span>
                      </div>

                      {/* User: salary */}
                      <div className="flex justify-end">
                        <div className="relative bg-[#005c4b] rounded-[7.5px] rounded-tr-none px-[8px] pt-[5px] pb-[18px] max-w-[85%] shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]">
                          <div className="absolute top-0 -right-2 w-2 h-3 overflow-hidden">
                            <svg viewBox="0 0 8 13" width="8" height="13" className="text-[#005c4b] fill-current">
                              <path opacity=".13" d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z" transform="scale(-1 1) translate(-8 0)" />
                              <path d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z" transform="scale(-1 1) translate(-8 0)" />
                            </svg>
                          </div>
                          <p className="text-[11px] sm:text-[13px] text-[#e9edef] leading-[1.4]">
                            Recibí mi salario 3.500.000
                            <span className="inline-block w-[48px]" aria-hidden="true" style={{lineHeight: 0, fontSize: 0}} />
                          </p>
                          <div className="absolute bottom-[4px] right-[6px] flex items-center gap-[3px]">
                            <span className="text-[10px] text-[#8696a0]">9:15</span>
                            <CheckCheck className="w-[13px] h-[13px] text-[#53bdeb]" />
                          </div>
                        </div>
                      </div>

                      {/* Bot: salary confirmed */}
                      <div className="flex justify-start">
                        <div className="relative bg-[#202c33] rounded-[7.5px] rounded-tl-none px-[8px] pt-[5px] pb-[18px] max-w-[85%] shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]">
                          <div className="absolute top-0 -left-2 w-2 h-3 overflow-hidden">
                            <svg viewBox="0 0 8 13" width="8" height="13" className="text-[#202c33] fill-current">
                              <path opacity=".13" d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z" />
                              <path d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z" />
                            </svg>
                          </div>
                          <div className="bg-[#1b252a] rounded-[4px] px-[7px] py-[5px] mb-[5px] border-l-[3px] border-[#25D366]">
                            <div className="text-[11px] sm:text-[12px] text-[#25D366] font-semibold leading-tight">+$3.500.000</div>
                            <div className="text-[10px] text-[#8696a0] mt-[1px]">💰 Salario</div>
                          </div>
                          <p className="text-[11px] sm:text-[13px] text-[#e9edef] leading-[1.4]">
                            ¡Ingreso registrado! 🎉
                            <span className="inline-block w-[40px]" aria-hidden="true" style={{lineHeight: 0, fontSize: 0}} />
                          </p>
                          <div className="absolute bottom-[4px] right-[6px]">
                            <span className="text-[10px] text-[#8696a0]">9:15</span>
                          </div>
                        </div>
                      </div>

                      {/* User: Uber */}
                      <div className="flex justify-end">
                        <div className="relative bg-[#005c4b] rounded-[7.5px] rounded-tr-none px-[8px] pt-[5px] pb-[18px] max-w-[85%] shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]">
                          <div className="absolute top-0 -right-2 w-2 h-3 overflow-hidden">
                            <svg viewBox="0 0 8 13" width="8" height="13" className="text-[#005c4b] fill-current">
                              <path opacity=".13" d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z" transform="scale(-1 1) translate(-8 0)" />
                              <path d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z" transform="scale(-1 1) translate(-8 0)" />
                            </svg>
                          </div>
                          <p className="text-[11px] sm:text-[13px] text-[#e9edef] leading-[1.4]">
                            Uber 15.000
                            <span className="inline-block w-[48px]" aria-hidden="true" style={{lineHeight: 0, fontSize: 0}} />
                          </p>
                          <div className="absolute bottom-[4px] right-[6px] flex items-center gap-[3px]">
                            <span className="text-[10px] text-[#8696a0]">10:45</span>
                            <CheckCheck className="w-[13px] h-[13px] text-[#53bdeb]" />
                          </div>
                        </div>
                      </div>

                      {/* Bot: Uber registered */}
                      <div className="flex justify-start">
                        <div className="relative bg-[#202c33] rounded-[7.5px] rounded-tl-none px-[8px] pt-[5px] pb-[18px] max-w-[85%] shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]">
                          <div className="absolute top-0 -left-2 w-2 h-3 overflow-hidden">
                            <svg viewBox="0 0 8 13" width="8" height="13" className="text-[#202c33] fill-current">
                              <path opacity=".13" d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z" />
                              <path d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z" />
                            </svg>
                          </div>
                          <div className="bg-[#1b252a] rounded-[4px] px-[7px] py-[5px] mb-[5px] border-l-[3px] border-orange-400">
                            <div className="text-[11px] sm:text-[12px] text-orange-400 font-semibold leading-tight">-$15.000</div>
                            <div className="text-[10px] text-[#8696a0] mt-[1px]">🚗 Transporte</div>
                          </div>
                          <p className="text-[11px] sm:text-[13px] text-[#e9edef] leading-[1.4]">
                            ✅ Registrado
                            <span className="inline-block w-[40px]" aria-hidden="true" style={{lineHeight: 0, fontSize: 0}} />
                          </p>
                          <div className="absolute bottom-[4px] right-[6px]">
                            <span className="text-[10px] text-[#8696a0]">10:45</span>
                          </div>
                        </div>
                      </div>

                      {/* User: monthly balance */}
                      <div className="flex justify-end">
                        <div className="relative bg-[#005c4b] rounded-[7.5px] rounded-tr-none px-[8px] pt-[5px] pb-[18px] max-w-[85%] shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]">
                          <div className="absolute top-0 -right-2 w-2 h-3 overflow-hidden">
                            <svg viewBox="0 0 8 13" width="8" height="13" className="text-[#005c4b] fill-current">
                              <path opacity=".13" d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z" transform="scale(-1 1) translate(-8 0)" />
                              <path d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z" transform="scale(-1 1) translate(-8 0)" />
                            </svg>
                          </div>
                          <p className="text-[11px] sm:text-[13px] text-[#e9edef] leading-[1.4]">
                            ¿Mi balance del mes?
                            <span className="inline-block w-[36px]" aria-hidden="true" style={{lineHeight: 0, fontSize: 0}} />
                          </p>
                          <div className="absolute bottom-[4px] right-[6px] flex items-center gap-[3px]">
                            <span className="text-[10px] text-[#8696a0]">11:00</span>
                            <Check className="w-[13px] h-[13px] text-[#8696a0]" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Dynamic Island - Secondary */}
                    <div
                      className="absolute top-[8px] left-1/2 -translate-x-1/2 w-[75px] h-[22px] bg-black rounded-full flex items-center justify-between px-2 z-50"
                      style={{
                        boxShadow: "0 0 8px rgba(0,0,0,0.9), inset 0 1px 1px rgba(255,255,255,0.04)",
                        border: "0.5px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#080808] border border-white/[0.06]" />
                      <div className="w-2 h-2 rounded-full relative">
                        <div className="absolute inset-0 rounded-full bg-[#0c0c14] border border-[#1a1a2e]/60" />
                        <div className="absolute inset-[1px] rounded-full bg-[#06060e]" />
                        <div className="absolute top-[1px] right-[1px] w-[1.5px] h-[1.5px] rounded-full bg-blue-400/40" />
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
                  <p className="text-zinc-500 text-xs sm:text-sm truncate flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]"></span>
                    </span>
                    Respuesta en &lt;30 seg
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
