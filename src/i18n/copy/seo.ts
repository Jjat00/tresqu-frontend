import type { Dict } from "../types";
import type { RouteKey } from "../routes";

export interface PageSeo {
  title: string;
  description: string;
}

/** Title/description por ruta pública. En sync con los shells HTML. */
export const seoCopy: Record<RouteKey, Dict<PageSeo>> = {
  home: {
    es: {
      title: "Tresqu — Tu equipo de agentes financieros",
      description:
        "Un equipo de agentes que registra tus gastos, entiende tus ingresos e invierte contigo en Wallbit — todo por chat, desde WhatsApp.",
    },
    en: {
      title: "Tresqu — Your team of financial agents",
      description:
        "A team of agents that logs your expenses, understands your income, and invests with you on Wallbit — all through chat, from WhatsApp.",
    },
  },
  features: {
    es: {
      title: "Funciones — Todo lo que puedes hacer con Tresqu",
      description:
        "Guía completa de funciones de Tresqu: registro por texto, voz y foto; Gmail automático; inversiones Wallbit por chat; analista de mercado y dashboard web.",
    },
    en: {
      title: "Features — Everything you can do with Tresqu",
      description:
        "The complete Tresqu feature guide: log by text, voice, and photo; automatic Gmail capture; Wallbit investing by chat; market analyst and web dashboard.",
    },
  },
  login: {
    es: {
      title: "Inicia sesión — Tresqu",
      description:
        "Entra a tu dashboard de Tresqu con el número con el que usas el chat. Te enviamos un código de un solo uso por WhatsApp o Telegram.",
    },
    en: {
      title: "Sign in — Tresqu",
      description:
        "Sign in to your Tresqu dashboard with the number you use in the chat. We'll send you a one-time code via WhatsApp or Telegram.",
    },
  },
};

export const notFoundSeo: Dict<{ title: string }> = {
  es: { title: "Página no encontrada — Tresqu" },
  en: { title: "Page not found — Tresqu" },
};
