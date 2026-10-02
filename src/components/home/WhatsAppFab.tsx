import { useCopy } from "@/i18n";
import { homeCopy } from "@/i18n/copy/home";
import WhatsAppIcon from "./WhatsAppIcon";

/** Botón flotante de WhatsApp (esquina inferior derecha). */
const WhatsAppFab = () => {
  const copy = useCopy(homeCopy);
  return (
    <a className="tq-fab" href={copy.whatsappUrl} aria-label={copy.fabLabel}>
      <WhatsAppIcon />
    </a>
  );
};

export default WhatsAppFab;
