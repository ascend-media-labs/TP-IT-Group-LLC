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

      {/* WhatsApp Floating Button */}
      <a
        href={companyInfo.social.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
        className="group relative flex size-12 sm:size-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_25px_rgba(37,211,102,0.45),0_0_15px_rgba(37,211,102,0.25)] transition-all duration-300 hover:scale-110 hover:bg-[#20bd5a] hover:shadow-[0_12px_35px_rgba(37,211,102,0.65),0_0_25px_rgba(37,211,102,0.45)] active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-400/30"
      >
        <svg
          className="size-6 sm:size-7 fill-white transition-transform duration-300 group-hover:scale-105"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.45 0-2.87-.38-4.12-1.1l-.3-.17-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.44c0-4.54 3.7-8.24 8.24-8.24m4.52 11.58c-.19-.09-1.12-.55-1.29-.62-.17-.06-.3-.09-.43.09-.13.19-.49.62-.6.75-.11.13-.22.14-.41.05-.19-.09-.8-.3-1.53-.95-.57-.51-.95-1.14-1.06-1.33-.11-.19-.01-.29.08-.38.08-.08.19-.22.28-.33.1-.11.13-.19.19-.31.06-.13.03-.24-.02-.33-.05-.09-.43-1.03-.59-1.41-.15-.37-.31-.32-.43-.33h-.37c-.13 0-.33.05-.5.24s-.67.65-.67 1.59.69 1.84.78 1.97c.1.13 1.35 2.06 3.27 2.89.46.2.82.32 1.1.41.46.15.88.13 1.21.08.37-.06 1.12-.46 1.28-.9.16-.44.16-.82.11-.9-.04-.08-.17-.13-.36-.22" />
        </svg>

        {/* Tooltip on hover */}
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-slate-900/95 backdrop-blur-md border border-white/10 px-2.5 py-1 text-xs font-semibold text-white shadow-xl opacity-0 transition-opacity duration-200 group-hover:opacity-100 hidden sm:inline-block">
          WhatsApp Us
        </span>
      </a>
    </aside>
  );
}
