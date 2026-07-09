import { useEffect, useRef } from "react";
import * as THREE from "three";

const BG_COLOR = 0x0a0a0a;
const MESH_Z = -9;

// Hover bump del terreno
const HOVER_AMP = 1.0;
const HOVER_SIGMA = 3.2;
const HOVER_SIGMA2 = 2 * HOVER_SIGMA * HOVER_SIGMA;

const GREEN = 0x00ff7f;
const BLUE = 0x0d99ff;

/**
 * Escena 3D del hero: terreno wireframe con gradiente verde → azul,
 * oleaje ambiental y cresta que sigue al cursor.
 */
const HeroScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(BG_COLOR, 7, 30);

    const camera = new THREE.PerspectiveCamera(62, width / height, 0.1, 120);
    camera.position.set(0, 1.6, 7);
    camera.lookAt(0, -1.4, -9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const disposables: { dispose: () => void }[] = [];

    // ── Terreno wireframe (gradiente verde → azul) ──────────────────────────
    const COLS = 110;
    const ROWS = 150;
    const geometry = new THREE.PlaneGeometry(34, 44, COLS, ROWS);
    geometry.rotateX(-Math.PI / 2);

    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.22,
    });
    disposables.push(geometry, material);

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = MESH_Z;
    scene.add(mesh);

    const position = geometry.attributes.position as THREE.BufferAttribute;
    const base = (position.array as Float32Array).slice();

    {
      const colorA = new THREE.Color(GREEN);
      const colorB = new THREE.Color(BLUE);
      const tmp = new THREE.Color();
      const colors = new Float32Array(position.count * 3);
      let minX = Infinity;
      let maxX = -Infinity;
      for (let i = 0; i < position.count; i++) {
        const x = base[i * 3];
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
      }
      const span = maxX - minX || 1;
      for (let i = 0; i < position.count; i++) {
        const f = (base[i * 3] - minX) / span;
        tmp.copy(colorA).lerp(colorB, f);
        colors[i * 3] = tmp.r;
        colors[i * 3 + 1] = tmp.g;
        colors[i * 3 + 2] = tmp.b;
      }
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    }

    const swell = (x: number, z: number, t: number) =>
      Math.sin(x * 0.16 - z * 0.22 + t * 0.5) * 0.7 +
      Math.sin(x * 0.45 + t) * 0.28 +
      Math.cos(z * 0.4 - t * 0.8) * 0.24 +
      Math.sin((x + z) * 0.28 + t * 0.6) * 0.2;

    // ── Interacción con el cursor ───────────────────────────────────────────
    const raycaster = new THREE.Raycaster();
    const pointerNDC = new THREE.Vector2(0, 0);
    const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const hitPoint = new THREE.Vector3();
    const targetPos = new THREE.Vector2(0, MESH_Z);
    const curPos = new THREE.Vector2(0, MESH_Z);
    let active = false;
    let curStrength = 0;

    const onMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointerNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      active = true;
    };
    const onLeaveWindow = (e: MouseEvent) => {
      if (!e.relatedTarget) active = false;
    };
    const onBlur = () => {
      active = false;
    };

    const clock = new THREE.Clock();
    let frameId = 0;

    const renderFrame = () => {
      const t = prefersReducedMotion ? 1.2 : clock.getElapsedTime();
      const tSlow = t * 0.18;

      // Terreno: oleaje + cresta bajo el cursor
      const targetStrength = active ? 1 : 0;
      curStrength += (targetStrength - curStrength) * 0.04;

      if (curStrength > 0.001) {
        raycaster.setFromCamera(pointerNDC, camera);
        if (raycaster.ray.intersectPlane(groundPlane, hitPoint)) {
          targetPos.set(hitPoint.x, hitPoint.z);
        }
        curPos.lerp(targetPos, 0.06);
      }

      const bumpActive = curStrength > 0.001;
      const cx = curPos.x;
      const cz = curPos.y;

      for (let i = 0; i < position.count; i++) {
        const x = base[i * 3];
        const z = base[i * 3 + 2];
        let y = swell(x, z, tSlow);
        if (bumpActive) {
          const dx = x - cx;
          const dz = z + MESH_Z - cz;
          const d2 = dx * dx + dz * dz;
          y += curStrength * HOVER_AMP * Math.exp(-d2 / HOVER_SIGMA2);
        }
        position.setY(i, y);
      }
      position.needsUpdate = true;

      renderer.render(scene, camera);
      if (!prefersReducedMotion) frameId = requestAnimationFrame(renderFrame);
    };
    renderFrame();

    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    if (!prefersReducedMotion) {
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseout", onLeaveWindow);
      window.addEventListener("blur", onBlur);
    }

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeaveWindow);
      window.removeEventListener("blur", onBlur);
      for (const d of disposables) d.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  const fadeMask =
    "radial-gradient(ellipse 85% 78% at 50% 62%, #000 30%, transparent 80%)";

  return (
    <div
      ref={mountRef}
      className="absolute inset-0"
      aria-hidden="true"
      style={{ maskImage: fadeMask, WebkitMaskImage: fadeMask }}
    />
  );
};

export default HeroScene;
