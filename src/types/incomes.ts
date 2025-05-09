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
  timezone?: string;
}

/**
 * Interfaz para un elemento del resumen de ingresos por categoría
 */
export interface IncomeSummaryItem {
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
