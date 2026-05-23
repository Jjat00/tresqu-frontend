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
