import { useQuery } from "@tanstack/react-query";
import pieChartService from "../services/incomes/pieChart";
import { DonutChartParams } from "../types/incomes";

/**
 * Hook para obtener los datos de la gráfica de dona de ingresos
 *
 * @param params Parámetros de filtrado opcional
 * @returns Estado de la consulta con los datos de la gráfica
 */
export const useIncomePieChart = (params: DonutChartParams = {}) => {
  return useQuery({
    queryKey: ["incomePieChart", params],
    queryFn: () => pieChartService.getDonutChartData(params),
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 2,
  });
};

export default useIncomePieChart;
