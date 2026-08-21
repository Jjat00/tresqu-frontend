import { env } from "@/config";
import {
  ensureFreshAccessToken,
  refreshTokenService,
} from "@/services/authService";
import type {
  ChatRole,
  ChatStreamEvent,
  FinalEvent,
  StepEvent,
  TokenEvent,
} from "@/types/chat";

const streamPath = (agentId: string) => `/api/agents/${agentId}/chat/stream/`;

export interface HistoryTurn {
  role: ChatRole;
  content: string;
}

export interface StreamCallbacks {
  onStep: (step: StepEvent) => void;
  onToken: (token: TokenEvent) => void;
  onFinal: (final: FinalEvent) => void;
  onError: (message: string) => void;
}

const GENERIC_ERROR =
  "Lo siento, hubo un problema de conexión. Inténtalo de nuevo.";

/**
 * POST a message to a specific agent and consume the Server-Sent Events stream,
 * dispatching each step and the final answer via callbacks. ``agentId`` is
 * "tresqu" for the orchestrator or a specialist id for a direct 1:1 chat.
 *
 * Uses native fetch (Axios can't read a streaming body). The Axios JWT
 * interceptor doesn't apply here, so we attach the token manually and retry
 * once after a transparent refresh on 401.
 */
export async function streamChat(
  agentId: string,
  message: string,
  history: HistoryTurn[],
  callbacks: StreamCallbacks,
  signal?: AbortSignal,
): Promise<void> {
  const url = `${env.apiUrl}${streamPath(agentId)}`;
  const body = JSON.stringify({ message, history });

  const send = (token: string | null) =>
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body,
      signal,
    });

  let response: Response;
  try {
    response = await send(await ensureFreshAccessToken());
    if (response.status === 401) {
      const refreshed = await refreshTokenService();
      if (refreshed) response = await send(refreshed);
    }
  } catch (err) {
    if ((err as Error)?.name === "AbortError") return;
    callbacks.onError(GENERIC_ERROR);
    return;
  }

  if (!response.ok || !response.body) {
    if (response.status === 401) {
      callbacks.onError("Tu sesión expiró. Vuelve a iniciar sesión.");
      return;
    }
    // Non-stream error responses (e.g. 409 wallbit_not_connected) carry a
    // human-readable ``detail`` — surface it instead of the generic message.
    let detail = GENERIC_ERROR;
    try {
      const data = (await response.json()) as { detail?: string };
      if (data?.detail) detail = data.detail;
    } catch {
      // keep the generic message
    }
    callbacks.onError(detail);
    return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let sawFinal = false;

  const dispatch = (event: ChatStreamEvent) => {
    if (event.type === "step") callbacks.onStep(event);
    else if (event.type === "token") callbacks.onToken(event);
    else if (event.type === "final") {
      sawFinal = true;
      callbacks.onFinal(event);
    } else if (event.type === "error") callbacks.onError(event.text);
  };

  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const frames = buffer.split("\n\n");
      buffer = frames.pop() ?? "";

      for (const frame of frames) {
        const data = frame
          .split("\n")
          .filter((line) => line.startsWith("data:"))
          .map((line) => line.slice(5).trim())
          .join("");
        if (!data) continue; // skip the ": open" comment frame
        try {
          dispatch(JSON.parse(data) as ChatStreamEvent);
        } catch {
          // ignore malformed frame
        }
      }
    }
  } catch (err) {
    if ((err as Error)?.name === "AbortError") return;
    callbacks.onError(GENERIC_ERROR);
    return;
  }

  if (!sawFinal) callbacks.onError(GENERIC_ERROR);
}
