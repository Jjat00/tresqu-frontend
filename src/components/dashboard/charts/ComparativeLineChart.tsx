import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { allExpensesData } from "../data/expenseData";
import { DateRange } from "../DateRangePicker";

interface ComparativeLineChartProps {
  viewMode: "month" | "year";
  selectedMonth: string;
  activeTab: string;
  dateRange?: DateRange;
}

const ComparativeLineChart: React.FC<ComparativeLineChartProps> = ({
  viewMode,
  selectedMonth,
  activeTab,
  dateRange
}) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [chartTitle, setChartTitle] = useState("Comparativa Gastos vs. Ingresos");
  const [showMovingAverage, setShowMovingAverage] = useState(true);

  // Obtener mes actual y año
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  
  // Mapeo de nombres de meses a números (0-indexed para JavaScript Date)
  const monthMap: Record<string, number> = {
    "Enero": 0, "Febrero": 1, "Marzo": 2, "Abril": 3,
    "Mayo": 4, "Junio": 5, "Julio": 6, "Agosto": 7,
    "Septiembre": 8, "Octubre": 9, "Noviembre": 10, "Diciembre": 11
  };

  // Generar gastos e ingresos diarios aleatorios para el mes seleccionado
  const generateDailyData = (month: string) => {
    const monthIndex = monthMap[month];
    if (monthIndex === undefined) return [];
    
    const daysInMonth = new Date(currentYear, monthIndex + 1, 0).getDate();
    
    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const date = `${day}/${monthIndex + 1}`;
      
      // Obtener datos de la base de datos simulada
      const dayExpenses = allExpensesData
        .filter(expense => {
          const expenseDate = new Date(expense.date);
          return expenseDate.getDate() === day && expenseDate.getMonth() === monthIndex;
        })
        .reduce((sum, expense) => sum + expense.amount, 0);
      
      // Generar ingresos simulados (más altos cada 15 y 30 días)
      let dayIncome = 0;
      if (day === 15 || day === daysInMonth) {
        dayIncome = Math.random() * 200000 + 150000;
      } else if (day % 5 === 0) {
        dayIncome = Math.random() * 50000 + 10000;
      } else if (Math.random() > 0.7) {
        dayIncome = Math.random() * 15000 + 5000;
      }
      
      return {
        name: date,
        expenses: dayExpenses || Math.floor(Math.random() * 15000) + 2000,
        income: dayIncome,
      };
    });
  };

  // Generar datos mensuales para todo el año
  const generateMonthlyData = () => {
    return Object.keys(monthMap).map(month => {
      const monthIndex = monthMap[month];
      
      // Calcular gastos mensuales de la base de datos simulada
      const monthExpenses = allExpensesData
        .filter(expense => {
          const expenseDate = new Date(expense.date);
          return expenseDate.getMonth() === monthIndex;
        })
        .reduce((sum, expense) => sum + expense.amount, 0);
      
      // Generar ingresos mensuales simulados
      const baseIncome = 180000 + Math.random() * 50000;
      const monthlyIncome = baseIncome * (1 + (monthIndex % 3) * 0.1);
      
      return {
        name: month.substring(0, 3),
        expenses: monthExpenses || Math.floor(Math.random() * 150000) + 80000,
        income: monthlyIncome,
      };
    });
  };

  useEffect(() => {
    const initializeChart = () => {
      let processedData = [];
      
      if (viewMode === "month" && selectedMonth !== "year") {
        setChartTitle(`Gastos vs. Ingresos - ${selectedMonth} ${currentYear}`);
        processedData = generateDailyData(selectedMonth);
      } else {
        setChartTitle(`Gastos vs. Ingresos - ${currentYear}`);
        processedData = generateMonthlyData();
      }
      
      // Calcular saldo acumulado
      let balance = 0;
      processedData = processedData.map(item => {
        balance += (Number(item.income || 0) - Number(item.expenses || 0));
        return {
          ...item,
          balance
        };
      });
      
      // Agregar promedios móviles (3 períodos)
      if (processedData.length > 2) {
        for (let i = 2; i < processedData.length; i++) {
          // Promedio móvil de gastos - Asegurar que todos los valores son números
          const expAvg1 = Number(processedData[i].expenses || 0);
          const expAvg2 = Number(processedData[i-1].expenses || 0);
          const expAvg3 = Number(processedData[i-2].expenses || 0);
          const expensesAvg = (expAvg1 + expAvg2 + expAvg3) / 3;
          
          // Promedio móvil de ingresos - Asegurar que todos los valores son números
          const incAvg1 = Number(processedData[i].income || 0);
          const incAvg2 = Number(processedData[i-1].income || 0);
          const incAvg3 = Number(processedData[i-2].income || 0);
          const incomeAvg = (incAvg1 + incAvg2 + incAvg3) / 3;
          
          processedData[i] = {
            ...processedData[i],
            expensesAvg,
            incomeAvg
          };
        }
      }
      
      setChartData(processedData);
    };
    
    initializeChart();
  }, [viewMode, selectedMonth]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value);
  };
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border rounded p-2 shadow-sm text-xs">
          <p className="font-medium mb-1">{`${label}`}</p>
          {payload.map((entry: any, index: number) => {
            if (entry.name === "expensesAvg" || entry.name === "incomeAvg") {
              if (!showMovingAverage) return null;
              const avgType = entry.name === "expensesAvg" ? "Gastos (Prom.)" : "Ingresos (Prom.)";
              return (
                <p key={`avg-${index}`} className="text-xs" style={{ color: entry.color }}>
                  {`${avgType}: ${formatCurrency(entry.value)}`}
                </p>
              );
            }
            
            const entryLabel = entry.name === "expenses" 
              ? "Gastos" 
              : entry.name === "income" 
                ? "Ingresos" 
                : "Saldo";
            
            return (
              <p key={index} className="text-xs" style={{ color: entry.color }}>
                {`${entryLabel}: ${formatCurrency(entry.value)}`}
              </p>
            );
          })}
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card className="w-full h-full">
      <CardContent className="p-4">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium sm:text-base">{chartTitle}</h3>
          </div>
          <div className="w-full h-[230px] xs:h-[270px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  dataKey="name"
                  tick={{ fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 10 }}
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => {
                    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                    if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
                    return value;
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  dot={false}
                  name="Gastos"
                />
                <Line 
                  type="monotone" 
                  dataKey="income" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  dot={false}
                  name="Ingresos"
                />
                {showMovingAverage && (
                  <>
                    <Line 
                      type="monotone" 
                      dataKey="expensesAvg" 
                      stroke="#ef4444" 
                      strokeDasharray="5 5"
                      strokeWidth={1}
                      dot={false}
                      name="Gastos (Prom.)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="incomeAvg" 
                      stroke="#22c55e" 
                      strokeDasharray="5 5"
                      strokeWidth={1}
                      dot={false}
                      name="Ingresos (Prom.)"
                    />
                  </>
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComparativeLineChart;
