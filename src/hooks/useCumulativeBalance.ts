import { useQueries } from "@tanstack/react-query";
import { ExpensesService } from "@/services/expenses/expenses";

const expensesService = new ExpensesService();

interface MonthlyBalancePoint {
  month: string;
  income: number;
  expenses: number;
  netBalance: number;
  cumulativeBalance: number;
}

export const useCumulativeBalance = (monthsBack = 6) => {
  const now = new Date();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Generate list of months to query
  const monthsList = Array.from({ length: monthsBack }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (monthsBack - 1 - i), 1);
    return { month: d.getMonth() + 1, year: d.getFullYear() };
  });

  const queries = useQueries({
    queries: monthsList.map(({ month, year }) => ({
      queryKey: ["monthlyComparison", month, year],
      queryFn: () =>
        expensesService.getMonthlyComparisonChartData({ month, year, timezone }),
      staleTime: 10 * 60 * 1000,
      retry: 1,
    })),
  });

  const isLoading = queries.some((q) => q.isLoading);
  const isError = queries.some((q) => q.isError);

  let data: MonthlyBalancePoint[] = [];

  if (!isLoading && !isError) {
    let cumulative = 0;
    data = queries.map((q, i) => {
      const summary = q.data?.financial_summary;
      const monthInfo = q.data?.month_info;
      const income = summary?.total_monthly_income ?? 0;
      const expenses = summary?.total_expenses_to_date ?? 0;
      const net = income - expenses;
      cumulative += net;

      const monthName = monthInfo?.month_name
        ? monthInfo.month_name.charAt(0).toUpperCase() + monthInfo.month_name.slice(1, 3)
        : `${monthsList[i].month}/${monthsList[i].year}`;

      return {
        month: monthName,
        income,
        expenses,
        netBalance: net,
        cumulativeBalance: cumulative,
      };
    });
  }

  return { data, isLoading, isError };
};

export default useCumulativeBalance;
