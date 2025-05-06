import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import { getAccessToken } from "@/services/authService";
import { toast } from "sonner";
import { DateRange } from "../DateRangePicker";

interface WeeklyCategoryData {
  week: string;
  totals: Record<string, number>;
  [key: string]: any; // Para poder agregar categorías como propiedades directas para el gráfico
}

interface ExpensesBarChartProps {
  viewMode: "month" | "year";
  selectedMonth: string;
  dateRange?: DateRange;
}

// Mapeo de nombres de meses a números
const monthToNumber: Record<string, number> = {
  "Enero": 1,
  "Febrero": 2,
  "Marzo": 3,
  "Abril": 4,
  "Mayo": 5,
  "Junio": 6,
  "Julio": 7,
  "Agosto": 8,
  "Septiembre": 9,
  "Octubre": 10,
  "Noviembre": 11,
  "Diciembre": 12
};

// Colores más sólidos para las categorías - debe coincidir con CategoryPieChart
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

// Colores de borde más oscuros para contrastar
const BORDER_COLORS = [
  "#166534", // Dark Green - Alimentación
  "#1e40af", // Dark Blue - Tecnología
  "#be185d", // Dark Pink - Vivienda
  "#b45309", // Dark Yellow - Transporte
  "#5b21b6", // Dark Purple - Entretenimiento
  "#c2410c", // Dark Orange - Ropa
  "#c2410c", // Dark Peach - Salud
  "#374151"  // Dark Gray - Otros
];

// Mapeo de categoría a índice de color
const categoryColors: Record<string, { fill: string, stroke: string }> = {
  "Alimentación": { fill: COLORS[0], stroke: BORDER_COLORS[0] },
  "Tecnología": { fill: COLORS[1], stroke: BORDER_COLORS[1] },
  "Vivienda": { fill: COLORS[2], stroke: BORDER_COLORS[2] },
  "Transporte": { fill: COLORS[3], stroke: BORDER_COLORS[3] },
  "Entretenimiento": { fill: COLORS[4], stroke: BORDER_COLORS[4] },
  "Ropa": { fill: COLORS[5], stroke: BORDER_COLORS[5] },
  "Salud": { fill: COLORS[6], stroke: BORDER_COLORS[6] },
  "Educación": { fill: COLORS[7], stroke: BORDER_COLORS[7] },
  "Servicios": { fill: COLORS[0], stroke: BORDER_COLORS[0] },
  "Mascota": { fill: COLORS[1], stroke: BORDER_COLORS[1] },
  "Compras": { fill: COLORS[2], stroke: BORDER_COLORS[2] },
  "Libros": { fill: COLORS[3], stroke: BORDER_COLORS[3] },
  "Mobiliario": { fill: COLORS[4], stroke: BORDER_COLORS[4] },
  "Otros": { fill: COLORS[7], stroke: BORDER_COLORS[7] }
};

const ExpensesBarChart: React.FC<ExpensesBarChartProps> = ({
  viewMode,
  selectedMonth,
  dateRange
}) => {
  const isMobile = useIsMobile();
  const [selectedWeek, setSelectedWeek] = useState<string | null>(null);
  const [weeklyData, setWeeklyData] = useState<WeeklyCategoryData[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener el actual año y mes
  const getCurrentYearMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // getMonth() es 0-indexado
    
    if (selectedMonth !== "year") {
      // Si se ha seleccionado un mes específico, usamos ese
      const monthNumber = monthToNumber[selectedMonth] || month;
      return { year, month: monthNumber };
    }
    
    return { year, month };
  };

  // Función para cargar los datos semanales por categoría
  const fetchWeeklyData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const token = getAccessToken();
      if (!token) {
        throw new Error("No hay token de autenticación disponible");
      }
      
      const { year, month } = getCurrentYearMonth();
      
      const response = await fetch(
        `https://web-production-11f27.up.railway.app/api/expenses/weekly_by_category/?month=${month}&year=${year}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`Error al obtener los datos: ${response.status}`);
      }
      
      const data: WeeklyCategoryData[] = await response.json();
      
      // Obtener todas las categorías únicas de los datos
      const allCategories = new Set<string>();
      data.forEach(week => {
        Object.keys(week.totals).forEach(category => {
          allCategories.add(category);
        });
      });
      
      // Guardar las categorías ordenadas
      const categoryList = Array.from(allCategories);
      setCategories(categoryList);
      
      // Procesar los datos para que cada semana tenga todas las categorías
      const processedData = data.map(week => {
        const weekData: WeeklyCategoryData = {
          week: week.week,
          totals: week.totals,
          name: week.week // Agregar name para compatibilidad con Recharts
        };
        
        // Agregar cada categoría como propiedad directa para el gráfico
        categoryList.forEach(category => {
          weekData[category] = week.totals[category] || 0;
        });
        
        return weekData;
      });
      
      setWeeklyData(processedData);
    } catch (err) {
      console.error("Error al cargar los datos semanales:", err);
      setError(err instanceof Error ? err.message : "Error desconocido");
      toast.error("No se pudieron cargar los datos semanales");
    } finally {
      setIsLoading(false);
    }
  };

  // Cargar datos cuando cambia el mes seleccionado o el modo de vista
  useEffect(() => {
    fetchWeeklyData();
    // Resetear la semana seleccionada cuando cambia el mes
    setSelectedWeek(null);
  }, [selectedMonth, viewMode]);

  // Determinar el título del gráfico según el modo de vista
  const chartTitle = React.useMemo(() => {
    if (selectedWeek) {
      return `Gastos Diarios - ${selectedWeek}`;
    } else if (viewMode === "month") {
      return `Gastos Semanales - ${selectedMonth}`;
    } else {
      return "Gastos Anuales";
    }
  }, [viewMode, selectedMonth, selectedWeek]);

  // Formatear valores para el Tooltip
  const formatTooltipValue = (value: number) => {
    return value ? `$${value.toLocaleString('es-CO')}` : "$0";
  };

  // Función para obtener colores de una categoría
  const getCategoryColors = (category: string) => {
    return categoryColors[category] || { 
      fill: COLORS[7], 
      stroke: BORDER_COLORS[7] 
    }; // Default a Otros (gris)
  };

  return (
    <Card className="overflow-hidden h-full">
      <CardContent className="pt-3 xs:pt-4 sm:pt-6 xs:px-3 sm:px-4 h-full flex flex-col px-[15px]">
        <h3 className="text-sm xs:text-base sm:text-lg font-semibold mb-1 xs:mb-2">
          {chartTitle}
        </h3>
        <div className="flex-1 min-h-[200px] flex items-center justify-center">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-success mb-2"></div>
              <p className="text-sm text-muted-foreground">Cargando datos...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center">
              <p className="text-sm text-destructive mb-1">Error al cargar los datos</p>
              <p className="text-xs text-muted-foreground">{error}</p>
            </div>
          ) : weeklyData.length === 0 ? (
            <div className="flex flex-col items-center justify-center">
              <p className="text-sm text-muted-foreground">No hay datos disponibles para este periodo</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={isMobile ? "90%" : "95%"}>
              <BarChart 
                data={weeklyData} 
                margin={isMobile ? {
                  top: 5,
                  right: 5,
                  left: -25,
                  bottom: 15
                } : {
                  top: 20,
                  right: 20,
                  left: 0,
                  bottom: 15
                }} 
                barSize={isMobile ? 8 : 20}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="week" 
                  tick={{
                    fontSize: isMobile ? 7 : 12
                  }} 
                  interval={isMobile ? 1 : 0} 
                  angle={isMobile ? -45 : 0} 
                  textAnchor={isMobile ? "end" : "middle"} 
                  height={isMobile ? 50 : 30} 
                />
                <YAxis 
                  tick={{
                    fontSize: isMobile ? 8 : 12
                  }} 
                  width={isMobile ? 30 : 50} 
                  tickFormatter={value => value >= 1000 ? `${Math.floor(value / 1000)}k` : value.toString()} 
                />
                <Tooltip 
                  formatter={(value, name) => {
                    return [formatTooltipValue(value as number), name.toString()];
                  }}
                  contentStyle={{
                    fontSize: isMobile ? "10px" : "12px"
                  }} 
                />
                <Legend 
                  wrapperStyle={{
                    fontSize: isMobile ? "8px" : "12px",
                    bottom: 0,
                    paddingTop: 5
                  }} 
                />
                {categories.map((category, index) => {
                  const colors = getCategoryColors(category);
                  return (
                    <Bar 
                      key={category}
                      dataKey={category} 
                      stackId="a" 
                      fill={colors.fill}
                      stroke={colors.stroke}
                      strokeWidth={1}
                      radius={index === 0 ? [4, 4, 0, 0] : [0, 0, 0, 0]} 
                      cursor="pointer" 
                    />
                  );
                })}
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {selectedWeek && (
          <div className="mt-2 text-center">
            <button 
              onClick={() => setSelectedWeek(null)} 
              className="text-xs sm:text-sm text-blue-600 hover:text-blue-800"
            >
              ← Volver a vista semanal
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpensesBarChart;
