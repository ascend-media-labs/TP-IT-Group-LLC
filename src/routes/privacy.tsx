import { createFileRoute } from '@tanstack/react-router';
import { PageHeading } from '@/components/corporate/sections';
import { metadata } from '@/components/corporate/content';
export const Route = createFileRoute('/privacy')({ head: () => metadata('Privacy Policy', 'TP iT GROUP LLC privacy policy information.'), component: Page });
function Page() { return <><PageHeading eyebrow="TP iT GROUP LLC" title="Privacy Policy" description="Governance and data privacy standards" /><section className="section"><div className="site-container"><p className="section-copy max-w-3xl">TP iT GROUP LLC is committed to protecting the privacy and confidentiality of our clients and partners. We follow industry best practices, enterprise data security compliance, and zero-trust standards across all digital engineering, cloud migration, and workforce management engagements.</p>
<h2 className="mt-8 text-lg font-bold">Information you send us</h2>
<p className="section-copy mt-2 max-w-3xl">When you use the contact form, we collect your name, email address, phone number, the service you are interested in and your message, to answer your enquiry. When you apply for a job, we collect your contact details, current city, experience, current company, work authorization, notice period, profile and resume links and your cover note, to assess your application.</p>
<h2 className="mt-8 text-lg font-bold">Third-party services</h2>
<p className="section-copy mt-2 max-w-3xl">Submitting the contact form also opens WhatsApp with the details you entered, so that you can send them to us there. WhatsApp handles that data under its own privacy policy. This website also loads fonts from Google Fonts and shows Google Maps, which means Google receives technical data such as your IP address.</p>
<h2 className="mt-8 text-lg font-bold">Your choices</h2>
<p className="section-copy mt-2 max-w-3xl">To see, correct or delete the information you sent us, please reach us through the <a className="underline" href="/contact">contact page</a>.</p>
</div></section></>; }
