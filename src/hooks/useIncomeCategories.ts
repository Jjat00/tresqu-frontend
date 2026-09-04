import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { incomeCategoriesService } from "@/services/categories/incomeCategories";
import {
  UserIncomeCategory,
  CreateIncomeCategoryRequest,
  UpdateCategoryRequest,
} from "@/types/categories";

// Forma de los errores de la API (Axios) que consumimos en los onError.
type ApiError = {
  response?: { data?: { detail?: string; name?: string[] } };
};

export const incomeCategoryKeys = {
  all: ["incomeCategories"] as const,
  custom: () => ["incomeCategories", "custom"] as const,
};

const sortCustomFirst = (categories: UserIncomeCategory[]) =>
  [...categories].sort((a, b) => {
    if (a.is_default !== b.is_default) return a.is_default ? 1 : -1;
    return a.name.localeCompare(b.name);
  });

/**
 * Categorías de ingresos del usuario, personalizadas primero.
 *
 * Espeja `useExpenseCategoriesHybrid` para gastos: el diálogo de edición de
 * ingresos necesita la lista con color y nombre para el select.
 */
export const useIncomeCategories = () =>
  useQuery({
    queryKey: incomeCategoryKeys.all,
    queryFn: () => incomeCategoriesService.getCategories(),
    staleTime: 5 * 60 * 1000,
    retry: 2,
    select: sortCustomFirst,
  });

/** Solo las categorías de ingresos creadas por el usuario. */
export const useCustomIncomeCategories = () =>
  useQuery({
    queryKey: incomeCategoryKeys.custom(),
    queryFn: () => incomeCategoriesService.getCustomCategories(),
    staleTime: 3 * 60 * 1000,
    retry: 2,
  });

export const useCreateIncomeCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateIncomeCategoryRequest) =>
      incomeCategoriesService.createCategory(data),
    onSuccess: (newCategory) => {
      queryClient.invalidateQueries({ queryKey: incomeCategoryKeys.all });
      toast.success(`Categoría "${newCategory.name}" creada exitosamente`);
    },
    onError: (error: unknown) => {
      const message =
        (error as ApiError)?.response?.data?.name?.[0] ||
        "Error al crear la categoría";
      toast.error(message);
    },
  });
};

export const useUpdateIncomeCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCategoryRequest }) =>
      incomeCategoriesService.updateCategory(id, data),
    onSuccess: (updatedCategory) => {
      queryClient.invalidateQueries({ queryKey: incomeCategoryKeys.all });
      toast.success(
        `Categoría "${updatedCategory.name}" actualizada exitosamente`
      );
    },
    onError: (error: unknown) => {
      const message =
        (error as ApiError)?.response?.data?.name?.[0] ||
        "Error al actualizar la categoría";
      toast.error(message);
    },
  });
};

export const useDeleteIncomeCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => incomeCategoriesService.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: incomeCategoryKeys.all });
      toast.success("Categoría eliminada exitosamente");
    },
    onError: (error: unknown) => {
      const message =
        (error as ApiError)?.response?.data?.detail ||
        "Error al eliminar la categoría";
      toast.error(message);
    },
  });
};

export default useIncomeCategories;
