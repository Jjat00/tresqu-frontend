import { useEffect, useRef } from "react";

/**
 * Aparición suave al hacer scroll: añade `.in` a cada `.reveal` dentro del
 * contenedor cuando entra en pantalla. Con prefers-reduced-motion (o sin
 * IntersectionObserver) todo aparece de una.
 */
export const useReveal = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = root.querySelectorAll<HTMLElement>(".reveal");
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return ref;
};
