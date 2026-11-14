import { createFileRoute } from '@tanstack/react-router';
import { PageHeading, StatsSection, About, ContactBanner } from '@/components/corporate/sections';
import { metadata } from '@/components/corporate/content';

export const Route = createFileRoute('/about')({
  head: () =>
    metadata(
      'About Us - Your Trusted Technology Partner',
      'A service-based technology and consulting firm helping businesses scale with reliable IT solutions and skilled workforce support across 5 continents since 2005.',
    ),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeading
        eyebrow={'ABOUT TP IT GROUP LLC'}
        title={'Your Trusted Technology Partner.'}
        description={
          'A service-based technology and consulting firm helping businesses scale with reliable IT solutions and skilled workforce support across 5 continents.'
        }
      />
      <StatsSection />
      <About detailed />
      <ContactBanner />
    </>
  );
}
