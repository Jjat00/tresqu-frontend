import { useQuery } from "@tanstack/react-query";

import { marketDataService } from "@/services/wallbit";
import type { PriceHistoryResponse, PriceRange } from "@/types/wallbit";

/**
 * Fetches an asset's price history for a given range.
 * Disabled until a symbol is provided (e.g. the detail modal is closed).
 */
export const usePriceHistory = (
  symbol: string | null | undefined,
  range: PriceRange,
) =>
  useQuery<PriceHistoryResponse>({
    queryKey: ["market", "price", symbol, range],
    queryFn: () => marketDataService.getPriceHistory(symbol as string, range),
    enabled: Boolean(symbol),
    retry: false,
    // Prices move, but intraday refetch on every interaction is wasteful.
    staleTime: 60_000,
  });
