import { useState } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useHoldings } from "@/hooks/useInvestments";
import type { Holding } from "@/types/wallbit";

import AssetLogo from "./AssetLogo";
import HoldingDetailModal from "./HoldingDetailModal";

const fmt = (value: string | number, opts: Intl.NumberFormatOptions = {}) => {
  const n = typeof value === "string" ? parseFloat(value) : value;
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
    ...opts,
  });
};

// Ganancias de centavos hacia un lado u otro son ruido: sin esto una posición
// recién comprada salía como "↗ +-$0.00 (-0.0%)".
const cleanPnl = (value: string | number) => {
  const n = typeof value === "string" ? parseFloat(value) : value;
  if (!Number.isFinite(n)) return 0;
  return Math.abs(n) < 0.005 ? 0 : n;
};

const fmtShares = (value: string | number) => {
  const n = typeof value === "string" ? parseFloat(value) : value;
  if (!Number.isFinite(n)) return "—";
  // Acciones fraccionadas: cada decimal cuenta (0,02598 NO es 0,026). No
  // rellenamos con ceros, pero nunca truncamos la precisión que da Wallbit.
  return n.toLocaleString("en-US", { maximumFractionDigits: 8 });
};

const HoldingsTable = () => {
  const { data, isLoading, error } = useHoldings();
  const [selected, setSelected] = useState<Holding | null>(null);

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-base">Posiciones actuales</CardTitle>
        <CardDescription className="text-xs">
          Precios en vivo desde Wallbit · refresca cada 60s.{" "}
          <span className="text-foreground/70">Invertido</span> es lo que pagaste
          por la posición y <span className="text-foreground/70">Valor hoy</span>{" "}
          lo que vale ahora; la diferencia es tu ganancia o pérdida.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0 sm:px-2">
        {isLoading ? (
          <div className="space-y-2 px-4">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : error || !data || data.length === 0 ? (
          <p className="text-sm text-muted-foreground px-6 py-4">
            No tenés posiciones abiertas. Cuando hagas tu primera compra desde
            Tresqu o desde Wallbit, va a aparecer aquí.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Activo</TableHead>
                  <TableHead className="text-right hidden sm:table-cell">Acciones</TableHead>
                  <TableHead className="text-right hidden md:table-cell">Precio compra</TableHead>
                  <TableHead className="text-right hidden md:table-cell">Precio hoy</TableHead>
                  <TableHead className="text-right">Invertido</TableHead>
                  <TableHead className="text-right">Valor hoy</TableHead>
                  <TableHead className="text-right">Ganancia / Pérdida</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((h) => {
                  const pnl = cleanPnl(h.pnl_usd || "0");
                  const pct = cleanPnl(h.pnl_pct);
                  const isUp = pnl >= 0;
                  return (
                    <TableRow
                      key={h.symbol}
                      role="button"
                      tabIndex={0}
                      aria-label={`Ver detalle de ${h.symbol}`}
                      onClick={() => setSelected(h)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelected(h);
                        }
                      }}
                      className="cursor-pointer transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                    >
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <AssetLogo symbol={h.symbol} size={28} />
                          <div className="flex flex-col">
                            <span className="font-semibold">{h.symbol}</span>
                            {h.name && (
                              <span className="text-[10px] text-muted-foreground truncate max-w-[140px]">
                                {h.name}
                              </span>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right tabular-nums hidden sm:table-cell">
                        {fmtShares(h.shares)}
                      </TableCell>
                      <TableCell className="text-right tabular-nums hidden md:table-cell">
                        {h.cost_pending ? (
                          <span className="text-[10px] text-muted-foreground">
                            sincronizando…
                          </span>
                        ) : (
                          fmt(h.avg_cost)
                        )}
                      </TableCell>
                      <TableCell className="text-right tabular-nums hidden md:table-cell">
                        {fmt(h.current_price)}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {h.cost_pending ? (
                          <span
                            className="text-[10px] text-muted-foreground"
                            title="El costo real de esta compra todavía se está sincronizando desde Wallbit"
                          >
                            sincronizando…
                          </span>
                        ) : (
                          fmt(h.cost_basis)
                        )}
                      </TableCell>
                      <TableCell className="text-right font-medium tabular-nums">
                        {fmt(h.market_value)}
                      </TableCell>
                      <TableCell
                        className={`text-right font-medium tabular-nums ${
                          h.cost_pending
                            ? "text-muted-foreground"
                            : isUp
                            ? "text-emerald-400"
                            : "text-red-400"
                        }`}
                      >
                        {h.cost_pending ? (
                          <span title="Costo sincronizándose desde Wallbit">—</span>
                        ) : (
                          <div className="flex items-center justify-end gap-1">
                            {isUp ? (
                              <ArrowUpRight className="h-3 w-3" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3" />
                            )}
                            <span>
                              {pnl > 0 ? "+" : ""}
                              {fmt(pnl)}
                            </span>
                            <span className="text-[10px] opacity-70">
                              ({pct.toFixed(1)}%)
                            </span>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>

      <HoldingDetailModal holding={selected} onClose={() => setSelected(null)} />
    </Card>
  );
};

export default HoldingsTable;
