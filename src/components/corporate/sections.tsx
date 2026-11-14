import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play, Menu, X, Building2, Layers3, Lightbulb, Mail, Phone, MapPin, Linkedin, Instagram, Facebook, Target, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { headquarters, team, infrastructure, articles } from './content';
import { TPITLogo } from './logo';

const nav = [{ label: 'Home', to: '/' }, { label: 'Careers', to: '/careers' }, { label: 'Services', to: '/services' }, { label: 'Blogs', to: '/blogs' }] as const;
export function Navbar() {
 const [open, setOpen] = useState(false);
 return <header className="site-header"><div className="site-container flex h-full items-center justify-between"><Link to="/" className="brand-name flex items-center" onClick={() => setOpen(false)} aria-label="TP iT GROUP LLC Home"><TPITLogo className="h-6 sm:h-7 md:h-8 max-w-[210px] sm:max-w-[260px] md:max-w-none w-auto" /></Link><nav aria-label="Main navigation" className="hidden items-center gap-9 md:flex">{nav.map(item => <Link key={item.to} to={item.to} className="nav-link" activeProps={{ className: 'nav-link active' }} activeOptions={{ exact: true }}>{item.label}</Link>)}<Button asChild className="ml-2 h-11 rounded-none px-6 text-[10px] tracking-[1px]"><Link to="/contact">CONTACT US <ArrowUpRight /></Link></Button></nav><Button variant="ghost" size="icon" className="md:hidden" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button></div>{open && <nav aria-label="Mobile navigation" className="absolute left-0 top-full flex w-full flex-col border-b border-border bg-background px-6 py-6 shadow-lg md:hidden">{nav.map(item => <Link key={item.to} to={item.to} className="nav-link" onClick={() => setOpen(false)}>{item.label}</Link>)}<Button asChild className="mt-4"><Link to="/contact" onClick={() => setOpen(false)}>Contact us <ArrowUpRight /></Link></Button></nav>}</header>;
}
const slides = [headquarters, infrastructure, team];
const capabilityTags = ['Cloud', 'ERP', 'SAP', 'Custom Applications', 'Enterprise Solutions', 'Workforce Solutions'] as const;

export function Hero() {
 const [index, setIndex] = useState(0);
 const [paused, setPaused] = useState(false);

 useEffect(() => {
   if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
   const timer = window.setInterval(() => setIndex(i => (i + 1) % slides.length), 6500);
   return () => window.clearInterval(timer);
 }, [paused]);

 return (
   <section className="hero" aria-roledescription="carousel" aria-label="TP iT GROUP LLC highlights">
     {/* Carousel Background Images */}
     {slides.map((imgSrc, i) => (
       <img
         key={imgSrc}
         src={imgSrc}
         alt={['Contemporary glass office architecture', 'Modern industrial infrastructure', 'Professionals collaborating in a workplace'][i]}
         className={`hero-image ${index === i ? 'current' : ''}`}
         width={1920}
         height={1024}
         loading={i === 0 ? 'eager' : 'lazy'}
       />
     ))}

     {/* Subtle Blueprint Grid & Ambient Glow Accents */}
     <div className="hero-grid" aria-hidden="true" />
     <div className="hero-glow-left" aria-hidden="true" />
     <div className="hero-glow-right" aria-hidden="true" />

     <div className="site-container hero-content">
       {/* Badge / Pill */}
       <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50/90 px-4 py-1.5 text-[11px] font-bold tracking-wider text-cyan-600 shadow-xs">
         <span className="size-2 rounded-full bg-cyan-500 animate-pulse" />
         GLOBAL IT SOLUTIONS PARTNER
       </div>

       {/* Main Quotation / Headline */}
       <h1 className="mt-6 max-w-5xl text-center text-3xl font-extrabold tracking-tight text-zinc-900 leading-[1.15] sm:text-5xl md:text-6xl lg:text-[62px]">
         Transforming Business with{' '}
         <span className="text-[#05a2c9]">Digital Engineering</span>{' '}
         <span className="text-zinc-900">&amp;</span>{' '}
         <span className="text-[#c88a09]">Enterprise Strategy</span>
       </h1>

       {/* Subheadline / Copy */}
       <p className="mt-6 max-w-3xl text-center text-sm font-normal leading-relaxed text-zinc-600 sm:text-base md:text-lg">
         A global technology powerhouse delivering next-gen IT services, deep-tech engineering, and strategic workforce solutions across USA, India, UK, Australia, and Canada.
       </p>

       {/* Technology Capability Tags */}
       <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3 max-w-4xl">
         {capabilityTags.map(tag => (
           <span
             key={tag}
             className="rounded-xl border border-zinc-200/90 bg-zinc-50/90 px-3.5 py-1.5 text-xs font-medium text-zinc-700 shadow-xs transition hover:border-zinc-300 hover:bg-white sm:px-4 sm:py-2 sm:text-sm"
           >
             {tag}
           </span>
         ))}
       </div>

       {/* Action Buttons */}
       <div className="mt-9 flex flex-wrap justify-center gap-3.5 sm:gap-4">
         <Button
           asChild
           className="h-12 rounded-xl bg-zinc-900 px-7 text-xs sm:text-sm font-semibold text-white shadow-md transition hover:bg-zinc-800"
         >
           <Link to="/services" className="inline-flex items-center gap-2">
             Explore Our Services <ArrowRight className="size-4" />
           </Link>
         </Button>
         <Button
           asChild
           variant="outline"
           className="h-12 rounded-xl border-zinc-200 bg-white px-7 text-xs sm:text-sm font-semibold text-zinc-900 shadow-xs transition hover:bg-zinc-50 hover:text-zinc-950"
         >
           <Link to="/contact">Get in Touch</Link>
         </Button>
       </div>

       {/* Carousel Controls */}
       <div className="hero-controls">
         <div className="flex items-center gap-3">
           <span className="font-mono text-[11px] tabular-nums text-zinc-500 font-medium">
             0{index + 1} <span className="opacity-40">/ 03</span>
           </span>
           <div className="flex gap-1.5">
             {slides.map((_, i) => (
               <button
                 key={i}
                 aria-label={`Go to slide ${i + 1}`}
                 aria-pressed={index === i}
                 onClick={() => setIndex(i)}
                 className={`h-1.5 rounded-full transition-all duration-300 ${
                   index === i ? 'w-6 bg-zinc-900' : 'w-2 bg-zinc-300 hover:bg-zinc-400'
                 }`}
               />
             ))}
           </div>
           <div className="ml-2 flex items-center gap-0.5">
             <Button
               variant="ghost"
               size="icon"
               className="size-7 rounded-full text-zinc-600 hover:bg-zinc-200/70"
               aria-label="Previous slide"
               onClick={() => setIndex(i => (i + 2) % slides.length)}
             >
               <ChevronLeft className="size-4" />
             </Button>
             <Button
               variant="ghost"
               size="icon"
               className="size-7 rounded-full text-zinc-600 hover:bg-zinc-200/70"
               aria-label={paused ? 'Play carousel' : 'Pause carousel'}
               onClick={() => setPaused(!paused)}
             >
               {paused ? <Play className="size-3" /> : <Pause className="size-3" />}
             </Button>
             <Button
               variant="ghost"
               size="icon"
               className="size-7 rounded-full text-zinc-600 hover:bg-zinc-200/70"
               aria-label="Next slide"
               onClick={() => setIndex(i => (i + 1) % slides.length)}
             >
               <ChevronRight className="size-4" />
             </Button>
           </div>
         </div>
       </div>
     </div>
   </section>
 );
}
export function About({ detailed = false }: { detailed?: boolean }) { return <section className="section"><div className="site-container grid items-center gap-12 md:grid-cols-2 md:gap-20"><div><p className="eyebrow text-muted-foreground">GET TO KNOW US</p><h2 className="section-title">One group.<br />A shared sense of purpose.</h2><p className="section-copy mt-6">Welcome to TP IT Groups. A place for fresh perspectives, meaningful connections and the possibilities ahead.</p><p className="section-copy mt-4">Our story starts with a simple idea: progress is better when we move forward together.</p>{!detailed && <Button asChild variant="link" className="mt-5 px-0 text-xs"><Link to="/about">Discover TP IT Groups <ArrowRight /></Link></Button>}{detailed && <div className="mt-8 grid gap-6"><div><Compass className="mb-3 size-6" /><h3 className="font-semibold">Our Vision</h3><p className="section-copy mt-2">A future shaped by thoughtful ideas and shared possibilities.</p></div><div><Target className="mb-3 size-6" /><h3 className="font-semibold">Our Mission</h3><p className="section-copy mt-2">To move forward with purpose, openness and a commitment to meaningful progress.</p></div></div>}</div><div><img className="about-photo" src={team} alt="A team exchanging ideas around a meeting table" width={1536} height={1024} loading="lazy" /><div className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-[1px] text-muted-foreground"><span>People at the heart of possibility</span><ArrowUpRight className="size-4" /></div></div></div></section>; }
const services = [{ icon: Building2, title: 'Service Area 01' }, { icon: Layers3, title: 'Service Area 02' }, { icon: Lightbulb, title: 'Service Area 03' }];
export function Services({ full = false }: { full?: boolean }) { return <section className="section bg-muted"><div className="site-container"><div className="mb-10 flex flex-wrap items-end justify-between gap-6"><div><p className="eyebrow text-muted-foreground">OUR SERVICES</p><h2 className="section-title">Possibilities across every perspective.</h2></div>{!full && <Button asChild variant="link" className="px-0 text-xs"><Link to="/services">Explore all services <ArrowRight /></Link></Button>}</div><div className="grid gap-6 md:grid-cols-3">{services.map((service, i) => <article className="service-card" key={service.title}><div className="flex items-center justify-between"><service.icon className="size-8 stroke-[1.2]" /><span className="text-xs text-muted-foreground">0{i + 1}</span></div><h3 className="mt-8 text-lg font-semibold">{service.title}</h3><p className="section-copy mt-3">Service details to be announced. Please contact us for confirmed information.</p><Button asChild variant="link" className="mt-4 h-auto px-0 text-xs"><Link to="/contact">Enquire <ArrowUpRight /></Link></Button></article>)}</div></div></section>; }
export function Careers({ full = false }: { full?: boolean }) { return <section className="section"><div className="site-container grid items-center gap-12 md:grid-cols-2 md:gap-20"><img className="editorial-image" src={team} alt="Colleagues working together in a light-filled office" width={1536} height={1024} loading="lazy" /><div><p className="eyebrow text-muted-foreground">GROW WITH US</p><h2 className="section-title">Your next chapter.<br />Our shared future.</h2><p className="section-copy mt-5">Bring your curiosity, your perspective and your ambition. Explore the possibility of building your next chapter with TP IT Groups.</p><Button asChild className="mt-7 h-12 rounded-none px-6 text-xs"><Link to={full ? '/contact' : '/careers'}>{full ? 'Career Enquiries' : 'Explore Careers'} <ArrowUpRight /></Link></Button>{full && <p className="mt-6 text-sm text-muted-foreground">Current opportunities will be listed here when available. No vacancies have been confirmed.</p>}</div></div></section>; }
export function Blogs({ full = false }: { full?: boolean }) { return <section className="section bg-muted"><div className="site-container"><div className="mb-10 flex flex-wrap items-end justify-between gap-5"><div><p className="eyebrow text-muted-foreground">PERSPECTIVES & IDEAS</p><h2 className="section-title">A fresh perspective.</h2></div>{!full && <Button asChild variant="link" className="px-0 text-xs"><Link to="/blogs">View all articles <ArrowRight /></Link></Button>}</div><div className="grid gap-6 md:grid-cols-3">{articles.map(article => <article className="blog-card bg-background" key={article.slug}><Link to="/blogs/$slug" params={{ slug: article.slug }}><img className="editorial-image" src={article.image} alt={article.title} width={1536} height={1024} loading="lazy" /></Link><div className="p-6"><p className="text-[9px] font-semibold tracking-[1px] text-muted-foreground">{article.category} <span className="float-right font-normal">Date to be added</span></p><h3 className="mt-4 text-lg font-medium leading-relaxed"><Link to="/blogs/$slug" params={{ slug: article.slug }}>{article.title}</Link></h3><p className="section-copy mt-3 text-xs">{article.summary}</p><Button asChild variant="link" className="mt-5 h-auto px-0 text-xs"><Link to="/blogs/$slug" params={{ slug: article.slug }}>Read More <ArrowUpRight /></Link></Button></div></article>)}</div></div></section>; }
export function ContactForm() { const [notice, setNotice] = useState(false); return <form onSubmit={event => { event.preventDefault(); setNotice(true); }} className="grid gap-5"><div className="grid gap-5 sm:grid-cols-2"><label className="text-xs font-medium">Name<input required name="name" autoComplete="name" placeholder="Your full name" className="contact-field mt-2" /></label><label className="text-xs font-medium">Email<input required name="email" type="email" autoComplete="email" placeholder="Your email address" className="contact-field mt-2" /></label></div><label className="text-xs font-medium">Phone<input name="phone" type="tel" autoComplete="tel" placeholder="Your phone number" className="contact-field mt-2" /></label><label className="text-xs font-medium">Message<textarea required name="message" rows={5} placeholder="What would you like to discuss?" className="contact-field mt-2 resize-y" /></label><p className="text-xs leading-relaxed text-muted-foreground">This form is a preview only. Messages are not sent or stored.</p><Button type="submit" className="h-12 w-fit rounded-none px-7 text-xs">Submit <ArrowUpRight /></Button>{notice && <p role="status" className="border-l-2 border-primary pl-4 text-sm">This is a preview form. Your message has not been sent or stored.</p>}</form>; }
export function Contact() { return <section className="section"><div className="site-container grid gap-14 md:grid-cols-2"><div><p className="eyebrow text-muted-foreground">START A CONVERSATION</p><h2 className="section-title">Let’s connect.</h2><p className="section-copy mt-5 max-w-sm">For business enquiries, career conversations or more information about TP IT Groups.</p><div className="mt-9 space-y-7">{[{ icon: Mail, title: 'Email', detail: 'Official email to be added' }, { icon: Phone, title: 'Phone', detail: 'Official phone number to be added' }, { icon: MapPin, title: 'Visit us', detail: 'Office address to be added' }].map(item => <div key={item.title} className="flex gap-4"><item.icon className="mt-1 size-5" /><div><h3 className="text-sm font-semibold">{item.title}</h3><p className="section-copy mt-1">{item.detail}</p></div></div>)}</div></div><ContactForm /></div></section>; }
export function ContactBanner() { return <section className="border-y border-border py-14"><div className="site-container flex flex-wrap items-center justify-between gap-6"><div><p className="eyebrow text-muted-foreground">THE NEXT STEP STARTS HERE</p><h2 className="mt-3 text-3xl font-medium">Let’s explore what’s possible.</h2></div><Button asChild className="h-12 rounded-none px-7 text-xs"><Link to="/contact">Get in Touch <ArrowUpRight /></Link></Button></div></section>; }
export function PageHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) { return <section className="page-heading"><div className="site-container"><p className="eyebrow text-muted-foreground">{eyebrow}</p><h1>{title}</h1><p className="section-copy mt-4 max-w-xl">{description}</p></div></section>; }
export function Footer() { const [social, setSocial] = useState(''); return <footer className="footer"><div className="site-container"><div className="grid gap-10 pb-14 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr]"><div><Link to="/" className="brand-name inline-flex items-center" aria-label="TP iT GROUP LLC Home"><TPITLogo className="h-7 md:h-8 max-w-[260px] md:max-w-none w-auto" inverted /></Link><p className="mt-5 max-w-xs text-xs leading-7 opacity-60">A shared sense of purpose.<br />A world of possibilities.</p><div className="mt-5 flex gap-1">{[{ icon: Linkedin, name: 'LinkedIn' }, { icon: Instagram, name: 'Instagram' }, { icon: Facebook, name: 'Facebook' }].map(s => <Button key={s.name} variant="heroOutline" size="icon" title={s.name} aria-label={s.name} onClick={() => setSocial(`${s.name} profile to be added.`)}><s.icon /></Button>)}</div>{social && <p role="status" className="mt-3 text-xs opacity-70">{social}</p>}</div><div><h3 className="text-xs font-semibold">Quick Links</h3><div className="mt-5 flex flex-col gap-3 text-xs opacity-60"><Link to="/about">About Us</Link><Link to="/careers">Careers</Link><Link to="/blogs">Blogs</Link><Link to="/contact">Contact Us</Link></div></div><div><h3 className="text-xs font-semibold">Our Services</h3><div className="mt-5 flex flex-col gap-3 text-xs opacity-60">{services.map(s => <Link key={s.title} to="/services">{s.title}</Link>)}</div></div><div><h3 className="text-xs font-semibold">Get in Touch</h3><div className="mt-5 space-y-4 text-xs opacity-60"><p>Official email to be added</p><p>Official phone number to be added</p><p>Office address to be added</p></div></div></div><div className="flex flex-wrap justify-between gap-5 border-t border-primary-foreground/15 py-6 text-[10px] text-primary-foreground/50"><span>© 2026 TP iT GROUP LLC. All rights reserved.</span><div className="flex gap-6"><Link to="/privacy">Privacy Policy</Link><Link to="/terms">Terms & Conditions</Link></div></div></div></footer>; }
