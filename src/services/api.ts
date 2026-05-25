import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import { useAuthStore } from "../store/authStore";
import { env } from "@/config";
import { refreshTokenService } from "@/services/authService"; //         Importar el nuevo servicio

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
  timeout: 10000,
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
  (config) => {
    const token = useAuthStore.getState().accessToken;
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

      try {
        const newAccessToken = await refreshTokenService();

        if (newAccessToken) {
          useAuthStore.getState().setTokens(newAccessToken, refreshToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        }

        forceLogout();
        return Promise.reject(error);
      } catch (refreshError) {
        console.error("Error al refrescar token:", refreshError);
        forceLogout();
        return Promise.reject(error);
      }
    }

    // Si es un 401 en un intento de refresh o después de retry, cerrar sesión
    if (
      status === 401 &&
      (originalRequest.skipAuthRefresh || originalRequest._retry)
    ) {
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
