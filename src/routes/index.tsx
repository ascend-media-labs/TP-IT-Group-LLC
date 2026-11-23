import { createFileRoute } from '@tanstack/react-router';
import {
  Hero,
  StatsSection,
  ConnectedCapabilitiesSection,
  Services,
  About,
  IndustriesSection,
  WhyChooseUsSection,
  WorkWithSection,
  ProvenApproachSection,
  Clients,
  GlobalMapConnection,
} from '@/components/corporate/sections';
import { metadata } from '@/components/corporate/content';

export const Route = createFileRoute('/')({
  head: () =>
    metadata(
      'One Partner. Your Next Possibility. | TP IT Group LLC',
      'TP IT Group LLC provides industry-leading technology solutions, consulting services, and specialized IT & non-IT talent across USA, Canada, and India.',
    ),
  component: Index,
});

function Index() {
  return (
    <>
      {/* 1. Home */}
      <Hero />
      <StatsSection />

      {/* 2. About */}
      <About />
      <IndustriesSection />
      <WhyChooseUsSection />

      {/* 3. Services */}
      <Services />

      {/* 4. Consulting & 5. Talent */}
      <ConnectedCapabilitiesSection />
      <WorkWithSection />
      <ProvenApproachSection />

      {/* 6. Clients */}
      <Clients />

      {/* 7. Global Connection Map (Above Footer) */}
      <GlobalMapConnection />
    </>
  );
}
