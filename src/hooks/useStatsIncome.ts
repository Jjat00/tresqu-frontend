import { useQuery } from "@tanstack/react-query";
import getIncomeStatistics from "@/services/incomes/stats";
import { IncomeStatsParams } from "@/types/incomes";

/**
 * Hook para obtener estadísticas de ingresos
 *
 * @param params Parámetros opcionales (months_for_average, timezone)
 * @returns Estado de la consulta con las estadísticas de ingresos
 */
export const useStatsIncome = (params: IncomeStatsParams = {}) => {
  return useQuery({
    queryKey: ["incomeStats", params.months_for_average],
    queryFn: () => getIncomeStatistics(params),
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 2,
  });
};

export default useStatsIncome;
