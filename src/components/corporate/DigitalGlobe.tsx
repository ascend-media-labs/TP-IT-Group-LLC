import { useEffect, useRef, useState } from 'react';
import { Activity, ArrowRight } from 'lucide-react';
import { CountryFlag } from './CountryFlag';

interface LocationNode {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  flag: string;
  city: string;
  role: string;
  address: string;
  contact?: string;
  color: string;
  // Normalized coordinates (0..1)
  x: number;
  y: number;
}

const LOCATIONS: LocationNode[] = [
  {
    id: 'usa',
    name: 'TP IT GROUP LLC',
    country: 'USA',
    countryCode: 'US',
    flag: '🇺🇸',
    city: 'Wilmington, Delaware',
    role: 'Global Headquarters',
    address: '1000 N. West Street, Suite 1200, Wilmington, DE 19801, USA',
    contact: 'HQ Management & Delivery',
    color: '#d7192a', // Brand red
    x: 0.22,
    y: 0.74,
  },
  {
    id: 'canada',
    name: 'TP IT Group',
    country: 'Canada',
    countryCode: 'CA',
    flag: '🇨🇦',
    city: 'Ontario, Canada',
    role: 'Delivery & Operations Hub',
    address: 'Ontario, Canada',
    contact: '+1 (814) 844-1362',
    color: '#dc2626',
    x: 0.38,
    y: 0.25,
  },
  {
    id: 'india',
    name: 'TP IT GROUP PVT LTD',
    country: 'India',
    countryCode: 'IN',
    flag: '🇮🇳',
    city: 'Hyderabad, Telangana',
    role: 'Corporate & Tech Center',
    address: '13th Floor, Manjeera Trinity Corporate, KPHB Phase 3, Kukatpally, Hyderabad 500072',
    contact: 'Core Engineering & 24/7 Operations',
    color: '#0284c7', // Cyan/Blue accent
    x: 0.76,
    y: 0.52,
  },
];

// Loop sequence: USA (0) -> Canada (1) -> India (2) -> USA (0)
const LOOP_EDGES: [number, number][] = [
  [0, 1], // USA -> Canada
  [1, 2], // Canada -> India
  [2, 0], // India -> USA
];

export function DigitalGlobe({ className = 'w-full h-[300px] sm:h-[340px] md:h-[370px] lg:h-[390px]' }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeSegment, setActiveSegment] = useState<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Compute curve points between two nodes
    const getCurve = (p1: { x: number; y: number }, p2: { x: number; y: number }, index: number) => {
      let ctrlX = (p1.x + p2.x) / 2;
      let ctrlY = (p1.y + p2.y) / 2;

      if (index === 0) {
        // USA -> Canada (Northward slope, slight curve to west)
        ctrlX -= 16;
      } else if (index === 1) {
        // Canada -> India (Transcontinental arch over Eurasia)
        ctrlY -= height * 0.12;
      } else if (index === 2) {
        // India -> USA (Return loop across oceans)
        ctrlY += height * 0.14;
      }

      return { p1, p2, ctrl: { x: ctrlX, y: ctrlY } };
    };

    // Quadratic bezier point evaluation
    const getBezierPoint = (p0: { x: number; y: number }, p1: { x: number; y: number }, p2: { x: number; y: number }, t: number) => {
      const oneMinusT = 1 - t;
      return {
        x: oneMinusT * oneMinusT * p0.x + 2 * oneMinusT * t * p1.x + t * t * p2.x,
        y: oneMinusT * oneMinusT * p0.y + 2 * oneMinusT * t * p1.y + t * t * p2.y,
      };
    };

    let time = 0;

    const render = () => {
      if (!ctx || width === 0 || height === 0) {
        animId = requestAnimationFrame(render);
        return;
      }

      time += 0.007; // Loop speed
      ctx.clearRect(0, 0, width, height);

      // Node absolute pixel coordinates
      const nodes = LOCATIONS.map((loc) => ({
        ...loc,
        px: loc.x * width,
        py: loc.y * height,
      }));

      // Calculate curves for each edge
      const curves = LOOP_EDGES.map(([startIdx, endIdx], i) => {
        const start = { x: nodes[startIdx].px, y: nodes[startIdx].py };
        const end = { x: nodes[endIdx].px, y: nodes[endIdx].py };
        return getCurve(start, end, i);
      });

      // 1. Draw subtle ambient radar grid & concentric circles centered in the triangle
      const triCenterX = (nodes[0].px + nodes[1].px + nodes[2].px) / 3;
      const triCenterY = (nodes[0].py + nodes[1].py + nodes[2].py) / 3;

      // Ambient radial gradient behind triangle
      const ambientGlow = ctx.createRadialGradient(triCenterX, triCenterY, 20, triCenterX, triCenterY, Math.min(width, height) * 0.55);
      ambientGlow.addColorStop(0, 'rgba(215, 25, 42, 0.07)');
      ambientGlow.addColorStop(0.5, 'rgba(2, 132, 199, 0.03)');
      ambientGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = ambientGlow;
      ctx.beginPath();
      ctx.arc(triCenterX, triCenterY, Math.min(width, height) * 0.55, 0, Math.PI * 2);
      ctx.fill();

      // Subtle radar circles
      [0.25, 0.42, 0.55].forEach((radiusFactor) => {
        ctx.strokeStyle = 'rgba(215, 25, 42, 0.08)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.arc(triCenterX, triCenterY, Math.min(width, height) * radiusFactor, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.setLineDash([]);

      // Subtle filled polygon for the triangle zone
      ctx.beginPath();
      ctx.moveTo(nodes[0].px, nodes[0].py);
      ctx.quadraticCurveTo(curves[0].ctrl.x, curves[0].ctrl.y, nodes[1].px, nodes[1].py);
      ctx.quadraticCurveTo(curves[1].ctrl.x, curves[1].ctrl.y, nodes[2].px, nodes[2].py);
      ctx.quadraticCurveTo(curves[2].ctrl.x, curves[2].ctrl.y, nodes[0].px, nodes[0].py);
      ctx.closePath();
      const areaGlow = ctx.createRadialGradient(triCenterX, triCenterY, 10, triCenterX, triCenterY, 180);
      areaGlow.addColorStop(0, 'rgba(215, 25, 42, 0.03)');
      areaGlow.addColorStop(1, 'rgba(2, 132, 199, 0.01)');
      ctx.fillStyle = areaGlow;
      ctx.fill();

      // 2. Draw Triangle Base Path (Connecting line track)
      curves.forEach((c) => {
        // Outer soft glow
        ctx.strokeStyle = 'rgba(215, 25, 42, 0.12)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(c.p1.x, c.p1.y);
        ctx.quadraticCurveTo(c.ctrl.x, c.ctrl.y, c.p2.x, c.p2.y);
        ctx.stroke();

        // Inner dashed line
        ctx.strokeStyle = 'rgba(215, 25, 42, 0.45)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 5]);
        ctx.beginPath();
        ctx.moveTo(c.p1.x, c.p1.y);
        ctx.quadraticCurveTo(c.ctrl.x, c.ctrl.y, c.p2.x, c.p2.y);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // 3. Draw Moving Loop Packets (US -> CANADA -> INDIA -> US in continuous loop)
      const numPackets = 6;
      for (let p = 0; p < numPackets; p++) {
        const offset = (p / numPackets) * 3;
        const totalProgress = (time * 1.2 + offset) % 3;
        const segmentIndex = Math.floor(totalProgress);
        const t = totalProgress - segmentIndex;

        const currentCurve = curves[segmentIndex];
        if (!currentCurve) continue;

        // Current packet head position
        const head = getBezierPoint(currentCurve.p1, currentCurve.ctrl, currentCurve.p2, t);

        // Motion trail streak
        const tailSegments = 8;
        ctx.beginPath();
        ctx.moveTo(head.x, head.y);

        for (let s = 1; s <= tailSegments; s++) {
          const tailT = t - s * 0.012;
          if (tailT >= 0) {
            const tailPt = getBezierPoint(currentCurve.p1, currentCurve.ctrl, currentCurve.p2, tailT);
            ctx.lineTo(tailPt.x, tailPt.y);
          }
        }

        const isHeadHq = segmentIndex === 0;
        const streakColor = isHeadHq ? 'rgba(215, 25, 42, ' : 'rgba(2, 132, 199, ';
        ctx.strokeStyle = streakColor + '0.75)';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Photon glow head
        ctx.shadowColor = isHeadHq ? 'rgba(215, 25, 42, 0.9)' : 'rgba(2, 132, 199, 0.9)';
        ctx.shadowBlur = 10;
        ctx.fillStyle = isHeadHq ? '#d7192a' : '#38bdf8';
        ctx.beginPath();
        ctx.arc(head.x, head.y, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // White core highlight
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(head.x, head.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Track active segment for HUD
      const activeSeg = Math.floor((time * 1.2) % 3);
      setActiveSegment(activeSeg);

      // 4. Draw Node Sonar Radar Rings behind each card
      nodes.forEach((node, idx) => {
        const pulsePhase = (time * 2.2 + idx * 1.2) % (Math.PI * 2);

        // Expanding radar rings radiating outward from the card position
        [1, 1.8].forEach((factor) => {
          const ringRadius = 24 + ((pulsePhase * 9 * factor) % 36);
          const ringAlpha = Math.max(0, 1 - ringRadius / 50);
          ctx.strokeStyle = node.color === '#d7192a'
            ? `rgba(215, 25, 42, ${ringAlpha * 0.35})`
            : `rgba(2, 132, 199, ${ringAlpha * 0.35})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(node.px, node.py, ringRadius, 0, Math.PI * 2);
          ctx.stroke();
        });
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none overflow-visible rounded-2xl ${className}`}
    >
      {/* Background Interactive Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block pointer-events-none z-0" />

      {/* Top HUD: Real-time Route Loop Indicator */}
      <div className="absolute top-2 left-3 sm:left-4 z-20 flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/95 px-3 py-1 shadow-sm backdrop-blur-md pointer-events-none">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d7192a]" />
        </span>
        <span className="text-[10px] sm:text-[11px] font-bold text-slate-800 tracking-wide flex items-center gap-1.5">
          <span className={`inline-flex items-center gap-1 ${activeSegment === 0 ? 'text-[#d7192a] font-extrabold underline' : 'text-slate-600'}`}>
            <CountryFlag country="us" className="w-3.5 h-2.5 inline-block -mt-0.5" /> USA
          </span>
          <ArrowRight className="size-3 text-red-500 animate-pulse" />
          <span className={`inline-flex items-center gap-1 ${activeSegment === 1 ? 'text-[#d7192a] font-extrabold underline' : 'text-slate-600'}`}>
            <CountryFlag country="ca" className="w-3.5 h-2.5 inline-block -mt-0.5" /> CANADA
          </span>
          <ArrowRight className="size-3 text-red-500 animate-pulse" />
          <span className={`inline-flex items-center gap-1 ${activeSegment === 2 ? 'text-[#d7192a] font-extrabold underline' : 'text-slate-600'}`}>
            <CountryFlag country="in" className="w-3.5 h-2.5 inline-block -mt-0.5" /> INDIA
          </span>
          <ArrowRight className="size-3 text-red-500 animate-pulse" />
          <span className="text-slate-400 text-[9px] uppercase font-semibold">LOOP</span>
        </span>
      </div>

      {/* Tri-Regional Delivery Stats Pill (Top Right) */}
      <div className="absolute top-2 right-3 sm:right-4 z-20 hidden xs:flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-50/95 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 shadow-sm backdrop-blur-md pointer-events-none">
        <Activity className="size-3 text-emerald-600 animate-pulse" />
        <span>Live 24/7 Delivery Sync</span>
      </div>

      {/* Location Cards placed directly at their triangle points (NO zoom, NO mouseover jump) */}
      {LOCATIONS.map((loc) => {
        return (
          <div
            key={loc.id}
            style={{
              left: `${loc.x * 100}%`,
              top: `${loc.y * 100}%`,
            }}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          >
            <div className="rounded-xl border border-slate-200/90 bg-white/95 px-3 py-2 shadow-md backdrop-blur-md text-left min-w-[130px] sm:min-w-[145px]">
              <div className="flex items-center gap-1.5">
                <CountryFlag
                  country={loc.id as 'us' | 'ca' | 'in'}
                  className="w-5 h-3.5 shadow-xs"
                />
                <span className="text-[11px] sm:text-xs font-bold text-slate-900 tracking-tight">
                  {loc.country}
                </span>
                <span className="relative flex h-2 w-2 ml-auto">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${loc.id === 'india' ? 'bg-sky-400' : 'bg-red-400'}`} />
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${loc.id === 'india' ? 'bg-[#0284c7]' : 'bg-[#d7192a]'}`} />
                </span>
              </div>
              <div className="text-[10px] font-semibold text-slate-700 leading-tight mt-0.5 whitespace-nowrap">
                {loc.city}
              </div>
              <div className="text-[9px] font-medium text-slate-500 leading-tight whitespace-nowrap">
                {loc.role}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
