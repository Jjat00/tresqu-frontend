import type { Dict } from "../types";

export interface FooterCopy {
  tagline: string;
  productTitle: string;
  allFeatures: string;
  blog: string;
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
      "Tu agente financiero que vive en WhatsApp y Telegram. Registra gastos, analiza tendencias y toma el control de tus finanzas.",
    productTitle: "Producto",
    allFeatures: "Todas las funciones",
    blog: "Blog",
    anchorLinks: [
      { label: "Beneficios", href: "#beneficios" },
      // Oculto hasta tener los pagos configurados (reactivar junto con Pricing)
      // { label: "Precios", href: "#pricing" },
      { label: "Roadmap", href: "#futuro" },
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
      "Your financial agent that lives in WhatsApp and Telegram. Log expenses, analyze trends, and take control of your finances.",
    productTitle: "Product",
    allFeatures: "All features",
    blog: "Blog",
    anchorLinks: [
      { label: "Benefits", href: "#beneficios" },
      // { label: "Pricing", href: "#pricing" },
      { label: "Roadmap", href: "#futuro" },
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
