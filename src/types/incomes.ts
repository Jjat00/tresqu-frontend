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
