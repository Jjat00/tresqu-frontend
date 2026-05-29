// Shared types for the web chat connected to the multi-agent supervisor.

export type ChatRole = "user" | "assistant";

// Stable ids for the agent-graph nodes (mirror backend _AGENT_LABELS).
export type AgentId =
  | "supervisor"
  | "expenses"
  | "wallbit"
  | "analyst"
  | "risk";

export type AgentKind = "supervisor" | "specialist" | "profiler";

// One agent in the roster returned by GET /api/agents/roster/.
export interface AgentInfo {
  id: string;
  label: string;
  kind: AgentKind;
  specialty: string;
  capabilities: string[];
  real_money?: boolean;
  // Hard dependency: locked behind a "Conectar Wallbit" CTA when Wallbit isn't
  // connected (e.g. the Wallbit agent).
  requires_wallbit?: boolean;
  // Soft dependency: usable without Wallbit, but better connected (the Analyst
  // can weigh your portfolio). Shows a non-blocking hint when disconnected.
  prefers_wallbit?: boolean;
  // Data the agent only READS (e.g. the Analyst). Shown as dotted inputs, not
  // as agent-to-agent communication.
  data_sources?: string[];
  start_command?: string;
  note?: string;
}

export type StepPhase = "delegate" | "result";

export interface AgentStep {
  agent: AgentId | string;
  label: string;
  phase: StepPhase;
  instruction?: string;
  summary?: string;
}

// Wallbit preview that requires explicit confirmation before executing a real
// money operation. ``confirmation_id`` is the AgentDecision id to confirm/cancel.
export interface PendingConfirmation {
  confirmation_id: number;
  summary: string;
  risk_warning?: string;
  extra_two_step?: boolean;
}

export interface ChatMsg {
  id: string;
  role: ChatRole;
  content: string;
  steps?: AgentStep[];
  pending?: PendingConfirmation | null;
  // Marks a resolved confirmation so the UI hides the buttons.
  resolved?: boolean;
  error?: boolean;
}

// --- SSE event shapes streamed by POST /api/agents/chat/stream/ ---

export interface StepEvent {
  type: "step";
  phase: StepPhase;
  agent: AgentId | string;
  label: string;
  instruction?: string;
  summary?: string;
}

// A single chunk of the answer text, streamed as the model generates it.
export interface TokenEvent {
  type: "token";
  text: string;
}

export interface FinalEvent {
  type: "final";
  text: string;
  pending_confirmation: RawPendingConfirmation | null;
}

export interface ErrorEvent {
  type: "error";
  text: string;
}

export type ChatStreamEvent =
  | StepEvent
  | TokenEvent
  | FinalEvent
  | ErrorEvent;

// The backend pending payload nests the preview under ``preview``.
export interface RawPendingConfirmation {
  requires_confirmation?: boolean;
  confirmation_id?: number;
  preview?: { summary?: string; risk_warning?: string };
  extra_two_step?: boolean;
}
