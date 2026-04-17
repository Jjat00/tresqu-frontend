import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { useCumulativeBalance } from "@/hooks/useCumulativeBalance";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  ComposedChart,
  Area,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const CumulativeBalanceChart = () => {
  const { data, isLoading, isError } = useCumulativeBalance(6);
  const isMobile = useIsMobile();

  const formatCurrency = (value: number) => {
    if (Math.abs(value) >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (Math.abs(value) >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value}`;
  };

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
                data[data.length - 1].cumulativeBalance >= 0
                  ? "text-emerald-400"
                  : "text-rose-400"
              }`}
            >
              {formatCurrency(data[data.length - 1].cumulativeBalance)}
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
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={data}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="gradientPositive" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradientNegative" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fb7185" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#fb7185" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.04)"
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: isMobile ? 10 : 12, fill: "hsl(0 0% 63%)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v) => formatCurrency(v)}
                tick={{ fontSize: isMobile ? 9 : 11, fill: "hsl(0 0% 63%)" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(10, 10, 10, 0.95)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  backdropFilter: "blur(20px)",
                  fontSize: "12px",
                  padding: "10px 14px",
                }}
                formatter={(value: number, name: string) => {
                  const labels: Record<string, string> = {
                    income: "Ingresos",
                    expenses: "Gastos",
                    cumulativeBalance: "Acumulado",
                  };
                  return [formatCurrency(value), labels[name] || name];
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
                iconSize={8}
                formatter={(value: string) => {
                  const labels: Record<string, string> = {
                    income: "Ingresos",
                    expenses: "Gastos",
                    cumulativeBalance: "Balance acumulado",
                  };
                  return labels[value] || value;
                }}
              />
              <ReferenceLine y={0} stroke="rgba(255,255,255,0.1)" strokeDasharray="3 3" />
              <Bar
                dataKey="income"
                fill="#34d399"
                fillOpacity={0.5}
                radius={[3, 3, 0, 0]}
                barSize={isMobile ? 12 : 20}
              />
              <Bar
                dataKey="expenses"
                fill="#fb7185"
                fillOpacity={0.5}
                radius={[3, 3, 0, 0]}
                barSize={isMobile ? 12 : 20}
              />
              <Area
                type="monotone"
                dataKey="cumulativeBalance"
                stroke="#a78bfa"
                strokeWidth={2}
                fill="url(#gradientPositive)"
                dot={{ fill: "#a78bfa", r: 4, strokeWidth: 2, stroke: "rgba(10,10,10,0.8)" }}
                activeDot={{ r: 6, fill: "#a78bfa" }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default CumulativeBalanceChart;
