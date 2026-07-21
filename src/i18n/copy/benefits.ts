import type { Dict } from "../types";

export interface BenefitsCopy {
  sectionLabel: string;
  /** "{line1Pre} {line1Holo}, / {line2}" — estilos en el componente */
  title: { line1Pre: string; line1Holo: string; line2: string };
  intro: string;
  /** Mismo orden que el array de iconos del componente */
  benefits: { title: string; description: string; highlight: string }[];
}

export const benefitsCopy: Dict<BenefitsCopy> = {
  es: {
    sectionLabel: "06 · Beneficios",
    title: { line1Pre: "POR QUÉ UN", line1Holo: "AGENTE", line2: "NO UNA APP." },
    intro:
      "Las apps de finanzas te piden cargar bancos, llenar formularios y aprender menús. Un agente te entiende, ejecuta y aprende — sin que tú hagas nada extra.",
    benefits: [
      {
        title: "Sin formularios",
        description:
          "Le escribes al agente como a una persona. No hay campos que llenar ni dropdowns que aprender.",
        highlight: "vs apps tradicionales",
      },
      {
        title: "Sin descargas",
        description:
          "WhatsApp, Telegram, Gmail o web. Tresqu vive en los canales que ya usas.",
        highlight: "0 apps nuevas",
      },
      {
        title: "Sin configuración",
        description:
          "El agente aprende de tus mensajes. No tienes que armar categorías, reglas ni dashboards.",
        highlight: "Cero setup",
      },
      {
        title: "Sin curva de aprendizaje",
        description:
          "Si sabes mandar un audio o una foto, ya sabes usar Tresqu. El agente hace el resto.",
        highlight: "Plug & talk",
      },
      {
        title: "Datos seguros",
        description:
          "Tus tokens están cifrados con encriptación militar Fernet en cada integración con bancos y plataformas externas.",
        highlight: "Encriptación Fernet",
      },
      {
        title: "Multi-moneda",
        description:
          "Maneja COP, USD, EUR y otras monedas principales. Conversiones y saldos en vivo.",
        highlight: "10+ monedas",
      },
    ],
  },
  en: {
    sectionLabel: "06 · Benefits",
    title: { line1Pre: "WHY AN", line1Holo: "AGENT", line2: "NOT AN APP." },
    intro:
      "Finance apps make you link banks, fill out forms, and learn menus. An agent understands you, executes, and learns — with zero extra work from you.",
    benefits: [
      {
        title: "No forms",
        description:
          "You message the agent like a person. No fields to fill, no dropdowns to learn.",
        highlight: "vs traditional apps",
      },
      {
        title: "No downloads",
        description:
          "WhatsApp, Telegram, Gmail, or the web. Tresqu lives in the channels you already use.",
        highlight: "0 new apps",
      },
      {
        title: "No configuration",
        description:
          "The agent learns from your messages. No categories, rules, or dashboards to set up.",
        highlight: "Zero setup",
      },
      {
        title: "No learning curve",
        description:
          "If you can send a voice note or a photo, you already know how to use Tresqu. The agent does the rest.",
        highlight: "Plug & talk",
      },
      {
        title: "Secure data",
        description:
          "Your tokens are protected with military-grade Fernet encryption in every integration with banks and external platforms.",
        highlight: "Fernet encryption",
      },
      {
        title: "Multi-currency",
        description:
          "Handles COP, USD, EUR, and other major currencies. Live conversions and balances.",
        highlight: "10+ currencies",
      },
    ],
  },
};
