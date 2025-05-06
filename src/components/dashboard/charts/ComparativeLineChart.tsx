
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import { getAccessToken } from "@/services/authService";
import { toast } from "sonner";
import { ChartLine } from "lucide-react";

interface ComparativeLineChartProps {
  viewMode: "month" | "year";
  selectedMonth: string;
  activeTab: string;
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

// Colores para las líneas
const COLORS = {
  expenses: "#8b5cf6", // Morado principal para gastos
  income: "#4ade80", // Verde principal para ingresos
  expensesAvg: "#60a5fa", // Azul para promedio de gastos
  incomeAvg: "#34d399", // Verde claro para promedio de ingresos
};

const ComparativeLineChart: React.FC<ComparativeLineChartProps> = ({
  viewMode,
  selectedMonth,
  activeTab
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
        
        // Fetch expense data
        const expensesResponse = await fetch(
          `https://web-production-11f27.up.railway.app/api/expenses/weekly_by_category/?month=${month}&year=${year}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        
        if (!expensesResponse.ok) {
          throw new Error(`Error al obtener los datos de gastos: ${expensesResponse.status}`);
        }
        
        const expensesData = await expensesResponse.json();
        
        // Para este ejemplo, generaremos datos de ingresos simulados
        // En producción, esto debería ser un endpoint real
        const incomeData = expensesData.map((weekData: any) => {
          const weekObj = { ...weekData };
          // Generar ingresos un 20-40% más altos que los gastos para datos de prueba
          const multiplier = Math.random() * 0.2 + 1.2; // Entre 1.2 y 1.4
          
          const totalExpense = Object.values(weekData.totals || {}).reduce(
            (sum: number, value: any) => sum + (Number(value) || 0), 0
          );
          
          weekObj.incomeTotal = Math.round(totalExpense * multiplier);
          return weekObj;
        });
        
        // Procesamos los datos para mostrar ambas líneas
        const processedData = expensesData.map((weekData: any, index: number) => {
          // Calcular el total de gastos sumando todas las categorías
          const totalExpense = Object.values(weekData.totals || {}).reduce(
            (sum: number, value: any) => sum + (Number(value) || 0), 0
          );
          
          // Usar el ingreso simulado
          const totalIncome = incomeData[index]?.incomeTotal || 0;
          
          return {
            name: weekData.week,
            expenses: totalExpense,
            income: totalIncome
          };
        });
        
        // Agregar promedios móviles (3 períodos)
        if (processedData.length > 2) {
          for (let i = 2; i < processedData.length; i++) {
            // Promedio móvil de gastos - Asegurar que todos los valores son números
            const expensesAvg = (
              Number(processedData[i].expenses || 0) + 
              Number(processedData[i-1].expenses || 0) + 
              Number(processedData[i-2].expenses || 0)
            ) / 3;
            
            // Promedio móvil de ingresos - Asegurar que todos los valores son números
            const incomeAvg = (
              Number(processedData[i].income || 0) + 
              Number(processedData[i-1].income || 0) + 
              Number(processedData[i-2].income || 0)
            ) / 3;
            
            processedData[i].expensesAvg = Math.round(expensesAvg);
            processedData[i].incomeAvg = Math.round(incomeAvg);
          }
        }
        
        setTimeData(processedData);
      } catch (err) {
        console.error("Error al cargar los datos comparativos:", err);
        setError(err instanceof Error ? err.message : "Error desconocido");
        toast.error("No se pudieron cargar los datos comparativos");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTimeData();
  }, [selectedMonth, viewMode]);

  // Determinar el título del gráfico según el modo de vista y la pestaña activa
  const chartTitle = React.useMemo(() => {
    const baseTitle = activeTab === "expenses" 
      ? "Tendencia de Gastos" 
      : "Tendencia de Ingresos";
      
    if (viewMode === "month") {
      return `${baseTitle} - ${selectedMonth}`;
    } else {
      return `${baseTitle} Anuales`;
    }
  }, [viewMode, selectedMonth, activeTab]);

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
                    let label = name;
                    
                    if (name === 'expenses') label = 'Gastos';
                    if (name === 'income') label = 'Ingresos';
                    if (name === 'expensesAvg') label = 'Prom. Gastos (3 sem)';
                    if (name === 'incomeAvg') label = 'Prom. Ingresos (3 sem)';
                    
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
                    if (value === 'expenses') return 'Gastos';
                    if (value === 'income') return 'Ingresos';
                    if (value === 'expensesAvg') return 'Prom. Gastos';
                    if (value === 'incomeAvg') return 'Prom. Ingresos';
                    return value;
                  }}
                />
                
                {/* Línea de gastos - opacidad basada en la pestaña activa */}
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke={COLORS.expenses}
                  strokeWidth={2}
                  strokeOpacity={activeTab === "expenses" ? 1 : 0.4}
                  dot={{ 
                    r: 3, 
                    stroke: COLORS.expenses, 
                    fill: "white", 
                    strokeOpacity: activeTab === "expenses" ? 1 : 0.4 
                  }}
                  activeDot={{ 
                    r: 5, 
                    stroke: COLORS.expenses, 
                    fill: COLORS.expenses, 
                    strokeOpacity: activeTab === "expenses" ? 1 : 0.6 
                  }}
                  name="expenses"
                />
                
                {/* Línea de ingresos - opacidad basada en la pestaña activa */}
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke={COLORS.income}
                  strokeWidth={2}
                  strokeOpacity={activeTab === "income" ? 1 : 0.4}
                  dot={{ 
                    r: 3, 
                    stroke: COLORS.income, 
                    fill: "white", 
                    strokeOpacity: activeTab === "income" ? 1 : 0.4 
                  }}
                  activeDot={{ 
                    r: 5, 
                    stroke: COLORS.income, 
                    fill: COLORS.income,
                    strokeOpacity: activeTab === "income" ? 1 : 0.6
                  }}
                  name="income"
                />
                
                {timeData.some(d => d.expensesAvg) && (
                  <Line
                    type="monotone"
                    dataKey="expensesAvg"
                    stroke={COLORS.expensesAvg}
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    strokeOpacity={activeTab === "expenses" ? 1 : 0.3}
                    dot={false}
                    name="expensesAvg"
                  />
                )}
                
                {timeData.some(d => d.incomeAvg) && (
                  <Line
                    type="monotone"
                    dataKey="incomeAvg"
                    stroke={COLORS.incomeAvg}
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    strokeOpacity={activeTab === "income" ? 1 : 0.3}
                    dot={false}
                    name="incomeAvg"
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

export default ComparativeLineChart;
