import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ensureFreshAccessToken,
  hasValidSession,
  logout,
} from "@/services/authService";

/** Cada cuánto se revisa si al access token le queda poco. */
const CHECK_INTERVAL_MS = 10 * 60 * 1000; // 10 minutos

/**
 * Mantiene viva la sesión del dashboard.
 *
 * El access token caduca cada día; el refresh dura 30 días y rota en cada uso.
 * Sin este hook la renovación solo ocurría al recibir un 401, así que la
 * primera visita de cada día empezaba con una tanda de peticiones fallidas.
 * Aquí se renueva antes: al entrar, al volver a la pestaña, al recuperar la
 * conexión y cada diez minutos.
 *
 * Solo se manda a /login cuando el refresh token ha caducado de verdad; un
 * backend caído o sin red no cierra la sesión.
 */
export const useSessionKeepAlive = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    const revalidate = () => {
      if (cancelled) return;

      if (!hasValidSession()) {
        logout();
        navigate("/login");
        return;
      }

      void ensureFreshAccessToken();
    };

    revalidate();

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") revalidate();
    };

    const interval = window.setInterval(revalidate, CHECK_INTERVAL_MS);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("focus", revalidate);
    window.addEventListener("online", revalidate);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("focus", revalidate);
      window.removeEventListener("online", revalidate);
    };
  }, [navigate]);
};
