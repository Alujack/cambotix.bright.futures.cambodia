import Link from 'next/link';
import { getPlacedArticles } from '../lib/cms/content';
import ArticleCard from './ArticleCard';

// Published articles an administrator chose to show on a given page.
// Renders nothing until at least one article is placed there.
export default function PlacedArticles({ placement, tone = 'plain' }: { placement: string; tone?: 'plain' | 'white' }) {
  const articles = getPlacedArticles(placement);
  if (!articles.length) return null;
  const headingId = `articles-${placement}`;
  return (
    <section aria-labelledby={headingId} className={tone === 'white' ? 'border-y border-orange-100 bg-white' : ''}>
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#e05a29]">Latest articles</p>
            <h2 id={headingId} className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">News and stories from the community.</h2>
          </div>
          <Link href="/articles" className="w-fit font-extrabold text-[#d95121] transition hover:translate-x-1">All articles →</Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((post) => <ArticleCard key={post.id} post={post} />)}
        </div>
      </div>
    </section>
  );
}
