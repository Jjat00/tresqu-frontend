import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ExpensesService } from "@/services/expenses/expenses";

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
      ]);
    },
  });
};
