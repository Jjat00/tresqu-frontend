import { apiClient } from "@/services/api";
import { BarStackedChartData, BarStackedChartParams } from "@/types/incomes";
import { getUserTimezone } from "@/utils/dateUtils";

/**
 * Obtiene datos para una gráfica de barras apiladas de ingresos por categoría y tiempo.
 *
 * @param params Parámetros de filtrado para los datos de la gráfica
 * @returns Datos formateados para una gráfica de barras apiladas usando Chart.js
 */
export const getBarStackedChartData = async (
  params: BarStackedChartParams = {}
): Promise<BarStackedChartData> => {
  try {
    // Construir query params para la petición
    const queryParams = new URLSearchParams();

    if (params.category_id) {
      queryParams.append("category_id", params.category_id.toString());
    }

    if (params.date_filter) {
      queryParams.append("date_filter", params.date_filter);
    }

    if (params.start_date) {
      queryParams.append("start_date", params.start_date);
    }

    if (params.end_date) {
      queryParams.append("end_date", params.end_date);
    }

    if (params.limit) {
      queryParams.append("limit", params.limit.toString());
    }

    if (params.group_by) {
      queryParams.append("group_by", params.group_by);
    }

    // Añadir el parámetro de timezone
    queryParams.append("timezone", getUserTimezone());

    // Realizar la petición HTTP usando apiClient
    const response = await apiClient.get<BarStackedChartData>(
      `/api/incomes/stacked_bar_chart_data/?${queryParams.toString()}`
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener datos de gráfica de barras apiladas de ingresos:",
      error
    );

    // Devolver estructura vacía en caso de error
    return {
      labels: [],
      datasets: [],
      filter_summary: "Error al cargar datos",
      total_amount: 0,
      group_by: "day",
      recent_incomes: [],
    };
  }
};
