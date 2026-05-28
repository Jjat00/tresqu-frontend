import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { AssetSearchResult } from "@/types/wallbit";

import StockPriceChart from "./StockPriceChart";

interface AssetDetailModalProps {
  /** When non-null the modal is open and shows this catalog asset. */
  asset: AssetSearchResult | null;
  onClose: () => void;
}

const fmtUsd = (value: number | string | null) => {
  const n = typeof value === "string" ? parseFloat(value) : value;
  if (n === null || !Number.isFinite(n as number)) return "—";
  return (n as number).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
};

const AssetDetailModal = ({ asset, onClose }: AssetDetailModalProps) => {
  const meta = asset
    ? [asset.asset_type, asset.sector].filter(Boolean).join(" · ")
    : "";

  return (
    <Dialog
      open={asset !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="glass-card max-w-2xl">
        {asset && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {asset.logo_url && (
                  <img
                    src={asset.logo_url}
                    alt=""
                    width={20}
                    height={20}
                    loading="lazy"
                    className="h-5 w-5 rounded-full object-contain"
                  />
                )}
                <span>{asset.symbol}</span>
                {asset.asset_type && (
                  <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] font-normal uppercase tracking-wide text-muted-foreground">
                    {asset.asset_type}
                  </span>
                )}
              </DialogTitle>
              {asset.name && <DialogDescription>{asset.name}</DialogDescription>}
            </DialogHeader>

            <StockPriceChart symbol={asset.symbol} />

            <div className="flex flex-wrap items-end justify-between gap-3 border-t border-white/10 pt-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  Último precio en catálogo
                </span>
                <span className="text-sm font-medium tabular-nums">
                  {fmtUsd(asset.price)}
                </span>
              </div>
              {meta && (
                <span className="text-xs text-muted-foreground">{meta}</span>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AssetDetailModal;
