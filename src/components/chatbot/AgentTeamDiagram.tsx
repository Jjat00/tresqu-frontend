import { Lock, Sparkles } from "lucide-react";
import { AgentIcon } from "./agentIcons";
import type { AgentInfo } from "@/types/chat";

interface AgentTeamDiagramProps {
  agents: AgentInfo[];
  wallbitConnected: boolean;
  onSelect: (id: string) => void;
  onConnectWallbit: () => void;
}

// Honest hub-and-spoke: Tresqu coordinates; specialists never talk to each
// other. The Analyst only READS shared data (shown as a dotted input).
const AgentTeamDiagram = ({
  agents,
  wallbitConnected,
  onSelect,
  onConnectWallbit,
}: AgentTeamDiagramProps) => {
  const supervisor = agents.find((a) => a.kind === "supervisor");
  const specialists = agents.filter((a) => a.kind !== "supervisor");
  const analyst = agents.find((a) => a.id === "analyst");

  return (
    <div className="rounded-xl border border-border/70 bg-card/60 p-3 sm:p-4">
      <div className="flex flex-col items-center">
        {supervisor && (
          <button
            onClick={() => onSelect(supervisor.id)}
            className="flex items-center gap-1.5 rounded-full border border-success/50 bg-success/10 px-3 py-1 text-sm font-medium text-success transition-colors hover:bg-success/20"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {supervisor.label}
          </button>
        )}
        <p className="mt-1 text-[11px] text-muted-foreground">
          Coordina al equipo y deriva al especialista correcto
        </p>
        <div className="my-2 h-3 w-px bg-border" />

        <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-4">
          {specialists.map((a) => {
            const locked = !!a.requires_wallbit && !wallbitConnected;
            return (
              <button
                key={a.id}
                onClick={() => (locked ? onConnectWallbit() : onSelect(a.id))}
                title={locked ? "Conecta Wallbit para usar este agente" : undefined}
                className={`flex flex-col items-center gap-1 rounded-lg border px-1 py-2 text-center transition-all ${
                  locked
                    ? "border-dashed border-border/60 bg-muted/10 opacity-60 hover:opacity-100"
                    : "border-border/60 bg-muted/20 hover:border-success/40 hover:bg-success/5"
                }`}
              >
                <div className="relative">
                  <AgentIcon id={a.id} className="h-4 w-4 text-foreground" />
                  {locked && (
                    <Lock className="absolute -right-1.5 -top-1.5 h-2.5 w-2.5 text-muted-foreground" />
                  )}
                </div>
                <span className="text-[10px] leading-tight text-muted-foreground">
                  {a.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {analyst?.data_sources?.length ? (
        <div className="mt-3 rounded-lg border border-dashed border-border/60 bg-muted/20 p-2 text-[11px] text-muted-foreground">
          <span className="font-medium text-foreground">Analista</span> solo{" "}
          <em>lee</em> datos comunes: {analyst.data_sources.join(", ")}.
        </div>
      ) : null}

      <p className="mt-2 text-center text-[10px] text-muted-foreground">
        Tresqu orquesta uno a uno. Los especialistas no se comunican entre sí.
      </p>
    </div>
  );
};

export default AgentTeamDiagram;
