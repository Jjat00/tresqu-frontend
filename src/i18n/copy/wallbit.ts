import type { Dict } from "../types";

/**
 * Las FAQs deben quedar en sync con el FAQPage del JSON-LD de los shells
 * (/index.html y /en/index.html) y con /llms.txt.
 */
export interface WallbitSectionCopy {
  sectionLabel: string;
  liveBadge: string;
  /** "{line1} / {line2Pre} {line2Holo}." — estilos en el componente */
  title: { line1: string; line2Pre: string; line2Holo: string };
  intro: string;
  capabilities: { title: string; description: string }[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaConnected: string;
  ctaAnonymous: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
}

export const wallbitSectionCopy: Dict<WallbitSectionCopy> = {
  es: {
    sectionLabel: "03 · Inversiones",
    liveBadge: "En vivo",
    title: { line1: "TU COPILOTO,", line2Pre: "NO TU", line2Holo: "CUADERNO" },
    intro:
      "Antes, Tresqu te ayudaba a entender en qué gastabas. Con Wallbit ahora también compra acciones, mueve dinero entre cuentas, alimenta tus metas y bloquea tu tarjeta — desde el mismo chat. Operaciones reales, dinero real.",
    capabilities: [
      {
        title: "Compra y vende por chat",
        description:
          "Acciones, ETFs y bonos desde Wallbit. Le pides la orden al agente y tú la confirmas en el chat antes de ejecutar.",
      },
      {
        title: "Aporta a tus Chests",
        description:
          "Deposita o retira USD de tus Robo Advisors directamente desde la conversación. Tú decides cuándo y cuánto.",
      },
      {
        title: "Mueve fondos entre cuentas",
        description:
          "Pasa saldo de tu cuenta principal a inversión (y al revés) sin abrir Wallbit. Confirmación en el chat.",
      },
      {
        title: "Activa o suspende tu tarjeta",
        description:
          "Si quieres cortar el plástico al instante, le escribes al agente y queda suspendido. Reactívalo cuando lo necesites.",
      },
      {
        title: "Consulta saldos y posiciones",
        description:
          "Pregunta '¿cuánto tengo en Wallbit?' y el agente te trae efectivo por moneda y acciones por símbolo, en vivo.",
      },
      {
        title: "Cruza Tresqu + Wallbit",
        description:
          "Pregunta por significado y el agente cruza tus gastos, ingresos y operaciones Wallbit en una sola respuesta.",
      },
    ],
    ctaTitle: "Conecta tu Wallbit desde el dashboard.",
    ctaSubtitle:
      "Pegas tu API key y listo. Después, cada acción del agente requiere tu confirmación en el chat.",
    ctaConnected: "Conectar en mi cuenta",
    ctaAnonymous: "Empezar y conectar",
    faqTitle: "Preguntas frecuentes",
    faqs: [
      {
        q: "¿Tresqu maneja mi dinero?",
        a: "No. Tu dinero vive en Wallbit. Tresqu solo propone acciones que tú confirmas, con límites que tú defines.",
      },
      {
        q: "¿Mi API key está segura?",
        a: "Sí. La ciframos con encriptación militar Fernet en el backend. Nunca sale al cliente, nunca aparece en logs. Puedes revocarla cuando quieras.",
      },
      {
        q: "¿Cómo conecto mi Wallbit?",
        a: "Entras a tu dashboard de Tresqu, vas a Mi perfil y pegas tu API key. Toma un minuto. Si aún no tienes cuenta Wallbit, abres una y luego la conectas.",
      },
      {
        q: "¿Funciona fuera de USD?",
        a: "Wallbit opera principalmente en USD, con saldos en otras monedas según tu cuenta. El catálogo cubre acciones, ETFs y bonos globales.",
      },
    ],
  },
  en: {
    sectionLabel: "03 · Investing",
    liveBadge: "Live",
    title: { line1: "YOUR COPILOT,", line2Pre: "NOT YOUR", line2Holo: "NOTEBOOK" },
    intro:
      "Tresqu used to help you understand where your money went. With Wallbit it now also buys stocks, moves money between accounts, feeds your goals, and locks your card — from the same chat. Real operations, real money.",
    capabilities: [
      {
        title: "Buy and sell by chat",
        description:
          "Stocks, ETFs, and bonds on Wallbit. You ask the agent for the order and you confirm it in the chat before it executes.",
      },
      {
        title: "Contribute to your Chests",
        description:
          "Deposit or withdraw USD from your Robo Advisors right from the conversation. You decide when and how much.",
      },
      {
        title: "Move funds between accounts",
        description:
          "Transfer balance from your main account to investing (and back) without opening Wallbit. Confirmation in the chat.",
      },
      {
        title: "Activate or pause your card",
        description:
          "Want to freeze the plastic instantly? Message the agent and it's paused. Reactivate it whenever you need.",
      },
      {
        title: "Check balances and positions",
        description:
          "Ask 'how much do I have in Wallbit?' and the agent brings you cash by currency and stocks by symbol, live.",
      },
      {
        title: "Cross Tresqu + Wallbit",
        description:
          "Ask by meaning and the agent crosses your expenses, income, and Wallbit operations in a single answer.",
      },
    ],
    ctaTitle: "Connect your Wallbit from the dashboard.",
    ctaSubtitle:
      "Paste your API key and you're set. After that, every agent action requires your confirmation in the chat.",
    ctaConnected: "Connect in my account",
    ctaAnonymous: "Get started and connect",
    faqTitle: "Frequently asked questions",
    faqs: [
      {
        q: "Does Tresqu handle my money?",
        a: "No. Your money lives in Wallbit. Tresqu only proposes actions that you confirm, with limits you define.",
      },
      {
        q: "Is my API key safe?",
        a: "Yes. We encrypt it with military-grade Fernet encryption on the backend. It never reaches the client, never appears in logs. You can revoke it whenever you want.",
      },
      {
        q: "How do I connect my Wallbit?",
        a: "Go to your Tresqu dashboard, open My profile, and paste your API key. It takes a minute. If you don't have a Wallbit account yet, open one and then connect it.",
      },
      {
        q: "Does it work outside USD?",
        a: "Wallbit operates mainly in USD, with balances in other currencies depending on your account. The catalog covers global stocks, ETFs, and bonds.",
      },
    ],
  },
};
