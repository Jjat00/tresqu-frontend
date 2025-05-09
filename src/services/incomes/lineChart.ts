import { apiClient } from "../api";
import { LineChartData, LineChartParams } from "../../types/incomes";
import { getUserTimezone } from "@/utils/dateUtils";

/**
 * Servicio para obtener datos de gráfico de línea de ingresos
 * @param params Parámetros para filtrar los datos
 * @returns Datos formateados para el gráfico de línea
 */
export const getIncomesLineChartData = async (
  params?: LineChartParams
): Promise<LineChartData> => {
  try {
    // Crea una copia de los parámetros para no modificar el objeto original
    const paramsWithTimezone = { ...params, timezone: getUserTimezone() };

    const response = await apiClient.get("/api/incomes/line_chart_data/", {
      params: paramsWithTimezone,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener datos para el gráfico de línea de ingresos:",
      error
    );
    // Devolver estructura vacía en caso de error
    return {
      labels: [],
      datasets: [
        {
          label: "Total de ingresos",
          data: [],
          backgroundColor: "rgba(74, 222, 128, 0.2)", // Verde claro para ingresos
          borderColor: "rgba(74, 222, 128, 1)", // Verde para ingresos
          borderWidth: 2,
          fill: true,
          tension: 0.1,
        },
      ],
      filter_summary: "Sin datos",
      total_amount: 0,
    };
  }
};
