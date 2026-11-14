import { createFileRoute } from '@tanstack/react-router';
import { Hero, About, Services, Careers, Blogs, ContactBanner } from '@/components/corporate/sections';
import { metadata } from '@/components/corporate/content';

export const Route = createFileRoute('/')({
  head: () => metadata('Moving Forward. Together.', 'Discover TP IT Groups. A shared sense of purpose, fresh perspectives and a world of possibilities.'),
  component: Index,
});
function Index() { return <><Hero /><About /><Services /><Careers /><Blogs /><ContactBanner /></>; }
