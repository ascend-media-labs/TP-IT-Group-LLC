import { createFileRoute } from '@tanstack/react-router';
import { PageHeading, Careers, ContactBanner } from '@/components/corporate/sections';
import { metadata } from '@/components/corporate/content';
export const Route = createFileRoute('/careers')({ head: () => metadata('Careers', 'Explore your next chapter with TP IT Groups.'), component: Page });
function Page() { return <><PageHeading eyebrow={'CAREERS AT TP IT GROUPS'} title={'Join our team.'} description={'Explore your next chapter with TP IT Groups.'} /><Careers full /><ContactBanner /></>; }
