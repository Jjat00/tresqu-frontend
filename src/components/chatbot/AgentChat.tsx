import { ArrowLeft, Database, ShieldAlert, Sparkles, Wallet } from "lucide-react";
import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";
import { useChatBot } from "./useChatBot";
import { AgentIcon } from "./agentIcons";
import { useEffectiveProfile } from "@/hooks/useRiskProfile";
import type { AgentInfo } from "@/types/chat";

const TOLERANCE_ES: Record<string, string> = {
  conservative: "Conservador",
  moderate: "Moderado",
  aggressive: "Agresivo",
};

const SOURCE_ES: Record<string, string> = {
  inferred: "inferido de tus registros",
  declared: "definido por ti",
  agreement: "confirmado por tus registros",
  safety_cap: "ajustado por prudencia",
};

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
    "Soy tu agente de Perfil de riesgo. Puedo decirte tu perfil actual (por cuestionario e inferido de tus registros), explicarte qué lo afecta y ayudarte a que sea más fiel. ¿Lo revisamos?",
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

const tolLabel = (t?: string) => (t ? TOLERANCE_ES[t] ?? t : "");

const RiskIntro = ({
  note,
  onStart,
  disabled,
}: {
  note?: string;
  onStart: () => void;
  disabled: boolean;
}) => {
  const { data } = useEffectiveProfile();

  const hasDeclared = !!data?.declared;
  const hasInferred = !!data?.inferred;
  const hasAny = !!data && data.source !== "default" && (hasDeclared || hasInferred);

  return (
    <div className="mb-2 rounded-lg border border-border/70 bg-muted/20 p-2.5 text-xs">
      {data && !hasAny && (
        <p className="font-medium text-foreground">
          Aún no tienes un perfil definido.
        </p>
      )}

      {hasAny && (
        <div className="space-y-0.5">
          {hasDeclared && (
            <p>
              <span className="text-muted-foreground">Por cuestionario:</span>{" "}
              <span className="font-medium text-foreground">
                {tolLabel(data!.declared!.tolerance)}
              </span>
            </p>
          )}
          {hasInferred && (
            <p>
              <span className="text-muted-foreground">Inferido de tus registros:</span>{" "}
              <span className="font-medium text-foreground">
                {tolLabel(data!.inferred!.tolerance)}
              </span>
            </p>
          )}
          <p>
            <span className="text-muted-foreground">En uso:</span>{" "}
            <span className="font-medium text-foreground">
              {tolLabel(data!.tolerance)}
            </span>{" "}
            <span className="text-muted-foreground">
              ({SOURCE_ES[data!.source] ?? "según tu evaluación"})
            </span>
          </p>
        </div>
      )}

      {note && <p className="mt-1.5 text-muted-foreground">{note}</p>}

      <button
        onClick={onStart}
        disabled={disabled}
        className="mt-2 inline-flex items-center gap-1 rounded-md bg-success px-2.5 py-1 text-xs font-medium text-white transition-colors hover:bg-success/90 disabled:opacity-50"
      >
        <Sparkles className="h-3.5 w-3.5" />
        {hasDeclared ? "Actualizar perfil" : "Iniciar evaluación"}
      </button>
    </div>
  );
};

interface AgentChatProps {
  agent: AgentInfo;
  wallbitConnected: boolean;
  onConnectWallbit: () => void;
  onBack: () => void;
}

const AgentChat = ({
  agent,
  wallbitConnected,
  onConnectWallbit,
  onBack,
}: AgentChatProps) => {
  const lockedByWallbit = !!agent.requires_wallbit && !wallbitConnected;
  const prefersWallbitHint = !!agent.prefers_wallbit && !wallbitConnected;

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

  // Defense-in-depth: the roster already blocks opening this agent while
  // Wallbit is disconnected, but guard the chat view too.
  if (lockedByWallbit) {
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
          <h1 className="text-base font-semibold leading-tight">{agent.label}</h1>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-wallbit/15">
            <Wallet className="h-6 w-6 text-wallbit" />
          </div>
          <div className="max-w-sm space-y-1">
            <p className="font-medium">Conecta Wallbit para usar este agente</p>
            <p className="text-sm text-muted-foreground">
              {agent.label} necesita leer tu saldo y movimientos para responderte.
              Conéctalo y vuelve aquí.
            </p>
          </div>
          <button
            onClick={onConnectWallbit}
            className="inline-flex items-center gap-1.5 rounded-md bg-wallbit px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-wallbit/90"
          >
            <Wallet className="h-4 w-4" /> Conectar Wallbit
          </button>
        </div>
      </div>
    );
  }

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

      {prefersWallbitHint && (
        <button
          onClick={onConnectWallbit}
          className="mb-2 flex w-full items-center gap-1.5 rounded-md border border-dashed border-border/60 bg-muted/30 p-1.5 text-left text-[11px] leading-snug text-muted-foreground transition-colors hover:border-wallbit/40 hover:text-foreground"
        >
          <Wallet className="h-3.5 w-3.5 shrink-0 text-wallbit" />
          <span>
            Funciona sin Wallbit, pero <span className="font-medium">conectándolo</span>{" "}
            el análisis considera tu portafolio real. Toca para conectar.
          </span>
        </button>
      )}

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
