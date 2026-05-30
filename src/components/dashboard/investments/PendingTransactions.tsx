import { Clock } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePortfolioSummary } from "@/hooks/useInvestments";
import type { PendingTrade } from "@/types/wallbit";

const formatUsd = (value: string) => {
  const n = parseFloat(value || "0");
  if (!Number.isFinite(n)) return "$0.00";
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
};

const formatShares = (value: string | null) => {
  if (!value) return null;
  const n = parseFloat(value);
  if (!Number.isFinite(n) || n === 0) return null;
  return n.toLocaleString("en-US", { maximumFractionDigits: 8 });
};

const ACTION_LABEL: Record<string, string> = {
  BUY: "Compra",
  SELL: "Venta",
};

/**
 * "Transacciones pendientes": trades colocados que todavía NO liquidaron en
 * Wallbit. Se muestran aparte porque aún no debitaron efectivo ni son una
 * posición viva — por eso NO cuentan en "capital invertido" ni en el P&L. Solo
 * aparece la tarjeta si hay pendientes.
 */
const PendingTransactions = () => {
  const { data } = usePortfolioSummary();
  const pending: PendingTrade[] = data?.pending_trades ?? [];

  if (pending.length === 0) return null;

  return (
    <Card className="glass-card border-amber-500/30">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2 text-amber-400">
          <Clock className="h-4 w-4" />
          Transacciones pendientes
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Procesándose en Wallbit. Todavía no afectan tu capital invertido ni tu
          ganancia/pérdida.
        </p>
      </CardHeader>
      <CardContent>
        <ul className="divide-y divide-border/40">
          {pending.map((t, i) => {
            const shares = formatShares(t.shares);
            return (
              <li
                key={`${t.symbol}-${t.executed_at ?? i}`}
                className="py-2.5 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/15 px-2 py-0.5 text-[11px] font-medium text-amber-400">
                    <Clock className="h-3 w-3" />
                    {ACTION_LABEL[t.action] ?? t.action}
                  </span>
                  <span className="text-sm font-medium truncate">{t.symbol}</span>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold tabular-nums">
                    {t.action === "BUY" ? "−" : "+"}
                    {formatUsd(t.amount_usd)}
                  </p>
                  {shares && (
                    <p className="text-[11px] text-muted-foreground tabular-nums">
                      {t.action === "BUY" ? "+" : "−"}
                      {shares} {t.symbol}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};

export default PendingTransactions;
