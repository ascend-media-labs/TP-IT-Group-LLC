import { clientLogos } from './content';

export function ClientMarquee() {
  // Duplicate for seamless infinite marquee loop
  const logos = [...clientLogos, ...clientLogos];

  return (
    <div className="relative w-full overflow-hidden py-3 sm:py-4">
      {/* Edge gradient masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-[#030712] to-transparent sm:w-40" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-[#030712] to-transparent sm:w-40" />

      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-5 items-center">
        {logos.map((client, idx) => (
          <div
            key={`${client.name}-${idx}`}
            className="group flex h-20 w-44 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md transition-all duration-300 hover:border-[#00D1FF]/40 hover:bg-white/[0.08] hover:shadow-[0_0_25px_rgba(0,209,255,0.2)]"
          >
            <img
              src={client.src}
              alt={client.name}
              className="max-h-11 max-w-[85%] object-contain filter brightness-95 contrast-125 transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

