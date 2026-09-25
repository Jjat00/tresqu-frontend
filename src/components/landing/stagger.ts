import type { CSSProperties } from "react";

/** Índice de escalonado para `.lx-rise` dentro de un `<Reveal>`. */
export const stagger = (i: number) => ({ "--i": i }) as CSSProperties;
