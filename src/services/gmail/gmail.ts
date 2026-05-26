import { apiClient } from "../api";
import type {
  GmailConnectionStatus,
  GmailOAuthUrlResponse,
  ProcessedEmailsResponse,
} from "@/types/gmail";

/**
 * Servicio para manejar la integración con Gmail.
 *
 * La conexión, callback, webhook y disconnect viven bajo la ruta
 * genérica `/api/integrations/gmail/...` (la capa generic es la misma
 * para Slack/Notion en el futuro). La lista de correos procesados sigue
 * en `/api/gmail/processed-emails/`.
 */
export class GmailService {
  private baseUrl: string;
  private integrationUrl: string;

  constructor(baseUrl = "/api") {
    this.baseUrl = baseUrl;
    this.integrationUrl = `${baseUrl}/integrations/gmail`;
  }

  /**
   * Obtiene el estado de conexión de Gmail.
   */
  async getStatus(): Promise<GmailConnectionStatus> {
    const response = await apiClient.get<GmailConnectionStatus>(
      `${this.integrationUrl}/status/`
    );
    return response.data;
  }

  /**
   * Obtiene la URL de autorización OAuth para conectar Gmail.
   *
   * El backend ahora delega en Composio, así que la URL apunta al
   * Connect Link alojado por ellos. La firma del objeto cambió:
   * antes era `{ auth_url }`, ahora es `{ redirect_url }`.
   */
  async getOAuthUrl(): Promise<GmailOAuthUrlResponse> {
    const response = await apiClient.get<{
      redirect_url: string;
      connected_account_id: string;
      already_connected?: boolean;
    }>(`${this.integrationUrl}/connect-url/`);
    return {
      auth_url: response.data.redirect_url,
      connected_account_id: response.data.connected_account_id,
      already_connected: response.data.already_connected ?? false,
    };
  }

  /**
   * Desconecta la cuenta de Gmail (revoca trigger + connected_account en Composio).
   */
  async disconnect(): Promise<void> {
    await apiClient.post(`${this.integrationUrl}/disconnect/`);
  }

  /**
   * Obtiene los correos procesados con paginación.
   */
  async getProcessedEmails(
    page?: number
  ): Promise<ProcessedEmailsResponse> {
    const params = page ? `?page=${page}` : "";
    const response = await apiClient.get<ProcessedEmailsResponse>(
      `${this.baseUrl}/gmail/processed-emails/${params}`
    );
    return response.data;
  }

  /**
   * Reintenta la activación del trigger si quedó en `failed`.
   *
   * Composio hace polling de Gmail cada 2 min (configurable en el
   * trigger spec); no hay sincronización manual on-demand. Este método
   * existe para los casos en que el provisioning del trigger falló y
   * queremos reintentarlo.
   */
  async retryTrigger(): Promise<void> {
    await apiClient.post(`${this.integrationUrl}/retry-trigger/`);
  }
}

export const gmailService = new GmailService();
