import { useEffect, useRef } from 'react';

interface Hub {
  name: string;
  lat: number;
  lon: number;
  type: 'headquarters' | 'hub';
}

const HUBS: Hub[] = [
  { name: 'USA Head Office', lat: 39.74, lon: -75.54, type: 'headquarters' },
  { name: 'New York Operations', lat: 40.71, lon: -74.0, type: 'hub' },
  { name: 'London UK Hub', lat: 51.5, lon: -0.12, type: 'hub' },
  { name: 'India (Hyderabad)', lat: 17.38, lon: 78.48, type: 'hub' },
  { name: 'Australia APAC (Sydney)', lat: -33.86, lon: 151.2, type: 'hub' },
  { name: 'Canada Delivery', lat: 43.65, lon: -79.38, type: 'hub' },
];

const CONNECTIONS: [number, number][] = [
  [0, 1], // Wilmington -> NY
  [0, 2], // Wilmington -> London
  [0, 3], // Wilmington -> Hyderabad
  [0, 5], // Wilmington -> Toronto
  [2, 3], // London -> Hyderabad
  [3, 4], // Hyderabad -> Sydney
];

function drawRoundRect(
  c: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  if (typeof c.roundRect === 'function') {
    c.beginPath();
    c.roundRect(x, y, w, h, r);
  } else {
    c.beginPath();
    c.moveTo(x + r, y);
    c.lineTo(x + w - r, y);
    c.quadraticCurveTo(x + w, y, x + w, y + r);
    c.lineTo(x + w, y + h - r);
    c.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    c.lineTo(x + r, y + h);
    c.quadraticCurveTo(x, y + h, x, y + h - r);
    c.lineTo(x, y + r);
    c.quadraticCurveTo(x, y, x + r, y);
    c.closePath();
  }
}

export function DigitalGlobe({ className = 'w-full h-[320px] sm:h-[360px] md:h-[400px] lg:h-[420px]' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.parentElement?.clientWidth || 500);
    let height = (canvas.parentElement?.clientHeight || 500);
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

    // Generate points on sphere (Fibonacci lattice)
    const points: { x: number; y: number; z: number }[] = [];
    const count = 680;
    const baseRadius = 150;

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      points.push({
        x: baseRadius * Math.cos(theta) * Math.sin(phi),
        y: baseRadius * Math.cos(phi),
        z: baseRadius * Math.sin(theta) * Math.sin(phi),
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
      ctx.clearRect(0, 0, width, height);

      // Smooth auto rotation when idle
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

      // 1. Atmosphere Halo (Subtle Outer Glow)
      const glowGrad = ctx.createRadialGradient(cx, cy, currentRadius * 0.85, cx, cy, currentRadius * 1.25);
      glowGrad.addColorStop(0, 'rgba(215, 25, 42, 0.16)');
      glowGrad.addColorStop(0.35, 'rgba(2, 132, 199, 0.1)');
      glowGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, currentRadius * 1.25, 0, Math.PI * 2);
      ctx.fill();

      // 2. 3D Frosted Glass Spherical Core (Gives high contrast against photo)
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, currentRadius - 0.5, 0, Math.PI * 2);
      ctx.clip();

      const sphereGrad = ctx.createRadialGradient(
        cx - currentRadius * 0.3,
        cy - currentRadius * 0.3,
        currentRadius * 0.05,
        cx,
        cy,
        currentRadius
      );
      sphereGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      sphereGrad.addColorStop(0.4, 'rgba(248, 250, 252, 0.88)');
      sphereGrad.addColorStop(0.75, 'rgba(241, 245, 249, 0.8)');
      sphereGrad.addColorStop(1, 'rgba(226, 232, 240, 0.65)');
      ctx.fillStyle = sphereGrad;
      ctx.fillRect(cx - currentRadius, cy - currentRadius, currentRadius * 2, currentRadius * 2);
      ctx.restore();

      // 3. Crisp Rim Ring
      ctx.strokeStyle = 'rgba(215, 25, 42, 0.3)';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(cx, cy, currentRadius, 0, Math.PI * 2);
      ctx.stroke();

      // 3D Projection Helper
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

      // 4. Lat/Lon Wireframe Grid
      ctx.lineWidth = 0.9;
      for (let lat = -60; lat <= 60; lat += 30) {
        const isEquator = lat === 0;
        ctx.strokeStyle = isEquator ? 'rgba(215, 25, 42, 0.28)' : 'rgba(15, 23, 42, 0.12)';
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

      // 5. Network Dots (Front: Crisp Corporate Sapphire & Ruby, Back: Subtle Grey)
      points.forEach((pt) => {
        const pr = project({
          x: (pt.x / baseRadius) * currentRadius,
          y: (pt.y / baseRadius) * currentRadius,
          z: (pt.z / baseRadius) * currentRadius,
        });

        const alpha = Math.max(0.12, (pr.z + currentRadius) / (currentRadius * 2));
        if (pr.z > 0) {
          ctx.fillStyle = `rgba(15, 23, 42, ${alpha * 0.85})`;
          ctx.beginPath();
          ctx.arc(pr.px, pr.py, 1.65 * pr.scale, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(148, 163, 184, ${alpha * 0.35})`;
          ctx.beginPath();
          ctx.arc(pr.px, pr.py, 1.0 * pr.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 6. Project Hub Locations
      const projectedHubs = HUBS.map((hub) => {
        const coords = latLonToXYZ(hub.lat, hub.lon, currentRadius);
        const pr = project(coords);
        return { ...hub, ...pr };
      });

      // 7. Dynamic Curved Connection Arcs & Photons
      CONNECTIONS.forEach(([i1, i2], connIdx) => {
        const h1 = projectedHubs[i1];
        const h2 = projectedHubs[i2];
        if (!h1 || !h2) return;

        if (h1.z > -currentRadius * 0.3 || h2.z > -currentRadius * 0.3) {
          const midX = (h1.px + h2.px) / 2;
          const midY = (h1.py + h2.py) / 2 - currentRadius * 0.22;

          // Glowing Arc
          const arcGrad = ctx.createLinearGradient(h1.px, h1.py, h2.px, h2.py);
          arcGrad.addColorStop(0, 'rgba(215, 25, 42, 0.65)');
          arcGrad.addColorStop(0.5, 'rgba(2, 132, 199, 0.75)');
          arcGrad.addColorStop(1, 'rgba(215, 25, 42, 0.65)');

          ctx.strokeStyle = arcGrad;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(h1.px, h1.py);
          ctx.quadraticCurveTo(midX, midY, h2.px, h2.py);
          ctx.stroke();

          // High-speed Laser Photon with Trail
          const t = (pulseTime * 0.8 + connIdx * 0.22) % 1;
          const px = (1 - t) * (1 - t) * h1.px + 2 * (1 - t) * t * midX + t * t * h2.px;
          const py = (1 - t) * (1 - t) * h1.py + 2 * (1 - t) * t * midY + t * t * h2.py;

          ctx.fillStyle = '#d7192a';
          ctx.shadowColor = 'rgba(215, 25, 42, 0.9)';
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(px, py, 3.2, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(px, py, 1.4, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // 8. Hub Nodes & Floating Premium Glass Badges
      projectedHubs.forEach((hub, idx) => {
        if (hub.z > -currentRadius * 0.15) {
          const isHq = hub.type === 'headquarters';
          const nodeRadius = (isHq ? 6 : 4.5) * hub.scale;

          // Animated Radar Pulse
          const pulseProgress = ((pulseTime * 1.8 + idx * 0.4) % 1);
          const pulseRadius = nodeRadius + pulseProgress * 14;
          const pulseAlpha = (1 - pulseProgress) * 0.75;
          ctx.strokeStyle = isHq
            ? `rgba(215, 25, 42, ${pulseAlpha})`
            : `rgba(2, 132, 199, ${pulseAlpha})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(hub.px, hub.py, pulseRadius, 0, Math.PI * 2);
          ctx.stroke();

          // Hub Solid Node
          ctx.fillStyle = isHq ? '#d7192a' : '#0284c7';
          ctx.shadowColor = isHq ? 'rgba(215, 25, 42, 0.8)' : 'rgba(2, 132, 199, 0.8)';
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(hub.px, hub.py, nodeRadius, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          // White Center Dot
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(hub.px, hub.py, nodeRadius * 0.45, 0, Math.PI * 2);
          ctx.fill();

          // Floating Glass Badge (Visible when hub faces front: z > currentRadius * 0.05)
          if (hub.z > currentRadius * 0.05) {
            ctx.save();
            const text = hub.name;
            ctx.font = '700 11px Inter, system-ui, -apple-system, sans-serif';
            const textWidth = ctx.measureText(text).width;
            const padX = 8;
            const badgeH = 22;
            const badgeW = textWidth + padX * 2 + 10;

            // Offset positioning to prevent overlap
            let offX = 14;
            let offY = -11;
            if (hub.name.includes('Canada')) {
              offY = -28;
            } else if (hub.name.includes('USA')) {
              offY = 12;
            } else if (hub.name.includes('Sydney')) {
              offY = -22;
            }

            const bx = hub.px + offX;
            const by = hub.py + offY;

            // Connector stem
            ctx.strokeStyle = isHq ? 'rgba(215, 25, 42, 0.5)' : 'rgba(2, 132, 199, 0.45)';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(hub.px, hub.py);
            ctx.lineTo(bx, by + badgeH / 2);
            ctx.stroke();

            // Badge Background
            ctx.fillStyle = 'rgba(255, 255, 255, 0.96)';
            ctx.shadowColor = 'rgba(15, 23, 42, 0.15)';
            ctx.shadowBlur = 10;
            ctx.shadowOffsetY = 2;
            drawRoundRect(ctx, bx, by, badgeW, badgeH, 6);
            ctx.fill();
            ctx.shadowBlur = 0;

            // Badge Border
            ctx.strokeStyle = isHq ? 'rgba(215, 25, 42, 0.45)' : 'rgba(203, 213, 225, 0.9)';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Status Indicator Dot
            ctx.fillStyle = isHq ? '#d7192a' : '#0284c7';
            ctx.beginPath();
            ctx.arc(bx + padX + 2, by + badgeH / 2, 3.2, 0, Math.PI * 2);
            ctx.fill();

            // Text
            ctx.fillStyle = isHq ? '#b91c1c' : '#0f172a';
            ctx.fillText(text, bx + padX + 10, by + badgeH / 2 + 3.8);
            ctx.restore();
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
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/95 px-3.5 py-1 text-[10.5px] font-semibold text-slate-700 shadow-md backdrop-blur-md pointer-events-none transition-all">
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d7192a] opacity-75"></span>
          <span className="relative inline-flex size-2 rounded-full bg-[#d7192a]"></span>
        </span>
        <span>Interactive 3D Network • Drag to Rotate</span>
      </div>
    </div>
  );
}
