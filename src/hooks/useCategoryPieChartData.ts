import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { format } from "date-fns";
import { getAccessToken } from "@/services/authService";
import { DateRange } from "@/components/dashboard/DateRangePicker";
import { env } from "@/config";

export interface DonutChartDataItem {
  name: string;
  value: number;
  color: string;
  textColor: string;
}

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
  category: number;
  category_str: string;
  spent_at: string;
  note: string;
}

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

// Colores más sólidos para las categorías
const COLORS = [
  "#4ade80", // Green - Alimentación
  "#60a5fa", // Blue - Tecnología
  "#f472b6", // Pink - Vivienda
  "#f59e0b", // Yellow - Transporte
  "#8b5cf6", // Purple - Entretenimiento
  "#f97316", // Orange - Ropa
  "#fb923c", // Peach - Salud
  "#6b7280", // Gray - Otros
];

// Colores de texto/borde para contrastar
const TEXT_COLORS = [
  "#166534", // Dark Green
  "#1e40af", // Dark Blue
  "#be185d", // Dark Pink
  "#b45309", // Dark Yellow
  "#5b21b6", // Dark Purple
  "#c2410c", // Dark Orange
  "#c2410c", // Dark Peach
  "#374151", // Dark Gray
];

// Mapeo de categoría a índice de color
const CATEGORY_COLOR_MAP: Record<string, number> = {
  Alimentación: 0,
  Tecnología: 1,
  Vivienda: 2,
  Transporte: 3,
  Entretenimiento: 4,
  Ropa: 5,
  Salud: 6,
  Educación: 7,
  Servicios: 0,
  Mascota: 1,
  Compras: 2,
  Libros: 3,
  Mobiliario: 4,
  Otros: 7,
};

export const useCategoryPieChartData = (dateRange?: DateRange) => {
  const [filterSummary, setFilterSummary] = useState("");

  // Determinar el tipo de filtro basado en el dateRange
  const getDateFilter = (): string => {
    if (!dateRange || !dateRange.from || !dateRange.to) {
      return "current_week"; // Default to current_week if no date range
    }

    // Formato para las fechas personalizadas
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Comprobar si es hoy
    if (
      dateRange.from.getDate() === today.getDate() &&
      dateRange.from.getMonth() === today.getMonth() &&
      dateRange.from.getFullYear() === today.getFullYear() &&
      dateRange.to.getDate() === today.getDate() &&
      dateRange.to.getMonth() === today.getMonth() &&
      dateRange.to.getFullYear() === today.getFullYear()
    ) {
      return "today";
    }

    // Comprobar si es ayer
    if (
      dateRange.from.getDate() === yesterday.getDate() &&
      dateRange.from.getMonth() === yesterday.getMonth() &&
      dateRange.from.getFullYear() === yesterday.getFullYear() &&
      dateRange.to.getDate() === yesterday.getDate() &&
      dateRange.to.getMonth() === yesterday.getMonth() &&
      dateRange.to.getFullYear() === yesterday.getFullYear()
    ) {
      return "yesterday";
    }

    // Para otros rangos, usamos custom
    return "custom";
  };

  // Construir los parámetros de URL
  const buildQueryParams = (): string => {
    const dateFilter = getDateFilter();

    if (dateFilter === "custom" && dateRange?.from && dateRange?.to) {
      const startDate = format(dateRange.from, "yyyy-MM-dd");
      const endDate = format(dateRange.to, "yyyy-MM-dd");
      return `?date_filter=${dateFilter}&start_date=${startDate}&end_date=${endDate}`;
    }

    return `?date_filter=${dateFilter}`;
  };

  const fetchDonutChartData = async (): Promise<DonutChartData> => {
    const token = getAccessToken();
    if (!token) {
      throw new Error("No auth token available");
    }

    const queryParams = buildQueryParams();
    const url = `${env.apiUrl}/api/expenses/donut_chart_data/${queryParams}`;

    console.log("Fetching donut chart data from:", url);

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching donut chart data: ${response.status}`);
    }

    const data = await response.json();
    return data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "donutChartData",
      dateRange?.from?.toISOString(),
      dateRange?.to?.toISOString(),
    ],
    queryFn: fetchDonutChartData,
    retry: 1,
  });

  // Process the API data into the format needed for the pie chart
  const processedData = data
    ? data.labels.map((category: string, index: number) => {
        // Obtener el índice de color basado en la categoría, o usar el índice como fallback
        const colorIndex =
          category in CATEGORY_COLOR_MAP
            ? CATEGORY_COLOR_MAP[category]
            : index % COLORS.length;

        return {
          name: category,
          value: data.datasets[0].data[index],
          color: data.datasets[0].backgroundColor[index] || COLORS[colorIndex],
          textColor: TEXT_COLORS[colorIndex],
        };
      })
    : [];

  // Actualizar el resumen del filtro cuando cambian los datos
  useEffect(() => {
    if (data?.filter_summary) {
      setFilterSummary(data.filter_summary);
    }
  }, [data]);

  // Show error toast if the fetch fails
  useEffect(() => {
    if (error) {
      toast.error("No se pudieron cargar los datos de las categorías");
      console.error("Error loading categories:", error);
    }
  }, [error]);

  return {
    chartData: processedData,
    isLoading,
    error,
    filterSummary,
  };
};
