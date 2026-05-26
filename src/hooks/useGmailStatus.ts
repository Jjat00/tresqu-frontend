import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { gmailService } from "@/services/gmail/gmail";

export const useGmailStatus = () => {
  return useQuery({
    queryKey: ["gmail-status"],
    queryFn: () => gmailService.getStatus(),
    retry: false,
  });
};

export const useProcessedEmails = (page = 1) => {
  return useQuery({
    queryKey: ["gmail-processed-emails", page],
    queryFn: () => gmailService.getProcessedEmails(page),
    retry: false,
  });
};

export const useGmailDisconnect = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => gmailService.disconnect(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gmail-status"] });
    },
  });
};

/**
 * Reintento del trigger Gmail cuando quedó en estado `failed`.
 *
 * Reemplaza al antiguo `useGmailSync` (sincronización manual). El
 * polling de correos corre automáticamente cada 15 min; este hook
 * solo aplica si el provisioning inicial del trigger falló.
 */
export const useGmailRetryTrigger = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => gmailService.retryTrigger(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gmail-status"] });
    },
  });
};
