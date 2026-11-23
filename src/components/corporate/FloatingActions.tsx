import { Phone } from 'lucide-react';
import { companyInfo } from './content';

export function FloatingActions() {
  const cleanPhone = companyInfo.phone.replace(/[^+\d]/g, '');

  return (
    <aside
      aria-label="Quick contact actions"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-center gap-3 select-none pointer-events-auto"
    >
      {/* Phone Call Floating Button */}
      <a
        href={`tel:${cleanPhone}`}
        title={`Call Us (${companyInfo.phone})`}
        aria-label={`Call Us (${companyInfo.phone})`}
        className="group relative flex size-12 sm:size-13 items-center justify-center rounded-full bg-[#d7192a] text-white shadow-[0_8px_25px_rgba(215,25,42,0.45),0_0_15px_rgba(215,25,42,0.25)] transition-all duration-300 hover:scale-110 hover:bg-[#b91c1c] hover:shadow-[0_12px_35px_rgba(215,25,42,0.65),0_0_25px_rgba(215,25,42,0.45)] active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-400/30"
      >
        <Phone className="size-5 sm:size-5.5 transition-transform duration-300 group-hover:rotate-12" />
        
        {/* Tooltip on hover */}
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-slate-900/95 backdrop-blur-md border border-white/10 px-2.5 py-1 text-xs font-semibold text-white shadow-xl opacity-0 transition-opacity duration-200 group-hover:opacity-100 hidden sm:inline-block">
          Call {companyInfo.phone}
        </span>
      </a>

      {/* WhatsApp Floating Button - Authentic Outline Icon with Concentric Ripple Halos */}
      <a
        href={companyInfo.social.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
        className="group relative flex size-12 sm:size-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_25px_rgba(37,211,102,0.45),0_0_15px_rgba(37,211,102,0.25)] transition-all duration-300 hover:scale-110 hover:bg-[#20bd5a] hover:shadow-[0_12px_35px_rgba(37,211,102,0.65),0_0_25px_rgba(37,211,102,0.45)] active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-400/30"
      >
        {/* Outer concentric ripple rings matching user reference image */}
        <span className="absolute -inset-2 sm:-inset-2.5 rounded-full bg-[#25D366]/35 pointer-events-none" />
        <span className="absolute -inset-2.5 sm:-inset-3 rounded-full bg-[#25D366]/25 animate-ping opacity-75 pointer-events-none" />

        {/* WhatsApp Icon: White Outline Speech Bubble + White Telephone Handset */}
        <svg
          className="relative z-10 size-7 sm:size-7.5 transition-transform duration-300 group-hover:scale-105 drop-shadow-xs"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* White outline speech bubble */}
          <path
            d="M16 3C8.82 3 3 8.82 3 16c0 2.45.68 4.75 1.87 6.72L3 29l6.45-1.82C11.37 28.34 13.62 29 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3z"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Solid white phone handset inside */}
          <path
            fill="#ffffff"
            d="M21.5 18.5c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z"
          />
        </svg>

        {/* Tooltip on hover */}
        <span className="pointer-events-none absolute right-full mr-4 whitespace-nowrap rounded-lg bg-slate-900/95 backdrop-blur-md border border-white/10 px-2.5 py-1 text-xs font-semibold text-white shadow-xl opacity-0 transition-opacity duration-200 group-hover:opacity-100 hidden sm:inline-block">
          WhatsApp Us
        </span>
      </a>
    </aside>
  );
}
