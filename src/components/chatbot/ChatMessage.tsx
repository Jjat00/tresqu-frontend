
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
        className={`p-1.5 sm:p-2 rounded-lg inline-block max-w-[85%] text-xs sm:text-sm ${
          type === "user" 
            ? 'bg-success text-success-foreground' 
            : 'bg-card'
        }`}
      >
        {content}
        {children}
      </div>
    </div>
  );
};

export default ChatMessage;
