import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  TrendingUpIcon,
  AlertTriangleIcon,
  WalletIcon,
} from "lucide-react";
import { useMonthlyComparisonChartData } from "@/services/expenses/MonthlyComparisonChart";
import { MonthlyComparisonChartParams } from "@/types/expenses";

// Registrar los componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface MonthlyComparisonChartProps {
  className?: string;
}

export const MonthlyComparisonChart: React.FC<MonthlyComparisonChartProps> = ({
  className,
}) => {
  const currentDate = new Date();
  const [params, setParams] = useState<MonthlyComparisonChartParams>({
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
    timezone: "America/Bogota",
  });

  const { data, isLoading, error } = useMonthlyComparisonChartData(params);

  const handlePreviousMonth = () => {
    const newMonth = params.month === 1 ? 12 : (params.month || 1) - 1;
    const newYear =
      params.month === 1
        ? (params.year || currentDate.getFullYear()) - 1
        : params.year;
    setParams({ ...params, month: newMonth, year: newYear });
  };

  const handleNextMonth = () => {
    const newMonth = params.month === 12 ? 1 : (params.month || 12) + 1;
    const newYear =
      params.month === 12
        ? (params.year || currentDate.getFullYear()) + 1
        : params.year;
    setParams({ ...params, month: newMonth, year: newYear });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "saludable":
        return "text-green-600";
      case "precaución":
        return "text-yellow-600";
      case "advertencia":
        return "text-orange-600";
      case "crítico":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "saludable":
        return <TrendingUpIcon className="h-5 w-5 text-green-600" />;
      case "precaución":
      case "advertencia":
      case "crítico":
        return <AlertTriangleIcon className="h-5 w-5 text-red-600" />;
      default:
        return <TrendingUpIcon className="h-5 w-5 text-gray-600" />;
    }
  };

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Comparación Mensual: Ingresos vs Gastos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Comparación Mensual: Ingresos vs Gastos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-red-500">
            Error al cargar los datos del gráfico
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Comparación Mensual: Ingresos vs Gastos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500">
            No hay datos disponibles
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          padding: window.innerWidth < 768 ? 10 : 20,
          font: {
            size: window.innerWidth < 768 ? 11 : 12,
          },
          boxWidth: window.innerWidth < 768 ? 8 : 12,
        },
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        titleFont: {
          size: window.innerWidth < 768 ? 12 : 14,
        },
        bodyFont: {
          size: window.innerWidth < 768 ? 11 : 13,
        },
        callbacks: {
          label: function (context: {
            dataset: { label?: string };
            parsed: { y: number };
          }) {
            const label = context.dataset.label || "";
            const value = new Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP",
              minimumFractionDigits: 0,
              maximumFractionDigits: window.innerWidth < 768 ? 0 : 2,
            }).format(context.parsed.y);
            return `${label}: ${value}`;
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: window.innerWidth >= 640,
          text: `Días del mes (${data.month_info.month_name} ${data.month_info.year})`,
          font: {
            size: window.innerWidth < 768 ? 10 : 12,
          },
        },
        ticks: {
          font: {
            size: window.innerWidth < 768 ? 9 : 11,
          },
          maxTicksLimit: window.innerWidth < 768 ? 8 : 15,
        },
        grid: {
          display: window.innerWidth >= 640,
        },
      },
      y: {
        display: true,
        beginAtZero: true,
        max: data.financial_summary.total_monthly_income * 1.2,
        title: {
          display: window.innerWidth >= 640,
          text: "Monto",
          font: {
            size: window.innerWidth < 768 ? 10 : 12,
          },
        },
        ticks: {
          font: {
            size: window.innerWidth < 768 ? 9 : 11,
          },
          maxTicksLimit: window.innerWidth < 768 ? 5 : 8,
          callback: function (value: string | number) {
            const numValue = Number(value);
            if (window.innerWidth < 768) {
              if (numValue >= 1000000) {
                return `${(numValue / 1000000).toFixed(1)}M`;
              } else if (numValue >= 1000) {
                return `${(numValue / 1000).toFixed(0)}K`;
              }
              return new Intl.NumberFormat("es-CO", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(numValue);
            }
            return new Intl.NumberFormat("es-CO").format(numValue);
          },
        },
        grid: {
          display: window.innerWidth >= 640,
        },
      },
    },
  };

  const chartData = {
    labels: data.labels,
    datasets: data.datasets.map((dataset, index) => {
      // Para gastos acumulados, solo mostrar puntos donde hay cambios
      let pointRadius: number[] = [];

      if (dataset.label?.toLowerCase().includes("gastos")) {
        // Para gastos acumulados, mostrar punto solo cuando hay un cambio
        pointRadius = dataset.data.map((value, i) => {
          if (i === 0) return value > 0 ? 4 : 0; // Primer día
          const prevValue = dataset.data[i - 1];
          return value > prevValue ? 4 : 0; // Solo si hay incremento
        });
      } else if (dataset.label?.toLowerCase().includes("ingresos")) {
        // Para ingresos, mostrar puntos solo donde hay cambios o datos reales
        pointRadius = dataset.data.map((value, i) => {
          // Si es una línea constante de ingresos, solo mostrar algunos puntos de referencia
          // pero verificar que realmente hay ingresos
          if (value > 0) {
            // Mostrar punto solo en el primer día con ingresos y el último día del mes
            if (i === 0 || i === dataset.data.length - 1) {
              return 4;
            }
            // Para el resto, no mostrar puntos (línea constante limpia)
            return 0;
          }
          return 0; // No hay ingresos, no mostrar punto
        });
      } else {
        // Para otros datasets, comportamiento normal
        pointRadius = dataset.data.map(() => 4);
      }

      return {
        ...dataset,
        type: undefined,
        tension: 0, // Líneas completamente rectas
        pointRadius: pointRadius, // Array de radios personalizados
        pointHoverRadius: pointRadius.map((r) => (r > 0 ? 6 : 0)), // Hover solo donde hay puntos
        pointBackgroundColor: dataset.borderColor,
        pointBorderColor: dataset.borderColor,
        pointBorderWidth: 2,
        // Agregar relleno verde para la línea de ingresos
        fill: dataset.label?.toLowerCase().includes("ingresos")
          ? "origin"
          : dataset.fill,
        backgroundColor: dataset.label?.toLowerCase().includes("ingresos")
          ? "rgba(76, 175, 80, 0.1)" // Verde suave para ingresos
          : dataset.backgroundColor,
        // Asegurar que la línea de gastos esté encima
        order: dataset.label?.toLowerCase().includes("gastos") ? 1 : 2, // Gastos = 1 (encima), Ingresos = 2 (debajo)
      };
    }),
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
          <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
            <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden sm:inline">
              Comparación Mensual: Ingresos vs Gastos
            </span>
            <span className="sm:hidden">Ingresos vs Gastos</span>
          </CardTitle>
          <div className="flex items-center gap-2 justify-center sm:justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousMonth}
              className="h-8 w-8 p-0"
            >
              ←
            </Button>
            <span className="text-xs sm:text-sm font-medium min-w-[100px] text-center">
              {data.month_info.month_name} {data.month_info.year}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextMonth}
              className="h-8 w-8 p-0"
            >
              →
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64 sm:h-80 mb-4 sm:mb-6">
          <Line data={chartData} options={chartOptions} />
        </div>

        {/* Resumen financiero */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mt-4 sm:mt-6">
          <Card className="glass-card animate-fade-up">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium gradient-text-cyan">
                Ingresos del Mes
              </CardTitle>
              <TrendingUpIcon className="h-3 w-3 sm:h-4 sm:w-4 text-highlight" />
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-lg sm:text-2xl font-bold text-highlight">
                {new Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(data.financial_summary.total_monthly_income)}
              </div>
              <p className="text-xs text-muted-foreground mt-auto">
                Total de ingresos mensuales
              </p>
            </CardContent>
          </Card>

          <Card
            className="glass-card animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium gradient-text">
                Gastos Acumulados
              </CardTitle>
              <WalletIcon className="h-3 w-3 sm:h-4 sm:w-4 text-rose-500" />
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-lg sm:text-2xl font-bold text-rose-500">
                {new Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(data.financial_summary.total_expenses_to_date)}
              </div>
              <p className="text-xs text-muted-foreground mt-auto">
                Gastos hasta la fecha
              </p>
            </CardContent>
          </Card>

          <Card
            className="glass-card animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium gradient-text-purple">
                Presupuesto Restante
              </CardTitle>
              <CalendarIcon className="h-3 w-3 sm:h-4 sm:w-4 text-purple" />
            </CardHeader>
            <CardContent className="pt-0">
              <div
                className={`text-lg sm:text-2xl font-bold ${
                  data.financial_summary.remaining_budget >= 0
                    ? "text-green-600"
                    : "text-rose-500"
                }`}
              >
                {new Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(data.financial_summary.remaining_budget)}
              </div>
              <p className="text-xs text-muted-foreground mt-auto">
                {data.financial_summary.remaining_budget >= 0
                  ? "Disponible"
                  : "Sobregiro"}
              </p>
            </CardContent>
          </Card>

          <Card
            className="glass-card animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium gradient-text">
                Estado Financiero
              </CardTitle>
              {getStatusIcon(data.financial_summary.financial_status)}
            </CardHeader>
            <CardContent className="pt-0">
              <div
                className={`text-lg sm:text-2xl font-bold capitalize ${getStatusColor(
                  data.financial_summary.financial_status
                )}`}
              >
                {data.financial_summary.financial_status}
              </div>
              <p className="text-xs text-muted-foreground mt-auto">
                {data.financial_summary.percentage_consumed.toFixed(1)}%
                consumido
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Información adicional */}
        {data.financial_summary.days_to_exceed_income && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertTriangleIcon className="h-5 w-5 text-red-600" />
              <p className="text-red-800 font-medium">
                Los gastos superaron los ingresos el día{" "}
                {data.financial_summary.days_to_exceed_income} del mes
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
