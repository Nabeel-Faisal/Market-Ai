import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

/* Theme tokens are stored as raw HSL channels ("224 92% 62%"). */
const readColor = (styles, token) => {
  const [h, s, l] = styles
    .getPropertyValue(token)
    .trim()
    .split(/\s+/)
    .map((part) => parseFloat(part));
  const color = new THREE.Color();
  color.setHSL((h || 0) / 360, (s || 0) / 100, (l || 50) / 100);
  return color;
};

/**
 * HeroDepthScene — real WebGL depth behind the hero panel: a slowly turning
 * cluster of wireframe solids and glowing nodes that the camera parallaxes
 * across as the pointer moves.
 *
 * Loaded lazily and only mounted on large, fine-pointer screens (see
 * HeroDepthLayer), pauses off-screen, and disposes everything on unmount.
 */
const HeroDepthScene = ({ className }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return undefined; // No WebGL — the hero simply renders without it
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 9);

    const group = new THREE.Group();
    // Biased toward the panel side of the hero rather than dead centre
    group.position.x = 2.3;
    scene.add(group);

    const disposables = [];
    const styles = getComputedStyle(document.documentElement);
    let palette = {
      brand: readColor(styles, '--brand'),
      cyan: readColor(styles, '--brand-cyan'),
      violet: readColor(styles, '--brand-violet'),
    };
    const isDark = () => document.documentElement.classList.contains('dark');

    // --- Wireframe solids -------------------------------------------------
    const solids = [
      { geo: new THREE.IcosahedronGeometry(1.15, 1), pos: [-1.9, 0.8, -1.2], color: palette.brand },
      { geo: new THREE.OctahedronGeometry(0.8, 0), pos: [1.9, -1.2, 0.6], color: palette.cyan },
      { geo: new THREE.IcosahedronGeometry(0.62, 0), pos: [1.4, 1.5, -2.4], color: palette.violet },
      { geo: new THREE.TetrahedronGeometry(0.55, 0), pos: [-2.1, -1.5, 0.9], color: palette.cyan },
    ];

    const meshes = solids.map(({ geo, pos, color }) => {
      const wire = new THREE.WireframeGeometry(geo);
      const material = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: isDark() ? 0.5 : 0.32,
      });
      const line = new THREE.LineSegments(wire, material);
      line.position.set(...pos);
      line.userData.spin = (Math.random() - 0.5) * 0.0055;
      group.add(line);
      disposables.push(geo, wire, material);
      return line;
    });

    // --- Glowing nodes ----------------------------------------------------
    const nodeCount = 90;
    const positions = new Float32Array(nodeCount * 3);
    for (let i = 0; i < nodeCount; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const nodeMat = new THREE.PointsMaterial({
      color: palette.cyan,
      size: 0.055,
      transparent: true,
      opacity: isDark() ? 0.85 : 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const nodes = new THREE.Points(nodeGeo, nodeMat);
    group.add(nodes);
    disposables.push(nodeGeo, nodeMat);

    // --- Loop -------------------------------------------------------------
    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let frame = 0;
    let running = false;
    let elapsed = 0;

    const render = () => {
      elapsed += 0.016;

      // Camera eases toward the pointer for parallax depth
      target.x += (pointer.x * 1.15 - target.x) * 0.045;
      target.y += (pointer.y * 0.75 - target.y) * 0.045;
      camera.position.x = target.x;
      camera.position.y = target.y;
      camera.lookAt(0, 0, 0);

      group.rotation.y += 0.0014;
      group.rotation.x = Math.sin(elapsed * 0.18) * 0.1;
      meshes.forEach((mesh) => {
        mesh.rotation.x += mesh.userData.spin;
        mesh.rotation.y += mesh.userData.spin * 0.8;
      });
      nodes.rotation.y -= 0.0007;

      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(render);
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = window.requestAnimationFrame(render);
    };

    const stop = () => {
      running = false;
      window.cancelAnimationFrame(frame);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      renderer.setSize(rect.width, rect.height, false);
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
    };

    const onPointerMove = (event) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };

    const onVisibility = () => (document.hidden ? stop() : start());

    const onTheme = () => {
      palette = {
        brand: readColor(styles, '--brand'),
        cyan: readColor(styles, '--brand-cyan'),
        violet: readColor(styles, '--brand-violet'),
      };
      meshes.forEach((mesh, i) => {
        mesh.material.color.copy(solids[i].color.copy(Object.values(palette)[i % 3]));
        mesh.material.opacity = isDark() ? 0.5 : 0.32;
      });
      nodeMat.color.copy(palette.cyan);
      nodeMat.opacity = isDark() ? 0.85 : 0.5;
    };

    resize();
    start();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), {
      threshold: 0,
    });
    io.observe(canvas);

    const themeObserver = new MutationObserver(onTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      resizeObserver.disconnect();
      io.disconnect();
      themeObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('visibilitychange', onVisibility);
      disposables.forEach((item) => item.dispose?.());
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
    />
  );
};

export default HeroDepthScene;
