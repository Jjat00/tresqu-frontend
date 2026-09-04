import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IncomesService } from "@/services/incomes/incomes";
import { getIncomesMonthSummary } from "@/services/incomes/monthSummary";
import { UpdateIncomeRequest } from "@/types/incomes";

// Todo lo que hay que refrescar cuando un ingreso cambia: la tabla del mes,
// los KPIs y las gráficas.
const INCOME_QUERY_KEYS = [
  ["incomesMonthSummary"],
  ["incomeSummary"],
  ["incomeData"],
  ["incomeChartData"],
];

const refetchIncomeQueries = (queryClient: ReturnType<typeof useQueryClient>) =>
  Promise.all(
    INCOME_QUERY_KEYS.map((queryKey) => queryClient.refetchQueries({ queryKey }))
  );

/**
 * Hook para obtener los ingresos de un mes con el detalle de cada movimiento.
 * @param month Mes (1-12)
 * @param year Año
 */
export const useIncomesMonthSummary = (month: number, year: number) =>
  useQuery({
    queryKey: ["incomesMonthSummary", month, year],
    queryFn: () => getIncomesMonthSummary(month, year),
    retry: 1,
  });

/**
 * Hook personalizado para eliminar un ingreso
 * @returns Mutación para eliminar un ingreso
 */
export const useDeleteIncome = () => {
  const queryClient = useQueryClient();
  const incomesService = new IncomesService();

  return useMutation({
    mutationFn: (incomeId: number) => incomesService.deleteIncome(incomeId),
    onSuccess: () => refetchIncomeQueries(queryClient),
  });
};

/**
 * Hook personalizado para actualizar un ingreso
 * @returns Mutación para actualizar un ingreso
 */
export const useUpdateIncome = () => {
  const queryClient = useQueryClient();
  const incomesService = new IncomesService();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateIncomeRequest }) =>
      incomesService.updateIncome(id, data),
    onSuccess: () => refetchIncomeQueries(queryClient),
  });
};
