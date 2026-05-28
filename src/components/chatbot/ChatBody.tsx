import { RefObject } from "react";
import { Loader2 } from "lucide-react";
import ChatMessage from "./ChatMessage";
import AgentGraph from "./AgentGraph";
import AgentTrace from "./AgentTrace";
import ConfirmationCard from "./ConfirmationCard";
import type { AgentKind, ChatMsg } from "@/types/chat";

interface ChatBodyProps {
  messages: ChatMsg[];
  isProcessing: boolean;
  agentKind: AgentKind;
  messageEndRef: RefObject<HTMLDivElement>;
  onConfirm: (messageId: string, decisionId: number) => void;
  onCancel: (messageId: string, decisionId: number) => void;
}

// Compact "working" indicator for a specialist/profiler turn (no agent graph).
const Thinking = ({ steps }: { steps?: ChatMsg["steps"] }) => {
  const last = steps?.[steps.length - 1];
  const label = last
    ? last.phase === "delegate"
      ? last.label
      : `${last.label} ✓`
    : "Pensando…";
  return (
    <div className="flex items-center gap-2 rounded-lg border border-border/70 bg-card/80 px-3 py-2 text-xs text-muted-foreground">
      <Loader2 className="h-3.5 w-3.5 animate-spin text-success" />
      <span className="truncate">{label}</span>
    </div>
  );
};

const ChatBody = ({
  messages,
  isProcessing,
  agentKind,
  messageEndRef,
  onConfirm,
  onCancel,
}: ChatBodyProps) => {
  return (
    <div className="flex-1 min-h-0 overflow-auto mb-2 bg-muted/20 rounded-lg p-2 sm:p-3 space-y-1.5 sm:space-y-2">
      {messages.map((msg) => {
        // In-flight assistant turn: Tresqu shows the live agent graph; a single
        // specialist shows a compact indicator of its current tool.
        if (msg.role === "assistant" && msg.content === "" && isProcessing) {
          return (
            <div key={msg.id} className="flex justify-start">
              {agentKind === "supervisor" ? (
                <AgentGraph steps={msg.steps ?? []} processing />
              ) : (
                <Thinking steps={msg.steps} />
              )}
            </div>
          );
        }

        const showTrace = msg.role === "assistant" && !!msg.steps?.length;
        const showConfirm = !!msg.pending && !msg.resolved;

        return (
          <ChatMessage
            key={msg.id}
            role={msg.role}
            content={msg.content}
            error={msg.error}
          >
            {showTrace && <AgentTrace steps={msg.steps!} />}
            {showConfirm && (
              <ConfirmationCard
                pending={msg.pending!}
                onConfirm={() => onConfirm(msg.id, msg.pending!.confirmation_id)}
                onCancel={() => onCancel(msg.id, msg.pending!.confirmation_id)}
              />
            )}
          </ChatMessage>
        );
      })}
      <div ref={messageEndRef} />
    </div>
  );
};

export default ChatBody;
