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

export const useGmailSync = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => gmailService.manualSync(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gmail-status"] });
      queryClient.invalidateQueries({ queryKey: ["gmail-processed-emails"] });
    },
  });
};
