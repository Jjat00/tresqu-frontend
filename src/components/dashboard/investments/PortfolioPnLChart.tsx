import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Info } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { usePnLTimeline } from "@/hooks/useInvestments";
import { NEON } from "@/lib/chartColors";
import type { PnLPeriod } from "@/types/wallbit";

const PERIODS: Array<{ value: PnLPeriod; label: string }> = [
  { value: "1d", label: "1D" },
  { value: "1w", label: "1S" },
  { value: "1m", label: "1M" },
  { value: "2m", label: "2M" },
  { value: "6m", label: "6M" },
  { value: "1y", label: "1A" },
  { value: "ytd", label: "YTD" },
  { value: "all", label: "Todo" },
];

const PERIOD_PHRASE: Record<PnLPeriod, string> = {
  "1d": "en el día",
  "1w": "vs hace 1 semana",
  "1m": "vs hace 1 mes",
  "2m": "vs hace 2 meses",
  "6m": "vs hace 6 meses",
  "1y": "vs hace 1 año",
  ytd: "en lo que va del año",
  all: "desde el inicio",
};

const fmtSignedUsd = (v: number) =>
  `${v >= 0 ? "+" : "−"}${Math.abs(v).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  })}`;

const fmtPct = (v: number) => `${v >= 0 ? "+" : "−"}${Math.abs(v).toFixed(2)}%`;

const fmtAxisUsd = (v: number) => {
  const sign = v < 0 ? "−" : "";
  const abs = Math.abs(v);
  return `${sign}$${abs >= 1000 ? `${(abs / 1000).toFixed(1)}k` : abs.toFixed(0)}`;
};

const fmtDate = (s: string) =>
  new Date(s).toLocaleDateString("es-ES", { day: "2-digit", month: "short" });

const fmtTime = (s: string) =>
  new Date(s).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });

const fmtSessionDate = (d: Date) =>
  d.toLocaleDateString("es-ES", { weekday: "short", day: "2-digit", month: "short" });

const config: ChartConfig = {
  pnl: { label: "Ganancia/pérdida", color: NEON.green },
};

const PortfolioPnLChart = () => {
  const [period, setPeriod] = useState<PnLPeriod>("1m");
  const { data, isLoading, error } = usePnLTimeline(period);

  // Default inteligente: si el mes (default) no tiene historial suficiente
  // (cuenta nueva), saltar al intradía 1D, que muestra el movimiento de hoy.
  // Solo una vez y nunca por encima de una elección manual del usuario.
  const autoAdjusted = useRef(false);
  useEffect(() => {
    if (autoAdjusted.current) return;
    if (!isLoading && data && period === "1m") {
      autoAdjusted.current = true;
      if ((data.points?.length ?? 0) <= 1) setPeriod("1d");
    }
  }, [isLoading, data, period]);

  const isIntraday = period === "1d";

  const rawId = useId().replace(/:/g, "");
  const strokeId = `pnl-stroke-${rawId}`;
  const fillId = `pnl-fill-${rawId}`;

  const chartData = useMemo(
    () =>
      (data?.points ?? []).map((p) => ({
        date: p.date,
        pnl: parseFloat(p.pnl_usd || "0"),
        pct: p.pnl_pct,
        value: parseFloat(p.market_value_usd || "0"),
        invested: parseFloat(p.invested_total_usd || "0"),
      })),
    [data],
  );

  // P&L de hoy = último punto (anclado al valor en vivo por el backend).
  const last = chartData[chartData.length - 1];
  const first = chartData[0];
  const todayPnl = last?.pnl ?? 0;
  const todayPct = last?.pct ?? 0;
  // Variación de la ganancia/pérdida en el período (hoy vs inicio del rango).
  const periodDelta = last && first ? last.pnl - first.pnl : 0;

  const todayPositive = todayPnl >= 0;
  const deltaPositive = periodDelta >= 0;

  // En el intradía (1D), el último punto trae el timestamp de la última barra de
  // la sesión mostrada. Si esa fecha no es hoy (fin de semana/feriado) o la
  // última cotización ya tiene rato, el mercado está cerrado y la curva queda
  // congelada en el cierre — lo indicamos para que no parezca un dato roto.
  const sessionDate = isIntraday && last?.date ? new Date(last.date) : null;
  const isTodaySession = sessionDate
    ? sessionDate.toDateString() === new Date().toDateString()
    : true;
  const lastTickAgeMin = sessionDate
    ? (Date.now() - sessionDate.getTime()) / 60000
    : 0;
  const marketClosed = isIntraday && (!isTodaySession || lastTickAgeMin > 15);

  // Offset del gradiente justo donde la curva cruza 0 (verde arriba, rojo abajo).
  const { max, min } = useMemo(() => {
    const vals = chartData.map((d) => d.pnl);
    return {
      max: Math.max(0, ...vals),
      min: Math.min(0, ...vals),
    };
  }, [chartData]);
  const zeroOffset = max <= 0 ? 0 : min >= 0 ? 1 : max / (max - min);

  return (
    <Card className="glass-card">
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <CardTitle className="text-base flex items-center gap-2">
            Ganancia / pérdida
            {data?.stale && (
              <span
                className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-medium text-amber-400"
                title="Serie aproximada: falta histórico de precio de algún activo o hay movimientos antiguos sin cantidad exacta de acciones. El punto de hoy sí es exacto."
              >
                <Info className="h-2.5 w-2.5" />
                aprox.
              </span>
            )}
            {marketClosed && (
              <span
                className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
                title="El mercado de EE. UU. está cerrado; la curva muestra la última sesión bursátil congelada en su cierre."
              >
                Mercado cerrado
              </span>
            )}
          </CardTitle>
          {!isLoading && last && (
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span
                className={`text-2xl font-semibold tabular-nums ${todayPositive ? "text-emerald-400" : "text-red-400"}`}
              >
                {fmtSignedUsd(todayPnl)}
              </span>
              <span
                className={`text-sm tabular-nums ${todayPositive ? "text-emerald-400/80" : "text-red-400/80"}`}
              >
                {fmtPct(todayPct)}
              </span>
              <span
                className={`inline-flex items-center gap-0.5 text-xs tabular-nums ${deltaPositive ? "text-emerald-400" : "text-red-400"}`}
              >
                {deltaPositive ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                {fmtSignedUsd(periodDelta)} {PERIOD_PHRASE[period]}
              </span>
            </div>
          )}
          {isIntraday && !isTodaySession && sessionDate && (
            <p className="text-xs text-muted-foreground">
              Sesión del {fmtSessionDate(sessionDate)} · última cotización al cierre
            </p>
          )}
        </div>
        <ToggleGroup
          type="single"
          className="flex-wrap justify-start sm:justify-end"
          value={period}
          onValueChange={(v) => {
            if (!v) return;
            autoAdjusted.current = true; // el usuario tomó el control
            setPeriod(v as PnLPeriod);
          }}
          size="sm"
        >
          {PERIODS.map((p) => (
            <ToggleGroupItem key={p.value} value={p.value} className="h-7 px-2 text-xs">
              {p.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </CardHeader>
      <CardContent className="h-[300px]">
        {isLoading ? (
          <Skeleton className="h-full w-full rounded-md" />
        ) : error || chartData.length <= 1 ? (
          <div className="flex h-full items-center justify-center px-6 text-center text-sm text-muted-foreground">
            {error
              ? "No se pudo cargar la evolución de ganancias/pérdidas."
              : isIntraday
                ? "Todavía no hay movimiento intradía para mostrar."
                : "Llevás poco invirtiendo: aún no hay suficiente historial para este período. Probá 1D para ver el movimiento de hoy."}
          </div>
        ) : (
          <ChartContainer config={config} className="h-full w-full">
            <AreaChart data={chartData} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
              <defs>
                {/* Trazo: verde por encima de 0, rojo por debajo. */}
                <linearGradient id={strokeId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset={zeroOffset} stopColor={NEON.green} />
                  <stop offset={zeroOffset} stopColor={NEON.red} />
                </linearGradient>
                {/* Relleno con el mismo corte en 0, desvanecido. */}
                <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={NEON.green} stopOpacity={0.28} />
                  <stop offset={zeroOffset} stopColor={NEON.green} stopOpacity={0.04} />
                  <stop offset={zeroOffset} stopColor={NEON.red} stopOpacity={0.04} />
                  <stop offset="100%" stopColor={NEON.red} stopOpacity={0.28} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="hsl(0 0% 100% / 0.05)" strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: "hsl(0 0% 63%)" }}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={28}
                interval="preserveStartEnd"
                tickFormatter={(v) => (isIntraday ? fmtTime(String(v)) : fmtDate(String(v)))}
              />
              <YAxis
                width={56}
                tick={{ fontSize: 10, fill: "hsl(0 0% 63%)" }}
                tickLine={false}
                axisLine={false}
                padding={{ top: 12, bottom: 12 }}
                domain={[min, max]}
                tickFormatter={(v: number) => fmtAxisUsd(v)}
              />
              <ReferenceLine y={0} stroke="hsl(0 0% 100% / 0.25)" strokeDasharray="2 2" />
              <ChartTooltip
                cursor={{ stroke: "hsl(0 0% 45%)", strokeWidth: 1, strokeDasharray: "4 4" }}
                content={
                  <ChartTooltipContent
                    hideIndicator
                    labelFormatter={(value) =>
                      isIntraday ? fmtTime(String(value)) : fmtDate(String(value))
                    }
                    formatter={(value, _name, item) => {
                      const v = Number(value);
                      const pct = Number(item?.payload?.pct ?? 0);
                      return (
                        <div className="flex w-full items-center justify-between gap-3">
                          <span className="text-muted-foreground">G/P</span>
                          <span
                            className={`font-mono font-medium tabular-nums ${v >= 0 ? "text-emerald-400" : "text-red-400"}`}
                          >
                            {fmtSignedUsd(v)} ({fmtPct(pct)})
                          </span>
                        </div>
                      );
                    }}
                  />
                }
              />
              <Area
                type="natural"
                dataKey="pnl"
                baseValue={0}
                stroke={`url(#${strokeId})`}
                strokeWidth={2.5}
                strokeLinecap="round"
                fill={`url(#${fillId})`}
                dot={false}
                activeDot={{ r: 3.5, strokeWidth: 0, fill: todayPositive ? NEON.green : NEON.red }}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default PortfolioPnLChart;
