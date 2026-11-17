import { createFileRoute, Link } from '@tanstack/react-router';
import { ContactBanner } from '@/components/corporate/sections';
import { metadata, team } from '@/components/corporate/content';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export const Route = createFileRoute('/talent')({
  head: () =>
    metadata(
      'The expertise your next move needs. | IT & Non-IT Talent | TP IT Group LLC',
      'Technology only moves forward when the right people are behind it. TP IT Group connects your project and operational priorities with IT and non-IT workforce solutions.',
    ),
  component: Page,
});

const talentCapabilities = [
  {
    title: 'Technology & Digital',
    desc: 'Specialist expertise for modernization, enterprise platforms and digital delivery.',
    items: [
      'Cloud, DevOps & infrastructure',
      'SAP, ERP & enterprise applications',
      'AI, data engineering & analytics',
      'Java, .NET, QA & business analysis',
    ],
  },
  {
    title: 'Business & Professional',
    desc: 'People who connect business priorities with day-to-day execution.',
    items: [
      'Finance & accounting',
      'Human resources & administration',
      'Project coordination & operations',
      'Customer service & business support',
    ],
  },
  {
    title: 'Engineering & Operations',
    desc: 'Role-specific workforce planning for technical and non-IT operational requirements.',
    items: [
      'Engineering & field services',
      'Manufacturing & production',
      'Supply chain & logistics',
      'Healthcare & service operations',
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
            src={team}
            alt="TP IT Group Talent & Workforce"
            className="h-full w-full object-cover object-center opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/90 to-white" />
        </div>

        <div className="site-container relative z-10 text-left max-w-4xl">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#d7192a]">
            TP IT GROUP / IT &amp; NON-IT TALENT
          </p>
          <h1 className="mt-3 text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            The expertise your next move needs.
          </h1>
          <p className="mt-4 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl">
            Technology only moves forward when the right people are behind it. TP IT Group connects your project and operational priorities with IT and non-IT workforce solutions.
          </p>
          <div className="mt-6">
            <Button
              asChild
              className="rounded-full bg-[#d7192a] hover:bg-[#b91c1c] text-white px-7 py-2.5 text-xs sm:text-sm font-bold shadow-md shadow-red-500/20 transition hover:scale-105"
            >
              <Link to="/contact">
                Discuss your talent needs <ArrowRight className="size-4 ml-1.5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 2. IT & NON-IT TALENT CAPABILITIES (Screenshot 2) */}
      <section className="section bg-white text-slate-900 bg-dot-pattern">
        <div className="site-container">
          <div className="text-left mb-8">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#d7192a]">
              IT &amp; NON-IT TALENT CAPABILITIES
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
              Expertise aligned to your priorities.
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {talentCapabilities.map((cap) => (
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
            Tell us who your team needs.
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
            Share the role, required skills, location and timeline. We’ll discuss the right approach and confirm availability for your specific requirements.
          </p>
          <div className="mt-6 flex flex-wrap gap-3.5 items-center">
            <Button
              asChild
              className="rounded-full bg-[#d7192a] hover:bg-[#b91c1c] text-white px-7 py-2.5 text-xs sm:text-sm font-bold shadow-md shadow-red-500/20 transition hover:scale-105"
            >
              <Link to="/contact">
                Discuss your talent needs <ArrowRight className="size-4 ml-1.5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 px-6 py-2.5 text-xs sm:text-sm font-bold shadow-xs transition hover:scale-105"
            >
              <Link to="/careers">
                For job seekers <ArrowRight className="size-4 ml-1.5" />
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
