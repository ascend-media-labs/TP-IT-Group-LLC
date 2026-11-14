import { createFileRoute } from '@tanstack/react-router';
import { Hero, About, Services, Clients, Careers, Blogs, ContactBanner } from '@/components/corporate/sections';
import { metadata } from '@/components/corporate/content';

export const Route = createFileRoute('/')({
  head: () => metadata('Moving Forward. Together.', 'Discover TP iT GROUP LLC. A shared sense of purpose, fresh perspectives and a world of possibilities.'),
  component: Index,
});
function Index() { return <><Hero /><About /><Services /><Clients /><Careers /><Blogs /><ContactBanner /></>; }
