import type { Dict } from "../types";

export interface FooterCopy {
  tagline: string;
  productTitle: string;
  allFeatures: string;
  blog: string;
  /** Anclas de la landing; el Footer les antepone la ruta del home del idioma. */
  anchorLinks: { label: string; href: string }[];
  legalTitle: string;
  privacyPolicy: string;
  terms: string;
  contact: string;
  rights: string;
  privacyShort: string;
  termsShort: string;
}

export const footerCopy: Dict<FooterCopy> = {
  es: {
    tagline:
      "Sabe cómo vives. Invierte como eres. Un equipo de agentes financieros en WhatsApp, Telegram y la web.",
    productTitle: "Producto",
    allFeatures: "Todas las funciones",
    blog: "Blog",
    anchorLinks: [
      { label: "Por qué Tresqu", href: "#por-que" },
      { label: "Ejemplos", href: "#ejemplos" },
      // Oculto hasta tener los pagos configurados (reactivar junto con Pricing)
      // { label: "Precios", href: "#pricing" },
      { label: "Preguntas frecuentes", href: "#faq" },
    ],
    legalTitle: "Legal",
    privacyPolicy: "Política de privacidad",
    terms: "Términos y condiciones",
    contact: "Contacto",
    rights: "Todos los derechos reservados.",
    privacyShort: "Privacidad",
    termsShort: "Términos",
  },
  en: {
    tagline:
      "Knows how you live. Invests like you. A team of financial agents on WhatsApp, Telegram, and the web.",
    productTitle: "Product",
    allFeatures: "All features",
    blog: "Blog",
    anchorLinks: [
      { label: "Why Tresqu", href: "#por-que" },
      { label: "Examples", href: "#ejemplos" },
      // { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
    legalTitle: "Legal",
    privacyPolicy: "Privacy policy",
    terms: "Terms & conditions",
    contact: "Contact",
    rights: "All rights reserved.",
    privacyShort: "Privacy",
    termsShort: "Terms",
  },
};
