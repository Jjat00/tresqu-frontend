import { useMemo } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  useEffectiveProfile,
  useRefreshEffectiveProfile,
} from "@/hooks/useRiskProfile";
import {
  EffectiveProfile,
  RiskDimensions,
  RiskSource,
  RiskTolerance,
} from "@/types/riskProfile";
import {
  AlertTriangle,
  ChevronDown,
  HelpCircle,
  Info,
  Loader2,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const TOLERANCE_LABEL: Record<RiskTolerance, string> = {
  conservative: "Conservador",
  moderate: "Moderado",
  aggressive: "Agresivo",
};

const TOLERANCE_STYLES: Record<
  RiskTolerance,
  { fg: string; bg: string; border: string; radar: string }
> = {
  conservative: {
    fg: "text-sky-300",
    bg: "bg-sky-500/15",
    border: "border-sky-500/30",
    radar: "#38bdf8",
  },
  moderate: {
    fg: "text-amber-300",
    bg: "bg-amber-500/15",
    border: "border-amber-500/30",
    radar: "#f59e0b",
  },
  aggressive: {
    fg: "text-rose-300",
    bg: "bg-rose-500/15",
    border: "border-rose-500/30",
    radar: "#f43f5e",
  },
};

const SOURCE_LABEL: Record<RiskSource, string> = {
  declared: "Declarado",
  inferred: "Inferido del contexto",
  agreement: "Confirmado por contexto",
  safety_cap: "Ajustado por seguridad",
  default: "Sin evaluar",
};

const DIMENSION_LABEL: Record<keyof RiskDimensions, string> = {
  savings_rate: "Capacidad de ahorro",
  income_stability: "Previsibilidad de ingresos",
  expense_stability: "Previsibilidad de gastos",
  holdings_appetite: "Apetito inversor",
  liquidity_buffer: "Reserva acumulada",
};

const DIMENSION_ORDER: (keyof RiskDimensions)[] = [
  "savings_rate",
  "income_stability",
  "expense_stability",
  "holdings_appetite",
  "liquidity_buffer",
];

const formatConfidence = (c: number) => `${Math.round(c * 100)}%`;

const SCORE_RANGES: { label: string; range: string; tone: string }[] = [
  { label: "Conservador", range: "0 – 35", tone: "text-sky-300" },
  { label: "Moderado", range: "36 – 65", tone: "text-amber-300" },
  { label: "Agresivo", range: "66 – 100", tone: "text-rose-300" },
];

const DIMENSION_META: Record<
  string,
  { weight: number; description: string; meaningHigh: string }
> = {
  savings_rate: {
    weight: 25,
    description: "Cuánto de tu ingreso queda sin gastar cada mes.",
    meaningHigh: "Tienes margen para asumir más riesgo.",
  },
  income_stability: {
    weight: 20,
    description:
      "Penaliza solo los meses por debajo de tu media. Los meses mejores no restan puntos.",
    meaningHigh: "Tu ingreso es predecible en el piso.",
  },
  expense_stability: {
    weight: 10,
    description:
      "Penaliza solo los picos de gasto por encima de tu media. Los meses baratos no restan.",
    meaningHigh: "Tu gasto está bajo control, sin sobresaltos hacia arriba.",
  },
  holdings_appetite: {
    weight: 25,
    description:
      "Qué proporción de tu portafolio actual está en activos volátiles vs defensivos.",
    meaningHigh: "Ya inviertes en activos agresivos en la práctica.",
  },
  liquidity_buffer: {
    weight: 20,
    description:
      "Meses de gasto que cubrirías con tu ahorro acumulado (ingresos menos gastos en todos tus registros). No es tu saldo bancario real.",
    meaningHigh: "Tienes un colchón sólido para aguantar volatilidad.",
  },
};

interface DimensionReading {
  level: string;
  detail: string;
  tone: string;
}

const interpretDimension = (
  key: string,
  value: number
): DimensionReading => {
  if (key === "savings_rate") {
    if (value <= 0)
      return {
        level: "Sin colchón",
        detail: "Gastas todo o más de lo que ingresas en la ventana de 90 días.",
        tone: "text-rose-300",
      };
    if (value <= 20)
      return {
        level: "Muy bajo",
        detail: "Ahorras menos del 10% de tu ingreso.",
        tone: "text-rose-300",
      };
    if (value <= 40)
      return {
        level: "Bajo",
        detail: "Ahorras entre 10% y 20% — capacidad acotada.",
        tone: "text-amber-300",
      };
    if (value <= 60)
      return {
        level: "Saludable",
        detail: "Ahorras entre 20% y 35% — buen margen LATAM.",
        tone: "text-emerald-300",
      };
    if (value <= 80)
      return {
        level: "Alto",
        detail: "Ahorras entre 35% y 50% — gran margen.",
        tone: "text-emerald-300",
      };
    return {
      level: "Excepcional",
      detail: "Ahorras más del 50% de tu ingreso.",
      tone: "text-emerald-300",
    };
  }

  if (key === "income_stability") {
    if (value <= 0)
      return {
        level: "Muy frágil",
        detail:
          "Algún mes tu ingreso cayó muy por debajo del promedio (>50%). Los meses mejores no penalizan.",
        tone: "text-rose-300",
      };
    if (value <= 25)
      return {
        level: "Frágil en el piso",
        detail: "Hay meses con caídas notables respecto al promedio.",
        tone: "text-amber-300",
      };
    if (value <= 50)
      return {
        level: "Variable",
        detail:
          "Caídas moderadas en algunos meses, o aún sin suficientes meses con datos.",
        tone: "text-muted-foreground",
      };
    if (value <= 75)
      return {
        level: "Previsible",
        detail: "Tus meses bajos no se alejan mucho del promedio.",
        tone: "text-emerald-300",
      };
    return {
      level: "Muy previsible",
      detail: "Tus meses bajos están casi pegados al promedio.",
      tone: "text-emerald-300",
    };
  }

  if (key === "expense_stability") {
    if (value <= 0)
      return {
        level: "Muy volátil",
        detail:
          "Hay meses con picos de gasto muy por encima del promedio (>50%). Los meses baratos no penalizan.",
        tone: "text-rose-300",
      };
    if (value <= 25)
      return {
        level: "Con picos",
        detail: "Aparecen picos de gasto notables respecto al promedio.",
        tone: "text-amber-300",
      };
    if (value <= 50)
      return {
        level: "Variable",
        detail:
          "Picos moderados ocasionales, o aún sin suficientes meses con datos.",
        tone: "text-muted-foreground",
      };
    if (value <= 75)
      return {
        level: "Controlado",
        detail: "Tus meses altos no se alejan mucho del promedio.",
        tone: "text-emerald-300",
      };
    return {
      level: "Muy controlado",
      detail: "Casi nunca te pasas del gasto promedio.",
      tone: "text-emerald-300",
    };
  }

  if (key === "liquidity_buffer") {
    if (value === 50)
      return {
        level: "Aún sin historial",
        detail:
          "Necesitamos al menos 60 días de registros para estimar tu reserva acumulada.",
        tone: "text-muted-foreground",
      };
    if (value <= 0)
      return {
        level: "Sin colchón",
        detail: "Tu gasto acumulado supera a tu ingreso acumulado registrado.",
        tone: "text-rose-300",
      };
    if (value <= 15)
      return {
        level: "Muy bajo",
        detail: "Cubres menos de 1 mes de gasto con lo ahorrado.",
        tone: "text-rose-300",
      };
    if (value <= 40)
      return {
        level: "Básico",
        detail: "Entre 1 y 3 meses de gasto cubiertos.",
        tone: "text-amber-300",
      };
    if (value <= 70)
      return {
        level: "Saludable",
        detail: "Entre 3 y 6 meses de gasto cubiertos.",
        tone: "text-emerald-300",
      };
    if (value <= 90)
      return {
        level: "Sólido",
        detail: "Entre 6 y 12 meses de gasto cubiertos.",
        tone: "text-emerald-300",
      };
    return {
      level: "Excepcional",
      detail: "Más de 12 meses de gasto cubiertos.",
      tone: "text-emerald-300",
    };
  }

  if (key === "holdings_appetite") {
    if (value <= 10)
      return {
        level: "Muy defensivo",
        detail: "70%+ de tu portafolio en bonos o instrumentos protegidos.",
        tone: "text-sky-300",
      };
    if (value <= 30)
      return {
        level: "Defensivo",
        detail: "Más de la mitad en activos defensivos.",
        tone: "text-sky-300",
      };
    if (value <= 50)
      return {
        level: "Balanceado",
        detail: "Sin posiciones registradas o mezcla equilibrada.",
        tone: "text-muted-foreground",
      };
    if (value <= 60)
      return {
        level: "Algo agresivo",
        detail: "30%+ del portafolio en acciones o ETFs.",
        tone: "text-amber-300",
      };
    if (value <= 80)
      return {
        level: "Agresivo",
        detail: "Más de la mitad en acciones o ETFs.",
        tone: "text-rose-300",
      };
    return {
      level: "Muy agresivo",
      detail: "70%+ del portafolio en acciones o ETFs.",
      tone: "text-rose-300",
    };
  }

  return { level: "—", detail: "", tone: "text-muted-foreground" };
};

const sourceBadgeStyle = (source: RiskSource): string => {
  switch (source) {
    case "agreement":
      return "border-emerald-500/30 bg-emerald-500/15 text-emerald-300";
    case "safety_cap":
      return "border-amber-500/30 bg-amber-500/15 text-amber-300";
    case "declared":
      return "border-sky-500/30 bg-sky-500/15 text-sky-300";
    case "inferred":
      return "border-violet-500/30 bg-violet-500/15 text-violet-300";
    case "default":
    default:
      return "border-border/60 bg-muted/30 text-muted-foreground";
  }
};

interface DimensionDatum {
  key: string;
  label: string;
  value: number;
}

const buildRadarData = (
  dimensions: RiskDimensions | undefined
): DimensionDatum[] => {
  if (!dimensions) return [];
  return DIMENSION_ORDER.filter((k) => typeof dimensions[k] === "number").map(
    (k) => ({
      key: k,
      label: DIMENSION_LABEL[k] ?? k,
      value: Number(dimensions[k]) || 0,
    })
  );
};

interface RiskProfileCardProps {
  profile: EffectiveProfile;
  isRefreshing: boolean;
  onRefresh: () => void;
}

const ProfileBody = ({
  profile,
  isRefreshing,
  onRefresh,
}: RiskProfileCardProps) => {
  const styles = TOLERANCE_STYLES[profile.tolerance];

  const dimensions =
    profile.inferred?.dimensions ?? profile.declared?.dimensions ?? undefined;
  const radarData = useMemo(() => buildRadarData(dimensions), [dimensions]);

  return (
    <CardContent className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <HoverCard openDelay={150} closeDelay={100}>
            <HoverCardTrigger asChild>
              <button
                type="button"
                aria-label="Ver rangos del puntaje"
                className={`flex h-16 w-16 shrink-0 cursor-help items-center justify-center rounded-2xl border outline-none transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${styles.border} ${styles.bg}`}
              >
                <span className={`text-2xl font-bold ${styles.fg}`}>
                  {profile.score}
                </span>
              </button>
            </HoverCardTrigger>
            <HoverCardContent className="w-[min(18rem,calc(100vw-2rem))]" align="start">
              <p className="text-xs font-medium text-muted-foreground">
                Puntaje del perfil (0 – 100)
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Resulta de combinar las 4 dimensiones del contexto según su
                peso. A mayor número, mayor tolerancia al riesgo.
              </p>
              <div className="mt-3 space-y-1.5 text-xs">
                {SCORE_RANGES.map((r) => (
                  <div
                    key={r.label}
                    className="flex items-center justify-between"
                  >
                    <span className={`font-medium ${r.tone}`}>{r.label}</span>
                    <span className="font-mono text-muted-foreground">
                      {r.range}
                    </span>
                  </div>
                ))}
              </div>
            </HoverCardContent>
          </HoverCard>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className={`text-xl font-semibold ${styles.fg}`}>
                Perfil {TOLERANCE_LABEL[profile.tolerance]}
              </h3>
              <Badge
                variant="outline"
                className={sourceBadgeStyle(profile.source)}
              >
                {SOURCE_LABEL[profile.source]}
              </Badge>
              {profile.user_override && (
                <Badge
                  variant="outline"
                  className="border-border/60 bg-muted/30 text-muted-foreground"
                >
                  <Sparkles className="mr-1 h-3 w-3" />
                  Configurado manualmente
                </Badge>
              )}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Confianza estimada: {formatConfidence(profile.confidence)}
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="glass"
          onClick={onRefresh}
          disabled={isRefreshing}
        >
          {isRefreshing ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="mr-2 h-4 w-4" />
          )}
          Reevaluar
        </Button>
      </div>

      {profile.warning && (
        <div
          className={`flex gap-3 rounded-lg border p-3 ${
            profile.source === "safety_cap"
              ? "border-amber-500/30 bg-amber-500/10"
              : "border-border/60 bg-muted/30"
          }`}
        >
          {profile.source === "safety_cap" ? (
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
          ) : (
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          )}
          <p className="text-sm leading-relaxed text-muted-foreground">
            {profile.warning}
          </p>
        </div>
      )}

      {radarData.length > 0 && (
        <>
          <Separator className="opacity-30" />
          <div>
            <div className="mb-2 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                Dimensiones del contexto
              </span>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    aria-label="Ver qué mide cada dimensión"
                    className="rounded-full p-0.5 text-muted-foreground/70 transition hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2"
                  >
                    <HelpCircle className="h-3.5 w-3.5" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-[min(20rem,calc(100vw-2rem))]" align="start">
                  <p className="text-xs font-medium text-muted-foreground">
                    Cada eje refleja una señal calculada sobre los últimos
                    90 días. El puntaje global pondera las 4:
                  </p>
                  <div className="mt-3 space-y-2 text-xs">
                    {DIMENSION_ORDER.map((k) => {
                      const meta = DIMENSION_META[k];
                      if (!meta) return null;
                      return (
                        <div key={k} className="flex gap-2">
                          <span className="shrink-0 rounded bg-muted/60 px-1.5 py-0.5 font-mono text-[10px]">
                            {meta.weight}%
                          </span>
                          <div>
                            <p className="font-medium">
                              {DIMENSION_LABEL[k] ?? k}
                            </p>
                            <p className="text-muted-foreground">
                              {meta.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} outerRadius="75%">
                  <PolarGrid stroke="hsl(0 0% 22%)" />
                  <PolarAngleAxis
                    dataKey="label"
                    tick={{ fill: "hsl(0 0% 70%)", fontSize: 11 }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={{ fill: "hsl(0 0% 50%)", fontSize: 10 }}
                    stroke="hsl(0 0% 22%)"
                  />
                  <Radar
                    name="Score"
                    dataKey="value"
                    stroke={styles.radar}
                    fill={styles.radar}
                    fillOpacity={0.35}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0 0% 7%)",
                      border: "1px solid hsl(0 0% 14%)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    formatter={(value: number) => [`${value}/100`, "Score"]}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-1 text-center text-xs text-muted-foreground">
              Cada eje refleja una señal calculada sobre los últimos 90 días.
            </p>

            <Collapsible className="mt-3 rounded-lg border border-border/60 bg-muted/20">
              <CollapsibleTrigger asChild>
                <button
                  type="button"
                  className="group flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-xs font-medium text-muted-foreground transition hover:text-foreground"
                >
                  <span className="flex items-center gap-2">
                    <Info className="h-3.5 w-3.5" />
                    ¿Cómo se calculó tu perfil?
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 transition-transform group-data-[state=open]:rotate-180" />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="border-t border-border/60 px-3 py-3 space-y-4">
                  {(profile.inferred || profile.declared) && (
                    <div>
                      <p className="mb-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                        Fuentes combinadas
                      </p>
                      <div className="space-y-1.5 text-xs">
                        {profile.inferred && (
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-muted-foreground">
                              Inferido del contexto
                            </span>
                            <span className="font-mono">
                              <span
                                className={
                                  TOLERANCE_STYLES[profile.inferred.tolerance].fg
                                }
                              >
                                {profile.inferred.score}/100
                              </span>{" "}
                              <span className="text-muted-foreground">
                                · {TOLERANCE_LABEL[profile.inferred.tolerance]}
                              </span>
                            </span>
                          </div>
                        )}
                        {profile.declared && (
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-muted-foreground">
                              Declarado en la encuesta
                            </span>
                            <span className="font-mono">
                              <span
                                className={
                                  TOLERANCE_STYLES[profile.declared.tolerance].fg
                                }
                              >
                                {profile.declared.score}/100
                              </span>{" "}
                              <span className="text-muted-foreground">
                                · {TOLERANCE_LABEL[profile.declared.tolerance]}
                              </span>
                            </span>
                          </div>
                        )}
                        <Separator className="my-2 opacity-30" />
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-medium">
                            Resultado ({SOURCE_LABEL[profile.source].toLowerCase()})
                          </span>
                          <span className="font-mono font-semibold">
                            <span
                              className={TOLERANCE_STYLES[profile.tolerance].fg}
                            >
                              {profile.score}/100
                            </span>{" "}
                            <span className="text-muted-foreground">
                              · {TOLERANCE_LABEL[profile.tolerance]}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="mb-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                      Desglose del contexto
                    </p>
                    <ul className="space-y-3">
                    {radarData.map((d) => {
                      const reading = interpretDimension(d.key, d.value);
                      const meta = DIMENSION_META[d.key];
                      return (
                        <li key={d.key} className="text-xs">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-medium">{d.label}</span>
                            <span className="font-mono text-muted-foreground">
                              {d.value}/100
                            </span>
                          </div>
                          <div className="mt-0.5 flex items-center gap-2">
                            <span className={`font-semibold ${reading.tone}`}>
                              {reading.level}
                            </span>
                            {meta && (
                              <span className="rounded bg-muted/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                                peso {meta.weight}%
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-muted-foreground">
                            {reading.detail}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                  </div>
                  {profile.inferred?.reason && (
                    <div>
                      <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                        Resumen
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {profile.inferred.reason}
                      </p>
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </>
      )}
    </CardContent>
  );
};

const RiskProfileCard = () => {
  const { data, isLoading, isError, refetch } = useEffectiveProfile();
  const refresh = useRefreshEffectiveProfile();

  const handleRefresh = () => {
    refresh.mutate(undefined, {
      onSuccess: () =>
        toast.success("Perfil de inversión reevaluado", {
          description: "Recalculamos las señales sobre los últimos 90 días.",
        }),
      onError: () =>
        toast.error("No se pudo reevaluar el perfil", {
          description: "Intenta de nuevo en unos segundos.",
        }),
    });
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-muted-foreground" />
          Perfil de inversión
        </CardTitle>
        <CardDescription>
          Tu tolerancia al riesgo combinada con la señal automática de tu
          actividad financiera.
        </CardDescription>
      </CardHeader>

      {isLoading ? (
        <CardContent className="space-y-4">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-48 w-full" />
        </CardContent>
      ) : isError || !data ? (
        <CardContent>
          <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border/60 p-6 text-center">
            <AlertTriangle className="h-8 w-8 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">
              No pudimos cargar tu perfil de inversión.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="glass"
              onClick={() => refetch()}
            >
              Reintentar
            </Button>
          </div>
        </CardContent>
      ) : (
        <ProfileBody
          profile={data}
          isRefreshing={refresh.isPending}
          onRefresh={handleRefresh}
        />
      )}
    </Card>
  );
};

export default RiskProfileCard;
