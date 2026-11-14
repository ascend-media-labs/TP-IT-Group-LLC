import { createFileRoute } from '@tanstack/react-router';
import { PageHeading } from '@/components/corporate/sections';
import { metadata } from '@/components/corporate/content';
export const Route = createFileRoute('/terms')({ head: () => metadata('Terms & Conditions', 'TP IT Groups — terms & conditions information.'), component: Page });
function Page() { return <><PageHeading eyebrow="TP IT GROUPS" title="Terms & Conditions" description="Pending company approval" /><section className="section"><div className="site-container"><p className="section-copy max-w-3xl">Company information, service descriptions and contact details are awaiting confirmation. Journal articles are sample editorial content and do not describe company-specific activities. Images are illustrative and do not depict verified TP IT Groups premises or employees. Company-approved terms will be added before public use.</p></div></section></>; }
