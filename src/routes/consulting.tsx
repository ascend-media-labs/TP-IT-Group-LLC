import { createFileRoute, Link } from '@tanstack/react-router';
import { metadata } from '@/components/corporate/content';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Compass, Layers, Users, RefreshCw, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const Route = createFileRoute('/consulting')({
  head: () =>
    metadata(
      'Clear strategy. Practical execution. | TP IT Group LLC',
      'Make your next decision with a clearer view of the business, technology and people involved. TP IT Group helps turn complex priorities into a focused transformation roadmap.',
    ),
  component: Page,
});

const consultingCapabilities = [
  {
    title: 'Technology Strategy',
    desc: 'Assess your current systems, identify dependencies and prioritize investments around business value, risk and budget.',
    items: [
      'Current-state assessment',
      'Target architecture & roadmap',
      'Platform selection support',
    ],
  },
  {
    title: 'Business & Process Consulting',
    desc: 'Understand how work moves through your organization and identify where better processes, data or automation can remove friction.',
    items: [
      'Process discovery & mapping',
      'Operational improvement planning',
      'Automation opportunity assessment',
    ],
  },
  {
    title: 'Transformation Delivery',
    desc: 'Connect strategy to execution with clear scope, stakeholder alignment and a practical approach to adoption.',
    items: [
      'Program planning & governance',
      'ERP & cloud transformation advisory',
      'Change readiness & adoption',
    ],
  },
  {
    title: 'Workforce Advisory',
    desc: 'Review the skills and capacity your plans require, then define a team model aligned with your priorities.',
    items: [
      'Skills & capacity assessment',
      'Project team planning',
      'Hiring requirement definition',
    ],
  },
];

const engagementModels = [
  {
    number: '01',
    title: 'Consult & Plan',
    desc: 'An assessment and roadmap for a defined business or technology challenge.',
  },
  {
    number: '02',
    title: 'Build & Deliver',
    desc: 'A scoped project with agreed milestones, acceptance criteria and handover.',
  },
  {
    number: '03',
    title: 'Extend Your Team',
    desc: 'Specialist capacity matched to the skills and duration your team needs.',
  },
  {
    number: '04',
    title: 'Support & Improve',
    desc: 'Ongoing service priorities, review cycles and improvements agreed with you.',
  },
];

function Page() {
  return (
    <div className="bg-white text-slate-900">
      {/* 1. CONSULTING SERVICES CAPABILITIES */}
      <section className="section bg-white text-slate-900 bg-dot-pattern pt-8 sm:pt-10">
        <div className="site-container">
          <div className="text-left mb-8">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#d7192a]">
              CONSULTING SERVICES CAPABILITIES
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
              Expertise aligned to your priorities.
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {consultingCapabilities.map((cap) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-9 shadow-sm hover:border-red-200 hover:shadow-md transition-all text-left"
              >
                <h3 className="text-xl font-bold text-slate-900">{cap.title}</h3>
                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600">
                  {cap.desc}
                </p>

                <ul className="mt-6 space-y-2.5 border-t border-slate-100 pt-5">
                  {cap.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <Check className="size-4 mt-0.5 shrink-0 text-[#d7192a]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WORK WITH TP IT GROUP (Screenshot 3 - Top half) */}
      <section className="section relative overflow-hidden bg-white text-slate-900 border-t border-slate-200/80 bg-dot-pattern">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(215,25,42,0.03),transparent_70%)]" />
        <div className="site-container relative z-10">
          <div className="text-left mb-8 sm:mb-10">
            <span className="inline-block rounded-full bg-red-50/80 border border-red-200 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#d7192a]">
              WORK WITH TP IT GROUP
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
              The right engagement for <span className="text-[#d7192a]">your next move.</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-4xl">
              Flexible collaboration structures built to adapt to your enterprise milestones and talent demands.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {engagementModels.map((item, i) => {
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
              const meta = engagementMeta[i % engagementMeta.length];

              return (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
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

      {/* 4. START A CONVERSATION CALLOUT (Screenshot 3 - Bottom half) */}
      <section className="section bg-slate-50/70 border-t border-slate-200/80 bg-grid-pattern">
        <div className="site-container text-left">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#d7192a]">
            START A CONVERSATION
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
            Bring us your next business challenge.
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
            Share your goals, current challenges and priorities. We’ll discuss a practical scope, delivery approach and next steps.
          </p>
          <div className="mt-6">
            <Button
              asChild
              className="rounded-full bg-[#d7192a] hover:bg-[#b91c1c] text-white px-7 py-2.5 text-xs sm:text-sm font-bold shadow-md shadow-red-500/20 transition hover:scale-105"
            >
              <Link to="/contact">
                Discuss your priorities <ArrowRight className="size-4 ml-1.5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
