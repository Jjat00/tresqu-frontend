import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MessageSquare,
  Mic,
  Camera,
  Banknote,
  Globe,
  Tags,
  Mail,
  BellRing,
  Reply,
  Brain,
  Trash2,
  Search,
  Sparkles,
  CalendarDays,
  Pencil,
  Hand,
  Wallet,
  ShieldCheck,
  ArrowLeftRight,
  PiggyBank,
  CreditCard,
  LineChart,
  BarChart3,
  Target,
  Gauge,
  TrendingUp,
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
          "\"Gasté 20k en almuerzo ayer\" — Tresqu entiende el monto, la categoría y hasta la fecha. Escribe como hablas.",
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
          "\"Me pagaron 2 millones del proyecto\" — los ingresos se registran y categorizan igual que los gastos.",
      },
      {
        Icon: Globe,
        title: "Multi-moneda",
        description:
          "Cada movimiento en su moneda: COP, USD, EUR y más. Defines tu moneda por defecto y la cambias cuando quieras.",
      },
      {
        Icon: Tags,
        title: "Categoriza solo",
        description:
          "Tresqu asigna la categoría automáticamente y aprende las tuyas: si creas o corriges categorías, las usa.",
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
      "Conecta tu Gmail una vez y Tresqu captura tus compras sin que escribas nada.",
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
      "Todo lo que registras se puede preguntar, editar y borrar desde el mismo chat.",
    accent: "#00FF7F",
    items: [
      {
        Icon: Search,
        title: "Búsqueda por significado",
        description:
          "\"¿Cuánto gasté en salidas el mes pasado?\" — Tresqu entiende la intención, no solo palabras exactas. Encuentra \"la hamburguesa con amigos\" aunque no recuerdes el monto.",
      },
      {
        Icon: Sparkles,
        title: "Resúmenes e insights",
        description:
          "Pide tu resumen del mes y recibe totales por categoría, balance y patrones que Tresqu detecta en tu historial.",
      },
      {
        Icon: CalendarDays,
        title: "Fechas como las dices",
        description:
          "\"Ayer\", \"el viernes\", \"el 3 de mayo\" — los movimientos quedan en la fecha real, no en la del mensaje.",
      },
      {
        Icon: Pencil,
        title: "Edita y elimina por chat",
        description:
          "\"Elimina el gasto de 37.500 de la hamburguesa\" o \"ese fue de transporte\" — Tresqu encuentra el registro y lo corrige o lo borra.",
      },
      {
        Icon: Hand,
        title: "Desliza para referirte",
        description:
          "Cita el mensaje de confirmación de Tresqu (desliza para responder) y di \"elimínalo\" o \"cámbiale la categoría\": Tresqu sabe exactamente de qué registros hablas, sin ambigüedad.",
        channels: ["WhatsApp"],
        isNew: true,
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
          "\"¿Cuánto tengo libre?\", \"¿cómo van mis acciones?\" — efectivo por moneda y posiciones por símbolo, al momento.",
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
          "Transfiere entre tu cuenta principal y la de inversión, o aporta y retira de tus Chests / Robo Advisor.",
      },
      {
        Icon: CreditCard,
        title: "Tarjeta on/off",
        description:
          "Activa o suspende tu tarjeta Wallbit al instante desde el chat.",
      },
      {
        Icon: Gauge,
        title: "Perfil de riesgo que te cuida",
        description:
          "Tresqu mide tu tolerancia real —con preguntas o desde tu propio historial— y te frena con una advertencia extra cuando una compra no encaja contigo.",
      },
      {
        Icon: TrendingUp,
        title: "Analista de mercado",
        description:
          "Precio, evolución histórica y fundamentales de una acción o ETF, cruzados con tu perfil y tu portafolio. Contexto, no consejos: no te dice qué comprar.",
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
        Icon: BarChart3,
        title: "Gastos e ingresos en gráficas",
        description:
          "Totales por categoría, evolución en el tiempo, comparación entre meses y balance acumulado.",
      },
      {
        Icon: LineChart,
        title: "Tu portafolio en el tiempo",
        description:
          "Posiciones Wallbit con su ganancia/pérdida histórica reconstruida día a día, no solo la foto de hoy.",
      },
      {
        Icon: Target,
        title: "Metas de ahorro",
        description:
          "Define metas, registra aportes y sigue el progreso con proyecciones.",
      },
      {
        Icon: Gauge,
        title: "Perfil de riesgo visual",
        description:
          "Tu tolerancia explicada con claridad: qué se midió, por qué, y cómo afecta tus operaciones.",
      },
    ],
  },
];

const channelMatrix = [
  {
    name: "WhatsApp",
    items: ["Texto natural", "Notas de voz", "Fotos de recibos", "Notificaciones de Gmail", "Botones de confirmación Wallbit"],
    highlight: true,
  },
  {
    name: "Telegram",
    items: ["Texto natural", "Notas de voz"],
    highlight: false,
  },
  {
    name: "Web",
    items: ["Chat por texto", "Dashboard completo con gráficas", "Conexión de integraciones (Gmail, Wallbit)"],
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
