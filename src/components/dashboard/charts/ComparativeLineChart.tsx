
import React from "react";
import ExpensesLineChart from "./ExpensesLineChart";
import { DateRange } from "../DateRangePicker";

interface ComparativeLineChartProps {
  viewMode: "day" | "week" | "month" | "year";
  selectedMonth?: string;
  activeTab?: string;
  dateRange?: DateRange;
}

const ComparativeLineChart: React.FC<ComparativeLineChartProps> = ({
  viewMode,
  selectedMonth,
  activeTab = "expenses",
  dateRange,
}) => {
  return (
    <div className="h-full">
      {activeTab === "expenses" && (
        <ExpensesLineChart
          viewMode={viewMode}
          selectedMonth={selectedMonth}
          dateRange={dateRange}
        />
      )}
      {activeTab !== "expenses" && (
        <div className="bg-card border rounded-lg h-full flex items-center justify-center">
          <p className="text-sm text-muted-foreground">
            Gráfico comparativo para {activeTab} próximamente
          </p>
        </div>
      )}
    </div>
  );
};

export default ComparativeLineChart;
