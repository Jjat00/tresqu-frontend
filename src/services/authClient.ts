import axios from "axios";
import { env } from "@/config";

/**
 * Cliente Axios SIN interceptores, reservado para el endpoint de refresh.
 *
 * Usar `apiClient` aquí sería recursivo (su interceptor de 401 vuelve a pedir
 * un refresh) y además impondría el timeout corto de las peticiones normales.
 * El refresh es la operación que sostiene la sesión: si el backend está frío
 * (cold start en Railway) merece esperar bastante más que una query cualquiera.
 */
export const REFRESH_TIMEOUT_MS = 30000;

export const authClient = axios.create({
  baseURL: env.apiUrl,
  timeout: REFRESH_TIMEOUT_MS,
  headers: { "Content-Type": "application/json" },
});
