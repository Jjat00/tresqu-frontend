import {
  Check,
  LineChart,
  Receipt,
  ShieldCheck,
  Sparkles,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import type { AgentStep } from "@/types/chat";

type NodeState = "idle" | "active" | "done";

const NODES: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "expenses", label: "Gastos", icon: Receipt },
  { id: "wallbit", label: "Wallbit", icon: Wallet },
  { id: "analyst", label: "Analista", icon: LineChart },
  { id: "risk", label: "Perfil", icon: ShieldCheck },
];

function statesFromSteps(steps: AgentStep[]): Record<string, NodeState> {
  const states: Record<string, NodeState> = {};
  for (const step of steps) {
    if (step.phase === "result") states[step.agent] = "done";
    else if (states[step.agent] !== "done") states[step.agent] = "active";
  }
  return states;
}

interface AgentGraphProps {
  steps: AgentStep[];
  processing?: boolean;
}

const AgentGraph = ({ steps, processing }: AgentGraphProps) => {
  const states = statesFromSteps(steps);
  const anyActive = Object.values(states).some((s) => s === "active");
  const supervisorActive = processing ?? false;
  const lastStep = steps[steps.length - 1];
  const currentLine = lastStep
    ? lastStep.phase === "delegate"
      ? `Delegando a ${lastStep.label}${lastStep.instruction ? `: ${lastStep.instruction}` : ""}`
      : `${lastStep.label} respondió`
    : processing
      ? "Analizando tu mensaje…"
      : "";

  return (
    <div className="w-[85%] rounded-xl border border-border/70 bg-card/80 p-2.5">
      <div className="mb-2 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
        Equipo de agentes
      </div>

      <div className="flex flex-col items-center gap-1">
        {/* Supervisor */}
        <div
          className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-colors ${
            supervisorActive && !anyActive
              ? "border-success/60 bg-success/10 text-success animate-pulse"
              : "border-border bg-muted/40 text-foreground"
          }`}
        >
          <Sparkles className="h-3 w-3" />
          <span className="font-medium">Tresqu</span>
        </div>

        <div className="h-2.5 w-px bg-border" />

        {/* Subagents */}
        <div className="grid w-full grid-cols-4 gap-1">
          {NODES.map(({ id, label, icon: Icon }) => {
            const state = states[id] ?? "idle";
            return (
              <div
                key={id}
                className={`flex flex-col items-center gap-1 rounded-lg border px-1 py-1.5 text-center transition-all ${
                  state === "active"
                    ? "border-success/60 bg-success/10 text-success shadow-sm animate-pulse"
                    : state === "done"
                      ? "border-success/30 bg-success/5 text-foreground"
                      : "border-border/50 bg-muted/20 text-muted-foreground/60"
                }`}
              >
                <div className="relative">
                  <Icon className="h-3.5 w-3.5" />
                  {state === "done" && (
                    <Check className="absolute -right-1.5 -top-1.5 h-2.5 w-2.5 rounded-full bg-success text-white" />
                  )}
                </div>
                <span className="text-[9px] leading-none">{label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {currentLine && (
        <div className="mt-2 truncate text-[10px] italic text-muted-foreground">
          {currentLine}
        </div>
      )}
    </div>
  );
};

export default AgentGraph;
