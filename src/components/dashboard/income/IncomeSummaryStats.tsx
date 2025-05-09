import React from "react";
import { useStatsIncome } from "@/hooks/useStatsIncome";
import { Loader2, AlertCircle } from "lucide-react";

interface IncomeSummaryStatsProps {
  formatCurrency: (amount: number) => string;
  monthsForAverage?: number;
}

const IncomeSummaryStats: React.FC<IncomeSummaryStatsProps> = ({
  formatCurrency,
  monthsForAverage = 3,
}) => {
  const {
    data: statsData,
    isLoading,
    error,
  } = useStatsIncome({ months_for_average: monthsForAverage });

  if (isLoading) {
    return (
      <div className="col-span-3 flex items-center justify-center h-20">
        <Loader2 className="h-6 w-6 text-primary animate-spin" />
        <span className="ml-2 text-sm text-muted-foreground">
          Cargando estadísticas...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-span-3 flex items-center justify-center h-20 text-destructive">
        <AlertCircle className="h-6 w-6 mr-2" />
        <span>Error al cargar estadísticas</span>
      </div>
    );
  }

  if (!statsData) {
    return (
      <div className="col-span-3 flex items-center justify-center h-20">
        <p className="text-sm text-muted-foreground">
          No hay datos estadísticos disponibles
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-muted/20 p-3 sm:p-4 rounded-lg">
        <p className="text-xs sm:text-sm text-muted-foreground mb-1">
          Ingreso mensual promedio
        </p>
        <p className="text-xl sm:text-2xl font-bold">
          {formatCurrency(statsData.average_monthly_income)}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Basado en {statsData.months_analyzed} meses
        </p>
      </div>

      <div className="bg-muted/20 p-3 sm:p-4 rounded-lg">
        <p className="text-xs sm:text-sm text-muted-foreground mb-1">
          Ingresos vs. mes anterior
        </p>
        <div className="flex items-end gap-2">
          <p
            className={`text-xl sm:text-2xl font-bold ${
              statsData.difference >= 0 ? "text-success" : "text-destructive"
            }`}
          >
            {statsData.difference >= 0 ? "+" : ""}
            {formatCurrency(statsData.difference)}
          </p>
          <p
            className={`text-xs sm:text-sm ${
              statsData.difference >= 0 ? "text-success" : "text-destructive"
            }`}
          >
            {statsData.percentage_change >= 0 ? "+" : ""}
            {statsData.percentage_change.toFixed(1)}%
          </p>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {formatCurrency(statsData.current_month_income)} este mes
        </p>
      </div>

      <div className="bg-muted/20 p-3 sm:p-4 rounded-lg">
        <p className="text-xs sm:text-sm text-muted-foreground mb-1">
          Proyección próximo mes
        </p>
        <p className="text-lg sm:text-xl font-semibold">
          {formatCurrency(statsData.next_month_projection)}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Basado en tendencia actual
        </p>
      </div>
    </>
  );
};

export default IncomeSummaryStats;
