import { createFileRoute } from '@tanstack/react-router';
import { PageHeading, About, ContactBanner } from '@/components/corporate/sections';
import { metadata } from '@/components/corporate/content';
export const Route = createFileRoute('/about')({ head: () => metadata('About TP IT Groups', 'Discover a shared sense of purpose and the possibilities ahead.'), component: Page });
function Page() { return <><PageHeading eyebrow={'ABOUT TP IT GROUPS'} title={'One group. Many possibilities.'} description={'Discover a shared sense of purpose and the possibilities ahead.'} /><About detailed /><ContactBanner /></>; }
