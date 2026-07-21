import type { Dict } from "../types";

export interface DashboardShowcaseCopy {
  sectionLabel: string;
  /** "{pre} {holo}{post}" — el span holográfico queda en el componente */
  title: { pre: string; holo: string; post: string };
  intro: string;
  browserBadge: string;
  sampleLabel: string;
  sampleChips: string[];
  microCopy: string;
  cta: string;
}

export const dashboardShowcaseCopy: Dict<DashboardShowcaseCopy> = {
  es: {
    sectionLabel: "El producto",
    title: { pre: "ASÍ SE VE TU", holo: "DINERO", post: "." },
    intro:
      "Este es el dashboard real de Tresqu: todo lo que registras por chat aterriza aquí — gastos, ingresos e inversiones, en vivo. Y esto es solo una parte.",
    browserBadge: "julio 2026 · demo",
    sampleLabel: "Una pequeña muestra — también:",
    sampleChips: [
      "Resumen de inicio",
      "Categorías",
      "Integraciones Gmail y Wallbit",
      "Chat con el equipo de agentes",
      "Perfil de riesgo",
      "y mucho más",
    ],
    microCopy: "Dashboard real de Tresqu · datos de demostración",
    cta: "Entrar a mi dashboard",
  },
  en: {
    sectionLabel: "The product",
    title: { pre: "THIS IS WHAT YOUR", holo: "MONEY", post: " LOOKS LIKE." },
    intro:
      "This is the real Tresqu dashboard: everything you log through chat lands here — expenses, income, and investments, live. And this is just one part.",
    browserBadge: "July 2026 · demo",
    sampleLabel: "A small sample — also inside:",
    sampleChips: [
      "Home summary",
      "Categories",
      "Gmail & Wallbit integrations",
      "Chat with the agent team",
      "Risk profile",
      "and much more",
    ],
    microCopy: "Tresqu's real dashboard · demo data",
    cta: "Go to my dashboard",
  },
};
