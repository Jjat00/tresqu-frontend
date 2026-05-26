import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { riskProfileService } from "@/services/riskProfile/riskProfile";

const QUERY_KEY = ["risk-profile", "effective"] as const;

export const useEffectiveProfile = () => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => riskProfileService.getEffectiveProfile(),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};

export const useRefreshEffectiveProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      riskProfileService.getEffectiveProfile({ refresh: true }),
    onSuccess: (data) => {
      queryClient.setQueryData(QUERY_KEY, data);
    },
  });
};
