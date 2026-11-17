import { createFileRoute } from '@tanstack/react-router';
import {
  PageHeading,
  StatsSection,
  WorkWithSection,
  ProvenApproachSection,
  WhyChooseUsSection,
  ContactBanner,
} from '@/components/corporate/sections';
import { metadata } from '@/components/corporate/content';

export const Route = createFileRoute('/consulting')({
  head: () =>
    metadata(
      'Strategic Technology Consulting & Advisory | TP IT Group LLC',
      'Guiding enterprise digital transformation, cloud roadmaps, process optimization, and enterprise architecture with proven industry expertise.',
    ),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeading
        eyebrow={'STRATEGIC CONSULTING & ADVISORY'}
        title={'Guiding Enterprise Digital Transformation.'}
        description={
          'Bring clarity to complex technology decisions, optimize business processes, and accelerate transformation delivery—from first assessment to full execution.'
        }
      />
      <StatsSection />
      <WorkWithSection />
      <ProvenApproachSection />
      <WhyChooseUsSection />
      <ContactBanner />
    </>
  );
}
