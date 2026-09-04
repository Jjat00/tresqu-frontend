import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/services/api";
import { computeTotalsByCurrency } from "@/utils/currency";

export interface ExpenseRow {
  id: number;
  user: number;
  amount: string;
  currency: string;
  description: string;
  timestamp: string;
  raw_message: string;
  created_at: string;
  updated_at: string;
  category: number | null;
  category_str: string;
  spent_at: string;
  note: string;

  user_expense_category?: {
    id: number;
    name: string;
    color: string;
    is_default: boolean;
    description?: string;
    examples?: string;
  };

  category_name?: string;

  current_category?: {
    id: number;
    name: string;
    color: string;
    description?: string;
    is_default: boolean;
    type: string;
  };
}

export interface ExpensesMonthSummary {
  by_category: Record<string, number>;
  total: number;
  recent_expenses: ExpenseRow[];
}

// Los helpers de moneda viven en `@/utils/currency` (los comparten gastos e
// ingresos). Se re-exportan aquí para no romper los imports existentes.
export type { CurrencyTotals } from "@/utils/currency";
export {
  sortedCurrencyTotals,
  formatCurrencyTotals,
  formatAmountWithCurrency,
} from "@/utils/currency";

export const computeExpensesTotalsByCurrency = computeTotalsByCurrency;

const fetchExpensesMonthSummary = async (
  month: number,
  year: number
): Promise<ExpensesMonthSummary> => {
  // Vía apiClient: así hereda el refresco de token del interceptor. Con fetch
  // a pelo, un access token caducado devolvía 401 sin renovar la sesión.
  const response = await apiClient.get<ExpensesMonthSummary>(
    "/api/expenses/summary/",
    { params: { month, year } }
  );
  return response.data;
};

export const useExpensesMonthSummary = (month: number, year: number) =>
  useQuery({
    queryKey: ["expensesData", month, year],
    queryFn: () => fetchExpensesMonthSummary(month, year),
    retry: 1,
  });
