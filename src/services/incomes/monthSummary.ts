import { apiClient } from "../api";
import { IncomesMonthSummary } from "@/types/incomes";
import { getUserTimezone } from "@/utils/dateUtils";

/**
 * Ingresos de un mes con el detalle completo de cada movimiento.
 *
 * A diferencia de `/api/incomes/summary/` (agregado por categoría), este
 * endpoint devuelve cada ingreso con su id, moneda, nota y fecha: es lo que
 * necesita la tabla del dashboard para mostrarlos y editarlos.
 */
export const getIncomesMonthSummary = async (
  month: number,
  year: number
): Promise<IncomesMonthSummary> => {
  const response = await apiClient.get<IncomesMonthSummary>(
    "/api/incomes/month_summary/",
    { params: { month, year, timezone: getUserTimezone() } }
  );
  return response.data;
};

export default getIncomesMonthSummary;
