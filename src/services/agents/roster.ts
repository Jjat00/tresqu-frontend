import { apiClient } from "../api";
import type { AgentInfo } from "@/types/chat";

// Fetches the team of agents available in the web "Agentes" module.
export const rosterService = {
  async list(): Promise<AgentInfo[]> {
    const { data } = await apiClient.get<{ agents: AgentInfo[] }>(
      "/api/agents/roster/",
    );
    return data.agents;
  },
};
