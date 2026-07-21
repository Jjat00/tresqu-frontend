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
}

export const headerCopy: Dict<HeaderCopy> = {
  es: {
    navLinks: [
      { label: "El equipo", anchor: "#equipo" },
      { label: "Inversiones", anchor: "#wallbit" },
      { label: "Capacidades", anchor: "#agente" },
      { label: "Captura automática", anchor: "#captura" },
      { label: "Funciones", route: "features" },
      // Oculto hasta tener los pagos configurados (reactivar junto con Pricing)
      // { label: "Precios", anchor: "#pricing" },
    ],
    ctaDashboard: "Mi Dashboard",
    ctaLogin: "Ingresar",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    backHome: "Regresar al inicio",
  },
  en: {
    navLinks: [
      { label: "The team", anchor: "#equipo" },
      { label: "Investing", anchor: "#wallbit" },
      { label: "Capabilities", anchor: "#agente" },
      { label: "Auto capture", anchor: "#captura" },
      { label: "Features", route: "features" },
      // { label: "Pricing", anchor: "#pricing" },
    ],
    ctaDashboard: "My Dashboard",
    ctaLogin: "Sign in",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    backHome: "Back to home",
  },
};
