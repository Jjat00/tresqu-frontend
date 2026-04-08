import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DateRange } from "../DateRangePicker";
import { useLineChartData } from "@/hooks/useLineChartData";
import { AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { isLocalToday, isLocalYesterday } from "@/utils/dateUtils";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";

interface ChartJSLineChartProps {
  viewMode: "day" | "week" | "month" | "year";
  selectedMonth?: string;
  activeTab?: string;
  dateRange?: DateRange;
}

const ChartJSLineChart: React.FC<ChartJSLineChartProps> = ({
  viewMode,
  dateRange = { from: new Date(), to: new Date() },
}) => {
  const { data, isLoading, error } = useLineChartData(dateRange, viewMode);
  const isMobile = useIsMobile();

  const isToday =
    dateRange.from && dateRange.to && isLocalToday(dateRange.from) && isLocalToday(dateRange.to);
  const isYesterday =
    dateRange.from && dateRange.to && isLocalYesterday(dateRange.from) && isLocalYesterday(dateRange.to);
  const isCustomDateRange = dateRange.from && dateRange.to && !isToday && !isYesterday;

  const rechartsData = React.useMemo(() => {
    if (!data?.labels || !data?.datasets?.[0]) return [];
    return data.labels.map((label, i) => ({
      name: label,
      gastos: data.datasets[0].data[i] ?? 0,
    }));
  }, [data]);

  const formatCurrency = (amount: number) =>
    amount.toLocaleString("es-CO", {
      style: "currency", currency: "COP",
      minimumFractionDigits: 0, maximumFractionDigits: 0,
    });

  const getChartTitle = () => {
    if (data?.filter_summary) return data.filter_summary;
    if (isToday) return "Gastos de hoy";
    if (isYesterday) return "Gastos de ayer";
    if (isCustomDateRange) return "Gastos por día";
    if (viewMode === "week") return "Gastos por día de la semana";
    return "Gastos por período";
  };

  const formatYAxis = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return `${value}`;
  };

  return (
    <Card className="h-full">
      <CardHeader className="px-3 xs:px-4 sm:px-6 py-2 xs:py-3 sm:py-4">
        <CardTitle className="text-sm xs:text-base">
          Gastos - {getChartTitle()}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 xs:px-0 sm:px-2 py-0 sm:py-1 h-[calc(100%-60px)]">
        {isLoading ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-40 w-full" />
          </div>
        ) : error ? (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <AlertCircle className="h-8 w-8 text-destructive mb-2" />
            <p className="text-sm text-muted-foreground">Error al cargar los datos</p>
          </div>
        ) : rechartsData.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-sm text-muted-foreground">No hay datos disponibles</p>
          </div>
        ) : (
          <div className="w-full h-full pt-2">
            <div className="text-xs mb-1 px-4 text-right">
              <span className="font-semibold">Total: </span>
              <span>{formatCurrency(data?.total_amount || 0)}</span>
            </div>
            <ResponsiveContainer width="100%" height="85%">
              <AreaChart data={rechartsData} margin={{ top: 5, right: 15, left: -10, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorGastos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4BC0C0" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4BC0C0" stopOpacity={0} />
                  </linearGradient>
                </defs>
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
                  formatter={(value: number) => [formatCurrency(value), "Gastos"]}
                />
                <Area
                  type="monotone"
                  dataKey="gastos"
                  stroke="#4BC0C0"
                  strokeWidth={2}
                  fill="url(#colorGastos)"
                  dot={{ fill: "#4BC0C0", r: 3 }}
                  activeDot={{ r: 5, fill: "#4BC0C0" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChartJSLineChart;
