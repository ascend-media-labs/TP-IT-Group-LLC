import { createFileRoute } from '@tanstack/react-router';
import { PageHeading, Services, ContactBanner } from '@/components/corporate/sections';
import { metadata } from '@/components/corporate/content';
export const Route = createFileRoute('/services')({ head: () => metadata('Services', 'Explore service areas and enquire for confirmed information.'), component: Page });
function Page() { return <><PageHeading eyebrow={'WHAT WE DO'} title={'Our services.'} description={'Explore service areas and enquire for confirmed information.'} /><Services full /><ContactBanner /></>; }
