import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAgentRoster } from "@/hooks/useAgentRoster";
import { useWallbitStatus } from "@/hooks/useWallbitStatus";
import AgentRoster from "./AgentRoster";
import AgentChat from "./AgentChat";

const ChatView = () => {
  const { data, isLoading, isError } = useAgentRoster();
  const { data: wallbit } = useWallbitStatus();
  const navigate = useNavigate();
  const agents = data ?? [];
  const wallbitConnected = wallbit?.connected === true;
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = agents.find((a) => a.id === selectedId) ?? null;

  // Send the user to where Wallbit is connected (the Wallbit card on Profile).
  const goConnectWallbit = () => navigate("/dashboard/profile");

  // Agents that require Wallbit can't be opened while disconnected; the roster
  // shows a connect CTA instead, but guard selection too.
  const handleSelect = (id: string) => {
    const agent = agents.find((a) => a.id === id);
    if (agent?.requires_wallbit && !wallbitConnected) {
      goConnectWallbit();
      return;
    }
    setSelectedId(id);
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      {selected ? (
        <AgentChat
          key={selected.id}
          agent={selected}
          wallbitConnected={wallbitConnected}
          onConnectWallbit={goConnectWallbit}
          onBack={() => setSelectedId(null)}
        />
      ) : (
        <AgentRoster
          agents={agents}
          loading={isLoading}
          error={isError}
          wallbitConnected={wallbitConnected}
          onSelect={handleSelect}
          onConnectWallbit={goConnectWallbit}
        />
      )}
    </div>
  );
};

export default ChatView;
