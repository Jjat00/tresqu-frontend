import { Skeleton } from "@/components/ui/skeleton";
import {
  TrendingDownIcon,
  TrendingUpIcon,
  ScaleIcon,
} from "lucide-react";
import { useCategoryPieChartData } from "@/hooks/useCategoryPieChartData";
import { useIncomeSummary } from "@/hooks/useIncomeSummary";
import {
  sortedCurrencyTotals,
  type CurrencyTotals,
} from "@/hooks/useExpensesMonthSummary";
import { DateRange } from "./DateRangePicker";

interface DashboardSummaryProps {
  dateRange: DateRange;
}

const formatAmount = (amount: number) =>
  "$" +
  Math.abs(amount).toLocaleString("es-ES", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

const DashboardSummary = ({ dateRange }: DashboardSummaryProps) => {
  // Gastos: total REAL del rango por moneda (no los 10 recientes).
  const { totalsByCurrency: expenseTotals, isLoading: isExpensesLoading } =
    useCategoryPieChartData(dateRange);

  // Ingresos: sigue el mismo filtro de fecha global que los gastos.
  const { data: summaryData, isLoading: isIncomeLoading } = useIncomeSummary(
    { period: "month" },
    dateRange
  );

  const isLoading = isExpensesLoading || isIncomeLoading;

  const incomeTotals: CurrencyTotals = (summaryData?.summary ?? []).reduce<
    CurrencyTotals
  >((totals, item) => {
    const currency = item.currency || "COP";
    totals[currency] = (totals[currency] ?? 0) + item.total;
    return totals;
  }, {});

  // Balance por moneda: ingresos[moneda] − gastos[moneda].
  const balanceTotals: CurrencyTotals = {};
  for (const currency of new Set([
    ...Object.keys(incomeTotals),
    ...Object.keys(expenseTotals),
  ])) {
    balanceTotals[currency] =
      (incomeTotals[currency] ?? 0) - (expenseTotals[currency] ?? 0);
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 animate-fade-up">
        {[0, 1, 2].map((i) => (
          <div key={i} className="glass-card p-4 sm:p-5">
            <Skeleton className="h-3 w-14 mb-3 rounded-full" />
            <Skeleton className="h-7 w-28 mb-2" />
            <Skeleton className="h-3 w-20 rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  const cards = [
    {
      label: "Ingresos",
      totals: incomeTotals,
      icon: TrendingUpIcon,
      iconColor: "text-emerald-400",
      amountColor: "text-emerald-400",
      dotColor: "bg-emerald-400",
      signByValue: false,
      caption: "Según el filtro de fecha",
    },
    {
      label: "Gastos",
      totals: expenseTotals,
      icon: TrendingDownIcon,
      iconColor: "text-rose-400",
      amountColor: "text-rose-400",
      dotColor: "bg-rose-400",
      signByValue: false,
      caption: "Según el filtro de fecha",
    },
    {
      label: "Balance",
      totals: balanceTotals,
      icon: ScaleIcon,
      iconColor: "text-muted-foreground",
      amountColor: "text-muted-foreground",
      dotColor: "bg-sky-400",
      signByValue: true,
      caption: "Ingresos − Gastos",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 animate-fade-up">
      {cards.map((card) => {
        const entries = sortedCurrencyTotals(card.totals);
        return (
          <div key={card.label} className="glass-card p-4 sm:p-5 min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-1.5 h-1.5 rounded-full ${card.dotColor}`} />
              <span className="text-[11px] sm:text-xs text-muted-foreground font-medium tracking-wide">
                {card.label}
              </span>
            </div>
            <div className="text-lg sm:text-2xl md:text-3xl font-semibold tracking-tight font-display tabular-nums break-words">
              {entries.length === 0 ? (
                <span className={card.amountColor}>$0</span>
              ) : (
                entries.map(([currency, value]) => {
                  // Para el balance, el color y el signo dependen de cada moneda.
                  const lineColor = card.signByValue
                    ? value >= 0
                      ? "text-emerald-400"
                      : "text-rose-400"
                    : card.amountColor;
                  const sign = card.signByValue
                    ? value >= 0
                      ? "+"
                      : "-"
                    : "";
                  return (
                    <div key={currency} className={`leading-tight ${lineColor}`}>
                      {sign}
                      {formatAmount(value)}
                      <span className="ml-1 text-xs sm:text-sm text-muted-foreground font-normal">
                        {currency}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1.5 opacity-60">
              {card.caption}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardSummary;
