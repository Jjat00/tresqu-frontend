
import React from "react";
import { useIncomeSummary } from "@/hooks/useIncomeSummary";
import { Loader2, AlertCircle } from "lucide-react";

interface IncomeSummaryStatsProps {
  formatCurrency: (amount: number) => string;
}

const IncomeSummaryStats: React.FC<IncomeSummaryStatsProps> = ({ formatCurrency }) => {
  const { 
    data: summaryData, 
    isLoading: summaryLoading, 
    error: summaryError 
  } = useIncomeSummary();

  if (summaryLoading) {
    return (
      <div className="col-span-3 flex items-center justify-center h-20">
        <Loader2 className="h-6 w-6 text-primary animate-spin" />
        <span className="ml-2 text-sm text-muted-foreground">Cargando estadísticas...</span>
      </div>
    );
  }

  if (summaryError) {
    return (
      <div className="col-span-3 flex items-center justify-center h-20 text-destructive">
        <AlertCircle className="h-6 w-6 mr-2" />
        <span>Error al cargar estadísticas</span>
      </div>
    );
  }

  if (!summaryData) {
    return (
      <div className="col-span-3 flex items-center justify-center h-20">
        <p className="text-sm text-muted-foreground">No hay datos estadísticos disponibles</p>
      </div>
    );
  }

  // Asegurémonos que todos los valores sean números antes de formatearlos
  const average = typeof summaryData.average_monthly === 'number' ? summaryData.average_monthly : 0;
  const comparisonAmount = typeof summaryData.comparison_previous?.amount === 'number' ? summaryData.comparison_previous.amount : 0;
  const comparisonPercentage = typeof summaryData.comparison_previous?.percentage === 'number' ? summaryData.comparison_previous.percentage : 0;
  const projection = typeof summaryData.projection_next_month === 'number' ? summaryData.projection_next_month : 0;

  return (
    <>
      <div className="bg-muted/20 p-3 sm:p-4 rounded-lg">
        <p className="text-xs sm:text-sm text-muted-foreground mb-1">Ingreso mensual promedio</p>
        <p className="text-xl sm:text-2xl font-bold">{formatCurrency(average)}</p>
      </div>
      
      <div className="bg-muted/20 p-3 sm:p-4 rounded-lg">
        <p className="text-xs sm:text-sm text-muted-foreground mb-1">Ingresos vs. mes anterior</p>
        <div className="flex items-end gap-2">
          <p className={`text-xl sm:text-2xl font-bold ${comparisonAmount >= 0 ? "text-success" : "text-destructive"}`}>
            {comparisonAmount >= 0 ? "+" : ""}
            {formatCurrency(comparisonAmount)}
          </p>
          <p className={`text-xs sm:text-sm ${comparisonAmount >= 0 ? "text-success" : "text-destructive"}`}>
            {comparisonAmount >= 0 ? "+" : ""}
            {comparisonPercentage.toFixed(1)}%
          </p>
        </div>
      </div>
      
      <div className="bg-muted/20 p-3 sm:p-4 rounded-lg">
        <p className="text-xs sm:text-sm text-muted-foreground mb-1">Proyección próximo mes</p>
        <p className="text-lg sm:text-xl font-semibold">{formatCurrency(projection)}</p>
      </div>
    </>
  );
};

export default IncomeSummaryStats;
