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
      className={`relative py-8 sm:py-12 bg-white overflow-hidden scroll-mt-16 ${className}`}
    >
      {/* Background ambient subtle pattern */}
      <div className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-60" />

      <div className="site-container relative z-10">
        {/* Section Header */}
        <div className="text-left mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50/90 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#d7192a]">
            <Play className="size-3 fill-current" />
            Executive Showcase
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2.5 tracking-tight">
            See <span className="text-[#d7192a]">TP IT Group</span> in Action
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Global technology delivery, enterprise consulting, and specialized IT &amp; non-IT talent across USA, Canada, and India.
          </p>
        </div>

        {/* 2-Column Showcase Card: Left Video with Border, Right Text Matters */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-gradient-to-br from-white via-slate-50/40 to-red-50/20 p-4 sm:p-6 lg:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.05)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left Column: Vertical Video with prominent border & controls */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[280px] xs:max-w-[300px] sm:max-w-[320px] aspect-[9/16] rounded-2xl overflow-hidden border-2 border-slate-300 shadow-2xl bg-black group">
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
                    className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-slate-900/85 px-2.5 py-1 text-[11px] font-semibold text-white shadow-md backdrop-blur-md hover:bg-slate-900 transition cursor-pointer"
                    aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                  >
                    {isMuted ? (
                      <>
                        <VolumeX className="size-3.5 text-red-400" />
                        <span>Unmute</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="size-3.5 text-emerald-400" />
                        <span>Mute</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Rich Corporate Text Matters */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-4 sm:space-y-5">
              <div>
                <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#d7192a]">
                  Connected Solutions • Proven Execution
                </span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 mt-1 tracking-tight leading-snug">
                  One Partner for Technology, Consulting &amp; Cross-Border Talent
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  TP IT Group delivers mission-critical technology services that empower enterprises to build smarter systems, modernize infrastructure, and deploy elite global teams seamlessly.
                </p>
              </div>

              {/* Feature Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="p-2 rounded-lg bg-red-50 text-[#d7192a] shrink-0">
                    <Server className="size-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-[13px] font-bold text-slate-900">Infrastructure &amp; Networking</h4>
                    <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">24/7 server management, network monitoring, and enterprise cloud migrations.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="p-2 rounded-lg bg-red-50 text-[#d7192a] shrink-0">
                    <Code2 className="size-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-[13px] font-bold text-slate-900">Custom Software &amp; Apps</h4>
                    <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">Tailored web platforms, mobile apps, AI automation, and ERP systems.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="p-2 rounded-lg bg-red-50 text-[#d7192a] shrink-0">
                    <Globe2 className="size-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-[13px] font-bold text-slate-900">Tri-Nation Hub Loop</h4>
                    <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">Seamless round-the-clock operations across USA, Canada, and India.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="p-2 rounded-lg bg-red-50 text-[#d7192a] shrink-0">
                    <ShieldCheck className="size-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-[13px] font-bold text-slate-900">Specialized Talent Delivery</h4>
                    <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">Contract &amp; full-time technical workforce for Fortune 500 and startups.</p>
                  </div>
                </div>
              </div>

              {/* Direct Connect & Country Support Info */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Button
                  asChild
                  className="rounded-full bg-gradient-to-r from-[#d7192a] via-[#e11d48] to-[#b91c1c] hover:from-[#b91c1c] hover:to-[#991b1b] text-white px-5 py-2 text-xs font-bold shadow-md shadow-red-500/20 gap-1.5 transition hover:scale-105"
                >
                  <Link to="/contact">
                    Let’s Solve Your Next Challenge <ArrowUpRight className="size-3.5" />
                  </Link>
                </Button>

                {/* Country Flags & Numbers */}
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href="tel:+18148441362"
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-800 shadow-xs hover:border-red-300 transition"
                  >
                    <CountryFlag country="usa" size="sm" />
                    <CountryFlag country="canada" size="sm" />
                    <span>+1 (814) 844-1362</span>
                  </a>
                  <a
                    href="tel:+919963435256"
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-800 shadow-xs hover:border-red-300 transition"
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
