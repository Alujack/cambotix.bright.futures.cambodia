import type { Metadata } from 'next';
import Link from 'next/link';
import { getPosts } from '@/app/lib/cms/content';
import ArticleCard from '../components/ArticleCard';
import PageIntro from '../components/PageIntro';

export const metadata: Metadata = {
  title: 'Articles | Dr. Joseph Helping Children Community',
  description: 'News, stories, and updates from our community team in Cambodia.',
};

export default function ArticlesPage() {
  const articles = getPosts().filter((post) => post.kind === 'article');
  return (
    <main>
      <PageIntro eyebrow="Articles" title="News and stories from the community." description="Updates written by our team about the children, families, and elders we work alongside." />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        {articles.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((post) => <ArticleCard key={post.id} post={post} />)}
          </div>
        ) : (
          <div className="rounded-[28px] border border-orange-100 bg-white p-10 text-center">
            <p className="text-xl font-extrabold">No articles yet.</p>
            <p className="mt-3 text-stone-600">Our first stories are on the way. In the meantime, see our latest activities on the Impact page.</p>
            <Link href="/impact" className="mt-6 inline-flex rounded-2xl bg-[#f26b3a] px-6 py-3.5 font-extrabold text-white transition hover:bg-[#df5524]">See our impact</Link>
          </div>
        )}
      </section>
    </main>
  );
}
