import { apiClient } from "../api";
import { getUserTimezone } from "@/utils/dateUtils";

/**
 * Interfaz para los parámetros de filtrado del gráfico de línea
 */
export interface LineChartParams {
  category_id?: number;
  date_filter?:
    | "all"
    | "today"
    | "yesterday"
    | "current_month"
    | "previous_month"
    | "current_week"
    | "previous_week"
    | "current_year"
    | "previous_year"
    | "custom";
  start_date?: string; // Formato YYYY-MM-DD
  end_date?: string; // Formato YYYY-MM-DD
  group_by?: "day" | "week" | "month" | "hour";
  timezone?: string; // Añadida propiedad para zona horaria
}

/**
 * Interfaz para los datos de respuesta del gráfico de línea
 */
export interface LineChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    fill: boolean;
    tension: number;
  }[];
  filter_summary: string;
  total_amount: number;
}

/**
 * Servicio para obtener datos de gráfico de línea de gastos
 * @param params Parámetros para filtrar los datos
 * @returns Datos formateados para el gráfico de línea
 */
export const getExpensesLineChartData = async (
  params?: LineChartParams
): Promise<LineChartData> => {
  try {
    // Crea una copia de los parámetros para no modificar el objeto original
    const paramsWithTimezone = { ...params, timezone: getUserTimezone() };

    const response = await apiClient.get("/api/expenses/line_chart_data/", {
      params: paramsWithTimezone,
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos para el gráfico de línea:", error);
    // Devolver estructura vacía en caso de error
    return {
      labels: [],
      datasets: [
        {
          label: "Total de gastos",
          data: [],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
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
