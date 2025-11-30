import { MessageSquare, Zap, BarChart3, ChevronRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Escribe tu gasto",
    description:
      "Envía un mensaje natural a Tresqu por WhatsApp o Telegram. Sin formatos, sin complicaciones.",
    example: '"Gasté 15 mil en almuerzo"',
    color: "#00FF7F",
  },
  {
    number: "02",
    icon: <Zap className="w-6 h-6" />,
    title: "La IA lo procesa",
    description:
      "Nuestro asistente interpreta tu mensaje, categoriza automáticamente y guarda el registro.",
    example: "✅ Gasto registrado: $15,000 - Alimentación",
    color: "#00FF7F",
  },
  {
    number: "03",
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Consulta tus stats",
    description:
      "Accede a tu dashboard personal para ver todas tus finanzas organizadas y analizadas.",
    example: "Gráficos, tendencias y más",
    color: "#00FF7F",
  },
];

const HowItWorks = () => {
  return (
    <section
      id="como-funciona"
      className="relative py-20 md:py-32 overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
          <span className="inline-block px-4 py-1.5 bg-[#00FF7F]/10 border border-[#00FF7F]/20 rounded-full text-[#00FF7F] text-sm font-medium mb-6">
            Cómo funciona
          </span>
          <h2 className="trii-title text-3xl sm:text-4xl md:text-5xl text-white mb-6">
            REGISTRAR TUS GASTOS
            <br />
            <span className="text-[#00FF7F] italic">NUNCA FUE TAN SIMPLE</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Tres pasos simples para tomar el control total de tus finanzas
            personales
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Connection Line (Desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[calc(100%+1rem)] w-[calc(100%-2rem)] h-px">
                  <div className="w-full h-full bg-gradient-to-r from-zinc-700 via-[#00FF7F]/30 to-zinc-700" />
                  <ChevronRight className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00FF7F]/50" />
                </div>
              )}

              {/* Card */}
              <div className="trii-card trii-card-hover p-8 h-full">
                {/* Step Number */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-5xl font-bold font-display text-zinc-800 group-hover:text-zinc-700 transition-colors">
                    {step.number}
                  </span>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${step.color}15`,
                      color: step.color,
                    }}
                  >
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 font-display">
                  {step.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  {step.description}
                </p>

                {/* Example */}
                <div className="bg-zinc-900/80 rounded-xl p-4 border border-zinc-800/50">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: step.color }}
                    />
                    <span className="text-xs text-zinc-500 uppercase tracking-wider">
                      Ejemplo
                    </span>
                  </div>
                  <p className="text-sm text-zinc-300 font-mono">
                    {step.example}
                  </p>
                </div>
              </div>

              {/* Mobile Connection */}
              {index < steps.length - 1 && (
                <div className="md:hidden flex justify-center py-4">
                  <div className="w-px h-8 bg-gradient-to-b from-zinc-700 to-[#00FF7F]/30" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-zinc-500 mb-6">
            ¿Listo para comenzar? Es gratis y toma menos de 30 segundos
          </p>
          <button
            onClick={() =>
              window.open(
                "https://wa.me/573116534337?text=Hola%20Tresqu",
                "_blank"
              )
            }
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#00FF7F] text-black font-semibold rounded-full hover:bg-[#00CC66] transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,255,127,0.3)]"
          >
            Empezar ahora
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
