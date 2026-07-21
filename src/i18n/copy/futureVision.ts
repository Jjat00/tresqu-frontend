import type { Dict } from "../types";

export interface FutureVisionCopy {
  sectionLabel: string;
  /** "{line1} / {line2Pre} {line2Holo}." — estilos en el componente */
  title: { line1: string; line2Pre: string; line2Holo: string };
  intro: string;
  cta: string;
  whatsappUrl: string;
  /** Mismo orden que el array de iconos del componente */
  features: { title: string; description: string; status: string }[];
  quote: string;
}

export const futureVisionCopy: Dict<FutureVisionCopy> = {
  es: {
    sectionLabel: "07 · Roadmap",
    title: { line1: "ESTO ES SOLO", line2Pre: "EL", line2Holo: "PRINCIPIO" },
    intro:
      "Hoy el equipo registra, analiza e invierte contigo —siempre con tu confirmación—. Lo que viene: que proponga por su cuenta, te avise cuando algo de tu dinero lo amerite y optimice tu portafolio. Tú sigues teniendo la última palabra.",
    cta: "Mantenerme informado",
    whatsappUrl: "https://wa.me/573116534337?text=Quiero%20saber%20más",
    features: [
      {
        title: "Agente que invierte por ti",
        description:
          "Le delegas el aporte mensual y el agente decide qué comprar dentro de los límites que tú definas. Tú confirmas, él ejecuta.",
        status: "En desarrollo",
      },
      {
        title: "Alertas que te buscan a ti",
        description:
          "El analista ya responde cuando le preguntas por un activo. El siguiente paso: que te avise él solo cuando algo de tu portafolio lo amerite, no por noticias genéricas.",
        status: "Próximamente",
      },
      {
        title: "Optimización de portafolio",
        description:
          "Reequilibrios sugeridos cruzando tu portafolio Wallbit con tu colchón de ahorro y tus metas en Tresqu.",
        status: "Próximamente",
      },
    ],
    quote: '"El primer agente financiero contextual de LATAM."',
  },
  en: {
    sectionLabel: "07 · Roadmap",
    title: { line1: "THIS IS JUST", line2Pre: "THE", line2Holo: "BEGINNING" },
    intro:
      "Today the team logs, analyzes, and invests with you — always with your confirmation. What's next: proposing on its own, reaching out when something about your money deserves it, and optimizing your portfolio. You still have the final word.",
    cta: "Keep me posted",
    whatsappUrl: "https://wa.me/573116534337?text=I%20want%20to%20know%20more",
    features: [
      {
        title: "An agent that invests for you",
        description:
          "Delegate your monthly contribution and the agent decides what to buy within the limits you define. You confirm, it executes.",
        status: "In development",
      },
      {
        title: "Alerts that come to you",
        description:
          "The analyst already answers when you ask about an asset. Next step: it reaches out on its own when something in your portfolio deserves it — not for generic news.",
        status: "Coming soon",
      },
      {
        title: "Portfolio optimization",
        description:
          "Suggested rebalancing that crosses your Wallbit portfolio with your savings cushion and your goals in Tresqu.",
        status: "Coming soon",
      },
    ],
    quote: "\"LATAM's first contextual financial agent.\"",
  },
};
