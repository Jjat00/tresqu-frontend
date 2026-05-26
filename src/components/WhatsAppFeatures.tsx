import { useState, useEffect } from "react";
import { MessageSquare, Mic, Camera, CheckCheck, Zap, ChevronRight } from "lucide-react";

// ── WhatsApp SVG icon ────────────────────────────────────────────────────────
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// ── Shared primitives ────────────────────────────────────────────────────────
const TypingDots = () => (
  <div className="flex items-center gap-[3px] px-0.5 py-0.5">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="inline-block w-1.5 h-1.5 rounded-full bg-zinc-400"
        style={{
          animation: "wa-typing 1.2s ease-in-out infinite",
          animationDelay: `${i * 0.2}s`,
        }}
      />
    ))}
  </div>
);

interface BubbleProps {
  side: "left" | "right";
  visible: boolean;
  children: React.ReactNode;
}

const Bubble = ({ side, visible, children }: BubbleProps) => (
  <div
    className={`flex ${side === "right" ? "justify-end" : "justify-start"}`}
    style={{
      transition: "opacity 0.45s ease, transform 0.45s ease",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(10px)",
      pointerEvents: "none",
    }}
  >
    <div
      className={`text-white text-[11px] leading-relaxed rounded-md px-3 py-2 max-w-[82%] border ${
        side === "right"
          ? "bg-[#00FF7F]/[0.08] border-[#00FF7F]/20"
          : "bg-white/[0.04] border-white/10"
      }`}
    >
      {children}
    </div>
  </div>
);

const BotTyping = ({ visible }: { visible: boolean }) => (
  <div
    className="flex justify-start"
    style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
  >
    <div className="bg-white/[0.04] border border-white/10 rounded-md px-3 py-2">
      <TypingDots />
    </div>
  </div>
);

// ── TEXT animation ───────────────────────────────────────────────────────────
const TextAnimation = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    let alive = true;

    const cycle = () => {
      if (!alive) return;
      setPhase(0);
      timers.push(setTimeout(() => alive && setPhase(1), 700));
      timers.push(setTimeout(() => alive && setPhase(2), 2000));
      timers.push(setTimeout(() => alive && setPhase(3), 3400));
      timers.push(setTimeout(() => alive && cycle(), 7200));
    };

    cycle();
    return () => {
      alive = false;
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="flex flex-col justify-end gap-2 h-full px-3 py-3">
      <Bubble side="right" visible={phase >= 1}>
        <p>Gasté 25 mil en el gym 🏋️</p>
        <div className="flex items-center justify-end gap-1 mt-1">
          <span className="text-[9px] text-white/40">12:34</span>
          <CheckCheck className="w-3 h-3 text-[#00FF7F]" />
        </div>
      </Bubble>

      <BotTyping visible={phase === 2} />

      <Bubble side="left" visible={phase >= 3}>
        <p className="text-[#00FF7F] font-semibold text-[11px]">✅ ¡Registrado!</p>
        <p className="text-zinc-300 mt-0.5">
          <span className="text-white font-medium">$25,000</span>
          {" · "}
          <span className="text-[#00FF7F]/90">Deporte</span>
        </p>
        <span className="text-[9px] text-white/40 mt-1 block">12:34</span>
      </Bubble>
    </div>
  );
};

// ── VOICE animation ──────────────────────────────────────────────────────────
const Waveform = ({ active }: { active: boolean }) => {
  const heights = [3, 6, 9, 5, 11, 7, 10, 5, 9, 4, 8, 6, 4, 9, 5];
  return (
    <div className="flex items-center gap-[2px]" style={{ height: 22 }}>
      {heights.map((h, i) => (
        <div
          key={i}
          className="rounded-full bg-[#00FF7F]"
          style={{
            width: 2,
            height: active ? h * 2 : h,
            transformOrigin: "center",
            transition: "height 0.1s ease",
            animation: active
              ? `wa-wave ${0.45 + (i % 4) * 0.1}s ease-in-out infinite alternate`
              : "none",
            animationDelay: `${i * 45}ms`,
          }}
        />
      ))}
    </div>
  );
};

const VoiceAnimation = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    let alive = true;

    const cycle = () => {
      if (!alive) return;
      setPhase(0);
      timers.push(setTimeout(() => alive && setPhase(1), 600));
      timers.push(setTimeout(() => alive && setPhase(2), 2300));
      timers.push(setTimeout(() => alive && setPhase(3), 3900));
      timers.push(setTimeout(() => alive && setPhase(4), 5300));
      timers.push(setTimeout(() => alive && cycle(), 9000));
    };

    cycle();
    return () => {
      alive = false;
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="flex flex-col justify-end gap-2 h-full px-3 py-3">
      {/* Recording indicator */}
      <div
        className="flex justify-end"
        style={{ opacity: phase === 1 ? 1 : 0, transition: "opacity 0.3s ease" }}
      >
        <div className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/25 rounded-md px-3 py-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full bg-red-500"
            style={{ animation: "wa-pulse 0.9s ease-in-out infinite" }}
          />
          <Mic className="w-3 h-3 text-red-400" />
          <span className="text-[10px] text-red-300 font-medium">Grabando… 0:04</span>
        </div>
      </div>

      {/* Voice bubble */}
      <Bubble side="right" visible={phase >= 2}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-sm bg-[#00FF7F]/10 border border-[#00FF7F]/25 flex items-center justify-center flex-shrink-0">
            <Mic className="w-3.5 h-3.5 text-[#00FF7F]" />
          </div>
          <div>
            <Waveform active={phase === 2} />
            <span className="text-[9px] text-white/40 mt-0.5 block">0:05</span>
          </div>
        </div>
        <div className="flex items-center justify-end gap-1 mt-1.5">
          <span className="text-[9px] text-white/40">14:22</span>
          <CheckCheck className="w-3 h-3 text-[#00FF7F]" />
        </div>
      </Bubble>

      <BotTyping visible={phase === 3} />

      <Bubble side="left" visible={phase >= 4}>
        <p className="text-[10px] text-zinc-500 mb-0.5">🎤 Escuché:</p>
        <p className="text-zinc-200">"Almuerzo con el equipo"</p>
        <p className="text-[#00FF7F] font-semibold mt-1">✅ Alimentación · $18,000</p>
        <span className="text-[9px] text-white/40 mt-1 block">14:22</span>
      </Bubble>
    </div>
  );
};

// ── IMAGE animation ──────────────────────────────────────────────────────────
const Receipt = ({ scanning }: { scanning: boolean }) => (
  <div className="relative w-[108px] h-[76px] rounded-sm overflow-hidden border border-white/10 flex-shrink-0">
    <div className="absolute inset-0 bg-neutral-100 text-zinc-700 px-2 py-1.5">
      <p className="text-[6px] font-bold text-center text-zinc-600 mb-0.5 uppercase tracking-wide">
        Tienda Nube
      </p>
      <div className="h-px bg-zinc-300 mb-1" />
      <div className="text-[5.5px] space-y-px text-zinc-500">
        <div className="flex justify-between"><span>Leche x2</span><span>$4.200</span></div>
        <div className="flex justify-between"><span>Pan integral</span><span>$3.500</span></div>
        <div className="flex justify-between"><span>Arroz 1kg</span><span>$7.800</span></div>
        <div className="flex justify-between"><span>Aceite 500ml</span><span>$9.200</span></div>
      </div>
      <div className="h-px bg-zinc-300 my-1" />
      <div className="text-[6.5px] font-bold flex justify-between text-zinc-700">
        <span>TOTAL</span><span>$47.500</span>
      </div>
    </div>

    {scanning && (
      <>
        {/* Green tint */}
        <div className="absolute inset-0 bg-[#00FF7F]/8 pointer-events-none" />
        {/* Scanner line */}
        <div
          className="absolute left-0 right-0 h-px bg-[#00FF7F]"
          style={{
            boxShadow: "0 0 6px 2px rgba(0,255,127,0.7)",
            animation: "wa-scan 1.1s ease-in-out infinite",
          }}
        />
        {/* Corner brackets */}
        <div className="absolute top-1 left-1 w-3 h-3 border-t-[1.5px] border-l-[1.5px] border-[#00FF7F] rounded-tl" />
        <div className="absolute top-1 right-1 w-3 h-3 border-t-[1.5px] border-r-[1.5px] border-[#00FF7F] rounded-tr" />
        <div className="absolute bottom-1 left-1 w-3 h-3 border-b-[1.5px] border-l-[1.5px] border-[#00FF7F] rounded-bl" />
        <div className="absolute bottom-1 right-1 w-3 h-3 border-b-[1.5px] border-r-[1.5px] border-[#00FF7F] rounded-br" />
      </>
    )}
  </div>
);

const ImageAnimation = () => {
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    let alive = true;
    let progressRaf: ReturnType<typeof setTimeout>;

    const animateProgress = () => {
      let p = 0;
      const tick = () => {
        p += 6;
        if (p <= 100 && alive) {
          setProgress(p);
          progressRaf = setTimeout(tick, 35);
        }
      };
      tick();
    };

    const cycle = () => {
      if (!alive) return;
      setPhase(0);
      setProgress(0);

      timers.push(
        setTimeout(() => {
          if (!alive) return;
          setPhase(1);
          animateProgress();
        }, 700)
      );
      timers.push(setTimeout(() => alive && setPhase(2), 2200));
      timers.push(setTimeout(() => alive && setPhase(3), 3800));
      timers.push(setTimeout(() => alive && setPhase(4), 5400));
      timers.push(setTimeout(() => alive && cycle(), 9500));
    };

    cycle();
    return () => {
      alive = false;
      timers.forEach(clearTimeout);
      clearTimeout(progressRaf);
    };
  }, []);

  return (
    <div className="flex flex-col justify-end gap-2 h-full px-3 py-3">
      {/* Upload progress */}
      <div
        className="flex justify-end"
        style={{ opacity: phase === 1 ? 1 : 0, transition: "opacity 0.3s ease" }}
      >
        <div className="bg-[#00FF7F]/[0.08] border border-[#00FF7F]/20 rounded-md px-3 py-2 min-w-[118px]">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Camera className="w-3 h-3 text-[#00FF7F]" />
            <span className="text-[10px] text-zinc-300">Enviando foto…</span>
          </div>
          <div className="h-1 bg-white/10 rounded-sm overflow-hidden">
            <div
              className="h-full bg-[#00FF7F] transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Image bubble */}
      <Bubble side="right" visible={phase >= 2}>
        <div className="flex flex-col gap-1.5">
          <Receipt scanning={phase === 2} />
          <p className="text-[9px] text-white/60">Foto del recibo 🧾</p>
          <div className="flex items-center justify-end gap-1">
            <span className="text-[9px] text-white/40">09:15</span>
            <CheckCheck className="w-3 h-3 text-[#00FF7F]" />
          </div>
        </div>
      </Bubble>

      {/* Bot scanning */}
      <div
        className="flex justify-start"
        style={{ opacity: phase === 3 ? 1 : 0, transition: "opacity 0.3s ease" }}
      >
        <div className="bg-white/[0.04] border border-white/10 rounded-md px-3 py-2">
          <div className="flex items-center gap-1.5">
            <Zap
              className="w-3 h-3 text-[#00FF7F]"
              style={{ animation: "wa-pulse 0.6s ease-in-out infinite" }}
            />
            <span className="text-[10px] text-zinc-400">Analizando recibo…</span>
          </div>
        </div>
      </div>

      <Bubble side="left" visible={phase >= 4}>
        <p className="text-[10px] text-zinc-500 mb-0.5">🧾 Recibo detectado:</p>
        <p className="text-white font-medium">Tienda Nube</p>
        <p className="text-[#00FF7F] font-semibold mt-1">✅ Mercado · $47.500</p>
        <span className="text-[9px] text-white/40 mt-1 block">09:15</span>
      </Bubble>
    </div>
  );
};

// ── Conversation container — no frame, just bubbles floating ──────────────
const ChatWindow = ({ children }: { children: React.ReactNode }) => (
  <div className="h-56 relative">{children}</div>
);

// ── Feature definitions ──────────────────────────────────────────────────────
const features: {
  Icon: typeof MessageSquare;
  eyebrow: string;
  title: string;
  highlight: string;
  tagline: string;
  description: string;
  bullets: string[];
  Animation: () => React.JSX.Element;
  chatSide: "left" | "right";
}[] = [
  {
    Icon: MessageSquare,
    eyebrow: "Modo texto",
    title: "Registra por",
    highlight: "texto",
    tagline: "Escribe como hablas.",
    description:
      "Sin formatos ni comandos. Escribe en lenguaje natural y Tresqu entiende al instante qué registrar.",
    bullets: [
      "Lenguaje natural en español",
      "Categoriza automáticamente",
      "Confirmación en segundos",
    ],
    Animation: TextAnimation,
    chatSide: "left",
  },
  {
    Icon: Mic,
    eyebrow: "Modo voz",
    title: "Registra por",
    highlight: "voz",
    tagline: "Habla, no escribas.",
    description:
      "Manda un audio de WhatsApp y nuestra IA transcribe y registra el movimiento en segundos.",
    bullets: [
      "Transcripción automática",
      "Ideal cuando estás de afán",
      "Soporta varios acentos",
    ],
    Animation: VoiceAnimation,
    chatSide: "right",
  },
  {
    Icon: Camera,
    eyebrow: "Modo foto",
    title: "Registra por",
    highlight: "fotos",
    tagline: "Foto y listo.",
    description:
      "Toma una foto de tu recibo o factura y deja que Tresqu extraiga todos los datos automáticamente.",
    bullets: [
      "Lee recibos y facturas",
      "Detecta monto y comercio",
      "Adiós a escribir todo a mano",
    ],
    Animation: ImageAnimation,
    chatSide: "left",
  },
];

// ── Main section ─────────────────────────────────────────────────────────────
const WhatsAppFeatures = () => {
  return (
    <section className="relative section-padding bg-[#0a0a0a]">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-white/5" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20 md:mb-28">
          <span className="inline-flex items-center gap-2 px-3 py-1 border border-[#00FF7F]/25 rounded-sm text-[#00FF7F] text-xs uppercase tracking-wider font-medium mb-6">
            <WhatsAppIcon className="w-3 h-3" />
            Disponible en WhatsApp
          </span>
          <h2 className="trii-title text-3xl sm:text-4xl md:text-5xl text-white mb-6">
            REGISTRA COMO
            <br />
            <span className="text-[#00FF7F] italic">PREFIERAS</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto">
            Texto, voz o foto — Tresqu entiende todo directamente desde WhatsApp
          </p>
        </div>

        {/* Vertical zig-zag feature rows */}
        <div className="space-y-28 md:space-y-40">
          {features.map((feature, index) => {
            const { Icon, eyebrow, title, highlight, tagline, description, bullets, Animation, chatSide } = feature;
            const chatLeft = chatSide === "left";

            return (
              <div
                key={index}
                className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center"
              >
                {/* Chat side */}
                <div
                  className={`lg:col-span-5 ${
                    chatLeft ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="relative max-w-[340px] mx-auto">
                    <ChatWindow>
                      <Animation />
                    </ChatWindow>
                  </div>
                </div>

                {/* Text side */}
                <div
                  className={`lg:col-span-7 ${
                    chatLeft ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div
                    className={`max-w-xl ${
                      chatLeft ? "lg:ml-0" : "lg:ml-auto"
                    }`}
                  >
                    {/* Eyebrow */}
                    <div className="inline-flex items-center gap-2 mb-5">
                      <Icon className="w-3.5 h-3.5 text-[#00FF7F]" />
                      <span className="text-[11px] uppercase tracking-[0.18em] text-[#00FF7F] font-medium">
                        {eyebrow}
                      </span>
                    </div>

                    {/* Big title */}
                    <h3 className="font-display font-bold text-white tracking-tight leading-[1.05] text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] mb-5">
                      {title}{" "}
                      <span className="text-[#00FF7F] italic">{highlight}</span>
                    </h3>

                    {/* Tagline */}
                    <p className="text-xl md:text-2xl text-white/90 font-light mb-4 leading-tight">
                      {tagline}
                    </p>

                    {/* Description */}
                    <p className="text-zinc-400 text-base leading-relaxed mb-6">
                      {description}
                    </p>

                    {/* Bullets */}
                    <ul className="space-y-2.5">
                      {bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-center gap-3 text-zinc-300 text-sm"
                        >
                          <CheckCheck className="w-4 h-4 text-[#00FF7F] flex-shrink-0" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 md:mt-32 text-center">
          <p className="text-zinc-600 mb-6 text-sm">
            Sin descargas · Sin configuraciones · Empieza en 30 segundos
          </p>
          <button
            onClick={() =>
              window.open(
                "https://wa.me/573116534337?text=Hola%20Tresqu%2C%20quiero%20empezar",
                "_blank"
              )
            }
            className="inline-flex items-center gap-2.5 px-7 py-3 bg-[#00FF7F] text-black font-semibold rounded-md hover:bg-white transition-colors duration-200"
          >
            <WhatsAppIcon className="w-4 h-4" />
            Probar en WhatsApp
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppFeatures;
