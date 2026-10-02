import type { CarouselCard } from "@/i18n/copy/home";

const CARD_TONE: Record<CarouselCard["kind"], string> = {
  shot: "shot",
  order: "c-green",
  risk: "c-indigo",
  lock: "c-violet",
};

/**
 * Tarjeta del carrusel de ejemplos: captura real de la app web en marco de
 * ventana, orden de Wallbit, perfil de riesgo o dato de seguridad.
 * `hidden` marca la copia que solo existe para el bucle infinito.
 */
const ExampleCard = ({
  card,
  hidden = false,
}: {
  card: CarouselCard;
  hidden?: boolean;
}) => {
  const title = (
    <figcaption className="tq-card-title">
      {card.title.pre}
      <em>{card.title.em}</em>
      {card.title.post}
    </figcaption>
  );

  return (
    <figure
      className={`tq-card ${CARD_TONE[card.kind]}`}
      aria-hidden={hidden || undefined}
    >
      {title}
      {card.kind === "shot" && (
        <div className="tq-win">
          <span className="tq-win-bar" aria-hidden="true">
            <i />
            <i />
            <i />
            <u>{card.window}</u>
          </span>
          <img
            src={card.src}
            alt={hidden ? "" : card.alt}
            width={card.width}
            height={card.height}
            loading="lazy"
            decoding="async"
          />
        </div>
      )}
      {card.kind === "order" && (
        <div className="tq-order">
          <img
            className="tq-wb"
            src="/wallbit_logo.png"
            alt="Wallbit"
            width={92}
            height={25}
            loading="lazy"
          />
          <p className="o-title">{card.orderTitle}</p>
          <p className="o-val">
            {card.amount} <small>{card.currency}</small>
          </p>
          <p className="o-risk">{card.risk}</p>
          <div className="o-btns" aria-hidden="true">
            <span className="yes">{card.confirm}</span>
            <span className="no">{card.cancel}</span>
          </div>
        </div>
      )}
      {card.kind === "risk" && (
        <div className="tq-panel">
          <p className="kpi-l">{card.label}</p>
          <p className="kpi-v">{card.value}</p>
          <svg className="tq-radar" viewBox="0 0 140 120" aria-hidden="true">
            <polygon className="grid" points="70,10 125,45 105,108 35,108 15,45" />
            <polygon className="grid" points="70,35 101,55 90,90 50,90 39,55" />
            <polygon className="area" points="70,26 108,50 92,96 46,92 30,49" />
          </svg>
          <p className="mini">{card.note}</p>
        </div>
      )}
      {card.kind === "lock" && (
        <div className="tq-lock">
          <svg viewBox="0 0 64 64" aria-hidden="true">
            <rect x="14" y="28" width="36" height="26" rx="6" />
            <path d="M22 28v-7a10 10 0 0 1 20 0v7" />
            <circle cx="32" cy="41" r="3.5" />
          </svg>
          <p className="lock-v">{card.value}</p>
          <p className="mini">{card.note}</p>
        </div>
      )}
      <span className="tq-chip">{card.chip}</span>
    </figure>
  );
};

export default ExampleCard;
