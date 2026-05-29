import { useEffect, useState } from "react";
import { MessageSquareText, PanelRightClose, Sparkles } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useAgentRoster } from "@/hooks/useAgentRoster";
import { cn } from "@/lib/utils";
import AgentChatPanel from "./AgentChatPanel";

export interface SectionChatConfig {
  /** Agente preseleccionado al entrar a la sección (puede cambiarse). */
  defaultAgentId: string;
  /** Sugerencias contextuales para el agente por defecto. */
  suggestions: string[];
}

// Etiquetas cortas para los chips del selector (los labels del roster son
// largos para una columna estrecha). Fallback al label del roster.
const SHORT_LABEL: Record<string, string> = {
  tresqu: "Tresqu",
  expenses: "Gastos",
  wallbit: "Wallbit",
  analyst: "Analista",
  risk: "Perfil",
};

// Mapa sección → contexto del chat. Define solo el agente por defecto y las
// sugerencias; el selector ofrece TODOS los agentes en cualquier sección.
const SECTION_CHAT: Record<string, SectionChatConfig> = {
  home: {
    defaultAgentId: "tresqu",
    suggestions: [
      "¿Cómo van mis finanzas este mes?",
      "¿Cuánto gasté este mes?",
      "¿Cuánto tengo en Wallbit?",
    ],
  },
  expenses: {
    defaultAgentId: "tresqu",
    suggestions: [
      "Registra 20.000 en café hoy",
      "¿Cuánto gasté en comida?",
      "Resumen de gastos del mes",
    ],
  },
  income: {
    defaultAgentId: "tresqu",
    suggestions: [
      "Registra un ingreso de 500.000 hoy",
      "¿Cuánto ingresé este mes?",
      "Compara ingresos vs gastos",
    ],
  },
  investments: {
    defaultAgentId: "tresqu",
    suggestions: [
      "¿Cómo va mi portafolio?",
      "¿Cuánto tengo en Wallbit?",
      "¿Cómo va NVDA este mes?",
    ],
  },
  categories: {
    defaultAgentId: "tresqu",
    suggestions: [
      "¿En qué categoría gasto más?",
      "Resumen por categorías",
      "¿Cuánto gasté en comida?",
    ],
  },
};

/** Config del chat contextual para una sección, o null si no aplica. */
export const sectionChatConfig = (section?: string): SectionChatConfig | null =>
  (section && SECTION_CHAT[section]) || null;

interface ContextChatDockProps {
  /** Sección actual (activeTab del dashboard). */
  section: string;
  config: SectionChatConfig;
  /** Estado expandido/colapsado del dock en desktop (lo controla el layout). */
  open: boolean;
  onToggle: () => void;
}

const ContextChatDock = ({
  section,
  config,
  open,
  onToggle,
}: ContextChatDockProps) => {
  const { data } = useAgentRoster();
  const roster = data ?? [];
  const [selected, setSelected] = useState(config.defaultAgentId);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Al cambiar de sección, vuelve al agente por defecto de esa sección.
  useEffect(() => {
    setSelected(config.defaultAgentId);
  }, [section, config.defaultAgentId]);

  const labelOf = (id: string) =>
    SHORT_LABEL[id] ?? roster.find((a) => a.id === id)?.label ?? id;

  // Todos los agentes disponibles, con el por defecto de la sección primero.
  const rosterIds = roster.map((a) => a.id);
  const options = rosterIds.length
    ? [
        config.defaultAgentId,
        ...rosterIds.filter((id) => id !== config.defaultAgentId),
      ]
    : [config.defaultAgentId];
  const showSelector = options.length > 1;

  // Sugerencias/saludo contextual SOLO para el agente por defecto (Tresqu);
  // los especialistas conservan sus propios textos.
  const isDefault = selected === config.defaultAgentId;
  const suggestions = isDefault ? config.suggestions : undefined;

  const selector = showSelector ? (
    <div className="flex flex-wrap gap-1 border-b border-border px-3 py-2">
      {options.map((id) => (
        <button
          key={id}
          onClick={() => setSelected(id)}
          className={cn(
            "rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors",
            selected === id
              ? "border-success/40 bg-success/10 text-success"
              : "border-border/60 text-muted-foreground hover:text-foreground hover:border-success/30",
          )}
        >
          {labelOf(id)}
        </button>
      ))}
    </div>
  ) : null;

  const chat = (
    <AgentChatPanel
      key={`${section}:${selected}`}
      agentId={selected}
      embedded
      suggestions={suggestions}
    />
  );

  return (
    <>
      {/* ---------- Desktop: dock lateral derecho ---------- */}
      <aside
        className={cn(
          "hidden lg:flex flex-col fixed top-14 right-0 bottom-0 z-20 border-l border-border bg-card/40 backdrop-blur-sm transition-all duration-200",
          open ? "w-[22rem]" : "w-12",
        )}
      >
        {open ? (
          <>
            <div className="flex h-10 shrink-0 items-center justify-end border-b border-border px-2">
              <button
                onClick={onToggle}
                aria-label="Colapsar chat"
                className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
              >
                <PanelRightClose className="h-4 w-4" />
              </button>
            </div>
            {selector}
            <div className="min-h-0 flex-1 px-3 pb-3">{chat}</div>
          </>
        ) : (
          <button
            onClick={onToggle}
            aria-label="Abrir chat"
            className="flex flex-1 flex-col items-center gap-2 py-4 text-muted-foreground transition-colors hover:text-foreground"
          >
            <MessageSquareText className="h-5 w-5 text-success" />
            <span className="text-xs font-medium tracking-wide [writing-mode:vertical-rl]">
              Pregúntale a Tresqu
            </span>
          </button>
        )}
      </aside>

      {/* ---------- Móvil: barra + panel deslizante ---------- */}
      <div className="lg:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="fixed inset-x-0 bottom-14 z-30 flex items-center justify-center gap-2 border-t border-border bg-card/95 py-2.5 text-sm font-medium text-foreground backdrop-blur-lg"
        >
          <MessageSquareText className="h-4 w-4 text-success" />
          Pregúntale a {labelOf(config.defaultAgentId)}
        </button>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent
            side="bottom"
            className="flex h-[85dvh] flex-col gap-0 p-0"
          >
            <div className="flex h-12 shrink-0 items-center gap-1.5 border-b border-border px-4 text-sm font-medium">
              <Sparkles className="h-4 w-4 text-success" />
              Asistente
            </div>
            {selector}
            <div className="min-h-0 flex-1 px-3 pb-3 pt-2">{chat}</div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default ContextChatDock;
