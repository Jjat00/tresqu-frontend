import { DonutChartData, DonutChartParams } from "../../types/expenses";
import { apiClient } from "../api";

/**
 * Servicio para obtener datos de gastos formateados para gráficas de dona
 */
export class PieChartService {
  private baseUrl: string;

  constructor(baseUrl = "/api") {
    this.baseUrl = baseUrl;
  }

  /**
   * Obtiene los datos para la gráfica de dona de gastos
   *
   * @param params Parámetros de filtrado opcional
   * @returns Datos formateados para una gráfica de dona
   */
  async getDonutChartData(
    params: DonutChartParams = {}
  ): Promise<DonutChartData> {
    const endpoint = `${this.baseUrl}/expenses/donut_chart_data/`;

    // Validar parámetros para filtro personalizado
    if (params.date_filter === "custom") {
      if (!params.start_date || !params.end_date) {
        throw new Error(
          'start_date y end_date son requeridos cuando date_filter es "custom"'
        );
      }
    }

    try {
      const response = await apiClient.get<DonutChartData>(endpoint, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener datos para la gráfica de dona:", error);
      throw error;
    }
  }
}

// Exportar una instancia por defecto para uso fácil
export default new PieChartService();
