import { createFileRoute } from '@tanstack/react-router';
import { Contact } from '@/components/corporate/sections';
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
  return <Contact />;
}
