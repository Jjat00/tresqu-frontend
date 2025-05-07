
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
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-highlight/20 flex items-center justify-center">
          <img 
            src="/lovable-uploads/b6f2898a-6513-45fd-a734-c4e9df849741.png" 
            alt="Tresqu Logo" 
            className="h-5 w-auto filter brightness-0 invert sepia hue-rotate-165 saturate-200" 
          />
        </div>
        <span className="font-medium text-xs sm:text-sm ml-2">Tresqu</span>
      </div>
      <div className="flex items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" className="h-7 w-7 sm:h-8 sm:w-8 p-0" onClick={onMinimize}>
                <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="sr-only">Minimizar</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Minimizar chat</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" className="h-7 w-7 sm:h-8 sm:w-8 p-0">
                <Volume2 className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="sr-only">Activar/desactivar voz</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Activar/desactivar voz</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <Button variant="ghost" size="sm" className="h-7 w-7 sm:h-8 sm:w-8 p-0" onClick={onClose}>
          <span className="sr-only">Cerrar</span>
          <X className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
