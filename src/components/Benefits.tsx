import {
  Smartphone,
  MessageSquare,
  BarChart3,
  Zap,
  Shield,
  Globe,
} from "lucide-react";

const benefits = [
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Sin descargas",
    description: "Usa las apps que ya tienes. WhatsApp y Telegram, nada más.",
    highlight: "0 apps nuevas",
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "100% conversacional",
    description: "Escribe como hablas. Sin formularios, sin menús complicados.",
    highlight: "Lenguaje natural",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Registro instantáneo",
    description:
      "La IA procesa tu mensaje en segundos y categoriza automáticamente.",
    highlight: "< 3 segundos",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Estadísticas claras",
    description:
      "Dashboard visual con gráficos, tendencias y análisis de tus hábitos.",
    highlight: "Insights en tiempo real",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Datos seguros",
    description:
      "Tu información está protegida con encriptación de grado bancario.",
    highlight: "Encriptación AES-256",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Multi-moneda",
    description:
      "Registra en COP, USD o cualquier moneda. Conversión automática.",
    highlight: "150+ monedas",
  },
];

const Benefits = () => {
  return (
    <section
      id="beneficios"
      className="relative section-padding overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0a0a0a 0%, #0d0d0d 50%, #0a0a0a 100%)",
      }}
    >
      {/* Decorative Elements */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-[#00FF7F]/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-[#00FF7F]/5 rounded-full blur-[100px]" />

      <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16">
          <div>
            <span className="inline-block px-4 py-1.5 bg-[#00FF7F]/10 border border-[#00FF7F]/20 rounded-full text-[#00FF7F] text-sm font-medium mb-6">
              Beneficios
            </span>
            <h2 className="trii-title text-3xl sm:text-4xl md:text-5xl text-white">
              GESTIONA TUS FINANZAS
              <br />
              <span className="text-[#00FF7F] italic">DE FORMA NATURAL</span>
            </h2>
          </div>
          <div className="lg:pt-16">
            <p className="text-zinc-400 text-lg leading-relaxed">
              Tresqu se adapta a ti, no al revés. Olvídate de aprender nuevas
              interfaces o perder tiempo en configuraciones. Solo escribe y
              listo.
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
                className={`group relative overflow-hidden rounded-[2rem] bg-zinc-900/40 border border-white/5 p-6 lg:p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,255,127,0.1)] ${gridClass}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Glass reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Glow behind icon */}
                <div className="absolute top-8 left-8 w-24 h-24 bg-[#00FF7F]/20 rounded-full blur-[40px] group-hover:bg-[#00FF7F]/30 transition-colors duration-500" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-2xl bg-zinc-800/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-[#00FF7F] group-hover:scale-110 transition-transform duration-500 shadow-xl">
                      {benefit.icon}
                    </div>

                    {/* Highlight Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-900/80 backdrop-blur-md rounded-full border border-white/5 shadow-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00FF7F] shadow-[0_0_8px_#00FF7F]" />
                      <span className="text-[11px] font-medium text-zinc-300 uppercase tracking-wide">
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

        {/* Bottom Stats */}
        <div className="mt-20 pt-12 border-t border-zinc-800/50">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
            {[
              { value: "5K+", label: "Gastos registrados" },
              { value: "99.9%", label: "Uptime" },
              { value: "4.9★", label: "Satisfacción" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold font-display text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-zinc-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
