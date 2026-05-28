import { RefObject } from "react";
import ChatMessage from "./ChatMessage";
import AgentGraph from "./AgentGraph";
import AgentTrace from "./AgentTrace";
import ConfirmationCard from "./ConfirmationCard";
import type { ChatMsg } from "@/types/chat";

interface ChatBodyProps {
  messages: ChatMsg[];
  isProcessing: boolean;
  messageEndRef: RefObject<HTMLDivElement>;
  onConfirm: (messageId: string, decisionId: number) => void;
  onCancel: (messageId: string, decisionId: number) => void;
}

const ChatBody = ({
  messages,
  isProcessing,
  messageEndRef,
  onConfirm,
  onCancel,
}: ChatBodyProps) => {
  return (
    <div className="flex-1 min-h-0 overflow-auto mb-2 bg-muted/20 rounded-lg p-2 sm:p-3 space-y-1.5 sm:space-y-2">
      {messages.map((msg) => {
        // In-flight assistant turn: show the live agent graph instead of a bubble.
        if (msg.role === "assistant" && msg.content === "" && isProcessing) {
          return (
            <div key={msg.id} className="flex justify-start">
              <AgentGraph steps={msg.steps ?? []} processing />
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
