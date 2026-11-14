import { createFileRoute } from '@tanstack/react-router';
import { PageHeading, Services, ProvenApproachSection, ContactBanner } from '@/components/corporate/sections';
import { metadata } from '@/components/corporate/content';

export const Route = createFileRoute('/services')({
  head: () =>
    metadata(
      'Enterprise IT Services & Solutions',
      'From cloud infrastructure to custom development and SAP solutions, we provide end-to-end technology solutions that power business growth across 5 continents.',
    ),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeading
        eyebrow={'COMPREHENSIVE IT SOLUTIONS'}
        title={'Empowering Business with Enterprise Technology.'}
        description={
          'From cloud infrastructure to custom development and strategic workforce management, we provide end-to-end technology solutions that power business growth across 5 continents.'
        }
      />
      <Services full />
      <ProvenApproachSection />
      <ContactBanner />
    </>
  );
}
