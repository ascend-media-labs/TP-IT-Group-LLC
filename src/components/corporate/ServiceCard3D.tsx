import { useState, useRef, type MouseEvent, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from '@tanstack/react-router';

interface ServiceCard3DProps {
  id: string;
  index: number;
  title: string;
  summary: string;
  desc?: string;
  image?: string;
  offers?: string[];
  icon: ReactNode;
  full?: boolean;
}

export function ServiceCard3D({
  id,
  index,
  title,
  summary,
  desc,
  image,
  offers = [],
  icon,
  full = false,
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

    // Smooth tilt: max 12 deg
    const rX = ((y - centerY) / centerY) * -12;
    const rY = ((x - centerX) / centerX) * 12;

    setRotateX(rX);
    setRotateY(rY);
    setGlarePos({
      x: Math.round((x / rect.width) * 100),
      y: Math.round((y / rect.height) * 100),
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
      style={{ perspective: 1100 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.025, 1.025, 1.025)`
            : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transformStyle: 'preserve-3d',
          transition: isHovered
            ? 'transform 0.1s ease-out, box-shadow 0.25s ease-out, border-color 0.25s ease-out'
            : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease-out, border-color 0.6s ease-out',
        }}
        className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border bg-white p-5 sm:p-6 shadow-sm backdrop-blur-xl transition-all duration-300 ${
          isHovered
            ? 'border-red-300 shadow-[0_24px_50px_-12px_rgba(215,25,42,0.18)]'
            : 'border-slate-200/90'
        }`}
      >
        {/* Dynamic Interactive Spotlight / Glare */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300 z-20"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(215, 25, 42, 0.08) 0%, rgba(255, 255, 255, 0.4) 30%, transparent 65%)`,
          }}
        />

        {/* Soft Ambient Corner Glow */}
        <div
          className="pointer-events-none absolute -right-20 -top-20 size-48 rounded-full bg-red-500/10 blur-3xl transition-opacity duration-500"
          style={{ opacity: isHovered ? 1 : 0.25 }}
        />

        <div>
          {/* 3D Stagger Layer 1: Image with Top-Left Floating Badge */}
          <div
            style={{
              transform: isHovered ? 'translateZ(30px)' : 'translateZ(0px)',
              transition: isHovered
                ? 'transform 0.36s cubic-bezier(0.16, 1, 0.3, 1) 0.03s'
                : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              transformStyle: 'preserve-3d',
            }}
            className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-100 border border-slate-100 shadow-inner mb-5"
          >
            {image && (
              <img
                src={image}
                alt={title}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                loading="lazy"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />

            {/* Floating Icon Badge with higher 3D Pop (translateZ 44px) */}
            <div
              style={{
                transform: isHovered ? 'translateZ(44px) scale(1.08)' : 'translateZ(0px) scale(1)',
                transition: isHovered
                  ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.06s'
                  : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="absolute top-2.5 left-2.5 flex size-9 items-center justify-center rounded-xl bg-white/95 backdrop-blur-md text-[#d7192a] shadow-sm border border-white/80 z-10 group-hover:border-red-200 transition-colors"
            >
              {icon}
            </div>
          </div>

          {/* 3D Stagger Layer 2: Title & Description */}
          <div
            style={{
              transform: isHovered ? 'translateZ(24px)' : 'translateZ(0px)',
              transition: isHovered
                ? 'transform 0.38s cubic-bezier(0.16, 1, 0.3, 1) 0.09s'
                : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#d7192a] transition-colors">
              {title}
            </h3>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
              {full && desc ? desc : summary}
            </p>
          </div>

          {/* Key Offerings List if Full */}
          {full && offers && offers.length > 0 && (
            <div
              style={{
                transform: isHovered ? 'translateZ(18px)' : 'translateZ(0px)',
                transition: isHovered
                  ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.12s'
                  : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="mt-4 space-y-1.5 border-t border-slate-100 pt-3"
            >
              {offers.map((offer) => (
                <div key={offer} className="flex items-start gap-2 text-xs text-slate-600">
                  <Check className="size-3.5 mt-0.5 shrink-0 text-[#d7192a]" />
                  <span>{offer}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 3D Stagger Layer 3: Bottom Explore Link */}
        <div
          style={{
            transform: isHovered ? 'translateZ(20px)' : 'translateZ(0px)',
            transition: isHovered
              ? 'transform 0.42s cubic-bezier(0.16, 1, 0.3, 1) 0.15s'
              : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="mt-6 pt-4 border-t border-slate-100"
        >
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#d7192a] hover:text-[#b91c1c] transition-colors group/link"
          >
            Explore {title} <ArrowRight className="size-3.5 ml-1 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
