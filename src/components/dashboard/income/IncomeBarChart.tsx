import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Loader2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useIncomeBarData } from "@/hooks/useIncomeBarData";
import { DateRange } from "../DateRangePicker";
import { BarStackedChartParams } from "@/types/incomes";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Registrar los componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend
);

interface IncomeBarChartProps {
  timeFilter: "month" | "quarter" | "year";
  dateRange?: DateRange;
  formatCurrency: (amount: number) => string;
}

const IncomeBarChart: React.FC<IncomeBarChartProps> = ({
  timeFilter,
  dateRange,
  formatCurrency,
}) => {
  const isMobile = useIsMobile();

  // Convertir filtros a parámetros para el hook
  const queryParams: BarStackedChartParams = useMemo(() => {
    const params: BarStackedChartParams = {};

    // Configurar group_by basado en timeFilter
    if (timeFilter === "month") {
      params.group_by = "day";
      params.date_filter = "current_month";
    } else if (timeFilter === "quarter") {
      params.group_by = "week";
      params.date_filter = "custom";
      // Calcular fecha de hace 3 meses
      const today = new Date();
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(today.getMonth() - 3);
      params.start_date = threeMonthsAgo.toISOString().split("T")[0];
      params.end_date = today.toISOString().split("T")[0];
    } else if (timeFilter === "year") {
      params.group_by = "month";
      params.date_filter = "current_year";
    }

    // Si hay un rango de fechas personalizado, usarlo en lugar de los filtros predefinidos
    if (dateRange?.from && dateRange?.to) {
      params.date_filter = "custom";
      params.start_date = dateRange.from.toISOString().split("T")[0];
      params.end_date = dateRange.to.toISOString().split("T")[0];
    }

    return params;
  }, [timeFilter, dateRange]);

  const { data, isLoading, error, refetch } = useIncomeBarData(queryParams);

  // Transformar los datos para Chart.js
  const chartData = useMemo(() => {
    if (!data || !data.labels || !data.datasets) {
      return {
        labels: [],
        datasets: [],
      };
    }

    // Transformar los datasets al formato esperado por Chart.js
    return {
      labels: data.labels,
      datasets: data.datasets.map((dataset) => ({
        label: dataset.label,
        data: dataset.data,
        backgroundColor: Array.isArray(dataset.backgroundColor)
          ? dataset.backgroundColor.map((color: string) => `${color}80`)
          : `${dataset.backgroundColor}80`,
        borderColor: dataset.borderColor,
        borderWidth: dataset.borderWidth,
      })),
    };
  }, [data]);

  // Título del gráfico
  const chartTitle = useMemo(() => {
    if (timeFilter === "month") {
      return "Ingresos Mensuales";
    } else if (timeFilter === "quarter") {
      return "Ingresos Trimestrales";
    } else {
      return "Ingresos Anuales";
    }
  }, [timeFilter]);

  // Opciones para Chart.js
  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        display: !isMobile,
        labels: {
          boxWidth: 10,
          padding: 10,
          font: {
            size: isMobile ? 8 : 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            let label = tooltipItem.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (tooltipItem.parsed.y !== null) {
              label += formatCurrency(tooltipItem.parsed.y);
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: isMobile ? 8 : 12,
          },
          maxRotation: isMobile ? 45 : 0,
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: {
          font: {
            size: isMobile ? 8 : 12,
          },
          callback: function (value) {
            const numValue = Number(value);
            if (numValue >= 1000000) {
              return `${(numValue / 1000000).toFixed(1)}M`;
            } else if (numValue >= 1000) {
              return `${(numValue / 1000).toFixed(0)}K`;
            }
            return value;
          },
        },
      },
    },
  };

  return (
    <Card className="overflow-hidden h-full">
      <CardContent className="pt-3 xs:pt-4 sm:pt-6 xs:px-3 sm:px-4 h-full flex flex-col px-[15px]">
        <div className="flex justify-between items-center mb-1 xs:mb-2">
          <h3 className="text-sm xs:text-base sm:text-lg font-semibold">
            {chartTitle}
          </h3>
          {data && (
            <div className="text-xs text-muted-foreground">
              {data.filter_summary}
            </div>
          )}
        </div>

        <div className="flex-1 min-h-[200px] flex items-center justify-center">
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 text-primary animate-spin mr-2" />
              <span className="text-sm text-muted-foreground">
                Cargando datos...
              </span>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center">
              <AlertCircle className="h-8 w-8 text-destructive mb-2" />
              <p className="text-sm text-destructive mb-1">
                Error al cargar los datos
              </p>
              <button
                onClick={() => refetch()}
                className="text-xs text-primary hover:underline mt-2"
              >
                Reintentar
              </button>
            </div>
          ) : chartData.labels.length === 0 ? (
            <div className="flex items-center justify-center">
              <p className="text-sm text-muted-foreground">
                No hay datos disponibles para este periodo
              </p>
            </div>
          ) : (
            <div style={{ height: "100%", width: "100%" }}>
              <Bar data={chartData} options={options} />
            </div>
          )}
        </div>

        {data && data.total_amount > 0 && (
          <div className="mt-2 text-right">
            <span className="text-xs font-medium">
              Total: {formatCurrency(data.total_amount)}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IncomeBarChart;
