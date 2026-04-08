
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Mic, MicOff, Send } from "lucide-react";

interface ChatInputProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  handleSendMessage: () => void;
  toggleRecording: () => void;
  isRecording: boolean;
  isListening: boolean;
  isProcessing: boolean;
  isMobile: boolean;
}

const ChatInput = ({ 
  inputMessage, 
  setInputMessage, 
  handleSendMessage,
  toggleRecording,
  isRecording,
  isListening,
  isProcessing,
  isMobile
}: ChatInputProps) => {
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <div className="flex items-end gap-1 sm:gap-2">
        <div className="flex-1 bg-background border border-input rounded-md overflow-hidden">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isListening ? "Escuchando..." : "Escribe un mensaje o habla..."}
            className="w-full bg-transparent px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm resize-none focus:outline-none min-h-[36px] max-h-[100px]"
            rows={1}
            disabled={isListening}
          />
        </div>
        
        <div className="flex">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant={isRecording ? "destructive" : "secondary"}
                  size={isMobile ? "sm" : "icon"}
                  className={`${isRecording ? "animate-pulse" : ""} h-8 w-8 sm:h-10 sm:w-10 p-1 sm:p-2`}
                  onClick={toggleRecording}
                >
                  {isRecording ? <MicOff className="h-3 w-3 sm:h-4 sm:w-4" /> : <Mic className="h-3 w-3 sm:h-4 sm:w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">{isRecording ? "Detener grabación" : "Hablar"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Button 
            className="ml-1 bg-success hover:bg-success/90 h-8 w-8 sm:h-10 sm:w-10 p-1 sm:p-2"
            onClick={handleSendMessage}
            disabled={inputMessage.trim() === '' || isProcessing}
          >
            <Send className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
      </div>
      
      <div className="mt-2 flex flex-wrap gap-1.5">
        {[
          "¿Cuánto gasté este mes?",
          "Resumen semanal",
          "Agregar ingreso",
        ].map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => {
              setInputMessage(suggestion);
            }}
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
