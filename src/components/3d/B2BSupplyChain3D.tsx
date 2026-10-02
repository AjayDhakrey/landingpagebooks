import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  Building2, 
  BarChart3, 
  FileSpreadsheet, 
  Warehouse, 
  Store, 
  Truck, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface StageInfo {
  id: string;
  name: string;
  sub: string;
  icon: any;
  metric: string;
  status: string;
}

const STAGES: StageInfo[] = [
  {
    id: 'enrollment',
    name: 'School Enrollment',
    sub: 'Class register & student strength sync',
    icon: Building2,
    metric: '4,200 Students',
    status: 'Synced with DPS Ledger',
  },
  {
    id: 'forecast',
    name: 'Demand Forecast',
    sub: 'AI pre-order projection by syllabus',
    icon: BarChart3,
    metric: '99.4% Precision',
    status: 'Zero Stockout Model',
  },
  {
    id: 'po',
    name: 'Publisher POs',
    sub: 'Direct orders with Oxford, NCERT, Selina',
    icon: FileSpreadsheet,
    metric: '18 Direct Publishers',
    status: 'Wholesale Discount Edge',
  },
  {
    id: 'inventory',
    name: 'Warehouse & Inventory',
    sub: 'Multi-campus barcode scanning & buffers',
    icon: Warehouse,
    metric: '32,000 Volumes',
    status: 'Tamper-Proof Sealing',
  },
  {
    id: 'pos',
    name: 'Campus Store / Web',
    sub: 'High-speed counter POS + parent app',
    icon: Store,
    metric: '<45s Checkout',
    status: 'Online & Counter Ready',
  },
  {
    id: 'dispatch',
    name: 'Last-Mile Dispatch',
    sub: 'Doorstep courier & batch delivery',
    icon: Truck,
    metric: '100% On-Time',
    status: 'Live WhatsApp Tracker',
  },
];

export const B2BSupplyChain3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeStageIndex, setActiveStageIndex] = useState(3); // default warehouse inventory
  const [isRotating, setIsRotating] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    scene.background = null;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    const isMobile = width < 640;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, isMobile ? 4.0 : 3.5, isMobile ? 8.9 : 7.5);
    camera.lookAt(0, 0.2, 0);

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      console.warn('WebGL error', e);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // LIGHTING: Hemisphere + Directional + Colored Accents
    const hemi = new THREE.HemisphereLight(0xffffff, 0x0f172a, 0.85);
    scene.add(hemi);

    const amb = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(amb);

    const dir = new THREE.DirectionalLight(0xffffff, 1.6);
    dir.position.set(4, 8, 5);
    dir.castShadow = true;
    scene.add(dir);

    const blueLight = new THREE.PointLight(0x3b82f6, 2.0, 10);
    blueLight.position.set(0, 2, 2);
    scene.add(blueLight);

    const greenLight = new THREE.PointLight(0x10b981, 1.2, 8);
    greenLight.position.set(2, 0.5, 1);
    scene.add(greenLight);

    // Base industrial grid stage
    const floorGeo = new THREE.CylinderGeometry(3.8, 4.0, 0.2, 32);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.3,
      metalness: 0.4,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.y = -1.1;
    floor.receiveShadow = true;
    scene.add(floor);

    // Glowing stage circuit ring
    const ringGeo = new THREE.RingGeometry(3.3, 3.5, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x2563eb,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = -0.99;
    scene.add(ring);

    // -------------------------------------------------------------
    // 3D INDUSTRIAL WAREHOUSE SHELVING RACKS & PALLETS
    // -------------------------------------------------------------
    const rackGroup = new THREE.Group();
    scene.add(rackGroup);

    // Heavy duty steel uprights
    const steelMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.7,
      roughness: 0.3,
    });
    const orangeBeamMat = new THREE.MeshStandardMaterial({
      color: 0xea580c, // industrial rack orange
      metalness: 0.3,
      roughness: 0.4,
    });

    // 4 vertical posts
    const postGeo = new THREE.BoxGeometry(0.08, 2.4, 0.08);
    const postPositions = [
      [-1.8, 0.2, -0.6],
      [-1.8, 0.2, 0.6],
      [1.8, 0.2, -0.6],
      [1.8, 0.2, 0.6],
      [0, 0.2, -0.6],
      [0, 0.2, 0.6],
    ];
    postPositions.forEach((pos) => {
      const post = new THREE.Mesh(postGeo, steelMat);
      post.position.set(pos[0], pos[1], pos[2]);
      post.castShadow = true;
      rackGroup.add(post);
    });

    // 3 Horizontal shelves
    const shelfGeo = new THREE.BoxGeometry(3.7, 0.05, 1.25);
    const shelfHeights = [-0.6, 0.2, 1.0];
    shelfHeights.forEach((shY) => {
      const shelf = new THREE.Mesh(shelfGeo, orangeBeamMat);
      shelf.position.y = shY;
      shelf.castShadow = true;
      shelf.receiveShadow = true;
      rackGroup.add(shelf);
    });

    // -------------------------------------------------------------
    // STACKED BOOK BUNDLES & CARTOONS ON SHELVES
    // -------------------------------------------------------------
    const bookColors = [0x2563eb, 0x059669, 0xd97706, 0x7c3aed, 0x0891b2];
    const palletGeo = new THREE.BoxGeometry(0.7, 0.08, 0.8);
    const palletMat = new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.8 });

    shelfHeights.forEach((shY, sIdx) => {
      // 3 bays per shelf
      [-1.0, 0, 1.0].forEach((bayX, bIdx) => {
        // Wooden pallet
        const pallet = new THREE.Mesh(palletGeo, palletMat);
        pallet.position.set(bayX, shY + 0.06, 0);
        pallet.castShadow = true;
        rackGroup.add(pallet);

        // Stacked book cartons or raw textbook sets
        const stackColor = bookColors[(sIdx * 3 + bIdx) % bookColors.length];
        const boxMat = new THREE.MeshStandardMaterial({
          color: stackColor,
          roughness: 0.4,
          metalness: 0.1,
        });
        const boxSet = new THREE.Mesh(
          new THREE.BoxGeometry(0.55, 0.45, 0.65),
          boxMat
        );
        boxSet.position.set(bayX, shY + 0.32, 0);
        boxSet.castShadow = true;
        rackGroup.add(boxSet);
      });
    });

    // -------------------------------------------------------------
    // LASER BARCODE SCANNER ANIMATION
    // -------------------------------------------------------------
    const laserMat = new THREE.MeshBasicMaterial({
      color: 0xef4444, // bright crimson laser
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide,
    });
    const laserPlane = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.02), laserMat);
    laserPlane.rotation.x = Math.PI / 2;
    laserPlane.position.set(0, 0.4, 0.7);
    scene.add(laserPlane);

    // -------------------------------------------------------------
    // AUTOMATED DISPATCH CONVEYOR TROLLEY
    // -------------------------------------------------------------
    const cartGroup = new THREE.Group();
    cartGroup.position.set(-1.2, -0.9, 1.2);
    scene.add(cartGroup);

    const cartBase = new THREE.Mesh(
      new THREE.BoxGeometry(0.9, 0.12, 0.6),
      new THREE.MeshStandardMaterial({ color: 0x1e3a8a, metalness: 0.5 })
    );
    cartGroup.add(cartBase);

    // Cart wheels
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.5 });
    [-0.35, 0.35].forEach((wx) => {
      [-0.25, 0.25].forEach((wz) => {
        const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.04, 16), wheelMat);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(wx, -0.06, wz);
        cartGroup.add(wheel);
      });
    });

    // Ready parcel on trolley
    const parcel = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.35, 0.45),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3 })
    );
    parcel.position.y = 0.24;
    cartGroup.add(parcel);

    // -------------------------------------------------------------
    // RENDER & ANIMATION LOOP
    // -------------------------------------------------------------
    let clock = new THREE.Clock();
    let animId: number;
    let isVisible = true;

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(container);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      // Gentle pivot rotation of the entire warehouse rack
      if (isRotating && !prefersReducedMotion) {
        rackGroup.rotation.y = Math.sin(elapsed * 0.4) * 0.15;
      }

      // Laser line sweeps up and down over the inventory boxes
      laserPlane.position.y = 0.2 + Math.sin(elapsed * 3) * 0.35;
      laserPlane.position.x = Math.sin(elapsed * 1.5) * 0.4;

      // Trolley glides back and forth along dispatch lane
      cartGroup.position.x = -1.2 + Math.sin(elapsed * 0.8) * 1.0;

      renderer.render(scene, camera);
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
  }, [isRotating]);

  const activeStage = STAGES[activeStageIndex];
  const IconComp = activeStage.icon;

  return (
    <div className="space-y-6">
      {/* 3D WebGL Canvas Viewport with Glass HUD */}
      <div 
        ref={mountRef}
        className="relative w-full h-[380px] sm:h-[420px] rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex items-center justify-center select-none"
      >
        {/* Top Floating Glass HUD */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none">
          <div className="backdrop-blur-md bg-slate-900/80 border border-slate-700/80 shadow-xl px-4 py-2.5 rounded-xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <IconComp className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white leading-tight">
                {activeStage.name}
              </p>
              <p className="text-[11px] text-slate-400 font-medium">
                {activeStage.sub}
              </p>
            </div>
          </div>
        </div>

        {/* Top Right Live Telemetry */}
        <div className="absolute top-4 right-4 z-20 pointer-events-none hidden sm:block">
          <div className="backdrop-blur-md bg-slate-900/80 border border-slate-700/80 px-3 py-1.5 rounded-lg text-right">
            <span className="text-[10px] font-mono text-emerald-400 font-semibold block">
              ● REAL-TIME DISPATCH ENGINE
            </span>
            <span className="text-xs font-mono text-white font-bold">
              {activeStage.metric}
            </span>
          </div>
        </div>

        {/* Laser verification badge */}
        <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
          <div className="backdrop-blur-md bg-black/60 border border-blue-500/30 px-3 py-1.5 rounded-lg text-[11px] text-blue-300 font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>Automated ISBN Barcode Verification Active</span>
          </div>
        </div>
      </div>

      {/* Interactive 6-Stage Pipeline Switcher */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
        {STAGES.map((stage, idx) => {
          const isSelected = activeStageIndex === idx;
          const StageIcon = stage.icon;

          return (
            <button
              key={stage.id}
              onClick={() => setActiveStageIndex(idx)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/80 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <StageIcon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-blue-400'}`} />
                <span className="font-mono text-[10px] opacity-70">
                  0{idx + 1}
                </span>
              </div>
              <p className="font-bold text-xs leading-tight line-clamp-1">
                {stage.name}
              </p>
              <p className={`text-[10px] mt-1 font-mono ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                {stage.metric}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
