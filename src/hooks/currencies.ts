import { useQuery } from "@tanstack/react-query";
import { currenciesService } from "@/services/currencies/currencies";
import {
  CurrenciesResponse,
  CommonCurrency,
  Currency,
} from "@/types/currencies";

/**
 * Hook para obtener todas las monedas disponibles
 */
export const useCurrencies = () => {
  return useQuery({
    queryKey: ["currencies"],
    queryFn: () => currenciesService.getAvailableCurrencies(),
    staleTime: 5 * 60 * 1000, // 5 minutos - las monedas no cambian frecuentemente
    retry: 1,
  });
};

/**
 * Hook para obtener solo las monedas comunes
 */
export const useCommonCurrencies = () => {
  const { data, ...rest } = useCurrencies();

  return {
    data: (data as CurrenciesResponse)?.common_currencies || [],
    ...rest,
  };
};

/**
 * Hook para obtener todas las monedas ISO 4217
 */
export const useAllCurrencies = () => {
  const { data, ...rest } = useCurrencies();

  return {
    data: (data as CurrenciesResponse)?.all_currencies || [],
    ...rest,
  };
};
