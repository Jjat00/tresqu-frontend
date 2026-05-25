import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { DateRange } from "@/components/dashboard/DateRangePicker";
import {
  getExpensesLineChartData,
  LineChartParams,
} from "@/services/expenses/lineChart";
import {
  isLocalToday,
  isLocalYesterday,
  toLocalISODate,
} from "@/utils/dateUtils";

export type { LineChartData } from "@/services/expenses/lineChart";

export const useLineChartData = (
  dateRange: DateRange,
  viewMode: "day" | "week" | "month" | "year"
) => {
  // Convertir dateRange y viewMode a parámetros de LineChart
  const getQueryParams = (): LineChartParams => {
    const params: LineChartParams = {};

    if (dateRange.from && dateRange.to) {
      // Usar nuestras utilidades de zona horaria para verificar si dateRange es para hoy
      const isToday =
        isLocalToday(dateRange.from) && isLocalToday(dateRange.to);

      // Usar nuestras utilidades de zona horaria para verificar si dateRange es para ayer
      const isYesterday =
        isLocalYesterday(dateRange.from) && isLocalYesterday(dateRange.to);

      if (isToday) {
        params.date_filter = "today";
      } else if (isYesterday) {
        params.date_filter = "yesterday";
      } else {
        // Rango de fechas personalizado
        params.date_filter = "custom";
        params.start_date = toLocalISODate(dateRange.from);
        params.end_date = toLocalISODate(dateRange.to);

        // Para rangos de fecha personalizados, siempre agrupar por día independientemente del modo de vista
        params.group_by = "day";
      }
    } else {
      // Usar filtros predefinidos si el rango de fechas no está completo
      switch (viewMode) {
        case "day":
          params.date_filter = "today";
          break;
        case "week":
          params.date_filter = "current_week";
          params.group_by = "day"; // Agrupar explícitamente por día para vista semanal
          break;
        case "month":
          params.date_filter = "current_month";
          break;
        case "year":
          params.date_filter = "current_year";
          break;
        default:
          params.date_filter = "current_week";
          params.group_by = "day";
      }
    }

    return params;
  };

  const queryParams = getQueryParams();

  // Usar React Query para manejar la obtención y el estado de los datos
  const query = useQuery({
    queryKey: ["expensesLineChart", queryParams],
    queryFn: async () => {
      try {
        return await getExpensesLineChartData(queryParams);
      } catch (error) {
        console.error("Error loading line chart:", error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  return {
    data: query.data || null,
    isLoading: query.isLoading,
    error: query.error as Error | null,
  };
};
