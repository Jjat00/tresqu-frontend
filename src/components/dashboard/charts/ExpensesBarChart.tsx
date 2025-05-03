
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import { weeklyDataByMonth, yearlyData } from "../data/expenseData";

interface ExpensesBarChartProps {
  viewMode: "month" | "year";
  selectedMonth: string;
}

const ExpensesBarChart: React.FC<ExpensesBarChartProps> = ({ viewMode, selectedMonth }) => {
  const isMobile = useIsMobile();
  
  // Determine chart data based on view mode and selected month
  const chartData = React.useMemo(() => {
    if (viewMode === "year") {
      return yearlyData;
    } else {
      // Usa los datos del mes seleccionado o el mes actual si no hay datos para ese mes específico
      return weeklyDataByMonth[selectedMonth as keyof typeof weeklyDataByMonth] || 
             weeklyDataByMonth["Abril"]; // Usa Abril como fallback
    }
  }, [viewMode, selectedMonth]);

  // Determine chart title based on view mode
  const chartTitle = viewMode === "month" 
    ? `Gastos Semanales - ${selectedMonth}` 
    : "Gastos Anuales";

  return (
    <Card>
      <CardContent className="pt-4 sm:pt-6 overflow-hidden">
        <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">{chartTitle}</h3>
        <ChartContainer className={`${isMobile ? 'h-60' : 'h-80'}`} config={{
          value: { color: "#4ade80" }
        }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={chartData} 
              margin={
                isMobile 
                  ? { top: 10, right: 0, left: -20, bottom: 0 }
                  : { top: 20, right: 30, left: 20, bottom: 5 }
              }
              barSize={isMobile ? 12 : 20}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: isMobile ? 8 : 12 }}
                interval={isMobile ? 1 : 0}
                angle={isMobile ? -45 : 0}
                textAnchor={isMobile ? "end" : "middle"}
                height={isMobile ? 60 : 30}
              />
              <YAxis 
                tick={{ fontSize: isMobile ? 10 : 12 }}
                width={isMobile ? 35 : 50}
                tickFormatter={(value) => 
                  value >= 1000 ? `${Math.floor(value/1000)}k` : value
                }
              />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Monto']} />
              <Bar dataKey="value" fill="#4ade80" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ExpensesBarChart;
