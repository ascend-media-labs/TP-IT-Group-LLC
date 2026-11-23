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
        {/* Full-width Showcase Card matching Navbar edges */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-gradient-to-br from-white via-slate-50/50 to-red-50/25 p-4 sm:p-6 lg:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.04)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-center">
            
            {/* Left Column: Vertical Video locked to exact 9:16 original aspect ratio */}
            <div className="lg:col-span-5 xl:col-span-4 flex justify-center">
              <div className="relative w-[260px] xs:w-[285px] sm:w-[310px] lg:w-[320px] xl:w-[340px] aspect-[9/16] rounded-2xl overflow-hidden border-2 border-slate-300 shadow-xl bg-black group shrink-0">
                <video
                  ref={videoRef}
                  src="/videos/TP_IT_video.mp4"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  controls
                  className="w-full h-full object-contain"
                />

                {/* Top-Left Live Badge */}
                <div className="absolute top-3 left-3 z-20 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-slate-900/85 px-2.5 py-1 text-[10px] font-bold text-white shadow-md backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d7192a]" />
                    </span>
                    Live Showcase
                  </span>
                </div>

                {/* Top-Right Sound Toggle */}
                <div className="absolute top-3 right-3 z-20 pointer-events-auto">
                  <button
                    type="button"
                    onClick={toggleSound}
                    className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-slate-900/85 px-2.5 py-1 text-[10.5px] font-semibold text-white shadow-md backdrop-blur-md hover:bg-slate-900 transition cursor-pointer"
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

            {/* Right Column: Corporate Showcase Content */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-center text-left space-y-3.5 sm:space-y-4">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50/90 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#d7192a]">
                  <Play className="size-2.5 fill-current" />
                  Executive Showcase • Global Technology Partner
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-slate-900 mt-2 tracking-tight leading-snug">
                  One Partner for Technology, Consulting &amp; Cross-Border Talent
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                  TP IT Group delivers mission-critical technology services that empower enterprises to build smarter systems, modernize infrastructure, and deploy elite global teams seamlessly.
                </p>
              </div>

              {/* Feature Highlights Grid - 2x2 tiles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-0.5">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs hover:border-red-200 transition">
                  <div className="p-2 rounded-lg bg-red-50 text-[#d7192a] shrink-0 mt-0.5">
                    <Server className="size-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-[13px] font-bold text-slate-900">Infrastructure &amp; Networking</h4>
                    <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 leading-snug">24/7 server management, network monitoring, and cloud migration.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs hover:border-red-200 transition">
                  <div className="p-2 rounded-lg bg-red-50 text-[#d7192a] shrink-0 mt-0.5">
                    <Code2 className="size-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-[13px] font-bold text-slate-900">Custom Software &amp; Apps</h4>
                    <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 leading-snug">Tailored web platforms, mobile apps, AI automation, and ERP systems.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs hover:border-red-200 transition">
                  <div className="p-2 rounded-lg bg-red-50 text-[#d7192a] shrink-0 mt-0.5">
                    <Globe2 className="size-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-[13px] font-bold text-slate-900">Tri-Nation Hub Loop</h4>
                    <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 leading-snug">Seamless round-the-clock operations across USA, Canada, and India.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs hover:border-red-200 transition">
                  <div className="p-2 rounded-lg bg-red-50 text-[#d7192a] shrink-0 mt-0.5">
                    <ShieldCheck className="size-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-[13px] font-bold text-slate-900">Specialized Talent Delivery</h4>
                    <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 leading-snug">Contract &amp; full-time technical workforce for enterprises and startups.</p>
                  </div>
                </div>
              </div>

              {/* Direct Connect & Country Support Info */}
              <div className="pt-1.5 flex flex-wrap items-center gap-3">
                <Button
                  asChild
                  className="h-9 sm:h-9.5 rounded-full bg-gradient-to-r from-[#d7192a] via-[#e11d48] to-[#b91c1c] hover:from-[#b91c1c] hover:to-[#991b1b] text-white px-5 text-xs sm:text-[13px] font-bold shadow-sm shadow-red-500/20 gap-1.5 transition hover:scale-105"
                >
                  <Link to="/contact">
                    Let’s Solve Your Next Challenge <ArrowUpRight className="size-4" />
                  </Link>
                </Button>

                {/* Country Flags & Numbers */}
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href="tel:+18148441362"
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-xs hover:border-red-300 transition"
                  >
                    <CountryFlag country="usa" size="sm" />
                    <CountryFlag country="canada" size="sm" />
                    <span>+1 (814) 844-1362</span>
                  </a>
                  <a
                    href="tel:+919963435256"
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-xs hover:border-red-300 transition"
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
