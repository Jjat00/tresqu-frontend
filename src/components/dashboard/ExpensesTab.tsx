import { useState, useEffect } from "react";
import CategoryPieChart from "./charts/CategoryPieChart";
import ExpensesBarChart from "./charts/ExpensesBarChart";
import ExpensesTable from "./expenses/ExpensesTable";
import ExpenseFilters from "./expenses/ExpenseFilters";
import NewExpenseDialog, { ExpenseFormData } from "./expenses/NewExpenseDialog";
import SubcategoryView from "./SubcategoryView";
interface ExpensesTabProps {
  selectedMonth?: string;
}
const ExpensesTab = ({
  selectedMonth = "Abril"
}: ExpensesTabProps) => {
  const [viewMode, setViewMode] = useState<"month" | "year">("month");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [localSelectedMonth, setLocalSelectedMonth] = useState(selectedMonth);

  // Update localSelectedMonth when prop changes
  useEffect(() => {
    setLocalSelectedMonth(selectedMonth);
    // If year is selected, update view mode
    if (selectedMonth === "year") {
      setViewMode("year");
    } else {
      setViewMode("month");
    }
  }, [selectedMonth]);
  const handleAddExpense = (expense: ExpenseFormData) => {
    console.log("Adding new expense:", expense);
    // Here you would add logic to add the expense
  };
  const handleShare = () => {
    console.log("Sharing CashBot");
    // Implementation would go here
  };

  // If a category is selected, show the subcategory view
  if (selectedCategory) {
    return <SubcategoryView category={selectedCategory} onBack={() => setSelectedCategory(null)} />;
  }
  return <div className="space-y-3 md:space-y-6 sm:px-2 md:px-4 flex flex-col px-0 mx-0 my-[60px]">
      <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-2 sm:gap-3">
        <div className="w-full xs:w-auto">
          <ExpenseFilters categoryFilter={categoryFilter} onCategoryFilterChange={setCategoryFilter} />
        </div>

        <div className="w-full xs:w-auto mt-2 xs:mt-0">
          <NewExpenseDialog onAddExpense={handleAddExpense} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 h-[320px] xs:h-[380px] sm:h-[420px] mx-0 px-[5px] py-[4px] my-[52px]">
        <CategoryPieChart onCategoryClick={setSelectedCategory} />
        <ExpensesBarChart viewMode={viewMode} selectedMonth={localSelectedMonth} />
      </div>

      <ExpensesTable categoryFilter={categoryFilter} onCategoryClick={setSelectedCategory} onShare={handleShare} />
    </div>;
};
export default ExpensesTab;