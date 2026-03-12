import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Link2,
  ShoppingCart,
  AlertTriangle,
  Mail,
  Settings,
  Loader2,
} from "lucide-react";
import { useGmailStatus, useProcessedEmails } from "@/hooks/useGmailStatus";

const IntegrationsTab = () => {
  const navigate = useNavigate();
  const { data: status, isLoading: statusLoading } = useGmailStatus();
  const { data: emailsData, isLoading: emailsLoading } = useProcessedEmails();

  const connectedCount = status?.connected ? 1 : 0;

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusBadge = (email: {
    processing_status: string;
    is_purchase: boolean;
    awaiting_categorization: boolean;
  }) => {
    if (email.processing_status === "error") {
      return (
        <Badge variant="destructive" className="text-xs">
          Error
        </Badge>
      );
    }
    if (email.processing_status === "pending" || email.awaiting_categorization) {
      return (
        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
          Pendiente
        </Badge>
      );
    }
    if (email.is_purchase) {
      return (
        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
          Compra detectada
        </Badge>
      );
    }
    return (
      <Badge variant="secondary" className="text-xs">
        No es compra
      </Badge>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          className="glass-card animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Servicios Conectados
            </CardTitle>
            <Link2 className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            {statusLoading ? (
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            ) : (
              <>
                <p className="text-2xl font-bold">{connectedCount}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {status?.connected ? "Gmail conectado" : "Ninguno conectado"}
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card
          className="glass-card animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Compras Detectadas
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            {statusLoading ? (
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            ) : (
              <>
                <p className="text-2xl font-bold">
                  {status?.total_purchases_detected ?? 0}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  De {status?.total_emails_processed ?? 0} correos procesados
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card
          className="glass-card animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pendientes
            </CardTitle>
            <AlertTriangle
              className={`h-4 w-4 ${
                (status?.pending_categorization ?? 0) > 0
                  ? "text-yellow-400"
                  : "text-muted-foreground"
              }`}
            />
          </CardHeader>
          <CardContent>
            {statusLoading ? (
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            ) : (
              <>
                <p
                  className={`text-2xl font-bold ${
                    (status?.pending_categorization ?? 0) > 0
                      ? "text-yellow-400"
                      : ""
                  }`}
                >
                  {status?.pending_categorization ?? 0}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Por categorizar
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <Separator className="opacity-30" />

      {/* Recent imports table */}
      <Card
        className="glass-card animate-fade-up"
        style={{ animationDelay: "0.4s" }}
      >
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">Importaciones Recientes</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Correos procesados desde Gmail
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="glass"
            onClick={() => navigate("/dashboard/profile?tab=connections")}
          >
            <Settings className="h-4 w-4 mr-1" />
            Gestionar
          </Button>
        </CardHeader>
        <CardContent>
          {emailsLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : !status?.connected ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Mail className="h-12 w-12 text-muted-foreground/50 mb-3" />
              <p className="text-muted-foreground mb-1">
                Gmail no conectado
              </p>
              <p className="text-sm text-muted-foreground/70 mb-4">
                Conecta tu Gmail para detectar compras automaticamente
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/dashboard/profile?tab=connections")}
              >
                Conectar Gmail
              </Button>
            </div>
          ) : emailsData?.results && emailsData.results.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Asunto</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {emailsData.results.slice(0, 10).map((email) => (
                    <TableRow key={email.id}>
                      <TableCell className="text-sm whitespace-nowrap">
                        {formatDate(email.received_at || email.created_at)}
                      </TableCell>
                      <TableCell className="text-sm max-w-[200px] sm:max-w-[300px] truncate">
                        {email.subject}
                      </TableCell>
                      <TableCell>{getStatusBadge(email)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Mail className="h-10 w-10 text-muted-foreground/50 mb-3" />
              <p className="text-sm text-muted-foreground">
                No hay correos procesados aun
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrationsTab;
