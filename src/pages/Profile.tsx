import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useUser } from "@/store/authStore";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { useAllCurrencies, useCommonCurrencies } from "@/hooks/currencies";
import {
  useGmailStatus,
  useGmailDisconnect,
  useGmailSync,
} from "@/hooks/useGmailStatus";
import WallbitCard from "@/components/dashboard/WallbitCard";
import { gmailService } from "@/services/gmail/gmail";
import { User } from "@/types/auth";
import {
  Mail,
  RefreshCw,
  Unlink,
  CheckCircle,
  AlertCircle,
  Loader2,
  Globe,
  Coins,
  UserIcon,
  Sparkles,
} from "lucide-react";

const TIMEZONES: { value: string; label: string }[] = [
  { value: "America/Bogota", label: "América / Bogotá (COT)" },
  { value: "America/Mexico_City", label: "América / Ciudad de México (CST)" },
  { value: "America/Lima", label: "América / Lima (PET)" },
  { value: "America/Santiago", label: "América / Santiago (CLT)" },
  { value: "America/Buenos_Aires", label: "América / Buenos Aires (ART)" },
  { value: "America/Caracas", label: "América / Caracas (VET)" },
  { value: "America/La_Paz", label: "América / La Paz (BOT)" },
  { value: "America/Montevideo", label: "América / Montevideo (UYT)" },
  { value: "America/Asuncion", label: "América / Asunción (PYT)" },
  { value: "America/Guayaquil", label: "América / Guayaquil (ECT)" },
  { value: "America/New_York", label: "América / Nueva York (EST)" },
  { value: "America/Los_Angeles", label: "América / Los Ángeles (PST)" },
  { value: "Europe/Madrid", label: "Europa / Madrid (CET)" },
  { value: "Europe/London", label: "Europa / Londres (GMT)" },
  { value: "UTC", label: "UTC" },
];

const formatDate = (dateStr: string | null | undefined) => {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const getInitial = (name: string | undefined) => {
  if (!name) return "U";
  const trimmed = name.trim();
  return trimmed ? trimmed[0].toUpperCase() : "U";
};

const getPlatformLabel = (platform?: string) => {
  const p = platform?.toUpperCase();
  if (p === "WHATSAPP") return "WhatsApp";
  if (p === "TELEGRAM") return "Telegram";
  return platform ?? "-";
};

/* ---------------- Account section ---------------- */

type AccountFormProps = { user: User };

const AccountForm = ({ user }: AccountFormProps) => {
  const updateUser = useUpdateUser();
  const [firstName, setFirstName] = useState(user.first_name ?? "");
  const [username, setUsername] = useState(user.username ?? "");

  const dirty =
    firstName !== (user.first_name ?? "") ||
    username !== (user.username ?? "");

  const handleSave = () => {
    updateUser.mutate(
      { first_name: firstName.trim(), username: username.trim() },
      {
        onSuccess: () => toast.success("Información personal actualizada"),
        onError: () => toast.error("No se pudieron guardar los cambios"),
      }
    );
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserIcon className="h-5 w-5 text-muted-foreground" />
          Información personal
        </CardTitle>
        <CardDescription>
          Actualiza tu nombre y el alias que te identifica.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="first_name">Nombre</Label>
            <Input
              id="first_name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Tu nombre"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Usuario</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Alias o nombre de usuario"
            />
          </div>
        </div>

        <Separator className="opacity-30" />

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="text-muted-foreground">
              Método de autenticación
            </Label>
            <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-muted/30 px-3 py-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-background">
                <Mail className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">
                  {getPlatformLabel(user.platform)}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {user.phone_number ? `+${user.phone_number}` : "-"}
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-muted-foreground">ID de cuenta</Label>
            <div className="flex items-center rounded-lg border border-border/60 bg-muted/30 px-3 py-2.5">
              <code className="truncate font-mono text-xs text-muted-foreground">
                {user.external_id ?? "-"}
              </code>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <Button
            onClick={handleSave}
            disabled={!dirty || updateUser.isPending}
            className="bg-[var(--color-trii-green)] text-black hover:opacity-90"
          >
            {updateUser.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Guardar cambios
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

/* ---------------- Preferences section ---------------- */

type PreferencesFormProps = { user: User };

const PreferencesForm = ({ user }: PreferencesFormProps) => {
  const updateUser = useUpdateUser();
  const { data: commonCurrencies = [] } = useCommonCurrencies();
  const { data: allCurrencies = [] } = useAllCurrencies();

  const [timezone, setTimezone] = useState(user.timezone ?? "America/Bogota");
  const [currency, setCurrency] = useState(user.default_currency ?? "USD");

  const currencyOptions = useMemo(() => {
    const commonCodes = new Set(commonCurrencies.map((c) => c.code));
    const rest = allCurrencies.filter((c) => !commonCodes.has(c.code));
    return { common: commonCurrencies, rest };
  }, [commonCurrencies, allCurrencies]);

  const dirty =
    timezone !== (user.timezone ?? "America/Bogota") ||
    currency !== (user.default_currency ?? "USD");

  const handleSave = () => {
    updateUser.mutate(
      { timezone, default_currency: currency },
      {
        onSuccess: () => toast.success("Preferencias actualizadas"),
        onError: () => toast.error("No se pudieron guardar las preferencias"),
      }
    );
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-muted-foreground" />
          Preferencias
        </CardTitle>
        <CardDescription>
          Configura la zona horaria y la moneda por defecto usadas en todos tus
          reportes.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="timezone" className="flex items-center gap-2">
              <Globe className="h-3.5 w-3.5 text-muted-foreground" />
              Zona horaria
            </Label>
            <Select value={timezone} onValueChange={setTimezone}>
              <SelectTrigger id="timezone">
                <SelectValue placeholder="Selecciona una zona horaria" />
              </SelectTrigger>
              <SelectContent>
                {TIMEZONES.map((tz) => (
                  <SelectItem key={tz.value} value={tz.value}>
                    {tz.label}
                  </SelectItem>
                ))}
                {user.timezone &&
                  !TIMEZONES.some((t) => t.value === user.timezone) && (
                    <SelectItem value={user.timezone}>
                      {user.timezone}
                    </SelectItem>
                  )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency" className="flex items-center gap-2">
              <Coins className="h-3.5 w-3.5 text-muted-foreground" />
              Moneda por defecto
            </Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger id="currency">
                <SelectValue placeholder="Selecciona una moneda" />
              </SelectTrigger>
              <SelectContent className="max-h-72">
                {currencyOptions.common.length > 0 && (
                  <>
                    {currencyOptions.common.map((c) => (
                      <SelectItem key={c.code} value={c.code}>
                        <span className="mr-2">{c.flag}</span>
                        {c.code} — {c.name}
                      </SelectItem>
                    ))}
                    {currencyOptions.rest.length > 0 && (
                      <div className="my-1 h-px bg-border" />
                    )}
                  </>
                )}
                {currencyOptions.rest.map((c) => (
                  <SelectItem key={c.code} value={c.code}>
                    {c.code} — {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <Button
            onClick={handleSave}
            disabled={!dirty || updateUser.isPending}
            className="bg-[var(--color-trii-green)] text-black hover:opacity-90"
          >
            {updateUser.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Guardar preferencias
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

/* ---------------- Connections (Gmail) section ---------------- */

const ConnectionsCard = () => {
  const { data: gmailStatus, isLoading: gmailLoading } = useGmailStatus();
  const disconnectMutation = useGmailDisconnect();
  const syncMutation = useGmailSync();

  const [connectingGmail, setConnectingGmail] = useState(false);
  const [showDisconnectConfirm, setShowDisconnectConfirm] = useState(false);

  const handleConnectGmail = async () => {
    setConnectingGmail(true);
    try {
      const response = await gmailService.getOAuthUrl();
      window.location.href = response.auth_url;
    } catch {
      toast.error("Error al obtener URL de autorización", {
        description: "No se pudo iniciar el proceso de conexión con Gmail.",
      });
      setConnectingGmail(false);
    }
  };

  const handleDisconnect = () => {
    disconnectMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Gmail desconectado");
        setShowDisconnectConfirm(false);
      },
      onError: () => toast.error("Error al desconectar Gmail"),
    });
  };

  const handleSync = () => {
    syncMutation.mutate(undefined, {
      onSuccess: () =>
        toast.success("Sincronización iniciada", {
          description: "Los correos nuevos serán procesados en unos momentos.",
        }),
      onError: () =>
        toast.error("Error al sincronizar", {
          description: "No se pudo iniciar la sincronización.",
        }),
    });
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-blue-400" />
          Conexiones
        </CardTitle>
        <CardDescription>
          Integra tu Gmail para detectar compras desde correos de confirmación.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {gmailLoading ? (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : gmailStatus?.connected ? (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-sm font-medium text-green-400">
                  Conectado
                </span>
              </div>
              <span className="truncate text-sm text-muted-foreground">
                {gmailStatus.google_email}
              </span>
            </div>

            <div className="space-y-3 rounded-lg border border-border/60 bg-muted/20 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Conectado desde
                </span>
                <span className="text-sm">
                  {formatDate(gmailStatus.connected_at)}
                </span>
              </div>
              <Separator className="opacity-30" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Monitoreo en tiempo real
                </span>
                {gmailStatus.watch_active ? (
                  <Badge className="border-green-500/30 bg-green-500/20 text-xs text-green-400">
                    Activo
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="text-xs">
                    Inactivo
                  </Badge>
                )}
              </div>
              {gmailStatus.watch_expires && (
                <>
                  <Separator className="opacity-30" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Monitoreo expira
                    </span>
                    <span className="text-sm">
                      {formatDate(gmailStatus.watch_expires)}
                    </span>
                  </div>
                </>
              )}
              <Separator className="opacity-30" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Última sincronización
                </span>
                <span className="text-sm">
                  {formatDate(gmailStatus.last_sync)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg border border-border/60 bg-muted/20 p-3 text-center">
                <p className="text-xl font-bold">
                  {gmailStatus.total_emails_processed}
                </p>
                <p className="text-xs text-muted-foreground">
                  Correos procesados
                </p>
              </div>
              <div className="rounded-lg border border-border/60 bg-muted/20 p-3 text-center">
                <p className="text-xl font-bold text-green-400">
                  {gmailStatus.total_purchases_detected}
                </p>
                <p className="text-xs text-muted-foreground">
                  Compras detectadas
                </p>
              </div>
              <div className="rounded-lg border border-border/60 bg-muted/20 p-3 text-center">
                <p
                  className={`text-xl font-bold ${
                    gmailStatus.pending_categorization > 0
                      ? "text-yellow-400"
                      : ""
                  }`}
                >
                  {gmailStatus.pending_categorization}
                </p>
                <p className="text-xs text-muted-foreground">Pendientes</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                size="sm"
                className="glass"
                onClick={handleSync}
                disabled={syncMutation.isPending}
              >
                {syncMutation.isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="mr-2 h-4 w-4" />
                )}
                Sincronizar
              </Button>
              {showDisconnectConfirm ? (
                <div className="flex items-center gap-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleDisconnect}
                    disabled={disconnectMutation.isPending}
                  >
                    {disconnectMutation.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Unlink className="mr-2 h-4 w-4" />
                    )}
                    Confirmar
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDisconnectConfirm(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                  onClick={() => setShowDisconnectConfirm(true)}
                >
                  <Unlink className="mr-2 h-4 w-4" />
                  Desconectar
                </Button>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">No conectado</span>
            </div>
            <div className="rounded-lg border border-dashed border-border/60 p-6 text-center">
              <Mail className="mx-auto mb-3 h-10 w-10 text-muted-foreground/50" />
              <p className="mb-1 text-sm text-muted-foreground">
                Conecta tu cuenta de Gmail para que detectemos automáticamente
                tus compras a partir de correos de confirmación.
              </p>
              <p className="mb-4 text-xs text-muted-foreground/70">
                Solo leemos correos relacionados con compras. Tu privacidad es
                nuestra prioridad.
              </p>
              <Button
                onClick={handleConnectGmail}
                disabled={connectingGmail}
                className="bg-blue-500 hover:bg-blue-600"
              >
                {connectingGmail ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Mail className="mr-2 h-4 w-4" />
                )}
                Conectar Gmail
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

/* ---------------- Page ---------------- */

const Profile = () => {
  const user = useUser();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const gmailParam = searchParams.get("gmail");
    if (gmailParam === "connected") {
      toast.success("Gmail conectado exitosamente", {
        description: "Tus correos serán procesados automáticamente.",
      });
      setSearchParams({}, { replace: true });
    } else if (gmailParam === "error") {
      toast.error("Error al conectar Gmail", {
        description: "No se pudo completar la autorización. Intenta de nuevo.",
      });
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  if (!user) {
    return (
      <DashboardLayout>
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </DashboardLayout>
    );
  }

  const planName = user.subscription_plan_details?.name;

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-4xl space-y-6">
        {/* Hero / Identity */}
        <Card className="glass-card overflow-hidden">
          <CardContent className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:gap-6">
            <div
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl font-display text-3xl font-bold"
              style={{
                background:
                  "linear-gradient(135deg, hsl(152 100% 50% / 0.25), hsl(152 100% 50% / 0.05))",
                color: "var(--color-trii-green)",
                border: "1px solid hsl(152 100% 50% / 0.3)",
              }}
            >
              {getInitial(user.first_name || user.username)}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="truncate text-2xl font-bold tracking-tight sm:text-3xl">
                  {user.first_name || user.username || "Usuario"}
                </h1>
                {planName && (
                  <Badge className="border-green-500/30 bg-green-500/15 text-green-400">
                    <Sparkles className="mr-1 h-3 w-3" />
                    {planName}
                  </Badge>
                )}
              </div>
              <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                {user.phone_number && <span>+{user.phone_number}</span>}
                {user.phone_number && <span className="opacity-40">•</span>}
                <span>Vía {getPlatformLabel(user.platform)}</span>
                {user.created_at && (
                  <>
                    <span className="opacity-40">•</span>
                    <span>Miembro desde {formatDate(user.created_at)}</span>
                  </>
                )}
              </p>
            </div>
          </CardContent>
        </Card>

        <AccountForm key={`account-${user.id}-${user.updated_at}`} user={user} />
        <PreferencesForm
          key={`prefs-${user.id}-${user.updated_at}`}
          user={user}
        />
        <ConnectionsCard />
        <WallbitCard />
      </div>
    </DashboardLayout>
  );
};

export default Profile;
