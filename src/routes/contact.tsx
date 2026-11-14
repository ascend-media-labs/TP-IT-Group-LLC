import { createFileRoute } from '@tanstack/react-router';
import { PageHeading, Contact, ContactBanner } from '@/components/corporate/sections';
import { metadata } from '@/components/corporate/content';
export const Route = createFileRoute('/contact')({ head: () => metadata('Contact Us', 'Connect with TP IT Groups for business and career enquiries.'), component: Page });
function Page() { return <><PageHeading eyebrow={'CONTACT TP IT GROUPS'} title={'A conversation away.'} description={'Connect with TP IT Groups for business and career enquiries.'} /><Contact /></>; }
