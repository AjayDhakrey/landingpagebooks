import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HowItWorks3DProps {
  stepIndex: number; // 0, 1, or 2
}

export const HowItWorks3D: React.FC<HowItWorks3DProps> = ({ stepIndex }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef<number>(stepIndex);

  useEffect(() => {
    stepRef.current = stepIndex;
  }, [stepIndex]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ─── SCENE ────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = null;

    const width  = container.clientWidth  || 360;
    const height = container.clientHeight || 280;
    const isMobile = width < 480;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 2.6, isMobile ? 7 : 6.2);
    camera.lookAt(0, 0.2, 0);

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch (e) {
      console.warn('WebGL error', e);
      return;
    }
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // ─── LIGHTS ───────────────────────────────────────────────────────
    const hemi = new THREE.HemisphereLight(0xffffff, 0x1e3a8a, 0.8);
    scene.add(hemi);

    const amb  = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(amb);

    const dir = new THREE.DirectionalLight(0xffffff, 1.6);
    dir.position.set(5, 8, 5);
    dir.castShadow = true;
    dir.shadow.mapSize.width  = 1024;
    dir.shadow.mapSize.height = 1024;
    scene.add(dir);

    const blueRim = new THREE.DirectionalLight(0x3b82f6, 1.8);
    blueRim.position.set(-5, 3, -3);
    scene.add(blueRim);

    const pointGlow = new THREE.PointLight(0x60a5fa, 2.0, 8);
    pointGlow.position.set(0, 2, 2);
    scene.add(pointGlow);

    // ─── SHARED: Glowing stage disc ──────────────────────────────────
    const stageGeo = new THREE.CylinderGeometry(2.5, 2.6, 0.12, 48);
    const stageMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.25, metalness: 0.6 });
    const stageMesh = new THREE.Mesh(stageGeo, stageMat);
    stageMesh.position.y = -1.1;
    stageMesh.receiveShadow = true;
    scene.add(stageMesh);

    // Glowing outer ring
    const outerRingGeo = new THREE.RingGeometry(2.45, 2.65, 64);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6, side: THREE.DoubleSide, transparent: true, opacity: 0.7,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRing.rotation.x = -Math.PI / 2;
    outerRing.position.y = -1.03;
    scene.add(outerRing);

    // Inner pulsing ring
    const innerRingGeo = new THREE.RingGeometry(1.5, 1.6, 48);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa, side: THREE.DoubleSide, transparent: true, opacity: 0.4,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.rotation.x = -Math.PI / 2;
    innerRing.position.y = -1.02;
    scene.add(innerRing);

    // ─── SHARED: Floating particles ──────────────────────────────────
    const particleCount = 60;
    const pPositions = new Float32Array(particleCount * 3);
    const pSpeeds    = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      const r = 1.2 + Math.random() * 2.5;
      const angle = Math.random() * Math.PI * 2;
      pPositions[i * 3]     = Math.cos(angle) * r;
      pPositions[i * 3 + 1] = -0.8 + Math.random() * 3.5;
      pPositions[i * 3 + 2] = Math.sin(angle) * r;
      pSpeeds[i] = 0.003 + Math.random() * 0.006;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x93c5fd, size: 0.055, transparent: true, opacity: 0.75 });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ─── STEP 0: 3D School Building ─────────────────────────────────
    const step0Group = new THREE.Group();
    scene.add(step0Group);

    // Main body – deep royal navy
    const schoolBody = new THREE.Mesh(
      new THREE.BoxGeometry(1.8, 1.4, 1.2),
      new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.3, metalness: 0.25 })
    );
    schoolBody.position.y = 0;
    schoolBody.castShadow = true;
    step0Group.add(schoolBody);

    // Lighter side wings
    const wingMat = new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.4 });
    for (const wx of [-1.35, 1.35]) {
      const wing = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.0, 1.0), wingMat);
      wing.position.set(wx, -0.1, 0);
      wing.castShadow = true;
      step0Group.add(wing);
    }

    // Columns
    const colMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.3 });
    for (let cx = -0.42; cx <= 0.43; cx += 0.42) {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 1.4, 16), colMat);
      col.position.set(cx, 0, 0.65);
      step0Group.add(col);
    }

    // Triangular pediment
    const pediment = new THREE.Mesh(
      new THREE.CylinderGeometry(0, 1.05, 0.55, 4),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.35 })
    );
    pediment.position.y = 0.97;
    pediment.rotation.y = Math.PI / 4;
    pediment.castShadow = true;
    step0Group.add(pediment);

    // Clock tower
    const tower = new THREE.Mesh(
      new THREE.BoxGeometry(0.38, 0.6, 0.38),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 })
    );
    tower.position.y = 1.5;
    step0Group.add(tower);

    // Clock face
    const clockFace = new THREE.Mesh(
      new THREE.CircleGeometry(0.12, 24),
      new THREE.MeshStandardMaterial({ color: 0xfbbf24, emissive: 0xfbbf24, emissiveIntensity: 0.5 })
    );
    clockFace.position.set(0, 1.5, 0.2);
    step0Group.add(clockFace);

    // Glowing entrance door
    const doorMat = new THREE.MeshStandardMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.85, emissive: 0x3b82f6, emissiveIntensity: 0.3 });
    const door = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.8, 0.1), doorMat);
    door.position.set(0, -0.35, 0.65);
    step0Group.add(door);

    // Golden gate badge
    const badge = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.18, 0.04, 24),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.8, roughness: 0.2, emissive: 0xf59e0b, emissiveIntensity: 0.2 })
    );
    badge.position.set(0.55, 0.85, 0.65);
    step0Group.add(badge);

    // Entrance step
    const steps0 = new THREE.Mesh(
      new THREE.BoxGeometry(1.1, 0.12, 0.5),
      new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.7 })
    );
    steps0.position.set(0, -0.76, 0.8);
    step0Group.add(steps0);

    // Orbiting verification sphere
    const verifyOrbit = new THREE.Group();
    step0Group.add(verifyOrbit);
    const verifySphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0x10b981, emissive: 0x10b981, emissiveIntensity: 0.6, metalness: 0.5 })
    );
    verifySphere.position.set(1.4, 0.6, 0);
    verifyOrbit.add(verifySphere);

    step0Group.position.set(0, 0.15, 0);

    // ─── STEP 1: 3D Book Stacking ────────────────────────────────────
    const step1Group = new THREE.Group();
    scene.add(step1Group);

    const bookColors = [
      { cover: 0x2563eb, spine: 0x1d4ed8 },
      { cover: 0x059669, spine: 0x047857 },
      { cover: 0xd97706, spine: 0xb45309 },
      { cover: 0x7c3aed, spine: 0x6d28d9 },
      { cover: 0xe11d48, spine: 0xbe123c },
    ];
    const bookMeshes: THREE.Group[] = [];

    bookColors.forEach((spec, i) => {
      const bg = new THREE.Group();

      // Pages
      bg.add(new THREE.Mesh(
        new THREE.BoxGeometry(1.35, 0.10, 1.75),
        new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 })
      ));

      // Cover
      const coverMat = new THREE.MeshStandardMaterial({ color: spec.cover, roughness: 0.3, metalness: 0.2 });
      const topCover = new THREE.Mesh(new THREE.BoxGeometry(1.38, 0.02, 1.78), coverMat);
      topCover.position.y = 0.065;
      topCover.castShadow = true;
      bg.add(topCover);

      const botCover = topCover.clone();
      botCover.position.y = -0.065;
      bg.add(botCover);

      // Spine
      const spine = new THREE.Mesh(
        new THREE.BoxGeometry(0.03, 0.12, 1.78),
        new THREE.MeshStandardMaterial({ color: spec.spine, roughness: 0.4 })
      );
      spine.position.x = -0.7;
      bg.add(spine);

      // Gold foil strip
      const foil = new THREE.Mesh(
        new THREE.BoxGeometry(0.75, 0.023, 0.08),
        new THREE.MeshStandardMaterial({ color: 0xfcd34d, metalness: 0.9, roughness: 0.1 })
      );
      foil.position.set(0.1, 0.077, -0.4);
      bg.add(foil);

      bg.position.y = -0.55 + i * 0.18;
      bg.rotation.y = ((i % 2) - 0.5) * 0.06;
      step1Group.add(bg);
      bookMeshes.push(bg);
    });

    // Bundle ribbon torus
    const ribbon = new THREE.Mesh(
      new THREE.TorusGeometry(0.92, 0.025, 16, 64),
      new THREE.MeshStandardMaterial({ color: 0x3b82f6, metalness: 0.6, roughness: 0.2, emissive: 0x1d4ed8, emissiveIntensity: 0.3 })
    );
    ribbon.rotation.x = Math.PI / 2;
    ribbon.position.y = -0.15;
    step1Group.add(ribbon);

    // Orbiting "certified" rings around the stack
    const orbitGroup1 = new THREE.Group();
    step1Group.add(orbitGroup1);

    const certRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.3, 0.018, 12, 48),
      new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.8, roughness: 0.1, emissive: 0xf59e0b, emissiveIntensity: 0.4 })
    );
    orbitGroup1.add(certRing);

    const orbitGroup2 = new THREE.Group();
    step1Group.add(orbitGroup2);
    const certRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.5, 0.014, 12, 48),
      new THREE.MeshStandardMaterial({ color: 0x60a5fa, metalness: 0.5, roughness: 0.2, transparent: true, opacity: 0.6 })
    );
    certRing2.rotation.z = Math.PI / 3;
    orbitGroup2.add(certRing2);

    // ─── STEP 2: Delivery Box & GPS ─────────────────────────────────
    const step2Group = new THREE.Group();
    scene.add(step2Group);

    const boxBodyMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.35, metalness: 0.25 });
    const boxMain = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.1, 1.8), boxBodyMat);
    boxMain.castShadow = true;
    step2Group.add(boxMain);

    // Box lid (slightly lighter)
    const lid = new THREE.Mesh(
      new THREE.BoxGeometry(1.62, 0.12, 1.82),
      new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.4 })
    );
    lid.position.y = 0.61;
    step2Group.add(lid);

    // Blue security tape
    const tape = new THREE.Mesh(
      new THREE.BoxGeometry(1.62, 0.03, 0.28),
      new THREE.MeshStandardMaterial({ color: 0x3b82f6, metalness: 0.5, roughness: 0.2 })
    );
    tape.position.y = 0.56;
    step2Group.add(tape);

    // Perpendicular tape
    const tape2 = tape.clone();
    (tape2 as THREE.Mesh).rotation.y = Math.PI / 2;
    tape2.position.y = 0.56;
    step2Group.add(tape2);

    // Hologram seal badge
    const seal = new THREE.Mesh(
      new THREE.CylinderGeometry(0.22, 0.22, 0.04, 32),
      new THREE.MeshStandardMaterial({ color: 0x10b981, emissive: 0x10b981, emissiveIntensity: 0.5, metalness: 0.7, roughness: 0.2 })
    );
    seal.position.set(0.35, 0.63, 0.45);
    step2Group.add(seal);

    // GPS satellite ring
    const gpsOrbit = new THREE.Group();
    step2Group.add(gpsOrbit);

    const gpsSat = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 12, 12),
      new THREE.MeshStandardMaterial({ color: 0xfbbf24, emissive: 0xf59e0b, emissiveIntensity: 0.8, metalness: 0.6 })
    );
    gpsSat.position.set(1.6, 0, 0);
    gpsOrbit.add(gpsSat);

    const gpsSat2 = gpsSat.clone();
    gpsSat2.position.set(-1.6, 0, 0);
    gpsOrbit.add(gpsSat2);

    // GPS orbit ring
    const gpsRingGeo = new THREE.TorusGeometry(1.6, 0.015, 8, 48);
    const gpsRingMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.5, emissive: 0xf59e0b, emissiveIntensity: 0.3 });
    const gpsRing = new THREE.Mesh(gpsRingGeo, gpsRingMat);
    gpsOrbit.add(gpsRing);

    // Ground trajectory / radar ring
    const radarGeo = new THREE.RingGeometry(1.3, 1.5, 48);
    const radarMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide, transparent: true, opacity: 0.7 });
    const radarRing = new THREE.Mesh(radarGeo, radarMat);
    radarRing.rotation.x = -Math.PI / 2;
    radarRing.position.y = -0.72;
    step2Group.add(radarRing);

    // Pulse wave rings (animated outward)
    const pulseRings: THREE.Mesh[] = [];
    for (let pr = 0; pr < 3; pr++) {
      const prGeo = new THREE.RingGeometry(0.1, 0.13, 32);
      const prMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide, transparent: true, opacity: 0.0 });
      const prMesh = new THREE.Mesh(prGeo, prMat);
      prMesh.rotation.x = -Math.PI / 2;
      prMesh.position.y = -0.71;
      step2Group.add(prMesh);
      pulseRings.push(prMesh);
    }

    step2Group.position.y = 0.1;

    // ─── SMOOTH SCALE TRANSITIONS ────────────────────────────────────
    step0Group.scale.setScalar(stepRef.current === 0 ? 1 : 0.001);
    step1Group.scale.setScalar(stepRef.current === 1 ? 1 : 0.001);
    step2Group.scale.setScalar(stepRef.current === 2 ? 1 : 0.001);

    // ─── ANIMATION LOOP ──────────────────────────────────────────────
    const clock = new THREE.Clock();
    let animId: number;
    let isVisible = true;

    const observer = new IntersectionObserver(([e]) => { isVisible = e.isIntersecting; }, { threshold: 0.1 });
    observer.observe(container);

    // mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect();
      mouseX = ((e.clientX - r.left) / r.width) * 2 - 1;
      mouseY = -(((e.clientY - r.top) / r.height) * 2 - 1);
    };
    container.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;
      const t = clock.getElapsedTime();
      const cur = stepRef.current;

      // ── Parallax ──
      if (!prefersReducedMotion) {
        camera.position.x += (mouseX * 0.7 - camera.position.x) * 0.04;
        camera.position.y += (2.6 + mouseY * 0.4 - camera.position.y) * 0.04;
        camera.lookAt(0, 0.2, 0);
      }

      // ── Smooth step transitions ──
      const lerpK = 0.12;
      const tv = (n: number) => new THREE.Vector3(n, n, n);
      step0Group.scale.lerp(tv(cur === 0 ? 1 : 0.001), lerpK);
      step1Group.scale.lerp(tv(cur === 1 ? 1 : 0.001), lerpK);
      step2Group.scale.lerp(tv(cur === 2 ? 1 : 0.001), lerpK);
      step0Group.visible = step0Group.scale.x > 0.01;
      step1Group.visible = step1Group.scale.x > 0.01;
      step2Group.visible = step2Group.scale.x > 0.01;

      // ── Shared rings ──
      outerRing.material.opacity = 0.5 + Math.sin(t * 1.8) * 0.2;
      innerRing.rotation.z = t * 0.6;
      innerRing.material.opacity = 0.25 + Math.sin(t * 2.4) * 0.15;

      // ── Particles drift upward in a spiral ──
      const pos = pGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3 + 1] += pSpeeds[i];
        if (pos[i * 3 + 1] > 3.5) pos[i * 3 + 1] = -0.8;
        // Slight angular drift
        const angle = Math.atan2(pos[i * 3 + 2], pos[i * 3]) + 0.002;
        const r = Math.sqrt(pos[i * 3] ** 2 + pos[i * 3 + 2] ** 2);
        pos[i * 3]     = Math.cos(angle) * r;
        pos[i * 3 + 2] = Math.sin(angle) * r;
      }
      pGeo.attributes.position.needsUpdate = true;

      if (!prefersReducedMotion) {
        // ────────────────────────────────────────────────────────────
        // STEP 0: School — pulse scale, orbit verification badge, scan glow
        // ────────────────────────────────────────────────────────────
        if (step0Group.visible) {
          // Gentle breathing scale
          const breathe = 1 + Math.sin(t * 1.8) * 0.015;
          step0Group.rotation.y = Math.sin(t * 0.4) * 0.18;
          step0Group.position.y = 0.15 + Math.sin(t * 1.2) * 0.06;

          // Verification sphere orbits
          verifyOrbit.rotation.y = t * 1.2;
          verifySphere.scale.setScalar(1 + Math.sin(t * 4) * 0.15);

          // Clock face glows
          (clockFace.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.4 + Math.sin(t * 3) * 0.3;

          // Door pulses
          doorMat.emissiveIntensity = 0.25 + Math.sin(t * 2.5) * 0.2;
        }

        // ────────────────────────────────────────────────────────────
        // STEP 1: Books — sequential stacking loop, ribbon pop, cert rings
        // ────────────────────────────────────────────────────────────
        if (step1Group.visible) {
          const cycle = t % 3.0;
          step1Group.rotation.y = t * 0.35;

          // Books drop in sequentially then float
          bookMeshes.forEach((b, i) => {
            const finalY = -0.55 + i * 0.18;
            const delay = i * 0.25;
            const fly = Math.max(0, Math.min(1, (cycle - delay) / 0.4));
            const ease = 1 - Math.pow(1 - fly, 3);

            if (cycle < 2.0) {
              b.position.y = THREE.MathUtils.lerp(finalY + 1.5, finalY, ease);
              b.position.x = THREE.MathUtils.lerp(i % 2 === 0 ? 1.0 : -1.0, 0, ease);
              b.rotation.z = THREE.MathUtils.lerp(i % 2 === 0 ? 0.3 : -0.3, 0, ease);
              b.rotation.y = ((i % 2) - 0.5) * 0.06;
            } else {
              b.position.y = finalY + Math.sin(t * 2.5 + i * 0.7) * 0.025;
              b.position.x = 0;
              b.rotation.z = 0;
            }
          });

          // Ribbon pops in and floats
          if (cycle > 1.6) {
            const rp = Math.min(1, (cycle - 1.6) / 0.35);
            ribbon.scale.setScalar(THREE.MathUtils.lerp(0.001, 1, rp));
            ribbon.position.y = -0.15 + Math.sin(t * 2.5) * 0.03;
            (ribbon.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.2 + Math.sin(t * 3) * 0.15;
          } else {
            ribbon.scale.setScalar(0.001);
          }

          // Orbiting certification rings
          orbitGroup1.rotation.y = t * 0.9;
          orbitGroup1.rotation.x = Math.sin(t * 0.5) * 0.3;
          orbitGroup2.rotation.y = -t * 0.6;
          orbitGroup2.rotation.z = t * 0.4;
        }

        // ────────────────────────────────────────────────────────────
        // STEP 2: Delivery Box — GPS orbit, radar pulse, seal glow
        // ────────────────────────────────────────────────────────────
        if (step2Group.visible) {
          step2Group.rotation.y = t * 0.5;
          step2Group.position.y = 0.1 + Math.sin(t * 2.0) * 0.1;

          // GPS satellites orbit
          gpsOrbit.rotation.y = t * 1.1;
          gpsOrbit.rotation.x = Math.sin(t * 0.7) * 0.25;

          // GPS satellites pulse
          const satScale = 1 + Math.sin(t * 4) * 0.2;
          gpsSat.scale.setScalar(satScale);
          gpsSat2.scale.setScalar(1 + Math.sin(t * 4 + Math.PI) * 0.2);

          // Radar ring spins and pulses
          radarRing.rotation.z = t * 1.2;
          (radarRing.material as THREE.MeshBasicMaterial).opacity = 0.5 + Math.sin(t * 2) * 0.25;

          // Pulse rings expand outward
          pulseRings.forEach((pr, idx) => {
            const phaseDelta = (t * 0.8 + idx * 0.33) % 1;
            const prScale = 1 + phaseDelta * 12;
            pr.scale.set(prScale, prScale, 1);
            (pr.material as THREE.MeshBasicMaterial).opacity = (1 - phaseDelta) * 0.55;
          });

          // Hologram seal glow
          (seal.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.4 + Math.sin(t * 3.5) * 0.4;
          seal.rotation.y = t * 2;

          // Lid hover effect
          lid.position.y = 0.61 + Math.sin(t * 1.5) * 0.04;
        }
      }

      renderer!.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', onMouseMove);
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
      scene.traverse((obj: any) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m: any) => m.dispose());
          else obj.material.dispose();
        }
      });
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-[280px] sm:h-[300px] flex items-center justify-center select-none"
    />
  );
};
