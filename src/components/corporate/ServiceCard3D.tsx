import { useState, useRef, type MouseEvent, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Check } from 'lucide-react';
import { Link } from '@tanstack/react-router';

interface ServiceCard3DProps {
  id: string;
  index: number;
  title: string;
  summary: string;
  desc?: string;
  offers?: string[];
  icon: ReactNode;
  isDetailed?: boolean;
}

export function ServiceCard3D({
  id,
  index,
  title,
  summary,
  desc,
  offers = [],
  icon,
  isDetailed = false,
}: ServiceCard3DProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -10;
    const rY = ((x - centerX) / centerX) * 10;
    setRotateX(rX);
    setRotateY(rY);
    setGlarePos({
      x: Math.round((x / rect.width) * 100),
      y: Math.round((y / rect.height) * 100),
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="perspective-1000 h-full"
      style={{ perspective: 1000 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.025, 1.025, 1.025)`
            : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transformStyle: 'preserve-3d',
          transition: isHovered
            ? 'transform 0.12s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease-out'
            : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease-out',
        }}
        className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border bg-white/95 p-8 shadow-sm backdrop-blur-xl transition-all duration-300 ${
          isHovered
            ? 'border-red-300 shadow-[0_24px_50px_-15px_rgba(215,25,42,0.18)]'
            : 'border-slate-200/90'
        }`}
      >
        {/* Dynamic Interactive Glare / Spotlight */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(215, 25, 42, 0.1) 0%, rgba(255, 255, 255, 0.45) 35%, transparent 65%)`,
          }}
        />

        {/* Glow ambient highlight */}
        <div
          className="pointer-events-none absolute -right-20 -top-20 size-48 rounded-full bg-red-500/10 blur-3xl transition-opacity duration-500"
          style={{ opacity: isHovered ? 1 : 0.25 }}
        />

        <div>
          {/* Card Top: Icon & Number with Stagger 3D Depth */}
          <div
            style={{
              transform: isHovered ? 'translateZ(36px)' : 'translateZ(0px)',
              transition: 'transform 0.38s cubic-bezier(0.16, 1, 0.3, 1) 0.04s',
            }}
            className="flex items-center justify-between"
          >
            <div className="flex size-14 items-center justify-center rounded-2xl border border-red-200 bg-red-50 text-[#d7192a] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#d7192a] group-hover:text-white group-hover:border-transparent shadow-xs">
              {icon}
            </div>
            <span className="font-mono text-xs font-bold text-slate-400 tracking-wider">
              0{index + 1}
            </span>
          </div>

          {/* Title & Description with Stagger 3D Depth */}
          <div
            style={{
              transform: isHovered ? 'translateZ(26px)' : 'translateZ(0px)',
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.08s',
            }}
          >
            <h3 className="mt-6 text-xl font-extrabold text-slate-900 group-hover:text-[#d7192a] transition-colors">
              {title}
            </h3>
            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">
              {isDetailed && desc ? desc : summary}
            </p>
          </div>

          {/* Key Offerings List if Detailed */}
          {isDetailed && offers.length > 0 && (
            <div
              style={{
                transform: isHovered ? 'translateZ(20px)' : 'translateZ(0px)',
                transition: 'transform 0.42s cubic-bezier(0.16, 1, 0.3, 1) 0.12s',
              }}
              className="mt-6 space-y-2 border-t border-slate-100 pt-5"
            >
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                Core Deliverables:
              </span>
              <ul className="grid gap-2 sm:grid-cols-2 mt-2">
                {offers.map((offer) => (
                  <li key={offer} className="flex items-start gap-2 text-xs text-slate-600">
                    <Check className="size-3.5 mt-0.5 shrink-0 text-[#d7192a]" />
                    <span>{offer}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Card Bottom CTA with Stagger 3D Depth */}
        <div
          style={{
            transform: isHovered ? 'translateZ(18px)' : 'translateZ(0px)',
            transition: 'transform 0.44s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
          }}
          className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between"
        >
          <Link
            to={isDetailed ? '/contact' : '/services'}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#d7192a] hover:text-[#b91c1c] transition-colors"
          >
            {isDetailed ? 'Request Consultation' : 'Explore Capabilities'}
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
            Enterprise SLA
          </span>
        </div>
      </div>
    </motion.div>
  );
}

