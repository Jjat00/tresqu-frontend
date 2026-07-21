import type { Dict } from "../types";

export interface PassiveCaptureCopy {
  sectionLabel: string;
  /** "{line1} / {line2Pre} {line2Holo}." — estilos en el componente */
  title: { line1: string; line2Pre: string; line2Holo: string };
  intro: string;
  capabilities: { title: string; description: string; tag: string }[];
}

export const passiveCaptureCopy: Dict<PassiveCaptureCopy> = {
  es: {
    sectionLabel: "02 · Captura pasiva",
    title: {
      line1: "NO REGISTRES.",
      line2Pre: "DEJA QUE TRESQU LO",
      line2Holo: "HAGA",
    },
    intro:
      "Tres formas en las que el agente captura tu actividad financiera sin que muevas un dedo.",
    capabilities: [
      {
        title: "Gmail automático",
        description:
          "Conecta tu correo y Tresqu detecta compras en tus emails sin que tengas que escribir nada. Tu inbox se vuelve tu hoja de gastos.",
        tag: "Pasivo",
      },
      {
        title: "Recibos por foto",
        description:
          "Manda una foto de tu factura o recibo y Tresqu lee el monto, el comercio y la categoría automáticamente. Sin tipear nada.",
        tag: "Vision AI",
      },
      {
        title: "Pregunta por significado",
        description:
          "'¿Cuánto gasté en salidas el mes pasado?' — Tresqu entiende lo que quieres decir, no solo palabras sueltas. Sin filtros ni categorías exactas.",
        tag: "Conversacional",
      },
    ],
  },
  en: {
    sectionLabel: "02 · Passive capture",
    title: {
      line1: "DON'T LOG IT.",
      line2Pre: "LET TRESQU DO",
      line2Holo: "IT",
    },
    intro:
      "Three ways the agent captures your financial activity without you lifting a finger.",
    capabilities: [
      {
        title: "Automatic Gmail",
        description:
          "Connect your inbox and Tresqu detects purchases in your emails without you typing anything. Your inbox becomes your expense sheet.",
        tag: "Passive",
      },
      {
        title: "Receipts by photo",
        description:
          "Send a photo of your invoice or receipt and Tresqu reads the amount, merchant, and category automatically. No typing.",
        tag: "Vision AI",
      },
      {
        title: "Ask by meaning",
        description:
          "'How much did I spend on going out last month?' — Tresqu understands what you mean, not just loose keywords. No filters or exact categories.",
        tag: "Conversational",
      },
    ],
  },
};
