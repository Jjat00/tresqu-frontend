import { useQuery } from "@tanstack/react-query";

import { marketDataService } from "@/services/wallbit";
import type {
  PriceHistoryResponse,
  PriceRange,
  SparklinesResponse,
} from "@/types/wallbit";

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

/**
 * Fetches mini sparklines + day change for a batch of symbols in ONE request.
 * The query key is order-independent (symbols are sorted) so the same set of
 * rows hits the cache regardless of display order. Disabled when empty.
 */
export const useSparklines = (symbols: string[]) =>
  useQuery<SparklinesResponse>({
    queryKey: ["market", "sparklines", [...symbols].sort().join(",")],
    queryFn: () => marketDataService.getSparklines(symbols),
    enabled: symbols.length > 0,
    retry: false,
    // Sparklines are an at-a-glance signal; ~5 min freshness is plenty.
    staleTime: 5 * 60_000,
  });
