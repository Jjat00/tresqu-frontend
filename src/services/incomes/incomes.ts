import { apiClient } from "../api";
import { IncomeRow, UpdateIncomeRequest } from "@/types/incomes";

/**
 * Servicio para manejar operaciones relacionadas con ingresos
 */
export class IncomesService {
  private baseUrl: string;

  constructor(baseUrl = "/api") {
    this.baseUrl = baseUrl;
  }

  /**
   * Elimina un ingreso específico por su ID
   * @param incomeId ID del ingreso a eliminar
   * @returns Promise que se resuelve cuando el ingreso ha sido eliminado
   */
  async deleteIncome(incomeId: number): Promise<void> {
    try {
      await apiClient.delete(`${this.baseUrl}/incomes/${incomeId}/`);
    } catch (error) {
      console.error("Error al eliminar el ingreso:", error);
      throw error;
    }
  }

  /**
   * Actualiza parcialmente un ingreso.
   *
   * La categoría se envía como `user_category_name`: el serializer la resuelve
   * (o la crea) dentro de las categorías de ingreso del usuario.
   * @param incomeId ID del ingreso a actualizar
   * @param data Campos a modificar
   */
  async updateIncome(
    incomeId: number,
    data: UpdateIncomeRequest
  ): Promise<IncomeRow> {
    try {
      const response = await apiClient.patch<IncomeRow>(
        `${this.baseUrl}/incomes/${incomeId}/`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error al actualizar el ingreso:", error);
      throw error;
    }
  }
}
