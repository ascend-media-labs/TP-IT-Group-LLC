import { createFileRoute } from '@tanstack/react-router';
import { PageHeading, Clients, WhyChooseUsSection, ContactBanner } from '@/components/corporate/sections';
import { metadata } from '@/components/corporate/content';

export const Route = createFileRoute('/clients')({
  head: () =>
    metadata(
      'Client Success & Enterprise Partnerships',
      'Discover how TP iT GROUP LLC collaborates with Fortune 500 organizations across USA, India, UK, Australia, and Canada.',
    ),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeading
        eyebrow={'CLIENT SUCCESS & EXCELLENCE'}
        title={'Empowering Global Enterprises.'}
        description={
          'We don’t just complete projects; we build enduring partnerships. TP IT Group LLC is committed to delivering professional excellence and measurable business outcomes for every client.'
        }
      />
      <Clients full />
      <WhyChooseUsSection />
      <ContactBanner />
    </>
  );
}
