import { useState, useRef, useEffect, type MouseEvent } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { metadata } from '@/components/corporate/content';
import { ArrowUpRight, Building2 } from 'lucide-react';
import { motion } from 'motion/react';

export const Route = createFileRoute('/team')({
  head: () =>
    metadata(
      'Our Team - Leadership | TP IT Group LLC',
      'Meet the leadership team at TP IT Group LLC bringing together enterprise strategy, operational discipline, cloud architecture and digital engineering.',
    ),
  component: Page,
});

interface Leader {
  name: string;
  role: string;
  subRole: string;
  bio: string;
  image: string;
  department: string;
}

const leaders: Leader[] = [
  {
    name: 'Karthik Pushpa',
    role: 'CEO & Founder',
    subRole: '15+ Years in Enterprise IT Strategy, Cloud Transformations & Digital Transformation',
    bio: "Karthik guides TP IT Group's enterprise strategy, bringing business priorities together with cloud modernization and digital transformation. His focus is a clear direction for clients and a practical roadmap from investment to delivery.",
    image: '/team/karthik.jpg',
    department: 'TP IT Group LLC',
  },
  {
    name: 'Gayathri Devi',
    role: 'Director of Operations',
    subRole: 'Ensures seamless project delivery and client satisfaction.',
    bio: 'Gayathri brings structure to project operations, keeping delivery teams and client expectations aligned. Her focus is clear communication, coordinated execution and a dependable client experience throughout each engagement.',
    image: '/team/gayathri.jpg',
    department: 'Project & Operations',
  },
  {
    name: 'Lakshmi Bhargavi',
    role: 'CTO',
    subRole: 'Cloud architecture expert with deep AWS, GCP and Azure expertise.',
    bio: 'Lakshmi shapes the technical direction of cloud solutions across AWS, Google Cloud and Azure. Her focus is architecture that balances scalability, security and operational needs as organizations modernize their technology.',
    image: '/team/lakshmi.jpg',
    department: 'Cloud & Deep-Tech',
  },
  {
    name: 'Sai Deepa',
    role: 'VP of Engineering',
    subRole: 'Leads our development teams across custom apps and ERP solutions.',
    bio: 'Sai leads engineering across custom applications and ERP solutions, connecting technical teams with project goals. Her focus is collaborative development, maintainable software and quality throughout implementation.',
    image: '/team/sai-deepa.jpg',
    department: 'Engineering & Apps',
  },
  {
    name: 'E S VIJAYAN',
    role: 'Director of Business Development',
    subRole: 'Ensures seamless project delivery, Business Growth and client satisfaction.',
    bio: 'Vijayan connects business growth with client needs, helping shape conversations into focused project opportunities. His focus is lasting relationships, aligned delivery expectations and client satisfaction.',
    image: '/team/vijayan.jpg',
    department: 'Business & Growth',
  },
];

interface TeamLeaderCardProps {
  leader: Leader;
  index: number;
}

function TeamLeaderCard({ leader, index }: TeamLeaderCardProps) {
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

    // 3D tilt calculation (up to 12 degrees)
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
      initial={{ opacity: 0, y: 35, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="perspective-1000 h-full"
      style={{ perspective: 1000 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`
            : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transformStyle: 'preserve-3d',
          transition: isHovered
            ? 'transform 0.12s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease-out'
            : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease-out',
        }}
        className={`group relative flex h-full flex-col justify-between rounded-3xl border bg-white/95 p-5 text-center transition-colors duration-300 ${
          isHovered
            ? 'border-red-300 shadow-[0_22px_45px_-12px_rgba(215,25,42,0.22)]'
            : 'border-slate-200/90 shadow-sm'
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

        {/* Ambient Top Glow */}
        <div
          className="pointer-events-none absolute -right-10 -top-10 size-36 rounded-full bg-red-500/10 blur-2xl transition-opacity duration-500"
          style={{ opacity: isHovered ? 1 : 0.25 }}
        />

        {/* 1. Top-Right Arrow Badge with 3D Depth & Stagger */}
        <div
          style={{
            transform: isHovered ? 'translateZ(34px)' : 'translateZ(0px)',
            transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1) 0.03s',
          }}
          className="absolute top-3.5 right-3.5 flex size-7 items-center justify-center rounded-lg bg-red-50/80 border border-red-100 text-[#d7192a] group-hover:bg-[#d7192a] group-hover:text-white transition-colors duration-200 shadow-2xs z-10"
        >
          <ArrowUpRight className="size-3.5" />
        </div>

        <div>
          {/* 2. Circular Avatar with 3D Pop & Stagger */}
          <div
            style={{
              transform: isHovered
                ? 'translateZ(44px) scale(1.06)'
                : 'translateZ(0px) scale(1)',
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.06s',
            }}
            className="relative mx-auto size-24 sm:size-28 rounded-full p-1 ring-2 ring-red-100 bg-gradient-to-br from-red-50 via-white to-red-100/70 shadow-sm group-hover:ring-red-300 transition-all duration-300 mt-1"
          >
            <div className="size-full overflow-hidden rounded-full bg-slate-100">
              <img
                src={leader.image}
                alt={`${leader.name} - ${leader.role}`}
                className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-108"
                loading="lazy"
              />
            </div>
          </div>

          {/* 3. Leader Name & Role with Stagger Layer */}
          <div
            style={{
              transform: isHovered ? 'translateZ(28px)' : 'translateZ(0px)',
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.09s',
            }}
          >
            <h3 className="mt-4 text-base font-bold text-slate-900 leading-tight group-hover:text-[#d7192a] transition-colors duration-200">
              {leader.name}
            </h3>
            <p className="mt-1 text-xs font-bold text-[#d7192a] leading-snug">
              {leader.role}
            </p>
          </div>

          {/* 4. SubRole Description with Stagger Layer */}
          <p
            style={{
              transform: isHovered ? 'translateZ(20px)' : 'translateZ(0px)',
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.12s',
            }}
            className="mt-2 text-[11px] font-medium text-slate-500 leading-relaxed line-clamp-2 px-1"
          >
            {leader.subRole}
          </p>
        </div>

        {/* 5. Bottom Department Pill with Stagger Layer */}
        <div
          style={{
            transform: isHovered ? 'translateZ(18px)' : 'translateZ(0px)',
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
          }}
          className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5 text-xs text-slate-600 font-medium"
        >
          <Building2 className="size-3.5 text-[#d7192a] shrink-0" />
          <span className="truncate">{leader.department}</span>
        </div>
      </div>
    </motion.div>
  );
}

function Page() {
  const [teamList, setTeamList] = useState<Leader[]>(leaders);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/team')
      .then((r) => r.json())
      .then((data) => {
        if (isMounted && data.success && Array.isArray(data.team) && data.team.length > 0) {
          setTeamList(
            data.team.map((t: any) => ({
              name: t.name,
              role: t.role,
              subRole: t.sub_role || t.subRole || '',
              bio: t.bio || '',
              image: t.image || '/team/karthik.jpg',
              department: t.department || 'TP IT Group LLC',
            }))
          );
        }
      })
      .catch((err) => {
        console.error('Error fetching live team from DB:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="bg-white text-slate-900">
      {/* 1. LEADERSHIP SHOWCASE (3D Tilt + Stagger Cards) */}
      <section className="pt-8 sm:pt-10 pb-6 sm:pb-8 bg-white text-slate-900 bg-dot-pattern">
        <div className="site-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6 pb-3 border-b border-slate-100"
          >
            <div>
              <span className="inline-block rounded-full bg-red-50/90 border border-red-200 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#d7192a]">
                OUR TEAM
              </span>
              <h2 className="mt-1.5 text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900">
                Leadership
              </h2>
            </div>
            <p className="mt-1 sm:mt-0 text-[11px] text-slate-400">
              Illustrated avatars — not actual portraits.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-5">
            {teamList.map((leader, idx) => (
              <TeamLeaderCard key={`${leader.name}-${idx}`} leader={leader} index={idx} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
