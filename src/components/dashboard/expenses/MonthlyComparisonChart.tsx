import React, { useId, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  TrendingUpIcon,
  AlertTriangleIcon,
  WalletIcon,
} from "lucide-react";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useMonthlyComparisonChartData } from "@/services/expenses/MonthlyComparisonChart";
import { MonthlyComparisonChartParams } from "@/types/expenses";
import { NEON } from "@/lib/chartColors";

interface MonthlyComparisonChartProps {
  className?: string;
}

const chartConfig: ChartConfig = {
  ingresos: { label: "Ingresos", color: NEON.green },
  gastos: { label: "Gastos", color: NEON.pink },
};

const formatCop = (value: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

const formatShort = (value: number) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
  return `${value}`;
};

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
  const rawId = useId().replace(/:/g, "");

  const chartRows = useMemo(() => {
    if (!data?.labels) return [];
    const incomeDs = data.datasets.find((d) =>
      d.label?.toLowerCase().includes("ingresos"),
    );
    const expenseDs = data.datasets.find((d) =>
      d.label?.toLowerCase().includes("gastos"),
    );
    return data.labels.map((label, i) => ({
      day: label,
      ingresos: incomeDs?.data[i] ?? 0,
      gastos: expenseDs?.data[i] ?? 0,
    }));
  }, [data]);

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
      case "neutral":
        return "text-gray-600";
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
      case "neutral":
        return <CalendarIcon className="h-5 w-5 text-gray-600" />;
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

  const getFinancialStatusDisplay = () => {
    if (data.financial_summary.total_monthly_income === 0) {
      if (data.financial_summary.total_expenses_to_date > 0) {
        return {
          status: "crítico",
          description: "Sin ingresos registrados",
        };
      } else {
        return {
          status: "neutral",
          description: "Sin actividad financiera",
        };
      }
    }
    return {
      status: data.financial_summary.financial_status,
      description: `${data.financial_summary.percentage_consumed.toFixed(
        1
      )}% consumido`,
    };
  };

  const financialStatus = getFinancialStatusDisplay();

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
          <ChartContainer config={chartConfig} className="h-full w-full">
            <AreaChart
              data={chartRows}
              margin={{ top: 12, right: 12, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id={`fillIngresos-${rawId}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={NEON.green} stopOpacity={0.25} />
                  <stop offset="100%" stopColor={NEON.green} stopOpacity={0} />
                </linearGradient>
                <linearGradient
                  id={`fillGastos-${rawId}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={NEON.pink} stopOpacity={0.25} />
                  <stop offset="100%" stopColor={NEON.pink} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                stroke="hsl(0 0% 100% / 0.05)"
                strokeDasharray="3 3"
              />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 10, fill: "hsl(0 0% 63%)" }}
                axisLine={false}
                tickLine={false}
                tickMargin={8}
                minTickGap={20}
                interval="preserveStartEnd"
              />
              <YAxis
                width={48}
                tickFormatter={formatShort}
                tick={{ fontSize: 10, fill: "hsl(0 0% 63%)" }}
                axisLine={false}
                tickLine={false}
                padding={{ top: 12, bottom: 4 }}
              />
              <ChartTooltip
                cursor={{
                  stroke: "hsl(0 0% 45%)",
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                }}
                content={
                  <ChartTooltipContent
                    indicator="dot"
                    formatter={(value, name) => (
                      <div className="flex w-full items-center justify-between gap-3">
                        <span className="text-muted-foreground">
                          {chartConfig[name as keyof typeof chartConfig]
                            ?.label ?? name}
                        </span>
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {formatCop(Number(value))}
                        </span>
                      </div>
                    )}
                  />
                }
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Area
                type="monotone"
                dataKey="ingresos"
                stroke={NEON.green}
                strokeWidth={2.5}
                fill={`url(#fillIngresos-${rawId})`}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0, fill: NEON.green }}
              />
              <Area
                type="monotone"
                dataKey="gastos"
                stroke={NEON.pink}
                strokeWidth={2.5}
                fill={`url(#fillGastos-${rawId})`}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0, fill: NEON.pink }}
              />
            </AreaChart>
          </ChartContainer>
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
              {getStatusIcon(financialStatus.status)}
            </CardHeader>
            <CardContent className="pt-0">
              <div
                className={`text-lg sm:text-2xl font-bold capitalize ${getStatusColor(
                  financialStatus.status
                )}`}
              >
                {financialStatus.status}
              </div>
              <p className="text-xs text-muted-foreground mt-auto">
                {financialStatus.description}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Información adicional */}
        {data.financial_summary.total_monthly_income === 0 && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertTriangleIcon className="h-5 w-5 text-yellow-600" />
              <p className="text-yellow-800 font-medium">
                No hay ingresos registrados para este mes. La línea verde
                representa ingresos en $0.
              </p>
            </div>
          </div>
        )}

        {data.financial_summary.days_to_exceed_income &&
          data.financial_summary.total_monthly_income > 0 && (
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
