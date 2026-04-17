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
      "Nuestra IA interpreta tu mensaje, categoriza automáticamente y guarda el registro al instante.",
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
      className="relative section-padding overflow-hidden bg-[#0a0a0a]"
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
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connection Line (Desktop) with modern gradient and blur */}
          <div className="hidden md:block absolute top-24 left-[15%] right-[15%] h-[2px]">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00FF7F]/40 to-transparent blur-[4px]" />
            <div className="w-full h-full bg-gradient-to-r from-transparent via-[#00FF7F]/80 to-transparent" />
          </div>

          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative z-10"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Card - Modern Glassmorphism */}
              <div className="bg-zinc-900/30 backdrop-blur-xl border border-white/5 hover:border-[#00FF7F]/30 p-8 h-full rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(0,255,127,0.15)] relative overflow-hidden">
                
                {/* Subtle Inner Glow */}
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#00FF7F]/10 rounded-full blur-[60px] group-hover:bg-[#00FF7F]/20 transition-all duration-700" />
                
                {/* Step Number & Icon */}
                <div className="flex flex-col items-center justify-center text-center mb-8 relative">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-full bg-zinc-900/80 border border-white/10 flex items-center justify-center shadow-2xl relative z-10 group-hover:scale-110 transition-transform duration-500 ease-out">
                      {/* Inner glowing icon container */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="text-[#00FF7F] drop-shadow-[0_0_15px_rgba(0,255,127,0.5)]">
                        {step.icon}
                      </div>
                    </div>
                    {/* Pulsing ring */}
                    <div className="absolute inset-0 rounded-full border border-[#00FF7F]/30 scale-150 opacity-0 group-hover:animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] pointer-events-none" />
                  </div>
                  
                  <span className="absolute -top-6 text-[8rem] font-bold font-display text-white/[0.03] select-none tracking-tighter">
                    {step.number}
                  </span>
                  
                  <h3 className="text-2xl font-bold text-white mb-3 font-display tracking-tight mt-4 relative z-10">
                    {step.title}
                  </h3>
                  <p className="text-zinc-400 text-[15px] leading-relaxed relative z-10 px-2">
                    {step.description}
                  </p>
                </div>

                {/* Example Bubble - Modern AI Chat Look */}
                <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/5 relative z-10 group-hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00FF7F] shadow-[0_0_8px_#00FF7F]" />
                    <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold">
                      Ejemplo
                    </span>
                  </div>
                  <p className="text-sm text-zinc-300 font-mono tracking-tight leading-relaxed">
                    {step.example}
                  </p>
                </div>
              </div>

              {/* Mobile Connection */}
              {index < steps.length - 1 && (
                <div className="md:hidden flex justify-center py-6">
                  <div className="w-px h-12 bg-gradient-to-b from-[#00FF7F]/50 to-transparent blur-[1px]" />
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
