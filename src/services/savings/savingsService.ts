import { apiClient } from "../api";
import {
  SavingsGoal,
  SavingsGoalFilters,
  CreateSavingsGoalRequest,
  SavingsAnalytics,
  CategoryDistribution,
  ProgressOverTime,
  CompletionForecast,
  SavingsRecommendations,
  ProgressOverTimeParams,
} from "@/types/savings";

const SAVINGS_GOALS_BASE_PATH = "/savings/goals/";

/**
 * Obtiene todas las metas de ahorro del usuario
 */
export const getSavingsGoals = async (
  filters?: SavingsGoalFilters
): Promise<SavingsGoal[]> => {
  try {
    const params = new URLSearchParams();

    if (filters?.status) params.append("status", filters.status);
    if (filters?.category) params.append("category", filters.category);
    if (filters?.priority) params.append("priority", filters.priority);

    const queryString = params.toString();
    const url = queryString
      ? `${SAVINGS_GOALS_BASE_PATH}?${queryString}`
      : SAVINGS_GOALS_BASE_PATH;

    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.error("Error al obtener metas de ahorro:", error);
    throw error;
  }
};

/**
 * Obtiene una meta específica por ID
 */
export const getSavingsGoalById = async (
  goalId: string
): Promise<SavingsGoal> => {
  try {
    const response = await apiClient.get(
      `${SAVINGS_GOALS_BASE_PATH}${goalId}/`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener meta de ahorro:", error);
    throw error;
  }
};

/**
 * Crea una nueva meta de ahorro
 */
export const createSavingsGoal = async (
  goalData: CreateSavingsGoalRequest
): Promise<SavingsGoal> => {
  try {
    const response = await apiClient.post(SAVINGS_GOALS_BASE_PATH, goalData);
    return response.data;
  } catch (error) {
    console.error("Error al crear meta de ahorro:", error);
    throw error;
  }
};

/**
 * Actualiza una meta de ahorro existente
 */
export const updateSavingsGoal = async (
  goalId: string,
  updateData: Partial<CreateSavingsGoalRequest>
): Promise<SavingsGoal> => {
  try {
    const response = await apiClient.put(
      `${SAVINGS_GOALS_BASE_PATH}${goalId}/`,
      updateData
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar meta de ahorro:", error);
    throw error;
  }
};

/**
 * Elimina una meta de ahorro
 */
export const deleteSavingsGoal = async (goalId: string): Promise<void> => {
  try {
    await apiClient.delete(`${SAVINGS_GOALS_BASE_PATH}${goalId}/`);
  } catch (error) {
    console.error("Error al eliminar meta de ahorro:", error);
    throw error;
  }
};

/**
 * Pausa una meta activa
 */
export const pauseSavingsGoal = async (
  goalId: string
): Promise<SavingsGoal> => {
  try {
    const response = await apiClient.post(
      `${SAVINGS_GOALS_BASE_PATH}${goalId}/pause/`
    );
    return response.data;
  } catch (error) {
    console.error("Error al pausar meta de ahorro:", error);
    throw error;
  }
};

/**
 * Reanuda una meta pausada
 */
export const resumeSavingsGoal = async (
  goalId: string
): Promise<SavingsGoal> => {
  try {
    const response = await apiClient.post(
      `${SAVINGS_GOALS_BASE_PATH}${goalId}/resume/`
    );
    return response.data;
  } catch (error) {
    console.error("Error al reanudar meta de ahorro:", error);
    throw error;
  }
};

/**
 * Marca una meta como completada
 */
export const completeSavingsGoal = async (
  goalId: string
): Promise<SavingsGoal> => {
  try {
    const response = await apiClient.post(
      `${SAVINGS_GOALS_BASE_PATH}${goalId}/complete/`
    );
    return response.data;
  } catch (error) {
    console.error("Error al completar meta de ahorro:", error);
    throw error;
  }
};

/**
 * Cancela una meta
 */
export const cancelSavingsGoal = async (
  goalId: string
): Promise<SavingsGoal> => {
  try {
    const response = await apiClient.post(
      `${SAVINGS_GOALS_BASE_PATH}${goalId}/cancel/`
    );
    return response.data;
  } catch (error) {
    console.error("Error al cancelar meta de ahorro:", error);
    throw error;
  }
};

/**
 * Obtiene recomendaciones personalizadas para una meta
 */
export const getSavingsGoalRecommendations = async (
  goalId: string
): Promise<SavingsRecommendations> => {
  try {
    const response = await apiClient.get(
      `${SAVINGS_GOALS_BASE_PATH}${goalId}/recommendations/`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener recomendaciones:", error);
    throw error;
  }
};

/**
 * Obtiene estadísticas generales de todas las metas
 */
export const getSavingsAnalytics = async (): Promise<SavingsAnalytics> => {
  try {
    const response = await apiClient.get(
      `${SAVINGS_GOALS_BASE_PATH}analytics/`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener análisis de ahorros:", error);
    throw error;
  }
};

/**
 * Obtiene distribución de metas por categoría
 */
export const getCategoryDistribution =
  async (): Promise<CategoryDistribution> => {
    try {
      const response = await apiClient.get(
        `${SAVINGS_GOALS_BASE_PATH}category_distribution/`
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener distribución por categoría:", error);
      throw error;
    }
  };

/**
 * Obtiene progreso histórico de ahorros
 */
export const getProgressOverTime = async (
  params?: ProgressOverTimeParams
): Promise<ProgressOverTime> => {
  try {
    const queryParams = new URLSearchParams();
    if (params?.period) queryParams.append("period", params.period);

    const queryString = queryParams.toString();
    const url = queryString
      ? `${SAVINGS_GOALS_BASE_PATH}progress_over_time/?${queryString}`
      : `${SAVINGS_GOALS_BASE_PATH}progress_over_time/`;

    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.error("Error al obtener progreso histórico:", error);
    throw error;
  }
};

/**
 * Obtiene pronóstico de completación de metas
 */
export const getCompletionForecast = async (): Promise<CompletionForecast> => {
  try {
    const response = await apiClient.get(
      `${SAVINGS_GOALS_BASE_PATH}completion_forecast/`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener pronóstico de completación:", error);
    throw error;
  }
};
