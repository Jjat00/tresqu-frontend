import { useState, useEffect } from "react";
import ExpensesTable from "./expenses/ExpensesTable";
import SubcategoryView from "./SubcategoryView";
import { DateRange } from "./DateRangePicker";
import ChartJSPieChart from "./charts/ChartJSPieChart";
import ChartJSBarChart from "./charts/ChartJSBarChart";
import ComparativeLineChart from "./charts/ComparativeLineChart";
import { MonthlyComparisonChart } from "./expenses/MonthlyComparisonChart";
import CumulativeBalanceChart from "./CumulativeBalanceChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUpIcon,
  WalletIcon,
  CalendarIcon,
  TagIcon,
} from "lucide-react";
import { useCategoryPieChartData } from "@/hooks/useCategoryPieChartData";

interface ExpensesTabProps {
  selectedMonth?: string;
  activeTab?: string;
  dateRange?: DateRange;
  viewMode?: "day" | "week" | "month" | "year";
}

const ExpensesTab = ({
  selectedMonth = "Abril",
  activeTab = "expenses",
  dateRange = { from: new Date(), to: new Date() },
  viewMode = "month",
}: ExpensesTabProps) => {
  const [localViewMode, setLocalViewMode] = useState<"month" | "year">(
    viewMode === "year" ? "year" : "month"
  );
  const [categoryFilter] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [localSelectedMonth, setLocalSelectedMonth] = useState(selectedMonth);

  // Usar los hooks para obtener datos reales
  const {
    chartData: pieChartData,
    totalAmount,
    isLoading: isPieLoading,
    recentExpenses,
  } = useCategoryPieChartData(dateRange);

  // Calcular el gasto promedio diario
  const calculateDailyAverage = () => {
    if (!dateRange?.from || !dateRange?.to || !totalAmount) return 0;

    // Si es el mismo día, retornar el total directamente
    if (dateRange.from.toDateString() === dateRange.to.toDateString()) {
      return totalAmount;
    }

    // Calcular la diferencia en días de manera más precisa
    const startDate = new Date(dateRange.from);
    const endDate = new Date(dateRange.to);

    // Ajustar las fechas para que empiecen al inicio del día
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    // Calcular la diferencia en días incluyendo el día inicial
    const daysDiff =
      Math.floor(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      ) + 1;

    // Calcular el promedio con 2 decimales
    const average = totalAmount / daysDiff;
    return Number(average.toFixed(2));
  };

  // Obtener la categoría principal
  const getMainCategory = () => {
    if (!pieChartData || pieChartData.length === 0)
      return { name: "N/A", percentage: 0 };
    const mainCategory = pieChartData.reduce((prev, current) =>
      current.value > prev.value ? current : prev
    );
    const percentage = (mainCategory.value / totalAmount) * 100;
    return { name: mainCategory.name, percentage: percentage.toFixed(1) };
  };

  // Calcular el número de gastos
  const getExpensesCount = () => {
    if (!recentExpenses) return 0;
    return recentExpenses.length;
  };

  // Update localSelectedMonth when prop changes
  useEffect(() => {
    setLocalSelectedMonth(selectedMonth);
    // If year is selected, update view mode
    if (selectedMonth === "year") {
      setLocalViewMode("year");
    } else {
      setLocalViewMode("month");
    }
  }, [selectedMonth]);

  // Update local view mode when props change
  useEffect(() => {
    setLocalViewMode(viewMode === "year" ? "year" : "month");
  }, [viewMode]);

  const handleShare = () => {
    console.log("Sharing Tresqu");
    // Implementation would go here
  };

  // If a category is selected, show the subcategory view
  if (selectedCategory) {
    return (
      <SubcategoryView
        category={selectedCategory}
        onBack={() => setSelectedCategory(null)}
      />
    );
  }

  return (
    <div className="space-y-3 md:space-y-4 flex flex-col relative">

      {/* KPIs Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
        <div className="glass-card p-4 sm:p-5 animate-fade-up">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            <span className="text-[11px] sm:text-xs text-muted-foreground font-medium tracking-wide">
              Transacciones
            </span>
          </div>
          <div className="text-lg sm:text-2xl md:text-3xl font-semibold text-rose-400 tracking-tight font-display">
            {getExpensesCount().toLocaleString("es-ES")}
          </div>
          <p className="text-[10px] sm:text-xs text-muted-foreground mt-1.5 opacity-60">
            {isPieLoading ? "Cargando..." : "Gastos registrados"}
          </p>
        </div>

        <div className="glass-card p-4 sm:p-5 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <span className="text-[11px] sm:text-xs text-muted-foreground font-medium tracking-wide">
              Promedio Diario
            </span>
          </div>
          <div className="text-lg sm:text-2xl md:text-3xl font-semibold text-sky-400 tracking-tight font-display">
            $
            {calculateDailyAverage().toLocaleString("es-ES", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </div>
          <p className="text-[10px] sm:text-xs text-muted-foreground mt-1.5 opacity-60">
            {isPieLoading ? "Cargando..." : "Promedio por día"}
          </p>
        </div>

        <div className="glass-card p-4 sm:p-5 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            <span className="text-[11px] sm:text-xs text-muted-foreground font-medium tracking-wide">
              Categoría Principal
            </span>
          </div>
          <div className="text-lg sm:text-2xl md:text-3xl font-semibold text-violet-400 tracking-tight font-display truncate">
            {getMainCategory().name}
          </div>
          <p className="text-[10px] sm:text-xs text-muted-foreground mt-1.5 opacity-60">
            {isPieLoading
              ? "Cargando..."
              : `${getMainCategory().percentage}% del gasto total`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <div
          className="h-[280px] xs:h-[320px] sm:h-[350px] glass-card animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          <ChartJSPieChart onCategoryClick={() => {}} dateRange={dateRange} />
        </div>
        <div
          className="h-[280px] xs:h-[320px] sm:h-[350px] glass-card animate-fade-up"
          style={{ animationDelay: "0.5s" }}
        >
          <ChartJSBarChart
            viewMode={localViewMode}
            selectedMonth={localSelectedMonth}
            dateRange={dateRange}
          />
        </div>
      </div>

      {/* Gráfico comparativo */}
      <div
        className="h-[280px] xs:h-[320px] sm:h-[350px] glass-card animate-fade-up"
        style={{ animationDelay: "0.6s" }}
      >
        <ComparativeLineChart
          viewMode={localViewMode}
          selectedMonth={localSelectedMonth}
          activeTab={activeTab || "expenses"}
          dateRange={dateRange}
        />
      </div>

      {/* Gráfico de comparación mensual: Ingresos vs Gastos */}
      <div
        className="glass-card animate-fade-up"
        style={{ animationDelay: "0.65s" }}
      >
        <MonthlyComparisonChart />
      </div>

      {/* Balance acumulado mes a mes */}
      <CumulativeBalanceChart />

      <Card
        className="glass-card animate-fade-up"
        style={{ animationDelay: "0.7s" }}
      >
        <ExpensesTable
          categoryFilter={categoryFilter}
          onCategoryClick={setSelectedCategory}
          onShare={handleShare}
          dateRange={dateRange}
        />
      </Card>
    </div>
  );
};

export default ExpensesTab;
