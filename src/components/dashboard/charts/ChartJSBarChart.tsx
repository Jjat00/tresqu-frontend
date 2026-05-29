import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DateRange } from "../DateRangePicker";
import { useBarStackedChart } from "@/hooks/userBarStackedChart";
import { Skeleton } from "@/components/ui/skeleton";
import { toLocalISODate } from "@/utils/dateUtils";
import { BarStackedChartParams } from "@/types/expenses";
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
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";
import { neonize } from "@/lib/chartColors";

interface ChartJSBarChartProps {
  viewMode: "month" | "year";
  selectedMonth: string;
  dateRange?: DateRange;
}

const monthToNumber: Record<string, number> = {
  Enero: 1, Febrero: 2, Marzo: 3, Abril: 4, Mayo: 5, Junio: 6,
  Julio: 7, Agosto: 8, Septiembre: 9, Octubre: 10, Noviembre: 11, Diciembre: 12,
};

const ChartJSBarChart: React.FC<ChartJSBarChartProps> = ({
  viewMode,
  selectedMonth,
  dateRange,
}) => {
  const isMobile = useIsMobile();

  const getChartParams = (): BarStackedChartParams => {
    const params: BarStackedChartParams = {};

    if (dateRange) {
      params.date_filter = "custom";
      params.start_date = dateRange.from ? toLocalISODate(dateRange.from) : undefined;
      params.end_date = dateRange.to ? toLocalISODate(dateRange.to) : undefined;

      if (dateRange.from && dateRange.to) {
        const diffDays = Math.ceil(
          (dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)
        );
        if (diffDays > 90) params.group_by = "month";
        else if (diffDays > 14) params.group_by = "week";
        else params.group_by = "day";
      }
    } else if (viewMode === "year" || selectedMonth === "year") {
      params.date_filter = "current_year";
      params.group_by = "month";
    } else if (viewMode === "month" && selectedMonth !== "year") {
      const currentYear = new Date().getFullYear();
      const monthNum = monthToNumber[selectedMonth];
      if (monthNum === new Date().getMonth() + 1) {
        params.date_filter = "current_month";
      } else {
        params.date_filter = "custom";
        const startDate = new Date(currentYear, monthNum - 1, 1);
        const endDate = new Date(currentYear, monthNum, 0);
        params.start_date = toLocalISODate(startDate);
        params.end_date = toLocalISODate(endDate);
      }
      params.group_by = "week";
    } else {
      params.date_filter = "current_month";
      params.group_by = "week";
    }

    return params;
  };

  const { data, isLoading, isError, error, refetch } = useBarStackedChart(getChartParams());

  const chartTitle = React.useMemo(() => {
    if (!data) return "Cargando...";
    if (viewMode === "year" || selectedMonth === "year") return "Gastos Mensuales";
    if (viewMode === "month") return `Gastos Semanales - ${selectedMonth}`;
    return "Gastos Anuales";
  }, [viewMode, selectedMonth, data]);

  // Transform data for Recharts: from datasets format to array-of-objects
  const rechartsData = React.useMemo(() => {
    if (!data?.labels || !data?.datasets) return [];

    return data.labels.map((label, i) => {
      const point: Record<string, string | number> = { name: label };
      data.datasets.forEach((dataset) => {
        point[dataset.label] = dataset.data[i] ?? 0;
      });
      return point;
    });
  }, [data]);

  const formatYAxis = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return `${value}`;
  };

  React.useEffect(() => {
    if (isError && error) {
      toast.error("No se pudieron cargar los datos de gastos");
    }
  }, [isError, error]);

  return (
    <Card className="overflow-hidden h-full bg-transparent border-0 shadow-none">
      <CardContent className="pt-3 xs:pt-4 sm:pt-6 xs:px-3 sm:px-4 h-full flex flex-col px-[15px]">
        <div className="flex justify-between items-center mb-1 xs:mb-2">
          <h3 className="text-sm xs:text-base sm:text-lg font-semibold">
            {chartTitle}
          </h3>
          {data && (
            <div className="text-xs text-muted-foreground">{data.filter_summary}</div>
          )}
        </div>
        <div className="flex-1 min-h-[200px] flex items-center justify-center">
          {isLoading ? (
            <div className="w-full space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center">
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
                <defs>
                  {data?.datasets.map((dataset, i) => (
                    <linearGradient key={`barGrad-${i}`} id={`barGrad-${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={neonize(dataset.backgroundColor, i)} stopOpacity={0.9} />
                      <stop offset="100%" stopColor={neonize(dataset.backgroundColor, i)} stopOpacity={0.4} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: isMobile ? 9 : 11, fill: "rgba(255,255,255,0.4)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={formatYAxis}
                  tick={{ fontSize: isMobile ? 9 : 11, fill: "rgba(255,255,255,0.4)" }}
                  axisLine={false}
                  tickLine={false}
                  width={40}
                />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.03)", radius: 6 }}
                  contentStyle={{
                    background: "hsl(0 0% 4%)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px",
                    fontSize: "12px",
                    padding: "8px 12px",
                  }}
                  formatter={(value: number, name: string) => {
                    const idx = data?.datasets.findIndex((d) => d.label === name) ?? -1;
                    const color =
                      idx >= 0 ? neonize(data!.datasets[idx].backgroundColor, idx) : "#fff";
                    return [
                      <span key={name} style={{ color }}>
                        ${value.toLocaleString("es-CO")}
                      </span>,
                      name,
                    ];
                  }}
                />
                {!isMobile && (
                  <Legend
                    wrapperStyle={{ fontSize: "10px", opacity: 0.7, paddingTop: "8px" }}
                    iconSize={6}
                    iconType="circle"
                  />
                )}
                {data?.datasets.map((dataset, i) => (
                  <Bar
                    key={dataset.label}
                    dataKey={dataset.label}
                    stackId="stack"
                    fill={`url(#barGrad-${i})`}
                    radius={i === (data.datasets.length - 1) ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
        {data && data.total_amount > 0 && (
          <div className="mt-2 text-right">
            <span className="text-xs font-medium">
              Total: ${data.total_amount.toLocaleString("es-CO")}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChartJSBarChart;
