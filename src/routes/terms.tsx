import { createFileRoute } from '@tanstack/react-router';
import { PageHeading } from '@/components/corporate/sections';
import { metadata } from '@/components/corporate/content';
export const Route = createFileRoute('/terms')({ head: () => metadata('Terms & Conditions', 'TP iT GROUP LLC terms & conditions information.'), component: Page });
function Page() { return <><PageHeading eyebrow="TP iT GROUP LLC" title="Terms & Conditions" description="Enterprise engagement and operational standards" /><section className="section"><div className="site-container"><p className="section-copy max-w-3xl">All consulting, engineering, and workforce services provided by TP iT GROUP LLC are governed by standard Master Services Agreements (MSA) and Statements of Work (SOW) executed between authorized client representatives and TP iT GROUP LLC. We adhere to 100% intellectual property ownership transfer for client deliverables and industry-grade service level agreements.</p></div></section></>; }
