import { useRef, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Volume2, VolumeX, Play, ArrowUpRight, ShieldCheck, Server, Code2, Globe2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CountryFlag } from './CountryFlag';

export function HeroVideoBanner({ className = '' }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  return (
    <section
      id="video-showcase"
      aria-label="TP IT Group Video Showcase"
      className={`relative py-4 sm:py-6 bg-white overflow-hidden scroll-mt-16 ${className}`}
    >
      {/* Background ambient subtle pattern */}
      <div className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-50" />

      <div className="site-container relative z-10">
        {/* Compact 2-Column Showcase Card: Fits perfectly in single viewport */}
        <div className="relative w-full max-w-5xl mx-auto rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-gradient-to-br from-white via-slate-50/50 to-red-50/25 p-3.5 sm:p-5 lg:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-center">
            
            {/* Left Column: Compact Vertical Video with Border & Controls */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative h-[300px] xs:h-[330px] sm:h-[360px] lg:h-[380px] aspect-[9/16] rounded-2xl overflow-hidden border-2 border-slate-300 shadow-xl bg-black group shrink-0">
                <video
                  ref={videoRef}
                  src="/videos/TP_IT_video.mp4"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  controls
                  className="w-full h-full object-cover"
                />

                {/* Top-Left Live Badge */}
                <div className="absolute top-2.5 left-2.5 z-20 pointer-events-none">
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-slate-900/85 px-2 py-0.5 text-[9.5px] font-bold text-white shadow-md backdrop-blur-md">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#d7192a]" />
                    </span>
                    Live Showcase
                  </span>
                </div>

                {/* Top-Right Sound Toggle */}
                <div className="absolute top-2.5 right-2.5 z-20 pointer-events-auto">
                  <button
                    type="button"
                    onClick={toggleSound}
                    className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-slate-900/85 px-2 py-0.5 text-[10px] font-semibold text-white shadow-md backdrop-blur-md hover:bg-slate-900 transition cursor-pointer"
                    aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                  >
                    {isMuted ? (
                      <>
                        <VolumeX className="size-3 text-red-400" />
                        <span>Unmute</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="size-3 text-emerald-400" />
                        <span>Mute</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Compact Corporate Showcase Content */}
            <div className="lg:col-span-8 flex flex-col justify-center text-left space-y-3 sm:space-y-3.5">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50/90 px-3 py-0.5 text-[10.5px] font-bold uppercase tracking-wider text-[#d7192a]">
                  <Play className="size-2.5 fill-current" />
                  Executive Showcase • Global Technology Partner
                </div>
                <h3 className="text-lg sm:text-xl lg:text-[22px] font-extrabold text-slate-900 mt-1.5 tracking-tight leading-snug">
                  One Partner for Technology, Consulting &amp; Cross-Border Talent
                </h3>
                <p className="mt-1 text-xs sm:text-[13px] text-slate-700 leading-relaxed font-medium">
                  TP IT Group delivers mission-critical technology services that empower enterprises to build smarter systems, modernize infrastructure, and deploy elite global teams seamlessly.
                </p>
              </div>

              {/* Feature Highlights Grid - 2x2 compact tiles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-0.5">
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="p-1.5 rounded-lg bg-red-50 text-[#d7192a] shrink-0 mt-0.5">
                    <Server className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Infrastructure &amp; Networking</h4>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-tight">24/7 server management, network monitoring, and cloud migration.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="p-1.5 rounded-lg bg-red-50 text-[#d7192a] shrink-0 mt-0.5">
                    <Code2 className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Custom Software &amp; Apps</h4>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-tight">Tailored web platforms, mobile apps, AI automation, and ERP systems.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="p-1.5 rounded-lg bg-red-50 text-[#d7192a] shrink-0 mt-0.5">
                    <Globe2 className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Tri-Nation Hub Loop</h4>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-tight">Seamless round-the-clock operations across USA, Canada, and India.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="p-1.5 rounded-lg bg-red-50 text-[#d7192a] shrink-0 mt-0.5">
                    <ShieldCheck className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Specialized Talent Delivery</h4>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-tight">Contract &amp; full-time technical workforce for enterprises and startups.</p>
                  </div>
                </div>
              </div>

              {/* Direct Connect & Country Support Info */}
              <div className="pt-1 flex flex-wrap items-center gap-2.5">
                <Button
                  asChild
                  className="h-8.5 rounded-full bg-gradient-to-r from-[#d7192a] via-[#e11d48] to-[#b91c1c] hover:from-[#b91c1c] hover:to-[#991b1b] text-white px-4 text-xs font-bold shadow-sm shadow-red-500/20 gap-1.5 transition hover:scale-105"
                >
                  <Link to="/contact">
                    Let’s Solve Your Next Challenge <ArrowUpRight className="size-3.5" />
                  </Link>
                </Button>

                {/* Country Flags & Numbers */}
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href="tel:+18148441362"
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-800 shadow-xs hover:border-red-300 transition"
                  >
                    <CountryFlag country="usa" size="sm" />
                    <CountryFlag country="canada" size="sm" />
                    <span>+1 (814) 844-1362</span>
                  </a>
                  <a
                    href="tel:+919963435256"
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-800 shadow-xs hover:border-red-300 transition"
                  >
                    <CountryFlag country="india" size="sm" />
                    <span>+91-9963435256</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
