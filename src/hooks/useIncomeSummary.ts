import { useQuery } from "@tanstack/react-query";
import getIncomeSummary from "@/services/incomes/summary";
import { IncomeSummaryParams } from "@/types/incomes";
import { DateRange } from "@/components/dashboard/DateRangePicker";

/**
 * Hook para obtener un resumen de ingresos.
 *
 * Si se pasa `dateRange` (el filtro de fecha global del dashboard), el resumen
 * sigue ese rango personalizado, igual que las gráficas de ingresos. Si no, se
 * usa el `period` (semana/mes/año/todo) — útil para la tabla, que tiene su
 * propio filtro independiente del calendario global.
 *
 * @param params Parámetros opcionales (period, timezone)
 * @param dateRange Rango de fecha del calendario global (opcional)
 * @returns Estado de la consulta con el resumen de ingresos
 */
export const useIncomeSummary = (
  params: IncomeSummaryParams = {},
  dateRange?: DateRange
) => {
  const effectiveParams: IncomeSummaryParams =
    dateRange?.from && dateRange?.to
      ? {
          ...params,
          date_filter: "custom",
          start_date: dateRange.from.toISOString().split("T")[0],
          end_date: dateRange.to.toISOString().split("T")[0],
        }
      : params;

  return useQuery({
    queryKey: [
      "incomeSummary",
      effectiveParams.period,
      effectiveParams.start_date,
      effectiveParams.end_date,
    ],
    queryFn: () => getIncomeSummary(effectiveParams),
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 2,
  });
};

export default useIncomeSummary;
