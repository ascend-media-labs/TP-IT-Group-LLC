import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Globe2, Clock, Users, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { companyInfo } from './content';

interface HubDetail {
  id: string;
  country: string;
  city: string;
  role: string;
  address: string;
  timeZone: string;
  workforce: string;
  capabilities: string[];
  status: string;
}

const GLOBAL_HUBS: HubDetail[] = [
  {
    id: 'usa',
    country: 'United States',
    city: 'Wilmington, Delaware',
    role: 'Global Headquarters & Executive Office',
    address: '# 1207 Delaware Ave #2070, Wilmington, DE - 19806',
    timeZone: 'America/New_York',
    workforce: 'Enterprise Leadership & Architecture',
    capabilities: ['Enterprise Strategy', 'SAP Modernization', 'Cloud Governance', 'Federal & Fortune 500 Programs'],
    status: 'Operational 24/7',
  },
  {
    id: 'india',
    country: 'India',
    city: 'Pune & Bengaluru',
    role: 'Global FinLabs & Deep-Tech Engineering Hub',
    address: 'Technology Innovation Center, Magarpatta / Whitefield',
    timeZone: 'Asia/Kolkata',
    workforce: 'Core R&D, AI/ML & DevOps Engineers',
    capabilities: ['FinLabs AI Innovation', 'Full-Stack Engineering', 'DevOps & SRE', 'Continuous 24/7 Delivery'],
    status: 'Operational 24/7',
  },
  {
    id: 'uk',
    country: 'United Kingdom',
    city: 'London',
    role: 'EMEA Technology & Banking Practice',
    address: 'Financial District & European Operations',
    timeZone: 'Europe/London',
    workforce: 'FinTech & Regulatory Specialists',
    capabilities: ['Banking Modernization', 'Open Finance Protocols', 'Cross-Border Architecture', 'Cloud Migration'],
    status: 'Operational 24/7',
  },
  {
    id: 'canada',
    country: 'Canada',
    city: 'Toronto, Ontario',
    role: 'North American Delivery & Cloud Engineering',
    address: 'Bay Street Enterprise Center',
    timeZone: 'America/Toronto',
    workforce: 'Cloud Infrastructure & S/4HANA Experts',
    capabilities: ['Cloud Optimization', 'ERP Transformation', 'Data Analytics', 'Strategic IT Staffing'],
    status: 'Operational 24/7',
  },
  {
    id: 'australia',
    country: 'Australia',
    city: 'Sydney, NSW',
    role: 'APAC Regional Operations & Field Solutions',
    address: 'Barangaroo Technology Hub',
    timeZone: 'Australia/Sydney',
    workforce: 'APAC Enterprise Architects & Consultants',
    capabilities: ['IoT & Industry 4.0', 'Enterprise Support', 'Digital Workplaces', 'Workforce Scalability'],
    status: 'Operational 24/7',
  },
];

export function GlobalPresence() {
  const [selectedHub, setSelectedHub] = useState<HubDetail>(GLOBAL_HUBS[0]);
  const [times, setTimes] = useState<Record<string, string>>({});

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const newTimes: Record<string, string> = {};
      GLOBAL_HUBS.forEach((hub) => {
        try {
          newTimes[hub.id] = new Intl.DateTimeFormat('en-US', {
            timeZone: hub.timeZone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
          }).format(now);
        } catch {
          newTimes[hub.id] = '24/7 Active';
        }
      });
      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden py-12 sm:py-16 bg-slate-50/70 text-slate-900 border-y border-slate-200/80">
      {/* Ambient background glow & transparent grid texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(2,132,199,0.08),transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="site-container relative z-10">
        <div className="max-w-3xl text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-sky-700 shadow-xs backdrop-blur-md">
            <Globe2 className="size-3.5" />
            Global Presence &amp; Operations
          </div>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            A Follow-the-Sun Infrastructure Across{' '}
            <span className="bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
              5 Continents
            </span>
          </h2>
          <p className="mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed text-slate-600">
            TP iT GROUP LLC operates high-performing technical engineering hubs and client engagement centers worldwide,
            ensuring continuous 24/7 delivery and global domain compliance.
          </p>
        </div>

        {/* Hub Selector Navigation */}
        <div className="mt-6 flex flex-wrap justify-start gap-2 sm:gap-3">
          {GLOBAL_HUBS.map((hub) => (
            <button
              key={hub.id}
              onClick={() => setSelectedHub(hub)}
              className={`relative rounded-xl px-4 py-2.5 text-xs font-semibold transition-all duration-300 backdrop-blur-md ${
                selectedHub.id === hub.id
                  ? 'border border-sky-500 bg-sky-50 text-sky-700 shadow-sm shadow-sky-500/15 font-bold'
                  : 'border border-slate-200/90 bg-white/90 text-slate-600 hover:border-slate-300 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`size-2 rounded-full ${
                    selectedHub.id === hub.id ? 'bg-sky-500 animate-pulse' : 'bg-emerald-500'
                  }`}
                />
                <span>{hub.country}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Active Hub Card Feature */}
        <motion.div
          key={selectedHub.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-7 overflow-hidden rounded-3xl border border-slate-200/90 bg-white/95 p-6 md:p-8 backdrop-blur-xl shadow-xl shadow-slate-900/5"
        >
          <div className="grid gap-10 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-sky-50 border border-sky-200 px-3.5 py-1 text-xs font-bold text-sky-700">
                  {selectedHub.country}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {selectedHub.role}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {selectedHub.city}
                </h3>
                <p className="mt-2 text-sm text-slate-600 flex items-center gap-2">
                  <MapPin className="size-4 shrink-0 text-sky-600" />
                  {selectedHub.address}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-y border-slate-100 py-5">
                <div>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <Clock className="size-3.5 text-sky-600" /> Local Hub Time
                  </div>
                  <div className="mt-1 font-mono text-xl font-bold text-slate-900 tabular-nums">
                    {times[selectedHub.id] || '24/7 Active'}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <ShieldCheck className="size-3.5 text-emerald-600" /> Operational Status
                  </div>
                  <div className="mt-1 text-sm font-bold text-emerald-600">
                    {selectedHub.status}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Core Focus &amp; Capabilities</h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedHub.capabilities.map((cap) => (
                    <span
                      key={cap}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stat Visual / Network Node Visual */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-tr from-[#020b1e] via-[#051433] to-[#040f28] p-8 shadow-inner">
                <div className="absolute top-0 right-0 -mr-12 -mt-12 size-40 rounded-full bg-cyan-500/15 blur-3xl" />
                <div className="relative z-10 space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#00D1FF]">
                      GLOBAL NETWORK
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400">
                      <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
                      SYNCHRONIZED
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2">
                      <span className="text-zinc-400">Global Workforce</span>
                      <span className="font-bold text-white">10,000+ Specialists</span>
                    </div>
                    <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2">
                      <span className="text-zinc-400">Client Engagements</span>
                      <span className="font-bold text-white">100+ Enterprise Projects</span>
                    </div>
                    <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2">
                      <span className="text-zinc-400">SLA Availability</span>
                      <span className="font-bold text-[#00D1FF]">99.99% Continuous</span>
                    </div>
                    <div className="flex items-center justify-between text-xs pb-1">
                      <span className="text-zinc-400">IP Transfer</span>
                      <span className="font-bold text-white">100% Client Ownership</span>
                    </div>
                  </div>

                  <a
                    href={`mailto:${companyInfo.email}?subject=Inquiry for ${selectedHub.country} Operations`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00D1FF] to-[#05a2c9] px-4 py-3 text-xs font-bold text-black shadow-lg shadow-cyan-500/20 transition hover:opacity-95"
                  >
                    Contact {selectedHub.country} Center <ArrowUpRight className="size-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

