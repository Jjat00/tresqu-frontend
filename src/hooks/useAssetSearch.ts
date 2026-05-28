import { useQuery } from "@tanstack/react-query";

import { assetsService } from "@/services/wallbit";
import type { AssetSearchResponse } from "@/types/wallbit";

/** Minimum free-text length before we hit the catalog (a category alone also unlocks search). */
const MIN_QUERY_LENGTH = 2;

/**
 * Searches the Wallbit asset catalog.
 *
 * The query is expected to be ALREADY debounced by the caller (the explorer
 * debounces the raw input before passing it here) so React Query never fires a
 * request per keystroke. The query is `enabled` only when there's something
 * meaningful to search: a free-text term of length >= 2, OR a selected category.
 */
export const useAssetSearch = (query: string, category?: string, limit?: number) => {
  const trimmed = query.trim();
  const hasQuery = trimmed.length >= MIN_QUERY_LENGTH;
  const hasCategory = Boolean(category);

  return useQuery<AssetSearchResponse>({
    queryKey: ["wallbit", "assets", "search", trimmed, category, limit],
    queryFn: () => assetsService.search(trimmed, category, limit),
    enabled: hasQuery || hasCategory,
    retry: false,
    // Catalog + prices change slowly relative to a search session.
    staleTime: 5 * 60_000,
  });
};
