import { useEffect, useRef, useState } from 'react';

interface Hub {
  name: string;
  lat: number;
  lon: number;
  type: 'headquarters' | 'hub';
}

const HUBS: Hub[] = [
  { name: 'USA Head Office', lat: 39.74, lon: -75.54, type: 'headquarters' },
  { name: 'Canada Delivery', lat: 43.65, lon: -79.38, type: 'hub' },
  { name: 'London UK Hub', lat: 51.5, lon: -0.12, type: 'hub' },
  { name: 'India (Hyderabad)', lat: 17.38, lon: 78.48, type: 'hub' },
  { name: 'Australia APAC (Sydney)', lat: -33.86, lon: 151.2, type: 'hub' },
];

const CONNECTIONS: [number, number][] = [
  [0, 1], // Wilmington -> Toronto
  [0, 2], // Wilmington -> London
  [0, 3], // Wilmington -> Hyderabad
  [2, 3], // London -> Hyderabad
  [3, 4], // Hyderabad -> Sydney
];

// Simplified geographic polygon boundaries for real Earth continents
const NORTH_AMERICA: [number, number][] = [
  [71, -165], [71, -135], [70, -128], [60, -125], [55, -130], [50, -128], [48, -124], [38, -123], [34, -120], [30, -115],
  [23, -110], [19, -105], [16, -95], [14, -92], [9, -83], [8, -77], [12, -86], [16, -88], [18, -91], [22, -97],
  [26, -97], [29, -95], [30, -88], [25, -81], [25, -80], [31, -81], [35, -75], [40, -74], [44, -70], [45, -66],
  [47, -64], [52, -56], [58, -62], [62, -64], [60, -75], [52, -80], [55, -88], [58, -94], [63, -90], [68, -85],
  [70, -95], [72, -125], [71, -165]
];

const SOUTH_AMERICA: [number, number][] = [
  [12, -72], [11, -62], [8, -59], [5, -51], [0, -50], [-3, -40], [-6, -35], [-10, -36], [-15, -39], [-22, -41],
  [-25, -48], [-33, -52], [-38, -57], [-45, -65], [-53, -68], [-55, -71], [-52, -75], [-45, -75], [-35, -73], [-25, -70],
  [-15, -75], [-5, -81], [1, -80], [5, -77], [9, -77], [12, -72]
];

const EUROPE: [number, number][] = [
  [71, 28], [70, 20], [62, 5], [58, 6], [54, 9], [51, 2], [47, -2], [43, -9], [36, -6], [36, -2],
  [38, 15], [36, 23], [38, 28], [42, 29], [46, 31], [46, 38], [55, 38], [60, 30], [65, 32], [68, 43], [71, 28]
];

const UK_IRELAND: [number, number][] = [
  [59, -3], [58, -6], [55, -6], [51, -5], [50, -1], [51, 1], [53, 0], [56, -2], [59, -3]
];

const AFRICA: [number, number][] = [
  [37, 10], [36, 1], [35, -6], [30, -10], [21, -17], [15, -17], [11, -15], [5, -1], [4, 7], [4, 9],
  [-5, 12], [-15, 12], [-22, 14], [-34, 18], [-34, 26], [-28, 32], [-20, 35], [-11, 41], [4, 48], [11, 51],
  [12, 44], [15, 41], [22, 37], [28, 34], [31, 32], [32, 24], [37, 10]
];

const ASIA: [number, number][] = [
  [77, 105], [73, 80], [70, 60], [60, 60], [50, 50], [40, 50], [30, 48], [25, 55], [24, 60], [25, 67],
  [30, 70], [35, 75], [35, 90], [30, 100], [22, 108], [10, 105], [8, 103], [1, 104], [6, 108], [15, 108],
  [22, 114], [25, 120], [32, 122], [38, 118], [40, 125], [43, 132], [53, 141], [60, 163], [66, 170], [70, 180],
  [75, 175], [77, 105]
];

const INDIA: [number, number][] = [
  [35, 74], [32, 76], [28, 80], [27, 88], [25, 92], [22, 89], [20, 86], [16, 82], [13, 80], [8, 77],
  [10, 76], [15, 74], [19, 73], [22, 69], [24, 69], [28, 70], [32, 72], [35, 74]
];

const AUSTRALIA: [number, number][] = [
  [-11, 142], [-15, 145], [-20, 149], [-25, 153], [-32, 153], [-37, 150], [-38, 144], [-36, 137], [-32, 133],
  [-34, 123], [-34, 116], [-30, 114], [-22, 114], [-17, 122], [-14, 126], [-15, 135], [-12, 136], [-11, 142]
];

const JAPAN: [number, number][] = [
  [45, 142], [43, 145], [35, 140], [33, 132], [35, 135], [40, 140], [45, 142]
];

const CONTINENTS = [NORTH_AMERICA, SOUTH_AMERICA, EUROPE, UK_IRELAND, AFRICA, ASIA, INDIA, AUSTRALIA, JAPAN];

function pointInPoly(lat: number, lon: number, poly: [number, number][]) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][1];
    const yi = poly[i][0];
    const xj = poly[j][1];
    const yj = poly[j][0];
    const intersect = yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function isLand(lat: number, lon: number) {
  for (const c of CONTINENTS) {
    if (pointInPoly(lat, lon, c)) return true;
  }
  return false;
}

function latLonToXYZ(lat: number, lon: number, r: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return {
    x: -(r * Math.sin(phi) * Math.cos(theta)),
    y: r * Math.cos(phi),
    z: r * Math.sin(phi) * Math.sin(theta),
  };
}

export function DigitalGlobe({
  className = 'w-full h-[300px] sm:h-[340px] md:h-[370px] lg:h-[390px]',
}: {
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = canvas.parentElement?.clientWidth || 500;
    let height = canvas.parentElement?.clientHeight || 500;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const setupCanvas = () => {
      width = canvas.parentElement?.clientWidth || 500;
      height = canvas.parentElement?.clientHeight || 500;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    setupCanvas();

    let rotationY = 0.55;
    let rotationX = 0.22;
    let targetRotationY = 0.55;
    let targetRotationX = 0.22;
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    // Generate real Earth continent & ocean points
    const points: { lat: number; lon: number; isLand: boolean }[] = [];
    const totalPoints = 2200;

    for (let i = 0; i < totalPoints; i++) {
      const phi = Math.acos(-1 + (2 * i) / totalPoints);
      const theta = Math.sqrt(totalPoints * Math.PI) * phi;
      const lat = 90 - (phi * 180) / Math.PI;
      let lon = (theta * 180) / Math.PI - 180;
      lon = ((((lon + 180) % 360) + 360) % 360) - 180;
      const land = isLand(lat, lon);
      // Keep all land points + a sparser subset of ocean points for 3D depth
      if (land || i % 3 === 0) {
        points.push({ lat, lon, isLand: land });
      }
    }

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      setupCanvas();
    };
    window.addEventListener('resize', handleResize);

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      targetRotationY += dx * 0.005;
      targetRotationX += dy * 0.005;
      startX = e.clientX;
      startY = e.clientY;
    };
    const onMouseUp = () => {
      isDragging = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;
      targetRotationY += dx * 0.006;
      targetRotationX += dy * 0.006;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    const onTouchEnd = () => {
      isDragging = false;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    let pulseTime = 0;

    function render() {
      if (!ctx) return;
      // 100% Transparent clear (NO background disc / fills)
      ctx.clearRect(0, 0, width, height);

      // Auto rotation
      if (!isDragging) {
        targetRotationY += 0.0028;
      }
      rotationY += (targetRotationY - rotationY) * 0.08;
      rotationX += (targetRotationX - rotationX) * 0.08;
      rotationX = Math.max(-0.6, Math.min(0.6, rotationX));

      pulseTime += 0.02;

      const cx = width / 2;
      const cy = height / 2;
      const currentRadius = Math.min(width, height) * 0.38;

      // 3D Perspective Projection
      function project(p: { x: number; y: number; z: number }) {
        const cosX = Math.cos(rotationX);
        const sinX = Math.sin(rotationX);
        const y1 = p.y * cosX - p.z * sinX;
        const z1 = p.y * sinX + p.z * cosX;

        const cosY = Math.cos(rotationY);
        const sinY = Math.sin(rotationY);
        const x2 = p.x * cosY + z1 * sinY;
        const z2 = -p.x * sinY + z1 * cosY;

        const fov = 750;
        const scale = fov / (fov + z2);
        return {
          px: cx + x2 * scale,
          py: cy + y1 * scale,
          scale,
          z: z2,
        };
      }

      // 1. Subtle Outer Atmosphere Horizon Ring (Transparent)
      ctx.strokeStyle = 'rgba(2, 132, 199, 0.28)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(cx, cy, currentRadius, 0, Math.PI * 2);
      ctx.stroke();

      // 2. Latitude Guide Wireframes
      ctx.strokeStyle = 'rgba(2, 132, 199, 0.09)';
      ctx.lineWidth = 0.8;
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let first = true;
        for (let lon = 0; lon <= 360; lon += 8) {
          const pt = latLonToXYZ(lat, lon, currentRadius);
          const pr = project(pt);
          if (pr.z < 0) {
            first = true;
            continue;
          }
          if (first) {
            ctx.moveTo(pr.px, pr.py);
            first = false;
          } else {
            ctx.lineTo(pr.px, pr.py);
          }
        }
        ctx.stroke();
      }

      // 3. Render Earth Real Continents & Ocean Dots
      points.forEach((pt) => {
        const coords = latLonToXYZ(pt.lat, pt.lon, currentRadius);
        const pr = project(coords);

        const depth = (pr.z + currentRadius) / (currentRadius * 2);
        const alpha = Math.max(0.08, depth);

        if (pt.isLand) {
          // CONTINENT LAND POINT (Crisp & Realistic)
          if (pr.z > 0) {
            ctx.fillStyle = `rgba(2, 132, 199, ${alpha * 0.95})`;
            ctx.beginPath();
            ctx.arc(pr.px, pr.py, 1.7 * pr.scale, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillStyle = `rgba(148, 163, 184, ${alpha * 0.35})`;
            ctx.beginPath();
            ctx.arc(pr.px, pr.py, 0.95 * pr.scale, 0, Math.PI * 2);
            ctx.fill();
          }
        } else {
          // OCEAN POINT (Subtle Depth Grid)
          if (pr.z > 0) {
            ctx.fillStyle = `rgba(148, 163, 184, ${alpha * 0.2})`;
            ctx.beginPath();
            ctx.arc(pr.px, pr.py, 0.7 * pr.scale, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      // 4. Project Hubs
      const projectedHubs = HUBS.map((hub) => {
        const coords = latLonToXYZ(hub.lat, hub.lon, currentRadius);
        const pr = project(coords);
        return { ...hub, ...pr };
      });

      // 5. Inter-Hub Data Arcs & Laser Photons
      CONNECTIONS.forEach(([i1, i2], idx) => {
        const h1 = projectedHubs[i1];
        const h2 = projectedHubs[i2];
        if (!h1 || !h2) return;

        if (h1.z > -currentRadius * 0.35 || h2.z > -currentRadius * 0.35) {
          const midX = (h1.px + h2.px) / 2;
          const midY = (h1.py + h2.py) / 2 - currentRadius * 0.2;

          // Glowing Arc
          ctx.strokeStyle = 'rgba(2, 132, 199, 0.6)';
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(h1.px, h1.py);
          ctx.quadraticCurveTo(midX, midY, h2.px, h2.py);
          ctx.stroke();

          // High-Speed Traveling Photon Packet
          const t = (pulseTime * 0.7 + idx * 0.2) % 1;
          const px = (1 - t) * (1 - t) * h1.px + 2 * (1 - t) * t * midX + t * t * h2.px;
          const py = (1 - t) * (1 - t) * h1.py + 2 * (1 - t) * t * midY + t * t * h2.py;

          ctx.fillStyle = '#d7192a';
          ctx.shadowColor = 'rgba(215, 25, 42, 0.9)';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(px, py, 2.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // 6. Draw Hubs (Pins & Radar Pulses)
      projectedHubs.forEach((hub, idx) => {
        if (hub.z > -currentRadius * 0.2) {
          const isHq = hub.type === 'headquarters';
          const size = (isHq ? 5.5 : 4) * hub.scale;

          // Radar pulse ring
          const ringSize = size + ((pulseTime * 2 + idx * 0.5) % 1) * 10;
          const pulseAlpha = 1 - ((pulseTime * 2 + idx * 0.5) % 1);
          ctx.strokeStyle = isHq
            ? `rgba(215, 25, 42, ${pulseAlpha * 0.8})`
            : `rgba(2, 132, 199, ${pulseAlpha * 0.8})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(hub.px, hub.py, ringSize, 0, Math.PI * 2);
          ctx.stroke();

          // Hub Node Dot
          ctx.fillStyle = isHq ? '#d7192a' : '#0284c7';
          ctx.shadowColor = isHq ? '#d7192a' : '#0284c7';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(hub.px, hub.py, size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          // Inner white dot
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(hub.px, hub.py, size * 0.4, 0, Math.PI * 2);
          ctx.fill();

          // Clean Floating Label (Visible when hub faces front: z > currentRadius * 0.08)
          if (hub.z > currentRadius * 0.08) {
            ctx.font = '700 11px Inter, system-ui, sans-serif';
            ctx.fillStyle = isHq ? '#b91c1c' : '#0f172a';
            ctx.fillText(hub.name, hub.px + size + 7, hub.py + 3.5);
          }
        }
      });

      animId = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <canvas ref={canvasRef} className="cursor-grab active:cursor-grabbing w-full h-full block" />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full border border-red-500/30 bg-[#0b0c10]/80 px-3.5 py-1 text-[10px] font-semibold text-red-200 backdrop-blur-md shadow-lg pointer-events-none">
        <span className="size-1.5 rounded-full bg-red-400 animate-pulse" />
        Interactive 3D Network • Drag to Rotate
      </div>
    </div>
  );
}
