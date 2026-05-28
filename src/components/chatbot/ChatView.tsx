import Logo from "@/components/Logo";
import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";
import { useChatBot } from "./useChatBot";

const ChatView = () => {
  const {
    messages,
    inputMessage,
    setInputMessage,
    isProcessing,
    messageEndRef,
    handleSendMessage,
    onConfirm,
    onCancel,
  } = useChatBot();

  return (
    <div className="mx-auto flex h-[calc(100dvh-9.5rem)] w-full max-w-3xl flex-col lg:h-[calc(100dvh-6.5rem)]">
      <div className="mb-3 flex items-center gap-2.5 animate-fade-up">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-success/15">
          <Logo size="sm" showText={false} />
        </div>
        <div className="min-w-0">
          <h1 className="text-base sm:text-lg font-semibold leading-tight gradient-text">
            Asistente Tresqu
          </h1>
          <p className="truncate text-xs text-muted-foreground">
            Pregunta o pide acciones y observa al equipo de agentes resolverlo.
          </p>
        </div>
      </div>

      <ChatBody
        messages={messages}
        isProcessing={isProcessing}
        messageEndRef={messageEndRef}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />

      <ChatInput
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        handleSendMessage={() => handleSendMessage()}
        isProcessing={isProcessing}
      />
    </div>
  );
};

export default ChatView;
