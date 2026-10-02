import type { Dict } from "../types";
import type { RouteKey } from "../routes";

/** Link de nav: o un anchor de la landing o una ruta interna localizada. */
export interface NavLink {
  label: string;
  anchor?: string;
  route?: RouteKey;
}

export interface HeaderCopy {
  navLinks: NavLink[];
  ctaDashboard: string;
  ctaLogin: string;
  openMenu: string;
  closeMenu: string;
  backHome: string;
  navLabel: string;
  homeLabel: string;
}

export const headerCopy: Dict<HeaderCopy> = {
  es: {
    navLinks: [
      { label: "Por qué", anchor: "#por-que" },
      { label: "Ejemplos", anchor: "#ejemplos" },
      { label: "Preguntas", anchor: "#faq" },
      { label: "Funciones", route: "features" },
      // Oculto hasta tener los pagos configurados (reactivar junto con Pricing)
      // { label: "Precios", anchor: "#pricing" },
    ],
    ctaDashboard: "Mi Dashboard",
    ctaLogin: "Entrar",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    backHome: "Regresar al inicio",
    navLabel: "Principal",
    homeLabel: "Tresqu, inicio",
  },
  en: {
    navLinks: [
      { label: "Why", anchor: "#por-que" },
      { label: "Examples", anchor: "#ejemplos" },
      { label: "FAQ", anchor: "#faq" },
      { label: "Features", route: "features" },
      // { label: "Pricing", anchor: "#pricing" },
    ],
    ctaDashboard: "My Dashboard",
    ctaLogin: "Sign in",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    backHome: "Back to home",
    navLabel: "Main",
    homeLabel: "Tresqu, home",
  },
};
