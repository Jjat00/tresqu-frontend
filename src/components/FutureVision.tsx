import { Target, Banknote, Users, ArrowRight } from "lucide-react";

const futureFeatures = [
  {
    icon: <Target className="w-6 h-6" />,
    title: "Simulador de metas",
    description:
      "Planea viajes, compras o ahorro con proyecciones basadas en tu comportamiento real.",
    status: "Próximamente",
  },
  {
    icon: <Banknote className="w-6 h-6" />,
    title: "Pagos por chat",
    description:
      "Transferencias bancarias y pagos a terceros directo desde la conversación, sin abrir otra app.",
    status: "En desarrollo",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Cuentas compartidas",
    description:
      "Gastos de pareja, familia o equipo en un solo agente. Quién pagó, quién debe, cuánto falta.",
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

      <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Content */}
          <div>
            <span className="inline-block px-3 py-1 border border-[#00FF7F]/25 rounded-sm text-[#00FF7F] text-xs uppercase tracking-wider font-medium mb-6">
              Roadmap
            </span>
            <h2 className="trii-title text-3xl sm:text-4xl md:text-5xl text-white mb-6">
              EL FUTURO DE
              <br />
              <span className="text-[#00FF7F] italic">TUS FINANZAS</span>
            </h2>
            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
              Esto apenas comienza. Estamos construyendo el agente financiero
              más completo, todo desde tu app de mensajería favorita.
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
                className="group relative bg-white/[0.02] border border-white/[0.06] p-6 rounded-md flex items-start gap-5 transition-colors duration-200 hover:border-white/10"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-md bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#00FF7F] flex-shrink-0">
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
          <div className="inline-block px-6 py-4 bg-white/[0.02] border border-white/[0.06] rounded-md">
            <p className="text-zinc-400 text-[15px] font-medium italic tracking-wide">
              "Todo usando lenguaje natural, desde tu app de mensajería favorita"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FutureVision;
