import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/services/api";
import { UserIncomeCategory } from "@/types/categories";

/**
 * Categorías de ingresos del usuario, personalizadas primero.
 *
 * Espeja `useExpenseCategoriesHybrid` para gastos: el diálogo de edición de
 * ingresos necesita la lista con color y nombre para el select.
 */
export const useIncomeCategories = () =>
  useQuery({
    queryKey: ["incomeCategories"],
    queryFn: async () => {
      const response = await apiClient.get<UserIncomeCategory[]>(
        "/api/categories/incomes/"
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
    select: (categories) =>
      [...categories].sort((a, b) => {
        if (a.is_default !== b.is_default) return a.is_default ? 1 : -1;
        return a.name.localeCompare(b.name);
      }),
  });

export default useIncomeCategories;
