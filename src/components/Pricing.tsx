import { useState } from "react";
import { Check, X, Sparkles, Building2, Rocket, ArrowRight, ChevronDown } from "lucide-react";
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

const faqs = [
  {
    question: "¿Puedo cambiar de plan en cualquier momento?",
    answer: "Sí, puedes actualizar o cambiar tu plan en cualquier momento. Si actualizas a un plan superior, solo pagarás la diferencia prorrateada del mes en curso.",
  },
  {
    question: "¿Qué pasa con mis datos si cancelo?",
    answer: "Tus datos se mantienen seguros durante 30 días después de la cancelación. Puedes exportar toda tu información en cualquier momento desde el dashboard.",
  },
  {
    question: "¿Cómo funciona el reconocimiento de fotos de recibos?",
    answer: "Simplemente toma una foto del recibo y envíala por WhatsApp o Telegram. Nuestra IA extrae automáticamente el monto, categoría, fecha y descripción del gasto.",
  },
  {
    question: "¿Puedo usar Tresqu sin WhatsApp?",
    answer: "Sí, también está disponible vía Telegram y desde el dashboard web. WhatsApp es solo una de las opciones de interacción.",
  },
];

const Pricing = () => {
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
      price: isAnnual ? "$50" : "$5",
      period: isAnnual ? "/año" : "/mes",
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
      price: isAnnual ? "$490" : "$49",
      period: isAnnual ? "/año" : "/mes",
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
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-white/5" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1 border border-[#00FF7F]/25 rounded-sm text-[#00FF7F] text-xs uppercase tracking-wider font-medium mb-6">
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

          {/* Toggle mensual/anual */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <span className={`text-sm font-medium transition-colors ${!isAnnual ? "text-white" : "text-zinc-500"}`}>
              Mensual
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                isAnnual ? "bg-success" : "bg-zinc-700"
              }`}
            >
              <div
                className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-transform ${
                  isAnnual ? "translate-x-7" : "translate-x-0.5"
                }`}
              />
            </button>
            <span className={`text-sm font-medium transition-colors ${isAnnual ? "text-white" : "text-zinc-500"}`}>
              Anual
            </span>
            {isAnnual && (
              <span className="text-xs font-bold text-success bg-success/10 border border-success/20 px-2 py-0.5 rounded-sm">
                -17%
              </span>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const isFeatured = plan.highlighted;
            
            return (
              <div
                key={index}
                className={`relative flex flex-col rounded-md transition-colors duration-200 group ${
                  isFeatured
                    ? "bg-white/[0.03] border border-[#00FF7F]/40 z-20"
                    : "bg-white/[0.02] border border-white/[0.06] hover:border-white/10 z-10"
                }`}
              >
                {/* Popular Badge (Floating) */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30">
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-[#00FF7F] text-black text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-sm">
                      <Sparkles className="w-3.5 h-3.5" />
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="p-8 lg:p-10 flex flex-col h-full relative z-10">
                  {/* Plan Header */}
                  <div className="mb-8 relative">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`w-11 h-11 rounded-md flex items-center justify-center ${
                          isFeatured
                            ? "bg-[#00FF7F] text-black"
                            : "bg-white/[0.04] border border-white/10 text-white"
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
                    <div className="flex items-baseline gap-1.5 relative z-10">
                      <span className="text-5xl lg:text-6xl font-bold font-display tracking-tighter text-white">
                        {plan.price}
                      </span>
                      <span className="text-zinc-500 font-medium tracking-wide">
                        {plan.period}
                      </span>
                    </div>
                    {isAnnual && plan.price !== "Gratis" && (
                      <div className="mt-3 inline-flex items-center gap-2 border border-[#00FF7F]/25 px-2.5 py-1 rounded-sm">
                        <span className="text-[11px] font-semibold text-[#00FF7F] uppercase tracking-wider">
                          Ahorra 2 meses gratis
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="flex-grow space-y-4 mb-10">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3.5 group/feature">
                        {feature.included ? (
                          <div className={`w-5 h-5 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            isFeatured ? "bg-[#00FF7F]/15" : "bg-white/[0.04] border border-white/10"
                          }`}>
                            <Check className={`w-3 h-3 ${isFeatured ? "text-[#00FF7F]" : "text-zinc-300"}`} />
                          </div>
                        ) : (
                          <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <X className="w-3.5 h-3.5 text-zinc-700" />
                          </div>
                        )}
                        <span
                          className={`text-[14px] leading-snug ${
                            feature.included ? "text-zinc-300" : "text-zinc-600"
                          }`}
                        >
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={plan.onClick}
                    className={`w-full py-3.5 rounded-md font-semibold text-[15px] tracking-wide transition-colors duration-200 relative overflow-hidden ${
                      isFeatured
                        ? "bg-[#00FF7F] text-black hover:bg-white"
                        : "bg-white/[0.04] text-white hover:bg-white/[0.08] border border-white/10"
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

        {/* FAQ Section */}
        <div className="mt-20 max-w-2xl mx-auto">
          <h3 className="trii-title text-2xl sm:text-3xl text-center text-white mb-8">
            Preguntas <span className="trii-title-accent">frecuentes</span>
          </h3>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="glass-card overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left"
                >
                  <span className="text-sm sm:text-base font-medium text-foreground pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-muted-foreground flex-shrink-0 transition-transform ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all ${
                    openFaq === i ? "max-h-40 pb-4 px-4 sm:px-5" : "max-h-0"
                  }`}
                >
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-zinc-500 text-sm text-center">
            ¿Más preguntas?{" "}
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
