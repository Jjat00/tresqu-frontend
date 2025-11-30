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
      className="relative py-20 md:py-32 overflow-hidden"
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

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative trii-card p-6 lg:p-8 transition-all duration-300 hover:border-[#00FF7F]/20"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-[#00FF7F]/10 flex items-center justify-center text-[#00FF7F] mb-5 group-hover:bg-[#00FF7F]/20 transition-colors">
                {benefit.icon}
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-white mb-2 font-display">
                {benefit.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                {benefit.description}
              </p>

              {/* Highlight Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-900 rounded-lg border border-zinc-800">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00FF7F]" />
                <span className="text-xs font-medium text-zinc-300">
                  {benefit.highlight}
                </span>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00FF7F]/5 to-transparent" />
              </div>
            </div>
          ))}
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
