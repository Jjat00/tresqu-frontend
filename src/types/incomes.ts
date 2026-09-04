/**
 * Interfaz para los parámetros de filtrado para la gráfica de dona de ingresos
 */
export interface DonutChartParams {
  category_id?: number;
  date_filter?:
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
  start_date?: string;
  end_date?: string;
  limit?: number;
  timezone?: string;
}

/**
 * Interfaz para un ingreso resumido
 */
export interface IncomeItem {
  id: number;
  amount: number;
  description: string;
  category: {
    id: number;
    name: string;
  };
  timestamp: string;

  // ✅ MIGRACIÓN: Nuevos campos para categorías por usuario
  user_income_category?: {
    id: number;
    name: string;
    color: string;
    is_default: boolean;
    description?: string;
    example?: string;
  };

  // 🎯 Campo híbrido que prioriza categoría del usuario
  category_name?: string;
}

/**
 * Interfaz para los datos de la gráfica de dona
 */
export interface DonutChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
    hoverBackgroundColor: string[];
  }[];
  filter_summary: string;
  total_amount: number;
  recent_incomes?: IncomeItem[]; // Datos simplificados de ingresos recientes
}

/**
 * Interfaz para los parámetros de la gráfica de barras apiladas
 */
export interface BarStackedChartParams {
  category_id?: number;
  date_filter?:
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
  start_date?: string;
  end_date?: string;
  limit?: number;
  group_by?: "day" | "week" | "month" | "hour";
  timezone?: string;
}

/**
 * Interfaz para dataset de la gráfica de barras apiladas
 */
export interface BarStackedDataset {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
}

/**
 * Interfaz para los datos de la gráfica de barras apiladas
 */
export interface BarStackedChartData {
  labels: string[];
  datasets: BarStackedDataset[];
  filter_summary: string;
  total_amount: number;
  group_by: "day" | "week" | "month" | "hour";
  recent_incomes?: IncomeItem[];
}

/**
 * Interfaz para los parámetros de filtrado del gráfico de línea de ingresos
 */
export interface LineChartParams {
  category_id?: number;
  date_filter?:
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
  start_date?: string; // Formato YYYY-MM-DD
  end_date?: string; // Formato YYYY-MM-DD
  group_by?: "day" | "week" | "month" | "hour";
  timezone?: string;
}

/**
 * Interfaz para los datos de respuesta del gráfico de línea de ingresos
 */
export interface LineChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    fill: boolean;
    tension: number;
  }[];
  filter_summary: string;
  total_amount: number;
}

/**
 * Interfaz para los parámetros de la solicitud de estadísticas de ingresos
 */
export interface IncomeStatsParams {
  months_for_average?: number;
  timezone?: string;
}

/**
 * Interfaz para los datos de estadísticas de ingresos
 */
export interface IncomeStats {
  average_monthly_income: number;
  current_month_income: number;
  previous_month_income: number;
  difference: number;
  percentage_change: number;
  next_month_projection: number;
  months_analyzed: number;
}

/**
 * Interfaz para los parámetros del resumen de ingresos
 */
export interface IncomeSummaryParams {
  period?: "week" | "month" | "year" | "all";
  // Rango personalizado del calendario global (tiene prioridad sobre period).
  date_filter?: string;
  start_date?: string; // formato: YYYY-MM-DD
  end_date?: string; // formato: YYYY-MM-DD
  timezone?: string;
}

/**
 * Interfaz para un elemento del resumen de ingresos por categoría
 */
export interface IncomeSummaryItem {
  id: number;
  category__name: string;
  currency: string;
  total: number;
}

/**
 * Interfaz para los datos del resumen de ingresos
 */
export interface IncomeSummaryData {
  period: "week" | "month" | "year" | "all";
  start_date: string | null;
  end_date: string;
  summary: IncomeSummaryItem[];
  total: number;
}

/**
 * Interfaz para un ingreso en la tabla
 */
export interface IncomeTableItem {
  id: number;
  description: string;
  category: string;
  subcategory?: string;
  amount: number;
  date: string;
}

/**
 * Un ingreso tal como lo devuelve la API (`/api/incomes/month_summary/`).
 * Es la fila que muestra y edita la tabla de ingresos del dashboard.
 */
export interface IncomeRow {
  id: number;
  user: number;
  amount: string;
  currency: string;
  description: string;
  timestamp: string;
  received_at: string | null;
  note: string;
  raw_message: string;
  created_at: string;
  updated_at: string;
  category: number | null;
  category_str: string;

  user_income_category?: number | null;
  user_income_category_detail?: {
    id: number;
    name: string;
    color: string;
    is_default: boolean;
    description?: string;
    example?: string;
  };

  // Categoría vigente calculada por el backend (prioriza la del usuario).
  current_category?: {
    id: number;
    name: string;
    color: string;
    description?: string;
    example?: string;
    is_default?: boolean;
    type: string;
  } | null;
}

/**
 * Respuesta de `/api/incomes/month_summary/?month&year`.
 * `totals_by_currency` viene separado por moneda: nunca se convierte entre ellas.
 */
export interface IncomesMonthSummary {
  month: number;
  year: number;
  by_category: Record<string, number>;
  total: number;
  totals_by_currency: Record<string, number>;
  incomes: IncomeRow[];
}

/**
 * Campos editables de un ingreso (PATCH `/api/incomes/{id}/`).
 */
export interface UpdateIncomeRequest {
  amount?: string;
  currency?: string;
  note?: string;
  received_at?: string;
  user_category_name?: string;
}
