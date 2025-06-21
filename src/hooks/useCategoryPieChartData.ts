import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { DateRange } from "@/components/dashboard/DateRangePicker";
import pieChartService from "@/services/expenses/PieChart";
import { DonutChartData, DateFilterType } from "@/types/expenses";
import getDarkerShade from "@/utils/getDarkerShade";
import {
  isLocalToday,
  isLocalYesterday,
  toLocalISODate,
} from "@/utils/dateUtils";
// Nuevos hooks para categorías mejoradas
import { useExpenseCategoryColorsMap } from "@/hooks/useExpenseCategories";

export interface DonutChartDataItem {
  name: string;
  value: number;
  color: string;
  textColor: string;
}

// Eliminamos las constantes de colores predefinidas ya que usaremos los colores de la API

export const useCategoryPieChartData = (dateRange?: DateRange) => {
  const [filterSummary, setFilterSummary] = useState("");

  // Obtener mapa de colores personalizados del usuario
  const { data: userColorsMap } = useExpenseCategoryColorsMap();

  // Determinar el tipo de filtro basado en el dateRange
  const getDateFilter = (): DateFilterType => {
    if (!dateRange || !dateRange.from || !dateRange.to) {
      return "current_week"; // Default to current_week if no date range
    }

    // Comprobar si es hoy usando nuestras utilidades de zona horaria local
    if (isLocalToday(dateRange.from) && isLocalToday(dateRange.to)) {
      return "today";
    }

    // Comprobar si es ayer usando nuestras utilidades de zona horaria local
    if (isLocalYesterday(dateRange.from) && isLocalYesterday(dateRange.to)) {
      return "yesterday";
    }

    // Para otros rangos, usamos custom
    return "custom";
  };

  const fetchDonutChartData = async (): Promise<DonutChartData> => {
    const dateFilter = getDateFilter();

    const params = {
      date_filter: dateFilter,
    };

    // Si es un rango personalizado, añadimos las fechas
    if (dateFilter === "custom" && dateRange?.from && dateRange?.to) {
      // Usar nuestra función para generar fechas en formato ISO local
      const startDate = toLocalISODate(dateRange.from);
      const endDate = toLocalISODate(dateRange.to);

      Object.assign(params, {
        start_date: startDate,
        end_date: endDate,
      });
    }

    try {
      return await pieChartService.getDonutChartData(params);
    } catch (error) {
      console.error("Error al obtener datos de la gráfica:", error);
      throw error;
    }
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
        // Usar color personalizado del usuario si está disponible,
        // de lo contrario usar el color de la API
        const apiColor = data.datasets[0].backgroundColor[index];
        const userColor = userColorsMap?.[category];
        const finalColor = userColor || apiColor;

        return {
          name: category,
          value: data.datasets[0].data[index],
          color: finalColor,
          // Derivar el color de texto oscureciendo el color principal
          textColor: getDarkerShade(finalColor),
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
    totalAmount: data?.total_amount || 0,
    recentExpenses: data?.recent_expenses || [],
  };
};
