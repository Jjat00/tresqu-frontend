import { useId } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { useCumulativeBalance } from "@/hooks/useCumulativeBalance";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const formatCurrency = (value: number) => {
  const sign = value < 0 ? "-" : "";
  const abs = Math.abs(value);
  if (abs >= 1000000) return `${sign}$${(abs / 1000000).toFixed(1)}M`;
  if (abs >= 1000) return `${sign}$${(abs / 1000).toFixed(0)}K`;
  return `${sign}$${abs}`;
};

const chartConfig: ChartConfig = {
  income: { label: "Ingresos", color: "#34d399" },
  expenses: { label: "Gastos", color: "#fb7185" },
  cumulativeBalance: { label: "Balance acumulado", color: "#22d3ee" },
};

const CumulativeBalanceChart = () => {
  const { data, isLoading, isError } = useCumulativeBalance(6);
  const isMobile = useIsMobile();
  const rawId = useId().replace(/:/g, "");
  const strokeId = `cumBalStroke-${rawId}`;
  const fillId = `cumBalFill-${rawId}`;

  const lastBalance =
    data.length > 0 ? data[data.length - 1].cumulativeBalance : 0;
  // Trazo verde→cyan en superávit, tonos rojos en déficit.
  const [strokeFrom, strokeTo] =
    lastBalance >= 0 ? ["#00FF7F", "#22d3ee"] : ["#ef4444", "#fb7185"];

  return (
    <div className="glass-card p-4 sm:p-5 animate-fade-up">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm sm:text-base font-semibold text-foreground">
            Balance Acumulado
          </h3>
          <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">
            Dinero real disponible mes a mes
          </p>
        </div>
        {!isLoading && !isError && data.length > 0 && (
          <div className="text-right">
            <div
              className={`text-sm sm:text-lg font-semibold font-display tracking-tight ${
                lastBalance >= 0 ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {formatCurrency(lastBalance)}
            </div>
            <p className="text-[10px] text-muted-foreground">Acumulado actual</p>
          </div>
        )}
      </div>

      <div className="h-[280px] sm:h-[320px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-48 w-full" />
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center h-full">
            <AlertCircle className="h-8 w-8 text-destructive mb-2" />
            <p className="text-sm text-muted-foreground">
              Error al cargar los datos
            </p>
          </div>
        ) : data.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-muted-foreground">
              No hay datos suficientes
            </p>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-full w-full">
            <ComposedChart
              data={data}
              margin={{ top: 12, right: 8, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id={strokeId} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={strokeFrom} />
                  <stop offset="100%" stopColor={strokeTo} />
                </linearGradient>
                <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={strokeTo} stopOpacity={0.18} />
                  <stop offset="100%" stopColor={strokeFrom} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                stroke="hsl(0 0% 100% / 0.05)"
                strokeDasharray="3 3"
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: isMobile ? 10 : 12, fill: "hsl(0 0% 63%)" }}
                axisLine={false}
                tickLine={false}
                tickMargin={8}
              />
              <YAxis
                width={52}
                tickFormatter={(v: number) => formatCurrency(v)}
                tick={{ fontSize: isMobile ? 9 : 11, fill: "hsl(0 0% 63%)" }}
                axisLine={false}
                tickLine={false}
                padding={{ top: 12, bottom: 8 }}
              />
              <ChartTooltip
                cursor={{ fill: "hsl(0 0% 100% / 0.04)" }}
                content={
                  <ChartTooltipContent
                    formatter={(value, name) => (
                      <div className="flex w-full items-center justify-between gap-3">
                        <span className="text-muted-foreground">
                          {chartConfig[name as keyof typeof chartConfig]
                            ?.label ?? name}
                        </span>
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {formatCurrency(Number(value))}
                        </span>
                      </div>
                    )}
                  />
                }
              />
              <ChartLegend content={<ChartLegendContent />} />
              <ReferenceLine y={0} stroke="hsl(0 0% 100% / 0.1)" strokeDasharray="3 3" />
              <Bar
                dataKey="income"
                fill="var(--color-income)"
                fillOpacity={0.45}
                radius={[3, 3, 0, 0]}
                barSize={isMobile ? 12 : 20}
              />
              <Bar
                dataKey="expenses"
                fill="var(--color-expenses)"
                fillOpacity={0.45}
                radius={[3, 3, 0, 0]}
                barSize={isMobile ? 12 : 20}
              />
              <Area
                type="natural"
                dataKey="cumulativeBalance"
                stroke={`url(#${strokeId})`}
                strokeWidth={2.5}
                strokeLinecap="round"
                fill={`url(#${fillId})`}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0, fill: strokeTo }}
              />
            </ComposedChart>
          </ChartContainer>
        )}
      </div>
    </div>
  );
};

export default CumulativeBalanceChart;
