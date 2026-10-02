import { useEffect } from "react";
import WhySection from "./WhySection";
import WorkSection from "./WorkSection";
import FaqSection from "./FaqSection";

/** Todo lo que va bajo el pliegue de la landing, en un solo chunk diferido. */
const HomeBelowFold = () => {
  // Si se llega con un ancla (p. ej. /#faq desde el pie de otra página), la
  // sección aún no existía cuando el navegador intentó saltar: saltar ahora.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    document.getElementById(id)?.scrollIntoView();
  }, []);

  return (
    <>
      <WhySection />
      <WorkSection />
      <FaqSection />
    </>
  );
};

export default HomeBelowFold;
