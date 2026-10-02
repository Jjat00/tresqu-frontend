import type { Dict } from "../types";
import { homeCopy } from "./home";

/**
 * Compatibilidad: las páginas estáticas de Astro (content/src/layouts/
 * BaseLayout.astro y content/src/pages/[solution].astro) importan
 * `heroCopy.es.whatsappUrl` desde aquí. El copy de la landing vive en
 * home.ts; este módulo solo reexpone el enlace de WhatsApp para que ambos
 * sitios compartan una sola fuente. No borrar sin migrar esas importaciones.
 */
export interface HeroCopy {
  whatsappUrl: string;
}

export const heroCopy: Dict<HeroCopy> = {
  es: { whatsappUrl: homeCopy.es.whatsappUrl },
  en: { whatsappUrl: homeCopy.en.whatsappUrl },
};
