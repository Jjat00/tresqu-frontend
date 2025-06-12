import { apiClient } from "../api";
import { SavingsCategory, CreateSavingsCategoryRequest } from "@/types/savings";

const SAVINGS_CATEGORIES_BASE_PATH = "/savings/categories/";

/**
 * Obtiene todas las categorías del usuario
 */
export const getSavingsCategories = async (): Promise<SavingsCategory[]> => {
  try {
    const response = await apiClient.get(SAVINGS_CATEGORIES_BASE_PATH);
    return response.data;
  } catch (error) {
    console.error("Error al obtener categorías de ahorro:", error);
    throw error;
  }
};

/**
 * Obtiene una categoría específica por ID
 */
export const getSavingsCategoryById = async (
  categoryId: string
): Promise<SavingsCategory> => {
  try {
    const response = await apiClient.get(
      `${SAVINGS_CATEGORIES_BASE_PATH}${categoryId}/`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener categoría de ahorro:", error);
    throw error;
  }
};

/**
 * Crea una nueva categoría personalizada
 */
export const createSavingsCategory = async (
  categoryData: CreateSavingsCategoryRequest
): Promise<SavingsCategory> => {
  try {
    const response = await apiClient.post(
      SAVINGS_CATEGORIES_BASE_PATH,
      categoryData
    );
    return response.data;
  } catch (error) {
    console.error("Error al crear categoría de ahorro:", error);
    throw error;
  }
};

/**
 * Actualiza una categoría existente
 */
export const updateSavingsCategory = async (
  categoryId: string,
  updateData: Partial<CreateSavingsCategoryRequest>
): Promise<SavingsCategory> => {
  try {
    const response = await apiClient.put(
      `${SAVINGS_CATEGORIES_BASE_PATH}${categoryId}/`,
      updateData
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar categoría de ahorro:", error);
    throw error;
  }
};

/**
 * Elimina una categoría (solo si no tiene metas asociadas)
 */
export const deleteSavingsCategory = async (
  categoryId: string
): Promise<void> => {
  try {
    await apiClient.delete(`${SAVINGS_CATEGORIES_BASE_PATH}${categoryId}/`);
  } catch (error) {
    console.error("Error al eliminar categoría de ahorro:", error);
    throw error;
  }
};
