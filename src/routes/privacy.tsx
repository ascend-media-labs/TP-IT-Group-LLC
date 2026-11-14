import { createFileRoute } from '@tanstack/react-router';
import { PageHeading } from '@/components/corporate/sections';
import { metadata } from '@/components/corporate/content';
export const Route = createFileRoute('/privacy')({ head: () => metadata('Privacy Policy', 'TP IT Groups — privacy policy information.'), component: Page });
function Page() { return <><PageHeading eyebrow="TP IT GROUPS" title="Privacy Policy" description="Pending company approval" /><section className="section"><div className="site-container"><p className="section-copy max-w-3xl">This static website does not offer account registration or store contact form submissions. The contact form is a preview only. A company-approved privacy policy, including any hosting or analytics disclosures, will be added before public use. No official policy is available at this time.</p></div></section></>; }
