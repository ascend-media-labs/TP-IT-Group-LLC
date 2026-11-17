import { createFileRoute } from '@tanstack/react-router';
import { Clients, ContactBanner } from '@/components/corporate/sections';
import { metadata } from '@/components/corporate/content';

export const Route = createFileRoute('/clients')({
  head: () =>
    metadata(
      'Client Success & Enterprise Partnerships | TP IT Group LLC',
      'Discover how TP IT Group LLC collaborates with Fortune 500 organizations and industry leaders across USA, Canada, and India.',
    ),
  component: Page,
});

function Page() {
  return (
    <div className="bg-white text-slate-900 min-h-[70vh]">
      <Clients full />
      <ContactBanner />
    </div>
  );
}
