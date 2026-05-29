import { useId } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

interface TrendAreaChartProps {
  /** Filas de datos ya listas para graficar. */
  data: Array<Record<string, unknown>>;
  /** Clave numérica a graficar (la serie). */
  dataKey: string;
  /** Clave del eje X (categoría/fecha). */
  xKey: string;
  /** Etiqueta de la serie mostrada en el tooltip. */
  seriesLabel?: string;
  /** Gradiente del trazo y el relleno: [color inicial, color final]. */
  colors?: [string, string];
  /** Formato del valor en el tooltip. */
  valueFormatter?: (value: number) => string;
  /** Formato de la etiqueta del eje X en el tooltip. */
  labelFormatter?: (label: string) => string;
  /** Formato de los ticks del eje X (por defecto, el valor crudo). */
  xTickFormatter?: (label: string) => string;
  /** Formato de los ticks del eje Y (por defecto, el valueFormatter). */
  yTickFormatter?: (value: number) => string;
  /** Mostrar el eje X con sus etiquetas. */
  showXAxis?: boolean;
  /** Mostrar el eje Y con sus etiquetas. */
  showYAxis?: boolean;
  /** Ancho reservado para las etiquetas del eje Y. */
  yWidth?: number;
  className?: string;
}

/**
 * Línea de tendencia con estilo limpio (Polymarket/Robinhood) adaptado a la
 * paleta Tresqu: trazo con gradiente verde neón → cyan, curva suave y relleno
 * que se desvanece. Conserva ejes con etiquetas para leer los valores sin hover.
 *
 * Reutilizable: el contenedor padre define el alto.
 */
const DEFAULT_COLORS: [string, string] = ["#00FF7F", "#22d3ee"];

const TrendAreaChart = ({
  data,
  dataKey,
  xKey,
  seriesLabel,
  colors = DEFAULT_COLORS,
  valueFormatter = (value) => value.toLocaleString(),
  labelFormatter,
  xTickFormatter,
  yTickFormatter,
  showXAxis = true,
  showYAxis = true,
  yWidth = 52,
  className,
}: TrendAreaChartProps) => {
  const rawId = useId().replace(/:/g, "");
  const strokeId = `trend-stroke-${rawId}`;
  const fillId = `trend-fill-${rawId}`;
  const [from, to] = colors;

  const config: ChartConfig = {
    [dataKey]: { label: seriesLabel ?? dataKey, color: to },
  };

  const yTick = yTickFormatter ?? valueFormatter;

  return (
    <ChartContainer config={config} className={cn("h-full w-full", className)}>
      <AreaChart
        data={data}
        margin={{ top: 12, right: 12, left: showYAxis ? 0 : 4, bottom: 0 }}
      >
        <defs>
          {/* Barrido horizontal del trazo: de->a (izquierda a derecha). */}
          <linearGradient id={strokeId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
          {/* Relleno vertical que se desvanece hacia abajo. */}
          <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={to} stopOpacity={0.22} />
            <stop offset="55%" stopColor={from} stopOpacity={0.06} />
            <stop offset="100%" stopColor={from} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          vertical={false}
          stroke="hsl(0 0% 100% / 0.05)"
          strokeDasharray="3 3"
        />
        <XAxis
          dataKey={xKey}
          hide={!showXAxis}
          tick={{ fontSize: 10, fill: "hsl(0 0% 63%)" }}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={24}
          interval="preserveStartEnd"
          tickFormatter={
            xTickFormatter ? (value) => xTickFormatter(String(value)) : undefined
          }
        />
        <YAxis
          hide={!showYAxis}
          width={yWidth}
          tick={{ fontSize: 10, fill: "hsl(0 0% 63%)" }}
          tickLine={false}
          axisLine={false}
          // Padding evita que los picos de la curva "natural" se recorten.
          padding={{ top: 12, bottom: 8 }}
          domain={["auto", "auto"]}
          tickFormatter={(value: number) => yTick(value)}
        />
        <ChartTooltip
          cursor={{
            stroke: "hsl(0 0% 45%)",
            strokeWidth: 1,
            strokeDasharray: "4 4",
          }}
          content={
            <ChartTooltipContent
              hideIndicator
              labelFormatter={
                labelFormatter ? (value) => labelFormatter(String(value)) : undefined
              }
              formatter={(value) => (
                <div className="flex w-full items-center justify-between gap-3">
                  <span className="text-muted-foreground">
                    {seriesLabel ?? "Valor"}
                  </span>
                  <span className="font-mono font-medium tabular-nums text-foreground">
                    {valueFormatter(Number(value))}
                  </span>
                </div>
              )}
            />
          }
        />
        <Area
          type="natural"
          dataKey={dataKey}
          stroke={`url(#${strokeId})`}
          strokeWidth={2.5}
          strokeLinecap="round"
          fill={`url(#${fillId})`}
          dot={false}
          activeDot={{ r: 3.5, strokeWidth: 0, fill: to }}
        />
      </AreaChart>
    </ChartContainer>
  );
};

export default TrendAreaChart;
