import type { Dict } from "../types";

export interface NotFoundCopy {
  label: string;
  title: string;
  body: string;
  back: string;
  home: string;
}

export const notFoundCopy: Dict<NotFoundCopy> = {
  es: {
    label: "Error · Ruta no encontrada",
    title: "Página no encontrada",
    body: "La página que buscas no existe o fue movida. Verifica la URL o regresa al inicio.",
    back: "Volver",
    home: "Ir al inicio",
  },
  en: {
    label: "Error · Route not found",
    title: "Page not found",
    body: "The page you're looking for doesn't exist or was moved. Check the URL or head back home.",
    back: "Go back",
    home: "Go home",
  },
};
