
import { ReactNode } from "react";

interface ChatMessageProps {
  type: 'assistant' | 'user';
  content: string;
  children?: ReactNode;
}

const ChatMessage = ({ type, content, children }: ChatMessageProps) => {
  return (
    <div className={`mb-1 sm:mb-2 flex ${type === "user" ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-2xl inline-block max-w-[85%] text-sm leading-relaxed ${
          type === "user"
            ? 'bg-success text-success-foreground rounded-br-md'
            : 'bg-card rounded-bl-md'
        }`}
      >
        {content}
        {children}
      </div>
    </div>
  );
};

export default ChatMessage;
