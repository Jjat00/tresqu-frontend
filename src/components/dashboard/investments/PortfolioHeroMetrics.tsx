import { ArrowDownRight, ArrowUpRight, Loader2, TrendingUp, Wallet } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { usePortfolioSummary } from "@/hooks/useInvestments";

const formatUsd = (value: string | number) => {
  const n = typeof value === "string" ? parseFloat(value) : value;
  if (!Number.isFinite(n)) return "$0.00";
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
};

const formatPct = (value: number) => {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
};

const PortfolioHeroMetrics = () => {
  const { data, isLoading, error } = usePortfolioSummary();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-28 rounded-xl" />
        ))}
      </div>
    );
  }

  if (error || !data) {
    return (
      <Card className="glass-card">
        <CardContent className="py-6 text-sm text-muted-foreground">
          No se pudieron cargar las métricas del portfolio.
        </CardContent>
      </Card>
    );
  }

  const pnl = parseFloat(data.pnl_usd || "0");
  const isPositive = pnl >= 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <Card className="glass-card">
        <CardContent className="p-4 space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Capital invertido
            </p>
            <Wallet className="h-4 w-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-bold">
            {formatUsd(data.net_invested_usd)}
          </p>
          <p className="text-xs text-muted-foreground">
            Bruto {formatUsd(data.total_invested_usd)} · Retirado{" "}
            {formatUsd(data.total_withdrawn_usd)}
          </p>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardContent className="p-4 space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Valor actual
            </p>
            <TrendingUp className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold">
            {formatUsd(data.current_value_usd)}
          </p>
          <p className="text-xs text-muted-foreground">
            {data.holdings_count} posición
            {data.holdings_count === 1 ? "" : "es"} · Live de Wallbit
          </p>
        </CardContent>
      </Card>

      <Card
        className={`glass-card ${
          isPositive ? "ring-1 ring-emerald-500/30" : "ring-1 ring-red-500/30"
        }`}
      >
        <CardContent className="p-4 space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Ganancia / pérdida
            </p>
            {isPositive ? (
              <ArrowUpRight className="h-4 w-4 text-emerald-400" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-red-400" />
            )}
          </div>
          <p
            className={`text-2xl font-bold ${
              isPositive ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {isPositive ? "+" : ""}
            {formatUsd(data.pnl_usd)}
          </p>
          <p
            className={`text-xs ${
              isPositive ? "text-emerald-400/80" : "text-red-400/80"
            }`}
          >
            {formatPct(data.pnl_pct)} vs capital invertido
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioHeroMetrics;
