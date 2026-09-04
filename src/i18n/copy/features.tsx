import type { ReactNode } from "react";
import type { Dict } from "../types";

export interface FeatureItemCopy {
  title: string;
  description: string;
  channels?: string[];
  isNew?: boolean;
}

export interface FeatureSectionCopy {
  badge: string;
  title: ReactNode;
  intro: string;
  /** Mismo orden que los iconos de sectionStructure en Features.tsx */
  items: FeatureItemCopy[];
}

export interface ChannelMatrixCopy {
  name: string;
  items: string[];
  highlight: boolean;
}

export interface FeaturesPageCopy {
  heroLabel: string;
  heroTitle: ReactNode;
  heroIntro: string;
  navChannels: string;
  newBadge: string;
  recommendedBadge: string;
  sections: FeatureSectionCopy[];
  channelsLabel: string;
  channelsTitle: ReactNode;
  channelsIntro: string;
  channelMatrix: ChannelMatrixCopy[];
  ctaTitle: ReactNode;
  ctaBody: string;
  ctaWhatsApp: string;
  ctaLogin: string;
  whatsappUrl: string;
}

export const featuresPageCopy: Dict<FeaturesPageCopy> = {
  es: {
    heroLabel: "Guía de funciones",
    heroTitle: (
      <>
        TODO LO QUE PUEDES HACER CON{" "}
        <span className="holo-text italic">TRESQU</span>.
      </>
    ),
    heroIntro:
      "Registrar, consultar, corregir e invertir — todo por chat, en los canales que ya usas. Esta es la lista completa, sin letra pequeña.",
    navChannels: "Canales",
    newBadge: "Nuevo",
    recommendedBadge: "Recomendado",
    sections: [
      {
        badge: "Registro",
        title: (
          <>
            REGISTRA COMO <span className="text-[#00FF7F] italic">PREFIERAS</span>.
          </>
        ),
        intro:
          "Sin formularios ni comandos. Le hablas a Tresqu como a una persona y él interpreta, categoriza y guarda.",
        items: [
          {
            title: "Texto natural",
            description:
              '"Gasté 20k en almuerzo" — Tresqu entiende el monto, la categoría y la nota. Escribe como hablas, en tu idioma.',
            channels: ["WhatsApp", "Telegram", "Web"],
          },
          {
            title: "Nota de voz",
            description:
              "Manda un audio y listo: Tresqu lo transcribe, lo entiende y registra el movimiento en segundos.",
            channels: ["WhatsApp", "Telegram"],
          },
          {
            title: "Foto del recibo",
            description:
              "Toma una foto a la factura o recibo y Tresqu extrae monto, comercio y categoría sin que tipees nada.",
            channels: ["WhatsApp"],
          },
          {
            title: "Ingresos también",
            description:
              '"Me pagaron 2 millones del proyecto" — los ingresos se registran y categorizan igual que los gastos, con sus propias categorías.',
          },
          {
            title: "Varios en un mensaje",
            description:
              '"Pagué 20k de comida, 5k de café y 10k de transporte" — Tresqu separa y registra cada movimiento por su lado.',
          },
          {
            title: "Fechas como las dices",
            description:
              '"Ayer", "el sábado", "el 3 de mayo" — el movimiento queda en la fecha real en que ocurrió, no en la del mensaje. Y respeta tu zona horaria.',
          },
          {
            title: "Multi-moneda",
            description:
              "Cada movimiento en su moneda: COP, USD, EUR y más. Defines tu moneda por defecto y, si no especificas, Tresqu usa esa — nunca adivina.",
          },
          {
            title: "Montos como los dices",
            description:
              '"Gasté 90 en una camisa" — si tu moneda es el peso, Tresqu entiende 90.000, no 90 pesos. Lee el contexto de la compra para captar la cifra real; y si dices "90 dólares", respeta eso al pie de la letra.',
            isNew: true,
          },
          {
            title: "Categoriza solo",
            description:
              "Tresqu asigna la categoría automáticamente. ¿Mencionas una que no existe? La crea al vuelo y queda como categoría tuya, con su color.",
          },
        ],
      },
      {
        badge: "Gmail automático",
        title: (
          <>
            TU INBOX SE VUELVE TU{" "}
            <span className="text-[#00FF7F] italic">HOJA DE GASTOS</span>.
          </>
        ),
        intro:
          "Conecta tu Gmail una vez (desde el dashboard, con un par de clics) y Tresqu captura tus compras sin que escribas nada.",
        items: [
          {
            title: "Detección automática",
            description:
              "Tresqu revisa los correos de compras que llegan a tu Gmail y crea el gasto solo: monto, comercio y categoría.",
          },
          {
            title: "Te avisa por WhatsApp",
            description:
              "Cada gasto detectado te llega como notificación al chat, con el detalle completo. Nada pasa a tus espaldas.",
          },
          {
            title: "Corrige respondiendo",
            description:
              '¿La categoría no era esa? Responde a la notificación ("eso fue mercado") y Tresqu la corrige al instante.',
          },
          {
            title: "Memoria de comercios",
            description:
              "Si recategorizaste una compra, la próxima del mismo comercio llega ya con tu categoría. Corriges una vez, no cada vez.",
            isNew: true,
          },
          {
            title: "¿No era un gasto? Bórralo",
            description:
              "Responde a la notificación pidiendo eliminarlo y el registro desaparece. Útil para reembolsos o falsas detecciones.",
            isNew: true,
          },
          {
            title: "Una compra, un registro",
            description:
              "Si la misma compra llega en dos correos (el recibo de la tienda y el aviso de tu tarjeta), Tresqu los reconoce como una sola y registra el gasto una vez, con el mejor nombre del comercio.",
            isNew: true,
          },
          {
            title: "Bajo tu control",
            description:
              "Desde el dashboard ves cuántos gastos e ingresos se han creado desde tu correo, y desconectas Gmail cuando quieras.",
          },
        ],
      },
      {
        badge: "Consulta y control",
        title: (
          <>
            TU HISTORIAL <span className="text-[#00FF7F] italic">RESPONDE</span>.
          </>
        ),
        intro:
          "Todo lo que registras se puede preguntar, corregir y borrar desde el mismo chat.",
        items: [
          {
            title: "Búsqueda por significado",
            description:
              '"¿Cuánto gasté en salidas el mes pasado?" — Tresqu entiende la intención, no solo palabras exactas. Encuentra "la hamburguesa con amigos" aunque no recuerdes el monto.',
          },
          {
            title: "Búsqueda exacta",
            description:
              'También por monto exacto ("el gasto de 37.500"), por categoría o por rango de fechas. Como prefieras preguntar.',
          },
          {
            title: "Resúmenes e insights",
            description:
              "Pide tu resumen del mes: totales por categoría, promedio diario, tus gastos recurrentes y los movimientos fuera de lo normal que Tresqu detecta solo.",
          },
          {
            title: "Edita cualquier registro",
            description:
              'Cambia monto, categoría, fecha o nota por chat: "ese gasto era de 45k", "ponlo en transporte", "fue el martes". Tresqu encuentra el registro y lo actualiza.',
          },
          {
            title: "Elimina por chat",
            description:
              '"Elimina el gasto de la hamburguesa" — Tresqu lo localiza por monto, descripción o contexto de la conversación, te confirma y lo borra.',
          },
          {
            title: "Desliza para referirte",
            description:
              'Cita el mensaje de confirmación de Tresqu (desliza para responder) y di "elimínalo" o "cámbiale la categoría": Tresqu sabe exactamente de qué registros hablas, sin ambigüedad.',
            channels: ["WhatsApp"],
            isNew: true,
          },
          {
            title: "Todo tu historial, cruzado",
            description:
              "Una sola pregunta puede combinar gastos, ingresos y movimientos de tu cuenta Wallbit. Tu vida financiera completa en una respuesta.",
          },
        ],
      },
      {
        badge: "Inversiones · Wallbit",
        title: (
          <>
            INVIERTE SIN SALIR DEL{" "}
            <span className="text-[#0D99FF] italic">CHAT</span>.
          </>
        ),
        intro:
          "Conecta tu cuenta Wallbit y opera desde la conversación. Tu dinero vive en Wallbit; Tresqu prepara, tú confirmas.",
        items: [
          {
            title: "Saldos y posiciones en vivo",
            description:
              '"¿Cuánto tengo libre?", "¿cómo van mis acciones?" — efectivo por cuenta y posiciones por símbolo con su ganancia/pérdida, al momento.',
          },
          {
            title: "Explora el catálogo",
            description:
              "Busca acciones, ETFs y bonos por nombre, símbolo o categoría, y pide la ficha completa: precio, sector, dividendos y descripción.",
          },
          {
            title: "Compra y venta con confirmación",
            description:
              "Tresqu prepara la orden y te muestra el detalle; solo se ejecuta cuando tú confirmas con el botón. Operaciones reales, nunca a tus espaldas.",
          },
          {
            title: "Mueve fondos",
            description:
              "Transfiere entre tu cuenta principal y la de inversión con la misma confirmación explícita.",
          },
          {
            title: "Robo Advisor (Chests)",
            description:
              "Aporta o retira de tus Chests desde el chat. Tresqu te reporta el neto aportado con total transparencia.",
          },
          {
            title: "Tarjeta on/off",
            description:
              "Activa o suspende tu tarjeta Wallbit al instante desde el chat.",
          },
          {
            title: "Pausa el agente cuando quieras",
            description:
              "¿Prefieres que Tresqu no opere por un tiempo? Páusalo desde el chat o el dashboard (1 hora a 1 semana) y reanúdalo cuando tú decidas.",
          },
          {
            title: "Historial y pendientes",
            description:
              "Consulta tus transacciones Wallbit (compras, ventas, depósitos, pagos con tarjeta) por tipo y fecha, y revisa o cancela operaciones pendientes desde el dashboard.",
          },
        ],
      },
      {
        badge: "Analista y riesgo",
        title: (
          <>
            CONTEXTO, NO <span className="text-[#0D99FF] italic">CONSEJOS</span>.
          </>
        ),
        intro:
          "Un analista que te explica el mercado y un perfil de riesgo que te conoce. Ninguno te dice qué comprar.",
        items: [
          {
            title: "Ficha de cualquier activo",
            description:
              "Precio actual, cambio del día, rango de 52 semanas, sector y dividendos de una acción o ETF — aunque no tengas cuenta Wallbit.",
          },
          {
            title: "Evolución histórica",
            description:
              '"¿Cómo le ha ido a NVDA este año?" — la evolución del precio en el rango que pidas: desde 1 día hasta el histórico completo.',
          },
          {
            title: "Perfil de riesgo real",
            description:
              "Un cuestionario guiado por chat que puedes pausar y retomar, más una inferencia automática desde tu propio historial. Tresqu combina ambos y se queda con el más prudente.",
          },
          {
            title: "Te frena cuando no encaja",
            description:
              "Si una compra no va con tu tolerancia, Tresqu te lo advierte y te pide una confirmación extra. Nunca te bloquea: te cuida.",
          },
          {
            title: "Análisis con tu contexto",
            description:
              "El analista cruza el activo con tu perfil de riesgo y tu portafolio: concentración, diversificación y qué significa para ti. Educativo, no prescriptivo.",
          },
        ],
      },
      {
        badge: "Dashboard web",
        title: (
          <>
            Y CUANDO QUIERAS <span className="text-[#00FF7F] italic">VERLO</span>{" "}
            TODO.
          </>
        ),
        intro:
          "El chat registra; el dashboard te lo muestra. Entra desde cualquier navegador con tu cuenta.",
        items: [
          {
            title: "Entra sin contraseña",
            description:
              "Pides un código de un solo uso que te llega por WhatsApp o Telegram y listo. Nada que recordar ni que te puedan robar.",
          },
          {
            title: "Gráficas de gastos e ingresos",
            description:
              "Donut por categoría (haz clic y filtra), barras por mes, tendencias en el tiempo, comparación mensual y balance acumulado. Con filtro de fechas global.",
          },
          {
            title: "Tablas que se editan",
            description:
              "Busca y filtra tus movimientos, edita gastos e ingresos con un formulario (monto, moneda, categoría y fecha) y elimínalos con confirmación, sin salir de la tabla.",
          },
          {
            title: "Exporta a Excel",
            description:
              "Descarga tus gastos e ingresos del período que elijas en un archivo XLSX, listo para tu contador o tus propias hojas de cálculo.",
          },
          {
            title: "Categorías a tu manera",
            description:
              "Crea, edita y elimina tus categorías de gastos y de ingresos con nombre, color, descripción y ejemplos. Los colores se reflejan en todas las gráficas y Tresqu las usa para clasificar por chat.",
          },
          {
            title: "Tu portafolio en el tiempo",
            description:
              "Ganancia/pérdida histórica de tus inversiones reconstruida día a día (1 día a todo el histórico), posiciones en vivo, distribución por activo y explorador de precios por símbolo.",
          },
          {
            title: "El equipo, también en la web",
            description:
              "Chatea con el supervisor o con cada especialista desde el módulo Agentes, o desde el dock contextual que te acompaña en cada sección con sugerencias según lo que estás viendo.",
          },
          {
            title: "Perfil de riesgo visual",
            description:
              "Tu tolerancia explicada con un radar de 5 dimensiones (ahorro, estabilidad, apetito, reserva…), de dónde salió cada dato y un botón para reevaluarte cuando quieras.",
          },
          {
            title: "Tu cuenta, tu control",
            description:
              "Cambia tu nombre, moneda por defecto y zona horaria; conecta o desconecta Gmail y Wallbit; reemplaza tu API key o pausa el agente. Todo en un solo lugar.",
          },
        ],
      },
    ],
    channelsLabel: "Canales",
    channelsTitle: (
      <>
        EL MISMO TRESQU, DONDE TÚ{" "}
        <span className="holo-text italic">ESTÉS</span>.
      </>
    ),
    channelsIntro:
      "Las funciones son las mismas en todos los canales; lo que cambia es cómo entra el mensaje.",
    channelMatrix: [
      {
        name: "WhatsApp",
        items: [
          "Texto natural",
          "Notas de voz",
          "Fotos de recibos",
          "Notificaciones de Gmail",
          "Citar mensajes (deslizar para responder)",
          "Botones de confirmación Wallbit",
          "Código de acceso a la web",
        ],
        highlight: true,
      },
      {
        name: "Telegram",
        items: [
          "Texto natural",
          "Notas de voz",
          "Comandos rápidos (/start, /registrar)",
          "Código de acceso a la web",
        ],
        highlight: false,
      },
      {
        name: "Web",
        items: [
          "Chat por texto con todo el equipo",
          "Dashboard completo con gráficas y tablas",
          "Exportación a Excel",
          "Gestión de categorías",
          "Conexión de integraciones (Gmail, Wallbit)",
          "Perfil de riesgo y preferencias",
        ],
        highlight: false,
      },
    ],
    ctaTitle: (
      <>
        PRUÉBALO EN UN <span className="holo-text italic">MENSAJE</span>.
      </>
    ),
    ctaBody:
      "Escríbele a Tresqu por WhatsApp y registra tu primer gasto en menos de un minuto. Sin descargas, sin formularios.",
    ctaWhatsApp: "Probar en WhatsApp",
    ctaLogin: "Ingresar a mi cuenta",
    whatsappUrl:
      "https://wa.me/573116534337?text=Hola%20Tresqu%2C%20quiero%20empezar",
  },
  en: {
    heroLabel: "Feature guide",
    heroTitle: (
      <>
        EVERYTHING YOU CAN DO WITH{" "}
        <span className="holo-text italic">TRESQU</span>.
      </>
    ),
    heroIntro:
      "Log, query, correct, and invest — all by chat, in the channels you already use. This is the full list, no fine print.",
    navChannels: "Channels",
    newBadge: "New",
    recommendedBadge: "Recommended",
    sections: [
      {
        badge: "Logging",
        title: (
          <>
            LOG IT <span className="text-[#00FF7F] italic">YOUR WAY</span>.
          </>
        ),
        intro:
          "No forms, no commands. You talk to Tresqu like a person and it interprets, categorizes, and saves.",
        items: [
          {
            title: "Natural text",
            description:
              '"Spent $12 on lunch" — Tresqu gets the amount, the category, and the note. Write the way you talk, in your language.',
            channels: ["WhatsApp", "Telegram", "Web"],
          },
          {
            title: "Voice note",
            description:
              "Send a voice note and that's it: Tresqu transcribes it, understands it, and logs the transaction in seconds.",
            channels: ["WhatsApp", "Telegram"],
          },
          {
            title: "Receipt photo",
            description:
              "Snap a photo of the invoice or receipt and Tresqu extracts the amount, merchant, and category without you typing anything.",
            channels: ["WhatsApp"],
          },
          {
            title: "Income too",
            description:
              '"Got paid $2,000 for the project" — income gets logged and categorized just like expenses, with its own categories.',
          },
          {
            title: "Several in one message",
            description:
              '"Paid $8 for food, $3 for coffee, and $4 for transport" — Tresqu splits and logs each transaction on its own.',
          },
          {
            title: "Dates the way you say them",
            description:
              '"Yesterday", "on Saturday", "May 3rd" — the transaction lands on the date it actually happened, not the date of the message. And it respects your timezone.',
          },
          {
            title: "Multi-currency",
            description:
              "Every transaction in its currency: COP, USD, EUR, and more. You set your default currency and, if you don't specify one, Tresqu uses it — it never guesses.",
          },
          {
            title: "Amounts the way you say them",
            description:
              '"Spent 90 on a shirt" — if your currency is the Colombian peso, Tresqu reads 90,000, not 90 pesos. It reads the purchase context to catch the real figure; and if you say "90 dollars", it takes that literally.',
            isNew: true,
          },
          {
            title: "Categorizes on its own",
            description:
              "Tresqu assigns the category automatically. Mention one that doesn't exist? It creates it on the fly and it becomes yours, with its own color.",
          },
        ],
      },
      {
        badge: "Automatic Gmail",
        title: (
          <>
            YOUR INBOX BECOMES YOUR{" "}
            <span className="text-[#00FF7F] italic">EXPENSE SHEET</span>.
          </>
        ),
        intro:
          "Connect your Gmail once (from the dashboard, a couple of clicks) and Tresqu captures your purchases without you typing anything.",
        items: [
          {
            title: "Automatic detection",
            description:
              "Tresqu scans the purchase emails that land in your Gmail and creates the expense on its own: amount, merchant, and category.",
          },
          {
            title: "Notifies you on WhatsApp",
            description:
              "Every detected expense reaches your chat as a notification with the full detail. Nothing happens behind your back.",
          },
          {
            title: "Fix it by replying",
            description:
              'Wrong category? Reply to the notification ("that was groceries") and Tresqu corrects it instantly.',
          },
          {
            title: "Merchant memory",
            description:
              "If you recategorized a purchase, the next one from the same merchant arrives with your category already set. You correct once, not every time.",
            isNew: true,
          },
          {
            title: "Not an expense? Delete it",
            description:
              "Reply to the notification asking to remove it and the record disappears. Handy for refunds or false detections.",
            isNew: true,
          },
          {
            title: "One purchase, one record",
            description:
              "If the same purchase arrives in two emails (the store receipt and your card alert), Tresqu recognizes them as one and logs the expense once, with the best merchant name.",
            isNew: true,
          },
          {
            title: "Under your control",
            description:
              "From the dashboard you see how many expenses and income entries were created from your inbox, and you can disconnect Gmail whenever you want.",
          },
        ],
      },
      {
        badge: "Query & control",
        title: (
          <>
            YOUR HISTORY <span className="text-[#00FF7F] italic">ANSWERS</span>.
          </>
        ),
        intro:
          "Everything you log can be queried, corrected, and deleted from the same chat.",
        items: [
          {
            title: "Search by meaning",
            description:
              '"How much did I spend on going out last month?" — Tresqu understands the intent, not just exact words. It finds "the burger with friends" even if you don\'t remember the amount.',
          },
          {
            title: "Exact search",
            description:
              'Also by exact amount ("the $37.50 expense"), by category, or by date range. Ask however you prefer.',
          },
          {
            title: "Summaries & insights",
            description:
              "Ask for your monthly summary: totals by category, daily average, your recurring expenses, and the out-of-pattern transactions Tresqu spots on its own.",
          },
          {
            title: "Edit any record",
            description:
              'Change amount, category, date, or note by chat: "that expense was $45", "put it under transport", "it was on Tuesday". Tresqu finds the record and updates it.',
          },
          {
            title: "Delete by chat",
            description:
              '"Delete the burger expense" — Tresqu locates it by amount, description, or conversation context, confirms with you, and removes it.',
          },
          {
            title: "Swipe to refer",
            description:
              'Quote Tresqu\'s confirmation message (swipe to reply) and say "delete it" or "change the category": Tresqu knows exactly which records you mean, no ambiguity.',
            channels: ["WhatsApp"],
            isNew: true,
          },
          {
            title: "Your whole history, crossed",
            description:
              "A single question can combine expenses, income, and your Wallbit account activity. Your complete financial life in one answer.",
          },
        ],
      },
      {
        badge: "Investing · Wallbit",
        title: (
          <>
            INVEST WITHOUT LEAVING THE{" "}
            <span className="text-[#0D99FF] italic">CHAT</span>.
          </>
        ),
        intro:
          "Connect your Wallbit account and operate from the conversation. Your money lives in Wallbit; Tresqu prepares, you confirm.",
        items: [
          {
            title: "Live balances & positions",
            description:
              '"How much do I have free?", "how are my stocks doing?" — cash by account and positions by symbol with their profit/loss, up to the minute.',
          },
          {
            title: "Explore the catalog",
            description:
              "Search stocks, ETFs, and bonds by name, symbol, or category, and ask for the full profile: price, sector, dividends, and description.",
          },
          {
            title: "Buy & sell with confirmation",
            description:
              "Tresqu prepares the order and shows you the detail; it only executes when you confirm with the button. Real operations, never behind your back.",
          },
          {
            title: "Move funds",
            description:
              "Transfer between your main account and your investment account with the same explicit confirmation.",
          },
          {
            title: "Robo Advisor (Chests)",
            description:
              "Contribute to or withdraw from your Chests from the chat. Tresqu reports the net contributed with full transparency.",
          },
          {
            title: "Card on/off",
            description:
              "Activate or pause your Wallbit card instantly from the chat.",
          },
          {
            title: "Pause the agent whenever you want",
            description:
              "Prefer Tresqu not to operate for a while? Pause it from the chat or the dashboard (1 hour to 1 week) and resume whenever you decide.",
          },
          {
            title: "History & pending",
            description:
              "Check your Wallbit transactions (buys, sells, deposits, card payments) by type and date, and review or cancel pending operations from the dashboard.",
          },
        ],
      },
      {
        badge: "Analyst & risk",
        title: (
          <>
            CONTEXT, NOT <span className="text-[#0D99FF] italic">ADVICE</span>.
          </>
        ),
        intro:
          "An analyst that explains the market and a risk profile that knows you. Neither tells you what to buy.",
        items: [
          {
            title: "Any asset's profile",
            description:
              "Current price, day's change, 52-week range, sector, and dividends for a stock or ETF — even without a Wallbit account.",
          },
          {
            title: "Historical performance",
            description:
              '"How has NVDA done this year?" — price evolution over the range you ask for: from 1 day to the full history.',
          },
          {
            title: "Real risk profile",
            description:
              "A chat-guided questionnaire you can pause and resume, plus automatic inference from your own history. Tresqu combines both and keeps the more prudent one.",
          },
          {
            title: "Slows you down when it doesn't fit",
            description:
              "If a purchase doesn't match your tolerance, Tresqu warns you and asks for an extra confirmation. It never blocks you: it looks out for you.",
          },
          {
            title: "Analysis with your context",
            description:
              "The analyst crosses the asset with your risk profile and portfolio: concentration, diversification, and what it means for you. Educational, not prescriptive.",
          },
        ],
      },
      {
        badge: "Web dashboard",
        title: (
          <>
            AND WHEN YOU WANT TO{" "}
            <span className="text-[#00FF7F] italic">SEE IT ALL</span>.
          </>
        ),
        intro:
          "The chat logs; the dashboard shows it. Sign in from any browser with your account.",
        items: [
          {
            title: "Sign in without a password",
            description:
              "Request a one-time code that arrives via WhatsApp or Telegram and you're in. Nothing to remember, nothing to steal.",
          },
          {
            title: "Expense & income charts",
            description:
              "Donut by category (click to filter), bars by month, trends over time, monthly comparison, and cumulative balance. With a global date filter.",
          },
          {
            title: "Tables you can edit",
            description:
              "Search and filter your transactions, edit expenses and income with a form (amount, currency, category and date), and delete them with confirmation — without leaving the table.",
          },
          {
            title: "Export to Excel",
            description:
              "Download your expenses and income for any period as an XLSX file, ready for your accountant or your own spreadsheets.",
          },
          {
            title: "Categories your way",
            description:
              "Create, edit, and delete your expense and income categories with name, color, description, and examples. The colors show up across every chart, and Tresqu uses them to classify from chat.",
          },
          {
            title: "Your portfolio over time",
            description:
              "Historical profit/loss of your investments rebuilt day by day (1 day to full history), live positions, allocation by asset, and a price explorer by symbol.",
          },
          {
            title: "The team, on the web too",
            description:
              "Chat with the supervisor or each specialist from the Agents module, or from the contextual dock that follows you through every section with suggestions based on what you're looking at.",
          },
          {
            title: "Visual risk profile",
            description:
              "Your tolerance explained with a 5-dimension radar (savings, stability, appetite, reserve…), where each data point came from, and a button to reassess whenever you want.",
          },
          {
            title: "Your account, your control",
            description:
              "Change your name, default currency, and timezone; connect or disconnect Gmail and Wallbit; replace your API key or pause the agent. All in one place.",
          },
        ],
      },
    ],
    channelsLabel: "Channels",
    channelsTitle: (
      <>
        THE SAME TRESQU, WHEREVER{" "}
        <span className="holo-text italic">YOU ARE</span>.
      </>
    ),
    channelsIntro:
      "The features are the same across channels; what changes is how the message comes in.",
    channelMatrix: [
      {
        name: "WhatsApp",
        items: [
          "Natural text",
          "Voice notes",
          "Receipt photos",
          "Gmail notifications",
          "Quote messages (swipe to reply)",
          "Wallbit confirmation buttons",
          "Web sign-in code",
        ],
        highlight: true,
      },
      {
        name: "Telegram",
        items: [
          "Natural text",
          "Voice notes",
          "Quick commands (/start, /registrar)",
          "Web sign-in code",
        ],
        highlight: false,
      },
      {
        name: "Web",
        items: [
          "Text chat with the whole team",
          "Full dashboard with charts and tables",
          "Excel export",
          "Category management",
          "Integration setup (Gmail, Wallbit)",
          "Risk profile and preferences",
        ],
        highlight: false,
      },
    ],
    ctaTitle: (
      <>
        TRY IT IN ONE <span className="holo-text italic">MESSAGE</span>.
      </>
    ),
    ctaBody:
      "Message Tresqu on WhatsApp and log your first expense in under a minute. No downloads, no forms.",
    ctaWhatsApp: "Try it on WhatsApp",
    ctaLogin: "Sign in to my account",
    whatsappUrl:
      "https://wa.me/573116534337?text=Hi%20Tresqu%2C%20I%20want%20to%20get%20started",
  },
};
