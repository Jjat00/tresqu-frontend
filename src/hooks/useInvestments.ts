import { useQuery } from "@tanstack/react-query";

import { investmentsService } from "@/services/wallbit";
import type {
  Holding,
  InvestmentFilters,
  InvestmentListResponse,
  PortfolioSummary,
  TimelinePeriod,
  TimelineResponse,
} from "@/types/wallbit";

const PORTFOLIO_SUMMARY_KEY = ["wallbit", "portfolio", "summary"];
const PORTFOLIO_HOLDINGS_KEY = ["wallbit", "portfolio", "holdings"];

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
    refetchInterval: 60_000,
    refetchOnWindowFocus: true,
    retry: false,
  });

export const useHoldings = () =>
  useQuery<Holding[]>({
    queryKey: PORTFOLIO_HOLDINGS_KEY,
    queryFn: () => investmentsService.getHoldings(),
    refetchInterval: 60_000,
    refetchOnWindowFocus: true,
    retry: false,
  });

export const usePortfolioTimeline = (period: TimelinePeriod = "3m") =>
  useQuery<TimelineResponse>({
    queryKey: ["wallbit", "portfolio", "timeline", period],
    queryFn: () => investmentsService.getTimeline(period),
    retry: false,
  });
