import { createFileRoute, Link } from '@tanstack/react-router';
import { ContactBanner } from '@/components/corporate/sections';
import { metadata } from '@/components/corporate/content';
import { team } from '@/components/corporate/content';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Route = createFileRoute('/talent')({
  head: () =>
    metadata(
      'IT & Non-IT Talent Solutions | TP IT Group LLC',
      'TP IT Group connects your project and operational priorities with specialized IT and non-IT workforce solutions across technology, business, and operations.',
    ),
  component: Page,
});

const talentCapabilities = [
  {
    title: 'Technology & Digital',
    desc: 'Specialist expertise for modernization, enterprise platforms and digital delivery.',
    skills: [
      'Cloud, DevOps & infrastructure',
      'SAP, ERP & enterprise applications',
      'AI, data engineering & analytics',
      'Java, .NET, QA & business analysis',
    ],
  },
  {
    title: 'Business & Professional',
    desc: 'People who connect business priorities with day-to-day execution.',
    skills: [
      'Finance & accounting',
      'Human resources & administration',
      'Project coordination & operations',
      'Customer service & business support',
    ],
  },
  {
    title: 'Engineering & Operations',
    desc: 'Role-specific workforce planning for technical and non-IT operational requirements.',
    skills: [
      'Engineering & field services',
      'Manufacturing & production',
      'Supply chain & logistics',
      'Healthcare & service operations',
    ],
  },
];

const engagementSteps = [
  {
    num: '01',
    title: 'Consult & Plan',
    desc: 'Define the technology roadmap, team structure and skills needed to deliver your objectives.',
  },
  {
    num: '02',
    title: 'Build & Deliver',
    desc: 'Deploy dedicated teams or individual specialists to execute projects on time and to standard.',
  },
  {
    num: '03',
    title: 'Extend Your Team',
    desc: 'Scale your existing capability with contract, contract-to-hire or direct hire professionals.',
  },
  {
    num: '04',
    title: 'Support & Improve',
    desc: 'Ensure ongoing operational stability, continuous improvement and responsive technical support.',
  },
];

function Page() {
  return (
    <div className="bg-white text-slate-900">
      {/* 1. HERO BANNER (Image 1) */}
      <section className="relative overflow-hidden pt-12 pb-12 sm:pt-16 sm:pb-16 bg-white border-b border-slate-200/80">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src={team}
            alt="TP IT Group Talent Team"
            className="h-full w-full object-cover object-center opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/70" />
        </div>

        <div className="site-container relative z-10 text-left max-w-4xl">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#d7192a]">
            TP IT GROUP / IT &amp; NON-IT TALENT
          </p>
          <h1 className="mt-3 text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            The expertise your next move needs.
          </h1>
          <p className="mt-4 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl">
            Technology only moves forward when the right people are behind it. TP IT Group connects your project and
            operational priorities with IT and non-IT workforce solutions.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button
              asChild
              className="rounded-full bg-[#d7192a] hover:bg-[#b91c1c] text-white px-7 py-3 text-xs sm:text-sm font-bold shadow-md shadow-red-500/20 transition hover:scale-105"
            >
              <Link to="/contact">
                Discuss your talent needs <ArrowRight className="size-4 ml-1.5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 2. IT & NON-IT TALENT CAPABILITIES (Image 2) */}
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

          <div className="grid gap-6 md:grid-cols-2">
            {talentCapabilities.map((cap, idx) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm hover:shadow-md transition-all ${
                  idx === 2 ? 'md:col-span-1' : ''
                }`}
              >
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">{cap.title}</h3>
                <p className="mt-2 text-xs sm:text-[13px] text-slate-600 leading-relaxed">{cap.desc}</p>
                <ul className="mt-5 space-y-2.5">
                  {cap.skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-2.5 text-xs sm:text-[13px] text-slate-700">
                      <Check className="size-4 text-[#d7192a] shrink-0" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WORK WITH TP IT GROUP (Image 3 - Top half) */}
      <section className="section bg-slate-50/60 text-slate-900 border-y border-slate-200/80">
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
            {engagementSteps.map((step) => (
              <div
                key={step.num}
                className="relative border-t-2 border-[#d7192a] pt-4 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-[#d7192a]">{step.num}</span>
                  <h3 className="mt-2 text-base font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. START A CONVERSATION CALLOUT (Image 3 - Bottom half) */}
      <section className="section bg-white text-slate-900">
        <div className="site-container">
          <div className="rounded-3xl border border-slate-200/90 bg-gradient-to-br from-red-50/30 via-white to-slate-50 p-8 sm:p-12 shadow-sm text-left">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#d7192a]">
              START A CONVERSATION
            </p>
            <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Tell us who your team needs.
            </h2>
            <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl">
              Share the role, required skills, location and timeline. We’ll discuss the right approach and confirm
              availability for your specific requirements.
            </p>
            <div className="mt-6 flex flex-wrap gap-3.5">
              <Button
                asChild
                className="rounded-full bg-[#d7192a] hover:bg-[#b91c1c] text-white px-6 py-2.5 text-xs sm:text-sm font-bold shadow-md shadow-red-500/20 transition hover:scale-105"
              >
                <Link to="/contact">
                  Discuss your talent needs <ArrowRight className="size-4 ml-1.5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-slate-300 bg-white hover:bg-slate-100 text-slate-800 px-6 py-2.5 text-xs sm:text-sm font-bold transition"
              >
                <Link to="/careers">
                  For job seekers <ArrowRight className="size-4 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CONTACT BANNER */}
      <ContactBanner />
    </div>
  );
}
