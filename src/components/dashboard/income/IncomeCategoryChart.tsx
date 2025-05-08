
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { AlertCircle, Loader2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useIncomeCategoryData } from "@/hooks/useIncomeCategoryData";
import { DateRange } from "../DateRangePicker";

interface IncomeCategoryChartProps {
  dateRange?: DateRange;
  formatCurrency: (amount: number) => string;
  onSelectCategory?: (category: string) => void;
}

const IncomeCategoryChart: React.FC<IncomeCategoryChartProps> = ({ 
  dateRange,
  formatCurrency,
  onSelectCategory
}) => {
  const isMobile = useIsMobile();
  const { 
    data: categoryData, 
    isLoading: categoryLoading, 
    error: categoryError 
  } = useIncomeCategoryData(dateRange);
  
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardContent className="pt-3 xs:pt-4 sm:pt-6 px-2 xs:px-3 sm:px-4 h-full flex flex-col grow">
        <h3 className="xs:text-base sm:text-lg mb-1 xs:mb-2 text-sm font-semibold text-center">
          Ingresos por Categoría
        </h3>
        <div className="flex-1 min-h-[250px] sm:min-h-[300px] flex items-center justify-center">
          {categoryLoading ? (
            <div className="flex items-center justify-center h-full w-full">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
              <span className="ml-2 text-sm text-muted-foreground">Cargando datos...</span>
            </div>
          ) : categoryError ? (
            <div className="flex flex-col items-center justify-center h-full w-full">
              <AlertCircle className="h-8 w-8 text-destructive mb-2" />
              <p className="text-sm text-muted-foreground">Error al cargar los datos</p>
            </div>
          ) : categoryData.length === 0 ? (
            <div className="flex items-center justify-center h-full w-full">
              <p className="text-sm text-muted-foreground">No hay datos disponibles</p>
            </div>
          ) : (
            <ChartContainer className={`${isMobile ? 'h-60' : 'h-80'}`} config={{
              ...Object.fromEntries(categoryData.map(({
                category,
                color
              }) => [category, {
                color
              }]))
            }}>
              <PieChart margin={isMobile ? {
                top: 5,
                right: 5,
                bottom: 5,
                left: 5
              } : {
                top: 20,
                right: 30,
                left: 20,
                bottom: 5
              }}>
                <Pie 
                  data={categoryData} 
                  cx="50%" 
                  cy="50%" 
                  innerRadius={isMobile ? 30 : 60} 
                  outerRadius={isMobile ? 55 : 90} 
                  paddingAngle={2} 
                  dataKey="amount" 
                  nameKey="category" 
                  label={({
                    category,
                    percent
                  }) => isMobile ? `${(percent * 100).toFixed(0)}%` : `${category}: ${(percent * 100).toFixed(0)}%`} 
                  labelLine={false} 
                  onClick={data => onSelectCategory && onSelectCategory(data.category)}
                >
                  {categoryData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      stroke={entry.color === "#4ade80" ? "#166534" : "#1e40af"} 
                      strokeWidth={1.5} 
                      style={{
                        cursor: 'pointer'
                      }} 
                    />
                  ))}
                </Pie>
                <Tooltip content={({
                  active,
                  payload
                }) => {
                  if (active && payload && payload.length) {
                    const category = payload[0].name as string;
                    const selectedCategoryData = categoryData.find(item => item.category === category);
                    return (
                      <div className="bg-card p-3 rounded shadow border">
                        <p className="text-sm font-semibold">{payload[0].name}</p>
                        <p className="text-xs mb-2">{formatCurrency(payload[0].value as number)}</p>
                        
                        {selectedCategoryData && selectedCategoryData.subcategories && 
                          selectedCategoryData.subcategories.map((sub, i) => (
                            <div key={i} className="flex justify-between text-xs mb-1">
                              <span className="mr-4">{sub.name}:</span>
                              <span>{formatCurrency(sub.value)}</span>
                            </div>
                          ))
                        }
                      </div>
                    );
                  }
                  return null;
                }} />
              </PieChart>
            </ChartContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default IncomeCategoryChart;
