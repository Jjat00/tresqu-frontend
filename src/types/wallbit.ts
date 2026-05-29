export type WallbitStatusValue = "connected" | "revoked" | "error";

export interface WallbitStatus {
  connected: boolean;
  status?: WallbitStatusValue;
  scope_hint?: string;
  connected_at?: string | null;
  last_sync_at?: string | null;
  kill_switch_until?: string | null;
  last_error?: string;
}

export interface WallbitConnectPayload {
  api_key: string;
  scope_hint?: string;
}

export type InvestmentKind = "STOCK" | "ETF" | "BOND" | "ROBO" | "CHEST";
export type InvestmentAction = "BUY" | "SELL" | "DEPOSIT" | "WITHDRAW";

export interface Investment {
  id: number;
  kind: InvestmentKind;
  action: InvestmentAction;
  symbol: string;
  chest_category: string;
  amount_usd: string;
  shares: string | null;
  wallbit_tx_uuid: string | null;
  created_at: string;
}

export interface InvestmentListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Investment[];
}

export interface CashBalance {
  currency: string;
  amount: string;
}

export interface PortfolioSummary {
  total_invested_usd: string;
  total_withdrawn_usd: string;
  net_invested_usd: string;
  current_value_usd: string;
  pnl_usd: string;
  pnl_pct: number;
  holdings_count: number;
  cash: CashBalance[];
  /**
   * Neto aportado al Robo Advisor (depósitos − retiros). Wallbit no expone su
   * valor actual ni su P&L, así que es solo lo aportado — nunca ganancia/pérdida.
   */
  robo_net_contributed_usd: string;
  /**
   * Efectivo SIN invertir dentro de la cuenta de inversiones ("libre para
   * invertir"). Distinto de `cash` (cuenta principal, fuera de inversiones).
   */
  investment_cash_usd: string;
  last_sync_at: string | null;
}

export interface Holding {
  symbol: string;
  name: string;
  kind: string;
  shares: string;
  avg_cost: string;
  current_price: string;
  cost_basis: string;
  market_value: string;
  pnl_usd: string;
  pnl_pct: number;
}

export interface TimelinePoint {
  date: string;
  invested_total_usd: string;
}

export type TimelinePeriod = "1m" | "3m" | "6m" | "1y" | "all";

export interface TimelineResponse {
  period: TimelinePeriod;
  points: TimelinePoint[];
}

export interface InvestmentFilters {
  kind?: InvestmentKind;
  action?: InvestmentAction;
  symbol?: string;
  page?: number;
  page_size?: number;
}

export interface WallbitSyncResult {
  ok: boolean;
  upserted?: number;
  embeddings_made?: number;
  investments_created?: number;
  account_id?: number;
  error?: string;
  last_sync_at: string | null;
}

export interface AgentLimits {
  max_trade_usd: string;
  max_daily_move_usd: string;
  require_2step_above_usd: string;
  allowed_symbols: string[];
  blocked_symbols: string[];
}

export type AgentLimitsPayload = Partial<{
  max_trade_usd: string | number;
  max_daily_move_usd: string | number;
  require_2step_above_usd: string | number;
  allowed_symbols: string[];
  blocked_symbols: string[];
}>;

// --- Market data: per-asset price history ---

export type PriceRange = "1d" | "1w" | "1m" | "3m" | "1y" | "5y" | "max";

export type PriceTrend = "alcista" | "bajista" | "lateral";

export interface PricePoint {
  /** ISO timestamp for intraday ranges (1d/1w) or YYYY-MM-DD for longer ranges */
  t: string;
  price: number;
}

export interface PriceSummary {
  current: number;
  change_abs: number;
  change_pct: number;
  high: number;
  low: number;
  trend: PriceTrend;
  points_count: number;
}

export interface PriceHistoryResponse {
  symbol: string;
  range: PriceRange;
  points: PricePoint[];
  summary: PriceSummary;
  /** true when the data is a cached fallback (proveedor no disponible) */
  stale: boolean;
  source: string;
}

// --- Asset explorer: search the Wallbit catalog ---

/** A single asset returned by the catalog search endpoint. */
export interface AssetSearchResult {
  symbol: string;
  name: string;
  asset_type: string;
  sector: string;
  /** May arrive as a number, a numeric string, or null — render gracefully. */
  price: number | string | null;
  logo_url: string;
  country: string;
}

export interface AssetSearchResponse {
  assets: AssetSearchResult[];
}
