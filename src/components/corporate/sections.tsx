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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  headquarters,
  team,
  articles,
  companyInfo,
  stats,
  services,
  clientPillars,
  industries,
  provenApproach,
  whyChooseUs,
  coreValues,
  milestones,
  careersJobs,
  careersBenefits,
  enterpriseDeliverables,
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
  { label: 'About us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Clients', to: '/clients' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact Us', to: '/contact' },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-container flex h-full items-center justify-between">
        <Link
          to="/"
          className="brand-name flex items-center transition-opacity hover:opacity-90"
          onClick={() => setOpen(false)}
          aria-label="TP iT GROUP LLC Home"
        >
          <TPITLogo className="h-7 sm:h-8 md:h-9 max-w-[220px] sm:max-w-none w-auto" inverted />
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main navigation" className="hidden items-center gap-1.5 lg:gap-3 md:flex">
          {nav.map((item) => {
            if (item.label === 'Contact Us') {
              return (
                <Button
                  asChild
                  key={item.to}
                  className="ml-3 h-10 rounded-xl bg-gradient-to-r from-[#00D1FF] to-[#05a2c9] px-5 text-xs font-bold text-black shadow-[0_0_20px_rgba(0,209,255,0.25)] transition-all hover:opacity-95 hover:shadow-[0_0_28px_rgba(0,209,255,0.4)]"
                >
                  <Link to={item.to}>
                    {item.label} <ArrowUpRight className="size-3.5 ml-1" />
                  </Link>
                </Button>
              );
            }
            return (
              <Link
                key={item.to}
                to={item.to}
                className="nav-link"
                activeProps={{ className: 'nav-link active' }}
                activeOptions={{ exact: item.to === '/' }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white hover:bg-white/10"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="size-6 text-[#00D1FF]" /> : <Menu className="size-6" />}
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
            className="absolute left-0 top-full flex w-full flex-col border-b border-white/10 bg-[#030712]/95 px-6 py-6 shadow-2xl backdrop-blur-2xl md:hidden"
          >
            {nav.map((item) => {
              if (item.label === 'Contact Us') {
                return (
                  <Button
                    asChild
                    key={item.to}
                    className="mt-4 h-12 w-full rounded-xl bg-gradient-to-r from-[#00D1FF] to-[#05a2c9] text-xs font-bold text-black shadow-lg shadow-cyan-500/20"
                  >
                    <Link to={item.to} onClick={() => setOpen(false)}>
                      {item.label} <ArrowUpRight className="size-4 ml-1" />
                    </Link>
                  </Button>
                );
              }
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="nav-link py-3 text-sm border-b border-white/5 last:border-none"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
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
    <section className="relative overflow-hidden pt-12 pb-20 md:py-24 bg-[#030712] text-white">
      {/* Background Gradients & Sci-Fi Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,rgba(0,209,255,0.18),transparent)]" />
      <div className="pointer-events-none absolute -left-40 top-1/4 size-96 rounded-full bg-blue-600/10 blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 size-96 rounded-full bg-cyan-500/10 blur-[130px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="site-container relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8 items-center">
          {/* Left Hero Content with Staggered Motion */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Pulsing Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-[11px] font-bold tracking-widest text-[#00D1FF] backdrop-blur-md shadow-[0_0_20px_rgba(0,209,255,0.2)]"
            >
              <span className="size-2 rounded-full bg-[#00D1FF] animate-pulse" />
              GLOBAL IT SOLUTIONS PARTNER
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 text-3xl sm:text-5xl md:text-6xl lg:text-[62px] font-extrabold tracking-tight text-white leading-[1.12]"
            >
              Transforming Business with{' '}
              <span className="bg-gradient-to-r from-[#00D1FF] via-[#38bdf8] to-[#60a5fa] bg-clip-text text-transparent">
                Digital Engineering
              </span>{' '}
              <span className="text-zinc-400">&amp;</span>{' '}
              <span className="bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#fde68a] bg-clip-text text-transparent">
                Enterprise Strategy
              </span>
            </motion.h1>

            {/* Subheadline / Copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-2xl text-sm sm:text-base md:text-lg font-normal leading-relaxed text-zinc-300"
            >
              A global technology powerhouse delivering next-gen IT services, deep-tech engineering, and strategic
              workforce solutions across USA, India, UK, Australia, and Canada.
            </motion.p>

            {/* Capability Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-7 flex flex-wrap justify-center lg:justify-start gap-2"
            >
              {capabilityTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold text-zinc-300 backdrop-blur-md transition-all duration-300 hover:border-[#00D1FF]/40 hover:bg-white/[0.08] hover:text-white"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-9 flex flex-wrap justify-center lg:justify-start gap-4"
            >
              <Button
                asChild
                className="h-12 rounded-xl bg-gradient-to-r from-[#00D1FF] to-[#05a2c9] px-7 text-xs sm:text-sm font-bold text-black shadow-[0_0_25px_rgba(0,209,255,0.3)] transition-all hover:opacity-95 hover:shadow-[0_0_35px_rgba(0,209,255,0.5)] hover:scale-[1.02]"
              >
                <Link to="/services" className="inline-flex items-center gap-2">
                  Explore Our Services <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-xl border-white/15 bg-white/5 px-7 text-xs sm:text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/30"
              >
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </motion.div>
          </div>

          {/* Right 3D Interactive Digital Globe Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex items-center justify-center relative"
          >
            <DigitalGlobe />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function StatsSection() {
  return (
    <section className="relative border-y border-white/10 bg-[#02050f] py-14">
      <div className="site-container">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((item) => (
            <AnimatedCounter key={item.label} value={item.value} label={item.label} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function About({ detailed = false }: { detailed?: boolean }) {
  return (
    <section className="section bg-[#030712] text-white">
      <div className="site-container space-y-16">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow">YOUR TRUSTED TECHNOLOGY PARTNER</p>
            <h2 className="section-title mt-3">
              Building the Future of <br className="hidden sm:inline" />
              Enterprise Technology.
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-zinc-300 sm:text-base">
              <p>
                At <strong className="text-white">TP IT Group LLC</strong>, we believe in the power of digital to
                transform businesses for the better. Since 2005, our global technology firm has combined creativity and
                innovative engineering to deliver industry-leading digital solutions.
              </p>
              <p>
                TP IT Group&apos;s progressive technologies and optimization strategies span end-to-end Artificial
                Intelligence, Consulting, Digital, Cloud &amp; DevOps, Data, and Software Engineering, servicing an array
                of noteworthy financial services and technology firms.
              </p>
              {detailed && (
                <>
                  <p>
                    Through research and development initiatives in our <strong className="text-[#00D1FF]">FinLabs</strong>,
                    we develop solutions for modernization—from Artificial Intelligence and Blockchain to Data Science
                    models, Digital Underwriting, and mobile-first applications.
                  </p>
                  <p>
                    Over the last 20+ years, our company has been honored with multiple employer awards, recognizing our
                    commitment to our talented teams. With top clients across 5 continents, TP IT Group has a global
                    workforce of 10,000+ and offices in key global markets.
                  </p>
                </>
              )}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                'Innovation-driven solutions',
                'Client-focused approach',
                'Global expertise, local execution',
                '24/7 dedicated support',
              ].map((point) => (
                <div key={point} className="flex items-center gap-2.5 text-xs font-semibold text-zinc-200">
                  <CheckCircle2 className="size-4 shrink-0 text-[#00D1FF]" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            {!detailed && (
              <Button
                asChild
                className="mt-8 h-12 rounded-xl bg-white/10 px-6 text-xs font-bold text-white border border-white/15 backdrop-blur-md hover:bg-white/15 hover:border-[#00D1FF]/40 transition-all"
              >
                <Link to="/about">
                  Learn More About Us <ArrowRight className="size-4 ml-2" />
                </Link>
              </Button>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.02] shadow-2xl backdrop-blur-xl group">
              <img
                className="about-photo h-[340px] sm:h-[440px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={headquarters}
                alt="TP iT GROUP LLC Corporate Headquarters"
                width={1536}
                height={1024}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#00D1FF]">
                  GLOBAL HEADQUARTERS
                </p>
                <p className="text-base font-bold">{companyInfo.headOffice.fullAddress}</p>
                <p className="text-xs text-zinc-400">Branch Hubs: {companyInfo.branchOffices}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Detailed View Sections */}
        {detailed && (
          <div className="space-y-20 pt-8 border-t border-white/10">
            {/* Core Values */}
            <div>
              <div className="text-center">
                <p className="eyebrow mx-auto justify-center">CORE VALUES</p>
                <h2 className="section-title mt-2">What Drives Our Work</h2>
                <p className="section-copy mx-auto mt-3 max-w-xl">
                  Our values shape every interaction, decision, and solution we deliver to global clients.
                </p>
              </div>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {coreValues.map((val, i) => (
                  <motion.article
                    key={val.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card p-6"
                  >
                    <div className="flex size-11 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-[#00D1FF]">
                      <Sparkles className="size-5" />
                    </div>
                    <h3 className="mt-5 text-base font-bold text-white">{val.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-zinc-400">{val.desc}</p>
                  </motion.article>
                ))}
              </div>
            </div>

            {/* Milestones / Journey */}
            <div>
              <div className="text-center">
                <p className="eyebrow mx-auto justify-center">OUR JOURNEY</p>
                <h2 className="section-title mt-2">Milestones of Progress</h2>
                <p className="section-copy mx-auto mt-3 max-w-xl">
                  A legacy of continuous growth, technological innovation, and client partnerships since 2005.
                </p>
              </div>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {milestones.map((m, i) => (
                  <motion.div
                    key={m.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card p-6"
                  >
                    <span className="inline-block rounded-full bg-cyan-500/15 border border-cyan-500/30 px-3.5 py-1 text-xs font-bold text-[#00D1FF]">
                      {m.year}
                    </span>
                    <h3 className="mt-4 text-base font-bold text-white">{m.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-zinc-400">{m.desc}</p>
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
    <Cloud key="cloud" className="size-7" />,
    <Server key="server" className="size-7" />,
    <Code2 key="code" className="size-7" />,
    <Headphones key="headphones" className="size-7" />,
    <Building2 key="building" className="size-7" />,
  ];

  return (
    <section className="section bg-[#02050e] text-white">
      <div className="site-container">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">OUR CAPABILITIES</p>
            <h2 className="section-title mt-2">Comprehensive IT Solutions for Global Enterprises.</h2>
            <p className="section-copy mt-3">
              From cloud infrastructure to custom development, we provide end-to-end technology solutions that power
              business growth across 5 continents.
            </p>
          </div>
          {!full && (
            <Button
              asChild
              variant="link"
              className="px-0 text-xs font-bold text-[#00D1FF] hover:text-white"
            >
              <Link to="/services">
                Explore all services <ArrowRight className="size-4 ml-1" />
              </Link>
            </Button>
          )}
        </div>

        {/* Home Overview Grid (5 services) */}
        {!full && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <ServiceCard3D
                key={service.id}
                id={service.id}
                index={i}
                title={service.title}
                summary={service.summary}
                icon={serviceIcons[i % serviceIcons.length]}
              />
            ))}
          </div>
        )}

        {/* Detailed Services Page View */}
        {full && (
          <div className="space-y-16">
            <div className="grid gap-8 lg:grid-cols-2">
              {services.map((service, i) => (
                <ServiceCard3D
                  key={service.id}
                  id={service.id}
                  index={i}
                  title={service.title}
                  summary={service.summary}
                  desc={service.desc}
                  offers={service.offers}
                  isDetailed
                  icon={serviceIcons[i % serviceIcons.length]}
                />
              ))}
            </div>

            {/* Enterprise Commitments */}
            <div className="glass-card p-8 md:p-12">
              <div className="max-w-2xl">
                <p className="eyebrow">ENTERPRISE COMMITMENTS</p>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                  Quality &amp; Delivery Standards
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-400">
                  Every engagement with TP iT GROUP LLC includes a comprehensive suite of professional deliverables
                  designed for enterprise scalability and governance.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {enterpriseDeliverables.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white shadow-xs"
                  >
                    <CheckCircle2 className="size-4 text-[#00D1FF]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export function IndustriesSection() {
  const industryIcons = [
    <Activity key="fin" className="size-5" />,
    <Cpu key="it" className="size-5" />,
    <ShieldCheck key="health" className="size-5" />,
    <Layers key="manu" className="size-5" />,
    <Sparkles key="start" className="size-5" />,
    <Briefcase key="eng" className="size-5" />,
  ];

  return (
    <section className="section bg-[#030712] text-white">
      <div className="site-container">
        <div className="text-center">
          <p className="eyebrow mx-auto justify-center">INDUSTRIES WE SERVE</p>
          <h2 className="section-title mt-2">Trusted Across Global Sectors.</h2>
          <p className="section-copy mx-auto mt-3 max-w-xl">
            Our expertise spans across diverse sectors, delivering tailored solutions that address unique enterprise
            challenges.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-7"
            >
              <div className="flex size-11 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-[#00D1FF]">
                {industryIcons[i % industryIcons.length]}
              </div>
              <h3 className="mt-5 text-base font-bold text-white">{ind.name}</h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">{ind.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProvenApproachSection() {
  return (
    <section className="section bg-[#02050f] text-white border-y border-white/10">
      <div className="site-container">
        <div className="text-center">
          <p className="eyebrow mx-auto justify-center">OUR METHODOLOGY</p>
          <h2 className="section-title mt-2">A Proven Approach to Delivering Excellence.</h2>
          <p className="section-copy mx-auto mt-3 max-w-xl">
            Our structured methodology ensures consistent, high-quality outcomes for every project we undertake.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {provenApproach.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-7"
            >
              <span className="font-mono text-3xl font-black text-[#00D1FF]">{step.number}</span>
              <h3 className="mt-4 text-base font-bold text-white">{step.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyChooseUsSection() {
  return (
    <section className="section bg-[#030712] text-white">
      <div className="site-container grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow">WHY CHOOSE US</p>
          <h2 className="section-title mt-2">
            We don’t just deliver services — <br />
            We build enduring partnerships.
          </h2>
          <p className="section-copy mt-4">
            Our solutions are engineered for long-term profitability and reliability. We focus on optimizing operational
            efficiency while reducing technical debt, ensuring your digital evolution translates into measurable growth.
          </p>
          <div className="mt-8 space-y-4">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="flex gap-4 items-start">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-[#00D1FF] mt-0.5">
                  <Check className="size-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="glass-card p-8 sm:p-10 border-cyan-500/30 shadow-[0_0_40px_rgba(0,209,255,0.12)]">
            <span className="inline-block rounded-full bg-cyan-500/20 px-3 py-1 text-[11px] font-bold text-[#00D1FF]">
              GLOBAL EXCELLENCE
            </span>
            <h3 className="mt-4 text-2xl font-bold text-white">Empowering 10,000+ Global Partners</h3>
            <p className="mt-3 text-xs leading-relaxed text-zinc-300">
              Trusted by Fortune 500 organizations, government institutions, and innovative enterprises across the USA,
              India, Canada, the UK, and Australia.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
              <div>
                <div className="text-2xl font-black text-[#00D1FF]">2005</div>
                <div className="text-[11px] text-zinc-400">Founded in USA</div>
              </div>
              <div>
                <div className="text-2xl font-black text-[#00D1FF]">10,000+</div>
                <div className="text-[11px] text-zinc-400">Global Workforce</div>
              </div>
              <div>
                <div className="text-2xl font-black text-[#00D1FF]">100%</div>
                <div className="text-[11px] text-zinc-400">Client IP Ownership</div>
              </div>
              <div>
                <div className="text-2xl font-black text-[#00D1FF]">24/7</div>
                <div className="text-[11px] text-zinc-400">Global Support SLA</div>
              </div>
            </div>
            <Button
              asChild
              className="mt-8 h-12 w-full rounded-xl bg-gradient-to-r from-[#00D1FF] to-[#05a2c9] text-black font-bold text-xs shadow-lg shadow-cyan-500/20"
            >
              <Link to="/contact">Discuss Your Project</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Clients({ full = false }: { full?: boolean }) {
  return (
    <section className="section bg-[#02050f] text-white">
      <div className="site-container">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">CLIENT SUCCESS &amp; EXCELLENCE</p>
            <h2 className="section-title mt-2">Trusted by Fortune 500 &amp; Industry Leaders.</h2>
            <p className="section-copy mt-3">
              Partnering with world-class organizations to deliver cutting-edge IT excellence, digital engineering, and
              workforce solutions.
            </p>
          </div>
          {!full && (
            <Button asChild variant="link" className="px-0 text-xs font-bold text-[#00D1FF] hover:text-white">
              <Link to="/clients">
                View all 20+ partners <ArrowRight className="size-4 ml-1" />
              </Link>
            </Button>
          )}
        </div>

        {/* Infinite Logo Marquee */}
        <ClientMarquee />

        {/* 4 Pillars Section */}
        <div className="mt-14 border-t border-white/10 pt-12">
          <div className="text-center max-w-xl mx-auto mb-10">
            <p className="eyebrow justify-center mx-auto">FOUR CORE PILLARS</p>
            <h3 className="text-2xl font-bold text-white mt-2">Our Relationship with Every Client</h3>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {clientPillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex size-11 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-[#00D1FF]">
                  <ShieldCheck className="size-5" />
                </div>
                <h4 className="mt-4 text-base font-bold text-white">{pillar.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
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
    <section className="section bg-[#030712] text-white">
      <div className="site-container space-y-16">
        {/* Intro */}
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div className="relative overflow-hidden rounded-3xl border border-white/15 shadow-2xl group">
            <img
              className="editorial-image h-[320px] sm:h-[420px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              src={team}
              alt="TP iT GROUP LLC global engineering team"
              width={1536}
              height={1024}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent" />
          </div>

          <div>
            <p className="eyebrow">GROW WITH US</p>
            <h2 className="section-title mt-2">
              Build Your Future with a <br className="hidden sm:inline" />
              Global Technology Leader.
            </h2>
            <p className="section-copy mt-5">
              Join TP IT Group LLC and work on cutting-edge projects with world-class clients across 5 continents. We
              foster an environment where curiosity is rewarded, continuous learning is in our DNA, and leadership is
              nurtured.
            </p>
            <div className="mt-6 space-y-3.5">
              {careersBenefits.map((b) => (
                <div key={b.title} className="flex items-start gap-3">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-[#00D1FF] mt-0.5">
                    <Check className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{b.title}</h4>
                    <p className="text-xs text-zinc-400">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            {!full && (
              <Button
                asChild
                className="mt-8 h-12 rounded-xl bg-white/10 px-6 text-xs font-bold text-white border border-white/15 backdrop-blur-md hover:bg-white/15 hover:border-[#00D1FF]/40 transition-all"
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
          <div className="space-y-10 border-t border-white/10 pt-12">
            <div>
              <p className="eyebrow">OPEN POSITIONS</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">Find Your Next Challenge</h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2">
                Explore current engineering, consulting, and management roles across USA, India, and Canada.
              </p>
            </div>

            {/* Department Filter */}
            <div className="flex flex-wrap gap-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`rounded-xl px-4 py-2 text-xs font-semibold transition backdrop-blur-md ${
                    selectedDept === dept
                      ? 'border border-[#00D1FF] bg-[#00D1FF]/15 text-[#00D1FF] shadow-[0_0_15px_rgba(0,209,255,0.25)]'
                      : 'border border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>

            {/* Job Openings Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {filteredJobs.map((job) => (
                <article
                  key={job.title}
                  className="glass-card flex flex-col justify-between p-7"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="rounded-md border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-[11px] font-bold text-[#00D1FF]">
                        {job.dept}
                      </span>
                      <span className="text-xs font-medium text-zinc-400">{job.type}</span>
                    </div>
                    <h4 className="mt-3 text-lg font-bold text-white">{job.title}</h4>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-zinc-400">
                      <MapPin className="size-3.5 text-[#00D1FF]" /> {job.location}
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-zinc-300">{job.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <Button
                      asChild
                      size="sm"
                      className="rounded-xl bg-gradient-to-r from-[#00D1FF] to-[#05a2c9] text-black font-bold text-xs"
                    >
                      <a
                        href={`mailto:${companyInfo.email}?subject=Application for ${encodeURIComponent(job.title)} (${encodeURIComponent(job.location)})`}
                      >
                        Apply Now <ArrowUpRight className="size-3.5 ml-1" />
                      </a>
                    </Button>
                    <span className="text-[11px] text-zinc-400">Immediate Opening</span>
                  </div>
                </article>
              ))}
            </div>

            {/* General Application Banner */}
            <div className="glass-card p-8 sm:p-12 text-center border-cyan-500/20">
              <h4 className="text-2xl font-bold text-white">Don’t see the right fit?</h4>
              <p className="mx-auto mt-2 max-w-lg text-xs sm:text-sm text-zinc-300">
                Send us your resume anyway and we will keep you in mind for future roles across our global teams.
              </p>
              <Button
                asChild
                className="mt-6 h-12 rounded-xl bg-white text-black font-bold text-xs hover:bg-zinc-100"
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
    <section className="section bg-[#02050f] text-white border-t border-white/10">
      <div className="site-container">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow">INSIGHTS &amp; PERSPECTIVES</p>
            <h2 className="section-title mt-2">Industry Insights &amp; Innovation.</h2>
          </div>
          {!full && (
            <Button asChild variant="link" className="px-0 text-xs font-bold text-[#00D1FF] hover:text-white">
              <Link to="/blogs">
                View all articles <ArrowRight className="size-4 ml-1" />
              </Link>
            </Button>
          )}
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {articles.map((article) => (
            <article className="glass-card overflow-hidden flex flex-col justify-between" key={article.slug}>
              <div>
                <Link to="/blogs/$slug" params={{ slug: article.slug }}>
                  <img
                    className="editorial-image h-48 w-full object-cover"
                    src={article.image}
                    alt={article.title}
                    width={1536}
                    height={1024}
                    loading="lazy"
                  />
                </Link>
                <div className="p-6">
                  <p className="text-[10px] font-bold tracking-wider text-[#00D1FF] uppercase">
                    {article.category}
                  </p>
                  <h3 className="mt-3 text-base font-bold text-white leading-snug">
                    <Link to="/blogs/$slug" params={{ slug: article.slug }}>
                      {article.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-400 line-clamp-3">
                    {article.summary}
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Button asChild variant="link" className="h-auto p-0 text-xs font-bold text-[#00D1FF] hover:text-white">
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
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-xs font-semibold text-zinc-300">
          Full Name *
          <input
            required
            name="name"
            autoComplete="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="John Doe"
            className="contact-field mt-2"
          />
        </label>
        <label className="text-xs font-semibold text-zinc-300">
          Corporate Email *
          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="john@company.com"
            className="contact-field mt-2"
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-xs font-semibold text-zinc-300">
          Phone Number
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+1 (814) 844-1361"
            className="contact-field mt-2"
          />
        </label>
        <label className="text-xs font-semibold text-zinc-300">
          Service Requirement
          <select
            name="service"
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="contact-field mt-2 bg-[#0a1020]"
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

      <label className="text-xs font-semibold text-zinc-300">
        Project Objectives &amp; Requirements *
        <textarea
          required
          name="message"
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Please describe your digital goals, timeline, and technical scope..."
          className="contact-field mt-2 resize-y"
        />
      </label>

      <Button
        type="submit"
        className="h-12 w-fit rounded-xl bg-gradient-to-r from-[#00D1FF] to-[#05a2c9] px-8 text-xs font-bold text-black shadow-lg shadow-cyan-500/20"
      >
        Submit Request <ArrowUpRight className="size-4 ml-1" />
      </Button>

      {notice && (
        <div role="status" className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-300">
          <strong>Thank you!</strong> Your enquiry has been received. A TP iT GROUP LLC enterprise consultant will reach
          out to <strong>{formData.email || 'you'}</strong> shortly.
        </div>
      )}
    </form>
  );
}

export function Contact() {
  return (
    <section className="section bg-[#030712] text-white">
      <div className="site-container grid gap-14 lg:grid-cols-2 items-start">
        <div>
          <p className="eyebrow">START A CONVERSATION</p>
          <h2 className="section-title mt-2">Let’s connect.</h2>
          <p className="section-copy mt-4 max-w-lg">
            Ready to accelerate your digital transformation? TP IT GROUP LLC provides world-class technology and
            enterprise IT solutions globally.
          </p>

          <div className="mt-10 space-y-6">
            <div className="glass-card flex gap-4 p-5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-[#00D1FF]">
                <MapPin className="size-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">USA Head Office</h3>
                <p className="text-xs text-zinc-300 mt-1">{companyInfo.headOffice.fullAddress}</p>
                <p className="text-[11px] font-semibold text-[#00D1FF] mt-1 uppercase tracking-wider">
                  Branch Hubs: {companyInfo.branchOffices}
                </p>
              </div>
            </div>

            <div className="glass-card flex gap-4 p-5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-[#00D1FF]">
                <Mail className="size-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Corporate Email</h3>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="text-xs text-zinc-300 hover:text-[#00D1FF] transition mt-1 block font-mono"
                >
                  {companyInfo.email}
                </a>
              </div>
            </div>

            <div className="glass-card flex gap-4 p-5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-[#00D1FF]">
                <Phone className="size-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Phone Support</h3>
                <a
                  href={`tel:${companyInfo.phone.replace(/[^0-9+]/g, '')}`}
                  className="text-xs text-zinc-300 hover:text-[#00D1FF] transition mt-1 block font-mono"
                >
                  {companyInfo.phone}
                </a>
              </div>
            </div>

            <div className="glass-card flex gap-4 p-5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-[#00D1FF]">
                <Clock className="size-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Global Operations</h3>
                <p className="text-xs text-zinc-300 mt-1">{companyInfo.workingHours}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-8 md:p-10 border-cyan-500/20">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

export function ContactBanner() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-[#02050f] py-16 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(0,209,255,0.1),transparent)]" />
      <div className="site-container relative z-10 flex flex-wrap items-center justify-between gap-6">
        <div className="max-w-xl">
          <p className="eyebrow">READY TO PARTNER WITH TP IT GROUP?</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Let’s explore what’s possible.
          </h2>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-400">
            Schedule a confidential discovery session with our senior digital architects and workforce strategists.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button
            asChild
            className="h-12 rounded-xl bg-gradient-to-r from-[#00D1FF] to-[#05a2c9] px-7 text-xs font-bold text-black shadow-lg shadow-cyan-500/20"
          >
            <Link to="/contact">
              Get in Touch <ArrowUpRight className="size-4 ml-1" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-12 rounded-xl border-white/15 bg-white/5 px-7 text-xs font-bold text-white hover:bg-white/10"
          >
            <Link to="/services">Explore Capabilities</Link>
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
        <h1 className="mt-2 text-3xl sm:text-5xl font-extrabold tracking-tight text-white">{title}</h1>
        <p className="section-copy mt-4 max-w-2xl text-zinc-300">{description}</p>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="site-container">
        <div className="grid gap-10 pb-14 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr]">
          <div>
            <Link to="/" className="brand-name inline-flex items-center" aria-label="TP iT GROUP LLC Home">
              <TPITLogo className="h-7 sm:h-8 md:h-9 max-w-[260px] sm:max-w-none w-auto" inverted />
            </Link>
            <p className="mt-5 max-w-sm text-xs leading-6 text-zinc-400">
              {companyInfo.tagline}. Delivering excellence in digital engineering, cloud architecture, SAP solutions,
              and strategic workforce solutions since {companyInfo.establishedYear}.
            </p>
            <div className="mt-6 flex gap-2">
              <Button
                asChild
                variant="outline"
                size="icon"
                title="LinkedIn"
                aria-label="LinkedIn"
                className="size-9 rounded-xl border-white/15 bg-white/5 text-white hover:border-[#00D1FF] hover:bg-white/10"
              >
                <a href={companyInfo.social.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="size-4" />
                </a>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Quick Links</h3>
            <div className="mt-5 flex flex-col gap-3 text-xs text-zinc-400">
              <Link to="/" className="hover:text-white transition">Home</Link>
              <Link to="/about" className="hover:text-white transition">About us</Link>
              <Link to="/services" className="hover:text-white transition">Services</Link>
              <Link to="/clients" className="hover:text-white transition">Clients</Link>
              <Link to="/careers" className="hover:text-white transition">Careers</Link>
              <Link to="/contact" className="hover:text-white transition">Contact Us</Link>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Our Services</h3>
            <div className="mt-5 flex flex-col gap-3 text-xs text-zinc-400">
              {services.map((s) => (
                <Link key={s.id} to="/services" className="hover:text-white transition">
                  {s.shortTitle}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Global Headquarters</h3>
            <div className="mt-5 space-y-3 text-xs text-zinc-400">
              <p className="flex items-start gap-2">
                <MapPin className="size-4 shrink-0 text-[#00D1FF] mt-0.5" />
                <span>{companyInfo.headOffice.fullAddress}</span>
              </p>
              <p className="text-[11px] text-[#00D1FF] font-medium pl-6">
                Branch Hubs: {companyInfo.branchOffices}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="size-4 shrink-0 text-[#00D1FF]" />
                <a href={`mailto:${companyInfo.email}`} className="hover:text-white transition font-mono">
                  {companyInfo.email}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-[#00D1FF]" />
                <a href={`tel:${companyInfo.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white transition font-mono">
                  {companyInfo.phone}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-5 border-t border-white/10 py-6 text-[11px] text-zinc-500">
          <span>© 2026 TP IT GROUP LLC. All rights reserved.</span>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
