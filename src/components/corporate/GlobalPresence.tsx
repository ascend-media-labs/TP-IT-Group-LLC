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
    <section className="relative overflow-hidden py-24 sm:py-32 bg-[#030712] text-white border-y border-white/10">
      {/* Ambient background glow & grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,209,255,0.12),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="site-container relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00D1FF] backdrop-blur-md">
            <Globe2 className="size-3.5" />
            Global Presence &amp; Operations
          </div>
          <h2 className="mt-5 max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            A Follow-the-Sun Infrastructure Across{' '}
            <span className="bg-gradient-to-r from-[#00D1FF] to-[#38bdf8] bg-clip-text text-transparent">
              5 Continents
            </span>
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            TP iT GROUP LLC operates high-performing technical engineering hubs and client engagement centers worldwide,
            ensuring continuous 24/7 delivery and global domain compliance.
          </p>
        </div>

        {/* Hub Selector Navigation */}
        <div className="mt-12 flex flex-wrap justify-center gap-2 sm:gap-3">
          {GLOBAL_HUBS.map((hub) => (
            <button
              key={hub.id}
              onClick={() => setSelectedHub(hub)}
              className={`relative rounded-xl px-4 py-2.5 text-xs font-semibold transition-all duration-300 backdrop-blur-md ${
                selectedHub.id === hub.id
                  ? 'border border-[#00D1FF] bg-[#00D1FF]/15 text-[#00D1FF] shadow-[0_0_20px_rgba(0,209,255,0.25)]'
                  : 'border border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`size-2 rounded-full ${
                    selectedHub.id === hub.id ? 'bg-[#00D1FF] animate-pulse' : 'bg-emerald-400'
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
          className="mt-10 overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 backdrop-blur-xl shadow-2xl md:p-12"
        >
          <div className="grid gap-10 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-cyan-500/20 px-3.5 py-1 text-xs font-bold text-[#00D1FF]">
                  {selectedHub.country}
                </span>
                <span className="text-xs font-semibold text-zinc-400">
                  {selectedHub.role}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {selectedHub.city}
                </h3>
                <p className="mt-2 text-sm text-zinc-300 flex items-center gap-2">
                  <MapPin className="size-4 shrink-0 text-[#00D1FF]" />
                  {selectedHub.address}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-y border-white/10 py-5">
                <div>
                  <div className="flex items-center gap-2 text-xs font-medium text-zinc-400">
                    <Clock className="size-3.5 text-[#00D1FF]" /> Local Hub Time
                  </div>
                  <div className="mt-1 font-mono text-xl font-bold text-white tabular-nums">
                    {times[selectedHub.id] || '24/7 Active'}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs font-medium text-zinc-400">
                    <ShieldCheck className="size-3.5 text-emerald-400" /> Operational Status
                  </div>
                  <div className="mt-1 text-sm font-bold text-emerald-400">
                    {selectedHub.status}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Core Focus &amp; Capabilities</h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedHub.capabilities.map((cap) => (
                    <span
                      key={cap}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-200"
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
