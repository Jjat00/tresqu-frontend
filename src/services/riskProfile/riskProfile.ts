import { apiClient } from "@/services/api";
import { EffectiveProfile } from "@/types/riskProfile";

export interface FetchEffectiveProfileParams {
  refresh?: boolean;
  maxAgeDays?: number;
}

export const riskProfileService = {
  getEffectiveProfile: async (
    params: FetchEffectiveProfileParams = {}
  ): Promise<EffectiveProfile> => {
    const search = new URLSearchParams();
    if (params.refresh) search.set("refresh", "1");
    if (typeof params.maxAgeDays === "number") {
      search.set("max_age_days", String(params.maxAgeDays));
    }
    const qs = search.toString();
    const url = `/api/agents/risk-profile/effective/${qs ? `?${qs}` : ""}`;
    const response = await apiClient.get<EffectiveProfile>(url);
    return response.data;
  },
};
