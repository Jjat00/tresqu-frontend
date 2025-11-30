import { TrendingUp, CreditCard, Target, ArrowRight } from "lucide-react";

const futureFeatures = [
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Inversión inteligente",
    description:
      "Recibe recomendaciones personalizadas según tu perfil. Desde CDTs hasta ETFs.",
    status: "Próximamente",
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: "Pagos integrados",
    description:
      "Conecta con Stripe, PayPal, Nequi y más. Paga directo desde el chat.",
    status: "En desarrollo",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Simulador de metas",
    description:
      "Planea viajes, compras o ahorro con simulaciones basadas en tu comportamiento real.",
    status: "Próximamente",
  },
];

const FutureVision = () => {
  return (
    <section
      id="futuro"
      className="relative py-20 md:py-32 overflow-hidden"
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
            <span className="inline-block px-4 py-1.5 bg-[#00FF7F]/10 border border-[#00FF7F]/20 rounded-full text-[#00FF7F] text-sm font-medium mb-6">
              Roadmap
            </span>
            <h2 className="trii-title text-3xl sm:text-4xl md:text-5xl text-white mb-6">
              EL FUTURO DE
              <br />
              <span className="text-[#00FF7F] italic">TUS FINANZAS</span>
            </h2>
            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
              Esto apenas comienza. Estamos construyendo el asistente financiero
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
              className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-800 text-white font-medium rounded-full hover:border-[#00FF7F]/30 hover:bg-zinc-800 transition-all duration-300"
            >
              Mantenerme informado
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right - Features */}
          <div className="space-y-4">
            {futureFeatures.map((feature, index) => (
              <div
                key={index}
                className="group trii-card p-6 flex items-start gap-5 hover:border-[#00FF7F]/20 transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-[#00FF7F]/10 flex items-center justify-center text-[#00FF7F] flex-shrink-0 group-hover:bg-[#00FF7F]/20 transition-colors">
                  {feature.icon}
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-white font-display">
                      {feature.title}
                    </h3>
                    <span className="px-2 py-0.5 bg-zinc-800 text-zinc-400 text-xs rounded-full">
                      {feature.status}
                    </span>
                  </div>
                  <p className="text-zinc-400 text-sm">{feature.description}</p>
                </div>

                {/* Arrow */}
                <ArrowRight className="w-5 h-5 text-zinc-700 group-hover:text-[#00FF7F] transition-colors flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-16 text-center">
          <div className="inline-block px-6 py-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
            <p className="text-zinc-400 text-sm italic">
              "Todo usando lenguaje natural, desde tu app de mensajería favorita"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FutureVision;
