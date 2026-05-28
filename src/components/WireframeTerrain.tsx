import { useEffect, useRef } from "react";
import * as THREE from "three";

const BG_COLOR = 0x0a0a0a;
const MESH_Z = -9;

// Hover bump
const HOVER_AMP = 1.0; // peak height of the crest under the cursor
const HOVER_SIGMA = 3.2; // world-unit spread of the crest
const HOVER_SIGMA2 = 2 * HOVER_SIGMA * HOVER_SIGMA;

const WireframeTerrain = () => {
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
    scene.fog = new THREE.Fog(BG_COLOR, 7, 26);

    const camera = new THREE.PerspectiveCamera(62, width / height, 0.1, 120);
    camera.position.set(0, 1.6, 7);
    camera.lookAt(0, -1.4, -9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const COLS = 110;
    const ROWS = 150;
    const geometry = new THREE.PlaneGeometry(34, 44, COLS, ROWS);
    geometry.rotateX(-Math.PI / 2);

    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.18,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = MESH_Z;
    scene.add(mesh);

    const position = geometry.attributes.position as THREE.BufferAttribute;
    const base = (position.array as Float32Array).slice();

    // Static color gradient across the width: Tresqu green → Wallbit blue
    {
      const colorA = new THREE.Color(0x00ff7f);
      const colorB = new THREE.Color(0x0d99ff);
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

    // Subtle ambient swell of the terrain
    const swell = (x: number, z: number, t: number) =>
      Math.sin(x * 0.16 - z * 0.22 + t * 0.5) * 0.7 +
      Math.sin(x * 0.45 + t) * 0.28 +
      Math.cos(z * 0.4 - t * 0.8) * 0.24 +
      Math.sin((x + z) * 0.28 + t * 0.6) * 0.2;

    // Pointer tracking → crest that follows the cursor
    const raycaster = new THREE.Raycaster();
    const pointerNDC = new THREE.Vector2(0, 0);
    const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const hitPoint = new THREE.Vector3();
    const targetPos = new THREE.Vector2(0, MESH_Z); // world x, z of the crest
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
      const t = prefersReducedMotion ? 1.2 : clock.getElapsedTime() * 0.18;

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
        let y = swell(x, z, t);
        if (bumpActive) {
          const dx = x - cx;
          const dz = z + MESH_Z - cz; // local z → world z
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
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  const fadeMask =
    "radial-gradient(ellipse 82% 72% at 50% 74%, #000 22%, transparent 78%)";

  return (
    <div
      ref={mountRef}
      className="absolute inset-0"
      aria-hidden="true"
      style={{ maskImage: fadeMask, WebkitMaskImage: fadeMask }}
    />
  );
};

export default WireframeTerrain;
