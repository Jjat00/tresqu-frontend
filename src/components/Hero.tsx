import { useNavigate } from "react-router-dom";
import {
  MessageCircle,
  Send,
  ArrowRight,
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

          {/* Right Column - iPhone 16 Pro Mockup */}
          <div className="relative flex justify-center order-2">
            {/* Ambient glow behind phone */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[280px] h-[280px] bg-[#25D366]/10 rounded-full blur-[120px]" />
            </div>

            <div
              className="relative animate-float"
              style={{
                filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.55)) drop-shadow(0 60px 80px rgba(0,0,0,0.35))",
              }}
            >
              {/* iPhone 16 Pro body — correct aspect ratio ~2.077:1 */}
              <div className="relative w-[270px] sm:w-[290px] lg:w-[300px] xl:w-[320px] aspect-[9/18.7]">

                {/* Side buttons (behind frame, protruding) */}
                {/* Action button (left, top) */}
                <div
                  className="absolute -left-[2.5px] top-[13.5%] h-[2.2%] w-[3px] rounded-l-[1px] z-0"
                  style={{
                    background: "linear-gradient(to right, #6b6b6f 0%, #98989c 50%, #6b6b6f 100%)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3), -1px 0 2px rgba(0,0,0,0.5)",
                  }}
                />
                {/* Volume up */}
                <div
                  className="absolute -left-[2.5px] top-[17.5%] h-[5.5%] w-[3px] rounded-l-[1px] z-0"
                  style={{
                    background: "linear-gradient(to right, #6b6b6f 0%, #98989c 50%, #6b6b6f 100%)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3), -1px 0 2px rgba(0,0,0,0.5)",
                  }}
                />
                {/* Volume down */}
                <div
                  className="absolute -left-[2.5px] top-[24.5%] h-[5.5%] w-[3px] rounded-l-[1px] z-0"
                  style={{
                    background: "linear-gradient(to right, #6b6b6f 0%, #98989c 50%, #6b6b6f 100%)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3), -1px 0 2px rgba(0,0,0,0.5)",
                  }}
                />
                {/* Side/Power button (right) */}
                <div
                  className="absolute -right-[2.5px] top-[20%] h-[9%] w-[3px] rounded-r-[1px] z-0"
                  style={{
                    background: "linear-gradient(to left, #6b6b6f 0%, #98989c 50%, #6b6b6f 100%)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3), 1px 0 2px rgba(0,0,0,0.5)",
                  }}
                />

                {/* Titanium outer frame */}
                <div
                  className="absolute inset-0 rounded-[48px] z-10"
                  style={{
                    background:
                      "linear-gradient(135deg, #c8c8cc 0%, #8e8e93 18%, #5a5a5e 38%, #3a3a3c 50%, #5a5a5e 62%, #8e8e93 82%, #c8c8cc 100%)",
                    boxShadow: `
                      inset 0 0 0 1px rgba(255,255,255,0.2),
                      inset 0 1px 1px rgba(255,255,255,0.4),
                      inset 0 -1px 1px rgba(0,0,0,0.4)
                    `,
                  }}
                />

                {/* Inner black bezel */}
                <div
                  className="absolute inset-[3px] rounded-[45px] bg-black z-10"
                  style={{
                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
                  }}
                />

                {/* Screen */}
                <div
                  className="absolute inset-[6px] rounded-[42px] overflow-hidden bg-[#0b141a] z-20 flex flex-col"
                >
                  {/* Status bar */}
                  <div className="flex justify-between items-center px-7 pt-[14px] pb-[6px] text-white">
                    <span className="text-[12px] font-semibold tracking-tight tabular-nums">9:41</span>
                    <div className="flex items-center gap-[5px]">
                      {/* Signal bars */}
                      <div className="flex items-end gap-[1.5px]">
                        <div className="w-[3px] h-[4px] bg-white rounded-[0.5px]" />
                        <div className="w-[3px] h-[5px] bg-white rounded-[0.5px]" />
                        <div className="w-[3px] h-[7px] bg-white rounded-[0.5px]" />
                        <div className="w-[3px] h-[9px] bg-white rounded-[0.5px]" />
                      </div>
                      {/* WiFi */}
                      <svg className="w-[14px] h-[10px]" viewBox="0 0 16 11" fill="currentColor">
                        <path d="M8 10.4a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4zm-3.5-3.9l1 1a3.5 3.5 0 012.5-1 3.5 3.5 0 012.5 1l1-1a4.9 4.9 0 00-7 0zm-2-2l1 1A6.4 6.4 0 018 3.5c1.8 0 3.4.7 4.5 1.9l1-1A7.8 7.8 0 008 2.1a7.8 7.8 0 00-5.5 2.3z"/>
                      </svg>
                      {/* Battery */}
                      <div className="flex items-center">
                        <div className="relative w-[22px] h-[11px] border border-white/60 rounded-[3px] p-[1px]">
                          <div className="w-[78%] h-full bg-white rounded-[1.5px]" />
                        </div>
                        <div className="w-[1.5px] h-[4px] bg-white/60 rounded-r-[1px]" />
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp header */}
                  <div className="bg-[#1f2c34] px-2 py-[7px] flex items-center gap-[8px] border-b border-black/20">
                    {/* Back arrow */}
                    <svg className="w-[22px] h-[22px] text-[#e9edef] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 11H9l3.29-3.29a1 1 0 1 0-1.42-1.42l-5 5a1 1 0 0 0 0 1.42l5 5a1 1 0 0 0 1.42-1.42L9 13h10a1 1 0 0 0 0-2z"/>
                    </svg>
                    {/* Avatar */}
                    <div className="relative w-[38px] h-[38px] flex-shrink-0">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00FF7F] to-[#00a884] flex items-center justify-center">
                        <span className="text-[#0b141a] font-bold text-[15px] tracking-tight">T</span>
                      </div>
                      <div className="absolute inset-0 rounded-full ring-[1.5px] ring-black/20" />
                    </div>
                    {/* Name + status */}
                    <div className="flex-1 min-w-0 leading-tight">
                      <div className="text-[#e9edef] font-medium text-[15px] truncate">Tresqu IA</div>
                      <div className="text-[#8696a0] text-[12px] -mt-[1px]">en línea</div>
                    </div>
                    {/* Action icons */}
                    <div className="flex items-center gap-[14px] text-[#e9edef] pr-[6px]">
                      <svg className="w-[20px] h-[20px]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z"/>
                      </svg>
                      <svg className="w-[20px] h-[20px]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a1 1 0 0 0-1.01.24l-1.57 1.97A15.54 15.54 0 0 1 6.98 9.82l1.95-1.66a.96.96 0 0 0 .24-1C8.8 6.04 8.6 4.85 8.6 3.62c0-.54-.45-.99-.99-.99H4.19c-.54 0-1.19.24-1.19.99A17 17 0 0 0 20 20c.71 0 .99-.63.99-1.18v-3.44c0-.54-.45-1-.99-1z"/>
                      </svg>
                      <svg className="w-[20px] h-[20px]" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="5" r="2"/>
                        <circle cx="12" cy="12" r="2"/>
                        <circle cx="12" cy="19" r="2"/>
                      </svg>
                    </div>
                  </div>

                  {/* Chat area with doodle pattern */}
                  <div
                    className="flex-1 overflow-hidden relative px-[8px] py-[8px] flex flex-col"
                    style={{
                      backgroundColor: "#0b141a",
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E%3Cg fill='%23ffffff' fill-opacity='0.025'%3E%3Cpath d='M30 20c-.5 0-1 .2-1.3.6l-3.5 3.5c-.4.4-.6.9-.6 1.4v7c0 .5.2 1 .6 1.4l3.5 3.5c.4.4.9.6 1.4.6h7c.5 0 1-.2 1.4-.6l3.5-3.5c.4-.4.6-.9.6-1.4v-7c0-.5-.2-1-.6-1.4l-3.5-3.5c-.4-.4-.9-.6-1.4-.6h-7z'/%3E%3Cpath d='M110 55c3 0 5-2 5-5s-2-5-5-5-5 2-5 5 2 5 5 5zm0 4c-4 0-7 2-9 4l2 2c2-2 4-3 7-3s5 1 7 3l2-2c-2-2-5-4-9-4z'/%3E%3Cpath d='M60 120l-3 6 6-3 6 3-3-6 5-5h-6l-2-6-2 6h-6z'/%3E%3Ccircle cx='150' cy='90' r='4'/%3E%3Cpath d='M155 130c-5 0-9 4-9 9h3c0-3 3-6 6-6s6 3 6 6h3c0-5-4-9-9-9z'/%3E%3Cpath d='M25 150c-2 0-3-1-3-3V140h-2v7c0 3 2 5 5 5h7v-2h-7zm130-140h-7v2h7c2 0 3 1 3 3v7h2v-7c0-3-2-5-5-5z'/%3E%3Cpath d='M90 160a3 3 0 100-6 3 3 0 000 6zm-5-12l-4 2 1 4 4-1 2-4-3-1z'/%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  >
                    <div className="flex-1 space-y-[4px] overflow-hidden">
                      {/* Date separator */}
                      <div className="flex justify-center py-[4px]">
                        <span className="bg-[#182229]/95 text-[#8696a0] text-[11.5px] px-[10px] py-[3px] rounded-md shadow-[0_1px_0.5px_rgba(0,0,0,0.2)]">
                          HOY
                        </span>
                      </div>

                      {/* Encryption notice */}
                      <div className="flex justify-center pb-[4px]">
                        <div className="bg-[#182229]/95 text-[#ffd279] text-[10.5px] px-[12px] py-[4px] rounded-md max-w-[88%] text-center leading-snug shadow-[0_1px_0.5px_rgba(0,0,0,0.2)]">
                          Los mensajes están cifrados de extremo a extremo.
                        </div>
                      </div>

                      {/* Bot: greeting */}
                      <div className="flex justify-start">
                        <div className="relative bg-[#1f2c34] rounded-[7px] rounded-tl-none max-w-[78%] px-[9px] pt-[6px] pb-[18px] shadow-[0_1px_0.5px_rgba(0,0,0,0.2)]">
                          <svg
                            className="absolute -left-[7px] top-0 w-[8px] h-[13px] text-[#1f2c34]"
                            viewBox="0 0 8 13"
                            fill="currentColor"
                          >
                            <path d="M1.533 3.568L8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z" opacity=".13" />
                            <path d="M1.533 2.568L8 11.193V0H2.812C1.042 0 .474 1.156 1.533 2.568z" />
                          </svg>
                          <p className="text-[13.5px] text-[#e9edef] leading-[1.35]">
                            👋 ¡Hola! Soy <span className="font-semibold">Tresqu</span>, tu asistente financiero con IA.
                          </p>
                          <p className="text-[13.5px] text-[#e9edef] leading-[1.35] mt-[4px]">
                            Cuéntame tus gastos o ingresos en texto o audio 🎙️
                          </p>
                          <span className="absolute bottom-[3px] right-[8px] text-[10.5px] text-[#8696a0] tabular-nums">
                            10:30
                          </span>
                        </div>
                      </div>

                      {/* User: expense */}
                      <div className="flex justify-end">
                        <div className="relative bg-[#005c4b] rounded-[7px] rounded-tr-none max-w-[78%] px-[9px] pt-[6px] pb-[18px] shadow-[0_1px_0.5px_rgba(0,0,0,0.2)]">
                          <svg
                            className="absolute -right-[7px] top-0 w-[8px] h-[13px] text-[#005c4b]"
                            viewBox="0 0 8 13"
                            fill="currentColor"
                          >
                            <path d="M6.467 3.568L0 12.193V1h5.188c1.77 0 2.338 1.156 1.279 2.568z" opacity=".13" />
                            <path d="M6.467 2.568L0 11.193V0h5.188c1.77 0 2.338 1.156 1.279 2.568z" />
                          </svg>
                          <p className="text-[13.5px] text-[#e9edef] leading-[1.35]">
                            Gasté 45 mil en almuerzo
                          </p>
                          <div className="absolute bottom-[3px] right-[8px] flex items-center gap-[3px]">
                            <span className="text-[10.5px] text-[#8696a0] tabular-nums">10:31</span>
                            <CheckCheck className="w-[15px] h-[15px] text-[#53bdeb]" strokeWidth={2.4} />
                          </div>
                        </div>
                      </div>

                      {/* Bot: confirmation (WhatsApp-native formatting) */}
                      <div className="flex justify-start">
                        <div className="relative bg-[#1f2c34] rounded-[7px] rounded-tl-none max-w-[78%] px-[9px] pt-[6px] pb-[18px] shadow-[0_1px_0.5px_rgba(0,0,0,0.2)]">
                          <svg
                            className="absolute -left-[7px] top-0 w-[8px] h-[13px] text-[#1f2c34]"
                            viewBox="0 0 8 13"
                            fill="currentColor"
                          >
                            <path d="M1.533 3.568L8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z" opacity=".13" />
                            <path d="M1.533 2.568L8 11.193V0H2.812C1.042 0 .474 1.156 1.533 2.568z" />
                          </svg>
                          <p className="text-[13.5px] text-[#e9edef] leading-[1.4]">
                            <span className="font-semibold">✅ Gasto registrado</span>
                          </p>
                          <p className="text-[13.5px] text-[#e9edef] leading-[1.4] mt-[2px]">
                            🍽️ Alimentación
                            <br />
                            💵 $45.000
                          </p>
                          <span className="absolute bottom-[3px] right-[8px] text-[10.5px] text-[#8696a0] tabular-nums">
                            10:31
                          </span>
                        </div>
                      </div>

                      {/* User: summary */}
                      <div className="flex justify-end">
                        <div className="relative bg-[#005c4b] rounded-[7px] rounded-tr-none max-w-[78%] px-[9px] pt-[6px] pb-[18px] shadow-[0_1px_0.5px_rgba(0,0,0,0.2)]">
                          <svg
                            className="absolute -right-[7px] top-0 w-[8px] h-[13px] text-[#005c4b]"
                            viewBox="0 0 8 13"
                            fill="currentColor"
                          >
                            <path d="M6.467 3.568L0 12.193V1h5.188c1.77 0 2.338 1.156 1.279 2.568z" opacity=".13" />
                            <path d="M6.467 2.568L0 11.193V0h5.188c1.77 0 2.338 1.156 1.279 2.568z" />
                          </svg>
                          <p className="text-[13.5px] text-[#e9edef] leading-[1.35]">
                            resumen del día
                          </p>
                          <div className="absolute bottom-[3px] right-[8px] flex items-center gap-[3px]">
                            <span className="text-[10.5px] text-[#8696a0] tabular-nums">10:32</span>
                            <CheckCheck className="w-[15px] h-[15px] text-[#53bdeb]" strokeWidth={2.4} />
                          </div>
                        </div>
                      </div>

                      {/* Bot: summary reply */}
                      <div className="flex justify-start">
                        <div className="relative bg-[#1f2c34] rounded-[7px] rounded-tl-none max-w-[80%] px-[9px] pt-[6px] pb-[18px] shadow-[0_1px_0.5px_rgba(0,0,0,0.2)]">
                          <svg
                            className="absolute -left-[7px] top-0 w-[8px] h-[13px] text-[#1f2c34]"
                            viewBox="0 0 8 13"
                            fill="currentColor"
                          >
                            <path d="M1.533 3.568L8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z" opacity=".13" />
                            <path d="M1.533 2.568L8 11.193V0H2.812C1.042 0 .474 1.156 1.533 2.568z" />
                          </svg>
                          <p className="text-[13.5px] text-[#e9edef] leading-[1.4]">
                            <span className="font-semibold">📊 Tu resumen de hoy</span>
                          </p>
                          <p className="text-[13.5px] text-[#e9edef] leading-[1.4] mt-[4px]">
                            💸 Gastos: <span className="font-semibold">$45.000</span>
                            <br />
                            💰 Ingresos: <span className="font-semibold">$0</span>
                          </p>
                          <p className="text-[12px] text-[#8696a0] leading-[1.4] mt-[3px]">
                            ───────────
                          </p>
                          <p className="text-[13.5px] text-[#e9edef] leading-[1.4]">
                            📉 Balance: <span className="font-semibold text-[#ff6b6b]">-$45.000</span>
                          </p>
                          <span className="absolute bottom-[3px] right-[8px] text-[10.5px] text-[#8696a0] tabular-nums">
                            10:32
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Input bar */}
                  <div className="bg-[#1f2c34] px-[6px] py-[6px] flex items-end gap-[6px]">
                    <div className="flex-1 bg-[#2a3942] rounded-[22px] min-h-[38px] px-[12px] py-[8px] flex items-center gap-[10px]">
                      {/* Emoji */}
                      <svg className="w-[22px] h-[22px] text-[#8696a0] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zm0-18c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8zm-3.5 6c.83 0 1.5-.67 1.5-1.5S9.33 7 8.5 7 7 7.67 7 8.5 7.67 10 8.5 10zm7 0c.83 0 1.5-.67 1.5-1.5S16.33 7 15.5 7 14 7.67 14 8.5s.67 1.5 1.5 1.5zm-3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                      </svg>
                      <span className="flex-1 text-[#8696a0] text-[15px]">Mensaje</span>
                      {/* Attach */}
                      <svg className="w-[22px] h-[22px] text-[#8696a0] flex-shrink-0 rotate-[-45deg]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16.5 6v11.5a4 4 0 01-8 0V5a2.5 2.5 0 015 0v10.5a1 1 0 01-2 0V6H10v9.5a2.5 2.5 0 005 0V5a4 4 0 00-8 0v12.5a5.5 5.5 0 0011 0V6h-1.5z"/>
                      </svg>
                      {/* Camera */}
                      <svg className="w-[22px] h-[22px] text-[#8696a0] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 5h-3.17L15 3H9L7.17 5H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V7a2 2 0 00-2-2zm-8 13a5 5 0 110-10 5 5 0 010 10zm0-8a3 3 0 100 6 3 3 0 000-6z"/>
                      </svg>
                    </div>
                    {/* Mic button */}
                    <button
                      className="w-[38px] h-[38px] rounded-full bg-[#00a884] flex items-center justify-center flex-shrink-0 shadow-sm"
                      aria-label="Grabar nota de voz"
                    >
                      <svg className="w-[20px] h-[20px] text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 15a3 3 0 003-3V5a3 3 0 10-6 0v7a3 3 0 003 3zm5-3a5 5 0 01-10 0H5a7 7 0 006 6.92V22h2v-3.08A7 7 0 0019 12h-2z"/>
                      </svg>
                    </button>
                  </div>

                  {/* Home indicator */}
                  <div className="flex justify-center py-[6px] bg-[#1f2c34]">
                    <div className="w-[110px] h-[4px] bg-white/75 rounded-full" />
                  </div>
                </div>

                {/* Dynamic Island — sits over the screen */}
                <div
                  className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[96px] h-[30px] bg-black rounded-full z-30"
                  style={{
                    boxShadow: "inset 0 0 0 0.5px rgba(255,255,255,0.05), 0 0 16px rgba(0,0,0,0.8)",
                  }}
                >
                  {/* Face ID / camera cluster */}
                  <div className="absolute top-1/2 right-[8px] -translate-y-1/2 w-[14px] h-[14px] rounded-full">
                    <div className="absolute inset-0 rounded-full bg-[#0a0a12]" />
                    <div className="absolute inset-[2px] rounded-full bg-[#05050a] ring-[0.5px] ring-white/5" />
                    <div className="absolute top-[2px] right-[2px] w-[3px] h-[3px] rounded-full bg-sky-400/30 blur-[0.5px]" />
                  </div>
                  {/* Sensor dot */}
                  <div className="absolute top-1/2 left-[12px] -translate-y-1/2 w-[6px] h-[6px] rounded-full bg-[#0a0a12]">
                    <div className="absolute inset-[1px] rounded-full bg-[#05050a]" />
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
                    Respuesta en &lt;10 seg
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
