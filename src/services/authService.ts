import { AuthResponse, User, RequestCodeResponse } from "@/types/auth";
import { apiClient } from "./api";
import { authClient } from "./authClient";
import { isAxiosError } from "axios";
import { useAuthStore } from "@/store/authStore";
import { isTokenExpired, tokenExpiresWithin } from "@/lib/jwt";

const REQUEST_CODE_PATH = "/api/auth/telegram/request-code/";
const VERIFY_CODE_PATH = "/api/auth/telegram/verify-code/";
const REFRESH_TOKEN_PATH = "/api/token/refresh/";

/**
 * Margen con el que se refresca el access token antes de que caduque. Evita
 * la ráfaga de 401 que se producía al abrir el dashboard con el token justo
 * vencido (todas las queries fallaban a la vez).
 */
const REFRESH_SKEW_MS = 2 * 60 * 1000; // 2 minutos

/** Espera entre el intento de refresh y su reintento cuando la red falla. */
const REFRESH_RETRY_DELAY_MS = 1500;

// Función para solicitar código de verificación
export const requestTelegramCode = async (
  phoneNumber: string
): Promise<RequestCodeResponse> => {
  try {
    console.log("Solicitando código para:", phoneNumber);

    // Verificar que el número tenga el formato correcto (con el código de país)
    if (!phoneNumber.startsWith("+")) {
      phoneNumber = "+" + phoneNumber;
    }

    // Quitar el signo + para el envío, ya que el API espera el número sin el +
    const formattedPhoneNumber = phoneNumber.replace("+", "");

    console.log("Número formateado:", formattedPhoneNumber);

    const response = await apiClient.post(REQUEST_CODE_PATH, {
      phone_number: formattedPhoneNumber,
    });

    console.log("Status de la respuesta:", response.status);
    return response.data;
  } catch (error) {
    console.error("Error al solicitar código de Telegram:", error);
    throw error;
  }
};

// Función para verificar código
export const verifyTelegramCode = async (
  phoneNumber: string,
  code: string
): Promise<AuthResponse> => {
  try {
    // Verificar que el número tenga el formato correcto (con el código de país)
    if (!phoneNumber.startsWith("+")) {
      phoneNumber = "+" + phoneNumber;
    }

    // Quitar el signo + para el envío, ya que el API espera el número sin el +
    const formattedPhoneNumber = phoneNumber.replace("+", "");

    console.log("Verificando código para:", formattedPhoneNumber);

    const response = await apiClient.post(VERIFY_CODE_PATH, {
      phone_number: formattedPhoneNumber,
      code,
    });

    console.log("Status de la verificación:", response.status);

    // Guardar los datos de autenticación en el store
    const authData = response.data;
    saveAuthTokens({
      access: authData.access,
      refresh: authData.refresh,
      user: authData.user,
    });

    return authData;
  } catch (error) {
    console.error("Error al verificar código de Telegram:", error);
    throw error;
  }
};

/**
 * Resultado de un intento de refresh.
 *
 * La distinción es lo que impide los cierres de sesión espurios:
 * - `invalid`     → el backend rechazó el refresh token (caducado o falso).
 *                   La sesión está muerta de verdad: toca volver a entrar.
 * - `unavailable` → no hubo respuesta (red caída, timeout, cold start, 5xx).
 *                   La sesión SIGUE siendo válida; solo hay que reintentar.
 */
export type RefreshResult =
  | { status: "ok"; accessToken: string }
  | { status: "invalid" }
  | { status: "unavailable" };

const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/** Refresh en vuelo, compartido por todas las peticiones que lo pidan a la vez. */
let inFlightRefresh: Promise<RefreshResult> | null = null;

const requestNewTokens = async (
  refreshToken: string
): Promise<RefreshResult> => {
  try {
    const response = await authClient.post(REFRESH_TOKEN_PATH, {
      refresh: refreshToken,
    });

    // Con ROTATE_REFRESH_TOKENS el backend devuelve también un refresh nuevo:
    // persistirlo es lo que hace "rodar" la ventana de 30 días. Si no viniera,
    // se conserva el actual.
    const newAccessToken: string | undefined = response.data?.access;
    if (!newAccessToken) return { status: "unavailable" };

    const rotatedRefreshToken: string = response.data?.refresh ?? refreshToken;
    useAuthStore.getState().setTokens(newAccessToken, rotatedRefreshToken);

    return { status: "ok", accessToken: newAccessToken };
  } catch (error) {
    // Solo un rechazo explícito del backend invalida la sesión. Un timeout o
    // un 5xx no dicen nada sobre el token: borrar la sesión ahí era el motivo
    // de que hubiera que volver a iniciar sesión cada día.
    if (isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 401 || status === 403) return { status: "invalid" };
      if (status === 400) {
        // simplejwt responde 400 con code "token_not_valid" cuando el refresh
        // no sirve; otros 400 (payload mal formado) no deberían cerrar sesión.
        const code = (error.response?.data as { code?: string } | undefined)
          ?.code;
        return code === "token_not_valid"
          ? { status: "invalid" }
          : { status: "unavailable" };
      }
    }
    return { status: "unavailable" };
  }
};

const performRefresh = async (): Promise<RefreshResult> => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) return { status: "invalid" };

  // Si el propio refresh token ya caducó, no hay nada que pedirle al backend.
  if (isTokenExpired(refreshToken)) return { status: "invalid" };

  const first = await requestNewTokens(refreshToken);
  if (first.status !== "unavailable") return first;

  // Un solo reintento: cubre el cold start del backend y los cortes de red
  // momentáneos sin castigar al usuario con la pantalla de login.
  await sleep(REFRESH_RETRY_DELAY_MS);
  return requestNewTokens(getRefreshToken() ?? refreshToken);
};

/**
 * Refresca la sesión. Las llamadas concurrentes comparten el mismo intento
 * ("single flight"): al abrir el dashboard se lanzan muchas peticiones a la
 * vez y antes cada una disparaba su propio refresh.
 */
export const refreshSession = (): Promise<RefreshResult> => {
  if (!inFlightRefresh) {
    inFlightRefresh = performRefresh().finally(() => {
      inFlightRefresh = null;
    });
  }
  return inFlightRefresh;
};

/**
 * Devuelve un access token utilizable, refrescando de forma anticipada si le
 * quedan menos de `REFRESH_SKEW_MS`. Si el refresh no está disponible ahora
 * mismo, devuelve el token actual (aunque esté vencido) y deja que el 401 y su
 * reintento hagan el resto.
 */
export const ensureFreshAccessToken = async (): Promise<string | null> => {
  const accessToken = getAccessToken();

  if (accessToken && !tokenExpiresWithin(accessToken, REFRESH_SKEW_MS)) {
    return accessToken;
  }

  if (!getRefreshToken()) return accessToken;

  const result = await refreshSession();
  return result.status === "ok" ? result.accessToken : getAccessToken();
};

/**
 * ¿Queda sesión con la que trabajar? Mira el refresh token, no el access:
 * el access caduca a diario por diseño y no significa que haya que salir.
 */
export const hasValidSession = (): boolean => {
  const state = useAuthStore.getState();
  return !!state.user && !isTokenExpired(state.refreshToken);
};

/**
 * Compatibilidad con los consumidores que solo quieren el token nuevo
 * (interceptor de Axios, streaming del chat).
 */
export const refreshTokenService = async (): Promise<string | null> => {
  const result = await refreshSession();
  return result.status === "ok" ? result.accessToken : null;
};

// Funciones para manejar la autenticación con el store
export const saveAuthTokens = (tokens: {
  access: string;
  refresh: string;
  user: User;
}) => {
  useAuthStore.getState().setAuthData(tokens.user, {
    access: tokens.access,
    refresh: tokens.refresh,
  });
};

export const getAccessToken = (): string | null => {
  return useAuthStore.getState().accessToken;
};

export const getRefreshToken = (): string | null => {
  return useAuthStore.getState().refreshToken;
};

export const getUser = (): User | null => {
  return useAuthStore.getState().user;
};

/**
 * Hay sesión mientras el refresh token siga vivo. Antes esto miraba el access
 * token, que caduca cada día: las guardias de ruta se creían sin sesión y
 * mandaban al login aunque la sesión de 30 días siguiera intacta.
 */
export const isAuthenticated = (): boolean => hasValidSession();

export const logout = () => {
  useAuthStore.getState().clearAuth();
};
