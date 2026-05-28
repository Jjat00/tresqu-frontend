// Shared types for the web chat connected to the multi-agent supervisor.

export type ChatRole = "user" | "assistant";

// Stable ids for the agent-graph nodes (mirror backend _AGENT_LABELS).
export type AgentId =
  | "supervisor"
  | "expenses"
  | "wallbit"
  | "analyst"
  | "risk";

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

export interface FinalEvent {
  type: "final";
  text: string;
  pending_confirmation: RawPendingConfirmation | null;
}

export interface ErrorEvent {
  type: "error";
  text: string;
}

export type ChatStreamEvent = StepEvent | FinalEvent | ErrorEvent;

// The backend pending payload nests the preview under ``preview``.
export interface RawPendingConfirmation {
  requires_confirmation?: boolean;
  confirmation_id?: number;
  preview?: { summary?: string; risk_warning?: string };
  extra_two_step?: boolean;
}
