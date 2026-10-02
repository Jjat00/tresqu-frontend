import { Link } from "react-router-dom";
import { pathFor, useCopy, useLocale } from "@/i18n";
import { HOME_ANCHORS, homeCopy } from "@/i18n/copy/home";
import { useInView } from "@/hooks/useInView";
import ExampleCard from "./ExampleCard";
import IphoneGiro from "./IphoneGiro";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { useReveal } from "./useReveal";

/**
 * Ejemplos ilustrativos: segundo iPhone 3D (registro por chat) junto a los
 * cuatro modos de registro, carrusel con capturas reales de la app web y la
 * orden de Wallbit, y el cierre con los dos CTA.
 */
const WorkSection = () => {
  const copy = useCopy(homeCopy);
  const locale = useLocale();
  const { work, hero } = copy;
  const ref = useReveal<HTMLElement>();
  const reduce = usePrefersReducedMotion();
  // el segundo visor se monta solo al acercarse (comparte los fotogramas
  // que el hero ya descargó)
  const { ref: phoneRef, isInView: phoneNear } = useInView({
    rootMargin: "600px 0px",
  });

  return (
    <section
      ref={ref}
      className="tq-work"
      id={HOME_ANCHORS.examples}
      aria-labelledby="work-title"
    >
      <div className="tq-wrap tq-work-head">
        <p className="tq-eyebrow reveal">{work.eyebrow}</p>
        <h2 id="work-title" className="tq-work-title reveal">
          {work.title.map((word, i) => (
            <span key={word} className={`w${i + 1}`}>
              {word}
              {i < work.title.length - 1 ? " " : ""}
            </span>
          ))}
        </h2>
        <p className="tq-work-lead reveal">{work.lead}</p>
      </div>

      <div className="tq-wrap tq-show">
        <figure className="tq-show-phone reveal">
          <div className="tq-show-glow" aria-hidden="true" />
          <div ref={phoneRef} className="tq-tel">
            {phoneNear && <IphoneGiro label={work.phoneLabel} />}
          </div>
          <figcaption className="tq-show-hint">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 9l-4 3 4 3M16 9l4 3-4 3M4 12h16" />
            </svg>
            {work.dragHint}
          </figcaption>
        </figure>
        <div className="tq-show-copy reveal">
          <p className="tq-eyebrow">{work.showEyebrow}</p>
          <h3 className="tq-show-title">
            {work.showTitle[0]}
            <br />
            <span>{work.showTitle[1]}</span>
          </h3>
          <ol className="tq-modes">
            {work.modes.map((mode) => (
              <li key={mode.title}>
                <b>{mode.title}</b>
                <span>{mode.body}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div
        className={`tq-marquee${reduce ? " is-static" : ""}`}
        role="region"
        aria-label={work.carouselLabel}
        tabIndex={reduce ? 0 : undefined}
      >
        <div className="tq-track">
          {work.cards.map((card, i) => (
            <ExampleCard key={i} card={card} />
          ))}
          {/* copia para el bucle infinito: invisible para lectores de pantalla */}
          {!reduce &&
            work.cards.map((card, i) => (
              <ExampleCard key={`dup-${i}`} card={card} hidden />
            ))}
        </div>
      </div>

      <div className="tq-wrap tq-closing reveal">
        <h2 className="tq-closing-title">
          {work.closingPre}
          <span>{work.closingEm}</span>.
        </h2>
        <div className="tq-ctas">
          <a className="tq-btn tq-btn-wa" href={copy.whatsappUrl}>
            {hero.ctaWhatsApp}
          </a>
          <Link className="tq-btn tq-btn-dash tq-grad-border" to={pathFor("login", locale)}>
            {hero.ctaDashboard}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
