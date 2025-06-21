import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ExpenseCategoriesService } from "@/services/categories/expenseCategories";
import {
  UserExpenseCategory,
  UserExpenseCategoryWithUsage,
  CreateExpenseCategoryRequest,
  UpdateCategoryRequest,
  BulkCreateCategoriesRequest,
  BulkUpdateCategoriesRequest,
  BulkDeleteCategoriesRequest,
  CategorySearchResponse,
  CategoryImportResponse,
  CategoryColorsMapResponse,
  CategoriesWithUsageParams,
  CategorySearchParams,
  CategoryListParams,
  CategoryExportParams,
} from "@/types/categories";

// ===== SERVICIOS BASE =====
const expenseCategoriesService = new ExpenseCategoriesService();

// ===== QUERY KEYS =====
export const expenseCategoryKeys = {
  all: ["expenseCategories"] as const,
  lists: () => [...expenseCategoryKeys.all, "list"] as const,
  list: (filters: string) =>
    [...expenseCategoryKeys.lists(), { filters }] as const,
  details: () => [...expenseCategoryKeys.all, "detail"] as const,
  detail: (id: number) => [...expenseCategoryKeys.details(), id] as const,
  withUsage: (params: CategoriesWithUsageParams) =>
    [...expenseCategoryKeys.all, "withUsage", params] as const,
  search: (params: CategorySearchParams) =>
    [...expenseCategoryKeys.all, "search", params] as const,
  popular: (params: CategoryListParams) =>
    [...expenseCategoryKeys.all, "popular", params] as const,
  recent: (params: CategoryListParams) =>
    [...expenseCategoryKeys.all, "recent", params] as const,
  colorsMap: () => [...expenseCategoryKeys.all, "colorsMap"] as const,
  defaults: () => [...expenseCategoryKeys.all, "defaults"] as const,
  custom: () => [...expenseCategoryKeys.all, "custom"] as const,
};

// ===== HOOKS DE CONSULTA =====

/**
 * Hook para obtener todas las categorías de gastos del usuario
 */
export const useExpenseCategories = () => {
  return useQuery({
    queryKey: expenseCategoryKeys.lists(),
    queryFn: () => expenseCategoriesService.getCategories(),
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 2,
  });
};

/**
 * Hook para obtener una categoría específica
 */
export const useExpenseCategory = (id: number) => {
  return useQuery({
    queryKey: expenseCategoryKeys.detail(id),
    queryFn: () => expenseCategoriesService.getCategory(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};

/**
 * Hook para obtener categorías predefinidas
 */
export const useDefaultExpenseCategories = () => {
  return useQuery({
    queryKey: expenseCategoryKeys.defaults(),
    queryFn: () => expenseCategoriesService.getDefaultCategories(),
    staleTime: 10 * 60 * 1000, // 10 minutos (cambian muy poco)
    retry: 2,
  });
};

/**
 * Hook para obtener categorías personalizadas
 */
export const useCustomExpenseCategories = () => {
  return useQuery({
    queryKey: expenseCategoryKeys.custom(),
    queryFn: () => expenseCategoriesService.getCustomCategories(),
    staleTime: 3 * 60 * 1000, // 3 minutos
    retry: 2,
  });
};

/**
 * Hook para obtener categorías con estadísticas de uso
 */
export const useExpenseCategoriesWithUsage = (
  params: CategoriesWithUsageParams = {}
) => {
  return useQuery({
    queryKey: expenseCategoryKeys.withUsage(params),
    queryFn: () => expenseCategoriesService.getCategoriesWithUsage(params),
    staleTime: 2 * 60 * 1000, // 2 minutos (estadísticas cambian frecuentemente)
    retry: 2,
  });
};

/**
 * Hook para obtener el mapa de colores
 */
export const useExpenseCategoryColorsMap = () => {
  return useQuery({
    queryKey: expenseCategoryKeys.colorsMap(),
    queryFn: () => expenseCategoriesService.getColorsMap(),
    staleTime: 10 * 60 * 1000, // 10 minutos
    retry: 2,
  });
};

/**
 * Hook para buscar categorías
 */
export const useSearchExpenseCategories = (
  params: CategorySearchParams,
  enabled = true
) => {
  return useQuery({
    queryKey: expenseCategoryKeys.search(params),
    queryFn: () => expenseCategoriesService.searchCategories(params),
    enabled: enabled && !!params.q.trim(),
    staleTime: 30 * 1000, // 30 segundos para búsquedas
    retry: 1,
  });
};

/**
 * Hook para obtener categorías populares
 */
export const usePopularExpenseCategories = (
  params: CategoryListParams = {}
) => {
  return useQuery({
    queryKey: expenseCategoryKeys.popular(params),
    queryFn: () => expenseCategoriesService.getPopularCategories(params),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};

/**
 * Hook para obtener categorías recientes
 */
export const useRecentExpenseCategories = (params: CategoryListParams = {}) => {
  return useQuery({
    queryKey: expenseCategoryKeys.recent(params),
    queryFn: () => expenseCategoriesService.getRecentCategories(params),
    staleTime: 1 * 60 * 1000, // 1 minuto (recientes cambian rápido)
    retry: 2,
  });
};

// ===== HOOKS DE MUTACIÓN =====

/**
 * Hook para crear una nueva categoría de gastos
 */
export const useCreateExpenseCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateExpenseCategoryRequest) =>
      expenseCategoriesService.createCategory(data),
    onSuccess: (newCategory) => {
      // Invalidar y actualizar múltiples queries
      queryClient.invalidateQueries({ queryKey: expenseCategoryKeys.all });

      // Mostrar notificación de éxito
      toast.success(`Categoría "${newCategory.name}" creada exitosamente`);
    },
    onError: (error: unknown) => {
      const message =
        (error as any)?.response?.data?.name?.[0] ||
        "Error al crear la categoría";
      toast.error(message);
      throw error;
    },
  });
};

/**
 * Hook para actualizar una categoría existente
 */
export const useUpdateExpenseCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCategoryRequest }) =>
      expenseCategoriesService.updateCategory(id, data),
    onSuccess: (updatedCategory, { id }) => {
      // Actualizar la categoría específica en el cache
      queryClient.setQueryData(expenseCategoryKeys.detail(id), updatedCategory);

      // Invalidar listas para refrescar
      queryClient.invalidateQueries({ queryKey: expenseCategoryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: expenseCategoryKeys.custom() });

      toast.success(
        `Categoría "${updatedCategory.name}" actualizada exitosamente`
      );
    },
    onError: (error: unknown) => {
      const message =
        (error as any)?.response?.data?.name?.[0] ||
        "Error al actualizar la categoría";
      toast.error(message);
      throw error;
    },
  });
};

/**
 * Hook para eliminar una categoría
 */
export const useDeleteExpenseCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => expenseCategoriesService.deleteCategory(id),
    onSuccess: (_, deletedId) => {
      // Remover del cache la categoría específica
      queryClient.removeQueries({
        queryKey: expenseCategoryKeys.detail(deletedId),
      });

      // Invalidar listas
      queryClient.invalidateQueries({ queryKey: expenseCategoryKeys.all });

      toast.success("Categoría eliminada exitosamente");
    },
    onError: (error: unknown) => {
      const message =
        (error as any)?.response?.data?.detail ||
        "Error al eliminar la categoría";
      toast.error(message);
      throw error;
    },
  });
};

/**
 * Hook para crear múltiples categorías
 */
export const useCreateBulkExpenseCategories = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BulkCreateCategoriesRequest) =>
      expenseCategoriesService.createBulkCategories(data),
    onSuccess: (newCategories) => {
      queryClient.invalidateQueries({ queryKey: expenseCategoryKeys.all });
      toast.success(`${newCategories.length} categorías creadas exitosamente`);
    },
    onError: (error: unknown) => {
      const message =
        (error as any)?.response?.data?.detail ||
        "Error al crear las categorías";
      toast.error(message);
      throw error;
    },
  });
};

/**
 * Hook para actualizar múltiples categorías
 */
export const useUpdateBulkExpenseCategories = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BulkUpdateCategoriesRequest) =>
      expenseCategoriesService.updateBulkCategories(data),
    onSuccess: (updatedCategories) => {
      queryClient.invalidateQueries({ queryKey: expenseCategoryKeys.all });
      toast.success(
        `${updatedCategories.length} categorías actualizadas exitosamente`
      );
    },
    onError: (error: unknown) => {
      const message =
        (error as any)?.response?.data?.detail ||
        "Error al actualizar las categorías";
      toast.error(message);
      throw error;
    },
  });
};

/**
 * Hook para eliminar múltiples categorías
 */
export const useDeleteBulkExpenseCategories = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BulkDeleteCategoriesRequest) =>
      expenseCategoriesService.deleteBulkCategories(data),
    onSuccess: (_, { ids }) => {
      // Remover del cache las categorías específicas
      ids.forEach((id) => {
        queryClient.removeQueries({ queryKey: expenseCategoryKeys.detail(id) });
      });

      queryClient.invalidateQueries({ queryKey: expenseCategoryKeys.all });
      toast.success(`${ids.length} categorías eliminadas exitosamente`);
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.detail || "Error al eliminar las categorías";
      toast.error(message);
      throw error;
    },
  });
};

/**
 * Hook para importar categorías
 */
export const useImportExpenseCategories = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => expenseCategoriesService.importCategories(file),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: expenseCategoryKeys.all });

      const { imported, skipped } = result;
      toast.success(
        `Importación completada: ${imported.expense_categories} creadas, ${skipped.duplicates} omitidas`
      );
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.detail || "Error al importar las categorías";
      toast.error(message);
      throw error;
    },
  });
};

/**
 * Hook para importar categorías desde datos JSON
 */
export const useImportExpenseCategoriesFromData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: object) =>
      expenseCategoriesService.importCategoriesFromData(data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: expenseCategoryKeys.all });

      const { imported, skipped } = result;
      toast.success(
        `Importación completada: ${imported.expense_categories} creadas, ${skipped.duplicates} omitidas`
      );
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.detail || "Error al importar las categorías";
      toast.error(message);
      throw error;
    },
  });
};

/**
 * Hook para restaurar categorías predefinidas
 */
export const useResetExpenseCategoriesToDefaults = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => expenseCategoriesService.resetToDefaults(),
    onSuccess: (defaultCategories) => {
      queryClient.invalidateQueries({ queryKey: expenseCategoryKeys.all });
      toast.success(
        `${defaultCategories.length} categorías predefinidas restauradas`
      );
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.detail || "Error al restaurar las categorías";
      toast.error(message);
      throw error;
    },
  });
};

// ===== HOOKS UTILITARIOS =====

/**
 * Hook para verificar si una categoría puede ser editada
 */
export const useCanEditCategory = () => {
  return (category: UserExpenseCategory) =>
    expenseCategoriesService.canEdit(category);
};

/**
 * Hook para verificar si una categoría puede ser eliminada
 */
export const useCanDeleteCategory = () => {
  return (category: UserExpenseCategory) =>
    expenseCategoriesService.canDelete(category);
};

/**
 * Hook para validar datos de categoría
 */
export const useValidateCategoryData = () => {
  return (data: CreateExpenseCategoryRequest | UpdateCategoryRequest) =>
    expenseCategoriesService.validateCategoryData(data);
};

// ===== HOOKS DE EXPORTACIÓN =====

/**
 * Hook para exportar categorías
 */
export const useExportExpenseCategories = () => {
  return useMutation({
    mutationFn: (params: CategoryExportParams) =>
      expenseCategoriesService.exportCategories(params),
    onSuccess: (_, { format }) => {
      toast.success(`Categorías exportadas en formato ${format.toUpperCase()}`);
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.detail || "Error al exportar las categorías";
      toast.error(message);
      throw error;
    },
  });
};

// ===== HOOKS HÍBRIDOS PARA COMPATIBILIDAD =====

/**
 * Hook híbrido que proporciona categorías ordenadas (personalizadas primero)
 * Mantiene compatibilidad con el código existente
 */
export const useExpenseCategoriesHybrid = () => {
  const allCategoriesQuery = useExpenseCategories();

  const sortedCategories = allCategoriesQuery.data?.sort((a, b) => {
    // Personalizadas primero, luego predefinidas
    if (a.is_default !== b.is_default) {
      return a.is_default ? 1 : -1;
    }
    return a.name.localeCompare(b.name);
  });

  return {
    ...allCategoriesQuery,
    data: sortedCategories,
    // Mantener compatibilidad con el hook anterior
    categories: sortedCategories,
  };
};
