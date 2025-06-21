import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { ExpensesService } from "@/services/expenses/expenses";
import { UpdateExpenseRequest, CreateExpenseRequest } from "@/types/expenses";

/**
 * Hook personalizado para obtener categorías de gastos
 * @returns Query para obtener las categorías
 * @deprecated Usar useExpenseCategories de useExpenseCategories.ts para funcionalidad completa
 */
export const useExpenseCategories = () => {
  const expensesService = new ExpensesService();

  return useQuery({
    queryKey: ["expenseCategories"],
    queryFn: () => expensesService.getCategories(),
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

/**
 * Hook mejorado para obtener categorías de gastos con datos de usuario
 * @returns Query para obtener las categorías del usuario
 */
export const useUserExpenseCategories = () => {
  const expensesService = new ExpensesService();

  return useQuery({
    queryKey: ["userExpenseCategories"],
    queryFn: () => expensesService.getUserCategories(),
    retry: 2,
    staleTime: 3 * 60 * 1000, // 3 minutos
  });
};

/**
 * Hook personalizado para crear un gasto
 * @returns Mutación para crear un gasto
 */
export const useCreateExpense = () => {
  const queryClient = useQueryClient();
  const expensesService = new ExpensesService();

  return useMutation({
    mutationFn: (expenseData: CreateExpenseRequest) =>
      expensesService.createExpense(expenseData),
    onSuccess: async () => {
      // Invalidar y forzar la actualización inmediata de todas las consultas
      await Promise.all([
        queryClient.refetchQueries({ queryKey: ["expensesData"] }),
        queryClient.refetchQueries({ queryKey: ["expensesSummary"] }),
        queryClient.refetchQueries({ queryKey: ["categoryPieChartData"] }),
        queryClient.refetchQueries({ queryKey: ["expensesLineChartData"] }),
        queryClient.refetchQueries({ queryKey: ["expensesBarChartData"] }),
        queryClient.refetchQueries({
          queryKey: ["expensesStackedBarChartData"],
        }),
        queryClient.refetchQueries({ queryKey: ["expensesComparativeData"] }),
        queryClient.refetchQueries({
          queryKey: ["monthlyComparisonChartData"],
        }),
      ]);
    },
  });
};

/**
 * Hook personalizado para eliminar un gasto
 * @returns Mutación para eliminar un gasto
 */
export const useDeleteExpense = () => {
  const queryClient = useQueryClient();
  const expensesService = new ExpensesService();

  return useMutation({
    mutationFn: (expenseId: number) => expensesService.deleteExpense(expenseId),
    onSuccess: async () => {
      // Invalidar y forzar la actualización inmediata de todas las consultas
      await Promise.all([
        queryClient.refetchQueries({ queryKey: ["expensesData"] }),
        queryClient.refetchQueries({ queryKey: ["expensesSummary"] }),
        queryClient.refetchQueries({ queryKey: ["categoryPieChartData"] }),
        queryClient.refetchQueries({ queryKey: ["expensesLineChartData"] }),
        queryClient.refetchQueries({ queryKey: ["expensesBarChartData"] }),
        queryClient.refetchQueries({
          queryKey: ["expensesStackedBarChartData"],
        }),
        queryClient.refetchQueries({ queryKey: ["expensesComparativeData"] }),
        queryClient.refetchQueries({
          queryKey: ["monthlyComparisonChartData"],
        }),
      ]);
    },
  });
};

/**
 * Hook personalizado para actualizar un gasto (actualización parcial)
 * @returns Mutación para actualizar un gasto
 */
export const useUpdateExpense = () => {
  const queryClient = useQueryClient();
  const expensesService = new ExpensesService();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateExpenseRequest }) =>
      expensesService.updateExpense(id, data),
    onSuccess: async () => {
      // Invalidar y forzar la actualización inmediata de todas las consultas
      await Promise.all([
        queryClient.refetchQueries({ queryKey: ["expensesData"] }),
        queryClient.refetchQueries({ queryKey: ["expensesSummary"] }),
        queryClient.refetchQueries({ queryKey: ["categoryPieChartData"] }),
        queryClient.refetchQueries({ queryKey: ["expensesLineChartData"] }),
        queryClient.refetchQueries({ queryKey: ["expensesBarChartData"] }),
        queryClient.refetchQueries({
          queryKey: ["expensesStackedBarChartData"],
        }),
        queryClient.refetchQueries({ queryKey: ["expensesComparativeData"] }),
        queryClient.refetchQueries({
          queryKey: ["monthlyComparisonChartData"],
        }),
      ]);
    },
  });
};

/**
 * Hook personalizado para reemplazar completamente un gasto
 * @returns Mutación para reemplazar un gasto
 */
export const useReplaceExpense = () => {
  const queryClient = useQueryClient();
  const expensesService = new ExpensesService();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateExpenseRequest }) =>
      expensesService.replaceExpense(id, data),
    onSuccess: async () => {
      // Invalidar y forzar la actualización inmediata de todas las consultas
      await Promise.all([
        queryClient.refetchQueries({ queryKey: ["expensesData"] }),
        queryClient.refetchQueries({ queryKey: ["expensesSummary"] }),
        queryClient.refetchQueries({ queryKey: ["categoryPieChartData"] }),
        queryClient.refetchQueries({ queryKey: ["expensesLineChartData"] }),
        queryClient.refetchQueries({ queryKey: ["expensesBarChartData"] }),
        queryClient.refetchQueries({
          queryKey: ["expensesStackedBarChartData"],
        }),
        queryClient.refetchQueries({ queryKey: ["expensesComparativeData"] }),
        queryClient.refetchQueries({
          queryKey: ["monthlyComparisonChartData"],
        }),
      ]);
    },
  });
};
