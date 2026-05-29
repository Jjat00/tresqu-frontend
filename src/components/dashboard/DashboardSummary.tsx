import { Skeleton } from "@/components/ui/skeleton";
import {
  TrendingDownIcon,
  TrendingUpIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ScaleIcon,
} from "lucide-react";
import { useCategoryPieChartData } from "@/hooks/useCategoryPieChartData";
import { useIncomeSummary } from "@/hooks/useIncomeSummary";
import { DateRange } from "./DateRangePicker";

interface DashboardSummaryProps {
  dateRange: DateRange;
}

const DashboardSummary = ({ dateRange }: DashboardSummaryProps) => {
  const { totalAmount: totalExpenses, isLoading: isExpensesLoading } =
    useCategoryPieChartData(dateRange);

  const { data: summaryData, isLoading: isIncomeLoading } = useIncomeSummary({
    period: "month",
  });

  const totalIncome =
    summaryData?.summary?.reduce((total, item) => total + item.total, 0) ?? 0;

  const balance = totalIncome - totalExpenses;
  const isPositive = balance >= 0;
  const isLoading = isExpensesLoading || isIncomeLoading;

  const formatAmount = (amount: number) =>
    "$" +
    Math.abs(amount).toLocaleString("es-ES", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 sm:gap-4 animate-fade-up">
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
      amount: totalIncome,
      icon: TrendingUpIcon,
      iconColor: "text-emerald-400",
      amountColor: "text-emerald-400",
      dotColor: "bg-emerald-400",
    },
    {
      label: "Gastos",
      amount: totalExpenses,
      icon: TrendingDownIcon,
      iconColor: "text-rose-400",
      amountColor: "text-rose-400",
      dotColor: "bg-rose-400",
    },
    {
      label: "Balance",
      amount: balance,
      icon: ScaleIcon,
      iconColor: isPositive ? "text-emerald-400" : "text-rose-400",
      amountColor: isPositive ? "text-emerald-400" : "text-rose-400",
      dotColor: isPositive ? "bg-emerald-400" : "bg-rose-400",
      prefix: isPositive ? "+" : "-",
      indicator: isPositive ? ArrowUpIcon : ArrowDownIcon,
    },
  ];

  return (
    <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 sm:gap-4 animate-fade-up">
      {cards.map((card) => (
        <div key={card.label} className="glass-card p-4 sm:p-5 min-w-0">
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-1.5 h-1.5 rounded-full ${card.dotColor}`} />
            <span className="text-[11px] sm:text-xs text-muted-foreground font-medium tracking-wide">
              {card.label}
            </span>
          </div>
          <div
            className={`text-lg sm:text-2xl md:text-3xl font-semibold ${card.amountColor} tracking-tight font-display tabular-nums break-words`}
          >
            {card.prefix === "-" ? "-" : ""}
            {formatAmount(card.amount)}
          </div>
          {card.indicator ? (
            <div className="flex items-center gap-1 mt-1.5">
              <card.indicator className={`h-3 w-3 ${card.iconColor}`} />
              <span className={`text-[10px] sm:text-xs ${card.iconColor} opacity-80`}>
                {isPositive ? "Superávit" : "Déficit"}
              </span>
            </div>
          ) : (
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1.5 opacity-60">
              Este período
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default DashboardSummary;
