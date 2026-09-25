import type { Dict } from "../types";

export interface HeroCopy {
  /** "SABE CÓMO {holo}. / INVIERTE COMO {underline}." — estilos en el componente */
  title: {
    line1Pre: string;
    line1Holo: string;
    line2Pre: string;
    line2Underline: string;
  };
  subtitle: { pre: string; wallbitLabel: string; post: string };
  wallbitUrl: string;
  whatsappUrl: string;
  ctaWhatsApp: string;
  ctaTelegram: string;
  worksWith: string;
  dashboardLink: string;
  loginPrompt: string;
  loginLink: string;
}

export const heroCopy: Dict<HeroCopy> = {
  es: {
    title: {
      line1Pre: "SABE CÓMO",
      line1Holo: "VIVES",
      line2Pre: "INVIERTE COMO",
      line2Underline: "ERES",
    },
    subtitle: {
      pre: "Un equipo de agentes que registra tus gastos, entiende tus ingresos e invierte contigo en ",
      wallbitLabel: "Wallbit",
      post: ". Todo por chat, desde las apps que ya usas.",
    },
    wallbitUrl: "https://www.wallbit.io/es",
    whatsappUrl: "https://wa.me/573116534337?text=Hola%20Tresqu",
    ctaWhatsApp: "Empezar en WhatsApp",
    ctaTelegram: "Abrir en Telegram",
    worksWith: "Funciona con",
    dashboardLink: "Entra a tu dashboard →",
    loginPrompt: "¿Ya tienes cuenta? ",
    loginLink: "Entra a tu dashboard →",
  },
  en: {
    title: {
      line1Pre: "KNOWS HOW YOU",
      line1Holo: "LIVE",
      line2Pre: "INVESTS LIKE",
      line2Underline: "YOU",
    },
    subtitle: {
      pre: "A team of agents that logs your expenses, understands your income, and invests with you on ",
      wallbitLabel: "Wallbit",
      post: ". All through chat, from the apps you already use.",
    },
    wallbitUrl: "https://www.wallbit.io",
    whatsappUrl: "https://wa.me/573116534337?text=Hi%20Tresqu",
    ctaWhatsApp: "Start on WhatsApp",
    ctaTelegram: "Open in Telegram",
    worksWith: "Works with",
    dashboardLink: "Go to your dashboard →",
    loginPrompt: "Already have an account? ",
    loginLink: "Go to your dashboard →",
  },
};
