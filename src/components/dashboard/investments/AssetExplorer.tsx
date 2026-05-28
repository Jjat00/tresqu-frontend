import { useEffect, useMemo, useState } from "react";
import { AxiosError } from "axios";
import { AlertCircle, Search } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAssetSearch } from "@/hooks/useAssetSearch";
import type { AssetSearchResult } from "@/types/wallbit";

import AssetDetailModal from "./AssetDetailModal";

/** The category buckets shown as tabs. The first one loads by default on mount. */
const CATEGORY_TABS: Array<{ value: string; label: string }> = [
  { value: "MOST_POPULAR", label: "Populares" },
  { value: "ETF", label: "ETFs" },
  { value: "DIVIDENDS", label: "Dividendos" },
  { value: "TECHNOLOGY", label: "Tecnología" },
  { value: "HEALTH", label: "Salud" },
  { value: "CONSUMER_GOODS", label: "Consumo" },
  { value: "ENERGY_AND_WATER", label: "Energía" },
  { value: "FINANCE", label: "Finanzas" },
  { value: "REAL_ESTATE", label: "Inmuebles" },
  { value: "TREASURY_BILLS", label: "Tesoro" },
  { value: "VIDEOGAMES", label: "Videojuegos" },
  { value: "ARGENTINA_ADR", label: "ADR Argentina" },
];

const DEFAULT_CATEGORY = "MOST_POPULAR";
const DEBOUNCE_MS = 350;
/** Rows shown per table view (Wallbit catalog only — no market-data cost). */
const TABLE_SIZE = 6;

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
  // Default to the popular bucket so a table renders on mount with NO query.
  const [category, setCategory] = useState<string>(DEFAULT_CATEGORY);
  const [selected, setSelected] = useState<AssetSearchResult | null>(null);

  // Debounce the raw input so we don't fire a request on every keystroke.
  useEffect(() => {
    const id = window.setTimeout(() => setQuery(rawQuery), DEBOUNCE_MS);
    return () => window.clearTimeout(id);
  }, [rawQuery]);

  const trimmed = query.trim();
  const isSearching = trimmed.length >= 2;

  // When the user is searching we drop the category so results span the whole
  // catalog; otherwise the active category drives the list. The hook is enabled
  // whenever there's a query >= 2 OR a category, so the table never goes idle.
  const { data, isLoading, isFetching, error } = useAssetSearch(
    trimmed,
    isSearching ? undefined : category,
    TABLE_SIZE,
  );

  const assets = useMemo(() => data?.assets ?? [], [data]);

  const showSkeletons =
    isLoading || (isFetching && assets.length === 0 && !error);

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-base">Explorar activos</CardTitle>
        <CardDescription className="text-xs">
          Mirá los activos más populares del catálogo de Wallbit o buscá
          cualquier acción o ETF y revisá su precio en el tiempo, aunque no la
          tengas.
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

        {/* Category tabs. While searching the active tab visual relaxes since the
            results override the category list. */}
        <Tabs
          value={isSearching ? "" : category}
          onValueChange={setCategory}
        >
          <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 bg-transparent p-0">
            {CATEGORY_TABS.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="h-7 rounded-full border border-white/10 bg-white/[0.03] px-3 text-xs data-[state=active]:border-transparent data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Results table */}
        <div className="min-h-[160px]">
          {showSkeletons ? (
            <div className="space-y-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-12 w-full rounded-md" />
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center gap-2 px-4 py-10 text-center">
              <AlertCircle className="h-7 w-7 text-destructive" />
              <p className="max-w-xs text-sm text-muted-foreground">
                {resolveErrorMessage(error)}
              </p>
            </div>
          ) : assets.length === 0 ? (
            <p className="px-1 py-10 text-center text-sm text-muted-foreground">
              {isSearching
                ? "Sin resultados. Probá con otro símbolo o nombre."
                : "No hay activos para esta categoría por ahora."}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Símbolo</TableHead>
                    <TableHead className="hidden sm:table-cell">Nombre</TableHead>
                    <TableHead className="text-right">Precio</TableHead>
                    <TableHead className="hidden lg:table-cell">Sector</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assets.map((asset) => {
                    return (
                      <TableRow
                        key={asset.symbol}
                        role="button"
                        tabIndex={0}
                        aria-label={`Ver precio de ${asset.symbol}`}
                        onClick={() => setSelected(asset)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setSelected(asset);
                          }
                        }}
                        className="cursor-pointer transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                      >
                        <TableCell>
                          <div className="flex items-center gap-2.5">
                            {asset.logo_url ? (
                              <img
                                src={asset.logo_url}
                                alt=""
                                width={28}
                                height={28}
                                loading="lazy"
                                className="h-7 w-7 shrink-0 rounded-full bg-white/5 object-contain"
                              />
                            ) : (
                              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/5 text-[10px] font-semibold text-muted-foreground">
                                {asset.symbol.slice(0, 3)}
                              </span>
                            )}
                            <span className="font-semibold">{asset.symbol}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden max-w-[200px] sm:table-cell">
                          <span className="block truncate text-muted-foreground">
                            {asset.name || "—"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right font-medium tabular-nums">
                          {fmtUsd(asset.price)}
                        </TableCell>
                        <TableCell className="hidden text-muted-foreground lg:table-cell">
                          {asset.sector || "—"}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </CardContent>

      <AssetDetailModal asset={selected} onClose={() => setSelected(null)} />
    </Card>
  );
};

export default AssetExplorer;
