import { createFileRoute, Link } from '@tanstack/react-router';
import { ContactBanner } from '@/components/corporate/sections';
import { metadata } from '@/components/corporate/content';
import { headquarters } from '@/components/corporate/content';
import { Button } from '@/components/ui/button';
import {
  Globe,
  CheckCircle2,
  Lightbulb,
  Shield,
  Target,
  Users,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const Route = createFileRoute('/about')({
  head: () =>
    metadata(
      'About Us - Technology. People. Partnership. | TP IT Group LLC',
      'TP IT Group brings more than 20 years of industry experience, with a USA head office and operations across Canada and India. We help businesses navigate digital transformation with confidence.',
    ),
  component: Page,
});

function Page() {
  return (
    <div className="bg-white text-slate-900">
      {/* 1. HERO / BANNER SECTION (Screenshot 1) */}
      <section className="relative overflow-hidden pt-4 pb-5 sm:pt-6 sm:pb-6 bg-white border-b border-slate-200/80">
        {/* Subtle background image overlay with gradient */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src={headquarters}
            alt="TP IT Group Modern Office"
            className="h-full w-full object-cover object-center opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/90 to-white" />
        </div>

        <div className="site-container relative z-10 text-left">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#d7192a]">
            TP IT GROUP / ABOUT TP IT GROUP
          </p>
          <h1 className="mt-1.5 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Technology. People. Partnership. <span className="text-[#d7192a]">One TP IT Group.</span>
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
            TP IT Group brings more than 20 years of industry experience, with a{' '}
            <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-700">US</span> USA head office and locations in Ontario,{' '}
            <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-700">CA</span> Canada, and Hyderabad,{' '}
            <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-700">IN</span> India. We help businesses navigate digital transformation with confidence.
          </p>
        </div>

        {/* 4 Operations / Stats Row */}
        <div className="site-container relative z-10 mt-6 pt-5 border-t border-slate-200/80">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#d7192a]">Delaware</div>
              <div className="mt-1 flex items-center justify-center gap-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <span className="rounded bg-slate-100 px-1 py-0.5 text-[9px] font-bold text-slate-700">US</span> USA OPERATIONS
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#d7192a]">Hyderabad</div>
              <div className="mt-1 flex items-center justify-center gap-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <span className="rounded bg-slate-100 px-1 py-0.5 text-[9px] font-bold text-slate-700">IN</span> INDIA OPERATIONS
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#d7192a]">20+ Years</div>
              <div className="mt-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                INDUSTRY EXPERIENCE
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#d7192a]">Ontario</div>
              <div className="mt-1 flex items-center justify-center gap-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <span className="rounded bg-slate-100 px-1 py-0.5 text-[9px] font-bold text-slate-700">CA</span> CANADA OPERATIONS
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OUR STORY & MISSION SECTION (Screenshots 2 & 3) */}
      <section className="section bg-white text-slate-900 bg-dot-pattern">
        <div className="site-container">
          <div className="text-left mb-6">
            <span className="inline-block rounded-full bg-red-50/80 border border-red-200 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#d7192a]">
              OUR STORY
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
              Building the Future of <span className="text-[#d7192a]">Enterprise Technology</span>
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 items-start">
            {/* Left Story Column */}
            <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed text-left">
              <p>
                Technology should move your business forward. TP IT Group connects your business objectives with reliable, scalable solutions that make everyday operations more effective.
              </p>
              <p>
                Our services connect technology solutions, consulting and IT and non-IT workforce needs. From AI automation, cloud and SAP to software, digital experiences and secure networks, we support the journey from business strategy to delivery and ongoing improvement.
              </p>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 pt-3">
                20+ Years of Industry Experience
              </h3>
              <p>
                With more than two decades in the market, TP IT Group has delivered many successful client projects. Our experience informs how we plan transformations, coordinate delivery and support technology after launch.
              </p>
              <p>
                We bring business context to technical decisions: understanding the organization's priorities, addressing integration needs and helping teams adopt new ways of working. We focus on lasting client relationships rather than treating deployment as the end of the engagement.
              </p>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 pt-3">
                A Client-Focused Delivery Story
              </h3>
              <p>
                Our project story spans enterprise applications, cloud transformations and digital experiences. Each engagement begins with the client's goals and carries through design, implementation, validation and ongoing improvement.
              </p>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 pt-3">
                Our Vision
              </h3>
              <p>
                To be a trusted technology partner for businesses worldwide, delivering solutions that create lasting value and support sustainable growth.
              </p>
            </div>

            {/* Right Mission Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-9 shadow-[0_4px_24px_rgba(0,0,0,0.03)] text-left space-y-5">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-red-50 border border-red-100 text-[#d7192a]">
                  <Globe className="size-8 stroke-[1.8]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Our Mission
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  To empower organizations with innovative, reliable, and scalable technology solutions that improve operational efficiency and connect business goals with technology capabilities.
                </p>
                <div className="pt-2 space-y-3">
                  <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-800">
                    <CheckCircle2 className="size-4 text-[#d7192a] shrink-0" />
                    <span>Innovation-driven solutions</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-800">
                    <CheckCircle2 className="size-4 text-[#d7192a] shrink-0" />
                    <span>Client-focused approach</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-800">
                    <CheckCircle2 className="size-4 text-[#d7192a] shrink-0" />
                    <span>Global expertise, local execution</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR CORE VALUES SECTION (Screenshots 3 & 4) */}
      <section className="section bg-slate-50/70 text-slate-900 border-y border-slate-200/80 bg-grid-pattern">
        <div className="site-container text-left">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#d7192a]">
            OUR CORE VALUES
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
            The Principles That <span className="text-[#d7192a]">Guide Us</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl">
            Our values shape every interaction, decision, and solution we deliver.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 mt-8 text-left">
            {/* Innovation */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl bg-white p-7 sm:p-8 border border-slate-200/90 shadow-sm hover:border-red-200 hover:shadow-md transition-all"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-red-50 border border-red-100 text-[#d7192a]">
                <Lightbulb className="size-5" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900">Innovation</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                We embrace evolving technologies to create practical, forward-thinking solutions for your business.
              </p>
            </motion.div>

            {/* Integrity */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="rounded-3xl bg-white p-7 sm:p-8 border border-red-200/90 shadow-sm hover:border-[#d7192a] hover:shadow-md transition-all"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-[#d7192a] text-white shadow-xs">
                <Shield className="size-5 fill-white" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900">Integrity</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Transparent communication and ethical practices guide our relationships and the work we deliver.
              </p>
            </motion.div>

            {/* Excellence */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="rounded-3xl bg-white p-7 sm:p-8 border border-slate-200/90 shadow-sm hover:border-red-200 hover:shadow-md transition-all"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-red-50 border border-red-100 text-[#d7192a]">
                <Target className="size-5" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900">Excellence</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                We focus on quality, reliability, and continuous improvement in every technology engagement.
              </p>
            </motion.div>

            {/* Partnership */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="rounded-3xl bg-white p-7 sm:p-8 border border-slate-200/90 shadow-sm hover:border-red-200 hover:shadow-md transition-all"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-red-50 border border-red-100 text-[#d7192a]">
                <Users className="size-5" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900">Partnership</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                We build lasting relationships through trust, collaboration, and a shared commitment to your success.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. OUR APPROACH SECTION (Screenshot 5) */}
      <section className="section bg-white text-slate-900 bg-dot-pattern">
        <div className="site-container text-left">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#d7192a]">
            OUR APPROACH
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
            From Ideas to <span className="text-[#d7192a]">Lasting Value</span>
          </h2>

          {/* Vertical Alternating Timeline */}
          <div className="relative mt-10 max-w-3xl mx-auto">
            {/* Center Vertical Guideline (visible on md+) */}
            <div className="absolute left-1/2 top-6 bottom-6 -translate-x-1/2 w-0.5 bg-slate-200 hidden md:block" />

            <div className="space-y-6 md:space-y-10">
              {/* Step 1 - DISCOVER (Left) */}
              <div className="relative flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/2 md:pr-10 text-left">
                  <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm hover:border-red-200 hover:shadow-md transition-all">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#d7192a]">
                      DISCOVER
                    </span>
                    <h3 className="mt-1 text-base font-bold text-slate-900">
                      Understand Your Business
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                      Connect your objectives with the right technology priorities and a clear scope.
                    </p>
                  </div>
                </div>
                {/* Center Node Dot */}
                <div className="absolute left-1/2 -translate-x-1/2 size-3.5 rounded-full bg-[#d7192a] ring-4 ring-red-100 hidden md:block" />
                <div className="w-full md:w-1/2" />
              </div>

              {/* Step 2 - PLAN (Right) */}
              <div className="relative flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/2" />
                {/* Center Node Dot */}
                <div className="absolute left-1/2 -translate-x-1/2 size-3.5 rounded-full bg-[#d7192a] ring-4 ring-red-100 hidden md:block" />
                <div className="w-full md:w-1/2 md:pl-10 text-left">
                  <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm hover:border-red-200 hover:shadow-md transition-all">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#d7192a]">
                      PLAN
                    </span>
                    <h3 className="mt-1 text-base font-bold text-slate-900">
                      Design the Right Solution
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                      Create a practical roadmap for cloud, AI, development, or enterprise applications.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 - DELIVER (Left) */}
              <div className="relative flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/2 md:pr-10 text-left">
                  <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm hover:border-red-200 hover:shadow-md transition-all">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#d7192a]">
                      DELIVER
                    </span>
                    <h3 className="mt-1 text-base font-bold text-slate-900">
                      Build &amp; Implement
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                      Develop, integrate, and test solutions with collaboration throughout delivery.
                    </p>
                  </div>
                </div>
                {/* Center Node Dot */}
                <div className="absolute left-1/2 -translate-x-1/2 size-3.5 rounded-full bg-[#d7192a] ring-4 ring-red-100 hidden md:block" />
                <div className="w-full md:w-1/2" />
              </div>

              {/* Step 4 - IMPROVE (Right) */}
              <div className="relative flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/2" />
                {/* Center Node Dot */}
                <div className="absolute left-1/2 -translate-x-1/2 size-3.5 rounded-full bg-[#d7192a] ring-4 ring-red-100 hidden md:block" />
                <div className="w-full md:w-1/2 md:pl-10 text-left">
                  <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm hover:border-red-200 hover:shadow-md transition-all">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#d7192a]">
                      IMPROVE
                    </span>
                    <h3 className="mt-1 text-base font-bold text-slate-900">
                      Support Your Growth
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                      Maintain and refine your technology as your business needs evolve.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE PEOPLE BEHIND TP IT GROUP (Screenshot 6) */}
      <section className="section bg-white text-slate-900 border-t border-slate-200/80">
        <div className="site-container text-left">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            The People Behind TP IT Group
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
            Our leadership brings together enterprise strategy, project operations, cloud architecture, engineering and business development to keep client goals at the heart of delivery.
          </p>
          <div className="mt-6">
            <Button
              asChild
              className="rounded-full bg-[#d7192a] hover:bg-[#b91c1c] text-white px-7 py-2.5 text-xs sm:text-sm font-bold shadow-md shadow-red-500/20 transition hover:scale-105"
            >
              <Link to="/team">
                Meet Our Team <ArrowRight className="size-4 ml-1.5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 6. CONTACT BANNER */}
      <ContactBanner />
    </div>
  );
}
