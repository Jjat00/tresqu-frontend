import { useState, useEffect } from "react";
import ExpensesTable from "./expenses/ExpensesTable";
import NewExpenseDialog, { ExpenseFormData } from "./expenses/NewExpenseDialog";
import SubcategoryView from "./SubcategoryView";
import { DateRange } from "./DateRangePicker";
import ChartJSPieChart from "./charts/ChartJSPieChart";
import ChartJSBarChart from "./charts/ChartJSBarChart";
import ComparativeLineChart from "./charts/ComparativeLineChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowDownIcon,
  ArrowUpIcon,
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
  const [categoryFilter, setCategoryFilter] = useState("all");
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

  const handleAddExpense = (expense: ExpenseFormData) => {
    console.log("Adding new expense:", expense);
    // Here you would add logic to add the expense
  };

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
    <div className="space-y-3 md:space-y-4 flex flex-col px-0 mx-0 my-0 relative">
      {/* Efectos de fondo */}
      <div className="fixed inset-0 z-[-2] opacity-50 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 25% 25%, rgba(74, 222, 128, 0.1), transparent 40%)",
          }}
        ></div>
        <div
          className="absolute bottom-0 right-0 w-full h-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 75% 75%, rgba(96, 165, 250, 0.1), transparent 40%)",
          }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(167, 139, 250, 0.05), transparent 50%)",
          }}
        ></div>
      </div>

      {/* Patrón sutil de puntos */}
      <div
        className="fixed inset-0 z-[-2] opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      ></div>

      {/* <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-2 sm:gap-3 animate-fade-up">
        <div className="w-full xs:w-auto">
          <NewExpenseDialog onAddExpense={handleAddExpense} />
        </div>
      </div> */}

      {/* KPIs Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-card animate-fade-up">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium gradient-text">
              Gasto Total
            </CardTitle>
            <WalletIcon className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-500">
              $
              {totalAmount?.toLocaleString("es-ES", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) || "0,00"}
            </div>
            <p className="text-xs text-muted-foreground mt-auto">
              {isPieLoading ? "Cargando..." : "Gastos del período"}
            </p>
          </CardContent>
        </Card>

        <Card
          className="glass-card animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium gradient-text-cyan">
              Gasto Promedio Diario
            </CardTitle>
            <CalendarIcon className="h-4 w-4 text-highlight" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-highlight">
              $
              {calculateDailyAverage().toLocaleString("es-ES", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <p className="text-xs text-muted-foreground mt-auto">
              {isPieLoading ? "Cargando..." : "Promedio por día"}
            </p>
          </CardContent>
        </Card>

        <Card
          className="glass-card animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium gradient-text-purple">
              Categoría Principal
            </CardTitle>
            <TagIcon className="h-4 w-4 text-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple">
              {getMainCategory().name}
            </div>
            <p className="text-xs text-muted-foreground mt-auto">
              {isPieLoading
                ? "Cargando..."
                : `${getMainCategory().percentage}% del gasto total`}
            </p>
          </CardContent>
        </Card>

        <Card
          className="glass-card animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium gradient-text">
              Número de Gastos
            </CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-500">
              {getExpensesCount().toLocaleString("es-ES")}
            </div>
            <p className="text-xs text-muted-foreground mt-auto">
              {isPieLoading ? "Cargando..." : "Gastos registrados"}
            </p>
          </CardContent>
        </Card>
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
