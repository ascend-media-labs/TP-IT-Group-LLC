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
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -8;
    const rY = ((x - centerX) / centerX) * 8;
    setRotateX(rX);
    setRotateY(rY);
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
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        }}
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white/95 p-8 shadow-sm backdrop-blur-xl transition-all duration-500 hover:border-red-300 hover:shadow-xl hover:shadow-red-500/5"
      >
        {/* Glow ambient highlight */}
        <div
          className="pointer-events-none absolute -right-20 -top-20 size-48 rounded-full bg-red-500/5 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-30"
        />

        <div>
          {/* Card Top: Icon & Number */}
          <div className="flex items-center justify-between">
            <div className="flex size-14 items-center justify-center rounded-2xl border border-red-200 bg-red-50 text-[#d7192a] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#d7192a] group-hover:text-white group-hover:border-transparent shadow-xs">
              {icon}
            </div>
            <span className="font-mono text-xs font-bold text-slate-400 tracking-wider">
              0{index + 1}
            </span>
          </div>

          {/* Title & Description */}
          <h3 className="mt-6 text-xl font-extrabold text-slate-900 group-hover:text-[#d7192a] transition-colors">
            {title}
          </h3>
          <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">
            {isDetailed && desc ? desc : summary}
          </p>

          {/* Key Offerings List if Detailed */}
          {isDetailed && offers.length > 0 && (
            <div className="mt-6 space-y-2 border-t border-slate-100 pt-5">
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

        {/* Card Bottom CTA */}
        <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
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

