import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import { useIncomePieChart } from "@/hooks/useIncomePieChart";
import { DateRange } from "../DateRangePicker";
import { DonutChartParams } from "@/types/incomes";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface IncomeCategoryChartProps {
  dateRange?: DateRange;
  formatCurrency: (amount: number) => string;
  onSelectCategory?: (category: string) => void;
}

const IncomeCategoryChart: React.FC<IncomeCategoryChartProps> = ({
  dateRange,
  formatCurrency,
  onSelectCategory,
}) => {
  const isMobile = useIsMobile();

  const queryParams: DonutChartParams = useMemo(() => {
    if (!dateRange) return {};
    return {
      date_filter: "custom",
      start_date: dateRange.from?.toISOString().split("T")[0],
      end_date: dateRange.to?.toISOString().split("T")[0],
    };
  }, [dateRange]);

  const { data: chartData, isLoading, error } = useIncomePieChart(queryParams);

  const pieData = useMemo(() => {
    if (!chartData?.labels || !chartData?.datasets?.[0]) return [];
    return chartData.labels.map((label, i) => ({
      name: label,
      value: chartData.datasets[0].data[i],
      color: chartData.datasets[0].backgroundColor[i],
    }));
  }, [chartData]);

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardContent className="pt-3 xs:pt-4 sm:pt-6 px-2 xs:px-3 sm:px-4 h-full flex flex-col grow">
        <div className="flex justify-between items-center mb-1 xs:mb-2">
          <h3 className="xs:text-base sm:text-lg text-sm font-semibold">
            Ingresos por Categoría
          </h3>
          {chartData?.filter_summary && (
            <p className="text-xs text-muted-foreground">{chartData.filter_summary}</p>
          )}
        </div>
        <div className="flex-1 flex items-center justify-center relative min-h-[200px]">
          {isLoading ? (
            <Skeleton className="w-32 h-32 sm:w-44 sm:h-44 rounded-full" />
          ) : error ? (
            <div className="flex flex-col items-center justify-center">
              <AlertCircle className="h-8 w-8 text-destructive mb-2" />
              <p className="text-sm text-muted-foreground">Error al cargar los datos</p>
            </div>
          ) : pieData.length === 0 ? (
            <p className="text-sm text-muted-foreground">No hay datos disponibles</p>
          ) : (
            <ResponsiveContainer width="100%" height={isMobile ? 200 : 250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={isMobile ? 30 : 55}
                  outerRadius={isMobile ? 55 : 85}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) =>
                    isMobile
                      ? `${(percent * 100).toFixed(0)}%`
                      : `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                  onClick={(data) => onSelectCategory?.(data.name)}
                  style={{ cursor: onSelectCategory ? "pointer" : "default" }}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.7} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload?.[0]) {
                      const value = payload[0].value as number;
                      return (
                        <div className="bg-card p-2 rounded shadow border text-xs">
                          <p className="font-semibold">{payload[0].name}</p>
                          <p>{formatCurrency(value)}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                {!isMobile && (
                  <Legend
                    wrapperStyle={{ fontSize: "11px" }}
                    iconSize={8}
                  />
                )}
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
        {chartData && (
          <div className="text-right mt-2 text-sm">
            <p className="font-semibold">Total: {formatCurrency(chartData.total_amount)}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IncomeCategoryChart;
