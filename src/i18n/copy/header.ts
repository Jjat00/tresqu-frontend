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
      { label: "Cómo funciona", anchor: "#vives" },
      { label: "Inversiones", anchor: "#inviertes" },
      { label: "Producto", anchor: "#producto" },
      { label: "Preguntas", anchor: "#faq" },
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
      { label: "How it works", anchor: "#vives" },
      { label: "Investing", anchor: "#inviertes" },
      { label: "Product", anchor: "#producto" },
      { label: "FAQ", anchor: "#faq" },
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
