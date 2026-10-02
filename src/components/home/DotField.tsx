import { useEffect, useRef } from "react";

/* ---------- Ruido simplex 3D (compacto, semilla fija) ---------- */
const GRAD3 = [
  [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
  [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
  [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1],
];
const PERM = (() => {
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  let s = 1337;
  for (let i = 255; i > 0; i--) {
    s = (s * 16807) % 2147483647;
    const j = s % (i + 1);
    [p[i], p[j]] = [p[j], p[i]];
  }
  const perm = new Uint8Array(512);
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  return perm;
})();

const corner = (gi: number, x: number, y: number, z: number) => {
  let t = 0.6 - x * x - y * y - z * z;
  if (t < 0) return 0;
  const g = GRAD3[gi % 12];
  t *= t;
  return t * t * (g[0] * x + g[1] * y + g[2] * z);
};

function noise3(x: number, y: number, z: number): number {
  const F3 = 1 / 3;
  const G3 = 1 / 6;
  const s = (x + y + z) * F3;
  const i = Math.floor(x + s);
  const j = Math.floor(y + s);
  const k = Math.floor(z + s);
  const t = (i + j + k) * G3;
  const x0 = x - i + t;
  const y0 = y - j + t;
  const z0 = z - k + t;
  let i1, j1, k1, i2, j2, k2;
  if (x0 >= y0) {
    if (y0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
    else if (x0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 0; k2 = 1; }
    else { i1 = 0; j1 = 0; k1 = 1; i2 = 1; j2 = 0; k2 = 1; }
  } else {
    if (y0 < z0) { i1 = 0; j1 = 0; k1 = 1; i2 = 0; j2 = 1; k2 = 1; }
    else if (x0 < z0) { i1 = 0; j1 = 1; k1 = 0; i2 = 0; j2 = 1; k2 = 1; }
    else { i1 = 0; j1 = 1; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
  }
  const x1 = x0 - i1 + G3, y1 = y0 - j1 + G3, z1 = z0 - k1 + G3;
  const x2 = x0 - i2 + 2 * G3, y2 = y0 - j2 + 2 * G3, z2 = z0 - k2 + 2 * G3;
  const x3 = x0 - 1 + 3 * G3, y3 = y0 - 1 + 3 * G3, z3 = z0 - 1 + 3 * G3;
  const ii = i & 255, jj = j & 255, kk = k & 255;
  const n0 = corner(PERM[ii + PERM[jj + PERM[kk]]], x0, y0, z0);
  const n1 = corner(PERM[ii + i1 + PERM[jj + j1 + PERM[kk + k1]]], x1, y1, z1);
  const n2 = corner(PERM[ii + i2 + PERM[jj + j2 + PERM[kk + k2]]], x2, y2, z2);
  const n3 = corner(PERM[ii + 1 + PERM[jj + 1 + PERM[kk + 1]]], x3, y3, z3);
  return 32 * (n0 + n1 + n2 + n3); // ~[-1, 1]
}

const LEVELS = 7; // niveles de brillo agrupados en un solo fill
const COLORS = Array.from({ length: LEVELS }, (_, idx) => {
  const a = (idx + 1) / LEVELS;
  // índigo profundo → azul eléctrico al subir la intensidad
  const r = Math.round(36 + 40 * a);
  const g = Math.round(36 + 46 * a);
  const b = Math.round(170 + 85 * a);
  return `rgba(${r},${g},${b},${(0.22 + 0.74 * a).toFixed(3)})`;
});

/**
 * Retícula de puntos azul noche del hero: la intensidad sigue un ruido que se
 * desplaza despacio y el cursor abre un remolino. ~30 fps, se pausa fuera de
 * pantalla o con la pestaña oculta; con prefers-reduced-motion se pinta una
 * sola vez, quieta. La animación arranca cuando el navegador queda ocioso
 * para no competir con la primera pintura.
 */
const DotField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const host = canvas?.parentElement;
    if (!canvas || !ctx || !host) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let W = 0;
    let H = 0;
    let gap = 6;
    let size = 2;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999, on: false };
    let visible = true;
    let raf = 0;
    let last = 0;
    let started = false;

    const draw = (time: number) => {
      const t = time * 0.000045;
      ctx.clearRect(0, 0, W, H);
      const paths = COLORS.map(() => new Path2D());
      const f = 0.0021; // escala de las manchas
      const cx = W / 2;
      const top = H * 0.12;
      const bottom = H * 0.86;
      const R = 150;
      const R2 = R * R;
      for (let y = gap / 2; y < H; y += gap) {
        // las manchas se apagan hacia el borde inferior
        const fadeY =
          y < top
            ? 0.75 + 0.25 * (y / top)
            : y > bottom
              ? Math.max(0, 1 - (y - bottom) / (H - bottom))
              : 1;
        for (let x = gap / 2; x < W; x += gap) {
          const n =
            noise3(x * f, y * f * 1.25, t) * 0.75 +
            noise3(x * f * 2.6, y * f * 2.6, t * 1.7 + 9) * 0.25;
          // banda más tenue detrás del titular para que se lea bien
          const dxC = (x - cx) / (W * 0.36);
          const dyC = (y - H * 0.33) / (H * 0.26);
          const clear = Math.max(0, 1 - (dxC * dxC + dyC * dyC));
          let v = (n - 0.02) * 2.6 - clear * 0.5;
          let px = x;
          let py = y;
          if (mouse.on) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < R2) {
              const k = 1 - Math.sqrt(d2) / R; // 0..1
              const ang = Math.atan2(dy, dx) + k * 1.4; // remolino
              const push = k * k * 26;
              px = x + Math.cos(ang) * push;
              py = y + Math.sin(ang) * push;
              v += k * 0.9;
            }
          }
          v *= fadeY;
          if (v <= 0.04) continue;
          const lvl = Math.min(LEVELS - 1, Math.floor(v * LEVELS));
          paths[lvl].rect(px - size / 2, py - size / 2, size, size);
        }
      }
      for (let l = 0; l < LEVELS; l++) {
        ctx.fillStyle = COLORS[l];
        ctx.fill(paths[l]);
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width;
      H = rect.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gap = W < 600 ? 5 : 6;
      size = W < 600 ? 1.6 : 2;
      if (reduce || !started) draw(8000);
    };

    const loop = (time: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden || time - last < 33) return; // ~30 fps
      last = time;
      mouse.x += (mouse.tx - mouse.x) * 0.18;
      mouse.y += (mouse.ty - mouse.y) * 0.18;
      draw(time + 8000);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - r.left;
      mouse.ty = e.clientY - r.top;
      if (!mouse.on) {
        mouse.x = mouse.tx;
        mouse.y = mouse.ty;
        mouse.on = true;
      }
    };
    const onLeave = () => {
      mouse.on = false;
    };

    // primer pintado estático en el siguiente frame (no bloquea el montaje)
    const firstPaint = requestAnimationFrame(() => resize());
    window.addEventListener("resize", resize);

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(canvas);

    let idleId: number | undefined;
    let timeoutId: number | undefined;
    const start = () => {
      if (started || reduce) return;
      started = true;
      host.addEventListener("pointermove", onMove);
      host.addEventListener("pointerleave", onLeave);
      raf = requestAnimationFrame(loop);
    };
    if (!reduce) {
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(start, { timeout: 1200 });
      } else {
        timeoutId = window.setTimeout(start, 400);
      }
    }

    return () => {
      cancelAnimationFrame(firstPaint);
      cancelAnimationFrame(raf);
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function")
        window.cancelIdleCallback(idleId);
      window.clearTimeout(timeoutId);
      window.removeEventListener("resize", resize);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      io.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="tq-dots" aria-hidden="true" />;
};

export default DotField;
