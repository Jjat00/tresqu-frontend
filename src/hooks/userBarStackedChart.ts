import { useQuery } from "@tanstack/react-query";
import { getBarStackedChartData } from "@/services/expenses/BarStackedChart";
import { BarStackedChartParams } from "@/types/expenses";

/**
 * Hook para obtener y gestionar datos de gráficas de barras apiladas
 * utilizando react-query para caché y manejo de estados
 *
 * @param params Parámetros para filtrar los datos de la gráfica
 * @returns Objeto con datos, estado de carga, error y funciones de recarga
 */
export const useBarStackedChart = (params: BarStackedChartParams = {}) => {
  const queryKey = ["barStackedChart", params];

  const query = useQuery({
    queryKey,
    queryFn: () => getBarStackedChartData(params),
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchOnWindowFocus: false,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    isRefetching: query.isRefetching,
  };
};
