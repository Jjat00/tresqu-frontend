import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DateRange } from "../DateRangePicker";
import { useCategoryPieChartData } from "@/hooks/useCategoryPieChartData";
import PieChartDisplay from "./PieChartDisplay";

interface CategoryPieChartProps {
  onCategoryClick: (category: string) => void;
  dateRange?: DateRange;
}

const CategoryPieChart: React.FC<CategoryPieChartProps> = ({
  onCategoryClick,
  dateRange,
}) => {
  const { chartData, isLoading, error, filterSummary } =
    useCategoryPieChartData(dateRange);

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardContent className="pt-3 xs:pt-4 sm:pt-6 px-2 xs:px-3 sm:px-4 h-full flex flex-col grow">
        <div className="flex justify-between items-center mb-1 xs:mb-2">
          <h3 className="xs:text-base sm:text-lg font-semibold text-center">
            Gastos por Categoría
          </h3>
          {filterSummary && (
            <p className="text-xs text-muted-foreground">{filterSummary}</p>
          )}
        </div>
        <PieChartDisplay
          data={chartData}
          onCategoryClick={onCategoryClick}
          isLoading={isLoading}
          error={error}
          filterSummary={filterSummary}
        />
      </CardContent>
    </Card>
  );
};

export default CategoryPieChart;
