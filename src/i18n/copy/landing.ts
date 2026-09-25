import type { Dict } from "../types";

/**
 * Copy de las secciones de la home (debajo del hero). La historia sigue las
 * dos mitades del lema: «Sabe cómo vives» (captura) → «Invierte como eres»
 * (inversión con contexto) → producto → confianza → empezar.
 *
 * Las FAQs deben quedar en sync con el FAQPage del JSON-LD de los shells
 * (/index.html y /en.html) y con /llms.txt.
 */

export type CaptureMode = "text" | "voice" | "photo" | "gmail";

export interface LandingCopy {
  live: {
    eyebrow: string;
    title: string;
    lead: string;
    modes: { id: CaptureMode; title: string; description: string }[];
    chat: {
      status: string;
      text: { user: string; label: string; amount: string; category: string };
      voice: { duration: string; transcript: string; label: string; amount: string; category: string };
      photo: { caption: string; merchant: string; label: string; amount: string; category: string };
      gmail: { notice: string; subject: string; label: string; amount: string; category: string; note: string };
    };
  };
  invest: {
    eyebrow: string;
    title: string;
    lead: string;
    principles: { title: string; description: string }[];
    trace: {
      userMsg1: string;
      consulting: string;
      chipAnalyst: string;
      chipRisk: string;
      /** "{pre}{pct}{mid}{profile}{post}" — spans de color en el componente */
      reply: { pre: string; pct: string; mid: string; profile: string; post: string };
      userMsg2: string;
      orderTitle: string;
      orderValue: string;
      riskNote: string;
      confirm: string;
      cancel: string;
      footnote: string;
    };
  };
  trust: {
    eyebrow: string;
    title: string;
    lead: string;
    facts: { value: string; label: string }[];
    faqTitle: string;
    faqs: { q: string; a: string }[];
  };
  final: {
    title: string;
    lead: string;
    whatsappUrl: string;
    ctaWhatsApp: string;
    ctaTelegram: string;
    micro: string;
  };
}

export const landingCopy: Dict<LandingCopy> = {
  es: {
    live: {
      eyebrow: "Registro sin esfuerzo",
      title: "Sabe cómo vives.",
      lead: "Le cuentas tu día como se lo contarías a alguien. Tresqu entiende, categoriza y lleva la cuenta por ti.",
      modes: [
        { id: "text", title: "Escríbele", description: "Como hablas. Sin formatos ni comandos." },
        { id: "voice", title: "Mándale un audio", description: "Lo transcribe y lo registra en segundos." },
        { id: "photo", title: "Tómale foto al recibo", description: "Lee el monto, el comercio y la categoría." },
        { id: "gmail", title: "O no hagas nada", description: "Conecta Gmail y tus compras llegan solas." },
      ],
      chat: {
        status: "en línea",
        text: { user: "anoche pagué 20k de cena", label: "Registrado", amount: "$20.000 COP", category: "Restaurantes" },
        voice: { duration: "0:04", transcript: "«Almuerzo con el equipo, 18 mil»", label: "Registrado", amount: "$18.000 COP", category: "Alimentación" },
        photo: { caption: "recibo.jpg", merchant: "Tienda Nube", label: "Leído del recibo", amount: "$47.500 COP", category: "Mercado" },
        gmail: { notice: "Nuevo correo de compra", subject: "Tu pedido fue confirmado", label: "Detectado en Gmail", amount: "$32.900 COP", category: "Compras", note: "Lo registré por ti. No tuviste que escribir nada." },
      },
    },
    invest: {
      eyebrow: "Inversiones en Wallbit",
      title: "Invierte como eres.",
      lead: "Tresqu cruza lo que gastas, lo que ganas y tu tolerancia real al riesgo antes de mover un dólar. Compra, vende y mueve fondos en Wallbit desde el mismo chat.",
      principles: [
        { title: "Tu perfil, leído de tu vida real", description: "No un cuestionario de cinco preguntas: tu historial dice cuánto riesgo aguantas." },
        { title: "Contexto, no consejos", description: "Precio, evolución y fundamentales, cruzados con tu portafolio. La decisión es tuya." },
        { title: "Nada se ejecuta sin tu sí", description: "Cada orden espera tu confirmación. Dinero real, con límites que tú defines." },
      ],
      trace: {
        userMsg1: "Tengo 200 USD libres, ¿me conviene meterlos a NVDA?",
        consulting: "Consultando",
        chipAnalyst: "Analista de mercado",
        chipRisk: "Perfil de riesgo",
        reply: {
          pre: "NVDA cae ",
          pct: "-1,2%",
          mid: " hoy y es de las más volátiles del mercado. Tu perfil sale ",
          profile: "moderado",
          post: ", así que 200 USD en una sola acción concentra bastante. ¿La pongo igual?",
        },
        userMsg2: "Sí, cómprala",
        orderTitle: "Comprar NVDA",
        orderValue: "200,00 USD",
        riskNote: "Concentra tu cuenta · doble confirmación",
        confirm: "Confirmar",
        cancel: "Cancelar",
        footnote: "Conversación ilustrativa. La orden solo se ejecuta cuando confirmas tú.",
      },
    },
    trust: {
      eyebrow: "Confianza",
      title: "Tu dinero se queda donde está.",
      lead: "Tu dinero vive en Wallbit, no en Tresqu. El agente propone; tú decides, con límites que tú fijas.",
      facts: [
        { value: "0", label: "apps que descargar" },
        { value: "100%", label: "de las órdenes confirmadas por ti" },
        { value: "AES-128", label: "para cifrar tu llave de Wallbit" },
      ],
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
    final: {
      title: "Empieza con un hola.",
      lead: "Sin descargar apps ni llenar formularios. Tu primer gasto queda registrado en menos de 30 segundos.",
      whatsappUrl: "https://wa.me/573116534337?text=Hola%20Tresqu",
      ctaWhatsApp: "Empezar en WhatsApp",
      ctaTelegram: "Abrir en Telegram",
      micro: "Gratis para empezar · WhatsApp, Telegram y web",
    },
  },
  en: {
    live: {
      eyebrow: "Effortless tracking",
      title: "Knows how you live.",
      lead: "Tell it about your day the way you'd tell a friend. Tresqu understands, categorizes, and keeps the books for you.",
      modes: [
        { id: "text", title: "Text it", description: "The way you talk. No formats, no commands." },
        { id: "voice", title: "Send a voice note", description: "Transcribed and logged in seconds." },
        { id: "photo", title: "Snap the receipt", description: "Reads the amount, merchant, and category." },
        { id: "gmail", title: "Or do nothing", description: "Connect Gmail and purchases log themselves." },
      ],
      chat: {
        status: "online",
        text: { user: "spent $12 on dinner last night", label: "Logged", amount: "$12.00 USD", category: "Restaurants" },
        voice: { duration: "0:04", transcript: "“Team lunch, eighteen bucks”", label: "Logged", amount: "$18.00 USD", category: "Food" },
        photo: { caption: "receipt.jpg", merchant: "Corner Market", label: "Read from receipt", amount: "$47.50 USD", category: "Groceries" },
        gmail: { notice: "New purchase email", subject: "Your order is confirmed", label: "Found in Gmail", amount: "$32.90 USD", category: "Shopping", note: "Logged it for you. You didn't have to type a thing." },
      },
    },
    invest: {
      eyebrow: "Investing on Wallbit",
      title: "Invests like you.",
      lead: "Tresqu weighs what you spend, what you earn, and your real risk tolerance before a single dollar moves. Buy, sell, and move funds on Wallbit from the same chat.",
      principles: [
        { title: "Your profile, read from your real life", description: "Not a five-question quiz: your history shows how much risk you can take." },
        { title: "Context, not advice", description: "Price, trend, and fundamentals, weighed against your portfolio. The call is yours." },
        { title: "Nothing runs without your yes", description: "Every order waits for your confirmation. Real money, within limits you set." },
      ],
      trace: {
        userMsg1: "I have $200 free — should I put it into NVDA?",
        consulting: "Consulting",
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
        orderTitle: "Buy NVDA",
        orderValue: "200.00 USD",
        riskNote: "Concentrates your account · double confirmation",
        confirm: "Confirm",
        cancel: "Cancel",
        footnote: "Illustrative conversation. The order only runs when you confirm.",
      },
    },
    trust: {
      eyebrow: "Trust",
      title: "Your money stays where it is.",
      lead: "Your money lives in Wallbit, not in Tresqu. The agent proposes; you decide, within limits you set.",
      facts: [
        { value: "0", label: "apps to download" },
        { value: "100%", label: "of orders confirmed by you" },
        { value: "AES-128", label: "to encrypt your Wallbit key" },
      ],
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
    final: {
      title: "Start with a hello.",
      lead: "No apps to download, no forms to fill. Your first expense is logged in under 30 seconds.",
      whatsappUrl: "https://wa.me/573116534337?text=Hi%20Tresqu",
      ctaWhatsApp: "Start on WhatsApp",
      ctaTelegram: "Open in Telegram",
      micro: "Free to start · WhatsApp, Telegram, and web",
    },
  },
};
