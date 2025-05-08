
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIncomeLineData } from "@/hooks/useIncomeLineData";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AlertCircle, Loader2 } from "lucide-react";
import { DateRange } from "../DateRangePicker";
import { format, isSameDay, startOfToday, startOfYesterday } from "date-fns";

interface IncomeLineChartProps {
  viewMode: "day" | "week" | "month" | "year";
  selectedMonth?: string;
  activeTab?: string;
  dateRange?: DateRange;
}

const IncomeLineChart: React.FC<IncomeLineChartProps> = ({
  viewMode,
  dateRange = { from: new Date(), to: new Date() },
}) => {
  const { data, isLoading, error } = useIncomeLineData(dateRange, viewMode);

  // Check if dateRange is today or yesterday
  const isToday = dateRange.from && dateRange.to && 
                 isSameDay(dateRange.from, startOfToday()) && 
                 isSameDay(dateRange.to, startOfToday());
                 
  const isYesterday = dateRange.from && dateRange.to && 
                     isSameDay(dateRange.from, startOfYesterday()) && 
                     isSameDay(dateRange.to, startOfYesterday());
                     
  // Check if dateRange is custom (not today or yesterday)
  const isCustomDateRange = dateRange.from && dateRange.to && 
                           !isToday && !isYesterday;

  // Format data for Recharts
  const chartData = React.useMemo(() => {
    if (!data || !data.labels || !data.datasets || data.datasets.length === 0) {
      return [];
    }

    return data.labels.map((label, index) => ({
      name: label,
      amount: data.datasets[0].data[index] || 0,
    }));
  }, [data]);

  // Function to format currency values
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border p-2 rounded-md shadow-md">
          <p className="text-xs font-semibold">{`${label}`}</p>
          <p className="text-xs text-primary">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  // Calculate chart title based on date range or view mode
  const getChartTitle = () => {
    if (data?.filter_summary) {
      return data.filter_summary;
    }
    
    if (isToday) {
      return "Ingresos de hoy";
    } else if (isYesterday) {
      return "Ingresos de ayer";
    } else if (isCustomDateRange) {
      return "Ingresos por día";
    } else if (viewMode === "week") {
      return "Ingresos por día de la semana";
    } else {
      return "Ingresos por período";
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="px-3 xs:px-4 sm:px-6 py-2 xs:py-3 sm:py-4">
        <CardTitle className="text-sm xs:text-base">
          Ingresos {getChartTitle() !== "Ingresos por período" ? `- ${getChartTitle()}` : "por período"}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 xs:px-0 sm:px-2 py-0 sm:py-1 h-[calc(100%-60px)]">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
            <span className="ml-2 text-sm text-muted-foreground">Cargando datos...</span>
          </div>
        ) : error ? (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <AlertCircle className="h-8 w-8 text-destructive mb-2" />
            <p className="text-sm text-muted-foreground">Error al cargar los datos</p>
          </div>
        ) : chartData.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-sm text-muted-foreground">No hay datos disponibles</p>
          </div>
        ) : (
          <div className="w-full h-full pt-2">
            <div className="text-xs mb-1 px-4 text-right">
              <span className="font-semibold">Total: </span>
              <span>
                {formatCurrency(data?.total_amount || 0)}
              </span>
            </div>
            <ResponsiveContainer width="100%" height="90%">
              <ComposedChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorIncomeAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4ade80" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" opacity={0.3} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10 }}
                  tickLine={{ stroke: "rgb(var(--muted-foreground))" }}
                  axisLine={{ stroke: "rgb(var(--muted))" }}
                  tickFormatter={(value) => {
                    // Handle long x-axis labels for better display
                    if (viewMode === "year") {
                      // For year view, just return the month abbreviation
                      return value.split(" ")[0];
                    } else if (viewMode === "week" || isCustomDateRange) {
                      // For week view or custom date range, format day names more concisely
                      const dayParts = value.split(" ");
                      return dayParts.length > 0 ? dayParts[0] : value;
                    }
                    return value;
                  }}
                />
                <YAxis
                  tick={{ fontSize: 10 }}
                  tickLine={{ stroke: "rgb(var(--muted-foreground))" }}
                  axisLine={{ stroke: "rgb(var(--muted))" }}
                  tickFormatter={(value) => {
                    if (value >= 1000000) {
                      return `${(value / 1000000).toFixed(1)}M`;
                    } else if (value >= 1000) {
                      return `${(value / 1000).toFixed(0)}K`;
                    }
                    return value.toString();
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#4ade80"
                  fillOpacity={1}
                  fill="url(#colorIncomeAmount)"
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#4ade80"
                  strokeWidth={2}
                  dot={{ stroke: "#4ade80", strokeWidth: 2, r: 2 }}
                  activeDot={{ stroke: "#4ade80", strokeWidth: 2, r: 4 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IncomeLineChart;
