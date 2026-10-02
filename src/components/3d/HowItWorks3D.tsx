import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HowItWorks3DProps {
  stepIndex: number; // 0, 1, or 2
}

export const HowItWorks3D: React.FC<HowItWorks3DProps> = ({ stepIndex }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    scene.background = null;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 280;

    const isMobile = width < 480;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 2.8, isMobile ? 6.2 : 5.5);
    camera.lookAt(0, 0, 0);

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
    } catch (e) {
      console.warn('WebGL error in HowItWorks3D', e);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Lights
    const amb = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(amb);
    const dir = new THREE.DirectionalLight(0xffffff, 1.4);
    dir.position.set(4, 6, 4);
    scene.add(dir);

    const blueLight = new THREE.PointLight(0x3b82f6, 1.5, 8);
    blueLight.position.set(-2, 2, 2);
    scene.add(blueLight);

    // Contact shadow
    const contactShadow = new THREE.Mesh(
      new THREE.CircleGeometry(1.6, 24),
      new THREE.MeshBasicMaterial({ color: 0x0f172a, transparent: true, opacity: 0.12 })
    );
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.y = -0.9;
    scene.add(contactShadow);

    // Root groups for each step
    const step0Group = new THREE.Group(); // School
    const step1Group = new THREE.Group(); // Books Stack
    const step2Group = new THREE.Group(); // Box & Tracking

    scene.add(step0Group);
    scene.add(step1Group);
    scene.add(step2Group);

    // -------------------------------------------------------------
    // STEP 0: 3D School Model
    // -------------------------------------------------------------
    const schoolBody = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 1.2, 1.2),
      new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.3 })
    );
    schoolBody.position.y = 0;
    step0Group.add(schoolBody);

    const roof = new THREE.Mesh(
      new THREE.ConeGeometry(1.2, 0.6, 4),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4 })
    );
    roof.position.y = 0.9;
    roof.rotation.y = Math.PI / 4;
    step0Group.add(roof);

    const entrance = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.7, 0.2),
      new THREE.MeshStandardMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.8 })
    );
    entrance.position.set(0, -0.25, 0.61);
    step0Group.add(entrance);

    // -------------------------------------------------------------
    // STEP 1: 3D Stacking Books
    // -------------------------------------------------------------
    const bookColors = [0x2563eb, 0x059669, 0xd97706, 0x7c3aed, 0xe11d48];
    const bookMeshes: THREE.Mesh[] = [];

    bookColors.forEach((col, i) => {
      const book = new THREE.Mesh(
        new THREE.BoxGeometry(1.4, 0.12, 1.8),
        new THREE.MeshStandardMaterial({ color: col, roughness: 0.3 })
      );
      book.position.y = -0.5 + i * 0.16;
      book.rotation.y = ((i % 2) - 0.5) * 0.08;
      step1Group.add(book);
      bookMeshes.push(book);
    });

    // Ribbon
    const ribbon = new THREE.Mesh(
      new THREE.TorusGeometry(0.85, 0.02, 12, 32),
      new THREE.MeshStandardMaterial({ color: 0x3b82f6 })
    );
    ribbon.rotation.x = Math.PI / 2;
    ribbon.position.y = -0.15;
    step1Group.add(ribbon);

    // -------------------------------------------------------------
    // STEP 2: 3D Delivery Box & Tracking
    // -------------------------------------------------------------
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 1.0, 1.6),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4 })
    );
    box.position.y = 0;
    step2Group.add(box);

    const tape = new THREE.Mesh(
      new THREE.BoxGeometry(1.52, 0.02, 0.25),
      new THREE.MeshStandardMaterial({ color: 0x3b82f6 })
    );
    tape.position.y = 0.51;
    step2Group.add(tape);

    const seal = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.18, 0.03, 16),
      new THREE.MeshStandardMaterial({ color: 0x10b981 })
    );
    seal.position.set(0.3, 0.52, 0.3);
    step2Group.add(seal);

    // Glowing road trajectory ring under box
    const trajectoryRing = new THREE.Mesh(
      new THREE.RingGeometry(1.2, 1.35, 32),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide, transparent: true, opacity: 0.7 })
    );
    trajectoryRing.rotation.x = -Math.PI / 2;
    trajectoryRing.position.y = -0.65;
    step2Group.add(trajectoryRing);

    // -------------------------------------------------------------
    // VISIBILITY STATE ACCORDING TO STEP
    // -------------------------------------------------------------
    const updateVisibility = (idx: number) => {
      step0Group.visible = idx === 0;
      step1Group.visible = idx === 1;
      step2Group.visible = idx === 2;
    };

    updateVisibility(stepIndex);

    // Animation Loop
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        if (stepIndex === 0) {
          step0Group.rotation.y = elapsed * 0.4;
          step0Group.position.y = Math.sin(elapsed * 1.5) * 0.08;
        } else if (stepIndex === 1) {
          step1Group.rotation.y = elapsed * 0.35;
          // Float books slightly
          bookMeshes.forEach((b, i) => {
            b.position.y = -0.5 + i * 0.16 + Math.sin(elapsed * 2 + i) * 0.02;
          });
        } else if (stepIndex === 2) {
          step2Group.rotation.y = elapsed * 0.45;
          step2Group.position.y = Math.sin(elapsed * 2) * 0.1;
          trajectoryRing.rotation.z = elapsed * 0.8;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
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
  }, [stepIndex]);

  return (
    <div
      ref={mountRef}
      className="w-full h-[260px] flex items-center justify-center select-none"
    />
  );
};
