import { createFileRoute } from '@tanstack/react-router';
import { PageHeading, Clients, ContactBanner } from '@/components/corporate/sections';
import { metadata } from '@/components/corporate/content';

export const Route = createFileRoute('/clients')({
  head: () =>
    metadata(
      'Clients & Partnerships',
      'Explore client partnerships, enterprise solutions and global delivery metrics with TP iT GROUP LLC.',
    ),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeading
        eyebrow={'CLIENTS & PARTNERS'}
        title={'Empowering global enterprises.'}
        description={
          'Discover how TP iT GROUP LLC collaborates with forward-thinking organizations across USA, India, UK, Australia, and Canada.'
        }
      />
      <Clients full />
      <ContactBanner />
    </>
  );
}

