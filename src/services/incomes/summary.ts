import { apiClient } from "../api";
import { IncomeSummaryData, IncomeSummaryParams } from "../../types/incomes";
import { getUserTimezone } from "@/utils/dateUtils";

/**
 * Obtiene un resumen de ingresos por período (semana, mes, año o todo)
 *
 * @param params Parámetros opcionales (period, timezone)
 * @returns Datos de resumen de ingresos
 */
export const getIncomeSummary = async (
  params: IncomeSummaryParams = {}
): Promise<IncomeSummaryData> => {
  try {
    // Añadir timezone del usuario si no está especificada
    const paramsWithTimezone = {
      ...params,
      timezone: params.timezone || getUserTimezone(),
    };

    // Realizar la petición HTTP
    const response = await apiClient.get<IncomeSummaryData>(
      "/api/incomes/summary/",
      { params: paramsWithTimezone }
    );

    return response.data;
  } catch (error) {
    console.error("Error al obtener resumen de ingresos:", error);

    // Devolver estructura vacía en caso de error
    return {
      period: params.period || "month",
      start_date: null,
      end_date: new Date().toISOString().split("T")[0],
      summary: [],
      total: 0,
    };
  }
};

export default getIncomeSummary;
