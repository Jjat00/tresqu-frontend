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
