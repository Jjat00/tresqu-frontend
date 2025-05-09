import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Plus, Download } from "lucide-react";
import { DateRange } from "./DateRangePicker";

// Import refactored components
import IncomeLineChart from "./income/IncomeLineChart";
import IncomeCategoryChart from "./income/IncomeCategoryChart";
import IncomeBarChart from "./income/IncomeBarChart";
import IncomeSummaryStats from "./income/IncomeSummaryStats";
import IncomeTable from "./income/IncomeTable";
import NewIncomeDialog, { IncomeFormData } from "./income/NewIncomeDialog";

interface IncomeTabProps {
  selectedMonth?: string;
  activeTab?: string;
  dateRange?: DateRange;
  viewMode?: "day" | "week" | "month" | "year";
}

const IncomeTab = ({
  selectedMonth = "Abril",
  activeTab = "income",
  dateRange,
  viewMode = "week",
}: IncomeTabProps) => {
  const [timeFilter, setTimeFilter] = useState<"month" | "quarter" | "year">(
    "month"
  );
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [newIncomeOpen, setNewIncomeOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewModeLocal, setViewModeLocal] = useState<
    "day" | "week" | "month" | "year"
  >(viewMode);
  const [localSelectedMonth, setLocalSelectedMonth] = useState(selectedMonth);

  // Update localSelectedMonth when prop changes
  useEffect(() => {
    setLocalSelectedMonth(selectedMonth);
    // If year is selected, update view mode
    if (selectedMonth === "year") {
      setViewModeLocal("year");
    }
  }, [selectedMonth]);

  const handleAddIncome = (newIncome: IncomeFormData) => {
    console.log("Adding new income:", newIncome);
    // Here you would add logic to add the income to the backend
  };

  const handleExportPDF = () => {
    console.log("Exporting income data to PDF");
    // Implementation would go here
  };

  const handleExportExcel = () => {
    console.log("Exporting income data to Excel");
    // Implementation would go here
  };

  const handleShare = () => {
    console.log("Sharing CashBot");
    // Implementation would go here
  };

  // Format currency for display
  const formatCurrency = (amount: number | undefined | null) => {
    if (amount === undefined || amount === null) {
      return "$ 0";
    }
    return amount.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className="space-y-3 md:space-y-4 sm:px-2 md:px-4 flex flex-col px-0 mx-0 my-[10px]">
      <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-2 sm:gap-3">
        <Button
          className="bg-success hover:bg-success/90 h-8 xs:h-9 w-[200] xs:w-auto whitespace-nowrap text-[10px] xs:text-xs sm:text-sm"
          onClick={() => setNewIncomeOpen(true)}
        >
          <Plus className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          Nuevo ingreso
        </Button>

        <NewIncomeDialog
          open={newIncomeOpen}
          onOpenChange={setNewIncomeOpen}
          onAddIncome={handleAddIncome}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {/* Gráfica de ingresos por categoría */}
        <div className="h-[280px] xs:h-[320px] sm:h-[350px]">
          <IncomeCategoryChart
            dateRange={dateRange}
            formatCurrency={formatCurrency}
            onSelectCategory={(category) => setSelectedCategory(category)}
          />
        </div>

        {/* Gráfica de ingresos mensuales */}
        <div className="h-[280px] xs:h-[320px] sm:h-[350px]">
          <IncomeBarChart
            timeFilter={timeFilter}
            dateRange={dateRange}
            formatCurrency={formatCurrency}
          />
        </div>
      </div>

      {/* Gráfico de línea para ingresos */}
      <div className="h-[280px] xs:h-[320px] sm:h-[350px]">
        <IncomeLineChart
          viewMode={viewModeLocal}
          selectedMonth={localSelectedMonth}
          activeTab={activeTab || "income"}
          dateRange={dateRange}
        />
      </div>

      <Card>
        <CardContent className="pt-4 sm:pt-6">
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-semibold mb-2">
              Estadísticas
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <IncomeSummaryStats formatCurrency={formatCurrency} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <h3 className="text-base sm:text-lg font-semibold">
              Historial de ingresos
            </h3>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <Input
                  type="search"
                  placeholder="Buscar ingresos..."
                  className="w-full sm:w-[250px] h-9 text-xs sm:text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportPDF}
                  className="h-9 text-xs"
                >
                  <Download className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  PDF
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportExcel}
                  className="h-9 text-xs"
                >
                  <Download className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Excel
                </Button>
              </div>
            </div>
          </div>

          <IncomeTable
            categoryFilter={categoryFilter}
            searchQuery={searchQuery}
            formatCurrency={formatCurrency}
            onExportPDF={handleExportPDF}
            onExportExcel={handleExportExcel}
            onShare={handleShare}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default IncomeTab;
