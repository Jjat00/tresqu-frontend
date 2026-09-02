import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Holding } from "@/types/wallbit";

import StockPriceChart from "./StockPriceChart";

interface HoldingDetailModalProps {
  /** When non-null the modal is open and shows this holding. */
  holding: Holding | null;
  onClose: () => void;
}

const fmtUsd = (value: string | number) => {
  const n = typeof value === "string" ? parseFloat(value) : value;
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
};

const fmtShares = (value: string | number) => {
  const n = typeof value === "string" ? parseFloat(value) : value;
  if (!Number.isFinite(n)) return "—";
  // Acciones fraccionadas: cada decimal cuenta (0,02598 NO es 0,026).
  return n.toLocaleString("en-US", { maximumFractionDigits: 8 });
};

const Stat = ({ label, value, className }: { label: string; value: string; className?: string }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
      {label}
    </span>
    <span className={`text-sm font-medium tabular-nums ${className ?? ""}`}>
      {value}
    </span>
  </div>
);

const HoldingDetailModal = ({ holding, onClose }: HoldingDetailModalProps) => {
  const isUp = (holding?.pnl_pct ?? 0) >= 0;

  return (
    <Dialog
      open={holding !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="glass-card max-w-2xl">
        {holding && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <span>{holding.symbol}</span>
                {holding.kind && (
                  <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] font-normal uppercase tracking-wide text-muted-foreground">
                    {holding.kind}
                  </span>
                )}
              </DialogTitle>
              {holding.name && (
                <DialogDescription>{holding.name}</DialogDescription>
              )}
            </DialogHeader>

            <StockPriceChart symbol={holding.symbol} />

            <div className="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-white/10 pt-4 sm:grid-cols-3">
              <Stat label="Acciones" value={fmtShares(holding.shares)} />
              <Stat
                label="Precio compra"
                value={holding.cost_pending ? "sincronizando…" : fmtUsd(holding.avg_cost)}
              />
              <Stat label="Precio hoy" value={fmtUsd(holding.current_price)} />
              <Stat
                label="Invertido"
                value={holding.cost_pending ? "sincronizando…" : fmtUsd(holding.cost_basis)}
              />
              <Stat label="Valor hoy" value={fmtUsd(holding.market_value)} />
              <Stat
                label="Ganancia / Pérdida"
                value={
                  holding.cost_pending
                    ? "—"
                    : `${isUp ? "+" : ""}${fmtUsd(holding.pnl_usd)} (${holding.pnl_pct.toFixed(1)}%)`
                }
                className={
                  holding.cost_pending
                    ? "text-muted-foreground"
                    : isUp
                    ? "text-emerald-400"
                    : "text-red-400"
                }
              />
            </div>

            {holding.cost_pending && (
              <p className="text-[11px] text-muted-foreground">
                El costo de esta posición se está sincronizando desde Wallbit. La
                ganancia/pérdida aparecerá cuando termine (puede tardar unos
                minutos tras una compra hecha en la app de Wallbit).
              </p>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default HoldingDetailModal;
