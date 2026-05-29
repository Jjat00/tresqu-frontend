import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import { DonutChartDataItem } from "@/hooks/useCategoryPieChartData";
import { neonize } from "@/lib/chartColors";

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

  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="flex-1 min-h-[250px] sm:min-h-[300px] flex items-center justify-center h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <defs>
            {data.map((entry, i) => (
              <linearGradient key={`grad-${i}`} id={`pieGrad-${i}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={neonize(entry.color, i)} stopOpacity={0.95} />
                <stop offset="100%" stopColor={neonize(entry.color, i)} stopOpacity={0.55} />
              </linearGradient>
            ))}
          </defs>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={isMobile ? 40 : 65}
            outerRadius={isMobile ? 65 : 95}
            paddingAngle={3}
            dataKey="value"
            nameKey="name"
            cornerRadius={4}
            stroke="none"
            onClick={(d) => onCategoryClick(d.name)}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`url(#pieGrad-${index})`}
                style={{ cursor: "pointer" }}
              />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const value = payload[0].value as number;
                const name = payload[0].name as string;
                const pct = total > 0 ? ((value / total) * 100).toFixed(1) : "0";
                const formatted = new Intl.NumberFormat("es-CO").format(value);
                const idx = data.findIndex((d) => d.name === name);
                const color = idx >= 0 ? neonize(data[idx].color, idx) : "#fff";

                return (
                  <div
                    className="px-3 py-2.5 rounded-xl text-xs"
                    style={{
                      background: "hsl(0 0% 4%)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                      <span className="font-medium text-foreground">{name}</span>
                    </div>
                    <p className="text-muted-foreground">
                      ${formatted} · <span className="text-foreground font-medium">{pct}%</span>
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          {/* Center label */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-muted-foreground"
            style={{ fontSize: isMobile ? "10px" : "11px" }}
          >
            <tspan
              x="50%"
              dy="-0.4em"
              className="fill-foreground"
              style={{ fontSize: isMobile ? "14px" : "18px", fontWeight: 600 }}
            >
              ${total >= 1000000
                ? `${(total / 1000000).toFixed(1)}M`
                : total >= 1000
                ? `${(total / 1000).toFixed(0)}K`
                : total.toLocaleString("es-CO")}
            </tspan>
            <tspan x="50%" dy="1.4em" style={{ fontSize: "10px" }}>
              Total
            </tspan>
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartDisplay;
