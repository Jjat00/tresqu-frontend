import { Check, X, Sparkles, Building2, Rocket } from "lucide-react";
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
        { text: "Bot básico (solo texto)", included: true },
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
      className="relative py-20 md:py-32 overflow-hidden bg-[#0a0a0a]"
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
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative flex flex-col rounded-2xl transition-all duration-300 ${
                plan.highlighted
                  ? "bg-gradient-to-b from-[#00FF7F]/10 to-transparent border-2 border-[#00FF7F]/30 scale-105 shadow-[0_0_60px_-15px_rgba(0,255,127,0.3)]"
                  : "trii-card"
              }`}
            >
              {/* Popular Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 bg-[#00FF7F] text-black text-xs font-bold rounded-full">
                    ⭐ {plan.badge}
                  </span>
                </div>
              )}

              <div className="p-6 lg:p-8 flex flex-col h-full">
                {/* Plan Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        plan.highlighted
                          ? "bg-[#00FF7F] text-black"
                          : "bg-zinc-800 text-[#00FF7F]"
                      }`}
                    >
                      {plan.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white font-display">
                      {plan.name}
                    </h3>
                  </div>
                  <p className="text-zinc-500 text-sm">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-6 pb-6 border-b border-zinc-800">
                  <div className="flex items-baseline gap-1">
                    <span
                      className={`text-4xl font-bold font-display ${
                        plan.highlighted ? "text-[#00FF7F]" : "text-white"
                      }`}
                    >
                      {plan.price}
                    </span>
                    <span className="text-zinc-500 text-sm">{plan.period}</span>
                  </div>
                  {plan.name === "Premium" && (
                    <p className="text-xs text-zinc-500 mt-2">
                      ó $50/año (ahorra 20%)
                    </p>
                  )}
                </div>

                {/* Features */}
                <div className="flex-grow space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      {feature.included ? (
                        <div className="w-5 h-5 rounded-full bg-[#00FF7F]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-[#00FF7F]" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <X className="w-3 h-3 text-zinc-600" />
                        </div>
                      )}
                      <span
                        className={`text-sm ${
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
                  className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    plan.highlighted
                      ? "bg-[#00FF7F] text-black hover:bg-[#00CC66] hover:shadow-[0_0_30px_rgba(0,255,127,0.3)]"
                      : "bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
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
