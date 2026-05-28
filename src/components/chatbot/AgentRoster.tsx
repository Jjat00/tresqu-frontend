import { AlertCircle, ArrowRight, Loader2, Lock, ShieldAlert, Wallet } from "lucide-react";
import AgentTeamDiagram from "./AgentTeamDiagram";
import { AgentIcon } from "./agentIcons";
import type { AgentInfo } from "@/types/chat";

interface AgentRosterProps {
  agents: AgentInfo[];
  loading: boolean;
  error: boolean;
  wallbitConnected: boolean;
  onSelect: (id: string) => void;
  onConnectWallbit: () => void;
}

const AgentCard = ({
  agent,
  wallbitConnected,
  onSelect,
  onConnectWallbit,
}: {
  agent: AgentInfo;
  wallbitConnected: boolean;
  onSelect: (id: string) => void;
  onConnectWallbit: () => void;
}) => {
  const locked = !!agent.requires_wallbit && !wallbitConnected;
  const prefersHint = !!agent.prefers_wallbit && !wallbitConnected;
  const cta = agent.kind === "profiler" ? "Evaluar perfil" : "Hablar";

  const header = (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/15">
        <AgentIcon id={agent.id} className="h-4 w-4 text-success" />
      </div>
      <span className="font-medium">{agent.label}</span>
      {agent.kind === "supervisor" && (
        <span className="rounded-full border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">
          Orquestador
        </span>
      )}
      {agent.real_money && (
        <span className="flex items-center gap-0.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-1.5 py-0.5 text-[10px] text-amber-600 dark:text-amber-400">
          <ShieldAlert className="h-2.5 w-2.5" /> Dinero real
        </span>
      )}
      {locked && (
        <span className="flex items-center gap-0.5 rounded-full border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">
          <Lock className="h-2.5 w-2.5" /> Requiere Wallbit
        </span>
      )}
    </div>
  );

  const body = (
    <>
      <p className="mt-1.5 text-xs text-muted-foreground">{agent.specialty}</p>

      <ul className="mt-2 space-y-0.5">
        {agent.capabilities.map((c) => (
          <li
            key={c}
            className="flex items-start gap-1.5 text-[11px] text-muted-foreground"
          >
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-success/60" />
            {c}
          </li>
        ))}
      </ul>

      {agent.note && (
        <p className="mt-2 rounded-md bg-muted/40 p-1.5 text-[11px] leading-snug text-muted-foreground">
          {agent.note}
        </p>
      )}

      {prefersHint && (
        <p className="mt-2 flex items-start gap-1.5 rounded-md border border-dashed border-border/60 bg-muted/30 p-1.5 text-[11px] leading-snug text-muted-foreground">
          <Wallet className="mt-0.5 h-3 w-3 shrink-0" />
          Funciona sin Wallbit, pero conectándolo el análisis puede considerar tu
          portafolio real.
        </p>
      )}
    </>
  );

  if (locked) {
    return (
      <div className="flex flex-col rounded-xl border border-dashed border-border/70 bg-card/40 p-3">
        <div className="opacity-60">
          {header}
          {body}
        </div>
        <p className="mt-2 rounded-md bg-muted/40 p-1.5 text-[11px] leading-snug text-muted-foreground">
          Conecta tu cuenta Wallbit para hablar con este agente: necesita leer tu
          saldo y movimientos para responderte.
        </p>
        <button
          onClick={onConnectWallbit}
          className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-md bg-wallbit px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-wallbit/90"
        >
          <Wallet className="h-3.5 w-3.5" /> Conectar Wallbit
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => onSelect(agent.id)}
      className="group flex flex-col rounded-xl border border-border/70 bg-card/60 p-3 text-left transition-all hover:border-success/40 hover:bg-success/5"
    >
      {header}
      {body}

      <div className="mt-2 flex items-center gap-1 text-xs font-medium text-success">
        {cta}
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </div>
    </button>
  );
};

const AgentRoster = ({
  agents,
  loading,
  error,
  wallbitConnected,
  onSelect,
  onConnectWallbit,
}: AgentRosterProps) => {
  if (loading) {
    return (
      <div className="flex h-40 items-center justify-center text-muted-foreground">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Cargando el equipo…
      </div>
    );
  }

  if (error || agents.length === 0) {
    return (
      <div className="flex h-40 flex-col items-center justify-center gap-1 text-center text-muted-foreground">
        <AlertCircle className="h-5 w-5" />
        <p className="text-sm">No pude cargar el equipo de agentes.</p>
        <p className="text-xs">Revisa tu conexión e inténtalo de nuevo.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-6 animate-fade-up">
      <header>
        <h1 className="text-xl font-bold tracking-tight gradient-text">
          Equipo de agentes
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Habla con Tresqu o directamente con un especialista. Si le preguntas
          algo fuera de su área, te dirá con quién hablar.
        </p>
      </header>

      <AgentTeamDiagram
        agents={agents}
        wallbitConnected={wallbitConnected}
        onSelect={onSelect}
        onConnectWallbit={onConnectWallbit}
      />

      <div className="grid gap-3 sm:grid-cols-2">
        {agents.map((a) => (
          <AgentCard
            key={a.id}
            agent={a}
            wallbitConnected={wallbitConnected}
            onSelect={onSelect}
            onConnectWallbit={onConnectWallbit}
          />
        ))}
      </div>
    </div>
  );
};

export default AgentRoster;
