import { TrendingUp } from "lucide-react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useWallbitStatus } from "@/hooks/useWallbitStatus";

import HoldingsTable from "./HoldingsTable";
import PortfolioDonut from "./PortfolioDonut";
import PortfolioHeroMetrics from "./PortfolioHeroMetrics";
import PortfolioTimeline from "./PortfolioTimeline";
import TradeHistory from "./TradeHistory";

const InvestmentsTab = () => {
  const { data: status, isLoading } = useWallbitStatus();

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

  return (
    <div className="space-y-4">
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
