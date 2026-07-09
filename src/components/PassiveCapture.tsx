import { Mail, Camera, Search } from "lucide-react";

const capabilities = [
  {
    Icon: Mail,
    title: "Gmail automático",
    description:
      "Conecta tu correo y Tresqu detecta compras en tus emails sin que tengas que escribir nada. Tu inbox se vuelve tu hoja de gastos.",
    tag: "Pasivo",
  },
  {
    Icon: Camera,
    title: "Recibos por foto",
    description:
      "Manda una foto de tu factura o recibo y Tresqu lee el monto, el comercio y la categoría automáticamente. Sin tipear nada.",
    tag: "Vision AI",
  },
  {
    Icon: Search,
    title: "Pregunta por significado",
    description:
      "'¿Cuánto gasté en salidas el mes pasado?' — Tresqu entiende lo que quieres decir, no solo palabras sueltas. Sin filtros ni categorías exactas.",
    tag: "Conversacional",
  },
];

const PassiveCapture = () => {
  return (
    <section id="captura" className="relative section-padding bg-[#0a0a0a] scroll-mt-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none section-aura-green">
        <div className="absolute top-0 left-0 right-0 h-px bg-white/5" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <span className="section-label mb-6">02 · Captura pasiva</span>
          <h2 className="trii-title text-4xl sm:text-5xl md:text-6xl text-white mb-6">
            NO REGISTRES.
            <br />
            DEJA QUE TRESQU LO{" "}
            <span className="holo-text italic">HAGA</span>.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto">
            Tres formas en las que el agente captura tu actividad financiera sin
            que muevas un dedo.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {capabilities.map(({ Icon, title, description, tag }) => (
            <div
              key={title}
              className="group holo-card holo-sheen hud-corners p-6 lg:p-8"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-11 h-11 rounded-md bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#00FF7F] transition-all duration-300 group-hover:border-[#00FF7F]/40 group-hover:shadow-[0_0_20px_-6px_rgba(0,255,127,0.6)]">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="px-2 py-0.5 border border-white/10 rounded-sm text-[10px] uppercase tracking-wider text-zinc-400 font-medium font-mono">
                  {tag}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-display tracking-tight">
                {title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PassiveCapture;
