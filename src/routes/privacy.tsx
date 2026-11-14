import { createFileRoute } from '@tanstack/react-router';
import { PageHeading } from '@/components/corporate/sections';
import { metadata } from '@/components/corporate/content';
export const Route = createFileRoute('/privacy')({ head: () => metadata('Privacy Policy', 'TP iT GROUP LLC privacy policy information.'), component: Page });
function Page() { return <><PageHeading eyebrow="TP iT GROUP LLC" title="Privacy Policy" description="Governance and data privacy standards" /><section className="section"><div className="site-container"><p className="section-copy max-w-3xl">TP iT GROUP LLC is committed to protecting the privacy and confidentiality of our clients and partners. We follow industry best practices, enterprise data security compliance, and zero-trust standards across all digital engineering, cloud migration, and workforce management engagements.</p></div></section></>; }
