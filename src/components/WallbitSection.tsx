import {
  TrendingUp,
  ArrowLeftRight,
  PiggyBank,
  CreditCard,
  Wallet,
  Search,
  ChevronDown,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "@/services/authService";

const capabilities = [
  {
    Icon: TrendingUp,
    title: "Compra y vende por chat",
    description:
      "Acciones, ETFs y bonos desde Wallbit. Le pides la orden al agente y tú la confirmas en el chat antes de ejecutar.",
  },
  {
    Icon: PiggyBank,
    title: "Aporta a tus Chests",
    description:
      "Deposita o retira USD de tus Robo Advisors directamente desde la conversación. Tú decides cuándo y cuánto.",
  },
  {
    Icon: ArrowLeftRight,
    title: "Mueve fondos entre cuentas",
    description:
      "Pasa saldo de tu cuenta principal a inversión (y al revés) sin abrir Wallbit. Confirmación en el chat.",
  },
  {
    Icon: CreditCard,
    title: "Activa o suspende tu tarjeta",
    description:
      "Si quieres cortar el plástico al instante, le escribes al agente y queda suspendido. Reactívalo cuando lo necesites.",
  },
  {
    Icon: Wallet,
    title: "Consulta saldos y posiciones",
    description:
      "Pregunta '¿cuánto tengo en Wallbit?' y el agente te trae efectivo por moneda y acciones por símbolo, en vivo.",
  },
  {
    Icon: Search,
    title: "Cruza Tresqu + Wallbit",
    description:
      "Pregunta por significado y el agente cruza tus gastos, ingresos y operaciones Wallbit en una sola respuesta.",
  },
];

const faqs = [
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
];

const WallbitSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- estado de sesión leído al montar
    setIsLoggedIn(isAuthenticated());
  }, []);

  // Logueado: directo a conectar en Integraciones. Anónimo: a login primero.
  const connectHref = isLoggedIn
    ? "/dashboard/account?tab=integraciones"
    : "/login";

  return (
    <section
      id="wallbit"
      className="relative section-padding bg-[#0a0a0a] scroll-mt-24"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-white/5" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <img
                src="/wallbit_logo.png"
                alt="Wallbit"
                className="h-6 sm:h-7 w-auto"
              />
              <span className="text-zinc-600 text-lg">×</span>
              <span className="trii-title text-lg sm:text-xl text-[#00FF7F]">
                Tresqu
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-1 border border-[#0D99FF]/40 rounded-sm">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0D99FF] opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#0D99FF]" />
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#0D99FF] font-semibold">
                  En vivo
                </span>
              </span>
            </div>

            <h2 className="trii-title text-3xl sm:text-4xl md:text-5xl text-white mb-6">
              TU COPILOTO,
              <br />
              NO TU <span className="text-[#0D99FF] italic">CUADERNO</span>.
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
              Antes, Tresqu te ayudaba a entender en qué gastabas. Con Wallbit
              ahora también compra acciones, mueve dinero entre cuentas,
              alimenta tus metas y bloquea tu tarjeta — desde el mismo chat.
              Operaciones reales, dinero real.
            </p>
          </div>

          {/* Right — capabilities */}
          <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
            {capabilities.map(({ Icon, title, description }) => (
              <div
                key={title}
                className="bg-white/[0.02] border border-white/[0.06] p-5 rounded-md transition-colors duration-200 hover:border-white/10"
              >
                <div className="w-10 h-10 rounded-md bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#0D99FF] mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-white font-bold text-base mb-2 font-display tracking-tight">
                  {title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA strip */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-md bg-white/[0.02] border border-white/[0.06] mb-16">
          <div>
            <p className="text-white text-sm sm:text-base font-semibold mb-1">
              Conecta tu Wallbit desde el dashboard.
            </p>
            <p className="text-zinc-500 text-xs sm:text-sm">
              Pegas tu API key y listo. Después, cada acción del agente requiere
              tu confirmación en el chat.
            </p>
          </div>
          <Link
            to={connectHref}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0D99FF] text-black font-semibold rounded-md hover:bg-[#0D99FF]/90 transition-colors text-sm whitespace-nowrap"
          >
            {isLoggedIn ? "Conectar en mi cuenta" : "Empezar y conectar"}
          </Link>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-white text-xl font-bold font-display tracking-tight mb-6 text-center">
            Preguntas frecuentes
          </h3>
          <div className="space-y-2">
            {faqs.map((faq, index) => {
              const open = openIndex === index;
              return (
                <div
                  key={faq.q}
                  className="rounded-md bg-white/[0.02] border border-white/[0.06] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(open ? null : index)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-white text-sm sm:text-base font-medium">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-500 transition-transform ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {open && (
                    <div className="px-5 pb-4 text-zinc-400 text-sm leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WallbitSection;
