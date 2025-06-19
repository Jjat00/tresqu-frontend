import { apiClient } from "../api";
import {
  MonthlyComparisonChartData,
  MonthlyComparisonChartParams,
  UpdateExpenseRequest,
  UpdateExpenseResponse,
} from "@/types/expenses";

// Tipo para las categorías
export interface ExpenseCategory {
  name: string;
  id?: number;
}

// Respuesta del endpoint de categorías
export interface ExpenseCategoriesResponse {
  categories: string[];
}

/**
 * Servicio para manejar operaciones relacionadas con gastos
 */
export class ExpensesService {
  private baseUrl: string;

  constructor(baseUrl = "/api") {
    this.baseUrl = baseUrl;
  }

  /**
   * Obtiene las categorías disponibles para gastos
   * @returns Promise con la lista de categorías
   */
  async getCategories(): Promise<string[]> {
    try {
      const response = await apiClient.get<ExpenseCategoriesResponse>(
        `${this.baseUrl}/expenses/by_category/`
      );

      if (
        response.data &&
        response.data.categories &&
        Array.isArray(response.data.categories)
      ) {
        return response.data.categories;
      }

      return [];
    } catch (error) {
      console.error("Error al obtener categorías:", error);
      throw error;
    }
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
   * Actualiza un gasto específico por su ID (actualización parcial)
   * @param expenseId ID del gasto a actualizar
   * @param updateData Datos a actualizar del gasto
   * @returns Promise con el gasto actualizado
   */
  async updateExpense(
    expenseId: number,
    updateData: UpdateExpenseRequest
  ): Promise<UpdateExpenseResponse> {
    try {
      const response = await apiClient.patch(
        `${this.baseUrl}/expenses/${expenseId}/`,
        updateData
      );
      return response.data;
    } catch (error) {
      console.error("Error al actualizar el gasto:", error);
      throw error;
    }
  }

  /**
   * Reemplaza completamente un gasto específico por su ID
   * @param expenseId ID del gasto a reemplazar
   * @param updateData Datos completos del gasto
   * @returns Promise con el gasto actualizado
   */
  async replaceExpense(
    expenseId: number,
    updateData: UpdateExpenseRequest
  ): Promise<UpdateExpenseResponse> {
    try {
      const response = await apiClient.put(
        `${this.baseUrl}/expenses/${expenseId}/`,
        updateData
      );
      return response.data;
    } catch (error) {
      console.error("Error al reemplazar el gasto:", error);
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
