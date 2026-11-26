import { useRef, useState } from 'react';
import { Volume2, VolumeX, Play, ShieldCheck, Server, Code2, Globe2 } from 'lucide-react';

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
      className={`relative py-3 sm:py-5 bg-white overflow-hidden scroll-mt-16 ${className}`}
    >
      {/* Background ambient subtle pattern */}
      <div className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-50" />

      <div className="site-container relative z-10">
        {/* Showcase Card - Clean solid white without hover glow */}
        <div className="no-hover-glow relative w-full rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-3.5 sm:p-5 lg:p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 xl:gap-8 items-center">
            
            {/* Left Column: Vertical Video locked to exact 9:16 original aspect ratio */}
            <div className="lg:col-span-5 xl:col-span-4 flex justify-center">
              <div className="relative w-[240px] xs:w-[260px] sm:w-[280px] lg:w-[290px] xl:w-[310px] aspect-[9/16] rounded-2xl overflow-hidden border-2 border-slate-300 shadow-xl bg-black group shrink-0">
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
                <div className="absolute top-2.5 left-2.5 z-20 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-slate-900/85 px-2.5 py-1 text-[10px] font-bold text-white shadow-md backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d7192a]" />
                    </span>
                    Live Showcase
                  </span>
                </div>

                {/* Top-Right Sound Toggle */}
                <div className="absolute top-2.5 right-2.5 z-20 pointer-events-auto">
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
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-center text-left space-y-3 sm:space-y-3.5">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50/90 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#d7192a]">
                  <Play className="size-2.5 fill-current" />
                  Executive Showcase • Global Technology Partner
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-slate-900 mt-1.5 tracking-tight leading-snug">
                  One Partner for Technology, Consulting &amp; Cross-Border Talent
                </h3>
                <p className="mt-1 text-xs sm:text-[13px] text-slate-600 leading-relaxed max-w-3xl">
                  TP IT Group delivers mission-critical technology services that empower enterprises to build smarter systems, modernize infrastructure, and deploy elite global teams seamlessly.
                </p>
              </div>

              {/* Feature Highlights Grid - 2x2 tiles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-0.5">
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 transition">
                  <div className="p-2 rounded-lg bg-red-50 text-[#d7192a] shrink-0 mt-0.5">
                    <Server className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-[13px] font-bold text-slate-900">Infrastructure &amp; Networking</h4>
                    <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 leading-snug">24/7 server management, network monitoring, and cloud migration.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 transition">
                  <div className="p-2 rounded-lg bg-red-50 text-[#d7192a] shrink-0 mt-0.5">
                    <Code2 className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-[13px] font-bold text-slate-900">Custom Software &amp; Apps</h4>
                    <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 leading-snug">Tailored web platforms, mobile apps, AI automation, and ERP systems.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 transition">
                  <div className="p-2 rounded-lg bg-red-50 text-[#d7192a] shrink-0 mt-0.5">
                    <Globe2 className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-[13px] font-bold text-slate-900">Tri-Nation Hub Loop</h4>
                    <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 leading-snug">Seamless round-the-clock operations across USA, Canada, and India.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 transition">
                  <div className="p-2 rounded-lg bg-red-50 text-[#d7192a] shrink-0 mt-0.5">
                    <ShieldCheck className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-[13px] font-bold text-slate-900">Specialized Talent Delivery</h4>
                    <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 leading-snug">Contract &amp; full-time technical workforce for enterprises and startups.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
