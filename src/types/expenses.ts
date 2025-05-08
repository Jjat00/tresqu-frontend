// Tipos para la respuesta de la API de gastos
export interface Expense {
  id: number;
  amount: number;
  description: string;
  category: {
    id: number;
    name: string;
  };
  timestamp: string;
}

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

export interface DonutChartParams {
  category_id?: number;
  date_filter?: DateFilterType;
  start_date?: string; // formato: YYYY-MM-DD
  end_date?: string; // formato: YYYY-MM-DD
  limit?: number;
}
