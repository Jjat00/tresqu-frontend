import { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useHoldings } from "@/hooks/useInvestments";

const PALETTE = [
  "#6366f1", // indigo
  "#10b981", // emerald
  "#f59e0b", // amber
  "#ef4444", // red
  "#06b6d4", // cyan
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#84cc16", // lime
];

const PortfolioDonut = () => {
  const { data, isLoading, error } = useHoldings();

  const slices = useMemo(() => {
    if (!data) return [];
    const total = data.reduce(
      (sum, h) => sum + parseFloat(h.market_value || "0"),
      0,
    );
    if (total <= 0) return [];
    return data
      .map((h, i) => {
        const value = parseFloat(h.market_value || "0");
        return {
          name: h.symbol,
          value,
          pct: (value / total) * 100,
          fill: PALETTE[i % PALETTE.length],
        };
      })
      .filter((s) => s.value > 0)
      .sort((a, b) => b.value - a.value);
  }, [data]);

  return (
    <Card className="glass-card h-full">
      <CardHeader>
        <CardTitle className="text-base">Distribución por activo</CardTitle>
        <CardDescription className="text-xs">
          Porcentaje del valor actual del portfolio por símbolo
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[280px]">
        {isLoading ? (
          <Skeleton className="h-full w-full rounded-md" />
        ) : error || slices.length === 0 ? (
          <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
            Sin posiciones para mostrar.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 h-full">
            <div className="h-[160px] sm:h-full">
              <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={slices}
                  innerRadius="55%"
                  outerRadius="90%"
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {slices.map((s) => (
                    <Cell key={s.name} fill={s.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0 0% 7%)",
                    border: "1px solid hsl(0 0% 14%)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number, name: string) => [
                    `$${value.toFixed(2)}`,
                    name,
                  ]}
                />
              </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col justify-center gap-1.5 text-xs overflow-y-auto">
              {slices.slice(0, 8).map((s) => (
                <div key={s.name} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="h-2.5 w-2.5 rounded-sm shrink-0"
                      style={{ backgroundColor: s.fill }}
                    />
                    <span className="truncate font-medium">{s.name}</span>
                  </div>
                  <span className="text-muted-foreground">
                    {s.pct.toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PortfolioDonut;
