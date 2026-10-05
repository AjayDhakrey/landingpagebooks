import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { CheckCircle2, ShieldCheck, Box, Home, BookOpen, Truck } from 'lucide-react';

interface Hero3DCanvasProps {
  onExploreBundle?: () => void;
}

export const Hero3DCanvas: React.FC<Hero3DCanvasProps> = ({ onExploreBundle }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeStepText, setActiveStepText] = useState<{
    tag: string;
    sub: string;
    stage: 'school' | 'books' | 'bundle' | 'box' | 'delivery';
  }>({
    tag: 'School Verified ✓',
    sub: 'Official 2026 Curriculum Syllabus',
    stage: 'school',
  });
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();
    scene.background = null; // transparent canvas

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 520;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 3.8, 8.2);
    camera.lookAt(0, 0.4, 0);

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      console.warn('WebGL not supported, falling back to CSS animation', e);
      return;
    }

    renderer.setSize(width, height);
    const isMobile = width < 640;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    container.appendChild(renderer.domElement);

    // Dynamic camera framing for mobile vs desktop
    if (isMobile) {
      camera.position.set(0, 4.2, 9.6);
    }

    // LIGHTING: Studio 3-point + Hemisphere
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x1e3a8a, 0.75);
    scene.add(hemiLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.9);
    dirLight.position.set(5, 10, 6);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 25;
    dirLight.shadow.bias = -0.001;
    const d = 5;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;
    scene.add(dirLight);

    // Soft blue rim light for premium EdTech aura
    const rimLight = new THREE.DirectionalLight(0x3b82f6, 1.5);
    rimLight.position.set(-6, 4, -4);
    scene.add(rimLight);

    // Warm bounce light
    const bounceLight = new THREE.PointLight(0x60a5fa, 1.3, 10);
    bounceLight.position.set(0, -1, 3);
    scene.add(bounceLight);

    // GROUND PLATFORM / STAGE WITH CONTACT SHADOW
    const stageGeo = new THREE.CylinderGeometry(4.2, 4.4, 0.25, 48);
    const stageMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.25,
      metalness: 0.1,
    });
    const stageMesh = new THREE.Mesh(stageGeo, stageMat);
    stageMesh.position.y = -1.15;
    stageMesh.receiveShadow = true;
    scene.add(stageMesh);

    // Subtle dark ambient occlusion shadow plane
    const shadowGeo = new THREE.CircleGeometry(4.6, 32);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x0f172a,
      transparent: true,
      opacity: 0.12,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.28;
    scene.add(shadowPlane);

    // Stage decorative concentric ring
    const ringGeo = new THREE.RingGeometry(3.6, 3.8, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x93c5fd,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.y = -1.02;
    scene.add(ringMesh);

    // -------------------------------------------------------------
    // 1. 3D SCHOOL BUILDING (Positioned on the Left)
    // -------------------------------------------------------------
    const schoolGroup = new THREE.Group();
    schoolGroup.position.set(-2.4, -1.0, -0.6);
    scene.add(schoolGroup);

    // Main school body
    const schoolMat = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a, // deep royal navy
      roughness: 0.35,
      metalness: 0.2,
    });
    const schoolBase = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.3, 1.0), schoolMat);
    schoolBase.position.y = 0.65;
    schoolBase.castShadow = true;
    schoolBase.receiveShadow = true;
    schoolGroup.add(schoolBase);

    // Central Glass Atrium / Columns
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x60a5fa,
      transmission: 0.7,
      opacity: 0.9,
      transparent: true,
      roughness: 0.1,
      metalness: 0.1,
      ior: 1.5,
    });
    const atrium = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.1, 0.4), glassMat);
    atrium.position.set(0, 0.65, 0.45);
    schoolGroup.add(atrium);

    // Classical Columns
    const columnMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
    for (let c = -0.28; c <= 0.29; c += 0.28) {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.1, 16), columnMat);
      col.position.set(c, 0.65, 0.68);
      col.castShadow = true;
      schoolGroup.add(col);
    }

    // Pediment / Triangular Gabled Roof
    const roofGeo = new THREE.ConeGeometry(1.1, 0.5, 4);
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4 });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.set(0, 1.55, 0);
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true;
    schoolGroup.add(roof);

    // School Clock Tower
    const tower = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.5, 0.35), columnMat);
    tower.position.set(0, 1.85, 0);
    schoolGroup.add(tower);

    const clockFace = new THREE.Mesh(
      new THREE.CircleGeometry(0.1, 16),
      new THREE.MeshBasicMaterial({ color: 0xf59e0b })
    );
    clockFace.position.set(0, 1.85, 0.18);
    schoolGroup.add(clockFace);

    // School Entrance Steps
    const stepsMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.6 });
    const steps = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.15, 0.5), stepsMat);
    steps.position.set(0, 0.08, 0.65);
    schoolGroup.add(steps);

    // -------------------------------------------------------------
    // 2. TEXTBOOKS & NOTEBOOKS (6 Books with authentic covers)
    // -------------------------------------------------------------
    const bookColors = [
      { cover: 0x2563eb, spine: 0x1d4ed8, label: 'Math' }, // Royal Blue
      { cover: 0x059669, spine: 0x047857, label: 'Science' }, // Emerald
      { cover: 0xd97706, spine: 0xb45309, label: 'English' }, // Amber
      { cover: 0x7c3aed, spine: 0x6d28d9, label: 'Social' }, // Purple
      { cover: 0xe11d48, spine: 0xbe123c, label: 'Hindi' }, // Rose
      { cover: 0x0891b2, spine: 0x0e7490, label: 'IT/AI' }, // Cyan
    ];

    interface BookObject {
      group: THREE.Group;
      initialPos: THREE.Vector3;
      initialRot: THREE.Euler;
      targetPos: THREE.Vector3;
      targetRot: THREE.Euler;
    }

    const books: BookObject[] = [];
    const bookWidth = 1.35;
    const bookLength = 1.85;
    const bookThickness = 0.11;

    bookColors.forEach((colorSpec, i) => {
      const bookGrp = new THREE.Group();

      // Pages core (crisp white)
      const pageMat = new THREE.MeshStandardMaterial({ color: 0xfdfdfd, roughness: 0.8 });
      const pages = new THREE.Mesh(
        new THREE.BoxGeometry(bookWidth - 0.04, bookThickness - 0.02, bookLength - 0.04),
        pageMat
      );
      bookGrp.add(pages);

      // Hardcover outer shell
      const coverMat = new THREE.MeshStandardMaterial({
        color: colorSpec.cover,
        roughness: 0.35,
        metalness: 0.15,
      });
      const topCover = new THREE.Mesh(
        new THREE.BoxGeometry(bookWidth, 0.02, bookLength),
        coverMat
      );
      topCover.position.y = bookThickness / 2;
      topCover.castShadow = true;
      bookGrp.add(topCover);

      const bottomCover = new THREE.Mesh(
        new THREE.BoxGeometry(bookWidth, 0.02, bookLength),
        coverMat
      );
      bottomCover.position.y = -bookThickness / 2;
      bookGrp.add(bottomCover);

      // Spine
      const spineMat = new THREE.MeshStandardMaterial({
        color: colorSpec.spine,
        roughness: 0.4,
      });
      const spine = new THREE.Mesh(
        new THREE.BoxGeometry(0.03, bookThickness + 0.01, bookLength),
        spineMat
      );
      spine.position.x = -bookWidth / 2;
      bookGrp.add(spine);

      // Gold / white foil academic ribbon on front cover
      const foilMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.8,
        roughness: 0.2,
      });
      const foil = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.022, 0.08), foilMat);
      foil.position.set(0.1, bookThickness / 2 + 0.005, -0.3);
      bookGrp.add(foil);

      // Initial resting position inside/near school library
      const startX = -1.9 + (i % 2) * 0.25;
      const startY = 0.3 + i * 0.12;
      const startZ = -0.3 + (i % 3) * 0.2;

      // Target stacked position in central bundle
      const stackY = -0.7 + i * (bookThickness + 0.02);
      const angleJitter = ((i % 3) - 1) * 0.04;

      bookGrp.position.set(startX, startY, startZ);
      bookGrp.rotation.set(0.2, 0.4, 0);

      scene.add(bookGrp);

      books.push({
        group: bookGrp,
        initialPos: new THREE.Vector3(startX, startY, startZ),
        initialRot: new THREE.Euler(0.2, 0.4 + i * 0.1, 0),
        targetPos: new THREE.Vector3(0, stackY, 0),
        targetRot: new THREE.Euler(0, angleJitter, 0),
      });
    });

    // -------------------------------------------------------------
    // 3. BUNDLE STRAP RIBBON (Forms around the stacked bundle)
    // -------------------------------------------------------------
    const strapMat = new THREE.MeshStandardMaterial({
      color: 0x1d4ed8,
      roughness: 0.3,
      metalness: 0.3,
      transparent: true,
      opacity: 0,
    });
    const strapGeo = new THREE.TorusGeometry(0.9, 0.025, 12, 32);
    const strapMesh = new THREE.Mesh(strapGeo, strapMat);
    strapMesh.rotation.x = Math.PI / 2;
    strapMesh.position.set(0, -0.35, 0);
    scene.add(strapMesh);

    // -------------------------------------------------------------
    // 4. PREMIUM DELIVERY BOX (Folds and encases the bundle)
    // -------------------------------------------------------------
    const boxGroup = new THREE.Group();
    boxGroup.position.set(0, -0.35, 0);
    boxGroup.scale.set(0.001, 0.001, 0.001);
    scene.add(boxGroup);

    const boxMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b, // midnight executive cardboard / navy
      roughness: 0.4,
      metalness: 0.2,
    });
    const mainBox = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.1, 2.1), boxMat);
    mainBox.castShadow = true;
    boxGroup.add(mainBox);

    // Vanguard Blue Security Sealing Tape
    const tapeMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      roughness: 0.2,
      metalness: 0.4,
    });
    const tapeStripe = new THREE.Mesh(new THREE.BoxGeometry(1.62, 0.02, 0.25), tapeMat);
    tapeStripe.position.y = 0.551;
    boxGroup.add(tapeStripe);

    // Verified Stamp / Seal badge on box top
    const sealBadge = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.18, 0.03, 24),
      new THREE.MeshStandardMaterial({ color: 0x10b981, metalness: 0.5, roughness: 0.3 })
    );
    sealBadge.position.set(0.35, 0.56, 0.4);
    boxGroup.add(sealBadge);

    // -------------------------------------------------------------
    // 5. 3D HOME / DESTINATION (Positioned on the Right)
    // -------------------------------------------------------------
    const homeGroup = new THREE.Group();
    homeGroup.position.set(2.4, -1.0, 0.2);
    scene.add(homeGroup);

    // Home main foundation & walls
    const homeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });
    const homeBase = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.1, 1.2), homeMat);
    homeBase.position.y = 0.55;
    homeBase.castShadow = true;
    homeBase.receiveShadow = true;
    homeGroup.add(homeBase);

    // Wooden door
    const doorMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.7 });
    const door = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.65, 0.05), doorMat);
    door.position.set(0, 0.35, 0.61);
    homeGroup.add(door);

    // Modern glass windows with cozy warm light
    const windowMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      emissive: 0xfef08a,
      emissiveIntensity: 0.6,
      roughness: 0.2,
    });
    const winLeft = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.35, 0.05), windowMat);
    winLeft.position.set(-0.4, 0.55, 0.61);
    homeGroup.add(winLeft);

    const winRight = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.35, 0.05), windowMat);
    winRight.position.set(0.4, 0.55, 0.61);
    homeGroup.add(winRight);

    // Steep pitched modern roof
    const homeRoofGeo = new THREE.ConeGeometry(1.2, 0.6, 4);
    const homeRoofMat = new THREE.MeshStandardMaterial({ color: 0x1e40af, roughness: 0.3 });
    const homeRoof = new THREE.Mesh(homeRoofGeo, homeRoofMat);
    homeRoof.position.set(0, 1.4, 0);
    homeRoof.rotation.y = Math.PI / 4;
    homeRoof.castShadow = true;
    homeGroup.add(homeRoof);

    // Chimney
    const chimney = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 0.45, 0.18),
      new THREE.MeshStandardMaterial({ color: 0x64748b })
    );
    chimney.position.set(0.35, 1.6, -0.2);
    homeGroup.add(chimney);

    // Front porch flagstone
    const porch = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.06, 0.4),
      new THREE.MeshStandardMaterial({ color: 0x94a3b8 })
    );
    porch.position.set(0, 0.03, 0.75);
    homeGroup.add(porch);

    // -------------------------------------------------------------
    // 6. GLOWING PARTICLES & TRAJECTORY PATH
    // -------------------------------------------------------------
    const particleCount = 45;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let p = 0; p < particleCount; p++) {
      particlePositions[p * 3] = (Math.random() - 0.5) * 7;
      particlePositions[p * 3 + 1] = -0.5 + Math.random() * 3.5;
      particlePositions[p * 3 + 2] = (Math.random() - 0.5) * 5;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x60a5fa,
      size: 0.06,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // -------------------------------------------------------------
    // INTERACTIVE MOUSE PARALLAX
    // -------------------------------------------------------------
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 3.8;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x;
      mouseY = y;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // ANIMATION TIMELINE LOOP
    // Total cycle: 10 seconds
    // 0.0s – 2.2s: School emerges, books start floating out
    // 2.2s – 4.8s: Books assemble into stack (Grade 6 Bundle, 12 Books)
    // 4.8s – 6.8s: Box forms and seals (Bundle Ready)
    // 6.8s – 9.2s: Package travels to home (Order Confirmed / Delivered)
    // 9.2s – 10.0s: Reset loop smoothly
    const CYCLE_DURATION = 10.0;
    let clock = new THREE.Clock();
    let animId: number;
    let isVisible = true;

    // IntersectionObserver to pause rendering when canvas is out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();
      const cycleTime = elapsedTime % CYCLE_DURATION;

      // Mouse Parallax smoothing
      if (!prefersReducedMotion) {
        targetCameraX = mouseX * 0.9;
        targetCameraY = 3.8 + mouseY * 0.6;
        camera.position.x += (targetCameraX - camera.position.x) * 0.05;
        camera.position.y += (targetCameraY - camera.position.y) * 0.05;
        camera.lookAt(0, 0.4, 0);
      }

      // Gentle floating particle drift
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let p = 0; p < particleCount; p++) {
        positions[p * 3 + 1] += 0.002;
        if (positions[p * 3 + 1] > 3.5) {
          positions[p * 3 + 1] = -0.5;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      // ---------------------------------------------------------
      // STAGES OF THE 3D JOURNEY
      // ---------------------------------------------------------
      if (cycleTime < 2.2) {
        // STAGE 1: School Verified & Books float out
        setActiveStepText({
          tag: 'School Verified ✓',
          sub: 'Delhi Public School · Official Syllabus',
          stage: 'school',
        });

        // School subtle entrance breath
        schoolGroup.scale.setScalar(1.0 + Math.sin(cycleTime * 2) * 0.02);

        // Books fly out of library portal towards staging
        const p = cycleTime / 2.2;
        books.forEach((b, idx) => {
          const delay = idx * 0.15;
          const bookP = Math.min(Math.max((cycleTime - delay) / 1.5, 0), 1);
          const ease = 1 - Math.pow(1 - bookP, 3);

          b.group.position.lerpVectors(
            b.initialPos,
            new THREE.Vector3(-0.8 + idx * 0.25, 0.2 + Math.sin(idx + cycleTime * 3) * 0.1, 0.2),
            ease
          );
          b.group.rotation.y = b.initialRot.y + ease * 0.5;
          b.group.visible = true;
        });

        boxGroup.scale.set(0.001, 0.001, 0.001);
        strapMesh.material.opacity = 0;

      } else if (cycleTime < 4.8) {
        // STAGE 2: Build Your Bundle (Stacking)
        const p = (cycleTime - 2.2) / 2.6;
        const ease = 1 - Math.pow(1 - p, 3);

        setActiveStepText({
          tag: 'Grade 6 Bundle · 12 Books',
          sub: 'NCERT + Oxford Prescribed Edition',
          stage: 'bundle',
        });

        books.forEach((b, idx) => {
          const bookEase = Math.min(Math.max((p - idx * 0.08) / 0.6, 0), 1);
          const smoothEase = 1 - Math.pow(1 - bookEase, 3);

          b.group.position.x = THREE.MathUtils.lerp(b.group.position.x, b.targetPos.x, smoothEase * 0.15);
          b.group.position.y = THREE.MathUtils.lerp(b.group.position.y, b.targetPos.y, smoothEase * 0.15);
          b.group.position.z = THREE.MathUtils.lerp(b.group.position.z, b.targetPos.z, smoothEase * 0.15);
          b.group.rotation.x = THREE.MathUtils.lerp(b.group.rotation.x, b.targetRot.x, 0.1);
          b.group.rotation.y = THREE.MathUtils.lerp(b.group.rotation.y, b.targetRot.y, 0.1);
          b.group.rotation.z = THREE.MathUtils.lerp(b.group.rotation.z, b.targetRot.z, 0.1);
        });

        // Strap ribbon fades in as books stack
        strapMesh.material.opacity = THREE.MathUtils.lerp(strapMesh.material.opacity, 0.9, 0.08);
        strapMesh.position.y = -0.35 + Math.sin(cycleTime * 3) * 0.02;

      } else if (cycleTime < 6.8) {
        // STAGE 3: Box Forms around Bundle (Bundle Ready)
        const p = (cycleTime - 4.8) / 2.0;
        const ease = 1 - Math.pow(1 - p, 3);

        setActiveStepText({
          tag: 'Bundle Ready · Sealed',
          sub: 'Tamper-Proof Box & Almanac Included',
          stage: 'box',
        });

        // Box scales up around bundle
        const boxScale = THREE.MathUtils.lerp(0.001, 1.0, ease);
        boxGroup.scale.set(boxScale, boxScale, boxScale);
        boxGroup.position.set(0, -0.35, 0);

        // Books fade inside the box
        if (p > 0.4) {
          books.forEach((b) => (b.group.visible = false));
          strapMesh.material.opacity = 0;
        }

      } else if (cycleTime < 9.2) {
        // STAGE 4: Package Travels to Home & Order Confirmed
        const p = (cycleTime - 6.8) / 2.4;
        const ease = 1 - Math.pow(1 - p, 2.5);

        setActiveStepText({
          tag: 'Order Confirmed ✓ Doorstep Delivery',
          sub: 'Arriving Today at Residence with OTP',
          stage: 'delivery',
        });

        // Box glides along arc towards homeGroup
        const startX = 0;
        const targetX = 1.9;
        const currX = THREE.MathUtils.lerp(startX, targetX, ease);
        const arcY = -0.35 + Math.sin(p * Math.PI) * 0.8;
        const currZ = THREE.MathUtils.lerp(0, 0.3, ease);

        boxGroup.position.set(currX, arcY, currZ);
        boxGroup.rotation.y = Math.sin(p * Math.PI * 2) * 0.2;
        boxGroup.rotation.z = -Math.sin(p * Math.PI) * 0.1;

        // Home celebration bounce when package lands
        if (p > 0.75) {
          const homeBounce = (p - 0.75) / 0.25;
          homeGroup.scale.setScalar(1.0 + Math.sin(homeBounce * Math.PI) * 0.08);
        }

      } else {
        // STAGE 5: Reset smoothly
        const p = (cycleTime - 9.2) / 0.8;
        boxGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), 0.2);

        books.forEach((b) => {
          b.group.position.copy(b.initialPos);
          b.group.rotation.copy(b.initialRot);
          b.group.visible = true;
        });
        homeGroup.scale.setScalar(1.0);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
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
      container.removeEventListener('mousemove', handleMouseMove);

      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }

      // Dispose geometries & materials
      scene.traverse((obj: any) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m: any) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
    };
  }, []);

  return (
    <div
      ref={mountRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-[460px] sm:h-[500px] lg:h-[540px] flex items-center justify-center select-none"
    >
      {/* 3D Floating Glassmorphic HUD Cards that track the journey */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none">
        <div className="backdrop-blur-md bg-white/85 border border-white/70 shadow-lg shadow-blue-900/10 px-3.5 py-2 rounded-xl flex items-center gap-2.5 animate-in fade-in zoom-in duration-300">
          <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            {activeStepText.stage === 'school' && <BookOpen className="w-4 h-4" />}
            {activeStepText.stage === 'bundle' && <Box className="w-4 h-4" />}
            {activeStepText.stage === 'box' && <ShieldCheck className="w-4 h-4" />}
            {activeStepText.stage === 'delivery' && <Truck className="w-4 h-4" />}
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900 leading-tight">
              {activeStepText.tag}
            </p>
            <p className="text-[11px] text-slate-500 font-medium leading-tight">
              {activeStepText.sub}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive stage timeline pills at bottom of canvas */}
      <div className="absolute bottom-3 left-4 z-20 flex items-center pointer-events-none">
        <div className="flex items-center gap-1.5 backdrop-blur-md bg-white/90 border border-slate-200/80 px-2.5 py-1 rounded-full shadow-sm">
          {[
            { id: 'school', label: '1. School' },
            { id: 'bundle', label: '2. Bundle' },
            { id: 'box', label: '3. Seal Box' },
            { id: 'delivery', label: '4. Delivery' },
          ].map((s) => (
            <span
              key={s.id}
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                activeStepText.stage === s.id
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'text-slate-500'
              }`}
            >
              {s.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
