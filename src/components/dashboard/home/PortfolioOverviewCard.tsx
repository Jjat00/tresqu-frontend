import { ArrowDownRight, ArrowUpRight, LineChart } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { usePortfolioSummary } from "@/hooks/useInvestments";
import { useWallbitStatus } from "@/hooks/useWallbitStatus";

const fmtUsd = (value: string | number) => {
  const n = typeof value === "string" ? parseFloat(value) : value;
  if (!Number.isFinite(n)) return "$0.00";
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
};

const PortfolioOverviewCard = () => {
  const navigate = useNavigate();
  const { data: status, isLoading: statusLoading } = useWallbitStatus();
  const connected = !!status?.connected;
  const { data: summary, isLoading: summaryLoading } = usePortfolioSummary();

  if (statusLoading) {
    return <Skeleton className="h-28 w-full" />;
  }

  if (!connected) {
    return (
      <div className="glass-card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-up">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-wallbit/15 flex items-center justify-center">
            <LineChart className="h-4 w-4 text-wallbit" />
          </div>
          <div>
            <p className="text-sm font-medium">Conectá Wallbit</p>
            <p className="text-[11px] text-muted-foreground">
              Ve tu portfolio en vivo desde Tresqu.
            </p>
          </div>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="glass"
          onClick={() => navigate("/dashboard/account?tab=integraciones")}
        >
          Conectar
        </Button>
      </div>
    );
  }

  if (summaryLoading || !summary) {
    return <Skeleton className="h-28 w-full" />;
  }

  const pnl = parseFloat(summary.pnl_usd || "0");
  const isUp = pnl >= 0;

  return (
    <button
      type="button"
      onClick={() => navigate("/dashboard/investments")}
      className="w-full text-left glass-card p-4 sm:p-5 animate-fade-up hover:bg-muted/30 transition-colors"
      aria-label="Ir a Inversiones"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-wallbit" />
          <span className="text-[11px] sm:text-xs text-muted-foreground font-medium tracking-wide">
            Portfolio Wallbit
          </span>
        </div>
        <span className="text-[10px] text-muted-foreground">
          {summary.holdings_count} posiciones
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        <div className="min-w-0">
          <p className="text-[10px] text-muted-foreground mb-1">Invertido</p>
          <p className="text-sm sm:text-base font-semibold tabular-nums truncate">
            {fmtUsd(summary.net_invested_usd)}
          </p>
        </div>
        <div className="min-w-0">
          <p className="text-[10px] text-muted-foreground mb-1">Valor actual</p>
          <p className="text-sm sm:text-base font-semibold tabular-nums truncate">
            {fmtUsd(summary.current_value_usd)}
          </p>
        </div>
        <div className="min-w-0">
          <p className="text-[10px] text-muted-foreground mb-1">P&amp;L</p>
          <div
            className={`flex items-center gap-1 min-w-0 ${
              isUp ? "text-emerald-400" : "text-rose-400"
            }`}
          >
            {isUp ? (
              <ArrowUpRight className="h-3 w-3 shrink-0" />
            ) : (
              <ArrowDownRight className="h-3 w-3 shrink-0" />
            )}
            <span className="text-sm sm:text-base font-semibold tabular-nums truncate">
              {fmtUsd(pnl)}
            </span>
            <span className="text-[10px] opacity-70 shrink-0">
              ({summary.pnl_pct.toFixed(1)}%)
            </span>
          </div>
        </div>
      </div>
    </button>
  );
};

export default PortfolioOverviewCard;
