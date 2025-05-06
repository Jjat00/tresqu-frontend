import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import { getAccessToken } from "@/services/authService";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { DateRange } from "../DateRangePicker";

interface CategoryPieChartProps {
  onCategoryClick: (category: string) => void;
  dateRange?: DateRange;
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
  
  const fetchCategoryData = async (): Promise<CategoryData> => {
    // Here you could use dateRange in your API call to filter data by date
    const token = getAccessToken();
    if (!token) {
      throw new Error("No auth token available");
    }
    
    // You could modify the URL to include date range filters
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
    
    return data.categories.map((category, index) => {
      // Obtener el índice de color basado en la categoría, o usar el índice como fallback
      const colorIndex = category in CATEGORY_COLOR_MAP 
        ? CATEGORY_COLOR_MAP[category] 
        : index % COLORS.length;
        
      return {
        name: category,
        value: data.totals[index],
        color: COLORS[colorIndex],
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
