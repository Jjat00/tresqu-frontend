import { apiClient } from "../api";


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
}

