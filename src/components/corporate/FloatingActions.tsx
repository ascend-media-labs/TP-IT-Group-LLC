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
        className="group relative flex size-12 sm:size-13 items-center justify-center rounded-full bg-[#d7192a] text-white shadow-xl shadow-red-600/35 transition-all duration-300 hover:scale-110 hover:bg-[#b91c1c] active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-400/30"
      >
        <Phone className="size-5 sm:size-5.5 transition-transform duration-300 group-hover:rotate-12" />
        
        {/* Tooltip on hover */}
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-slate-900/95 backdrop-blur-xs px-2.5 py-1 text-xs font-semibold text-white shadow-md opacity-0 transition-opacity duration-200 group-hover:opacity-100 hidden sm:inline-block">
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
        className="group relative flex size-12 sm:size-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-emerald-500/35 transition-all duration-300 hover:scale-110 hover:bg-[#20bd5a] active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-400/30"
      >
        <svg
          className="size-6 sm:size-6.5 fill-white transition-transform duration-300 group-hover:scale-105"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.586 1.761.884 2.791.884h.005c3.178 0 5.767-2.587 5.768-5.766 0-1.541-.6-2.99-1.69-4.08-1.09-1.091-2.54-1.69-4.084-1.69zm5.221 8.212c-.22.618-1.12 1.157-1.549 1.206-.41.047-.94.077-2.883-.715-1.942-.792-3.19-2.766-3.287-2.894-.097-.129-.787-1.045-.787-1.993 0-.948.498-1.413.676-1.606.178-.193.388-.242.518-.242.13 0 .259.002.373.007.12.006.28-.046.438.334.162.388.551 1.344.6 1.441.049.097.081.21.016.339-.065.129-.097.21-.194.323-.097.113-.205.253-.292.34-.098.097-.2.203-.086.398.114.194.505.834 1.084 1.35.744.663 1.371.868 1.565.965.195.097.308.081.421-.048.114-.13.486-.566.616-.76.13-.194.259-.162.438-.097.178.065 1.134.534 1.328.631.195.097.324.146.373.227.048.08.048.468-.172 1.086zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.435 5.179L2 22l4.966-1.302A9.954 9.954 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
        </svg>

        {/* Tooltip on hover */}
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-slate-900/95 backdrop-blur-xs px-2.5 py-1 text-xs font-semibold text-white shadow-md opacity-0 transition-opacity duration-200 group-hover:opacity-100 hidden sm:inline-block">
          WhatsApp Us
        </span>
      </a>
    </aside>
  );
}
