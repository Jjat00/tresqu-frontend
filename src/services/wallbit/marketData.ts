import { apiClient } from "../api";
import type { PriceHistoryResponse, PriceRange } from "@/types/wallbit";

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
}

export const marketDataService = new MarketDataService();
