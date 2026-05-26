export type RiskTolerance = "conservative" | "moderate" | "aggressive";

export type RiskSource =
  | "declared"
  | "inferred"
  | "agreement"
  | "safety_cap"
  | "default";

export type RiskTrigger =
  | "initial"
  | "chat_qa"
  | "auto_inference"
  | "context_drift"
  | "user_request"
  | "manual_override";

export type RiskDimensions = {
  savings_rate?: number;
  income_stability?: number;
  expense_stability?: number;
  holdings_appetite?: number;
  liquidity_buffer?: number;
  [key: string]: number | undefined;
};

export interface RiskAssessmentSnapshot {
  tolerance: RiskTolerance;
  score: number;
  dimensions: RiskDimensions;
  confidence: number;
  reason: string;
  triggered_by: RiskTrigger;
  recorded_at: string;
}

export interface EffectiveProfile {
  tolerance: RiskTolerance;
  score: number;
  confidence: number;
  source: RiskSource;
  declared: RiskAssessmentSnapshot | null;
  inferred: RiskAssessmentSnapshot | null;
  warning: string | null;
  user_override: boolean;
}
