import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import { categoryData } from "../data/expenseData";

interface CategoryPieChartProps {
  onCategoryClick: (category: string) => void;
}

const CategoryPieChart: React.FC<CategoryPieChartProps> = ({
  onCategoryClick,
}) => {
  const isMobile = useIsMobile();

  return (
    <Card className="overflow-hidden h-full">
      <CardContent className="pt-3 xs:pt-4 sm:pt-6 px-2 xs:px-3 sm:px-4 h-full flex flex-col">
        <h3 className="text-sm xs:text-base sm:text-lg font-semibold mb-1 xs:mb-2">
          Gastos por Categoría
        </h3>
        <div className="flex-1 min-h-[200px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height={isMobile ? "90%" : "95%"}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={isMobile ? 30 : 60}
                outerRadius={isMobile ? 55 : 90}
                paddingAngle={2}
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) =>
                  isMobile
                    ? `${(percent * 100).toFixed(0)}%`
                    : `${name}: ${(percent * 100).toFixed(0)}%`
                }
                labelLine={false}
                onClick={(data) => onCategoryClick(data.name)}
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    style={{ cursor: "pointer" }}
                  />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-card p-2 xs:p-3 rounded shadow border text-xs xs:text-sm">
                        <p className="font-semibold">{payload[0].name}</p>
                        <p>${payload[0].value.toLocaleString()}</p>
                        <p className="text-success mt-1 text-xs">
                          Click para ver subcategorías
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryPieChart;
