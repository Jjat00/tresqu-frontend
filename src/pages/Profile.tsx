
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useGmailStatus, useGmailDisconnect, useGmailSync } from "@/hooks/useGmailStatus";
import { gmailService } from "@/services/gmail/gmail";
import { Mail, RefreshCw, Unlink, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const Profile = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(() => {
    return searchParams.get("tab") === "connections" ? "connections" : "personal";
  });
  const [notifications, setNotifications] = useState(true);
  const [connectingGmail, setConnectingGmail] = useState(false);
  const [showDisconnectConfirm, setShowDisconnectConfirm] = useState(false);

  const { data: gmailStatus, isLoading: gmailLoading } = useGmailStatus();
  const disconnectMutation = useGmailDisconnect();
  const syncMutation = useGmailSync();

  // Handle OAuth callback query params
  useEffect(() => {
    const gmailParam = searchParams.get("gmail");
    if (gmailParam === "connected") {
      toast.success("Gmail conectado exitosamente", {
        description: "Tus correos seran procesados automaticamente.",
      });
      setActiveTab("connections");
      setSearchParams({}, { replace: true });
    } else if (gmailParam === "error") {
      toast.error("Error al conectar Gmail", {
        description: "No se pudo completar la autorizacion. Intenta de nuevo.",
      });
      setActiveTab("connections");
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  // Handle tab param from navigation
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "connections") {
      setActiveTab("connections");
      // Clean up the tab param
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("tab");
      setSearchParams(newParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleConnectGmail = async () => {
    setConnectingGmail(true);
    try {
      const response = await gmailService.getOAuthUrl();
      window.location.href = response.auth_url;
    } catch {
      toast.error("Error al obtener URL de autorizacion", {
        description: "No se pudo iniciar el proceso de conexion con Gmail.",
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
      onError: () => {
        toast.error("Error al desconectar Gmail");
      },
    });
  };

  const handleSync = () => {
    syncMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Sincronizacion iniciada", {
          description: "Los correos nuevos seran procesados en unos momentos.",
        });
      },
      onError: () => {
        toast.error("Error al sincronizar", {
          description: "No se pudo iniciar la sincronizacion.",
        });
      },
    });
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mi Perfil</h1>
          <p className="text-muted-foreground">
            Administra tu información personal y preferencias.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="personal">Información Personal</TabsTrigger>
            <TabsTrigger value="preferences">Preferencias</TabsTrigger>
            <TabsTrigger value="connections">Conexiones</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Información Personal</CardTitle>
                <CardDescription>
                  Actualiza tus datos personales y método de autenticación.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input id="name" defaultValue="Carlos Rodríguez" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input id="email" type="email" defaultValue="carlos@ejemplo.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="auth-method">Método de autenticación</Label>
                  <div className="flex items-center gap-4 rounded-md border p-4">
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <p className="text-sm text-muted-foreground">+52 55 1234 5678</p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto">Cambiar</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-success hover:bg-success/90">Guardar cambios</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Preferencias</CardTitle>
                <CardDescription>
                  Personaliza la app según tus preferencias.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <Select defaultValue="es">
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Selecciona un idioma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Zona horaria</Label>
                  <Select defaultValue="america-mexico_city">
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Selecciona una zona horaria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="america-mexico_city">América/Ciudad de México</SelectItem>
                      <SelectItem value="america-bogota">América/Bogotá</SelectItem>
                      <SelectItem value="america-buenos_aires">América/Buenos Aires</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notifications">Notificaciones</Label>
                    <Switch
                      id="notifications"
                      checked={notifications}
                      onCheckedChange={setNotifications}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Recibe recordatorios de pagos, alertas y consejos personalizados.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-success hover:bg-success/90">Guardar cambios</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="connections">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-blue-400" />
                  Google Gmail
                </CardTitle>
                <CardDescription>
                  Conecta tu Gmail para detectar compras automaticamente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {gmailLoading ? (
                  <div className="flex items-center justify-center py-6">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : gmailStatus?.connected ? (
                  <>
                    {/* Connection info */}
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-sm font-medium text-green-400">
                        Conectado
                      </span>
                    </div>

                    <div className="space-y-3 rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Cuenta</span>
                        <span className="text-sm font-medium">
                          {gmailStatus.google_email}
                        </span>
                      </div>
                      <Separator className="opacity-30" />
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Conectado desde</span>
                        <span className="text-sm">
                          {formatDate(gmailStatus.connected_at)}
                        </span>
                      </div>
                      <Separator className="opacity-30" />
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Monitoreo en tiempo real</span>
                        {gmailStatus.watch_active ? (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
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
                            <span className="text-sm text-muted-foreground">Monitoreo expira</span>
                            <span className="text-sm">
                              {formatDate(gmailStatus.watch_expires)}
                            </span>
                          </div>
                        </>
                      )}
                      <Separator className="opacity-30" />
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Ultima sincronizacion</span>
                        <span className="text-sm">
                          {formatDate(gmailStatus.last_sync)}
                        </span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="rounded-md border p-3 text-center">
                        <p className="text-xl font-bold">
                          {gmailStatus.total_emails_processed}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Correos procesados
                        </p>
                      </div>
                      <div className="rounded-md border p-3 text-center">
                        <p className="text-xl font-bold text-green-400">
                          {gmailStatus.total_purchases_detected}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Compras detectadas
                        </p>
                      </div>
                      <div className="rounded-md border p-3 text-center">
                        <p
                          className={`text-xl font-bold ${
                            gmailStatus.pending_categorization > 0
                              ? "text-yellow-400"
                              : ""
                          }`}
                        >
                          {gmailStatus.pending_categorization}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Pendientes
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="glass"
                        onClick={handleSync}
                        disabled={syncMutation.isPending}
                      >
                        {syncMutation.isPending ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <RefreshCw className="h-4 w-4 mr-2" />
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
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <Unlink className="h-4 w-4 mr-2" />
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
                          <Unlink className="h-4 w-4 mr-2" />
                          Desconectar
                        </Button>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    {/* Not connected state */}
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        No conectado
                      </span>
                    </div>

                    <div className="rounded-md border border-dashed p-6 text-center">
                      <Mail className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground mb-1">
                        Conecta tu cuenta de Gmail para que detectemos automaticamente
                        tus compras a partir de correos de confirmacion.
                      </p>
                      <p className="text-xs text-muted-foreground/70 mb-4">
                        Solo leemos correos relacionados con compras. Tu privacidad es nuestra prioridad.
                      </p>
                      <Button
                        onClick={handleConnectGmail}
                        disabled={connectingGmail}
                        className="bg-blue-500 hover:bg-blue-600"
                      >
                        {connectingGmail ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Mail className="h-4 w-4 mr-2" />
                        )}
                        Conectar Gmail
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
