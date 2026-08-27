import { useQuery } from "@tanstack/react-query";

import { investmentsService } from "@/services/wallbit";
import type {
  Holding,
  InvestmentFilters,
  InvestmentListResponse,
  PnLPeriod,
  PnLTimelineResponse,
  PortfolioSummary,
  TimelinePeriod,
  TimelineResponse,
} from "@/types/wallbit";

const PORTFOLIO_SUMMARY_KEY = ["wallbit", "portfolio", "summary"];
const PORTFOLIO_HOLDINGS_KEY = ["wallbit", "portfolio", "holdings"];

// El backend cachea el snapshot en vivo de Wallbit 60 s (compartido entre
// summary, holdings y pnl-timeline). Un staleTime de 30 s evita que un
// remount o volver a la pestaña disparen otra ronda de peticiones.
const LIVE_REFETCH_MS = 60_000;
const LIVE_STALE_MS = 30_000;

export const useInvestments = (filters: InvestmentFilters = {}) =>
  useQuery<InvestmentListResponse>({
    queryKey: ["wallbit", "investments", filters],
    queryFn: () => investmentsService.list(filters),
    retry: false,
  });

export const usePortfolioSummary = () =>
  useQuery<PortfolioSummary>({
    queryKey: PORTFOLIO_SUMMARY_KEY,
    queryFn: () => investmentsService.getSummary(),
    // Live valuation — refresh every 60s while tab is open
    refetchInterval: LIVE_REFETCH_MS,
    staleTime: LIVE_STALE_MS,
    refetchOnWindowFocus: true,
    retry: false,
  });

export const useHoldings = () =>
  useQuery<Holding[]>({
    queryKey: PORTFOLIO_HOLDINGS_KEY,
    queryFn: () => investmentsService.getHoldings(),
    refetchInterval: LIVE_REFETCH_MS,
    staleTime: LIVE_STALE_MS,
    refetchOnWindowFocus: true,
    retry: false,
  });

export const usePortfolioTimeline = (period: TimelinePeriod = "3m") =>
  useQuery<TimelineResponse>({
    queryKey: ["wallbit", "portfolio", "timeline", period],
    queryFn: () => investmentsService.getTimeline(period),
    retry: false,
  });

export const usePnLTimeline = (period: PnLPeriod = "1m") =>
  useQuery<PnLTimelineResponse>({
    queryKey: ["wallbit", "portfolio", "pnl-timeline", period],
    queryFn: () => investmentsService.getPnLTimeline(period),
    // Endpoint anchors its last point to the live summary → refresh like it.
    refetchInterval: LIVE_REFETCH_MS,
    staleTime: LIVE_STALE_MS,
    refetchOnWindowFocus: true,
    retry: false,
  });
