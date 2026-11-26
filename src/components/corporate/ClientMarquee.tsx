import { useState, useEffect } from 'react';
import { clientLogos } from './content';

export function ClientMarquee() {
  const [logosList, setLogosList] = useState(clientLogos);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/clients')
      .then((r) => r.json())
      .then((data) => {
        if (isMounted && data.success && Array.isArray(data.clients) && data.clients.length > 0) {
          setLogosList(data.clients);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  // Duplicate for seamless infinite marquee loop
  const logos = [...logosList, ...logosList];

  return (
    <div className="relative w-full overflow-hidden py-3 sm:py-4">
      {/* Edge gradient masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent sm:w-40" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent sm:w-40" />

      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-5 items-center">
        {logos.map((client, idx) => (
          <div
            key={`${client.name}-${idx}`}
            className="group flex h-20 w-44 shrink-0 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/85 p-4 shadow-xs backdrop-blur-xl transition-all duration-300 hover:border-red-400/50 hover:shadow-[0_10px_25px_rgba(215,25,42,0.14),0_0_15px_rgba(215,25,42,0.1)]"
          >
            <img
              src={client.src}
              alt={client.name}
              className="max-h-11 max-w-[85%] object-contain contrast-125 transition-all duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

