import { useQuery } from "@tanstack/react-query";
import { getBarStackedChartData } from "@/services/incomes/barStackedChart";
import { BarStackedChartParams } from "@/types/incomes";

/**
 * Hook para obtener datos de la gráfica de barras apiladas de ingresos
 *
 * @param params Parámetros de filtrado opcional
 * @returns Estado de la consulta con los datos de la gráfica
 */
export const useIncomeBarData = (params: BarStackedChartParams = {}) => {
  return useQuery({
    queryKey: ["incomeBarData", params],
    queryFn: () => getBarStackedChartData(params),
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 2,
  });
};

export default useIncomeBarData;
