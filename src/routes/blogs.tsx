import { createFileRoute } from '@tanstack/react-router';
import { PageHeading, Blogs, ContactBanner } from '@/components/corporate/sections';
import { metadata } from '@/components/corporate/content';
export const Route = createFileRoute('/blogs')({ head: () => metadata('Blogs & Perspectives', 'Ideas and perspectives on people, business and responsible progress.'), component: Page });
function Page() { return <><PageHeading eyebrow={'THE TP IT GROUPS JOURNAL'} title={'Ideas for what’s next.'} description={'Ideas and perspectives on people, business and responsible progress.'} /><Blogs full /><ContactBanner /></>; }
