import { useState, useId } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Building2, ArrowRight, ShieldCheck, Sparkles, ExternalLink, Globe2 } from 'lucide-react';
import { companyInfo } from './content';
import { REAL_MAP_PATHS } from './mapPaths';

export interface LocationNode {
  id: string;
  code: string;
  country: string;
  city: string;
  badge: string;
  isPrimary?: boolean;
  address: string;
  phone: string;
  stats: string;
  capabilities: string[];
  tag: string;
  // Geographic pin coordinates on real main map
  mapX: number;
  mapY: number;
  // Exit coordinate on right edge to meet the corresponding pill (3 pills total)
  targetY: number;
  miniMapType: 'usa' | 'canada' | 'india';
}

export const THREE_GLOBAL_LOCATIONS: LocationNode[] = [
  {
    id: 'usa',
    code: 'US',
    country: 'United States',
    city: 'Wilmington, Delaware',
    badge: '★ Global Corporate Headquarters',
    isPrimary: true,
    address: '1000 N. West Street, Suite 1200, Wilmington, Delaware, 19801, USA',
    phone: '+1 (814) 844-1361',
    stats: '680 USA Roles · Executive Governance & Enterprise Strategy',
    capabilities: ['Global Executive HQ', 'Enterprise Strategy', 'SAP S/4HANA Governance', 'Cloud Architecture'],
    tag: 'GLOBAL HQ',
    mapX: REAL_MAP_PATHS.main.coords.wilmington.x,
    mapY: REAL_MAP_PATHS.main.coords.wilmington.y,
    targetY: 60,
    miniMapType: 'usa',
  },
  {
    id: 'canada',
    code: 'CA',
    country: 'Canada',
    city: 'Ontario, Canada',
    badge: '🇨🇦 North American Delivery Hub',
    isPrimary: true,
    address: 'Ontario, Canada',
    phone: '+1 (814) 844-1362',
    stats: '204 Canada Roles · Cloud Infrastructure & ERP',
    capabilities: ['Cloud Infrastructure', 'DevOps & SRE', 'Nearshore Client Delivery', 'Enterprise Consulting'],
    tag: 'DELIVERY HUB',
    mapX: REAL_MAP_PATHS.main.coords.ontario.x,
    mapY: REAL_MAP_PATHS.main.coords.ontario.y,
    targetY: 180,
    miniMapType: 'canada',
  },
  {
    id: 'india',
    code: 'IN',
    country: 'India',
    city: 'Hyderabad, Telangana',
    badge: '★ Corporate & Deep-Tech Innovation Center',
    isPrimary: true,
    address: '13th Floor, Manjeera Trinity Corporate, Kukatpally, Hyderabad, Telangana 500072, India',
    phone: '+1 (814) 844-1361',
    stats: '136 India Roles · FinLabs AI & Platform R&D',
    capabilities: ['FinLabs AI Innovation', 'Full-Stack Engineering', 'Cloud Native Platforms', '24/7 Operations'],
    tag: 'TECH CENTER',
    mapX: REAL_MAP_PATHS.main.coords.hyderabad.x,
    mapY: REAL_MAP_PATHS.main.coords.hyderabad.y,
    targetY: 300,
    miniMapType: 'india',
  },
];

export function GlobalMapConnection({ className = '' }: { className?: string }) {
  const [activeId, setActiveId] = useState<string>('usa');
  const activeNode = THREE_GLOBAL_LOCATIONS.find((n) => n.id === activeId) || THREE_GLOBAL_LOCATIONS[0];
  const uniqueId = useId();

  return (
    <section className={`relative overflow-hidden py-10 sm:py-14 bg-gradient-to-b from-slate-50/70 via-white to-slate-50/80 border-t border-slate-200/90 text-slate-900 ${className}`}>
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.035),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(215,25,42,0.035),transparent_60%)]" />

      <div className="site-container relative z-10 space-y-6 sm:space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
              <Globe2 className="size-3.5" />
              Global Reach &amp; Locations
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
              Connected Across <span className="text-blue-600">USA</span> · <span className="text-red-600">Canada</span> · <span className="text-sky-600">India</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-2xl">
              Continuous 24/7 global delivery network. Select a country to view live coordinates, capabilities, and office support.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-blue-600 shadow-xs" /> USA HQ
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-red-600 shadow-xs" /> Canada Hub
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-sky-500 shadow-xs" /> India Tech Center
            </span>
          </div>
        </div>

        {/* Main Interactive Map & Connection Container */}
        <div className="relative rounded-3xl border border-slate-200/90 bg-white/95 p-4 sm:p-6 lg:p-7 shadow-xl shadow-slate-900/5 overflow-hidden">
          {/* Tech background grid */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.02)_1px,transparent_1px)] bg-[size:2rem_2rem]" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left & Center: Real Vector Map with Dynamic Connecting Bezier Curves */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              
              {/* Real Map SVG (7 cols on desktop) */}
              <div className="md:col-span-7 relative w-full h-[360px] flex items-center justify-center bg-slate-50/70 rounded-2xl border border-slate-200/80 p-2 shadow-inner overflow-hidden">
                <svg
                  viewBox="0 0 440 360"
                  className="w-full h-full drop-shadow-xs overflow-visible"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Subtle Grid / Longitude Background Lines */}
                  <g className="opacity-15 stroke-slate-400 stroke-[0.75] fill-none" strokeDasharray="3 3">
                    <circle cx="150" cy="180" r="130" />
                    <ellipse cx="230" cy="180" rx="200" ry="110" />
                    <line x1="10" y1="180" x2="430" y2="180" />
                    <line x1="220" y1="20" x2="220" y2="340" />
                  </g>

                  {/* REAL COUNTRY MAP OUTLINES: Canada, USA, and India */}
                  <g className="transition-all duration-300">
                    {/* Real Canada Map Outline */}
                    <path
                      d={REAL_MAP_PATHS.main.canada}
                      className={`transition-all duration-300 cursor-pointer ${
                        activeNode.id === 'canada'
                          ? 'fill-red-600/90 stroke-red-500 stroke-[1.5] filter drop-shadow(0 4px 12px rgba(220,38,38,0.35))'
                          : 'fill-red-100/70 stroke-red-300 stroke-[1] hover:fill-red-200/80'
                      }`}
                      onClick={() => setActiveId('canada')}
                    />

                    {/* Real United States Map Outline */}
                    <path
                      d={REAL_MAP_PATHS.main.usa}
                      className={`transition-all duration-300 cursor-pointer ${
                        activeNode.id === 'usa'
                          ? 'fill-blue-600/90 stroke-blue-500 stroke-[1.5] filter drop-shadow(0 4px 14px rgba(37,99,235,0.35))'
                          : 'fill-blue-100/70 stroke-blue-300 stroke-[1] hover:fill-blue-200/80'
                      }`}
                      onClick={() => setActiveId('usa')}
                    />

                    {/* Real India Map Outline */}
                    <path
                      d={REAL_MAP_PATHS.main.india}
                      className={`transition-all duration-300 cursor-pointer ${
                        activeNode.id === 'india'
                          ? 'fill-sky-600/90 stroke-sky-400 stroke-[1.5] filter drop-shadow(0 4px 14px rgba(14,165,233,0.35))'
                          : 'fill-sky-100/70 stroke-sky-300 stroke-[1] hover:fill-sky-200/80'
                      }`}
                      onClick={() => setActiveId('india')}
                    />
                  </g>

                  {/* Dynamic Connecting Bezier Curves from Map Points to Right Edge (Meeting 3 Pills) */}
                  <g className="fill-none">
                    {THREE_GLOBAL_LOCATIONS.map((loc) => {
                      const isActive = loc.id === activeId;
                      const pathD = `M ${loc.mapX} ${loc.mapY} C ${loc.mapX + 70} ${loc.mapY}, 380 ${loc.targetY}, 440 ${loc.targetY}`;
                      const strokeColor =
                        loc.id === 'canada'
                          ? '#dc2626'
                          : loc.id === 'usa'
                            ? '#2563eb'
                            : '#0284c7';

                      return (
                        <g key={`curve-${loc.id}`}>
                          {/* Inactive or Background Curve */}
                          <path
                            d={pathD}
                            stroke={isActive ? strokeColor : '#94a3b8'}
                            strokeWidth={isActive ? '2.5' : '1'}
                            strokeDasharray={isActive ? '6 4' : '3 3'}
                            strokeOpacity={isActive ? 1 : 0.35}
                            className="transition-all duration-300"
                          />

                          {/* Animated Tracer Particle on Active Curve */}
                          {isActive && (
                            <circle r="3.5" fill={strokeColor} className="filter drop-shadow(0 0 4px currentColor)">
                              <animateMotion
                                dur="2.2s"
                                repeatCount="indefinite"
                                path={pathD}
                              />
                            </circle>
                          )}
                        </g>
                      );
                    })}
                  </g>

                  {/* Real Location Pins & Concentric Radar Pulses */}
                  {THREE_GLOBAL_LOCATIONS.map((loc) => {
                    const isActive = loc.id === activeId;
                    const pinColor =
                      loc.id === 'canada'
                        ? '#dc2626'
                        : loc.id === 'usa'
                          ? '#2563eb'
                          : '#0284c7';

                    return (
                      <g
                        key={`pin-${loc.id}`}
                        className="cursor-pointer transition-transform duration-200 hover:scale-110"
                        onClick={() => setActiveId(loc.id)}
                      >
                        {/* Radar Pulse for Active Location */}
                        {isActive && (
                          <>
                            <circle
                              cx={loc.mapX}
                              cy={loc.mapY}
                              r="15"
                              fill="none"
                              stroke={pinColor}
                              strokeWidth="1.5"
                              className="animate-ping opacity-60"
                            />
                            <circle
                              cx={loc.mapX}
                              cy={loc.mapY}
                              r="24"
                              fill="none"
                              stroke={pinColor}
                              strokeWidth="1"
                              className="animate-pulse opacity-30"
                            />
                          </>
                        )}

                        {/* Outer Pin Circle */}
                        <circle
                          cx={loc.mapX}
                          cy={loc.mapY}
                          r={isActive ? 7 : 5}
                          fill="#ffffff"
                          stroke={pinColor}
                          strokeWidth={isActive ? 3 : 2}
                          className="transition-all duration-300 drop-shadow-sm"
                        />

                        {/* Center Dot */}
                        <circle
                          cx={loc.mapX}
                          cy={loc.mapY}
                          r={isActive ? 3.5 : 2}
                          fill={pinColor}
                          className="transition-all duration-300"
                        />

                        {/* City Label on Real Map */}
                        <text
                          x={loc.mapX + (loc.id === 'india' ? 12 : -10)}
                          y={loc.mapY - 10}
                          textAnchor={loc.id === 'india' ? 'start' : 'end'}
                          className={`font-sans font-bold text-[10px] select-none pointer-events-none transition-all duration-200 ${
                            isActive ? 'fill-slate-950 font-extrabold text-[11px]' : 'fill-slate-600'
                          }`}
                        >
                          {loc.city.split(',')[0]}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Bottom Left Badge */}
                <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-md rounded-lg border border-slate-200/90 px-2 py-0.5 text-[9.5px] font-semibold text-slate-600 shadow-2xs flex items-center gap-1.5 pointer-events-none">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Real Vector Geo Outlines</span>
                </div>
              </div>

              {/* Middle: ONLY 3 Location Capsule Pills (US, CANADA, INDIA) */}
              <div className="md:col-span-5 flex flex-col gap-3 justify-around h-[360px]">
                {THREE_GLOBAL_LOCATIONS.map((node) => {
                  const isActive = node.id === activeId;
                  const isUS = node.id === 'usa';
                  const isCA = node.id === 'canada';

                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => setActiveId(node.id)}
                      className={`group relative w-full h-[95px] flex items-center justify-between px-3.5 sm:px-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                        isActive
                          ? isCA
                            ? 'border-red-600 bg-red-50/80 shadow-md shadow-red-500/10 ring-1 ring-red-500'
                            : 'border-blue-600 bg-blue-50/80 shadow-md shadow-blue-500/10 ring-1 ring-blue-500'
                          : 'border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/80 shadow-2xs'
                      }`}
                    >
                      {/* Left Anchor Point indicator (where SVG curve connects) */}
                      <span
                        className={`absolute -left-1 top-1/2 -translate-y-1/2 size-2 rounded-full transition-all ${
                          isActive
                            ? isCA
                              ? 'bg-red-600 scale-125'
                              : 'bg-blue-600 scale-125'
                            : 'bg-slate-300'
                        }`}
                      />

                      {/* Left: Code Avatar + Country & City details */}
                      <div className="flex items-center gap-3 min-w-0 pl-1">
                        {/* Circular 2-Letter Badge */}
                        <div
                          className={`size-10 rounded-full shrink-0 flex items-center justify-center font-bold text-sm transition-colors shadow-2xs ${
                            isActive
                              ? isCA
                                ? 'bg-red-600 text-white'
                                : 'bg-blue-600 text-white'
                              : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
                          }`}
                        >
                          {node.code}
                        </div>

                        {/* Title & Subtitle */}
                        <div className="truncate">
                          <div className="flex items-center gap-1.5">
                            <span className={`text-sm sm:text-base font-bold truncate ${isActive ? 'text-slate-950 font-extrabold' : 'text-slate-900'}`}>
                              {node.country}
                            </span>
                            <span className="text-[11px] text-amber-500">★</span>
                          </div>
                          <p className="text-xs font-semibold text-slate-700 truncate mt-0.5">
                            {node.city}
                          </p>
                          <p className="text-[10.5px] text-slate-500 truncate mt-0.5">
                            {node.badge}
                          </p>
                        </div>
                      </div>

                      {/* Right Indicator (Radio/Active Indicator) */}
                      <div className="shrink-0 pl-2">
                        <div
                          className={`size-4 rounded-full border flex items-center justify-center transition-colors ${
                            isActive
                              ? isCA
                                ? 'border-red-600 bg-red-600'
                                : 'border-blue-600 bg-blue-600'
                              : 'border-slate-300 bg-white group-hover:border-slate-400'
                          }`}
                        >
                          {isActive && <div className="size-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Featured Location Details Card with Real Mini-Map Outline */}
            <div className="lg:col-span-4 h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNode.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-gradient-to-b from-white via-white to-blue-50/30 p-5 shadow-md text-left flex flex-col justify-between h-[360px]"
                >
                  <div>
                    {/* Header Pill & Tag */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`inline-flex items-center gap-1.5 rounded-full text-white px-2.5 py-0.5 text-[10.5px] font-bold ${
                        activeNode.id === 'canada' ? 'bg-red-600' : 'bg-blue-600'
                      }`}>
                        <MapPin className="size-3" />
                        Our Service Hubs
                      </span>
                      <span className="font-mono text-[9.5px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {activeNode.tag}
                      </span>
                    </div>

                    {/* Real Mini-Map Graphic Outline */}
                    <div className="h-28 w-full rounded-xl border border-slate-100 bg-slate-50/90 p-2 flex items-center justify-center relative overflow-hidden mb-3 shadow-inner">
                      <svg viewBox="0 0 100 80" className="h-full w-full max-h-24 drop-shadow-sm">
                        {/* Real country path */}
                        <path
                          d={REAL_MAP_PATHS.mini[activeNode.miniMapType].path}
                          className={`${
                            activeNode.id === 'canada'
                              ? 'fill-red-600/85 stroke-red-700'
                              : activeNode.id === 'usa'
                                ? 'fill-blue-600/85 stroke-blue-700'
                                : 'fill-sky-600/85 stroke-sky-700'
                          } stroke-[1]`}
                        />
                        {/* Real pin coordinate */}
                        <circle
                          cx={REAL_MAP_PATHS.mini[activeNode.miniMapType].pin.x}
                          cy={REAL_MAP_PATHS.mini[activeNode.miniMapType].pin.y}
                          r="3.5"
                          fill="#ffffff"
                          stroke={
                            activeNode.id === 'canada'
                              ? '#b91c1c'
                              : activeNode.id === 'india'
                                ? '#0284c7'
                                : '#1d4ed8'
                          }
                          strokeWidth="2"
                        />
                        <circle
                          cx={REAL_MAP_PATHS.mini[activeNode.miniMapType].pin.x}
                          cy={REAL_MAP_PATHS.mini[activeNode.miniMapType].pin.y}
                          r="7"
                          fill="none"
                          stroke={
                            activeNode.id === 'canada'
                              ? '#dc2626'
                              : activeNode.id === 'india'
                                ? '#0ea5e9'
                                : '#2563eb'
                          }
                          strokeWidth="1"
                          className="animate-ping"
                        />
                      </svg>
                      <div className="absolute bottom-1.5 right-2 text-[9px] font-mono text-slate-400 bg-white/90 px-1 py-0.5 rounded">
                        {activeNode.code} REAL MAP
                      </div>
                    </div>

                    {/* Country & City Title */}
                    <div>
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-snug">
                        {activeNode.country}
                      </h3>
                      <p className={`text-xs font-semibold ${activeNode.id === 'canada' ? 'text-red-600' : 'text-blue-600'}`}>
                        {activeNode.city}
                      </p>
                    </div>

                    {/* Address & Phone */}
                    <div className="mt-2.5 space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-2">
                      <div className="flex items-start gap-1.5">
                        <MapPin className={`size-3.5 shrink-0 mt-0.5 ${activeNode.id === 'canada' ? 'text-red-600' : 'text-blue-600'}`} />
                        <span className="leading-tight text-[11px] line-clamp-2">{activeNode.address}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Phone className={`size-3.5 shrink-0 ${activeNode.id === 'canada' ? 'text-red-600' : 'text-blue-600'}`} />
                        <a href={`tel:${activeNode.phone.replace(/[^0-9+]/g, '')}`} className={`font-mono font-bold text-slate-800 hover:${activeNode.id === 'canada' ? 'text-red-600' : 'text-blue-600'} transition text-[11px]`}>
                          {activeNode.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Action CTA Button */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100">
                    <a
                      href={`mailto:${companyInfo.email}?subject=Inquiry for ${encodeURIComponent(activeNode.city)} Office (${encodeURIComponent(activeNode.country)})`}
                      className={`w-full inline-flex items-center justify-center gap-2 rounded-xl text-white font-bold text-xs py-2 shadow-sm transition hover:shadow-md ${
                        activeNode.id === 'canada'
                          ? 'bg-red-600 hover:bg-red-700 shadow-red-500/20'
                          : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20'
                      }`}
                    >
                      Connect with {activeNode.country} Hub <ArrowRight className="size-3.5" />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
