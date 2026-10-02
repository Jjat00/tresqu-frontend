import { useCopy } from "@/i18n";
import { HOME_ANCHORS, homeCopy } from "@/i18n/copy/home";
import { useReveal } from "./useReveal";

/** «Por qué»: el costo de llevar las cuentas a mano + tres cifras grandes. */
const WhySection = () => {
  const { why } = useCopy(homeCopy);
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="tq-why"
      id={HOME_ANCHORS.why}
      aria-labelledby="why-title"
    >
      <div className="tq-wrap">
        <h2 id="why-title" className="tq-why-title reveal">
          {why.title[0]}
          <br /> {why.title[1]}
        </h2>
        <p className="tq-why-lead reveal">
          {why.lead.map((piece, i) =>
            piece.bold ? <b key={i}>{piece.text}</b> : piece.text,
          )}
        </p>

        <div className="tq-stats">
          {why.stats.map((stat, i) => (
            <article key={stat.label} className="tq-stat reveal">
              <p className={`tq-stat-num n${i + 1}`}>{stat.value}</p>
              <p className="tq-stat-label">{stat.label}</p>
              <h3>{stat.title}</h3>
              <p>{stat.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySection;
