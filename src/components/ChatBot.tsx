
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import ChatHeader from "./chatbot/ChatHeader";
import ChatBody from "./chatbot/ChatBody";
import ChatInput from "./chatbot/ChatInput";
import { useChatBot } from "./chatbot/useChatBot";

const ChatBot = () => {
  const isMobile = useIsMobile();
  const {
    showChat,
    setShowChat,
    messages,
    inputMessage,
    setInputMessage,
    isProcessing,
    isRecording,
    isListening,
    messageEndRef,
    chatBodyRef,
    handleSendMessage,
    toggleRecording
  } = useChatBot();

  return (
    <div className="fixed bottom-16 md:bottom-16 right-6 z-50">
      {showChat && (
        <div className={`absolute ${isMobile ? 'bottom-16 right-0 left-0 mx-2' : 'bottom-16 right-0'} ${isMobile ? 'w-auto' : 'w-full sm:w-96'} h-[30rem] bg-card rounded-lg shadow-lg border border-border p-3 sm:p-4 mb-4 flex flex-col animate-fade-in`}>
          <ChatHeader 
            onMinimize={() => setShowChat(false)} 
            onClose={() => setShowChat(false)} 
          />
          
          <ChatBody 
            messages={messages} 
            isProcessing={isProcessing} 
            messageEndRef={messageEndRef} 
          />
          
          <ChatInput 
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            handleSendMessage={() => handleSendMessage()}
            toggleRecording={toggleRecording}
            isRecording={isRecording}
            isListening={isListening}
            isProcessing={isProcessing}
            isMobile={isMobile}
          />
        </div>
      )}
      
      <Button 
        className={`${isMobile ? 'h-12 w-12' : 'h-14 w-14'} rounded-full bg-success hover:bg-success/90 shadow-lg`}
        onClick={() => setShowChat(prev => !prev)}
      >
        <MessageSquare className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6'}`} />
        <span className="sr-only">Chat con Tresqu</span>
      </Button>
    </div>
  );
};

export default ChatBot;
