import { ArrowLeft, Database, ShieldAlert, Sparkles } from "lucide-react";
import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";
import { useChatBot } from "./useChatBot";
import { AgentIcon } from "./agentIcons";
import type { AgentInfo } from "@/types/chat";

const GREETINGS: Record<string, string> = {
  tresqu:
    "¡Hola! Soy Tresqu, tu asistente financiero. Puedo registrar gastos e ingresos, consultar tu Wallbit, analizar acciones y más. ¿En qué te ayudo?",
  expenses:
    "Soy el agente de Gastos e ingresos. Pídeme registrar, editar o consultar tus movimientos y resúmenes.",
  wallbit:
    "Soy el agente de Wallbit. Consulta tu saldo y movimientos, o pídeme una operación — antes de ejecutar te muestro una confirmación, es dinero real.",
  analyst:
    "Soy el Analista. Pregúntame por el precio o el análisis de una acción o ETF. Solo lectura y educativo: no recomiendo comprar ni vender.",
  risk:
    "Soy tu Perfil de riesgo. Puedo evaluarte con un cuestionario corto cuando quieras.",
};

const SUGGESTIONS: Record<string, string[]> = {
  tresqu: [
    "¿Cuánto gasté este mes?",
    "¿Cuánto tengo en Wallbit?",
    "¿Cómo va NVDA este mes?",
  ],
  expenses: [
    "Registra 20.000 en café hoy",
    "Resumen de este mes",
    "¿Cuánto gasté en comida?",
  ],
  wallbit: ["¿Cuál es mi saldo?", "Últimas 5 transacciones", "Compra 20 USD de AAPL"],
  analyst: [
    "¿Cómo va NVDA este mes?",
    "Explícame el ETF VOO",
    "¿AAPL encaja con mi perfil?",
  ],
  risk: [],
};

const RiskIntro = ({
  note,
  onStart,
  disabled,
}: {
  note?: string;
  onStart: () => void;
  disabled: boolean;
}) => (
  <div className="mb-2 rounded-lg border border-border/70 bg-muted/20 p-2.5 text-xs">
    {note && <p className="text-muted-foreground">{note}</p>}
    <button
      onClick={onStart}
      disabled={disabled}
      className="mt-2 inline-flex items-center gap-1 rounded-md bg-success px-2.5 py-1 text-xs font-medium text-white transition-colors hover:bg-success/90 disabled:opacity-50"
    >
      <Sparkles className="h-3.5 w-3.5" /> Iniciar evaluación
    </button>
  </div>
);

interface AgentChatProps {
  agent: AgentInfo;
  onBack: () => void;
}

const AgentChat = ({ agent, onBack }: AgentChatProps) => {
  const {
    messages,
    inputMessage,
    setInputMessage,
    isProcessing,
    messageEndRef,
    handleSendMessage,
    onConfirm,
    onCancel,
  } = useChatBot({
    agentId: agent.id,
    greeting: GREETINGS[agent.id] ?? agent.specialty,
  });

  return (
    <div className="mx-auto flex h-[calc(100dvh-9.5rem)] w-full max-w-3xl flex-col lg:h-[calc(100dvh-6.5rem)]">
      <div className="mb-3 flex items-center gap-2.5 animate-fade-up">
        <button
          onClick={onBack}
          aria-label="Volver al equipo"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-success/15">
          <AgentIcon id={agent.id} className="h-4 w-4 text-success" />
        </div>
        <div className="min-w-0">
          <h1 className="flex items-center gap-2 text-base font-semibold leading-tight">
            {agent.label}
            {agent.real_money && (
              <span className="flex items-center gap-0.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-normal text-amber-600 dark:text-amber-400">
                <ShieldAlert className="h-2.5 w-2.5" /> Dinero real
              </span>
            )}
          </h1>
          <p className="truncate text-xs text-muted-foreground">
            {agent.specialty}
          </p>
        </div>
      </div>

      {agent.kind === "profiler" && (
        <RiskIntro
          note={agent.note}
          disabled={isProcessing}
          onStart={() =>
            agent.start_command && handleSendMessage(agent.start_command)
          }
        />
      )}

      {agent.data_sources?.length ? (
        <div className="mb-2 flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <Database className="h-3 w-3" /> Lee: {agent.data_sources.join(", ")}
        </div>
      ) : null}

      <ChatBody
        messages={messages}
        isProcessing={isProcessing}
        agentKind={agent.kind}
        messageEndRef={messageEndRef}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />

      <ChatInput
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        handleSendMessage={() => handleSendMessage()}
        isProcessing={isProcessing}
        suggestions={SUGGESTIONS[agent.id] ?? []}
      />
    </div>
  );
};

export default AgentChat;
