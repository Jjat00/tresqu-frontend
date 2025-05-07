
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import { getAccessToken } from "@/services/authService";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { DateRange } from "../DateRangePicker";

interface CategoryPieChartProps {
  onCategoryClick: (category: string) => void;
  dateRange?: DateRange;
}

// Define interfaces for the donut chart data
interface DonutChartData {
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

interface Expense {
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

// Colores más sólidos para las categorías
const COLORS = [
  "#4ade80", // Green - Alimentación
  "#60a5fa", // Blue - Tecnología
  "#f472b6", // Pink - Vivienda
  "#f59e0b", // Yellow - Transporte
  "#8b5cf6", // Purple - Entretenimiento
  "#f97316", // Orange - Ropa
  "#fb923c", // Peach - Salud
  "#6b7280"  // Gray - Otros
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
  "#374151"  // Dark Gray
];

// Mapeo de categoría a índice de color
const CATEGORY_COLOR_MAP: Record<string, number> = {
  "Alimentación": 0,
  "Tecnología": 1,
  "Vivienda": 2,
  "Transporte": 3,
  "Entretenimiento": 4,
  "Ropa": 5,
  "Salud": 6,
  "Educación": 7,
  "Servicios": 0,
  "Mascota": 1,
  "Compras": 2,
  "Libros": 3,
  "Mobiliario": 4,
  "Otros": 7
};

const CategoryPieChart: React.FC<CategoryPieChartProps> = ({
  onCategoryClick,
  dateRange
}) => {
  const isMobile = useIsMobile();
  const [filterSummary, setFilterSummary] = useState("");
  
  // Determinar el tipo de filtro basado en el dateRange
  const getDateFilter = (): string => {
    if (!dateRange || !dateRange.from || !dateRange.to) {
      return "current_week";  // Default to current_week if no date range
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
    const url = `https://web-production-11f27.up.railway.app/api/expenses/donut_chart_data/${queryParams}`;
    
    console.log("Fetching donut chart data from:", url);
    
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Error fetching donut chart data: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['donutChartData', dateRange?.from?.toISOString(), dateRange?.to?.toISOString()],
    queryFn: fetchDonutChartData,
    retry: 1,
  });

  // Actualizar el resumen del filtro cuando cambian los datos
  useEffect(() => {
    if (data?.filter_summary) {
      setFilterSummary(data.filter_summary);
    }
  }, [data]);

  // Process the API data into the format needed for the pie chart
  const processedData = React.useMemo(() => {
    if (!data) return [];
    
    return data.labels.map((category, index) => {
      // Obtener el índice de color basado en la categoría, o usar el índice como fallback
      const colorIndex = category in CATEGORY_COLOR_MAP 
        ? CATEGORY_COLOR_MAP[category] 
        : index % COLORS.length;
        
      return {
        name: category,
        value: data.datasets[0].data[index],
        color: data.datasets[0].backgroundColor[index] || COLORS[colorIndex],
        textColor: TEXT_COLORS[colorIndex]
      };
    });
  }, [data]);

  // Show error toast if the fetch fails
  React.useEffect(() => {
    if (error) {
      toast.error("No se pudieron cargar los datos de las categorías");
      console.error("Error loading categories:", error);
    }
  }, [error]);

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardContent className="pt-3 xs:pt-4 sm:pt-6 px-2 xs:px-3 sm:px-4 h-full flex flex-col grow">
        <div className="flex justify-between items-center mb-1 xs:mb-2">
          <h3 className="xs:text-base sm:text-lg font-semibold text-center">
            Gastos por Categoría
          </h3>
          {filterSummary && (
            <p className="text-xs text-muted-foreground">{filterSummary}</p>
          )}
        </div>
        <div className="flex-1 min-h-[250px] sm:min-h-[300px] flex items-center justify-center">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center text-muted-foreground">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-success mb-2"></div>
              <p className="text-sm">Cargando datos...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center text-muted-foreground">
              <p className="text-center text-sm">
                No se pudieron cargar los datos. <br />Intenta nuevamente más tarde.
              </p>
            </div>
          ) : processedData.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-muted-foreground">
              <p className="text-center text-sm">
                No hay datos de gastos disponibles. <br />Registra tus primeros gastos.
              </p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={processedData} 
                  cx="50%" 
                  cy="50%" 
                  innerRadius={isMobile ? 30 : 60} 
                  outerRadius={isMobile ? 55 : 90} 
                  paddingAngle={2} 
                  dataKey="value" 
                  nameKey="name" 
                  label={({
                    name,
                    percent
                  }) => isMobile ? `${(percent * 100).toFixed(0)}%` : `${name}: ${(percent * 100).toFixed(0)}%`} 
                  labelLine={false} 
                  onClick={data => onCategoryClick(data.name)}
                >
                  {processedData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      stroke={entry.textColor}
                      strokeWidth={1.5}
                      style={{
                        cursor: "pointer"
                      }} 
                    />
                  ))}
                </Pie>
                <Tooltip content={({
                  active,
                  payload
                }) => {
                  if (active && payload && payload.length) {
                    const value = payload[0].value;
                    // Make sure value is a number before formatting it
                    const formattedValue = typeof value === 'number' 
                      ? new Intl.NumberFormat('es-CO').format(value)
                      : value;
                      
                    return (
                      <div className="bg-card p-2 xs:p-3 rounded shadow border text-xs xs:text-sm">
                        <p className="font-semibold">{payload[0].name}</p>
                        <p>${formattedValue}</p>
                        <p className="text-success mt-1 text-xs">
                          Click para ver subcategorías
                        </p>
                      </div>
                    );
                  }
                  return null;
                }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryPieChart;
