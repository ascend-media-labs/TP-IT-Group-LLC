import { createFileRoute } from '@tanstack/react-router';
import { ContactBanner } from '@/components/corporate/sections';
import { metadata } from '@/components/corporate/content';
import { team } from '@/components/corporate/content';
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
}

const leaders: Leader[] = [
  {
    name: 'Karthik Pushpa',
    role: 'CEO & Founder',
    subRole: '15+ Years in Enterprise IT Strategy, Cloud Transformations & Digital Transformation',
    bio: "Karthik guides TP IT Group's enterprise strategy, bringing business priorities together with cloud modernization and digital transformation. His focus is a clear direction for clients and a practical roadmap from investment to delivery.",
    image: '/team/karthik.jpg',
  },
  {
    name: 'Gayathri Devi',
    role: 'Director of Operations',
    subRole: 'Ensures seamless project delivery and client satisfaction.',
    bio: 'Gayathri brings structure to project operations, keeping delivery teams and client expectations aligned. Her focus is clear communication, coordinated execution and a dependable client experience throughout each engagement.',
    image: '/team/gayathri.jpg',
  },
  {
    name: 'Lakshmi Bhargavi',
    role: 'CTO',
    subRole: 'Cloud architecture expert with deep AWS, GCP and Azure expertise.',
    bio: 'Lakshmi shapes the technical direction of cloud solutions across AWS, Google Cloud and Azure. Her focus is architecture that balances scalability, security and operational needs as organizations modernize their technology.',
    image: '/team/lakshmi.jpg',
  },
  {
    name: 'Sai Deepa',
    role: 'VP of Engineering',
    subRole: 'Leads our development teams across custom apps and ERP solutions.',
    bio: 'Sai leads engineering across custom applications and ERP solutions, connecting technical teams with project goals. Her focus is collaborative development, maintainable software and quality throughout implementation.',
    image: '/team/sai-deepa.jpg',
  },
  {
    name: 'E S VIJAYAN',
    role: 'Director of Business Development',
    subRole: 'Ensures seamless project delivery, Business Growth and client satisfaction.',
    bio: 'Vijayan connects business growth with client needs, helping shape conversations into focused project opportunities. His focus is lasting relationships, aligned delivery expectations and client satisfaction.',
    image: '/team/vijayan.jpg',
  },
];

function Page() {
  return (
    <div className="bg-white text-slate-900">
      {/* 1. HERO BANNER (Image 1) */}
      <section className="relative overflow-hidden pt-12 pb-10 sm:pt-16 sm:pb-14 bg-white border-b border-slate-200/80">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src={team}
            alt="TP IT Group Leadership Team Meeting"
            className="h-full w-full object-cover object-center opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/70" />
        </div>

        <div className="site-container relative z-10 text-left">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#d7192a]">
            TP IT GROUP / OUR TEAM
          </p>
          <h1 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Our Team
          </h1>
          <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
            Leadership bringing together enterprise strategy, operational discipline, cloud architecture and engineering
            to support your next transformation.
          </p>
        </div>
      </section>

      {/* 2. LEADERSHIP SHOWCASE (Images 2 & 3) */}
      <section className="section bg-white text-slate-900 bg-dot-pattern">
        <div className="site-container">
          <div className="text-left mb-8">
            <span className="inline-block rounded-full bg-red-50/90 border border-red-200 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#d7192a]">
              OUR TEAM
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
              Leadership
            </h2>
            <p className="mt-1.5 text-xs text-slate-500">
              Illustrated avatars — not actual portraits.
            </p>
          </div>

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {leaders.map((leader, idx) => (
              <motion.article
                key={leader.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group flex flex-col rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:border-red-200 transition-all duration-300"
              >
                {/* 3D Illustrated Avatar */}
                <div className="relative aspect-[4/5] sm:aspect-square w-full overflow-hidden bg-[#cdd1dc]/40 border-b border-slate-100">
                  <img
                    src={leader.image}
                    alt={`${leader.name} - ${leader.role}`}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Leader Bio Info */}
                <div className="p-6 sm:p-7 flex flex-col flex-grow text-left">
                  <h3 className="text-xl font-bold text-slate-900">{leader.name}</h3>
                  <p className="text-xs sm:text-[13px] font-bold text-[#d7192a] mt-1">
                    {leader.role}
                  </p>
                  <p className="text-xs font-medium text-slate-700 mt-3 leading-relaxed">
                    {leader.subRole}
                  </p>
                  <div className="my-4 border-t border-slate-100" />
                  <p className="text-xs leading-relaxed text-slate-600 flex-grow">
                    {leader.bio}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CONTACT BANNER */}
      <ContactBanner />
    </div>
  );
}
