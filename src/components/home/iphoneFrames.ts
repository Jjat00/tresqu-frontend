/**
 * Fotogramas del iPhone 18 Pro 3D de Tresqu (60 WebP transparentes 760×1140,
 * 6° por fotograma, f000 = frente). Viven en /public/landing/iphone/.
 *
 * Almacén compartido a nivel de módulo: los dos visores de la landing (hero y
 * sección de ejemplos) usan los MISMOS objetos Image ya decodificados, así que
 * la segunda instancia no vuelve a pedir ni decodificar nada.
 *
 * La precarga NO arranca sola: el visor la pide cuando el navegador queda
 * ocioso tras el `load` (o al primer toque/foco), para no competir con el LCP.
 */

export const FRAME_COUNT = 60;
export const FRAME_WIDTH = 760;
export const FRAME_HEIGHT = 1140;
const BASE = "/landing/iphone/";

export const frameUrl = (i: number): string =>
  `${BASE}f${String(i).padStart(3, "0")}.webp`;

const images: (HTMLImageElement | undefined)[] = new Array(FRAME_COUNT);
const ready: boolean[] = new Array(FRAME_COUNT).fill(false);
let loaded = 0;
let started = false;
const listeners = new Set<() => void>();

export const isFrameReady = (i: number): boolean => ready[i];
export const allFramesReady = (): boolean => loaded === FRAME_COUNT;

/** Se llama una vez cuando los 60 fotogramas están decodificados. */
export const onAllFramesReady = (cb: () => void): (() => void) => {
  if (allFramesReady()) {
    cb();
    return () => {};
  }
  listeners.add(cb);
  return () => listeners.delete(cb);
};

/**
 * Descarga y decodifica todos los fotogramas, empezando por el de reposo y
 * alternando vecinos (para que un arrastre temprano ya tenga qué mostrar).
 * Idempotente.
 */
export const preloadFrames = (rest = 0): void => {
  if (started || typeof window === "undefined") return;
  started = true;
  for (let k = 0; k < FRAME_COUNT; k++) {
    const offset = k % 2 ? (k + 1) / 2 : -k / 2;
    const i = (((rest + offset) % FRAME_COUNT) + FRAME_COUNT) % FRAME_COUNT;
    const im = new Image();
    im.decoding = "async";
    const done = () => {
      if (ready[i]) return;
      ready[i] = true;
      loaded += 1;
      if (loaded === FRAME_COUNT) {
        listeners.forEach((cb) => cb());
        listeners.clear();
      }
    };
    // un fotograma roto no bloquea el visor
    im.onload = () => {
      (im.decode ? im.decode() : Promise.resolve()).then(done, done);
    };
    im.onerror = done;
    im.src = frameUrl(i);
    images[i] = im;
  }
};

/** Programa la precarga cuando la página terminó de cargar y está ociosa. */
export const preloadFramesWhenIdle = (rest = 0): (() => void) => {
  if (started) return () => {};
  let cancelled = false;
  let idleId: number | undefined;
  let timeoutId: number | undefined;
  const go = () => {
    if (cancelled) return;
    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(() => preloadFrames(rest), {
        timeout: 2500,
      });
    } else {
      timeoutId = window.setTimeout(() => preloadFrames(rest), 600);
    }
  };
  if (document.readyState === "complete") go();
  else window.addEventListener("load", go, { once: true });
  return () => {
    cancelled = true;
    window.removeEventListener("load", go);
    if (idleId !== undefined && typeof window.cancelIdleCallback === "function")
      window.cancelIdleCallback(idleId);
    if (timeoutId !== undefined) window.clearTimeout(timeoutId);
  };
};
