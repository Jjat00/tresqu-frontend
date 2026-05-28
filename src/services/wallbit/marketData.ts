import { apiClient } from "../api";
import type {
  PriceHistoryResponse,
  PriceRange,
  SparklinesResponse,
} from "@/types/wallbit";

export class MarketDataService {
  private baseUrl: string;

  constructor(baseUrl = "/api/market") {
    this.baseUrl = baseUrl;
  }

  async getPriceHistory(
    symbol: string,
    range: PriceRange = "1m",
  ): Promise<PriceHistoryResponse> {
    const response = await apiClient.get<PriceHistoryResponse>(
      `${this.baseUrl}/assets/${encodeURIComponent(symbol)}/history/`,
      { params: { range } },
    );
    return response.data;
  }

  /**
   * Fetches mini sparklines + day change for a batch of symbols in one request.
   * Symbols are upper-cased server-side; cap ~30 per call. A symbol may map to
   * null when the provider has no data — callers must render gracefully.
   */
  async getSparklines(
    symbols: string[],
    range?: string,
  ): Promise<SparklinesResponse> {
    const params: Record<string, string> = { symbols: symbols.join(",") };
    if (range) params.range = range;
    const response = await apiClient.get<SparklinesResponse>(
      `${this.baseUrl}/sparklines/`,
      { params },
    );
    return response.data;
  }
}

export const marketDataService = new MarketDataService();
