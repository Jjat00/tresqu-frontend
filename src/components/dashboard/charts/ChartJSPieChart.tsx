import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DateRange } from "../DateRangePicker";
import { useCategoryPieChartData } from "@/hooks/useCategoryPieChartData";
import { Skeleton } from "@/components/ui/skeleton";
import PieChartDisplay from "./PieChartDisplay";

interface ChartJSPieChartProps {
  onCategoryClick: (category: string) => void;
  dateRange?: DateRange;
}

const ChartJSPieChart: React.FC<ChartJSPieChartProps> = ({
  onCategoryClick,
  dateRange,
}) => {
  const {
    chartData: originalData,
    isLoading,
    error,
    filterSummary,
  } = useCategoryPieChartData(dateRange);

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
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <Skeleton className="w-32 h-32 sm:w-44 sm:h-44 rounded-full" />
          </div>
        ) : (
          <PieChartDisplay
            data={originalData}
            onCategoryClick={onCategoryClick}
            isLoading={false}
            error={error}
            filterSummary={filterSummary}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ChartJSPieChart;
