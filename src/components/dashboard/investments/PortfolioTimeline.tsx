import { useMemo, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { usePortfolioTimeline } from "@/hooks/useInvestments";
import type { TimelinePeriod } from "@/types/wallbit";
import TrendAreaChart from "@/components/dashboard/charts/TrendAreaChart";

const PERIODS: Array<{ value: TimelinePeriod; label: string }> = [
  { value: "1m", label: "1M" },
  { value: "3m", label: "3M" },
  { value: "6m", label: "6M" },
  { value: "1y", label: "1A" },
  { value: "all", label: "Todo" },
];

const formatUsd = (value: number) =>
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

const PortfolioTimeline = () => {
  const [period, setPeriod] = useState<TimelinePeriod>("3m");
  const { data, isLoading, error } = usePortfolioTimeline(period);

  const chartData = useMemo(() => {
    if (!data?.points) return [];
    return data.points.map((p) => ({
      date: p.date,
      invested: parseFloat(p.invested_total_usd || "0"),
    }));
  }, [data]);

  return (
    <Card className="glass-card h-full">
      <CardHeader className="flex flex-row items-start justify-between gap-3">
        <div>
          <CardTitle className="text-base">Capital invertido</CardTitle>
          <CardDescription className="text-xs">
            Evolución acumulada en el tiempo
          </CardDescription>
        </div>
        <ToggleGroup
          type="single"
          value={period}
          onValueChange={(v) => v && setPeriod(v as TimelinePeriod)}
          size="sm"
        >
          {PERIODS.map((p) => (
            <ToggleGroupItem key={p.value} value={p.value} className="h-7 px-2 text-xs">
              {p.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </CardHeader>
      <CardContent className="h-[280px]">
        {isLoading ? (
          <Skeleton className="h-full w-full rounded-md" />
        ) : error || chartData.length === 0 ? (
          <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
            Sin actividad en el período seleccionado.
          </div>
        ) : (
          <TrendAreaChart
            data={chartData}
            dataKey="invested"
            xKey="date"
            seriesLabel="Invertido"
            valueFormatter={formatUsd}
            yTickFormatter={(v) =>
              `$${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`
            }
          />
        )}
      </CardContent>
    </Card>
  );
};

export default PortfolioTimeline;
