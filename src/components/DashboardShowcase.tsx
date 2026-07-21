import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ArrowRight, MousePointer2 } from "lucide-react";
import navItems from "@/components/dashboard/DashboardSidebar";
import ExpensesTab from "@/components/dashboard/ExpensesTab";
import IncomeTab from "@/components/dashboard/IncomeTab";
import InvestmentsTab from "@/components/dashboard/investments/InvestmentsTab";
import {
  demoDateRange,
  seedDemoDashboard,
} from "@/components/showcase/demoDashboardData";
import { pathFor, useCopy, useLocale } from "@/i18n";
import { dashboardShowcaseCopy } from "@/i18n/copy/dashboardShowcase";

const VIEW_IDS = ["expenses", "income", "investments"] as const;
type ViewId = (typeof VIEW_IDS)[number];

const demoViews = navItems.filter((item) =>
  (VIEW_IDS as readonly string[]).includes(item.id),
);

const DWELL_MS = 9500; // tiempo que se queda cada vista (incluye auto-scroll)
const TRAVEL_MS = 900; // viaje del cursor hasta el siguiente tab

/**
 * Vitrina del producto: el dashboard REAL (los mismos tabs de Gastos,
 * Ingresos e Inversiones) montado con un QueryClient sembrado con data de
 * demostración — cero red. Un cursor simulado va haciendo clic entre vistas.
 */
const DashboardShowcase = () => {
  const locale = useLocale();
  const copy = useCopy(dashboardShowcaseCopy);
  // QueryClient propio: enabled:false global → ningún hook llega a la red,
  // todos leen la caché sembrada.
  const [client] = useState(() => {
    const qc = new QueryClient({
      defaultOptions: {
        queries: {
          enabled: false,
          retry: false,
          staleTime: Infinity,
          gcTime: Infinity,
          refetchOnWindowFocus: false,
        },
      },
    });
    seedDemoDashboard(qc);
    return qc;
  });

  const [activeView, setActiveView] = useState<ViewId>("expenses");
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });
  const [clicking, setClicking] = useState(false);

  const idxRef = useRef(0);
  const frameRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  // Con el mouse encima, el visitante toma el control: se pausa el ciclo y
  // el auto-scroll para que pueda explorar la vista a su ritmo.
  const pausedRef = useRef(false);
  const scrollRafRef = useRef(0);

  const cancelAutoScroll = () => cancelAnimationFrame(scrollRafRef.current);

  // Recorre la vista de arriba a abajo con easing suave.
  const startAutoScroll = (duration: number) => {
    const el = contentRef.current;
    if (!el) return;
    cancelAutoScroll();
    const max = el.scrollHeight - el.clientHeight;
    if (max <= 0) return;
    const from = el.scrollTop;
    const start = performance.now();
    const step = (now: number) => {
      if (pausedRef.current) return;
      const t = Math.min(1, (now - start) / duration);
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      el.scrollTop = from + (max - from) * eased;
      if (t < 1) scrollRafRef.current = requestAnimationFrame(step);
    };
    scrollRafRef.current = requestAnimationFrame(step);
  };

  // Al cambiar de vista: volver arriba y recorrerla lentamente.
  useEffect(() => {
    const el = contentRef.current;
    if (el) el.scrollTop = 0;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(
      () => startAutoScroll(DWELL_MS - 4000),
      1400,
    );
    return () => {
      clearTimeout(t);
      cancelAutoScroll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- startAutoScroll solo usa refs, es estable
  }, [activeView]);

  const moveCursorTo = (id: ViewId) => {
    const chip = chipRefs.current[id];
    const frame = frameRef.current;
    if (!chip || !frame) return false;
    const r = chip.getBoundingClientRect();
    const f = frame.getBoundingClientRect();
    setCursor({
      x: r.left - f.left + r.width / 2,
      y: r.top - f.top + r.height / 2,
      visible: true,
    });
    return true;
  };

  // Ciclo automático: mover cursor → clic → cambiar vista → esperar.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => {
      const t = window.setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
      timers.push(t);
    };

    const cycle = () => {
      // Visitante explorando: reintentar en un momento sin cambiar de vista.
      if (pausedRef.current) {
        later(cycle, 1500);
        return;
      }
      const nextIdx = (idxRef.current + 1) % VIEW_IDS.length;
      const next = VIEW_IDS[nextIdx];
      const moved = moveCursorTo(next);
      later(
        () => {
          setClicking(true);
          later(() => {
            setClicking(false);
            idxRef.current = nextIdx;
            setActiveView(next);
            later(cycle, DWELL_MS);
          }, 280);
        },
        moved ? TRAVEL_MS : 0,
      );
    };

    later(cycle, DWELL_MS);
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  const selectView = (id: ViewId) => {
    idxRef.current = VIEW_IDS.indexOf(id);
    setActiveView(id);
  };

  return (
    <section className="relative section-padding bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none section-aura-blue">
        <div className="absolute top-0 left-0 right-0 h-px bg-white/5" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <span className="section-label mb-6">{copy.sectionLabel}</span>
          <h2 className="trii-title text-4xl sm:text-5xl md:text-6xl text-white mb-6">
            {copy.title.pre}{" "}
            <span className="holo-text italic">{copy.title.holo}</span>
            {copy.title.post}
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto">
            {copy.intro}
          </p>
        </div>

        {/* Marco de navegador con el dashboard real adentro */}
        <div className="relative max-w-6xl mx-auto">
          {/* Glow bajo la composición */}
          <div
            className="absolute -inset-8 pointer-events-none"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse 60% 55% at 50% 55%, rgba(0,255,127,0.06), transparent 70%)",
            }}
          />

          <div
            ref={frameRef}
            className="holo-card holo-sheen relative"
            onMouseEnter={() => {
              pausedRef.current = true;
              cancelAutoScroll();
            }}
            onMouseLeave={() => {
              pausedRef.current = false;
            }}
          >
            {/* Chrome del navegador */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06]">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#00FF7F]/40" />
              </div>
              <div className="flex-1 max-w-xs mx-auto px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-center">
                <span className="text-[10px] font-mono text-zinc-500">
                  tresqu.com/dashboard/{activeView}
                </span>
              </div>
              <div className="w-10" aria-hidden="true" />
            </div>

            {/* Nav de secciones (los mismos items del sidebar real) */}
            <div className="flex items-center gap-1 px-3 py-2 border-b border-white/[0.06]">
              {demoViews.map((item) => {
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    ref={(el) => {
                      chipRefs.current[item.id] = el;
                    }}
                    onClick={() => selectView(item.id as ViewId)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      isActive
                        ? item.activeColor
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    <item.icon className="h-3.5 w-3.5" />
                    {item.label}
                  </button>
                );
              })}
              <span className="ml-auto hidden sm:block text-[10px] font-mono text-zinc-600 pr-1">
                {copy.browserBadge}
              </span>
            </div>

            {/* Contenido: tabs reales del dashboard (no interactivos) */}
            <QueryClientProvider client={client}>
              <div className="relative">
                <div
                  ref={contentRef}
                  className="h-[560px] sm:h-[640px] overflow-y-auto overscroll-contain rounded-b-xl"
                >
                  <div
                    key={activeView}
                    className="p-3 sm:p-4 pointer-events-none select-none"
                    aria-hidden="true"
                  >
                    {activeView === "expenses" && (
                      <ExpensesTab
                        selectedMonth="Julio"
                        dateRange={demoDateRange}
                        viewMode="month"
                      />
                    )}
                    {activeView === "income" && (
                      <IncomeTab
                        selectedMonth="Julio"
                        dateRange={demoDateRange}
                        viewMode="week"
                      />
                    )}
                    {activeView === "investments" && <InvestmentsTab />}
                  </div>
                </div>
                {/* Fade inferior: indica que hay más contenido al hacer scroll */}
                <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none rounded-b-xl" />
              </div>
            </QueryClientProvider>

            {/* Cursor simulado */}
            {cursor.visible && (
              <div
                className="absolute z-30 pointer-events-none hidden md:block"
                style={{
                  left: cursor.x,
                  top: cursor.y,
                  transition:
                    "left 0.85s cubic-bezier(0.16,1,0.3,1), top 0.85s cubic-bezier(0.16,1,0.3,1)",
                }}
                aria-hidden="true"
              >
                <span
                  className={`absolute -inset-3 rounded-full border-2 border-[#00FF7F]/70 transition-all duration-200 ${
                    clicking ? "scale-100 opacity-100" : "scale-50 opacity-0"
                  }`}
                />
                <MousePointer2 className="w-5 h-5 -translate-x-1 -translate-y-0.5 text-white fill-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]" />
              </div>
            )}
          </div>
        </div>

        {/* Esto es solo una muestra — lo que también hay adentro */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8 max-w-3xl mx-auto">
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 w-full sm:w-auto text-center">
            {copy.sampleLabel}
          </span>
          {copy.sampleChips.map((item) => (
            <span
              key={item}
              className="px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.02] text-[11px] text-zinc-400"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Micro-copy + CTA */}
        <div className="text-center mt-8">
          <p className="text-zinc-600 text-xs font-mono tracking-wide mb-5">
            {copy.microCopy}
          </p>
          <Link
            to={pathFor("login", locale)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.03] border border-white/10 text-white font-semibold text-sm rounded-md hover:border-[#00FF7F]/40 hover:bg-white/[0.06] transition-colors duration-200 group"
          >
            {copy.cta}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DashboardShowcase;
