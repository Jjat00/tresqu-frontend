
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip, 
  Legend 
} from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import { categoryData, weeklyDataByMonth, yearlyData } from "../data/expenseData";

interface WeeklyExpenseData {
  date: string;
  name: string;
  food: number;
  transport: number;
  entertainment: number;
  services: number;
  others: number;
  total: number;
}

interface ExpensesBarChartProps {
  viewMode: "month" | "year";
  selectedMonth: string;
}

const ExpensesBarChart: React.FC<ExpensesBarChartProps> = ({ viewMode, selectedMonth }) => {
  const isMobile = useIsMobile();
  const [selectedWeek, setSelectedWeek] = useState<string | null>(null);
  
  // Sample data for daily expenses within a week
  const dailyDataByWeek = {
    "Lun 1 Abr": [
      { name: "Lun 1", food: 200, transport: 150, entertainment: 0, services: 0, others: 50, total: 400 },
      { name: "Mar 2", food: 150, transport: 100, entertainment: 200, services: 0, others: 0, total: 450 },
      { name: "Mié 3", food: 180, transport: 120, entertainment: 0, services: 300, others: 100, total: 700 },
      { name: "Jue 4", food: 220, transport: 100, entertainment: 0, services: 0, others: 80, total: 400 },
      { name: "Vie 5", food: 300, transport: 150, entertainment: 250, services: 0, others: 0, total: 700 },
      { name: "Sáb 6", food: 350, transport: 0, entertainment: 400, services: 0, others: 150, total: 900 },
      { name: "Dom 7", food: 250, transport: 0, entertainment: 300, services: 0, others: 50, total: 600 }
    ],
    // Add more weeks as needed...
  };
  
  // Generate enhanced weekly data with category breakdown
  const enhancedWeeklyData: WeeklyExpenseData[] = React.useMemo(() => {
    if (viewMode === "month" && selectedMonth !== "year") {
      const baseData = weeklyDataByMonth[selectedMonth as keyof typeof weeklyDataByMonth] || 
                      weeklyDataByMonth["Abril"]; // Fallback to April
      
      return baseData.map(week => ({
        date: week.name,
        name: week.name,
        food: Math.round(week.value * 0.35), // 35% food
        transport: Math.round(week.value * 0.20), // 20% transport
        entertainment: Math.round(week.value * 0.25), // 25% entertainment
        services: Math.round(week.value * 0.15), // 15% services
        others: Math.round(week.value * 0.05), // 5% others
        total: week.value
      }));
    }
    
    // For yearly view, return monthly data with category breakdown
    return yearlyData.map(month => ({
      date: month.name,
      name: month.name,
      food: Math.round(month.value * 0.35),
      transport: Math.round(month.value * 0.20),
      entertainment: Math.round(month.value * 0.25),
      services: Math.round(month.value * 0.15),
      others: Math.round(month.value * 0.05),
      total: month.value
    }));
  }, [viewMode, selectedMonth]);
  
  // Determine chart data based on view mode and selected time period
  const chartData = React.useMemo(() => {
    if (selectedWeek && dailyDataByWeek[selectedWeek]) {
      return dailyDataByWeek[selectedWeek];
    }
    return enhancedWeeklyData;
  }, [enhancedWeeklyData, selectedWeek]);
  
  // Reset selected week when view mode changes
  React.useEffect(() => {
    setSelectedWeek(null);
  }, [viewMode, selectedMonth]);

  // Handle click on a bar to drill down into weekly data
  const handleBarClick = (data: any, index: number) => {
    if (viewMode === "month" && !selectedWeek) {
      setSelectedWeek(data.date);
    } else if (selectedWeek) {
      // If already in week view, clicking again should go back to month view
      setSelectedWeek(null);
    }
  };

  // Determine chart title based on view mode
  const chartTitle = React.useMemo(() => {
    if (selectedWeek) {
      return `Gastos Diarios - ${selectedWeek}`;
    } else if (viewMode === "month") {
      return `Gastos Semanales - ${selectedMonth}`;
    } else {
      return "Gastos Anuales";
    }
  }, [viewMode, selectedMonth, selectedWeek]);

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
              onClick={(data) => data && data.activePayload && handleBarClick(data.activePayload[0].payload, 0)}
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
              <Tooltip 
                formatter={(value, name) => {
                  // Translate category names to Spanish
                  const categoryNames: {[key: string]: string} = {
                    food: "Alimentación", 
                    transport: "Transporte",
                    entertainment: "Entretenimiento",
                    services: "Servicios",
                    others: "Otros",
                    total: "Total"
                  };
                  return [`$${Number(value).toLocaleString()}`, categoryNames[name] || name];
                }}
              />
              <Legend 
                formatter={(value) => {
                  // Translate legend labels to Spanish
                  const categoryNames: {[key: string]: string} = {
                    food: "Alimentación", 
                    transport: "Transporte",
                    entertainment: "Entretenimiento",
                    services: "Servicios",
                    others: "Otros"
                  };
                  return categoryNames[value] || value;
                }}
              />
              <Bar dataKey="food" stackId="a" fill="#4ade80" radius={[4, 4, 0, 0]} cursor="pointer" />
              <Bar dataKey="transport" stackId="a" fill="#60a5fa" radius={[0, 0, 0, 0]} cursor="pointer" />
              <Bar dataKey="entertainment" stackId="a" fill="#f472b6" radius={[0, 0, 0, 0]} cursor="pointer" />
              <Bar dataKey="services" stackId="a" fill="#a78bfa" radius={[0, 0, 0, 0]} cursor="pointer" />
              <Bar dataKey="others" stackId="a" fill="#fbbf24" radius={[0, 0, 0, 0]} cursor="pointer" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
        
        {selectedWeek && (
          <div className="mt-2 text-center">
            <button 
              onClick={() => setSelectedWeek(null)} 
              className="text-sm text-blue-600 hover:text-blue-800"
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
