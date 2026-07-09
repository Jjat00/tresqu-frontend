import {
  Workflow,
  Receipt,
  TrendingUp,
  LineChart,
  Gauge,
  ShieldCheck,
  CornerDownRight,
} from "lucide-react";

// ── Roster real del sistema multi-agente ────────────────────────────────────
// Fiel a agents/: 1 orquestador (Tresqu) + 4 especialistas.
const specialists = [
  {
    Icon: Receipt,
    name: "Gastos e ingresos",
    role: "Registra y analiza",
    decides:
      "Clasifica cada movimiento, arma resúmenes del mes y encuentra patrones en tu historial.",
  },
  {
    Icon: TrendingUp,
    name: "Wallbit",
    role: "Ejecuta inversiones",
    decides:
      "Prepara compras, ventas y movimientos de fondos. Nunca ejecuta sin tu confirmación.",
    brand: true,
  },
  {
    Icon: LineChart,
    name: "Analista de mercado",
    role: "Da contexto, no consejos",
    decides:
      "Trae precio, evolución y fundamentales de una acción y los cruza con tu perfil — sin decirte qué comprar.",
  },
  {
    Icon: Gauge,
    name: "Perfil de riesgo",
    role: "Te cuida de ti mismo",
    decides:
      "Mide tu tolerancia real desde tu historial y frena las compras que no encajan contigo.",
  },
];

const ACCENT = "#00FF7F";
const WALLBIT = "#0D99FF";

// ── Traza: cómo Tresqu coordina a varios especialistas en un solo turno ──────
const RoutingChip = ({ label, brand }: { label: string; brand?: boolean }) => (
  <span
    className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm border text-[10px] font-medium uppercase tracking-wide"
    style={{
      color: brand ? WALLBIT : ACCENT,
      borderColor: `${brand ? WALLBIT : ACCENT}40`,
    }}
  >
    <span
      className="w-1.5 h-1.5 rounded-full"
      style={{ backgroundColor: brand ? WALLBIT : ACCENT }}
    />
    {label}
  </span>
);

const Trace = () => (
  <div className="holo-card holo-sheen hud-corners p-4 sm:p-5 space-y-3">
    {/* Usuario */}
    <div className="flex justify-end">
      <div className="text-white text-xs sm:text-[13px] leading-snug rounded-md px-3 py-2 max-w-[85%] bg-[#00FF7F]/[0.08] border border-[#00FF7F]/20">
        Tengo 200 USD libres, ¿me conviene meterlos a NVDA?
      </div>
    </div>

    {/* Tresqu enruta */}
    <div className="flex items-start gap-2.5">
      <div className="w-7 h-7 rounded-md bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#00FF7F] flex-shrink-0">
        <Workflow className="w-3.5 h-3.5" />
      </div>
      <div className="space-y-2 min-w-0">
        <p className="text-[11px] text-zinc-500">
          Tresqu entiende la intención y consulta a:
        </p>
        <div className="flex flex-wrap gap-1.5">
          <RoutingChip label="Analista de mercado" />
          <RoutingChip label="Perfil de riesgo" />
        </div>
      </div>
    </div>

    {/* Respuesta con contexto */}
    <div className="flex justify-start">
      <div className="text-zinc-300 text-xs sm:text-[13px] leading-relaxed rounded-md px-3 py-2 max-w-[90%] bg-white/[0.04] border border-white/10">
        NVDA cae <span className="text-red-400 font-medium">-1.2%</span> hoy y es
        de las más volátiles del mercado. Tu perfil sale{" "}
        <span className="text-white font-medium">moderado</span>, así que 200 USD
        en una sola acción concentra bastante. ¿La pongo igual?
      </div>
    </div>

    {/* Usuario confirma intención de compra */}
    <div className="flex justify-end">
      <div className="text-white text-xs sm:text-[13px] leading-snug rounded-md px-3 py-2 max-w-[85%] bg-[#00FF7F]/[0.08] border border-[#00FF7F]/20">
        Sí, cómprala
      </div>
    </div>

    {/* Wallbit prepara orden + gate de riesgo */}
    <div className="flex items-start gap-2.5">
      <div
        className="w-7 h-7 rounded-md bg-white/[0.04] border border-white/10 flex items-center justify-center flex-shrink-0"
        style={{ color: WALLBIT }}
      >
        <TrendingUp className="w-3.5 h-3.5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1.5 mb-2">
          <RoutingChip label="Wallbit" brand />
          <span className="text-[11px] text-zinc-500">prepara la orden</span>
        </div>
        <div className="rounded-md bg-white/[0.03] border border-white/10 p-3 space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-zinc-400">Comprar NVDA</span>
            <span className="text-white font-medium">200.00 USD</span>
          </div>
          <div className="flex items-start gap-1.5 text-[10px] text-amber-400/90 border-t border-white/5 pt-2">
            <ShieldCheck className="w-3 h-3 mt-px flex-shrink-0" />
            <span>
              Riesgo: concentra tu cuenta. Doble confirmación antes de ejecutar.
            </span>
          </div>
          <div className="flex gap-2 pt-0.5">
            <span
              className="flex-1 text-center text-[11px] font-semibold py-1.5 rounded-sm text-black"
              style={{ backgroundColor: WALLBIT }}
            >
              Confirmar
            </span>
            <span className="flex-1 text-center text-[11px] font-medium py-1.5 rounded-sm border border-white/10 text-zinc-400">
              Cancelar
            </span>
          </div>
        </div>
        <p className="text-[10px] text-zinc-600 mt-2">
          Dinero real · la orden solo se ejecuta cuando confirmas tú.
        </p>
      </div>
    </div>
  </div>
);

const AgentTeam = () => {
  return (
    <section
      id="equipo"
      className="relative section-padding bg-[#0a0a0a] scroll-mt-24 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none section-aura-green">
        <div className="absolute inset-0 bg-blueprint" />
        <div className="absolute top-0 left-0 right-0 h-px bg-white/5" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <span className="section-label mb-6">04 · El equipo de agentes</span>
          <h2 className="trii-title text-4xl sm:text-5xl md:text-6xl text-white mb-6">
            UN EQUIPO QUE
            <br />
            DECIDE <span className="holo-text italic">CONTIGO</span>.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto">
            Detrás de cada mensaje, Tresqu coordina a un equipo de agentes
            especialistas. Entiende qué quieres, llama a quien corresponde y te
            responde con una sola voz — tú nunca ves la complejidad.
          </p>
        </div>

        {/* Orquestación: Tresqu + especialistas */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Izquierda — diagrama del equipo */}
          <div>
            {/* Orquestador */}
            <div className="holo-card holo-sheen hud-corners p-5 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-md bg-[#00FF7F]/10 border border-[#00FF7F]/30 flex items-center justify-center text-[#00FF7F]">
                  <Workflow className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white font-bold font-display tracking-tight">
                    Tresqu
                  </p>
                  <p className="text-[#00FF7F] text-xs uppercase tracking-wider font-medium">
                    Orquestador
                  </p>
                </div>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mt-3">
                Mantiene la conversación, interpreta lo que pides y delega al
                especialista correcto. No hace cuentas por su cuenta: reporta
                exactamente lo que cada agente calcula.
              </p>
            </div>

            {/* Conector */}
            <div className="flex items-center gap-2 pl-5 mb-4 text-zinc-600">
              <CornerDownRight className="w-4 h-4" />
              <span className="text-[11px] uppercase tracking-wider font-medium">
                Coordina a
              </span>
            </div>

            {/* Especialistas */}
            <div className="grid sm:grid-cols-2 gap-3">
              {specialists.map(({ Icon, name, role, decides, brand }) => {
                const color = brand ? WALLBIT : ACCENT;
                return (
                  <div
                    key={name}
                    className="group holo-card holo-sheen p-4"
                  >
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <div
                        className="w-9 h-9 rounded-md bg-white/[0.04] border border-white/10 flex items-center justify-center flex-shrink-0"
                        style={{ color }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-white font-semibold text-sm font-display tracking-tight truncate">
                          {name}
                        </p>
                        <p
                          className="text-[10px] uppercase tracking-wider font-medium"
                          style={{ color }}
                        >
                          {role}
                        </p>
                      </div>
                    </div>
                    <p className="text-zinc-500 text-[13px] leading-relaxed">
                      {decides}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Derecha — traza real de coordinación */}
          <div className="lg:pt-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[11px] uppercase tracking-wider font-medium text-zinc-500">
                Un turno real
              </span>
              <span className="h-px flex-1 bg-white/5" />
            </div>
            <Trace />
            <p className="text-zinc-600 text-xs leading-relaxed mt-4 text-center">
              Varios agentes trabajando en un mismo mensaje. Tú solo ves la
              respuesta — y decides.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentTeam;
