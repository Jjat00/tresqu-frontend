import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DateRange } from "../DateRangePicker";
import { useLineChartData } from "@/hooks/useLineChartData";
import { AlertCircle, Loader2 } from "lucide-react";
import { isLocalToday, isLocalYesterday } from "@/utils/dateUtils";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Registrar los componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend,
  Filler
);

interface ChartJSLineChartProps {
  viewMode: "day" | "week" | "month" | "year";
  selectedMonth?: string;
  activeTab?: string;
  dateRange?: DateRange;
}

const ChartJSLineChart: React.FC<ChartJSLineChartProps> = ({
  viewMode,
  dateRange = { from: new Date(), to: new Date() },
}) => {
  const { data, isLoading, error } = useLineChartData(dateRange, viewMode);

  // Check if dateRange is today or yesterday
  const isToday =
    dateRange.from &&
    dateRange.to &&
    isLocalToday(dateRange.from) &&
    isLocalToday(dateRange.to);

  const isYesterday =
    dateRange.from &&
    dateRange.to &&
    isLocalYesterday(dateRange.from) &&
    isLocalYesterday(dateRange.to);

  // Check if dateRange is custom (not today or yesterday)
  const isCustomDateRange =
    dateRange.from && dateRange.to && !isToday && !isYesterday;

  // Prepare data for Chart.js
  const chartData = React.useMemo(() => {
    if (!data || !data.labels || !data.datasets || data.datasets.length === 0) {
      return {
        labels: [],
        datasets: [],
      };
    }

    return {
      labels: data.labels,
      datasets: [
        {
          label: "Gastos",
          data: data.datasets[0].data.map((value) =>
            value === undefined || value === null || isNaN(value) ? 0 : value
          ),
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "rgba(75, 192, 192, 1)",
          pointBorderColor: "#fff",
          pointBorderWidth: 1,
          pointRadius: 3,
          pointHoverRadius: 5,
        },
      ],
    };
  }, [data]);

  // Function to format currency values
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  // Calculate chart title based on date range or view mode
  const getChartTitle = () => {
    if (data?.filter_summary) {
      return data.filter_summary;
    }

    if (isToday) {
      return "Gastos de hoy";
    } else if (isYesterday) {
      return "Gastos de ayer";
    } else if (isCustomDateRange) {
      return "Gastos por día";
    } else if (viewMode === "week") {
      return "Gastos por día de la semana";
    } else {
      return "Gastos por período";
    }
  };

  // Chart.js options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += formatCurrency(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 45,
          minRotation: 0,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: any) {
            if (value >= 1000000) {
              return (value / 1000000).toFixed(1) + "M";
            } else if (value >= 1000) {
              return (value / 1000).toFixed(0) + "K";
            }
            return value;
          },
        },
      },
    },
  };

  return (
    <Card className="h-full">
      <CardHeader className="px-3 xs:px-4 sm:px-6 py-2 xs:py-3 sm:py-4">
        <CardTitle className="text-sm xs:text-base">
          Gastos{" "}
          {getChartTitle() !== "Gastos por período"
            ? `- ${getChartTitle()}`
            : "por período"}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 xs:px-0 sm:px-2 py-0 sm:py-1 h-[calc(100%-60px)]">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
            <span className="ml-2 text-sm text-muted-foreground">
              Cargando datos...
            </span>
          </div>
        ) : error ? (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <AlertCircle className="h-8 w-8 text-destructive mb-2" />
            <p className="text-sm text-muted-foreground">
              Error al cargar los datos
            </p>
          </div>
        ) : chartData.labels.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-sm text-muted-foreground">
              No hay datos disponibles
            </p>
          </div>
        ) : (
          <div className="w-full h-full pt-2">
            <div className="text-xs mb-1 px-4 text-right">
              <span className="font-semibold">Total: </span>
              <span>{formatCurrency(data?.total_amount || 0)}</span>
            </div>
            <div style={{ height: "90%", width: "100%" }}>
              <Line data={chartData} options={options} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChartJSLineChart;
