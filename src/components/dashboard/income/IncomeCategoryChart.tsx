import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Loader2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useIncomePieChart } from "@/hooks/useIncomePieChart";
import { DateRange } from "../DateRangePicker";
import { DonutChartParams } from "@/types/incomes";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Registrar los componentes de Chart.js
ChartJS.register(ArcElement, ChartTooltip, Legend);

interface IncomeCategoryChartProps {
  dateRange?: DateRange;
  formatCurrency: (amount: number) => string;
  onSelectCategory?: (category: string) => void;
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

  // Transformar datos de la API al formato esperado por Chart.js
  const pieData = useMemo(() => {
    if (!chartData || !chartData.labels || !chartData.datasets) {
      return {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1,
          },
        ],
      };
    }

    // Función para convertir hex a rgba
    const hexToRGBA = (hex: string, alpha: number) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    return {
      labels: chartData.labels,
      datasets: [
        {
          data: chartData.datasets[0].data,
          backgroundColor: chartData.datasets[0].backgroundColor.map(
            (color: string) => hexToRGBA(color, 0.5)
          ),
          borderColor: chartData.datasets[0].backgroundColor.map(
            (color: string) => (color === "#00FF7F" ? "#166534" : "#1e40af")
          ),
          borderWidth: 1,
        },
      ],
    };
  }, [chartData]);

  // Opciones para Chart.js
  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: isMobile ? "bottom" : "right",
        display: true,
        labels: {
          boxWidth: 10,
          padding: 10,
          font: {
            size: isMobile ? 9 : 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = tooltipItem.label || "";
            const value = tooltipItem.raw as number;
            const total = chartData?.total_amount || 0;
            const percentage = total > 0 ? (value / total) * 100 : 0;
            return `${label}: ${formatCurrency(value)} (${percentage.toFixed(
              1
            )}%)`;
          },
        },
      },
    },
    // Permitir hacer clic en segmentos del gráfico
    onClick: (event, elements) => {
      if (elements.length > 0 && onSelectCategory) {
        const index = elements[0].index;
        const category = pieData.labels?.[index]?.toString() || "";
        if (category) {
          onSelectCategory(category);
        }
      }
    },
    cutout: "60%", // Hacer un donut en lugar de un pie
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardContent className="pt-3 xs:pt-4 sm:pt-6 px-2 xs:px-3 sm:px-4 h-full flex flex-col grow">
        <div className="flex justify-between items-center mb-1 xs:mb-2">
          <h3 className="xs:text-base sm:text-lg text-sm font-semibold">
            Ingresos por Categoría
          </h3>
          {chartData?.filter_summary && (
            <p className="text-xs text-muted-foreground">
              {chartData.filter_summary}
            </p>
          )}
        </div>
        <div className="flex-1 flex items-center justify-center relative">
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
          ) : !pieData.labels || pieData.labels.length === 0 ? (
            <div className="flex items-center justify-center h-full w-full">
              <p className="text-sm text-muted-foreground">
                No hay datos disponibles
              </p>
            </div>
          ) : (
            <div
              style={{
                position: "relative",
                width: "100%",
                height: isMobile ? "200px" : "250px",
              }}
            >
              <Doughnut data={pieData} options={options} />
            </div>
          )}
        </div>
        {chartData && (
          <div className="text-right mt-2 text-sm">
            <p className="font-semibold">
              Total: {formatCurrency(chartData.total_amount)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IncomeCategoryChart;
