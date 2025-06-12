import { apiClient } from "../api";
import {
  SavingsDeposit,
  SavingsDepositFilters,
  CreateSavingsDepositRequest,
} from "@/types/savings";

const SAVINGS_DEPOSITS_BASE_PATH = "/savings/deposits/";

/**
 * Obtiene todas las transacciones del usuario
 */
export const getSavingsDeposits = async (
  filters?: SavingsDepositFilters
): Promise<SavingsDeposit[]> => {
  try {
    const params = new URLSearchParams();

    if (filters?.savings_goal)
      params.append("savings_goal", filters.savings_goal);
    if (filters?.transaction_type)
      params.append("transaction_type", filters.transaction_type);
    if (filters?.start_date) params.append("start_date", filters.start_date);
    if (filters?.end_date) params.append("end_date", filters.end_date);

    const queryString = params.toString();
    const url = queryString
      ? `${SAVINGS_DEPOSITS_BASE_PATH}?${queryString}`
      : SAVINGS_DEPOSITS_BASE_PATH;

    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.error("Error al obtener depósitos de ahorro:", error);
    throw error;
  }
};

/**
 * Obtiene un depósito específico por ID
 */
export const getSavingsDepositById = async (
  depositId: string
): Promise<SavingsDeposit> => {
  try {
    const response = await apiClient.get(
      `${SAVINGS_DEPOSITS_BASE_PATH}${depositId}/`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener depósito de ahorro:", error);
    throw error;
  }
};

/**
 * Registra un nuevo depósito o retiro
 */
export const createSavingsDeposit = async (
  depositData: CreateSavingsDepositRequest
): Promise<SavingsDeposit> => {
  try {
    const response = await apiClient.post(
      SAVINGS_DEPOSITS_BASE_PATH,
      depositData
    );
    return response.data;
  } catch (error) {
    console.error("Error al crear depósito de ahorro:", error);
    throw error;
  }
};

/**
 * Actualiza un depósito existente
 */
export const updateSavingsDeposit = async (
  depositId: string,
  updateData: Partial<CreateSavingsDepositRequest>
): Promise<SavingsDeposit> => {
  try {
    const response = await apiClient.put(
      `${SAVINGS_DEPOSITS_BASE_PATH}${depositId}/`,
      updateData
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar depósito de ahorro:", error);
    throw error;
  }
};

/**
 * Elimina un depósito
 */
export const deleteSavingsDeposit = async (
  depositId: string
): Promise<void> => {
  try {
    await apiClient.delete(`${SAVINGS_DEPOSITS_BASE_PATH}${depositId}/`);
  } catch (error) {
    console.error("Error al eliminar depósito de ahorro:", error);
    throw error;
  }
};
