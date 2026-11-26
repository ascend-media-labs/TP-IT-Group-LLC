import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { articles, metadata } from '@/components/corporate/content';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
export const Route = createFileRoute('/blogs/$slug')({
 loader: ({ params }) => { const article = articles.find(a => a.slug === params.slug); if (!article) throw notFound(); return article; },
 head: ({ loaderData }) => metadata(loaderData?.title ?? 'Article unavailable', loaderData?.summary ?? 'This article is not available.'),
 component: Article,
});
function Article() { const article = Route.useLoaderData(); return <article><header className="page-heading"><div className="site-container"><Button asChild variant="link" className="mb-5 px-0"><Link to="/blogs"><ArrowLeft /> All articles</Link></Button><p className="eyebrow text-muted-foreground">{article.category}</p><h1 className="max-w-3xl">{article.title}</h1><p className="mt-5 text-xs text-muted-foreground">Editorial · Publication date to be added</p></div></header><div className="site-container py-12"><img src={article.image} alt={article.title} width={1920} height={1024} className="max-h-[500px] w-full object-cover" /><div className="mx-auto max-w-2xl py-10">{article.body.split('\n\n').map(p => <p key={p} className="section-copy mb-6">{p}</p>)}</div></div></article>; }
