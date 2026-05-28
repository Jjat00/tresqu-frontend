import { useQuery } from "@tanstack/react-query";
import { rosterService } from "@/services/agents/roster";

// The roster is effectively static per release; cache it for the session.
export const useAgentRoster = () =>
  useQuery({
    queryKey: ["agent-roster"],
    queryFn: rosterService.list,
    staleTime: Infinity,
  });
