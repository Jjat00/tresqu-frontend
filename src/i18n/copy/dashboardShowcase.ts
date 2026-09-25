import type { Dict } from "../types";

export interface DashboardShowcaseCopy {
  sectionLabel: string;
  title: string;
  intro: string;
  browserBadge: string;
  cta: string;
}

export const dashboardShowcaseCopy: Dict<DashboardShowcaseCopy> = {
  es: {
    sectionLabel: "El producto",
    title: "Todo aterriza en un solo lugar.",
    intro:
      "Lo que registras por chat llega a tu dashboard: gastos, ingresos e inversiones, en vivo. Este es el real, con datos de demostración.",
    browserBadge: "julio 2026 · demo",
    cta: "Entrar a mi dashboard",
  },
  en: {
    sectionLabel: "The product",
    title: "Everything lands in one place.",
    intro:
      "What you log in chat reaches your dashboard: expenses, income, and investments, live. This is the real one, with demo data.",
    browserBadge: "July 2026 · demo",
    cta: "Go to my dashboard",
  },
};
