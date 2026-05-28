import { apiClient } from "../api";

export interface ConfirmResult {
  result: { ok: boolean; error?: string; wallbit_tx_uuid?: string };
  decision: unknown;
}

export interface CancelResult {
  detail: string;
}

// Confirm/cancel a pending Wallbit AgentDecision (real-money operation).
export class AgentDecisionsService {
  private baseUrl: string;

  constructor(baseUrl = "/api/wallbit/agent") {
    this.baseUrl = baseUrl;
  }

  async confirm(decisionId: number): Promise<ConfirmResult> {
    const response = await apiClient.post<ConfirmResult>(
      `${this.baseUrl}/confirm/${decisionId}/`,
    );
    return response.data;
  }

  async cancel(decisionId: number): Promise<CancelResult> {
    const response = await apiClient.post<CancelResult>(
      `${this.baseUrl}/cancel/${decisionId}/`,
    );
    return response.data;
  }
}

export const agentDecisionsService = new AgentDecisionsService();
