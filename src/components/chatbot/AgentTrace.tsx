import { useState } from "react";
import { ChevronDown, ChevronRight, CornerDownRight, Check } from "lucide-react";
import type { AgentStep } from "@/types/chat";

interface AgentTraceProps {
  steps: AgentStep[];
}

const AgentTrace = ({ steps }: AgentTraceProps) => {
  const [open, setOpen] = useState(false);
  if (!steps.length) return null;

  return (
    <div className="mt-1.5 border-t border-border/40 pt-1.5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
      >
        {open ? (
          <ChevronDown className="h-3 w-3" />
        ) : (
          <ChevronRight className="h-3 w-3" />
        )}
        Cómo lo resolví
      </button>

      {open && (
        <ul className="mt-1.5 space-y-1">
          {steps.map((step, i) => (
            <li
              key={i}
              className="flex items-start gap-1.5 text-[11px] leading-snug text-muted-foreground"
            >
              {step.phase === "delegate" ? (
                <>
                  <CornerDownRight className="mt-0.5 h-3 w-3 shrink-0 text-success" />
                  <span>
                    <span className="font-medium text-foreground">
                      {step.label}
                    </span>
                    {step.instruction ? `: ${step.instruction}` : ""}
                  </span>
                </>
              ) : (
                <>
                  <Check className="mt-0.5 h-3 w-3 shrink-0 text-success" />
                  <span>{step.label} respondió</span>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AgentTrace;
