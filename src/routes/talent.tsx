import { createFileRoute } from '@tanstack/react-router';
import {
  PageHeading,
  StatsSection,
  ConnectedCapabilitiesSection,
  WorkWithSection,
  WhyChooseUsSection,
  ContactBanner,
} from '@/components/corporate/sections';
import { metadata } from '@/components/corporate/content';

export const Route = createFileRoute('/talent')({
  head: () =>
    metadata(
      'IT & Non-IT Talent Solutions | TP IT Group LLC',
      'Specialized technical staffing, workforce solutions, and high-performing engineering teams tailored to enterprise project demands.',
    ),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeading
        eyebrow={'WORKFORCE & TALENT SOLUTIONS'}
        title={'IT & Non-IT Talent Built Around Your Team.'}
        description={
          'Align your skill requirements, team structure, and hiring priorities across technical software engineering and business operations roles worldwide.'
        }
      />
      <StatsSection />
      <ConnectedCapabilitiesSection />
      <WorkWithSection />
      <WhyChooseUsSection />
      <ContactBanner />
    </>
  );
}
