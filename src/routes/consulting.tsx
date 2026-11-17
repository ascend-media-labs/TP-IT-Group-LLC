import { createFileRoute, Link } from '@tanstack/react-router';
import { ContactBanner } from '@/components/corporate/sections';
import { metadata, headquarters } from '@/components/corporate/content';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
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
      {/* 1. HERO SECTION (Screenshot 1) */}
      <section className="relative overflow-hidden pt-12 pb-10 sm:pt-16 sm:pb-14 bg-white border-b border-slate-200/80">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src={headquarters}
            alt="TP IT Group Modern Office"
            className="h-full w-full object-cover object-center opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/90 to-white" />
        </div>

        <div className="site-container relative z-10 text-left max-w-4xl">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#d7192a]">
            TP IT GROUP / CONSULTING SERVICES
          </p>
          <h1 className="mt-3 text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            Clear strategy. Practical execution.
          </h1>
          <p className="mt-4 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl">
            Make your next decision with a clearer view of the business, technology and people involved. TP IT Group helps turn complex priorities into a focused transformation roadmap.
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

      {/* 2. CONSULTING SERVICES CAPABILITIES (Screenshot 2) */}
      <section className="section bg-white text-slate-900 bg-dot-pattern">
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
      <section className="section bg-white text-slate-900 border-t border-slate-200/80 bg-dot-pattern">
        <div className="site-container">
          <div className="text-left mb-8">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#d7192a]">
              WORK WITH TP IT GROUP
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
              The right engagement for your next move.
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {engagementModels.map((item, i) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="border-t-2 border-[#d7192a] pt-4 text-left"
              >
                <span className="font-mono text-xs font-bold text-slate-400">{item.number}</span>
                <h3 className="mt-2 text-base font-bold text-slate-900">{item.title}</h3>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. START A CONVERSATION CALLOUT (Screenshot 3 - Bottom half) */}
      <section className="section bg-slate-50/70 border-t border-slate-200/80 bg-grid-pattern">
        <div className="site-container max-w-4xl text-left">
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

      {/* 5. CONTACT BANNER */}
      <ContactBanner />
    </div>
  );
}
