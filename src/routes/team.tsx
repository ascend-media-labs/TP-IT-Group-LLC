import { createFileRoute, Link } from '@tanstack/react-router';
import {
  PageHeading,
  StatsSection,
  WhyChooseUsSection,
  ContactBanner,
} from '@/components/corporate/sections';
import { metadata, team, coreValues } from '@/components/corporate/content';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Sparkles, MapPin, Users, HeartHandshake, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const Route = createFileRoute('/team')({
  head: () =>
    metadata(
      'Our Global Team & Leadership | TP IT Group LLC',
      'Meet the global engineering team, technical specialists, and leadership driving enterprise technology excellence across 5 continents.',
    ),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeading
        eyebrow={'OUR GLOBAL TEAM & LEADERSHIP'}
        title={'The People Driving Innovation Beyond Boundaries.'}
        description={
          'A high-performing global workforce of certified engineers, cloud architects, SAP consultants, and industry leaders committed to delivering excellence.'
        }
      />
      <StatsSection />

      {/* Team Showcase Section */}
      <section className="section bg-white text-slate-900 bg-dot-pattern">
        <div className="site-container space-y-12">
          {/* Main Photo + Narrative */}
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7 relative overflow-hidden rounded-3xl border border-slate-200/90 shadow-xl group">
              <img
                src={team}
                alt="TP iT GROUP LLC global engineering team"
                className="h-[340px] sm:h-[440px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
            </div>

            <div className="lg:col-span-5 text-left">
              <span className="inline-block rounded-full bg-red-50/80 border border-red-200 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#d7192a]">
                GLOBAL EXCELLENCE
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
                Empowered Minds. <br />
                <span className="text-[#d7192a]">Enduring Impact.</span>
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Our global delivery hubs in the United States, Canada, and India bring together diverse perspectives, deep technical domain knowledge, and a collaborative mindset that ensures client success 24/7.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Button
                  asChild
                  className="rounded-full bg-[#d7192a] hover:bg-[#b91c1c] text-white px-6 py-2.5 text-xs font-bold transition hover:scale-105"
                >
                  <Link to="/careers">
                    Join Our Global Team <ArrowUpRight className="size-4 ml-1.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Core Values / Culture Grid */}
          <div className="pt-6 border-t border-slate-100">
            <div className="mb-8 text-left">
              <p className="eyebrow text-[#d7192a]">CULTURE &amp; VALUES</p>
              <h2 className="section-title mt-2">What Guides Our People Every Day.</h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-4xl">
                We foster an environment where curiosity is rewarded, craftsmanship is standard, and client trust is our highest priority.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {coreValues.map((val, i) => (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-6 bg-white/95 border-slate-200/90 hover:border-[#d7192a]/40 hover:shadow-lg transition-all"
                >
                  <div className="flex size-10 items-center justify-center rounded-xl bg-red-50 border border-red-100 text-[#d7192a]">
                    <Sparkles className="size-5" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-slate-900">{val.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">{val.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <WhyChooseUsSection />
      <ContactBanner />
    </>
  );
}
