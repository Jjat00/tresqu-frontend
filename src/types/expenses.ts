// Tipos para la respuesta de la API de gastos
export interface Expense {
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

  // ✅ MIGRACIÓN: Nuevos campos para categorías por usuario
  user_expense_category?: {
    id: number;
    name: string;
    color: string;
    is_default: boolean;
    description?: string;
    examples?: string;
  };

  // 🎯 Campo híbrido que prioriza categoría del usuario
  category_name?: string;
}

// Tipos para crear un nuevo gasto
export interface CreateExpenseRequest {
  amount: string;
  currency: string;
  description?: string;
  spent_at: string;
  note?: string;
  user_category_name: string; // ✅ CORRECTO - Campo principal para categoría
  user_expense_category?: number; // ✅ ALTERNATIVO - ID de categoría específica
}

// Tipos para actualizar un gasto
export interface UpdateExpenseRequest {
  amount?: string;
  currency?: string;
  description?: string;
  timestamp?: string;
  spent_at?: string;
  note?: string;
  category_name?: string;
  category_str?: string; // ❌ DEPRECADO - Solo lectura
  user_category_name?: string; // ✅ CORRECTO - Usar este campo para actualizar categoría
  user_expense_category?: number; // ✅ ALTERNATIVO - ID de categoría específica
}

// Tipos para la respuesta de actualización
export type UpdateExpenseResponse = Expense;

// Tipos para la gráfica de dona
export interface DonutChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
    hoverBackgroundColor: string[];
  }[];
  filter_summary: string;
  total_amount: number;
  recent_expenses: Expense[];
}

// Tipos para la gráfica de barras apiladas
export interface BarStackedChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
  filter_summary: string;
  total_amount: number;
  group_by: GroupByType;
  recent_expenses: Expense[];
}

// Tipos para los parámetros de filtro de gastos
export type DateFilterType =
  | "all"
  | "today"
  | "yesterday"
  | "current_month"
  | "previous_month"
  | "current_week"
  | "previous_week"
  | "current_year"
  | "previous_year"
  | "custom";

export type GroupByType = "hour" | "day" | "week" | "month";

export interface DonutChartParams {
  category_id?: number;
  date_filter?: DateFilterType;
  start_date?: string; // formato: YYYY-MM-DD
  end_date?: string; // formato: YYYY-MM-DD
  limit?: number;
  timezone?: string; // Zona horaria del usuario (e.g., 'America/Bogota')
}

export interface BarStackedChartParams extends DonutChartParams {
  group_by?: GroupByType;
}

// Tipos para la gráfica de comparación mensual
export interface MonthlyComparisonChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    borderWidth: number;
    fill: boolean;
    type: string;
    tension: number;
  }[];
  month_info: {
    month: number;
    year: number;
    month_name: string;
    total_days: number;
  };
  financial_summary: {
    total_monthly_income: number;
    total_expenses_to_date: number;
    remaining_budget: number;
    percentage_consumed: number;
    financial_status: "saludable" | "precaución" | "advertencia" | "crítico";
    days_to_exceed_income: number | null;
  };
  chart_config: {
    type: string;
    responsive: boolean;
    scales: {
      y: {
        beginAtZero: boolean;
        title: {
          display: boolean;
          text: string;
        };
      };
      x: {
        title: {
          display: boolean;
          text: string;
        };
      };
    };
  };
}

export interface MonthlyComparisonChartParams {
  month?: number;
  year?: number;
  timezone?: string;
}
