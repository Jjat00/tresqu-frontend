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
  microCopy: string;
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
      pre: "Tresqu es un equipo de agentes que registra tus gastos, entiende tus ingresos y usa todo ese contexto para invertir contigo en ",
      wallbitLabel: "Wallbit",
      post: " — por chat, desde las apps que ya usas.",
    },
    wallbitUrl: "https://www.wallbit.io/es",
    whatsappUrl: "https://wa.me/573116534337?text=Hola%20Tresqu",
    ctaWhatsApp: "Empezar en WhatsApp",
    ctaTelegram: "Abrir en Telegram",
    microCopy: "Sin descargar apps. Empieza en menos de 30 segundos.",
    dashboardLink: "Entra a tu dashboard →",
    loginPrompt: "¿Prefieres la web o ya tienes cuenta? ",
    loginLink: "Inicia sesión y entra a tu dashboard →",
  },
  en: {
    title: {
      line1Pre: "KNOWS HOW YOU",
      line1Holo: "LIVE",
      line2Pre: "INVESTS LIKE",
      line2Underline: "YOU",
    },
    subtitle: {
      pre: "Tresqu is a team of agents that logs your expenses, understands your income, and uses all that context to invest with you on ",
      wallbitLabel: "Wallbit",
      post: " — through chat, from the apps you already use.",
    },
    wallbitUrl: "https://www.wallbit.io",
    whatsappUrl: "https://wa.me/573116534337?text=Hi%20Tresqu",
    ctaWhatsApp: "Start on WhatsApp",
    ctaTelegram: "Open in Telegram",
    microCopy: "No apps to download. Get started in under 30 seconds.",
    dashboardLink: "Go to your dashboard →",
    loginPrompt: "Prefer the web or already have an account? ",
    loginLink: "Sign in and go to your dashboard →",
  },
};
