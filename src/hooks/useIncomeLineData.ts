import { useQuery } from "@tanstack/react-query";
import { getIncomesLineChartData } from "@/services/incomes/lineChart";
import { LineChartParams } from "@/types/incomes";
import { DateRange } from "@/components/dashboard/DateRangePicker";
import { isSameDay, isToday, isYesterday } from "date-fns";

/**
 * Hook para obtener datos del gráfico de línea de ingresos
 *
 * @param dateRange Rango de fechas seleccionado
 * @param viewMode Modo de visualización (day, week, month, year)
 * @returns Estado de la consulta con los datos del gráfico
 */
export const useIncomeLineData = (
  dateRange?: DateRange,
  viewMode: "day" | "week" | "month" | "year" = "month"
) => {
  // Convertir los parámetros al formato esperado por el servicio
  const getQueryParams = (): LineChartParams => {
    const params: LineChartParams = {};

    // Si hay rango de fechas personalizado
    if (dateRange?.from && dateRange?.to) {
      // Verificar si es hoy o ayer primero
      const isDateToday =
        dateRange.from &&
        dateRange.to &&
        isToday(dateRange.from) &&
        isToday(dateRange.to);

      const isDateYesterday =
        dateRange.from &&
        dateRange.to &&
        isYesterday(dateRange.from) &&
        isYesterday(dateRange.to);

      if (isDateToday) {
        // Para hoy, forzar agrupación por hora
        params.date_filter = "today";
        params.group_by = "hour";
      } else if (isDateYesterday) {
        // Para ayer, forzar agrupación por hora
        params.date_filter = "yesterday";
        params.group_by = "hour";
      } else {
        // Para otras fechas personalizadas
        params.date_filter = "custom";
        params.start_date = dateRange.from.toISOString().split("T")[0];
        params.end_date = dateRange.to.toISOString().split("T")[0];

        // Si es el mismo día, agrupar por hora
        if (isSameDay(dateRange.from, dateRange.to)) {
          params.group_by = "hour";
        } else {
          // Si son pocos días, agrupar por día
          const diffDays = Math.ceil(
            (dateRange.to.getTime() - dateRange.from.getTime()) /
              (1000 * 60 * 60 * 24)
          );

          if (diffDays <= 31) {
            params.group_by = "day";
          } else if (diffDays <= 90) {
            params.group_by = "week";
          } else {
            params.group_by = "month";
          }
        }
      }
    } else {
      // Filtros basados en el modo de visualización
      switch (viewMode) {
        case "day":
          params.date_filter = "today";
          params.group_by = "hour";
          break;
        case "week":
          params.date_filter = "current_week";
          params.group_by = "day";
          break;
        case "month":
          params.date_filter = "current_month";
          params.group_by = "day";
          break;
        case "year":
          params.date_filter = "current_year";
          params.group_by = "month";
          break;
        default:
          params.date_filter = "current_month";
          params.group_by = "day";
      }
    }

    // Asegurarse de que siempre tenga group_by definido
    if (!params.group_by) {
      if (
        params.date_filter === "today" ||
        params.date_filter === "yesterday"
      ) {
        params.group_by = "hour";
      } else if (
        params.date_filter === "current_week" ||
        params.date_filter === "current_month"
      ) {
        params.group_by = "day";
      } else if (params.date_filter === "current_year") {
        params.group_by = "month";
      } else {
        // Para 'custom' y cualquier otro valor
        params.group_by = "day";
      }
    }

    console.log("LineChart params:", params);
    return params;
  };

  return useQuery({
    queryKey: ["incomeLineData", viewMode, dateRange?.from, dateRange?.to],
    queryFn: () => getIncomesLineChartData(getQueryParams()),
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 2,
  });
};

export default useIncomeLineData;
