import { createFileRoute, Link } from '@tanstack/react-router';
import { ContactBanner } from '@/components/corporate/sections';
import { metadata } from '@/components/corporate/content';
import { Button } from '@/components/ui/button';
import {
  Globe,
  CheckCircle2,
  Lightbulb,
  Shield,
  Target,
  Users,
  Eye,
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
      {/* 1. OPERATIONS / STATS ROW */}
      <section className="bg-white border-b border-slate-200/80 py-4 sm:py-5">
        <div className="site-container">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 text-center">
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

            {/* Right Mission & Vision Showcase (Matching User's Reference Sample) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Boardroom Presentation Image provided by User */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-100 border border-slate-200/90 shadow-sm">
                <img
                  src="/about-mission.jpg"
                  alt="TP IT Group Enterprise Collaboration and Leadership"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Twin Cards: Our Vision & Our Mission (Exact Reference Design) */}
              <div className="space-y-3.5">
                {/* Our Vision Card */}
                <div className="rounded-2xl bg-white p-5 sm:p-6 border border-slate-200/90 border-l-[5px] border-l-sky-500 shadow-sm hover:shadow-md transition-all text-left">
                  <div className="flex items-center gap-3.5 mb-2.5">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 border border-sky-100 text-sky-600 shadow-xs">
                      <Eye className="size-5 stroke-[2]" />
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-sky-600">
                        OUR IDENTITY
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                        Our Vision
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                    To be a trusted technology partner for businesses worldwide, delivering solutions that create lasting value, connecting enterprise strategy with cloud and digital execution.
                  </p>
                </div>

                {/* Our Mission Card */}
                <div className="rounded-2xl bg-white p-5 sm:p-6 border border-slate-200/90 border-l-[5px] border-l-[#d7192a] shadow-sm hover:shadow-md transition-all text-left">
                  <div className="flex items-center gap-3.5 mb-2.5">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-red-50 border border-red-100 text-[#d7192a] shadow-xs">
                      <Target className="size-5 stroke-[2]" />
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#d7192a]">
                        OUR COMMITMENT
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                        Our Mission
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                    To empower organizations with innovative, reliable, and scalable technology solutions that improve operational efficiency and connect business goals with technology capabilities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR CORE VALUES SECTION (Exact Sample 2 Reference Style with 4-side curve & colored left border) */}
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

          <div className="grid gap-5 sm:grid-cols-2 mt-8 text-left">
            {/* Innovation */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl bg-white p-6 sm:p-7 border border-slate-200/90 border-l-[5px] border-l-sky-500 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3.5 mb-3">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-sky-50/90 border border-sky-100 text-sky-600 shadow-xs">
                  <Lightbulb className="size-6 stroke-[1.9]" />
                </div>
                <div>
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-sky-600">
                    CORE VALUE
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                    Innovation
                  </h3>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We embrace evolving technologies to create practical, forward-thinking solutions for your business.
              </p>
            </motion.div>

            {/* Integrity */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="rounded-2xl bg-white p-6 sm:p-7 border border-slate-200/90 border-l-[5px] border-l-[#d7192a] shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3.5 mb-3">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-red-50/90 border border-red-100 text-[#d7192a] shadow-xs">
                  <Shield className="size-6 stroke-[1.9]" />
                </div>
                <div>
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#d7192a]">
                    ETHICAL COMMITMENT
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                    Integrity
                  </h3>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Transparent communication and ethical practices guide our relationships and the work we deliver.
              </p>
            </motion.div>

            {/* Excellence */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="rounded-2xl bg-white p-6 sm:p-7 border border-slate-200/90 border-l-[5px] border-l-amber-500 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3.5 mb-3">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-amber-50/90 border border-amber-100 text-amber-600 shadow-xs">
                  <Target className="size-6 stroke-[1.9]" />
                </div>
                <div>
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-amber-600">
                    QUALITY STANDARD
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                    Excellence
                  </h3>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We focus on quality, reliability, and continuous improvement in every technology engagement.
              </p>
            </motion.div>

            {/* Partnership */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="rounded-2xl bg-white p-6 sm:p-7 border border-slate-200/90 border-l-[5px] border-l-emerald-500 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3.5 mb-3">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50/90 border border-emerald-100 text-emerald-600 shadow-xs">
                  <Users className="size-6 stroke-[1.9]" />
                </div>
                <div>
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                    CLIENT ENGAGEMENT
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                    Partnership
                  </h3>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We build lasting relationships through trust, collaboration, and a shared commitment to your success.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. OUR APPROACH SECTION (Screenshot 5) */}
      <section className="section bg-white text-slate-900 bg-dot-pattern overflow-hidden">
        <div className="site-container text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#d7192a]">
              OUR APPROACH
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
              From Ideas to <span className="text-[#d7192a]">Lasting Value</span>
            </h2>
          </motion.div>

          {/* Vertical Alternating Timeline */}
          <div className="relative mt-10 max-w-3xl mx-auto">
            {/* Center Vertical Guideline (visible on md+) */}
            <div className="absolute left-1/2 top-6 bottom-6 -translate-x-1/2 w-0.5 bg-slate-200 hidden md:block" />

            <div className="space-y-6 md:space-y-10">
              {/* Step 1 - DISCOVER (Left -> slides in from left to right) */}
              <div className="relative flex flex-col md:flex-row items-center">
                <motion.div
                  initial={{ opacity: 0, x: -70 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full md:w-1/2 md:pr-10 text-left"
                >
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
                </motion.div>
                {/* Center Node Dot */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="absolute left-1/2 -translate-x-1/2 size-3.5 rounded-full bg-[#d7192a] ring-4 ring-red-100 hidden md:block"
                />
                <div className="w-full md:w-1/2" />
              </div>

              {/* Step 2 - PLAN (Right -> slides in from right to left) */}
              <div className="relative flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/2" />
                {/* Center Node Dot */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="absolute left-1/2 -translate-x-1/2 size-3.5 rounded-full bg-[#d7192a] ring-4 ring-red-100 hidden md:block"
                />
                <motion.div
                  initial={{ opacity: 0, x: 70 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full md:w-1/2 md:pl-10 text-left"
                >
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
                </motion.div>
              </div>

              {/* Step 3 - DELIVER (Left -> slides in from left to right) */}
              <div className="relative flex flex-col md:flex-row items-center">
                <motion.div
                  initial={{ opacity: 0, x: -70 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full md:w-1/2 md:pr-10 text-left"
                >
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
                </motion.div>
                {/* Center Node Dot */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="absolute left-1/2 -translate-x-1/2 size-3.5 rounded-full bg-[#d7192a] ring-4 ring-red-100 hidden md:block"
                />
                <div className="w-full md:w-1/2" />
              </div>

              {/* Step 4 - IMPROVE (Right -> slides in from right to left) */}
              <div className="relative flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/2" />
                {/* Center Node Dot */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="absolute left-1/2 -translate-x-1/2 size-3.5 rounded-full bg-[#d7192a] ring-4 ring-red-100 hidden md:block"
                />
                <motion.div
                  initial={{ opacity: 0, x: 70 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full md:w-1/2 md:pl-10 text-left"
                >
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
                </motion.div>
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
