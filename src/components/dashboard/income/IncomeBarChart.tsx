
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { AlertCircle, Loader2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useIncomeBarData } from "@/hooks/useIncomeBarData";
import { DateRange } from "../DateRangePicker";

interface IncomeBarChartProps {
  timeFilter: "month" | "quarter" | "year";
  dateRange?: DateRange;
  formatCurrency: (amount: number) => string;
}

const IncomeBarChart: React.FC<IncomeBarChartProps> = ({
  timeFilter,
  dateRange,
  formatCurrency
}) => {
  const isMobile = useIsMobile();
  const { 
    data: barData, 
    isLoading: barLoading, 
    error: barError 
  } = useIncomeBarData(timeFilter, dateRange);

  return (
    <Card>
      <CardContent className="pt-3 xs:pt-4 sm:pt-6 xs:px-3 sm:px-4 overflow-hidden">
        <h3 className="text-sm xs:text-base sm:text-lg font-semibold mb-1 xs:mb-2">
          Ingresos {timeFilter === "month" ? "Mensuales" : timeFilter === "quarter" ? "Trimestrales" : "Anuales"}
        </h3>
        
        {barLoading ? (
          <div className="flex items-center justify-center h-[calc(100%-30px)]">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
            <span className="ml-2 text-sm text-muted-foreground">Cargando datos...</span>
          </div>
        ) : barError ? (
          <div className="flex flex-col items-center justify-center h-[calc(100%-30px)]">
            <AlertCircle className="h-8 w-8 text-destructive mb-2" />
            <p className="text-sm text-muted-foreground">Error al cargar los datos</p>
          </div>
        ) : barData.length === 0 ? (
          <div className="flex items-center justify-center h-[calc(100%-30px)]">
            <p className="text-sm text-muted-foreground">No hay datos disponibles</p>
          </div>
        ) : (
          <ChartContainer className={`h-[calc(100%-30px)]`} config={{
            value: {
              color: "#4ade80"
            }
          }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={barData} 
                margin={isMobile ? {
                  top: 10,
                  right: 0,
                  left: -20,
                  bottom: 0
                } : {
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5
                }} 
                barSize={isMobile ? 12 : 20}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  tick={{
                    fontSize: isMobile ? 10 : 12
                  }} 
                  interval={isMobile ? 1 : 0} 
                />
                <YAxis 
                  tick={{
                    fontSize: isMobile ? 10 : 12
                  }} 
                  width={isMobile ? 35 : 50} 
                  tickFormatter={value => value >= 1000 ? `${Math.floor(value / 1000)}k` : value} 
                />
                <Tooltip 
                  formatter={value => [formatCurrency(value as number), 'Monto']} 
                  labelFormatter={label => `Período: ${label}`} 
                />
                <Bar name="Ingresos" dataKey="value" fill="#4ade80" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default IncomeBarChart;
