import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { wallbitService } from "@/services/wallbit";
import type { WallbitConnectPayload, WallbitStatus } from "@/types/wallbit";

const STATUS_KEY = ["wallbit-status"];

export const useWallbitStatus = () => {
  return useQuery<WallbitStatus>({
    queryKey: STATUS_KEY,
    queryFn: () => wallbitService.getStatus(),
    retry: false,
  });
};

export const useWallbitConnect = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: WallbitConnectPayload) =>
      wallbitService.connect(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(STATUS_KEY, data);
      queryClient.invalidateQueries({ queryKey: STATUS_KEY });
    },
  });
};

export const useWallbitDisconnect = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => wallbitService.disconnect(),
    onSuccess: (data) => {
      queryClient.setQueryData(STATUS_KEY, data);
      queryClient.invalidateQueries({ queryKey: STATUS_KEY });
    },
  });
};
