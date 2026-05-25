import { RefreshCw, TrendingUp } from "lucide-react";
import { toast } from "sonner";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useWallbitStatus, useWallbitSync } from "@/hooks/useWallbitStatus";

import HoldingsTable from "./HoldingsTable";
import PortfolioDonut from "./PortfolioDonut";
import PortfolioHeroMetrics from "./PortfolioHeroMetrics";
import PortfolioTimeline from "./PortfolioTimeline";
import TradeHistory from "./TradeHistory";

const formatLastSync = (iso: string | null | undefined): string => {
  if (!iso) return "nunca";
  const synced = new Date(iso);
  const diffMs = Date.now() - synced.getTime();
  if (Number.isNaN(diffMs) || diffMs < 0) return synced.toLocaleString();
  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 1) return "hace instantes";
  if (minutes < 60) return `hace ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `hace ${hours} h`;
  const days = Math.floor(hours / 24);
  return `hace ${days} d`;
};

const InvestmentsTab = () => {
  const { data: status, isLoading } = useWallbitStatus();
  const syncMutation = useWallbitSync();

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-72 w-full" />
      </div>
    );
  }

  if (!status?.connected) {
    return (
      <Alert className="glass-card">
        <TrendingUp className="h-4 w-4" />
        <AlertTitle>Conectá Wallbit para ver tus inversiones</AlertTitle>
        <AlertDescription>
          Una vez que conectes tu API key desde el tab{" "}
          <strong>Integraciones</strong>, vas a ver aquí tu portfolio completo:
          posiciones, P&L en vivo, distribución por activo y evolución del
          capital invertido.
        </AlertDescription>
      </Alert>
    );
  }

  const handleSync = () => {
    syncMutation.mutate(undefined, {
      onSuccess: (result) => {
        if (!result.ok) {
          toast.error(`No se pudo sincronizar: ${result.error ?? "error desconocido"}`);
          return;
        }
        const upserted = result.upserted ?? 0;
        const created = result.investments_created ?? 0;
        const parts = [`${upserted} tx revisadas`];
        if (created > 0) parts.push(`${created} nueva${created === 1 ? "" : "s"}`);
        toast.success(`Sincronizado: ${parts.join(", ")}`);
      },
      onError: (err) => {
        const message = err instanceof Error ? err.message : "Error desconocido";
        toast.error(`No se pudo sincronizar: ${message}`);
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end gap-3 text-xs text-muted-foreground">
        <span>Última sincronización: {formatLastSync(status.last_sync_at)}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={handleSync}
          disabled={syncMutation.isPending}
        >
          <RefreshCw
            className={`mr-2 h-3.5 w-3.5 ${syncMutation.isPending ? "animate-spin" : ""}`}
          />
          {syncMutation.isPending ? "Sincronizando..." : "Sincronizar"}
        </Button>
      </div>

      <PortfolioHeroMetrics />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PortfolioDonut />
        <PortfolioTimeline />
      </div>

      <HoldingsTable />

      <TradeHistory />
    </div>
  );
};

export default InvestmentsTab;
