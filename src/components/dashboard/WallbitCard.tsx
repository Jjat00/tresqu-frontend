import { useMemo, useState } from "react";
import { AxiosError } from "axios";
import { toast } from "sonner";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  useWallbitConnect,
  useWallbitDisconnect,
  useWallbitPause,
  useWallbitResume,
  useWallbitStatus,
} from "@/hooks/useWallbitStatus";

import {
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  KeyRound,
  Loader2,
  Pause,
  Play,
  ShieldAlert,
  Wallet,
} from "lucide-react";

const PAUSE_OPTIONS: Array<{ hours: number; label: string }> = [
  { hours: 1, label: "1 hora" },
  { hours: 6, label: "6 horas" },
  { hours: 24, label: "24 horas" },
  { hours: 72, label: "3 días" },
  { hours: 168, label: "1 semana" },
];

const formatDate = (value?: string | null) => {
  if (!value) return "-";
  return new Date(value).toLocaleString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const statusBadge = (status?: string) => {
  switch (status) {
    case "connected":
      return (
        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
          Conectada
        </Badge>
      );
    case "revoked":
      return (
        <Badge className="bg-muted text-muted-foreground">Revocada</Badge>
      );
    case "error":
      return <Badge variant="destructive">Error</Badge>;
    default:
      return <Badge variant="secondary">Sin conexión</Badge>;
  }
};

const WallbitCard = () => {
  const { data: status, isLoading } = useWallbitStatus();
  const connect = useWallbitConnect();
  const disconnect = useWallbitDisconnect();
  const pause = useWallbitPause();
  const resume = useWallbitResume();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");

  const isConnected = status?.connected === true;

  const killSwitchUntil = status?.kill_switch_until ?? null;
  const pausedUntil = useMemo(() => {
    if (!killSwitchUntil) return null;
    const when = new Date(killSwitchUntil);
    return when > new Date() ? when : null;
  }, [killSwitchUntil]);
  const isPaused = pausedUntil !== null;

  const handlePause = async (hours: number) => {
    try {
      await pause.mutateAsync(hours);
      toast.success(
        `Agente pausado por ${
          PAUSE_OPTIONS.find((opt) => opt.hours === hours)?.label ?? `${hours}h`
        }.`,
      );
    } catch {
      toast.error("No se pudo pausar el agente.");
    }
  };

  const handleResume = async () => {
    if (
      !window.confirm(
        "¿Reanudar el agente ahora? Volverá a poder ejecutar operaciones de Wallbit propuestas en el chat (cada operación sigue requiriendo tu confirmación).",
      )
    ) {
      return;
    }
    try {
      await resume.mutateAsync();
      toast.success("Agente reanudado.");
    } catch {
      toast.error("No se pudo reanudar el agente.");
    }
  };

  const connectError = useMemo(() => {
    if (!connect.error) return null;
    const err = connect.error as AxiosError<{ detail?: string }>;
    return err.response?.data?.detail ?? "No se pudo validar la API key.";
  }, [connect.error]);

  const handleConnect = async () => {
    const trimmed = apiKey.trim();
    if (trimmed.length < 10) {
      toast.error("La API key parece demasiado corta.");
      return;
    }
    try {
      await connect.mutateAsync({ api_key: trimmed });
      toast.success("Wallbit conectado correctamente.");
      setDialogOpen(false);
    } catch {
      /* error visible inline */
    }
  };

  const handleDisconnect = async () => {
    if (
      !window.confirm(
        "¿Desconectar Wallbit? La API key cifrada se marca como revocada y el agente deja de poder operar.",
      )
    ) {
      return;
    }
    try {
      await disconnect.mutateAsync();
      toast.success("Wallbit desconectado.");
    } catch {
      toast.error("No se pudo desconectar.");
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader className="flex flex-row items-start justify-between">
        <div className="flex items-center gap-3">
          <div>
            <img
              src="/wallbit_logo.png"
              alt="Wallbit"
              className="h-6 w-auto mb-1.5"
            />
            <CardTitle className="sr-only">Wallbit</CardTitle>
            <CardDescription>
              Conecta tu cuenta para consultar saldos, transacciones y
              operar desde el chat.
            </CardDescription>
          </div>
        </div>
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        ) : (
          statusBadge(status?.status)
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {isConnected ? (
          <>
            {isPaused && (
              <Alert className="border-amber-500/40 bg-amber-500/10 text-amber-200">
                <Pause className="h-4 w-4" />
                <AlertTitle>Agente pausado</AlertTitle>
                <AlertDescription>
                  El asistente no ejecutará operaciones en Wallbit hasta{" "}
                  <strong>{formatDate(pausedUntil!.toISOString())}</strong>.
                  Esto no afecta lo que hagas tú directamente desde la app
                  de Wallbit.
                </AlertDescription>
              </Alert>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground">Conectada el</p>
                <p className="font-medium">{formatDate(status?.connected_at)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Último sync</p>
                <p className="font-medium">{formatDate(status?.last_sync_at)}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-muted-foreground">Scopes</p>
                <p className="font-medium">{status?.scope_hint ?? "-"}</p>
              </div>
            </div>
          </>
        ) : status?.status === "error" && status?.last_error ? (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Hay un problema con tu conexión</AlertTitle>
            <AlertDescription className="break-all">
              {status.last_error}
            </AlertDescription>
          </Alert>
        ) : (
          <p className="text-sm text-muted-foreground">
            Necesitas una API key con scopes <code>read</code> y{" "}
            <code>trade</code> generada desde tu panel de Wallbit.
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          {isConnected ? (
            <>
              {isPaused ? (
                <Button
                  variant="default"
                  onClick={handleResume}
                  disabled={resume.isPending}
                >
                  {resume.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Play className="h-4 w-4 mr-2" />
                  )}
                  Reanudar agente
                </Button>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      disabled={pause.isPending}
                    >
                      {pause.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <Pause className="h-4 w-4 mr-2" />
                      )}
                      Pausar agente
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuLabel>
                      Pausa el agente por...
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {PAUSE_OPTIONS.map((opt) => (
                      <DropdownMenuItem
                        key={opt.hours}
                        onSelect={() => handlePause(opt.hours)}
                      >
                        {opt.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              <Button
                variant="outline"
                onClick={() => setDialogOpen(true)}
              >
                Reemplazar API key
              </Button>
              <Button
                variant="destructive"
                onClick={handleDisconnect}
                disabled={disconnect.isPending}
              >
                {disconnect.isPending && (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                )}
                Desconectar
              </Button>
            </>
          ) : (
            <Button onClick={() => setDialogOpen(true)}>
              Conectar Wallbit
            </Button>
          )}
        </div>
      </CardContent>

      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setApiKey("");
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-wallbit" />
              Conectar Wallbit
            </DialogTitle>
            <DialogDescription>
              Pega aquí tu API key. La validamos contra Wallbit y la
              guardamos cifrada — Tresqu nunca la muestra de vuelta.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="rounded-lg border border-border/60 bg-muted/30 p-3 text-xs">
              <p className="flex items-center gap-1.5 font-medium text-foreground">
                <KeyRound className="h-3.5 w-3.5" /> ¿De dónde saco la API key?
              </p>
              <ol className="mt-1.5 list-decimal space-y-0.5 pl-4 text-muted-foreground">
                <li>
                  Entra al{" "}
                  <a
                    href="https://developer.wallbit.io/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-foreground underline underline-offset-2"
                  >
                    panel de Wallbit
                  </a>{" "}
                  e inicia sesión.
                </li>
                <li>
                  Ve a <strong>Agents</strong> y pulsa <strong>Create agent</strong>.
                </li>
                <li>
                  Marca los permisos <strong>read</strong> y <strong>trade</strong>.
                </li>
                <li>Copia la key y pégala aquí — Wallbit solo la muestra una vez.</li>
              </ol>
              <a
                href="https://developer.wallbit.io/docs/quickstart#create-an-api-key"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 font-medium text-wallbit underline underline-offset-2"
              >
                Ver la guía oficial <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <Alert>
              <ShieldAlert className="h-4 w-4" />
              <AlertTitle>Antes de generarla</AlertTitle>
              <AlertDescription>
                Sin IP whitelist (o agrega la IP de tu servidor Tresqu) para
                evitar 401 silenciosos.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="wallbit-api-key">Wallbit API key</Label>
              <Input
                id="wallbit-api-key"
                type="password"
                autoComplete="off"
                placeholder="wbk_..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                disabled={connect.isPending}
              />
            </div>

            {connectError && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{connectError}</AlertDescription>
              </Alert>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setDialogOpen(false)}
              disabled={connect.isPending}
            >
              Cancelar
            </Button>
            <Button onClick={handleConnect} disabled={connect.isPending}>
              {connect.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Validando…
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Conectar
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default WallbitCard;
