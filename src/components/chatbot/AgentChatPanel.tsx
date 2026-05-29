import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Loader2 } from "lucide-react";
import { useAgentRoster } from "@/hooks/useAgentRoster";
import { useWallbitStatus } from "@/hooks/useWallbitStatus";
import AgentChat from "./AgentChat";

interface AgentChatPanelProps {
  /** Id del agente a abrir (mismo id del roster: `tresqu`, `expenses`, …). */
  agentId: string;
  /** Qué hacer al volver. Por defecto navega al roster (`/dashboard/agents`). */
  onBack?: () => void;
  /** Adónde enviar para conectar Wallbit. Por defecto, la pestaña Integraciones. */
  onConnectWallbit?: () => void;
  /** Modo dock/embebido: altura del contenedor y sin botón "volver". */
  embedded?: boolean;
  /** Saludo y sugerencias contextuales (las usa el dock por sección). */
  greeting?: string;
  suggestions?: string[];
}

/**
 * Chat autocontenido con un solo agente: resuelve el agente desde el roster,
 * cablea el estado de Wallbit y el back, y renderiza `AgentChat`. Se puede
 * montar en cualquier lugar (una ruta, un modal, un widget) pasando solo el id.
 */
const AgentChatPanel = ({
  agentId,
  onBack,
  onConnectWallbit,
  embedded,
  greeting,
  suggestions,
}: AgentChatPanelProps) => {
  const { data, isLoading, isError } = useAgentRoster();
  const { data: wallbit } = useWallbitStatus();
  const navigate = useNavigate();

  const agents = data ?? [];
  const agent = agents.find((a) => a.id === agentId) ?? null;
  const wallbitConnected = wallbit?.connected === true;

  const goConnectWallbit =
    onConnectWallbit ?? (() => navigate("/dashboard/account?tab=integraciones"));
  const goBack = onBack ?? (() => navigate("/dashboard/agents"));

  // Id desconocido (roster ya cargado): vuelve al equipo en vez de quedarse en blanco.
  const unknownAgent = !isLoading && !isError && agents.length > 0 && !agent;
  useEffect(() => {
    if (unknownAgent) goBack();
  }, [unknownAgent]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center text-muted-foreground">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Cargando el agente…
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-40 flex-col items-center justify-center gap-1 text-center text-muted-foreground">
        <AlertCircle className="h-5 w-5" />
        <p className="text-sm">No pude cargar el equipo de agentes.</p>
        <p className="text-xs">Revisa tu conexión e inténtalo de nuevo.</p>
      </div>
    );
  }

  if (!agent) return null;

  return (
    <AgentChat
      key={agent.id}
      agent={agent}
      wallbitConnected={wallbitConnected}
      onConnectWallbit={goConnectWallbit}
      onBack={goBack}
      embedded={embedded}
      greeting={greeting}
      suggestions={suggestions}
    />
  );
};

export default AgentChatPanel;
