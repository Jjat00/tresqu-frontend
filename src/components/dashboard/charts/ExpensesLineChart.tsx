
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import { getAccessToken } from "@/services/authService";
import { toast } from "sonner";
import { ChartLine } from "lucide-react";

interface ExpensesLineChartProps {
  viewMode: "month" | "year";
  selectedMonth: string;
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

// Colores para las líneas - usando colores sólidos que combinen con la app
const COLORS = {
  total: "#8b5cf6", // Morado principal
  promedio: "#60a5fa", // Azul
  tendencia: "#f97316" // Naranja
};

const ExpensesLineChart: React.FC<ExpensesLineChartProps> = ({
  viewMode,
  selectedMonth
}) => {
  const isMobile = useIsMobile();
  const [timeData, setTimeData] = useState<any[]>([]);
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

  // Cargar datos cuando cambia el mes seleccionado o el modo de vista
  useEffect(() => {
    const fetchTimeData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const token = getAccessToken();
        if (!token) {
          throw new Error("No hay token de autenticación disponible");
        }
        
        const { year, month } = getCurrentYearMonth();
        
        // Usamos el mismo endpoint que para los datos semanales, pero procesamos diferente
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
        
        const weeklyData = await response.json();
        
        // Transformamos los datos para el gráfico lineal
        const processedData = weeklyData.map((weekData: any) => {
          // Calcular el total sumando todas las categorías
          const totalAmount = Object.values(weekData.totals).reduce((sum: number, value: any) => sum + (value || 0), 0);
          
          return {
            name: weekData.week,
            total: totalAmount,
            // Podríamos calcular promedios o tendencias aquí si es necesario
          };
        });
        
        // Agregar un promedio móvil simple (3 períodos)
        if (processedData.length > 2) {
          for (let i = 2; i < processedData.length; i++) {
            const avg = (processedData[i].total + processedData[i-1].total + processedData[i-2].total) / 3;
            processedData[i].promedio = Math.round(avg);
          }
        }
        
        setTimeData(processedData);
      } catch (err) {
        console.error("Error al cargar los datos temporales:", err);
        setError(err instanceof Error ? err.message : "Error desconocido");
        toast.error("No se pudieron cargar los datos temporales");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTimeData();
  }, [selectedMonth, viewMode]);

  // Determinar el título del gráfico según el modo de vista
  const chartTitle = React.useMemo(() => {
    if (viewMode === "month") {
      return `Tendencia de Gastos - ${selectedMonth}`;
    } else {
      return "Tendencia de Gastos Anuales";
    }
  }, [viewMode, selectedMonth]);

  // Formatear valores para el Tooltip
  const formatTooltipValue = (value: number) => {
    return value ? `$${value.toLocaleString('es-CO')}` : "$0";
  };

  return (
    <Card className="overflow-hidden h-full">
      <CardContent className="pt-3 xs:pt-4 sm:pt-6 xs:px-3 sm:px-4 h-full flex flex-col">
        <div className="flex items-center justify-between mb-1 xs:mb-2">
          <h3 className="text-sm xs:text-base sm:text-lg font-semibold">
            {chartTitle}
          </h3>
          <ChartLine className="h-4 w-4 text-muted-foreground" />
        </div>
        
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
          ) : timeData.length === 0 ? (
            <div className="flex flex-col items-center justify-center">
              <p className="text-sm text-muted-foreground">No hay datos disponibles para este periodo</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={timeData}
                margin={isMobile ? {
                  top: 5,
                  right: 5,
                  left: -15,
                  bottom: 15
                } : {
                  top: 20,
                  right: 20,
                  left: 0,
                  bottom: 15
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: isMobile ? 8 : 12 }}
                  interval={isMobile ? 1 : 0}
                  angle={isMobile ? -45 : 0}
                  textAnchor={isMobile ? "end" : "middle"}
                  height={isMobile ? 50 : 30}
                />
                <YAxis 
                  tick={{ fontSize: isMobile ? 8 : 12 }}
                  width={isMobile ? 30 : 50}
                  tickFormatter={value => value >= 1000 ? `${Math.floor(value / 1000)}k` : value.toString()}
                />
                <Tooltip
                  formatter={(value, name) => {
                    const formattedValue = formatTooltipValue(value as number);
                    const label = name === 'total' ? 'Total'
                              : name === 'promedio' ? 'Promedio (3 sem)'
                              : name;
                    return [formattedValue, label];
                  }}
                  contentStyle={{
                    fontSize: isMobile ? "10px" : "12px",
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "0.5rem"
                  }}
                  labelStyle={{
                    fontWeight: "bold",
                    marginBottom: "0.25rem"
                  }}
                />
                <Legend
                  wrapperStyle={{
                    fontSize: isMobile ? "8px" : "12px",
                    paddingTop: 5
                  }}
                  formatter={(value) => {
                    return value === 'total' ? 'Total'
                         : value === 'promedio' ? 'Promedio (3 sem)'
                         : value;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke={COLORS.total}
                  strokeWidth={2}
                  dot={{ r: 3, stroke: COLORS.total, fill: "white" }}
                  activeDot={{ r: 5, stroke: COLORS.total, fill: COLORS.total }}
                  name="total"
                />
                {timeData.some(d => d.promedio) && (
                  <Line
                    type="monotone"
                    dataKey="promedio"
                    stroke={COLORS.promedio}
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                    name="promedio"
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpensesLineChart;
