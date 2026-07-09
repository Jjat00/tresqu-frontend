import { useState, useEffect, useMemo } from "react";
import ExpensesTable from "./expenses/ExpensesTable";
import SubcategoryView from "./SubcategoryView";
import { DateRange } from "./DateRangePicker";
import ChartJSPieChart from "./charts/ChartJSPieChart";
import ChartJSBarChart from "./charts/ChartJSBarChart";
import { Card } from "@/components/ui/card";
import { useCategoryPieChartData } from "@/hooks/useCategoryPieChartData";
import { sortedCurrencyTotals } from "@/hooks/useExpensesMonthSummary";

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

  // Selector mes/año compartido entre el KPI total y el Historial
  const today = new Date();
  const [tableMonth, setTableMonth] = useState<number>(today.getMonth() + 1);
  const [tableYear, setTableYear] = useState<number>(today.getFullYear());

  // Usar los hooks para obtener datos reales
  const {
    chartData: pieChartData,
    totalAmount,
    isLoading: isPieLoading,
    totalsByCurrency,
    totalCount,
  } = useCategoryPieChartData(dateRange);

  // KPI "Total gastado" — sigue el picker de fecha global (dateRange),
  // igual que el resto de KPIs. Usa el total REAL del rango separado por
  // moneda (sin convertir), no la suma de los 10 gastos recientes.
  const totalEntries = useMemo(
    () => sortedCurrencyTotals(totalsByCurrency),
    [totalsByCurrency]
  );

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

  // Número real de transacciones del rango (no el slice de 10 recientes)
  const getExpensesCount = () => totalCount;

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <div className="glass-card p-4 sm:p-5 animate-fade-up">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF2D95]" />
            <span className="text-[11px] sm:text-xs text-muted-foreground font-medium tracking-wide">
              Total gastado
            </span>
          </div>
          <div className="text-lg sm:text-2xl md:text-3xl font-semibold text-[#FF2D95] tracking-tight font-display">
            {totalEntries.length === 0 ? (
              <span>$0</span>
            ) : (
              totalEntries.map(([currency, value]) => (
                <div key={currency} className="leading-tight">
                  $
                  {value.toLocaleString("es-ES", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                  <span className="ml-1 text-xs sm:text-sm text-muted-foreground font-normal">
                    {currency}
                  </span>
                </div>
              ))
            )}
          </div>
          <p className="text-[10px] sm:text-xs text-muted-foreground mt-1.5 opacity-60">
            {isPieLoading
              ? "Cargando..."
              : "Según el filtro de fecha"}
          </p>
        </div>

        <div
          className="glass-card p-4 sm:p-5 animate-fade-up"
          style={{ animationDelay: "0.05s" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-foreground/60" />
            <span className="text-[11px] sm:text-xs text-muted-foreground font-medium tracking-wide">
              Transacciones
            </span>
          </div>
          <div className="text-lg sm:text-2xl md:text-3xl font-semibold text-foreground tracking-tight font-display">
            {getExpensesCount().toLocaleString("es-ES")}
          </div>
          <p className="text-[10px] sm:text-xs text-muted-foreground mt-1.5 opacity-60">
            {isPieLoading ? "Cargando..." : "Gastos registrados"}
          </p>
        </div>

        <div className="glass-card p-4 sm:p-5 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#22d3ee]" />
            <span className="text-[11px] sm:text-xs text-muted-foreground font-medium tracking-wide">
              Promedio Diario
            </span>
          </div>
          <div className="text-lg sm:text-2xl md:text-3xl font-semibold text-[#22d3ee] tracking-tight font-display">
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
            <div className="w-1.5 h-1.5 rounded-full bg-[#b388ff]" />
            <span className="text-[11px] sm:text-xs text-muted-foreground font-medium tracking-wide">
              Categoría Principal
            </span>
          </div>
          <div className="text-lg sm:text-2xl md:text-3xl font-semibold text-[#b388ff] tracking-tight font-display truncate">
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

      <Card
        className="glass-card animate-fade-up"
        style={{ animationDelay: "0.7s" }}
      >
        <ExpensesTable
          categoryFilter={categoryFilter}
          onCategoryClick={setSelectedCategory}
          onShare={handleShare}
          dateRange={dateRange}
          selectedMonth={tableMonth}
          selectedYear={tableYear}
          onMonthChange={setTableMonth}
          onYearChange={setTableYear}
        />
      </Card>
    </div>
  );
};

export default ExpensesTab;
