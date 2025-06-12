import { apiClient } from "../api";
import {
  SavingsTemplate,
  SavingsGoal,
  CreateGoalFromTemplateRequest,
} from "@/types/savings";

const SAVINGS_TEMPLATES_BASE_PATH = "/savings/templates/";

/**
 * Obtiene todas las plantillas disponibles
 */
export const getSavingsTemplates = async (): Promise<SavingsTemplate[]> => {
  try {
    const response = await apiClient.get(SAVINGS_TEMPLATES_BASE_PATH);
    return response.data;
  } catch (error) {
    console.error("Error al obtener plantillas de ahorro:", error);
    throw error;
  }
};

/**
 * Obtiene una plantilla específica por ID
 */
export const getSavingsTemplateById = async (
  templateId: string
): Promise<SavingsTemplate> => {
  try {
    const response = await apiClient.get(
      `${SAVINGS_TEMPLATES_BASE_PATH}${templateId}/`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener plantilla de ahorro:", error);
    throw error;
  }
};

/**
 * Crea una meta basada en una plantilla
 */
export const createGoalFromTemplate = async (
  templateId: string,
  goalData?: CreateGoalFromTemplateRequest
): Promise<SavingsGoal> => {
  try {
    const response = await apiClient.post(
      `${SAVINGS_TEMPLATES_BASE_PATH}${templateId}/create_goal/`,
      goalData || {}
    );
    return response.data;
  } catch (error) {
    console.error("Error al crear meta desde plantilla:", error);
    throw error;
  }
};
