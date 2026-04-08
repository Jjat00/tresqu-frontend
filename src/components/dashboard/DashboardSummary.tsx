import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
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

  const totalIncome = summaryData?.summary?.reduce(
    (total, item) => total + item.total,
    0
  ) ?? 0;

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
      <div className="grid grid-cols-3 gap-2 sm:gap-4 animate-fade-up">
        {[0, 1, 2].map((i) => (
          <Card key={i} className="glass-card">
            <CardContent className="p-3 sm:p-4">
              <Skeleton className="h-3 w-16 mb-2" />
              <Skeleton className="h-6 w-24 mb-1" />
              <Skeleton className="h-3 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const cards = [
    {
      label: "Ingresos",
      amount: totalIncome,
      icon: TrendingUpIcon,
      iconColor: "text-success",
      amountColor: "text-success",
      bgAccent: "bg-success/10",
    },
    {
      label: "Gastos",
      amount: totalExpenses,
      icon: TrendingDownIcon,
      iconColor: "text-rose-500",
      amountColor: "text-rose-500",
      bgAccent: "bg-rose-500/10",
    },
    {
      label: "Balance",
      amount: balance,
      icon: ScaleIcon,
      iconColor: isPositive ? "text-success" : "text-rose-500",
      amountColor: isPositive ? "text-success" : "text-rose-500",
      bgAccent: isPositive ? "bg-success/10" : "bg-rose-500/10",
      prefix: isPositive ? "+" : "-",
      indicator: isPositive ? ArrowUpIcon : ArrowDownIcon,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-4 animate-fade-up">
      {cards.map((card, i) => (
        <Card
          key={card.label}
          className="glass-card"
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wide">
                {card.label}
              </span>
              <div className={`p-1 sm:p-1.5 rounded-md ${card.bgAccent}`}>
                <card.icon className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${card.iconColor}`} />
              </div>
            </div>
            <div className={`text-base sm:text-xl md:text-2xl font-bold ${card.amountColor} tracking-tight`}>
              {card.prefix === "-" ? "-" : ""}
              {formatAmount(card.amount)}
            </div>
            {card.indicator && (
              <div className="flex items-center gap-1 mt-0.5">
                <card.indicator className={`h-3 w-3 ${card.iconColor}`} />
                <span className={`text-[10px] sm:text-xs ${card.iconColor}`}>
                  {isPositive ? "Superávit" : "Déficit"}
                </span>
              </div>
            )}
            {!card.indicator && (
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">
                Este período
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardSummary;
