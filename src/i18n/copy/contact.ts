import type { Dict } from "../types";

export interface ContactCopy {
  sectionLabel: string;
  /** "{line1} / {holo}" — estilos en el componente */
  title: { line1: string; holo: string };
  intro: string;
  fastTitle: string;
  fastSubtitle: string;
  fastCta: string;
}

export const contactCopy: Dict<ContactCopy> = {
  es: {
    sectionLabel: "08 · Contacto",
    title: { line1: "¿TIENES", holo: "PREGUNTAS?" },
    intro: "Estamos aquí para ayudarte. Elige el canal que prefieras.",
    fastTitle: "¿Prefieres una respuesta rápida?",
    fastSubtitle: "Escríbenos por WhatsApp y te respondemos en minutos",
    fastCta: "Chatear ahora",
  },
  en: {
    sectionLabel: "08 · Contact",
    title: { line1: "GOT", holo: "QUESTIONS?" },
    intro: "We're here to help. Pick the channel you prefer.",
    fastTitle: "Prefer a quick answer?",
    fastSubtitle: "Message us on WhatsApp and we'll reply within minutes",
    fastCta: "Chat now",
  },
};
