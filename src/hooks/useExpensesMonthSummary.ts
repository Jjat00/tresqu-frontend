import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "@/services/authService";
import { env } from "@/config";

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

// Sumamos por moneda en lugar de convertir todo a COP con una tasa fija:
// no inventamos un tipo de cambio. Cada moneda se reporta por separado.
export type CurrencyTotals = Record<string, number>;

// Acepta cualquier objeto con `amount` y `currency` (ExpenseRow del summary
// o Expense del endpoint de la dona).
type AmountWithCurrency = { amount: string; currency: string };

export const computeExpensesTotalsByCurrency = (
  expenses: AmountWithCurrency[]
): CurrencyTotals =>
  expenses.reduce<CurrencyTotals>((totals, expense) => {
    const amount = parseFloat(expense.amount);
    if (Number.isNaN(amount)) return totals;
    const currency = expense.currency || "COP";
    totals[currency] = (totals[currency] ?? 0) + amount;
    return totals;
  }, {});

// Entradas ordenadas con COP primero, luego el resto alfabéticamente.
export const sortedCurrencyTotals = (
  totals: CurrencyTotals
): [string, number][] =>
  Object.entries(totals)
    .filter(([, value]) => value !== 0)
    .sort(([a], [b]) =>
      a === "COP" ? -1 : b === "COP" ? 1 : a.localeCompare(b)
    );

// Texto compacto para el footer: "$140.536 COP · $98 USD"
export const formatCurrencyTotals = (
  totals: CurrencyTotals,
  locale = "es-CO"
): string => {
  const entries = sortedCurrencyTotals(totals);
  if (entries.length === 0) return "$0 COP";
  return entries
    .map(
      ([currency, value]) =>
        `$${value.toLocaleString(locale, {
          maximumFractionDigits: 0,
        })} ${currency}`
    )
    .join(" · ");
};

const fetchExpensesMonthSummary = async (
  month: number,
  year: number
): Promise<ExpensesMonthSummary> => {
  const token = getAccessToken();
  if (!token) throw new Error("No auth token available");

  const url = `${env.apiUrl}/api/expenses/summary/?month=${month}&year=${year}`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error(`Error fetching expenses: ${response.status}`);
  }
  return response.json();
};

export const useExpensesMonthSummary = (month: number, year: number) =>
  useQuery({
    queryKey: ["expensesData", month, year],
    queryFn: () => fetchExpensesMonthSummary(month, year),
    retry: 1,
  });
