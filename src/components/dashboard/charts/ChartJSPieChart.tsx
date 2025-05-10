import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DateRange } from "../DateRangePicker";
import { useCategoryPieChartData } from "@/hooks/useCategoryPieChartData";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
  ChartOptions,
  TooltipItem,
  ChartEvent,
  ActiveElement,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useIsMobile } from "@/hooks/use-mobile";

// Registrar los componentes de Chart.js
ChartJS.register(ArcElement, ChartTooltip, Legend);

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
    totalAmount,
  } = useCategoryPieChartData(dateRange);
  const isMobile = useIsMobile();

  // Preparar datos para Chart.js
  const chartData = React.useMemo(() => {
    if (originalData.length === 0) {
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

    // Filtrar datos válidos
    const validData = originalData.filter(
      (item) => item && Number.isFinite(item.value) && item.value > 0
    );

    return {
      labels: validData.map((item) => item.name),
      datasets: [
        {
          data: validData.map((item) => item.value),
          backgroundColor: validData.map((item) => hexToRGBA(item.color, 0.5)),
          borderColor: validData.map((item) => item.textColor),
          borderWidth: 1,
        },
      ],
    };
  }, [originalData]);

  // Opciones para Chart.js
  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        display: !isMobile,
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
          label: function (context: TooltipItem<"doughnut">) {
            const label = context.label || "";
            const value = (context.raw as number) || 0;
            const formattedValue = new Intl.NumberFormat("es-CO").format(value);
            const percentage =
              totalAmount > 0 ? (value / totalAmount) * 100 : 0;
            return `${label}: $${formattedValue} (${percentage.toFixed(1)}%)`;
          },
        },
      },
    },
    // Permitir hacer clic en segmentos del gráfico
    onClick: (_event: ChartEvent, elements: ActiveElement[]) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const category = chartData.labels[index]?.toString() || "";
        if (category) {
          onCategoryClick(category);
        }
      }
    },
    cutout: "60%", // Hacer un donut en lugar de un pie
  };

  // Renderizar mensajes de carga, error o sin datos
  if (isLoading) {
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
          <div className="flex flex-col items-center justify-center text-muted-foreground h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-success mb-2"></div>
            <p className="text-sm">Cargando datos...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
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
          <div className="flex flex-col items-center justify-center text-muted-foreground h-full">
            <p className="text-center text-sm">
              No se pudieron cargar los datos. <br />
              Intenta nuevamente más tarde.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (chartData.labels.length === 0) {
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
          <div className="flex flex-col items-center justify-center text-muted-foreground h-full">
            <p className="text-center text-sm">
              No hay datos de gastos disponibles. <br />
              Registra tus primeros gastos.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

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
        <div className="flex-1 flex items-center justify-center h-full">
          <div style={{ height: "100%", width: "100%", position: "relative" }}>
            <Doughnut data={chartData} options={options} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartJSPieChart;
