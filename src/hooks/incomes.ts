import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IncomesService } from "@/services/incomes/incomes";

/**
 * Hook personalizado para eliminar un ingreso
 * @returns Mutación para eliminar un ingreso
 */
export const useDeleteIncome = () => {
  const queryClient = useQueryClient();
  const incomesService = new IncomesService();

  return useMutation({
    mutationFn: (incomeId: number) => incomesService.deleteIncome(incomeId),
    onSuccess: async () => {
      // Invalidar y forzar la actualización inmediata de todas las consultas
      await Promise.all([
        queryClient.refetchQueries({ queryKey: ["incomeSummary"] }),
        queryClient.refetchQueries({ queryKey: ["incomeData"] }),
        queryClient.refetchQueries({ queryKey: ["incomeChartData"] }),
      ]);
    },
  });
};
