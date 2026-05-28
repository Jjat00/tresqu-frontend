import { useState } from "react";
import { useAgentRoster } from "@/hooks/useAgentRoster";
import AgentRoster from "./AgentRoster";
import AgentChat from "./AgentChat";

const ChatView = () => {
  const { data, isLoading, isError } = useAgentRoster();
  const agents = data ?? [];
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = agents.find((a) => a.id === selectedId) ?? null;

  return (
    <div className="mx-auto w-full max-w-4xl">
      {selected ? (
        <AgentChat
          key={selected.id}
          agent={selected}
          onBack={() => setSelectedId(null)}
        />
      ) : (
        <AgentRoster
          agents={agents}
          loading={isLoading}
          error={isError}
          onSelect={setSelectedId}
        />
      )}
    </div>
  );
};

export default ChatView;
