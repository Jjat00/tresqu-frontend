import {
  ArrowDownRight,
  ArrowUpRight,
  Banknote,
  Coins,
  PiggyBank,
  TrendingUp,
  Wallet,
} from "lucide-react";

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

  const mainAccountUsd = (data.cash ?? [])
    .filter((c) => c.currency === "USD")
    .reduce((sum, c) => sum + parseFloat(c.amount || "0"), 0);
  const investmentFreeUsd = parseFloat(data.investment_cash_usd || "0");
  const roboNet = parseFloat(data.robo_net_contributed_usd || "0");
  const showSecondary =
    investmentFreeUsd > 0 || mainAccountUsd > 0 || roboNet > 0;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <Card className="glass-card">
        <CardContent className="p-4 space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Capital invertido
            </p>
            <Wallet className="h-4 w-4 text-wallbit" />
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

      {showSecondary && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Card className="glass-card">
            <CardContent className="p-4 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Libre para invertir
                </p>
                <Coins className="h-4 w-4 text-wallbit" />
              </div>
              <p className="text-2xl font-bold">
                {formatUsd(investmentFreeUsd)}
              </p>
              <p className="text-xs text-muted-foreground">
                Efectivo sin invertir en tu cuenta de inversiones
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-4 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Cuenta principal
                </p>
                <Banknote className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold">{formatUsd(mainAccountUsd)}</p>
              <p className="text-xs text-muted-foreground">
                Efectivo fuera de la cuenta de inversiones
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-4 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Robo Advisor
                </p>
                <PiggyBank className="h-4 w-4 text-emerald-400" />
              </div>
              <p className="text-2xl font-bold">{formatUsd(roboNet)}</p>
              <p className="text-xs text-muted-foreground">
                Aportado neto · Wallbit no expone su valor ni P&amp;L
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PortfolioHeroMetrics;
