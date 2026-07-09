import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import TrendAreaChart from "@/components/dashboard/charts/TrendAreaChart";
import PieChartDisplay from "@/components/dashboard/charts/PieChartDisplay";
import type { DonutChartDataItem } from "@/hooks/useCategoryPieChartData";

// ── Data de demostración (los componentes son los reales del dashboard) ─────
const balanceTimeline = [
  { fecha: "01/07", balance: 1250000 },
  { fecha: "04/07", balance: 1980000 },
  { fecha: "07/07", balance: 1720000 },
  { fecha: "10/07", balance: 2540000 },
  { fecha: "13/07", balance: 2310000 },
  { fecha: "16/07", balance: 3080000 },
  { fecha: "19/07", balance: 2890000 },
  { fecha: "22/07", balance: 3640000 },
  { fecha: "25/07", balance: 4120000 },
  { fecha: "28/07", balance: 3970000 },
  { fecha: "31/07", balance: 4560000 },
];

const categoryData: DonutChartDataItem[] = [
  { name: "Mercado", value: 620000, color: "#4ade80", textColor: "#fff" },
  { name: "Restaurantes", value: 480000, color: "#f472b6", textColor: "#fff" },
  { name: "Transporte", value: 310000, color: "#60a5fa", textColor: "#fff" },
  { name: "Suscripciones", value: 190000, color: "#a78bfa", textColor: "#fff" },
  { name: "Salidas", value: 360000, color: "#fbbf24", textColor: "#fff" },
];

const kpis = [
  { label: "Ingresos del mes", value: "$6.5M", accent: "#00FF7F" },
  { label: "Gastos del mes", value: "$1.96M", accent: "#FF2D95" },
  { label: "Portfolio Wallbit", value: "$3,480 USD", accent: "#0D99FF" },
];

const compactCOP = (value: number) =>
  value >= 1000000
    ? `$${(value / 1000000).toFixed(1)}M`
    : `$${Math.round(value / 1000)}K`;

const noop = () => {};

/** Fila de KPIs con el mismo Card del dashboard. */
const KpiRow = ({ compact = false }: { compact?: boolean }) => (
  <div className={`grid grid-cols-3 ${compact ? "gap-1.5" : "gap-2 sm:gap-3"}`}>
    {kpis.map(({ label, value, accent }) => (
      <Card key={label} className="rounded-md">
        <CardContent
          className={`min-h-0 justify-center ${compact ? "p-2" : "p-2.5 sm:p-4"}`}
        >
          <p
            className={`text-muted-foreground truncate ${compact ? "text-[8px]" : "text-[9px] sm:text-[11px]"}`}
          >
            {label}
          </p>
          <p
            className={`font-bold font-display tracking-tight ${compact ? "text-[11px]" : "text-xs sm:text-lg"}`}
            style={{ color: accent }}
          >
            {value}
          </p>
        </CardContent>
      </Card>
    ))}
  </div>
);

/**
 * Vitrina del producto: el dashboard real (mismos componentes, data de
 * demostración) dentro de marcos de navegador y de teléfono.
 */
const DashboardShowcase = () => {
  return (
    <section className="relative section-padding bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none section-aura-blue">
        <div className="absolute top-0 left-0 right-0 h-px bg-white/5" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <span className="section-label mb-6">El producto</span>
          <h2 className="trii-title text-4xl sm:text-5xl md:text-6xl text-white mb-6">
            ASÍ SE VE TU <span className="holo-text italic">DINERO</span>.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto">
            Todo lo que registras por chat aterriza en un dashboard en vivo:
            balance, gastos por categoría e inversiones, en web y en tu
            teléfono.
          </p>
        </div>

        {/* Composición: browser + teléfono superpuesto */}
        <div className="relative max-w-5xl mx-auto lg:pr-40">
          {/* Glow bajo la composición */}
          <div
            className="absolute -inset-8 pointer-events-none"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse 60% 55% at 45% 55%, rgba(0,255,127,0.07), transparent 70%)",
            }}
          />

          {/* Marco de navegador (desktop) */}
          <div className="holo-card holo-sheen relative overflow-hidden">
            {/* Chrome del navegador */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06]">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#00FF7F]/40" />
              </div>
              <div className="flex-1 max-w-xs mx-auto px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-center">
                <span className="text-[10px] font-mono text-zinc-500">
                  tresqu.com/dashboard
                </span>
              </div>
              <div className="w-10" aria-hidden="true" />
            </div>

            {/* Contenido: componentes reales del dashboard */}
            <div className="p-3 sm:p-5 space-y-3 sm:space-y-4">
              <KpiRow />
              <div className="grid lg:grid-cols-5 gap-3 sm:gap-4">
                <Card className="rounded-md lg:col-span-3">
                  <CardContent className="min-h-0 p-3 sm:p-4 h-full flex flex-col">
                    <p className="text-[11px] sm:text-xs font-semibold text-foreground mb-2">
                      Balance acumulado — Julio
                    </p>
                    <div className="flex-1 min-h-[180px]">
                      <TrendAreaChart
                        data={balanceTimeline}
                        dataKey="balance"
                        xKey="fecha"
                        seriesLabel="Balance"
                        valueFormatter={compactCOP}
                        yWidth={42}
                      />
                    </div>
                  </CardContent>
                </Card>
                <Card className="rounded-md lg:col-span-2 hidden sm:block">
                  <CardContent className="min-h-0 p-3 sm:p-4 h-full flex flex-col">
                    <p className="text-[11px] sm:text-xs font-semibold text-foreground mb-1">
                      Gastos por categoría
                    </p>
                    <div className="flex-1 min-h-[250px]">
                      <PieChartDisplay
                        data={categoryData}
                        onCategoryClick={noop}
                        isLoading={false}
                        error={null}
                        filterSummary=""
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Marco de teléfono (mobile) — superpuesto en desktop, apilado en mobile */}
          <div className="lg:absolute lg:-right-4 lg:top-1/2 lg:-translate-y-1/2 mt-6 lg:mt-0 mx-auto lg:mx-0 w-[240px] animate-float-slow">
            <div className="holo-card holo-sheen rounded-[2rem] p-2 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)]">
              <div className="rounded-[1.6rem] bg-[#0a0a0a] border border-white/[0.06] overflow-hidden">
                {/* Notch */}
                <div className="flex justify-center pt-2 pb-1">
                  <div className="w-16 h-1.5 rounded-full bg-white/10" />
                </div>
                {/* Mini header */}
                <div className="flex items-center justify-between px-3 pb-2">
                  <span className="text-xs font-bold font-display text-white">
                    Tresqu
                  </span>
                  <span className="w-5 h-5 rounded-full bg-[#00FF7F]/15 border border-[#00FF7F]/30 text-[#00FF7F] text-[9px] font-bold flex items-center justify-center">
                    J
                  </span>
                </div>
                <div className="px-2.5 pb-3 space-y-2">
                  <KpiRow compact />
                  <Card className="rounded-md">
                    <CardContent className="min-h-0 p-2">
                      <p className="text-[9px] font-semibold text-foreground mb-1">
                        Balance acumulado
                      </p>
                      <div className="h-[110px]">
                        <TrendAreaChart
                          data={balanceTimeline}
                          dataKey="balance"
                          xKey="fecha"
                          seriesLabel="Balance"
                          valueFormatter={compactCOP}
                          showYAxis={false}
                          showXAxis={false}
                        />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="rounded-md">
                    <CardContent className="min-h-0 p-2 space-y-1.5">
                      {categoryData.slice(0, 3).map((c) => (
                        <div
                          key={c.name}
                          className="flex items-center justify-between text-[9px]"
                        >
                          <span className="flex items-center gap-1.5 text-zinc-400">
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: c.color }}
                            />
                            {c.name}
                          </span>
                          <span className="text-white font-medium">
                            {compactCOP(c.value)}
                          </span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Micro-copy + CTA */}
        <div className="text-center mt-10 lg:mt-14">
          <p className="text-zinc-600 text-xs font-mono tracking-wide mb-5">
            Interfaz real del dashboard · datos de demostración
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.03] border border-white/10 text-white font-semibold text-sm rounded-md hover:border-[#00FF7F]/40 hover:bg-white/[0.06] transition-colors duration-200 group"
          >
            Entrar a mi dashboard
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DashboardShowcase;
