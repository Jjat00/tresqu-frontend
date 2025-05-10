import { useState, useEffect } from "react";
import ExpensesTable from "./expenses/ExpensesTable";
import NewExpenseDialog, { ExpenseFormData } from "./expenses/NewExpenseDialog";
import SubcategoryView from "./SubcategoryView";
import { DateRange } from "./DateRangePicker";
import ChartJSPieChart from "./charts/ChartJSPieChart";
import ChartJSBarChart from "./charts/ChartJSBarChart";
import ComparativeLineChart from "./charts/ComparativeLineChart";

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
    <div className="space-y-3 md:space-y-4 sm:px-2 md:px-4 flex flex-col px-0 mx-0 my-[10px]">
      <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-2 sm:gap-3">
        <div className="w-full xs:w-auto">
          <NewExpenseDialog onAddExpense={handleAddExpense} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <div className="h-[280px] xs:h-[320px] sm:h-[350px]">
          <ChartJSPieChart onCategoryClick={() => {}} dateRange={dateRange} />
        </div>
        <div className="h-[280px] xs:h-[320px] sm:h-[350px]">
          <ChartJSBarChart
            viewMode={localViewMode}
            selectedMonth={localSelectedMonth}
            dateRange={dateRange}
          />
        </div>
      </div>

      {/* Gráfico comparativo */}
      <div className="h-[280px] xs:h-[320px] sm:h-[350px]">
        <ComparativeLineChart
          viewMode={localViewMode}
          selectedMonth={localSelectedMonth}
          activeTab={activeTab || "expenses"}
          dateRange={dateRange}
        />
      </div>

      <ExpensesTable
        categoryFilter={categoryFilter}
        onCategoryClick={setSelectedCategory}
        onShare={handleShare}
        dateRange={dateRange}
      />
    </div>
  );
};

export default ExpensesTab;
