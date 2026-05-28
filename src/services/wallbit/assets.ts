import { apiClient } from "../api";
import type { AssetSearchResponse } from "@/types/wallbit";

const BASE = "/api/wallbit";

export const assetsService = {
  /**
   * Searches the Wallbit asset catalog by free text (symbol or name).
   * `category` is optional and narrows results to one catalog bucket.
   * Requires a connected Wallbit account — a 424 means "not connected".
   */
  async search(
    q: string,
    category?: string,
    limit?: number,
  ): Promise<AssetSearchResponse> {
    const params: Record<string, string | number> = {};
    if (q) params.q = q;
    if (category) params.category = category;
    if (limit) params.limit = limit;

    const response = await apiClient.get<AssetSearchResponse>(
      `${BASE}/assets/search/`,
      { params },
    );
    return response.data;
  },
};
