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

const USD_TO_COP_RATE = 4000;

export const computeExpensesTotalCOP = (expenses: ExpenseRow[]): number =>
  expenses.reduce((total, expense) => {
    const amount = parseFloat(expense.amount);
    if (Number.isNaN(amount)) return total;
    const multiplier = expense.currency === "USD" ? USD_TO_COP_RATE : 1;
    return total + amount * multiplier;
  }, 0);

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
