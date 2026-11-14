import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Instagram,
  Facebook,
  Target,
  Compass,
  CheckCircle2,
  ShieldCheck,
  Users,
  Globe2,
  Briefcase,
  Award,
  Clock,
  Sparkles,
  Server,
  Cloud,
  Code2,
  Headphones,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  headquarters,
  team,
  infrastructure,
  articles,
  companyInfo,
  stats,
  services,
  clientLogos,
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
          className="brand-name flex items-center"
          onClick={() => setOpen(false)}
          aria-label="TP iT GROUP LLC Home"
        >
          <TPITLogo className="h-7 sm:h-8 md:h-9 max-w-[220px] sm:max-w-none w-auto" />
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-6 lg:gap-8 md:flex">
          {nav.map((item) => {
            if (item.label === 'Contact Us') {
              return (
                <Button asChild key={item.to} className="ml-2 h-10 rounded-xl px-5 text-xs font-semibold">
                  <Link to={item.to}>
                    {item.label} <ArrowUpRight className="size-3.5" />
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
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <nav
          aria-label="Mobile navigation"
          className="absolute left-0 top-full flex w-full flex-col border-b border-border bg-background px-6 py-6 shadow-lg md:hidden"
        >
          {nav.map((item) => {
            if (item.label === 'Contact Us') {
              return (
                <Button asChild key={item.to} className="mt-4 h-11 w-full rounded-xl text-xs font-semibold">
                  <Link to={item.to} onClick={() => setOpen(false)}>
                    {item.label} <ArrowUpRight className="size-3.5" />
                  </Link>
                </Button>
              );
            }
            return (
              <Link
                key={item.to}
                to={item.to}
                className="nav-link py-2"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}

const slides = [headquarters, infrastructure, team];
const capabilityTags = [
  'Cloud',
  'ERP',
  'SAP',
  'Custom Applications',
  'Enterprise Solutions',
  'Workforce Solutions',
] as const;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), 6500);
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <section className="hero" aria-roledescription="carousel" aria-label="TP iT GROUP LLC highlights">
      {/* Carousel Background Images */}
      {slides.map((imgSrc, i) => (
        <img
          key={imgSrc}
          src={imgSrc}
          alt={
            [
              'Contemporary glass office architecture',
              'Modern industrial infrastructure',
              'Professionals collaborating in a workplace',
            ][i]
          }
          className={`hero-image ${index === i ? 'current' : ''}`}
          width={1920}
          height={1024}
          loading={i === 0 ? 'eager' : 'lazy'}
        />
      ))}

      {/* Subtle Blueprint Grid & Ambient Glow Accents */}
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow-left" aria-hidden="true" />
      <div className="hero-glow-right" aria-hidden="true" />

      <div className="site-container hero-content">
        {/* Badge / Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50/90 px-4 py-1.5 text-[11px] font-bold tracking-wider text-cyan-600 shadow-xs">
          <span className="size-2 rounded-full bg-cyan-500 animate-pulse" />
          GLOBAL IT SOLUTIONS PARTNER
        </div>

        {/* Main Quotation / Headline */}
        <h1 className="mt-6 max-w-5xl text-center text-3xl font-extrabold tracking-tight text-zinc-900 leading-[1.15] sm:text-5xl md:text-6xl lg:text-[62px]">
          Transforming Business with{' '}
          <span className="text-[#05a2c9]">Digital Engineering</span>{' '}
          <span className="text-zinc-900">&amp;</span>{' '}
          <span className="text-[#c88a09]">Enterprise Strategy</span>
        </h1>

        {/* Subheadline / Copy */}
        <p className="mt-6 max-w-3xl text-center text-sm font-normal leading-relaxed text-zinc-600 sm:text-base md:text-lg">
          A global technology powerhouse delivering next-gen IT services, deep-tech engineering, and strategic workforce
          solutions across USA, India, UK, Australia, and Canada.
        </p>

        {/* Technology Capability Tags */}
        <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3 max-w-4xl">
          {capabilityTags.map((tag) => (
            <span
              key={tag}
              className="rounded-xl border border-zinc-200/90 bg-zinc-50/90 px-3.5 py-1.5 text-xs font-medium text-zinc-700 shadow-xs transition hover:border-zinc-300 hover:bg-white sm:px-4 sm:py-2 sm:text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-9 flex flex-wrap justify-center gap-3.5 sm:gap-4">
          <Button
            asChild
            className="h-12 rounded-xl bg-zinc-900 px-7 text-xs sm:text-sm font-semibold text-white shadow-md transition hover:bg-zinc-800"
          >
            <Link to="/services" className="inline-flex items-center gap-2">
              Explore Our Services <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-12 rounded-xl border-zinc-200 bg-white px-7 text-xs sm:text-sm font-semibold text-zinc-900 shadow-xs transition hover:bg-zinc-50 hover:text-zinc-950"
          >
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>

        {/* Carousel Controls */}
        <div className="hero-controls">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] tabular-nums text-zinc-500 font-medium">
              0{index + 1} <span className="opacity-40">/ 03</span>
            </span>
            <div className="flex gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-pressed={index === i}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === i ? 'w-6 bg-zinc-900' : 'w-2 bg-zinc-300 hover:bg-zinc-400'
                  }`}
                />
              ))}
            </div>
            <div className="ml-2 flex items-center gap-0.5">
              <Button
                variant="ghost"
                size="icon"
                className="size-7 rounded-full text-zinc-600 hover:bg-zinc-200/70"
                aria-label="Previous slide"
                onClick={() => setIndex((i) => (i + 2) % slides.length)}
              >
                <ChevronLeft className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="size-7 rounded-full text-zinc-600 hover:bg-zinc-200/70"
                aria-label={paused ? 'Play carousel' : 'Pause carousel'}
                onClick={() => setPaused(!paused)}
              >
                {paused ? <Play className="size-3" /> : <Pause className="size-3" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="size-7 rounded-full text-zinc-600 hover:bg-zinc-200/70"
                aria-label="Next slide"
                onClick={() => setIndex((i) => (i + 1) % slides.length)}
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function StatsSection() {
  return (
    <section className="border-b border-border bg-white py-12">
      <div className="site-container">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl md:text-5xl">
                {item.value}
              </div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function About({ detailed = false }: { detailed?: boolean }) {
  return (
    <section className="section">
      <div className="site-container space-y-16">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <p className="eyebrow text-muted-foreground">YOUR TRUSTED TECHNOLOGY PARTNER</p>
            <h2 className="section-title mt-2">
              Building the Future of <br className="hidden sm:inline" />
              Enterprise Technology.
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-zinc-600 sm:text-base">
              <p>
                At <strong>TP IT Group LLC</strong>, we believe in the power of digital to transform businesses for the
                better. Since 2005, our global technology firm has combined creativity and innovative engineering to
                deliver industry-leading digital solutions.
              </p>
              <p>
                TP IT Group&apos;s progressive technologies and optimization strategies span end-to-end Artificial
                Intelligence, Consulting, Digital, Cloud &amp; DevOps, Data, and Software Engineering, servicing an array
                of noteworthy financial services and technology firms.
              </p>
              {detailed && (
                <>
                  <p>
                    Through research and development initiatives in our <strong>FinLabs</strong>, we develop solutions
                    for modernization—from Artificial Intelligence and Blockchain to Data Science models, Digital
                    Underwriting, and mobile-first applications.
                  </p>
                  <p>
                    Over the last 20+ years, our company has been honored with multiple employer awards, recognizing our
                    commitment to our talented teams. With top clients across 5 continents, TP IT Group has a global
                    workforce of 10,000+ and offices in key global markets.
                  </p>
                </>
              )}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                'Innovation-driven solutions',
                'Client-focused approach',
                'Global expertise, local execution',
                '24/7 dedicated support',
              ].map((point) => (
                <div key={point} className="flex items-center gap-2 text-xs font-medium text-zinc-800">
                  <CheckCircle2 className="size-4 shrink-0 text-[#05a2c9]" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            {!detailed && (
              <Button asChild className="mt-8 h-11 rounded-xl px-6 text-xs font-semibold">
                <Link to="/about">
                  Learn More About Us <ArrowRight className="size-4" />
                </Link>
              </Button>
            )}
          </div>

          <div>
            <div className="relative overflow-hidden rounded-3xl border border-border shadow-lg">
              <img
                className="about-photo h-[340px] sm:h-[420px] w-full object-cover"
                src={headquarters}
                alt="TP iT GROUP LLC Corporate Headquarters"
                width={1536}
                height={1024}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-300">GLOBAL HEADQUARTERS</p>
                <p className="mt-1 text-sm font-semibold">{companyInfo.headOffice.fullAddress}</p>
                <p className="text-xs text-white/80">Branch Offices: {companyInfo.branchOffices}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed View Sections */}
        {detailed && (
          <div className="space-y-20 pt-8 border-t border-border">
            {/* Core Values */}
            <div>
              <div className="text-center">
                <p className="eyebrow mx-auto justify-center text-muted-foreground">CORE VALUES</p>
                <h2 className="section-title mt-2">What Drives Our Work</h2>
                <p className="section-copy mx-auto mt-3 max-w-xl">
                  Our values shape every interaction, decision, and solution we deliver to global clients.
                </p>
              </div>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {coreValues.map((val) => (
                  <article
                    key={val.title}
                    className="rounded-2xl border border-border bg-card p-6 shadow-xs transition hover:shadow-md"
                  >
                    <div className="flex size-10 items-center justify-center rounded-xl bg-cyan-50 text-[#05a2c9]">
                      <Sparkles className="size-5" />
                    </div>
                    <h3 className="mt-5 text-base font-bold text-foreground">{val.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{val.desc}</p>
                  </article>
                ))}
              </div>
            </div>

            {/* Milestones / Journey */}
            <div>
              <div className="text-center">
                <p className="eyebrow mx-auto justify-center text-muted-foreground">OUR JOURNEY</p>
                <h2 className="section-title mt-2">Milestones of Progress</h2>
                <p className="section-copy mx-auto mt-3 max-w-xl">
                  A legacy of continuous growth, technological innovation, and client partnerships since 2005.
                </p>
              </div>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {milestones.map((m) => (
                  <div
                    key={m.title}
                    className="rounded-2xl border border-border bg-background p-6 shadow-xs transition hover:border-cyan-300"
                  >
                    <span className="inline-block rounded-full bg-cyan-100 px-3 py-1 text-[11px] font-bold text-cyan-800">
                      {m.year}
                    </span>
                    <h3 className="mt-4 text-base font-bold text-foreground">{m.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{m.desc}</p>
                  </div>
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
  const serviceIcons = [Cloud, Server, Code2, Headphones, Users];

  return (
    <section className="section bg-muted/60">
      <div className="site-container">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow text-muted-foreground">OUR SERVICES</p>
            <h2 className="section-title mt-2">Comprehensive IT Solutions for Global Enterprises.</h2>
            <p className="section-copy mt-3">
              From cloud infrastructure to custom development, we provide end-to-end technology solutions that power
              business growth across 5 continents.
            </p>
          </div>
          {!full && (
            <Button asChild variant="link" className="px-0 text-xs font-semibold">
              <Link to="/services">
                Explore all services <ArrowRight className="size-4" />
              </Link>
            </Button>
          )}
        </div>

        {/* Home Overview Grid (5 services) */}
        {!full && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const IconComponent = serviceIcons[i % serviceIcons.length];
              return (
                <article
                  key={service.id}
                  className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-7 shadow-xs transition duration-300 hover:border-cyan-400 hover:shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex size-12 items-center justify-center rounded-xl bg-cyan-50 text-[#05a2c9] transition group-hover:bg-[#05a2c9] group-hover:text-white">
                        <IconComponent className="size-6" />
                      </div>
                      <span className="font-mono text-xs font-bold text-muted-foreground">0{i + 1}</span>
                    </div>
                    <h3 className="mt-6 text-lg font-bold text-foreground">{service.title}</h3>
                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{service.summary}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-border">
                    <Button asChild variant="link" className="h-auto p-0 text-xs font-semibold text-primary">
                      <Link to="/services">
                        Learn Capabilities <ArrowUpRight className="size-3.5" />
                      </Link>
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Detailed Services Page View */}
        {full && (
          <div className="space-y-12">
            <div className="grid gap-8 lg:grid-cols-2">
              {services.map((service, i) => {
                const IconComponent = serviceIcons[i % serviceIcons.length];
                return (
                  <article
                    key={service.id}
                    className="flex flex-col justify-between rounded-3xl border border-border bg-card p-8 shadow-xs transition hover:shadow-lg"
                  >
                    <div>
                      <div className="flex items-center gap-4">
                        <div className="flex size-14 items-center justify-center rounded-2xl bg-cyan-50 text-[#05a2c9]">
                          <IconComponent className="size-7" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                            SERVICE 0{i + 1}
                          </span>
                          <h3 className="text-xl font-bold text-foreground">{service.title}</h3>
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-zinc-600">{service.desc}</p>
                      <div className="mt-6 space-y-2.5">
                        <p className="text-xs font-bold uppercase tracking-wider text-zinc-900">Key Offerings:</p>
                        <ul className="grid gap-2 sm:grid-cols-2">
                          {service.offers.map((offer) => (
                            <li key={offer} className="flex items-start gap-2 text-xs text-zinc-600">
                              <Check className="size-3.5 mt-0.5 shrink-0 text-[#05a2c9]" />
                              <span>{offer}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
                      <Button asChild className="h-10 rounded-xl px-5 text-xs font-semibold">
                        <Link to="/contact">Request Proposal</Link>
                      </Button>
                      <span className="text-[11px] font-semibold text-muted-foreground">24/7 Global SLA Support</span>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Enterprise Commitments */}
            <div className="rounded-3xl border border-border bg-card p-8 md:p-12 shadow-sm">
              <div className="max-w-2xl">
                <p className="eyebrow text-muted-foreground">ENTERPRISE COMMITMENTS</p>
                <h3 className="text-2xl font-bold text-foreground mt-2">Quality &amp; Delivery Standards</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Every engagement with TP iT GROUP LLC includes a comprehensive suite of professional deliverables
                  designed for enterprise scalability and governance.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-2.5">
                {enterpriseDeliverables.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2 text-xs font-medium text-foreground shadow-xs"
                  >
                    <CheckCircle2 className="size-3.5 text-[#05a2c9]" />
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
  return (
    <section className="section bg-background">
      <div className="site-container">
        <div className="text-center">
          <p className="eyebrow mx-auto justify-center text-muted-foreground">INDUSTRIES WE SERVE</p>
          <h2 className="section-title mt-2">Trusted Across Global Sectors.</h2>
          <p className="section-copy mx-auto mt-3 max-w-xl">
            Our expertise spans across diverse sectors, delivering tailored solutions that address unique enterprise
            challenges.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind) => (
            <div
              key={ind.name}
              className="rounded-2xl border border-border bg-card p-7 shadow-xs transition duration-300 hover:border-cyan-300 hover:shadow-md"
            >
              <div className="flex size-10 items-center justify-center rounded-xl bg-cyan-50 text-[#05a2c9]">
                <Globe2 className="size-5" />
              </div>
              <h3 className="mt-5 text-base font-bold text-foreground">{ind.name}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{ind.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProvenApproachSection() {
  return (
    <section className="section bg-muted/40 border-y border-border">
      <div className="site-container">
        <div className="text-center">
          <p className="eyebrow mx-auto justify-center text-muted-foreground">OUR METHODOLOGY</p>
          <h2 className="section-title mt-2">A Proven Approach to Delivering Excellence.</h2>
          <p className="section-copy mx-auto mt-3 max-w-xl">
            Our structured methodology ensures consistent, high-quality outcomes for every project we undertake.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {provenApproach.map((step) => (
            <div
              key={step.number}
              className="relative rounded-2xl border border-border bg-card p-7 shadow-xs transition hover:shadow-md"
            >
              <span className="font-mono text-2xl font-black text-cyan-600">{step.number}</span>
              <h3 className="mt-4 text-base font-bold text-foreground">{step.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyChooseUsSection() {
  return (
    <section className="section bg-background">
      <div className="site-container grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow text-muted-foreground">WHY CHOOSE US</p>
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
              <div key={item.title} className="flex gap-4">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-[#05a2c9]">
                  <Check className="size-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="rounded-3xl border border-border bg-zinc-900 p-8 text-white shadow-xl sm:p-10">
            <span className="inline-block rounded-full bg-cyan-500/20 px-3 py-1 text-[11px] font-bold text-cyan-300">
              GLOBAL EXCELLENCE
            </span>
            <h3 className="mt-4 text-2xl font-bold">Empowering 10,000+ Global Partners</h3>
            <p className="mt-3 text-xs leading-relaxed text-white/70">
              Trusted by Fortune 500 organizations, government institutions, and innovative enterprises across the USA,
              India, Canada, the UK, and Australia.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
              <div>
                <div className="text-2xl font-bold text-cyan-400">2005</div>
                <div className="text-[11px] text-white/60">Founded in USA</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-400">10,000+</div>
                <div className="text-[11px] text-white/60">Global Workforce</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-400">100%</div>
                <div className="text-[11px] text-white/60">Client IP Ownership</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-400">24/7</div>
                <div className="text-[11px] text-white/60">Global Support SLA</div>
              </div>
            </div>
            <Button asChild className="mt-8 h-11 w-full rounded-xl bg-white text-zinc-900 hover:bg-zinc-100 font-semibold text-xs">
              <Link to="/contact">Discuss Your Project</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Clients({ full = false }: { full?: boolean }) {
  const displayLogos = full ? clientLogos : clientLogos.slice(0, 10);

  return (
    <section className="section bg-muted/40">
      <div className="site-container">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow text-muted-foreground">CLIENTS &amp; PARTNERSHIPS</p>
            <h2 className="section-title mt-2">Trusted by Fortune 500 &amp; Industry Leaders.</h2>
            <p className="section-copy mt-3">
              Partnering with world-class organizations to deliver cutting-edge IT excellence, digital engineering, and
              workforce solutions.
            </p>
          </div>
          {!full && (
            <Button asChild variant="link" className="px-0 text-xs font-semibold">
              <Link to="/clients">
                View all 20+ partners <ArrowRight className="size-4" />
              </Link>
            </Button>
          )}
        </div>

        {/* Client Logos Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5">
          {displayLogos.map((client) => (
            <div
              key={client.name}
              className="group flex h-28 items-center justify-center rounded-2xl border border-border bg-card p-5 shadow-xs transition duration-300 hover:border-cyan-400 hover:shadow-md"
            >
              <img
                src={client.src}
                alt={client.name}
                className="max-h-14 max-w-full object-contain grayscale opacity-80 transition duration-300 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* 4 Pillars Section */}
        <div className="mt-16 border-t border-border pt-12">
          <div className="text-center max-w-xl mx-auto mb-10">
            <p className="eyebrow justify-center mx-auto text-muted-foreground">FOUR CORE PILLARS</p>
            <h3 className="text-2xl font-bold text-foreground mt-2">Our Relationship with Every Client</h3>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {clientPillars.map((pillar) => (
              <div key={pillar.title} className="rounded-2xl border border-border bg-card p-6 shadow-xs">
                <div className="flex size-10 items-center justify-center rounded-xl bg-cyan-50 text-[#05a2c9]">
                  <ShieldCheck className="size-5" />
                </div>
                <h4 className="mt-4 text-base font-bold text-foreground">{pillar.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Careers({ full = false }: { full?: boolean }) {
  const [selectedDept, setSelectedDept] = useState('All');
  const departments = ['All', 'Cloud Operations', 'Engineering', 'FinLabs', 'Enterprise Solutions', 'Digital Experience', 'Management'];

  const filteredJobs =
    selectedDept === 'All' ? careersJobs : careersJobs.filter((j) => j.dept === selectedDept);

  return (
    <section className="section bg-background">
      <div className="site-container space-y-16">
        {/* Intro */}
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <img
            className="editorial-image h-[320px] sm:h-[400px] w-full rounded-3xl object-cover shadow-lg"
            src={team}
            alt="TP iT GROUP LLC global engineering team"
            width={1536}
            height={1024}
            loading="lazy"
          />
          <div>
            <p className="eyebrow text-muted-foreground">GROW WITH US</p>
            <h2 className="section-title mt-2">
              Build Your Future with a <br className="hidden sm:inline" />
              Global Technology Leader.
            </h2>
            <p className="section-copy mt-5">
              Join TP IT Group LLC and work on cutting-edge projects with world-class clients across 5 continents. We
              foster an environment where curiosity is rewarded, continuous learning is in our DNA, and leadership is
              nurtured.
            </p>
            <div className="mt-6 space-y-3">
              {careersBenefits.map((b) => (
                <div key={b.title} className="flex items-start gap-3">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-[#05a2c9] mt-0.5">
                    <Check className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{b.title}</h4>
                    <p className="text-xs text-muted-foreground">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            {!full && (
              <Button asChild className="mt-8 h-11 rounded-xl px-6 text-xs font-semibold">
                <Link to="/careers">
                  View Open Positions ({careersJobs.length}) <ArrowRight className="size-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Detailed Careers View */}
        {full && (
          <div className="space-y-10 border-t border-border pt-12">
            <div>
              <p className="eyebrow text-muted-foreground">OPEN POSITIONS</p>
              <h3 className="text-2xl font-bold text-foreground mt-2">Find Your Next Challenge</h3>
              <p className="text-xs text-muted-foreground mt-2">
                Explore current engineering, consulting, and management roles across USA, India, and Canada.
              </p>
            </div>

            {/* Department Filter */}
            <div className="flex flex-wrap gap-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                    selectedDept === dept
                      ? 'bg-zinc-900 text-white'
                      : 'border border-border bg-card text-muted-foreground hover:bg-muted'
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
                  className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-xs transition hover:border-cyan-400 hover:shadow-md"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="rounded-md bg-cyan-50 px-2.5 py-1 text-[11px] font-bold text-cyan-800">
                        {job.dept}
                      </span>
                      <span className="text-xs font-medium text-muted-foreground">{job.type}</span>
                    </div>
                    <h4 className="mt-3 text-lg font-bold text-foreground">{job.title}</h4>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="size-3.5 text-cyan-600" /> {job.location}
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-zinc-600">{job.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                    <Button asChild size="sm" className="rounded-lg text-xs font-semibold">
                      <a
                        href={`mailto:${companyInfo.email}?subject=Application for ${encodeURIComponent(job.title)} (${encodeURIComponent(job.location)})`}
                      >
                        Apply Now <ArrowUpRight className="size-3.5 ml-1" />
                      </a>
                    </Button>
                    <span className="text-[11px] text-muted-foreground">Immediate Opening</span>
                  </div>
                </article>
              ))}
            </div>

            {/* General Application Banner */}
            <div className="rounded-3xl border border-border bg-muted/60 p-8 text-center sm:p-12">
              <h4 className="text-xl font-bold text-foreground">Don’t see the right fit?</h4>
              <p className="mx-auto mt-2 max-w-lg text-xs text-muted-foreground">
                Send us your resume anyway and we will keep you in mind for future roles across our global teams.
              </p>
              <Button asChild className="mt-6 h-11 rounded-xl px-7 text-xs font-semibold">
                <a href={`mailto:${companyInfo.email}?subject=General%20Application%20-%20TP%20IT%20Group%20LLC`}>
                  Send General Application <Mail className="size-3.5 ml-2" />
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
    <section className="section bg-muted/50 border-t border-border">
      <div className="site-container">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow text-muted-foreground">INSIGHTS &amp; PERSPECTIVES</p>
            <h2 className="section-title mt-2">Industry Insights &amp; Innovation.</h2>
          </div>
          {!full && (
            <Button asChild variant="link" className="px-0 text-xs font-semibold">
              <Link to="/blogs">
                View all articles <ArrowRight className="size-4" />
              </Link>
            </Button>
          )}
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {articles.map((article) => (
            <article className="blog-card bg-background rounded-2xl border border-border overflow-hidden" key={article.slug}>
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
                <p className="text-[10px] font-bold tracking-wider text-cyan-600 uppercase">
                  {article.category}
                </p>
                <h3 className="mt-3 text-base font-bold leading-snug">
                  <Link to="/blogs/$slug" params={{ slug: article.slug }}>
                    {article.title}
                  </Link>
                </h3>
                <p className="section-copy mt-2 text-xs leading-relaxed line-clamp-3">{article.summary}</p>
                <Button asChild variant="link" className="mt-4 h-auto p-0 text-xs font-semibold text-primary">
                  <Link to="/blogs/$slug" params={{ slug: article.slug }}>
                    Read Article <ArrowUpRight className="size-3.5" />
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
        <label className="text-xs font-semibold text-foreground">
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
        <label className="text-xs font-semibold text-foreground">
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
        <label className="text-xs font-semibold text-foreground">
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
        <label className="text-xs font-semibold text-foreground">
          Service Requirement
          <select
            name="service"
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="contact-field mt-2 bg-background"
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

      <label className="text-xs font-semibold text-foreground">
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

      <Button type="submit" className="h-12 w-fit rounded-xl px-8 text-xs font-semibold">
        Submit Request <ArrowUpRight className="size-4 ml-1" />
      </Button>

      {notice && (
        <div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs text-emerald-800">
          <strong>Thank you!</strong> Your enquiry has been received. A TP iT GROUP LLC enterprise consultant will reach
          out to <strong>{formData.email || 'you'}</strong> shortly.
        </div>
      )}
    </form>
  );
}

export function Contact() {
  return (
    <section className="section bg-background">
      <div className="site-container grid gap-14 lg:grid-cols-2">
        <div>
          <p className="eyebrow text-muted-foreground">START A CONVERSATION</p>
          <h2 className="section-title mt-2">Let’s connect.</h2>
          <p className="section-copy mt-4 max-w-lg">
            Ready to accelerate your digital transformation? TP IT GROUP LLC provides world-class technology and
            enterprise IT solutions globally.
          </p>

          <div className="mt-10 space-y-6">
            <div className="flex gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-[#05a2c9]">
                <MapPin className="size-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">USA Head Office</h3>
                <p className="text-xs text-zinc-600 mt-1">{companyInfo.headOffice.fullAddress}</p>
                <p className="text-[11px] font-semibold text-cyan-600 mt-1 uppercase tracking-wider">
                  Branch Offices: {companyInfo.branchOffices}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-[#05a2c9]">
                <Mail className="size-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">Corporate Email</h3>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="text-xs text-zinc-600 hover:text-primary transition mt-1 block"
                >
                  {companyInfo.email}
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-[#05a2c9]">
                <Phone className="size-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">Phone Support</h3>
                <a
                  href={`tel:${companyInfo.phone.replace(/[^0-9+]/g, '')}`}
                  className="text-xs text-zinc-600 hover:text-primary transition mt-1 block"
                >
                  {companyInfo.phone}
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-[#05a2c9]">
                <Clock className="size-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">Global Operations</h3>
                <p className="text-xs text-zinc-600 mt-1">{companyInfo.workingHours}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

export function ContactBanner() {
  return (
    <section className="border-y border-border bg-muted/40 py-16">
      <div className="site-container flex flex-wrap items-center justify-between gap-6">
        <div className="max-w-xl">
          <p className="eyebrow text-muted-foreground">READY TO PARTNER WITH TP IT GROUP?</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Let’s explore what’s possible.
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Schedule a confidential discovery session with our senior digital architects and workforce strategists.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button asChild className="h-12 rounded-xl px-7 text-xs font-semibold">
            <Link to="/contact">
              Get in Touch <ArrowUpRight className="size-4 ml-1" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-12 rounded-xl px-7 text-xs font-semibold">
            <Link to="/services">Explore Services</Link>
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
        <p className="eyebrow text-muted-foreground">{eyebrow}</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
        <p className="section-copy mt-4 max-w-2xl">{description}</p>
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
            <p className="mt-5 max-w-sm text-xs leading-6 text-white/70">
              {companyInfo.tagline}. Delivering excellence in digital engineering, cloud architecture, SAP solutions,
              and strategic workforce solutions since {companyInfo.establishedYear}.
            </p>
            <div className="mt-6 flex gap-2">
              <Button
                asChild
                variant="heroOutline"
                size="icon"
                title="LinkedIn"
                aria-label="LinkedIn"
                className="size-9 rounded-lg"
              >
                <a href={companyInfo.social.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="size-4" />
                </a>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Quick Links</h3>
            <div className="mt-5 flex flex-col gap-3 text-xs text-white/70">
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
            <div className="mt-5 flex flex-col gap-3 text-xs text-white/70">
              {services.map((s) => (
                <Link key={s.id} to="/services" className="hover:text-white transition">
                  {s.shortTitle}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Contact Info</h3>
            <div className="mt-5 space-y-3 text-xs text-white/70">
              <p className="flex items-start gap-2">
                <MapPin className="size-4 shrink-0 text-cyan-400 mt-0.5" />
                <span>{companyInfo.headOffice.fullAddress}</span>
              </p>
              <p className="text-[11px] text-cyan-300 font-medium pl-6">
                Branches: {companyInfo.branchOffices}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="size-4 shrink-0 text-cyan-400" />
                <a href={`mailto:${companyInfo.email}`} className="hover:text-white transition">
                  {companyInfo.email}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-cyan-400" />
                <a href={`tel:${companyInfo.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white transition">
                  {companyInfo.phone}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-5 border-t border-white/10 py-6 text-[11px] text-white/50">
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
