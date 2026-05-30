import { apiClient } from "../api";
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

const BASE = "/api/wallbit";

export const investmentsService = {
  async list(filters: InvestmentFilters = {}): Promise<InvestmentListResponse> {
    const params: Record<string, string | number> = {};
    if (filters.kind) params.kind = filters.kind;
    if (filters.action) params.action = filters.action;
    if (filters.symbol) params.symbol = filters.symbol;
    if (filters.page) params.page = filters.page;
    if (filters.page_size) params.page_size = filters.page_size;

    const response = await apiClient.get<InvestmentListResponse>(
      `${BASE}/investments/`,
      { params },
    );
    return response.data;
  },

  async getSummary(): Promise<PortfolioSummary> {
    const response = await apiClient.get<PortfolioSummary>(
      `${BASE}/portfolio/summary/`,
    );
    return response.data;
  },

  async getHoldings(): Promise<Holding[]> {
    const response = await apiClient.get<Holding[]>(
      `${BASE}/portfolio/holdings/`,
    );
    return response.data;
  },

  async getTimeline(period: TimelinePeriod = "3m"): Promise<TimelineResponse> {
    const response = await apiClient.get<TimelineResponse>(
      `${BASE}/portfolio/timeline/`,
      { params: { period } },
    );
    return response.data;
  },

  async getPnLTimeline(period: PnLPeriod = "1m"): Promise<PnLTimelineResponse> {
    const response = await apiClient.get<PnLTimelineResponse>(
      `${BASE}/portfolio/pnl-timeline/`,
      { params: { period } },
    );
    return response.data;
  },
};
