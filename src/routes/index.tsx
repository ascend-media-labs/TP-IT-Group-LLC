import { createFileRoute } from '@tanstack/react-router';
import {
  Hero,
  StatsSection,
  ConnectedCapabilitiesSection,
  Services,
  About,
  GlobalPresence,
  IndustriesSection,
  WhyChooseUsSection,
  WorkWithSection,
  ProvenApproachSection,
  Clients,
  Careers,
  Blogs,
  ContactBanner,
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
      <Hero />
      <StatsSection />
      <ConnectedCapabilitiesSection />
      <Services />
      <About />
      <GlobalPresence />
      <IndustriesSection />
      <WhyChooseUsSection />
      <WorkWithSection />
      <ProvenApproachSection />
      <Clients />
      <Careers />
      <Blogs />
      <ContactBanner />
    </>
  );
}
