import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatInputProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  handleSendMessage: () => void;
  isProcessing: boolean;
  suggestions?: string[];
}

const DEFAULT_SUGGESTIONS = [
  "¿Cuánto gasté este mes?",
  "¿Cuánto tengo en Wallbit?",
  "¿Cómo va NVDA este mes?",
];

const ChatInput = ({
  inputMessage,
  setInputMessage,
  handleSendMessage,
  isProcessing,
  suggestions = DEFAULT_SUGGESTIONS,
}: ChatInputProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <div className="flex items-end gap-2">
        <div className="flex-1 bg-background border border-input rounded-md overflow-hidden">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe un mensaje..."
            className="w-full bg-transparent px-3 py-2 text-sm resize-none focus:outline-none min-h-[40px] max-h-[120px]"
            rows={1}
          />
        </div>

        <Button
          className="bg-success text-success-foreground hover:bg-success/90 h-10 w-10 p-2"
          onClick={handleSendMessage}
          disabled={inputMessage.trim() === "" || isProcessing}
          aria-label="Enviar mensaje"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-2 flex flex-wrap gap-1.5">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => setInputMessage(suggestion)}
            className="text-[10px] sm:text-xs px-2.5 py-1 rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-success/30 hover:bg-success/5 transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </>
  );
};

export default ChatInput;
