import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { wallbitService } from "@/services/wallbit";
import type { AgentLimits, AgentLimitsPayload } from "@/types/wallbit";

const LIMITS_KEY = ["wallbit-limits"];

export const useAgentLimits = () => {
  return useQuery<AgentLimits>({
    queryKey: LIMITS_KEY,
    queryFn: () => wallbitService.getLimits(),
    retry: false,
  });
};

export const useUpdateAgentLimits = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: AgentLimitsPayload) =>
      wallbitService.updateLimits(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(LIMITS_KEY, data);
      queryClient.invalidateQueries({ queryKey: LIMITS_KEY });
    },
  });
};
