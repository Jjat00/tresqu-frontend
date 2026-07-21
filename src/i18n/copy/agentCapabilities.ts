import type { Dict } from "../types";

export interface AgentCapabilitiesCopy {
  sectionLabel: string;
  /** "{line1} / {line2Pre} {line2Holo}." — estilos en el componente */
  title: { line1: string; line2Pre: string; line2Holo: string };
  intro: string;
  /** Mismo orden que el array de iconos del componente */
  capabilities: { title: string; description: string }[];
}

export const agentCapabilitiesCopy: Dict<AgentCapabilitiesCopy> = {
  es: {
    sectionLabel: "05 · El agente",
    title: { line1: "30+ HERRAMIENTAS", line2Pre: "EN UN", line2Holo: "CHAT" },
    intro:
      "Cada agente del equipo trae sus propias herramientas. Esto es lo que sabe hacer hoy, todo desde el mismo chat.",
    capabilities: [
      {
        title: "Entiende lo que quieres decir",
        description: "Le escribes como a un amigo. El agente interpreta y actúa.",
      },
      {
        title: "Búsqueda por significado",
        description: "Pregunta como hablas. Sin filtros ni categorías exactas.",
      },
      {
        title: "Multi-canal",
        description:
          "WhatsApp, Telegram, Gmail y web. El mismo agente en todos lados.",
      },
      {
        title: "Multi-moneda",
        description: "10+ monedas principales con conversiones automáticas.",
      },
      {
        title: "Lee tus recibos",
        description:
          "Le mandas una foto y Tresqu extrae monto, comercio y categoría.",
      },
      {
        title: "Te escucha",
        description:
          "Mándale un audio y el agente entiende el contexto al instante.",
      },
      {
        title: "Categoriza solo",
        description:
          "Clasifica gastos e ingresos sin que definas reglas manuales.",
      },
      {
        title: "Detecta tus patrones",
        description:
          "Identifica picos, categorías dominantes y hábitos en tu historial.",
      },
      {
        title: "Perfil de riesgo real",
        description:
          "Arma tu perfil de inversor desde tu historial real, no un cuestionario de 5 preguntas.",
      },
      {
        title: "Analiza el mercado",
        description:
          "Pregunta por una acción o ETF: precio, evolución y si encaja con tu perfil — sin decirte qué comprar.",
      },
    ],
  },
  en: {
    sectionLabel: "05 · The agent",
    title: { line1: "30+ TOOLS", line2Pre: "IN ONE", line2Holo: "CHAT" },
    intro:
      "Each agent on the team brings its own tools. This is what it can do today, all from the same chat.",
    capabilities: [
      {
        title: "Understands what you mean",
        description: "Write like you would to a friend. The agent interprets and acts.",
      },
      {
        title: "Search by meaning",
        description: "Ask the way you talk. No filters or exact categories.",
      },
      {
        title: "Multi-channel",
        description:
          "WhatsApp, Telegram, Gmail, and web. The same agent everywhere.",
      },
      {
        title: "Multi-currency",
        description: "10+ major currencies with automatic conversions.",
      },
      {
        title: "Reads your receipts",
        description:
          "Send a photo and Tresqu extracts the amount, merchant, and category.",
      },
      {
        title: "Listens to you",
        description:
          "Send a voice note and the agent gets the context instantly.",
      },
      {
        title: "Categorizes on its own",
        description:
          "Classifies expenses and income without you defining manual rules.",
      },
      {
        title: "Spots your patterns",
        description:
          "Identifies spikes, dominant categories, and habits in your history.",
      },
      {
        title: "Real risk profile",
        description:
          "Builds your investor profile from your real history, not a 5-question quiz.",
      },
      {
        title: "Analyzes the market",
        description:
          "Ask about a stock or ETF: price, performance, and whether it fits your profile — without telling you what to buy.",
      },
    ],
  },
};
