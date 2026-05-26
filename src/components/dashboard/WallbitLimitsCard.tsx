import { useEffect, useMemo, useState, type KeyboardEvent } from "react";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { Loader2, ShieldCheck, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  useAgentLimits,
  useUpdateAgentLimits,
} from "@/hooks/useAgentLimits";
import type { AgentLimits } from "@/types/wallbit";

type NumericField =
  | "max_trade_usd"
  | "max_daily_move_usd"
  | "require_2step_above_usd";

type SymbolField = "allowed_symbols" | "blocked_symbols";

interface FormState {
  max_trade_usd: string;
  max_daily_move_usd: string;
  require_2step_above_usd: string;
  allowed_symbols: string[];
  blocked_symbols: string[];
}

const EMPTY_FORM: FormState = {
  max_trade_usd: "500",
  max_daily_move_usd: "1000",
  require_2step_above_usd: "200",
  allowed_symbols: [],
  blocked_symbols: [],
};

const stripTrailingZeros = (value: string): string => {
  if (!value.includes(".")) return value;
  return value.replace(/\.?0+$/, "") || "0";
};

const hydrate = (data: AgentLimits | undefined): FormState => {
  if (!data) return EMPTY_FORM;
  return {
    max_trade_usd: stripTrailingZeros(data.max_trade_usd),
    max_daily_move_usd: stripTrailingZeros(data.max_daily_move_usd),
    require_2step_above_usd: stripTrailingZeros(data.require_2step_above_usd),
    allowed_symbols: [...(data.allowed_symbols ?? [])],
    blocked_symbols: [...(data.blocked_symbols ?? [])],
  };
};

const WallbitLimitsCard = () => {
  const { data: limits, isLoading } = useAgentLimits();
  const update = useUpdateAgentLimits();

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [allowedDraft, setAllowedDraft] = useState("");
  const [blockedDraft, setBlockedDraft] = useState("");

  useEffect(() => {
    if (limits) setForm(hydrate(limits));
  }, [limits]);

  const updateError = useMemo(() => {
    if (!update.error) return null;
    const err = update.error as AxiosError<Record<string, string[] | string>>;
    const payload = err.response?.data;
    if (!payload) return "No se pudieron guardar los límites.";
    const first = Object.entries(payload)[0];
    if (!first) return "No se pudieron guardar los límites.";
    const [field, value] = first;
    const message = Array.isArray(value) ? value[0] : value;
    return `${field}: ${message}`;
  }, [update.error]);

  const setNumeric = (field: NumericField, value: string) => {
    if (value === "" || /^\d+(\.\d{0,2})?$/.test(value)) {
      setForm((prev) => ({ ...prev, [field]: value }));
    }
  };

  const addSymbol = (field: SymbolField, draft: string) => {
    const symbol = draft.trim().toUpperCase();
    if (!symbol) return;
    setForm((prev) => {
      if (prev[field].includes(symbol)) return prev;
      return { ...prev, [field]: [...prev[field], symbol] };
    });
    if (field === "allowed_symbols") setAllowedDraft("");
    else setBlockedDraft("");
  };

  const removeSymbol = (field: SymbolField, symbol: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((s) => s !== symbol),
    }));
  };

  const handleSymbolKey = (
    field: SymbolField,
    draft: string,
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addSymbol(field, draft);
    }
  };

  const handleSubmit = async () => {
    const maxTrade = parseFloat(form.max_trade_usd || "0");
    const maxDaily = parseFloat(form.max_daily_move_usd || "0");
    const twoStep = parseFloat(form.require_2step_above_usd || "0");

    if (maxTrade <= 0) {
      toast.error("El tope por operación debe ser mayor a 0.");
      return;
    }
    if (maxDaily < maxTrade) {
      toast.error("El tope diario no puede ser menor al tope por operación.");
      return;
    }
    if (twoStep < 0) {
      toast.error("El umbral de doble confirmación no puede ser negativo.");
      return;
    }

    try {
      await update.mutateAsync({
        max_trade_usd: form.max_trade_usd,
        max_daily_move_usd: form.max_daily_move_usd,
        require_2step_above_usd: form.require_2step_above_usd,
        allowed_symbols: form.allowed_symbols,
        blocked_symbols: form.blocked_symbols,
      });
      toast.success("Límites actualizados.");
    } catch {
      // Error renders via updateError memo
    }
  };

  const dirty = useMemo(() => {
    if (!limits) return false;
    const baseline = hydrate(limits);
    return (
      baseline.max_trade_usd !== form.max_trade_usd ||
      baseline.max_daily_move_usd !== form.max_daily_move_usd ||
      baseline.require_2step_above_usd !== form.require_2step_above_usd ||
      baseline.allowed_symbols.join(",") !== form.allowed_symbols.join(",") ||
      baseline.blocked_symbols.join(",") !== form.blocked_symbols.join(",")
    );
  }, [form, limits]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-md bg-[#00FF7F]/10 border border-[#00FF7F]/30 flex items-center justify-center text-[#00FF7F] flex-shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <CardTitle>Límites del agente</CardTitle>
            <CardDescription>
              Define cuánto puede mover el agente por operación y por día, y
              qué símbolos puede o no tocar. Se aplican a trades, movimientos y
              aportes a Chests.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {isLoading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            Cargando límites...
          </div>
        ) : (
          <>
            {/* Numeric limits grid */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="max_trade_usd">Tope por operación (USD)</Label>
                <Input
                  id="max_trade_usd"
                  type="text"
                  inputMode="decimal"
                  value={form.max_trade_usd}
                  onChange={(e) => setNumeric("max_trade_usd", e.target.value)}
                  placeholder="500"
                />
                <p className="text-xs text-muted-foreground">
                  Máximo USD por trade o movimiento individual.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="max_daily_move_usd">Tope diario (USD)</Label>
                <Input
                  id="max_daily_move_usd"
                  type="text"
                  inputMode="decimal"
                  value={form.max_daily_move_usd}
                  onChange={(e) =>
                    setNumeric("max_daily_move_usd", e.target.value)
                  }
                  placeholder="1000"
                />
                <p className="text-xs text-muted-foreground">
                  Suma máxima en una ventana de 24 horas.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="require_2step_above_usd">
                  Doble confirmación desde (USD)
                </Label>
                <Input
                  id="require_2step_above_usd"
                  type="text"
                  inputMode="decimal"
                  value={form.require_2step_above_usd}
                  onChange={(e) =>
                    setNumeric("require_2step_above_usd", e.target.value)
                  }
                  placeholder="200"
                />
                <p className="text-xs text-muted-foreground">
                  Operaciones mayores requieren confirmación reforzada.
                </p>
              </div>
            </div>

            {/* Allowed symbols */}
            <div className="space-y-2">
              <Label htmlFor="allowed_symbols">Símbolos permitidos</Label>
              <div className="flex gap-2">
                <Input
                  id="allowed_symbols"
                  value={allowedDraft}
                  onChange={(e) => setAllowedDraft(e.target.value)}
                  onKeyDown={(e) =>
                    handleSymbolKey("allowed_symbols", allowedDraft, e)
                  }
                  placeholder="AAPL, VOO, SPY..."
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addSymbol("allowed_symbols", allowedDraft)}
                  disabled={!allowedDraft.trim()}
                >
                  Agregar
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Si dejas la lista vacía, el agente puede operar cualquier
                símbolo (salvo los bloqueados).
              </p>
              {form.allowed_symbols.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {form.allowed_symbols.map((symbol) => (
                    <Badge
                      key={symbol}
                      variant="secondary"
                      className="gap-1 pr-1"
                    >
                      {symbol}
                      <button
                        type="button"
                        onClick={() =>
                          removeSymbol("allowed_symbols", symbol)
                        }
                        className="rounded-sm hover:bg-muted-foreground/20 p-0.5"
                        aria-label={`Quitar ${symbol}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Blocked symbols */}
            <div className="space-y-2">
              <Label htmlFor="blocked_symbols">Símbolos bloqueados</Label>
              <div className="flex gap-2">
                <Input
                  id="blocked_symbols"
                  value={blockedDraft}
                  onChange={(e) => setBlockedDraft(e.target.value)}
                  onKeyDown={(e) =>
                    handleSymbolKey("blocked_symbols", blockedDraft, e)
                  }
                  placeholder="TSLA, GME..."
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addSymbol("blocked_symbols", blockedDraft)}
                  disabled={!blockedDraft.trim()}
                >
                  Agregar
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                El agente rechazará cualquier operación sobre estos símbolos.
              </p>
              {form.blocked_symbols.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {form.blocked_symbols.map((symbol) => (
                    <Badge
                      key={symbol}
                      variant="destructive"
                      className="gap-1 pr-1"
                    >
                      {symbol}
                      <button
                        type="button"
                        onClick={() =>
                          removeSymbol("blocked_symbols", symbol)
                        }
                        className="rounded-sm hover:bg-destructive-foreground/20 p-0.5"
                        aria-label={`Quitar ${symbol}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {updateError && (
              <p className="text-sm text-destructive">{updateError}</p>
            )}

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => limits && setForm(hydrate(limits))}
                disabled={!dirty || update.isPending}
              >
                Descartar
              </Button>
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={!dirty || update.isPending}
              >
                {update.isPending && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                Guardar límites
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default WallbitLimitsCard;
