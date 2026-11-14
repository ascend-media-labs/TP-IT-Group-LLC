import { createFileRoute } from '@tanstack/react-router';
import { PageHeading, Contact } from '@/components/corporate/sections';
import { metadata } from '@/components/corporate/content';

export const Route = createFileRoute('/contact')({
  head: () =>
    metadata(
      'Contact Us - Global Offices & Inquiries',
      'Connect with TP IT GROUP LLC USA Head Office in Wilmington, DE or our global branches across India, Canada, UK, and Australia.',
    ),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeading
        eyebrow={'GET IN TOUCH'}
        title={'Start a Conversation.'}
        description={
          'Ready to accelerate your digital transformation? TP IT GROUP LLC provides world-class technology, enterprise software, and workforce solutions globally.'
        }
      />
      <Contact />
    </>
  );
}
