import { Bot, BellRing, Sliders, ArrowRight } from "lucide-react";

const futureFeatures = [
  {
    icon: <Bot className="w-6 h-6" />,
    title: "Agente que invierte por ti",
    description:
      "Le delegas el aporte mensual y el agente decide qué comprar dentro de los límites que tú definas. Tú confirmas, él ejecuta.",
    status: "En desarrollo",
  },
  {
    icon: <BellRing className="w-6 h-6" />,
    title: "Alertas que te buscan a ti",
    description:
      "El analista ya responde cuando le preguntas por un activo. El siguiente paso: que te avise él solo cuando algo de tu portafolio lo amerite, no por noticias genéricas.",
    status: "Próximamente",
  },
  {
    icon: <Sliders className="w-6 h-6" />,
    title: "Optimización de portafolio",
    description:
      "Reequilibrios sugeridos cruzando tu portafolio Wallbit con tu colchón de ahorro y tus metas en Tresqu.",
    status: "Próximamente",
  },
];

const FutureVision = () => {
  return (
    <section
      id="futuro"
      className="relative section-padding overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0a0a0a 0%, #0f0f0f 50%, #0a0a0a 100%)",
      }}
    >
      {/* Decorative */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      <div className="absolute inset-0 pointer-events-none section-aura-blue" />

      <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Content */}
          <div>
            <span className="section-label mb-6">07 · Roadmap</span>
            <h2 className="trii-title text-3xl sm:text-4xl md:text-5xl text-white mb-6">
              ESTO ES SOLO
              <br />
              EL <span className="holo-text italic">PRINCIPIO</span>.
            </h2>
            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
              Hoy el equipo registra, analiza e invierte contigo —siempre con tu
              confirmación—. Lo que viene: que proponga por su cuenta, te avise
              cuando algo de tu dinero lo amerite y optimice tu portafolio. Tú
              sigues teniendo la última palabra.
            </p>

            {/* CTA */}
            <button
              onClick={() =>
                window.open(
                  "https://wa.me/573116534337?text=Quiero%20saber%20más",
                  "_blank"
                )
              }
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.03] border border-white/10 text-white font-semibold rounded-md hover:border-[#00FF7F]/40 hover:bg-white/[0.06] transition-colors duration-200 group"
            >
              Mantenerme informado
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right - Features */}
          <div className="space-y-4">
            {futureFeatures.map((feature, index) => (
              <div
                key={index}
                className="group holo-card holo-sheen p-6 flex items-start gap-5"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-md bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#00FF7F] flex-shrink-0 transition-all duration-300 group-hover:border-[#00FF7F]/40 group-hover:shadow-[0_0_20px_-6px_rgba(0,255,127,0.6)]">
                  {feature.icon}
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="text-xl font-bold text-white font-display tracking-tight">
                      {feature.title}
                    </h3>
                    <span className="px-2 py-0.5 bg-white/[0.04] border border-white/10 text-zinc-400 text-[10px] font-semibold uppercase tracking-wider rounded-sm">
                      {feature.status}
                    </span>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed">{feature.description}</p>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 mt-2">
                  <ArrowRight className="w-5 h-5 text-zinc-700 group-hover:text-[#00FF7F] transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-16 text-center">
          <div className="holo-card hud-corners inline-block px-8 py-5">
            <p className="text-[15px] font-medium italic tracking-wide holo-text">
              "El primer agente financiero contextual de LATAM."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FutureVision;
