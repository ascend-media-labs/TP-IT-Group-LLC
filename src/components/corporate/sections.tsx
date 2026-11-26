import { Link } from '@tanstack/react-router';
import { useState, useRef, useEffect, useMemo, type ReactNode } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useInView } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  ShieldCheck,
  Globe2,
  Clock,
  Sparkles,
  Server,
  Cloud,
  Code2,
  Headphones,
  Check,
  CheckCircle2,
  Building2,
  Cpu,
  Layers,
  Activity,
  Briefcase,
  Bot,
  Database,
  Globe,
  Target,
  Users,
  Lightbulb,
  TrendingUp,
  Monitor,
  Pill,
  Factory,
  Rocket,
  HardHat,
  Handshake,
  Compass,
  MessageSquare,
  RefreshCw,
  AlertCircle,
  Search,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  headquarters,
  team,
  articles,
  companyInfo,
  stats,
  services,
  connectedCapabilities,
  engagementModels,
  clientPillars,
  industries,
  provenApproach,
  whyChooseUs,
  coreValues,
  milestones,
  careersJobs,
  careersBenefits,
  enterpriseDeliverables,
  clientLogos,
} from './content';
import { TPITLogo } from './logo';
import { DigitalGlobe } from './DigitalGlobe';
import { GlobalPresence } from './GlobalPresence';
import { ClientMarquee } from './ClientMarquee';

export { DigitalGlobe, GlobalPresence, ClientMarquee };
import { ServiceCard3D } from './ServiceCard3D';
import { AnimatedCounter } from './AnimatedCounter';
import { CountryFlag } from './CountryFlag';

const nav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Consulting', to: '/consulting' },
  { label: 'Talent', to: '/talent' },
  { label: 'Our Team', to: '/team' },
  { label: 'Clients', to: '/clients' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', to: '/contact' },
] as const;

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-[#d7192a] via-[#ff3b50] to-[#b91c1c] origin-left z-[9999] pointer-events-none shadow-[0_1px_10px_rgba(215,25,42,0.6)]"
      style={{ scaleX }}
    />
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ScrollProgress />
      <header className="site-header bg-white/80 backdrop-blur-xl">
        <div className="w-full h-full px-4 sm:px-6 lg:px-6 xl:px-10 flex items-center justify-between">
          {/* Left: Brand Logo */}
          <div className="flex items-center justify-start shrink-0 z-10">
            <Link
              to="/"
              className="brand-name flex items-center transition-opacity hover:opacity-90 shrink-0"
              onClick={() => setOpen(false)}
              aria-label="TP iT GROUP LLC Home"
            >
              <TPITLogo className="h-6 sm:h-6.5 xl:h-7.5 max-w-[180px] xl:max-w-[220px] w-auto shrink-0" />
            </Link>
          </div>

          {/* Center: Centered Navigation Capsule */}
          <div className="hidden lg:flex flex-1 items-center justify-center px-2 xl:px-4 z-20 min-w-0">
            <nav
              aria-label="Main navigation"
              className="flex items-center justify-center p-1 rounded-full bg-slate-100/80 border border-slate-200/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] backdrop-blur-md gap-0.5 xl:gap-1.5 pointer-events-auto"
            >
              {nav.map((item) => (
                <Link
                  key={`${item.label}-${item.to}`}
                  to={item.to}
                  className="nav-link"
                  activeProps={{ className: 'nav-link active' }}
                  activeOptions={{ exact: true }}
                >
                  <span className="nav-link-label">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Right: Action Button & Mobile Toggle */}
          <div className="flex items-center justify-end shrink-0 gap-2 z-10">
            <Button
              asChild
              className="hidden lg:inline-flex h-9 xl:h-10 rounded-full bg-gradient-to-r from-[#d7192a] via-[#e11d48] to-[#b91c1c] hover:from-[#b91c1c] hover:to-[#991b1b] px-4 xl:px-5 text-xs xl:text-sm font-semibold text-white shadow-sm transition-all hover:scale-105 items-center gap-1.5 shrink-0 whitespace-nowrap"
            >
              <Link to="/contact">
                Let’s talk <ArrowUpRight className="size-3.5 xl:size-4" />
              </Link>
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-slate-800 hover:bg-slate-100 shrink-0"
              aria-label={open ? 'Close navigation' : 'Open navigation'}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="size-6 text-[#d7192a]" /> : <Menu className="size-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Animated Drawer */}
        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              aria-label="Mobile navigation"
              className="absolute left-0 top-full flex w-full flex-col border-b border-slate-200 bg-white/95 px-6 py-6 shadow-2xl backdrop-blur-2xl lg:hidden"
            >
              {nav.map((item) => (
                <Link
                  key={`mobile-${item.label}-${item.to}`}
                  to={item.to}
                  className="rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:text-[#d7192a] transition-colors"
                  activeProps={{ className: 'rounded-xl px-3.5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-[#d7192a] via-[#e11d48] to-[#b91c1c] shadow-md shadow-red-500/25' }}
                  activeOptions={{ exact: true }}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button
                asChild
                className="mt-4 h-11 w-full rounded-full bg-gradient-to-r from-[#d7192a] via-[#e11d48] to-[#b91c1c] hover:from-[#b91c1c] hover:to-[#991b1b] text-xs font-bold text-white shadow-md shadow-red-500/20"
              >
                <Link to="/contact" onClick={() => setOpen(false)}>
                  Let’s talk <ArrowUpRight className="size-4 ml-1" />
                </Link>
              </Button>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

const capabilityTags = [
  'Cloud Architecture',
  'SAP Modernization',
  'Deep-Tech AI',
  'Custom Engineering',
  'Enterprise Strategy',
  'Global Workforce',
] as const;

export function Hero() {
  return (
    <section
      id="home"
      aria-label="TP IT Group Hero"
      className="relative overflow-hidden pt-1 pb-4 sm:pt-2 sm:pb-6 bg-white text-slate-900 bg-dot-pattern"
    >
      {/* Executive Hero Banner Background */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <img
          src="/hero-banner.jpg"
          alt="TP IT Group Executive Team Collaboration & Strategy Meeting"
          className="h-full w-full object-cover object-center opacity-55 sm:opacity-65"
          loading="eager"
        />
        {/* Soft readability vignette for text side */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 via-white/55 to-white/20 sm:from-white/95 sm:via-white/85 sm:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Background Gradients & Ambient Glows */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,rgba(215,25,42,0.05),transparent)]" />
      <div className="pointer-events-none absolute -left-40 top-1/4 size-96 rounded-full bg-red-500/5 blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 size-96 rounded-full bg-red-500/5 blur-[130px]" />

      <div className="site-container relative z-10">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8 items-center pt-1 pb-2 sm:pt-2 sm:pb-3">
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs sm:text-sm font-bold tracking-wider text-[#d7192a] uppercase"
            >
              TECHNOLOGY · CONSULTING · IT &amp; NON-IT TALENT
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-2.5 sm:mt-3 text-4xl sm:text-5xl md:text-6xl lg:text-[58px] font-extrabold tracking-tight text-slate-900 leading-[1.12]"
            >
              One partner.
              <br />
              <span className="text-[#d7192a]">Your next possibility.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-2.5 sm:mt-3 max-w-2xl text-sm sm:text-base md:text-lg font-normal leading-relaxed text-slate-600"
            >
              Build smarter systems. Bring the right expertise. Move your business forward with connected technology,
              consulting and workforce solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-4 sm:mt-5 flex flex-wrap justify-start gap-3.5 items-center"
            >
              <Button
                asChild
                className="h-11 sm:h-12 rounded-full bg-[#d7192a] hover:bg-[#b91c1c] px-6 sm:px-7 text-xs sm:text-sm font-bold text-white shadow-md shadow-red-500/20 transition-all hover:scale-[1.02]"
              >
                <Link to="/contact" className="inline-flex items-center gap-2">
                  Let’s solve your next challenge <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-11 sm:h-12 rounded-full border border-slate-300 bg-white/90 px-6 sm:px-7 text-xs sm:text-sm font-bold text-slate-800 shadow-xs backdrop-blur-md transition-all hover:bg-slate-50 hover:border-slate-400"
              >
                <Link to="/services">Explore solutions</Link>
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-2.5 sm:mt-3 text-xs sm:text-sm font-semibold text-[#d7192a]"
            >
              We deliver what you expect. We keep our promises.
            </motion.p>
          </div>

          {/* Right Column: 3D Interactive Digital Globe Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex items-center justify-center relative"
          >
            <DigitalGlobe className="w-full h-[300px] sm:h-[340px] md:h-[370px] lg:h-[390px]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AutoIncrementNumber({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  useEffect(() => {
    if (!isInView) {
      setCount(0);
      return;
    }

    let start = 0;
    const duration = 1400; // ms
    const startTime = performance.now();

    let animationFrameId: number;
    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(start + (end - start) * ease);
      setCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(update);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, end]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="relative border-y border-slate-200/80 bg-slate-50/80 py-4 sm:py-5 overflow-hidden bg-grid-pattern">
      <div className="site-container relative z-10">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 items-center">
          {/* 1. 20+ years */}
          <div className="text-center sm:text-left">
            <div className="font-mono text-2xl sm:text-3xl font-extrabold text-slate-900">
              <AutoIncrementNumber end={20} suffix="+ years" />
            </div>
            <div className="mt-1 text-xs text-slate-500 font-medium">Industry experience</div>
          </div>

          {/* 2. US USA CA Canada IN India */}
          <div className="text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 text-xs sm:text-sm font-bold text-slate-900">
              <span className="inline-flex items-center gap-1.5">
                <CountryFlag country="us" /> USA
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CountryFlag country="ca" /> Canada
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CountryFlag country="in" /> India
              </span>
            </div>
            <div className="mt-1 text-xs text-slate-500 font-medium">Connected operations</div>
          </div>

          {/* 3. Strategy to delivery */}
          <div className="text-center sm:text-left">
            <div className="text-base sm:text-lg font-bold text-slate-900">Strategy to delivery</div>
            <div className="mt-1 text-xs text-slate-500 font-medium">End-to-end partnership</div>
          </div>

          {/* 4. IT & non-IT */}
          <div className="text-center sm:text-left">
            <div className="text-base sm:text-lg font-bold text-slate-900">IT &amp; non-IT</div>
            <div className="mt-1 text-xs text-slate-500 font-medium">Technology and people</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ConnectedCapabilitiesSection() {
  const capIcons = [
    <Cpu key="cpu" className="size-5 text-[#d7192a]" />,
    <Compass key="compass" className="size-5 text-[#d7192a]" />,
    <Briefcase key="briefcase" className="size-5 text-[#d7192a]" />,
  ];

  return (
    <section id="consulting" className="py-8 sm:py-12 relative overflow-hidden bg-white text-slate-900 bg-dot-pattern">
      <div className="site-container relative z-10">
        <div className="mb-5 sm:mb-6 text-left">
          <p className="eyebrow text-[#d7192a]">ONE PARTNER. CONNECTED CAPABILITIES.</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1.5">
            Technology. Consulting. Talent. <span className="text-[#d7192a]">Built around your business.</span>
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-4xl">
            From defining the challenge to delivering the solution, bring your technology and people priorities together.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
          {connectedCapabilities.map((cap, i) => (
            <motion.div
              key={cap.number}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="group card-diagonal overflow-hidden flex flex-col justify-between p-4 sm:p-5 bg-white/95 border border-slate-200/90 hover:border-red-300 hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300 text-left"
            >
              <div>
                <Link
                  to={cap.href}
                  className="block relative aspect-[16/8.5] w-full overflow-hidden img-diagonal bg-slate-100 border border-slate-100 shadow-inner mb-3.5"
                >
                  <img
                    src={cap.image}
                    alt={cap.title}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />
                  <div className="absolute top-2 left-2 flex size-8 sm:size-9 items-center justify-center icon-diagonal bg-white/95 backdrop-blur-md text-[#d7192a] shadow-sm border border-white/80 z-10">
                    {capIcons[i % capIcons.length]}
                  </div>
                  <span className="absolute top-2 right-2 rounded-lg bg-black/40 backdrop-blur-md px-2 py-0.5 font-mono text-[10px] font-bold text-white z-10">
                    {cap.number}
                  </span>
                </Link>

                <Link to={cap.href} className="block group/title">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover/title:text-[#d7192a] group-hover:text-[#d7192a] transition-colors leading-snug">
                    {cap.title}
                  </h3>
                </Link>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 line-clamp-2">{cap.desc}</p>

                <ul className="mt-2.5 space-y-1.5 border-t border-slate-100 pt-2.5">
                  {cap.items.map((item) => (
                    <li key={item} className="flex items-start gap-1.5 text-[11px] sm:text-xs text-slate-700 font-medium">
                      <Check className="size-3.5 mt-0.5 shrink-0 text-[#d7192a]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to={cap.href}
                  className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-[#d7192a] hover:text-[#b91c1c] transition-colors"
                >
                  {cap.linkText}
                </Link>
                <Link
                  to={cap.href}
                  className="flex size-7 sm:size-7.5 items-center justify-center rounded-full bg-slate-50 border border-slate-200 text-slate-600 group-hover:bg-[#d7192a] group-hover:text-white group-hover:border-[#d7192a] transition-all shadow-2xs"
                  aria-label={cap.linkText}
                >
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function About({ detailed = false }: { detailed?: boolean }) {
  const aboutCards = [
    {
      icon: <Target className="size-5 transition-colors" />,
      title: 'Mission-Driven',
      desc: 'Deliver smart solutions that drive real business growth and digital transformation.',
    },
    {
      icon: <Users className="size-5 transition-colors" />,
      title: 'Client-Centric',
      desc: 'Building long-term partnerships through reliable service and dedicated support.',
    },
    {
      icon: <Lightbulb className="size-5 transition-colors" />,
      title: 'Innovation First',
      desc: 'Leveraging cutting-edge technologies to solve complex business challenges.',
    },
    {
      icon: <TrendingUp className="size-5 transition-colors" />,
      title: 'Scalable Growth',
      desc: 'Solutions designed to grow with your business from startup to enterprise.',
    },
  ];

  return (
    <section id="about" className="section relative overflow-hidden bg-white text-slate-900 bg-dot-pattern pb-2 sm:pb-3">
      <div className="pointer-events-none absolute -right-20 top-1/2 -translate-y-1/2 size-96 rounded-full bg-red-500/[0.03] blur-3xl" />
      <div className="site-container relative z-10 space-y-8 sm:space-y-10">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 border border-red-200/90 px-3.5 py-1 text-xs font-bold text-[#d7192a] shadow-2xs">
              <span className="size-1.5 rounded-full bg-[#d7192a] animate-pulse" />
              ABOUT US
            </span>
            <h2 className="section-title mt-3">
              Your Trusted Technology Partner for <span className="text-[#d7192a]">Global Growth</span>
            </h2>
            <div className="mt-4 space-y-3 text-xs sm:text-sm leading-relaxed text-slate-600">
              <p>
                TP IT Group helps businesses navigate digital transformation with practical, reliable technology solutions.
                Our <span className="inline-flex items-center gap-1 font-semibold text-slate-800"><CountryFlag country="us" className="w-4 h-3 inline-block -mt-0.5" /> USA</span> head office and{' '}
                <span className="inline-flex items-center gap-1 font-semibold text-slate-800"><CountryFlag country="ca" className="w-4 h-3 inline-block -mt-0.5" /> Canada</span> and{' '}
                <span className="inline-flex items-center gap-1 font-semibold text-slate-800"><CountryFlag country="in" className="w-4 h-3 inline-block -mt-0.5" /> India</span> operations connect
                business needs with technology, consulting and workforce expertise.
              </p>
              <p>
                We bring together AI automation, cloud migration, custom development, ERP and SAP, web design, and
                networking to support your business from planning through ongoing improvement.
              </p>
              <div className="mt-4 rounded-xl border border-red-200/80 border-l-[4px] border-l-[#d7192a] bg-gradient-to-r from-red-50/80 via-red-50/30 to-white p-3.5 shadow-2xs">
                <p className="font-semibold italic text-[#d7192a] text-xs sm:text-sm leading-relaxed">
                  &ldquo;We deliver what you expect and keep our promises — with clear communication, agreed priorities and dependable support.&rdquo;
                </p>
              </div>
            </div>

            {!detailed && (
              <Button
                asChild
                className="mt-6 h-11 rounded-xl bg-slate-900 px-6 text-xs font-bold text-white shadow-md shadow-slate-900/10 hover:bg-[#d7192a] hover:shadow-lg hover:shadow-red-600/20 hover:-translate-y-0.5 transition-all group"
              >
                <Link to="/about">
                  Learn More About Us <ArrowRight className="size-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            )}
          </motion.div>

          {/* Right 4 Pillar Cards */}
          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
            {aboutCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 25, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
                className="group relative overflow-hidden rounded-2xl bg-white p-5 sm:p-6 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05),0_1px_3px_rgba(15,23,42,0.02)] hover:shadow-[0_20px_40px_-10px_rgba(215,25,42,0.12),0_4px_12px_rgba(15,23,42,0.04)] hover:border-red-200 transition-all duration-300 text-left flex flex-col justify-between"
              >
                {/* Top highlight bar on hover */}
                <div className="pointer-events-none absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#d7192a] via-rose-500 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Soft gradient ambient glow on hover */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-red-50/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Header with Icon, Labels and Watermark Index */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-red-50/90 border border-red-200/70 text-[#d7192a] shadow-2xs group-hover:bg-[#d7192a] group-hover:text-white group-hover:border-[#d7192a] group-hover:scale-105 transition-all duration-300">
                        {card.icon}
                      </div>
                      <div>
                        <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-widest text-[#d7192a]">
                          <span className="size-1 rounded-full bg-[#d7192a]" />
                          CORE PILLAR
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#d7192a] transition-colors leading-tight mt-0.5">
                          {card.title}
                        </h3>
                      </div>
                    </div>
                    <span className="text-xl font-black text-slate-200 group-hover:text-red-200/80 font-mono select-none transition-colors duration-300">
                      0{i + 1}
                    </span>
                  </div>

                  <p className="text-xs sm:text-[13px] leading-relaxed text-slate-600 group-hover:text-slate-700 transition-colors">
                    {card.desc}
                  </p>
                </div>

                {/* Bottom subtle progress line */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="h-[2px] w-6 bg-red-200/80 group-hover:w-16 group-hover:bg-[#d7192a] rounded-full transition-all duration-500" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 group-hover:text-[#d7192a] transition-colors">
                    Enterprise Focus
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Detailed View Sections (for /about) */}
        {detailed && (
          <div className="space-y-10 pt-6 border-t border-slate-200">
            {/* Core Values */}
            <div>
              <div className="max-w-xl text-left mb-6">
                <p className="eyebrow text-[#d7192a]">CORE VALUES</p>
                <h2 className="section-title mt-2">What Drives Our Work</h2>
                <p className="section-copy mt-2">
                  Our values shape every interaction, decision, and solution we deliver to global clients.
                </p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {coreValues.map((val, i) => (
                  <motion.article
                    key={val.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card p-6"
                  >
                    <div className="flex size-10 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-[#d7192a]">
                      <Sparkles className="size-5" />
                    </div>
                    <h3 className="mt-4 text-base font-bold text-slate-900">{val.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600">{val.desc}</p>
                  </motion.article>
                ))}
              </div>
            </div>

            {/* Milestones / Journey */}
            <div>
              <div className="max-w-xl text-left mb-6">
                <p className="eyebrow text-[#d7192a]">OUR JOURNEY</p>
                <h2 className="section-title mt-2">Milestones of Progress</h2>
                <p className="section-copy mt-2">
                  A legacy of continuous growth, technological innovation, and client partnerships since 2005.
                </p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {milestones.map((m, i) => (
                  <motion.div
                    key={m.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card p-6"
                  >
                    <span className="inline-block rounded-full bg-red-50 border border-red-200 px-3.5 py-1 text-xs font-bold text-[#d7192a]">
                      {m.year}
                    </span>
                    <h3 className="mt-3 text-base font-bold text-slate-900">{m.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{m.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export function Services({ full = false }: { full?: boolean }) {
  const serviceIcons = [
    <Bot key="bot" className="size-6 text-[#d7192a]" />,
    <Cloud key="cloud" className="size-6 text-[#d7192a]" />,
    <Code2 key="code" className="size-6 text-[#d7192a]" />,
    <Database key="db" className="size-6 text-[#d7192a]" />,
    <Globe key="globe" className="size-6 text-[#d7192a]" />,
    <ShieldCheck key="shield" className="size-6 text-[#d7192a]" />,
  ];

  return (
    <section id="services" className="section relative overflow-hidden bg-slate-50/70 text-slate-900 border-y border-slate-200/80 bg-grid-pattern">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(215,25,42,0.03),transparent_70%)]" />

      <div className="site-container relative z-10">
        <div className="mb-8 text-left">
          <p className="eyebrow text-[#d7192a]">TECHNOLOGY THAT WORKS FOR YOU</p>
          <h2 className="section-title mt-2">
            Modernize. Connect. <span className="text-[#d7192a]">Move forward.</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-4xl">
            Practical expertise across the platforms and applications your business depends on.
          </p>
        </div>

        {/* 6 Services Grid with 3D Tilt + Stagger */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard3D
              key={service.id}
              id={service.id}
              index={i}
              title={service.title}
              summary={service.summary}
              desc={service.desc}
              image={service.image}
              offers={service.offers}
              icon={serviceIcons[i % serviceIcons.length]}
              full={full}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function IndustriesSection() {
  const duplicatedIndustries = [...industries, ...industries, ...industries, ...industries];

  return (
    <section className="section relative overflow-hidden bg-white text-slate-900 bg-dot-pattern pt-2 sm:pt-3 pb-6 sm:pb-8">
      <div className="site-container relative z-10">
        <div className="mb-6 sm:mb-8 text-left">
          <span className="inline-block rounded-full bg-red-50/80 border border-red-200 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#d7192a]">
            INDUSTRIES WE SERVE
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
            Solutions for the Needs of <span className="text-[#d7192a]">Multiple Industries</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-4xl">
            Our expertise spans across diverse sectors, delivering tailored solutions that address unique industry challenges.
          </p>
        </div>
      </div>

      {/* Auto-scrolling continuous carousel track */}
      <div className="relative w-full overflow-hidden py-3">
        {/* Soft edge gradient masks - delicate narrow fade so cards are crisp and readable */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-8 sm:w-12 bg-gradient-to-r from-white/90 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-8 sm:w-12 bg-gradient-to-l from-white/90 to-transparent" />

        <div className="flex w-max animate-marquee-slow gap-6 items-stretch px-6">
          {duplicatedIndustries.map((ind, idx) => (
            <div
              key={`${ind.name}-${idx}`}
              className="group relative flex flex-col justify-between overflow-hidden card-diagonal bg-white p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-300 text-left w-[290px] sm:w-[340px] md:w-[370px] shrink-0 rounded-2xl"
            >
              <div>
                {/* Card Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden img-diagonal bg-slate-100 shadow-inner mb-4 rounded-xl">
                  <img
                    src={ind.image}
                    alt={ind.name}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-slate-950 group-hover:text-[#d7192a] transition-colors">
                  {ind.name}
                </h3>
                <p className="mt-2 text-xs sm:text-[13px] text-slate-900 font-medium leading-relaxed">
                  Enterprise-grade digital systems and tailored technology workflows engineered for {ind.name.toLowerCase()}.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyChooseUsSection() {
  return (
    <section className="section relative overflow-hidden bg-white text-slate-900 bg-dot-pattern pt-2 sm:pt-3">
      <div className="site-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mb-5 sm:mb-6 text-left"
        >
          <span className="inline-block rounded-full bg-red-50/80 border border-red-200 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#d7192a]">
            WHY CHOOSE US
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
            Your Success is Our <span className="text-[#d7192a]">Priority</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-4xl">
            Dedicated partnership, proven global delivery models, and dependable support engineered around your growth.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 items-stretch">
          {/* Left Handshake Card -> Slides in from Left to Right */}
          <motion.div
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="group lg:col-span-6 rounded-2xl border border-red-100/90 bg-white p-5 sm:p-6 lg:p-7 shadow-[0_4px_24px_rgba(215,25,42,0.03)] hover:border-red-300 hover:shadow-xl hover:shadow-red-500/10 flex flex-col justify-between h-full transition-all duration-300 text-left"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-100 border border-slate-100 shadow-inner mb-5">
              <img
                src="/why-choose-us-partnership.jpg"
                alt="We don't just deliver services — We build partnerships"
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
              <div className="absolute top-3.5 left-3.5 flex size-11 items-center justify-center rounded-xl bg-white/95 backdrop-blur-md text-[#d7192a] shadow-md border border-white/80">
                <Handshake className="size-6 text-[#d7192a] stroke-[1.8]" />
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#d7192a] leading-snug">
              We don’t just deliver services — We build partnerships.
            </h3>
          </motion.div>

          {/* Right 5 items -> Distributed evenly across full height to match image card length */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full py-1 gap-4 sm:gap-5">
            {whyChooseUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 70 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex gap-4 items-start"
              >
                <div className="flex size-7 sm:size-8 shrink-0 items-center justify-center rounded-full bg-red-50/80 border border-red-200 text-[#d7192a] mt-0.5 shadow-2xs">
                  <Check className="size-4 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                  {item.title === 'Global Technology Experience' ? (
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      <span className="inline-flex items-center gap-1 font-semibold text-slate-700 mr-1.5"><CountryFlag country="us" className="w-4 h-3 inline-block -mt-0.5" /> USA</span>,{' '}
                      <span className="inline-flex items-center gap-1 font-semibold text-slate-700 mr-1.5"><CountryFlag country="ca" className="w-4 h-3 inline-block -mt-0.5" /> Canada</span> and{' '}
                      <span className="inline-flex items-center gap-1 font-semibold text-slate-700 mr-1.5"><CountryFlag country="in" className="w-4 h-3 inline-block -mt-0.5" /> India</span> operations connecting
                      business context with technical and workforce needs.
                    </p>
                  ) : (
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function WorkWithSection() {
  const engagementMeta = [
    {
      icon: <Compass className="size-5" />,
      tag: 'Strategic Advisory',
      deliverable: 'Roadmap & technical scope',
    },
    {
      icon: <Layers className="size-5" />,
      tag: 'Scoped Execution',
      deliverable: 'Milestones & clear handover',
    },
    {
      icon: <Users className="size-5" />,
      tag: 'Talent Augmentation',
      deliverable: 'Dedicated niche specialists',
    },
    {
      icon: <RefreshCw className="size-5" />,
      tag: 'Managed Operations',
      deliverable: 'Ongoing SLAs & optimization',
    },
  ];

  return (
    <section id="talent" className="section relative overflow-hidden bg-white text-slate-900 border-t border-slate-200/80 bg-dot-pattern">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(215,25,42,0.03),transparent_70%)]" />
      <div className="site-container relative z-10">
        <div className="mb-8 sm:mb-10 text-left">
          <span className="inline-block rounded-full bg-red-50/80 border border-red-200 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#d7192a]">
            WORK WITH TP IT GROUP
          </span>
          <h2 className="section-title mt-3">
            The right engagement for <span className="text-[#d7192a]">your next move.</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-4xl">
            Flexible collaboration structures built to adapt to your enterprise milestones and talent demands.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {engagementModels.map((item, i) => {
            const meta = engagementMeta[i % engagementMeta.length];
            return (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 25, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 p-6 shadow-sm hover:border-red-300 hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300 text-left"
              >
                {/* Top Accent Strip that expands on hover */}
                <div className="absolute top-0 left-0 h-1 w-12 bg-gradient-to-r from-[#d7192a] to-red-400 group-hover:w-full transition-all duration-500 ease-out" />

                <div>
                  {/* Top Bar: Icon Badge & Number Monogram */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-red-50/90 border border-red-100 text-[#d7192a] shadow-xs group-hover:bg-[#d7192a] group-hover:text-white transition-all duration-300">
                      {meta.icon}
                    </div>
                    <span className="inline-flex items-center justify-center font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100/80 text-slate-700 border border-slate-200/60 group-hover:bg-red-50 group-hover:text-[#d7192a] group-hover:border-red-100 transition-colors">
                      {item.number}
                    </span>
                  </div>

                  {/* Category Pill Tag */}
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#d7192a] block">
                    {meta.tag}
                  </span>

                  {/* Title */}
                  <h3 className="mt-1.5 text-lg font-bold text-slate-900 group-hover:text-[#d7192a] transition-colors leading-tight">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-slate-600">
                    {item.desc}
                  </p>
                </div>

                {/* Footer Highlight */}
                <div className="mt-6 pt-3.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-[#d7192a] shrink-0" />
                    <span>{meta.deliverable}</span>
                  </span>
                  <span className="flex size-6 items-center justify-center rounded-full bg-slate-50 border border-slate-200 text-slate-400 group-hover:bg-[#d7192a] group-hover:text-white group-hover:border-[#d7192a] group-hover:translate-x-0.5 transition-all">
                    <ArrowRight className="size-3" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ProvenApproachSection() {
  const processIcons = [MessageSquare, Lightbulb, Rocket, RefreshCw];

  return (
    <section className="section relative overflow-hidden bg-slate-50/70 text-slate-900 border-y border-slate-200/80 bg-grid-pattern">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] lg:w-[900px] h-[300px] bg-red-500/[0.04] blur-[100px] rounded-full" />

      <div className="site-container relative z-10">
        <div className="mb-10 text-left">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-50/90 border border-red-200/80 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#d7192a] shadow-xs backdrop-blur-sm">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d7192a] opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-[#d7192a]" />
            </span>
            OUR WORK PROCESS
          </div>
          <h2 className="mt-3.5 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
            A Clear Approach to <span className="text-[#d7192a]">Delivering Excellence</span>
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm text-slate-600 max-w-4xl leading-relaxed">
            Agree on the priorities, review progress together and validate what is delivered against your business needs.
          </p>
        </div>

        <div className="relative">
          {/* Subtle desktop connector track connecting the 4 phases */}
          <div className="hidden lg:block absolute top-9 left-16 right-16 h-[2px] bg-gradient-to-r from-red-500/20 via-red-500/40 to-red-500/20 pointer-events-none z-0" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
            {provenApproach.map((step, i) => {
              const IconComponent = processIcons[i % processIcons.length];
              const progressPct = ((i + 1) / provenApproach.length) * 100;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 25, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ delay: i * 0.1, duration: 0.45 }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 p-6 sm:p-7 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] backdrop-blur-xl transition-all duration-300 hover:border-red-400/80 hover:shadow-[0_20px_40px_-15px_rgba(215,25,42,0.15)]"
                >
                  {/* Luxury Top Accent Line that highlights on hover */}
                  <div className="absolute inset-x-0 top-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#d7192a] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Architectural Watermark Step Number */}
                  <span className="pointer-events-none absolute -bottom-4 -right-1 font-mono text-7xl sm:text-8xl font-black tracking-tighter text-slate-100/70 select-none transition-all duration-500 group-hover:text-red-500/[0.08] group-hover:scale-105">
                    {step.number}
                  </span>

                  {/* Ambient corner glow on hover */}
                  <div className="pointer-events-none absolute -top-16 -right-16 size-36 rounded-full bg-red-500/5 blur-2xl group-hover:bg-red-500/10 transition-colors duration-500" />

                  <div>
                    {/* Header: Step Pill + Modern Icon Badge */}
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1 text-[11px] font-mono font-bold tracking-wider text-white shadow-xs group-hover:bg-[#d7192a] transition-colors duration-300">
                        <span className="size-1.5 rounded-full bg-red-400 group-hover:bg-white animate-pulse" />
                        <span>STEP {step.number}</span>
                      </div>
                      <div className="relative flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-red-50 to-red-100/60 border border-red-200/70 text-[#d7192a] shadow-xs transition-all duration-300 group-hover:scale-110 group-hover:bg-[#d7192a] group-hover:text-white group-hover:border-[#d7192a] group-hover:shadow-md group-hover:shadow-red-500/25">
                        <IconComponent className="size-5 transition-transform duration-300 group-hover:scale-105" />
                      </div>
                    </div>

                    {/* Step Title & Description */}
                    <h3 className="mt-5 text-base sm:text-lg font-bold tracking-tight text-slate-900 group-hover:text-[#d7192a] transition-colors duration-200 relative z-10">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-[13px] leading-relaxed text-slate-600 relative z-10">
                      {step.desc}
                    </p>
                  </div>

                  {/* Bottom: Milestone Tracker & Mini Progress Bar */}
                  <div className="mt-6 pt-4 border-t border-slate-100/90 relative z-10">
                    <div className="flex items-center justify-between text-[11px] font-medium text-slate-400">
                      <span className="flex items-center gap-1.5 font-mono text-slate-500 group-hover:text-slate-700 transition-colors">
                        <span className="size-1.5 rounded-full bg-[#d7192a]" />
                        Phase {step.number}
                      </span>
                      <span className="flex items-center gap-1 text-slate-400 group-hover:text-[#d7192a] transition-colors">
                        <span className="text-[10px] tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity font-semibold">Flow</span>
                        <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>

                    <div className="mt-2 h-1 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-red-400 to-[#d7192a] transition-all duration-500"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Clients({ full = false }: { full?: boolean }) {
  const [clientList, setClientList] = useState(clientLogos);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/clients')
      .then((r) => r.json())
      .then((data) => {
        if (isMounted && data.success && Array.isArray(data.clients) && data.clients.length > 0) {
          setClientList(data.clients);
        }
      })
      .catch(() => { });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="clients" className="section relative overflow-hidden bg-slate-50/70 text-slate-900 border-y border-slate-200/80 bg-grid-pattern">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(215,25,42,0.04),transparent_60%)]" />
      <div className="site-container relative z-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div className="text-left">
            <p className="eyebrow text-[#d7192a]">CLIENT SUCCESS &amp; EXCELLENCE</p>
            <h2 className="section-title mt-2">Trusted by Fortune 500 &amp; Industry Leaders.</h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 lg:whitespace-nowrap">
              Partnering with world-class organizations to deliver cutting-edge IT excellence, digital engineering, and workforce solutions.
            </p>
          </div>
          {!full && (
            <Button asChild variant="link" className="shrink-0 px-0 text-xs font-bold text-[#d7192a] hover:text-[#b91c1c]">
              <Link to="/clients">
                View all {clientList.length}+ partners <ArrowRight className="size-4 ml-1" />
              </Link>
            </Button>
          )}
        </div>

        {/* Infinite Logo Marquee */}
        <ClientMarquee />

        {full && (
          <div className="mt-12 pt-8 border-t border-slate-200/90 text-left">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#d7192a]">
              ENTERPRISE CLIENT NETWORK
            </p>
            <h3 className="mt-2 text-xl sm:text-2xl font-extrabold text-slate-900">
              Featured Client Partners
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              Delivering high-impact technology and workforce support to world-class enterprises.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
              {clientList.map((client) => (
                <div
                  key={client.name}
                  className="group flex h-24 sm:h-28 items-center justify-center rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs transition-all duration-300 hover:border-red-300 hover:shadow-md"
                >
                  <img
                    src={client.src}
                    alt={client.name}
                    className="max-h-12 sm:max-h-14 max-w-[85%] object-contain contrast-125 transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export function Careers({ full = false }: { full?: boolean }) {
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedJobType, setSelectedJobType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [jobsList, setJobsList] = useState(careersJobs);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/careers')
      .then((r) => r.json())
      .then((data) => {
        if (isMounted && data.success && Array.isArray(data.careers) && data.careers.length > 0) {
          setJobsList(
            data.careers.map((c: any) => ({
              title: c.title,
              dept: c.dept,
              location: c.location,
              type: c.type || 'Full-Time',
              experience: c.experience || '3+ years',
              description: c.description || '',
            }))
          );
        }
      })
      .catch(() => { });

    return () => {
      isMounted = false;
    };
  }, []);

  const departments = [
    'All',
    'Cloud Technology',
    'DevOps & Reliability',
    'ERP & SAP',
    'GenAI & AI',
    'Data Engineering & Analytics',
    'Software Engineering',
    'QA & Testing',
    'Business Analysis & Agile',
    'Security & Networking',
    'Healthcare & Hospital Services',
    'Manufacturing & Production',
    'Service & Business Operations',
  ];

  const filteredJobs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const results = jobsList.filter((job: any) => {
      // 1. Search query filter (matches role title, department, location, code, or distinct skill keywords)
      if (q) {
        const title = (job.title || '').toLowerCase();
        const dept = (job.dept || '').toLowerCase();
        const location = (job.location || '').toLowerCase();
        const code = (job.code || '').toLowerCase();
        const country = (job.country || '').toLowerCase();

        // High-precision matches: Job Title, Department, Location, Job Code, Country
        const isDirectMatch =
          title.includes(q) ||
          dept.includes(q) ||
          location.includes(q) ||
          code.includes(q) ||
          country.includes(q);

        if (isDirectMatch) return true;

        // Skill keywords in description: only match words starting with or exact matching query
        const descWords = (job.desc || job.description || '')
          .toLowerCase()
          .split(/[^a-z0-9+#.-]+/i);

        const isWordMatch =
          q.length <= 3
            ? descWords.some((w: string) => w.startsWith(q))
            : descWords.some((w: string) => w.includes(q));

        if (!isWordMatch) return false;
      }

      // 2. Country filter
      if (selectedCountry !== 'all') {
        const c = (job.countryCode || '').toLowerCase();
        if (c && c !== selectedCountry.toLowerCase()) return false;
      }

      // 3. Department / Discipline filter
      if (selectedDept !== 'All') {
        if (job.dept !== selectedDept) return false;
      }

      // 4. Job type filter
      if (selectedJobType !== 'All') {
        if ((job.type || '').toLowerCase() !== selectedJobType.toLowerCase()) return false;
      }

      return true;
    });

    // When searching, prioritize direct Title & Role matches first
    if (q) {
      return results.sort((a: any, b: any) => {
        const aTitle = (a.title || '').toLowerCase();
        const bTitle = (b.title || '').toLowerCase();

        const aTitleStarts = aTitle.startsWith(q) || aTitle.split(' ').some((w: string) => w.startsWith(q));
        const bTitleStarts = bTitle.startsWith(q) || bTitle.split(' ').some((w: string) => w.startsWith(q));
        if (aTitleStarts && !bTitleStarts) return -1;
        if (!aTitleStarts && bTitleStarts) return 1;

        const aTitleHas = aTitle.includes(q);
        const bTitleHas = bTitle.includes(q);
        if (aTitleHas && !bTitleHas) return -1;
        if (!aTitleHas && bTitleHas) return 1;

        return 0;
      });
    }

    return results;
  }, [jobsList, searchQuery, selectedCountry, selectedDept, selectedJobType]);

  return (
    <section className="section relative overflow-hidden bg-white text-slate-900 bg-dot-pattern">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(215,25,42,0.04),transparent_60%)]" />
      <div className="site-container relative z-10 space-y-5 sm:space-y-6">
        {/* Open Positions Section */}
        <div className="space-y-4 sm:space-y-5">
          <div>
            <p className="eyebrow text-[#d7192a]">OPEN POSITIONS</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-1 sm:mt-1.5">Find Your Next Challenge</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Explore current engineering, consulting, and management roles across USA, India, and Canada.
            </p>
          </div>

          {/* Roles Statistics */}
          <div>
            <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-xl">
              <button
                type="button"
                onClick={() => setSelectedCountry('us')}
                className="text-left group cursor-pointer focus:outline-none"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight group-hover:text-[#d7192a] transition leading-none">
                  <AutoIncrementNumber end={680} />
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-600">
                  <span className="font-mono text-[10px] font-bold text-slate-500 uppercase">US</span>
                  <span className="group-hover:underline">USA roles</span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setSelectedCountry('ca')}
                className="text-left group cursor-pointer focus:outline-none"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight group-hover:text-[#d7192a] transition leading-none">
                  <AutoIncrementNumber end={204} />
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-600">
                  <span className="font-mono text-[10px] font-bold text-slate-500 uppercase">CA</span>
                  <span className="group-hover:underline">Canada roles</span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setSelectedCountry('in')}
                className="text-left group cursor-pointer focus:outline-none"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight group-hover:text-[#d7192a] transition leading-none">
                  <AutoIncrementNumber end={136} />
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-600">
                  <span className="font-mono text-[10px] font-bold text-slate-500 uppercase">IN</span>
                  <span className="group-hover:underline">India roles</span>
                </div>
              </button>
            </div>
          </div>

          {/* Explore Open Roles Search & Filter Bar */}
          <div id="explore-roles" className="pt-3.5 space-y-3 border-t border-slate-200/80">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#d7192a]">
                  FIND YOUR SPECIALTY
                </p>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">
                  Explore Open Roles
                </h3>
              </div>
              <div className="text-xs text-slate-500 font-medium">
                {jobsList.length} open roles · {departments.length - 1} disciplines
              </div>
            </div>

            {/* Filter Controls Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2.5 items-center">
              {/* 1. Search Input */}
              <div className="relative lg:col-span-4">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Job title, skill or city"
                  className="w-full h-10 pl-9 pr-8 rounded-full border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 shadow-xs"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
              </div>

              {/* 2. Country Select */}
              <div className="relative lg:col-span-3">
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full h-10 pl-3.5 pr-8 rounded-full border border-slate-200 bg-white text-xs sm:text-sm font-medium text-slate-800 appearance-none focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 shadow-xs cursor-pointer"
                >
                  <option value="all">All countries</option>
                  <option value="us">us USA (680)</option>
                  <option value="ca">CA Canada (204)</option>
                  <option value="in">IN India (136)</option>
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
              </div>

              {/* 3. Disciplines Select */}
              <div className="relative lg:col-span-3">
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="w-full h-10 pl-3.5 pr-8 rounded-full border border-slate-200 bg-white text-xs sm:text-sm font-medium text-slate-800 appearance-none focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 shadow-xs cursor-pointer"
                >
                  <option value="All">All disciplines</option>
                  {departments
                    .filter((d) => d !== 'All')
                    .map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
              </div>

              {/* 4. Job Types Select */}
              <div className="relative lg:col-span-2">
                <select
                  value={selectedJobType}
                  onChange={(e) => setSelectedJobType(e.target.value)}
                  className="w-full h-10 pl-3.5 pr-8 rounded-full border border-slate-200 bg-white text-xs sm:text-sm font-medium text-slate-800 appearance-none focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 shadow-xs cursor-pointer"
                >
                  <option value="All">All job types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Contract">Contract</option>
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Filter Summary & Reset Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 pt-0.5">
              <span>
                {filteredJobs.length === 0 ? (
                  <span className="text-red-600 font-semibold">0 matching roles found</span>
                ) : (
                  <>
                    Showing 1–{filteredJobs.length} of{' '}
                    {searchQuery || selectedCountry !== 'all' || selectedDept !== 'All' || selectedJobType !== 'All'
                      ? `${filteredJobs.length} matching roles`
                      : `${jobsList.length} open roles`}
                  </>
                )}
              </span>

              {(searchQuery || selectedCountry !== 'all' || selectedDept !== 'All' || selectedJobType !== 'All') && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCountry('all');
                    setSelectedDept('All');
                    setSelectedJobType('All');
                  }}
                  className="font-semibold text-slate-600 hover:text-[#d7192a] transition cursor-pointer"
                >
                  Reset filters
                </button>
              )}
            </div>
          </div>


          {/* Job Openings Grid - 3 Column Layout matching Image 2 */}
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50/70">
              <p className="text-base font-semibold text-slate-800">No matching roles found</p>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                No roles match &quot;{searchQuery}&quot; with the selected filters. Try searching by job title (e.g. AWS, Cybersecurity, DevOps) or reset filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCountry('all');
                  setSelectedDept('All');
                  setSelectedJobType('All');
                }}
                className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#d7192a] text-white hover:bg-[#b01422] transition shadow-xs cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredJobs.map((job, idx) => {
                const code = (job as any).code || `USA-000${idx + 1}`;
                const countryCode = (job as any).countryCode || 'us';
                const country = (job as any).country || 'USA';
                const experience = (job as any).experience || '5+ years';
                const roleType = (job as any).sampleType || 'Open role';

                return (
                  <article
                    key={job.title + idx}
                    className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm hover:border-red-300 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Row: Category in red, Open role on right in muted */}
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-[#d7192a] tracking-wide">
                          {job.dept}
                        </span>
                        <span className="text-slate-400 font-medium">
                          {roleType}
                        </span>
                      </div>

                      {/* Job Title */}
                      <h4 className="mt-2.5 text-base sm:text-lg font-bold text-slate-900 leading-snug">
                        {job.title}
                      </h4>

                      {/* Location Row */}
                      <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-600">
                        <MapPin className="size-3.5 text-slate-500 shrink-0" />
                        <span>{job.location}</span>
                      </div>

                      {/* Contract / Full-time + Experience Row */}
                      <div className="mt-1.5 flex items-center gap-4 text-xs text-slate-600">
                        <span className="flex items-center gap-1.5">
                          <Briefcase className="size-3.5 text-slate-400 shrink-0" />
                          <span>{job.type || 'Full-time'}</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="size-3.5 text-slate-400 shrink-0" />
                          <span>{experience}</span>
                        </span>
                      </div>

                      {/* Description Paragraph */}
                      <p className="mt-3 text-xs leading-relaxed text-slate-600">
                        {(job as any).desc || (job as any).description}
                      </p>
                    </div>

                    {/* Card Footer: Country Code & Apply Now button */}
                    <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-slate-500 font-mono text-[11px]">
                        <span className="text-slate-400">{countryCode}</span>
                        <span>{country} · {code}</span>
                      </div>

                      <Button
                        asChild
                        size="sm"
                        className="rounded-xl bg-[#d7192a] hover:bg-[#b91c1c] text-white font-bold text-xs shadow-md shadow-red-500/20"
                      >
                        <a
                          href={`mailto:${companyInfo.email}?subject=Application for ${encodeURIComponent(job.title)} (${encodeURIComponent(job.location)})`}
                        >
                          Apply Now <ArrowUpRight className="size-3.5 ml-1" />
                        </a>
                      </Button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* General Application Banner */}
          <div className="glass-card p-6 sm:p-10 text-center border-slate-200/90 bg-gradient-to-b from-red-50/30 to-white shadow-lg">
            <h4 className="text-2xl font-bold text-slate-900">Don’t see the right fit?</h4>
            <p className="mx-auto mt-2 max-w-lg text-xs sm:text-sm text-slate-600">
              Send us your resume anyway and we will keep you in mind for future roles across our global teams.
            </p>
            <Button
              asChild
              className="mt-5 h-11 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 shadow-md"
            >
              <a href={`mailto:${companyInfo.email}?subject=General%20Application%20-%20TP%20IT%20Group%20LLC`}>
                Send General Application <Mail className="size-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </div >
    </section >
  );
}

export function Blogs({ full = false }: { full?: boolean }) {
  return (
    <section className="section relative overflow-hidden bg-slate-50/70 text-slate-900 border-t border-slate-200/80 bg-grid-pattern">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(215,25,42,0.04),transparent_60%)]" />
      <div className="site-container relative z-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow">INSIGHTS &amp; PERSPECTIVES</p>
            <h2 className="section-title mt-2">Industry Insights &amp; Innovation.</h2>
          </div>
          {!full && (
            <Button asChild variant="link" className="px-0 text-xs font-bold text-[#d7192a] hover:text-[#b91c1c]">
              <Link to="/blogs">
                View all articles <ArrowRight className="size-4 ml-1" />
              </Link>
            </Button>
          )}
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {articles.map((article) => (
            <article className="glass-card overflow-hidden flex flex-col justify-between bg-white/95 border-slate-200/90 hover:border-red-300 hover:shadow-xl transition-all" key={article.slug}>
              <div>
                <Link to="/blogs/$slug" params={{ slug: article.slug }}>
                  <img
                    className="editorial-image h-44 w-full object-cover"
                    src={article.image}
                    alt={article.title}
                    width={1536}
                    height={1024}
                    loading="lazy"
                  />
                </Link>
                <div className="p-5">
                  <p className="text-[10px] font-bold tracking-wider text-[#d7192a] uppercase">
                    {article.category}
                  </p>
                  <h3 className="mt-2 text-base font-bold text-slate-900 leading-snug hover:text-[#d7192a] transition">
                    <Link to="/blogs/$slug" params={{ slug: article.slug }}>
                      {article.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 line-clamp-3">
                    {article.summary}
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <Button asChild variant="link" className="h-auto p-0 text-xs font-bold text-[#d7192a] hover:text-[#b91c1c]">
                  <Link to="/blogs/$slug" params={{ slug: article.slug }}>
                    Read Article <ArrowUpRight className="size-3.5 ml-1" />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

interface ContactFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export function ContactForm() {
  const [notice, setNotice] = useState(false);
  const [loading, setLoading] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Cloud Migration & Infrastructure',
    message: '',
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Field validation rules
  const validateField = (field: string, value: string): string | undefined => {
    switch (field) {
      case 'name': {
        const trimmed = value.trim();
        if (!trimmed) return 'Full name is required.';
        if (/\d/.test(trimmed)) return 'Full name cannot contain numbers.';
        if (!/^[a-zA-Z\s.'-]+$/.test(trimmed)) {
          return 'Full name can only contain letters, spaces, and hyphens.';
        }
        if (trimmed.length < 2) return 'Full name must be at least 2 characters.';
        return undefined;
      }
      case 'email': {
        const trimmed = value.trim();
        if (!trimmed) return 'Corporate email is required.';
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(trimmed)) {
          return 'Please enter a valid email address (e.g. name@company.com).';
        }
        return undefined;
      }
      case 'phone': {
        const trimmed = value.trim();
        if (!trimmed) return undefined; // Optional field
        const digitsOnly = trimmed.replace(/\D/g, '');
        if (digitsOnly.length < 10) {
          return 'Phone number must have at least 10 digits.';
        }
        if (digitsOnly.length > 15) {
          return 'Phone number cannot exceed 15 digits.';
        }
        return undefined;
      }
      case 'message': {
        const trimmed = value.trim();
        if (!trimmed) return 'Project requirements are required.';
        if (trimmed.length < 10) {
          return 'Please describe your project in at least 10 characters.';
        }
        return undefined;
      }
      default:
        return undefined;
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, (formData as any)[field] || '');
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
    if (notice) setNotice(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: ContactFormErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      phone: validateField('phone', formData.phone),
      message: validateField('message', formData.message),
    };

    setTouched({ name: true, email: true, phone: true, message: true });
    setErrors(newErrors);

    // Stop if any errors
    if (Object.values(newErrors).some(Boolean)) {
      return;
    }

    setLoading(true);

    // Build WhatsApp message format with all captured details
    const messageLines = [
      `*New Project Inquiry - TP IT Group*`,
      ``,
      `*Full Name:* ${formData.name.trim()}`,
      `*Corporate Email:* ${formData.email.trim()}`,
      formData.phone.trim() ? `*Phone Number:* ${formData.phone.trim()}` : null,
      `*Service Requirement:* ${formData.service}`,
      ``,
      `*Project Objectives & Requirements:*`,
      `${formData.message.trim()}`,
    ].filter(Boolean).join('\n');

    // WhatsApp phone number: +1 (814) 844-1362 -> 18148441362
    const targetWhatsappUrl = `https://wa.me/18148441362?text=${encodeURIComponent(messageLines)}`;
    setWhatsappUrl(targetWhatsappUrl);

    try {
      // Background attempt to persist to API if available (silent fallback if database is offline)
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          subject: formData.service,
          message: formData.message.trim(),
        }),
      }).catch(() => { });

      setNotice(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'Cloud Migration & Infrastructure',
        message: '',
      });
      setTouched({});
      setErrors({});

      // Redirect / open WhatsApp directly
      if (typeof window !== 'undefined') {
        const opened = window.open(targetWhatsappUrl, '_blank');
        if (!opened) {
          window.location.href = targetWhatsappUrl;
        }
      }
    } catch {
      setNotice(true);
      if (typeof window !== 'undefined') {
        window.location.href = targetWhatsappUrl;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            Full Name *
          </label>
          <input
            name="name"
            autoComplete="name"
            value={formData.name}
            onBlur={() => handleBlur('name')}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="e.g. John Doe"
            className={`contact-field w-full ${touched.name && errors.name
              ? 'border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500'
              : ''
              }`}
          />
          {touched.name && errors.name && (
            <p className="mt-1 text-[11px] font-medium text-red-600 flex items-center gap-1">
              <AlertCircle className="size-3 shrink-0" />
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            Corporate Email *
          </label>
          <input
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onBlur={() => handleBlur('email')}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="john@company.com"
            className={`contact-field w-full ${touched.email && errors.email
              ? 'border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500'
              : ''
              }`}
          />
          {touched.email && errors.email && (
            <p className="mt-1 text-[11px] font-medium text-red-600 flex items-center gap-1">
              <AlertCircle className="size-3 shrink-0" />
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            Phone Number <span className="text-[10px] text-slate-400 font-normal">(10-15 digits)</span>
          </label>
          <input
            name="phone"
            type="tel"
            inputMode="numeric"
            maxLength={18}
            autoComplete="tel"
            value={formData.phone}
            onBlur={() => handleBlur('phone')}
            onKeyDown={(e) => {
              if (
                [
                  'Backspace',
                  'Delete',
                  'Tab',
                  'Escape',
                  'Enter',
                  'ArrowLeft',
                  'ArrowRight',
                  'Home',
                  'End',
                ].includes(e.key) ||
                (e.ctrlKey && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase())) ||
                (e.metaKey && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase()))
              ) {
                return;
              }
              if (!/^[0-9+]$/.test(e.key)) {
                e.preventDefault();
              }
            }}
            onChange={(e) => {
              const onlyNums = e.target.value
                .replace(/[^\d+]/g, '')
                .replace(/(?!^)\+/g, '')
                .slice(0, 16);
              handleChange('phone', onlyNums);
            }}
            placeholder="+1 (814) 844-1361"
            className={`contact-field w-full ${touched.phone && errors.phone
              ? 'border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500'
              : ''
              }`}
          />
          {touched.phone && errors.phone && (
            <p className="mt-1 text-[11px] font-medium text-red-600 flex items-center gap-1">
              <AlertCircle className="size-3 shrink-0" />
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            Service Requirement
          </label>
          <select
            name="service"
            value={formData.service}
            onChange={(e) => handleChange('service', e.target.value)}
            className="contact-field w-full bg-white text-slate-900"
          >
            <option value="Cloud Migration & Infrastructure">Cloud Computing &amp; Infrastructure</option>
            <option value="ERP & SAP Solutions">ERP &amp; SAP Solutions</option>
            <option value="Custom Application Development">Custom Application Development</option>
            <option value="App Maintenance & Support">Application Maintenance &amp; Support</option>
            <option value="Workforce & Staffing Solutions">Workforce &amp; Staffing Solutions</option>
            <option value="General Consultation">General Consultation</option>
          </select>
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-slate-700 block mb-1">
          Project Objectives &amp; Requirements *
        </label>
        <textarea
          name="message"
          rows={3}
          value={formData.message}
          onBlur={() => handleBlur('message')}
          onChange={(e) => handleChange('message', e.target.value)}
          placeholder="Please describe your digital goals, timeline, and technical scope..."
          className={`contact-field w-full resize-y ${touched.message && errors.message
            ? 'border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500'
            : ''
            }`}
        />
        {touched.message && errors.message && (
          <p className="mt-1 text-[11px] font-medium text-red-600 flex items-center gap-1">
            <AlertCircle className="size-3 shrink-0" />
            {errors.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="h-11 w-fit rounded-xl bg-[#d7192a] hover:bg-[#b91c1c] px-7 text-xs font-bold text-white shadow-md shadow-red-500/20 cursor-pointer disabled:opacity-60"
      >
        {loading ? (
          'Submitting...'
        ) : (
          <>
            Submit Request <ArrowUpRight className="size-4 ml-1" />
          </>
        )}
      </Button>

      {notice && (
        <div role="status" className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-xs text-emerald-800 space-y-2.5">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="size-4.5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>Thank you!</strong> Your details have been submitted and we are redirecting you to WhatsApp (+1 814 844-1362).
            </div>
          </div>
          {whatsappUrl && (
            <div className="pt-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs transition shadow-xs"
              >
                Open WhatsApp Chat <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          )}
        </div>
      )}
    </form>
  );
}

export function OfficeLocationsMapCard() {
  const [activeOffice, setActiveOffice] = useState<'usa' | 'canada' | 'india' | 'all'>('usa');

  return (
    <div className="glass-card rounded-2xl border border-slate-200/90 bg-white/95 p-4 sm:p-5 shadow-sm hover:border-red-300 hover:shadow-md transition-all text-left">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#d7192a]">
            FIND OUR OFFICES
          </span>
          <h3 className="text-base font-bold text-slate-900 leading-tight">
            Interactive Office Locations
          </h3>
        </div>

        {/* Tab Switcher */}
        <div className="inline-flex rounded-xl bg-slate-100 p-0.5 border border-slate-200/80 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveOffice('usa')}
            className={`px-2.5 py-1 rounded-lg transition-all ${activeOffice === 'usa'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
              }`}
          >
            USA
          </button>
          <button
            type="button"
            onClick={() => setActiveOffice('canada')}
            className={`px-2.5 py-1 rounded-lg transition-all ${activeOffice === 'canada'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
              }`}
          >
            Canada
          </button>
          <button
            type="button"
            onClick={() => setActiveOffice('india')}
            className={`px-2.5 py-1 rounded-lg transition-all ${activeOffice === 'india'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
              }`}
          >
            India
          </button>
          <button
            type="button"
            onClick={() => setActiveOffice('all')}
            className={`px-2.5 py-1 rounded-lg transition-all ${activeOffice === 'all'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
              }`}
          >
            All
          </button>
        </div>
      </div>

      {/* USA Office View */}
      {(activeOffice === 'usa' || activeOffice === 'all') && (
        <div className={activeOffice === 'all' ? 'mb-4 pb-4 border-b border-slate-100' : ''}>
          <div className="flex items-center justify-between mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900 text-white font-mono text-[10px] font-bold">
              <span className="size-1.5 rounded-full bg-red-500 animate-pulse" /> USA HEADQUARTERS
            </span>
            <span className="text-[11px] font-semibold text-slate-500">Wilmington, Delaware</span>
          </div>

          <h4 className="text-sm font-bold text-slate-900">TP IT GROUP LLC</h4>
          <div className="mt-1 flex items-start gap-1.5 text-xs text-slate-600 leading-relaxed">
            <MapPin className="size-3.5 shrink-0 text-[#d7192a] mt-0.5" />
            <div>
              <span className="font-bold text-slate-800">USA Office address: </span>
              <span>1000 N. West Street, Suite 1200, Wilmington, Delaware, 19801, United States of America.</span>
            </div>
          </div>

          <div className="relative mt-2.5 h-[135px] sm:h-[145px] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-inner">
            <iframe
              title="TP IT GROUP LLC USA Office Map"
              src="https://maps.google.com/maps?q=1000+N.+West+Street,+Suite+1200,+Wilmington,+Delaware,+19801&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="h-full w-full border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>

          <div className="mt-2 flex items-center justify-between text-xs">
            <a
              href="https://maps.google.com/?q=1000+N+West+Street+Suite+1200+Wilmington+Delaware+19801"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-[#d7192a] hover:text-[#b91c1c] transition-colors"
            >
              Open in Google Maps <ArrowUpRight className="size-3.5" />
            </a>
            <span className="text-[11px] text-slate-400 font-mono">19801, USA</span>
          </div>
        </div>
      )}

      {/* Canada Office View */}
      {(activeOffice === 'canada' || activeOffice === 'all') && (
        <div className={activeOffice === 'all' ? 'mb-4 pb-4 border-b border-slate-100' : ''}>
          <div className="flex items-center justify-between mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900 text-white font-mono text-[10px] font-bold">
              <span className="size-1.5 rounded-full bg-red-500 animate-pulse" /> CANADA DELIVERY HUB
            </span>
            <span className="text-[11px] font-semibold text-slate-500">Ontario, Canada</span>
          </div>

          <h4 className="text-sm font-bold text-slate-900">🇨🇦 Canada — TP IT Group</h4>
          <div className="mt-1 flex items-start gap-1.5 text-xs text-slate-600 leading-relaxed">
            <MapPin className="size-3.5 shrink-0 text-[#d7192a] mt-0.5" />
            <div>
              <span className="font-bold text-slate-800">Address: </span>
              <span>Ontario, Canada</span>
            </div>
          </div>
          <div className="mt-1.5 flex items-center gap-1.5 text-slate-600">
            <Phone className="size-4 shrink-0 text-[#d7192a]" />
            <a
              href="tel:+18148441362"
              className="text-[#d7192a] font-extrabold hover:underline font-mono text-sm sm:text-base tracking-wide"
            >
              +1 (814) 844-1362
            </a>
          </div>

          <div className="relative mt-2.5 h-[135px] sm:h-[145px] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-inner">
            <iframe
              title="TP IT GROUP Canada Office Map"
              src="https://maps.google.com/maps?q=Ontario+Canada&t=&z=10&ie=UTF8&iwloc=&output=embed"
              className="h-full w-full border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>

          <div className="mt-2 flex items-center justify-between text-xs">
            <a
              href="https://maps.google.com/?q=Ontario+Canada"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-[#d7192a] hover:text-[#b91c1c] transition-colors"
            >
              Open in Google Maps <ArrowUpRight className="size-3.5" />
            </a>
            <span className="text-[11px] text-slate-400 font-mono">Ontario, Canada</span>
          </div>
        </div>
      )}

      {/* India Office View */}
      {(activeOffice === 'india' || activeOffice === 'all') && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900 text-white font-mono text-[10px] font-bold">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" /> INDIA CORPORATE HUB
            </span>
            <span className="text-[11px] font-semibold text-slate-500">Hyderabad, Telangana</span>
          </div>

          <h4 className="text-sm font-bold text-slate-900">TP IT GROUP PVT LTD</h4>
          <div className="mt-1 flex items-start gap-1.5 text-xs text-slate-600 leading-relaxed">
            <MapPin className="size-3.5 shrink-0 text-[#d7192a] mt-0.5" />
            <div>
              <span className="font-bold text-slate-800">Address: </span>
              <span>13th Floor, Manjeera Trinity Corporate, Unit No. 12A04, next to Lulu Mall, Kukatpally Housing Board Colony, K P H B Phase 3, Kukatpally, Hyderabad, Telangana 500072</span>
            </div>
          </div>

          <div className="relative mt-2.5 h-[135px] sm:h-[145px] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-inner">
            <iframe
              title="TP IT GROUP PVT LTD India Office Map"
              src="https://maps.google.com/maps?q=Manjeera+Trinity+Corporate+Kukatpally+Hyderabad+Telangana+500072&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="h-full w-full border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>

          <div className="mt-2 flex items-center justify-between text-xs">
            <a
              href="https://maps.google.com/?q=Manjeera+Trinity+Corporate+Kukatpally+Hyderabad+Telangana+500072"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-[#d7192a] hover:text-[#b91c1c] transition-colors"
            >
              Open in Google Maps <ArrowUpRight className="size-3.5" />
            </a>
            <span className="text-[11px] text-slate-400 font-mono">500072, India</span>
          </div>
        </div>
      )}
    </div>
  );
}

export function Contact() {
  return (
    <section className="section relative overflow-hidden bg-white text-slate-900 bg-dot-pattern">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_20%_20%,rgba(215,25,42,0.04),transparent_60%)]" />
      <div className="site-container relative z-10 grid gap-8 lg:grid-cols-2 items-stretch">
        <div className="flex flex-col justify-between h-full">
          <div>
            <span className="inline-block rounded-full bg-red-50/80 border border-red-200 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#d7192a]">
              START A CONVERSATION
            </span>
            <h2 className="section-title mt-2">Let’s connect.</h2>
          </div>

          <div className="mt-5 flex-1 flex flex-col justify-between gap-3 sm:gap-3.5">
            {/* 1. USA Office */}
            <div className="glass-card flex gap-4 p-4 sm:p-4.5 bg-white/95 border-slate-200/90 shadow-sm hover:border-red-300 hover:shadow-md transition-all">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-[#d7192a]">
                <MapPin className="size-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#d7192a]">USA HEADQUARTERS</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mt-0.5">TP IT GROUP LLC</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {companyInfo.headOffice.fullAddress}
                </p>
                <a
                  href={companyInfo.headOffice.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#d7192a] hover:text-[#b91c1c] transition-colors mt-1.5"
                >
                  View on Google Maps <ArrowUpRight className="size-3.5" />
                </a>
              </div>
            </div>

            {/* 2. Canada Office */}
            <div className="glass-card flex gap-4 p-4 sm:p-4.5 bg-white/95 border-slate-200/90 shadow-sm hover:border-red-300 hover:shadow-md transition-all">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-[#d7192a]">
                <MapPin className="size-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#d7192a]">CANADA DELIVERY HUB</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mt-0.5">🇨🇦 Canada — TP IT Group</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {companyInfo.canadaOffice.fullAddress}
                </p>
                <div className="mt-1.5 flex items-center gap-1.5 text-slate-600">
                  <Phone className="size-4 shrink-0 text-[#d7192a]" />
                  <a
                    href={`tel:${companyInfo.canadaOffice.phone.replace(/[^0-9+]/g, '')}`}
                    className="font-extrabold text-sm sm:text-base text-[#d7192a] hover:underline font-mono tracking-wide"
                  >
                    {companyInfo.canadaOffice.phone}
                  </a>
                </div>
                <a
                  href={companyInfo.canadaOffice.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#d7192a] hover:text-[#b91c1c] transition-colors mt-1.5"
                >
                  View on Google Maps <ArrowUpRight className="size-3.5" />
                </a>
              </div>
            </div>

            {/* 3. India Office */}
            <div className="glass-card flex gap-4 p-4 sm:p-4.5 bg-white/95 border-slate-200/90 shadow-sm hover:border-red-300 hover:shadow-md transition-all">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-[#d7192a]">
                <Building2 className="size-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#d7192a]">INDIA CORPORATE HUB</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mt-0.5">TP IT GROUP PVT LTD</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {companyInfo.indiaOffice.fullAddress}
                </p>
                <a
                  href={companyInfo.indiaOffice.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#d7192a] hover:text-[#b91c1c] transition-colors mt-1.5"
                >
                  View on Google Maps <ArrowUpRight className="size-3.5" />
                </a>
              </div>
            </div>

            {/* 3. Corporate Email */}
            <div className="glass-card flex gap-4 p-3.5 sm:p-4 bg-white/95 border-slate-200/90 shadow-sm hover:border-red-300 hover:shadow-md transition-all">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-[#d7192a]">
                <Mail className="size-4.5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">Corporate Email</h3>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="text-xs text-slate-700 hover:text-[#d7192a] transition mt-0.5 block font-mono"
                >
                  {companyInfo.email}
                </a>
              </div>
            </div>

            {/* 4. Phone Support */}
            <div className="glass-card flex gap-4 p-3.5 sm:p-4 bg-white/95 border-slate-200/90 shadow-sm hover:border-red-300 hover:shadow-md transition-all">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-[#d7192a]">
                <Phone className="size-4.5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">Phone Support</h3>
                <a
                  href="tel:+18148441362"
                  className="text-sm font-extrabold text-[#d7192a] hover:underline transition mt-0.5 block font-mono tracking-wide"
                >
                  +1 (814) 844-1362
                </a>
              </div>
            </div>

            {/* 5. Global Operations */}
            <div className="glass-card flex gap-4 p-3.5 sm:p-4 bg-white/95 border-slate-200/90 shadow-sm hover:border-red-300 hover:shadow-md transition-all">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-[#d7192a]">
                <Clock className="size-4.5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">Global Operations</h3>
                <p className="text-xs text-slate-600 mt-0.5">{companyInfo.workingHours}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form + Maps directly below Submit Request */}
        <div className="flex flex-col justify-between h-full gap-4">
          <div className="glass-card p-5 sm:p-6 border-slate-200/90 bg-white/95 shadow-xl shadow-slate-900/5">
            <ContactForm />
          </div>

          {/* Map Location directly under Submit Request */}
          <OfficeLocationsMapCard />
        </div>
      </div>
    </section>
  );
}

export function ContactBanner() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-slate-200/80 bg-white py-8 sm:py-10 text-slate-900 bg-dot-pattern">
      <div className="site-container relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-left">
        <div>
          <span className="inline-block rounded-full bg-red-50/80 border border-red-200 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#d7192a]">
            GET IN TOUCH
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
            Ready to Transform <span className="text-[#d7192a]">Your Business</span>?
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-2xl">
            Let’s connect your business goals with the technology, advice and people to move them forward.
          </p>
        </div>
        <div className="shrink-0">
          <Button
            asChild
            className="h-11 rounded-full bg-slate-900 hover:bg-slate-800 text-white px-7 text-xs sm:text-sm font-bold shadow-md transition-all hover:scale-105 inline-flex items-center gap-2"
          >
            <Link to="/contact">
              Get in Touch <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function PageHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="page-heading">
      <div className="site-container">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-2 text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">{title}</h1>
        <p className="section-copy mt-3 max-w-2xl text-slate-600">{description}</p>
      </div>
    </section>
  );
}

export const socialChannels = [
  {
    name: 'Facebook',
    href: companyInfo.social.facebook,
    bg: 'bg-[#1877F2]',
    shadow: 'hover:shadow-[0_0_20px_rgba(24,119,242,0.6)]',
    icon: (
      <svg className="size-5 fill-white" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: companyInfo.social.instagram,
    bg: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]',
    shadow: 'hover:shadow-[0_0_20px_rgba(220,39,67,0.6)]',
    icon: (
      <svg className="size-5 fill-white" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: companyInfo.social.youtube,
    bg: 'bg-[#FF0000]',
    shadow: 'hover:shadow-[0_0_20px_rgba(255,0,0,0.6)]',
    icon: (
      <svg className="size-5 fill-white" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: companyInfo.social.linkedin,
    bg: 'bg-[#0A66C2]',
    shadow: 'hover:shadow-[0_0_20px_rgba(10,102,194,0.6)]',
    icon: (
      <svg className="size-4.5 fill-white" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
      </svg>
    ),
  },
  {
    name: 'X (formerly Twitter)',
    href: companyInfo.social.x,
    bg: 'bg-[#000000] border border-white/20',
    shadow: 'hover:shadow-[0_0_20px_rgba(255,255,255,0.35)]',
    icon: (
      <svg className="size-4 fill-white" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export function OfficialSocialChannels({ className = '' }: { className?: string }) {
  return (
    <div className={`space-y-2.5 ${className}`}>
      <p className="text-[11px] font-bold uppercase tracking-wider text-[#d7192a]">
        Official Social Channels
      </p>
      <div className="flex flex-wrap items-center gap-2.5">
        {socialChannels.map((item) => (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            title={item.name}
            aria-label={item.name}
            className={`size-10 rounded-full flex items-center justify-center text-white shadow-md transition-all duration-300 hover:brightness-110 active:scale-95 ${item.bg} ${item.shadow}`}
          >
            {item.icon}
          </a>
        ))}
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="footer relative overflow-hidden bg-[#d7192a]/[0.05] border-t border-[#d7192a]/15 pt-12 pb-6 bg-dot-pattern">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-red-50/60 via-[#d7192a]/[0.03] to-[#d7192a]/[0.07]" />
      <div className="site-container relative z-10">
        <div className="grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-12">
          {/* Column 1: Brand & Motto */}
          <div className="lg:col-span-3">
            <Link to="/" className="brand-name inline-flex items-center" aria-label="TP iT GROUP LLC Home">
              <TPITLogo className="h-7 sm:h-8 md:h-9 max-w-[240px] w-auto" />
            </Link>
            <p className="mt-4 max-w-sm text-xs sm:text-[13px] leading-relaxed text-slate-900 font-medium">
              One connected partner for technology, consulting and IT and non-IT talent. TP IT Group brings your business priorities, systems and people together.
            </p>
            <p className="mt-4 text-xs sm:text-[13px] font-semibold text-[#d7192a]">
              We deliver what you expect. We keep our promises.
            </p>
            <div className="mt-6">
              <OfficialSocialChannels />
            </div>
          </div>

          {/* Column 2: Solutions */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-950">SOLUTIONS</h3>
            <div className="mt-4 flex flex-col gap-2.5 text-xs sm:text-[13px] text-slate-900 font-medium">
              <Link to="/services" className="hover:text-[#d7192a] transition-colors">AI Automation &amp; Agents</Link>
              <Link to="/services" className="hover:text-[#d7192a] transition-colors">Cloud Migration</Link>
              <Link to="/services" className="hover:text-[#d7192a] transition-colors">IT Development</Link>
              <Link to="/services" className="hover:text-[#d7192a] transition-colors">ERP &amp; SAP Solutions</Link>
              <Link to="/services" className="hover:text-[#d7192a] transition-colors">Web Design &amp; Development</Link>
              <Link to="/services" className="hover:text-[#d7192a] transition-colors">Networking &amp; Security</Link>
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-950">QUICK LINKS</h3>
            <div className="mt-4 flex flex-col gap-2.5 text-xs sm:text-[13px] text-slate-900 font-medium">
              <Link to="/about" className="hover:text-[#d7192a] transition-colors">About Us</Link>
              <Link to="/services" className="hover:text-[#d7192a] transition-colors">Our Services</Link>
              <Link to="/consulting" className="hover:text-[#d7192a] transition-colors">Consulting</Link>
              <Link to="/talent" className="hover:text-[#d7192a] transition-colors">IT &amp; Non-IT Talent</Link>
              <Link to="/team" className="hover:text-[#d7192a] transition-colors">Our Team</Link>
              <Link to="/careers" className="hover:text-[#d7192a] transition-colors">Careers</Link>
              <Link to="/clients" className="hover:text-[#d7192a] transition-colors">Clients</Link>
              <Link to="/contact" className="hover:text-[#d7192a] transition-colors">Contact Us</Link>
            </div>
          </div>

          {/* Column 4: Our Offices */}
          <div className="lg:col-span-5 space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-950">OUR OFFICES</h3>

            <div>
              <p className="text-xs sm:text-[13px] text-slate-950 flex items-center gap-1.5">
                <CountryFlag country="us" />
                <span className="font-bold">USA (Head Office) — TP IT Group LLC</span>
              </p>
              <p className="mt-1 text-xs text-slate-900 leading-relaxed font-normal">
                1000 N. West Street, Suite 1200, Wilmington, Delaware, 19801, United States of America
              </p>
              <a
                href="tel:+18148441362"
                className="mt-1 inline-block text-xs sm:text-[13px] font-bold text-[#d7192a] hover:underline"
              >
                +1 (814) 844-1362
              </a>
            </div>

            <div>
              <p className="text-xs sm:text-[13px] text-slate-950 flex items-center gap-1.5">
                <CountryFlag country="ca" />
                <span className="font-bold">Canada — TP IT Group</span>
              </p>
              <p className="mt-1 text-xs text-slate-900 leading-relaxed font-normal">
                Ontario, Canada
              </p>
              <a
                href="tel:+18148441362"
                className="mt-1 inline-block text-xs sm:text-[13px] font-bold text-[#d7192a] hover:underline"
              >
                +1 (814) 844-1362
              </a>
            </div>

            <div>
              <p className="text-xs sm:text-[13px] text-slate-950 flex items-center gap-1.5">
                <CountryFlag country="in" />
                <span className="font-bold">India — TP IT GROUP PVT LTD</span>
              </p>
              <p className="mt-1 text-xs text-slate-900 leading-relaxed font-normal">
                13th Floor, Manjeera Trinity Corporate, Unit No. 12A04, next to Lulu Mall, Kukatpally Housing Board Colony, K P H B Phase 3, Kukatpally, Hyderabad, Telangana 500072
              </p>
              <a
                href="tel:+919963435256"
                className="mt-1 inline-block text-xs sm:text-[13px] font-bold text-[#d7192a] hover:underline"
              >
                +91-9963435256
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#d7192a]/15 pt-6 text-[11px] text-slate-800 font-medium">
          <span>© 2026 TP IT GROUP LLC. All rights reserved.</span>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-[#d7192a] transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-[#d7192a] transition">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { GlobalMapConnection } from './GlobalMapConnection';
export { HeroVideoBanner } from './HeroVideoBanner';

