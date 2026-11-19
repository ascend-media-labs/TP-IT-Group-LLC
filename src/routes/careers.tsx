import { createFileRoute } from '@tanstack/react-router';
import { Careers } from '@/components/corporate/sections';
import { metadata } from '@/components/corporate/content';

export const Route = createFileRoute('/careers')({
  head: () =>
    metadata(
      'Careers at TP iT GROUP LLC - Global Opportunities',
      'Join TP IT Group LLC and work on cutting-edge engineering, cloud, AI, and enterprise consulting projects with world-class clients across 5 continents.',
    ),
  component: Page,
});

function Page() {
  return <Careers full />;
}
