import { useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Banknote,
  PiggyBank,
  ShoppingCart,
  TrendingDown,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { useInvestments } from "@/hooks/useInvestments";
import type { Investment, InvestmentAction } from "@/types/wallbit";

const ACTION_ICON: Record<InvestmentAction, React.ReactNode> = {
  BUY: <ShoppingCart className="h-3.5 w-3.5" />,
  SELL: <TrendingDown className="h-3.5 w-3.5" />,
  DEPOSIT: <PiggyBank className="h-3.5 w-3.5" />,
  WITHDRAW: <Banknote className="h-3.5 w-3.5" />,
};

const ACTION_COLOR: Record<InvestmentAction, string> = {
  BUY: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  SELL: "bg-red-500/20 text-red-400 border-red-500/30",
  DEPOSIT: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
  WITHDRAW: "bg-amber-500/20 text-amber-400 border-amber-500/30",
};

const ACTION_LABEL: Record<InvestmentAction, string> = {
  BUY: "Compra",
  SELL: "Venta",
  DEPOSIT: "Depósito",
  WITHDRAW: "Retiro",
};

const formatUsd = (value: string) => {
  const n = parseFloat(value || "0");
  if (!Number.isFinite(n)) return "$0.00";
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
};

const formatDate = (value: string) =>
  new Date(value).toLocaleString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const FILTER_OPTIONS: Array<{ value: "ALL" | InvestmentAction; label: string }> = [
  { value: "ALL", label: "Todas" },
  { value: "BUY", label: "Compras" },
  { value: "SELL", label: "Ventas" },
  { value: "DEPOSIT", label: "Depósitos" },
  { value: "WITHDRAW", label: "Retiros" },
];

const TradeHistory = () => {
  const [filter, setFilter] = useState<"ALL" | InvestmentAction>("ALL");
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useInvestments({
    action: filter === "ALL" ? undefined : filter,
    page,
    page_size: 20,
  });

  const items: Investment[] = data?.results ?? [];
  const total = data?.count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / 20));

  return (
    <Card className="glass-card">
      <CardHeader className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <CardTitle className="text-base">Historial de inversiones</CardTitle>
          <CardDescription className="text-xs">
            Trades, depósitos y retiros · {total} en total
          </CardDescription>
        </div>
        <ToggleGroup
          type="single"
          value={filter}
          onValueChange={(v) => {
            if (!v) return;
            setFilter(v as "ALL" | InvestmentAction);
            setPage(1);
          }}
          size="sm"
        >
          {FILTER_OPTIONS.map((opt) => (
            <ToggleGroupItem
              key={opt.value}
              value={opt.value}
              className="h-7 px-2 text-xs"
            >
              {opt.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </CardHeader>
      <CardContent className="space-y-3">
        {isLoading ? (
          <div className="space-y-2">
            {[0, 1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        ) : error ? (
          <p className="text-sm text-red-400">No se pudo cargar el historial.</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">
            No hay operaciones para este filtro.
          </p>
        ) : (
          <ul className="divide-y divide-border/40">
            {items.map((inv) => (
              <li
                key={inv.id}
                className="py-3 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Badge
                    variant="outline"
                    className={`flex items-center gap-1 ${ACTION_COLOR[inv.action]}`}
                  >
                    {ACTION_ICON[inv.action]}
                    {ACTION_LABEL[inv.action]}
                  </Badge>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">
                      {inv.symbol ||
                        inv.chest_category ||
                        inv.kind.replace("_", " ")}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {formatDate(inv.created_at)} · {inv.kind}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="text-right">
                    <p className="text-sm font-semibold tabular-nums">
                      {formatUsd(inv.amount_usd)}
                    </p>
                    {inv.shares && parseFloat(inv.shares) !== 0 && (
                      <p className="text-[11px] text-muted-foreground tabular-nums">
                        {parseFloat(inv.shares).toFixed(4)} shares
                      </p>
                    )}
                  </div>
                  {inv.action === "BUY" || inv.action === "DEPOSIT" ? (
                    <ArrowUpRight className="h-4 w-4 text-emerald-400 shrink-0" />
                  ) : (
                    <ArrowDownLeft className="h-4 w-4 text-amber-400 shrink-0" />
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
            <span>
              Página {page} de {totalPages}
            </span>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Siguiente
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TradeHistory;
