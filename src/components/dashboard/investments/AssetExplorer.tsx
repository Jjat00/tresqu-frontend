import { useEffect, useMemo, useState } from "react";
import { AxiosError } from "axios";
import { AlertCircle, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAssetSearch } from "@/hooks/useAssetSearch";
import type { AssetSearchResult } from "@/types/wallbit";

import AssetDetailModal from "./AssetDetailModal";

/** A short, friendly subset of the backend's category enum for quick filtering. */
const CATEGORY_CHIPS: Array<{ value: string; label: string }> = [
  { value: "MOST_POPULAR", label: "Populares" },
  { value: "ETF", label: "ETFs" },
  { value: "DIVIDENDS", label: "Dividendos" },
  { value: "TECHNOLOGY", label: "Tecnología" },
  { value: "HEALTH", label: "Salud" },
  { value: "ENERGY_AND_WATER", label: "Energía" },
  { value: "FINANCE", label: "Finanzas" },
];

const DEBOUNCE_MS = 350;

const fmtUsd = (value: number | string | null) => {
  const n = typeof value === "string" ? parseFloat(value) : value;
  if (n === null || !Number.isFinite(n as number)) return "—";
  return (n as number).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
};

const resolveErrorMessage = (error: unknown): string => {
  const status = (error as AxiosError | undefined)?.response?.status;
  if (status === 424)
    return "Conectá tu cuenta de Wallbit para explorar el catálogo de activos.";
  if (status === 502)
    return "El catálogo de Wallbit no está disponible por ahora. Probá de nuevo en unos minutos.";
  return "No pudimos buscar activos. Intentá de nuevo.";
};

const AssetExplorer = () => {
  const [rawQuery, setRawQuery] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [selected, setSelected] = useState<AssetSearchResult | null>(null);

  // Debounce the raw input so we don't fire a request on every keystroke.
  useEffect(() => {
    const id = window.setTimeout(() => setQuery(rawQuery), DEBOUNCE_MS);
    return () => window.clearTimeout(id);
  }, [rawQuery]);

  const { data, isLoading, isFetching, error } = useAssetSearch(query, category);

  const assets = useMemo(() => data?.assets ?? [], [data]);

  const trimmed = query.trim();
  const hasSearchInput = trimmed.length >= 2 || Boolean(category);

  const toggleCategory = (value: string) => {
    setCategory((current) => (current === value ? undefined : value));
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-base">Explorar activos</CardTitle>
        <CardDescription className="text-xs">
          Buscá cualquier acción o ETF del catálogo de Wallbit y mirá su precio
          en el tiempo, aunque no la tengas.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={rawQuery}
            onChange={(e) => setRawQuery(e.target.value)}
            placeholder="Buscá una acción o ETF, ej. NVDA o Vanguard"
            aria-label="Buscar activos en el catálogo de Wallbit"
            className="pl-9"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {CATEGORY_CHIPS.map((chip) => {
            const active = category === chip.value;
            return (
              <Badge
                key={chip.value}
                variant={active ? "default" : "outline"}
                role="button"
                tabIndex={0}
                aria-pressed={active}
                onClick={() => toggleCategory(chip.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleCategory(chip.value);
                  }
                }}
                className="cursor-pointer select-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {chip.label}
              </Badge>
            );
          })}
        </div>

        {/* Results */}
        <div className="min-h-[120px]">
          {!hasSearchInput ? (
            <p className="px-1 py-8 text-center text-sm text-muted-foreground">
              Escribí al menos 2 letras o elegí una categoría para empezar a
              buscar…
            </p>
          ) : isLoading || (isFetching && assets.length === 0 && !error) ? (
            <div className="space-y-2">
              {[0, 1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-12 w-full rounded-md" />
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center gap-2 px-4 py-8 text-center">
              <AlertCircle className="h-7 w-7 text-destructive" />
              <p className="max-w-xs text-sm text-muted-foreground">
                {resolveErrorMessage(error)}
              </p>
            </div>
          ) : assets.length === 0 ? (
            <p className="px-1 py-8 text-center text-sm text-muted-foreground">
              Sin resultados. Probá con otro símbolo o nombre.
            </p>
          ) : (
            <ul className="divide-y divide-white/5">
              {assets.map((asset) => {
                const meta = [asset.asset_type, asset.sector]
                  .filter(Boolean)
                  .join(" · ");
                return (
                  <li key={asset.symbol}>
                    <button
                      type="button"
                      onClick={() => setSelected(asset)}
                      aria-label={`Ver precio de ${asset.symbol}`}
                      className="flex w-full items-center gap-3 rounded-md px-2 py-2.5 text-left transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                    >
                      {asset.logo_url ? (
                        <img
                          src={asset.logo_url}
                          alt=""
                          width={32}
                          height={32}
                          loading="lazy"
                          className="h-8 w-8 shrink-0 rounded-full bg-white/5 object-contain"
                        />
                      ) : (
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-[10px] font-semibold text-muted-foreground">
                          {asset.symbol.slice(0, 3)}
                        </span>
                      )}

                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-2">
                          <span className="font-semibold">{asset.symbol}</span>
                          {asset.name && (
                            <span className="truncate text-xs text-muted-foreground">
                              {asset.name}
                            </span>
                          )}
                        </div>
                        {meta && (
                          <span className="block truncate text-[11px] text-muted-foreground">
                            {meta}
                          </span>
                        )}
                      </div>

                      <span className="shrink-0 text-sm font-medium tabular-nums">
                        {fmtUsd(asset.price)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </CardContent>

      <AssetDetailModal asset={selected} onClose={() => setSelected(null)} />
    </Card>
  );
};

export default AssetExplorer;
