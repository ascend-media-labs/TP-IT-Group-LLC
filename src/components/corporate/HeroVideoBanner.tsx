import { useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

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
      aria-label="TP IT Group Video Showcase"
      className={`relative py-3 sm:py-5 bg-gradient-to-b from-white via-slate-50/60 to-white overflow-hidden ${className}`}
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(215,25,42,0.035),transparent_70%)]" />

      <div className="site-container relative z-10">
        {/* Wide Widescreen Frame with identical border styling */}
        <div className="relative mx-auto w-full max-w-6xl rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-slate-950 p-1.5 sm:p-2 shadow-xl shadow-slate-900/10 overflow-hidden group">
          {/* Inner Video Container: wide container with vertical video centered inside */}
          <div className="relative w-full h-[340px] xs:h-[380px] sm:h-[430px] md:h-[480px] lg:h-[520px] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center">
            {/* Ambient blurred reflection of the vertical video across the wide background */}
            <video
              src="/videos/TP_IT_video.mp4"
              autoPlay
              loop
              muted
              playsInline
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover blur-2xl opacity-30 scale-105"
            />
            {/* Subtle dark overlay */}
            <div className="pointer-events-none absolute inset-0 bg-slate-950/40" />

            {/* Central Vertical Video Player (Aspect 9:16 portrait orientation) */}
            <div className="relative z-10 h-full max-h-full aspect-[9/16] rounded-xl overflow-hidden shadow-2xl border border-white/15 bg-black flex items-center justify-center">
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
            </div>

            {/* Quick Unmute / Mute Glass Floating Pill (Top-Right) */}
            <div className="absolute top-3 right-3 z-20 flex items-center gap-2 pointer-events-auto">
              <button
                type="button"
                onClick={toggleSound}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-slate-900/80 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md hover:bg-slate-900 transition active:scale-95 cursor-pointer"
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              >
                {isMuted ? (
                  <>
                    <VolumeX className="size-3.5 text-red-400" />
                    <span className="hidden sm:inline text-[11px]">Unmute</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="size-3.5 text-emerald-400" />
                    <span className="hidden sm:inline text-[11px]">Mute</span>
                  </>
                )}
              </button>
            </div>

            {/* Top-Left Corporate Branding Badge */}
            <div className="absolute top-3 left-3 z-20 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-slate-900/80 px-3 py-1 text-[10.5px] sm:text-xs font-bold text-white shadow-lg backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d7192a]" />
                </span>
                TP IT Group Showcase
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
