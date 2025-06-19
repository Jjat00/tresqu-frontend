import { apiClient } from "@/services/api";
import { CurrenciesResponse } from "@/types/currencies";

export const currenciesService = {
  getAvailableCurrencies: async (): Promise<CurrenciesResponse> => {
    const response = await apiClient.get("/api/users/available_currencies/");
    return response.data;
  },
};
