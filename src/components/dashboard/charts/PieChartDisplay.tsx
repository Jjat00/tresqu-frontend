import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import { DonutChartDataItem } from "@/hooks/useCategoryPieChartData";

interface PieChartDisplayProps {
  data: DonutChartDataItem[];
  onCategoryClick: (category: string) => void;
  isLoading: boolean;
  error: Error | null;
  filterSummary: string;
}

const PieChartDisplay: React.FC<PieChartDisplayProps> = ({
  data,
  onCategoryClick,
  isLoading,
  error,
  filterSummary,
}) => {
  const isMobile = useIsMobile();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center text-muted-foreground h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-success mb-2"></div>
        <p className="text-sm">Cargando datos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center text-muted-foreground h-full">
        <p className="text-center text-sm">
          No se pudieron cargar los datos. <br />
          Intenta nuevamente más tarde.
        </p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-muted-foreground h-full">
        <p className="text-center text-sm">
          No hay datos de gastos disponibles. <br />
          Registra tus primeros gastos.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-[250px] sm:min-h-[300px] flex items-center justify-center h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={isMobile ? 30 : 60}
            outerRadius={isMobile ? 55 : 90}
            paddingAngle={2}
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) =>
              isMobile
                ? `${(percent * 100).toFixed(0)}%`
                : `${name}: ${(percent * 100).toFixed(0)}%`
            }
            labelLine={false}
            onClick={(data) => onCategoryClick(data.name)}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                stroke={entry.textColor}
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
                const value = payload[0].value;
                // Make sure value is a number before formatting it
                const formattedValue =
                  typeof value === "number"
                    ? new Intl.NumberFormat("es-CO").format(value)
                    : value;

                return (
                  <div className="bg-card p-2 xs:p-3 rounded shadow border text-xs xs:text-sm">
                    <p className="font-semibold">{payload[0].name}</p>
                    <p>${formattedValue}</p>
                    <p className="text-success mt-1 text-xs">
                      Click para ver subcategorías
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartDisplay;
