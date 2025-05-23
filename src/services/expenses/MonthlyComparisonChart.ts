import { useQuery } from "@tanstack/react-query";
import { ExpensesService } from "./expenses";
import { MonthlyComparisonChartParams } from "@/types/expenses";

/**
 * Hook para obtener los datos del gráfico de comparación mensual
 * @param params Parámetros para filtrar los datos
 * @returns Query con los datos del gráfico
 */
export const useMonthlyComparisonChartData = (
  params: MonthlyComparisonChartParams = {}
) => {
  const expensesService = new ExpensesService();

  return useQuery({
    queryKey: ["monthlyComparisonChartData", params],
    queryFn: () => expensesService.getMonthlyComparisonChartData(params),
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchOnWindowFocus: false,
  });
};
