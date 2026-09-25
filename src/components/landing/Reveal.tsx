import type { ElementType, ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  id?: string;
  threshold?: number;
}

/**
 * Contenedor que marca `.is-in` al entrar en pantalla. Sus hijos con
 * `.lx-rise` (y `style={{ "--i": n }}`) aparecen escalonados.
 */
const Reveal = ({ children, className = "", as: Tag = "div", id, threshold = 0.18 }: RevealProps) => {
  const { ref, isInView } = useInView({ threshold });
  return (
    <Tag ref={ref} id={id} className={`${className} ${isInView ? "is-in" : ""}`}>
      {children}
    </Tag>
  );
};

export default Reveal;
