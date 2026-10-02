import { Link } from "react-router-dom";
import { pathFor, useCopy, useLocale } from "@/i18n";
import { homeCopy } from "@/i18n/copy/home";
import DotField from "./DotField";
import IphoneGiro from "./IphoneGiro";
import WhatsAppIcon from "./WhatsAppIcon";

/**
 * Hero «Noche de puntos»: retícula de puntos interactiva, titular en dos
 * líneas (la segunda en verde), CTA principales e iPhone 3D girable que sale
 * desde el borde inferior.
 */
const HomeHero = () => {
  const copy = useCopy(homeCopy);
  const locale = useLocale();
  const { hero } = copy;

  return (
    <section className="tq-hero" aria-labelledby="hero-title">
      <DotField />
      <div className="tq-hero-inner">
        <h1 id="hero-title" className="tq-hero-title">
          <span className="l1">{hero.line1}</span>{" "}
          <span className="l2">{hero.line2}</span>
        </h1>
        <p className="tq-hero-sub">
          {hero.sub.map((piece, i) =>
            piece.bold ? <b key={i}>{piece.text}</b> : piece.text,
          )}
        </p>
        <div className="tq-ctas">
          <a className="tq-btn tq-btn-wa" href={copy.whatsappUrl}>
            <WhatsAppIcon />
            {hero.ctaWhatsApp}
          </a>
          <Link className="tq-btn tq-btn-dash tq-grad-border" to={pathFor("login", locale)}>
            {hero.ctaDashboard}
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
        <p className="tq-hero-micro">
          {hero.microPre}
          <a href={copy.telegramUrl}>{hero.microTelegram}</a>
        </p>
      </div>
      {/* iPhone 3D girable con el WhatsApp de Tresqu, saliendo desde abajo */}
      <div className="tq-hero-art">
        <div className="tq-hero-glow" aria-hidden="true" />
        <div className="tq-tel tq-tel-rise">
          <IphoneGiro label={hero.phoneLabel} priority />
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
