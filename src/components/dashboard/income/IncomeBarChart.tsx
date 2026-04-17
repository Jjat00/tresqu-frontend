import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import { useIncomeBarData } from "@/hooks/useIncomeBarData";
import { DateRange } from "../DateRangePicker";
import { BarStackedChartParams } from "@/types/incomes";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface IncomeBarChartProps {
  timeFilter: "month" | "quarter" | "year";
  dateRange?: DateRange;
  formatCurrency: (amount: number) => string;
}

const IncomeBarChart: React.FC<IncomeBarChartProps> = ({
  timeFilter,
  dateRange,
  formatCurrency,
}) => {
  const isMobile = useIsMobile();

  const queryParams: BarStackedChartParams = useMemo(() => {
    const params: BarStackedChartParams = {};
    if (timeFilter === "month") {
      params.group_by = "day";
      params.date_filter = "current_month";
    } else if (timeFilter === "quarter") {
      params.group_by = "week";
      params.date_filter = "custom";
      const today = new Date();
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(today.getMonth() - 3);
      params.start_date = threeMonthsAgo.toISOString().split("T")[0];
      params.end_date = today.toISOString().split("T")[0];
    } else if (timeFilter === "year") {
      params.group_by = "month";
      params.date_filter = "current_year";
    }
    if (dateRange?.from && dateRange?.to) {
      params.date_filter = "custom";
      params.start_date = dateRange.from.toISOString().split("T")[0];
      params.end_date = dateRange.to.toISOString().split("T")[0];
    }
    return params;
  }, [timeFilter, dateRange]);

  const { data, isLoading, error, refetch } = useIncomeBarData(queryParams);

  const rechartsData = useMemo(() => {
    if (!data?.labels || !data?.datasets) return [];
    return data.labels.map((label, i) => {
      const point: Record<string, string | number> = { name: label };
      data.datasets.forEach((dataset) => {
        point[dataset.label] = dataset.data[i] ?? 0;
      });
      return point;
    });
  }, [data]);

  const chartTitle = useMemo(() => {
    if (timeFilter === "month") return "Ingresos Mensuales";
    if (timeFilter === "quarter") return "Ingresos Trimestrales";
    return "Ingresos Anuales";
  }, [timeFilter]);

  const formatYAxis = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return `${value}`;
  };

  return (
    <Card className="overflow-hidden h-full bg-transparent border-0 shadow-none">
      <CardContent className="pt-3 xs:pt-4 sm:pt-6 xs:px-3 sm:px-4 h-full flex flex-col px-[15px]">
        <div className="flex justify-between items-center mb-1 xs:mb-2">
          <h3 className="text-sm xs:text-base sm:text-lg font-semibold">{chartTitle}</h3>
          {data && <div className="text-xs text-muted-foreground">{data.filter_summary}</div>}
        </div>
        <div className="flex-1 min-h-[200px] flex items-center justify-center">
          {isLoading ? (
            <div className="w-full space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-32 w-full" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center">
              <AlertCircle className="h-8 w-8 text-destructive mb-2" />
              <p className="text-sm text-destructive mb-1">Error al cargar los datos</p>
              <button onClick={() => refetch()} className="text-xs text-primary hover:underline mt-2">
                Reintentar
              </button>
            </div>
          ) : rechartsData.length === 0 ? (
            <p className="text-sm text-muted-foreground">No hay datos disponibles para este periodo</p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rechartsData} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: isMobile ? 9 : 12, fill: "hsl(0 0% 63%)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={formatYAxis}
                  tick={{ fontSize: isMobile ? 9 : 12, fill: "hsl(0 0% 63%)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0 0% 7%)",
                    border: "1px solid hsl(0 0% 14%)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number, name: string) => [formatCurrency(value), name]}
                />
                {!isMobile && <Legend wrapperStyle={{ fontSize: "11px" }} iconSize={8} />}
                {data?.datasets.map((dataset, i) => (
                  <Bar
                    key={dataset.label}
                    dataKey={dataset.label}
                    stackId="stack"
                    fill={dataset.backgroundColor}
                    fillOpacity={0.7}
                    radius={i === (data.datasets.length - 1) ? [2, 2, 0, 0] : [0, 0, 0, 0]}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
        {data && data.total_amount > 0 && (
          <div className="mt-2 text-right">
            <span className="text-xs font-medium">Total: {formatCurrency(data.total_amount)}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IncomeBarChart;
