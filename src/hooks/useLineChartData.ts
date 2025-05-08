import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { toast } from "sonner";
import { DateRange } from "@/components/dashboard/DateRangePicker";
import {
  getExpensesLineChartData,
  LineChartParams,
} from "@/services/expenses/lineChart";

export type { LineChartData } from "@/services/expenses/lineChart";

export const useLineChartData = (
  dateRange: DateRange,
  viewMode: "day" | "week" | "month" | "year"
) => {
  // Convertir dateRange y viewMode a parámetros de LineChart
  const getQueryParams = (): LineChartParams => {
    const params: LineChartParams = {};

    if (dateRange.from && dateRange.to) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      // Verificar si dateRange es para hoy
      const isToday =
        dateRange.from.getTime() === today.getTime() &&
        dateRange.to.getTime() === today.getTime();

      // Verificar si dateRange es para ayer
      const isYesterday =
        dateRange.from.getTime() === yesterday.getTime() &&
        dateRange.to.getTime() === yesterday.getTime();

      if (isToday) {
        params.date_filter = "today";
      } else if (isYesterday) {
        params.date_filter = "yesterday";
      } else {
        // Rango de fechas personalizado
        params.date_filter = "custom";
        params.start_date = format(dateRange.from, "yyyy-MM-dd");
        params.end_date = format(dateRange.to, "yyyy-MM-dd");

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
        toast.error("No se pudieron cargar los datos del gráfico");
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
