import { apiClient } from "../api";
import {
  MonthlyComparisonChartData,
  MonthlyComparisonChartParams,
} from "@/types/expenses";

/**
 * Servicio para manejar operaciones relacionadas con gastos
 */
export class ExpensesService {
  private baseUrl: string;

  constructor(baseUrl = "/api") {
    this.baseUrl = baseUrl;
  }

  /**
   * Elimina un gasto específico por su ID
   * @param expenseId ID del gasto a eliminar
   * @returns Promise que se resuelve cuando el gasto ha sido eliminado
   */
  async deleteExpense(expenseId: number): Promise<void> {
    try {
      await apiClient.delete(`${this.baseUrl}/expenses/${expenseId}/`);
    } catch (error) {
      console.error("Error al eliminar el gasto:", error);
      throw error;
    }
  }

  /**
   * Obtiene los datos para el gráfico de comparación mensual
   * @param params Parámetros para filtrar los datos
   * @returns Promise con los datos del gráfico de comparación mensual
   */
  async getMonthlyComparisonChartData(
    params: MonthlyComparisonChartParams = {}
  ): Promise<MonthlyComparisonChartData> {
    try {
      const queryParams = new URLSearchParams();

      if (params.month) queryParams.append("month", params.month.toString());
      if (params.year) queryParams.append("year", params.year.toString());
      if (params.timezone) queryParams.append("timezone", params.timezone);

      const response = await apiClient.get(
        `${
          this.baseUrl
        }/expenses/monthly_comparison_chart_data/?${queryParams.toString()}`
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error al obtener datos del gráfico de comparación mensual:",
        error
      );
      throw error;
    }
  }
}
