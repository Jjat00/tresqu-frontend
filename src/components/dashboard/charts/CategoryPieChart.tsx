
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import { categoryData } from "../data/expenseData";

interface CategoryPieChartProps {
  onCategoryClick: (category: string) => void;
}

const CategoryPieChart: React.FC<CategoryPieChartProps> = ({ onCategoryClick }) => {
  const isMobile = useIsMobile();

  return (
    <Card>
      <CardContent className="pt-4 sm:pt-6 overflow-hidden">
        <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">Gastos por Categoría</h3>
        <ChartContainer className={`${isMobile ? 'h-60' : 'h-80'}`} config={{
          ...Object.fromEntries(
            categoryData.map(({ name, color }) => [name, { color }])
          )
        }}>
          <PieChart margin={isMobile ? { top: 5, right: 5, bottom: 5, left: 5 } : { top: 20, right: 30, left: 20, bottom: 5 }}>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={isMobile ? 50 : 80}
              outerRadius={isMobile ? 70 : 110}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => 
                isMobile ? `${(percent * 100).toFixed(0)}%` : `${name}: ${(percent * 100).toFixed(0)}%`
              }
              labelLine={false}
              onClick={(data) => onCategoryClick(data.name)}
            >
              {categoryData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color} 
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </Pie>
            <Tooltip content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-card p-3 rounded shadow border">
                    <p className="text-sm font-semibold">{payload[0].name}</p>
                    <p className="text-xs">${payload[0].value.toLocaleString()}</p>
                    <p className="text-xs text-success mt-1">Click para ver subcategorías</p>
                  </div>
                );
              }
              return null;
            }} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default CategoryPieChart;
