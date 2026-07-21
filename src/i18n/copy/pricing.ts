import type { Dict } from "../types";

/** Sección oculta en la landing hoy; se extrae igual para no dejar deuda. */
export interface PricingPlanCopy {
  name: string;
  description: string;
  price: { monthly: string; annual: string };
  period: { monthly: string; annual: string };
  badge?: string;
  features: { text: string; included: boolean }[];
  cta: string;
}

export interface PricingCopy {
  label: string;
  /** "{titleLine1} / {titleAccent}" — estilos en el componente */
  titleLine1: string;
  titleAccent: string;
  intro: string;
  monthly: string;
  annual: string;
  saveBadge: string;
  /** Mismo orden que el array estructural del componente */
  plans: PricingPlanCopy[];
  faqTitlePre: string;
  faqTitleAccent: string;
  faqs: { question: string; answer: string }[];
  morePrompt: string;
  moreLink: string;
}

export const pricingCopy: Dict<PricingCopy> = {
  es: {
    label: "Precios",
    titleLine1: "PLANES PARA CADA",
    titleAccent: "NECESIDAD",
    intro:
      "Control financiero inteligente desde un chat. Elige el plan que mejor se adapte a ti.",
    monthly: "Mensual",
    annual: "Anual",
    saveBadge: "Ahorra 2 meses gratis",
    plans: [
      {
        name: "Básico",
        description: "Para comenzar a organizar tus finanzas",
        price: { monthly: "Gratis", annual: "Gratis" },
        period: { monthly: "para siempre", annual: "para siempre" },
        features: [
          { text: "40 movimientos/mes (20 gastos + 20 ingresos)", included: true },
          { text: "Asistente conversacional (solo texto)", included: true },
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
      },
      {
        name: "Premium",
        description: "Control financiero completo con el agente avanzado",
        price: { monthly: "$5", annual: "$50" },
        period: { monthly: "/mes", annual: "/año" },
        badge: "MÁS POPULAR",
        features: [
          { text: "Registros ilimitados", included: true },
          { text: "Metas de ahorro completas", included: true },
          { text: "Mensajes de voz", included: true },
          { text: "Fotos de recibos y facturas", included: true },
          { text: "Extracción automática de datos", included: true },
          { text: "Analytics avanzados", included: true },
          { text: "Categorías personalizadas", included: true },
          { text: "Exportación completa", included: true },
          { text: "Búsqueda inteligente", included: true },
          { text: "Soporte prioritario (4-8h)", included: true },
        ],
        cta: "Comenzar Premium",
      },
      {
        name: "Business",
        description: "Gestión financiera para equipos",
        price: { monthly: "$49", annual: "$490" },
        period: { monthly: "/mes", annual: "/año" },
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
      },
    ],
    faqTitlePre: "Preguntas",
    faqTitleAccent: "frecuentes",
    faqs: [
      {
        question: "¿Puedo cambiar de plan en cualquier momento?",
        answer:
          "Sí, puedes actualizar o cambiar tu plan en cualquier momento. Si actualizas a un plan superior, solo pagarás la diferencia prorrateada del mes en curso.",
      },
      {
        question: "¿Qué pasa con mis datos si cancelo?",
        answer:
          "Tus datos se mantienen seguros durante 30 días después de la cancelación. Puedes exportar toda tu información en cualquier momento desde el dashboard.",
      },
      {
        question: "¿Cómo funciona el reconocimiento de fotos de recibos?",
        answer:
          "Simplemente toma una foto del recibo y envíala por WhatsApp o Telegram. Tresqu extrae automáticamente el monto, categoría, fecha y descripción del gasto.",
      },
      {
        question: "¿Puedo usar Tresqu sin WhatsApp?",
        answer:
          "Sí, también está disponible vía Telegram y desde el dashboard web. WhatsApp es solo una de las opciones de interacción.",
      },
    ],
    morePrompt: "¿Más preguntas? ",
    moreLink: "Contáctanos",
  },
  en: {
    label: "Pricing",
    titleLine1: "A PLAN FOR EVERY",
    titleAccent: "NEED",
    intro: "Smart financial control from a chat. Pick the plan that fits you best.",
    monthly: "Monthly",
    annual: "Yearly",
    saveBadge: "Save 2 months free",
    plans: [
      {
        name: "Basic",
        description: "To start getting your finances in order",
        price: { monthly: "Free", annual: "Free" },
        period: { monthly: "forever", annual: "forever" },
        features: [
          { text: "40 transactions/month (20 expenses + 20 income)", included: true },
          { text: "Conversational assistant (text only)", included: true },
          { text: "Simple monthly statistics", included: true },
          { text: "Predefined categories", included: true },
          { text: "WhatsApp + Telegram", included: true },
          { text: "Current-month export", included: true },
          { text: "Voice messages", included: false },
          { text: "Receipt photos", included: false },
          { text: "Savings goals", included: false },
          { text: "Custom categories", included: false },
        ],
        cta: "Start for Free",
      },
      {
        name: "Premium",
        description: "Full financial control with the advanced agent",
        price: { monthly: "$5", annual: "$50" },
        period: { monthly: "/month", annual: "/year" },
        badge: "MOST POPULAR",
        features: [
          { text: "Unlimited entries", included: true },
          { text: "Full savings goals", included: true },
          { text: "Voice messages", included: true },
          { text: "Receipt and invoice photos", included: true },
          { text: "Automatic data extraction", included: true },
          { text: "Advanced analytics", included: true },
          { text: "Custom categories", included: true },
          { text: "Full export", included: true },
          { text: "Smart search", included: true },
          { text: "Priority support (4-8h)", included: true },
        ],
        cta: "Go Premium",
      },
      {
        name: "Business",
        description: "Financial management for teams",
        price: { monthly: "$49", annual: "$490" },
        period: { monthly: "/month", annual: "/year" },
        features: [
          { text: "Everything in Premium", included: true },
          { text: "Up to 5 users", included: true },
          { text: "Organization management", included: true },
          { text: "Consolidated reports", included: true },
          { text: "Business analytics", included: true },
          { text: "Group goals", included: true },
          { text: "Roles and permissions", included: true },
          { text: "Bulk processing", included: true },
          { text: "Duplicate detection", included: true },
          { text: "VIP support (1-2h)", included: true },
        ],
        cta: "Contact Sales",
      },
    ],
    faqTitlePre: "Frequently asked",
    faqTitleAccent: "questions",
    faqs: [
      {
        question: "Can I change plans at any time?",
        answer:
          "Yes, you can upgrade or change your plan whenever you want. If you upgrade to a higher plan, you only pay the prorated difference for the current month.",
      },
      {
        question: "What happens to my data if I cancel?",
        answer:
          "Your data stays safe for 30 days after cancellation. You can export all your information at any time from the dashboard.",
      },
      {
        question: "How does receipt photo recognition work?",
        answer:
          "Just take a photo of the receipt and send it via WhatsApp or Telegram. Tresqu automatically extracts the amount, category, date, and description of the expense.",
      },
      {
        question: "Can I use Tresqu without WhatsApp?",
        answer:
          "Yes, it's also available via Telegram and from the web dashboard. WhatsApp is just one of the ways to interact.",
      },
    ],
    morePrompt: "More questions? ",
    moreLink: "Contact us",
  },
};
