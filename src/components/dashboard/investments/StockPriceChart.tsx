import { useMemo, useState } from "react";
import { AxiosError } from "axios";
import { AlertCircle, ArrowDownRight, ArrowUpRight, Clock, Minus } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { usePriceHistory } from "@/hooks/useMarketData";
import type { PriceRange } from "@/types/wallbit";
import TrendAreaChart from "@/components/dashboard/charts/TrendAreaChart";

interface StockPriceChartProps {
  symbol: string;
}

const RANGES: Array<{ value: PriceRange; label: string }> = [
  { value: "1d", label: "1D" },
  { value: "1w", label: "1S" },
  { value: "1m", label: "1M" },
  { value: "3m", label: "3M" },
  { value: "1y", label: "1A" },
  { value: "5y", label: "5A" },
  { value: "max", label: "Máx" },
];

/** Ranges that carry intraday timestamps in `point.t`. */
const INTRADAY_RANGES = new Set<PriceRange>(["1d", "1w"]);

const formatUsd = (value: number) =>
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

const formatAxisLabel = (raw: string, range: PriceRange): string => {
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return raw;
  if (INTRADAY_RANGES.has(range)) {
    // Intraday: show the time; for 1w prepend the weekday so days are distinguishable.
    const time = date.toLocaleTimeString("es-CO", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    if (range === "1w") {
      const day = date.toLocaleDateString("es-CO", { weekday: "short" });
      return `${day} ${time}`;
    }
    return time;
  }
  // Longer ranges: dates. For multi-year ranges drop the day to reduce clutter.
  if (range === "5y" || range === "max") {
    return date.toLocaleDateString("es-CO", { month: "short", year: "2-digit" });
  }
  return date.toLocaleDateString("es-CO", { day: "2-digit", month: "short" });
};

const ERROR_MESSAGES: Record<number, string> = {
  400: "Rango de tiempo no válido.",
  404: "No hay datos disponibles para este activo.",
  429: "Alcanzaste el límite de consultas de datos. Probá de nuevo en unos minutos.",
  502: "El proveedor de datos no está disponible por ahora.",
};

const resolveErrorMessage = (error: unknown): string => {
  const status = (error as AxiosError | undefined)?.response?.status;
  if (status && ERROR_MESSAGES[status]) return ERROR_MESSAGES[status];
  return "No pudimos cargar el precio de este activo.";
};

const StockPriceChart = ({ symbol }: StockPriceChartProps) => {
  const [range, setRange] = useState<PriceRange>("1m");
  const { data, isLoading, error } = usePriceHistory(symbol, range);

  const chartData = useMemo(() => {
    if (!data?.points) return [];
    return data.points.map((p) => ({
      label: formatAxisLabel(p.t, range),
      price: p.price,
    }));
  }, [data, range]);

  const summary = data?.summary;
  const isUp = (summary?.change_pct ?? 0) >= 0;
  // Gradiente del trazo según la tendencia: verde para alza, rojo para baja.
  const trendColors: [string, string] = isUp
    ? ["#22c55e", "#4ade80"]
    : ["#ef4444", "#f87171"];

  const TrendIcon = isUp ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="space-y-3">
      {/* Header: current price, change, high/low */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          {isLoading || !summary ? (
            <div className="space-y-2">
              <Skeleton className="h-7 w-28" />
              <Skeleton className="h-4 w-20" />
            </div>
          ) : (
            <>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold tabular-nums">
                  {formatUsd(summary.current)}
                </span>
                <span
                  className={`flex items-center gap-0.5 text-sm font-medium tabular-nums ${
                    isUp ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {summary.change_pct === 0 ? (
                    <Minus className="h-3.5 w-3.5" />
                  ) : (
                    <TrendIcon className="h-3.5 w-3.5" />
                  )}
                  {isUp && summary.change_pct !== 0 ? "+" : ""}
                  {summary.change_pct.toFixed(2)}%
                </span>
              </div>
              <div className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground tabular-nums">
                <span>
                  {isUp ? "+" : ""}
                  {formatUsd(summary.change_abs)}
                </span>
                <span>Máx {formatUsd(summary.high)}</span>
                <span>Mín {formatUsd(summary.low)}</span>
              </div>
            </>
          )}
        </div>

        <ToggleGroup
          type="single"
          value={range}
          onValueChange={(v) => v && setRange(v as PriceRange)}
          size="sm"
        >
          {RANGES.map((r) => (
            <ToggleGroupItem
              key={r.value}
              value={r.value}
              aria-label={`Rango ${r.label}`}
              className="h-7 px-2 text-xs"
            >
              {r.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      {/* Stale hint */}
      {data?.stale && (
        <p className="flex items-center gap-1 text-[11px] text-amber-400/90">
          <Clock className="h-3 w-3" />
          Datos diferidos · mostrando la última cotización en caché.
        </p>
      )}

      {/* Chart */}
      <div className="h-[260px]">
        {isLoading ? (
          <Skeleton className="h-full w-full rounded-md" />
        ) : error ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
            <AlertCircle className="h-7 w-7 text-destructive" />
            <p className="max-w-xs text-sm text-muted-foreground">
              {resolveErrorMessage(error)}
            </p>
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Sin datos de precio para el rango seleccionado.
          </div>
        ) : (
          <TrendAreaChart
            data={chartData}
            dataKey="price"
            xKey="label"
            seriesLabel="Precio"
            colors={trendColors}
            valueFormatter={formatUsd}
            yTickFormatter={(v) =>
              v.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: v >= 1000 ? 0 : 2,
              })
            }
            yWidth={60}
          />
        )}
      </div>
    </div>
  );
};

export default StockPriceChart;
