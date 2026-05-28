import { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import type { ChatRole } from "@/types/chat";

interface ChatMessageProps {
  role: ChatRole;
  content: string;
  error?: boolean;
  children?: ReactNode;
}

// The agent speaks Telegram-flavored markdown: single *asterisks* mean bold
// (not italic), _underscores_ mean italic. Convert the bold convention to
// standard markdown so react-markdown renders it as <strong>.
const toMarkdown = (text: string) =>
  text.replace(/\*([^*\n]+)\*/g, "**$1**");

const ChatMessage = ({ role, content, error, children }: ChatMessageProps) => {
  const isUser = role === "user";
  return (
    <div className={`mb-1 sm:mb-2 flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-2xl inline-block max-w-[85%] text-sm leading-relaxed ${
          isUser
            ? "bg-success text-success-foreground rounded-br-md"
            : error
              ? "bg-destructive/10 text-destructive rounded-bl-md"
              : "bg-card rounded-bl-md"
        }`}
      >
        {content && (
          <div className="break-words [&_a]:underline [&_strong]:font-semibold [&_ul]:my-1 [&_ul]:list-disc [&_ul]:pl-4 [&_p]:m-0 [&_p+p]:mt-1.5">
            <ReactMarkdown remarkPlugins={[remarkBreaks]}>
              {toMarkdown(content)}
            </ReactMarkdown>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default ChatMessage;
