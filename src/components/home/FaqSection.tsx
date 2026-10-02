import { useCopy } from "@/i18n";
import { HOME_ANCHORS, homeCopy } from "@/i18n/copy/home";

/**
 * Preguntas frecuentes compactas. Acordeón nativo (<details>/<summary>):
 * accesible con teclado y lector de pantalla sin JS extra, y las respuestas
 * quedan en el DOM. El texto debe ser IDÉNTICO al FAQPage del JSON-LD de
 * /index.html y /en.html.
 */
const FaqSection = () => {
  const { faq } = useCopy(homeCopy);

  return (
    <section
      className="tq-faq"
      id={HOME_ANCHORS.faq}
      aria-labelledby="faq-title"
    >
      <div className="tq-wrap tq-faq-grid">
        <div className="tq-faq-head">
          <p className="tq-eyebrow">{faq.eyebrow}</p>
          <h2 id="faq-title" className="tq-faq-title">
            {faq.title}
          </h2>
        </div>
        <div className="tq-faq-list">
          {faq.items.map((item) => (
            <details key={item.q} className="tq-faq-item">
              <summary>
                <h3>{item.q}</h3>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
