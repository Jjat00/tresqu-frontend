import { AuthResponse, User, RequestCodeResponse } from "@/types/auth";
import { apiClient } from "./api";
import { AxiosRequestConfig } from "axios";
import { useAuthStore } from "@/store/authStore";

const REQUEST_CODE_PATH = "/api/auth/telegram/request-code/";
const VERIFY_CODE_PATH = "/api/auth/telegram/verify-code/";
const REFRESH_TOKEN_PATH = "/api/token/refresh/";

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

// Función para refrescar el token de acceso
export const refreshTokenService = async (): Promise<string | null> => {
  try {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      console.error("No hay refresh token disponible");
      return null;
    }

    // Configuración para evitar bucle infinito en el interceptor
    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // @ts-expect-error - skipAuthRefresh es una propiedad personalizada definida en api.ts
    config.skipAuthRefresh = true;

    const response = await apiClient.post(
      REFRESH_TOKEN_PATH,
      { refresh: refreshToken },
      config
    );

    // Guardar el nuevo access token y, si el backend rota el refresh
    // (ROTATE_REFRESH_TOKENS), persistir también el nuevo refresh para
    // extender la ventana de la sesión ("rolling"). Si no viene uno nuevo,
    // se conserva el actual.
    const newAccessToken = response.data.access;
    const rotatedRefreshToken = response.data.refresh ?? refreshToken;
    useAuthStore.getState().setTokens(newAccessToken, rotatedRefreshToken);

    return newAccessToken;
  } catch (error) {
    console.error("Error durante el refresh del token:", error);
    return null;
  }
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

export const isAuthenticated = (): boolean => {
  return useAuthStore.getState().isAuthenticated();
};

export const logout = () => {
  useAuthStore.getState().clearAuth();
};
