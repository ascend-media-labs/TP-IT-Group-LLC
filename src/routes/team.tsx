import { createFileRoute } from '@tanstack/react-router';
import { ContactBanner } from '@/components/corporate/sections';
import { metadata } from '@/components/corporate/content';
import { ArrowUpRight, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const Route = createFileRoute('/team')({
  head: () =>
    metadata(
      'Our Team - Leadership | TP IT Group LLC',
      'Meet the leadership team at TP IT Group LLC bringing together enterprise strategy, operational discipline, cloud architecture and digital engineering.',
    ),
  component: Page,
});

interface Leader {
  name: string;
  role: string;
  subRole: string;
  bio: string;
  image: string;
  department: string;
}

const leaders: Leader[] = [
  {
    name: 'Karthik Pushpa',
    role: 'CEO & Founder',
    subRole: '15+ Years in Enterprise IT Strategy, Cloud Transformations & Digital Transformation',
    bio: "Karthik guides TP IT Group's enterprise strategy, bringing business priorities together with cloud modernization and digital transformation. His focus is a clear direction for clients and a practical roadmap from investment to delivery.",
    image: '/team/karthik.jpg',
    department: 'TP IT Group LLC',
  },
  {
    name: 'Gayathri Devi',
    role: 'Director of Operations',
    subRole: 'Ensures seamless project delivery and client satisfaction.',
    bio: 'Gayathri brings structure to project operations, keeping delivery teams and client expectations aligned. Her focus is clear communication, coordinated execution and a dependable client experience throughout each engagement.',
    image: '/team/gayathri.jpg',
    department: 'Project & Operations',
  },
  {
    name: 'Lakshmi Bhargavi',
    role: 'CTO',
    subRole: 'Cloud architecture expert with deep AWS, GCP and Azure expertise.',
    bio: 'Lakshmi shapes the technical direction of cloud solutions across AWS, Google Cloud and Azure. Her focus is architecture that balances scalability, security and operational needs as organizations modernize their technology.',
    image: '/team/lakshmi.jpg',
    department: 'Cloud & Deep-Tech',
  },
  {
    name: 'Sai Deepa',
    role: 'VP of Engineering',
    subRole: 'Leads our development teams across custom apps and ERP solutions.',
    bio: 'Sai leads engineering across custom applications and ERP solutions, connecting technical teams with project goals. Her focus is collaborative development, maintainable software and quality throughout implementation.',
    image: '/team/sai-deepa.jpg',
    department: 'Engineering & Apps',
  },
  {
    name: 'E S VIJAYAN',
    role: 'Director of Business Development',
    subRole: 'Ensures seamless project delivery, Business Growth and client satisfaction.',
    bio: 'Vijayan connects business growth with client needs, helping shape conversations into focused project opportunities. His focus is lasting relationships, aligned delivery expectations and client satisfaction.',
    image: '/team/vijayan.jpg',
    department: 'Business & Growth',
  },
];

function Page() {
  return (
    <div className="bg-white text-slate-900">
      {/* 1. LEADERSHIP SHOWCASE (Reference style circular avatar cards) */}
      <section className="pt-8 sm:pt-10 pb-8 sm:pb-12 bg-white text-slate-900 bg-dot-pattern">
        <div className="site-container">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6 pb-3 border-b border-slate-100">
            <div>
              <span className="inline-block rounded-full bg-red-50/90 border border-red-200 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#d7192a]">
                OUR TEAM
              </span>
              <h2 className="mt-1.5 text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900">
                Leadership
              </h2>
            </div>
            <p className="mt-1 sm:mt-0 text-[11px] text-slate-400">
              Illustrated avatars — not actual portraits.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-3.5">
            {leaders.map((leader, idx) => (
              <motion.article
                key={leader.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white/95 p-5 sm:p-5 shadow-sm hover:shadow-xl hover:border-red-300 hover:-translate-y-1.5 transition-all duration-300 text-center"
              >
                {/* Top-Right Arrow Badge (Executive Talks reference) */}
                <div className="absolute top-3.5 right-3.5 flex size-7 items-center justify-center rounded-lg bg-red-50/80 border border-red-100 text-[#d7192a] group-hover:bg-[#d7192a] group-hover:text-white transition-all shadow-2xs">
                  <ArrowUpRight className="size-3.5" />
                </div>

                <div>
                  {/* Circular Avatar with Accent Ring */}
                  <div className="relative mx-auto size-24 sm:size-28 rounded-full p-1 ring-2 ring-red-100 bg-gradient-to-br from-red-50 via-white to-red-100/70 shadow-sm group-hover:ring-red-300 transition-all mt-1">
                    <div className="size-full overflow-hidden rounded-full bg-slate-100">
                      <img
                        src={leader.image}
                        alt={`${leader.name} - ${leader.role}`}
                        className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Leader Info */}
                  <h3 className="mt-4 text-base font-bold text-slate-900 leading-tight group-hover:text-[#d7192a] transition-colors">
                    {leader.name}
                  </h3>
                  <p className="mt-1 text-xs font-bold text-[#d7192a] leading-snug">
                    {leader.role}
                  </p>
                  <p className="mt-2 text-[11px] font-medium text-slate-500 leading-relaxed line-clamp-2 px-1">
                    {leader.subRole}
                  </p>
                </div>

                {/* Bottom Company / Department Pill */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5 text-xs text-slate-600 font-medium">
                  <Building2 className="size-3.5 text-[#d7192a] shrink-0" />
                  <span className="truncate">{leader.department}</span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 2. CONTACT BANNER */}
      <ContactBanner />
    </div>
  );
}
