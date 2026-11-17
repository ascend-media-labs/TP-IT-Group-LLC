import { Link } from '@tanstack/react-router';
import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="mx-auto flex h-full w-full max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8 gap-3">
        <Link
          to="/"
          className="brand-name flex items-center transition-opacity hover:opacity-90 shrink-0"
          onClick={() => setOpen(false)}
          aria-label="TP iT GROUP LLC Home"
        >
          <TPITLogo className="h-5 sm:h-6 md:h-6.5 max-w-[150px] sm:max-w-[170px] w-auto shrink-0" />
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main navigation" className="hidden items-center gap-0.5 xl:gap-1.5 lg:flex shrink-0">
          {nav.map((item) => (
            <Link
              key={`${item.label}-${item.to}`}
              to={item.to}
              className="nav-link text-xs xl:text-[13px] px-2.5 xl:px-3 py-1.5"
              activeProps={{ className: 'nav-link active text-xs xl:text-[13px] px-2.5 xl:px-3 py-1.5' }}
              activeOptions={{ exact: true }}
            >
              {item.label}
            </Link>
          ))}
          <Button
            asChild
            className="ml-2 h-9 xl:h-10 rounded-full bg-[#d7192a] hover:bg-[#b91c1c] px-4 xl:px-5 text-xs xl:text-sm font-semibold text-white shadow-sm transition-all hover:scale-105 inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap"
          >
            <Link to="/contact">
              Let’s talk <ArrowUpRight className="size-3.5 xl:size-4" />
            </Link>
          </Button>
        </nav>

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
                className="rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-red-50 hover:text-[#d7192a]"
                activeProps={{ className: 'rounded-lg bg-red-50 px-3 py-2.5 text-sm font-bold text-[#d7192a]' }}
                activeOptions={{ exact: true }}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button
              asChild
              className="mt-4 h-11 w-full rounded-full bg-[#d7192a] hover:bg-[#b91c1c] text-xs font-bold text-white shadow-md shadow-red-500/20"
            >
              <Link to="/contact" onClick={() => setOpen(false)}>
                Let’s talk <ArrowUpRight className="size-4 ml-1" />
              </Link>
            </Button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
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
    <section id="home" className="relative overflow-hidden pt-2 pb-6 sm:pt-3 sm:pb-8 md:pt-4 md:pb-8 bg-white text-slate-900 bg-dot-pattern">
      {/* Background Gradients & Transparent Grid Texture */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,rgba(215,25,42,0.04),transparent)]" />
      <div className="pointer-events-none absolute -left-40 top-1/4 size-96 rounded-full bg-red-500/5 blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 size-96 rounded-full bg-red-500/5 blur-[130px]" />

      <div className="site-container relative z-10">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8 items-center">
          {/* Left Hero Content with Staggered Motion */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Top Red Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs sm:text-sm font-bold tracking-wider text-[#d7192a] uppercase"
            >
              TECHNOLOGY · CONSULTING · IT &amp; NON-IT TALENT
            </motion.p>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-3 sm:mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-[62px] font-extrabold tracking-tight text-slate-900 leading-[1.12]"
            >
              One partner.
              <br />
              <span className="text-[#d7192a]">Your next possibility.</span>
            </motion.h1>

            {/* Subheadline / Copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base md:text-lg font-normal leading-relaxed text-slate-600"
            >
              Build smarter systems. Bring the right expertise. Move your business forward with connected technology,
              consulting and workforce solutions.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-5 sm:mt-6 flex flex-wrap justify-center lg:justify-start gap-3.5 items-center"
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
                className="h-11 sm:h-12 rounded-full border border-slate-300 bg-white px-6 sm:px-7 text-xs sm:text-sm font-bold text-slate-800 shadow-xs backdrop-blur-md transition-all hover:bg-slate-50 hover:border-slate-400"
              >
                <Link to="/services">Explore solutions</Link>
              </Button>
            </motion.div>

            {/* Promise line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-3 sm:mt-4 text-xs sm:text-sm font-semibold text-[#d7192a]"
            >
              We deliver what you expect. We keep our promises.
            </motion.p>
          </div>

          {/* Right 3D Interactive Digital Globe Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex items-center justify-center relative"
          >
            <DigitalGlobe className="w-full h-[320px] sm:h-[380px] md:h-[420px] lg:h-[440px]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function StatsSection() {
  return (
    <section className="relative border-y border-slate-200/80 bg-slate-50/80 py-4 sm:py-5 overflow-hidden bg-grid-pattern">
      <div className="site-container relative z-10">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 items-center">
          {/* 1. 20+ years */}
          <div className="text-center sm:text-left">
            <div className="font-mono text-2xl sm:text-3xl font-extrabold text-slate-900">20+ years</div>
            <div className="mt-1 text-xs text-slate-500 font-medium">Industry experience</div>
          </div>

          {/* 2. US USA CA Canada IN India */}
          <div className="text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm font-bold text-slate-900">
              <span className="inline-flex items-center gap-1">
                <span className="rounded bg-slate-200/80 px-1 py-0.5 text-[10px] font-bold text-slate-700">US</span> USA
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="rounded bg-slate-200/80 px-1 py-0.5 text-[10px] font-bold text-slate-700">CA</span> Canada
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="rounded bg-slate-200/80 px-1 py-0.5 text-[10px] font-bold text-slate-700">IN</span> India
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
    <Cpu key="cpu" className="size-6 text-[#d7192a]" />,
    <Compass key="compass" className="size-6 text-[#d7192a]" />,
    <Briefcase key="briefcase" className="size-6 text-[#d7192a]" />,
  ];

  return (
    <section id="consulting" className="section relative overflow-hidden bg-white text-slate-900 bg-dot-pattern">
      <div className="site-container relative z-10">
        <div className="mb-8 text-left">
          <p className="eyebrow text-[#d7192a]">ONE PARTNER. CONNECTED CAPABILITIES.</p>
          <h2 className="section-title mt-2">
            Technology. Consulting. Talent. <span className="text-[#d7192a]">Built around your business.</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-4xl">
            From defining the challenge to delivering the solution, bring your technology and people priorities together.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {connectedCapabilities.map((cap, i) => (
            <motion.div
              key={cap.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card flex flex-col justify-between p-6 sm:p-7 bg-white/95 border-slate-200/90 hover:border-[#d7192a]/50 hover:shadow-xl transition-all"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-red-50 border border-red-100">
                    {capIcons[i % capIcons.length]}
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-400">{cap.number}</span>
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900">{cap.title}</h3>
                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600">{cap.desc}</p>

                <ul className="mt-5 space-y-2 border-t border-slate-100 pt-4">
                  {cap.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                      <Check className="size-3.5 mt-0.5 shrink-0 text-[#d7192a]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <Link
                  to={cap.href}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#d7192a] hover:text-[#b91c1c] transition-colors"
                >
                  {cap.linkText} <ArrowRight className="size-3.5 ml-1" />
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
      icon: <Target className="size-5 text-[#d7192a]" />,
      title: 'Mission-Driven',
      desc: 'Deliver smart solutions that drive real business growth and digital transformation.',
    },
    {
      icon: <Users className="size-5 text-[#d7192a]" />,
      title: 'Client-Centric',
      desc: 'Building long-term partnerships through reliable service and dedicated support.',
    },
    {
      icon: <Lightbulb className="size-5 text-[#d7192a]" />,
      title: 'Innovation First',
      desc: 'Leveraging cutting-edge technologies to solve complex business challenges.',
    },
    {
      icon: <TrendingUp className="size-5 text-[#d7192a]" />,
      title: 'Scalable Growth',
      desc: 'Solutions designed to grow with your business from startup to enterprise.',
    },
  ];

  return (
    <section id="about" className="section bg-white text-slate-900 bg-dot-pattern pb-2 sm:pb-3">
      <div className="site-container space-y-8 sm:space-y-10">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block rounded-full bg-red-50 border border-red-200 px-3.5 py-1 text-xs font-bold text-[#d7192a]">
              ABOUT US
            </span>
            <h2 className="section-title mt-3">
              Your Trusted Technology <br />
              Partner for <span className="text-[#d7192a]">Global Growth</span>
            </h2>
            <div className="mt-4 space-y-3 text-xs sm:text-sm leading-relaxed text-slate-600">
              <p>
                TP IT Group helps businesses navigate digital transformation with practical, reliable technology solutions.
                Our <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-bold text-slate-800">US</span> USA head office and{' '}
                <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-bold text-slate-800">CA</span> Canada and{' '}
                <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-bold text-slate-800">IN</span> India operations connect
                business needs with technology, consulting and workforce expertise.
              </p>
              <p>
                We bring together AI automation, cloud migration, custom development, ERP and SAP, web design, and
                networking to support your business from planning through ongoing improvement.
              </p>
              <p className="mt-4 font-semibold italic text-[#d7192a]">
                We deliver what you expect and keep our promises — with clear communication, agreed priorities and
                dependable support.
              </p>
            </div>

            {!detailed && (
              <Button
                asChild
                className="mt-6 h-11 rounded-xl bg-slate-100 px-6 text-xs font-bold text-slate-800 border border-slate-200/90 shadow-xs hover:bg-slate-200/80 hover:border-red-300 transition-all"
              >
                <Link to="/about">
                  Learn More About Us <ArrowRight className="size-4 ml-2" />
                </Link>
              </Button>
            )}
          </motion.div>

          {/* Right 4 Cards (2x2 Grid) */}
          <div className="grid gap-4 sm:grid-cols-2">
            {aboutCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-5 sm:p-6 bg-white/95 border-slate-200/90 hover:border-[#d7192a]/50 hover:shadow-lg transition-all"
              >
                <div className="flex size-10 items-center justify-center rounded-full bg-red-50 border border-red-100">
                  {card.icon}
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">{card.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{card.desc}</p>
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
                    viewport={{ once: true }}
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
                    viewport={{ once: true }}
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

        {/* 6 Services Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card flex flex-col justify-between p-6 sm:p-7 bg-white/95 border-slate-200/90 hover:border-[#d7192a]/50 hover:shadow-xl transition-all"
            >
              <div>
                <div className="flex size-11 items-center justify-center rounded-xl bg-red-50 border border-red-100">
                  {serviceIcons[i % serviceIcons.length]}
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{service.title}</h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                  {full && service.desc ? service.desc : service.summary}
                </p>

                {full && service.offers && (
                  <ul className="mt-4 space-y-1.5 border-t border-slate-100 pt-3">
                    {service.offers.map((offer) => (
                      <li key={offer} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check className="size-3.5 mt-0.5 shrink-0 text-[#d7192a]" />
                        <span>{offer}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#d7192a] hover:text-[#b91c1c] transition-colors"
                >
                  Explore {service.title} <ArrowRight className="size-3.5 ml-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function IndustriesSection() {
  const industryIcons = [
    <Briefcase key="fin" className="size-6 text-[#d7192a]" />,
    <Monitor key="it" className="size-6 text-[#d7192a]" />,
    <Pill key="health" className="size-6 text-[#d7192a]" />,
    <Factory key="manu" className="size-6 text-[#d7192a]" />,
    <Rocket key="start" className="size-6 text-[#d7192a]" />,
    <HardHat key="eng" className="size-6 text-[#d7192a]" />,
  ];

  return (
    <section className="section relative overflow-hidden bg-white text-slate-900 bg-dot-pattern pt-2 sm:pt-3 pb-2 sm:pb-3">
      <div className="site-container relative z-10">
        <div className="mb-5 sm:mb-6 text-left">
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-3xl bg-white p-8 sm:p-9 border border-slate-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] hover:border-[#d7192a]/30 hover:shadow-lg transition-all"
            >
              <div className="flex size-12 items-center justify-center rounded-2xl bg-[#fef2f2] text-[#d7192a]">
                {industryIcons[i % industryIcons.length]}
              </div>
              <h3 className="mt-6 text-lg sm:text-xl font-bold text-slate-900">{ind.name}</h3>
              <p className="mt-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400">{ind.desc}</p>
            </motion.div>
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
        <div className="mb-5 sm:mb-6 text-left">
          <span className="inline-block rounded-full bg-red-50/80 border border-red-200 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#d7192a]">
            WHY CHOOSE US
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
            Your Success is Our <span className="text-[#d7192a]">Priority</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-4xl">
            Dedicated partnership, proven global delivery models, and dependable support engineered around your growth.
          </p>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12 max-w-6xl">
          {/* Left Handshake Card */}
          <div className="lg:col-span-6 rounded-3xl border border-red-100/90 bg-white p-8 sm:p-12 shadow-[0_4px_24px_rgba(215,25,42,0.03)] flex flex-col justify-between min-h-[360px] h-full">
            <div>
              <Handshake className="size-16 sm:size-20 text-[#d7192a] stroke-[1.8]" />
              <h3 className="mt-8 text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#d7192a] leading-snug">
                We don’t just deliver services — <br />
                We build partnerships.
              </h3>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-100">
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#d7192a] hover:underline"
              >
                Get in Touch <ArrowUpRight className="size-4 ml-0.5" />
              </Link>
            </div>
          </div>

          {/* Right 5 items */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="flex gap-4 items-start">
                <div className="flex size-7 sm:size-8 shrink-0 items-center justify-center rounded-full bg-red-50/80 border border-red-200 text-[#d7192a] mt-0.5">
                  <Check className="size-4 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                  {item.title === 'Global Technology Experience' ? (
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      <span className="text-[10px] font-bold uppercase text-slate-400">us</span> USA,{' '}
                      <span className="text-[10px] font-bold uppercase text-slate-400">ca</span> Canada and{' '}
                      <span className="text-[10px] font-bold uppercase text-slate-400">in</span> India operations connecting
                      business context with technical and workforce needs.
                    </p>
                  ) : (
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function WorkWithSection() {
  return (
    <section id="talent" className="section relative overflow-hidden bg-white text-slate-900 border-t border-slate-200/80 bg-dot-pattern">
      <div className="site-container relative z-10">
        <div className="mb-8 text-left">
          <p className="eyebrow text-[#d7192a]">WORK WITH TP IT GROUP</p>
          <h2 className="section-title mt-2">The right engagement for your next move.</h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-4xl">
            Flexible collaboration structures built to adapt to your enterprise milestones and talent demands.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {engagementModels.map((item, i) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border-t-2 border-[#d7192a] pt-4"
            >
              <span className="font-mono text-xs font-bold text-slate-400">{item.number}</span>
              <h3 className="mt-2 text-base font-bold text-slate-900">{item.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProvenApproachSection() {
  const processIcons = [
    <MessageSquare key="chat" className="size-5 text-[#d7192a]" />,
    <Lightbulb key="light" className="size-5 text-[#d7192a]" />,
    <Rocket key="rocket" className="size-5 text-[#d7192a]" />,
    <RefreshCw key="refresh" className="size-5 text-[#d7192a]" />,
  ];

  return (
    <section className="section relative overflow-hidden bg-slate-50/70 text-slate-900 border-y border-slate-200/80 bg-grid-pattern">
      <div className="site-container relative z-10">
        <div className="mb-8 text-left">
          <span className="inline-block rounded-full bg-red-50/80 border border-red-200 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#d7192a]">
            OUR WORK PROCESS
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
            A Clear Approach to <span className="text-[#d7192a]">Delivering Excellence</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-4xl">
            Agree on the priorities, review progress together and validate what is delivered against your business needs.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {provenApproach.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 bg-white/95 border-slate-200/90 hover:border-[#d7192a]/50 hover:shadow-xl transition-all relative"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center justify-center rounded-lg bg-slate-900 text-white font-mono text-xs font-bold px-2.5 py-1">
                  {step.number}
                </span>
                <div className="flex size-9 items-center justify-center rounded-xl bg-red-50 border border-red-100">
                  {processIcons[i % processIcons.length]}
                </div>
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Clients({ full = false }: { full?: boolean }) {
  return (
    <section id="clients" className="section relative overflow-hidden bg-slate-50/70 text-slate-900 border-y border-slate-200/80 bg-grid-pattern">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(215,25,42,0.04),transparent_60%)]" />
      <div className="site-container relative z-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-3xl text-left">
            <p className="eyebrow text-[#d7192a]">CLIENT SUCCESS &amp; EXCELLENCE</p>
            <h2 className="section-title mt-2">Trusted by Fortune 500 &amp; Industry Leaders.</h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-4xl">
              Partnering with world-class organizations to deliver cutting-edge IT excellence, digital engineering, and workforce solutions.
            </p>
          </div>
          {!full && (
            <Button asChild variant="link" className="px-0 text-xs font-bold text-[#d7192a] hover:text-[#b91c1c]">
              <Link to="/clients">
                View all 20+ partners <ArrowRight className="size-4 ml-1" />
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
              {clientLogos.map((client) => (
                <div
                  key={client.name}
                  className="flex h-24 items-center justify-center rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs transition hover:border-red-300 hover:shadow-md"
                >
                  <img
                    src={client.src}
                    alt={client.name}
                    className="max-h-12 max-w-[85%] object-contain contrast-125"
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
  const departments = [
    'All',
    'Cloud Operations',
    'Engineering',
    'FinLabs',
    'Enterprise Solutions',
    'Digital Experience',
    'Management',
  ];

  const filteredJobs =
    selectedDept === 'All' ? careersJobs : careersJobs.filter((j) => j.dept === selectedDept);

  return (
    <section className="section relative overflow-hidden bg-white text-slate-900 bg-dot-pattern">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(215,25,42,0.04),transparent_60%)]" />
      <div className="site-container relative z-10 space-y-8 sm:space-y-10">
        {/* Intro */}
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 shadow-xl group">
            <img
              className="editorial-image h-[300px] sm:h-[380px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              src={team}
              alt="TP iT GROUP LLC global engineering team"
              width={1536}
              height={1024}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
          </div>

          <div>
            <p className="eyebrow">GROW WITH US</p>
            <h2 className="section-title mt-2">
              Build Your Future with a <br className="hidden sm:inline" />
              Global Technology Leader.
            </h2>
            <p className="section-copy mt-3.5">
              Join TP IT Group LLC and work on cutting-edge projects with world-class clients across 5 continents. We
              foster an environment where curiosity is rewarded, continuous learning is in our DNA, and leadership is
              nurtured.
            </p>
            <div className="mt-5 space-y-2.5">
              {careersBenefits.map((b) => (
                <div key={b.title} className="flex items-start gap-2.5">
                  <div className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-red-50 border border-red-200 text-[#d7192a] mt-0.5">
                    <Check className="size-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{b.title}</h4>
                    <p className="text-xs text-slate-600">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            {!full && (
              <Button
                asChild
                className="mt-6 h-11 rounded-xl bg-slate-100 border border-slate-200 px-6 text-xs font-bold text-slate-900 hover:bg-slate-200 hover:border-red-400 transition-all"
              >
                <Link to="/careers">
                  View Open Positions ({careersJobs.length}) <ArrowRight className="size-4 ml-2" />
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Detailed Careers View */}
        {full && (
          <div className="space-y-7 border-t border-slate-200/90 pt-7">
            <div>
              <p className="eyebrow">OPEN POSITIONS</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">Find Your Next Challenge</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
                Explore current engineering, consulting, and management roles across USA, India, and Canada.
              </p>
            </div>

            {/* Department Filter */}
            <div className="flex flex-wrap gap-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                    selectedDept === dept
                      ? 'border border-[#d7192a] bg-[#d7192a] text-white shadow-sm'
                      : 'border border-slate-200/90 bg-white text-slate-600 hover:border-red-200 hover:text-[#d7192a]'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>

            {/* Job Openings Grid */}
            <div className="grid gap-5 md:grid-cols-2">
              {filteredJobs.map((job) => (
                <article
                  key={job.title}
                  className="glass-card flex flex-col justify-between p-6 bg-white/95 border-slate-200/90 hover:border-red-300 hover:shadow-xl transition-all"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="rounded-md border border-red-200 bg-red-50 px-2.5 py-1 text-[11px] font-bold text-[#d7192a]">
                        {job.dept}
                      </span>
                      <span className="text-xs font-medium text-slate-500">{job.type}</span>
                    </div>
                    <h4 className="mt-3 text-lg font-bold text-slate-900">{job.title}</h4>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin className="size-3.5 text-[#d7192a]" /> {job.location}
                    </p>
                    <p className="mt-2.5 text-xs leading-relaxed text-slate-600">{job.desc}</p>
                  </div>
                  <div className="mt-5 pt-3.5 border-t border-slate-200/90 flex items-center justify-between">
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
                    <span className="text-[11px] text-slate-500 font-medium">Immediate Opening</span>
                  </div>
                </article>
              ))}
            </div>

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
        )}
      </div>
    </section>
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

export function ContactForm() {
  const [notice, setNotice] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Cloud Migration & Infrastructure',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotice(true);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-xs font-semibold text-slate-700">
          Full Name *
          <input
            required
            name="name"
            autoComplete="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="John Doe"
            className="contact-field mt-1.5"
          />
        </label>
        <label className="text-xs font-semibold text-slate-700">
          Corporate Email *
          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="john@company.com"
            className="contact-field mt-1.5"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-xs font-semibold text-slate-700">
          Phone Number
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+1 (814) 844-1361"
            className="contact-field mt-1.5"
          />
        </label>
        <label className="text-xs font-semibold text-slate-700">
          Service Requirement
          <select
            name="service"
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="contact-field mt-1.5 bg-white text-slate-900"
          >
            <option value="Cloud Migration & Infrastructure">Cloud Computing &amp; Infrastructure</option>
            <option value="ERP & SAP Solutions">ERP &amp; SAP Solutions</option>
            <option value="Custom Application Development">Custom Application Development</option>
            <option value="App Maintenance & Support">Application Maintenance &amp; Support</option>
            <option value="Workforce & Staffing Solutions">Workforce &amp; Staffing Solutions</option>
            <option value="General Consultation">General Consultation</option>
          </select>
        </label>
      </div>

      <label className="text-xs font-semibold text-slate-700">
        Project Objectives &amp; Requirements *
        <textarea
          required
          name="message"
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Please describe your digital goals, timeline, and technical scope..."
          className="contact-field mt-1.5 resize-y"
        />
      </label>

      <Button
        type="submit"
        className="h-11 w-fit rounded-xl bg-[#d7192a] hover:bg-[#b91c1c] px-7 text-xs font-bold text-white shadow-md shadow-red-500/20"
      >
        Submit Request <ArrowUpRight className="size-4 ml-1" />
      </Button>

      {notice && (
        <div role="status" className="rounded-xl border border-emerald-300 bg-emerald-50 p-3.5 text-xs text-emerald-800">
          <strong>Thank you!</strong> Your enquiry has been received. A TP iT GROUP LLC enterprise consultant will reach
          out to <strong>{formData.email || 'you'}</strong> shortly.
        </div>
      )}
    </form>
  );
}

export function Contact() {
  return (
    <section className="section relative overflow-hidden bg-white text-slate-900 bg-dot-pattern">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_20%_20%,rgba(215,25,42,0.04),transparent_60%)]" />
      <div className="site-container relative z-10 grid gap-8 lg:grid-cols-2 items-start">
        <div>
          <p className="eyebrow">START A CONVERSATION</p>
          <h2 className="section-title mt-2">Let’s connect.</h2>
          <p className="section-copy mt-3 max-w-lg">
            Ready to accelerate your digital transformation? TP IT GROUP LLC provides world-class technology and
            enterprise IT solutions globally.
          </p>

          <div className="mt-6 space-y-4">
            <div className="glass-card flex gap-4 p-4 sm:p-5 bg-white/95 border-slate-200/90 shadow-sm hover:border-red-300 hover:shadow-md transition-all">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-[#d7192a]">
                <MapPin className="size-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">USA Head Office</h3>
                <p className="text-xs text-slate-600 mt-1">{companyInfo.headOffice.fullAddress}</p>
                <p className="text-[11px] font-semibold text-[#d7192a] mt-1 uppercase tracking-wider">
                  Branch Hubs: {companyInfo.branchOffices}
                </p>
              </div>
            </div>

            <div className="glass-card flex gap-4 p-4 sm:p-5 bg-white/95 border-slate-200/90 shadow-sm hover:border-red-300 hover:shadow-md transition-all">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-[#d7192a]">
                <Mail className="size-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Corporate Email</h3>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="text-xs text-slate-700 hover:text-[#d7192a] transition mt-1 block font-mono"
                >
                  {companyInfo.email}
                </a>
              </div>
            </div>

            <div className="glass-card flex gap-4 p-4 sm:p-5 bg-white/95 border-slate-200/90 shadow-sm hover:border-red-300 hover:shadow-md transition-all">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-[#d7192a]">
                <Phone className="size-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Phone Support</h3>
                <a
                  href={`tel:${companyInfo.phone.replace(/[^0-9+]/g, '')}`}
                  className="text-xs text-slate-700 hover:text-[#d7192a] transition mt-1 block font-mono"
                >
                  {companyInfo.phone}
                </a>
              </div>
            </div>

            <div className="glass-card flex gap-4 p-4 sm:p-5 bg-white/95 border-slate-200/90 shadow-sm hover:border-red-300 hover:shadow-md transition-all">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-[#d7192a]">
                <Clock className="size-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Global Operations</h3>
                <p className="text-xs text-slate-600 mt-1">{companyInfo.workingHours}</p>
              </div>
            </div>

            <div className="pt-2">
              <OfficialSocialChannels />
            </div>
          </div>
        </div>

        <div className="glass-card p-6 sm:p-8 border-slate-200/90 bg-white/95 shadow-xl shadow-slate-900/5">
          <ContactForm />
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
            className={`size-10 rounded-full flex items-center justify-center text-white shadow-md transition-all duration-300 hover:scale-110 active:scale-95 ${item.bg} ${item.shadow}`}
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
    <footer className="footer bg-white border-t border-slate-200/90 pt-12 pb-6">
      <div className="site-container">
        <div className="grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-12">
          {/* Column 1: Brand & Motto */}
          <div className="lg:col-span-3">
            <Link to="/" className="brand-name inline-flex items-center" aria-label="TP iT GROUP LLC Home">
              <TPITLogo className="h-6 sm:h-7 w-auto" />
            </Link>
            <p className="mt-4 max-w-sm text-xs sm:text-[13px] leading-relaxed text-slate-600">
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
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">SOLUTIONS</h3>
            <div className="mt-4 flex flex-col gap-2.5 text-xs sm:text-[13px] text-slate-600">
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
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">QUICK LINKS</h3>
            <div className="mt-4 flex flex-col gap-2.5 text-xs sm:text-[13px] text-slate-600">
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
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">OUR OFFICES</h3>

            <div>
              <p className="text-xs sm:text-[13px] text-slate-900">
                <span className="text-[10px] font-bold uppercase text-slate-400 mr-1.5">us</span>
                <span className="font-bold">USA (Head Office) — TP IT Group LLC</span>
              </p>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
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
              <p className="text-xs sm:text-[13px] text-slate-900">
                <span className="text-[10px] font-bold uppercase text-slate-400 mr-1.5">ca</span>
                <span className="font-bold">Canada — TP IT Group</span>
              </p>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
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
              <p className="text-xs sm:text-[13px] text-slate-900">
                <span className="text-[10px] font-bold uppercase text-slate-400 mr-1.5">in</span>
                <span className="font-bold">India — TP IT GROUP PVT LTD</span>
              </p>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
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

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200/90 pt-6 text-[11px] text-slate-500">
          <span>© 2026 TP IT GROUP LLC. All rights reserved.</span>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-slate-900 transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-900 transition">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
