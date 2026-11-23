import { useState, useId } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Building2, ArrowRight, ShieldCheck, Sparkles, ExternalLink, Globe2 } from 'lucide-react';
import { companyInfo } from './content';

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
  // Coordinates in SVG map viewBox 0 0 440 370
  mapX: number;
  mapY: number;
  // Exit coordinate on right edge to meet the corresponding pill
  targetY: number;
  miniMapType: 'usa' | 'canada' | 'india';
}

export const GLOBAL_LOCATIONS: LocationNode[] = [
  {
    id: 'us-de',
    code: 'US',
    country: 'United States',
    city: 'Wilmington, Delaware',
    badge: '★ Global Corporate HQ',
    isPrimary: true,
    address: '1000 N. West Street, Suite 1200, Wilmington, DE 19801',
    phone: '+1 (814) 844-1361',
    stats: '680 USA Roles · 24/7 Global Governance',
    capabilities: ['Global Executive HQ', 'Enterprise Strategy', 'SAP Governance', 'Cloud Transformation'],
    tag: 'GLOBAL HQ',
    mapX: 130,
    mapY: 155,
    targetY: 27,
    miniMapType: 'usa',
  },
  {
    id: 'ca-on',
    code: 'CA',
    country: 'Canada',
    city: 'Ontario, Canada',
    badge: '🇨🇦 Delivery & Operations Hub',
    isPrimary: true,
    address: 'Ontario, Canada',
    phone: '+1 (814) 844-1362',
    stats: '204 Canada Roles · Cloud & S/4HANA Delivery',
    capabilities: ['Cloud Infrastructure', 'DevOps & SRE', 'Nearshore Delivery', 'Enterprise Consulting'],
    tag: 'DELIVERY HUB',
    mapX: 140,
    mapY: 90,
    targetY: 79,
    miniMapType: 'canada',
  },
  {
    id: 'in-tg',
    code: 'IN',
    country: 'India',
    city: 'Hyderabad, Telangana',
    badge: '★ Corporate & Tech Center',
    isPrimary: true,
    address: '13th Floor, Manjeera Trinity, Kukatpally, Hyderabad, Telangana 500072',
    phone: '+1 (814) 844-1361',
    stats: '136 India Roles · FinLabs & Deep-Tech R&D',
    capabilities: ['FinLabs AI Innovation', 'Full-Stack Development', 'ERP Modernization', '24/7 Tech Center'],
    tag: 'TECH CENTER',
    mapX: 255,
    mapY: 205,
    targetY: 131,
    miniMapType: 'india',
  },
  {
    id: 'us-ca',
    code: 'US',
    country: 'United States',
    city: 'Silicon Valley, CA',
    badge: 'West Coast Enterprise Practice',
    address: 'Bay Area Technology Operations, California',
    phone: '+1 (814) 844-1361',
    stats: 'Client Engagements · High-Tech Partnerships',
    capabilities: ['Next-Gen AI Practice', 'Cloud Architecture', 'Agile Client Pods'],
    tag: 'REGIONAL HUB',
    mapX: 75,
    mapY: 150,
    targetY: 183,
    miniMapType: 'usa',
  },
  {
    id: 'us-tx',
    code: 'US',
    country: 'United States',
    city: 'Austin & Dallas, TX',
    badge: 'Central Enterprise Delivery',
    address: 'Texas Technology Corridor, USA',
    phone: '+1 (814) 844-1361',
    stats: 'Enterprise Data & Hybrid Cloud Engineering',
    capabilities: ['Data Engineering', 'ERP Implementations', 'Systems Integration'],
    tag: 'REGIONAL HUB',
    mapX: 105,
    mapY: 180,
    targetY: 235,
    miniMapType: 'usa',
  },
  {
    id: 'in-mh',
    code: 'IN',
    country: 'India',
    city: 'Pune & Mumbai, MH',
    badge: 'Deep-Tech & DevOps Delivery',
    address: 'Tech Innovation District, Maharashtra, India',
    phone: '+1 (814) 844-1361',
    stats: 'SRE & Continuous Platform Reliability',
    capabilities: ['Platform SRE', 'Continuous Integration', 'Security Engineering'],
    tag: 'DELIVERY HUB',
    mapX: 238,
    mapY: 218,
    targetY: 287,
    miniMapType: 'india',
  },
  {
    id: 'in-ka',
    code: 'IN',
    country: 'India',
    city: 'Bengaluru, Karnataka',
    badge: 'AI/ML & Cloud Acceleration Hub',
    address: 'Electronic City Tech Hub, Bengaluru, India',
    phone: '+1 (814) 844-1361',
    stats: 'AI/ML Research & Cloud Solutions',
    capabilities: ['Generative AI', 'Big Data Analytics', 'Enterprise Mobile'],
    tag: 'INNOVATION HUB',
    mapX: 250,
    mapY: 242,
    targetY: 339,
    miniMapType: 'india',
  },
];

export function GlobalMapConnection({ className = '' }: { className?: string }) {
  const [activeId, setActiveId] = useState<string>('us-de');
  const activeNode = GLOBAL_LOCATIONS.find((n) => n.id === activeId) || GLOBAL_LOCATIONS[0];
  const uniqueId = useId();

  return (
    <section className={`relative overflow-hidden py-10 sm:py-14 bg-gradient-to-b from-slate-50/70 via-white to-slate-50/80 border-t border-slate-200/90 text-slate-900 ${className}`}>
      {/* Background radial ambient lights */}
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
              Connected Across <span className="text-blue-600">USA</span> · <span className="text-red-600">Canada</span> · <span className="text-blue-600">India</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-2xl">
              Follow-the-sun continuous delivery and executive governance. Select any region or office below to view live coordinates, capabilities, and contact details.
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

        {/* Main Interactive Map & Connection Container (Matching user reference layout) */}
        <div className="relative rounded-3xl border border-slate-200/90 bg-white/95 p-4 sm:p-6 lg:p-7 shadow-xl shadow-slate-900/5 overflow-hidden">
          {/* Tech background grid */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.02)_1px,transparent_1px)] bg-[size:2rem_2rem]" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left & Middle: Combined SVG Map + Connection Flow Curves + Capsule Pills */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              
              {/* Map SVG with Outlines & Dynamic Connection Curves (7 cols on desktop) */}
              <div className="md:col-span-7 relative w-full h-[370px] flex items-center justify-center bg-slate-50/70 rounded-2xl border border-slate-200/80 p-2 shadow-inner overflow-hidden">
                <svg
                  viewBox="0 0 440 370"
                  className="w-full h-full drop-shadow-xs overflow-visible"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    {/* Gradients */}
                    <linearGradient id={`map-usa-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1e3a8a" />
                      <stop offset="100%" stopColor="#2563eb" />
                    </linearGradient>
                    <linearGradient id={`map-can-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#b91c1c" />
                      <stop offset="100%" stopColor="#dc2626" />
                    </linearGradient>
                    <linearGradient id={`map-ind-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0369a1" />
                      <stop offset="100%" stopColor="#0ea5e9" />
                    </linearGradient>
                  </defs>

                  {/* Stylized Compass & Longitude Circles */}
                  <g className="opacity-15 stroke-slate-400 stroke-[0.75] fill-none" strokeDasharray="3 3">
                    <circle cx="170" cy="180" r="130" />
                    <ellipse cx="170" cy="180" rx="160" ry="95" />
                    <line x1="10" y1="180" x2="330" y2="180" />
                    <line x1="170" y1="40" x2="170" y2="320" />
                  </g>

                  {/* World Background Landmass Outlines (Vector USA, Canada, India) */}
                  <g className="transition-all duration-300">
                    {/* Canada Landmass */}
                    <path
                      d="M 60 70 Q 110 40 160 45 Q 190 55 185 85 Q 155 95 125 98 Q 80 95 60 70 Z"
                      className={`transition-all duration-300 cursor-pointer ${
                        activeNode.country === 'Canada'
                          ? 'fill-red-600/90 stroke-red-500 stroke-[1.5] filter drop-shadow(0 4px 10px rgba(220,38,38,0.3))'
                          : 'fill-red-100/60 stroke-red-300/70 stroke-[1] hover:fill-red-200/70'
                      }`}
                      onClick={() => setActiveId('ca-on')}
                    />

                    {/* United States Landmass */}
                    <path
                      d="M 50 110 Q 100 102 165 106 Q 175 130 160 165 Q 125 185 85 175 Q 45 155 50 110 Z"
                      className={`transition-all duration-300 cursor-pointer ${
                        activeNode.country === 'United States'
                          ? 'fill-blue-600/90 stroke-blue-500 stroke-[1.5] filter drop-shadow(0 4px 12px rgba(37,99,235,0.3))'
                          : 'fill-blue-100/60 stroke-blue-300/70 stroke-[1] hover:fill-blue-200/70'
                      }`}
                      onClick={() => setActiveId('us-de')}
                    />

                    {/* India Landmass */}
                    <path
                      d="M 235 155 Q 260 140 275 160 Q 280 195 265 240 Q 252 270 245 275 Q 235 250 225 210 Q 220 180 235 155 Z"
                      className={`transition-all duration-300 cursor-pointer ${
                        activeNode.country === 'India'
                          ? 'fill-sky-600/90 stroke-sky-400 stroke-[1.5] filter drop-shadow(0 4px 12px rgba(14,165,233,0.3))'
                          : 'fill-sky-100/60 stroke-sky-300/70 stroke-[1] hover:fill-sky-200/70'
                      }`}
                      onClick={() => setActiveId('in-tg')}
                    />
                  </g>

                  {/* Animated Continuous Triangle Loop between USA, Canada & India */}
                  <g className="fill-none pointer-events-none opacity-40">
                    <path
                      d="M 130 155 Q 150 110 140 90 Q 220 70 255 205 Q 180 250 130 155"
                      className="stroke-slate-400 stroke-[1.2]"
                      strokeDasharray="4 4"
                    />
                  </g>

                  {/* Dynamic Connecting Bezier Curves from Map Nodes to Right Edge (Meeting Pills) */}
                  <g className="fill-none">
                    {GLOBAL_LOCATIONS.map((loc) => {
                      const isActive = loc.id === activeId;
                      const pathD = `M ${loc.mapX} ${loc.mapY} C ${loc.mapX + 70} ${loc.mapY}, 380 ${loc.targetY}, 440 ${loc.targetY}`;
                      const strokeColor =
                        loc.country === 'Canada'
                          ? '#dc2626'
                          : loc.country === 'United States'
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
                            strokeOpacity={isActive ? 1 : 0.4}
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

                  {/* Location Pins & Radar Pulses */}
                  {GLOBAL_LOCATIONS.map((loc) => {
                    const isActive = loc.id === activeId;
                    const isCountryActive = loc.country === activeNode.country;
                    const pinColor =
                      loc.country === 'Canada'
                        ? '#dc2626'
                        : loc.country === 'United States'
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
                              r="22"
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
                          r={isActive ? 6.5 : isCountryActive ? 5 : 3.5}
                          fill="#ffffff"
                          stroke={pinColor}
                          strokeWidth={isActive ? 2.5 : 1.5}
                          className="transition-all duration-300 drop-shadow-sm"
                        />

                        {/* Center Dot */}
                        <circle
                          cx={loc.mapX}
                          cy={loc.mapY}
                          r={isActive ? 3 : 1.75}
                          fill={pinColor}
                          className="transition-all duration-300"
                        />

                        {/* Key Labels on Map */}
                        {loc.isPrimary && (
                          <text
                            x={loc.mapX + (loc.country === 'India' ? 10 : -8)}
                            y={loc.mapY - 8}
                            textAnchor={loc.country === 'India' ? 'start' : 'end'}
                            className={`font-sans font-bold text-[9.5px] select-none pointer-events-none transition-all duration-200 ${
                              isActive ? 'fill-slate-950 font-extrabold text-[10.5px]' : 'fill-slate-600'
                            }`}
                          >
                            {loc.city.split(',')[0]}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>

                {/* Bottom Left Map Badge */}
                <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-md rounded-lg border border-slate-200/90 px-2 py-0.5 text-[9.5px] font-semibold text-slate-600 shadow-2xs flex items-center gap-1.5 pointer-events-none">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Real-time Operational Loop</span>
                </div>
              </div>

              {/* Middle: Location Capsule Pills List (Direct replication of reference image center pills) */}
              <div className="md:col-span-5 flex flex-col gap-1.5 justify-between h-[370px]">
                {GLOBAL_LOCATIONS.map((node) => {
                  const isActive = node.id === activeId;
                  const isUS = node.code === 'US';
                  const isCA = node.code === 'CA';

                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => setActiveId(node.id)}
                      className={`group relative w-full h-[46px] flex items-center justify-between px-2.5 sm:px-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'border-blue-600 bg-blue-50/80 shadow-sm shadow-blue-500/10 ring-1 ring-blue-500'
                          : 'border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/80 shadow-2xs'
                      }`}
                    >
                      {/* Left Anchor Point indicator (where SVG curve connects) */}
                      <span
                        className={`absolute -left-1 top-1/2 -translate-y-1/2 size-2 rounded-full transition-all ${
                          isActive ? 'bg-blue-600 scale-125' : 'bg-slate-300'
                        }`}
                      />

                      {/* Left: Code Avatar + City & Badge */}
                      <div className="flex items-center gap-2 min-w-0 pl-1">
                        {/* Circular 2-Letter Badge */}
                        <div
                          className={`size-7 rounded-full shrink-0 flex items-center justify-center font-bold text-[10.5px] transition-colors ${
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
                          <div className="flex items-center gap-1 leading-tight">
                            <span className={`text-xs font-bold truncate ${isActive ? 'text-blue-950 font-extrabold' : 'text-slate-900'}`}>
                              {node.city.split(',')[0]}
                            </span>
                            {node.isPrimary && (
                              <span className="text-[9px] text-amber-500">★</span>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-500 truncate leading-none mt-0.5">
                            {node.badge}
                          </p>
                        </div>
                      </div>

                      {/* Right Indicator (Radio/Active Indicator) */}
                      <div className="shrink-0 pl-1.5">
                        <div
                          className={`size-3.5 rounded-full border flex items-center justify-center transition-colors ${
                            isActive
                              ? 'border-blue-600 bg-blue-600'
                              : 'border-slate-300 bg-white group-hover:border-slate-400'
                          }`}
                        >
                          {isActive && <div className="size-1 rounded-full bg-white" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Featured Location Details Card (Matching the right card in user reference) */}
            <div className="lg:col-span-4 h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNode.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-gradient-to-b from-white via-white to-blue-50/30 p-5 shadow-md text-left flex flex-col justify-between h-[370px]"
                >
                  <div>
                    {/* Header Pill & Tag */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 text-white px-2.5 py-0.5 text-[10.5px] font-bold">
                        <MapPin className="size-3" />
                        Our Service Hubs
                      </span>
                      <span className="font-mono text-[9.5px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {activeNode.tag}
                      </span>
                    </div>

                    {/* Mini Map Graphic Representation */}
                    <div className="h-28 w-full rounded-xl border border-slate-100 bg-slate-50/90 p-2 flex items-center justify-center relative overflow-hidden mb-3 shadow-inner">
                      <svg viewBox="0 0 100 80" className="h-full w-full max-h-24 drop-shadow-sm">
                        {activeNode.miniMapType === 'usa' && (
                          <g>
                            <path
                              d="M 10 25 Q 35 22 75 24 Q 90 35 85 55 Q 65 68 40 65 Q 20 62 10 45 Z"
                              className="fill-blue-600/85 stroke-blue-700 stroke-[1]"
                            />
                            {/* Pin on DE/East Coast */}
                            <circle cx="75" cy="35" r="3.5" fill="#ffffff" stroke="#1d4ed8" strokeWidth="2" />
                            <circle cx="75" cy="35" r="7" fill="none" stroke="#2563eb" strokeWidth="1" className="animate-ping" />
                          </g>
                        )}
                        {activeNode.miniMapType === 'canada' && (
                          <g>
                            <path
                              d="M 15 25 Q 50 15 85 20 Q 80 45 65 55 Q 40 58 20 50 Z"
                              className="fill-red-600/85 stroke-red-700 stroke-[1]"
                            />
                            {/* Pin on Ontario */}
                            <circle cx="55" cy="42" r="3.5" fill="#ffffff" stroke="#b91c1c" strokeWidth="2" />
                            <circle cx="55" cy="42" r="7" fill="none" stroke="#dc2626" strokeWidth="1" className="animate-ping" />
                          </g>
                        )}
                        {activeNode.miniMapType === 'india' && (
                          <g>
                            <path
                              d="M 45 15 Q 60 10 70 20 Q 75 40 65 60 Q 50 75 45 65 Q 35 45 45 15 Z"
                              className="fill-sky-600/85 stroke-sky-700 stroke-[1]"
                            />
                            {/* Pin on Hyderabad */}
                            <circle cx="53" cy="48" r="3.5" fill="#ffffff" stroke="#0369a1" strokeWidth="2" />
                            <circle cx="53" cy="48" r="7" fill="none" stroke="#0ea5e9" strokeWidth="1" className="animate-ping" />
                          </g>
                        )}
                      </svg>
                      <div className="absolute bottom-1.5 right-2 text-[9px] font-mono text-slate-400 bg-white/90 px-1 py-0.5 rounded">
                        {activeNode.code} REGION
                      </div>
                    </div>

                    {/* Country & City Title */}
                    <div>
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-snug">
                        {activeNode.country}
                      </h3>
                      <p className="text-xs font-semibold text-blue-600">
                        {activeNode.city}
                      </p>
                    </div>

                    {/* Address & Phone */}
                    <div className="mt-2.5 space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-2">
                      <div className="flex items-start gap-1.5">
                        <MapPin className="size-3.5 shrink-0 text-blue-600 mt-0.5" />
                        <span className="leading-tight text-[11px] line-clamp-2">{activeNode.address}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Phone className="size-3.5 shrink-0 text-blue-600" />
                        <a href={`tel:${activeNode.phone.replace(/[^0-9+]/g, '')}`} className="font-mono font-bold text-slate-800 hover:text-blue-600 transition text-[11px]">
                          {activeNode.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Action CTA Button */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100">
                    <a
                      href={`mailto:${companyInfo.email}?subject=Inquiry for ${encodeURIComponent(activeNode.city)} Office (${encodeURIComponent(activeNode.country)})`}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 shadow-sm shadow-blue-500/20 transition hover:shadow-md"
                    >
                      Connect with {activeNode.city.split(',')[0]} Hub <ArrowRight className="size-3.5" />
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
