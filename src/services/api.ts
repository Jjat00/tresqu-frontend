import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import { useAuthStore } from "../store/authStore";
import { env } from "@/config";
import {
  ensureFreshAccessToken,
  refreshSession,
} from "@/services/authService";

// Determinar la URL base dependiendo del entorno
const API_BASE_URL = env.apiUrl;

// Extender InternalAxiosRequestConfig para incluir la propiedad _retry
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  skipAuthRefresh?: boolean; // Propiedad para evitar bucles infinitos
}

/**
 * Configuración inicial del cliente Axios
 */
const apiClientConfig: AxiosRequestConfig = {
  baseURL: API_BASE_URL,
  // 20 s: el backend puede tardar en la primera petición del día (arranque en
  // frío). Con 10 s la carga inicial del dashboard fallaba por timeout.
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
};

/**
 * Cliente Axios para realizar peticiones HTTP
 */
export const apiClient = axios.create(apiClientConfig);

let isRedirectingToLogin = false;

const forceLogout = () => {
  useAuthStore.getState().clearAuth();
  if (
    typeof window !== "undefined" &&
    !isRedirectingToLogin &&
    window.location.pathname !== "/login"
  ) {
    isRedirectingToLogin = true;
    window.location.href = "/login";
  }
};

/**
 * Interceptor para añadir el token de autenticación a las peticiones
 */
apiClient.interceptors.request.use(
  async (config) => {
    const request = config as ExtendedAxiosRequestConfig;

    // Refresco anticipado: si al access token le quedan menos de dos minutos
    // se renueva ANTES de salir. Como el refresh es "single flight", las N
    // peticiones que arranca el dashboard comparten un único refresh en vez
    // de disparar N (que era de donde salían los cierres de sesión).
    const token = request.skipAuthRefresh
      ? useAuthStore.getState().accessToken
      : await ensureFreshAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Interceptor para manejar respuestas y errores
 */
apiClient.interceptors.response.use(
  (response) => {
    // Respuesta exitosa
    return response;
  },
  async (error: AxiosError) => {
    if (!error.config) {
      return Promise.reject(error);
    }

    const originalRequest = error.config as ExtendedAxiosRequestConfig;
    const status = error.response?.status;

    // Si el error es 401 (Unauthorized) y no estamos en un proceso de refresh
    if (
      status === 401 &&
      !originalRequest._retry &&
      !originalRequest.skipAuthRefresh
    ) {
      originalRequest._retry = true;

      const refreshToken = useAuthStore.getState().refreshToken;

      if (!refreshToken) {
        forceLogout();
        return Promise.reject(error);
      }

      // refreshSession() ya persiste el access nuevo y el refresh rotado; no
      // volvemos a llamar setTokens aquí para no pisar el refresh rotado.
      const result = await refreshSession();

      if (result.status === "ok") {
        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;
        return apiClient(originalRequest);
      }

      // Solo cerramos sesión si el backend rechazó el refresh token. Si no se
      // pudo contactar (timeout, red, backend arrancando), la sesión sigue
      // siendo válida: se propaga el error y el siguiente intento la recupera.
      if (result.status === "invalid") {
        forceLogout();
      }

      return Promise.reject(error);
    }

    // 401 que persiste tras haber refrescado con éxito: el token nuevo tampoco
    // sirve (usuario borrado, firma cambiada...). Ahí sí toca volver a entrar.
    if (status === 401 && originalRequest._retry) {
      forceLogout();
    }

    // Manejar diferentes códigos de error
    handleApiError(error);

    return Promise.reject(error);
  }
);

/**
 * Función para manejar y registrar errores de la API
 */
function handleApiError(error: AxiosError): void {
  if (error.response) {
    // Error con respuesta del servidor
    const { status, data } = error.response;
    console.error(`Error ${status}:`, data);

    // Manejar errores específicos
    switch (status) {
      case 400:
        console.error("Error de validación o solicitud incorrecta");
        break;
      case 403:
        console.error("Acceso prohibido");
        break;
      case 404:
        console.error("Recurso no encontrado");
        break;
      case 500:
        console.error("Error interno del servidor");
        break;
      default:
        console.error(`Error de respuesta (${status})`);
    }
  } else if (error.request) {
    // Error sin respuesta (problema de red)
    console.error("No se recibió respuesta del servidor:", error.request);
  } else {
    // Error en la configuración de la solicitud
    console.error("Error al configurar la petición:", error.message);
  }
}
