import { useEffect, useRef, useState } from 'react';

interface Hub {
  name: string;
  lat: number;
  lon: number;
  type: 'headquarters' | 'hub';
}

const HUBS: Hub[] = [
  { name: 'USA Head Office (Wilmington)', lat: 39.74, lon: -75.54, type: 'headquarters' },
  { name: 'New York Operations', lat: 40.71, lon: -74.0, type: 'hub' },
  { name: 'London UK Hub', lat: 51.5, lon: -0.12, type: 'hub' },
  { name: 'India Tech Center (Pune)', lat: 18.52, lon: 73.85, type: 'hub' },
  { name: 'Australia APAC (Sydney)', lat: -33.86, lon: 151.2, type: 'hub' },
  { name: 'Canada Delivery (Toronto)', lat: 43.65, lon: -79.38, type: 'hub' },
];

const CONNECTIONS: [number, number][] = [
  [0, 1], // Wilmington -> NY
  [0, 2], // Wilmington -> London
  [0, 3], // Wilmington -> Pune
  [0, 5], // Wilmington -> Toronto
  [2, 3], // London -> Pune
  [3, 4], // Pune -> Sydney
];

export function DigitalGlobe({ className = 'w-full h-[380px] sm:h-[450px] md:h-[500px]' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeHub, setActiveHub] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    let rotationY = 0.5;
    let rotationX = 0.25;
    let targetRotationY = 0.5;
    let targetRotationX = 0.25;
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    // Generate points on sphere
    const points: { x: number; y: number; z: number; isLand?: boolean }[] = [];
    const count = 480;
    const radius = Math.min(width, height) * 0.36;

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      points.push({
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.cos(phi),
        z: radius * Math.sin(theta) * Math.sin(phi),
      });
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

    // Resize handler
    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener('resize', handleResize);

    // Mouse / Touch interaction
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
      targetRotationY += dx * 0.007;
      targetRotationX += dy * 0.007;
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
      ctx.clearRect(0, 0, width, height);

      // Auto rotation
      if (!isDragging) {
        targetRotationY += 0.003;
      }
      rotationY += (targetRotationY - rotationY) * 0.08;
      rotationX += (targetRotationX - rotationX) * 0.08;
      // Clamp vertical tilt
      rotationX = Math.max(-0.6, Math.min(0.6, rotationX));

      pulseTime += 0.02;

      const cx = width / 2;
      const cy = height / 2;
      const currentRadius = Math.min(width, height) * 0.36;

      // Draw Atmospheric Glow
      const glowGrad = ctx.createRadialGradient(cx, cy, currentRadius * 0.7, cx, cy, currentRadius * 1.35);
      glowGrad.addColorStop(0, 'rgba(2, 132, 199, 0.12)');
      glowGrad.addColorStop(0.5, 'rgba(14, 165, 233, 0.05)');
      glowGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, currentRadius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // Outer Ring
      ctx.strokeStyle = 'rgba(2, 132, 199, 0.22)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, currentRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Transform function
      function project(p: { x: number; y: number; z: number }) {
        // Rotate around X
        const cosX = Math.cos(rotationX);
        const sinX = Math.sin(rotationX);
        const y1 = p.y * cosX - p.z * sinX;
        const z1 = p.y * sinX + p.z * cosX;

        // Rotate around Y
        const cosY = Math.cos(rotationY);
        const sinY = Math.sin(rotationY);
        const x2 = p.x * cosY + z1 * sinY;
        const z2 = -p.x * sinY + z1 * cosY;

        // Perspective
        const fov = 700;
        const scale = fov / (fov + z2);
        return {
          px: cx + x2 * scale,
          py: cy + y1 * scale,
          scale,
          z: z2,
        };
      }

      // Draw Lat/Lon Guide Rings
      ctx.strokeStyle = 'rgba(2, 132, 199, 0.08)';
      ctx.lineWidth = 0.8;
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let first = true;
        for (let lon = 0; lon <= 360; lon += 10) {
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

      // Render Dots
      points.forEach((pt) => {
        const pr = project({
          x: (pt.x / radius) * currentRadius,
          y: (pt.y / radius) * currentRadius,
          z: (pt.z / radius) * currentRadius,
        });

        // Depth cue
        const alpha = Math.max(0.06, (pr.z + currentRadius) / (currentRadius * 2));
        if (pr.z > 0) {
          ctx.fillStyle = `rgba(2, 132, 199, ${alpha * 0.95})`;
          ctx.beginPath();
          ctx.arc(pr.px, pr.py, 1.4 * pr.scale, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(148, 163, 184, ${alpha * 0.35})`;
          ctx.beginPath();
          ctx.arc(pr.px, pr.py, 0.9 * pr.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Project Hubs
      const projectedHubs = HUBS.map((hub) => {
        const coords = latLonToXYZ(hub.lat, hub.lon, currentRadius);
        const pr = project(coords);
        return { ...hub, ...pr };
      });

      // Draw Arcs & Photons
      CONNECTIONS.forEach(([i1, i2]) => {
        const h1 = projectedHubs[i1];
        const h2 = projectedHubs[i2];
        if (!h1 || !h2) return;

        // Draw only if at least partially visible
        if (h1.z > -currentRadius * 0.4 || h2.z > -currentRadius * 0.4) {
          const midX = (h1.px + h2.px) / 2;
          const midY = (h1.py + h2.py) / 2 - currentRadius * 0.18;

          ctx.strokeStyle = 'rgba(2, 132, 199, 0.5)';
          ctx.lineWidth = 1.3;
          ctx.beginPath();
          ctx.moveTo(h1.px, h1.py);
          ctx.quadraticCurveTo(midX, midY, h2.px, h2.py);
          ctx.stroke();

          // Traveling photon packet
          const t = (pulseTime * 0.6 + i1 * 0.25) % 1;
          const px = (1 - t) * (1 - t) * h1.px + 2 * (1 - t) * t * midX + t * t * h2.px;
          const py = (1 - t) * (1 - t) * h1.py + 2 * (1 - t) * t * midY + t * t * h2.py;

          ctx.fillStyle = '#0284c7';
          ctx.shadowColor = 'rgba(2, 132, 199, 0.8)';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Draw Hubs & Labels
      projectedHubs.forEach((hub) => {
        if (hub.z > -currentRadius * 0.2) {
          const isHq = hub.type === 'headquarters';
          const size = (isHq ? 5 : 3.5) * hub.scale;

          // Pulse ring
          const ringSize = size + (Math.sin(pulseTime * 3) + 1) * 3;
          ctx.strokeStyle = isHq ? 'rgba(215, 25, 42, 0.8)' : 'rgba(2, 132, 199, 0.8)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(hub.px, hub.py, ringSize, 0, Math.PI * 2);
          ctx.stroke();

          // Hub dot
          ctx.fillStyle = isHq ? '#d7192a' : '#0284c7';
          ctx.shadowColor = isHq ? '#d7192a' : '#0284c7';
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(hub.px, hub.py, size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          // Label
          if (hub.z > currentRadius * 0.1) {
            ctx.font = '700 10.5px Manrope, sans-serif';
            ctx.fillStyle = isHq ? '#b91c1c' : '#0f172a';
            ctx.fillText(hub.name, hub.px + size + 6, hub.py + 3);
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
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full border border-cyan-500/30 bg-[#040916]/80 px-3.5 py-1 text-[10px] font-semibold text-cyan-300 backdrop-blur-md shadow-lg pointer-events-none">
        <span className="size-1.5 rounded-full bg-cyan-400 animate-pulse" />
        Interactive 3D Network • Drag to Rotate
      </div>
    </div>
  );
}

