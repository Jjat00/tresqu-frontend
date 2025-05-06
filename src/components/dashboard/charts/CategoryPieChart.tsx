
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import { getAccessToken } from "@/services/authService";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

interface CategoryPieChartProps {
  onCategoryClick: (category: string) => void;
}

interface CategoryData {
  categories: string[];
  totals: number[];
}

// Custom colors for the chart
const COLORS = ["#22c55e", "#3b82f6", "#ef4444", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4", "#14b8a6"];

const CategoryPieChart: React.FC<CategoryPieChartProps> = ({
  onCategoryClick
}) => {
  const isMobile = useIsMobile();
  
  const fetchCategoryData = async (): Promise<CategoryData> => {
    const token = getAccessToken();
    if (!token) {
      throw new Error("No auth token available");
    }
    
    const response = await fetch("https://web-production-11f27.up.railway.app/api/expenses/by_category/", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Error fetching category data: ${response.status}`);
    }
    
    return await response.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['categoryData'],
    queryFn: fetchCategoryData,
    retry: 1,
  });

  // Process the API data into the format needed for the pie chart
  const processedData = React.useMemo(() => {
    if (!data) return [];
    
    return data.categories.map((category, index) => ({
      name: category,
      value: data.totals[index],
      color: COLORS[index % COLORS.length]
    }));
  }, [data]);

  // Show error toast if the fetch fails
  React.useEffect(() => {
    if (error) {
      toast.error("No se pudieron cargar los datos de las categorías");
      console.error("Error loading categories:", error);
    }
  }, [error]);

  return (
    <Card className="overflow-hidden h-full flex flex-col py-0 my-[5px]">
      <CardContent className="pt-3 xs:pt-4 sm:pt-6 xs:px-3 sm:px-4 h-full flex flex-col grow">
        <h3 className="xs:text-base sm:text-lg mb-1 xs:mb-2 text-sm font-semibold text-center">
          Gastos por Categoría
        </h3>
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
                    <Cell key={`cell-${index}`} fill={entry.color} style={{
                      cursor: "pointer"
                    }} />
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
