import { apiClient } from "../api";
import {
  UserIncomeCategory,
  CreateIncomeCategoryRequest,
  UpdateCategoryRequest,
} from "@/types/categories";

/**
 * Categorías de ingresos por usuario.
 *
 * Espeja `ExpenseCategoriesService` pero solo con lo que la UI usa hoy:
 * el CRUD y el listado de personalizadas.
 */
export class IncomeCategoriesService {
  private baseUrl: string;

  constructor(baseUrl = "/api") {
    this.baseUrl = baseUrl;
  }

  async getCategories(): Promise<UserIncomeCategory[]> {
    const response = await apiClient.get<UserIncomeCategory[]>(
      `${this.baseUrl}/categories/incomes/`
    );
    return response.data;
  }

  /**
   * Solo las categorías creadas por el usuario.
   *
   * Este endpoint responde `{ categories, total }`, no un array plano.
   */
  async getCustomCategories(): Promise<UserIncomeCategory[]> {
    const response = await apiClient.get<{ categories: UserIncomeCategory[] }>(
      `${this.baseUrl}/categories/incomes/custom/`
    );
    return response.data?.categories ?? [];
  }

  async createCategory(
    categoryData: CreateIncomeCategoryRequest
  ): Promise<UserIncomeCategory> {
    const response = await apiClient.post<UserIncomeCategory>(
      `${this.baseUrl}/categories/incomes/`,
      {
        name: categoryData.name,
        description: categoryData.description || "",
        example: categoryData.example || "",
        color: categoryData.color || "#2196F3",
      }
    );
    return response.data;
  }

  async updateCategory(
    id: number,
    updateData: UpdateCategoryRequest
  ): Promise<UserIncomeCategory> {
    const response = await apiClient.patch<UserIncomeCategory>(
      `${this.baseUrl}/categories/incomes/${id}/`,
      updateData
    );
    return response.data;
  }

  async deleteCategory(id: number): Promise<void> {
    await apiClient.delete(`${this.baseUrl}/categories/incomes/${id}/`);
  }
}

export const incomeCategoriesService = new IncomeCategoriesService();
