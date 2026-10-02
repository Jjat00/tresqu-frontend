import { useEffect, useRef } from "react";
import {
  FRAME_COUNT,
  FRAME_HEIGHT,
  FRAME_WIDTH,
  allFramesReady,
  frameUrl,
  isFrameReady,
  onAllFramesReady,
  preloadFrames,
  preloadFramesWhenIdle,
} from "./iphoneFrames";

interface IphoneGiroProps {
  /** Texto accesible del visor (role="img"). */
  label: string;
  className?: string;
  /** Fotograma de reposo (0 = frente; 6° por fotograma). */
  rest?: number;
  /** Vuelta de presentación al quedar todo cargado y en pantalla. */
  autoSpin?: boolean;
  /** Al soltar, vuelve suave al fotograma de reposo. */
  returnToRest?: boolean;
  /** Fotogramas por ancho del visor arrastrado. */
  sensitivity?: number;
  /** Prioridad alta para el primer fotograma (solo el visor del hero). */
  priority?: boolean;
}

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/**
 * Visor 360° del iPhone de Tresqu: arrastre con mouse, dedo o lápiz con
 * inercia, flechas del teclado, vuelta de presentación y regreso al reposo.
 * Port tipado de landing-lab/shared/iphone-tresqu/giro.js.
 *
 * El fotograma visible se cambia por ref (img.src), sin re-render de React.
 */
const IphoneGiro = ({
  label,
  className = "",
  rest = 0,
  autoSpin = true,
  returnToRest = true,
  sensitivity = 28,
  priority = false,
}: IphoneGiroProps) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const N = FRAME_COUNT;
  const inicio = ((rest % N) + N) % N;

  useEffect(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img) return;

    let pos = inicio;
    let vel = 0;
    let dragging = false;
    let lastX = 0;
    let lastT = 0;
    let raf = 0;
    let spin: object | null = null;
    let visible = false;
    let actual = inicio;
    let alive = true;
    let presented = false;
    let keyTimer: number | undefined;

    const setLoading = (on: boolean) =>
      wrap.classList.toggle("is-loading", on);
    setLoading(!allFramesReady());

    const show = () => {
      const i = ((Math.round(pos) % N) + N) % N;
      if (i === actual) return;
      // si el fotograma aún no llegó, se queda el último visible
      if (isFrameReady(i)) {
        img.src = frameUrl(i);
        actual = i;
      }
    };
    const nearestRest = () => inicio + Math.round((pos - inicio) / N) * N;

    const tick = () => {
      raf = 0;
      if (!alive || dragging || spin) return;
      let more = false;
      if (!reducedMotion() && Math.abs(vel) > 0.02) {
        pos += vel;
        vel *= 0.94;
        more = true;
      } else {
        vel = 0;
        if (returnToRest && !reducedMotion()) {
          const d = nearestRest() - pos;
          if (Math.abs(d) < 0.05) pos = nearestRest();
          else {
            pos += d * 0.07;
            more = true;
          }
        }
      }
      show();
      if (more) raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const pxPerFrame = () => Math.max(3, wrap.clientWidth / sensitivity);

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      preloadFrames(inicio); // si aún no arrancó, que arranque ya
      dragging = true;
      spin = null;
      vel = 0;
      wrap.classList.add("is-drag");
      try {
        wrap.setPointerCapture(e.pointerId);
      } catch {
        /* el puntero ya no existe */
      }
      lastX = e.clientX;
      lastT = performance.now();
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const now = performance.now();
      const df = (e.clientX - lastX) / pxPerFrame();
      pos += df;
      vel = df / Math.max(1, (now - lastT) / 16.7);
      lastX = e.clientX;
      lastT = now;
      show();
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      wrap.classList.remove("is-drag");
      if (performance.now() - lastT > 80) vel = 0; // soltó quieto: sin inercia
      kick();
    };
    const onKey = (e: KeyboardEvent) => {
      const step =
        e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (!step) return;
      e.preventDefault();
      preloadFrames(inicio);
      spin = null;
      vel = 0;
      pos += step * 3;
      show();
      window.clearTimeout(keyTimer);
      keyTimer = window.setTimeout(kick, 900); // vuelve al reposo tras una pausa
    };
    const onFocus = () => preloadFrames(inicio);

    wrap.addEventListener("pointerdown", onDown);
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerup", onUp);
    wrap.addEventListener("pointercancel", onUp);
    wrap.addEventListener("lostpointercapture", onUp);
    wrap.addEventListener("keydown", onKey);
    wrap.addEventListener("focus", onFocus);

    // vuelta completa con easing
    const turn = (dur = 2400) => {
      if (reducedMotion() || dragging || !allFramesReady()) return;
      const from = pos;
      const t0 = performance.now();
      const token = {};
      spin = token;
      const ease = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const step = (now: number) => {
        if (spin !== token || !alive) return;
        const t = Math.min(1, (now - t0) / dur);
        pos = from + ease(t) * N;
        show();
        if (t < 1) requestAnimationFrame(step);
        else {
          spin = null;
          pos = nearestRest();
          show();
        }
      };
      requestAnimationFrame(step);
    };
    const present = () => {
      if (presented || !visible || !autoSpin) return;
      presented = true;
      turn();
    };

    const offReady = onAllFramesReady(() => {
      setLoading(false);
      present();
    });
    const cancelIdle = preloadFramesWhenIdle(inicio);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio > 0.35;
        if (visible && allFramesReady()) present();
      },
      { threshold: [0, 0.35, 0.6] },
    );
    io.observe(wrap);

    return () => {
      alive = false;
      spin = null;
      if (raf) cancelAnimationFrame(raf);
      window.clearTimeout(keyTimer);
      io.disconnect();
      offReady();
      cancelIdle();
      wrap.removeEventListener("pointerdown", onDown);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerup", onUp);
      wrap.removeEventListener("pointercancel", onUp);
      wrap.removeEventListener("lostpointercapture", onUp);
      wrap.removeEventListener("keydown", onKey);
      wrap.removeEventListener("focus", onFocus);
    };
  }, [N, inicio, autoSpin, returnToRest, sensitivity]);

  return (
    <div
      ref={wrapRef}
      className={`iphone-giro ${className}`}
      role="img"
      aria-label={label}
      tabIndex={0}
    >
      <img
        ref={imgRef}
        src={frameUrl(inicio)}
        alt=""
        width={FRAME_WIDTH}
        height={FRAME_HEIGHT}
        draggable={false}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        loading={priority ? "eager" : "lazy"}
      />
    </div>
  );
};

export default IphoneGiro;
