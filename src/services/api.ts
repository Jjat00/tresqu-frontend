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

      try {
        // Intentar renovar el token usando el refreshToken
        const refreshToken = useAuthStore.getState().refreshToken;

        if (!refreshToken) {
          // Si no hay refresh token, forzar logout y rechazar el error
          useAuthStore.getState().clearAuth();
          return Promise.reject(error);
        }

        try {
          // Intentar obtener un nuevo token
          const newAccessToken = await refreshTokenService();

          if (newAccessToken) {
            // Actualizar el token en el store
            useAuthStore.getState().setTokens(newAccessToken, refreshToken);

            // Reintentar la petición original con el nuevo token
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return apiClient(originalRequest);
          } else {
            // Si no hay nuevo token, cerrar sesión
            useAuthStore.getState().clearAuth();
            return Promise.reject(error);
          }
        } catch (refreshError) {
          // Error al refrescar el token, cerrar sesión
          console.error("Error al refrescar token:", refreshError);
          useAuthStore.getState().clearAuth();
          return Promise.reject(error);
        }
      } catch (refreshError) {
        // Si falla la renovación, cerrar sesión
        console.error("Token refresh failed:", refreshError);
        useAuthStore.getState().clearAuth();
        return Promise.reject(refreshError);
      }
    }

    // Si es un 401 en un intento de refresh o después de retry, cerrar sesión
    if (
      status === 401 &&
      (originalRequest.skipAuthRefresh || originalRequest._retry)
    ) {
      useAuthStore.getState().clearAuth();
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
