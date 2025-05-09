import { apiClient } from "../api";
import { IncomeStats, IncomeStatsParams } from "../../types/incomes";
import { getUserTimezone } from "@/utils/dateUtils";

/**
 * Obtiene estadísticas de ingresos incluyendo promedio mensual, comparación
 * con el mes anterior y proyección para el próximo mes.
 *
 * @param params Parámetros opcionales (months_for_average, timezone)
 * @returns Estadísticas de ingresos
 */
export const getIncomeStatistics = async (
  params: IncomeStatsParams = {}
): Promise<IncomeStats> => {
  try {
    // Añadir timezone del usuario si no está especificada
    const paramsWithTimezone = {
      ...params,
      timezone: params.timezone || getUserTimezone(),
    };

    // Realizar la petición HTTP
    const response = await apiClient.get<IncomeStats>(
      "/api/incomes/statistics/",
      { params: paramsWithTimezone }
    );

    return response.data;
  } catch (error) {
    console.error("Error al obtener estadísticas de ingresos:", error);

    // Devolver estructura vacía en caso de error
    return {
      average_monthly_income: 0,
      current_month_income: 0,
      previous_month_income: 0,
      difference: 0,
      percentage_change: 0,
      next_month_projection: 0,
      months_analyzed: 0,
    };
  }
};

export default getIncomeStatistics;
