
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MessageSquare, ChevronDown, Volume2, X } from "lucide-react";

interface ChatHeaderProps {
  onMinimize: () => void;
  onClose: () => void;
}

const ChatHeader = ({ onMinimize, onClose }: ChatHeaderProps) => {
  return (
    <div className="flex justify-between items-center border-b pb-2 mb-2">
      <div className="flex items-center">
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-tech-purple to-tech-pink/80 flex items-center justify-center">
          <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
        </div>
        <span className="font-medium text-xs sm:text-sm ml-2">TresquBot</span>
      </div>
      <div className="flex items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" className="h-7 w-7 sm:h-8 sm:w-8 p-0 hover:text-tech-pink" onClick={onMinimize}>
                <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="sr-only">Minimizar</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-card border-tech-purple/30">
              <p className="text-xs">Minimizar chat</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" className="h-7 w-7 sm:h-8 sm:w-8 p-0 hover:text-tech-purple">
                <Volume2 className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="sr-only">Activar/desactivar voz</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-card border-tech-purple/30">
              <p className="text-xs">Activar/desactivar voz</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <Button variant="ghost" size="sm" className="h-7 w-7 sm:h-8 sm:w-8 p-0 hover:text-tech-pink" onClick={onClose}>
          <span className="sr-only">Cerrar</span>
          <X className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
