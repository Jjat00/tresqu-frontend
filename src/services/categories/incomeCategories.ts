import { apiClient } from "../api";
import {
  UserIncomeCategory,
  UserIncomeCategoryWithUsage,
  CreateIncomeCategoryRequest,
  UpdateCategoryRequest,
  BulkCreateCategoriesRequest,
  BulkUpdateCategoriesRequest,
  BulkDeleteCategoriesRequest,
  CategorySearchResponse,
  CategoryImportResponse,
  CategoryColorsMapResponse,
  CategoriesSummaryResponse,
  CategoriesWithUsageParams,
  CategorySearchParams,
  CategoryListParams,
  CategoryExportParams,
  CategoryValidationError,
} from "@/types/categories";

/**
 * Servicio para manejar categorías de ingresos por usuario
 * Implementa todos los nuevos endpoints del sistema migrado
 */
export class IncomeCategoriesService {
  private baseUrl: string;

  constructor(baseUrl = "/api") {
    this.baseUrl = baseUrl;
  }

  // ===== OPERACIONES CRUD BÁSICAS =====

  /**
   * Obtiene todas las categorías de ingresos del usuario
   */
  async getCategories(): Promise<UserIncomeCategory[]> {
    try {
      const response = await apiClient.get<UserIncomeCategory[]>(
        `${this.baseUrl}/categories/incomes/`
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener categorías de ingresos:", error);
      throw error;
    }
  }

  /**
   * Crea una nueva categoría de ingresos
   */
  async createCategory(
    categoryData: CreateIncomeCategoryRequest
  ): Promise<UserIncomeCategory> {
    try {
      const response = await apiClient.post<UserIncomeCategory>(
        `${this.baseUrl}/categories/incomes/`,
        {
          name: categoryData.name,
          description: categoryData.description || "",
          example: categoryData.example || "",
          color: categoryData.color || "#4CAF50",
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al crear categoría de ingresos:", error);
      throw error;
    }
  }

  /**
   * Obtiene una categoría específica por ID
   */
  async getCategory(id: number): Promise<UserIncomeCategory> {
    try {
      const response = await apiClient.get<UserIncomeCategory>(
        `${this.baseUrl}/categories/incomes/${id}/`
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener categoría de ingresos:", error);
      throw error;
    }
  }

  /**
   * Actualiza una categoría existente
   */
  async updateCategory(
    id: number,
    updateData: UpdateCategoryRequest
  ): Promise<UserIncomeCategory> {
    try {
      const response = await apiClient.patch<UserIncomeCategory>(
        `${this.baseUrl}/categories/incomes/${id}/`,
        updateData
      );
      return response.data;
    } catch (error) {
      console.error("Error al actualizar categoría de ingresos:", error);
      throw error;
    }
  }

  /**
   * Elimina una categoría
   */
  async deleteCategory(id: number): Promise<void> {
    try {
      await apiClient.delete(`${this.baseUrl}/categories/incomes/${id}/`);
    } catch (error) {
      console.error("Error al eliminar categoría de ingresos:", error);
      throw error;
    }
  }

  // ===== CATEGORÍAS ESPECIALIZADAS =====

  /**
   * Obtiene solo las categorías predefinidas
   */
  async getDefaultCategories(): Promise<UserIncomeCategory[]> {
    try {
      const response = await apiClient.get<UserIncomeCategory[]>(
        `${this.baseUrl}/categories/incomes/default/`
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener categorías predefinidas:", error);
      throw error;
    }
  }

  /**
   * Obtiene solo las categorías personalizadas del usuario
   */
  async getCustomCategories(): Promise<UserIncomeCategory[]> {
    try {
      const response = await apiClient.get<UserIncomeCategory[]>(
        `${this.baseUrl}/categories/incomes/custom/`
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener categorías personalizadas:", error);
      throw error;
    }
  }

  /**
   * Obtiene categorías con estadísticas de uso
   */
  async getCategoriesWithUsage(
    params: CategoriesWithUsageParams = {}
  ): Promise<UserIncomeCategoryWithUsage[]> {
    try {
      const queryParams = new URLSearchParams();
      if (params.days) queryParams.append("days", params.days.toString());

      const response = await apiClient.get<UserIncomeCategoryWithUsage[]>(
        `${
          this.baseUrl
        }/categories/incomes/with_usage/?${queryParams.toString()}`
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener categorías con estadísticas:", error);
      throw error;
    }
  }

  // ===== UTILIDADES =====

  /**
   * Obtiene el mapa de colores para visualizaciones
   */
  async getColorsMap(): Promise<CategoryColorsMapResponse> {
    try {
      const response = await apiClient.get<CategoryColorsMapResponse>(
        `${this.baseUrl}/categories/incomes/colors-map/`
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener mapa de colores:", error);
      throw error;
    }
  }

  // ===== BÚSQUEDA =====

  /**
   * Busca categorías por nombre
   */
  async searchCategories(
    params: CategorySearchParams
  ): Promise<CategorySearchResponse> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("q", params.q);

      const response = await apiClient.get<CategorySearchResponse>(
        `${this.baseUrl}/categories/incomes/search/?${queryParams.toString()}`
      );
      return response.data;
    } catch (error) {
      console.error("Error al buscar categorías:", error);
      throw error;
    }
  }

  /**
   * Obtiene categorías más populares
   */
  async getPopularCategories(
    params: CategoryListParams = {}
  ): Promise<UserIncomeCategoryWithUsage[]> {
    try {
      const queryParams = new URLSearchParams();
      if (params.limit) queryParams.append("limit", params.limit.toString());

      const response = await apiClient.get<UserIncomeCategoryWithUsage[]>(
        `${this.baseUrl}/categories/incomes/popular/?${queryParams.toString()}`
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener categorías populares:", error);
      throw error;
    }
  }

  /**
   * Obtiene categorías usadas recientemente
   */
  async getRecentCategories(
    params: CategoryListParams = {}
  ): Promise<UserIncomeCategoryWithUsage[]> {
    try {
      const queryParams = new URLSearchParams();
      if (params.limit) queryParams.append("limit", params.limit.toString());

      const response = await apiClient.get<UserIncomeCategoryWithUsage[]>(
        `${this.baseUrl}/categories/incomes/recent/?${queryParams.toString()}`
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener categorías recientes:", error);
      throw error;
    }
  }

  // ===== OPERACIONES BULK =====

  /**
   * Crea múltiples categorías de una vez
   */
  async createBulkCategories(
    request: BulkCreateCategoriesRequest
  ): Promise<UserIncomeCategory[]> {
    try {
      const response = await apiClient.post<UserIncomeCategory[]>(
        `${this.baseUrl}/categories/incomes/bulk_create/`,
        request
      );
      return response.data;
    } catch (error) {
      console.error("Error al crear categorías en bulk:", error);
      throw error;
    }
  }

  /**
   * Actualiza múltiples categorías de una vez
   */
  async updateBulkCategories(
    request: BulkUpdateCategoriesRequest
  ): Promise<UserIncomeCategory[]> {
    try {
      const response = await apiClient.patch<UserIncomeCategory[]>(
        `${this.baseUrl}/categories/incomes/bulk_update/`,
        request
      );
      return response.data;
    } catch (error) {
      console.error("Error al actualizar categorías en bulk:", error);
      throw error;
    }
  }

  /**
   * Elimina múltiples categorías de una vez
   */
  async deleteBulkCategories(
    request: BulkDeleteCategoriesRequest
  ): Promise<void> {
    try {
      await apiClient.delete(
        `${this.baseUrl}/categories/incomes/bulk_delete/`,
        { data: request }
      );
    } catch (error) {
      console.error("Error al eliminar categorías en bulk:", error);
      throw error;
    }
  }

  // ===== IMPORTACIÓN Y EXPORTACIÓN =====

  /**
   * Exporta categorías del usuario
   */
  async exportCategories(params: CategoryExportParams): Promise<Blob | object> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("format", params.format);

      if (params.format === "csv") {
        const response = await apiClient.get(
          `${
            this.baseUrl
          }/categories/incomes/export/?${queryParams.toString()}`,
          { responseType: "blob" }
        );
        return response.data;
      } else {
        const response = await apiClient.get(
          `${this.baseUrl}/categories/incomes/export/?${queryParams.toString()}`
        );
        return response.data;
      }
    } catch (error) {
      console.error("Error al exportar categorías:", error);
      throw error;
    }
  }

  /**
   * Importa categorías desde un archivo
   */
  async importCategories(file: File): Promise<CategoryImportResponse> {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await apiClient.post<CategoryImportResponse>(
        `${this.baseUrl}/categories/incomes/import/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al importar categorías:", error);
      throw error;
    }
  }

  /**
   * Importa categorías desde datos JSON
   */
  async importCategoriesFromData(
    data: object
  ): Promise<CategoryImportResponse> {
    try {
      const response = await apiClient.post<CategoryImportResponse>(
        `${this.baseUrl}/categories/incomes/import/`,
        { data }
      );
      return response.data;
    } catch (error) {
      console.error("Error al importar categorías desde datos:", error);
      throw error;
    }
  }

  /**
   * Restaura las categorías predefinidas
   */
  async resetToDefaults(): Promise<UserIncomeCategory[]> {
    try {
      const response = await apiClient.post<UserIncomeCategory[]>(
        `${this.baseUrl}/categories/incomes/reset_to_defaults/`
      );
      return response.data;
    } catch (error) {
      console.error("Error al restaurar categorías predefinidas:", error);
      throw error;
    }
  }

  // ===== VALIDACIÓN =====

  /**
   * Valida si una categoría puede ser eliminada
   */
  canDelete(category: UserIncomeCategory): boolean {
    return !category.is_default;
  }

  /**
   * Valida si una categoría puede ser editada
   */
  canEdit(category: UserIncomeCategory): boolean {
    return !category.is_default;
  }

  /**
   * Valida los datos de una categoría antes de crear/actualizar
   */
  validateCategoryData(
    data: CreateIncomeCategoryRequest | UpdateCategoryRequest
  ): CategoryValidationError | null {
    const errors: CategoryValidationError = {};

    if ("name" in data && data.name) {
      if (data.name.trim().length === 0) {
        errors.name = ["El nombre es requerido"];
      } else if (data.name.length > 100) {
        errors.name = ["El nombre no puede exceder 100 caracteres"];
      }
    }

    if (data.description && data.description.length > 500) {
      errors.description = ["La descripción no puede exceder 500 caracteres"];
    }

    if (data.example && data.example.length > 500) {
      errors.example = ["El ejemplo no puede exceder 500 caracteres"];
    }

    if (data.color && !/^#[0-9A-F]{6}$/i.test(data.color)) {
      errors.color = ["Ingresa un color válido en formato hexadecimal"];
    }

    return Object.keys(errors).length > 0 ? errors : null;
  }
}
