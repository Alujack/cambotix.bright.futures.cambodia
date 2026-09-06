import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPosts, publicPost } from '@/app/lib/cms/content';
import { formatDate } from '@/app/lib/format';
import ArticleCard from '../../components/ArticleCard';
import PostBody from '../../components/PostBody';

type ArticlePageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = publicPost('article', slug);
  if (!post) return {};
  return {
    title: `${post.title} | Dr. Joseph Helping Children Community`,
    description: post.excerpt || undefined,
    openGraph: { type: 'article', title: post.title, description: post.excerpt || undefined, images: post.image ? [{ url: post.image, alt: post.image_alt }] : undefined },
    twitter: { card: post.image ? 'summary_large_image' : 'summary', title: post.title, description: post.excerpt || undefined, images: post.image ? [post.image] : undefined },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = publicPost('article', slug);
  if (!post) notFound();
  const more = getPosts().filter((other) => other.kind === 'article' && other.id !== post.id).slice(0, 3);
  return (
    <main>
      <article>
        <header className="relative overflow-hidden border-b border-orange-100 bg-white">
          <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange-100/55 blur-3xl" />
          <div className="relative mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-stone-400">
              <Link href="/" className="transition hover:text-[#e05a29]">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/articles" className="transition hover:text-[#e05a29]">Articles</Link>
              <span aria-hidden="true">/</span>
              <span className="text-[#e05a29]">{post.title}</span>
            </nav>
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#e05a29]">{formatDate(post.created_at)}</p>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">{post.title}</h1>
            {post.excerpt && <p className="mt-5 max-w-3xl text-base leading-relaxed text-stone-600 sm:text-lg">{post.excerpt}</p>}
          </div>
        </header>
        {post.image && (
          <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6 sm:pt-12 lg:px-8">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[30px] bg-stone-200 shadow-[0_18px_55px_rgb(91_60_37/10%)]">
              <Image src={post.image} alt={post.image_alt} fill priority sizes="(min-width: 1024px) 64rem, 100vw" className="object-cover" />
            </div>
          </div>
        )}
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <PostBody body={post.body} />
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-orange-100 pt-6">
            <Link href="/articles" className="font-extrabold text-[#d95121] transition hover:-translate-x-1">← All articles</Link>
            <Link href="/contact#donate" className="rounded-2xl bg-[#f26b3a] px-6 py-3 font-extrabold text-white transition hover:bg-[#df5524]">Support this work</Link>
          </div>
        </div>
      </article>
      {more.length > 0 && (
        <section className="border-t border-orange-100 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
            <div className="mb-8">
              <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#e05a29]">Keep reading</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight">More articles</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{more.map((other) => <ArticleCard key={other.id} post={other} />)}</div>
          </div>
        </section>
      )}
    </main>
  );
}
