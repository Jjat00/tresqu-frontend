import {
  Smartphone,
  MessageSquare,
  Settings,
  Sparkles,
  Shield,
  Globe,
} from "lucide-react";

const benefits = [
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Sin formularios",
    description:
      "Le escribes al agente como a una persona. No hay campos que llenar ni dropdowns que aprender.",
    highlight: "vs apps tradicionales",
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Sin descargas",
    description:
      "WhatsApp, Telegram, Gmail o web. Tresqu vive en los canales que ya usas.",
    highlight: "0 apps nuevas",
  },
  {
    icon: <Settings className="w-6 h-6" />,
    title: "Sin configuración",
    description:
      "El agente aprende de tus mensajes. No tienes que armar categorías, reglas ni dashboards.",
    highlight: "Cero setup",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Sin curva de aprendizaje",
    description:
      "Si sabes mandar un audio o una foto, ya sabes usar Tresqu. El agente hace el resto.",
    highlight: "Plug & talk",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Datos seguros",
    description:
      "Tus tokens están cifrados con encriptación militar Fernet en cada integración con bancos y plataformas externas.",
    highlight: "Encriptación Fernet",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Multi-moneda",
    description:
      "Maneja COP, USD, EUR y otras monedas principales. Conversiones y saldos en vivo.",
    highlight: "10+ monedas",
  },
];

const Benefits = () => {
  return (
    <section
      id="beneficios"
      className="relative section-padding overflow-hidden scroll-mt-24"
      style={{
        background:
          "linear-gradient(180deg, #0a0a0a 0%, #0d0d0d 50%, #0a0a0a 100%)",
      }}
    >
      <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16">
          <div>
            <span className="section-label mb-6">06 · Beneficios</span>
            <h2 className="trii-title text-3xl sm:text-4xl md:text-5xl text-white">
              POR QUÉ UN <span className="holo-text italic">AGENTE</span>,
              <br />
              NO UNA APP.
            </h2>
          </div>
          <div className="lg:pt-16">
            <p className="text-zinc-400 text-lg leading-relaxed">
              Las apps de finanzas te piden cargar bancos, llenar formularios y
              aprender menús. Un agente te entiende, ejecuta y aprende — sin
              que tú hagas nada extra.
            </p>
          </div>
        </div>

        {/* Benefits Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            // Asymmetric Bento Grid logic
            const isLarge = index === 0 || index === 3;
            const gridClass = isLarge ? "md:col-span-2 md:row-span-2" : "md:col-span-2";
            
            return (
              <div
                key={index}
                className={`group holo-card holo-sheen hud-corners overflow-hidden p-6 lg:p-8 ${gridClass}`}
              >
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    {/* Icon */}
                    <div className="w-11 h-11 rounded-md bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#00FF7F] transition-all duration-300 group-hover:border-[#00FF7F]/40 group-hover:shadow-[0_0_20px_-6px_rgba(0,255,127,0.6)]">
                      {benefit.icon}
                    </div>

                    {/* Highlight Badge */}
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 border border-white/10 rounded-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00FF7F]" />
                      <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wide">
                        {benefit.highlight}
                      </span>
                    </div>
                  </div>

                  <div className={isLarge ? "mt-auto pt-12" : "mt-auto pt-6"}>
                    <h3 className={`${isLarge ? "text-2xl" : "text-xl"} font-bold text-white mb-3 font-display tracking-tight`}>
                      {benefit.title}
                    </h3>
                    <p className={`text-zinc-400 leading-relaxed ${isLarge ? "text-base" : "text-sm"}`}>
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
