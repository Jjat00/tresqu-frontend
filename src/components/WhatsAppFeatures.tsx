import {
  MessageSquare,
  Mic,
  Camera,
  CheckCheck,
  ChevronRight,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// ── Mini mockups (estáticos, transparentes) ────────────────────────────────
const Bubble = ({
  side,
  children,
}: {
  side: "left" | "right";
  children: React.ReactNode;
}) => (
  <div className={`flex ${side === "right" ? "justify-end" : "justify-start"}`}>
    <div
      className={`text-white text-[11px] leading-snug rounded-md px-2.5 py-1.5 max-w-[88%] border ${
        side === "right"
          ? "bg-[#00FF7F]/[0.08] border-[#00FF7F]/20"
          : "bg-white/[0.04] border-white/10"
      }`}
    >
      {children}
    </div>
  </div>
);

const TextMockup = () => (
  <div className="flex flex-col gap-1.5">
    <Bubble side="right">
      <p>anoche pagué 20k de cena</p>
    </Bubble>
    <Bubble side="left">
      <p className="text-[#00FF7F] font-semibold">Registrado</p>
      <p className="text-zinc-300 mt-0.5">
        <span className="text-white">$20,000 COP</span>
        {" · "}
        <span className="text-[#00FF7F]/90">Restaurantes</span>
      </p>
    </Bubble>
  </div>
);

const Waveform = () => {
  const heights = [3, 6, 9, 5, 11, 7, 10, 5, 9, 4, 8, 6, 4, 9, 5];
  return (
    <div className="flex items-center gap-[2px]" style={{ height: 20 }}>
      {heights.map((h, i) => (
        <div
          key={i}
          className="rounded-full bg-[#00FF7F]"
          style={{ width: 2, height: h }}
        />
      ))}
    </div>
  );
};

const VoiceMockup = () => (
  <div className="flex flex-col gap-1.5">
    <Bubble side="right">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-sm bg-[#00FF7F]/10 border border-[#00FF7F]/25 flex items-center justify-center flex-shrink-0">
          <Mic className="w-3 h-3 text-[#00FF7F]" />
        </div>
        <Waveform />
      </div>
    </Bubble>
    <Bubble side="left">
      <p className="text-zinc-300">"Almuerzo con el equipo"</p>
      <p className="text-[#00FF7F] font-semibold mt-0.5">
        Alimentación · $18,000
      </p>
    </Bubble>
  </div>
);

const ImageMockup = () => (
  <div className="flex flex-col gap-1.5">
    <Bubble side="right">
      <div className="flex items-center gap-2">
        <div className="w-9 h-7 rounded-sm bg-neutral-100 text-zinc-700 flex items-center justify-center text-[7px] font-bold uppercase">
          Recibo
        </div>
        <span className="text-[10px] text-white/70">Foto del recibo</span>
      </div>
    </Bubble>
    <Bubble side="left">
      <p className="text-white">Tienda Nube</p>
      <p className="text-[#00FF7F] font-semibold mt-0.5">Mercado · $47.500</p>
    </Bubble>
  </div>
);

const InvestmentsMockup = () => (
  <div className="flex flex-col gap-2">
    <Bubble side="right">
      <p>¿Cuánto tengo libre para invertir en Wallbit?</p>
    </Bubble>

    <div className="bg-white/[0.04] border border-white/10 rounded-md px-3 py-2.5">
      <div className="flex items-center gap-2 mb-2.5">
        <LineChart className="w-3.5 h-3.5 text-wallbit" />
        <p className="text-wallbit text-[11px] font-semibold">
          Tu cuenta Wallbit
        </p>
      </div>

      <div className="space-y-1.5 text-[10px]">
        <div className="flex items-center justify-between">
          <span className="text-zinc-400">Efectivo disponible</span>
          <span className="text-white font-medium">$1,250.00 USD</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-zinc-400">En cuenta de inversión</span>
          <span className="text-white font-medium">$3,480.00 USD</span>
        </div>
      </div>

      <div className="border-t border-white/5 mt-2.5 pt-2">
        <p className="text-[10px] text-zinc-500 mb-1.5">Acciones</p>
        <div className="space-y-1.5 text-[10px]">
          <div className="flex items-center justify-between">
            <span className="text-zinc-300">META</span>
            <span className="text-[#00FF7F] inline-flex items-center gap-0.5">
              <ArrowUpRight className="w-2.5 h-2.5" />
              +4.7%
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-300">NVDA</span>
            <span className="text-red-400 inline-flex items-center gap-0.5">
              <ArrowDownRight className="w-2.5 h-2.5" />
              -1.2%
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 mt-2.5 pt-2">
        <p className="text-[10px] text-zinc-400 leading-relaxed">
          Dime si quieres comprar, vender o mover fondos y lo gestionamos. 🚀
        </p>
      </div>
    </div>
  </div>
);

// ── Feature definitions ────────────────────────────────────────────────────
type Feature = {
  Icon: typeof MessageSquare;
  title: string;
  description: string;
  highlight: string;
  Mockup: () => React.JSX.Element;
  brand?: "wallbit";
};

const features: Feature[] = [
  {
    Icon: LineChart,
    title: "Consulta tus inversiones",
    description:
      "Pregúntale a Tresqu por tu cuenta Wallbit: cuánto tienes libre, tus acciones y cómo van. Y cuando quieras, compra, vende o mueve fondos desde el chat.",
    highlight: "Inversiones",
    Mockup: InvestmentsMockup,
    brand: "wallbit",
  },
  {
    Icon: MessageSquare,
    title: "Registra por texto",
    description:
      "Escribe como hablas. Sin formatos ni comandos. Tresqu entiende en lenguaje natural y categoriza al instante.",
    highlight: "Modo texto",
    Mockup: TextMockup,
  },
  {
    Icon: Mic,
    title: "Registra por voz",
    description:
      "Manda un audio de WhatsApp. Tresqu transcribe, entiende y registra el movimiento en segundos.",
    highlight: "Modo voz",
    Mockup: VoiceMockup,
  },
  {
    Icon: Camera,
    title: "Registra por foto",
    description:
      "Toma una foto al recibo o factura. Tresqu extrae monto, comercio y categoría sin que tipees nada.",
    highlight: "Modo foto",
    Mockup: ImageMockup,
  },
];

// ── Section ────────────────────────────────────────────────────────────────
const WhatsAppFeatures = () => {
  return (
    <section
      className="relative section-padding overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0a0a0a 0%, #0d0d0d 50%, #0a0a0a 100%)",
      }}
    >
      <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header — patrón de Benefits */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 border border-[#00FF7F]/25 rounded-sm text-[#00FF7F] text-xs uppercase tracking-wider font-medium mb-6">
              <WhatsAppIcon className="w-3 h-3" />
              Disponible en WhatsApp
            </span>
            <h2 className="trii-title text-3xl sm:text-4xl md:text-5xl text-white">
              REGISTRA COMO{" "}
              <span className="text-[#00FF7F] italic">PREFIERAS</span>,
              <br />
              CONSULTA LO QUE QUIERAS.
            </h2>
          </div>
          <div className="lg:pt-16">
            <p className="text-zinc-400 text-lg leading-relaxed">
              Texto, voz o foto para registrar tus movimientos. Y cuando
              quieras, pregúntale a Tresqu por tus inversiones — todo desde
              WhatsApp, sin abrir nada más.
            </p>
          </div>
        </div>

        {/* Bento Grid — patrón de Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6">
          {features.map((feature, index) => {
            const { Icon, title, description, highlight, Mockup, brand } =
              feature;
            const isLarge = index === 0;
            const gridClass = isLarge
              ? "md:col-span-2 md:row-span-2"
              : "md:col-span-2";
            const accent = brand === "wallbit" ? "#0D99FF" : "#00FF7F";

            return (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-md bg-white/[0.02] border border-white/[0.06] p-6 lg:p-8 transition-colors duration-200 hover:border-white/10 ${gridClass}`}
              >
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div
                      className="w-11 h-11 rounded-md bg-white/[0.04] border border-white/10 flex items-center justify-center"
                      style={{ color: accent }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 border border-white/10 rounded-sm">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: accent }}
                      />
                      <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wide">
                        {highlight}
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3
                      className={`${
                        isLarge ? "text-2xl" : "text-xl"
                      } font-bold text-white mb-3 font-display tracking-tight`}
                    >
                      {title}
                    </h3>
                    <p
                      className={`text-zinc-400 leading-relaxed ${
                        isLarge ? "text-base" : "text-sm"
                      }`}
                    >
                      {description}
                    </p>
                  </div>

                  <div className="mt-auto">
                    <Mockup />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 md:mt-20 text-center">
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
