import { createFileRoute, Link } from '@tanstack/react-router';
import { ContactBanner } from '@/components/corporate/sections';
import { metadata, infrastructure } from '@/components/corporate/content';
import {
  Bot,
  Cloud,
  Code2,
  Database,
  Globe,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Compass,
  Briefcase,
  Monitor,
  Pill,
  Factory,
  Rocket,
  HardHat,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const Route = createFileRoute('/services')({
  head: () =>
    metadata(
      'Connected Solutions for Your Next Business Move | TP IT Group LLC',
      'Technology, consulting and IT and non-IT talent—one partner to connect your strategy, systems and people across 5 continents.',
    ),
  component: Page,
});

const connectedCapabilities = [
  {
    number: '01',
    icon: <Cpu className="size-6 text-[#d7192a]" />,
    image: '/capabilities/technology-solutions.jpg',
    title: 'Technology Solutions',
    desc: 'Connect AI, cloud, enterprise applications and secure infrastructure with the way your organization works.',
    items: [
      'AI automation & agents',
      'Cloud migration & modernization',
      'ERP & SAP transformation',
      'Custom software & digital experiences',
    ],
    linkText: 'Explore technology',
    href: '#ai-automation',
  },
  {
    number: '02',
    icon: <Compass className="size-6 text-[#d7192a]" />,
    image: '/capabilities/consulting-services.jpg',
    title: 'Consulting Services',
    desc: 'Bring clarity to technology decisions, process improvement and transformation delivery—from the first assessment to implementation.',
    items: [
      'Technology strategy & roadmaps',
      'Business process improvement',
      'Transformation & delivery advisory',
      'Workforce planning',
    ],
    linkText: 'Explore consulting',
    href: '/consulting',
  },
  {
    number: '03',
    icon: <Briefcase className="size-6 text-[#d7192a]" />,
    image: '/capabilities/talent-solutions.jpg',
    title: 'IT & Non-IT Talent',
    desc: 'Align your skills requirements, team structure and hiring priorities across technical and business operations roles.',
    items: [
      'IT specialists & project teams',
      'Business & operational talent',
      'Contract & permanent hiring needs',
      'Skills planning & team augmentation',
    ],
    linkText: 'Explore talent solutions',
    href: '/talent',
  },
];

const detailedServices = [
  {
    id: 'ai-automation',
    icon: <Bot className="size-6 text-[#d7192a]" />,
    title: 'AI Automation & Agents',
    desc: 'Bring AI into your business with workflow automation, custom AI agents, and end-to-end project setup.',
    offers: [
      'Workflow discovery & automation planning',
      'Custom AI assistants & agents',
      'AI integration with business applications',
      'Knowledge search & document workflows',
      'Human review & access controls',
      'Deployment, evaluation & ongoing improvement',
    ],
  },
  {
    id: 'cloud-migration',
    icon: <Cloud className="size-6 text-[#d7192a]" />,
    title: 'Cloud Migration',
    desc: 'Plan and migrate your infrastructure to AWS, Microsoft Azure, Google Cloud, or Oracle Cloud with a focus on continuity and security.',
    offers: [
      'Cloud readiness assessment',
      'Migration strategy & execution',
      'AWS, Azure, GCP & Oracle Cloud',
      'Hybrid & multi-cloud architecture',
      'Backup & disaster recovery planning',
      'Performance & cloud cost optimization',
    ],
  },
  {
    id: 'it-development',
    icon: <Code2 className="size-6 text-[#d7192a]" />,
    title: 'IT Development',
    desc: 'Turn business requirements into custom software and applications, from initial concept through development, testing, and deployment.',
    offers: [
      'Custom business applications',
      'Enterprise software development',
      'Web & mobile application development',
      'API development & integration',
      'Quality assurance & testing',
      'Application maintenance & enhancements',
    ],
  },
  {
    id: 'erp-sap',
    icon: <Database className="size-6 text-[#d7192a]" />,
    title: 'ERP & SAP Solutions',
    desc: 'Connect your enterprise operations with SAP implementation, ERP integration, migration, and ongoing application support.',
    offers: [
      'SAP S/4HANA implementation',
      'Legacy ERP migration',
      'Business process optimization',
      'Custom ABAP development',
      'SAP Fiori/UI5 development',
      'Data migration & cleansing',
      'Third-party system integration',
      'Training & change management',
    ],
  },
  {
    id: 'web-design',
    icon: <Globe className="size-6 text-[#d7192a]" />,
    title: 'Web Design & Development',
    desc: 'Create modern, responsive websites that reflect your brand, engage your audience, and support your business goals.',
    offers: [
      'Website strategy & information architecture',
      'UI/UX design',
      'Responsive website development',
      'Content management integration',
      'Accessibility & performance optimization',
      'Website maintenance & updates',
    ],
  },
  {
    id: 'networking-security',
    icon: <ShieldCheck className="size-6 text-[#d7192a]" />,
    title: 'Networking & Security',
    desc: 'Build reliable enterprise networks and strengthen cybersecurity to protect your systems, users, and digital assets.',
    offers: [
      'Network design & implementation',
      'Secure connectivity & remote access',
      'Firewall & access control configuration',
      'Security assessments & hardening',
      'Network monitoring & troubleshooting',
      'Business continuity planning',
    ],
  },
];

const industries = [
  {
    name: 'Financial Services',
    desc: 'MODERN DIGITAL BANKING & FINTECH',
    icon: <Briefcase className="size-6 text-white stroke-[2.2]" />,
    image: '/industries/financial-services.jpg',
  },
  {
    name: 'IT Companies',
    desc: 'ENTERPRISE TECHNOLOGY SOLUTIONS',
    icon: <Monitor className="size-6 text-white stroke-[2.2]" />,
    image: '/industries/it-companies.jpg',
  },
  {
    name: 'Pharma & Healthcare',
    desc: 'COMPLIANT HEALTHCARE SYSTEMS',
    icon: <Pill className="size-6 text-white stroke-[2.2]" />,
    image: '/industries/pharma-healthcare.jpg',
  },
  {
    name: 'Manufacturing',
    desc: 'INDUSTRIAL AUTOMATION & IOT',
    icon: <Factory className="size-6 text-white stroke-[2.2]" />,
    image: '/industries/manufacturing.jpg',
  },
  {
    name: 'Enterprises & Startups',
    desc: 'SCALABLE GROWTH SOLUTIONS',
    icon: <Rocket className="size-6 text-white stroke-[2.2]" />,
    image: '/industries/enterprises-startups.jpg',
  },
  {
    name: 'Engineering & Field Services',
    desc: 'TECHNICAL WORKFORCE SUPPORT',
    icon: <HardHat className="size-6 text-white stroke-[2.2]" />,
    image: '/industries/engineering-field-services.jpg',
  },
];

function Page() {
  return (
    <div className="bg-white text-slate-900">
      {/* 1. HERO SECTION (Screenshot 1) */}
      <section className="relative overflow-hidden pt-4 pb-5 sm:pt-6 sm:pb-6 bg-white border-b border-slate-200/80">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src={infrastructure}
            alt="TP IT Group Services Technology"
            className="h-full w-full object-cover object-center opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/90 to-white" />
        </div>

        <div className="site-container relative z-10 text-left">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#d7192a]">
            TP IT GROUP / OUR SERVICES
          </p>
          <h1 className="mt-1.5 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Connected Solutions for <span className="text-[#d7192a]">Your Next Business Move.</span>
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
            Technology, consulting and IT and non-IT talent—one partner to connect your strategy, systems and people.
          </p>
        </div>
      </section>

      {/* 2. ONE PARTNER. CONNECTED CAPABILITIES. SECTION (Screenshot 2) */}
      <section className="section bg-white text-slate-900 bg-dot-pattern">
        <div className="site-container">
          <div className="mb-6 text-left">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#d7192a]">
              ONE PARTNER. CONNECTED CAPABILITIES.
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
              Technology. Consulting. Talent. <span className="text-[#d7192a]">Built around your business.</span>
            </h2>
            <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
              From defining the challenge to delivering the solution, bring your technology and people priorities together.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {connectedCapabilities.map((cap) => (
              <motion.div
                key={cap.number}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="group card-diagonal border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm flex flex-col justify-between hover:border-red-300 hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300 text-left"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden img-diagonal bg-slate-100 border border-slate-100 shadow-inner mb-5">
                    <img
                      src={cap.image}
                      alt={cap.title}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />
                    <div className="absolute top-2.5 left-2.5 flex size-10 items-center justify-center icon-diagonal bg-white/95 backdrop-blur-md text-[#d7192a] shadow-sm border border-white/80 z-10">
                      {cap.icon}
                    </div>
                    <span className="absolute top-2.5 right-2.5 rounded-lg bg-black/40 backdrop-blur-md px-2 py-0.5 font-mono text-[11px] font-bold text-white z-10">
                      {cap.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#d7192a] transition-colors">{cap.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">{cap.desc}</p>

                  <ul className="mt-4 space-y-2 border-t border-slate-100 pt-3">
                    {cap.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="size-4 mt-0.5 shrink-0 text-[#d7192a]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={cap.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#d7192a] hover:text-[#b91c1c] transition-colors"
                  >
                    {cap.linkText}
                  </a>
                  <span className="flex size-8 items-center justify-center rounded-full bg-slate-50 border border-slate-200 text-slate-600 group-hover:bg-[#d7192a] group-hover:text-white group-hover:border-[#d7192a] transition-all shadow-2xs">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DETAILED SERVICES ALTERNATING BLOCKS (Screenshots 3 to 8) */}
      <section className="section bg-slate-50/70 border-y border-slate-200/80 bg-grid-pattern">
        <div className="site-container space-y-8 sm:space-y-10">
          {detailedServices.map((service, index) => {
            const isEven = index % 2 === 1; // Alternating layout
            return (
              <div
                key={service.id}
                id={service.id}
                className="scroll-mt-24 grid gap-8 lg:grid-cols-12 lg:gap-12 items-center text-left"
              >
                {/* When isEven (Cards 2, 4, 6): Offer Card on Left (span 7), Info on Right (span 5) */}
                {isEven ? (
                  <>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="lg:col-span-7 order-2 lg:order-1"
                    >
                      <div className="card-diagonal border border-slate-200/90 bg-white p-7 sm:p-9 shadow-sm">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-5">
                          What We Offer
                        </h4>
                        <div className="grid gap-3.5 sm:grid-cols-2">
                          {service.offers.map((offer) => (
                            <div key={offer} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                              <CheckCircle2 className="size-4 mt-0.5 shrink-0 text-[#d7192a]" />
                              <span>{offer}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="lg:col-span-5 space-y-4 order-1 lg:order-2"
                    >
                      <div className="flex size-14 items-center justify-center icon-diagonal bg-red-50 border border-red-100 shadow-xs">
                        {service.icon}
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {service.desc}
                      </p>
                      <div className="pt-2">
                        <Link
                          to="/contact"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#d7192a] hover:text-[#b91c1c] transition-colors"
                        >
                          Learn More <ArrowRight className="size-3.5 ml-0.5" />
                        </Link>
                      </div>
                    </motion.div>
                  </>
                ) : (
                  /* When not isEven (Cards 1, 3, 5): Info on Left (span 5), Offer Card on Right (span 7) */
                  <>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="lg:col-span-5 space-y-4"
                    >
                      <div className="flex size-14 items-center justify-center icon-diagonal bg-red-50 border border-red-100 shadow-xs">
                        {service.icon}
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {service.desc}
                      </p>
                      <div className="pt-2">
                        <Link
                          to="/contact"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#d7192a] hover:text-[#b91c1c] transition-colors"
                        >
                          Learn More <ArrowRight className="size-3.5 ml-0.5" />
                        </Link>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="lg:col-span-7"
                    >
                      <div className="card-diagonal border border-slate-200/90 bg-white p-7 sm:p-9 shadow-sm">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-5">
                          What We Offer
                        </h4>
                        <div className="grid gap-3.5 sm:grid-cols-2">
                          {service.offers.map((offer) => (
                            <div key={offer} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                              <CheckCircle2 className="size-4 mt-0.5 shrink-0 text-[#d7192a]" />
                              <span>{offer}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. INDUSTRIES WE SERVE SECTION (Screenshot 9) */}
      <section className="section bg-white text-slate-900 bg-dot-pattern">
        <div className="site-container relative z-10 text-left">
          <span className="inline-block rounded-full bg-red-50/90 border border-red-200/70 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#d7192a]">
            INDUSTRIES WE SERVE
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
            Solutions for the Needs of <span className="text-[#d7192a]">Multiple Industries</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-3xl">
            Our expertise spans across diverse sectors, delivering tailored solutions that address unique industry challenges.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8 text-left">
            {industries.map((ind, i) => (
              <motion.div
                key={ind.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="group relative flex flex-col justify-between overflow-hidden card-diagonal bg-white p-5 sm:p-6 border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-red-300 hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300 text-left"
              >
                <div>
                  {/* Top Row: Icon Leaf Badge & Sector Pill (Sample image style) */}
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex size-11 items-center justify-center icon-diagonal bg-gradient-to-br from-[#d7192a] to-[#b91c1c] text-white shadow-md shadow-red-500/20">
                      {ind.icon}
                    </div>
                    <span className="rounded-full bg-slate-100/90 border border-slate-200/80 px-3 py-1 font-mono text-[11px] font-semibold text-slate-700">
                      Sector 0{i + 1}
                    </span>
                  </div>

                  <div className="relative aspect-[16/10] w-full overflow-hidden img-diagonal bg-slate-100 border border-slate-100 shadow-inner">
                    <img
                      src={ind.image}
                      alt={ind.name}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-[#d7192a] transition-colors">
                    {ind.name}
                  </h3>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    {ind.desc}
                  </p>
                </div>

                {/* Bottom Footer: Platform status + Circular Arrow Button */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                    <span className="size-1.5 rounded-full bg-[#d7192a] animate-pulse" /> Enterprise Platform
                  </span>
                  <span className="flex size-8 items-center justify-center rounded-full bg-slate-50 border border-slate-200 text-slate-600 group-hover:bg-[#d7192a] group-hover:text-white group-hover:border-[#d7192a] transition-all shadow-2xs">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CONTACT BANNER */}
      <ContactBanner />
    </div>
  );
}
