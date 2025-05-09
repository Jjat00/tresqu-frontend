import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { AlertCircle, Loader2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useIncomeBarData } from "@/hooks/useIncomeBarData";
import { DateRange } from "../DateRangePicker";
import { BarStackedChartParams } from "@/types/incomes";

interface IncomeBarChartProps {
  timeFilter: "month" | "quarter" | "year";
  dateRange?: DateRange;
  formatCurrency: (amount: number) => string;
}

interface ChartDataItem {
  [key: string]: string | number;
}

const IncomeBarChart: React.FC<IncomeBarChartProps> = ({
  timeFilter,
  dateRange,
  formatCurrency,
}) => {
  const isMobile = useIsMobile();

  // Convertir filtros a parámetros para el hook
  const queryParams: BarStackedChartParams = useMemo(() => {
    const params: BarStackedChartParams = {};

    // Configurar group_by basado en timeFilter
    if (timeFilter === "month") {
      params.group_by = "day";
      params.date_filter = "current_month";
    } else if (timeFilter === "quarter") {
      params.group_by = "week";
      params.date_filter = "custom";
      // Calcular fecha de hace 3 meses
      const today = new Date();
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(today.getMonth() - 3);
      params.start_date = threeMonthsAgo.toISOString().split("T")[0];
      params.end_date = today.toISOString().split("T")[0];
    } else if (timeFilter === "year") {
      params.group_by = "month";
      params.date_filter = "current_year";
    }

    // Si hay un rango de fechas personalizado, usarlo en lugar de los filtros predefinidos
    if (dateRange?.from && dateRange?.to) {
      params.date_filter = "custom";
      params.start_date = dateRange.from.toISOString().split("T")[0];
      params.end_date = dateRange.to.toISOString().split("T")[0];
    }

    return params;
  }, [timeFilter, dateRange]);

  const { data, isLoading, error, refetch } = useIncomeBarData(queryParams);

  // Transformar los datos para Recharts
  const chartData: ChartDataItem[] = useMemo(() => {
    if (!data || !data.labels || !data.datasets) return [];

    return data.labels.map((label, index) => {
      const item: ChartDataItem = {
        name: label,
      };

      // Añadir cada categoría como propiedad
      data.datasets.forEach((dataset) => {
        item[dataset.label] = dataset.data[index] || 0;
      });

      return item;
    });
  }, [data]);

  // Título del gráfico
  const chartTitle = useMemo(() => {
    if (timeFilter === "month") {
      return "Ingresos Mensuales";
    } else if (timeFilter === "quarter") {
      return "Ingresos Trimestrales";
    } else {
      return "Ingresos Anuales";
    }
  }, [timeFilter]);

  return (
    <Card className="overflow-hidden h-full">
      <CardContent className="pt-3 xs:pt-4 sm:pt-6 xs:px-3 sm:px-4 h-full flex flex-col px-[15px]">
        <div className="flex justify-between items-center mb-1 xs:mb-2">
          <h3 className="text-sm xs:text-base sm:text-lg font-semibold">
            {chartTitle}
          </h3>
          {data && (
            <div className="text-xs text-muted-foreground">
              {data.filter_summary}
            </div>
          )}
        </div>

        <div className="flex-1 min-h-[200px] flex items-center justify-center">
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 text-primary animate-spin mr-2" />
              <span className="text-sm text-muted-foreground">
                Cargando datos...
              </span>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center">
              <AlertCircle className="h-8 w-8 text-destructive mb-2" />
              <p className="text-sm text-destructive mb-1">
                Error al cargar los datos
              </p>
              <button
                onClick={() => refetch()}
                className="text-xs text-primary hover:underline mt-2"
              >
                Reintentar
              </button>
            </div>
          ) : chartData.length === 0 ? (
            <div className="flex items-center justify-center">
              <p className="text-sm text-muted-foreground">
                No hay datos disponibles para este periodo
              </p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={isMobile ? "90%" : "95%"}>
              <BarChart
                data={chartData}
                margin={
                  isMobile
                    ? {
                        top: 5,
                        right: 5,
                        left: -25,
                        bottom: 15,
                      }
                    : {
                        top: 20,
                        right: 20,
                        left: 0,
                        bottom: 15,
                      }
                }
                barSize={isMobile ? 8 : 20}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{
                    fontSize: isMobile ? 7 : 12,
                  }}
                  interval={isMobile ? 1 : 0}
                  angle={isMobile ? -45 : 0}
                  textAnchor={isMobile ? "end" : "middle"}
                  height={isMobile ? 50 : 30}
                />
                <YAxis
                  tick={{
                    fontSize: isMobile ? 8 : 12,
                  }}
                  width={isMobile ? 30 : 50}
                  tickFormatter={(value) =>
                    value >= 1000
                      ? `${Math.floor(value / 1000)}k`
                      : value.toString()
                  }
                />
                <Tooltip
                  formatter={(value, name) => {
                    return [formatCurrency(value as number), name.toString()];
                  }}
                  contentStyle={{
                    fontSize: isMobile ? "10px" : "12px",
                  }}
                />
                <Legend
                  wrapperStyle={{
                    fontSize: isMobile ? "8px" : "12px",
                    bottom: 0,
                    paddingTop: 5,
                  }}
                />
                {data?.datasets.map((dataset, index) => (
                  <Bar
                    key={dataset.label}
                    dataKey={dataset.label}
                    stackId="a"
                    fill={dataset.backgroundColor}
                    stroke={dataset.borderColor}
                    strokeWidth={dataset.borderWidth}
                    radius={index === 0 ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                    cursor="pointer"
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {data && data.total_amount > 0 && (
          <div className="mt-2 text-right">
            <span className="text-xs font-medium">
              Total: {formatCurrency(data.total_amount)}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IncomeBarChart;
