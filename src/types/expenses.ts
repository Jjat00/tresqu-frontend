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
