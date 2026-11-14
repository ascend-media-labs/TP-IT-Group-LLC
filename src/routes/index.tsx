import { createFileRoute } from '@tanstack/react-router';
import {
  Hero,
  StatsSection,
  About,
  Services,
  GlobalPresence,
  IndustriesSection,
  ProvenApproachSection,
  WhyChooseUsSection,
  Clients,
  Careers,
  Blogs,
  ContactBanner,
} from '@/components/corporate/sections';
import { metadata } from '@/components/corporate/content';

export const Route = createFileRoute('/')({
  head: () =>
    metadata(
      'Premier Global IT Solutions & Digital Engineering',
      'TP IT Group LLC provides industry-leading Cloud Engineering, SAP Solutions, ERP Planning, and Custom Software Development. Specialized global workforce solutions across USA, India, UK, Australia, and Canada.',
    ),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <StatsSection />
      <About />
      <Services />
      <GlobalPresence />
      <IndustriesSection />
      <ProvenApproachSection />
      <WhyChooseUsSection />
      <Clients />
      <Careers />
      <Blogs />
      <ContactBanner />
    </>
  );
}
