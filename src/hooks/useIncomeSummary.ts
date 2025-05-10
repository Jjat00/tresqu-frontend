import { useQuery, useQueryClient } from "@tanstack/react-query";
import getIncomeSummary from "@/services/incomes/summary";
import { IncomeSummaryParams } from "@/types/incomes";

/**
 * Hook para obtener un resumen de ingresos por período
 *
 * @param params Parámetros opcionales (period, timezone)
 * @returns Estado de la consulta con el resumen de ingresos
 */
export const useIncomeSummary = (params: IncomeSummaryParams = {}) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["incomeSummary", params.period],
    queryFn: () => getIncomeSummary(params),
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 2,
  });
};

export default useIncomeSummary;
