import type { Dict } from "../types";

export interface AgentTeamCopy {
  sectionLabel: string;
  /** "{pre} {holo}." — estilos en el componente */
  title: { pre: string; holo: string };
  intro: string;
  orchestratorName: string;
  orchestratorRole: string;
  orchestratorDesc: string;
  coordinates: string;
  /** Mismo orden que el array estructural del componente */
  specialists: { name: string; role: string; decides: string }[];
  traceLabel: string;
  trace: {
    userMsg1: string;
    routingIntro: string;
    chipAnalyst: string;
    chipRisk: string;
    /** "{pre}{pct}{mid}{profile}{post}" — spans de color en el componente */
    reply: {
      pre: string;
      pct: string;
      mid: string;
      profile: string;
      post: string;
    };
    userMsg2: string;
    chipWallbit: string;
    prepares: string;
    orderLabel: string;
    orderValue: string;
    riskNote: string;
    confirm: string;
    cancel: string;
    disclaimer: string;
  };
  traceCaption: string;
}

export const agentTeamCopy: Dict<AgentTeamCopy> = {
  es: {
    sectionLabel: "04 · El equipo de agentes",
    title: { pre: "UN EQUIPO QUE DECIDE", holo: "CONTIGO" },
    intro:
      "Detrás de cada mensaje, Tresqu coordina a un equipo de agentes especialistas. Entiende qué quieres, llama a quien corresponde y te responde con una sola voz — tú nunca ves la complejidad.",
    orchestratorName: "Tresqu",
    orchestratorRole: "Orquestador",
    orchestratorDesc:
      "Mantiene la conversación, interpreta lo que pides y delega al especialista correcto. No hace cuentas por su cuenta: reporta exactamente lo que cada agente calcula.",
    coordinates: "Coordina a",
    specialists: [
      {
        name: "Gastos e ingresos",
        role: "Registra y analiza",
        decides:
          "Clasifica cada movimiento, arma resúmenes del mes y encuentra patrones en tu historial.",
      },
      {
        name: "Wallbit",
        role: "Ejecuta inversiones",
        decides:
          "Prepara compras, ventas y movimientos de fondos. Nunca ejecuta sin tu confirmación.",
      },
      {
        name: "Analista de mercado",
        role: "Da contexto, no consejos",
        decides:
          "Trae precio, evolución y fundamentales de una acción y los cruza con tu perfil — sin decirte qué comprar.",
      },
      {
        name: "Perfil de riesgo",
        role: "Te cuida de ti mismo",
        decides:
          "Mide tu tolerancia real desde tu historial y frena las compras que no encajan contigo.",
      },
    ],
    traceLabel: "Un turno real",
    trace: {
      userMsg1: "Tengo 200 USD libres, ¿me conviene meterlos a NVDA?",
      routingIntro: "Tresqu entiende la intención y consulta a:",
      chipAnalyst: "Analista de mercado",
      chipRisk: "Perfil de riesgo",
      reply: {
        pre: "NVDA cae ",
        pct: "-1.2%",
        mid: " hoy y es de las más volátiles del mercado. Tu perfil sale ",
        profile: "moderado",
        post: ", así que 200 USD en una sola acción concentra bastante. ¿La pongo igual?",
      },
      userMsg2: "Sí, cómprala",
      chipWallbit: "Wallbit",
      prepares: "prepara la orden",
      orderLabel: "Comprar NVDA",
      orderValue: "200.00 USD",
      riskNote:
        "Riesgo: concentra tu cuenta. Doble confirmación antes de ejecutar.",
      confirm: "Confirmar",
      cancel: "Cancelar",
      disclaimer: "Dinero real · la orden solo se ejecuta cuando confirmas tú.",
    },
    traceCaption:
      "Varios agentes trabajando en un mismo mensaje. Tú solo ves la respuesta — y decides.",
  },
  en: {
    sectionLabel: "04 · The agent team",
    title: { pre: "A TEAM THAT DECIDES", holo: "WITH YOU" },
    intro:
      "Behind every message, Tresqu coordinates a team of specialist agents. It understands what you want, calls the right one, and answers with a single voice — you never see the complexity.",
    orchestratorName: "Tresqu",
    orchestratorRole: "Orchestrator",
    orchestratorDesc:
      "Keeps the conversation going, interprets what you ask, and delegates to the right specialist. It doesn't do the math on its own: it reports exactly what each agent computes.",
    coordinates: "Coordinates",
    specialists: [
      {
        name: "Expenses & income",
        role: "Logs and analyzes",
        decides:
          "Categorizes every transaction, builds monthly summaries, and finds patterns in your history.",
      },
      {
        name: "Wallbit",
        role: "Executes investments",
        decides:
          "Prepares buys, sells, and fund transfers. It never executes without your confirmation.",
      },
      {
        name: "Market analyst",
        role: "Context, not advice",
        decides:
          "Brings a stock's price, performance, and fundamentals and crosses them with your profile — without telling you what to buy.",
      },
      {
        name: "Risk profile",
        role: "Protects you from yourself",
        decides:
          "Measures your real tolerance from your history and holds back purchases that don't fit you.",
      },
    ],
    traceLabel: "A real turn",
    trace: {
      userMsg1: "I have $200 free — should I put it into NVDA?",
      routingIntro: "Tresqu understands the intent and consults:",
      chipAnalyst: "Market analyst",
      chipRisk: "Risk profile",
      reply: {
        pre: "NVDA is down ",
        pct: "-1.2%",
        mid: " today and it's one of the most volatile stocks out there. Your profile comes out ",
        profile: "moderate",
        post: ", so $200 in a single stock is quite concentrated. Buy it anyway?",
      },
      userMsg2: "Yes, buy it",
      chipWallbit: "Wallbit",
      prepares: "prepares the order",
      orderLabel: "Buy NVDA",
      orderValue: "200.00 USD",
      riskNote:
        "Risk: concentrates your account. Double confirmation before executing.",
      confirm: "Confirm",
      cancel: "Cancel",
      disclaimer: "Real money · the order only executes when you confirm.",
    },
    traceCaption:
      "Several agents working on a single message. You only see the answer — and you decide.",
  },
};
