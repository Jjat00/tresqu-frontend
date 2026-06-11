import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MessageSquare,
  Mic,
  Camera,
  Banknote,
  ListPlus,
  CalendarDays,
  Globe,
  Coins,
  Tags,
  Mail,
  BellRing,
  Reply,
  Brain,
  Trash2,
  Search,
  Filter,
  Sparkles,
  Pencil,
  Hand,
  Layers,
  Wallet,
  Compass,
  ShieldCheck,
  ArrowLeftRight,
  PiggyBank,
  CreditCard,
  Pause,
  TrendingUp,
  LineChart,
  Gauge,
  ShieldAlert,
  BarChart3,
  Table2,
  FileSpreadsheet,
  Palette,
  MessagesSquare,
  Radar,
  Settings2,
  KeyRound,
  type LucideIcon,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const WHATSAPP_URL =
  "https://wa.me/573116534337?text=Hola%20Tresqu%2C%20quiero%20empezar";

interface FeatureItem {
  Icon: LucideIcon;
  title: string;
  description: string;
  channels?: string[];
  isNew?: boolean;
}

interface FeatureSection {
  id: string;
  badge: string;
  title: React.ReactNode;
  intro: string;
  accent: string;
  items: FeatureItem[];
}

const sections: FeatureSection[] = [
  {
    id: "registro",
    badge: "Registro",
    title: (
      <>
        REGISTRA COMO <span className="text-[#00FF7F] italic">PREFIERAS</span>.
      </>
    ),
    intro:
      "Sin formularios ni comandos. Le hablas a Tresqu como a una persona y él interpreta, categoriza y guarda.",
    accent: "#00FF7F",
    items: [
      {
        Icon: MessageSquare,
        title: "Texto natural",
        description:
          "\"Gasté 20k en almuerzo\" — Tresqu entiende el monto, la categoría y la nota. Escribe como hablas, en tu idioma.",
        channels: ["WhatsApp", "Telegram", "Web"],
      },
      {
        Icon: Mic,
        title: "Nota de voz",
        description:
          "Manda un audio y listo: Tresqu lo transcribe, lo entiende y registra el movimiento en segundos.",
        channels: ["WhatsApp", "Telegram"],
      },
      {
        Icon: Camera,
        title: "Foto del recibo",
        description:
          "Toma una foto a la factura o recibo y Tresqu extrae monto, comercio y categoría sin que tipees nada.",
        channels: ["WhatsApp"],
      },
      {
        Icon: Banknote,
        title: "Ingresos también",
        description:
          "\"Me pagaron 2 millones del proyecto\" — los ingresos se registran y categorizan igual que los gastos, con sus propias categorías.",
      },
      {
        Icon: ListPlus,
        title: "Varios en un mensaje",
        description:
          "\"Pagué 20k de comida, 5k de café y 10k de transporte\" — Tresqu separa y registra cada movimiento por su lado.",
      },
      {
        Icon: CalendarDays,
        title: "Fechas como las dices",
        description:
          "\"Ayer\", \"el sábado\", \"el 3 de mayo\" — el movimiento queda en la fecha real en que ocurrió, no en la del mensaje. Y respeta tu zona horaria.",
      },
      {
        Icon: Globe,
        title: "Multi-moneda",
        description:
          "Cada movimiento en su moneda: COP, USD, EUR y más. Defines tu moneda por defecto y, si no especificas, Tresqu usa esa — nunca adivina.",
      },
      {
        Icon: Coins,
        title: "Montos como los dices",
        description:
          "\"Gasté 90 en una camisa\" — si tu moneda es el peso, Tresqu entiende 90.000, no 90 pesos. Lee el contexto de la compra para captar la cifra real; y si dices \"90 dólares\", respeta eso al pie de la letra.",
        isNew: true,
      },
      {
        Icon: Tags,
        title: "Categoriza solo",
        description:
          "Tresqu asigna la categoría automáticamente. ¿Mencionas una que no existe? La crea al vuelo y queda como categoría tuya, con su color.",
      },
    ],
  },
  {
    id: "gmail",
    badge: "Gmail automático",
    title: (
      <>
        TU INBOX SE VUELVE TU{" "}
        <span className="text-[#00FF7F] italic">HOJA DE GASTOS</span>.
      </>
    ),
    intro:
      "Conecta tu Gmail una vez (desde el dashboard, con un par de clics) y Tresqu captura tus compras sin que escribas nada.",
    accent: "#00FF7F",
    items: [
      {
        Icon: Mail,
        title: "Detección automática",
        description:
          "Tresqu revisa los correos de compras que llegan a tu Gmail y crea el gasto solo: monto, comercio y categoría.",
      },
      {
        Icon: BellRing,
        title: "Te avisa por WhatsApp",
        description:
          "Cada gasto detectado te llega como notificación al chat, con el detalle completo. Nada pasa a tus espaldas.",
      },
      {
        Icon: Reply,
        title: "Corrige respondiendo",
        description:
          "¿La categoría no era esa? Responde a la notificación (\"eso fue mercado\") y Tresqu la corrige al instante.",
      },
      {
        Icon: Brain,
        title: "Memoria de comercios",
        description:
          "Si recategorizaste una compra, la próxima del mismo comercio llega ya con tu categoría. Corriges una vez, no cada vez.",
        isNew: true,
      },
      {
        Icon: Trash2,
        title: "¿No era un gasto? Bórralo",
        description:
          "Responde a la notificación pidiendo eliminarlo y el registro desaparece. Útil para reembolsos o correos duplicados.",
        isNew: true,
      },
      {
        Icon: Settings2,
        title: "Bajo tu control",
        description:
          "Desde el dashboard ves cuántos gastos e ingresos se han creado desde tu correo, y desconectas Gmail cuando quieras.",
      },
    ],
  },
  {
    id: "control",
    badge: "Consulta y control",
    title: (
      <>
        TU HISTORIAL{" "}
        <span className="text-[#00FF7F] italic">RESPONDE</span>.
      </>
    ),
    intro:
      "Todo lo que registras se puede preguntar, corregir y borrar desde el mismo chat.",
    accent: "#00FF7F",
    items: [
      {
        Icon: Search,
        title: "Búsqueda por significado",
        description:
          "\"¿Cuánto gasté en salidas el mes pasado?\" — Tresqu entiende la intención, no solo palabras exactas. Encuentra \"la hamburguesa con amigos\" aunque no recuerdes el monto.",
      },
      {
        Icon: Filter,
        title: "Búsqueda exacta",
        description:
          "También por monto exacto (\"el gasto de 37.500\"), por categoría o por rango de fechas. Como prefieras preguntar.",
      },
      {
        Icon: Sparkles,
        title: "Resúmenes e insights",
        description:
          "Pide tu resumen del mes: totales por categoría, promedio diario, tus gastos recurrentes y los movimientos fuera de lo normal que Tresqu detecta solo.",
      },
      {
        Icon: Pencil,
        title: "Edita cualquier registro",
        description:
          "Cambia monto, categoría, fecha o nota por chat: \"ese gasto era de 45k\", \"ponlo en transporte\", \"fue el martes\". Tresqu encuentra el registro y lo actualiza.",
      },
      {
        Icon: Trash2,
        title: "Elimina por chat",
        description:
          "\"Elimina el gasto de la hamburguesa\" — Tresqu lo localiza por monto, descripción o contexto de la conversación, te confirma y lo borra.",
      },
      {
        Icon: Hand,
        title: "Desliza para referirte",
        description:
          "Cita el mensaje de confirmación de Tresqu (desliza para responder) y di \"elimínalo\" o \"cámbiale la categoría\": Tresqu sabe exactamente de qué registros hablas, sin ambigüedad.",
        channels: ["WhatsApp"],
        isNew: true,
      },
      {
        Icon: Layers,
        title: "Todo tu historial, cruzado",
        description:
          "Una sola pregunta puede combinar gastos, ingresos y movimientos de tu cuenta Wallbit. Tu vida financiera completa en una respuesta.",
      },
    ],
  },
  {
    id: "inversiones",
    badge: "Inversiones · Wallbit",
    title: (
      <>
        INVIERTE SIN SALIR DEL{" "}
        <span className="text-[#0D99FF] italic">CHAT</span>.
      </>
    ),
    intro:
      "Conecta tu cuenta Wallbit y opera desde la conversación. Tu dinero vive en Wallbit; Tresqu prepara, tú confirmas.",
    accent: "#0D99FF",
    items: [
      {
        Icon: Wallet,
        title: "Saldos y posiciones en vivo",
        description:
          "\"¿Cuánto tengo libre?\", \"¿cómo van mis acciones?\" — efectivo por cuenta y posiciones por símbolo con su ganancia/pérdida, al momento.",
      },
      {
        Icon: Compass,
        title: "Explora el catálogo",
        description:
          "Busca acciones, ETFs y bonos por nombre, símbolo o categoría, y pide la ficha completa: precio, sector, dividendos y descripción.",
      },
      {
        Icon: ShieldCheck,
        title: "Compra y venta con confirmación",
        description:
          "Tresqu prepara la orden y te muestra el detalle; solo se ejecuta cuando tú confirmas con el botón. Operaciones reales, nunca a tus espaldas.",
      },
      {
        Icon: ArrowLeftRight,
        title: "Mueve fondos",
        description:
          "Transfiere entre tu cuenta principal y la de inversión con la misma confirmación explícita.",
      },
      {
        Icon: PiggyBank,
        title: "Robo Advisor (Chests)",
        description:
          "Aporta o retira de tus Chests desde el chat. Tresqu te reporta el neto aportado con total transparencia.",
      },
      {
        Icon: CreditCard,
        title: "Tarjeta on/off",
        description:
          "Activa o suspende tu tarjeta Wallbit al instante desde el chat.",
      },
      {
        Icon: Pause,
        title: "Pausa el agente cuando quieras",
        description:
          "¿Prefieres que Tresqu no opere por un tiempo? Páusalo desde el chat o el dashboard (1 hora a 1 semana) y reanúdalo cuando tú decidas.",
      },
      {
        Icon: Table2,
        title: "Historial y pendientes",
        description:
          "Consulta tus transacciones Wallbit (compras, ventas, depósitos, pagos con tarjeta) por tipo y fecha, y revisa o cancela operaciones pendientes desde el dashboard.",
      },
    ],
  },
  {
    id: "analisis",
    badge: "Analista y riesgo",
    title: (
      <>
        CONTEXTO, NO <span className="text-[#0D99FF] italic">CONSEJOS</span>.
      </>
    ),
    intro:
      "Un analista que te explica el mercado y un perfil de riesgo que te conoce. Ninguno te dice qué comprar.",
    accent: "#0D99FF",
    items: [
      {
        Icon: TrendingUp,
        title: "Ficha de cualquier activo",
        description:
          "Precio actual, cambio del día, rango de 52 semanas, sector y dividendos de una acción o ETF — aunque no tengas cuenta Wallbit.",
      },
      {
        Icon: LineChart,
        title: "Evolución histórica",
        description:
          "\"¿Cómo le ha ido a NVDA este año?\" — la evolución del precio en el rango que pidas: desde 1 día hasta el histórico completo.",
      },
      {
        Icon: Gauge,
        title: "Perfil de riesgo real",
        description:
          "Un cuestionario guiado por chat que puedes pausar y retomar, más una inferencia automática desde tu propio historial. Tresqu combina ambos y se queda con el más prudente.",
      },
      {
        Icon: ShieldAlert,
        title: "Te frena cuando no encaja",
        description:
          "Si una compra no va con tu tolerancia, Tresqu te lo advierte y te pide una confirmación extra. Nunca te bloquea: te cuida.",
      },
      {
        Icon: Layers,
        title: "Análisis con tu contexto",
        description:
          "El analista cruza el activo con tu perfil de riesgo y tu portafolio: concentración, diversificación y qué significa para ti. Educativo, no prescriptivo.",
      },
    ],
  },
  {
    id: "dashboard",
    badge: "Dashboard web",
    title: (
      <>
        Y CUANDO QUIERAS <span className="text-[#00FF7F] italic">VERLO</span>{" "}
        TODO.
      </>
    ),
    intro:
      "El chat registra; el dashboard te lo muestra. Entra desde cualquier navegador con tu cuenta.",
    accent: "#00FF7F",
    items: [
      {
        Icon: KeyRound,
        title: "Entra sin contraseña",
        description:
          "Pides un código de un solo uso que te llega por WhatsApp o Telegram y listo. Nada que recordar ni que te puedan robar.",
      },
      {
        Icon: BarChart3,
        title: "Gráficas de gastos e ingresos",
        description:
          "Donut por categoría (haz clic y filtra), barras por mes, tendencias en el tiempo, comparación mensual y balance acumulado. Con filtro de fechas global.",
      },
      {
        Icon: Table2,
        title: "Tablas que se editan",
        description:
          "Busca y filtra tus movimientos, edita gastos con un formulario y elimina gastos o ingresos con confirmación, sin salir de la tabla.",
      },
      {
        Icon: FileSpreadsheet,
        title: "Exporta a Excel",
        description:
          "Descarga tus gastos e ingresos del período que elijas en un archivo XLSX, listo para tu contador o tus propias hojas de cálculo.",
      },
      {
        Icon: Palette,
        title: "Categorías a tu manera",
        description:
          "Crea, edita y elimina tus categorías con nombre, color y descripción. Los colores se reflejan en todas las gráficas.",
      },
      {
        Icon: LineChart,
        title: "Tu portafolio en el tiempo",
        description:
          "Ganancia/pérdida histórica de tus inversiones reconstruida día a día (1 día a todo el histórico), posiciones en vivo, distribución por activo y explorador de precios por símbolo.",
      },
      {
        Icon: MessagesSquare,
        title: "El equipo, también en la web",
        description:
          "Chatea con el supervisor o con cada especialista desde el módulo Agentes, o desde el dock contextual que te acompaña en cada sección con sugerencias según lo que estás viendo.",
      },
      {
        Icon: Radar,
        title: "Perfil de riesgo visual",
        description:
          "Tu tolerancia explicada con un radar de 5 dimensiones (ahorro, estabilidad, apetito, reserva…), de dónde salió cada dato y un botón para reevaluarte cuando quieras.",
      },
      {
        Icon: Settings2,
        title: "Tu cuenta, tu control",
        description:
          "Cambia tu nombre, moneda por defecto y zona horaria; conecta o desconecta Gmail y Wallbit; reemplaza tu API key o pausa el agente. Todo en un solo lugar.",
      },
    ],
  },
];

const channelMatrix = [
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
];

const FeatureCard = ({ Icon, title, description, channels, isNew }: FeatureItem & { accent: string }) => (
  <div className="relative bg-white/[0.02] border border-white/[0.06] p-6 lg:p-8 rounded-md transition-colors duration-200 hover:border-white/10">
    <div className="flex items-start justify-between mb-6">
      <div className="w-11 h-11 rounded-md bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#00FF7F]">
        <Icon className="w-5 h-5" />
      </div>
      {isNew && (
        <span className="px-2 py-0.5 border border-[#00FF7F]/30 bg-[#00FF7F]/5 rounded-sm text-[10px] uppercase tracking-wider text-[#00FF7F] font-medium">
          Nuevo
        </span>
      )}
    </div>
    <h3 className="text-xl font-bold text-white mb-3 font-display tracking-tight">
      {title}
    </h3>
    <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
    {channels && (
      <div className="flex flex-wrap gap-1.5 mt-4">
        {channels.map((channel) => (
          <span
            key={channel}
            className="px-2 py-0.5 border border-white/10 rounded-sm text-[10px] uppercase tracking-wider text-zinc-500 font-medium"
          >
            {channel}
          </span>
        ))}
      </div>
    )}
  </div>
);

const Features = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const previousTitle = document.title;
    document.title = "Funciones — Todo lo que puedes hacer con Tresqu";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-foreground">
      <Header />

      {/* Hero */}
      <section className="relative pt-36 md:pt-44 pb-16 md:pb-20">
        <div className="container max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 border border-[#00FF7F]/25 rounded-sm text-[#00FF7F] text-xs uppercase tracking-wider font-medium mb-6">
              Guía de funciones
            </span>
            <h1 className="trii-title text-4xl sm:text-5xl md:text-6xl text-white mb-6">
              TODO LO QUE PUEDES HACER CON{" "}
              <span className="text-[#00FF7F] italic">TRESQU</span>.
            </h1>
            <p className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto mb-10">
              Registrar, consultar, corregir e invertir — todo por chat, en los
              canales que ya usas. Esta es la lista completa, sin letra
              pequeña.
            </p>
            {/* Quick nav */}
            <nav className="flex flex-wrap justify-center gap-2">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="px-3 py-1.5 bg-white/[0.02] border border-white/[0.08] rounded-sm text-xs font-medium text-zinc-400 hover:text-white hover:border-white/20 transition-colors duration-200"
                >
                  {section.badge}
                </a>
              ))}
              <a
                href="#canales"
                className="px-3 py-1.5 bg-white/[0.02] border border-white/[0.08] rounded-sm text-xs font-medium text-zinc-400 hover:text-white hover:border-white/20 transition-colors duration-200"
              >
                Canales
              </a>
            </nav>
          </div>
        </div>
      </section>

      {/* Feature sections */}
      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="relative section-padding bg-[#0a0a0a] scroll-mt-24"
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-px bg-white/5" />
          </div>
          <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mb-12 md:mb-16">
              <span
                className="inline-block px-3 py-1 border rounded-sm text-xs uppercase tracking-wider font-medium mb-6"
                style={{
                  color: section.accent,
                  borderColor: `${section.accent}40`,
                }}
              >
                {section.badge}
              </span>
              <h2 className="trii-title text-3xl sm:text-4xl md:text-5xl text-white mb-5">
                {section.title}
              </h2>
              <p className="text-zinc-400 text-base sm:text-lg max-w-xl">
                {section.intro}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {section.items.map((item) => (
                <FeatureCard key={item.title} {...item} accent={section.accent} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Channel matrix */}
      <section id="canales" className="relative section-padding bg-[#0a0a0a] scroll-mt-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-white/5" />
        </div>
        <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mb-12 md:mb-16">
            <span className="inline-block px-3 py-1 border border-[#00FF7F]/25 rounded-sm text-[#00FF7F] text-xs uppercase tracking-wider font-medium mb-6">
              Canales
            </span>
            <h2 className="trii-title text-3xl sm:text-4xl md:text-5xl text-white mb-5">
              EL MISMO TRESQU, DONDE TÚ{" "}
              <span className="text-[#00FF7F] italic">ESTÉS</span>.
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg max-w-xl">
              Las funciones son las mismas en todos los canales; lo que cambia
              es cómo entra el mensaje.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {channelMatrix.map((channel) => (
              <div
                key={channel.name}
                className={`bg-white/[0.02] border p-6 lg:p-8 rounded-md ${
                  channel.highlight
                    ? "border-[#00FF7F]/25"
                    : "border-white/[0.06]"
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white font-display tracking-tight">
                    {channel.name}
                  </h3>
                  {channel.highlight && (
                    <span className="px-2 py-0.5 border border-[#00FF7F]/30 bg-[#00FF7F]/5 rounded-sm text-[10px] uppercase tracking-wider text-[#00FF7F] font-medium">
                      Recomendado
                    </span>
                  )}
                </div>
                <ul className="space-y-3">
                  {channel.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-zinc-400"
                    >
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-[#00FF7F] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative section-padding bg-[#0a0a0a]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-white/5" />
        </div>
        <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center bg-white/[0.02] border border-white/[0.06] rounded-md p-10 md:p-14">
            <h2 className="trii-title text-3xl sm:text-4xl text-white mb-5">
              PRUÉBALO EN UN <span className="text-[#00FF7F] italic">MENSAJE</span>.
            </h2>
            <p className="text-zinc-400 text-base mb-8 max-w-md mx-auto">
              Escríbele a Tresqu por WhatsApp y registra tu primer gasto en
              menos de un minuto. Sin descargas, sin formularios.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#00FF7F] text-black font-semibold text-sm rounded-md hover:bg-[#00CC66] transition-colors duration-200"
              >
                Probar en WhatsApp
              </a>
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-6 py-3 bg-white/[0.03] border border-white/10 text-white font-semibold text-sm rounded-md hover:bg-white/[0.06] hover:border-white/20 transition-colors duration-200"
              >
                Ingresar a mi cuenta
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Features;
