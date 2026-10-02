import type { Dict } from "../types";

/**
 * Copy de la landing (/ y /en), diseño «Noche de puntos»: hero, por qué,
 * ejemplos (iPhone 3D + carrusel con capturas reales de la app) y FAQ.
 *
 * Espejos que mantener en sync al tocar este copy:
 * - Fallback estático dentro de #root en /index.html (ES) y /en.html (EN).
 * - FAQPage del JSON-LD de ambos shells ↔ `faq.items` (texto idéntico: Google
 *   exige que las preguntas marcadas estén visibles en la página).
 * - /public/llms.txt (sección ES y `## English`) si cambia un hecho.
 *
 * Las cifras de las capturas y del chat son ilustrativas (julio 2026).
 */

/** Ancla de sección: los ids son los mismos en ambos idiomas. */
export const HOME_ANCHORS = {
  why: "por-que",
  examples: "ejemplos",
  faq: "faq",
} as const;

export type CarouselCard =
  | {
      kind: "shot";
      /** Título con una palabra resaltada: "{pre}{em}{post}" */
      title: { pre: string; em: string; post?: string };
      window: string;
      src: string;
      width: number;
      height: number;
      alt: string;
      chip: string;
    }
  | {
      kind: "order";
      title: { pre: string; em: string; post?: string };
      orderTitle: string;
      amount: string;
      currency: string;
      risk: string;
      confirm: string;
      cancel: string;
      chip: string;
    }
  | {
      kind: "risk";
      title: { pre: string; em: string; post?: string };
      label: string;
      value: string;
      note: string;
      chip: string;
    }
  | {
      kind: "lock";
      title: { pre: string; em: string; post?: string };
      value: string;
      note: string;
      chip: string;
    };

export interface HomeCopy {
  whatsappUrl: string;
  telegramUrl: string;
  hero: {
    line1: string;
    line2: string;
    /** Subtítulo con marcas en negrita: piezas alternas texto/negrita */
    sub: { text: string; bold?: boolean }[];
    ctaWhatsApp: string;
    ctaDashboard: string;
    microPre: string;
    microTelegram: string;
    phoneLabel: string;
  };
  why: {
    title: [string, string];
    lead: { text: string; bold?: boolean }[];
    stats: { value: string; label: string; title: string; body: string }[];
  };
  work: {
    eyebrow: string;
    title: [string, string, string, string];
    lead: string;
    phoneLabel: string;
    dragHint: string;
    showEyebrow: string;
    showTitle: [string, string];
    modes: { title: string; body: string }[];
    carouselLabel: string;
    cards: CarouselCard[];
    closingPre: string;
    closingEm: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: { q: string; a: string }[];
  };
  fabLabel: string;
}

export const homeCopy: Dict<HomeCopy> = {
  es: {
    whatsappUrl: "https://wa.me/573116534337?text=Hola%20Tresqu",
    telegramUrl: "https://t.me/tresqu_bot",
    hero: {
      line1: "A un solo mensaje de…",
      line2: "tu plata en orden",
      sub: [
        { text: "Tresqu", bold: true },
        { text: " registra tus gastos, entiende tus ingresos e invierte contigo en " },
        { text: "Wallbit", bold: true },
        { text: ", todo por chat en " },
        { text: "WhatsApp", bold: true },
        { text: ", " },
        { text: "Telegram", bold: true },
        { text: " y la " },
        { text: "web", bold: true },
        { text: ". Sin descargar ninguna app." },
      ],
      ctaWhatsApp: "Empezar en WhatsApp",
      ctaDashboard: "Entrar al dashboard",
      microPre: "Temporalmente, totalmente gratis · También en ",
      microTelegram: "Telegram",
      phoneLabel:
        "Ejemplo: Tresqu registrando gastos en WhatsApp. Arrastra para girar el teléfono.",
    },
    why: {
      title: ["Llevar tus cuentas a mano", "te cuesta tiempo y plata"],
      lead: [
        { text: "Tú quieres vivir.", bold: true },
        { text: " No llenar hojas de cálculo, no adivinar en qué se fue el sueldo, " },
        { text: "no invertir a ciegas.", bold: true },
      ],
      stats: [
        {
          value: "0",
          label: "Apps que descargar",
          title: "Otra app que dejas de abrir",
          body: "Las apps de finanzas piden formularios, categorías y constancia. Tresqu vive en el chat que ya usas: le escribes, le mandas un audio o una foto del recibo, y él registra y categoriza.",
        },
        {
          value: "$0",
          label: "Lo que pagas por Tresqu, por ahora",
          title: "Tener orden no debería costarte",
          body: "Temporalmente, Tresqu es totalmente gratis. Y si conectas Gmail, tus comprobantes de compra se registran solos: ni plata ni tiempo para llevar tus cuentas.",
        },
        {
          value: "100%",
          label: "De las órdenes confirmadas por ti",
          title: "Invertir sin mirar tu bolsillo",
          body: "Antes de preparar una orden en Wallbit, Tresqu cruza tu gasto, tu ingreso y tu perfil de riesgo. Si una compra no encaja, te avisa y pide doble confirmación.",
        },
      ],
    },
    work: {
      eyebrow: "Ejemplos ilustrativos",
      title: ["Escríbele.", "Háblale.", "Tómale foto.", "Invierte."],
      lead: "Así se ve Tresqu funcionando: el chat registra, el dashboard suma y Wallbit espera tu confirmación.",
      phoneLabel:
        "Ejemplo: Tresqu registrando una cena, un audio, una foto de recibo y una compra de Gmail en WhatsApp. Arrastra para girar el teléfono.",
      dragHint: "Arrastra el teléfono para girarlo",
      showEyebrow: "Chat en WhatsApp, Telegram y web",
      showTitle: ["Le cuentas tu día.", "Él lleva las cuentas."],
      modes: [
        { title: "Escríbele", body: "«anoche pagué 20k de cena» → $20.000 COP · Restaurantes" },
        { title: "Háblale", body: "Un audio: «almuerzo con el equipo, 18 mil» → $18.000 COP · Alimentación" },
        { title: "Mándale foto del recibo", body: "Lee el total y el comercio → $47.500 COP · Mercado" },
        { title: "O no hagas nada", body: "Conectas Gmail y la compra se registra sola → $32.900 COP · Compras" },
      ],
      carouselLabel: "Piezas de ejemplo de Tresqu",
      cards: [
        {
          kind: "shot",
          title: { pre: "¿En qué se fue la ", em: "plata", post: "?" },
          window: "tresqu.com · Gastos",
          src: "/landing/app/gastos-graficas.webp",
          width: 1200,
          height: 610,
          alt: "Dashboard web de Tresqu: KPIs y gastos por categoría de julio 2026 (datos de ejemplo)",
          chip: "Ejemplo · Dashboard web",
        },
        {
          kind: "order",
          title: { pre: "Nada se ejecuta sin tu ", em: "sí" },
          orderTitle: "Comprar NVDA",
          amount: "200,00",
          currency: "USD",
          risk: "Concentra tu cuenta · doble confirmación",
          confirm: "Confirmar",
          cancel: "Cancelar",
          chip: "Ejemplo · Dinero real",
        },
        {
          kind: "shot",
          title: { pre: "Tus ingresos, de un ", em: "vistazo" },
          window: "tresqu.com · Ingresos",
          src: "/landing/app/ingresos-graficas.webp",
          width: 1200,
          height: 604,
          alt: "Dashboard web de Tresqu: KPIs e ingresos por categoría de julio 2026 (datos de ejemplo)",
          chip: "Ejemplo · Dashboard web",
        },
        {
          kind: "risk",
          title: { pre: "Invierte como ", em: "eres" },
          label: "Tu perfil de riesgo",
          value: "Moderado",
          note: "Leído de tu gasto, tu ingreso y tus respuestas.",
          chip: "Ejemplo",
        },
        {
          kind: "shot",
          title: { pre: "Mira cómo va tu ", em: "inversión" },
          window: "tresqu.com · Inversiones",
          src: "/landing/app/inversiones-pnl.webp",
          width: 1200,
          height: 516,
          alt: "Dashboard web de Tresqu: ganancia y pérdida de una cuenta de Wallbit en el tiempo (datos de ejemplo)",
          chip: "Ejemplo · Dashboard web",
        },
        {
          kind: "lock",
          title: { pre: "Tu llave, ", em: "cifrada" },
          value: "AES-128",
          note: "Así guardamos tu llave de Wallbit. Tu dinero sigue en Wallbit, no en Tresqu.",
          chip: "Dato real",
        },
        {
          kind: "shot",
          title: { pre: "Llévate tus datos a ", em: "Excel" },
          window: "tresqu.com · Historial",
          src: "/landing/app/gastos-tabla.webp",
          width: 1200,
          height: 696,
          alt: "Dashboard web de Tresqu: historial de gastos de julio 2026 con botón de exportar a Excel (datos de ejemplo)",
          chip: "Ejemplo · Dashboard web",
        },
        {
          kind: "shot",
          title: { pre: "Pregúntale en qué se fue la ", em: "plata" },
          window: "tresqu.com · Agentes",
          src: "/landing/app/agentes-chat.webp",
          width: 1200,
          height: 1096,
          alt: "Chat web de Tresqu: responde cuánto llevas gastado en julio 2026 por categoría y cómo va NVDA en tu portafolio de Wallbit (datos de ejemplo)",
          chip: "Ejemplo · Chat en la web",
        },
      ],
      closingPre: "Empieza con un ",
      closingEm: "hola",
    },
    faq: {
      eyebrow: "Preguntas frecuentes",
      title: "Lo que suelen preguntarnos",
      items: [
        {
          q: "¿Cuánto cuesta Tresqu?",
          a: "Temporalmente, Tresqu es totalmente gratis. Solo necesitas WhatsApp, Telegram o un navegador.",
        },
        {
          q: "¿Tengo que descargar una app?",
          a: "No. Tresqu vive en el chat: le escribes por WhatsApp o Telegram, o entras desde la web. El dashboard se abre en el navegador.",
        },
        {
          q: "¿Tresqu maneja mi dinero?",
          a: "No. Tu dinero vive en Wallbit. Tresqu solo propone acciones que tú confirmas, con límites que tú defines.",
        },
        {
          q: "¿Mi API key de Wallbit está segura?",
          a: "Sí. La ciframos con AES-128 en nuestro servidor. Nunca llega a tu navegador ni aparece en los registros, y puedes revocarla cuando quieras.",
        },
        {
          q: "¿Cómo conecto mi cuenta de Wallbit?",
          a: "Entras a tu dashboard de Tresqu, vas a tu perfil y pegas tu API key. Toma un minuto. Si aún no tienes cuenta en Wallbit, abres una y luego la conectas.",
        },
      ],
    },
    fabLabel: "Escribir a Tresqu por WhatsApp",
  },
  en: {
    whatsappUrl: "https://wa.me/573116534337?text=Hi%20Tresqu",
    telegramUrl: "https://t.me/tresqu_bot",
    hero: {
      line1: "One message away\u00a0from…",
      line2: "your money in order",
      sub: [
        { text: "Tresqu", bold: true },
        { text: " logs your expenses, understands your income, and invests with you on " },
        { text: "Wallbit", bold: true },
        { text: ", all through chat on " },
        { text: "WhatsApp", bold: true },
        { text: ", " },
        { text: "Telegram", bold: true },
        { text: ", and the " },
        { text: "web", bold: true },
        { text: ". No app to download." },
      ],
      ctaWhatsApp: "Start on WhatsApp",
      ctaDashboard: "Go to the dashboard",
      microPre: "Completely free for now · Also on ",
      microTelegram: "Telegram",
      phoneLabel:
        "Example: Tresqu logging expenses on WhatsApp. Drag to rotate the phone.",
    },
    why: {
      title: ["Tracking money by hand", "costs you time and money"],
      lead: [
        { text: "You want to live.", bold: true },
        { text: " Not fill in spreadsheets, not guess where your paycheck went, " },
        { text: "not invest blind.", bold: true },
      ],
      stats: [
        {
          value: "0",
          label: "Apps to download",
          title: "Another app you stop opening",
          body: "Finance apps ask for forms, categories, and discipline. Tresqu lives in the chat you already use: text it, send a voice note or a photo of the receipt, and it logs and categorizes for you.",
        },
        {
          value: "$0",
          label: "What you pay for Tresqu, for now",
          title: "Getting organized shouldn't cost you",
          body: "For now, Tresqu is completely free. And if you connect Gmail, your purchase receipts log themselves: no money and no time spent keeping the books.",
        },
        {
          value: "100%",
          label: "Of orders confirmed by you",
          title: "Investing without checking your wallet",
          body: "Before preparing an order on Wallbit, Tresqu weighs your spending, your income, and your risk profile. If a purchase doesn't fit, it warns you and asks for double confirmation.",
        },
      ],
    },
    work: {
      eyebrow: "Illustrative examples",
      title: ["Text it.", "Talk to it.", "Snap it.", "Invest."],
      lead: "This is Tresqu at work: the chat logs, the dashboard adds it up, and Wallbit waits for your confirmation.",
      phoneLabel:
        "Example: Tresqu logging a dinner, a voice note, a receipt photo, and a Gmail purchase on WhatsApp. Drag to rotate the phone.",
      dragHint: "Drag the phone to rotate it",
      showEyebrow: "Chat on WhatsApp, Telegram, and the web",
      showTitle: ["Tell it about your day.", "It keeps the books."],
      modes: [
        { title: "Text it", body: "“paid 20k for dinner last night” → $20,000 COP · Restaurants" },
        { title: "Talk to it", body: "A voice note: “team lunch, 18 thousand” → $18,000 COP · Food" },
        { title: "Send a photo of the receipt", body: "It reads the total and the merchant → $47,500 COP · Groceries" },
        { title: "Or do nothing", body: "Connect Gmail and the purchase logs itself → $32,900 COP · Shopping" },
      ],
      carouselLabel: "Tresqu examples",
      cards: [
        {
          kind: "shot",
          title: { pre: "Where did the ", em: "money", post: " go?" },
          window: "tresqu.com · Expenses",
          src: "/landing/app/gastos-graficas.webp",
          width: 1200,
          height: 610,
          alt: "Tresqu web dashboard (Spanish UI): July 2026 KPIs and expenses by category (sample data)",
          chip: "Example · Web dashboard",
        },
        {
          kind: "order",
          title: { pre: "Nothing runs without your ", em: "yes" },
          orderTitle: "Buy NVDA",
          amount: "200.00",
          currency: "USD",
          risk: "Concentrates your account · double confirmation",
          confirm: "Confirm",
          cancel: "Cancel",
          chip: "Example · Real money",
        },
        {
          kind: "shot",
          title: { pre: "Your income at a ", em: "glance" },
          window: "tresqu.com · Income",
          src: "/landing/app/ingresos-graficas.webp",
          width: 1200,
          height: 604,
          alt: "Tresqu web dashboard (Spanish UI): July 2026 KPIs and income by category (sample data)",
          chip: "Example · Web dashboard",
        },
        {
          kind: "risk",
          title: { pre: "Invest like ", em: "you" },
          label: "Your risk profile",
          value: "Moderate",
          note: "Read from your spending, your income, and your answers.",
          chip: "Example",
        },
        {
          kind: "shot",
          title: { pre: "See how your ", em: "investment", post: " is doing" },
          window: "tresqu.com · Investments",
          src: "/landing/app/inversiones-pnl.webp",
          width: 1200,
          height: 516,
          alt: "Tresqu web dashboard (Spanish UI): profit and loss of a Wallbit account over time (sample data)",
          chip: "Example · Web dashboard",
        },
        {
          kind: "lock",
          title: { pre: "Your key, ", em: "encrypted" },
          value: "AES-128",
          note: "That's how we store your Wallbit key. Your money stays in Wallbit, not in Tresqu.",
          chip: "Real fact",
        },
        {
          kind: "shot",
          title: { pre: "Take your data to ", em: "Excel" },
          window: "tresqu.com · History",
          src: "/landing/app/gastos-tabla.webp",
          width: 1200,
          height: 696,
          alt: "Tresqu web dashboard (Spanish UI): July 2026 expense history with an export to Excel button (sample data)",
          chip: "Example · Web dashboard",
        },
        {
          kind: "shot",
          title: { pre: "Ask where the ", em: "money", post: " went" },
          window: "tresqu.com · Agents",
          src: "/landing/app/agentes-chat.webp",
          width: 1200,
          height: 1096,
          alt: "Tresqu web chat (Spanish UI): answers how much you spent in July 2026 by category and how NVDA is doing in your Wallbit portfolio (sample data)",
          chip: "Example · Web chat",
        },
      ],
      closingPre: "Start with a ",
      closingEm: "hello",
    },
    faq: {
      eyebrow: "FAQ",
      title: "What people usually ask us",
      items: [
        {
          q: "How much does Tresqu cost?",
          a: "For now, Tresqu is completely free. All you need is WhatsApp, Telegram, or a web browser.",
        },
        {
          q: "Do I need to download an app?",
          a: "No. Tresqu lives in the chat: text it on WhatsApp or Telegram, or use it on the web. The dashboard opens in your browser.",
        },
        {
          q: "Does Tresqu handle my money?",
          a: "No. Your money lives in Wallbit. Tresqu only proposes actions that you confirm, with limits you define.",
        },
        {
          q: "Is my Wallbit API key safe?",
          a: "Yes. We encrypt it with AES-128 on our server. It never reaches your browser or shows up in logs, and you can revoke it whenever you want.",
        },
        {
          q: "How do I connect my Wallbit account?",
          a: "Go to your Tresqu dashboard, open your profile, and paste your API key. It takes a minute. If you don't have a Wallbit account yet, open one and then connect it.",
        },
      ],
    },
    fabLabel: "Message Tresqu on WhatsApp",
  },
};
