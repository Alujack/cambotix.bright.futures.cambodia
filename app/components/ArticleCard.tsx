import Image from 'next/image';
import Link from 'next/link';
import type { Post } from '../lib/cms/content';
import { formatDate } from '../lib/format';

export default function ArticleCard({ post, sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw' }: { post: Post; sizes?: string }) {
  return (
    <Link href={`/articles/${post.slug}`} className="group flex flex-col overflow-hidden rounded-[28px] border border-orange-100 bg-white shadow-[0_16px_50px_rgb(91_60_37/6%)] transition hover:-translate-y-1 hover:border-orange-200">
      <div className="relative aspect-[4/3] overflow-hidden bg-orange-50">
        {post.image
          ? <Image src={post.image} alt={post.image_alt} fill sizes={sizes} className="object-cover transition duration-500 group-hover:scale-105" />
          : <div aria-hidden="true" className="absolute inset-0 grid place-items-center bg-gradient-to-br from-orange-100 to-amber-50 text-5xl">📰</div>}
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-[#e05a29]">{formatDate(post.created_at)}</p>
        <h3 className="mt-2 text-xl font-extrabold leading-snug transition group-hover:text-[#d95121]">{post.title}</h3>
        {post.excerpt && <p className="mt-3 text-sm leading-relaxed text-stone-600">{post.excerpt}</p>}
        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-extrabold text-[#d95121]">Read more <span aria-hidden="true">→</span></span>
      </div>
    </Link>
  );
}
