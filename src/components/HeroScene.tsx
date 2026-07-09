import { useEffect, useRef } from "react";
import * as THREE from "three";

const BG_COLOR = 0x0a0a0a;
const MESH_Z = -9;

// Hover bump del terreno
const HOVER_AMP = 1.0;
const HOVER_SIGMA = 3.2;
const HOVER_SIGMA2 = 2 * HOVER_SIGMA * HOVER_SIGMA;

const GREEN = 0x00ff7f;
const CYAN = 0x22d3ee;
const BLUE = 0x0d99ff;

/**
 * Escena 3D del hero — "holographic command deck":
 * terreno wireframe + giroscopio de anillos orbitales alrededor del título,
 * campo de partículas a la deriva y objetos wireframe flotantes en los bordes.
 * Todo el grupo holográfico hace parallax con el cursor.
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

    // ── Grupo holográfico (parallax con el cursor) ──────────────────────────
    const holo = new THREE.Group();
    scene.add(holo);

    // Giroscopio: 3 anillos orbitales alrededor del título
    const ringSpecs = [
      { radius: 4.0, color: GREEN, tilt: [Math.PI / 2.4, 0.3, 0] as const, opacity: 0.4 },
      { radius: 3.4, color: CYAN, tilt: [Math.PI / 3.2, -0.5, 0.4] as const, opacity: 0.32 },
      { radius: 2.8, color: BLUE, tilt: [Math.PI / 1.9, 0.8, -0.3] as const, opacity: 0.38 },
    ];

    const rings: THREE.Mesh[] = [];
    const gyro = new THREE.Group();
    gyro.position.set(0, 0.7, -4);
    holo.add(gyro);

    for (const spec of ringSpecs) {
      const ringGeo = new THREE.TorusGeometry(spec.radius, 0.012, 8, 160);
      const ringMat = new THREE.MeshBasicMaterial({
        color: spec.color,
        transparent: true,
        opacity: spec.opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      disposables.push(ringGeo, ringMat);
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.set(spec.tilt[0], spec.tilt[1], spec.tilt[2]);
      gyro.add(ring);
      rings.push(ring);
    }

    // Campo de partículas a la deriva
    const PARTICLES = 380;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(PARTICLES * 3);
    const pCol = new Float32Array(PARTICLES * 3);
    const pSpeed = new Float32Array(PARTICLES);
    const palette = [
      new THREE.Color(GREEN),
      new THREE.Color(CYAN),
      new THREE.Color(BLUE),
      new THREE.Color(0xffffff),
    ];
    for (let i = 0; i < PARTICLES; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 30;
      pPos[i * 3 + 1] = Math.random() * 13 - 3;
      pPos[i * 3 + 2] = -Math.random() * 22 + 2;
      const c = palette[Math.floor(Math.random() * palette.length)];
      const dim = 0.35 + Math.random() * 0.65;
      pCol[i * 3] = c.r * dim;
      pCol[i * 3 + 1] = c.g * dim;
      pCol[i * 3 + 2] = c.b * dim;
      pSpeed[i] = 0.12 + Math.random() * 0.35;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(pCol, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    disposables.push(pGeo, pMat);
    const particles = new THREE.Points(pGeo, pMat);
    holo.add(particles);
    const particlePosition = pGeo.attributes.position as THREE.BufferAttribute;

    // Objetos wireframe flotantes en los márgenes (visibles en desktop)
    const floaterSpecs = [
      {
        geo: new THREE.IcosahedronGeometry(0.75, 0),
        color: GREEN,
        pos: [-5.4, 2.0, -3.5] as const,
        spin: 0.25,
      },
      {
        geo: new THREE.OctahedronGeometry(0.6, 0),
        color: BLUE,
        pos: [5.6, 2.8, -4.5] as const,
        spin: -0.2,
      },
      {
        geo: new THREE.TorusGeometry(0.45, 0.015, 8, 64),
        color: CYAN,
        pos: [5.0, -0.6, -2.5] as const,
        spin: 0.3,
      },
      {
        geo: new THREE.IcosahedronGeometry(0.4, 0),
        color: CYAN,
        pos: [-5.8, -0.2, -5.0] as const,
        spin: -0.35,
      },
    ];

    const floaters: { mesh: THREE.Mesh; spin: number; baseY: number; phase: number }[] = [];
    for (const spec of floaterSpecs) {
      const mat = new THREE.MeshBasicMaterial({
        color: spec.color,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      disposables.push(spec.geo, mat);
      const m = new THREE.Mesh(spec.geo, mat);
      m.position.set(spec.pos[0], spec.pos[1], spec.pos[2]);
      holo.add(m);
      floaters.push({ mesh: m, spin: spec.spin, baseY: spec.pos[1], phase: Math.random() * Math.PI * 2 });
    }

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

      // Giroscopio: cada anillo precesa a su ritmo
      rings[0].rotation.z = 0.3 + t * 0.1;
      rings[0].rotation.x = Math.PI / 2.4 + Math.sin(t * 0.2) * 0.15;
      rings[1].rotation.z = -0.4 + t * 0.14;
      rings[1].rotation.y = -0.5 + Math.sin(t * 0.16) * 0.2;
      rings[2].rotation.z = 0.2 - t * 0.12;
      rings[2].rotation.x = Math.PI / 1.9 + Math.cos(t * 0.24) * 0.12;

      // Partículas: deriva ascendente con reciclaje
      for (let i = 0; i < PARTICLES; i++) {
        let y = particlePosition.getY(i) + pSpeed[i] * 0.008;
        if (y > 10) y = -3;
        particlePosition.setY(i, y);
      }
      particlePosition.needsUpdate = true;

      // Flotadores: rotación + bobbing
      for (const f of floaters) {
        f.mesh.rotation.x += f.spin * 0.008;
        f.mesh.rotation.y += f.spin * 0.011;
        f.mesh.position.y = f.baseY + Math.sin(t * 0.5 + f.phase) * 0.35;
      }

      // Parallax del grupo holográfico hacia el cursor
      holo.rotation.y += (pointerNDC.x * 0.1 - holo.rotation.y) * 0.03;
      holo.rotation.x += (-pointerNDC.y * 0.06 - holo.rotation.x) * 0.03;

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
