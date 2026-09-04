import { useState, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useIncomeSummary } from "@/hooks/useIncomeSummary";
import { useIncomeLineData } from "@/hooks/useIncomeLineData";
import { useIncomeBarData } from "@/hooks/useIncomeBarData";
import { useIncomePieChart } from "@/hooks/useIncomePieChart";
import { Input } from "@/components/ui/input";
import { DateRange } from "./DateRangePicker";
import {
  CurrencyTotals,
  formatAmountWithCurrency,
  formatCurrencyTotals,
  sortedCurrencyTotals,
} from "@/utils/currency";

// Import refactored components
import IncomeLineChart from "./income/IncomeLineChart";
import IncomeCategoryChart from "./income/IncomeCategoryChart";
import IncomeBarChart from "./income/IncomeBarChart";
import IncomeSummaryStats from "./income/IncomeSummaryStats";
import IncomeTable from "./income/IncomeTable";

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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewModeLocal, setViewModeLocal] = useState<
    "day" | "week" | "month" | "year"
  >(viewMode);
  const [localSelectedMonth, setLocalSelectedMonth] = useState(selectedMonth);
  const [period, setPeriod] = useState<"week" | "month" | "year" | "all">(
    "month"
  );

  // Resumen de ingresos para los KPIs: sigue el filtro de fecha global
  // (dateRange). La tabla de ingresos usa su propio filtro por separado.
  const { data: summaryData, isLoading: isSummaryLoading } = useIncomeSummary(
    { period },
    dateRange
  );
  const { isLoading: isLineLoading } = useIncomeLineData(dateRange, viewMode);
  const { isLoading: isBarLoading } = useIncomeBarData();
  const { data: pieData, isLoading: isPieLoading } = useIncomePieChart();

  // Totales del período separados por moneda: cada fila del resumen trae su
  // propia moneda, así que sumarlas todas juntas daría un número falso.
  const totalsByCurrency = useMemo<CurrencyTotals>(() => {
    return (summaryData?.summary ?? []).reduce<CurrencyTotals>((totals, item) => {
      const currency = item.currency || "COP";
      totals[currency] = (totals[currency] ?? 0) + item.total;
      return totals;
    }, {});
  }, [summaryData]);

  // Sincroniza el estado local editable cuando cambia la prop selectedMonth.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync intencional de prop a estado local
    setLocalSelectedMonth(selectedMonth);
    // If year is selected, update view mode
    if (selectedMonth === "year") {
      setViewModeLocal("year");
    }
  }, [selectedMonth]);

  // Las gráficas siguen recibiendo un formateador en COP para sus ejes y
  // tooltips; los importes con moneda propia usan formatAmountWithCurrency.
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

  // Promedio diario por moneda: se divide cada moneda entre los días del
  // período, nunca se mezclan monedas en una sola cifra.
  const dailyAverageByCurrency = useMemo<CurrencyTotals>(() => {
    if (!dateRange?.from || !dateRange?.to) return {};

    const startDate = new Date(dateRange.from);
    const endDate = new Date(dateRange.to);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    const days =
      Math.floor(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      ) + 1;
    if (days <= 0) return {};

    return Object.fromEntries(
      Object.entries(totalsByCurrency).map(([currency, total]) => [
        currency,
        total / days,
      ])
    );
  }, [totalsByCurrency, dateRange]);

  const dailyAverageEntries = useMemo(
    () => sortedCurrencyTotals(dailyAverageByCurrency),
    [dailyAverageByCurrency]
  );

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
    <div className="space-y-3 md:space-y-4 flex flex-col relative">

      {/* KPIs Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <div className="glass-card p-4 sm:p-5 animate-fade-up">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00FF7F]" />
            <span className="text-[11px] sm:text-xs text-muted-foreground font-medium tracking-wide">Total ingresos</span>
          </div>
          <div className="text-lg sm:text-2xl font-semibold text-[#00FF7F] tracking-tight font-display tabular-nums break-words">
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
            {isSummaryLoading ? "Cargando..." : "En el período seleccionado"}
          </p>
        </div>

        <div className="glass-card p-4 sm:p-5 animate-fade-up" style={{ animationDelay: "0.05s" }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#22d3ee]" />
            <span className="text-[11px] sm:text-xs text-muted-foreground font-medium tracking-wide">Promedio Diario</span>
          </div>
          <div className="text-lg sm:text-2xl font-semibold text-[#22d3ee] tracking-tight font-display tabular-nums break-words">
            {dailyAverageEntries.length === 0 ? (
              <span>$0</span>
            ) : (
              dailyAverageEntries.map(([currency, value]) => (
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
            {isSummaryLoading ? "Cargando..." : "Promedio por día"}
          </p>
        </div>

        <div className="glass-card p-4 sm:p-5 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#b388ff]" />
            <span className="text-[11px] sm:text-xs text-muted-foreground font-medium tracking-wide">Categoría Principal</span>
          </div>
          <div className="text-lg sm:text-2xl font-semibold text-[#b388ff] tracking-tight font-display truncate">
            {getMainCategory().name}
          </div>
          <p className="text-[10px] sm:text-xs text-muted-foreground mt-1.5 opacity-60">
            {isPieLoading ? "Cargando..." : `${getMainCategory().percentage}% del ingreso total`}
          </p>
        </div>

        <div className="glass-card p-4 sm:p-5 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FFD60A]" />
            <span className="text-[11px] sm:text-xs text-muted-foreground font-medium tracking-wide">Registros</span>
          </div>
          <div className="text-lg sm:text-2xl font-semibold text-[#FFD60A] tracking-tight font-display">
            {getIncomeCount().toLocaleString("es-ES")}
          </div>
          <p className="text-[10px] sm:text-xs text-muted-foreground mt-1.5 opacity-60">
            {isSummaryLoading ? "Cargando..." : "Ingresos registrados"}
          </p>
        </div>
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
            </div>
          </div>

          <IncomeTable
            categoryFilter={categoryFilter}
            searchQuery={searchQuery}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default IncomeTab;
