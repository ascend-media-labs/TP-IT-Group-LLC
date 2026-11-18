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
          className="size-7 sm:size-7.5 transition-transform duration-300 group-hover:scale-105 drop-shadow-xs"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Official WhatsApp Solid White Bubble */}
          <path
            fill="#ffffff"
            d="M16 2.5C8.544 2.5 2.5 8.544 2.5 16c0 2.637.761 5.099 2.072 7.181L3 29.5l6.536-1.543A13.435 13.435 0 0 0 16 29.5c7.456 0 13.5-6.044 13.5-13.5S23.456 2.5 16 2.5z"
          />
          {/* Official WhatsApp Green Phone Handset */}
          <path
            fill="#25D366"
            d="M22.25 18.966c-.255-.128-1.508-.744-1.741-.83-.233-.085-.403-.128-.572.128-.17.255-.658.83-.807.999-.148.17-.297.191-.552.064-.255-.128-1.077-.397-2.05-1.265-.758-.677-1.27-1.513-1.419-1.768-.148-.255-.016-.393.112-.52.115-.115.255-.297.382-.446.128-.149.17-.255.255-.425.085-.17.043-.319-.021-.446-.064-.128-.572-1.38-.784-1.89-.206-.497-.417-.429-.572-.437-.148-.008-.318-.009-.488-.009-.17 0-.446.064-.679.319-.233.255-.891.87-.891 2.123s.912 2.463 1.04 2.633c.127.17 1.796 2.743 4.35 3.847.608.263 1.082.42 1.453.537.61.194 1.165.166 1.604.1.488-.073 1.508-.616 1.72-1.21.212-.594.212-1.103.149-1.21-.064-.107-.234-.17-.489-.298z"
          />
        </svg>

        {/* Tooltip on hover */}
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-slate-900/95 backdrop-blur-md border border-white/10 px-2.5 py-1 text-xs font-semibold text-white shadow-xl opacity-0 transition-opacity duration-200 group-hover:opacity-100 hidden sm:inline-block">
          WhatsApp Us
        </span>
      </a>
    </aside>
  );
}
