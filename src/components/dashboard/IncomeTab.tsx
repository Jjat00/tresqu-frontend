import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as XLSX from "xlsx";
import { toast } from "sonner";
import { useIncomeSummary } from "@/hooks/useIncomeSummary";
import { useIncomeLineData } from "@/hooks/useIncomeLineData";
import { useIncomeBarData } from "@/hooks/useIncomeBarData";
import { useIncomePieChart } from "@/hooks/useIncomePieChart";
import {
  IncomeSummaryItem,
  IncomeTableItem,
  DonutChartData,
} from "@/types/incomes";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Download,
  TrendingUpIcon,
  WalletIcon,
  CalendarIcon,
  TagIcon,
} from "lucide-react";
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
  const [period, setPeriod] = useState<"week" | "month" | "year" | "all">(
    "month"
  );

  // Obtener datos del resumen de ingresos
  const { data: summaryData, isLoading: isSummaryLoading } = useIncomeSummary({
    period,
  });
  const { isLoading: isLineLoading } = useIncomeLineData(dateRange, viewMode);
  const { isLoading: isBarLoading } = useIncomeBarData();
  const { data: pieData, isLoading: isPieLoading } = useIncomePieChart();

  // Estado para los datos de la tabla
  const [tableData, setTableData] = useState<IncomeTableItem[]>([]);
  const [filteredIncome, setFilteredIncome] = useState<IncomeTableItem[]>([]);

  // Transformar los datos del resumen cuando se reciben
  useEffect(() => {
    if (summaryData && summaryData.summary) {
      const transformedData = summaryData.summary.map(
        (item: IncomeSummaryItem, index: number) => ({
          id: index + 1,
          description: `Ingreso por ${item.category__name || "Sin categoría"}`,
          category: item.category__name || "Sin categoría",
          subcategory: "",
          amount: item.total,
          date: new Date().toISOString().split("T")[0],
        })
      );
      setTableData(transformedData);
    }
  }, [summaryData]);

  // Aplicar filtros a los datos
  useEffect(() => {
    if (!tableData.length) {
      setFilteredIncome([]);
      return;
    }

    let filtered = [...tableData];

    // Aplicar filtro de categoría
    if (categoryFilter !== "all") {
      const normalizedCategoryFilter = categoryFilter
        .toLowerCase()
        .replace("salary", "empleo")
        .replace("freelance", "freelance")
        .replace("investments", "inversiones")
        .replace("other", "otros");

      filtered = filtered.filter(
        (income) => income.category.toLowerCase() === normalizedCategoryFilter
      );
    }

    // Aplicar filtro de búsqueda
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (income) =>
          income.description.toLowerCase().includes(query) ||
          income.category.toLowerCase().includes(query) ||
          (income.subcategory &&
            income.subcategory.toLowerCase().includes(query))
      );
    }

    // Ordenar por monto (mayor a menor)
    filtered.sort((a, b) => b.amount - a.amount);
    setFilteredIncome(filtered);
  }, [tableData, categoryFilter, searchQuery]);

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
    if (!filteredIncome || filteredIncome.length === 0) {
      toast.error("No hay datos para exportar");
      return;
    }

    try {
      // Preparar los datos para Excel
      const excelData = filteredIncome.map((income: IncomeTableItem) => ({
        Descripción: income.description || "Sin descripción",
        Categoría: income.category || "Sin categoría",
        Subcategoría: income.subcategory || "-",
        Monto: formatCurrency(income.amount),
        Período:
          period === "week"
            ? "Esta semana"
            : period === "month"
            ? "Este mes"
            : period === "year"
            ? "Este año"
            : "Todo el período",
      }));

      // Crear un nuevo libro de Excel
      const worksheet = XLSX.utils.json_to_sheet(excelData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Ingresos");

      // Generar el archivo Excel
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Crear un enlace de descarga
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `ingresos_${new Date().toISOString().split("T")[0]}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Archivo Excel descargado exitosamente");
    } catch (error) {
      console.error("Error al exportar a Excel:", error);
      toast.error("Error al exportar a Excel");
    }
  };

  const handleShare = () => {
    console.log("Sharing Tresqu");
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

  // Calcular el ingreso total
  const getTotalIncome = () => {
    if (!summaryData?.summary) return 0;
    return summaryData.summary.reduce((total, item) => total + item.total, 0);
  };

  // Calcular el ingreso promedio diario
  const calculateDailyAverage = () => {
    if (!dateRange?.from || !dateRange?.to || !getTotalIncome()) return 0;

    // Si es el mismo día, retornar el total directamente
    if (dateRange.from.toDateString() === dateRange.to.toDateString()) {
      return getTotalIncome();
    }

    const startDate = new Date(dateRange.from);
    const endDate = new Date(dateRange.to);

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    const daysDiff =
      Math.floor(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      ) + 1;

    return Number((getTotalIncome() / daysDiff).toFixed(2));
  };

  // Obtener la categoría principal de ingresos
  const getMainCategory = () => {
    if (
      !pieData ||
      !pieData.labels ||
      !pieData.datasets ||
      pieData.labels.length === 0
    ) {
      return { name: "N/A", percentage: 0 };
    }

    // Encontrar el índice del valor más alto
    const data = pieData.datasets[0].data;
    const maxIndex = data.indexOf(Math.max(...data));

    // Obtener el nombre y valor de la categoría principal
    const name = pieData.labels[maxIndex] || "Sin categoría";
    const value = data[maxIndex];

    // Calcular el porcentaje
    const total = data.reduce((sum, val) => sum + val, 0);
    const percentage = total > 0 ? (value / total) * 100 : 0;

    return {
      name,
      percentage: percentage.toFixed(1),
    };
  };

  // Calcular el número de ingresos
  const getIncomeCount = () => {
    if (!summaryData?.summary) return 0;
    return summaryData.summary.length;
  };

  return (
    <div className="space-y-3 md:space-y-4 sm:px-2 md:px-4 flex flex-col px-0 mx-0 my-[10px] relative">
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

      <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-2 sm:gap-3">
        <Button
          className="bg-success hover:bg-success/90 h-8 xs:h-9 w-[200] xs:w-auto whitespace-nowrap text-[10px] xs:text-xs sm:text-sm animate-fade-up"
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

      {/* KPIs Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-card animate-fade-up">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium gradient-text">
              Ingreso Total
            </CardTitle>
            <WalletIcon className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              $
              {getTotalIncome().toLocaleString("es-ES", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <p className="text-xs text-muted-foreground mt-auto">
              {isSummaryLoading ? "Cargando..." : "Ingresos del período"}
            </p>
          </CardContent>
        </Card>

        <Card
          className="glass-card animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium gradient-text-cyan">
              Ingreso Promedio Diario
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
              {isSummaryLoading ? "Cargando..." : "Promedio por día"}
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
                : `${getMainCategory().percentage}% del ingreso total`}
            </p>
          </CardContent>
        </Card>

        <Card
          className="glass-card animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium gradient-text">
              Número de Ingresos
            </CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {getIncomeCount().toLocaleString("es-ES")}
            </div>
            <p className="text-xs text-muted-foreground mt-auto">
              {isSummaryLoading ? "Cargando..." : "Ingresos registrados"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {/* Gráfica de ingresos por categoría */}
        <div
          className="h-[280px] xs:h-[320px] sm:h-[350px] glass-card animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          <IncomeCategoryChart
            dateRange={dateRange}
            formatCurrency={formatCurrency}
            onSelectCategory={(category) => setSelectedCategory(category)}
          />
        </div>

        {/* Gráfica de ingresos mensuales */}
        <div
          className="h-[280px] xs:h-[320px] sm:h-[350px] glass-card animate-fade-up"
          style={{ animationDelay: "0.5s" }}
        >
          <IncomeBarChart
            timeFilter={timeFilter}
            dateRange={dateRange}
            formatCurrency={formatCurrency}
          />
        </div>
      </div>

      {/* Gráfico de línea para ingresos */}
      <div
        className="h-[280px] xs:h-[320px] sm:h-[350px] glass-card animate-fade-up"
        style={{ animationDelay: "0.6s" }}
      >
        <IncomeLineChart
          viewMode={viewModeLocal}
          selectedMonth={localSelectedMonth}
          activeTab={activeTab || "income"}
          dateRange={dateRange}
        />
      </div>

      <Card
        className="glass-card animate-fade-up"
        style={{ animationDelay: "0.7s" }}
      >
        <CardContent className="pt-4 sm:pt-6">
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-semibold mb-2 gradient-text">
              Estadísticas
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <IncomeSummaryStats formatCurrency={formatCurrency} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card
        className="glass-card animate-fade-up"
        style={{ animationDelay: "0.8s" }}
      >
        <CardContent className="pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <h3 className="text-base sm:text-lg font-semibold gradient-text">
              Historial de ingresos
            </h3>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <Input
                  type="search"
                  placeholder="Buscar ingresos..."
                  className="w-full sm:w-[250px] h-9 text-xs sm:text-sm glass"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportExcel}
                  className="h-9 text-xs glass"
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
