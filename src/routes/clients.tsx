import { createFileRoute } from '@tanstack/react-router';
import { ContactBanner } from '@/components/corporate/sections';
import { metadata } from '@/components/corporate/content';
import { headquarters } from '@/components/corporate/content';
import { Trophy, ShieldCheck, Zap, Clock, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

export const Route = createFileRoute('/clients')({
  head: () =>
    metadata(
      'Client Success & Enterprise Partnerships | TP IT Group LLC',
      'Discover how TP IT Group LLC collaborates with global enterprises to deliver enduring partnerships, professional deliverables, and strategic ROI.',
    ),
  component: Page,
});

const commitmentPillars = [
  {
    icon: <Trophy className="size-5 text-[#d7192a]" />,
    title: 'Quality Excellence',
    desc: 'We deliver industry-leading code quality and infrastructure stability, exceeding global standards for enterprise performance.',
  },
  {
    icon: <ShieldCheck className="size-5 text-[#d7192a]" />,
    title: 'Absolute Transparency',
    desc: 'Real-time reporting and open communication channels ensure you are always informed about project milestones and progress.',
  },
  {
    icon: <Zap className="size-5 text-[#d7192a]" />,
    title: 'Agile Delivery',
    desc: 'Fast-tracked development cycles without compromising on security or scalability, tailored to your market demands.',
  },
  {
    icon: <Clock className="size-5 text-[#d7192a]" />,
    title: 'Ongoing Support',
    desc: 'We agree on support coverage, response priorities and handover responsibilities around your project needs.',
  },
];

const deliverables = [
  'Comprehensive Technical Documentation',
  'Source Code Ownership (IP Rights)',
  'Post-Deployment Maintenance & Optimization',
  'Agreed Progress & Performance Reports',
  'Scalable Architecture Blueprints',
  'Security Controls & Handover Documentation',
];

function Page() {
  return (
    <div className="bg-white text-slate-900">
      {/* 1. HERO BANNER (Image 2) */}
      <section className="relative overflow-hidden pt-12 pb-12 sm:pt-16 sm:pb-16 bg-white border-b border-slate-200/80">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src={headquarters}
            alt="TP IT Group Client Partnerships Meeting"
            className="h-full w-full object-cover object-center opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/70" />
        </div>

        <div className="site-container relative z-10 text-left max-w-4xl">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#d7192a]">
            TP IT GROUP / CLIENT SUCCESS &amp; EXCELLENCE
          </p>
          <h1 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Our Promise, <span className="text-[#d7192a]">Your Progress</span>
          </h1>
          <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
            We don’t just complete projects; we build enduring partnerships. TP IT Group LLC is committed to
            delivering professional excellence and measurable business outcomes for every client.
          </p>
        </div>
      </section>

      {/* 2. THE TP IT COMMITMENT (Image 3) */}
      <section className="section bg-white text-slate-900 bg-dot-pattern">
        <div className="site-container">
          <div className="text-left mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
              The TP IT <span className="text-[#d7192a]">Commitment</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              Four core pillars that define our professional relationship with every global client.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {commitmentPillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-8 shadow-sm hover:shadow-md transition-all text-left"
              >
                <div className="flex size-11 items-center justify-center rounded-2xl bg-red-50 border border-red-200/80 mb-5">
                  {pillar.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900">{pillar.title}</h3>
                <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-slate-600">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHAT YOU RECEIVE / PROFESSIONAL DELIVERABLES (Image 4) */}
      <section className="section bg-slate-50/60 text-slate-900 border-t border-slate-200/80">
        <div className="site-container">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            {/* Left Column: Heading + 6 Deliverables */}
            <div className="lg:col-span-7 text-left">
              <span className="inline-block rounded-full bg-red-50/90 border border-red-200 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#d7192a]">
                WHAT YOU RECEIVE
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Professional <span className="text-[#d7192a]">Deliverables</span> That Matter
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
                We go beyond code. We agree on a project-specific suite of professional deliverables designed
                for long-term scalability and business continuity.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-7">
                {deliverables.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200/90 bg-white px-4 py-3.5 shadow-xs"
                  >
                    <span className="size-2 rounded-full bg-[#d7192a] shrink-0" />
                    <span className="text-xs sm:text-[13px] font-semibold text-slate-800 leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Strategic ROI Highlight Box */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-10 shadow-sm text-left flex flex-col justify-between"
              >
                <div>
                  <div className="mb-6">
                    <BarChart3 className="size-10 text-[#d7192a]" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Strategic ROI
                  </h3>
                  <p className="mt-4 text-xs sm:text-[13px] leading-relaxed text-slate-600">
                    Our solutions are engineered for profitability. We focus on optimizing your operational efficiency
                    while reducing long-term technical debt, ensuring your digital transformation translates into
                    measurable financial growth.
                  </p>
                </div>
                <div className="mt-8 pt-5 border-t border-slate-100 text-xs sm:text-[13px] font-bold text-slate-800">
                  Focused on <span className="text-[#d7192a]">Lasting</span> Client Partnerships
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CONTACT BANNER */}
      <ContactBanner />
    </div>
  );
}
