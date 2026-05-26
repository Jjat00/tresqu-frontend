import { TrendingUp, Wallet, CreditCard, Bot } from "lucide-react";

const features = [
  {
    Icon: TrendingUp,
    title: "Acciones y ETFs",
    description:
      "Compra y vende títulos en tiempo real desde el chat. Cotizaciones en vivo, ejecución inmediata.",
  },
  {
    Icon: Bot,
    title: "Robo Advisors",
    description:
      "Carteras gestionadas automáticamente. Decide cuánto depositar y Tresqu distribuye según tu perfil.",
  },
  {
    Icon: CreditCard,
    title: "Tarjeta Wallbit",
    description:
      "Activa o suspende tu tarjeta desde el agente. Cada gasto queda registrado al instante.",
  },
  {
    Icon: Wallet,
    title: "Saldos en múltiples monedas",
    description:
      "USD, COP, EUR y más. Mueve fondos entre cuentas con un solo mensaje.",
  },
];

const Investments = () => {
  return (
    <section className="relative section-padding bg-[#0a0a0a]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-white/5" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16">
          {/* Left — header */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-block px-3 py-1 border border-[#00FF7F]/25 rounded-sm text-[#00FF7F] text-xs uppercase tracking-wider font-medium">
                Inversiones
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-1 border border-[#00FF7F]/40 rounded-sm">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF7F] opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00FF7F]" />
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#00FF7F] font-semibold">
                  En vivo
                </span>
              </span>
            </div>

            <h2 className="trii-title text-3xl sm:text-4xl md:text-5xl text-white mb-6">
              TU DINERO,
              <br />
              <span className="text-[#00FF7F] italic">INVERTIDO</span> DESDE EL
              CHAT.
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
              Tresqu integra <span className="text-white">Wallbit</span> para
              que compres acciones, deposites en Robo Advisors y gestiones tu
              tarjeta con un mensaje. Operaciones reales, dinero real.
            </p>
          </div>

          {/* Right — features grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map(({ Icon, title, description }) => (
              <div
                key={title}
                className="bg-white/[0.02] border border-white/[0.06] p-5 rounded-md transition-colors duration-200 hover:border-white/10"
              >
                <div className="w-10 h-10 rounded-md bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#00FF7F] mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-white font-bold text-base mb-2 font-display tracking-tight">
                  {title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Investments;
