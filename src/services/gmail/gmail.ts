import { apiClient } from "../api";
import type {
  GmailConnectionStatus,
  GmailOAuthUrlResponse,
  ProcessedEmailsResponse,
} from "@/types/gmail";

/**
 * Servicio para manejar la integración con Gmail
 */
export class GmailService {
  private baseUrl: string;

  constructor(baseUrl = "/api") {
    this.baseUrl = baseUrl;
  }

  /**
   * Obtiene el estado de conexión de Gmail
   */
  async getStatus(): Promise<GmailConnectionStatus> {
    const response = await apiClient.get<GmailConnectionStatus>(
      `${this.baseUrl}/gmail/status/`
    );
    return response.data;
  }

  /**
   * Obtiene la URL de autorización OAuth de Google
   */
  async getOAuthUrl(): Promise<GmailOAuthUrlResponse> {
    const response = await apiClient.get<GmailOAuthUrlResponse>(
      `${this.baseUrl}/gmail/oauth/url/`
    );
    return response.data;
  }

  /**
   * Desconecta la cuenta de Gmail
   */
  async disconnect(): Promise<void> {
    await apiClient.post(`${this.baseUrl}/gmail/disconnect/`);
  }

  /**
   * Obtiene los correos procesados con paginación
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
   * Ejecuta una sincronización manual de correos
   */
  async manualSync(): Promise<void> {
    await apiClient.post(`${this.baseUrl}/gmail/sync/`);
  }
}

export const gmailService = new GmailService();
