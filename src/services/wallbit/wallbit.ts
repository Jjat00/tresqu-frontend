import { apiClient } from "../api";
import type {
  WallbitConnectPayload,
  WallbitStatus,
  WallbitSyncResult,
} from "@/types/wallbit";

export class WallbitService {
  private baseUrl: string;

  constructor(baseUrl = "/api/wallbit") {
    this.baseUrl = baseUrl;
  }

  async getStatus(): Promise<WallbitStatus> {
    const response = await apiClient.get<WallbitStatus>(`${this.baseUrl}/status/`);
    return response.data;
  }

  async connect(payload: WallbitConnectPayload): Promise<WallbitStatus> {
    const response = await apiClient.post<WallbitStatus>(
      `${this.baseUrl}/connect/`,
      payload,
    );
    return response.data;
  }

  async disconnect(): Promise<WallbitStatus> {
    const response = await apiClient.post<WallbitStatus>(
      `${this.baseUrl}/disconnect/`,
    );
    return response.data;
  }

  async sync(): Promise<WallbitSyncResult> {
    const response = await apiClient.post<WallbitSyncResult>(
      `${this.baseUrl}/sync/`,
    );
    return response.data;
  }
}

export const wallbitService = new WallbitService();
