
import { RefObject, useState } from "react";
import ChatMessage from "./ChatMessage";

interface Message {
  type: 'bot' | 'user';
  content: string;
}

interface ChatBodyProps {
  messages: Message[];
  isProcessing: boolean;
  messageEndRef: RefObject<HTMLDivElement>;
}

const ChatBody = ({ messages, isProcessing, messageEndRef }: ChatBodyProps) => {
  return (
    <div className="flex-1 overflow-auto mb-2 bg-muted/30 rounded-md p-1 sm:p-2 space-y-1 sm:space-y-2">
      {messages.map((msg, index) => (
        <ChatMessage 
          key={index}
          type={msg.type}
          content={msg.content}
        />
      ))}
      {isProcessing && (
        <div className="flex justify-start mb-1 sm:mb-2">
          <div className="bg-card p-1.5 sm:p-2 rounded-lg inline-block max-w-[85%]">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "600ms" }}></div>
            </div>
          </div>
        </div>
      )}
      <div ref={messageEndRef} />
    </div>
  );
};

export default ChatBody;
