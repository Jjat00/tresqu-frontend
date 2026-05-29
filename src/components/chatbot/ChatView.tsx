import { useNavigate, useParams } from "react-router-dom";
import { useAgentRoster } from "@/hooks/useAgentRoster";
import { useWallbitStatus } from "@/hooks/useWallbitStatus";
import AgentRoster from "./AgentRoster";
import AgentChatPanel from "./AgentChatPanel";

const ChatView = () => {
  const { data, isLoading, isError } = useAgentRoster();
  const { data: wallbit } = useWallbitStatus();
  const navigate = useNavigate();
  const { agentId } = useParams<{ agentId: string }>();
  const agents = data ?? [];
  const wallbitConnected = wallbit?.connected === true;

  // Send the user to where Wallbit is connected (Integraciones tab on Cuenta).
  const goConnectWallbit = () =>
    navigate("/dashboard/account?tab=integraciones");

  // Agents that require Wallbit can't be opened while disconnected; the roster
  // shows a connect CTA instead, but guard selection too.
  const handleSelect = (id: string) => {
    const agent = agents.find((a) => a.id === id);
    if (agent?.requires_wallbit && !wallbitConnected) {
      goConnectWallbit();
      return;
    }
    navigate(`/dashboard/agents/${id}`);
  };

  // The selected agent now lives in the URL: each agent has its own route.
  if (agentId) {
    return (
      <div className="mx-auto w-full max-w-4xl">
        <AgentChatPanel agentId={agentId} onConnectWallbit={goConnectWallbit} />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      <AgentRoster
        agents={agents}
        loading={isLoading}
        error={isError}
        wallbitConnected={wallbitConnected}
        onSelect={handleSelect}
        onConnectWallbit={goConnectWallbit}
      />
    </div>
  );
};

export default ChatView;
