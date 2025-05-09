import React from "react";
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
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";
import { DateRange } from "../DateRangePicker";
import { useBarStackedChart } from "@/hooks/userBarStackedChart";
import { BarStackedChartParams } from "@/types/expenses";
import { toLocalISODate } from "@/utils/dateUtils";

interface ChartDataItem {
  [key: string]: string | number | Record<string, number>;
}

interface ExpensesBarChartProps {
  viewMode: "month" | "year";
  selectedMonth: string;
  dateRange?: DateRange;
}

// Mapeo de nombres de meses a números
const monthToNumber: Record<string, number> = {
  Enero: 1,
  Febrero: 2,
  Marzo: 3,
  Abril: 4,
  Mayo: 5,
  Junio: 6,
  Julio: 7,
  Agosto: 8,
  Septiembre: 9,
  Octubre: 10,
  Noviembre: 11,
  Diciembre: 12,
};

const ExpensesBarChart: React.FC<ExpensesBarChartProps> = ({
  viewMode,
  selectedMonth,
  dateRange,
}) => {
  const isMobile = useIsMobile();

  // Determinar los parámetros para la API según el viewMode y selectedMonth
  const getChartParams = (): BarStackedChartParams => {
    const params: BarStackedChartParams = {};

    if (dateRange) {
      // Si hay un rango de fechas personalizado
      params.date_filter = "custom";
      params.start_date = dateRange.from
        ? toLocalISODate(dateRange.from)
        : undefined;
      params.end_date = dateRange.to ? toLocalISODate(dateRange.to) : undefined;

      // Determinar group_by basado en la duración del rango
      if (dateRange.from && dateRange.to) {
        const diffDays = Math.ceil(
          (dateRange.to.getTime() - dateRange.from.getTime()) /
            (1000 * 60 * 60 * 24)
        );
        if (diffDays > 90) {
          params.group_by = "month";
        } else if (diffDays > 14) {
          params.group_by = "week";
        } else {
          params.group_by = "day";
        }
      }
    } else if (viewMode === "year" || selectedMonth === "year") {
      // Si estamos en vista de año, agrupar por mes
      params.date_filter = "current_year";
      params.group_by = "month";
    } else if (viewMode === "month" && selectedMonth !== "year") {
      // Si estamos en vista de mes específico
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

      // Para vista de mes, agrupar por semana
      params.group_by = "week";
    } else {
      // Caso por defecto
      params.date_filter = "current_month";
      params.group_by = "week";
    }

    return params;
  };

  // Usar el hook para obtener los datos
  const { data, isLoading, isError, error, refetch } = useBarStackedChart(
    getChartParams()
  );

  // Transformar los datos para que funcionen con Recharts
  const transformDataForRecharts = (): ChartDataItem[] => {
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
  };

  const chartData = transformDataForRecharts();

  // Determinar el título del gráfico según el modo de vista
  const chartTitle = React.useMemo(() => {
    if (!data) return "Cargando...";

    if (viewMode === "year" || selectedMonth === "year") {
      return "Gastos Mensuales";
    } else if (viewMode === "month") {
      return `Gastos Semanales - ${selectedMonth}`;
    } else {
      return "Gastos Anuales";
    }
  }, [viewMode, selectedMonth, data]);

  // Formatear valores para el Tooltip
  const formatTooltipValue = (value: number) => {
    return value ? `$${value.toLocaleString("es-CO")}` : "$0";
  };

  // Mostrar error en toast cuando ocurre
  React.useEffect(() => {
    if (isError && error) {
      toast.error("No se pudieron cargar los datos de gastos");
    }
  }, [isError, error]);

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
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-success mb-2"></div>
              <p className="text-sm text-muted-foreground">Cargando datos...</p>
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center">
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
            <div className="flex flex-col items-center justify-center">
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
                    return [
                      formatTooltipValue(value as number),
                      name.toString(),
                    ];
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
              Total: ${data.total_amount.toLocaleString("es-CO")}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpensesBarChart;
