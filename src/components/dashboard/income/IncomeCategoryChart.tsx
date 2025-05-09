import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { AlertCircle, Loader2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useIncomePieChart } from "@/hooks/useIncomePieChart";
import { DateRange } from "../DateRangePicker";
import { DonutChartParams } from "@/types/incomes";

interface IncomeCategoryChartProps {
  dateRange?: DateRange;
  formatCurrency: (amount: number) => string;
  onSelectCategory?: (category: string) => void;
}

interface CategoryData {
  category: string;
  amount: number;
  color: string;
  subcategories?: Array<{
    name: string;
    value: number;
  }>;
}

const IncomeCategoryChart: React.FC<IncomeCategoryChartProps> = ({
  dateRange,
  formatCurrency,
  onSelectCategory,
}) => {
  const isMobile = useIsMobile();

  // Preparar parámetros para la consulta basados en el rango de fechas
  const queryParams: DonutChartParams = useMemo(() => {
    if (!dateRange) return {};

    return {
      date_filter: "custom",
      start_date: dateRange.from?.toISOString().split("T")[0],
      end_date: dateRange.to?.toISOString().split("T")[0],
    };
  }, [dateRange]);

  const { data: chartData, isLoading, error } = useIncomePieChart(queryParams);

  // Transformar datos de la API al formato esperado por el gráfico
  const categoryData: CategoryData[] = useMemo(() => {
    if (!chartData) return [];

    return chartData.labels.map((label, index) => ({
      category: label,
      amount: chartData.datasets[0].data[index],
      color: chartData.datasets[0].backgroundColor[index],
      // No hay subcategorías en la respuesta API actual
    }));
  }, [chartData]);

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardContent className="pt-3 xs:pt-4 sm:pt-6 px-2 xs:px-3 sm:px-4 h-full flex flex-col grow">
        <h3 className="xs:text-base sm:text-lg mb-1 xs:mb-2 text-sm font-semibold text-center">
          Ingresos por Categoría
        </h3>
        <div className="flex-1 min-h-[250px] sm:min-h-[300px] flex items-center justify-center">
          {isLoading ? (
            <div className="flex items-center justify-center h-full w-full">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
              <span className="ml-2 text-sm text-muted-foreground">
                Cargando datos...
              </span>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-full w-full">
              <AlertCircle className="h-8 w-8 text-destructive mb-2" />
              <p className="text-sm text-muted-foreground">
                Error al cargar los datos
              </p>
            </div>
          ) : !categoryData || categoryData.length === 0 ? (
            <div className="flex items-center justify-center h-full w-full">
              <p className="text-sm text-muted-foreground">
                No hay datos disponibles
              </p>
            </div>
          ) : (
            <ChartContainer
              className={`${isMobile ? "h-60" : "h-80"}`}
              config={{
                ...Object.fromEntries(
                  categoryData.map(({ category, color }) => [
                    category,
                    {
                      color,
                    },
                  ])
                ),
              }}
            >
              <PieChart
                margin={
                  isMobile
                    ? {
                        top: 5,
                        right: 5,
                        bottom: 5,
                        left: 5,
                      }
                    : {
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }
                }
              >
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={isMobile ? 30 : 60}
                  outerRadius={isMobile ? 55 : 90}
                  paddingAngle={2}
                  dataKey="amount"
                  nameKey="category"
                  label={({ category, percent }) =>
                    isMobile
                      ? `${(percent * 100).toFixed(0)}%`
                      : `${category}: ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                  onClick={(data) =>
                    onSelectCategory && onSelectCategory(data.category)
                  }
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke={entry.color === "#4ade80" ? "#166534" : "#1e40af"}
                      strokeWidth={1.5}
                      style={{
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const category = payload[0].name as string;
                      const selectedCategoryData = categoryData.find(
                        (item) => item.category === category
                      );
                      return (
                        <div className="bg-card p-3 rounded shadow border">
                          <p className="text-sm font-semibold">
                            {payload[0].name}
                          </p>
                          <p className="text-xs mb-2">
                            {formatCurrency(payload[0].value as number)}
                          </p>

                          {selectedCategoryData &&
                            selectedCategoryData.subcategories &&
                            selectedCategoryData.subcategories.map((sub, i) => (
                              <div
                                key={i}
                                className="flex justify-between text-xs mb-1"
                              >
                                <span className="mr-4">{sub.name}:</span>
                                <span>{formatCurrency(sub.value)}</span>
                              </div>
                            ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ChartContainer>
          )}
        </div>
        {chartData && (
          <div className="text-center mt-2 text-sm text-muted-foreground">
            <p>{chartData.filter_summary}</p>
            <p className="font-semibold mt-1">
              Total: {formatCurrency(chartData.total_amount)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IncomeCategoryChart;
