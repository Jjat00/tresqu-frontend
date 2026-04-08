import { Check, X, Sparkles, Building2, Rocket, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  name: string;
  icon: React.ReactNode;
  description: string;
  price: string;
  period: string;
  badge?: string;
  features: PlanFeature[];
  cta: string;
  highlighted?: boolean;
  onClick: () => void;
}

const Pricing = () => {
  const navigate = useNavigate();

  const plans: Plan[] = [
    {
      name: "Básico",
      icon: <Rocket className="w-5 h-5" />,
      description: "Para comenzar a organizar tus finanzas",
      price: "Gratis",
      period: "para siempre",
      features: [
        { text: "40 movimientos/mes (20 gastos + 20 ingresos)", included: true },
        { text: "Asistente IA (solo texto)", included: true },
        { text: "Estadísticas mensuales simples", included: true },
        { text: "Categorías predefinidas", included: true },
        { text: "WhatsApp + Telegram", included: true },
        { text: "Exportación mes actual", included: true },
        { text: "Mensajes de voz", included: false },
        { text: "Fotos de recibos", included: false },
        { text: "Metas de ahorro", included: false },
        { text: "Categorías personalizadas", included: false },
      ],
      cta: "Comenzar Gratis",
      onClick: () => navigate("/login"),
    },
    {
      name: "Premium",
      icon: <Sparkles className="w-5 h-5" />,
      description: "Control financiero completo con IA avanzada",
      price: "$5",
      period: "/mes",
      badge: "MÁS POPULAR",
      highlighted: true,
      features: [
        { text: "Registros ilimitados", included: true },
        { text: "Metas de ahorro completas", included: true },
        { text: "Mensajes de voz con IA", included: true },
        { text: "Fotos de recibos y facturas", included: true },
        { text: "Extracción automática de datos", included: true },
        { text: "Analytics avanzados", included: true },
        { text: "Categorías personalizadas", included: true },
        { text: "Exportación completa", included: true },
        { text: "Búsqueda inteligente", included: true },
        { text: "Soporte prioritario (4-8h)", included: true },
      ],
      cta: "Comenzar Premium",
      onClick: () => navigate("/login"),
    },
    {
      name: "Business",
      icon: <Building2 className="w-5 h-5" />,
      description: "Gestión financiera para equipos",
      price: "$49",
      period: "/mes",
      features: [
        { text: "Todo lo de Premium", included: true },
        { text: "Hasta 5 usuarios", included: true },
        { text: "Gestión de organización", included: true },
        { text: "Reportes consolidados", included: true },
        { text: "Analytics empresariales", included: true },
        { text: "Metas grupales", included: true },
        { text: "Roles y permisos", included: true },
        { text: "Procesamiento masivo", included: true },
        { text: "Detección de duplicados", included: true },
        { text: "Soporte VIP (1-2h)", included: true },
      ],
      cta: "Contactar Ventas",
      onClick: () =>
        document
          .getElementById("contacto")
          ?.scrollIntoView({ behavior: "smooth" }),
    },
  ];

  return (
    <section
      id="pricing"
      className="relative section-padding overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00FF7F]/5 rounded-full blur-[150px] pointer-events-none" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-[#00FF7F]/10 border border-[#00FF7F]/20 rounded-full text-[#00FF7F] text-sm font-medium mb-6">
            Precios
          </span>
          <h2 className="trii-title text-3xl sm:text-4xl md:text-5xl text-white mb-6">
            PLANES PARA CADA
            <br />
            <span className="text-[#00FF7F] italic">NECESIDAD</span>
          </h2>
          <p className="text-zinc-400 text-lg">
            Control financiero inteligente con IA avanzada. Elige el plan que
            mejor se adapte a ti.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const isFeatured = plan.highlighted;
            
            return (
              <div
                key={index}
                className={`relative flex flex-col rounded-[2.5rem] transition-all duration-700 ease-out group ${
                  isFeatured
                    ? "bg-zinc-900/40 backdrop-blur-2xl border border-[#00FF7F]/40 scale-105 shadow-[0_0_80px_-20px_rgba(0,255,127,0.25)] hover:shadow-[0_0_100px_-15px_rgba(0,255,127,0.35)] hover:-translate-y-2 z-20"
                    : "bg-zinc-900/20 backdrop-blur-xl border border-white/5 hover:border-white/10 hover:bg-zinc-900/30 hover:-translate-y-1 z-10"
                }`}
              >
                {/* Glass Glare Effect */}
                <div className="absolute inset-0 z-0 rounded-[2.5rem] pointer-events-none overflow-hidden">
                  <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white-[0.03] to-transparent transform -rotate-45 translate-x-1/2 -translate-y-1/2 blur-sm group-hover:via-white-[0.06] transition-colors duration-700" />
                </div>

                {/* Popular Badge (Floating) */}
                {plan.badge && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-30">
                    <div className="relative">
                      <div className="absolute inset-0 bg-[#00FF7F] rounded-full blur-[8px] opacity-60" />
                      <span className="relative flex items-center gap-1.5 px-5 py-2 bg-zinc-900 border border-[#00FF7F]/50 text-[#00FF7F] text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-full shadow-xl">
                        <Sparkles className="w-3.5 h-3.5" />
                        {plan.badge}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-8 lg:p-10 flex flex-col h-full relative z-10">
                  {/* Plan Header */}
                  <div className="mb-8 relative">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-lg ${
                          isFeatured
                            ? "bg-[#00FF7F] text-black shadow-[#00FF7F]/30"
                            : "bg-zinc-800 border border-white/5 text-white"
                        }`}
                      >
                        {plan.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white font-display tracking-tight">
                        {plan.name}
                      </h3>
                    </div>
                    <p className="text-zinc-400 text-[15px] leading-relaxed pr-4">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="mb-8 pb-8 border-b border-white/10 relative">
                    {/* Subtle Glow Behind Price */}
                    {isFeatured && (
                      <div className="absolute top-1/2 left-0 w-32 h-16 bg-[#00FF7F]/20 rounded-[100%] blur-[30px] -translate-y-1/2 pointer-events-none" />
                    )}
                    
                    <div className="flex items-baseline gap-1.5 relative z-10">
                      <span
                        className={`text-5xl lg:text-6xl font-bold font-display tracking-tighter ${
                          isFeatured ? "text-white" : "text-white"
                        }`}
                      >
                        {plan.price}
                      </span>
                      <span className="text-zinc-500 font-medium tracking-wide">
                        {plan.period}
                      </span>
                    </div>
                    {plan.name === "Premium" && (
                      <div className="mt-3 inline-flex items-center gap-2 bg-[#00FF7F]/10 border border-[#00FF7F]/20 px-3 py-1 rounded-full">
                        <span className="text-[11px] font-semibold text-[#00FF7F] uppercase tracking-wider">
                          ó $50/año (ahorra 20%)
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="flex-grow space-y-4 mb-10">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3.5 group/feature">
                        {feature.included ? (
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-300 ${
                            isFeatured ? "bg-[#00FF7F]/20" : "bg-zinc-800 border border-white/5"
                          }`}>
                            <Check className={`w-3 h-3 ${isFeatured ? "text-[#00FF7F]" : "text-zinc-300"}`} />
                          </div>
                        ) : (
                          <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <X className="w-3.5 h-3.5 text-zinc-700 group-hover/feature:text-zinc-600 transition-colors" />
                          </div>
                        )}
                        <span
                          className={`text-[14px] leading-snug transition-colors duration-300 ${
                            feature.included ? "text-zinc-300 group-hover/feature:text-white" : "text-zinc-600"
                          }`}
                        >
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Modern CTA Button */}
                  <button
                    onClick={plan.onClick}
                    className={`w-full py-4 rounded-2xl font-bold text-[15px] tracking-wide transition-all duration-500 relative overflow-hidden ${
                      isFeatured
                        ? "bg-[#00FF7F] text-black hover:bg-white shadow-[0_10px_20px_-10px_rgba(0,255,127,0.5)] hover:shadow-[0_10px_20px_-10px_rgba(255,255,255,0.5)]"
                        : "bg-zinc-800 text-white hover:bg-zinc-700 border border-white/5"
                    }`}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {plan.cta}
                      <ArrowRight className={`w-4 h-4 transition-transform duration-500 group-hover:translate-x-1 ${isFeatured ? "opacity-100" : "opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0"}`} />
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-zinc-900/50 border border-zinc-800 rounded-full">
            <span className="text-2xl">📸</span>
            <div className="text-left">
              <p className="text-sm text-white font-medium">
                Funcionalidad exclusiva: "Foto y Listo"
              </p>
              <p className="text-xs text-zinc-500">
                Toma foto al recibo, la IA hace el resto
              </p>
            </div>
          </div>
          <p className="mt-6 text-zinc-500 text-sm">
            ¿Tienes preguntas?{" "}
            <a
              href="#contacto"
              className="text-[#00FF7F] hover:underline font-medium"
            >
              Contáctanos
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
